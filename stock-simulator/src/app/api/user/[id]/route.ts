import { authenticateUser } from "@/functions/authenticate";
import dynamoClient from "@/functions/dynamo";
import {
  UpdateItemCommand,
  PutItemCommand,
  ReturnValue,
  UpdateItemCommandInput,
  PutItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import * as cookie from "cookie";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidV4 } from "uuid";

dotenv.config();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const apiKey = cookies?.stockSimKey || "";

  try {
    const user = await authenticateUser(id, apiKey);
    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ Message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error("DynamoDB error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve item" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  // Parse the request body to get the fields to update
  const { userData } = await req.json();

  if (!id || !userData) {
    return NextResponse.json(
      { error: "ID and Data are required" },
      { status: 400 }
    );
  }

  const updateParams: UpdateItemCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userID: { S: id },
    },
    UpdateExpression: "set #data = :data",
    ExpressionAttributeNames: {
      "#data": "userData",
    },
    ExpressionAttributeValues: {
      ":data": { S: userData || "" },
    },
    ReturnValues: ReturnValue.ALL_NEW,
  };

  try {
    // Authenticate
    const cookies = cookie.parse(req.headers.get("cookie") || "");
    const apiKey = cookies?.stockSimKey || "";
    const user = await authenticateUser(id, apiKey);
    if (!user) {
      return NextResponse.json({ Message: "Unauthorized" }, { status: 401 });
    }
    // Send the UpdateItem request to DynamoDB
    const command = new UpdateItemCommand(updateParams);
    const data = await dynamoClient.send(command);

    return NextResponse.json({
      message: "Item updated successfully",
      updatedItem: data.Attributes,
    });
  } catch (error) {
    console.error("DynamoDB error:", error);
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

// Endpoint for registering a user
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userID = (await params).id;
  const { password } = await req.json();

  if (!password || !userID) {
    return NextResponse.json(
      { error: "ID and Password are required" },
      { status: 400 }
    );
  }

  const apiKey = uuidV4();
  const userData = {
    apiKey: apiKey,
    password: password,
    balance: 100000.0,
    stocks: {},
  };

  try {
    const putParams: PutItemCommandInput = {
      TableName: process.env.TABLE_NAME,
      Item: {
        userID: { S: userID },
        userData: { S: JSON.stringify(userData) },
      },
      ConditionExpression: "attribute_not_exists(userID)", // Ensure userID doesn't already exist
    };

    // Send the PutItem request to DynamoDB
    const command = new PutItemCommand(putParams);
    await dynamoClient.send(command);

    const res = NextResponse.json({
      message: "User created successfully",
    });
    res.cookies.set("stockSimKey", apiKey, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res;
  } catch (error) {
    console.error("DynamoDB error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

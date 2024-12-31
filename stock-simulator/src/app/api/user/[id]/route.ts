import dynamoClient from "@/functions/dynamo";
import {
  GetItemCommand,
  UpdateItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";
import { NextRequest, NextResponse } from "next/server";

dotenv.config();

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const awsParams = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: id },
    },
  };

  try {
    // Send the GetItem request to DynamoDB
    const command = new GetItemCommand(awsParams);
    const data = await dynamoClient.send(command);

    if (!data.Item) {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }

    return NextResponse.json({ item: data.Item });
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

  const updateParams: any = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: { S: id },
    },
    UpdateExpression: "set #data = :data",
    ExpressionAttributeNames: {
      "#data": "userData",
    },
    ExpressionAttributeValues: {
      ":data": { S: userData || "" },
    },
    ReturnValues: "ALL_NEW", // Returns the updated item
  };

  try {
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

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userID = (await params).id;
  const { userData } = await req.json();

  if (!userData || !userID) {
    return NextResponse.json(
      { error: "ID and Data are required" },
      { status: 400 }
    );
  }

  const putParams: any = {
    TableName: process.env.TABLE_NAME,
    Item: {
      userID: { S: userID }, // Primary key
      userData: { S: userData }, // Associated data
    },
    ConditionExpression: "attribute_not_exists(userID)", // Ensure userID doesn't already exist
  };

  try {
    // Send the PutItem request to DynamoDB
    const command = new PutItemCommand(putParams);
    await dynamoClient.send(command);

    return NextResponse.json({
      message: "User created successfully",
    });
  } catch (error: any) {
    if (error.name === "ConditionalCheckFailedException") {
      return NextResponse.json(
        { error: "User ID already exists" },
        { status: 400 }
      );
    }
    console.error("DynamoDB error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

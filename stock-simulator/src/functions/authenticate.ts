import { GetItemCommand, GetItemCommandInput } from "@aws-sdk/client-dynamodb";
import dynamoClient from "./dynamo";

export interface UserInterface {
  userID: string;
  userData: string;
}

export async function fetchUser(userID: string): Promise<UserInterface | null> {
  const awsParams: GetItemCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      userID: { S: userID },
    },
  };

  try {
    // Send the GetItem request to DynamoDB
    const command = new GetItemCommand(awsParams);
    const data: string | null =
      (await dynamoClient.send(command)).Item?.userData.S || null;
    if (data) {
      return { userID: userID, userData: data };
    }
    return null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function authenticateUser(
  userID: string,
  apiKey: string
): Promise<UserInterface | null> {
  try {
    const user: UserInterface | null = await fetchUser(userID);
    const userData: string = user?.userData || "{}";
    const parsedData = await JSON.parse(user?.userData || "{}");
    if (parsedData?.apiKey == apiKey) {
      return { userID: userID, userData: userData };
    }
    return null;
  } catch (e) {
    console.error("Error authenticating user: ", e);
    return null;
  }
}

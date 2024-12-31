import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

// Create a DynamoDB client instance
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export default dynamoClient;

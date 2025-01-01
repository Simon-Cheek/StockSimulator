import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Create a DynamoDB client instance
const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION,
});

export default dynamoClient;

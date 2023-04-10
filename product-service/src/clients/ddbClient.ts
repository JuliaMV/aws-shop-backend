import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// TODO: move to env-variable
const REGION = "us-east-1";

export const ddbClient = new DynamoDBClient({ region: REGION });

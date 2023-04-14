import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { REGION } from "src/env";

export const ddbClient = new DynamoDBClient({ region: REGION });

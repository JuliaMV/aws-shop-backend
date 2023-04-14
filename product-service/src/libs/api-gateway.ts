import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import type { FromSchema, JSONSchema } from "json-schema-to-ts";

type ValidatedAPIGatewayProxyEvent<S extends JSONSchema> = Omit<
  APIGatewayProxyEvent,
  "body"
> & {
  body: FromSchema<S>;
};
export type ValidatedEventAPIGatewayProxyEvent<S extends JSONSchema> = Handler<
  ValidatedAPIGatewayProxyEvent<S>,
  APIGatewayProxyResult
>;
export type NotValidatedEventAPIGatewayProxyEvent = Handler<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
>;

export const formatJSONResponse = <T>(
  response: T,
  statusCode: number = 200
): APIGatewayProxyResult => {
  return {
    statusCode,
    body: JSON.stringify(response),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Headers": "*",
    },
  };
};

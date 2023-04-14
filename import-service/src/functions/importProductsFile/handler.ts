import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { APIGatewayProxyEvent } from "aws-lambda";

const importProductsFile = async (event: APIGatewayProxyEvent) => {
  // it will be expecting a request with a name of CSV file with products
  // and creating a new Signed URL with the following key: uploaded/${fileName}.
  return formatJSONResponse({
    message: `Hello ${event.queryStringParameters.name}, welcome to the exciting Serverless world!`,
    event,
  });
};

export const main = middyfy(importProductsFile);

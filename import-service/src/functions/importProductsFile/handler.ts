import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { REGION, S3_BUCKET } from "src/env";

const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const client = new S3Client({ region: REGION });
  const { name: fileName } = event.queryStringParameters;
  const params = {
    Bucket: S3_BUCKET,
    Key: `uploaded/${fileName}`,
  };
  const command = new PutObjectCommand(params);
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });

  return formatJSONResponse(url);
};

export const main = importProductsFile;

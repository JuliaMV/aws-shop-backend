import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
import { APIGatewayProxyEvent } from "aws-lambda";
import { main as importProductsFile } from "./handler";
import { REGION, S3_BUCKET, UPLOADED } from "src/env";

describe("importProductFile", () => {
  it("should return a valid url", async () => {
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock("S3", "getSignedUrl", jest.fn);

    const fileName = "file.csv";

    const event: Partial<APIGatewayProxyEvent> = {
      queryStringParameters: { name: fileName },
    };

    const result = await importProductsFile(event as APIGatewayProxyEvent);
    expect(result.statusCode).toBe(200);
    console.log(result.body);
    expect(result.body).toContain(
      `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${UPLOADED}/${fileName}`
    );
  });
});

import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { S3Event } from "aws-lambda";
import csv from "csv-parser";

import { PARSED, UPLOADED } from "src/env";
import { s3Client, sqsClient } from "src/clients";

const importFileParser = async (event: S3Event) => {
  const client = s3Client;

  const { Records } = event;
  const {
    bucket: { name: bucketName },
    object: { key },
  } = Records[0].s3;

  const commandGet = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  const queueUrl = `https://sqs.us-east-1.amazonaws.com/${process.env.ACCOUNT_ID}/${process.env.SQS_NAME}`;

  const responseStream = (await client.send(commandGet)).Body;

  (responseStream as any).pipe(csv()).on("data", async (data) => {
    const params = {
      DelaySeconds: 10,
      MessageBody: JSON.stringify(data).replace("\ufeff", ""),
      QueueUrl: queueUrl,
    };
    await sqsClient.send(new SendMessageCommand(params));
  });

  const commandCopy = new CopyObjectCommand({
    CopySource: `${bucketName}/${key}`,
    Bucket: bucketName,
    Key: key.replace(UPLOADED, PARSED),
  });

  await client.send(commandCopy);

  const commandDelete = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await client.send(commandDelete);
};

export const main = importFileParser;

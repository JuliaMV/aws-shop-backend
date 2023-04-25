import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { S3Event } from "aws-lambda";
import { parse } from "csv-parse";

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

  const response = await client.send(commandGet);

  const stream = await response.Body.transformToByteArray();
  const parser = parse();

  parser.on("readable", async () => {
    let record;
    while ((record = parser.read()) !== null) {
      const params = {
        MessageBody: JSON.stringify(record),
        QueueUrl: process.env.SQS_URL,
      };
      await sqsClient.send(new SendMessageCommand(params));
    }
  });

  parser.on("error", (err) => {
    console.log("Parsing error", err);
  });

  parser.on("end", () => {
    console.log(`Parsing finished`);
  });

  parser.write(stream);
  parser.end();

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

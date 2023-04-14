import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { S3Event } from "aws-lambda";
import { parse } from "csv-parse";

import { REGION } from "src/env";

const importFileParser = async (event: S3Event) => {
  const client = new S3Client({ region: REGION });

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
  const records = [];
  const parser = parse();

  parser.on("readable", () => {
    let record;
    while ((record = parser.read()) !== null) {
      console.log("row", record);
      records.push(record);
    }
  });

  parser.on("error", (err) => {
    console.log("Parsing error", err);
  });

  parser.on("end", () => {
    console.log(`Parsed ${records.length} records`);
  });

  parser.write(stream);
  parser.end();

  const commandCopy = new CopyObjectCommand({
    CopySource: `${bucketName}/${key}`,
    Bucket: bucketName,
    Key: key.replace("uploaded", "parsed"),
  });

  await client.send(commandCopy);

  const commandDelete = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await client.send(commandDelete);
};

export const main = importFileParser;

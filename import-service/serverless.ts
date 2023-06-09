import type { AWS } from "@serverless/typescript";

import { importProductsFile, importFileParser } from "src/functions";
import { SQS_QUEUE_NAME, S3_BUCKET, AWS_ACCOUNT_ID, REGION } from "src/env";

const serverlessConfiguration: AWS = {
  service: "import-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    region: REGION,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      S3_BUCKET: S3_BUCKET,
      SQS_NAME: SQS_QUEUE_NAME,
      ACCOUNT_ID: AWS_ACCOUNT_ID,
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: "arn:aws:s3:::${self:provider.environment.S3_BUCKET}/*",
      },
      {
        Effect: "Allow",
        Action: ["sqs:*"],
        Resource:
          "arn:aws:sqs:${self:provider.region}:${self:provider.environment.ACCOUNT_ID}:${self:provider.environment.SQS_NAME}",
      },
    ],
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;

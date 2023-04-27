import type { AWS } from "@serverless/typescript";

import {
  getProductsById,
  getProductsList,
  createProduct,
  catalogBatchProcess,
} from "src/functions";
import {
  CATALOG_ITEMS_QUEUE,
  CREATE_PRODUCT_TOPIC,
  PRIMARY_EMAIL,
  PRODUCTS_TABLE,
  REGION,
  STOCKS_TABLE,
} from "src/env";

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  plugins: ["serverless-esbuild"],
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    profile: "default",
    region: REGION,
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_DB: PRODUCTS_TABLE,
      STOCKS_DB: STOCKS_TABLE,
      SQS_QUEUE_URL: {
        Ref: "SQSQueue",
      },
      SNS_TOPIC_ARN: {
        Ref: "SNSTopic",
      },
    },
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource:
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.PRODUCTS_DB}",
      },
      {
        Effect: "Allow",
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
        ],
        Resource:
          "arn:aws:dynamodb:${self:provider.region}:*:table/${self:provider.environment.STOCKS_DB}",
      },
      {
        Effect: "Allow",
        Action: "sqs:*",
        Resource: { "Fn::GetAtt": ["SQSQueue", "Arn"] },
      },
      {
        Effect: "Allow",
        Action: "sns:*",
        Resource: {
          Ref: "SNSTopic",
        },
      },
    ],
  },
  functions: {
    getProductsList,
    getProductsById,
    createProduct,
    catalogBatchProcess,
  },
  package: { individually: true },
  resources: {
    Resources: {
      SQSQueue: {
        Type: "AWS::SQS::Queue",
        Properties: {
          QueueName: CATALOG_ITEMS_QUEUE,
        },
      },
      SNSTopic: {
        Type: "AWS::SNS::Topic",
        Properties: {
          TopicName: CREATE_PRODUCT_TOPIC,
        },
      },
      SNSSubscription: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          Endpoint: PRIMARY_EMAIL,
          Protocol: "email",
          TopicArn: {
            Ref: "SNSTopic",
          },
        },
      },
    },
  },
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

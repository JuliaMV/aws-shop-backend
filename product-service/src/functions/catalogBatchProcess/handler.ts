import type { SQSEvent } from "aws-lambda";
import { PublishCommand } from "@aws-sdk/client-sns";
import type { PublishCommandInput } from "@aws-sdk/client-sns";
import { snsClient } from "src/clients";
import { createAvailableProduct } from "src/service";

const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  const records = event.Records.map(({ body }) => JSON.parse(body));

  for (const record of records) {
    const { title, description, price, count } = record;
    const payload = {
      title: String(title),
      description: String(description),
      price: Number(price),
      count: Number(count),
    };

    await createAvailableProduct(payload);

    const emailParams: PublishCommandInput = {
      Subject: "New product is saved",
      Message: `Product title: ${payload.title}, description: ${payload.description}, price: ${payload.price}, count: ${payload.count}`,
      TopicArn: process.env.SNS_TOPIC_ARN,
      MessageAttributes: {
        count: {
          DataType: "Number",
          StringValue: count,
        },
      },
    };
    await snsClient.send(new PublishCommand(emailParams));
  }
};

export const main = catalogBatchProcess;

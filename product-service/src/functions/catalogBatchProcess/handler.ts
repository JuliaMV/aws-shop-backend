import type { SQSEvent } from "aws-lambda";
import { createAvailableProduct } from "src/service";

const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  const records = event.Records.map(({ body }) => JSON.parse(body));

  for (const record of records) {
    const { title, description, price, count } = record;
    const product = await createAvailableProduct({
      title,
      description,
      price: Number(price),
      count: Number(count),
    });
    console.log("saved", product);
  }
};

export const main = catalogBatchProcess;

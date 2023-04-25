import type { SQSEvent } from "aws-lambda";

const catalogBatchProcess = async (event: SQSEvent): Promise<void> => {
  const payload = event.Records;

  console.log("events", payload);
};

export const main = catalogBatchProcess;

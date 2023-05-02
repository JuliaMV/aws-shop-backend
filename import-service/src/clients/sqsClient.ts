import { SQSClient } from "@aws-sdk/client-sqs";

import { REGION } from "src/env";

const sqsClient = new SQSClient({ region: REGION });

export { sqsClient };

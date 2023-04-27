import { SNSClient } from "@aws-sdk/client-sns";
import { REGION } from "src/env";

const snsClient = new SNSClient({ region: REGION });

export { snsClient };

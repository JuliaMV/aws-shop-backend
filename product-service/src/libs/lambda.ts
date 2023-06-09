import middy from "@middy/core";
import middyJsonBodyParser from "@middy/http-json-body-parser";
import httpErrorHandler from "@middy/http-error-handler";

import { logger } from "./logger";

export const middyfy = (handler): middy.MiddyfiedHandler => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(logger)
    .use(
      httpErrorHandler({ logger: console.log, fallbackMessage: "Server error" })
    );
};

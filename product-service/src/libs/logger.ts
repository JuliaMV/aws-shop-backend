import { MiddlewareObj } from "@middy/core";

export const logger: MiddlewareObj = {
    before: ({ event}) => console.log(`Lambda was invoked with event: ${JSON.stringify(event)}`),
}

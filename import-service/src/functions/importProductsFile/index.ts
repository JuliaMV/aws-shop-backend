import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        request: {
          parameters: {
            querystrings: {
              // ApiGateway provides validation
              name: true,
            },
          },
        },
      },
    },
  ],
};

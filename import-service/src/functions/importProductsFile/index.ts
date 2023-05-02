import { handlerPath } from "@libs/handler-resolver";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: "get",
        path: "import",
        authorizer: {
          arn: "arn:aws:lambda:${self:provider.region}:${aws:accountId}:function:authorization-service-dev-basicAuthorizer",
          type: "request",
          identitySource: "method.request.header.Authorization",
          resultTtlInSeconds: 0,
        },
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

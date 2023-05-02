import {
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEvent,
  PolicyDocument,
} from "aws-lambda";

enum Effect {
  Allow = "Allow",
  Deny = "Deny",
}

const generatePolicyDocument = (
  effect: Effect,
  resource: string
): PolicyDocument => {
  return {
    Version: "2012-10-17",
    Statement: [
      {
        Action: "execute-api:Invoke",
        Effect: effect,
        Resource: resource,
      },
    ],
  };
};

const generateResponce = (
  principalId: string,
  effect: Effect,
  resource: string
): APIGatewayAuthorizerResult => {
  return {
    principalId,
    policyDocument: generatePolicyDocument(effect, resource),
  };
};

const basicAuthorizer = async (
  event: APIGatewayRequestAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const { headers, methodArn } = event;

  const encoded = headers.Authorization.split(" ")?.[1];
  const buffer = Buffer.from(encoded, "base64");
  const decoded = buffer.toString("utf-8");

  const [principalId, token] = decoded.split(":");

  const effect =
    token === process.env[principalId] ? Effect.Allow : Effect.Deny;

  const response = generateResponce(principalId, effect, methodArn);

  return response;
};

export const main = basicAuthorizer;

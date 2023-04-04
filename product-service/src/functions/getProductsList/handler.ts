import type { NotValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { products } from 'src/mocks';

const getProductsList: NotValidatedEventAPIGatewayProxyEvent = async () => {
  return formatJSONResponse({
    items: products
  });
};

export const main = middyfy(getProductsList);

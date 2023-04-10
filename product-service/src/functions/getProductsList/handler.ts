import type { NotValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getAvailableProducts } from 'src/service';

const getProductsList: NotValidatedEventAPIGatewayProxyEvent = async () => {
  const products = await getAvailableProducts();
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);

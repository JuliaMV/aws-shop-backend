import type { NotValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getAllProducts } from 'src/service';

const getProductsList: NotValidatedEventAPIGatewayProxyEvent = async () => {
  const products = await getAllProducts();
  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);

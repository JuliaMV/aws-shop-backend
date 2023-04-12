import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createAvailableProduct } from 'src/service';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const productId = await createAvailableProduct(event.body);
    return formatJSONResponse({ id: productId });
};

export const main = middyfy(createProduct);

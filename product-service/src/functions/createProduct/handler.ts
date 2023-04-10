import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createAvailableProduct } from 'src/service';
import schema from './schema';

const createProduct: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const productId = await createAvailableProduct(event.body);
    if (productId) {
        return formatJSONResponse({ id: productId });
    }

    return formatJSONResponse({ message: 'Invalid request'}, 400);
};

export const main = middyfy(createProduct);

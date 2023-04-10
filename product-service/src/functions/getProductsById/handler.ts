import type { NotValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getAvailableProductById } from 'src/service';

const getProductsById: NotValidatedEventAPIGatewayProxyEvent = async (event) => {
    const product = await getAvailableProductById(event.pathParameters.id);
    if (product) {
        return formatJSONResponse(product);
    }

    return formatJSONResponse({ message: 'Product not found'}, 404);
};

export const main = middyfy(getProductsById);

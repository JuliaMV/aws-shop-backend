import type { NotValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { getProductById } from 'src/service';

const getProductsById: NotValidatedEventAPIGatewayProxyEvent = async (event) => {
    const product = await getProductById(event.pathParameters.id);
    if (product) {
        return formatJSONResponse({
            item: product
        });
    }

    return formatJSONResponse({ message: 'Product not found'}, 404);
};

export const main = middyfy(getProductsById);

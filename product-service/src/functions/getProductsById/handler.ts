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
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Product not found'}),
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      }
};

export const main = middyfy(getProductsById);

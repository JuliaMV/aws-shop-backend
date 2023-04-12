import { ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Stock } from "src/types";
import { ddbDocClient } from "src/clients";
import { STOCKS_TABLE } from "src/env";

export const  getAll = async (): Promise<Stock[]> => {
    const result = await ddbDocClient
        .send(new ScanCommand({ TableName: STOCKS_TABLE }));
    return result.Items as Stock[];
};

export const getById = async (productId: string): Promise<Stock | undefined> => {
    const result = await ddbDocClient
        .send(new GetCommand({
            TableName: STOCKS_TABLE,
            Key: {
                'product_id': productId,
            }
        }));
    return result.Item as Stock;
};


export const create = async (params): Promise<void> => {
    await ddbDocClient
        .send(new PutCommand({
            TableName: STOCKS_TABLE,
            Item: {
                'product_id': params.product_id,
                'count': params.count,
            }
        }));
};

export const createTransationParams = (params) => {
    return ({
        Put: {
            TableName: STOCKS_TABLE,
            Item: {
                'product_id': params.product_id,
                'count': params.count,
            }
        }
    })
};

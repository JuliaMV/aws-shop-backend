import { ScanCommand, GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";
import { Product } from "src/types";
import { ddbDocClient } from "src/clients";
import { PRODUCTS_TABLE } from "src/env";

export const getAll = async (): Promise<Product[]> => {
    const result = await ddbDocClient
        .send(new ScanCommand({ TableName: PRODUCTS_TABLE }));
    return result.Items as Product[];
}

export const getById = async (productId: string): Promise<Product | undefined> => {
    const result = await ddbDocClient
        .send(new GetCommand({
            TableName: PRODUCTS_TABLE,
            Key: {
                'id': productId,
            }
        }));
    return result.Item as Product;
}

export const create = async (params): Promise<void> => {
    await ddbDocClient
        .send(new PutCommand({
            TableName: PRODUCTS_TABLE,
            Item: {
                'id': params.id,
                'title': params.title,
                'description': params.description,
                'price': params.price,
            }
        }));
}


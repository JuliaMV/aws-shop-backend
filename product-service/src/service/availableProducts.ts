import { TransactWriteCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { type AvailableProduct, type Stock } from "src/types";
import * as ProductDAL from "src/repository/product.db";
import * as StockDAL from "src/repository/stock.db";

import { ddbDocClient } from "src/clients";

export const getAvailableProducts = async (): Promise<AvailableProduct[]> => {
  const products = await ProductDAL.getAll();
  const stocks = await StockDAL.getAll();

  const result = products.map((product) => {
    const relatedStock: Stock | undefined = stocks.find(
      (stock) => stock.product_id === product.id
    );
    return { ...product, count: relatedStock?.count };
  });

  return result;
};

export const getAvailableProductById = async (
  productId: string
): Promise<AvailableProduct | null> => {
  const stock = await StockDAL.getById(productId);
  const product = await ProductDAL.getById(productId);
  if (product != null && stock != null) {
    return { ...product, count: stock.count };
  }
  return null;
};

export const createAvailableProduct = async (params): Promise<string> => {
  const { title, description, price, count } = params;
  const id = uuidv4();
  const productParams = ProductDAL.createTransationParams({
    id,
    title,
    description,
    price,
  });
  const stockParams = StockDAL.createTransationParams({
    product_id: id,
    count,
  });
  await ddbDocClient.send(
    new TransactWriteCommand({
      TransactItems: [productParams, stockParams],
    })
  );
  return id;
};

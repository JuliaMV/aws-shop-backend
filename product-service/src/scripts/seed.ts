import { BatchExecuteStatementCommand, BatchStatementRequest } from "@aws-sdk/client-dynamodb";

import { ddbDocClient } from "src/clients";
import { AvailableProduct } from "src/types";
import { products } from 'src/mocks';

// TODO: move to env-variables
const PRODUCTS_TABLE = 'ProductsDB';
const STOCKS_TABLE = 'StocksDB';

const generateProductStatement = ({ id, title, description, price }: AvailableProduct): BatchStatementRequest => ({
    Statement:
      "INSERT INTO " + PRODUCTS_TABLE + "  value  {'id':?, 'title':?, 'description':?, 'price':?}",
    Parameters: [{ S: id }, { S: title }, { S: description }, { N: price.toString() }],
})

const generateStocksStatement = ({ id: product_id, count }: AvailableProduct): BatchStatementRequest => ({
  Statement:
    "INSERT INTO " + STOCKS_TABLE + "  value  {'product_id':?,  'count':?}",
  Parameters: [{ S: product_id }, { N: count.toString() }],
});

export const seedProducts = async () => {
  const params = {
    Statements: products.map(generateProductStatement),
  };
  try {
    await ddbDocClient.send(
      new BatchExecuteStatementCommand(params)
    );
    console.log("Success. Product items added.");
  } catch (err) {
    console.error(err);
  }
};

export const seedStocks = async () => {
  const params = {
    Statements: products.map(generateStocksStatement),
  };
  try {
    await ddbDocClient.send(
      new BatchExecuteStatementCommand(params)
    );
    console.log("Success. Stock items added.");
  } catch (err) {
    console.error(err);
  }
};

seedProducts();
seedStocks();

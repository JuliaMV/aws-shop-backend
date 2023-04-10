import { v4 as uuidv4 } from 'uuid';
import { AvailableProduct, Stock } from 'src/types';
import * as ProductDAL from 'src/repository/product.db';
import * as StockDAL from 'src/repository/stock.db';
 
export const getAvailableProducts = async (): Promise<AvailableProduct[]> => {
  const products = await ProductDAL.getAll();
  const stocks = await StockDAL.getAll();

  const result = products.map(product => {
    const relatedStock: Stock = stocks.find(stock => stock.product_id === product.id)
    return ({ ...product, count:  relatedStock?.count })
  });

  return result;
};

export const getAvailableProductById = async (productId: string): Promise<AvailableProduct> => {
  const stock = await StockDAL.getById(productId);
  const product = await ProductDAL.getById(productId);
  if (product && stock) {
    return ({ ...product, count: stock.count });
  }
  return null;
};

export const createAvailableProduct = async (params): Promise<string> => {
  const { title, description, price, count } = params;
  const id = uuidv4();
  await ProductDAL.create({ id, title, description, price });
  await StockDAL.create({ product_id: id, count });

  return id;
}

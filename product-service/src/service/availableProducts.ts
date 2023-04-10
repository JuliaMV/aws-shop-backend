import { Stock } from 'src/types';
import * as ProductDAL from 'src/repository/product.db';
import * as StockDAL from 'src/repository/stock.db';
 
export const getAvailableProducts = async () => {
  const products = await ProductDAL.getAll();
  const stocks = await StockDAL.getAll();

  const result = products.map(product => {
    const relatedStock: Stock = stocks.find(stock => stock.product_id === product.id)
    return ({ ...product, count:  relatedStock?.count })
  });

  return result;
};

export const getAvailableProductById = async (productId: string) => {
  const stock = await StockDAL.getById(productId);
  const product = await ProductDAL.getById(productId);
  if (product) {
    return ({ ...product, count:  stock?.count });
  }
  return null;
};

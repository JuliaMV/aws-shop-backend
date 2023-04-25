export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface Stock {
  product_id: string;
  count: number;
}

export type AvailableProduct = Product & Pick<Stock, "count">;

export type AvailableProductsList = AvailableProduct[];

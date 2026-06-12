export type ProductsList = { products: Product[]; total: number; skip: number; limit: number };

export type Product = {
  id: number;
  title: string;
  brand?: string;
  category: string;
  price: number;
  stock: number;
};

export type CreateProduct = Omit<Product, 'id'>;

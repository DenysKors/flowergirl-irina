export type FilterProps = {
  plantsCategories: Categories[];
};

export type Categories = {
  label: string;
  value: string;
};

export type Product = {
  code: number;
  title: string;
  description: string;
  category: { label: string; value: string }[];
  imagesUrl: string[];
  price: number;
  qty: number;
};

export type PlantsData = {
  plants: Product[];
  totalAmount: number;
};

export type BasketProduct = {
  code: number;
  title: string;
  imageUrl: string;
  price: number;
  sumPrice: number;
  userQty: number;
  stock: number;
};

export type InitBasketState = {
  products: BasketProduct[];
  totalPrice: number;
};

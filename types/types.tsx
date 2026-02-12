export type FilterProps = {
  plantsCategories: Categories[];
};

export type Categories = {
  label: string;
  value: string;
};

enum SellStatus {
  inStock = "В наявності",
  notAvailable = "Немає в наявності",
}

export type Product = {
  code: number;
  title: string;
  description: string;
  category: { label: string; value: string };
  imagesUrl: string[];
  price: number;
  qty: number;
  sell_status: SellStatus;
};

export type PlantsData = {
  plants: Product[];
  totalAmount: number;
};

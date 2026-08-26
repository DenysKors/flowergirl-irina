import { Prisma } from "@/prisma/generated/client";
// import { ExtendedPrismaClient } from "@/lib/prisma";

export type CategoryWithSubs = Prisma.CategoryGetPayload<{
  include: { subCategories: true };
}>;

// export type ProductWithCats = Prisma.Result<
//   ExtendedPrismaClient["product"],
//   { include: { category: true } },
//   "findMany"
//   >;

type ProductWithCatsFromDB = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductWithCats = Omit<ProductWithCatsFromDB, "price"> & {
  price: number;
};

export type Product = {
  code: string;
  title: string;
  description: string;
  category: { label: string; value: string }[];
  imagesUrl: string[];
  price: number;
  qty: number;
};

export type BasketProduct = {
  code: string;
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

import { Prisma, Product as PrismaProduct } from "@/prisma/generated/client";

export type CategoryWithSubs = Prisma.CategoryGetPayload<{
  include: { subCategories: true };
}>;

export type Product = Omit<PrismaProduct, "isDeleted" | "price"> & {
  price: number;
  isDeleted: false;
};

type ProductWithCatsFromDB = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export type ProductWithCats = Omit<ProductWithCatsFromDB, "price"> & {
  price: number;
};

export type ProductsWithPagin = {
  products: ProductWithCats[];
  pagination: { totalCount: number; totalPages: number };
};

// export type Product = {
//   code: string;
//   title: string;
//   description: string;
//   category: { label: string; value: string }[];
//   imagesUrl: string[];
//   price: number;
//   qty: number;
// };

export type ProductToUpdate = {
  id: number;
  description: string | null;
  categoryId: number;
  qty: number;
  unit: string;
  price: number;
};

export type BasketProduct = {
  id: number;
  sku: string;
  name: string;
  imageUrl: string;
  unit: string;
  price: number;
  sumPrice: number;
  userQty: number;
  stock: number;
};

export type InitBasketState = {
  products: BasketProduct[];
  totalPrice: number;
  orderId: string;
  customerData: {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    comment: string;
  };
};

export type CreateOrderPayload = {
  products: {
    id: number;
    price: number;
    qty: number;
  }[];
  totalPrice: number;
  customerData: {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    postLocation: {
      postAddr: string;
      postName: string;
    };
    comment: string;
  };
};

export type ProdForSignature = {
  name: string;
  price: number;
  qty: number;
};

export type ProdOrderItem = Prisma.OrderItemCreateManyOrderInput;

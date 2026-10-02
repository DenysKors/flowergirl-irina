"use client";
import { use } from "react";

import ProductsList from "../ProductsList/ProductsList";
import Pagination from "../Pagination/Pagination";

import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";
import { ProductsWithPagin } from "@/types/types";

export default function ProductsCatalog({
  productsData,
}: {
  productsData: Promise<ProductsWithPagin>;
}) {
  const userProducts: ProductsWithPagin = use(productsData);

  return (
    <section className="pt-4 pb-4">
      {userProducts.products.length === 0 && (
        <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
          За цим запитом нічого не знайдено
        </div>
      )}
      {userProducts.products.length > 0 && (
        <>
          <ProductsList products={userProducts.products} />
          <Pagination
            totalAmount={userProducts.pagination.totalCount}
            paginationLimit={PRODUCT_PAGINATION_LIMIT}
          />
        </>
      )}
    </section>
  );
}

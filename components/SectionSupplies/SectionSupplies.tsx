"use client";

import { use } from "react";

import ProductsList from "../ProductsList/ProductsList";
import Pagination from "../Pagination/Pagination";

import { SuppliesData } from "@/types/types";
import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";

type SectionSuppliesProps = {
  suppliesData: Promise<SuppliesData>;
};

export default function SectionSupplies({
  suppliesData,
}: SectionSuppliesProps) {
  const userSupplies = use(suppliesData);
  return (
    <section className="pt-4 pb-4">
      {userSupplies.supplies.length === 0 && (
        <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
          За цим запитом нічого не знайдено
        </div>
      )}
      {userSupplies.supplies.length > 0 && (
        <>
          <ProductsList products={userSupplies.supplies} />
          <Pagination
            totalAmount={userSupplies.totalAmount}
            paginationLimit={PRODUCT_PAGINATION_LIMIT}
          />
        </>
      )}
    </section>
  );
}

"use client";
import { use } from "react";

import ProductsList from "../ProductsList/ProductsList";

import { PlantsData } from "@/types/types";

type SEctionPlantsProps = {
  plantsData: Promise<PlantsData>;
};

export default function SectionPlants({ plantsData }: SEctionPlantsProps) {
  const userPlants = use(plantsData);
  return (
    <section>
      {userPlants.plants.length === 0 && (
        <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
          За цим запитом нічого не знайдено
        </div>
      )}
      {userPlants.plants.length > 0 && (
        <ProductsList products={userPlants.plants} />
      )}
      {/* {plantsData.totalAmount > PRODUCT_PAGINATION_LIMIT && (
         <Pagination
            totalAmount={productsData.totalAmount}
            paginationLimit={PRODUCT_PAGINATION_LIMIT}
          />
        )} */}
    </section>
  );
}

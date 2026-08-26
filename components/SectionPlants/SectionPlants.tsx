"use client";
// import { use } from "react";

// import ProductsList from "../ProductsList/ProductsList";
// import Pagination from "../Pagination/Pagination";

// import { PlantsData } from "@/types/types";
// import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";

// type SEctionPlantsProps = {
//   plantsData: Promise<PlantsData>;
// };
export default function SectionPlants() {
  return <div></div>;
}

// export default function SectionPlants({ plantsData }: SEctionPlantsProps) {
//   const userPlants = use(plantsData);
//   return (
//     <section className="pt-4 pb-4">
//       {userPlants.plants.length === 0 && (
//         <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
//           За цим запитом нічого не знайдено
//         </div>
//       )}
//       {userPlants.plants.length > 0 && (
//         <>
//           <ProductsList products={userPlants.plants} />
//           <Pagination
//             totalAmount={userPlants.totalAmount}
//             paginationLimit={PRODUCT_PAGINATION_LIMIT}
//           />
//         </>
//       )}
//     </section>
//   );
// }

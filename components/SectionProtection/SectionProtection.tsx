"use client";

// import { use } from "react";

// import ProductsList from "../ProductsList/ProductsList";
// import Pagination from "../Pagination/Pagination";

// import { ProtectionData } from "@/types/types";
// import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";

// type SectionProtectionProps = {
//   protectionData: Promise<ProtectionData>;
// };

export default function SectionProtection() {
  return <div></div>;
}
// export default function SectionProtection({
//   protectionData,
// }: SectionProtectionProps) {
//   const userProtection = use(protectionData);
//   return (
//     <section className="pt-4 pb-4">
//       {userProtection.protection.length === 0 && (
//         <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
//           За цим запитом нічого не знайдено
//         </div>
//       )}
//       {userProtection.protection.length > 0 && (
//         <>
//           <ProductsList products={userProtection.protection} />
//           <Pagination
//             totalAmount={userProtection.totalAmount}
//             paginationLimit={PRODUCT_PAGINATION_LIMIT}
//           />
//         </>
//       )}
//     </section>
//   );
// }

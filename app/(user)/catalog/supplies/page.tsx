// import { Suspense } from "react";

import LinkBack from "@/components/LinkBack/LinkBack";
// import SectionFilters from "@/components/SectionFilters/SectionFilters";
// import SectionSupplies from "@/components/SectionSupplies/SectionSupplies";
// import Skeleton from "@/components/Skeleton/Skeleton";

// import { getAllSuppliesCategories } from "@/lib/api";
// import { getSupplies } from "@/lib/api";
// import { Categories } from "@/types/types";

// export const metadata = {
//   title: "Каталог допоміжних матеріалів. Квіткова крамниця Flowergirl-irina",
// };

export default async function ProtectionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const suppliesCategories: Categories[] = await getAllSuppliesCategories();
  // const userSearchParams = await searchParams;
  // const category = userSearchParams.category || "";
  // const page = userSearchParams.page || "1";
  // const suppliesData = getSupplies(category, page);

  return (
    <main className="container">
      <h1 className="hidden">Каталог засобів захисту рослин</h1>
      <LinkBack />
      {/* <SectionFilters categories={suppliesCategories} />
      <Suspense fallback={<Skeleton />}>
        <SectionSupplies suppliesData={suppliesData} />
      </Suspense> */}
    </main>
  );
}

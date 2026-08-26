// import { Suspense } from "react";

import LinkBack from "@/components/LinkBack/LinkBack";
// import SectionFilters from "@/components/SectionFilters/SectionFilters";
// import SectionPlants from "@/components/SectionPlants/SectionPlants";
// import Skeleton from "@/components/Skeleton/Skeleton";

// import { getAllPlantsCategories } from "@/lib/api";
// import { getPlants } from "@/lib/api";
// import { Categories } from "@/types/types";

export const metadata = {
  title: "Каталог рослин. Квіткова крамниця Flowergirl-irina",
};

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const plantsCategories: Categories[] = await getAllPlantsCategories();
  // const userSearchParams = await searchParams;
  // const category = userSearchParams.category || "";
  // const page = userSearchParams.page || "1";
  // const plantsData = getPlants(category, page);

  return (
    <main className="container">
      <h1 className="hidden">Каталог рослин</h1>
      <LinkBack />
      {/* <SectionFilters categories={plantsCategories} />
      <Suspense fallback={<Skeleton />}>
        <SectionPlants plantsData={plantsData} />
      </Suspense> */}
    </main>
  );
}

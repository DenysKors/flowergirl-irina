import { Suspense } from "react";

import LinkBack from "@/components/LinkBack/LinkBack";
import SectionFilters from "@/components/SectionFilters/SectionFilters";

import { getAllPlantsCategories } from "@/lib/api";
import { Categories } from "@/types/types";

export const metadata = {
  title: "Каталог рослин. Квіткова крамниця Flowergirl-irina",
};

export default async function PlantsPage() {
  const plantsCategories: Categories[] = await getAllPlantsCategories();
  return (
    <main className="container">
      <LinkBack />
      <Suspense>
        <SectionFilters plantsCategories={plantsCategories} />
      </Suspense>
    </main>
  );
}

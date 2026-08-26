import { Suspense } from "react";

import LinkBack from "@/components/LinkBack/LinkBack";
import SectionFilters from "@/components/SectionFilters/SectionFilters";
import SectionProtection from "@/components/SectionProtection/SectionProtection";
import Skeleton from "@/components/Skeleton/Skeleton";

// import { getAllProtectionCategories } from "@/lib/api";
// import { getProtection } from "@/lib/api";
import { Categories } from "@/types/types";

export const metadata = {
  title: "Каталог засобів захисту рослин. Квіткова крамниця Flowergirl-irina",
};

export default async function ProtectionPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // const protectionCategories: Categories[] = await getAllProtectionCategories();
  // const userSearchParams = await searchParams;
  // const category = userSearchParams.category || "";
  // const page = userSearchParams.page || "1";
  // const protectionsData = getProtection(category, page);

  return (
    <main className="container">
      <h1 className="hidden">Каталог засобів захисту рослин</h1>
      <LinkBack />
      {/* <SectionFilters categories={protectionCategories} />
      <Suspense fallback={<Skeleton />}>
        <SectionProtection protectionData={protectionsData} />
      </Suspense> */}
    </main>
  );
}

import { Suspense } from "react";

import LinkBack from "@/components/LinkBack/LinkBack";
import SectionFilters from "@/components/SectionFilters/SectionFilters";
import ProductsCatalog from "@/components/ProductsCatalog/ProductsCatalog";
import Skeleton from "@/components/Skeleton/Skeleton";

import { getAllUserCategWithSubs } from "@/lib/api";
import { getUserFilterProducts } from "@/lib/api";
import { CategoryWithSubs, ProductsWithPagin } from "@/types/types";

export const metadata = {
  title: "Каталог рослин. Квіткова крамниця Flowergirl-irina",
};

export default async function PlantsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const categories: CategoryWithSubs[] = await getAllUserCategWithSubs();
  const userSearchParams = await searchParams;
  const category: string[] = userSearchParams.category
    ? Array.isArray(userSearchParams.category)
      ? userSearchParams.category
      : [userSearchParams.category]
    : [];
  const page = Number(userSearchParams.page) || 1;

  const productsData: Promise<ProductsWithPagin> = getUserFilterProducts(
    category,
    page
  );

  return (
    <main className="container">
      <h1 className="hidden">Каталог товарів</h1>
      <LinkBack />
      <SectionFilters categories={categories} />
      <Suspense fallback={<Skeleton />}>
        <ProductsCatalog productsData={productsData} />
      </Suspense>
    </main>
  );
}

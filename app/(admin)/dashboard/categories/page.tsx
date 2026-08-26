import { connection } from "next/server";

import CategoriesTable from "@/components/CategoriesTable/CategoriesTable";

import { getAllAdminCatWithSubs } from "@/lib/api";
import { CategoryWithSubs } from "@/types/types";

export default async function CategoryPage() {
  await connection();
  const categoriesWithSubs: CategoryWithSubs[] = await getAllAdminCatWithSubs();

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Таблица категорий
      </h1>
      <CategoriesTable categoriesWithSubs={categoriesWithSubs} />
    </section>
  );
}

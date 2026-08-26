import { connection } from "next/server";

import AddCategoryForm from "@/components/AddCategoryForm/AddCategoryForm";

import { getAllAdminMainCategories } from "@/lib/api";
import type { Category } from "@/prisma/generated/client";

export default async function AddCategory() {
  await connection();

  const mainCategories: Category[] = await getAllAdminMainCategories();

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-sm">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Добавить подкатегорию товара
      </h1>
      {<AddCategoryForm mainCategories={mainCategories} />}
    </section>
  );
}

import { connection } from "next/server";

import AddProductForm from "@/components/AddProductForm/AddProductForm";

import type { Category } from "@/prisma/generated/client";
import { getAllAdminSubCategories } from "@/lib/api";

export default async function AddProduct() {
  await connection();
  const subCategories: Category[] = await getAllAdminSubCategories();

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Добавить товар
      </h1>
      {subCategories && subCategories.length === 0 && (
        <div className="mt-10 w-full text-center">Нет доступных категорий</div>
      )}
      {subCategories && subCategories.length > 0 && (
        <AddProductForm subCategories={subCategories} />
      )}
    </section>
  );
}

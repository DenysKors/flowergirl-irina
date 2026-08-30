import { notFound } from "next/navigation";
import { connection } from "next/server";

import UpdateProductForm from "@/components/UpdateProductForm/UpdateProductForm";

import { getAdminProductById, getAllAdminSubCategories } from "@/lib/api";
import { ProductWithCats } from "@/types/types";
import type { Category } from "@/prisma/generated/client";

type UpdateProductProps = {
  params: Promise<{ id: string }>;
};

export default async function UpdateProduct({ params }: UpdateProductProps) {
  const { id } = await params;
  await connection();

  const productFromDb: ProductWithCats | null = await getAdminProductById(id);

  const productSubCategories: Category[] = await getAllAdminSubCategories();

  if (!productFromDb) {
    notFound();
  }

  const product = JSON.parse(JSON.stringify(productFromDb));
  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Обновление товара
      </h1>
      <UpdateProductForm
        product={product}
        productSubCategories={productSubCategories}
      />
    </section>
  );
}

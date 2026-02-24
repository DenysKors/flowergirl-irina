import AddCategoryForm from "@/components/AddCategoryForm/AddCategoryForm";
import CategoryTypeSelect from "@/components/CategoryTypeSelect/CategoryTypeSelect";

import {
  getAllPlantsCategories,
  getAllProtectionCategories,
  getAllSuppliesCategories,
} from "@/lib/api";
import { Categories } from "@/types/types";

export default async function AddCategory({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const categoryType = await searchParams;
  const userCategory = categoryType.type as string;
  let currentCategories: Categories[] | null = null;

  if (userCategory === "plant") {
    currentCategories = await getAllPlantsCategories();
  } else if (userCategory === "protection") {
    currentCategories = await getAllProtectionCategories();
  } else if (userCategory === "supplies") {
    currentCategories = await getAllSuppliesCategories();
  }

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Добавить категорию товара
      </h1>
      <CategoryTypeSelect />
      {currentCategories && currentCategories.length > 0 && (
        <AddCategoryForm productCategories={currentCategories} />
      )}
    </section>
  );
}

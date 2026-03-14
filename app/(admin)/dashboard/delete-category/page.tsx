import CategoriesList from "@/components/CategoriesList/CategoriesList";
import ProductTypeSelect from "@/components/ProductTypeSelect/ProductTypeSelect";

import {
  getAllPlantsCategories,
  getAllProtectionCategories,
  getAllSuppliesCategories,
} from "@/lib/api";
import { Categories } from "@/types/types";

export default async function DeleteCategory({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userProduct = await searchParams;
  const productType = userProduct.type as string;
  let currentCategories: Categories[] | null = null;

  if (productType === "plant") {
    currentCategories = await getAllPlantsCategories();
  } else if (productType === "protection") {
    currentCategories = await getAllProtectionCategories();
  } else if (productType === "supplies") {
    currentCategories = await getAllSuppliesCategories();
  }

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Удалить категорию товара
      </h1>
      <ProductTypeSelect />
      {currentCategories && currentCategories.length === 0 && (
        <div className="mt-10 w-full text-center">Нет доступных категорий</div>
      )}
      {currentCategories && currentCategories.length > 0 && (
        <CategoriesList
          productCategories={currentCategories}
          productType={productType}
        />
      )}
    </section>
  );
}

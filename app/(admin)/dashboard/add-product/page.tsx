import AddProductForm from "@/components/AddProductForm/AddProductForm";
import ProductTypeSelect from "@/components/ProductTypeSelect/ProductTypeSelect";

import {
  getAllPlantsCategories,
  getAllProtectionCategories,
  getAllSuppliesCategories,
} from "@/lib/api";
import { Categories } from "@/types/types";

export default async function AddProduct({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const productType = await searchParams;
  const userProduct = productType.type as string;
  let currentCategories: Categories[] | null = null;

  if (userProduct === "plant") {
    currentCategories = await getAllPlantsCategories();
  } else if (userProduct === "protection") {
    currentCategories = await getAllProtectionCategories();
  } else if (userProduct === "supplies") {
    currentCategories = await getAllSuppliesCategories();
  }

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Добавить товар
      </h1>
      <ProductTypeSelect />
      {currentCategories && currentCategories.length === 0 && (
        <div className="mt-10 w-full text-center">Нет доступных категорий</div>
      )}
      {currentCategories && currentCategories.length > 0 && (
        <AddProductForm productCategories={currentCategories} />
      )}
    </section>
  );
}

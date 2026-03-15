import ProductUpdate from "@/components/ProductUpdate/ProductUpdate";
import ProductTypeSelect from "@/components/ProductTypeSelect/ProductTypeSelect";

import { Product } from "@/types/types";
import { getProductsAdmin } from "@/lib/api";

export default async function UpdateProduct({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const productType = await searchParams;
  const userProduct = productType.type as string;
  let currentProducts: Product[] | null = null;

  if (userProduct) {
    currentProducts = await getProductsAdmin(userProduct);
  }

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Обновить товар
      </h1>
      <ProductTypeSelect />
      {currentProducts && currentProducts.length === 0 && (
        <div className="w-full text-center">Нет товаров для обновления</div>
      )}
      {currentProducts && currentProducts.length > 0 && (
        <ProductUpdate currentProducts={currentProducts} />
      )}
    </section>
  );
}

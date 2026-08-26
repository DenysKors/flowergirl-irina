import ProductsTable from "@/components/ProductsTable/ProductsTable";

export default async function ProductPage() {
  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full max-w-md">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Таблица товаров
      </h1>
      <ProductsTable />
    </section>
  );
}

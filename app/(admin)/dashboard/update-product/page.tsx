import ProductUpdate from "@/components/ProductUpdate/ProductUpdate";

export default function UpdateProdByCode() {
  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Обновить товар
      </h1>
      <ProductUpdate />
    </section>
  );
}

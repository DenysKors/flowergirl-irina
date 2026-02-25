import AddCategoryForm from "@/components/AddCategoryForm/AddCategoryForm";
import CategoryTypeSelect from "@/components/CategoryTypeSelect/CategoryTypeSelect";

export default async function AddCategory({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userCategory = await searchParams;
  const categoryType = userCategory.type as string;

  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Добавить категорию товара
      </h1>
      <CategoryTypeSelect />
      <AddCategoryForm categoryType={categoryType} />
    </section>
  );
}

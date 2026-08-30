import Link from "next/link";

export default function NotFound() {
  return (
    <section className="p-2 w-full bg-gray-200 flex flex-col items-center justify-center gap-6">
      <h1 className="mb-4 font-heading font-bold lg:text-2xl text-center text-text">
        Товар не найден
      </h1>
      <Link
        className="button button-primary font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
        href="/dashboard/products/"
      >
        Вернуться к товарам
      </Link>
    </section>
  );
}

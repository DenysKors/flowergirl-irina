import { getSearchProducts } from "@/lib/api";

import Pagination from "@/components/Pagination/Pagination";
import SearchList from "@/components/SearchList/SearchList";

import { ProductsWithPagin } from "@/types/types";
import { PRODUCT_PAGINATION_LIMIT } from "@/constants/pagination";

export const metadata = {
  title: "Пошук рослин. Квіткова крамниця Flowergirl-irina",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const userSearchParams = await searchParams;
  const userSearchQuery = userSearchParams.search as string;

  const page = Number(userSearchParams.page) || 1;
  const searchedData: ProductsWithPagin = await getSearchProducts(
    userSearchQuery,
    page
  );

  const searchedProducts = JSON.parse(JSON.stringify(searchedData));

  return (
    <main className="container">
      <h1 className="hidden">Пошшук товарів за назвою</h1>
      <div className="py-4 font-text lg:text-xl">{`Результати пошуку: ${userSearchQuery}`}</div>
      <section className="pt-4 pb-4">
        {searchedData && searchedData.products.length === 0 && (
          <div className="h-60 font-text flex justify-center items-center text-center md:text-lg">
            За цим запитом нічого не знайдено
          </div>
        )}
        {searchedData && searchedData.products.length > 0 && (
          <>
            <SearchList products={searchedProducts.products} />
            <Pagination
              totalAmount={searchedProducts.pagination.totalCount}
              paginationLimit={PRODUCT_PAGINATION_LIMIT}
            />
          </>
        )}
      </section>
    </main>
  );
}

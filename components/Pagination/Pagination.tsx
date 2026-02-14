"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

type PaginationProps = {
  totalAmount: number;
  paginationLimit: number;
};

export default function Pagination({
  totalAmount,
  paginationLimit,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const totalPages = Math.ceil(totalAmount / paginationLimit);
  const currentPage = Number(searchParams.get("page")) || 1;
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleNextPageChange = () => {
    if (currentPage === totalPages) return;
    const pageNumber = currentPage + 1;
    replace(createPageURL(pageNumber));
  };

  const handlePrevPageChange = () => {
    if (currentPage === 1) return;
    const pageNumber = currentPage - 1;
    replace(createPageURL(pageNumber));
  };

  return (
    <div className="flex items-center justify-center gap-3 md:gap-8 lg:gap-15">
      {currentPage !== 1 && (
        <button
          className="button group/edit px-2 py-1 inline-flex items-center gap-1 font-heading md:text-lg xl:text-xl uppercase bg-background transition-colors hover:text-main cursor-pointer"
          type="button"
          aria-label="попередня сторінка"
          onClick={handlePrevPageChange}
        >
          <svg className="w-1.5 h-3.5 fill-text transition-colors group-hover/edit:fill-main rotate-y-180">
            <use href={`${baseUrl}/icons.svg#icon-Vector`}></use>
          </svg>
          назад
        </button>
      )}
      <span className="font-heading text-text md:text-lg xl:text-xl">{`${currentPage} / ${totalPages}`}</span>
      {currentPage !== totalPages && (
        <button
          className="button group/edit px-2 py-1 inline-flex items-center gap-1 font-heading text-lg xl:text-xl uppercase bg-background transition-colors hover:text-main cursor-pointer"
          type="button"
          aria-label="наступна сторінка"
          disabled={currentPage === totalPages}
          onClick={handleNextPageChange}
        >
          далі
          <svg className="w-1.5 h-3.5 fill-text transition-colors group-hover/edit:fill-main">
            <use href="/icons.svg#icon-Vector"></use>
          </svg>
        </button>
      )}
    </div>
  );
}

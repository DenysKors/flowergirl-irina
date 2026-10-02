"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { CategoryWithSubs } from "@/types/types";

export default function SectionFilters({
  categories,
}: {
  categories: CategoryWithSubs[];
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const onCategoryFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    params.set("page", "1");

    if (evt.target.checked) {
      params.append("category", evt.target.value);
    } else {
      params.delete("category", evt.target.value);
    }

    if (!params.has("category")) params.delete("page");

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <section
      className="mb-5 md:mb-10 border border-border-gray p-2 rounded-md"
      aria-label="Фільтри"
    >
      <h2 className="hidden">Фільтр категорій</h2>
      <div className="mb-2 flex justify-end items-center gap-2">
        <button
          className={
            params.has("category")
              ? "p-1 text-sm md:text-base break-all cursor-pointer text-text antialiased border border-gray-300 rounded-lg"
              : "hidden"
          }
          type="button"
          onClick={() => replace(pathname)}
        >
          очистити фільтр
        </button>
        <svg className="w-7 h-7 fill-text md:w-9 md:h-9">
          <use href="/icons.svg#icon-filter"></use>
        </svg>
      </div>
      <ul className="flex gap-1 flex-col divide-y divide-border-gray">
        {categories.map(({ name, slug, subCategories }) => {
          return (
            <li key={slug}>
              <p className="font-heading text-lg xl:text-xl text-main tracking-wider">
                {name}
              </p>
              {subCategories.length === 0 ? (
                <p className="text-sm md:text-base text-text">
                  немає доступних категорій
                </p>
              ) : (
                <ul className="pb-2 flex flex-row flex-wrap gap-3">
                  {subCategories.map(({ name, slug }) => {
                    return (
                      <li key={slug} className="p-1 flex items-center gap-2">
                        <label
                          className="flex items-center cursor-pointer relative"
                          htmlFor={slug}
                        >
                          <input
                            className="peer h-3.5 w-3.5 md:w-5 md:h-5 cursor-pointer transition-all appearance-none rounded shadow-sm  border border-slate-200 checked:bg-main checked:border-main"
                            id={slug}
                            type="checkbox"
                            value={slug}
                            checked={
                              searchParams.has("category", slug) ? true : false
                            }
                            onChange={onCategoryFilterChange}
                          />
                          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <svg
                              className="w-3 h-3 md:w-4.5 md:h-4.5"
                              fill="none"
                              strokeWidth="2"
                              color="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5 13L9 17L19 7"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </span>
                        </label>
                        <label
                          className="text-sm md:text-base break-all cursor-pointer text-text antialiased"
                          htmlFor={slug}
                        >
                          {name}
                        </label>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

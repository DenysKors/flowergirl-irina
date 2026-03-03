"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { FilterProps } from "@/types/types";

export default function SectionFilters({ categories }: FilterProps) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const onCategoruFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
    <section className="mb-5 md:mb-10" aria-label="Фільтри">
      <h2 className="hidden">Фільтр категорій</h2>
      <div className="mb-4 flex justify-end items-center gap-2">
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
        <svg className="w-8 h-8 fill-text md:w-9 md:h-9">
          <use href="icons.svg#icon-filter"></use>
        </svg>
      </div>
      <ul className="max-h-27.5 lg:max-h-37.5 flex gap-2 flex-wrap justify-end overflow-y-scroll">
        {categories.map(({ label, value }) => {
          return (
            <li
              key={value}
              className="p-1 flex items-center gap-2 border border-gray-300 rounded-lg"
            >
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor={value}
              >
                <input
                  className="peer h-3.5 w-3.5 md:w-5 md:h-5 cursor-pointer transition-all appearance-none rounded shadow-sm  border border-slate-200 checked:bg-main checked:border-main"
                  id={value}
                  type="checkbox"
                  value={value}
                  checked={searchParams.has("category", value) ? true : false}
                  onChange={onCategoruFilterChange}
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
                htmlFor={value}
              >
                {label}
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { FilterProps } from "@/types/types";

export default function SectionFilters({ plantsCategories }: FilterProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onCategoruFilterChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
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
    <section className="mb-20" aria-label="Фільтри">
      <legend className="mb-4 font-heading text-base md:text-lg lg:text-xl text-end">
        Фільтр за категоріями
      </legend>
      <ul className="flex gap-2 flex-wrap justify-end">
        {plantsCategories.map(({ label, value }) => {
          return (
            <li
              key={value}
              className="p-1 flex items-center border border-gray-300 rounded-lg"
            >
              <label
                className="flex items-center cursor-pointer relative"
                htmlFor={value}
              >
                <input
                  className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow-sm  border border-slate-200 checked:bg-main checked:border-main"
                  id={value}
                  type="checkbox"
                  value={value}
                  checked={searchParams.has("category", value) ? true : false}
                  onChange={onCategoruFilterChange}
                />
                <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <svg
                    fill="none"
                    width="18px"
                    height="18px"
                    strokeWidth="2"
                    color="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </span>
              </label>
              <label
                className="cursor-pointer text-slate-600 antialiased"
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

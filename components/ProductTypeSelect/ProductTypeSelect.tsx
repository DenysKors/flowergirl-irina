"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function ProductTypeSelect() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    params.set("type", evt.target.value);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="mb-2 flex justify-center">
      <select
        className="outline-none focus:outline-none text-text font-text bg-transparent ring-transparent border border-slate-200 transition-all duration-300 ease-in text-sm rounded-md py-1 px-2.5 ring shadow-sm data-[icon-placement=start]:ps-9 data-[icon-placement=end]:pe-9 hover:border-slate-800 hover:ring-slate-800/10 focus:border-slate-800 focus:ring-slate-800/10 peer"
        name="select"
        onChange={handleChange}
      >
        <option value="default" hidden>
          Выберите вид товара
        </option>
        <option value="plant">Растение</option>
        <option value="protection">Защита растений</option>
        <option value="supplies">Вспомагательные материалы</option>
      </select>
    </div>
  );
}

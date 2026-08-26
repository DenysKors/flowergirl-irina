import { Column } from "@tanstack/react-table";

import { ProductWithCats } from "@/types/types";

type CategoryFilterProps = {
  column: Column<ProductWithCats, unknown>;
  options: { label: string; value: string }[];
};

export const CategoryFilter = ({ column, options }: CategoryFilterProps) => {
  const columnFilterValue = (column.getFilterValue() as string[]) ?? [];

  const onChange = (value: string, checked: boolean) => {
    if (checked) {
      column.setFilterValue([...columnFilterValue, value]);
    } else {
      column.setFilterValue(columnFilterValue.filter((val) => val !== value));
    }
  };

  if (!options.length) return null;

  return (
    <div className="absolute z-10 mt-2 w-48 p-2 bg-white border border-gray-200 rounded-md shadow-lg text-left font-text text-sm text-gray-700">
      <div className="font-text mb-1 text-xs uppercase text-gray-400 px-1">
        Категорії:
      </div>
      <div className="flex flex-col gap-1 max-h-40 overflow-y-auto">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 px-1 py-0.5 hover:bg-gray-200 cursor-pointer rounded-md"
          >
            <input
              type="checkbox"
              className="rounded border-gray-300 focus:ring-main"
              checked={columnFilterValue.includes(option.value)}
              onChange={(e) => onChange(option.value, e.target.checked)}
            />
            <span className="truncate font-text">{option.label}</span>
          </label>
        ))}
      </div>
      {columnFilterValue.length > 0 && (
        <button
          onClick={() => column.setFilterValue(undefined)}
          className="mt-2 text-xs text-red-600 hover:text-red-800 w-full text-center border-t pt-1 border-gray-100 block cursor-pointer"
        >
          Скинути ({columnFilterValue.length})
        </button>
      )}
    </div>
  );
};

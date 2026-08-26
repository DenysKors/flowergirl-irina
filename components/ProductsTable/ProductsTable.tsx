"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";

import {
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  createColumnHelper,
  flexRender,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";

import ProductInfo from "@/components/ProductInfo/ProductInfo";
import Modal from "@/components/ModalRoot/ModalRoot";
import { CategoryFilter } from "@/components/CategoryFilter/CategoryFilter";
import { SortIcon } from "@/components/SortIcon/SortIcon";
import { ProductWithCats } from "@/types/types";

type ProductData = {
  id: string;
  name: string;
};

export interface BackendFilterOptions {
  category?: { label: string; value: string }[];
}

const columnHelper = createColumnHelper<ProductWithCats>();

export default function ProductsTable() {
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [productInfo, setProductInfo] = useState<ProductWithCats | null>(null);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const queryClient = useQueryClient();
  const pathname = usePathname();

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery<ProductWithCats[]>({
    queryKey: ["admin-products"],
    queryFn: () =>
      fetch("/api/admin/products").then((res) => {
        if (!res.ok) throw new Error("Ошибка при загрузке");
        return res.json();
      }),
  });

  const unsortedOptions = data.map((prod) => {
    return {
      label: prod.category.name,
      value: prod.category.name,
    };
  });

  const categoryOptions = Array.from(
    new Map(unsortedOptions.map((item) => [item.label, item])).values()
  ) as { label: string; value: string }[];

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/delete-product/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success(`Товар "${productData?.name}" удален`);
        setProductData(null);
        setIsDelModalOpen(false);
      } else {
        const errData = await response.json();
        toast.error(errData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    },
  });

  const handleDelete = () => {
    if (productData) deleteMutation.mutate(productData.id);
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Название",
        cell: (info) => (
          <div className="max-w-40 md:max-w-60 lg:max-w-65 text-left truncate">
            <Link
              className="underline cursor-pointer"
              href={{
                pathname: `${pathname}/${info.row.original.name}`,
              }}
            >
              {info.getValue()}
            </Link>
          </div>
        ),
        enableSorting: false,
      }),
      columnHelper.accessor("category.name", {
        header: () => "Категория",
        size: 130,
        filterFn: "arrIncludesSome",
        enableSorting: false,
      }),
      columnHelper.accessor("sku", {
        header: () => "Арт.",
        size: 130,
        enableSorting: false,
      }),
      columnHelper.accessor("qty", {
        header: () => "Кол-во",
        size: 130,
        enableSorting: true,
      }),
      columnHelper.accessor("unit", {
        header: () => "Ед.",
        size: 80,
        enableSorting: false,
      }),
      columnHelper.accessor("price", {
        header: () => "Цена",
        size: 100,
        cell: (info) => {
          const price = info.getValue();
          return (
            <div className="text-right">
              {new Intl.NumberFormat("uk-UA", {
                style: "currency",
                currency: "UAH",
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(price)}
            </div>
          );
        },
        enableSorting: true,
      }),
      columnHelper.display({
        id: "actions",
        header: "",
        size: 50,
        cell: (info) => {
          const productId = info.row.original.id;
          const productName = info.row.original.name;
          return (
            <div className="flex items-center text-sm justify-center">
              <button
                className="button ms-auto p-2 mb-4 cursor-pointer"
                type="button"
                aria-label="Удалить"
                title="Удалить"
                onClick={() => {
                  setProductData({
                    id: productId.toString(),
                    name: productName,
                  });
                  setIsDelModalOpen(true);
                }}
              >
                <svg className="h-5.5 w-5.5 fill-main hover:fill-red-500 focus:fill-red-500">
                  <use href="/icons.svg#icon-trash"></use>
                </svg>
              </button>
            </div>
          );
        },
      }),
      columnHelper.display({
        id: "info",
        header: "",
        size: 50,
        cell: (info) => {
          const productInfo = info.row.original;
          return (
            <div className="flex items-center text-sm justify-center">
              <button
                className="button ms-auto p-2 mb-4 cursor-pointer"
                type="button"
                aria-label="Инфо"
                title="Инфо"
                onClick={() => {
                  setProductInfo(productInfo);
                  setIsInfoModalOpen(true);
                }}
              >
                <svg className="h-5.5 w-5.5 fill-main hover:fill-blue-500 focus:fill-blue-500">
                  <use href="/icons.svg#icon-info"></use>
                </svg>
              </button>
            </div>
          );
        },
      }),
    ],
    [pathname]
  );

  const table = useReactTable({
    data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    state: {
      sorting,
      globalFilter,
      pagination,
      columnFilters,
    },
    globalFilterFn: (row, _, filterValue) => {
      const searchValue = filterValue.toLowerCase().trim();
      if (!searchValue) return true;

      const name = (row.getValue("name") as string).toLowerCase();
      const sku = (row.getValue("sku") as string).toLowerCase();

      return name.includes(searchValue) || sku.includes(searchValue);
    },
  });

  if (isLoading)
    return <div className="mt-10 w-full text-center">Загрузка товаров...</div>;

  if (isError)
    if (error.message.includes("pool timeout")) {
      return (
        <div className="mt-10 w-full text-center text-red-500">
          Сервер перегружен. Попробуйте, пожалуйста, позже.
        </div>
      );
    } else {
      return (
        <div className="mt-10 w-full text-center text-red-500">
          Не удалось загрузить товары
        </div>
      );
    }
  return (
    <>
      {data && data.length === 0 && (
        <div className="mt-10 w-full text-center">Нет доступных товаров</div>
      )}
      {data && data.length > 0 && (
        <>
          <div className="mb-2 flex items-center gap-3">
            <div className="relative w-full max-w-60">
              <input
                type="text"
                value={globalFilter ?? ""}
                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                placeholder="Поиск по названию или арт."
                className="w-full pl-3 pr-10 py-2 text-sm bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:bg-white transition-all text-gray-900"
              />
              {globalFilter && (
                <button
                  onClick={() => table.setGlobalFilter("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="text-xs text-text font-text">
              {table.getFilteredRowModel().rows.length !== data.length && (
                <span>
                  Найдено: {table.getFilteredRowModel().rows.length} из{" "}
                  {data.length}
                </span>
              )}
            </div>
          </div>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200 text-left text-sm"
              style={{ width: table.getTotalSize() }}
            >
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      const isCategoryColumn = header.id === "category_name";
                      const isFiltered =
                        header.column.getFilterValue() !== undefined;
                      const canSort = header.column.getCanSort();
                      return (
                        <th
                          key={header.id}
                          className="px-2.5 py-2 tablet:px-3 tablet:py-2.5 font-heading text-text text-center tablet:text-lg"
                          style={{ width: header.getSize() }}
                        >
                          <div
                            className={`${
                              isCategoryColumn || canSort
                                ? "flex justify-center items-center"
                                : ""
                            }`}
                          >
                            {canSort ? (
                              <button
                                title="Сортировка"
                                onClick={header.column.getToggleSortingHandler()}
                                className="px-1 py-0.5 min-w-20 flex items-center justify-center gap-1 cursor-pointer select-none hover:bg-gray-200 rounded-md"
                              >
                                {header.isPlaceholder
                                  ? null
                                  : flexRender(
                                      header.column.columnDef.header,
                                      header.getContext()
                                    )}
                                <span className="text-xs text-gray-400">
                                  {SortIcon(header.column.getIsSorted())}
                                </span>
                              </button>
                            ) : header.isPlaceholder ? null : (
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )
                            )}
                            {isCategoryColumn && (
                              <button
                                title="Фильтр"
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="ml-1 p-0.5 rounded-md hover:bg-gray-200 cursor-pointer"
                              >
                                <svg
                                  className={`w-6 h-6 
                                  ${
                                    isFiltered
                                      ? "fill-red-500"
                                      : "fill-gray-500"
                                  }`}
                                >
                                  <use href="/icons.svg#icon-filter-table"></use>
                                </svg>
                              </button>
                            )}
                          </div>
                          {isCategoryColumn && isFilterOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-0"
                                onClick={() => setIsFilterOpen(false)}
                              />
                              <CategoryFilter
                                column={header.column}
                                options={categoryOptions}
                              />
                            </>
                          )}
                        </th>
                      );
                    })}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-background">
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-2 py-1.5 tablet:px-3 tablet:py-2.5 font-text text-text text-center whitespace-nowrap"
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Кол-во к показу:</span>
              <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="p-1.5 bg-background border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {[10, 20, 30, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50"
              >
                {"<<"}
              </button>
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50 not-disabled:cursor-pointer"
              >
                {"<"}
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50 not-disabled:cursor-pointer"
              >
                {">"}
              </button>
              <button
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50 not-disabled:cursor-pointer"
              >
                {">>"}
              </button>

              <span className="flex items-center gap-1 text-gray-600 ml-2">
                Сторінка{" "}
                <strong>
                  {table.getState().pagination.pageIndex + 1} из{" "}
                  {table.getPageCount()}
                </strong>
              </span>
            </div>
          </div>
        </>
      )}
      {isDelModalOpen && (
        <Modal onClose={() => setIsDelModalOpen(false)} isSelfClose isModalOpen>
          <div className="px-5.5 py-2 w-full flex flex-col justify-center items-center">
            <h3 className="font-text text-center">
              {`Вы действительно хотите удалить товар "${productData?.name}" ?`}
            </h3>
            <button
              disabled={deleteMutation.isPending}
              className="mt-5 button font-text text-sm text-text bg-main uppercase cursor-pointer"
              type="button"
              aria-label="удалить"
              onClick={handleDelete}
            >
              {deleteMutation.isPending ? "Удаление..." : "Удалить"}
            </button>
          </div>
        </Modal>
      )}
      {isInfoModalOpen && (
        <Modal
          onClose={() => setIsInfoModalOpen(false)}
          isSelfClose
          isModalOpen
        >
          <ProductInfo productInfo={productInfo} />
        </Modal>
      )}
    </>
  );
}

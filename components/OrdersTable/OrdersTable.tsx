"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import type { Order, OrderStatus } from "@/prisma/generated/client";

import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  useReactTable,
} from "@tanstack/react-table";

import OrderStatusDropdown from "@/components/OrderStatusDropdown/OrderStatusDropdown";

import { ORDER_STATUS_TYPE, PAYMENT_STATUS_TYPE } from "@/constants/order";
import { OrdersWithPagin } from "@/types/types";

const columnHelper = createColumnHelper<Order>();

const SELECT_STATUS_STYLES: Record<OrderStatus, string> = {
  pending:
    "bg-gray-100 border-gray-200 focus:ring-gray-500 focus:border-gray-500",
  processing:
    "bg-yellow-100 border-yellow-200 focus:ring-yellow-500 focus:border-yellow-500",
  shipped:
    "bg-purple-100 border-purple-200 focus:ring-purple-500 focus:border-purple-500",
  completed:
    "bg-green-100 border-green-200 focus:ring-green-500 focus:border-green-500",
  cancelled:
    "bg-red-100 border-red-200 focus:ring-red-500 focus:border-red-500",
  paid: "bg-blue-100 border-blue-200 focus:ring-blue-500 focus:border-blue-500",
  failed:
    "bg-rose-100 border-rose-200 focus:ring-rose-500 focus:border-rose-500",
};

export default function OrdersTable() {
  const [inputValue, setInputValue] = useState("");
  const [globalFilter, setGlobalFilter] = useState<string>("");
  // const [paymentType, setPaymentType] = useState<PaymentType | "all">("all");
  const [status, setStatus] = useState<OrderStatus | "all">("all");
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const pathname = usePathname();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handler = setTimeout(() => {
      setGlobalFilter(inputValue);
      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 1000);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data, isLoading, isError, error, isFetching } =
    useQuery<OrdersWithPagin>({
      queryKey: ["admin-orders", pageIndex, pageSize, globalFilter, status],
      queryFn: async () => {
        const params = new URLSearchParams({
          page: String(pageIndex + 1),
          limit: String(pageSize),
        });

        if (globalFilter !== "") {
          params.append("search", globalFilter);
        }

        if (status !== "all") {
          params.append("status", status);
        }

        const res = await fetch(`/api/orders?${params.toString()}`);
        if (!res.ok) throw new Error("Ошибка при загрузке");
        return res.json();
      },
      refetchInterval: 180000,
      refetchIntervalInBackground: true,
      placeholderData: keepPreviousData,
    });

  const updateMutation = useMutation({
    mutationFn: async (updatedOrder: {
      orderId: number;
      newStatus: string;
    }) => {
      const response = await fetch(
        `/api/update-order/${updatedOrder.orderId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: updatedOrder.orderId,
            newStatus: updatedOrder.newStatus,
          }),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        toast.error(errData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: (error) => alert(error.message),
  });

  const handleStatusUpdate = useCallback(
    (orderId: number, newStatus: string) => {
      updateMutation.mutate({ orderId, newStatus });
    },
    [updateMutation]
  );

  const currentStyles = status === "all" ? "" : SELECT_STATUS_STYLES[status];

  const columns = useMemo(
    () => [
      columnHelper.accessor("publicId", {
        header: "Заказ",
        size: 150,
        cell: (info) => (
          <div className="text-left truncate">
            <Link
              className="underline cursor-pointer"
              href={{
                pathname: `${pathname}/${info.row.original.publicId}`,
              }}
            >
              {info.getValue()}
            </Link>
          </div>
        ),
      }),
      columnHelper.accessor(
        (row) => `${row.customerLastName} ${row.customerFirstName}`,
        {
          id: "fullName",
          header: () => "Заказчик",
          cell: (info) => (
            <div className="max-w-40 md:max-w-60 lg:max-w-65 text-left truncate">
              {info.getValue()}
            </div>
          ),
        }
      ),
      columnHelper.accessor("amount", {
        header: () => "Сумма",
        size: 80,
        cell: (info) => {
          const price = Number(info.getValue());
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
      }),
      columnHelper.display({
        header: "Статус",
        size: 130,
        cell: (info) => {
          return (
            <OrderStatusDropdown
              currentStatus={info.row.original.status}
              orderId={info.row.original.id}
              onStatusChange={handleStatusUpdate}
            />
          );
        },
      }),
      columnHelper.accessor("paymentType", {
        header: () => "Оплата",
        size: 120,
        cell: (info) => {
          const paymentName =
            PAYMENT_STATUS_TYPE[info.row.original.paymentType] ||
            info.row.original.paymentType;
          return paymentName;
        },
      }),
    ],
    [pathname, handleStatusUpdate]
  );

  const table = useReactTable({
    data: data?.orders ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    manualFiltering: true,
    pageCount: data?.pagination.totalPages ?? -1,
    state: {
      pagination: { pageIndex, pageSize },
    },
  });

  if (isLoading)
    return <div className="mt-10 w-full text-center">Загрузка заказов...</div>;

  if (isError)
    if (error.message.includes("pool timeout")) {
      return (
        <div className="mt-10 w-full text-center text-red-500">
          Сервер перегружен. Попрбуйте, пожалуйста, позже.
        </div>
      );
    } else {
      return (
        <div className="mt-10 w-full text-center text-red-500">
          Не удалось загрузить заказы.
        </div>
      );
    }

  return (
    <>
      <div className="mb-2 flex flex-row gap-3">
        <div>
          <label className="mr-2 text-sm font-medium">Статус заказов:</label>
          <select
            className={`p-1 font-medium text-text border border-gray-300 rounded-md bg-background outline-none cursor-pointer ${currentStyles}`}
            value={status}
            onChange={(e) => {
              setStatus(e.target.value as OrderStatus | "all");
              setPagination((prev) => ({ ...prev, pageIndex: 0 }));
            }}
          >
            <option value="all" className="text-text bg-background">
              Все
            </option>
            {Object.entries(ORDER_STATUS_TYPE).map(([key, name]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-2 flex items-center gap-3">
        <div className="relative w-full max-w-50">
          <input
            type="text"
            name="search"
            value={inputValue ?? ""}
            onChange={(e) => setInputValue(e.target.value.trim())}
            placeholder="Поиск по FIO, ФИО, тел."
            className="w-full px-3 py-2 text-sm bg-background border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-main focus:bg-white transition-all text-gray-900"
          />
          {globalFilter && (
            <button
              onClick={() => {
                setGlobalFilter("");
                setInputValue("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-red-500 px-1 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        {data && data.orders.length > 0 && (
          <div className="text-xs text-text font-text">
            <span>Найдено: {data.pagination.totalCount}</span>
          </div>
        )}
      </div>
      {data && (
        <>
          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table
              className={`min-w-full divide-y divide-gray-200 text-left text-sm ${
                isFetching ? "opacity-40" : ""
              }`}
              style={{ width: table.getTotalSize() }}
            >
              <thead className="bg-gray-100">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-2.5 py-2 tablet:px-3 tablet:py-2.5 font-heading text-text text-center md:text-lg"
                        style={{ width: header.getSize() }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="divide-y divide-gray-200 bg-background">
                {table.getRowModel().rows.length > 0 ? (
                  table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-2 py-2 tablet:px-3 tablet:py-2.5 font-text text-text text-center whitespace-nowrap"
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-2 py-1.5 tablet:px-3 tablet:py-2.5 font-text text-text text-left"
                    >
                      Нет доступных заказов
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Кол-во к показу:</span>
              <select
                value={pageSize}
                onChange={(e) => table.setPageSize(Number(e.target.value))}
                className="p-1.5 bg-background border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              >
                {[10, 20, 30, 50].map((pageSize: number) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50 not-disabled:cursor-pointer"
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
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
                className="p-1.5 px-2 bg-background border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-200 disabled:hover:bg-gray-50 not-disabled:cursor-pointer"
              >
                {">>"}
              </button>

              <span className="flex items-center gap-1 text-gray-600 ml-2">
                Страница{" "}
                <strong>
                  {pageIndex + 1} з {data.pagination.totalPages ?? 0}
                </strong>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

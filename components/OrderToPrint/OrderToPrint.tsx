"use client";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ORDER_STATUS_TYPE, PAYMENT_STATUS_TYPE } from "@/constants/order";
import { OrderWithItemsProduct } from "@/types/types";

export default function OrderToPrint({
  order,
}: {
  order: OrderWithItemsProduct;
}) {
  const statusName = ORDER_STATUS_TYPE[order.status] || order.status;

  const contentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef,
    documentTitle: `Заказ_${order.publicId}`,
  });

  return (
    <div ref={contentRef} className="p-8 bg-white text-black">
      <div className="p-1 desktop:p-2">
        <div className="mb-4">
          <div>
            <h1 className="font-text desktop:text-2xl text-text tracking-tight">
              {`Заказ ${order.publicId}`}
            </h1>
            <div className="mt-1 tablet:justify-normal font-text text-xs text-text">
              <span className="self-start mr-1 tablet:mr-3">Создан:</span>
              <span>
                {new Intl.DateTimeFormat("uk-UA", {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(order.createdAt))}
              </span>
            </div>
          </div>
          <button
            className="mt-4 w-min rounded-md border border-gray-300 bg-background px-4 py-2 text-sm font-text text-gray-700 shadow-sm cursor-pointer print:hidden"
            onClick={handlePrint}
          >
            Распечатать
          </button>
        </div>
        <div>
          <div className="space-y-1">
            <div className="rounded-xl border border-gray-200 bg-background">
              <div className="border-b border-gray-200 px-3 py-2">
                <h2 className="font-text text-gray-900">Товары</h2>
              </div>
              <ul className="divide-y divide-gray-200">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="px-3 py-0.5 print:break-inside-avoid"
                  >
                    <div>
                      <h3 className="font-heading text-gray-900">
                        {item.product.name}
                      </h3>
                      <div className="mt-2 flex flex-row flex-wrap gap-3">
                        <p className="text-sm font-text text-gray-900">
                          {`Артикул: ${item.product.sku}`}
                        </p>
                        <p className="text-sm font-text text-gray-900">
                          {`Цена: ${item.price} грн.`}
                        </p>
                        <p className="text-sm font-text text-gray-900">
                          Кол-во:{" "}
                          <span className="mr-1 tablet:mr-2 font-text-semibold text-gray-800">
                            {item.qty}
                          </span>
                          <span className="font-text text-gray-800">
                            {item.product.unit}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between text-sm font-text text-gray-900">
                      Сумма:{" "}
                      <div>
                        <span className="mr-1 desktop:mr-2">
                          {new Intl.NumberFormat("uk-UA", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                          }).format(item.total)}
                        </span>
                        грн.
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 px-3 py-2">
                <div className="flex justify-between font-text text-text">
                  <span>Всего:</span>
                  <div>
                    <span className="mr-1 desktop:mr-2">
                      {new Intl.NumberFormat("uk-UA", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(order.amount)}
                    </span>
                    грн.
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-1 px-3 py-0.5 print:break-inside-avoid">
              <h2 className="font-text text-gray-900">
                Комментарий покупателя
              </h2>
              <div className="mt-3 text-sm text-gray-700">
                {order.comment && order.comment?.length > 0
                  ? order.comment
                  : "Комментарий отсутствует"}
              </div>
            </div>
          </div>
          <div className="border-t divide-y">
            <div className="px-3 py-0.5 print:break-inside-avoid">
              <div className="mt-2 flex flex-row flex-wrap gap-5">
                <h2 className="self-center font-text text-gray-900">
                  Дополнительные сведения
                </h2>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-text uppercase tracking-wider text-gray-500">
                    Статус:
                  </p>
                  <div className="text-sm font-text text-gray-900">
                    {statusName}
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-text uppercase tracking-wider text-gray-500">
                    Тип оплати:
                  </p>
                  <div className="text-sm font-text text-gray-900">
                    {PAYMENT_STATUS_TYPE[order.paymentType] ||
                      order.paymentType}
                  </div>
                </div>
              </div>
            </div>
            <div className="px-3 py-0.5 print:break-inside-avoid">
              <div className="mt-2 flex flex-row flex-wrap gap-5">
                <h2 className="self-center font-text text-gray-900">
                  Покупатель
                </h2>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-text uppercase tracking-wider text-gray-500">
                    Фамилия и Имя:
                  </span>
                  <span className="font-text text-gray-900">
                    {`${order.customerLastName} ${order.customerFirstName}`}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-xs font-text uppercase tracking-wider text-gray-500">
                    Телефон:
                  </p>
                  <span className="font-text text-gray-900">
                    {order.customerPhone}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-3 py-0.5 print:break-inside-avoid">
              <h2 className="font-text text-gray-900">Доставка</h2>
              <div className="mt-2 space-y-3 text-sm">
                <div>
                  <span className="block text-xs font-text uppercase tracking-wider text-gray-500">
                    Адрес отделения:
                  </span>
                  <span className="font-text text-gray-900">
                    {order.postAddr}
                  </span>
                </div>
                <div>
                  <span className="block text-xs font-text uppercase tracking-wider text-gray-500">
                    Номер отделения:
                  </span>
                  <span className="font-text text-gray-800">
                    {order.postName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

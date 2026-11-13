import { connection } from "next/server";

import { getAdminAnalytics } from "@/lib/api";

export default async function Analytics() {
   await connection();
    const {
    totalProducts,
    outOfStockProducts,
    ordersAmount,
    newOrders,
  } = await getAdminAnalytics();
  return (
    <section className="my-0 px-1.5 pb-2.5 lg:px-2.5 lg:pb-5 w-full">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Аналитика
      </h1>
      <h2 className="text-xs lg:text-base font-text uppercase tracking-wider text-text mb-4">
        Товары
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-6 pt-5 shadow-sm ring-1 ring-slate-200/50 sm:px-6 transition-all hover:shadow-md">
          <div>
            <div className="absolute p-2 border border-border rounded-xl">
              <svg className="w-6 h-6 fill-main">
                <use href="/icons.svg#icon-products"></use>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-heading text-text">
              Всего позиций
            </p>
          </div>
          <div className="ml-16 flex items-baseline pb-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {new Intl.NumberFormat("uk-UA", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(totalProducts)}
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-4 py-2 sm:px-6 text-xs text-main border-t border-slate-100">
            Уникальные артикулы
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-6 pt-5 shadow-sm ring-1 ring-slate-200/50 sm:px-6 transition-all hover:shadow-md">
          <div>
            <div className="absolute p-2 border border-border rounded-xl">
              <svg className="w-6 h-6 fill-main">
                <use href="/icons.svg#icon-products-down"></use>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-heading text-text">
              Закончились на складе
            </p>
          </div>
          <div className="ml-16 flex items-baseline pb-4">
            <p
              className={`text-2xl font-semibold tracking-tight ${
                outOfStockProducts > 0 ? "text-red-500" : "text-text"
              }`}
            >
              {outOfStockProducts > 0 ? outOfStockProducts : "-"}
            </p>
            {outOfStockProducts > 0 && (
              <span className="ml-2 text-xs font-medium text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                Требует внимания
              </span>
            )}
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-4 py-2 sm:px-6 text-xs text-main border-t border-slate-100">
            Товары с нулевым остатком
          </div>
        </div>
      </div>
      <h2 className="text-xs lg:text-base font-text uppercase tracking-wider text-text mb-4">
        Заказы
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-8">
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-6 pt-5 shadow-sm ring-1 ring-slate-200/50 sm:px-6 transition-all hover:shadow-md">
          <div>
            <div className="absolute p-2 border border-border rounded-xl">
              <svg className="w-6 h-6 fill-main">
                <use href="/icons.svg#icon-orders"></use>
              </svg>
            </div>
            <p className="ml-16 text-sm font-heading text-text wrap-break-word">
              Всего заказов (за последние 30 дней)
            </p>
          </div>
          <div className="ml-16 flex items-baseline pb-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {new Intl.NumberFormat("uk-UA", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(ordersAmount)}
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-4 py-2 sm:px-6 text-xs text-main border-t border-slate-100">
            Включая завершенные и в работе
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-white px-4 pb-6 pt-5 shadow-sm ring-1 ring-slate-200/50 sm:px-6 transition-all hover:shadow-md">
          <div>
            <div className="absolute p-2 border border-border rounded-xl">
              <svg className="w-6 h-6 fill-main">
                <use href="/icons.svg#icon-orders-new"></use>
              </svg>
            </div>
            <p className="ml-16 truncate text-sm font-heading text-text">
              Новые заказы
            </p>
          </div>
          <div className="ml-16 flex items-baseline pb-4">
            <p className="text-2xl font-semibold tracking-tight text-slate-900">
              {new Intl.NumberFormat("uk-UA", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              }).format(newOrders)}
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 bg-slate-50 px-4 py-2 sm:px-6 text-xs text-main border-t border-slate-100">
            Ждут подтверждения 
          </div>
        </div>
      </div>
    </section>
  );
}

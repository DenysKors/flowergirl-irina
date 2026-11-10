import { connection } from "next/server";
import { notFound } from "next/navigation";

import OrderStatusAction from "@/components/OrderSatusAction/OrderSatusAction";
import ClientOrderDate from "@/components/ClientOrderDate/ClientOrderDate";

import { ORDER_STATUS_TYPE, PAYMENT_TYPE } from "@/constants/order";
import { getAdminOrderById } from "@/lib/api";
import { OrderWithItemsProduct } from "@/types/types";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function OrderPage({ params }: OrderPageProps) {
  await connection();
  const { id } = await params;
  const order: OrderWithItemsProduct | null = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  const statusName = ORDER_STATUS_TYPE[order.status] || order.status;

  return (
    <section className="p-2 lg:p-4 w-full bg-gray-200">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-heading lg:text-2xl text-text tracking-tight wrap-break-word">
              Заказ{" "}
              <span className="font-text block tablet:inline">{order.publicId}</span>
            </h1>
            <span className="self-start inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-text text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {statusName}
            </span>
          </div>
          <div className="mt-1 md:justify-normal font-text text-xs text-gray-900">
            <span className="self-start mr-1 md:mr-3">Создан:</span>
            <ClientOrderDate createdAt={order.createdAt} />
          </div>
          {order.paymentType === PAYMENT_TYPE.PREPAID && (
            <div className="mt-1 md:justify-normal font-text text-xs text-gray-900">
              <span className="self-start mr-1 md:mr-3">{`Номер заказа WayForPay: ${order.orderRef}`}</span>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-background shadow-sm">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="font-text text-gray-900">Товары</h2>
            </div>
            <ul className="divide-y divide-gray-200">
              {order.items.map((item) => (
                <li key={item.id} className="px-5 py-4">
                  <div>
                    <div>
                      <h3 className="font-text text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {`Артикул: ${item.product.sku}`}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-text text-gray-900">
                        {`Цена: ${item.price} грн.`}
                      </p>
                      <p className="mt-1 text-sm font-text text-gray-900">
                        Кол-во:{" "}
                        <span className="mr-1 md:mr-2 font-text text-gray-800">
                          {item.qty}
                        </span>
                        <span className="font-text text-gray-800">
                          {item.product.unit}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-sm font-text text-gray-900">
                    Сумма:{" "}
                    <div>
                      <span className="mr-1 lg:mr-2">
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
            <div className="border-t border-gray-200 rounded-bl-xl rounded-br-xl bg-gray-50 px-5 py-4">
              <div className="flex justify-between font-text text-text">
                <span>Всего:</span>
                <div>
                  <span className="mr-1 lg:mr-2">
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
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="font-text text-gray-900">Комментарий покупателя</h2>
            <div className="mt-3 rounded-lg text-sm text-gray-700">
              {order.comment && order.comment?.length > 0
                ? order.comment
                : "Комментарий отсутствует"}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <OrderStatusAction
            paymentType={order.paymentType}
            orderStatus={order.status}
            orderId={order.id}
          />
          <div className="rounded-xl border border-gray-200 bg-background p-5 shadow-sm">
            <h2 className="font-text text-gray-900">Покупатель</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <span className="block text-xs font-text uppercase tracking-wider text-gray-500">
                  Фамилия и имя:
                </span>
                <span className="font-text text-gray-900">
                  {`${order.customerLastName} ${order.customerFirstName}`}
                </span>
              </div>
              <div>
                <span className="block text-xs font-text uppercase tracking-wider text-gray-500">
                  Телефон:
                </span>
                <a
                  href={`tel:+${order.customerPhone.replace(/[^0-9]/g, "")}`}
                  className="font-medium link-base"
                >
                  {order.customerPhone}
                </a>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-background p-5 shadow-sm">
            <h2 className="font-text text-gray-900">Доставка</h2>
            <div className="mt-4 space-y-3 text-sm">
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
    </section>
  );
}

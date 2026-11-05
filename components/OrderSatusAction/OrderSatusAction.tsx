"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import type { OrderStatus, PaymentType } from "@/prisma/generated/client";

import { ALLOWED_STATUS_TRANSITIONS } from "@/services/OrderStateMap";
import { ORDER_STATUS_TYPE, PAYMENT_STATUS_TYPE } from "@/constants/order";

type OrderStatusActionProps = {
  paymentType: PaymentType;
  orderStatus: OrderStatus;
  orderId: number;
};

export default function OrderStatusAction({
  paymentType,
  orderStatus,
  orderId,
}: OrderStatusActionProps) {
  const router = useRouter();

  const nextAvailableStatuses = ALLOWED_STATUS_TRANSITIONS[orderStatus] || [];

  const handleStatusChange = async (
    evt: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (evt.target.value === status) return;

    const response = await fetch(`/api/admin/update-order/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId,
        newStatus: evt.target.value,
      }),
    });
    if (!response.ok) {
      const errData = await response.json();
      toast.error(errData);
    }
    router.refresh();
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-background p-5 shadow-sm">
      <h2 className="font-text text-gray-900">Изменение статуса</h2>
      <div className="mt-4">
        <label className="block text-xs font-text uppercase tracking-wider text-gray-500">
          Статус заказа
        </label>
        <select
          className="mt-1.5 block rounded-lg border border-gray-300 bg-background px-3 py-2 text-sm"
          value={orderStatus}
          onChange={handleStatusChange}
        >
          <option value={orderStatus}>{ORDER_STATUS_TYPE[orderStatus]}</option>
          {nextAvailableStatuses.map((item) => (
            <option key={item} value={item}>
              {ORDER_STATUS_TYPE[item]}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 border-t border-gray-100 pt-4">
        <label className="block text-xs font-text uppercase tracking-wider text-gray-500">
          Тип оплаты:
        </label>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-sm font-text text-gray-900">
            {PAYMENT_STATUS_TYPE[paymentType] || paymentType}
          </span>
        </div>
      </div>
    </div>
  );
}

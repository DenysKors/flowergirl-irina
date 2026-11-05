"use client";

import { useState, useRef, useEffect } from "react";
import type { OrderStatus } from "@/prisma/generated/client";

import { ALLOWED_STATUS_TRANSITIONS } from "@/services/OrderStateMap";
import { ORDER_STATUS_TYPE } from "@/constants/order";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-gray-100 border-gray-200",
  processing: "bg-yellow-100 border-yellow-200",
  shipped: "bg-purple-100 border-purple-200",
  completed: "bg-green-100 border-green-200",
  cancelled: "bg-red-100 border-red-200",
  paid: "bg-blue-100 border-blue-200",
  failed: "bg-rose-100 border-rose-200",
};

type StatusDropdownProps = {
  currentStatus: OrderStatus;
  orderId: number;
  onStatusChange: (orderId: number, newStatus: string) => void;
};

export default function OrderStatusDropdown({
  currentStatus,
  orderId,
  onStatusChange,
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statusName = ORDER_STATUS_TYPE[currentStatus] || currentStatus;
  const statusClass =
    STATUS_STYLES[currentStatus] || "bg-gray-100 text-gray-800 border-gray-200";

  const nextAvailableStatuses = ALLOWED_STATUS_TRANSITIONS[currentStatus] || [];
  const hasTransitions = nextAvailableStatuses.length > 0;

  const handleStatusChange = (status: string) => {
    onStatusChange(orderId, status);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-text border ${statusClass} ${
          hasTransitions ? "cursor-pointer" : "cursor-not-allowed"
        }`}
        type="button"
        aria-label="Изменить статус"
        title={hasTransitions ? "Изменить статус" : "Статус изменить нельзя"}
        disabled={!hasTransitions}
        onClick={() => hasTransitions && setIsOpen(!isOpen)}
      >
        {statusName}
      </button>

      {isOpen && hasTransitions && (
        <div
          className="absolute bottom-0 right-0 mt-2 bg-background border border-slate-200 rounded-lg shadow-xl shadow-slate-950/2.5 p-1 z-50 max-h-30 overflow-x-auto"
          role="menu"
        >
          <div className="flex flex-row" aria-orientation="vertical">
            {nextAvailableStatuses.map((status) => (
              <button
                key={status}
                onClick={() => handleStatusChange(status)}
                className="px-2 py-1 tablet:px-4 tablet:py-2 text-xs font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-md cursor-pointer"
                role="menuitem"
              >
                {ORDER_STATUS_TYPE[status]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

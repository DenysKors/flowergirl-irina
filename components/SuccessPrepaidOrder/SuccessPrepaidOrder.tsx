"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const fetchOrderStatus = async (orderReference: string) => {
  const response = await fetch("/api/orders/check-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderReference }),
  });

  if (!response.ok) throw new Error("Помилка сервера");
  return response.json();
};

export default function SuccessPrepaidOrder() {
  const [localRef] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("pending_order_ref");
    }
    return null;
  });

  const searchParams = useSearchParams();

  const urlOrderRef = searchParams.get("ref");

  const activeOrderRef = urlOrderRef || localRef;

  const { data, error, isLoading } = useQuery({
    queryKey: ["orderStatus", activeOrderRef],
    queryFn: () => fetchOrderStatus(activeOrderRef!),
    enabled: !!activeOrderRef,
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "paid" || status === "failed") {
        return false;
      }
      return 2000;
    },
    refetchIntervalInBackground: false,
  });

  const isFinal = data?.status === "paid" || data?.status === "failed";

  useEffect(() => {
    if (isFinal) {
      localStorage.removeItem("pending_order_ref");
    }
  }, [isFinal]);

  if (!activeOrderRef) {
    return (
      <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
        Номер замовлення не знайдено. Зв&apos;яжіться з менеджером.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
        Перевірка платежу...
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-text text-base md:text-lg lg:text-xl text-center text-red-500">
        Помилка зв&apos;язку.
      </div>
    );
  }

  return (
    <>
      {data && data.status === "pending" && !isLoading && !error && (
        <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
          Платіж в стадії обробки.
        </div>
      )}
      {data && data.status === "failed" && !isLoading && !error && (
        <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
          Помилка при оплаті.
        </div>
      )}
      {data && data.status === "paid" && !isLoading && !error && (
        <>
          <h1 className="pb-6 font-heading text-xl md:text-2xl lg:text-3xl text-center">
            Платіж успішно прийнято!
          </h1>
          <p className="pb-4 font-text text-base md:text-lg lg:text-xl text-text text-center">
            {`Номер вашого замовлення: ${data.publicId}`}
          </p>
          <p className="font-text text-base md:text-lg lg:text-xl text-text text-center">
            Найближчим часом ми з вами зв&apos;яжемося та повідомимо про деталі
            відправки.
          </p>
        </>
      )}
    </>
  );
}

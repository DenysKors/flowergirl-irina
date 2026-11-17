"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useBasketStore } from "@/store/basketStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

class ApiError extends Error {
  constructor(public status: number, message: string, public code?: string) {
    super(message);
  }
}

const fetchOrderStatus = async (orderReference: string) => {
  const response = await fetch("/api/orders/check-status", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderReference }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      body?.message ?? "Request failed",
      body?.code
    );
  }
  return response.json();
};

export default function SuccessPrepaidOrder() {
  const reset = useBasketStore((state) => state.reset);
  const searchParams = useSearchParams();

  const rawRef = searchParams.get("ref");
  const urlOrderRef =
    rawRef && rawRef !== "null" && rawRef !== "undefined" ? rawRef : null;

  const { data, error, isLoading } = useQuery({
    queryKey: ["orderStatus", urlOrderRef],
    queryFn: () => fetchOrderStatus(urlOrderRef!),
    enabled: !!urlOrderRef,
    retry: (failureCount, err) => {
      if (err instanceof ApiError && err.status >= 400 && err.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    refetchInterval: (query) => {
      const status = query.state.data?.status;

      if (status === "paid" || status === "failed") return false;

      if (query.state.status === "error") return false;

      if (query.state.dataUpdateCount >= 10) return false;

      return 2000;
    },
    refetchIntervalInBackground: false,
  });

  const isFinal = data?.status === "paid" || data?.status === "failed";
  const isOrderNotFound =
    error instanceof ApiError && (error.status === 422 || error.status === 404);

  useEffect(() => {
    if (isFinal) {
      reset();
    }
  }, [isFinal]);

  if (!urlOrderRef) {
    return (
      <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
        Номер замовлення не знайдено.
        <p className="mt-6 font-text text-base md:text-lg lg:text-xl text-text text-center">
          Якщо самостійно скасували оплату, перейдіть на головну сторінку.
        </p>
        <div className="text-center">
          <Link
            className="mt-6 inline-block py-2 xl:py-2.5 px-6 rounded-lg font-text text-background bg-violet-800 hover:bg-violet-950 cursor-pointer"
            href="/"
            title="На головну сторінку"
          >
            На головну
          </Link>
        </div>
      </div>
    );
  }

  if (isOrderNotFound) {
    return (
      <div className="font-text text-base md:text-lg lg:text-xl text-text text-center">
        Номер замовлення не знайдено. Зв&apos;яжіться з менеджером.
        <div className="text-center">
          <Link
            className="mt-6 inline-block py-2 xl:py-2.5 px-6 rounded-lg font-text text-background bg-violet-800 hover:bg-violet-950 cursor-pointer"
            href="/"
            title="На головну сторінку"
          >
            На головну
          </Link>
        </div>
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
        <div className="flex flex-col items-center gap-6">
          <p className="font-text text-base md:text-lg lg:text-xl text-text text-center">
            Платіж в стадії обробки...
          </p>
          <Link
            className="py-2 xl:py-2.5 px-6 rounded-lg font-text text-background bg-violet-800 hover:bg-violet-950 cursor-pointer"
            href="/"
            title="На головну сторінку"
          >
            На головну
          </Link>
        </div>
      )}
      {data && data.status === "failed" && !isLoading && !error && (
        <div className="flex flex-col items-center gap-6">
          <p className="font-text text-base md:text-lg lg:text-xl text-text text-center">
            Помилка при оплаті.
          </p>
          <Link
            className="py-2 xl:py-2.5 px-6 rounded-lg font-text text-background bg-violet-800 hover:bg-violet-950 cursor-pointer"
            href="/"
            title="На головну сторінку"
          >
            На головну
          </Link>
        </div>
      )}
      {data && data.status === "paid" && !isLoading && !error && (
        <>
          <h1 className="pb-6 font-heading text-xl md:text-2xl lg:text-3xl text-center">
            Платіж успішно прийнято!
          </h1>
          <p className="pb-4 font-text text-base md:text-lg lg:text-xl text-text text-center">
            Номер вашого замовлення:{" "}
            <span className="font-text text-base md:text-lg lg:text-xl text-text whitespace-nowrap">
              {data.publicId}
            </span>
          </p>
          <p className="pb-6 font-text text-base md:text-lg lg:text-xl text-text text-center">
            Ваше замовлення буде відправлене впродовж 5 робочих днів за
            сприятливих погодних умов.
          </p>
          <div className="text-center">
            <Link
              className="inline-block py-2 xl:py-2.5 px-6 rounded-lg font-text text-background bg-violet-800 hover:bg-violet-950 cursor-pointer"
              href="/"
              title="На головну сторінку"
            >
              На головну
            </Link>
          </div>
        </>
      )}
    </>
  );
}

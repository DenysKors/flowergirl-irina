"use client";

import Link from "next/link";
import Image from "next/image";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import Logo from "@/assets/images/Logo.png";

const errorMap = {
  ["AccessDenied"]: (
    <p style={{ textAlign: "center" }}>
      Виникла проблема при аутентифікації. <strong>Доступ заборонено.</strong>
    </p>
  ),
};

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthError />
    </Suspense>
  );
}

function AuthError() {
  const search = useSearchParams();
  const error = search.get("error") as string;

  return (
    <>
      <header className="mx-auto w-full max-w-7xl py-2 px-1 md:py-3 flex items-center justify-center border-b border-b-border-gray">
        <Image
          src={Logo}
          width={80}
          height={80}
          priority
          className="md:w-40 md:h-40 inline-block lg:w-50 lg:h-50"
          alt="Flowergirl Irina Logo"
        />
      </header>
      <main className="container h-50 flex flex-col items-center justify-center gap-8">
        <h5 className="font-heading text-main lg:text-2xl">
          Щось пішло не так, як хотілось!
        </h5>
        <div>
          {errorMap[error] || "Будь ласка напишіть нам, якщо це сталося."}
        </div>
        <Link href="/">Повернутися на Головну</Link>
      </main>
    </>
  );
}

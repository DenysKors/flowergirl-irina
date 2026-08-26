"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavDashboard() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col content-start gap-6 lg:gap-8">
      <Link
        title="Аналитика"
        className={`${
          pathname === `/dashboard/analytics`
            ? "p-1.5 mx-0.5 lg:p-2 rounded-tl-md rounded-bl-md bg-background lg:rounded-tl-lg lg:rounded-bl-lg"
            : "p-1.5 mx-0.5 lg:p-2"
        }`}
        href="/dashboard/analytics"
      >
        <svg
          className={`${
            pathname === `/dashboard/analytics`
              ? "w-6 h-6 fill-main lg:w-8 lg:h-8"
              : "w-6 h-6 fill-background lg:w-8 lg:h-8"
          }`}
        >
          <use href="/icons.svg#icon-analytics"></use>
        </svg>
      </Link>
      <Link
        title="Товары"
        className={`${
          pathname === `/dashboard/products`
            ? "p-1.5 mx-0.5 lg:p-2 rounded-tl-md rounded-bl-md bg-background lg:rounded-tl-lg lg:rounded-bl-lg"
            : "p-1.5 mx-0.5 lg:p-2"
        }`}
        href="/dashboard/products"
      >
        <svg
          className={`${
            pathname === `/dashboard/products`
              ? "w-6 h-6 fill-main lg:w-8 lg:h-8"
              : "w-6 h-6 fill-background lg:w-8 lg:h-8"
          }`}
        >
          <use href="/icons.svg#icon-products"></use>
        </svg>
      </Link>
      <Link
        title="Категории"
        className={`${
          pathname === `/dashboard/categories`
            ? "p-1.5 mx-0.5 lg:p-2 rounded-tl-md rounded-bl-md bg-background lg:rounded-tl-lg lg:rounded-bl-lg"
            : "p-1.5 mx-0.5 lg:p-2"
        }`}
        href="/dashboard/categories"
      >
        <svg
          className={`${
            pathname === `/dashboard/categories`
              ? "w-6 h-6 fill-main lg:w-8 lg:h-8"
              : "w-6 h-6 fill-background lg:w-8 lg:h-8"
          }`}
        >
          <use href="/icons.svg#icon-categories"></use>
        </svg>
      </Link>
      <Link
        title="Добавить товар"
        className={`${
          pathname === `/dashboard/add-product`
            ? "p-1.5 mx-0.5 lg:p-2 rounded-tl-md rounded-bl-md bg-background lg:rounded-tl-lg lg:rounded-bl-lg"
            : "p-1.5 mx-0.5 lg:p-2"
        }`}
        href="/dashboard/add-product"
      >
        <svg
          className={`${
            pathname === `/dashboard/add-product`
              ? "w-6 h-6 fill-main lg:w-8 lg:h-8"
              : "w-6 h-6 fill-background lg:w-8 lg:h-8"
          }`}
        >
          <use href="/icons.svg#icon-add-product"></use>
        </svg>
      </Link>
      <Link
        title="Добавить категорию"
        className={`${
          pathname === `/dashboard/add-category`
            ? "p-1.5 mx-0.5 lg:p-2 rounded-tl-md rounded-bl-md bg-background lg:rounded-tl-lg lg:rounded-bl-lg"
            : "p-1.5 mx-0.5 lg:p-2"
        }`}
        href="/dashboard/add-category"
      >
        <svg
          className={`${
            pathname === `/dashboard/add-category`
              ? "w-6 h-6 fill-main lg:w-8 lg:h-8"
              : "w-6 h-6 fill-background lg:w-8 lg:h-8"
          }`}
        >
          <use href="/icons.svg#icon-add-category"></use>
        </svg>
      </Link>
    </nav>
  );
}

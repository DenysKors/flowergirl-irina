"use client";

import Link from "next/link";

import { Product } from "@/types/types";
import { SELL_STATUS_ENUMS } from "@/constants/enums";

type ProductsListProps = {
  products: Product[];
};

export default function ProductsList({ products }: ProductsListProps) {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <ul className="mx-auto pt-4 pb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 justify-items-center">
      {products.map(({ code, title, price, qty }) => {
        return (
          <li
            key={code}
            className="pb-3 md:pb-3.5 lg:pb-4 flex flex-col border-b border-b-border-gray"
          >
            <Link
              className="rounded-md"
              href={{
                pathname: `/catalog/plants/${code}`,
              }}
            >
              <img
                src={`${baseUrl}/plant${code}.jpg`}
                alt={title}
                width={250}
                height={445}
              />
              <p className="mt-2 md:mt-4 font-heading text-main md:text-lg lg:text-xl truncate">
                {title}
              </p>
            </Link>
            <div className="mt-2 md:mt-4 flex justify-between items-center">
              <span className="font-text text-sm lg:text-base">{`${price} грн`}</span>
              {qty > 0 && (
                <button
                  className="px-2.5 py-1 lg:px-3 lg:py-1.5 text-sm lg:text-base text-background flex items-center justify-center gap-0.5 lg:gap-1 bg-violet-800 rounded-2xl lg:rounded-4xl cursor-pointer"
                  type="button"
                  aria-label="Додати у кошик"
                  title="Додати у кошик"
                >
                  +
                  <svg className="w-3 h-3 fill-background lg:w-5 lg:h-5">
                    <use href={`${baseUrl}/icons.svg#icon-shopping-bag`}></use>
                  </svg>
                </button>
              )}
            </div>
            <div className="mt-4 md:mt-6">
              <span className="font-text text-xs md:text-sm lg:text-base">
                {qty === 0
                  ? SELL_STATUS_ENUMS.notAvailable
                  : `${SELL_STATUS_ENUMS.inStock} ${qty}`}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

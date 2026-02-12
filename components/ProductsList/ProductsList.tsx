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
              <p className="mt-2 md:mt-4 font-heading text-main md:text-lg lg:text-xl">
                {title}
              </p>
            </Link>
            <div className="mt-2 md:mt-4">
              <span className="font-text text-sm lg:text-base">{`${price} грн`}</span>
              <button type="button" aria-label="Додати у кошик"></button>
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

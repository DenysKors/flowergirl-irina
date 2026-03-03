"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import Modal from "../ModalRoot/ModalRoot";

import { useBasketStore } from "@/store/basketStore";

const ProductBasket = dynamic(() => import("../ProductBasket/ProductBasket"));

export default function BasketIcon() {
  const [isShowBasket, setIsShowBasket] = useState(false);
  const basketProducts = useBasketStore((state) => state.products);
  return (
    <>
      <button
        className="relative lg:p-2 flex flex-col items-center cursor-pointer justify-self-end lg:justify-self-center"
        type="button"
        aria-label="Кошик"
        onClick={() => setIsShowBasket(true)}
      >
        <svg
          className={`${
            basketProducts.length === 0
              ? "w-7 h-7 fill-text md:w-8 md:h-8"
              : "w-7 h-7 fill-main md:w-8 md:h-8 "
          }`}
        >
          <use href="icons.svg#icon-shopping-bag"></use>
        </svg>
        {basketProducts.length > 0 && (
          <span className="absolute -top-2 left-[68%] px-2 py-0.75 text-xs lg:text-base font-bold rounded-full bg-violet-800 text-background leading-none text-center uppercase">
            {basketProducts.length}
          </span>
        )}
        Кошик
      </button>
      {isShowBasket && (
        <Modal onClose={() => setIsShowBasket(false)}>
          <ProductBasket onClose={setIsShowBasket} />
        </Modal>
      )}
    </>
  );
}

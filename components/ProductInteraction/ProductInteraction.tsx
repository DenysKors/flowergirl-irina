"use client";

import toast from "react-hot-toast";

import { useState } from "react";

import { useBasketStore } from "@/store/basketStore";

type ProductInteractionProps = {
  title: string;
  price: number;
  imageUrl: string;
  code: string;
  qty: number;
};

export default function ProductInteraction({
  title,
  price,
  imageUrl,
  code,
  qty,
}: ProductInteractionProps) {
  const [prodQty, setProdQty] = useState(1);
  const basketProducts = useBasketStore((state) => state.products);
  const addProduct = useBasketStore((state) => state.addProduct);

  const handleDecr = () => {
    if (prodQty === 1) return;
    setProdQty(prodQty - 1);
  };

  const handleIncr = () => {
    if (prodQty >= qty) return;
    setProdQty(prodQty + 1);
  };

  const handleBasketClick = () => {
    const searchedProduct = basketProducts.find((item) => item.code === code);
    if (searchedProduct) return toast.error("Цей товар вже у кошику");
    const basketProduct = {
      title,
      price,
      sumPrice: price * prodQty,
      imageUrl,
      code,
      userQty: prodQty,
      stock: qty,
    };
    addProduct(basketProduct);
    toast.success("Товар додано у кошик");
  };

  return (
    <div className="sm:flex">
      <div className="w-min mb-4 sm:mb-0 sm:mr-4">
        <span className="block mb-0.5 font-text">Кількість</span>
        <div className="flex items-center border border-gray-900 content-justify bg-white rounded-lg">
          <button
            className="p-3 cursor-pointer"
            type="button"
            aria-label="зменшити кількість"
            onClick={handleDecr}
          >
            <svg className="w-4.5 h-4.5">
              <use href="icons.svg#icon-minus"></use>
            </svg>
          </button>
          <span className="px-1 py-2 w-10 text-center">{prodQty}</span>
          <button
            className="p-3 cursor-pointer"
            type="button"
            aria-label="збільшити кількість"
            onClick={handleIncr}
          >
            <svg className="w-4.5 h-4.5">
              <use href="icons.svg#icon-plus"></use>
            </svg>
          </button>
        </div>
      </div>
      <button
        className="button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
        type="button"
        onClick={handleBasketClick}
      >
        Додати у кошик
      </button>
    </div>
  );
}

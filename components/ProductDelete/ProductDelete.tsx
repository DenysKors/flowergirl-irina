"use client";

import toast from "react-hot-toast";

import { useState, useEffect } from "react";

import Modal from "../ModalRoot/ModalRoot";
import { Product } from "@/types/types";

type ProductDeleteProps = {
  currentProducts: Product[];
  productType: string;
};

type productData = Pick<Product, "title" | "code">;

export default function ProductDelete({
  currentProducts,
  productType,
}: ProductDeleteProps) {
  const [products, setProducts] = useState(currentProducts);
  const [productData, setProductData] = useState<productData | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setProducts(currentProducts);
  }, [currentProducts]);

  const handleDelete = async () => {
    if (productType === "") return toast.error("Выберите вид товара");

    const response = await fetch("/api/delete-product", {
      method: "DELETE",
      body: JSON.stringify({ productType, code: productData?.code }),
    });

    if (response.ok) {
      setProducts(products.filter((item) => item.code !== productData?.code));
      toast.success(`Товар арт. ${productData?.code} удален`);
      setShowModal(false);
      setProductData(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <>
      <ul className="pt-2.5 flex flex-wrap justify-center gap-2.5">
        {products &&
          products.map(({ code, title, category, price, qty }) => (
            <li
              className="p-1 w-60 lg:max-w-60 flex flex-col justify-between border border-gray-300 rounded-lg"
              key={code}
            >
              <div className="flex flex-col gap-2">
                <p className="font-heading text-main md:text-lg lg:text-xl wrap-anywhere">
                  {title}
                </p>
                <p className="text-sm md:text-base text-text wrap-anywhere">
                  {`Арт. ${code}`}
                </p>
                <p className="text-sm md:text-base text-text wrap-anywhere">
                  {`Категория: ${category.reduce((accum, item, idx): string => {
                    if (idx === 0) {
                      return accum + item.label;
                    } else {
                      return accum + ", " + item.label;
                    }
                  }, "")}`}
                </p>
                <p className="text-sm md:text-base break-all text-text">
                  {`Цена: ${price} грн`}
                </p>
                <p className="text-sm md:text-base break-all text-text">
                  {`Кол-во: ${qty} шт`}
                </p>
              </div>
              <button
                className="button ms-auto cursor-pointer"
                type="button"
                aria-label="видалити"
                title="видалити"
                onClick={() => {
                  setProductData({ title, code });
                  setShowModal(true);
                }}
              >
                <svg className="w-6 h-6 fill-border-gray hover:fill-red-500">
                  <use href="/icons.svg#icon-trash"></use>
                </svg>
              </button>
            </li>
          ))}
      </ul>
      {showModal && productData && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-heading text-xl text-center">
              {`Вы действительно хотите удалить товар "${productData.title}" ?`}
            </h3>
            <div className="py-3">
              <button
                className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
                type="button"
                aria-label="видалити"
                title="видалити"
                onClick={handleDelete}
              >
                Удалить
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

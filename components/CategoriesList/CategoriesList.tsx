"use client";

import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import Modal from "../ModalRoot/ModalRoot";
import { Categories } from "@/types/types";

type CategoriesListProps = {
  productCategories: Categories[];
  productType: string;
};

export default function CategoriesList({
  productCategories,
  productType,
}: CategoriesListProps) {
  const [categories, setCategories] = useState(productCategories);
  const [categoryLabel, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setCategories(productCategories);
  }, [productCategories]);

  const handleDelete = async () => {
    if (productType === "") return toast.error("Выберите вид товара");

    const response = await fetch("/api/delete-category", {
      method: "DELETE",
      body: JSON.stringify({ productType, categoryLabel }),
    });

    if (response.ok) {
      setCategories(
        productCategories.filter((item) => item.label !== categoryLabel)
      );
      setShowModal(false);
      setCategoryName("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      toast.success(`Категория "${categoryLabel}" удалена`);
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <>
      <ul className="pt-2.5 flex flex-wrap justify-start gap-2.5">
        {categories &&
          categories.map(({ label, value }) => (
            <li
              className="p-1 flex items-center gap-2 border border-gray-300 rounded-lg"
              key={value}
            >
              <span className="text-sm md:text-base break-all text-text antialiased">
                {label}
              </span>
              <button
                className="button ms-auto cursor-pointer"
                type="button"
                aria-label="видалити"
                title="видалити"
                onClick={() => {
                  setCategoryName(label);
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
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="w-full flex flex-col justify-center items-center">
            <h3 className="font-heading text-xl text-center">
              {`Вы действительно хотите удалить категорию "${categoryLabel}" ?`}
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

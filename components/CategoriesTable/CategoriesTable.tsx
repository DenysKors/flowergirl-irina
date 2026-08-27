"use client";

import React from "react";
import toast from "react-hot-toast";

import { useState } from "react";

import Modal from "@/components/ModalRoot/ModalRoot";
import { CategoryWithSubs } from "@/types/types";

type CategoryData = {
  id: string;
  name: string;
};

export default function CategoriesTable({
  categoriesWithSubs,
}: {
  categoriesWithSubs: CategoryWithSubs[];
}) {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);

  const handleDelete = async () => {
    if (!categoryData) return;

    const response = await fetch(`/api/delete-category/${categoryData.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      toast.success(`Подкатегория ${categoryData.name} удалена`);
      setisModalOpen(false);
      setCategoryData(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const errData = await response.json();
      toast.error(errData);
    }
  };

  return (
    <>
      <div className="w-full m-auto max-w-2xl flex flex-col gap-4 rounded-md">
        {categoriesWithSubs && categoriesWithSubs.length === 0 && (
          <div className="mt-10 w-full text-center">
            Нет доступных категорий/подкатегорий
          </div>
        )}
        {categoriesWithSubs &&
          categoriesWithSubs.map((item) => {
            return (
              <div
                key={item.id}
                className="grid grid-cols-[1fr_1fr_auto] grow bg-background rounded-md border border-gray-300"
              >
                <div className="p-1 text-center text-sm font-text font-semibold border-b border-gray-300">
                  Категория
                </div>
                <div className="p-1 text-center text-sm font-text font-semibold border-b border-gray-300">
                  Подкатегория
                </div>
                <div className="p-1 text-center text-sm border-b font-text border-gray-300"></div>
                <div className="p-2 flex justify-center text-center items-center text-sm font-text">
                  {item.name}
                </div>
                <div className="p-2 text-center text-sm font-text"></div>
                <div className="p-2"></div>
                {item.subCategories.length > 0 &&
                  item.subCategories.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <div className="p-2 text-center text-sm font-text border-t border-gray-300"></div>
                      <div className="p-2 flex justify-center items-center text-center text-sm font-text border-t border-gray-300">
                        {sub.name}
                      </div>
                      <div className="p-2 border-t border-gray-300">
                        <button
                          className="button-icon bg-background cursor-pointer"
                          type="button"
                          aria-label="Удалить"
                          title="Удалить"
                          onClick={() => {
                            setCategoryData({
                              id: sub.id.toString(),
                              name: sub.name,
                            });
                            setisModalOpen(true);
                          }}
                        >
                          <svg className="h-5.5 w-5.5 fill-main hover:fill-red-500 focus:fill-red-500">
                            <use href="/icons.svg#icon-trash"></use>
                          </svg>
                        </button>
                      </div>
                    </React.Fragment>
                  ))}
              </div>
            );
          })}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setisModalOpen(false)} isModalOpen isSelfClose>
          <div className="px-5.5 py-2 w-full flex flex-col justify-center items-center">
            <h3 className="font-text text-center">
              {`Вы действительно хотите удалить подкатегорию "${categoryData?.name}" ?`}
            </h3>
            <button
              className="mt-5 button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
              type="button"
              aria-label="удалить"
              onClick={handleDelete}
            >
              Удалить
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

"use client";

import { useState } from "react";

import ProductDelete from "@/components/ProductDelete/ProductDelete";

export default function DelProdByCode() {
  const [tabId, setTabId] = useState("plant");

  const handleClick = (
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    switch (evt.currentTarget.id) {
      case "tab-0":
        setTabId("plant");
        break;
      case "tab-protection":
        setTabId("protection");
        break;
      case "tab-supplies":
        setTabId("supplies");
        break;
      default:
        setTabId("plant");
    }
  };
  return (
    <section className="my-0 mx-auto px-1.5 pb-2.5 lg:px-2.5 lg:pb-5">
      <h1 className="mb-2 font-heading lg:text-xl uppercase text-center text-text">
        Удалить
      </h1>
      <div className="w-full flex justify-center border-b border-b-border-gray">
        <button
          className={`${
            tabId === "plant"
              ? "pb-2.5 font-text  border-b-2 border-main"
              : "py-2 px-3 font-text"
          }`}
          type="button"
          id="tab-plant"
          onClick={handleClick}
        >
          Растение
        </button>
        <button
          className={`${
            tabId === "protection"
              ? "pb-2.5 font-text border-b-2 border-main"
              : "py-2 px-3 font-text"
          }`}
          type="button"
          id="tab-protection"
          onClick={handleClick}
        >
          Ср-во защиты
        </button>
        <button
          className={`${
            tabId === "supplies"
              ? "pb-2.5 font-text border-b-2 border-main"
              : "py-2 px-3 font-text"
          }`}
          type="button"
          id="tab-supplies"
          onClick={handleClick}
        >
          Вспом. мат-л
        </button>
      </div>
      <ProductDelete productType={tabId} />
    </section>
  );
}

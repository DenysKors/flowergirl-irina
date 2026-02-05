"use client";

import { useState } from "react";
import Link from "next/link";

import ModalRoot from "../ModalRoot/ModalRoot";
import ModalTerms from "../ModalTerms/ModalTerms";

export default function Footer() {
  const [showTermsModal, setShowTermsModal] = useState(false);

  return (
    <footer className="relative bg-violet-800">
      <div className="custom-shape-divider">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-10 md:h-15"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M602.45,3.86h0S572.9,116.24,281.94,120H923C632,116.24,602.45,3.86,602.45,3.86Z"
            className="fill-main"
          ></path>
        </svg>
      </div>
      <div className="container pt-8 pb-6 md:pt-10 lg:pb-5">
        <div
          // className="py-8 flex flex-col justify-center md:flex-row md:justify-between items-start gap-4 sm:flex-row text-sm"
          className="py-8 flex flex-col gap-3 justify-self-center md:flex-row md:justify-between md:items-start md:justify-self-auto"
        >
          <button
            className="font-text text-base md:text-lg lg:text-xl text-background hover:underline cursor-pointer"
            type="button"
            onClick={() => setShowTermsModal(true)}
          >
            Умови оплати та доставки
          </button>
          {showTermsModal && (
            <ModalRoot onClose={() => setShowTermsModal(false)}>
              <ModalTerms />
            </ModalRoot>
          )}
          <div className="flex flex-col">
            <h3 className="font-text text-base md:text-lg lg:text-xl text-background text-center md:text-left">
              Контакти
            </h3>
            <Link
              className="font-text text-xs md:text-sm lg:text-base text-background hover:underline text-center md:text-left"
              href="tel:+380965950404"
            >
              моб. (096) 595 04 04
            </Link>
            <Link
              className="font-text text-sm md:text-base lg:text-lg text-background hover:underline text-center md:text-left"
              href="mailto:xxxxxxx@gmail.com"
            >
              xxxxxxx@gmail.com
            </Link>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[0.625rem] md:text-xs text-background">
            &copy; 2026 Ірочка Хазяйка
          </p>
          <p className="text-[0.625rem] md:text-xs text-background">
            Design&Dev by DanExplorer
          </p>
        </div>
      </div>
    </footer>
  );
}

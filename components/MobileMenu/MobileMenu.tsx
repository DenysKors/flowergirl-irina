"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import Logo from "../../assets/images/Logo.png";
import { userLinkData } from "@/app/userLinkData";

export default function MobileMenu() {
  const [isMobMenuShow, setisMobMenuShow] = useState(false);

  const pathname = usePathname();

  const handleToggle = () => {
    setisMobMenuShow((prev) => !prev);
    if (isMobMenuShow) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <div className="lg:hidden overflow-y-auto">
      <button
        className="flex flex-col items-center cursor-pointer justify-self-start"
        type="button"
        aria-label="Мобільне меню"
        onClick={handleToggle}
      >
        <svg className="w-7 h-7 fill-text md:w-8 md:h-8">
          <use href="icons.svg#icon-menu"></use>
        </svg>
        Меню
      </button>
      <div
        className={`absolute z-50 bg-background top-0 w-screen h-dvh -left-full transition-transform duration-500 ease-out ${
          isMobMenuShow ? "translate-x-full" : ""
        }`}
      >
        <div className="flex items-center gap-2 py-4 px-6">
          <Image
            src={Logo}
            alt="Ірочка хозяйка логотип"
            width={100}
            height={100}
            priority
          />
          <button
            className="button ms-auto p-2 bg-neutral-100 border border-gray-300 hover:bg-red-500 cursor-pointer transition-colors"
            type="button"
            aria-label="Закрити меню"
            onClick={handleToggle}
          >
            <svg className="h-6 w-6 fill-black">
              <use href="icons.svg#icon-close"></use>
            </svg>
          </button>
        </div>
        <div className="pb-4 px-6 border-b border-border-gray sm:hidden">
          <SearchBar handleToggle={handleToggle} />
        </div>
        <nav aria-label="Мобільна навігація">
          <ul className="flex flex-col justify-start gap-x-8 xl:gap-x-10">
            {userLinkData.map(({ title, href }) => (
              <li key={title} className="px-6 border-b border-border-gray">
                <Link
                  className={`${
                    pathname === `${href}`
                      ? "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl text-main tracking-wider underline underline-offset-4 "
                      : "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main transition border-t-border-gray"
                  }`}
                  href={href}
                  onClick={handleToggle}
                >
                  {title}
                  <svg className="h-4 w-4 fill-black">
                    <use href="icons.svg#icon-arrow-right"></use>
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

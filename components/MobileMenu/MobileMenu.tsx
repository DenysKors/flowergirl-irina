"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "../../assets/images/Logo.png";
import { userLinkData } from "@/app/userLinkData";

export default function MobileMenu() {
  const [isMobMenuShow, setisMobMenuShow] = useState(false);

  const pathname = usePathname();
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  const handleToggle = () => {
    setisMobMenuShow((prev) => !prev);
  };

  return (
    <div className="lg:hidden">
      <button
        className="flex flex-col items-center cursor-pointer justify-self-start"
        type="button"
        aria-label="Мобільне меню"
        onClick={handleToggle}
      >
        <svg className="w-7 h-7 fill-text md:w-8 md:h-8">
          <use href={`${baseUrl}/icons.svg#icon-menu`}></use>
        </svg>
        Меню
      </button>
      <div
        className={`absolute z-20 bg-background top-0 left-0 w-full h-full ${
          isMobMenuShow ? "block" : "hidden"
        }`}
      >
        <div className="flex items-center gap-2 py-4 px-6 border-b border-border-gray">
          <Image
            src={Logo}
            alt="Ірочка хозяйка логотип"
            width={100}
            height={100}
            priority
          />
          <button
            className="button ms-auto p-2 bg-neutral-100 border border-gray-300 hover:bg-red-500 cursor-pointer"
            type="button"
            aria-label="Закрити меню"
            onClick={handleToggle}
          >
            <svg className="h-6 w-6 fill-black">
              <use href={`${baseUrl}/icons.svg#icon-close`}></use>
            </svg>
          </button>
        </div>
        <nav aria-label="Мобільна навігація">
          <ul className="flex flex-col justify-start gap-x-8 xl:gap-x-10">
            {userLinkData.map(({ title, href }) => (
              <li key={title}>
                <Link
                  className={`${
                    pathname === `${href}`
                      ? "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider underline underline-offset-4 "
                      : "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main transition border-t-border-gray"
                  }`}
                  href={href}
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

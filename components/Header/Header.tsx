"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import BasketIcon from "../BasketIcon/BasketIcon";
import MobileMenu from "../MobileMenu/MobileMenu";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Logo from "../../assets/images/Logo.png";

export default function Header() {
  const [isMobMenuShow, setisMobMenuShow] = useState(false);

  const handleToggle = () => {
    setisMobMenuShow((prev) => !prev);
    if (isMobMenuShow) {
      document.body.style.overflow = "scroll";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <>
      <header>
        <div className="container pt-3.5 lg:pb-3.5 grid grid-cols-[1fr_minmax(0px,1fr)_1fr] lg:grid-cols-[1fr_250px_1fr] gap-y-3.5 lg:gap-y-0 gap-x-4 lg:gap-x-10 items-center">
          <button
            className="flex flex-col items-center cursor-pointer justify-self-start lg:hidden"
            type="button"
            aria-label="Мобільне меню"
            onClick={handleToggle}
          >
            <svg className="w-7 h-7 fill-text md:w-8 md:h-8">
              <use href="/icons.svg#icon-menu"></use>
            </svg>
            Меню
          </button>
          <Link
            className="flex justify-center"
            href="/"
            title="На головну сторінку"
          >
            <div>
              <Image
                className="max-w-30 md:max-w-full"
                src={Logo}
                alt="Ірочка хозяйка логотип"
                width={200}
                height={200}
                priority
              />
              <p className="font-text text-[10px] md:text-base text-center uppercase">
                Квіткова крамниця
              </p>
            </div>
          </Link>
          <BasketIcon />
          <div className="col-span-full py-4 lg:py-0 lg:col-auto lg:order-first max-sm:hidden">
            <SearchBar />
          </div>
        </div>
        <NavBar />
        <MobileMenu isMobMenuShow={isMobMenuShow} handleToggle={handleToggle} />
      </header>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";

import BasketIcon from "../BasketIcon/BasketIcon";
import MobileMenu from "../MobileMenu/MobileMenu";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import Logo from "../../assets/images/Logo.png";

export default function Header() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  return (
    <header className="relative">
      <div className="container pt-3.5 lg:pb-3.5 grid grid-cols-[1fr_minmax(0px,1fr)_1fr] lg:grid-cols-[1fr_250px_1fr] gap-y-3.5 lg:gap-y-0 gap-x-4 lg:gap-x-10 items-center">
        <MobileMenu />
        <Link
          className="flex justify-center"
          href={baseUrl}
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
            <p className="font-text text-[8px] md:text-base text-center uppercase">
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
    </header>
  );
}

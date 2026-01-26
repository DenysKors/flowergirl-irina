import Image from "next/image";
import Link from "next/link";

import BasketIcon from "../BasketIcon/BasketIcon";
import MobileMenu from "../MobileMenu/MobileMenu";
import Logo from "../../assets/images/Logo.png";

export default function Header() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  return (
    <header>
      <div className="container pt-3.5 lg:pb-3.5 grid grid-cols-[auto_minmax(0px,1fr)_auto] lg:grid-cols-[1fr,0.5fr,1fr] gap-y-3.5 lg:gap-y-0 gap-x-4 lg:gap-x-10 items-center">
        <MobileMenu />
        <Link
          className="flex justify-center"
          href={baseUrl}
          title="На головну сторінку"
        >
          <Image
            className="max-w-30 md:max-w-full"
            src={Logo}
            alt="Ірочка хозяйка логотип"
            width={250}
            height={250}
            priority
          />
        </Link>
        <BasketIcon />
      </div>
    </header>
  );
}

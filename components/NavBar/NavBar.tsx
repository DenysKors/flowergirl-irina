"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { userLinkData } from "../../app/userLinkData";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="border-y border-border-gray hidden lg:block">
      <div className="container">
        <nav className="hidden lg:block">
          <ul className="flex flex-wrap justify-center gap-x-8 xl:gap-x-10">
            {userLinkData.map(({ title, href }) => (
              <li key={title}>
                <Link
                  className={`${
                    pathname === `${href}`
                      ? "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider underline underline-offset-4"
                      : "w-full flex justify-between items-center gap-1 pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main transition"
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

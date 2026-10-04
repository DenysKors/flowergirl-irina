"use client";

import Link from "next/link";

type NavBarProps = {
  plantsParams: URLSearchParams;
  protectionParams: URLSearchParams;
  suppliesParams: URLSearchParams;
};

export default function NavBar({
  plantsParams,
  protectionParams,
  suppliesParams,
}: NavBarProps) {
  return (
    <div className="border-y border-border-gray hidden lg:block">
      <div className="container">
        <nav className="hidden lg:block" aria-label="Головна навігація">
          <ul className="flex flex-wrap justify-center gap-x-8 xl:gap-x-10">
            <li>
              <Link
                className="justify-self-center block pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main"
                href={`/catalog?${plantsParams.toString()}`}
              >
                Рослини
              </Link>
            </li>
            <li>
              <Link
                className="justify-self-center block pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main transition"
                href={`/catalog?${protectionParams.toString()}`}
              >
                Захист рослин
              </Link>
            </li>
            <li>
              <Link
                className="justify-self-center block pt-4 pb-4 uppercase font-heading text-lg xl:text-xl tracking-wider hover:underline hover:underline-offset-4 hover:text-main transition"
                href={`/catalog?${suppliesParams.toString()}`}
              >
                Допоміжні матеріали
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

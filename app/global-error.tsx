"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "@/components/Footer/Footer";
import Logo from "@/assets/images/Logo.png";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="uk">
      <body>
        <header className="container pt-3.5 lg:pb-3.5 flex items-center justify-center">
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
        </header>
        <main className="h-50 flex flex-col items-center justify-center gap-8">
          <p className="font-heading text-main lg:text-2xl">
            Щось пішло не так, як хотілось!
          </p>
          <button
            className="button button-primary justify-center self-end font-text text-background bg-violet-800 hover:bg-violet-950 py-2 xl:py-2.5 cursor-pointer"
            type="button"
            onClick={() => unstable_retry()}
          >
            Спробувати знову
          </button>
        </main>
        <Footer />
      </body>
    </html>
  );
}

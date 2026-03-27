"use client";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

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
        <Header />
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

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-50 flex flex-col items-center justify-center gap-8">
      <p className="font-heading text-main lg:text-2xl">
        Сторінка товару не знайдена
      </p>
      <Link
        className="py-4 px-8 font-text border border-border-gray transition-colors rounded-2xl hover:text-main"
        href="/"
      >
        Повернутися на Головну
      </Link>
    </div>
  );
}

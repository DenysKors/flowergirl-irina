"use client";

import { useRouter } from "next/navigation";

export default function LinkBack() {
  const router = useRouter();
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <div className="py-4">
      <button
        className="p-1 rounded-md cursor-pointer transition-colors hover:bg-slate-300"
        type="button"
        aria-label="перейти назад"
        title="Назад"
        onClick={() => {
          router.back();
        }}
      >
        <svg className="h-6 w-6 lg:h-8 lg:w-8 fill-black">
          <use href={`${baseUrl}/icons.svg#icon-arrow-left`}></use>
        </svg>
      </button>
    </div>
  );
}

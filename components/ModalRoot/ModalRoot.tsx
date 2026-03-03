"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

type UserModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ onClose, children }: UserModalProps) {
  useEffect(() => {
    const handleCloseEsc = (evt: KeyboardEvent) => {
      if (evt.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleCloseEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleCloseEsc);
      document.body.style.overflow = "scroll";
    };
  }, [onClose]);

  const backdropClick = (evt: React.MouseEvent<HTMLDivElement>) => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed top-0 left-0 w-dvw h-dvh flex justify-center items-center bg-gray-700/60 z-30"
      onClick={backdropClick}
    >
      <div className="py-4 px-4 w-full h-full md:max-w-[calc(100dvw-2rem)] md:max-h-[calc(100dvh-2rem)] lg:max-w-4xl rounded-xl bg-background overflow-y-auto">
        <button
          className="button ms-auto p-1 mb-2 bg-neutral-100 border border-gray-300 hover:bg-red-500 cursor-pointer transition-colors"
          type="button"
          aria-label="Закрити вікно"
          onClick={onClose}
        >
          <svg className="h-6 w-6 fill-black">
            <use href="/icons.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
}

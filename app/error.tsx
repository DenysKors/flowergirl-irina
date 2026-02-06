"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-dvh flex flex-col items-center justify-center gap-8">
      <h2 className="font-heading text-main lg:text-2xl">
        Щось пішло не так, як хотілось!
      </h2>
      <button
        className="button p-2 font-text"
        type="button"
        onClick={() => reset()}
      >
        Спробувати знову
      </button>
    </div>
  );
}

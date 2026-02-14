"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-50 flex flex-col items-center justify-center gap-8">
      <p className="font-heading text-main lg:text-2xl">
        Щось пішло не так, як хотілось!
      </p>
      <button
        className="button p-3 font-text hover:bg-border-gray"
        type="button"
        onClick={() => reset()}
      >
        Спробувати знову
      </button>
    </div>
  );
}

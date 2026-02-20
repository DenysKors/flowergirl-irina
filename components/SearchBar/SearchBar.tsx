"use client";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

interface FormElements extends HTMLFormControlsCollection {
  readonly query: HTMLInputElement;
}

type SearchBarProps = {
  handleToggle?: () => void;
};

export default function SearchBar({ handleToggle }: SearchBarProps) {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";

  const router = useRouter();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const queryElements = evt.currentTarget.elements as FormElements;
    const userQuery = queryElements.query.value.trim();
    if (userQuery === "" || userQuery.length > 30)
      toast.error("Заповніть поле пошуку");
    const searchParamString = encodeURIComponent(userQuery);
    router.push(`/search?search=${searchParamString}`);
    evt.currentTarget.reset();
    if (typeof handleToggle === "function") handleToggle();
  };

  return (
    <div className="lg:max-w-80">
      <form className="flex" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="search">
          Пошук за назвою...
        </label>
        <input
          className="w-full border-main border px-3 py-0.5 rounded-l-md rounded-r-none border-r-0"
          id="search"
          type="search"
          name="query"
          placeholder="Пошук товару..."
          maxLength={40}
        />
        <button
          className="flex items-center rounded-md rounded-l-none p-2.5 bg-main cursor-pointer"
          type="submit"
          aria-label="пошук"
          title="Пошук"
        >
          <svg className="h-3 w-3 md:w-6 md:h-6 fill-background">
            <use href={`${baseUrl}/icons.svg#icon-search`}></use>
          </svg>
        </button>
      </form>
    </div>
  );
}

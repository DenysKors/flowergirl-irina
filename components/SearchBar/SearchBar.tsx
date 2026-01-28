export default function SearchBar() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <div className="lg:max-w-80">
      <form className="flex">
        <label className="sr-only" htmlFor="search">
          Пошук квітів, препаратів та іншого
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

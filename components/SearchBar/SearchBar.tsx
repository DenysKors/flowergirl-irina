export default function SearchBar() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <div className="col-span-full py-4 lg:py-0 lg:col-auto lg:order-first">
      <form className="relative flex">
        <label className="sr-only" htmlFor="search">
          Пошук квітів, препаратів та іншого
        </label>
        <input
          className="w-full border-main border px-3 py-0.5 rounded-l-md rounded-r-none border-r-0"
          id="search"
          type="search"
          name="query"
          placeholder="Пошук товару..."
          maxLength={30}
        />
        <button
          className="flex items-center rounded-md rounded-l-none p-2.5 bg-main"
          type="submit"
          aria-label="пошук"
          title="Пошук"
        >
          <svg className="w-6 h-6 fill-background">
            <use href={`${baseUrl}/icons.svg#icon-search`}></use>
          </svg>
        </button>
      </form>
    </div>
  );
}

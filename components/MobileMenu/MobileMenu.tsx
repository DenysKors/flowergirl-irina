export default function MobileMenu() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <button
      className="p-2 flex flex-col items-center cursor-pointer lg:hidden justify-self-center"
      type="button"
      aria-label="Мобільне меню"
    >
      <svg className="w-7 h-7 fill-text md:w-8 md:h-8">
        <use href={`${baseUrl}/icons.svg#icon-menu`}></use>
      </svg>
      Меню
    </button>
  );
}

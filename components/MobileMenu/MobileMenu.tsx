export default function MobileMenu() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <div>
      <button type="button" aria-label="Мобільне меню">
        <svg className="w-7 h-7 fill-text md:w-8 md:h-8">
          <use href={`${baseUrl}/icons.svg#icon-menu`}></use>
        </svg>
      </button>
    </div>
  );
}

export default function BasketIcon() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <button
      className="relative cursor-pointer"
      type="button"
      aria-label="Кошик"
      name="Кошик"
    >
      <svg
        //   className={`${
        //     products.length === 0 ? styles.btnIcon : styles.btnIconActive
        //   }`}
        className="w-7 h-7 fill-text md:w-8 md:h-8"
      >
        <use href={`${baseUrl}/icons.svg#icon-shopping-bag`}></use>
      </svg>
    </button>
  );
}

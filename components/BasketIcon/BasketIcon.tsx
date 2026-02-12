export default function BasketIcon() {
  const baseUrl: string = process.env.NEXT_PUBLIC_SITE_URL || "/";
  return (
    <button
      className="lg:p-2 flex flex-col items-center cursor-pointer justify-self-end lg:justify-self-center"
      type="button"
      aria-label="Кошик"
    >
      <svg
        //   className={`${
        //     products.length === 0 ? styles.btnIcon : styles.btnIconActive
        //   }`}
        className="w-7 h-7 fill-text md:w-8 md:h-8"
      >
        <use href={`${baseUrl}/icons.svg#icon-shopping-bag`}></use>
      </svg>
      Кошик
    </button>
  );
}

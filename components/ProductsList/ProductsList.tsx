"use client";

import Link from "next/link";
import toast from "react-hot-toast";

import { CldImage } from "next-cloudinary";
import { usePathname } from "next/navigation";

import { useBasketStore } from "@/store/basketStore";
import { Product, BasketProduct } from "@/types/types";
import { SELL_STATUS_ENUMS } from "@/constants/enums";

type ProductsListProps = {
  products: Product[];
};

export default function ProductsList({ products }: ProductsListProps) {
  const pathname = usePathname();
  const basketProducts = useBasketStore((state) => state.products);
  const addProduct = useBasketStore((state) => state.addProduct);

  const handleBasketClick = (
    code: string,
    title: string,
    price: number,
    imagesUrl: string[],
    qty: number
  ): void | string => {
    const searchedProduct = basketProducts.find((item) => item.code === code);
    if (searchedProduct) return toast.error("Цей товар вже у кошику");
    const basketProduct: BasketProduct = {
      title,
      price,
      sumPrice: price * 1,
      imageUrl: imagesUrl[0],
      code,
      userQty: 1,
      stock: qty,
    };
    addProduct(basketProduct);
    toast.success("Товар додано у кошик");
  };

  return (
    <ul className="mx-auto pb-6 grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-y-8 gap-x-4 md:gap-8 justify-items-center">
      {products.map(({ code, title, price, qty, imagesUrl }) => {
        return (
          <li
            key={code}
            className="group/edit pb-3 md:pb-3.5 lg:pb-4 flex flex-col justify-between border-b border-b-border-gray"
          >
            <Link
              className="h-full cursor-pointer"
              href={{
                pathname: `${pathname}/${code}`,
              }}
            >
              <div className="overflow-hidden h-full flex justify-center">
                <CldImage
                  className="object-contain w-full h-auto transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
                  src={imagesUrl[0]}
                  alt={title}
                  width={280}
                  height={498}
                  loading="lazy"
                  quality={30}
                  onError={(e) => {
                    const clickedElement = e.target as HTMLImageElement;
                    clickedElement.srcset = "/no-image-placeholder.png";
                  }}
                />
              </div>
            </Link>
            <div className="mt-2 md:mt-4 flex flex-col gap-2 md:gap-4">
              <p className="font-heading text-main md:text-lg lg:text-xl group-hover/edit:underline wrap-anywhere">
                {title}
              </p>
              <div className="flex justify-between items-center">
                <strong className="font-text md:text-lg lg:text-xl">{`${price} грн`}</strong>
                {qty > 0 && (
                  <button
                    className="px-3 py-1.5 lg:px-5 lg:py-2 text-sm lg:text-base text-background flex items-center justify-center gap-0.5 lg:gap-1 bg-violet-800 hover:bg-violet-950 rounded-2xl lg:rounded-4xl cursor-pointer"
                    type="button"
                    aria-label="Додати у кошик"
                    title="Додати у кошик"
                    onClick={() =>
                      handleBasketClick(code, title, price, imagesUrl, qty)
                    }
                  >
                    +
                    <svg className="w-3 h-3 fill-background lg:w-5 lg:h-5">
                      <use href="icons.svg#icon-shopping-bag"></use>
                    </svg>
                  </button>
                )}
              </div>
              <div>
                <span className="font-text text-xs md:text-sm lg:text-base">
                  {qty === 0
                    ? SELL_STATUS_ENUMS.notAvailable
                    : `${SELL_STATUS_ENUMS.inStock} ${qty}`}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

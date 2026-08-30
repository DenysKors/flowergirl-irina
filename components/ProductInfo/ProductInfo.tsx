import { CldImage } from "next-cloudinary";

import { ProductWithCats } from "@/types/types";

type ProductInfoProps = {
  productInfo: ProductWithCats | null;
};

export default function ProductInfo({ productInfo }: ProductInfoProps) {
  if (!productInfo) return;
  const productImgArr = productInfo.images as string[];

  return (
    <div className="px-6 py-4 max-w-4xl">
      <div className="flex items-center justify-between border-b border-b-border shrink-0">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="flex items-center rounded-md font-text text-text bg-gray-200 px-2 py-0.5 text-xs">
              Артикул:
              <span className="whitespace-nowrap">{productInfo.sku}</span>
            </p>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {`Категория: ${productInfo.category.name}`}
            </span>
          </div>
          <h2 className="text-xl font-text font-semibold text-text tracking-tight">
            {productInfo.name}
          </h2>
        </div>
      </div>
      <div className="pt-6 grid grid-cols-1 md:grid-cols-3">
        <div className="space-y-6 pb-6 md:col-span-2 md:pb-0 md:pr-6">
          <div className="space-y-2">
            <h3 className="text-xs font-text font-semibold uppercase tracking-wider text-slate-600">
              Описание
            </h3>
            <p className="rounded-[28px] bg-gray-200 p-3.5 text-text font-text leading-relaxed">
              {productInfo.description}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-text font-semibold uppercase tracking-wider text-slate-600">
              Фото
            </h3>
            <div className="grid grid-cols-1 min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-y-8 gap-x-4 md:gap-8 justify-items-center">
              {productImgArr.map((imgUrl, idx) => {
                return (
                  <div
                    key={idx}
                    className="relative h-full flex justify-center bg-background"
                  >
                    <CldImage
                      className="object-contain w-full h-auto"
                      src={imgUrl}
                      alt="Фото товару"
                      width={280}
                      height={498}
                      loading="lazy"
                      quality={30}
                      onError={(e) => {
                        const clickedElement = e.target as HTMLImageElement;
                        clickedElement.srcset =
                          "/images/no-image-placeholder.png";
                      }}
                    />
                    {idx === 0 && (
                      <span className="absolute top-[5%] left-[50%] -translate-x-[50%] px-2 py-0.5 text-[11px]/[11px] tablet:text-[13px]/[13px] font-text font-medium uppercase rounded-[18px] bg-main text-white">
                        Главное
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 rounded-[28px] bg-gray-200 text-text font-text leading-relaxed">
          <div className="rounded-[28px] bg-background p-4">
            <span className="text-xs font-text font-semibold uppercase tracking-wider text-text block mb-1">
              Цена
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-text font-semibold tracking-tight text-text">
                {new Intl.NumberFormat("uk-UA", {
                  style: "currency",
                  currency: "UAH",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                }).format(productInfo.price)}
              </span>
            </div>
          </div>

          <div className="rounded-[28px] bg-background p-4">
            <span className="text-xs font-text font-semibold uppercase tracking-wider text-text block mb-1">
              Количество
            </span>
            <div className="flex items-baseline justify-between md:flex-col">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-text font-semibold text-text">
                  {productInfo.qty}
                </span>
                <span className="text-xs font-text font-medium text-text">
                  {productInfo.unit}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1 rounded-full ${
                  productInfo.qty === 0
                    ? "bg-red-50 text-red-700"
                    : "bg-emerald-50 text-emerald-700"
                }  px-2 py-0.5 text-xs font-medium ring-1 ring-inset`}
              >
                {productInfo.qty === 0 ? "Нет в наличии" : "В наличии"}
              </span>
            </div>
          </div>

          <div className="rounded-[28px] bg-background p-4 space-y-2.5">
            <div className="flex items-center justify-between md:gap-3 md:justify-normal text-xs">
              <span className="self-start">Создано:</span>
              <span className="font-text text-xs text-slate-600">
                {new Intl.DateTimeFormat("uk-UA", {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(productInfo.createdAt))}
              </span>
            </div>
            <div className="flex items-center justify-between md:gap-3 md:justify-normal text-xs">
              <span className="self-start">Обновлено:</span>
              <span className="font-text text-xs text-slate-600">
                {new Intl.DateTimeFormat("uk-UA", {
                  dateStyle: "long",
                  timeStyle: "short",
                }).format(new Date(productInfo.updatedAt))}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

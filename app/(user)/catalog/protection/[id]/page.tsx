import { notFound } from "next/navigation";
import type { Metadata } from "next";

import LinkBack from "@/components/LinkBack/LinkBack";
import ProductInteraction from "@/components/ProductInteraction/ProductInteraction";
import ProductImgGallery from "@/components/ProductImgGallery/ProductImgGallery";

// import { getProtectionByCode } from "@/lib/api";
import { SELL_STATUS_ENUMS } from "@/constants/enums";
import { Product } from "@/types/types";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { id } = await params;
//   const protection: Product = await getProtectionByCode(id);

//   if (!protection) {
//     notFound();
//   }

//   return {
//     title: `${protection.title} / Flowergirl-irina`,
//   };
// }

export default async function ProtectionPage({ params }: Props) {
  const { id } = await params;
  // const protection: Product = await getProtectionByCode(id);

  // if (!protection) {
  //   notFound();
  // }

  // const { code, title, description, category, price, qty, imagesUrl } =
  //   protection;

  return (
    <main className="container">
      <LinkBack />
      <section className="grid grid-rows-auto grid-cols-1 md:gap-x-5 md:grid-cols-[42%_minmax(0,1fr)] md:grid-rows-[min-content_minmax(0,1fr)] lg:gap-x-8 lg:grid-cols-2 w-full">
        {/* <div className="mb-2 md:mb-4">
          <h1 className="font-heading text-main text-3xl md:text-4xl">
            {title}
          </h1>
        </div>
        <div className="w-full order-0 md:h-auto md:row-start-1 md:row-span-2 md:col-start-1 md:mb-3.5">
          <ProductImgGallery imagesUrl={imagesUrl} title={title} />
        </div>
        <ul className="w-full md:mb-3.5">
          <li className="mb-2 md:mb-4">
            <h2 className="block font-heading text-text text-xl lg:text-2xl border-b border-gray-300 pb-0.5 mb-2 md:mb-4">
              Опис
            </h2>
            <div className="text-gray-900 font-text md:text-lg inline">
              {description}
            </div>
          </li>
          <li className="bg-gray-100 rounded-xl px-4 py-6 mb-4 md:py-4 md:mb-6">
            <p className="mb-4 font-text">{`Артикул: ${code}`}</p>
            <p className="mb-4 font-text">
              {`Категорія:
              ${category.reduce((accum, item, idx): string => {
                if (idx === 0) {
                  return accum + item.label;
                } else {
                  return accum + ", " + item.label;
                }
              }, "")}`}
            </p>
            <p className="mb-4 font-text">
              {qty === 0
                ? SELL_STATUS_ENUMS.notAvailable
                : `${SELL_STATUS_ENUMS.inStock} ${qty} шт`}
            </p>
            <p className="mb-4 font-text text-xl">{`Ціна: ${price} грн`}</p>
            {qty > 0 && (
              <ProductInteraction
                title={title}
                price={price}
                imageUrl={imagesUrl[0]}
                code={code}
                qty={qty}
              />
            )}
          </li>
        </ul> */}
      </section>
    </main>
  );
}

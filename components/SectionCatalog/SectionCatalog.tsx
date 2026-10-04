import Link from "next/link";
import Image from "next/image";

import PlantsImg from "../../assets/images/plants.jpg";
import ProtectionImg from "../../assets/images/protection.jpg";
import SuppliesImg from "../../assets/images/supplies.jpg";

import { getAllUserSubCats } from "@/lib/api";

export default async function SectionCatalog() {
  const { plantsCatsSlugArr, protectionCatsArr, suppliesCatsArr } =
    await getAllUserSubCats();

  const plantsParams = new URLSearchParams();
  const protectionParams = new URLSearchParams();
  const suppliesParams = new URLSearchParams();

  plantsCatsSlugArr.forEach((slug) => plantsParams.append("category", slug));
  protectionCatsArr.forEach((slug) =>
    protectionParams.append("category", slug)
  );
  suppliesCatsArr.forEach((slug) => suppliesParams.append("category", slug));

  return (
    <section className="container py-5">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-self-center">
        <Link
          className="group/edit basis-[33.33%] flex flex-col"
          href={`/catalog?${plantsParams.toString()}`}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={PlantsImg}
              alt="Різноманіття рослин"
              width={384}
              height={256}
              priority
            />
          </div>
          <div className="p-1 md:p-3 max-w-[384px] flex items-center justify-center grow bg-main">
            <h2 className="font-text lg:text-xl text-background text-center group-hover/edit:underline">
              Каталог рослин
            </h2>
          </div>
        </Link>
        <Link
          className="group/edit basis-[33.33%] flex flex-col"
          href={`/catalog?${protectionParams.toString()}`}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={ProtectionImg}
              alt="Товари захисту рослин"
              width={384}
              height={256}
              priority
            />
          </div>
          <div className="p-1 md:p-3 max-w-[384px] flex items-center justify-center grow bg-main">
            <h2 className="font-text lg:text-xl text-background text-center group-hover/edit:underline">
              Каталог товарів для захисту рослин
            </h2>
          </div>
        </Link>
        <Link
          className="group/edit basis-[33.33%] flex flex-col"
          href={`/catalog?${suppliesParams.toString()}`}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={SuppliesImg}
              alt="Допоміжні матеріали для квітів"
              width={384}
              height={256}
              priority
            />
          </div>
          <div className="p-1 md:p-3 max-w-[384px] flex items-center justify-center grow bg-main">
            <h2 className="font-text lg:text-xl text-background text-center group-hover/edit:underline">
              Каталог допоміжних матеріалів
            </h2>
          </div>
        </Link>
      </div>
    </section>
  );
}

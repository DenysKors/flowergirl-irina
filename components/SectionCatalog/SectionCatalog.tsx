import Link from "next/link";
import Image from "next/image";

import { userLinkMap } from "@/app/userLinkData";
import PlantsImg from "../../assets/images/plants.jpg";
import ProtectionImg from "../../assets/images/protection.jpg";
import SuppliesImg from "../../assets/images/supplies.jpg";

export default function SectionCatalog() {
  return (
    <section className="container py-5">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-self-center">
        <Link
          className="group/edit basis-[33.33%] flex flex-col"
          href={userLinkMap.flowers}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={PlantsImg}
              alt="Різноманіття рослин"
              width={384}
              height={256}
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
          href={userLinkMap.protection}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={ProtectionImg}
              alt="Товари захисту рослин"
              width={384}
              height={256}
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
          href={userLinkMap.supplies}
        >
          <div className="overflow-hidden">
            <Image
              className="transition-[transform] duration-300 ease group-hover/edit:transform-[scale(1.1)]"
              src={SuppliesImg}
              alt="Допоміжні матеріали для квітів"
              width={384}
              height={256}
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

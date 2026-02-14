import { notFound } from "next/navigation";
import type { Metadata } from "next";

import LinkBack from "@/components/LinkBack/LinkBack";

import { getPlantByCode } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const plantCode = Number(id);
  const plant = await getPlantByCode(plantCode);

  if (!plant) {
    notFound();
  }

  return {
    title: `${plant.title} / Flowergirl-irina`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const plantCode = Number(id);
  const plant = await getPlantByCode(plantCode);

  if (!plant) {
    notFound();
  }

  // const { code, title, description, category, price, qty } = plant;
  const { title } = plant;

  return (
    <main className="container">
      <LinkBack />
      <h1 className="font-heading text-main">{title}</h1>
    </main>
  );
}

import { connection } from "next/server";
import { notFound } from "next/navigation";

import OrderToPrint from "@/components/OrderToPrint/OrderToPrint";

import { getAdminOrderById } from "@/lib/api";
import type { OrderWithItemsProduct } from "@/types/types";

type OrderPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PrintPage({ params }: OrderPageProps) {
  await connection();
  const { id } = await params;
  const order: OrderWithItemsProduct | null = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <section className="p-2 lg:p-4 w-full bg-gray-200">
      <OrderToPrint order={order} />
    </section>
  );
}

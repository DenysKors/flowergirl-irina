import { getAdminOrders } from "@/lib/api";
import type { OrderStatus } from "@/prisma/generated/client";
// import { auth } from "@/lib/auth";

export async function GET(request: Request) {
  //   const session = await auth();

  //   if (!session) {
  //     return Response.json({ error: "Not authorized." }, { status: 401 });
  //   }

  //   if (session.user?.role !== "ADMIN") {
  //     return Response.json({ error: "Access denied." }, { status: 403 });
  //   }

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search") || "";
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const limit = Number(searchParams.get("limit")) || 10;
  const rawStatus = searchParams.get("status") as OrderStatus | null;

  const orders = await getAdminOrders(query, page, limit, rawStatus);
  return Response.json(orders);
}

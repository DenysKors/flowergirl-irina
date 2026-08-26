import { getAllAdminProdWithCats } from "@/lib/api";
// import { auth } from "@/lib/auth";

export async function GET() {
  //   const session = await auth();

  //   if (!session) {
  //     return Response.json({ error: "Not authorized." }, { status: 401 });
  //   }

  //   if (session.user?.role !== "ADMIN") {
  //     return Response.json({ error: "Access denied." }, { status: 403 });
  //   }

  const allProducts = await getAllAdminProdWithCats();
  return Response.json(allProducts);
}

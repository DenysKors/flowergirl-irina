import { getProductByCode } from "@/lib/api";

export async function GET(_: Request, { params }) {
  const productCode = (await params).id;

  const productData = await getProductByCode(productCode);
  console.log(productData);

  if (!productData) {
    return new Response("", {
      status: 404,
      statusText: "Product not found",
    });
  } else {
    return Response.json(productData);
  }
}

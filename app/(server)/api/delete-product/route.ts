import { deleteProduct } from "@/lib/api";

export async function DELETE(request: Request) {
  const productData = await request.json();
  const result = await deleteProduct(productData);

  if (result?.deletedCount === 0) {
    return new Response("", {
      status: 404,
      statusText: "Product not found",
    });
  } else {
    return Response.json(result);
  }
}

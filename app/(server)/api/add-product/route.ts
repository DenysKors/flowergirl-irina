import { addProduct } from "@/lib/api";

export async function POST(request: Request) {
  const productData = await request.formData();

  const newProduct = await addProduct(productData);
  return Response.json(newProduct);
}

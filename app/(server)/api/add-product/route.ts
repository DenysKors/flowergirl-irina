import { addProduct } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const productData = await request.formData();
    const newProduct = await addProduct(productData);
    return Response.json(newProduct);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("error", error);
      return new Response(JSON.stringify(`${error.message}`), {
        status: 422,
      });
    } else {
      return new Response(JSON.stringify("Operation failed"), {
        status: 422,
      });
    }
  }
}

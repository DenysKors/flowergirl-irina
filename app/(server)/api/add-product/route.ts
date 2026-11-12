import { addProduct } from "@/lib/api";
import { auth } from "@/app/auth";

export async function POST(request: Request) {
        const session = await auth();

    if (!session) {
      return Response.json({ error: "Not authorized." }, { status: 401 });
    }

    if (session.user?.role !== "ADMIN") {
      return Response.json({ error: "Access denied." }, { status: 403 });
  }
  
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

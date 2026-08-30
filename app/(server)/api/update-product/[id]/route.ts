import { updateProduct } from "@/lib/api";
// import { auth } from "@/lib/auth";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  //   const session = await auth();

  //   if (!session) {
  //     return Response.json({ error: "Not authorized." }, { status: 401 });
  //   }

  //   if (session.user?.role !== "ADMIN") {
  //     return Response.json({ error: "Access denied." }, { status: 403 });
  //   }

  const { id } = await params;
  const productData: FormData = await request.formData();
  const formProdId = productData.get("id");

  if (id !== formProdId) {
    return new Response(JSON.stringify("Идентификаторы товара не совпадают"), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const updatedProduct = await updateProduct(productData);
    return Response.json(updatedProduct);
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

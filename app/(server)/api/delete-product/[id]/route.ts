import { deleteProduct } from "@/lib/api";
// import { auth } from "@/lib/auth";

export async function DELETE(
  _: Request,
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
  const productId = parseInt(id);
  try {
    const deletedProduct = await deleteProduct(productId);
    return Response.json(deletedProduct);
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

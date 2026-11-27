import * as Yup from "yup";

import { updateProduct, updateProductQty } from "@/lib/api";
import { auth } from "@/app/auth";
import { qtySchema } from "@/app/schema/qtySchema";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return Response.json({ error: "Not authorized." }, { status: 401 });
  }

  if (session.user?.role !== "ADMIN") {
    return Response.json({ error: "Access denied." }, { status: 403 });
  }

  const { id } = await params;
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const productData: FormData = await request.formData();
    const formProdId = productData.get("id");

    if (id !== formProdId) {
      return new Response(
        JSON.stringify("Идентификаторы товара не совпадают"),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    try {
      const updatedProduct = await updateProduct(productData);
      return Response.json(updatedProduct);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Response(JSON.stringify(`${error.message}`), {
          status: 422,
        });
      } else {
        return new Response(JSON.stringify("Operation failed"), {
          status: 500,
        });
      }
    }
  } else {
    const productData = await request.json();

    if (Number(id) !== productData.id) {
      return new Response(
        JSON.stringify("Идентификаторы заказов не совпадают"),
        { status: 400 }
      );
    }

    try {
      const qty = qtySchema.validateSync(productData.qty);
      const updatedProduct = await updateProductQty({ ...productData, qty });
      return Response.json(updatedProduct);
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        return new Response(JSON.stringify(`${error.message}`), {
          status: 422,
        });
      } else if (error instanceof Error) {
        return new Response(JSON.stringify(`${error.message}`), {
          status: 422,
        });
      } else {
        return new Response(JSON.stringify("Operation failed"), {
          status: 500,
        });
      }
    }
  }
}

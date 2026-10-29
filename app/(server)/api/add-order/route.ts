import { CreateOrderPayload } from "@/types/types";
import { addOrder } from "@/lib/api";

export async function POST(request: Request) {
  const order: CreateOrderPayload = await request.json();
  const { customerData, products, totalPrice } = order;
  try {
    if (
      !totalPrice ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return new Response(
        JSON.stringify("Операцію скасовано. Немає товарів."),
        {
          status: 400,
        }
      );
    }
    if (
      !customerData ||
      !customerData.postLocation ||
      !customerData.lastName ||
      !customerData.firstName ||
      !customerData.phoneNumber
    ) {
      return new Response(
        JSON.stringify("Операцію скасовано. Заповніть дані покупця."),
        {
          status: 400,
        }
      );
    }
    const publicId = await addOrder(order);
    return new Response(JSON.stringify(publicId), {
      status: 201,
    });
  } catch (error: unknown) {
    console.error("Ошибка создания заказа [POST /api/orders]:", error);
    if (error instanceof Error) {
      return new Response(JSON.stringify(`${error.message}`), {
        status: 400,
      });
    } else {
      return new Response(JSON.stringify("Operation failed"), {
        status: 400,
      });
    }
  }
}

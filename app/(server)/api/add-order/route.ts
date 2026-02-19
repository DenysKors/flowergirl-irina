import { addOrder } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const orderData = await request.formData();
    await addOrder(orderData);
    return new Response(JSON.stringify("Order success"), { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return new Response(JSON.stringify(`Order failed: ${error.message}`), {
        status: 422,
      });
    } else {
      return new Response(JSON.stringify("Order failed"), {
        status: 422,
      });
    }
  }
}

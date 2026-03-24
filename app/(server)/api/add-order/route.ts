import { addOrder } from "@/lib/api";

export async function POST(request: Request) {
  const orderData = await request.formData();
  const addedOrder = await addOrder(orderData);
  if (addedOrder instanceof Error) {
    return new Response(JSON.stringify(`Order failed: ${addedOrder.message}`), {
      status: 422,
    });
  } else {
    return new Response(JSON.stringify("Order success"), { status: 200 });
  }
}

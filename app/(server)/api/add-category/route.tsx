import { addCategory } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const categoryData = await request.formData();
    const newCategory = await addCategory(categoryData);
    return Response.json(newCategory);
  } catch (error: unknown) {
    if (error instanceof Error) {
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

import { deleteCategory } from "@/lib/api";

export async function DELETE(request: Request) {
  try {
    const categoryData = await request.json();
    const deletedCategory = await deleteCategory(categoryData);
    return Response.json(deletedCategory);
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

import { deleteCategory } from "@/lib/api";

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const categoryId = parseInt(id);
  try {
    const deletedCategory = await deleteCategory(categoryId);
    return Response.json(deletedCategory);
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

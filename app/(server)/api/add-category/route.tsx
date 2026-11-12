import { addCategory } from "@/lib/api";
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
    const categoryData = await request.formData();
    const newCategory = await addCategory(categoryData);
    return Response.json(newCategory);
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

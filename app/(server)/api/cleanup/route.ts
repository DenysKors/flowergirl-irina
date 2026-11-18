import { NextRequest, NextResponse } from "next/server";

import { deleteOrdersCron } from "@/lib/api";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await deleteOrdersCron();

  return NextResponse.json({ deleted: result });
}

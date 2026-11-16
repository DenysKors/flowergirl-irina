import { NextRequest, NextResponse } from "next/server";

function redirectToSuccess(ref: string | null) {
  const url = new URL("/payment/success", process.env.NEXT_PUBLIC_SITE_URL);
  if (ref) url.searchParams.set("ref", ref);
  return NextResponse.redirect(url, 303);
}

export async function POST(req: NextRequest) {
   const { searchParams } = new URL(req.url);
   const ref = searchParams.get("ref");
  return redirectToSuccess(ref);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");
  return redirectToSuccess(ref);
}
import { NextRequest, NextResponse } from "next/server";

function redirectToSuccess(req: NextRequest, ref: string | null) {
  const url = new URL("/payment/success", req.nextUrl.origin);
  if (ref) url.searchParams.set("ref", ref);
  return NextResponse.redirect(url, 303);
}

export async function POST(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  return redirectToSuccess(req, ref);
}

export async function GET(req: NextRequest) {
    const ref = req.nextUrl.searchParams.get("ref");
  return redirectToSuccess(req, ref);
}
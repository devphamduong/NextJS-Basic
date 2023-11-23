import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = new URL(req.url);
  const audio = new URLSearchParams(url.search).get("audio");
  return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${audio}`);
}

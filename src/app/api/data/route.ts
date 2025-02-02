import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const GET = auth(async function GET(request) {
  if (request.auth) return NextResponse.json(request.auth);
  return NextResponse.json({ message: "Not Authenticated" }, { status: 401 });
});

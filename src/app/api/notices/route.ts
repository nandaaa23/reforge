import {NextResponse} from "next/server";
import {notices} from "@/data/notices";

export async function GET() {
  return NextResponse.json({data: notices, isDemo: true, message: "Local demonstration data only; connect an approved university source in production."});
}

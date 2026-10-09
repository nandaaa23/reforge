import {NextResponse} from "next/server";
import {examinations} from "@/data/examinations";

export async function GET() {
  return NextResponse.json({data: examinations, isDemo: true, message: "Local demonstration data only; connect an approved university source in production."});
}

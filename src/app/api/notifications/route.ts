import {NextResponse} from "next/server";
import {initialNotifications} from "@/data/notifications";

export async function GET() {
  return NextResponse.json({data: initialNotifications, isDemo: true, message: "No browser push delivery is configured."});
}

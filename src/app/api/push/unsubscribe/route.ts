import {NextResponse} from "next/server";

export async function POST() {
  return NextResponse.json({configured: false, message: "No server-side push subscription is stored by this demonstration."}, {status: 501});
}

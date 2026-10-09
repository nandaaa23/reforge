import {NextResponse} from "next/server";

export async function POST() {
  return NextResponse.json({configured: false, message: "Push subscriptions require explicit permission, a service worker, secure storage, and an authorized sender."}, {status: 501});
}

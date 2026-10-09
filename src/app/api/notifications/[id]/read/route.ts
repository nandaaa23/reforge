import {NextResponse} from "next/server";
import {initialNotifications} from "@/data/notifications";

export async function PATCH(_request: Request, {params}: {params: Promise<{id: string}>}) {
  const {id} = await params;
  const notification = initialNotifications.find((item) => item.id === id);
  if (!notification) {
    return NextResponse.json({error: "Notification not found in demonstration data."}, {status: 404});
  }
  return NextResponse.json({id, isRead: true, isDemo: true, persistence: "Client state only in this prototype"});
}

import {NextRequest, NextResponse} from "next/server";
import {getDemoReply} from "@/lib/chat";
import type {Locale} from "@/types";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null) as {question?: string; locale?: Locale; pageContext?: string} | null;
  if (!body?.question?.trim()) {
    return NextResponse.json({error: "A question is required."}, {status: 400});
  }
  const locale = body.locale === "ml" ? "ml" : "en";
  const reply = getDemoReply(body.question, locale, body.pageContext);
  return NextResponse.json({answer: reply.content, sources: reply.links ?? [], mode: "local-demo", productionNote: "Use approved-document retrieval and server-side authorization for production."});
}

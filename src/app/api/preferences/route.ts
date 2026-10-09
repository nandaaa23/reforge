import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";

const preferences = {examinations: true, results: true, deadlines: true, announcements: true};
const preferencesSchema = z.object({
  examinations: z.boolean().optional(),
  results: z.boolean().optional(),
  deadlines: z.boolean().optional(),
  announcements: z.boolean().optional()
}).strict();

export async function GET() {
  return NextResponse.json({data: preferences, isDemo: true, persistence: "client-side demo only"});
}

export async function PUT(request: NextRequest) {
  const parsed = preferencesSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({error: "Preferences must be a valid set of boolean category values."}, {status: 400});
  }
  return NextResponse.json({data: {...preferences, ...parsed.data}, isDemo: true, persistence: "No server-side persistence in this prototype"});
}

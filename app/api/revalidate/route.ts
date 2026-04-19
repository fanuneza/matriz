import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Called by a Railway cron job to rebuild the page on a schedule.
// Configure in Railway: GET https://<domain>/api/revalidate?secret=<REVALIDATE_SECRET>
// Suggested schedule: every Monday at 06:00 UTC (03:00 CLT / 02:00 CLST)
// Cron expression: 0 6 * * 1

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidatePath("/");

  return NextResponse.json({
    revalidated: true,
    at: new Date().toISOString(),
  });
}

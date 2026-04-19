import { NextResponse } from "next/server";
import { fetchNetBillingRaw } from "@/lib/cne-client";
import { CneWrapperSchema, NetBillingArraySchema } from "@/lib/validators";
import { normalizeNetBilling } from "@/lib/normalize-netbilling";
import { netBillingPorMes, netBillingPorRegion } from "@/lib/aggregates";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: raw, fetchedAt } = await fetchNetBillingRaw();

    const wrapper = CneWrapperSchema.safeParse(raw);
    const arraySource = wrapper.success ? wrapper.data.data : raw;

    const parsed = NetBillingArraySchema.safeParse(arraySource);
    if (!parsed.success) {
      console.error("[/api/netbilling] Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { error: "Los datos de generación distribuida no tienen el formato esperado." },
        { status: 502 }
      );
    }

    const records = parsed.data.map(normalizeNetBilling);

    return NextResponse.json(
      {
        fetchedAt,
        total: records.length,
        porMes:    netBillingPorMes(records),
        porRegion: netBillingPorRegion(records),
      },
      {
        headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=3600" },
      }
    );
  } catch (err) {
    console.error("[/api/netbilling]", err);
    return NextResponse.json(
      { error: "No fue posible obtener los datos de generación distribuida." },
      { status: 503 }
    );
  }
}

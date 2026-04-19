import { NextResponse } from "next/server";
import { fetchCapacidadRaw, fetchPipelineRaw } from "@/lib/cne-client";
import { CneWrapperSchema, CapacidadArraySchema, PipelineArraySchema } from "@/lib/validators";
import { normalizePlanta, normalizePipeline } from "@/lib/normalize-ernc";
import {
  totalNetaMw,
  capacidadPorRegion,
  capacidadPorTecnologia,
  capacidadPorAnio,
  pipelinePorAnio,
  pipelinePorRegion,
} from "@/lib/aggregates";

export const dynamic = "force-dynamic";

function unwrap(raw: unknown) {
  const wrapper = CneWrapperSchema.safeParse(raw);
  return wrapper.success ? wrapper.data.data : raw;
}

export async function GET() {
  try {
    const [capResult, pipeResult] = await Promise.all([
      fetchCapacidadRaw(),
      fetchPipelineRaw(),
    ]);

    const capParsed = CapacidadArraySchema.safeParse(unwrap(capResult.data));
    if (!capParsed.success) {
      console.error("[/api/ernc] capacidad validation failed:", capParsed.error.flatten());
      return NextResponse.json(
        { error: "Los datos de capacidad instalada no tienen el formato esperado." },
        { status: 502 }
      );
    }

    const pipeParsed = PipelineArraySchema.safeParse(unwrap(pipeResult.data));
    if (!pipeParsed.success) {
      console.error("[/api/ernc] pipeline validation failed:", pipeParsed.error.flatten());
      return NextResponse.json(
        { error: "Los datos de proyectos en construcción no tienen el formato esperado." },
        { status: 502 }
      );
    }

    const plantas    = capParsed.data.map(normalizePlanta);
    const proyectos  = pipeParsed.data.map(normalizePipeline);

    return NextResponse.json(
      {
        fetchedAt:         capResult.fetchedAt,
        totalPlantas:      plantas.length,
        totalMw:           totalNetaMw(plantas),
        porRegion:         capacidadPorRegion(plantas),
        porTecnologia:     capacidadPorTecnologia(plantas),
        porAnio:           capacidadPorAnio(plantas),
        pipeline:          { proyectos, porAnio: pipelinePorAnio(proyectos), porRegion: pipelinePorRegion(proyectos) },
      },
      {
        headers: { "Cache-Control": "public, s-maxage=21600, stale-while-revalidate=3600" },
      }
    );
  } catch (err) {
    console.error("[/api/ernc]", err);
    return NextResponse.json(
      { error: "No fue posible obtener los datos de capacidad instalada." },
      { status: 503 }
    );
  }
}

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this repository.

## Project overview

**"Chile y la nueva matriz energética"** — a public-facing editorial scrollytelling site about Chile's renewable energy transition, built with live data from the CNE (Comisión Nacional de Energía) API. This is both a useful public explainer and a portfolio piece by Fabián Núñez.

Full project spec is in `docs/claude-code-handoff-energy-mix-storytelling.md`.

## Stack

- **Next.js + TypeScript** (App Router)
- **Charting:** Plotly (preferred) or Apache ECharts
- **Map:** custom SVG of Chile regions — no Leaflet/Mapbox in v1
- **Styling:** modern CSS; Tailwind acceptable if it doesn't add abstraction overhead
- **Hosting:** Railway

## Commands

*(To be established when the project is scaffolded)*

Once initialized, typical commands will be:

```bash
npm run dev       # development server
npm run build     # production build
npm run lint      # lint
```

## Environment variables

```bash
CNE_API_TOKEN=...               # Bearer token for CNE API (never expose client-side)
CNE_API_BASE_URL=https://api.cne.cl
```

## Architecture

### Data flow

CNE API → Next.js Route Handlers (server-only proxy) → normalized JSON → React components

### Internal API routes

- `GET /api/ernc` — utility-scale renewable projects (`/api/ea/proyectos/ernc` upstream)
- `GET /api/netbilling` — distributed generation (`/api/ea/netbilling` upstream)
- `GET /api/story-summary` — optional pre-shaped aggregate metrics

Routes must: authenticate with Bearer token, validate with Zod, normalize fields, cache in-memory (ERNC: 6h, net billing: 24h), and return stable JSON contracts. Never expose a pass-through proxy.

### Normalized types

```ts
type ErncProject = {
  id: string; nombre: string; propietario?: string; tecnologia: string;
  potenciaMw?: number; region?: string; comuna?: string;
  barraConexion?: string; estado?: string; fechaPuestaServicio?: string;
  anioPuestaServicio?: number | null; latitud?: number | null; longitud?: number | null;
};

type NetBillingRecord = {
  id: string; anio: number; mes: number; region?: string; comuna?: string;
  tecnologia?: string; potenciaKw?: number; instalaciones?: number | null;
};
```

Raw upstream shapes must never reach the front end.

### File structure

```
app/
  page.tsx / layout.tsx / globals.css
  api/ernc/route.ts
  api/netbilling/route.ts
lib/
  cne-client.ts        # authenticated upstream fetch + cache
  validators.ts        # Zod schemas for upstream responses
  normalize-ernc.ts
  normalize-netbilling.ts
  aggregates.ts        # derived metrics (MW by region/tech, counts by year, etc.)
components/
  story/               # Hero, StoryStep, StickyFigure, RegionMap, CapacityBars, etc.
  ui/                  # Header, Footer, Stat
public/
  chile-regions.svg
```

## Key constraints

- **Bearer token must stay server-side only.** No exceptions.
- **No database in v1.** In-memory cache is sufficient.
- **No D3 as primary chart layer** — use Plotly or ECharts, D3 only for targeted custom pieces.
- **Upstream CNE schemas are partially underdocumented** — verify real payloads before assuming field names. Use Zod to tolerate additive fields and reject structurally broken payloads.
- **SEA projects are excluded from v1** — OpenAPI docs are incomplete there.

## Editorial requirements

- All copy in **neutral, formal Chilean Spanish**. No colloquialisms, no hype, no jokes in body text.
- Byline: **"Visualización y desarrollo: Fabián Núñez"** in footer.
- Source credit to **Comisión Nacional de Energía (CNE)** with a brief methodology note.
- Visual direction: dark/near-black background, warm solar amber accent, strong typographic hierarchy, generous whitespace. No decorative blobs or gradient gimmicks.
- Layout: sticky figure (right) + scrolling narrative steps (left) on desktop, stacked on mobile.
- Every visualization needs a title, a one-sentence takeaway, and an accessible summary.

## Accessibility

- Semantic HTML, single `h1`, ordered headings
- Sufficient contrast, keyboard-reachable controls, visible focus states
- `prefers-reduced-motion` support
- Screen-reader-friendly chart summaries and text alternatives for key findings

## Implementation order

1. Verify live CNE API payloads with the provided token
2. Define Zod schemas against real responses
3. Normalize payloads into clean internal types and aggregates
4. Build thin internal API routes with caching
5. Draft narrative structure and placeholder copy in Spanish
6. Implement page layout and design system
7. Implement visualizations one by one
8. Add accessibility, loading, and error states
9. Polish copy, annotations, responsive behavior
10. Test on desktop and mobile

## What not to add in v1

Authentication, CMS, database, admin panel, user accounts, AI-generated text, heavy animation system, multi-page architecture.

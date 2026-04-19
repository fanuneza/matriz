// Maps Roman numeral region codes (used by net billing API) to display names
export const REGION_NAMES: Record<string, string> = {
  RM:   "Metropolitana",
  V:    "Valparaíso",
  VII:  "Maule",
  VI:   "O'Higgins",
  IV:   "Coquimbo",
  VIII: "Biobío",
  X:    "Los Lagos",
  XVI:  "Ñuble",
  IX:   "La Araucanía",
  XIV:  "Los Ríos",
  II:   "Antofagasta",
  III:  "Atacama",
  I:    "Tarapacá",
  XV:   "Arica y Parinacota",
  XI:   "Aysén",
  XII:  "Magallanes",
};

export function nombreRegion(code: string): string {
  return REGION_NAMES[code.trim().toUpperCase()] ?? code;
}

// Strips "Región de / del / Región " prefix for compact display in charts
export function nombreRegionCorto(nombre: string): string {
  return nombre
    .replace(/^Región\s+del?\s+/i, "")
    .replace(/^Región\s+/i, "")
    .replace("Libertador Gral. Bernardo O'Higgins", "O'Higgins")
    .replace("Metropolitana de Santiago", "Metropolitana")
    .replace("Aisén del Gral.Carlos Ibáñez del Campo", "Aysén")
    .replace("Magallanes y de la Antártica Chilena", "Magallanes");
}

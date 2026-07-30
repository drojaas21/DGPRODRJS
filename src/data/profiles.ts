export type LabProfileItem = {
  name: string;
  code?: string;
};

export type LabProfile = {
  name: string;
  code: string | null;
  tint: string;
  textDark?: boolean;
  fonasa_a: number | null;
  fonasa_bcd?: number | null;
  particular: number | null;
  items: LabProfileItem[];
  note?: string;
};

function cleanExamName(name: string): string {
  return name.replace(/\*PARTICULAR\*/gi, "").replace(/\s{2,}/g, " ").trim();
}

export function profileCartKey(p: LabProfile): string {
  return p.code ?? `PERFIL-${p.name}`;
}

/**
 * Detecta exámenes repetidos en la cotización de laboratorio:
 * - Un examen individual cuyo código ya está incluido dentro de un perfil agregado.
 * - Dos perfiles agregados que comparten exámenes con el mismo código.
 * No marca los ×2 intencionales dentro de un mismo perfil (ej. glucosas post carga).
 */
export function findLabDuplicates(
  cart: Array<{ code: string; name: string }>
): string[] {
  const byKey = new Map<string, LabProfile>();
  for (const p of labProfiles) {
    if (p.code) byKey.set(p.code, p);
    byKey.set(`PERFIL-${p.name}`, p);
  }

  const profilesInCart: LabProfile[] = [];
  const individuals: Array<{ code: string; name: string }> = [];
  for (const item of cart) {
    const p = byKey.get(item.code);
    if (p) profilesInCart.push(p);
    else individuals.push(item);
  }

  const warnings: string[] = [];

  // Examen individual vs perfil
  for (const item of individuals) {
    const owners = profilesInCart.filter((p) =>
      p.items.some((it) => it.code === item.code)
    );
    if (owners.length > 0) {
      warnings.push(
        `${cleanExamName(item.name)} (${item.code}) ya viene incluido en ${owners
          .map((o) => o.name)
          .join(" y ")}. Se estaría cobrando dos veces.`
      );
    }
  }

  // Perfil vs perfil
  for (let i = 0; i < profilesInCart.length; i++) {
    for (let j = i + 1; j < profilesInCart.length; j++) {
      const a = profilesInCart[i];
      const b = profilesInCart[j];
      const sharedCodes = new Set<string>();
      const sharedNames: string[] = [];
      for (const it of a.items) {
        if (!it.code || sharedCodes.has(it.code)) continue;
        if (b.items.some((x) => x.code === it.code)) {
          sharedCodes.add(it.code);
          sharedNames.push(`${it.name} (${it.code})`);
        }
      }
      if (sharedNames.length > 0) {
        warnings.push(
          `${a.name} y ${b.name} comparten: ${sharedNames.join(", ")}.`
        );
      }
    }
  }

  return warnings;
}

export const labProfiles: LabProfile[] = [
  {
    name: "Perfil Bioquímico",
    code: "0302075",
    tint: "#f97316",
    fonasa_a: 11650,
    fonasa_bcd: 7170,
    particular: 13397,
    items: [
      { name: "Glicemia", code: "0302047" },
      { name: "Nitrógeno ureico", code: "0302057" },
      { name: "Uremia", code: "0302057" },
      { name: "Ácido úrico", code: "0302005" },
      { name: "Colesterol total", code: "0302067" },
      { name: "Proteínas totales", code: "0302100" },
      { name: "Albúmina", code: "0302101" },
      { name: "Transaminasa GOT", code: "0302063" },
      { name: "Bilirrubina total", code: "0302012" },
      { name: "Fosfatasa alcalina", code: "0302040" },
      { name: "LDH", code: "0302030" },
      { name: "Calcio", code: "0302015" },
      { name: "Fósforo", code: "0302042" },
    ],
  },
  {
    name: "Perfil Hepático",
    code: "0302076",
    tint: "#0ea5e9",
    fonasa_a: 13640,
    fonasa_bcd: 8390,
    particular: 15686,
    items: [
      { name: "Transaminasa GOT", code: "0302063" },
      { name: "Transaminasa GPT", code: "0302063" },
      { name: "Bilirrubina total", code: "0302012" },
      { name: "Bilirrubina directa", code: "0302012" },
      { name: "Bilirrubina indirecta (total y conjugada)", code: "0302013" },
      { name: "Fosfatasa alcalina", code: "0302040" },
      { name: "Gamma GT", code: "0302045" },
      { name: "Tiempo de protrombina", code: "0301059" },
      { name: "% de Actividad" },
      { name: "INR" },
    ],
  },
  {
    name: "Perfil Lipídico",
    code: "0302034",
    tint: "#eab308",
    textDark: true,
    fonasa_a: 8290,
    fonasa_bcd: 5100,
    particular: 9534,
    items: [
      { name: "Colesterol total", code: "0302067" },
      { name: "Triglicéridos", code: "0302064" },
      { name: "Colesterol HDL", code: "0302068" },
      { name: "Colesterol LDL" },
      { name: "Relación LDL/HDL" },
      { name: "Colesterol total/HDL" },
    ],
  },
  {
    name: "Perfil Renal",
    code: "PERFIL RENAL",
    tint: "#0f172a",
    fonasa_a: 12480,
    fonasa_bcd: 7670,
    particular: 14352,
    items: [
      { name: "Microalbuminuria", code: "0309013" },
      { name: "Electrolitos Na/K/Cl ×3", code: "0302032" },
      { name: "Nitrógeno ureico", code: "0302057" },
      { name: "Creatinina en suero", code: "0302023" },
    ],
  },
  {
    name: "Perfil Tiroideo",
    code: "PERFIL TIROIDE",
    tint: "#16a34a",
    fonasa_a: 25270,
    fonasa_bcd: 15550,
    particular: 29061,
    items: [
      { name: "TSH", code: "0303024" },
      { name: "T4 libre", code: "0303026" },
      { name: "T4", code: "0303027" },
      { name: "T3", code: "0303028" },
    ],
  },
  {
    name: "HOMA",
    code: "HOMA",
    tint: "#64748b",
    fonasa_a: 8490,
    fonasa_bcd: 5220,
    particular: 9763,
    items: [
      { name: "Glucosa en sangre", code: "0302047" },
      { name: "Insulina basal", code: "0303017" },
    ],
  },
  {
    name: "Cinética del Fierro",
    code: "0301030 X3",
    tint: "#1e3a5f",
    fonasa_a: 21510,
    fonasa_bcd: 14040,
    particular: 24736,
    note: "Se cobra ×3 en FONASA (código 0301030).",
    items: [
      { name: "Ferritina", code: "0301026" },
      { name: "Transferrina", code: "0301082" },
      { name: "TIBC", code: "0301029" },
    ],
  },
  {
    name: "RAC (Microalbuminuria / Creatinuria)",
    code: "RAC",
    tint: "#fb7185",
    fonasa_a: 5850,
    fonasa_bcd: 3590,
    particular: 6727,
    items: [
      { name: "Microalbuminuria", code: "0309013" },
      { name: "Creatinina en orina", code: "0309010" },
    ],
  },
  {
    name: "Insulina Post Pandrial",
    code: null,
    tint: "#15803d",
    fonasa_a: 16020,
    fonasa_bcd: 9280,
    particular: 18422,
    note: "No se vende líquido. Paciente debe traer desayuno (café/té con leche, pan con mermelada o trozo de pastel). Si es diabético, tomar su desayuno habitual.",
    items: [
      { name: "Venosa adultos ×2", code: "0307011" },
      { name: "Insulina basal ×2", code: "0303017" },
    ],
  },
  {
    name: "Insulina Post Carga",
    code: null,
    tint: "#475569",
    fonasa_a: 19340,
    fonasa_bcd: 11480,
    particular: 22240,
    note: "No se vende líquido. Paciente debe traer desayuno. Si es diabético, tomar su desayuno habitual.",
    items: [
      { name: "Venosa adultos ×2", code: "0307011" },
      { name: "Insulina basal ×2", code: "0303017" },
    ],
  },
  {
    name: "Glucosa Post Pandrial",
    code: null,
    tint: "#fde047",
    textDark: true,
    fonasa_a: 5680,
    fonasa_bcd: 3320,
    particular: 6532,
    note: "No se vende líquido. Paciente debe traer desayuno. Si es diabético, tomar su desayuno habitual.",
    items: [
      { name: "Venosa adultos ×2", code: "0307011" },
      { name: "Glucosa ×2", code: "0302047" },
    ],
  },
  {
    name: "Glucosa Post Carga",
    code: null,
    tint: "#ef4444",
    fonasa_a: 5680,
    fonasa_bcd: 3320,
    particular: 6532,
    note: "No se vende líquido.",
    items: [
      { name: "Venosa adultos ×2", code: "0307011" },
      { name: "Glucosa ×2", code: "0302047" },
    ],
  },
  {
    name: "Anticuerpos Antitiroides",
    code: "0305007 X2",
    tint: "#0f172a",
    fonasa_a: 16140,
    fonasa_bcd: 9920,
    particular: 18562,
    items: [
      { name: "Antiperoxidasa ATPO", code: "0305007" },
      { name: "Anti-tiroglobulina ACCRE", code: "0305007" },
    ],
  },
  {
    name: "Perfil de Coagulación",
    code: null,
    tint: "#334155",
    fonasa_a: null,
    fonasa_bcd: null,
    particular: null,
    items: [
      { name: "Tiempo de protrombina TP/INR", code: "0301059" },
      { name: "Tromboplastina TTPA", code: "0301085" },
    ],
  },
  {
    name: "GAME (Inmunoglobulinas)",
    code: "GAME",
    tint: "#7c3aed",
    fonasa_a: 27740,
    fonasa_bcd: 17060,
    particular: 31901,
    items: [
      { name: "IgA, IgG, IgM ×3", code: "0305027" },
      { name: "IgE total", code: "0305028" },
    ],
  },
  {
    name: "Perfil ENA",
    code: "0305138",
    tint: "#4f46e5",
    fonasa_a: 139320,
    fonasa_bcd: 69660,
    particular: 160218,
    items: [
      { name: "SM, RNP, SS-A/RO, SS-B/LA, SCL-70, JO-1 (×6)", code: "0305138" },
    ],
  },
];

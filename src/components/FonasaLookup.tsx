import { useState, useMemo, type Dispatch, type SetStateAction } from "react";
import { Search, CheckCircle2, XCircle, FlaskConical, Scan, ChevronDown, ChevronUp, Plus, Check } from "lucide-react";
import { labDatabase } from "@/data/catalog";
import { type LabCartItem } from "@/components/LabQuoter";
import { imagingFonasaCodes, labNotAvailable, type FonasaEntry } from "@/data/fonasaCodes";
import { formatCLP } from "@/lib/format";

function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function fmtCode(raw: string) {
  return raw;
}

function buildDataset(): FonasaEntry[] {
  const seenLabCodes = new Set<string>();
  const labAvail: FonasaEntry[] = [];
  for (const e of labDatabase) {
    if (!/^03\d{5}$/.test(e.code)) continue;
    if (seenLabCodes.has(e.code)) continue;
    seenLabCodes.add(e.code);
    labAvail.push({
      code: e.code,
      name: e.name.replace(/\*[^*]+\*/g, "").trim(),
      section: "lab",
      subsection: subsectionForLabCode(e.code),
      available: true,
    });
  }
  const labAvailCodes = seenLabCodes;
  const labExtra = labNotAvailable.filter((e) => !labAvailCodes.has(e.code));
  return [...imagingFonasaCodes, ...labAvail, ...labExtra].sort((a, b) =>
    a.code.localeCompare(b.code)
  );
}

function subsectionForLabCode(code: string): string {
  const prefix = code.slice(0, 4);
  const map: Record<string, string> = {
    "0301": "Hematología",
    "0302": "Bioquímica",
    "0303": "Hormonas",
    "0304": "Genética",
    "0305": "Inmunología",
    "0306": "Microbiología",
    "0307": "Procedimientos",
    "0308": "Deposiciones / Líquidos",
  };
  return map[prefix] ?? "Laboratorio";
}

const ALL_DATASET = buildDataset();

const SUBSECTIONS_IMG = [
  "Radiografía", "Mamografía", "Radiología Compleja", "TAC", "AngioTAC",
  "Ecografía", "Doppler", "Resonancia Magnética", "Angio-RM",
];
const SUBSECTIONS_LAB = [
  "Hematología", "Bioquímica", "Hormonas", "Genética",
  "Inmunología", "Microbiología", "Procedimientos", "Deposiciones / Líquidos",
];

type SectionFilter = "all" | "lab" | "imagenologia";

export function FonasaLookup({
  labCart,
  setLabCart,
}: {
  labCart?: LabCartItem[];
  setLabCart?: Dispatch<SetStateAction<LabCartItem[]>>;
}) {
  const [query, setQuery] = useState("");
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [availFilter, setAvailFilter] = useState<"all" | "yes" | "no">("all");
  const [expandedSubs, setExpandedSubs] = useState<Record<string, boolean>>({});

  const hasQuoter = !!labCart && !!setLabCart;

  const filtered = useMemo(() => {
    const q = norm(query);
    return ALL_DATASET.filter((e) => {
      if (sectionFilter !== "all" && e.section !== sectionFilter) return false;
      if (availFilter === "yes" && !e.available) return false;
      if (availFilter === "no" && e.available) return false;
      if (!q) return true;
      const codeNorm = e.code.replace(/\s/g, "");
      const queryDigits = q.replace(/\s/g, "");
      return codeNorm.includes(queryDigits) || norm(e.name).includes(q);
    });
  }, [query, sectionFilter, availFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, FonasaEntry[]>();
    for (const entry of filtered) {
      const sub = entry.subsection;
      if (!map.has(sub)) map.set(sub, []);
      map.get(sub)!.push(entry);
    }
    return map;
  }, [filtered]);

  const subsOrder = [...SUBSECTIONS_IMG, ...SUBSECTIONS_LAB];
  const orderedSubs = [...grouped.keys()].sort(
    (a, b) => subsOrder.indexOf(a) - subsOrder.indexOf(b)
  );

  const toggleSub = (sub: string) =>
    setExpandedSubs((prev) => ({ ...prev, [sub]: !prev[sub] }));

  const handleAdd = (entry: FonasaEntry) => {
    if (!setLabCart) return;
    const dbEntry = labDatabase.find((e) => e.code === entry.code);
    if (!dbEntry) return;
    if (labCart?.some((c) => c.exam.code === entry.code)) return;
    setLabCart((prev) => [...prev, { exam: dbEntry, qty: 1 }]);
  };

  const availCount = ALL_DATASET.filter((e) => e.available).length;
  const totalCount = ALL_DATASET.length;

  return (
    <div className="space-y-5">
      {/* Header info */}
      <div className="rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex-1">
            <h2 className="text-base font-bold text-foreground">
              Buscador de Códigos FONASA 2026
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Consulta si DiagnoPRO Temuco realiza un examen desde el Arancel MLE 2026
              (Grupos 03 Laboratorio · 04 Imagenología).
              {hasQuoter && <span className="ml-1 font-semibold text-primary">Agrega exámenes de laboratorio directo al carrito.</span>}
            </p>
          </div>
          <div className="flex gap-3 text-center text-xs">
            <div className="rounded-xl bg-green-50 px-3 py-2">
              <p className="text-lg font-bold text-green-700">{availCount}</p>
              <p className="text-green-600">Disponibles</p>
            </div>
            <div className="rounded-xl bg-muted px-3 py-2">
              <p className="text-lg font-bold text-foreground">{totalCount}</p>
              <p className="text-muted-foreground">Códigos totales</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Código (0301026) o nombre del examen…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border bg-background py-2.5 pl-9 pr-3 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="flex rounded-xl border border-border bg-card p-0.5 text-xs font-semibold shadow-sm">
          {(["all", "imagenologia", "lab"] as SectionFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setSectionFilter(s)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 transition-all ${
                sectionFilter === s
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "imagenologia" && <Scan className="h-3.5 w-3.5" />}
              {s === "lab" && <FlaskConical className="h-3.5 w-3.5" />}
              {s === "all" ? "Todos" : s === "imagenologia" ? "Imagenología" : "Laboratorio"}
            </button>
          ))}
        </div>

        <div className="flex rounded-xl border border-border bg-card p-0.5 text-xs font-semibold shadow-sm">
          {(["all", "yes", "no"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setAvailFilter(v)}
              className={`rounded-lg px-3 py-1.5 transition-all ${
                availFilter === v
                  ? "bg-gradient-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "all" ? "Todos" : v === "yes" ? "Disponibles" : "No disponibles"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length === 0
          ? "Sin resultados para esa búsqueda."
          : `${filtered.length} código${filtered.length !== 1 ? "s" : ""} encontrado${filtered.length !== 1 ? "s" : ""}`}
      </p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-sm text-muted-foreground">
          <Search className="h-8 w-8 opacity-30" />
          <p>No se encontró ningún código que coincida.</p>
          <p className="text-xs">Intenta con el código completo (ej. "040301") o parte del nombre.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orderedSubs.map((sub) => {
            const items = grouped.get(sub)!;
            const isExpanded = expandedSubs[sub] !== false;
            const hasQuery = query.trim().length > 0;
            const show = hasQuery || isExpanded;
            const availableInSub = items.filter((i) => i.available).length;
            const isLabSub = items[0]?.section === "lab";
            const sectionIcon = !isLabSub
              ? <Scan className="h-3.5 w-3.5 text-primary" />
              : <FlaskConical className="h-3.5 w-3.5 text-violet-500" />;

            return (
              <div key={sub} className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <button
                  className="flex w-full items-center justify-between gap-2 px-4 py-3 transition-colors hover:bg-muted/30"
                  onClick={() => toggleSub(sub)}
                >
                  <div className="flex items-center gap-2">
                    {sectionIcon}
                    <span className="text-sm font-semibold text-foreground">{sub}</span>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold text-muted-foreground">
                      {items.length}
                    </span>
                    {availableInSub > 0 && (
                      <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                        {availableInSub} disponible{availableInSub !== 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                  {show
                    ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </button>

                {show && (
                  <div className="border-t border-border">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border bg-muted/40 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          <th className="w-[100px] px-4 py-2 text-left">Código</th>
                          <th className="px-4 py-2 text-left">Denominación FONASA</th>
                          {hasQuoter && isLabSub && (
                            <th className="w-[80px] px-2 py-2 text-center">Precio</th>
                          )}
                          <th className="w-[110px] px-4 py-2 text-center">DiagnoPRO</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {items.map((entry) => {
                          const isLabEntry = entry.section === "lab";
                          const inCart = hasQuoter && isLabEntry && labCart?.some((c) => c.exam.code === entry.code);
                          const dbEntry = isLabEntry ? labDatabase.find((e) => e.code === entry.code) : undefined;
                          return (
                            <tr
                              key={entry.code}
                              className={`transition-colors ${entry.available ? "hover:bg-green-50/30" : "hover:bg-muted/20"}`}
                            >
                              <td className="px-4 py-2.5 font-mono text-xs font-semibold tabular-nums text-foreground">
                                {fmtCode(entry.code)}
                              </td>
                              <td className="px-4 py-2.5 text-sm leading-snug text-foreground">
                                {entry.name}
                              </td>
                              {hasQuoter && isLabSub && (
                                <td className="px-2 py-2.5 text-center text-[11px] font-semibold text-foreground tabular-nums">
                                  {dbEntry && dbEntry.particular > 0
                                    ? formatCLP(dbEntry.particular)
                                    : <span className="text-muted-foreground">—</span>}
                                </td>
                              )}
                              <td className="px-4 py-2.5 text-center">
                                {entry.available ? (
                                  hasQuoter && isLabEntry ? (
                                    <button
                                      onClick={() => handleAdd(entry)}
                                      disabled={!!inCart}
                                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition ${
                                        inCart
                                          ? "bg-primary/10 text-primary"
                                          : "bg-green-100 text-green-700 hover:bg-green-200"
                                      }`}
                                    >
                                      {inCart
                                        ? <><Check className="h-3 w-3" /> En carrito</>
                                        : <><Plus className="h-3 w-3" /> Agregar</>}
                                    </button>
                                  ) : (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-bold text-green-700">
                                      <CheckCircle2 className="h-3 w-3" />
                                      {isLabSub ? "Sí" : "Disponible"}
                                    </span>
                                  )
                                ) : (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                                    <XCircle className="h-3 w-3" />
                                    No
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

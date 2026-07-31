import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  Search, X, Plus, Minus, FlaskConical, Check,
  AlertCircle, ChevronDown, ChevronUp, Timer,
} from "lucide-react";
import { labDatabase, type LabExam } from "@/data/catalog";
import { labProfiles, profileCartKey, type LabProfile } from "@/data/profiles";
import { soloParticularCodes } from "@/data/soloParticular";
import { formatCLP, normalize } from "@/lib/format";

export type LabCartItem = { exam: LabExam; qty: number };

const blockedCodes = new Set(["0301095", "0306118", "0306123"]);

function cleanName(name: string): string {
  return name.replace(/\*PARTICULAR\*/gi, "").replace(/\s{2,}/g, " ").trim();
}

function isBlocked(e: LabExam): boolean {
  return blockedCodes.has(e.code) || e.obs.toUpperCase().includes("NO SE REALIZA");
}

/** Normaliza código para comparación: quita ceros a la izquierda */
const normCode = (s: string) => s.replace(/^0+/, "").toLowerCase();

// ── Grupos de laboratorio ──────────────────────────────────────────────────
type LabGroup = {
  id: string;
  label: string;
  short: string;
  prefixes: string[];
  profileNames: string[] | "all";
};

const labGroups: LabGroup[] = [
  {
    id: "perfiles",
    label: "Perfiles",
    short: "Perfiles",
    prefixes: [],
    profileNames: "all",
  },
  {
    id: "hematologia",
    label: "Hematología",
    short: "HEM",
    prefixes: ["0301"],
    profileNames: ["Cinética del Fierro", "Perfil de Coagulación"],
  },
  {
    id: "bioquimica",
    label: "Bioquímica",
    short: "BIO",
    prefixes: ["0302"],
    profileNames: [
      "Perfil Bioquímico", "Perfil Hepático", "Perfil Lipídico", "Perfil Renal",
      "HOMA", "Insulina Post Pandrial", "Insulina Post Carga",
      "Glucosa Post Pandrial", "Glucosa Post Carga",
    ],
  },
  {
    id: "hormonas",
    label: "Hormonas",
    short: "HOR",
    prefixes: ["0303"],
    profileNames: ["Perfil Tiroideo"],
  },
  {
    id: "inmunologia",
    label: "Inmunología",
    short: "INM",
    prefixes: ["0305"],
    profileNames: ["Anticuerpos Antitiroides", "GAME", "Perfil ENA"],
  },
  {
    id: "orina",
    label: "Orina y Líquidos",
    short: "ORI",
    prefixes: ["0306", "0309", "0310"],
    profileNames: ["RAC (Microalbuminuria / Creatinuria)"],
  },
  {
    id: "procedimientos",
    label: "Procedimientos",
    short: "PROC",
    prefixes: ["0307", "0308"],
    profileNames: [],
  },
];

// ── Tiempos de entrega ─────────────────────────────────────────────────────
const turnaroundMeta: Record<string, { label: string; badge: string; dot: string }> = {
  same_day: {
    label: "1 día hábil",
    badge: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    dot: "bg-emerald-400",
  },
  "24h": {
    label: "2 días hábiles",
    badge: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
    dot: "bg-blue-400",
  },
  "2_5d": {
    label: "2–5 días hábiles",
    badge: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    dot: "bg-amber-400",
  },
  "5_15d": {
    label: "5–15 días hábiles",
    badge: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300",
    dot: "bg-rose-400",
  },
};

const turnaroundData = [
  {
    label: "1 día hábil",
    color: "emerald" as const,
    exams: "Hemograma, VHS, glicemia, creatinina, urea, ácido úrico, perfil renal, perfil hepático, perfil bioquímico, perfil lipídico, colesterol, triglicéridos, bilirrubinas, GGT, fosfatasas alcalinas, calcio, fósforo, magnesio, electrolitos, TP/INR, TTPA, grupo sanguíneo",
  },
  {
    label: "2 días hábiles",
    color: "blue" as const,
    exams: "Ferritina, fierro sérico, TIBC, transferrina, HbA1c, vitamina B12, insulina basal, β-HCG, TSH, T4 libre, T3, cortisol, FSH, LH, estradiol, progesterona, prolactina, testosterona",
  },
  {
    label: "2–5 días hábiles",
    color: "amber" as const,
    exams: "Vitamina D, PTH, SHBG, testosterona libre, DHEA-S, ACTH, aldosterona, IGF-1, IGFBP3, ANA, ENA, ATPO, antitiroglobulina, electroforesis de proteínas, homocisteína, CEA, AFP",
  },
  {
    label: "5–15 días hábiles",
    color: "rose" as const,
    exams: "Antitrombina III, Proteína C, Proteína S, Factor Von Willebrand, Eritropoyetina, Interferón Gamma TBC, Carga Viral VIH, Calprotectina, Galactomanano, Cobre, Arsénico, Cortisol salival y otros exámenes externos",
  },
] as const;

type TurnaroundColor = (typeof turnaroundData)[number]["color"];

const turnaroundColorMap: Record<TurnaroundColor, { card: string; label: string; dot: string }> = {
  emerald: {
    card: "border-emerald-200 bg-emerald-50/60 dark:border-emerald-800/50 dark:bg-emerald-950/20",
    label: "text-emerald-800 dark:text-emerald-300",
    dot: "bg-emerald-400",
  },
  blue: {
    card: "border-blue-200 bg-blue-50/60 dark:border-blue-800/50 dark:bg-blue-950/20",
    label: "text-blue-800 dark:text-blue-300",
    dot: "bg-blue-400",
  },
  amber: {
    card: "border-amber-200 bg-amber-50/60 dark:border-amber-800/50 dark:bg-amber-950/20",
    label: "text-amber-800 dark:text-amber-300",
    dot: "bg-amber-400",
  },
  rose: {
    card: "border-rose-200 bg-rose-50/60 dark:border-rose-800/50 dark:bg-rose-950/20",
    label: "text-rose-800 dark:text-rose-300",
    dot: "bg-rose-400",
  },
};

// ── Componente principal ───────────────────────────────────────────────────
export function LabQuoter({
  cart,
  setCart,
  prevision,
}: {
  cart: LabCartItem[];
  setCart: Dispatch<SetStateAction<LabCartItem[]>>;
  prevision: "particular" | "fa" | "fbcd";
}) {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  void prevision;

  const isSearching = query.trim().length >= 2;

  // Dedup + filtrado principal
  const { mainResults, soloResults, groupResults } = useMemo(() => {
    const seen = new Set<string>();
    const unique = labDatabase.filter((e) => {
      if (seen.has(e.code)) return false;
      seen.add(e.code);
      return true;
    });

    if (isSearching) {
      const nq = normalize(query);
      const cq = query.trim().toLowerCase();

      const filtered = unique.filter((e) => {
        const nameMatch = normalize(cleanName(e.name)).includes(nq);
        const codeMatch =
          e.code.toLowerCase().includes(cq) ||
          normCode(e.code) === normCode(cq) ||
          normCode(e.code).includes(normCode(cq));
        return nameMatch || codeMatch;
      });

      const main: LabExam[] = [];
      const solo: LabExam[] = [];
      for (const e of filtered) {
        if (soloParticularCodes.has(e.code)) solo.push(e);
        else main.push(e);
      }
      return { mainResults: main.slice(0, 100), soloResults: solo.slice(0, 30), groupResults: [] };
    }

    // Group filter (when not searching)
    const group = labGroups.find((g) => g.id === activeGroup);
    if (group && group.prefixes.length > 0) {
      const inGroup = unique.filter((e) =>
        group.prefixes.some((p) => e.code.startsWith(p))
      );
      const main: LabExam[] = [];
      const solo: LabExam[] = [];
      for (const e of inGroup) {
        if (soloParticularCodes.has(e.code)) solo.push(e);
        else main.push(e);
      }
      return { mainResults: [], soloResults: [], groupResults: [...main, ...solo] };
    }

    return { mainResults: [], soloResults: [], groupResults: [] };
  }, [query, isSearching, activeGroup]);

  const glucofresh = useMemo(
    () => labDatabase.find((e) => e.code === "GLUCOSA LIQ"),
    []
  );

  const needsGlucofresh = (e: LabExam) =>
    e.code === "0302048" || e.code === "0303031" ||
    /tolerancia|ptgo|carga.*glucosa|glucosa.*carga|curva.*insulina/i.test(e.name);

  const add = (e: LabExam) => {
    setCart((p) => {
      const existing = p.find((i) => i.exam.code === e.code);
      let next = existing
        ? p.map((i) => i.exam.code === e.code ? { ...i, qty: i.qty + 1 } : i)
        : [...p, { exam: e, qty: 1 }];
      // Auto-add Glucofresh for PTGO and Curva de Insulina (only once)
      if (needsGlucofresh(e) && glucofresh && !next.find((i) => i.exam.code === glucofresh.code)) {
        next = [...next, { exam: glucofresh, qty: 1 }];
      }
      return next;
    });
  };

  const changeQty = (code: string, delta: number) => {
    setCart((p) =>
      p
        .map((i) => i.exam.code === code ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const addProfile = (p: LabProfile) => {
    const dbEntry = p.code ? labDatabase.find((e) => e.code === p.code) : undefined;
    const item: LabExam = dbEntry || {
      code: profileCartKey(p),
      name: p.name,
      fonasa_bcd: p.fonasa_bcd ?? null,
      fonasa_a: p.fonasa_a,
      particular: p.particular ?? 0,
      obs: "",
    };
    add(item);
  };

  const activeGroupDef = labGroups.find((g) => g.id === activeGroup);

  // Perfiles relevantes para el grupo activo
  const groupProfiles = useMemo(() => {
    if (!activeGroupDef) return [];
    if (activeGroupDef.profileNames === "all") return labProfiles;
    return labProfiles.filter((p) => (activeGroupDef.profileNames as string[]).includes(p.name));
  }, [activeGroupDef]);

  const totalSearchResults = mainResults.length + soloResults.length;

  return (
    <div className="min-w-0 space-y-4">

      {/* ── Group pills ── */}
      <div className="rounded-2xl border bg-card shadow-[var(--shadow-card)]">
        <div className="border-b border-border/60 p-4">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            Sección
          </p>
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {labGroups.map((g) => {
              const active = activeGroup === g.id;
              return (
                <button
                  key={g.id}
                  onClick={() => { setActiveGroup(active ? null : g.id); setQuery(""); }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all ${
                    active
                      ? "border-transparent bg-gradient-brand text-primary-foreground shadow-[var(--shadow-lift)]"
                      : "border-border bg-secondary/40 text-secondary-foreground hover:border-primary/40 hover:bg-secondary"
                  }`}
                >
                  {g.short}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Unified search ── */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {isSearching && (
            <p className="mt-1.5 px-1 text-xs text-muted-foreground">
              {totalSearchResults} resultado(s) ·{" "}
              <button onClick={() => setQuery("")} className="font-medium text-primary hover:underline">
                Limpiar
              </button>
            </p>
          )}
        </div>

        {/* ── Tiempos de entrega (collapsible) ── */}
        <TurnaroundPanel />
      </div>

      {/* ── Perfiles: vista completa ── */}
      {!isSearching && activeGroup === "perfiles" && (
        <div className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]">
          <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground">
            Perfiles destacados
          </h3>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {labProfiles.map((p) => (
              <ProfileCard key={p.name} p={p} cart={cart} onAdd={addProfile} />
            ))}
          </div>
        </div>
      )}

      {/* ── Grupos con perfiles + exámenes ── */}
      {!isSearching && activeGroup !== "perfiles" && activeGroupDef && (
        <div className="rounded-2xl border bg-card shadow-[var(--shadow-card)]">
          {/* Perfiles del grupo */}
          {groupProfiles.length > 0 && (
            <div className="border-b border-border/60 p-4">
              <p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Perfiles
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {groupProfiles.map((p) => (
                  <ProfileCard key={p.name} p={p} cart={cart} onAdd={addProfile} />
                ))}
              </div>
            </div>
          )}

          {/* Exámenes del grupo */}
          <div className="p-4">
            <p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Exámenes — {activeGroupDef.label}
            </p>
            <div className="max-h-[500px] space-y-2 overflow-y-auto pr-1">
              {groupResults.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
                  <FlaskConical className="h-8 w-8 opacity-30" />
                  No hay exámenes disponibles en esta sección.
                </div>
              )}
              <ExamList items={groupResults} cart={cart} onAdd={add} onChangeQty={changeQty} />
            </div>
          </div>
        </div>
      )}

      {/* ── Resultados de búsqueda ── */}
      {isSearching && (
        <div className="rounded-2xl border bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="max-h-[520px] space-y-2 overflow-y-auto pr-1">
            <ExamList items={mainResults} cart={cart} onAdd={add} onChangeQty={changeQty} />

            {soloResults.length > 0 && (
              <>
                <div className="flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-3 py-2 dark:border-orange-700 dark:bg-orange-950/40">
                  <AlertCircle className="h-3.5 w-3.5 shrink-0 text-orange-500 dark:text-orange-400" />
                  <p className="text-[11px] font-semibold text-orange-700 dark:text-orange-400">
                    Solo Particulares — Exámenes externos ({soloResults.length})
                  </p>
                </div>
                <ExamList items={soloResults} cart={cart} onAdd={add} onChangeQty={changeQty} isSolo />
              </>
            )}

            {totalSearchResults === 0 && (
              <div className="flex flex-col items-center gap-2 py-12 text-center text-sm text-muted-foreground">
                <FlaskConical className="h-8 w-8 opacity-30" />
                Sin resultados. Intenta con otro nombre o código.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── TurnaroundPanel ────────────────────────────────────────────────────────
function TurnaroundPanel() {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t border-border/60">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-secondary/30"
      >
        <Timer className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span className="flex-1 text-[12px] font-semibold text-muted-foreground">
          Tiempos de entrega aproximados
        </span>
        {open
          ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" />
          : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
      </button>

      {open && (
        <div className="border-t border-border/40 px-4 pb-4 pt-3">
          <div className="grid gap-2 sm:grid-cols-2">
            {turnaroundData.map((t) => {
              const c = turnaroundColorMap[t.color];
              return (
                <div key={t.label} className={`rounded-xl border p-3 ${c.card}`}>
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                    <span className={`text-[12px] font-bold ${c.label}`}>{t.label}</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">{t.exams}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">
            * Los tiempos son aproximados y pueden variar. Exámenes externos pueden demorar más.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Badges ─────────────────────────────────────────────────────────────────
function TurnaroundBadge({ type }: { type: string }) {
  const m = turnaroundMeta[type];
  if (!m) return null;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.badge}`}>
      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${m.dot}`} />
      {m.label}
    </span>
  );
}

function FastingBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold text-orange-800 dark:bg-orange-900/40 dark:text-orange-300">
      Ayuno
    </span>
  );
}

function PrepBadge({ type }: { type: "orina_manana" | "orina_24h" | "psa" }) {
  const meta = {
    orina_manana: { label: "Primera orina de la mañana", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" },
    orina_24h:   { label: "Orina de 24 horas",           color: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-400" },
    psa:         { label: "Abstinencia sexual 48h",       color: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" },
  };
  const m = meta[type];
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${m.color}`}>
      {m.label}
    </span>
  );
}

// ── ProfileCard ────────────────────────────────────────────────────────────
function ProfileCard({
  p,
  cart,
  onAdd,
}: {
  p: LabProfile;
  cart: LabCartItem[];
  onAdd: (p: LabProfile) => void;
}) {
  const inCart = cart.some(
    (c) => c.exam.code === profileCartKey(p) || c.exam.code === `PERFIL-${p.name}`
  );
  const fg = p.textDark ? "text-gray-900" : "text-white";
  const fgSub = p.textDark ? "text-gray-800/70" : "text-white/80";
  const btnBg = p.textDark ? "bg-black/15 hover:bg-black/25" : "bg-white/25 hover:bg-white/40";

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background">
      <div
        className="flex min-w-0 items-center justify-between gap-2 px-3 py-2.5"
        style={{ backgroundColor: p.tint }}
      >
        <div className="min-w-0 flex-1">
          <span className={`block truncate text-xs font-bold drop-shadow-sm ${fg}`}>{p.name}</span>
          {p.code && /^\d/.test(p.code) && (
            <span className={`font-mono text-[10px] ${fgSub}`}>{p.code}</span>
          )}
        </div>
        {p.particular != null && (
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${btnBg} ${fg}`}>
            {formatCLP(p.particular)}
          </span>
        )}
        <button
          onClick={() => onAdd(p)}
          disabled={inCart}
          className={`shrink-0 flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold backdrop-blur transition disabled:opacity-50 ${btnBg} ${fg}`}
        >
          {inCart ? <Check className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          {inCart ? "Agregado" : "Agregar"}
        </button>
      </div>

      <div className="px-3 py-2">
        <div className="flex flex-wrap gap-1">
          {p.items.map((it) => (
            <span
              key={it.name + (it.code ?? "")}
              className="inline-flex items-center gap-1 rounded bg-secondary px-1.5 py-0.5 text-[10px] text-secondary-foreground"
            >
              <span className="max-w-[120px] truncate">{it.name}</span>
              {it.code && (
                <span className="shrink-0 font-mono text-[9px] opacity-55">{it.code}</span>
              )}
            </span>
          ))}
        </div>
        {p.note && (
          <p className="mt-2 rounded-lg border border-amber-200 bg-amber-50 px-2 py-1.5 text-[10px] italic text-amber-800 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-300">
            {p.note}
          </p>
        )}
        <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] text-muted-foreground">
          {p.fonasa_a != null && (
            <span>FONASA A <b className="text-foreground">{formatCLP(p.fonasa_a)}</b></span>
          )}
          {p.fonasa_bcd != null && (
            <span>FONASA B/C/D <b className="text-foreground">{formatCLP(p.fonasa_bcd)}</b></span>
          )}
          {p.particular == null && (
            <span className="font-semibold text-primary">Valor a confirmar</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── ExamList ───────────────────────────────────────────────────────────────
function ExamList({
  items,
  cart,
  onAdd,
  onChangeQty,
  isSolo = false,
}: {
  items: LabExam[];
  cart: LabCartItem[];
  onAdd: (e: LabExam) => void;
  onChangeQty: (code: string, delta: number) => void;
  isSolo?: boolean;
}) {
  return (
    <>
      {items.map((e, idx) => {
        const cartItem = cart.find((c) => c.exam.code === e.code);
        const inCart = !!cartItem;
        const blocked = isBlocked(e);
        const isBoleta = !isSolo && e.obs?.toUpperCase().includes("BOLETA");

        let cardCls = "border-border bg-background";
        if (isSolo) cardCls = "border-orange-200 bg-orange-50/40 dark:border-orange-800/60 dark:bg-orange-950/20";
        else if (isBoleta) cardCls = "border-amber-200 bg-amber-50/40 dark:border-amber-800 dark:bg-amber-950/10";

        const nameCls = isSolo ? "text-orange-700 dark:text-orange-400" : "text-foreground";
        let codeCls = "bg-secondary text-secondary-foreground";
        if (isSolo) codeCls = "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400";
        else if (isBoleta) codeCls = "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";

        return (
          <div
            key={`${e.code}-${idx}`}
            className={`flex items-start gap-3 rounded-xl border p-3 ${cardCls} ${blocked ? "opacity-50" : ""}`}
          >
            <span className={`mt-0.5 shrink-0 rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold ${codeCls}`}>
              {e.code}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold leading-snug ${nameCls}`}>
                {cleanName(e.name)}
              </p>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                {!blocked ? (
                  <>
                    {e.fonasa_a != null && (
                      <span>FONASA A <b className="text-foreground">{formatCLP(e.fonasa_a)}</b></span>
                    )}
                    {e.fonasa_bcd != null && (
                      <span>FONASA B/C/D <b className="text-foreground">{formatCLP(e.fonasa_bcd)}</b></span>
                    )}
                    {e.particular > 0 && (
                      <span>
                        Particular{" "}
                        <b className={isSolo ? "text-orange-700 dark:text-orange-400" : "text-foreground"}>
                          {formatCLP(e.particular)}
                        </b>
                      </span>
                    )}
                    {isBoleta && (
                      <span className="rounded bg-amber-100 px-1.5 font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                        BOLETA
                      </span>
                    )}
                  </>
                ) : (
                  <span className="rounded bg-slate-100 px-1.5 font-semibold text-slate-500 dark:bg-slate-800/60 dark:text-slate-400">
                    No disponible
                  </span>
                )}
              </div>
              {(e.prep || e.turnaround || e.fasting) && (
                <span className="mt-1.5 flex flex-wrap gap-1">
                  {e.turnaround && <TurnaroundBadge type={e.turnaround} />}
                  {e.fasting && <FastingBadge />}
                  {e.prep && <PrepBadge type={e.prep} />}
                </span>
              )}
            </div>

            {inCart && !blocked ? (
              <div className="flex shrink-0 items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-1.5 py-1">
                <button
                  onClick={() => onChangeQty(e.code, -1)}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-background text-foreground hover:bg-muted"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-sm font-bold text-primary">{cartItem.qty}</span>
                <button
                  onClick={() => onChangeQty(e.code, 1)}
                  className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => onAdd(e)}
                disabled={blocked}
                className="shrink-0 rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                title={blocked ? "No disponible en este laboratorio" : "Agregar"}
              >
                <Plus className="h-4 w-4" />
              </button>
            )}
          </div>
        );
      })}
    </>
  );
}

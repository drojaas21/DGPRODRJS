import { useMemo, useState, type Dispatch, type SetStateAction } from "react";
import {
  Brain, ScanLine, Waves, Bone, HeartPulse, Droplets, Activity,
  Search, X, Stethoscope, Plus, Minus, ChevronDown, MapPin, Info, FlaskConical, AlertCircle,
  type LucideIcon,
} from "lucide-react";
import {
  examDatabase, categoryMeta, categoryOrder,
  type Exam, type ExamCategory, type Convenio,
} from "@/data/catalog";
import { formatCLP, normalize } from "@/lib/format";
import { getExamCovers, examMatchesZone } from "@/data/examCovers";
import { getPatientInfo } from "@/data/patientInfo";
import { getImagingFonasaCode } from "@/data/imagingFonasaCodes";
import { itemHasContrast } from "@/data/imagingPrep";

const icons: Record<string, LucideIcon> = { Brain, ScanLine, Waves, Bone, HeartPulse, Droplets, Activity };

export type CartItem = {
  key: string;
  category: ExamCategory;
  index: number;
  exam: Exam;
  qty: number;
  withContrast?: boolean;
};

export function ExamQuoter({
  cart,
  setCart,
  prevision,
  convenio,
}: {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  prevision: "particular" | "fa" | "fbcd";
  convenio: Convenio;
}) {
  const [activeCat, setActiveCat] = useState<ExamCategory | null>(null);
  const [query, setQuery] = useState("");
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());
  const [activeInfoKey, setActiveInfoKey] = useState<string | null>(null);

  const isSearching = query.trim().length >= 2;

  const searchResults = useMemo(() => {
    if (!isSearching) return null;
    const nq = normalize(query);
    const cq = query.trim().toLowerCase();
    const out: { category: ExamCategory; index: number; exam: Exam }[] = [];
    const cats = activeCat ? [activeCat] : (Object.keys(examDatabase) as ExamCategory[]);
    cats.forEach((cat) => {
      examDatabase[cat].forEach((exam, index) => {
        const nameMatch = normalize(exam.name).includes(nq) || normalize(exam.desc).includes(nq) || examMatchesZone(exam.name, nq);
        const codeMatch = getImagingFonasaCode(exam.name)?.toLowerCase().includes(cq) ?? false;
        if (nameMatch || codeMatch) out.push({ category: cat, index, exam });
      });
    });
    return out;
  }, [query, isSearching, activeCat]);

  const list = useMemo(() => {
    if (searchResults) return searchResults;
    if (!activeCat) return [];
    return examDatabase[activeCat].map((exam, index) => ({ category: activeCat, index, exam }));
  }, [searchResults, activeCat]);

  const getBasePrice = (exam: Exam) => {
    return prevision === "particular" ? exam.part : prevision === "fa" ? exam.fa : exam.fbcd;
  };

  const addToCart = (category: ExamCategory, index: number, exam: Exam) => {
    const key = `${category}::${index}`;
    const initialQty = /se cobra por dos/i.test(exam.note ?? "") ? 2 : 1;
    setCart((prev) => {
      const existing = prev.find((c) => c.key === key);
      if (existing) return prev.map((c) => c.key === key ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { key, category, index, exam, qty: initialQty }];
    });
  };

  const changeQty = (key: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => c.key === key ? { ...c, qty: c.qty + delta } : c)
        .filter((c) => c.qty > 0)
    );
  };

  const toggleExpanded = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const toggleInfo = (key: string) => {
    setActiveInfoKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="min-w-0 rounded-2xl border bg-card shadow-[var(--shadow-card)]">

      {/* ── Category strip ── */}
      <div className="border-b border-border/60 p-4">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
          Categoría
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {categoryOrder.map((cat) => {
            const meta = categoryMeta[cat];
            const Icon = icons[meta.icon];
            const active = activeCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCat((prev) => (prev === cat ? null : cat))}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-all ${
                  active
                    ? "border-transparent bg-gradient-brand text-primary-foreground shadow-[var(--shadow-lift)]"
                    : "border-border bg-secondary/40 text-secondary-foreground hover:border-primary/40 hover:bg-secondary"
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{meta.short}</span>
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
            {searchResults?.length ?? 0} resultado(s)
            <button
              onClick={() => setQuery("")}
              className="ml-2 font-medium text-primary hover:underline"
            >
              Limpiar
            </button>
          </p>
        )}
      </div>

      {/* ── Results ── */}
      <div className="max-h-[520px] space-y-2 overflow-y-auto px-4 pb-4 pr-3">
        {list.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-sm text-muted-foreground">
            <Stethoscope className="h-8 w-8 opacity-40" />
            {isSearching
              ? "Sin resultados. Intenta con otro nombre o código."
              : "Selecciona una categoría o busca un examen."}
          </div>
        )}

        {list.map(({ category, index, exam }) => {
          const key = `${category}::${index}`;
          const cartItem = cart.find((c) => c.key === key);
          const meta = categoryMeta[category];
          const price = getBasePrice(exam);
          const covers = getExamCovers(exam.name);
          const isExpanded = expandedKeys.has(key);
          const hasCovers = covers.length > 0;
          const patientInfo = getPatientInfo(exam.name);
          const fonasaCode = getImagingFonasaCode(exam.name);
          const isInfoOpen = activeInfoKey === key;
          const examHasContrast = itemHasContrast(exam.name, category, exam.autoContrast);

          return (
            <div key={key} className="rounded-xl border border-border bg-background">
              {/* Main row */}
              <div className="flex w-full items-start gap-3 p-3">
                {/* Badges */}
                <div className="flex shrink-0 flex-col items-start gap-1">
                  <span
                    className="inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground"
                    style={{ backgroundColor: meta.tint }}
                  >
                    {meta.short}
                  </span>
                  {fonasaCode && (
                    <span className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[9px] font-semibold text-muted-foreground">
                      {fonasaCode}
                    </span>
                  )}
                </div>

                {/* Name + desc + price */}
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold leading-snug text-foreground">{exam.name}</span>
                  <span className="mt-0.5 block text-xs text-muted-foreground line-clamp-1">{exam.desc}</span>
                  <span className="mt-1 block text-xs font-semibold text-foreground">
                    {formatCLP(price)}
                  </span>
                  {(exam.autoContrast || exam.note) && (
                    <span className="mt-1.5 flex flex-wrap gap-1">
                      {exam.autoContrast && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-bold text-orange-700 dark:bg-orange-900/40 dark:text-orange-400">
                          <FlaskConical className="h-2.5 w-2.5" />
                          Requiere contraste
                        </span>
                      )}
                      {exam.note && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                          <AlertCircle className="h-2.5 w-2.5 shrink-0" />
                          {exam.note}
                        </span>
                      )}
                    </span>
                  )}
                </span>

                {/* Actions */}
                <div className="flex shrink-0 flex-col items-end gap-2">
                  {patientInfo && (
                    <button
                      onClick={() => toggleInfo(key)}
                      title="Información para el paciente"
                      className={`flex h-6 w-6 items-center justify-center rounded-full transition ${
                        isInfoOpen
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      }`}
                    >
                      <Info className="h-3.5 w-3.5" />
                    </button>
                  )}
                  {cartItem ? (
                    <div className="flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/5 px-1.5 py-1">
                      <button
                        onClick={() => changeQty(key, -1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-background text-foreground hover:bg-muted"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-5 text-center text-sm font-bold text-primary">{cartItem.qty}</span>
                      <button
                        onClick={() => changeQty(key, 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(category, index, exam)}
                      className="rounded-lg bg-primary p-2 text-primary-foreground transition hover:opacity-90"
                      title="Agregar al carrito"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Patient info */}
              {patientInfo && isInfoOpen && (
                <div className="border-t border-blue-100 bg-blue-50/60 px-3 py-2.5 dark:border-blue-900/30 dark:bg-blue-950/20">
                  <div className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500" />
                    <div className="space-y-2">
                      <div>
                        <p className="mb-1 text-[11px] font-bold text-blue-700 dark:text-blue-400">
                          Información para el paciente
                        </p>
                        <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300">
                          {patientInfo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Covers toggle */}
              {hasCovers && (
                <div className="border-t border-border/60">
                  <button
                    onClick={() => toggleExpanded(key)}
                    className="flex w-full items-center gap-1.5 px-3 py-2 text-left transition hover:bg-secondary/30"
                  >
                    <MapPin className="h-3 w-3 shrink-0 text-primary" />
                    <span className="flex-1 text-[11px] font-semibold text-primary">
                      ¿Qué incluye este examen?
                    </span>
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {isExpanded && (
                    <div className="px-3 pb-3">
                      <div className="flex flex-wrap gap-1.5">
                        {covers.map((zone) => (
                          <button
                            key={zone}
                            onClick={() => { setQuery(zone.split(" ")[0]); setActiveCat(null); }}
                            title={`Buscar "${zone}"`}
                            className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition hover:bg-primary/10"
                          >
                            {zone}
                          </button>
                        ))}
                      </div>
                      <p className="mt-2 text-[10px] text-muted-foreground">
                        Toca una zona para buscarla directamente.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

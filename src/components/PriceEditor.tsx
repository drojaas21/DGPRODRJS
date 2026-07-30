import { useState, useMemo } from "react";
import { Settings2, X, Search, RotateCcw, FlaskConical, Scan, ChevronDown } from "lucide-react";
import { examDatabase, categoryMeta, categoryOrder, type ExamCategory } from "@/data/catalog";
import { labDatabase } from "@/data/catalog";
import { formatCLP, normalize } from "@/lib/format";
import { imagingOverrideKey, type AllOverrides, type ImagingOverride, type LabOverride } from "@/hooks/usePriceOverrides";

const PASS = "123456";

function NumInput({
  label,
  value,
  original,
  onChange,
}: {
  label: string;
  value: number | undefined;
  original: number;
  onChange: (v: number | undefined) => void;
}) {
  const isOverridden = value !== undefined && value !== original;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="relative">
        <input
          type="number"
          min={0}
          step={100}
          value={value ?? original}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (isNaN(n) || n === original) onChange(undefined);
            else onChange(n);
          }}
          className={`w-full rounded-lg border px-2 py-1.5 text-right text-xs font-mono outline-none transition focus:ring-2 focus:ring-ring/30 ${
            isOverridden
              ? "border-amber-400 bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 focus:border-amber-400"
              : "border-input bg-background text-foreground focus:border-primary"
          }`}
        />
        {isOverridden && (
          <button
            onClick={() => onChange(undefined)}
            title="Restaurar precio original"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 text-amber-500 hover:text-amber-700"
          >
            <RotateCcw className="h-3 w-3" />
          </button>
        )}
      </div>
      {isOverridden && (
        <span className="text-[10px] text-muted-foreground">
          Original: {formatCLP(original)}
        </span>
      )}
    </div>
  );
}

export function PriceEditor({
  overrides,
  setImagingOverride,
  setLabOverride,
  clearAll,
  devMode = false,
  onDevModeChange,
}: {
  overrides: AllOverrides;
  setImagingOverride: (category: string, name: string, fields: ImagingOverride) => void;
  setLabOverride: (code: string, fields: LabOverride) => void;
  clearAll: () => void;
  devMode?: boolean;
  onDevModeChange?: (on: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr] = useState(false);
  const [devMsg, setDevMsg] = useState<string | null>(null);
  const [tab, setTab] = useState<"imaging" | "lab">("imaging");
  const [query, setQuery] = useState("");
  const [expandedImaging, setExpandedImaging] = useState<ExamCategory | null>(null);

  const totalOverrides = Object.keys(overrides.imaging).length + Object.keys(overrides.lab).length;

  const filteredLab = useMemo(() => {
    const q = normalize(query);
    if (!q) return labDatabase;
    return labDatabase.filter(
      (e) => normalize(e.name).includes(q) || e.code.includes(q)
    );
  }, [query]);

  const filteredImaging = useMemo(() => {
    const q = normalize(query);
    const results: { category: ExamCategory; exam: (typeof examDatabase)[ExamCategory][number]; idx: number }[] = [];
    (categoryOrder as ExamCategory[]).forEach((cat) => {
      examDatabase[cat].forEach((exam, idx) => {
        if (!q || normalize(exam.name).includes(q)) {
          results.push({ category: cat, exam, idx });
        }
      });
    });
    return results;
  }, [query]);

  const handleAuth = () => {
    const input = passInput.trim().toLowerCase();
    if (input === "developer") {
      onDevModeChange?.(true);
      setDevMsg("Vista extendida activada: los exámenes de RM y Scanner ahora muestran los diagnósticos que habitualmente requieren contraste.");
      setPassInput("");
      setPassErr(false);
      return;
    }
    if (input === "comeback") {
      onDevModeChange?.(false);
      setDevMsg("Vista extendida desactivada. La página volvió a su versión normal.");
      setPassInput("");
      setPassErr(false);
      return;
    }
    if (passInput === PASS) {
      setAuthed(true);
      setPassErr(false);
      setDevMsg(null);
    } else {
      setPassErr(true);
      setDevMsg(null);
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        title="Editor de precios"
        className="fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-card/80 text-muted-foreground shadow-md backdrop-blur transition hover:border-border hover:text-foreground"
      >
        <Settings2 className="h-4.5 w-4.5" />
        {totalOverrides > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[9px] font-bold text-white">
            {totalOverrides > 9 ? "9+" : totalOverrides}
          </span>
        )}
      </button>
    );
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      <div className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-bold text-foreground">Editor de precios</span>
            {totalOverrides > 0 && (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                {totalOverrides} modificado{totalOverrides !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Auth gate */}
        {!authed ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
            <Settings2 className="h-10 w-10 text-muted-foreground opacity-40" />
            <p className="text-center text-sm text-muted-foreground">
              Ingresa la clave de administración para editar precios.
            </p>
            <div className="flex w-full max-w-xs flex-col gap-2">
              <input
                type="password"
                placeholder="Clave de acceso"
                value={passInput}
                onChange={(e) => { setPassInput(e.target.value); setPassErr(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleAuth()}
                className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring/30 ${
                  passErr ? "border-red-400 bg-red-50 dark:bg-red-900/20" : "border-input bg-background"
                }`}
              />
              {passErr && (
                <p className="text-center text-xs text-red-500">Clave incorrecta.</p>
              )}
              {devMsg && (
                <p className={`rounded-lg px-3 py-2 text-center text-xs font-medium ${
                  devMode
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400"
                    : "bg-secondary text-muted-foreground"
                }`}>
                  {devMsg}
                </p>
              )}
              <button
                onClick={handleAuth}
                className="rounded-xl bg-gradient-brand py-2.5 text-sm font-semibold text-primary-foreground shadow hover:opacity-90"
              >
                Ingresar
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs + search */}
            <div className="shrink-0 space-y-3 border-b border-border px-5 py-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setTab("imaging")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    tab === "imaging"
                      ? "bg-gradient-brand text-primary-foreground shadow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <Scan className="h-3.5 w-3.5" />
                  Imagenología
                </button>
                <button
                  onClick={() => setTab("lab")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    tab === "lab"
                      ? "bg-gradient-brand text-primary-foreground shadow"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  <FlaskConical className="h-3.5 w-3.5" />
                  Laboratorio
                </button>
                {totalOverrides > 0 && (
                  <button
                    onClick={() => { if (confirm("¿Restaurar todos los precios originales?")) clearAll(); }}
                    className="ml-auto flex items-center gap-1 rounded-lg border border-border px-2.5 py-2 text-xs font-medium text-muted-foreground hover:border-red-300 hover:text-red-500"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Restaurar todo
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar examen…"
                  className="w-full rounded-xl border border-input bg-background py-2 pl-9 pr-3 text-xs outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto">
              {tab === "imaging" && (
                <div>
                  {query
                    ? filteredImaging.map(({ category, exam, idx }) => {
                        const key = imagingOverrideKey(category, exam.name);
                        const ov = overrides.imaging[key] ?? {};
                        const meta = categoryMeta[category];
                        return (
                          <ImagingRow
                            key={`${category}::${idx}`}
                            category={category}
                            exam={exam}
                            meta={meta}
                            override={ov}
                            onChange={(fields) => setImagingOverride(category, exam.name, fields)}
                          />
                        );
                      })
                    : (categoryOrder as ExamCategory[]).map((cat) => {
                        const meta = categoryMeta[cat];
                        const isExpanded = expandedImaging === cat;
                        const catOverrides = examDatabase[cat].filter((e) => {
                          const k = imagingOverrideKey(cat, e.name);
                          return !!overrides.imaging[k];
                        }).length;
                        return (
                          <div key={cat}>
                            <button
                              onClick={() => setExpandedImaging(isExpanded ? null : cat)}
                              className="flex w-full items-center gap-2.5 border-b border-border/60 px-5 py-3 text-left transition hover:bg-secondary/30"
                            >
                              <span
                                className="inline-flex h-5 w-10 shrink-0 items-center justify-center rounded text-[9px] font-bold text-primary-foreground"
                                style={{ backgroundColor: meta.tint }}
                              >
                                {meta.short}
                              </span>
                              <span className="flex-1 text-xs font-semibold text-foreground">{meta.label}</span>
                              {catOverrides > 0 && (
                                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-bold text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                                  {catOverrides}
                                </span>
                              )}
                              <ChevronDown className={`h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                            </button>
                            {isExpanded && examDatabase[cat].map((exam, idx) => {
                              const key = imagingOverrideKey(cat, exam.name);
                              const ov = overrides.imaging[key] ?? {};
                              return (
                                <ImagingRow
                                  key={`${cat}::${idx}`}
                                  category={cat}
                                  exam={exam}
                                  meta={meta}
                                  override={ov}
                                  onChange={(fields) => setImagingOverride(cat, exam.name, fields)}
                                />
                              );
                            })}
                          </div>
                        );
                      })
                  }
                </div>
              )}

              {tab === "lab" && filteredLab.map((exam) => {
                const ov = overrides.lab[exam.code] ?? {};
                const isOverridden = !!overrides.lab[exam.code];
                return (
                  <div
                    key={exam.code}
                    className={`border-b border-border/60 px-5 py-3 ${isOverridden ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}`}
                  >
                    <div className="mb-2 flex items-start gap-2">
                      <span className="mt-0.5 shrink-0 rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[10px] font-bold text-secondary-foreground">
                        {exam.code}
                      </span>
                      <span className="text-xs font-medium text-foreground leading-snug">{exam.name}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <NumInput
                        label="Particular"
                        value={ov.particular}
                        original={exam.particular}
                        onChange={(v) => setLabOverride(exam.code, { ...ov, particular: v })}
                      />
                      <NumInput
                        label="FONASA A"
                        value={ov.fonasa_a ?? undefined}
                        original={exam.fonasa_a ?? exam.particular}
                        onChange={(v) => setLabOverride(exam.code, { ...ov, fonasa_a: v })}
                      />
                      <NumInput
                        label="FONASA B/C/D"
                        value={ov.fonasa_bcd ?? undefined}
                        original={exam.fonasa_bcd ?? exam.particular}
                        onChange={(v) => setLabOverride(exam.code, { ...ov, fonasa_bcd: v })}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 border-t border-border px-5 py-3">
              <p className="text-center text-[10px] text-muted-foreground">
                Los precios modificados se guardan localmente en este dispositivo.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

function ImagingRow({
  category,
  exam,
  meta,
  override,
  onChange,
}: {
  category: ExamCategory;
  exam: { name: string; part: number; fa: number; fbcd: number };
  meta: { tint: string; short: string };
  override: ImagingOverride;
  onChange: (fields: ImagingOverride) => void;
}) {
  const isOverridden = !!(override.part || override.fa || override.fbcd);
  return (
    <div className={`border-b border-border/60 px-5 py-3 ${isOverridden ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}`}>
      <div className="mb-2 flex items-start gap-2">
        <span
          className="mt-0.5 inline-flex shrink-0 items-center rounded px-1.5 py-0.5 text-[9px] font-bold text-primary-foreground"
          style={{ backgroundColor: meta.tint }}
        >
          {meta.short}
        </span>
        <span className="text-xs font-medium leading-snug text-foreground">{exam.name}</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <NumInput
          label="Particular"
          value={override.part}
          original={exam.part}
          onChange={(v) => onChange({ ...override, part: v })}
        />
        <NumInput
          label="FONASA A"
          value={override.fa}
          original={exam.fa}
          onChange={(v) => onChange({ ...override, fa: v })}
        />
        <NumInput
          label="FONASA B/C/D"
          value={override.fbcd}
          original={exam.fbcd}
          onChange={(v) => onChange({ ...override, fbcd: v })}
        />
      </div>
    </div>
  );
}

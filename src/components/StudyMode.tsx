import { useState, useMemo } from "react";
import {
  Search, X, BookOpen, Scan, FlaskConical, ChevronDown, ChevronUp,
  GraduationCap, Stethoscope, AlertTriangle,
} from "lucide-react";
import { studyCards, searchStudyCards, type StudyCard } from "@/data/studyContent";
import { normalize } from "@/lib/format";

const CATEGORY_COLORS: Record<string, string> = {
  RM: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  TAC: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  ECO: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
  RX: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300",
  MAM: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  CONT: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
  CARD: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  Hematología: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
  Bioquímica: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  Hormonas: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300",
  Inflamación: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  Uroanálisis: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  Coagulación: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Marcadores Tumorales": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

const SECTION_ICONS: Record<string, string> = {
  "¿Para qué sirve?": "🎯",
  "Preparación y Seguridad del Paciente": "🧾",
  "Preparación Pre-analítica": "🧾",
  "Preparación y Seguridad Obligatoria": "⚠️",
  "Preparación según Examen": "🧾",
  "¿Cómo se Realiza?": "⚙️",
  "Tipos y Administración": "💉",
  "Muestra y Procesamiento": "🧪",
  "Valores de Referencia y Alertas": "📊",
  "Contraindicaciones": "🚫",
};

function renderBoldText(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
  );
}

function SectionBlock({ section }: { section: { title: string; items: string[] } }) {
  const icon = SECTION_ICONS[section.title] ?? "📋";
  const isAlert = section.title.includes("Contrain") || section.title.includes("Seguridad Obligatoria");
  return (
    <div className={`rounded-xl border p-4 ${isAlert ? "border-amber-200 bg-amber-50/50 dark:border-amber-800/60 dark:bg-amber-950/20" : "border-border bg-background"}`}>
      <h4 className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
        <span>{icon}</span>
        {section.title}
        {isAlert && <AlertTriangle className="ml-auto h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />}
      </h4>
      <ul className="space-y-1.5">
        {section.items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
            <span>{renderBoldText(item)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StudyCardItem({ card }: { card: StudyCard }) {
  const [expanded, setExpanded] = useState(false);
  const badgeColor = CATEGORY_COLORS[card.category] ?? "bg-secondary text-secondary-foreground";
  const isImaging = card.type === "imaging";

  return (
    <div className={`overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)] transition-all ${expanded ? "ring-2 ring-primary/30" : ""}`}>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-start gap-3 p-5 text-left transition hover:bg-secondary/30"
      >
        <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${isImaging ? "bg-blue-100 dark:bg-blue-900/30" : "bg-green-100 dark:bg-green-900/30"}`}>
          {isImaging
            ? <Scan className="h-4.5 w-4.5 text-blue-700 dark:text-blue-400" />
            : <FlaskConical className="h-4.5 w-4.5 text-green-700 dark:text-green-400" />
          }
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-foreground">{card.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${badgeColor}`}>
              {card.category}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            {card.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded bg-secondary/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-1 shrink-0 text-muted-foreground">
          {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-border px-5 pb-5 pt-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {card.sections.map((section, i) => (
              <div key={i} className={section.items.length > 3 ? "sm:col-span-2" : ""}>
                <SectionBlock section={section} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const FILTER_TABS = [
  { id: "all", label: "Todos", count: studyCards.length },
  { id: "imaging", label: "Imagenología", count: studyCards.filter((c) => c.type === "imaging").length },
  { id: "lab", label: "Laboratorio", count: studyCards.filter((c) => c.type === "lab").length },
];

export function StudyMode() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "imaging" | "lab">("all");

  const filtered = useMemo(() => {
    let cards = query.trim().length >= 2 ? searchStudyCards(query) : studyCards;
    if (typeFilter !== "all") cards = cards.filter((c) => c.type === typeFilter);
    return cards;
  }, [query, typeFilter]);

  const imagingCategories = [...new Set(studyCards.filter((c) => c.type === "imaging").map((c) => c.category))];
  const labCategories = [...new Set(studyCards.filter((c) => c.type === "lab").map((c) => c.category))];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 rounded-2xl border bg-gradient-to-br from-primary/5 to-primary/10 p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">Capacitación Interna · DiagnoPRO Temuco</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Fichas técnicas educativas para personal técnico y administrativo.
            </p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Scan className="h-3.5 w-3.5 text-blue-500" /> {studyCards.filter((c) => c.type === "imaging").length} exámenes de imagenología</span>
              <span className="flex items-center gap-1.5"><FlaskConical className="h-3.5 w-3.5 text-green-500" /> {studyCards.filter((c) => c.type === "lab").length} exámenes de laboratorio</span>
              <span className="flex items-center gap-1.5"><BookOpen className="h-3.5 w-3.5 text-primary" /> {studyCards.length} fichas totales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search + filters */}
      <div className="mb-5 space-y-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar examen, técnica, preparación, patología…"
            className="w-full rounded-xl border border-input bg-background py-3 pl-10 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/30"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {FILTER_TABS.map((f) => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id as typeof typeFilter)}
              className={`flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-[11px] font-semibold transition-all ${
                typeFilter === f.id
                  ? "border-transparent bg-gradient-brand text-primary-foreground shadow-[var(--shadow-lift)]"
                  : "border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              {f.id === "imaging" && <Scan className="h-3.5 w-3.5" />}
              {f.id === "lab" && <FlaskConical className="h-3.5 w-3.5" />}
              {f.id === "all" && <Stethoscope className="h-3.5 w-3.5" />}
              {f.label}
              <span className="rounded-full bg-current/20 px-1.5 py-0.5 text-[9px] opacity-80">{f.count}</span>
            </button>
          ))}
        </div>

        {/* Category legend */}
        {typeFilter !== "lab" && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] text-muted-foreground self-center">Imagen:</span>
            {imagingCategories.map((cat) => (
              <span key={cat} className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${CATEGORY_COLORS[cat] ?? "bg-secondary text-secondary-foreground"}`}>{cat}</span>
            ))}
          </div>
        )}
        {typeFilter !== "imaging" && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] text-muted-foreground self-center">Lab:</span>
            {labCategories.map((cat) => (
              <span key={cat} className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${CATEGORY_COLORS[cat] ?? "bg-secondary text-secondary-foreground"}`}>{cat}</span>
            ))}
          </div>
        )}
      </div>

      {/* Results count */}
      <p className="mb-3 text-xs text-muted-foreground">
        {query.trim().length >= 2
          ? `${filtered.length} resultado(s) para "${query}"`
          : `${filtered.length} ficha(s) disponible(s)`}
      </p>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20 text-center text-muted-foreground">
          <BookOpen className="h-10 w-10 opacity-30" />
          <p className="text-sm">No se encontraron fichas para tu búsqueda.</p>
          <button onClick={() => setQuery("")} className="text-xs text-primary hover:underline">Limpiar búsqueda</button>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((card) => (
            <StudyCardItem key={card.id} card={card} />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-[10px] text-muted-foreground">
        Uso exclusivo del equipo DiagnoPRO Temuco · Material educativo interno · No reemplaza protocolos clínicos oficiales.
      </p>
    </div>
  );
}

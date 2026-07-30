import { useState, useEffect, useRef } from "react";

// ── Theme definitions ──────────────────────────────────────────────────────────

export type Theme = {
  id: string;
  label: string;
  gradient: string;     // --gradient-brand
  primary: string;      // --primary / --ring / --brand
  soft: string;         // --gradient-soft (page background)
  shadow: string;       // --shadow-card hue
};

export const THEMES: Theme[] = [
  {
    id: "blue",
    label: "Azul",
    gradient: "linear-gradient(135deg, oklch(0.5 0.16 250), oklch(0.62 0.14 210))",
    primary: "oklch(0.55 0.16 245)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 220), oklch(0.96 0.018 215))",
    shadow: "250",
  },
  {
    id: "indigo",
    label: "Índigo",
    gradient: "linear-gradient(135deg, oklch(0.46 0.2 275), oklch(0.6 0.17 265))",
    primary: "oklch(0.5 0.2 272)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 275), oklch(0.96 0.018 270))",
    shadow: "275",
  },
  {
    id: "purple",
    label: "Morado",
    gradient: "linear-gradient(135deg, oklch(0.48 0.22 305), oklch(0.62 0.18 288))",
    primary: "oklch(0.52 0.22 302)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 300), oklch(0.96 0.018 295))",
    shadow: "305",
  },
  {
    id: "pink",
    label: "Rosado",
    gradient: "linear-gradient(135deg, oklch(0.56 0.22 348), oklch(0.7 0.18 340))",
    primary: "oklch(0.58 0.22 348)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 350), oklch(0.97 0.015 340))",
    shadow: "348",
  },
  {
    id: "red",
    label: "Rojo",
    gradient: "linear-gradient(135deg, oklch(0.52 0.22 27), oklch(0.65 0.2 15))",
    primary: "oklch(0.55 0.22 25)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 20), oklch(0.97 0.015 15))",
    shadow: "20",
  },
  {
    id: "orange",
    label: "Naranja",
    gradient: "linear-gradient(135deg, oklch(0.6 0.2 45), oklch(0.74 0.17 65))",
    primary: "oklch(0.63 0.2 48)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 60), oklch(0.97 0.015 55))",
    shadow: "50",
  },
  {
    id: "amber",
    label: "Dorado",
    gradient: "linear-gradient(135deg, oklch(0.68 0.18 82), oklch(0.8 0.16 96))",
    primary: "oklch(0.7 0.18 85)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 88), oklch(0.97 0.015 92))",
    shadow: "85",
  },
  {
    id: "green",
    label: "Verde",
    gradient: "linear-gradient(135deg, oklch(0.5 0.17 150), oklch(0.65 0.15 162))",
    primary: "oklch(0.54 0.17 150)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 155), oklch(0.96 0.018 150))",
    shadow: "150",
  },
  {
    id: "teal",
    label: "Cian",
    gradient: "linear-gradient(135deg, oklch(0.52 0.16 195), oklch(0.67 0.14 205))",
    primary: "oklch(0.56 0.16 195)",
    soft: "linear-gradient(180deg, oklch(0.985 0.01 198), oklch(0.96 0.018 205))",
    shadow: "195",
  },
];

const STORAGE_KEY = "diagnopro-theme";

export function applyTheme(theme: Theme) {
  const r = document.documentElement;
  r.style.setProperty("--gradient-brand", theme.gradient);
  r.style.setProperty("--gradient-soft", theme.soft);
  r.style.setProperty("--primary", theme.primary);
  r.style.setProperty("--ring", theme.primary);
  r.style.setProperty("--brand", theme.primary);
  r.style.setProperty(
    "--shadow-card",
    `0 1px 2px oklch(0.5 0.05 ${theme.shadow} / 0.06), 0 8px 24px -12px oklch(0.4 0.08 ${theme.shadow} / 0.18)`
  );
  r.style.setProperty(
    "--shadow-lift",
    `0 20px 50px -24px oklch(0.4 0.1 ${theme.shadow} / 0.4)`
  );
}

export function loadSavedTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const found = THEMES.find((t) => t.id === saved);
      if (found) return found;
    }
  } catch {}
  return THEMES[0];
}

// ── Component ──────────────────────────────────────────────────────────────────

export function ThemePicker() {
  const [active, setActive] = useState<Theme>(THEMES[0]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Load saved theme on mount
  useEffect(() => {
    const saved = loadSavedTheme();
    setActive(saved);
    applyTheme(saved);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const select = (theme: Theme) => {
    setActive(theme);
    applyTheme(theme);
    try { localStorage.setItem(STORAGE_KEY, theme.id); } catch {}
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger — colored circle */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Cambiar color del tema"
        className="h-8 w-8 rounded-full shadow-[var(--shadow-lift)] ring-2 ring-white/60 transition-transform hover:scale-110 focus:outline-none"
        style={{ background: active.gradient }}
        aria-label="Selector de color"
      />

      {/* Popover */}
      {open && (
        <div className="absolute right-0 top-10 z-50 w-56 rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
          <p className="mb-2.5 px-0.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Color del tema
          </p>
          <div className="grid grid-cols-3 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => select(t)}
                className={`group flex flex-col items-center gap-1.5 rounded-xl p-1.5 transition-all hover:bg-secondary ${
                  active.id === t.id ? "bg-secondary" : ""
                }`}
                title={t.label}
              >
                <span
                  className={`h-8 w-8 rounded-full shadow-sm ring-2 transition-all ${
                    active.id === t.id
                      ? "ring-foreground/30 scale-110"
                      : "ring-transparent group-hover:ring-foreground/15"
                  }`}
                  style={{ background: t.gradient }}
                />
                <span className="text-[10px] font-medium text-muted-foreground leading-none">
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

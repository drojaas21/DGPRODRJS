import { useMemo, useState } from "react";
import { Wallet, RotateCcw, Banknote, Coins } from "lucide-react";
import { formatCLP, sanitizeNumber } from "@/lib/format";
import b20000 from "@/assets/money/20000-anverso.jpg";
import b10000 from "@/assets/money/10000-anverso.jpg";
import b5000 from "@/assets/money/5000-anverso.jpg";
import b1000 from "@/assets/money/1000-anverso.jpg";
import c500 from "@/assets/money/500-reverso.png";
import c100 from "@/assets/money/100-pesos-reverso.png";
import c50 from "@/assets/money/50-reverso.png";
import c10 from "@/assets/money/10-reverso.png";

const bills = [
  { value: 20000, label: "$20.000", img: b20000 },
  { value: 10000, label: "$10.000", img: b10000 },
  { value: 5000, label: "$5.000", img: b5000 },
  { value: 1000, label: "$1.000", img: b1000 },
];
const coins = [
  { value: 500, label: "$500", img: c500 },
  { value: 100, label: "$100", img: c100 },
  { value: 50, label: "$50", img: c50 },
  { value: 10, label: "$10", img: c10 },
];
const denominations = [...bills, ...coins];

export function CashRegister() {
  const [cobrar, setCobrar] = useState("");
  const [recibido, setRecibido] = useState("");

  const result = useMemo(() => {
    const cobrarN = parseInt(sanitizeNumber(cobrar)) || 0;
    const recibidoN = parseInt(sanitizeNumber(recibido)) || 0;
    if (cobrarN <= 0 || recibidoN <= 0) return null;
    const vuelto = recibidoN - cobrarN;
    if (vuelto < 0) return { error: `Faltan ${formatCLP(Math.abs(vuelto))}`, vuelto, breakdown: [] };
    let rem = vuelto;
    const breakdown: { label: string; img: string; count: number }[] = [];
    for (const d of denominations) {
      if (rem >= d.value) {
        const count = Math.floor(rem / d.value);
        rem -= count * d.value;
        breakdown.push({ label: d.label, img: d.img, count });
      }
    }
    return { error: null, vuelto, breakdown };
  }, [cobrar, recibido]);

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      {/* CALCULATOR */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2.5 bg-gradient-green px-6 py-4 text-white">
          <Wallet className="h-5 w-5" />
          <h3 className="text-base font-bold">Calculadora de vuelto en efectivo</h3>
        </div>

        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-foreground">Monto a cobrar ($)</span>
              <input inputMode="numeric" value={cobrar} onChange={(e) => setCobrar(e.target.value)} placeholder="Ej: 45.300"
                className="w-full rounded-xl border border-input bg-background px-3 py-3 text-lg font-semibold outline-none transition focus:border-[color:oklch(0.55_0.13_155)] focus:ring-2 focus:ring-[color:oklch(0.55_0.13_155)]/25" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-foreground">Monto recibido ($)</span>
              <input inputMode="numeric" value={recibido} onChange={(e) => setRecibido(e.target.value)} placeholder="Ej: 50.000"
                className="w-full rounded-xl border border-input bg-background px-3 py-3 text-lg font-semibold outline-none transition focus:border-[color:oklch(0.55_0.13_155)] focus:ring-2 focus:ring-[color:oklch(0.55_0.13_155)]/25" />
            </label>
          </div>

          <button onClick={() => { setCobrar(""); setRecibido(""); }}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground">
            <RotateCcw className="h-3.5 w-3.5" /> Limpiar
          </button>

          {result && (
            <div className="mt-5">
              <div className={`rounded-xl px-5 py-4 ${result.error ? "bg-destructive/10" : "bg-gradient-green"}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${result.error ? "text-destructive" : "text-white/90"}`}>
                    {result.error ? "Monto insuficiente" : "Vuelto a entregar"}
                  </span>
                  <span className={`text-3xl font-bold tracking-tight ${result.error ? "text-destructive" : "text-white"}`}>
                    {result.error ? result.error : formatCLP(result.vuelto)}
                  </span>
                </div>
              </div>

              {!result.error && result.vuelto > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Desglose sugerido del vuelto</p>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                    {result.breakdown.map((b) => (
                      <div key={b.label} className="flex items-center gap-3 rounded-xl border border-border bg-background p-2.5">
                        <img src={b.img} alt={b.label} className="h-9 w-14 rounded object-cover shadow-sm" />
                        <div>
                          <p className="text-sm font-bold text-foreground">{b.count}×</p>
                          <p className="text-xs text-muted-foreground">{b.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {!result.error && result.vuelto === 0 && (
                <p className="mt-4 text-center text-sm text-muted-foreground">Pago exacto, no se requiere vuelto.</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* REFERENCE */}
      <div className="overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)]">
        <div className="flex items-center gap-2.5 bg-gradient-green px-6 py-4 text-white">
          <Coins className="h-5 w-5" />
          <h3 className="text-base font-bold">Referencia de dinero chileno</h3>
        </div>
        <div className="space-y-5 p-6">
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Banknote className="h-3.5 w-3.5" /> Billetes
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {bills.map((b) => (
                <div key={b.label} className="flex flex-col items-center gap-2">
                  <img src={b.img} alt={b.label} className="h-16 w-28 rounded-md object-cover shadow-md ring-1 ring-border" />
                  <span className="text-sm font-bold text-cash">{b.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              <Coins className="h-3.5 w-3.5" /> Monedas
            </p>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {coins.map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2">
                  <img src={c.img} alt={c.label} className="h-16 w-16 rounded-full object-cover shadow-md ring-1 ring-border" />
                  <span className="text-sm font-bold text-cash">{c.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

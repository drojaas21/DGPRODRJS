import { useState, useCallback } from "react";

const STORAGE_KEY = "diagno_price_overrides_v1";

export type ImagingOverride = { part?: number; fa?: number; fbcd?: number };
export type LabOverride = { particular?: number; fonasa_a?: number | null; fonasa_bcd?: number | null };

export type AllOverrides = {
  imaging: Record<string, ImagingOverride>;
  lab: Record<string, LabOverride>;
};

function load(): AllOverrides {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { imaging: {}, lab: {} };
}

function persist(data: AllOverrides) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}

export function imagingOverrideKey(category: string, name: string): string {
  return `${category}::${name}`;
}

export function usePriceOverrides() {
  const [overrides, setOverrides] = useState<AllOverrides>(load);

  const setImagingOverride = useCallback((category: string, name: string, fields: ImagingOverride) => {
    setOverrides(prev => {
      const key = imagingOverrideKey(category, name);
      const current = prev.imaging[key] ?? {};
      const merged: ImagingOverride = { ...current };
      if (fields.part !== undefined) merged.part = fields.part || undefined;
      if (fields.fa !== undefined) merged.fa = fields.fa || undefined;
      if (fields.fbcd !== undefined) merged.fbcd = fields.fbcd || undefined;
      const hasAny = merged.part || merged.fa || merged.fbcd;
      const nextImaging = { ...prev.imaging };
      if (hasAny) nextImaging[key] = merged; else delete nextImaging[key];
      const next = { ...prev, imaging: nextImaging };
      persist(next);
      return next;
    });
  }, []);

  const setLabOverride = useCallback((code: string, fields: LabOverride) => {
    setOverrides(prev => {
      const current = prev.lab[code] ?? {};
      const merged: LabOverride = { ...current };
      if (fields.particular !== undefined) merged.particular = fields.particular || undefined;
      if (fields.fonasa_a !== undefined) merged.fonasa_a = fields.fonasa_a || undefined;
      if (fields.fonasa_bcd !== undefined) merged.fonasa_bcd = fields.fonasa_bcd || undefined;
      const hasAny = merged.particular || merged.fonasa_a || merged.fonasa_bcd;
      const nextLab = { ...prev.lab };
      if (hasAny) nextLab[code] = merged; else delete nextLab[code];
      const next = { ...prev, lab: nextLab };
      persist(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    const empty: AllOverrides = { imaging: {}, lab: {} };
    setOverrides(empty);
    persist(empty);
  }, []);

  return { overrides, setImagingOverride, setLabOverride, clearAll };
}

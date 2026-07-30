export const formatCLP = (n: number) =>
  "$" + Math.round(n || 0).toLocaleString("es-CL");

export const sanitizeNumber = (value: string) =>
  (value || "").replace(/[^0-9]/g, "");

export const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

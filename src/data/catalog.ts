import examsJson from "./exams.json";
import discountsJson from "./discounts.json";
import labJson from "./lab.json";

export type Exam = {
  name: string;
  desc: string;
  part: number;
  fa: number;
  fbcd: number;
  particular?: boolean;
  autoContrast?: boolean;
  note?: string;
};

export type ExamCategory =
  | "resonancia"
  | "tac"
  | "ecografia"
  | "radiografia"
  | "mamografia"
  | "contraste"
  | "cardiologia";

export type Convenio = "particular" | "banco" | "caja" | "araucana";

export type LabExam = {
  code: string;
  name: string;
  fonasa_bcd: number | null;
  fonasa_a: number | null;
  particular: number;
  obs: string;
  prep?: "orina_manana" | "orina_24h" | "psa";
  turnaround?: "same_day" | "24h" | "2_5d" | "5_15d";
  fasting?: true;
};

export const examDatabase = examsJson as Record<ExamCategory, Exam[]>;
export const discountMatrix = discountsJson as Record<
  ExamCategory,
  Record<Convenio, number>
>;
export const labDatabase = labJson as LabExam[];

export const categoryMeta: Record<
  ExamCategory,
  { label: string; short: string; icon: string; tint: string }
> = {
  resonancia: { label: "Resonancia Magnética", short: "RM", icon: "Brain", tint: "var(--chart-1)" },
  tac: { label: "TAC Scanner", short: "TAC", icon: "ScanLine", tint: "var(--chart-4)" },
  ecografia: { label: "Ecografía", short: "ECO", icon: "Waves", tint: "var(--chart-2)" },
  radiografia: { label: "Radiografía", short: "RX", icon: "Bone", tint: "var(--chart-5)" },
  mamografia: { label: "Mamografía", short: "MAM", icon: "HeartPulse", tint: "var(--chart-3)" },
  contraste: { label: "Medio de Contraste", short: "CONT", icon: "Droplets", tint: "var(--chart-1)" },
  cardiologia: { label: "Cardiología", short: "CARD", icon: "Activity", tint: "var(--chart-5)" },
};

export const convenioMeta: Record<Convenio, string> = {
  particular: "Particular / Sin Convenio",
  banco: "Banco de Chile",
  caja: "Caja Los Andes",
  araucana: "C.C.A.F. La Araucana",
};

export const categoryOrder: ExamCategory[] = [
  "resonancia",
  "tac",
  "ecografia",
  "radiografia",
  "mamografia",
  "contraste",
  "cardiologia",
];

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

const PARTICULAR_RATE = 1.15;

function normalizeParticularPrice(particular: number, fonasaA: number | null | undefined): number {
  if (!particular || !fonasaA) return particular;

  const calculated = fonasaA * PARTICULAR_RATE;
  const lower = Math.floor(calculated);
  const isHalfPeso = Math.abs(calculated - (lower + 0.5)) < 0.000001;

  // Algunas planillas guardan el cálculo de 115% como n.499999999 y luego
  // lo convierten a entero hacia abajo. Solo corregimos ese caso: los
  // precios particulares digitados manualmente permanecen intactos.
  return isHalfPeso && particular === lower ? particular + 1 : particular;
}

export const examDatabase = Object.fromEntries(
  Object.entries(examsJson as Record<ExamCategory, Exam[]>).map(([category, exams]) => [
    category,
    exams.map((exam) => ({
      ...exam,
      part: normalizeParticularPrice(exam.part, exam.fa),
    })),
  ])
) as Record<ExamCategory, Exam[]>;
export const discountMatrix = discountsJson as Record<
  ExamCategory,
  Record<Convenio, number>
>;
export const labDatabase = (labJson as LabExam[]).map((exam) =>
  {
    const normalizedExam = {
      ...exam,
      particular: normalizeParticularPrice(exam.particular, exam.fonasa_a),
    };
    return exam.code === "0301014" && !/test de coombs/i.test(exam.name)
      ? { ...normalizedExam, name: `${exam.name} / Test de Coombs` }
      : normalizedExam;
  }
);

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

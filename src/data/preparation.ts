export type PreparationNote = {
  title: string;
  text: string;
};

export const scheduleInfo = {
  weekdays: "Lunes a viernes: 08:00 – 10:30 hrs",
  saturday: "Sábados: 09:00 – 10:30 hrs",
};

export const preparationNotes: PreparationNote[] = [
  {
    title: "Ayuno",
    text: "El paciente debe venir con un mínimo de 8 horas de ayuno y máximo de 12 horas. Para no exceder el ayuno, se recomienda una última colación a las 23:00 hrs del día anterior.",
  },
  {
    title: "Examen de orina",
    text: "Recolectar la primera orina de la mañana (segundo chorro). Una vez recolectada, no deben pasar más de 2 horas para su ingreso al laboratorio.",
  },
  {
    title: "Antígeno Prostático (PSA)",
    text: "El paciente debe tener abstinencia sexual de 48 horas antes del examen.",
  },
  {
    title: "Identificación y orden médica",
    text: "El paciente debe traer su cédula de identidad y su orden médica.",
  },
];

export const bloodSampleNote =
  "Nota: La toma de muestra venosa en adultos (cód. 0307011) tiene un valor de $1.180 FONASA · $1.357 Particular y se añade automáticamente al cotizar.";

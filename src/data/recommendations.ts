import type { ExamCategory } from "@/data/catalog";

/** Recomendaciones automáticas por tipo de examen, mostradas como recordatorio
 *  al paciente y precargadas en la cotización PDF. */
export const categoryRecommendations: Record<ExamCategory, string[]> = {
  resonancia: [
    "Retirar todo objeto metálico (joyas, prótesis removibles, audífonos).",
    "Informar si tiene marcapasos, clips quirúrgicos o implantes metálicos.",
    "Con contraste: paciente mayor de 60 años requiere creatinina previa.",
    "Diabético con metformina: suspender 2 días antes si lleva contraste.",
  ],
  tac: [
    "Con contraste / AngioTAC: ayuno de 4 a 6 horas (puede tomar agua y medicamentos).",
    "Creatinina previa si es mayor de 60 años o con factores de riesgo renal.",
    "Informar alergias a yodo o medios de contraste.",
  ],
  ecografia: [
    "Abdominal: ayuno de 6 horas.",
    "Pélvica / vesical: acudir con la vejiga llena (tomar líquidos 1 hora antes).",
    "Renal: tomar abundante líquido y no orinar antes del examen.",
  ],
  radiografia: [
    "Retirar objetos metálicos de la zona a examinar.",
    "Informar si existe posibilidad de embarazo.",
    "No requiere ayuno.",
  ],
  mamografia: [
    "No aplicar desodorante, talco ni cremas en axilas el día del examen.",
    "Realizar idealmente entre el día 7 y 14 del ciclo menstrual.",
    "Traer mamografías anteriores si las tiene para comparación.",
  ],
  contraste: [
    "Ayuno de 4 a 6 horas.",
    "Creatinina vigente si es mayor de 60 años.",
    "Informar alergias previas a medios de contraste.",
    "Diabéticos con metformina: suspender según indicación médica.",
  ],
  cardiologia: [
    "ECG: no requiere ayuno ni preparación especial.",
    "Holter de ritmo / presión: acudir con ropa cómoda; evitar cremas en el tórax.",
    "Informar los medicamentos en uso al momento del examen.",
  ],
};

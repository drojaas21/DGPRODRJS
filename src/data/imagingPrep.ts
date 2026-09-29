import type { ExamCategory } from "./catalog";

export type PrepEntry = {
  steps: string[];
  postProtocol?: string;
};

const ARRIVAL = "Llegar 20 minutos antes de su hora.";
const ID_ORDER = "Traer cédula de identidad y orden médica.";
const NO_SMOKE = "No fumar ni mascar chicle previo al examen.";
const WATER_PELVIS =
  "Beber 1.5 litros de agua paulatinamente desde 1 hora antes y retener la orina hasta el examen.";
const FAST_6H = "Ayuno total de 6 horas (sólidos y líquidos).";
const ECO_FAST_6H_SOLIDS = "Ayuno de 6 horas solo de sólidos.";
const FAST_4H = "Ayuno total de 4 horas (sólidos y líquidos).";
export const POST_CONTRAST =
  "Post-contraste: Beber ≈2 litros de agua diarios durante 2–3 días. Si usa Metformina, suspénderla 2 días después del examen. Consulte de inmediato ante dificultad respiratoria, hinchazón facial o urticaria.";
const CONTRAST_NOTE =
  "Requiere medio de contraste endovenoso. Ayuno mínimo 6 horas (sólidos y líquidos).";

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function getImagingPrep(examName: string, category: ExamCategory): PrepEntry {
  const n = norm(examName);

  if (category === "resonancia") {
    const withContrast = n.includes("contraste") || n.includes("gadolinio");
    return {
      steps: [
        ARRIVAL,
        ID_ORDER,
        ...(withContrast
          ? ["Con contraste (gadolinio): ayuno de 4 a 6 horas previo al examen."]
          : []),
      ],
    };
  }

  if (category === "tac") {
    if (isPieloTAC(examName)) {
      return { steps: [ARRIVAL, ID_ORDER, WATER_PELVIS] };
    }
    if (n.includes("abdom") || n.includes("pelv")) {
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, WATER_PELVIS, NO_SMOKE], postProtocol: POST_CONTRAST };
    }
    return { steps: [ARRIVAL, ID_ORDER, NO_SMOKE], postProtocol: POST_CONTRAST };
  }

  if (category === "contraste") {
    return { steps: [ARRIVAL, ID_ORDER], postProtocol: POST_CONTRAST };
  }

  if (category === "ecografia") {
    if (n.includes("mama") || n.includes("mamaria")) {
      return {
        steps: [
          ARRIVAL,
          ID_ORDER,
          "Pacientes mayores de 40 años: traer mamografía reciente (máximo 6 meses de antigüedad).",
          "Higiene local previa. Sin desodorante en barra, cremas ni talco en la zona.",
        ],
      };
    }
    if (
      (n.includes("renal") || n.includes("rinon")) &&
      (n.includes("vesical") || n.includes("vejiga"))
    ) {
      return { steps: [ARRIVAL, ID_ORDER, ECO_FAST_6H_SOLIDS, WATER_PELVIS, NO_SMOKE] };
    }
    if (n.includes("renal") || n.includes("rinon")) {
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, NO_SMOKE] };
    }
    if (n.includes("abdom") && (n.includes("pelv") || n.includes("pelvian"))) {
      return { steps: [ARRIVAL, ID_ORDER, ECO_FAST_6H_SOLIDS, WATER_PELVIS, NO_SMOKE] };
    }
    if (n.includes("abdom")) {
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, NO_SMOKE] };
    }
    if (n.includes("pelv")) {
      return { steps: [ARRIVAL, ID_ORDER, WATER_PELVIS, NO_SMOKE] };
    }
    return { steps: [ARRIVAL, ID_ORDER] };
  }

  if (category === "mamografia") {
    return {
      steps: [
        ARRIVAL,
        ID_ORDER,
        "Sin desodorante en barra, cremas ni talco en zona mamaria o axilas.",
        "Traer estudios anteriores si los tiene (para comparación).",
      ],
    };
  }

  return { steps: [ARRIVAL, ID_ORDER] };
}

export function isPieloTAC(examName: string): boolean {
  const n = norm(examName);
  return n.includes("pielograf") && n.includes("tac");
}

export function needsCreatinineAlert(category: ExamCategory): boolean {
  return category === "contraste" || category === "tac";
}

export function needsRMSafetyAlert(category: ExamCategory): boolean {
  return category === "resonancia";
}

export function itemHasContrast(examName: string, category: ExamCategory, autoContrast?: boolean): boolean {
  if (category === "contraste") return true;
  if (isPieloTAC(examName)) return false;
  const n = norm(examName);
  return !!autoContrast || n.includes("contraste") || n.includes("gadolinio");
}

export function getImagingPrepNote(examName: string, category: ExamCategory, withContrast?: boolean): string | null {
  const n = norm(examName);

  if (category === "radiografia") return null;

  if (category === "resonancia") {
    const parts: string[] = [];
    if (n.includes("colangior")) {
      parts.push("Ayuno de sólidos y líquidos mínimo 8 horas.");
    } else if (withContrast) {
      parts.push(CONTRAST_NOTE);
    } else if (n.includes("abdom") || n.includes("pelv") || n.includes("prostat")) {
      parts.push("Ayuno de sólidos y líquidos 4 h.");
    }
    if (n.includes("corazon") || n.includes("cardiaca") || n.includes("cardiac")) {
      parts.push("Evitar cafeína 24 h antes.");
    }
    return parts.join(" ");
  }

  if (category === "tac") {
    if (isPieloTAC(examName)) {
      return "Beber 1,5 L de agua desde 1 h antes. Retener la orina.";
    }
    if (n.includes("abdom") || n.includes("pelv")) {
      return "Ayuno de sólidos y líquidos 6 h. Beber 1,5 L de agua desde 1 h antes. Retener la orina.";
    }
    if (n.includes("urograf") || n.includes("urotac")) {
      return "Beber 1,5 L de agua desde 1 h antes. Retener la orina.";
    }
    return null;
  }

  if (category === "contraste") {
    return CONTRAST_NOTE;
  }

  if (category === "ecografia") {
    if (n.includes("mama") || n.includes("mamaria")) {
      return "Sin desodorante, cremas ni talco. Mayores de 40 años: traer mamografía reciente (<6 meses).";
    }
    if (n.includes("abdom") && (n.includes("pelv") || n.includes("pelvian"))) {
      return "Ayuno de sólidos 6 h. Beber 1,5 L de agua desde 1 h antes. No orinar.";
    }
    if (n.includes("abdom")) {
      return "Ayuno de sólidos y líquidos 6 h.";
    }
    if ((n.includes("renal") || n.includes("rinon")) && (n.includes("vesical") || n.includes("vejiga"))) {
      return "Ayuno de sólidos 6 h. Beber 1,5 L de agua desde 1 h antes. No orinar.";
    }
    if (n.includes("renal") || n.includes("rinon")) {
      return "Ayuno de sólidos y líquidos 6 h.";
    }
    if (n.includes("pelv")) {
      return "Beber 1,5 L de agua desde 1 h antes. No orinar.";
    }
    if (n.includes("elastograf")) {
      return "Ayuno de sólidos y líquidos 2–3 h.";
    }
    return null;
  }

  if (category === "mamografia") {
    return "Sin desodorante, cremas ni talco. Traer estudios anteriores si los tiene.";
  }

  if (category === "cardiologia") {
    if (n.includes("holter") && (n.includes("ritmo") || n.includes("ecg") || n.includes("24"))) {
      return "Ducharse la noche anterior. Usar ropa cómoda y sin cremalleras metálicas.";
    }
    if (n.includes("holter") || n.includes("mapa") || n.includes("presion")) {
      return "Usar ropa cómoda y manga holgada. Mantener actividad normal durante el registro.";
    }
    return null;
  }

  return null;
}

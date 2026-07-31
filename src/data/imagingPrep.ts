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
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, WATER_PELVIS, NO_SMOKE] };
    }
    if (n.includes("renal") || n.includes("rinon")) {
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, NO_SMOKE] };
    }
    if (n.includes("abdom") && (n.includes("pelv") || n.includes("pelvian"))) {
      return { steps: [ARRIVAL, ID_ORDER, FAST_6H, WATER_PELVIS, NO_SMOKE] };
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

export function needsCreatinineAlert(category: ExamCategory): boolean {
  return category === "contraste" || category === "tac";
}

export function needsRMSafetyAlert(category: ExamCategory): boolean {
  return category === "resonancia";
}

export function itemHasContrast(examName: string, category: ExamCategory, autoContrast?: boolean): boolean {
  if (category === "contraste") return true;
  const n = norm(examName);
  return !!autoContrast || n.includes("contraste") || n.includes("gadolinio");
}

export function getImagingPrepNote(examName: string, category: ExamCategory, withContrast?: boolean): string | null {
  const n = norm(examName);

  if (category === "radiografia") {
    return "Retirar objetos metálicos de la zona a examinar (aros, collares, cinturones, monedas, etc.).";
  }

  if (category === "resonancia") {
    const parts: string[] = [];
    if (withContrast) {
      parts.push(CONTRAST_NOTE);
    } else if (n.includes("colangior")) {
      parts.push("Ayuno de 6 horas (sólidos y líquidos).");
    } else if (n.includes("abdom") || n.includes("pelv") || n.includes("prostat")) {
      parts.push("Ayuno mínimo 4 horas (sólidos y líquidos).");
    }
    if (n.includes("corazon") || n.includes("cardiaca") || n.includes("cardiac")) {
      parts.push("Evitar cafeína (café, té, bebidas cola) las 24 horas previas.");
    }
    return parts.join(" ");
  }

  if (category === "tac") {
    if (!withContrast) return null;
    const parts: string[] = [CONTRAST_NOTE];
    const needsWater =
      n.includes("abdom") || n.includes("pelv") ||
      n.includes("pielog") || n.includes("urograf") || n.includes("urotac");
    if (needsWater) {
      parts.push("Beber 1.5 litros de agua paulatinamente desde 1 hora antes; retener la orina hasta completar el examen.");
    }
    return parts.join(" ");
  }

  if (category === "contraste") {
    return CONTRAST_NOTE;
  }

  if (category === "ecografia") {
    if (n.includes("mama") || n.includes("mamaria")) {
      return "Sin desodorante, cremas ni talco en zona mamaria o axilas. Pacientes mayores de 40 años: traer mamografía reciente (máximo 6 meses).";
    }
    if (n.includes("abdom") && (n.includes("pelv") || n.includes("pelvian"))) {
      return "Ayuno 6–8 horas. Vejiga llena: beber 1.5 L de agua 1 hora antes, no orinar hasta el examen.";
    }
    if (n.includes("abdom")) {
      return "Ayuno 6–8 horas (sólidos y líquidos).";
    }
    if ((n.includes("renal") || n.includes("rinon")) && (n.includes("vesical") || n.includes("vejiga"))) {
      return "Ayuno 6 horas. Vejiga llena: beber 1.5 L de agua 1 hora antes, no orinar.";
    }
    if (n.includes("renal") || n.includes("rinon")) {
      return "Ayuno mínimo 6 horas (sólidos y líquidos).";
    }
    if (n.includes("pelv")) {
      return "Vejiga llena: beber 1.5 L de agua paulatinamente 1 hora antes, no orinar.";
    }
    if (n.includes("elastograf")) {
      return "Ayuno mínimo 2–3 horas (sólidos y líquidos).";
    }
    return null;
  }

  if (category === "mamografia") {
    return "Sin desodorante, cremas ni talco en zona mamaria o axilas. Traer estudios anteriores si los tiene.";
  }

  if (category === "cardiologia") {
    if (n.includes("holter") && (n.includes("ritmo") || n.includes("ecg") || n.includes("24"))) {
      return "Ducharse la noche anterior (no podrá durante las 24 h del monitoreo). Usar ropa cómoda, sin cremalleras metálicas.";
    }
    if (n.includes("holter") || n.includes("mapa") || n.includes("presion")) {
      return "Ropa cómoda con manga holgada en el brazo no dominante. Actividad normal durante el registro.";
    }
    return null;
  }

  return null;
}

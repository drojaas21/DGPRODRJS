/**
 * Indicaciones habituales de uso de medio de contraste SEGÚN DIAGNÓSTICO,
 * para exámenes de RM y TAC que en la orden médica suelen solicitarse sin
 * contraste, pero que por sospecha clínica se realizan habitualmente con él.
 *
 * Referencias: ACR Appropriateness Criteria (American College of Radiology),
 * guías ESUR (European Society of Urogenital Radiology) y recomendaciones
 * RSNA. Material de apoyo interno — la decisión final de administrar
 * contraste corresponde siempre al radiólogo.
 */

export const contrastByDiagnosis: Record<string, string[]> = {
  // ── Resonancia Magnética ──────────────────────────────────────────────
  "Resonancia Magnética Cráneo Encefálica": [
    "Sospecha de tumor cerebral primario o metástasis",
    "Esclerosis múltiple (detección de lesiones activas/realce)",
    "Infección del SNC: absceso cerebral, encefalitis, meningitis",
    "Control postoperatorio de tumores (residuo vs recidiva)",
    "Parálisis facial o neuropatía craneal en estudio",
    "Carcinomatosis leptomeníngea",
  ],
  "Resonancia Magnética de Oídos (bilateral)": [
    "Sospecha de schwannoma vestibular (neurinoma del acústico)",
    "Parálisis facial periférica en estudio",
    "Otomastoiditis complicada / laberintitis",
    "Tumor glómico (paraganglioma timpánico o yugular)",
  ],
  "Resonancia Magnética de Órbitas": [
    "Tumores orbitarios o del nervio óptico",
    "Neuritis óptica (realce del nervio)",
    "Celulitis o absceso orbitario",
    "Pseudotumor inflamatorio orbitario",
    "Melanoma o lesión coroídea",
  ],
  "Resonancia Magnética Articulaciones Temporomandibulares (ATM)": [
    "Sinovitis o artritis inflamatoria activa (AR juvenil)",
    "Sospecha de tumor articular o de partes blandas",
  ],
  "Resonancia Magnética Columna Cervical": [
    "Sospecha de tumor o metástasis vertebral/medular",
    "Espondilodiscitis o absceso epidural",
    "Columna operada: fibrosis postquirúrgica vs recidiva de hernia",
    "Esclerosis múltiple con compromiso medular",
  ],
  "Resonancia Magnética Columna Dorsal": [
    "Sospecha de tumor o metástasis vertebral/medular",
    "Espondilodiscitis o absceso epidural",
    "Columna operada: fibrosis postquirúrgica vs recidiva",
    "Mielopatía en estudio (lesiones inflamatorias o tumorales)",
  ],
  "Resonancia Magnética Columna Lumbar": [
    "Columna operada: fibrosis postquirúrgica vs recidiva de hernia",
    "Espondilodiscitis o absceso epidural",
    "Sospecha de tumor o metástasis vertebral",
    "Aracnoiditis",
  ],
  "Resonancia Magnética Columna Total (Cervical, Dorsal, Lumbar)": [
    "Estadificación de metástasis vertebrales (screening óseo)",
    "Espondilodiscitis multinivel",
    "Enfermedad desmielinizante con compromiso medular",
    "Carcinomatosis leptomeníngea",
  ],
  "Resonancia Magnética de Tórax": [
    "Masas mediastínicas o de vértice pulmonar (Pancoast)",
    "Tumores de pared torácica e invasión vascular",
  ],
  "Resonancia Magnética Pared Torácica": [
    "Tumores de partes blandas de pared torácica",
    "Infección o colección de pared torácica",
  ],
  "Resonancia Magnética de Esternón": [
    "Sospecha de tumor óseo o infiltración",
    "Osteomielitis esternal (post-esternotomía)",
  ],
  "Resonancia Magnética de Costillas": [
    "Lesión ósea sospechosa de tumor o metástasis",
    "Osteomielitis costal",
  ],
  "Resonancia Magnética de Clavículas": [
    "Lesión ósea sospechosa de tumor",
    "Osteomielitis (incluida osteítis en SAPHO)",
  ],
  "Resonancia Magnética de Escápula": [
    "Tumor óseo o de partes blandas periescapulares",
    "Osteomielitis",
  ],
  "Resonancia Magnética Articulación Acromioclavicular": [
    "Sospecha de tumor o infección articular",
    "Artritis inflamatoria activa",
  ],
  "Resonancia Magnética Articulación Esternoclavicular": [
    "Artritis séptica esternoclavicular",
    "Artropatía inflamatoria (SAPHO)",
  ],
  "Resonancia Magnética de Hombro": [
    "Artro-RM con contraste intraarticular: lesión de labrum o inestabilidad",
    "Sospecha de tumor óseo o de partes blandas",
    "Artritis séptica u osteomielitis",
  ],
  "Resonancia Magnética de Rodilla": [
    "Sospecha de tumor óseo o de partes blandas",
    "Artritis séptica u osteomielitis",
    "Sinovitis vellonodular pigmentada (SVNP)",
  ],
  "Resonancia Magnética de Mano o Muñeca": [
    "Artritis reumatoide precoz (sinovitis con realce)",
    "Artritis séptica u osteomielitis",
    "Tumores de partes blandas (ganglión atípico, TCG de vaina)",
  ],
  "Resonancia Magnética de Codo": [
    "Artritis séptica u osteomielitis",
    "Tumor óseo o de partes blandas",
  ],
  "Resonancia Magnética de Antebrazo o Brazo": [
    "Masas de partes blandas (sarcoma, lipoma atípico)",
    "Osteomielitis",
  ],
  "Resonancia Magnética de Pie, Antepié o Tobillo": [
    "Pie diabético: osteomielitis vs artropatía de Charcot",
    "Tumores de partes blandas",
    "Artritis séptica",
  ],
  "Resonancia Magnética de Pierna": [
    "Masas de partes blandas (sarcoma)",
    "Osteomielitis",
  ],
  "Resonancia Magnética de Muslo o Cadera (Unilateral)": [
    "Sospecha de tumor óseo o de partes blandas",
    "Osteomielitis o artritis séptica",
    "Artro-RM con contraste intraarticular: lesión del labrum acetabular",
  ],
  "Resonancia Magnética de Glúteo": [
    "Masas de partes blandas (sarcoma, absceso)",
    "Fístulas o colecciones glúteas",
  ],
  "Resonancia Magnética Osteoarticular de Huesos Pélvicos": [
    "Tumor óseo primario o metástasis pélvicas",
    "Osteomielitis",
  ],
  "Resonancia Magnética Osteoarticular de Sacrocoxis": [
    "Tumores sacros (cordoma, metástasis)",
    "Infección sacroilíaca o sacra",
  ],
  "Resonancia Magnética de Pelvis / Defecografía": [
    "Tumores rectales o pelvianos",
    "Fístulas perianales complejas (enfermedad de Crohn)",
  ],
  "Resonancia Magnética de Órganos Pelvianos": [
    "Cáncer cérvico-uterino o de endometrio (estadificación)",
    "Miomas: mapeo pre-embolización",
    "Masas anexiales complejas",
    "Endometriosis profunda con compromiso de órganos",
  ],
  "Resonancia Magnética Genitales Internos y Gastrointestinal": [
    "Entero-RM en enfermedad de Crohn (actividad inflamatoria)",
    "Fístulas perianales o enterocutáneas",
    "Tumores ginecológicos",
  ],
  "Colangioresonancia Magnética": [
    "Sospecha de colangiocarcinoma o tumor pancreático asociado",
    "Lesión hepática focal detectada en el estudio",
    "Colangitis esclerosante en evaluación de estenosis",
  ],
  "Angiografía por Resonancia Magnética de Encéfalo": [
    "Habitualmente sin contraste (técnica TOF); con gadolinio si TOF no concluyente",
  ],
  "Angiografía por Resonancia Magnética de Cerebro": [
    "Habitualmente sin contraste (técnica TOF); con gadolinio si TOF no concluyente",
  ],
  "Angiografía por Resonancia Magnética de Cuello": [
    "Habitualmente con gadolinio: estenosis carotídea, disección vertebral/carotídea",
  ],
  "Angiografía por Resonancia Magnética de Tórax": [
    "Habitualmente con gadolinio: aneurisma o disección aórtica, coartación",
  ],
  "Angiografía por Resonancia Magnética de Abdomen": [
    "Habitualmente con gadolinio: estenosis de arteria renal, aneurisma aórtico",
  ],
  "Angiografía por Resonancia Magnética de Pelvis": [
    "Habitualmente con gadolinio: enfermedad arterial ilíaca, malformaciones vasculares",
  ],
  "Protocolo PEP (Resonancia Magnética)": [
    "Protocolo prostático abreviado (biparamétrico): habitualmente sin contraste",
    "Con gadolinio (multiparamétrico, PI-RADS): biopsia previa negativa con sospecha persistente, próstata operada o estudio biparamétrico no concluyente",
  ],

  // ── Scanner (TAC) ─────────────────────────────────────────────────────
  "TAC Cráneo Encefálica (Cerebro)": [
    "Sospecha de tumor o metástasis cerebral",
    "Absceso cerebral o empiema",
    "Sin contraste: ACV agudo, TEC, hemorragia, hidrocefalia",
  ],
  "TAC Temporal-Oído": [
    "Tumor glómico o masa del hueso temporal",
    "Otomastoiditis complicada (absceso, trombosis del seno sigmoideo)",
    "Sin contraste: colesteatoma, otoesclerosis, estudio de cadena osicular",
  ],
  "TAC Cavidades Perinasales (CPN)": [
    "Sinusitis complicada (extensión orbitaria o intracraneal)",
    "Tumores sinonasales",
    "Sin contraste: sinusitis crónica no complicada, poliposis, estudio preoperatorio",
  ],
  "TAC Órbitas / Maxilofacial": [
    "Celulitis o absceso orbitario",
    "Tumores orbitarios o maxilofaciales",
    "Sin contraste: trauma facial, fracturas",
  ],
  "TAC Columna Cervical": [
    "Sospecha de espondilodiscitis o absceso",
    "Tumor o metástasis vertebral (mejor complementar con RM)",
    "Sin contraste: trauma, evaluación de fracturas, artrosis",
  ],
  "TAC Columna Dorsal (mínimo 6 espacios)": [
    "Sospecha de espondilodiscitis o absceso",
    "Tumor o metástasis vertebral",
    "Sin contraste: trauma, fracturas por compresión",
  ],
  "TAC Columna Lumbar": [
    "Sospecha de espondilodiscitis o absceso",
    "Tumor o metástasis vertebral",
    "Sin contraste: trauma, hernia discal, espondilolistesis",
  ],
  "TAC de Tórax Completo": [
    "Estadificación oncológica y caracterización de masas",
    "Adenopatías mediastínicas o hiliares",
    "Derrame pleural complicado / empiema",
    "Sospecha de TEP: derivar a AngioTAC de tórax",
    "Sin contraste: nódulo pulmonar en seguimiento, enfermedad intersticial, screening",
  ],
  "TAC Musculoesquelética": [
    "Tumores óseos o de partes blandas",
    "Osteomielitis o colecciones",
    "Sin contraste: fracturas complejas, planificación quirúrgica",
  ],
  "TAC de Pelvis": [
    "Tumores pelvianos, abscesos, diverticulitis complicada",
    "Sin contraste: urolitiasis (pieloTAC), fracturas pélvicas",
  ],
  "Pielografía por TAC": [
    "Sin contraste por definición: cólico renal / urolitiasis",
    "Hematuria o sospecha de tumor urotelial: derivar a UroTAC con contraste",
  ],
};

/** Fuentes del contenido clínico mostrado en modo desarrollador. */
export const contrastGuidanceSources =
  "Basado en ACR Appropriateness Criteria, guías ESUR y recomendaciones RSNA. La decisión final es del radiólogo.";

export function getContrastByDiagnosis(examName: string): string[] | null {
  return contrastByDiagnosis[examName] ?? null;
}

export type StudySection = {
  title: string;
  items: string[];
};

export type StudyCard = {
  id: string;
  name: string;
  type: "imaging" | "lab";
  category: string;
  tags: string[];
  sections: StudySection[];
  keywords: string[];
};

export const studyCards: StudyCard[] = [

  // ── IMAGENOLOGÍA ─────────────────────────────────────────────────────────

  {
    id: "rm-general",
    name: "Resonancia Magnética (RM)",
    type: "imaging",
    category: "RM",
    tags: ["RM", "Magnética", "Tejidos blandos"],
    keywords: ["resonancia", "rm", "magnetica", "cerebro", "columna", "articular"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Evaluación de **tejidos blandos** con resolución de contraste superior a cualquier otra modalidad: sistema nervioso central (cerebro, médula), articulaciones, hígado, páncreas, próstata, útero y anexos.",
          "**No utiliza radiación ionizante**, por lo que es la modalidad de elección en embarazadas (2.º y 3.er trimestre), niños y pacientes con exposiciones frecuentes.",
          "Exámenes específicos más frecuentes: RM Cerebro, RM Columna Lumbar/Cervical/Dorsal, RM Rodilla, RM Hombro, RM Abdomen, RM Pelvis.",
          "Permite **caracterización tisular** (edema, isquemia, desmielinización, neoplasia) gracias a las secuencias T1, T2, FLAIR, DWI y espectroscopía.",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "**Cuestionario de seguridad RM obligatorio** antes de ingresar a la sala: marcapasos, implantes cocleares, clips aneurismáticos, cuerpos extraños metálicos intraoculares.",
          "Retirar **todos los objetos metálicos**: joyas, piercing, audífonos, parches transdérmicos con capa metálica, prótesis dentales removibles.",
          "Para exámenes **con gadolinio IV**: solicitar creatinina sérica previa. TFG <30 mL/min contraindica gadolinio estándar (riesgo de fibrosis sistémica nefrogénica).",
          "Ayuno de 6 horas si el examen incluye contraste IV. Para RM de abdomen/pelvis: ayuno de 6 h para minimizar artefactos de motilidad.",
          "Pacientes con **claustrofobia**: coordinar con médico solicitante uso de ansiolítico oral previo. Explicar al paciente la duración y los ruidos del equipo.",
          "RM en **embarazo**: se considera seguro a partir del 2.º trimestre; contraste con gadolinio solo si el beneficio supera el riesgo.",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Principio físico**: campos magnéticos intensos (1.5 T a 3 T) + pulsos de radiofrecuencia excitan los núcleos de hidrógeno de los tejidos; la señal emitida al relajarse es captada por antenas (bobinas) y reconstruida en imagen.",
          "El paciente se posiciona en decúbito supino dentro del túnel magnético. Las **bobinas** se colocan sobre la región a explorar (cabeza, rodilla, columna, etc.).",
          "Duración variable según protocolo: 20–25 min (columna simple) hasta 60–90 min (abdomen con difusión y perfusión).",
          "Contraste con **gadolinio IV** (0.1 mmol/kg): resalta lesiones con ruptura de barrera hematoencefálica, neoangioénesis tumoral y áreas de inflamación activa.",
          "El **postprocesado** incluye reconstrucciones multiplanares (sagital, coronal, axial) y, en angioRM o cardioRM, reconstrucciones 3D.",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Absolutas**: marcapasos cardíaco incompatible con RM, implante coclear (algunos modelos compatibles — verificar), clips aneurismáticos ferromagnéticos, cuerpos extraños metálicos intraoculares.",
          "**Relativas**: claustrofobia severa (evaluar sedación), primer trimestre de embarazo, gadolinio con TFG <30 (usar alternativa), implantes ortopédicos (generalmente compatibles — verificar hoja técnica del fabricante).",
          "Peso del paciente: la mayoría de los equipos soportan hasta **160–200 kg** según fabricante.",
        ],
      },
    ],
  },

  {
    id: "tac-general",
    name: "Tomografía Computada (TAC / TC)",
    type: "imaging",
    category: "TAC",
    tags: ["TAC", "TC", "Contraste iodado", "Trauma"],
    keywords: ["tac", "tomografia", "tc", "scanner", "cerebro", "torax", "abdomen"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Evaluación rápida y precisa** de cabeza, cuello, tórax, abdomen, pelvis y extremidades. Es la modalidad de elección en **trauma** y urgencia.",
          "Detecta: hemorragias intracraneales, fracturas, neumotórax, hemotórax, colecciones intraabdominales, tromboembolismo pulmonar (angioTAC), disección aórtica.",
          "Exámenes frecuentes: TAC Cerebro, TAC Tórax, TAC Abdomen-Pelvis, AngioTAC Pulmonar, TAC Columna.",
          "Permite **reconstrucciones 3D** para planificación quirúrgica y evaluación vascular.",
          "Superior a la RM en: **hueso cortical**, pulmón, calcificaciones y situaciones de urgencia (rapidez de adquisición).",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "**Sin contraste**: generalmente no requiere preparación especial. Retirar objetos metálicos de la región a explorar.",
          "**Con contraste iodado IV**: ayuno de 4–6 horas. **Creatinina sérica obligatoria** (vigente, idealmente <7 días). TFG <30 contraindica contraste estándar.",
          "**Metformina**: suspender 48 h antes y 48 h después del contraste IV en pacientes con riesgo de nefrotoxicidad (consultar con médico).",
          "Pacientes con **alergia previa a contraste**: notificar al radiólogo; puede requerirse premedicación con corticoides + antihistamínico.",
          "**Embarazo**: considerar riesgo-beneficio. La radiación es ionizante; preferir alternativas (eco, RM) cuando sea posible. En urgencias vitales, el TAC se realiza igual.",
          "Informar al paciente sobre la posible sensación de **calor corporal** al inyectar el contraste (es normal y transitoria).",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Principio físico**: un tubo de rayos X gira 360° alrededor del paciente mientras detectores miden la atenuación del haz. Una computadora reconstruye las imágenes en cortes axiales (TC multicorte: hasta 320 detectores).",
          "El paciente se posiciona en decúbito supino sobre la mesa. Duración: **5–15 minutos** según región y protocolo.",
          "Con **contraste IV**: el técnico inyecta el medio de contraste iodado (70–100 mL) mediante bomba inyectora a velocidad controlada. Se adquieren fases: **arterial** (25-30 s), **portal** (65-70 s) y/o **tardía** según indicación clínica.",
          "**Postprocesado**: reconstrucciones MPR (axial, coronal, sagital), VRT (3D volumétrico), MinIP (vía aérea) según protocolo.",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Absolutas**: ninguna absoluta en urgencias vitales. La dosis de radiación debe siempre sopesarse con el beneficio clínico.",
          "**Relativas**: embarazo (usar solo si es estrictamente necesario), alergia severa previa a contraste yodado (premedicar), TFG <30 con necesidad de contraste (usar contraste de baja osmolaridad con hidratación), peso >200 kg (límite de mesa).",
          "La dosis de radiación es **significativamente mayor** que en RX convencional; principio ALARA (As Low As Reasonably Achievable) siempre aplicable.",
        ],
      },
    ],
  },

  {
    id: "eco-general",
    name: "Ecografía (Ultrasonido)",
    type: "imaging",
    category: "ECO",
    tags: ["Ecografía", "Ultrasonido", "Sin radiación", "Tiempo real"],
    keywords: ["eco", "ecografia", "ultrasonido", "abdomen", "pelvica", "ginecologica", "doppler"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Evaluación en tiempo real** de órganos sólidos abdominales (hígado, vesícula biliar, páncreas, bazo, riñones), ginecológica/obstétrica, vascular (Doppler) y partes blandas.",
          "**No utiliza radiación ionizante**: es la modalidad más segura para embarazadas, niños y exploración repetida.",
          "Exámenes frecuentes: Eco Abdomen Total, Eco Ginecológica (TAS/TVS), Eco Obstétrica, Eco Tiroides y Cuello, Eco Partes Blandas, Eco Doppler Venoso/Arterial, Eco Renal.",
          "Permite guiar **procedimientos intervencionistas**: biopsias, drenajes, punciones aspirativas.",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "**Eco Abdominal**: ayuno de **6–8 horas** (mejora la ventana acústica al reducir el gas intestinal). Hidratación con agua está permitida.",
          "**Eco Pélvica/Ginecológica transabdominal**: **vejiga llena** (beber 1 litro de agua 1 hora antes y no orinar). Mejora la ventana acústica pélvica.",
          "**Eco Transvaginal (TVS)**: vejiga vacía. Explicar el procedimiento a la paciente. Uso de preservativo en el transductor intracavitario.",
          "**Eco Tiroides, Partes Blandas, Doppler vascular**: no requieren preparación especial.",
          "**Eco Obstétrica 1.er trimestre**: preferiblemente transvaginal (mayor resolución). No requiere ayuno.",
          "No hay contraindicaciones por radiación. El gel es hipoalergénico. Informar si la paciente tiene alguna patología vaginal previa (TVS).",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Principio físico**: el transductor emite pulsos de ultrasonido (1–18 MHz). Los tejidos reflejan los pulsos de forma diferente según su densidad acústica; el equipo reconstruye la imagen en tiempo real.",
          "El tecnólogo aplica **gel conductor** sobre la piel y desliza el transductor sobre la región a evaluar. El paciente se posiciona según el examen (supino, lateral, litotomía).",
          "La adquisición incluye imágenes estáticas y secuencias de cine. En **Doppler color/pulsado**: se evalúa flujo vascular (velocidad, resistencia, índice pulsatilidad).",
          "Duración: 20–30 min en promedio. Algunos estudios (eco obstétrica morfológica) pueden tomar hasta 45–60 min.",
          "**Limitaciones**: ventana acústica reducida en pacientes obesos, gran cantidad de gas intestinal o cicatrices quirúrgicas.",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**No existen contraindicaciones absolutas** al ultrasonido diagnóstico convencional.",
          "La ecografía **transvaginal** puede ser diferida en casos de sangrado activo severo o discomfort importante de la paciente.",
          "La calidad diagnóstica puede verse muy limitada por: **obesidad extrema**, meteorismo severo o cicatrices abdominales extensas.",
        ],
      },
    ],
  },

  {
    id: "rx-general",
    name: "Radiografía Convencional (RX)",
    type: "imaging",
    category: "RX",
    tags: ["Radiografía", "Rayos X", "Huesos", "Tórax"],
    keywords: ["rx", "radiografia", "rayos x", "torax", "huesos", "fractura", "columna"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Primera línea** para evaluación de: huesos (fracturas, luxaciones, artropatías), tórax (pulmones, silueta cardíaca, derrame pleural, neumotórax), abdomen simple (obstrucción intestinal, perforación — niveles hidroaéreos).",
          "Exámenes más frecuentes: RX Tórax AP/Lateral, RX Columna Lumbar/Cervical, RX Pelvis, RX Extremidades (rodilla, tobillo, muñeca, hombro), RX Abdomen Simple.",
          "Técnica de **bajo costo, alta disponibilidad y rápida adquisición**: resultados en minutos.",
          "Permite evaluación comparativa con estudios previos (seguimiento de fracturas, evolución de enfermedades pulmonares crónicas).",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "**Preparación mínima**: retirar objetos metálicos (joyas, ropa con broches, cinturones, sostenes con aro) de la región a examinar.",
          "**Protección gonadal** con delantal de plomo cuando sea posible, especialmente en pacientes jóvenes en edad reproductiva.",
          "**Embarazo**: comunicar siempre si existe posibilidad. En urgencia, la protección fetal con delantal de plomo reduce la dosis fetal. Evaluar riesgo-beneficio con el médico solicitante.",
          "Informar al paciente que debe mantenerse **inmóvil** durante la exposición (segundos). En tórax: inspiración profunda y apnea breve.",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Principio físico**: el tubo de rayos X emite fotones que atraviesan el cuerpo con diferente atenuación según la densidad del tejido (hueso, grasa, músculo, aire). El detector digital capta el patrón resultante.",
          "El tecnólogo posiciona al paciente (de pie, sentado o en camilla) y coloca el **detector (placa digital)** apropiado. La distancia foco-detector estándar es 100–180 cm según el examen.",
          "Exposición de **fracciones de segundo** a pocos segundos. La imagen se procesa digitalmente y está disponible en minutos.",
          "Proyecciones estándar: **AP (anteroposterior)**, PA (posteroanterior — estándar en tórax), lateral, oblicua según estructura anatómica.",
          "**Radiología digital directa (DR)**: imagen disponible inmediatamente. Permite ajustes de contraste/brillo y envío a PACS (sistema de archivos digitales).",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Sin contraindicaciones absolutas** en urgencias. La dosis de radiación es la más baja de las modalidades que usan rayos X.",
          "**Embarazo**: relativa. Una radiografía de tórax o extremidades emite dosis fetal mínima (<0.01 mGy). Radiografías de pelvis/abdomen directo implican mayor dosis fetal — evaluar con médico.",
          "Pacientes que **no pueden colaborar** (niños pequeños, agitación psicomotriz): puede requerirse sedación o sujeción apropiada.",
        ],
      },
    ],
  },

  {
    id: "mam-general",
    name: "Mamografía",
    type: "imaging",
    category: "MAM",
    tags: ["Mamografía", "Mama", "Screening", "Cáncer"],
    keywords: ["mamografia", "mama", "mam", "breast", "cancer", "nodulo", "calcificaciones"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Screening** (tamizaje) y diagnóstico de patología mamaria: cáncer de mama, microcalcificaciones, nódulos, asimetrías y distorsiones arquitecturales.",
          "La **mamografía digital** (FFDM) y la **tomosíntesis 3D** (mamografía tridimensional) son los estándares actuales para detección temprana.",
          "El cáncer de mama es el más frecuente en mujeres. La detección en estadios tempranos aumenta significativamente la supervivencia.",
          "**Indicaciones de screening**: mujeres ≥40 años (o antes si antecedentes familiares de primer grado). Periodicidad anual o bianual según protocolo institucional.",
          "**Diagnóstica** (no screening): evaluación de nódulos palpables, descarga por pezón, asimetría detectada en screening.",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "**No aplicar desodorante, talco, perfume ni cremas** en la axila ni en la mama el día del examen (interfieren con la imagen como artefactos que simulan microcalcificaciones).",
          "Preferir realizar el examen en la **primera mitad del ciclo menstrual** (días 7–14): menor sensibilidad y tensión mamaria, mayor comodidad para la compresión.",
          "Informar si tiene **implantes mamarios**: se requieren proyecciones adicionales (Eklund) para desplazar el implante y visualizar el tejido glandular nativo.",
          "Traer **mamografías previas** para comparación: fundamental para detectar cambios evolutivos.",
          "La **compresión de la mama** durante el examen es necesaria e inevitable: reduce la dosis de radiación, mejora la resolución y separa las estructuras. Es transitoria (segundos).",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Principio físico**: rayos X de baja energía (25–35 kVp) optimizados para tejido blando mamario. La **paleta de compresión** inmoviliza y aplana la mama para reducir dosis y mejorar detalle.",
          "Proyecciones estándar: **Cráneo-caudal (CC)** y **Medio-Lateral-Oblicua (MLO)** de cada mama. Total: 4 exposiciones mínimas.",
          "**Tomosíntesis (3D)**: el tubo gira en arco adquiriendo múltiples imágenes en distintos ángulos; el software reconstruye \"rodajas\" del tejido mamario eliminando la superposición de tejidos.",
          "El sistema de detección es digital (DR); las imágenes se clasifican según el sistema **BI-RADS** (0 al 6) por el radiólogo: indica probabilidad de malignidad y conducta a seguir.",
          "Duración total del examen: **15–20 minutos**.",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Embarazo**: contraindicación relativa. En sospecha de cáncer durante el embarazo, la ecografía mamaria es la primera línea; la mamografía puede realizarse con protección abdominal si es imprescindible.",
          "**Menores de 30–35 años**: la alta densidad mamaria limita la utilidad. La ecografía es más informativa en mujeres jóvenes con sospecha de nódulo.",
          "No existen contraindicaciones absolutas por radiación en mujeres que requieren el examen por indicación diagnóstica.",
        ],
      },
    ],
  },

  {
    id: "cont-contraste",
    name: "Medios de Contraste (Iodado / Gadolinio)",
    type: "imaging",
    category: "CONT",
    tags: ["Contraste", "Iodado", "Gadolinio", "Creatinina"],
    keywords: ["contraste", "iodado", "gadolinio", "medio de contraste", "creatinina", "alergia"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Los medios de contraste **mejoran la diferenciación tisular** en TAC (iodados) y RM (gadolinio), permitiendo caracterizar lesiones focales, evaluar la vascularización y detectar ruptura de barreras.",
          "**Contraste iodado IV (TAC)**: resalta estructuras vasculares, diferencia lesiones hipervascularizadas (adenomas, CHC, metástasis), evalúa perfusión de órganos y detecta trombos.",
          "**Gadolinio IV (RM)**: resalta áreas de ruptura de barrera hematoencefálica (abscesos, metástasis, EM activa), neovascularización tumoral e inflamación activa.",
          "Contraste oral/rectal (TAC abdominal): marca el tubo digestivo para diferenciarlo de masas o adenopatías.",
        ],
      },
      {
        title: "Preparación y Seguridad Obligatoria",
        items: [
          "**CREATININA SÉRICA OBLIGATORIA** antes de contraste iodado IV o gadolinio: vigente (idealmente <7 días, o <30 días en pacientes sin enfermedad renal conocida). TFG <30 mL/min contraindica contraste estándar.",
          "**Ayuno de 4–6 horas** antes de la administración IV para reducir el riesgo en caso de reacción anafilactoide con vómitos y broncoespasmo.",
          "**Metformina**: suspender 48 h antes y 48 h después del contraste iodado IV en pacientes con riesgo renal (discutir con médico si urgencia).",
          "**Alergias previas a contraste**: documentar siempre. Alergia leve previa: premedicar con prednisona 50 mg vo 13 h, 7 h y 1 h antes + difenhidramina 50 mg 1 h antes. Alergia severa previa: evaluar alternativas.",
          "Informar al paciente sobre sensaciones normales durante la inyección: **calor corporal generalizado, sabor metálico y urgencia urinaria transitoria**.",
          "El **consentimiento informado** debe ser obtenido y archivado antes de la administración de contraste.",
        ],
      },
      {
        title: "Tipos y Administración",
        items: [
          "**Contraste iodado**: no iónico de baja osmolaridad (Iohexol, Iopromide, Iodixanol). Concentraciones 300–370 mg I/mL. Dosis estándar IV: 1–2 mL/kg (máx 150 mL).",
          "**Gadolinio**: macrocíclico (Gadobutrol, Gadoteridol) o lineal (Gadopentetato). Dosis estándar: 0.1 mmol/kg IV. Gadolinio macrocíclico: mayor estabilidad termodinámica, menor retención tisular.",
          "Fases de adquisición en TAC con contraste: **Pre-contraste → Arterial (25–30 s) → Portal (65–70 s) → Tardía (3–5 min)** según protocolo de órgano.",
          "Reacciones adversas: **leves** (náuseas, urticaria — 1–3%), **moderadas** (broncoespasmo, hipotensión — 0.1%), **severas/anafilaxia** (<0.05%). Equipo de reanimación siempre disponible.",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Absolutas para contraste iodado**: alergia severa documentada sin posibilidad de premedicación, TFG <15 mL/min (anuria/diálisis — evaluar individualmente).",
          "**Absolutas para gadolinio**: TFG <30 mL/min (riesgo de **Fibrosis Sistémica Nefrogénica** — FSN), especialmente con agentes lineales. Gadolinio macrocíclico a dosis estándar puede considerarse con TFG 15-30 con consentimiento.",
          "**Relativas comunes**: embarazo (uso solo si estrictamente necesario), mieloma múltiple con paraproteinemia (hidratación abundante + monitoreo renal), diabetes con IR en tratamiento con metformina.",
        ],
      },
    ],
  },

  {
    id: "card-cardiologia",
    name: "Estudios Cardiológicos (Eco, Holter, Ergometría)",
    type: "imaging",
    category: "CARD",
    tags: ["Cardiología", "Ecocardiografía", "Holter", "Corazón"],
    keywords: ["cardiologia", "card", "ecografia cardiaca", "ecocardiograma", "holter", "ergometria", "corazon"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Ecocardiografía 2D + Doppler**: evaluación de función sistólica (FEVI) y diastólica, morfología valvular, derrame pericárdico, presión pulmonar, cardiopatías congénitas. No es invasivo y sin radiación.",
          "**Holter de ritmo (24–48 h)**: registro continuo del ECG ambulatorio para detectar arritmias, bloqueos, síncopes y evaluar respuesta a antiarrítmicos.",
          "**Holter de presión (MAPA)**: monitoreo ambulatorio de presión arterial cada 20–30 minutos durante 24 h. Evalúa hipertensión enmascarada, HTA de bata blanca, patrón dipping.",
          "**Ergometría (Prueba de esfuerzo)**: ECG bajo esfuerzo físico (trotadora/bicicleta) para detectar isquemia miocárdica (depresión ST), evaluar capacidad funcional y respuesta cronotrópica.",
          "**AngioTAC coronario + Score de calcio**: cuantifica la carga de calcio coronario (predictor de riesgo CV) y evalúa estenosis de arterias coronarias sin cateterismo.",
        ],
      },
      {
        title: "Preparación según Examen",
        items: [
          "**Ecocardiografía**: no requiere preparación especial. Traer exámenes previos y lista de medicamentos. Posición en decúbito lateral izquierdo.",
          "**Holter ECG**: no aplicar cremas ni aceites en el tórax el día anterior (adhesión de electrodos). Registrar actividades y síntomas en el diario de Holter provisto.",
          "**Holter MAPA**: manguito en brazo no dominante. Mantener brazo relajado y extendido durante cada medición. Continuar actividades habituales.",
          "**Ergometría**: no comer ni beber (excepto agua) 2–3 h antes. Ropa cómoda y zapatillas. Consultar si debe suspender betabloqueadores o digoxina (según indicación del cardiólogo). ECG basal previo.",
          "**AngioTAC coronario**: ayuno 4 h, creatinina vigente (para contraste), **frecuencia cardíaca <65 lpm** (puede requerir betabloqueador oral previo — Metoprolol 50–100 mg). Evitar café/estimulantes 12 h antes.",
        ],
      },
      {
        title: "¿Cómo se Realiza?",
        items: [
          "**Eco cardíaca**: transductor en posición paraesternal, apical, subxifoidea y supraesternal. Secuencias 2D, Modo M, Doppler color, pulsado y tisular. Duración 30–45 min.",
          "**Holter ECG**: colocación de 7–10 electrodos adhesivos en el tórax conectados a un grabador portátil. El paciente lo lleva 24–48 h y lo devuelve para análisis computarizado.",
          "**Ergometría**: protocolo de Bruce (aumento progresivo de velocidad e inclinación). Monitoreo continuo ECG 12 derivaciones + PA cada 2 min. Criterios de suspensión: depresión ST ≥2 mm, arritmia severa, dolor torácico, FC >85% del máximo teórico (220-edad).",
          "**Score de calcio (CAC)**: TAC sin contraste, secuencia de baja dosis, sincronización ECG. El software cuantifica depósitos de calcio coronario. Resultado: **Puntuación Agatston** (0 = sin riesgo, >400 = alto riesgo).",
        ],
      },
      {
        title: "Contraindicaciones",
        items: [
          "**Ergometría**: contraindicada en IAM reciente (<2 días), angina inestable no controlada, arritmias severas no controladas, IC descompensada, estenosis aórtica severa sintomática.",
          "**AngioTAC coronario**: IR severa (TFG <30 con contraste), alergia a contraste no manejada, fibrilación auricular (impide sincronización ECG), FC no controlable <65 lpm.",
          "**Ecocardiografía transtorácica**: sin contraindicaciones. La **transesofágica (TEE)** requiere ayuno 6 h, sedación y es contraindicada en esofagopatías severas.",
        ],
      },
    ],
  },

  // ── LABORATORIO ──────────────────────────────────────────────────────────

  {
    id: "lab-hemograma",
    name: "Hemograma Completo (CBC)",
    type: "lab",
    category: "Hematología",
    tags: ["Hematología", "Hemograma", "Serie roja", "Leucocitos"],
    keywords: ["hemograma", "hematologia", "cbc", "globulos", "leucocitos", "plaquetas", "anemia"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Evaluación cuantitativa y cualitativa de las tres **series hematológicas**: eritrocítica (GR, Hb, Hto, índices eritrocíticos), leucocítica (recuento y diferencial) y plaquetaria.",
          "**Diagnóstico de anemias** (microcítica-hipocrómica → ferropénica, macrocítica → B12/folato, normocítica → enfermedades crónicas), policitemia, leucemias, trombocitopenia, trombocitosis.",
          "**Monitoreo** de infecciones (leucocitosis con neutrofilia → bacteriana; linfocitosis → viral), quimioterapia, enfermedad de médula ósea, respuesta a tratamiento con eritropoyetina.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Sin ayuno requerido** para el hemograma estándar. Sin embargo, si se adjunta perfil bioquímico, respetar el ayuno de ese examen.",
          "Evitar **ejercicio intenso** en las 24 horas previas (puede producir leucocitosis fisiológica transitoria).",
          "Registrar **medicamentos actuales**: AINEs, citostáticos, anticonceptivos orales, hierro y vitamina B12 pueden alterar los valores.",
          "Informar si hay **transfusión reciente** (<1 semana): puede enmascarar la anemia real del paciente.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: sangre venosa periférica (antecubital preferente). **Tubo con EDTA (tapa morada/lila)**: anticoagulante que preserva la morfología celular.",
          "**Volumen**: 3–5 mL. Invertir suavemente el tubo 8–10 veces tras la extracción para mezclar el anticoagulante sin producir hemólisis.",
          "**Procesamiento**: analizador hematológico automatizado (ej. Sysmex XN-Series, Abbott CELL-DYN). Principios: **impedancia eléctrica** (conteo celular por volumen), **dispersión de luz láser** (diferencial leucocitario), **absorción de luz** (Hb por cianometahemoglobina).",
          "**Frotis de sangre periférica**: complementa el hemograma cuando el equipo reporta alarmas (blastos, eritroblastos, plaquetas gigantes). El tecnólogo/hematólogo revisa morfología al microscopio.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Hb**: Hombre 13.5–17.5 g/dL · Mujer 12–16 g/dL. **Crítico**: <7 g/dL (transfusión urgente) o >20 g/dL.",
          "**Leucocitos**: 4.500–11.000/μL. **Crítico**: <2.000 (neutropenia severa, riesgo infeccioso) o >50.000 (sospecha de leucemia).",
          "**Plaquetas**: 150.000–400.000/μL. **Crítico**: <50.000 (riesgo hemorrágico) o >1.000.000 (trombocitosis extrema).",
          "**VCM (volumen corpuscular medio)**: 80–100 fL. VCM <80 → anemia microcítica (ferropénica). VCM >100 → anemia macrocítica (B12, folato, hepatopatía).",
          "**Neutrófilos**: 1.800–7.700/μL. Bandemia (neutrófilos en banda >10%) → infección bacteriana severa o sepsis.",
        ],
      },
    ],
  },

  {
    id: "lab-glucosa",
    name: "Glucosa en Ayunas",
    type: "lab",
    category: "Bioquímica",
    tags: ["Glucosa", "Diabetes", "Glicemia", "Bioquímica"],
    keywords: ["glucosa", "glicemia", "azucar", "diabetes", "ayunas"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Diagnóstico y monitoreo de **diabetes mellitus tipo 1 y 2**, prediabetes (glucosa alterada en ayunas) e hipoglicemia.",
          "Tamizaje poblacional de diabetes: recomendado en adultos >45 años, obesos, hipertensos, con antecedentes familiares o diabetes gestacional previa.",
          "Diagnóstico de **diabetes gestacional** en conjunto con Test de O'Sullivan y PTOG.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Ayuno estricto de 8–12 horas** (solo agua permitida). Fundamental para resultados válidos. Ayuno <8 h invalida el examen para fines diagnósticos.",
          "No realizar **ejercicio físico intenso** la noche anterior ni la mañana del examen.",
          "Registrar medicamentos hiperglicemiantes (corticoides, diuréticos tiazídicos, antipsicóticos) e hipoglicemiantes (insulina, metformina, sulfonilureas).",
          "Estrés agudo, infecciones activas y hospitalización pueden **elevar la glucosa** de forma fisiológica y transitoria.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tubo tapa roja/dorada) o plasma con fluoruro (tubo tapa gris con NaF — **preferido** para glucosa, inhibe la glucólisis eritrocitaria y estabiliza la muestra hasta 24 h).",
          "**Procesamiento**: método enzimático colorimétrico automatizado: **Glucosa Oxidasa** o **Hexoquinasa** (más específico y preciso). Resultado en minutos en analizador bioquímico (Siemens Atellica, Roche Cobas).",
          "Muestra con hemólisis severa puede falsamente **elevar la glucosa** (liberación de glucosa intracelular). Rechazar si hay hemólisis marcada.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Normal**: 70–99 mg/dL (3.9–5.5 mmol/L).",
          "**Prediabetes** (Glucosa Alterada en Ayunas): 100–125 mg/dL.",
          "**Diabetes Mellitus**: ≥126 mg/dL en dos ocasiones separadas.",
          "**Valor crítico bajo**: <50 mg/dL (hipoglicemia severa — notificar de inmediato al médico).",
          "**Valor crítico alto**: >500 mg/dL (cetoacidosis diabética o estado hiperosmolar — emergencia médica).",
        ],
      },
    ],
  },

  {
    id: "lab-hba1c",
    name: "Hemoglobina Glicosilada (HbA1c)",
    type: "lab",
    category: "Bioquímica",
    tags: ["HbA1c", "Diabetes", "Control glicémico", "Hemoglobina"],
    keywords: ["hba1c", "hemoglobina glicosilada", "diabetes", "control glucemico", "a1c"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Refleja el **promedio de glucosa sanguínea de los últimos 2–3 meses** (vida media del eritrocito). No se ve afectada por fluctuaciones diarias ni el ayuno del día del examen.",
          "**Diagnóstico de diabetes**: HbA1c ≥6.5% en dos ocasiones (o junto a glucosa en ayunas ≥126 mg/dL).",
          "**Monitoreo del control glucémico** en pacientes diabéticos: meta terapéutica general <7% (individualizar según edad, comorbilidades y riesgo de hipoglicemia).",
          "Predictor de complicaciones micro y macrovasculares de la diabetes (retinopatía, nefropatía, neuropatía, enfermedad cardiovascular).",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno**: puede tomarse en cualquier momento del día. Gran ventaja sobre la glucosa en ayunas.",
          "Registrar condiciones que **falsamente alteran** el resultado: anemia hemolítica (falsa baja), hemoglobinopatías (hemoglobina S, C, E), déficit de hierro o B12 (falsa elevación).",
          "Transfusiones recientes (<3 meses) pueden **subestimar** la HbA1c real del paciente.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: sangre total con **EDTA (tapa morada/lila)**, 2–3 mL. Estable a temperatura ambiente 7 días o refrigerada 4 semanas.",
          "**Método**: **Cromatografía líquida de alta resolución (HPLC)** — gold standard, alta precisión y detecta variantes de hemoglobina. Alternativa: inmunoensayo o electroforesis en capilares.",
          "El resultado se expresa en **% (NGSP/ADA)** o en mmol/mol (IFCC/Europa). Conversión: % = 10.93 × mmol/mol + 2.15.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**No diabético**: <5.7%.",
          "**Prediabetes**: 5.7–6.4%.",
          "**Diabetes**: ≥6.5%.",
          "**Meta de control en DM2**: <7% (ADA). Meta más estricta (<6.5%) en jóvenes sin complicaciones; meta menos estricta (<8%) en ancianos o con hipoglicemia frecuente.",
          "**HbA1c >10%**: control muy deficiente, alta probabilidad de complicaciones. Evaluar ajuste urgente del tratamiento.",
        ],
      },
    ],
  },

  {
    id: "lab-creatinina",
    name: "Creatinina y TFG Estimada",
    type: "lab",
    category: "Bioquímica",
    tags: ["Creatinina", "Función renal", "TFG", "Riñón"],
    keywords: ["creatinina", "tfg", "funcion renal", "riñon", "clearance", "ckd"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Marcador de función renal**: la creatinina es un producto de degradación de la creatina muscular, eliminada exclusivamente por filtración glomerular.",
          "**Diagnóstico y estadificación de enfermedad renal crónica (ERC)** mediante el cálculo de la **TFG estimada** (fórmulas CKD-EPI o MDRD): estadios G1–G5.",
          "**Prerequisito obligatorio** para la administración de medios de contraste (TAC, RM con gadolinio) y fármacos nefrotóxicos.",
          "Monitoreo de nefrotoxicidad por medicamentos (aminoglucósidos, vancomicina, AINEs, cisplatino).",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Ayuno no estrictamente necesario**, pero si se acompaña de perfil bioquímico, respetar el ayuno correspondiente.",
          "**Evitar ejercicio intenso** 24–48 h antes: el esfuerzo físico aumenta transitoriamente la creatinina por mayor degradación muscular.",
          "Dieta rica en **carne cocida** el día anterior puede elevar la creatinina un 10–20% (conversión de creatina a creatinina por el calor).",
          "Registrar medicamentos que elevan la creatinina sin dañar el riñón: **cimetidina, trimetoprima** (bloquean secreción tubular de creatinina).",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada) o plasma EDTA. 3–5 mL. Estable refrigerada 7 días.",
          "**Método**: reacción colorimétrica de **Jaffé** (picrato alcalino) o enzimático (creatinasa/sarcosina oxidasa — más específico, no afectado por pseudocromatógenos).",
          "La **TFG estimada** se calcula con la fórmula **CKD-EPI 2021** (incluye creatinina, edad y sexo; ya no incluye raza según consenso internacional). Resultado en mL/min/1.73 m².",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Creatinina sérica**: Hombre 0.7–1.2 mg/dL · Mujer 0.5–1.0 mg/dL (varían según masa muscular).",
          "**TFG normal**: ≥60 mL/min/1.73 m². ERC estadio G3a: 45–59 · G3b: 30–44 · G4: 15–29 · G5 (<15 — falla renal).",
          "**TFG <30 mL/min**: contraindicación de gadolinio estándar y uso muy cauteloso de contraste iodado.",
          "**Valor crítico**: creatinina >10 mg/dL (falla renal severa — posible necesidad de diálisis urgente).",
          "La creatinina **no se eleva hasta perder el 50% de la función renal**: es un marcador tardío. La cistatina C es más sensible para cambios tempranos.",
        ],
      },
    ],
  },

  {
    id: "lab-perfil-lipidico",
    name: "Perfil Lipídico (Colesterol Total, LDL, HDL, TG)",
    type: "lab",
    category: "Bioquímica",
    tags: ["Lípidos", "Colesterol", "LDL", "HDL", "Triglicéridos", "Cardiovascular"],
    keywords: ["lipidos", "colesterol", "ldl", "hdl", "trigliceridos", "perfil lipidico", "cardiovascular"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Evaluación del **riesgo cardiovascular** y diagnóstico de dislipidemias (hipercolesterolemia, hipertrigliceridemia, HDL bajo).",
          "**Colesterol total**: suma de LDL + HDL + VLDL. Marcador global de riesgo CV.",
          "**LDL (colesterol malo)**: principal transportador de colesterol hacia las paredes arteriales. Target terapéutico principal en prevención CV.",
          "**HDL (colesterol bueno)**: transporte reverso de colesterol al hígado. Niveles bajos son factor de riesgo independiente.",
          "**Triglicéridos**: niveles altos se asocian a pancreatitis (>1.000 mg/dL), síndrome metabólico y riesgo CV aumentado.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Ayuno de 9–12 horas** obligatorio para medición de **triglicéridos** (y cálculo de LDL por fórmula de Friedewald). El LDL directo y el colesterol total pueden medirse sin ayuno.",
          "Suspender **suplementos de omega-3 y fibratos** 72 h antes si el médico lo indica (pueden reducir TG transitoriamente).",
          "Registrar **estatinas, fibratos, ezetimiba**: el objetivo es conocer el perfil basal o monitorear el efecto del tratamiento.",
          "Estrés agudo, infección activa, embarazo y cambios recientes de dieta pueden **alterar significativamente** los valores lipídicos.",
          "No tomar muestra dentro de las **4 semanas post-IAM o cirugía**: el estrés metabólico reduce el LDL y colesterol total transitoriamente.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 5 mL. Centrifugar en 30–60 min post-extracción.",
          "**Métodos enzimáticos colorimétricos** automatizados: Colesterol: colesterol esterasa + oxidasa. TG: glicerol-fosfato oxidasa. HDL: método directo por precipitación selectiva o anticuerpos.",
          "**LDL calculado** (Friedewald): LDL = Colesterol Total − HDL − (TG/5). Válido solo si TG <400 mg/dL. **LDL directo**: método de elección si TG >400 o en hipertrigliceridemia severa.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Colesterol total**: Deseable <200 · Limítrofe 200–239 · Alto ≥240 mg/dL.",
          "**LDL**: Óptimo <100 · Moderado 100–129 · Limítrofe 130–159 · Alto 160–189 · Muy alto ≥190 mg/dL. Meta en alto riesgo CV: <70 mg/dL.",
          "**HDL**: Bajo (factor de riesgo): <40 Hombre / <50 Mujer. Deseable: ≥60 mg/dL.",
          "**Triglicéridos**: Normal <150 · Limítrofe 150–199 · Alto 200–499 · Muy alto ≥500 mg/dL. Valor crítico >1.000 (pancreatitis aguda).",
        ],
      },
    ],
  },

  {
    id: "lab-tsh",
    name: "TSH (Tirotropina / Hormona Estimulante del Tiroides)",
    type: "lab",
    category: "Hormonas",
    tags: ["Tiroides", "TSH", "Hipotiroidismo", "Hipertiroidismo"],
    keywords: ["tsh", "tiroides", "hipotiroidismo", "hipertiroidismo", "t4", "hormona"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Primera línea** para tamizaje y diagnóstico de disfunción tiroidea. Hormona hipofisiaria que regula la síntesis de T3 y T4 por retroalimentación.",
          "**TSH elevada** → hipotiroidismo (la hipófisis intenta estimular más al tiroides). **TSH suprimida** → hipertiroidismo (el tiroides produce exceso de hormonas).",
          "Monitoreo del tratamiento con **levotiroxina** (hipotiroidismo) o antitiroideos (hipertiroidismo).",
          "Tamizaje neonatal (TSH al 3.er día de vida): diagnóstico precoz de hipotiroidismo congénito — urgencia para evitar cretinismo.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno** para TSH aislada. Sin embargo, si se piden T3, T4 libre o perfil hormonal, algunos laboratorios recomiendan ayuno de 4 h.",
          "Tomar la muestra **antes de la dosis matutina de levotiroxina** si el paciente está en tratamiento: el pico de T4 post-dosis puede alterar T3/T4 libre.",
          "**Biotina** (vitamina B7) en dosis altas (>5 mg/día, usada en suplementos cosméticos) puede interferir gravemente con inmunoensayos de TSH: suspender **72 h antes**.",
          "Yodo radiactivo, amiodarona, glucocorticoides y dopamina pueden afectar los niveles de TSH.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 2–3 mL. Estable refrigerada 7 días.",
          "**Método**: **Quimioluminiscencia (CLIA)** o **Electroquimioluminiscencia (ECLIA)** — inmunoensayo de alta sensibilidad generación 3–4 (TSH ultrasensible, detecta hasta 0.001 mUI/L).",
          "El resultado disponible en 30–60 minutos en analizadores automatizados (Roche Cobas, Abbott Architect, Siemens Atellica).",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**TSH normal adultos**: 0.4–4.0 mUI/L (varían ligeramente por laboratorio e instrumento).",
          "**Embarazo**: 1.er trimestre <2.5 mUI/L · 2.do trimestre <3.0 · 3.er trimestre <3.5.",
          "**TSH <0.1**: hipertiroidismo manifiesto o supresión farmacológica. **TSH >10**: hipotiroidismo clínico. **TSH crítica >50**: mixedema — notificar urgente.",
          "TSH normal con síntomas → complementar con **T4 libre y T3 libre**: hipotiroidismo central (TSH baja-normal pero T4 baja) o resistencia a hormonas tiroideas.",
        ],
      },
    ],
  },

  {
    id: "lab-ferritina",
    name: "Ferritina Sérica",
    type: "lab",
    category: "Hematología",
    tags: ["Ferritina", "Hierro", "Anemia", "Depósitos de hierro"],
    keywords: ["ferritina", "hierro", "anemia ferropenica", "depositos", "inflamacion"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Mejor marcador de los depósitos de hierro corporal total**. Proteína de almacenamiento de hierro presente en hígado, bazo y médula ósea.",
          "**Diagnóstico de anemia ferropénica**: ferritina baja (<12–15 ng/mL) es el primer marcador en depleccionarse antes de que caiga el hemograma.",
          "Ferritina elevada como **marcador de fase aguda** en inflamación, infección, enfermedad hepática o hemocromatosis: puede enmascarar una deficiencia de hierro coexistente.",
          "Monitoreo de **sobrecarga de hierro** (hemocromatosis hereditaria, politransfundidos, siderosis transfusional).",
          "**Síndrome de piernas inquietas**: ferritina <75 ng/mL se asocia a síntomas neurológicos mejorados con suplementación.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno** para ferritina aislada.",
          "Registrar **suplementos de hierro oral**: pueden normalizar la ferritina transitoriamente incluso con depósitos bajos.",
          "Infección activa, inflamación sistémica y hepatitis aguda pueden **elevar la ferritina >10 veces** como reactante de fase aguda, enmascarando la ferropenia.",
          "Las **transfusiones recientes** pueden elevar transitoriamente la ferritina.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 2 mL. Estable refrigerada 7 días.",
          "**Método**: inmunoensayo de **quimioluminiscencia (CLIA)** o ECLIA. Alta sensibilidad. Resultado en 30–60 min.",
          "Se solicita frecuentemente junto con **hierro sérico, transferrina y saturación de transferrina** (IST) para perfil completo del metabolismo del hierro.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Adultos**: Hombre 30–300 ng/mL · Mujer premenopaúsica 12–150 ng/mL · Mujer postmenopaúsica 30–300 ng/mL.",
          "**Deficiencia de hierro**: <12 ng/mL (en inflamación, el punto de corte puede subir a <30 ng/mL con PCR elevada).",
          "**Ferritina >1.000 ng/mL**: síndrome hemofagocítico, hemocromatosis, hepatitis severa, sepsis — evaluar causa.",
          "**Ferritina >2.500 ng/mL** en politransfundidos → sobrecarga de hierro con daño orgánico posible → quelación de hierro.",
        ],
      },
    ],
  },

  {
    id: "lab-vitamina-d",
    name: "Vitamina D (25-OH Vitamina D)",
    type: "lab",
    category: "Hormonas",
    tags: ["Vitamina D", "Calcio", "Hueso", "Déficit"],
    keywords: ["vitamina d", "calcidiol", "25oh", "huesos", "calcio", "deficit"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Mide la forma de almacenamiento de vitamina D: **25-hidroxivitamina D (calcidiol)**, el mejor marcador del estado vitamínico D total (suma de D2 + D3).",
          "**Diagnóstico de déficit e insuficiencia** de vitamina D: frecuente en Chile especialmente en invierno, adultos mayores, obesos, personas con escasa exposición solar y pacientes con malabsorción.",
          "Vitamina D esencial para: **absorción intestinal de calcio**, mineralización ósea, función neuromuscular e inmunológica.",
          "Evaluación en: osteoporosis, raquitismo, osteomalacia, enfermedad inflamatoria intestinal, síndrome de malabsorción, enfermedad renal crónica.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno** para la determinación de 25-OH vitamina D.",
          "Registrar suplementos de vitamina D (colecalciferol D3 o ergocalciferol D2) y la dosis: pueden elevar los niveles en días a semanas.",
          "Proteger la muestra de la **luz directa** (la vitamina D es fotosensible): el tubo debe cubrirse o procesarse rápidamente.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 2–3 mL.",
          "**Método**: **CLIA/ECLIA** (inmunoensayo): método más utilizado en laboratorio clínico. **HPLC-MS/MS** (espectrometría de masas): gold standard, diferencia D2 de D3, mayor precisión.",
          "El equipo de quimioluminiscencia mide la unión antígeno-anticuerpo marcado con éster de acridinio o rutenio.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Suficiencia**: ≥30 ng/mL (75 nmol/L). Rango óptimo: 40–60 ng/mL (ENDOCRINE SOCIETY).",
          "**Insuficiencia**: 20–29 ng/mL. **Déficit**: <20 ng/mL. **Déficit severo**: <10 ng/mL.",
          "**Toxicidad** (hipervitaminosis D): >100–150 ng/mL → hipercalcemia, nefrolitiasis, calcificaciones. Riesgo con suplementación excesiva no controlada.",
          "Conversión: ng/mL × 2.496 = nmol/L.",
        ],
      },
    ],
  },

  {
    id: "lab-pcr",
    name: "Proteína C Reactiva (PCR / PCRus)",
    type: "lab",
    category: "Inflamación",
    tags: ["PCR", "Inflamación", "Infección", "Cardiovascular"],
    keywords: ["pcr", "proteina c reactiva", "inflamacion", "infeccion", "pcrus", "cardiovascular"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Marcador de fase aguda** producido por el hígado en respuesta a inflamación, infección, trauma o necrosis tisular. Sube en horas (pico a las 48–72 h) y cae rápido al resolver el proceso.",
          "**PCR convencional** (>3–5 mg/L): diagnóstico y seguimiento de infecciones bacterianas, enfermedades autoinmunes (artritis reumatoide, Crohn), pancreatitis aguda.",
          "**PCR ultrasensible (PCRus, <10 mg/L)**: predictor de **riesgo cardiovascular**. PCRus <1 mg/L: riesgo bajo · 1–3: moderado · >3 mg/L: alto riesgo CV. Complementa el score de Framingham.",
          "Diferencia procesos infecciosos **bacterianos** (PCR muy elevada, >50 mg/L) de **virales** (PCR moderadamente elevada, <20 mg/L). No es absoluto.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno** para PCR convencional.",
          "Para **PCRus** (riesgo cardiovascular): idealmente sin infección activa ni enfermedad inflamatoria aguda (falsamente elevaría el valor). Solicitar en estado basal.",
          "AINEs, estatinas y corticoides pueden **reducir la PCR**. Registrar medicamentos actuales.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 2–3 mL.",
          "**PCR convencional**: inmunoturbidimetría automatizada (Roche, Abbott). Rango de detección: 5–200 mg/L.",
          "**PCR ultrasensible**: ensayo de alta sensibilidad con rango de detección 0.1–10 mg/L. Mismo principio pero con mayor dilución y mayor sensibilidad analítica.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**PCR normal**: <5 mg/L (convencional).",
          "**PCRus para riesgo CV**: <1 mg/L (bajo) · 1–3 mg/L (moderado) · >3 mg/L (alto riesgo).",
          "**Valor de alerta**: PCR >100 mg/L → infección bacteriana severa o sepsis. PCR >200 mg/L → proceso infeccioso o inflamatorio muy severo (notificar urgente).",
          "VHS vs PCR: VHS sube más lento (días) y baja más lento. PCR sube y baja más rápido: **mejor marcador de respuesta aguda al tratamiento antibiótico**.",
        ],
      },
    ],
  },

  {
    id: "lab-orina-completa",
    name: "Orina Completa y Sedimento Urinario",
    type: "lab",
    category: "Uroanálisis",
    tags: ["Orina", "Uroanálisis", "Infección urinaria", "Sedimento"],
    keywords: ["orina", "uroanálisis", "sedimento", "itu", "infeccion urinaria", "proteinuria"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Evaluación inicial de la función renal y del **tracto urinario**: infección (ITU), litiasis, glomerulonefritis, nefropatía diabética, síndrome nefrótico.",
          "**Componentes**: físicoquímico (tira reactiva: pH, densidad, glucosa, proteínas, nitritos, leucoesterasa, sangre, cetonas, bilirrubina, urobilinógeno) + sedimento microscópico.",
          "El **sedimento urinario** evalúa: eritrocitos (glomerulonefritis, cálculos), leucocitos (ITU, pielonefritis), cilindros (nefropatía tubular, glomerular), bacterias, células epiteliales y cristales.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "Recolectar **orina de chorro medio**: el primer y último chorro se descartan (limpian la uretra y no son representativos de la vejiga).",
          "Higiene perineal previa con agua y jabón. No usar antisépticos que puedan contaminar la muestra.",
          "**Recipiente estéril de boca ancha**. La orina debe procesarse dentro de **1–2 horas** post-recolección o refrigerarse hasta 4 horas.",
          "Ideal: **primera micción de la mañana** (más concentrada, mayor rendimiento diagnóstico).",
          "Informar si la mujer está menstruando: los eritrocitos del flujo pueden contaminar la muestra (resultado inválido para hematuria).",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: 10–20 mL en recipiente estéril de rosca. Sin aditivos. Procesamiento máximo 2 h a temperatura ambiente o 4 h refrigerada.",
          "**Tira reactiva**: análisis colorimétrico automatizado de 10–11 parámetros. Lectura en analizador de tirillas o visual (Sysmex UF, Siemens CLINITEK).",
          "**Sedimento**: centrifugación a 400 g × 5 min. Resuspensión del pellet. Análisis con analizador de imagen automatizado o microscopio óptico (400× y 100×).",
          "Nitritos positivos + Leucoesterasa + bacterias visibles: **alta probabilidad de ITU bacteriana** → solicitar urocultivo confirmatorio.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**pH**: 4.5–8.0 (normal 5.0–6.5). **Densidad**: 1.003–1.030. **Proteínas**: negativo (<15 mg/dL).",
          "**Glucosa en orina**: negativo (glucosuria → DM o síndrome de Fanconi). **Cetonas**: negativo (cetonuria → DM descompensada, ayuno, vómitos).",
          "**Eritrocitos en sedimento**: 0–3 por campo. >5/campo → hematuria significativa (evaluar causa: cálculo, tumor, glomerulonefritis).",
          "**Leucocitos**: 0–5 por campo. >10/campo + nitritos positivos → ITU hasta demostrar lo contrario.",
          "**Cilindros hemáticos**: siempre patológicos → glomerulonefritis activa. **Cilindros granulosos/céreos**: nefropatía tubular o crónica.",
        ],
      },
    ],
  },

  {
    id: "lab-psa",
    name: "PSA Total y PSA Libre",
    type: "lab",
    category: "Marcadores Tumorales",
    tags: ["PSA", "Próstata", "Cáncer de próstata", "Marcador tumoral"],
    keywords: ["psa", "prostata", "cancer prostata", "antigeno prostatico", "psa libre"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**PSA (Antígeno Prostático Específico)**: glicoproteína producida exclusivamente por el epitelio prostático. Marcador de cribado y seguimiento del **cáncer de próstata**.",
          "Elevado también en: hiperplasia prostática benigna (HPB), prostatitis, biopsia reciente, tracto urinario instrumentado.",
          "**PSA libre / PSA total (índice F/T)**: el cáncer produce mayor proporción de PSA unido a proteínas (menor PSA libre). Índice <15–25% → mayor probabilidad de cáncer.",
          "Seguimiento de pacientes con **cáncer de próstata en tratamiento**: prostatectomía radical (PSA debe ser indetectable <0.2 ng/mL), radioterapia, hormonoterapia.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "Evitar **eyaculación** 24–48 h antes (puede elevar el PSA transitoriamente).",
          "No realizar **tacto rectal, biopsia ni cistoscopia** en los 3–7 días previos (puede elevar el PSA significativamente).",
          "**Ejercicio intenso en bicicleta** puede elevar el PSA. Evitar 24 h antes.",
          "Los **inhibidores de 5-alfa-reductasa** (finasterida, dutasterida): reducen el PSA un 50% tras 6 meses de uso. Informar al médico para ajuste del valor interpretado.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 3–5 mL. Estable refrigerada 24 h, congelada meses. Evitar hemólisis.",
          "**Método**: inmunoensayo de quimioluminiscencia (CLIA/ECLIA). Alta sensibilidad: detección hasta 0.002 ng/mL (PSA ultrasensible para seguimiento post-prostatectomía).",
          "El **PSA libre** requiere muestra separada o procesamiento especial: la fracción libre es menos estable, procesamiento en 3 h o congelación.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**PSA total**: <4.0 ng/mL (punto de corte clásico para adulto). Sin embargo, el valor se interpreta según **edad**: <60 años →  <2.5 ng/mL; 60-69 años → <3.5 ng/mL.",
          "**Zona gris**: 4–10 ng/mL → solicitar PSA libre. Índice F/T <15% → alta sospecha de cáncer. Índice F/T >25% → más probable HPB.",
          "**PSA >10 ng/mL**: alta probabilidad de cáncer. Derivar a urología para biopsia guiada por eco transuretral.",
          "**Velocidad de PSA**: aumento >0.75 ng/mL/año → factor de riesgo independiente de cáncer.",
          "**Seguimiento post-prostatectomía**: PSA detectable (>0.2 ng/mL) → recidiva bioquímica. Requiere manejo oncológico.",
        ],
      },
    ],
  },

  {
    id: "lab-coagulacion",
    name: "Protrombina (TP/INR) y TTPA",
    type: "lab",
    category: "Coagulación",
    tags: ["Coagulación", "INR", "Protrombina", "TTPA", "Anticoagulación"],
    keywords: ["protrombina", "inr", "ttpa", "coagulacion", "anticoagulacion", "warfarina", "hemostasia"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Tiempo de Protrombina (TP) e INR**: evalúa la **vía extrínseca y común** de la coagulación (factores VII, X, V, II, I). Fundamental para el monitoreo de **anticoagulantes cumarínicos** (warfarina, acenocumarol).",
          "**INR** (International Normalized Ratio): estandariza el TP entre distintos laboratorios e instrumentos. Rango terapéutico anticoagulante: 2.0–3.0 (prótesis mecánica: 2.5–3.5).",
          "**TTPA (Tiempo de Tromboplastina Parcial Activada)**: evalúa la **vía intrínseca** (factores XII, XI, IX, VIII) y la vía común. Monitoreo de **heparina no fraccionada (HNF)**.",
          "Diagnóstico de coagulopatías: hemofilia A (factor VIII bajo → TTPA prolongado), hemofilia B (factor IX), déficit de vitamina K, coagulación intravascular diseminada (CID), hepatopatía severa.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Sin ayuno** requerido para exámenes de coagulación aislados.",
          "La extracción debe ser **limpia y sin traumatismo**: la activación del tejido durante una punción difícil puede contaminar la muestra con factor tisular y acortar el TP/TTPA artificialmente.",
          "Registrar **anticoagulantes actuales**: warfarina, HBPM, heparina IV, apixabán, rivaroxabán, dabigatrán — afectan los resultados e interpretación.",
          "**Lipemia, ictericia o hemólisis** severas pueden interferir con la coagulación turbidimétrica.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: tubo con **citrato de sodio 3.2% (tapa azul celeste)**. Volumen exacto al nivel de la marca (relación sangre:citrato 9:1 es crítica — tubo mal llenado invalida el resultado).",
          "**Invertir suavemente 3–4 veces**. Centrifugación en 30 min a 2.000 g × 15 min. Plasma pobre en plaquetas (PPP).",
          "**TP**: recalcificación del plasma + tromboplastina tisular (factor tisular + fosfolípidos). Tiempo de coagulación en segundos, calculado como INR.",
          "**TTPA**: plasma + activador de superficie (sílice, caolín) + fosfolípidos + recalcificación. Tiempo en segundos, comparado con control normal.",
          "Equipos semiautomáticos o automáticos (Stago STAR, Instrumentation Laboratory): coagulometría fotométrica o mecánica.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**TP normal**: 11–14 s. **INR normal**: 0.8–1.2. INR terapéutico con warfarina: **2.0–3.0** (la mayoría de indicaciones). Meta 2.5–3.5 en válvulas mecánicas mitrales.",
          "**TTPA normal**: 25–38 s. Con heparina terapéutica: 60–100 s (relación 1.5–2.5 × control).",
          "**Valores críticos de INR**: >4.0 → alto riesgo hemorrágico (notificar médico urgente, considerar vitamina K). INR >6.0 → riesgo de hemorragia espontánea.",
          "**TTPA >100 s** sin heparina → CID, hemofilia severa, inhibidores de factores — notificar urgente.",
        ],
      },
    ],
  },

  {
    id: "lab-perfil-hepatico",
    name: "Perfil Hepático (Transaminasas, Bilirrubinas, GGT, FA)",
    type: "lab",
    category: "Bioquímica",
    tags: ["Hígado", "Hepatitis", "Transaminasas", "Bilirrubina", "GGT"],
    keywords: ["hepatico", "transaminasas", "ast", "alt", "sgot", "sgpt", "bilirrubina", "ggt", "fosfatasa", "higado"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Evaluación integral de la **función e integridad del parénquima hepático** y del árbol biliar.",
          "**ALT (SGPT)**: más específica del hepatocito. Elevada en hepatitis viral, tóxica, isquémica, esteatohepatitis (NASH).",
          "**AST (SGOT)**: menos específica (también en músculo, corazón). Elevada en hepatitis, miocarditis, rabdomiólisis. Relación AST/ALT >2 sugiere hepatopatía alcohólica.",
          "**GGT**: marcador sensible de daño hepático y biliar. Elevada en alcoholismo, colestasis, fármacos inductores enzimáticos (fenitoína, barbitúricos).",
          "**Fosfatasa Alcalina (FA)**: elevada en colestasis, enfermedad ósea (metástasis, Paget), embarazo (FA placentaria).",
          "**Bilirrubinas** (total, directa, indirecta): diagnóstico diferencial de ictericia (prehepática, hepática, posthepática).",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Ayuno de 8–10 horas** para bilirrubinas y el perfil completo (reduce la lipemia que puede interferir).",
          "Evitar **consumo de alcohol** 24–72 h antes (eleva GGT y transaminasas).",
          "Registrar todos los **medicamentos y suplementos**: paracetamol (hepatotóxico en altas dosis), estatinas (elevan transaminasas), hierba de San Juan, kava.",
          "**Ejercicio intenso** eleva AST y ALT por daño muscular: evitar 24 h antes.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 5–7 mL. Centrifugación en 30–60 min. Evitar hemólisis (los eritrocitos contienen AST en alta concentración, puede falsamente elevar AST).",
          "**Métodos enzimáticos colorimétricos** automatizados: ALT, AST (NADH → colorimetría UV), GGT (γ-glutamil-p-nitroanilida), FA (p-nitrofenilfosfato), bilirrubinas (método de diazo de Jendrassik-Grof).",
          "**Bilirrubina directa (conjugada)**: bilirrubina soluble en agua, unida a ácido glucurónico en el hígado. **Indirecta (no conjugada)**: unida a albúmina, insoluble en agua.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**ALT**: Hombre <40 U/L · Mujer <35 U/L. **AST**: Hombre <40 U/L · Mujer <32 U/L.",
          "**GGT**: Hombre <55 U/L · Mujer <38 U/L. **FA**: 40–150 U/L (varía con edad y embarazo).",
          "**Bilirrubina total**: <1.2 mg/dL. **Directa**: <0.3 mg/dL. **Indirecta**: <0.8 mg/dL. Ictericia visible si bilirrubina total >2.5 mg/dL.",
          "**ALT >10× el límite superior**: hepatitis aguda severa. **Bilirrubina total >10 mg/dL**: ictericia severa — evaluar origen y causa urgente.",
          "**Relación AST/ALT >2 + GGT elevada**: sugiere hepatopatía alcohólica (síndrome de De Ritis).",
        ],
      },
    ],
  },

  {
    id: "lab-electrolitos",
    name: "Electrolitos Séricos (Sodio, Potasio, Cloro)",
    type: "lab",
    category: "Bioquímica",
    tags: ["Electrolitos", "Sodio", "Potasio", "Homeostasis"],
    keywords: ["electrolitos", "sodio", "potasio", "cloro", "natremia", "kalemia", "hiponatremia", "hiperkalemia"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "**Sodio (Na⁺)**: principal catión extracelular. Regula la osmolaridad plasmática y el volumen. Hipo/hipernatremia: trastornos del agua y sodio frecuentes en UCI y urgencias.",
          "**Potasio (K⁺)**: principal catión intracelular. Regula el potencial de membrana celular, especialmente cardíaco. Hipo/hiperpotasemia: arritmias potencialmente letales.",
          "**Cloro (Cl⁻)**: anión extracelular principal. Evaluación del equilibrio ácido-base y cálculo del anion gap.",
          "Indicados en: pacientes en diuréticos, insuficiencia renal, hepatopatía, vómitos/diarrea severos, hipertensión, estados de shock, terapia con digoxina.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Sin ayuno estricto** para electrolitos aislados, pero si se acompañan de perfil bioquímico, respetar el ayuno correspondiente.",
          "**Evitar hemólisis**: la hemólisis libera K⁺ intracelular y eleva falsamente el potasio (pseudohiperpotasemia). La extracción debe ser limpia, sin compresión prolongada del torniquete ni agitación del tubo.",
          "**Torniquete no más de 1 minuto**: el cierre prolongado provoca acidosis local y eleva el K⁺ hasta 1 mEq/L.",
          "El potasio en suero es 0.2–0.5 mEq/L mayor que en plasma (por liberación plaquetaria durante la coagulación).",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada) o plasma con heparina litio (tapa verde — preferido para K⁺ por menor efecto de plaquetas). 3–5 mL.",
          "**Método**: **potenciometría ion-selectiva (ISE)**: electrodos específicos para Na⁺, K⁺ y Cl⁻. Alta precisión y rapidez (resultado en 2 min en analizadores de urgencia).",
          "Procesamiento inmediato o dentro de 4 h a temperatura ambiente para K⁺ (los eritrocitos liberan K⁺ si la muestra se mantiene sin centrifugar).",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Sodio**: 135–145 mEq/L. Crítico: Na <120 (convulsiones, coma) o >160 mEq/L (deshidratación hiperosmolar severa).",
          "**Potasio**: 3.5–5.0 mEq/L. Crítico: K <2.5 (parálisis, arritmias) o >6.5 mEq/L (fibrilación ventricular — EMERGENCIA CARDÍACA, notificar de inmediato).",
          "**Cloro**: 98–106 mEq/L.",
          "**Anion gap**: Na − (Cl + HCO₃) → Normal: 8–12 mEq/L. Elevado (>12) → acidosis metabólica con anion gap (cetoacidosis, acidosis láctica, intoxicación). Normal → acidosis hiperclorémica.",
        ],
      },
    ],
  },

  {
    id: "lab-vhs",
    name: "Velocidad de Hemosedimentación (VHS / VSG)",
    type: "lab",
    category: "Hematología",
    tags: ["VHS", "VSG", "Inflamación", "Sedimentación"],
    keywords: ["vhs", "vsg", "sedimentacion", "inflamacion", "eritrocitos", "globulos rojos"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Mide la **velocidad a la que sedimentan los eritrocitos** en 1 hora. Marcador inespecífico de inflamación sistémica.",
          "Elevada en: infecciones crónicas (TBC, endocarditis), enfermedades autoinmunes (AR, LES, vasculitis, arteritis de la temporal), neoplasias, anemia, embarazo, paraproteinemias.",
          "Útil para el **seguimiento de enfermedades inflamatorias crónicas**: mide la evolución a lo largo del tiempo mejor que la PCR (cambia más lentamente).",
          "**Diagnóstico de arteritis de la temporal (Horton)**: VHS >50 mm/h en paciente mayor con cefalea temporal y claudicación mandibular → derivar urgente a reumatología.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno**. Puede realizarse en cualquier momento del día.",
          "Registrar: embarazo (VHS fisiológicamente elevada), anemia severa (eleva la VHS por menor efecto rouleaux inhibidor), policitemia (disminuye la VHS).",
          "Medicamentos que **elevan la VHS**: dextrán, anticonceptivos orales. Medicamentos que **reducen la VHS**: corticoides, AAS a altas dosis.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: sangre total con **citrato de sodio 3.8% (tapa negra o azul oscuro)** en proporción 4:1 (sangre:citrato). Volumen exacto — el tubo mal llenado invalida el resultado.",
          "**Método de Westergren**: pipeta de 200 mm llenada con sangre anticoagulada, colocada vertical a temperatura ambiente. Lectura de la columna de plasma transparente a **60 minutos** (mm/h).",
          "Sistemas automáticos (TEST1, Sedimat): misma metodología pero automatizada, resultado en 20–30 min.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Hombre**: <15 mm/h (<50 años) · <20 mm/h (>50 años).",
          "**Mujer**: <20 mm/h (<50 años) · <30 mm/h (>50 años).",
          "**VHS >100 mm/h**: proceso inflamatorio o neoplásico severo. Causas: mieloma múltiple, linfoma, endocarditis bacteriana subaguda, TBC miliar, arteritis de la temporal — investigar siempre.",
          "La VHS sube y baja más **lentamente que la PCR**: útil para monitoreo de enfermedades crónicas pero no para evaluar respuesta aguda al tratamiento.",
        ],
      },
    ],
  },

  {
    id: "lab-bhcg",
    name: "Beta-HCG Cuantitativa (Gonadotropina Coriónica)",
    type: "lab",
    category: "Hormonas",
    tags: ["HCG", "Embarazo", "Ectópico", "Tumores germinales"],
    keywords: ["bhcg", "hcg", "embarazo", "beta hcg", "ectopico", "tumor germinal"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Diagnóstico cuantitativo de **embarazo** (detectable desde 8–10 días post-concepción, antes que un test de orina). Se duplica cada 48–72 h en embarazo viable intrauterino normal.",
          "**Diagnóstico diferencial**: embarazo ectópico (hCG sube más lentamente o estaciona), aborto en evolución (hCG cae), mola hidatiforme (hCG muy elevada: >100.000 mUI/mL).",
          "Marcador tumoral de **tumores de células germinales**: coriocarcinoma, disgerminoma, tumor del seno endodérmico (AFP + hCG), cáncer testicular no seminomatoso.",
          "**Seguimiento post-tratamiento** de mola hidatiforme: beta-hCG debe llegar a 0 en semanas. Persistencia → mola invasora o coriocarcinoma.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**No requiere ayuno**. Puede realizarse en cualquier momento del día.",
          "La hCG también se mide en **orina de primera micción** (test cualitativo de embarazo) con sensibilidad desde 20–25 mUI/mL.",
          "Medicamentos que contienen hCG (inductores de ovulación: Profasi, Ovitrelle): pueden dar **positivo falso** hasta 10–14 días post-inyección.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero (tapa roja/dorada). 2–3 mL. La hCG es estable en suero refrigerado 7 días.",
          "**Método**: inmunoensayo de quimioluminiscencia (ECLIA/CLIA). Detecta específicamente la subunidad beta (evita reacción cruzada con LH, FSH, TSH que comparten la subunidad alfa).",
          "Rango de detección: **1–1.000.000 mUI/mL**. En mola hidatiforme o enfermedad trofoblástica, pueden requerirse diluciones para evitar el efecto gancho (hook effect) que falsamente da un valor bajo.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**No embarazada**: <5 mUI/mL. **Hombre**: <2.5 mUI/mL.",
          "Evolución en embarazo normal: Semana 4: 10–750 · Sem 5: 200–7.200 · Sem 6: 160–32.000 · Sem 8: 3.500–115.000 · Sem 10: 58.000–140.000 · Sem 16 en adelante: 1.400–53.000.",
          "**Zona discriminatoria** (con eco transvaginal): hCG >1.500–2.000 mUI/mL sin saco intrauterino visible → sospecha de embarazo ectópico.",
          "hCG >100.000 mUI/mL en ausencia de embarazo múltiple o fecha concordante → descartar mola hidatiforme.",
        ],
      },
    ],
  },

  // ── PROTOCOLOS DE CONTRASTE ────────────────────────────────────────────────

  {
    id: "cont-creatinemia-tfge",
    name: "Solicitud de Creatinemia y Evaluación de TFGe",
    type: "imaging",
    category: "CONT",
    tags: ["Creatinemia", "TFGe", "CKD-EPI", "Gadolinio", "Contraste iodado", "Metformina"],
    keywords: ["creatinemia", "tfge", "filtración glomerular", "ckd-epi", "contraste", "gadolinio", "metformina", "renal", "tc", "rm"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Establece cuándo solicitar **creatinemia sérica** antes de administrar contraste endovenoso (TC iodado o RM con gadolinio). El resultado tiene vigencia de **30 días**; si está vencido, el examen debe reprogramarse.",
          "Aplica cuando el paciente cumple alguno de estos criterios: edad ≥60 años, diabetes con tratamiento farmacológico, HTA con IECA/ARA-II/diuréticos, ERC o monorreno, trasplante renal, insuficiencia cardíaca, uso de **metformina** (siempre, sin excepción), AINES crónicos o nefrotóxicos, mieloma múltiple o quimioterapia activa.",
          "Si ningún criterio está presente, **no se requiere creatinemia**.",
        ],
      },
      {
        title: "Decisión según TFGe (CKD-EPI)",
        items: [
          "**TFGe ≥ 30 mL/min/1,73 m²**: proceder con el examen. Si usa metformina + TC con yodo: administrar contraste y suspender metformina por **48 h post examen**.",
          "**TFGe < 30 mL/min/1,73 m²**: NO administrar contraste. Derivar al médico solicitante con constancia escrita.",
          "**Diálisis crónica + TC iodado**: puede realizarse con precaución; coordinar el examen antes de la sesión de diálisis.",
          "**Diálisis crónica + gadolinio**: NO administrar. Solo con autorización expresa del médico tratante.",
          "DiagnoPRO utiliza **Dotarem® (gadoterate meglumine)**, agente macrocíclico Grupo II (ACR), de muy bajo riesgo de FSN.",
        ],
      },
      {
        title: "Preparación y Seguridad del Paciente",
        items: [
          "Verificar si el paciente cumple alguno de los criterios clínicos **antes** del examen.",
          "Solicitar o revisar creatinemia vigente (≤30 días). Calcular TFGe con fórmula **CKD-EPI**.",
          "Caso metformina: informar al paciente que debe **suspender la metformina y sus derivados** (Glafornil®, Dimefor®) y no reanudarla hasta 48 h después del examen.",
        ],
      },
    ],
  },

  {
    id: "cont-extravasacion",
    name: "Manejo de Extravasación de Medio de Contraste",
    type: "imaging",
    category: "CONT",
    tags: ["Extravasación", "Contraste iodado", "Gadolinio", "TC", "RM", "Urgencia"],
    keywords: ["extravasacion", "contraste", "infiltracion", "vena", "tejido blando", "tc", "rm", "gadolinio", "yodo"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "La **extravasación** es la infiltración accidental del contraste fuera de la vena hacia tejidos blandos. Puede ocurrir con inyección manual o automática y requiere **manejo inmediato**.",
          "Signos de alerta: **dolor o ardor** en el sitio de punción, **inflamación o aumento de volumen** local, enrojecimiento o cambio de coloración de la piel, sensación de calor localizado, aumento de presión en el inyector automático (TC).",
          "Ante el primer signo: **DETENER la inyección de inmediato**, sin esperar confirmación.",
        ],
      },
      {
        title: "Protocolo de Manejo Inmediato",
        items: [
          "**Paso 1**: Suspender la inyección al primer signo de alerta.",
          "**Paso 2**: Retirar el acceso venoso. En RM: no intentar aspirar el contraste extravasado.",
          "**Paso 3**: Aplicar compresas frías sobre la zona afectada durante 15–20 minutos.",
          "**Paso 4 TC**: Elevar la extremidad por sobre el nivel del corazón + tomar **RX local** para evaluar extensión y descartar compromiso profundo.",
          "**Paso 4 RM**: Elevar la extremidad. **No se requiere RX**; evaluación es exclusivamente clínica.",
          "**Paso 5**: Monitorear al paciente hasta resolución completa. Sin mejoría → derivar a servicio médico.",
          "**Paso 6**: Registrar el evento en el sistema: volumen extravasado estimado, síntomas, medidas aplicadas y evolución.",
        ],
      },
      {
        title: "Criterios de Derivación a Urgencias",
        items: [
          "Extravasación de volumen significativo.",
          "Dolor intenso persistente o que aumenta progresivamente tras las medidas iniciales.",
          "Aparición de ampollas, necrosis cutánea o cambio de coloración severo (piel pálida o cianótica).",
          "Compromiso neurovascular: hormigueo, pérdida de sensibilidad o limitación del movimiento.",
          "Paciente anticoagulado o con alteraciones de coagulación conocidas.",
          "Ausencia de mejoría clínica tras **30 minutos** de manejo local. Activar protocolo AOC2.1-1.",
        ],
      },
      {
        title: "Medidas Preventivas",
        items: [
          "Verificar permeabilidad de la vía venosa con **lavado de suero fisiológico** antes de conectar el inyector.",
          "Calibre adecuado: **20G** TC general, **18G** angiografía, **22–24G** RM.",
          "Asegurarse de que la vía esté correctamente fijada y sin signos de infiltración previa.",
          "Monitorear visualmente la zona de punción **durante toda la inyección**.",
          "Preferir venas de buen calibre en fosa antecubital; evitar venas frágiles o de difícil acceso.",
        ],
      },
    ],
  },

  {
    id: "cont-reacciones-adversas",
    name: "Clasificación y Manejo de Reacciones Adversas a Contraste",
    type: "imaging",
    category: "CONT",
    tags: ["Reacción adversa", "Anafilaxia", "Contraste", "Emergencia", "Hidrocortisona", "Clorfenamina"],
    keywords: ["reaccion adversa", "anafilaxia", "contraste", "alergica", "shock", "broncoespasmo", "urticaria", "hipotension", "emergencia"],
    sections: [
      {
        title: "Clasificación de Reacciones Adversas",
        items: [
          "🟡 **LEVE**: náuseas/vómitos leves, prurito localizado, urticaria leve, rubor. Autolimitadas, generalmente sin tratamiento farmacológico.",
          "🟠 **MODERADA**: broncoespasmo leve, hipotensión moderada (PA 80–90 mmHg), edema facial sin compromiso de vía aérea, urticaria generalizada, taquicardia/bradicardia sin compromiso hemodinámico.",
          "🔴 **GRAVE**: laringoespasmo, edema de glotis, shock anafiláctico, arritmias graves, pérdida de conciencia, paro cardiorrespiratorio. Comprometen la vida.",
          "⚫ **FATAL**: paro cardiorrespiratorio refractario. Activación inmediata de protocolo de emergencias y soporte vital obligatorio.",
          "Las reacciones pueden presentarse **durante la inyección o en el período de observación posterior**.",
        ],
      },
      {
        title: "Manejo Clínico por Nivel",
        items: [
          "🟡 **Leve**: Detener inyección si aún activa → tranquilizar al paciente → sala de recuperación → monitorizar signos vitales → observar **30 min** → alta si síntomas ceden.",
          "🟠 **Moderada**: Detener inyección → llamar al radiólogo/director técnico → acceso venoso permeable → administrar **Hidrocortisona 200 mg EV** + **Clorfenamina 10 mg EV** → observar **60 min** → si no mejora en 15–20 min, escalar a manejo grave.",
          "🔴 **Grave**: Detener inyección → **ACTIVAR protocolo AOC2.1-1** → no dejar solo al paciente → posición decúbito supino con piernas elevadas (shock) o semisentado (disnea) → oxígeno 6–10 L/min → mantener vía venosa → RCP avanzado si paro cardiorrespiratorio.",
          "Siempre registrar el evento, incluso si es leve y se resuelve sin intervención farmacológica.",
        ],
      },
      {
        title: "Medicamentos de Emergencia Autorizados",
        items: [
          "**Hidrocortisona 200 mg EV**: indicada en reacción moderada. Corticoide para reducir respuesta inflamatoria.",
          "**Clorfenamina 10 mg EV**: indicada en reacción moderada. Antihistamínico H1 para síntomas alérgicos.",
          "Ante reacción **grave**: la conducta es derivación inmediata a urgencias + RCP avanzado si corresponde. Los medicamentos autorizados por DiagnoPRO son solo para reacciones moderadas.",
        ],
      },
      {
        title: "Criterios de Alta",
        items: [
          "🟡 **Leve**: observación mínima 30 min desde resolución; signos vitales estables.",
          "🟠 **Moderada**: observación mínima 60 min desde tratamiento; evaluación médica favorable.",
          "🔴 **Grave**: alta exclusiva del equipo de urgencias que recibe al paciente. No puede retirarse sin evaluación médica externa.",
        ],
      },
    ],
  },

  {
    id: "cont-indicaciones-post-examen",
    name: "Indicaciones Post Examen con Contraste",
    type: "imaging",
    category: "CONT",
    tags: ["Post examen", "Contraste", "Alta", "Metformina", "Síntomas de alarma"],
    keywords: ["post examen", "contraste", "alta", "metformina", "hidratacion", "sintomas alarma", "indicaciones", "tc", "rm"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Establece las instrucciones que deben entregarse al paciente al finalizar un examen con contraste endovenoso (TC iodado o RM con gadolinio) para favorecer la **eliminación del contraste**, prevenir complicaciones tardías y orientar ante síntomas posteriores.",
        ],
      },
      {
        title: "Indicaciones Generales (TC y RM)",
        items: [
          "Puede retomar sus **actividades habituales de forma inmediata** después del procedimiento.",
          "Beber aproximadamente **2 litros de agua al día** durante los próximos 2 a 3 días para favorecer la eliminación del contraste por la orina.",
        ],
      },
      {
        title: "Indicación Especial: Metformina",
        items: [
          "Aplica **únicamente a TC con contraste iodado**. NO aplica a RM con gadolinio.",
          "Si el paciente usa Metformina (Glafornil®, Dimefor® u otros derivados): mantener la **suspensión del medicamento durante 48 horas** posteriores al examen.",
          "Fundamento: la metformina puede acumularse en presencia de deterioro renal transitorio post contraste iodado, aumentando el riesgo de **acidosis láctica**.",
        ],
      },
      {
        title: "Síntomas de Alarma — Consultar Urgencias",
        items: [
          "**Dificultad para respirar** o sensación de ahogo → reacción anafiláctica tardía.",
          "**Hinchazón de rostro, labios o lengua** → angioedema / reacción alérgica tardía.",
          "**Urticaria, picazón intensa o sarpullido** generalizado → reacción cutánea tardía.",
          "**Náuseas o vómitos persistentes** → reacción sistémica tardía.",
          "**Dolor, enrojecimiento, hinchazón o calor en el brazo** donde se aplicó el contraste → extravasación tardía/flebitis.",
          "Ante cualquiera de estos síntomas: acudir directamente al **servicio de urgencias más cercano**. No esperar a que empeoren.",
        ],
      },
    ],
  },

  {
    id: "lab-vitamina-b12",
    name: "Vitamina B12 (Cobalamina)",
    type: "lab",
    category: "Hematología",
    tags: ["Vitamina B12", "Cobalamina", "Anemia macrocítica", "Neurológico"],
    keywords: ["vitamina b12", "cobalamina", "anemia macrocítica", "vegano", "neurologico", "deficit"],
    sections: [
      {
        title: "¿Para qué sirve?",
        items: [
          "Diagnóstico de **déficit de vitamina B12**: causa de anemia macrocítica megaloblástica y neuropatía periférica/medular (subaguda combinada medular).",
          "Grupos de riesgo: vegetarianos/veganos estrictos, adultos mayores (gastritis atrófica → déficit de factor intrínseco), gastrectomizados, pacientes con enfermedad inflamatoria intestinal o resección ileal, uso crónico de metformina o IBPs.",
          "Puede presentarse como: **anemia con VCM >100 fL**, glositis, parestesias, ataxia, demencia, psicosis — clínica neurológica puede ocurrir sin anemia.",
        ],
      },
      {
        title: "Preparación Pre-analítica",
        items: [
          "**Ayuno de 8 horas** recomendado (aunque no estrictamente necesario para B12 aislada).",
          "Registrar **suplementos de B12**: cyanocobalamina oral, hidroxocobalamina IM. Pueden normalizar los niveles plasmáticos incluso con déficit tisular.",
          "**Metformina crónica** (>4 años): puede reducir la absorción de B12 por mecanismo de receptor de calcio ileal — monitorear anualmente en diabéticos.",
        ],
      },
      {
        title: "Muestra y Procesamiento",
        items: [
          "**Muestra**: suero protegido de la luz. Tapa roja/dorada. 2–3 mL. Estable en oscuridad y refrigerada 24 h.",
          "**Método**: quimioluminiscencia competitiva. El factor intrínseco marcado compite con la B12 de la muestra por los sitios de unión. Mayor B12 en la muestra → menor señal del marcador.",
          "Complementar con **Ácido Metilmalónico (AMM)** y **Homocisteína** si la B12 está en rango bajo-normal (200–400 pg/mL) y hay sospecha clínica: ambos se elevan en déficit funcional de B12 incluso con niveles plasmáticos normales.",
        ],
      },
      {
        title: "Valores de Referencia y Alertas",
        items: [
          "**Normal**: 200–900 pg/mL (148–664 pmol/L).",
          "**Déficit**: <200 pg/mL. **Zona gris** (déficit funcional posible): 200–300 pg/mL → complementar con AMM y homocisteína.",
          "**Valores muy bajos** (<100 pg/mL): déficit severo con alta probabilidad de daño neurológico — tratar con hidroxocobalamina IM de inmediato.",
          "**Elevación** de B12 (>1.000 pg/mL): puede indicar: leucemia mieloproliferativa, hepatopatía, suplementación excesiva — investigar causa.",
        ],
      },
    ],
  },

];

export function searchStudyCards(query: string): StudyCard[] {
  if (!query.trim()) return studyCards;
  const q = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return studyCards.filter((card) => {
    const searchable = [
      card.name,
      card.category,
      ...card.tags,
      ...card.keywords,
      ...card.sections.flatMap((s) => [s.title, ...s.items]),
    ].join(" ").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return searchable.includes(q);
  });
}

/**
 * Maps each imaging exam name to the list of body zones / structures it covers.
 * Used to power the "¿Qué incluye?" chip display and the zone-based search.
 */
export const examCovers: Record<string, string[]> = {

  // ── RESONANCIA MAGNÉTICA ─────────────────────────────────────────────────

  "Resonancia Magnética Cráneo Encefálica": ["Cerebro", "Corteza cerebral", "Ventrículos", "Cuerpo calloso", "Ganglios basales", "Tronco encefálico"],
  "Resonancia Magnética de Oídos (bilateral)": ["Oído interno", "Oído medio", "Conducto auditivo interno", "Nervio auditivo", "Cóclea", "Canales semicirculares"],
  "Resonancia Magnética Cerebro Fosa Posterior": ["Cerebelo", "Tronco encefálico", "IV ventrículo", "Puente de Varolio", "Bulbo raquídeo"],
  "Resonancia Magnética Hipotálamo-Hipófisis-Silla Turca": ["Hipófisis", "Hipotálamo", "Silla turca", "Glándula pituitaria", "Quiasma óptico"],
  "Resonancia Magnética de Órbitas": ["Globos oculares", "Músculos extraoculares", "Nervio óptico", "Párpados", "Grasa orbitaria"],
  "Resonancia Magnética Articulaciones Temporomandibulares (ATM)": ["Mandíbula", "Articulación temporomandibular (ATM)", "Cóndilos mandibulares", "Disco articular", "Dolor de mandíbula", "Trismus"],
  "Resonancia Magnética Columna Cervical": ["Vértebras cervicales (C1–C7)", "Médula espinal cervical", "Discos intervertebrales", "Raíces nerviosas", "Ligamentos cervicales"],
  "Resonancia Magnética Columna Dorsal": ["Vértebras torácicas (T1–T12)", "Médula espinal dorsal", "Discos intervertebrales", "Parrilla costal", "Canal medular"],
  "Resonancia Magnética Columna Lumbar": ["Vértebras lumbares (L1–L5)", "Sacro", "Discos lumbares", "Hernia del núcleo pulposo", "Raíces nerviosas", "Cola de caballo"],
  "Resonancia Magnética Columna Total (Cervical, Dorsal, Lumbar)": ["Columna cervical completa", "Columna dorsal completa", "Columna lumbar completa", "Médula espinal total", "Todos los discos intervertebrales"],
  "Resonancia Magnética de Tórax": ["Mediastino", "Pulmones", "Aorta torácica", "Esófago", "Tráquea", "Ganglios mediastínicos"],
  "Resonancia Magnética de Abdomen": ["Hígado", "Páncreas", "Riñones", "Bazo", "Suprarrenales", "Vías biliares", "Aorta abdominal"],
  "Resonancia Magnética Renal": ["Riñón derecho", "Riñón izquierdo", "Glándulas suprarrenales", "Venas y arterias renales", "Pelvis renal"],
  "Resonancia Magnética de Pelvis / Defecografía": ["Útero", "Ovarios", "Próstata", "Vejiga", "Recto", "Piso pélvico", "Defecografía funcional"],
  "Resonancia Magnética de Próstata": ["Glándula prostática", "Vesículas seminales", "Ganglios pélvicos", "Vejiga", "Uretra proximal"],
  "Resonancia Magnética de Abdomen y Pelvis": ["Hígado", "Páncreas", "Riñones", "Bazo", "Suprarrenales", "Útero", "Ovarios", "Próstata", "Vejiga", "Recto"],
  "Resonancia Magnética Osteoarticular de Huesos Pélvicos": ["Pelvis ósea", "Coxis", "Articulaciones coxofemorales", "Sacro", "Isquion", "Pubis"],
  "Resonancia Magnética Osteoarticular de Sacroilíacas": ["Articulaciones sacroilíacas", "Sacro", "Ilion", "Lumbar baja"],
  "Resonancia Magnética Osteoarticular de Sacrocoxis": ["Sacro", "Coxis", "Región sacrocoxígea"],
  "Resonancia Magnética de Glúteo": ["Músculos glúteos", "Nervio ciático", "Articulación sacroilíaca", "Región isquioglútea"],
  "Resonancia Magnética de Corazón": ["Cavidades cardíacas", "Válvulas cardíacas", "Miocardio", "Pericardio", "Función ventricular"],
  "Resonancia Magnética Cardíaca": ["Cavidades cardíacas", "Válvulas cardíacas", "Miocardio", "Pericardio", "Función ventricular"],
  "Resonancia Magnética Articulación Acromioclavicular": ["Articulación acromioclavicular", "Clavícula", "Acromion", "Ligamentos acromioclaviculares"],
  "Resonancia Magnética Articulación Esternoclavicular": ["Articulación esternoclavicular", "Esternón", "Clavícula medial"],
  "Resonancia Magnética de Clavículas": ["Clavícula", "Articulación acromioclavicular", "Articulación esternoclavicular", "Tejidos blandos adyacentes"],
  "Resonancia Magnética de Costillas": ["Costillas", "Pared torácica", "Articulaciones costocondrales", "Cartílagos costales"],
  "Resonancia Magnética de Esternón": ["Esternón", "Articulaciones costocondrales", "Manubrio", "Xifoides"],
  "Resonancia Magnética de Escápula": ["Escápula (omóplato)", "Articulación glenohumeral", "Fosa supraespinosa", "Fosa infraespinosa"],
  "Resonancia Magnética Pared Torácica": ["Pared torácica", "Costillas", "Esternón", "Músculos intercostales", "Tejidos blandos torácicos"],
  "Resonancia Magnética de Genitales Internos y Gastrointestinal": ["Genitales internos femeninos", "Útero", "Ovarios", "Intestino delgado", "Colon", "Recto"],
  "Resonancia Magnética de Rodilla": ["Menisco interno", "Menisco externo", "Ligamento cruzado anterior (LCA)", "Ligamento cruzado posterior (LCP)", "Cartílago articular", "Ligamentos laterales", "Tendón rotuliano"],
  "Resonancia Magnética de Mano o Muñeca": ["Huesos del carpo", "Metacarpos", "Falanges", "Tendones flexores y extensores", "Ligamento escafolunar", "Nervio mediano (túnel carpiano)", "Muñeca", "Mano"],
  "Resonancia Magnética de Antebrazo o Brazo": ["Radio", "Cúbito", "Húmero", "Tejidos blandos", "Músculos del antebrazo", "Músculos del brazo"],
  "Resonancia Magnética de Codo": ["Articulación del codo", "Epicóndilo (codo de tenista)", "Epitróclea (codo de golfista)", "Tendón distal del bíceps", "Ligamentos colaterales", "Nervio cubital"],
  "Resonancia Magnética de Hombro": ["Manguito rotador", "Supraespinoso", "Infraespinoso", "Subescapular", "Labrum glenoideo", "Articulación glenohumeral", "Tendón del bíceps"],
  "Resonancia Magnética de Pie, Antepié o Tobillo": ["Tendón de Aquiles", "Ligamentos del tobillo", "Huesos del tarso", "Metatarsos", "Falanges", "Fascia plantar", "Nervio tibial posterior"],
  "Resonancia Magnética de Pierna": ["Tibia", "Peroné", "Músculos de la pierna", "Tejidos blandos", "Compartimentos musculares"],
  "Resonancia Magnética de Muslo o Cadera (Unilateral)": ["Cadera", "Cabeza femoral", "Acetábulo", "Labrum coxofemoral", "Fémur proximal", "Músculos del muslo", "Tendones isquiotibiales"],
  "Colangioresonancia Magnética": ["Vías biliares intrahepáticas", "Vía biliar principal", "Vesícula biliar", "Conducto de Wirsung", "Colédoco", "Ampolla de Vater"],
  "Protocolo PEP (Resonancia Magnética)": ["Pelvis completa", "Estructuras pélvicas múltiples", "Protocolo combinado especial"],

  // ── TAC ──────────────────────────────────────────────────────────────────

  "TAC Cráneo Encefálica (Cerebro)": ["Cerebro", "Ventrículos", "Estructuras craneales", "Cráneo óseo"],
  "TAC Hipotálamo-Hipófisis": ["Hipófisis", "Silla turca", "Hipotálamo", "Región paraselar"],
  "TAC Fosa Posterior": ["Cerebelo", "Tronco encefálico", "IV ventrículo"],
  "TAC Temporal-Oído": ["Huesos temporales", "Oído interno", "Oído medio", "Cóclea", "Mastoides"],
  "TAC Cavidades Perinasales (CPN)": ["Senos paranasales", "Seno maxilar", "Seno frontal", "Seno etmoidal", "Seno esfenoidal", "Fosas nasales", "Tabique nasal", "Cornetes"],
  "TAC Órbitas / Maxilofacial": ["Órbitas oculares", "Globo ocular", "Huesos de la cara", "Maxilar", "Mandíbula", "Pómulos"],
  "TAC Columna Cervical": ["Vértebras cervicales", "Canal medular", "Discos intervertebrales", "Foramenes neurales"],
  "TAC Columna Dorsal (mínimo 6 espacios)": ["Vértebras torácicas", "Canal medular dorsal", "Discos dorsales"],
  "TAC Columna Lumbar": ["Vértebras lumbares", "Discos lumbares", "Canal medular lumbar", "Articulaciones facetarias"],
  "TAC Cuello (Partes Blandas)": ["Tiroides", "Paratiroides", "Ganglios cervicales", "Glándulas salivales", "Laringe", "Faringe", "Vasos del cuello"],
  "TAC de Tórax Completo": ["Esternón", "Clavículas", "Escápula", "Costillas (bilateral)", "Articulaciones torácicas", "Pulmones", "Mediastino", "Pared torácica"],
  "TAC de Abdomen": ["Hígado", "Vías biliares", "Vesícula biliar", "Páncreas", "Bazo", "Glándulas suprarrenales", "Riñones", "Aorta abdominal"],
  "TAC Musculoesquelética": ["Muslo", "Pierna", "Rodillas (bilateral)", "Antebrazo", "Codo", "Muñeca", "Mano", "Hombro", "Pie", "Tobillo", "Articulaciones de extremidades"],
  "TAC de Pelvis": ["Sacro", "Coxis", "Caderas (bilateral)", "Huesos pélvicos", "Articulaciones sacroilíacas", "Acetábulo"],
  "TAC de Abdomen y Pelvis": ["Hígado", "Páncreas", "Bazo", "Riñones", "Suprarrenales", "Aorta abdominal", "Sacro", "Caderas", "Huesos pélvicos", "Útero", "Próstata"],
  "TAC de Tórax, Abdomen y Pelvis": ["Pulmones", "Mediastino", "Hígado", "Páncreas", "Riñones", "Bazo", "Pelvis completa", "Estudio oncológico completo", "Revisión total"],
  "Pielografía por TAC": ["Riñones", "Uréteres", "Vejiga", "Vías urinarias con contraste"],
  "Urografía por TAC (UroTAC)": ["Riñones", "Uréteres completos", "Vejiga", "Vías urinarias superiores e inferiores"],
  "AngioTAC de Cuello": ["Arteria carótida derecha", "Arteria carótida izquierda", "Arterias vertebrales", "Vasos del cuello"],
  "AngioTAC de Pelvis": ["Arterias ilíacas", "Arteria ilíaca común", "Arteria ilíaca interna", "Arteria ilíaca externa", "Vasos pélvicos"],
  "AngioTAC de Encéfalo": ["Polígono de Willis", "Arteria cerebral media", "Arteria cerebral anterior", "Arteria cerebral posterior", "Aneurismas cerebrales", "Malformaciones vasculares"],
  "AngioTAC de Tórax": ["Aorta torácica", "Arterias pulmonares", "TEP (tromboembolismo pulmonar)", "Tronco de la pulmonar"],
  "AngioTAC de Abdomen": ["Aorta abdominal", "Arterias renales", "Arteria mesentérica superior", "Arteria mesentérica inferior", "Arterias celíacas"],
  "AngioTAC de Extremidades Inferiores (bilateral)": ["Arterias femorales", "Arteria poplítea", "Arteria tibial", "Arterias de ambas piernas", "Circulación arterial de extremidades inferiores"],
  "AngioTAC de Extremidad Superior (unilateral)": ["Arteria braquial", "Arteria radial", "Arteria cubital", "Circulación arterial del brazo"],

  // ── ECOGRAFÍA ────────────────────────────────────────────────────────────

  "Ecografía Abdominal": ["Hígado", "Vesícula biliar", "Vías biliares", "Páncreas", "Bazo", "Riñones", "Aorta abdominal"],
  "Ecografía Abdominal y Pelviana Femenina": ["Hígado", "Vesícula", "Páncreas", "Bazo", "Riñones", "Útero", "Ovarios", "Trompas de Falopio", "Vejiga", "Fondo de saco"],
  "Ecografía Abdominal y Pelviana Masculina": ["Hígado", "Vesícula", "Páncreas", "Bazo", "Riñones", "Próstata", "Vejiga", "Vesículas seminales"],
  "Ecografía Renal y Vesical Femenina": ["Riñón derecho", "Riñón izquierdo", "Vejiga", "Uréteres distales", "Residuo postmiccional"],
  "Ecografía Renal y Vesical Masculina": ["Riñón derecho", "Riñón izquierdo", "Vejiga", "Próstata", "Uréteres distales"],
  "Ecografía Pelviana Femenina": ["Útero", "Endometrio", "Ovario derecho", "Ovario izquierdo", "Fondo de saco de Douglas", "Vejiga"],
  "Ecografía Pélvica Masculina (Prostática)": ["Próstata", "Vejiga", "Vesículas seminales", "Uretra proximal"],
  "Ecografía Renal Bilateral o de Bazo": ["Riñón derecho", "Riñón izquierdo", "Bazo", "Suprarrenales"],
  "Ecografía Mamaria Bilateral (incluye Doppler)": ["Mama derecha", "Mama izquierda", "Ganglios axilares", "Tejido adiposo mamario", "Ductos mamarios"],
  "Ecografía Testicular (uni o bilateral, incluye Doppler)": ["Testículo derecho", "Testículo izquierdo", "Epidídimo", "Varicocele", "Torsión testicular"],
  "Ecografía Tiroidea (incluye Doppler)": ["Lóbulo tiroideo derecho", "Lóbulo tiroideo izquierdo", "Istmo", "Paratiroides", "Ganglios cervicales", "Nódulos tiroideos"],
  "Ecografía de Partes Blandas / Musculoesquelética (ATM)": [
    "Mano", "Muñeca", "Dedo", "Codo", "Hombro", "Rodilla", "Tobillo", "Pie",
    "Articulación Temporomandibular (ATM / mandíbula)", "Cuello", "Axila",
    "Ingle", "Nódulo o quiste superficial", "Músculo o tendón", "Hernia inguinal",
    "Ganglio superficial", "Lipoma", "Fístula superficial"
  ],
  "Ecografía Inguinal": ["Ingle derecha", "Ingle izquierda", "Hernia inguinal", "Hernia femoral", "Ganglios inguinales", "Cordón espermático"],
  "Ecografía de Pared Abdominal": ["Pared abdominal anterior", "Hernia umbilical", "Hernia epigástrica", "Hernia incisional", "Diastasis de rectos"],
  "Doppler Vascular Periférico (arterial y venoso, bilateral)": ["Arteria femoral", "Arteria poplítea", "Arteria tibial", "Vena femoral", "Vena poplítea", "Extremidades inferiores bilateral", "Extremidades superiores bilateral"],
  "Doppler Venoso por Insuficiencia o Várices (EEII)": ["Vena safena interna", "Vena safena externa", "Venas perforantes", "Várices de piernas", "Insuficiencia venosa crónica"],
  "Doppler por Trombosis Venosa Profunda (TVP)": ["Vena femoral", "Vena poplítea", "Venas tibiales", "Trombosis venosa profunda", "Vena ilíaca"],
  "Doppler Carotídeo / Vasos del Cuello": ["Arteria carótida común", "Arteria carótida interna", "Arteria carótida externa", "Arteria vertebral", "Ateromatosis carotídea", "Placas ateromatosas"],
  "Doppler Testicular": ["Testículo", "Varicocele", "Torsión testicular", "Epidídimo", "Flujo vascular testicular"],
  "Doppler Renal": ["Arteria renal derecha", "Arteria renal izquierda", "Vena renal", "Estenosis de arteria renal"],
  "Doppler Abdominal": ["Aorta abdominal", "Vena cava inferior", "Arteria mesentérica superior", "Vena porta", "Arteria hepática"],
  "Elastografía Hepática": ["Hígado", "Fibrosis hepática", "Cirrosis hepática", "Esteatosis hepática", "Rigidez hepática"],

  // ── RADIOGRAFÍA ──────────────────────────────────────────────────────────

  "Radiografía de Partes Blandas / Laringe / Cavum / Rinofaringe": ["Tejidos blandos del cuello", "Laringe", "Faringe", "Rinofaringe", "Cavum", "Vías respiratorias superiores", "Adenoides"],
  "Radiografía CPN / Órbitas / ATM / Huesos Nasales / Malar / Maxilar / Cara": [
    "Senos paranasales (CPN)", "Seno maxilar", "Seno frontal", "Seno etmoidal",
    "Órbitas oculares", "Articulación Temporomandibular (ATM)",
    "Huesos nasales", "Pómulos (malar)", "Maxilar superior", "Huesos de la cara",
    "Fracturas faciales"
  ],
  "Radiografía de Extremidades (brazo, antebrazo, codo, muñeca, mano, dedos, pie)": [
    "Brazo (húmero)", "Antebrazo (radio y cúbito)", "Codo", "Muñeca", "Mano", "Dedos de la mano",
    "Pie", "Dedos del pie", "Metatarso", "Tarso"
  ],
  "Radiografía Hombro / Fémur / Rodilla / Pierna / Costilla / Esternón / Escápula": [
    "Hombro", "Fémur", "Rodilla", "Pierna (tibia y peroné)", "Costilla", "Esternón", "Escápula (omóplato)"
  ],
  "Radiografía Proyecciones Especiales (oblicuas, rótulas, sesamoideos, Rosemberg)": [
    "Rótula (proyección tangencial)", "Huesos sesamoideos del pie", "Hombro (proyección Y)", "Rodilla (Rosemberg)", "Codo (oblicuas)", "Proyecciones especiales varias"
  ],
  "Radiografía Túnel Intercondíleo o Radio-Carpiano": ["Túnel intercondíleo de la rodilla", "Articulación radio-carpiana de la muñeca"],
  "Radiografía de Cadera / Coxofemoral / Pelvis": ["Cadera derecha", "Cadera izquierda", "Pelvis completa", "Acetábulo", "Cabeza del fémur"],
  "Radiografía Pelvis/Cadera de Recién Nacido o Niño < 6 años": ["Caderas en lactante", "Displasia de cadera", "Desarrollo de caderas", "Pelvis en niño"],
  "Radiografía Pelvis/Cadera Proyecciones Especiales": ["Cadera en rotación interna", "Cadera en abducción", "Proyección lateral de cadera", "Proyección Lawenstein"],
  "Radiografía Articulaciones Sacroilíacas / Sacrocoxis": ["Articulaciones sacroilíacas", "Sacro", "Coxis"],
  "Radiografía Columna Cervical o Atlas-Axis (frontal y lateral)": ["Atlas (C1)", "Axis (C2)", "Columna cervical alta", "Odontoides"],
  "Radiografía Columna Cervical (frontal, lateral y oblicuas)": ["Columna cervical completa (C1–C7)", "Foramenes intervertebrales cervicales", "Discos cervicales"],
  "Radiografía Columna Cervical Flexión y Extensión (dinámicas)": ["Inestabilidad cervical", "Movimiento columna cervical", "C1–C7 en movimiento"],
  "Radiografía Columna Dorsal / Dorsolumbar / Parrilla Costal": ["Columna dorsal (T1–T12)", "Columna dorsolumbar", "Parrilla costal", "Costillas"],
  "Radiografía Columna Lumbar o Lumbosacra (frontal, lateral, focalizada)": ["Columna lumbar (L1–L5)", "Unión lumbosacra (L5–S1)", "Espacio L5–S1"],
  "Radiografía Columna Lumbar Flexión y Extensión (dinámicas)": ["Inestabilidad lumbar", "Espondilolistesis dinámica", "L1–L5 en movimiento"],
  "Radiografía Columna Total AP/LAT Panorámica con Folio Graduado": ["Columna completa (cervical, dorsal y lumbar)", "Escoliosis", "Medición de curvas", "Longitud de columna"],
  "Teleradiografía de Extremidades Inferiores": ["Longitud de miembros inferiores", "Pierna derecha", "Pierna izquierda", "Dismetría de extremidades"],
  "Radiografía Edad Ósea: Carpo y Mano": ["Maduración ósea de la mano", "Carpo", "Metacarpos", "Falanges", "Edad ósea en niños"],
  "Radiografía Edad Ósea: Rodilla Frontal": ["Maduración ósea de rodilla", "Epífisis distal del fémur", "Epífisis proximal de la tibia"],
  "Radiografía Estudio de Escafoides": ["Hueso escafoides", "Fractura de escafoides", "Muñeca (navicular)"],
  "Radiografía Muñeca Derecha AP-LAT-OBL": ["Muñeca derecha", "Huesos del carpo derecho", "Radio distal derecho", "Cúbito distal derecho"],
  "Radiografía Muñeca Izquierda AP-LAT-OBL": ["Muñeca izquierda", "Huesos del carpo izquierdo", "Radio distal izquierdo", "Cúbito distal izquierdo"],
  "Radiografía Tobillo Derecho AP-LAT-OBL": ["Tobillo derecho", "Tibia distal derecha", "Peroné distal derecho", "Astrágalo derecho"],
  "Radiografía Tobillo Izquierdo AP-LAT-OBL": ["Tobillo izquierdo", "Tibia distal izquierda", "Peroné distal izquierdo", "Astrágalo izquierdo"],

  // ── MAMOGRAFÍA ───────────────────────────────────────────────────────────

  "Mamografía Bilateral": ["Mama derecha", "Mama izquierda", "Craniocaudal bilateral", "Oblicua bilateral", "Screening mamario"],
  "Mamografía Unilateral": ["Una mama (derecha o izquierda)", "Craniocaudal", "Oblicua mediolateral"],
  "Mamografía Proyección Complementaria": ["Zona específica de una mama", "Proyección focalizada", "Proyección magnificada"],

  // ── CARDIOLOGÍA ──────────────────────────────────────────────────────────

  "Electrocardiograma (ECG)": ["Actividad eléctrica del corazón", "Ritmo cardíaco", "Frecuencia cardíaca", "Infarto", "Arritmias"],
  "Holter de Ritmo Cardíaco (24 horas)": ["Ritmo cardíaco continuo 24 horas", "Arritmias intermitentes", "Palpitaciones", "Síncope cardíaco"],
  "Holter de Presión Arterial (MAPA 24 horas)": ["Presión arterial ambulatoria 24 horas", "Hipertensión arterial", "Monitoreo presión día y noche"],
};

/**
 * Returns the covers list for an exam, or empty array if not found.
 */
export function getExamCovers(examName: string): string[] {
  return examCovers[examName] ?? [];
}

/**
 * Returns true if any cover item matches the given normalized query.
 */
export function examMatchesZone(examName: string, normalizedQuery: string): boolean {
  const covers = examCovers[examName];
  if (!covers || covers.length === 0) return false;
  return covers.some((c) => c.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(normalizedQuery));
}

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCLP } from "./format";
import { getImagingPrepNote, itemHasContrast } from "@/data/imagingPrep";
import type { Exam, ExamCategory, Convenio, LabExam } from "@/data/catalog";
import { categoryMeta, convenioMeta } from "@/data/catalog";
import logoUrl from "@/assets/logo-diagnopro.png?url";

// ── Palette — minimal, mostly grayscale ─────────────────────────────────────
const BRAND:      [number,number,number] = [0,   139, 208]; // only for tiny accents
const BRAND_DARK: [number,number,number] = [30,   55,  90]; // dark navy for headings
const GRAY_LIGHT: [number,number,number] = [225, 238, 250]; // azul suave — headers de tabla y subtotales
const GRAY_MID:   [number,number,number] = [165, 188, 212]; // líneas de cuadrícula azul-gris
const GRAY_TEXT:  [number,number,number] = [95,   99, 105];
const BLACK:      [number,number,number] = [30,   30,  30];
const WHITE:      [number,number,number] = [255, 255, 255];
const GREEN:      [number,number,number] = [21,  128,  61];

// ── PDF types ────────────────────────────────────────────────────────────────
export type ExamCartPDFItem = {
  exam: Exam;
  category: ExamCategory;
  qty: number;
  baseUnit: number;
  discountPct: number;
  discountAmt: number;
  discountedUnit: number;
  lineTotal: number;
  withContrast?: boolean;
};

export type GenerateCombinedPDFArgs = {
  imagingItems: ExamCartPDFItem[];
  labItems: Array<{ exam: LabExam; qty: number }>;
  patientName: string;
  patientRut: string;
  previsionLabel: string;
  previsionKey: "particular" | "fa" | "fbcd";
  convenioLabel: string;
  imagingTotal: number;
  imagingDiscount: number;
  labTotal: number;
  grandTotal: number;
  observations: string;
};

type PrepGroup = { prep: string; exams: string[]; tipo: "Imagenología" | "Laboratorio" };

// ── Logo loader (SVG → PNG via canvas) ──────────────────────────────────────
async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const img = new Image();
    img.src = logoUrl;
    await new Promise<void>((res, rej) => {
      img.onload = () => res();
      img.onerror = () => rej();
    });
    const W = 600, H = Math.round((img.naturalHeight / img.naturalWidth) * W) || 250;
    const canvas = document.createElement("canvas");
    canvas.width  = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, W, H);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

// ── Utilities ────────────────────────────────────────────────────────────────
function hline(doc: jsPDF, y: number, color: [number,number,number] = GRAY_MID, lw = 0.3) {
  doc.setDrawColor(...color);
  doc.setLineWidth(lw);
  doc.line(15, y, 195, y);
}

function checkPage(doc: jsPDF, y: number, needed: number, title = ""): number {
  if (y + needed > 274) {
    doc.addPage();
    // Mini header on continuation pages — plain
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY_TEXT);
    doc.text(`DiagnoPRO Temuco  ·  ${title}`, 15, 10);
    hline(doc, 12.5, GRAY_MID, 0.25);
    doc.setTextColor(...BLACK);
    return 18;
  }
  return y;
}

function sectionHeader(doc: jsPDF, y: number, text: string): number {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_DARK);
  doc.text(text.trim(), 15, y + 4.5);
  doc.setTextColor(...BLACK);
  return y + 6.5;
}

function subtotalBar(doc: jsPDF, y: number, label: string, amount: number): number {
  doc.setFillColor(...GRAY_LIGHT);
  doc.setDrawColor(...GRAY_MID);
  doc.setLineWidth(0.25);
  doc.rect(15, y, 180, 8, "FD");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...BLACK);
  doc.text(label, 19, y + 5.5);
  doc.text(formatCLP(amount), 191, y + 5.5, { align: "right" });
  return y + 12;
}

// ── Prep grouping ────────────────────────────────────────────────────────────
function groupPreps(rows: [string, string][], tipo: "Imagenología" | "Laboratorio"): PrepGroup[] {
  const map = new Map<string, string[]>();
  for (const [examName, prepText] of rows) {
    const key = prepText.trim();
    if (!map.has(key)) map.set(key, []);
    const list = map.get(key)!;
    if (!list.includes(examName)) list.push(examName);
  }
  return Array.from(map.entries()).map(([prep, exams]) => ({ prep, exams, tipo }));
}

function buildImagingPrepRows(items: ExamCartPDFItem[]): [string, string][] {
  const seen = new Set<string>();
  const rows: [string, string][] = [];
  for (const item of items) {
    const key = `${item.category}::${item.exam.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const note = getImagingPrepNote(
      item.exam.name,
      item.category,
      itemHasContrast(item.exam.name, item.category, item.exam.autoContrast || item.withContrast)
    );
    if (note) rows.push([item.exam.name, note]);
  }
  return rows;
}

function buildLabPrepRows(items: Array<{ exam: LabExam; qty: number }>): [string, string][] {
  const FASTING_NOTE =
    "Asistir con ayuno mínimo de 8 horas y máximo de 12 horas (no consumir alimentos sólidos ni líquidos, excepto agua). " +
    "Para evitar sobreayuno, se recomienda consumir una colación liviana (galletas, yogur o fruta) a las 23:00 horas del día anterior.";

  const ORINA_MANANA_GENERAL =
    "Utilizar la primera orina de la mañana (segundo chorro). Realizar higiene genital con agua antes de recolectar. " +
    "Recolectar en el envase estéril provisto por el laboratorio. Entregar dentro de las 2 horas siguientes a la recolección.";

  const UROCULTIVO_NOTE =
    "Para mayor exactitud del examen, es imprescindible utilizar la primera orina de la mañana: al haber permanecido más tiempo en la vejiga, " +
    "la concentración bacteriana es significativamente mayor, lo que mejora la sensibilidad del cultivo. " +
    "Realizar higiene genital con toalla húmeda antes de recolectar (sin jabón). " +
    "No tocar el interior del envase ni la tapa. Desechar el primer chorro de orina; recolectar el chorro medio en el envase estéril (10–20 mL). " +
    "Llevar inmediatamente al laboratorio o conservar refrigerado máximo 2 horas. Evitar orinar durante la noche previo a la toma.";

  const ORINA_24H_NOTE =
    "Recolectar toda la orina durante 24 horas en el envase provisto por el laboratorio. " +
    "Primer día: desechar la primera micción de la mañana (anotar la hora) y comenzar a recolectar desde la segunda micción en adelante. " +
    "Segundo día: recolectar la primera micción de la mañana a la misma hora que comenzó el día anterior. " +
    "Conservar el envase refrigerado durante toda la recolección. Entregar al laboratorio a más tardar 2 horas después de completada.";

  const PSA_NOTE =
    "Abstinencia sexual de 48 horas previas al examen. " +
    "Evitar eyaculación, tacto rectal, masaje prostático o biopsia en los 7 días anteriores al examen.";

  // Codes and name fragments that indicate PTGO / glucose curve
  const isPTGO = (e: LabExam) =>
    e.code === "0302048" ||
    /tolerancia|ptgo|carga.*glucosa|glucosa.*carga/i.test(e.name);

  const isGlucosaCurve = (e: LabExam) =>
    /post.?carga|post.?pandrial|curva.*glucosa/i.test(e.name);

  const isInsulinaCurve = (e: LabExam) =>
    e.code === "0303031" || /curva.*insulina|insulina.*carga|insulina.*pandrial/i.test(e.name);

  const isUrocultivo = (e: LabExam) =>
    /urocultivo/i.test(e.name);

  const rows: [string, string][] = [];

  for (const { exam } of items) {
    // Glucofresh siempre acompaña a PTGO o Curva de Insulina; su preparación
    // ya está incluida en la fila de esos exámenes, así que no se repite.
    if (exam.code === "GLUCOSA LIQ") continue;

    const notes: string[] = [];
    const name = exam.name.replace(/\*PARTICULAR\*/gi, "").replace(/\s{2,}/g, " ").trim();

    // ── Casos especiales (tienen su propia instrucción completa) ──────────────
    if (isPTGO(exam)) {
      notes.push(
        "Ayuno de 10 a 12 horas. Llegar antes de las 09:00. " +
        "Se tomará sangre en ayunas y luego deberá beber el Glucofresh en 5 minutos. " +
        "Se tomarán 2 muestras más a los 60 y 120 minutos. " +
        "Permanecer en reposo las 2 horas del procedimiento: no comer, no beber (solo agua), no fumar ni hacer ejercicio."
      );
    } else if (isInsulinaCurve(exam)) {
      notes.push(
        "Ayuno de 10 a 12 horas. Llegar antes de las 09:00. " +
        "Se tomará sangre en ayunas y luego deberá beber el Glucofresh. " +
        "Se realizarán extracciones en los intervalos indicados por el médico. " +
        "Permanecer en reposo durante el procedimiento: no comer, no beber (solo agua), no fumar ni hacer ejercicio."
      );
    } else if (isGlucosaCurve(exam)) {
      notes.push(
        "Ayuno mínimo de 8 horas. Acudir al laboratorio en la mañana. Se realizarán dos extracciones de sangre separadas por el intervalo indicado. " +
        "Permanecer en reposo, no comer, no fumar ni realizar ejercicio entre las extracciones."
      );
    } else {
      // ── Preparaciones estándar ────────────────────────────────────────────
      if (exam.fasting) notes.push(FASTING_NOTE);

      if (exam.prep === "orina_manana") {
        notes.push(isUrocultivo(exam) ? UROCULTIVO_NOTE : ORINA_MANANA_GENERAL);
      } else if (exam.prep === "orina_24h") {
        notes.push(ORINA_24H_NOTE);
      } else if (exam.prep === "psa") {
        notes.push(PSA_NOTE);
      }
    }

    if (notes.length > 0) rows.push([name, notes.join(" ")]);
  }
  return rows;
}

// ── Main cotización PDF ──────────────────────────────────────────────────────
export async function generateCombinedPDF(args: GenerateCombinedPDFArgs) {
  const doc     = new jsPDF();
  const dateStr = new Date().toLocaleDateString("es-CL");
  const logo    = await loadLogoDataUrl();

  // ── Header — fondo blanco, logo arriba a la izquierda ───────────────────
  if (logo) {
    doc.addImage(logo, "PNG", 15, 9, 50.4, 14);
  } else {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);
    doc.setTextColor(...BRAND_DARK);
    doc.text("DiagnoPRO Temuco", 15, 17);
  }

  // "COTIZACIÓN" a la derecha, sobrio
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...BRAND_DARK);
  doc.text("COTIZACIÓN", 195, 14, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...GRAY_TEXT);
  doc.text(dateStr, 195, 19.5, { align: "right" });

  // Datos de contacto bajo el logo, texto pequeño gris
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...GRAY_TEXT);
  doc.text("Las Heras 453 esq. Av. Caupolican, Temuco  ·  (045) 2887405 · 2887400  ·  contacto@diagnopro.cl", 15, 29);

  // Regla separadora
  hline(doc, 32.5, BRAND_DARK, 0.5);

  let y = 36;

  // ── Meta info — sin caja, compacto ──────────────────────────────────────
  // Previsión (izquierda) + convenio si aplica
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...BLACK);
  doc.text(args.previsionLabel, 15, y + 5);

  if (args.convenioLabel !== "Particular / Sin Convenio") {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GRAY_TEXT);
    doc.text(`Convenio: ${args.convenioLabel}`, 195, y + 5, { align: "right" });
  }
  y += 9;

  // ── Imagenología table ───────────────────────────────────────────────────
  if (args.imagingItems.length > 0) {
    y = sectionHeader(doc, y, "  EXÁMENES DE IMAGENOLOGÍA");
    const hasDiscount = args.imagingItems.some((it) => it.discountPct > 0);

    const head = hasDiscount
      ? [["Cat.", "Examen", "Cant.", "Precio", "Desc.", "Total"]]
      : [["Cat.", "Examen", "Cant.", "Precio unitario", "Total"]];

    const body = args.imagingItems.map((it) => {
      const catLabel = categoryMeta[it.category]?.short ?? it.category.toUpperCase();
      const row: string[] = [catLabel, it.exam.name, String(it.qty), formatCLP(it.baseUnit)];
      if (hasDiscount) row.push(it.discountPct > 0 ? `-${it.discountPct}%` : "");
      row.push(formatCLP(it.lineTotal));
      return row;
    });

    autoTable(doc, {
      startY: y,
      head,
      body,
      theme: "grid",
      headStyles: {
        fillColor: GRAY_LIGHT, textColor: BLACK,
        fontStyle: "bold", fontSize: 8, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
        lineColor: GRAY_MID, lineWidth: 0.25,
      },
      bodyStyles: { fontSize: 8.5, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 }, textColor: BLACK },
      columnStyles: hasDiscount ? {
        0: { cellWidth: 18, fontSize: 7.5 },
        2: { halign: "center", cellWidth: 14 },
        3: { halign: "right", cellWidth: 28 },
        4: { halign: "center", cellWidth: 18 },
        5: { halign: "right", cellWidth: 28, fontStyle: "bold" },
      } : {
        0: { cellWidth: 18, fontSize: 7.5 },
        2: { halign: "center", cellWidth: 14 },
        3: { halign: "right", cellWidth: 34 },
        4: { halign: "right", cellWidth: 28, fontStyle: "bold" },
      },
      styles:  { lineColor: GRAY_MID, lineWidth: 0.25, overflow: "linebreak" },
      margin:  { left: 15, right: 15 },
    });

    // @ts-expect-error lastAutoTable injected by plugin
    y = doc.lastAutoTable.finalY;

    if (args.imagingDiscount > 0) {
      y = checkPage(doc, y, 10, "Imagenología");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...GREEN);
      doc.text(`Ahorro por convenio ${args.convenioLabel}: -${formatCLP(args.imagingDiscount)}`, 192, y + 5, { align: "right" });
      y += 7;
    }

    y = subtotalBar(doc, y, "Subtotal Imagenología", args.imagingTotal);
  }

  // ── Laboratorio table ────────────────────────────────────────────────────
  if (args.labItems.length > 0) {
    y = checkPage(doc, y, 24, "Laboratorio");
    y = sectionHeader(doc, y, "  EXÁMENES DE LABORATORIO");

    autoTable(doc, {
      startY: y,
      head: [["Código", "Nombre del examen", "Cant.", `Precio ${args.previsionLabel}`]],
      body: args.labItems.map(({ exam: e, qty }) => {
        const unitPrice =
          args.previsionKey === "fa"   ? (e.fonasa_a   ?? e.particular) :
          args.previsionKey === "fbcd" ? (e.fonasa_bcd ?? e.particular) :
          e.particular;
        return [
          e.code,
          e.name.replace(/\*PARTICULAR\*/gi, "").replace(/\s{2,}/g, " ").trim(),
          String(qty),
          unitPrice * qty > 0 ? formatCLP(unitPrice * qty) : "Consultar",
        ];
      }),
      theme: "grid",
      headStyles: {
        fillColor: GRAY_LIGHT, textColor: BLACK,
        fontStyle: "bold", fontSize: 8, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
        lineColor: GRAY_MID, lineWidth: 0.25,
      },
      bodyStyles: { fontSize: 8.5, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 }, textColor: BLACK },
      columnStyles: {
        0: { cellWidth: 26, fontSize: 7.5 },
        2: { halign: "center", cellWidth: 14 },
        3: { halign: "right", cellWidth: 36, fontStyle: "bold" },
      },
      styles:  { lineColor: GRAY_MID, lineWidth: 0.25, overflow: "linebreak" },
      margin:  { left: 15, right: 15 },
    });

    // @ts-expect-error lastAutoTable injected by plugin
    y = doc.lastAutoTable.finalY;
    y = subtotalBar(doc, y, `Subtotal Laboratorio (${args.previsionLabel})`, args.labTotal);
  }

  // ── Grand total — caja blanca con doble borde, sobrio ───────────────────
  y = checkPage(doc, y, 20, "Total");
  doc.setFillColor(...WHITE);
  doc.setDrawColor(...BRAND_DARK);
  doc.setLineWidth(0.6);
  doc.rect(15, y, 180, 13, "FD");
  doc.setTextColor(...BLACK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text(`TOTAL A PAGAR  ·  ${args.previsionLabel}`, 19, y + 8.3);
  doc.setFontSize(13);
  doc.text(formatCLP(args.grandTotal), 191, y + 8.7, { align: "right" });
  y += 19;

  // ── Observations — caja simple gris ─────────────────────────────────────
  if (args.observations.trim()) {
    y = checkPage(doc, y, 16, "Observaciones");
    const obsLines = doc.splitTextToSize(args.observations, 169);
    const obsH = obsLines.length * 5 + 10;
    doc.setDrawColor(...GRAY_MID);
    doc.setLineWidth(0.25);
    doc.rect(15, y, 180, obsH, "D");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...GRAY_TEXT);
    doc.text("Observaciones:", 19, y + 6.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...BLACK);
    doc.text(obsLines, 19, y + 11.5);
    y += obsH + 6;
  }

  // ── Preparaciones (agrupadas) ────────────────────────────────────────────
  const imagingPrepRows = buildImagingPrepRows(args.imagingItems);
  const labPrepRows     = buildLabPrepRows(args.labItems);
  const hasContrast     = args.imagingItems.some((it) =>
    itemHasContrast(it.exam.name, it.category, it.exam.autoContrast || it.withContrast)
  );

  const imagingGroups = groupPreps(imagingPrepRows, "Imagenología");
  const labGroups     = groupPreps(labPrepRows, "Laboratorio");
  const allGroups     = [...imagingGroups, ...labGroups];
  const hasAnyPrep    = allGroups.length > 0 || hasContrast;

  y = checkPage(doc, y, 18, "Indicaciones");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...BRAND_DARK);
  doc.text("INDICACIONES PARA EL PACIENTE", 15, y + 4.5);
  y += 6.5;

  if (hasAnyPrep) {
    if (allGroups.length > 0) {
      // Tabla cuadriculada: Tipo | Preparación | Aplica a
      autoTable(doc, {
        startY: y,
        head: [["Tipo", "Preparación", "Aplica a"]],
        body: allGroups.map((g) => [g.tipo, g.prep, g.exams.join(", ")]),
        theme: "grid",
        headStyles: {
          fillColor: GRAY_LIGHT, textColor: BLACK,
          fontStyle: "bold", fontSize: 8, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 },
          lineColor: GRAY_MID, lineWidth: 0.25,
        },
        bodyStyles: { fontSize: 8, cellPadding: { top: 2.5, bottom: 2.5, left: 3, right: 3 }, textColor: BLACK, valign: "top" },
        columnStyles: {
          0: { cellWidth: 26, fontSize: 7.5 },
          1: { cellWidth: 96 },
          2: { cellWidth: 58, fontSize: 7.5, textColor: GRAY_TEXT },
        },
        styles:  { lineColor: GRAY_MID, lineWidth: 0.25, overflow: "linebreak" },
        margin:  { left: 15, right: 15 },
      });
      // @ts-expect-error lastAutoTable injected by plugin
      y = doc.lastAutoTable.finalY + 4;
    }

    // Post-contrast block — caja simple con borde gris
    if (hasContrast) {
      y = checkPage(doc, y, 20, "Indicaciones");
      const postLines = doc.splitTextToSize(
        "Post-contraste: Hidratarse con al menos 2 litros de agua al día durante 2–3 días. Si usa Metformina, suspénderla 2 días después del examen. Ante cualquier reacción (dificultad respiratoria, hinchazón facial, urticaria), consulte de inmediato.",
        170
      );
      const postH = postLines.length * 4.4 + 7;
      doc.setDrawColor(...GRAY_MID);
      doc.setLineWidth(0.25);
      doc.rect(15, y, 180, postH, "D");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(...BLACK);
      doc.text(postLines, 19, y + 5.5);
      y += postH + 5;
    }
  } else {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(...GRAY_TEXT);
    doc.text("No se requiere preparación especial para los exámenes solicitados.", 15, y + 3);
    y += 8;
  }

  // ── Universal notes ──────────────────────────────────────────────────────
  y = checkPage(doc, y, 10, "Indicaciones");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text("Para todos los exámenes: traer cédula de identidad vigente y orden médica  ·  Llegar 15 min antes de su hora.", 15, y);
  y += 5;

  // ── Footer on every page — línea fina + texto gris ──────────────────────
  const pageCount = (doc as any).internal.getNumberOfPages() as number;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setDrawColor(...GRAY_MID);
    doc.setLineWidth(0.25);
    doc.line(15, 287, 195, 287);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...GRAY_TEXT);
    doc.text(
      "Cotización referencial sujeta a confirmación · Valores pueden variar según indicación médica · DiagnoPRO Temuco",
      105, 291.5, { align: "center" }
    );
    if (pageCount > 1) {
      doc.text(`Pág. ${i} / ${pageCount}`, 195, 291.5, { align: "right" });
    }
  }

  doc.save("Cotizacion_DiagnoPRO.pdf");
}

// ── Legacy exports ────────────────────────────────────────────────────────────
export async function generateExamPDF(args: {
  items: ExamCartPDFItem[];
  convenio: Convenio;
  prevision: string;
  grandTotal: number;
  patientName: string;
  patientRut: string;
  observations: string;
}) {
  await generateCombinedPDF({
    imagingItems: args.items,
    labItems: [],
    patientName: args.patientName,
    patientRut: args.patientRut,
    previsionLabel: args.prevision,
    previsionKey: "particular",
    convenioLabel: convenioMeta[args.convenio],
    imagingTotal: args.grandTotal,
    imagingDiscount: args.items.reduce((s, it) => s + it.discountAmt, 0),
    labTotal: 0,
    grandTotal: args.grandTotal,
    observations: args.observations,
  });
}

export async function generateLabPDF(args: {
  items: LabExam[];
  prevision: string;
  selectedTotal: number;
  patientName: string;
  patientRut: string;
  observations: string;
}) {
  const previsionKey =
    args.prevision === "FONASA A" ? "fa" :
    args.prevision.includes("B")  ? "fbcd" : "particular";
  await generateCombinedPDF({
    imagingItems: [],
    labItems: args.items.map((exam) => ({ exam, qty: 1 })),
    patientName: args.patientName,
    patientRut: args.patientRut,
    previsionLabel: args.prevision,
    previsionKey,
    convenioLabel: "Particular / Sin Convenio",
    imagingTotal: 0,
    imagingDiscount: 0,
    labTotal: args.selectedTotal,
    grandTotal: args.selectedTotal,
    observations: args.observations,
  });
}

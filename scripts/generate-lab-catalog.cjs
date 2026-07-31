/* eslint-disable */
"use strict";

const { jsPDF } = require("../node_modules/jspdf/dist/jspdf.node.js");
const autoTable = require("../node_modules/jspdf-autotable/dist/jspdf.plugin.autotable.js").default;
const fs = require("fs");
const path = require("path");

const labData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../src/data/lab.json"), "utf8")
);

// Filter out exams that are not performed
const exams = labData.filter(
  (e) => e.obs !== "NO SE REALIZA" && !String(e.obs).startsWith("NO SE REALIZA")
);

// Category mapping by code prefix
const CATEGORIES = {
  "0301": "Hematología y Coagulación",
  "0302": "Bioquímica Sanguínea",
  "0303": "Hormonas y Endocrinología",
  "0305": "Inmunología y Serología",
  "0306": "Microbiología y Virología",
  "0307": "Toma de Muestras",
  "0308": "Líquidos Biológicos",
  "0309": "Exámenes de Orina",
  "0310": "ADN / Genética",
};

function getCategory(code) {
  const prefix = String(code).replace(/^0+/, "").padStart(4, "0").substring(0, 4);
  // Try direct prefix match
  for (const [key, label] of Object.entries(CATEGORIES)) {
    if (String(code).startsWith(key)) return label;
  }
  return "Perfiles y Paquetes Especiales";
}

// Group by category
const grouped = {};
for (const exam of exams) {
  const cat = getCategory(exam.code);
  if (!grouped[cat]) grouped[cat] = [];
  grouped[cat].push(exam);
}

// Ordered categories
const ORDER = [
  "Hematología y Coagulación",
  "Bioquímica Sanguínea",
  "Hormonas y Endocrinología",
  "Inmunología y Serología",
  "Microbiología y Virología",
  "Exámenes de Orina",
  "Líquidos Biológicos",
  "ADN / Genética",
  "Toma de Muestras",
  "Perfiles y Paquetes Especiales",
];

function formatPrice(val) {
  if (val === null || val === undefined || val === 0) return "—";
  return "$" + Number(val).toLocaleString("es-CL");
}

function formatTurnaround(t) {
  if (!t) return "";
  switch (t) {
    case "same_day": return "Mismo día";
    case "24h":      return "24 h";
    case "2_5d":     return "2-5 días";
    case "5_15d":    return "5-15 días";
    default:         return t;
  }
}

// ─── Build PDF ───────────────────────────────────────────────────────────────
const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

// Brand colours
const BLUE  = [33, 79, 154];   // #214F9A
const LGRAY = [245, 247, 250];
const MGRAY = [200, 205, 215];
const BLACK = [30, 30, 30];

const PAGE_W = 210;
const MARGIN = 12;

// ── Cover page ────────────────────────────────────────────────────────────────
doc.setFillColor(...BLUE);
doc.rect(0, 0, PAGE_W, 60, "F");

doc.setTextColor(255, 255, 255);
doc.setFont("helvetica", "bold");
doc.setFontSize(22);
doc.text("Catálogo de Exámenes de Laboratorio", PAGE_W / 2, 28, { align: "center" });

doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("DiagnoPRO · Laboratorio Clínico", PAGE_W / 2, 38, { align: "center" });

const today = new Date();
const dateStr = today.toLocaleDateString("es-CL", { year: "numeric", month: "long", day: "numeric" });
doc.setFontSize(10);
doc.text(`Vigente al ${dateStr}`, PAGE_W / 2, 47, { align: "center" });

// Legend box
doc.setFillColor(255, 255, 255);
doc.roundedRect(MARGIN, 68, PAGE_W - MARGIN * 2, 28, 3, 3, "F");
doc.setDrawColor(...MGRAY);
doc.roundedRect(MARGIN, 68, PAGE_W - MARGIN * 2, 28, 3, 3, "S");

doc.setTextColor(...BLACK);
doc.setFont("helvetica", "bold");
doc.setFontSize(9);
doc.text("Referencias de precios", MARGIN + 5, 77);

doc.setFont("helvetica", "normal");
doc.setFontSize(8.5);
doc.text("• FONASA A: tarifa para beneficiarios FONASA grupo A.", MARGIN + 5, 84);
doc.text("• FONASA B/C/D: tarifa para beneficiarios FONASA grupos B, C y D.", MARGIN + 5, 90);
doc.text("• Particular: precio sin previsión. Los precios incluyen IVA cuando corresponda.", MARGIN + 5, 96);
doc.text('• "—" indica que el examen no tiene cobertura FONASA o solo se factura como boleta.', MARGIN + 5, 102);

// Note about fasting
doc.setFillColor(255, 248, 230);
doc.roundedRect(MARGIN, 102, PAGE_W - MARGIN * 2, 14, 3, 3, "F");
doc.setTextColor(120, 80, 0);
doc.setFont("helvetica", "bold");
doc.setFontSize(8.5);
doc.text("⚠ Ayuno requerido", MARGIN + 5, 110);
doc.setFont("helvetica", "normal");
doc.text("Los exámenes marcados con (*) requieren ayuno mínimo de 8 horas.", MARGIN + 32, 110);

let startY = 122;

// ── Tables per category ───────────────────────────────────────────────────────
for (const cat of ORDER) {
  const items = grouped[cat];
  if (!items || items.length === 0) continue;

  // Clean up exam names: remove internal notes in parentheses that are too long
  const rows = items.map((e) => {
    let name = e.name
      .replace(/\s*\*PARTICULAR\*\s*/gi, "")
      .trim();
    // Trim very long names to avoid wrapping issues (keep first 90 chars)
    // Actually let jsPDF wrap them naturally

    const fasting = e.fasting ? " *" : "";
    return [
      name + fasting,
      formatPrice(e.fonasa_a),
      formatPrice(e.fonasa_bcd),
      formatPrice(e.particular),
      formatTurnaround(e.turnaround),
    ];
  });

  autoTable(doc, {
    startY,
    head: [[
      { content: cat, colSpan: 5, styles: { fillColor: BLUE, textColor: 255, fontStyle: "bold", fontSize: 9.5 } }
    ],
    [
      "Examen",
      "FONASA A",
      "FONASA B/C/D",
      "Particular",
      "Entrega",
    ]],
    body: rows,
    theme: "grid",
    styles: {
      fontSize: 7.8,
      cellPadding: { top: 2, bottom: 2, left: 3, right: 3 },
      textColor: BLACK,
      lineColor: MGRAY,
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [220, 228, 245],
      textColor: BLACK,
      fontStyle: "bold",
      fontSize: 8,
    },
    alternateRowStyles: { fillColor: LGRAY },
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: 22, halign: "right" },
      2: { cellWidth: 26, halign: "right" },
      3: { cellWidth: 24, halign: "right" },
      4: { cellWidth: 22, halign: "center" },
    },
    margin: { left: MARGIN, right: MARGIN },
    didDrawPage: (data) => {
      // Header stripe on every page
      doc.setFillColor(...BLUE);
      doc.rect(0, 0, PAGE_W, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.text("DiagnoPRO · Catálogo de Laboratorio", MARGIN, 5.5);
      doc.setFont("helvetica", "normal");
      doc.text(`Pág. ${doc.internal.getCurrentPageInfo().pageNumber}`, PAGE_W - MARGIN, 5.5, { align: "right" });

      // Footer
      doc.setFillColor(240, 240, 240);
      doc.rect(0, 287, PAGE_W, 10, "F");
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(6.5);
      doc.text("Los precios pueden variar. Consulte en recepción. (*) Ayuno mínimo 8 horas requerido.", PAGE_W / 2, 293, { align: "center" });
    },
  });

  startY = doc.lastAutoTable.finalY + 8;
}

// ── Save ──────────────────────────────────────────────────────────────────────
const outPath = path.join(__dirname, "../catalogo-laboratorio.pdf");
const buffer = Buffer.from(doc.output("arraybuffer"));
fs.writeFileSync(outPath, buffer);
console.log("PDF generado:", outPath);

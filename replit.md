# DiagnoPRO Cotizador

A clinical quoting app for imaging, lab, and cashier services (Imagenología, Laboratorio, Caja). Built for Chilean healthcare — supports FONASA A/B/C/D and commercial insurance pricing.

## Stack

- **React 19** + **TypeScript**
- **Vite 7** (dev server on port 5000)
- **TanStack Router** (file-based routing)
- **Tailwind CSS v4** + **Radix UI** (shadcn/ui components)
- **TanStack Query** for data management
- **jsPDF** + **jspdf-autotable** for PDF export
- **xlsx** for Excel export

## Running

```bash
npm run dev
```

App is served at `http://0.0.0.0:5000`.

## Build

```bash
npm run build
```

Output goes to `dist/`.

## Project structure

```
src/
  routes/        # File-based routes (TanStack Router)
  components/    # UI components
  data/          # Static data / catalogs
  hooks/         # Custom React hooks
  lib/           # Utilities
```

## User preferences

- Keep existing project structure and stack.

## Preparación de exámenes

- Siempre marcar la duración del ayuno como mínimo (por ejemplo, “mín. 4 h”); si se informa un rango, indicar el mínimo y el máximo.
- Para TAC/Scanner que requieren ayuno, indicar ayuno de sólidos mín. 4 h.
- UroTAC y TAC de abdomen y pelvis: “Ayuno de sólidos mín. 4 h; Beber 1,5 L desde 1 h antes y no orinar.” TAC de abdomen solamente: ayuno de sólidos mín. 4 h, sin indicación de beber agua.
- PieloTAC: solo “Beber 1,5 L desde 1 h antes y no orinar.”
- Para ecografías que requieren ayuno, indicar ayuno de sólidos mín. 6 h; si también requieren vejiga llena, añadir “Beber 1,5 L desde 1 h antes y no orinar.”
- No usar “se permite agua” en estas indicaciones de preparación.

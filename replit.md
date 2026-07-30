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

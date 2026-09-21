# DiagnoPRO — paquete para integración

## Qué contiene

- `dist/`: versión compilada lista para publicar en un hosting estático.
- `src/`: código fuente React/TypeScript.
- `public/`: archivos públicos usados por la aplicación.
- `scripts/`: generadores auxiliares, incluido el catálogo PDF de laboratorio.
- `package.json` y `package-lock.json`: dependencias y comandos del proyecto.
- Configuración de Vite, TypeScript, ESLint y Tailwind.

## Qué versión conviene usar

- Para publicar el cotizador como una página independiente, usar solamente `dist/`.
- Para modificarlo, integrarlo visualmente en otra aplicación o mantenerlo a futuro, conservar el paquete completo con el código fuente.
- La entrega incluye ambos para evitar perder la posibilidad de mantenimiento.

## Ejecución local

```bash
npm ci
npm run dev
```

## Generar una nueva versión publicada

```bash
npm run build
```

El resultado queda en `dist/`.

## Integración dentro de una web existente

La aplicación se entrega como una SPA independiente. La forma más simple de incorporarla
en otra web es publicar `dist/` en una ruta o subdominio propio, o cargarla mediante un
`iframe`. Una integración visual directa dentro de otra aplicación requerirá adaptar el
router, los estilos globales y los componentes React al proyecto anfitrión.

La configuración actual usa rutas absolutas desde `/`, por lo que si se publica en una
subcarpeta se debe ajustar `base` en `vite.config.ts` antes de ejecutar el build.
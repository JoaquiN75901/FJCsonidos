# FJC Sonido — Landing

Landing one page en HTML, CSS y JS puros (sin build). Se sube tal cual a cualquier hosting (Netlify, Vercel, Hostinger, GitHub Pages).

## Lo primero que tenés que editar

| Qué | Dónde |
|---|---|
| WhatsApp, email, Instagram | `js/config.js` → `contact` |
| Video del showreel (YouTube o mp4) | `js/config.js` → `showreel` |
| Recibir consultas por email (Formspree) | `js/config.js` → `form.endpoint` |
| Tipos de evento y servicios del formulario | `js/config.js` → `eventTypes`, `services` |
| Trabajos (fotos, títulos, categorías) | `js/data/works.js` |
| Colores, tipografías, espaciados | `css/tokens.css` |
| Textos de cada sección | `index.html` |

Las fotos y videos van en `assets/img/` y `assets/video/`.

## Estructura

```
index.html
css/
  main.css          → solo importa el resto
  tokens.css        → paleta y variables de diseño
  base.css          → reset, tipografía, utilidades
  components.css    → logo, botones, tarjetas, campos
  sections/*.css    → un archivo por sección
js/
  config.js         → datos del negocio
  data/works.js     → trabajos realizados
  modules/*.js      → un módulo por funcionalidad
  main.js           → inicializa los módulos
```

## Cómo funciona el formulario

- Sin `form.endpoint`: al enviar se abre WhatsApp con la consulta completa ya escrita.
- Con `form.endpoint` (Formspree): la consulta llega por email; si el envío falla, cae a WhatsApp para no perder el contacto.
- Si agregás Google Analytics o Meta Pixel, el envío dispara `generate_lead` / `Lead` automáticamente.

## Sumar una sección nueva

1. Agregá el HTML en `index.html`.
2. Creá `css/sections/mi-seccion.css` y sumalo en `css/main.css`.
3. Si tiene comportamiento, creá `js/modules/mi-modulo.js` (exponé `FJC.miModulo = { init }`), cargalo en `index.html` y agregalo a la lista de `js/main.js`.

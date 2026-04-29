---
name: seo-performance
description: |
  Skill para comprobar y mejorar SEO y rendimiento (Core Web Vitals) de
  aplicaciones web estáticas y SPA. Proporciona checks, parches y comandos
  recomendados para validar cambios.
---

Objetivos
- Detectar problemas SEO básicos: title, meta description, canonical, og/tags,
  robots/sitemap
- Detectar problemas de rendimiento: fonts preload, imágenes no optimizadas,
  assets embebidos demasiado grandes, dependencias nativas (sharp)
- Generar parches y snippets para correcciones rápidas

Checks automáticos (recomendados)
- Meta tags: title, description, canonical, og:title, og:description, og:image
- Presence de `robots.txt` y `sitemap.xml` en `public/`
- Fonts: `preconnect`/`preload` y uso de `display=swap`
- Images: existencia de `.webp`/`avif`, `srcset` y `loading="lazy"` donde aplica
- Embedded assets: detectar base64/SVG embebidos grandes (>10 KB)
- Dependencias nativas: detectar `sharp` y advertir sobre requirements de CI
- Core Web Vitals: guía para ejecutar Lighthouse y comandos sugeridos

Outputs
- Informe JSON con los resultados de los checks (`tools/seo-checker/report.json`)
- Resumen humano legible con recomendaciones priorizadas
- Parches (`.patch`) y snippets (HTML/CSS) listos para aplicar

Comandos útiles
- Ejecutar el chequeo localmente:
  - `node tools/seo-checker/index.js`
- Ejecutar Lighthouse (local dev):
  - `npm run dev` then `npx lighthouse http://localhost:5173 --output=json`

Política de aplicación
- La skill genera parches y sugerencias; por defecto NO aplica commits.
  El agent puede proponer aplicar cambios tras confirmación del usuario.

Ejemplo de prompt para Copilot Chat
"Usa la skill `seo-performance` para revisar `index.html` y `public/assets`.
Prioriza LCP y reducción de payload; devuelve un patch y un mensaje de commit."

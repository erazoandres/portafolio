
# Portafolio v2

Proyecto personal: portafolio web construido con Vite + React y animaciones GSAP.

**Estado:** En desarrollo

## Descripción

Sitio de portafolio que muestra proyectos, habilidades y secciones de contacto. Incluye animaciones (GSAP), utilidades de scrolling y componentes React ligeros.

# Portafolio v2 — README para Copilot Chat

Este README está diseñado para que Copilot Chat (y colaboradores) entiendan rápidamente
el propósito del proyecto, los agentes y skills disponibles, y el flujo recomendado
para solicitar cambios y parches automáticos.

## Resumen del proyecto

Portafolio personal construido con Vite + React, que utiliza GSAP para animaciones
y librerías auxiliares para scrolling y efectos. Enfocado en performance y diseño
responsivo.

## Objetivo del README para Copilot Chat

- Proveer contexto claro para que agentes personalizados puedan generar cambios
	útiles (snippets, patches, recomendaciones de diseño).
- Documentar agentes y skills incluidos en el repositorio.
- Sugerir prompts y flujos de trabajo reproducibles para aplicar cambios.

## Agentes y skills disponibles

- Agente de diseño: [.agents/agents/design.agent.md](.agents/agents/design.agent.md)
- Skill de commits: [.agents/skills/commiter/SKILL.md](.agents/skills/commiter/SKILL.md)
- Otras skills en el repo: [.agents/skills/design](.agents/skills/design) y
	[.agents/skills/responsive-core](.agents/skills/responsive-core)

Consejo: si usas Copilot Chat, selecciona el agente `Agente de Diseño y Buenas Prácticas`
o incluye en el prompt: "Actúa como Agente de Diseño y Buenas Prácticas".

## Flujo recomendado para trabajar con Copilot Chat

1. Crea una rama: `git checkout -b feat/descripción-corta`.
2. Recarga VS Code (`Developer: Reload Window`) para detectar agentes nuevos.
3. Abre Copilot Chat y selecciona el agente o indica su rol en el prompt.
4. Da contexto al agente: prioridad (a11y/performance), plataforma (mobile/desktop),
	 archivos relevantes (`src/`, `style.css`, etc.).
5. Pide un resultado concreto: `patch`, `snippet`, `lista de cambios` y `mensaje de commit`.
6. Revisa el patch, aplícalo localmente, ejecuta build/tests y confirma resultados.
7. Haz commit usando el mensaje sugerido (o adáptalo) y abre PR.

Ejemplo de prompt efectivo:

"Actúa como Agente de Diseño y Buenas Prácticas: revisa `src/components/HeroSection.jsx`
para mejorar legibilidad en móvil y generar un patch listo para aplicar. Prioriza
accesibilidad y rendimiento. Devuélveme también un mensaje de commit siguiendo
Conventional Commits."

## Peticiones que el agente puede manejar bien

- Revisiones de diseño y legibilidad
- Patrones de componentes accesibles y responsivos
- Optimización de animaciones GSAP para reducir jank
- Sugerencias de CSS fluidas (clamp, unidades vw/vh) y matchMedia
- Generación de patches y mensajes de commit

## Cómo pedir parches y commits

Solicita explícitamente el formato:

- `Formato: patch` — para parches unificables
- `Formato: snippet` — para fragmentos de código
- `Commit: sí` — para que el agente proponga un mensaje de commit

Ejemplo de commit sugerido:

```
fix(hero): improve mobile contrast and reduce Hero animations

Improve text contrast and simplify animation to reduce jank on low-end devices.
```

## Troubleshooting rápido

- Si el agente no aparece: recarga VS Code y verifica que `.agents/agents/`
	contiene los archivos.
- Para problemas de permisos o lectura: asegúrate de que el workspace tenga
	acceso a los archivos locales.

## Contribuir y convenciones

- Sigue Conventional Commits: [.agents/skills/commiter/SKILL.md]
- Abre PRs con descripción, screenshots y pasos para reproducir cambios visuales.

---

¿Quieres que añada una plantilla de PR (`.github/PULL_REQUEST_TEMPLATE.md`) y un
ejemplo de prompt preformateado para copiar/pegar en Copilot Chat?


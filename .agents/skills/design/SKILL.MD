name: design
description: >
  Genera componentes React/JSX de producción con diseño claro, consistente y estético.
  Usar esta skill para: componentes React, cards, layouts, hero, formularios, modals,
  tablas, navbars, sidebars y cualquier petición que demande una mejora visual o UX.
---

# Diseño de componentes (skill)

Guía concisa para generar componentes React/JSX con diseño consistente, accesible
y buena experiencia de usuario. Sigue este patrón cuando el usuario pida cualquier
componente UI o mejora visual.

---

## ¿Cuándo usar esta skill?

- Solicitudes de componentes React, cards, hero, forms, modals, tablas, navbars.
- Peticiones de "hacerlo más bonito", "mejorar la estética" o "optimizar el layout".

---

## Reglas rápidas (antes de codificar)

1. Define el objetivo (qué resuelve). 2. Elige un tono visual único. 3. Decide
   un rasgo memorable (tipografía, micro-interacción o color). 4. Usa tokens,
   no valores mágicos (`--color`, `--space`, `--radius`).

---

## Estructura mínima de entrega

1. Frontmatter y descripción breve (ya presente).
2. `GlobalStyles` con tokens y fuentes.
3. Sub-componentes (si aplica).
4. Componente principal exportado por defecto.
5. Checklist de entrega (tokens, tipografía, espaciado, micro-interacción).

---

## Tokens esenciales (ejemplo mínimo)

```css
:root{
  --color-bg: #0b0b10; --color-surface:#111117; --color-text:#eae9f6;
  --color-accent:#7c3aed; --space-4:16px; --space-6:32px; --radius-md:12px;
  --ease-out:cubic-bezier(.16,1,.3,1); --duration-base:250ms;
}
```

---

## Patrón de componentización (ejemplos cortos)

Botón recomendado (esquema):

```jsx
// Base + variantes + estados (press/hover)
function Button({variant='primary',children}){
  // usar classes o style objects basados en tokens
  return <button className={`btn btn--${variant}`}>{children}</button>;
}
```

Card con elevación:

```jsx
const Card = ({children})=> (
  <div className="card">{children}</div>
);
```

Incluye siempre una micro-interacción (hover, focus o press).

---

## Checklist de entrega (obligatorio)

- Tokens CSS definidos (colores, espacios, radios).
- Tipografías y jerarquía (display / heading / body).
- Responsividad básica (`clamp()` o unidades relativas).
- Al menos una micro-interacción (hover/focus/press).
- Export por defecto y ejemplos de uso en README corto.

---

## Anti-patrones (evitar)

- Valores px dispersos en contenedores grandes.
- Animar `width`/`height` en lugar de `transform` / `opacity`.
- Mezclar muchas librerías de estilos sin consistencia.

---

Mantener esta guía breve: el objetivo es ofrecer un patrón reproducible y
consistente para entregar componentes listos para producción.
| Colores hardcodeados (`#333`, `#fff`)    | Variables CSS semánticas                    |
| Componente sin animación de entrada      | `fadeUp` o `scaleIn` en el montaje          |

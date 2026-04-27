---
name: react-beautiful-components
description: >
  Crea componentes React de producción con diseño moderno, hermoso y que aprovechan
  magistralmente el espacio disponible. Usa esta skill SIEMPRE que el usuario pida:
  componentes React, UI en React, cards, layouts, dashboards, formularios, modales,
  tablas, navbars, sidebars, hero sections, botones estilizados, o cualquier pieza
  de interfaz en React/JSX. También actívala cuando el usuario mencione "componente
  bonito", "diseño moderno", "bien espaciado", "estética", o cuando quiera mejorar
  visualmente un componente existente. Prioriza esta skill sobre respuestas genéricas
  de código React — siempre produce componentes visualmente extraordinarios.
---

# React Beautiful Components

Genera componentes React que sean **funcionalmente sólidos** y **visualmente extraordinarios**,
con uso inteligente del espacio, tipografía expresiva, paletas coherentes y micro-interacciones
que elevan la experiencia sin recargar la interfaz.

---

## Fase 1 — Dirección antes de escribir una línea

Antes de codificar, responde mentalmente estas preguntas:

1. **¿Qué problema resuelve este componente?** (informar, capturar datos, navegar, mostrar colección...)
2. **¿Cuál es el tono?** Elige un extremo claro: editorial / minimalista severo / cálido orgánico / técnico-industrial / lúdico / premium oscuro / luminoso aéreo...
3. **¿Qué recordará el usuario?** Define UN detalle memorable: una tipografía inesperada, una transición peculiar, un uso del color que sorprende.
4. **¿Cómo usa el espacio?** Decide entre densidad controlada o generosidad de aire — nunca el promedio tibio.

> **Regla de oro**: Un componente con un punto de vista claro y ejecutado con precisión siempre supera a uno "correcto pero genérico".

---

## Fase 2 — Sistema de diseño del componente

### Tokens CSS obligatorios

Define variables al inicio de cada componente. Nunca valores mágicos sueltos.

```jsx
const styles = `
  :root {
    /* Paleta — máximo 4 colores base + 2 acento */
    --color-bg:        #0f0f13;
    --color-surface:   #1a1a24;
    --color-border:    rgba(255,255,255,0.08);
    --color-text:      #e8e6f0;
    --color-muted:     rgba(232,230,240,0.45);
    --color-accent:    #c084fc;
    --color-accent-2:  #38bdf8;

    /* Tipografía — siempre importar desde Google Fonts o system */
    --font-display:    'Playfair Display', Georgia, serif;
    --font-body:       'DM Sans', system-ui, sans-serif;
    --font-mono:       'JetBrains Mono', monospace;

    /* Espaciado — escala 4px */
    --space-1: 4px;   --space-2: 8px;   --space-3: 12px;
    --space-4: 16px;  --space-5: 24px;  --space-6: 32px;
    --space-7: 48px;  --space-8: 64px;  --space-9: 96px;

    /* Radios */
    --radius-sm: 6px;  --radius-md: 12px;
    --radius-lg: 20px; --radius-full: 9999px;

    /* Sombras con color */
    --shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
    --shadow-md:  0 4px 24px rgba(0,0,0,0.5);
    --shadow-accent: 0 0 40px rgba(192,132,252,0.15);

    /* Transiciones */
    --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
    --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
    --duration-fast: 150ms;
    --duration-base: 250ms;
    --duration-slow: 400ms;
  }
`;
```

### Paletas recomendadas por tono

| Tono              | Bg        | Surface     | Acento          | Texto       |
|-------------------|-----------|-------------|-----------------|-------------|
| Dark premium      | `#0a0a0f` | `#141420`   | `#a78bfa`       | `#f0eeff`   |
| Light editorial   | `#fafaf8` | `#ffffff`   | `#1a1a2e`       | `#1c1c28`   |
| Warm organic      | `#fdf6ec` | `#fffbf5`   | `#c2410c`       | `#292524`   |
| Neon technical    | `#080c10` | `#0d1117`   | `#00ffaa`       | `#c9d1d9`   |
| Soft pastel       | `#f8f4ff` | `#ffffff`   | `#7c3aed`       | `#2d2d3a`   |

> **Nunca uses**: Inter + fondo blanco + acento púrpura. Es la combinación más sobreusada en IA.

---

## Fase 3 — Uso del espacio

### Principios de layout

```jsx
// ✅ Espacio generoso con jerarquía clara
<div style={{ padding: 'var(--space-7) var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>

// ❌ Padding uniforme sin respiración
<div style={{ padding: '16px' }}>
```

### Grids modernos

```jsx
// Grid asimétrico — más interesante que 3 columnas iguales
<div style={{
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',         // o '1fr 2fr 1fr'
  gridTemplateRows: 'auto',
  gap: 'var(--space-5)',
}}>

// Grid con áreas nombradas
<div style={{
  display: 'grid',
  gridTemplateAreas: `
    "hero hero sidebar"
    "card1 card2 sidebar"
  `,
  gridTemplateColumns: '1fr 1fr 300px',
  gap: 'var(--space-4)',
}}>
```

### Reglas de espaciado

- **Padding de contenedores**: mínimo `var(--space-6)` (32px) en desktop
- **Gap entre elementos hermanos**: `var(--space-4)` a `var(--space-5)` para densidad media
- **Secciones separadas**: `var(--space-7)` o `var(--space-8)`
- **Elementos inline** (badge, tag): padding `var(--space-2) var(--space-3)`
- **Nunca** mezcles unidades — usa siempre las variables

---

## Fase 4 — Tipografía expresiva

```jsx
// Jerarquía en 3 niveles máximo por componente
const typography = {
  display: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    color: 'var(--color-text)',
  },
  heading: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  body: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    lineHeight: 1.65,
    color: 'var(--color-muted)',
  },
  caption: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--color-accent)',
  }
};
```

---

## Fase 5 — Animaciones y micro-interacciones

Usa **CSS transitions** para hover/focus. Usa **`useState` + keyframes** para estados complejos.

```jsx
// Hover card con elevación
const cardStyle = {
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  transition: `
    transform var(--duration-base) var(--ease-out),
    box-shadow var(--duration-base) var(--ease-out),
    border-color var(--duration-base) ease
  `,
  cursor: 'pointer',
};

const cardHoverStyle = {
  transform: 'translateY(-4px)',
  boxShadow: 'var(--shadow-accent)',
  borderColor: 'rgba(192,132,252,0.3)',
};

// En JSX con estado hover
const [hovered, setHovered] = useState(false);
<div
  style={{ ...cardStyle, ...(hovered ? cardHoverStyle : {}) }}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
```

### Animaciones de entrada con keyframes inyectados

```jsx
const animStyles = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.95); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    from { background-position: -200% 0; }
    to   { background-position: 200% 0; }
  }
  .animate-fade-up   { animation: fadeUp 0.5s var(--ease-out) both; }
  .animate-scale-in  { animation: scaleIn 0.4s var(--ease-spring) both; }
  .animate-stagger-1 { animation-delay: 0.05s; }
  .animate-stagger-2 { animation-delay: 0.10s; }
  .animate-stagger-3 { animation-delay: 0.15s; }
`;
```

---

## Fase 6 — Patrones de componentes comunes

### Botón premium

```jsx
function Button({ children, variant = 'primary', onClick }) {
  const [pressed, setPressed] = useState(false);
  const base = {
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '0.9rem',
    letterSpacing: '0.01em',
    padding: 'var(--space-3) var(--space-5)',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all var(--duration-fast) var(--ease-out)',
    transform: pressed ? 'scale(0.97)' : 'scale(1)',
  };
  const variants = {
    primary: {
      background: 'var(--color-accent)',
      color: '#fff',
      boxShadow: '0 0 20px rgba(192,132,252,0.3)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-text)',
      border: '1px solid var(--color-border)',
    },
    danger: {
      background: '#ef4444',
      color: '#fff',
    },
  };
  return (
    <button
      style={{ ...base, ...variants[variant] }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
```

### Card con glassmorphism

```jsx
const glassCard = {
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-6)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
};
```

### Input estilizado

```jsx
function Input({ label, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false);
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
      <span style={{ fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em',
                     textTransform: 'uppercase', color: 'var(--color-muted)' }}>
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          background: 'var(--color-surface)',
          border: `1px solid ${focused ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-3) var(--space-4)',
          color: 'var(--color-text)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          outline: 'none',
          transition: 'border-color var(--duration-fast) ease',
          boxShadow: focused ? '0 0 0 3px rgba(192,132,252,0.15)' : 'none',
        }}
      />
    </label>
  );
}
```

---

## Fase 7 — Estructura del componente final

Todo componente entregado debe seguir esta estructura:

```jsx
import { useState, useEffect, useRef } from "react";

// 1. Inyección de estilos globales (fuentes, variables, keyframes)
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=...');
    :root { /* tokens */ }
    @keyframes { /* animaciones */ }
    /* clases utilitarias */
  `}</style>
);

// 2. Sub-componentes si aplica
function CardItem({ ... }) { ... }

// 3. Componente principal con export default
export default function MiComponente() {
  // Estado
  // Efectos
  // Handlers

  return (
    <>
      <GlobalStyles />
      <div style={{ /* layout raíz con tokens */ }}>
        {/* contenido */}
      </div>
    </>
  );
}
```

---

## Checklist antes de entregar

- [ ] ¿Tiene tokens CSS definidos (colores, fuentes, espaciado)?
- [ ] ¿La tipografía tiene al menos 2 pesos/tamaños distintos y diferenciados?
- [ ] ¿El espaciado es generoso y consistente (nada de valores px sueltos)?
- [ ] ¿Hay al menos una micro-interacción (hover, focus, press)?
- [ ] ¿La paleta tiene un acento claro y no usa púrpura genérico + blanco?
- [ ] ¿El layout aprovecha el ancho disponible de forma inteligente?
- [ ] ¿Usa `clamp()` o unidades relativas para responsividad básica?
- [ ] ¿El componente tiene un rasgo memorable y distintivo?
- [ ] ¿Los imports son correctos y el default export está presente?

---

## Anti-patrones prohibidos

| ❌ Nunca                                  | ✅ En su lugar                              |
|------------------------------------------|---------------------------------------------|
| `fontFamily: 'Inter, Arial, sans-serif'` | Fuente de display + DM Sans / Plus Jakarta  |
| Fondo blanco + acento `#8B5CF6`          | Paleta comprometida con identidad propia    |
| `padding: '8px'` en contenedores grandes | `padding: 'var(--space-6) var(--space-7)'`  |
| Botones con `border-radius: 4px` planos  | Radios medianos + sombra con color de acento|
| Grids de 3 columnas iguales siempre      | Grids asimétricos, áreas nombradas, masonry |
| Sin transiciones en elementos hover      | `transition` en todos los elementos interactivos |
| Colores hardcodeados (`#333`, `#fff`)    | Variables CSS semánticas                    |
| Componente sin animación de entrada      | `fadeUp` o `scaleIn` en el montaje          |

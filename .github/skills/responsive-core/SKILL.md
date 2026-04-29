---
name: responsive-core
description: >
  Optimiza layouts CSS y animaciones GSAP para múltiples viewports. Usa esta skill
  siempre que el usuario mencione: responsividad, animaciones GSAP en móvil, clamp(),
  unidades fluidas (vw/vh), matchMedia, touch events, rendimiento en dispositivos,
  layout roto en móvil, o cualquier tarea que combine CSS adaptativo con animaciones.
  También actívala cuando detectes valores px estáticos en CSS que deberían escalar,
  o cuando GSAP esté causando problemas de rendimiento o jank en pantallas pequeñas.
---

# Responsive Core

Convierte estilos estáticos en layouts fluidos y asegura que las animaciones GSAP
sean eficientes en cualquier dispositivo — sin jank, sin layout shifts, sin lag táctil.

---

## 1. Escaneo y migración CSS → Fluido

### Detectar candidatos a `clamp()`

Busca en `styles.css` todos los valores que deberían escalar con el viewport:

```css
/* ❌ Estático */
font-size: 48px;
padding: 80px 40px;
gap: 32px;

/* ✅ Fluido con clamp(min, preferido, max) */
font-size: clamp(1.5rem, 4vw, 3rem);
padding: clamp(2rem, 6vw, 5rem) clamp(1rem, 4vw, 2.5rem);
gap: clamp(1rem, 2.5vw, 2rem);
```

**Fórmula para calcular el valor preferido:**
```
valor-preferido = (objetivo-px / viewport-base) * 100vw
```
Ejemplo: 48px en 1200px viewport → `(48/1200)*100 = 4vw`

### Unidades vw/vh para elementos de pantalla completa

```css
/* Secciones hero o full-bleed */
.hero {
  min-height: 100svh; /* svh = safe viewport height (mobile browsers) */
  width: 100%;
}

/* Evitar overflow horizontal */
* { box-sizing: border-box; }
body { overflow-x: hidden; }
```

### Tipografía fluida con escala modular

```css
:root {
  --step--1: clamp(0.8rem, 0.17vw + 0.76rem, 0.89rem);
  --step-0:  clamp(1rem,   0.34vw + 0.91rem, 1.19rem);
  --step-1:  clamp(1.25rem, 0.61vw + 1.1rem,  1.58rem);
  --step-2:  clamp(1.56rem, 1vw + 1.31rem,    2.11rem);
  --step-3:  clamp(1.95rem, 1.56vw + 1.56rem, 2.81rem);
}
```

---

## 2. GSAP con `matchMedia()` — Animaciones por viewport

### Estructura base obligatoria

```javascript
const mm = gsap.matchMedia();

mm.add({
  // Desktop: ≥ 1024px
  isDesktop: "(min-width: 1024px)",
  // Tablet: 768px–1023px
  isTablet: "(min-width: 768px) and (max-width: 1023px)",
  // Móvil: < 768px
  isMobile: "(max-width: 767px)",
  // Preferencia de movimiento reducido
  prefersReducedMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, isTablet, isMobile, prefersReducedMotion } = context.conditions;

  if (prefersReducedMotion) {
    // Animaciones mínimas — solo fade, sin movimiento
    gsap.set(".animated", { opacity: 1 }); // mostrar sin animar
    return;
  }

  if (isDesktop) {
    // Animaciones completas — parallax, scroll-triggered, 3D
    setupDesktopAnimations();
  } else if (isTablet) {
    // Animaciones moderadas — sin parallax pesado
    setupTabletAnimations();
  } else {
    // Animaciones ligeras — solo fade y translate pequeños
    setupMobileAnimations();
  }
});
```

### Protocolo de limpieza (cleanup)

Siempre devuelve una función de cleanup para evitar memory leaks:

```javascript
mm.add("(min-width: 1024px)", (context) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section",
      start: "top 80%",
    }
  });

  tl.from(".element", { y: 60, opacity: 0, duration: 0.8 });

  // ✅ Cleanup automático al salir del breakpoint
  return () => {
    tl.kill();
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
});
```

### Animaciones móviles optimizadas

```javascript
function setupMobileAnimations() {
  // Solo propiedades GPU-accelerated: opacity, transform
  gsap.from(".card", {
    opacity: 0,
    y: 20,          // pequeño desplazamiento
    duration: 0.4,  // duración corta
    stagger: 0.08,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".cards-container",
      start: "top 90%",
      // Sin scrub en móvil — causa jank
    }
  });
}
```

---

## 3. Touch Events sin lag

### Eliminación de 300ms delay

```css
/* Aplicar a todos los elementos interactivos */
button, a, [role="button"], .swipeable {
  touch-action: manipulation; /* elimina 300ms delay */
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
}
```

### Gestos de swipe con GSAP + Pointer Events

```javascript
class TouchHandler {
  constructor(element) {
    this.el = element;
    this.startX = 0;
    this.isDragging = false;
    this.bind();
  }

  bind() {
    // Usar Pointer Events (unifica mouse + touch + stylus)
    this.el.addEventListener("pointerdown", this.onStart.bind(this), { passive: true });
    this.el.addEventListener("pointermove", this.onMove.bind(this), { passive: true });
    this.el.addEventListener("pointerup",   this.onEnd.bind(this));
    this.el.addEventListener("pointercancel", this.onEnd.bind(this));
  }

  onStart(e) {
    this.startX = e.clientX;
    this.isDragging = true;
    this.el.setPointerCapture(e.pointerId);
  }

  onMove(e) {
    if (!this.isDragging) return;
    const delta = e.clientX - this.startX;
    // Mover con GSAP en lugar de CSS directo
    gsap.set(this.el, { x: delta });
  }

  onEnd(e) {
    if (!this.isDragging) return;
    this.isDragging = false;
    const delta = e.clientX - this.startX;

    if (Math.abs(delta) > 80) {
      this.onSwipe(delta > 0 ? "right" : "left");
    } else {
      gsap.to(this.el, { x: 0, duration: 0.3, ease: "back.out(1.2)" });
    }
  }

  onSwipe(direction) {
    // Implementar lógica de swipe aquí
    console.log("Swipe:", direction);
  }
}
```

### Scroll con momentum nativo

```css
.scrollable-container {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* momentum scroll en iOS */
  overscroll-behavior: contain;      /* evita scroll chaining */
  scroll-snap-type: y mandatory;     /* opcional: snap entre secciones */
}
```

---

## 4. Detección y corrección de layout roto en móvil

### Checklist de diagnóstico

Cuando una animación de otro agente rompa el layout en móvil, verificar en orden:

1. **Overflow horizontal** — `document.documentElement.scrollWidth > window.innerWidth`
2. **Transforms sin reset** — elementos con `transform: translateX()` fuera de pantalla
3. **ScrollTrigger huérfano** — triggers sin cleanup al cambiar viewport
4. **will-change excesivo** — más de 3–4 elementos con `will-change: transform` simultáneos

### Script de diagnóstico rápido

```javascript
// Pegar en consola para detectar elementos que causan overflow
const findOverflow = () => {
  document.querySelectorAll("*").forEach(el => {
    if (el.offsetWidth > document.documentElement.offsetWidth) {
      console.warn("Overflow en:", el, el.getBoundingClientRect());
    }
  });
};
findOverflow();
```

### Reset de emergencia GSAP

```javascript
// Ejecutar cuando una animación rompa el layout
const emergencyReset = () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.clear();
  gsap.set("*", { clearProps: "all" });
  ScrollTrigger.refresh();
};
```

---

## 5. Performance — reglas de oro

| ✅ Hacer                          | ❌ Evitar                          |
|-----------------------------------|------------------------------------|
| Animar `opacity` y `transform`    | Animar `width`, `height`, `top`, `left` |
| `will-change: transform` puntual  | `will-change` en muchos elementos  |
| `ScrollTrigger` con `once: true` en móvil | `scrub` en listas largas en móvil |
| `passive: true` en listeners      | `preventDefault()` en touch move   |
| `svh` para altura en móvil        | `100vh` sin fallback en móvil      |
| Devolver cleanup en `mm.add()`    | Timelines globales sin cleanup     |

---

## Cuándo aplicar el protocolo de cleanup

Aplicar `emergencyReset()` + revisar sección 2 cuando:
- El layout tiene scroll horizontal inesperado en móvil
- Elementos aparecen fuera de pantalla tras una animación
- ScrollTrigger no se activa o se activa en posición incorrecta
- El FPS cae por debajo de 30 en dispositivos de gama media

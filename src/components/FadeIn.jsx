import { useEffect, useRef } from 'react'

// Singleton IntersectionObserver shared across FadeIn instances.
let sharedObserver = null
const observed = new WeakMap()

function getObserver() {
  if (sharedObserver) return sharedObserver
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          el.classList.add('visible')
          el.setAttribute('data-fadein-visible', 'true')
          try { if (window.gsap && typeof window.gsap.killTweensOf === 'function') window.gsap.killTweensOf(el) } catch (e) {}
          try { sharedObserver.unobserve(el) } catch (e) {}
          const cb = observed.get(el)
          if (cb) cb()
        }
      })
    },
    { rootMargin: '0px 0px -10% 0px', threshold: [0.01, 0.1] }
  )
  return sharedObserver
}

export default function FadeIn({ children, as: Tag = 'div', delay = 0, className = '', ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If already visible, mark immediately
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) {
      el.classList.add('visible')
      el.setAttribute('data-fadein-visible', 'true')
      try { if (window.gsap && typeof window.gsap.killTweensOf === 'function') window.gsap.killTweensOf(el) } catch (e) {}
      return
    }

    const obs = getObserver()
    obs.observe(el)
    observed.set(el, () => {
      try { obs.unobserve(el) } catch (e) {}
      observed.delete(el)
    })

    return () => {
      try { obs.unobserve(el) } catch (e) {}
      observed.delete(el)
    }
  }, [])

  const style = delay > 0 ? { transitionDelay: `${delay}s` } : undefined

  return (
    <Tag ref={ref} className={`fade-in ${className}`} style={style} {...props}>
      {children}
    </Tag>
  )
}

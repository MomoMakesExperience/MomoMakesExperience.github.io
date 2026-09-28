import { useEffect } from 'react'

// Révèle au scroll tout élément portant l'attribut data-reveal, une fois
// que son haut atteint 90% de la hauteur de la fenêtre (comme le design).
export function useReveal(deps = []) {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-reveal]:not([data-rv])')]
    if (!els.length) return

    const vh = () => window.innerHeight
    let pending = els

    const check = () => {
      const h = vh()
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect()
        if (r.top > h * 0.9) return true
        el.dataset.rv = '1'
        el.classList.add('is-visible')
        return false
      })
      if (!pending.length) cleanup()
    }

    let tick = false
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => { tick = false; check() })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    const t = setTimeout(check, 60)

    function cleanup() {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    return () => { clearTimeout(t); cleanup() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

import { useEffect, useRef } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const HEAD = "J'apprends en construisant.".split(' ').map((t) => ({ t, acc: true }))
const BODY_ACCENT = /^(Curieux|polyvalent|d’expérimenter|progresser|solutions|concrètes)[.,]?$/
const BODY = "Curieux et polyvalent, je transforme chaque projet en occasion d’expérimenter, de progresser et de mettre mes connaissances au service de solutions concrètes."
  .split(' ')
  .map((t) => ({ t, acc: BODY_ACCENT.test(t) }))

const WORDS = [...HEAD.map((w, i) => ({ ...w, br: i === HEAD.length - 1 })), ...BODY]

const NOTCH_DOWN = 'polygon(0 0,50% 18px,100% 0,100% calc(100% - 18px),50% 100%,0 calc(100% - 18px))'
const CHEVRON_DOWN = 'polygon(0 0,100% 0,100% calc(100% - 18px),50% 100%,0 calc(100% - 18px))'

const PRINCIPLES = [
  { n: '01', t: 'Modéliser', d: 'Poser le schéma avant le code : Merise, UML, bases relationnelles.' },
  { n: '02', t: 'Construire', d: "Du système à l'application : Linux, Oracle, PHP, Java, C." },
  { n: '03', t: 'Optimiser', d: "Comparer avant et après : temps d'exécution, charge CPU, entrées-sorties disque." },
].map((p, i) => ({
  ...p,
  band: ['var(--acc)', 'color-mix(in oklch,var(--acc) 82%,var(--ink))', 'color-mix(in oklch,var(--acc) 65%,var(--ink))'][i],
  padL: i ? '52px' : '28px',
  ml: i ? '-18px' : '0',
  clip: i
    ? 'polygon(0 0,calc(100% - 28px) 0,100% 50%,calc(100% - 28px) 100%,0 100%,28px 50%)'
    : 'polygon(0 0,calc(100% - 28px) 0,100% 50%,calc(100% - 28px) 100%,0 100%)',
  // Mobile : bandes empilées, chevron pointant vers le bas
  padMobile: i ? '40px 22px 36px' : '24px 22px 36px',
  mtMobile: i ? '-12px' : '0',
  clipMobile: i ? NOTCH_DOWN : CHEVRON_DOWN,
}))

export default function Manifesto() {
  const secRef = useRef(null)
  const isMobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    let tick = false
    const update = () => {
      const el = secRef.current
      if (!el) return
      const vh = window.innerHeight
      const r = el.getBoundingClientRect()
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9)))
      const ws = el.querySelectorAll('[data-word]')
      const n = ws.length
      ws.forEach((w, i) => { w.style.opacity = i < p * n ? '1' : '.15' })
    }
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => { tick = false; update() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section id="Mindset" ref={secRef} className="manifesto" data-screen-label="02 Manifesto">
      <div className="eyebrow-row">
        <div className="lbl">Ma façon de travailler</div>
        <div className="lbl acc">01&nbsp;<span>·</span>&nbsp;MINDSET</div>
      </div>
      <p className="manifesto-text">
        {WORDS.map((w, i) => (
          <span key={i}>
            <span data-word style={{ color: w.acc ? 'var(--acc)' : 'var(--ink)' }}>{w.t} </span>
            {w.br && <br />}
          </span>
        ))}
      </p>
      <div className="manifesto-sig">
        <span className="rule" />
        <span className="lbl">Mamadou Seck · Licence Pro Génie Informatique&nbsp;<span className="muted2">· UNIVERSITÉ GASTON BERGER</span></span>
      </div>
      <div className="principles">
        <div className="principles-row">
          {PRINCIPLES.map((p) => (
            <div
              key={p.n}
              className="principle"
              style={isMobile
                ? { padding: p.padMobile, marginTop: p.mtMobile, marginLeft: 0, background: p.band, clipPath: p.clipMobile }
                : { padding: `22px 48px 22px ${p.padL}`, marginLeft: p.ml, background: p.band, clipPath: p.clip }}
            >
              <span className="n">{p.n}</span>
              <span className="t">{p.t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { HERO_AVG_TXT, HERO_AVG_PCT } from '../data/grades'

const TITLE = 'PORTFOLIO'
const ROLE = 'Software Engineer Student'
const TECHS = ['HTML', 'CSS', 'JavaScript', 'PHP', 'Java', 'C', 'SQL', 'Oracle', 'UML', 'Merise', 'Linux']
const TICKER = [...TECHS, ...TECHS]
const NAV = [['Parcours', '#Parcours'], ['Compétences', '#Competences'], ['Formation', '#Formation'], ['Projets', '#Projets'], ['Contact', '#Contact']]

export default function Hero() {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const photoRef = useRef(null)
  const [typed, setTyped] = useState('')
  const [photoOn, setPhotoOn] = useState(false)

  // Le titre remplit exactement la largeur disponible
  useLayoutEffect(() => {
    const fit = () => {
      const h = titleRef.current
      if (!h || !h.parentElement) return
      const avail = h.parentElement.clientWidth
      if (!avail) return
      h.style.justifyContent = 'flex-start'
      h.style.fontSize = '100px'
      let w = 0
      ;[...h.children].forEach((c) => { w += c.getBoundingClientRect().width })
      w += parseFloat(getComputedStyle(h).columnGap || 0) * Math.max(0, h.children.length - 1)
      h.style.fontSize = w ? Math.min(900, (100 * avail) / w * 0.995).toFixed(1) + 'px' : ''
      h.style.justifyContent = 'space-between'
    }
    fit()
    window.addEventListener('resize', fit)
    if (document.fonts) document.fonts.ready.then(fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  // Rôle écrit lettre par lettre (une seule fois)
  useEffect(() => {
    let i = 0
    let t
    const step = () => {
      i += 1
      setTyped(ROLE.slice(0, i))
      if (i < ROLE.length) t = setTimeout(step, 55)
    }
    t = setTimeout(step, 1500)
    return () => clearTimeout(t)
  }, [])

  // Compteurs Moyenne et Crédits
  useEffect(() => {
    const els = heroRef.current.querySelectorAll('[data-count]')
    const t0 = performance.now() + 1500
    const dur = 1600
    let raf
    const step = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / dur))
      const e = 1 - Math.pow(1 - p, 3)
      els.forEach((el) => {
        el.textContent = (parseFloat(el.dataset.count) * e).toFixed(+el.dataset.dec).replace('.', ',')
      })
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Zoom photo : la photo passe en couleur et zoome légèrement quand la
  // souris passe dessus ; le titre, lui, ne bouge pas.
  const onMove = (e) => {
    const img = photoRef.current
    if (!img) return
    const r = img.getBoundingClientRect()
    const on = e.clientX > r.left + r.width * 0.2 && e.clientX < r.right - r.width * 0.2 &&
      e.clientY > r.top + r.height * 0.1 && e.clientY < r.bottom
    setPhotoOn((prev) => (prev === on ? prev : on))
  }
  const onLeave = () => setPhotoOn(false)
  // Sur mobile (pas de souris) : un tap bascule la photo en couleur
  const onTapPhoto = () => setPhotoOn((v) => !v)

  return (
    <div ref={heroRef} className="hero" onMouseMove={onMove} onMouseLeave={onLeave} data-screen-label="01 Hero">
      <div className="grid-bg"><div /><div /><div /><div /><div /><div /></div>

      <div className="mob-toprow">
        <span className="loc"><span className="dot" />Saint-Louis, Sénégal</span>
        <span>UGB</span>
      </div>

      <header className="header">
        <a href="#Accueil" className="logo">
          <img src="assets/logo-momo.png" alt="Momo Technologies" />
        </a>
        <nav className="nav">
          {NAV.map(([l, h]) => <a key={l} href={h}>{l}</a>)}
        </nav>
        <div className="head-right">
          <div className="loc">
            <span className="dot" />
            <span>Saint-Louis, Sénégal</span>
          </div>
        </div>
      </header>
      <div className="rule" />

      <main id="Accueil" className="main">
        <div className="title-wrap">
          <h1 ref={titleRef} className="title" aria-label={TITLE}>
            {[...TITLE].map((ch, i) => (
              <span key={i} className="mask" aria-hidden="true">
                <span className="ch" style={{ animationDelay: (0.15 + i * 0.07).toFixed(2) + 's' }}>{ch}</span>
              </span>
            ))}
          </h1>
        </div>

        <div
          className="photo-wrap"
          onClick={onTapPhoto}
          role="button"
          tabIndex={0}
          aria-label="Afficher la photo en couleur"
          style={{ transform: photoOn ? 'translate3d(0,-6px,0) scale(1.04)' : 'none', transformOrigin: '50% 100%', transition: 'transform .45s cubic-bezier(.2,.8,.2,1.4)', cursor: 'pointer' }}
        >
          <div className="glow" />
          <div className="photo">
            <img
              ref={photoRef}
              src="assets/portrait-v2.png"
              alt="Portrait de Momo Seck, bras croisés, t-shirt noir"
              style={{ filter: photoOn ? 'grayscale(0) saturate(.7) contrast(1.08)' : 'grayscale(1) contrast(1.08)' }}
            />
          </div>
        </div>

        <div className="content">
          <div />
          <div className="col">
            <div className="intro">
              <span className="eyebrow">Mamadou Seck ● Licence Pro Génie Informatique ● UGB</span>
              <h2 className="role" aria-label={ROLE}>
                <span aria-hidden="true">{typed}</span>
                <span className="caret" aria-hidden="true">.</span>
              </h2>
            </div>
            <div className="actions">
              <div className="stats">
                <div className="stat">
                  <span className="stat-label">Moyenne</span>
                  <span className="stat-val"><span data-count={HERO_AVG_TXT.replace(',', '.')} data-dec="2">{HERO_AVG_TXT}</span><span className="unit">/20</span></span>
                  <span className="bar"><span style={{ width: HERO_AVG_PCT }} /></span>
                </div>
                <div className="stat">
                  <span className="stat-label">Crédits</span>
                  <span className="stat-val"><span data-count="120" data-dec="0">0</span><span className="unit">/180</span></span>
                  <span className="bar"><span style={{ width: '67%' }} /></span>
                </div>
                <div className="stat hl">
                  <span className="stat-label">Major de promo</span>
                  <span className="stat-val"><span className="hash">#</span>1</span>
                  <span className="bar"><span style={{ width: '100%' }} /></span>
                </div>
              </div>
              <div className="btns">
                <a href="#Mindset" className="btn">
                  <span className="ico solid">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square"><path d="M12 4v15" /><path d="m6 13 6 6 6-6" /></svg>
                  </span>
                  <span className="lbl">Découvrir</span>
                </a>
                <a href="assets/CV-Mamadou-SECK.pdf" download className="btn cv">
                  <span className="ico ring">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="round"><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 17h4" /></svg>
                  </span>
                  <span className="lbl">Télécharger mon CV</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="band">
        <div className="band-track">
          {TICKER.map((t, i) => (
            <div key={i} className="band-item"><span>{t}</span><i /></div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { ORACLE_PROJECT, PROJECTS_GRID } from '../data/projects'

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
    <path d="M12 4v12" /><path d="m6 10 6 6 6-6" /><path d="M4 20h16" />
  </svg>
)

function OracleMobile() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Le survol du scroll (couleur au centre de l'écran) est appliqué en
  // manipulant directement la classe DOM plutôt que via un state React :
  // un re-render ici réinitialiserait la classe "is-visible" posée par
  // useReveal et casserait l'animation d'apparition.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const on = r.top < vh * 0.6 && r.bottom > vh * 0.25
      el.classList.toggle('in-view', on)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <article ref={ref} data-reveal className="proj-oracle-mobile">
      <div className="img-wrap">
        <img src={ORACLE_PROJECT.img} alt={ORACLE_PROJECT.alt} />
        <div className="veil" />
        <span className="badge">01</span>
      </div>
      <div className="body">
        <div className="chips">
          <span>Projet principal</span>
          <span>Projet tutoré · LPGI</span>
          <span>En binôme</span>
        </div>
        <span className="tags">{ORACLE_PROJECT.tags}</span>
        <h3>{ORACLE_PROJECT.title}</h3>
        <p className={open ? 'open' : ''}>{ORACLE_PROJECT.text}</p>
        <button type="button" className="more" onClick={() => setOpen((v) => !v)}>{open ? 'Réduire ↑' : 'Lire la suite ↓'}</button>
        <div className="actions">
          <a href={ORACLE_PROJECT.reportHref} download className="pill">Télécharger le rapport <DownloadIcon /></a>
          <a href={ORACLE_PROJECT.zipHref} download className="pill ghost">Scripts SQL · ZIP</a>
        </div>
      </div>
    </article>
  )
}

function ProjectsCarousel() {
  const trackRef = useRef(null)
  const [i, setI] = useState(0)
  const last = PROJECTS_GRID.length - 1

  const go = (idx) => {
    const el = trackRef.current
    if (!el || !el.children[0]) return
    const w = el.children[0].offsetWidth + 12
    el.scrollTo({ left: Math.max(0, Math.min(last, idx)) * w, behavior: 'smooth' })
  }

  const onScroll = () => {
    const el = trackRef.current
    if (!el || !el.children[0]) return
    const w = el.children[0].offsetWidth + 12
    const idx = Math.max(0, Math.min(last, Math.round(el.scrollLeft / w)))
    setI((prev) => (prev === idx ? prev : idx))
  }

  return (
    <div>
      <div className="carousel-head">
        <span className="count"><b>{String(i + 2).padStart(2, '0')}</b> / 06</span>
        <div className="carousel-arrows">
          <button type="button" className="carousel-arrow" aria-label="Projet précédent" disabled={i === 0} onClick={() => go(i - 1)}>←</button>
          <button type="button" className="carousel-arrow" aria-label="Projet suivant" disabled={i === last} onClick={() => go(i + 1)}>→</button>
        </div>
      </div>
      <div ref={trackRef} onScroll={onScroll} className="carousel-track">
        {PROJECTS_GRID.map((p, k) => (
          <article key={p.n} className={`carousel-card${i === k ? ' active' : ''}`}>
            <div className="img-wrap">
              <img src={p.img} alt={p.alt} loading="lazy" />
              <span className="badge">{p.n}</span>
            </div>
            <div className="body">
              <span className="tags">{p.tags}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <div className="links">
                {p.hasLink && (
                  <a href={p.href} download={!p.href2 ? '' : undefined} target={p.href2 ? '_blank' : undefined} rel="noopener" className="pill">
                    {p.lab1} <DownloadIcon />
                  </a>
                )}
                {p.pending && <span className="pending-lbl">Lien à ajouter</span>}
                {p.href2 && <a href={p.href2} download className="pill ghost">{p.lab2}</a>}
              </div>
            </div>
          </article>
        ))}
        <div style={{ flex: '0 0 8px' }} />
      </div>
      <div className="carousel-dots">
        {PROJECTS_GRID.map((p, k) => <span key={p.n} className={i === k ? 'active' : ''} />)}
      </div>
    </div>
  )
}

export default function Projects() {
  useReveal()
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <section id="Projets" className="projects-wrap section-bordered" data-screen-label="07 Work">
      <div className="section">
        <div className="projects-head">
          <h2 className="sec-title">Projets<span className="acc proj-title-acc">realises</span></h2>
          <div className="lbl acc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>06 · Projets</div>
        </div>

        <div className="projects-grid">
          <article data-reveal className="proj-card big">
            <img src={ORACLE_PROJECT.img} alt={ORACLE_PROJECT.alt} />
            <div className="veil" />
            <span className="badge">01</span>
            <div className="info">
              <div className="chips">
                <span className="chip solid">Projet principal</span>
                <span className="chip">Projet tutoré · LPGI</span>
                <span className="chip">En binôme</span>
              </div>
              <span className="tags">{ORACLE_PROJECT.tags}</span>
              <h3>{ORACLE_PROJECT.title}</h3>
              <p className="desc">{ORACLE_PROJECT.text}</p>
              <div className="proj-links">
                <a href={ORACLE_PROJECT.reportHref} download className="pill">Télécharger le rapport <DownloadIcon /></a>
                <a href={ORACLE_PROJECT.zipHref} download className="pill ghost">Scripts SQL · ZIP</a>
              </div>
            </div>
          </article>

          {PROJECTS_GRID.map((p) => (
            <article key={p.n} data-reveal className="proj-card" style={{ gridArea: p.area }}>
              <img src={p.img} alt={p.alt} loading="lazy" />
              <div className="veil" />
              <span className="badge">{p.n}</span>
              <div className="info">
                <span className="tags">{p.tags}</span>
                <h3>{p.title}</h3>
                <p className="desc">{p.text}</p>
                <div className="proj-links">
                  {p.hasLink && (
                    <a href={p.href} download={!p.href2 ? '' : undefined} target={p.href2 ? '_blank' : undefined} rel="noopener" className="pill">
                      {p.lab1} <DownloadIcon />
                    </a>
                  )}
                  {p.pending && <span className="pending-lbl">Lien à ajouter</span>}
                  {p.href2 && (
                    <a href={p.href2} download className="pill ghost">{p.lab2}</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Version mobile : carte Oracle pleine largeur + carrousel */}
        <div className="projects-mobile">
          <OracleMobile />
          {isMobile && <ProjectsCarousel />}
        </div>
      </div>
    </section>
  )
}

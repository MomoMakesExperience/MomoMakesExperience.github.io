import { useReveal } from '../hooks/useReveal'
import { ORACLE_PROJECT, PROJECTS_GRID } from '../data/projects'

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
    <path d="M12 4v12" /><path d="m6 10 6 6 6-6" /><path d="M4 20h16" />
  </svg>
)

export default function Projects() {
  useReveal()

  return (
    <section id="Projets" className="projects-wrap section-bordered" data-screen-label="07 Work">
      <div className="section">
        <div className="projects-head">
          <h2 className="sec-title">Projets<span className="acc">realises</span></h2>
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
      </div>
    </section>
  )
}

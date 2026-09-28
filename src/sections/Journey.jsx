import { useReveal } from '../hooks/useReveal'
import { JOURNEY } from '../data/journey'

const ST_LINE = ['var(--acc)', 'linear-gradient(90deg,var(--acc) 55%,var(--line) 55%)', 'var(--line)']
const ST_INK = ['var(--ink)', 'var(--acc)', 'var(--ink)']

export default function Journey() {
  useReveal()

  return (
    <section id="Parcours" className="journey-wrap section-bordered" data-screen-label="04 Journey">
      <div className="section">
        <div className="journey-head">
          <h2 className="sec-title">Road<span className="acc">map</span></h2>
          <div className="lbl acc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>03 · Parcours académique</div>
        </div>
        <div className="journey-list">
          {JOURNEY.map((j) => (
            <article key={j.n} className="journey-item">
              <span data-reveal className="pline" style={{ background: ST_LINE[j.st] }} />
              <div className="journey-head-col">
                <span data-reveal className="n">{j.n}</span>
                <div className="title-mask">
                  <h3 data-reveal className="reveal-title" style={{ color: j.st === 1 ? 'var(--acc)' : 'var(--ink)' }}>{j.titlePlain}</h3>
                </div>
              </div>
              <div data-reveal className="journey-body">
                <div className="journey-tagrow">
                  {j.st === 1 && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--acc)', animation: 'pulse 1.8s ease-out infinite' }} />}
                  <span className={`journey-tag${j.st === 2 ? ' dashed' : ''}`}>{j.tag}</span>
                </div>
                {j.place && <span className="journey-place">{j.place}</span>}
                <p>{j.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

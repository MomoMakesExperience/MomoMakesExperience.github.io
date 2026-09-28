import { useState } from 'react'
import { SEMESTERS } from '../data/semesters'

export default function Formation() {
  const [sel, setSel] = useState(4) // Semestre 5, en cours, par défaut
  const s = SEMESTERS[sel]

  return (
    <section id="Formation" className="formation-wrap section-bordered" data-screen-label="06 Formation">
      <div className="section">
        <div className="formation-top">
          <h2 className="sec-title">Le <span className="acc">programme</span></h2>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignSelf: 'end' }}>
            <div className="lbl acc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>05 · Formation LPGI</div>
          </div>
        </div>

        <div className="formation-hint">
          <span className="arrow">→</span>
          <span>Choisis un semestre dans la liste</span>
        </div>

        <div className="formation-grid">
          <div className="sem-list">
            {SEMESTERS.map((m, i) => {
              const active = i === sel
              const now = m.st === 1
              const done = m.st === 0
              return (
                <button
                  key={m.code}
                  type="button"
                  onClick={() => setSel(i)}
                  className={`sem-btn${active ? ' active' : ''}${now ? ' now' : ''}${done ? ' done' : ''}`}
                >
                  <span className="rail">
                    <span className="rail-line" />
                    <span className="dot" />
                  </span>
                  <span className="row">
                    <span className="num">Semestre {m.num}</span>
                    <span className="status">{m.status}</span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="sem-detail">
            <span className="big">Semestre <span className="acc">{s.num}</span></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="sem-meta">
                <span className="status-chip" style={{ borderStyle: s.st === 2 ? 'dashed' : 'solid' }}>{s.status}</span>
                <span className="cred">{s.credits} crédits</span>
                <span className={`avg${s.hasAvg ? ' has' : ''}`}>Moyenne <strong>{s.avg}</strong></span>
              </div>
              <h3>{s.tag}</h3>
              <p>{s.text}</p>
              <div className="sem-modules">
                <span className="lbl">Modules du semestre</span>
                <div className="mod-grid">
                  {s.modules.map((md) => (
                    <span key={md.n} className="mod-chip">
                      <span className="n">{md.n}</span>{md.t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

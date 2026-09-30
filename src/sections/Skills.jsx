import { SKILLS } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

function SkillItem({ item }) {
  if (item.hasLogo) {
    return (
      <span title={item.name} className="skill-logo">
        <img src={item.logo} alt={item.name} style={{ width: item.w, height: item.h, objectFit: item.fit, filter: item.filt }} />
      </span>
    )
  }
  if (item.isWm) {
    return <span title={item.name} className="skill-wm">{item.name}</span>
  }
  return <span className="skill-chip">{item.name}</span>
}

const mobileLabel = (name) => (name === 'Microsoft Office' ? 'Office' : name)

function SkillTile({ item }) {
  return (
    <div className="skill-tile">
      <span className="glyph">
        {item.hasLogo && <img src={item.logo} alt="" style={{ width: item.w, height: item.h, objectFit: item.fit, filter: item.filt }} />}
        {item.isWm && <span className="wm">{item.name}</span>}
        {item.isChip && <span className="chip">{item.mono || item.name.slice(0, 1)}</span>}
      </span>
      <span className="lbl">{mobileLabel(item.name)}</span>
    </div>
  )
}

export default function Skills() {
  useReveal()
  return (
    <section id="Competences" className="skills-wrap section-bordered" data-screen-label="05 Skills">
      <div className="skills-head section">
        <h2 className="sec-title">Tech<span className="acc">stack</span></h2>
        <div className="lbl acc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>04 · Compétences techniques</div>
      </div>

      <div className="skills-rows">
        {SKILLS.map((s) => (
          <div key={s.n} className="skill-row">
            <span className="n">{s.n}</span>
            <span className="name">{s.disp}</span>
            <span className="skill-items">
              {s.items.map((c) => <SkillItem key={c.name} item={c} />)}
            </span>
          </div>
        ))}
      </div>

      {/* Version mobile : un bloc par catégorie + grille de tuiles */}
      <div className="skills-mobile">
        {SKILLS.map((s) => (
          <div key={s.n} className="skill-block" data-reveal>
            <div className={`skill-block-head${s.n === '03' ? ' acc' : ''}`}>
              <div className="top">
                <span className="num">{s.n}</span>
                <span className="name">{s.disp}</span>
              </div>
              <span className="count">{String(s.items.length).padStart(2, '0')} outils</span>
            </div>
            <div className="skill-tiles" style={{ gridTemplateColumns: `repeat(${Math.min(4, s.items.length)},minmax(0,1fr))` }}>
              {s.items.map((c) => <SkillTile key={c.name} item={c} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

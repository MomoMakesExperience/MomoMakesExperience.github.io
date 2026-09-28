import { SKILLS } from '../data/skills'

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

export default function Skills() {
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
    </section>
  )
}

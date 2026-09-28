import { useReveal } from '../hooks/useReveal'

const COLS = [
  { k: 'Qui SUIS-JE ?', t: "Je m'appelle Mamadou Seck. Je suis 3ème année de Licence pro en génie informatique à l'Université Gaston Berger de Saint-Louis.", acc: false },
  { k: 'Formation', t: "Ma formation m'a permis d'explorer les différentes étapes d'un projet numérique, du développement aux bases de données, en passant par les systèmes, les réseaux, UML et la gestion de projet.", acc: false },
  { k: 'Objectif', t: "Évoluer au sein d'une équipe dynamique, participer à des projets informatiques concrets et renforcer mes compétences, particulièrement dans la gestion et l'exploitation des données.", acc: true },
]

const ROWS = [
  ['nom', 'Mamadou Seck'],
  ['formation', 'Licence Pro Génie Informatique'],
  ['niveau', 'L3 · en cours'],
  ['universite', 'Université Gaston Berger'],
  ['ville', 'Saint-Louis'],
  ['objectif', 'Développement · Bases de données'],
]

export default function About() {
  useReveal()

  return (
    <section className="about" data-screen-label="03 About">
      <div className="eyebrow-row">
        <div className="lbl">À propos</div>
        <div className="lbl acc">02 · About</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
        <p data-reveal className="about-lead">
          Etudiant en <span className="acc">genie informatique</span>, avec un interet marque pour les <span className="acc">bases de donnees</span>.
        </p>
        <div className="about-grid">
          <div className="about-cols">
            {COLS.map((c, i) => (
              <div key={c.k} data-reveal className={`about-col${c.acc ? ' acc' : ''}`} style={{ transitionDelay: (i * 0.1).toFixed(1) + 's' }}>
                <span className="k">{c.k}</span>
                <p>{c.t}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="sql-card">
            <div className="head">
              <span className="m">SQL&gt; </span><span className="kw">SELECT</span> * <span className="kw">FROM</span> etudiant <span className="kw">WHERE</span> nom = <span className="str">'SECK'</span>;
            </div>
            <div className="rows">
              {ROWS.map(([k, v], i) => (
                <div key={k} className="sql-row">
                  <span className="k">{k}</span>
                  <span style={{ color: i === 5 ? 'var(--acc)' : 'var(--ink)', fontWeight: i === 5 ? 700 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="sql-foot">1 ligne sélectionnée.<span className="caret" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

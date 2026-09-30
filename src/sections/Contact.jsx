import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const WA_HREF = 'https://wa.me/221771934180?text=Bonjour%20Mamadou%2C%20j%27ai%20d%C3%A9couvert%20votre%20portfolio%20et%20j%27aimerais%20collaborer%20avec%20vous.%20Pouvons-nous%20en%20discuter%20%3F'
const LI_HREF = 'https://www.linkedin.com/in/mamadouseck2025/'
const GMAIL_HREF = 'https://mail.google.com/mail/?view=cm&to=seckmamadou2506@gmail.com'

export default function Contact() {
  useReveal()
  const [form, setForm] = useState({ nom: '', prenom: '', mail: '', msg: '' })
  const [sent, setSent] = useState(false)

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    const who = [form.prenom, form.nom].filter(Boolean).join(' ')
    const subject = encodeURIComponent('Contact portfolio · ' + who)
    const body = encodeURIComponent((form.msg || '') + '\n\n' + who + ' · ' + (form.mail || ''))
    window.location.href = `mailto:seckmamadou2506@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 2500)
  }

  return (
    <section id="Contact" className="contact-wrap" data-screen-label="09 Contact">
      <div className="section contact-inner">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div className="contact-title-row">
            <div className="lbl acc" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, letterSpacing: '.08em', textTransform: 'uppercase' }}>07 · Me contacter</div>
          </div>
          <h2 className="contact-title">
            <span className="line"><span data-reveal className="reveal-title">Envie de collaborer ?</span></span>
            <span className="line"><span data-reveal className="reveal-title acc">Écrivez-moi.</span></span>
          </h2>
        </div>

        <div className="contact-grid">
          <div className="contact-left">
            <div className="contact-open">
              <span className="lbl">Ouvert à</span>
              <div className="open-grid">
                <div className="open-card acc">
                  <span className="t">CDI</span>
                  <p>Rejoindre une équipe, apprendre auprès d'elle et contribuer sur la durée.</p>
                </div>
                <div className="open-card">
                  <span className="t">Freelance</span>
                  <p>Intervenir sur un projet précis, avec un périmètre et des objectifs clairs.</p>
                </div>
              </div>
            </div>

            <div className="contact-buttons">
              <a href="mailto:seckmamadou2506@gmail.com" className="contact-btn fill">
                <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></svg></span>
                <span className="txt">seckmamadou2506@gmail.com</span>
              </a>
              <a href="tel:+221771934180" className="contact-btn line">
                <span className="ic"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.1 9.9a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg></span>
                <span className="txt">+221 77 193 41 80</span>
              </a>
            </div>

            <div className="contact-open">
              <span className="lbl">Mes réseaux</span>
              <div className="socials">
                <a href={WA_HREF} target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" width="32" height="32" />
                </a>
                <a href={LI_HREF} target="_blank" rel="noopener" aria-label="LinkedIn" title="LinkedIn">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg" alt="LinkedIn" width="32" height="32" />
                </a>
                <a href={GMAIL_HREF} target="_blank" rel="noopener" aria-label="Gmail" title="Gmail">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" width="32" height="32" />
                </a>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="contact-form">
            <h3>Votre avis nous <span className="acc">intéresse</span></h3>
            <div className="form-row">
              <label className="field">Nom *
                <input required value={form.nom} onChange={onChange('nom')} />
              </label>
              <label className="field">Prénom *
                <input required value={form.prenom} onChange={onChange('prenom')} />
              </label>
            </div>
            <label className="field">Adresse mail *
              <input required type="email" value={form.mail} onChange={onChange('mail')} />
            </label>
            <label className="field">Votre message
              <textarea rows="5" value={form.msg} onChange={onChange('msg')} />
            </label>
            <button type="submit" className="send-btn">{sent ? 'Ouverture de la messagerie…' : 'Envoyer'}</button>
          </form>
        </div>

        <footer className="contact-foot">
          <span>Copyright © Tous droits réservés à SECK Mamadou ®</span>
          <a href="#Accueil">Back to top ↑</a>
        </footer>
      </div>
    </section>
  )
}

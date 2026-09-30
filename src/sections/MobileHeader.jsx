import { useEffect, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery'

const NAV = [['#Parcours', 'Parcours'], ['#Competences', 'Competences'], ['#Formation', 'Formation'], ['#Projets', 'Projets'], ['#Contact', 'Contact']]

// Header fixe mobile uniquement (≤767px) : logo + bouton hamburger, menu plein écran.
// Ne rend rien sur desktop : n'affecte jamais le rendu ≥768px.
export default function MobileHeader() {
  const isMobile = useMediaQuery('(max-width: 767px)')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isMobile) return
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isMobile])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!isMobile && open) setOpen(false)
  }, [isMobile, open])

  if (!isMobile) return null

  const close = () => setOpen(false)

  return (
    <>
      <header className={`mob-header${scrolled || open ? ' scrolled' : ''}`}>
        <a href="#Accueil" onClick={close} className="mob-logo">
          <img src="assets/logo-momo.png" alt="Momo Technologies" />
        </a>
        <button onClick={() => setOpen((v) => !v)} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} className="mob-burger">
          <span className={`bar bar1${open ? ' open' : ''}`} />
          <span className={`bar bar3${open ? ' open' : ''}`} />
          <span className={`bar bar2${open ? ' open' : ''}`} />
        </button>
      </header>

      {open && (
        <div role="dialog" aria-label="Menu" className="mob-menu">
          <div className="mob-menu-grid"><div /><div /><div /><div /></div>
          <nav className="mob-menu-nav">
            {NAV.map(([href, t], i) => (
              <a key={href} href={href} onClick={close} style={{ animationDelay: (0.05 + i * 0.06).toFixed(2) + 's' }}>
                <span className="n">0{i + 1}</span>
                <span className="t">{t}</span>
              </a>
            ))}
          </nav>
          <div className="mob-menu-foot">
            <div className="loc"><span className="dot" />Saint-Louis, Sénégal</div>
            <a href="assets/CV-Mamadou-SECK.pdf" download className="mob-cv">
              <span className="ic">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="round"><path d="M14 3H6v18h12V7z" /><path d="M14 3v4h4" /><path d="M9 13h6M9 17h4" /></svg>
              </span>
              <span>Télécharger mon CV</span>
            </a>
          </div>
        </div>
      )}
    </>
  )
}

import { useEffect, useRef } from 'react'
import MobileHeader from './sections/MobileHeader.jsx'
import Hero from './sections/Hero.jsx'
import Manifesto from './sections/Manifesto.jsx'
import About from './sections/About.jsx'
import Journey from './sections/Journey.jsx'
import Skills from './sections/Skills.jsx'
import Formation from './sections/Formation.jsx'
import Projects from './sections/Projects.jsx'
import Contact from './sections/Contact.jsx'

export default function App() {
  const progRef = useRef(null)

  useEffect(() => {
    let tick = false
    const update = () => {
      const de = document.documentElement
      const max = de.scrollHeight - window.innerHeight
      const y = window.scrollY || de.scrollTop
      if (progRef.current) progRef.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`
    }
    const onScroll = () => {
      if (tick) return
      tick = true
      requestAnimationFrame(() => { tick = false; update() })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div className="page">
      <div ref={progRef} className="progress" />
      <MobileHeader />
      <Hero />
      <Manifesto />
      <About />
      <Journey />
      <Skills />
      <Formation />
      <Projects />
      <Contact />
    </div>
  )
}

const dev = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`
const devWordmark = (n) => `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original-wordmark.svg`
const plain = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '')

// name, logo url (empty = no logo -> wordmark for UML/Merise or a text chip otherwise)
const I = (name, logo) => {
  const hasLogo = !!logo
  const isWm = !logo && (name === 'UML' || name === 'Merise')
  const isChip = !logo && !isWm
  const w = name === 'Oracle' ? '112px' : name === 'MySQL' ? '96px' : name === 'Visual Basic' ? '80px' : '52px'
  const h = name === 'Oracle' ? '28px' : name === 'MySQL' ? '60px' : '52px'
  const fit = name === 'Oracle' ? 'cover' : 'contain'
  const filt = name === 'GitHub' ? 'invert(1)' : 'none'
  return { name, logo, hasLogo, isWm, isChip, w, h, fit, filt }
}

export const SKILLS = [
  { n: '01', title: 'Programmation', items: [I('C', 'assets/logo-c.svg'), I('Java', dev('java')), I('Visual Basic', 'assets/logo-vb.png')] },
  { n: '02', title: 'Web Dev', items: [I('HTML', dev('html5')), I('CSS', dev('css3')), I('JavaScript', dev('javascript')), I('PHP', dev('php'))] },
  { n: '03', title: 'Bases de données', items: [I('Oracle', dev('oracle')), I('PostgreSQL', dev('postgresql')), I('MySQL', devWordmark('mysql'))] },
  { n: '04', title: 'Modélisation', items: [I('UML', ''), I('Merise', '')] },
  { n: '05', title: 'Administration', items: [I('Linux', dev('linux')), I('Windows', dev('windows11'))] },
  { n: '06', title: 'Outils', items: [I('GitHub', dev('github')), I('Microsoft Office', 'assets/logo-office-icon.png'), I('Excel', 'assets/logo-excel.png'), I('Access', 'assets/logo-access.png')] },
  { n: '07', title: 'Mathématiques', items: [I('Algèbre', ''), I('Analyse', ''), I('Probabilités', ''), I('Statistiques', '')] },
].map((s) => ({ ...s, disp: plain(s.title) }))

const ext = (h) => (h || '').split('.').pop().toUpperCase()

const RAW = [
  {
    title: 'Application de facturation en VB.NET',
    tags: 'VB.NET • Access',
    img: 'assets/proj-vb.jpg',
    alt: 'Capture d\'une application de facturation en VB.NET',
    text: 'Application de gestion et de facturation conçue en VB.NET.',
    href: 'assets/Facturation-VBNET-mode-emploi.pdf',
    cta: "Mode d'emploi",
    href2: 'assets/Projet-Facturation-VBNET.zip',
  },
  {
    title: "Système de gestion d'un aéroport en C",
    tags: 'C • Structures de données • Algo 4',
    img: 'assets/proj-algo.png',
    alt: "Illustration de structures de données",
    text: "Gestion des opérations d'un aéroport en C, autour de trois structures de données.",
    href: 'assets/Gestion-aeroport-C-rapport.pdf',
    cta: 'Rapport',
    href2: 'assets/Projet-Aeroport-C-code.zip',
  },
  {
    title: "Gestion d'élèves en PHP / MySQL",
    tags: 'PHP • MySQL • CRUD',
    img: 'assets/proj-php.png',
    alt: 'Capture d\'une application de gestion des élèves',
    text: 'Application CRUD de gestion des élèves. Base de données « ecole », table « eleve ».',
    href: 'assets/Projet-Gestion-Eleves-PHP.zip',
    cta: 'Code source',
  },
  {
    title: 'Site Web en HTML & CSS',
    tags: 'HTML5 • CSS3',
    img: 'assets/proj-htmlcss.png',
    alt: 'Écran affichant du code HTML/CSS',
    text: "Conception d'un site web statique en co-production lors du module Programmation Internet. Ce projet a favorisé l'application de standards web pour la structure HTML, le design adaptatif CSS et l'optimisation du code.",
    href: 'assets/Projet-HTML-CSS.zip',
    cta: 'Voir le projet',
  },
  {
    title: 'Guide des composants PC',
    tags: 'Architecture des ordinateurs • Rapport',
    img: 'assets/proj-archi.jpg',
    alt: "Composants internes d'un ordinateur",
    text: "Réalisation d'un recueil pédagogique présentant les principaux composants d'un ordinateur, leur rôle, leurs caractéristiques et leur fonctionnement.",
    href: 'assets/Guide-composants-PC.pdf',
    cta: 'Télécharger le document',
  },
]

const PROJECTS = RAW.map((p) => ({ ...p })).map((p) => {
  if (!p.href2 && /\.zip$/i.test(p.href || '')) {
    p.href2 = p.href
    p.href = ''
  }
  if (p.cta === 'Voir le projet') p.cta = 'Code source'
  if (p.cta === 'Télécharger le document') p.cta = 'Guide'
  return p
}).map((p, i) => {
  const hasLink = !!p.href
  const pending = !p.href && !p.href2
  const lab1 = p.href2 ? p.cta : `${p.cta} · ${ext(p.href)}`
  const lab2 = p.href2 ? `Code · ${ext(p.href2)}` : ''
  return { ...p, n: String(i + 2).padStart(2, '0'), hasLink, pending, lab1, lab2 }
})

// Position dans la grille (l'Oracle occupe la case 1/1/3/3, gérée séparément)
const AREAS = ['1 / 3 / 2 / 4', '2 / 3 / 3 / 4', '3 / 1 / 4 / 2', '3 / 2 / 4 / 3', '3 / 3 / 4 / 4']

export const PROJECTS_GRID = PROJECTS.map((p, i) => ({ ...p, area: AREAS[i] }))

export const ORACLE_PROJECT = {
  title: "Optimisation d'une base de données Oracle",
  tags: 'Oracle 11g · SQL · PL/SQL',
  img: 'assets/project-oracle.png',
  alt: 'Baies de serveurs dans un data center',
  text: "Projet tutoré de Licence professionnelle en génie informatique, réalisé en binôme sous Oracle 11g (version gratuite). Le principe : mesurer les performances avant et après chaque optimisation, sur un jeu d'essai de volume significatif. Deux axes ont été traités : l'optimisation applicative (index, réécriture des requêtes) et l'optimisation de la modélisation (dénormalisation, clés étrangères).",
  reportHref: 'assets/Rapport-projet-tutore-optimisation-BDD.pdf',
  zipHref: 'assets/Projet-Optimisation-Oracle.zip',
}

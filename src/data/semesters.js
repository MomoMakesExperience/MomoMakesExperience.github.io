import { GRADES } from './grades'

const STATUS = ['Validé', 'En cours', 'À venir']

const TEXT = [
  ["Acquisition des bases de l'algorithmique et de la programmation. Étude de l'architecture des ordinateurs et du système d'exploitation Windows. Mathématiques fondamentales : algèbre 1, analyse 1 et probabilités 1.", 'Fondamentaux'],
  ["Anglais technique et perfectionnement en Excel avancé. Poursuite de l'algorithmique et introduction à la programmation Internet. Étude des réseaux et systèmes, ainsi que poursuite des mathématiques : algèbre 2, analyse 2, probabilités et statistiques.", 'Réseaux · Web'],
  ["Programmation en C avancée et programmation Internet côté client. Introduction à l'environnement Linux. Analyse informatique et modélisation Merise, ainsi que les bases de données relationnelles.", 'C · Merise · BDD'],
  ["Administration de bases de données et poursuite de la programmation en C. Programmation Internet côté serveur avec PHP, et accès aux données avec Visual Basic. Réalisation d'un premier projet professionnel personnel.", 'PHP · Admin BD'],
  ["Modélisation UML et programmation orientée objet en Java. Administration de bases de données Oracle et administration des systèmes Windows/Linux. Gestion de projets et réalisation d'un second projet professionnel personnel.", 'Java · Oracle · UML'],
  ["Immersion en milieu professionnel via le stage de fin d'études. Validation et mise en application directe de l'ensemble des compétences académiques. Une étape clé pour transformer la théorie en expérience concrète.", 'Stage'],
]

const MODULES = [
  ['Algorithmique et programmation en C 1', 'Architecture des ordinateurs', "Système d'exploitation Windows", 'Algèbre 1', 'Analyse 1', 'Probabilités 1'],
  ['Algorithmique et programmation en C 2', 'Programmation Internet', 'Fondements des systèmes et réseaux', 'Algèbre 2', 'Probabilités 2 et statistiques', 'Analyse 2', 'Excel avancé', 'Anglais technique'],
  ['Algorithmique et programmation en C 3', 'Programmation Internet côté client', 'Modélisation Merise', 'Bases de données', "Système d'exploitation Linux"],
  ['Algorithmique et programmation en C 4', 'Visual Basic', 'Programmation côté serveur avec PHP', 'ADB Oracle', 'Projet tutoré 1'],
  ['Programmation orientée objet', 'Oracle', 'Modélisation UML', 'Administration Windows', 'Gestion de projets', 'Projet tutoré 2'],
  ["Stage de fin d'études"],
]

export const SEMESTERS = TEXT.map(([text, tag], i) => {
  const st = i < 4 ? 0 : i === 4 ? 1 : 2
  const grade = GRADES[i]
  return {
    code: 'S' + (i + 1),
    num: i + 1,
    text,
    tag,
    status: STATUS[st],
    st,
    credits: st === 0 ? '30 / 30' : st === 1 ? 'en cours / 30' : '— / 30',
    avg: grade != null ? grade.toFixed(2).replace('.', ',') + ' / 20' : 'à compléter',
    hasAvg: grade != null,
    modules: MODULES[i].map((t, k) => ({ t, n: String(k + 1).padStart(2, '0') })),
  }
})

const plain = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '')

export const JOURNEY = [
  {
    n: '01',
    tag: 'Obtenu',
    title: 'Baccalauréat scientifique',
    place: 'Lycée Abdoulaye Sadji · Rufisque',
    text: "Un socle en sciences et en mathématiques, point de départ de mon orientation vers l'informatique.",
    st: 0,
  },
  {
    n: '02',
    tag: 'En cours',
    title: 'Licence professionnelle en génie informatique',
    place: 'Université Gaston Berger · Saint-Louis',
    text: 'Algorithmique, développement, systèmes et réseaux, bases de données, modélisation et gestion de projets.',
    st: 1,
  },
  {
    n: '03',
    tag: 'Objectif',
    title: 'Développement informatique et bases de données',
    place: 'Projet professionnel',
    text: "Je veux construire des applications solides, bien pensées côté données, et devenir à terme administrateur de bases de données.",
    st: 2,
  },
].map((j, i) => ({ ...j, titlePlain: plain(j.title), delay: (i * 0.12).toFixed(2) + 's' }))

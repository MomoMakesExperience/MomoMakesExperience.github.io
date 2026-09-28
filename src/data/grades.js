// Moyennes semestrielles S1 → S6.
// Remplir les valeurs `null` au fur et à mesure des résultats : la moyenne
// cumulée affichée dans le Hero et la section Formation se recalcule seule.
export const GRADES = [17.14, 18.06, 16.85, null, null, null]

const done = GRADES.filter((g) => g != null)
export const HERO_AVG = done.length ? done.reduce((a, b) => a + b, 0) / done.length : 0
export const HERO_AVG_TXT = HERO_AVG.toFixed(2).replace('.', ',')
export const HERO_AVG_PCT = ((HERO_AVG / 20) * 100).toFixed(1) + '%'

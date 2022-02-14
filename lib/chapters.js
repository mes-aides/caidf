const chapters = [
  { label: "Vous", name: "profil" },
  { label: "Votre famille", name: "foyer" },
  { label: "Votre logement", name: "logement" },
  { label: "Vos revenus", name: "revenus" },
  { label: "Vos projets", name: "projets" },
  { label: "Récapitulatif", name: "recapitulatif" },
  { label: "Résultat de votre simulation", name: "resultats" },
]

function getChapters() {
  return chapters
}

function getSommaireChapters() {
  return chapters.filter((c) => c.name !== "resultats")
}

function getLabel(name) {
  const chapter = chapters.find((c) => c.name === name)
  return chapter?.label || "Ma simulation"
}

const Chapters = {
  getLabel,
  getChapters,
  getSommaireChapters,
}

export default Chapters

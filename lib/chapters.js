const chapters = [
  { label: "Parlez-nous de vous", breadcrumb: "Vous", name: "profil" },
  {
    label: "Qui sont les membres de votre foyer ?",
    breadcrumb: "Votre famille",
    name: "foyer",
  },
  { label: "Votre logement", breadcrumb: "Votre logement", name: "logement" },
  {
    label: "Vos ressources personnelles",
    breadcrumb: "Vos ressources",
    name: "revenus",
  },
  {
    label: "Parlez-nous de votre projet",
    breadcrumb: "Vos projets",
    name: "projets",
  },
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

const { Step } = require("../../lib/state/steps")

const newQuestions = {
  _interetVoiture: {
    question:
      "Possédez vous un véhicule ou avez-vous l'intention d'en acheter/louer un ?",
  },
  _interetLogement: {
    question: "Recherchez vous un logement ?",
  },
  _interetEmploi: {
    question: "Recherchez vous un emploi ?",
  },
  _aleas: {
    question: "Faites-vous face à un aléa de la vie ?",
    questionType: "multiple",
    items: [
      {
        value: "maladie_invalidite",
        label: "Maladie / invalidité",
      },
      {
        value: "separation_divorce",
        label: "Séparation / divorce",
      },
      {
        value: "depart_retraite",
        label: "Départ à la retraite",
      },
      {
        value: "perte_emploi",
        label: "Perte d'emploi / chômage",
      },
      {
        value: "autre_alea",
        label: "Autre aléa",
      },
      {
        value: "aucun_alea",
        label: "Je ne fais pas face à un aléa de la vie",
      },
    ],
  },
  _interetDiagnostifFinancier: {
    question: "Avez-vous besoin d'un diagnostic financier ?",
    step: {
      isActive: (subject) =>
        (subject.demandeur?._aleas?.length == 1 &&
          subject.demandeur?._aleas[0] !== "aucun_alea") ||
        subject.demandeur?._aleas?.length > 1,
      steps: [
        new Step({
          entity: "individu",
          id: "demandeur",
          variable: "_interetDiagnostifFinancier",
        }),
      ],
    },
  },
}

module.exports = {
  addBlocks: (b) => {
    Object.keys(newQuestions).forEach((questionId) => {
      b.push(
        newQuestions[questionId].step ||
          new Step({
            entity: "individu",
            id: "demandeur",
            variable: questionId,
          })
      )
    })
  },
  addProperties: (props) => {
    Object.keys(newQuestions).forEach((questionId) => {
      props[questionId] = newQuestions[questionId]
    })
  },
}

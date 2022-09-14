import { MultipleProperty, Property } from "./properties/property.js"
import { Step } from "./state/steps.js"

const newQuestions: any = {
  _interetVoiture: new Property({
    question:
      "Possédez vous un véhicule ou avez-vous l'intention d'en acheter/louer un ?",
  }),
  _interetLogement: new Property({
    question: "Recherchez vous un logement ?",
  }),
  _interetEmploi: new Property({
    question: "Recherchez vous un emploi ?",
  }),
  _aleas: new MultipleProperty({
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
    ],
  }),
  _interetDiagnostifFinancier: {
    p: new Property({
      question: "Avez-vous besoin d'un diagnostic financier ?",
    }),
    step: {
      isActive: (subject: any) => subject.demandeur?._aleas?.length >= 1,
      steps: [
        new Step({
          key: undefined,
          chapter: undefined,
          entity: "individu",
          id: "demandeur",
          variable: "_interetDiagnostifFinancier",
        }),
      ],
    },
  },
}

export function addBlocks(b: any) {
  Object.keys(newQuestions).forEach((questionId) => {
    b.push(
      newQuestions[questionId].step ||
        new Step({
          key: undefined,
          chapter: undefined,
          entity: "individu",
          id: "demandeur",
          variable: questionId,
        })
    )
  })
}

export function addProperties(props: any) {
  Object.keys(newQuestions).forEach((questionId: string) => {
    props[questionId] = newQuestions[questionId].p || newQuestions[questionId]
  })
}

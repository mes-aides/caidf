import Individu from "../../lib/individu"
import {
  capitalize,
  displayCurrencyValue,
  displayDepcomValue,
} from "../../lib/utils"
import { ressourceCategories, ressourceTypes } from "../../lib/resources"
import Logement from "@/lib/logement"
import moment from "moment"
import { getAnswer, getStepAnswer } from "../../lib/answers"

export const getIndividuByStep = (step, component) => {
  const role = step.id.split("_")[0]
  return Individu.get(
    component.$store.getters.peopleParentsFirst,
    role,
    step.id,
    component.$store.state.dates
  ).individu
}

export const SIMPLE_STEPS = {
  ressources(step) {
    const answer = getStepAnswer(this.$store.state.simulation.answers.all, step)
    if (!answer) {
      return []
    }
    const value =
      answer.length > 0
        ? answer
            .map(
              (ressourceId) =>
                ressourceTypes.find((ressource) => ressource.id === ressourceId)
                  .label
            )
            .join(", ")
        : "Aucun revenu"

    const individu = getIndividuByStep(
      { id: step.id, role: step.id.split("_")[0] },
      this
    )
    return [
      {
        rowClass: "row-space",
        label: capitalize(Individu.label(individu, "nom")),
        labelClass: "individu-title",
        hideEdit: true,
      },
      {
        label: `Quel type de revenu ${Individu.label(individu, "percevoir")} ?`,
        value,
      },
    ]
  },
  depcom() {
    const answer = getAnswer(
      this.$store.state.simulation.answers.all,
      "menage",
      "depcom",
      undefined
    )

    return [
      {
        label: "Quel est votre code postal ?",
        value: answer
          ? displayDepcomValue(answer._codePostal, answer._nomCommune)
          : undefined,
      },
    ]
  },

  _bourseCriteresSociauxCommuneDomicileFamilial() {
    const answer = getAnswer(
      this.$store.state.simulation.answers.all,
      "individu",
      "_bourseCriteresSociauxCommuneDomicileFamilial",
      "demandeur"
    )
    return [
      {
        label: "Quel est le code postal de la commune de vos parents ?",
        value: displayDepcomValue(
          answer._bourseCriteresSociauxCommuneDomicileFamilialCodePostal,
          answer._bourseCriteresSociauxCommuneDomicileFamilialNomCommune
        ),
      },
    ]
  },

  statut_occupation_logement() {
    const answer = getAnswer(
      this.$store.state.simulation.answers.all,
      "menage",
      "statut_occupation_logement"
    )

    return [
      {
        label: "Êtes-vous ?",
        value: Logement.getStatutOccupationLabel(answer),
      },
    ]
  },
}

export const COMPLEX_STEPS = {
  enfants: {
    matcher(step) {
      const answer = getAnswer(
        this.$store.state.simulation.answers.all,
        "enfants"
      )
      return step.key.match(/\/simulation\/enfants$/) && answer !== undefined
    },
    fn() {
      const answer = getAnswer(
        this.$store.state.simulation.answers.all,
        "enfants"
      )
      return [
        {
          label: "Mes enfants à charge",
          value: answer ? `${answer} enfant(s)` : `Aucun enfant`,
        },
      ]
    },
  },

  loyer: {
    matcher(step) {
      return step.key.match(/\/loyer$/)
    },
    fn() {
      const loyerData = Logement.getLoyerData(
        this.$store.state.simulation.answers.all
      )
      return [
        {
          label: loyerData.loyerQuestion.label,
          value: loyerData.loyerQuestion.selectedValue
            ? displayCurrencyValue(loyerData.loyerQuestion.selectedValue)
            : undefined,
        },
        loyerData.chargesQuestion && {
          label: loyerData.chargesQuestion.label,
          value: loyerData.chargesQuestion.selectedValue
            ? displayCurrencyValue(loyerData.chargesQuestion.selectedValue)
            : undefined,
        },
      ].filter((item) => item)
    },
  },

  "ressources/montants": {
    matcher(step) {
      return step.key.match(/ressources\/montants\/(\w)*/)
    },
    fn(step) {
      const answer = (
        getAnswer(
          this.$store.state.simulation.answers.all,
          step.entity,
          step.variable,
          step.id
        ) || []
      ).map((ressource) => {
        const ressourceType = ressourceTypes.find((r) => r.id === ressource.id)
        return {
          ...ressourceType,
          ...ressource,
        }
      })

      let result = []
      if (answer.length) {
        const category = ressourceCategories.find(
          (category) => category.id === step.variable
        )
        const individu = getIndividuByStep(
          { id: step.id, role: step.id.split("_")[0] },
          this
        )

        result = [
          {
            labelClass: "subtitle",
            label: category && capitalize(category.label(individu)),
          },
          ...answer.map((ressource) => {
            return {
              label: capitalize(ressource.label),
              value: Object.entries(ressource.amounts).reduce(
                (accum, [key, value]) => {
                  const date = ressource.isMontantAnnuel
                    ? key
                    : capitalize(moment(key, "YYYY-MM").format("MMMM YYYY"))
                  accum[date] = displayCurrencyValue(value)
                  return accum
                },
                {}
              ),
            }
          }),
        ]
      }

      return result
    },
  },
}

import { EnumProperty, NumberProperty, Property } from "./property"
import { yearsAgo } from "../utils"

export default {
  bourse_criteres_sociaux_nombre_enfants_a_charge: new NumberProperty({
    question:
      "Combien d'enfants (vous y compris) sont à la charge de vos parents ?",
    questionType: "number",
    min: 1,
    type: "count",
  }),

  bourse_criteres_sociaux_nombre_enfants_a_charge_dans_enseignement_superieur:
    new NumberProperty({
      question: "Et combien (vous y compris) font des études supérieures ?",
      questionType: "number",
      min: 0,
      type: "count",
    }),

  bourse_lycee: new Property({
    question: "Actuellement bénéficiez-vous d'une bourse du lycée ?",
  }),

  parisien: new Property({
    question: ({ simulation }) => {
      return `Avez-vous habité Paris au moins 3 ans depuis ${yearsAgo(
        5,
        simulation.dateDeValeur
      )} ?`
    },
  }),

  proprietaire_proche_famille: new Property({
    question: `Avez-vous un lien de parenté direct avec votre propriétaire ?
      <span class="help"
        >Est-il un ascendant ou descendant de vous ou votre conjoint·e (enfant,
        grand-parent…) ?</span
      >`,
  }),

  rsa_isolement_recent: new Property({
    question: "Vivez-vous seul·e depuis plus de 18 mois ?",
  }),

  en_couple: new EnumProperty({
    question: "Vivez-vous seul·e ou en couple ?",
    questionType: "enum",
    items: [
      {
        label: "Je vis seul·e",
        value: false,
      },
      {
        label: "Je vis en couple",
        value: true,
      },
    ],
  }),
}

<template>
  <div :key="type.meta.id" class="form__group">
    <h2 v-if="!withoutHeader">
      {{ type.meta.label }}
    </h2>
    <YesNoQuestion v-model="singleValue" class="form__group" html-heading="h3">
      <span
        v-html="
          getQuestionLabel(
            individu,
            type.meta,
            $store.state.dates.twelveMonthsAgo.label
          )
        "
      />
    </YesNoQuestion>
    <label v-if="type.displayMonthly === true" class="form__group">
      Indiquez le montant <b>mensuel net</b> :
      <InputNumber
        :value="type.amounts[$store.state.dates.thisMonth.id]"
        @update:model-value="$emit('update', 'singleValue', index, $event)"
      />
    </label>

    <div v-if="type.displayMonthly === false" class="form__group">
      <div>
        Indiquez les montants <strong>nets mensuels</strong> que
        {{ getLongLabel(individu, type.meta) }}
      </div>
      <div v-for="(month, monthIndex) in type.months" :key="month.id">
        <label>
          <MonthLabel :month="month" />
          <InputNumber
            :value="type.amounts[month.id]"
            @update:model-value="
              $emit('update', 'monthUpdate', index, {
                value: $event,
                monthIndex,
              })
            "
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import MonthLabel from "@/components/month-label"
import YesNoQuestion from "@/components/yes-no-question"
import Individu from "../../../lib/individu"
import InputNumber from "@/components/input-number"

function getQuestionLabel(individu, ressource, debutAnneeGlissante) {
  let verbForms = {
    pensions_alimentaires_versees_individu: "versé",
    default: "reçu",
  }

  let verb = verbForms[ressource.id] || verbForms.default
  return `${[
    "Le montant",
    verb,
    "est-il le même <b>tous les mois</b> depuis",
    debutAnneeGlissante,
  ].join(" ")} ?`
}

function getLongLabel(individu, ressource) {
  const subject = Individu.label(individu)

  const auxForms = {
    demandeur: "avez",
    default: "a",
  }
  const aux = auxForms[individu._role] || auxForms.default

  const verbs = {
    pensions_alimentaires_versees_individu: "versés",
    default: "reçus",
  }
  const verb = verbs[ressource.id] || verbs.default

  return `${[subject, aux, verb, "en"].join(" ")} :`
}

export default {
  name: "RessourceMontants",
  components: {
    InputNumber,
    MonthLabel,
    YesNoQuestion,
  },
  props: {
    individu: Object,
    type: Object,
    index: Number,
    withoutHeader: Boolean,
  },
  emits: ["update"],
  computed: {
    singleValue: {
      get: function () {
        return this.type.displayMonthly
      },
      set: function (value) {
        this.$emit("update", "displayMonthly", this.index, value)
      },
    },
  },
  methods: {
    getQuestionLabel,
    getLongLabel,
  },
}
</script>

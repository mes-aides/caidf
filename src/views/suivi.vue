<template>
  <div class="container">
    <div class="aj-main-container">
      <div class="aj-category-title-wrapper">
        <h1>Qu'avez-vous fait avec votre simulation&nbsp;?</h1>
      </div>
      <div class="aj-box-wrapper">
        <div class="aj-unbox">
          <LoadingModal v-if="!droits">
            <p v-show="!droits"> Récupération de la situation en cours… </p>
          </LoadingModal>
          <div v-if="submitted" class="alert alert-success">
            Merci d'avoir rempli ce questionnaire !
          </div>

          <form v-if="droits && !submitted">
            <p>
              Vous avez effectué une simulation le
              <strong>{{ createdAt }}</strong
              >.
            </p>
            <p>
              Répondez à ce questionnaire afin de nous aider à améliorer la
              pertinence des résultats que nous affichons. Ça ne prend pas plus
              de 2 minutes !
            </p>
            <div
              v-for="droit in droits"
              :key="droit.id"
              class="aj-box normal-padding-bottom aj-survey-details"
              itemscope
              itemtype="http://schema.org/GovernmentService"
            >
              <div class="aj-droit-survey normal-padding-bottom">
                <DroitHeader :droit="droit" />

                <div class="aj-droit-content">
                  <fieldset class="form__group">
                    <legend>
                      <h3 class="aj-question">
                        Qu'avez-vous fait pour {{ prefix(droit)
                        }}{{ droit.label }}&nbsp;?
                      </h3>
                    </legend>
                    <div
                      v-for="choice in droit.choices"
                      :key="choice.value"
                      class="aj-selection-wrapper"
                    >
                      <input
                        :id="`choices_${droit.id}_${choice.value}`"
                        v-model="droit.choiceValue"
                        type="radio"
                        :name="`choices_${droit.id}_${choice.value}`"
                        :value="choice.value"
                      />
                      <label :for="`choices_${droit.id}_${choice.value}`">
                        {{ choice.label }}
                      </label>
                    </div>
                  </fieldset>
                  <div
                    v-show="isNegative(droit.choiceValue)"
                    class="form__group"
                  >
                    <label
                      ><h3
                        :for="`choiceComments_${droit.id}`"
                        class="aj-question"
                      >
                        Pour quelles raisons&nbsp;?
                      </h3></label
                    >
                    <textarea
                      :id="`choiceComments_${droit.id}`"
                      v-model="droit.choiceComments"
                      placeholder="..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              :class="`button large ${!isComplete ? 'secondary  ' : ''}`"
              :disabled="!isComplete"
              @click.prevent="submit"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import moment from "moment"

import Institution from "@/lib/institution"
import LoadingModal from "@/components/loading-modal"
import DroitHeader from "@/components/droit-header"

const choices = [
  { value: "already", label: "Rien, j'en bénéficiais déjà." },
  { value: "failed", label: "Je n'ai pas réussi à faire une demande." },
  { value: "asked", label: "J'ai fait une demande." },
  { value: "nothing", label: "Je n'ai rien fait." },
]

function isNegative(value) {
  return value === "failed" || value === "nothing"
}

export default {
  name: "Suivi",
  components: {
    DroitHeader,
    LoadingModal,
  },
  data: function () {
    return {
      submitted: false,
      droits: null,
      followup: null,
    }
  },
  computed: {
    createdAt: function () {
      return this.followup && moment(this.followup.createdAt).format("ll")
    },
    isComplete: function () {
      let choiceValues = this.droits.map((droit) => droit.choiceValue)
      return (
        choiceValues.filter((choiceValue) => choiceValue).length ===
        this.droits.length
      )
    },
  },
  mounted: function () {
    axios
      .get(`/api/followups/surveys/${this.$route.query.token}`)
      .then((response) => {
        this.followup = response.data
        let benefitsIds = this.followup.benefits.map((benefit) => benefit.id)

        const benefitsNormalized = Institution.benefits.all
          .filter((benefit) => benefitsIds.includes(benefit.id))
          .map((benefit) => {
            let montant = this.followup.benefits.find(
              (followupBenefit) => followupBenefit.id === benefit.id
            ).amount

            return {
              ...benefit,
              montant: montant,
              choices: choices,
              choiceValue: null,
              choiceComments: "",
            }
          })

        this.droits = benefitsNormalized
      })
  },
  methods: {
    isBoolean: (val) => typeof val === "boolean",
    isString: (val) => typeof val === "string",
    isNumber: (val) => typeof val === "number",
    isNegative,
    prefix: function (droit) {
      if (droit.prefix) {
        return `${droit.prefix}${
          droit.prefix[droit.prefix.length - 1] == "’" ? "" : " "
        }`
      }
      return ""
    },
    submit: function () {
      let answers = this.droits.map((droit) => ({
        id: droit.id,
        value: droit.choiceValue,
        comments: droit.choiceComments,
      }))

      let that = this
      axios
        .post(
          `/api/followups/surveys/${this.$route.query.token}/answers`,
          answers
        )
        .then(function (response) {
          if (response.status === 201) {
            that.submitted = true
          }
        })
    },
  },
}
</script>

<template>
  <ResultatBase>
    <div v-if="hasWarning" class="notification warning">
      <div>
        <h2>
          <i class="fa fa-warning" aria-hidden="true" /> Aucun résultat
          disponible
        </h2>
        <h3>
          La simulation à laquelle vous souhaitez accéder n‘est pas accessible.
        </h3>
        <p class="aj-results-intro">
          Pour commencer votre simulation, rendez-vous sur la
          <router-link to="home"> page d'accueil </router-link>.
        </p>
      </div>
    </div>

    <ErrorBlock v-if="hasError" />
    <ErrorSaveBlock v-if="hasErrorSave" />

    <div v-show="shouldDisplayResults">
      <div v-if="!isEmpty(droits)">
        <DroitsList :droits="droits" />
      </div>
    </div>
  </ResultatBase>
</template>

<script>
import DroitsList from "@/components/droits-list"
import ErrorBlock from "@/components/error-block"
import ErrorSaveBlock from "@/components/error-save-block"
import ResultatsMixin from "@/mixins/resultats"
import StatisticsMixin from "@/mixins/statistics"
import ResultatBase from "@/context/caidf/views/resultats/ResultatBase"

export default {
  name: "SimulationResultats",
  components: {
    ResultatBase,
    DroitsList,
    ErrorBlock,
    ErrorSaveBlock,
  },
  mixins: [ResultatsMixin, StatisticsMixin],
  mounted: function () {
    if (this.mock(this.$route.params.droitId)) {
      return
    } else if (this.$route.query?.situationId) {
      if (this.$store.state.situationId !== this.$route.query.situationId) {
        this.$store
          .dispatch("fetch", this.$route.query.situationId)
          .then(() => this.$store.dispatch("compute"))
      } else if (!this.$store.getters.hasResults) {
        this.$store.dispatch("compute")
      } // Else nothing to do
    } else if (!this.$store.getters.passSanityCheck) {
      this.restoreLatest()
    } else {
      if (this.$store.state.calculs.dirty) {
        this.$store.commit("setSaveSituationError", null)
        this.$store
          .dispatch("save")
          .then(() => {
            if (this.$store.state.access.forbidden) {
              return
            }
            return this.$store.dispatch("compute")
          })
          .catch((error) => {
            this.$store.commit(
              "setSaveSituationError",
              error.response?.data || error
            )
            this.$matomo?.trackEvent("General", "Erreur sauvegarde simulation")
          })
      } else if (!this.$store.getters.hasResults) {
        this.$store.dispatch("compute")
      }
    }

    let vm = this
    this.stopSubscription = this.$store.subscribe(({ type }, { calculs }) => {
      switch (type) {
        case "setResults": {
          calculs.resultats.droitsEligibles.forEach(function (d) {
            vm.$matomo?.trackEvent("General", "show", d.label)
          })
          this.sendStatistics(this.droits, "show")
          break
        }
        case "saveComputationFailure": {
          vm.$matomo?.trackEvent("General", "Error")
          break
        }
      }
    })
  },
  beforeUnmount: function () {
    this.stopSubscription?.()
  },
  methods: {
    isEmpty: function (array) {
      return !array || array.length === 0
    },
  },
}
</script>

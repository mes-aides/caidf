<template>
  <ResultatBase>
    <a
      class="caidf-back-button"
      type="button"
      data-testid="back"
      @click="goBack($event)"
    >
      <ArrowRight></ArrowRight>
      Retour aux résultats
    </a>

    <div class="aj-box normal-padding-bottom aj-results-details">
      <DroitsDetails
        v-if="droit"
        :droit="droit"
        :droits="droits"
        :city="situation.menage.depcom"
        :patrimoine-captured="patrimoineCaptured"
        :ressources-year-minus-two-captured="ressourcesYearMinusTwoCaptured"
      />
    </div>
  </ResultatBase>
</template>

<script>
import DroitsDetails from "@/context/caidf/components/droits-details"
import ResultatsMixin from "@/mixins/resultats"
import StatisticsMixin from "@/mixins/statistics"
import ResultatBase from "@/context/caidf/views/resultats/resultat-base"
import ArrowRight from "@/context/caidf/icons/arrow-right"

export default {
  name: "SimulationResultatsDetail",
  components: {
    ArrowRight,
    ResultatBase,
    DroitsDetails,
  },
  mixins: [ResultatsMixin, StatisticsMixin],
  computed: {
    situation: function () {
      return this.$store.getters.situation
    },
    droit: function () {
      const droitId = this.$route.params.droitId
      const droit = (this.droits || []).find(function (droit) {
        return droit.id === droitId
      })
      return droit
    },
    patrimoineCaptured: function () {
      return this.$store.getters.hasPatrimoine !== undefined
    },
    ressourcesYearMinusTwoCaptured: function () {
      return this.$store.getters.ressourcesYearMinusTwoCaptured
    },
  },
  mounted: function () {
    if (this.mock(this.$route.params.droitId)) {
      return
    } else if (!this.droits) {
      this.restoreLatest()
    } else {
      const droitId = this.$route.params.droitId
      const droit = this.droits.find(function (droit) {
        return droit.id === droitId
      })

      droit && this.$matomo?.trackEvent("General", "showDetails", droit.label)

      this.sendStatistics(this.droits, "showDetails", droitId)
    }
  },
  methods: {
    goBack: function (event) {
      event.preventDefault()
      this.$router.push("/simulation/resultats")
    },
  },
}
</script>

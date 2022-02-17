<template>
  <div class="aj-simulation caidf-resultats">
    <ProgressBar></ProgressBar>
    <Breadcrumb />
    <div>
      <div class="caidf-resultats-title">
        <div class="caidf-resultats-title-content">
          <h1>Résultat de votre simulation</h1>
          <template v-if="shouldDisplayResults">
            <div v-if="!isEmpty(droits)">
              <div
                >D’après la situation que vous avez déclaré, vous êtes à priori
                éligible à :
              </div>
              <div class="caidf-benefits-count"
                ><span>{{ droits.length }} aides</span>
                pour optimiser votre budget
              </div>
              <p class="caidf-font-body-small"
                >Ces résultats sont fondés sur les seules informations que vous
                avez indiquées et ne constituent en aucune façon un engagement
                de la part des organismes cités.</p
              >
            </div>
            <div v-else>
              <p> Pas de résultats </p>
            </div>
          </template>
        </div>
      </div>
      <div class="caidf-resultats-container">
        <div class="container aj-layout-container">
          <div class="aj-main-container">
            <div class="aj-box-wrapper">
              <div class="aj-unbox">
                <LoadingModal
                  v-if="accessStatus.fetching || resultatStatus.updating"
                >
                  <p v-show="accessStatus.fetching">
                    Récupération de la situation en cours…
                  </p>
                  <p v-show="resultatStatus.updating">
                    Calcul en cours de vos droits…
                  </p>
                </LoadingModal>

                <div v-if="hasWarning" class="notification warning">
                  <div>
                    <h2>
                      <i class="fa fa-warning" aria-hidden="true" /> Aucun
                      résultat disponible
                    </h2>
                    <h3>
                      La simulation à laquelle vous souhaitez accéder n‘est pas
                      accessible.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DroitsList from "@/components/droits-list"
import ErrorBlock from "@/components/error-block"
import ErrorSaveBlock from "@/components/error-save-block"
import LoadingModal from "@/components/loading-modal"
import ResultatsMixin from "@/mixins/resultats"
import StatisticsMixin from "@/mixins/statistics"
import ProgressBar from "@/components/progress-bar"
import Breadcrumb from "@/context/caidf/components/breadcrumb"

export default {
  name: "SimulationResultats",
  components: {
    ProgressBar,
    Breadcrumb,
    DroitsList,
    ErrorBlock,
    ErrorSaveBlock,
    LoadingModal,
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

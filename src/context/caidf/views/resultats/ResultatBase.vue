<template>
  <div class="aj-simulation caidf-resultats">
    <ProgressBar></ProgressBar>
    <Breadcrumb />
    <div>
      <div class="caidf-resultats-title">
        <div class="caidf-resultats-title-content">
          <h1>Résultat de votre simulation</h1>
          <template v-if="shouldDisplayResults">
            <div>
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
                    Récupération de vos droits…
                  </p>
                </LoadingModal>

                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingModal from "@/components/loading-modal"
import ResultatsMixin from "@/mixins/resultats"
import ProgressBar from "@/components/progress-bar"
import Breadcrumb from "@/context/caidf/components/breadcrumb"

export default {
  name: "ResultatBase",
  components: {
    ProgressBar,
    Breadcrumb,
    LoadingModal,
  },
  mixins: [ResultatsMixin],
  computed: {
    situation: function () {
      return this.$store.getters.situation
    },
  },
}
</script>

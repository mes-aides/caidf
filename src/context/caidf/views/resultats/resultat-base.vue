<template>
  <div class="aj-simulation caidf-resultats">
    <ProgressBar></ProgressBar>
    <Breadcrumb />
    <div>
      <slot name="header"></slot>

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

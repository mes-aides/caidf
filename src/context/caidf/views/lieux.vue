<template>
  <div class="aj-unbox">
    <SmallBackButton @click="goToBenefitDetail"
      >Retour à l'aide</SmallBackButton
    >

    <p v-show="updating">
      <i class="fa fa-spinner fa-spin" aria-hidden="true" /> Récupération en
      cours…
    </p>
    <div v-if="list?.length">
      <div
        v-for="(etablissement, index) in list"
        :key="index"
        class="aj-etablissement-container"
      >
        <Etablissement :etablissement="etablissement" />
      </div>
    </div>
  </div>
</template>

<script>
import Institution from "@/lib/institution"
import Etablissement from "@/components/etablissement"
import {
  getBenefitEtablissements,
  getEtablissements,
} from "@/../lib/benefits/etablissements"
import SmallBackButton from "@/context/caidf/components/small-back-button"

export default {
  name: "Lieux",
  components: {
    SmallBackButton,
    Etablissement,
  },
  data: function () {
    return {
      benefit: null,
      list: [],
      updating: true,
      window,
    }
  },
  mounted: function () {
    const city = this.$store.getters.situation.menage.depcom
    this.benefit = Institution.benefits.all.find(
      (benefit) => benefit.id === this.$route.params.benefit_id
    )
    const types = getBenefitEtablissements(this.benefit)

    getEtablissements(city, types)
      .then((etablissements) => {
        this.list = etablissements
      })
      .finally(() => {
        this.updating = false
      })
  },
  methods: {
    goToBenefitDetail() {
      if (this.benefit?.id) {
        const path = `/simulation/resultats/${this.benefit.id}`
        this.$router.push(path)
      } else {
        window?.history.back()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.aj-unbox {
  margin-top: 32px;
}
</style>

<template>
  <div class="aj-unbox">
    <router-link :to="{ name: 'resultats' }">
      <BackButton class="aj-etablissements-back-button small"
        >Retour aux résultats</BackButton
      >
    </router-link>

    <p v-show="updating">
      <i class="fa fa-spinner fa-spin" aria-hidden="true" /> Récupération en
      cours…
    </p>
    <div v-if="etablissements?.length">
      <p class="aj-etablissements-intro">
        Voici les lieux où vous pouvez y être accompagné(e) pour faire vos
        demandes et poser toutes vos questions.
      </p>

      <div
        v-for="(etablissement, index) in etablissements"
        :key="index"
        class="aj-etablissement-container"
      >
        <Etablissement :etablissement="etablissement" />
      </div>
    </div>
    <div v-else>
      <p class="aj-etablissements-intro" :v-if="error">
        {{ error }}
      </p>
      Revenir aux résultats
      <router-link to="/simulation/resultats">
        <i class="fa fa-arrow-circle-left" aria-hidden="true" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Etablissement from "@/components/etablissement"
import Individu from "../../../../lib/individu.js"
import ResultatsMixin from "@/mixins/resultats"
import BackButton from "@/components/buttons/back-button"

const list = [
  {
    isRelevant: (demandeur, situation) => {
      let demandeurAge = Individu.age(demandeur, situation.dateDeValeur)

      return demandeurAge <= 25 && demandeurAge >= 16
    },
    types: ["mission_locale", "cij"],
  },
  {
    isRelevant: (demandeur) => {
      return demandeur.activite === "chomeur"
    },
    types: ["pole_emploi"],
  },
  {
    isRelevant: (demandeur) => {
      return demandeur.handicap
    },
    types: ["maison_handicapees"],
  },
  {
    // Les centres départements d'action sociale ont des noms différents en fonction des territoires
    types: ["cdas", "centre_social", "edas", "mds", "sdsei"],
  },
  {
    types: ["ccas", "mairie", "mairie_com", "msap"],
  },
]

export default {
  name: "LieuxGeneriques",
  components: {
    BackButton,
    Etablissement,
  },
  mixins: [ResultatsMixin],
  data: function () {
    return {
      window,
    }
  },
  computed: {
    etablissements() {
      return this.$store.state.etablissementsSearch.list
    },
    updating() {
      return this.$store.state.etablissementsSearch.updating
    },
    error() {
      return this.$store.state.etablissementsSearch.error
    },
  },
  mounted() {
    if (!this.$store.getters.situation.menage.depcom) {
      this.restoreLatest()
      this.stopSubscription = this.$store.subscribe(({ type }) => {
        if (type === "reset") {
          this.loadEtablissements()
        }
      })
    } else {
      this.loadEtablissements()
    }
  },
  beforeUnmount: function () {
    this.stopSubscription?.()
  },
  methods: {
    getEtablissementsTypesBySituation() {
      let relevantTypes = []
      list.forEach((item) => {
        let isRelevant =
          !item.isRelevant ||
          item.isRelevant(
            this.$store.getters.situation.demandeur,
            this.$store.getters.situation
          )
        if (isRelevant) {
          relevantTypes = relevantTypes.concat(...item.types)
        }
      })
      return relevantTypes
    },
    loadEtablissements: function () {
      let typeEtablissements = this.getEtablissementsTypesBySituation()
      this.$store.dispatch("etablissementsSearch/get", {
        city: this.$store.getters.situation.menage.depcom,
        types: typeEtablissements,
      })
    },
  },
}
</script>

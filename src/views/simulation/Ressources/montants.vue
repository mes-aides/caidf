<template>
  <form>
    <p>
      Indiquez toutes les ressources <strong>nettes</strong> perçues
      <span v-if="individu._role !== 'demandeur'"
        ><strong>par {{ getIndividuNom() }}</strong></span
      >
      en France comme à l'étranger.
    </p>
    <div
      v-for="(type, index) in types"
      :key="type.meta.id"
      class="form__group"
      s
    >
      <RessourceMontants
        v-if="isSimple(type.meta.id)"
        :individu="type.individu"
        :index="index"
        :type="type"
        @update="process"
      />
      <RessourceMicroEntreprise
        v-if="type.meta.id.startsWith('rpns_micro_entreprise_CA')"
        :individu="type.individu"
        :ressource="type"
        @update="updateTNSAmount"
      />
      <RessourceProfessionLiberale
        v-if="type.meta.id === 'rpns_autres_revenus'"
        :individu="type.individu"
        :ressource="type"
        @update="updateTNSAmount"
        @updateExtra="updateTNSExtra"
      />
      <RessourceExploitantAgricole
        v-if="type.meta.id === 'rpns_benefice_exploitant_agricole'"
        :individu="type.individu"
        :ressource="type"
        @update="updateTNSAmount"
      />
    </div>

    <ActionButtons :on-submit="onSubmit" />
  </form>
</template>

<script>
import ActionButtons from "@/components/action-buttons"
import RessourceExploitantAgricole from "@/components/ressource/exploitant-agricole"
import RessourceMicroEntreprise from "@/components/ressource/micro-entreprise"
import RessourceProfessionLiberale from "@/components/ressource/profession-liberale"
import RessourceMontants from "@/components/ressource/montants"

import RessourceProcessor from "@/mixins/ressource-processor"
import { ressourceTypes } from "../../../../lib/resources"
import Ressource from "@/../lib/ressource"
import Individu from "../../../../lib/individu"
import { getAnswer } from "../../../../lib/answers"

export default {
  name: "RessourcesMontants",
  components: {
    RessourceExploitantAgricole,
    RessourceMicroEntreprise,
    RessourceProfessionLiberale,
    RessourceMontants,
    ActionButtons,
  },
  mixins: [RessourceProcessor],
  data: function () {
    const individu = this.getIndividu()
    return {
      individu,
      types: this.getTypes(individu),
    }
  },
  watch: {
    $route(toRoute, fromRoute) {
      if (toRoute.name !== "ressources/montants") {
        return
      } else if (
        toRoute.params.id != fromRoute.params.id ||
        toRoute.params.category != fromRoute.params.category
      ) {
        this.individu = this.getIndividu()
        this.types = this.getTypes(this.individu)
      }
    },
  },
  methods: {
    getIndividuNom: function () {
      return Individu.label(this.individu, "nom")
    },
    getIndividu: function () {
      const id = this.$route.params.id
      const role = id.split("_")[0]
      const { individu } = Individu.get(
        this.$store.getters.peopleParentsFirst,
        role,
        this.$route.params.id,
        this.$store.state.dates
      )
      return individu
    },
    getTypes: function (individu) {
      const selectedTypes = Ressource.getIndividuRessourceTypesByCategory(
        individu,
        this.$route.params.category,
        this.$store.getters.situation
      )

      const answers = getAnswer(
        this.$store.state.simulation.answers.all,
        "individu",
        this.$route.params.category,
        this.$route.params.id
      )

      return ressourceTypes.reduce((result, type) => {
        if (selectedTypes[type.id]) {
          let amounts = Object.assign({}, individu[type.id])
          if (answers) {
            const answer = answers.find((value) => value.id === type.id)
            if (answer) {
              Object.keys(amounts).forEach((amount) => {
                if (amounts[amount] === null) {
                  amounts[amount] = answer.amounts[amount]
                }
              })
            }
          }

          const months = Ressource.getPeriodsForCurrentYear(
            this.$store.state.dates,
            type
          )

          result.push({
            amounts,
            individu,
            months,
            displayMonthly: this.getDisplayMonthly(months, amounts),
            meta: type,
            extra: (type.extra || []).reduce((a, e) => {
              a[e.id] = individu[e.id]
              return a
            }, {}),
          })
        }
        return result
      }, [])
    },
    isSimple: function (type) {
      const complex = [
        "rpns_benefice_exploitant_agricole",
        "rpns_micro_entreprise_CA_bic_vente_imp",
        "rpns_micro_entreprise_CA_bic_service_imp",
        "rpns_micro_entreprise_CA_bnc_imp",
        "rpns_autres_revenus",
      ]
      return complex.indexOf(type) === -1
    },
    onSubmit: function () {
      this.$store.dispatch("answer", {
        id: this.$route.params.id,
        entityName: "individu",
        fieldName: this.$route.params.category,
        value: this.types.map((type) => {
          Object.keys(type.amounts).forEach(function (period) {
            if (type.amounts[period] === null || isNaN(type.amounts[period])) {
              type.amounts[period] = 0
            }
          })
          return {
            id: type.meta.id,
            amounts: type.amounts,
          }
        }),
      })

      this.types.forEach((type) => {
        if (type.extra) {
          Object.keys(type.extra).forEach((extraId) => {
            this.$store.dispatch("answer", {
              id: this.$route.params.id,
              entityName: "individu",
              fieldName: extraId,
              value: type.extra[extraId],
            })
          })
        }
      })

      this.$push()
    },
    updateTNSAmount: function (type, period, value) {
      type.amounts[period] = value
    },
    updateTNSExtra: function (type, item, value) {
      type.extra[item] = value
    },
  },
}
</script>

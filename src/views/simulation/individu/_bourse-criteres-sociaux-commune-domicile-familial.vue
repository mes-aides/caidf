<template>
  <form @submit.prevent="onSubmit">
    <InputDepCom
      v-model:codePostal="codePostal"
      v-model:nomCommune="nomCommune"
      v-model:matchingCommune="matchingCommune"
      codePostalLabel="Quel est le code postal de la commune de vos parents ?"
    />
    <WarningMessage v-if="warningMessage">{{ warningMessage }}</WarningMessage>
    <ActionButtons :on-submit="onSubmit" :disableSubmit="!canSubmit(false)" />
  </form>
</template>
<script>
import ActionButtons from "@/components/action-buttons"
import Individu from "@/../lib/individu"
import InputDepCom from "@/components/input-depcom"
import WarningMessage from "@/components/warning-message"
import { createDepcomMixin } from "../../../mixins/depcom-mixin"

export default {
  name: "SimulationIndividuBourseCriteresSociauxCommuneDomicileFamilial",
  components: {
    ActionButtons,
    InputDepCom,
    WarningMessage,
  },
  mixins: [createDepcomMixin()],
  data() {
    const id = this.$route.params.id
    const role = id.split("_")[0]
    const { individu } = Individu.get(
      this.$store.getters.peopleParentsFirst,
      role,
      this.$route.params.id,
      this.$store.state.dates
    )
    const codePostal =
      individu._bourseCriteresSociauxCommuneDomicileFamilialCodePostal
    const nomCommune =
      individu._bourseCriteresSociauxCommuneDomicileFamilialNomCommune
    return {
      codePostal,
      individu,
      nomCommune,
      matchingCommune: undefined,
    }
  },
  methods: {
    onSubmit: function () {
      if (this.canSubmit(true)) {
        this.$store.dispatch("answer", {
          id: "demandeur",
          entityName: "individu",
          fieldName: "_bourseCriteresSociauxCommuneDomicileFamilial",
          value: {
            _bourseCriteresSociauxCommuneDomicileFamilial:
              this.matchingCommune.code,
            _bourseCriteresSociauxCommuneDomicileFamilialCodePostal:
              this.codePostal.toString(),
            _bourseCriteresSociauxCommuneDomicileFamilialNomCommune:
              this.nomCommune,
            _bourseCriteresSociauxCommuneDomicileFamilialDepartement:
              this.matchingCommune.departement,
            _bourseCriteresSociauxCommuneDomicileFamilialRegion:
              this.matchingCommune.region,
            _bourseCriteresSociauxCommuneDomicileFamilialEpci:
              this.matchingCommune.epci,
            _bourseCriteresSociauxCommuneDomicileFamilialEpciType:
              this.matchingCommune.epciType,
          },
        })
        this.$push()
      }
    },
  },
}
</script>

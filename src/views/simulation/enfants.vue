<template>
  <div>
    <h2 class="aj-question"> Mes enfants à charge <EnSavoirPlus /> </h2>
    <p
      >Si vous n'avez pas d'enfant à charge, cliquez sur le bouton "Suivant".</p
    >
    <div
      v-for="enfant in enfants"
      :key="enfant.id"
      class="aj-children-container"
    >
      <div v-if="enfant.date_naissance">
        <div class="aj-children-header">
          <div class="aj-child-name small capitalize">
            {{ enfant._firstName }}
          </div>
          <div class="aj-child-actions">
            <a class="edit-link" @click="editPAC(enfant.id)">éditer</a>
            <a class="delete-link" @click="removePAC(enfant.id)">supprimer</a>
          </div>
        </div>
        <hr class="aj-hr" />
        <div class="aj-children-line">
          <div class="aj-children-birth-date">
            <label>Sa date de naissance</label>
            <span>{{ birthDate(enfant.date_naissance) }}</span>
          </div>
          <div class="aj-children-nationality">
            <label>Sa nationalité</label>
            <span>{{ nationality(enfant.nationalite) }}</span>
          </div>
          <div class="aj-children-scolarite">
            <label>Sa situation</label>
            <span>{{ scolarite(enfant.scolarite) }}</span>
          </div>
          <div class="aj-children-delete" />
        </div>
      </div>
    </div>
    <button id="add-pac" class="button outline with-icon" @click="addPAC()">
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 4.25C7.5875 4.25 7.25 4.5875 7.25 5V7.25H5C4.5875 7.25 4.25 7.5875 4.25 8C4.25 8.4125 4.5875 8.75 5 8.75H7.25V11C7.25 11.4125 7.5875 11.75 8 11.75C8.4125 11.75 8.75 11.4125 8.75 11V8.75H11C11.4125 8.75 11.75 8.4125 11.75 8C11.75 7.5875 11.4125 7.25 11 7.25H8.75V5C8.75 4.5875 8.4125 4.25 8 4.25ZM8 0.5C3.86 0.5 0.5 3.86 0.5 8C0.5 12.14 3.86 15.5 8 15.5C12.14 15.5 15.5 12.14 15.5 8C15.5 3.86 12.14 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
          fill="#6575EA"
        />
      </svg>
      Ajouter un enfant à charge
    </button>
    <ActionButtons :on-submit="onSubmit" />
  </div>
</template>

<script>
import ActionButtons from "@/components/action-buttons"
import Nationality from "@/lib/nationality"
import EnSavoirPlus from "@/components/en-savoir-plus"
import Scolarite from "../../../lib/scolarite"

export default {
  name: "SimulationEnfants",
  components: {
    EnSavoirPlus,
    ActionButtons,
  },
  computed: {
    enfants: function () {
      return this.$store.getters.situation.enfants || []
    },
  },

  methods: {
    addPAC: function () {
      const children = this.$store.state.simulation.enfants || []
      const lastId = children.length > 0 ? children[children.length - 1] : -1
      this.$store.dispatch("addEnfant")
      this.$router.push(`/simulation/individu/enfant_${lastId + 1}/_firstName`)
    },
    removePAC: function (id) {
      this.$store.dispatch("removeEnfant", id)
    },
    editPAC: function (id) {
      this.$store.dispatch("editEnfant")
      this.$router.push(`/simulation/individu/${id}/_firstName`)
    },
    onSubmit: function () {
      const enfants = this.enfants.filter((enfant) => {
        if (!enfant.date_naissance) {
          this.$store.dispatch("removeEnfant", enfant.id)
          return false
        }
        return true
      })
      this.$store.dispatch("answer", {
        entityName: "enfants",
        value: enfants.length,
      })
      this.$push()
    },
    birthDate: function (date) {
      if (date) {
        return (
          typeof date === "string" ? new Date(date) : date
        ).toLocaleDateString("FR-fr", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }) //).format('DD/MM/YYYY')
      } else {
        return "Non renseigné"
      }
    },
    nationality: Nationality.getNationalityFromCountryCode,
    scolarite: function (value) {
      const s = Scolarite.types.find((s) => s.value === value)
      return s ? Scolarite.types.find((s) => s.value === value).label : "-"
    },
  },
}
</script>

<style scoped lang="scss">
.delete-link {
  margin-left: 10px;
}
</style>

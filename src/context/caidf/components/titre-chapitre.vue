<template>
  <div class="aj-category-title-wrapper">
    <div class="aj-category-title">
      <h1>{{ title }}</h1>
      <router-link
        v-if="showMenuButton"
        :to="{ name: 'recapitulatif' }"
        class="caidf-recapitulatif-button light-primary-button"
      >
        <img src="/caidf/img/ic_document.svg" alt="Bouton récapitulatif" />
      </router-link>
    </div>
  </div>
</template>

<script>
import Chapters from "@/../lib/chapters"

export default {
  name: "TitreChapitre",
  computed: {
    title() {
      return this.getTitleByRoute(this.$route)
    },
    showMenuButton() {
      return this.$route.name !== "recapitulatif"
    },
  },
  methods: {
    getTitleByRoute(route) {
      const path = route.path
      if (path === "/simulation/recapitulatif") {
        return "Récapitulatif"
      }

      const current = path.replace(/\/en_savoir_plus/, "")
      const step =
        this.$store.getters.passSanityCheck &&
        this.$state.current(current, this.$store.getters.getAllSteps)
      const chapterName = step?.chapter || ""
      return Chapters.getLabel(chapterName)
    },
  },
}
</script>

<style lang="scss"></style>

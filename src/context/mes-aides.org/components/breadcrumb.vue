<template>
  <div class="caidf-breadcrumb-wrapper">
    <div class="caidf-breadcrumb">
      <template v-for="(chapter, index) in chapters" :key="chapter.label">
        <span v-if="index" class="caidf-breadcrumb-arrow"
          ><Arrow-right></Arrow-right
        ></span>
        <router-link
          :to="chapter.root"
          class="caidf-breadcrumb-link"
          :class="{
            active: chapter.current,
            done: chapter.done,
            disable: !chapter.done,
          }"
          :tabindex="disabledLink(chapter, index) ? -1 : 0"
        >
          <Check class="caidf-check"></Check>
          <span>{{ chapter.breadcrumb }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import ArrowRight from "@/context/mes-aides.org/components/arrow-right"
import Check from "@/context/mes-aides.org/components/check"
export default {
  name: "Breadcrumb",
  components: { Check, ArrowRight },
  computed: {
    chapters() {
      return this.$state.chapters(
        this.$route.path,
        this.$store.getters.getAllSteps,
        this.$store.getters.lastUnansweredStep?.path
      )
    },
    isRecapitulatif() {
      return this.$route.name === "recapitulatif"
    },
    isResultsPage() {
      return (
        this.$route.name === "resultats" ||
        this.$route.name === "resultatsDetails"
      )
    },
  },
  methods: {
    disabledLink(chapter, index) {
      return index === 0
        ? false
        : !chapter.done && !this.chapters[index - 1].done
    },
    goBack() {
      window?.history.back()
    },
  },
}
</script>

<style type="text/css"></style>

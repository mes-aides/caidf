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
    <div class="caidf-breadcrumb tablet">
      <strong>{{ currentChapterIndex + 1 }}/{{ chapters.length }}</strong
      >&nbsp;{{ chapters[currentChapterIndex]?.breadcrumb }}</div
    >
  </div>
</template>

<script>
import ArrowRight from "@/context/caidf/components/arrow-right"
import Check from "@/context/caidf/components/check"
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
    currentChapterIndex() {
      return this.chapters.findIndex((chapter) => chapter.current)
    },
  },
  methods: {
    disabledLink(chapter, index) {
      return index === 0
        ? false
        : !chapter.done && !this.chapters[index - 1].done
    },
  },
}
</script>

<style type="text/css"></style>

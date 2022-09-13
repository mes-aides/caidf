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
          <span :data-text="chapter.breadcrumb">{{ chapter.breadcrumb }}</span>
        </router-link>
      </template>
    </div>
    <div class="caidf-breadcrumb tablet">
      <strong>{{ currentChapterIndex }}/{{ chapters.length }}</strong
      >&nbsp;{{ currentChapterName?.breadcrumb }}</div
    >
  </div>
</template>

<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"
import Check from "@/context/caidf/icons/check-circle"
import Chapters from "@/../lib/chapters"

export default {
  name: "Breadcrumb",
  components: { Check, ArrowRight },
  computed: {
    chapters() {
      return this.$state.chapters(
        this.$route.path,
        this.store.getAllSteps,
        this.store.lastUnansweredStep?.path
      )
    },
    currentChapterIndex() {
      const index = this.chapters.findIndex((chapter) => chapter.current)
      return index >= 0
        ? index
        : this.chapters.filter((chapter) => chapter.done).length
    },
    currentChapterName() {
      return Chapters.getChapters()[this.currentChapterIndex]
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

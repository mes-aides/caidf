<template>
  <div class="caidf-columns caidf-cta-block" :class="`cta-${position}`">
    <div class="caidf-is-half caidf-cta-column">
      <div>
        <h3
          class="caidf-has-text-white caidf-font-open-sans-bold"
          style="margin-top: 20px"
          >{{ title }}</h3
        >
        <p class="caidf-has-text-white">{{ text }}</p>
        <div class="caidf-cta-wrapper">
          <NewSimulationButton>{{ ctaLabel }}</NewSimulationButton>
        </div>
      </div>
    </div>
    <div class="caidf-is-half caidf-img-column">
      <DashArrowLeft
        v-if="showDashArrow"
        class="caidf-dash-arrow"
      ></DashArrowLeft>
      <img
        :src="imgPath"
        class="caidf-cta-block-img caidf-is-full-width"
        :alt="imgAlt"
      />
    </div>
  </div>
</template>

<script>
import DashArrowLeft from "@/context/caidf/icons/dash-arrow-left"
import NewSimulationButton from "@/context/caidf/components/home/new-simulation-button"

export default {
  name: "CTABlock",
  components: { DashArrowLeft, NewSimulationButton },
  props: {
    position: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    ctaLabel: {
      type: String,
      required: true,
    },
    imgPath: {
      type: String,
      required: true,
    },
    imgAlt: {
      type: String,
      required: true,
    },
    showDashArrow: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>

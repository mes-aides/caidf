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
          <a class="caidf-button caidf-accent caidf-has-text-uppercase">{{
            ctaLabel
          }}</a>
        </div>
      </div>
    </div>
    <div class="caidf-is-half caidf-img-column">
      <DashArrowLeft
        v-if="showDashArrow"
        class="caidf-dash-arrow"
      ></DashArrowLeft>
      <img :src="imgPath" class="caidf-is-full-width" :alt="imgAlt" />
    </div>
  </div>
</template>

<script>
import DashArrowLeft from "@/context/caidf/icons/dash-arrow-left"
export default {
  name: "CTABlock",
  components: { DashArrowLeft },
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

<style lang="scss" scoped>
.caidf-cta-block {
  margin-bottom: 120px;
}
.caidf-cta-column {
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.caidf-img-column {
  position: relative;

  .caidf-dash-arrow {
    position: absolute;
    bottom: -92px;
  }
}

.cta-left {
  .caidf-cta-column {
    padding-right: 50px;
  }

  .caidf-dash-arrow {
    left: -170px;
  }
}

.cta-right {
  .caidf-cta-column {
    order: 2;
    padding-left: 50px;
    padding-bottom: 30px;
  }

  .caidf-img-column {
    order: 1;

    .caidf-dash-arrow {
      right: -170px;
      transform: scale(-1, 1);
    }
  }
}
</style>

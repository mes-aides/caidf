<template>
  <div class="caidf-columns" :class="`cta-${position}`">
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
      <img :src="imgPath" class="caidf-is-full-width" :alt="imgAlt" />
    </div>
  </div>
</template>

<script>
export default {
  name: "CTABlock",
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
  },
}
</script>

<style lang="scss" scoped>
.caidf-cta-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cta-left {
  .caidf-cta-column {
    padding-right: 50px;
  }
}

.cta-right {
  .caidf-cta-column {
    padding-left: 50px;
    order: 2;
  }

  .caidf-img-column {
    order: 1;
  }
}
</style>

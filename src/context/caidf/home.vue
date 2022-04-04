<template>
  <div id="homepage">
    <section class="caidf-home-section caidf-first-section">
      <div class="caidf-home-breadcrumb">
        <template v-for="(item, index) in breadcrumbs" :key="item.link">
          <span v-if="index" class="caidf-home-breadcrumb-arrow"
            ><ArrowRight></ArrowRight
          ></span>

          <a
            :href="item.link"
            class="caidf-home-breadcrumb-link"
            :class="{
              active: item.active,
            }"
          >
            {{ item.text }}
          </a>
        </template>
      </div>
      <div class="caidf-home-container">
        <div class="caidf-first-section-text">
          <h1>
            <span class="caidf-has-text-white"
              >+ de 500 aides et services disponibles pour</span
            >
            optimiser votre budget.
          </h1>
          <p class="caidf-has-text-white caidf-font-open-sans-semi-bold">
            Accédez à toutes les aides auxquelles vous pouvez prétendre. Il y en
            a forcément une pour vous !
          </p>
          <div>
            <a class="caidf-button caidf-accent caidf-has-text-uppercase"
              >Je me lance</a
            >
            <a class="caidf-button caidf-accent-invert caidf-has-text-uppercase"
              >Je reprends ma simulation</a
            >
          </div>
          <div>
            <a class="caidf-button caidf-outline-white caidf-has-text-uppercase"
              >Je contacte mon conseiller</a
            >
          </div>
        </div>
        <img
          src="/caidf/img/hand-with-phone.png"
          class="caidf-hand-with-phone-img"
        />
      </div>
    </section>

    <section class="caidf-home-section caidf-second-section">
      <div class="caidf-home-container">
        <h2
          class="caidf-has-text-white caidf-has-text-center caidf-font-open-sans-semi-bold"
          >COMMENT ÇA MARCHE</h2
        >
        <div class="caidf-chevron-wrapper">
          <a href="#">
            <DoubleChevronBottom></DoubleChevronBottom>
          </a>
        </div>

        <div class="caidf-columns"> </div>
      </div>
    </section>
  </div>
</template>

<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"
import DoubleChevronBottom from "@/context/caidf/icons/double-chevron-bottom"

export default {
  name: "Home",
  components: {
    ArrowRight,
    DoubleChevronBottom,
  },
  data: () => {
    return {
      breadcrumbs: [
        {
          link: "/",
          text: "Nos conseils",
          active: false,
        },
        {
          link: "/",
          text: "Mes coups durs",
          active: false,
        },
        {
          link: "/",
          text: "Nos conseils",
          active: true,
        },
      ],
    }
  },
  computed: {
    hasExistingSituation: function () {
      return this.$store.getters.passSanityCheck
    },
    ctaLabel: function () {
      return this.hasExistingSituation
        ? "Commencer une nouvelle simulation"
        : "Évaluer mes droits"
    },
    ctaSize: function () {
      return this.hasExistingSituation ? "large" : "xlarge"
    },
  },
  methods: {
    newSituation: function () {
      this.$store.dispatch("clear", this.$route.query.external_id)
      this.next()
    },
    next: function () {
      this.$store.dispatch("verifyBenefitVariables")
      this.$push()
    },
  },
}
</script>

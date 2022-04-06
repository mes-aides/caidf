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
          alt="Image : &ldquo;Accédez à toutes
        les aides auxquelles vous pouvez prétendre.&rdquo;"
        />
      </div>
    </section>

    <section
      id="comment-ca-marche"
      class="caidf-home-section caidf-second-section"
    >
      <div class="caidf-home-container">
        <h2
          class="caidf-has-text-white caidf-has-text-center caidf-font-open-sans-semi-bold"
          >COMMENT ÇA MARCHE</h2
        >
        <div class="caidf-chevron-wrapper">
          <router-link :to="{ path: '/', hash: '#comment-ca-marche' }">
            <DoubleChevronBottom></DoubleChevronBottom>
          </router-link>
        </div>

        <CtaBlock
          v-for="(ctaBlock, index) of ctaBlocks"
          :key="ctaBlock.title"
          :position="ctaBlock.position"
          :title="ctaBlock.title"
          :text="ctaBlock.text"
          :cta-label="ctaBlock.ctaLabel"
          :img-path="ctaBlock.imgPath"
          :img-alt="ctaBlock.imgAlt"
          :show-dash-arrow="index + 1 !== ctaBlocks.length"
        ></CtaBlock>
      </div>
    </section>
  </div>
</template>

<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"
import DoubleChevronBottom from "@/context/caidf/icons/double-chevron-bottom"
import CtaBlock from "@/context/caidf/components/home/caidf-cta-block"

export default {
  name: "Home",
  components: {
    ArrowRight,
    DoubleChevronBottom,
    CtaBlock,
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
      ctaBlocks: [
        {
          position: "left",
          title: "1. Je réalise ma simulation",
          text: "Répondez à un questionnaire simple et intuitif en 7 minutes chrono !",
          ctaLabel: "Je fais ma simulation",
          imgPath: "/caidf/img/ne-ratez-aucune-aide.png",
          imgAlt: "",
        },
        {
          position: "right",
          title: "2. Je visualise mes aides d’ un seul coup d’œil",
          text: "Visualisez toutes les aides à un seul endroit et obtenez celle que vous pourriez prétendre.",
          ctaLabel: "J'obtiens mes aides",
          imgPath: "/caidf/img/ne-ratez-aucune-aide-2.png",
          imgAlt: "",
        },
        {
          position: "left",
          title: "3. Je reste alerté",
          text: "Client Crédit Agricole ? Recevez par e-mail les mises à jour des dernières aides auxquelles vous pourriez être éligible.",
          ctaLabel: "Je découvre",
          imgPath: "/caidf/img/restez-alerte.png",
          imgAlt: "",
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

<style lang="scss" scoped>
html {
  scroll-behavior: smooth;
}
</style>

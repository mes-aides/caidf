<template>
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
</template>

<script>
import DoubleChevronBottom from "@/context/caidf/icons/double-chevron-bottom"
import CtaBlock from "@/context/caidf/components/home/caidf-cta-block"

export default {
  name: "SecondSection",
  components: {
    DoubleChevronBottom,
    CtaBlock,
  },
  data: () => {
    return {
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
}
</script>

<template>
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
          Accédez à toutes les aides auxquelles vous pouvez prétendre. Il y en a
          forcément une pour vous !
        </p>
        <div class="caidf-first-section-buttons">
          <NewSimulationButton>Je me lance</NewSimulationButton>
          <a
            v-if="hasExistingSituation"
            class="caidf-button caidf-accent-invert caidf-has-text-uppercase"
            @click="next"
            >Je reprends ma simulation</a
          >
          <ConsultantContactButton v-else />
        </div>
        <div v-if="hasExistingSituation" class="caidf-first-section-buttons">
          <ConsultantContactButton />
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
</template>

<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"
import HomeMixin from "@/mixins/caidf/home-mixin"
import ConsultantContactButton from "@/context/caidf/components/home/consultant-contact-button"
import NewSimulationButton from "@/context/caidf/components/home/new-simulation-button"

export default {
  name: "FirstSection",
  components: {
    NewSimulationButton,
    ArrowRight,
    ConsultantContactButton,
  },
  mixins: [HomeMixin],
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
}
</script>

<template>
  <section class="caidf-home-section caidf-first-section">
    <div class="caidf-home-container">
      <div class="caidf-first-section-text caidf-max-width-text">
        <h1>
          <span class="caidf-has-text-white"
            >+ de {{ benefitsCount }} aides et services disponibles pour</span
          >
          optimiser votre budget.
        </h1>
        <p class="caidf-has-text-white caidf-font-open-sans-semi-bold">
          Accédez à toutes les aides auxquelles vous pouvez prétendre. Il y en a
          forcément une pour vous !
        </p>
        <div class="caidf-first-section-buttons">
          <NewSimulationButton>Je me lance</NewSimulationButton>
          <ConsultantContactButton />
        </div>
        <div v-if="hasExistingSituation" class="caidf-first-section-buttons">
          <a class="caidf-link-with-icon" @click="next">
            <Export></Export>
            <span>Je reprends ma simulation</span>
          </a>
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
import HomeMixin from "@/mixins/caidf/home-mixin"
import ConsultantContactButton from "@/context/caidf/components/home/consultant-contact-button"
import NewSimulationButton from "@/context/caidf/components/home/new-simulation-button"
import Export from "@/context/caidf/icons/export"

export default {
  name: "FirstSection",
  components: {
    NewSimulationButton,
    ConsultantContactButton,
    Export,
  },
  mixins: [HomeMixin],
  computed: {
    benefitsCount() {
      return 100 * Math.floor(process.env.VUE_APP_BENEFIT_COUNT / 100)
    },
  },
}
</script>

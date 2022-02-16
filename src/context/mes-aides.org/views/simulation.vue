<template>
  <div class="aj-simulation">
    <div v-if="showProgress" class="aj-complete-progress-bar">
      <div :style="currentProgressStyle" />
    </div>
    <Breadcrumb />
    <div class="caidf-simulation-content">
      <div class="caidf-simulation-helping-block">
        <div class="caidf-simulation-helping-block-content">
          <div class="caidf-help-icon"
            ><img src="/mes-aides.org/img/ic_a_propos.svg"
          /></div>
          <div>
            <p
              class="caidf-simulation-helping-text"
              v-html="helpingContent?.text"
            ></p>
          </div>
          <img
            :src="helpingContent?.img"
            class="caidf-simulation-helping-img"
            :class="helpingContent?.class"
          />
        </div>
      </div>
      <div class="caidf-simulation-survey">
        <div
          class="container aj-layout-container"
          :class="{ 'aj-debug-container': debug }"
        >
          <div class="aj-main-container">
            <TitreChapitre />
            <div v-if="debug" class="aj-debug-switch">
              <button class="button small" @click="disableDebug"
                >Quitter le mode debug</button
              >
            </div>
            <div v-if="$store.state.message.text" class="notification warning">
              <div class="message" v-html="$store.state.message.text" />
            </div>
            <div class="aj-box-wrapper">
              <router-view :key="$route.path" />
            </div>
          </div>
          <Progress v-if="debug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TitreChapitre from "@/components/titre-chapitre"
import Progress from "@/components/progress"
import { isStepAnswered } from "@/../lib/answers"
import Breadcrumb from "@/context/mes-aides.org/components/breadcrumb"

export default {
  name: "Simulation",
  components: {
    Breadcrumb,
    TitreChapitre,
    Progress,
  },
  data() {
    const helpingContentPerChapter = {
      profil: {
        text: `Ces informations sont nécessaires au traitement de votre demande. Vos données personnelles ne seront pas communiquées à d'autres organismes à des fins commerciales.`,
        img: require("/public/mes-aides.org/img/girl-siting-on-table.png"),
      },
      foyer: {
        text: `Vos réponses nous permettront de vérifier votre éligibilité aux aides.`,
        img: require("/public/mes-aides.org/img/girl-siting-on-table.png"),
      },
      logement: {
        text: `Vos réponses nous permettront de vérifier votre éligibilité aux aides..`,
        img: require("/public/mes-aides.org/img/girl-siting-on-table.png"),
      },
      revenus: {
        text: `Sélectionnez les types de ressources perçues depuis <strong>${this.$store.state.dates.twelveMonthsAgo.label}</strong
      >. Vous pourrez ensuite saisir les montants.`,
        img: require("/public/mes-aides.org/img/planning-sheets.png"),
        class: "planning-sheets",
      },
      projets: {
        text: `Vos réponses nous permettront de vérifier votre éligibilité aux aides.`,
        img: require("/public/mes-aides.org/img/girl-siting-on-table.png"),
      },
      recapitulatif: {
        text: `Retrouvez l'ensemble de vos réponses dans cette page.`,
        img: require("/public/mes-aides.org/img/illustration.svg"),
      },
    }
    return {
      helpingContentPerChapter,
      window,
    }
  },
  computed: {
    showSummary() {
      return this.$route.path !== "/simulation/recapitulatif"
    },
    debug() {
      return this.$store.getters.getDebug
    },
    showProgress() {
      return "resultatsAttendus" !== this.$route.name
    },
    progress() {
      const cleanPath = this.$route.path.replace(/\/en_savoir_plus$/, "")
      const allSteps = this.$store.getters.getAllSteps.filter(
        (step) => !["/", "/simulation/resultats"].includes(step.path)
      )
      const activeSteps = allSteps.filter((step) => step.isActive)

      // Use anwers as basis when you are not in journey
      if (!allSteps.some((step) => step.path === cleanPath)) {
        const answeredSteps = activeSteps.filter((step) =>
          isStepAnswered(this.$store.state.answers.all, step)
        )
        return answeredSteps.length / activeSteps.length
      } else {
        const stepIndex = allSteps.findIndex((item) => item.path === cleanPath)
        const previousStep = allSteps
          .slice(0, stepIndex)
          .filter((step) => step.isActive)

        return previousStep.length / activeSteps.length
      }
    },
    currentProgressStyle() {
      return {
        width: `${this.progress * 100}%`,
      }
    },
    chapters() {
      return this.$state.chapters(
        this.$route.path,
        this.$store.getters.getAllSteps,
        this.$store.getters.lastUnansweredStep?.path
      )
    },
    currentChaper() {
      return this.chapters.find((chapter) => chapter.current)
    },
    helpingContent() {
      return this.helpingContentPerChapter[this.currentChaper?.name]
    },
  },
  methods: {
    disableDebug() {
      this.$store.dispatch("setDebug", false)
      this.$router.replace({ debug: null })
    },
  },
}
</script>

<style type="text/css" scoped>
/* Hack for dev */
/*.container {*/
/*max-width: 100%;*/
/*display: flex;*/
/*}*/
</style>

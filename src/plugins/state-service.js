import { next, current, chapters } from "../../lib/state"
import { isNavigationFailure, NavigationFailureType } from "vue-router"

const StateService = {
  install(app) {
    app.config.globalProperties.$state = {
      next,
      current,
      chapters,
    }

    app.config.globalProperties.$push = function () {
      const nextStep = next(this.$route, this.$store.getters.getAllSteps)
      this.$store.dispatch("updateCurrentAnswers", nextStep.path)
      this.$router.push(nextStep.path).catch((failure) => {
        if (isNavigationFailure(failure, NavigationFailureType.cancelled)) {
          this.$matomo?.trackEvent(
            "Parcours",
            "Navigation cancelled",
            failure.toString()
          )
        } else {
          console.log(failure)
          throw new Error(failure)
        }
      })
    }
  },
}

export default StateService

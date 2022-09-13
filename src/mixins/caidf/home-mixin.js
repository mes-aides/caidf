export default {
  computed: {
    hasExistingSituation: function () {
      return this.store.passSanityCheck
    },
  },
  methods: {
    newSituation: function () {
      this.store.dispatch("clear", this.$route.query.external_id)
      this.next()
    },
    next: function () {
      this.store.dispatch("verifyBenefitVariables")
      this.$push()
    },
  },
}

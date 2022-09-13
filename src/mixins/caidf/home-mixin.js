export default {
  computed: {
    hasExistingSituation: function () {
      return this.store.passSanityCheck
    },
  },
  methods: {
    newSituation: function () {
      this.store.clear(this.$route.query.external_id)
      this.next()
    },
    next: function () {
      this.store.verifyBenefitVariables()
      this.$push()
    },
  },
}

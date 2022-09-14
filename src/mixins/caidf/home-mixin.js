import { useStore } from "@/stores"

export default {
  computed: {
    hasExistingSituation: function () {
      const store = useStore()
      return store.passSanityCheck
    },
  },
  methods: {
    newSituation: function () {
      const store = useStore()
      store.clear(this.$route.query.external_id)
      this.next()
    },
    next: function () {
      const store = useStore()
      store.verifyBenefitVariables()
      this.$push()
    },
  },
}

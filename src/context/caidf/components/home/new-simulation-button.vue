<template>
  <a
    class="caidf-button caidf-accent caidf-has-text-uppercase"
    @click="newSituation"
  >
    <slot></slot>
  </a>
</template>

<script>
import HomeMixin from "@/mixins/caidf/home-mixin"

export default {
  name: "NewSimulationButton",
  mixins: [HomeMixin],
}
</script>

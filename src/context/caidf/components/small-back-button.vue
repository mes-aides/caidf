<template>
  <a class="caidf-back-button" type="button" data-testid="back">
    <ArrowRight></ArrowRight>
    <slot></slot>
  </a>
</template>
<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"

export default {
  name: "SmallBackButton",
  components: {
    ArrowRight,
  },
}
</script>

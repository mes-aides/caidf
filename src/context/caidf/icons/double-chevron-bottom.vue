<template>
  <span class="caidf-double-arrow-bottom">
    <ArrowRight class="caidf-arrow-1"></ArrowRight>
    <ArrowRight class="caidf-arrow-2"></ArrowRight>
  </span>
</template>

<script>
import ArrowRight from "@/context/caidf/icons/arrow-right"

export default {
  name: "DoubleChevronBottom",
  components: {
    ArrowRight,
  },
}
</script>

<style lang="scss" scoped>
.caidf-double-arrow-bottom {
  position: relative;
  display: inline-block;
  height: 36px;
  width: 24px;

  .caidf-arrow-1,
  .caidf-arrow-2 {
    position: absolute;
    transform: rotate(90deg);
  }
  .caidf-arrow-1 {
    top: 0;
  }
  .caidf-arrow-1 {
    top: 12px;
  }
}
</style>

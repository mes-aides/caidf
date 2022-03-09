<template>
  <div class="notification warning caidf-notification">
    <Alert></Alert>
    <div class="caidf-font-body-small caidf-font-bold">WARNING</div>
    <slot></slot>
  </div>
</template>

<script>
import Alert from "@/context/caidf/icons/alert"
export default {
  name: "WarningMessage",
  components: { Alert },
}
</script>

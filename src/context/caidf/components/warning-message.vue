<template>
  <div class="notification warning caidf-notification">
    <Alert></Alert>
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

<template>
  <div>
    <input
      :id="id"
      ref="result"
      v-model.number="model"
      v-select-on-click
      type="number"
      :name="name"
      :min="min"
      :max="max"
      :step="step"
      :data-type="dataType"
      :onWheel="(e) => e.preventDefault()"
    />
    <div v-if="error" class="text-red input-number-error">
      Ce champ n'est pas valide.
    </div>
  </div>
</template>

<script>
export default {
  name: "InputNumber",
  props: {
    id: String,
    name: String,
    min: Number,
    max: Number,
    dataType: { type: String, default: "amount" },
    value: { type: [Number, String] },
    modelValue: { type: [Number, String] },
    step: { type: String, default: "any" },
    emit: { type: Boolean, default: true },
  },
  emits: ["input", "update:modelValue"],
  data: function () {
    return {
      result: this.result,
      error: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.value || this.modelValue
      },
      set(value) {
        if (value || value === 0) {
          this.error = false
          this.$emit("update:modelValue", value)
        } else {
          this.error = true
          this.$emit("update:modelValue", undefined)
        }
      },
    },
  },
}
</script>

<style scoped>
.input-number-error {
  color: #d63626;
  color: var(--red);
  padding-top: 5px;
  padding-left: 15px;
}
input[type="number"]:not([data-type="count"]) {
  text-align: right;
}
</style>

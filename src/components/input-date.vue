<template>
  <div class="aj-input-date">
    <div v-if="showDay" class="aj-input-date-component day">
      <label class="aj-date-label">jour</label>
      <input
        :id="firstId"
        ref="day"
        v-model="day"
        v-select-on-click
        type="text"
        data-type="number"
        pattern="[0-9]*"
        autofocus
        aria-label="Jour"
        placeholder="JJ"
        min="1"
        max="31"
      />
    </div>
    <div class="aj-input-date-component month">
      <label class="aj-date-label">mois</label>
      <input
        ref="month"
        v-model="month"
        v-select-on-click
        type="text"
        data-type="number"
        pattern="[0-9]*"
        aria-label="Mois"
        placeholder="MM"
        min="1"
        max="12"
      />
    </div>
    <div class="aj-input-date-component year">
      <label class="aj-date-label">année</label>
      <input
        ref="year"
        v-model="year"
        v-select-on-click
        type="text"
        data-type="number"
        pattern="[0-9]*"
        class="year"
        aria-label="Année"
        placeholder="AAAA"
        min="1900"
      />
    </div>
  </div>
</template>

<script>
import moment from "moment"
import padStart from "lodash/padStart"

function stateManager(current, next) {
  if (
    (current.element === "day" &&
      current.length === 0 &&
      next.element === "day" &&
      next.length === 1) ||
    (current.element === "day" &&
      current.length === 1 &&
      next.element === "day" &&
      next.length === 2) ||
    (current.element === "day" &&
      current.length === 2 &&
      next.element === "month" &&
      next.length === 1) ||
    (current.element === "month" &&
      current.length === 1 &&
      next.element === "month" &&
      next.length === 2) ||
    (current.element === "month" &&
      current.length === 2 &&
      next.element === "year" &&
      next.length === 1) ||
    (current.element === "year" &&
      current.length === 1 &&
      next.element === "year" &&
      next.length === 2)
  ) {
    return next
  } else {
    return false
  }
}

export default {
  name: "InputDate",
  props: {
    id: String,
    modelValue: [Date, String],
    //dateType should be "date" for a DD-MM-YYY date input and "month" for MM-YYYY
    dateType: {
      type: String,
      default: "date",
    },
  },
  emits: ["update:modelValue"],
  data: function () {
    const captureFullDate = this.dateType === "date"

    return {
      currentState: this.modelValue
        ? 0
        : captureFullDate
        ? { element: "day", length: 0 }
        : { element: "day", length: 2 },
      day: captureFullDate
        ? this.modelValue && moment(this.modelValue).format("DD")
        : "01",
      month: this.modelValue && moment(this.modelValue).format("MM"),
      year: this.modelValue && moment(this.modelValue).format("YYYY"),
    }
  },
  computed: {
    auto: function () {
      return Boolean(this.currentState)
    },
    date: function () {
      return `${this.year}-${this.month && padStart(this.month, 2, "0")}-${
        this.day && padStart(this.day, 2, "0")
      }`
    },
    firstId: function () {
      const uniqueFieldName = "id." + Math.random().toString(36).slice(2)
      return this.id || uniqueFieldName
    },
    showDay: function () {
      return this.dateType === "date"
    },
  },
  watch: {
    day: function (to) {
      if (to?.length == 2 && this.auto) {
        this.$refs.month.focus()
      }
      this.update("day")
    },
    month: function (to) {
      if (to?.length == 2 && this.auto) {
        this.$refs.year.focus()
      }
      this.update("month")
    },
    year: function (to) {
      if (to?.length == 4 && this.auto) {
        this.$refs.year.focus()
      }
      this.update("year")
    },
  },
  methods: {
    emit: function ($event) {
      let value = new Date($event.target.value)
      if (value) {
        this.$emit("update:modelValue", value)
      }
    },
    update: function (name) {
      this.currentState = stateManager(this.currentState, {
        element: name,
        length: this[name]?.length || 0,
      })

      const dt = moment(this.date, "YYYY-MM-DD", true)
      if (dt.isValid()) {
        this.$emit("update:modelValue", dt.toDate())
      } else {
        this.$emit("update:modelValue", undefined)
      }
    },
  },
}
</script>
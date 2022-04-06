<template>
  <div id="homepage">
    <FirstSection></FirstSection>
    <SecondSection></SecondSection>
  </div>
</template>

<script>
import FirstSection from "@/context/caidf/components/home/first-section"
import SecondSection from "@/context/caidf/components/home/second-section"

export default {
  name: "Home",
  components: {
    SecondSection,
    FirstSection,
  },
}
</script>

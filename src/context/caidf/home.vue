<template>
  <div id="homepage">
    <FirstSection></FirstSection>
    <SecondSection></SecondSection>
  </div>
</template>

<script>
import FirstSection from "@/context/caidf/components/home/first-section"
import SecondSection from "@/context/caidf/components/home/second-section"
import AOS from "aos"
import "aos/dist/aos.css"

export default {
  name: "Home",
  components: {
    SecondSection,
    FirstSection,
  },
  created() {
    AOS.init({
      offset: 300,
    })
  },
}
</script>

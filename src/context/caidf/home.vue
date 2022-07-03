<template>
  <div id="homepage">
    <FirstSection/>
    <SecondSection/>
    <ThirdSection/>
    <MentionsLegales/>
  </div>
</template>

<script>
import FirstSection from "@/context/caidf/components/home/first-section"
import SecondSection from "@/context/caidf/components/home/second-section"
import ThirdSection from "@/context/caidf/components/home/third-section"
import MentionsLegales from "@/context/caidf/components/home/mentions-legales"
import AOS from "aos"
import "aos/dist/aos.css"

export default {
  name: "Home",
  components: {
    SecondSection,
    FirstSection,
    ThirdSection,
    MentionsLegales,
  },
  created() {
    AOS.init({
      offset: 300,
    })
  },
}
</script>

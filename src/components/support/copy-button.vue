<template>
  <div class="copy-button" @click="() => copyBenefitsList(benefitsList)"
    >Copier</div
  >
</template>
<script>
export default {
  name: "CopyButton",
  props: ["benefitsMap", "benefitsList"],
  data() {
    return {
      situationId: "",
    }
  },
  methods: {
    copyBenefitsList: function (benefitsList) {
      const container = document.createElement("div")
      container.className = "copy-content"
      const prepend =
        "Bonjour,\n\nJe vous écris car vous avez utilisé le simulateur d'aides du site 1jeune1solution.gouv.fr, et que vous avez effectué des démarches pour demander les aides qui se sont affichées en fin de simulation.\n\nIl s'agissait des aides suivantes :\n"

      const append = `Nous vous avons écrit la semaine qui a suivi la simulation pour savoir si vous aviez demandé les aides, et vous avez indiqué que`
      if (benefitsList?.length) {
        const list = document.createElement("ul")
        for (let benefit of benefitsList) {
          const benefitItem = document.createElement("li")
          const benefitLink = document.createElement("a")
          const benefitTitle = this.benefitsMap[benefit.id]?.label || benefit.id
          benefitLink.innerText = benefitTitle.replace(/(^[a-z])/, (l) =>
            l.toUpperCase()
          )

          benefitLink.href = `${process.env.VUE_APP_BASE_URL}/aides/${benefit.id}`
          benefitItem.appendChild(benefitLink)
          list.appendChild(benefitItem)
        }

        const prependBlock = document.createElement("div")
        prependBlock.innerText = prepend
        const appendBlock = document.createElement("div")
        appendBlock.innerText = append
        container.appendChild(prependBlock)
        container.appendChild(list)
        container.appendChild(appendBlock)

        // In order to copy the rich-text we need to add it to the page
        document.body.appendChild(container)
        window.getSelection().removeAllRanges()
        let range = document.createRange()
        range.selectNode(container)
        window.getSelection().addRange(range)
        document.execCommand("copy")
        window.getSelection().removeAllRanges()
        container.remove()
      }
    },
  },
}
</script>

<style>
.copy-button {
  color: var(--theme-primary);
  text-decoration: underline;
  cursor: pointer;
}
.copy-button:hover {
  color: var(--dark-blue);
  text-decoration: none;
}
.copy-button:active {
  color: var(--blue);
  font-size: 15px;
}
.copy-content,
.copy-content * {
  font-family: initial !important;
  font-size: initial !important;
}
</style>

const { Step } = require("../../lib/state/steps")

module.exports = {
  addBlocks: (b) => {
    const home = b.shift()
    b.unshift(
      new Step({
        entity: "individu",
        id: "demandeur",
        variable: "_interestVoiture",
      })
    )
    b.unshift(
      new Step({
        entity: "individu",
        id: "demandeur",
        variable: "_interestLogement",
      })
    )
    b.unshift(
      new Step({
        entity: "individu",
        id: "demandeur",
        variable: "_interestEmploi",
      })
    )
    b.unshift(
      new Step({ entity: "individu", id: "demandeur", variable: "_aleas" })
    )
    b.unshift(
      new Step({
        entity: "individu",
        id: "demandeur",
        variable: "_interestDiagnostifFinancier",
      })
    )
    b.unshift(home)
  },
}

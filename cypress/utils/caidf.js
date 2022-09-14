import { fillCheckboxes, fillRadio } from "./form"

const fill_caidf = () => {
  fillRadio("_interetVoiture", false)
  fillRadio("_interetLogement", false)
  fillRadio("_interetEmploi", false)
  fillCheckboxes("_aleas", [])
}

export default {
  fill_caidf,
}

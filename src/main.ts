import "core-js/stable"
import { createApp, h } from "vue"
import App from "./app.vue"

import router from "./router"
import store from "./store"

import moment from "moment"

import StateService from "./plugins/state-service"

import * as Sentry from "@sentry/vue"
// @ts-ignore
import VueMatomo from "vue-matomo"

import "template.data.gouv.fr/dist/main.css"
import "font-awesome/scss/font-awesome.scss"
import "@/styles/main.scss"

import AnalyticsDirective from "./directives/analytics"
import MailDirective from "./directives/mail"
import SelectOnClickDirective from "./directives/select-on-click"

// @ts-ignore
import { iframeResizerContentWindow } from "iframe-resizer"

const Resizer = {
  install: function () {
    iframeResizerContentWindow
  },
}

const app = createApp({
  render: () => h(App),
})

app.directive("analytics", AnalyticsDirective)
app.directive("mail", MailDirective)
app.directive("selectOnClick", SelectOnClickDirective)

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    app,
    dsn: "https://77f2520f2558451c80b1b95131135bcd@sentry.incubateur.net/18",
  })
}

app.use(Resizer)
app.use(StateService)

app.use(VueMatomo, {
  host: "https://stats.data.gouv.fr",
  trackerFileName: "piwik",
  siteId: process.env.VUE_APP_MATOMO_ID,
  router: router,
})

app.config.globalProperties.$filters = {
  capitalize(value: string) {
    if (!value) return ""
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  },
}

moment.locale("fr")

app.use(store)
app.use(router)
app.mount(document.body)

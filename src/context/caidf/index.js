import Home from "./home.vue"
import BaseLayout from "./base-layout.vue"
import Simulation from "./views/simulation.vue"

const NAME = "mes-aides.org"
export default {
  Home,
  BaseLayout,
  Simulation,
  name: NAME,
  routes: [
    {
      path: "/simulation/resultats",
      name: "resultat",
      meta: {
        headTitle: `Les résultats de ma simulation sur le simulateur d'aides ${NAME}`,
      },
      component: () =>
        import(
          /* webpackChunkName: "static" */ "@/context/caidf/views/resultats/resultats.vue"
        ),
    },
    // {
    //   name: "resultatsDetails",
    //   path: "resultats/:droitId",
    //   component: () =>
    //     import(
    //       /* webpackChunkName: "resultats" */ "./views/simulation/resultats-detail.vue"
    //     ),
    // },
    {
      path: "/a-propos",
      name: "a-propos",
      component: () =>
        import(
          /* webpackChunkName: "static" */ "@/context/caidf/views/a-propos.vue"
        ),
    },
    {
      path: "/ameliorer",
      name: "ameliorer",
      component: () =>
        import(
          /* webpackChunkName: "static" */ "@/context/caidf/views/ameliorer.vue"
        ),
    },
    {
      path: "/liens-utiles",
      name: "liens-utiles",
      component: () =>
        import(
          /* webpackChunkName: "static" */ "@/context/caidf/views/liens-utiles.vue"
        ),
    },
  ],
}

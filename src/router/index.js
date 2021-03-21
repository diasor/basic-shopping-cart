import Vue from "vue"
import VueRouter from "vue-router"
import Home from "@views/Home.vue"

Vue.use(VueRouter)

const routes = [
  {
	path: "/error",
	name: 'Error',
	component: () => import(/* webpackChunkName: "about" */ "../views/Error.vue")
  },
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
	path: "*",
	redirect: '/error'
  }
]

const router = new VueRouter({
	mode: "history",
	routes
})

export default router

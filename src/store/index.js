/**
 * @file Store index
 * @author Diana Sormani
 * @module store/index
 * @version 0.0.1
 */

import Vue from "vue"
import Vuex from "vuex"

import products from "@store/productsStore.js"

Vue.use(Vuex)

export default new Vuex.Store({ ...products })

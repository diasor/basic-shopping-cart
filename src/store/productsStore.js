import Vue from "vue"
import Vuex from "vuex"
import router from "@/router"
import productApplication from "@service/products"

Vue.use(Vuex)

const state = {
	products: [],
	productTypes: [],
	productNames: [],
	loading: false,
	cart: []
}

const getters = {
	allProducts: (state) => state.products,
	loading: (state) => state.loading,
	productTypes: (state) => state.productTypes,
	myCart: (state) => state.cart
}

const mutations = {
	SET_LOADING (state, loading) {
		state.loading = loading || false
	},

	SET_PRODUCTS (state, productsPayload) {
		if (productsPayload) {
			const { products, productNames, productTypes } = productsPayload
			state.products = products || []
			state.productNames = productNames || []
			state.productTypes = productTypes || []
		}
	},

	SET_CART (state, cart) {
		state.cart = cart || []
	},

	ADD_TO_CART (state, product) {
		if (product && product.name) {
			state.cart.unshift({ ...product })
		}
	}
}

const actions = {
	/**
	 * [ getProducts: This action fetches the products data from the service. It expects a list of products.
	 * 				  The service is called only if there aren't products already on the state. 
	 * 				  It initlizes the "loading" state to true and dispatches the "processProductsData" with the 
	 * 				  results from the service. ]
	 */
	getProducts ({ state, commit, dispatch }) {
		if (!state.products.length) {
			commit("SET_LOADING", true)
			productApplication.fetchData((error, data) => dispatch("processProductsData", { error, data }))
		}
	},

	/**
	 * [ processProductsData: This action receives the product data from the service. It expects a list of products.
	 * 				    It commits the full list on the state.
	 * 					If there is an error, then the error is logged on console and the user is redirected to an error page.
	 * 					If the re is no error, then the information is processed:
	 * 						- from the list of products, it creates a list of unique (different) product types and commits it.
	 * 						- it also creates a list of product names and commits it too.
	 * 						- it manages a loading flag is handled so the application can check when the information 
	 * 						is ready to be displayed. ]
	* @param {[String|Object]} 	error 	[ represents any possible error that occured as part of the service. ]
	* @param {[Object]} 		data 	[ represents the product data returned by the service. ]
	 */
	processProductsData ({ commit }, { error, data }) {
		let products = []
		let productNames = []
		let productTypeSet = {}
		let productTypes = []
		if (error) {
			console.error("error", error)
			commit("SET_LOADING", false)
			router.push({ path: "error" })
		} else if (data) {
			products = data || []
			productNames = products.map(product => product.name)
			productTypeSet = new Set(products.map(product => product.type))
			productTypes = Array.from(productTypeSet)

			// commit the data
			commit("SET_PRODUCTS", { products, productNames, productTypes })
			commit("SET_LOADING", false)
		}
	},

	/**
	 * * [ addToCart: Given a product containing at least a name, it adds it to the current cart.
	 * 				  It also commits the limitX and limitY on the state. ]
	 * @param {[Object]} product [ represents the product information (expected to have name, color and type.) ]
	 */
	addToCart ({ state, commit }, product) {
		if (product) {
			// check if the product exist already on the cart
			if (!state.cart.find(item => item.name === product.name)) {
				commit("ADD_TO_CART", product)
			}
		} 
	}
}

export default {
	state,
	mutations,
	actions,
	getters
}

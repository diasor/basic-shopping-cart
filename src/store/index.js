import Vue from "vue"
import Vuex from "vuex"
import productApplication from "@service/products"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		products: [],
		productTypes: [],
		productNames: [],
		loading: false,
		cart: []
	},

	getters: {
		productTypes: (state) => state.productTypes,
		productNamesByType: (state) => (type) => state.products
			.filter(product => product.type === type)
			.map(item => item.name),
		allProducts: (state) => state.products,
		loading: (state) => state.loading,
		myCart: (state) => state.cart
	},

	mutations: {
		SET_LOADING (state, loading) {
			state.loading = loading
		},

		SET_PRODUCTS (state, { products, productNames, productTypes }) {
			state.products = products
			state.productNames = productNames
			state.productTypes = productTypes
		},

		SET_CART (state, cart) {
			state.cart = cart || []
		},

		ADD_TO_CART (state, product) {
			state.cart.push({ ...product })
		}
	},

	actions: {
		async getProducts ({ commit }) {
			commit("SET_LOADING", true)
			let products = []
			let productNames = []
			let productTypeSet = {}
			let productTypes = []
			
			if (!products.length) {
				productApplication.fetchData(function (error, data) {
					if (error) {
						console.error("error", error)
						commit("SET_LOADING", false)
					}
	
					if (data) {
						products = data
						productNames = products.map(product => product.name)
						productTypeSet = new Set(products.map(product => product.type))
						productTypes = Array.from(productTypeSet)
						console.log("products", products)
						console.log("productNames", productNames)
						console.log("productTypes", productTypes)
						commit("SET_PRODUCTS", { products, productNames, productTypes })
						commit("SET_LOADING", false)
					}
				})
			}
		},
		
		addToCart ({ state, commit }, product) {
			if (product) {
				// check if the product exist already on the cart
				if (!state.cart.find(item => item.name === product.name)) {
					commit("ADD_TO_CART", product)
				}
			}
		}
	}
})

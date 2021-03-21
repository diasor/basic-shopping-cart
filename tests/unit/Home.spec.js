import { shallowMount, createLocalVue } from "@vue/test-utils"
import Vuex from "vuex"
import router from "@router"
import Vuetify from "vuetify"
import Home from "@views/Home.vue"
import ProductForm from "@components/ProductForm.vue"
import ProductSkeleton from "@components/ProductSkeleton.vue"
import ProductList from "@components/ProductList.vue"
import producstStore from "@store/productsStore"
import { mockedProductList } from "@tests/unit/mockData.js"

let localVue
let wrapper
let vuetify
let store

afterEach(() => {
	wrapper.destroy()
})

describe("testing Home Template", () => {
	beforeEach(() => createInstance())
	it("should render the page and match the snapshot", () => {
		expect(wrapper.exists()).toBe(true)
		expect(wrapper).toMatchSnapshot()
	})

	it("should render one container div with the proper name", () =>
		expect(wrapper.find("div[data-testid=\"home-container\"]").exists()).toBe(true))

	it("should render no ProductSkeleton component, one ProductForm component and one ProductList component", () => {
		expect(wrapper.findAllComponents(ProductSkeleton).length).toBe(0)
		expect(wrapper.findAllComponents(ProductForm).length).toBe(1)
		expect(wrapper.findAllComponents(ProductList).length).toBe(1)
	})
})

describe("testing Home Template when the application is loading (show skeleton form)", () => {
	beforeEach(() => createInstance(mockedProductList, true))

	it("should render the page and match the snapshot", () => {
		// tests that the wrapper was loadded properly
		expect(wrapper.exists()).toBe(true)
		expect(wrapper).toMatchSnapshot()
	})

	it("should render one ProductSkeleton component, no ProductForm component and one ProductList component", async() => {
		expect(wrapper.findAllComponents(ProductSkeleton).length).toBe(1)
		expect(wrapper.findAllComponents(ProductForm).length).toBe(0)
		expect(wrapper.findAllComponents(ProductList).length).toBe(1)
	})
})

describe("testing Home Computed properties", () => {
	describe("testing loadSkeleton computed", () => {
		it("should return false if loading is false on the store", () => {
			createInstance()
			expect(wrapper.vm.loadSkeleton).toBe(false)
		})

		it("should return false if loading is false on the store", () => {
			createInstance(mockedProductList, true)
			expect(wrapper.vm.loadSkeleton).toBe(true)
		})
	})
})

/**
 * [createInstance is a function that defines all the boiler plate code to create the Home view.
 * 				 It creates the Home instance, with vuetify, a new store and router.
 * 				 The store is created based on the parameters. This allows the mounting function to
 * 				 simulate different scenarios for testing. ]
* @param {[Array]} 	 dataSet [ represents the list of products to allow testing how the Home instance behaves with products.
							  the default value is an empty array. ]
* @param {[Boolean]} loading [ represents an indicator of whether the application is still loading data.
							  the default value is false. ]
 */
async function createInstance(dataSet = [], loading = false) {
	localVue = createLocalVue()
	localVue.use(Vuex)
	vuetify = new Vuetify()
	
	const state = {
		products : dataSet,
		productTypes: (dataSet.length > 0) ? [ "oven", "fridge", "vacuum" ] : [],
		productNames: (dataSet.length > 0) ? [ "H 6100 BM AM", "F 2412 Vi" ] : [],
		loading,
		cart: []
	}

	const getProducts = jest.fn().mockImplementation(() => Promise.resolve(mockedProductList))
	store = new Vuex.Store({
		state,
		getters: producstStore.getters,
		actions: {
			...producstStore.actions, 
			getProducts
		},
		mutations: producstStore.mutations
	})

	// mount the wrapper
	wrapper = shallowMount(Home, {
		localVue,
		vuetify,
		router,
		store
	})
	await wrapper.vm.$nextTick()
}
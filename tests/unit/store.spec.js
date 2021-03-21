import Vuex from "vuex"
import productStore from "@store/productsStore"
import { mockedProductList } from "@tests/unit/mockData.js"
import productApplication from "@service/products"

let store
let state
let actions
const productTypes = [ "oven", "fridge" ]
const productNames = [ "H 6100 BM AM", "F 2412 Vi" ]

jest.mock("@service/products")

describe("testing GETTERS", () => {
	beforeEach(() => initialization())

	describe("testing getter: allProducts", () => {
		it("should return an empty array when the product list is empty", () => 
			expect(productStore.getters.allProducts(state)).toEqual([]))

		it("should return the exact amount and exact products of the state", () => {
			const dataSet = {
				products: mockedProductList, 
				productNames,
				productTypes
			}
			productStore.mutations.SET_PRODUCTS(state, dataSet)
			expect(productStore.getters.allProducts(state).length).toBe(mockedProductList.length)
			expect(productStore.getters.allProducts(state)).toEqual(mockedProductList)
		})
	})

	describe("testing getter: loading", () => {
		it("should return the false, if the state property is set to false", () => 
			expect(productStore.getters.loading(state)).toBe(false))

		it("should return true, if the state property is set to true", () => {
			productStore.mutations.SET_LOADING(state, true)
			expect(productStore.getters.loading(state)).toBe(true)
		})
	})

	describe("testing getter: productTypes", () => {
		it("should return an empty array, if the state property is an empty array", () => 
			expect(productStore.getters.productTypes(state)).toEqual([]))

		it("should return the proper array, when the product set is updated", () => {
			const dataSet = {
				products: mockedProductList, 
				productNames,
				productTypes
			}
			productStore.mutations.SET_PRODUCTS(state, dataSet)
			expect(productStore.getters.productTypes(state)).toEqual(productTypes)
		})
	})

	describe("testing getter: myCart", () => {
		it("should return an empty array, if the state property is an empty array", () => 
			expect(productStore.getters.myCart(state)).toEqual([]))

		it("should return the proper array, when the product set is updated", () => {
			productStore.mutations.SET_CART(state, mockedProductList)
			expect(productStore.getters.myCart(state)).toEqual(mockedProductList)
		})
	})
})

describe("testing MUTATIONS", () => {
	beforeEach(() => initialization())

	describe("testing SET_LOADING", () => {
		it("should set the loading property to false, if the payload is undefined", () => {
			productStore.mutations.SET_LOADING(state, undefined)
			expect(state.loading).toBe(false)
		})

		it("should set the loading property to false, if the payload is null", () => {
			productStore.mutations.SET_LOADING(state, null)
			expect(state.loading).toBe(false)
		})

		it("should set the loading property to true, if the payload is true", () => {
			productStore.mutations.SET_LOADING(state, true)
			expect(state.loading).toBe(true)
		})

		it("should set the loading property to true, if the payload is false", () => {
			productStore.mutations.SET_LOADING(state, false)
			expect(state.loading).toBe(false)
		})
	})

	describe("testing SET_PRODUCTS", () => {
		it("should set the products set to empty, if the payload is undefined", () => {
			productStore.mutations.SET_PRODUCTS(state, undefined)
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
		})

		it("should set the products set to empty, if the payload is null", () => {
			productStore.mutations.SET_PRODUCTS(state, null)
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
		})

		it("should set the products set to empty, if the payload is empty", () => {
			productStore.mutations.SET_PRODUCTS(state, [])
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
		})

		it("should set the products set to empty, if the payload contains names but not products", () => {
			const dataSet = {
				products: undefined, 
				productNames,
				productTypes: null
			}
			productStore.mutations.SET_PRODUCTS(state, dataSet)
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
			expect(state.products).toEqual([])
		})

		it("should set the products the proper parameter sets, if the payload contains all the information", () => {
			const dataSet = {
				products: mockedProductList, 
				productNames,
				productTypes
			}
			productStore.mutations.SET_PRODUCTS(state, dataSet)
			expect(state.products).toEqual(mockedProductList)
			expect(state.productNames).toEqual(productNames)
			expect(state.productTypes).toEqual(productTypes)
		})
	})

	describe("testing SET_CART", () => {
		it("should set the cart set to empty, if the payload is undefined", () => {
			productStore.mutations.SET_CART(state, undefined)
			expect(state.cart).toEqual([])
		})

		it("should set the cart set to empty, if the payload is null", () => {
			productStore.mutations.SET_CART(state, null)
			expect(state.cart).toEqual([])
		})

		it("should set the cart set to empty, if the payload is empty", () => {
			productStore.mutations.SET_CART(state, [])
			expect(state.cart).toEqual([])
		})

		it("should set the cart set to the payload array, if the payload has items", () => {
			const cart = [ "one", "two", "three" ]
			productStore.mutations.SET_CART(state, cart)
			expect(state.cart).toEqual(cart)
		})
	})

	describe("testing ADD_TO_CART", () => {
		it("should leave the cart set to empty, if the product is undefined and the cart was empty", () => {
			productStore.mutations.ADD_TO_CART(state, undefined)
			expect(state.cart).toEqual([])
		})

		it("should leave the cart set to empty, if the product is null and the cart was empty", () => {
			productStore.mutations.ADD_TO_CART(state, null)
			expect(state.cart).toEqual([])
		})

		it("should leave the cart set to empty, if the product is NOT wmpty but has no name and teh cart was empty", () => {
			const product = {
				notAName: "hello world"
			}
			productStore.mutations.ADD_TO_CART(state, product)
			expect(state.cart).toEqual([])
		})

		it("should add the product to the array, if the product at least has a name and the cart was empty", () => {
			const product = {
				name: "new product name"
			}
			productStore.mutations.ADD_TO_CART(state, product)
			expect(state.cart).toEqual([ product ])
		})

		it("should add the product to the array at the beginning, if the product at least has a name and the cart was NOT empty", () => {
			const myCart = [ { name: "product 1" }, { name: "product 2" }, { name: "product 3" } ]
			productStore.mutations.SET_CART(state, myCart)
			const product = { name: "new product name" }
			productStore.mutations.ADD_TO_CART(state, product)
			const expectedCart = [ { name: "new product name" }, { name: "product 1" }, { name: "product 2" }, { name: "product 3" } ]
			expect(state.cart).toEqual(expectedCart)
		})
	})
})

describe("testing ACTIONS", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		productApplication.fetchData.mockReset()
		initialization()
	})

	describe("testing getProducts", () => {
		it("should call the getProducts() and commit the loading mutation, if there are no products", async() => {
			const commit = jest.fn()
			// the api call is mocked
			productApplication.fetchData.mockImplementationOnce(() => Promise.resolve(mockedProductList))
			await productStore.actions.getProducts( { state, commit })
			expect(commit).toHaveBeenCalledTimes(1)
			expect(commit).toHaveBeenCalledWith("SET_LOADING", true)
		})

		it("should call NOT commit the loading mutation, if there are products", async() => {
			const dataSet = {
				products: mockedProductList, 
				productNames,
				productTypes
			}
			productStore.mutations.SET_PRODUCTS(state, dataSet)

			const commit = jest.fn()
			await productStore.actions.getProducts( { state, commit })
			expect(commit).toHaveBeenCalledTimes(0)
		})
	})

	describe("testing processProductsData", () => {
		it("should set the product, productTypes, productNames and loading properties, if there is no error and data is sent", async() => {
			const commit = jest.fn()
			await productStore.actions.processProductsData( { commit }, { error: null, data: mockedProductList })
			expect(commit).toHaveBeenCalledTimes(2)
			const expectedDataSets = {
				products: mockedProductList, 
				productNames, 
				productTypes
			}
			expect(commit).toHaveBeenCalledWith("SET_PRODUCTS", expectedDataSets)
			expect(commit).toHaveBeenCalledWith("SET_LOADING", false)
		})

		it("should set the product, productTypes, productNames to empty arrays and loading properties, if there is no error and data is sent as empty", async() => {
			const commit = jest.fn()
			await productStore.actions.processProductsData( { commit }, { error: null, data: [] })
			expect(commit).toHaveBeenCalledTimes(2)
			const expectedDataSets = {
				products: [], 
				productNames: [], 
				productTypes: []
			}
			expect(commit).toHaveBeenCalledWith("SET_PRODUCTS", expectedDataSets)
			expect(commit).toHaveBeenCalledWith("SET_LOADING", false)
		})

		it("should set the loading property to false, if there is an api error and no data is sent", async() => {
			const commit = jest.fn()
			await productStore.actions.processProductsData( { commit }, { error: "Testing api Error!!" })
			expect(commit).toHaveBeenCalledTimes(1)
			expect(commit).toHaveBeenCalledWith("SET_LOADING", false)
		})

		it("should set the loading property to false, if there is an api error and THERE IS data is sent", async() => {
			const commit = jest.fn()
			await productStore.actions.processProductsData( { commit }, { error: "Testing api rror!!", data: "some data" })
			expect(commit).toHaveBeenCalledTimes(1)
			expect(commit).toHaveBeenCalledWith("SET_LOADING", false)
		})
	})
})

/**
 * [initialization is a function that defines all the boiler plate code to initialize the store to be tested.]
 */
function initialization() {
	state = {
		products: [],
		productTypes: [],
		productNames: [],
		loading: false,
		cart: []
	}
}
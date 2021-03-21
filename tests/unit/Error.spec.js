import { mount, createLocalVue } from "@vue/test-utils"
import Error from "@views/Error.vue"
import Vuetify from "vuetify"
import router from "@router"

let localVue
let wrapper
let vuetify

afterEach(() => {
	wrapper.destroy()
})

describe("testing Error Template", () => {
	beforeEach(() => createInstance())
	it("should render the page and match the snapshot", () => {
		expect(wrapper.exists()).toBe(true)
		expect(wrapper).toMatchSnapshot()
	})

	it("should render a v-card with the proper test name", () => 
		expect(wrapper.find(".v-card[data-testid=\"error-card\"]").exists()).toBe(true))

	it("should render a card title with the proper content", () => {
		const title = wrapper.find(".v-card__title")
		expect(title.exists()).toBe(true)
		expect(title.text()).toBe("Ooops! An error has occured.")
	})

	it("should render a card sub title with the proper content", () => {
		const title = wrapper.find(".v-card__subtitle")
		expect(title.exists()).toBe(true)
		expect(title.text()).toBe("Please try again.")
	})

	it("should render a Button component with the correct name and props", () => {
		const button = wrapper.find(".v-btn[data-testid=\"back-home-button\"]")
		expect(button.exists()).toBe(true)
		expect(button.text()).toBe("Try Again")
		expect(button.props().color).toBe("#8d010d lighten-2")
	})
})

describe("testing Error Methods", () => {
	beforeEach(() => createInstance())

	describe("testing backHome method", () => {
		it("should emit onSubmit", async() => {
			wrapper.vm.backHome()
			await wrapper.vm.$nextTick()
			expect(wrapper.vm.$route.name).toEqual("Home")
		})
	})
})

/**
 * [createInstance is a function that defines all the boiler plate code to create the Error component ]
 */
async function createInstance() {
	localVue = createLocalVue()
	vuetify = new Vuetify()

	// mount the wrapper
	wrapper = mount(Error, {
		localVue,
		vuetify,
		router,
	})
	await wrapper.vm.$nextTick()
}
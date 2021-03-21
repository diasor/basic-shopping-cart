<template>
	<div data-testid="home-container">
		<v-row justify="space-between">
			<v-col
				cols="12"
				sm="6"
				md="8"
			>
				<product-skeleton v-if="loadSkeleton"/>
				<product-form v-else/>
			</v-col>
			<v-col
				cols="6"
				md="4"
			>
				<product-list />
			</v-col>
		</v-row>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import ProductForm from "@components/ProductForm.vue"
import ProductSkeleton from "@components/ProductSkeleton.vue"
import ProductList from "@components/ProductList.vue"

export default {
	name: "Home",
	
	components: {
		ProductSkeleton,
		ProductForm,
		ProductList
	},
	
	computed: {
		...mapGetters(["loading"]),

		loadSkeleton () {
			return this.loading
		}
	},

	async created () {
		await this.getProducts()
	},

	methods: {
		...mapActions(['getProducts'])
	}
}
</script>

<template>
	<v-card 
		justify="left"
		elevation="2"
		class="mt-4 pa-10"
		max-width="1000px"
	>

		<v-card-title class="pa-0">Product </v-card-title>
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
		>
			<v-row justify="space-between">
				<v-col
					cols="12"
					md="6"
				>
					<v-select
						v-model="productType"
						:items="productTypeList"
						:rules="[v => !!v || 'Type is required']"
						label="Type"
						required
						@input="resetProduct()"
					></v-select>

					<v-select
						v-model="productName"
						:items="productNameList"
						:rules="[v => !!v || 'Name is required']"
						label="Name"
						required
						@input="changeProduct()"
					></v-select>

					<v-select
						v-model="productColor"
						:items="productColorList"
						:rules="[v => !!v || 'Color is required']"
						label="Color"
						required
					></v-select>
				</v-col>
				<v-col
					cols="12"
					md="4"
				>
					<v-row justify="center">
						<v-img
							v-if="product.img"
							:src="productImage"
							max-height="300"
							class="mr-10"
							contain
						/>
					</v-row>
				</v-col>
			</v-row>

			<v-row class="mt-6">
				<v-btn
					:disabled="!valid"
					color="success"
					class="mr-4"
					@click="validate"
				>
					Add to Cart
				</v-btn>

				<v-btn
					color="error"
					class="mr-4"
					@click="reset"
				>
					Reset Form
				</v-btn>
			</v-row>
		</v-form>
	</v-card>
</template>
<script>
import { mapGetters, mapActions } from "vuex"

export default {
	name: "ProductForm",

    data: () => ({
		valid: true,
		productType: "",
		productName: "",
		product: {},
		productColor: ""
    }),

	computed: {
		...mapGetters(["productTypes", "allProducts"]),

		productNameList () {
			if (this.productType === [] || this.allProducts.length === 0) {
				return []
			} else {
				return this.allProducts
					.filter(product => product.type === this.productType)
					.map(product => product.name)
			}
		},
		
		productTypeList () {
			return (this.productTypes || [])
		},

		productColorList () {
			if (this.productName === "" || this.allProducts.length === 0) {
				return []
			} else {
				return this.product.colors
			}
		},

		productImage () {
			return (this.product.img) ? this.product.img : ""
		}
	},

    methods: {
		...mapActions(['addToCart']),

		changeProduct () {
			if (this.productName && this.allProducts.length > 0) {
				this.product = this.allProducts.find(product => product.name === this.productName)
			} else {
				this.product = {}
			}
		},

		resetProduct () {
			this.product = {}
			this.productName = ""
			this.productColor = ""
		},

		validate () {
			if (this.$refs.form.validate()) {
				this.addToCart({
					type: this.productType,
					name: this.productName,
					color: this.productColor,
					img: this.product.img
				})
				this.reset()
			}
		},

		reset () {
			this.$refs.form.reset()
		}
    }
  }
</script>

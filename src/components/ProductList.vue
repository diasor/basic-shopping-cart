<template>
	<v-card
		v-if="myCart.length >0"
		max-width="450"
		class="mx-auto mt-4"
	>
		<v-card-title >My Cart </v-card-title>
		<v-list three-line>
			<template v-for="(product, index) in myCart">
				<v-list-item
					:key="index"
				>
					<v-list-item-avatar>
						<v-img :src="product.img"></v-img>
					</v-list-item-avatar>
					<v-list-item-content>
						<v-list-item-title v-html="product.name"></v-list-item-title>
						<v-list-item-subtitle>{{ product.type }} - {{ product.color }}</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</template>
		</v-list>
	</v-card>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	name: "ProductList",
	
	computed: {
		...mapGetters(["myCart"])
	}
}
</script>

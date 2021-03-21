<template>
	<v-card
		v-if="myCart.length >0"
		max-width="450"
		class="mx-auto mt-4"
	>
		<v-card-title class="pb-0">My Cart </v-card-title>
		<v-list >
			<v-list-item-group multiple >
				<template v-for="(product, index) in myCart" >
					<v-list-item :key="product.name" > 
						<v-img 
							:src="product.img" 
							class="ma-4 rounded" max-width="70px" max-height="70px" 
							contain
						/>
						<v-list-item-content>
							<v-list-item-title v-html="product.name"></v-list-item-title>
							<v-list-item-subtitle>{{ product.type }} - {{ product.color }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
					<v-divider
						v-if="index < myCart.length - 1"
						:key="index"
					/>	
				</template>
			</v-list-item-group>
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

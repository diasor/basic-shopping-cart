<template>
	<v-container>
		<v-card 
			justify="center"
			elevation="2"
			class="pa-10"
			max-width="900px"
		>

			<v-card-title class="pa-0">Product </v-card-title>
			<v-row justify="space-between">
				<v-col
					cols="12"
					md="4"
					class="pl-0"
				>
					<v-skeleton-loader
						v-bind="attrs"
						class="mt-10"
						type="list-item-three-line, actions"
					></v-skeleton-loader>
				</v-col>
				<v-col
					cols="12"
					md="4"
				>
					<v-skeleton-loader
						v-bind="attrs"
						type="image"
					></v-skeleton-loader>
				</v-col>
			</v-row>
		</v-card>
	</v-container>
</template>
<script>
export default {
	name: "ProductSkelenton",
	
	data: () => ({
		attrs: {
			class: 'mb-6',
			boilerplate: true
		}
	})
}
</script>

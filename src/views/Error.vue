<template>
	<v-card
		class="mx-auto mt-10"
		max-width="80%"
		justify="center"
		data-testid="error-card"
	>

	<v-card-title>
		Ooops! An error has occured.
	</v-card-title>

	<v-card-subtitle>
		Please try again.
	</v-card-subtitle>
	<v-card-actions>
		<v-btn
			data-testid="back-home-button"
			color="#8d010d lighten-2"
			text
			@click="backHome()"
		>
			Try Again
			<v-icon class="ml-4">fas fa-circle-notch fa-spin</v-icon>
		</v-btn>
    </v-card-actions>

  </v-card>
</template>
<script>
export default {
	name: "Error",

	methods: {
		backHome () {
			this.$router.push({ path: '/' })
		}
	}
}
</script>

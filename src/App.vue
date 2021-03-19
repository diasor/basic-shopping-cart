<template>
  <v-app>
    <v-app-bar app color="primary" dark>
       <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <div
              class="d-flex align-center"
              @click="gotToMainMenu"
              v-bind="attrs"
              v-on="on"
            >
			<img 
				:src="require('@/assets/logo.png')" 
				height="40px" 
				/>
          </div>
        </template>
         <span>Go to the Main page</span>
       </v-tooltip>
      <v-spacer></v-spacer>

      <v-btn @click="goToAbout" text>
        <span>About</span>
      </v-btn>

      <v-btn
        class="text-small-devices"
        href="https://github.com/diasor/basic-shopping-cart"
        target="_blank"
        text
      >
        <span>Latest Release</span>
        <v-icon class="release-icon">mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="d-flex flex-wrap">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  methods: {
    gotToMainMenu () {
      this.$router.push({ path: "/" })
    },

    gotToInstructionMenu () {
      this.$router.push({ path: "/instructions" })
    },

    goToAbout () {
      this.$router.push({ path: "/about" })
    }
  }
}
</script>

<style lang="scss">
  .text-small-devices {
    display: none !important;
    width: 0 !important;

    @media screen and (min-width: 450px) {
      display: flex !important;
      width: auto !important;
    }
  }

  .release-icon {
    padding-left: 5px;
  }
</style>

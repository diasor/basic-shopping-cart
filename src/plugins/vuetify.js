import Vue from "vue"
import Vuetify from "vuetify/lib"
import colors from "vuetify/lib/util/colors"

Vue.use(Vuetify)

const vuetify = new Vuetify({
  theme: {
    themes: {
      dark: {
        primary: "#8d010d"
      },
      light: {
        primary: "#8d010d",
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.accent3
      }
    }
  }
})

export default vuetify

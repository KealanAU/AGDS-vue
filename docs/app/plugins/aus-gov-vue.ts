import 'AGDS-vue/styles'
import AgDSVue from 'AGDS-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AgDSVue)
})

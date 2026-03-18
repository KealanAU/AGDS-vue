import { AgDSVue } from 'agds-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AgDSVue)
})

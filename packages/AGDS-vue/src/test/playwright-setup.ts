import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import '../styles/styles.css'

beforeMount(async () => {
  // Global CSS (tokens + base reset) is imported above so every component
  // test renders with the real design-system styles, enabling axe-core to
  // evaluate colour contrast against actual computed values.
})

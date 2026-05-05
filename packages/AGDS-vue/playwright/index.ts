import { beforeMount } from '@playwright/experimental-ct-vue/hooks'
import type { App } from 'vue'
import '../src/styles/styles.css'

// Register tab sub-components globally so they can be used inside slot HTML
// strings in the tabs component tests.
import AGDSTabList from '../src/components/tabs/AGDSTabList.vue'
import AGDSTab from '../src/components/tabs/AGDSTab.vue'
import AGDSTabPanel from '../src/components/tabs/AGDSTabPanel.vue'

beforeMount(async ({ app }: { app: App }) => {
  // Global CSS (tokens + base reset) is imported above so every component
  // test renders with the real design-system styles, enabling axe-core to
  // evaluate colour contrast against actual computed values.

  // Register tab sub-components so slot HTML strings in tests can use them
  // by their export names (PascalCase).
  app.component('AgDSTabList', AGDSTabList)
  app.component('AgDSTab', AGDSTab)
  app.component('AgDSTabPanel', AGDSTabPanel)
})

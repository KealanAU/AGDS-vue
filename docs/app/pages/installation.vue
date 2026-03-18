<script setup lang="ts">
useSeoMeta({
  title: 'Installation — AGDS-vue',
  description: 'How to install and set up AGDS-vue in your Vue 3 project.',
})
</script>

<template>
  <DocsLayout>
    <article class="prose-page">
      <h1>Installation</h1>

      <h2>Requirements</h2>
      <ul>
        <li>Vue 3.5+</li>
        <li>Node 20+</li>
      </ul>

      <h2>Install the package</h2>
      <pre><code>pnpm add AGDS-vue</code></pre>

      <h2>Register globally (recommended)</h2>
      <p>Register all components and import the stylesheet once in <code>main.ts</code>:</p>
      <pre><code>import { createApp } from 'vue'
import AGDSVue from 'AGDS-vue'
import 'AGDS-vue/styles'
import App from './App.vue'

createApp(App).use(AGDSVue).mount('#app')</code></pre>

      <h2>Import individually</h2>
      <p>
        For better tree-shaking, import only the components you need. Still import the stylesheet
        once in <code>main.ts</code> — not per-component:
      </p>
      <pre><code>// main.ts
import 'AGDS-vue/styles'</code></pre>
      <pre><code>&lt;!-- MyComponent.vue --&gt;
&lt;script setup&gt;
import { AGDSButton } from 'AGDS-vue'
&lt;/script&gt;</code></pre>

      <h2>Nuxt 3</h2>
      <p>Create a plugin at <code>plugins/AGDS-vue.ts</code>:</p>
      <pre><code>import AGDSVue from 'AGDS-vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(AGDSVue)
})</code></pre>
      <p>Add the stylesheet in <code>nuxt.config.ts</code>:</p>
      <pre><code>export default defineNuxtConfig({
  css: ['AGDS-vue/styles'],
  plugins: ['~/plugins/AGDS-vue.ts'],
})</code></pre>

      <h2>Design tokens</h2>
      <p>
        All styles use <code>--agds-*</code> CSS custom properties. The stylesheet imported above
        includes all tokens. To override any token, declare it in your own CSS after the import:
      </p>
      <pre><code>/* your-overrides.css */
:root {
  --agds-color-brand: #your-brand-colour;
  --agds-color-focus: #your-focus-colour;
}</code></pre>

      <div class="callout">
        <strong>Next:</strong>
        <NuxtLink to="/foundations/tokens">Explore the full token reference</NuxtLink>
        or
        <NuxtLink to="/components">browse all components</NuxtLink>.
      </div>
    </article>
  </DocsLayout>
</template>

<style scoped>
@import '../styles/prose.css';
</style>

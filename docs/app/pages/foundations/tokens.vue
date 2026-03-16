<script setup lang="ts">
useSeoMeta({
  title: 'Design Tokens — AGDS-vue',
  description: 'Full reference for all --agds-* CSS custom properties.',
})

const tokenGroups = [
  {
    title: 'Brand colours',
    description: 'Primary palette derived from the AGDS brand colour.',
    tokens: [
      { name: '--agds-color-brand', value: '#00698f', type: 'color' },
      { name: '--agds-color-brand-hover', value: '#005572', type: 'color' },
      { name: '--agds-color-brand-active', value: '#004260', type: 'color' },
      { name: '--agds-color-brand-muted', value: '#e0f0f5', type: 'color' },
      { name: '--agds-color-brand-muted-fg', value: '#003d54', type: 'color' },
    ],
  },
  {
    title: 'Text',
    description: 'Text colours for body, muted, inverse, and disabled states.',
    tokens: [
      { name: '--agds-color-text', value: '#313131', type: 'color' },
      { name: '--agds-color-text-muted', value: '#6e6e6e', type: 'color' },
      { name: '--agds-color-text-inverse', value: '#ffffff', type: 'color' },
      { name: '--agds-color-text-disabled', value: '#9d9d9d', type: 'color' },
    ],
  },
  {
    title: 'Background',
    tokens: [
      { name: '--agds-color-bg', value: '#ffffff', type: 'color' },
      { name: '--agds-color-bg-subtle', value: '#f5f5f5', type: 'color' },
      { name: '--agds-color-bg-muted', value: '#e8e8e8', type: 'color' },
    ],
  },
  {
    title: 'Focus ring',
    description: 'Purple focus ring — meets WCAG 2.2 focus appearance requirements.',
    tokens: [
      { name: '--agds-color-focus', value: '#9263de', type: 'color' },
      { name: '--agds-color-focus-width', value: '3px', type: 'dimension' },
    ],
  },
  {
    title: 'Spacing',
    description: 'Spacing scale in rem. Base unit is 4px (0.25rem).',
    tokens: [
      { name: '--agds-space-1', value: '0.25rem  / 4px', type: 'spacing' },
      { name: '--agds-space-2', value: '0.5rem   / 8px', type: 'spacing' },
      { name: '--agds-space-3', value: '0.75rem  / 12px', type: 'spacing' },
      { name: '--agds-space-4', value: '1rem     / 16px', type: 'spacing' },
      { name: '--agds-space-5', value: '1.25rem  / 20px', type: 'spacing' },
      { name: '--agds-space-6', value: '1.5rem   / 24px', type: 'spacing' },
      { name: '--agds-space-8', value: '2rem     / 32px', type: 'spacing' },
      { name: '--agds-space-10', value: '2.5rem   / 40px', type: 'spacing' },
      { name: '--agds-space-12', value: '3rem     / 48px', type: 'spacing' },
      { name: '--agds-space-16', value: '4rem     / 64px', type: 'spacing' },
    ],
  },
  {
    title: 'Font size',
    tokens: [
      { name: '--agds-font-size-xs', value: '0.75rem  / 12px', type: 'font-size' },
      { name: '--agds-font-size-sm', value: '0.875rem / 14px', type: 'font-size' },
      { name: '--agds-font-size-md', value: '1rem     / 16px', type: 'font-size' },
      { name: '--agds-font-size-lg', value: '1.125rem / 18px', type: 'font-size' },
      { name: '--agds-font-size-xl', value: '1.25rem  / 20px', type: 'font-size' },
      { name: '--agds-font-size-2xl', value: '1.5rem   / 24px', type: 'font-size' },
      { name: '--agds-font-size-3xl', value: '1.875rem / 30px', type: 'font-size' },
      { name: '--agds-font-size-4xl', value: '2.25rem  / 36px', type: 'font-size' },
    ],
  },
]
</script>

<template>
  <DocsLayout>
    <div class="tokens-page">
      <h1>Design tokens</h1>
      <p class="tokens-page__intro">
        All values in AGDS-vue use <code>--agds-*</code> CSS custom properties. Override any token
        in your own CSS after importing the stylesheet:
      </p>
      <pre><code>:root {
  --agds-color-brand: #your-colour;
  --agds-color-focus: #your-focus-ring;
}</code></pre>
      <p>
        See
        <code>packages/AGDS-vue/src/styles/tokens.css</code>
        for the complete list.
      </p>

      <div v-for="group in tokenGroups" :key="group.title" class="token-group">
        <h2 class="token-group__title">{{ group.title }}</h2>
        <p v-if="group.description" class="token-group__desc">{{ group.description }}</p>
        <div class="token-table-wrapper">
          <table class="token-table">
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Value</th>
                <th v-if="group.tokens[0]?.type === 'color'" scope="col">Swatch</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="token in group.tokens" :key="token.name">
                <td>
                  <code class="token-name">{{ token.name }}</code>
                </td>
                <td>
                  <code class="token-value">{{ token.value }}</code>
                </td>
                <td v-if="token.type === 'color'">
                  <span
                    class="token-swatch"
                    :style="{ backgroundColor: `var(${token.name})` }"
                    :aria-label="`Colour swatch for ${token.name}`"
                    role="img"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
@import '../../styles/prose.css';

.tokens-page h1 {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-4);
  border-bottom: 3px solid var(--agds-color-brand);
  padding-bottom: var(--agds-space-4);
}

.tokens-page__intro {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  margin-bottom: var(--agds-space-4);
  line-height: var(--agds-line-height-relaxed);
}

.tokens-page pre {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: var(--agds-space-4);
  border-radius: var(--agds-radius-md);
  font-size: var(--agds-font-size-sm);
  margin-bottom: var(--agds-space-6);
  overflow-x: auto;
}

.tokens-page pre code {
  background: none;
  border: none;
  padding: 0;
}

.tokens-page p code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  border: 1px solid var(--agds-color-border);
  padding: 0.1em 0.4em;
  border-radius: var(--agds-radius-sm);
}

.token-group {
  margin-bottom: var(--agds-space-10);
}

.token-group__title {
  font-size: var(--agds-font-size-xl);
  font-weight: var(--agds-font-weight-semibold);
  margin: 0 0 var(--agds-space-2);
  color: var(--agds-color-text);
}

.token-group__desc {
  color: var(--agds-color-text-muted);
  font-size: var(--agds-font-size-sm);
  margin: 0 0 var(--agds-space-4);
}

.token-table-wrapper {
  overflow-x: auto;
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
}

.token-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--agds-font-size-sm);
}

.token-table th,
.token-table td {
  padding: var(--agds-space-3) var(--agds-space-4);
  text-align: left;
  border-bottom: 1px solid var(--agds-color-border);
}

.token-table tr:last-child td {
  border-bottom: none;
}

.token-table th {
  background-color: var(--agds-color-bg-subtle);
  font-weight: var(--agds-font-weight-semibold);
  font-size: var(--agds-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.token-name {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-brand);
}

.token-value {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
}

.token-swatch {
  display: inline-block;
  width: 2rem;
  height: 2rem;
  border-radius: var(--agds-radius-md);
  border: 1px solid var(--agds-color-border);
  vertical-align: middle;
}
</style>

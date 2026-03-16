<script setup lang="ts">
useSeoMeta({
  title: 'Colours — AGDS-vue',
  description: 'The colour palette used across AGDS-vue, derived from the AGDS brand colours.',
})

const palettes = [
  {
    title: 'Brand',
    description: 'Core palette. Use brand as the primary action colour throughout.',
    swatches: [
      { token: '--agds-color-brand', hex: '#00698f', label: 'Brand', on: 'white' },
      { token: '--agds-color-brand-hover', hex: '#005572', label: 'Brand hover', on: 'white' },
      { token: '--agds-color-brand-active', hex: '#004260', label: 'Brand active', on: 'white' },
      { token: '--agds-color-brand-muted', hex: '#e0f0f5', label: 'Brand muted', on: 'dark' },
      {
        token: '--agds-color-brand-muted-fg',
        hex: '#003d54',
        label: 'Brand muted fg',
        on: 'white',
      },
    ],
  },
  {
    title: 'Text',
    swatches: [
      { token: '--agds-color-text', hex: '#313131', label: 'Text', on: 'white' },
      { token: '--agds-color-text-muted', hex: '#6e6e6e', label: 'Text muted', on: 'white' },
      { token: '--agds-color-text-inverse', hex: '#ffffff', label: 'Text inverse', on: 'dark' },
      {
        token: '--agds-color-text-disabled',
        hex: '#9d9d9d',
        label: 'Text disabled',
        on: 'white',
      },
    ],
  },
  {
    title: 'Background',
    swatches: [
      { token: '--agds-color-bg', hex: '#ffffff', label: 'Background', on: 'dark' },
      { token: '--agds-color-bg-subtle', hex: '#f5f5f5', label: 'Background subtle', on: 'dark' },
      { token: '--agds-color-bg-muted', hex: '#e8e8e8', label: 'Background muted', on: 'dark' },
    ],
  },
  {
    title: 'Focus',
    description: 'Purple focus ring — 3px solid, meets WCAG 2.2 focus appearance.',
    swatches: [{ token: '--agds-color-focus', hex: '#9263de', label: 'Focus ring', on: 'white' }],
  },
  {
    title: 'Status',
    swatches: [
      { token: '--agds-color-success', hex: '#0b7e00', label: 'Success', on: 'white' },
      { token: '--agds-color-success-muted', hex: '#e5f5e3', label: 'Success muted', on: 'dark' },
      { token: '--agds-color-warning', hex: '#c56900', label: 'Warning', on: 'white' },
      { token: '--agds-color-warning-muted', hex: '#fdf3e3', label: 'Warning muted', on: 'dark' },
      { token: '--agds-color-error', hex: '#d60000', label: 'Error', on: 'white' },
      { token: '--agds-color-error-muted', hex: '#fde8e8', label: 'Error muted', on: 'dark' },
    ],
  },
]
</script>

<template>
  <DocsLayout>
    <div class="found-page">
      <h1>Colours</h1>
      <p class="found-page__intro">
        The AgDS-vue colour system is derived from the Agriculture Design System brand palette.
        Every colour is available as a <code>--agds-color-*</code> CSS custom property.
      </p>

      <div v-for="palette in palettes" :key="palette.title" class="palette">
        <h2 class="palette__title">{{ palette.title }}</h2>
        <p v-if="palette.description" class="palette__desc">{{ palette.description }}</p>
        <div class="swatch-grid">
          <div v-for="s in palette.swatches" :key="s.token" class="swatch">
            <div
              class="swatch__block"
              :style="{ backgroundColor: s.hex }"
              :class="s.on === 'dark' ? 'swatch__block--dark-border' : ''"
            />
            <div class="swatch__meta">
              <p class="swatch__label">{{ s.label }}</p>
              <p class="swatch__hex">{{ s.hex }}</p>
              <p class="swatch__token">{{ s.token }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
@import '../../styles/prose.css';

.found-page h1 {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-4);
  border-bottom: 3px solid var(--agds-color-brand);
  padding-bottom: var(--agds-space-4);
  color: var(--agds-color-text);
}

.found-page__intro {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
  margin-bottom: var(--agds-space-10);
}

.found-page__intro code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  border: 1px solid var(--agds-color-border);
  padding: 0.1em 0.4em;
  border-radius: var(--agds-radius-sm);
}

.palette {
  margin-bottom: var(--agds-space-10);
}

.palette__title {
  font-size: var(--agds-font-size-xl);
  font-weight: var(--agds-font-weight-semibold);
  margin: 0 0 var(--agds-space-2);
  color: var(--agds-color-text);
}

.palette__desc {
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  margin: 0 0 var(--agds-space-4);
}

.swatch-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: var(--agds-space-3);
}

.swatch {
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  overflow: hidden;
}

.swatch__block {
  height: 5rem;
}

.swatch__block--dark-border {
  border-bottom: 1px solid var(--agds-color-border);
}

.swatch__meta {
  padding: var(--agds-space-3);
}

.swatch__label {
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-text);
  margin: 0 0 var(--agds-space-1);
}

.swatch__hex {
  font-size: var(--agds-font-size-sm);
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
  margin: 0 0 var(--agds-space-1);
}

.swatch__token {
  font-size: var(--agds-font-size-xs);
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
  margin: 0;
  word-break: break-all;
}
</style>

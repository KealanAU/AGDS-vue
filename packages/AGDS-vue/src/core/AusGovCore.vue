<script setup lang="ts">
import { onMounted, onBeforeUnmount, computed } from 'vue'
import type { Component } from 'vue'
import CoreProvider from './CoreProvider.vue'
import { goldTheme } from './goldTheme'
import { printTheme } from './printTheme'
import { mergeTheme, themeToVars } from './theme'
import { boxPalettes } from './boxPalette'
import { tokens } from './tokens'
import type { Theme } from './theme'

export interface AgDSCoreProps {
  /** When true (default), applies a CSS reset to `html` and `body`. */
  applyReset?: boolean
  /** Overrides the default gold theme. Only the keys you provide are changed. */
  theme?: Partial<Theme>
  /**
   * The global link component used wherever the library renders an anchor.
   * Defaults to a plain `<a>` element.
   */
  linkComponent?: Component
}

const props = withDefaults(defineProps<AgDSCoreProps>(), {
  applyReset: true,
})

const mergedTheme = computed(() => mergeTheme(goldTheme, props.theme))

function buildCSS(): string {
  const themeVarValues = themeToVars(mergedTheme.value)
  const printThemeVarValues = themeToVars(mergeTheme(goldTheme, printTheme))

  // ── :root — theme vars ──────────────────────────────────────
  const rootVars = Object.entries(themeVarValues)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  const printVars = Object.entries(printThemeVarValues)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  // ── Light palette on html/body ──────────────────────────────
  const lightPaletteVars = Object.entries(boxPalettes.light)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  // ── Optional reset ──────────────────────────────────────────
  const resetCSS = props.applyReset
    ? `
body, html {
  margin: 0;
  padding: 0;
  background: var(--agds-background-body, #ffffff);
  font-family: ${tokens.font.body};
}
html {
  scrollbar-gutter: stable;
}`
    : ''

  return `
:root {
${rootVars}
}

@media print {
  :root {
${printVars}
  }
}

body, html {
${lightPaletteVars}
}
${resetCSS}
`.trim()
}

let styleEl: HTMLStyleElement | null = null

onMounted(() => {
  styleEl = document.createElement('style')
  styleEl.setAttribute('data-agds-core', '')
  styleEl.textContent = buildCSS()
  document.head.appendChild(styleEl)
})

onBeforeUnmount(() => {
  styleEl?.remove()
  styleEl = null
})
</script>

<template>
  <CoreProvider :link-component="linkComponent">
    <slot />
  </CoreProvider>
</template>

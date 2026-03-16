<script setup lang="ts">
import 'AGDS-vue/styles'
</script>

<template>
  <div id="app">
    <NuxtPage />
  </div>
</template>

<style>
/* ── Global base ─────────────────────────────────────────── */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);
}

:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}

a {
  color: var(--agds-color-brand);
}

a:hover {
  color: var(--agds-color-brand-hover);
}

code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
}

pre {
  font-family: var(--agds-font-family-mono);
  overflow-x: auto;
}

/* ── Content renderer prose ──────────────────────────────── */
/* Styles markdown output from <ContentRenderer> on component pages */

.comp-page__content h2 {
  font-size: var(--agds-font-size-2xl);
  font-weight: var(--agds-font-weight-bold);
  margin: var(--agds-space-10) 0 var(--agds-space-4);
  padding-top: var(--agds-space-2);
  color: var(--agds-color-text);
  scroll-margin-top: var(--agds-space-6);
}

.comp-page__content h3 {
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-semibold);
  margin: var(--agds-space-8) 0 var(--agds-space-3);
  color: var(--agds-color-text);
  scroll-margin-top: var(--agds-space-6);
}

.comp-page__content p {
  margin: 0 0 var(--agds-space-4);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-relaxed);
}

.comp-page__content ul,
.comp-page__content ol {
  margin: 0 0 var(--agds-space-4);
  padding-left: var(--agds-space-6);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-relaxed);
}

.comp-page__content li + li {
  margin-top: var(--agds-space-1);
}

.comp-page__content :not(pre) > code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  border: 1px solid var(--agds-color-border);
  padding: 0.1em 0.4em;
  border-radius: var(--agds-radius-sm);
  color: var(--agds-color-text);
}

.comp-page__content table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--agds-font-size-sm);
  margin-bottom: var(--agds-space-6);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  overflow: hidden;
}

.comp-page__content th,
.comp-page__content td {
  padding: var(--agds-space-3) var(--agds-space-4);
  text-align: left;
  border-bottom: 1px solid var(--agds-color-border);
  vertical-align: top;
}

.comp-page__content tr:last-child td {
  border-bottom: none;
}

.comp-page__content th {
  background-color: var(--agds-color-bg-subtle);
  font-weight: var(--agds-font-weight-semibold);
  font-size: var(--agds-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--agds-color-text-muted);
}
</style>

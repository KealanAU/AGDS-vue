<script setup lang="ts">
useSeoMeta({
  title: 'Spacing — AGDS-vue',
  description: 'The spacing scale and layout tokens used across AGDS-vue.',
})

const scale = [
  { token: '--agds-space-1', rem: '0.25rem', px: '4px' },
  { token: '--agds-space-2', rem: '0.5rem', px: '8px' },
  { token: '--agds-space-3', rem: '0.75rem', px: '12px' },
  { token: '--agds-space-4', rem: '1rem', px: '16px' },
  { token: '--agds-space-5', rem: '1.25rem', px: '20px' },
  { token: '--agds-space-6', rem: '1.5rem', px: '24px' },
  { token: '--agds-space-8', rem: '2rem', px: '32px' },
  { token: '--agds-space-10', rem: '2.5rem', px: '40px' },
  { token: '--agds-space-12', rem: '3rem', px: '48px' },
  { token: '--agds-space-16', rem: '4rem', px: '64px' },
  { token: '--agds-space-20', rem: '5rem', px: '80px' },
  { token: '--agds-space-24', rem: '6rem', px: '96px' },
]
</script>

<template>
  <DocsLayout>
    <div class="found-page">
      <h1>Spacing</h1>
      <p class="found-page__intro">
        A base-4px spacing scale. Every margin, padding, and gap value in AGDS-vue uses a
        <code>--agds-space-*</code> token — no arbitrary values.
      </p>

      <div class="space-table-wrap">
        <table class="space-table">
          <thead>
            <tr>
              <th scope="col">Token</th>
              <th scope="col">rem</th>
              <th scope="col">px</th>
              <th scope="col">Visual</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="step in scale" :key="step.token">
              <td>
                <code class="space-token">{{ step.token }}</code>
              </td>
              <td>
                <code class="space-value">{{ step.rem }}</code>
              </td>
              <td>
                <code class="space-value">{{ step.px }}</code>
              </td>
              <td>
                <div
                  class="space-bar"
                  :style="{ width: step.rem, minWidth: '2px' }"
                  :aria-label="`${step.px} wide`"
                />
              </td>
            </tr>
          </tbody>
        </table>
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
  margin-bottom: var(--agds-space-8);
}

.found-page__intro code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  border: 1px solid var(--agds-color-border);
  padding: 0.1em 0.4em;
  border-radius: var(--agds-radius-sm);
}

.space-table-wrap {
  overflow-x: auto;
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
}

.space-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--agds-font-size-sm);
}

.space-table th,
.space-table td {
  padding: var(--agds-space-3) var(--agds-space-4);
  text-align: left;
  border-bottom: 1px solid var(--agds-color-border);
  vertical-align: middle;
}

.space-table tr:last-child td {
  border-bottom: none;
}

.space-table th {
  background: var(--agds-color-bg-subtle);
  font-weight: var(--agds-font-weight-semibold);
  font-size: var(--agds-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.space-token {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-brand);
}

.space-value {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
}

.space-bar {
  height: 1.25rem;
  background-color: var(--agds-color-brand);
  border-radius: 2px;
  opacity: 0.7;
}
</style>

<script setup lang="ts">
useSeoMeta({
  title: 'Typography — AGDS-vue',
  description: 'Type scale and font tokens used across AGDS-vue.',
})

const scale = [
  {
    token: '--agds-font-size-xs',
    rem: '0.75rem',
    px: '12px',
    sample: 'xs — The quick brown fox',
  },
  {
    token: '--agds-font-size-sm',
    rem: '0.875rem',
    px: '14px',
    sample: 'sm — The quick brown fox',
  },
  { token: '--agds-font-size-md', rem: '1rem', px: '16px', sample: 'md — The quick brown fox' },
  {
    token: '--agds-font-size-lg',
    rem: '1.125rem',
    px: '18px',
    sample: 'lg — The quick brown fox',
  },
  {
    token: '--agds-font-size-xl',
    rem: '1.25rem',
    px: '20px',
    sample: 'xl — The quick brown fox',
  },
  {
    token: '--agds-font-size-2xl',
    rem: '1.5rem',
    px: '24px',
    sample: '2xl — The quick brown fox',
  },
  {
    token: '--agds-font-size-3xl',
    rem: '1.875rem',
    px: '30px',
    sample: '3xl — The quick brown fox',
  },
  {
    token: '--agds-font-size-4xl',
    rem: '2.25rem',
    px: '36px',
    sample: '4xl — The quick brown fox',
  },
]

const weights = [
  { token: '--agds-font-weight-normal', value: '400', label: 'Normal (400)' },
  { token: '--agds-font-weight-medium', value: '500', label: 'Medium (500)' },
  { token: '--agds-font-weight-semibold', value: '600', label: 'Semibold (600)' },
  { token: '--agds-font-weight-bold', value: '700', label: 'Bold (700)' },
]
</script>

<template>
  <DocsLayout>
    <div class="found-page">
      <h1>Typography</h1>
      <p class="found-page__intro">
        AGDS-vue uses a system font stack — no external fonts are loaded. All typographic values are
        available as <code>--agds-font-*</code> tokens.
      </p>

      <h2>Font family</h2>
      <div class="font-family-card">
        <p class="font-family-card__stack">
          system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
        </p>
        <code class="font-family-card__token">--agds-font-family-body</code>
      </div>

      <h2>Size scale</h2>
      <div class="type-scale">
        <div v-for="step in scale" :key="step.token" class="type-step">
          <div class="type-step__meta">
            <code class="type-step__token">{{ step.token }}</code>
            <span class="type-step__values">{{ step.rem }} / {{ step.px }}</span>
          </div>
          <p class="type-step__sample" :style="{ fontSize: step.rem, margin: 0 }">
            {{ step.sample }}
          </p>
        </div>
      </div>

      <h2>Font weights</h2>
      <div class="weight-grid">
        <div v-for="w in weights" :key="w.token" class="weight-card">
          <p class="weight-card__sample" :style="{ fontWeight: w.value }">The quick brown fox</p>
          <code class="weight-card__token">{{ w.token }}</code>
          <p class="weight-card__label">{{ w.label }}</p>
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
  margin-bottom: var(--agds-space-8);
}

.found-page h2 {
  font-size: var(--agds-font-size-xl);
  font-weight: var(--agds-font-weight-semibold);
  margin: var(--agds-space-10) 0 var(--agds-space-4);
  color: var(--agds-color-text);
}

.found-page__intro code,
.found-page h2 code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  border: 1px solid var(--agds-color-border);
  padding: 0.1em 0.4em;
  border-radius: var(--agds-radius-sm);
}

.font-family-card {
  padding: var(--agds-space-5);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  background: var(--agds-color-bg-subtle);
  margin-bottom: var(--agds-space-4);
}

.font-family-card__stack {
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
  margin: 0 0 var(--agds-space-2);
}

.font-family-card__token {
  font-family: var(--agds-font-family-mono);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-brand);
}

.type-scale {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  overflow: hidden;
}

.type-step {
  display: grid;
  grid-template-columns: 16rem 1fr;
  gap: var(--agds-space-4);
  padding: var(--agds-space-4) var(--agds-space-5);
  border-bottom: 1px solid var(--agds-color-border);
  align-items: center;
}

.type-step:last-child {
  border-bottom: none;
}

.type-step__meta {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.type-step__token {
  font-family: var(--agds-font-family-mono);
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-brand);
}

.type-step__values {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
  font-family: var(--agds-font-family-mono);
}

.weight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--agds-space-4);
}

.weight-card {
  padding: var(--agds-space-5);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
}

.weight-card__sample {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text);
  margin: 0 0 var(--agds-space-3);
  line-height: var(--agds-line-height-snug);
}

.weight-card__token {
  font-family: var(--agds-font-family-mono);
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-brand);
  display: block;
  margin-bottom: var(--agds-space-1);
}

.weight-card__label {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
  margin: 0;
}

@media (max-width: 700px) {
  .type-step {
    grid-template-columns: 1fr;
  }
}
</style>

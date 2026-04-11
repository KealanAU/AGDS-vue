<script setup lang="ts">
useSeoMeta({
  title: 'AGDS-vue — Agriculture Design System',
  description: 'Accessible Vue 3 components for the Agriculture Design System (AGDS) — Department of Agriculture, Fisheries and Forestry.',
})
</script>

<template>
  <DocsLayout>
    <div class="intro">
      <h1 class="intro__title">AGDS-vue</h1>
      <p class="intro__lead">
        A suite of accessible Vue 3 components for building the Export Service with efficiency and
        consistency. Built on
        <a href="https://reka-ui.com" target="_blank" rel="noopener">Reka UI</a> primitives with
        <code>--agds-*</code> design tokens.
      </p>

      <div class="intro__actions">
        <NuxtLink to="/installation" class="intro__cta intro__cta--primary">Get started</NuxtLink>
        <NuxtLink to="/components" class="intro__cta intro__cta--secondary"
          >Browse components</NuxtLink
        >
      </div>

      <div class="intro__features">
        <div class="feature">
          <h2 class="feature__title">Accessible by default</h2>
          <p class="feature__body">
            Every interactive component gets correct keyboard navigation, focus management, and ARIA
            attributes via Reka UI — no configuration needed.
          </p>
        </div>
        <div class="feature">
          <h2 class="feature__title">Design tokens</h2>
          <p class="feature__body">
            All colours, spacing, and typography are <code>--agds-*</code> CSS custom properties.
            Override the whole system with a handful of variable declarations.
          </p>
        </div>
        <div class="feature">
          <h2 class="feature__title">TypeScript-first</h2>
          <p class="feature__body">
            Fully typed props, emits, and slots on every component. Exported interfaces let you
            build typed wrappers with zero effort.
          </p>
        </div>
        <div class="feature">
          <h2 class="feature__title">Digital Service Standard</h2>
          <p class="feature__body">
            Built to align with all 10 criteria of the
            <NuxtLink to="/digital-service-standard">Digital Service Standard</NuxtLink>.
          </p>
        </div>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
.intro {
  max-width: 48rem;
  padding-block: var(--agds-space-4);
}

.intro__title {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-4);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-tight);
}

.intro__lead {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
  margin: 0 0 var(--agds-space-8);
}

.intro__lead a,
.intro__lead code {
  color: var(--agds-color-brand);
}

.intro__lead code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
}

.intro__actions {
  display: flex;
  gap: var(--agds-space-3);
  flex-wrap: wrap;
  margin-bottom: var(--agds-space-12);
}

.intro__cta {
  display: inline-flex;
  align-items: center;
  height: 2.75rem;
  padding-inline: var(--agds-space-6);
  border-radius: var(--agds-radius-md);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-semibold);
  text-decoration: none;
  border: 2px solid transparent;
  transition: background-color var(--agds-transition-fast);
}

.intro__cta--primary {
  background-color: var(--agds-color-brand);
  color: var(--agds-color-text-inverse);
}

.intro__cta--primary:hover {
  background-color: var(--agds-color-brand-hover);
}

.intro__cta--secondary {
  border-color: var(--agds-color-brand);
  color: var(--agds-color-brand);
}

.intro__cta--secondary:hover {
  background-color: var(--agds-color-brand-muted);
}

.intro__cta:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.intro__features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--agds-space-4);
}

.feature {
  padding: var(--agds-space-5);
  border: 1px solid var(--agds-color-border);
  border-top: 3px solid var(--agds-color-brand);
  border-radius: var(--agds-radius-md);
}

.feature__title {
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-semibold);
  margin: 0 0 var(--agds-space-2);
  color: var(--agds-color-text);
}

.feature__body {
  margin: 0;
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
}

.feature__body code {
  font-family: var(--agds-font-family-mono);
  font-size: 0.875em;
  background: var(--agds-color-bg-subtle);
  padding: 0.1em 0.3em;
  border-radius: var(--agds-radius-sm);
}

.feature__body a {
  color: var(--agds-color-brand);
}
</style>

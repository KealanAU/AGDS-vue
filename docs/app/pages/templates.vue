<script setup lang="ts">
useSeoMeta({
  title: 'Templates — AGDS-vue',
  description: 'Full-page templates for Australian government digital services. Coming soon.',
})
</script>

<template>
  <DocsLayout>
    <div class="coming-soon">
      <div class="coming-soon__badge">Coming soon</div>
      <h1 class="coming-soon__title">Templates</h1>
      <p class="coming-soon__body">
        Templates are full-page layouts for common government service page types — landing pages,
        form pages, confirmation pages, search results, and more.
      </p>
      <p class="coming-soon__body">
        Templates will be added after patterns are complete. Track progress in
        <a href="https://github.com/your-org/AGDS-vue" target="_blank" rel="noopener"
          >the repository</a
        >.
      </p>
      <NuxtLink to="/components" class="coming-soon__link">Browse components instead</NuxtLink>
    </div>
  </DocsLayout>
</template>

<style scoped>
@import '../styles/prose.css';
.coming-soon {
  max-width: 40rem;
}
.coming-soon__badge {
  display: inline-block;
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--agds-color-warning);
  background-color: var(--agds-color-warning-muted);
  padding: var(--agds-space-1) var(--agds-space-3);
  border-radius: var(--agds-radius-full);
  margin-bottom: var(--agds-space-4);
}
.coming-soon__title {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-6);
  color: var(--agds-color-text);
}
.coming-soon__body {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
  margin: 0 0 var(--agds-space-4);
}
.coming-soon__body a {
  color: var(--agds-color-brand);
}
.coming-soon__link {
  display: inline-flex;
  margin-top: var(--agds-space-4);
  padding: var(--agds-space-3) var(--agds-space-6);
  background-color: var(--agds-color-brand);
  color: var(--agds-color-text-inverse);
  border-radius: var(--agds-radius-md);
  text-decoration: none;
  font-weight: var(--agds-font-weight-semibold);
  transition: background-color var(--agds-transition-fast);
}
.coming-soon__link:hover {
  background-color: var(--agds-color-brand-hover);
}
.coming-soon__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}
</style>

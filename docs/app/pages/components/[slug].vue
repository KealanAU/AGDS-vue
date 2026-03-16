<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)

const { data: page } = await useAsyncData(slug.value, () =>
  queryCollection('components').path(`/components/${slug.value}`).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, message: 'Component not found' })
}

useSeoMeta({
  title: () => `${page.value?.title ?? slug.value} — AGDS-vue`,
  description: () => page.value?.description ?? '',
})

// Nuxt Content provides TOC as page.body.toc.links
const tocLinks = computed(() => page.value?.body?.toc?.links ?? [])
</script>

<template>
  <DocsLayout>
    <div class="comp-page">
      <!-- Page header -->
      <div class="comp-page__header">
        <div class="comp-page__header-meta">
          <span class="comp-page__category">{{ page?.category ?? 'Component' }}</span>
          <span
            v-if="page?.status"
            class="comp-page__status"
            :class="`comp-page__status--${page.status}`"
          >
            {{ page.status }}
          </span>
        </div>
        <h1 class="comp-page__title">{{ page?.title }}</h1>
        <p v-if="page?.description" class="comp-page__desc">{{ page.description }}</p>
      </div>

      <!-- Two-column: content + on-this-page -->
      <div class="comp-page__body">
        <div class="comp-page__content">
          <ContentRenderer v-if="page" :value="page" />
        </div>

        <!-- On this page -->
        <aside v-if="tocLinks.length" class="comp-page__toc" aria-label="On this page">
          <p class="comp-page__toc-title">On this page</p>
          <ul class="comp-page__toc-list" role="list">
            <li v-for="link in tocLinks" :key="link.id" class="comp-page__toc-item">
              <a :href="`#${link.id}`" class="comp-page__toc-link">{{ link.text }}</a>
              <ul v-if="link.children?.length" class="comp-page__toc-sub" role="list">
                <li v-for="child in link.children" :key="child.id">
                  <a :href="`#${child.id}`" class="comp-page__toc-link comp-page__toc-link--sub">
                    {{ child.text }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
.comp-page {
  max-width: 100%;
}

/* ── Header ──────────────────────────────────────────────── */

.comp-page__header {
  margin-bottom: var(--agds-space-8);
  padding-bottom: var(--agds-space-6);
  border-bottom: 1px solid var(--agds-color-border);
}

.comp-page__header-meta {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  margin-bottom: var(--agds-space-3);
}

.comp-page__category {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--agds-color-brand);
  background-color: var(--agds-color-brand-muted);
  padding: 0.2em 0.6em;
  border-radius: var(--agds-radius-full);
}

.comp-page__status {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-medium);
  padding: 0.2em 0.6em;
  border-radius: var(--agds-radius-full);
}

.comp-page__status--stable {
  background-color: var(--agds-color-success-muted);
  color: var(--agds-color-success);
}

.comp-page__status--beta {
  background-color: var(--agds-color-warning-muted);
  color: var(--agds-color-warning);
}

.comp-page__title {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-3);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-tight);
}

.comp-page__desc {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
  margin: 0;
  max-width: 44rem;
}

/* ── Body: content + TOC ─────────────────────────────────── */

.comp-page__body {
  display: grid;
  grid-template-columns: 1fr 13rem;
  gap: var(--agds-space-12);
  align-items: start;
}

.comp-page__content {
  min-width: 0;
}

/* ── TOC ─────────────────────────────────────────────────── */

.comp-page__toc {
  position: sticky;
  top: var(--agds-space-8);
}

.comp-page__toc-title {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--agds-color-text-muted);
  margin: 0 0 var(--agds-space-3);
}

.comp-page__toc-list,
.comp-page__toc-sub {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.comp-page__toc-sub {
  margin-top: var(--agds-space-1);
  padding-left: var(--agds-space-3);
}

.comp-page__toc-link {
  display: block;
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  text-decoration: none;
  padding: var(--agds-space-1) 0;
  transition: color var(--agds-transition-fast);
  line-height: var(--agds-line-height-snug);
}

.comp-page__toc-link--sub {
  font-size: var(--agds-font-size-xs);
}

.comp-page__toc-link:hover {
  color: var(--agds-color-brand);
}

.comp-page__toc-link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

@media (max-width: 1100px) {
  .comp-page__body {
    grid-template-columns: 1fr;
  }

  .comp-page__toc {
    display: none;
  }
}
</style>

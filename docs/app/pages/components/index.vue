<script setup lang="ts">
useSeoMeta({
  title: 'Components — AGDS-vue',
  description: 'All 86 components in the AGDS-vue library, grouped by category.',
})

// Fetch all component doc pages. Status and slug come from the content files,
// so adding a new doc page is the only thing needed to mark a component stable.
const { data: docs } = await useAsyncData('component-docs', () =>
  queryCollection('components').all(),
)

// Build a lookup: lowercased title → { slug, status }
const docLookup = computed(() => {
  const map = new Map<string, { slug: string; status: string }>()
  for (const doc of docs.value ?? []) {
    const slug = (doc.path as string).replace('/components/', '')
    map.set((doc.title as string).toLowerCase(), {
      slug,
      status: (doc.status as string) ?? 'stable',
    })
  }
  return map
})

function docFor(name: string) {
  return docLookup.value.get(name.toLowerCase()) ?? null
}

// Registry: only names and priorities live here.
// Status and slug are derived automatically from content files above.
const categories = [
  {
    name: 'Content',
    components: [
      { name: 'Accordion', priority: 'P2' },
      { name: 'Avatar', priority: 'P3' },
      { name: 'Callout', priority: 'P1' },
      { name: 'Card', priority: 'P1' },
      { name: 'Details', priority: 'P2' },
      { name: 'Divider', priority: 'P2' },
      { name: 'Feature link list', priority: 'P2' },
      { name: 'Heading', priority: 'P1' },
      { name: 'Hero banner', priority: 'P2' },
      { name: 'Icon', priority: 'P1' },
      { name: 'Link list', priority: 'P2' },
      { name: 'List', priority: 'P1' },
      { name: 'Page alert', priority: 'P1' },
      { name: 'Prose', priority: 'P2' },
      { name: 'Section alert', priority: 'P1' },
      { name: 'Skip link', priority: 'P1' },
      { name: 'Status badge', priority: 'P2' },
      { name: 'Summary list', priority: 'P2' },
      { name: 'Table', priority: 'P1' },
      { name: 'Tags', priority: 'P2' },
      { name: 'Task list', priority: 'P2' },
      { name: 'Text', priority: 'P1' },
      { name: 'Text link', priority: 'P1' },
    ],
  },
  {
    name: 'Forms',
    components: [
      { name: 'Autocomplete', priority: 'P2' },
      { name: 'Checkbox', priority: 'P1' },
      { name: 'Combobox', priority: 'P2' },
      { name: 'Combobox async multi', priority: 'P2' },
      { name: 'Conditional field container', priority: 'P2' },
      { name: 'Control group', priority: 'P2' },
      { name: 'Date picker', priority: 'P2' },
      { name: 'Field', priority: 'P1' },
      { name: 'Fieldset', priority: 'P1' },
      { name: 'File input', priority: 'P2' },
      { name: 'File upload', priority: 'P2' },
      { name: 'Grouped fields', priority: 'P2' },
      { name: 'Password input', priority: 'P2' },
      { name: 'Radio', priority: 'P1' },
      { name: 'Search box', priority: 'P1' },
      { name: 'Search input', priority: 'P1' },
      { name: 'Select', priority: 'P1' },
      { name: 'Switch', priority: 'P2' },
      { name: 'Text input', priority: 'P1' },
      { name: 'Textarea', priority: 'P1' },
      { name: 'Time input', priority: 'P3' },
      { name: 'Time picker', priority: 'P3' },
      { name: 'Toggle button', priority: 'P2' },
    ],
  },
  {
    name: 'Foundations',
    components: [
      { name: 'A11y', priority: 'P1' },
      { name: 'Box', priority: 'P1' },
      { name: 'Columns', priority: 'P1' },
      { name: 'Core', priority: 'P1' },
      { name: 'Flex', priority: 'P1' },
      { name: 'Stack', priority: 'P1' },
    ],
  },
  {
    name: 'Layout',
    components: [
      { name: 'App layout', priority: 'P1' },
      { name: 'Breadcrumbs', priority: 'P1' },
      { name: 'Call to action', priority: 'P2' },
      { name: 'Content', priority: 'P1' },
      { name: 'Collapsing side bar', priority: 'P2' },
      { name: 'Drawer', priority: 'P2' },
      { name: 'Filter sidebar', priority: 'P2' },
      { name: 'Footer', priority: 'P1' },
      { name: 'Form stack', priority: 'P1' },
      { name: 'Global alert', priority: 'P1' },
      { name: 'Header', priority: 'P1' },
      { name: 'Inpage nav', priority: 'P2' },
      { name: 'Loading', priority: 'P1' },
      { name: 'Main nav', priority: 'P1' },
      { name: 'Modal', priority: 'P1' },
      { name: 'Notification badge', priority: 'P2' },
      { name: 'Pagination', priority: 'P1' },
      { name: 'Progress indicator', priority: 'P2' },
      { name: 'Side nav', priority: 'P2' },
      { name: 'Sub nav', priority: 'P2' },
      { name: 'Tabs', priority: 'P1' },
    ],
  },
  {
    name: 'Navigation',
    components: [
      { name: 'Breadcrumbs', priority: 'P1' },
      { name: 'Button', priority: 'P1' },
      { name: 'Direction link', priority: 'P2' },
      { name: 'Dropdown menu', priority: 'P2' },
      { name: 'Inpage nav', priority: 'P2' },
      { name: 'Main nav', priority: 'P1' },
      { name: 'Pagination', priority: 'P1' },
      { name: 'Side nav', priority: 'P2' },
      { name: 'Sub nav', priority: 'P2' },
      { name: 'Tabs', priority: 'P1' },
    ],
  },
]

const search = ref('')
const activeCategory = ref<string | null>(null)

const filteredCategories = computed(() =>
  categories
    .filter((cat) => !activeCategory.value || cat.name === activeCategory.value)
    .map((cat) => ({
      ...cat,
      components: cat.components.filter((c) =>
        c.name.toLowerCase().includes(search.value.toLowerCase()),
      ),
    }))
    .filter((cat) => cat.components.length > 0),
)

const totalComplete = computed(
  () => categories.flatMap((c) => c.components).filter((c) => docFor(c.name)).length,
)

const totalComponents = computed(() => categories.flatMap((c) => c.components).length)

const allCategories = categories.map((c) => c.name)
</script>

<template>
  <DocsLayout>
    <div class="components-page">
      <div class="components-page__header">
        <h1 class="components-page__title">Components</h1>
        <p class="components-page__meta">{{ totalComplete }} / {{ totalComponents }} built</p>
      </div>

      <div class="components-page__toolbar">
        <div class="components-page__search">
          <label for="component-search" class="sr-only">Search components</label>
          <input
            id="component-search"
            v-model="search"
            type="search"
            placeholder="Search components…"
            class="components-page__search-input"
          />
        </div>
        <div class="components-page__filters" role="group" aria-label="Filter by category">
          <button
            class="components-page__filter-btn"
            :class="{ 'components-page__filter-btn--active': activeCategory === null }"
            @click="activeCategory = null"
          >
            All
          </button>
          <button
            v-for="cat in allCategories"
            :key="cat"
            class="components-page__filter-btn"
            :class="{ 'components-page__filter-btn--active': activeCategory === cat }"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>
      </div>

      <div v-if="filteredCategories.length === 0" class="components-page__empty">
        No components match "<strong>{{ search }}</strong
        >".
      </div>

      <div v-for="cat in filteredCategories" :key="cat.name" class="component-category">
        <h2 class="component-category__title">{{ cat.name }}</h2>
        <div class="component-grid">
          <NuxtLink
            v-for="comp in cat.components"
            :key="comp.name"
            :to="docFor(comp.name) ? `/components/${docFor(comp.name)!.slug}` : undefined"
            :class="[
              'component-card',
              docFor(comp.name) ? 'component-card--linked' : 'component-card--planned',
            ]"
            :aria-disabled="!docFor(comp.name) ? 'true' : undefined"
            :tabindex="docFor(comp.name) ? undefined : -1"
          >
            <div class="component-card__header">
              <span class="component-card__name">{{ comp.name }}</span>
              <span
                class="component-card__status"
                :class="`component-card__status--${docFor(comp.name) ? 'stable' : 'planned'}`"
              >
                {{ docFor(comp.name) ? 'Stable' : 'Planned' }}
              </span>
            </div>
            <span class="component-card__priority">{{ comp.priority }}</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
.components-page__header {
  display: flex;
  align-items: baseline;
  gap: var(--agds-space-4);
  margin-bottom: var(--agds-space-6);
  border-bottom: 3px solid var(--agds-color-brand);
  padding-bottom: var(--agds-space-4);
}

.components-page__title {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
  color: var(--agds-color-text);
}

.components-page__meta {
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  margin: 0;
  font-family: var(--agds-font-family-mono);
}

.components-page__toolbar {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-4);
  margin-bottom: var(--agds-space-8);
}

.components-page__search-input {
  width: 100%;
  max-width: 28rem;
  height: 2.5rem;
  padding-inline: var(--agds-space-3);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  font-size: var(--agds-font-size-sm);
  font-family: var(--agds-font-family-body);
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg);
}

.components-page__search-input:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-color: var(--agds-color-brand);
}

.components-page__filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--agds-space-2);
}

.components-page__filter-btn {
  padding: var(--agds-space-1) var(--agds-space-3);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-full);
  background-color: var(--agds-color-bg);
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-sm);
  font-family: var(--agds-font-family-body);
  cursor: pointer;
  transition:
    background-color var(--agds-transition-fast),
    border-color var(--agds-transition-fast);
}

.components-page__filter-btn:hover {
  background-color: var(--agds-color-bg-subtle);
  border-color: var(--agds-color-brand);
}

.components-page__filter-btn--active {
  background-color: var(--agds-color-brand);
  border-color: var(--agds-color-brand);
  color: var(--agds-color-text-inverse);
}

.components-page__filter-btn:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.components-page__empty {
  padding: var(--agds-space-12);
  text-align: center;
  color: var(--agds-color-text-muted);
}

.component-category {
  margin-bottom: var(--agds-space-10);
}

.component-category__title {
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-semibold);
  color: var(--agds-color-text-muted);
  margin: 0 0 var(--agds-space-4);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: var(--agds-font-size-xs);
}

.component-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: var(--agds-space-3);
}

.component-card {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
  padding: var(--agds-space-4);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  text-decoration: none;
  transition:
    border-color var(--agds-transition-fast),
    box-shadow var(--agds-transition-fast);
}

.component-card--linked {
  cursor: pointer;
  color: inherit;
}

.component-card--linked:hover {
  border-color: var(--agds-color-brand);
  box-shadow: var(--agds-shadow-sm);
}

.component-card--linked:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.component-card--planned {
  cursor: default;
  opacity: 0.6;
  color: inherit;
}

.component-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--agds-space-2);
}

.component-card__name {
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-snug);
}

.component-card__status {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-medium);
  padding: 0.1em 0.5em;
  border-radius: var(--agds-radius-full);
  flex-shrink: 0;
}

.component-card__status--stable {
  background-color: var(--agds-color-success-muted);
  color: var(--agds-color-success);
}

.component-card__status--planned {
  background-color: var(--agds-color-bg-muted);
  color: var(--agds-color-text-muted);
}

.component-card__priority {
  font-size: var(--agds-font-size-xs);
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

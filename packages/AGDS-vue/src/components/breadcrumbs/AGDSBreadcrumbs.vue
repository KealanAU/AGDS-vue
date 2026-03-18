<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import AGDSBreadcrumbsItem from './AGDSBreadcrumbsItem.vue'
import AGDSBreadcrumbsToggle from './AGDSBreadcrumbsToggle.vue'

export interface BreadcrumbLink {
  /** URL the breadcrumb navigates to */
  href?: string
  /** Visible text label */
  label: string
}

export interface AGDSBreadcrumbsProps {
  /** Describes the navigation landmark to assistive technologies */
  ariaLabel?: string
  /** The list of breadcrumb links. Minimum of 2 required. */
  links: BreadcrumbLink[]
}

const props = withDefaults(defineProps<AGDSBreadcrumbsProps>(), {
  ariaLabel: 'Breadcrumbs',
})

const firstLink = computed(() => props.links[0])
const lastLink = computed(() => props.links[props.links.length - 1])
const middleLinks = computed(() =>
  props.links.filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1),
)

const hasMiddle = computed(() => middleLinks.value.length > 0)

// Tracks whether the user has manually expanded on mobile.
// On desktop the toggle is always CSS-hidden so this only matters for small viewports.
const isExpanded = ref(false)

const firstItemRef = ref<InstanceType<typeof AGDSBreadcrumbsItem> | null>(null)

async function expand() {
  isExpanded.value = true
  await nextTick()
  firstItemRef.value?.focus()
}
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    class="agds-breadcrumbs"
    :class="{ 'agds-breadcrumbs--collapsed': hasMiddle && !isExpanded }"
  >
    <ol class="agds-breadcrumbs__list">
      <AGDSBreadcrumbsItem
        ref="firstItemRef"
        :href="firstLink.href"
        :label="firstLink.label"
      />

      <!-- Toggle — always in the DOM when there are middle links so CSS can show/hide per breakpoint -->
      <AGDSBreadcrumbsToggle
        v-if="hasMiddle"
        class="agds-breadcrumbs__toggle-item"
        @click="expand"
      />

      <!-- Middle items — always in DOM, CSS hides them on small screens when collapsed -->
      <AGDSBreadcrumbsItem
        v-for="(link, idx) in middleLinks"
        :key="idx"
        :href="link.href"
        :label="link.label"
        class="agds-breadcrumbs__middle-item"
      />

      <AGDSBreadcrumbsItem
        v-if="props.links.length > 1"
        :href="lastLink.href"
        :label="lastLink.label"
        :current="true"
      />
    </ol>
  </nav>
</template>

<style scoped>
.agds-breadcrumbs {
  font-family: var(--agds-font-family-body);
}

.agds-breadcrumbs__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
  Toggle button item:
  - Hidden by default (desktop-first: all items always visible on ≥768px)
  - Only visible on small screens when the list is in a collapsed state
*/
.agds-breadcrumbs__toggle-item {
  display: none;
}

@media (max-width: 767px) {
  .agds-breadcrumbs--collapsed .agds-breadcrumbs__toggle-item {
    display: flex;
  }

  .agds-breadcrumbs--collapsed .agds-breadcrumbs__middle-item {
    display: none;
  }
}
</style>

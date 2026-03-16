<script setup lang="ts">
import { ref, computed } from 'vue'
import SideNavLinkList from './SideNavLinkList.vue'
import { findBestMatch } from './utils'
import type { SideNavItem } from './utils'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as SideNavBackground }
export type SideNavSubLevelVisible = 'always' | 'whenActive'

export interface AgDSSideNavProps {
  /** The path of the currently active page, used to highlight the matching link. */
  activePath: string
  /** Set to 'bodyAlt' when the nav sits on a bodyAlt background. */
  background?: BackgroundVariant
  /** The list of navigation links. Items may contain nested `items` arrays. */
  items: SideNavItem[]
  /** Heading text placed at the top of the link list. */
  title: string
  /** Controls when nested navigation items are revealed. */
  subLevelVisible?: SideNavSubLevelVisible
  /** When provided, the title is rendered as an anchor pointing to this URL. */
  titleLink?: string
}

const props = withDefaults(defineProps<AgDSSideNavProps>(), {
  background: 'body',
  subLevelVisible: 'whenActive',
})

/** Best-matching href from the item tree for the current activePath. */
const bestMatch = computed(() => findBestMatch(props.items, props.activePath))

/** Mobile-only collapse state */
const isExpanded = ref(false)

function toggle() {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <nav
    class="agds-side-nav"
    :class="[
      `agds-side-nav--bg-${props.background}`,
      { 'agds-side-nav--expanded': isExpanded },
    ]"
  >
    <!-- Mobile toggle button (hidden on desktop via CSS) -->
    <button
      type="button"
      class="agds-side-nav__toggle"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      <span class="agds-side-nav__toggle-label">{{ props.title }}</span>
      <svg
        class="agds-side-nav__toggle-chevron"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Nav body: hidden on mobile unless expanded; always visible on desktop -->
    <div class="agds-side-nav__body">
      <!-- Title -->
      <div class="agds-side-nav__title-wrap">
        <component
          :is="props.titleLink ? 'a' : 'span'"
          :href="props.titleLink || undefined"
          :aria-current="
            props.titleLink && props.activePath === props.titleLink ? 'page' : undefined
          "
          class="agds-side-nav__title"
          :class="{ 'agds-side-nav__title--link': !!props.titleLink }"
        >
          {{ props.title }}
        </component>
      </div>

      <!-- Link list -->
      <SideNavLinkList
        :items="props.items"
        :active-path="bestMatch"
        :sub-level-visible="props.subLevelVisible"
        :depth="1"
      />
    </div>
  </nav>
</template>

<style scoped>
/* ── Root ────────────────────────────────────────────────── */
.agds-side-nav {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
}

/* Background variants */
.agds-side-nav--bg-body {
  background-color: var(--agds-color-bg);
}

.agds-side-nav--bg-bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Mobile toggle ───────────────────────────────────────── */
.agds-side-nav__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-2);
  width: 100%;
  padding: var(--agds-space-4);

  background: none;
  border: none;
  border-bottom: var(--agds-border-width-md) solid var(--agds-color-border);
  cursor: pointer;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  text-align: left;
}

.agds-side-nav__toggle:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-side-nav__toggle-chevron {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  transition: transform 200ms ease;
}

.agds-side-nav--expanded .agds-side-nav__toggle-chevron {
  transform: rotate(180deg);
}

/* ── Nav body ────────────────────────────────────────────── */
.agds-side-nav__body {
  display: none;
}

.agds-side-nav--expanded .agds-side-nav__body {
  display: block;
}

/* Desktop: always show body, hide mobile toggle */
@media (min-width: 768px) {
  .agds-side-nav__toggle {
    display: none;
  }

  .agds-side-nav__body {
    display: block;
  }
}

/* ── Title ───────────────────────────────────────────────── */
.agds-side-nav__title-wrap {
  border-bottom: var(--agds-border-width-md) solid var(--agds-color-border);
}

.agds-side-nav__title {
  display: block;
  padding: var(--agds-space-4);
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-snug);
  text-decoration: none;
}

.agds-side-nav__title--link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
  background-color: var(--agds-color-bg-subtle);
}

.agds-side-nav__title--link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-side-nav__title--link[aria-current='page'] {
  background-color: var(--agds-color-bg-subtle);
}
</style>

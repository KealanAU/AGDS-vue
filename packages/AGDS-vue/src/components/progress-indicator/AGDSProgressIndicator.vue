<script lang="ts">
import type { BackgroundVariant } from '../../core'

/**
 * Completion state of a single step in the progress indicator.
 *
 * - `'blocked'` — Cannot be started; a prerequisite step must be completed first.
 * - `'todo'` — Not yet started.
 * - `'doing'` — Currently active / in progress (also used as the legacy auto-active marker).
 * - `'started'` — User has begun this step but has not finished it.
 * - `'saved'` — Step data has been saved as a draft but not yet submitted.
 * - `'done'` — Step completed successfully.
 * - `'error'` — Step was completed but validation failed; user action required.
 */
export type ProgressIndicatorItemStatus =
  | 'blocked'
  | 'doing'
  | 'started'
  | 'todo'
  | 'done'
  | 'saved'
  | 'error'

export type { BackgroundVariant as ProgressIndicatorBackground }

export interface ProgressIndicatorLevelTwoItem {
  label: string
  href: string
}

export interface ProgressIndicatorItem {
  label: string
  status: ProgressIndicatorItemStatus
  /** When set, renders the item as an `<a>` link. */
  href?: string
  /** Click handler used when the item is rendered as a `<button>`. */
  onClick?: (event: MouseEvent) => void
  /**
   * @deprecated Pass `activePath` to the parent `<AGDSProgressIndicator>`
   * instead. Legacy support only.
   */
  isActive?: boolean
  /** Level-2 sub-items. Only available for link items (`href` required). */
  items?: ProgressIndicatorLevelTwoItem[]
}

export interface AGDSProgressIndicatorProps {
  /**
   * Highlights the matching item. Should match the active item's `href`
   * (or `label` when no `href` is present).
   */
  activePath?: string
  /** Set to `'bodyAlt'` when the component sits on an alternate background. */
  background?: BackgroundVariant
  /** When `true`, the completion subtitle is not rendered. */
  hideSubtitle?: boolean
  /** The list of steps to display. */
  items: ProgressIndicatorItem[]
}
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import AGDSProgressIndicatorItem from './AGDSProgressIndicatorItem.vue'
import type { ProcessedProgressIndicatorItem } from './AGDSProgressIndicatorItem.vue'

defineOptions({ name: 'AGDSProgressIndicator' })

const props = withDefaults(defineProps<AGDSProgressIndicatorProps>(), {
  background: 'body',
  hideSubtitle: false,
})

/** Mobile collapse state — open by default */
const isExpanded = ref(true)

function toggle() {
  isExpanded.value = !isExpanded.value
}

const subtitle = computed(() => {
  if (props.hideSubtitle) return undefined
  const doneCount = props.items.filter(i => i.status === 'done').length
  return `${doneCount} of ${props.items.length} steps completed`
})

/** Resolve `isActive` for each item based on `activePath` or legacy `isActive` props. */
const processedItems = computed((): ProcessedProgressIndicatorItem[] => {
  const hasExplicitActive = props.items.some(i => i.isActive)

  return props.items.map(item => {
    let isActive: boolean

    if (hasExplicitActive) {
      // Legacy: consumer set isActive directly
      isActive = !!item.isActive
    } else if (props.activePath !== undefined) {
      const matcher = item.href ?? item.label
      const withTrailingSlash = matcher.endsWith('/') ? matcher : `${matcher}/`
      const hasActiveSubStep = !!props.activePath.split(withTrailingSlash)[1]?.length
      isActive = props.activePath === matcher || hasActiveSubStep
    } else {
      // Oldest legacy: 'doing' status auto-activates
      isActive = item.status === 'doing'
    }

    const levelTwoItems = item.items?.map(l2 => ({
      ...l2,
      isActive: l2.href === props.activePath,
    }))

    return { ...item, isActive, items: levelTwoItems }
  })
})
</script>

<template>
  <nav
    class="agds-progress-indicator"
    :class="[
      `agds-progress-indicator--bg-${background}`,
      { 'agds-progress-indicator--expanded': isExpanded },
    ]"
    aria-label="Progress"
  >
    <!-- Toggle button — visible only on mobile -->
    <button
      type="button"
      class="agds-progress-indicator__toggle"
      :aria-expanded="isExpanded"
      @click="toggle"
    >
      <span class="agds-progress-indicator__toggle-text">
        <span class="agds-progress-indicator__title">Progress</span>
        <span v-if="subtitle" class="agds-progress-indicator__subtitle">{{ subtitle }}</span>
      </span>
      <svg
        class="agds-progress-indicator__chevron"
        :class="{ 'agds-progress-indicator__chevron--open': isExpanded }"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>

    <!-- Step list -->
    <div class="agds-progress-indicator__body">
      <ul class="agds-progress-indicator__list">
        <AGDSProgressIndicatorItem
          v-for="(item, index) in processedItems"
          :key="item.label"
          :item="item"
          :background="background"
          :is-first="index === 0"
          :is-last="index === processedItems.length - 1"
        />
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* ── Container ─────────────────────────────────────────── */
.agds-progress-indicator {
  font-family: var(--agds-font-family-body);
  color: var(--agds-color-text);
}

.agds-progress-indicator--bg-body    { background-color: var(--agds-color-bg); }
.agds-progress-indicator--bg-bodyAlt { background-color: var(--agds-color-bg-subtle); }

/* ── Mobile toggle ─────────────────────────────────────── */
.agds-progress-indicator__toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--agds-space-3) var(--agds-space-4);
  background: none;
  border: none;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
  cursor: pointer;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
  text-align: left;
  gap: var(--agds-space-3);
}

.agds-progress-indicator__toggle:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-progress-indicator__toggle-text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.agds-progress-indicator__title {
  font-weight: var(--agds-font-weight-bold);
  font-size: var(--agds-font-size-md);
}

.agds-progress-indicator__subtitle {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
}

.agds-progress-indicator__chevron {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  transition: transform var(--agds-transition-fast);
}

.agds-progress-indicator__chevron--open {
  transform: rotate(180deg);
}

/* ── Body (collapsible on mobile) ──────────────────────── */
.agds-progress-indicator__body {
  display: none;
}

.agds-progress-indicator--expanded .agds-progress-indicator__body {
  display: block;
}

/* On desktop the list is always visible; hide the toggle */
@media (min-width: 768px) {
  .agds-progress-indicator__toggle {
    display: none;
  }

  .agds-progress-indicator__body {
    display: block;
  }
}

/* ── List ──────────────────────────────────────────────── */
.agds-progress-indicator__list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

@media (max-width: 767px) {
  /* Avoid double border with toggle on mobile */
  .agds-progress-indicator__list {
    border-top: none;
  }
}
</style>

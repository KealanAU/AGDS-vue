<script setup lang="ts">
import { computed } from 'vue'
import { AGDSIcon } from '../icon'
import type { ProgressIndicatorItemStatus, ProgressIndicatorLevelTwoItem as ProgressIndicatorLevelTwoItemBase } from './AGDSProgressIndicator.vue'
import type { BackgroundVariant } from '../../core'

export interface ProgressIndicatorLevelTwoItem extends ProgressIndicatorLevelTwoItemBase {
  isActive: boolean
}

export interface ProcessedProgressIndicatorItem {
  label: string
  status: ProgressIndicatorItemStatus
  href?: string
  onClick?: (event: MouseEvent) => void
  isActive: boolean
  items?: ProgressIndicatorLevelTwoItem[]
}

const STATUS_MAP: Record<
  ProgressIndicatorItemStatus,
  { label: string; icon: string; iconColor: 'border' | 'success' | 'error' }
> = {
  blocked: { label: 'Cannot start yet', icon: 'mdi:lock',                    iconColor: 'border'  },
  doing:   { label: 'In progress',      icon: 'mdi:progress-clock',           iconColor: 'border'  },
  started: { label: 'In progress',      icon: 'mdi:progress-clock',           iconColor: 'border'  },
  todo:    { label: 'Not started',      icon: 'mdi:checkbox-blank-circle-outline', iconColor: 'border' },
  done:    { label: 'Completed',        icon: 'mdi:check-circle',             iconColor: 'success' },
  saved:   { label: 'Saved',            icon: 'mdi:check-circle-outline',     iconColor: 'success' },
  error:   { label: 'Error',            icon: 'mdi:alert-circle',             iconColor: 'error'   },
}

const props = defineProps<{
  item: ProcessedProgressIndicatorItem
  background: BackgroundVariant
  isFirst: boolean
  isLast: boolean
}>()

const statusInfo = computed(() => STATUS_MAP[props.item.status])

const resolvedIconColor = computed(() => {
  const { iconColor } = statusInfo.value
  if (props.item.isActive && iconColor === 'border') return 'var(--agds-color-action-primary)'
  if (iconColor === 'success') return 'var(--agds-color-success)'
  if (iconColor === 'error') return 'var(--agds-color-error)'
  return 'var(--agds-color-border)'
})

const tag = computed(() => props.item.href ? 'a' : 'button')

/** The active level-2 sub-item (if any). */
const activeSubItem = computed(() =>
  props.item.isActive
    ? (props.item.items?.find(i => i.isActive) ?? null)
    : null,
)

/** Items with a sub-list suppress the bottom border on the main content. */
const hasSub = computed(() => !!(props.item.items?.length))
</script>

<template>
  <li
    class="agds-progress-indicator__item"
    :class="[
      `agds-progress-indicator__item--bg-${background}`,
      item.isActive  && 'agds-progress-indicator__item--active',
      isFirst        && 'agds-progress-indicator__item--first',
      isLast         && 'agds-progress-indicator__item--last',
    ]"
  >
    <span class="agds-progress-indicator__grid">
      <!-- ── Icon column (col 1, spans main + sub rows) ── -->
      <span class="agds-progress-indicator__icon-col" aria-hidden="true">
        <span class="agds-progress-indicator__line agds-progress-indicator__line--top" />
        <span
          class="agds-progress-indicator__ring"
          :class="{ 'agds-progress-indicator__ring--active': item.isActive }"
        >
          <AGDSIcon
            :name="statusInfo.icon"
            size="md"
            :color="resolvedIconColor"
            aria-hidden="true"
          />
        </span>
        <span class="agds-progress-indicator__line agds-progress-indicator__line--bottom" />
      </span>

      <!-- ── Main content: link or button (col 2) ── -->
      <component
        :is="tag"
        class="agds-progress-indicator__content"
        :class="{ 'agds-progress-indicator__content--no-sub': !hasSub }"
        v-bind="item.href
          ? { href: item.href }
          : { type: 'button' }"
        :aria-current="item.isActive ? 'step' : undefined"
        @click="item.href ? undefined : item.onClick?.($event as MouseEvent)"
      >
        <span
          class="agds-progress-indicator__label"
          :class="{ 'agds-progress-indicator__label--bold': item.isActive }"
        >{{ item.label }}</span>
        <span class="agds-progress-indicator__status-text">{{ statusInfo.label }}</span>
      </component>

      <!-- ── Level-2 sub-item (rendered in col 1 + col 2 of same grid) ── -->
      <template v-if="activeSubItem">
        <span class="agds-progress-indicator__line agds-progress-indicator__line--sub" aria-hidden="true" />
        <ul class="agds-progress-indicator__sub-list">
          <li class="agds-progress-indicator__sub-item">
            <component
              :is="activeSubItem.href ? 'a' : 'span'"
              class="agds-progress-indicator__sub-link"
              :href="activeSubItem.href || undefined"
              aria-current="step"
            >
              <AGDSIcon
                name="mdi:arrow-right-bottom"
                size="sm"
                color="var(--agds-color-action-primary)"
                aria-hidden="true"
              />
              <span>{{ activeSubItem.label }}</span>
            </component>
          </li>
        </ul>
      </template>
    </span>
  </li>
</template>

<style scoped>
/* ── Grid layout ───────────────────────────────────────── */
.agds-progress-indicator__grid {
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: var(--agds-space-2);
  text-decoration: none;
  width: 100%;
}

/* ── Icon column ───────────────────────────────────────── */
.agds-progress-indicator__icon-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Timeline line segments */
.agds-progress-indicator__line {
  background-color: var(--agds-color-border);
  flex: 1;
  width: var(--agds-progress-indicator-timeline-width);

  @media (forced-colors: active) {
    background-color: GrayText;
  }
}

/* Sub-item line sits in column 1, row 2 */
.agds-progress-indicator__line--sub {
  flex: none;
  height: 100%;
  min-height: 1rem;
  justify-self: center;
  width: var(--agds-progress-indicator-timeline-width);
}

/* Hide top line of the very first item */
.agds-progress-indicator__item--first .agds-progress-indicator__line--top {
  opacity: 0;
}

/* Hide bottom line of the very last item */
.agds-progress-indicator__item--last .agds-progress-indicator__line--bottom,
.agds-progress-indicator__item--last .agds-progress-indicator__line--sub {
  opacity: 0;
}

/* ── Icon ring ─────────────────────────────────────────── */
.agds-progress-indicator__ring {
  position: relative;
  padding: var(--agds-progress-indicator-ring-gap);
  display: flex;
  align-items: center;
  justify-content: center;
}

.agds-progress-indicator__ring--active::before {
  content: '';
  position: absolute;
  inset: calc(-1 * var(--agds-progress-indicator-ring-gap));
  border-radius: 50%;
  border: var(--agds-border-width-md) solid var(--agds-color-action-primary);
  background-color: var(--agds-progress-indicator-bg, var(--agds-color-bg));
  z-index: -1;
}

/* Background variants pass a local var for the ring cutout */
.agds-progress-indicator__item--bg-body    { --agds-progress-indicator-bg: var(--agds-color-bg); }
.agds-progress-indicator__item--bg-bodyAlt { --agds-progress-indicator-bg: var(--agds-color-bg-subtle); }

/* ── Main content (link / button) ──────────────────────── */
.agds-progress-indicator__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.125rem;
  padding: var(--agds-progress-indicator-content-padding-y)
           var(--agds-progress-indicator-content-padding-x);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.agds-progress-indicator__content--no-sub {
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* Remove bottom border from the last item regardless */
.agds-progress-indicator__item--last .agds-progress-indicator__content {
  border-bottom: none;
}

/* Hover states per background */
.agds-progress-indicator__item--bg-body    .agds-progress-indicator__content:hover,
.agds-progress-indicator__item--bg-body    .agds-progress-indicator__sub-link:hover {
  background-color: var(--agds-color-bg-subtle);
}
.agds-progress-indicator__item--bg-bodyAlt .agds-progress-indicator__content:hover,
.agds-progress-indicator__item--bg-bodyAlt .agds-progress-indicator__sub-link:hover {
  background-color: var(--agds-color-bg-muted);
}

/* Underline label text on hover */
.agds-progress-indicator__content:hover .agds-progress-indicator__label {
  text-decoration: underline;
}

/* Focus ring */
.agds-progress-indicator__content:focus-visible,
.agds-progress-indicator__sub-link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Label & status text ───────────────────────────────── */
.agds-progress-indicator__label {
  font-weight: var(--agds-font-weight-normal);
  line-height: var(--agds-line-height-snug);
}

.agds-progress-indicator__label--bold {
  font-weight: var(--agds-font-weight-bold);
}

.agds-progress-indicator__status-text {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-tight);
}

/* ── Level-2 sub-list ──────────────────────────────────── */
.agds-progress-indicator__sub-list {
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

.agds-progress-indicator__item--last .agds-progress-indicator__sub-list {
  border-bottom: none;
}

.agds-progress-indicator__sub-link {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding: var(--agds-space-2) var(--agds-progress-indicator-content-padding-x);
  padding-bottom: var(--agds-progress-indicator-content-padding-y);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  text-decoration: none;
}

.agds-progress-indicator__sub-link:hover {
  text-decoration: underline;
}
</style>

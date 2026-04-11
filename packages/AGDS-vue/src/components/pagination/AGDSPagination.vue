<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { usePagination, separatorAriaLabel } from './usePagination'
import type { PaginationItem } from './usePagination'

export interface AGDSPaginationProps {
  /** Describes the navigation landmark to assistive technologies */
  ariaLabel?: string
  /** The current page number */
  currentPage: number
  /** Function that returns a href for a given page number */
  generateHref: (pageNumber: number) => string
  /** Text describing the range of items shown, e.g. "1 – 10 of 458 items" */
  itemRangeText?: string
  /** Currently selected number of items per page */
  itemsPerPage?: number
  /** Options for the items-per-page select. Defaults to [10, 20, 50, 100] */
  itemsPerPageOptions?: number[]
  /** Total number of pages */
  totalPages: number
  /** Number of page buttons shown in the sliding window. Default 3 */
  windowLimit?: number
}

const props = withDefaults(defineProps<AGDSPaginationProps>(), {
  ariaLabel: 'Pagination',
  windowLimit: 3,
  itemsPerPageOptions: () => [10, 20, 50, 100],
})

const emit = defineEmits<{
  /** Emitted when the user changes the items-per-page select. Update your page size and reset to page 1. */
  itemsPerPageChange: [itemsPerPage: number]
}>()

const uid = getCurrentInstance()?.uid ?? 0
const perPageId = `agds-pagination-per-page-${uid}`

const items = computed<PaginationItem[]>(() =>
  usePagination({
    currentPage: props.currentPage,
    totalPages: props.totalPages,
    windowLimit: props.windowLimit,
  }),
)

const showPerPage = computed(
  () => props.itemsPerPage !== undefined,
)

const hasSecondary = computed(
  () => Boolean(props.itemRangeText) || showPerPage.value,
)

function itemKey(item: PaginationItem, index: number): string {
  if (item.type === 'direction') return item.direction
  if (item.type === 'page') return `page-${item.pageNumber}`
  return `separator-${index}`
}

function getSeparatorLabel(index: number): string {
  return separatorAriaLabel(items.value, index, true)
}

function onPerPageChange(event: Event) {
  const value = Number((event.target as HTMLSelectElement).value)
  emit('itemsPerPageChange', value)
}
</script>

<template>
  <div
    class="agds-pagination"
    :class="{ 'agds-pagination--has-secondary': hasSecondary }"
  >
    <nav :aria-label="ariaLabel" class="agds-pagination__nav">
      <ol class="agds-pagination__list">
        <template v-for="(item, index) in items" :key="itemKey(item, index)">
          <!-- Direction: Previous / Next -->
          <li
            v-if="item.type === 'direction'"
            :class="[
              'agds-pagination__item',
              `agds-pagination__item--${item.direction}`,
            ]"
          >
            <a
              :href="generateHref(item.pageNumber)"
              :aria-label="item.direction === 'left' ? 'Go to previous page' : 'Go to next page'"
              class="agds-pagination__direction"
            >
              <svg
                v-if="item.direction === 'left'"
                class="agds-pagination__arrow"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span class="agds-pagination__direction-label">
                {{ item.direction === 'left' ? 'Previous' : 'Next' }}
              </span>
              <svg
                v-if="item.direction === 'right'"
                class="agds-pagination__arrow"
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </li>

          <!-- Page number -->
          <li v-else-if="item.type === 'page'" class="agds-pagination__item">
            <a
              :href="generateHref(item.pageNumber)"
              :aria-label="`Go to page ${item.pageNumber}`"
              :aria-current="item.isActive ? 'page' : undefined"
              :class="[
                'agds-pagination__page',
                { 'agds-pagination__page--active': item.isActive },
              ]"
            >
              {{ item.pageNumber }}
            </a>
          </li>

          <!-- Separator -->
          <li
            v-else-if="item.type === 'separator'"
            class="agds-pagination__item agds-pagination__separator"
            :aria-label="getSeparatorLabel(index)"
          >
            <span aria-hidden="true" class="agds-pagination__ellipsis">…</span>
          </li>
        </template>
      </ol>
    </nav>

    <!-- Secondary controls: item range text + items per page -->
    <div v-if="hasSecondary" class="agds-pagination__secondary">
      <p v-if="itemRangeText" role="status" class="agds-pagination__range">
        {{ itemRangeText }}
      </p>
      <div v-if="showPerPage" class="agds-pagination__per-page">
        <label :for="perPageId" class="agds-pagination__per-page-label">
          Items per page
        </label>
        <div class="agds-pagination__select-wrap">
          <select
            :id="perPageId"
            :value="itemsPerPage"
            class="agds-pagination__select"
            @change="onPerPageChange"
          >
            <option
              v-for="opt in itemsPerPageOptions"
              :key="opt"
              :value="opt"
            >
              {{ opt }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────── */

.agds-pagination {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--agds-space-4);
  font-family: var(--agds-font-family-body);
}

@media (min-width: 64rem) {
  .agds-pagination--has-secondary {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

/* ── List ────────────────────────────────────────────────── */

.agds-pagination__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--agds-space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Direction items (prev / next) ───────────────────────── */

.agds-pagination__item--left {
  margin-inline-end: var(--agds-space-1);
}

.agds-pagination__item--right {
  margin-inline-start: var(--agds-space-1);
}

.agds-pagination__direction {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-1);
  height: 2.75rem; /* 44px — minimum touch target */
  padding-inline: var(--agds-space-2);
  color: var(--agds-color-action-primary);
  text-decoration: none;
  font-weight: var(--agds-font-weight-normal);
  border-radius: var(--agds-border-radius, 0.25rem);
  transition: color var(--agds-transition-fast, 150ms ease);
  white-space: nowrap;
}

@media (min-width: 48rem) {
  .agds-pagination__direction {
    height: 3rem; /* 48px */
  }
}

.agds-pagination__direction:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-pagination__direction:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-pagination__arrow {
  flex-shrink: 0;
  transition: transform var(--agds-transition-fast, 150ms ease);
}

.agds-pagination__direction:hover .agds-pagination__arrow {
  transform: scale(1.15);
}

/* Hide label text on xs, show on sm+ */
.agds-pagination__direction-label {
  display: none;
}

@media (min-width: 48rem) {
  .agds-pagination__direction-label {
    display: inline;
  }
}

/* ── Page items ──────────────────────────────────────────── */

.agds-pagination__page {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: var(--agds-border-radius, 0.25rem);
  color: var(--agds-color-action-primary);
  text-decoration: none;
  font-weight: var(--agds-font-weight-normal);
  transition: background-color var(--agds-transition-fast, 150ms ease);
}

@media (min-width: 48rem) {
  .agds-pagination__page {
    width: 3rem;
    height: 3rem;
  }
}

.agds-pagination__page:hover {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-hover);
}

.agds-pagination__page:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-pagination__page--active {
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold, 700);
  text-decoration: none;
  cursor: default;
  pointer-events: none;
}

/* ── Separator ───────────────────────────────────────────── */

.agds-pagination__separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
}

@media (min-width: 48rem) {
  .agds-pagination__separator {
    width: 3rem;
    height: 3rem;
  }
}

.agds-pagination__ellipsis {
  color: var(--agds-color-text-muted);
}

/* ── Secondary controls ──────────────────────────────────── */

.agds-pagination__secondary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--agds-space-2);
}

@media (min-width: 64rem) {
  .agds-pagination__secondary {
    flex-direction: row;
    gap: var(--agds-space-4);
  }
}

.agds-pagination__range {
  margin: 0;
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

/* ── Items per page select ───────────────────────────────── */

.agds-pagination__per-page {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
}

.agds-pagination__per-page-label {
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold, 700);
  white-space: nowrap;
  color: var(--agds-color-text);
}

.agds-pagination__select-wrap {
  position: relative;
}

.agds-pagination__select {
  appearance: none;
  -webkit-appearance: none;
  padding-block: var(--agds-space-1);
  padding-inline-start: var(--agds-space-2);
  padding-inline-end: var(--agds-space-6, 1.5rem);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-md) solid var(--agds-color-border);
  border-radius: var(--agds-border-radius, 0.25rem);
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2300698f' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right var(--agds-space-2) center;
  background-size: 1rem;
}

.agds-pagination__select:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-color: var(--agds-color-focus);
}
</style>

<script setup lang="ts">
/**
 * Internal recursive component — not exported from the public API.
 * Renders a single nav item (link, button, or text) and its sub-items.
 */
import { computed } from 'vue'
import {
  isNavLinkItem,
  isNavButtonItem,
  hasActiveDescendant,
  type AppLayoutNavItem,
  type AppLayoutNavLinkItem,
  type AppLayoutSubLevelVisible,
  type AppLayoutBackground,
} from './appLayoutTypes'

const props = defineProps<{
  item: AppLayoutNavItem
  activePath: string
  level: number
  subLevelVisible: AppLayoutSubLevelVisible
  background: AppLayoutBackground
}>()

const emit = defineEmits<{
  /** Emitted when the item (or any sub-item) is activated — bubbles up to close the mobile dialog. */
  close: []
}>()

const isLink = computed(() => isNavLinkItem(props.item))
const isButton = computed(() => isNavButtonItem(props.item))

const linkItem = computed(() =>
  isNavLinkItem(props.item) ? (props.item as AppLayoutNavLinkItem) : null,
)

/** Item href exactly matches current page. */
const isCurrentPage = computed(
  () => isNavLinkItem(props.item) && (props.item as AppLayoutNavLinkItem).href === props.activePath,
)

/** Item is an ancestor of the current page (has a matching sub-item). */
const isAncestor = computed(() =>
  isNavLinkItem(props.item) && !!(props.item as AppLayoutNavLinkItem).items?.length
    ? hasActiveDescendant(
        (props.item as AppLayoutNavLinkItem).items!,
        props.activePath,
      )
    : false,
)

/** Whether the sub-level should be visible. */
const isOpen = computed(
  () => props.subLevelVisible === 'always' || isAncestor.value || isCurrentPage.value,
)

const hoverBg = computed(() =>
  props.background === 'body'
    ? 'var(--agds-color-bg-subtle)'
    : 'var(--agds-color-bg-muted)',
)
</script>

<template>
  <!-- ── Link item ────────────────────────────────────────── -->
  <li v-if="isLink" class="agds-alsnav-item">
    <a
      :href="linkItem!.href"
      :aria-current="isCurrentPage ? 'page' : undefined"
      class="agds-alsnav-item__link"
      :class="{
        'agds-alsnav-item__link--current': isCurrentPage,
        'agds-alsnav-item__link--ancestor': isAncestor && !isCurrentPage,
        'agds-alsnav-item__link--level2': level === 2,
      }"
      @click="emit('close')"
    >
      <!-- Level-1 icon -->
      <component
        :is="linkItem!.icon"
        v-if="linkItem!.icon && level === 1"
        aria-hidden="true"
        class="agds-alsnav-item__icon"
      />
      <!-- Level-2 dash prefix -->
      <span v-if="level === 2" aria-hidden="true" class="agds-alsnav-item__dash">–</span>

      <span class="agds-alsnav-item__label">{{ item.label }}</span>

      <!-- Chevron indicator when sub-items exist and not always-open -->
      <svg
        v-if="linkItem!.items?.length && subLevelVisible !== 'always'"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="agds-alsnav-item__chevron"
        :class="{ 'agds-alsnav-item__chevron--open': isAncestor || isCurrentPage }"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </a>

    <!-- Sub-level items -->
    <ul
      v-if="linkItem!.items?.length && isOpen"
      class="agds-alsnav-item__sub"
      role="list"
    >
      <AppLayoutSidebarNavItem
        v-for="(sub, si) in linkItem!.items"
        :key="si"
        :item="sub"
        :active-path="activePath"
        :level="level + 1"
        :sub-level-visible="subLevelVisible"
        :background="background"
        @close="emit('close')"
      />
    </ul>
  </li>

  <!-- ── Button item ──────────────────────────────────────── -->
  <li v-else-if="isButton" class="agds-alsnav-item">
    <button
      type="button"
      class="agds-alsnav-item__button"
      @click="(item as any).onClick?.($event); emit('close')"
    >
      <component
        :is="(item as any).icon"
        v-if="(item as any).icon && level === 1"
        aria-hidden="true"
        class="agds-alsnav-item__icon"
      />
      <span class="agds-alsnav-item__label">{{ item.label }}</span>
    </button>
  </li>

  <!-- ── Text-only item ───────────────────────────────────── -->
  <li v-else class="agds-alsnav-item">
    <span class="agds-alsnav-item__text">{{ item.label }}</span>
  </li>
</template>

<style scoped>
/* ── List item ───────────────────────────────────────────── */

.agds-alsnav-item {
  list-style: none;
}

/* Shared styles for link + button */
.agds-alsnav-item__link,
.agds-alsnav-item__button {
  display: flex;
  align-items: center;
  gap: var(--agds-space-3);
  width: 100%;
  box-sizing: border-box;
  padding-block: var(--agds-space-4);
  padding-inline-start: var(--agds-space-6);
  padding-inline-end: var(--agds-space-4);
  position: relative;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-normal);
  color: var(--agds-color-action-primary);
  text-decoration: none;
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  word-break: break-word;
  transition: background-color var(--agds-transition-fast);
}

.agds-alsnav-item__link:hover,
.agds-alsnav-item__button:hover {
  background-color: v-bind(hoverBg);
  color: var(--agds-color-text);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-alsnav-item__link:focus-visible,
.agds-alsnav-item__button:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
  z-index: 1;
}

/* ── Current page state ──────────────────────────────────── */

.agds-alsnav-item__link--current {
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold);
  background-color: var(--agds-color-bg-subtle);
}

.agds-alsnav-item__link--current::before {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  border-inline-start: var(--agds-border-width-xl, 4px) solid
    var(--agds-color-border-brand);
}

/* ── Ancestor (active group) state ──────────────────────── */

.agds-alsnav-item__link--ancestor::before {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  border-inline-start: var(--agds-border-width-xl, 4px) solid
    var(--agds-color-border);
}

/* ── Level-2 item ────────────────────────────────────────── */

.agds-alsnav-item__link--level2 {
  padding-inline-start: var(--agds-space-12, 3rem);
  font-size: var(--agds-font-size-sm);
}

/* ── Icon ────────────────────────────────────────────────── */

.agds-alsnav-item__icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: inherit;
}

/* ── Dash prefix (level 2) ───────────────────────────────── */

.agds-alsnav-item__dash {
  color: var(--agds-color-text-muted);
  flex-shrink: 0;
}

/* ── Label ───────────────────────────────────────────────── */

.agds-alsnav-item__label {
  flex: 1;
}

/* ── Chevron ─────────────────────────────────────────────── */

.agds-alsnav-item__chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  color: var(--agds-color-text-muted);
  transition: transform var(--agds-transition-fast);
}

.agds-alsnav-item__chevron--open {
  transform: rotate(90deg);
}

/* ── Sub-list ────────────────────────────────────────────── */

.agds-alsnav-item__sub {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Text-only item ──────────────────────────────────────── */

.agds-alsnav-item__text {
  display: block;
  padding-block: var(--agds-space-3);
  padding-inline: var(--agds-space-6);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
}
</style>

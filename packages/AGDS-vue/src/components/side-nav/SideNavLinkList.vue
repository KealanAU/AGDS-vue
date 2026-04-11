<script setup lang="ts">
import type { SideNavItem } from './utils'
import { hasSubLevelActiveItem } from './utils'
import AGDSIcon from '../icon/AGDSIcon.vue'

interface Props {
  items: SideNavItem[]
  activePath: string
  subLevelVisible: 'always' | 'whenActive'
  depth?: number
}

const props = withDefaults(defineProps<Props>(), { depth: 1 })

function isCurrentPage(item: SideNavItem): boolean {
  return item.href === props.activePath
}

function isActiveAncestor(item: SideNavItem): boolean {
  return hasSubLevelActiveItem(item.items, props.activePath)
}

function isActive(item: SideNavItem): boolean {
  return isCurrentPage(item) || isActiveAncestor(item)
}

function showSubList(item: SideNavItem): boolean {
  if (!item.items?.length) return false
  return (
    isCurrentPage(item) ||
    isActiveAncestor(item) ||
    props.subLevelVisible === 'always'
  )
}

function hasSubIndicator(item: SideNavItem): boolean {
  return (item.items?.length ?? 0) > 0 && props.subLevelVisible === 'whenActive'
}
</script>

<template>
  <ul
    class="agds-side-nav__list"
    :class="{ 'agds-side-nav__list--nested': depth > 1 }"
  >
    <li
      v-for="item in items"
      :key="item.href"
      class="agds-side-nav__item"
      :class="{
        'agds-side-nav__item--active-ancestor': isActive(item) && depth === 1,
      }"
    >
      <a
        :href="item.href"
        :aria-current="isCurrentPage(item) ? 'page' : undefined"
        :aria-label="
          hasSubIndicator(item)
            ? `${item.label}${showSubList(item) ? ', has expanded sub links' : ', has sub links'}`
            : undefined
        "
        class="agds-side-nav__link"
        :class="{
          'agds-side-nav__link--current': isCurrentPage(item),
          'agds-side-nav__link--sub': depth > 1,
        }"
        :style="{ paddingLeft: `${depth}rem` }"
      >
        <span
          v-if="depth > 2"
          class="agds-side-nav__ancestor-mark"
          aria-hidden="true"
          >&mdash;</span
        >
        <span
          v-else-if="depth > 1"
          class="agds-side-nav__ancestor-mark"
          aria-hidden="true"
          >&ndash;</span
        >

        <span class="agds-side-nav__link-label">{{ item.label }}</span>

        <AGDSIcon
          v-if="hasSubIndicator(item)"
          name="mdi:chevron-right"
          :size="depth > 1 ? 'sm' : 'md'"
          aria-hidden="true"
          class="agds-side-nav__chevron"
          :class="{ 'agds-side-nav__chevron--open': showSubList(item) }"
        />
      </a>

      <!-- Recursive sub-list -->
      <SideNavLinkList
        v-if="item.items?.length && showSubList(item)"
        :items="item.items"
        :active-path="activePath"
        :sub-level-visible="subLevelVisible"
        :depth="(depth ?? 1) + 1"
      />
    </li>
  </ul>
</template>

<style scoped>
/* ── List reset ──────────────────────────────────────────── */
.agds-side-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Item: active-ancestor left border (depth 1 only) ────── */
.agds-side-nav__item--active-ancestor {
  position: relative;
}

.agds-side-nav__item--active-ancestor::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-left: 4px solid var(--agds-color-border);
  pointer-events: none;
}

/* ── Link ────────────────────────────────────────────────── */
.agds-side-nav__link {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding-top: var(--agds-space-3);
  padding-bottom: var(--agds-space-3);
  padding-right: var(--agds-space-4);
  /* padding-left is set via inline style to handle depth */

  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);

  color: var(--agds-color-text-muted);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  text-decoration: none;

  transition: background-color 100ms ease, color 100ms ease;
}

.agds-side-nav__link--sub {
  padding-top: var(--agds-space-2);
  padding-bottom: var(--agds-space-2);
}

.agds-side-nav__link:hover {
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg-subtle);
}

.agds-side-nav__link:hover .agds-side-nav__link-label {
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Current page */
.agds-side-nav__link--current {
  position: relative;
  color: var(--agds-color-text);
  background-color: var(--agds-color-bg-subtle);
  font-weight: var(--agds-font-weight-bold);
}

.agds-side-nav__link--current::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-left: 4px solid var(--agds-color-action-primary);
  pointer-events: none;
}

/* Focus */
.agds-side-nav__link:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* ── Label ───────────────────────────────────────────────── */
.agds-side-nav__link-label {
  flex: 1;
}

/* ── Ancestor mark ───────────────────────────────────────── */
.agds-side-nav__ancestor-mark {
  flex-shrink: 0;
  color: var(--agds-color-text-muted);
}

/* ── Chevron ─────────────────────────────────────────────── */
.agds-side-nav__chevron {
  flex-shrink: 0;
  transition: transform 200ms ease;
}

.agds-side-nav__chevron--open {
  transform: rotate(90deg);
}

/* ── Reduced motion ──────────────────────────────────────── */

@media (prefers-reduced-motion: reduce) {
  .agds-side-nav__link {
    transition: none;
  }

  .agds-side-nav__chevron {
    transition: none;
  }
}
</style>

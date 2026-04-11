<script setup lang="ts">
import { computed } from 'vue'
import { DropdownMenuItem } from 'reka-ui'
import type { Component } from 'vue'

export interface AGDSDropdownMenuItemLinkProps {
  /** URL the item navigates to. */
  href: string
  /**
   * Optional id for the item element.
   * Note: Reka UI manages focus via roving tabindex rather than aria-activedescendant,
   * so this id is applied to the rendered element for external reference only.
   */
  id?: string
  /** Optional icon component rendered to the left of the label. */
  icon?: Component
  /**
   * Browsing context for the link.
   *
   * - `'_blank'` — Opens in a new tab. Adds `rel="noopener noreferrer"` and a screen-reader hint automatically.
   * - `'_self'` — Opens in the same frame (default browser behaviour).
   */
  target?: '_blank' | '_self' | '_parent' | '_top'
}

const props = defineProps<AGDSDropdownMenuItemLinkProps>()

const emit = defineEmits<{
  /** Emitted when the link item is activated via click or keyboard (Enter/Space). The menu closes automatically. */
  click: [event: Event]
}>()

const isExternal = computed(() => props.target === '_blank')
</script>

<template>
  <!--
    DropdownMenuItem with as="a" renders an <a> element so link semantics are preserved.
    Reka wires role="menuitem", keyboard activation, close-on-select, and roving tabindex.
  -->
  <DropdownMenuItem
    :id="id"
    as="a"
    :href="href"
    :target="target"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="agds-dm-item"
    @select="(e: Event) => emit('click', e)"
  >
    <div class="agds-dm-item__content">
      <component
        :is="icon"
        v-if="icon"
        class="agds-dm-item__icon"
        aria-hidden="true"
      />
      <span class="agds-dm-item__label">
        <slot />
        <span v-if="isExternal" class="sr-only">, opens in a new tab</span>
      </span>
    </div>
    <div v-if="$slots.endElement" class="agds-dm-item__end">
      <slot name="endElement" />
    </div>
  </DropdownMenuItem>
</template>

<style scoped>
.agds-dm-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-4);
  padding: var(--agds-space-4);
  min-width: 18rem;
  background-color: var(--agds-color-bg);
  cursor: pointer;
  text-decoration: none;
  color: var(--agds-color-action-primary);
  transition: background-color var(--agds-transition-fast);
  outline: none;
}

/* Reka sets data-highlighted on the focused/hovered item */
.agds-dm-item[data-highlighted],
.agds-dm-item:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-dm-item[data-highlighted] .agds-dm-item__label,
.agds-dm-item:hover .agds-dm-item__label {
  text-decoration: underline;
}

.agds-dm-item:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -2px;
}

.agds-dm-item__content {
  display: flex;
  align-items: center;
  gap: var(--agds-space-3);
}

.agds-dm-item__icon {
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
}

.agds-dm-item__label {
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  color: inherit;
}

.agds-dm-item__end {
  flex-shrink: 0;
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

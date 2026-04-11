<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'
import type { Component } from 'vue'

export interface AGDSDropdownMenuItemProps {
  /**
   * Optional id for the item element.
   * Note: Reka UI manages focus via roving tabindex rather than aria-activedescendant,
   * so this id is applied to the rendered element for external reference only.
   */
  id?: string
  icon?: Component
}

const props = defineProps<AGDSDropdownMenuItemProps>()

const emit = defineEmits<{
  click: [event: Event]
}>()
</script>

<template>
  <!--
    DropdownMenuItem renders role="menuitem", handles keyboard activation (Enter/Space),
    closes the menu on select, and participates in Reka's roving-tabindex navigation.
    BEM classes are applied directly on the Reka primitive.
  -->
  <DropdownMenuItem
    :id="id"
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
</style>

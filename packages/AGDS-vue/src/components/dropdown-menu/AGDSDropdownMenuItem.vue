<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { useDropdownMenuContext } from './dropdownMenuContext'
import type { Component } from 'vue'

export interface AGDSDropdownMenuItemProps {
  id?: string
  icon?: Component
}

const props = defineProps<AGDSDropdownMenuItemProps>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { menuId, activeDescendantId, closeMenu } = useDropdownMenuContext()

const uid = getCurrentInstance()?.uid ?? 0
const itemId = computed(() => props.id ?? `${menuId}-item-${uid}`)
const isActive = computed(() => itemId.value === activeDescendantId.value)

const itemEl = ref<HTMLElement | null>(null)

watch(isActive, (active) => {
  if (active && typeof itemEl.value?.scrollIntoView === 'function') {
    itemEl.value.scrollIntoView({ block: 'nearest' })
  }
})

function handleClick(event: MouseEvent) {
  emit('click', event)
  closeMenu()
}
</script>

<template>
  <div
    ref="itemEl"
    :id="itemId"
    role="menuitem"
    tabindex="-1"
    :class="['agds-dm-item', { 'agds-dm-item--active': isActive }]"
    @click="handleClick"
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
  </div>
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
}

.agds-dm-item:hover,
.agds-dm-item--active {
  background-color: var(--agds-color-bg-subtle);
}

.agds-dm-item:hover .agds-dm-item__label,
.agds-dm-item--active .agds-dm-item__label {
  text-decoration: underline;
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

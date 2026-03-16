<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useDropdownMenuContext } from './dropdownMenuContext'

export interface AgDSDropdownMenuGroupProps {
  label: string
}

defineProps<AgDSDropdownMenuGroupProps>()

const { menuId } = useDropdownMenuContext()
const uid = getCurrentInstance()?.uid ?? 0
const groupId = `${menuId}-group-${uid}`
</script>

<template>
  <div role="group" :aria-labelledby="groupId" class="agds-dm-group">
    <span :id="groupId" class="agds-dm-group__label">{{ label }}</span>
    <slot />
  </div>
</template>

<style scoped>
.agds-dm-group {
  display: flex;
  flex-direction: column;
}

.agds-dm-group__label {
  display: block;
  padding-block: var(--agds-space-3) var(--agds-space-1);
  padding-inline: var(--agds-space-4);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-tight);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>

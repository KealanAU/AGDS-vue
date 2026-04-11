<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import {
  DropdownMenuGroup,
  DropdownMenuLabel,
} from 'reka-ui'

export interface AGDSDropdownMenuGroupProps {
  label: string
}

defineProps<AGDSDropdownMenuGroupProps>()

const uid = getCurrentInstance()?.uid ?? 0
const groupLabelId = `agds-dropdown-menu-group-label-${uid}`
</script>

<template>
  <!--
    DropdownMenuGroup renders role="group".
    DropdownMenuLabel with as-child renders our styled label element.
    We pass our own id on the label and wire aria-labelledby so the group
    is correctly announced.
  -->
  <DropdownMenuGroup as-child>
    <div
      role="group"
      :aria-labelledby="groupLabelId"
      class="agds-dm-group"
    >
      <DropdownMenuLabel as-child>
        <span :id="groupLabelId" class="agds-dm-group__label">{{ label }}</span>
      </DropdownMenuLabel>
      <slot />
    </div>
  </DropdownMenuGroup>
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

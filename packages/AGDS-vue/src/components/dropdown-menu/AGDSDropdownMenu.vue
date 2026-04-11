<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import {
  DropdownMenuRoot,
} from 'reka-ui'
import { DROPDOWN_MENU_KEY } from './dropdownMenuContext'
import type { DropdownMenuPopoverPlacement } from './dropdownMenuContext'

export interface AGDSDropdownMenuProps {
  /** Placement of the dropdown panel relative to the trigger */
  popoverPlacement?: DropdownMenuPopoverPlacement
  /** Maximum height of the panel in pixels */
  popoverMaxHeight?: number
  /** Gap between trigger and panel in pixels */
  popoverOffset?: number
  /**
   * Controlled open state. Bind with v-model:open or pass open + @update:open.
   * When omitted the dropdown manages its own open state internally (uncontrolled).
   */
  open?: boolean
  /**
   * Initial open state for uncontrolled usage.
   */
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<AGDSDropdownMenuProps>(), {
  popoverPlacement: 'bottom-start',
  popoverOffset: 8,
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

// Provide only the layout/styling props that child components need.
// Reka UI's DropdownMenuRoot handles all open state, keyboard navigation,
// focus management, type-ahead, click-outside, and aria wiring.
provide(DROPDOWN_MENU_KEY, {
  popoverPlacement: props.popoverPlacement,
  popoverMaxHeight: props.popoverMaxHeight,
  popoverOffset: props.popoverOffset,
})

// Internal open state — allows Reka's DropdownMenuRoot to work in passive
// (internally managed) mode by always providing an explicit boolean via v-model.
// When the consumer doesn't pass `open`, we manage state ourselves.
// When the consumer passes `open`, we proxy it.
const internalOpen = ref(props.defaultOpen ?? false)

// Keep internal state in sync when consumer passes controlled `open`
watch(() => props.open, (val) => {
  if (val !== undefined) internalOpen.value = val
}, { immediate: true })

function onOpenChange(value: boolean) {
  internalOpen.value = value
  emit('update:open', value)
}
</script>

<template>
  <!--
    We always bind v-model:open to our internal ref, which allows Reka's
    DropdownMenuRoot to use passive (internally managed) mode correctly.
    Reka's DropdownMenuRoot handles all keyboard navigation, focus management,
    type-ahead, click-outside, and aria wiring internally.
  -->
  <DropdownMenuRoot
    v-model:open="internalOpen"
    @update:open="onOpenChange"
  >
    <div class="agds-dropdown-menu">
      <slot />
    </div>
  </DropdownMenuRoot>
</template>

<style scoped>
.agds-dropdown-menu {
  position: relative;
  display: inline-block;
}
</style>

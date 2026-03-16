<script setup lang="ts">
import { ref } from 'vue'
import { AgDSFilterSidebar } from 'agds-vue'

const props = defineProps<{
  /** 'default' | 'active' | 'clear' | 'bodyAlt' */
  variant?: string
}>()

const activeCount = ref(props.variant === 'active' ? 3 : 0)
const showClear = ref(props.variant === 'clear' || props.variant === 'active')

function onClearFilters() {
  activeCount.value = 0
}
</script>

<template>
  <div style="max-width: 320px">
    <AgDSFilterSidebar
      :active-filters-count="activeCount"
      :show-clear-filters="showClear"
      :background="variant === 'bodyAlt' ? 'bodyAlt' : 'body'"
      @clear-filters="onClearFilters"
    >
      <fieldset style="border: none; padding: 0; margin: 0">
        <legend style="font-weight: bold; margin-bottom: 8px">Category</legend>
        <label style="display: block; margin-bottom: 4px"> <input type="checkbox" /> News </label>
        <label style="display: block; margin-bottom: 4px"> <input type="checkbox" /> Grants </label>
        <label style="display: block"> <input type="checkbox" /> Publications </label>
      </fieldset>
    </AgDSFilterSidebar>
  </div>
</template>

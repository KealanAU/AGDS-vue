<script setup lang="ts">
import AgDSFlex from '../flex/AGDSFlex.vue'

export interface AgDSSearchBoxProps {
  /** Accessible label for the search landmark. Announced by screen readers to
   *  distinguish this search region from others on the page. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<AgDSSearchBoxProps>(), {
  ariaLabel: 'Sitewide',
})

const emit = defineEmits<{
  submit: [event: SubmitEvent]
}>()
</script>

<template>
  <form
    class="agds-search-box"
    role="search"
    :aria-label="props.ariaLabel"
    @submit="emit('submit', $event)"
  >
    <AgDSFlex align-items="flex-end">
      <slot />
    </AgDSFlex>
  </form>
</template>

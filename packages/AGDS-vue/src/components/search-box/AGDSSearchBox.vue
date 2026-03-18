<script setup lang="ts">
import AGDSFlex from '../flex/AGDSFlex.vue'

export interface AGDSSearchBoxProps {
  /** Accessible label for the search landmark. Announced by screen readers to
   *  distinguish this search region from others on the page. */
  ariaLabel?: string
}

const props = withDefaults(defineProps<AGDSSearchBoxProps>(), {
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
    <AGDSFlex align-items="flex-end">
      <slot />
    </AGDSFlex>
  </form>
</template>

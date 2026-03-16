<script setup lang="ts">
import { ref } from 'vue'
import AgDSButton from '../button/AGDSButton.vue'

export interface AgDSSearchBoxButtonProps {
  /** Visible label text and accessible name for the button. */
  label: string
  /**
   * When true the visible text is hidden and only the search icon is shown.
   * The label is still announced by screen readers via aria-label.
   */
  iconOnly?: boolean
}

const props = withDefaults(defineProps<AgDSSearchBoxButtonProps>(), {
  iconOnly: false,
})

const buttonRef = ref<InstanceType<typeof AgDSButton> | null>(null)

defineExpose({ focus: () => buttonRef.value?.focus() })
</script>

<template>
  <div class="agds-search-box__button-wrapper">
    <AgDSButton
      ref="buttonRef"
      type="submit"
      :aria-label="props.label"
      class="agds-search-box__button"
    >
      <!-- Search icon — always rendered; hidden from AT via aria-hidden on SVG -->
      <template #iconBefore>
        <svg
          v-if="props.iconOnly"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </template>

      <!-- Visible label — hidden in icon-only mode -->
      <span :class="{ 'sr-only': props.iconOnly }">{{ props.label }}</span>

      <!-- Icon shown alongside text when not icon-only -->
      <template v-if="!props.iconOnly" #iconAfter>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
        >
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
        </svg>
      </template>
    </AgDSButton>
  </div>
</template>

<style scoped>
.agds-search-box__button-wrapper {
  flex-shrink: 0;
  position: relative;
  border-left: var(--agds-border-width-lg, 4px) solid var(--agds-color-action-primary);
}

/* Remove left radius so the button sits flush against the input */
.agds-search-box__button :deep(.agds-button) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
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

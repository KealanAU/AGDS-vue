<script setup lang="ts">
import { inject } from 'vue'
import { CARD_CONTEXT_KEY } from './cardContext'

export interface AGDSCardFooterProps {
  /** Override the footer's background. Inherits from Card when omitted. */
  background?: 'body' | 'bodyAlt'
}

const props = defineProps<AGDSCardFooterProps>()

const context = inject(CARD_CONTEXT_KEY)
</script>

<template>
  <!--
    footerOutside: footer sits below the card border box.
    Reduced horizontal padding keeps it visually aligned.
  -->
  <div
    v-if="context?.footerOutside"
    :class="[
      'agds-card-footer agds-card-footer--outside',
      props.background && (props.background === 'bodyAlt' ? 'agds-card-footer--body-alt' : 'agds-card-footer--body'),
    ]"
  >
    <slot />
  </div>

  <!-- Normal: footer is inside the card, separated by a top border. -->
  <div
    v-else
    :class="[
      'agds-card-footer',
      props.background && (props.background === 'bodyAlt' ? 'agds-card-footer--body-alt' : 'agds-card-footer--body'),
    ]"
  >
    <slot />
  </div>
</template>

<style scoped>
.agds-card-footer {
  border-top: var(--agds-card-border-width) solid var(--agds-card-border-color);
  padding: var(--agds-card-padding);
}

.agds-card-footer--outside {
  border-top: none;
  padding-top: var(--agds-card-footer-outside-padding-top);
  padding-left: var(--agds-card-footer-outside-padding-x);
  padding-right: var(--agds-card-footer-outside-padding-x);
}

.agds-card-footer--body {
  background-color: var(--agds-color-bg);
}

.agds-card-footer--body-alt {
  background-color: var(--agds-color-bg-subtle);
}
</style>

<script setup lang="ts">
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as AppLayoutFooterBackground }
export type AppLayoutFooterMaxWidth = 'container' | 'containerLg'

export interface AgDSAppLayoutFooterProps {
  /** Background colour of the footer surface. */
  background?: BackgroundVariant
  /** Maximum width of the inner content container. */
  maxWidth?: AppLayoutFooterMaxWidth
}

withDefaults(defineProps<AgDSAppLayoutFooterProps>(), {
  background: 'body',
  maxWidth: 'container',
})
</script>

<template>
  <footer
    class="agds-app-layout-footer"
    :class="[`agds-app-layout-footer--${background}`]"
  >
    <div
      class="agds-app-layout-footer__inner"
      :class="[`agds-app-layout-footer__inner--${maxWidth}`]"
    >
      <slot />
    </div>
  </footer>
</template>

<style scoped>
/* ── Footer shell ─────────────────────────────────────────── */

.agds-app-layout-footer {
  /* marginTop: auto pushes footer to bottom of the flex-column main area */
  margin-top: auto;
  border-top: var(--agds-footer-border-top-width, 4px) solid
    var(--agds-footer-border-color, var(--agds-color-border));
  color: var(--agds-color-text);
  display: flex;
  justify-content: center;
  padding-block: var(--agds-footer-padding-y, var(--agds-space-6));
}

.agds-app-layout-footer--body {
  background-color: var(--agds-color-bg);
}

.agds-app-layout-footer--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* Suppress default list margin inside footer */
.agds-app-layout-footer :deep(li) {
  margin-left: 0;
}

/* ── Inner container ──────────────────────────────────────── */

.agds-app-layout-footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--agds-footer-gap, var(--agds-space-6));
  padding-inline: var(--agds-footer-padding-x, var(--agds-space-6));
  width: 100%;
}

.agds-app-layout-footer__inner--container {
  max-width: var(--agds-footer-max-width, 75rem);
}

.agds-app-layout-footer__inner--containerLg {
  max-width: var(--agds-footer-max-width-lg, 90rem);
}
</style>

<script lang="ts">
// Named export for the divider sub-component so consumers can import it from the same entry.
export {}
</script>

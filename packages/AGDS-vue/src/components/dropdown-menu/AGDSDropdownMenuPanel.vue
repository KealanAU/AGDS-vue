<script setup lang="ts">
import { computed } from 'vue'
import {
  DropdownMenuPortal,
  DropdownMenuContent,
} from 'reka-ui'
import { useDropdownMenuContext } from './dropdownMenuContext'

const { popoverPlacement, popoverMaxHeight, popoverOffset } = useDropdownMenuContext()

/**
 * Map our placement shorthand to Reka's side/align props.
 * Reka's DropdownMenuContent uses floating-ui for positioning.
 */
const side = 'bottom' as const

const align = computed(() => {
  if (popoverPlacement === 'bottom-end') return 'end' as const
  if (popoverPlacement === 'bottom') return 'center' as const
  return 'start' as const // 'bottom-start' (default)
})

const contentStyle = computed(() => ({
  maxHeight: popoverMaxHeight ? `${popoverMaxHeight}px` : undefined,
}))
</script>

<template>
  <!--
    DropdownMenuPortal teleports the content to <body> to avoid z-index/overflow issues.
    DropdownMenuContent provides:
      - role="menu", aria-labelledby (wired to trigger id by Reka)
      - Focus trap while open
      - Escape to close + focus return to trigger
      - Click-outside to close
      - ArrowUp/Down/Home/End keyboard navigation (roving tabindex)
      - Type-ahead search
    BEM classes are applied directly on DropdownMenuContent.
  -->
  <DropdownMenuPortal>
    <DropdownMenuContent
      :side="side"
      :align="align"
      :side-offset="popoverOffset"
      :loop="true"
      :class="[
        'agds-dropdown-menu__panel',
        `agds-dropdown-menu__panel--${popoverPlacement}`,
      ]"
      :style="contentStyle"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>

<style scoped>
.agds-dropdown-menu__panel {
  z-index: var(--agds-z-dropdown);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  box-shadow: var(--agds-shadow-md);
  overflow-y: auto;
  min-width: 18rem;
  padding-block: var(--agds-space-1);
  outline: none;
}

.agds-dropdown-menu__panel:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Forced colours (Windows High Contrast) ──────────────── */

@media (forced-colors: active) {
  /* The panel border remains visible; suppress the decorative shadow. */
  .agds-dropdown-menu__panel {
    box-shadow: none;
    border-color: ButtonText;
  }
}
</style>

<script setup lang="ts">
import { inject } from 'vue'
import { TabsContent } from 'reka-ui'

export interface AgDSTabPanelProps {
  /** Value — must match the corresponding AgDSTab value. */
  value: string
}

const props = defineProps<AgDSTabPanelProps>()

const contained = inject<boolean>('tabsContained', true)
</script>

<template>
  <TabsContent
    :value="props.value"
    :class="[
      'agds-tab-panel',
      contained ? 'agds-tab-panel--contained' : 'agds-tab-panel--edge',
    ]"
  >
    <slot />
  </TabsContent>
</template>

<style scoped>
/* ── Panel ───────────────────────────────────────────── */

.agds-tab-panel {
  background: var(--agds-tabs-panel-bg);
  color: var(--agds-color-text);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-top-width: 0;
  border-radius: 0 0 var(--agds-radius-md) var(--agds-radius-md);
  padding: var(--agds-space-6) var(--agds-space-3);
}

/* Focus ring when focus is moved programmatically */
.agds-tab-panel:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* Desktop */
@media (min-width: 768px) {
  .agds-tab-panel {
    border-top-width: var(--agds-border-width-sm);
  }

  /* Contained (default) — full padding, side borders, rounded bottom-right & bottom-left */
  .agds-tab-panel--contained {
    padding: var(--agds-space-6);
    border-radius: 0 var(--agds-radius-md) var(--agds-radius-md) var(--agds-radius-md);
  }

  /* Edge-to-edge — no side padding or borders */
  .agds-tab-panel--edge {
    padding-left: 0;
    padding-right: 0;
    border-left-width: 0;
    border-right-width: 0;
    border-radius: 0;
  }
}
</style>

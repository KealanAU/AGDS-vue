<script setup lang="ts">
import AGDSAccordion from './AGDSAccordion.vue'
import AGDSAccordionItem from './AGDSAccordionItem.vue'
import type { AGDSAccordionProps } from './AGDSAccordion.vue'

const props = withDefaults(defineProps<AGDSAccordionProps>(), {
  type: 'multiple',
  collapsible: true,
  indent: false,
  background: 'body',
})
</script>

<template>
  <AGDSAccordion v-bind="props">
    <AGDSAccordionItem value="item-1" title="Section one">
      <p>Content for section one.</p>
    </AGDSAccordionItem>
    <AGDSAccordionItem value="item-2" title="Section two">
      <p>Content for section two.</p>
    </AGDSAccordionItem>
  </AGDSAccordion>
</template>

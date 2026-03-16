<script setup lang="ts">
import { inject, computed } from 'vue'
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from 'reka-ui'
import type { AccordionBackground } from './AGDSAccordion.vue'

export interface AgDSAccordionItemProps {
  /** Unique identifier used by AccordionRoot to track open state. */
  value: string
  /** Visible heading text for the trigger button. */
  title: string
  /**
   * Hover background colour.
   * 'body'    → subtle shade (use on white/body backgrounds).
   * 'bodyAlt' → muted shade (use on off-white/alt backgrounds).
   * Falls back to the value provided by the parent AgDSAccordion.
   */
  background?: AccordionBackground
  /** Heading level for the AccordionHeader. Defaults to 3. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  /** Prevents the item from being opened or closed. */
  disabled?: boolean
}

const props = withDefaults(defineProps<AgDSAccordionItemProps>(), {
  background: undefined,
  headingLevel: 3,
  disabled: false,
})

// Fall back to the accordion-level background if the item doesn't override it.
const inheritedBackground = inject<AccordionBackground>('accordionBackground', 'body')
const activeBackground = computed(() => props.background ?? inheritedBackground)

const indent = inject<boolean>('accordionIndent', false)
</script>

<template>
  <AccordionItem
    :value="props.value"
    :disabled="props.disabled"
    class="agds-accordion-item"
  >
    <AccordionHeader :as="`h${props.headingLevel}`" class="agds-accordion-item__heading">
      <AccordionTrigger
        :class="[
          'agds-accordion-item__trigger',
          `agds-accordion-item__trigger--bg-${activeBackground}`,
          { 'agds-accordion-item__trigger--indented': indent },
        ]"
      >
        <span class="agds-accordion-item__title">{{ props.title }}</span>

        <!-- Chevron — rotates via CSS on data-state="open" -->
        <svg
          class="agds-accordion-item__chevron"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </AccordionTrigger>
    </AccordionHeader>

    <!--
      Reka UI sets data-state="open|closed" on AccordionContent and applies
      --reka-accordion-content-height for smooth height animations via CSS.
    -->
    <AccordionContent
      :class="[
        'agds-accordion-item__panel',
        { 'agds-accordion-item__panel--indented': indent },
      ]"
    >
      <div class="agds-accordion-item__panel-inner">
        <slot />
      </div>
    </AccordionContent>
  </AccordionItem>
</template>

<style scoped>
/* ── Item ────────────────────────────────────────────────── */

.agds-accordion-item {
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* ── Heading ─────────────────────────────────────────────── */

.agds-accordion-item__heading {
  margin: 0;
}

/* ── Trigger ─────────────────────────────────────────────── */

.agds-accordion-item__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-3);
  width: 100%;
  padding: var(--agds-space-4);

  background: none;
  border: none;
  cursor: pointer;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-semibold);
  color: var(--agds-color-text);
  text-align: left;

  transition: background-color var(--agds-transition-fast);
}

/* Indent variant */
.agds-accordion-item__trigger--indented {
  padding-left: var(--agds-space-8);
}

/* Hover — body background (on white) */
.agds-accordion-item__trigger--bg-body:hover:not([data-disabled]) {
  background-color: var(--agds-color-bg-subtle);
}

/* Hover — bodyAlt background (on off-white) */
.agds-accordion-item__trigger--bg-bodyAlt:hover:not([data-disabled]) {
  background-color: var(--agds-color-bg-muted);
}

/* Disabled */
.agds-accordion-item__trigger[data-disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Focus ring — keyboard only (WCAG 2.4.7) */
.agds-accordion-item__trigger:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* ── Title ───────────────────────────────────────────────── */

.agds-accordion-item__title {
  flex: 1;
}

/* ── Chevron ─────────────────────────────────────────────── */

.agds-accordion-item__chevron {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  transition: transform var(--agds-transition-normal);
}

/* Reka sets data-state="open" on the trigger when expanded */
.agds-accordion-item__trigger[data-state='open'] .agds-accordion-item__chevron {
  transform: rotate(180deg);
}

/* ── Panel (animated via Reka's CSS variable) ────────────── */

.agds-accordion-item__panel {
  overflow: hidden;
}

/* Reka exposes --reka-accordion-content-height for smooth open/close */
.agds-accordion-item__panel[data-state='open'] {
  animation: agds-accordion-open var(--agds-transition-normal);
}

.agds-accordion-item__panel[data-state='closed'] {
  animation: agds-accordion-close var(--agds-transition-normal);
}

@keyframes agds-accordion-open {
  from { height: 0; }
  to   { height: var(--reka-accordion-content-height); }
}

@keyframes agds-accordion-close {
  from { height: var(--reka-accordion-content-height); }
  to   { height: 0; }
}

/* ── Panel inner ─────────────────────────────────────────── */

.agds-accordion-item__panel-inner {
  padding: 0 var(--agds-space-4) var(--agds-space-4);
}

.agds-accordion-item__panel--indented .agds-accordion-item__panel-inner {
  padding-left: var(--agds-space-8);
}
</style>

<script setup lang="ts">
import { watch, useTemplateRef } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'reka-ui'

export interface AgDSModalProps {
  /** v-model: controls whether the modal is open. */
  modelValue: boolean
  /** The title displayed in the modal header. Required for accessibility. */
  title: string
}

const props = defineProps<AgDSModalProps>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// Focus the title on open so the screen reader announces it immediately.
const titleRef = useTemplateRef('titleRef')

function onOpenAutoFocus(e: Event) {
  e.preventDefault()
  ;(titleRef.value as { $el: HTMLElement } | null)?.$el?.focus()
}

// Lock body scroll while the modal is open.
watch(
  () => props.modelValue,
  (open) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : ''
    }
  },
  { immediate: true },
)
</script>

<template>
  <DialogRoot :open="props.modelValue" @update:open="(open) => emit('update:modelValue', open)">
    <DialogPortal force-mount>
      <DialogOverlay class="agds-modal__overlay" />
      <DialogContent class="agds-modal__dialog" @open-auto-focus="onOpenAutoFocus">
        <!--
          Close button first in DOM: it becomes the first Tab stop after focus
          lands on the title, so users can dismiss immediately.
        -->
        <DialogClose as-child>
          <button type="button" class="agds-modal__close" aria-label="Close modal">
            <svg
              class="agds-modal__close-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>
        </DialogClose>

        <!-- Title — focused on open; tabindex="-1" allows programmatic focus -->
        <DialogTitle ref="titleRef" tabindex="-1" class="agds-modal__title">
          {{ props.title }}
        </DialogTitle>

        <div class="agds-modal__body">
          <slot />
        </div>

        <div v-if="$slots.actions" class="agds-modal__actions">
          <slot name="actions" />
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<style scoped>
/* ── Overlay ────────────────────────────────────────────── */

.agds-modal__overlay {
  position: fixed;
  inset: 0;
  background-color: var(--agds-color-overlay);
  z-index: var(--agds-z-overlay);
  animation: agds-modal-overlay-in var(--agds-transition-normal);
}

/* ── Dialog ─────────────────────────────────────────────── */

/* Mobile: full-screen panel */
.agds-modal__dialog {
  position: fixed;
  inset: 0;
  z-index: var(--agds-z-modal);
  background: var(--agds-color-bg);
  box-shadow: var(--agds-shadow-lg);
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-4);
  padding: var(--agds-modal-padding) var(--agds-modal-padding-mobile-x);
  overflow-y: auto;
  animation: agds-modal-slide-in var(--agds-transition-normal);
}

/* Desktop: centered floating panel */
@media (min-width: 40rem) {
  .agds-modal__dialog {
    inset: auto;
    top: var(--agds-modal-margin-top);
    left: 50%;
    transform: translateX(-50%);
    width: min(var(--agds-modal-max-width), calc(100vw - var(--agds-space-8)));
    max-height: calc(100vh - var(--agds-space-16));
    border-radius: var(--agds-radius-lg);
    padding: var(--agds-modal-padding);
  }
}

/* ── Close button ───────────────────────────────────────── */

.agds-modal__close {
  align-self: flex-end;
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-2) var(--agds-space-3);
  border-radius: var(--agds-radius-md);
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  transition: background-color var(--agds-transition-fast);
}

.agds-modal__close:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-modal__close:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-modal__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ── Title ──────────────────────────────────────────────── */

.agds-modal__title {
  margin: 0;
  font-family: var(--agds-font-family-heading);
  font-size: var(--agds-font-size-2xl);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
}

/* Show focus ring when title is programmatically focused on open */
.agds-modal__title:focus {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

/* ── Body ───────────────────────────────────────────────── */

.agds-modal__body {
  flex: 1;
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
}

/* ── Actions ────────────────────────────────────────────── */

.agds-modal__actions {
  margin-top: auto;
  padding-top: var(--agds-space-4);
}

/* ── Animations ─────────────────────────────────────────── */

@keyframes agds-modal-overlay-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

/* Mobile: no translateX in play */
@keyframes agds-modal-slide-in {
  from { opacity: 0; transform: translateY(1rem); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Desktop: include the centering translateX in both keyframe states */
@media (min-width: 40rem) {
  @keyframes agds-modal-slide-in {
    from { opacity: 0; transform: translateX(-50%) translateY(1rem); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
}
</style>

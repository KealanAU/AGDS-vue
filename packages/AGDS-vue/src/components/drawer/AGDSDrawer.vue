<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted } from 'vue'

export type DrawerWidth = 'md' | 'lg'

export interface AgDSDrawerProps {
  /** v-model: controls whether the drawer is open. */
  modelValue: boolean
  /** The title displayed in the drawer header. Required for accessibility. */
  title: string
  /** Width of the drawer panel. */
  width?: DrawerWidth
  /**
   * Lighten the overlay so that the main content underneath is more visible
   * while the drawer is open.
   */
  mutedOverlay?: boolean
  /**
   * On close of the drawer, this element will receive focus instead of the
   * element that was focused when the drawer opened.
   */
  elementToFocusOnClose?: HTMLElement | null
}

const props = withDefaults(defineProps<AgDSDrawerProps>(), {
  width: 'md',
  mutedOverlay: false,
  elementToFocusOnClose: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// ── Unique ID for aria-labelledby ──────────────────────────────────────────
let _idCounter = 0
const titleId = `agds-drawer-title-${++_idCounter}`

// ── Refs ───────────────────────────────────────────────────────────────────
const drawerEl = ref<HTMLElement | null>(null)
const titleEl = ref<HTMLElement | null>(null)
/** The element that had focus before the drawer opened — restored on close. */
let _priorFocus: HTMLElement | null = null

// ── Open / close ───────────────────────────────────────────────────────────
function close() {
  emit('update:modelValue', false)
}

watch(
  () => props.modelValue,
  async (open) => {
    if (typeof document === 'undefined') return
    if (open) {
      _priorFocus = document.activeElement as HTMLElement | null
      document.body.style.overflow = 'hidden'
      await nextTick()
      titleEl.value?.focus()
    } else {
      document.body.style.overflow = ''
      await nextTick()
      const target = props.elementToFocusOnClose ?? _priorFocus
      target?.focus()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  // Guard against unmounting while open (e.g. page navigation)
  if (props.modelValue) document.body.style.overflow = ''
})

// ── Keyboard handling (Escape + focus trap) ────────────────────────────────
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    event.stopPropagation()
    close()
    return
  }

  if (event.key === 'Tab') {
    const focusable = Array.from(
      drawerEl.value?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), ' +
        'select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
      ) ?? [],
    )
    if (!focusable.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop overlay -->
    <Transition name="agds-drawer-overlay">
      <div
        v-if="modelValue"
        class="agds-drawer__overlay"
        :class="{ 'agds-drawer__overlay--muted': mutedOverlay }"
        aria-hidden="true"
        @click="close"
      />
    </Transition>

    <!-- Slide-in panel -->
    <Transition name="agds-drawer-panel">
      <div
        v-if="modelValue"
        ref="drawerEl"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        class="agds-drawer"
        :class="`agds-drawer--${width}`"
        @keydown="handleKeydown"
      >
        <!-- Header: title + close button -->
        <div class="agds-drawer__header">
          <h2
            ref="titleEl"
            :id="titleId"
            class="agds-drawer__title"
            tabindex="-1"
          >
            {{ title }}
          </h2>

          <button
            type="button"
            class="agds-drawer__close"
            aria-label="Close"
            @click="close"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="agds-drawer__close-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        <!--
          Body: scroll region for main content.
          tabindex="0" lets keyboard users scroll the region (WCAG 2.1.1).
          aria-label scopes the section landmark to this drawer (WCAG 1.3.1).
        -->
        <section
          class="agds-drawer__body"
          :aria-label="`${title} content`"
          tabindex="0"
        >
          <slot />
        </section>

        <!-- Footer: optional actions (e.g. ButtonGroup) -->
        <div v-if="$slots.actions" class="agds-drawer__footer">
          <slot name="actions" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Overlay ─────────────────────────────────────────────── */

.agds-drawer__overlay {
  position: fixed;
  inset: 0;
  background-color: var(--agds-color-overlay);
  z-index: var(--agds-z-overlay, 100);
}

.agds-drawer__overlay--muted {
  background-color: var(--agds-color-overlay-muted, rgba(0, 0, 0, 0.2));
}

/* ── Panel ───────────────────────────────────────────────── */

.agds-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: var(--agds-z-modal, 200);
  background-color: var(--agds-color-bg);
  box-shadow: var(--agds-shadow-lg);
  display: flex;
  flex-direction: column;
  width: min(100vw, var(--_drawer-width));

  /* High-contrast outline (Windows HCM) */
  outline: 2px solid transparent;
}

.agds-drawer--md { --_drawer-width: 32rem; }
.agds-drawer--lg { --_drawer-width: 45rem; }

/* ── Header ──────────────────────────────────────────────── */

.agds-drawer__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--agds-space-4);
  padding: var(--agds-space-4) var(--agds-space-6);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
  background-color: var(--agds-color-bg);
  flex-shrink: 0;
}

/* ── Title ───────────────────────────────────────────────── */

.agds-drawer__title {
  margin: 0;
  font-family: var(--agds-font-family-heading);
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
}

/* Show focus ring when title is focused programmatically on open */
.agds-drawer__title:focus {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

/* ── Close button ────────────────────────────────────────── */

.agds-drawer__close {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-1) var(--agds-space-2);
  border-radius: var(--agds-radius-md);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-text);
  transition: background-color var(--agds-transition-fast);
}

.agds-drawer__close:hover {
  background-color: var(--agds-color-bg-subtle);
  text-decoration: underline;
}

.agds-drawer__close:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-drawer__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ── Body ────────────────────────────────────────────────── */

.agds-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--agds-space-6);
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  /* Show inset focus ring when body section is focused via keyboard */
  outline: none;
}

.agds-drawer__body:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* ── Footer ──────────────────────────────────────────────── */

.agds-drawer__footer {
  flex-shrink: 0;
  padding: var(--agds-space-4) var(--agds-space-6);
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  background-color: var(--agds-color-bg);
}

/* ── Overlay transition ──────────────────────────────────── */

.agds-drawer-overlay-enter-active,
.agds-drawer-overlay-leave-active {
  transition: opacity var(--agds-transition-normal, 200ms ease);
}

.agds-drawer-overlay-enter-from,
.agds-drawer-overlay-leave-to {
  opacity: 0;
}

/* ── Panel slide transition ──────────────────────────────── */

.agds-drawer-panel-enter-active,
.agds-drawer-panel-leave-active {
  transition: transform var(--agds-transition-normal, 200ms ease);
}

.agds-drawer-panel-enter-from,
.agds-drawer-panel-leave-to {
  transform: translateX(100%);
}

/* Respect reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  .agds-drawer-overlay-enter-active,
  .agds-drawer-overlay-leave-active,
  .agds-drawer-panel-enter-active,
  .agds-drawer-panel-leave-active {
    transition-duration: 1ms;
  }
}
</style>

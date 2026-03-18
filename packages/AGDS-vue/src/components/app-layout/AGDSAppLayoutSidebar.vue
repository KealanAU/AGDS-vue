<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useAppLayoutContext } from './appLayoutContext'
import AGDSAppLayoutSidebarNav from './AGDSAppLayoutSidebarNav.vue'
import {
  findBestMatch,
  type AppLayoutNavGroup,
  type AppLayoutSubLevelVisible,
  type AppLayoutBackground,
} from './appLayoutTypes'

export interface AGDSAppLayoutSidebarProps {
  /** Navigation groups displayed in the sidebar. */
  items: AppLayoutNavGroup[]
  /** Current URL path — used to highlight the matching nav item. */
  activePath?: string
  /** Background colour variant. */
  background?: AppLayoutBackground
  /** Controls when sub-level navigation items are revealed. */
  subLevelVisible?: AppLayoutSubLevelVisible
}

const props = withDefaults(defineProps<AGDSAppLayoutSidebarProps>(), {
  background: 'bodyAlt',
  subLevelVisible: 'whenActive',
})

const { focusMode, isMobileMenuOpen, closeMobileMenu } = useAppLayoutContext()

/** Best-matching active path across all groups. */
const bestMatch = computed(() => findBestMatch(props.items, props.activePath))

const dialogEl = ref<HTMLElement | null>(null)
const closeButtonEl = ref<HTMLButtonElement | null>(null)

// Focus close button on open; restore scroll lock on close
watch(isMobileMenuOpen, async (open) => {
  if (open) {
    await nextTick()
    closeButtonEl.value?.focus()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeMobileMenu()
    return
  }

  // Basic focus trap — keep Tab inside the dialog
  if (event.key === 'Tab') {
    const focusable = dialogEl.value?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    )
    if (!focusable?.length) return
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
  <!--
    Desktop sidebar — rendered in the sidebar column slot.
    Hidden on mobile via parent CSS (.agds-app-layout__sidebar-col { display: none }).
    Visibility in focus mode is controlled by the parent column's CSS.
  -->
  <aside
    class="agds-app-layout-sidebar"
    :class="[
      `agds-app-layout-sidebar--${background}`,
      { 'agds-app-layout-sidebar--focus-mode': focusMode },
    ]"
    aria-label="Navigation"
  >
    <AGDSAppLayoutSidebarNav
      :items="items"
      :active-path="bestMatch"
      :sub-level-visible="subLevelVisible"
      :background="background"
    />
  </aside>

  <!-- Mobile slide-in dialog — Teleported to body -->
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="agds-alsdialog-backdrop">
      <div
        v-if="isMobileMenuOpen"
        class="agds-alsdialog__backdrop"
        aria-hidden="true"
        @click="closeMobileMenu"
      />
    </Transition>

    <!-- Slide-in panel -->
    <Transition name="agds-alsdialog-panel">
      <div
        v-if="isMobileMenuOpen"
        id="agds-app-layout-sidebar-dialog"
        ref="dialogEl"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        class="agds-alsdialog"
        :class="[`agds-alsdialog--${background}`]"
        @keydown="handleKeydown"
      >
        <!-- Close button -->
        <div class="agds-alsdialog__header">
          <button
            ref="closeButtonEl"
            type="button"
            class="agds-alsdialog__close"
            aria-label="Close menu"
            @click="closeMobileMenu"
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
              class="agds-alsdialog__close-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        <!-- Nav items -->
        <AGDSAppLayoutSidebarNav
          :items="items"
          :active-path="bestMatch"
          :sub-level-visible="subLevelVisible"
          :background="background"
          @close="closeMobileMenu"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Desktop sidebar ─────────────────────────────────────── */

.agds-app-layout-sidebar {
  height: 100%;
  border-inline-end: var(--agds-border-width-sm) solid var(--agds-color-border);
  overflow-y: auto;
}

.agds-app-layout-sidebar--body {
  background-color: var(--agds-color-bg);
}

.agds-app-layout-sidebar--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

.agds-app-layout-sidebar--focus-mode {
  display: none;
}

/* ── Mobile dialog backdrop ──────────────────────────────── */

.agds-alsdialog__backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--agds-color-overlay);
  z-index: var(--agds-z-overlay, 100);
}

/* ── Mobile dialog panel ─────────────────────────────────── */

.agds-alsdialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(16rem, 100vw);
  z-index: var(--agds-z-modal, 200);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: var(--agds-shadow-lg, 0 8px 24px rgb(0 0 0 / 0.16));
}

.agds-alsdialog--body {
  background-color: var(--agds-color-bg);
}

.agds-alsdialog--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Dialog header (close button row) ────────────────────── */

.agds-alsdialog__header {
  display: flex;
  align-items: center;
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
  padding: var(--agds-space-2) var(--agds-space-3);
}

.agds-alsdialog__close {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-2) var(--agds-space-3);
  border-radius: var(--agds-radius-sm);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-text);
  transition: background-color var(--agds-transition-fast);
}

.agds-alsdialog__close:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-alsdialog__close:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-alsdialog__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ── Transitions ─────────────────────────────────────────── */

.agds-alsdialog-backdrop-enter-active,
.agds-alsdialog-backdrop-leave-active {
  transition: opacity var(--agds-transition-normal, 250ms ease);
}

.agds-alsdialog-backdrop-enter-from,
.agds-alsdialog-backdrop-leave-to {
  opacity: 0;
}

.agds-alsdialog-panel-enter-active,
.agds-alsdialog-panel-leave-active {
  transition: transform var(--agds-transition-normal, 250ms ease);
}

.agds-alsdialog-panel-enter-from,
.agds-alsdialog-panel-leave-to {
  transform: translateX(-100%);
}
</style>

<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { APP_LAYOUT_KEY } from './appLayoutContext'

export interface AGDSAppLayoutProps {
  /**
   * When true, hides the sidebar and removes nav items.
   * Use during multi-step forms or checkout flows to reduce distractions.
   */
  focusMode?: boolean
}

const props = withDefaults(defineProps<AGDSAppLayoutProps>(), {
  focusMode: false,
})

const isMobileMenuOpen = ref(false)
const focusModeComputed = computed(() => props.focusMode)

function openMobileMenu() {
  isMobileMenuOpen.value = true
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

provide(APP_LAYOUT_KEY, {
  focusMode: focusModeComputed,
  isMobileMenuOpen,
  openMobileMenu,
  closeMobileMenu,
})
</script>

<template>
  <div
    class="agds-app-layout"
    :class="{ 'agds-app-layout--focus-mode': focusMode }"
  >
    <!-- Header spans full width -->
    <slot name="header" />

    <!-- Body: sidebar + main content -->
    <div class="agds-app-layout__body">
      <!-- Sidebar column — visible on desktop only; mobile uses a dialog -->
      <div class="agds-app-layout__sidebar-col">
        <slot name="sidebar" />
      </div>

      <!-- Main content column -->
      <div class="agds-app-layout__main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Root ────────────────────────────────────────────────── */

.agds-app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--agds-color-bg);
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
}

/* ── Body: sidebar + content ─────────────────────────────── */

.agds-app-layout__body {
  display: flex;
  flex: 1 0 auto;
  align-items: stretch;
}

/* ── Sidebar column ──────────────────────────────────────── */

/* Hidden on mobile — the sidebar dialog handles mobile navigation */
.agds-app-layout__sidebar-col {
  display: none;
  flex-shrink: 0;
}

/* Desktop (≥80rem / 1280px): show sidebar unless focusMode */
@media (min-width: 80rem) {
  .agds-app-layout:not(.agds-app-layout--focus-mode) .agds-app-layout__sidebar-col {
    display: block;
    width: 16rem;
  }
}

/* ── Main content ────────────────────────────────────────── */

.agds-app-layout__main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
</style>

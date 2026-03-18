<script setup lang="ts">
import { ref, computed } from 'vue'
import AGDSMainNavList from './AGDSMainNavList.vue'
import AGDSMainNavDialog from './AGDSMainNavDialog.vue'
import {
  findBestMatch,
  type MainNavItem,
  type MainNavBackground,
  type MainNavBorderColor,
} from './mainNavTypes'

export interface AGDSMainNavProps {
  /** Current URL path — used to highlight the matching nav item. */
  activePath?: string
  /** Background colour variant of the nav bar. */
  background?: MainNavBackground
  /** Colour of the thick bottom accent border. */
  borderColor?: MainNavBorderColor
  /**
   * When true, removes all navigation items to reduce distractions,
   * e.g. during checkout or multi-step forms.
   */
  focusMode?: boolean
  /** HTML id placed on the nav container element. */
  id?: string
  /** Primary navigation items displayed on the left on desktop. */
  items?: MainNavItem[]
  /** Maximum width of the inner container. */
  maxWidth?: 'container' | 'containerLg'
  /** Secondary navigation items displayed on the right on desktop. */
  secondaryItems?: MainNavItem[]
}

const props = withDefaults(defineProps<AGDSMainNavProps>(), {
  background: 'body',
  borderColor: 'brand',
  focusMode: false,
  maxWidth: 'container',
})

// Mobile menu open state
const isMobileMenuOpen = ref(false)
const hamburgerRef = ref<HTMLButtonElement | null>(null)

function openMobileMenu() {
  isMobileMenuOpen.value = true
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  // Return focus to the hamburger button after dialog closes
  hamburgerRef.value?.focus()
}

// Best-matching active path across primary + secondary items
const bestMatch = computed(() =>
  findBestMatch([...(props.items ?? []), ...(props.secondaryItems ?? [])], props.activePath),
)

const maxWidthValue = computed(() =>
  props.maxWidth === 'containerLg' ? '90rem' : '75rem',
)

const borderColorValue = computed(() => {
  const map: Record<MainNavBorderColor, string> = {
    brand: 'var(--agds-color-border-brand)',
    border: 'var(--agds-color-border)',
    'border-strong': 'var(--agds-color-border-strong)',
  }
  return map[props.borderColor!]
})
</script>

<template>
  <header
    :id="props.id"
    :class="[
      'agds-main-nav',
      `agds-main-nav--${props.background}`,
    ]"
    tabindex="-1"
  >
    <!-- Nav bar (hidden in focusMode; hidden from AT when mobile dialog is open) -->
    <div
      v-if="!props.focusMode"
      :aria-hidden="isMobileMenuOpen ? true : undefined"
      class="agds-main-nav__bar"
    >
      <div
        class="agds-main-nav__inner"
        :style="{ maxWidth: maxWidthValue }"
      >
        <!-- Hamburger — mobile only, only when there are primary items -->
        <button
          v-if="props.items?.length"
          ref="hamburgerRef"
          type="button"
          class="agds-main-nav__hamburger"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="agds-main-nav-dialog"
          aria-label="Open menu"
          @click="openMobileMenu"
        >
          <!-- Three-bar icon -->
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="agds-main-nav__hamburger-icon"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <span class="sr-only">Menu</span>
        </button>

        <!-- Primary nav (desktop only) -->
        <AGDSMainNavList
          v-if="props.items?.length"
          :items="props.items"
          :active-path="bestMatch"
          type="primary"
          aria-label="Main"
        />

        <!-- Secondary nav -->
        <AGDSMainNavList
          v-if="props.secondaryItems?.length"
          :items="props.secondaryItems"
          :active-path="bestMatch"
          type="secondary"
          aria-label="Supplementary"
        />
      </div>
    </div>

    <!-- Bottom accent border -->
    <div
      class="agds-main-nav__border"
      :style="{ borderBottomColor: borderColorValue }"
    />

    <!-- Mobile slide-in dialog -->
    <AGDSMainNavDialog
      id="agds-main-nav-dialog"
      :items="props.items"
      :active-path="bestMatch"
      :is-open="isMobileMenuOpen"
      @close="closeMobileMenu"
    />
  </header>
</template>

<style scoped>
/* ── Local palette ───────────────────────────────────────── */

/*
  These local custom properties switch based on the background variant.
  Child components reference them for consistent hover/active colours.
*/
.agds-main-nav--body {
  --agds-main-nav-link-hover-bg: var(--agds-color-bg-subtle);
  --agds-main-nav-link-active-bg: var(--agds-color-bg);
  background-color: var(--agds-color-bg);
}

.agds-main-nav--bodyAlt {
  --agds-main-nav-link-hover-bg: var(--agds-color-bg-muted);
  --agds-main-nav-link-active-bg: var(--agds-color-bg-subtle);
  background-color: var(--agds-color-bg-subtle);
}

/* ── Container ───────────────────────────────────────────── */

.agds-main-nav {
  position: relative;
  color: var(--agds-color-text);
}

.agds-main-nav:focus {
  outline: none;
}

/* ── Bar ─────────────────────────────────────────────────── */

.agds-main-nav__bar {
  display: flex;
  justify-content: center;
}

.agds-main-nav__inner {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  padding-inline: var(--agds-space-3);
  min-height: 3.5rem;
}

@media (min-width: 48rem) {
  .agds-main-nav__inner {
    padding-inline: var(--agds-space-8);
    flex-wrap: nowrap;
  }
}

/* ── Hamburger button (mobile only) ──────────────────────── */

.agds-main-nav__hamburger {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding: var(--agds-space-2) var(--agds-space-3);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--agds-color-action-primary);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  border-radius: var(--agds-radius-md, 0.375rem);
  transition: background-color var(--agds-transition-fast, 150ms ease);
}

.agds-main-nav__hamburger:hover {
  background-color: var(--agds-main-nav-link-hover-bg);
}

.agds-main-nav__hamburger:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-main-nav__hamburger-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Hide hamburger on desktop */
@media (min-width: 48rem) {
  .agds-main-nav__hamburger {
    display: none;
  }
}

/* ── Bottom accent border ────────────────────────────────── */

.agds-main-nav__border {
  border-bottom-width: 0.375rem;
  border-bottom-style: solid;
}

/* ── Utilities ───────────────────────────────────────────── */

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

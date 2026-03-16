<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mobileNavOpen = ref(false)

function closeNav() {
  mobileNavOpen.value = false
}

const navSections = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', to: '/' },
      { label: 'Installation', to: '/installation' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Design tokens', to: '/foundations/tokens' },
      { label: 'Colours', to: '/foundations/colours' },
      { label: 'Typography', to: '/foundations/typography' },
      { label: 'Spacing', to: '/foundations/spacing' },
      { label: 'A11y', to: '/components/visually-hidden' },
      { label: 'Core', to: '/components/core' },
      { label: 'Stack', to: '/components/stack' },
    ],
  },
  {
    title: 'Components',
    items: [{ label: 'All components', to: '/components' }],
  },
  {
    title: 'Standards',
    items: [{ label: 'Digital Service Standard', to: '/digital-service-standard' }],
  },
  {
    title: 'Coming soon',
    items: [
      { label: 'Patterns', to: '/patterns' },
      { label: 'Templates', to: '/templates' },
    ],
  },
]
</script>

<template>
  <div class="docs-layout" :class="{ 'docs-layout--nav-open': mobileNavOpen }">
    <!-- Skip link -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <!-- Mobile header -->
    <header class="docs-mobile-header" role="banner">
      <NuxtLink to="/" class="docs-mobile-header__logo" @click="closeNav"> AGDS-vue </NuxtLink>
      <button
        class="docs-mobile-header__toggle"
        :aria-expanded="mobileNavOpen"
        aria-controls="docs-nav"
        aria-label="Toggle navigation menu"
        @click="mobileNavOpen = !mobileNavOpen"
      >
        <span class="docs-mobile-header__hamburger" aria-hidden="true" />
      </button>
    </header>

    <!-- Sidebar -->
    <nav
      id="docs-nav"
      class="docs-nav"
      aria-label="Documentation navigation"
      :inert="!mobileNavOpen ? undefined : undefined"
    >
      <div class="docs-nav__inner">
        <div class="docs-nav__brand">
          <NuxtLink to="/" class="docs-nav__logo" @click="closeNav"> AGDS-vue </NuxtLink>
          <span class="docs-nav__version">v0.1.0</span>
        </div>

        <div v-for="section in navSections" :key="section.title" class="docs-nav__section">
          <p class="docs-nav__section-title">{{ section.title }}</p>
          <ul class="docs-nav__list" role="list">
            <li v-for="item in section.items" :key="item.to">
              <NuxtLink
                :to="item.to"
                class="docs-nav__link"
                active-class="docs-nav__link--active"
                @click="closeNav"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Overlay for mobile -->
    <div v-if="mobileNavOpen" class="docs-nav-overlay" aria-hidden="true" @click="closeNav" />

    <!-- Main content -->
    <main id="main-content" class="docs-main" tabindex="-1">
      <div class="docs-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.docs-layout {
  display: grid;
  grid-template-columns: 16rem 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

/* ── Skip link ───────────────────────────────────────────── */

.skip-link {
  position: fixed;
  top: -100%;
  left: var(--agds-space-4);
  background-color: var(--agds-color-bg);
  padding: var(--agds-space-2) var(--agds-space-4);
  border: 2px solid var(--agds-color-brand);
  border-radius: var(--agds-radius-md);
  font-weight: var(--agds-font-weight-semibold);
  text-decoration: none;
  color: var(--agds-color-brand);
  z-index: var(--agds-z-toast);
}

.skip-link:focus {
  top: var(--agds-space-4);
}

/* ── Mobile header ───────────────────────────────────────── */

.docs-mobile-header {
  display: none;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: space-between;
  padding: var(--agds-space-3) var(--agds-space-4);
  background-color: var(--agds-color-bg);
  border-bottom: 1px solid var(--agds-color-border);
  position: sticky;
  top: 0;
  z-index: var(--agds-z-sticky);
}

.docs-mobile-header__logo {
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-brand);
  text-decoration: none;
}

.docs-mobile-header__toggle {
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
  cursor: pointer;
  padding: 0;
}

.docs-mobile-header__toggle:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.docs-mobile-header__hamburger,
.docs-mobile-header__hamburger::before,
.docs-mobile-header__hamburger::after {
  display: block;
  width: 1.25rem;
  height: 2px;
  background-color: var(--agds-color-text);
  position: relative;
  transition: transform var(--agds-transition-fast);
}

.docs-mobile-header__hamburger::before,
.docs-mobile-header__hamburger::after {
  content: '';
  position: absolute;
  left: 0;
}

.docs-mobile-header__hamburger::before {
  top: -6px;
}
.docs-mobile-header__hamburger::after {
  top: 6px;
}

/* ── Sidebar ─────────────────────────────────────────────── */

.docs-nav {
  grid-column: 1;
  grid-row: 1 / -1;
  border-right: 1px solid var(--agds-color-border);
  background-color: var(--agds-color-bg);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}

.docs-nav__inner {
  padding: var(--agds-space-6) var(--agds-space-4);
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-6);
}

.docs-nav__brand {
  display: flex;
  align-items: baseline;
  gap: var(--agds-space-2);
  padding-bottom: var(--agds-space-4);
  border-bottom: 1px solid var(--agds-color-border);
}

.docs-nav__logo {
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-brand);
  text-decoration: none;
}

.docs-nav__version {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
  font-family: var(--agds-font-family-mono);
}

.docs-nav__section-title {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--agds-color-text-muted);
  margin: 0 0 var(--agds-space-2);
}

.docs-nav__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.docs-nav__link {
  display: block;
  padding: var(--agds-space-2) var(--agds-space-3);
  border-radius: var(--agds-radius-md);
  text-decoration: none;
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-sm);
  transition:
    background-color var(--agds-transition-fast),
    color var(--agds-transition-fast);
}

.docs-nav__link:hover {
  background-color: var(--agds-color-bg-subtle);
  color: var(--agds-color-brand);
}

.docs-nav__link--active {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-brand);
  font-weight: var(--agds-font-weight-medium);
}

.docs-nav__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Main ────────────────────────────────────────────────── */

.docs-main {
  grid-column: 2;
  grid-row: 1 / -1;
  min-width: 0;
}

.docs-content {
  max-width: 56rem;
  margin-inline: auto;
  padding: var(--agds-space-10) var(--agds-space-8);
}

/* ── Mobile overlay ──────────────────────────────────────── */

.docs-nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.4);
  z-index: calc(var(--agds-z-overlay) - 1);
}

/* ── Responsive ──────────────────────────────────────────── */

@media (max-width: 900px) {
  .docs-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  .docs-mobile-header {
    display: flex;
  }

  .docs-nav {
    grid-column: 1;
    grid-row: 2;
    position: fixed;
    inset: 0;
    width: 16rem;
    height: 100vh;
    z-index: var(--agds-z-overlay);
    transform: translateX(-100%);
    transition: transform var(--agds-transition-normal);
    border-right: 1px solid var(--agds-color-border);
    box-shadow: var(--agds-shadow-lg);
  }

  .docs-layout--nav-open .docs-nav {
    transform: translateX(0);
  }

  .docs-layout--nav-open .docs-nav-overlay {
    display: block;
  }

  .docs-main {
    grid-column: 1;
    grid-row: 2;
  }

  .docs-content {
    padding: var(--agds-space-6) var(--agds-space-4);
  }
}
</style>

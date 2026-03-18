<script setup lang="ts">
import { useAppLayoutContext } from './appLayoutContext'
import AGDSHeaderBrand from '../header/AGDSHeaderBrand.vue'
import type { HeaderDividerPosition, HeaderSize } from '../header/AGDSHeader.vue'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as AppLayoutHeaderBackground }
export type AppLayoutHeaderMaxWidth = 'container' | 'containerLg'

export interface AGDSAppLayoutHeaderProps {
  /** Site or service name — rendered as the main heading. */
  heading: string
  /** Destination href for the heading/logo link. */
  href?: string
  /** Background colour variant. */
  background?: BackgroundVariant
  /** Badge label shown next to the heading (e.g. 'Beta'). */
  badgeLabel?: string
  /** Supplementary description line beneath the heading. */
  subline?: string
  /** When two logos are present, controls where the vertical divider sits. */
  dividerPosition?: HeaderDividerPosition
  /** Maximum width of the inner container. */
  maxWidth?: AppLayoutHeaderMaxWidth
  /** Destination href for the second (co-brand) logo link. */
  secondHref?: string
  /** Controls the vertical height of the header. */
  size?: HeaderSize
}

const props = withDefaults(defineProps<AGDSAppLayoutHeaderProps>(), {
  href: '/',
  background: 'body',
  dividerPosition: 'after',
  maxWidth: 'container',
  size: 'md',
})

const { focusMode, isMobileMenuOpen, openMobileMenu } = useAppLayoutContext()

/**
 * Slots:
 *   logo        — primary logo element (img or svg)
 *   secondLogo  — second logo for co-branding
 *   account     — account section, rendered at the far right of the header row on all viewports.
 *                 The hamburger is left of the brand on mobile; hidden on desktop.
 */
</script>

<template>
  <header
    class="agds-app-layout-header"
    :class="[`agds-app-layout-header--${background}`]"
  >
    <div
      class="agds-app-layout-header__inner"
      :class="[`agds-app-layout-header__inner--${maxWidth}`]"
    >
      <!--
        Hamburger button — visible only on mobile (hidden on desktop via CSS).
        Hidden entirely in focus mode.
      -->
      <button
        v-if="!focusMode"
        type="button"
        class="agds-app-layout-header__hamburger"
        :aria-expanded="isMobileMenuOpen"
        aria-haspopup="dialog"
        aria-label="Open menu"
        aria-controls="agds-app-layout-sidebar-dialog"
        @click="openMobileMenu"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="agds-app-layout-header__hamburger-icon"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <span class="sr-only">Menu</span>
      </button>

      <!-- Brand section — logo + heading -->
      <div class="agds-app-layout-header__brand">
        <AGDSHeaderBrand
          :badge-label="badgeLabel"
          :divider-position="dividerPosition"
          :has-right-content="!!$slots.account"
          :heading="heading"
          :href="href"
          :second-href="secondHref"
          :size="size"
          :subline="subline"
        >
          <template v-if="$slots.logo" #logo>
            <slot name="logo" />
          </template>
          <template v-if="$slots.secondLogo" #secondLogo>
            <slot name="secondLogo" />
          </template>
        </AGDSHeaderBrand>
      </div>

      <!-- Account section — always at the far right -->
      <div
        v-if="$slots.account"
        class="agds-app-layout-header__account"
      >
        <slot name="account" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ── Root ────────────────────────────────────────────────── */

.agds-app-layout-header {
  display: flex;
  justify-content: center;
  color: var(--agds-color-text);
}

.agds-app-layout-header--body {
  background-color: var(--agds-color-bg);
}

.agds-app-layout-header--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Inner row ───────────────────────────────────────────── */

.agds-app-layout-header__inner {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--agds-space-4);
  padding-inline: var(--agds-space-3);
  min-height: 5.25rem;
  width: 100%;
}

.agds-app-layout-header__inner--container {
  max-width: var(--agds-header-max-width, 75rem);
}

.agds-app-layout-header__inner--containerLg {
  max-width: var(--agds-header-max-width-lg, 90rem);
}

/* ── Hamburger button ────────────────────────────────────── */

.agds-app-layout-header__hamburger {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--agds-space-1);
  padding: var(--agds-space-2) var(--agds-space-3);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--agds-color-action-primary);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-medium);
  flex-shrink: 0;
  border-radius: var(--agds-radius-sm);
  transition: background-color var(--agds-transition-fast);
}

.agds-app-layout-header__hamburger:hover {
  background-color: var(--agds-color-bg-subtle);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-app-layout-header__hamburger:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-app-layout-header__hamburger-icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Hide hamburger on desktop (≥80rem) */
@media (min-width: 80rem) {
  .agds-app-layout-header__hamburger {
    display: none;
  }
}

/* ── Brand section ───────────────────────────────────────── */

.agds-app-layout-header__brand {
  flex: 1;
  min-width: 0;
}

/* ── Account section ─────────────────────────────────────── */

.agds-app-layout-header__account {
  margin-left: auto;
  flex-shrink: 0;
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

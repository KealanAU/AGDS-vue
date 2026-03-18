<script setup lang="ts">
import AGDSHeaderBrand from './AGDSHeaderBrand.vue'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as HeaderBackground }
export type HeaderMaxWidth = 'container' | 'containerLg'
export type HeaderSize = 'sm' | 'md'
export type HeaderDividerPosition = 'after' | 'between'

export interface AGDSHeaderProps {
  /** Background colour of the header surface. */
  background?: BackgroundVariant
  /** Label shown in a badge to indicate a pre-release / beta state. */
  badgeLabel?: string
  /**
   * When using two logos, controls where the vertical dividing line sits:
   * 'between' places it between the two logos; 'after' places it after both logos.
   */
  dividerPosition?: HeaderDividerPosition
  /** The site or service name — rendered as the main heading text. */
  heading: string
  /** Destination href for the heading/logo link. Defaults to '/'. */
  href?: string
  /** Maximum width of the inner content container. */
  maxWidth?: HeaderMaxWidth
  /** Destination href for the second (co-brand) logo link. */
  secondHref?: string
  /** Controls the vertical height of the header. */
  size?: HeaderSize
  /** Supplementary description placed beneath the heading. */
  subline?: string
}

withDefaults(defineProps<AGDSHeaderProps>(), {
  background: 'body',
  dividerPosition: 'after',
  href: '/',
  maxWidth: 'container',
  size: 'md',
})

/**
 * Slots:
 *   logo        — primary logo element (img or svg)
 *   secondLogo  — second logo for co-branding
 *   rightContent — content placed in the right column (nav, search, etc.)
 */
</script>

<template>
  <header
    class="agds-header"
    :class="[
      `agds-header--${background}`,
      `agds-header--${size}`,
    ]"
  >
    <div
      class="agds-header__inner"
      :class="[`agds-header__inner--${maxWidth}`]"
    >
      <div
        class="agds-header__brand-col"
        :class="{ 'agds-header__brand-col--with-right': !!$slots.rightContent }"
      >
        <AGDSHeaderBrand
          :badge-label="badgeLabel"
          :divider-position="dividerPosition"
          :has-right-content="!!$slots.rightContent"
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

      <div
        v-if="$slots.rightContent"
        class="agds-header__right-col"
      >
        <slot name="rightContent" />
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ── Shell ────────────────────────────────────────────────── */

.agds-header {
  display: flex;
  justify-content: center;
  color: var(--agds-color-text);
}

.agds-header--body {
  background-color: var(--agds-color-bg);
}

.agds-header--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Vertical padding by size ─────────────────────────────── */

.agds-header--sm {
  padding-block: var(--agds-header-padding-y-sm);
}

.agds-header--md {
  padding-block: var(--agds-header-padding-y-md);
}

/* ── Inner container ──────────────────────────────────────── */

.agds-header__inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--agds-header-gap);
  padding-inline: var(--agds-header-padding-x);
  width: 100%;
}

.agds-header__inner--container {
  max-width: var(--agds-header-max-width);
}

.agds-header__inner--containerLg {
  max-width: var(--agds-header-max-width-lg);
}

/* ── Brand column ─────────────────────────────────────────── */

.agds-header__brand-col {
  flex: 1 1 auto;
  min-width: 0;
}

/* When right content is present, limit brand column on wide screens */
@media (min-width: 64rem) {
  .agds-header__brand-col--with-right {
    flex: 0 0 66.6667%;
    max-width: 66.6667%;
  }
}

/* ── Right column ─────────────────────────────────────────── */

.agds-header__right-col {
  flex: 1 1 auto;
  min-width: 0;
  align-self: flex-start;
}

@media (min-width: 64rem) {
  .agds-header__right-col {
    flex: 0 0 33.3333%;
    max-width: 33.3333%;
  }
}

/* Print: hide right content (matches React packs.print.hidden) */
@media print {
  .agds-header__right-col {
    display: none;
  }
}
</style>

<script setup lang="ts">
import type { HeaderDividerPosition, HeaderSize } from './AGDSHeader.vue'

export interface AgDSHeaderBrandProps {
  badgeLabel?: string
  dividerPosition?: HeaderDividerPosition
  hasRightContent?: boolean
  heading: string
  href?: string
  secondHref?: string
  size?: HeaderSize
  subline?: string
}

withDefaults(defineProps<AgDSHeaderBrandProps>(), {
  dividerPosition: 'after',
  hasRightContent: false,
  href: '/',
  size: 'md',
})

/**
 * Slots:
 *   logo       — primary logo element (img / svg)
 *   secondLogo — second logo for co-branding
 */
</script>

<template>
  <!--
    ── Dual-logo (co-branding) layout ──────────────────────────
    Rendered when BOTH logo and secondLogo slots are provided.
    Structure:
      [logo-link] [?divider-between] [second-logo-link?]   ← logos row
      [?divider-after] [heading-link]                      ← heading row
  -->
  <div
    v-if="$slots.logo && $slots.secondLogo"
    class="agds-header-brand agds-header-brand--dual"
  >
    <!-- Logos row -->
    <div
      class="agds-header-brand__logos"
      :class="{
        'agds-header-brand__logos--gap-right':
          hasRightContent && dividerPosition === 'after',
      }"
    >
      <a
        :href="href"
        class="agds-header-brand__logo-link"
        :class="[`agds-header-brand__logo-link--${size}`]"
      >
        <slot name="logo" />
      </a>

      <div
        v-if="dividerPosition === 'between'"
        class="agds-header-brand__divider agds-header-brand__divider--between"
        aria-hidden="true"
      />

      <component
        :is="secondHref ? 'a' : 'span'"
        v-bind="secondHref ? { href: secondHref } : {}"
        class="agds-header-brand__logo-link agds-header-brand__logo-link--second"
        :class="[`agds-header-brand__logo-link--${size}`]"
      >
        <slot name="secondLogo" />
      </component>
    </div>

    <!-- Heading row -->
    <div class="agds-header-brand__heading-row">
      <div
        v-if="dividerPosition === 'after'"
        class="agds-header-brand__divider agds-header-brand__divider--after"
        aria-hidden="true"
      />

      <a
        :href="href"
        class="agds-header-brand__heading-link"
      >
        <div class="agds-header-brand__title-wrap">
          <span
            class="agds-header-brand__heading"
            :class="[`agds-header-brand__heading--${size}`]"
          >{{ heading }}</span>

          <span
            v-if="badgeLabel"
            class="agds-header-brand__badge"
          >{{ badgeLabel }}</span>
        </div>

        <span
          v-if="subline"
          class="agds-header-brand__subline"
          :class="[`agds-header-brand__subline--${size}`]"
        >{{ subline }}</span>
      </a>
    </div>
  </div>

  <!--
    ── Single-logo / no-logo layout ────────────────────────────
    Logo (if provided) + heading + subline all wrapped in ONE <a>.
    The logo is decorative inside the link — its img alt text should
    still describe the logo but the link label comes from the heading.
  -->
  <a
    v-else
    :href="href"
    class="agds-header-brand agds-header-brand--single"
  >
    <div
      v-if="$slots.logo"
      class="agds-header-brand__logo-wrap"
      :class="[`agds-header-brand__logo-wrap--${size}`]"
      aria-hidden="true"
    >
      <slot name="logo" />
    </div>

    <div
      v-if="$slots.logo"
      class="agds-header-brand__divider agds-header-brand__divider--single"
      aria-hidden="true"
    />

    <div class="agds-header-brand__text">
      <div class="agds-header-brand__title-wrap">
        <span
          class="agds-header-brand__heading"
          :class="[`agds-header-brand__heading--${size}`]"
        >{{ heading }}</span>

        <span
          v-if="badgeLabel"
          class="agds-header-brand__badge"
        >{{ badgeLabel }}</span>
      </div>

      <span
        v-if="subline"
        class="agds-header-brand__subline"
        :class="[`agds-header-brand__subline--${size}`]"
      >{{ subline }}</span>
    </div>
  </a>
</template>

<style scoped>
/* ── Single / no-logo layout ──────────────────────────────── */

.agds-header-brand--single {
  display: inline-flex;
  align-items: stretch;
  flex-direction: column;
  gap: var(--agds-space-2);
  color: var(--agds-color-text);
  text-decoration: none;
}

.agds-header-brand--single:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-header-brand--single:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

@media (min-width: 48rem) {
  .agds-header-brand--single {
    flex-direction: row;
    align-items: stretch;
    gap: var(--agds-space-4);
  }
}

/* ── Logo wrap (single layout) ────────────────────────────── */

.agds-header-brand__logo-wrap {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
}

.agds-header-brand__logo-wrap :deep(img),
.agds-header-brand__logo-wrap :deep(svg) {
  width: 100%;
}

/* max-widths match React logoWidthMap */
.agds-header-brand__logo-wrap--sm {
  max-width: 12rem;
}

.agds-header-brand__logo-wrap--md {
  max-width: 12rem;
}

@media (min-width: 30rem) {
  .agds-header-brand__logo-wrap--sm {
    max-width: 14rem;
  }

  .agds-header-brand__logo-wrap--md {
    max-width: 16rem;
  }
}

/* ── Vertical dividers ────────────────────────────────────── */

/* Single layout: logo | text */
.agds-header-brand__divider--single {
  display: none;
  border-right: var(--agds-border-width-sm) solid var(--agds-color-border);
}

@media (min-width: 48rem) {
  .agds-header-brand__divider--single {
    display: block;
  }
}

/* Dual layout: between the two logos */
.agds-header-brand__divider--between {
  display: none;
  border-right: var(--agds-border-width-sm) solid var(--agds-color-border);
}

@media (min-width: 30rem) {
  .agds-header-brand__divider--between {
    display: block;
  }
}

/* Dual layout: after logos, before heading */
.agds-header-brand__divider--after {
  display: none;
  border-right: var(--agds-border-width-sm) solid var(--agds-color-border);
}

@media (min-width: 64rem) {
  .agds-header-brand__divider--after {
    display: block;
  }
}

/* ── Text block (single layout) ───────────────────────────── */

.agds-header-brand__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* ── Title row (heading + optional badge) ─────────────────── */

.agds-header-brand__title-wrap {
  display: flex;
  align-items: flex-start;
  gap: var(--agds-space-2);
}

/* ── Heading text ─────────────────────────────────────────── */

.agds-header-brand__heading {
  font-family: var(--agds-font-family-heading);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-normal);
  max-width: 32rem;
}

/* Font sizes match React headingSizeMap */
.agds-header-brand__heading--sm {
  font-size: var(--agds-font-size-md);
}

.agds-header-brand__heading--md {
  font-size: var(--agds-font-size-md);
}

@media (min-width: 30rem) {
  .agds-header-brand__heading--sm {
    font-size: var(--agds-font-size-lg);
  }

  .agds-header-brand__heading--md {
    font-size: var(--agds-font-size-xl);
  }
}

/* ── Badge ────────────────────────────────────────────────── */

.agds-header-brand__badge {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  padding: 2px var(--agds-space-2);
  font-size: 0.75rem;
  font-weight: var(--agds-font-weight-bold);
  line-height: 1;
  border: 2px solid currentColor;
  border-radius: 2em;
  white-space: nowrap;
}

/* ── Subline ──────────────────────────────────────────────── */

.agds-header-brand__subline {
  color: var(--agds-color-text-muted);
}

/* Font sizes match React subHeadingSizeMap */
.agds-header-brand__subline--sm {
  font-size: var(--agds-font-size-sm);
}

.agds-header-brand__subline--md {
  font-size: var(--agds-font-size-sm);
}

@media (min-width: 30rem) {
  .agds-header-brand__subline--md {
    font-size: var(--agds-font-size-md);
  }
}

/* ── Dual-logo layout ─────────────────────────────────────── */

.agds-header-brand--dual {
  display: inline-flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: var(--agds-space-6);
  overflow: hidden;
}

@media (min-width: 64rem) {
  .agds-header-brand--dual {
    flex-direction: row;
  }
}

/* Logos row */
.agds-header-brand__logos {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--agds-space-6);
}

/* Add end-margin when right content exists + dividerPosition=after */
.agds-header-brand__logos--gap-right {
  margin-inline-end: var(--agds-space-6);
}

@media (min-width: 30rem) {
  .agds-header-brand__logos {
    flex-direction: row;
  }
}

/* Logo links */
.agds-header-brand__logo-link {
  display: inline-flex;
  align-items: flex-start;
  flex-shrink: 0;
  color: var(--agds-color-text);
}

.agds-header-brand__logo-link :deep(img),
.agds-header-brand__logo-link :deep(svg) {
  width: 100%;
}

.agds-header-brand__logo-link--sm {
  max-width: 12rem;
}

.agds-header-brand__logo-link--md {
  max-width: 12rem;
}

@media (min-width: 30rem) {
  .agds-header-brand__logo-link--sm {
    max-width: 14rem;
  }

  .agds-header-brand__logo-link--md {
    max-width: 16rem;
  }
}

.agds-header-brand__logo-link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* Align second logo to centre on sm+, top on xs */
.agds-header-brand__logo-link--second {
  align-self: flex-start;
}

@media (min-width: 30rem) {
  .agds-header-brand__logo-link--second {
    align-self: center;
  }
}

/* Heading row */
.agds-header-brand__heading-row {
  display: flex;
  gap: var(--agds-space-6);
}

.agds-header-brand__heading-link {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--agds-color-text);
  text-decoration: none;
}

.agds-header-brand__heading-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-header-brand__heading-link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* Print: hide logos and dividers */
@media print {
  .agds-header-brand__logo-wrap,
  .agds-header-brand__logo-link,
  .agds-header-brand__divider--single,
  .agds-header-brand__divider--between,
  .agds-header-brand__divider--after {
    display: none;
  }
}

/* ── Utilities ────────────────────────────────────────────── */

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

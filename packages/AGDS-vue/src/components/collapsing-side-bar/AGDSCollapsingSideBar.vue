<script setup lang="ts">
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as CollapsingSideBarBackground }
/**
 * The HTML landmark element rendered as the collapsible sidebar root.
 *
 * - `'section'` — Generic section landmark (default). Use when the sidebar groups related content
 *   without implying a navigation or complementary role.
 * - `'aside'` — Complementary landmark. Use when the content is tangentially related to the main page content.
 * - `'nav'` — Navigation landmark. Use when the sidebar contains navigation links.
 */
export type CollapsingSideBarAs = 'section' | 'aside' | 'nav'

export interface AGDSCollapsingSideBarProps {
  /** The visible title. Required even when using the title slot. */
  title: string
  /** Optional subtitle displayed below the title. */
  subTitle?: string
  /** The HTML element to render the root as. */
  as?: CollapsingSideBarAs
  /** Set to 'bodyAlt' when the component sits on a bodyAlt background. */
  background?: BackgroundVariant
  /**
   * Accessible label for the root landmark element.
   * When omitted, the element is labelled by the heading via aria-labelledby.
   */
  ariaLabel?: string
}

const props = withDefaults(defineProps<AGDSCollapsingSideBarProps>(), {
  as: 'section',
  background: 'body',
})

// Unique IDs for aria associations — generated once per instance.
const uid = Math.random().toString(36).slice(2, 8)
const bodyId = `agds-csb-body-${uid}`
const headingId = `agds-csb-heading-${uid}`

import { ref } from 'vue'
const isOpen = ref(false)

function toggle() {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <!--
    Root landmark. aria-label takes precedence when provided (e.g. "Filters (3 active)").
    Otherwise aria-labelledby points to the heading so the landmark is self-describing.
    WCAG 1.3.1 – landmark labels convey purpose to assistive technologies.
  -->
  <component
    :is="props.as"
    class="agds-csb"
    :class="`agds-csb--bg-${props.background}`"
    :aria-label="props.ariaLabel || undefined"
    :aria-labelledby="props.ariaLabel ? undefined : headingId"
  >
    <!--
      Desktop heading container. Hidden on mobile; the toggle button serves
      as the visual affordance there.
      id is referenced by aria-labelledby on the root element.
    -->
    <div :id="headingId" class="agds-csb__heading">
      <!--
        Named slot lets consumers replace the default h2 with a custom element
        (e.g. h3 when the sidebar is nested inside another section).
        Slot default: h2 + optional subtitle paragraph.
      -->
      <slot name="title">
        <h2 class="agds-csb__title">{{ props.title }}</h2>
        <p v-if="props.subTitle" class="agds-csb__subtitle">{{ props.subTitle }}</p>
      </slot>
    </div>

    <!--
      Mobile toggle button. Hidden on desktop (≥768 px) via CSS.
      type="button" prevents accidental form submission (WCAG authoring guide).
      aria-expanded announces collapsed / expanded state (WCAG 4.1.2).
      aria-controls references the body container (WCAG 4.1.2).
      aria-label gives the button an accessible name that matches the visible label (WCAG 2.5.3).
    -->
    <button
      type="button"
      class="agds-csb__toggle"
      :aria-expanded="isOpen"
      :aria-controls="bodyId"
      :aria-label="props.title"
      @click="toggle"
    >
      <span class="agds-csb__toggle-content">
        <span class="agds-csb__toggle-text">
          <span class="agds-csb__toggle-title">{{ props.title }}</span>
          <span v-if="props.subTitle" class="agds-csb__toggle-subtitle">{{ props.subTitle }}</span>
        </span>
        <!--
          Decorative icon – aria-hidden="true" (WCAG 1.1.1).
          Rotates 180° when open via CSS class.
        -->
        <svg
          class="agds-csb__chevron"
          :class="{ 'agds-csb__chevron--open': isOpen }"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>

    <!--
      Body container.
      Mobile: hidden by default; revealed by --open class when isOpen is true.
      Desktop: always display:block via the @media override below.
    -->
    <div
      :id="bodyId"
      class="agds-csb__body"
      :class="{ 'agds-csb__body--open': isOpen }"
    >
      <slot />
    </div>
  </component>
</template>

<style scoped>
/* ── Root ──────────────────────────────────────────────────── */

.agds-csb {
  font-family: var(--agds-font-family-body);
}

.agds-csb--bg-body {
  background-color: var(--agds-color-bg);
}

.agds-csb--bg-bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Desktop heading (hidden on mobile) ──────────────────── */

.agds-csb__heading {
  display: none;
}

.agds-csb__title {
  margin: 0;
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-heading);
  color: var(--agds-color-text);
}

.agds-csb__subtitle {
  margin: var(--agds-space-1) 0 0;
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
}

/* ── Mobile toggle button ────────────────────────────────── */

.agds-csb__toggle {
  display: flex;
  width: 100%;
  padding: 0;
  background: none;
  border: none;
  border-bottom: var(--agds-border-width-md) solid var(--agds-color-border);
  cursor: pointer;
  text-align: left;
}

/* Hover background — differs per background variant */
.agds-csb--bg-body .agds-csb__toggle:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-csb--bg-bodyAlt .agds-csb__toggle:hover {
  background-color: var(--agds-color-bg-muted);
}

/* WCAG 2.4.7 – keyboard-only focus ring */
.agds-csb__toggle:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-csb__toggle-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-3);
  width: 100%;
  padding: var(--agds-space-3) var(--agds-space-4);
}

.agds-csb__toggle-text {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-csb__toggle-title {
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-heading);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-csb__toggle:hover .agds-csb__toggle-title {
  color: var(--agds-color-action-primary-hover);
}

.agds-csb__toggle-subtitle {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
}

/* ── Chevron icon ────────────────────────────────────────── */

.agds-csb__chevron {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--agds-color-action-primary);
  transition: transform var(--agds-transition-normal);
}

.agds-csb__toggle:hover .agds-csb__chevron {
  transform: scale(1.2);
}

.agds-csb__chevron--open {
  transform: rotate(180deg);
}

.agds-csb__toggle:hover .agds-csb__chevron--open {
  transform: rotate(180deg) scale(1.2);
}

/* ── Body ────────────────────────────────────────────────── */

.agds-csb__body {
  display: none;
}

.agds-csb__body--open {
  display: block;
}

/* ── Desktop overrides (≥768 px) ─────────────────────────── */

@media (min-width: 768px) {
  /* Show heading, hide toggle */
  .agds-csb__heading {
    display: block;
  }

  .agds-csb__toggle {
    display: none;
  }

  /* Body always visible on desktop regardless of isOpen */
  .agds-csb__body {
    display: block;
  }
}
</style>

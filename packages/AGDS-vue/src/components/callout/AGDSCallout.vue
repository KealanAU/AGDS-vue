<script setup lang="ts">
import { computed } from 'vue'

export type CalloutTone = 'neutral' | 'info'
export type CalloutVariant = 'compact' | 'regular' | 'feature'

export interface AGDSCalloutProps {
  /** HTML element to render as. Use 'aside' to create a landmark region. */
  as?: string
  /** Title displayed in bold above the content. */
  title?: string
  /** Controls background and border colour. */
  tone?: CalloutTone
  /** Controls padding, gap, and layout direction. */
  variant?: CalloutVariant
  /** Set true when the callout sits on a bodyAlt background (neutral tone only). */
  onBodyAlt?: boolean
  /**
   * @deprecated Use `onBodyAlt` instead.
   * 'shadeAlt' maps to the bodyAlt background for neutral tone.
   */
  background?: 'shade' | 'shadeAlt'
}

const props = withDefaults(defineProps<AGDSCalloutProps>(), {
  as: 'div',
  tone: 'neutral',
  variant: 'regular',
  onBodyAlt: false,
})

// Neutral tone switches to a slightly darker shade when placed on a bodyAlt surface.
const useBodyAltBg = computed(
  () => props.tone === 'neutral' && (props.onBodyAlt || props.background === 'shadeAlt'),
)

// Show the default info icon when tone=info and no custom icon slot is provided.
// Checked in template via $slots.icon.
const showDefaultIcon = computed(() => props.tone === 'info')
</script>

<template>
  <component
    :is="props.as"
    :class="[
      'agds-callout',
      `agds-callout--${props.tone}`,
      `agds-callout--${props.variant}`,
      { 'agds-callout--body-alt': useBodyAltBg },
    ]"
  >
    <!--
      Icon column: consumer slot takes precedence; fall back to the built-in
      info icon when tone=info. Neutral tone has no default icon.
    -->
    <span v-if="$slots.icon || showDefaultIcon" class="agds-callout__icon">
      <slot name="icon">
        <!--
          Default info icon. Announced by screen readers via role="img" + aria-label.
          WCAG 1.1.1: icon conveys meaning (tone = informational) so it needs a text alt.
        -->
        <span role="img" aria-label="Information" class="agds-callout__icon-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </slot>
    </span>

    <!-- Text content: optional title + default slot -->
    <div class="agds-callout__content">
      <p v-if="props.title" class="agds-callout__title">{{ props.title }}</p>
      <slot />
    </div>
  </component>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────── */

.agds-callout {
  display: flex;
  border-left: var(--agds-callout-border-left-width) solid;
  border-radius: var(--agds-callout-border-radius);
}

/* ── Tones ───────────────────────────────────────────────── */

.agds-callout--neutral {
  background-color: var(--agds-color-bg-subtle);
  border-color: var(--agds-color-border);
}

.agds-callout--neutral.agds-callout--body-alt {
  background-color: var(--agds-color-bg-muted);
}

.agds-callout--info {
  background-color: var(--agds-color-info-muted);
  border-color: var(--agds-color-info);
  color: var(--agds-color-info);
}

/* Body text inside info callout should stay readable, not blue. */
.agds-callout--info .agds-callout__content {
  color: var(--agds-color-text);
}

/* Title inside info callout also uses standard text colour. */
.agds-callout--info .agds-callout__title {
  color: var(--agds-color-text);
}

/* ── Variants ────────────────────────────────────────────── */

.agds-callout--compact {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--agds-callout-icon-gap-compact);
  padding: var(--agds-callout-padding-compact);
}

.agds-callout--regular {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--agds-callout-icon-gap-regular);
  padding: var(--agds-callout-padding-regular);
}

.agds-callout--feature {
  flex-direction: column;
  gap: var(--agds-callout-icon-gap-feature);
  padding: var(--agds-callout-padding-feature);
}

/* ── Icon ────────────────────────────────────────────────── */

.agds-callout__icon {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
}

.agds-callout__icon-inner {
  display: flex;
}

.agds-callout__icon svg {
  width: var(--agds-callout-icon-size-md);
  height: var(--agds-callout-icon-size-md);
}

.agds-callout--feature .agds-callout__icon svg {
  width: var(--agds-callout-icon-size-lg);
  height: var(--agds-callout-icon-size-lg);
}

/* ── Content ─────────────────────────────────────────────── */

.agds-callout__content {
  display: flex;
  flex-direction: column;
  gap: var(--agds-callout-text-gap-compact);
  min-width: 0;
  flex: 1;
}

.agds-callout--regular .agds-callout__content,
.agds-callout--feature .agds-callout__content {
  gap: var(--agds-callout-text-gap-regular);
}

/* ── Title ───────────────────────────────────────────────── */

.agds-callout__title {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-bold);
  font-size: var(--agds-font-size-sm);
  line-height: var(--agds-line-height-tight);
}

/* Compact title needs 2px top nudge to optically align baseline with the icon. */
.agds-callout--compact .agds-callout__title {
  padding-top: var(--agds-callout-title-padding-top-compact);
}

.agds-callout--regular .agds-callout__title {
  font-size: var(--agds-font-size-md);
}

.agds-callout--feature .agds-callout__title {
  font-size: var(--agds-font-size-xl);
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

export type GlobalAlertTone = 'info' | 'warning'

export interface AgDSGlobalAlertProps {
  /** Title displayed as a heading above the alert body. */
  title?: string
  /** Controls background colour and icon. Defaults to 'warning'. */
  tone?: GlobalAlertTone
  /** Called when the close button is pressed. Omit to hide the close button. */
  onClose?: () => void
}

const props = withDefaults(defineProps<AgDSGlobalAlertProps>(), {
  tone: 'warning',
})

const toneAriaLabel = computed(() => (props.tone === 'info' ? 'Information' : 'Warning'))

// Section aria-label: use title if provided, otherwise fall back to tone label.
const sectionAriaLabel = computed(() => props.title || toneAriaLabel.value)
</script>

<template>
  <section
    :class="['agds-global-alert', `agds-global-alert--${props.tone}`]"
    :aria-label="sectionAriaLabel"
  >
    <!--
      Toned icon strip (aria-hidden: tone is communicated by the section's aria-label).
      WCAG 1.3.3: colour + icon combination — icon conveys additional context visually
      but the semantic meaning lives on the section label.
    -->
    <div class="agds-global-alert__strip" aria-hidden="true">
      <!-- Info: filled circle-i -->
      <svg
        v-if="props.tone === 'info'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
          clip-rule="evenodd"
        />
      </svg>
      <!-- Warning: filled triangle-! -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
          clip-rule="evenodd"
        />
      </svg>
    </div>

    <!-- Content area -->
    <div class="agds-global-alert__body">
      <!--
        On small screens the close button is absolutely positioned (top-right),
        so we add right padding to prevent content overlapping it.
        On lg+ the button is in the normal flow so no padding is needed.
      -->
      <div
        class="agds-global-alert__inner"
        :class="{ 'agds-global-alert__inner--with-close': !!props.onClose }"
      >
        <h2 v-if="props.title" class="agds-global-alert__title">{{ props.title }}</h2>
        <div class="agds-global-alert__content">
          <slot />
        </div>
      </div>

      <!--
        Close button — only rendered when an onClose handler is provided.
        aria-label="Close" provides the accessible name (WCAG 4.1.2).
        The visible "Close" text is hidden on small screens via CSS.
      -->
      <button
        v-if="props.onClose"
        type="button"
        aria-label="Close"
        class="agds-global-alert__close"
        @click="props.onClose()"
      >
        <span class="agds-global-alert__close-label">Close</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          focusable="false"
          aria-hidden="true"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────── */

.agds-global-alert {
  display: flex;
  flex-direction: row;
}

/* ── Tones ───────────────────────────────────────────────── */

.agds-global-alert--info {
  background-color: var(--agds-color-info-muted);
}

.agds-global-alert--warning {
  background-color: var(--agds-color-warning-muted);
}

/* ── Icon strip ──────────────────────────────────────────── */

.agds-global-alert__strip {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: var(--agds-space-3);
  color: var(--agds-color-bg-body, #fff);
}

.agds-global-alert--info .agds-global-alert__strip {
  background-color: var(--agds-color-info);
}

.agds-global-alert--warning .agds-global-alert__strip {
  background-color: var(--agds-color-warning);
}

.agds-global-alert__strip svg {
  width: 1.5rem;
  height: 1.5rem;
}

/* ── Body ────────────────────────────────────────────────── */

.agds-global-alert__body {
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  padding: var(--agds-space-6);
  gap: var(--agds-space-8);
  position: relative;
}

/* ── Inner content ───────────────────────────────────────── */

.agds-global-alert__inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--agds-space-3);
  min-width: 0;
}

/*
  On small screens, reserve room for the absolutely-positioned close button
  (icon 1.25rem + 2×space-2 padding + space-6 right offset ≈ 2.5rem).
*/
.agds-global-alert__inner--with-close {
  padding-right: 2.5rem;
}

@media (min-width: 64rem) {
  /* Close button is in-flow on desktop — no padding needed. */
  .agds-global-alert__inner--with-close {
    padding-right: 0;
  }
}

/* ── Title ───────────────────────────────────────────────── */

.agds-global-alert__title {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
}

/* ── Content ─────────────────────────────────────────────── */

.agds-global-alert__content {
  color: var(--agds-color-text);
  max-width: 42rem;
}

/* ── Close button ────────────────────────────────────────── */

.agds-global-alert__close {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: var(--agds-space-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-1) var(--agds-space-2);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-tight);
  /* Absolute on small screens so it overlays the top-right corner */
  position: absolute;
  top: var(--agds-space-6);
  right: var(--agds-space-6);
}

.agds-global-alert__close:focus-visible {
  outline: 3px solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: 2px;
}

/* Static in-flow on large screens */
@media (min-width: 64rem) {
  .agds-global-alert__close {
    position: static;
    top: auto;
    right: auto;
  }
}

.agds-global-alert__close svg {
  width: 1.25rem;
  height: 1.25rem;
}

/* "Close" text: visually hidden on small screens, visible on desktop */
.agds-global-alert__close-label {
  display: none;
}

@media (min-width: 64rem) {
  .agds-global-alert__close-label {
    display: inline;
  }
}
</style>

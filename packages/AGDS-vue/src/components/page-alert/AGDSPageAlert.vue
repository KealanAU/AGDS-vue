<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue'

// ── Types ──────────────────────────────────────────────────────────────────────

/**
 * Colour tone of the page-level alert, communicating the nature of the message.
 *
 * - `'info'` — Blue; neutral information (e.g. a hint or system note).
 * - `'success'` — Green; a completed action or positive outcome.
 * - `'warning'` — Amber; a caution or potential issue that needs attention.
 * - `'error'` — Red; a validation failure or blocking problem that must be resolved.
 */
export type PageAlertTone = 'info' | 'success' | 'warning' | 'error'

// ── Props ──────────────────────────────────────────────────────────────────────

export interface AGDSPageAlertProps {
  /** Controls background colour, icon strip colour, and icon. */
  tone: PageAlertTone
  /** The title of the alert. Use the `#title` slot for rich content. */
  title?: string
  /** The `id` of the root element. Also seeds the derived child element ids. */
  id?: string
  /**
   * ARIA role for the root element.
   * @default 'region'
   */
  role?: string
  /**
   * `tabindex` on the root element. Defaults to `-1` when `focusOnMount` or
   * `focusOnUpdate` is set, so the element can receive programmatic focus.
   */
  tabIndex?: number
  /** Focus the alert as soon as it mounts. Use for dynamically-injected alerts. */
  focusOnMount?: boolean
  /**
   * Re-focus the alert whenever this value changes. Pass a primitive value,
   * array, or any reactive dependency that changes when the alert content updates.
   */
  focusOnUpdate?: ReadonlyArray<unknown> | string | number
  /** Renders a close button. Called when the button is pressed. */
  onClose?: () => void
  /**
   * @deprecated Use `onClose` instead.
   */
  onDismiss?: () => void
  /**
   * `aria-live` value for the root element. Use `"assertive"` (or set
   * `role="alert"`) for error/critical alerts injected after page load;
   * use `"polite"` for non-urgent updates. Omit when using `focusOnMount`
   * or `focusOnUpdate` instead.
   */
  ariaLive?: 'polite' | 'assertive' | 'off'
}

const props = withDefaults(defineProps<AGDSPageAlertProps>(), {
  role: 'region',
})

defineExpose({
  /** Moves keyboard focus to the alert element — useful after dynamic insertion to announce the message to screen readers. */
  focus: () => alertRef.value?.focus(),
})

// ── IDs ────────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid
const baseId     = computed(() => props.id ?? `page-alert-${uid}`)
const toneId     = computed(() => `${baseId.value}-tone`)
const titleId    = computed(() => `${baseId.value}-title`)
const childrenId = computed(() => `${baseId.value}-body`)

const slots = useSlots()
const hasTitle = computed(() => !!props.title || !!slots.title)

const ariaLabelledBy = computed(() => {
  const parts = [toneId.value]
  if (hasTitle.value) parts.push(titleId.value)
  if (slots.default) parts.push(childrenId.value)
  return parts.join(' ')
})

// ── Programmatic focus ─────────────────────────────────────────────────────────

const alertRef = ref<HTMLElement | null>(null)

const resolvedTabIndex = computed(() => {
  if (props.tabIndex !== undefined) return props.tabIndex
  if (props.focusOnMount || props.focusOnUpdate !== undefined) return -1
  return undefined
})

onMounted(() => {
  if (props.focusOnMount) alertRef.value?.focus()
})

watch(
  () => props.focusOnUpdate,
  () => { alertRef.value?.focus() },
  { deep: true },
)

// ── Tone config ────────────────────────────────────────────────────────────────

const toneMap = {
  info: {
    fg:        'var(--agds-color-info)',
    bg:        'var(--agds-color-info-muted)',
    iconLabel: 'Information',
    iconPath:  'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
  },
  success: {
    fg:        'var(--agds-color-success)',
    bg:        'var(--agds-color-success-muted)',
    iconLabel: 'Success',
    iconPath:  'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
  },
  warning: {
    fg:        'var(--agds-color-warning)',
    bg:        'var(--agds-color-warning-muted)',
    iconLabel: 'Warning',
    iconPath:  'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
  },
  error: {
    fg:        'var(--agds-color-error)',
    bg:        'var(--agds-color-error-muted)',
    iconLabel: 'Error',
    iconPath:  'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
  },
} as const satisfies Record<PageAlertTone, { fg: string; bg: string; iconLabel: string; iconPath: string }>

const toneConfig = computed(() => toneMap[props.tone])

const toneStyle = computed(() => ({
  '--pa-fg': toneConfig.value.fg,
  '--pa-bg': toneConfig.value.bg,
}))

// ── Close handler ──────────────────────────────────────────────────────────────

const closeHandler = computed(() => props.onClose ?? props.onDismiss ?? null)
</script>

<template>
  <div
    ref="alertRef"
    :id="props.id"
    :class="['agds-page-alert', `agds-page-alert--${props.tone}`]"
    :style="toneStyle"
    :role="props.role"
    :aria-labelledby="ariaLabelledBy"
    :aria-live="props.ariaLive"
    :tabindex="resolvedTabIndex"
  >
    <!--
      Toned icon strip.
      Background is the tone's foreground colour; icon is white so it reads
      against any tone. The strip is aria-hidden — tone meaning is carried by
      the visually-hidden <span> that participates in aria-labelledby (WCAG 1.1.1).
    -->
    <div class="agds-page-alert__strip" aria-hidden="true">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
        class="agds-page-alert__icon"
      >
        <path fill-rule="evenodd" clip-rule="evenodd" :d="toneConfig.iconPath" />
      </svg>
    </div>

    <!-- Body: tone label (sr-only) + optional title + optional content + close button -->
    <div
      class="agds-page-alert__body"
      :class="{ 'agds-page-alert__body--with-close': !!closeHandler }"
    >
      <div class="agds-page-alert__inner">
        <!--
          Visually-hidden tone label — first part of aria-labelledby so screen
          readers announce e.g. "Error. Save failed. Check the fields below."
        -->
        <span :id="toneId" class="agds-page-alert__sr-tone">
          {{ toneConfig.iconLabel }}.
        </span>

        <!--
          Title — string prop or rich #title slot.
          Always h2 by default; consumers can override heading level via the slot.
        -->
        <div v-if="hasTitle" :id="titleId" class="agds-page-alert__title-wrap">
          <slot name="title">
            <h2 class="agds-page-alert__title">{{ props.title }}</h2>
          </slot>
        </div>

        <!-- Body slot -->
        <div v-if="$slots.default" :id="childrenId" class="agds-page-alert__content">
          <slot />
        </div>
      </div>

      <!--
        Close button — only rendered when a handler is provided.
        "Close" text is hidden on small screens (icon only), shown on lg+.
        WCAG 4.1.2: aria-label="Close" supplies the accessible name at all sizes.
      -->
      <button
        v-if="closeHandler"
        type="button"
        aria-label="Close"
        class="agds-page-alert__close"
        @click="closeHandler()"
      >
        <span class="agds-page-alert__close-label">Close</span>
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
          class="agds-page-alert__close-icon"
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────── */

.agds-page-alert {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border-radius: var(--agds-radius-md);
  background-color: var(--pa-bg);
  position: relative;
  outline: none;
}

/*
  Focused state: use :focus (not :focus-visible) so sighted users always see
  where programmatic focus landed (WCAG 2.4.7 + programmatic-focus guidance).
*/
.agds-page-alert:focus {
  outline: 3px solid var(--agds-color-focus);
  outline-offset: 3px;
}

/* High-contrast mode (WCAG 1.4.11). */
@media (forced-colors: active) {
  .agds-page-alert {
    outline: 2px solid ButtonText;
  }
}

/* ── Icon strip ──────────────────────────────────────────── */

.agds-page-alert__strip {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: var(--agds-space-2);
  background-color: var(--pa-fg);
  /* White icon against the toned strip background */
  color: var(--agds-color-bg-body, #fff);
  border-radius: var(--agds-radius-md) 0 0 var(--agds-radius-md);
}

.agds-page-alert__icon {
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;
}

/* ── Body ────────────────────────────────────────────────── */

.agds-page-alert__body {
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  gap: var(--agds-space-8);
  padding: var(--agds-space-6);
  position: relative;
}

/* ── Inner content ───────────────────────────────────────── */

.agds-page-alert__inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: var(--agds-space-3);
  min-width: 0;
}

/*
  On small screens the close button is absolutely positioned (top-right corner).
  Reserve right padding so content does not overlap the button.
*/
.agds-page-alert__body--with-close .agds-page-alert__inner {
  padding-right: 2.5rem;
}

@media (min-width: 64rem) {
  /* Button is in-flow on large screens — no padding needed. */
  .agds-page-alert__body--with-close .agds-page-alert__inner {
    padding-right: 0;
  }
}

/* ── Visually-hidden tone label ──────────────────────────── */

.agds-page-alert__sr-tone {
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

/* ── Title ───────────────────────────────────────────────── */

.agds-page-alert__title-wrap {
  display: contents;
}

.agds-page-alert__title {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-heading);
  color: var(--agds-color-text);
}

/* ── Content ─────────────────────────────────────────────── */

.agds-page-alert__content {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  color: var(--agds-color-text);
}

/* ── Close button ────────────────────────────────────────── */

.agds-page-alert__close {
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
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text);
  /* Absolute on small screens — overlays the top-right corner */
  position: absolute;
  top: var(--agds-space-6);
  right: var(--agds-space-6);
}

.agds-page-alert__close:focus-visible {
  outline: 3px solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

/* In-flow on large screens */
@media (min-width: 64rem) {
  .agds-page-alert__close {
    position: static;
    top: auto;
    right: auto;
  }
}

.agds-page-alert__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* "Close" text: hidden on small screens, visible on large screens. */
.agds-page-alert__close-label {
  display: none;
}

@media (min-width: 64rem) {
  .agds-page-alert__close-label {
    display: inline;
  }
}
</style>

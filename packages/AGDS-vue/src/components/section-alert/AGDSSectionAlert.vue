<script setup lang="ts">
import { computed, getCurrentInstance, onMounted, ref, useSlots, watch } from 'vue'
import type { SectionAlertTone } from './sectionAlertUtils'
import { getTone, sectionAlertToneMap } from './sectionAlertUtils'

export type { SectionAlertTone, SectionAlertTones } from './sectionAlertUtils'

// ── Props ─────────────────────────────────────────────────────────────────────

export interface AGDSSectionAlertProps {
  /** Controls background colour, border colour, and icon. */
  tone: SectionAlertTone
  /** The title of the alert. Always required — it is the primary label. */
  title: string
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
}

const props = withDefaults(defineProps<AGDSSectionAlertProps>(), {
  role: 'region',
})

defineExpose({ focus: () => alertRef.value?.focus() })

// ── IDs ───────────────────────────────────────────────────────────────────────

const uid = getCurrentInstance()?.uid
const baseId     = computed(() => props.id ?? `section-alert-${uid}`)
const toneId     = computed(() => `${baseId.value}-icon`)
const titleId    = computed(() => `${baseId.value}-title`)
const childrenId = computed(() => `${baseId.value}-body`)

const slots = useSlots()
const ariaLabelledBy = computed(() => {
  const parts = [toneId.value, titleId.value]
  if (slots.default) parts.push(childrenId.value)
  return parts.join(' ')
})

// ── Programmatic focus ────────────────────────────────────────────────────────

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

// ── Resolved tone ─────────────────────────────────────────────────────────────

const resolvedTone = computed(() => getTone(props.tone))
const toneConfig   = computed(() => sectionAlertToneMap[resolvedTone.value])

const toneStyle = computed(() => ({
  '--sa-bg':           toneConfig.value.bg,
  '--sa-border-color': toneConfig.value.borderColor,
  '--sa-icon-color':   toneConfig.value.iconColor,
}))

// ── Close handler ─────────────────────────────────────────────────────────────

const closeHandler = computed(() => props.onClose ?? props.onDismiss ?? null)
</script>

<template>
  <div
    ref="alertRef"
    :id="props.id"
    :class="[
      'agds-section-alert',
      `agds-section-alert--${resolvedTone}`,
      { 'agds-section-alert--enclosed': toneConfig.enclosedBorder },
    ]"
    :style="toneStyle"
    :role="props.role"
    :aria-labelledby="ariaLabelledBy"
    :tabindex="resolvedTabIndex"
  >
    <!--
      Icon column.
      SVG is decorative (aria-hidden="true"); tone meaning is carried by the
      visually-hidden <span> that participates in aria-labelledby (WCAG 1.1.1).
    -->
    <span class="agds-section-alert__icon-wrap">
      <!-- Filled icon: fill="currentColor" with fill-rule/clip-rule on path -->
      <svg
        v-if="toneConfig.iconVariant === 'filled'"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        focusable="false"
        aria-hidden="true"
        class="agds-section-alert__icon"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          :d="toneConfig.iconPath"
        />
      </svg>

      <!-- Outline icon: stroke="currentColor", no fill -->
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        focusable="false"
        aria-hidden="true"
        class="agds-section-alert__icon"
      >
        <path :d="toneConfig.iconPath" />
      </svg>

      <!--
        Visually-hidden tone label — referenced by aria-labelledby.
        Screen readers announce e.g. "Warning. Save failed."
      -->
      <span :id="toneId" class="agds-section-alert__sr-tone">
        {{ toneConfig.iconLabel }}
      </span>
    </span>

    <!-- Text column: title + optional body slot -->
    <div class="agds-section-alert__body">
      <p :id="titleId" class="agds-section-alert__title">{{ props.title }}</p>
      <div v-if="$slots.default" :id="childrenId" class="agds-section-alert__content">
        <slot />
      </div>
    </div>

    <!--
      Close button — only rendered when a handler is provided.
      "Close" text is hidden on small screens (icon only), visible on sm+.
      WCAG 4.1.2: aria-label="Close" supplies the accessible name at all sizes.
    -->
    <button
      v-if="closeHandler"
      type="button"
      aria-label="Close"
      class="agds-section-alert__close"
      @click="closeHandler()"
    >
      <span class="agds-section-alert__close-label">Close</span>
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
        class="agds-section-alert__close-icon"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────── */

.agds-section-alert {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: var(--agds-space-3);
  padding: var(--agds-space-4);
  border-radius: var(--agds-radius-md);
  border-left: 4px solid var(--sa-border-color);
  background-color: var(--sa-bg);
  /* Allow programmatic focus without a visible ring on mouse interaction */
  outline: none;
}

/*
  Focused state: use :focus (not :focus-visible) so sighted users always see
  where programmatic focus landed (WCAG 2.4.7 + authoring guide guidance on
  focusRingFor="all" / programmatic focus).
*/
.agds-section-alert:focus {
  outline: 3px solid var(--agds-color-focus);
  outline-offset: 3px;
}

/* High-contrast mode: ensure the border remains visible (WCAG 1.4.11). */
@media (forced-colors: active) {
  .agds-section-alert {
    outline: 2px solid ButtonText;
  }
}

/* ── Enclosed modifier (Low / Medium tones) ──────────────── */

/*
  Low and Medium tones add a thin full border in addition to the left accent.
  High tones rely on the stronger background + left border alone.
*/
.agds-section-alert--enclosed {
  border: var(--agds-border-width-sm) solid var(--sa-border-color);
  border-left-width: 4px;
}

/* ── Icon wrap ───────────────────────────────────────────── */

.agds-section-alert__icon-wrap {
  display: flex;
  flex-shrink: 0;
  align-items: flex-start;
  position: relative;
  color: var(--sa-icon-color);
}

.agds-section-alert__icon {
  width: 1.5rem;
  height: 1.5rem;
}

/* Visually hidden tone label (participates in aria-labelledby). */
.agds-section-alert__sr-tone {
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

/* ── Body ────────────────────────────────────────────────── */

.agds-section-alert__body {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: var(--agds-space-2);
  min-width: 0;
}

/* Title and content always use body text colour, not the tone accent. */
.agds-section-alert__title,
.agds-section-alert__content {
  color: var(--agds-color-text);
}

/* ── Title ───────────────────────────────────────────────── */

.agds-section-alert__title {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
}

/* ── Content ─────────────────────────────────────────────── */

.agds-section-alert__content {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
}

/* ── Close button ────────────────────────────────────────── */

.agds-section-alert__close {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  align-self: flex-start;
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
}

.agds-section-alert__close:focus-visible {
  outline: 3px solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

.agds-section-alert__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* "Close" text: hidden on small screens (icon-only), visible on sm+. */
.agds-section-alert__close-label {
  display: none;
}

@media (min-width: 48rem) {
  .agds-section-alert__close-label {
    display: inline;
  }
}
</style>

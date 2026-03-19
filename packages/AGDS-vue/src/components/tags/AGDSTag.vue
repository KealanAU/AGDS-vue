<script setup lang="ts">
import { ref } from 'vue'
import AGDSIcon from '../icon/AGDSIcon.vue'

export interface AGDSTagProps {
  /** The text label displayed inside the tag. */
  label: string
  /** When provided the tag label renders as an anchor. */
  href?: string
  /** Shows a remove button. Emits `remove` when clicked. */
  removable?: boolean
}

withDefaults(defineProps<AGDSTagProps>(), {
  removable: false,
})

const emit = defineEmits<{
  remove: [event: MouseEvent]
}>()

const removeButtonRef = ref<HTMLButtonElement | null>(null)

defineExpose({ focusRemoveButton: () => removeButtonRef.value?.focus() })
</script>

<template>
  <!--
    Pill wrapper is a <span> so it can be placed inside a <li> without
    introducing block-level elements. WCAG 1.3.1: native semantics are
    preserved by using <a> for links and <span> for plain labels.
  -->
  <span class="agds-tag">
    <component
      :is="href ? 'a' : 'span'"
      v-bind="href ? { href } : {}"
      class="agds-tag__label"
      :class="{ 'agds-tag__label--link': !!href }"
    >{{ label }}</component>

    <!--
      Remove button. WCAG 4.1.2: accessible name from aria-label includes the
      tag label so users know which tag will be removed (e.g. "Remove Finance").
      WCAG 2.1.1: <button type="button"> handles Enter + Space natively.
    -->
    <button
      v-if="removable"
      ref="removeButtonRef"
      type="button"
      :aria-label="`Remove ${label}`"
      class="agds-tag__remove"
      @click="emit('remove', $event)"
    >
      <!-- Decorative icon — the button's aria-label conveys the action. -->
      <AGDSIcon name="mdi:close" size="sm" aria-hidden="true" />
    </button>
  </span>
</template>

<style scoped>
/* ── Tag pill ─────────────────────────────────────────────── */

.agds-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-tag-gap);
  padding-block: var(--agds-tag-padding-y);
  padding-inline: var(--agds-tag-padding-x);
  background-color: var(--agds-color-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-tag-border-radius);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-tag-font-size);
  line-height: 1.25;
  color: var(--agds-color-text);
}

/* ── Label ──────────────────────────────────────────────── */

.agds-tag__label {
  color: inherit;
}

.agds-tag__label--link {
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-tag__label--link:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-tag__label--link:active {
  color: var(--agds-color-action-primary-active);
}

/* WCAG 2.4.7: keyboard-only focus ring on the link. */
.agds-tag__label--link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  text-decoration: none;
  border-radius: 1px;
}

/* ── Remove button ─────────────────────────────────────── */

.agds-tag__remove {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: var(--agds-tag-remove-size);
  height: var(--agds-tag-remove-size);
  /* Pull the button flush against the pill edges without growing the pill. */
  margin-block: -0.125rem;
  margin-inline-end: -0.25rem;
  margin-inline-start: -0.25rem;
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--agds-radius-full);
  cursor: pointer;
  color: var(--agds-color-action-primary);
  transition:
    color var(--agds-transition-fast),
    transform var(--agds-transition-fast);
}

.agds-tag__remove:hover {
  color: var(--agds-color-text);
  transform: scale(1.2);
}

/* WCAG 2.4.7: keyboard-only focus ring on the remove button. */
.agds-tag__remove:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* Windows High Contrast Mode: ensure the border remains visible. */
@media (forced-colors: active) {
  .agds-tag {
    border-color: ButtonText;
  }

  .agds-tag__remove {
    forced-color-adjust: none;
    color: ButtonText;
  }
}
</style>

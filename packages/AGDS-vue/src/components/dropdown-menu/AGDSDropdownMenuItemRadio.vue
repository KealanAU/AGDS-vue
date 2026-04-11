<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui'

export interface AGDSDropdownMenuItemRadioProps {
  checked: boolean
  /**
   * Optional id for the item element.
   * Note: Reka UI manages focus via roving tabindex rather than aria-activedescendant,
   * so this id is applied to the rendered element for external reference only.
   */
  id?: string
  secondaryText?: string
}

const props = defineProps<AGDSDropdownMenuItemRadioProps>()

const emit = defineEmits<{
  /**
   * Emitted when the item is selected (click or keyboard activation).
   * Note: the event payload has changed from the old custom implementation.
   * The old implementation emitted an empty `click: []` tuple; this now
   * emits a `select` event forwarded from Reka's DropdownMenuItem.
   */
  click: []
}>()
</script>

<template>
  <!--
    We use DropdownMenuItem (not DropdownMenuRadioItem) with as-child so we can
    preserve the existing per-item `checked` boolean API. DropdownMenuRadioItem
    requires a DropdownMenuRadioGroup parent with a shared modelValue, which
    would be a breaking API change for consumers.

    Our rendered element sets role="menuitemradio" and aria-checked directly.
    Reka still provides keyboard navigation, focus management, and close-on-select.
  -->
  <DropdownMenuItem as-child @select="() => emit('click')">
    <div
      :id="id"
      role="menuitemradio"
      :aria-checked="checked"
      :class="[
        'agds-dm-radio',
        {
          'agds-dm-radio--checked': checked,
        },
      ]"
    >
      <div class="agds-dm-radio__stack">
        <span
          :class="[
            'agds-dm-radio__label',
            { 'agds-dm-radio__label--checked': checked },
          ]"
        >
          <slot />
        </span>
        <span v-if="secondaryText" class="agds-dm-radio__secondary">
          {{ secondaryText }}
        </span>
      </div>
      <div v-if="$slots.endElement" class="agds-dm-radio__end">
        <slot name="endElement" />
      </div>
    </div>
  </DropdownMenuItem>
</template>

<style scoped>
.agds-dm-radio {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-4);
  padding: var(--agds-space-4);
  min-width: 18rem;
  background-color: var(--agds-color-bg);
  cursor: pointer;
  transition: background-color var(--agds-transition-fast);
  outline: none;
}

/* Reka sets data-highlighted on the focused/hovered item */
.agds-dm-radio[data-highlighted],
.agds-dm-radio:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-dm-radio[data-highlighted] .agds-dm-radio__label,
.agds-dm-radio:hover .agds-dm-radio__label {
  text-decoration: underline;
  color: var(--agds-color-text);
}

.agds-dm-radio--checked {
  background-color: var(--agds-color-brand-muted);
}

.agds-dm-radio--checked::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  background-color: var(--agds-color-brand);
}

.agds-dm-radio:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: -2px;
}

.agds-dm-radio__stack {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
}

.agds-dm-radio__label {
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  color: var(--agds-color-action-primary);
  font-weight: var(--agds-font-weight-normal);
}

.agds-dm-radio__label--checked {
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold);
}

.agds-dm-radio__secondary {
  font-size: var(--agds-font-size-xs);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-normal);
}

.agds-dm-radio__end {
  flex-shrink: 0;
}
</style>

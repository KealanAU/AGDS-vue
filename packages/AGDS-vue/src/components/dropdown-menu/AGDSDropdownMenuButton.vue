<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDropdownMenuContext } from './dropdownMenuContext'

export interface AgDSDropdownMenuButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'text'
  size?: 'sm' | 'md' | 'lg'
  block?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<AgDSDropdownMenuButtonProps>(), {
  variant: 'text',
  size: 'md',
  block: false,
  disabled: false,
})

const { isMenuOpen, buttonId, panelId, toggleMenu, openMenuWithKey, triggerRef } = useDropdownMenuContext()

const buttonEl = ref<HTMLButtonElement | null>(null)

onMounted(() => {
  triggerRef.value = buttonEl.value
})

function handleClick() {
  buttonEl.value?.focus()
  toggleMenu()
}

function handleKeydown(event: KeyboardEvent) {
  const supported = ['ArrowDown', 'ArrowUp', 'Space', 'Enter']
  if (!supported.includes(event.code)) return
  event.preventDefault()
  openMenuWithKey(event.code)
}
</script>

<template>
  <button
    ref="buttonEl"
    :id="buttonId"
    type="button"
    :disabled="disabled"
    :aria-haspopup="true"
    :aria-controls="panelId"
    :aria-expanded="isMenuOpen"
    :class="[
      'agds-button',
      `agds-button--${variant}`,
      `agds-button--${size}`,
      { 'agds-button--block': block },
      'agds-dropdown-menu-btn',
    ]"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <span class="agds-button__label agds-dropdown-menu-btn__label">
      <slot />
    </span>
    <span
      aria-hidden="true"
      class="agds-dropdown-menu-btn__chevron"
      :class="{ 'agds-dropdown-menu-btn__chevron--open': isMenuOpen }"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </span>
  </button>
</template>

<style scoped>
/* Button base — duplicated from AGDSButton.vue since scoped styles don't cross components */
.agds-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--agds-space-2);
  border-width: var(--agds-button-border-width);
  border-style: solid;
  border-radius: var(--agds-button-border-radius);
  padding-inline: var(--agds-button-padding-x-md);
  height: var(--agds-button-height-md);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-button-font-size-md);
  font-weight: var(--agds-button-font-weight);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  appearance: none;
  -webkit-appearance: none;
  transition:
    background-color var(--agds-transition-fast),
    border-color var(--agds-transition-fast),
    color var(--agds-transition-fast);
}

.agds-button--block { width: 100%; }

.agds-button--sm {
  height: var(--agds-button-height-sm);
  padding-inline: var(--agds-button-padding-x-sm);
  font-size: var(--agds-button-font-size-sm);
}
.agds-button--lg {
  height: var(--agds-button-height-lg);
  padding-inline: var(--agds-button-padding-x-lg);
  font-size: var(--agds-button-font-size-lg);
}

.agds-button--primary {
  background-color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary-fg);
}
.agds-button--primary:hover:not(:disabled) {
  background-color: var(--agds-color-action-primary-hover);
  border-color: var(--agds-color-action-primary-hover);
}

.agds-button--secondary {
  background-color: transparent;
  border-color: var(--agds-color-action-primary);
  color: var(--agds-color-action-primary);
}
.agds-button--secondary:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  border-color: var(--agds-color-action-primary-hover);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--tertiary {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.agds-button--tertiary:hover:not(:disabled) {
  background-color: var(--agds-color-brand-muted);
  color: var(--agds-color-action-primary-hover);
}

.agds-button--text {
  background-color: transparent;
  border-color: transparent;
  color: var(--agds-color-action-primary);
  text-decoration: none;
  padding-inline: 0;
  height: auto;
}
.agds-button--text:hover:not(:disabled) {
  color: var(--agds-color-action-primary-hover);
}

.agds-button:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

/* Dropdown-specific */
.agds-dropdown-menu-btn {
  gap: var(--agds-space-2);
}

.agds-dropdown-menu-btn__label {
  display: inline-flex;
  align-items: center;
}

.agds-dropdown-menu-btn__chevron {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  transition: transform var(--agds-transition-fast);
}

.agds-dropdown-menu-btn__chevron--open {
  transform: rotate(180deg);
}
</style>

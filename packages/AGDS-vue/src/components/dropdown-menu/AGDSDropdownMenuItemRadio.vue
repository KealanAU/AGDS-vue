<script setup lang="ts">
import { computed, ref, watch, getCurrentInstance } from 'vue'
import { useDropdownMenuContext } from './dropdownMenuContext'

export interface AgDSDropdownMenuItemRadioProps {
  checked: boolean
  id?: string
  secondaryText?: string
}

const props = defineProps<AgDSDropdownMenuItemRadioProps>()

const emit = defineEmits<{
  click: []
}>()

const { menuId, activeDescendantId, closeMenu } = useDropdownMenuContext()

const uid = getCurrentInstance()?.uid ?? 0
const itemId = computed(() => props.id ?? `${menuId}-item-${uid}`)
const isActive = computed(() => itemId.value === activeDescendantId.value)

const itemEl = ref<HTMLElement | null>(null)

watch(isActive, (active) => {
  if (active && typeof itemEl.value?.scrollIntoView === 'function') {
    itemEl.value.scrollIntoView({ block: 'nearest' })
  }
})

function handleClick() {
  emit('click')
  closeMenu()
}
</script>

<template>
  <div
    ref="itemEl"
    :id="itemId"
    role="menuitemradio"
    tabindex="-1"
    :aria-checked="checked"
    :class="[
      'agds-dm-radio',
      {
        'agds-dm-radio--active': isActive,
        'agds-dm-radio--checked': checked,
      },
    ]"
    @click="handleClick"
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
}

.agds-dm-radio:hover,
.agds-dm-radio--active {
  background-color: var(--agds-color-bg-subtle);
}

.agds-dm-radio:hover .agds-dm-radio__label,
.agds-dm-radio--active .agds-dm-radio__label {
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

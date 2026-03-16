<script setup lang="ts">
import { computed, ref } from 'vue'
import AgDSButton from './AGDSButton.vue'
import type { ButtonSize, ButtonVariant } from './AGDSButton.vue'
import AgDSIcon from '../icon/AGDSIcon.vue'

export interface AgDSToggleButtonProps {
  /** The current pressed state of the button. */
  pressed: boolean
  /** The label shown in the default (unpressed) state. */
  label: string
  /** The label shown in the pressed state. */
  pressedLabel: string
  /** When true, visually hides the label (still exposed to screen readers via aria-label). */
  hiddenLabel?: boolean
  /** Determines the icon pair used in the default and pressed state. */
  iconType?: 'flag' | 'star'
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
}

const ICON_MAP = {
  flag: { false: 'mdi:flag-outline', true: 'mdi:flag' },
  star: { false: 'mdi:star-outline', true: 'mdi:star' },
} as const

const props = withDefaults(defineProps<AgDSToggleButtonProps>(), {
  hiddenLabel: false,
  iconType: 'flag',
  size: 'md',
  variant: 'text',
  disabled: false,
})

const emit = defineEmits<{
  'update:pressed': [value: boolean]
}>()

const buttonRef = ref<InstanceType<typeof AgDSButton> | null>(null)

defineExpose({ focus: () => buttonRef.value?.focus() })

const resolvedLabel = computed(() =>
  props.pressed ? props.pressedLabel : props.label,
)

const iconName = computed(() =>
  ICON_MAP[props.iconType][String(props.pressed) as 'true' | 'false'],
)

function handleClick() {
  if (!props.disabled) {
    emit('update:pressed', !props.pressed)
  }
}
</script>

<template>
  <AgDSButton
    ref="buttonRef"
    type="button"
    :size="props.size"
    :variant="props.variant"
    :disabled="props.disabled"
    :aria-pressed="props.pressed"
    :aria-label="props.hiddenLabel ? resolvedLabel : undefined"
    @click="handleClick"
  >
    <template #iconBefore>
      <AgDSIcon :name="iconName" aria-hidden="true" />
    </template>
    <template v-if="!props.hiddenLabel" #default>
      {{ resolvedLabel }}
    </template>
  </AgDSButton>
</template>

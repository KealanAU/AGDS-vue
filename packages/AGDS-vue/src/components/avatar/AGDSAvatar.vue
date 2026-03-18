<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { getInitialsFromName } from './utils'

export type AvatarTone = 'neutral' | 'action'
export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl'

export interface AGDSAvatarProps {
  /** The name of the person represented by the avatar. Used to derive initials and as the default accessible label. */
  name: string
  /** The colour tone to apply. */
  tone?: AvatarTone
  /** The size to apply. */
  size?: AvatarSize
}

// Disable automatic attribute inheritance so we can control where aria-* land.
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<AGDSAvatarProps>(), {
  tone: 'neutral',
  size: 'md',
})

// $attrs contains any non-prop attributes passed by the consumer (aria-hidden, aria-label, data-*, etc.)
const attrs = useAttrs()

const initials = computed(() => getInitialsFromName(props.name))

// Support both boolean true and the string "true" — both are valid when passed from templates.
const isHidden = computed(
  () => attrs['aria-hidden'] === true || attrs['aria-hidden'] === 'true',
)

// Default aria-label to name so the avatar is accessible out of the box.
// Consumers can override by passing aria-label explicitly, or suppress
// entirely with aria-hidden="true".
const ariaLabel = computed(() => {
  if (isHidden.value) return undefined
  if ('aria-label' in attrs) return (attrs['aria-label'] as string) || undefined
  return props.name
})
</script>

<template>
  <!--
    v-bind="attrs" spreads all non-prop attrs (class, data-*, etc.) first.
    The explicit bindings below take precedence and control the a11y contract.
  -->
  <span
    v-bind="attrs"
    :class="[
      'agds-avatar',
      `agds-avatar--${props.tone}`,
      `agds-avatar--${props.size}`,
    ]"
    :role="isHidden ? undefined : 'img'"
    :aria-label="ariaLabel"
    :aria-hidden="isHidden ? 'true' : undefined"
  >{{ initials }}</span>
</template>

<style scoped>
/* ── Base ────────────────────────────────────────────────── */

.agds-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  background-color: var(--agds-color-bg-muted);
  border-radius: var(--agds-radius-full);
  border-style: solid;
  border-width: var(--agds-border-width-sm);

  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-bold);
  line-height: 1;
  text-decoration: none;
  user-select: none;
}

/* ── Tones ───────────────────────────────────────────────── */

.agds-avatar--neutral {
  color: var(--agds-color-text-muted);
  border-color: var(--agds-color-text-muted);
}

.agds-avatar--action {
  color: var(--agds-color-action-primary);
  border-color: var(--agds-color-action-primary);
}

/* ── Sizes ───────────────────────────────────────────────── */

.agds-avatar--sm {
  width: var(--agds-avatar-size-sm);
  height: var(--agds-avatar-size-sm);
  font-size: var(--agds-avatar-font-size-sm);
}

.agds-avatar--md {
  width: var(--agds-avatar-size-md);
  height: var(--agds-avatar-size-md);
  font-size: var(--agds-avatar-font-size-md);
}

.agds-avatar--lg {
  width: var(--agds-avatar-size-lg);
  height: var(--agds-avatar-size-lg);
  font-size: var(--agds-avatar-font-size-lg);
}

.agds-avatar--xl {
  width: var(--agds-avatar-size-xl);
  height: var(--agds-avatar-size-xl);
  font-size: var(--agds-avatar-font-size-xl);
}

.agds-avatar--xxl {
  width: var(--agds-avatar-size-xxl);
  height: var(--agds-avatar-size-xxl);
  font-size: var(--agds-avatar-font-size-xxl);
}

.agds-avatar--xxxl {
  width: var(--agds-avatar-size-xxxl);
  height: var(--agds-avatar-size-xxxl);
  font-size: var(--agds-avatar-font-size-xxxl);
}
</style>

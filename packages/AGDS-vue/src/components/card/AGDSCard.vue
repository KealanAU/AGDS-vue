<script setup lang="ts">
import { computed, provide, reactive, useSlots } from 'vue'
import { CARD_CONTEXT_KEY } from './cardContext'

export interface AGDSCardProps {
  /** HTML element to render as. Use 'li' when cards appear in a list. */
  as?: string
  /** Background colour of the card surface. */
  background?: 'body' | 'bodyAlt'
  /** Makes the entire card surface clickable via a CardLink stretch. */
  clickable?: boolean
  /** Renders the footer slot outside the card's border box. */
  footerOutside?: boolean
  /** Adds a drop shadow to the card. */
  shadow?: boolean
}

const props = withDefaults(defineProps<AGDSCardProps>(), {
  as: 'div',
  background: 'body',
  clickable: false,
  footerOutside: false,
  shadow: false,
})

const slots = useSlots()

const hasFooter = computed(() => !!slots.footer)

// Provide reactive context — children (CardInner, CardFooter, CardLink) consume this.
provide(
  CARD_CONTEXT_KEY,
  reactive({
    get background() {
      return props.background
    },
    get clickable() {
      return props.clickable
    },
    get hasFooter() {
      return hasFooter.value
    },
    get footerOutside() {
      return props.footerOutside
    },
    get shadow() {
      return props.shadow
    },
  }),
)

// Classes applied to whichever element carries the card's visual treatment
// (root when !footerOutside, inner-wrap div when footerOutside).
const styledClasses = computed(() => [
  `agds-card--${props.background}`,
  props.shadow && 'agds-card--shadow',
  props.clickable && 'agds-card--clickable',
])
</script>

<template>
  <!--
    footerOutside mode: root is an unstyled flex wrapper; an inner div carries
    the card border/background so the footer slot renders visually below the box.
  -->
  <component
    v-if="props.footerOutside"
    :is="props.as"
    class="agds-card agds-card--footer-outside"
  >
    <div class="agds-card__wrap" :class="styledClasses">
      <slot name="header" />
      <slot />
    </div>
    <slot name="footer" />
  </component>

  <!-- Normal mode: root element carries all card styling. -->
  <component v-else :is="props.as" class="agds-card" :class="styledClasses">
    <slot name="header" />
    <slot />
    <slot name="footer" />
  </component>
</template>

<style scoped>
/* ── Layout ──────────────────────────────────────────────── */

.agds-card {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.agds-card__wrap {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

/* ── Backgrounds — also carry border, radius, overflow ───── */

.agds-card--body,
.agds-card--bodyAlt {
  border: var(--agds-card-border-width) solid var(--agds-card-border-color);
  border-radius: var(--agds-card-border-radius);
  overflow: hidden; /* clip children to rounded corners */
  position: relative; /* anchor for CardLink ::after stretch */
}

.agds-card--body {
  background-color: var(--agds-color-bg);
}

.agds-card--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Shadow ──────────────────────────────────────────────── */

.agds-card--shadow {
  box-shadow: var(--agds-card-shadow-sm);
}

/* Hover enlarges shadow only on clickable cards. */
.agds-card--clickable.agds-card--shadow:hover {
  box-shadow: var(--agds-card-shadow-md);
}

/* ── Clickable focus ring ─────────────────────────────────── */

/* Applied when any descendant receives :focus-visible. */
.agds-card--clickable:has(:focus-visible) {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 3px;
}

/* Fallback for browsers without :has() support. */
@supports not selector(:has(*)) {
  .agds-card--clickable:focus-within {
    outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
    outline-offset: 3px;
  }
}
</style>

<script setup lang="ts">
import { provide } from 'vue'
import { CONTENT_SPACING_KEY, type ContentSpacing } from './contentContext'

export interface AGDSBaseContentProps {
  /** HTML element to render the outer wrapper as. */
  as?: string
  /** Background colour of the content band. */
  background?: 'body' | 'bodyAlt'
  /** Maximum width of the inner content container. */
  maxWidth?: 'container' | 'containerLg'
  /** Vertical padding variant — consumed internally by SectionContent / PageContent / Content. */
  paddingY: ContentSpacing
  /** HTML id placed on the outer wrapper. */
  id?: string
}

const props = withDefaults(defineProps<AGDSBaseContentProps>(), {
  as: 'div',
  maxWidth: 'container',
})

// Provide spacing to descendant ContentBleed components.
provide(CONTENT_SPACING_KEY, props.paddingY)
</script>

<template>
  <component
    :is="props.as"
    :id="props.id"
    class="agds-content"
    :class="[
      props.background && `agds-content--${props.background}`,
      `agds-content--${props.paddingY}`,
    ]"
  >
    <div
      class="agds-content__inner"
      :class="`agds-content__inner--${props.maxWidth === 'containerLg' ? 'container-lg' : 'container'}`"
    >
      <slot />
    </div>
  </component>
</template>

<style scoped>
/* ── Outer wrapper ─────────────────────────────────────── */

.agds-content {
  display: flex;
  justify-content: center;
}

/* ── Backgrounds ────────────────────────────────────────── */

.agds-content--body {
  background-color: var(--agds-color-bg);
}

.agds-content--body-alt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Inner container ────────────────────────────────────── */

.agds-content__inner {
  width: 100%;
  box-sizing: border-box;
  padding-left: var(--agds-content-padding-x);
  padding-right: var(--agds-content-padding-x);
}

@media (min-width: 768px) {
  .agds-content__inner {
    padding-left: var(--agds-content-padding-x-md);
    padding-right: var(--agds-content-padding-x-md);
  }
}

/* ── Max widths ─────────────────────────────────────────── */

.agds-content__inner--container {
  max-width: var(--agds-content-max-width);
}

.agds-content__inner--container-lg {
  max-width: var(--agds-content-max-width-lg);
}

/* ── Vertical padding: none ─────────────────────────────── */

.agds-content--none .agds-content__inner {
  padding-top: 0;
  padding-bottom: 0;
}

/* ── Vertical padding: section ──────────────────────────── */

.agds-content--section .agds-content__inner {
  padding-top: var(--agds-section-content-padding-y);
  padding-bottom: var(--agds-section-content-padding-y);
}

@media (min-width: 768px) {
  .agds-content--section .agds-content__inner {
    padding-top: var(--agds-section-content-padding-y-md);
    padding-bottom: var(--agds-section-content-padding-y-md);
  }
}

/* ── Vertical padding: page ─────────────────────────────── */

.agds-content--page .agds-content__inner {
  padding-top: var(--agds-page-content-padding-top);
  padding-bottom: var(--agds-page-content-padding-bottom);
}

@media (min-width: 768px) {
  .agds-content--page .agds-content__inner {
    padding-top: var(--agds-page-content-padding-top-md);
    padding-bottom: var(--agds-page-content-padding-bottom-md);
  }
}
</style>

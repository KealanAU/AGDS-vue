<script setup lang="ts">
export interface AGDSFooterProps {
  /** Background colour of the footer surface. */
  background?: 'body' | 'bodyAlt'
  /** Maximum width of the inner content container. */
  maxWidth?: 'container' | 'containerLg'
}

withDefaults(defineProps<AGDSFooterProps>(), {
  background: 'body',
  maxWidth: 'container',
})
</script>

<template>
  <footer
    class="agds-footer"
    :class="[`agds-footer--${background}`]"
  >
    <div
      class="agds-footer__inner"
      :class="[`agds-footer__inner--${maxWidth}`]"
    >
      <slot />
    </div>
  </footer>
</template>

<style scoped>
/* ── Footer shell ─────────────────────────────────────────── */

.agds-footer {
  border-top: var(--agds-footer-border-top-width) solid var(--agds-footer-border-color);
  color: var(--agds-color-text);
  display: flex;
  justify-content: center;
  padding-block: var(--agds-footer-padding-y);
}

/* Suppress default list margin inside footer (matches React: li { marginLeft: 0 }) */
.agds-footer :deep(li) {
  margin-left: 0;
}

/* ── Backgrounds ──────────────────────────────────────────── */

.agds-footer--body {
  background-color: var(--agds-color-bg);
}

.agds-footer--bodyAlt {
  background-color: var(--agds-color-bg-subtle);
}

/* ── Inner container ──────────────────────────────────────── */

.agds-footer__inner {
  display: flex;
  flex-direction: column;
  gap: var(--agds-footer-gap);
  padding-inline: var(--agds-footer-padding-x);
  width: 100%;
}

.agds-footer__inner--container {
  max-width: var(--agds-footer-max-width);
}

.agds-footer__inner--containerLg {
  max-width: var(--agds-footer-max-width-lg);
}
</style>

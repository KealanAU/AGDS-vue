<script setup lang="ts">
export interface SkipLink {
  /** Visible text for the skip link. */
  label: string
  /** Target anchor `href`, e.g. `'#main-content'`. */
  href: string
}

export interface AGDSSkipLinksProps {
  /** One or more skip-link destinations. */
  links: SkipLink[]
  /**
   * Accessible label for the wrapping `<nav>` landmark.
   * @default 'Skip links'
   */
  ariaLabel?: string
}

withDefaults(defineProps<AGDSSkipLinksProps>(), {
  ariaLabel: 'Skip links',
})
</script>

<template>
  <nav :aria-label="ariaLabel" class="agds-skip-links">
    <a
      v-for="(link, index) in links"
      :key="index"
      :href="link.href"
      class="agds-skip-link"
    >
      {{ link.label }}
    </a>
  </nav>
</template>

<style scoped>
/* ── Skip link ───────────────────────────────────────────── */

.agds-skip-links {
  /* The nav itself takes no space — all positioning is on the anchors */
}

.agds-skip-link {
  /* Visually hidden baseline */
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;

  /* When focused: reveal as a primary-button-styled anchor */
  &:focus-visible {
    top: var(--agds-space-4);
    left: var(--agds-space-4);
    clip: auto;
    clip-path: none;
    overflow: visible;
    white-space: nowrap;
    width: auto;
    height: auto;
    margin: 0;
    z-index: 999; /* tokens.zIndex.skipLink */

    /* Primary button appearance */
    display: inline-flex;
    align-items: center;
    justify-content: center;

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

    background-color: var(--agds-color-action-primary);
    border-color: var(--agds-color-action-primary);
    color: var(--agds-color-action-primary-fg);
  }
}
</style>

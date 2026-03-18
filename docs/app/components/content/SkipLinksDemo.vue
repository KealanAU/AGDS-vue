<template>
  <div class="skip-links-demo">
    <AGDSSkipLinks
      :links="[{ label: 'Skip to main content', href: '#main-content' }]"
    />
    <p class="skip-links-demo__hint">
      Tab into this area to reveal the skip link
    </p>
  </div>
</template>

<style scoped>
/*
 * Force the skip link to always render in its revealed (focused) state
 * inside the demo canvas so it is visible without keyboard interaction.
 */
.skip-links-demo {
  position: relative;
  min-height: 4rem;
}

.skip-links-demo :deep(.agds-skip-link) {
  /* Override the sr-only hidden state */
  position: static;
  width: auto;
  height: auto;
  padding: unset;
  margin: 0;
  overflow: visible;
  clip: auto;
  clip-path: none;
  white-space: nowrap;

  /* Primary button appearance (mirrors the :focus-visible styles) */
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

.skip-links-demo__hint {
  margin-top: var(--agds-space-3);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}
</style>

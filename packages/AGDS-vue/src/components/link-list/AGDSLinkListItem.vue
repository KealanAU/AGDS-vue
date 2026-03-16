<script setup lang="ts">
export interface AgDSLinkListItemProps {
  /** URL the link navigates to */
  href: string
  /** Visible label text */
  label: string
  /** Opens in a new tab when '_blank'. Adds rel and sr-only text automatically. */
  target?: string
}

defineProps<AgDSLinkListItemProps>()
</script>

<template>
  <li class="agds-link-list-item">
    <a
      :href="href"
      :target="target"
      :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
      class="agds-link-list-item__link"
    >
      {{ label }}
      <span v-if="target === '_blank'" class="sr-only">, opens in a new tab</span>
    </a>
  </li>
</template>

<style scoped>
.agds-link-list-item {
  list-style: none;
}

.agds-link-list-item__link {
  color: var(--agds-color-action-primary);
  font-size: var(--agds-font-size-md);
  font-family: var(--agds-font-family-body);
  font-weight: var(--agds-font-weight-normal);
  line-height: var(--agds-line-height-normal);
  text-decoration: underline;
}

.agds-link-list-item__link:hover {
  text-decoration: none;
}

.agds-link-list-item__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

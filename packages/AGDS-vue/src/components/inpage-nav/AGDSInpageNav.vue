<script setup lang="ts">
export interface InpageNavLink {
  /** Display label for the link. */
  label: string
  /** The URL the link points to. */
  href: string
}

export interface AGDSInpageNavProps {
  /** Describes the navigation landmark to assistive technologies. Defaults to 'In page'. */
  ariaLabel?: string
  /** The list of anchor links to display. */
  links: InpageNavLink[]
  /** Optional heading displayed above the link list. */
  title?: string
}

const props = withDefaults(defineProps<AGDSInpageNavProps>(), {
  ariaLabel: 'In page',
})
</script>

<template>
  <!--
    WCAG 1.3.1: <nav> provides the landmark role; aria-label distinguishes it
    from other nav landmarks on the page (e.g. main nav, breadcrumbs).
  -->
  <nav class="agds-inpage-nav" :aria-label="props.ariaLabel">
    <!--
      WCAG 1.3.1: Optional section heading. Rendered as <h2> — consumers should
      adjust the heading level via a slot if needed. Kept as a prop here to
      match the original AGDS React API.
    -->
    <h2 v-if="props.title" class="agds-inpage-nav__title">{{ props.title }}</h2>

    <!--
      WCAG 1.3.1: <ul> conveys list semantics (count + items) to screen readers.
      WCAG 2.4.4: each link's visible text is its accessible name.
    -->
    <ul class="agds-inpage-nav__list">
      <li
        v-for="(link, index) in props.links"
        :key="index"
        class="agds-inpage-nav__item"
      >
        <a :href="link.href" class="agds-inpage-nav__link">{{ link.label }}</a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* ── Container ───────────────────────────────────────────── */

.agds-inpage-nav {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-4);
  border-left: 4px solid var(--agds-color-border-brand);
  padding-left: var(--agds-space-6);
  font-family: var(--agds-font-family-body);
}

/* ── Title ───────────────────────────────────────────────── */

.agds-inpage-nav__title {
  margin: 0;
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-snug);
  color: var(--agds-color-text);
}

/* ── Link list ───────────────────────────────────────────── */

.agds-inpage-nav__list {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.agds-inpage-nav__item {
  display: flex;
}

/* ── Links ───────────────────────────────────────────────── */

/*
  WCAG 1.4.3: action primary (#00698f) on white → 4.6:1 ✓
  WCAG 2.4.7: :focus-visible ring instead of :focus so the ring only shows
  for keyboard navigation, not mouse clicks.
*/
.agds-inpage-nav__link {
  color: var(--agds-color-action-primary);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-inpage-nav__link:hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-inpage-nav__link:active {
  color: var(--agds-color-action-primary-active);
}

.agds-inpage-nav__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  text-decoration: none;
  border-radius: 1px;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import type { BackgroundVariant } from '../../core'

export type { BackgroundVariant as SubNavBackground }

export interface SubNavLink {
  href: string
  /** Visible link text. */
  label: string
  /** Optional short text appended after the label (e.g. a count badge). */
  endElement?: string
}

export interface AgDSSubNavProps {
  /** Navigation links. */
  links: SubNavLink[]
  /** Highlights the link whose href best matches this path. */
  activePath?: string
  /** Accessible label for the <nav> landmark. Defaults to 'Content'. */
  ariaLabel?: string
  /** HTML id placed on the <nav> element. */
  id?: string
  /** Set to 'bodyAlt' when the nav sits on a bodyAlt background. */
  background?: BackgroundVariant
}

const props = withDefaults(defineProps<AgDSSubNavProps>(), {
  ariaLabel: 'Content',
  background: 'body',
})

function findBestMatch(links: SubNavLink[], activePath?: string): string {
  if (!activePath) return ''
  for (const link of links) {
    if (link.href === activePath) return link.href
  }
  let best = ''
  for (const link of links) {
    if (activePath.startsWith(link.href) && link.href.length > best.length) {
      best = link.href
    }
  }
  return best
}

const bestMatch = computed(() => findBestMatch(props.links, props.activePath))
</script>

<template>
  <nav
    class="agds-sub-nav"
    :class="`agds-sub-nav--bg-${props.background}`"
    :aria-label="props.ariaLabel"
    :id="props.id || undefined"
  >
    <ul class="agds-sub-nav__list">
      <li
        v-for="link in props.links"
        :key="link.href"
        class="agds-sub-nav__item"
        :class="{ 'agds-sub-nav__item--active': link.href === bestMatch }"
      >
        <a
          :href="link.href"
          :aria-current="link.href === bestMatch ? 'page' : undefined"
          class="agds-sub-nav__link"
          :class="{ 'agds-sub-nav__link--active': link.href === bestMatch }"
        >
          <span>{{ link.label }}</span>
          <span v-if="link.endElement" class="agds-sub-nav__end-element">{{ link.endElement }}</span>
        </a>
      </li>
    </ul>

    <!-- Decorative bottom baseline bar: visible on desktop only -->
    <div class="agds-sub-nav__bottom-bar" aria-hidden="true" />
  </nav>
</template>

<style scoped>
/* ── Root ─────────────────────────────────────────────── */
.agds-sub-nav {
  position: relative;
  font-family: var(--agds-font-family-body);
  /* hover background token — overridden by bodyAlt variant */
  --subnav-hover-bg: var(--agds-color-bg-subtle);
}

.agds-sub-nav--bg-bodyAlt {
  background-color: var(--agds-color-bg-subtle);
  --subnav-hover-bg: var(--agds-color-bg-muted);
}

/* ── List ─────────────────────────────────────────────── */
.agds-sub-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

/* ── Item ─────────────────────────────────────────────── */
.agds-sub-nav__item {
  display: flex;
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* First item gets a top border on mobile */
.agds-sub-nav__item:first-of-type {
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* ── Link ─────────────────────────────────────────────── */
.agds-sub-nav__link {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--agds-space-2);
  padding: var(--agds-space-4);
  position: relative;
  color: var(--agds-color-action-primary);
  text-decoration: none;
  font-size: var(--agds-font-size-sm);
  /* Mobile active indicator: thick left border */
  border-left: 4px solid transparent;
}

.agds-sub-nav__link--active {
  color: var(--agds-color-text);
  border-left-color: var(--agds-color-action-primary);
}

.agds-sub-nav__link:hover {
  color: var(--agds-color-text);
  background-color: var(--subnav-hover-bg);
}

.agds-sub-nav__link:hover > span:first-of-type {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-sub-nav__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

/* ── End element ──────────────────────────────────────── */
.agds-sub-nav__end-element {
  font-size: var(--agds-font-size-xs, 0.75rem);
  color: var(--agds-color-text-muted);
  flex-shrink: 0;
}

/* ── Bottom bar (desktop only) ────────────────────────── */
.agds-sub-nav__bottom-bar {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: var(--agds-space-2); /* 8px — matches desktop item bottom border height */
  background-color: var(--agds-color-border);
}

/* ── Desktop ──────────────────────────────────────────── */
@media (min-width: 768px) {
  .agds-sub-nav__list {
    flex-direction: row;
    flex-wrap: wrap;
  }

  /* Desktop: thick bottom border replaces mobile left border */
  .agds-sub-nav__item {
    border-top: 0;
    border-bottom: var(--agds-space-2) solid var(--agds-color-border);
  }

  .agds-sub-nav__item:first-of-type {
    border-top: 0;
  }

  .agds-sub-nav__item--active {
    border-bottom-color: var(--agds-color-action-primary);
  }

  .agds-sub-nav__link {
    display: inline-flex;
    border-left: 0;
  }

  .agds-sub-nav__link--active {
    border-left: 0;
  }

  .agds-sub-nav__bottom-bar {
    display: block;
  }
}
</style>

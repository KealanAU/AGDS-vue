<script setup lang="ts">
export interface AGDSProseProps {
  /**
   * The HTML element or component rendered as the prose container.
   * @default 'div'
   */
  as?: string
}

withDefaults(defineProps<AGDSProseProps>(), {
  as: 'div',
})
</script>

<template>
  <component :is="as" class="agds-prose">
    <slot />
  </component>
</template>

<!--
  Non-scoped styles: every rule is namespaced under `.agds-prose` so there
  is no bleed outside that container.

  Two escape hatches are exported alongside this component:
  - `agds-prose-unset`  — add to any child container to opt its subtree out
                            of prose typography rules.
  - `agds-prose-block`  — add to any block element to restore the standard
                            vertical rhythm (marginTop: var(--agds-space-8))
                            without inheriting any other prose overrides.

  Selector guard `:not([class])` prevents prose from re-styling elements that
  already carry a class (i.e. are managed by another component).
  `:not(.agds-prose-unset *)` excludes descendants of the unset container.
-->
<style>
/* ── Container ───────────────────────────────────────────────────────────── */

.agds-prose {
  margin: 0;
  text-size-adjust: 100%;
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
}

.agds-prose:empty {
  display: none;
}

/* ── Prose block — opt-in vertical spacing ───────────────────────────────── */

.agds-prose * + .agds-prose-block:not(.agds-prose-unset *) {
  margin-top: var(--agds-space-8);
}

/* ── Links ───────────────────────────────────────────────────────────────── */

.agds-prose a:not([class]):not(.agds-prose-unset *) {
  color: var(--agds-color-action-primary);
  text-decoration: underline;
}

.agds-prose a:not([class]):not(.agds-prose-unset *):hover {
  color: var(--agds-color-action-primary-hover);
}

.agds-prose a:not([class]):not(.agds-prose-unset *):focus-visible {
  outline: var(--agds-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 2px;
  border-radius: var(--agds-radius-sm);
}

/* ── Focus / target highlight ────────────────────────────────────────────── */

.agds-prose [tabindex="0"]:focus-visible,
.agds-prose :target {
  outline: var(--agds-focus-width, 3px) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Text selection ──────────────────────────────────────────────────────── */

.agds-prose ::selection {
  color: var(--agds-color-bg);
  background-color: var(--agds-color-action-primary);
}

/* ── Images ──────────────────────────────────────────────────────────────── */

.agds-prose img:not([class]):not(.agds-prose-unset *) {
  max-width: 100%;
}

/* ── Paragraphs ──────────────────────────────────────────────────────────── */

.agds-prose p:not([class]):not(.agds-prose-unset *) {
  max-width: 38em;
  margin: 0;
}

.agds-prose * + p:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

/* ── Lists ───────────────────────────────────────────────────────────────── */

.agds-prose ul:not([class]):not(.agds-prose-unset *),
.agds-prose ol:not([class]):not(.agds-prose-unset *),
.agds-prose dl:not([class]):not(.agds-prose-unset *),
.agds-prose pre:not(.agds-prose-unset *) {
  margin: 0;
}

.agds-prose * + ul:not([class]):not(.agds-prose-unset *),
.agds-prose * + ol:not([class]):not(.agds-prose-unset *),
.agds-prose * + dl:not([class]):not(.agds-prose-unset *),
.agds-prose * + pre:not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

.agds-prose ul:not([class]):not(.agds-prose-unset *) > li,
.agds-prose ol:not([class]):not(.agds-prose-unset *) > li {
  margin-top: var(--agds-space-2);
  max-width: 38em;
}

.agds-prose ul:not([class]):not(.agds-prose-unset *) > li > ul:not([class]),
.agds-prose ul:not([class]):not(.agds-prose-unset *) > li > ol:not([class]),
.agds-prose ol:not([class]):not(.agds-prose-unset *) > li > ul:not([class]),
.agds-prose ol:not([class]):not(.agds-prose-unset *) > li > ol:not([class]) {
  margin-top: var(--agds-space-2);
}

/* ── Definition lists ────────────────────────────────────────────────────── */

.agds-prose dl:not([class]):not(.agds-prose-unset *) {
  max-width: 38em;
}

.agds-prose dl:not([class]):not(.agds-prose-unset *) > dt {
  margin-top: var(--agds-space-6);
  font-weight: var(--agds-font-weight-bold);
}

.agds-prose dl:not([class]):not(.agds-prose-unset *) > dt:first-of-type {
  margin-top: 0;
}

.agds-prose dl:not([class]):not(.agds-prose-unset *) > dd {
  margin-top: var(--agds-space-2);
  padding-left: var(--agds-space-2);
  margin-left: 0;
  border-left: var(--agds-border-width-sm) solid var(--agds-color-border);
}

/* ── Tables ──────────────────────────────────────────────────────────────── */

.agds-prose * + table:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

.agds-prose * + table:not([class]):not(.agds-prose-unset *) + table {
  margin-top: var(--agds-space-12);
}

/* ── Headings ────────────────────────────────────────────────────────────── */

.agds-prose h1:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-4xl);
  line-height: var(--agds-line-height-tight);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

.agds-prose h2:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-3xl);
  line-height: var(--agds-line-height-tight);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

.agds-prose h3:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-2xl);
  line-height: var(--agds-line-height-snug);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

.agds-prose h4:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-xl);
  line-height: var(--agds-line-height-snug);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

.agds-prose h5:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-lg);
  line-height: var(--agds-line-height-snug);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

.agds-prose h6:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-md);
  line-height: var(--agds-line-height-normal);
  font-weight: var(--agds-font-weight-bold);
  margin: 0;
}

/* Heading spacing — following element → heading */
.agds-prose * + h1:not([class]):not(.agds-prose-unset *),
.agds-prose * + h2:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-12);
}

.agds-prose * + h3:not([class]):not(.agds-prose-unset *),
.agds-prose * + h4:not([class]):not(.agds-prose-unset *),
.agds-prose * + h5:not([class]):not(.agds-prose-unset *),
.agds-prose * + h6:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

/* Tighter spacing for sequential headings */
.agds-prose h1 + h2:not([class]):not(.agds-prose-unset *),
.agds-prose h2 + h3:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

/* ── Inline emphasis ─────────────────────────────────────────────────────── */

.agds-prose em:not([class]):not(.agds-prose-unset *),
.agds-prose i:not([class]):not(.agds-prose-unset *) {
  font-style: italic;
}

.agds-prose strong:not([class]):not(.agds-prose-unset *),
.agds-prose b:not([class]):not(.agds-prose-unset *) {
  font-weight: var(--agds-font-weight-bold);
}

.agds-prose small:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-xs);
  line-height: var(--agds-line-height-normal);
}

/* ── Strikethrough, deletion, insertion ──────────────────────────────────── */

.agds-prose s:not([class]):not(.agds-prose-unset *),
.agds-prose del:not([class]):not(.agds-prose-unset *) {
  text-decoration: line-through;
}

.agds-prose ins:not([class]):not(.agds-prose-unset *) {
  text-decoration-line: underline;
  text-decoration-style: dashed;
  text-decoration-skip-ink: auto;
}

/* ── Definition / abbreviation ───────────────────────────────────────────── */

.agds-prose dfn:not([class]):not(.agds-prose-unset *) {
  font-style: normal;
}

.agds-prose abbr:not([class]):not(.agds-prose-unset *),
.agds-prose abbr[title]:not([class]):not(.agds-prose-unset *) {
  border-bottom: none;
  text-decoration: underline dotted;
}

.agds-prose abbr[title]:not(.agds-prose-unset *) {
  cursor: help;
}

.agds-prose a abbr:not([class]):not(.agds-prose-unset *) {
  padding-bottom: 1px;
}

/* ── Variables ───────────────────────────────────────────────────────────── */

.agds-prose var:not([class]):not(.agds-prose-unset *) {
  padding: 0 1px;
  font-style: italic;
  font-family: serif;
}

.agds-prose var:not([class]):not(.agds-prose-unset *) sup,
.agds-prose var:not([class]):not(.agds-prose-unset *) sub {
  font-family: var(--agds-font-family-body);
  font-style: normal;
  padding: 0 1px;
}

/* ── Subscript / superscript ─────────────────────────────────────────────── */

.agds-prose sub:not([class]):not(.agds-prose-unset *),
.agds-prose sup:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-xs);
  line-height: 1;
  position: relative;
  vertical-align: baseline;
}

.agds-prose sub:not([class]):not(.agds-prose-unset *) {
  bottom: -0.25em;
}

.agds-prose sup:not([class]):not(.agds-prose-unset *) {
  top: -0.5em;
}

/* ── Figures ─────────────────────────────────────────────────────────────── */

.agds-prose figure:not([class]):not(.agds-prose-unset *) {
  margin: 0;
}

.agds-prose * + figure:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

.agds-prose figcaption:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-4);
  color: var(--agds-color-text-muted);
}

/* ── Blockquotes ─────────────────────────────────────────────────────────── */

.agds-prose blockquote:not([class]):not(.agds-prose-unset *) {
  margin: 0;
  padding: var(--agds-space-8);
  border-left: 4px solid var(--agds-color-border);
  background: var(--agds-color-bg-subtle);
}

.agds-prose * + blockquote:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-6);
}

/* ── Code / keyboard / sample ────────────────────────────────────────────── */

.agds-prose kbd:not([class]):not(.agds-prose-unset *),
.agds-prose code:not([class]):not(.agds-prose-unset *),
.agds-prose samp:not([class]):not(.agds-prose-unset *) {
  font-size: var(--agds-font-size-xs);
  line-height: var(--agds-line-height-normal);
  padding: var(--agds-space-1);
  font-family: var(--agds-font-family-mono);
  display: inline-block;
  border-radius: var(--agds-radius-md);
  background-color: var(--agds-color-bg-subtle);
  color: var(--agds-color-text);
}

/* ── Preformatted code blocks ────────────────────────────────────────────── */

.agds-prose pre:not(.agds-prose-unset *) {
  font-family: var(--agds-font-family-mono);
  border-radius: var(--agds-radius-md);
  background-color: var(--agds-color-bg-subtle);
  color: var(--agds-color-text);
  overflow-x: auto;
}

.agds-prose pre code:not([class]):not(.agds-prose-unset *) {
  display: block;
  tab-size: 4;
  padding: var(--agds-space-4);
}

/* ── Horizontal rule ─────────────────────────────────────────────────────── */

.agds-prose hr:not([class]):not(.agds-prose-unset *) {
  box-sizing: content-box;
  height: 0;
  overflow: visible;
  border: none;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  margin-bottom: var(--agds-space-12);
}

.agds-prose * + hr:not([class]):not(.agds-prose-unset *) {
  margin-top: var(--agds-space-12);
}

/* ── Print ───────────────────────────────────────────────────────────────── */

@media print {
  .agds-prose a[href]::after {
    content: " (" attr(href) ") !important";
  }

  .agds-prose abbr[title]::after {
    content: " (" attr(title) ")";
  }

  .agds-prose pre,
  .agds-prose blockquote,
  .agds-prose tr,
  .agds-prose img {
    page-break-inside: avoid;
  }

  .agds-prose h2,
  .agds-prose h3 {
    page-break-after: avoid;
  }
}
</style>

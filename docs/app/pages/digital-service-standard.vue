<script setup lang="ts">
useSeoMeta({
  title: 'Digital Service Standard — AGDS-vue',
  description:
    'How AGDS-vue aligns with all 10 criteria of the Digital Service Standard.',
})

const criteria = [
  {
    number: 1,
    title: 'Understand what the problem is',
    status: 'complete',
    summary:
      'Component APIs are deliberate, minimal, and derived from real government service patterns.',
    items: [
      { done: true, text: 'Every prop has a clearly stated purpose in TSDoc' },
      {
        done: true,
        text: 'Prop names are consistent across the library (variant, size, disabled, loading)',
      },
      { done: true, text: 'All exported types documented with use cases' },
      { done: true, text: 'Breaking changes require migration guide' },
    ],
  },
  {
    number: 2,
    title: 'Understand what users need',
    status: 'not-started',
    summary:
      'Props, slots, and events reflect real-world patterns found in Australian government service forms.',
    items: [
      { done: false, text: 'All form components support v-model binding' },
      {
        done: false,
        text: 'Label, hint, and error message are first-class props on every form component',
      },
      { done: false, text: 'Components support server-side validation error display' },
    ],
  },
  {
    number: 3,
    title: 'Leave no one behind',
    status: 'in-progress',
    summary: 'Every component meets WCAG 2.2 AA. Reka UI handles keyboard navigation and ARIA.',
    items: [
      { done: false, text: 'axe-core passes on all components in all states' },
      { done: false, text: 'WCAG 2.2 AA contrast ratios met (4.5:1 text, 3:1 large/UI)' },
      { done: true, text: 'Focus ring: 3px solid #9263de on all interactive elements' },
      {
        done: true,
        text: 'Reka UI primitives provide keyboard nav for all interactive components',
      },
      { done: true, text: 'Button: aria-busy on loading, aria-disabled on disabled' },
    ],
  },
  {
    number: 4,
    title: 'Use agile and user-centred methods',
    status: 'complete',
    summary:
      'Components compose cleanly — slots over props, small focused components over monoliths.',
    items: [
      { done: true, text: 'Button exposes default slot for content' },
      { done: true, text: 'Layout components expose named slots for structural regions' },
      { done: true, text: 'No component reaches into its parent or uses $parent' },
    ],
  },
  {
    number: 5,
    title: 'Understand what can be reused',
    status: 'complete',
    summary:
      'All style values reference --agds-* CSS custom properties. No hardcoded colours or spacing.',
    items: [
      { done: true, text: 'Every colour value references a --agds-* CSS custom property' },
      { done: true, text: 'Every spacing value references a --agds-space-* token' },
      { done: true, text: 'Every font value references --agds-font-* tokens' },
      { done: true, text: 'No component uses !important' },
      { done: true, text: 'No component uses Tailwind or any external CSS class framework' },
    ],
  },
  {
    number: 6,
    title: 'Describe, not prescribe',
    status: 'in-progress',
    summary:
      'Reka UI primitives used for all interaction patterns — no custom focus traps or ARIA management.',
    items: [
      {
        done: true,
        text: 'All interactive component primitives documented in per-component docs (docs/content/components/)',
      },
      {
        done: false,
        text: 'AGDSDropdownMenu: replace custom ArrowUp/Down/Home/End/type-ahead keyboard routing with Reka DropdownMenu primitives',
      },
      {
        done: false,
        text: 'AGDSDatePicker: verify global Escape handler does not duplicate Reka Popover built-in handling (stopPropagation may conflict)',
      },
      {
        done: true,
        text: 'Custom Tab focus traps in Drawer, MainNavDialog, and AppLayoutSidebar are supplemental — not covered by Reka',
      },
      { done: false, text: 'reka-ui moved to peerDependencies (currently in dependencies)' },
    ],
  },
  {
    number: 7,
    title: 'Ensure the service is simple to use',
    status: 'complete',
    summary: 'Zero runtime dependencies beyond vue and reka-ui. No analytics, no CDN fonts.',
    items: [
      { done: true, text: 'Zero runtime dependencies beyond vue and reka-ui' },
      { done: true, text: 'No analytics, telemetry, or external network calls' },
      { done: true, text: 'No CDN font or icon loading — system font stack, inline SVG slots' },
    ],
  },
  {
    number: 8,
    title: 'Make the service accountable',
    status: 'not-started',
    summary:
      'Reka UI keeps primitives modern and maintained. Changelog maintained per Conventional Commits.',
    items: [
      { done: false, text: 'Reka UI peer dependency kept up to date' },
      { done: false, text: 'CHANGELOG.md maintained per Conventional Commits' },
      { done: false, text: "Each component's Reka primitive documented with reason it was chosen" },
    ],
  },
  {
    number: 9,
    title: 'Be open',
    status: 'not-started',
    summary:
      'Minimum 80% statement coverage. Every component has render, slot, props, events, and a11y tests.',
    items: [
      { done: false, text: 'Minimum 80% statement coverage' },
      { done: false, text: 'Every component: render, slot, props, events, and axe-core tests' },
      { done: false, text: 'Coverage report on every PR' },
    ],
  },
  {
    number: 10,
    title: 'Keep improving',
    status: 'not-started',
    summary:
      'Semantic Versioning, deprecation warnings, and migration guides for every breaking change.',
    items: [
      { done: false, text: 'Semantic Versioning strictly followed' },
      {
        done: false,
        text: 'Deprecated props annotated with @deprecated and console warning in dev',
      },
      { done: false, text: 'Migration guides for every breaking change' },
    ],
  },
]

function statusClass(status: string) {
  return (
    {
      complete: 'criterion--complete',
      'in-progress': 'criterion--in-progress',
      'not-started': 'criterion--not-started',
    }[status] ?? ''
  )
}

function statusLabel(status: string) {
  return (
    {
      complete: 'Complete',
      'in-progress': 'In progress',
      'not-started': 'Not started',
    }[status] ?? status
  )
}

const overallProgress = computed(
  () => criteria.flatMap((c) => c.items).filter((i) => i.done).length,
)
const overallTotal = computed(() => criteria.flatMap((c) => c.items).length)
</script>

<template>
  <DocsLayout>
    <div class="dss-page">
      <h1>Digital Service Standard</h1>
      <p class="dss-page__intro">
        The
        <a
          href="https://www.dta.gov.au/help-and-advice/about-digital-service-standard"
          target="_blank"
          rel="noopener"
        >
          Digital Service Standard
        </a>
        defines 10 criteria that government digital services must meet. This page tracks how
        AGDS-vue aligns with each criterion, and maps them to automated assertions in our Vitest +
        axe-core test suite.
      </p>

      <div class="dss-progress">
        <div
          class="dss-progress__bar-wrap"
          role="progressbar"
          :aria-valuenow="overallProgress"
          :aria-valuemax="overallTotal"
          aria-label="Overall checklist progress"
        >
          <div
            class="dss-progress__bar"
            :style="{ width: `${(overallProgress / overallTotal) * 100}%` }"
          />
        </div>
        <span class="dss-progress__label"
          >{{ overallProgress }} / {{ overallTotal }} checklist items done</span
        >
      </div>

      <div
        v-for="criterion in criteria"
        :key="criterion.number"
        class="criterion"
        :class="statusClass(criterion.status)"
      >
        <div class="criterion__header">
          <span class="criterion__number">{{ criterion.number }}</span>
          <div class="criterion__meta">
            <h2 class="criterion__title">{{ criterion.title }}</h2>
            <span class="criterion__status-badge">{{ statusLabel(criterion.status) }}</span>
          </div>
        </div>
        <p class="criterion__summary">{{ criterion.summary }}</p>
        <ul class="criterion__checklist">
          <li
            v-for="(item, i) in criterion.items"
            :key="i"
            class="criterion__check"
            :class="{ 'criterion__check--done': item.done }"
          >
            <span class="criterion__check-icon" aria-hidden="true">{{
              item.done ? '✓' : '○'
            }}</span>
            <span>{{ item.text }}</span>
          </li>
        </ul>
      </div>
    </div>
  </DocsLayout>
</template>

<style scoped>
.dss-page h1 {
  font-size: var(--agds-font-size-4xl);
  font-weight: var(--agds-font-weight-bold);
  margin: 0 0 var(--agds-space-4);
  border-bottom: 3px solid var(--agds-color-brand);
  padding-bottom: var(--agds-space-4);
  color: var(--agds-color-text);
}

.dss-page__intro {
  font-size: var(--agds-font-size-lg);
  color: var(--agds-color-text-muted);
  line-height: var(--agds-line-height-relaxed);
  margin-bottom: var(--agds-space-8);
  max-width: 44rem;
}

.dss-page__intro a {
  color: var(--agds-color-brand);
}

.dss-progress {
  display: flex;
  align-items: center;
  gap: var(--agds-space-4);
  margin-bottom: var(--agds-space-10);
  padding: var(--agds-space-4) var(--agds-space-5);
  background-color: var(--agds-color-bg-subtle);
  border-radius: var(--agds-radius-md);
  border: 1px solid var(--agds-color-border);
}

.dss-progress__bar-wrap {
  flex: 1;
  height: 8px;
  background-color: var(--agds-color-bg-muted);
  border-radius: var(--agds-radius-full);
  overflow: hidden;
}

.dss-progress__bar {
  height: 100%;
  background-color: var(--agds-color-brand);
  border-radius: var(--agds-radius-full);
  transition: width var(--agds-transition-slow);
}

.dss-progress__label {
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
  white-space: nowrap;
  font-family: var(--agds-font-family-mono);
}

.criterion {
  margin-bottom: var(--agds-space-6);
  padding: var(--agds-space-6);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-lg);
  border-left-width: 4px;
}

.criterion--complete {
  border-left-color: var(--agds-color-success);
}
.criterion--in-progress {
  border-left-color: var(--agds-color-warning);
}
.criterion--not-started {
  border-left-color: var(--agds-color-border);
}

.criterion__header {
  display: flex;
  align-items: flex-start;
  gap: var(--agds-space-4);
  margin-bottom: var(--agds-space-3);
}

.criterion__number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--agds-color-brand);
  color: var(--agds-color-text-inverse);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-bold);
  flex-shrink: 0;
}

.criterion__meta {
  display: flex;
  align-items: baseline;
  gap: var(--agds-space-3);
  flex-wrap: wrap;
}

.criterion__title {
  font-size: var(--agds-font-size-lg);
  font-weight: var(--agds-font-weight-semibold);
  margin: 0;
  color: var(--agds-color-text);
}

.criterion__status-badge {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-medium);
  padding: 0.2em 0.6em;
  border-radius: var(--agds-radius-full);
  background-color: var(--agds-color-bg-muted);
  color: var(--agds-color-text-muted);
}

.criterion--complete .criterion__status-badge {
  background-color: var(--agds-color-success-muted);
  color: var(--agds-color-success);
}

.criterion--in-progress .criterion__status-badge {
  background-color: var(--agds-color-warning-muted);
  color: var(--agds-color-warning);
}

.criterion__summary {
  color: var(--agds-color-text-muted);
  font-size: var(--agds-font-size-sm);
  line-height: var(--agds-line-height-relaxed);
  margin: 0 0 var(--agds-space-4);
}

.criterion__checklist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
}

.criterion__check {
  display: flex;
  align-items: flex-start;
  gap: var(--agds-space-2);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

.criterion__check--done {
  color: var(--agds-color-text);
}

.criterion__check-icon {
  font-size: var(--agds-font-size-sm);
  flex-shrink: 0;
  width: 1.25em;
  color: var(--agds-color-text-muted);
}

.criterion__check--done .criterion__check-icon {
  color: var(--agds-color-success);
}
</style>

# Docs Authoring Guide for Agents

## Why Demo components are required

Nuxt Content's MDC renderer converts PascalCase component names to kebab-case using standard word-boundary rules. The `AGDS` prefix is all-uppercase, so `AGDSDivider` becomes `agdsdivider` (no hyphens, unresolved) rather than `agds-divider`. Vue then treats it as an unknown HTML element and renders it as a no-op custom element tag.

**AGDS components must never be used directly inside `::doc-preview` blocks in markdown.**

## The correct pattern

Create a `{Name}Demo.vue` file in `docs/app/components/content/` and reference it from markdown using the MDC shorthand:

```
::doc-preview
:name-demo
::

::doc-preview{label="Variant label"}
:name-demo{variant="variant-name"}
::
```

Inside `{Name}Demo.vue`, AGDS components resolve correctly because it is a proper Vue SFC — use them freely there.

## Demo component conventions

- Accept a single `variant?: string` prop to switch between examples.
- Use `v-if` / `v-else-if` branches for each variant; the default branch (no `variant`) renders the primary example.
- Keep inline styles minimal — use CSS custom properties (`var(--agds-*)`) when possible.
- Name variants after what they demonstrate, e.g. `"with-text"`, `"left-aligned"`, `"login-form"`.

```vue
<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <AGDSExample v-if="!variant || variant === 'default'" />
  <AGDSExample v-else-if="variant === 'secondary'" secondary />
</template>
```

## File naming

| Markdown reference | Component file |
|--------------------|----------------|
| `:button-demo` | `ButtonDemo.vue` |
| `:divider-demo` | `DividerDemo.vue` |
| `:callout-demo` | `CalloutDemo.vue` |

All Demo files live in `docs/app/components/content/`. Nuxt auto-discovers them.

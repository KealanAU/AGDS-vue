# Contributing to AGDS-vue

Thank you for contributing to the Agriculture Design System (AgDS) Vue component library.
This guide explains how to add a new component from scratch.

---

## Prerequisites

```bash
node >=20.19.0
pnpm >=10
```

```bash
git clone https://github.com/your-org/AGDS-vue
cd AGDS-vue
pnpm install --force   # --force compiles native deps (better-sqlite3, etc.) on first run
pnpm build:lib         # build the library before starting the docs site
pnpm dev               # starts docs at http://localhost:3000
```

---

## Adding a new component

### 1. Claim the component in COMPONENTS.md

Open `COMPONENTS.md` and change the component's status from `[ ]` to `[~]`
so other contributors know it is being worked on.

### 2. Check for a Reka UI primitive

Before writing any interaction code, check
[reka-ui.com](https://reka-ui.com/docs/components/overview) for an appropriate
primitive.

- If one exists → **build on top of it**, importing from `'reka-ui'`.
- If not → build a plain Vue 3 component.

**Never import from `radix-vue`.** This library uses `reka-ui` exclusively.

Common mappings:

| Component type | Reka UI primitive |
|----------------|-------------------|
| Accordion | `RekaAccordionRoot` |
| Checkbox | `RekaCheckboxRoot` |
| Collapsible / Details | `RekaCollapsibleRoot` |
| Combobox / Autocomplete | `RekaComboboxRoot` |
| Date picker | `RekaDatePickerRoot` |
| Dialog / Modal / Drawer | `RekaDialogRoot` |
| Dropdown menu | `RekaDropdownMenuRoot` |
| Navigation menu | `RekaNavigationMenuRoot` |
| Pagination | `RekaPaginationRoot` |
| Progress | `RekaProgressRoot` |
| Radio group | `RekaRadioGroupRoot` |
| Select | `RekaSelectRoot` |
| Switch | `RekaSwitchRoot` |
| Tabs | `RekaTabsRoot` |
| Toggle button | `RekaToggleRoot` |
| Visually hidden | `RekaVisuallyHidden` |

### 3. Create the component folder

```
packages/AGDS-vue/src/components/{kebab-name}/
  AgDS{PascalName}.vue   ← main SFC
  index.ts                 ← named re-exports
  AgDS{PascalName}.test.ts
```

Example for a `TextInput` component:

```
packages/AGDS-vue/src/components/text-input/
  AgDSTextInput.vue
  index.ts
  AgDSTextInput.test.ts
```

#### SFC structure

```vue
<script setup lang="ts">
// 1. External imports (reka-ui, vue)
// 2. Type exports — export props interface so docs can auto-generate the table
// 3. defineProps / withDefaults
// 4. defineEmits
// 5. Any logic (computed, methods)
</script>

<template>
  <!-- Reka primitive wrapper (if applicable) -->
  <!-- Semantic HTML -->
</template>

<style scoped>
/* --agds-* tokens only — no hardcoded values, no Tailwind */
</style>
```

#### Styling rules

- Use `--agds-*` CSS custom properties for **every** colour, spacing, and
  typographic value. See `src/styles/tokens.css` for the full token list.
- Scope all styles with `<style scoped>`.
- No `!important`.
- No inline styles on rendered DOM elements.
- No Tailwind, no utility frameworks.

### 4. Export from the library barrel

Add to `packages/AGDS-vue/src/index.ts`:

```ts
export { AgDSTextInput } from './components/text-input'
export type { AgDSTextInputProps } from './components/text-input'
```

And to the `install` function:

```ts
app.component('AgDSTextInput', AgDSTextInput)
```

### 5. Write tests

Create `AgDS{PascalName}.test.ts` alongside the component.

Every component must have at minimum:

```ts
import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/vue'
import { runAxe } from '../../../test/a11y'
import AgDSTextInput from './AgDSTextInput.vue'

describe('AgDSTextInput', () => {
  it('renders without throwing', () => {
    const { getByRole } = render(AgDSTextInput, {
      props: { id: 'name', label: 'Full name' },
    })
    expect(getByRole('textbox')).toBeTruthy()
  })

  it('renders slot / label content', () => {
    const { getByText } = render(AgDSTextInput, {
      props: { id: 'name', label: 'Full name' },
    })
    expect(getByText('Full name')).toBeTruthy()
  })

  it('has no axe violations in default state', async () => {
    const { container } = render(AgDSTextInput, {
      props: { id: 'name', label: 'Full name' },
    })
    await runAxe(container)
  })

  it('has no axe violations in error state', async () => {
    const { container } = render(AgDSTextInput, {
      props: { id: 'name', label: 'Full name', error: 'Required' },
    })
    await runAxe(container)
  })

  it('emits update:modelValue on input', async () => {
    const { getByRole, emitted } = render(AgDSTextInput, {
      props: { id: 'name', label: 'Full name', modelValue: '' },
    })
    await getByRole('textbox').setValue('Jane')
    expect(emitted()['update:modelValue']).toBeTruthy()
  })
})
```

Run tests:

```bash
pnpm --filter AGDS-vue test
pnpm --filter AGDS-vue test --coverage
```

### 6. Add a docs page

Create `docs/content/components/{kebab-name}.md`:

```md
---
title: Text Input
description: Single-line text entry. Use for short free-text responses.
status: stable
rekaui: RekaVisuallyHidden (label association only)
---

# Text Input

...description...

## Preview
::component-preview
  ::AGDS-text-input{id="demo" label="Full name" /}
::

## Live example
::live-code
\`\`\`vue
<script setup>
import { ref } from 'vue'
import { AgDSTextInput } from 'AGDS-vue'
const value = ref('')
</script>
<template>
  <AgDSTextInput id="name" label="Full name" v-model="value" />
</template>
\`\`\`
::

## Props
::props-table{...}
::

## Accessibility

Keyboard navigation and focus management are provided by the native `<input>` element.
Labels are associated via `for`/`id`. Error messages are linked via `aria-describedby`.
```

### 7. Mark complete

Back in `COMPONENTS.md`, change `[~]` to `[x]` and add ` Complete` next to the status.

---

## Code review checklist

Before opening a PR, verify:

- [ ] Component renders without console errors or warnings
- [ ] `pnpm build:lib` succeeds with no TypeScript errors
- [ ] All tests pass: `pnpm test`
- [ ] axe-core reports zero violations in all component states
- [ ] All style values use `--agds-*` tokens
- [ ] Exported from `src/index.ts`
- [ ] Docs page added at `docs/content/components/{name}.md`
- [ ] COMPONENTS.md status updated to `[x]`

---

## Commit messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(button): add loading state with aria-busy
fix(select): correct focus return after close
docs(accordion): add live example to docs page
test(checkbox): add axe violation tests for indeterminate state
chore(deps): update reka-ui to 2.10.0
```

---

## Releasing

Releases are managed by the maintainers via `changeset`.
Contributors do not need to cut releases — open a PR and a maintainer will handle versioning.

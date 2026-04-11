# JSDoc Brief — AGDS Vue Components

## Context
We audited JSDoc coverage across all 152 `.vue` files in `packages/AGDS-vue/src/components/`.

## Current State
| Rating | Count | % |
|--------|-------|---|
| Excellent (8+ blocks) | 23 | 15% |
| Good (5–8 blocks) | 37 | 24% |
| Minimal (2–4 blocks) | 35 | 23% |
| Poor/None (0–1 blocks) | 57 | 38% |

**Overall: ~40% adequately documented.**

TypeScript covers types — the gap is **prose descriptions**, especially:
1. Per-option explanations on union type props (what does each value do/look like?)
2. `defineEmits` — 0% coverage across all 49 components that define emits
3. `defineExpose` — 0% coverage across all 30 components that expose methods

`@param`/`@returns`/`@type` style JSDoc is redundant — focus on description-style `/** */` comments only.

## Best Example (pattern to follow)
```ts
/**
 * Visual prominence level of the button.
 *
 * - `'primary'` — Filled, high-contrast. Use once per view for the single most important action.
 * - `'secondary'` — Outlined. Pair with a primary button for secondary actions.
 * - `'tertiary'` — No border, underlined text. Lower-priority actions.
 */
variant: 'primary' | 'secondary' | 'tertiary'
```

## Priority Order
1. **Emits** — add descriptions to all `defineEmits` calls (what triggers it, what the payload means)
2. **Expose** — add descriptions to all `defineExpose` methods
3. **Poor/None props** — focus on these component folders first:
   - `autocomplete/` (0 JSDoc — props split to `comboboxUtils.ts`, .vue files need descriptions)
   - `list/`
   - `app-layout/`
   - `breadcrumbs/`
   - `dropdown-menu/`
   - `table/` (inconsistent)

## Task
Go through each component folder in priority order and add description-style JSDoc comments. No type annotations needed — TypeScript already covers types. Focus on "why/when" not "what type".

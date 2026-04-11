# Form Component Audit — Fixes

Audit of criteria: v-model binding, label/hint/message as first-class props, server-side validation error display.

---

## Fix 1: `AGDSGroupedFields` — add `required` prop

**File:** `packages/AGDS-vue/src/components/grouped-fields/AGDSGroupedFields.vue`

**Problem:** `required` is hardcoded to `false` on line 65 (`:required="false"`), so the component can never display "(optional)" or mark the group as required.

**Steps:**
1. Add `required?: boolean` to `AGDSGroupedFieldsProps` interface
2. Add `required: false` to `withDefaults`
3. Change `:required="false"` on `AGDSFieldLabel` to `:required="props.required"`

---

## Fix 2: `AGDSFileInput` — add read-only v-model for file names

**File:** `packages/AGDS-vue/src/components/file-input/AGDSFileInput.vue`

**Problem:** No v-model support — internal `fileNames` state is inaccessible externally. Browsers block programmatic setting of `<input type="file">` values, so this is emit-only (read-only v-model).

**Steps:**
1. Add `modelValue?: string[]` to `AGDSFileInputProps` (read-only; setting it has no effect, warn in JSDoc)
2. Add `'update:modelValue': [files: string[]]` to `defineEmits`
3. In `handleChange`, after updating `fileNames.value`, emit `update:modelValue` with the new array
4. Update JSDoc on `modelValue` prop to note: "Read-only — browsers prevent programmatic file input values. Bind with `v-model` to reactively receive selected file names."

---

## Checklist

- [ ] Fix 1: `AGDSGroupedFields` — `required` prop
- [ ] Fix 2: `AGDSFileInput` — read-only v-model

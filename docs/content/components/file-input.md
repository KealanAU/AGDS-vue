---
title: File Input
description: A simple file picker that renders a labelled button with a hidden native file input. Displays the selected file name inline. Use File Upload for full drag-and-drop and multi-file management.
category: Forms
status: stable
---

## Usage

Provide a `label` and listen for the `change` event to read the selected files.

::doc-preview
<FileInputDemo />
::

```vue
<template>
  <AGDSFileInput label="Upload your CV" @change="onFileChange" />
</template>

<script setup>
function onFileChange(event) {
  const files = event.target.files
  // handle selected files
}
</script>
```

## Accepted file types

Pass an array of MIME types to `accept`. The hint text is automatically generated from the MIME types if no explicit `hint` is provided.

::doc-preview{label="With accept"}
<FileInputDemo variant="accept" />
::

```vue
<template>
  <AGDSFileInput
    label="Upload identity document"
    :accept="['image/jpeg', 'image/png', 'application/pdf']"
  />
</template>
```

## Multiple files

Use `multiple` to allow the user to pick more than one file.

```vue
<template>
  <AGDSFileInput label="Upload photos" multiple />
</template>
```

## Hint and validation

Use `hint` for guidance and `invalid`/`message` to show a validation error.

::doc-preview{label="With hint and error"}
<FileInputDemo variant="validation" />
::

```vue
<template>
  <AGDSFileInput
    label="Proof of address"
    hint="Must be dated within the last 3 months."
    :invalid="hasError"
    message="You must upload a proof of address document"
  />
</template>
```

## Mobile camera capture

Use `capture` to open the device camera directly on mobile. `'user'` opens the front camera; `'environment'` opens the rear camera.

```vue
<template>
  <AGDSFileInput
    label="Take a photo of your ID"
    :accept="['image/jpeg', 'image/png']"
    capture="environment"
  />
</template>
```

## Required and optional

```vue
<template>
  <AGDSFileInput label="Signed declaration" required />
  <AGDSFileInput label="Additional documents" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Field label |
| `id` | `string` | auto | HTML id for the trigger button |
| `accept` | `string \| AcceptedFileMimeTypes[]` | — | Restrict accepted file types |
| `capture` | `'user' \| 'environment'` | — | Open device camera on mobile |
| `disabled` | `boolean` | `false` | Disables the button and file input |
| `autoFocus` | `boolean` | `false` | Focus the button on mount |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `name` | `string` | — | Name attribute on the hidden file input |
| `hint` | `string` | — | Hint text below the label. Auto-generated from `accept` if omitted |
| `invalid` | `boolean` | `false` | Renders the error state |
| `message` | `string` | — | Error or status message |
| `required` | `boolean` | `false` | Marks field as required |
| `hideOptionalLabel` | `boolean` | `false` | Suppress the "(optional)" suffix |
| `buttonSize` | `'sm' \| 'md' \| 'lg'` | `'sm'` | Size of the trigger button |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `Event` | Fired when the user selects a file |
| `focus` | `FocusEvent` | Fired when the trigger button is focused |
| `blur` | `FocusEvent` | Fired when the trigger button loses focus |

## Exposed

| Name | Type | Description |
|------|------|-------------|
| `focus` | `() => void` | Programmatically focus the trigger button |

## Accessibility

- The visible `<label>` has `for` pointing to the trigger button, so clicking the label activates the file picker
- The trigger button has a composed `aria-label` that includes the field label, required/invalid state, and selected file name — screen readers announce the full context without reading the visually-hidden file name element twice
- The native `<input type="file">` is `aria-hidden="true"` and `tabindex="-1"` — it is triggered programmatically only

## Changelog

### 0.1.0

- Initial release — accept, multiple, capture, hint auto-generation, invalid state

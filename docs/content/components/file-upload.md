---
title: File Upload
description: A full-featured file upload field with a drag-and-drop zone, file validation, rejection error panel, and support for existing server-side files. Uses v-model for controlled state.
category: Forms
status: stable
---

## Usage

Bind the selected files with `v-model`. The component validates files against your constraints and emits the accepted list.

::doc-preview
<AGDSFileUpload label="Attach supporting documents" v-model="[]" />
::

```vue
<script setup>
import { ref } from 'vue'
const files = ref([])
</script>

<template>
  <AGDSFileUpload label="Attach supporting documents" v-model="files" />
</template>
```

## Multiple files

Use the `multiple` prop to allow more than one file at a time.

```vue
<template>
  <AGDSFileUpload
    label="Upload evidence"
    v-model="files"
    multiple
  />
</template>
```

## File type restrictions

Pass an array of MIME types to `accept`. The component displays accepted formats in the drop zone and validates files on selection.

```vue
<template>
  <AGDSFileUpload
    label="Upload identity document"
    v-model="files"
    :accept="['image/jpeg', 'image/png', 'application/pdf']"
  />
</template>
```

Supported shorthand MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`, `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `text/csv`, `text/plain`, `application/zip`, `video/mp4`, `audio/mpeg`.

## File size limit

Use `maxSize` (in KB) to reject files that are too large.

```vue
<template>
  <AGDSFileUpload
    label="Upload photo"
    v-model="files"
    :max-size="5000"
    :accept="['image/jpeg', 'image/png']"
  />
</template>
```

## Maximum file count

Use `maxFiles` together with `multiple` to limit how many files can be selected.

```vue
<template>
  <AGDSFileUpload
    label="Upload up to 3 documents"
    v-model="files"
    multiple
    :max-files="3"
  />
</template>
```

## Validation state

Use `invalid` and `message` to show a validation error.

::doc-preview{label="Invalid state"}
<AGDSFileUpload label="Upload document" v-model="[]" invalid message="You must upload at least one document" />
::

```vue
<template>
  <AGDSFileUpload
    label="Upload document"
    v-model="files"
    :invalid="!files.length && submitted"
    message="You must upload at least one document"
  />
</template>
```

## Existing files

Pass `existingFiles` to show files already on the server alongside newly selected files. Listen for `remove-existing-file` to handle removal.

```vue
<script setup>
import { ref } from 'vue'

const existingFiles = ref([
  { name: 'passport.pdf', size: 204800 },
])

const newFiles = ref([])

function onRemoveExisting(file) {
  existingFiles.value = existingFiles.value.filter(f => f !== file)
}
</script>

<template>
  <AGDSFileUpload
    label="Supporting documents"
    v-model="newFiles"
    :existing-files="existingFiles"
    @remove-existing-file="onRemoveExisting"
    multiple
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Field label |
| `modelValue` | `FileWithStatus[]` | `[]` | Controlled list of selected files |
| `required` | `boolean` | `false` | Marks field as required; suppresses "(optional)" suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppress the "(optional)" suffix |
| `hint` | `string` | — | Hint text below the label |
| `invalid` | `boolean` | `false` | Renders the error state |
| `message` | `string` | — | Error message when `invalid` is true |
| `id` | `string` | auto | HTML id for the trigger button |
| `name` | `string` | — | Name attribute on the hidden file input |
| `disabled` | `boolean` | `false` | Disables the entire component |
| `multiple` | `boolean` | `false` | Allow multiple file selection |
| `accept` | `(AcceptedFileMimeTypes \| CustomFileMimeType)[]` | — | Restrict accepted MIME types |
| `maxFiles` | `number` | — | Maximum number of files (requires `multiple`) |
| `maxSize` | `number` | — | Maximum file size in KB |
| `hideThumbnails` | `boolean` | `false` | Hide image thumbnails in the file list |
| `existingFiles` | `ExistingFile[]` | `[]` | Files already on the server |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `FileWithStatus[]` | Emitted when the file list changes |
| `remove-existing-file` | `ExistingFile` | Emitted when an existing file's remove button is pressed |
| `focus` | `FocusEvent` | Emitted when the trigger button is focused |
| `blur` | `FocusEvent` | Emitted when the trigger button loses focus |

## Exposed

| Name | Type | Description |
|------|------|-------------|
| `focus` | `() => void` | Programmatically focus the trigger button |

## Accessibility

- An `aria-live="polite"` region announces file additions and removals to screen readers (WCAG 4.1.3)
- The trigger button has a composed `aria-label` that includes the field label, required/invalid state, and current file count
- The rejection error panel uses `role="alert"` for immediate announcement when invalid files are dropped
- Drag-and-drop is an enhancement; all actions are also available via the "Select file(s)" button

## Changelog

### 0.1.0

- Initial release — drag-and-drop, type/size/count validation, existing files, rejection error panel

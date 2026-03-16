<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import AGDSButton from '../button/AGDSButton.vue'
import AGDSTextLink from '../text-link/AGDSTextLink.vue'
import AGDSFileUploadFileThumbnail from './AGDSFileUploadFileThumbnail.vue'
import { type FileWithStatus, formatFileSize, getImageThumbnail } from './utils'

const props = defineProps<{
  file: FileWithStatus
  hideThumbnails?: boolean
  onRemove: () => void
}>()

const status = computed(() => props.file.status ?? 'none')

// Create an object URL for image preview; revoke it when the component unmounts.
const imagePreview = computed(() => getImageThumbnail(props.file))
onUnmounted(() => {
  if (imagePreview.value) URL.revokeObjectURL(imagePreview.value)
})

const sizeText = computed(() =>
  props.file.size ? ` (${formatFileSize(props.file.size)})` : '',
)
</script>

<template>
  <li
    class="agds-file-upload-file"
    :class="{
      'agds-file-upload-file--success': status === 'success',
      'agds-file-upload-file--shade': status !== 'success',
    }"
  >
    <!-- Thumbnail -->
    <div v-if="!hideThumbnails" class="agds-file-upload-file__thumb-wrapper">
      <AGDSFileUploadFileThumbnail :src="imagePreview" />
    </div>

    <!-- File info -->
    <div class="agds-file-upload-file__info">
      <!-- Success icon -->
      <span v-if="status === 'success'" class="agds-file-upload-file__success-icon" role="img" aria-label="Success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" focusable="false" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </span>

      <!-- File name with optional link -->
      <span class="agds-file-upload-file__name">
        <AGDSTextLink
          v-if="file.href"
          :href="file.href"
          :download="file.download"
          rel="noopener noreferrer"
          target="_blank"
        >{{ file.name }}{{ sizeText }}</AGDSTextLink>
        <template v-else>{{ file.name }}<span v-if="file.size" class="agds-file-upload-file__size"> ({{ formatFileSize(file.size) }})</span></template>
      </span>
    </div>

    <!-- Actions -->
    <div class="agds-file-upload-file__actions">
      <!-- Uploading spinner -->
      <div v-if="status === 'uploading'" class="agds-file-upload-file__uploading" aria-label="Uploading">
        <span class="agds-file-upload-file__spinner" aria-hidden="true" />
        <span class="sr-only">Uploading</span>
      </div>

      <!-- Remove button -->
      <AGDSButton
        v-else
        variant="text"
        size="sm"
        type="button"
        :aria-label="`Remove file: ${file.name}`"
        @click="onRemove"
      >
        <template #iconBefore>
          <!-- Close / X icon -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" focusable="false" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </template>
        Remove
      </AGDSButton>
    </div>
  </li>
</template>

<style scoped>
.agds-file-upload-file {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-radius: var(--agds-border-radius, 4px);
  overflow: hidden;
}

.agds-file-upload-file--success {
  background-color: var(--agds-color-success-muted);
}

.agds-file-upload-file--shade {
  background-color: var(--agds-color-bg-shade);
}

.agds-file-upload-file__thumb-wrapper {
  display: contents;
}

.agds-file-upload-file__info {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding: var(--agds-space-3) var(--agds-space-4);
  flex: 1;
  min-width: 0;
}

.agds-file-upload-file__success-icon {
  flex-shrink: 0;
  color: var(--agds-color-success);
  display: inline-flex;
  align-items: center;
}

.agds-file-upload-file__name {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
  word-break: break-all;
}

.agds-file-upload-file__size {
  white-space: nowrap;
}

.agds-file-upload-file__actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-inline-end: var(--agds-space-4);
}

.agds-file-upload-file__uploading {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding-block: var(--agds-space-2);
}

.agds-file-upload-file__spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid var(--agds-color-action-primary);
  border-right-color: transparent;
  border-radius: 50%;
  animation: agds-file-spin 0.6s linear infinite;
}

@keyframes agds-file-spin {
  to { transform: rotate(360deg); }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

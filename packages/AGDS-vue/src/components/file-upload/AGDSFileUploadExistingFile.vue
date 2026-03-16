<script setup lang="ts">
import { computed } from 'vue'
import AGDSButton from '../button/AGDSButton.vue'
import AGDSTextLink from '../text-link/AGDSTextLink.vue'
import AGDSFileUploadFileThumbnail from './AGDSFileUploadFileThumbnail.vue'
import { type ExistingFile, formatFileSize } from './utils'

const props = defineProps<{
  file: ExistingFile
  hideThumbnails?: boolean
  onRemove: () => void
}>()

const sizeText = computed(() =>
  props.file.size ? ` (${formatFileSize(props.file.size)})` : '',
)
</script>

<template>
  <li class="agds-file-upload-existing-file">
    <!-- Thumbnail (server-provided src) -->
    <div v-if="!hideThumbnails" class="agds-file-upload-existing-file__thumb-wrapper">
      <AGDSFileUploadFileThumbnail :src="file.thumbnailSrc" />
    </div>

    <!-- File info -->
    <div class="agds-file-upload-existing-file__info">
      <!-- Success icon (existing files are always uploaded) -->
      <span class="agds-file-upload-existing-file__success-icon" role="img" aria-label="Success">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" focusable="false" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      </span>

      <span class="agds-file-upload-existing-file__name">
        <AGDSTextLink
          v-if="file.href"
          :href="file.href"
          :download="file.download"
          rel="noopener noreferrer"
          target="_blank"
          @click="file.onClick && file.onClick($event)"
        >{{ file.name }}{{ sizeText }}</AGDSTextLink>
        <template v-else>{{ file.name }}<span v-if="file.size" class="agds-file-upload-existing-file__size"> ({{ formatFileSize(file.size) }})</span></template>
      </span>
    </div>

    <!-- Remove button -->
    <div class="agds-file-upload-existing-file__actions">
      <AGDSButton
        variant="text"
        size="sm"
        type="button"
        :aria-label="`Remove file: ${file.name}`"
        @click="onRemove"
      >
        <template #iconBefore>
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
.agds-file-upload-existing-file {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-radius: var(--agds-border-radius, 4px);
  overflow: hidden;
  background-color: var(--agds-color-success-muted);
}

.agds-file-upload-existing-file__thumb-wrapper {
  display: contents;
}

.agds-file-upload-existing-file__info {
  display: flex;
  align-items: center;
  gap: var(--agds-space-2);
  padding: var(--agds-space-3) var(--agds-space-4);
  flex: 1;
  min-width: 0;
}

.agds-file-upload-existing-file__success-icon {
  flex-shrink: 0;
  color: var(--agds-color-success);
  display: inline-flex;
  align-items: center;
}

.agds-file-upload-existing-file__name {
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text);
  word-break: break-all;
}

.agds-file-upload-existing-file__size {
  white-space: nowrap;
}

.agds-file-upload-existing-file__actions {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-inline-end: var(--agds-space-4);
}
</style>

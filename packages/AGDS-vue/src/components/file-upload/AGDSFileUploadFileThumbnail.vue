<script setup lang="ts">
defineProps<{
  src?: string
}>()
</script>

<template>
  <!-- Image thumbnail -->
  <div
    v-if="src"
    class="agds-file-upload-thumbnail agds-file-upload-thumbnail--image"
    :style="{ backgroundImage: `url(${src})` }"
    aria-hidden="true"
  />
  <!-- Generic file icon -->
  <div
    v-else
    class="agds-file-upload-thumbnail agds-file-upload-thumbnail--icon"
    aria-hidden="true"
  >
    <!-- Material Symbols: description (file) icon -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 5h8v2H8v-2zm0-4h8v2H8v-2z" />
    </svg>
  </div>
</template>

<style scoped>
.agds-file-upload-thumbnail {
  flex-shrink: 0;
  width: 4.5rem;
  border-top-left-radius: var(--agds-border-radius, 4px);
  border-bottom-left-radius: var(--agds-border-radius, 4px);

  /* Hidden on small screens, shown on md+ */
  display: none;
}

@media (min-width: 48rem) {
  .agds-file-upload-thumbnail {
    display: flex;
  }
}

.agds-file-upload-thumbnail--image {
  background-size: cover;
  background-position: center;
}

.agds-file-upload-thumbnail--icon {
  align-items: center;
  justify-content: center;
  color: var(--agds-color-text-muted);
}
</style>

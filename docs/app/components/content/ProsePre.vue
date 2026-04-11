<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  meta?: string
}>()

const copied = ref(false)

async function copy() {
  if (!props.code) return
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <div class="prose-pre">
    <div class="prose-pre__toolbar">
      <span v-if="filename" class="prose-pre__filename">{{ filename }}</span>
      <span v-else-if="language" class="prose-pre__lang">{{ language }}</span>
      <button
        class="prose-pre__copy"
        :aria-label="copied ? 'Copied to clipboard' : 'Copy code'"
        @click="copy"
      >
        <span aria-hidden="true">{{ copied ? '✓ Copied' : 'Copy' }}</span>
      </button>
    </div>
    <pre class="prose-pre__block"><slot /></pre>
  </div>
</template>

<style scoped>
.prose-pre {
  margin-block: var(--agds-space-4);
  border-radius: var(--agds-radius-md);
  border: 1px solid #2d2d2d;
  overflow: hidden;
}

.prose-pre__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--agds-space-2) var(--agds-space-4);
  background-color: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.prose-pre__lang,
.prose-pre__filename {
  font-size: var(--agds-font-size-xs);
  font-family: var(--agds-font-family-mono);
  color: #9d9d9d;
  text-transform: lowercase;
}

.prose-pre__copy {
  font-size: var(--agds-font-size-xs);
  font-family: var(--agds-font-family-body);
  color: #9d9d9d;
  background: none;
  border: 1px solid #3d3d3d;
  border-radius: var(--agds-radius-sm);
  padding: 0.2em 0.6em;
  cursor: pointer;
  transition: color var(--agds-transition-fast), border-color var(--agds-transition-fast);
  line-height: 1.5;
}

.prose-pre__copy:hover {
  color: #ffffff;
  border-color: #6d6d6d;
}

.prose-pre__copy:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.prose-pre__block {
  margin: 0;
  padding: var(--agds-space-4) var(--agds-space-5);
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: var(--agds-font-family-mono);
  font-size: var(--agds-font-size-sm);
  line-height: var(--agds-line-height-relaxed);
  overflow-x: auto;
  tab-size: 2;
}
</style>

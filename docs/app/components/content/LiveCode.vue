<script setup lang="ts">
import { ref, computed, onMounted, shallowRef, defineAsyncComponent } from 'vue'

const props = defineProps<{
  /** The initial Vue SFC code to display and run */
  code: string
  /** Display title for the code editor */
  title?: string
}>()

const editableCode = ref(props.code.trim())
const copied = ref(false)
const showCode = ref(false)

// Lazy-load @vue/repl only in browser
const Repl = shallowRef<ReturnType<typeof defineAsyncComponent> | null>(null)
const store = shallowRef<unknown>(null)

onMounted(async () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vueRepl = await import('@vue/repl') as any
  await import('@vue/repl/style.css')

  const s = new vueRepl.ReplStore()
  s.setFiles({ 'App.vue': editableCode.value })
  store.value = s
  Repl.value = vueRepl.Repl
})

async function copyCode() {
  await navigator.clipboard.writeText(editableCode.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="live-code">
    <div class="live-code__toolbar">
      <span class="live-code__label">{{ title ?? 'Live example' }}</span>
      <div class="live-code__actions">
        <button
          class="live-code__btn"
          :aria-pressed="showCode"
          @click="showCode = !showCode"
        >
          {{ showCode ? 'Hide code' : 'Show code' }}
        </button>
        <button class="live-code__btn" @click="copyCode">
          {{ copied ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </div>

    <ClientOnly>
      <component
        :is="Repl"
        v-if="Repl"
        :store="store"
        :show-compile-output="false"
        :show-import-map="false"
        :clear-console="false"
        auto-resize
        style="height: 360px;"
      />
      <template #fallback>
        <div class="live-code__loading" aria-busy="true">Loading editor…</div>
      </template>
    </ClientOnly>

    <div v-if="showCode" class="live-code__source">
      <pre><code>{{ editableCode }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
.live-code {
  margin-block: var(--agds-space-6);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-lg);
  overflow: hidden;
}

.live-code__toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--agds-space-2) var(--agds-space-4);
  background-color: var(--agds-color-bg-subtle);
  border-bottom: 1px solid var(--agds-color-border);
}

.live-code__label {
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--agds-color-text-muted);
}

.live-code__actions {
  display: flex;
  gap: var(--agds-space-2);
}

.live-code__btn {
  padding: var(--agds-space-1) var(--agds-space-3);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-medium);
  font-family: var(--agds-font-family-body);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-sm);
  background-color: var(--agds-color-bg);
  color: var(--agds-color-text);
  cursor: pointer;
  transition: background-color var(--agds-transition-fast);
}

.live-code__btn:hover {
  background-color: var(--agds-color-bg-muted);
}

.live-code__btn:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.live-code__loading {
  padding: var(--agds-space-8);
  text-align: center;
  color: var(--agds-color-text-muted);
  font-size: var(--agds-font-size-sm);
}

.live-code__source pre {
  margin: 0;
  padding: var(--agds-space-4);
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-size: var(--agds-font-size-sm);
  line-height: var(--agds-line-height-relaxed);
  overflow-x: auto;
}
</style>

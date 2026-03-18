<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  /** 'default' | 'linked' | 'removable' | 'list' */
  variant?: string
}>()

const removableTags = ref(['Finance', 'Health', 'Education'])
function removeTag(label: string) {
  removableTags.value = removableTags.value.filter((t) => t !== label)
}

const listItems = ref([
  { label: 'Finance', removable: true },
  { label: 'Health', removable: true },
  { label: 'Education', href: '/topics/education' },
])
function onRemove(index: number) {
  listItems.value.splice(index, 1)
}
</script>

<template>
  <!-- default: plain tag -->
  <AGDSTag v-if="!variant || variant === 'default'" label="Finance" />

  <!-- linked: tag with href -->
  <AGDSTag v-else-if="variant === 'linked'" label="Finance" href="/topics/finance" />

  <!-- removable: interactive list of removable tags -->
  <div
    v-else-if="variant === 'removable'"
    style="display: flex; gap: 0.5rem; flex-wrap: wrap"
  >
    <AGDSTag
      v-for="tag in removableTags"
      :key="tag"
      :label="tag"
      removable
      @remove="removeTag(tag)"
    />
    <span v-if="removableTags.length === 0" style="font-style: italic; color: var(--agds-color-text-muted)">
      All tags removed
    </span>
  </div>

  <!-- list: AGDSTags with heading slot -->
  <AGDSTags v-else-if="variant === 'list'" :items="listItems" @remove="onRemove">
    <template #heading>
      <h3 style="margin: 0 0 0.5rem">Applied filters</h3>
    </template>
  </AGDSTags>
</template>

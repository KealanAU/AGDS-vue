<script setup lang="ts">
import { ref } from 'vue'
import AgDSTag from './AGDSTag.vue'

export interface TagItem {
  /** Display label for the tag. */
  label: string
  /** Optional href — makes the tag label a link. */
  href?: string
  /** When true, shows a remove button on this tag. */
  removable?: boolean
}

export interface AgDSTagsProps {
  /** List of tag items to render. */
  items: TagItem[]
}

defineProps<AgDSTagsProps>()

const emit = defineEmits<{
  /**
   * Fired when a tag's remove button is clicked.
   * `index` is the position in `items`; `event` is the original MouseEvent.
   */
  remove: [index: number, event: MouseEvent]
}>()

const listRef = ref<HTMLUListElement | null>(null)

/**
 * Focus management on remove.
 * Moves focus to the previous remove button (or to the first one when
 * the first tag is removed) before emitting so consumers see the focus
 * change before they mutate the items array.
 */
function onTagRemove(index: number, event: MouseEvent) {
  const buttons = listRef.value?.querySelectorAll<HTMLButtonElement>('.agds-tag__remove')
  if (buttons?.length) {
    const targetIndex = Math.max(0, index - 1)
    buttons[targetIndex]?.focus()
  }
  emit('remove', index, event)
}
</script>

<template>
  <!--
    Vertical stack: heading slot sits above the wrapping pill list.
    WCAG 1.3.1: the list conveys the group relationship to assistive
    technologies without needing an ARIA role.
  -->
  <div class="agds-tags">
    <slot name="heading" />

    <ul ref="listRef" class="agds-tags__list">
      <li v-for="(item, index) in items" :key="index" class="agds-tags__item">
        <AgDSTag
          :label="item.label"
          :href="item.href"
          :removable="item.removable"
          @remove="onTagRemove(index, $event)"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* ── Tags container ─────────────────────────────────────── */

.agds-tags {
  display: flex;
  flex-direction: column;
  gap: var(--agds-tag-group-gap);
}

/* ── Tags list ──────────────────────────────────────────── */

.agds-tags__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--agds-tag-group-list-gap);
  list-style: none;
  padding: 0;
  margin: 0;
}

.agds-tags__item {
  display: flex;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import AgDSStack from '../stack/AGDSStack.vue'
import AgDSHeading from '../heading/AGDSHeading.vue'
import AgDSText from '../text/AGDSText.vue'
import AGDSTaskListItem from './AGDSTaskListItem.vue'
import type { AgDSTaskListItemProps, TaskListItemStatus } from './AGDSTaskListItem.vue'

export type TaskListItem = AgDSTaskListItemProps & {
  /** Visible label text for the task */
  label: string
}

export interface AgDSTaskListProps {
  /** Array of task items to render */
  items: TaskListItem[]
  /** When true, renders an <ol> with counter prefixes on each item */
  ordered?: boolean
}

const props = withDefaults(defineProps<AgDSTaskListProps>(), {
  ordered: false,
})

const DONE_STATUSES: TaskListItemStatus[] = ['done', 'doneRecently']

const tasksCompleted = computed(
  () => props.items.filter(({ status }) => DONE_STATUSES.includes(status)).length,
)
</script>

<template>
  <AgDSStack :gap="3" class="agds-task-list">
    <!-- Heading section -->
    <AgDSStack :gap="2">
      <AgDSHeading type="h2">Complete these tasks</AgDSHeading>
      <AgDSText as="p" color="muted" font-size="sm">
        {{ tasksCompleted }} of {{ items.length }} tasks completed
      </AgDSText>
    </AgDSStack>

    <!-- Items list -->
    <component
      :is="ordered ? 'ol' : 'ul'"
      class="agds-task-list__items"
    >
      <AGDSTaskListItem
        v-for="(item, index) in items"
        :key="index"
        :status="item.status"
        :message="item.message"
        :ordered="ordered"
        :href="item.href"
        :type="item.type"
        :disabled="item.disabled"
      >
        {{ item.label }}
      </AGDSTaskListItem>
    </component>
  </AgDSStack>
</template>

<style scoped>
.agds-task-list__items {
  list-style: none;
  margin: 0;
  padding: 0;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  counter-reset: task-count;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import AGDSIcon from '../icon/AGDSIcon.vue'
import AGDSVisuallyHidden from '../visually-hidden/AGDSVisuallyHidden.vue'

/**
 * Completion status of a single task in a task list.
 *
 * - `'todo'` — Task has not been started yet.
 * - `'doing'` — Task is currently in progress.
 * - `'done'` — Task has been completed.
 * - `'doneRecently'` — Task was completed in the current session (highlighted as newly done).
 * - `'blocked'` — Task cannot be started until another task is completed.
 * - `'notRequired'` — Task does not need to be completed for this service application.
 */
export type TaskListItemStatus =
  | 'notRequired'
  | 'blocked'
  | 'doing'
  | 'todo'
  | 'done'
  | 'doneRecently'

export interface AGDSTaskListItemProps {
  /** Current progress status of the task */
  status: TaskListItemStatus
  /** Secondary description displayed below the label */
  message?: string
  /** When true, a counter prefix is rendered before the label */
  ordered?: boolean
  /** Renders the item as an <a> when provided */
  href?: string
  /** Passed to <button> when no href is given */
  type?: 'button' | 'submit' | 'reset'
  /** Disables the interactive element */
  disabled?: boolean
}

const props = withDefaults(defineProps<AGDSTaskListItemProps>(), {
  ordered: false,
  type: 'button',
  disabled: false,
})

defineEmits<{
  /** Emitted when the task item is clicked (only when the task is interactive). */
  click: [event: MouseEvent]
  /** Emitted when the task item receives focus. */
  focus: [event: FocusEvent]
  /** Emitted when the task item loses focus. */
  blur: [event: FocusEvent]
}>()

const isLink = computed(() => !!props.href)

const STATUS_MAP: Record<
  TaskListItemStatus,
  { label: string; icon: string; iconColor: string }
> = {
  notRequired: {
    label: 'No longer required',
    icon: 'mdi:minus-circle-outline',
    iconColor: 'var(--agds-color-border)',
  },
  blocked: {
    label: 'Cannot start yet',
    icon: 'mdi:lock-outline',
    iconColor: 'var(--agds-color-border)',
  },
  doing: {
    label: 'In progress',
    icon: 'mdi:clock-outline',
    iconColor: 'var(--agds-color-action-primary)',
  },
  todo: {
    label: 'Not started',
    icon: 'mdi:radiobox-blank',
    iconColor: 'var(--agds-color-action-primary)',
  },
  done: {
    label: 'Completed',
    icon: 'mdi:check-circle',
    iconColor: 'var(--agds-color-success)',
  },
  doneRecently: {
    label: 'Completed',
    icon: 'mdi:check-circle',
    iconColor: 'var(--agds-color-success)',
  },
}

const statusInfo = computed(() => STATUS_MAP[props.status])
</script>

<template>
  <li
    class="agds-task-list-item"
    :class="`agds-task-list-item--${status}`"
  >
    <component
      :is="isLink ? 'a' : 'button'"
      :href="isLink ? href : undefined"
      :type="isLink ? undefined : type"
      :disabled="!isLink && disabled ? true : undefined"
      :aria-disabled="disabled ? true : undefined"
      class="agds-task-list-item__trigger"
      @click="$emit('click', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    >
      <!-- Left group: desktop icon + body -->
      <span class="agds-task-list-item__left">
        <!-- Desktop: large icon on the left -->
        <span class="agds-task-list-item__icon-desktop" aria-hidden="true">
          <AGDSIcon
            :name="statusInfo.icon"
            size="xl"
            :color="statusInfo.iconColor"
          />
        </span>

        <!-- Label + mobile status row + message -->
        <span class="agds-task-list-item__body">
          <!-- Label row -->
          <span class="agds-task-list-item__label">
            <span v-if="ordered" class="agds-task-list-item__counter" aria-hidden="true" />
            <slot />
            <AGDSVisuallyHidden>.</AGDSVisuallyHidden>
          </span>

          <!-- Mobile: small icon + status label -->
          <span class="agds-task-list-item__status">
            <AGDSIcon
              class="agds-task-list-item__icon-mobile"
              :name="statusInfo.icon"
              size="md"
              :color="statusInfo.iconColor"
              aria-hidden="true"
            />
            <span class="agds-task-list-item__status-label">
              {{ statusInfo.label }}
              <AGDSVisuallyHidden>.</AGDSVisuallyHidden>
            </span>
          </span>

          <!-- Optional message -->
          <span v-if="message" class="agds-task-list-item__message">
            {{ message }}
          </span>
        </span>
      </span><!-- /.agds-task-list-item__left -->

      <!-- Arrow -->
      <AGDSIcon
        name="mdi:arrow-right"
        class="agds-task-list-item__arrow"
        :color="'var(--agds-color-action-primary)'"
        aria-hidden="true"
      />
    </component>
  </li>
</template>

<style scoped>
/* ── List item shell ─────────────────────────────────────── */
.agds-task-list-item {
  counter-increment: task-count;
}

/* ── doneRecently tint ───────────────────────────────────── */
.agds-task-list-item--doneRecently .agds-task-list-item__trigger {
  background-color: var(--agds-color-success-muted);
}

/* ── doing: left accent bar ──────────────────────────────── */
.agds-task-list-item--doing .agds-task-list-item__trigger {
  position: relative;
}
.agds-task-list-item--doing .agds-task-list-item__trigger::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 4px;
  background-color: var(--agds-color-action-primary);
}

/* ── Interactive element ─────────────────────────────────── */
.agds-task-list-item__trigger {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--agds-space-2);
  width: 100%;
  padding: var(--agds-space-2);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-decoration: none;
  color: var(--agds-color-text);
  font-family: var(--agds-font-family-body);
  text-align: left;
  cursor: pointer;
}

/* ── Left group: icon + body ─────────────────────────────── */
.agds-task-list-item__left {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0;
  flex: 1;
}

.agds-task-list-item__trigger:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-task-list-item__trigger:hover .agds-task-list-item__label {
  text-decoration: none;
  color: var(--agds-color-text);
}

.agds-task-list-item__trigger:focus-visible {
  outline: var(--agds-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Body: contains label, status, message ───────────────── */
.agds-task-list-item__body {
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-1);
  flex: 1;
}

/* ── Label ───────────────────────────────────────────────── */
.agds-task-list-item__label {
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-bold);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-action-primary);
  text-decoration: underline;
}

.agds-task-list-item__trigger:hover .agds-task-list-item__label {
  text-decoration: none;
  color: var(--agds-color-text);
}

/* ── Ordered counter (CSS counter) ──────────────────────── */
.agds-task-list-item__counter::before {
  content: counter(task-count) '. ';
}

/* ── Mobile status row (icon + label) ───────────────────── */
.agds-task-list-item__status {
  display: flex;
  align-items: center;
  gap: calc(var(--agds-space-1) / 2); /* ~2px — React gap={0.25} */
}

.agds-task-list-item__status-label {
  font-size: var(--agds-font-size-xs);
  line-height: var(--agds-line-height-tight);
  color: var(--agds-color-text-muted);
}

/* ── Message ─────────────────────────────────────────────── */
.agds-task-list-item__message {
  font-size: var(--agds-font-size-sm);
  color: var(--agds-color-text-muted);
}

/* ── Desktop: large icon hidden on mobile ───────────────── */
.agds-task-list-item__icon-desktop {
  display: none;
}

/* ── Arrow ───────────────────────────────────────────────── */
.agds-task-list-item__arrow {
  flex-shrink: 0;
  align-self: center;
}

/* ── Desktop breakpoint (≥ 768px) ────────────────────────── */
@media (min-width: 48rem) {
  .agds-task-list-item__trigger {
    flex-direction: row;
    align-items: center;
  }

  .agds-task-list-item__left {
    align-items: center;
    gap: var(--agds-space-2); /* React gap={[0, 1]} — 8px on desktop */
  }

  .agds-task-list-item__icon-desktop {
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .agds-task-list-item__icon-mobile {
    display: none;
  }

  .agds-task-list-item__label {
    font-size: var(--agds-font-size-lg);
  }

  .agds-task-list-item__status-label {
    font-size: var(--agds-font-size-sm);
  }
}
</style>

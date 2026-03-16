<script setup lang="ts">
import { computed } from 'vue'
import AppLayoutSidebarNavItem from './AppLayoutSidebarNavItem.vue'
import {
  getGroupItems,
  getGroupOptions,
  type AppLayoutNavGroup,
  type AppLayoutSubLevelVisible,
  type AppLayoutBackground,
} from './appLayoutTypes'

export interface AgDSAppLayoutSidebarNavProps {
  /** Navigation groups — arrays of items, or objects with items + options. */
  items: AppLayoutNavGroup[]
  /** Currently active path for highlighting. */
  activePath: string
  /** Controls when sub-level items are revealed. */
  subLevelVisible?: AppLayoutSubLevelVisible
  /** Background variant — affects hover colours. */
  background?: AppLayoutBackground
}

const props = withDefaults(defineProps<AgDSAppLayoutSidebarNavProps>(), {
  subLevelVisible: 'whenActive',
  background: 'bodyAlt',
})

const emit = defineEmits<{ close: [] }>()

// Normalise groups into arrays of items + divider metadata
const groups = computed(() =>
  props.items.map((group) => ({
    items: getGroupItems(group),
    options: getGroupOptions(group),
  })),
)
</script>

<template>
  <nav aria-label="Main" class="agds-alsnav" aria-labelledby="agds-alsnav-label">
    <span id="agds-alsnav-label" class="sr-only">Menu</span>
    <ul class="agds-alsnav__list" role="list">
      <template v-for="(group, gi) in groups" :key="gi">
        <!-- Divider between groups -->
        <li
          v-if="gi > 0"
          class="agds-alsnav__divider-item"
          :class="{
            'agds-alsnav__divider-item--no-top': groups[gi - 1].options?.disableGroupPadding,
            'agds-alsnav__divider-item--no-bottom': group.options?.disableGroupPadding,
          }"
          aria-hidden="true"
        >
          <hr class="agds-alsnav__divider" />
        </li>

        <!-- Group items -->
        <AppLayoutSidebarNavItem
          v-for="(item, ii) in group.items"
          :key="ii"
          :item="item"
          :active-path="activePath"
          :level="1"
          :sub-level-visible="subLevelVisible"
          :background="background"
          @close="emit('close')"
        />
      </template>
    </ul>
  </nav>
</template>

<style scoped>
/* ── Nav root ────────────────────────────────────────────── */

.agds-alsnav {
  font-family: var(--agds-font-family-body);
  padding-bottom: var(--agds-space-6);
}

/* ── List ────────────────────────────────────────────────── */

.agds-alsnav__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* ── Divider ─────────────────────────────────────────────── */

.agds-alsnav__divider-item {
  padding-block: var(--agds-space-4);
}

.agds-alsnav__divider-item--no-top {
  padding-top: 0;
}

.agds-alsnav__divider-item--no-bottom {
  padding-bottom: 0;
}

.agds-alsnav__divider {
  box-sizing: content-box;
  height: 0;
  margin: 0;
  overflow: visible;
  border: none;
  border-top: var(--agds-border-width-sm) solid var(--agds-color-border);
  width: 100%;
}

/* ── Utilities ───────────────────────────────────────────── */

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

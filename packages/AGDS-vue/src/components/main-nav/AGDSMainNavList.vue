<script setup lang="ts">
import AGDSDropdownMenu from '../dropdown-menu/AGDSDropdownMenu.vue'
import AGDSDropdownMenuButton from '../dropdown-menu/AGDSDropdownMenuButton.vue'
import AGDSDropdownMenuPanel from '../dropdown-menu/AGDSDropdownMenuPanel.vue'
import AGDSDropdownMenuItemLink from '../dropdown-menu/AGDSDropdownMenuItemLink.vue'
import { type MainNavItem, isLinkItem, isDropdownItem } from './mainNavTypes'

interface Props {
  items: MainNavItem[]
  activePath: string
  type: 'primary' | 'secondary'
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Main',
})
</script>

<template>
  <nav
    :aria-label="props.ariaLabel"
    :class="[
      'agds-main-nav__list-nav',
      `agds-main-nav__list-nav--${props.type}`,
    ]"
  >
    <ul class="agds-main-nav__list" role="list">
      <li
        v-for="(item, index) in props.items"
        :key="index"
        class="agds-main-nav__list-item"
      >
        <!-- Link -->
        <a
          v-if="isLinkItem(item)"
          :href="item.href"
          :aria-current="item.href === props.activePath ? 'page' : undefined"
          :class="[
            'agds-main-nav__link',
            { 'agds-main-nav__link--active': item.href === props.activePath },
          ]"
        >
          {{ item.label }}
        </a>

        <!-- Dropdown -->
        <AGDSDropdownMenu
          v-else-if="isDropdownItem(item)"
          popover-placement="bottom-end"
          :popover-offset="-8"
        >
          <AGDSDropdownMenuButton>{{ item.label }}</AGDSDropdownMenuButton>
          <AGDSDropdownMenuPanel>
            <template v-for="(sub, si) in item.items" :key="si">
              <AGDSDropdownMenuItemLink
                v-if="isLinkItem(sub)"
                :href="sub.href"
              >
                {{ sub.label }}
              </AGDSDropdownMenuItemLink>
            </template>
          </AGDSDropdownMenuPanel>
        </AGDSDropdownMenu>

        <!-- Button -->
        <button
          v-else
          type="button"
          class="agds-main-nav__link"
          @click="(item as any).onClick?.($event)"
        >
          {{ item.label }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* Primary list hidden on mobile (shown in the dialog instead) */
.agds-main-nav__list-nav--primary {
  display: none;
}

@media (min-width: 48rem) {
  .agds-main-nav__list-nav--primary {
    display: flex;
  }
}

.agds-main-nav__list-nav--secondary {
  display: flex;
  margin-inline-start: auto;
}

.agds-main-nav__list {
  display: flex;
  align-items: stretch;
  list-style: none;
  margin: 0;
  padding: 0;
}

.agds-main-nav__list-item {
  display: flex;
  align-items: stretch;
}

/* Shared link/button styles */
.agds-main-nav__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--agds-space-4);
  min-height: 3.5rem;

  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  line-height: 1;
  text-decoration: none;
  white-space: nowrap;

  color: var(--agds-color-action-primary);
  background: none;
  border: none;
  cursor: pointer;

  transition:
    color var(--agds-transition-fast),
    background-color var(--agds-transition-fast);
}

.agds-main-nav__link:hover {
  color: var(--agds-color-text);
  background-color: var(--agds-main-nav-link-hover-bg);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-main-nav__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
  z-index: 1;
}

/* Active indicator — thick line below the link */
.agds-main-nav__link--active {
  color: var(--agds-color-text);
}

.agds-main-nav__link--active::after {
  content: '';
  position: absolute;
  bottom: -0.375rem; /* sits just below the nav border */
  left: 0;
  right: 0;
  height: 0.375rem;
  background-color: var(--agds-main-nav-link-active-bg);
}

/* Let the dropdown menu container fill the list item height */
:deep(.agds-dropdown-menu) {
  display: flex;
  align-items: stretch;
}

/* Override dropdown button to look like a nav link */
:deep(.agds-dropdown-menu-btn) {
  padding-inline: var(--agds-space-4);
  min-height: 3.5rem;
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-action-primary);
  background: none;
  border-color: transparent;
  height: auto;
}

:deep(.agds-dropdown-menu-btn:hover) {
  color: var(--agds-color-text);
  background-color: var(--agds-main-nav-link-hover-bg);
}
</style>

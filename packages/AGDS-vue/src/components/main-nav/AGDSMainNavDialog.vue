<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { type MainNavItem, isLinkItem, isDropdownItem } from './mainNavTypes'

interface Props {
  id?: string
  items?: MainNavItem[]
  activePath: string
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ close: [] }>()

const dialogEl = ref<HTMLElement | null>(null)
const closeButtonEl = ref<HTMLButtonElement | null>(null)

// Focus the close button when the dialog opens; restore focus when it closes
watch(
  () => props.isOpen,
  async (open) => {
    if (open) {
      await nextTick()
      closeButtonEl.value?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  },
)

function close() {
  emit('close')
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    close()
    return
  }

  // Basic focus trap — keep Tab inside the dialog
  if (event.key === 'Tab') {
    const focusable = dialogEl.value?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex="0"]',
    )
    if (!focusable?.length) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="agds-main-nav-dialog">
      <div
        v-if="props.isOpen"
        class="agds-main-nav-dialog__backdrop"
        aria-hidden="true"
        @click="close"
      />
    </Transition>
    <Transition name="agds-main-nav-dialog-panel">
      <div
        v-if="props.isOpen"
        ref="dialogEl"
        :id="props.id"
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        class="agds-main-nav-dialog"
        @keydown="handleKeydown"
      >
        <!-- Header -->
        <div class="agds-main-nav-dialog__header">
          <button
            ref="closeButtonEl"
            type="button"
            class="agds-main-nav-dialog__close"
            aria-label="Close menu"
            @click="close"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="agds-main-nav-dialog__close-icon"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            <span>Close</span>
          </button>
        </div>

        <!-- Nav items -->
        <nav aria-label="Main" class="agds-main-nav-dialog__nav">
          <ul class="agds-main-nav-dialog__list" role="list">
            <template v-for="(item, index) in props.items" :key="index">
              <!-- Link -->
              <li v-if="isLinkItem(item)">
                <a
                  :href="item.href"
                  :aria-current="item.href === props.activePath ? 'page' : undefined"
                  :class="[
                    'agds-main-nav-dialog__link',
                    { 'agds-main-nav-dialog__link--active': item.href === props.activePath },
                  ]"
                  @click="close"
                >
                  {{ item.label }}
                </a>
              </li>

              <!-- Dropdown — expanded inline in mobile menu -->
              <li v-else-if="isDropdownItem(item)">
                <span class="agds-main-nav-dialog__group-label">{{ item.label }}</span>
                <ul class="agds-main-nav-dialog__group-list" role="list">
                  <li v-for="(sub, si) in item.items" :key="si">
                    <a
                      v-if="isLinkItem(sub)"
                      :href="sub.href"
                      :aria-current="sub.href === props.activePath ? 'page' : undefined"
                      :class="[
                        'agds-main-nav-dialog__link',
                        'agds-main-nav-dialog__link--sub',
                        { 'agds-main-nav-dialog__link--active': sub.href === props.activePath },
                      ]"
                      @click="close"
                    >
                      {{ sub.label }}
                    </a>
                    <button
                      v-else
                      type="button"
                      class="agds-main-nav-dialog__link agds-main-nav-dialog__link--sub"
                      @click="(sub as any).onClick?.($event); close()"
                    >
                      {{ sub.label }}
                    </button>
                  </li>
                </ul>
              </li>

              <!-- Button -->
              <li v-else>
                <button
                  type="button"
                  class="agds-main-nav-dialog__link"
                  @click="(item as any).onClick?.($event); close()"
                >
                  {{ item.label }}
                </button>
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Backdrop ────────────────────────────────────────────── */

.agds-main-nav-dialog__backdrop {
  position: fixed;
  inset: 0;
  background-color: var(--agds-color-overlay);
  z-index: var(--agds-z-overlay, 100);
}

/* ── Dialog panel ────────────────────────────────────────── */

.agds-main-nav-dialog {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: min(20rem, 100vw);
  z-index: var(--agds-z-modal, 200);
  background-color: var(--agds-color-bg);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-shadow: var(--agds-shadow-lg, 0 8px 24px rgb(0 0 0 / 0.16));
}

/* Hide dialog on desktop — nav items visible in the bar */
@media (min-width: 48rem) {
  .agds-main-nav-dialog {
    display: none;
  }
}

/* ── Header ──────────────────────────────────────────────── */

.agds-main-nav-dialog__header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: var(--agds-space-3) var(--agds-space-4);
  border-bottom: var(--agds-border-width-sm) solid var(--agds-color-border);
}

.agds-main-nav-dialog__close {
  display: inline-flex;
  align-items: center;
  gap: var(--agds-space-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--agds-space-2) var(--agds-space-3);
  border-radius: var(--agds-radius-md, 0.375rem);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-sm);
  font-weight: var(--agds-font-weight-medium);
  color: var(--agds-color-text);
  transition: background-color var(--agds-transition-fast, 150ms ease);
}

.agds-main-nav-dialog__close:hover {
  background-color: var(--agds-color-bg-subtle);
}

.agds-main-nav-dialog__close:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

.agds-main-nav-dialog__close-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* ── Nav list ────────────────────────────────────────────── */

.agds-main-nav-dialog__nav {
  flex: 1;
  padding: var(--agds-space-4) 0;
}

.agds-main-nav-dialog__list,
.agds-main-nav-dialog__group-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.agds-main-nav-dialog__group-label {
  display: block;
  padding: var(--agds-space-3) var(--agds-space-5);
  font-size: var(--agds-font-size-xs);
  font-weight: var(--agds-font-weight-semibold);
  color: var(--agds-color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.agds-main-nav-dialog__link {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--agds-space-3) var(--agds-space-5);
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-font-size-md);
  font-weight: var(--agds-font-weight-medium);
  text-decoration: none;
  color: var(--agds-color-action-primary);
  background: none;
  border: none;
  cursor: pointer;
  text-align: start;
  transition: background-color var(--agds-transition-fast, 150ms ease);
}

.agds-main-nav-dialog__link:hover {
  background-color: var(--agds-color-bg-subtle);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.agds-main-nav-dialog__link:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: -3px;
}

.agds-main-nav-dialog__link--active {
  color: var(--agds-color-text);
  font-weight: var(--agds-font-weight-bold);
  border-inline-start: 3px solid var(--agds-color-border-brand);
}

.agds-main-nav-dialog__link--sub {
  padding-inline-start: var(--agds-space-8);
  font-size: var(--agds-font-size-sm);
}

/* ── Transitions ─────────────────────────────────────────── */

.agds-main-nav-dialog-enter-active,
.agds-main-nav-dialog-leave-active {
  transition: opacity var(--agds-transition-normal, 250ms ease);
}

.agds-main-nav-dialog-enter-from,
.agds-main-nav-dialog-leave-to {
  opacity: 0;
}

.agds-main-nav-dialog-panel-enter-active,
.agds-main-nav-dialog-panel-leave-active {
  transition: transform var(--agds-transition-normal, 250ms ease);
}

.agds-main-nav-dialog-panel-enter-from,
.agds-main-nav-dialog-panel-leave-to {
  transform: translateX(-100%);
}
</style>

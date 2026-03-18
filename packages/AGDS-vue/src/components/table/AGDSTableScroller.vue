<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

export interface AGDSTableScrollerProps {}

// ── Refs ────────────────────────────────────────────────────

const trackRef = ref<HTMLDivElement | null>(null)
const thumbRef = ref<HTMLButtonElement | null>(null)
const scrollerRef = ref<HTMLElement | null>(null)

// Plain object — not reactive; used only for drag delta calculations.
const mousePos = { x: 0, y: 0 }

// ── State ───────────────────────────────────────────────────

const shadowHeight = ref(0)
const scrollerAriaLabel = ref('')
const isDraggingThumb = ref(false)
const thumbPosition = ref(0)
/** 1 = no scroll needed; < 1 = scrollable. */
const thumbWidthRatio = ref(1)
let buttonIntervalId: number | null = null

const hasScroll = computed(() => thumbWidthRatio.value !== 1)

// ── Thumb geometry ──────────────────────────────────────────

function repositionThumb() {
  if (!scrollerRef.value) return
  thumbPosition.value = scrollerRef.value.scrollLeft * thumbWidthRatio.value
}

function calculateThumbWidth() {
  const scroller = scrollerRef.value
  const track = trackRef.value
  if (!scroller || !track) return

  if (scroller.offsetWidth === scroller.scrollWidth) {
    thumbWidthRatio.value = 1
  } else {
    thumbWidthRatio.value =
      track.offsetWidth /
      (scroller.scrollWidth - (scroller.offsetWidth - track.offsetWidth))
  }
}

// ── Shadow visibility ───────────────────────────────────────

const showLeftShadow = computed(() => {
  if (!hasScroll.value) return false
  return (scrollerRef.value?.scrollLeft ?? 0) > 0
})

const showRightShadow = computed(() => {
  if (!hasScroll.value) return false
  const s = scrollerRef.value
  if (!s) return false
  return Math.ceil(s.scrollLeft + s.offsetWidth) < s.scrollWidth
})

// ── ResizeObserver ──────────────────────────────────────────

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  if (typeof window === 'undefined' || !('ResizeObserver' in window) || !scrollerRef.value) return

  resizeObserver = new ResizeObserver((entries) => {
    shadowHeight.value = entries[0].contentRect.height
    calculateThumbWidth()
    repositionThumb()
  })
  resizeObserver.observe(scrollerRef.value)

  // Derive aria-label from the first caption or aria-labelledby inside the scroller.
  const captionEl = scrollerRef.value.querySelector('caption')
  if (captionEl) {
    scrollerAriaLabel.value = `Table ${captionEl.textContent ?? ''}`
  } else {
    const labelledTable = scrollerRef.value.querySelector<HTMLTableElement>('table[aria-labelledby]')
    if (labelledTable) {
      const labelId = labelledTable.getAttribute('aria-labelledby') ?? ''
      const labelEl = document.getElementById(labelId)
      scrollerAriaLabel.value = `Table ${labelEl?.textContent ?? ''}`
    }
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  clearButtonInterval()
})

// ── Drag: thumb ─────────────────────────────────────────────

function handleThumbPress(event: MouseEvent | TouchEvent) {
  event.preventDefault()
  isDraggingThumb.value = true

  if (event instanceof MouseEvent && event.button === 0) {
    mousePos.x = event.pageX
    mousePos.y = event.pageY
  } else if (event instanceof TouchEvent && event.touches.length) {
    mousePos.x = event.touches[0].pageX
    mousePos.y = event.touches[0].pageY
  }
}

function handleThumbMove(event: MouseEvent | TouchEvent) {
  if (!isDraggingThumb.value || !scrollerRef.value) return

  let pageX: number
  let pageY: number

  if (event instanceof TouchEvent && event.touches.length) {
    pageX = event.touches[0].pageX
    pageY = event.touches[0].pageY
  } else if (event instanceof MouseEvent) {
    pageX = event.pageX
    pageY = event.pageY
  } else {
    return
  }

  const deltaX = pageX - mousePos.x
  const deltaY = pageY - mousePos.y

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    event.preventDefault()
    scrollerRef.value.scrollLeft += deltaX / thumbWidthRatio.value
    mousePos.x = pageX
  }

  mousePos.y = pageY
}

function handleThumbRelease() {
  if (isDraggingThumb.value) {
    isDraggingThumb.value = false
  }
}

watch(isDraggingThumb, (dragging) => {
  if (dragging) {
    document.addEventListener('mousemove', handleThumbMove as EventListener)
    document.addEventListener('mouseup', handleThumbRelease)
    document.addEventListener('touchmove', handleThumbMove as EventListener, { passive: false })
    document.addEventListener('touchend', handleThumbRelease)
  } else {
    document.removeEventListener('mousemove', handleThumbMove as EventListener)
    document.removeEventListener('mouseup', handleThumbRelease)
    document.removeEventListener('touchmove', handleThumbMove as EventListener)
    document.removeEventListener('touchend', handleThumbRelease)
  }
})

// ── Arrow buttons ───────────────────────────────────────────

function handleButtonClick(direction: 'left' | 'right') {
  const amount = direction === 'left' ? -40 : 40
  if (scrollerRef.value) scrollerRef.value.scrollLeft += amount
  clearButtonInterval()
}

function handleButtonPress(event: MouseEvent | TouchEvent, direction: 'left' | 'right') {
  const amount = direction === 'left' ? -40 : 40
  const isValidEvent =
    event instanceof TouchEvent ||
    (event instanceof MouseEvent && event.button === 0)

  buttonIntervalId = window.setInterval(() => {
    if (scrollerRef.value && isValidEvent) {
      scrollerRef.value.scrollLeft += amount
    }
  }, 100)
}

function clearButtonInterval() {
  if (buttonIntervalId !== null) {
    clearInterval(buttonIntervalId)
    buttonIntervalId = null
  }
}

// ── Track click ─────────────────────────────────────────────

function handleTrackClick(event: MouseEvent) {
  const thumb = thumbRef.value
  const scroller = scrollerRef.value
  if (!thumb || !scroller) return

  const { left, right, width } = thumb.getBoundingClientRect()
  if (event.pageX > right) {
    scroller.scrollLeft += width * 0.95
  } else if (event.pageX < left) {
    scroller.scrollLeft -= width * 0.95
  }
}
</script>

<template>
  <div class="agds-table-scroller">
    <!-- Scrollable region ──────────────────────────────────── -->
    <section
      ref="scrollerRef"
      class="agds-table-scroller__region"
      :aria-label="scrollerAriaLabel || undefined"
      :tabindex="hasScroll ? 0 : -1"
      @scroll="repositionThumb"
    >
      <slot />

      <!-- Left shadow -->
      <div
        class="agds-table-scroller__shadow agds-table-scroller__shadow--left"
        :class="showLeftShadow && 'agds-table-scroller__shadow--visible'"
        :style="{ height: `${shadowHeight}px` }"
        aria-hidden="true"
      />
      <!-- Right shadow -->
      <div
        class="agds-table-scroller__shadow agds-table-scroller__shadow--right"
        :class="showRightShadow && 'agds-table-scroller__shadow--visible'"
        :style="{ height: `${shadowHeight}px` }"
        aria-hidden="true"
      />
    </section>

    <!-- Custom scrollbar ───────────────────────────────────── -->
    <div
      class="agds-table-scroller__bar"
      :style="{ display: hasScroll ? undefined : 'none' }"
    >
      <!-- Left arrow -->
      <button
        type="button"
        class="agds-table-scroller__arrow"
        tabindex="-1"
        aria-hidden="true"
        @click="handleButtonClick('left')"
        @mousedown="handleButtonPress($event, 'left')"
        @mouseleave="clearButtonInterval"
        @mouseup="clearButtonInterval"
        @touchstart.passive="handleButtonPress($event, 'left')"
        @touchend="clearButtonInterval"
      >
        <!-- Chevron left SVG -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <path d="M10 3L5 8L10 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- Track -->
      <div
        ref="trackRef"
        class="agds-table-scroller__track"
        tabindex="-1"
        aria-hidden="true"
        @click="handleTrackClick"
      >
        <!-- Thumb -->
        <button
          ref="thumbRef"
          type="button"
          class="agds-table-scroller__thumb"
          tabindex="-1"
          aria-hidden="true"
          :style="{
            left: `${thumbPosition}px`,
            width: `${thumbWidthRatio * 100}%`,
          }"
          @mousedown="handleThumbPress"
          @touchstart.prevent="handleThumbPress"
        />
      </div>

      <!-- Right arrow -->
      <button
        type="button"
        class="agds-table-scroller__arrow"
        tabindex="-1"
        aria-hidden="true"
        @click="handleButtonClick('right')"
        @mousedown="handleButtonPress($event, 'right')"
        @mouseleave="clearButtonInterval"
        @mouseup="clearButtonInterval"
        @touchstart.passive="handleButtonPress($event, 'right')"
        @touchend="clearButtonInterval"
      >
        <!-- Chevron right SVG -->
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false">
          <path d="M6 3L11 8L6 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ── Outer wrapper ────────────────────────────────────────── */

.agds-table-scroller {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--agds-space-2);
}

/* ── Scrollable region ────────────────────────────────────── */

.agds-table-scroller__region {
  position: relative;
  width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: none;
  /* Hide native scrollbar — we render our own. */
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.agds-table-scroller__region::-webkit-scrollbar,
.agds-table-scroller__region::-webkit-scrollbar-thumb,
.agds-table-scroller__region::-webkit-scrollbar-track {
  display: none;
}

.agds-table-scroller__region:focus-visible {
  outline: var(--agds-color-focus-width) solid var(--agds-color-focus);
  outline-offset: 2px;
}

/* ── Shadows ──────────────────────────────────────────────── */

.agds-table-scroller__shadow {
  position: absolute;
  top: 0;
  width: 28px;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--agds-transition-normal);
}

.agds-table-scroller__shadow--visible {
  opacity: 1;
}

.agds-table-scroller__shadow--left {
  left: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.08), transparent);
}

.agds-table-scroller__shadow--right {
  right: 0;
  background: linear-gradient(to left, rgba(0, 0, 0, 0.08), transparent);
}

/* ── Custom scrollbar bar ─────────────────────────────────── */

.agds-table-scroller__bar {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--agds-space-1);
  background-color: var(--agds-color-bg);
}

/* ── Arrow buttons ────────────────────────────────────────── */

.agds-table-scroller__arrow {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  appearance: none;
  background: none;
  border: none;
  cursor: default;
  color: var(--agds-color-border);
}

/* ── Track ────────────────────────────────────────────────── */

.agds-table-scroller__track {
  position: relative;
  flex-grow: 1;
  height: var(--agds-table-scrollbar-height);
  background-color: var(--agds-table-scrollbar-track-bg);
  border: var(--agds-border-width-sm) solid var(--agds-color-border);
  border-radius: var(--agds-radius-full);
  padding: 0;
  cursor: default;
}

/* ── Thumb ────────────────────────────────────────────────── */

.agds-table-scroller__thumb {
  position: absolute;
  top: 0;
  bottom: 0;
  padding: 0;
  border: none;
  border-radius: var(--agds-radius-full);
  background-color: var(--agds-table-scrollbar-thumb-color);
  cursor: default;
  appearance: none;
  touch-action: none;
}

/* High-contrast mode */
@media (forced-colors: active) {
  .agds-table-scroller__thumb {
    background-color: CaptionText;
  }
}
</style>

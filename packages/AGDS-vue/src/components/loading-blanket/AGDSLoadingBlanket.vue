<script setup lang="ts">
import { computed } from 'vue'

export interface AgDSLoadingBlanketProps {
  /** If true, the blanket covers the entire viewport with a semi-transparent overlay. */
  fullScreen?: boolean
  /** Text displayed below the loading dots; announced to assistive technologies. */
  label: string
}

const props = withDefaults(defineProps<AgDSLoadingBlanketProps>(), {
  fullScreen: false,
})

const dotCount = computed(() => (props.fullScreen ? 5 : 3))
const dotSize = computed(() => (props.fullScreen ? 'lg' : 'md'))
</script>

<template>
  <div
    :class="[
      'agds-loading-blanket',
      { 'agds-loading-blanket--full-screen': fullScreen },
    ]"
  >
    <div class="agds-loading-blanket__content">
      <!--
        Animated dots: purely decorative, hidden from assistive technologies.
        The label element below handles the accessible announcement.
      -->
      <span
        :class="['agds-loading-dots', `agds-loading-dots--${dotSize}`]"
        aria-hidden="true"
      >
        <span
          v-for="i in dotCount"
          :key="i"
          class="agds-loading-dots__dot"
          :style="{ animationDelay: `${(i - 1) * 100}ms` }"
        />
      </span>

      <!--
        WCAG 4.1.3: live region that announces the loading state without moving focus.
        role="alert" (assertive) for fullScreen — it demands immediate attention.
        role="status" (polite) for inline — it waits for the user to finish.
      -->
      <p
        :role="fullScreen ? 'alert' : 'status'"
        class="agds-loading-blanket__label"
      >
        {{ label }}
      </p>
    </div>
  </div>
</template>

<style scoped>
@keyframes agds-loading-dot-pulse {
  0%   { opacity: 0; }
  50%  { opacity: 1; }
  100% { opacity: 0; }
}

/* ── Container ───────────────────────────────────────────── */

.agds-loading-blanket {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--agds-loading-blanket-padding);
}

.agds-loading-blanket--full-screen {
  position: fixed;
  inset: 0;
  background-color: var(--agds-color-overlay);
  z-index: var(--agds-loading-blanket-z-index);
  /* Inverse text/dot colour on the dark overlay */
  color: var(--agds-color-text-inverse);
}

/* ── Content ─────────────────────────────────────────────── */

.agds-loading-blanket__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--agds-loading-blanket-gap);
  text-align: center;
}

/* ── Dots wrapper ────────────────────────────────────────── */

.agds-loading-dots {
  display: flex;
  align-items: center;
  gap: var(--agds-loading-dots-gap);
}

/* ── Individual dot ──────────────────────────────────────── */

.agds-loading-dots__dot {
  display: block;
  border-radius: var(--agds-radius-full);
  background-color: currentColor;
  opacity: 0;
  animation-name: agds-loading-dot-pulse;
  animation-duration: 1250ms;
  animation-iteration-count: infinite;
}

.agds-loading-dots--md .agds-loading-dots__dot {
  width: var(--agds-loading-dots-size);
  height: var(--agds-loading-dots-size);
}

.agds-loading-dots--lg .agds-loading-dots__dot {
  width: var(--agds-loading-dots-size);
  height: var(--agds-loading-dots-size);
}

/* ── Label ───────────────────────────────────────────────── */

.agds-loading-blanket__label {
  margin: 0;
  font-family: var(--agds-font-family-body);
  font-size: var(--agds-loading-blanket-label-font-size);
  font-weight: var(--agds-loading-blanket-label-font-weight);
  line-height: var(--agds-line-height-tight);
  color: currentColor;
}
</style>

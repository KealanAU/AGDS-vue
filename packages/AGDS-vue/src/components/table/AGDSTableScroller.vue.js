import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
// ── Refs ────────────────────────────────────────────────────
const trackRef = ref(null);
const thumbRef = ref(null);
const scrollerRef = ref(null);
// Plain object — not reactive; used only for drag delta calculations.
const mousePos = { x: 0, y: 0 };
// ── State ───────────────────────────────────────────────────
const shadowHeight = ref(0);
const scrollerAriaLabel = ref('');
const isDraggingThumb = ref(false);
const thumbPosition = ref(0);
/** 1 = no scroll needed; < 1 = scrollable. */
const thumbWidthRatio = ref(1);
let buttonIntervalId = null;
const hasScroll = computed(() => thumbWidthRatio.value !== 1);
// ── Thumb geometry ──────────────────────────────────────────
function repositionThumb() {
    if (!scrollerRef.value)
        return;
    thumbPosition.value = scrollerRef.value.scrollLeft * thumbWidthRatio.value;
}
function calculateThumbWidth() {
    const scroller = scrollerRef.value;
    const track = trackRef.value;
    if (!scroller || !track)
        return;
    if (scroller.offsetWidth === scroller.scrollWidth) {
        thumbWidthRatio.value = 1;
    }
    else {
        thumbWidthRatio.value =
            track.offsetWidth /
                (scroller.scrollWidth - (scroller.offsetWidth - track.offsetWidth));
    }
}
// ── Shadow visibility ───────────────────────────────────────
const showLeftShadow = computed(() => {
    if (!hasScroll.value)
        return false;
    return (scrollerRef.value?.scrollLeft ?? 0) > 0;
});
const showRightShadow = computed(() => {
    if (!hasScroll.value)
        return false;
    const s = scrollerRef.value;
    if (!s)
        return false;
    return Math.ceil(s.scrollLeft + s.offsetWidth) < s.scrollWidth;
});
// ── ResizeObserver ──────────────────────────────────────────
let resizeObserver = null;
onMounted(() => {
    if (typeof window === 'undefined' || !('ResizeObserver' in window) || !scrollerRef.value)
        return;
    resizeObserver = new ResizeObserver((entries) => {
        shadowHeight.value = entries[0].contentRect.height;
        calculateThumbWidth();
        repositionThumb();
    });
    resizeObserver.observe(scrollerRef.value);
    // Derive aria-label from the first caption or aria-labelledby inside the scroller.
    const captionEl = scrollerRef.value.querySelector('caption');
    if (captionEl) {
        scrollerAriaLabel.value = `Table ${captionEl.textContent ?? ''}`;
    }
    else {
        const labelledTable = scrollerRef.value.querySelector('table[aria-labelledby]');
        if (labelledTable) {
            const labelId = labelledTable.getAttribute('aria-labelledby') ?? '';
            const labelEl = document.getElementById(labelId);
            scrollerAriaLabel.value = `Table ${labelEl?.textContent ?? ''}`;
        }
    }
});
onUnmounted(() => {
    resizeObserver?.disconnect();
    clearButtonInterval();
});
// ── Drag: thumb ─────────────────────────────────────────────
function handleThumbPress(event) {
    event.preventDefault();
    isDraggingThumb.value = true;
    if (event instanceof MouseEvent && event.button === 0) {
        mousePos.x = event.pageX;
        mousePos.y = event.pageY;
    }
    else if (event instanceof TouchEvent && event.touches.length) {
        mousePos.x = event.touches[0].pageX;
        mousePos.y = event.touches[0].pageY;
    }
}
function handleThumbMove(event) {
    if (!isDraggingThumb.value || !scrollerRef.value)
        return;
    let pageX;
    let pageY;
    if (event instanceof TouchEvent && event.touches.length) {
        pageX = event.touches[0].pageX;
        pageY = event.touches[0].pageY;
    }
    else if (event instanceof MouseEvent) {
        pageX = event.pageX;
        pageY = event.pageY;
    }
    else {
        return;
    }
    const deltaX = pageX - mousePos.x;
    const deltaY = pageY - mousePos.y;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault();
        scrollerRef.value.scrollLeft += deltaX / thumbWidthRatio.value;
        mousePos.x = pageX;
    }
    mousePos.y = pageY;
}
function handleThumbRelease() {
    if (isDraggingThumb.value) {
        isDraggingThumb.value = false;
    }
}
watch(isDraggingThumb, (dragging) => {
    if (dragging) {
        document.addEventListener('mousemove', handleThumbMove);
        document.addEventListener('mouseup', handleThumbRelease);
        document.addEventListener('touchmove', handleThumbMove, { passive: false });
        document.addEventListener('touchend', handleThumbRelease);
    }
    else {
        document.removeEventListener('mousemove', handleThumbMove);
        document.removeEventListener('mouseup', handleThumbRelease);
        document.removeEventListener('touchmove', handleThumbMove);
        document.removeEventListener('touchend', handleThumbRelease);
    }
});
// ── Arrow buttons ───────────────────────────────────────────
function handleButtonClick(direction) {
    const amount = direction === 'left' ? -40 : 40;
    if (scrollerRef.value)
        scrollerRef.value.scrollLeft += amount;
    clearButtonInterval();
}
function handleButtonPress(event, direction) {
    const amount = direction === 'left' ? -40 : 40;
    const isValidEvent = event instanceof TouchEvent ||
        (event instanceof MouseEvent && event.button === 0);
    buttonIntervalId = window.setInterval(() => {
        if (scrollerRef.value && isValidEvent) {
            scrollerRef.value.scrollLeft += amount;
        }
    }, 100);
}
function clearButtonInterval() {
    if (buttonIntervalId !== null) {
        clearInterval(buttonIntervalId);
        buttonIntervalId = null;
    }
}
// ── Track click ─────────────────────────────────────────────
function handleTrackClick(event) {
    const thumb = thumbRef.value;
    const scroller = scrollerRef.value;
    if (!thumb || !scroller)
        return;
    const { left, right, width } = thumb.getBoundingClientRect();
    if (event.pageX > right) {
        scroller.scrollLeft += width * 0.95;
    }
    else if (event.pageX < left) {
        scroller.scrollLeft -= width * 0.95;
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__region']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__region']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__region']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__region']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__thumb']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-table-scroller" },
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ onScroll: (__VLS_ctx.repositionThumb) },
    ref: "scrollerRef",
    ...{ class: "agds-table-scroller__region" },
    'aria-label': (__VLS_ctx.scrollerAriaLabel || undefined),
    tabindex: (__VLS_ctx.hasScroll ? 0 : -1),
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__region']} */ ;
var __VLS_0 = {};
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "agds-table-scroller__shadow agds-table-scroller__shadow--left" },
    ...{ class: (__VLS_ctx.showLeftShadow && 'agds-table-scroller__shadow--visible') },
    ...{ style: ({ height: `${__VLS_ctx.shadowHeight}px` }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__shadow--left']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div)({
    ...{ class: "agds-table-scroller__shadow agds-table-scroller__shadow--right" },
    ...{ class: (__VLS_ctx.showRightShadow && 'agds-table-scroller__shadow--visible') },
    ...{ style: ({ height: `${__VLS_ctx.shadowHeight}px` }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__shadow']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__shadow--right']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-table-scroller__bar" },
    ...{ style: ({ display: __VLS_ctx.hasScroll ? undefined : 'none' }) },
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__bar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleButtonClick('left');
            // @ts-ignore
            [repositionThumb, scrollerAriaLabel, hasScroll, hasScroll, showLeftShadow, shadowHeight, shadowHeight, showRightShadow, handleButtonClick,];
        } },
    ...{ onMousedown: (...[$event]) => {
            __VLS_ctx.handleButtonPress($event, 'left');
            // @ts-ignore
            [handleButtonPress,];
        } },
    ...{ onMouseleave: (__VLS_ctx.clearButtonInterval) },
    ...{ onMouseup: (__VLS_ctx.clearButtonInterval) },
    ...{ onTouchstart: (...[$event]) => {
            __VLS_ctx.handleButtonPress($event, 'left');
            // @ts-ignore
            [handleButtonPress, clearButtonInterval, clearButtonInterval,];
        } },
    ...{ onTouchend: (__VLS_ctx.clearButtonInterval) },
    type: "button",
    ...{ class: "agds-table-scroller__arrow" },
    tabindex: "-1",
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__arrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    'aria-hidden': "true",
    focusable: "false",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M10 3L5 8L10 13",
    stroke: "currentColor",
    'stroke-width': "1.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleTrackClick) },
    ref: "trackRef",
    ...{ class: "agds-table-scroller__track" },
    tabindex: "-1",
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__track']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button)({
    ...{ onMousedown: (__VLS_ctx.handleThumbPress) },
    ...{ onTouchstart: (__VLS_ctx.handleThumbPress) },
    ref: "thumbRef",
    type: "button",
    ...{ class: "agds-table-scroller__thumb" },
    tabindex: "-1",
    'aria-hidden': "true",
    ...{ style: ({
            left: `${__VLS_ctx.thumbPosition}px`,
            width: `${__VLS_ctx.thumbWidthRatio * 100}%`,
        }) },
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__thumb']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (...[$event]) => {
            __VLS_ctx.handleButtonClick('right');
            // @ts-ignore
            [handleButtonClick, clearButtonInterval, handleTrackClick, handleThumbPress, handleThumbPress, thumbPosition, thumbWidthRatio,];
        } },
    ...{ onMousedown: (...[$event]) => {
            __VLS_ctx.handleButtonPress($event, 'right');
            // @ts-ignore
            [handleButtonPress,];
        } },
    ...{ onMouseleave: (__VLS_ctx.clearButtonInterval) },
    ...{ onMouseup: (__VLS_ctx.clearButtonInterval) },
    ...{ onTouchstart: (...[$event]) => {
            __VLS_ctx.handleButtonPress($event, 'right');
            // @ts-ignore
            [handleButtonPress, clearButtonInterval, clearButtonInterval,];
        } },
    ...{ onTouchend: (__VLS_ctx.clearButtonInterval) },
    type: "button",
    ...{ class: "agds-table-scroller__arrow" },
    tabindex: "-1",
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-table-scroller__arrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    'aria-hidden': "true",
    focusable: "false",
});
__VLS_asFunctionalElement1(__VLS_intrinsics.path)({
    d: "M6 3L11 8L6 13",
    stroke: "currentColor",
    'stroke-width': "1.5",
    'stroke-linecap': "round",
    'stroke-linejoin': "round",
});
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[clearButtonInterval,];
const __VLS_base = (await import('vue')).defineComponent({});
const __VLS_export = {};
export default {};

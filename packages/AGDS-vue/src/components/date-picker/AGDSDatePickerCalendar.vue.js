import { ref, computed, nextTick, onMounted } from 'vue';
// ── Date utilities ───────────────────────────────────────────────────────────
function startOfDay(d) {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
function isSameDay(a, b) {
    return (a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate());
}
function addDays(date, n) {
    const d = new Date(date);
    d.setDate(d.getDate() + n);
    return d;
}
function addMonths(date, n) {
    const d = new Date(date.getFullYear(), date.getMonth() + n, 1);
    return d;
}
/** Get 42 cells (6 rows × 7 cols) for a month grid, starting on Monday */
function getMonthGrid(year, month) {
    const firstOfMonth = new Date(year, month, 1);
    const dow = firstOfMonth.getDay(); // 0=Sun … 6=Sat
    const leadingDays = dow === 0 ? 6 : dow - 1; // offset to Mon-first
    const days = [];
    for (let i = leadingDays; i > 0; i--) {
        days.push(new Date(year, month, 1 - i));
    }
    const lastDate = new Date(year, month + 1, 0).getDate();
    for (let d = 1; d <= lastDate; d++) {
        days.push(new Date(year, month, d));
    }
    while (days.length < 42) {
        const last = days[days.length - 1];
        days.push(new Date(last.getFullYear(), last.getMonth(), last.getDate() + 1));
    }
    return days;
}
function toDateKey(d) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const props = withDefaults(defineProps(), {
    mode: 'single',
    selectedDate: null,
    selectedFrom: null,
    selectedTo: null,
    inputMode: undefined,
    numberOfMonths: 1,
});
const emit = defineEmits();
// ── State ────────────────────────────────────────────────────────────────────
const todayDate = startOfDay(new Date());
function getInitialView() {
    let ref;
    if (props.defaultMonth) {
        ref = props.defaultMonth;
    }
    else if (props.mode === 'single' && props.selectedDate) {
        ref = props.selectedDate;
    }
    else if (props.mode === 'range') {
        if (props.inputMode === 'to' && props.selectedTo) {
            ref = props.selectedTo;
        }
        else if (props.selectedFrom) {
            ref = props.selectedFrom;
        }
        else {
            ref = todayDate;
        }
    }
    else {
        ref = todayDate;
    }
    let year = ref.getFullYear();
    let month = ref.getMonth();
    // When showing 2 months in range 'to' mode, shift left by 1 so 'to' is on the right
    if (props.mode === 'range' &&
        props.numberOfMonths === 2 &&
        props.inputMode === 'to' &&
        props.selectedTo) {
        const shifted = addMonths(new Date(year, month, 1), -1);
        year = shifted.getFullYear();
        month = shifted.getMonth();
    }
    return { year, month };
}
const initial = getInitialView();
const viewYear = ref(initial.year);
const viewMonth = ref(initial.month);
const hoveredDate = ref(null);
const focusedDate = ref(null);
const calendarRef = ref(null);
// ── Computed ─────────────────────────────────────────────────────────────────
const monthsToShow = computed(() => {
    const months = [{ year: viewYear.value, month: viewMonth.value }];
    if (props.numberOfMonths === 2) {
        const next = addMonths(new Date(viewYear.value, viewMonth.value, 1), 1);
        months.push({ year: next.getFullYear(), month: next.getMonth() });
    }
    return months;
});
const currentYear = new Date().getFullYear();
function getYearOptions() {
    const from = props.yearRange?.from ?? currentYear - 10;
    const to = props.yearRange?.to ?? currentYear + 10;
    const years = [];
    for (let y = from; y <= to; y++)
        years.push(y);
    if (!years.includes(viewYear.value)) {
        years.push(viewYear.value);
        years.sort((a, b) => a - b);
    }
    return years;
}
const MONTH_LABELS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];
const WEEKDAY_ABBR = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const WEEKDAY_FULL = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
function isDisabled(date) {
    const d = startOfDay(date);
    if (props.minDate && d < startOfDay(props.minDate))
        return true;
    if (props.maxDate && d > startOfDay(props.maxDate))
        return true;
    return false;
}
function getDayMeta(date, monthIdx) {
    const d = startOfDay(date);
    const isToday = isSameDay(d, todayDate);
    const isOtherMonth = date.getMonth() !== monthsToShow.value[monthIdx].month;
    const disabled = isDisabled(date);
    let isSelected = false;
    let isRangeStart = false;
    let isRangeEnd = false;
    let isInRange = false;
    if (props.mode === 'single') {
        isSelected = !!(props.selectedDate && isSameDay(d, props.selectedDate));
    }
    else {
        const from = props.selectedFrom ? startOfDay(props.selectedFrom) : null;
        const to = props.selectedTo ? startOfDay(props.selectedTo) : null;
        const hovered = hoveredDate.value ? startOfDay(hoveredDate.value) : null;
        isRangeStart = !!(from && isSameDay(d, from));
        isRangeEnd = !!(to && isSameDay(d, to));
        isSelected = isRangeStart || isRangeEnd;
        if (from && to) {
            isInRange = d > from && d < to;
        }
        else if (hovered) {
            // Preview range while hovering before both ends are selected
            if (props.inputMode === 'from' && to) {
                const lo = hovered < to ? hovered : to;
                const hi = hovered < to ? to : hovered;
                isInRange = d > lo && d < hi;
            }
            else if (props.inputMode === 'to' && from) {
                const lo = from < hovered ? from : hovered;
                const hi = from < hovered ? hovered : from;
                isInRange = d > lo && d < hi;
            }
        }
    }
    const isFocused = !!(focusedDate.value && isSameDay(d, focusedDate.value));
    return {
        date: d,
        key: toDateKey(d),
        isToday,
        isOtherMonth,
        disabled,
        isSelected,
        isRangeStart,
        isRangeEnd,
        isInRange,
        isFocused,
        tabindex: isFocused ? 0 : -1,
        ariaLabel: buildAriaLabel(d, isSelected, isInRange, isToday),
    };
}
function buildAriaLabel(d, isSelected, isInRange, isToday) {
    const parts = [];
    if (isSelected)
        parts.push('Selected.');
    if (isInRange)
        parts.push('Within range.');
    if (isToday)
        parts.push('Today.');
    const dateStr = d.toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    parts.push(dateStr);
    return parts.join(' ');
}
// ── Methods ──────────────────────────────────────────────────────────────────
function prevMonth() {
    const prev = addMonths(new Date(viewYear.value, viewMonth.value, 1), -1);
    viewYear.value = prev.getFullYear();
    viewMonth.value = prev.getMonth();
}
function nextMonth() {
    const next = addMonths(new Date(viewYear.value, viewMonth.value, 1), 1);
    viewYear.value = next.getFullYear();
    viewMonth.value = next.getMonth();
}
function onYearChange(e) {
    viewYear.value = parseInt(e.target.value);
}
function onMonthChange(e) {
    viewMonth.value = parseInt(e.target.value);
}
function selectDay(date) {
    if (isDisabled(date))
        return;
    emit('select', date);
}
function focusCellByDate(date) {
    const key = toDateKey(date);
    const el = calendarRef.value?.querySelector(`[data-date="${key}"]`);
    el?.focus();
}
function onDayKeydown(event, date) {
    let target = null;
    switch (event.key) {
        case 'ArrowLeft':
            target = addDays(date, -1);
            break;
        case 'ArrowRight':
            target = addDays(date, 1);
            break;
        case 'ArrowUp':
            target = addDays(date, -7);
            break;
        case 'ArrowDown':
            target = addDays(date, 7);
            break;
        case 'PageUp':
            target = addMonths(date, event.shiftKey ? -12 : -1);
            break;
        case 'PageDown':
            target = addMonths(date, event.shiftKey ? 12 : 1);
            break;
        case 'Home': {
            // First day of week (Monday)
            const dow = date.getDay();
            const offset = dow === 0 ? -6 : 1 - dow;
            target = addDays(date, offset);
            break;
        }
        case 'End': {
            // Last day of week (Sunday)
            const dow = date.getDay();
            const offset = dow === 0 ? 0 : 7 - dow;
            target = addDays(date, offset);
            break;
        }
        case 'Enter':
        case ' ':
            event.preventDefault();
            selectDay(date);
            return;
        default:
            return;
    }
    if (target) {
        event.preventDefault();
        focusedDate.value = target;
        // Navigate view if target is outside current visible range
        const first = monthsToShow.value[0];
        const last = monthsToShow.value[monthsToShow.value.length - 1];
        if (target.getFullYear() < first.year ||
            (target.getFullYear() === first.year && target.getMonth() < first.month)) {
            prevMonth();
        }
        else if (target.getFullYear() > last.year ||
            (target.getFullYear() === last.year && target.getMonth() > last.month)) {
            nextMonth();
        }
        nextTick(() => focusCellByDate(target));
    }
}
/** Called by parent after the popover opens to focus the right day */
function focusInitialDay() {
    nextTick(() => {
        let target;
        if (props.mode === 'single') {
            target = props.selectedDate ?? todayDate;
        }
        else {
            target =
                (props.inputMode === 'to' ? props.selectedTo : props.selectedFrom) ?? todayDate;
        }
        focusedDate.value = target;
        focusCellByDate(target);
    });
}
onMounted(focusInitialDay);
const __VLS_exposed = { focusInitialDay };
defineExpose(__VLS_exposed);
// ── Template helpers ─────────────────────────────────────────────────────────
function getGridRows(year, month) {
    const days = getMonthGrid(year, month);
    // Split into 6 rows of 7
    const rows = [];
    for (let r = 0; r < 6; r++) {
        rows.push(days.slice(r * 7, r * 7 + 7));
    }
    return rows;
}
const hasPrevMonth = computed(() => {
    if (!props.minDate)
        return true;
    const lastDayOfPrev = new Date(viewYear.value, viewMonth.value, 0);
    return lastDayOfPrev >= startOfDay(props.minDate);
});
const hasNextMonth = computed(() => {
    if (!props.maxDate)
        return true;
    const lastMonth = monthsToShow.value[monthsToShow.value.length - 1];
    const firstDayOfNext = new Date(lastMonth.year, lastMonth.month + 1, 1);
    return firstDayOfNext <= startOfDay(props.maxDate);
});
const __VLS_defaults = {
    mode: 'single',
    selectedDate: null,
    selectedFrom: null,
    selectedTo: null,
    inputMode: undefined,
    numberOfMonths: 1,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__select']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__grid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--today']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--range-end']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--range-start']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--disabled']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--selected']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar__cell--in-range']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ref: "calendarRef",
    ...{ class: "agds-calendar" },
    ...{ class: ({ 'agds-calendar--range': __VLS_ctx.mode === 'range' }) },
});
/** @type {__VLS_StyleScopedClasses['agds-calendar']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-calendar--range']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-calendar__months" },
});
/** @type {__VLS_StyleScopedClasses['agds-calendar__months']} */ ;
for (const [panel, panelIdx] of __VLS_vFor((__VLS_ctx.monthsToShow))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        key: (`${panel.year}-${panel.month}`),
        ...{ class: "agds-calendar__month" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-calendar__month']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-calendar__caption" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-calendar__caption']} */ ;
    if (panelIdx === 0) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.prevMonth) },
            type: "button",
            ...{ class: "agds-calendar__nav-btn agds-calendar__nav-btn--prev" },
            disabled: (!__VLS_ctx.hasPrevMonth),
            'aria-label': (`Previous month, ${__VLS_ctx.MONTH_LABELS[(panel.month - 1 + 12) % 12]}`),
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn--prev']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            'aria-hidden': "true",
            focusable: "false",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
            points: "15 18 9 12 15 6",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "agds-calendar__nav-placeholder" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-placeholder']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-calendar__heading" },
        'aria-live': "polite",
        'aria-atomic': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-calendar__heading']} */ ;
    if (__VLS_ctx.yearRange || panelIdx === 0) {
        if (panelIdx === 0) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "agds-calendar__selects" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__selects']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "agds-calendar__select-wrap" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select-wrap']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
                for: (`agds-cal-month-${panel.year}-${panel.month}`),
                ...{ class: "sr-only" },
            });
            /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
                ...{ onChange: (__VLS_ctx.onMonthChange) },
                id: (`agds-cal-month-${panel.year}-${panel.month}`),
                ...{ class: "agds-calendar__select" },
                value: (panel.month),
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select']} */ ;
            for (const [name, idx] of __VLS_vFor((__VLS_ctx.MONTH_LABELS))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    key: (idx),
                    value: (idx),
                });
                (name);
                // @ts-ignore
                [mode, monthsToShow, prevMonth, hasPrevMonth, MONTH_LABELS, MONTH_LABELS, yearRange, onMonthChange,];
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "agds-calendar__select-chevron" },
                'aria-hidden': "true",
                focusable: "false",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2.5",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select-chevron']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "6 9 12 15 18 9",
            });
            __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
                ...{ class: "agds-calendar__select-wrap" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select-wrap']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
                for: (`agds-cal-year-${panel.year}-${panel.month}`),
                ...{ class: "sr-only" },
            });
            /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
                ...{ onChange: (__VLS_ctx.onYearChange) },
                id: (`agds-cal-year-${panel.year}-${panel.month}`),
                ...{ class: "agds-calendar__select" },
                value: (panel.year),
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select']} */ ;
            for (const [yr] of __VLS_vFor((__VLS_ctx.getYearOptions()))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
                    key: (yr),
                    value: (yr),
                });
                (yr);
                // @ts-ignore
                [onYearChange, getYearOptions,];
            }
            __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
                ...{ class: "agds-calendar__select-chevron" },
                'aria-hidden': "true",
                focusable: "false",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                'stroke-width': "2.5",
                'stroke-linecap': "round",
                'stroke-linejoin': "round",
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__select-chevron']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
                points: "6 9 12 15 18 9",
            });
        }
        else {
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "agds-calendar__month-label" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__month-label']} */ ;
            (__VLS_ctx.MONTH_LABELS[panel.month]);
            (panel.year);
        }
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-calendar__month-label" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__month-label']} */ ;
        (__VLS_ctx.MONTH_LABELS[panel.month]);
        (panel.year);
    }
    if (panelIdx === __VLS_ctx.monthsToShow.length - 1) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.nextMonth) },
            type: "button",
            ...{ class: "agds-calendar__nav-btn agds-calendar__nav-btn--next" },
            disabled: (!__VLS_ctx.hasNextMonth),
            'aria-label': (`Next month, ${__VLS_ctx.MONTH_LABELS[(panel.month + 1) % 12]}`),
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn']} */ ;
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-btn--next']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            'aria-hidden': "true",
            focusable: "false",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2.5",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
            points: "9 18 15 12 9 6",
        });
    }
    else {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
            ...{ class: "agds-calendar__nav-placeholder" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__nav-placeholder']} */ ;
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.table, __VLS_intrinsics.table)({
        ...{ class: "agds-calendar__grid" },
        role: "grid",
        'aria-label': (`${__VLS_ctx.MONTH_LABELS[panel.month]} ${panel.year}`),
    });
    /** @type {__VLS_StyleScopedClasses['agds-calendar__grid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.thead, __VLS_intrinsics.thead)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({});
    for (const [abbr, i] of __VLS_vFor((__VLS_ctx.WEEKDAY_ABBR))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.th, __VLS_intrinsics.th)({
            key: (abbr),
            ...{ class: "agds-calendar__weekday" },
            scope: "col",
            abbr: (__VLS_ctx.WEEKDAY_FULL[i]),
        });
        /** @type {__VLS_StyleScopedClasses['agds-calendar__weekday']} */ ;
        (abbr);
        // @ts-ignore
        [monthsToShow, MONTH_LABELS, MONTH_LABELS, MONTH_LABELS, MONTH_LABELS, nextMonth, hasNextMonth, WEEKDAY_ABBR, WEEKDAY_FULL,];
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.tbody, __VLS_intrinsics.tbody)({});
    for (const [row, rowIdx] of __VLS_vFor((__VLS_ctx.getGridRows(panel.year, panel.month)))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.tr, __VLS_intrinsics.tr)({
            key: (rowIdx),
            role: "row",
        });
        for (const [day] of __VLS_vFor((row))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.td, __VLS_intrinsics.td)({
                ...{ onClick: (...[$event]) => {
                        __VLS_ctx.selectDay(day);
                        // @ts-ignore
                        [getGridRows, selectDay,];
                    } },
                ...{ onKeydown: (...[$event]) => {
                        __VLS_ctx.onDayKeydown($event, day);
                        // @ts-ignore
                        [onDayKeydown,];
                    } },
                ...{ onMouseenter: (...[$event]) => {
                        __VLS_ctx.hoveredDate = day;
                        // @ts-ignore
                        [hoveredDate,];
                    } },
                ...{ onMouseleave: (...[$event]) => {
                        __VLS_ctx.hoveredDate = null;
                        // @ts-ignore
                        [hoveredDate,];
                    } },
                ...{ onFocus: (...[$event]) => {
                        __VLS_ctx.focusedDate = day;
                        // @ts-ignore
                        [focusedDate,];
                    } },
                key: (__VLS_ctx.toDateKey(day)),
                role: "gridcell",
                ...{ class: "agds-calendar__cell" },
                ...((() => {
                    const meta = __VLS_ctx.getDayMeta(day, panelIdx);
                    return {
                        'data-date': meta.key,
                        tabindex: meta.tabindex,
                        'aria-label': meta.ariaLabel,
                        'aria-selected': meta.isSelected ? 'true' : undefined,
                        'aria-current': meta.isToday ? 'date' : undefined,
                        'aria-disabled': meta.disabled ? 'true' : undefined,
                        class: [
                            'agds-calendar__cell',
                            meta.isOtherMonth && 'agds-calendar__cell--other-month',
                            meta.isToday && 'agds-calendar__cell--today',
                            meta.isSelected && 'agds-calendar__cell--selected',
                            meta.isRangeStart && 'agds-calendar__cell--range-start',
                            meta.isRangeEnd && 'agds-calendar__cell--range-end',
                            meta.isInRange && 'agds-calendar__cell--in-range',
                            meta.disabled && 'agds-calendar__cell--disabled',
                            meta.isFocused && 'agds-calendar__cell--focused',
                        ].filter(Boolean).join(' '),
                    };
                })()),
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__cell']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "agds-calendar__day-inner" },
                'aria-hidden': "true",
            });
            /** @type {__VLS_StyleScopedClasses['agds-calendar__day-inner']} */ ;
            (day.getDate());
            // @ts-ignore
            [toDateKey, getDayMeta,];
        }
        // @ts-ignore
        [];
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

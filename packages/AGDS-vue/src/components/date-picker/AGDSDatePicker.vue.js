import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick, useId, } from 'vue';
import { PopoverRoot, PopoverPortal, PopoverContent, PopoverAnchor } from 'reka-ui';
import AGDSDatePickerCalendar from './AGDSDatePickerCalendar.vue';
// ── Date utilities ───────────────────────────────────────────────────────────
function padStart2(n) {
    return String(n).padStart(2, '0');
}
/**
 * Format a Date to `dd/MM/yyyy` (or supported variant).
 * Only `dd/MM/yyyy` and `MM/dd/yyyy` are supported as dateFormat values.
 */
function formatDate(date, fmt) {
    const d = padStart2(date.getDate());
    const m = padStart2(date.getMonth() + 1);
    const y = String(date.getFullYear());
    return fmt.replace('dd', d).replace('MM', m).replace('yyyy', y);
}
/**
 * Parse a user-entered string as a date.
 * Tries the supplied format first, then ISO 8601.
 * Returns `null` when the input cannot be parsed to a valid date.
 */
function parseDate(input, fmt) {
    if (!input.trim())
        return null;
    // Try fmt pattern (dd/MM/yyyy or MM/dd/yyyy)
    const sep = fmt.includes('/') ? '/' : fmt.includes('-') ? '-' : '/';
    const parts = input.split(sep);
    if (parts.length === 3) {
        const fmtParts = fmt.split(sep);
        const map = {};
        fmtParts.forEach((token, i) => {
            map[token] = parseInt(parts[i] ?? '', 10);
        });
        const d = map['dd'] ?? map['d'];
        const m = map['MM'] ?? map['M'];
        const y = map['yyyy'];
        if (y && String(y).length === 4 && m >= 1 && m <= 12 && d >= 1 && d <= 31) {
            const date = new Date(y, m - 1, d);
            if (date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d) {
                return date;
            }
        }
    }
    // Try ISO 8601 (yyyy-MM-dd or full ISO string)
    if (/^\d{4}-\d{2}-\d{2}/.test(input)) {
        const date = new Date(input);
        if (!isNaN(date.getTime()))
            return date;
    }
    return null;
}
/** Return a placeholder date string in the given format, e.g. "DD/MM/YYYY" */
function getPlaceholder(fmt) {
    return fmt.replace('dd', 'DD').replace('MM', 'MM').replace('yyyy', 'YYYY');
}
/** Example date string for the secondary label, e.g. "e.g. 25/03/2026" */
function getExample(date, fmt) {
    return `(e.g. ${formatDate(date, fmt)})`;
}
/** Subtract n calendar months from a date (no date-fns required) */
function subMonths(date, n) {
    return new Date(date.getFullYear(), date.getMonth() - n, date.getDate());
}
/**
 * Calculate which month the calendar should open to in range mode.
 * Handles mismatched ranges (from > to) and dual-month offset correctly.
 */
function getCalendarDefaultMonth(inputMode, from, to, yearRange, numberOfMonths) {
    if (inputMode === 'from') {
        // Mismatched range: from is after to — open to's month, shifted for dual view
        if (from && to && from > to)
            return subMonths(to, numberOfMonths === 2 ? 1 : 0);
        if (from)
            return from;
        if (to)
            return subMonths(to, numberOfMonths === 2 ? 1 : 0);
        return undefined;
    }
    if (inputMode === 'to') {
        // Mismatched: to is before from — open from's month
        if (from && to && to < from)
            return from;
        if (to)
            return subMonths(to, numberOfMonths === 2 ? 1 : 0);
        if (from)
            return from;
        return undefined;
    }
    // No input mode: use closest boundary to today when yearRange is set
    if (yearRange) {
        const earliest = new Date(yearRange.from, 0, 1);
        const latest = new Date(yearRange.to, 11, 31);
        const now = Date.now();
        return Math.abs(now - earliest.getTime()) <= Math.abs(now - latest.getTime())
            ? earliest
            : latest;
    }
    return undefined;
}
const props = withDefaults(defineProps(), {
    range: false,
    modelValue: null,
    label: undefined,
    fromLabel: 'Start date',
    toLabel: 'End date',
    id: undefined,
    hint: undefined,
    message: undefined,
    invalid: false,
    fromInvalid: false,
    toInvalid: false,
    disabled: false,
    required: false,
    hideOptionalLabel: false,
    minDate: undefined,
    maxDate: undefined,
    yearRange: undefined,
    dateFormat: 'dd/MM/yyyy',
});
const emit = defineEmits();
// ── Unique IDs ────────────────────────────────────────────────────────────────
// useId() (Vue 3.5+) generates stable, SSR-safe IDs that match between server
// and client, preventing hydration attribute mismatches in Nuxt.
const uid = useId();
const inputId = computed(() => props.id ?? `agds-datepicker-${uid}`);
const fromInputId = computed(() => `agds-datepicker-${uid}-from`);
const toInputId = computed(() => `agds-datepicker-${uid}-to`);
const hintId = computed(() => `agds-datepicker-${uid}-hint`);
const messageId = computed(() => `agds-datepicker-${uid}-message`);
// ── Optional label ────────────────────────────────────────────────────────────
const optionalSuffix = computed(() => !props.required && !props.hideOptionalLabel ? ' (optional)' : '');
// ── Derived value helpers ─────────────────────────────────────────────────────
const singleValue = computed(() => {
    if (props.range)
        return null;
    return props.modelValue ?? null;
});
const rangeValue = computed(() => {
    if (!props.range)
        return { from: null, to: null };
    return props.modelValue ?? { from: null, to: null };
});
// ── Input text state ──────────────────────────────────────────────────────────
function dateToText(date) {
    if (!date)
        return '';
    return formatDate(date, props.dateFormat);
}
// Single mode
const singleInputText = ref(dateToText(singleValue.value));
// Range mode
const fromInputText = ref(dateToText(rangeValue.value.from));
const toInputText = ref(dateToText(rangeValue.value.to));
// Sync input text when model value changes externally
watch(singleValue, (val) => {
    singleInputText.value = dateToText(val);
});
watch(() => rangeValue.value.from, (val) => {
    fromInputText.value = dateToText(val);
});
watch(() => rangeValue.value.to, (val) => {
    toInputText.value = dateToText(val);
});
// ── Popover state ─────────────────────────────────────────────────────────────
const isOpen = ref(false);
/** Which range input opened the calendar ('from' | 'to' | undefined in single mode) */
const inputMode = ref(undefined);
const singleTriggerRef = ref(null);
const fromTriggerRef = ref(null);
const toTriggerRef = ref(null);
const calendarRef = ref(null);
function openCalendar(mode) {
    inputMode.value = mode;
    isOpen.value = true;
}
function closeCalendar() {
    isOpen.value = false;
}
function closeAndReturnFocus() {
    closeCalendar();
    nextTick(() => {
        if (inputMode.value === 'to')
            toTriggerRef.value?.focus();
        else if (inputMode.value === 'from')
            fromTriggerRef.value?.focus();
        else
            singleTriggerRef.value?.focus();
    });
}
// Single mode trigger click
function onSingleTriggerClick() {
    if (isOpen.value) {
        closeAndReturnFocus();
    }
    else {
        openCalendar(undefined);
    }
}
// Range mode trigger clicks
function onFromTriggerClick() {
    if (isOpen.value && inputMode.value === 'from') {
        closeAndReturnFocus();
    }
    else {
        openCalendar('from');
    }
}
function onToTriggerClick() {
    if (isOpen.value && inputMode.value === 'to') {
        closeAndReturnFocus();
    }
    else {
        openCalendar('to');
    }
}
// Focus the right day after the calendar opens
watch(isOpen, (open) => {
    if (open) {
        nextTick(() => calendarRef.value?.focusInitialDay());
    }
});
// Escape key to close calendar (PopoverContent handles this via Reka UI but we
// also want to return focus to the trigger rather than leaving it on the content root)
function onKeydown(e) {
    if (isOpen.value && e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        closeAndReturnFocus();
    }
}
onMounted(() => window.addEventListener('keydown', onKeydown, { capture: true }));
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown, { capture: true }));
// ── Responsive: number of months for range mode ───────────────────────────────
const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 0);
function onResize() {
    windowWidth.value = window.innerWidth;
}
onMounted(() => window.addEventListener('resize', onResize));
onBeforeUnmount(() => window.removeEventListener('resize', onResize));
const numberOfMonths = computed(() => {
    if (!props.range)
        return 1;
    return windowWidth.value >= 768 ? 2 : 1;
});
// ── Calendar default month ────────────────────────────────────────────────────
const calendarDefaultMonth = computed(() => {
    if (!props.range) {
        return singleValue.value ?? undefined;
    }
    return getCalendarDefaultMonth(inputMode.value, rangeValue.value.from, rangeValue.value.to, props.yearRange, numberOfMonths.value);
});
// ── Calendar selection handler ────────────────────────────────────────────────
function onCalendarSelect(date) {
    if (!props.range) {
        // Single mode: close after selection
        emit('update:modelValue', date);
        closeAndReturnFocus();
        return;
    }
    // Range mode
    const current = rangeValue.value;
    let from = current.from;
    let to = current.to;
    if (inputMode.value === 'from') {
        from = date;
        // If new from is after existing to, clear to
        if (to && from > to)
            to = null;
    }
    else if (inputMode.value === 'to') {
        to = date;
        // If new to is before existing from, swap
        if (from && to < from) {
            ;
            [from, to] = [to, from];
        }
    }
    emit('update:modelValue', { from, to });
    // Auto-advance: after setting 'from', switch to 'to' if not yet set
    if (inputMode.value === 'from' && !to) {
        inputMode.value = 'to';
        nextTick(() => calendarRef.value?.focusInitialDay());
        return;
    }
    // After setting 'to', advance to 'from' if it's missing
    if (inputMode.value === 'to' && !from) {
        inputMode.value = 'from';
        nextTick(() => calendarRef.value?.focusInitialDay());
        return;
    }
    // Both ends are set — close calendar
    if (from && to) {
        closeAndReturnFocus();
    }
}
// ── Input text handlers ───────────────────────────────────────────────────────
// Single mode
function onSingleInputChange(e) {
    singleInputText.value = e.target.value;
}
function onSingleInputBlur(e) {
    const parsed = parseDate(singleInputText.value, props.dateFormat);
    emit('update:modelValue', parsed);
    emit('blur', e);
}
// Range mode — from input
function onFromInputChange(e) {
    fromInputText.value = e.target.value;
}
function onFromInputBlur(e) {
    const parsed = parseDate(fromInputText.value, props.dateFormat);
    let from = parsed;
    let to = rangeValue.value.to;
    // Ensure valid order
    if (from && to && from > to)
        to = null;
    emit('update:modelValue', { from, to });
    emit('blur', e);
}
// Range mode — to input
function onToInputChange(e) {
    toInputText.value = e.target.value;
}
function onToInputBlur(e) {
    const parsed = parseDate(toInputText.value, props.dateFormat);
    let from = rangeValue.value.from;
    let to = parsed;
    // Ensure valid order
    if (from && to && to < from) {
        ;
        [from, to] = [to, from];
    }
    emit('update:modelValue', { from, to });
    emit('blur', e);
}
// ── Aria helpers ──────────────────────────────────────────────────────────────
function describedBy(invalid) {
    const ids = [];
    if (invalid && props.message)
        ids.push(messageId.value);
    if (props.hint)
        ids.push(hintId.value);
    return ids.join(' ') || undefined;
}
function buttonLabel(rangeName, inputText) {
    const prefix = rangeName ? `${rangeName} date` : 'date';
    if (!inputText)
        return `Choose ${prefix}`;
    const parsed = parseDate(inputText, props.dateFormat);
    if (!parsed)
        return `Choose ${prefix}`;
    const human = parsed.toLocaleDateString('en-AU', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    return `Change ${prefix}, ${human}`;
}
// ── Expose ────────────────────────────────────────────────────────────────────
const __VLS_exposed = {
    focus: () => {
        if (props.range)
            fromTriggerRef.value?.focus();
        else
            singleTriggerRef.value?.focus();
    },
};
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    range: false,
    modelValue: null,
    label: undefined,
    fromLabel: 'Start date',
    toLabel: 'End date',
    id: undefined,
    hint: undefined,
    message: undefined,
    invalid: false,
    fromInvalid: false,
    toInvalid: false,
    disabled: false,
    required: false,
    hideOptionalLabel: false,
    minDate: undefined,
    maxDate: undefined,
    yearRange: undefined,
    dateFormat: 'dd/MM/yyyy',
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
/** @type {__VLS_StyleScopedClasses['agds-datepicker__message']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__field--invalid']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
if (!props.range) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__field" },
        ...{ class: ({ 'agds-datepicker__field--invalid': __VLS_ctx.invalid }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.inputId),
        ...{ class: "agds-datepicker__label" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__label']} */ ;
    (__VLS_ctx.label);
    if (__VLS_ctx.optionalSuffix) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-datepicker__optional" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__optional']} */ ;
        (__VLS_ctx.optionalSuffix);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-datepicker__secondary-label" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__secondary-label']} */ ;
    (__VLS_ctx.getExample(__VLS_ctx.minDate ?? __VLS_ctx.maxDate ?? new Date(), __VLS_ctx.dateFormat));
    if (__VLS_ctx.hint) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.hintId),
            ...{ class: "agds-datepicker__hint" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__hint']} */ ;
        (__VLS_ctx.hint);
    }
    if (__VLS_ctx.invalid && __VLS_ctx.message) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.messageId),
            ...{ class: "agds-datepicker__message" },
            role: "alert",
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__message']} */ ;
        (__VLS_ctx.message);
    }
    let __VLS_0;
    /** @ts-ignore @type {typeof __VLS_components.PopoverRoot | typeof __VLS_components.PopoverRoot} */
    PopoverRoot;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        open: (__VLS_ctx.isOpen),
    }));
    const __VLS_2 = __VLS_1({
        open: (__VLS_ctx.isOpen),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const { default: __VLS_5 } = __VLS_3.slots;
    let __VLS_6;
    /** @ts-ignore @type {typeof __VLS_components.PopoverAnchor | typeof __VLS_components.PopoverAnchor} */
    PopoverAnchor;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        asChild: true,
    }));
    const __VLS_8 = __VLS_7({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    const { default: __VLS_11 } = __VLS_9.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__input-row" },
        ...{ class: ({ 'agds-datepicker__input-row--open': __VLS_ctx.isOpen }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row--open']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.onSingleInputChange) },
        ...{ onBlur: (__VLS_ctx.onSingleInputBlur) },
        ...{ onFocus: (...[$event]) => {
                if (!(!props.range))
                    return;
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [invalid, invalid, inputId, label, optionalSuffix, optionalSuffix, getExample, minDate, maxDate, dateFormat, hint, hint, hintId, message, message, messageId, isOpen, isOpen, onSingleInputChange, onSingleInputBlur, emit,];
            } },
        id: (__VLS_ctx.inputId),
        type: "text",
        ...{ class: "agds-datepicker__input" },
        ...{ class: ({ 'agds-datepicker__input--invalid': __VLS_ctx.invalid }) },
        value: (__VLS_ctx.singleInputText),
        disabled: (__VLS_ctx.disabled),
        required: (__VLS_ctx.required || undefined),
        'aria-invalid': (__VLS_ctx.invalid || undefined),
        'aria-required': (__VLS_ctx.required || undefined),
        'aria-describedby': (__VLS_ctx.describedBy(__VLS_ctx.invalid)),
        placeholder: (__VLS_ctx.getPlaceholder(__VLS_ctx.dateFormat)),
        autocomplete: "off",
    });
    (__VLS_ctx.$attrs);
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.onSingleTriggerClick) },
        ref: "singleTriggerRef",
        type: "button",
        ...{ class: "agds-datepicker__trigger" },
        disabled: (__VLS_ctx.disabled),
        'aria-expanded': (__VLS_ctx.isOpen),
        'aria-label': (__VLS_ctx.buttonLabel(undefined, __VLS_ctx.singleInputText)),
        'aria-haspopup': ('dialog'),
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        focusable: "false",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.75",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10",
    });
    // @ts-ignore
    [invalid, invalid, invalid, inputId, dateFormat, isOpen, singleInputText, singleInputText, disabled, disabled, required, required, describedBy, getPlaceholder, $attrs, onSingleTriggerClick, buttonLabel,];
    var __VLS_9;
    let __VLS_12;
    /** @ts-ignore @type {typeof __VLS_components.PopoverPortal | typeof __VLS_components.PopoverPortal} */
    PopoverPortal;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const { default: __VLS_17 } = __VLS_15.slots;
    let __VLS_18;
    /** @ts-ignore @type {typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
    PopoverContent;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onEscapeKeyDown': {} },
        ...{ class: "agds-datepicker__popover" },
        side: "bottom",
        align: "start",
        sideOffset: (4),
        trapFocus: (false),
        disableOutsidePointerEvents: (false),
        role: "dialog",
        'aria-label': (__VLS_ctx.label ? `Choose ${__VLS_ctx.label.toLowerCase()}` : 'Choose date'),
        'aria-modal': "true",
    }));
    const __VLS_20 = __VLS_19({
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onEscapeKeyDown': {} },
        ...{ class: "agds-datepicker__popover" },
        side: "bottom",
        align: "start",
        sideOffset: (4),
        trapFocus: (false),
        disableOutsidePointerEvents: (false),
        role: "dialog",
        'aria-label': (__VLS_ctx.label ? `Choose ${__VLS_ctx.label.toLowerCase()}` : 'Choose date'),
        'aria-modal': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_19));
    let __VLS_23;
    const __VLS_24 = ({ openAutoFocus: {} },
        { onOpenAutoFocus: () => { } });
    const __VLS_25 = ({ escapeKeyDown: {} },
        { onEscapeKeyDown: () => { } });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__popover']} */ ;
    const { default: __VLS_26 } = __VLS_21.slots;
    const __VLS_27 = AGDSDatePickerCalendar;
    // @ts-ignore
    const __VLS_28 = __VLS_asFunctionalComponent1(__VLS_27, new __VLS_27({
        ...{ 'onSelect': {} },
        ref: "calendarRef",
        mode: "single",
        selectedDate: (__VLS_ctx.singleValue),
        minDate: (__VLS_ctx.minDate),
        maxDate: (__VLS_ctx.maxDate),
        defaultMonth: (__VLS_ctx.calendarDefaultMonth),
        numberOfMonths: (1),
        yearRange: (__VLS_ctx.yearRange),
    }));
    const __VLS_29 = __VLS_28({
        ...{ 'onSelect': {} },
        ref: "calendarRef",
        mode: "single",
        selectedDate: (__VLS_ctx.singleValue),
        minDate: (__VLS_ctx.minDate),
        maxDate: (__VLS_ctx.maxDate),
        defaultMonth: (__VLS_ctx.calendarDefaultMonth),
        numberOfMonths: (1),
        yearRange: (__VLS_ctx.yearRange),
    }, ...__VLS_functionalComponentArgsRest(__VLS_28));
    let __VLS_32;
    const __VLS_33 = ({ select: {} },
        { onSelect: (__VLS_ctx.onCalendarSelect) });
    var __VLS_34 = {};
    var __VLS_30;
    var __VLS_31;
    // @ts-ignore
    [label, label, minDate, maxDate, singleValue, calendarDefaultMonth, yearRange, onCalendarSelect,];
    var __VLS_21;
    var __VLS_22;
    // @ts-ignore
    [];
    var __VLS_15;
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.fieldset, __VLS_intrinsics.fieldset)({
        ...{ class: "agds-datepicker agds-datepicker--range" },
        ...{ class: ({ 'agds-datepicker--invalid': __VLS_ctx.fromInvalid || __VLS_ctx.toInvalid }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker--range']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.legend, __VLS_intrinsics.legend)({
        ...{ class: "agds-datepicker__legend" },
        ...{ class: ({ 'sr-only': !__VLS_ctx.label }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__legend']} */ ;
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (__VLS_ctx.label ?? 'Date range');
    if (__VLS_ctx.optionalSuffix) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-datepicker__optional" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__optional']} */ ;
        (__VLS_ctx.optionalSuffix);
    }
    if (__VLS_ctx.hint) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.hintId),
            ...{ class: "agds-datepicker__hint" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__hint']} */ ;
        (__VLS_ctx.hint);
    }
    if ((__VLS_ctx.fromInvalid || __VLS_ctx.toInvalid) && __VLS_ctx.message) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.messageId),
            ...{ class: "agds-datepicker__message" },
            role: "alert",
        });
        /** @type {__VLS_StyleScopedClasses['agds-datepicker__message']} */ ;
        (__VLS_ctx.message);
    }
    let __VLS_36;
    /** @ts-ignore @type {typeof __VLS_components.PopoverRoot | typeof __VLS_components.PopoverRoot} */
    PopoverRoot;
    // @ts-ignore
    const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
        open: (__VLS_ctx.isOpen),
    }));
    const __VLS_38 = __VLS_37({
        open: (__VLS_ctx.isOpen),
    }, ...__VLS_functionalComponentArgsRest(__VLS_37));
    const { default: __VLS_41 } = __VLS_39.slots;
    let __VLS_42;
    /** @ts-ignore @type {typeof __VLS_components.PopoverAnchor | typeof __VLS_components.PopoverAnchor} */
    PopoverAnchor;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        asChild: true,
    }));
    const __VLS_44 = __VLS_43({
        asChild: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const { default: __VLS_47 } = __VLS_45.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__range-row" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__range-row']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__field" },
        ...{ class: ({ 'agds-datepicker__field--invalid': __VLS_ctx.fromInvalid }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.fromInputId),
        ...{ class: "agds-datepicker__label agds-datepicker__label--range" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__label']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__label--range']} */ ;
    (__VLS_ctx.fromLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-datepicker__secondary-label" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__secondary-label']} */ ;
    (__VLS_ctx.getExample(__VLS_ctx.minDate ?? new Date(), __VLS_ctx.dateFormat));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__input-row" },
        ...{ class: ({
                'agds-datepicker__input-row--open': __VLS_ctx.isOpen && __VLS_ctx.inputMode === 'from',
                'agds-datepicker__input-row--highlighted': __VLS_ctx.isOpen && __VLS_ctx.inputMode === 'from',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row--open']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row--highlighted']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.onFromInputChange) },
        ...{ onBlur: (__VLS_ctx.onFromInputBlur) },
        ...{ onFocus: (...[$event]) => {
                if (!!(!props.range))
                    return;
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [label, label, optionalSuffix, optionalSuffix, getExample, minDate, dateFormat, hint, hint, hintId, message, message, messageId, isOpen, isOpen, isOpen, emit, fromInvalid, fromInvalid, fromInvalid, toInvalid, toInvalid, fromInputId, fromLabel, inputMode, inputMode, onFromInputChange, onFromInputBlur,];
            } },
        id: (__VLS_ctx.fromInputId),
        type: "text",
        ...{ class: "agds-datepicker__input" },
        ...{ class: ({ 'agds-datepicker__input--invalid': __VLS_ctx.fromInvalid }) },
        value: (__VLS_ctx.fromInputText),
        disabled: (__VLS_ctx.disabled),
        required: (__VLS_ctx.required || undefined),
        'aria-invalid': (__VLS_ctx.fromInvalid || undefined),
        'aria-required': (__VLS_ctx.required || undefined),
        'aria-describedby': (__VLS_ctx.describedBy(__VLS_ctx.fromInvalid)),
        placeholder: (__VLS_ctx.getPlaceholder(__VLS_ctx.dateFormat)),
        autocomplete: "off",
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.onFromTriggerClick) },
        ref: "fromTriggerRef",
        type: "button",
        ...{ class: "agds-datepicker__trigger" },
        disabled: (__VLS_ctx.disabled),
        'aria-expanded': (__VLS_ctx.isOpen && __VLS_ctx.inputMode === 'from'),
        'aria-label': (__VLS_ctx.buttonLabel('start', __VLS_ctx.fromInputText)),
        'aria-haspopup': ('dialog'),
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        focusable: "false",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.75",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__field" },
        ...{ class: ({ 'agds-datepicker__field--invalid': __VLS_ctx.toInvalid }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__field--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        for: (__VLS_ctx.toInputId),
        ...{ class: "agds-datepicker__label agds-datepicker__label--range" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__label']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__label--range']} */ ;
    (__VLS_ctx.toLabel);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-datepicker__secondary-label" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__secondary-label']} */ ;
    (__VLS_ctx.getExample(__VLS_ctx.maxDate ?? new Date(), __VLS_ctx.dateFormat));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-datepicker__input-row" },
        ...{ class: ({
                'agds-datepicker__input-row--open': __VLS_ctx.isOpen && __VLS_ctx.inputMode === 'to',
                'agds-datepicker__input-row--highlighted': __VLS_ctx.isOpen && __VLS_ctx.inputMode === 'to',
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row--open']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input-row--highlighted']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.onToInputChange) },
        ...{ onBlur: (__VLS_ctx.onToInputBlur) },
        ...{ onFocus: (...[$event]) => {
                if (!!(!props.range))
                    return;
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [getExample, maxDate, dateFormat, dateFormat, isOpen, isOpen, isOpen, emit, disabled, disabled, required, required, describedBy, getPlaceholder, buttonLabel, fromInvalid, fromInvalid, fromInvalid, toInvalid, fromInputId, inputMode, inputMode, inputMode, fromInputText, fromInputText, onFromTriggerClick, toInputId, toLabel, onToInputChange, onToInputBlur,];
            } },
        id: (__VLS_ctx.toInputId),
        type: "text",
        ...{ class: "agds-datepicker__input" },
        ...{ class: ({ 'agds-datepicker__input--invalid': __VLS_ctx.toInvalid }) },
        value: (__VLS_ctx.toInputText),
        disabled: (__VLS_ctx.disabled),
        required: (__VLS_ctx.required || undefined),
        'aria-invalid': (__VLS_ctx.toInvalid || undefined),
        'aria-required': (__VLS_ctx.required || undefined),
        'aria-describedby': (__VLS_ctx.describedBy(__VLS_ctx.toInvalid)),
        placeholder: (__VLS_ctx.getPlaceholder(__VLS_ctx.dateFormat)),
        autocomplete: "off",
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__input--invalid']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.onToTriggerClick) },
        ref: "toTriggerRef",
        type: "button",
        ...{ class: "agds-datepicker__trigger" },
        disabled: (__VLS_ctx.disabled),
        'aria-expanded': (__VLS_ctx.isOpen && __VLS_ctx.inputMode === 'to'),
        'aria-label': (__VLS_ctx.buttonLabel('end', __VLS_ctx.toInputText)),
        'aria-haspopup': ('dialog'),
    });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__trigger']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        'aria-hidden': "true",
        focusable: "false",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "1.75",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.rect)({
        x: "3",
        y: "4",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "16",
        y1: "2",
        x2: "16",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "8",
        y1: "2",
        x2: "8",
        y2: "6",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.line)({
        x1: "3",
        y1: "10",
        x2: "21",
        y2: "10",
    });
    // @ts-ignore
    [dateFormat, isOpen, disabled, disabled, required, required, describedBy, getPlaceholder, buttonLabel, toInvalid, toInvalid, toInvalid, inputMode, toInputId, toInputText, toInputText, onToTriggerClick,];
    var __VLS_45;
    let __VLS_48;
    /** @ts-ignore @type {typeof __VLS_components.PopoverPortal | typeof __VLS_components.PopoverPortal} */
    PopoverPortal;
    // @ts-ignore
    const __VLS_49 = __VLS_asFunctionalComponent1(__VLS_48, new __VLS_48({}));
    const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
    const { default: __VLS_53 } = __VLS_51.slots;
    let __VLS_54;
    /** @ts-ignore @type {typeof __VLS_components.PopoverContent | typeof __VLS_components.PopoverContent} */
    PopoverContent;
    // @ts-ignore
    const __VLS_55 = __VLS_asFunctionalComponent1(__VLS_54, new __VLS_54({
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onEscapeKeyDown': {} },
        ...{ class: "agds-datepicker__popover" },
        side: "bottom",
        align: "start",
        sideOffset: (4),
        trapFocus: (false),
        disableOutsidePointerEvents: (false),
        role: "dialog",
        'aria-label': "Choose date range",
        'aria-modal': "true",
    }));
    const __VLS_56 = __VLS_55({
        ...{ 'onOpenAutoFocus': {} },
        ...{ 'onEscapeKeyDown': {} },
        ...{ class: "agds-datepicker__popover" },
        side: "bottom",
        align: "start",
        sideOffset: (4),
        trapFocus: (false),
        disableOutsidePointerEvents: (false),
        role: "dialog",
        'aria-label': "Choose date range",
        'aria-modal': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_55));
    let __VLS_59;
    const __VLS_60 = ({ openAutoFocus: {} },
        { onOpenAutoFocus: () => { } });
    const __VLS_61 = ({ escapeKeyDown: {} },
        { onEscapeKeyDown: () => { } });
    /** @type {__VLS_StyleScopedClasses['agds-datepicker__popover']} */ ;
    const { default: __VLS_62 } = __VLS_57.slots;
    const __VLS_63 = AGDSDatePickerCalendar;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
        ...{ 'onSelect': {} },
        ref: "calendarRef",
        mode: "range",
        selectedFrom: (__VLS_ctx.rangeValue.from),
        selectedTo: (__VLS_ctx.rangeValue.to),
        inputMode: (__VLS_ctx.inputMode),
        minDate: (__VLS_ctx.minDate),
        maxDate: (__VLS_ctx.maxDate),
        defaultMonth: (__VLS_ctx.calendarDefaultMonth),
        numberOfMonths: (__VLS_ctx.numberOfMonths),
        yearRange: (__VLS_ctx.yearRange),
    }));
    const __VLS_65 = __VLS_64({
        ...{ 'onSelect': {} },
        ref: "calendarRef",
        mode: "range",
        selectedFrom: (__VLS_ctx.rangeValue.from),
        selectedTo: (__VLS_ctx.rangeValue.to),
        inputMode: (__VLS_ctx.inputMode),
        minDate: (__VLS_ctx.minDate),
        maxDate: (__VLS_ctx.maxDate),
        defaultMonth: (__VLS_ctx.calendarDefaultMonth),
        numberOfMonths: (__VLS_ctx.numberOfMonths),
        yearRange: (__VLS_ctx.yearRange),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    let __VLS_68;
    const __VLS_69 = ({ select: {} },
        { onSelect: (__VLS_ctx.onCalendarSelect) });
    var __VLS_70 = {};
    var __VLS_66;
    var __VLS_67;
    // @ts-ignore
    [minDate, maxDate, calendarDefaultMonth, yearRange, onCalendarSelect, inputMode, rangeValue, rangeValue, numberOfMonths,];
    var __VLS_57;
    var __VLS_58;
    // @ts-ignore
    [];
    var __VLS_51;
    // @ts-ignore
    [];
    var __VLS_39;
}
// @ts-ignore
var __VLS_35 = __VLS_34, __VLS_71 = __VLS_70;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

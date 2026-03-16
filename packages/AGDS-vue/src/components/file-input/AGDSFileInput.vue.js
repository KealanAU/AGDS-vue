import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import AgDSButton from '../button/AGDSButton.vue';
import AgDSFormStack from '../form-stack/AGDSFormStack.vue';
import AgDSFlex from '../flex/AGDSFlex.vue';
// ── MIME type → display label mapping ───────────────────────────────────────
const FILE_TYPE_MAPPING = {
    'image/jpeg': { extensions: ['.jpg', '.jpeg'], label: 'JPEG' },
    'image/png': { extensions: ['.png'], label: 'PNG' },
    'image/gif': { extensions: ['.gif'], label: 'GIF' },
    'image/webp': { extensions: ['.webp'], label: 'WebP' },
    'image/svg+xml': { extensions: ['.svg'], label: 'SVG' },
    'application/pdf': { extensions: ['.pdf'], label: 'PDF' },
    'application/msword': { extensions: ['.doc'], label: 'DOC' },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
        extensions: ['.docx'], label: 'DOCX',
    },
    'application/vnd.ms-excel': { extensions: ['.xls'], label: 'XLS' },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
        extensions: ['.xlsx'], label: 'XLSX',
    },
    'text/csv': { extensions: ['.csv'], label: 'CSV' },
    'text/plain': { extensions: ['.txt'], label: 'TXT' },
    'application/zip': { extensions: ['.zip'], label: 'ZIP' },
    'video/mp4': { extensions: ['.mp4'], label: 'MP4' },
    'audio/mpeg': { extensions: ['.mp3'], label: 'MP3' },
};
const props = withDefaults(defineProps(), {
    disabled: false,
    autoFocus: false,
    multiple: false,
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    buttonSize: 'sm',
});
const emit = defineEmits();
// ── IDs ──────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const buttonId = computed(() => props.id ?? `agds-file-input-${uid}`);
const hintId = computed(() => `${buttonId.value}-hint`);
const messageId = computed(() => `${buttonId.value}-message`);
// ── File name state ───────────────────────────────────────────────────────────
const fileNames = ref([]);
const hasFiles = computed(() => fileNames.value.length > 0);
function handleChange(event) {
    const target = event.target;
    if (target.files) {
        fileNames.value = Array.from(target.files).map((f) => f.name);
    }
    emit('change', event);
}
// ── accept / hint derivation ─────────────────────────────────────────────────
const acceptString = computed(() => {
    if (!props.accept)
        return undefined;
    return Array.isArray(props.accept) ? props.accept.join(',') : props.accept;
});
const acceptedFileExtensions = computed(() => {
    if (!props.accept)
        return undefined;
    if (typeof props.accept === 'string')
        return props.accept;
    const labels = new Set();
    for (const mimeType of props.accept) {
        const mapping = FILE_TYPE_MAPPING[mimeType];
        if (mapping) {
            labels.add(mapping.label ?? mapping.extensions.join(', '));
        }
        else {
            labels.add(mimeType);
        }
    }
    return [...labels].join(', ');
});
const resolvedHint = computed(() => {
    if (props.hint)
        return props.hint;
    if (acceptedFileExtensions.value)
        return `Files accepted: ${acceptedFileExtensions.value}`;
    return undefined;
});
// ── Selected files message ────────────────────────────────────────────────────
const fileOrFiles = computed(() => (props.multiple ? 'files' : 'file'));
function getSelectedFilesMessage(displayed) {
    if (fileNames.value.length === 0)
        return `No ${fileOrFiles.value} selected`;
    if (fileNames.value.length === 1) {
        return `${fileNames.value[0]}${displayed ? '' : ' selected'}`;
    }
    return `${fileNames.value.length} files selected`;
}
const displayMessage = computed(() => getSelectedFilesMessage(true));
const announcedMessage = computed(() => getSelectedFilesMessage(false));
// ── Button label & composed aria-label ───────────────────────────────────────
const buttonLabel = computed(() => `Select ${fileOrFiles.value}`);
const optionalText = computed(() => {
    if (props.required || props.hideOptionalLabel)
        return undefined;
    return '(optional)';
});
const buttonAriaLabel = computed(() => [
    buttonLabel.value,
    props.label,
    optionalText.value,
    props.required ? 'required' : undefined,
    props.invalid ? 'invalid' : undefined,
    announcedMessage.value,
]
    .filter(Boolean)
    .join(', '));
// ── aria-describedby for the button ──────────────────────────────────────────
const buttonDescribedBy = computed(() => {
    const ids = [];
    if (resolvedHint.value)
        ids.push(hintId.value);
    if (props.message)
        ids.push(messageId.value);
    return ids.length ? ids.join(' ') : undefined;
});
// ── Refs ──────────────────────────────────────────────────────────────────────
const hiddenInputRef = ref(null);
const visibleButtonRef = ref(null);
const __VLS_exposed = { focus: () => visibleButtonRef.value?.focus() };
defineExpose(__VLS_exposed);
onMounted(() => {
    if (props.autoFocus)
        visibleButtonRef.value?.focus();
});
// ── Handlers ──────────────────────────────────────────────────────────────────
function handleButtonClick() {
    hiddenInputRef.value?.click();
}
const __VLS_defaults = {
    disabled: false,
    autoFocus: false,
    multiple: false,
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    buttonSize: 'sm',
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
const __VLS_0 = AgDSFormStack || AgDSFormStack;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.buttonId),
    ...{ class: "agds-file-input__label" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-input__label']} */ ;
(props.label);
if (__VLS_ctx.optionalText) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-file-input__optional" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-input__optional']} */ ;
    (__VLS_ctx.optionalText);
}
if (__VLS_ctx.resolvedHint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: (__VLS_ctx.hintId),
        ...{ class: "agds-file-input__hint" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-input__hint']} */ ;
    (__VLS_ctx.resolvedHint);
}
const __VLS_7 = AgDSFlex || AgDSFlex;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: (1),
}));
const __VLS_9 = __VLS_8({
    flexDirection: "column",
    alignItems: "flex-start",
    gap: (1),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
const __VLS_13 = AgDSButton || AgDSButton;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    ref: "visibleButtonRef",
    id: (__VLS_ctx.buttonId),
    variant: "secondary",
    size: (props.buttonSize),
    disabled: (props.disabled),
    'aria-label': (__VLS_ctx.buttonAriaLabel),
    'aria-describedby': (__VLS_ctx.buttonDescribedBy),
    'aria-invalid': (props.invalid || undefined),
    type: "button",
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    ref: "visibleButtonRef",
    id: (__VLS_ctx.buttonId),
    variant: "secondary",
    size: (props.buttonSize),
    disabled: (props.disabled),
    'aria-label': (__VLS_ctx.buttonAriaLabel),
    'aria-describedby': (__VLS_ctx.buttonDescribedBy),
    'aria-invalid': (props.invalid || undefined),
    type: "button",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (__VLS_ctx.handleButtonClick) });
const __VLS_20 = ({ focus: {} },
    { onFocus: (...[$event]) => {
            __VLS_ctx.emit('focus', $event);
            // @ts-ignore
            [buttonId, buttonId, optionalText, optionalText, resolvedHint, resolvedHint, hintId, buttonAriaLabel, buttonDescribedBy, handleButtonClick, emit,];
        } });
const __VLS_21 = ({ blur: {} },
    { onBlur: (...[$event]) => {
            __VLS_ctx.emit('blur', $event);
            // @ts-ignore
            [emit,];
        } });
var __VLS_22 = {};
const { default: __VLS_24 } = __VLS_16.slots;
(__VLS_ctx.buttonLabel);
// @ts-ignore
[buttonLabel,];
var __VLS_16;
var __VLS_17;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-file-input__file-name" },
    ...{ class: ({ 'agds-file-input__file-name--populated': __VLS_ctx.hasFiles }) },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['agds-file-input__file-name']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-file-input__file-name--populated']} */ ;
(__VLS_ctx.displayMessage);
// @ts-ignore
[hasFiles, displayMessage,];
var __VLS_10;
if (props.message) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        id: (__VLS_ctx.messageId),
        ...{ class: "agds-file-input__message" },
        ...{ class: ({ 'agds-file-input__message--invalid': props.invalid }) },
        role: "alert",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-input__message']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-input__message--invalid']} */ ;
    (props.message);
}
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleChange) },
    ref: "hiddenInputRef",
    type: "file",
    accept: (__VLS_ctx.acceptString),
    capture: (props.capture),
    disabled: (props.disabled),
    multiple: (props.multiple),
    name: (props.name),
    'aria-hidden': "true",
    tabindex: "-1",
    ...{ class: "agds-file-input__input" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-input__input']} */ ;
// @ts-ignore
[messageId, handleChange, acceptString,];
var __VLS_3;
// @ts-ignore
var __VLS_23 = __VLS_22;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

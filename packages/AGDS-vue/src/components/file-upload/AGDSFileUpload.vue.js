import { computed, getCurrentInstance, ref } from 'vue';
import AGDSField from '../field/AGDSField.vue';
import AGDSButton from '../button/AGDSButton.vue';
import AGDSFileUploadFile from './AGDSFileUploadFile.vue';
import AGDSFileUploadExistingFile from './AGDSFileUploadExistingFile.vue';
import { convertFileToTooManyFilesRejection, formatFileSize, getAcceptedFilesSummary, getErrorSummary, getFileListSummaryText, removeItemAtIndex, validateFile, } from './utils';
const props = withDefaults(defineProps(), {
    modelValue: () => [],
    existingFiles: () => [],
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    disabled: false,
    multiple: false,
    hideThumbnails: false,
});
const emit = defineEmits();
// ── IDs ───────────────────────────────────────────────────────────────────────
const uid = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2);
const buttonId = computed(() => props.id ?? `file-upload-${uid}`);
const fileSizeDescId = computed(() => props.maxSize ? `${buttonId.value}-size-desc` : '');
const acceptedFilesDescId = computed(() => props.accept?.length ? `${buttonId.value}-accept-desc` : '');
// ── Accept map ────────────────────────────────────────────────────────────────
const acceptMapSync = computed(() => {
    if (!props.accept?.length)
        return undefined;
    const entries = [];
    for (const item of props.accept) {
        if (typeof item === 'string') {
            entries.push([item, []]);
        }
        else {
            entries.push([item.mimeType, item.extensions]);
        }
    }
    return Object.fromEntries(entries);
});
// Native <input accept> string
const acceptString = computed(() => {
    if (!props.accept?.length)
        return undefined;
    return props.accept.map((item) => (typeof item === 'string' ? item : item.mimeType)).join(',');
});
// ── Max size ──────────────────────────────────────────────────────────────────
const maxSizeBytes = computed(() => props.maxSize && !isNaN(props.maxSize) ? props.maxSize * 1000 : 0);
const formattedMaxSize = computed(() => formatFileSize(maxSizeBytes.value));
// ── Valid maxFiles ─────────────────────────────────────────────────────────────
const validMaxFiles = computed(() => {
    if (props.maxFiles === undefined)
        return undefined;
    if (props.maxFiles < 1) {
        console.warn('AgDSFileUpload: maxFiles cannot be less than 1. The property is being ignored.');
        return undefined;
    }
    return props.maxFiles;
});
// ── File rejections ───────────────────────────────────────────────────────────
const invalidRejections = ref([]);
const tooManyFilesRejections = ref([]);
const hasRejections = computed(() => invalidRejections.value.length > 0 || tooManyFilesRejections.value.length > 0);
const allRejections = computed(() => [
    ...invalidRejections.value,
    ...tooManyFilesRejections.value,
]);
const pluralRejections = computed(() => allRejections.value.length > 1);
function clearErrors() {
    invalidRejections.value = [];
    tooManyFilesRejections.value = [];
}
// ── Status (aria-live announcement) ───────────────────────────────────────────
const liveStatus = ref('');
// ── File processing ───────────────────────────────────────────────────────────
function processFiles(rawFiles) {
    clearErrors();
    const accepted = [];
    const rejected = [];
    for (const file of rawFiles) {
        const errors = validateFile(file, acceptMapSync.value, maxSizeBytes.value);
        if (errors.length) {
            rejected.push({ file, errors });
        }
        else {
            accepted.push(file);
        }
    }
    if (rejected.length) {
        invalidRejections.value = rejected;
    }
    if (!accepted.length)
        return;
    let validFiles;
    if (props.multiple) {
        // Deduplicate by name+size+type
        const merged = [...props.modelValue, ...accepted];
        const deduped = Object.values(merged.reduce((acc, file) => ({ ...acc, [`${file.name}-${file.size}-${file.type}`]: file }), {}));
        if (validMaxFiles.value && deduped.length > validMaxFiles.value) {
            tooManyFilesRejections.value = deduped
                .slice(validMaxFiles.value)
                .map(convertFileToTooManyFilesRejection);
            validFiles = deduped.slice(0, validMaxFiles.value);
        }
        else {
            validFiles = deduped;
        }
    }
    else {
        validFiles = [accepted[0]];
    }
    liveStatus.value = validFiles.map((f) => f.name).join(', ') + ' added';
    emit('update:modelValue', validFiles);
}
// ── Drag and drop ─────────────────────────────────────────────────────────────
const dragCounter = ref(0);
const isDragActive = computed(() => dragCounter.value > 0);
function onDragEnter(e) {
    e.preventDefault();
    if (props.disabled)
        return;
    dragCounter.value++;
}
function onDragOver(e) {
    e.preventDefault();
}
function onDragLeave(e) {
    e.preventDefault();
    dragCounter.value = Math.max(0, dragCounter.value - 1);
}
function onDrop(e) {
    e.preventDefault();
    dragCounter.value = 0;
    if (props.disabled)
        return;
    const files = Array.from(e.dataTransfer?.files ?? []);
    if (files.length)
        processFiles(files);
}
// ── Hidden input + button ────────────────────────────────────────────────────
const hiddenInputRef = ref(null);
const triggerButtonRef = ref(null);
function openFilePicker() {
    hiddenInputRef.value?.click();
}
function onInputChange(e) {
    const files = Array.from(e.target.files ?? []);
    if (files.length)
        processFiles(files);
    e.target.value = '';
}
// ── File list management ──────────────────────────────────────────────────────
function removeFile(index) {
    clearErrors();
    const removed = props.modelValue[index];
    liveStatus.value = removed.name + ' removed';
    emit('update:modelValue', removeItemAtIndex(props.modelValue, index));
}
function removeExistingFile(file) {
    liveStatus.value = file.name + ' removed';
    emit('remove-existing-file', file);
}
// ── Summary ────────────────────────────────────────────────────────────────────
const fileSummaryText = computed(() => getFileListSummaryText([...props.modelValue, ...props.existingFiles]));
const showFileLists = computed(() => props.modelValue.length > 0 || props.existingFiles.length > 0);
const acceptedFilesSummary = computed(() => getAcceptedFilesSummary(props.accept));
// ── Button aria-label ─────────────────────────────────────────────────────────
const fileOrFiles = computed(() => (props.multiple ? 'files' : 'file'));
const buttonLabel = computed(() => `Select ${fileOrFiles.value}`);
const optionalText = computed(() => props.required || props.hideOptionalLabel ? undefined : '(optional)');
const buttonAriaLabel = computed(() => [
    buttonLabel.value,
    props.label,
    optionalText.value,
    props.required ? 'required' : undefined,
    props.invalid ? 'invalid' : undefined,
    fileSummaryText.value || undefined,
]
    .filter(Boolean)
    .join(', '));
// ── Expose ────────────────────────────────────────────────────────────────────
const __VLS_exposed = { focus: () => triggerButtonRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    modelValue: () => [],
    existingFiles: () => [],
    invalid: false,
    required: false,
    hideOptionalLabel: false,
    disabled: false,
    multiple: false,
    hideThumbnails: false,
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
/** @type {__VLS_StyleScopedClasses['agds-file-upload__error-close']} */ ;
const __VLS_0 = AGDSField || AGDSField;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    label: (props.label),
    id: (__VLS_ctx.buttonId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
}));
const __VLS_2 = __VLS_1({
    label: (props.label),
    id: (__VLS_ctx.buttonId),
    hint: (props.hint),
    invalid: (props.invalid),
    message: (props.message),
    required: (props.required),
    hideOptionalLabel: (props.hideOptionalLabel),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { default: __VLS_7 } = __VLS_3.slots;
    const [slotProps] = __VLS_vSlot(__VLS_7);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload__stack" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__stack']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        role: "status",
        ...{ class: "sr-only" },
        'aria-live': "polite",
        'aria-atomic': "true",
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    (__VLS_ctx.liveStatus);
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onDragenter: (__VLS_ctx.onDragEnter) },
        ...{ onDragover: (__VLS_ctx.onDragOver) },
        ...{ onDragleave: (__VLS_ctx.onDragLeave) },
        ...{ onDrop: (__VLS_ctx.onDrop) },
        ...{ class: "agds-file-upload__dropzone" },
        ...{ class: ({
                'agds-file-upload__dropzone--invalid': props.invalid,
                'agds-file-upload__dropzone--disabled': props.disabled,
                'agds-file-upload__dropzone--drag-active': __VLS_ctx.isDragActive,
            }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__dropzone']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__dropzone--invalid']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__dropzone--disabled']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__dropzone--drag-active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-file-upload__icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "32",
        height: "32",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.input)({
        ...{ onChange: (__VLS_ctx.onInputChange) },
        ref: "hiddenInputRef",
        type: "file",
        accept: (__VLS_ctx.acceptString),
        multiple: (props.multiple),
        disabled: (props.disabled),
        name: (props.name),
        'aria-hidden': "true",
        tabindex: "-1",
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload__instructions" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__instructions']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-file-upload__drag-text" },
        ...{ class: ({ 'agds-file-upload__drag-text--hidden': __VLS_ctx.isDragActive }) },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__drag-text']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload__drag-text--hidden']} */ ;
    (props.multiple
        ? 'Drag and drop files here or select files to upload.'
        : 'Drag and drop a file or select a file to upload.');
    if (__VLS_ctx.isDragActive) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-file-upload__drop-text" },
            'aria-hidden': "true",
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__drop-text']} */ ;
        (__VLS_ctx.fileOrFiles);
    }
    if (props.maxSize) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.fileSizeDescId),
            ...{ class: "agds-file-upload__desc-text" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__desc-text']} */ ;
        (props.multiple ? 'Each file' : 'File');
        (__VLS_ctx.formattedMaxSize);
    }
    if (__VLS_ctx.acceptedFilesSummary) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            id: (__VLS_ctx.acceptedFilesDescId),
            ...{ class: "agds-file-upload__desc-text" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__desc-text']} */ ;
        (__VLS_ctx.acceptedFilesSummary);
    }
    const __VLS_8 = AGDSButton || AGDSButton;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        ...{ 'onClick': {} },
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        ref: "triggerButtonRef",
        variant: "secondary",
        type: "button",
        id: (slotProps.id),
        disabled: (props.disabled),
        'aria-label': (__VLS_ctx.buttonAriaLabel),
        'aria-describedby': ([slotProps['aria-describedby'], __VLS_ctx.fileSizeDescId, __VLS_ctx.acceptedFilesDescId].filter(Boolean).join(' ') || undefined),
        focusRingFor: "all",
    }));
    const __VLS_10 = __VLS_9({
        ...{ 'onClick': {} },
        ...{ 'onFocus': {} },
        ...{ 'onBlur': {} },
        ref: "triggerButtonRef",
        variant: "secondary",
        type: "button",
        id: (slotProps.id),
        disabled: (props.disabled),
        'aria-label': (__VLS_ctx.buttonAriaLabel),
        'aria-describedby': ([slotProps['aria-describedby'], __VLS_ctx.fileSizeDescId, __VLS_ctx.acceptedFilesDescId].filter(Boolean).join(' ') || undefined),
        focusRingFor: "all",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    let __VLS_13;
    const __VLS_14 = ({ click: {} },
        { onClick: (__VLS_ctx.openFilePicker) });
    const __VLS_15 = ({ focus: {} },
        { onFocus: (...[$event]) => {
                __VLS_ctx.emit('focus', $event);
                // @ts-ignore
                [buttonId, liveStatus, onDragEnter, onDragOver, onDragLeave, onDrop, isDragActive, isDragActive, isDragActive, onInputChange, acceptString, fileOrFiles, fileSizeDescId, fileSizeDescId, formattedMaxSize, acceptedFilesSummary, acceptedFilesSummary, acceptedFilesDescId, acceptedFilesDescId, buttonAriaLabel, openFilePicker, emit,];
            } });
    const __VLS_16 = ({ blur: {} },
        { onBlur: (...[$event]) => {
                __VLS_ctx.emit('blur', $event);
                // @ts-ignore
                [emit,];
            } });
    var __VLS_17 = {};
    const { default: __VLS_19 } = __VLS_11.slots;
    (__VLS_ctx.buttonLabel);
    // @ts-ignore
    [buttonLabel,];
    var __VLS_11;
    var __VLS_12;
    if (__VLS_ctx.hasRejections) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-file-upload__error-panel" },
            role: "alert",
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-panel']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-file-upload__error-header" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-header']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-file-upload__error-title" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-title']} */ ;
        (__VLS_ctx.pluralRejections ? 'files' : 'file');
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (__VLS_ctx.clearErrors) },
            type: "button",
            ...{ class: "agds-file-upload__error-close" },
            'aria-label': "Dismiss error",
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-close']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "20",
            height: "20",
            fill: "none",
            stroke: "currentColor",
            'stroke-width': "2",
            'stroke-linecap': "round",
            'stroke-linejoin': "round",
            focusable: "false",
            'aria-hidden': "true",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M18 6 6 18M6 6l12 12",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "sr-only" },
        });
        /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
            ...{ class: "agds-file-upload__error-intro" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-intro']} */ ;
        (__VLS_ctx.pluralRejections
            ? 'These files were unable to be accepted for the following reasons:'
            : 'This file was unable to be accepted for the following reason:');
        __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
            ...{ class: "agds-file-upload__error-list" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-list']} */ ;
        for (const [rejection] of __VLS_vFor((__VLS_ctx.allRejections))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
                key: (rejection.file.name),
                ...{ class: "agds-file-upload__error-item" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-item']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "agds-file-upload__error-filename" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-filename']} */ ;
            (rejection.file.name);
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
                ...{ class: "agds-file-upload__error-size" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__error-size']} */ ;
            (__VLS_ctx.formatFileSize(rejection.file.size));
            __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
            (__VLS_ctx.getErrorSummary(rejection.errors, __VLS_ctx.formattedMaxSize));
            // @ts-ignore
            [formattedMaxSize, hasRejections, pluralRejections, pluralRejections, clearErrors, allRejections, formatFileSize, getErrorSummary,];
        }
    }
    if (__VLS_ctx.showFileLists) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "agds-file-upload__file-lists" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload__file-lists']} */ ;
        if (__VLS_ctx.fileSummaryText) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "agds-file-upload__summary" },
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__summary']} */ ;
            (__VLS_ctx.fileSummaryText);
        }
        if (props.existingFiles.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "agds-file-upload__list" },
                'aria-label': "Existing files",
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__list']} */ ;
            for (const [file, index] of __VLS_vFor((props.existingFiles))) {
                const __VLS_20 = AGDSFileUploadExistingFile;
                // @ts-ignore
                const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({
                    key: (index),
                    file: (file),
                    hideThumbnails: (props.hideThumbnails),
                    onRemove: (() => __VLS_ctx.removeExistingFile(file)),
                }));
                const __VLS_22 = __VLS_21({
                    key: (index),
                    file: (file),
                    hideThumbnails: (props.hideThumbnails),
                    onRemove: (() => __VLS_ctx.removeExistingFile(file)),
                }, ...__VLS_functionalComponentArgsRest(__VLS_21));
                // @ts-ignore
                [showFileLists, fileSummaryText, fileSummaryText, removeExistingFile,];
            }
        }
        if (props.modelValue.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
                ...{ class: "agds-file-upload__list" },
                'aria-label': "Selected files",
            });
            /** @type {__VLS_StyleScopedClasses['agds-file-upload__list']} */ ;
            for (const [file, index] of __VLS_vFor((props.modelValue))) {
                const __VLS_25 = AGDSFileUploadFile;
                // @ts-ignore
                const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
                    key: (index),
                    file: (file),
                    hideThumbnails: (props.hideThumbnails),
                    onRemove: (() => __VLS_ctx.removeFile(index)),
                }));
                const __VLS_27 = __VLS_26({
                    key: (index),
                    file: (file),
                    hideThumbnails: (props.hideThumbnails),
                    onRemove: (() => __VLS_ctx.removeFile(index)),
                }, ...__VLS_functionalComponentArgsRest(__VLS_26));
                // @ts-ignore
                [removeFile,];
            }
        }
    }
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_18 = __VLS_17;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

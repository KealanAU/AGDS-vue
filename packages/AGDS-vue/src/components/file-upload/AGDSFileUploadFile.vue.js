import { computed, onUnmounted } from 'vue';
import AGDSButton from '../button/AGDSButton.vue';
import AGDSTextLink from '../text-link/AGDSTextLink.vue';
import AGDSFileUploadFileThumbnail from './AGDSFileUploadFileThumbnail.vue';
import { formatFileSize, getImageThumbnail } from './utils';
const props = defineProps();
const status = computed(() => props.file.status ?? 'none');
// Create an object URL for image preview; revoke it when the component unmounts.
const imagePreview = computed(() => getImageThumbnail(props.file));
onUnmounted(() => {
    if (imagePreview.value)
        URL.revokeObjectURL(imagePreview.value);
});
const sizeText = computed(() => props.file.size ? ` (${formatFileSize(props.file.size)})` : '');
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
    ...{ class: "agds-file-upload-file" },
    ...{ class: ({
            'agds-file-upload-file--success': __VLS_ctx.status === 'success',
            'agds-file-upload-file--shade': __VLS_ctx.status !== 'success',
        }) },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file--success']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file--shade']} */ ;
if (!__VLS_ctx.hideThumbnails) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload-file__thumb-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-file__thumb-wrapper']} */ ;
    const __VLS_0 = AGDSFileUploadFileThumbnail;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        src: (__VLS_ctx.imagePreview),
    }));
    const __VLS_2 = __VLS_1({
        src: (__VLS_ctx.imagePreview),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-file-upload-file__info" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file__info']} */ ;
if (__VLS_ctx.status === 'success') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "agds-file-upload-file__success-icon" },
        role: "img",
        'aria-label': "Success",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-file__success-icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "20",
        height: "20",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    });
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-file-upload-file__name" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file__name']} */ ;
if (__VLS_ctx.file.href) {
    const __VLS_5 = AGDSTextLink || AGDSTextLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        href: (__VLS_ctx.file.href),
        download: (__VLS_ctx.file.download),
        rel: "noopener noreferrer",
        target: "_blank",
    }));
    const __VLS_7 = __VLS_6({
        href: (__VLS_ctx.file.href),
        download: (__VLS_ctx.file.download),
        rel: "noopener noreferrer",
        target: "_blank",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    const { default: __VLS_10 } = __VLS_8.slots;
    (__VLS_ctx.file.name);
    (__VLS_ctx.sizeText);
    // @ts-ignore
    [status, status, status, hideThumbnails, imagePreview, file, file, file, file, sizeText,];
    var __VLS_8;
}
else {
    (__VLS_ctx.file.name);
    if (__VLS_ctx.file.size) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-file-upload-file__size" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload-file__size']} */ ;
        (__VLS_ctx.formatFileSize(__VLS_ctx.file.size));
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-file-upload-file__actions" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-file__actions']} */ ;
if (__VLS_ctx.status === 'uploading') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload-file__uploading" },
        'aria-label': "Uploading",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-file__uploading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span)({
        ...{ class: "agds-file-upload-file__spinner" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-file__spinner']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "sr-only" },
    });
    /** @type {__VLS_StyleScopedClasses['sr-only']} */ ;
}
else {
    const __VLS_11 = AGDSButton || AGDSButton;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        ...{ 'onClick': {} },
        variant: "text",
        size: "sm",
        type: "button",
        'aria-label': (`Remove file: ${__VLS_ctx.file.name}`),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onClick': {} },
        variant: "text",
        size: "sm",
        type: "button",
        'aria-label': (`Remove file: ${__VLS_ctx.file.name}`),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_16;
    const __VLS_17 = ({ click: {} },
        { onClick: (__VLS_ctx.onRemove) });
    const { default: __VLS_18 } = __VLS_14.slots;
    {
        const { iconBefore: __VLS_19 } = __VLS_14.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "16",
            height: "16",
            fill: "currentColor",
            focusable: "false",
            'aria-hidden': "true",
        });
        __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
            d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z",
        });
        // @ts-ignore
        [status, file, file, file, file, formatFileSize, onRemove,];
    }
    // @ts-ignore
    [];
    var __VLS_14;
    var __VLS_15;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

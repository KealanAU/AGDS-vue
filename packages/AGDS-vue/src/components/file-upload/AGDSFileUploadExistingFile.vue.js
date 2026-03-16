import { computed } from 'vue';
import AGDSButton from '../button/AGDSButton.vue';
import AGDSTextLink from '../text-link/AGDSTextLink.vue';
import AGDSFileUploadFileThumbnail from './AGDSFileUploadFileThumbnail.vue';
import { formatFileSize } from './utils';
const props = defineProps();
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
    ...{ class: "agds-file-upload-existing-file" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file']} */ ;
if (!__VLS_ctx.hideThumbnails) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload-existing-file__thumb-wrapper" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__thumb-wrapper']} */ ;
    const __VLS_0 = AGDSFileUploadFileThumbnail;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        src: (__VLS_ctx.file.thumbnailSrc),
    }));
    const __VLS_2 = __VLS_1({
        src: (__VLS_ctx.file.thumbnailSrc),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-file-upload-existing-file__info" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__info']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-file-upload-existing-file__success-icon" },
    role: "img",
    'aria-label': "Success",
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__success-icon']} */ ;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-file-upload-existing-file__name" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__name']} */ ;
if (__VLS_ctx.file.href) {
    const __VLS_5 = AGDSTextLink || AGDSTextLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        ...{ 'onClick': {} },
        href: (__VLS_ctx.file.href),
        download: (__VLS_ctx.file.download),
        rel: "noopener noreferrer",
        target: "_blank",
    }));
    const __VLS_7 = __VLS_6({
        ...{ 'onClick': {} },
        href: (__VLS_ctx.file.href),
        download: (__VLS_ctx.file.download),
        rel: "noopener noreferrer",
        target: "_blank",
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    let __VLS_10;
    const __VLS_11 = ({ click: {} },
        { onClick: (...[$event]) => {
                if (!(__VLS_ctx.file.href))
                    return;
                __VLS_ctx.file.onClick && __VLS_ctx.file.onClick($event);
                // @ts-ignore
                [hideThumbnails, file, file, file, file, file, file,];
            } });
    const { default: __VLS_12 } = __VLS_8.slots;
    (__VLS_ctx.file.name);
    (__VLS_ctx.sizeText);
    // @ts-ignore
    [file, sizeText,];
    var __VLS_8;
    var __VLS_9;
}
else {
    (__VLS_ctx.file.name);
    if (__VLS_ctx.file.size) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "agds-file-upload-existing-file__size" },
        });
        /** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__size']} */ ;
        (__VLS_ctx.formatFileSize(__VLS_ctx.file.size));
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "agds-file-upload-existing-file__actions" },
});
/** @type {__VLS_StyleScopedClasses['agds-file-upload-existing-file__actions']} */ ;
const __VLS_13 = AGDSButton || AGDSButton;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ 'onClick': {} },
    variant: "text",
    size: "sm",
    type: "button",
    'aria-label': (`Remove file: ${__VLS_ctx.file.name}`),
}));
const __VLS_15 = __VLS_14({
    ...{ 'onClick': {} },
    variant: "text",
    size: "sm",
    type: "button",
    'aria-label': (`Remove file: ${__VLS_ctx.file.name}`),
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
let __VLS_18;
const __VLS_19 = ({ click: {} },
    { onClick: (__VLS_ctx.onRemove) });
const { default: __VLS_20 } = __VLS_16.slots;
{
    const { iconBefore: __VLS_21 } = __VLS_16.slots;
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
    [file, file, file, file, formatFileSize, onRemove,];
}
// @ts-ignore
[];
var __VLS_16;
var __VLS_17;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

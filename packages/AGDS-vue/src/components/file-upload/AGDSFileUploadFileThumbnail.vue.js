const __VLS_props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['agds-file-upload-thumbnail']} */ ;
if (__VLS_ctx.src) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)({
        ...{ class: "agds-file-upload-thumbnail agds-file-upload-thumbnail--image" },
        ...{ style: ({ backgroundImage: `url(${__VLS_ctx.src})` }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-thumbnail']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-thumbnail--image']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "agds-file-upload-thumbnail agds-file-upload-thumbnail--icon" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-thumbnail']} */ ;
    /** @type {__VLS_StyleScopedClasses['agds-file-upload-thumbnail--icon']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "currentColor",
        focusable: "false",
        'aria-hidden': "true",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.path)({
        d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 5h8v2H8v-2zm0-4h8v2H8v-2z",
    });
}
// @ts-ignore
[src, src,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};

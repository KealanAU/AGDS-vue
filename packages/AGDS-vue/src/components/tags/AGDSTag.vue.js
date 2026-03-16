import { ref } from 'vue';
import AgDSIcon from '../icon/AGDSIcon.vue';
const props = withDefaults(defineProps(), {
    removable: false,
});
const emit = defineEmits();
const removeButtonRef = ref(null);
const __VLS_exposed = { focusRemoveButton: () => removeButtonRef.value?.focus() };
defineExpose(__VLS_exposed);
const __VLS_defaults = {
    removable: false,
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
/** @type {__VLS_StyleScopedClasses['agds-tag__label--link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__label--link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__label--link']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__remove']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__remove']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__remove']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "agds-tag" },
});
/** @type {__VLS_StyleScopedClasses['agds-tag']} */ ;
const __VLS_0 = (__VLS_ctx.href ? 'a' : 'span');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.href ? { href: __VLS_ctx.href } : {}),
    ...{ class: "agds-tag__label" },
    ...{ class: ({ 'agds-tag__label--link': !!__VLS_ctx.href }) },
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.href ? { href: __VLS_ctx.href } : {}),
    ...{ class: "agds-tag__label" },
    ...{ class: ({ 'agds-tag__label--link': !!__VLS_ctx.href }) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['agds-tag__label']} */ ;
/** @type {__VLS_StyleScopedClasses['agds-tag__label--link']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
(__VLS_ctx.label);
// @ts-ignore
[href, href, href, href, label,];
var __VLS_3;
if (__VLS_ctx.removable) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                if (!(__VLS_ctx.removable))
                    return;
                __VLS_ctx.emit('remove', $event);
                // @ts-ignore
                [removable, emit,];
            } },
        ref: "removeButtonRef",
        type: "button",
        'aria-label': (`Remove ${__VLS_ctx.label}`),
        ...{ class: "agds-tag__remove" },
    });
    /** @type {__VLS_StyleScopedClasses['agds-tag__remove']} */ ;
    const __VLS_6 = AgDSIcon;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        name: "mdi:close",
        size: "sm",
        'aria-hidden': "true",
    }));
    const __VLS_8 = __VLS_7({
        name: "mdi:close",
        size: "sm",
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
}
// @ts-ignore
[label,];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

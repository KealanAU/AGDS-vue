import AGDSTextLink from './AGDSTextLink.vue';
import AGDSExternalLinkCallout from '../visually-hidden/AGDSExternalLinkCallout.vue';
import AGDSIcon from '../icon/AGDSIcon.vue';
const __VLS_props = withDefaults(defineProps(), {
    focusRingFor: 'keyboard',
});
const __VLS_emit = defineEmits();
const __VLS_defaults = {
    focusRingFor: 'keyboard',
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = AGDSTextLink || AGDSTextLink;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    href: (__VLS_ctx.href),
    focusRingFor: (__VLS_ctx.focusRingFor),
    rel: "noopener noreferrer",
    target: "_blank",
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ...{ 'onFocus': {} },
    ...{ 'onBlur': {} },
    href: (__VLS_ctx.href),
    focusRingFor: (__VLS_ctx.focusRingFor),
    rel: "noopener noreferrer",
    target: "_blank",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.$emit('click', $event);
            // @ts-ignore
            [href, focusRingFor, $emit,];
        } });
const __VLS_7 = ({ focus: {} },
    { onFocus: (...[$event]) => {
            __VLS_ctx.$emit('focus', $event);
            // @ts-ignore
            [$emit,];
        } });
const __VLS_8 = ({ blur: {} },
    { onBlur: (...[$event]) => {
            __VLS_ctx.$emit('blur', $event);
            // @ts-ignore
            [$emit,];
        } });
var __VLS_9 = {};
const { default: __VLS_10 } = __VLS_3.slots;
var __VLS_11 = {};
const __VLS_13 = AGDSExternalLinkCallout;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const __VLS_18 = AGDSIcon;
// @ts-ignore
const __VLS_19 = __VLS_asFunctionalComponent1(__VLS_18, new __VLS_18({
    name: "mdi:open-in-new",
    size: "sm",
    ...{ class: "agds-text-link-external__icon" },
    'aria-hidden': "true",
}));
const __VLS_20 = __VLS_19({
    name: "mdi:open-in-new",
    size: "sm",
    ...{ class: "agds-text-link-external__icon" },
    'aria-hidden': "true",
}, ...__VLS_functionalComponentArgsRest(__VLS_19));
/** @type {__VLS_StyleScopedClasses['agds-text-link-external__icon']} */ ;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_12 = __VLS_11;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};

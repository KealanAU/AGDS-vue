import { provide } from 'vue';
import { AccordionRoot } from 'reka-ui';
const props = withDefaults(defineProps(), {
    type: 'multiple',
    collapsible: true,
    indent: false,
    background: 'body',
});
const emit = defineEmits();
provide('accordionIndent', props.indent);
provide('accordionBackground', props.background);
const __VLS_defaults = {
    type: 'multiple',
    collapsible: true,
    indent: false,
    background: 'body',
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
let __VLS_0;
/** @ts-ignore @type {typeof __VLS_components.AccordionRoot | typeof __VLS_components.AccordionRoot} */
AccordionRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    type: (props.type),
    collapsible: (props.type === 'single' ? props.collapsible : undefined),
    modelValue: (props.modelValue),
    defaultValue: (props.defaultValue),
    ...{ class: "ausgov-accordion" },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    type: (props.type),
    collapsible: (props.type === 'single' ? props.collapsible : undefined),
    modelValue: (props.modelValue),
    defaultValue: (props.defaultValue),
    ...{ class: "ausgov-accordion" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': ((v) => v !== undefined && __VLS_ctx.emit('update:modelValue', v)) });
var __VLS_7 = {};
/** @type {__VLS_StyleScopedClasses['ausgov-accordion']} */ ;
const { default: __VLS_8 } = __VLS_3.slots;
var __VLS_9 = {};
// @ts-ignore
[emit,];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_10 = __VLS_9;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};

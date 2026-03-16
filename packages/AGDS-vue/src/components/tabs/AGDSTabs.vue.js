import { provide, ref, onMounted, onUnmounted } from 'vue';
import { TabsRoot } from 'reka-ui';
const props = withDefaults(defineProps(), {
    contained: true,
    background: 'body',
});
const emit = defineEmits();
// Responsive orientation: vertical on mobile (<768px), horizontal on desktop
const orientation = ref('horizontal');
let mq = null;
function onMqChange(e) {
    orientation.value = e.matches ? 'horizontal' : 'vertical';
}
onMounted(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
        mq = window.matchMedia('(min-width: 768px)');
        orientation.value = mq.matches ? 'horizontal' : 'vertical';
        mq.addEventListener('change', onMqChange);
    }
});
onUnmounted(() => {
    mq?.removeEventListener('change', onMqChange);
});
provide('tabsBackground', props.background);
provide('tabsContained', props.contained);
const __VLS_defaults = {
    contained: true,
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
/** @ts-ignore @type {typeof __VLS_components.TabsRoot | typeof __VLS_components.TabsRoot} */
TabsRoot;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (props.modelValue),
    defaultValue: (props.defaultValue),
    orientation: (__VLS_ctx.orientation),
    ...{ class: ([
            'agds-tabs',
            props.background === 'bodyAlt' && 'agds-tabs--body-alt',
        ]) },
}));
const __VLS_2 = __VLS_1({
    ...{ 'onUpdate:modelValue': {} },
    modelValue: (props.modelValue),
    defaultValue: (props.defaultValue),
    orientation: (__VLS_ctx.orientation),
    ...{ class: ([
            'agds-tabs',
            props.background === 'bodyAlt' && 'agds-tabs--body-alt',
        ]) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ 'update:modelValue': {} },
    { 'onUpdate:modelValue': ((v) => __VLS_ctx.emit('update:modelValue', v)) });
var __VLS_7 = {};
/** @type {__VLS_StyleScopedClasses['agds-tabs']} */ ;
const { default: __VLS_8 } = __VLS_3.slots;
var __VLS_9 = {};
// @ts-ignore
[orientation, emit,];
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

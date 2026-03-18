import { computed, ref } from 'vue';
import AGDSButton from './AGDSButton.vue';
import AGDSIcon from '../icon/AGDSIcon.vue';
const ICON_MAP = {
    flag: { false: 'mdi:flag-outline', true: 'mdi:flag' },
    star: { false: 'mdi:star-outline', true: 'mdi:star' },
};
const props = withDefaults(defineProps(), {
    hiddenLabel: false,
    iconType: 'flag',
    size: 'md',
    variant: 'text',
    disabled: false,
});
const emit = defineEmits();
const buttonRef = ref(null);
const __VLS_exposed = { focus: () => buttonRef.value?.focus() };
defineExpose(__VLS_exposed);
const resolvedLabel = computed(() => props.pressed ? props.pressedLabel : props.label);
const iconName = computed(() => ICON_MAP[props.iconType][String(props.pressed)]);
function handleClick() {
    if (!props.disabled) {
        emit('update:pressed', !props.pressed);
    }
}
const __VLS_defaults = {
    hiddenLabel: false,
    iconType: 'flag',
    size: 'md',
    variant: 'text',
    disabled: false,
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
const __VLS_0 = AGDSButton || AGDSButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onClick': {} },
    ref: "buttonRef",
    type: "button",
    size: (props.size),
    variant: (props.variant),
    disabled: (props.disabled),
    'aria-pressed': (props.pressed),
    'aria-label': (props.hiddenLabel ? __VLS_ctx.resolvedLabel : undefined),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onClick': {} },
    ref: "buttonRef",
    type: "button",
    size: (props.size),
    variant: (props.variant),
    disabled: (props.disabled),
    'aria-pressed': (props.pressed),
    'aria-label': (props.hiddenLabel ? __VLS_ctx.resolvedLabel : undefined),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ click: {} },
    { onClick: (__VLS_ctx.handleClick) });
var __VLS_7 = {};
const { default: __VLS_9 } = __VLS_3.slots;
{
    const { iconBefore: __VLS_10 } = __VLS_3.slots;
    const __VLS_11 = AGDSIcon;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
        name: (__VLS_ctx.iconName),
        'aria-hidden': "true",
    }));
    const __VLS_13 = __VLS_12({
        name: (__VLS_ctx.iconName),
        'aria-hidden': "true",
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    // @ts-ignore
    [resolvedLabel, handleClick, iconName,];
}
if (!props.hiddenLabel) {
    {
        const { default: __VLS_16 } = __VLS_3.slots;
        (__VLS_ctx.resolvedLabel);
        // @ts-ignore
        [resolvedLabel,];
    }
}
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    setup: () => (__VLS_exposed),
    __typeEmits: {},
    __typeProps: {},
    props: {},
});
export default {};

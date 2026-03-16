import { computed, useAttrs } from 'vue';
defineOptions({ inheritAttrs: false });
const props = defineProps();
const attrs = useAttrs();
/** Maps a numeric space value to a CSS token, or returns the string as-is. */
function spaceVar(val) {
    if (val === undefined)
        return undefined;
    return typeof val === 'number' ? `var(--agds-space-${val})` : val;
}
const style = computed(() => {
    // Start with shorthand padding so individual sides can override below
    const paddingTop = spaceVar(props.paddingTop) ?? spaceVar(props.paddingY);
    const paddingBottom = spaceVar(props.paddingBottom) ?? spaceVar(props.paddingY);
    const paddingLeft = spaceVar(props.paddingLeft) ?? spaceVar(props.paddingX);
    const paddingRight = spaceVar(props.paddingRight) ?? spaceVar(props.paddingX);
    const raw = {
        display: props.display,
        flexDirection: props.flexDirection,
        flexWrap: props.flexWrap,
        flexGrow: props.flexGrow,
        flexShrink: props.flexShrink,
        alignItems: props.alignItems,
        alignSelf: props.alignSelf,
        justifyContent: props.justifyContent,
        justifySelf: props.justifySelf,
        gap: spaceVar(props.gap),
        columnGap: spaceVar(props.columnGap),
        rowGap: spaceVar(props.rowGap),
        // If the shorthand `padding` prop is set it wins over all individual sides
        padding: spaceVar(props.padding),
        paddingTop: props.padding !== undefined ? undefined : paddingTop,
        paddingRight: props.padding !== undefined ? undefined : paddingRight,
        paddingBottom: props.padding !== undefined ? undefined : paddingBottom,
        paddingLeft: props.padding !== undefined ? undefined : paddingLeft,
        width: props.width,
        height: props.height,
        minWidth: props.minWidth,
        maxWidth: props.maxWidth,
        minHeight: props.minHeight,
        maxHeight: props.maxHeight,
    };
    // Strip undefined so Vue doesn't emit empty style attributes
    return Object.fromEntries(Object.entries(raw).filter(([, v]) => v !== undefined));
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = (props.as ?? 'div');
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...(__VLS_ctx.attrs),
    ...{ style: (__VLS_ctx.style) },
}));
const __VLS_2 = __VLS_1({
    ...(__VLS_ctx.attrs),
    ...{ style: (__VLS_ctx.style) },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[attrs, style,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};

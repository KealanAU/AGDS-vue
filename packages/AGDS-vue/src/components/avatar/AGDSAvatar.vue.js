import { computed, useAttrs } from 'vue';
import { getInitialsFromName } from './utils';
// Disable automatic attribute inheritance so we can control where aria-* land.
defineOptions({ inheritAttrs: false });
const props = withDefaults(defineProps(), {
    tone: 'neutral',
    size: 'md',
});
// $attrs contains any non-prop attributes passed by the consumer (aria-hidden, aria-label, data-*, etc.)
const attrs = useAttrs();
const initials = computed(() => getInitialsFromName(props.name));
// Support both boolean true and the string "true" — both are valid when passed from templates.
const isHidden = computed(() => attrs['aria-hidden'] === true || attrs['aria-hidden'] === 'true');
// Default aria-label to name so the avatar is accessible out of the box.
// Consumers can override by passing aria-label explicitly, or suppress
// entirely with aria-hidden="true".
const ariaLabel = computed(() => {
    if (isHidden.value)
        return undefined;
    if ('aria-label' in attrs)
        return attrs['aria-label'] || undefined;
    return props.name;
});
const __VLS_defaults = {
    tone: 'neutral',
    size: 'md',
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
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...(__VLS_ctx.attrs),
    ...{ class: ([
            'agds-avatar',
            `agds-avatar--${props.tone}`,
            `agds-avatar--${props.size}`,
        ]) },
    role: (__VLS_ctx.isHidden ? undefined : 'img'),
    'aria-label': (__VLS_ctx.ariaLabel),
    'aria-hidden': (__VLS_ctx.isHidden ? 'true' : undefined),
});
/** @type {__VLS_StyleScopedClasses['agds-avatar']} */ ;
(__VLS_ctx.initials);
// @ts-ignore
[attrs, isHidden, isHidden, ariaLabel, initials,];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
export default {};

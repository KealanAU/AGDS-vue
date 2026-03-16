import { computed, useAttrs } from 'vue';
import { Icon } from '@iconify/vue';
export default {};
const __VLS_export = await (async () => {
    defineOptions({ inheritAttrs: false });
    const props = withDefaults(defineProps(), {
        size: 'md',
    });
    const attrs = useAttrs();
    const SIZE_MAP = {
        sm: 'var(--ausgov-icon-size-sm)',
        md: 'var(--ausgov-icon-size-md)',
        lg: 'var(--ausgov-icon-size-lg)',
        xl: 'var(--ausgov-icon-size-xl)',
    };
    // Strip the UnoCSS/Tailwind "i-" prefix so both "i-mdi:home" and "mdi:home" work
    const iconName = computed(() => typeof props.name === 'string' ? props.name.replace(/^i-/, '') : '');
    const resolvedSize = computed(() => {
        const s = props.size;
        if (typeof s === 'number')
            return `${s}px`;
        if (s && s in SIZE_MAP)
            return SIZE_MAP[s];
        return s ?? SIZE_MAP.md;
    });
    const iconStyle = computed(() => ({
        fontSize: resolvedSize.value,
        ...(props.color ? { color: props.color } : {}),
    }));
    /**
     * A11y defaults — works with @iconify/vue's internal SVG attribute handling:
     * - aria-hidden="true"  → @iconify/vue keeps aria-hidden on the SVG (decorative)
     * - aria-hidden="false" → @iconify/vue REMOVES aria-hidden from the SVG (meaningful)
     * - no aria-hidden prop → @iconify/vue defaults to aria-hidden="true"
     * - role="img" is always set by @iconify/vue's svgDefaults
     */
    const a11yAttrs = computed(() => {
        const ariaLabel = attrs['aria-label'];
        if (ariaLabel) {
            // Meaningful icon: tell @iconify/vue to remove aria-hidden so role="img" + aria-label are exposed
            return { 'aria-hidden': 'false' };
        }
        // Decorative default; respect explicit aria-hidden override from consumer
        if (attrs['aria-hidden'] === undefined) {
            return { 'aria-hidden': 'true' };
        }
        return {};
    });
    const __VLS_defaults = {
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
    if (typeof __VLS_ctx.name === 'string') {
        let __VLS_0;
        /** @ts-ignore @type {typeof __VLS_components.Icon} */
        Icon;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            icon: (__VLS_ctx.iconName),
            focusable: "false",
            ...{ class: "ausgov-icon" },
            ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.a11yAttrs }),
            ...{ style: (__VLS_ctx.iconStyle) },
        }));
        const __VLS_2 = __VLS_1({
            icon: (__VLS_ctx.iconName),
            focusable: "false",
            ...{ class: "ausgov-icon" },
            ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.a11yAttrs }),
            ...{ style: (__VLS_ctx.iconStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        var __VLS_5 = {};
        /** @type {__VLS_StyleScopedClasses['ausgov-icon']} */ ;
        var __VLS_3;
    }
    else {
        const __VLS_6 = (__VLS_ctx.name);
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            ...{ class: "ausgov-icon" },
            ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.a11yAttrs }),
            ...{ style: (__VLS_ctx.iconStyle) },
        }));
        const __VLS_8 = __VLS_7({
            ...{ class: "ausgov-icon" },
            ...({ ...__VLS_ctx.$attrs, ...__VLS_ctx.a11yAttrs }),
            ...{ style: (__VLS_ctx.iconStyle) },
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        var __VLS_11 = {};
        /** @type {__VLS_StyleScopedClasses['ausgov-icon']} */ ;
        var __VLS_9;
    }
    // @ts-ignore
    [name, name, iconName, $attrs, $attrs, a11yAttrs, a11yAttrs, iconStyle, iconStyle,];
    return (await import('vue')).defineComponent({
        __typeProps: {},
        props: {},
    });
})();

import { computed, ref } from 'vue';
import AusGovProgressIndicatorItem from './AGDSProgressIndicatorItem.vue';
export default {};
const __VLS_export = await (async () => {
    defineOptions({ name: 'AusGovProgressIndicator' });
    const props = withDefaults(defineProps(), {
        background: 'body',
        hideSubtitle: false,
    });
    /** Mobile collapse state — open by default */
    const isExpanded = ref(true);
    function toggle() {
        isExpanded.value = !isExpanded.value;
    }
    const subtitle = computed(() => {
        if (props.hideSubtitle)
            return undefined;
        const doneCount = props.items.filter(i => i.status === 'done').length;
        return `${doneCount} of ${props.items.length} steps completed`;
    });
    /** Resolve `isActive` for each item based on `activePath` or legacy `isActive` props. */
    const processedItems = computed(() => {
        const hasExplicitActive = props.items.some(i => i.isActive);
        return props.items.map(item => {
            let isActive;
            if (hasExplicitActive) {
                // Legacy: consumer set isActive directly
                isActive = !!item.isActive;
            }
            else if (props.activePath !== undefined) {
                const matcher = item.href ?? item.label;
                const withTrailingSlash = matcher.endsWith('/') ? matcher : `${matcher}/`;
                const hasActiveSubStep = !!props.activePath.split(withTrailingSlash)[1]?.length;
                isActive = props.activePath === matcher || hasActiveSubStep;
            }
            else {
                // Oldest legacy: 'doing' status auto-activates
                isActive = item.status === 'doing';
            }
            const levelTwoItems = item.items?.map(l2 => ({
                ...l2,
                isActive: l2.href === props.activePath,
            }));
            return { ...item, isActive, items: levelTwoItems };
        });
    });
    const __VLS_defaults = {
        background: 'body',
        hideSubtitle: false,
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
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__toggle']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__body']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__toggle']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__body']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__list']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
        ...{ class: "ausgov-pi" },
        ...{ class: ([
                `ausgov-pi--bg-${__VLS_ctx.background}`,
                { 'ausgov-pi--expanded': __VLS_ctx.isExpanded },
            ]) },
        'aria-label': "Progress",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi--expanded']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (__VLS_ctx.toggle) },
        type: "button",
        ...{ class: "ausgov-pi__toggle" },
        'aria-expanded': (__VLS_ctx.isExpanded),
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__toggle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-pi__toggle-text" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__toggle-text']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "ausgov-pi__title" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__title']} */ ;
    if (__VLS_ctx.subtitle) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
            ...{ class: "ausgov-pi__subtitle" },
        });
        /** @type {__VLS_StyleScopedClasses['ausgov-pi__subtitle']} */ ;
        (__VLS_ctx.subtitle);
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.svg, __VLS_intrinsics.svg)({
        ...{ class: "ausgov-pi__chevron" },
        ...{ class: ({ 'ausgov-pi__chevron--open': __VLS_ctx.isExpanded }) },
        'aria-hidden': "true",
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        'stroke-width': "2",
        'stroke-linecap': "round",
        'stroke-linejoin': "round",
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__chevron']} */ ;
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__chevron--open']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.polyline)({
        points: "6 9 12 15 18 9",
    });
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "ausgov-pi__body" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__body']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
        ...{ class: "ausgov-pi__list" },
    });
    /** @type {__VLS_StyleScopedClasses['ausgov-pi__list']} */ ;
    for (const [item, index] of __VLS_vFor((__VLS_ctx.processedItems))) {
        const __VLS_0 = AusGovProgressIndicatorItem;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
            key: (item.label),
            item: (item),
            background: (__VLS_ctx.background),
            isFirst: (index === 0),
            isLast: (index === __VLS_ctx.processedItems.length - 1),
        }));
        const __VLS_2 = __VLS_1({
            key: (item.label),
            item: (item),
            background: (__VLS_ctx.background),
            isFirst: (index === 0),
            isLast: (index === __VLS_ctx.processedItems.length - 1),
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        // @ts-ignore
        [background, background, isExpanded, isExpanded, isExpanded, toggle, subtitle, subtitle, processedItems, processedItems,];
    }
    // @ts-ignore
    [];
    return (await import('vue')).defineComponent({
        __typeProps: {},
        props: {},
    });
})();

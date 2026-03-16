import { onMounted, onBeforeUnmount, computed } from 'vue';
import CoreProvider from './CoreProvider.vue';
import { goldTheme } from './goldTheme';
import { printTheme } from './printTheme';
import { mergeTheme, themeToVars } from './theme';
import { boxPalettes } from './boxPalette';
import { tokens } from './tokens';
const props = withDefaults(defineProps(), {
    applyReset: true,
});
const mergedTheme = computed(() => mergeTheme(goldTheme, props.theme));
function buildCSS() {
    const themeVarValues = themeToVars(mergedTheme.value);
    const printThemeVarValues = themeToVars(mergeTheme(goldTheme, printTheme));
    // ── :root — theme vars ──────────────────────────────────────
    const rootVars = Object.entries(themeVarValues)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n');
    const printVars = Object.entries(printThemeVarValues)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n');
    // ── Light palette on html/body ──────────────────────────────
    const lightPaletteVars = Object.entries(boxPalettes.light)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n');
    // ── Optional reset ──────────────────────────────────────────
    const resetCSS = props.applyReset
        ? `
body, html {
  margin: 0;
  padding: 0;
  background: var(--agds-background-body, #ffffff);
  font-family: ${tokens.font.body};
}
html {
  scrollbar-gutter: stable;
}`
        : '';
    return `
:root {
${rootVars}
}

@media print {
  :root {
${printVars}
  }
}

body, html {
${lightPaletteVars}
}
${resetCSS}
`.trim();
}
let styleEl = null;
onMounted(() => {
    styleEl = document.createElement('style');
    styleEl.setAttribute('data-agds-core', '');
    styleEl.textContent = buildCSS();
    document.head.appendChild(styleEl);
});
onBeforeUnmount(() => {
    styleEl?.remove();
    styleEl = null;
});
const __VLS_defaults = {
    applyReset: true,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = CoreProvider || CoreProvider;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    linkComponent: (__VLS_ctx.linkComponent),
}));
const __VLS_2 = __VLS_1({
    linkComponent: (__VLS_ctx.linkComponent),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
var __VLS_7 = {};
// @ts-ignore
[linkComponent,];
var __VLS_3;
// @ts-ignore
var __VLS_8 = __VLS_7;
// @ts-ignore
[];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};

import { defineComponent, useModel, ref, openBlock, createBlock, mergeProps, createSlots, withCtx, renderSlot, normalizeProps, guardReactiveProps, mergeModels, useAttrs, computed, resolveDynamicComponent, unref, h, provide, createTextVNode, createElementBlock, createVNode, toDisplayString, normalizeClass, createElementVNode, shallowRef, watch, createCommentVNode, Fragment, renderList, inject, getCurrentInstance, useSlots, normalizeStyle, reactive, nextTick, useTemplateRef, Teleport, Transition, withModifiers, withDirectives, vModelText, vShow, useId, createStaticVNode, resolveComponent, useCssVars } from 'vue';
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent, DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogClose, DialogTitle, TabsRoot, TabsList, TabsTrigger, TabsContent, ComboboxRoot, ComboboxAnchor, ComboboxInput, ComboboxTrigger, ComboboxPortal, ComboboxContent, ComboboxViewport, ComboboxEmpty, ComboboxItem, ComboboxItemIndicator, PopoverRoot, PopoverAnchor, PopoverPortal, PopoverContent } from 'reka-ui';

const ao = /* @__PURE__ */ Symbol("agds:core"), Ga = /* @__PURE__ */ defineComponent({
  __name: "CoreProvider",
  props: {
    linkComponent: {}
  },
  setup(e) {
    const t = e, n = defineComponent({
      name: "AgDSDefaultLink",
      inheritAttrs: false,
      props: {
        href: { type: String, default: void 0 }
      },
      setup(a, { attrs: o, slots: s }) {
        return () => h("a", { href: a.href, ...o }, s.default?.());
      }
    });
    return provide(ao, {
      linkComponent: t.linkComponent ?? n
    }), (a, o) => renderSlot(a.$slots, "default");
  }
}), fa = {
  lightForegroundText: "#313131",
  lightForegroundAction: "#00698f",
  lightForegroundFocus: "#9263de",
  lightForegroundMuted: "#626262",
  lightBackgroundBody: "#ffffff",
  lightBackgroundShade: "#f5f5f5",
  lightBackgroundBodyAlt: "#ebebeb",
  lightBackgroundShadeAlt: "#e0e0e0",
  lightSelected: "#00698f",
  lightSelectedMuted: "#f5f5f5",
  lightBorder: "#808080",
  lightBorderMuted: "#d3d3d3",
  lightAccent: "#00698f",
  lightOverlay: "rgba(0, 0, 0, 0.8)",
  lightOverlayMuted: "rgba(0, 0, 0, 0.3)",
  lightSystemError: "#d60000",
  lightSystemErrorMuted: "#fdf2f2",
  lightSystemSuccess: "#0b996c",
  lightSystemSuccessMuted: "#f3faf8",
  lightSystemWarning: "#f69900",
  lightSystemWarningMuted: "#fffaf2",
  lightSystemInfo: "#00bfe9",
  lightSystemInfoMuted: "#f2fcfe",
  darkForegroundText: "#ffffff",
  darkForegroundAction: "#61daff",
  darkForegroundFocus: "#c390f9",
  darkForegroundMuted: "#bdd2d7",
  darkBackgroundBody: "#135e70",
  darkBackgroundShade: "#104f5f",
  darkBackgroundBodyAlt: "#0d414d",
  darkBackgroundShadeAlt: "#0a323c",
  darkSelected: "#61daff",
  darkSelectedMuted: "#104f5f",
  darkBorder: "#95b7bf",
  darkBorderMuted: "#4d7680",
  darkAccent: "#61daff",
  darkOverlay: "rgba(0, 0, 0, 0.8)",
  darkOverlayMuted: "rgba(0, 0, 0, 0.3)",
  darkSystemError: "#d60000",
  darkSystemErrorMuted: "#422f47",
  darkSystemSuccess: "#0b996c",
  darkSystemSuccessMuted: "#133a4b",
  darkSystemWarning: "#f69900",
  darkSystemWarningMuted: "#393942",
  darkSystemInfo: "#00bfe9",
  darkSystemInfoMuted: "#193a5b"
}, no = {
  lightForegroundText: "#000000",
  lightForegroundAction: "#000000",
  lightForegroundFocus: "#000000",
  lightForegroundMuted: "#000000",
  lightBackgroundBody: "#ffffff",
  lightBackgroundShade: "#ffffff",
  lightBackgroundBodyAlt: "#ffffff",
  lightBackgroundShadeAlt: "#ffffff",
  lightBorder: "#000000",
  lightBorderMuted: "#000000",
  lightSelected: "#000000",
  lightSelectedMuted: "#ffffff",
  lightAccent: "#000000",
  lightOverlay: "#ffffff",
  lightOverlayMuted: "#ffffff",
  lightSystemError: "#000000",
  lightSystemSuccess: "#000000",
  lightSystemWarning: "#000000",
  lightSystemInfo: "#000000",
  lightSystemErrorMuted: "#ffffff",
  lightSystemSuccessMuted: "#ffffff",
  lightSystemWarningMuted: "#ffffff",
  lightSystemInfoMuted: "#ffffff",
  darkForegroundText: "#000000",
  darkForegroundAction: "#000000",
  darkForegroundFocus: "#000000",
  darkForegroundMuted: "#000000",
  darkBackgroundBody: "#ffffff",
  darkBackgroundShade: "#ffffff",
  darkBackgroundBodyAlt: "#ffffff",
  darkBackgroundShadeAlt: "#ffffff",
  darkBorder: "#000000",
  darkBorderMuted: "#000000",
  darkSelected: "#000000",
  darkSelectedMuted: "#ffffff",
  darkAccent: "#000000",
  darkOverlay: "#ffffff",
  darkOverlayMuted: "#ffffff",
  darkSystemError: "#000000",
  darkSystemErrorMuted: "#ffffff",
  darkSystemSuccess: "#000000",
  darkSystemSuccessMuted: "#ffffff",
  darkSystemWarningMuted: "#ffffff",
  darkSystemWarning: "#000000",
  darkSystemInfo: "#000000",
  darkSystemInfoMuted: "#ffffff"
}, J = {
  lightForegroundText: "--agds-theme-light-foreground-text",
  lightForegroundAction: "--agds-theme-light-foreground-action",
  lightForegroundFocus: "--agds-theme-light-foreground-focus",
  lightForegroundMuted: "--agds-theme-light-foreground-muted",
  lightBackgroundBody: "--agds-theme-light-background-body",
  lightBackgroundShade: "--agds-theme-light-background-shade",
  lightBackgroundBodyAlt: "--agds-theme-light-background-body-alt",
  lightBackgroundShadeAlt: "--agds-theme-light-background-shade-alt",
  lightBorder: "--agds-theme-light-border",
  lightBorderMuted: "--agds-theme-light-border-muted",
  lightSelected: "--agds-theme-light-selected",
  lightSelectedMuted: "--agds-theme-light-selected-muted",
  lightAccent: "--agds-theme-light-accent",
  lightOverlay: "--agds-theme-light-overlay",
  lightOverlayMuted: "--agds-theme-light-overlay-muted",
  lightSystemError: "--agds-theme-light-system-error",
  lightSystemErrorMuted: "--agds-theme-light-system-error-muted",
  lightSystemSuccess: "--agds-theme-light-system-success",
  lightSystemSuccessMuted: "--agds-theme-light-system-success-muted",
  lightSystemWarning: "--agds-theme-light-system-warning",
  lightSystemWarningMuted: "--agds-theme-light-system-warning-muted",
  lightSystemInfo: "--agds-theme-light-system-info",
  lightSystemInfoMuted: "--agds-theme-light-system-info-muted",
  darkForegroundText: "--agds-theme-dark-foreground-text",
  darkForegroundAction: "--agds-theme-dark-foreground-action",
  darkForegroundFocus: "--agds-theme-dark-foreground-focus",
  darkForegroundMuted: "--agds-theme-dark-foreground-muted",
  darkBackgroundBody: "--agds-theme-dark-background-body",
  darkBackgroundShade: "--agds-theme-dark-background-shade",
  darkBackgroundBodyAlt: "--agds-theme-dark-background-body-alt",
  darkBackgroundShadeAlt: "--agds-theme-dark-background-shade-alt",
  darkBorder: "--agds-theme-dark-border",
  darkBorderMuted: "--agds-theme-dark-border-muted",
  darkSelected: "--agds-theme-dark-selected",
  darkSelectedMuted: "--agds-theme-dark-selected-muted",
  darkAccent: "--agds-theme-dark-accent",
  darkOverlay: "--agds-theme-dark-overlay",
  darkOverlayMuted: "--agds-theme-dark-overlay-muted",
  darkSystemError: "--agds-theme-dark-system-error",
  darkSystemErrorMuted: "--agds-theme-dark-system-error-muted",
  darkSystemSuccess: "--agds-theme-dark-system-success",
  darkSystemSuccessMuted: "--agds-theme-dark-system-success-muted",
  darkSystemWarning: "--agds-theme-dark-system-warning",
  darkSystemWarningMuted: "--agds-theme-dark-system-warning-muted",
  darkSystemInfo: "--agds-theme-dark-system-info",
  darkSystemInfoMuted: "--agds-theme-dark-system-info-muted"
};
function ma(e, t) {
  return t ? { ...e, ...t } : e;
}
function va(e) {
  return Object.fromEntries(Object.keys(J).map((t) => [
    J[t],
    e[t]
  ]));
}
const E = {
  palette: "--agds-palette",
  foregroundText: "--agds-foreground-text",
  foregroundAction: "--agds-foreground-action",
  foregroundFocus: "--agds-foreground-focus",
  foregroundMuted: "--agds-foreground-muted",
  backgroundBody: "--agds-background-body",
  backgroundShade: "--agds-background-shade",
  backgroundBodyAlt: "--agds-background-body-alt",
  backgroundShadeAlt: "--agds-background-shade-alt",
  border: "--agds-border",
  borderMuted: "--agds-border-muted",
  selected: "--agds-selected",
  selectedMuted: "--agds-selected-muted",
  accent: "--agds-accent",
  overlay: "--agds-overlay",
  overlayMuted: "--agds-overlay-muted",
  systemSuccess: "--agds-system-success",
  systemSuccessMuted: "--agds-system-success-muted",
  systemWarning: "--agds-system-warning",
  systemWarningMuted: "--agds-system-warning-muted",
  systemInfo: "--agds-system-info",
  systemInfoMuted: "--agds-system-info-muted",
  systemError: "--agds-system-error",
  systemErrorMuted: "--agds-system-error-muted"
}, oo = {
  light: {
    [E.palette]: "light",
    [E.foregroundText]: `var(${J.lightForegroundText})`,
    [E.foregroundAction]: `var(${J.lightForegroundAction})`,
    [E.foregroundFocus]: `var(${J.lightForegroundFocus})`,
    [E.foregroundMuted]: `var(${J.lightForegroundMuted})`,
    [E.backgroundBody]: `var(${J.lightBackgroundBody})`,
    [E.backgroundShade]: `var(${J.lightBackgroundShade})`,
    [E.backgroundBodyAlt]: `var(${J.lightBackgroundBodyAlt})`,
    [E.backgroundShadeAlt]: `var(${J.lightBackgroundShadeAlt})`,
    [E.border]: `var(${J.lightBorder})`,
    [E.borderMuted]: `var(${J.lightBorderMuted})`,
    [E.selected]: `var(${J.lightSelected})`,
    [E.selectedMuted]: `var(${J.lightSelectedMuted})`,
    [E.accent]: `var(${J.lightAccent})`,
    [E.overlay]: `var(${J.lightOverlay})`,
    [E.overlayMuted]: `var(${J.lightOverlayMuted})`,
    [E.systemError]: `var(${J.lightSystemError})`,
    [E.systemErrorMuted]: `var(${J.lightSystemErrorMuted})`,
    [E.systemSuccess]: `var(${J.lightSystemSuccess})`,
    [E.systemSuccessMuted]: `var(${J.lightSystemSuccessMuted})`,
    [E.systemWarning]: `var(${J.lightSystemWarning})`,
    [E.systemWarningMuted]: `var(${J.lightSystemWarningMuted})`,
    [E.systemInfo]: `var(${J.lightSystemInfo})`,
    [E.systemInfoMuted]: `var(${J.lightSystemInfoMuted})`
  },
  dark: {
    [E.palette]: "dark",
    [E.foregroundText]: `var(${J.darkForegroundText})`,
    [E.foregroundAction]: `var(${J.darkForegroundAction})`,
    [E.foregroundFocus]: `var(${J.darkForegroundFocus})`,
    [E.foregroundMuted]: `var(${J.darkForegroundMuted})`,
    [E.backgroundBody]: `var(${J.darkBackgroundBody})`,
    [E.backgroundShade]: `var(${J.darkBackgroundShade})`,
    [E.backgroundBodyAlt]: `var(${J.darkBackgroundBodyAlt})`,
    [E.backgroundShadeAlt]: `var(${J.darkBackgroundShadeAlt})`,
    [E.border]: `var(${J.darkBorder})`,
    [E.borderMuted]: `var(${J.darkBorderMuted})`,
    [E.selected]: `var(${J.darkSelected})`,
    [E.selectedMuted]: `var(${J.darkSelectedMuted})`,
    [E.accent]: `var(${J.darkAccent})`,
    [E.overlay]: `var(${J.darkOverlay})`,
    [E.overlayMuted]: `var(${J.darkOverlayMuted})`,
    [E.systemError]: `var(${J.darkSystemError})`,
    [E.systemErrorMuted]: `var(${J.darkSystemErrorMuted})`,
    [E.systemSuccess]: `var(${J.darkSystemSuccess})`,
    [E.systemSuccessMuted]: `var(${J.darkSystemSuccessMuted})`,
    [E.systemWarning]: `var(${J.darkSystemWarning})`,
    [E.systemWarningMuted]: `var(${J.darkSystemWarningMuted})`,
    [E.systemInfo]: `var(${J.darkSystemInfo})`,
    [E.systemInfoMuted]: `var(${J.darkSystemInfoMuted})`
  }
}, so = {
  foregroundText: `var(${E.foregroundText})`,
  foregroundAction: `var(${E.foregroundAction})`,
  foregroundFocus: `var(${E.foregroundFocus})`,
  foregroundMuted: `var(${E.foregroundMuted})`,
  backgroundBody: `var(${E.backgroundBody})`,
  backgroundShade: `var(${E.backgroundShade})`,
  backgroundBodyAlt: `var(${E.backgroundBodyAlt})`,
  backgroundShadeAlt: `var(${E.backgroundShadeAlt})`,
  border: `var(${E.border})`,
  borderMuted: `var(${E.borderMuted})`,
  selected: `var(${E.selected})`,
  selectedMuted: `var(${E.selectedMuted})`,
  accent: `var(${E.accent})`,
  overlay: `var(${E.overlay})`,
  overlayMuted: `var(${E.overlayMuted})`,
  systemError: `var(${E.systemError})`,
  systemErrorMuted: `var(${E.systemErrorMuted})`,
  systemSuccess: `var(${E.systemSuccess})`,
  systemSuccessMuted: `var(${E.systemSuccessMuted})`,
  systemWarning: `var(${E.systemWarning})`,
  systemWarningMuted: `var(${E.systemWarningMuted})`,
  systemInfo: `var(${E.systemInfo})`,
  systemInfoMuted: `var(${E.systemInfoMuted})`
};
function db(e) {
  const t = ref();
  return t;
}
const lo = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600
}, io = {
  min: {
    xs: "@media(min-width: 0px)",
    sm: "@media(min-width: 576px)",
    md: "@media(min-width: 768px)",
    lg: "@media(min-width: 992px)",
    xl: "@media(min-width: 1200px)",
    xxl: "@media(min-width: 1600px)"
  },
  max: {
    xs: "@media(max-width: 575px)",
    sm: "@media(max-width: 767px)",
    md: "@media(max-width: 991px)",
    lg: "@media(max-width: 1199px)",
    xl: "@media(max-width: 1599px)"
  }
}, ro = 16, za = 4, uo = {
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
  monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
}, co = {
  xs: {
    xs: 0.875,
    sm: 1,
    md: 1.25,
    lg: 1.5,
    xl: 1.75,
    xxl: 2,
    xxxl: 2.5
  },
  sm: {
    xs: 0.875,
    sm: 1,
    md: 1.25,
    lg: 1.5,
    xl: 2,
    xxl: 2.5,
    xxxl: 3
  }
}, go = {
  normal: "normal",
  bold: "bold"
}, fo = {
  nospace: 1,
  heading: 1.25,
  default: 1.5
};
function ct(e) {
  return `${e}rem`;
}
const mo = { xs: 0.75, md: 2 }, vo = {
  bodyText: "42em",
  container: "80rem",
  // 1280 px
  containerLg: "120rem",
  // 1920 px
  field: {
    xs: "5rem",
    // 80 px
    sm: "8rem",
    // 128 px
    md: "13rem",
    // 208 px
    lg: "18rem",
    // 288 px
    xl: "24rem"
    // 384 px
  }
}, po = za, ho = {
  none: 0,
  sm: 1,
  md: 2,
  lg: 3,
  xl: 4,
  xxl: 8
}, bo = {
  duration: 250,
  // in milliseconds (ms)
  timingFunction: "ease"
}, _o = {
  base: 0,
  elevated: 1,
  overlay: 100,
  dialog: 110,
  popover: 200,
  skipLink: 999
}, yo = {
  /** Used to slightly elevate interactive elements like cards */
  sm: "0px 2px 4px rgba(0, 0, 0, 0.15)",
  /** Used to further elevate interactive elements on hover */
  md: "0px 4px 16px rgba(0, 0, 0, 0.15)",
  /** Used for elements that float above the page like dropdowns and modals. */
  lg: "0px 16px 32px rgba(0, 0, 0, 0.20)"
}, qe = {
  breakpoint: lo,
  mediaQuery: io,
  rem: ro,
  unit: za,
  font: uo,
  fontSize: co,
  fontWeight: go,
  lineHeight: fo,
  containerPadding: mo,
  maxWidth: vo,
  borderRadius: po,
  borderWidth: ho,
  transition: bo,
  zIndex: _o,
  shadow: yo
}, ko = /* @__PURE__ */ defineComponent({
  __name: "AusGovCore",
  props: {
    applyReset: { type: Boolean, default: true },
    theme: {},
    linkComponent: {}
  },
  setup(e) {
    const t = e;
    computed(() => ma(fa, t.theme));
    return (s, r) => (openBlock(), createBlock(Ga, { "link-component": e.linkComponent }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 8, ["link-component"]));
  }
});
function pa(e, t) {
  return {
    fontSize: `${qe.fontSize.xs[e]}rem`,
    lineHeight: qe.lineHeight[t]
  };
}
const So = {
  sm: {
    width: ct(1.5),
    height: ct(1.5),
    borderWidth: `${qe.borderWidth.lg}px`
  },
  md: {
    width: ct(2),
    height: ct(2),
    borderWidth: `${qe.borderWidth.lg}px`
  }
}, $o = {
  sm: {
    ...pa("sm", "default"),
    height: "2rem"
    // 32 px
  },
  md: {
    ...pa("sm", "default"),
    height: "3rem"
    // 48 px
  }
}, xo = {
  outlineWidth: "3px",
  outlineStyle: "solid",
  outlineColor: so.foregroundFocus,
  outlineOffset: `${0.5 * qe.unit}px`
}, wo = {
  textDecoration: "underline",
  textDecorationSkipInk: "auto"
}, Ao = {
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
}, Do = {
  /** Hides element in print. */
  hidden: { display: "none !important" },
  /** Shows element in print. */
  visible: { display: "block !important", height: "auto !important" },
  /** Forces background colours to render in print (e.g. white text on dark bg). */
  exactColor: {
    WebkitPrintColorAdjust: "exact",
    printColorAdjust: "exact"
  }
}, ub = {
  control: So,
  input: $o,
  outline: xo,
  underline: wo,
  truncate: Ao,
  print: Do
}, Co = Object.keys(qe.breakpoint);
function cb(e, t = (n) => n) {
  if (Ot(e)) {
    if (Array.isArray(e))
      return e.map((n) => Ot(n) ? t(n) : null);
    if (typeof e == "object") {
      const n = e;
      return Co.map((a) => {
        const o = a in n ? n[a] : void 0;
        return Ot(o) ? t(o) : null;
      });
    }
    return [t(e)];
  }
}
function Ot(e) {
  return e != null;
}
function gb(e) {
  return qe.mediaQuery.min[e];
}
const Ha = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSBox",
  props: {
    as: {},
    display: {},
    flexDirection: {},
    flexWrap: {},
    flexGrow: {},
    flexShrink: {},
    alignItems: {},
    alignSelf: {},
    justifyContent: {},
    justifySelf: {},
    gap: {},
    columnGap: {},
    rowGap: {},
    padding: {},
    paddingTop: {},
    paddingRight: {},
    paddingBottom: {},
    paddingLeft: {},
    paddingX: {},
    paddingY: {},
    width: {},
    height: {},
    minWidth: {},
    maxWidth: {},
    minHeight: {},
    maxHeight: {}
  },
  setup(e) {
    const t = e, n = useAttrs();
    function a(s) {
      if (s !== void 0)
        return typeof s == "number" ? `var(--agds-space-${s})` : s;
    }
    const o = computed(() => {
      const s = a(t.paddingTop) ?? a(t.paddingY), r = a(t.paddingBottom) ?? a(t.paddingY), u = a(t.paddingLeft) ?? a(t.paddingX), g = a(t.paddingRight) ?? a(t.paddingX), c = {
        display: t.display,
        flexDirection: t.flexDirection,
        flexWrap: t.flexWrap,
        flexGrow: t.flexGrow,
        flexShrink: t.flexShrink,
        alignItems: t.alignItems,
        alignSelf: t.alignSelf,
        justifyContent: t.justifyContent,
        justifySelf: t.justifySelf,
        gap: a(t.gap),
        columnGap: a(t.columnGap),
        rowGap: a(t.rowGap),
        // If the shorthand `padding` prop is set it wins over all individual sides
        padding: a(t.padding),
        paddingTop: t.padding !== void 0 ? void 0 : s,
        paddingRight: t.padding !== void 0 ? void 0 : g,
        paddingBottom: t.padding !== void 0 ? void 0 : r,
        paddingLeft: t.padding !== void 0 ? void 0 : u,
        width: t.width,
        height: t.height,
        minWidth: t.minWidth,
        maxWidth: t.maxWidth,
        minHeight: t.minHeight,
        maxHeight: t.maxHeight
      };
      return Object.fromEntries(Object.entries(c).filter(([, f]) => f !== void 0));
    });
    return (s, r) => (openBlock(), createBlock(resolveDynamicComponent(t.as ?? "div"), mergeProps(unref(n), { style: o.value }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"]));
  }
}), at = /* @__PURE__ */ defineComponent({
  __name: "AGDSFlex",
  props: {
    inline: { type: Boolean, default: false },
    as: {},
    display: {},
    flexDirection: { default: "row" },
    flexWrap: {},
    flexGrow: {},
    flexShrink: {},
    alignItems: { default: "stretch" },
    alignSelf: {},
    justifyContent: { default: "flex-start" },
    justifySelf: {},
    gap: {},
    columnGap: {},
    rowGap: {},
    padding: {},
    paddingTop: {},
    paddingRight: {},
    paddingBottom: {},
    paddingLeft: {},
    paddingX: {},
    paddingY: {},
    width: {},
    height: {},
    minWidth: {},
    maxWidth: {},
    minHeight: {},
    maxHeight: {}
  },
  setup(e) {
    const t = e, n = computed(() => {
      const { inline: a, display: o, ...s } = t;
      return {
        ...s,
        display: o ?? (a ? "inline-flex" : "flex")
      };
    });
    return (a, o) => (openBlock(), createBlock(Ha, normalizeProps(guardReactiveProps(n.value)), {
      default: withCtx(() => [
        renderSlot(a.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Io = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSColumns",
  props: {
    as: {},
    cols: { default: 12 },
    gap: {},
    columnGap: {},
    rowGap: {},
    alignItems: {}
  },
  setup(e) {
    const t = e, n = useAttrs();
    function a(s) {
      if (s !== void 0)
        return typeof s == "number" ? `var(--agds-space-${s})` : s;
    }
    const o = computed(() => {
      const s = {
        display: "grid",
        gridTemplateColumns: `repeat(${t.cols}, 1fr)`,
        gap: a(t.gap),
        columnGap: a(t.columnGap),
        rowGap: a(t.rowGap),
        alignItems: t.alignItems
      };
      return Object.fromEntries(Object.entries(s).filter(([, r]) => r !== void 0));
    });
    return (s, r) => (openBlock(), createBlock(resolveDynamicComponent(t.as ?? "div"), mergeProps(unref(n), { style: o.value }), {
      default: withCtx(() => [
        renderSlot(s.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"]));
  }
}), Mo = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSColumn",
  props: {
    as: {},
    span: {},
    start: {},
    end: {},
    alignSelf: {},
    justifySelf: {}
  },
  setup(e) {
    const t = e, n = useAttrs(), a = computed(() => {
      const o = {
        gridColumn: t.span !== void 0 ? `span ${t.span} / span ${t.span}` : void 0,
        gridColumnStart: t.start !== void 0 ? String(t.start) : void 0,
        gridColumnEnd: t.end !== void 0 ? String(t.end) : void 0,
        alignSelf: t.alignSelf,
        justifySelf: t.justifySelf
      };
      return Object.fromEntries(Object.entries(o).filter(([, s]) => s !== void 0));
    });
    return (o, s) => (openBlock(), createBlock(resolveDynamicComponent(t.as ?? "div"), mergeProps(unref(n), { style: a.value }), {
      default: withCtx(() => [
        renderSlot(o.$slots, "default")
      ]),
      _: 3
    }, 16, ["style"]));
  }
}), Na = /* @__PURE__ */ defineComponent({
  __name: "AGDSFormStack",
  props: {
    as: { default: "div" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createBlock(at, {
      as: e.as,
      "flex-direction": "column",
      gap: 2
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 8, ["as"]));
  }
}), pt = /* @__PURE__ */ defineComponent({
  __name: "AGDSStack",
  props: {
    as: {},
    display: {},
    flexWrap: {},
    flexGrow: {},
    flexShrink: {},
    alignItems: { default: "stretch" },
    alignSelf: {},
    justifyContent: { default: "flex-start" },
    justifySelf: {},
    gap: {},
    columnGap: {},
    rowGap: {},
    padding: {},
    paddingTop: {},
    paddingRight: {},
    paddingBottom: {},
    paddingLeft: {},
    paddingX: {},
    paddingY: {},
    width: {},
    height: {},
    minWidth: {},
    maxWidth: {},
    minHeight: {},
    maxHeight: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(at, mergeProps(t, { "flex-direction": "column" }), {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ja = /^[a-z0-9]+(-[a-z0-9]+)*$/, It = (e, t, n, a = "") => {
  const o = e.split(":");
  if (e.slice(0, 1) === "@") {
    if (o.length < 2 || o.length > 3)
      return null;
    a = o.shift().slice(1);
  }
  if (o.length > 3 || !o.length)
    return null;
  if (o.length > 1) {
    const u = o.pop(), g = o.pop(), c = {
      // Allow provider without '@': "provider:prefix:name"
      provider: o.length > 0 ? o[0] : a,
      prefix: g,
      name: u
    };
    return t && !gt(c) ? null : c;
  }
  const s = o[0], r = s.split("-");
  if (r.length > 1) {
    const u = {
      provider: a,
      prefix: r.shift(),
      name: r.join("-")
    };
    return t && !gt(u) ? null : u;
  }
  if (n && a === "") {
    const u = {
      provider: a,
      prefix: "",
      name: s
    };
    return t && !gt(u, n) ? null : u;
  }
  return null;
}, gt = (e, t) => e ? !!// Check prefix: cannot be empty, unless allowSimpleName is enabled
// Check name: cannot be empty
((t && e.prefix === "" || e.prefix) && e.name) : false, Wa = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
), ht = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
}), Mt = Object.freeze({
  ...Wa,
  ...ht
}), zt = Object.freeze({
  ...Mt,
  body: "",
  hidden: false
});
function Bo(e, t) {
  const n = {};
  !e.hFlip != !t.hFlip && (n.hFlip = true), !e.vFlip != !t.vFlip && (n.vFlip = true);
  const a = ((e.rotate || 0) + (t.rotate || 0)) % 4;
  return a && (n.rotate = a), n;
}
function ha(e, t) {
  const n = Bo(e, t);
  for (const a in zt)
    a in ht ? a in e && !(a in n) && (n[a] = ht[a]) : a in t ? n[a] = t[a] : a in e && (n[a] = e[a]);
  return n;
}
function Lo(e, t) {
  const n = e.icons, a = e.aliases || /* @__PURE__ */ Object.create(null), o = /* @__PURE__ */ Object.create(null);
  function s(r) {
    if (n[r])
      return o[r] = [];
    if (!(r in o)) {
      o[r] = null;
      const u = a[r] && a[r].parent, g = u && s(u);
      g && (o[r] = [u].concat(g));
    }
    return o[r];
  }
  return Object.keys(n).concat(Object.keys(a)).forEach(s), o;
}
function To(e, t, n) {
  const a = e.icons, o = e.aliases || /* @__PURE__ */ Object.create(null);
  let s = {};
  function r(u) {
    s = ha(
      a[u] || o[u],
      s
    );
  }
  return r(t), n.forEach(r), ha(e, s);
}
function Ua(e, t) {
  const n = [];
  if (typeof e != "object" || typeof e.icons != "object")
    return n;
  e.not_found instanceof Array && e.not_found.forEach((o) => {
    t(o, null), n.push(o);
  });
  const a = Lo(e);
  for (const o in a) {
    const s = a[o];
    s && (t(o, To(e, o, s)), n.push(o));
  }
  return n;
}
const Fo = {
  provider: "",
  aliases: {},
  not_found: {},
  ...Wa
};
function Vt(e, t) {
  for (const n in t)
    if (n in e && typeof e[n] != typeof t[n])
      return false;
  return true;
}
function Za(e) {
  if (typeof e != "object" || e === null)
    return null;
  const t = e;
  if (typeof t.prefix != "string" || !e.icons || typeof e.icons != "object" || !Vt(e, Fo))
    return null;
  const n = t.icons;
  for (const o in n) {
    const s = n[o];
    if (
      // Name cannot be empty
      !o || // Must have body
      typeof s.body != "string" || // Check other props
      !Vt(
        s,
        zt
      )
    )
      return null;
  }
  const a = t.aliases || /* @__PURE__ */ Object.create(null);
  for (const o in a) {
    const s = a[o], r = s.parent;
    if (
      // Name cannot be empty
      !o || // Parent must be set and point to existing icon
      typeof r != "string" || !n[r] && !a[r] || // Check other props
      !Vt(
        s,
        zt
      )
    )
      return null;
  }
  return t;
}
const ba = /* @__PURE__ */ Object.create(null);
function Po(e, t) {
  return {
    provider: e,
    prefix: t,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function Qe(e, t) {
  const n = ba[e] || (ba[e] = /* @__PURE__ */ Object.create(null));
  return n[t] || (n[t] = Po(e, t));
}
function Ka(e, t) {
  return Za(t) ? Ua(t, (n, a) => {
    a ? e.icons[n] = a : e.missing.add(n);
  }) : [];
}
let it = false;
function Ya(e) {
  return typeof e == "boolean" && (it = e), it;
}
function Vo(e) {
  const t = typeof e == "string" ? It(e, true, it) : e;
  if (t) {
    const n = Qe(t.provider, t.prefix), a = t.name;
    return n.icons[a] || (n.missing.has(a) ? null : void 0);
  }
}
const Xa = Object.freeze({
  width: null,
  height: null
}), Qa = Object.freeze({
  // Dimensions
  ...Xa,
  // Transformations
  ...ht
}), Go = /(-?[0-9.]*[0-9]+[0-9.]*)/g, qo = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function _a(e, t, n) {
  if (t === 1)
    return e;
  if (n = n || 100, typeof e == "number")
    return Math.ceil(e * t * n) / n;
  if (typeof e != "string")
    return e;
  const a = e.split(Go);
  if (a === null || !a.length)
    return e;
  const o = [];
  let s = a.shift(), r = qo.test(s);
  for (; ; ) {
    if (r) {
      const u = parseFloat(s);
      isNaN(u) ? o.push(s) : o.push(Math.ceil(u * t * n) / n);
    } else
      o.push(s);
    if (s = a.shift(), s === void 0)
      return o.join("");
    r = !r;
  }
}
function zo(e, t = "defs") {
  let n = "";
  const a = e.indexOf("<" + t);
  for (; a >= 0; ) {
    const o = e.indexOf(">", a), s = e.indexOf("</" + t);
    if (o === -1 || s === -1)
      break;
    const r = e.indexOf(">", s);
    if (r === -1)
      break;
    n += e.slice(o + 1, s).trim(), e = e.slice(0, a).trim() + e.slice(r + 1);
  }
  return {
    defs: n,
    content: e
  };
}
function Ho(e, t) {
  return e ? "<defs>" + e + "</defs>" + t : t;
}
function No(e, t, n) {
  const a = zo(e);
  return Ho(a.defs, t + a.content + n);
}
const jo = (e) => e === "unset" || e === "undefined" || e === "none";
function Wo(e, t) {
  const n = {
    ...Mt,
    ...e
  }, a = {
    ...Qa,
    ...t
  }, o = {
    left: n.left,
    top: n.top,
    width: n.width,
    height: n.height
  };
  let s = n.body;
  [n, a].forEach((D) => {
    const _ = [], B = D.hFlip, I = D.vFlip;
    let P = D.rotate;
    B ? I ? P += 2 : (_.push(
      "translate(" + (o.width + o.left).toString() + " " + (0 - o.top).toString() + ")"
    ), _.push("scale(-1 1)"), o.top = o.left = 0) : I && (_.push(
      "translate(" + (0 - o.left).toString() + " " + (o.height + o.top).toString() + ")"
    ), _.push("scale(1 -1)"), o.top = o.left = 0);
    let H;
    switch (P < 0 && (P -= Math.floor(P / 4) * 4), P = P % 4, P) {
      case 1:
        H = o.height / 2 + o.top, _.unshift(
          "rotate(90 " + H.toString() + " " + H.toString() + ")"
        );
        break;
      case 2:
        _.unshift(
          "rotate(180 " + (o.width / 2 + o.left).toString() + " " + (o.height / 2 + o.top).toString() + ")"
        );
        break;
      case 3:
        H = o.width / 2 + o.left, _.unshift(
          "rotate(-90 " + H.toString() + " " + H.toString() + ")"
        );
        break;
    }
    P % 2 === 1 && (o.left !== o.top && (H = o.left, o.left = o.top, o.top = H), o.width !== o.height && (H = o.width, o.width = o.height, o.height = H)), _.length && (s = No(
      s,
      '<g transform="' + _.join(" ") + '">',
      "</g>"
    ));
  });
  const r = a.width, u = a.height, g = o.width, c = o.height;
  let f, m;
  r === null ? (m = u === null ? "1em" : u === "auto" ? c : u, f = _a(m, g / c)) : (f = r === "auto" ? g : r, m = u === null ? _a(f, c / g) : u === "auto" ? c : u);
  const p = {}, x = (D, _) => {
    jo(_) || (p[D] = _.toString());
  };
  x("width", f), x("height", m);
  const h2 = [o.left, o.top, g, c];
  return p.viewBox = h2.join(" "), {
    attributes: p,
    viewBox: h2,
    body: s
  };
}
const Uo = /\sid="(\S+)"/g, Zo = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
let Ko = 0;
function Yo(e, t = Zo) {
  const n = [];
  let a;
  for (; a = Uo.exec(e); )
    n.push(a[1]);
  if (!n.length)
    return e;
  const o = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  return n.forEach((s) => {
    const r = typeof t == "function" ? t(s) : t + (Ko++).toString(), u = s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    e = e.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + u + ')([")]|\\.[a-z])', "g"),
      "$1" + r + o + "$3"
    );
  }), e = e.replace(new RegExp(o, "g"), ""), e;
}
const Ht = /* @__PURE__ */ Object.create(null);
function Xo(e, t) {
  Ht[e] = t;
}
function Nt(e) {
  return Ht[e] || Ht[""];
}
function ta(e) {
  let t;
  if (typeof e.resources == "string")
    t = [e.resources];
  else if (t = e.resources, !(t instanceof Array) || !t.length)
    return null;
  return {
    // API hosts
    resources: t,
    // Root path
    path: e.path || "/",
    // URL length limit
    maxURL: e.maxURL || 500,
    // Timeout before next host is used.
    rotate: e.rotate || 750,
    // Timeout before failing query.
    timeout: e.timeout || 5e3,
    // Randomise default API end point.
    random: e.random === true,
    // Start index
    index: e.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: e.dataAfterTimeout !== false
  };
}
const aa = /* @__PURE__ */ Object.create(null), ot = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
], ft = [];
for (; ot.length > 0; )
  ot.length === 1 || Math.random() > 0.5 ? ft.push(ot.shift()) : ft.push(ot.pop());
aa[""] = ta({
  resources: ["https://api.iconify.design"].concat(ft)
});
function na(e) {
  return aa[e];
}
const Jo = () => {
  let e;
  try {
    if (e = fetch, typeof e == "function")
      return e;
  } catch {
  }
};
let ya = Jo();
function es(e, t) {
  const n = na(e);
  if (!n)
    return 0;
  let a;
  if (!n.maxURL)
    a = 0;
  else {
    let o = 0;
    n.resources.forEach((r) => {
      o = Math.max(o, r.length);
    });
    const s = t + ".json?icons=";
    a = n.maxURL - o - n.path.length - s.length;
  }
  return a;
}
function ts(e) {
  return e === 404;
}
const as = (e, t, n) => {
  const a = [], o = es(e, t), s = "icons";
  let r = {
    type: s,
    provider: e,
    prefix: t,
    icons: []
  }, u = 0;
  return n.forEach((g, c) => {
    u += g.length + 1, u >= o && c > 0 && (a.push(r), r = {
      type: s,
      provider: e,
      prefix: t,
      icons: []
    }, u = g.length), r.icons.push(g);
  }), a.push(r), a;
};
function ns(e) {
  if (typeof e == "string") {
    const t = na(e);
    if (t)
      return t.path;
  }
  return "/";
}
const os = (e, t, n) => {
  if (!ya) {
    n("abort", 424);
    return;
  }
  let a = ns(t.provider);
  switch (t.type) {
    case "icons": {
      const s = t.prefix, u = t.icons.join(","), g = new URLSearchParams({
        icons: u
      });
      a += s + ".json?" + g.toString();
      break;
    }
    case "custom": {
      const s = t.uri;
      a += s.slice(0, 1) === "/" ? s.slice(1) : s;
      break;
    }
    default:
      n("abort", 400);
      return;
  }
  let o = 503;
  ya(e + a).then((s) => {
    const r = s.status;
    if (r !== 200) {
      setTimeout(() => {
        n(ts(r) ? "abort" : "next", r);
      });
      return;
    }
    return o = 501, s.json();
  }).then((s) => {
    if (typeof s != "object" || s === null) {
      setTimeout(() => {
        s === 404 ? n("abort", s) : n("next", o);
      });
      return;
    }
    setTimeout(() => {
      n("success", s);
    });
  }).catch(() => {
    n("next", o);
  });
}, ss = {
  prepare: as,
  send: os
};
function ls(e) {
  const t = {
    loaded: [],
    missing: [],
    pending: []
  }, n = /* @__PURE__ */ Object.create(null);
  e.sort((o, s) => o.provider !== s.provider ? o.provider.localeCompare(s.provider) : o.prefix !== s.prefix ? o.prefix.localeCompare(s.prefix) : o.name.localeCompare(s.name));
  let a = {
    provider: "",
    prefix: "",
    name: ""
  };
  return e.forEach((o) => {
    if (a.name === o.name && a.prefix === o.prefix && a.provider === o.provider)
      return;
    a = o;
    const s = o.provider, r = o.prefix, u = o.name, g = n[s] || (n[s] = /* @__PURE__ */ Object.create(null)), c = g[r] || (g[r] = Qe(s, r));
    let f;
    u in c.icons ? f = t.loaded : r === "" || c.missing.has(u) ? f = t.missing : f = t.pending;
    const m = {
      provider: s,
      prefix: r,
      name: u
    };
    f.push(m);
  }), t;
}
function Ja(e, t) {
  e.forEach((n) => {
    const a = n.loaderCallbacks;
    a && (n.loaderCallbacks = a.filter((o) => o.id !== t));
  });
}
function is(e) {
  e.pendingCallbacksFlag || (e.pendingCallbacksFlag = true, setTimeout(() => {
    e.pendingCallbacksFlag = false;
    const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : [];
    if (!t.length)
      return;
    let n = false;
    const a = e.provider, o = e.prefix;
    t.forEach((s) => {
      const r = s.icons, u = r.pending.length;
      r.pending = r.pending.filter((g) => {
        if (g.prefix !== o)
          return true;
        const c = g.name;
        if (e.icons[c])
          r.loaded.push({
            provider: a,
            prefix: o,
            name: c
          });
        else if (e.missing.has(c))
          r.missing.push({
            provider: a,
            prefix: o,
            name: c
          });
        else
          return n = true, true;
        return false;
      }), r.pending.length !== u && (n || Ja([e], s.id), s.callback(
        r.loaded.slice(0),
        r.missing.slice(0),
        r.pending.slice(0),
        s.abort
      ));
    });
  }));
}
let rs = 0;
function ds(e, t, n) {
  const a = rs++, o = Ja.bind(null, n, a);
  if (!t.pending.length)
    return o;
  const s = {
    id: a,
    icons: t,
    callback: e,
    abort: o
  };
  return n.forEach((r) => {
    (r.loaderCallbacks || (r.loaderCallbacks = [])).push(s);
  }), o;
}
function us(e, t = true, n = false) {
  const a = [];
  return e.forEach((o) => {
    const s = typeof o == "string" ? It(o, t, n) : o;
    s && a.push(s);
  }), a;
}
var cs = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function gs(e, t, n, a) {
  const o = e.resources.length, s = e.random ? Math.floor(Math.random() * o) : e.index;
  let r;
  if (e.random) {
    let U = e.resources.slice(0);
    for (r = []; U.length > 1; ) {
      const se = Math.floor(Math.random() * U.length);
      r.push(U[se]), U = U.slice(0, se).concat(U.slice(se + 1));
    }
    r = r.concat(U);
  } else
    r = e.resources.slice(s).concat(e.resources.slice(0, s));
  const u = Date.now();
  let g = "pending", c = 0, f, m = null, p = [], x = [];
  typeof a == "function" && x.push(a);
  function h2() {
    m && (clearTimeout(m), m = null);
  }
  function D() {
    g === "pending" && (g = "aborted"), h2(), p.forEach((U) => {
      U.status === "pending" && (U.status = "aborted");
    }), p = [];
  }
  function _(U, se) {
    se && (x = []), typeof U == "function" && x.push(U);
  }
  function B() {
    return {
      startTime: u,
      payload: t,
      status: g,
      queriesSent: c,
      queriesPending: p.length,
      subscribe: _,
      abort: D
    };
  }
  function I() {
    g = "failed", x.forEach((U) => {
      U(void 0, f);
    });
  }
  function P() {
    p.forEach((U) => {
      U.status === "pending" && (U.status = "aborted");
    }), p = [];
  }
  function H(U, se, O) {
    const V = se !== "success";
    switch (p = p.filter((N) => N !== U), g) {
      case "pending":
        break;
      case "failed":
        if (V || !e.dataAfterTimeout)
          return;
        break;
      default:
        return;
    }
    if (se === "abort") {
      f = O, I();
      return;
    }
    if (V) {
      f = O, p.length || (r.length ? Y() : I());
      return;
    }
    if (h2(), P(), !e.random) {
      const N = e.resources.indexOf(U.resource);
      N !== -1 && N !== e.index && (e.index = N);
    }
    g = "completed", x.forEach((N) => {
      N(O);
    });
  }
  function Y() {
    if (g !== "pending")
      return;
    h2();
    const U = r.shift();
    if (U === void 0) {
      if (p.length) {
        m = setTimeout(() => {
          h2(), g === "pending" && (P(), I());
        }, e.timeout);
        return;
      }
      I();
      return;
    }
    const se = {
      status: "pending",
      resource: U,
      callback: (O, V) => {
        H(se, O, V);
      }
    };
    p.push(se), c++, m = setTimeout(Y, e.rotate), n(U, t, se.callback);
  }
  return setTimeout(Y), B;
}
function en(e) {
  const t = {
    ...cs,
    ...e
  };
  let n = [];
  function a() {
    n = n.filter((u) => u().status === "pending");
  }
  function o(u, g, c) {
    const f = gs(
      t,
      u,
      g,
      (m, p) => {
        a(), c && c(m, p);
      }
    );
    return n.push(f), f;
  }
  function s(u) {
    return n.find((g) => u(g)) || null;
  }
  return {
    query: o,
    find: s,
    setIndex: (u) => {
      t.index = u;
    },
    getIndex: () => t.index,
    cleanup: a
  };
}
function ka() {
}
const Rt = /* @__PURE__ */ Object.create(null);
function fs(e) {
  if (!Rt[e]) {
    const t = na(e);
    if (!t)
      return;
    const n = en(t), a = {
      config: t,
      redundancy: n
    };
    Rt[e] = a;
  }
  return Rt[e];
}
function ms(e, t, n) {
  let a, o;
  if (typeof e == "string") {
    const s = Nt(e);
    if (!s)
      return n(void 0, 424), ka;
    o = s.send;
    const r = fs(e);
    r && (a = r.redundancy);
  } else {
    const s = ta(e);
    if (s) {
      a = en(s);
      const r = e.resources ? e.resources[0] : "", u = Nt(r);
      u && (o = u.send);
    }
  }
  return !a || !o ? (n(void 0, 424), ka) : a.query(t, o, n)().abort;
}
function Sa() {
}
function vs(e) {
  e.iconsLoaderFlag || (e.iconsLoaderFlag = true, setTimeout(() => {
    e.iconsLoaderFlag = false, is(e);
  }));
}
function ps(e) {
  const t = [], n = [];
  return e.forEach((a) => {
    (a.match(ja) ? t : n).push(a);
  }), {
    valid: t,
    invalid: n
  };
}
function st(e, t, n) {
  function a() {
    const o = e.pendingIcons;
    t.forEach((s) => {
      o && o.delete(s), e.icons[s] || e.missing.add(s);
    });
  }
  if (n && typeof n == "object")
    try {
      if (!Ka(e, n).length) {
        a();
        return;
      }
    } catch (o) {
      console.error(o);
    }
  a(), vs(e);
}
function $a(e, t) {
  e instanceof Promise ? e.then((n) => {
    t(n);
  }).catch(() => {
    t(null);
  }) : t(e);
}
function hs(e, t) {
  e.iconsToLoad ? e.iconsToLoad = e.iconsToLoad.concat(t).sort() : e.iconsToLoad = t, e.iconsQueueFlag || (e.iconsQueueFlag = true, setTimeout(() => {
    e.iconsQueueFlag = false;
    const { provider: n, prefix: a } = e, o = e.iconsToLoad;
    if (delete e.iconsToLoad, !o || !o.length)
      return;
    const s = e.loadIcon;
    if (e.loadIcons && (o.length > 1 || !s)) {
      $a(
        e.loadIcons(o, a, n),
        (f) => {
          st(e, o, f);
        }
      );
      return;
    }
    if (s) {
      o.forEach((f) => {
        const m = s(f, a, n);
        $a(m, (p) => {
          const x = p ? {
            prefix: a,
            icons: {
              [f]: p
            }
          } : null;
          st(e, [f], x);
        });
      });
      return;
    }
    const { valid: r, invalid: u } = ps(o);
    if (u.length && st(e, u, null), !r.length)
      return;
    const g = a.match(ja) ? Nt(n) : null;
    if (!g) {
      st(e, r, null);
      return;
    }
    g.prepare(n, a, r).forEach((f) => {
      ms(n, f, (m) => {
        st(e, f.icons, m);
      });
    });
  }));
}
const bs = (e, t) => {
  const n = us(e, true, Ya()), a = ls(n);
  if (!a.pending.length) {
    let g = true;
    return t && setTimeout(() => {
      g && t(
        a.loaded,
        a.missing,
        a.pending,
        Sa
      );
    }), () => {
      g = false;
    };
  }
  const o = /* @__PURE__ */ Object.create(null), s = [];
  let r, u;
  return a.pending.forEach((g) => {
    const { provider: c, prefix: f } = g;
    if (f === u && c === r)
      return;
    r = c, u = f, s.push(Qe(c, f));
    const m = o[c] || (o[c] = /* @__PURE__ */ Object.create(null));
    m[f] || (m[f] = []);
  }), a.pending.forEach((g) => {
    const { provider: c, prefix: f, name: m } = g, p = Qe(c, f), x = p.pendingIcons || (p.pendingIcons = /* @__PURE__ */ new Set());
    x.has(m) || (x.add(m), o[c][f].push(m));
  }), s.forEach((g) => {
    const c = o[g.provider][g.prefix];
    c.length && hs(g, c);
  }), t ? ds(t, a, s) : Sa;
};
function _s(e, t) {
  const n = {
    ...e
  };
  for (const a in t) {
    const o = t[a], s = typeof o;
    a in Xa ? (o === null || o && (s === "string" || s === "number")) && (n[a] = o) : s === typeof n[a] && (n[a] = a === "rotate" ? o % 4 : o);
  }
  return n;
}
const ys = /[\s,]+/;
function ks(e, t) {
  t.split(ys).forEach((n) => {
    switch (n.trim()) {
      case "horizontal":
        e.hFlip = true;
        break;
      case "vertical":
        e.vFlip = true;
        break;
    }
  });
}
function Ss(e, t = 0) {
  const n = e.replace(/^-?[0-9.]*/, "");
  function a(o) {
    for (; o < 0; )
      o += 4;
    return o % 4;
  }
  if (n === "") {
    const o = parseInt(e);
    return isNaN(o) ? 0 : a(o);
  } else if (n !== e) {
    let o = 0;
    switch (n) {
      case "%":
        o = 25;
        break;
      case "deg":
        o = 90;
    }
    if (o) {
      let s = parseFloat(e.slice(0, e.length - n.length));
      return isNaN(s) ? 0 : (s = s / o, s % 1 === 0 ? a(s) : 0);
    }
  }
  return t;
}
function $s(e, t) {
  let n = e.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const a in t)
    n += " " + a + '="' + t[a] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + n + ">" + e + "</svg>";
}
function xs(e) {
  return e.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function ws(e) {
  return "data:image/svg+xml," + xs(e);
}
function As(e) {
  return 'url("' + ws(e) + '")';
}
const xa = {
  ...Qa,
  inline: false
}, Ds = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  "aria-hidden": true,
  role: "img"
}, Cs = {
  display: "inline-block"
}, jt = {
  backgroundColor: "currentColor"
}, tn = {
  backgroundColor: "transparent"
}, wa = {
  Image: "var(--svg)",
  Repeat: "no-repeat",
  Size: "100% 100%"
}, Aa = {
  webkitMask: jt,
  mask: jt,
  background: tn
};
for (const e in Aa) {
  const t = Aa[e];
  for (const n in wa)
    t[e + n] = wa[n];
}
const mt = {};
["horizontal", "vertical"].forEach((e) => {
  const t = e.slice(0, 1) + "Flip";
  mt[e + "-flip"] = t, mt[e.slice(0, 1) + "-flip"] = t, mt[e + "Flip"] = t;
});
function Da(e) {
  return e + (e.match(/^[-0-9.]+$/) ? "px" : "");
}
const Ca = (e, t) => {
  const n = _s(xa, t), a = { ...Ds }, o = t.mode || "svg", s = {}, r = t.style, u = typeof r == "object" && !(r instanceof Array) ? r : {};
  for (let D in t) {
    const _ = t[D];
    if (_ !== void 0)
      switch (D) {
        // Properties to ignore
        case "icon":
        case "style":
        case "onLoad":
        case "mode":
        case "ssr":
          break;
        // Boolean attributes
        case "inline":
        case "hFlip":
        case "vFlip":
          n[D] = _ === true || _ === "true" || _ === 1;
          break;
        // Flip as string: 'horizontal,vertical'
        case "flip":
          typeof _ == "string" && ks(n, _);
          break;
        // Color: override style
        case "color":
          s.color = _;
          break;
        // Rotation as string
        case "rotate":
          typeof _ == "string" ? n[D] = Ss(_) : typeof _ == "number" && (n[D] = _);
          break;
        // Remove aria-hidden
        case "ariaHidden":
        case "aria-hidden":
          _ !== true && _ !== "true" && delete a["aria-hidden"];
          break;
        default: {
          const B = mt[D];
          B ? (_ === true || _ === "true" || _ === 1) && (n[B] = true) : xa[D] === void 0 && (a[D] = _);
        }
      }
  }
  const g = Wo(e, n), c = g.attributes;
  if (n.inline && (s.verticalAlign = "-0.125em"), o === "svg") {
    a.style = {
      ...s,
      ...u
    }, Object.assign(a, c);
    let D = 0, _ = t.id;
    return typeof _ == "string" && (_ = _.replace(/-/g, "_")), a.innerHTML = Yo(g.body, _ ? () => _ + "ID" + D++ : "iconifyVue"), h("svg", a);
  }
  const { body: f, width: m, height: p } = e, x = o === "mask" || (o === "bg" ? false : f.indexOf("currentColor") !== -1), h$1 = $s(f, {
    ...c,
    width: m + "",
    height: p + ""
  });
  return a.style = {
    ...s,
    "--svg": As(h$1),
    width: Da(c.width),
    height: Da(c.height),
    ...Cs,
    ...x ? jt : tn,
    ...u
  }, h("span", a);
};
Ya(true);
Xo("", ss);
const Is = {
  ...Mt,
  body: ""
}, Ms = defineComponent((e, { emit: t }) => {
  const n = ref(null);
  function a() {
    n.value && (n.value.abort?.(), n.value = null);
  }
  const o = ref(!!e.ssr), s = ref(""), r = shallowRef(null);
  function u() {
    const c = e.icon;
    if (typeof c == "object" && c !== null && typeof c.body == "string")
      return s.value = "", {
        data: c
      };
    let f;
    if (typeof c != "string" || (f = It(c, false, true)) === null)
      return null;
    let m = Vo(f);
    if (!m) {
      const h2 = n.value;
      return (!h2 || h2.name !== c) && (m === null ? n.value = {
        name: c
      } : n.value = {
        name: c,
        abort: bs([f], g)
      }), null;
    }
    a(), s.value !== c && (s.value = c, nextTick(() => {
      t("load", c);
    }));
    const p = e.customise;
    if (p) {
      m = Object.assign({}, m);
      const h2 = p(m.body, f.name, f.prefix, f.provider);
      typeof h2 == "string" && (m.body = h2);
    }
    const x = ["iconify"];
    return f.prefix !== "" && x.push("iconify--" + f.prefix), f.provider !== "" && x.push("iconify--" + f.provider), { data: m, classes: x };
  }
  function g() {
    const c = u();
    c ? c.data !== r.value?.data && (r.value = c) : r.value = null;
  }
  return o.value ? g() : false, watch(() => e.icon, g), () => {
    const c = r.value;
    if (!c)
      return Ca(Is, e);
    let f = e;
    return c.classes && (f = {
      ...e,
      class: c.classes.join(" ")
    }), Ca({
      ...Mt,
      ...c.data
    }, f);
  };
}, {
  props: [
    // Icon and render mode
    "icon",
    "mode",
    "ssr",
    // Layout and style
    "width",
    "height",
    "style",
    "color",
    "inline",
    // Transformations
    "rotate",
    "hFlip",
    "horizontalFlip",
    "vFlip",
    "verticalFlip",
    "flip",
    // Misc
    "id",
    "ariaHidden",
    "customise",
    "title"
  ],
  emits: ["load"]
}), Bs = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSIcon",
  props: {
    name: {},
    size: { default: "md" },
    color: {}
  },
  setup(e) {
    const t = e, n = useAttrs(), a = {
      sm: "var(--agds-icon-size-sm)",
      md: "var(--agds-icon-size-md)",
      lg: "var(--agds-icon-size-lg)",
      xl: "var(--agds-icon-size-xl)"
    }, o = computed(
      () => typeof t.name == "string" ? t.name.replace(/^i-/, "") : ""
    ), s = computed(() => {
      const g = t.size;
      return typeof g == "number" ? `${g}px` : g && g in a ? a[g] : g ?? a.md;
    }), r = computed(() => ({
      fontSize: s.value,
      ...t.color ? { color: t.color } : {}
    })), u = computed(() => n["aria-label"] ? { "aria-hidden": "false" } : n["aria-hidden"] === void 0 ? { "aria-hidden": "true" } : {});
    return (g, c) => typeof e.name == "string" ? (openBlock(), createBlock(unref(Ms), mergeProps({
      key: 0,
      icon: o.value,
      focusable: "false",
      class: "agds-icon"
    }, { ...g.$attrs, ...u.value }, { style: r.value }), null, 16, ["icon", "style"])) : (openBlock(), createBlock(resolveDynamicComponent(e.name), mergeProps({
      key: 1,
      class: "agds-icon"
    }, { ...g.$attrs, ...u.value }, { style: r.value }), null, 16, ["style"]));
  }
}), A = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [a, o] of t)
    n[a] = o;
  return n;
}, _e = /* @__PURE__ */ A(Bs, [["__scopeId", "data-v-7d15793f"]]), Ls = /* @__PURE__ */ defineComponent({
  __name: "AGDSBreadcrumbsDivider",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(_e, {
      name: "mdi:chevron-right",
      size: "sm",
      "aria-hidden": "true",
      class: "agds-breadcrumbs__divider"
    }));
  }
}), an = /* @__PURE__ */ A(Ls, [["__scopeId", "data-v-7b99561f"]]), Ts = { class: "agds-breadcrumbs__item" }, Fs = ["href", "aria-current"], Ps = {
  key: 0,
  class: "sr-only"
}, Os = ["aria-current"], Vs = {
  key: 0,
  class: "sr-only"
}, Rs = /* @__PURE__ */ defineComponent({
  __name: "AGDSBreadcrumbsItem",
  props: {
    href: {},
    label: {},
    current: { type: Boolean, default: false }
  },
  setup(e, { expose: t }) {
    const n = ref(null);
    return t({ focus: () => n.value?.focus() }), (a, o) => (openBlock(), createElementBlock("li", Ts, [
      createVNode(an),
      e.href ? (openBlock(), createElementBlock("a", {
        key: 0,
        ref_key: "linkRef",
        ref: n,
        href: e.href,
        "aria-current": e.current ? "page" : void 0,
        class: "agds-breadcrumbs__link"
      }, [
        createTextVNode(toDisplayString(e.label), 1),
        e.current ? (openBlock(), createElementBlock("span", Ps, " (current page)")) : createCommentVNode("", true)
      ], 8, Fs)) : (openBlock(), createElementBlock("span", {
        key: 1,
        "aria-current": e.current ? "page" : void 0,
        class: "agds-breadcrumbs__text"
      }, [
        createTextVNode(toDisplayString(e.label), 1),
        e.current ? (openBlock(), createElementBlock("span", Vs, " (current page)")) : createCommentVNode("", true)
      ], 8, Os))
    ]));
  }
}), vt = /* @__PURE__ */ A(Rs, [["__scopeId", "data-v-74bbe2c0"]]), Es = { class: "agds-breadcrumbs__item" }, Gs = /* @__PURE__ */ defineComponent({
  __name: "AGDSBreadcrumbsToggle",
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = t;
    function a(o) {
      n("click", o);
    }
    return (o, s) => (openBlock(), createElementBlock("li", Es, [
      createVNode(an),
      createElementVNode("button", {
        type: "button",
        class: "agds-breadcrumbs__toggle",
        "aria-expanded": "false",
        "aria-label": "Show all breadcrumbs",
        onClick: a
      }, " … ")
    ]));
  }
}), qs = /* @__PURE__ */ A(Gs, [["__scopeId", "data-v-ef32eca7"]]), zs = ["aria-label"], Hs = { class: "agds-breadcrumbs__list" }, Ns = /* @__PURE__ */ defineComponent({
  __name: "AGDSBreadcrumbs",
  props: {
    ariaLabel: { default: "Breadcrumbs" },
    links: {}
  },
  setup(e) {
    const t = e, n = computed(() => t.links[0]), a = computed(() => t.links[t.links.length - 1]), o = computed(
      () => t.links.filter((c, f, m) => f !== 0 && f !== m.length - 1)
    ), s = computed(() => o.value.length > 0), r = ref(false), u = ref(null);
    async function g() {
      r.value = true, await nextTick(), u.value?.focus();
    }
    return (c, f) => (openBlock(), createElementBlock("nav", {
      "aria-label": t.ariaLabel,
      class: normalizeClass(["agds-breadcrumbs", { "agds-breadcrumbs--collapsed": s.value && !r.value }])
    }, [
      createElementVNode("ol", Hs, [
        createVNode(vt, {
          ref_key: "firstItemRef",
          ref: u,
          href: n.value.href,
          label: n.value.label
        }, null, 8, ["href", "label"]),
        s.value ? (openBlock(), createBlock(qs, {
          key: 0,
          class: "agds-breadcrumbs__toggle-item",
          onClick: g
        })) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (m, p) => (openBlock(), createBlock(vt, {
          key: p,
          href: m.href,
          label: m.label,
          class: "agds-breadcrumbs__middle-item"
        }, null, 8, ["href", "label"]))), 128)),
        t.links.length > 1 ? (openBlock(), createBlock(vt, {
          key: 1,
          href: a.value.href,
          label: a.value.label,
          current: true
        }, null, 8, ["href", "label"])) : createCommentVNode("", true)
      ])
    ], 10, zs));
  }
}), js = /* @__PURE__ */ A(Ns, [["__scopeId", "data-v-44971669"]]), Ws = ["type", "disabled", "aria-busy", "aria-disabled"], Us = {
  "aria-live": "assertive",
  class: "agds-button__live-region"
}, Zs = {
  key: 0,
  class: "agds-button__loading-indicator"
}, Ks = { class: "sr-only" }, Ys = /* @__PURE__ */ defineComponent({
  __name: "AGDSButton",
  props: {
    variant: { default: "primary" },
    size: { default: "md" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingLabel: { default: "Loading" },
    type: { default: "button" },
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur", "keydown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ref(null);
    t({ focus: () => s.value?.focus() });
    function r(u) {
      s.value?.focus(), !a.disabled && !a.loading && o("click", u);
    }
    return (u, g) => (openBlock(), createElementBlock("button", {
      ref_key: "buttonRef",
      ref: s,
      type: a.type,
      disabled: a.disabled || a.loading,
      "aria-busy": a.loading ? true : void 0,
      "aria-disabled": a.disabled || a.loading ? true : void 0,
      class: normalizeClass([
        "agds-button",
        `agds-button--${a.variant}`,
        `agds-button--${a.size}`,
        {
          "agds-button--block": a.block,
          "agds-button--loading": a.loading,
          "agds-button--disabled": a.disabled,
          "agds-button--focus-all": a.focusRingFor === "all"
        }
      ]),
      onClick: r,
      onFocus: g[0] || (g[0] = (c) => o("focus", c)),
      onBlur: g[1] || (g[1] = (c) => o("blur", c)),
      onKeydown: g[2] || (g[2] = (c) => o("keydown", c))
    }, [
      u.$slots.iconBefore ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["agds-button__icon", { "agds-button__icon--hidden": a.loading }]),
        "aria-hidden": "true"
      }, [
        renderSlot(u.$slots, "iconBefore", {}, void 0, true)
      ], 2)) : createCommentVNode("", true),
      createElementVNode("span", {
        class: normalizeClass(["agds-button__label", { "agds-button__label--hidden": a.loading }])
      }, [
        renderSlot(u.$slots, "default", {}, void 0, true)
      ], 2),
      u.$slots.iconAfter ? (openBlock(), createElementBlock("span", {
        key: 1,
        class: normalizeClass(["agds-button__icon", { "agds-button__icon--hidden": a.loading }]),
        "aria-hidden": "true"
      }, [
        renderSlot(u.$slots, "iconAfter", {}, void 0, true)
      ], 2)) : createCommentVNode("", true),
      createElementVNode("span", Us, [
        a.loading ? (openBlock(), createElementBlock("span", Zs, [
          g[3] || (g[3] = createElementVNode("span", {
            class: "agds-button__spinner",
            "aria-hidden": "true"
          }, null, -1)),
          createElementVNode("span", Ks, toDisplayString(a.loadingLabel), 1)
        ])) : createCommentVNode("", true)
      ])
    ], 42, Ws));
  }
}), Ue = /* @__PURE__ */ A(Ys, [["__scopeId", "data-v-8c021442"]]), Xs = ["href", "target", "rel"], Qs = {
  key: 0,
  class: "agds-button__icon",
  "aria-hidden": "true"
}, Js = { class: "agds-button__label" }, el = {
  key: 1,
  class: "agds-button__icon",
  "aria-hidden": "true"
}, tl = {
  key: 2,
  class: "sr-only"
}, al = /* @__PURE__ */ defineComponent({
  __name: "AGDSButtonLink",
  props: {
    href: {},
    variant: { default: "primary" },
    size: { default: "md" },
    block: { type: Boolean, default: false },
    external: { type: Boolean, default: false }
  },
  emits: ["click", "focus", "blur"],
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("a", {
      href: e.href,
      target: e.external ? "_blank" : void 0,
      rel: e.external ? "noopener noreferrer" : void 0,
      class: normalizeClass([
        "agds-button",
        `agds-button--${e.variant}`,
        `agds-button--${e.size}`,
        { "agds-button--block": e.block }
      ]),
      onClick: n[0] || (n[0] = (a) => t.$emit("click", a)),
      onFocus: n[1] || (n[1] = (a) => t.$emit("focus", a)),
      onBlur: n[2] || (n[2] = (a) => t.$emit("blur", a))
    }, [
      t.$slots.iconBefore ? (openBlock(), createElementBlock("span", Qs, [
        renderSlot(t.$slots, "iconBefore", {}, void 0, true)
      ])) : createCommentVNode("", true),
      createElementVNode("span", Js, [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ]),
      t.$slots.iconAfter ? (openBlock(), createElementBlock("span", el, [
        renderSlot(t.$slots, "iconAfter", {}, void 0, true)
      ])) : createCommentVNode("", true),
      e.external ? (openBlock(), createElementBlock("span", tl, ", opens in a new tab")) : createCommentVNode("", true)
    ], 42, Xs));
  }
}), nl = /* @__PURE__ */ A(al, [["__scopeId", "data-v-84656420"]]), ol = /* @__PURE__ */ defineComponent({
  __name: "AGDSToggleButton",
  props: {
    pressed: { type: Boolean },
    label: {},
    pressedLabel: {},
    hiddenLabel: { type: Boolean, default: false },
    iconType: { default: "flag" },
    size: { default: "md" },
    variant: { default: "text" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:pressed"],
  setup(e, { expose: t, emit: n }) {
    const a = {
      flag: { false: "mdi:flag-outline", true: "mdi:flag" },
      star: { false: "mdi:star-outline", true: "mdi:star" }
    }, o = e, s = n, r = ref(null);
    t({ focus: () => r.value?.focus() });
    const u = computed(
      () => o.pressed ? o.pressedLabel : o.label
    ), g = computed(
      () => a[o.iconType][String(o.pressed)]
    );
    function c() {
      o.disabled || s("update:pressed", !o.pressed);
    }
    return (f, m) => (openBlock(), createBlock(Ue, {
      ref_key: "buttonRef",
      ref: r,
      type: "button",
      size: o.size,
      variant: o.variant,
      disabled: o.disabled,
      "aria-pressed": o.pressed,
      "aria-label": o.hiddenLabel ? u.value : void 0,
      onClick: c
    }, createSlots({
      iconBefore: withCtx(() => [
        createVNode(_e, {
          name: g.value,
          "aria-hidden": "true"
        }, null, 8, ["name"])
      ]),
      _: 2
    }, [
      o.hiddenLabel ? void 0 : {
        name: "default",
        fn: withCtx(() => [
          createTextVNode(toDisplayString(u.value), 1)
        ]),
        key: "0"
      }
    ]), 1032, ["size", "variant", "disabled", "aria-pressed", "aria-label"]));
  }
}), sl = /* @__PURE__ */ defineComponent({
  __name: "AGDSAccordion",
  props: {
    type: { default: "multiple" },
    collapsible: { type: Boolean, default: true },
    modelValue: {},
    defaultValue: {},
    indent: { type: Boolean, default: false },
    background: { default: "body" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    return provide("accordionIndent", n.indent), provide("accordionBackground", n.background), (o, s) => (openBlock(), createBlock(unref(AccordionRoot), {
      type: n.type,
      collapsible: n.type === "single" ? n.collapsible : void 0,
      "model-value": n.modelValue,
      "default-value": n.defaultValue,
      class: "agds-accordion",
      "onUpdate:modelValue": s[0] || (s[0] = (r) => r !== void 0 && a("update:modelValue", r))
    }, {
      default: withCtx(() => [
        renderSlot(o.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["type", "collapsible", "model-value", "default-value"]));
  }
}), ll = /* @__PURE__ */ A(sl, [["__scopeId", "data-v-3c55f372"]]), il = { class: "agds-accordion-item__title" }, rl = { class: "agds-accordion-item__panel-inner" }, dl = /* @__PURE__ */ defineComponent({
  __name: "AGDSAccordionItem",
  props: {
    value: {},
    title: {},
    background: { default: void 0 },
    headingLevel: { default: 3 },
    disabled: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = inject("accordionBackground", "body"), a = computed(() => t.background ?? n), o = inject("accordionIndent", false);
    return (s, r) => (openBlock(), createBlock(unref(AccordionItem), {
      value: t.value,
      disabled: t.disabled,
      class: normalizeClass(["agds-accordion-item", `agds-accordion-item--bg-${a.value}`])
    }, {
      default: withCtx(() => [
        createVNode(unref(AccordionHeader), {
          as: `h${t.headingLevel}`,
          class: "agds-accordion-item__heading"
        }, {
          default: withCtx(() => [
            createVNode(unref(AccordionTrigger), {
              class: normalizeClass([
                "agds-accordion-item__trigger",
                `agds-accordion-item__trigger--bg-${a.value}`,
                { "agds-accordion-item__trigger--indented": unref(o) }
              ])
            }, {
              default: withCtx(() => [
                createElementVNode("span", il, toDisplayString(t.title), 1),
                r[0] || (r[0] = createElementVNode("svg", {
                  class: "agds-accordion-item__chevron",
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                }, [
                  createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                ], -1))
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 8, ["as"]),
        createVNode(unref(AccordionContent), {
          class: normalizeClass([
            "agds-accordion-item__panel",
            { "agds-accordion-item__panel--indented": unref(o) }
          ])
        }, {
          default: withCtx(() => [
            createElementVNode("div", rl, [
              renderSlot(s.$slots, "default", {}, void 0, true)
            ])
          ]),
          _: 3
        }, 8, ["class"])
      ]),
      _: 3
    }, 8, ["value", "disabled", "class"]));
  }
}), ul = /* @__PURE__ */ A(dl, [["__scopeId", "data-v-72c61c65"]]);
function cl(e) {
  const t = Array.from(e.matchAll(new RegExp("(\\p{L})\\p{L}+", "gu")));
  if (!t.length)
    return "?";
  const n = t.shift()?.[1] || "", a = t.pop()?.[1] || "";
  return (n + a).toUpperCase();
}
const gl = ["role", "aria-label", "aria-hidden"], fl = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSAvatar",
  props: {
    name: {},
    tone: { default: "neutral" },
    size: { default: "md" }
  },
  setup(e) {
    const t = e, n = useAttrs(), a = computed(() => cl(t.name)), o = computed(
      () => n["aria-hidden"] === true || n["aria-hidden"] === "true"
    ), s = computed(() => {
      if (!o.value)
        return "aria-label" in n ? n["aria-label"] || void 0 : t.name;
    });
    return (r, u) => (openBlock(), createElementBlock("span", mergeProps(unref(n), {
      class: [
        "agds-avatar",
        `agds-avatar--${t.tone}`,
        `agds-avatar--${t.size}`
      ],
      role: o.value ? void 0 : "img",
      "aria-label": s.value,
      "aria-hidden": o.value ? "true" : void 0
    }), toDisplayString(a.value), 17, gl));
  }
}), ml = /* @__PURE__ */ A(fl, [["__scopeId", "data-v-d63a2b17"]]), vl = {
  key: 0,
  class: "agds-callout__icon"
}, pl = { class: "agds-callout__content" }, hl = {
  key: 0,
  class: "agds-callout__title"
}, bl = /* @__PURE__ */ defineComponent({
  __name: "AGDSCallout",
  props: {
    as: { default: "div" },
    title: {},
    tone: { default: "neutral" },
    variant: { default: "regular" },
    onBodyAlt: { type: Boolean, default: false },
    background: {}
  },
  setup(e) {
    const t = e, n = computed(
      () => t.tone === "neutral" && (t.onBodyAlt || t.background === "shadeAlt")
    ), a = computed(() => t.tone === "info");
    return (o, s) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      class: normalizeClass([
        "agds-callout",
        `agds-callout--${t.tone}`,
        `agds-callout--${t.variant}`,
        { "agds-callout--body-alt": n.value }
      ])
    }, {
      default: withCtx(() => [
        o.$slots.icon || a.value ? (openBlock(), createElementBlock("span", vl, [
          renderSlot(o.$slots, "icon", {}, () => [
            s[0] || (s[0] = createElementVNode("span", {
              role: "img",
              "aria-label": "Information",
              class: "agds-callout__icon-inner"
            }, [
              createElementVNode("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                "aria-hidden": "true",
                focusable: "false"
              }, [
                createElementVNode("path", {
                  "fill-rule": "evenodd",
                  d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
                  "clip-rule": "evenodd"
                })
              ])
            ], -1))
          ], true)
        ])) : createCommentVNode("", true),
        createElementVNode("div", pl, [
          t.title ? (openBlock(), createElementBlock("p", hl, toDisplayString(t.title), 1)) : createCommentVNode("", true),
          renderSlot(o.$slots, "default", {}, void 0, true)
        ])
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), _l = /* @__PURE__ */ A(bl, [["__scopeId", "data-v-7bd52606"]]), yl = ["aria-label"], kl = {
  class: "agds-global-alert__strip",
  "aria-hidden": "true"
}, Sl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  focusable: "false",
  "aria-hidden": "true"
}, $l = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  focusable: "false",
  "aria-hidden": "true"
}, xl = { class: "agds-global-alert__body" }, wl = {
  key: 0,
  class: "agds-global-alert__title"
}, Al = { class: "agds-global-alert__content" }, Dl = /* @__PURE__ */ defineComponent({
  __name: "AGDSGlobalAlert",
  props: {
    title: {},
    tone: { default: "warning" },
    onClose: {}
  },
  setup(e) {
    const t = e, n = computed(() => t.tone === "info" ? "Information" : "Warning"), a = computed(() => t.title || n.value);
    return (o, s) => (openBlock(), createElementBlock("section", {
      class: normalizeClass(["agds-global-alert", `agds-global-alert--${t.tone}`]),
      "aria-label": a.value
    }, [
      createElementVNode("div", kl, [
        t.tone === "info" ? (openBlock(), createElementBlock("svg", Sl, [...s[1] || (s[1] = [
          createElementVNode("path", {
            "fill-rule": "evenodd",
            d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])])) : (openBlock(), createElementBlock("svg", $l, [...s[2] || (s[2] = [
          createElementVNode("path", {
            "fill-rule": "evenodd",
            d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])]))
      ]),
      createElementVNode("div", xl, [
        createElementVNode("div", {
          class: normalizeClass(["agds-global-alert__inner", { "agds-global-alert__inner--with-close": !!t.onClose }])
        }, [
          t.title ? (openBlock(), createElementBlock("h2", wl, toDisplayString(t.title), 1)) : createCommentVNode("", true),
          createElementVNode("div", Al, [
            renderSlot(o.$slots, "default", {}, void 0, true)
          ])
        ], 2),
        t.onClose ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          "aria-label": "Close",
          class: "agds-global-alert__close",
          onClick: s[0] || (s[0] = (r) => t.onClose())
        }, [...s[3] || (s[3] = [
          createElementVNode("span", { class: "agds-global-alert__close-label" }, "Close", -1),
          createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            focusable: "false",
            "aria-hidden": "true"
          }, [
            createElementVNode("path", { d: "M18 6 6 18M6 6l12 12" })
          ], -1)
        ])])) : createCommentVNode("", true)
      ])
    ], 10, yl));
  }
}), Cl = /* @__PURE__ */ A(Dl, [["__scopeId", "data-v-8b1dd069"]]), Se = {
  // Filled (fill="currentColor", fill-rule="evenodd", clip-rule="evenodd")
  infoFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
  successFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
  warningFilled: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  alertFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  // Outline (fill="none", stroke="currentColor", stroke-width="1.5", round caps/joins)
  infoOutline: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  successOutline: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warningOutline: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  alertCircleOutline: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
  helpOutline: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
  noSymbol: "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636",
  arrowPath: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.990",
  pauseCircle: "M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
}, $e = {
  body: "var(--agds-color-bg)",
  info: "var(--agds-color-info-muted)",
  success: "var(--agds-color-success-muted)",
  warning: "var(--agds-color-warning-muted)",
  error: "var(--agds-color-error-muted)"
}, xe = {
  neutral: "var(--agds-color-border)",
  info: "var(--agds-color-info)",
  success: "var(--agds-color-success)",
  warning: "var(--agds-color-warning)",
  error: "var(--agds-color-error)"
}, we = {
  muted: "var(--agds-color-text-muted)",
  info: "var(--agds-color-info)",
  success: "var(--agds-color-success)",
  warning: "var(--agds-color-warning)",
  error: "var(--agds-color-error)"
}, Il = {
  cannotStartLow: {
    iconPath: Se.noSymbol,
    iconVariant: "outline",
    iconLabel: "cannot start",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  errorHigh: {
    iconPath: Se.alertFilled,
    iconVariant: "filled",
    iconLabel: "error",
    bg: $e.error,
    borderColor: xe.error,
    iconColor: we.error,
    enclosedBorder: false
  },
  errorLow: {
    iconPath: Se.alertCircleOutline,
    iconVariant: "outline",
    iconLabel: "error",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  errorMedium: {
    iconPath: Se.warningOutline,
    iconVariant: "outline",
    iconLabel: "error",
    bg: $e.body,
    borderColor: xe.error,
    iconColor: we.error,
    enclosedBorder: true
  },
  infoHigh: {
    iconPath: Se.infoFilled,
    iconVariant: "filled",
    iconLabel: "information",
    bg: $e.info,
    borderColor: xe.info,
    iconColor: we.info,
    enclosedBorder: false
  },
  infoLow: {
    iconPath: Se.infoOutline,
    iconVariant: "outline",
    iconLabel: "information",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  infoMedium: {
    iconPath: Se.infoOutline,
    iconVariant: "outline",
    iconLabel: "information",
    bg: $e.body,
    borderColor: xe.info,
    iconColor: we.info,
    enclosedBorder: true
  },
  inProgressLow: {
    iconPath: Se.arrowPath,
    iconVariant: "outline",
    iconLabel: "in progress",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  notStartedLow: {
    iconPath: Se.clock,
    iconVariant: "outline",
    iconLabel: "not started",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  pausedLow: {
    iconPath: Se.pauseCircle,
    iconVariant: "outline",
    iconLabel: "paused",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  successHigh: {
    iconPath: Se.successFilled,
    iconVariant: "filled",
    iconLabel: "success",
    bg: $e.success,
    borderColor: xe.success,
    iconColor: we.success,
    enclosedBorder: false
  },
  successLow: {
    iconPath: Se.successOutline,
    iconVariant: "outline",
    iconLabel: "success",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  successMedium: {
    iconPath: Se.successOutline,
    iconVariant: "outline",
    iconLabel: "success",
    bg: $e.body,
    borderColor: xe.success,
    iconColor: we.success,
    enclosedBorder: true
  },
  unknownLow: {
    iconPath: Se.helpOutline,
    iconVariant: "outline",
    iconLabel: "unknown",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  warningHigh: {
    iconPath: Se.warningFilled,
    iconVariant: "filled",
    iconLabel: "warning",
    bg: $e.warning,
    borderColor: xe.warning,
    iconColor: we.warning,
    enclosedBorder: false
  },
  warningLow: {
    iconPath: Se.alertCircleOutline,
    iconVariant: "outline",
    iconLabel: "warning",
    bg: $e.body,
    borderColor: xe.neutral,
    iconColor: we.muted,
    enclosedBorder: true
  },
  warningMedium: {
    iconPath: Se.warningOutline,
    iconVariant: "outline",
    iconLabel: "warning",
    bg: $e.body,
    borderColor: xe.warning,
    iconColor: we.warning,
    enclosedBorder: true
  }
}, Ia = {
  error: "errorHigh",
  success: "successHigh",
  warning: "warningHigh",
  info: "infoHigh"
};
function Ml(e) {
  return e in Ia ? Ia[e] : e;
}
const Bl = ["id", "role", "aria-labelledby", "tabindex"], Ll = { class: "agds-section-alert__icon-wrap" }, Tl = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  focusable: "false",
  "aria-hidden": "true",
  class: "agds-section-alert__icon"
}, Fl = ["d"], Pl = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  focusable: "false",
  "aria-hidden": "true",
  class: "agds-section-alert__icon"
}, Ol = ["d"], Vl = ["id"], Rl = { class: "agds-section-alert__body" }, El = ["id"], Gl = ["id"], ql = /* @__PURE__ */ defineComponent({
  __name: "AGDSSectionAlert",
  props: {
    tone: {},
    title: {},
    id: {},
    role: { default: "region" },
    tabIndex: {},
    focusOnMount: { type: Boolean },
    focusOnUpdate: {},
    onClose: {},
    onDismiss: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    t({ focus: () => f.value?.focus() });
    const a = getCurrentInstance()?.uid, o = computed(() => n.id ?? `section-alert-${a}`), s = computed(() => `${o.value}-icon`), r = computed(() => `${o.value}-title`), u = computed(() => `${o.value}-body`), g = useSlots(), c = computed(() => {
      const _ = [s.value, r.value];
      return g.default && _.push(u.value), _.join(" ");
    }), f = ref(null), m = computed(() => {
      if (n.tabIndex !== void 0) return n.tabIndex;
      if (n.focusOnMount || n.focusOnUpdate !== void 0) return -1;
    });
    watch(
      () => n.focusOnUpdate,
      () => {
        f.value?.focus();
      },
      { deep: true }
    );
    const p = computed(() => Ml(n.tone)), x = computed(() => Il[p.value]), h2 = computed(() => ({
      "--sa-bg": x.value.bg,
      "--sa-border-color": x.value.borderColor,
      "--sa-icon-color": x.value.iconColor
    })), D = computed(() => n.onClose ?? n.onDismiss ?? null);
    return (_, B) => (openBlock(), createElementBlock("div", {
      ref_key: "alertRef",
      ref: f,
      id: n.id,
      class: normalizeClass([
        "agds-section-alert",
        `agds-section-alert--${p.value}`,
        { "agds-section-alert--enclosed": x.value.enclosedBorder }
      ]),
      style: normalizeStyle(h2.value),
      role: n.role,
      "aria-labelledby": c.value,
      tabindex: m.value
    }, [
      createElementVNode("span", Ll, [
        x.value.iconVariant === "filled" ? (openBlock(), createElementBlock("svg", Tl, [
          createElementVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: x.value.iconPath
          }, null, 8, Fl)
        ])) : (openBlock(), createElementBlock("svg", Pl, [
          createElementVNode("path", {
            d: x.value.iconPath
          }, null, 8, Ol)
        ])),
        createElementVNode("span", {
          id: s.value,
          class: "agds-section-alert__sr-tone"
        }, toDisplayString(x.value.iconLabel), 9, Vl)
      ]),
      createElementVNode("div", Rl, [
        createElementVNode("p", {
          id: r.value,
          class: "agds-section-alert__title"
        }, toDisplayString(n.title), 9, El),
        _.$slots.default ? (openBlock(), createElementBlock("div", {
          key: 0,
          id: u.value,
          class: "agds-section-alert__content"
        }, [
          renderSlot(_.$slots, "default", {}, void 0, true)
        ], 8, Gl)) : createCommentVNode("", true)
      ]),
      D.value ? (openBlock(), createElementBlock("button", {
        key: 0,
        type: "button",
        "aria-label": "Close",
        class: "agds-section-alert__close",
        onClick: B[0] || (B[0] = (I) => D.value())
      }, [...B[1] || (B[1] = [
        createElementVNode("span", { class: "agds-section-alert__close-label" }, "Close", -1),
        createElementVNode("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          focusable: "false",
          "aria-hidden": "true",
          class: "agds-section-alert__close-icon"
        }, [
          createElementVNode("path", { d: "M18 6 6 18M6 6l12 12" })
        ], -1)
      ])])) : createCommentVNode("", true)
    ], 14, Bl));
  }
}), zl = /* @__PURE__ */ A(ql, [["__scopeId", "data-v-425bc5dd"]]), Ae = {
  // Filled (fill="currentColor", fill-rule="evenodd", clip-rule="evenodd")
  infoFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
  successFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z",
  warningFilled: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  alertFilled: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z",
  // Outline (fill="none", stroke="currentColor", stroke-width="1.5", round caps/joins)
  infoOutline: "m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z",
  successOutline: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  warningOutline: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z",
  alertCircleOutline: "M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z",
  helpOutline: "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z",
  noSymbol: "M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636",
  arrowPath: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.990",
  pauseCircle: "M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  clock: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
}, ye = {
  neutral: "var(--agds-color-border)",
  info: "var(--agds-color-info)",
  success: "var(--agds-color-success)",
  warning: "var(--agds-color-warning)",
  error: "var(--agds-color-error)"
}, ke = {
  muted: "var(--agds-color-text-muted)",
  info: "var(--agds-color-info)",
  success: "var(--agds-color-success)",
  warning: "var(--agds-color-warning)",
  error: "var(--agds-color-error)"
}, Hl = {
  cannotStartLow: {
    iconVariant: "outline",
    iconPath: Ae.noSymbol,
    iconLabel: "cannot start",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  errorHigh: {
    iconVariant: "filled",
    iconPath: Ae.alertFilled,
    iconLabel: "error",
    borderColor: ye.error,
    iconColor: ke.error
  },
  errorLow: {
    iconVariant: "outline",
    iconPath: Ae.alertCircleOutline,
    iconLabel: "error",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  errorMedium: {
    iconVariant: "outline",
    iconPath: Ae.warningOutline,
    iconLabel: "error",
    borderColor: ye.error,
    iconColor: ke.error
  },
  infoHigh: {
    iconVariant: "filled",
    iconPath: Ae.infoFilled,
    iconLabel: "information",
    borderColor: ye.info,
    iconColor: ke.info
  },
  infoLow: {
    iconVariant: "outline",
    iconPath: Ae.infoOutline,
    iconLabel: "information",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  infoMedium: {
    iconVariant: "outline",
    iconPath: Ae.infoOutline,
    iconLabel: "information",
    borderColor: ye.info,
    iconColor: ke.info
  },
  inProgressLow: {
    iconVariant: "outline",
    iconPath: Ae.arrowPath,
    iconLabel: "in progress",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  notStartedLow: {
    iconVariant: "outline",
    iconPath: Ae.clock,
    iconLabel: "not started",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  pausedLow: {
    iconVariant: "outline",
    iconPath: Ae.pauseCircle,
    iconLabel: "paused",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  successHigh: {
    iconVariant: "filled",
    iconPath: Ae.successFilled,
    iconLabel: "success",
    borderColor: ye.success,
    iconColor: ke.success
  },
  successLow: {
    iconVariant: "outline",
    iconPath: Ae.successOutline,
    iconLabel: "success",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  successMedium: {
    iconVariant: "outline",
    iconPath: Ae.successOutline,
    iconLabel: "success",
    borderColor: ye.success,
    iconColor: ke.success
  },
  unknownLow: {
    iconVariant: "outline",
    iconPath: Ae.helpOutline,
    iconLabel: "unknown",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  warningHigh: {
    iconVariant: "filled",
    iconPath: Ae.warningFilled,
    iconLabel: "warning",
    borderColor: ye.warning,
    iconColor: ke.warning
  },
  warningLow: {
    iconVariant: "outline",
    iconPath: Ae.alertCircleOutline,
    iconLabel: "warning",
    borderColor: ye.neutral,
    iconColor: ke.muted
  },
  warningMedium: {
    iconVariant: "outline",
    iconPath: Ae.warningOutline,
    iconLabel: "warning",
    borderColor: ye.warning,
    iconColor: ke.warning
  },
  // Internal entry for the deprecated 'neutral' legacy tone (renders a small dot).
  neutral: {
    iconVariant: "dot",
    iconPath: null,
    iconLabel: "neutral",
    borderColor: ye.neutral,
    iconColor: ke.muted
  }
}, Ma = {
  neutral: "neutral",
  success: "successMedium",
  error: "errorMedium",
  info: "infoMedium",
  warning: "warningMedium"
};
function Nl(e) {
  return e in Ma ? Ma[e] : e;
}
const jl = ["aria-label"], Wl = ["d"], Ul = ["aria-label"], Zl = ["d"], Kl = ["aria-label"], Yl = { class: "agds-status-badge__label" }, Xl = /* @__PURE__ */ defineComponent({
  __name: "AGDSStatusBadge",
  props: {
    label: {},
    tone: { default: "infoHigh" },
    appearance: {},
    weight: { default: "regular" }
  },
  setup(e) {
    const t = e, n = computed(() => Nl(t.tone)), a = computed(() => Hl[n.value]), o = computed(
      () => t.appearance ?? t.weight ?? "regular"
    ), s = computed(() => ({
      "--sb-border-color": a.value.borderColor,
      "--sb-icon-color": a.value.iconColor
    }));
    return (r, u) => (openBlock(), createElementBlock("span", {
      class: normalizeClass([
        "agds-status-badge",
        `agds-status-badge--${o.value}`
      ]),
      style: normalizeStyle(s.value)
    }, [
      a.value.iconVariant === "filled" ? (openBlock(), createElementBlock("svg", {
        key: 0,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        "aria-hidden": "false",
        "aria-label": `Status: ${a.value.iconLabel}.`,
        class: "agds-status-badge__icon"
      }, [
        createElementVNode("path", {
          "fill-rule": "evenodd",
          "clip-rule": "evenodd",
          d: a.value.iconPath
        }, null, 8, Wl)
      ], 8, jl)) : a.value.iconVariant === "outline" ? (openBlock(), createElementBlock("svg", {
        key: 1,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": "1.5",
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        focusable: "false",
        "aria-hidden": "false",
        "aria-label": `Status: ${a.value.iconLabel}.`,
        class: "agds-status-badge__icon"
      }, [
        createElementVNode("path", {
          d: a.value.iconPath
        }, null, 8, Zl)
      ], 8, Ul)) : (openBlock(), createElementBlock("svg", {
        key: 2,
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        fill: "currentColor",
        focusable: "false",
        "aria-hidden": "false",
        "aria-label": `Status: ${a.value.iconLabel}.`,
        class: "agds-status-badge__icon"
      }, [...u[0] || (u[0] = [
        createElementVNode("circle", {
          cx: "12",
          cy: "12",
          r: "4"
        }, null, -1)
      ])], 8, Kl)),
      createElementVNode("span", Yl, toDisplayString(e.label), 1)
    ], 6));
  }
}), fb = /* @__PURE__ */ A(Xl, [["__scopeId", "data-v-e345cedd"]]), Ql = { class: "agds-summary-list" }, Jl = /* @__PURE__ */ defineComponent({
  __name: "AGDSSummaryList",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("dl", Ql, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), ei = /* @__PURE__ */ A(Jl, [["__scopeId", "data-v-392a1b7c"]]), ti = { class: "agds-summary-list-item" }, ai = /* @__PURE__ */ defineComponent({
  __name: "AGDSSummaryListItem",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("div", ti, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), ni = /* @__PURE__ */ A(ai, [["__scopeId", "data-v-730a1419"]]), oi = { class: "agds-summary-list-item__term" }, si = /* @__PURE__ */ defineComponent({
  __name: "AGDSSummaryListItemTerm",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("dt", oi, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), li = /* @__PURE__ */ A(si, [["__scopeId", "data-v-ffc85814"]]), ii = { class: "agds-summary-list-item__description" }, ri = /* @__PURE__ */ defineComponent({
  __name: "AGDSSummaryListItemDescription",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("dd", ii, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), di = /* @__PURE__ */ A(ri, [["__scopeId", "data-v-f432577d"]]), ui = { class: "agds-summary-list-item__action" }, ci = /* @__PURE__ */ defineComponent({
  __name: "AGDSSummaryListItemAction",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("dd", ui, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), gi = /* @__PURE__ */ A(ci, [["__scopeId", "data-v-4ddf851b"]]), fi = ["id", "role", "aria-labelledby", "tabindex"], mi = {
  class: "agds-page-alert__strip",
  "aria-hidden": "true"
}, vi = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  focusable: "false",
  "aria-hidden": "true",
  class: "agds-page-alert__icon"
}, pi = ["d"], hi = { class: "agds-page-alert__inner" }, bi = ["id"], _i = ["id"], yi = { class: "agds-page-alert__title" }, ki = ["id"], Si = /* @__PURE__ */ defineComponent({
  __name: "AGDSPageAlert",
  props: {
    tone: {},
    title: {},
    id: {},
    role: { default: "region" },
    tabIndex: {},
    focusOnMount: { type: Boolean },
    focusOnUpdate: {},
    onClose: {},
    onDismiss: {}
  },
  setup(e, { expose: t }) {
    const n = e;
    t({ focus: () => m.value?.focus() });
    const a = getCurrentInstance()?.uid, o = computed(() => n.id ?? `page-alert-${a}`), s = computed(() => `${o.value}-tone`), r = computed(() => `${o.value}-title`), u = computed(() => `${o.value}-body`), g = useSlots(), c = computed(() => !!n.title || !!g.title), f = computed(() => {
      const B = [s.value];
      return c.value && B.push(r.value), g.default && B.push(u.value), B.join(" ");
    }), m = ref(null), p = computed(() => {
      if (n.tabIndex !== void 0) return n.tabIndex;
      if (n.focusOnMount || n.focusOnUpdate !== void 0) return -1;
    });
    watch(
      () => n.focusOnUpdate,
      () => {
        m.value?.focus();
      },
      { deep: true }
    );
    const x = {
      info: {
        fg: "var(--agds-color-info)",
        bg: "var(--agds-color-info-muted)",
        iconLabel: "Information",
        iconPath: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z"
      },
      success: {
        fg: "var(--agds-color-success)",
        bg: "var(--agds-color-success-muted)",
        iconLabel: "Success",
        iconPath: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
      },
      warning: {
        fg: "var(--agds-color-warning)",
        bg: "var(--agds-color-warning-muted)",
        iconLabel: "Warning",
        iconPath: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      },
      error: {
        fg: "var(--agds-color-error)",
        bg: "var(--agds-color-error-muted)",
        iconLabel: "Error",
        iconPath: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
      }
    }, h2 = computed(() => x[n.tone]), D = computed(() => ({
      "--pa-fg": h2.value.fg,
      "--pa-bg": h2.value.bg
    })), _ = computed(() => n.onClose ?? n.onDismiss ?? null);
    return (B, I) => (openBlock(), createElementBlock("div", {
      ref_key: "alertRef",
      ref: m,
      id: n.id,
      class: normalizeClass(["agds-page-alert", `agds-page-alert--${n.tone}`]),
      style: normalizeStyle(D.value),
      role: n.role,
      "aria-labelledby": f.value,
      tabindex: p.value
    }, [
      createElementVNode("div", mi, [
        (openBlock(), createElementBlock("svg", vi, [
          createElementVNode("path", {
            "fill-rule": "evenodd",
            "clip-rule": "evenodd",
            d: h2.value.iconPath
          }, null, 8, pi)
        ]))
      ]),
      createElementVNode("div", {
        class: normalizeClass(["agds-page-alert__body", { "agds-page-alert__body--with-close": !!_.value }])
      }, [
        createElementVNode("div", hi, [
          createElementVNode("span", {
            id: s.value,
            class: "agds-page-alert__sr-tone"
          }, toDisplayString(h2.value.iconLabel) + ". ", 9, bi),
          c.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            id: r.value,
            class: "agds-page-alert__title-wrap"
          }, [
            renderSlot(B.$slots, "title", {}, () => [
              createElementVNode("h2", yi, toDisplayString(n.title), 1)
            ], true)
          ], 8, _i)) : createCommentVNode("", true),
          B.$slots.default ? (openBlock(), createElementBlock("div", {
            key: 1,
            id: u.value,
            class: "agds-page-alert__content"
          }, [
            renderSlot(B.$slots, "default", {}, void 0, true)
          ], 8, ki)) : createCommentVNode("", true)
        ]),
        _.value ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          "aria-label": "Close",
          class: "agds-page-alert__close",
          onClick: I[0] || (I[0] = (P) => _.value())
        }, [...I[1] || (I[1] = [
          createElementVNode("span", { class: "agds-page-alert__close-label" }, "Close", -1),
          createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            focusable: "false",
            "aria-hidden": "true",
            class: "agds-page-alert__close-icon"
          }, [
            createElementVNode("path", { d: "M18 6 6 18M6 6l12 12" })
          ], -1)
        ])])) : createCommentVNode("", true)
      ], 2)
    ], 14, fi));
  }
}), $i = /* @__PURE__ */ A(Si, [["__scopeId", "data-v-6fcb44ed"]]), oa = /* @__PURE__ */ Symbol("AgDSCard"), xi = /* @__PURE__ */ defineComponent({
  __name: "AGDSCard",
  props: {
    as: { default: "div" },
    background: { default: "body" },
    clickable: { type: Boolean, default: false },
    footerOutside: { type: Boolean, default: false },
    shadow: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = useSlots(), a = computed(() => !!n.footer);
    provide(
      oa,
      reactive({
        get background() {
          return t.background;
        },
        get clickable() {
          return t.clickable;
        },
        get hasFooter() {
          return a.value;
        },
        get footerOutside() {
          return t.footerOutside;
        },
        get shadow() {
          return t.shadow;
        }
      })
    );
    const o = computed(() => [
      `agds-card--${t.background}`,
      t.shadow && "agds-card--shadow",
      t.clickable && "agds-card--clickable"
    ]);
    return (s, r) => t.footerOutside ? (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      key: 0,
      class: "agds-card agds-card--footer-outside"
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["agds-card__wrap", o.value])
        }, [
          renderSlot(s.$slots, "header", {}, void 0, true),
          renderSlot(s.$slots, "default", {}, void 0, true)
        ], 2),
        renderSlot(s.$slots, "footer", {}, void 0, true)
      ]),
      _: 3
    })) : (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      key: 1,
      class: normalizeClass(["agds-card", o.value])
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "header", {}, void 0, true),
        renderSlot(s.$slots, "default", {}, void 0, true),
        renderSlot(s.$slots, "footer", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["class"]));
  }
}), wi = /* @__PURE__ */ A(xi, [["__scopeId", "data-v-5d0bfba8"]]), Ai = /* @__PURE__ */ defineComponent({
  __name: "AGDSCardHeader",
  props: {
    background: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        "agds-card-header",
        t.background && `agds-card-header--${t.background}`
      ])
    }, [
      renderSlot(n.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), Di = /* @__PURE__ */ A(Ai, [["__scopeId", "data-v-7dc7b6b5"]]), Ci = /* @__PURE__ */ defineComponent({
  __name: "AGDSCardFooter",
  props: {
    background: {}
  },
  setup(e) {
    const t = e, n = inject(oa);
    return (a, o) => unref(n)?.footerOutside ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([
        "agds-card-footer agds-card-footer--outside",
        t.background && `agds-card-footer--${t.background}`
      ])
    }, [
      renderSlot(a.$slots, "default", {}, void 0, true)
    ], 2)) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass([
        "agds-card-footer",
        t.background && `agds-card-footer--${t.background}`
      ])
    }, [
      renderSlot(a.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), Ii = /* @__PURE__ */ A(Ci, [["__scopeId", "data-v-33287fe1"]]), Mi = { class: "agds-card-inner" }, Bi = /* @__PURE__ */ defineComponent({
  __name: "AGDSCardInner",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("div", Mi, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), Li = /* @__PURE__ */ A(Bi, [["__scopeId", "data-v-8cfc470e"]]), Ti = /* @__PURE__ */ defineComponent({
  inheritAttrs: false,
  __name: "AGDSCardLink",
  props: {
    as: { default: "a" }
  },
  setup(e) {
    const t = e, n = inject(oa), a = computed(() => !!n?.clickable);
    return (o, s) => (openBlock(), createBlock(resolveDynamicComponent(t.as), mergeProps(o.$attrs, {
      class: [
        "agds-card-link",
        a.value && "agds-card-link--clickable"
      ]
    }), {
      default: withCtx(() => [
        renderSlot(o.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 16, ["class"]));
  }
}), Fi = /* @__PURE__ */ A(Ti, [["__scopeId", "data-v-57095540"]]), Pi = { class: "agds-details" }, Oi = { class: "agds-details__summary" }, Vi = {
  key: 0,
  role: "img",
  "aria-label": "Information.",
  class: "agds-details__icon-before"
}, Ri = { class: "agds-details__label" }, Ei = /* @__PURE__ */ defineComponent({
  __name: "AGDSDetails",
  props: {
    label: {},
    iconBefore: { type: Boolean, default: false },
    onBodyAlt: { type: Boolean, default: false }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("details", Pi, [
      createElementVNode("summary", Oi, [
        e.iconBefore ? (openBlock(), createElementBlock("span", Vi, [...n[0] || (n[0] = [
          createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "currentColor",
            "aria-hidden": "true",
            focusable: "false",
            class: "agds-details__icon-svg"
          }, [
            createElementVNode("path", {
              "fill-rule": "evenodd",
              d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z",
              "clip-rule": "evenodd"
            })
          ], -1)
        ])])) : createCommentVNode("", true),
        createElementVNode("span", Ri, toDisplayString(e.label), 1),
        n[1] || (n[1] = createElementVNode("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true",
          focusable: "false",
          class: "agds-details__chevron"
        }, [
          createElementVNode("path", { d: "M6 9l6 6 6-6" })
        ], -1))
      ]),
      createElementVNode("div", {
        class: normalizeClass(["agds-details__content", { "agds-details__content--body-alt": e.onBodyAlt }])
      }, [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ], 2)
    ]));
  }
}), Gi = /* @__PURE__ */ A(Ei, [["__scopeId", "data-v-95913503"]]), qi = { class: "agds-tag" }, zi = ["aria-label"], Hi = /* @__PURE__ */ defineComponent({
  __name: "AGDSTag",
  props: {
    label: {},
    href: {},
    removable: { type: Boolean, default: false }
  },
  emits: ["remove"],
  setup(e, { expose: t, emit: n }) {
    const a = n, o = ref(null);
    return t({ focusRemoveButton: () => o.value?.focus() }), (s, r) => (openBlock(), createElementBlock("span", qi, [
      (openBlock(), createBlock(resolveDynamicComponent(e.href ? "a" : "span"), mergeProps(e.href ? { href: e.href } : {}, {
        class: ["agds-tag__label", { "agds-tag__label--link": !!e.href }]
      }), {
        default: withCtx(() => [
          createTextVNode(toDisplayString(e.label), 1)
        ]),
        _: 1
      }, 16, ["class"])),
      e.removable ? (openBlock(), createElementBlock("button", {
        key: 0,
        ref_key: "removeButtonRef",
        ref: o,
        type: "button",
        "aria-label": `Remove ${e.label}`,
        class: "agds-tag__remove",
        onClick: r[0] || (r[0] = (u) => a("remove", u))
      }, [
        createVNode(_e, {
          name: "mdi:close",
          size: "sm",
          "aria-hidden": "true"
        })
      ], 8, zi)) : createCommentVNode("", true)
    ]));
  }
}), nn = /* @__PURE__ */ A(Hi, [["__scopeId", "data-v-f65b9c8d"]]), Ni = { class: "agds-tags" }, ji = /* @__PURE__ */ defineComponent({
  __name: "AGDSTags",
  props: {
    items: {}
  },
  emits: ["remove"],
  setup(e, { emit: t }) {
    const n = t, a = ref(null);
    function o(s, r) {
      const u = a.value?.querySelectorAll(".agds-tag__remove");
      if (u?.length) {
        const g = Math.max(0, s - 1);
        u[g]?.focus();
      }
      n("remove", s, r);
    }
    return (s, r) => (openBlock(), createElementBlock("div", Ni, [
      renderSlot(s.$slots, "heading", {}, void 0, true),
      createElementVNode("ul", {
        ref_key: "listRef",
        ref: a,
        class: "agds-tags__list"
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (u, g) => (openBlock(), createElementBlock("li", {
          key: g,
          class: "agds-tags__item"
        }, [
          createVNode(nn, {
            label: u.label,
            href: u.href,
            removable: u.removable,
            onRemove: (c) => o(g, c)
          }, null, 8, ["label", "href", "removable", "onRemove"])
        ]))), 128))
      ], 512)
    ]));
  }
}), Wi = /* @__PURE__ */ A(ji, [["__scopeId", "data-v-453cd2d1"]]), Ui = /* @__PURE__ */ defineComponent({
  __name: "AGDSFooter",
  props: {
    background: { default: "body" },
    maxWidth: { default: "container" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("footer", {
      class: normalizeClass(["agds-footer", [`agds-footer--${e.background}`]])
    }, [
      createElementVNode("div", {
        class: normalizeClass(["agds-footer__inner", [`agds-footer__inner--${e.maxWidth}`]])
      }, [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ], 2)
    ], 2));
  }
}), Zi = /* @__PURE__ */ A(Ui, [["__scopeId", "data-v-b905b6be"]]), Ki = /* @__PURE__ */ defineComponent({
  __name: "AGDSFooterDivider",
  props: {
    color: { default: "accent" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("hr", {
      "aria-hidden": "true",
      class: normalizeClass(["agds-footer-divider", [`agds-footer-divider--${e.color}`]])
    }, null, 2));
  }
}), Yi = /* @__PURE__ */ A(Ki, [["__scopeId", "data-v-7b17447a"]]), Xi = {
  key: 0,
  class: "agds-header-brand agds-header-brand--dual"
}, Qi = ["href"], Ji = {
  key: 0,
  class: "agds-header-brand__divider agds-header-brand__divider--between",
  "aria-hidden": "true"
}, er = { class: "agds-header-brand__heading-row" }, tr = {
  key: 0,
  class: "agds-header-brand__divider agds-header-brand__divider--after",
  "aria-hidden": "true"
}, ar = ["href"], nr = { class: "agds-header-brand__title-wrap" }, or = {
  key: 0,
  class: "agds-header-brand__badge"
}, sr = ["href"], lr = {
  key: 1,
  class: "agds-header-brand__divider agds-header-brand__divider--single",
  "aria-hidden": "true"
}, ir = { class: "agds-header-brand__text" }, rr = { class: "agds-header-brand__title-wrap" }, dr = {
  key: 0,
  class: "agds-header-brand__badge"
}, ur = /* @__PURE__ */ defineComponent({
  __name: "AGDSHeaderBrand",
  props: {
    badgeLabel: {},
    dividerPosition: { default: "after" },
    hasRightContent: { type: Boolean, default: false },
    heading: {},
    href: { default: "/" },
    secondHref: {},
    size: { default: "md" },
    subline: {}
  },
  setup(e) {
    return (t, n) => t.$slots.logo && t.$slots.secondLogo ? (openBlock(), createElementBlock("div", Xi, [
      createElementVNode("div", {
        class: normalizeClass(["agds-header-brand__logos", {
          "agds-header-brand__logos--gap-right": e.hasRightContent && e.dividerPosition === "after"
        }])
      }, [
        createElementVNode("a", {
          href: e.href,
          class: normalizeClass(["agds-header-brand__logo-link", [`agds-header-brand__logo-link--${e.size}`]])
        }, [
          renderSlot(t.$slots, "logo", {}, void 0, true)
        ], 10, Qi),
        e.dividerPosition === "between" ? (openBlock(), createElementBlock("div", Ji)) : createCommentVNode("", true),
        (openBlock(), createBlock(resolveDynamicComponent(e.secondHref ? "a" : "span"), mergeProps(e.secondHref ? { href: e.secondHref } : {}, {
          class: ["agds-header-brand__logo-link agds-header-brand__logo-link--second", [`agds-header-brand__logo-link--${e.size}`]]
        }), {
          default: withCtx(() => [
            renderSlot(t.$slots, "secondLogo", {}, void 0, true)
          ]),
          _: 3
        }, 16, ["class"]))
      ], 2),
      createElementVNode("div", er, [
        e.dividerPosition === "after" ? (openBlock(), createElementBlock("div", tr)) : createCommentVNode("", true),
        createElementVNode("a", {
          href: e.href,
          class: "agds-header-brand__heading-link"
        }, [
          createElementVNode("div", nr, [
            createElementVNode("span", {
              class: normalizeClass(["agds-header-brand__heading", [`agds-header-brand__heading--${e.size}`]])
            }, toDisplayString(e.heading), 3),
            e.badgeLabel ? (openBlock(), createElementBlock("span", or, toDisplayString(e.badgeLabel), 1)) : createCommentVNode("", true)
          ]),
          e.subline ? (openBlock(), createElementBlock("span", {
            key: 0,
            class: normalizeClass(["agds-header-brand__subline", [`agds-header-brand__subline--${e.size}`]])
          }, toDisplayString(e.subline), 3)) : createCommentVNode("", true)
        ], 8, ar)
      ])
    ])) : (openBlock(), createElementBlock("a", {
      key: 1,
      href: e.href,
      class: "agds-header-brand agds-header-brand--single"
    }, [
      t.$slots.logo ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["agds-header-brand__logo-wrap", [`agds-header-brand__logo-wrap--${e.size}`]]),
        "aria-hidden": "true"
      }, [
        renderSlot(t.$slots, "logo", {}, void 0, true)
      ], 2)) : createCommentVNode("", true),
      t.$slots.logo ? (openBlock(), createElementBlock("div", lr)) : createCommentVNode("", true),
      createElementVNode("div", ir, [
        createElementVNode("div", rr, [
          createElementVNode("span", {
            class: normalizeClass(["agds-header-brand__heading", [`agds-header-brand__heading--${e.size}`]])
          }, toDisplayString(e.heading), 3),
          e.badgeLabel ? (openBlock(), createElementBlock("span", dr, toDisplayString(e.badgeLabel), 1)) : createCommentVNode("", true)
        ]),
        e.subline ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: normalizeClass(["agds-header-brand__subline", [`agds-header-brand__subline--${e.size}`]])
        }, toDisplayString(e.subline), 3)) : createCommentVNode("", true)
      ])
    ], 8, sr));
  }
}), on = /* @__PURE__ */ A(ur, [["__scopeId", "data-v-085d4a93"]]), cr = {
  key: 0,
  class: "agds-header__right-col"
}, gr = /* @__PURE__ */ defineComponent({
  __name: "AGDSHeader",
  props: {
    background: { default: "body" },
    badgeLabel: {},
    dividerPosition: { default: "after" },
    heading: {},
    href: { default: "/" },
    maxWidth: { default: "container" },
    secondHref: {},
    size: { default: "md" },
    subline: {}
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("header", {
      class: normalizeClass(["agds-header", [
        `agds-header--${e.background}`,
        `agds-header--${e.size}`
      ]])
    }, [
      createElementVNode("div", {
        class: normalizeClass(["agds-header__inner", [`agds-header__inner--${e.maxWidth}`]])
      }, [
        createElementVNode("div", {
          class: normalizeClass(["agds-header__brand-col", { "agds-header__brand-col--with-right": !!t.$slots.rightContent }])
        }, [
          createVNode(on, {
            "badge-label": e.badgeLabel,
            "divider-position": e.dividerPosition,
            "has-right-content": !!t.$slots.rightContent,
            heading: e.heading,
            href: e.href,
            "second-href": e.secondHref,
            size: e.size,
            subline: e.subline
          }, createSlots({ _: 2 }, [
            t.$slots.logo ? {
              name: "logo",
              fn: withCtx(() => [
                renderSlot(t.$slots, "logo", {}, void 0, true)
              ]),
              key: "0"
            } : void 0,
            t.$slots.secondLogo ? {
              name: "secondLogo",
              fn: withCtx(() => [
                renderSlot(t.$slots, "secondLogo", {}, void 0, true)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["badge-label", "divider-position", "has-right-content", "heading", "href", "second-href", "size", "subline"])
        ], 2),
        t.$slots.rightContent ? (openBlock(), createElementBlock("div", cr, [
          renderSlot(t.$slots, "rightContent", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2)
    ], 2));
  }
}), fr = /* @__PURE__ */ A(gr, [["__scopeId", "data-v-f1d1bde8"]]), sn = /* @__PURE__ */ Symbol("DropdownMenu");
function nt() {
  const e = inject(sn);
  if (!e)
    throw new Error("useDropdownMenuContext must be called within AgDSDropdownMenu");
  return e;
}
const mr = { class: "agds-dropdown-menu" }, vr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenu",
  props: {
    popoverPlacement: { default: "bottom-start" },
    popoverMaxHeight: {},
    popoverOffset: { default: 8 }
  },
  setup(e) {
    const t = e, a = `agds-dropdown-menu-${getCurrentInstance()?.uid ?? 0}`, o = `${a}-button`, s = `${a}-panel`, r = ref(false), u = ref(-1), g = ref(void 0), c = ref(0), f = ref(""), m = ref(0), p = ref(void 0), x = computed(() => r.value), h2 = computed(() => g.value?.[u.value]?.id), D = ref(null), _ = ref(null);
    function B() {
      r.value = true;
    }
    function I() {
      r.value = false, u.value = -1, g.value = void 0, c.value = 0, f.value = "", m.value = 0, p.value = void 0, nextTick(() => _.value?.focus());
    }
    function P() {
      r.value ? I() : B();
    }
    function H(q) {
      p.value = q, B();
    }
    function Y() {
      return p.value;
    }
    function U() {
      p.value = void 0;
    }
    function se(q) {
      g.value = q, c.value = q?.length ?? 0, f.value = "", m.value = 0;
    }
    function O() {
      u.value = 0, f.value = "", m.value = 0;
    }
    function V() {
      u.value = c.value - 1, f.value = "", m.value = 0;
    }
    function N() {
      const q = u.value, re = c.value;
      u.value = q < re - 1 ? q + 1 : 0, f.value = "", m.value = 0;
    }
    function le() {
      const q = u.value, re = c.value;
      u.value = q > 0 ? q - 1 : re - 1, f.value = "", m.value = 0;
    }
    function Q() {
      if (u.value === -1) return;
      g.value?.[u.value]?.click(), I();
    }
    function Z(q) {
      const re = Date.now(), me = re - m.value < 350, he = me ? f.value + q.toLowerCase() : q.toLowerCase(), ce = u.value >= 0 ? u.value : -1, De = me ? 0 : 1, ve = Array.from(g.value ?? []).map(
        (j) => (j.textContent ?? "").toLowerCase().replace(/(\r\n|\n|\r)/gm, "").trim()
      ), Me = ve.slice(ce + De).concat(ve.slice(0, ce + De)).find((j) => j.startsWith(he)), R = Me ? ve.indexOf(Me) : ce;
      f.value = he, u.value = R, m.value = re;
    }
    return provide(sn, {
      isMenuOpen: x,
      menuId: a,
      buttonId: o,
      panelId: s,
      activeDescendantId: h2,
      openMenu: B,
      closeMenu: I,
      toggleMenu: P,
      openMenuWithKey: H,
      getPendingOpenKey: Y,
      clearPendingOpenKey: U,
      goToFirstMenuItem: O,
      goToLastMenuItem: V,
      goToNextMenuItem: N,
      goToPreviousMenuItem: le,
      clickSelectedItem: Q,
      updateDescendantSearchTerm: Z,
      setDescendantNodes: se,
      panelRef: D,
      triggerRef: _,
      popoverPlacement: t.popoverPlacement,
      popoverMaxHeight: t.popoverMaxHeight,
      popoverOffset: t.popoverOffset
    }), (q, re) => (openBlock(), createElementBlock("div", mr, [
      renderSlot(q.$slots, "default", { isMenuOpen: x.value }, void 0, true)
    ]));
  }
}), ln = /* @__PURE__ */ A(vr, [["__scopeId", "data-v-b81045cb"]]), pr = ["id", "disabled", "aria-controls", "aria-expanded"], hr = { class: "agds-button__label agds-dropdown-menu-btn__label" }, br = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuButton",
  props: {
    variant: { default: "text" },
    size: { default: "md" },
    block: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  setup(e) {
    const { isMenuOpen: t, buttonId: n, panelId: a, toggleMenu: o, openMenuWithKey: s, triggerRef: r } = nt(), u = ref(null);
    function g() {
      u.value?.focus(), o();
    }
    function c(f) {
      ["ArrowDown", "ArrowUp", "Space", "Enter"].includes(f.code) && (f.preventDefault(), s(f.code));
    }
    return (f, m) => (openBlock(), createElementBlock("button", {
      ref_key: "buttonEl",
      ref: u,
      id: unref(n),
      type: "button",
      disabled: e.disabled,
      "aria-haspopup": true,
      "aria-controls": unref(a),
      "aria-expanded": unref(t),
      class: normalizeClass([
        "agds-button",
        `agds-button--${e.variant}`,
        `agds-button--${e.size}`,
        { "agds-button--block": e.block },
        "agds-dropdown-menu-btn"
      ]),
      onClick: g,
      onKeydown: c
    }, [
      createElementVNode("span", hr, [
        renderSlot(f.$slots, "default", {}, void 0, true)
      ]),
      createElementVNode("span", {
        "aria-hidden": "true",
        class: normalizeClass(["agds-dropdown-menu-btn__chevron", { "agds-dropdown-menu-btn__chevron--open": unref(t) }])
      }, [...m[0] || (m[0] = [
        createElementVNode("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true"
        }, [
          createElementVNode("polyline", { points: "6 9 12 15 18 9" })
        ], -1)
      ])], 2)
    ], 42, pr));
  }
}), rn = /* @__PURE__ */ A(br, [["__scopeId", "data-v-fabe2256"]]), _r = ["id"], yr = ["id", "aria-labelledby", "aria-activedescendant"], kr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuPanel",
  setup(e) {
    const {
      isMenuOpen: t,
      panelId: n,
      buttonId: a,
      activeDescendantId: o,
      popoverPlacement: s,
      popoverMaxHeight: r,
      popoverOffset: u,
      panelRef: g,
      triggerRef: c,
      setDescendantNodes: f,
      closeMenu: m,
      goToPreviousMenuItem: p,
      goToNextMenuItem: x,
      goToFirstMenuItem: h2,
      goToLastMenuItem: D,
      clickSelectedItem: _,
      updateDescendantSearchTerm: B,
      getPendingOpenKey: I,
      clearPendingOpenKey: P
    } = nt(), H = ref(null);
    watch(H, (O) => {
      g.value = O;
    }), watch(t, async (O) => {
      if (!O) return;
      await nextTick();
      const V = H.value?.querySelectorAll('[role="menuitem"], [role="menuitemradio"]');
      f(V), H.value?.focus({ preventScroll: true });
      const N = I();
      P(), N === "ArrowUp" ? D() : N && h2();
    });
    function U(O) {
      switch (O.code) {
        case "ArrowUp":
          O.preventDefault(), p();
          break;
        case "ArrowDown":
          O.preventDefault(), x();
          break;
        case "Home":
          O.preventDefault(), h2();
          break;
        case "End":
          O.preventDefault(), D();
          break;
        case "Escape":
          O.preventDefault(), m();
          break;
        case "Enter":
        case "Space":
          O.preventDefault(), _();
          break;
        case "Tab":
          m();
          break;
        default:
          /^[a-zA-Z]$/.test(O.key) && !O.metaKey && !O.ctrlKey && (O.preventDefault(), B(O.key));
      }
    }
    const se = computed(() => ({
      top: `calc(100% + ${u}px)`,
      maxHeight: r ? `${r}px` : void 0
    }));
    return (O, V) => unref(t) ? (openBlock(), createElementBlock("div", {
      key: 1,
      ref_key: "panelEl",
      ref: H,
      id: unref(n),
      role: "menu",
      tabindex: "-1",
      "aria-labelledby": unref(a),
      "aria-activedescendant": unref(o) ?? void 0,
      class: normalizeClass([
        "agds-dropdown-menu__panel",
        `agds-dropdown-menu__panel--${unref(s)}`
      ]),
      style: normalizeStyle(se.value),
      onKeydown: U
    }, [
      renderSlot(O.$slots, "default", {}, void 0, true)
    ], 46, yr)) : (openBlock(), createElementBlock("div", {
      key: 0,
      id: unref(n),
      class: "agds-dropdown-menu__placeholder"
    }, null, 8, _r));
  }
}), dn = /* @__PURE__ */ A(kr, [["__scopeId", "data-v-2ee68137"]]), Sr = ["id"], $r = { class: "agds-dm-item__content" }, xr = { class: "agds-dm-item__label" }, wr = {
  key: 0,
  class: "agds-dm-item__end"
}, Ar = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuItem",
  props: {
    id: {},
    icon: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, a = t, { menuId: o, activeDescendantId: s, closeMenu: r } = nt(), u = getCurrentInstance()?.uid ?? 0, g = computed(() => n.id ?? `${o}-item-${u}`), c = computed(() => g.value === s.value), f = ref(null);
    watch(c, (p) => {
      p && typeof f.value?.scrollIntoView == "function" && f.value.scrollIntoView({ block: "nearest" });
    });
    function m(p) {
      a("click", p), r();
    }
    return (p, x) => (openBlock(), createElementBlock("div", {
      ref_key: "itemEl",
      ref: f,
      id: g.value,
      role: "menuitem",
      tabindex: "-1",
      class: normalizeClass(["agds-dm-item", { "agds-dm-item--active": c.value }]),
      onClick: m
    }, [
      createElementVNode("div", $r, [
        e.icon ? (openBlock(), createBlock(resolveDynamicComponent(e.icon), {
          key: 0,
          class: "agds-dm-item__icon",
          "aria-hidden": "true"
        })) : createCommentVNode("", true),
        createElementVNode("span", xr, [
          renderSlot(p.$slots, "default", {}, void 0, true)
        ])
      ]),
      p.$slots.endElement ? (openBlock(), createElementBlock("div", wr, [
        renderSlot(p.$slots, "endElement", {}, void 0, true)
      ])) : createCommentVNode("", true)
    ], 10, Sr));
  }
}), Dr = /* @__PURE__ */ A(Ar, [["__scopeId", "data-v-ed060a8e"]]), Cr = ["id", "href", "target", "rel"], Ir = { class: "agds-dm-item__content" }, Mr = { class: "agds-dm-item__label" }, Br = {
  key: 0,
  class: "sr-only"
}, Lr = {
  key: 0,
  class: "agds-dm-item__end"
}, Tr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuItemLink",
  props: {
    href: {},
    id: {},
    icon: {},
    target: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, a = t, { menuId: o, activeDescendantId: s, closeMenu: r } = nt(), u = getCurrentInstance()?.uid ?? 0, g = computed(() => n.id ?? `${o}-item-${u}`), c = computed(() => g.value === s.value), f = computed(() => n.target === "_blank"), m = ref(null);
    watch(c, (x) => {
      x && typeof m.value?.scrollIntoView == "function" && m.value.scrollIntoView({ block: "nearest" });
    });
    function p(x) {
      a("click", x), r();
    }
    return (x, h2) => (openBlock(), createElementBlock("a", {
      ref_key: "itemEl",
      ref: m,
      id: g.value,
      href: e.href,
      target: e.target,
      rel: f.value ? "noopener noreferrer" : void 0,
      role: "menuitem",
      tabindex: "-1",
      class: normalizeClass(["agds-dm-item", { "agds-dm-item--active": c.value }]),
      onClick: p
    }, [
      createElementVNode("div", Ir, [
        e.icon ? (openBlock(), createBlock(resolveDynamicComponent(e.icon), {
          key: 0,
          class: "agds-dm-item__icon",
          "aria-hidden": "true"
        })) : createCommentVNode("", true),
        createElementVNode("span", Mr, [
          renderSlot(x.$slots, "default", {}, void 0, true),
          f.value ? (openBlock(), createElementBlock("span", Br, ", opens in a new tab")) : createCommentVNode("", true)
        ])
      ]),
      x.$slots.endElement ? (openBlock(), createElementBlock("div", Lr, [
        renderSlot(x.$slots, "endElement", {}, void 0, true)
      ])) : createCommentVNode("", true)
    ], 10, Cr));
  }
}), un = /* @__PURE__ */ A(Tr, [["__scopeId", "data-v-dae541f6"]]), Fr = ["id", "aria-checked"], Pr = { class: "agds-dm-radio__stack" }, Or = {
  key: 0,
  class: "agds-dm-radio__secondary"
}, Vr = {
  key: 0,
  class: "agds-dm-radio__end"
}, Rr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuItemRadio",
  props: {
    checked: { type: Boolean },
    id: {},
    secondaryText: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, a = t, { menuId: o, activeDescendantId: s, closeMenu: r } = nt(), u = getCurrentInstance()?.uid ?? 0, g = computed(() => n.id ?? `${o}-item-${u}`), c = computed(() => g.value === s.value), f = ref(null);
    watch(c, (p) => {
      p && typeof f.value?.scrollIntoView == "function" && f.value.scrollIntoView({ block: "nearest" });
    });
    function m() {
      a("click"), r();
    }
    return (p, x) => (openBlock(), createElementBlock("div", {
      ref_key: "itemEl",
      ref: f,
      id: g.value,
      role: "menuitemradio",
      tabindex: "-1",
      "aria-checked": e.checked,
      class: normalizeClass([
        "agds-dm-radio",
        {
          "agds-dm-radio--active": c.value,
          "agds-dm-radio--checked": e.checked
        }
      ]),
      onClick: m
    }, [
      createElementVNode("div", Pr, [
        createElementVNode("span", {
          class: normalizeClass([
            "agds-dm-radio__label",
            { "agds-dm-radio__label--checked": e.checked }
          ])
        }, [
          renderSlot(p.$slots, "default", {}, void 0, true)
        ], 2),
        e.secondaryText ? (openBlock(), createElementBlock("span", Or, toDisplayString(e.secondaryText), 1)) : createCommentVNode("", true)
      ]),
      p.$slots.endElement ? (openBlock(), createElementBlock("div", Vr, [
        renderSlot(p.$slots, "endElement", {}, void 0, true)
      ])) : createCommentVNode("", true)
    ], 10, Fr));
  }
}), Er = /* @__PURE__ */ A(Rr, [["__scopeId", "data-v-fa3319d4"]]), Gr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuGroup",
  props: {
    label: {}
  },
  setup(e) {
    const { menuId: t } = nt(), n = getCurrentInstance()?.uid ?? 0, a = `${t}-group-${n}`;
    return (o, s) => (openBlock(), createElementBlock("div", {
      role: "group",
      "aria-labelledby": a,
      class: "agds-dm-group"
    }, [
      createElementVNode("span", {
        id: a,
        class: "agds-dm-group__label"
      }, toDisplayString(e.label), 1),
      renderSlot(o.$slots, "default", {}, void 0, true)
    ]));
  }
}), qr = /* @__PURE__ */ A(Gr, [["__scopeId", "data-v-dad22ed0"]]), zr = ["aria-hidden"], Hr = { class: "agds-divider__text" }, Nr = ["aria-hidden"], jr = /* @__PURE__ */ defineComponent({
  __name: "AGDSDivider",
  props: {
    ariaHidden: { type: Boolean, default: true },
    textAlign: { default: "center" }
  },
  setup(e) {
    const t = e, n = useSlots(), a = computed(() => !!n.default);
    return (o, s) => a.value ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass(["agds-divider agds-divider--with-text", `agds-divider--align-${t.textAlign}`]),
      role: "separator",
      "aria-hidden": t.ariaHidden ? "true" : void 0
    }, [
      s[0] || (s[0] = createElementVNode("hr", {
        class: "agds-divider__line",
        "aria-hidden": "true"
      }, null, -1)),
      createElementVNode("div", Hr, [
        renderSlot(o.$slots, "default", {}, void 0, true)
      ]),
      s[1] || (s[1] = createElementVNode("hr", {
        class: "agds-divider__line",
        "aria-hidden": "true"
      }, null, -1))
    ], 10, zr)) : (openBlock(), createElementBlock("hr", {
      key: 1,
      class: "agds-divider",
      "aria-hidden": t.ariaHidden ? "true" : void 0
    }, null, 8, Nr));
  }
}), cn = /* @__PURE__ */ A(jr, [["__scopeId", "data-v-f2f47ea9"]]), Wr = {
  class: "agds-dm-divider",
  role: "separator",
  "aria-hidden": "true"
}, Ur = /* @__PURE__ */ defineComponent({
  __name: "AGDSDropdownMenuDivider",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("div", Wr, [
      createVNode(cn)
    ]));
  }
}), Zr = /* @__PURE__ */ A(Ur, [["__scopeId", "data-v-bf52894b"]]), Kr = /* @__PURE__ */ defineComponent({
  __name: "AGDSHeading",
  props: {
    type: { default: "h2" },
    as: {}
  },
  setup(e) {
    const t = e, n = {
      h1: "var(--agds-font-size-4xl)",
      h2: "var(--agds-font-size-3xl)",
      h3: "var(--agds-font-size-2xl)",
      h4: "var(--agds-font-size-xl)",
      h5: "var(--agds-font-size-lg)",
      h6: "var(--agds-font-size-md)"
    }, a = t.as ?? t.type, o = n[t.type];
    return (s, r) => (openBlock(), createBlock(resolveDynamicComponent(unref(a)), {
      class: normalizeClass(["agds-heading", `agds-heading--${t.type}`]),
      style: normalizeStyle({ fontSize: unref(o) })
    }, {
      default: withCtx(() => [
        renderSlot(s.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["class", "style"]));
  }
}), He = /* @__PURE__ */ A(Kr, [["__scopeId", "data-v-c5f1faef"]]), Yr = /* @__PURE__ */ defineComponent({
  __name: "AGDSH1",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h1" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Xr = /* @__PURE__ */ defineComponent({
  __name: "AGDSH2",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h2" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Qr = /* @__PURE__ */ defineComponent({
  __name: "AGDSH3",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h3" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), Jr = /* @__PURE__ */ defineComponent({
  __name: "AGDSH4",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h4" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ed = /* @__PURE__ */ defineComponent({
  __name: "AGDSH5",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h5" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), td = /* @__PURE__ */ defineComponent({
  __name: "AGDSH6",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(He, mergeProps({ type: "h6" }, t.$attrs), {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }, 16));
  }
}), ad = ["href", "target", "rel"], nd = { class: "agds-feature-link-list-item__text" }, od = { class: "agds-feature-link-list-item__label" }, sd = {
  key: 0,
  class: "agds-feature-link-list-item__secondary"
}, ld = {
  key: 0,
  class: "sr-only"
}, id = /* @__PURE__ */ defineComponent({
  __name: "AGDSFeatureLinkListItem",
  props: {
    href: {},
    label: {},
    secondaryText: {},
    external: { type: Boolean, default: false },
    background: { default: "body" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("li", {
      class: normalizeClass(["agds-feature-link-list-item", `agds-feature-link-list-item--bg-${e.background}`])
    }, [
      createElementVNode("a", {
        href: e.href,
        target: e.external ? "_blank" : void 0,
        rel: e.external ? "noopener noreferrer" : void 0,
        class: "agds-feature-link-list-item__link"
      }, [
        createElementVNode("span", nd, [
          createElementVNode("span", od, toDisplayString(e.label), 1),
          e.secondaryText ? (openBlock(), createElementBlock("span", sd, toDisplayString(e.secondaryText), 1)) : createCommentVNode("", true)
        ]),
        n[0] || (n[0] = createElementVNode("svg", {
          class: "agds-feature-link-list-item__chevron",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round",
          "aria-hidden": "true",
          focusable: "false"
        }, [
          createElementVNode("polyline", { points: "9 18 15 12 9 6" })
        ], -1)),
        e.external ? (openBlock(), createElementBlock("span", ld, ", opens in a new tab")) : createCommentVNode("", true)
      ], 8, ad)
    ], 2));
  }
}), gn = /* @__PURE__ */ A(id, [["__scopeId", "data-v-3de423b9"]]), rd = { class: "agds-feature-link-list" }, dd = /* @__PURE__ */ defineComponent({
  __name: "AGDSFeatureLinkList",
  props: {
    links: {},
    background: { default: "body" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("ul", rd, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.links, (a, o) => (openBlock(), createBlock(gn, mergeProps({ key: o }, { ref_for: true }, a, { background: e.background }), null, 16, ["background"]))), 128))
    ]));
  }
}), ud = /* @__PURE__ */ A(dd, [["__scopeId", "data-v-13873e69"]]), cd = { class: "agds-link-list-item" }, gd = ["href", "target", "rel"], fd = {
  key: 0,
  class: "sr-only"
}, md = /* @__PURE__ */ defineComponent({
  __name: "AGDSLinkListItem",
  props: {
    href: {},
    label: {},
    target: {}
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("li", cd, [
      createElementVNode("a", {
        href: e.href,
        target: e.target,
        rel: e.target === "_blank" ? "noopener noreferrer" : void 0,
        class: "agds-link-list-item__link"
      }, [
        createTextVNode(toDisplayString(e.label) + " ", 1),
        e.target === "_blank" ? (openBlock(), createElementBlock("span", fd, ", opens in a new tab")) : createCommentVNode("", true)
      ], 8, gd)
    ]));
  }
}), fn = /* @__PURE__ */ A(md, [["__scopeId", "data-v-657564fd"]]), vd = /* @__PURE__ */ defineComponent({
  __name: "AGDSLinkList",
  props: {
    links: {},
    horizontal: { type: Boolean, default: false }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("ul", {
      class: normalizeClass(["agds-link-list", e.horizontal ? "agds-link-list--horizontal" : "agds-link-list--vertical"])
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.links, (a, o) => (openBlock(), createBlock(fn, mergeProps({ key: o }, { ref_for: true }, a), null, 16))), 128))
    ], 2));
  }
}), pd = /* @__PURE__ */ A(vd, [["__scopeId", "data-v-f737ef8d"]]), bt = /* @__PURE__ */ Symbol("AgDSListDepth"), hd = /* @__PURE__ */ defineComponent({
  __name: "AGDSUnorderedList",
  setup(e) {
    const n = inject(bt, 0) + 1;
    provide(bt, n);
    const a = computed(() => n > 1);
    return (o, s) => (openBlock(), createElementBlock("ul", {
      class: normalizeClass(["agds-unordered-list", { "agds-list--nested": a.value }])
    }, [
      renderSlot(o.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), bd = /* @__PURE__ */ A(hd, [["__scopeId", "data-v-f6f107f0"]]), _d = /* @__PURE__ */ defineComponent({
  __name: "AGDSOrderedList",
  setup(e) {
    const n = inject(bt, 0) + 1;
    provide(bt, n);
    const a = computed(() => n > 1);
    return (o, s) => (openBlock(), createElementBlock("ol", {
      class: normalizeClass(["agds-ordered-list", { "agds-list--nested": a.value }])
    }, [
      renderSlot(o.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), yd = /* @__PURE__ */ A(_d, [["__scopeId", "data-v-ff0451d1"]]), kd = { class: "agds-list-item" }, Sd = /* @__PURE__ */ defineComponent({
  __name: "AGDSListItem",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("li", kd, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), $d = /* @__PURE__ */ A(Sd, [["__scopeId", "data-v-ff5045d7"]]), xd = /* @__PURE__ */ defineComponent({
  __name: "AGDSText",
  props: {
    as: { default: "span" },
    color: { default: "text" },
    fontFamily: { default: "body" },
    fontSize: { default: "sm" },
    fontWeight: { default: "normal" },
    lineHeight: { default: "normal" }
  },
  setup(e) {
    const t = e, n = {
      text: "var(--agds-color-text)",
      muted: "var(--agds-color-text-muted)",
      inverse: "var(--agds-color-text-inverse)",
      disabled: "var(--agds-color-text-disabled)"
    }, a = {
      body: "var(--agds-font-family-body)",
      heading: "var(--agds-font-family-heading)",
      mono: "var(--agds-font-family-mono)"
    }, o = {
      xs: "var(--agds-font-size-xs)",
      sm: "var(--agds-font-size-sm)",
      md: "var(--agds-font-size-md)",
      lg: "var(--agds-font-size-lg)",
      xl: "var(--agds-font-size-xl)",
      "2xl": "var(--agds-font-size-2xl)",
      "3xl": "var(--agds-font-size-3xl)",
      "4xl": "var(--agds-font-size-4xl)"
    }, s = {
      normal: "var(--agds-font-weight-normal)",
      medium: "var(--agds-font-weight-medium)",
      semibold: "var(--agds-font-weight-semibold)",
      bold: "var(--agds-font-weight-bold)"
    }, r = {
      tight: "var(--agds-line-height-tight)",
      snug: "var(--agds-line-height-snug)",
      normal: "var(--agds-line-height-normal)",
      relaxed: "var(--agds-line-height-relaxed)"
    }, u = computed(() => ({
      color: n[t.color],
      fontFamily: a[t.fontFamily],
      fontSize: o[t.fontSize],
      fontWeight: s[t.fontWeight],
      lineHeight: r[t.lineHeight]
    }));
    return (g, c) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      class: "agds-text",
      style: normalizeStyle(u.value)
    }, {
      default: withCtx(() => [
        renderSlot(g.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["style"]));
  }
}), mn = /* @__PURE__ */ A(xd, [["__scopeId", "data-v-4aeb7e1f"]]);
function vn({ currentPage: e, totalPages: t, windowLimit: n }) {
  const a = [];
  let o = 1, s = t;
  if (n < t) {
    const r = Math.floor(n / 2), u = r + n % 2 - 1;
    o = e - u, s = e + r, o < 1 && (s = n, o = 1), s > t && (o = t - n + 1, s = t);
  }
  e > 1 && a.push({ type: "direction", direction: "left", pageNumber: e - 1 }), o > 1 && (a.push({ type: "page", pageNumber: 1, isActive: e === 1 }), o > 3 ? a.push({ type: "separator", pageNumber: 0 }) : o !== 2 && a.push({ type: "page", pageNumber: 2, isActive: e === 2 }));
  for (let r = o; r <= s; r++)
    a.push({ type: "page", pageNumber: r, isActive: r === e });
  return s + 1 < t && (s + 1 !== t - 1 ? a.push({ type: "separator", pageNumber: 0 }) : a.push({
    type: "page",
    pageNumber: t - 1,
    isActive: e === t - 1
  })), s < t && a.push({ type: "page", pageNumber: t, isActive: e === t }), e < t && a.push({ type: "direction", direction: "right", pageNumber: e + 1 }), a;
}
function pn(e, t, n) {
  const a = e[t - 1], o = e[t + 1], s = (a?.pageNumber ?? 0) + 1, r = (o?.pageNumber ?? 0) - 1;
  return `… Pages ${s} to ${r} are hidden. Use the Previous and Next ${n ? "links" : "buttons"} to navigate`;
}
const wd = ["aria-label"], Ad = { class: "agds-pagination__list" }, Dd = ["href", "aria-label"], Cd = {
  key: 0,
  class: "agds-pagination__arrow",
  "aria-hidden": "true",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Id = { class: "agds-pagination__direction-label" }, Md = {
  key: 1,
  class: "agds-pagination__arrow",
  "aria-hidden": "true",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Bd = {
  key: 1,
  class: "agds-pagination__item"
}, Ld = ["href", "aria-label", "aria-current"], Td = ["aria-label"], Fd = {
  key: 0,
  class: "agds-pagination__secondary"
}, Pd = {
  key: 0,
  role: "status",
  class: "agds-pagination__range"
}, Od = {
  key: 1,
  class: "agds-pagination__per-page"
}, Vd = { class: "agds-pagination__select-wrap" }, Rd = ["value"], Ed = ["value"], Gd = /* @__PURE__ */ defineComponent({
  __name: "AGDSPagination",
  props: {
    ariaLabel: { default: "Pagination" },
    currentPage: {},
    generateHref: {},
    itemRangeText: {},
    itemsPerPage: {},
    itemsPerPageOptions: { default: () => [10, 20, 50, 100] },
    totalPages: {},
    windowLimit: { default: 3 }
  },
  emits: ["itemsPerPageChange"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `agds-pagination-per-page-${getCurrentInstance()?.uid ?? 0}`, r = computed(
      () => vn({
        currentPage: n.currentPage,
        totalPages: n.totalPages,
        windowLimit: n.windowLimit
      })
    ), u = computed(
      () => n.itemsPerPage !== void 0
    ), g = computed(
      () => !!n.itemRangeText || u.value
    );
    function c(p, x) {
      return p.type === "direction" ? p.direction : p.type === "page" ? `page-${p.pageNumber}` : `separator-${x}`;
    }
    function f(p) {
      return pn(r.value, p, true);
    }
    function m(p) {
      const x = Number(p.target.value);
      a("itemsPerPageChange", x);
    }
    return (p, x) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["agds-pagination", { "agds-pagination--has-secondary": g.value }])
    }, [
      createElementVNode("nav", {
        "aria-label": e.ariaLabel,
        class: "agds-pagination__nav"
      }, [
        createElementVNode("ol", Ad, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(r.value, (h2, D) => (openBlock(), createElementBlock(Fragment, {
            key: c(h2, D)
          }, [
            h2.type === "direction" ? (openBlock(), createElementBlock("li", {
              key: 0,
              class: normalizeClass([
                "agds-pagination__item",
                `agds-pagination__item--${h2.direction}`
              ])
            }, [
              createElementVNode("a", {
                href: e.generateHref(h2.pageNumber),
                "aria-label": h2.direction === "left" ? "Go to previous page" : "Go to next page",
                class: "agds-pagination__direction"
              }, [
                h2.direction === "left" ? (openBlock(), createElementBlock("svg", Cd, [...x[0] || (x[0] = [
                  createElementVNode("polyline", { points: "15 18 9 12 15 6" }, null, -1)
                ])])) : createCommentVNode("", true),
                createElementVNode("span", Id, toDisplayString(h2.direction === "left" ? "Previous" : "Next"), 1),
                h2.direction === "right" ? (openBlock(), createElementBlock("svg", Md, [...x[1] || (x[1] = [
                  createElementVNode("polyline", { points: "9 18 15 12 9 6" }, null, -1)
                ])])) : createCommentVNode("", true)
              ], 8, Dd)
            ], 2)) : h2.type === "page" ? (openBlock(), createElementBlock("li", Bd, [
              createElementVNode("a", {
                href: e.generateHref(h2.pageNumber),
                "aria-label": `Go to page ${h2.pageNumber}`,
                "aria-current": h2.isActive ? "page" : void 0,
                class: normalizeClass([
                  "agds-pagination__page",
                  { "agds-pagination__page--active": h2.isActive }
                ])
              }, toDisplayString(h2.pageNumber), 11, Ld)
            ])) : h2.type === "separator" ? (openBlock(), createElementBlock("li", {
              key: 2,
              class: "agds-pagination__item agds-pagination__separator",
              "aria-label": f(D)
            }, [...x[2] || (x[2] = [
              createElementVNode("span", {
                "aria-hidden": "true",
                class: "agds-pagination__ellipsis"
              }, "…", -1)
            ])], 8, Td)) : createCommentVNode("", true)
          ], 64))), 128))
        ])
      ], 8, wd),
      g.value ? (openBlock(), createElementBlock("div", Fd, [
        e.itemRangeText ? (openBlock(), createElementBlock("p", Pd, toDisplayString(e.itemRangeText), 1)) : createCommentVNode("", true),
        u.value ? (openBlock(), createElementBlock("div", Od, [
          createElementVNode("label", {
            for: s,
            class: "agds-pagination__per-page-label"
          }, " Items per page "),
          createElementVNode("div", Vd, [
            createElementVNode("select", {
              id: s,
              value: e.itemsPerPage,
              class: "agds-pagination__select",
              onChange: m
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(e.itemsPerPageOptions, (h2) => (openBlock(), createElementBlock("option", {
                key: h2,
                value: h2
              }, toDisplayString(h2), 9, Ed))), 128))
            ], 40, Rd)
          ])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ], 2));
  }
}), qd = /* @__PURE__ */ A(Gd, [["__scopeId", "data-v-818e0963"]]), zd = ["aria-label"], Hd = { class: "agds-pagination__list" }, Nd = ["aria-label", "onClick"], jd = {
  key: 0,
  class: "agds-pagination__arrow",
  "aria-hidden": "true",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Wd = { class: "agds-pagination__direction-label" }, Ud = {
  key: 1,
  class: "agds-pagination__arrow",
  "aria-hidden": "true",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
}, Zd = {
  key: 1,
  class: "agds-pagination__item"
}, Kd = ["aria-label", "aria-current", "onClick"], Yd = ["aria-label"], Xd = {
  key: 0,
  class: "agds-pagination__secondary"
}, Qd = {
  key: 0,
  role: "status",
  class: "agds-pagination__range"
}, Jd = {
  key: 1,
  class: "agds-pagination__per-page"
}, eu = { class: "agds-pagination__select-wrap" }, tu = ["value"], au = ["value"], nu = /* @__PURE__ */ defineComponent({
  __name: "AGDSPaginationButtons",
  props: {
    ariaLabel: { default: "Pagination" },
    currentPage: {},
    itemRangeText: {},
    itemsPerPage: {},
    itemsPerPageOptions: { default: () => [10, 20, 50, 100] },
    totalPages: {},
    windowLimit: { default: 3 }
  },
  emits: ["change", "itemsPerPageChange"],
  setup(e, { emit: t }) {
    const n = e, a = t, s = `agds-pagination-per-page-${getCurrentInstance()?.uid ?? 0}`, r = ref(false), u = ref(null);
    watch(
      () => n.currentPage,
      async (_) => {
        r.value && _ === 1 && (await nextTick(), u.value?.focus(), r.value = false);
      }
    );
    const g = computed(
      () => vn({
        currentPage: n.currentPage,
        totalPages: n.totalPages,
        windowLimit: n.windowLimit
      })
    ), c = computed(() => n.itemsPerPage !== void 0), f = computed(
      () => !!n.itemRangeText || c.value
    );
    function m(_, B) {
      return _.type === "direction" ? _.direction : _.type === "page" ? `page-${_.pageNumber}` : `separator-${B}`;
    }
    function p(_) {
      return pn(g.value, _, false);
    }
    function x(_) {
      a("change", _.pageNumber), _.direction === "left" && _.pageNumber === 1 && (r.value = true);
    }
    function h2(_) {
      a("change", _);
    }
    function D(_) {
      const B = Number(_.target.value);
      a("itemsPerPageChange", B);
    }
    return (_, B) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["agds-pagination", { "agds-pagination--has-secondary": f.value }])
    }, [
      createElementVNode("nav", {
        "aria-label": e.ariaLabel,
        class: "agds-pagination__nav"
      }, [
        createElementVNode("ol", Hd, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(g.value, (I, P) => (openBlock(), createElementBlock(Fragment, {
            key: m(I, P)
          }, [
            I.type === "direction" ? (openBlock(), createElementBlock("li", {
              key: 0,
              class: normalizeClass([
                "agds-pagination__item",
                `agds-pagination__item--${I.direction}`
              ])
            }, [
              createElementVNode("button", {
                type: "button",
                "aria-label": I.direction === "left" ? "Go to previous page" : "Go to next page",
                class: "agds-pagination__direction",
                onClick: (H) => x(I)
              }, [
                I.direction === "left" ? (openBlock(), createElementBlock("svg", jd, [...B[0] || (B[0] = [
                  createElementVNode("polyline", { points: "15 18 9 12 15 6" }, null, -1)
                ])])) : createCommentVNode("", true),
                createElementVNode("span", Wd, toDisplayString(I.direction === "left" ? "Previous" : "Next"), 1),
                I.direction === "right" ? (openBlock(), createElementBlock("svg", Ud, [...B[1] || (B[1] = [
                  createElementVNode("polyline", { points: "9 18 15 12 9 6" }, null, -1)
                ])])) : createCommentVNode("", true)
              ], 8, Nd)
            ], 2)) : I.type === "page" ? (openBlock(), createElementBlock("li", Zd, [
              createElementVNode("button", {
                ref_for: true,
                ref: I.pageNumber === 1 ? (H) => {
                  u.value = H;
                } : void 0,
                type: "button",
                "aria-label": `Go to page ${I.pageNumber}`,
                "aria-current": I.isActive ? "page" : void 0,
                class: normalizeClass([
                  "agds-pagination__page",
                  { "agds-pagination__page--active": I.isActive }
                ]),
                onClick: (H) => h2(I.pageNumber)
              }, toDisplayString(I.pageNumber), 11, Kd)
            ])) : I.type === "separator" ? (openBlock(), createElementBlock("li", {
              key: 2,
              class: "agds-pagination__item agds-pagination__separator",
              "aria-label": p(P)
            }, [...B[2] || (B[2] = [
              createElementVNode("span", {
                "aria-hidden": "true",
                class: "agds-pagination__ellipsis"
              }, "…", -1)
            ])], 8, Yd)) : createCommentVNode("", true)
          ], 64))), 128))
        ])
      ], 8, zd),
      f.value ? (openBlock(), createElementBlock("div", Xd, [
        e.itemRangeText ? (openBlock(), createElementBlock("p", Qd, toDisplayString(e.itemRangeText), 1)) : createCommentVNode("", true),
        c.value ? (openBlock(), createElementBlock("div", Jd, [
          createElementVNode("label", {
            for: s,
            class: "agds-pagination__per-page-label"
          }, " Items per page "),
          createElementVNode("div", eu, [
            createElementVNode("select", {
              id: s,
              value: e.itemsPerPage,
              class: "agds-pagination__select",
              onChange: D
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(e.itemsPerPageOptions, (I) => (openBlock(), createElementBlock("option", {
                key: I,
                value: I
              }, toDisplayString(I), 9, au))), 128))
            ], 40, tu)
          ])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true)
    ], 2));
  }
}), ou = /* @__PURE__ */ A(nu, [["__scopeId", "data-v-97c4d4de"]]), su = { class: "agds-modal__body" }, lu = {
  key: 0,
  class: "agds-modal__actions"
}, iu = /* @__PURE__ */ defineComponent({
  __name: "AGDSModal",
  props: {
    modelValue: { type: Boolean },
    title: {}
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = useTemplateRef("titleRef");
    function s(r) {
      r.preventDefault(), o.value?.$el?.focus();
    }
    return watch(
      () => n.modelValue,
      (r) => {
      },
      { immediate: true }
    ), (r, u) => (openBlock(), createBlock(unref(DialogRoot), {
      open: n.modelValue,
      "onUpdate:open": u[0] || (u[0] = (g) => a("update:modelValue", g))
    }, {
      default: withCtx(() => [
        createVNode(unref(DialogPortal), { "force-mount": "" }, {
          default: withCtx(() => [
            createVNode(unref(DialogOverlay), { class: "agds-modal__overlay" }),
            createVNode(unref(DialogContent), {
              class: "agds-modal__dialog",
              onOpenAutoFocus: s
            }, {
              default: withCtx(() => [
                createVNode(unref(DialogClose), { "as-child": "" }, {
                  default: withCtx(() => [...u[1] || (u[1] = [
                    createElementVNode("button", {
                      type: "button",
                      class: "agds-modal__close",
                      "aria-label": "Close modal"
                    }, [
                      createElementVNode("svg", {
                        class: "agds-modal__close-icon",
                        "aria-hidden": "true",
                        xmlns: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2.5",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createElementVNode("line", {
                          x1: "18",
                          y1: "6",
                          x2: "6",
                          y2: "18"
                        }),
                        createElementVNode("line", {
                          x1: "6",
                          y1: "6",
                          x2: "18",
                          y2: "18"
                        })
                      ]),
                      createElementVNode("span", null, "Close")
                    ], -1)
                  ])]),
                  _: 1
                }),
                createVNode(unref(DialogTitle), {
                  ref_key: "titleRef",
                  ref: o,
                  tabindex: "-1",
                  class: "agds-modal__title"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(n.title), 1)
                  ]),
                  _: 1
                }, 512),
                createElementVNode("div", su, [
                  renderSlot(r.$slots, "default", {}, void 0, true)
                ]),
                r.$slots.actions ? (openBlock(), createElementBlock("div", lu, [
                  renderSlot(r.$slots, "actions", {}, void 0, true)
                ])) : createCommentVNode("", true)
              ]),
              _: 3
            })
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["open"]));
  }
}), ru = /* @__PURE__ */ A(iu, [["__scopeId", "data-v-bfa37f82"]]), du = { class: "agds-drawer__header" }, uu = ["aria-label"], cu = {
  key: 0,
  class: "agds-drawer__footer"
}, gu = /* @__PURE__ */ defineComponent({
  __name: "AGDSDrawer",
  props: {
    modelValue: { type: Boolean },
    title: {},
    width: { default: "md" },
    mutedOverlay: { type: Boolean, default: false },
    elementToFocusOnClose: { default: null }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    let o = 0;
    const s = `agds-drawer-title-${++o}`, r = ref(null), u = ref(null);
    function c() {
      a("update:modelValue", false);
    }
    watch(
      () => n.modelValue,
      async (m) => {
      },
      { immediate: true }
    );
    function f(m) {
      if (m.key === "Escape") {
        m.preventDefault(), m.stopPropagation(), c();
        return;
      }
      if (m.key === "Tab") {
        const p = Array.from(
          r.value?.querySelectorAll(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]'
          ) ?? []
        );
        if (!p.length) return;
        const x = p[0], h2 = p[p.length - 1];
        m.shiftKey && (void 0).activeElement === x ? (m.preventDefault(), h2.focus()) : !m.shiftKey && (void 0).activeElement === h2 && (m.preventDefault(), x.focus());
      }
    }
    return (m, p) => (openBlock(), createBlock(Teleport, { to: "body" }, [
      createVNode(Transition, { name: "agds-drawer-overlay" }, {
        default: withCtx(() => [
          e.modelValue ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["agds-drawer__overlay", { "agds-drawer__overlay--muted": e.mutedOverlay }]),
            "aria-hidden": "true",
            onClick: c
          }, null, 2)) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(Transition, { name: "agds-drawer-panel" }, {
        default: withCtx(() => [
          e.modelValue ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "drawerEl",
            ref: r,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": s,
            class: normalizeClass(["agds-drawer", `agds-drawer--${e.width}`]),
            onKeydown: f
          }, [
            createElementVNode("div", du, [
              createElementVNode("h2", {
                ref_key: "titleEl",
                ref: u,
                id: s,
                class: "agds-drawer__title",
                tabindex: "-1"
              }, toDisplayString(e.title), 513),
              createElementVNode("button", {
                type: "button",
                class: "agds-drawer__close",
                "aria-label": "Close",
                onClick: c
              }, [...p[0] || (p[0] = [
                createElementVNode("svg", {
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  class: "agds-drawer__close-icon"
                }, [
                  createElementVNode("line", {
                    x1: "18",
                    y1: "6",
                    x2: "6",
                    y2: "18"
                  }),
                  createElementVNode("line", {
                    x1: "6",
                    y1: "6",
                    x2: "18",
                    y2: "18"
                  })
                ], -1),
                createElementVNode("span", null, "Close", -1)
              ])])
            ]),
            createElementVNode("section", {
              class: "agds-drawer__body",
              "aria-label": `${e.title} content`,
              tabindex: "0"
            }, [
              renderSlot(m.$slots, "default", {}, void 0, true)
            ], 8, uu),
            m.$slots.actions ? (openBlock(), createElementBlock("div", cu, [
              renderSlot(m.$slots, "actions", {}, void 0, true)
            ])) : createCommentVNode("", true)
          ], 34)) : createCommentVNode("", true)
        ]),
        _: 3
      })
    ]));
  }
}), fu = /* @__PURE__ */ A(gu, [["__scopeId", "data-v-2624a4e4"]]), mu = /* @__PURE__ */ defineComponent({
  __name: "AGDSTabs",
  props: {
    modelValue: {},
    defaultValue: {},
    contained: { type: Boolean, default: true },
    background: { default: "body" }
  },
  emits: ["update:modelValue"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = ref("horizontal");
    return provide("tabsBackground", n.background), provide("tabsContained", n.contained), (u, g) => (openBlock(), createBlock(unref(TabsRoot), {
      "model-value": n.modelValue,
      "default-value": n.defaultValue,
      orientation: o.value,
      class: normalizeClass([
        "agds-tabs",
        n.background === "bodyAlt" && "agds-tabs--body-alt"
      ]),
      "onUpdate:modelValue": g[0] || (g[0] = (c) => a("update:modelValue", c))
    }, {
      default: withCtx(() => [
        renderSlot(u.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["model-value", "default-value", "orientation", "class"]));
  }
}), vu = /* @__PURE__ */ A(mu, [["__scopeId", "data-v-5acf89f8"]]), pu = /* @__PURE__ */ defineComponent({
  __name: "AGDSTabList",
  props: {
    ariaLabel: { default: void 0 }
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(unref(TabsList), {
      "aria-label": t.ariaLabel,
      class: "agds-tab-list"
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["aria-label"]));
  }
}), hu = /* @__PURE__ */ A(pu, [["__scopeId", "data-v-c7938db0"]]), bu = { class: "agds-tab__label" }, _u = /* @__PURE__ */ defineComponent({
  __name: "AGDSTab",
  props: {
    value: {},
    disabled: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(unref(TabsTrigger), {
      value: t.value,
      disabled: t.disabled,
      class: "agds-tab"
    }, {
      default: withCtx(() => [
        createElementVNode("span", bu, [
          renderSlot(n.$slots, "default", {}, void 0, true)
        ]),
        renderSlot(n.$slots, "end-element", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["value", "disabled"]));
  }
}), yu = /* @__PURE__ */ A(_u, [["__scopeId", "data-v-a00ce61e"]]), ku = /* @__PURE__ */ defineComponent({
  __name: "AGDSTabPanel",
  props: {
    value: {}
  },
  setup(e) {
    const t = e, n = inject("tabsContained", true);
    return (a, o) => (openBlock(), createBlock(unref(TabsContent), {
      value: t.value,
      class: normalizeClass([
        "agds-tab-panel",
        unref(n) ? "agds-tab-panel--contained" : "agds-tab-panel--edge"
      ])
    }, {
      default: withCtx(() => [
        renderSlot(a.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["value", "class"]));
  }
}), Su = /* @__PURE__ */ A(ku, [["__scopeId", "data-v-075bd973"]]), hn = /* @__PURE__ */ Symbol("CheckboxGroup"), $u = ["for"], xu = { class: "agds-checkbox__control" }, wu = ["id", "name", "checked", "disabled", "required", "aria-checked", "aria-invalid", "aria-required", "aria-describedby"], Au = {
  key: 0,
  class: "agds-checkbox__icon agds-checkbox__icon--check",
  viewBox: "0 0 12 10",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  focusable: "false"
}, Du = {
  key: 1,
  class: "agds-checkbox__icon agds-checkbox__icon--minus",
  viewBox: "0 0 12 2",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  focusable: "false"
}, Cu = /* @__PURE__ */ defineComponent({
  __name: "AGDSCheckbox",
  props: {
    id: {},
    name: {},
    modelValue: { type: Boolean, default: false },
    value: { type: [String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
    indeterminate: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n;
    let s = 0;
    const r = `agds-checkbox-${++s}`, u = computed(() => a.id ?? r), g = inject(hn, null), c = computed(() => a.name ?? g?.name ?? void 0), f = computed(
      () => typeof a.invalid == "boolean" && a.invalid ? true : g?.invalid ?? false
    ), m = computed(
      () => typeof a.required == "boolean" && a.required ? true : g?.required ?? false
    ), p = computed(() => a.disabled || (g?.disabled ?? false)), x = computed(
      () => f.value && g?.messageId ? g.messageId : void 0
    ), h2 = ref(null);
    t({ focus: () => h2.value?.focus() });
    function D() {
      h2.value && (h2.value.indeterminate = !!a.indeterminate);
    }
    watch(() => a.indeterminate, D);
    const _ = computed(() => a.indeterminate ? false : a.modelValue);
    function B(I) {
      if (p.value) return;
      const P = I.target;
      o("update:modelValue", P.checked), o("change", I);
    }
    return (I, P) => (openBlock(), createElementBlock("label", {
      for: u.value,
      class: normalizeClass(["agds-checkbox", [
        `agds-checkbox--${a.size}`,
        { "agds-checkbox--disabled": p.value }
      ]])
    }, [
      createElementVNode("span", xu, [
        createElementVNode("input", mergeProps({
          id: u.value,
          ref_key: "inputRef",
          ref: h2,
          type: "checkbox",
          class: "agds-checkbox__input",
          name: c.value,
          checked: _.value,
          disabled: p.value,
          required: m.value || void 0,
          "aria-checked": a.indeterminate ? "mixed" : void 0,
          "aria-invalid": f.value || void 0,
          "aria-required": m.value || void 0,
          "aria-describedby": x.value
        }, I.$attrs, {
          onChange: B,
          onFocus: P[0] || (P[0] = (H) => o("focus", H)),
          onBlur: P[1] || (P[1] = (H) => o("blur", H))
        }), null, 16, wu),
        createElementVNode("span", {
          class: normalizeClass(["agds-checkbox__indicator", {
            "agds-checkbox__indicator--invalid": f.value,
            "agds-checkbox__indicator--disabled": p.value
          }]),
          "aria-hidden": "true"
        }, [
          a.indeterminate ? (openBlock(), createElementBlock("svg", Du, [...P[3] || (P[3] = [
            createElementVNode("path", {
              d: "M1 1H11",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round"
            }, null, -1)
          ])])) : (openBlock(), createElementBlock("svg", Au, [...P[2] || (P[2] = [
            createElementVNode("path", {
              d: "M1 5L4.5 8.5L11 1.5",
              stroke: "currentColor",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, null, -1)
          ])]))
        ], 2)
      ]),
      I.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["agds-checkbox__label", { "agds-checkbox__label--disabled": p.value }])
      }, [
        renderSlot(I.$slots, "default", {}, void 0, true)
      ], 2)) : createCommentVNode("", true)
    ], 10, $u));
  }
}), bn = /* @__PURE__ */ A(Cu, [["__scopeId", "data-v-2d8ac97b"]]), Iu = ["disabled"], Mu = {
  key: 0,
  class: "agds-checkbox-group__legend"
}, Bu = {
  key: 0,
  class: "agds-checkbox-group__required",
  "aria-hidden": "true"
}, Lu = {
  key: 1,
  class: "agds-checkbox-group__hint"
}, Tu = ["id"], Fu = { class: "agds-checkbox-group__items" }, Pu = /* @__PURE__ */ defineComponent({
  __name: "AGDSCheckboxGroup",
  props: {
    name: {},
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    messageId: {},
    legend: {}
  },
  setup(e) {
    const t = e;
    return provide(hn, {
      get name() {
        return t.name;
      },
      get invalid() {
        return t.invalid;
      },
      get required() {
        return t.required;
      },
      get disabled() {
        return t.disabled;
      },
      get messageId() {
        return t.messageId;
      }
    }), (n, a) => (openBlock(), createElementBlock("fieldset", {
      class: normalizeClass(["agds-checkbox-group", { "agds-checkbox-group--invalid": t.invalid }]),
      disabled: t.disabled || void 0
    }, [
      t.legend || n.$slots.legend ? (openBlock(), createElementBlock("legend", Mu, [
        renderSlot(n.$slots, "legend", {}, () => [
          createTextVNode(toDisplayString(t.legend), 1)
        ], true),
        t.required ? (openBlock(), createElementBlock("span", Bu, " *")) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      n.$slots.hint ? (openBlock(), createElementBlock("div", Lu, [
        renderSlot(n.$slots, "hint", {}, void 0, true)
      ])) : createCommentVNode("", true),
      t.invalid && n.$slots.message ? (openBlock(), createElementBlock("div", {
        key: 2,
        id: t.messageId,
        class: "agds-checkbox-group__message",
        role: "alert",
        "aria-live": "assertive"
      }, [
        renderSlot(n.$slots, "message", {}, void 0, true)
      ], 8, Tu)) : createCommentVNode("", true),
      createElementVNode("div", Fu, [
        renderSlot(n.$slots, "default", {}, void 0, true)
      ])
    ], 10, Iu));
  }
}), Ou = /* @__PURE__ */ A(Pu, [["__scopeId", "data-v-f541f74a"]]), Vu = /* @__PURE__ */ defineComponent({
  __name: "AGDSFieldContainer",
  props: {
    invalid: { type: Boolean, default: false }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["agds-field-container", { "agds-field-container--invalid": e.invalid }])
    }, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), Bt = /* @__PURE__ */ A(Vu, [["__scopeId", "data-v-aeac4f4e"]]), Ru = { class: "agds-field-label__primary" }, Eu = {
  key: 0,
  class: "agds-field-label__secondary"
}, Gu = /* @__PURE__ */ defineComponent({
  __name: "AGDSFieldLabel",
  props: {
    htmlFor: {},
    id: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    secondaryLabel: {},
    as: { default: "label" }
  },
  setup(e) {
    const t = e;
    function n() {
      return t.hideOptionalLabel || t.required ? t.secondaryLabel || void 0 : t.secondaryLabel ? `${t.secondaryLabel} (optional)` : "(optional)";
    }
    return (a, o) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      for: t.as === "label" ? t.htmlFor : void 0,
      id: t.id,
      class: "agds-field-label"
    }, {
      default: withCtx(() => [
        createElementVNode("span", Ru, [
          renderSlot(a.$slots, "default", {}, void 0, true)
        ]),
        n() ? (openBlock(), createElementBlock("span", Eu, toDisplayString(" " + n()), 1)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["for", "id"]));
  }
}), Lt = /* @__PURE__ */ A(Gu, [["__scopeId", "data-v-03e45694"]]), qu = ["id"], zu = /* @__PURE__ */ defineComponent({
  __name: "AGDSFieldHint",
  props: {
    id: {}
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("span", {
      id: e.id,
      class: "agds-field-hint"
    }, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ], 8, qu));
  }
}), Tt = /* @__PURE__ */ A(zu, [["__scopeId", "data-v-4e1678bc"]]), Hu = ["id"], Nu = { class: "agds-field-message__text" }, ju = /* @__PURE__ */ defineComponent({
  __name: "AGDSFieldMessage",
  props: {
    id: {}
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("span", {
      id: e.id,
      class: "agds-field-message",
      role: "alert"
    }, [
      createVNode(_e, {
        name: "mdi:alert-circle",
        size: "md",
        "aria-label": "Error",
        class: "agds-field-message__icon"
      }),
      createElementVNode("span", Nu, [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ])
    ], 8, Hu));
  }
}), Ft = /* @__PURE__ */ A(ju, [["__scopeId", "data-v-4ded11d3"]]), Wu = /* @__PURE__ */ Symbol("ControlGroup"), Uu = ["aria-describedby"], Zu = /* @__PURE__ */ defineComponent({
  __name: "AGDSControlGroup",
  props: {
    block: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    hint: {},
    id: {},
    invalid: { type: Boolean, default: false },
    label: {},
    name: {},
    message: {},
    required: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), a = computed(() => t.id ?? `control-group-${n}`), o = computed(() => `control-group-${n}-hint`), s = computed(() => `control-group-${n}-message`), r = computed(() => t.name ?? `control-group-${n}-name`), u = computed(() => {
      const g = [];
      return t.message && t.invalid && g.push(s.value), t.hint && g.push(o.value), g.length ? g.join(" ") : void 0;
    });
    return provide(Wu, {
      get invalid() {
        return t.invalid;
      },
      get messageId() {
        return t.invalid && t.message ? s.value : void 0;
      },
      get name() {
        return r.value;
      },
      get required() {
        return t.required;
      }
    }), (g, c) => (openBlock(), createBlock(Bt, {
      id: a.value,
      invalid: t.invalid
    }, {
      default: withCtx(() => [
        createElementVNode("fieldset", {
          class: "agds-control-group",
          "aria-describedby": u.value
        }, [
          t.label ? (openBlock(), createBlock(Lt, {
            key: 0,
            as: "legend",
            required: t.required,
            "hide-optional-label": t.hideOptionalLabel
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(t.label), 1)
            ]),
            _: 1
          }, 8, ["required", "hide-optional-label"])) : createCommentVNode("", true),
          createElementVNode("div", {
            class: normalizeClass(["agds-control-group__meta", { "agds-control-group__meta--has-label": t.label }])
          }, [
            t.hint ? (openBlock(), createBlock(Tt, {
              key: 0,
              id: o.value
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(t.hint), 1)
              ]),
              _: 1
            }, 8, ["id"])) : createCommentVNode("", true),
            t.message && t.invalid ? (openBlock(), createBlock(Ft, {
              key: 1,
              id: s.value
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(t.message), 1)
              ]),
              _: 1
            }, 8, ["id"])) : createCommentVNode("", true),
            createElementVNode("div", {
              class: normalizeClass(["agds-control-group__items", { "agds-control-group__items--block": t.block }])
            }, [
              renderSlot(g.$slots, "default", {}, void 0, true)
            ], 2)
          ], 2)
        ], 8, Uu)
      ]),
      _: 3
    }, 8, ["id", "invalid"]));
  }
}), mb = /* @__PURE__ */ A(Zu, [["__scopeId", "data-v-da353d19"]]), Ku = ["for"], Yu = ["id", "name", "checked", "disabled", "required", "aria-invalid", "aria-required"], Xu = /* @__PURE__ */ defineComponent({
  __name: "AGDSSwitch",
  props: {
    id: {},
    name: {},
    modelValue: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n;
    let s = 0;
    const r = `agds-switch-${++s}`, u = computed(() => a.id ?? r), g = ref(null);
    t({ focus: () => g.value?.focus() });
    function c(f) {
      if (a.disabled) return;
      const m = f.target;
      o("update:modelValue", m.checked), o("change", f);
    }
    return (f, m) => (openBlock(), createElementBlock("label", {
      for: u.value,
      class: normalizeClass(["agds-switch", [
        `agds-switch--${a.size}`,
        { "agds-switch--disabled": a.disabled }
      ]])
    }, [
      createElementVNode("input", mergeProps({
        id: u.value,
        ref_key: "inputRef",
        ref: g,
        type: "checkbox",
        role: "switch",
        class: "agds-switch__input",
        name: a.name,
        checked: a.modelValue,
        disabled: a.disabled,
        required: a.required || void 0,
        "aria-invalid": a.invalid || void 0,
        "aria-required": a.required || void 0
      }, f.$attrs, {
        onChange: c,
        onFocus: m[0] || (m[0] = (p) => o("focus", p)),
        onBlur: m[1] || (m[1] = (p) => o("blur", p))
      }), null, 16, Yu),
      createElementVNode("span", {
        class: normalizeClass(["agds-switch__track", {
          "agds-switch__track--invalid": a.invalid,
          "agds-switch__track--disabled": a.disabled
        }]),
        "aria-hidden": "true"
      }, [...m[2] || (m[2] = [
        createElementVNode("span", { class: "agds-switch__thumb" }, null, -1)
      ])], 2),
      f.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["agds-switch__label", { "agds-switch__label--disabled": a.disabled }])
      }, [
        renderSlot(f.$slots, "default", {}, void 0, true)
      ], 2)) : createCommentVNode("", true)
    ], 10, Ku));
  }
}), Qu = /* @__PURE__ */ A(Xu, [["__scopeId", "data-v-bf048749"]]), _n = /* @__PURE__ */ Symbol("RadioGroup"), Ju = ["for"], ec = { class: "agds-radio__control" }, tc = ["id", "name", "value", "checked", "disabled", "required", "aria-invalid", "aria-required", "aria-describedby"], ac = /* @__PURE__ */ defineComponent({
  __name: "AGDSRadio",
  props: {
    id: {},
    name: {},
    modelValue: { type: [String, Number, Boolean] },
    value: { type: [String, Number, Boolean] },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { default: "md" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n;
    let s = 0;
    const r = `agds-radio-${++s}`, u = computed(() => a.id ?? r), g = inject(_n, null), c = computed(() => a.name ?? g?.name ?? void 0), f = computed(
      () => typeof a.invalid == "boolean" && a.invalid ? true : g?.invalid ?? false
    ), m = computed(
      () => typeof a.required == "boolean" && a.required ? true : g?.required ?? false
    ), p = computed(() => a.disabled || (g?.disabled ?? false)), x = computed(
      () => f.value && g?.messageId ? g.messageId : void 0
    ), h2 = computed(() => a.modelValue === a.value);
    function D(B) {
      p.value || (o("update:modelValue", a.value), o("change", B));
    }
    const _ = ref(null);
    return t({ focus: () => _.value?.focus() }), (B, I) => (openBlock(), createElementBlock("label", {
      for: u.value,
      class: normalizeClass(["agds-radio", [
        `agds-radio--${a.size}`,
        { "agds-radio--disabled": p.value }
      ]])
    }, [
      createElementVNode("span", ec, [
        createElementVNode("input", mergeProps({
          id: u.value,
          ref_key: "inputRef",
          ref: _,
          type: "radio",
          class: "agds-radio__input",
          name: c.value,
          value: a.value,
          checked: h2.value,
          disabled: p.value,
          required: m.value || void 0,
          "aria-invalid": f.value || void 0,
          "aria-required": m.value || void 0,
          "aria-describedby": x.value
        }, B.$attrs, {
          onChange: D,
          onFocus: I[0] || (I[0] = (P) => o("focus", P)),
          onBlur: I[1] || (I[1] = (P) => o("blur", P))
        }), null, 16, tc),
        createElementVNode("span", {
          class: normalizeClass(["agds-radio__indicator", {
            "agds-radio__indicator--invalid": f.value,
            "agds-radio__indicator--disabled": p.value
          }]),
          "aria-hidden": "true"
        }, [...I[2] || (I[2] = [
          createElementVNode("span", { class: "agds-radio__dot" }, null, -1)
        ])], 2)
      ]),
      B.$slots.default ? (openBlock(), createElementBlock("span", {
        key: 0,
        class: normalizeClass(["agds-radio__label", { "agds-radio__label--disabled": p.value }])
      }, [
        renderSlot(B.$slots, "default", {}, void 0, true)
      ], 2)) : createCommentVNode("", true)
    ], 10, Ju));
  }
}), nc = /* @__PURE__ */ A(ac, [["__scopeId", "data-v-f9e45fdd"]]), oc = ["disabled"], sc = {
  key: 0,
  class: "agds-radio-group__legend"
}, lc = {
  key: 0,
  class: "agds-radio-group__required",
  "aria-hidden": "true"
}, ic = {
  key: 1,
  class: "agds-radio-group__hint"
}, rc = ["id"], dc = { class: "agds-radio-group__items" }, uc = /* @__PURE__ */ defineComponent({
  __name: "AGDSRadioGroup",
  props: {
    name: {},
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    messageId: {},
    legend: {}
  },
  setup(e) {
    const t = e;
    return provide(_n, {
      get name() {
        return t.name;
      },
      get invalid() {
        return t.invalid;
      },
      get required() {
        return t.required;
      },
      get disabled() {
        return t.disabled;
      },
      get messageId() {
        return t.messageId;
      }
    }), (n, a) => (openBlock(), createElementBlock("fieldset", {
      class: normalizeClass(["agds-radio-group", { "agds-radio-group--invalid": t.invalid }]),
      disabled: t.disabled || void 0
    }, [
      t.legend || n.$slots.legend ? (openBlock(), createElementBlock("legend", sc, [
        renderSlot(n.$slots, "legend", {}, () => [
          createTextVNode(toDisplayString(t.legend), 1)
        ], true),
        t.required ? (openBlock(), createElementBlock("span", lc, " *")) : createCommentVNode("", true)
      ])) : createCommentVNode("", true),
      n.$slots.hint ? (openBlock(), createElementBlock("div", ic, [
        renderSlot(n.$slots, "hint", {}, void 0, true)
      ])) : createCommentVNode("", true),
      t.invalid && n.$slots.message ? (openBlock(), createElementBlock("div", {
        key: 2,
        id: t.messageId,
        class: "agds-radio-group__message",
        role: "alert",
        "aria-live": "assertive"
      }, [
        renderSlot(n.$slots, "message", {}, void 0, true)
      ], 8, rc)) : createCommentVNode("", true),
      createElementVNode("div", dc, [
        renderSlot(n.$slots, "default", {}, void 0, true)
      ])
    ], 10, oc));
  }
}), cc = /* @__PURE__ */ A(uc, [["__scopeId", "data-v-758acbb9"]]), gc = ["href", "target", "rel"], fc = {
  key: 0,
  class: "sr-only"
}, mc = /* @__PURE__ */ defineComponent({
  __name: "AGDSCallToActionLink",
  props: {
    href: {},
    external: { type: Boolean, default: false },
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur"],
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("a", {
      href: e.href,
      target: e.external ? "_blank" : void 0,
      rel: e.external ? "noopener noreferrer" : void 0,
      class: normalizeClass([
        "agds-cta",
        { "agds-cta--focus-all": e.focusRingFor === "all" }
      ]),
      onClick: n[0] || (n[0] = (a) => t.$emit("click", a)),
      onFocus: n[1] || (n[1] = (a) => t.$emit("focus", a)),
      onBlur: n[2] || (n[2] = (a) => t.$emit("blur", a))
    }, [
      renderSlot(t.$slots, "default", {}, void 0, true),
      createVNode(_e, {
        name: "mdi:chevron-right",
        size: "sm",
        class: "agds-cta__icon",
        "aria-hidden": "true"
      }),
      e.external ? (openBlock(), createElementBlock("span", fc, ", opens in a new tab")) : createCommentVNode("", true)
    ], 42, gc));
  }
}), vc = /* @__PURE__ */ A(mc, [["__scopeId", "data-v-51e5d28d"]]), pc = ["type", "disabled", "aria-busy", "aria-disabled"], hc = {
  "aria-live": "assertive",
  class: "agds-cta__live-region"
}, bc = {
  key: 0,
  class: "agds-cta__loading-indicator"
}, _c = { class: "sr-only" }, yc = /* @__PURE__ */ defineComponent({
  __name: "AGDSCallToActionButton",
  props: {
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingLabel: { default: "Loading" },
    type: { default: "button" },
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur", "keydown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ref(null);
    t({ focus: () => s.value?.focus() });
    function r(u) {
      s.value?.focus(), !a.disabled && !a.loading && o("click", u);
    }
    return (u, g) => (openBlock(), createElementBlock("button", {
      ref_key: "buttonRef",
      ref: s,
      type: a.type,
      disabled: a.disabled || a.loading,
      "aria-busy": a.loading ? true : void 0,
      "aria-disabled": a.disabled || a.loading ? true : void 0,
      class: normalizeClass([
        "agds-cta",
        {
          "agds-cta--focus-all": a.focusRingFor === "all",
          "agds-cta--disabled": a.disabled,
          "agds-cta--loading": a.loading
        }
      ]),
      onClick: r,
      onFocus: g[0] || (g[0] = (c) => o("focus", c)),
      onBlur: g[1] || (g[1] = (c) => o("blur", c)),
      onKeydown: g[2] || (g[2] = (c) => o("keydown", c))
    }, [
      createElementVNode("span", {
        class: normalizeClass(["agds-cta__label", { "agds-cta__label--hidden": a.loading }])
      }, [
        renderSlot(u.$slots, "default", {}, void 0, true)
      ], 2),
      createVNode(_e, {
        name: "mdi:chevron-right",
        size: "sm",
        class: normalizeClass(["agds-cta__icon", { "agds-cta__icon--hidden": a.loading }]),
        "aria-hidden": "true"
      }, null, 8, ["class"]),
      createElementVNode("span", hc, [
        a.loading ? (openBlock(), createElementBlock("span", bc, [
          g[3] || (g[3] = createElementVNode("span", {
            class: "agds-cta__spinner",
            "aria-hidden": "true"
          }, null, -1)),
          createElementVNode("span", _c, toDisplayString(a.loadingLabel), 1)
        ])) : createCommentVNode("", true)
      ])
    ], 42, pc));
  }
}), kc = /* @__PURE__ */ A(yc, [["__scopeId", "data-v-44321ecd"]]), Sc = ["href", "target", "rel"], $c = {
  key: 2,
  class: "sr-only"
}, xc = /* @__PURE__ */ defineComponent({
  __name: "AGDSDirectionLink",
  props: {
    href: {},
    direction: {},
    external: { type: Boolean, default: false },
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur"],
  setup(e) {
    const t = {
      up: "mdi:arrow-up",
      right: "mdi:arrow-right",
      down: "mdi:arrow-down",
      left: "mdi:arrow-left"
    };
    return (n, a) => (openBlock(), createElementBlock("a", {
      href: e.href,
      target: e.external ? "_blank" : void 0,
      rel: e.external ? "noopener noreferrer" : void 0,
      class: normalizeClass([
        "agds-direction-link",
        { "agds-direction-link--focus-all": e.focusRingFor === "all" }
      ]),
      onClick: a[0] || (a[0] = (o) => n.$emit("click", o)),
      onFocus: a[1] || (a[1] = (o) => n.$emit("focus", o)),
      onBlur: a[2] || (a[2] = (o) => n.$emit("blur", o))
    }, [
      e.direction === "left" ? (openBlock(), createBlock(_e, {
        key: 0,
        name: t[e.direction],
        size: "sm",
        class: "agds-direction-link__icon",
        "aria-hidden": "true"
      }, null, 8, ["name"])) : createCommentVNode("", true),
      renderSlot(n.$slots, "default", {}, void 0, true),
      e.direction !== "left" ? (openBlock(), createBlock(_e, {
        key: 1,
        name: t[e.direction],
        size: "sm",
        class: "agds-direction-link__icon",
        "aria-hidden": "true"
      }, null, 8, ["name"])) : createCommentVNode("", true),
      e.external ? (openBlock(), createElementBlock("span", $c, ", opens in a new tab")) : createCommentVNode("", true)
    ], 42, Sc));
  }
}), wc = /* @__PURE__ */ A(xc, [["__scopeId", "data-v-43796b90"]]), Ac = ["type", "disabled", "aria-busy", "aria-disabled"], Dc = {
  "aria-live": "assertive",
  class: "agds-direction-link__live-region"
}, Cc = {
  key: 0,
  class: "agds-direction-link__loading-indicator"
}, Ic = { class: "sr-only" }, Mc = /* @__PURE__ */ defineComponent({
  __name: "AGDSDirectionButton",
  props: {
    direction: {},
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    loadingLabel: { default: "Loading" },
    type: { default: "button" },
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur", "keydown"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = ref(null);
    t({ focus: () => s.value?.focus() });
    function r(g) {
      s.value?.focus(), !a.disabled && !a.loading && o("click", g);
    }
    const u = {
      up: "mdi:arrow-up",
      right: "mdi:arrow-right",
      down: "mdi:arrow-down",
      left: "mdi:arrow-left"
    };
    return (g, c) => (openBlock(), createElementBlock("button", {
      ref_key: "buttonRef",
      ref: s,
      type: a.type,
      disabled: a.disabled || a.loading,
      "aria-busy": a.loading ? true : void 0,
      "aria-disabled": a.disabled || a.loading ? true : void 0,
      class: normalizeClass([
        "agds-direction-link",
        {
          "agds-direction-link--focus-all": a.focusRingFor === "all",
          "agds-direction-link--disabled": a.disabled,
          "agds-direction-link--loading": a.loading
        }
      ]),
      onClick: r,
      onFocus: c[0] || (c[0] = (f) => o("focus", f)),
      onBlur: c[1] || (c[1] = (f) => o("blur", f)),
      onKeydown: c[2] || (c[2] = (f) => o("keydown", f))
    }, [
      a.direction === "left" ? (openBlock(), createBlock(_e, {
        key: 0,
        name: u[a.direction],
        size: "sm",
        class: "agds-direction-link__icon",
        "aria-hidden": "true"
      }, null, 8, ["name"])) : createCommentVNode("", true),
      createElementVNode("span", {
        class: normalizeClass(["agds-direction-link__label", { "agds-direction-link__label--hidden": a.loading }])
      }, [
        renderSlot(g.$slots, "default", {}, void 0, true)
      ], 2),
      a.direction !== "left" ? (openBlock(), createBlock(_e, {
        key: 1,
        name: u[a.direction],
        size: "sm",
        class: normalizeClass(["agds-direction-link__icon", { "agds-direction-link__icon--hidden": a.loading }]),
        "aria-hidden": "true"
      }, null, 8, ["name", "class"])) : createCommentVNode("", true),
      createElementVNode("span", Dc, [
        a.loading ? (openBlock(), createElementBlock("span", Cc, [
          c[3] || (c[3] = createElementVNode("span", {
            class: "agds-direction-link__spinner",
            "aria-hidden": "true"
          }, null, -1)),
          createElementVNode("span", Ic, toDisplayString(a.loadingLabel), 1)
        ])) : createCommentVNode("", true)
      ])
    ], 42, Ac));
  }
}), Bc = /* @__PURE__ */ A(Mc, [["__scopeId", "data-v-14ff60bd"]]), Lc = /* @__PURE__ */ defineComponent({
  __name: "AGDSField",
  props: {
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    secondaryLabel: {},
    maxWidth: {}
  },
  setup(e) {
    const t = {
      xs: "10ch",
      sm: "20ch",
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, n = e, a = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), o = computed(() => n.id ?? `field-${a}`), s = computed(() => `field-${a}-hint`), r = computed(() => `field-${a}-message`), u = computed(() => {
      const f = [];
      return n.message && n.invalid && f.push(r.value), n.hint && f.push(s.value), f.length ? f.join(" ") : void 0;
    }), g = computed(() => ({
      id: o.value,
      "aria-required": !!n.required,
      "aria-invalid": !!n.invalid,
      "aria-describedby": u.value
    })), c = computed(
      () => n.maxWidth ? t[n.maxWidth] : void 0
    );
    return (f, m) => (openBlock(), createBlock(Bt, {
      invalid: n.invalid
    }, {
      default: withCtx(() => [
        createVNode(Lt, {
          "html-for": o.value,
          id: n.labelId,
          required: n.required,
          "hide-optional-label": n.hideOptionalLabel,
          "secondary-label": n.secondaryLabel
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(n.label), 1)
          ]),
          _: 1
        }, 8, ["html-for", "id", "required", "hide-optional-label", "secondary-label"]),
        n.hint ? (openBlock(), createBlock(Tt, {
          key: 0,
          id: s.value
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(n.hint), 1)
          ]),
          _: 1
        }, 8, ["id"])) : createCommentVNode("", true),
        n.message && n.invalid ? (openBlock(), createBlock(Ft, {
          key: 1,
          id: r.value
        }, {
          default: withCtx(() => [
            createTextVNode(toDisplayString(n.message), 1)
          ]),
          _: 1
        }, 8, ["id"])) : createCommentVNode("", true),
        renderSlot(f.$slots, "default", normalizeProps(guardReactiveProps(g.value)), void 0, true),
        c.value ? (openBlock(), createElementBlock("div", {
          key: 2,
          "aria-hidden": "true",
          class: "agds-field__max-width-spacer",
          style: normalizeStyle({ maxWidth: c.value })
        }, null, 4)) : createCommentVNode("", true)
      ]),
      _: 3
    }, 8, ["invalid"]));
  }
}), Pe = /* @__PURE__ */ A(Lc, [["__scopeId", "data-v-f470577e"]]);
function sa(e, t = "", n) {
  const a = t.toLowerCase();
  return e.filter((o) => o.value.toLowerCase().includes(a) || o.label.toLowerCase().includes(a) ? n ? !n.some((r) => r.value === o.value && r.label === o.label) : true : false);
}
const Tc = /* @__PURE__ */ defineComponent({
  __name: "AGDSCombobox",
  props: /* @__PURE__ */ mergeModels({
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    options: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: {},
    clearable: { type: Boolean, default: false },
    emptyResultsMessage: { default: "No options found" }
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = computed({
      get: () => s.value?.value,
      set: (p) => {
        s.value = p != null ? a.options.find((x) => x.value === p) ?? null : null;
      }
    }), u = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), g = computed(() => a.id ?? `agds-combobox-${u}`), c = ref(""), f = computed(() => sa(a.options, c.value)), m = ref(null);
    return t({ focus: () => m.value?.querySelector("input")?.focus() }), (p, x) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: g.value,
      "label-id": e.labelId,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": e.secondaryLabel,
      "max-width": e.maxWidth
    }, {
      default: withCtx(({
        id: h2,
        "aria-required": D,
        "aria-invalid": _,
        "aria-describedby": B
      }) => [
        createVNode(unref(ComboboxRoot), {
          modelValue: r.value,
          "onUpdate:modelValue": x[4] || (x[4] = (I) => r.value = I),
          disabled: e.disabled,
          name: e.name,
          required: e.required,
          "ignore-filter": true,
          class: normalizeClass(["agds-combobox", { "agds-combobox--block": e.block }])
        }, {
          default: withCtx(() => [
            createVNode(unref(ComboboxAnchor), {
              ref_key: "containerRef",
              ref: m,
              class: normalizeClass(["agds-combobox__control", { "agds-combobox__control--invalid": e.invalid }])
            }, {
              default: withCtx(() => [
                createVNode(unref(ComboboxInput), {
                  id: h2,
                  modelValue: c.value,
                  "onUpdate:modelValue": x[0] || (x[0] = (I) => c.value = I),
                  "display-value": (I) => e.options.find((P) => P.value === I)?.label ?? "",
                  class: "agds-combobox__input",
                  placeholder: e.placeholder,
                  "aria-required": D,
                  "aria-invalid": _,
                  "aria-describedby": B || void 0,
                  onFocus: x[1] || (x[1] = (I) => o("focus", I)),
                  onBlur: x[2] || (x[2] = (I) => o("blur", I))
                }, null, 8, ["id", "modelValue", "display-value", "placeholder", "aria-required", "aria-invalid", "aria-describedby"]),
                e.clearable && s.value != null ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "agds-combobox__clear",
                  "aria-label": "Clear selection",
                  tabindex: "-1",
                  onMousedown: x[3] || (x[3] = withModifiers((I) => s.value = null, ["prevent"]))
                }, [...x[5] || (x[5] = [
                  createElementVNode("svg", {
                    "aria-hidden": "true",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round"
                  }, [
                    createElementVNode("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    createElementVNode("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])], 32)) : createCommentVNode("", true),
                createVNode(unref(ComboboxTrigger), {
                  class: "agds-combobox__trigger",
                  disabled: e.disabled
                }, {
                  default: withCtx(() => [...x[6] || (x[6] = [
                    createElementVNode("svg", {
                      "aria-hidden": "true",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                    ], -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(unref(ComboboxPortal), null, {
              default: withCtx(() => [
                createVNode(unref(ComboboxContent), {
                  class: "agds-combobox__content",
                  "avoid-collisions": false
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxViewport), { class: "agds-combobox__listbox" }, {
                      default: withCtx(() => [
                        createVNode(unref(ComboboxEmpty), { class: "agds-combobox__empty" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(e.emptyResultsMessage), 1)
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (I) => (openBlock(), createBlock(unref(ComboboxItem), {
                          key: I.value,
                          value: I.value,
                          class: "agds-combobox__option"
                        }, {
                          default: withCtx(() => [
                            renderSlot(p.$slots, "item", { option: I }, () => [
                              createTextVNode(toDisplayString(I.label), 1)
                            ], true),
                            createVNode(unref(ComboboxItemIndicator), { class: "agds-combobox__option-check" }, {
                              default: withCtx(() => [...x[7] || (x[7] = [
                                createElementVNode("svg", {
                                  "aria-hidden": "true",
                                  width: "14",
                                  height: "14",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2.5",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round"
                                }, [
                                  createElementVNode("polyline", { points: "20 6 9 17 4 12" })
                                ], -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["value"]))), 128))
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })
          ]),
          _: 2
        }, 1032, ["modelValue", "disabled", "name", "required", "class"])
      ]),
      _: 3
    }, 8, ["label", "id", "label-id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), Fc = /* @__PURE__ */ A(Tc, [["__scopeId", "data-v-da8ebd62"]]), Pc = {
  key: 0,
  class: "agds-combobox-multi__tags",
  "aria-label": "Selected items"
}, Oc = { class: "agds-combobox-multi__tag-label" }, Vc = ["aria-label", "disabled", "onMousedown"], Rc = {
  "aria-live": "polite",
  "aria-atomic": "true",
  class: "sr-only"
}, Ec = /* @__PURE__ */ defineComponent({
  __name: "AGDSComboboxMulti",
  props: /* @__PURE__ */ mergeModels({
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    options: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: true },
    maxWidth: {},
    emptyResultsMessage: { default: "No options found" }
  }, {
    modelValue: { default: () => [] },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = computed({
      get: () => s.value.map((D) => D.value),
      set: (D) => {
        s.value = D.map((_) => a.options.find((B) => B.value === _)).filter((_) => _ != null);
      }
    }), u = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), g = computed(() => a.id ?? `agds-combobox-multi-${u}`), c = ref(""), f = computed(
      () => sa(a.options, c.value, s.value)
    ), m = ref("");
    let p = 0;
    watch(
      s,
      (D, _) => {
        const B = _ ?? [];
        if (D.length > B.length) {
          const I = D.find((P) => !B.some((H) => H.value === P.value));
          m.value = `${I?.label ?? "An item"} has been added.`;
        } else if (D.length === 0 && p > 0)
          m.value = "All items have been removed.";
        else if (D.length < B.length) {
          const I = B.find((P) => !D.some((H) => H.value === P.value));
          m.value = `${I?.label ?? "An item"} has been removed.`;
        }
        p = D.length;
      },
      { deep: true }
    );
    function x(D) {
      s.value = s.value.filter((_) => _.value !== D.value);
    }
    const h2 = ref(null);
    return t({ focus: () => h2.value?.querySelector("input")?.focus() }), (D, _) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: g.value,
      "label-id": e.labelId,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": e.secondaryLabel,
      "max-width": e.maxWidth
    }, {
      default: withCtx(({
        id: B,
        "aria-required": I,
        "aria-invalid": P,
        "aria-describedby": H
      }) => [
        createVNode(unref(ComboboxRoot), {
          modelValue: r.value,
          "onUpdate:modelValue": _[3] || (_[3] = (Y) => r.value = Y),
          multiple: "",
          disabled: e.disabled,
          name: e.name,
          required: e.required,
          "ignore-filter": true,
          "reset-search-term-on-select": true,
          "reset-search-term-on-blur": false,
          class: normalizeClass(["agds-combobox-multi", { "agds-combobox-multi--block": e.block }])
        }, {
          default: withCtx(() => [
            createVNode(unref(ComboboxAnchor), {
              ref_key: "containerRef",
              ref: h2,
              class: normalizeClass(["agds-combobox-multi__control", { "agds-combobox-multi__control--invalid": e.invalid }])
            }, {
              default: withCtx(() => [
                s.value.length ? (openBlock(), createElementBlock("ul", Pc, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (Y) => (openBlock(), createElementBlock("li", {
                    key: Y.value,
                    class: "agds-combobox-multi__tag"
                  }, [
                    createElementVNode("span", Oc, toDisplayString(Y.label), 1),
                    createElementVNode("button", {
                      type: "button",
                      class: "agds-combobox-multi__tag-remove",
                      "aria-label": `Remove ${Y.label}`,
                      tabindex: "-1",
                      disabled: e.disabled,
                      onMousedown: withModifiers((U) => x(Y), ["prevent"])
                    }, [..._[4] || (_[4] = [
                      createElementVNode("svg", {
                        "aria-hidden": "true",
                        width: "10",
                        height: "10",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "3",
                        "stroke-linecap": "round"
                      }, [
                        createElementVNode("line", {
                          x1: "18",
                          y1: "6",
                          x2: "6",
                          y2: "18"
                        }),
                        createElementVNode("line", {
                          x1: "6",
                          y1: "6",
                          x2: "18",
                          y2: "18"
                        })
                      ], -1)
                    ])], 40, Vc)
                  ]))), 128))
                ])) : createCommentVNode("", true),
                createVNode(unref(ComboboxInput), {
                  id: B,
                  modelValue: c.value,
                  "onUpdate:modelValue": _[0] || (_[0] = (Y) => c.value = Y),
                  "display-value": () => "",
                  class: "agds-combobox-multi__input",
                  placeholder: s.value.length === 0 ? e.placeholder : void 0,
                  "aria-required": I,
                  "aria-invalid": P,
                  "aria-describedby": H || void 0,
                  onFocus: _[1] || (_[1] = (Y) => o("focus", Y)),
                  onBlur: _[2] || (_[2] = (Y) => o("blur", Y))
                }, null, 8, ["id", "modelValue", "placeholder", "aria-required", "aria-invalid", "aria-describedby"]),
                createVNode(unref(ComboboxTrigger), {
                  class: "agds-combobox-multi__trigger",
                  disabled: e.disabled
                }, {
                  default: withCtx(() => [..._[5] || (_[5] = [
                    createElementVNode("svg", {
                      "aria-hidden": "true",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                    ], -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(unref(ComboboxPortal), null, {
              default: withCtx(() => [
                createVNode(unref(ComboboxContent), {
                  class: "agds-combobox-multi__content",
                  "avoid-collisions": false
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxViewport), { class: "agds-combobox-multi__listbox" }, {
                      default: withCtx(() => [
                        createVNode(unref(ComboboxEmpty), { class: "agds-combobox-multi__empty" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(e.emptyResultsMessage), 1)
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (Y) => (openBlock(), createBlock(unref(ComboboxItem), {
                          key: Y.value,
                          value: Y.value,
                          class: "agds-combobox-multi__option"
                        }, {
                          default: withCtx(() => [
                            renderSlot(D.$slots, "item", { option: Y }, () => [
                              createTextVNode(toDisplayString(Y.label), 1)
                            ], true),
                            createVNode(unref(ComboboxItemIndicator), { class: "agds-combobox-multi__option-check" }, {
                              default: withCtx(() => [..._[6] || (_[6] = [
                                createElementVNode("svg", {
                                  "aria-hidden": "true",
                                  width: "14",
                                  height: "14",
                                  viewBox: "0 0 24 24",
                                  fill: "none",
                                  stroke: "currentColor",
                                  "stroke-width": "2.5",
                                  "stroke-linecap": "round",
                                  "stroke-linejoin": "round"
                                }, [
                                  createElementVNode("polyline", { points: "20 6 9 17 4 12" })
                                ], -1)
                              ])]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1032, ["value"]))), 128))
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })
          ]),
          _: 2
        }, 1032, ["modelValue", "disabled", "name", "required", "class"]),
        createElementVNode("div", Rc, toDisplayString(m.value), 1)
      ]),
      _: 3
    }, 8, ["label", "id", "label-id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), Gc = /* @__PURE__ */ A(Ec, [["__scopeId", "data-v-1ba80f33"]]), qc = {
  key: 0,
  class: "agds-combobox-async__spinner",
  "aria-hidden": "true"
}, zc = {
  key: 2,
  class: "agds-combobox-async__divider",
  "aria-hidden": "true"
}, Hc = ["aria-label", "disabled"], Nc = {
  key: 0,
  class: "agds-combobox-async__status",
  role: "status"
}, jc = {
  key: 1,
  class: "agds-combobox-async__status agds-combobox-async__status--error",
  role: "alert"
}, Wc = {
  key: 0,
  class: "agds-combobox-async__status",
  role: "status"
}, Uc = {
  "aria-live": "polite",
  "aria-atomic": "true",
  class: "sr-only"
}, Zc = /* @__PURE__ */ defineComponent({
  __name: "AGDSComboboxAsync",
  props: /* @__PURE__ */ mergeModels({
    fetchOptions: {},
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean },
    loadingLabel: { default: "Loading" },
    emptyResultsMessage: { default: "No results found" },
    showDropdownTrigger: { type: Boolean, default: true },
    clearable: { type: Boolean, default: false },
    debounce: { default: 300 },
    block: { type: Boolean, default: false },
    maxWidth: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = computed({
      get: () => s.value?.value,
      set: (Q) => {
        if (Q == null) {
          s.value = null;
          return;
        }
        const Z = f.value.find((q) => q.value === Q);
        Z && (s.value = Z);
      }
    }), u = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), g = computed(() => a.id ?? `agds-combobox-async-${u}`), c = ref(null), f = shallowRef([]), m = ref(false), p = ref(false), x = ref(false), h2 = ref(false), D = ref("");
    let _ = null;
    const B = {}, I = computed(() => p.value || !!a.loading), P = ref(""), H = computed(() => a.clearable && (s.value != null || P.value.length > 0));
    function Y(Q) {
      Q || (m.value = false);
    }
    function U(Q) {
      const Z = Q;
      if (!Z) return "";
      const q = f.value.find((re) => re.value === Z);
      return q ? q.label : s.value?.value === Z ? s.value.label ?? "" : "";
    }
    async function se(Q) {
      const Z = Q.toLowerCase();
      if (B[Z]) {
        f.value = B[Z], x.value = false, p.value = false, m.value = true, D.value = B[Z].length === 0 ? a.emptyResultsMessage : `${B[Z].length} result${B[Z].length === 1 ? "" : "s"} available`;
        return;
      }
      try {
        const q = await a.fetchOptions(Q);
        B[Z] = q, f.value = q, x.value = false, D.value = q.length === 0 ? a.emptyResultsMessage : `${q.length} result${q.length === 1 ? "" : "s"} available`;
      } catch {
        f.value = [], x.value = true, D.value = "";
      } finally {
        p.value = false;
      }
    }
    function O(Q) {
      const Z = Q.target.value;
      if (P.value = Z, s.value != null && Z !== s.value.label && (s.value = null), _ && clearTimeout(_), !Z.trim()) {
        f.value = [], p.value = false, m.value = false, h2.value = false, x.value = false, D.value = "";
        return;
      }
      h2.value = true, p.value = true, m.value = true, _ = setTimeout(() => se(Z), a.debounce);
    }
    function V() {
      s.value = null, f.value = [], m.value = false, h2.value = false, p.value = false, x.value = false, D.value = "Selection cleared", P.value = "", N()?.querySelector("input")?.focus();
    }
    function N() {
      const Q = c.value;
      return Q?.$el ?? Q;
    }
    function le() {
      if (m.value)
        m.value = false;
      else if (f.value.length > 0 || p.value || x.value)
        m.value = true;
      else {
        const Q = N()?.querySelector("input");
        Q?.value && se(Q.value);
      }
    }
    return t({ focus: () => N()?.querySelector("input")?.focus() }), (Q, Z) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: g.value,
      "label-id": e.labelId,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": e.secondaryLabel,
      "max-width": e.block ? void 0 : e.maxWidth
    }, {
      default: withCtx(({
        id: q,
        "aria-required": re,
        "aria-invalid": me,
        "aria-describedby": he
      }) => [
        createVNode(unref(ComboboxRoot), {
          modelValue: r.value,
          "onUpdate:modelValue": Z[2] || (Z[2] = (ce) => r.value = ce),
          open: m.value,
          disabled: e.disabled,
          name: e.name,
          required: e.required,
          "ignore-filter": true,
          "open-on-focus": false,
          "open-on-click": false,
          class: normalizeClass(["agds-combobox-async", { "agds-combobox-async--block": e.block }]),
          "onUpdate:open": Y
        }, {
          default: withCtx(() => [
            createVNode(unref(ComboboxAnchor), {
              ref_key: "containerRef",
              ref: c,
              class: normalizeClass(["agds-combobox-async__control", { "agds-combobox-async__control--invalid": e.invalid }])
            }, {
              default: withCtx(() => [
                createVNode(unref(ComboboxInput), {
                  id: q,
                  "display-value": U,
                  class: "agds-combobox-async__input",
                  placeholder: e.placeholder,
                  "aria-required": re,
                  "aria-invalid": me,
                  "aria-describedby": he || void 0,
                  "aria-busy": I.value || void 0,
                  disabled: !!a.loading,
                  onInput: O,
                  onFocus: Z[0] || (Z[0] = (ce) => o("focus", ce)),
                  onBlur: Z[1] || (Z[1] = (ce) => o("blur", ce))
                }, null, 8, ["id", "placeholder", "aria-required", "aria-invalid", "aria-describedby", "aria-busy", "disabled"]),
                I.value ? (openBlock(), createElementBlock("span", qc)) : createCommentVNode("", true),
                H.value && !I.value ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  type: "button",
                  class: "agds-combobox-async__btn agds-combobox-async__clear",
                  "aria-label": "Clear selection",
                  tabindex: "-1",
                  onMousedown: withModifiers(V, ["prevent"])
                }, [...Z[3] || (Z[3] = [
                  createElementVNode("svg", {
                    "aria-hidden": "true",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round"
                  }, [
                    createElementVNode("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    createElementVNode("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])], 32)) : createCommentVNode("", true),
                H.value && e.showDropdownTrigger && !I.value ? (openBlock(), createElementBlock("span", zc)) : createCommentVNode("", true),
                e.showDropdownTrigger ? (openBlock(), createElementBlock("button", {
                  key: 3,
                  type: "button",
                  class: normalizeClass(["agds-combobox-async__btn", { "agds-combobox-async__btn--open": m.value }]),
                  "aria-label": m.value ? "Close options" : "Open options",
                  tabindex: "-1",
                  disabled: e.disabled,
                  onMousedown: withModifiers(le, ["prevent"])
                }, [...Z[4] || (Z[4] = [
                  createElementVNode("svg", {
                    "aria-hidden": "true",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                  ], -1)
                ])], 42, Hc)) : createCommentVNode("", true)
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(unref(ComboboxPortal), null, {
              default: withCtx(() => [
                createVNode(unref(ComboboxContent), {
                  class: "agds-combobox-async__content",
                  "avoid-collisions": false
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxViewport), { class: "agds-combobox-async__listbox" }, {
                      default: withCtx(() => [
                        p.value ? (openBlock(), createElementBlock("li", Nc, toDisplayString(e.loadingLabel), 1)) : x.value ? (openBlock(), createElementBlock("li", jc, " Something went wrong. ")) : (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                          h2.value && f.value.length === 0 ? (openBlock(), createElementBlock("li", Wc, toDisplayString(e.emptyResultsMessage), 1)) : createCommentVNode("", true),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(f.value, (ce) => (openBlock(), createBlock(unref(ComboboxItem), {
                            key: ce.value,
                            value: ce.value,
                            class: "agds-combobox-async__option"
                          }, {
                            default: withCtx(() => [
                              renderSlot(Q.$slots, "option", { option: ce }, () => [
                                createTextVNode(toDisplayString(ce.label), 1)
                              ], true),
                              createVNode(unref(ComboboxItemIndicator), { class: "agds-combobox-async__option-check" }, {
                                default: withCtx(() => [...Z[5] || (Z[5] = [
                                  createElementVNode("svg", {
                                    "aria-hidden": "true",
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    "stroke-width": "2.5",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, [
                                    createElementVNode("polyline", { points: "20 6 9 17 4 12" })
                                  ], -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ], 64))
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ]),
              _: 3
            })
          ]),
          _: 2
        }, 1032, ["modelValue", "open", "disabled", "name", "required", "class"]),
        createElementVNode("div", Uc, toDisplayString(D.value), 1)
      ]),
      _: 3
    }, 8, ["label", "id", "label-id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), yn = /* @__PURE__ */ A(Zc, [["__scopeId", "data-v-9ed5ef8c"]]), Kc = {
  key: 0,
  class: "agds-combobox-async-multi__tags",
  "aria-label": "Selected items"
}, Yc = { class: "agds-combobox-async-multi__tag-label" }, Xc = ["aria-label", "disabled", "onMousedown"], Qc = ["id", "aria-expanded", "aria-controls", "aria-activedescendant", "aria-required", "aria-invalid", "aria-describedby", "placeholder", "disabled", "aria-busy", "aria-disabled"], Jc = {
  key: 1,
  class: "agds-combobox-async-multi__spinner",
  "aria-hidden": "true"
}, eg = ["id", "aria-label"], tg = {
  key: 0,
  class: "agds-combobox-async-multi__loading",
  role: "status"
}, ag = {
  key: 1,
  class: "agds-combobox-async-multi__empty",
  role: "status"
}, ng = ["id", "aria-selected", "onMousedown", "onMousemove"], og = {
  "aria-live": "polite",
  "aria-atomic": "true",
  class: "sr-only"
}, sg = {
  "aria-live": "polite",
  "aria-atomic": "true",
  class: "sr-only"
}, lg = /* @__PURE__ */ defineComponent({
  __name: "AGDSComboboxAsyncMulti",
  props: /* @__PURE__ */ mergeModels({
    fetchOptions: {},
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean, default: false },
    loading: { type: Boolean },
    loadingLabel: { default: "Loading" },
    emptyResultsMessage: { default: "No results found" },
    debounce: { default: 300 },
    block: { type: Boolean, default: true },
    maxWidth: {}
  }, {
    modelValue: { default: () => [] },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), u = computed(() => a.id ?? `agds-combobox-async-multi-${r}`), g = computed(() => `${u.value}-listbox`), c = ref(null), f = ref(""), m = shallowRef([]), p = ref(false), x = ref(false), h2 = ref(-1), D = ref(false), _ = ref(""), B = ref("");
    let I = null;
    const P = computed(() => x.value || !!a.loading), H = computed(
      () => h2.value >= 0 ? `${g.value}-option-${h2.value}` : void 0
    );
    let Y = 0;
    watch(
      s,
      (q, re) => {
        const me = re ?? [];
        if (q.length > me.length) {
          const he = q.find((ce) => !me.some((De) => De.value === ce.value));
          B.value = `${he?.label ?? "An item"} has been added.`;
        } else if (q.length === 0 && Y > 0)
          B.value = "All items have been removed.";
        else if (q.length < me.length) {
          const he = me.find((ce) => !q.some((De) => De.value === ce.value));
          B.value = `${he?.label ?? "An item"} has been removed.`;
        }
        Y = q.length;
      },
      { deep: true }
    );
    async function U(q) {
      x.value = true, D.value = true;
      try {
        const re = await a.fetchOptions(q), me = sa(re, q, s.value);
        m.value = me, p.value = true, h2.value = -1, _.value = me.length === 0 ? a.emptyResultsMessage : `${me.length} result${me.length === 1 ? "" : "s"} available`;
      } catch {
        m.value = [], _.value = "";
      } finally {
        x.value = false;
      }
    }
    function se() {
      const q = f.value;
      if (I && clearTimeout(I), !q.trim()) {
        m.value = [], p.value = false, D.value = false, _.value = "";
        return;
      }
      I = setTimeout(() => U(q), a.debounce);
    }
    function O(q) {
      s.value.some((re) => re.value === q.value) || (s.value = [...s.value, q]), f.value = "", m.value = m.value.filter((re) => re.value !== q.value), p.value = m.value.length > 0, h2.value = -1, c.value?.focus();
    }
    function V(q) {
      s.value = s.value.filter((re) => re.value !== q.value);
    }
    function N() {
      s.value.length > 0 && f.value === "" && (s.value = s.value.slice(0, -1));
    }
    function le(q) {
      switch (q.key) {
        case "ArrowDown":
          q.preventDefault(), !p.value && m.value.length > 0 && (p.value = true), m.value.length > 0 && (h2.value = (h2.value + 1) % m.value.length);
          break;
        case "ArrowUp":
          q.preventDefault(), !p.value && m.value.length > 0 && (p.value = true), m.value.length > 0 && (h2.value = h2.value <= 0 ? m.value.length - 1 : h2.value - 1);
          break;
        case "Enter":
          q.preventDefault(), p.value && h2.value >= 0 ? O(m.value[h2.value]) : p.value && m.value.length > 0 && O(m.value[0]);
          break;
        case "Escape":
          p.value && (p.value = false, h2.value = -1);
          break;
        case "Tab":
          p.value = false;
          break;
        case "Backspace":
          N();
          break;
      }
    }
    function Q(q) {
      o("focus", q);
    }
    function Z(q) {
      setTimeout(() => {
        p.value = false, f.value = "", o("blur", q);
      }, 150);
    }
    return t({ focus: () => c.value?.focus() }), (q, re) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: u.value,
      "label-id": e.labelId,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": e.secondaryLabel,
      "max-width": e.block ? void 0 : e.maxWidth
    }, {
      default: withCtx(({
        id: me,
        "aria-required": he,
        "aria-invalid": ce,
        "aria-describedby": De
      }) => [
        createElementVNode("div", {
          class: normalizeClass(["agds-combobox-async-multi", { "agds-combobox-async-multi--block": e.block }])
        }, [
          createElementVNode("div", {
            class: normalizeClass(["agds-combobox-async-multi__control", {
              "agds-combobox-async-multi__control--invalid": e.invalid,
              "agds-combobox-async-multi__control--disabled": e.disabled,
              "agds-combobox-async-multi__control--open": p.value
            }])
          }, [
            s.value.length ? (openBlock(), createElementBlock("ul", Kc, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (ve) => (openBlock(), createElementBlock("li", {
                key: ve.value,
                class: "agds-combobox-async-multi__tag"
              }, [
                createElementVNode("span", Yc, toDisplayString(ve.label), 1),
                createElementVNode("button", {
                  type: "button",
                  class: "agds-combobox-async-multi__tag-remove",
                  "aria-label": `Remove ${ve.label}`,
                  tabindex: "-1",
                  disabled: e.disabled,
                  onMousedown: withModifiers((Le) => V(ve), ["prevent"])
                }, [...re[1] || (re[1] = [
                  createElementVNode("svg", {
                    "aria-hidden": "true",
                    width: "10",
                    height: "10",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "3",
                    "stroke-linecap": "round"
                  }, [
                    createElementVNode("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    createElementVNode("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])], 40, Xc)
              ]))), 128))
            ])) : createCommentVNode("", true),
            withDirectives(createElementVNode("input", {
              id: me,
              ref_key: "inputRef",
              ref: c,
              "onUpdate:modelValue": re[0] || (re[0] = (ve) => f.value = ve),
              role: "combobox",
              type: "text",
              autocomplete: "off",
              autocorrect: "off",
              autocapitalize: "off",
              spellcheck: "false",
              "aria-expanded": p.value,
              "aria-autocomplete": "list",
              "aria-controls": g.value,
              "aria-activedescendant": H.value,
              "aria-required": he,
              "aria-invalid": ce,
              "aria-describedby": De || void 0,
              placeholder: s.value.length === 0 ? e.placeholder : void 0,
              disabled: e.disabled || P.value,
              "aria-busy": P.value || void 0,
              "aria-disabled": e.disabled || void 0,
              class: "agds-combobox-async-multi__input",
              onInput: se,
              onKeydown: le,
              onFocus: Q,
              onBlur: Z
            }, null, 40, Qc), [
              [vModelText, f.value]
            ]),
            P.value ? (openBlock(), createElementBlock("span", Jc)) : createCommentVNode("", true)
          ], 2),
          withDirectives(createElementVNode("ul", {
            id: g.value,
            role: "listbox",
            "aria-label": e.label,
            "aria-multiselectable": true,
            class: "agds-combobox-async-multi__listbox"
          }, [
            x.value ? (openBlock(), createElementBlock("li", tg, toDisplayString(e.loadingLabel), 1)) : D.value && m.value.length === 0 ? (openBlock(), createElementBlock("li", ag, toDisplayString(e.emptyResultsMessage), 1)) : (openBlock(true), createElementBlock(Fragment, { key: 2 }, renderList(m.value, (ve, Le) => (openBlock(), createElementBlock("li", {
              id: `${g.value}-option-${Le}`,
              key: ve.value,
              role: "option",
              "aria-selected": s.value.some((Me) => Me.value === ve.value),
              class: normalizeClass([
                "agds-combobox-async-multi__option",
                { "agds-combobox-async-multi__option--highlighted": h2.value === Le }
              ]),
              onMousedown: withModifiers((Me) => O(ve), ["prevent"]),
              onMousemove: (Me) => h2.value = Le
            }, [
              renderSlot(q.$slots, "option", { option: ve }, () => [
                createTextVNode(toDisplayString(ve.label), 1)
              ], true)
            ], 42, ng))), 128))
          ], 8, eg), [
            [vShow, p.value]
          ]),
          createElementVNode("div", og, toDisplayString(_.value), 1),
          createElementVNode("div", sg, toDisplayString(B.value), 1)
        ], 2)
      ]),
      _: 3
    }, 8, ["label", "id", "label-id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), ig = /* @__PURE__ */ A(lg, [["__scopeId", "data-v-af8f2302"]]), rg = /* @__PURE__ */ defineComponent({
  __name: "AGDSAutocomplete",
  props: /* @__PURE__ */ mergeModels({
    fetchOptions: {},
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean },
    message: {},
    required: { type: Boolean },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean },
    loading: { type: Boolean },
    loadingLabel: { default: "Loading" },
    emptyResultsMessage: { default: "No results found" },
    debounce: { default: 300 },
    block: { type: Boolean },
    maxWidth: {}
  }, {
    modelValue: {},
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = ref(null);
    return t({ focus: () => r.value?.focus() }), (u, g) => (openBlock(), createBlock(yn, mergeProps({
      ref_key: "comboboxRef",
      ref: r
    }, a, {
      modelValue: s.value,
      "onUpdate:modelValue": g[0] || (g[0] = (c) => s.value = c),
      clearable: true,
      "show-dropdown-trigger": false,
      onFocus: g[1] || (g[1] = (c) => o("focus", c)),
      onBlur: g[2] || (g[2] = (c) => o("blur", c))
    }), createSlots({ _: 2 }, [
      u.$slots.option ? {
        name: "option",
        fn: withCtx((c) => [
          renderSlot(u.$slots, "option", normalizeProps(guardReactiveProps(c)))
        ]),
        key: "0"
      } : void 0
    ]), 1040, ["modelValue"]));
  }
}), dg = { class: "agds-calendar__months" }, ug = { class: "agds-calendar__caption" }, cg = ["disabled", "aria-label"], gg = {
  key: 1,
  class: "agds-calendar__nav-placeholder",
  "aria-hidden": "true"
}, fg = {
  class: "agds-calendar__heading",
  "aria-live": "polite",
  "aria-atomic": "true"
}, mg = {
  key: 0,
  class: "agds-calendar__selects"
}, vg = { class: "agds-calendar__select-wrap" }, pg = ["for"], hg = ["id", "value"], bg = ["value"], _g = { class: "agds-calendar__select-wrap" }, yg = ["for"], kg = ["id", "value"], Sg = ["value"], $g = {
  key: 1,
  class: "agds-calendar__month-label"
}, xg = {
  key: 1,
  class: "agds-calendar__month-label"
}, wg = ["disabled", "aria-label"], Ag = {
  key: 3,
  class: "agds-calendar__nav-placeholder",
  "aria-hidden": "true"
}, Dg = ["aria-label"], Cg = ["abbr"], Ig = ["onClick", "onKeydown", "onMouseenter", "onFocus"], Mg = {
  class: "agds-calendar__day-inner",
  "aria-hidden": "true"
}, Bg = /* @__PURE__ */ defineComponent({
  __name: "AGDSDatePickerCalendar",
  props: {
    mode: { default: "single" },
    selectedDate: { default: null },
    selectedFrom: { default: null },
    selectedTo: { default: null },
    inputMode: { default: void 0 },
    minDate: {},
    maxDate: {},
    defaultMonth: {},
    numberOfMonths: { default: 1 },
    yearRange: {}
  },
  emits: ["select"],
  setup(e, { expose: t, emit: n }) {
    function a(R) {
      return new Date(R.getFullYear(), R.getMonth(), R.getDate());
    }
    function o(R, j) {
      return R.getFullYear() === j.getFullYear() && R.getMonth() === j.getMonth() && R.getDate() === j.getDate();
    }
    function s(R, j) {
      const L = new Date(R);
      return L.setDate(L.getDate() + j), L;
    }
    function r(R, j) {
      return new Date(R.getFullYear(), R.getMonth() + j, 1);
    }
    function u(R, j) {
      const W = new Date(R, j, 1).getDay(), ae = W === 0 ? 6 : W - 1, ne = [];
      for (let te = ae; te > 0; te--)
        ne.push(new Date(R, j, 1 - te));
      const ue = new Date(R, j + 1, 0).getDate();
      for (let te = 1; te <= ue; te++)
        ne.push(new Date(R, j, te));
      for (; ne.length < 42; ) {
        const te = ne[ne.length - 1];
        ne.push(new Date(te.getFullYear(), te.getMonth(), te.getDate() + 1));
      }
      return ne;
    }
    function g(R) {
      return `${R.getFullYear()}-${String(R.getMonth() + 1).padStart(2, "0")}-${String(R.getDate()).padStart(2, "0")}`;
    }
    const c = e, f = n, m = a(/* @__PURE__ */ new Date());
    function p() {
      let R;
      c.defaultMonth ? R = c.defaultMonth : c.mode === "single" && c.selectedDate ? R = c.selectedDate : c.mode === "range" ? c.inputMode === "to" && c.selectedTo ? R = c.selectedTo : c.selectedFrom ? R = c.selectedFrom : R = m : R = m;
      let j = R.getFullYear(), L = R.getMonth();
      if (c.mode === "range" && c.numberOfMonths === 2 && c.inputMode === "to" && c.selectedTo) {
        const W = r(new Date(j, L, 1), -1);
        j = W.getFullYear(), L = W.getMonth();
      }
      return { year: j, month: L };
    }
    const x = p(), h2 = ref(x.year), D = ref(x.month), _ = ref(null), B = ref(null), I = ref(null), P = computed(() => {
      const R = [{ year: h2.value, month: D.value }];
      if (c.numberOfMonths === 2) {
        const j = r(new Date(h2.value, D.value, 1), 1);
        R.push({ year: j.getFullYear(), month: j.getMonth() });
      }
      return R;
    }), H = (/* @__PURE__ */ new Date()).getFullYear();
    function Y() {
      const R = c.yearRange?.from ?? H - 10, j = c.yearRange?.to ?? H + 10, L = [];
      for (let W = R; W <= j; W++) L.push(W);
      return L.includes(h2.value) || (L.push(h2.value), L.sort((W, ae) => W - ae)), L;
    }
    const U = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ], se = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], O = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    function V(R) {
      const j = a(R);
      return !!(c.minDate && j < a(c.minDate) || c.maxDate && j > a(c.maxDate));
    }
    function N(R, j) {
      const L = a(R), W = o(L, m), ae = R.getMonth() !== P.value[j].month, ne = V(R);
      let ue = false, te = false, Ne = false, Oe = false;
      if (c.mode === "single")
        ue = !!(c.selectedDate && o(L, c.selectedDate));
      else {
        const Te = c.selectedFrom ? a(c.selectedFrom) : null, G = c.selectedTo ? a(c.selectedTo) : null, z = _.value ? a(_.value) : null;
        if (te = !!(Te && o(L, Te)), Ne = !!(G && o(L, G)), ue = te || Ne, Te && G)
          Oe = L > Te && L < G;
        else if (z) {
          if (c.inputMode === "from" && G) {
            const X = z < G ? z : G, ie = z < G ? G : z;
            Oe = L > X && L < ie;
          } else if (c.inputMode === "to" && Te) {
            const X = Te < z ? Te : z, ie = Te < z ? z : Te;
            Oe = L > X && L < ie;
          }
        }
      }
      const Ze = !!(B.value && o(L, B.value));
      return {
        date: L,
        key: g(L),
        isToday: W,
        isOtherMonth: ae,
        disabled: ne,
        isSelected: ue,
        isRangeStart: te,
        isRangeEnd: Ne,
        isInRange: Oe,
        isFocused: Ze,
        tabindex: Ze ? 0 : -1,
        ariaLabel: le(L, ue, Oe, W)
      };
    }
    function le(R, j, L, W) {
      const ae = [];
      j && ae.push("Selected."), L && ae.push("Within range."), W && ae.push("Today.");
      const ne = R.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      return ae.push(ne), ae.join(" ");
    }
    function Q() {
      const R = r(new Date(h2.value, D.value, 1), -1);
      h2.value = R.getFullYear(), D.value = R.getMonth();
    }
    function Z() {
      const R = r(new Date(h2.value, D.value, 1), 1);
      h2.value = R.getFullYear(), D.value = R.getMonth();
    }
    function q(R) {
      h2.value = parseInt(R.target.value);
    }
    function re(R) {
      D.value = parseInt(R.target.value);
    }
    function me(R) {
      V(R) || f("select", R);
    }
    function he(R) {
      const j = g(R);
      I.value?.querySelector(`[data-date="${j}"]`)?.focus();
    }
    function ce(R, j) {
      let L = null;
      switch (R.key) {
        case "ArrowLeft":
          L = s(j, -1);
          break;
        case "ArrowRight":
          L = s(j, 1);
          break;
        case "ArrowUp":
          L = s(j, -7);
          break;
        case "ArrowDown":
          L = s(j, 7);
          break;
        case "PageUp":
          L = r(j, R.shiftKey ? -12 : -1);
          break;
        case "PageDown":
          L = r(j, R.shiftKey ? 12 : 1);
          break;
        case "Home": {
          const W = j.getDay(), ae = W === 0 ? -6 : 1 - W;
          L = s(j, ae);
          break;
        }
        case "End": {
          const W = j.getDay(), ae = W === 0 ? 0 : 7 - W;
          L = s(j, ae);
          break;
        }
        case "Enter":
        case " ":
          R.preventDefault(), me(j);
          return;
        default:
          return;
      }
      if (L) {
        R.preventDefault(), B.value = L;
        const W = P.value[0], ae = P.value[P.value.length - 1];
        L.getFullYear() < W.year || L.getFullYear() === W.year && L.getMonth() < W.month ? Q() : (L.getFullYear() > ae.year || L.getFullYear() === ae.year && L.getMonth() > ae.month) && Z(), nextTick(() => he(L));
      }
    }
    function De() {
      nextTick(() => {
        let R;
        c.mode === "single" ? R = c.selectedDate ?? m : R = (c.inputMode === "to" ? c.selectedTo : c.selectedFrom) ?? m, B.value = R, he(R);
      });
    }
    t({ focusInitialDay: De });
    function ve(R, j) {
      const L = u(R, j), W = [];
      for (let ae = 0; ae < 6; ae++)
        W.push(L.slice(ae * 7, ae * 7 + 7));
      return W;
    }
    const Le = computed(() => c.minDate ? new Date(h2.value, D.value, 0) >= a(c.minDate) : true), Me = computed(() => {
      if (!c.maxDate) return true;
      const R = P.value[P.value.length - 1];
      return new Date(R.year, R.month + 1, 1) <= a(c.maxDate);
    });
    return (R, j) => (openBlock(), createElementBlock("div", {
      ref_key: "calendarRef",
      ref: I,
      class: normalizeClass(["agds-calendar", { "agds-calendar--range": e.mode === "range" }])
    }, [
      createElementVNode("div", dg, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(P.value, (L, W) => (openBlock(), createElementBlock("div", {
          key: `${L.year}-${L.month}`,
          class: "agds-calendar__month"
        }, [
          createElementVNode("div", ug, [
            W === 0 ? (openBlock(), createElementBlock("button", {
              key: 0,
              type: "button",
              class: "agds-calendar__nav-btn agds-calendar__nav-btn--prev",
              disabled: !Le.value,
              "aria-label": `Previous month, ${U[(L.month - 1 + 12) % 12]}`,
              onClick: Q
            }, [...j[1] || (j[1] = [
              createElementVNode("svg", {
                "aria-hidden": "true",
                focusable: "false",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createElementVNode("polyline", { points: "15 18 9 12 15 6" })
              ], -1)
            ])], 8, cg)) : (openBlock(), createElementBlock("span", gg)),
            createElementVNode("div", fg, [
              e.yearRange || W === 0 ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                W === 0 ? (openBlock(), createElementBlock("div", mg, [
                  createElementVNode("div", vg, [
                    createElementVNode("label", {
                      for: `agds-cal-month-${L.year}-${L.month}`,
                      class: "sr-only"
                    }, "Month", 8, pg),
                    createElementVNode("select", {
                      id: `agds-cal-month-${L.year}-${L.month}`,
                      class: "agds-calendar__select",
                      value: L.month,
                      onChange: re
                    }, [
                      (openBlock(), createElementBlock(Fragment, null, renderList(U, (ae, ne) => createElementVNode("option", {
                        key: ne,
                        value: ne
                      }, toDisplayString(ae), 9, bg)), 64))
                    ], 40, hg),
                    j[2] || (j[2] = createElementVNode("svg", {
                      class: "agds-calendar__select-chevron",
                      "aria-hidden": "true",
                      focusable: "false",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                    ], -1))
                  ]),
                  createElementVNode("div", _g, [
                    createElementVNode("label", {
                      for: `agds-cal-year-${L.year}-${L.month}`,
                      class: "sr-only"
                    }, "Year", 8, yg),
                    createElementVNode("select", {
                      id: `agds-cal-year-${L.year}-${L.month}`,
                      class: "agds-calendar__select",
                      value: L.year,
                      onChange: q
                    }, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(Y(), (ae) => (openBlock(), createElementBlock("option", {
                        key: ae,
                        value: ae
                      }, toDisplayString(ae), 9, Sg))), 128))
                    ], 40, kg),
                    j[3] || (j[3] = createElementVNode("svg", {
                      class: "agds-calendar__select-chevron",
                      "aria-hidden": "true",
                      focusable: "false",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2.5",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                    ], -1))
                  ])
                ])) : (openBlock(), createElementBlock("span", $g, toDisplayString(U[L.month]) + " " + toDisplayString(L.year), 1))
              ], 64)) : (openBlock(), createElementBlock("span", xg, toDisplayString(U[L.month]) + " " + toDisplayString(L.year), 1))
            ]),
            W === P.value.length - 1 ? (openBlock(), createElementBlock("button", {
              key: 2,
              type: "button",
              class: "agds-calendar__nav-btn agds-calendar__nav-btn--next",
              disabled: !Me.value,
              "aria-label": `Next month, ${U[(L.month + 1) % 12]}`,
              onClick: Z
            }, [...j[4] || (j[4] = [
              createElementVNode("svg", {
                "aria-hidden": "true",
                focusable: "false",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
              }, [
                createElementVNode("polyline", { points: "9 18 15 12 9 6" })
              ], -1)
            ])], 8, wg)) : (openBlock(), createElementBlock("span", Ag))
          ]),
          createElementVNode("table", {
            class: "agds-calendar__grid",
            role: "grid",
            "aria-label": `${U[L.month]} ${L.year}`
          }, [
            createElementVNode("thead", null, [
              createElementVNode("tr", null, [
                (openBlock(), createElementBlock(Fragment, null, renderList(se, (ae, ne) => createElementVNode("th", {
                  key: ae,
                  class: "agds-calendar__weekday",
                  scope: "col",
                  abbr: O[ne]
                }, toDisplayString(ae), 9, Cg)), 64))
              ])
            ]),
            createElementVNode("tbody", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(ve(L.year, L.month), (ae, ne) => (openBlock(), createElementBlock("tr", {
                key: ne,
                role: "row"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(ae, (ue) => (openBlock(), createElementBlock("td", mergeProps({
                  key: g(ue),
                  role: "gridcell",
                  class: "agds-calendar__cell"
                }, { ref_for: true }, (() => {
                  const te = N(ue, W);
                  return {
                    "data-date": te.key,
                    tabindex: te.tabindex,
                    "aria-label": te.ariaLabel,
                    "aria-selected": te.isSelected ? "true" : void 0,
                    "aria-current": te.isToday ? "date" : void 0,
                    "aria-disabled": te.disabled ? "true" : void 0,
                    class: [
                      "agds-calendar__cell",
                      te.isOtherMonth && "agds-calendar__cell--other-month",
                      te.isToday && "agds-calendar__cell--today",
                      te.isSelected && "agds-calendar__cell--selected",
                      te.isRangeStart && "agds-calendar__cell--range-start",
                      te.isRangeEnd && "agds-calendar__cell--range-end",
                      te.isInRange && "agds-calendar__cell--in-range",
                      te.disabled && "agds-calendar__cell--disabled",
                      te.isFocused && "agds-calendar__cell--focused"
                    ].filter(Boolean).join(" ")
                  };
                })(), {
                  onClick: (te) => me(ue),
                  onKeydown: (te) => ce(te, ue),
                  onMouseenter: (te) => _.value = ue,
                  onMouseleave: j[0] || (j[0] = (te) => _.value = null),
                  onFocus: (te) => B.value = ue
                }), [
                  createElementVNode("span", Mg, toDisplayString(ue.getDate()), 1)
                ], 16, Ig))), 128))
              ]))), 128))
            ])
          ], 8, Dg)
        ]))), 128))
      ])
    ], 2));
  }
}), Ba = /* @__PURE__ */ A(Bg, [["__scopeId", "data-v-a54dc765"]]), Lg = {
  key: 0,
  class: "agds-datepicker"
}, Tg = ["for"], Fg = {
  key: 0,
  class: "agds-datepicker__optional"
}, Pg = {
  class: "agds-datepicker__secondary-label",
  "aria-hidden": "true"
}, Og = ["id"], Vg = ["id"], Rg = ["id", "value", "disabled", "required", "aria-invalid", "aria-required", "aria-describedby", "placeholder"], Eg = ["disabled", "aria-expanded", "aria-label"], Gg = {
  key: 0,
  class: "agds-datepicker__optional"
}, qg = ["id"], zg = ["id"], Hg = { class: "agds-datepicker__range-row" }, Ng = ["for"], jg = {
  class: "agds-datepicker__secondary-label",
  "aria-hidden": "true"
}, Wg = ["id", "value", "disabled", "required", "aria-invalid", "aria-required", "aria-describedby", "placeholder"], Ug = ["disabled", "aria-expanded", "aria-label"], Zg = ["for"], Kg = {
  class: "agds-datepicker__secondary-label",
  "aria-hidden": "true"
}, Yg = ["id", "value", "disabled", "required", "aria-invalid", "aria-required", "aria-describedby", "placeholder"], Xg = ["disabled", "aria-expanded", "aria-label"], Qg = /* @__PURE__ */ defineComponent({
  __name: "AGDSDatePicker",
  props: {
    range: { type: Boolean, default: false },
    modelValue: { default: null },
    label: { default: void 0 },
    fromLabel: { default: "Start date" },
    toLabel: { default: "End date" },
    id: { default: void 0 },
    hint: { default: void 0 },
    message: { default: void 0 },
    invalid: { type: Boolean, default: false },
    fromInvalid: { type: Boolean, default: false },
    toInvalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    minDate: { default: void 0 },
    maxDate: { default: void 0 },
    yearRange: { default: void 0 },
    dateFormat: { default: "dd/MM/yyyy" }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    function a(G) {
      return String(G).padStart(2, "0");
    }
    function o(G, z) {
      const X = a(G.getDate()), ie = a(G.getMonth() + 1), Ve = String(G.getFullYear());
      return z.replace("dd", X).replace("MM", ie).replace("yyyy", Ve);
    }
    function s(G, z) {
      if (!G.trim()) return null;
      const X = z.includes("/") ? "/" : z.includes("-") ? "-" : "/", ie = G.split(X);
      if (ie.length === 3) {
        const Ve = z.split(X), Ge = {};
        Ve.forEach((Ke, Pn) => {
          Ge[Ke] = parseInt(ie[Pn] ?? "", 10);
        });
        const je = Ge.dd ?? Ge.d, We = Ge.MM ?? Ge.M, ut = Ge.yyyy;
        if (ut && String(ut).length === 4 && We >= 1 && We <= 12 && je >= 1 && je <= 31) {
          const Ke = new Date(ut, We - 1, je);
          if (Ke.getFullYear() === ut && Ke.getMonth() === We - 1 && Ke.getDate() === je)
            return Ke;
        }
      }
      if (/^\d{4}-\d{2}-\d{2}/.test(G)) {
        const Ve = new Date(G);
        if (!isNaN(Ve.getTime())) return Ve;
      }
      return null;
    }
    function r(G) {
      return G.replace("dd", "DD").replace("MM", "MM").replace("yyyy", "YYYY");
    }
    function u(G, z) {
      return `(e.g. ${o(G, z)})`;
    }
    function g(G, z) {
      return new Date(G.getFullYear(), G.getMonth() - z, G.getDate());
    }
    function c(G, z, X, ie, Ve) {
      if (G === "from")
        return z && X && z > X ? g(X, Ve === 2 ? 1 : 0) : z || (X ? g(X, Ve === 2 ? 1 : 0) : void 0);
      if (G === "to")
        return z && X && X < z ? z : X ? g(X, Ve === 2 ? 1 : 0) : z || void 0;
      if (ie) {
        const Ge = new Date(ie.from, 0, 1), je = new Date(ie.to, 11, 31), We = Date.now();
        return Math.abs(We - Ge.getTime()) <= Math.abs(We - je.getTime()) ? Ge : je;
      }
    }
    const f = e, m = n, p = useId(), x = computed(() => f.id ?? `agds-datepicker-${p}`), h2 = computed(() => `agds-datepicker-${p}-from`), D = computed(() => `agds-datepicker-${p}-to`), _ = computed(() => `agds-datepicker-${p}-hint`), B = computed(() => `agds-datepicker-${p}-message`), I = computed(
      () => !f.required && !f.hideOptionalLabel ? " (optional)" : ""
    ), P = computed(() => f.range ? null : f.modelValue ?? null), H = computed(() => f.range ? f.modelValue ?? { from: null, to: null } : { from: null, to: null });
    function Y(G) {
      return G ? o(G, f.dateFormat) : "";
    }
    const U = ref(Y(P.value)), se = ref(Y(H.value.from)), O = ref(Y(H.value.to));
    watch(P, (G) => {
      U.value = Y(G);
    }), watch(
      () => H.value.from,
      (G) => {
        se.value = Y(G);
      }
    ), watch(
      () => H.value.to,
      (G) => {
        O.value = Y(G);
      }
    );
    const V = ref(false), N = ref(void 0), le = ref(null), Q = ref(null), Z = ref(null), q = ref(null);
    function re(G) {
      N.value = G, V.value = true;
    }
    function me() {
      V.value = false;
    }
    function he() {
      me(), nextTick(() => {
        N.value === "to" ? Z.value?.focus() : N.value === "from" ? Q.value?.focus() : le.value?.focus();
      });
    }
    function ce() {
      V.value ? he() : re(void 0);
    }
    function De() {
      V.value && N.value === "from" ? he() : re("from");
    }
    function ve() {
      V.value && N.value === "to" ? he() : re("to");
    }
    watch(V, (G) => {
      G && nextTick(() => q.value?.focusInitialDay());
    });
    const Me = ref(0);
    const j = computed(() => f.range && Me.value >= 768 ? 2 : 1), L = computed(() => f.range ? c(
      N.value,
      H.value.from,
      H.value.to,
      f.yearRange,
      j.value
    ) : P.value ?? void 0);
    function W(G) {
      if (!f.range) {
        m("update:modelValue", G), he();
        return;
      }
      const z = H.value;
      let X = z.from, ie = z.to;
      if (N.value === "from" ? (X = G, ie && X > ie && (ie = null)) : N.value === "to" && (ie = G, X && ie < X && ([X, ie] = [ie, X])), m("update:modelValue", { from: X, to: ie }), N.value === "from" && !ie) {
        N.value = "to", nextTick(() => q.value?.focusInitialDay());
        return;
      }
      if (N.value === "to" && !X) {
        N.value = "from", nextTick(() => q.value?.focusInitialDay());
        return;
      }
      X && ie && he();
    }
    function ae(G) {
      U.value = G.target.value;
    }
    function ne(G) {
      const z = s(U.value, f.dateFormat);
      m("update:modelValue", z), m("blur", G);
    }
    function ue(G) {
      se.value = G.target.value;
    }
    function te(G) {
      let X = s(se.value, f.dateFormat), ie = H.value.to;
      X && ie && X > ie && (ie = null), m("update:modelValue", { from: X, to: ie }), m("blur", G);
    }
    function Ne(G) {
      O.value = G.target.value;
    }
    function Oe(G) {
      const z = s(O.value, f.dateFormat);
      let X = H.value.from, ie = z;
      X && ie && ie < X && ([X, ie] = [ie, X]), m("update:modelValue", { from: X, to: ie }), m("blur", G);
    }
    function Ze(G) {
      const z = [];
      return G && f.message && z.push(B.value), f.hint && z.push(_.value), z.join(" ") || void 0;
    }
    function Te(G, z) {
      const X = G ? `${G} date` : "date";
      if (!z) return `Choose ${X}`;
      const ie = s(z, f.dateFormat);
      if (!ie) return `Choose ${X}`;
      const Ve = ie.toLocaleDateString("en-AU", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      return `Change ${X}, ${Ve}`;
    }
    return t({
      focus: () => {
        f.range ? Q.value?.focus() : le.value?.focus();
      }
    }), (G, z) => f.range ? (openBlock(), createElementBlock("fieldset", {
      key: 1,
      class: normalizeClass(["agds-datepicker agds-datepicker--range", { "agds-datepicker--invalid": e.fromInvalid || e.toInvalid }])
    }, [
      createElementVNode("legend", {
        class: normalizeClass(["agds-datepicker__legend", { "sr-only": !e.label }])
      }, [
        createTextVNode(toDisplayString(e.label ?? "Date range"), 1),
        I.value ? (openBlock(), createElementBlock("span", Gg, toDisplayString(I.value), 1)) : createCommentVNode("", true)
      ], 2),
      e.hint ? (openBlock(), createElementBlock("span", {
        key: 0,
        id: _.value,
        class: "agds-datepicker__hint"
      }, toDisplayString(e.hint), 9, qg)) : createCommentVNode("", true),
      (e.fromInvalid || e.toInvalid) && e.message ? (openBlock(), createElementBlock("span", {
        key: 1,
        id: B.value,
        class: "agds-datepicker__message",
        role: "alert"
      }, toDisplayString(e.message), 9, zg)) : createCommentVNode("", true),
      createVNode(unref(PopoverRoot), {
        open: V.value,
        "onUpdate:open": z[8] || (z[8] = (X) => V.value = X)
      }, {
        default: withCtx(() => [
          createVNode(unref(PopoverAnchor), { "as-child": "" }, {
            default: withCtx(() => [
              createElementVNode("div", Hg, [
                createElementVNode("div", {
                  class: normalizeClass(["agds-datepicker__field", { "agds-datepicker__field--invalid": e.fromInvalid }])
                }, [
                  createElementVNode("label", {
                    for: h2.value,
                    class: "agds-datepicker__label agds-datepicker__label--range"
                  }, toDisplayString(e.fromLabel), 9, Ng),
                  createElementVNode("span", jg, toDisplayString(u(e.minDate ?? /* @__PURE__ */ new Date(), e.dateFormat)), 1),
                  createElementVNode("div", {
                    class: normalizeClass(["agds-datepicker__input-row", {
                      "agds-datepicker__input-row--open": V.value && N.value === "from",
                      "agds-datepicker__input-row--highlighted": V.value && N.value === "from"
                    }])
                  }, [
                    createElementVNode("input", {
                      id: h2.value,
                      type: "text",
                      class: normalizeClass(["agds-datepicker__input", { "agds-datepicker__input--invalid": e.fromInvalid }]),
                      value: se.value,
                      disabled: e.disabled,
                      required: e.required || void 0,
                      "aria-invalid": e.fromInvalid || void 0,
                      "aria-required": e.required || void 0,
                      "aria-describedby": Ze(e.fromInvalid),
                      placeholder: r(e.dateFormat),
                      autocomplete: "off",
                      onChange: ue,
                      onBlur: te,
                      onFocus: z[4] || (z[4] = (X) => m("focus", X))
                    }, null, 42, Wg),
                    createElementVNode("button", {
                      ref_key: "fromTriggerRef",
                      ref: Q,
                      type: "button",
                      class: "agds-datepicker__trigger",
                      disabled: e.disabled,
                      "aria-expanded": V.value && N.value === "from",
                      "aria-label": Te("start", se.value),
                      "aria-haspopup": "dialog",
                      onClick: De
                    }, [...z[10] || (z[10] = [
                      createElementVNode("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "1.75",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createElementVNode("rect", {
                          x: "3",
                          y: "4",
                          width: "18",
                          height: "18",
                          rx: "2",
                          ry: "2"
                        }),
                        createElementVNode("line", {
                          x1: "16",
                          y1: "2",
                          x2: "16",
                          y2: "6"
                        }),
                        createElementVNode("line", {
                          x1: "8",
                          y1: "2",
                          x2: "8",
                          y2: "6"
                        }),
                        createElementVNode("line", {
                          x1: "3",
                          y1: "10",
                          x2: "21",
                          y2: "10"
                        })
                      ], -1)
                    ])], 8, Ug)
                  ], 2)
                ], 2),
                createElementVNode("div", {
                  class: normalizeClass(["agds-datepicker__field", { "agds-datepicker__field--invalid": e.toInvalid }])
                }, [
                  createElementVNode("label", {
                    for: D.value,
                    class: "agds-datepicker__label agds-datepicker__label--range"
                  }, toDisplayString(e.toLabel), 9, Zg),
                  createElementVNode("span", Kg, toDisplayString(u(e.maxDate ?? /* @__PURE__ */ new Date(), e.dateFormat)), 1),
                  createElementVNode("div", {
                    class: normalizeClass(["agds-datepicker__input-row", {
                      "agds-datepicker__input-row--open": V.value && N.value === "to",
                      "agds-datepicker__input-row--highlighted": V.value && N.value === "to"
                    }])
                  }, [
                    createElementVNode("input", {
                      id: D.value,
                      type: "text",
                      class: normalizeClass(["agds-datepicker__input", { "agds-datepicker__input--invalid": e.toInvalid }]),
                      value: O.value,
                      disabled: e.disabled,
                      required: e.required || void 0,
                      "aria-invalid": e.toInvalid || void 0,
                      "aria-required": e.required || void 0,
                      "aria-describedby": Ze(e.toInvalid),
                      placeholder: r(e.dateFormat),
                      autocomplete: "off",
                      onChange: Ne,
                      onBlur: Oe,
                      onFocus: z[5] || (z[5] = (X) => m("focus", X))
                    }, null, 42, Yg),
                    createElementVNode("button", {
                      ref_key: "toTriggerRef",
                      ref: Z,
                      type: "button",
                      class: "agds-datepicker__trigger",
                      disabled: e.disabled,
                      "aria-expanded": V.value && N.value === "to",
                      "aria-label": Te("end", O.value),
                      "aria-haspopup": "dialog",
                      onClick: ve
                    }, [...z[11] || (z[11] = [
                      createElementVNode("svg", {
                        "aria-hidden": "true",
                        focusable: "false",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "1.75",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createElementVNode("rect", {
                          x: "3",
                          y: "4",
                          width: "18",
                          height: "18",
                          rx: "2",
                          ry: "2"
                        }),
                        createElementVNode("line", {
                          x1: "16",
                          y1: "2",
                          x2: "16",
                          y2: "6"
                        }),
                        createElementVNode("line", {
                          x1: "8",
                          y1: "2",
                          x2: "8",
                          y2: "6"
                        }),
                        createElementVNode("line", {
                          x1: "3",
                          y1: "10",
                          x2: "21",
                          y2: "10"
                        })
                      ], -1)
                    ])], 8, Xg)
                  ], 2)
                ], 2)
              ])
            ]),
            _: 1
          }),
          createVNode(unref(PopoverPortal), null, {
            default: withCtx(() => [
              createVNode(unref(PopoverContent), {
                class: "agds-datepicker__popover",
                side: "bottom",
                align: "start",
                "side-offset": 4,
                "trap-focus": false,
                "disable-outside-pointer-events": false,
                role: "dialog",
                "aria-label": "Choose date range",
                "aria-modal": "true",
                onOpenAutoFocus: z[6] || (z[6] = withModifiers(() => {
                }, ["prevent"])),
                onEscapeKeyDown: z[7] || (z[7] = withModifiers(() => {
                }, ["prevent"]))
              }, {
                default: withCtx(() => [
                  createVNode(Ba, {
                    ref_key: "calendarRef",
                    ref: q,
                    mode: "range",
                    "selected-from": H.value.from,
                    "selected-to": H.value.to,
                    "input-mode": N.value,
                    "min-date": e.minDate,
                    "max-date": e.maxDate,
                    "default-month": L.value,
                    "number-of-months": j.value,
                    "year-range": e.yearRange,
                    onSelect: W
                  }, null, 8, ["selected-from", "selected-to", "input-mode", "min-date", "max-date", "default-month", "number-of-months", "year-range"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["open"])
    ], 2)) : (openBlock(), createElementBlock("div", Lg, [
      createElementVNode("div", {
        class: normalizeClass(["agds-datepicker__field", { "agds-datepicker__field--invalid": e.invalid }])
      }, [
        createElementVNode("label", {
          for: x.value,
          class: "agds-datepicker__label"
        }, [
          createTextVNode(toDisplayString(e.label), 1),
          I.value ? (openBlock(), createElementBlock("span", Fg, toDisplayString(I.value), 1)) : createCommentVNode("", true)
        ], 8, Tg),
        createElementVNode("span", Pg, toDisplayString(u(e.minDate ?? e.maxDate ?? /* @__PURE__ */ new Date(), e.dateFormat)), 1),
        e.hint ? (openBlock(), createElementBlock("span", {
          key: 0,
          id: _.value,
          class: "agds-datepicker__hint"
        }, toDisplayString(e.hint), 9, Og)) : createCommentVNode("", true),
        e.invalid && e.message ? (openBlock(), createElementBlock("span", {
          key: 1,
          id: B.value,
          class: "agds-datepicker__message",
          role: "alert"
        }, toDisplayString(e.message), 9, Vg)) : createCommentVNode("", true),
        createVNode(unref(PopoverRoot), {
          open: V.value,
          "onUpdate:open": z[3] || (z[3] = (X) => V.value = X)
        }, {
          default: withCtx(() => [
            createVNode(unref(PopoverAnchor), { "as-child": "" }, {
              default: withCtx(() => [
                createElementVNode("div", {
                  class: normalizeClass(["agds-datepicker__input-row", { "agds-datepicker__input-row--open": V.value }])
                }, [
                  createElementVNode("input", mergeProps({
                    id: x.value,
                    type: "text",
                    class: ["agds-datepicker__input", { "agds-datepicker__input--invalid": e.invalid }],
                    value: U.value,
                    disabled: e.disabled,
                    required: e.required || void 0,
                    "aria-invalid": e.invalid || void 0,
                    "aria-required": e.required || void 0,
                    "aria-describedby": Ze(e.invalid),
                    placeholder: r(e.dateFormat),
                    autocomplete: "off"
                  }, G.$attrs, {
                    onChange: ae,
                    onBlur: ne,
                    onFocus: z[0] || (z[0] = (X) => m("focus", X))
                  }), null, 16, Rg),
                  createElementVNode("button", {
                    ref_key: "singleTriggerRef",
                    ref: le,
                    type: "button",
                    class: "agds-datepicker__trigger",
                    disabled: e.disabled,
                    "aria-expanded": V.value,
                    "aria-label": Te(void 0, U.value),
                    "aria-haspopup": "dialog",
                    onClick: ce
                  }, [...z[9] || (z[9] = [
                    createElementVNode("svg", {
                      "aria-hidden": "true",
                      focusable: "false",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.75",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("rect", {
                        x: "3",
                        y: "4",
                        width: "18",
                        height: "18",
                        rx: "2",
                        ry: "2"
                      }),
                      createElementVNode("line", {
                        x1: "16",
                        y1: "2",
                        x2: "16",
                        y2: "6"
                      }),
                      createElementVNode("line", {
                        x1: "8",
                        y1: "2",
                        x2: "8",
                        y2: "6"
                      }),
                      createElementVNode("line", {
                        x1: "3",
                        y1: "10",
                        x2: "21",
                        y2: "10"
                      })
                    ], -1)
                  ])], 8, Eg)
                ], 2)
              ]),
              _: 1
            }),
            createVNode(unref(PopoverPortal), null, {
              default: withCtx(() => [
                createVNode(unref(PopoverContent), {
                  class: "agds-datepicker__popover",
                  side: "bottom",
                  align: "start",
                  "side-offset": 4,
                  "trap-focus": false,
                  "disable-outside-pointer-events": false,
                  role: "dialog",
                  "aria-label": e.label ? `Choose ${e.label.toLowerCase()}` : "Choose date",
                  "aria-modal": "true",
                  onOpenAutoFocus: z[1] || (z[1] = withModifiers(() => {
                  }, ["prevent"])),
                  onEscapeKeyDown: z[2] || (z[2] = withModifiers(() => {
                  }, ["prevent"]))
                }, {
                  default: withCtx(() => [
                    createVNode(Ba, {
                      ref_key: "calendarRef",
                      ref: q,
                      mode: "single",
                      "selected-date": P.value,
                      "min-date": e.minDate,
                      "max-date": e.maxDate,
                      "default-month": L.value,
                      "number-of-months": 1,
                      "year-range": e.yearRange,
                      onSelect: W
                    }, null, 8, ["selected-date", "min-date", "max-date", "default-month", "year-range"])
                  ]),
                  _: 1
                }, 8, ["aria-label"])
              ]),
              _: 1
            })
          ]),
          _: 1
        }, 8, ["open"])
      ], 2)
    ]));
  }
}), Jg = /* @__PURE__ */ A(Qg, [["__scopeId", "data-v-fc8706dd"]]);
function vb() {
  return function(t) {
    const n = ef(t);
    if (!n)
      return;
    const a = (void 0).getElementById(n) ?? (void 0).getElementsByName(n)[0];
    a && (tf(n, a), typeof t != "string" && t.preventDefault());
  };
}
function ef(e) {
  if (typeof e == "string")
    return e;
  const t = e.target;
  if (t instanceof HTMLAnchorElement)
    return t.hash ? t.hash.substring(1) : void 0;
}
function tf(e, t) {
  t.tagName.toLowerCase() === "div" ? t.querySelector("input")?.focus() : t.focus(), ((void 0).querySelector(`label[for="${e}"]`)?.parentElement ?? t).scrollIntoView({ block: "nearest" });
}
const af = ["id", "aria-describedby"], nf = { class: "agds-fieldset__legend" }, of = ["id"], sf = { class: "agds-fieldset__content" }, lf = /* @__PURE__ */ defineComponent({
  __name: "AGDSFieldset",
  props: {
    legend: {},
    hint: {},
    id: {}
  },
  setup(e) {
    const t = e, n = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), a = computed(() => t.id ?? `fieldset-${n}`), o = computed(() => `fieldset-${n}-hint`);
    return (s, r) => (openBlock(), createElementBlock("fieldset", {
      id: a.value,
      "aria-describedby": e.hint ? o.value : void 0,
      class: "agds-fieldset"
    }, [
      createElementVNode("legend", nf, toDisplayString(e.legend), 1),
      e.hint ? (openBlock(), createElementBlock("span", {
        key: 0,
        id: o.value,
        class: "agds-fieldset__hint"
      }, toDisplayString(e.hint), 9, of)) : createCommentVNode("", true),
      createElementVNode("div", sf, [
        renderSlot(s.$slots, "default", {}, void 0, true)
      ])
    ], 8, af));
  }
}), rf = /* @__PURE__ */ A(lf, [["__scopeId", "data-v-481ea791"]]), df = { class: "agds-grouped-fields" }, uf = {
  class: "agds-grouped-fields__row",
  "data-grouped-fields": ""
}, cf = /* @__PURE__ */ defineComponent({
  __name: "AGDSGroupedFields",
  props: {
    legend: {},
    field1Invalid: { type: Boolean, default: false },
    field2Invalid: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    hint: {},
    id: {},
    message: {},
    visuallyHideLegend: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), a = computed(() => `grouped-fields-${n}-hint`), o = computed(() => `grouped-fields-${n}-message`), s = computed(() => t.field1Invalid || t.field2Invalid);
    function r(c) {
      const f = [];
      return c && t.message && f.push(o.value), t.hint && f.push(a.value), f.length > 0 ? f.join(" ") : void 0;
    }
    const u = computed(() => ({
      "aria-describedby": r(t.field1Invalid),
      "aria-invalid": t.field1Invalid
    })), g = computed(() => ({
      "aria-describedby": r(t.field2Invalid),
      "aria-invalid": t.field2Invalid
    }));
    return (c, f) => (openBlock(), createBlock(Bt, { invalid: s.value }, {
      default: withCtx(() => [
        createElementVNode("fieldset", df, [
          createVNode(Lt, {
            as: "legend",
            class: normalizeClass({ "agds-grouped-fields__legend--hidden": e.visuallyHideLegend }),
            "hide-optional-label": e.hideOptionalLabel,
            required: false
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(e.legend), 1)
            ]),
            _: 1
          }, 8, ["class", "hide-optional-label"]),
          createElementVNode("div", {
            class: normalizeClass(["agds-grouped-fields__stack", { "agds-grouped-fields__stack--spaced": !e.visuallyHideLegend }])
          }, [
            e.hint ? (openBlock(), createBlock(Tt, {
              key: 0,
              id: a.value
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(e.hint), 1)
              ]),
              _: 1
            }, 8, ["id"])) : createCommentVNode("", true),
            e.message && s.value ? (openBlock(), createBlock(Ft, {
              key: 1,
              id: o.value
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(e.message), 1)
              ]),
              _: 1
            }, 8, ["id"])) : createCommentVNode("", true),
            createElementVNode("div", uf, [
              renderSlot(c.$slots, "default", {
                field1Props: u.value,
                field2Props: g.value
              }, void 0, true)
            ])
          ], 2)
        ])
      ]),
      _: 3
    }, 8, ["invalid"]));
  }
}), gf = /* @__PURE__ */ A(cf, [["__scopeId", "data-v-a8f21ded"]]), pb = "data-grouped-fields", ff = ["for"], mf = {
  key: 0,
  class: "agds-file-input__optional"
}, vf = ["id"], pf = ["id"], hf = ["accept", "capture", "disabled", "multiple", "name"], bf = /* @__PURE__ */ defineComponent({
  __name: "AGDSFileInput",
  props: {
    label: {},
    id: {},
    accept: {},
    capture: {},
    disabled: { type: Boolean, default: false },
    autoFocus: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    name: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    buttonSize: { default: "sm" }
  },
  emits: ["change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = {
      "image/jpeg": { extensions: [".jpg", ".jpeg"], label: "JPEG" },
      "image/png": { extensions: [".png"], label: "PNG" },
      "image/gif": { extensions: [".gif"], label: "GIF" },
      "image/webp": { extensions: [".webp"], label: "WebP" },
      "image/svg+xml": { extensions: [".svg"], label: "SVG" },
      "application/pdf": { extensions: [".pdf"], label: "PDF" },
      "application/msword": { extensions: [".doc"], label: "DOC" },
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
        extensions: [".docx"],
        label: "DOCX"
      },
      "application/vnd.ms-excel": { extensions: [".xls"], label: "XLS" },
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
        extensions: [".xlsx"],
        label: "XLSX"
      },
      "text/csv": { extensions: [".csv"], label: "CSV" },
      "text/plain": { extensions: [".txt"], label: "TXT" },
      "application/zip": { extensions: [".zip"], label: "ZIP" },
      "video/mp4": { extensions: [".mp4"], label: "MP4" },
      "audio/mpeg": { extensions: [".mp3"], label: "MP3" }
    }, o = e, s = n, r = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), u = computed(() => o.id ?? `agds-file-input-${r}`), g = computed(() => `${u.value}-hint`), c = computed(() => `${u.value}-message`), f = ref([]), m = computed(() => f.value.length > 0);
    function p(le) {
      const Q = le.target;
      Q.files && (f.value = Array.from(Q.files).map((Z) => Z.name)), s("change", le);
    }
    const x = computed(() => {
      if (o.accept)
        return Array.isArray(o.accept) ? o.accept.join(",") : o.accept;
    }), h2 = computed(() => {
      if (!o.accept) return;
      if (typeof o.accept == "string") return o.accept;
      const le = /* @__PURE__ */ new Set();
      for (const Q of o.accept) {
        const Z = a[Q];
        Z ? le.add(Z.label ?? Z.extensions.join(", ")) : le.add(Q);
      }
      return [...le].join(", ");
    }), D = computed(() => {
      if (o.hint) return o.hint;
      if (h2.value) return `Files accepted: ${h2.value}`;
    }), _ = computed(() => o.multiple ? "files" : "file");
    function B(le) {
      return f.value.length === 0 ? `No ${_.value} selected` : f.value.length === 1 ? `${f.value[0]}${le ? "" : " selected"}` : `${f.value.length} files selected`;
    }
    const I = computed(() => B(true)), P = computed(() => B(false)), H = computed(() => `Select ${_.value}`), Y = computed(() => {
      if (!(o.required || o.hideOptionalLabel))
        return "(optional)";
    }), U = computed(
      () => [
        H.value,
        o.label,
        Y.value,
        o.required ? "required" : void 0,
        o.invalid ? "invalid" : void 0,
        P.value
      ].filter(Boolean).join(", ")
    ), se = computed(() => {
      const le = [];
      return D.value && le.push(g.value), o.message && le.push(c.value), le.length ? le.join(" ") : void 0;
    }), O = ref(null), V = ref(null);
    t({ focus: () => V.value?.focus() });
    function N() {
      O.value?.click();
    }
    return (le, Q) => (openBlock(), createBlock(Na, null, {
      default: withCtx(() => [
        createElementVNode("label", {
          for: u.value,
          class: "agds-file-input__label"
        }, [
          createTextVNode(toDisplayString(o.label) + " ", 1),
          Y.value ? (openBlock(), createElementBlock("span", mf, toDisplayString(Y.value), 1)) : createCommentVNode("", true)
        ], 8, ff),
        D.value ? (openBlock(), createElementBlock("span", {
          key: 0,
          id: g.value,
          class: "agds-file-input__hint"
        }, toDisplayString(D.value), 9, vf)) : createCommentVNode("", true),
        createVNode(at, {
          "flex-direction": "column",
          "align-items": "flex-start",
          gap: 1
        }, {
          default: withCtx(() => [
            createVNode(Ue, {
              ref_key: "visibleButtonRef",
              ref: V,
              id: u.value,
              variant: "secondary",
              size: o.buttonSize,
              disabled: o.disabled,
              "aria-label": U.value,
              "aria-describedby": se.value,
              "aria-invalid": o.invalid || void 0,
              type: "button",
              onClick: N,
              onFocus: Q[0] || (Q[0] = (Z) => s("focus", Z)),
              onBlur: Q[1] || (Q[1] = (Z) => s("blur", Z))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(H.value), 1)
              ]),
              _: 1
            }, 8, ["id", "size", "disabled", "aria-label", "aria-describedby", "aria-invalid"]),
            createElementVNode("span", {
              class: normalizeClass(["agds-file-input__file-name", { "agds-file-input__file-name--populated": m.value }]),
              "aria-hidden": "true"
            }, toDisplayString(I.value), 3)
          ]),
          _: 1
        }),
        o.message ? (openBlock(), createElementBlock("span", {
          key: 1,
          id: c.value,
          class: normalizeClass(["agds-file-input__message", { "agds-file-input__message--invalid": o.invalid }]),
          role: "alert"
        }, toDisplayString(o.message), 11, pf)) : createCommentVNode("", true),
        createElementVNode("input", {
          ref_key: "hiddenInputRef",
          ref: O,
          type: "file",
          accept: x.value,
          capture: o.capture,
          disabled: o.disabled,
          multiple: o.multiple,
          name: o.name,
          "aria-hidden": "true",
          tabindex: "-1",
          class: "agds-file-input__input",
          onChange: p
        }, null, 40, hf)
      ]),
      _: 1
    }));
  }
}), hb = /* @__PURE__ */ A(bf, [["__scopeId", "data-v-0bfcf206"]]), _f = ["href"], yf = /* @__PURE__ */ defineComponent({
  __name: "AGDSTextLink",
  props: {
    href: {},
    focusRingFor: { default: "keyboard" }
  },
  emits: ["click", "focus", "blur"],
  setup(e, { expose: t }) {
    const n = ref(null);
    return t({ focus: () => n.value?.focus() }), (a, o) => (openBlock(), createElementBlock("a", {
      ref_key: "anchorEl",
      ref: n,
      href: e.href,
      class: normalizeClass([
        "agds-text-link",
        { "agds-text-link--focus-all": e.focusRingFor === "all" }
      ]),
      onClick: o[0] || (o[0] = (s) => a.$emit("click", s)),
      onFocus: o[1] || (o[1] = (s) => a.$emit("focus", s)),
      onBlur: o[2] || (o[2] = (s) => a.$emit("blur", s))
    }, [
      renderSlot(a.$slots, "default", {}, void 0, true)
    ], 42, _f));
  }
}), Pt = /* @__PURE__ */ A(yf, [["__scopeId", "data-v-4c648a8d"]]), kf = {
  key: 1,
  class: "agds-file-upload-thumbnail agds-file-upload-thumbnail--icon",
  "aria-hidden": "true"
}, Sf = /* @__PURE__ */ defineComponent({
  __name: "AGDSFileUploadFileThumbnail",
  props: {
    src: {}
  },
  setup(e) {
    return (t, n) => e.src ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: "agds-file-upload-thumbnail agds-file-upload-thumbnail--image",
      style: normalizeStyle({ backgroundImage: `url(${e.src})` }),
      "aria-hidden": "true"
    }, null, 4)) : (openBlock(), createElementBlock("div", kf, [...n[0] || (n[0] = [
      createElementVNode("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        width: "24",
        height: "24",
        fill: "currentColor",
        focusable: "false",
        "aria-hidden": "true"
      }, [
        createElementVNode("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 5h8v2H8v-2zm0-4h8v2H8v-2z" })
      ], -1)
    ])]));
  }
}), kn = /* @__PURE__ */ A(Sf, [["__scopeId", "data-v-7be25cc3"]]), Sn = "file-too-large", $n = "file-invalid-type", $f = "too-many-files", xn = {
  code: $f,
  message: "Too many files"
}, xf = {
  // Application
  "application/msword": { extensions: [".doc"] },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": { extensions: [".docx"] },
  "application/pdf": { extensions: [".pdf"] },
  "application/rtf": { extensions: [".rtf"] },
  "application/vnd.ms-excel": { extensions: [".xls"] },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": { extensions: [".xlsx"] },
  "application/vnd.ms-outlook": { extensions: [".msg"] },
  "application/zip": { extensions: [".zip"] },
  "application/xml": { extensions: [".xml"] },
  // Audio
  "audio/*": { extensions: [], label: "Any audio file" },
  "audio/mpeg": { extensions: [".mp3"] },
  "audio/wav": { extensions: [".wav"] },
  // Image
  "image/*": { extensions: [], label: "Any image file" },
  "image/gif": { extensions: [".gif"] },
  "image/heic": { extensions: [".heic"] },
  "image/jpg": { extensions: [".jpeg", ".jpg"] },
  "image/jpeg": { extensions: [".jpeg", ".jpg"] },
  "image/png": { extensions: [".png"] },
  "image/svg+xml": { extensions: [".svg"] },
  "image/tiff": { extensions: [".tif", ".tiff"] },
  "image/webp": { extensions: [".webp"] },
  // Text
  "text/*": { extensions: [], label: "Any text file" },
  "text/csv": { extensions: [".csv"] },
  "text/plain": { extensions: [".txt"] },
  "text/rtf": { extensions: [".rtf"] },
  "text/xml": { extensions: [".xml"] },
  // Video
  "video/*": { extensions: [], label: "Any video file" },
  "video/mp4": { extensions: [".mp4"] },
  "video/mpeg": { extensions: [".mpeg"] }
}, Et = 1e3, Wt = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], La = Wt.length - 1;
function wf(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Je(e) {
  let t = Number(e);
  if (isNaN(t))
    return "Unknown";
  const n = t < 0;
  n && (t = -t);
  const a = wf(Math.floor(Math.log(t) / Math.log(Et)), 0, La), o = t / Math.pow(Et, a), s = Math.pow(10, a > 0 ? 2 : 0);
  let r = Math.round(o * s) / s;
  return r === Et && a < La ? (r = 1, `${n ? -1 : 1} ${Wt[a + 1]}`) : `${n ? -r : r} ${Wt[a]}`;
}
function Af(e) {
  return e.length === 0 ? "" : `${e.length} ${e.length === 1 ? "file" : "files"} selected`;
}
function Ta(e) {
  return e.replace(/^\./, "").toUpperCase();
}
function Df(e) {
  if (!e?.length)
    return;
  const t = [];
  for (const n of e)
    if (typeof n == "string") {
      const a = xf[n];
      a && (a.label ? t.push(a.label) : a.extensions.forEach((o) => t.push(Ta(o))));
    } else n.label ? t.push(n.label) : n.extensions.forEach((a) => t.push(Ta(a)));
  return t.filter((n, a, o) => o.indexOf(n) === a).join(", ");
}
function Cf(e, t) {
  if (!e?.length)
    return "";
  const n = [...new Set(e.map((a) => a.code))];
  return n.includes($n) ? "Invalid file type" : n.includes(Sn) ? `File is over ${t}` : xn.message;
}
function If(e) {
  const t = /image\/(png|jpg|jpeg|webp|heic)/i;
  return e.type.match(t) ? URL.createObjectURL(e) : void 0;
}
function Mf(e) {
  return { file: e, errors: [xn] };
}
function Bf(e, t) {
  const n = [...e];
  return n.splice(t, 1), n;
}
function Lf(e, t, n) {
  const a = [];
  return t && (Object.keys(t).some((s) => {
    if (s.endsWith("/*")) {
      const r = s.slice(0, -2);
      return e.type.startsWith(r + "/");
    }
    return e.type === s;
  }) || a.push({ code: $n, message: "File type not accepted" })), n > 0 && e.size > n && a.push({ code: Sn, message: "File is too large" }), a;
}
const Tf = {
  key: 0,
  class: "agds-file-upload-file__thumb-wrapper"
}, Ff = { class: "agds-file-upload-file__info" }, Pf = {
  key: 0,
  class: "agds-file-upload-file__success-icon",
  role: "img",
  "aria-label": "Success"
}, Of = { class: "agds-file-upload-file__name" }, Vf = {
  key: 0,
  class: "agds-file-upload-file__size"
}, Rf = { class: "agds-file-upload-file__actions" }, Ef = {
  key: 0,
  class: "agds-file-upload-file__uploading",
  "aria-label": "Uploading"
}, Gf = /* @__PURE__ */ defineComponent({
  __name: "AGDSFileUploadFile",
  props: {
    file: {},
    hideThumbnails: { type: Boolean },
    onRemove: { type: Function }
  },
  setup(e) {
    const t = e, n = computed(() => t.file.status ?? "none"), a = computed(() => If(t.file));
    const o = computed(
      () => t.file.size ? ` (${Je(t.file.size)})` : ""
    );
    return (s, r) => (openBlock(), createElementBlock("li", {
      class: normalizeClass(["agds-file-upload-file", {
        "agds-file-upload-file--success": n.value === "success",
        "agds-file-upload-file--shade": n.value !== "success"
      }])
    }, [
      e.hideThumbnails ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Tf, [
        createVNode(kn, { src: a.value }, null, 8, ["src"])
      ])),
      createElementVNode("div", Ff, [
        n.value === "success" ? (openBlock(), createElementBlock("span", Pf, [...r[0] || (r[0] = [
          createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "20",
            height: "20",
            fill: "currentColor",
            focusable: "false",
            "aria-hidden": "true"
          }, [
            createElementVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
          ], -1)
        ])])) : createCommentVNode("", true),
        createElementVNode("span", Of, [
          e.file.href ? (openBlock(), createBlock(Pt, {
            key: 0,
            href: e.file.href,
            download: e.file.download,
            rel: "noopener noreferrer",
            target: "_blank"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(e.file.name) + toDisplayString(o.value), 1)
            ]),
            _: 1
          }, 8, ["href", "download"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.file.name), 1),
            e.file.size ? (openBlock(), createElementBlock("span", Vf, " (" + toDisplayString(unref(Je)(e.file.size)) + ")", 1)) : createCommentVNode("", true)
          ], 64))
        ])
      ]),
      createElementVNode("div", Rf, [
        n.value === "uploading" ? (openBlock(), createElementBlock("div", Ef, [...r[1] || (r[1] = [
          createElementVNode("span", {
            class: "agds-file-upload-file__spinner",
            "aria-hidden": "true"
          }, null, -1),
          createElementVNode("span", { class: "sr-only" }, "Uploading", -1)
        ])])) : (openBlock(), createBlock(Ue, {
          key: 1,
          variant: "text",
          size: "sm",
          type: "button",
          "aria-label": `Remove file: ${e.file.name}`,
          onClick: e.onRemove
        }, {
          iconBefore: withCtx(() => [...r[2] || (r[2] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "16",
              height: "16",
              fill: "currentColor",
              focusable: "false",
              "aria-hidden": "true"
            }, [
              createElementVNode("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
            ], -1)
          ])]),
          default: withCtx(() => [
            r[3] || (r[3] = createTextVNode(" Remove ", -1))
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"]))
      ])
    ], 2));
  }
}), qf = /* @__PURE__ */ A(Gf, [["__scopeId", "data-v-711952d3"]]), zf = { class: "agds-file-upload-existing-file" }, Hf = {
  key: 0,
  class: "agds-file-upload-existing-file__thumb-wrapper"
}, Nf = { class: "agds-file-upload-existing-file__info" }, jf = { class: "agds-file-upload-existing-file__name" }, Wf = {
  key: 0,
  class: "agds-file-upload-existing-file__size"
}, Uf = { class: "agds-file-upload-existing-file__actions" }, Zf = /* @__PURE__ */ defineComponent({
  __name: "AGDSFileUploadExistingFile",
  props: {
    file: {},
    hideThumbnails: { type: Boolean },
    onRemove: { type: Function }
  },
  setup(e) {
    const t = e, n = computed(
      () => t.file.size ? ` (${Je(t.file.size)})` : ""
    );
    return (a, o) => (openBlock(), createElementBlock("li", zf, [
      e.hideThumbnails ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", Hf, [
        createVNode(kn, {
          src: e.file.thumbnailSrc
        }, null, 8, ["src"])
      ])),
      createElementVNode("div", Nf, [
        o[1] || (o[1] = createElementVNode("span", {
          class: "agds-file-upload-existing-file__success-icon",
          role: "img",
          "aria-label": "Success"
        }, [
          createElementVNode("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            width: "20",
            height: "20",
            fill: "currentColor",
            focusable: "false",
            "aria-hidden": "true"
          }, [
            createElementVNode("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" })
          ])
        ], -1)),
        createElementVNode("span", jf, [
          e.file.href ? (openBlock(), createBlock(Pt, {
            key: 0,
            href: e.file.href,
            download: e.file.download,
            rel: "noopener noreferrer",
            target: "_blank",
            onClick: o[0] || (o[0] = (s) => e.file.onClick && e.file.onClick(s))
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(e.file.name) + toDisplayString(n.value), 1)
            ]),
            _: 1
          }, 8, ["href", "download"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createTextVNode(toDisplayString(e.file.name), 1),
            e.file.size ? (openBlock(), createElementBlock("span", Wf, " (" + toDisplayString(unref(Je)(e.file.size)) + ")", 1)) : createCommentVNode("", true)
          ], 64))
        ])
      ]),
      createElementVNode("div", Uf, [
        createVNode(Ue, {
          variant: "text",
          size: "sm",
          type: "button",
          "aria-label": `Remove file: ${e.file.name}`,
          onClick: e.onRemove
        }, {
          iconBefore: withCtx(() => [...o[2] || (o[2] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "16",
              height: "16",
              fill: "currentColor",
              focusable: "false",
              "aria-hidden": "true"
            }, [
              createElementVNode("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
            ], -1)
          ])]),
          default: withCtx(() => [
            o[3] || (o[3] = createTextVNode(" Remove ", -1))
          ]),
          _: 1
        }, 8, ["aria-label", "onClick"])
      ])
    ]));
  }
}), Kf = /* @__PURE__ */ A(Zf, [["__scopeId", "data-v-e80881ab"]]), Yf = { class: "agds-file-upload__stack" }, Xf = {
  role: "status",
  class: "sr-only",
  "aria-live": "polite",
  "aria-atomic": "true"
}, Qf = ["accept", "multiple", "disabled", "name"], Jf = { class: "agds-file-upload__instructions" }, em = {
  key: 0,
  class: "agds-file-upload__drop-text",
  "aria-hidden": "true"
}, tm = ["id"], am = ["id"], nm = {
  key: 0,
  class: "agds-file-upload__error-panel",
  role: "alert"
}, om = { class: "agds-file-upload__error-header" }, sm = { class: "agds-file-upload__error-title" }, lm = { class: "agds-file-upload__error-intro" }, im = { class: "agds-file-upload__error-list" }, rm = { class: "agds-file-upload__error-filename" }, dm = { class: "agds-file-upload__error-size" }, um = {
  key: 1,
  class: "agds-file-upload__file-lists"
}, cm = {
  key: 0,
  class: "agds-file-upload__summary"
}, gm = {
  key: 1,
  class: "agds-file-upload__list",
  "aria-label": "Existing files"
}, fm = {
  key: 2,
  class: "agds-file-upload__list",
  "aria-label": "Selected files"
}, mm = /* @__PURE__ */ defineComponent({
  __name: "AGDSFileUpload",
  props: {
    label: {},
    modelValue: { default: () => [] },
    hideOptionalLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    id: {},
    name: {},
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    accept: {},
    maxFiles: {},
    maxSize: {},
    hideThumbnails: { type: Boolean, default: false },
    existingFiles: { default: () => [] }
  },
  emits: ["update:modelValue", "remove-existing-file", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `file-upload-${s}`), u = computed(() => a.maxSize ? `${r.value}-size-desc` : ""), g = computed(() => a.accept?.length ? `${r.value}-accept-desc` : ""), c = computed(() => {
      if (!a.accept?.length) return;
      const L = [];
      for (const W of a.accept)
        typeof W == "string" ? L.push([W, []]) : L.push([W.mimeType, W.extensions]);
      return Object.fromEntries(L);
    }), f = computed(() => {
      if (a.accept?.length)
        return a.accept.map((L) => typeof L == "string" ? L : L.mimeType).join(",");
    }), m = computed(
      () => a.maxSize && !isNaN(a.maxSize) ? a.maxSize * 1e3 : 0
    ), p = computed(() => Je(m.value)), x = computed(() => {
      if (a.maxFiles !== void 0) {
        if (a.maxFiles < 1) {
          console.warn("AgDSFileUpload: maxFiles cannot be less than 1. The property is being ignored.");
          return;
        }
        return a.maxFiles;
      }
    }), h2 = ref([]), D = ref([]), _ = computed(
      () => h2.value.length > 0 || D.value.length > 0
    ), B = computed(() => [
      ...h2.value,
      ...D.value
    ]), I = computed(() => B.value.length > 1);
    function P() {
      h2.value = [], D.value = [];
    }
    const H = ref("");
    function Y(L) {
      P();
      const W = [], ae = [];
      for (const ue of L) {
        const te = Lf(ue, c.value, m.value);
        te.length ? ae.push({ file: ue, errors: te }) : W.push(ue);
      }
      if (ae.length && (h2.value = ae), !W.length) return;
      let ne;
      if (a.multiple) {
        const ue = [...a.modelValue, ...W], te = Object.values(
          ue.reduce(
            (Ne, Oe) => ({ ...Ne, [`${Oe.name}-${Oe.size}-${Oe.type}`]: Oe }),
            {}
          )
        );
        x.value && te.length > x.value ? (D.value = te.slice(x.value).map(Mf), ne = te.slice(0, x.value)) : ne = te;
      } else
        ne = [W[0]];
      H.value = ne.map((ue) => ue.name).join(", ") + " added", o("update:modelValue", ne);
    }
    const U = ref(0), se = computed(() => U.value > 0);
    function O(L) {
      L.preventDefault(), !a.disabled && U.value++;
    }
    function V(L) {
      L.preventDefault();
    }
    function N(L) {
      L.preventDefault(), U.value = Math.max(0, U.value - 1);
    }
    function le(L) {
      if (L.preventDefault(), U.value = 0, a.disabled) return;
      const W = Array.from(L.dataTransfer?.files ?? []);
      W.length && Y(W);
    }
    const Q = ref(null), Z = ref(null);
    function q() {
      Q.value?.click();
    }
    function re(L) {
      const W = Array.from(L.target.files ?? []);
      W.length && Y(W), L.target.value = "";
    }
    function me(L) {
      P();
      const W = a.modelValue[L];
      H.value = W.name + " removed", o("update:modelValue", Bf(a.modelValue, L));
    }
    function he(L) {
      H.value = L.name + " removed", o("remove-existing-file", L);
    }
    const ce = computed(
      () => Af([...a.modelValue, ...a.existingFiles])
    ), De = computed(
      () => a.modelValue.length > 0 || a.existingFiles.length > 0
    ), ve = computed(() => Df(a.accept)), Le = computed(() => a.multiple ? "files" : "file"), Me = computed(() => `Select ${Le.value}`), R = computed(
      () => a.required || a.hideOptionalLabel ? void 0 : "(optional)"
    ), j = computed(
      () => [
        Me.value,
        a.label,
        R.value,
        a.required ? "required" : void 0,
        a.invalid ? "invalid" : void 0,
        ce.value || void 0
      ].filter(Boolean).join(", ")
    );
    return t({ focus: () => Z.value?.focus() }), (L, W) => (openBlock(), createBlock(Pe, {
      label: a.label,
      id: r.value,
      hint: a.hint,
      invalid: a.invalid,
      message: a.message,
      required: a.required,
      "hide-optional-label": a.hideOptionalLabel
    }, {
      default: withCtx((ae) => [
        createElementVNode("div", Yf, [
          createElementVNode("div", Xf, toDisplayString(H.value), 1),
          createElementVNode("div", {
            class: normalizeClass(["agds-file-upload__dropzone", {
              "agds-file-upload__dropzone--invalid": a.invalid,
              "agds-file-upload__dropzone--disabled": a.disabled,
              "agds-file-upload__dropzone--drag-active": se.value
            }]),
            onDragenter: O,
            onDragover: V,
            onDragleave: N,
            onDrop: le
          }, [
            W[2] || (W[2] = createElementVNode("span", {
              class: "agds-file-upload__icon",
              "aria-hidden": "true"
            }, [
              createElementVNode("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 24 24",
                width: "32",
                height: "32",
                fill: "currentColor",
                focusable: "false",
                "aria-hidden": "true"
              }, [
                createElementVNode("path", { d: "M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" })
              ])
            ], -1)),
            createElementVNode("input", {
              ref_key: "hiddenInputRef",
              ref: Q,
              type: "file",
              accept: f.value,
              multiple: a.multiple,
              disabled: a.disabled,
              name: a.name,
              "aria-hidden": "true",
              tabindex: "-1",
              class: "sr-only",
              onChange: re
            }, null, 40, Qf),
            createElementVNode("div", Jf, [
              createElementVNode("span", {
                class: normalizeClass(["agds-file-upload__drag-text", { "agds-file-upload__drag-text--hidden": se.value }])
              }, toDisplayString(a.multiple ? "Drag and drop files here or select files to upload." : "Drag and drop a file or select a file to upload."), 3),
              se.value ? (openBlock(), createElementBlock("span", em, " Drop " + toDisplayString(Le.value) + " here… ", 1)) : createCommentVNode("", true),
              a.maxSize ? (openBlock(), createElementBlock("span", {
                key: 1,
                id: u.value,
                class: "agds-file-upload__desc-text"
              }, toDisplayString(a.multiple ? "Each file" : "File") + " cannot exceed " + toDisplayString(p.value) + ". ", 9, tm)) : createCommentVNode("", true),
              ve.value ? (openBlock(), createElementBlock("span", {
                key: 2,
                id: g.value,
                class: "agds-file-upload__desc-text"
              }, " Files accepted: " + toDisplayString(ve.value) + ". ", 9, am)) : createCommentVNode("", true)
            ]),
            createVNode(Ue, {
              ref_key: "triggerButtonRef",
              ref: Z,
              variant: "secondary",
              type: "button",
              id: ae.id,
              disabled: a.disabled,
              "aria-label": j.value,
              "aria-describedby": [ae["aria-describedby"], u.value, g.value].filter(Boolean).join(" ") || void 0,
              "focus-ring-for": "all",
              onClick: q,
              onFocus: W[0] || (W[0] = (ne) => o("focus", ne)),
              onBlur: W[1] || (W[1] = (ne) => o("blur", ne))
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(Me.value), 1)
              ]),
              _: 1
            }, 8, ["id", "disabled", "aria-label", "aria-describedby"])
          ], 34),
          _.value ? (openBlock(), createElementBlock("div", nm, [
            createElementVNode("div", om, [
              createElementVNode("span", sm, " The following " + toDisplayString(I.value ? "files" : "file") + " could not be selected ", 1),
              createElementVNode("button", {
                type: "button",
                class: "agds-file-upload__error-close",
                "aria-label": "Dismiss error",
                onClick: P
              }, [...W[3] || (W[3] = [
                createElementVNode("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  width: "20",
                  height: "20",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  focusable: "false",
                  "aria-hidden": "true"
                }, [
                  createElementVNode("path", { d: "M18 6 6 18M6 6l12 12" })
                ], -1),
                createElementVNode("span", { class: "sr-only" }, "Close", -1)
              ])])
            ]),
            createElementVNode("p", lm, toDisplayString(I.value ? "These files were unable to be accepted for the following reasons:" : "This file was unable to be accepted for the following reason:"), 1),
            createElementVNode("ul", im, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(B.value, (ne) => (openBlock(), createElementBlock("li", {
                key: ne.file.name,
                class: "agds-file-upload__error-item"
              }, [
                createElementVNode("span", rm, toDisplayString(ne.file.name), 1),
                createElementVNode("span", dm, " (" + toDisplayString(unref(Je)(ne.file.size)) + ")", 1),
                createElementVNode("span", null, " — " + toDisplayString(unref(Cf)(ne.errors, p.value)), 1)
              ]))), 128))
            ])
          ])) : createCommentVNode("", true),
          De.value ? (openBlock(), createElementBlock("div", um, [
            ce.value ? (openBlock(), createElementBlock("p", cm, toDisplayString(ce.value), 1)) : createCommentVNode("", true),
            a.existingFiles.length ? (openBlock(), createElementBlock("ul", gm, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(a.existingFiles, (ne, ue) => (openBlock(), createBlock(Kf, {
                key: ue,
                file: ne,
                "hide-thumbnails": a.hideThumbnails,
                "on-remove": () => he(ne)
              }, null, 8, ["file", "hide-thumbnails", "on-remove"]))), 128))
            ])) : createCommentVNode("", true),
            a.modelValue.length ? (openBlock(), createElementBlock("ul", fm, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(a.modelValue, (ne, ue) => (openBlock(), createBlock(qf, {
                key: ue,
                file: ne,
                "hide-thumbnails": a.hideThumbnails,
                "on-remove": () => me(ue)
              }, null, 8, ["file", "hide-thumbnails", "on-remove"]))), 128))
            ])) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label"]));
  }
}), vm = /* @__PURE__ */ A(mm, [["__scopeId", "data-v-af7c3074"]]), pm = ["type", "name", "disabled", "autofocus", "autocomplete", "inputmode", "maxlength", "pattern", "placeholder", "value"], hm = /* @__PURE__ */ defineComponent({
  __name: "AGDSTextInput",
  props: {
    label: {},
    hideOptionalLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: { default: "md" },
    autoComplete: {},
    autoFocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: {},
    inputMode: {},
    maxLength: {},
    name: {},
    pattern: {},
    placeholder: {},
    type: { default: "text" },
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `text-input-${s}`), u = ref(null), g = ref(a.modelValue ?? ""), c = computed(
      () => a.modelValue !== void 0 ? a.modelValue : g.value
    );
    function f(x) {
      const h2 = x.target.value;
      g.value = h2, o("update:modelValue", h2);
    }
    const m = {
      xs: "10ch",
      sm: "20ch",
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, p = computed(
      () => a.block ? { width: "100%" } : { maxWidth: m[a.maxWidth] }
    );
    return t({ focus: () => u.value?.focus() }), (x, h2) => (openBlock(), createBlock(Pe, {
      label: a.label,
      id: r.value,
      hint: a.hint,
      invalid: a.invalid,
      message: a.message,
      required: a.required,
      "hide-optional-label": a.hideOptionalLabel,
      "max-width": a.maxWidth
    }, {
      default: withCtx((D) => [
        createElementVNode("input", mergeProps({
          ref_key: "inputRef",
          ref: u
        }, D, {
          class: ["agds-text-input", {
            "agds-text-input--invalid": a.invalid,
            "agds-text-input--block": a.block
          }],
          style: p.value,
          type: a.type,
          name: a.name,
          disabled: a.disabled,
          autofocus: a.autoFocus || void 0,
          autocomplete: a.autoComplete,
          inputmode: a.inputMode,
          maxlength: a.maxLength,
          pattern: a.pattern,
          placeholder: a.placeholder,
          value: c.value,
          onInput: f,
          onChange: h2[0] || (h2[0] = (_) => o("change", _)),
          onFocus: h2[1] || (h2[1] = (_) => o("focus", _)),
          onBlur: h2[2] || (h2[2] = (_) => o("blur", _))
        }), null, 16, pm)
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "max-width"]));
  }
}), bm = /* @__PURE__ */ A(hm, [["__scopeId", "data-v-96ab7024"]]), _m = [
  "h:mm aaa",
  "h:mm aa",
  "HH:mm",
  "hh:mm aaa",
  "hh:mm aa"
];
function ym(e) {
  if (!e)
    return null;
  const t = e.toLowerCase().trim(), n = t.endsWith("pm"), a = t.endsWith("am"), o = t.replace(/[ap]m$/, "").replace(/\W/g, "");
  if (!o)
    return null;
  let s, r;
  if (o.length <= 2)
    s = parseInt(o, 10), r = 0;
  else if (o.length === 3)
    s = parseInt(o.slice(0, 1), 10), r = parseInt(o.slice(1), 10);
  else if (o.length === 4)
    s = parseInt(o.slice(0, 2), 10), r = parseInt(o.slice(2), 10);
  else
    return null;
  return isNaN(s) || isNaN(r) || (n && s !== 12 && s < 12 && (s += 12), a && s === 12 && (s = 0), s < 0 || s > 24) || r < 0 || r > 59 ? null : { hours: s, minutes: r };
}
function Ye(e, t) {
  if (!e)
    return "";
  const n = ym(e);
  if (!n)
    return "";
  const { hours: a, minutes: o } = n, s = String(o).padStart(2, "0");
  switch (t) {
    case "HH:mm":
      return `${String(a).padStart(2, "0")}:${s}`;
    case "h:mm aaa": {
      const r = a % 12 || 12, u = a < 12 ? "am" : "pm";
      return `${r}:${s} ${u}`;
    }
    case "h:mm aa": {
      const r = a % 12 || 12, u = a < 12 ? "AM" : "PM";
      return `${r}:${s} ${u}`;
    }
    case "hh:mm aaa": {
      const r = String(a % 12 || 12).padStart(2, "0"), u = a < 12 ? "am" : "pm";
      return `${r}:${s} ${u}`;
    }
    case "hh:mm aa": {
      const r = String(a % 12 || 12).padStart(2, "0"), u = a < 12 ? "AM" : "PM";
      return `${r}:${s} ${u}`;
    }
    default:
      return `${String(a).padStart(2, "0")}:${s}`;
  }
}
function Fa(e, t) {
  return e ? Ye(e, t) : "";
}
const km = ["name", "disabled", "placeholder", "value"], Sm = /* @__PURE__ */ defineComponent({
  __name: "AGDSTimeInput",
  props: {
    label: {},
    id: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: { default: "md" },
    timeFormat: { default: "h:mm aaa" },
    disabled: { type: Boolean, default: false },
    name: {},
    placeholder: {},
    modelValue: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `time-input-${s}`), u = ref(null), g = ref(
      Fa(a.modelValue?.value, a.timeFormat)
    );
    watch(
      () => [a.modelValue, a.timeFormat],
      ([h2, D]) => {
        g.value = Fa(h2?.value, D);
      }
    );
    function c(h2) {
      g.value = h2.target.value;
    }
    function f(h2) {
      const D = h2.target.value, _ = Ye(D, "HH:mm"), B = _ ? { formatted: Ye(D, a.timeFormat), value: _ } : void 0;
      o("update:modelValue", B), o("change", B), o("blur", h2);
    }
    const m = computed(() => {
      const h2 = _m.includes(a.timeFormat) ? a.timeFormat : "h:mm aaa";
      return "(e.g. " + Ye("21:30", h2) + ")";
    }), p = {
      xs: "10ch",
      sm: "20ch",
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, x = computed(
      () => a.block ? { width: "100%" } : { maxWidth: p[a.maxWidth] }
    );
    return t({ focus: () => u.value?.focus() }), (h2, D) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: r.value,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": m.value,
      "max-width": e.maxWidth
    }, {
      default: withCtx((_) => [
        createElementVNode("input", mergeProps({
          ref_key: "inputRef",
          ref: u
        }, _, {
          class: ["agds-time-input", {
            "agds-time-input--invalid": e.invalid,
            "agds-time-input--block": e.block
          }],
          style: x.value,
          type: "text",
          name: e.name,
          disabled: e.disabled,
          placeholder: e.placeholder,
          value: g.value,
          onInput: c,
          onBlur: f,
          onFocus: D[0] || (D[0] = (B) => o("focus", B))
        }), null, 16, km)
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), $m = /* @__PURE__ */ A(Sm, [["__scopeId", "data-v-a8c53097"]]);
function Ut(e, t, n) {
  const a = Math.min(Math.max(e, t), n);
  return isNaN(a) ? 0 : a;
}
function Pa(e) {
  const [t, n] = e.split(":").map(Number);
  return [Ut(t, 0, 24), Ut(n, 0, 59)];
}
function xm(e, t) {
  return `${String(e).padStart(2, "0")}:${String(t).padStart(2, "0")}`;
}
function wm(e, t = "", n) {
  const a = t.toLowerCase().replace(/\W/g, ""), o = Ye(a, "HH:mm");
  return e.filter((s) => {
    const [r, u] = s.value.split(":"), g = `${r}${u}`;
    return (
      // Exact normalised match: user typed "9:30" → "09:30" matches stored value
      o === s.value || // Partial digit match: user typed "930" matches "0930" stored as "09:30"
      g.includes(a) || // Label substring match: user typed "9:30 pm"
      s.label.toLowerCase().includes(a) || // Midnight alias: "1200" or "2400" should match "00:00"
      a.length < 4 && (a.startsWith("12") || a.startsWith("24")) && r === "00" || // Normalised label match (strips colons/spaces for comparison)
      s.label.toLowerCase().replace(/\W/g, "").includes(a)
    );
  });
}
function Am({ interval: e, max: t, min: n, timeFormat: a }) {
  const [o, s] = Pa(n), [r, u] = Pa(t), g = isNaN(Number(e)) ? 60 : Math.round(Ut(Number(e), 1, 180));
  let c, f, m, p;
  o > r ? (c = r, f = u, m = o, p = s) : o === r && s > u ? (c = o, f = u, m = r, p = s) : (c = o, f = s, m = r, p = u);
  const x = c * 60 + f, h2 = m * 60 + p, D = [];
  for (let _ = x; _ <= h2; _ += g) {
    const B = Math.floor(_ / 60), I = _ % 60, P = xm(B, I);
    B !== 24 && D.push({
      label: Ye(P, a),
      value: P
    });
  }
  return D;
}
const Dm = {
  key: 0,
  class: "agds-time-picker__loading",
  "aria-live": "polite"
}, Cm = /* @__PURE__ */ defineComponent({
  __name: "AGDSTimePicker",
  props: /* @__PURE__ */ mergeModels({
    label: {},
    id: {},
    labelId: {},
    hint: {},
    invalid: { type: Boolean, default: false },
    message: {},
    required: { type: Boolean, default: false },
    hideOptionalLabel: { type: Boolean },
    secondaryLabel: {},
    placeholder: {},
    name: {},
    disabled: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: {},
    interval: { default: 15 },
    loading: { type: Boolean, default: false },
    max: { default: "24:00" },
    min: { default: "00:00" },
    timeFormat: { default: "h:mm aaa" },
    emptyResultsMessage: { default: "No options found" }
  }, {
    modelValue: { default: null },
    modelModifiers: {}
  }),
  emits: /* @__PURE__ */ mergeModels(["focus", "blur"], ["update:modelValue"]),
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = useModel(e, "modelValue"), r = computed({
      get: () => s.value?.value,
      set: (x) => {
        s.value = x != null ? c.value.find((h2) => h2.value === x) ?? null : null;
      }
    }), u = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), g = computed(() => a.id ?? `agds-time-picker-${u}`), c = computed(
      () => Am({
        interval: a.interval,
        max: a.max,
        min: a.min,
        timeFormat: a.timeFormat
      })
    ), f = ref("");
    watch(c, () => {
      f.value = "";
    });
    const m = computed(() => wm(c.value, f.value)), p = ref(null);
    return t({ focus: () => p.value?.querySelector("input")?.focus() }), (x, h2) => (openBlock(), createBlock(Pe, {
      label: e.label,
      id: g.value,
      "label-id": e.labelId,
      hint: e.hint,
      invalid: e.invalid,
      message: e.message,
      required: e.required,
      "hide-optional-label": e.hideOptionalLabel,
      "secondary-label": e.secondaryLabel,
      "max-width": e.maxWidth
    }, {
      default: withCtx(({
        id: D,
        "aria-required": _,
        "aria-invalid": B,
        "aria-describedby": I
      }) => [
        createVNode(unref(ComboboxRoot), {
          modelValue: r.value,
          "onUpdate:modelValue": h2[3] || (h2[3] = (P) => r.value = P),
          disabled: e.disabled,
          name: e.name,
          required: e.required,
          "ignore-filter": true,
          class: normalizeClass(["agds-time-picker", { "agds-time-picker--block": e.block }])
        }, {
          default: withCtx(() => [
            createVNode(unref(ComboboxAnchor), {
              ref_key: "containerRef",
              ref: p,
              class: normalizeClass(["agds-time-picker__control", { "agds-time-picker__control--invalid": e.invalid }])
            }, {
              default: withCtx(() => [
                createVNode(unref(ComboboxInput), {
                  id: D,
                  modelValue: f.value,
                  "onUpdate:modelValue": h2[0] || (h2[0] = (P) => f.value = P),
                  "display-value": (P) => c.value.find((H) => H.value === P)?.label ?? "",
                  class: "agds-time-picker__input",
                  placeholder: e.placeholder,
                  "aria-required": _,
                  "aria-invalid": B,
                  "aria-describedby": I || void 0,
                  onFocus: h2[1] || (h2[1] = (P) => o("focus", P)),
                  onBlur: h2[2] || (h2[2] = (P) => o("blur", P))
                }, null, 8, ["id", "modelValue", "display-value", "placeholder", "aria-required", "aria-invalid", "aria-describedby"]),
                createVNode(unref(ComboboxTrigger), {
                  class: "agds-time-picker__trigger",
                  disabled: e.disabled
                }, {
                  default: withCtx(() => [...h2[4] || (h2[4] = [
                    createElementVNode("svg", {
                      "aria-hidden": "true",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2",
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round"
                    }, [
                      createElementVNode("polyline", { points: "6 9 12 15 18 9" })
                    ], -1)
                  ])]),
                  _: 1
                }, 8, ["disabled"])
              ]),
              _: 2
            }, 1032, ["class"]),
            createVNode(unref(ComboboxPortal), null, {
              default: withCtx(() => [
                createVNode(unref(ComboboxContent), {
                  class: "agds-time-picker__content",
                  "avoid-collisions": false
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ComboboxViewport), { class: "agds-time-picker__listbox" }, {
                      default: withCtx(() => [
                        e.loading ? (openBlock(), createElementBlock("div", Dm, " Loading… ")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                          createVNode(unref(ComboboxEmpty), { class: "agds-time-picker__empty" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(e.emptyResultsMessage), 1)
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(m.value, (P) => (openBlock(), createBlock(unref(ComboboxItem), {
                            key: P.value,
                            value: P.value,
                            class: "agds-time-picker__option"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(P.label) + " ", 1),
                              createVNode(unref(ComboboxItemIndicator), { class: "agds-time-picker__option-check" }, {
                                default: withCtx(() => [...h2[5] || (h2[5] = [
                                  createElementVNode("svg", {
                                    "aria-hidden": "true",
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    stroke: "currentColor",
                                    "stroke-width": "2.5",
                                    "stroke-linecap": "round",
                                    "stroke-linejoin": "round"
                                  }, [
                                    createElementVNode("polyline", { points: "20 6 9 17 4 12" })
                                  ], -1)
                                ])]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["value"]))), 128))
                        ], 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ]),
          _: 2
        }, 1032, ["modelValue", "disabled", "name", "required", "class"])
      ]),
      _: 1
    }, 8, ["label", "id", "label-id", "hint", "invalid", "message", "required", "hide-optional-label", "secondary-label", "max-width"]));
  }
}), Im = /* @__PURE__ */ A(Cm, [["__scopeId", "data-v-21fe7cc2"]]), Mm = ["name", "disabled", "autofocus", "inputmode", "placeholder", "rows", "value"], Bm = /* @__PURE__ */ defineComponent({
  __name: "AGDSTextarea",
  props: {
    label: {},
    hideOptionalLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: { default: "md" },
    autoFocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: {},
    inputMode: {},
    name: {},
    placeholder: {},
    rows: {},
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `textarea-${s}`), u = ref(null), g = ref(a.modelValue ?? ""), c = computed(
      () => a.modelValue !== void 0 ? a.modelValue : g.value
    );
    function f(x) {
      const h2 = x.target.value;
      g.value = h2, o("update:modelValue", h2);
    }
    const m = {
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, p = computed(
      () => a.block ? { width: "100%" } : { maxWidth: m[a.maxWidth] }
    );
    return t({ focus: () => u.value?.focus() }), (x, h2) => (openBlock(), createBlock(Pe, {
      label: a.label,
      id: r.value,
      hint: a.hint,
      invalid: a.invalid,
      message: a.message,
      required: a.required,
      "hide-optional-label": a.hideOptionalLabel,
      "max-width": a.maxWidth
    }, {
      default: withCtx((D) => [
        createElementVNode("textarea", mergeProps({
          ref_key: "textareaRef",
          ref: u
        }, D, {
          class: ["agds-textarea", {
            "agds-textarea--invalid": a.invalid,
            "agds-textarea--block": a.block
          }],
          style: p.value,
          name: a.name,
          disabled: a.disabled,
          autofocus: a.autoFocus || void 0,
          inputmode: a.inputMode,
          placeholder: a.placeholder,
          rows: a.rows,
          value: c.value,
          onInput: f,
          onChange: h2[0] || (h2[0] = (_) => o("change", _)),
          onFocus: h2[1] || (h2[1] = (_) => o("focus", _)),
          onBlur: h2[2] || (h2[2] = (_) => o("blur", _))
        }), null, 16, Mm)
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "max-width"]));
  }
}), Lm = /* @__PURE__ */ A(Bm, [["__scopeId", "data-v-634643e2"]]), Tm = ["type", "name", "disabled", "autocomplete", "autofocus", "maxlength", "value"], Fm = /* @__PURE__ */ defineComponent({
  __name: "AGDSPasswordInput",
  props: {
    label: {},
    hideOptionalLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: {},
    autoComplete: {},
    autoFocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: {},
    maxLength: {},
    name: {},
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `password-input-${s}`), u = ref(false), g = computed(() => u.value ? "text" : "password"), c = ref(null);
    return t({ focus: () => c.value?.focus() }), (f, m) => (openBlock(), createBlock(pt, { gap: 1 }, {
      default: withCtx(() => [
        createVNode(Pe, {
          label: a.label,
          id: r.value,
          hint: a.hint,
          invalid: a.invalid,
          message: a.message,
          required: a.required,
          "hide-optional-label": a.hideOptionalLabel,
          "max-width": a.maxWidth
        }, {
          default: withCtx((p) => [
            createElementVNode("input", mergeProps({
              ref_key: "inputRef",
              ref: c
            }, p, {
              type: g.value,
              class: ["agds-password-input__input", {
                "agds-password-input__input--invalid": a.invalid,
                "agds-password-input__input--block": a.block
              }],
              name: a.name,
              disabled: a.disabled,
              autocomplete: a.autoComplete,
              autofocus: a.autoFocus || void 0,
              maxlength: a.maxLength,
              value: a.modelValue,
              onInput: m[0] || (m[0] = (x) => o("update:modelValue", x.target.value)),
              onChange: m[1] || (m[1] = (x) => o("change", x)),
              onFocus: m[2] || (m[2] = (x) => o("focus", x)),
              onBlur: m[3] || (m[3] = (x) => o("blur", x))
            }), null, 16, Tm)
          ]),
          _: 1
        }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "max-width"]),
        createVNode(bn, {
          modelValue: u.value,
          "onUpdate:modelValue": m[4] || (m[4] = (p) => u.value = p),
          "aria-controls": r.value,
          disabled: a.disabled,
          size: "sm"
        }, {
          default: withCtx(() => [...m[5] || (m[5] = [
            createTextVNode(" Show password ", -1)
          ])]),
          _: 1
        }, 8, ["modelValue", "aria-controls", "disabled"])
      ]),
      _: 1
    }));
  }
}), bb = /* @__PURE__ */ A(Fm, [["__scopeId", "data-v-59a21484"]]), Pm = ["name", "disabled", "autofocus", "placeholder", "value"], Om = /* @__PURE__ */ defineComponent({
  __name: "AGDSSearchInput",
  props: {
    label: {},
    hideOptionalLabel: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: { default: "md" },
    autoFocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: {},
    name: {},
    placeholder: {},
    modelValue: { default: "" }
  },
  emits: ["update:modelValue", "clear", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `search-input-${s}`), u = ref(null), g = ref(a.modelValue ?? ""), c = computed(
      () => a.modelValue !== void 0 ? a.modelValue : g.value
    ), f = computed(() => !!c.value);
    function m(_) {
      const B = _.target.value;
      g.value = B, o("update:modelValue", B);
    }
    function p() {
      c.value && (g.value = "", o("update:modelValue", ""), o("clear"), u.value?.focus());
    }
    function x(_) {
      _.code === "Escape" && p();
    }
    const h2 = {
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, D = computed(
      () => a.block ? {} : { maxWidth: h2[a.maxWidth] }
    );
    return t({ focus: () => u.value?.focus() }), (_, B) => (openBlock(), createBlock(Pe, {
      label: a.label,
      id: r.value,
      hint: a.hint,
      invalid: a.invalid,
      message: a.message,
      required: a.required,
      "hide-optional-label": a.hideOptionalLabel,
      "max-width": a.maxWidth
    }, {
      default: withCtx((I) => [
        createElementVNode("div", {
          class: "agds-search-input__container",
          style: normalizeStyle(D.value)
        }, [
          createElementVNode("span", {
            class: normalizeClass(["agds-search-input__icon", { "agds-search-input__icon--disabled": a.disabled }]),
            "aria-hidden": "true"
          }, [...B[3] || (B[3] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "20",
              height: "20",
              fill: "currentColor",
              focusable: "false"
            }, [
              createElementVNode("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })
            ], -1)
          ])], 2),
          createElementVNode("input", mergeProps({
            ref_key: "inputRef",
            ref: u
          }, I, {
            type: "search",
            autocomplete: "off",
            class: ["agds-search-input__input", {
              "agds-search-input__input--invalid": a.invalid,
              "agds-search-input__input--block": a.block,
              "agds-search-input__input--has-clear": f.value
            }],
            name: a.name,
            disabled: a.disabled,
            autofocus: a.autoFocus || void 0,
            placeholder: a.placeholder,
            value: c.value,
            onInput: m,
            onKeydown: x,
            onChange: B[0] || (B[0] = (P) => o("change", P)),
            onFocus: B[1] || (B[1] = (P) => o("focus", P)),
            onBlur: B[2] || (B[2] = (P) => o("blur", P))
          }), null, 16, Pm),
          f.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            role: "button",
            "aria-label": "Clear search",
            class: normalizeClass(["agds-search-input__clear", { "agds-search-input__clear--disabled": a.disabled }]),
            onClick: p
          }, [...B[4] || (B[4] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "20",
              height: "20",
              "aria-hidden": "true",
              focusable: "false",
              fill: "currentColor"
            }, [
              createElementVNode("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
            ], -1)
          ])], 2)) : createCommentVNode("", true)
        ], 4)
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "max-width"]));
  }
}), Vm = /* @__PURE__ */ A(Om, [["__scopeId", "data-v-c7aabc07"]]), Rm = ["name", "disabled", "autocomplete", "autofocus", "value"], Em = {
  key: 0,
  value: ""
}, Gm = ["label", "disabled"], qm = ["value", "disabled"], zm = ["value", "disabled"], Hm = /* @__PURE__ */ defineComponent({
  __name: "AGDSSelect",
  props: {
    label: {},
    hideOptionalLabel: { type: Boolean, default: false },
    options: {},
    required: { type: Boolean, default: false },
    hint: {},
    message: {},
    invalid: { type: Boolean, default: false },
    block: { type: Boolean, default: false },
    maxWidth: { default: "md" },
    autoComplete: {},
    autoFocus: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    id: {},
    name: {},
    placeholder: {},
    modelValue: {}
  },
  emits: ["update:modelValue", "change", "focus", "blur"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `select-${s}`), u = ref(null);
    t({ focus: () => u.value?.focus() });
    const g = {
      sm: "20ch",
      md: "30ch",
      lg: "40ch",
      xl: "60ch"
    }, c = computed(
      () => a.block ? {} : { maxWidth: g[a.maxWidth] }
    );
    function f(m) {
      a.disabled || (o("update:modelValue", m.target.value), o("change", m));
    }
    return (m, p) => (openBlock(), createBlock(Pe, {
      label: a.label,
      id: r.value,
      hint: a.hint,
      invalid: a.invalid,
      message: a.message,
      required: a.required,
      "hide-optional-label": a.hideOptionalLabel,
      "max-width": a.maxWidth
    }, {
      default: withCtx((x) => [
        createElementVNode("div", {
          class: normalizeClass(["agds-select__container", { "agds-select__container--block": a.block }]),
          style: normalizeStyle(c.value)
        }, [
          createElementVNode("select", mergeProps({
            ref_key: "selectRef",
            ref: u
          }, x, {
            class: ["agds-select", {
              "agds-select--invalid": a.invalid,
              "agds-select--block": a.block,
              "agds-select--disabled": a.disabled
            }],
            name: a.name,
            disabled: a.disabled,
            autocomplete: a.autoComplete,
            autofocus: a.autoFocus || void 0,
            value: a.modelValue,
            onChange: f,
            onFocus: p[0] || (p[0] = (h2) => o("focus", h2)),
            onBlur: p[1] || (p[1] = (h2) => o("blur", h2))
          }), [
            a.placeholder ? (openBlock(), createElementBlock("option", Em, toDisplayString(a.placeholder), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(a.options, (h2) => (openBlock(), createElementBlock(Fragment, {
              key: "options" in h2 ? h2.label : h2.value
            }, [
              "options" in h2 ? (openBlock(), createElementBlock("optgroup", {
                key: 0,
                label: h2.label,
                disabled: h2.disabled
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(h2.options, (D) => (openBlock(), createElementBlock("option", {
                  key: D.value,
                  value: D.value,
                  disabled: D.disabled
                }, toDisplayString(D.label), 9, qm))), 128))
              ], 8, Gm)) : (openBlock(), createElementBlock("option", {
                key: 1,
                value: h2.value,
                disabled: h2.disabled
              }, toDisplayString(h2.label), 9, zm))
            ], 64))), 128))
          ], 16, Rm),
          createElementVNode("span", {
            class: normalizeClass(["agds-select__icon", { "agds-select__icon--disabled": a.disabled }]),
            "aria-hidden": "true"
          }, [...p[2] || (p[2] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "20",
              height: "20",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              focusable: "false"
            }, [
              createElementVNode("polyline", { points: "6 9 12 15 18 9" })
            ], -1)
          ])], 2)
        ], 6)
      ]),
      _: 1
    }, 8, ["label", "id", "hint", "invalid", "message", "required", "hide-optional-label", "max-width"]));
  }
}), Nm = /* @__PURE__ */ A(Hm, [["__scopeId", "data-v-2d5949a5"]]), jm = /* @__PURE__ */ defineComponent({
  __name: "AGDSVisuallyHidden",
  props: {
    as: { default: "span" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createBlock(resolveDynamicComponent(e.as), { class: "agds-visually-hidden" }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }));
  }
}), _t = /* @__PURE__ */ A(jm, [["__scopeId", "data-v-b4329114"]]), Wm = { class: "agds-task-list-item__left" }, Um = {
  class: "agds-task-list-item__icon-desktop",
  "aria-hidden": "true"
}, Zm = { class: "agds-task-list-item__body" }, Km = { class: "agds-task-list-item__label" }, Ym = {
  key: 0,
  class: "agds-task-list-item__counter",
  "aria-hidden": "true"
}, Xm = { class: "agds-task-list-item__status" }, Qm = { class: "agds-task-list-item__status-label" }, Jm = {
  key: 0,
  class: "agds-task-list-item__message"
}, ev = /* @__PURE__ */ defineComponent({
  __name: "AGDSTaskListItem",
  props: {
    status: {},
    message: {},
    ordered: { type: Boolean, default: false },
    href: {},
    type: { default: "button" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["click", "focus", "blur"],
  setup(e) {
    const t = e, n = computed(() => !!t.href), a = {
      notRequired: {
        label: "No longer required",
        icon: "mdi:minus-circle-outline",
        iconColor: "var(--agds-color-border)"
      },
      blocked: {
        label: "Cannot start yet",
        icon: "mdi:lock-outline",
        iconColor: "var(--agds-color-border)"
      },
      doing: {
        label: "In progress",
        icon: "mdi:clock-outline",
        iconColor: "var(--agds-color-action-primary)"
      },
      todo: {
        label: "Not started",
        icon: "mdi:radiobox-blank",
        iconColor: "var(--agds-color-action-primary)"
      },
      done: {
        label: "Completed",
        icon: "mdi:check-circle",
        iconColor: "var(--agds-color-success)"
      },
      doneRecently: {
        label: "Completed",
        icon: "mdi:check-circle",
        iconColor: "var(--agds-color-success)"
      }
    }, o = computed(() => a[t.status]);
    return (s, r) => (openBlock(), createElementBlock("li", {
      class: normalizeClass(["agds-task-list-item", `agds-task-list-item--${e.status}`])
    }, [
      (openBlock(), createBlock(resolveDynamicComponent(n.value ? "a" : "button"), {
        href: n.value ? e.href : void 0,
        type: n.value ? void 0 : e.type,
        disabled: !n.value && e.disabled ? true : void 0,
        "aria-disabled": e.disabled ? true : void 0,
        class: "agds-task-list-item__trigger",
        onClick: r[0] || (r[0] = (u) => s.$emit("click", u)),
        onFocus: r[1] || (r[1] = (u) => s.$emit("focus", u)),
        onBlur: r[2] || (r[2] = (u) => s.$emit("blur", u))
      }, {
        default: withCtx(() => [
          createElementVNode("span", Wm, [
            createElementVNode("span", Um, [
              createVNode(_e, {
                name: o.value.icon,
                size: "xl",
                color: o.value.iconColor
              }, null, 8, ["name", "color"])
            ]),
            createElementVNode("span", Zm, [
              createElementVNode("span", Km, [
                e.ordered ? (openBlock(), createElementBlock("span", Ym)) : createCommentVNode("", true),
                renderSlot(s.$slots, "default", {}, void 0, true),
                createVNode(_t, null, {
                  default: withCtx(() => [...r[3] || (r[3] = [
                    createTextVNode(".", -1)
                  ])]),
                  _: 1
                })
              ]),
              createElementVNode("span", Xm, [
                createVNode(_e, {
                  class: "agds-task-list-item__icon-mobile",
                  name: o.value.icon,
                  size: "md",
                  color: o.value.iconColor,
                  "aria-hidden": "true"
                }, null, 8, ["name", "color"]),
                createElementVNode("span", Qm, [
                  createTextVNode(toDisplayString(o.value.label) + " ", 1),
                  createVNode(_t, null, {
                    default: withCtx(() => [...r[4] || (r[4] = [
                      createTextVNode(".", -1)
                    ])]),
                    _: 1
                  })
                ])
              ]),
              e.message ? (openBlock(), createElementBlock("span", Jm, toDisplayString(e.message), 1)) : createCommentVNode("", true)
            ])
          ]),
          createVNode(_e, {
            name: "mdi:arrow-right",
            class: "agds-task-list-item__arrow",
            color: "var(--agds-color-action-primary)",
            "aria-hidden": "true"
          })
        ]),
        _: 3
      }, 40, ["href", "type", "disabled", "aria-disabled"]))
    ], 2));
  }
}), tv = /* @__PURE__ */ A(ev, [["__scopeId", "data-v-0aa12709"]]), av = /* @__PURE__ */ defineComponent({
  __name: "AGDSTaskList",
  props: {
    items: {},
    ordered: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = ["done", "doneRecently"], a = computed(
      () => t.items.filter(({ status: o }) => n.includes(o)).length
    );
    return (o, s) => (openBlock(), createBlock(pt, {
      gap: 3,
      class: "agds-task-list"
    }, {
      default: withCtx(() => [
        createVNode(pt, { gap: 2 }, {
          default: withCtx(() => [
            createVNode(He, { type: "h2" }, {
              default: withCtx(() => [...s[0] || (s[0] = [
                createTextVNode("Complete these tasks", -1)
              ])]),
              _: 1
            }),
            createVNode(mn, {
              as: "p",
              color: "muted",
              "font-size": "sm"
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(a.value) + " of " + toDisplayString(e.items.length) + " tasks completed ", 1)
              ]),
              _: 1
            })
          ]),
          _: 1
        }),
        (openBlock(), createBlock(resolveDynamicComponent(e.ordered ? "ol" : "ul"), { class: "agds-task-list__items" }, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (r, u) => (openBlock(), createBlock(tv, {
              key: u,
              status: r.status,
              message: r.message,
              ordered: e.ordered,
              href: r.href,
              type: r.type,
              disabled: r.disabled
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(r.label), 1)
              ]),
              _: 2
            }, 1032, ["status", "message", "ordered", "href", "type", "disabled"]))), 128))
          ]),
          _: 1
        }))
      ]),
      _: 1
    }));
  }
}), _b = /* @__PURE__ */ A(av, [["__scopeId", "data-v-4a46f04d"]]);
function et(e) {
  return "href" in e;
}
function la(e) {
  return "items" in e;
}
function nv(e, t) {
  if (!t)
    return "";
  let n = "", a = 0;
  const o = (s) => {
    t.startsWith(s) && s.length > a && (n = s, a = s.length);
  };
  for (const s of e)
    if (et(s))
      o(s.href);
    else if (la(s))
      for (const r of s.items)
        et(r) && o(r.href);
  return n;
}
const ov = ["aria-label"], sv = {
  class: "agds-main-nav__list",
  role: "list"
}, lv = ["href", "aria-current"], iv = ["onClick"], rv = /* @__PURE__ */ defineComponent({
  __name: "AGDSMainNavList",
  props: {
    items: {},
    activePath: {},
    type: {},
    ariaLabel: { default: "Main" }
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createElementBlock("nav", {
      "aria-label": t.ariaLabel,
      class: normalizeClass([
        "agds-main-nav__list-nav",
        `agds-main-nav__list-nav--${t.type}`
      ])
    }, [
      createElementVNode("ul", sv, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(t.items, (o, s) => (openBlock(), createElementBlock("li", {
          key: s,
          class: "agds-main-nav__list-item"
        }, [
          unref(et)(o) ? (openBlock(), createElementBlock("a", {
            key: 0,
            href: o.href,
            "aria-current": o.href === t.activePath ? "page" : void 0,
            class: normalizeClass([
              "agds-main-nav__link",
              { "agds-main-nav__link--active": o.href === t.activePath }
            ])
          }, toDisplayString(o.label), 11, lv)) : unref(la)(o) ? (openBlock(), createBlock(ln, {
            key: 1,
            "popover-placement": "bottom-end",
            "popover-offset": -8
          }, {
            default: withCtx(() => [
              createVNode(rn, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(o.label), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(dn, null, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(o.items, (r, u) => (openBlock(), createElementBlock(Fragment, { key: u }, [
                    unref(et)(r) ? (openBlock(), createBlock(un, {
                      key: 0,
                      href: r.href
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(r.label), 1)
                      ]),
                      _: 2
                    }, 1032, ["href"])) : createCommentVNode("", true)
                  ], 64))), 128))
                ]),
                _: 2
              }, 1024)
            ]),
            _: 2
          }, 1024)) : (openBlock(), createElementBlock("button", {
            key: 2,
            type: "button",
            class: "agds-main-nav__link",
            onClick: (r) => o.onClick?.(r)
          }, toDisplayString(o.label), 9, iv))
        ]))), 128))
      ])
    ], 10, ov));
  }
}), Oa = /* @__PURE__ */ A(rv, [["__scopeId", "data-v-ba5cd09e"]]), dv = ["id"], uv = { class: "agds-main-nav-dialog__header" }, cv = {
  "aria-label": "Main",
  class: "agds-main-nav-dialog__nav"
}, gv = {
  class: "agds-main-nav-dialog__list",
  role: "list"
}, fv = { key: 0 }, mv = ["href", "aria-current"], vv = { key: 1 }, pv = { class: "agds-main-nav-dialog__group-label" }, hv = {
  class: "agds-main-nav-dialog__group-list",
  role: "list"
}, bv = ["href", "aria-current"], _v = ["onClick"], yv = { key: 2 }, kv = ["onClick"], Sv = /* @__PURE__ */ defineComponent({
  __name: "AGDSMainNavDialog",
  props: {
    id: {},
    items: {},
    activePath: {},
    isOpen: { type: Boolean }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = ref(null), s = ref(null);
    watch(
      () => n.isOpen,
      async (g) => {
        g ? (await nextTick(), s.value?.focus(), (void 0).body.style.overflow = "hidden") : (void 0).body.style.overflow = "";
      }
    );
    function r() {
      a("close");
    }
    function u(g) {
      if (g.key === "Escape") {
        g.preventDefault(), r();
        return;
      }
      if (g.key === "Tab") {
        const c = o.value?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (!c?.length) return;
        const f = c[0], m = c[c.length - 1];
        g.shiftKey && (void 0).activeElement === f ? (g.preventDefault(), m.focus()) : !g.shiftKey && (void 0).activeElement === m && (g.preventDefault(), f.focus());
      }
    }
    return (g, c) => (openBlock(), createBlock(Teleport, { to: "body" }, [
      createVNode(Transition, { name: "agds-main-nav-dialog" }, {
        default: withCtx(() => [
          n.isOpen ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "agds-main-nav-dialog__backdrop",
            "aria-hidden": "true",
            onClick: r
          })) : createCommentVNode("", true)
        ]),
        _: 1
      }),
      createVNode(Transition, { name: "agds-main-nav-dialog-panel" }, {
        default: withCtx(() => [
          n.isOpen ? (openBlock(), createElementBlock("div", {
            key: 0,
            ref_key: "dialogEl",
            ref: o,
            id: n.id,
            role: "dialog",
            "aria-modal": "true",
            "aria-label": "Main menu",
            class: "agds-main-nav-dialog",
            onKeydown: u
          }, [
            createElementVNode("div", uv, [
              createElementVNode("button", {
                ref_key: "closeButtonEl",
                ref: s,
                type: "button",
                class: "agds-main-nav-dialog__close",
                "aria-label": "Close menu",
                onClick: r
              }, [...c[0] || (c[0] = [
                createElementVNode("svg", {
                  "aria-hidden": "true",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2.5",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round",
                  class: "agds-main-nav-dialog__close-icon"
                }, [
                  createElementVNode("line", {
                    x1: "18",
                    y1: "6",
                    x2: "6",
                    y2: "18"
                  }),
                  createElementVNode("line", {
                    x1: "6",
                    y1: "6",
                    x2: "18",
                    y2: "18"
                  })
                ], -1),
                createElementVNode("span", null, "Close", -1)
              ])], 512)
            ]),
            createElementVNode("nav", cv, [
              createElementVNode("ul", gv, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(n.items, (f, m) => (openBlock(), createElementBlock(Fragment, { key: m }, [
                  unref(et)(f) ? (openBlock(), createElementBlock("li", fv, [
                    createElementVNode("a", {
                      href: f.href,
                      "aria-current": f.href === n.activePath ? "page" : void 0,
                      class: normalizeClass([
                        "agds-main-nav-dialog__link",
                        { "agds-main-nav-dialog__link--active": f.href === n.activePath }
                      ]),
                      onClick: r
                    }, toDisplayString(f.label), 11, mv)
                  ])) : unref(la)(f) ? (openBlock(), createElementBlock("li", vv, [
                    createElementVNode("span", pv, toDisplayString(f.label), 1),
                    createElementVNode("ul", hv, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(f.items, (p, x) => (openBlock(), createElementBlock("li", { key: x }, [
                        unref(et)(p) ? (openBlock(), createElementBlock("a", {
                          key: 0,
                          href: p.href,
                          "aria-current": p.href === n.activePath ? "page" : void 0,
                          class: normalizeClass([
                            "agds-main-nav-dialog__link",
                            "agds-main-nav-dialog__link--sub",
                            { "agds-main-nav-dialog__link--active": p.href === n.activePath }
                          ]),
                          onClick: r
                        }, toDisplayString(p.label), 11, bv)) : (openBlock(), createElementBlock("button", {
                          key: 1,
                          type: "button",
                          class: "agds-main-nav-dialog__link agds-main-nav-dialog__link--sub",
                          onClick: (h2) => {
                            p.onClick?.(h2), r();
                          }
                        }, toDisplayString(p.label), 9, _v))
                      ]))), 128))
                    ])
                  ])) : (openBlock(), createElementBlock("li", yv, [
                    createElementVNode("button", {
                      type: "button",
                      class: "agds-main-nav-dialog__link",
                      onClick: (p) => {
                        f.onClick?.(p), r();
                      }
                    }, toDisplayString(f.label), 9, kv)
                  ]))
                ], 64))), 128))
              ])
            ])
          ], 40, dv)) : createCommentVNode("", true)
        ]),
        _: 1
      })
    ]));
  }
}), $v = /* @__PURE__ */ A(Sv, [["__scopeId", "data-v-148afa34"]]), xv = ["id"], wv = ["aria-hidden"], Av = ["aria-expanded"], Dv = /* @__PURE__ */ defineComponent({
  __name: "AGDSMainNav",
  props: {
    activePath: {},
    background: { default: "body" },
    borderColor: { default: "brand" },
    focusMode: { type: Boolean, default: false },
    id: {},
    items: {},
    maxWidth: { default: "container" },
    secondaryItems: {}
  },
  setup(e) {
    const t = e, n = ref(false), a = ref(null);
    function o() {
      n.value = true;
    }
    function s() {
      n.value = false, a.value?.focus();
    }
    const r = computed(
      () => nv([...t.items ?? [], ...t.secondaryItems ?? []], t.activePath)
    ), u = computed(
      () => t.maxWidth === "containerLg" ? "90rem" : "75rem"
    ), g = computed(() => ({
      brand: "var(--agds-color-border-brand)",
      border: "var(--agds-color-border)",
      "border-strong": "var(--agds-color-border-strong)"
    })[t.borderColor]);
    return (c, f) => (openBlock(), createElementBlock("header", {
      id: t.id,
      class: normalizeClass([
        "agds-main-nav",
        `agds-main-nav--${t.background}`
      ]),
      tabindex: "-1"
    }, [
      t.focusMode ? createCommentVNode("", true) : (openBlock(), createElementBlock("div", {
        key: 0,
        "aria-hidden": n.value ? true : void 0,
        class: "agds-main-nav__bar"
      }, [
        createElementVNode("div", {
          class: "agds-main-nav__inner",
          style: normalizeStyle({ maxWidth: u.value })
        }, [
          t.items?.length ? (openBlock(), createElementBlock("button", {
            key: 0,
            ref_key: "hamburgerRef",
            ref: a,
            type: "button",
            class: "agds-main-nav__hamburger",
            "aria-expanded": n.value,
            "aria-controls": "agds-main-nav-dialog",
            "aria-label": "Open menu",
            onClick: o
          }, [...f[0] || (f[0] = [
            createStaticVNode('<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="agds-main-nav__hamburger-icon" data-v-259c80dc><line x1="3" y1="6" x2="21" y2="6" data-v-259c80dc></line><line x1="3" y1="12" x2="21" y2="12" data-v-259c80dc></line><line x1="3" y1="18" x2="21" y2="18" data-v-259c80dc></line></svg><span class="sr-only" data-v-259c80dc>Menu</span>', 2)
          ])], 8, Av)) : createCommentVNode("", true),
          t.items?.length ? (openBlock(), createBlock(Oa, {
            key: 1,
            items: t.items,
            "active-path": r.value,
            type: "primary",
            "aria-label": "Main"
          }, null, 8, ["items", "active-path"])) : createCommentVNode("", true),
          t.secondaryItems?.length ? (openBlock(), createBlock(Oa, {
            key: 2,
            items: t.secondaryItems,
            "active-path": r.value,
            type: "secondary",
            "aria-label": "Supplementary"
          }, null, 8, ["items", "active-path"])) : createCommentVNode("", true)
        ], 4)
      ], 8, wv)),
      createElementVNode("div", {
        class: "agds-main-nav__border",
        style: normalizeStyle({ borderBottomColor: g.value })
      }, null, 4),
      createVNode($v, {
        id: "agds-main-nav-dialog",
        items: t.items,
        "active-path": r.value,
        "is-open": n.value,
        onClose: s
      }, null, 8, ["items", "active-path", "is-open"])
    ], 10, xv));
  }
}), Cv = /* @__PURE__ */ A(Dv, [["__scopeId", "data-v-259c80dc"]]);
function Iv(e, t) {
  if (!t)
    return "";
  const n = wn(e);
  let a = "";
  for (const o of n) {
    if (o.href === t)
      return o.href;
    t.startsWith(o.href) && o.href.length > a.length && (a = o.href);
  }
  return a;
}
function wn(e) {
  const t = [];
  for (const n of e)
    t.push({ href: n.href, label: n.label }), n.items?.length && t.push(...wn(n.items));
  return t;
}
function An(e, t) {
  return !e?.length || !t ? false : e.some((n) => n.href === t || An(n.items, t));
}
const Mv = ["href", "aria-current", "aria-label"], Bv = {
  key: 0,
  class: "agds-side-nav__ancestor-mark",
  "aria-hidden": "true"
}, Lv = {
  key: 1,
  class: "agds-side-nav__ancestor-mark",
  "aria-hidden": "true"
}, Tv = { class: "agds-side-nav__link-label" }, Fv = /* @__PURE__ */ defineComponent({
  __name: "SideNavLinkList",
  props: {
    items: {},
    activePath: {},
    subLevelVisible: {},
    depth: { default: 1 }
  },
  setup(e) {
    const t = e;
    function n(u) {
      return u.href === t.activePath;
    }
    function a(u) {
      return An(u.items, t.activePath);
    }
    function o(u) {
      return n(u) || a(u);
    }
    function s(u) {
      return u.items?.length ? n(u) || a(u) || t.subLevelVisible === "always" : false;
    }
    function r(u) {
      return (u.items?.length ?? 0) > 0 && t.subLevelVisible === "whenActive";
    }
    return (u, g) => {
      const c = resolveComponent("SideNavLinkList", true);
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass(["agds-side-nav__list", { "agds-side-nav__list--nested": e.depth > 1 }])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e.items, (f) => (openBlock(), createElementBlock("li", {
          key: f.href,
          class: normalizeClass(["agds-side-nav__item", {
            "agds-side-nav__item--active-ancestor": o(f) && e.depth === 1
          }])
        }, [
          createElementVNode("a", {
            href: f.href,
            "aria-current": n(f) ? "page" : void 0,
            "aria-label": r(f) ? `${f.label}${s(f) ? ", has expanded sub links" : ", has sub links"}` : void 0,
            class: normalizeClass(["agds-side-nav__link", {
              "agds-side-nav__link--current": n(f),
              "agds-side-nav__link--sub": e.depth > 1
            }]),
            style: normalizeStyle({ paddingLeft: `${e.depth}rem` })
          }, [
            e.depth > 2 ? (openBlock(), createElementBlock("span", Bv, "—")) : e.depth > 1 ? (openBlock(), createElementBlock("span", Lv, "–")) : createCommentVNode("", true),
            createElementVNode("span", Tv, toDisplayString(f.label), 1),
            r(f) ? (openBlock(), createBlock(_e, {
              key: 2,
              name: "mdi:chevron-right",
              size: e.depth > 1 ? "sm" : "md",
              "aria-hidden": "true",
              class: normalizeClass(["agds-side-nav__chevron", { "agds-side-nav__chevron--open": s(f) }])
            }, null, 8, ["size", "class"])) : createCommentVNode("", true)
          ], 14, Mv),
          f.items?.length && s(f) ? (openBlock(), createBlock(c, {
            key: 0,
            items: f.items,
            "active-path": e.activePath,
            "sub-level-visible": e.subLevelVisible,
            depth: (e.depth ?? 1) + 1
          }, null, 8, ["items", "active-path", "sub-level-visible", "depth"])) : createCommentVNode("", true)
        ], 2))), 128))
      ], 2);
    };
  }
}), Pv = /* @__PURE__ */ A(Fv, [["__scopeId", "data-v-8082a636"]]), Ov = ["aria-expanded"], Vv = { class: "agds-side-nav__toggle-label" }, Rv = { class: "agds-side-nav__body" }, Ev = { class: "agds-side-nav__title-wrap" }, Gv = /* @__PURE__ */ defineComponent({
  __name: "AGDSSideNav",
  props: {
    activePath: {},
    background: { default: "body" },
    items: {},
    title: {},
    subLevelVisible: { default: "whenActive" },
    titleLink: {}
  },
  setup(e) {
    const t = e, n = computed(() => Iv(t.items, t.activePath)), a = ref(false);
    function o() {
      a.value = !a.value;
    }
    return (s, r) => (openBlock(), createElementBlock("nav", {
      class: normalizeClass(["agds-side-nav", [
        `agds-side-nav--bg-${t.background}`,
        { "agds-side-nav--expanded": a.value }
      ]])
    }, [
      createElementVNode("button", {
        type: "button",
        class: "agds-side-nav__toggle",
        "aria-expanded": a.value,
        onClick: o
      }, [
        createElementVNode("span", Vv, toDisplayString(t.title), 1),
        r[0] || (r[0] = createElementVNode("svg", {
          class: "agds-side-nav__toggle-chevron",
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2.5",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [
          createElementVNode("polyline", { points: "6 9 12 15 18 9" })
        ], -1))
      ], 8, Ov),
      createElementVNode("div", Rv, [
        createElementVNode("div", Ev, [
          (openBlock(), createBlock(resolveDynamicComponent(t.titleLink ? "a" : "span"), {
            href: t.titleLink || void 0,
            "aria-current": t.titleLink && t.activePath === t.titleLink ? "page" : void 0,
            class: normalizeClass(["agds-side-nav__title", { "agds-side-nav__title--link": !!t.titleLink }])
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(t.title), 1)
            ]),
            _: 1
          }, 8, ["href", "aria-current", "class"]))
        ]),
        createVNode(Pv, {
          items: t.items,
          "active-path": n.value,
          "sub-level-visible": t.subLevelVisible,
          depth: 1
        }, null, 8, ["items", "active-path", "sub-level-visible"])
      ])
    ], 2));
  }
}), qv = /* @__PURE__ */ A(Gv, [["__scopeId", "data-v-11a923c4"]]), zv = { class: "agds-csb__title" }, Hv = {
  key: 0,
  class: "agds-csb__subtitle"
}, Nv = ["aria-expanded", "aria-label"], jv = { class: "agds-csb__toggle-content" }, Wv = { class: "agds-csb__toggle-text" }, Uv = { class: "agds-csb__toggle-title" }, Zv = {
  key: 0,
  class: "agds-csb__toggle-subtitle"
}, Kv = /* @__PURE__ */ defineComponent({
  __name: "AGDSCollapsingSideBar",
  props: {
    title: {},
    subTitle: {},
    as: { default: "section" },
    background: { default: "body" },
    ariaLabel: {}
  },
  setup(e) {
    const t = e, n = Math.random().toString(36).slice(2, 8), a = `agds-csb-body-${n}`, o = `agds-csb-heading-${n}`, s = ref(false);
    function r() {
      s.value = !s.value;
    }
    return (u, g) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      class: normalizeClass(["agds-csb", `agds-csb--bg-${t.background}`]),
      "aria-label": t.ariaLabel || void 0,
      "aria-labelledby": t.ariaLabel ? void 0 : o
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          id: o,
          class: "agds-csb__heading"
        }, [
          renderSlot(u.$slots, "title", {}, () => [
            createElementVNode("h2", zv, toDisplayString(t.title), 1),
            t.subTitle ? (openBlock(), createElementBlock("p", Hv, toDisplayString(t.subTitle), 1)) : createCommentVNode("", true)
          ], true)
        ]),
        createElementVNode("button", {
          type: "button",
          class: "agds-csb__toggle",
          "aria-expanded": s.value,
          "aria-controls": a,
          "aria-label": t.title,
          onClick: r
        }, [
          createElementVNode("span", jv, [
            createElementVNode("span", Wv, [
              createElementVNode("span", Uv, toDisplayString(t.title), 1),
              t.subTitle ? (openBlock(), createElementBlock("span", Zv, toDisplayString(t.subTitle), 1)) : createCommentVNode("", true)
            ]),
            (openBlock(), createElementBlock("svg", {
              class: normalizeClass(["agds-csb__chevron", { "agds-csb__chevron--open": s.value }]),
              "aria-hidden": "true",
              focusable: "false",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }, [...g[0] || (g[0] = [
              createElementVNode("path", { d: "M6 9l6 6 6-6" }, null, -1)
            ])], 2))
          ])
        ], 8, Nv),
        createElementVNode("div", {
          id: a,
          class: normalizeClass(["agds-csb__body", { "agds-csb__body--open": s.value }])
        }, [
          renderSlot(u.$slots, "default", {}, void 0, true)
        ], 2)
      ]),
      _: 3
    }, 8, ["class", "aria-label", "aria-labelledby"]));
  }
}), Dn = /* @__PURE__ */ A(Kv, [["__scopeId", "data-v-7efed014"]]), Yv = { class: "agds-filter-sidebar__body" }, Xv = /* @__PURE__ */ defineComponent({
  __name: "AGDSFilterSidebar",
  props: {
    activeFiltersCount: { default: 0 },
    background: { default: "body" },
    showClearFilters: { type: Boolean, default: false }
  },
  emits: ["clearFilters"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = computed(
      () => n.activeFiltersCount ? `Filters (${n.activeFiltersCount})` : "Filters"
    ), s = computed(
      () => n.activeFiltersCount ? `Filters (${n.activeFiltersCount} active)` : "Filters"
    );
    return (r, u) => (openBlock(), createBlock(Dn, {
      title: o.value,
      "aria-label": s.value,
      background: n.background,
      as: "section"
    }, {
      default: withCtx(() => [
        createElementVNode("div", Yv, [
          renderSlot(r.$slots, "default", {}, void 0, true),
          n.showClearFilters ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            u[1] || (u[1] = createElementVNode("hr", {
              class: "agds-filter-sidebar__divider",
              "aria-hidden": "true"
            }, null, -1)),
            createElementVNode("button", {
              type: "button",
              class: "agds-filter-sidebar__clear-btn",
              onClick: u[0] || (u[0] = (g) => a("clearFilters"))
            }, " Clear filters ")
          ], 64)) : createCommentVNode("", true)
        ])
      ]),
      _: 3
    }, 8, ["title", "aria-label", "background"]));
  }
}), Qv = /* @__PURE__ */ A(Xv, [["__scopeId", "data-v-e65e6b21"]]), Jv = ["aria-label", "id"], ep = { class: "agds-sub-nav__list" }, tp = ["href", "aria-current"], ap = {
  key: 0,
  class: "agds-sub-nav__end-element"
}, np = /* @__PURE__ */ defineComponent({
  __name: "AGDSSubNav",
  props: {
    links: {},
    activePath: {},
    ariaLabel: { default: "Content" },
    id: {},
    background: { default: "body" }
  },
  setup(e) {
    const t = e;
    function n(o, s) {
      if (!s) return "";
      for (const u of o)
        if (u.href === s) return u.href;
      let r = "";
      for (const u of o)
        s.startsWith(u.href) && u.href.length > r.length && (r = u.href);
      return r;
    }
    const a = computed(() => n(t.links, t.activePath));
    return (o, s) => (openBlock(), createElementBlock("nav", {
      class: normalizeClass(["agds-sub-nav", `agds-sub-nav--bg-${t.background}`]),
      "aria-label": t.ariaLabel,
      id: t.id || void 0
    }, [
      createElementVNode("ul", ep, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(t.links, (r) => (openBlock(), createElementBlock("li", {
          key: r.href,
          class: normalizeClass(["agds-sub-nav__item", { "agds-sub-nav__item--active": r.href === a.value }])
        }, [
          createElementVNode("a", {
            href: r.href,
            "aria-current": r.href === a.value ? "page" : void 0,
            class: normalizeClass(["agds-sub-nav__link", { "agds-sub-nav__link--active": r.href === a.value }])
          }, [
            createElementVNode("span", null, toDisplayString(r.label), 1),
            r.endElement ? (openBlock(), createElementBlock("span", ap, toDisplayString(r.endElement), 1)) : createCommentVNode("", true)
          ], 10, tp)
        ], 2))), 128))
      ]),
      s[0] || (s[0] = createElementVNode("div", {
        class: "agds-sub-nav__bottom-bar",
        "aria-hidden": "true"
      }, null, -1))
    ], 10, Jv));
  }
}), op = /* @__PURE__ */ A(np, [["__scopeId", "data-v-ca9ecce9"]]), sp = { class: "agds-loading-blanket__content" }, lp = ["role"], ip = /* @__PURE__ */ defineComponent({
  __name: "AGDSLoadingBlanket",
  props: {
    fullScreen: { type: Boolean, default: false },
    label: {}
  },
  setup(e) {
    const t = e, n = computed(() => t.fullScreen ? 5 : 3), a = computed(() => t.fullScreen ? "lg" : "md");
    return (o, s) => (openBlock(), createElementBlock("div", {
      class: normalizeClass([
        "agds-loading-blanket",
        { "agds-loading-blanket--full-screen": e.fullScreen }
      ])
    }, [
      createElementVNode("div", sp, [
        createElementVNode("span", {
          class: normalizeClass(["agds-loading-dots", `agds-loading-dots--${a.value}`]),
          "aria-hidden": "true"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(n.value, (r) => (openBlock(), createElementBlock("span", {
            key: r,
            class: "agds-loading-dots__dot",
            style: normalizeStyle({ animationDelay: `${(r - 1) * 100}ms` })
          }, null, 4))), 128))
        ], 2),
        createElementVNode("p", {
          role: e.fullScreen ? "alert" : "status",
          class: "agds-loading-blanket__label"
        }, toDisplayString(e.label), 9, lp)
      ])
    ], 2));
  }
}), rp = /* @__PURE__ */ A(ip, [["__scopeId", "data-v-6155e75b"]]), dp = /* @__PURE__ */ defineComponent({
  __name: "AGDSNotificationBadge",
  props: {
    value: {},
    max: {},
    tone: {}
  },
  setup(e) {
    const t = e, n = computed(
      () => t.max === void 0 || t.value <= t.max ? String(t.value) : `${t.max}+`
    );
    return (a, o) => (openBlock(), createElementBlock("span", {
      class: normalizeClass(["agds-badge", `agds-badge--${e.tone}`])
    }, toDisplayString(n.value), 3));
  }
}), up = /* @__PURE__ */ A(dp, [["__scopeId", "data-v-f340843e"]]), Cn = /* @__PURE__ */ defineComponent({
  __name: "AGDSExternalLinkCallout",
  setup(e) {
    return (t, n) => (openBlock(), createBlock(_t, null, {
      default: withCtx(() => [...n[0] || (n[0] = [
        createTextVNode(", opens in a new tab", -1)
      ])]),
      _: 1
    }));
  }
}), cp = /* @__PURE__ */ defineComponent({
  __name: "AGDSTextLinkExternal",
  props: {
    focusRingFor: { default: "keyboard" },
    href: {}
  },
  emits: ["click", "focus", "blur"],
  setup(e) {
    return (t, n) => (openBlock(), createBlock(Pt, {
      href: e.href,
      "focus-ring-for": e.focusRingFor,
      rel: "noopener noreferrer",
      target: "_blank",
      onClick: n[0] || (n[0] = (a) => t.$emit("click", a)),
      onFocus: n[1] || (n[1] = (a) => t.$emit("focus", a)),
      onBlur: n[2] || (n[2] = (a) => t.$emit("blur", a))
    }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default", {}, void 0, true),
        createVNode(Cn),
        createVNode(_e, {
          name: "mdi:open-in-new",
          size: "sm",
          class: "agds-text-link-external__icon",
          "aria-hidden": "true"
        })
      ]),
      _: 3
    }, 8, ["href", "focus-ring-for"]));
  }
}), gp = /* @__PURE__ */ A(cp, [["__scopeId", "data-v-b51ed348"]]), fp = ["aria-label"], mp = {
  key: 0,
  class: "agds-inpage-nav__title"
}, vp = { class: "agds-inpage-nav__list" }, pp = ["href"], hp = /* @__PURE__ */ defineComponent({
  __name: "AGDSInpageNav",
  props: {
    ariaLabel: { default: "In page" },
    links: {},
    title: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createElementBlock("nav", {
      class: "agds-inpage-nav",
      "aria-label": t.ariaLabel
    }, [
      t.title ? (openBlock(), createElementBlock("h2", mp, toDisplayString(t.title), 1)) : createCommentVNode("", true),
      createElementVNode("ul", vp, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(t.links, (o, s) => (openBlock(), createElementBlock("li", {
          key: s,
          class: "agds-inpage-nav__item"
        }, [
          createElementVNode("a", {
            href: o.href,
            class: "agds-inpage-nav__link"
          }, toDisplayString(o.label), 9, pp)
        ]))), 128))
      ])
    ], 8, fp));
  }
}), bp = /* @__PURE__ */ A(hp, [["__scopeId", "data-v-98e194d6"]]), In = /* @__PURE__ */ Symbol("AgDSContentSpacing"), _p = /* @__PURE__ */ defineComponent({
  __name: "AGDSBaseContent",
  props: {
    as: { default: "div" },
    background: {},
    maxWidth: { default: "container" },
    paddingY: {},
    id: {}
  },
  setup(e) {
    const t = e;
    return provide(In, t.paddingY), (n, a) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      id: t.id,
      class: normalizeClass(["agds-content", [
        t.background && `agds-content--${t.background}`,
        `agds-content--${t.paddingY}`
      ]])
    }, {
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(["agds-content__inner", `agds-content__inner--${t.maxWidth === "containerLg" ? "container-lg" : "container"}`])
        }, [
          renderSlot(n.$slots, "default", {}, void 0, true)
        ], 2)
      ]),
      _: 3
    }, 8, ["id", "class"]));
  }
}), ia = /* @__PURE__ */ A(_p, [["__scopeId", "data-v-3370447f"]]), yp = /* @__PURE__ */ defineComponent({
  __name: "AGDSContent",
  props: {
    as: { default: "div" },
    background: {},
    maxWidth: { default: "container" },
    id: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(ia, {
      as: t.as,
      background: t.background,
      "max-width": t.maxWidth,
      id: t.id,
      "padding-y": "none"
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "background", "max-width", "id"]));
  }
}), kp = /* @__PURE__ */ defineComponent({
  __name: "AGDSSectionContent",
  props: {
    as: { default: "section" },
    background: {},
    maxWidth: { default: "container" },
    id: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(ia, {
      as: t.as,
      background: t.background,
      "max-width": t.maxWidth,
      id: t.id,
      "padding-y": "section"
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "background", "max-width", "id"]));
  }
}), Sp = /* @__PURE__ */ defineComponent({
  __name: "AGDSPageContent",
  props: {
    as: { default: "div" },
    background: {},
    maxWidth: { default: "container" },
    id: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(ia, {
      as: t.as,
      background: t.background,
      "max-width": t.maxWidth,
      id: t.id,
      "padding-y": "page"
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default")
      ]),
      _: 3
    }, 8, ["as", "background", "max-width", "id"]));
  }
}), $p = /* @__PURE__ */ defineComponent({
  __name: "AGDSContentBleed",
  props: {
    visible: { type: [Boolean, Object] }
  },
  setup(e) {
    const t = e, n = inject(In, "none"), a = computed(() => {
      const o = ["agds-content-bleed"];
      n !== "none" && o.push(`agds-content-bleed--${n}`);
      const s = t.visible;
      return s === false ? o.push("agds-content-bleed--no-bleed") : s != null && typeof s == "object" && (s.xs === false && o.push("agds-content-bleed--no-bleed-xs"), s.md === false && o.push("agds-content-bleed--no-bleed-md")), o;
    });
    return (o, s) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(a.value)
    }, [
      renderSlot(o.$slots, "default", {}, void 0, true)
    ], 2));
  }
}), xp = /* @__PURE__ */ A($p, [["__scopeId", "data-v-3c7e4fa4"]]), wp = /* @__PURE__ */ defineComponent({
  __name: "AGDSProse",
  props: {
    as: { default: "div" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createBlock(resolveDynamicComponent(e.as), { class: "agds-prose" }, {
      default: withCtx(() => [
        renderSlot(t.$slots, "default")
      ]),
      _: 3
    }));
  }
}), Ap = ["aria-label"], Dp = ["href"], Cp = /* @__PURE__ */ defineComponent({
  __name: "AGDSSkipLinks",
  props: {
    links: {},
    ariaLabel: { default: "Skip links" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("nav", {
      "aria-label": e.ariaLabel,
      class: "agds-skip-links"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e.links, (a, o) => (openBlock(), createElementBlock("a", {
        key: o,
        href: a.href,
        class: "agds-skip-link"
      }, toDisplayString(a.label), 9, Dp))), 128))
    ], 8, Ap));
  }
}), Ip = /* @__PURE__ */ A(Cp, [["__scopeId", "data-v-0698aeb1"]]), Mp = ["aria-label"], Bp = /* @__PURE__ */ defineComponent({
  __name: "AGDSSearchBox",
  props: {
    ariaLabel: { default: "Sitewide" }
  },
  emits: ["submit"],
  setup(e, { emit: t }) {
    const n = e, a = t;
    return (o, s) => (openBlock(), createElementBlock("form", {
      class: "agds-search-box",
      role: "search",
      "aria-label": n.ariaLabel,
      onSubmit: s[0] || (s[0] = (r) => a("submit", r))
    }, [
      createVNode(at, { "align-items": "flex-end" }, {
        default: withCtx(() => [
          renderSlot(o.$slots, "default")
        ]),
        _: 3
      })
    ], 40, Mp));
  }
}), Lp = ["for"], Tp = { class: "agds-search-box__input-wrapper" }, Fp = ["id", "name", "placeholder", "value"], Pp = /* @__PURE__ */ defineComponent({
  __name: "AGDSSearchBoxInput",
  props: {
    modelValue: {},
    defaultValue: {},
    label: { default: "Search" },
    labelVisible: { type: Boolean, default: false },
    id: {},
    name: {},
    placeholder: {}
  },
  emits: ["update:modelValue", "blur", "focus"],
  setup(e, { expose: t, emit: n }) {
    const a = e, o = n, s = getCurrentInstance()?.uid ?? Math.random().toString(36).slice(2), r = computed(() => a.id ?? `search-${s}`), u = ref(null), g = ref(a.defaultValue ?? ""), c = computed(
      () => a.modelValue !== void 0 ? a.modelValue : g.value
    ), f = computed(() => !!c.value);
    function m(x) {
      const h2 = x.target.value;
      g.value = h2, o("update:modelValue", h2);
    }
    function p() {
      g.value = "", o("update:modelValue", ""), u.value?.focus();
    }
    return t({ focus: () => u.value?.focus() }), (x, h2) => (openBlock(), createBlock(at, {
      "flex-direction": "column",
      style: { width: "100%" }
    }, {
      default: withCtx(() => [
        createElementVNode("label", {
          for: r.value,
          class: normalizeClass(["agds-search-box__label", { "sr-only": !a.labelVisible }])
        }, toDisplayString(a.label), 11, Lp),
        createElementVNode("div", Tp, [
          createElementVNode("input", {
            ref_key: "inputRef",
            ref: u,
            id: r.value,
            type: "search",
            autocomplete: "off",
            class: normalizeClass(["agds-search-box__input", { "agds-search-box__input--has-clear": f.value }]),
            name: a.name,
            placeholder: a.placeholder,
            value: c.value,
            onInput: m,
            onBlur: h2[0] || (h2[0] = (D) => o("blur", D)),
            onFocus: h2[1] || (h2[1] = (D) => o("focus", D))
          }, null, 42, Fp),
          f.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: "agds-search-box__clear",
            onClick: p
          }, [...h2[2] || (h2[2] = [
            createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "16",
              height: "16",
              "aria-hidden": "true",
              focusable: "false",
              fill: "currentColor"
            }, [
              createElementVNode("path", { d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" })
            ], -1),
            createElementVNode("span", { class: "sr-only" }, "Clear search", -1)
          ])])) : createCommentVNode("", true)
        ])
      ]),
      _: 1
    }));
  }
}), Op = /* @__PURE__ */ A(Pp, [["__scopeId", "data-v-8d5aed32"]]), Vp = { class: "agds-search-box__button-wrapper" }, Rp = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "20",
  height: "20",
  "aria-hidden": "true",
  focusable: "false",
  fill: "currentColor"
}, Ep = /* @__PURE__ */ defineComponent({
  __name: "AGDSSearchBoxButton",
  props: {
    label: {},
    iconOnly: { type: Boolean, default: false }
  },
  setup(e, { expose: t }) {
    const n = e, a = ref(null);
    return t({ focus: () => a.value?.focus() }), (o, s) => (openBlock(), createElementBlock("div", Vp, [
      createVNode(Ue, {
        ref_key: "buttonRef",
        ref: a,
        type: "submit",
        "aria-label": n.label,
        class: "agds-search-box__button"
      }, createSlots({
        iconBefore: withCtx(() => [
          n.iconOnly ? (openBlock(), createElementBlock("svg", Rp, [...s[0] || (s[0] = [
            createElementVNode("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }, null, -1)
          ])])) : createCommentVNode("", true)
        ]),
        default: withCtx(() => [
          createElementVNode("span", {
            class: normalizeClass({ "sr-only": n.iconOnly })
          }, toDisplayString(n.label), 3)
        ]),
        _: 2
      }, [
        n.iconOnly ? void 0 : {
          name: "iconAfter",
          fn: withCtx(() => [
            s[1] || (s[1] = createElementVNode("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "20",
              height: "20",
              "aria-hidden": "true",
              focusable: "false",
              fill: "currentColor"
            }, [
              createElementVNode("path", { d: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" })
            ], -1))
          ]),
          key: "0"
        }
      ]), 1032, ["aria-label"])
    ]));
  }
}), Gp = /* @__PURE__ */ A(Ep, [["__scopeId", "data-v-9b3716b7"]]), qp = { class: "agds-progress-indicator__grid" }, zp = {
  class: "agds-progress-indicator__icon-col",
  "aria-hidden": "true"
}, Hp = { class: "agds-progress-indicator__status-text" }, Np = { class: "agds-progress-indicator__sub-list" }, jp = { class: "agds-progress-indicator__sub-item" }, Wp = /* @__PURE__ */ defineComponent({
  __name: "AGDSProgressIndicatorItem",
  props: {
    item: {},
    background: {},
    isFirst: { type: Boolean },
    isLast: { type: Boolean }
  },
  setup(e) {
    const t = {
      blocked: { label: "Cannot start yet", icon: "mdi:lock", iconColor: "border" },
      doing: { label: "In progress", icon: "mdi:progress-clock", iconColor: "border" },
      started: { label: "In progress", icon: "mdi:progress-clock", iconColor: "border" },
      todo: { label: "Not started", icon: "mdi:checkbox-blank-circle-outline", iconColor: "border" },
      done: { label: "Completed", icon: "mdi:check-circle", iconColor: "success" },
      saved: { label: "Saved", icon: "mdi:check-circle-outline", iconColor: "success" },
      error: { label: "Error", icon: "mdi:alert-circle", iconColor: "error" }
    }, n = e, a = computed(() => t[n.item.status]), o = computed(() => {
      const { iconColor: g } = a.value;
      return n.item.isActive && g === "border" ? "var(--agds-color-action-primary)" : g === "success" ? "var(--agds-color-success)" : g === "error" ? "var(--agds-color-error)" : "var(--agds-color-border)";
    }), s = computed(() => n.item.href ? "a" : "button"), r = computed(
      () => n.item.isActive ? n.item.items?.find((g) => g.isActive) ?? null : null
    ), u = computed(() => !!n.item.items?.length);
    return (g, c) => (openBlock(), createElementBlock("li", {
      class: normalizeClass(["agds-progress-indicator__item", [
        `agds-progress-indicator__item--bg-${e.background}`,
        e.item.isActive && "agds-progress-indicator__item--active",
        e.isFirst && "agds-progress-indicator__item--first",
        e.isLast && "agds-progress-indicator__item--last"
      ]])
    }, [
      createElementVNode("span", qp, [
        createElementVNode("span", zp, [
          c[1] || (c[1] = createElementVNode("span", { class: "agds-progress-indicator__line agds-progress-indicator__line--top" }, null, -1)),
          createElementVNode("span", {
            class: normalizeClass(["agds-progress-indicator__ring", { "agds-progress-indicator__ring--active": e.item.isActive }])
          }, [
            createVNode(unref(_e), {
              name: a.value.icon,
              size: "md",
              color: o.value,
              "aria-hidden": "true"
            }, null, 8, ["name", "color"])
          ], 2),
          c[2] || (c[2] = createElementVNode("span", { class: "agds-progress-indicator__line agds-progress-indicator__line--bottom" }, null, -1))
        ]),
        (openBlock(), createBlock(resolveDynamicComponent(s.value), mergeProps({
          class: ["agds-progress-indicator__content", { "agds-progress-indicator__content--no-sub": !u.value }]
        }, e.item.href ? { href: e.item.href } : { type: "button" }, {
          "aria-current": e.item.isActive ? "step" : void 0,
          onClick: c[0] || (c[0] = (f) => e.item.href ? void 0 : e.item.onClick?.(f))
        }), {
          default: withCtx(() => [
            createElementVNode("span", {
              class: normalizeClass(["agds-progress-indicator__label", { "agds-progress-indicator__label--bold": e.item.isActive }])
            }, toDisplayString(e.item.label), 3),
            createElementVNode("span", Hp, toDisplayString(a.value.label), 1)
          ]),
          _: 1
        }, 16, ["class", "aria-current"])),
        r.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          c[3] || (c[3] = createElementVNode("span", {
            class: "agds-progress-indicator__line agds-progress-indicator__line--sub",
            "aria-hidden": "true"
          }, null, -1)),
          createElementVNode("ul", Np, [
            createElementVNode("li", jp, [
              (openBlock(), createBlock(resolveDynamicComponent(r.value.href ? "a" : "span"), {
                class: "agds-progress-indicator__sub-link",
                href: r.value.href || void 0,
                "aria-current": "step"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_e), {
                    name: "mdi:arrow-right-bottom",
                    size: "sm",
                    color: "var(--agds-color-action-primary)",
                    "aria-hidden": "true"
                  }),
                  createElementVNode("span", null, toDisplayString(r.value.label), 1)
                ]),
                _: 1
              }, 8, ["href"]))
            ])
          ])
        ], 64)) : createCommentVNode("", true)
      ])
    ], 2));
  }
}), Up = /* @__PURE__ */ A(Wp, [["__scopeId", "data-v-cac787ce"]]), Zp = ["aria-expanded"], Kp = { class: "agds-progress-indicator__toggle-text" }, Yp = {
  key: 0,
  class: "agds-progress-indicator__subtitle"
}, Xp = { class: "agds-progress-indicator__body" }, Qp = { class: "agds-progress-indicator__list" }, Jp = /* @__PURE__ */ defineComponent({
  name: "AgDSProgressIndicator",
  __name: "AGDSProgressIndicator",
  props: {
    activePath: {},
    background: { default: "body" },
    hideSubtitle: { type: Boolean, default: false },
    items: {}
  },
  setup(e) {
    const t = e, n = ref(true);
    function a() {
      n.value = !n.value;
    }
    const o = computed(() => t.hideSubtitle ? void 0 : `${t.items.filter((u) => u.status === "done").length} of ${t.items.length} steps completed`), s = computed(() => {
      const r = t.items.some((u) => u.isActive);
      return t.items.map((u) => {
        let g;
        if (r)
          g = !!u.isActive;
        else if (t.activePath !== void 0) {
          const f = u.href ?? u.label, m = f.endsWith("/") ? f : `${f}/`, p = !!t.activePath.split(m)[1]?.length;
          g = t.activePath === f || p;
        } else
          g = u.status === "doing";
        const c = u.items?.map((f) => ({
          ...f,
          isActive: f.href === t.activePath
        }));
        return { ...u, isActive: g, items: c };
      });
    });
    return (r, u) => (openBlock(), createElementBlock("nav", {
      class: normalizeClass(["agds-progress-indicator", [
        `agds-progress-indicator--bg-${e.background}`,
        { "agds-progress-indicator--expanded": n.value }
      ]]),
      "aria-label": "Progress"
    }, [
      createElementVNode("button", {
        type: "button",
        class: "agds-progress-indicator__toggle",
        "aria-expanded": n.value,
        onClick: a
      }, [
        createElementVNode("span", Kp, [
          u[0] || (u[0] = createElementVNode("span", { class: "agds-progress-indicator__title" }, "Progress", -1)),
          o.value ? (openBlock(), createElementBlock("span", Yp, toDisplayString(o.value), 1)) : createCommentVNode("", true)
        ]),
        (openBlock(), createElementBlock("svg", {
          class: normalizeClass(["agds-progress-indicator__chevron", { "agds-progress-indicator__chevron--open": n.value }]),
          "aria-hidden": "true",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          "stroke-linecap": "round",
          "stroke-linejoin": "round"
        }, [...u[1] || (u[1] = [
          createElementVNode("polyline", { points: "6 9 12 15 18 9" }, null, -1)
        ])], 2))
      ], 8, Zp),
      createElementVNode("div", Xp, [
        createElementVNode("ul", Qp, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(s.value, (g, c) => (openBlock(), createBlock(Up, {
            key: g.label,
            item: g,
            background: e.background,
            "is-first": c === 0,
            "is-last": c === s.value.length - 1
          }, null, 8, ["item", "background", "is-first", "is-last"]))), 128))
        ])
      ])
    ], 2));
  }
}), eh = /* @__PURE__ */ A(Jp, [["__scopeId", "data-v-341abc83"]]), Mn = /* @__PURE__ */ Symbol("AppLayout");
function Bn() {
  const e = inject(Mn);
  if (!e)
    throw new Error("useAppLayoutContext must be called within AgDSAppLayout");
  return e;
}
const th = { class: "agds-app-layout__body" }, ah = { class: "agds-app-layout__sidebar-col" }, nh = { class: "agds-app-layout__main" }, oh = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayout",
  props: {
    focusMode: { type: Boolean, default: false }
  },
  setup(e) {
    const t = e, n = ref(false), a = computed(() => t.focusMode);
    function o() {
      n.value = true;
    }
    function s() {
      n.value = false;
    }
    return provide(Mn, {
      focusMode: a,
      isMobileMenuOpen: n,
      openMobileMenu: o,
      closeMobileMenu: s
    }), (r, u) => (openBlock(), createElementBlock("div", {
      class: normalizeClass(["agds-app-layout", { "agds-app-layout--focus-mode": e.focusMode }])
    }, [
      renderSlot(r.$slots, "header", {}, void 0, true),
      createElementVNode("div", th, [
        createElementVNode("div", ah, [
          renderSlot(r.$slots, "sidebar", {}, void 0, true)
        ]),
        createElementVNode("div", nh, [
          renderSlot(r.$slots, "default", {}, void 0, true)
        ])
      ])
    ], 2));
  }
}), sh = /* @__PURE__ */ A(oh, [["__scopeId", "data-v-dbac323b"]]), lh = ["aria-expanded"], ih = { class: "agds-app-layout-header__brand" }, rh = {
  key: 1,
  class: "agds-app-layout-header__account"
}, dh = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayoutHeader",
  props: {
    heading: {},
    href: { default: "/" },
    background: { default: "body" },
    badgeLabel: {},
    subline: {},
    dividerPosition: { default: "after" },
    maxWidth: { default: "container" },
    secondHref: {},
    size: { default: "md" }
  },
  setup(e) {
    const { focusMode: t, isMobileMenuOpen: n, openMobileMenu: a } = Bn();
    return (o, s) => (openBlock(), createElementBlock("header", {
      class: normalizeClass(["agds-app-layout-header", [`agds-app-layout-header--${e.background}`]])
    }, [
      createElementVNode("div", {
        class: normalizeClass(["agds-app-layout-header__inner", [`agds-app-layout-header__inner--${e.maxWidth}`]])
      }, [
        unref(t) ? createCommentVNode("", true) : (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "agds-app-layout-header__hamburger",
          "aria-expanded": unref(n),
          "aria-haspopup": "dialog",
          "aria-label": "Open menu",
          "aria-controls": "agds-app-layout-sidebar-dialog",
          onClick: s[0] || (s[0] = //@ts-ignore
          (...r) => unref(a) && unref(a)(...r))
        }, [...s[1] || (s[1] = [
          createStaticVNode('<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="agds-app-layout-header__hamburger-icon" data-v-ae3c4785><line x1="3" y1="6" x2="21" y2="6" data-v-ae3c4785></line><line x1="3" y1="12" x2="21" y2="12" data-v-ae3c4785></line><line x1="3" y1="18" x2="21" y2="18" data-v-ae3c4785></line></svg><span class="sr-only" data-v-ae3c4785>Menu</span>', 2)
        ])], 8, lh)),
        createElementVNode("div", ih, [
          createVNode(on, {
            "badge-label": e.badgeLabel,
            "divider-position": e.dividerPosition,
            "has-right-content": !!o.$slots.account,
            heading: e.heading,
            href: e.href,
            "second-href": e.secondHref,
            size: e.size,
            subline: e.subline
          }, createSlots({ _: 2 }, [
            o.$slots.logo ? {
              name: "logo",
              fn: withCtx(() => [
                renderSlot(o.$slots, "logo", {}, void 0, true)
              ]),
              key: "0"
            } : void 0,
            o.$slots.secondLogo ? {
              name: "secondLogo",
              fn: withCtx(() => [
                renderSlot(o.$slots, "secondLogo", {}, void 0, true)
              ]),
              key: "1"
            } : void 0
          ]), 1032, ["badge-label", "divider-position", "has-right-content", "heading", "href", "second-href", "size", "subline"])
        ]),
        o.$slots.account ? (openBlock(), createElementBlock("div", rh, [
          renderSlot(o.$slots, "account", {}, void 0, true)
        ])) : createCommentVNode("", true)
      ], 2)
    ], 2));
  }
}), uh = /* @__PURE__ */ A(dh, [["__scopeId", "data-v-ae3c4785"]]);
function lt(e) {
  return "href" in e;
}
function ch(e) {
  return "onClick" in e;
}
function Ln(e) {
  return Array.isArray(e) ? e : e.items;
}
function gh(e) {
  return Array.isArray(e) ? void 0 : e.options;
}
function fh(e, t) {
  if (!t)
    return "";
  let n = "";
  function a(s) {
    t.startsWith(s) && s.length > n.length && (n = s);
  }
  function o(s) {
    for (const r of s)
      lt(r) && (a(r.href), r.items && o(r.items));
  }
  for (const s of e)
    o(Ln(s));
  return n;
}
function Tn(e, t) {
  return e.some((n) => n.href === t || (n.items ? Tn(n.items, t) : false));
}
const mh = {
  key: 0,
  class: "agds-alsnav-item"
}, vh = ["href", "aria-current"], ph = {
  key: 1,
  "aria-hidden": "true",
  class: "agds-alsnav-item__dash"
}, hh = { class: "agds-alsnav-item__label" }, bh = {
  key: 0,
  class: "agds-alsnav-item__sub",
  role: "list"
}, _h = {
  key: 1,
  class: "agds-alsnav-item"
}, yh = { class: "agds-alsnav-item__label" }, kh = {
  key: 2,
  class: "agds-alsnav-item"
}, Sh = { class: "agds-alsnav-item__text" }, $h = /* @__PURE__ */ defineComponent({
  __name: "AppLayoutSidebarNavItem",
  props: {
    item: {},
    activePath: {},
    level: {},
    subLevelVisible: {},
    background: {}
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    useCssVars((m) => ({
      v1603bac8: f.value
    }));
    const n = e, a = t, o = computed(() => lt(n.item)), s = computed(() => ch(n.item)), r = computed(
      () => lt(n.item) ? n.item : null
    ), u = computed(
      () => lt(n.item) && n.item.href === n.activePath
    ), g = computed(
      () => lt(n.item) && n.item.items?.length ? Tn(
        n.item.items,
        n.activePath
      ) : false
    ), c = computed(
      () => n.subLevelVisible === "always" || g.value || u.value
    ), f = computed(
      () => n.background === "body" ? "var(--agds-color-bg-subtle)" : "var(--agds-color-bg-muted)"
    );
    return (m, p) => {
      const x = resolveComponent("AppLayoutSidebarNavItem", true);
      return o.value ? (openBlock(), createElementBlock("li", mh, [
        createElementVNode("a", {
          href: r.value.href,
          "aria-current": u.value ? "page" : void 0,
          class: normalizeClass(["agds-alsnav-item__link", {
            "agds-alsnav-item__link--current": u.value,
            "agds-alsnav-item__link--ancestor": g.value && !u.value,
            "agds-alsnav-item__link--level2": e.level === 2
          }]),
          onClick: p[0] || (p[0] = (h2) => a("close"))
        }, [
          r.value.icon && e.level === 1 ? (openBlock(), createBlock(resolveDynamicComponent(r.value.icon), {
            key: 0,
            "aria-hidden": "true",
            class: "agds-alsnav-item__icon"
          })) : createCommentVNode("", true),
          e.level === 2 ? (openBlock(), createElementBlock("span", ph, "–")) : createCommentVNode("", true),
          createElementVNode("span", hh, toDisplayString(e.item.label), 1),
          r.value.items?.length && e.subLevelVisible !== "always" ? (openBlock(), createElementBlock("svg", {
            key: 2,
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            class: normalizeClass(["agds-alsnav-item__chevron", { "agds-alsnav-item__chevron--open": g.value || u.value }])
          }, [...p[3] || (p[3] = [
            createElementVNode("polyline", { points: "9 18 15 12 9 6" }, null, -1)
          ])], 2)) : createCommentVNode("", true)
        ], 10, vh),
        r.value.items?.length && c.value ? (openBlock(), createElementBlock("ul", bh, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(r.value.items, (h2, D) => (openBlock(), createBlock(x, {
            key: D,
            item: h2,
            "active-path": e.activePath,
            level: e.level + 1,
            "sub-level-visible": e.subLevelVisible,
            background: e.background,
            onClose: p[1] || (p[1] = (_) => a("close"))
          }, null, 8, ["item", "active-path", "level", "sub-level-visible", "background"]))), 128))
        ])) : createCommentVNode("", true)
      ])) : s.value ? (openBlock(), createElementBlock("li", _h, [
        createElementVNode("button", {
          type: "button",
          class: "agds-alsnav-item__button",
          onClick: p[2] || (p[2] = (h2) => {
            e.item.onClick?.(h2), a("close");
          })
        }, [
          e.item.icon && e.level === 1 ? (openBlock(), createBlock(resolveDynamicComponent(e.item.icon), {
            key: 0,
            "aria-hidden": "true",
            class: "agds-alsnav-item__icon"
          })) : createCommentVNode("", true),
          createElementVNode("span", yh, toDisplayString(e.item.label), 1)
        ])
      ])) : (openBlock(), createElementBlock("li", kh, [
        createElementVNode("span", Sh, toDisplayString(e.item.label), 1)
      ]));
    };
  }
}), xh = /* @__PURE__ */ A($h, [["__scopeId", "data-v-67c9f167"]]), wh = {
  "aria-label": "Main",
  class: "agds-alsnav",
  "aria-labelledby": "agds-alsnav-label"
}, Ah = {
  class: "agds-alsnav__list",
  role: "list"
}, Dh = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayoutSidebarNav",
  props: {
    items: {},
    activePath: {},
    subLevelVisible: { default: "whenActive" },
    background: { default: "bodyAlt" }
  },
  emits: ["close"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = computed(
      () => n.items.map((s) => ({
        items: Ln(s),
        options: gh(s)
      }))
    );
    return (s, r) => (openBlock(), createElementBlock("nav", wh, [
      r[2] || (r[2] = createElementVNode("span", {
        id: "agds-alsnav-label",
        class: "sr-only"
      }, "Menu", -1)),
      createElementVNode("ul", Ah, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(o.value, (u, g) => (openBlock(), createElementBlock(Fragment, { key: g }, [
          g > 0 ? (openBlock(), createElementBlock("li", {
            key: 0,
            class: normalizeClass(["agds-alsnav__divider-item", {
              "agds-alsnav__divider-item--no-top": o.value[g - 1].options?.disableGroupPadding,
              "agds-alsnav__divider-item--no-bottom": u.options?.disableGroupPadding
            }]),
            "aria-hidden": "true"
          }, [...r[1] || (r[1] = [
            createElementVNode("hr", { class: "agds-alsnav__divider" }, null, -1)
          ])], 2)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(u.items, (c, f) => (openBlock(), createBlock(xh, {
            key: f,
            item: c,
            "active-path": e.activePath,
            level: 1,
            "sub-level-visible": e.subLevelVisible,
            background: e.background,
            onClose: r[0] || (r[0] = (m) => a("close"))
          }, null, 8, ["item", "active-path", "sub-level-visible", "background"]))), 128))
        ], 64))), 128))
      ])
    ]));
  }
}), Zt = /* @__PURE__ */ A(Dh, [["__scopeId", "data-v-241d3927"]]), Ch = { class: "agds-alsdialog__header" }, Ih = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayoutSidebar",
  props: {
    items: {},
    activePath: {},
    background: { default: "bodyAlt" },
    subLevelVisible: { default: "whenActive" }
  },
  setup(e) {
    const t = e, { focusMode: n, isMobileMenuOpen: a, closeMobileMenu: o } = Bn(), s = computed(() => fh(t.items, t.activePath)), r = ref(null), u = ref(null);
    watch(a, async (c) => {
      c ? (await nextTick(), u.value?.focus(), (void 0).body.style.overflow = "hidden") : (void 0).body.style.overflow = "";
    });
    function g(c) {
      if (c.key === "Escape") {
        c.preventDefault(), o();
        return;
      }
      if (c.key === "Tab") {
        const f = r.value?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (!f?.length) return;
        const m = f[0], p = f[f.length - 1];
        c.shiftKey && (void 0).activeElement === m ? (c.preventDefault(), p.focus()) : !c.shiftKey && (void 0).activeElement === p && (c.preventDefault(), m.focus());
      }
    }
    return (c, f) => (openBlock(), createElementBlock(Fragment, null, [
      createElementVNode("aside", {
        class: normalizeClass(["agds-app-layout-sidebar", [
          `agds-app-layout-sidebar--${e.background}`,
          { "agds-app-layout-sidebar--focus-mode": unref(n) }
        ]]),
        "aria-label": "Navigation"
      }, [
        createVNode(Zt, {
          items: e.items,
          "active-path": s.value,
          "sub-level-visible": e.subLevelVisible,
          background: e.background
        }, null, 8, ["items", "active-path", "sub-level-visible", "background"])
      ], 2),
      (openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, { name: "agds-alsdialog-backdrop" }, {
          default: withCtx(() => [
            unref(a) ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "agds-alsdialog__backdrop",
              "aria-hidden": "true",
              onClick: f[0] || (f[0] = //@ts-ignore
              (...m) => unref(o) && unref(o)(...m))
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "agds-alsdialog-panel" }, {
          default: withCtx(() => [
            unref(a) ? (openBlock(), createElementBlock("div", {
              key: 0,
              id: "agds-app-layout-sidebar-dialog",
              ref_key: "dialogEl",
              ref: r,
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Menu",
              class: normalizeClass(["agds-alsdialog", [`agds-alsdialog--${e.background}`]]),
              onKeydown: g
            }, [
              createElementVNode("div", Ch, [
                createElementVNode("button", {
                  ref_key: "closeButtonEl",
                  ref: u,
                  type: "button",
                  class: "agds-alsdialog__close",
                  "aria-label": "Close menu",
                  onClick: f[1] || (f[1] = //@ts-ignore
                  (...m) => unref(o) && unref(o)(...m))
                }, [...f[2] || (f[2] = [
                  createElementVNode("svg", {
                    "aria-hidden": "true",
                    xmlns: "http://www.w3.org/2000/svg",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    class: "agds-alsdialog__close-icon"
                  }, [
                    createElementVNode("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    createElementVNode("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1),
                  createElementVNode("span", null, "Close", -1)
                ])], 512)
              ]),
              createVNode(Zt, {
                items: e.items,
                "active-path": s.value,
                "sub-level-visible": e.subLevelVisible,
                background: e.background,
                onClose: unref(o)
              }, null, 8, ["items", "active-path", "sub-level-visible", "background", "onClose"])
            ], 34)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]))
    ], 64));
  }
}), Mh = /* @__PURE__ */ A(Ih, [["__scopeId", "data-v-04bbdf06"]]), Bh = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayoutFooter",
  props: {
    background: { default: "body" },
    maxWidth: { default: "container" }
  },
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("footer", {
      class: normalizeClass(["agds-app-layout-footer", [`agds-app-layout-footer--${e.background}`]])
    }, [
      createElementVNode("div", {
        class: normalizeClass(["agds-app-layout-footer__inner", [`agds-app-layout-footer__inner--${e.maxWidth}`]])
      }, [
        renderSlot(t.$slots, "default", {}, void 0, true)
      ], 2)
    ], 2));
  }
}), Lh = /* @__PURE__ */ A(Bh, [["__scopeId", "data-v-5d10d449"]]), Th = {
  "aria-hidden": "true",
  class: "agds-app-layout-footer-divider"
}, Fh = /* @__PURE__ */ defineComponent({
  __name: "AGDSAppLayoutFooterDivider",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("hr", Th));
  }
}), Ph = /* @__PURE__ */ A(Fh, [["__scopeId", "data-v-d84b2daf"]]), Fn = /* @__PURE__ */ Symbol("AgDSTable"), Oh = ["tabindex", "id"], Vh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTable",
  props: {
    striped: { type: Boolean },
    tabIndex: {},
    tableLayout: { default: "auto" },
    id: {}
  },
  setup(e) {
    const t = e;
    return provide(
      Fn,
      reactive({
        get tableLayout() {
          return t.tableLayout ?? "auto";
        }
      })
    ), (n, a) => (openBlock(), createElementBlock("table", {
      class: normalizeClass(["agds-table", [
        t.striped && "agds-table--striped",
        t.tableLayout === "fixed" && "agds-table--layout-fixed"
      ]]),
      tabindex: t.tabIndex,
      id: t.id
    }, [
      renderSlot(n.$slots, "default", {}, void 0, true)
    ], 10, Oh));
  }
}), Rh = /* @__PURE__ */ A(Vh, [["__scopeId", "data-v-18818dfc"]]), Eh = { class: "agds-table-body" }, Gh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableBody",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("tbody", Eh, [
      renderSlot(t.$slots, "default")
    ]));
  }
}), qh = { class: "agds-table-caption" }, zh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableCaption",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("caption", qh, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), Hh = /* @__PURE__ */ A(zh, [["__scopeId", "data-v-75160857"]]), Nh = { class: "agds-table-head" }, jh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableHead",
  setup(e) {
    return (t, n) => (openBlock(), createElementBlock("thead", Nh, [
      renderSlot(t.$slots, "default", {}, void 0, true)
    ]));
  }
}), Wh = /* @__PURE__ */ A(jh, [["__scopeId", "data-v-fbb2216e"]]), Uh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableHeader",
  props: {
    as: { default: "th" },
    colSpan: {},
    rowSpan: {},
    scope: { default: "col" },
    textAlign: { default: "left" },
    width: {}
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      class: normalizeClass(["agds-table-header", `agds-table-header--${t.textAlign}`]),
      colSpan: t.colSpan,
      rowSpan: t.rowSpan,
      scope: t.scope,
      style: normalizeStyle(t.width ? { width: t.width } : void 0)
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["class", "colSpan", "rowSpan", "scope", "style"]));
  }
}), Zh = /* @__PURE__ */ A(Uh, [["__scopeId", "data-v-168f5712"]]), Kh = ["aria-sort", "colSpan"], Yh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableHeaderSortable",
  props: {
    sort: {},
    textAlign: { default: "left" },
    width: {},
    colSpan: {}
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = computed(() => {
      if (n.sort === "ASC") return "ascending";
      if (n.sort === "DESC") return "descending";
    }), s = computed(() => n.sort === "ASC" ? "heroicons:arrow-up" : n.sort === "DESC" ? "heroicons:arrow-down" : "heroicons:arrows-up-down"), r = computed(() => !!n.sort);
    return (u, g) => (openBlock(), createElementBlock("th", {
      class: normalizeClass(["agds-table-header-sortable", r.value && "agds-table-header-sortable--active"]),
      scope: "col",
      "aria-sort": o.value,
      colSpan: n.colSpan,
      style: normalizeStyle(n.width ? { width: n.width } : void 0)
    }, [
      createElementVNode("button", {
        type: "button",
        class: normalizeClass(["agds-table-header-sortable__button", `agds-table-header-sortable__button--${n.textAlign}`]),
        onClick: g[0] || (g[0] = (c) => a("click", c))
      }, [
        createElementVNode("span", {
          class: "agds-table-header-sortable__label",
          style: normalizeStyle(
            n.textAlign === "right" ? { marginLeft: "auto" } : n.textAlign === "center" ? { marginInline: "auto" } : void 0
          )
        }, [
          renderSlot(u.$slots, "default", {}, void 0, true)
        ], 4),
        createVNode(_e, {
          name: s.value,
          size: "sm",
          class: "agds-table-header-sortable__icon",
          "aria-hidden": "true"
        }, null, 8, ["name"])
      ], 2)
    ], 14, Kh));
  }
}), Xh = /* @__PURE__ */ A(Yh, [["__scopeId", "data-v-c8d8c343"]]), Qh = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableCell",
  props: {
    as: { default: "td" },
    colSpan: {},
    rowSpan: {},
    scope: {},
    id: {},
    fontWeight: { default: "normal" },
    textAlign: { default: "left" },
    verticalAlign: { default: "top" }
  },
  setup(e) {
    const t = e;
    return (n, a) => (openBlock(), createBlock(resolveDynamicComponent(t.as), {
      class: normalizeClass(["agds-table-cell", [
        `agds-table-cell--align-${t.textAlign}`,
        `agds-table-cell--weight-${t.fontWeight}`
      ]]),
      colSpan: t.colSpan,
      rowSpan: t.rowSpan,
      scope: t.scope,
      id: t.id,
      style: normalizeStyle({ verticalAlign: t.verticalAlign })
    }, {
      default: withCtx(() => [
        renderSlot(n.$slots, "default", {}, void 0, true)
      ]),
      _: 3
    }, 8, ["class", "colSpan", "rowSpan", "scope", "id", "style"]));
  }
}), Jh = /* @__PURE__ */ A(Qh, [["__scopeId", "data-v-6fa164c2"]]), eb = ["aria-rowindex", "aria-selected", "data-has-background"], tb = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableRow",
  props: {
    "aria-rowindex": {},
    background: {},
    invalid: { type: Boolean, default: false },
    clickable: { type: Boolean, default: false },
    selected: { type: Boolean, default: false }
  },
  emits: ["click"],
  setup(e, { emit: t }) {
    const n = e, a = t, o = inject(Fn), s = computed(() => o?.tableLayout === "fixed"), r = computed(() => !!(n.background || n.invalid));
    function u(g) {
      if (!n.clickable) return;
      const c = g.target;
      c.closest("a, button, input, label, select, textarea") || c.closest("tr") && (g.stopPropagation(), a("click", g));
    }
    return (g, c) => (openBlock(), createElementBlock("tr", {
      class: normalizeClass(["agds-table-row", [
        n.selected && "agds-table-row--selected",
        n.invalid && "agds-table-row--invalid",
        n.clickable && "agds-table-row--clickable",
        n.background && `agds-table-row--bg-${n.background}`,
        s.value && "agds-table-row--fixed"
      ]]),
      "aria-rowindex": n["aria-rowindex"],
      "aria-selected": n.selected ? true : void 0,
      "data-has-background": r.value ? true : void 0,
      onClick: u
    }, [
      renderSlot(g.$slots, "default", {}, void 0, true)
    ], 10, eb));
  }
}), ab = /* @__PURE__ */ A(tb, [["__scopeId", "data-v-0f6abb19"]]), nb = { class: "agds-table-scroller" }, ob = ["aria-label", "tabindex"], sb = /* @__PURE__ */ defineComponent({
  __name: "AGDSTableScroller",
  setup(e) {
    const t = ref(null), n = ref(null), a = ref(null), o = { x: 0, y: 0 }, s = ref(0), r = ref(""), u = ref(false), g = ref(0), c = ref(1);
    let f = null;
    const m = computed(() => c.value !== 1);
    function p() {
      a.value && (g.value = a.value.scrollLeft * c.value);
    }
    const h2 = computed(() => m.value ? (a.value?.scrollLeft ?? 0) > 0 : false), D = computed(() => {
      if (!m.value) return false;
      const O = a.value;
      return O ? Math.ceil(O.scrollLeft + O.offsetWidth) < O.scrollWidth : false;
    });
    function B(O) {
      O.preventDefault(), u.value = true, O instanceof MouseEvent && O.button === 0 ? (o.x = O.pageX, o.y = O.pageY) : O instanceof TouchEvent && O.touches.length && (o.x = O.touches[0].pageX, o.y = O.touches[0].pageY);
    }
    function I(O) {
      if (!u.value || !a.value) return;
      let V, N;
      if (O instanceof TouchEvent && O.touches.length)
        V = O.touches[0].pageX, N = O.touches[0].pageY;
      else if (O instanceof MouseEvent)
        V = O.pageX, N = O.pageY;
      else
        return;
      const le = V - o.x, Q = N - o.y;
      Math.abs(le) > Math.abs(Q) && (O.preventDefault(), a.value.scrollLeft += le / c.value, o.x = V), o.y = N;
    }
    function P() {
      u.value && (u.value = false);
    }
    watch(u, (O) => {
      O ? ((void 0).addEventListener("mousemove", I), (void 0).addEventListener("mouseup", P), (void 0).addEventListener("touchmove", I, { passive: false }), (void 0).addEventListener("touchend", P)) : ((void 0).removeEventListener("mousemove", I), (void 0).removeEventListener("mouseup", P), (void 0).removeEventListener("touchmove", I), (void 0).removeEventListener("touchend", P));
    });
    function H(O) {
      const V = O === "left" ? -40 : 40;
      a.value && (a.value.scrollLeft += V), U();
    }
    function Y(O, V) {
      const N = V === "left" ? -40 : 40, le = O instanceof TouchEvent || O instanceof MouseEvent && O.button === 0;
      f = (void 0).setInterval(() => {
        a.value && le && (a.value.scrollLeft += N);
      }, 100);
    }
    function U() {
      f !== null && (clearInterval(f), f = null);
    }
    function se(O) {
      const V = n.value, N = a.value;
      if (!V || !N) return;
      const { left: le, right: Q, width: Z } = V.getBoundingClientRect();
      O.pageX > Q ? N.scrollLeft += Z * 0.95 : O.pageX < le && (N.scrollLeft -= Z * 0.95);
    }
    return (O, V) => (openBlock(), createElementBlock("div", nb, [
      createElementVNode("section", {
        ref_key: "scrollerRef",
        ref: a,
        class: "agds-table-scroller__region",
        "aria-label": r.value || void 0,
        tabindex: m.value ? 0 : -1,
        onScroll: p
      }, [
        renderSlot(O.$slots, "default", {}, void 0, true),
        createElementVNode("div", {
          class: normalizeClass(["agds-table-scroller__shadow agds-table-scroller__shadow--left", h2.value && "agds-table-scroller__shadow--visible"]),
          style: normalizeStyle({ height: `${s.value}px` }),
          "aria-hidden": "true"
        }, null, 6),
        createElementVNode("div", {
          class: normalizeClass(["agds-table-scroller__shadow agds-table-scroller__shadow--right", D.value && "agds-table-scroller__shadow--visible"]),
          style: normalizeStyle({ height: `${s.value}px` }),
          "aria-hidden": "true"
        }, null, 6)
      ], 40, ob),
      createElementVNode("div", {
        class: "agds-table-scroller__bar",
        style: normalizeStyle({ display: m.value ? void 0 : "none" })
      }, [
        createElementVNode("button", {
          type: "button",
          class: "agds-table-scroller__arrow",
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: V[0] || (V[0] = (N) => H("left")),
          onMousedown: V[1] || (V[1] = (N) => Y(N, "left")),
          onMouseleave: U,
          onMouseup: U,
          onTouchstartPassive: V[2] || (V[2] = (N) => Y(N, "left")),
          onTouchend: U
        }, [...V[6] || (V[6] = [
          createElementVNode("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            "aria-hidden": "true",
            focusable: "false"
          }, [
            createElementVNode("path", {
              d: "M10 3L5 8L10 13",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          ], -1)
        ])], 32),
        createElementVNode("div", {
          ref_key: "trackRef",
          ref: t,
          class: "agds-table-scroller__track",
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: se
        }, [
          createElementVNode("button", {
            ref_key: "thumbRef",
            ref: n,
            type: "button",
            class: "agds-table-scroller__thumb",
            tabindex: "-1",
            "aria-hidden": "true",
            style: normalizeStyle({
              left: `${g.value}px`,
              width: `${c.value * 100}%`
            }),
            onMousedown: B,
            onTouchstart: withModifiers(B, ["prevent"])
          }, null, 36)
        ], 512),
        createElementVNode("button", {
          type: "button",
          class: "agds-table-scroller__arrow",
          tabindex: "-1",
          "aria-hidden": "true",
          onClick: V[3] || (V[3] = (N) => H("right")),
          onMousedown: V[4] || (V[4] = (N) => Y(N, "right")),
          onMouseleave: U,
          onMouseup: U,
          onTouchstartPassive: V[5] || (V[5] = (N) => Y(N, "right")),
          onTouchend: U
        }, [...V[7] || (V[7] = [
          createElementVNode("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            "aria-hidden": "true",
            focusable: "false"
          }, [
            createElementVNode("path", {
              d: "M6 3L11 8L6 13",
              stroke: "currentColor",
              "stroke-width": "1.5",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            })
          ], -1)
        ])], 32)
      ], 4)
    ]));
  }
}), lb = /* @__PURE__ */ A(sb, [["__scopeId", "data-v-7aa60f5f"]]), yb = {
  install(e) {
    e.component("AgDSCore", ko), e.component("AgDSCoreProvider", Ga), e.component("AgDSBox", Ha), e.component("AgDSFlex", at), e.component("AgDSColumns", Io), e.component("AgDSColumn", Mo), e.component("AgDSFormStack", Na), e.component("AgDSStack", pt), e.component("AgDSBreadcrumbs", js), e.component("AgDSBreadcrumbsItem", vt), e.component("AgDSButton", Ue), e.component("AgDSButtonLink", nl), e.component("AgDSToggleButton", ol), e.component("AgDSAccordion", ll), e.component("AgDSAccordionItem", ul), e.component("AgDSAvatar", ml), e.component("AgDSCallout", _l), e.component("AgDSGlobalAlert", Cl), e.component("AgDSSectionAlert", zl), e.component("AgDSPageAlert", $i), e.component("AgDSCard", wi), e.component("AgDSCardHeader", Di), e.component("AgDSCardFooter", Ii), e.component("AgDSCardInner", Li), e.component("AgDSCardLink", Fi), e.component("AgDSDetails", Gi), e.component("AgDSTag", nn), e.component("AgDSTags", Wi), e.component("AgDSFooter", Zi), e.component("AgDSFooterDivider", Yi), e.component("AgDSHeader", fr), e.component("AgDSDivider", cn), e.component("AgDSHeading", He), e.component("AgDSH1", Yr), e.component("AgDSH2", Xr), e.component("AgDSH3", Qr), e.component("AgDSH4", Jr), e.component("AgDSH5", ed), e.component("AgDSH6", td), e.component("AgDSFeatureLinkList", ud), e.component("AgDSFeatureLinkListItem", gn), e.component("AgDSLinkList", pd), e.component("AgDSLinkListItem", fn), e.component("AgDSIcon", _e), e.component("AgDSUnorderedList", bd), e.component("AgDSOrderedList", yd), e.component("AgDSListItem", $d), e.component("AgDSText", mn), e.component("AgDSTable", Rh), e.component("AgDSTableBody", Gh), e.component("AgDSTableCaption", Hh), e.component("AgDSTableHead", Wh), e.component("AgDSTableHeader", Zh), e.component("AgDSTableHeaderSortable", Xh), e.component("AgDSTableCell", Jh), e.component("AgDSTableRow", ab), e.component("AgDSTableScroller", lb), e.component("AgDSAppLayout", sh), e.component("AgDSAppLayoutHeader", uh), e.component("AgDSAppLayoutSidebar", Mh), e.component("AgDSAppLayoutSidebarNav", Zt), e.component("AgDSAppLayoutFooter", Lh), e.component("AgDSAppLayoutFooterDivider", Ph), e.component("AgDSSideNav", qv), e.component("AgDSCollapsingSideBar", Dn), e.component("AgDSFilterSidebar", Qv), e.component("AgDSSubNav", op), e.component("AgDSMainNav", Cv), e.component("AgDSModal", ru), e.component("AgDSDrawer", fu), e.component("AgDSTabs", vu), e.component("AgDSTabList", hu), e.component("AgDSTab", yu), e.component("AgDSTabPanel", Su), e.component("AgDSPagination", qd), e.component("AgDSPaginationButtons", ou), e.component("AgDSCheckbox", bn), e.component("AgDSCheckboxGroup", Ou), e.component("AgDSSwitch", Qu), e.component("AgDSRadio", nc), e.component("AgDSRadioGroup", cc), e.component("AgDSCombobox", Fc), e.component("AgDSComboboxMulti", Gc), e.component("AgDSComboboxAsync", yn), e.component("AgDSComboboxAsyncMulti", ig), e.component("AgDSAutocomplete", rg), e.component("AgDSDatePicker", Jg), e.component("AgDSField", Pe), e.component("AgDSFieldContainer", Bt), e.component("AgDSFieldLabel", Lt), e.component("AgDSFieldHint", Tt), e.component("AgDSFieldMessage", Ft), e.component("AgDSFieldset", rf), e.component("AgDSGroupedFields", gf), e.component("AgDSCallToActionLink", vc), e.component("AgDSCallToActionButton", kc), e.component("AgDSDirectionLink", wc), e.component("AgDSDirectionButton", Bc), e.component("AgDSVisuallyHidden", _t), e.component("AgDSExternalLinkCallout", Cn), e.component("AgDSTextLink", Pt), e.component("AgDSTextLinkExternal", gp), e.component("AgDSInpageNav", bp), e.component("AgDSContent", yp), e.component("AgDSSectionContent", kp), e.component("AgDSPageContent", Sp), e.component("AgDSContentBleed", xp), e.component("AgDSProse", wp), e.component("AgDSSkipLinks", Ip), e.component("AgDSSummaryList", ei), e.component("AgDSSummaryListItem", ni), e.component("AgDSSummaryListItemTerm", li), e.component("AgDSSummaryListItemDescription", di), e.component("AgDSSummaryListItemAction", gi), e.component("AgDSProgressIndicator", eh), e.component("AgDSLoadingBlanket", rp), e.component("AgDSNotificationBadge", up), e.component("AgDSDropdownMenu", ln), e.component("AgDSDropdownMenuButton", rn), e.component("AgDSDropdownMenuPanel", dn), e.component("AgDSDropdownMenuItem", Dr), e.component("AgDSDropdownMenuItemLink", un), e.component("AgDSDropdownMenuItemRadio", Er), e.component("AgDSDropdownMenuGroup", qr), e.component("AgDSDropdownMenuDivider", Zr), e.component("AgDSSearchBox", Bp), e.component("AgDSSearchBoxInput", Op), e.component("AgDSSearchBoxButton", Gp), e.component("AgDSFileUpload", vm), e.component("AgDSTextInput", bm), e.component("AgDSTextarea", Lm), e.component("AgDSSearchInput", Vm), e.component("AgDSSelect", Nm), e.component("AgDSTimeInput", $m), e.component("AgDSTimePicker", Im);
  }
};

export { ll as AgDSAccordion, ul as AgDSAccordionItem, sh as AgDSAppLayout, Lh as AgDSAppLayoutFooter, Ph as AgDSAppLayoutFooterDivider, uh as AgDSAppLayoutHeader, Mh as AgDSAppLayoutSidebar, Zt as AgDSAppLayoutSidebarNav, rg as AgDSAutocomplete, ml as AgDSAvatar, Ha as AgDSBox, js as AgDSBreadcrumbs, vt as AgDSBreadcrumbsItem, Ue as AgDSButton, nl as AgDSButtonLink, kc as AgDSCallToActionButton, vc as AgDSCallToActionLink, _l as AgDSCallout, wi as AgDSCard, Ii as AgDSCardFooter, Di as AgDSCardHeader, Li as AgDSCardInner, Fi as AgDSCardLink, bn as AgDSCheckbox, Ou as AgDSCheckboxGroup, Dn as AgDSCollapsingSideBar, Mo as AgDSColumn, Io as AgDSColumns, Fc as AgDSCombobox, yn as AgDSComboboxAsync, ig as AgDSComboboxAsyncMulti, Gc as AgDSComboboxMulti, yp as AgDSContent, xp as AgDSContentBleed, mb as AgDSControlGroup, ko as AgDSCore, Ga as AgDSCoreProvider, Jg as AgDSDatePicker, Gi as AgDSDetails, Bc as AgDSDirectionButton, wc as AgDSDirectionLink, cn as AgDSDivider, fu as AgDSDrawer, ln as AgDSDropdownMenu, rn as AgDSDropdownMenuButton, Zr as AgDSDropdownMenuDivider, qr as AgDSDropdownMenuGroup, Dr as AgDSDropdownMenuItem, un as AgDSDropdownMenuItemLink, Er as AgDSDropdownMenuItemRadio, dn as AgDSDropdownMenuPanel, Cn as AgDSExternalLinkCallout, ud as AgDSFeatureLinkList, gn as AgDSFeatureLinkListItem, Pe as AgDSField, Bt as AgDSFieldContainer, Tt as AgDSFieldHint, Lt as AgDSFieldLabel, Ft as AgDSFieldMessage, rf as AgDSFieldset, hb as AgDSFileInput, vm as AgDSFileUpload, Qv as AgDSFilterSidebar, at as AgDSFlex, Zi as AgDSFooter, Yi as AgDSFooterDivider, Na as AgDSFormStack, Cl as AgDSGlobalAlert, gf as AgDSGroupedFields, Yr as AgDSH1, Xr as AgDSH2, Qr as AgDSH3, Jr as AgDSH4, ed as AgDSH5, td as AgDSH6, fr as AgDSHeader, He as AgDSHeading, _e as AgDSIcon, bp as AgDSInpageNav, pd as AgDSLinkList, fn as AgDSLinkListItem, $d as AgDSListItem, rp as AgDSLoadingBlanket, Cv as AgDSMainNav, ru as AgDSModal, up as AgDSNotificationBadge, yd as AgDSOrderedList, $i as AgDSPageAlert, Sp as AgDSPageContent, qd as AgDSPagination, ou as AgDSPaginationButtons, bb as AgDSPasswordInput, eh as AgDSProgressIndicator, wp as AgDSProse, nc as AgDSRadio, cc as AgDSRadioGroup, Bp as AgDSSearchBox, Gp as AgDSSearchBoxButton, Op as AgDSSearchBoxInput, Vm as AgDSSearchInput, zl as AgDSSectionAlert, kp as AgDSSectionContent, Nm as AgDSSelect, qv as AgDSSideNav, Ip as AgDSSkipLinks, pt as AgDSStack, fb as AgDSStatusBadge, op as AgDSSubNav, ei as AgDSSummaryList, ni as AgDSSummaryListItem, gi as AgDSSummaryListItemAction, di as AgDSSummaryListItemDescription, li as AgDSSummaryListItemTerm, Qu as AgDSSwitch, yu as AgDSTab, hu as AgDSTabList, Su as AgDSTabPanel, Rh as AgDSTable, Gh as AgDSTableBody, Hh as AgDSTableCaption, Jh as AgDSTableCell, Wh as AgDSTableHead, Zh as AgDSTableHeader, Xh as AgDSTableHeaderSortable, ab as AgDSTableRow, lb as AgDSTableScroller, vu as AgDSTabs, nn as AgDSTag, Wi as AgDSTags, _b as AgDSTaskList, tv as AgDSTaskListItem, mn as AgDSText, bm as AgDSTextInput, Pt as AgDSTextLink, gp as AgDSTextLinkExternal, Lm as AgDSTextarea, $m as AgDSTimeInput, Im as AgDSTimePicker, ol as AgDSToggleButton, bd as AgDSUnorderedList, _t as AgDSVisuallyHidden, yb as AgDSVue, hn as CHECKBOX_GROUP_KEY, Wu as CONTROL_GROUP_KEY, ao as CORE_CONTEXT_KEY, pb as GROUPED_FIELDS_DATA_ATTR, _n as RADIO_GROUP_KEY, _m as acceptedTimeFormats, so as boxPalette, oo as boxPalettes, Co as breakpointNames, yb as default, sa as filterOptions, pa as fontGrid, Je as formatFileSize, Ye as formatTime, Am as generateOptions, fa as goldTheme, cb as mapResponsiveProp, ct as mapSpacing, gb as mediaQueryMin, ma as mergeTheme, ub as packs, Do as print, no as printTheme, va as themeToVars, J as themeVars, qe as tokens, Fa as transformValuePropToInputValue, db as useBoxPalette, vn as usePagination, vb as useScrollToField };
//# sourceMappingURL=AGDS-vue-DKm2H2go.mjs.map

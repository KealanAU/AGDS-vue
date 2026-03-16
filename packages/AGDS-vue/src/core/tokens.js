const breakpoint = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1600,
};
const mediaQuery = {
    min: {
        xs: `@media(min-width: ${0}px)`,
        sm: `@media(min-width: ${576}px)`,
        md: `@media(min-width: ${768}px)`,
        lg: `@media(min-width: ${992}px)`,
        xl: `@media(min-width: ${1200}px)`,
        xxl: `@media(min-width: ${1600}px)`,
    },
    max: {
        xs: `@media(max-width: ${575}px)`,
        sm: `@media(max-width: ${767}px)`,
        md: `@media(max-width: ${991}px)`,
        lg: `@media(max-width: ${1199}px)`,
        xl: `@media(max-width: ${1599}px)`,
    },
};
const rem = 16;
/** "unit" used for all type and grid calculations */
const unit = 4;
const font = {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
};
/** Use as rem values */
const fontSize = {
    xs: {
        xs: 0.875,
        sm: 1,
        md: 1.25,
        lg: 1.5,
        xl: 1.75,
        xxl: 2,
        xxxl: 2.5,
    },
    sm: {
        xs: 0.875,
        sm: 1,
        md: 1.25,
        lg: 1.5,
        xl: 2,
        xxl: 2.5,
        xxxl: 3,
    },
};
const fontWeight = {
    normal: 'normal',
    bold: 'bold',
};
/** lineHeight-map - Predetermined line-height mapped to keyword */
const lineHeight = {
    nospace: 1,
    heading: 1.25,
    default: 1.5,
};
export function mapSpacing(v) {
    return `${v}rem`;
}
const containerPadding = { xs: 0.75, md: 2 };
const maxWidth = {
    bodyText: '42em',
    container: '80rem', // 1280 px
    containerLg: '120rem', // 1920 px
    field: {
        xs: '5rem', // 80 px
        sm: '8rem', // 128 px
        md: '13rem', // 208 px
        lg: '18rem', // 288 px
        xl: '24rem', // 384 px
    },
};
const borderRadius = unit;
const borderWidth = {
    none: 0,
    sm: 1,
    md: 2,
    lg: 3,
    xl: 4,
    xxl: 8,
};
const transition = {
    duration: 250, // in milliseconds (ms)
    timingFunction: 'ease',
};
const zIndex = {
    base: 0,
    elevated: 1,
    overlay: 100,
    dialog: 110,
    popover: 200,
    skipLink: 999,
};
/** A set of predefined box-shadows. */
const shadow = {
    /** Used to slightly elevate interactive elements like cards */
    sm: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    /** Used to further elevate interactive elements on hover */
    md: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    /** Used for elements that float above the page like dropdowns and modals. */
    lg: '0px 16px 32px rgba(0, 0, 0, 0.20)',
};
export const tokens = {
    breakpoint,
    mediaQuery,
    rem,
    unit,
    font,
    fontSize,
    fontWeight,
    lineHeight,
    containerPadding,
    maxWidth,
    borderRadius,
    borderWidth,
    transition,
    zIndex,
    shadow,
};

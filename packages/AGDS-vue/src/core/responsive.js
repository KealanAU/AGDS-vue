import { tokens } from './tokens';
export const breakpointNames = Object.keys(tokens.breakpoint);
/**
 * Normalises a ResponsiveProp into an array of values aligned to the
 * breakpoint scale [xs, sm, md, lg, xl, xxl].
 *
 * - Scalar value  → `[mappedValue]`
 * - Array         → each entry mapped (null entries kept as null)
 * - Named object  → keys resolved in breakpoint order; missing keys → null
 *
 * Returns `undefined` when the value itself is null/undefined.
 */
export function mapResponsiveProp(value, valueMapper = (t) => t) {
    if (!isNonNullable(value))
        return undefined;
    if (Array.isArray(value)) {
        return value.map((t) => isNonNullable(t) ? valueMapper(t) : null);
    }
    if (typeof value === 'object') {
        const resValue = value;
        return breakpointNames.map((key) => {
            const token = key in resValue ? resValue[key] : undefined;
            return isNonNullable(token) ? valueMapper(token) : null;
        });
    }
    return [valueMapper(value)];
}
function isNonNullable(t) {
    return t !== null && t !== undefined;
}
/**
 * Generates a media query string for the given min-width breakpoint name.
 * Useful when building component-level responsive styles at runtime.
 */
export function mediaQueryMin(bp) {
    return tokens.mediaQuery.min[bp];
}

import { tokens } from './tokens'

type NamedBreakpoint = keyof typeof tokens.breakpoint

export const breakpointNames = Object.keys(
  tokens.breakpoint
) as NamedBreakpoint[]

export type ResponsiveProp<T> =
  | Partial<Record<NamedBreakpoint, T>>
  | (T | null)[] // [xs, sm, md, lg, xl, xxl]
  | T

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
export function mapResponsiveProp<T>(
  value: ResponsiveProp<T>,
  valueMapper: (t: NonNullable<T>) => unknown = (t) => t
): unknown[] | undefined {
  if (!isNonNullable(value)) return undefined

  if (Array.isArray(value)) {
    return value.map((t: T | null) =>
      isNonNullable(t) ? valueMapper(t) : null
    )
  }

  if (typeof value === 'object') {
    const resValue = value as Partial<Record<NamedBreakpoint, T>>
    return breakpointNames.map((key) => {
      const token = key in resValue ? resValue[key] : undefined
      return isNonNullable(token) ? valueMapper(token as NonNullable<T>) : null
    })
  }

  return [valueMapper(value as NonNullable<T>)]
}

function isNonNullable<T>(t: T): t is NonNullable<T> {
  return t !== null && t !== undefined
}

/**
 * Generates a media query string for the given min-width breakpoint name.
 * Useful when building component-level responsive styles at runtime.
 */
export function mediaQueryMin(bp: NamedBreakpoint): string {
  return tokens.mediaQuery.min[bp]
}

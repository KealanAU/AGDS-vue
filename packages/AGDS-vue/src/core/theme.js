/** Maps each Theme key to its CSS custom property name on :root */
export const themeVars = {
    lightForegroundText: '--agds-theme-light-foreground-text',
    lightForegroundAction: '--agds-theme-light-foreground-action',
    lightForegroundFocus: '--agds-theme-light-foreground-focus',
    lightForegroundMuted: '--agds-theme-light-foreground-muted',
    lightBackgroundBody: '--agds-theme-light-background-body',
    lightBackgroundShade: '--agds-theme-light-background-shade',
    lightBackgroundBodyAlt: '--agds-theme-light-background-body-alt',
    lightBackgroundShadeAlt: '--agds-theme-light-background-shade-alt',
    lightBorder: '--agds-theme-light-border',
    lightBorderMuted: '--agds-theme-light-border-muted',
    lightSelected: '--agds-theme-light-selected',
    lightSelectedMuted: '--agds-theme-light-selected-muted',
    lightAccent: '--agds-theme-light-accent',
    lightOverlay: '--agds-theme-light-overlay',
    lightOverlayMuted: '--agds-theme-light-overlay-muted',
    lightSystemError: '--agds-theme-light-system-error',
    lightSystemErrorMuted: '--agds-theme-light-system-error-muted',
    lightSystemSuccess: '--agds-theme-light-system-success',
    lightSystemSuccessMuted: '--agds-theme-light-system-success-muted',
    lightSystemWarning: '--agds-theme-light-system-warning',
    lightSystemWarningMuted: '--agds-theme-light-system-warning-muted',
    lightSystemInfo: '--agds-theme-light-system-info',
    lightSystemInfoMuted: '--agds-theme-light-system-info-muted',
    darkForegroundText: '--agds-theme-dark-foreground-text',
    darkForegroundAction: '--agds-theme-dark-foreground-action',
    darkForegroundFocus: '--agds-theme-dark-foreground-focus',
    darkForegroundMuted: '--agds-theme-dark-foreground-muted',
    darkBackgroundBody: '--agds-theme-dark-background-body',
    darkBackgroundShade: '--agds-theme-dark-background-shade',
    darkBackgroundBodyAlt: '--agds-theme-dark-background-body-alt',
    darkBackgroundShadeAlt: '--agds-theme-dark-background-shade-alt',
    darkBorder: '--agds-theme-dark-border',
    darkBorderMuted: '--agds-theme-dark-border-muted',
    darkSelected: '--agds-theme-dark-selected',
    darkSelectedMuted: '--agds-theme-dark-selected-muted',
    darkAccent: '--agds-theme-dark-accent',
    darkOverlay: '--agds-theme-dark-overlay',
    darkOverlayMuted: '--agds-theme-dark-overlay-muted',
    darkSystemError: '--agds-theme-dark-system-error',
    darkSystemErrorMuted: '--agds-theme-dark-system-error-muted',
    darkSystemSuccess: '--agds-theme-dark-system-success',
    darkSystemSuccessMuted: '--agds-theme-dark-system-success-muted',
    darkSystemWarning: '--agds-theme-dark-system-warning',
    darkSystemWarningMuted: '--agds-theme-dark-system-warning-muted',
    darkSystemInfo: '--agds-theme-dark-system-info',
    darkSystemInfoMuted: '--agds-theme-dark-system-info-muted',
};
/** Merges a base theme with an optional partial override. */
export function mergeTheme(base, override) {
    if (!override)
        return base;
    return { ...base, ...override };
}
/** Converts a Theme to a flat CSS custom property map suitable for :root injection. */
export function themeToVars(theme) {
    return Object.fromEntries(Object.keys(themeVars).map((key) => [
        themeVars[key],
        theme[key],
    ]));
}

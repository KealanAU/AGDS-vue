// ── Icon path constants (HeroIcons 2.x, 24 × 24) ────────────────────────────

const ICON = {
  // Filled (fill="currentColor", fill-rule="evenodd", clip-rule="evenodd")
  infoFilled:
    'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
  successFilled:
    'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
  warningFilled:
    'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
  alertFilled:
    'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',

  // Outline (fill="none", stroke="currentColor", stroke-width="1.5", round caps/joins)
  infoOutline:
    'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
  successOutline:
    'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  warningOutline:
    'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z',
  alertCircleOutline:
    'M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z',
  helpOutline:
    'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z',
  noSymbol:
    'M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636',
  arrowPath:
    'M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.990',
  pauseCircle:
    'M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  clock:
    'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
} as const

// ── Tone config types ────────────────────────────────────────────────────────

export type SectionAlertIconVariant = 'filled' | 'outline'

export type ToneConfig = {
  iconPath: string
  iconVariant: SectionAlertIconVariant
  iconLabel: string
  bg: string
  borderColor: string
  iconColor: string
  enclosedBorder: boolean
}

// ── Token aliases ────────────────────────────────────────────────────────────

const BG = {
  body:    'var(--agds-color-bg)',
  info:    'var(--agds-color-info-muted)',
  success: 'var(--agds-color-success-muted)',
  warning: 'var(--agds-color-warning-muted)',
  error:   'var(--agds-color-error-muted)',
}

const BORDER = {
  neutral: 'var(--agds-color-border)',
  info:    'var(--agds-color-info)',
  success: 'var(--agds-color-success)',
  warning: 'var(--agds-color-warning)',
  error:   'var(--agds-color-error)',
}

const ICON_COLOR = {
  muted:   'var(--agds-color-text-muted)',
  info:    'var(--agds-color-info)',
  success: 'var(--agds-color-success)',
  warning: 'var(--agds-color-warning)',
  error:   'var(--agds-color-error)',
}

// ── Tone map ─────────────────────────────────────────────────────────────────

export const sectionAlertToneMap = {
  cannotStartLow: {
    iconPath: ICON.noSymbol,           iconVariant: 'outline',
    iconLabel: 'cannot start',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  errorHigh: {
    iconPath: ICON.alertFilled,        iconVariant: 'filled',
    iconLabel: 'error',
    bg: BG.error,                      borderColor: BORDER.error,
    iconColor: ICON_COLOR.error,       enclosedBorder: false,
  },
  errorLow: {
    iconPath: ICON.alertCircleOutline, iconVariant: 'outline',
    iconLabel: 'error',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  errorMedium: {
    iconPath: ICON.warningOutline,     iconVariant: 'outline',
    iconLabel: 'error',
    bg: BG.body,                       borderColor: BORDER.error,
    iconColor: ICON_COLOR.error,       enclosedBorder: true,
  },
  infoHigh: {
    iconPath: ICON.infoFilled,         iconVariant: 'filled',
    iconLabel: 'information',
    bg: BG.info,                       borderColor: BORDER.info,
    iconColor: ICON_COLOR.info,        enclosedBorder: false,
  },
  infoLow: {
    iconPath: ICON.infoOutline,        iconVariant: 'outline',
    iconLabel: 'information',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  infoMedium: {
    iconPath: ICON.infoOutline,        iconVariant: 'outline',
    iconLabel: 'information',
    bg: BG.body,                       borderColor: BORDER.info,
    iconColor: ICON_COLOR.info,        enclosedBorder: true,
  },
  inProgressLow: {
    iconPath: ICON.arrowPath,          iconVariant: 'outline',
    iconLabel: 'in progress',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  notStartedLow: {
    iconPath: ICON.clock,              iconVariant: 'outline',
    iconLabel: 'not started',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  pausedLow: {
    iconPath: ICON.pauseCircle,        iconVariant: 'outline',
    iconLabel: 'paused',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  successHigh: {
    iconPath: ICON.successFilled,      iconVariant: 'filled',
    iconLabel: 'success',
    bg: BG.success,                    borderColor: BORDER.success,
    iconColor: ICON_COLOR.success,     enclosedBorder: false,
  },
  successLow: {
    iconPath: ICON.successOutline,     iconVariant: 'outline',
    iconLabel: 'success',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  successMedium: {
    iconPath: ICON.successOutline,     iconVariant: 'outline',
    iconLabel: 'success',
    bg: BG.body,                       borderColor: BORDER.success,
    iconColor: ICON_COLOR.success,     enclosedBorder: true,
  },
  unknownLow: {
    iconPath: ICON.helpOutline,        iconVariant: 'outline',
    iconLabel: 'unknown',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  warningHigh: {
    iconPath: ICON.warningFilled,      iconVariant: 'filled',
    iconLabel: 'warning',
    bg: BG.warning,                    borderColor: BORDER.warning,
    iconColor: ICON_COLOR.warning,     enclosedBorder: false,
  },
  warningLow: {
    iconPath: ICON.alertCircleOutline, iconVariant: 'outline',
    iconLabel: 'warning',
    bg: BG.body,                       borderColor: BORDER.neutral,
    iconColor: ICON_COLOR.muted,       enclosedBorder: true,
  },
  warningMedium: {
    iconPath: ICON.warningOutline,     iconVariant: 'outline',
    iconLabel: 'warning',
    bg: BG.body,                       borderColor: BORDER.warning,
    iconColor: ICON_COLOR.warning,     enclosedBorder: true,
  },
} as const satisfies Record<string, ToneConfig>

export type SectionAlertTones = keyof typeof sectionAlertToneMap

// ── Legacy tone aliases ──────────────────────────────────────────────────────

export const sectionAlertLegacyToneMap = {
  error:   'errorHigh',
  success: 'successHigh',
  warning: 'warningHigh',
  info:    'infoHigh',
} as const satisfies Record<string, SectionAlertTones>

type SectionAlertLegacyTone = keyof typeof sectionAlertLegacyToneMap

export type SectionAlertTone = SectionAlertTones | SectionAlertLegacyTone

export function getTone(tone: SectionAlertTone): SectionAlertTones {
  if (tone in sectionAlertLegacyToneMap) {
    if (import.meta.env.DEV) {
      const mapped = sectionAlertLegacyToneMap[tone as SectionAlertLegacyTone]
      console.warn(`[AgDSSectionAlert] tone "${tone}" is deprecated. Use "${mapped}" instead.`)
    }
    return sectionAlertLegacyToneMap[tone as SectionAlertLegacyTone]
  }
  return tone as SectionAlertTones
}

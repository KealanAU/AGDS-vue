/**
 * Returns a function that scrolls to and focuses a field by its id.
 *
 * Accepts either a plain id string or a native anchor click event
 * (in which case the hash from href is used as the target id).
 *
 * Usage:
 *   const scrollToField = useScrollToField()
 *   scrollToField('my-field-id')
 *   // or on an anchor click:
 *   <a href="#my-field-id" @click="scrollToField">Skip to field</a>
 */
export function useScrollToField() {
  return function scrollToField(eventOrId: MouseEvent | string): void {
    const targetId = resolveTargetId(eventOrId)
    if (!targetId) return

    const targetEl =
      document.getElementById(targetId) ??
      (document.getElementsByName(targetId)[0] as HTMLElement | undefined)
    if (!targetEl) return

    scrollAndFocus(targetId, targetEl)

    if (typeof eventOrId !== 'string') {
      eventOrId.preventDefault()
    }
  }
}

function resolveTargetId(eventOrId: MouseEvent | string): string | undefined {
  if (typeof eventOrId === 'string') return eventOrId

  const target = eventOrId.target
  if (!(target instanceof HTMLAnchorElement)) return undefined
  // Strip the leading '#' from the href hash
  return target.hash ? target.hash.substring(1) : undefined
}

function scrollAndFocus(targetId: string, targetEl: HTMLElement): void {
  // If the target is a group container (e.g. a ControlGroup div), focus the
  // first focusable input inside it rather than the container itself.
  if (targetEl.tagName.toLowerCase() === 'div') {
    const firstInput = targetEl.querySelector<HTMLElement>('input')
    firstInput?.focus()
  } else {
    targetEl.focus()
  }

  // Scroll the label's parent container into view if possible, otherwise
  // fall back to scrolling the target element itself.
  const labelEl = document.querySelector<HTMLElement>(`label[for="${targetId}"]`)
  const scrollTarget = labelEl?.parentElement ?? targetEl
  scrollTarget.scrollIntoView({ block: 'nearest' })
}

/**
 * A single rendered element in the pagination control. Discriminated on `type`.
 *
 * - `'direction'` — Previous/next arrow. `direction` is `'left'` (previous) or `'right'` (next);
 *   `pageNumber` is the target page.
 * - `'page'` — A numbered page button or link. `isActive` is `true` for the currently selected page.
 * - `'separator'` — A `…` ellipsis representing skipped pages. `pageNumber` is always `0`.
 */
export type PaginationItem =
  | { type: 'direction'; direction: 'left' | 'right'; pageNumber: number }
  | { type: 'page'; pageNumber: number; isActive: boolean }
  | { type: 'separator'; pageNumber: 0 }

export interface UsePaginationOptions {
  windowLimit: number
  currentPage: number
  totalPages: number
}

export function usePagination({
  currentPage,
  totalPages,
  windowLimit,
}: UsePaginationOptions): PaginationItem[] {
  const elements: PaginationItem[] = []

  let minPage = 1
  let maxPage = totalPages

  if (windowLimit < totalPages) {
    const rightLimit = Math.floor(windowLimit / 2)
    const leftLimit = rightLimit + (windowLimit % 2) - 1
    minPage = currentPage - leftLimit
    maxPage = currentPage + rightLimit

    if (minPage < 1) {
      maxPage = windowLimit
      minPage = 1
    }

    if (maxPage > totalPages) {
      minPage = totalPages - windowLimit + 1
      maxPage = totalPages
    }
  }

  if (currentPage > 1) {
    elements.push({ type: 'direction', direction: 'left', pageNumber: currentPage - 1 })
  }

  if (minPage > 1) {
    elements.push({ type: 'page', pageNumber: 1, isActive: currentPage === 1 })
    if (minPage > 3) {
      elements.push({ type: 'separator', pageNumber: 0 })
    } else if (minPage !== 2) {
      elements.push({ type: 'page', pageNumber: 2, isActive: currentPage === 2 })
    }
  }

  for (let page = minPage; page <= maxPage; page++) {
    elements.push({ type: 'page', pageNumber: page, isActive: page === currentPage })
  }

  if (maxPage + 1 < totalPages) {
    if (maxPage + 1 !== totalPages - 1) {
      elements.push({ type: 'separator', pageNumber: 0 })
    } else {
      elements.push({
        type: 'page',
        pageNumber: totalPages - 1,
        isActive: currentPage === totalPages - 1,
      })
    }
  }

  if (maxPage < totalPages) {
    elements.push({ type: 'page', pageNumber: totalPages, isActive: currentPage === totalPages })
  }

  if (currentPage < totalPages) {
    elements.push({ type: 'direction', direction: 'right', pageNumber: currentPage + 1 })
  }

  return elements
}

export function separatorAriaLabel(
  items: PaginationItem[],
  index: number,
  isLinks: boolean,
): string {
  const prevItem = items[index - 1]
  const nextItem = items[index + 1]
  const missingLeft = (prevItem?.pageNumber ?? 0) + 1
  const missingRight = (nextItem?.pageNumber ?? 0) - 1
  const nav = isLinks ? 'links' : 'buttons'
  return `… Pages ${missingLeft} to ${missingRight} are hidden. Use the Previous and Next ${nav} to navigate`
}

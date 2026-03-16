export function getInitialsFromName(name: string): string {
  const matches = Array.from(name.matchAll(/(\p{L})\p{L}+/gu))
  if (!matches.length) return '?'
  const firstInitial = matches.shift()?.[1] || ''
  const lastInitial = matches.pop()?.[1] || ''
  return (firstInitial + lastInitial).toUpperCase()
}

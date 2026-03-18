import { AgDSFeatureLinkList as i } from './CQR9mWth.js'
import { e as o, o as l, f as c, u as e, l as u } from './Czyq2uHh.js'
const f = o({
    __name: 'FeatureLinkListDemo',
    props: { variant: {} },
    setup(a) {
      const s = a,
        n = [
          { href: '#', label: 'Apply for a grant' },
          { href: '#', label: 'Check your eligibility' },
          { href: '#', label: 'Find a service near you' },
        ],
        t = [
          {
            href: '#',
            label: 'Apply for a grant',
            secondaryText:
              'For individuals and small businesses affected by recent natural disasters',
          },
          {
            href: '#',
            label: 'Check your eligibility',
            secondaryText: 'Answer a few questions to see what support is available to you',
          },
        ],
        r = u(() => (s.variant === 'secondary' ? t : n))
      return (p, d) => (l(), c(e(i), { links: e(r) }, null, 8, ['links']))
    },
  }),
  y = Object.assign(f, { __name: 'FeatureLinkListDemo' })
export { y as default }

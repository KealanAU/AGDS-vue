import { AgDSBreadcrumbs as c } from './CQR9mWth.js'
import { e as i, o as n, f as t, u as e, l as m } from './Czyq2uHh.js'
const p = i({
    __name: 'BreadcrumbsDemo',
    props: { variant: {} },
    setup(s) {
      const r = s,
        a = [
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
          { label: 'Apply for a permit' },
        ],
        l = [
          { href: '/', label: 'Home' },
          { href: '/services', label: 'Services' },
          { href: '/services/permits', label: 'Permits' },
          { href: '/services/permits/building', label: 'Building' },
          { label: 'Apply for a permit' },
        ],
        o = m(() => (r.variant === 'collapsed' ? l : a))
      return (b, f) => (n(), t(e(c), { links: e(o) }, null, 8, ['links']))
    },
  }),
  v = Object.assign(p, { __name: 'BreadcrumbsDemo' })
export { v as default }

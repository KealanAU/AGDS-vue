import { AgDSPagination as _, AgDSPaginationButtons as m } from './CQR9mWth.js'
import { e as P, o as e, c as f, u as a, f as c, l as n, _ as d } from './Czyq2uHh.js'
const k = { class: 'pagination-demo' },
  D = P({
    __name: 'PaginationDemo',
    props: { currentPage: {}, totalPages: {}, variant: {} },
    setup(g) {
      const t = g,
        o = n(() => t.currentPage ?? 3),
        s = n(() => t.totalPages ?? 10),
        i = n(() => t.variant ?? 'link')
      function p(r) {
        return `?page=${r}`
      }
      return (r, v) => {
        const u = _,
          l = m
        return (
          e(),
          f('div', k, [
            a(i) === 'link'
              ? (e(),
                c(
                  u,
                  { key: 0, 'current-page': a(o), 'total-pages': a(s), 'generate-href': p },
                  null,
                  8,
                  ['current-page', 'total-pages'],
                ))
              : (e(),
                c(l, { key: 1, 'current-page': a(o), 'total-pages': a(s) }, null, 8, [
                  'current-page',
                  'total-pages',
                ])),
          ])
        )
      }
    },
  }),
  S = Object.assign(d(D, [['__scopeId', 'data-v-403aacc2']]), { __name: 'PaginationDemo' })
export { S as default }

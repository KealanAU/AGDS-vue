import {
  Q as Pe,
  J as qe,
  F as ae,
  s as pe,
  a9 as Jt,
  am as Di,
  W as Ee,
  S as Kl,
  R as Zl,
  an as ot,
  ao as Bi,
  ap as Yl,
  p as ge,
  L as Dt,
  i as Xt,
  q as Tt,
  u as v,
  l as y,
  aq as We,
  k as C,
  I as we,
  U as he,
  ar as $i,
  as as Ii,
  at as Xl,
  au as Mi,
  av as Oi,
  V as Li,
  P as Te,
  aw as Ql,
  e as x,
  m as st,
  C as Fi,
  ax as te,
  K as qi,
  o as c,
  f as $,
  w,
  E as A,
  b as E,
  j as O,
  ay as gt,
  a0 as xe,
  az as Ca,
  aA as ut,
  aB as yt,
  aC as Ei,
  c as h,
  r as fe,
  aD as Ce,
  aE as Pi,
  aF as Ti,
  aG as Jl,
  aH as Lt,
  aI as Ri,
  ak as ke,
  d as de,
  t as M,
  O as Vi,
  aJ as jt,
  aK as aa,
  aL as Xe,
  aM as oa,
  a as p,
  n as I,
  aN as Da,
  aO as Ni,
  aP as Rt,
  h as el,
  v as Wi,
  aQ as Hi,
  aR as en,
  x as tn,
  aS as ji,
} from './Czyq2uHh.js'
function tl(e) {
  return typeof e == 'string' ? `'${e}'` : new Gi().serialize(e)
}
const Gi = (function () {
  class e {
    #e = new Map()
    compare(o, a) {
      const l = typeof o,
        n = typeof a
      return l === 'string' && n === 'string'
        ? o.localeCompare(a)
        : l === 'number' && n === 'number'
          ? o - a
          : String.prototype.localeCompare.call(this.serialize(o, !0), this.serialize(a, !0))
    }
    serialize(o, a) {
      if (o === null) return 'null'
      switch (typeof o) {
        case 'string':
          return a ? o : `'${o}'`
        case 'bigint':
          return `${o}n`
        case 'object':
          return this.$object(o)
        case 'function':
          return this.$function(o)
      }
      return String(o)
    }
    serializeObject(o) {
      const a = Object.prototype.toString.call(o)
      if (a !== '[object Object]')
        return this.serializeBuiltInType(a.length < 10 ? `unknown:${a}` : a.slice(8, -1), o)
      const l = o.constructor,
        n = l === Object || l === void 0 ? '' : l.name
      if (n !== '' && globalThis[n] === l) return this.serializeBuiltInType(n, o)
      if (typeof o.toJSON == 'function') {
        const i = o.toJSON()
        return n + (i !== null && typeof i == 'object' ? this.$object(i) : `(${this.serialize(i)})`)
      }
      return this.serializeObjectEntries(n, Object.entries(o))
    }
    serializeBuiltInType(o, a) {
      const l = this['$' + o]
      if (l) return l.call(this, a)
      if (typeof a?.entries == 'function') return this.serializeObjectEntries(o, a.entries())
      throw new Error(`Cannot serialize ${o}`)
    }
    serializeObjectEntries(o, a) {
      const l = Array.from(a).sort((i, s) => this.compare(i[0], s[0]))
      let n = `${o}{`
      for (let i = 0; i < l.length; i++) {
        const [s, r] = l[i]
        ;((n += `${this.serialize(s, !0)}:${this.serialize(r)}`), i < l.length - 1 && (n += ','))
      }
      return n + '}'
    }
    $object(o) {
      let a = this.#e.get(o)
      return (
        a === void 0 &&
          (this.#e.set(o, `#${this.#e.size}`), (a = this.serializeObject(o)), this.#e.set(o, a)),
        a
      )
    }
    $function(o) {
      const a = Function.prototype.toString.call(o)
      return a.slice(-15) === '[native code] }'
        ? `${o.name || ''}()[native]`
        : `${o.name}(${o.length})${a.replace(/\s*\n\s*/g, '')}`
    }
    $Array(o) {
      let a = '['
      for (let l = 0; l < o.length; l++)
        ((a += this.serialize(o[l])), l < o.length - 1 && (a += ','))
      return a + ']'
    }
    $Date(o) {
      try {
        return `Date(${o.toISOString()})`
      } catch {
        return 'Date(null)'
      }
    }
    $ArrayBuffer(o) {
      return `ArrayBuffer[${new Uint8Array(o).join(',')}]`
    }
    $Set(o) {
      return `Set${this.$Array(Array.from(o).sort((a, l) => this.compare(a, l)))}`
    }
    $Map(o) {
      return this.serializeObjectEntries('Map', o.entries())
    }
  }
  for (const t of ['Error', 'RegExp', 'URL'])
    e.prototype['$' + t] = function (o) {
      return `${t}(${o})`
    }
  for (const t of [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
  ])
    e.prototype['$' + t] = function (o) {
      return `${t}[${o.join(',')}]`
    }
  for (const t of ['BigInt64Array', 'BigUint64Array'])
    e.prototype['$' + t] = function (o) {
      return `${t}[${o.join('n,')}${o.length > 0 ? 'n' : ''}]`
    }
  return e
})()
function At(e, t) {
  return e === t || tl(e) === tl(t)
}
function zi(e, t, o) {
  const a = e.findIndex((s) => At(s, t)),
    l = e.findIndex((s) => At(s, o))
  if (a === -1 || l === -1) return []
  const [n, i] = [a, l].sort((s, r) => s - r)
  return e.slice(n, i + 1)
}
function Re(e, t) {
  const o = typeof e == 'string' && !t ? `${e}Context` : t,
    a = Symbol(o)
  return [
    (i) => {
      const s = Pe(a, i)
      if (s || s === null) return s
      throw new Error(
        `Injection \`${a.toString()}\` not found. Component must be used within ${Array.isArray(e) ? `one of the following components: ${e.join(', ')}` : `\`${e}\``}`,
      )
    },
    (i) => (qe(a, i), i),
  ]
}
function Ye() {
  let e = document.activeElement
  if (e == null) return null
  for (; e != null && e.shadowRoot != null && e.shadowRoot.activeElement != null; )
    e = e.shadowRoot.activeElement
  return e
}
function So(e, t, o) {
  const a = o.originalEvent.target,
    l = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: o })
  ;(t && a.addEventListener(e, t, { once: !0 }), a.dispatchEvent(l))
}
function an(e) {
  return e == null
}
function Ui(e, t) {
  return an(e) ? !1 : Array.isArray(e) ? e.some((o) => At(o, t)) : At(e, t)
}
function Ao(e) {
  return e ? e.flatMap((t) => (t.type === ae ? Ao(t.children) : [t])) : []
}
const Ki = ['INPUT', 'TEXTAREA']
function Zi(e, t, o, a = {}) {
  if (!t || (a.enableIgnoredElement && Ki.includes(t.nodeName))) return null
  const {
      arrowKeyOptions: l = 'both',
      attributeName: n = '[data-reka-collection-item]',
      itemsArray: i = [],
      loop: s = !0,
      dir: r = 'ltr',
      preventScroll: d = !0,
      focus: u = !1,
    } = a,
    [f, g, b, m, _, k] = [
      e.key === 'ArrowRight',
      e.key === 'ArrowLeft',
      e.key === 'ArrowUp',
      e.key === 'ArrowDown',
      e.key === 'Home',
      e.key === 'End',
    ],
    S = b || m,
    D = f || g
  if (!_ && !k && ((!S && !D) || (l === 'vertical' && D) || (l === 'horizontal' && S))) return null
  const B = o ? Array.from(o.querySelectorAll(n)) : i
  if (!B.length) return null
  d && e.preventDefault()
  let L = null
  return (
    D || S
      ? (L = on(B, t, { goForward: S ? m : r === 'ltr' ? f : g, loop: s }))
      : _
        ? (L = B.at(0) || null)
        : k && (L = B.at(-1) || null),
    u && L?.focus(),
    L
  )
}
function on(e, t, o, a = e.includes(t) ? e.length : e.length + 1) {
  if (--a === 0) return null
  const l = e.indexOf(t)
  let n
  if (
    (l === -1 ? (n = o.goForward ? 0 : e.length - 1) : (n = o.goForward ? l + 1 : l - 1),
    !o.loop && (n < 0 || n >= e.length))
  )
    return null
  const i = (n + e.length) % e.length,
    s = e[i]
  return s
    ? s.hasAttribute('disabled') && s.getAttribute('disabled') !== 'false'
      ? on(e, s, o, a)
      : s
    : null
}
const [Co] = Re('ConfigProvider')
function Yi(e, t) {
  var o
  const a = Dt()
  return (
    ot(
      () => {
        a.value = e()
      },
      { ...t, flush: (o = t?.flush) !== null && o !== void 0 ? o : 'sync' },
    ),
    Bi(a)
  )
}
function Do(e, t) {
  return Kl() ? (Zl(e, t), !0) : !1
}
function va() {
  const e = new Set(),
    t = (n) => {
      e.delete(n)
    }
  return {
    on: (n) => {
      e.add(n)
      const i = () => t(n)
      return (Do(i), { off: i })
    },
    off: t,
    trigger: (...n) => Promise.all(Array.from(e).map((i) => i(...n))),
    clear: () => {
      e.clear()
    },
  }
}
function Xi(e) {
  let t = !1,
    o
  const a = Yl(!0)
  return (...l) => (t || ((o = a.run(() => e(...l))), (t = !0)), o)
}
const ct = typeof window < 'u' && typeof document < 'u'
typeof WorkerGlobalScope < 'u' && globalThis instanceof WorkerGlobalScope
const Qi = (e) => typeof e < 'u',
  Ji = Object.prototype.toString,
  es = (e) => Ji.call(e) === '[object Object]',
  al = ts()
function ts() {
  var e, t, o
  return (
    ct &&
    !!(
      !((e = window) === null || e === void 0 || (e = e.navigator) === null || e === void 0) &&
      e.userAgent
    ) &&
    (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) ||
      (((t = window) === null || t === void 0 || (t = t.navigator) === null || t === void 0
        ? void 0
        : t.maxTouchPoints) > 2 &&
        /iPad|Macintosh/.test(
          (o = window) === null || o === void 0 ? void 0 : o.navigator.userAgent,
        )))
  )
}
function Xa(e) {
  return Array.isArray(e) ? e : [e]
}
function as(e) {
  return ge()
}
function os(e) {
  if (!ct) return e
  let t = 0,
    o,
    a
  const l = () => {
    ;((t -= 1), a && t <= 0 && (a.stop(), (o = void 0), (a = void 0)))
  }
  return (...n) => ((t += 1), a || ((a = Yl(!0)), (o = a.run(() => e(...n)))), Do(l), o)
}
function ls(e) {
  return Xt(e)
    ? Tt(
        new Proxy(
          {},
          {
            get(t, o, a) {
              return v(Reflect.get(e.value, o, a))
            },
            set(t, o, a) {
              return (Xt(e.value[o]) && !Xt(a) ? (e.value[o].value = a) : (e.value[o] = a), !0)
            },
            deleteProperty(t, o) {
              return Reflect.deleteProperty(e.value, o)
            },
            has(t, o) {
              return Reflect.has(e.value, o)
            },
            ownKeys() {
              return Object.keys(e.value)
            },
            getOwnPropertyDescriptor() {
              return { enumerable: !0, configurable: !0 }
            },
          },
        ),
      )
    : Tt(e)
}
function ns(e) {
  return ls(y(e))
}
function is(e, ...t) {
  const o = t.flat(),
    a = o[0]
  return ns(() =>
    Object.fromEntries(
      typeof a == 'function'
        ? Object.entries(We(e)).filter(([l, n]) => !a(Ee(n), l))
        : Object.entries(We(e)).filter((l) => !o.includes(l[0])),
    ),
  )
}
function ln(e, t = 1e4) {
  return Di((o, a) => {
    let l = Ee(e),
      n
    const i = () =>
      setTimeout(() => {
        ;((l = Ee(e)), a())
      }, Ee(t))
    return (
      Do(() => {
        clearTimeout(n)
      }),
      {
        get() {
          return (o(), l)
        },
        set(s) {
          ;((l = s), a(), clearTimeout(n), (n = i()))
        },
      }
    )
  })
}
function ss(e, t) {
  as() && Jt(e, t)
}
function rs(e, t, o) {
  return pe(e, t, { ...o, immediate: !0 })
}
const Bo = ct ? window : void 0
function Bt(e) {
  var t
  const o = Ee(e)
  return (t = o?.$el) !== null && t !== void 0 ? t : o
}
function $o(...e) {
  const t = (a, l, n, i) => (a.addEventListener(l, n, i), () => a.removeEventListener(l, n, i)),
    o = y(() => {
      const a = Xa(Ee(e[0])).filter((l) => l != null)
      return a.every((l) => typeof l != 'string') ? a : void 0
    })
  return rs(
    () => {
      var a, l
      return [
        (a = (l = o.value) === null || l === void 0 ? void 0 : l.map((n) => Bt(n))) !== null &&
        a !== void 0
          ? a
          : [Bo].filter((n) => n != null),
        Xa(Ee(o.value ? e[1] : e[0])),
        Xa(v(o.value ? e[2] : e[1])),
        Ee(o.value ? e[3] : e[2]),
      ]
    },
    ([a, l, n, i], s, r) => {
      if (!a?.length || !l?.length || !n?.length) return
      const d = es(i) ? { ...i } : i,
        u = a.flatMap((f) => l.flatMap((g) => n.map((b) => t(f, g, b, d))))
      r(() => {
        u.forEach((f) => f())
      })
    },
    { flush: 'post' },
  )
}
function ds() {
  const e = Dt(!1),
    t = ge()
  return (
    t &&
      we(() => {
        e.value = !0
      }, t),
    e
  )
}
function us(e) {
  return typeof e == 'function'
    ? e
    : typeof e == 'string'
      ? (t) => t.key === e
      : Array.isArray(e)
        ? (t) => e.includes(t.key)
        : () => !0
}
function cs(...e) {
  let t,
    o,
    a = {}
  e.length === 3
    ? ((t = e[0]), (o = e[1]), (a = e[2]))
    : e.length === 2
      ? typeof e[1] == 'object'
        ? ((t = !0), (o = e[0]), (a = e[1]))
        : ((t = e[0]), (o = e[1]))
      : ((t = !0), (o = e[0]))
  const { target: l = Bo, eventName: n = 'keydown', passive: i = !1, dedupe: s = !1 } = a,
    r = us(t)
  return $o(
    l,
    n,
    (u) => {
      ;(u.repeat && Ee(s)) || (r(u) && o(u))
    },
    i,
  )
}
function fs(e) {
  return JSON.parse(JSON.stringify(e))
}
function Qe(e, t, o, a = {}) {
  var l, n
  const {
      clone: i = !1,
      passive: s = !1,
      eventName: r,
      deep: d = !1,
      defaultValue: u,
      shouldEmit: f,
    } = a,
    g = ge(),
    b =
      o ||
      g?.emit ||
      (g == null || (l = g.$emit) === null || l === void 0 ? void 0 : l.bind(g)) ||
      (g == null || (n = g.proxy) === null || n === void 0 || (n = n.$emit) === null || n === void 0
        ? void 0
        : n.bind(g?.proxy))
  let m = r
  ;(t || (t = 'modelValue'), (m = m || `update:${t.toString()}`))
  const _ = (D) => (i ? (typeof i == 'function' ? i(D) : fs(D)) : D),
    k = () => (Qi(e[t]) ? _(e[t]) : u),
    S = (D) => {
      f ? f(D) && b(m, D) : b(m, D)
    }
  if (s) {
    const D = C(k())
    let B = !1
    return (
      pe(
        () => e[t],
        (L) => {
          B || ((B = !0), (D.value = _(L)), he(() => (B = !1)))
        },
      ),
      pe(
        D,
        (L) => {
          !B && (L !== e[t] || d) && S(L)
        },
        { deep: d },
      ),
      D
    )
  } else
    return y({
      get() {
        return k()
      },
      set(D) {
        S(D)
      },
    })
}
const ps = os(() => {
  const e = C(new Map()),
    t = C(),
    o = y(() => {
      for (const i of e.value.values()) if (i) return !0
      return !1
    }),
    a = Co({ scrollBody: C(!0) })
  let l = null
  const n = () => {
    ;((document.body.style.paddingRight = ''),
      (document.body.style.marginRight = ''),
      (document.body.style.pointerEvents = ''),
      document.documentElement.style.removeProperty('--scrollbar-width'),
      (document.body.style.overflow = t.value ?? ''),
      al && l?.(),
      (t.value = void 0))
  }
  return (
    pe(
      o,
      (i, s) => {
        if (!ct) return
        if (!i) {
          s && n()
          return
        }
        t.value === void 0 && (t.value = document.body.style.overflow)
        const r = window.innerWidth - document.documentElement.clientWidth,
          d = { padding: r, margin: 0 },
          u = a.scrollBody?.value
            ? typeof a.scrollBody.value == 'object'
              ? $i(
                  {
                    padding: a.scrollBody.value.padding === !0 ? r : a.scrollBody.value.padding,
                    margin: a.scrollBody.value.margin === !0 ? r : a.scrollBody.value.margin,
                  },
                  d,
                )
              : d
            : { padding: 0, margin: 0 }
        ;(r > 0 &&
          ((document.body.style.paddingRight =
            typeof u.padding == 'number' ? `${u.padding}px` : String(u.padding)),
          (document.body.style.marginRight =
            typeof u.margin == 'number' ? `${u.margin}px` : String(u.margin)),
          document.documentElement.style.setProperty('--scrollbar-width', `${r}px`),
          (document.body.style.overflow = 'hidden')),
          al && (l = $o(document, 'touchmove', (f) => gs(f), { passive: !1 })),
          he(() => {
            ;((document.body.style.pointerEvents = 'none'),
              (document.body.style.overflow = 'hidden'))
          }))
      },
      { immediate: !0, flush: 'sync' },
    ),
    e
  )
})
function Io(e) {
  const t = Math.random().toString(36).substring(2, 7),
    o = ps()
  o.value.set(t, e ?? !1)
  const a = y({ get: () => o.value.get(t) ?? !1, set: (l) => o.value.set(t, l) })
  return (
    ss(() => {
      o.value.delete(t)
    }),
    a
  )
}
function nn(e) {
  const t = window.getComputedStyle(e)
  if (
    t.overflowX === 'scroll' ||
    t.overflowY === 'scroll' ||
    (t.overflowX === 'auto' && e.clientWidth < e.scrollWidth) ||
    (t.overflowY === 'auto' && e.clientHeight < e.scrollHeight)
  )
    return !0
  {
    const o = e.parentNode
    return !(o instanceof Element) || o.tagName === 'BODY' ? !1 : nn(o)
  }
}
function gs(e) {
  const t = e || window.event,
    o = t.target
  return o instanceof Element && nn(o)
    ? !1
    : t.touches.length > 1
      ? !0
      : (t.preventDefault && t.cancelable && t.preventDefault(), !1)
}
function la(e) {
  const t = Co({ dir: C('ltr') })
  return y(() => e?.value || t.dir?.value || 'ltr')
}
function Ba(e) {
  const t = ge(),
    o = t?.type.emits,
    a = {}
  return (
    o?.length || console.warn(`No emitted event found. Please check component: ${t?.type.__name}`),
    o?.forEach((l) => {
      a[Ii(Xl(l))] = (...n) => e(l, ...n)
    }),
    a
  )
}
function vs(e) {
  const t = y(() => v(e)),
    o = y(() => new Intl.Collator('en', { usage: 'search', ...t.value }))
  return {
    startsWith: (i, s) =>
      s.length === 0
        ? !0
        : ((i = i.normalize('NFC')),
          (s = s.normalize('NFC')),
          o.value.compare(i.slice(0, s.length), s) === 0),
    endsWith: (i, s) =>
      s.length === 0
        ? !0
        : ((i = i.normalize('NFC')),
          (s = s.normalize('NFC')),
          o.value.compare(i.slice(-s.length), s) === 0),
    contains: (i, s) => {
      if (s.length === 0) return !0
      ;((i = i.normalize('NFC')), (s = s.normalize('NFC')))
      let r = 0
      const d = s.length
      for (; r + d <= i.length; r++) {
        const u = i.slice(r, r + d)
        if (o.value.compare(s, u) === 0) return !0
      }
      return !1
    },
  }
}
let Qa = 0
function sn() {
  ot((e) => {
    if (!ct) return
    const t = document.querySelectorAll('[data-reka-focus-guard]')
    ;(document.body.insertAdjacentElement('afterbegin', t[0] ?? ol()),
      document.body.insertAdjacentElement('beforeend', t[1] ?? ol()),
      Qa++,
      e(() => {
        ;(Qa === 1 &&
          document.querySelectorAll('[data-reka-focus-guard]').forEach((o) => o.remove()),
          Qa--)
      }))
  })
}
function ol() {
  const e = document.createElement('span')
  return (
    e.setAttribute('data-reka-focus-guard', ''),
    (e.tabIndex = 0),
    (e.style.outline = 'none'),
    (e.style.opacity = '0'),
    (e.style.position = 'fixed'),
    (e.style.pointerEvents = 'none'),
    e
  )
}
function ms(e) {
  return y(() => (Ee(e) ? !!Bt(e)?.closest('form') : !0))
}
function ve() {
  const e = ge(),
    t = C(),
    o = y(() => a())
  Mi(() => {
    o.value !== a() && Oi(t)
  })
  function a() {
    return t.value && '$el' in t.value && ['#text', '#comment'].includes(t.value.$el.nodeName)
      ? t.value.$el.nextElementSibling
      : Bt(t)
  }
  const l = Object.assign({}, e.exposed),
    n = {}
  for (const s in e.props)
    Object.defineProperty(n, s, { enumerable: !0, configurable: !0, get: () => e.props[s] })
  if (Object.keys(l).length > 0)
    for (const s in l)
      Object.defineProperty(n, s, { enumerable: !0, configurable: !0, get: () => l[s] })
  ;(Object.defineProperty(n, '$el', { enumerable: !0, configurable: !0, get: () => e.vnode.el }),
    (e.exposed = n))
  function i(s) {
    if (
      ((t.value = s),
      !!s &&
        (Object.defineProperty(n, '$el', {
          enumerable: !0,
          configurable: !0,
          get: () => (s instanceof Element ? s : s.$el),
        }),
        !(s instanceof Element) && !Object.prototype.hasOwnProperty.call(s, '$el')))
    ) {
      const r = s.$.exposed,
        d = Object.assign({}, n)
      for (const u in r)
        Object.defineProperty(d, u, { enumerable: !0, configurable: !0, get: () => r[u] })
      e.exposed = d
    }
  }
  return { forwardRef: i, currentRef: t, currentElement: o }
}
function Mo(e) {
  const t = ge(),
    o = Object.keys(t?.type.props ?? {}).reduce((l, n) => {
      const i = (t?.type.props[n]).default
      return (i !== void 0 && (l[n] = i), l)
    }, {}),
    a = Li(e)
  return y(() => {
    const l = {},
      n = t?.vnode.props ?? {}
    return (
      Object.keys(n).forEach((i) => {
        l[Xl(i)] = n[i]
      }),
      Object.keys({ ...o, ...l }).reduce(
        (i, s) => (a.value[s] !== void 0 && (i[s] = a.value[s]), i),
        {},
      )
    )
  })
}
function $a(e, t) {
  const o = Mo(e),
    a = t ? Ba(t) : {}
  return y(() => ({ ...o.value, ...a }))
}
var hs = function (e) {
    if (typeof document > 'u') return null
    var t = Array.isArray(e) ? e[0] : e
    return t.ownerDocument.body
  },
  Ft = new WeakMap(),
  da = new WeakMap(),
  ua = {},
  Ja = 0,
  rn = function (e) {
    return e && (e.host || rn(e.parentNode))
  },
  bs = function (e, t) {
    return t
      .map(function (o) {
        if (e.contains(o)) return o
        var a = rn(o)
        return a && e.contains(a)
          ? a
          : (console.error('aria-hidden', o, 'in not contained inside', e, '. Doing nothing'), null)
      })
      .filter(function (o) {
        return !!o
      })
  },
  ys = function (e, t, o, a) {
    var l = bs(t, Array.isArray(e) ? e : [e])
    ua[o] || (ua[o] = new WeakMap())
    var n = ua[o],
      i = [],
      s = new Set(),
      r = new Set(l),
      d = function (f) {
        !f || s.has(f) || (s.add(f), d(f.parentNode))
      }
    l.forEach(d)
    var u = function (f) {
      !f ||
        r.has(f) ||
        Array.prototype.forEach.call(f.children, function (g) {
          if (s.has(g)) u(g)
          else
            try {
              var b = g.getAttribute(a),
                m = b !== null && b !== 'false',
                _ = (Ft.get(g) || 0) + 1,
                k = (n.get(g) || 0) + 1
              ;(Ft.set(g, _),
                n.set(g, k),
                i.push(g),
                _ === 1 && m && da.set(g, !0),
                k === 1 && g.setAttribute(o, 'true'),
                m || g.setAttribute(a, 'true'))
            } catch (S) {
              console.error('aria-hidden: cannot operate on ', g, S)
            }
        })
    }
    return (
      u(t),
      s.clear(),
      Ja++,
      function () {
        ;(i.forEach(function (f) {
          var g = Ft.get(f) - 1,
            b = n.get(f) - 1
          ;(Ft.set(f, g),
            n.set(f, b),
            g || (da.has(f) || f.removeAttribute(a), da.delete(f)),
            b || f.removeAttribute(o))
        }),
          Ja--,
          Ja || ((Ft = new WeakMap()), (Ft = new WeakMap()), (da = new WeakMap()), (ua = {})))
      }
    )
  },
  _s = function (e, t, o) {
    o === void 0 && (o = 'data-aria-hidden')
    var a = Array.from(Array.isArray(e) ? e : [e]),
      l = hs(e)
    return l
      ? (a.push.apply(a, Array.from(l.querySelectorAll('[aria-live], script'))),
        ys(a, l, o, 'aria-hidden'))
      : function () {
          return null
        }
  }
function Oo(e) {
  let t
  ;(pe(
    () => Bt(e),
    (o) => {
      o ? (t = _s(o)) : t && t()
    },
  ),
    Te(() => {
      t && t()
    }))
}
function lt(e, t = 'reka') {
  let o
  return ((o = Ql?.()), t ? `${t}-${o}` : o)
}
function ks() {
  return {
    ALT: 'Alt',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    ARROW_UP: 'ArrowUp',
    BACKSPACE: 'Backspace',
    CAPS_LOCK: 'CapsLock',
    CONTROL: 'Control',
    DELETE: 'Delete',
    END: 'End',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    F1: 'F1',
    F10: 'F10',
    F11: 'F11',
    F12: 'F12',
    F2: 'F2',
    F3: 'F3',
    F4: 'F4',
    F5: 'F5',
    F6: 'F6',
    F7: 'F7',
    F8: 'F8',
    F9: 'F9',
    HOME: 'Home',
    META: 'Meta',
    PAGE_DOWN: 'PageDown',
    PAGE_UP: 'PageUp',
    SHIFT: 'Shift',
    SPACE: ' ',
    TAB: 'Tab',
    CTRL: 'Control',
    ASTERISK: '*',
    SPACE_CODE: 'Space',
  }
}
function ws(e) {
  const t = C(),
    o = y(() => t.value?.width ?? 0),
    a = y(() => t.value?.height ?? 0)
  return (
    we(() => {
      const l = Bt(e)
      if (l) {
        t.value = { width: l.offsetWidth, height: l.offsetHeight }
        const n = new ResizeObserver((i) => {
          if (!Array.isArray(i) || !i.length) return
          const s = i[0]
          let r, d
          if ('borderBoxSize' in s) {
            const u = s.borderBoxSize,
              f = Array.isArray(u) ? u[0] : u
            ;((r = f.inlineSize), (d = f.blockSize))
          } else ((r = l.offsetWidth), (d = l.offsetHeight))
          t.value = { width: r, height: d }
        })
        return (n.observe(l, { box: 'border-box' }), () => n.unobserve(l))
      } else t.value = void 0
    }),
    { width: o, height: a }
  )
}
function xs(e, t) {
  const o = C(e)
  function a(n) {
    return t[o.value][n] ?? o.value
  }
  return {
    state: o,
    dispatch: (n) => {
      o.value = a(n)
    },
  }
}
function Ss(e) {
  const t = ln('', 1e3)
  return {
    search: t,
    handleTypeaheadSearch: (l, n) => {
      t.value = t.value + l
      {
        const i = Ye(),
          s = n.map((g) => ({
            ...g,
            textValue: g.value?.textValue ?? g.ref.textContent?.trim() ?? '',
          })),
          r = s.find((g) => g.ref === i),
          d = s.map((g) => g.textValue),
          u = Cs(d, t.value, r?.textValue),
          f = s.find((g) => g.textValue === u)
        return (f && f.ref.focus(), f?.ref)
      }
    },
    resetTypeahead: () => {
      t.value = ''
    },
  }
}
function As(e, t) {
  return e.map((o, a) => e[(t + a) % e.length])
}
function Cs(e, t, o) {
  const l = t.length > 1 && Array.from(t).every((d) => d === t[0]) ? t[0] : t,
    n = o ? e.indexOf(o) : -1
  let i = As(e, Math.max(n, 0))
  l.length === 1 && (i = i.filter((d) => d !== o))
  const r = i.find((d) => d.toLowerCase().startsWith(l.toLowerCase()))
  return r !== o ? r : void 0
}
function Ds(e, t) {
  const o = C({}),
    a = C('none'),
    l = C(e),
    n = e.value ? 'mounted' : 'unmounted'
  let i
  const s = t.value?.ownerDocument.defaultView ?? Bo,
    { state: r, dispatch: d } = xs(n, {
      mounted: { UNMOUNT: 'unmounted', ANIMATION_OUT: 'unmountSuspended' },
      unmountSuspended: { MOUNT: 'mounted', ANIMATION_END: 'unmounted' },
      unmounted: { MOUNT: 'mounted' },
    }),
    u = (k) => {
      if (ct) {
        const S = new CustomEvent(k, { bubbles: !1, cancelable: !1 })
        t.value?.dispatchEvent(S)
      }
    }
  pe(
    e,
    async (k, S) => {
      const D = S !== k
      if ((await he(), D)) {
        const B = a.value,
          L = ca(t.value)
        k
          ? (d('MOUNT'), u('enter'), L === 'none' && u('after-enter'))
          : L === 'none' || L === 'undefined' || o.value?.display === 'none'
            ? (d('UNMOUNT'), u('leave'), u('after-leave'))
            : S && B !== L
              ? (d('ANIMATION_OUT'), u('leave'))
              : (d('UNMOUNT'), u('after-leave'))
      }
    },
    { immediate: !0 },
  )
  const f = (k) => {
      const S = ca(t.value),
        D = S.includes(CSS.escape(k.animationName)),
        B = r.value === 'mounted' ? 'enter' : 'leave'
      if (k.target === t.value && D && (u(`after-${B}`), d('ANIMATION_END'), !l.value)) {
        const L = t.value.style.animationFillMode
        ;((t.value.style.animationFillMode = 'forwards'),
          (i = s?.setTimeout(() => {
            t.value?.style.animationFillMode === 'forwards' && (t.value.style.animationFillMode = L)
          })))
      }
      k.target === t.value && S === 'none' && d('ANIMATION_END')
    },
    g = (k) => {
      k.target === t.value && (a.value = ca(t.value))
    },
    b = pe(
      t,
      (k, S) => {
        k
          ? ((o.value = getComputedStyle(k)),
            k.addEventListener('animationstart', g),
            k.addEventListener('animationcancel', f),
            k.addEventListener('animationend', f))
          : (d('ANIMATION_END'),
            i !== void 0 && s?.clearTimeout(i),
            S?.removeEventListener('animationstart', g),
            S?.removeEventListener('animationcancel', f),
            S?.removeEventListener('animationend', f))
      },
      { immediate: !0 },
    ),
    m = pe(r, () => {
      const k = ca(t.value)
      a.value = r.value === 'mounted' ? k : 'none'
    })
  return (
    Te(() => {
      ;(b(), m())
    }),
    { isPresent: y(() => ['mounted', 'unmountSuspended'].includes(r.value)) }
  )
}
function ca(e) {
  return (e && getComputedStyle(e).animationName) || 'none'
}
var Gt = x({
  name: 'Presence',
  props: { present: { type: Boolean, required: !0 }, forceMount: { type: Boolean } },
  slots: {},
  setup(e, { slots: t, expose: o }) {
    const { present: a, forceMount: l } = We(e),
      n = C(),
      { isPresent: i } = Ds(a, n)
    o({ present: i })
    let s = t.default({ present: i.value })
    s = Ao(s || [])
    const r = ge()
    if (s && s?.length > 1) {
      const d = r?.parent?.type.name ? `<${r.parent.type.name} />` : 'component'
      throw new Error(
        [
          `Detected an invalid children for \`${d}\` for  \`Presence\` component.`,
          '',
          'Note: Presence works similarly to `v-if` directly, but it waits for animation/transition to finished before unmounting. So it expect only one direct child of valid VNode type.',
          'You can apply a few solutions:',
          [
            'Provide a single child element so that `presence` directive attach correctly.',
            'Ensure the first child is an actual element instead of a raw text node or comment node.',
          ].map((u) => `  - ${u}`).join(`
`),
        ].join(`
`),
      )
    }
    return () =>
      l.value || a.value || i.value
        ? st(t.default({ present: i.value })[0], {
            ref: (d) => {
              const u = Bt(d)
              return (
                typeof u?.hasAttribute > 'u' ||
                  (u?.hasAttribute('data-reka-popper-content-wrapper')
                    ? (n.value = u.firstElementChild)
                    : (n.value = u)),
                u
              )
            },
          })
        : null
  },
})
const ro = x({
    name: 'PrimitiveSlot',
    inheritAttrs: !1,
    setup(e, { attrs: t, slots: o }) {
      return () => {
        if (!o.default) return null
        const a = Ao(o.default()),
          l = a.findIndex((r) => r.type !== Fi)
        if (l === -1) return a
        const n = a[l]
        delete n.props?.ref
        const i = n.props ? te(t, n.props) : t,
          s = qi({ ...n, props: {} }, i)
        return a.length === 1 ? s : ((a[l] = s), a)
      }
    },
  }),
  Bs = ['area', 'img', 'input'],
  _e = x({
    name: 'Primitive',
    inheritAttrs: !1,
    props: {
      asChild: { type: Boolean, default: !1 },
      as: { type: [String, Object], default: 'div' },
    },
    setup(e, { attrs: t, slots: o }) {
      const a = e.asChild ? 'template' : e.as
      return typeof a == 'string' && Bs.includes(a)
        ? () => st(a, t)
        : a !== 'template'
          ? () => st(e.as, t, { default: o.default })
          : () => st(ro, t, { default: o.default })
    },
  })
function vt() {
  const e = C(),
    t = y(() =>
      ['#text', '#comment'].includes(e.value?.$el.nodeName)
        ? e.value?.$el.nextElementSibling
        : Bt(e),
    )
  return { primitiveElement: e, currentElement: t }
}
const [dn, $s] = Re('CollapsibleRoot')
var Is = x({
    __name: 'CollapsibleRoot',
    props: {
      defaultOpen: { type: Boolean, required: !1, default: !1 },
      open: { type: Boolean, required: !1, default: void 0 },
      disabled: { type: Boolean, required: !1 },
      unmountOnHide: { type: Boolean, required: !1, default: !0 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['update:open'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        n = Qe(a, 'open', o, { defaultValue: a.defaultOpen, passive: a.open === void 0 }),
        { disabled: i, unmountOnHide: s } = We(a)
      return (
        $s({
          contentId: '',
          disabled: i,
          open: n,
          unmountOnHide: s,
          onOpenToggle: () => {
            i.value || (n.value = !n.value)
          },
        }),
        t({ open: n }),
        ve(),
        (r, d) => (
          c(),
          $(
            v(_e),
            {
              as: r.as,
              'as-child': a.asChild,
              'data-state': v(n) ? 'open' : 'closed',
              'data-disabled': v(i) ? '' : void 0,
            },
            { default: w(() => [A(r.$slots, 'default', { open: v(n) })]), _: 3 },
            8,
            ['as', 'as-child', 'data-state', 'data-disabled'],
          )
        )
      )
    },
  }),
  Ms = Is,
  Os = x({
    inheritAttrs: !1,
    __name: 'CollapsibleContent',
    props: {
      forceMount: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['contentFound'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = dn()
      l.contentId ||= lt(void 0, 'reka-collapsible-content')
      const n = C(),
        { forwardRef: i, currentElement: s } = ve(),
        r = C(0),
        d = C(0),
        u = y(() => l.open.value),
        f = C(u.value),
        g = C()
      pe(
        () => [u.value, n.value?.present],
        async () => {
          await he()
          const m = s.value
          if (!m) return
          ;((g.value = g.value || {
            transitionDuration: m.style.transitionDuration,
            animationName: m.style.animationName,
          }),
            (m.style.transitionDuration = '0s'),
            (m.style.animationName = 'none'))
          const _ = m.getBoundingClientRect()
          ;((d.value = _.height),
            (r.value = _.width),
            f.value ||
              ((m.style.transitionDuration = g.value.transitionDuration),
              (m.style.animationName = g.value.animationName)))
        },
        { immediate: !0 },
      )
      const b = y(() => f.value && l.open.value)
      return (
        we(() => {
          requestAnimationFrame(() => {
            f.value = !1
          })
        }),
        $o(s, 'beforematch', (m) => {
          requestAnimationFrame(() => {
            ;(l.onOpenToggle(), a('contentFound'))
          })
        }),
        (m, _) => (
          c(),
          $(
            v(Gt),
            {
              ref_key: 'presentRef',
              ref: n,
              present: m.forceMount || v(l).open.value,
              'force-mount': !0,
            },
            {
              default: w(({ present: k }) => [
                E(
                  v(_e),
                  te(m.$attrs, {
                    id: v(l).contentId,
                    ref: v(i),
                    'as-child': o.asChild,
                    as: m.as,
                    hidden: k ? void 0 : v(l).unmountOnHide.value ? '' : 'until-found',
                    'data-state': b.value ? void 0 : v(l).open.value ? 'open' : 'closed',
                    'data-disabled': v(l).disabled?.value ? '' : void 0,
                    style: {
                      '--reka-collapsible-content-height': `${d.value}px`,
                      '--reka-collapsible-content-width': `${r.value}px`,
                    },
                  }),
                  {
                    default: w(() => [
                      !v(l).unmountOnHide.value || k
                        ? A(m.$slots, 'default', { key: 0 })
                        : O('v-if', !0),
                    ]),
                    _: 2,
                  },
                  1040,
                  ['id', 'as-child', 'as', 'hidden', 'data-state', 'data-disabled', 'style'],
                ),
              ]),
              _: 3,
            },
            8,
            ['present'],
          )
        )
      )
    },
  }),
  Ls = Os,
  Fs = x({
    __name: 'CollapsibleTrigger',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'button' },
    },
    setup(e) {
      const t = e
      ve()
      const o = dn()
      return (a, l) => (
        c(),
        $(
          v(_e),
          {
            type: a.as === 'button' ? 'button' : void 0,
            as: a.as,
            'as-child': t.asChild,
            'aria-controls': v(o).contentId,
            'aria-expanded': v(o).open.value,
            'data-state': v(o).open.value ? 'open' : 'closed',
            'data-disabled': v(o).disabled?.value ? '' : void 0,
            disabled: v(o).disabled?.value,
            onClick: v(o).onOpenToggle,
          },
          { default: w(() => [A(a.$slots, 'default')]), _: 3 },
          8,
          [
            'type',
            'as',
            'as-child',
            'aria-controls',
            'aria-expanded',
            'data-state',
            'data-disabled',
            'disabled',
            'onClick',
          ],
        )
      )
    },
  }),
  qs = Fs
function Es({ type: e, defaultValue: t, modelValue: o }) {
  const a = o || t
  return o !== void 0 || t !== void 0 ? (Array.isArray(a) ? 'multiple' : 'single') : (e ?? 'single')
}
function Ps({ type: e, defaultValue: t, modelValue: o }) {
  return e || Es({ type: e, defaultValue: t, modelValue: o })
}
function Ts({ type: e, defaultValue: t }) {
  return t !== void 0 ? t : e === 'single' ? void 0 : []
}
function Rs(e, t) {
  const o = y(() => Ps(e)),
    a = Qe(e, 'modelValue', t, { defaultValue: Ts(e), passive: e.modelValue === void 0, deep: !0 })
  function l(i) {
    if (o.value === 'single') a.value = At(i, a.value) ? void 0 : i
    else {
      const s = Array.isArray(a.value) ? [...(a.value || [])] : [a.value].filter(Boolean)
      if (Ui(s, i)) {
        const r = s.findIndex((d) => At(d, i))
        s.splice(r, 1)
      } else s.push(i)
      a.value = s
    }
  }
  const n = y(() => o.value === 'single')
  return { modelValue: a, changeModelValue: l, isSingle: n }
}
const [Ia, Vs] = Re('AccordionRoot')
var Ns = x({
    __name: 'AccordionRoot',
    props: {
      collapsible: { type: Boolean, required: !1, default: !1 },
      disabled: { type: Boolean, required: !1, default: !1 },
      dir: { type: String, required: !1 },
      orientation: { type: String, required: !1, default: 'vertical' },
      unmountOnHide: { type: Boolean, required: !1, default: !0 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      type: { type: String, required: !1 },
      modelValue: { type: null, required: !1 },
      defaultValue: { type: null, required: !1 },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { dir: l, disabled: n, unmountOnHide: i } = We(o),
        s = la(l),
        { modelValue: r, changeModelValue: d, isSingle: u } = Rs(o, a),
        { forwardRef: f, currentElement: g } = ve()
      return (
        Vs({
          disabled: n,
          direction: s,
          orientation: o.orientation,
          parentElement: g,
          isSingle: u,
          collapsible: o.collapsible,
          modelValue: r,
          changeModelValue: d,
          unmountOnHide: i,
        }),
        (b, m) => (
          c(),
          $(
            v(_e),
            { ref: v(f), 'as-child': b.asChild, as: b.as },
            { default: w(() => [A(b.$slots, 'default', { modelValue: v(r) })]), _: 3 },
            8,
            ['as-child', 'as'],
          )
        )
      )
    },
  }),
  Ws = Ns,
  uo = (function (e) {
    return ((e.Open = 'open'), (e.Closed = 'closed'), e)
  })(uo || {})
const [Lo, Hs] = Re('AccordionItem')
var js = x({
    __name: 'AccordionItem',
    props: {
      disabled: { type: Boolean, required: !1 },
      value: { type: String, required: !0 },
      unmountOnHide: { type: Boolean, required: !1, default: void 0 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e, { expose: t }) {
      const o = e,
        a = Ia(),
        l = y(() =>
          a.isSingle.value
            ? o.value === a.modelValue.value
            : Array.isArray(a.modelValue.value) && a.modelValue.value.includes(o.value),
        ),
        n = y(() => a.disabled.value || o.disabled),
        i = y(() => (n.value ? '' : void 0)),
        s = y(() => (l.value ? uo.Open : uo.Closed))
      t({ open: l, dataDisabled: i })
      const { currentRef: r, currentElement: d } = ve()
      Hs({
        open: l,
        dataState: s,
        disabled: n,
        dataDisabled: i,
        triggerId: '',
        currentRef: r,
        currentElement: d,
        value: y(() => o.value),
      })
      function u(f) {
        const g = f.target
        if (
          Array.from(
            a.parentElement.value?.querySelectorAll('[data-reka-collection-item]') ?? [],
          ).findIndex((_) => _ === g) === -1
        )
          return null
        Zi(f, g, a.parentElement.value, {
          arrowKeyOptions: a.orientation,
          dir: a.direction.value,
          focus: !0,
        })
      }
      return (f, g) => (
        c(),
        $(
          v(Ms),
          {
            'data-orientation': v(a).orientation,
            'data-disabled': i.value,
            'data-state': s.value,
            disabled: n.value,
            open: l.value,
            as: o.as,
            'as-child': o.asChild,
            'unmount-on-hide': o.unmountOnHide ?? v(a).unmountOnHide.value,
            onKeydown: gt(u, ['up', 'down', 'left', 'right', 'home', 'end']),
          },
          { default: w(() => [A(f.$slots, 'default', { open: l.value })]), _: 3 },
          8,
          [
            'data-orientation',
            'data-disabled',
            'data-state',
            'disabled',
            'open',
            'as',
            'as-child',
            'unmount-on-hide',
          ],
        )
      )
    },
  }),
  Gs = js,
  zs = x({
    __name: 'AccordionContent',
    props: {
      forceMount: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e,
        o = Ia(),
        a = Lo()
      return (
        ve(),
        (l, n) => (
          c(),
          $(
            v(Ls),
            {
              role: 'region',
              'as-child': t.asChild,
              as: l.as,
              'force-mount': t.forceMount,
              'aria-labelledby': v(a).triggerId,
              'data-state': v(a).dataState.value,
              'data-disabled': v(a).dataDisabled.value,
              'data-orientation': v(o).orientation,
              style: {
                '--reka-accordion-content-width': 'var(--reka-collapsible-content-width)',
                '--reka-accordion-content-height': 'var(--reka-collapsible-content-height)',
              },
              onContentFound: n[0] || (n[0] = (i) => v(o).changeModelValue(v(a).value.value)),
            },
            { default: w(() => [A(l.$slots, 'default')]), _: 3 },
            8,
            [
              'as-child',
              'as',
              'force-mount',
              'aria-labelledby',
              'data-state',
              'data-disabled',
              'data-orientation',
            ],
          )
        )
      )
    },
  }),
  Us = zs,
  Ks = x({
    __name: 'AccordionHeader',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'h3' },
    },
    setup(e) {
      const t = e,
        o = Ia(),
        a = Lo()
      return (
        ve(),
        (l, n) => (
          c(),
          $(
            v(_e),
            {
              as: t.as,
              'as-child': t.asChild,
              'data-orientation': v(o).orientation,
              'data-state': v(a).dataState.value,
              'data-disabled': v(a).dataDisabled.value,
            },
            { default: w(() => [A(l.$slots, 'default')]), _: 3 },
            8,
            ['as', 'as-child', 'data-orientation', 'data-state', 'data-disabled'],
          )
        )
      )
    },
  }),
  Zs = Ks,
  Ys = x({
    __name: 'AccordionTrigger',
    props: { asChild: { type: Boolean, required: !1 }, as: { type: null, required: !1 } },
    setup(e) {
      const t = e,
        o = Ia(),
        a = Lo()
      a.triggerId ||= lt(void 0, 'reka-accordion-trigger')
      function l() {
        const n = o.isSingle.value && a.open.value && !o.collapsible
        a.disabled.value || n || o.changeModelValue(a.value.value)
      }
      return (n, i) => (
        c(),
        $(
          v(qs),
          {
            id: v(a).triggerId,
            ref: v(a).currentRef,
            'data-reka-collection-item': '',
            as: t.as,
            'as-child': t.asChild,
            'aria-disabled': v(a).disabled.value || void 0,
            'aria-expanded': v(a).open.value || !1,
            'data-disabled': v(a).dataDisabled.value,
            'data-orientation': v(o).orientation,
            'data-state': v(a).dataState.value,
            disabled: v(a).disabled.value,
            onClick: l,
          },
          { default: w(() => [A(n.$slots, 'default')]), _: 3 },
          8,
          [
            'id',
            'as',
            'as-child',
            'aria-disabled',
            'aria-expanded',
            'data-disabled',
            'data-orientation',
            'data-state',
            'disabled',
          ],
        )
      )
    },
  }),
  Xs = Ys
const [_t, Qs] = Re('DialogRoot')
var Js = x({
    inheritAttrs: !1,
    __name: 'DialogRoot',
    props: {
      open: { type: Boolean, required: !1, default: void 0 },
      defaultOpen: { type: Boolean, required: !1, default: !1 },
      modal: { type: Boolean, required: !1, default: !0 },
    },
    emits: ['update:open'],
    setup(e, { emit: t }) {
      const o = e,
        l = Qe(o, 'open', t, { defaultValue: o.defaultOpen, passive: o.open === void 0 }),
        n = C(),
        i = C(),
        { modal: s } = We(o)
      return (
        Qs({
          open: l,
          modal: s,
          openModal: () => {
            l.value = !0
          },
          onOpenChange: (r) => {
            l.value = r
          },
          onOpenToggle: () => {
            l.value = !l.value
          },
          contentId: '',
          titleId: '',
          descriptionId: '',
          triggerElement: n,
          contentElement: i,
        }),
        (r, d) => A(r.$slots, 'default', { open: v(l), close: () => (l.value = !1) })
      )
    },
  }),
  er = Js,
  tr = x({
    __name: 'DialogClose',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'button' },
    },
    setup(e) {
      const t = e
      ve()
      const o = _t()
      return (a, l) => (
        c(),
        $(
          v(_e),
          te(t, {
            type: a.as === 'button' ? 'button' : void 0,
            onClick: l[0] || (l[0] = (n) => v(o).onOpenChange(!1)),
          }),
          { default: w(() => [A(a.$slots, 'default')]), _: 3 },
          16,
          ['type'],
        )
      )
    },
  }),
  ar = tr
const or = 'dismissableLayer.pointerDownOutside',
  lr = 'dismissableLayer.focusOutside'
function un(e, t) {
  const o = t.closest('[data-dismissable-layer]'),
    a = e.dataset.dismissableLayer === '' ? e : e.querySelector('[data-dismissable-layer]'),
    l = Array.from(e.ownerDocument.querySelectorAll('[data-dismissable-layer]'))
  return !!(o && (a === o || l.indexOf(a) < l.indexOf(o)))
}
function nr(e, t, o = !0) {
  const a = t?.value?.ownerDocument ?? globalThis?.document,
    l = C(!1),
    n = C(() => {})
  return (
    ot((i) => {
      if (!ct || !Ee(o)) return
      const s = async (d) => {
          const u = d.target
          if (!(!t?.value || !u)) {
            if (un(t.value, u)) {
              l.value = !1
              return
            }
            if (d.target && !l.value) {
              let g = function () {
                So(or, e, f)
              }
              const f = { originalEvent: d }
              d.pointerType === 'touch'
                ? (a.removeEventListener('click', n.value),
                  (n.value = g),
                  a.addEventListener('click', n.value, { once: !0 }))
                : g()
            } else a.removeEventListener('click', n.value)
            l.value = !1
          }
        },
        r = window.setTimeout(() => {
          a.addEventListener('pointerdown', s)
        }, 0)
      i(() => {
        ;(window.clearTimeout(r),
          a.removeEventListener('pointerdown', s),
          a.removeEventListener('click', n.value))
      })
    }),
    {
      onPointerDownCapture: () => {
        Ee(o) && (l.value = !0)
      },
    }
  )
}
function ir(e, t, o = !0) {
  const a = t?.value?.ownerDocument ?? globalThis?.document,
    l = C(!1)
  return (
    ot((n) => {
      if (!ct || !Ee(o)) return
      const i = async (s) => {
        if (!t?.value) return
        ;(await he(), await he())
        const r = s.target
        !t.value ||
          !r ||
          un(t.value, r) ||
          (s.target && !l.value && So(lr, e, { originalEvent: s }))
      }
      ;(a.addEventListener('focusin', i), n(() => a.removeEventListener('focusin', i)))
    }),
    {
      onFocusCapture: () => {
        Ee(o) && (l.value = !0)
      },
      onBlurCapture: () => {
        Ee(o) && (l.value = !1)
      },
    }
  )
}
const Ze = Tt({
  layersRoot: new Set(),
  layersWithOutsidePointerEventsDisabled: new Set(),
  originalBodyPointerEvents: void 0,
  branches: new Set(),
})
var sr = x({
    __name: 'DismissableLayer',
    props: {
      disableOutsidePointerEvents: { type: Boolean, required: !1, default: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['escapeKeyDown', 'pointerDownOutside', 'focusOutside', 'interactOutside', 'dismiss'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { forwardRef: l, currentElement: n } = ve(),
        i = y(() => n.value?.ownerDocument ?? globalThis.document),
        s = y(() => Ze.layersRoot),
        r = y(() => (n.value ? Array.from(s.value).indexOf(n.value) : -1)),
        d = y(() => Ze.layersWithOutsidePointerEventsDisabled.size > 0),
        u = y(() => {
          const b = Array.from(s.value),
            [m] = [...Ze.layersWithOutsidePointerEventsDisabled].slice(-1),
            _ = b.indexOf(m)
          return r.value >= _
        }),
        f = nr(async (b) => {
          const m = [...Ze.branches].some((_) => _?.contains(b.target))
          !u.value ||
            m ||
            (a('pointerDownOutside', b),
            a('interactOutside', b),
            await he(),
            b.defaultPrevented || a('dismiss'))
        }, n),
        g = ir((b) => {
          ;[...Ze.branches].some((_) => _?.contains(b.target)) ||
            (a('focusOutside', b), a('interactOutside', b), b.defaultPrevented || a('dismiss'))
        }, n)
      return (
        cs('Escape', (b) => {
          r.value === s.value.size - 1 &&
            (a('escapeKeyDown', b), b.defaultPrevented || a('dismiss'))
        }),
        ot((b) => {
          n.value &&
            (o.disableOutsidePointerEvents &&
              (Ze.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Ze.originalBodyPointerEvents = i.value.body.style.pointerEvents),
                (i.value.body.style.pointerEvents = 'none')),
              Ze.layersWithOutsidePointerEventsDisabled.add(n.value)),
            s.value.add(n.value),
            b(() => {
              o.disableOutsidePointerEvents &&
                Ze.layersWithOutsidePointerEventsDisabled.size === 1 &&
                !an(Ze.originalBodyPointerEvents) &&
                (i.value.body.style.pointerEvents = Ze.originalBodyPointerEvents)
            }))
        }),
        ot((b) => {
          b(() => {
            n.value &&
              (s.value.delete(n.value), Ze.layersWithOutsidePointerEventsDisabled.delete(n.value))
          })
        }),
        (b, m) => (
          c(),
          $(
            v(_e),
            {
              ref: v(l),
              'as-child': b.asChild,
              as: b.as,
              'data-dismissable-layer': '',
              style: xe({ pointerEvents: d.value ? (u.value ? 'auto' : 'none') : void 0 }),
              onFocusCapture: v(g).onFocusCapture,
              onBlurCapture: v(g).onBlurCapture,
              onPointerdownCapture: v(f).onPointerDownCapture,
            },
            { default: w(() => [A(b.$slots, 'default')]), _: 3 },
            8,
            ['as-child', 'as', 'style', 'onFocusCapture', 'onBlurCapture', 'onPointerdownCapture'],
          )
        )
      )
    },
  }),
  Fo = sr
const rr = Xi(() => C([]))
function dr() {
  const e = rr()
  return {
    add(t) {
      const o = e.value[0]
      ;(t !== o && o?.pause(), (e.value = ll(e.value, t)), e.value.unshift(t))
    },
    remove(t) {
      ;((e.value = ll(e.value, t)), e.value[0]?.resume())
    },
  }
}
function ll(e, t) {
  const o = [...e],
    a = o.indexOf(t)
  return (a !== -1 && o.splice(a, 1), o)
}
const eo = 'focusScope.autoFocusOnMount',
  to = 'focusScope.autoFocusOnUnmount',
  nl = { bubbles: !1, cancelable: !0 }
function ur(e, { select: t = !1 } = {}) {
  const o = Ye()
  for (const a of e) if ((pt(a, { select: t }), Ye() !== o)) return !0
}
function cr(e) {
  const t = cn(e),
    o = il(t, e),
    a = il(t.reverse(), e)
  return [o, a]
}
function cn(e) {
  const t = [],
    o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (a) => {
        const l = a.tagName === 'INPUT' && a.type === 'hidden'
        return a.disabled || a.hidden || l
          ? NodeFilter.FILTER_SKIP
          : a.tabIndex >= 0
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_SKIP
      },
    })
  for (; o.nextNode(); ) t.push(o.currentNode)
  return t
}
function il(e, t) {
  for (const o of e) if (!fr(o, { upTo: t })) return o
}
function fr(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === 'hidden') return !0
  for (; e; ) {
    if (t !== void 0 && e === t) return !1
    if (getComputedStyle(e).display === 'none') return !0
    e = e.parentElement
  }
  return !1
}
function pr(e) {
  return e instanceof HTMLInputElement && 'select' in e
}
function pt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const o = Ye()
    ;(e.focus({ preventScroll: !0 }), e !== o && pr(e) && t && e.select())
  }
}
var gr = x({
    __name: 'FocusScope',
    props: {
      loop: { type: Boolean, required: !1, default: !1 },
      trapped: { type: Boolean, required: !1, default: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['mountAutoFocus', 'unmountAutoFocus'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { currentRef: l, currentElement: n } = ve(),
        i = C(null),
        s = dr(),
        r = Tt({
          paused: !1,
          pause() {
            this.paused = !0
          },
          resume() {
            this.paused = !1
          },
        })
      ;(ot((u) => {
        if (!ct) return
        const f = n.value
        if (!o.trapped) return
        function g(k) {
          if (r.paused || !f) return
          const S = k.target
          f.contains(S) ? (i.value = S) : pt(i.value, { select: !0 })
        }
        function b(k) {
          if (r.paused || !f) return
          const S = k.relatedTarget
          S !== null && (f.contains(S) || pt(i.value, { select: !0 }))
        }
        function m(k) {
          f.contains(i.value) || pt(f)
        }
        ;(document.addEventListener('focusin', g), document.addEventListener('focusout', b))
        const _ = new MutationObserver(m)
        ;(f && _.observe(f, { childList: !0, subtree: !0 }),
          u(() => {
            ;(document.removeEventListener('focusin', g),
              document.removeEventListener('focusout', b),
              _.disconnect())
          }))
      }),
        ot(async (u) => {
          const f = n.value
          if ((await he(), !f)) return
          s.add(r)
          const g = Ye()
          if (!f.contains(g)) {
            const m = new CustomEvent(eo, nl)
            ;(f.addEventListener(eo, (_) => a('mountAutoFocus', _)),
              f.dispatchEvent(m),
              m.defaultPrevented || (ur(cn(f), { select: !0 }), Ye() === g && pt(f)))
          }
          u(() => {
            f.removeEventListener(eo, (k) => a('mountAutoFocus', k))
            const m = new CustomEvent(to, nl),
              _ = (k) => {
                a('unmountAutoFocus', k)
              }
            ;(f.addEventListener(to, _),
              f.dispatchEvent(m),
              setTimeout(() => {
                ;(m.defaultPrevented || pt(g ?? document.body, { select: !0 }),
                  f.removeEventListener(to, _),
                  s.remove(r))
              }, 0))
          })
        }))
      function d(u) {
        if ((!o.loop && !o.trapped) || r.paused) return
        const f = u.key === 'Tab' && !u.altKey && !u.ctrlKey && !u.metaKey,
          g = Ye()
        if (f && g) {
          const b = u.currentTarget,
            [m, _] = cr(b)
          m && _
            ? !u.shiftKey && g === _
              ? (u.preventDefault(), o.loop && pt(m, { select: !0 }))
              : u.shiftKey && g === m && (u.preventDefault(), o.loop && pt(_, { select: !0 }))
            : g === b && u.preventDefault()
        }
      }
      return (u, f) => (
        c(),
        $(
          v(_e),
          {
            ref_key: 'currentRef',
            ref: l,
            tabindex: '-1',
            'as-child': u.asChild,
            as: u.as,
            onKeydown: d,
          },
          { default: w(() => [A(u.$slots, 'default')]), _: 3 },
          8,
          ['as-child', 'as'],
        )
      )
    },
  }),
  qo = gr
function vr(e) {
  return e ? 'open' : 'closed'
}
var mr = x({
    __name: 'DialogContentImpl',
    props: {
      forceMount: { type: Boolean, required: !1 },
      trapFocus: { type: Boolean, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = _t(),
        { forwardRef: n, currentElement: i } = ve()
      return (
        (l.titleId ||= lt(void 0, 'reka-dialog-title')),
        (l.descriptionId ||= lt(void 0, 'reka-dialog-description')),
        we(() => {
          ;((l.contentElement = i), Ye() !== document.body && (l.triggerElement.value = Ye()))
        }),
        (s, r) => (
          c(),
          $(
            v(qo),
            {
              'as-child': '',
              loop: '',
              trapped: o.trapFocus,
              onMountAutoFocus: r[5] || (r[5] = (d) => a('openAutoFocus', d)),
              onUnmountAutoFocus: r[6] || (r[6] = (d) => a('closeAutoFocus', d)),
            },
            {
              default: w(() => [
                E(
                  v(Fo),
                  te(
                    {
                      id: v(l).contentId,
                      ref: v(n),
                      as: s.as,
                      'as-child': s.asChild,
                      'disable-outside-pointer-events': s.disableOutsidePointerEvents,
                      role: 'dialog',
                      'aria-describedby': v(l).descriptionId,
                      'aria-labelledby': v(l).titleId,
                      'data-state': v(vr)(v(l).open.value),
                    },
                    s.$attrs,
                    {
                      onDismiss: r[0] || (r[0] = (d) => v(l).onOpenChange(!1)),
                      onEscapeKeyDown: r[1] || (r[1] = (d) => a('escapeKeyDown', d)),
                      onFocusOutside: r[2] || (r[2] = (d) => a('focusOutside', d)),
                      onInteractOutside: r[3] || (r[3] = (d) => a('interactOutside', d)),
                      onPointerDownOutside: r[4] || (r[4] = (d) => a('pointerDownOutside', d)),
                    },
                  ),
                  { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                  16,
                  [
                    'id',
                    'as',
                    'as-child',
                    'disable-outside-pointer-events',
                    'aria-describedby',
                    'aria-labelledby',
                    'data-state',
                  ],
                ),
              ]),
              _: 3,
            },
            8,
            ['trapped'],
          )
        )
      )
    },
  }),
  fn = mr,
  hr = x({
    __name: 'DialogContentModal',
    props: {
      forceMount: { type: Boolean, required: !1 },
      trapFocus: { type: Boolean, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = _t(),
        n = Ba(a),
        { forwardRef: i, currentElement: s } = ve()
      return (
        Oo(s),
        (r, d) => (
          c(),
          $(
            fn,
            te(
              { ...o, ...v(n) },
              {
                ref: v(i),
                'trap-focus': v(l).open.value,
                'disable-outside-pointer-events': !0,
                onCloseAutoFocus:
                  d[0] ||
                  (d[0] = (u) => {
                    u.defaultPrevented || (u.preventDefault(), v(l).triggerElement.value?.focus())
                  }),
                onPointerDownOutside:
                  d[1] ||
                  (d[1] = (u) => {
                    const f = u.detail.originalEvent,
                      g = f.button === 0 && f.ctrlKey === !0
                    ;(f.button === 2 || g) && u.preventDefault()
                  }),
                onFocusOutside:
                  d[2] ||
                  (d[2] = (u) => {
                    u.preventDefault()
                  }),
              },
            ),
            { default: w(() => [A(r.$slots, 'default')]), _: 3 },
            16,
            ['trap-focus'],
          )
        )
      )
    },
  }),
  br = hr,
  yr = x({
    __name: 'DialogContentNonModal',
    props: {
      forceMount: { type: Boolean, required: !1 },
      trapFocus: { type: Boolean, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        l = Ba(t)
      ve()
      const n = _t(),
        i = C(!1),
        s = C(!1)
      return (r, d) => (
        c(),
        $(
          fn,
          te(
            { ...o, ...v(l) },
            {
              'trap-focus': !1,
              'disable-outside-pointer-events': !1,
              onCloseAutoFocus:
                d[0] ||
                (d[0] = (u) => {
                  ;(u.defaultPrevented ||
                    (i.value || v(n).triggerElement.value?.focus(), u.preventDefault()),
                    (i.value = !1),
                    (s.value = !1))
                }),
              onInteractOutside:
                d[1] ||
                (d[1] = (u) => {
                  u.defaultPrevented ||
                    ((i.value = !0),
                    u.detail.originalEvent.type === 'pointerdown' && (s.value = !0))
                  const f = u.target
                  ;(v(n).triggerElement.value?.contains(f) && u.preventDefault(),
                    u.detail.originalEvent.type === 'focusin' && s.value && u.preventDefault())
                }),
            },
          ),
          { default: w(() => [A(r.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  _r = yr,
  kr = x({
    __name: 'DialogContent',
    props: {
      forceMount: { type: Boolean, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = _t(),
        n = Ba(a),
        { forwardRef: i } = ve()
      return (s, r) => (
        c(),
        $(
          v(Gt),
          { present: s.forceMount || v(l).open.value },
          {
            default: w(() => [
              v(l).modal.value
                ? (c(),
                  $(
                    br,
                    te({ key: 0, ref: v(i) }, { ...o, ...v(n), ...s.$attrs }),
                    { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                    16,
                  ))
                : (c(),
                  $(
                    _r,
                    te({ key: 1, ref: v(i) }, { ...o, ...v(n), ...s.$attrs }),
                    { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                    16,
                  )),
            ]),
            _: 3,
          },
          8,
          ['present'],
        )
      )
    },
  }),
  wr = kr,
  xr = x({
    __name: 'DialogOverlayImpl',
    props: { asChild: { type: Boolean, required: !1 }, as: { type: null, required: !1 } },
    setup(e) {
      const t = _t()
      return (
        Io(!0),
        ve(),
        (o, a) => (
          c(),
          $(
            v(_e),
            {
              as: o.as,
              'as-child': o.asChild,
              'data-state': v(t).open.value ? 'open' : 'closed',
              style: { 'pointer-events': 'auto' },
            },
            { default: w(() => [A(o.$slots, 'default')]), _: 3 },
            8,
            ['as', 'as-child', 'data-state'],
          )
        )
      )
    },
  }),
  Sr = xr,
  Ar = x({
    __name: 'DialogOverlay',
    props: {
      forceMount: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = _t(),
        { forwardRef: o } = ve()
      return (a, l) =>
        v(t)?.modal.value
          ? (c(),
            $(
              v(Gt),
              { key: 0, present: a.forceMount || v(t).open.value },
              {
                default: w(() => [
                  E(
                    Sr,
                    te(a.$attrs, { ref: v(o), as: a.as, 'as-child': a.asChild }),
                    { default: w(() => [A(a.$slots, 'default')]), _: 3 },
                    16,
                    ['as', 'as-child'],
                  ),
                ]),
                _: 3,
              },
              8,
              ['present'],
            ))
          : O('v-if', !0)
    },
  }),
  Cr = Ar,
  Dr = x({
    __name: 'Teleport',
    props: {
      to: { type: null, required: !1, default: 'body' },
      disabled: { type: Boolean, required: !1 },
      defer: { type: Boolean, required: !1 },
      forceMount: { type: Boolean, required: !1 },
    },
    setup(e) {
      const t = ds()
      return (o, a) =>
        v(t) || o.forceMount
          ? (c(),
            $(
              Ca,
              { key: 0, to: o.to, disabled: o.disabled, defer: o.defer },
              [A(o.$slots, 'default')],
              8,
              ['to', 'disabled', 'defer'],
            ))
          : O('v-if', !0)
    },
  }),
  Eo = Dr,
  Br = x({
    __name: 'DialogPortal',
    props: {
      to: { type: null, required: !1 },
      disabled: { type: Boolean, required: !1 },
      defer: { type: Boolean, required: !1 },
      forceMount: { type: Boolean, required: !1 },
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(v(Eo), ut(yt(t)), { default: w(() => [A(o.$slots, 'default')]), _: 3 }, 16)
      )
    },
  }),
  $r = Br,
  Ir = x({
    __name: 'DialogTitle',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'h2' },
    },
    setup(e) {
      const t = e,
        o = _t()
      return (
        ve(),
        (a, l) => (
          c(),
          $(
            v(_e),
            te(t, { id: v(o).titleId }),
            { default: w(() => [A(a.$slots, 'default')]), _: 3 },
            16,
            ['id'],
          )
        )
      )
    },
  }),
  Mr = Ir
const sl = 'data-reka-collection-item'
function na(e = {}) {
  const { key: t = '', isProvider: o = !1 } = e,
    a = `${t}CollectionProvider`
  let l
  if (o) {
    const u = C(new Map())
    ;((l = { collectionRef: C(), itemMap: u }), qe(a, l))
  } else l = Pe(a)
  const n = (u = !1) => {
      const f = l.collectionRef.value
      if (!f) return []
      const g = Array.from(f.querySelectorAll(`[${sl}]`)),
        m = Array.from(l.itemMap.value.values()).sort((_, k) => g.indexOf(_.ref) - g.indexOf(k.ref))
      return u ? m : m.filter((_) => _.ref.dataset.disabled !== '')
    },
    i = x({
      name: 'CollectionSlot',
      inheritAttrs: !1,
      setup(u, { slots: f, attrs: g }) {
        const { primitiveElement: b, currentElement: m } = vt()
        return (
          pe(m, () => {
            l.collectionRef.value = m.value
          }),
          () => st(ro, { ref: b, ...g }, f)
        )
      },
    }),
    s = x({
      name: 'CollectionItem',
      inheritAttrs: !1,
      props: { value: { validator: () => !0 } },
      setup(u, { slots: f, attrs: g }) {
        const { primitiveElement: b, currentElement: m } = vt()
        return (
          ot((_) => {
            if (m.value) {
              const k = Ei(m.value)
              ;(l.itemMap.value.set(k, { ref: m.value, value: u.value }),
                _(() => l.itemMap.value.delete(k)))
            }
          }),
          () => st(ro, { ...g, [sl]: '', ref: b }, f)
        )
      },
    }),
    r = y(() => Array.from(l.itemMap.value.values())),
    d = y(() => l.itemMap.value.size)
  return { getItems: n, reactiveItems: r, itemMapSize: d, CollectionSlot: i, CollectionItem: s }
}
var Or = x({
    __name: 'VisuallyHidden',
    props: {
      feature: { type: String, required: !1, default: 'focusable' },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'span' },
    },
    setup(e) {
      return (t, o) => (
        c(),
        $(
          v(_e),
          {
            as: t.as,
            'as-child': t.asChild,
            'aria-hidden': t.feature === 'focusable' ? 'true' : void 0,
            'data-hidden': t.feature === 'fully-hidden' ? '' : void 0,
            tabindex: t.feature === 'fully-hidden' ? '-1' : void 0,
            style: {
              position: 'absolute',
              border: 0,
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              overflow: 'hidden',
              clip: 'rect(0, 0, 0, 0)',
              clipPath: 'inset(50%)',
              whiteSpace: 'nowrap',
              wordWrap: 'normal',
              top: '-1px',
              left: '-1px',
            },
          },
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          8,
          ['as', 'as-child', 'aria-hidden', 'data-hidden', 'tabindex'],
        )
      )
    },
  }),
  Lr = Or,
  Fr = x({
    inheritAttrs: !1,
    __name: 'VisuallyHiddenInputBubble',
    props: {
      name: { type: String, required: !0 },
      value: { type: null, required: !0 },
      checked: { type: Boolean, required: !1, default: void 0 },
      required: { type: Boolean, required: !1 },
      disabled: { type: Boolean, required: !1 },
      feature: { type: String, required: !1, default: 'fully-hidden' },
    },
    setup(e) {
      const t = e,
        { primitiveElement: o, currentElement: a } = vt(),
        l = y(() => t.checked ?? t.value)
      return (
        pe(l, (n, i) => {
          if (!a.value) return
          const s = a.value,
            r = window.HTMLInputElement.prototype,
            u = Object.getOwnPropertyDescriptor(r, 'value').set
          if (u && n !== i) {
            const f = new Event('input', { bubbles: !0 }),
              g = new Event('change', { bubbles: !0 })
            ;(u.call(s, n), s.dispatchEvent(f), s.dispatchEvent(g))
          }
        }),
        (n, i) => (
          c(),
          $(
            Lr,
            te({ ref_key: 'primitiveElement', ref: o }, { ...t, ...n.$attrs }, { as: 'input' }),
            null,
            16,
          )
        )
      )
    },
  }),
  rl = Fr,
  qr = x({
    inheritAttrs: !1,
    __name: 'VisuallyHiddenInput',
    props: {
      name: { type: String, required: !0 },
      value: { type: null, required: !0 },
      checked: { type: Boolean, required: !1, default: void 0 },
      required: { type: Boolean, required: !1 },
      disabled: { type: Boolean, required: !1 },
      feature: { type: String, required: !1, default: 'fully-hidden' },
    },
    setup(e) {
      const t = e,
        o = y(
          () =>
            typeof t.value == 'object' &&
            Array.isArray(t.value) &&
            t.value.length === 0 &&
            t.required,
        ),
        a = y(() =>
          typeof t.value == 'string' ||
          typeof t.value == 'number' ||
          typeof t.value == 'boolean' ||
          t.value === null ||
          t.value === void 0
            ? [{ name: t.name, value: t.value }]
            : typeof t.value == 'object' && Array.isArray(t.value)
              ? t.value.flatMap((l, n) =>
                  typeof l == 'object'
                    ? Object.entries(l).map(([i, s]) => ({
                        name: `${t.name}[${n}][${i}]`,
                        value: s,
                      }))
                    : { name: `${t.name}[${n}]`, value: l },
                )
              : t.value !== null && typeof t.value == 'object' && !Array.isArray(t.value)
                ? Object.entries(t.value).map(([l, n]) => ({ name: `${t.name}[${l}]`, value: n }))
                : [],
        )
      return (l, n) => (
        c(),
        h(
          ae,
          null,
          [
            O(" We render single input if it's required "),
            o.value
              ? (c(),
                $(
                  rl,
                  te({ key: l.name }, { ...t, ...l.$attrs }, { name: l.name, value: l.value }),
                  null,
                  16,
                  ['name', 'value'],
                ))
              : (c(!0),
                h(
                  ae,
                  { key: 1 },
                  fe(
                    a.value,
                    (i) => (
                      c(),
                      $(
                        rl,
                        te(
                          { key: i.name },
                          { ref_for: !0 },
                          { ...t, ...l.$attrs },
                          { name: i.name, value: i.value },
                        ),
                        null,
                        16,
                        ['name', 'value'],
                      )
                    ),
                  ),
                  128,
                )),
          ],
          2112,
        )
      )
    },
  }),
  Er = qr
function Pr(e, t, o) {
  return e === void 0 ? !1 : Array.isArray(e) ? e.some((a) => Qt(a, t, o)) : Qt(e, t, o)
}
function Qt(e, t, o) {
  return e === void 0 || t === void 0
    ? !1
    : typeof e == 'string'
      ? e === t
      : typeof o == 'function'
        ? o(e, t)
        : typeof o == 'string'
          ? e?.[o] === t?.[o]
          : At(e, t)
}
const Tr = 'rovingFocusGroup.onEntryFocus',
  Rr = { bubbles: !1, cancelable: !0 },
  Vr = {
    ArrowLeft: 'prev',
    ArrowUp: 'prev',
    ArrowRight: 'next',
    ArrowDown: 'next',
    PageUp: 'first',
    Home: 'first',
    PageDown: 'last',
    End: 'last',
  }
function Nr(e, t) {
  return t !== 'rtl' ? e : e === 'ArrowLeft' ? 'ArrowRight' : e === 'ArrowRight' ? 'ArrowLeft' : e
}
function pn(e, t, o) {
  const a = Nr(e.key, o)
  if (
    !(t === 'vertical' && ['ArrowLeft', 'ArrowRight'].includes(a)) &&
    !(t === 'horizontal' && ['ArrowUp', 'ArrowDown'].includes(a))
  )
    return Vr[a]
}
function gn(e, t = !1) {
  const o = Ye()
  for (const a of e) if (a === o || (a.focus({ preventScroll: t }), Ye() !== o)) return
}
function Wr(e, t) {
  return e.map((o, a) => e[(t + a) % e.length])
}
const [Ma, Hr] = Re('ListboxRoot')
var jr = x({
    __name: 'ListboxRoot',
    props: {
      modelValue: { type: null, required: !1 },
      defaultValue: { type: null, required: !1 },
      multiple: { type: Boolean, required: !1 },
      orientation: { type: String, required: !1, default: 'vertical' },
      dir: { type: String, required: !1 },
      disabled: { type: Boolean, required: !1 },
      selectionBehavior: { type: String, required: !1, default: 'toggle' },
      highlightOnHover: { type: Boolean, required: !1 },
      by: { type: [String, Function], required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      name: { type: String, required: !1 },
      required: { type: Boolean, required: !1 },
    },
    emits: ['update:modelValue', 'highlight', 'entryFocus', 'leave'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        {
          multiple: n,
          highlightOnHover: i,
          orientation: s,
          disabled: r,
          selectionBehavior: d,
          dir: u,
        } = We(a),
        { getItems: f } = na({ isProvider: !0 }),
        { handleTypeaheadSearch: g } = Ss(),
        { primitiveElement: b, currentElement: m } = vt(),
        _ = ks(),
        k = la(u),
        S = ms(m),
        D = C(),
        B = C(!1),
        L = C(!0),
        R = Qe(a, 'modelValue', l, {
          defaultValue: a.defaultValue ?? (n.value ? [] : void 0),
          passive: a.modelValue === void 0,
          deep: !0,
        })
      function N(V) {
        if (((B.value = !0), a.multiple)) {
          const Y = Array.isArray(R.value) ? [...R.value] : [],
            K = Y.findIndex((se) => Qt(se, V, a.by))
          a.selectionBehavior === 'toggle'
            ? (K === -1 ? Y.push(V) : Y.splice(K, 1), (R.value = Y))
            : ((R.value = [V]), (D.value = V))
        } else
          a.selectionBehavior === 'toggle' && Qt(R.value, V, a.by)
            ? (R.value = void 0)
            : (R.value = V)
        setTimeout(() => {
          B.value = !1
        }, 1)
      }
      const W = C(null),
        q = C(null),
        P = C(!1),
        j = C(!1),
        oe = va(),
        U = va(),
        H = va()
      function G() {
        return f()
          .map((V) => V.ref)
          .filter((V) => V.dataset.disabled !== '')
      }
      function ne(V, Y = !0) {
        if (!V) return
        ;((W.value = V),
          L.value && W.value.focus(),
          Y && W.value.scrollIntoView({ block: 'nearest' }))
        const K = f().find((se) => se.ref === V)
        l('highlight', K)
      }
      function le(V) {
        if (P.value) H.trigger(V)
        else {
          const Y = f().find((K) => Qt(K.value, V, a.by))
          Y && ((W.value = Y.ref), ne(Y.ref))
        }
      }
      function ce(V) {
        W.value &&
          W.value.isConnected &&
          (V.preventDefault(), V.stopPropagation(), j.value || W.value.click())
      }
      function ie(V) {
        if (L.value) {
          if (((B.value = !0), P.value)) U.trigger(V)
          else {
            const Y = V.altKey || V.ctrlKey || V.metaKey
            if (Y && V.key === 'a' && n.value) {
              const K = f(),
                se = K.map((Ve) => Ve.value)
              ;((R.value = [...se]), V.preventDefault(), ne(K[K.length - 1].ref))
            } else if (!Y) {
              const K = g(V.key, f())
              K && ne(K)
            }
          }
          setTimeout(() => {
            B.value = !1
          }, 1)
        }
      }
      function be() {
        j.value = !0
      }
      function ye() {
        he(() => {
          j.value = !1
        })
      }
      function Ae() {
        he(() => {
          const V = new KeyboardEvent('keydown', { key: 'PageUp' })
          ee(V)
        })
      }
      function Se(V) {
        const Y = W.value
        ;(Y?.isConnected && (q.value = Y), (W.value = null), l('leave', V))
      }
      function z(V) {
        const Y = new CustomEvent('listbox.entryFocus', { bubbles: !1, cancelable: !0 })
        if ((V.currentTarget?.dispatchEvent(Y), l('entryFocus', Y), !Y.defaultPrevented))
          if (q.value) ne(q.value)
          else {
            const K = G()?.[0]
            ne(K)
          }
      }
      function ee(V) {
        const Y = pn(V, s.value, k.value)
        if (!Y) return
        let K = G()
        if (W.value) {
          if (Y === 'last') K.reverse()
          else if (Y === 'prev' || Y === 'next') {
            Y === 'prev' && K.reverse()
            const se = K.indexOf(W.value)
            K = K.slice(se + 1)
          }
          T(V, K[0])
        }
        if (K.length) {
          const se = !W.value && Y === 'prev' ? K.length - 1 : 0
          ne(K[se])
        }
        if (P.value) return U.trigger(V)
      }
      function T(V, Y) {
        if (
          !(
            P.value ||
            a.selectionBehavior !== 'replace' ||
            !n.value ||
            !Array.isArray(R.value) ||
            ((V.altKey || V.ctrlKey || V.metaKey) && !V.shiftKey)
          ) &&
          V.shiftKey
        ) {
          const se = f().filter((Ue) => Ue.ref.dataset.disabled !== '')
          let Ve = se.find((Ue) => Ue.ref === Y)?.value
          if (
            (V.key === _.END
              ? (Ve = se[se.length - 1].value)
              : V.key === _.HOME && (Ve = se[0].value),
            !Ve || !D.value)
          )
            return
          const Ne = zi(
            se.map((Ue) => Ue.value),
            D.value,
            Ve,
          )
          R.value = Ne
        }
      }
      async function J(V) {
        if ((await he(), P.value)) oe.trigger(V)
        else {
          const Y = G(),
            K = Y.find((se) => se.dataset.state === 'checked')
          K ? ne(K) : Y.length && ne(Y[0])
        }
      }
      return (
        pe(
          R,
          () => {
            B.value ||
              he(() => {
                J()
              })
          },
          { immediate: !0, deep: !0 },
        ),
        t({
          highlightedElement: W,
          highlightItem: le,
          highlightFirstItem: Ae,
          highlightSelected: J,
          getItems: f,
        }),
        Hr({
          modelValue: R,
          onValueChange: N,
          multiple: n,
          orientation: s,
          dir: k,
          disabled: r,
          highlightOnHover: i,
          highlightedElement: W,
          isVirtual: P,
          virtualFocusHook: oe,
          virtualKeydownHook: U,
          virtualHighlightHook: H,
          by: a.by,
          firstValue: D,
          selectionBehavior: d,
          focusable: L,
          onLeave: Se,
          onEnter: z,
          changeHighlight: ne,
          onKeydownEnter: ce,
          onKeydownNavigation: ee,
          onKeydownTypeAhead: ie,
          onCompositionStart: be,
          onCompositionEnd: ye,
          highlightFirstItem: Ae,
        }),
        (V, Y) => (
          c(),
          $(
            v(_e),
            {
              ref_key: 'primitiveElement',
              ref: b,
              as: V.as,
              'as-child': V.asChild,
              dir: v(k),
              'data-disabled': v(r) ? '' : void 0,
              onPointerleave: Se,
              onFocusout:
                Y[0] ||
                (Y[0] = async (K) => {
                  const se = K.relatedTarget || K.target
                  ;(await he(), W.value && v(m) && !v(m).contains(se) && Se(K))
                }),
            },
            {
              default: w(() => [
                A(V.$slots, 'default', { modelValue: v(R) }),
                v(S) && V.name
                  ? (c(),
                    $(
                      v(Er),
                      { key: 0, name: V.name, value: v(R), disabled: v(r), required: V.required },
                      null,
                      8,
                      ['name', 'value', 'disabled', 'required'],
                    ))
                  : O('v-if', !0),
              ]),
              _: 3,
            },
            8,
            ['as', 'as-child', 'dir', 'data-disabled'],
          )
        )
      )
    },
  }),
  Gr = jr,
  zr = x({
    __name: 'ListboxContent',
    props: { asChild: { type: Boolean, required: !1 }, as: { type: null, required: !1 } },
    setup(e) {
      const { CollectionSlot: t } = na(),
        o = Ma(),
        a = ln(!1, 10)
      return (l, n) => (
        c(),
        $(v(t), null, {
          default: w(() => [
            E(
              v(_e),
              {
                role: 'listbox',
                as: l.as,
                'as-child': l.asChild,
                tabindex: v(o).focusable.value
                  ? v(o).highlightedElement.value
                    ? '-1'
                    : '0'
                  : '-1',
                'aria-orientation': v(o).orientation.value,
                'aria-multiselectable': !!v(o).multiple.value,
                'data-orientation': v(o).orientation.value,
                onMousedown: n[0] || (n[0] = Ce((i) => (a.value = !0), ['left'])),
                onFocus:
                  n[1] ||
                  (n[1] = (i) => {
                    v(a) || v(o).onEnter(i)
                  }),
                onKeydown: [
                  n[2] ||
                    (n[2] = gt(
                      (i) => {
                        ;(v(o).orientation.value === 'vertical' &&
                          (i.key === 'ArrowLeft' || i.key === 'ArrowRight')) ||
                          (v(o).orientation.value === 'horizontal' &&
                            (i.key === 'ArrowUp' || i.key === 'ArrowDown')) ||
                          (i.preventDefault(), v(o).focusable.value && v(o).onKeydownNavigation(i))
                      },
                      ['down', 'up', 'left', 'right', 'home', 'end'],
                    )),
                  gt(v(o).onKeydownEnter, ['enter']),
                  v(o).onKeydownTypeAhead,
                ],
              },
              { default: w(() => [A(l.$slots, 'default')]), _: 3 },
              8,
              [
                'as',
                'as-child',
                'tabindex',
                'aria-orientation',
                'aria-multiselectable',
                'data-orientation',
                'onKeydown',
              ],
            ),
          ]),
          _: 3,
        })
      )
    },
  }),
  Ur = zr,
  Kr = x({
    __name: 'ListboxFilter',
    props: {
      modelValue: { type: String, required: !1 },
      autoFocus: { type: Boolean, required: !1 },
      disabled: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'input' },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        l = Qe(o, 'modelValue', t, { defaultValue: '', passive: o.modelValue === void 0 }),
        n = Ma(),
        { primitiveElement: i, currentElement: s } = vt(),
        r = y(() => o.disabled || n.disabled.value || !1),
        d = C()
      return (
        Pi(() => (d.value = n.highlightedElement.value?.id)),
        we(() => {
          ;((n.focusable.value = !1),
            setTimeout(() => {
              o.autoFocus && s.value?.focus()
            }, 1))
        }),
        Te(() => {
          n.focusable.value = !0
        }),
        (u, f) => (
          c(),
          $(
            v(_e),
            {
              ref_key: 'primitiveElement',
              ref: i,
              as: u.as,
              'as-child': u.asChild,
              value: v(l),
              disabled: r.value ? '' : void 0,
              'data-disabled': r.value ? '' : void 0,
              'aria-disabled': r.value ?? void 0,
              'aria-activedescendant': d.value,
              type: 'text',
              onKeydown: [
                gt(Ce(v(n).onKeydownNavigation, ['prevent']), ['down', 'up', 'home', 'end']),
                gt(v(n).onKeydownEnter, ['enter']),
              ],
              onInput:
                f[0] ||
                (f[0] = (g) => {
                  ;((l.value = g.target.value), v(n).highlightFirstItem())
                }),
              onCompositionstart: v(n).onCompositionStart,
              onCompositionend: v(n).onCompositionEnd,
            },
            { default: w(() => [A(u.$slots, 'default', { modelValue: v(l) })]), _: 3 },
            8,
            [
              'as',
              'as-child',
              'value',
              'disabled',
              'data-disabled',
              'aria-disabled',
              'aria-activedescendant',
              'onKeydown',
              'onCompositionstart',
              'onCompositionend',
            ],
          )
        )
      )
    },
  }),
  Zr = Kr
const Yr = 'listbox.select',
  [Xr, Qr] = Re('ListboxItem')
var Jr = x({
    __name: 'ListboxItem',
    props: {
      value: { type: null, required: !0 },
      disabled: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'div' },
    },
    emits: ['select'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = lt(void 0, 'reka-listbox-item'),
        { CollectionItem: n } = na(),
        { forwardRef: i, currentElement: s } = ve(),
        r = Ma(),
        d = y(() => s.value === r.highlightedElement.value),
        u = y(() => Pr(r.modelValue.value, o.value, r.by)),
        f = y(() => r.disabled.value || o.disabled)
      async function g(m) {
        ;(a('select', m),
          !m?.defaultPrevented &&
            !f.value &&
            m &&
            (r.onValueChange(o.value), r.changeHighlight(s.value)))
      }
      function b(m) {
        const _ = { originalEvent: m, value: o.value }
        So(Yr, g, _)
      }
      return (
        Qr({ isSelected: u }),
        (m, _) => (
          c(),
          $(
            v(n),
            { value: m.value },
            {
              default: w(() => [
                Ti(
                  [d.value, u.value],
                  () =>
                    E(
                      v(_e),
                      te({ id: v(l) }, m.$attrs, {
                        ref: v(i),
                        role: 'option',
                        tabindex: v(r).focusable.value ? (d.value ? '0' : '-1') : -1,
                        'aria-selected': u.value,
                        as: m.as,
                        'as-child': m.asChild,
                        disabled: f.value ? '' : void 0,
                        'data-disabled': f.value ? '' : void 0,
                        'data-highlighted': d.value ? '' : void 0,
                        'data-state': u.value ? 'checked' : 'unchecked',
                        onClick: b,
                        onKeydown: gt(Ce(b, ['prevent']), ['space']),
                        onPointermove:
                          _[0] ||
                          (_[0] = () => {
                            v(r).highlightedElement.value !== v(s) &&
                              v(r).highlightOnHover.value &&
                              !v(r).focusable.value &&
                              v(r).changeHighlight(v(s), !1)
                          }),
                      }),
                      { default: w(() => [A(m.$slots, 'default')]), _: 3 },
                      16,
                      [
                        'id',
                        'tabindex',
                        'aria-selected',
                        'as',
                        'as-child',
                        'disabled',
                        'data-disabled',
                        'data-highlighted',
                        'data-state',
                        'onKeydown',
                      ],
                    ),
                  _,
                  1,
                ),
              ]),
              _: 3,
            },
            8,
            ['value'],
          )
        )
      )
    },
  }),
  ed = Jr,
  td = x({
    __name: 'ListboxItemIndicator',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'span' },
    },
    setup(e) {
      const t = e
      ve()
      const o = Xr()
      return (a, l) =>
        v(o).isSelected.value
          ? (c(),
            $(
              v(_e),
              te({ key: 0, 'aria-hidden': 'true' }, t),
              { default: w(() => [A(a.$slots, 'default')]), _: 3 },
              16,
            ))
          : O('v-if', !0)
    },
  }),
  ad = td
const [vn, od] = Re('PopperRoot')
var ld = x({
    inheritAttrs: !1,
    __name: 'PopperRoot',
    setup(e) {
      const t = C()
      return (
        od({ anchor: t, onAnchorChange: (o) => (t.value = o) }),
        (o, a) => A(o.$slots, 'default')
      )
    },
  }),
  mn = ld,
  nd = x({
    __name: 'PopperAnchor',
    props: {
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e,
        { forwardRef: o, currentElement: a } = ve(),
        l = vn()
      return (
        Jl(() => {
          l.onAnchorChange(t.reference ?? a.value)
        }),
        (n, i) => (
          c(),
          $(
            v(_e),
            { ref: v(o), as: n.as, 'as-child': n.asChild },
            { default: w(() => [A(n.$slots, 'default')]), _: 3 },
            8,
            ['as', 'as-child'],
          )
        )
      )
    },
  }),
  hn = nd
function id(e) {
  return e !== null
}
function sd(e) {
  return {
    name: 'transformOrigin',
    options: e,
    fn(t) {
      const { placement: o, rects: a, middlewareData: l } = t,
        i = l.arrow?.centerOffset !== 0,
        s = i ? 0 : e.arrowWidth,
        r = i ? 0 : e.arrowHeight,
        [d, u] = co(o),
        f = { start: '0%', center: '50%', end: '100%' }[u],
        g = (l.arrow?.x ?? 0) + s / 2,
        b = (l.arrow?.y ?? 0) + r / 2
      let m = '',
        _ = ''
      return (
        d === 'bottom'
          ? ((m = i ? f : `${g}px`), (_ = `${-r}px`))
          : d === 'top'
            ? ((m = i ? f : `${g}px`), (_ = `${a.floating.height + r}px`))
            : d === 'right'
              ? ((m = `${-r}px`), (_ = i ? f : `${b}px`))
              : d === 'left' && ((m = `${a.floating.width + r}px`), (_ = i ? f : `${b}px`)),
        { data: { x: m, y: _ } }
      )
    },
  }
}
function co(e) {
  const [t, o = 'center'] = e.split('-')
  return [t, o]
}
const rd = ['top', 'right', 'bottom', 'left'],
  mt = Math.min,
  je = Math.max,
  ya = Math.round,
  fa = Math.floor,
  at = (e) => ({ x: e, y: e }),
  dd = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' }
function fo(e, t, o) {
  return je(e, mt(t, o))
}
function rt(e, t) {
  return typeof e == 'function' ? e(t) : e
}
function dt(e) {
  return e.split('-')[0]
}
function zt(e) {
  return e.split('-')[1]
}
function Po(e) {
  return e === 'x' ? 'y' : 'x'
}
function To(e) {
  return e === 'y' ? 'height' : 'width'
}
function tt(e) {
  const t = e[0]
  return t === 't' || t === 'b' ? 'y' : 'x'
}
function Ro(e) {
  return Po(tt(e))
}
function ud(e, t, o) {
  o === void 0 && (o = !1)
  const a = zt(e),
    l = Ro(e),
    n = To(l)
  let i =
    l === 'x' ? (a === (o ? 'end' : 'start') ? 'right' : 'left') : a === 'start' ? 'bottom' : 'top'
  return (t.reference[n] > t.floating[n] && (i = _a(i)), [i, _a(i)])
}
function cd(e) {
  const t = _a(e)
  return [po(e), t, po(t)]
}
function po(e) {
  return e.includes('start') ? e.replace('start', 'end') : e.replace('end', 'start')
}
const dl = ['left', 'right'],
  ul = ['right', 'left'],
  fd = ['top', 'bottom'],
  pd = ['bottom', 'top']
function gd(e, t, o) {
  switch (e) {
    case 'top':
    case 'bottom':
      return o ? (t ? ul : dl) : t ? dl : ul
    case 'left':
    case 'right':
      return t ? fd : pd
    default:
      return []
  }
}
function vd(e, t, o, a) {
  const l = zt(e)
  let n = gd(dt(e), o === 'start', a)
  return (l && ((n = n.map((i) => i + '-' + l)), t && (n = n.concat(n.map(po)))), n)
}
function _a(e) {
  const t = dt(e)
  return dd[t] + e.slice(t.length)
}
function md(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e }
}
function bn(e) {
  return typeof e != 'number' ? md(e) : { top: e, right: e, bottom: e, left: e }
}
function ka(e) {
  const { x: t, y: o, width: a, height: l } = e
  return { width: a, height: l, top: o, left: t, right: t + a, bottom: o + l, x: t, y: o }
}
function cl(e, t, o) {
  let { reference: a, floating: l } = e
  const n = tt(t),
    i = Ro(t),
    s = To(i),
    r = dt(t),
    d = n === 'y',
    u = a.x + a.width / 2 - l.width / 2,
    f = a.y + a.height / 2 - l.height / 2,
    g = a[s] / 2 - l[s] / 2
  let b
  switch (r) {
    case 'top':
      b = { x: u, y: a.y - l.height }
      break
    case 'bottom':
      b = { x: u, y: a.y + a.height }
      break
    case 'right':
      b = { x: a.x + a.width, y: f }
      break
    case 'left':
      b = { x: a.x - l.width, y: f }
      break
    default:
      b = { x: a.x, y: a.y }
  }
  switch (zt(t)) {
    case 'start':
      b[i] -= g * (o && d ? -1 : 1)
      break
    case 'end':
      b[i] += g * (o && d ? -1 : 1)
      break
  }
  return b
}
async function hd(e, t) {
  var o
  t === void 0 && (t = {})
  const { x: a, y: l, platform: n, rects: i, elements: s, strategy: r } = e,
    {
      boundary: d = 'clippingAncestors',
      rootBoundary: u = 'viewport',
      elementContext: f = 'floating',
      altBoundary: g = !1,
      padding: b = 0,
    } = rt(t, e),
    m = bn(b),
    k = s[g ? (f === 'floating' ? 'reference' : 'floating') : f],
    S = ka(
      await n.getClippingRect({
        element:
          (o = await (n.isElement == null ? void 0 : n.isElement(k))) == null || o
            ? k
            : k.contextElement ||
              (await (n.getDocumentElement == null ? void 0 : n.getDocumentElement(s.floating))),
        boundary: d,
        rootBoundary: u,
        strategy: r,
      }),
    ),
    D =
      f === 'floating'
        ? { x: a, y: l, width: i.floating.width, height: i.floating.height }
        : i.reference,
    B = await (n.getOffsetParent == null ? void 0 : n.getOffsetParent(s.floating)),
    L = (await (n.isElement == null ? void 0 : n.isElement(B)))
      ? (await (n.getScale == null ? void 0 : n.getScale(B))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    R = ka(
      n.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await n.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: D,
            offsetParent: B,
            strategy: r,
          })
        : D,
    )
  return {
    top: (S.top - R.top + m.top) / L.y,
    bottom: (R.bottom - S.bottom + m.bottom) / L.y,
    left: (S.left - R.left + m.left) / L.x,
    right: (R.right - S.right + m.right) / L.x,
  }
}
const bd = 50,
  yd = async (e, t, o) => {
    const {
        placement: a = 'bottom',
        strategy: l = 'absolute',
        middleware: n = [],
        platform: i,
      } = o,
      s = i.detectOverflow ? i : { ...i, detectOverflow: hd },
      r = await (i.isRTL == null ? void 0 : i.isRTL(t))
    let d = await i.getElementRects({ reference: e, floating: t, strategy: l }),
      { x: u, y: f } = cl(d, a, r),
      g = a,
      b = 0
    const m = {}
    for (let _ = 0; _ < n.length; _++) {
      const k = n[_]
      if (!k) continue
      const { name: S, fn: D } = k,
        {
          x: B,
          y: L,
          data: R,
          reset: N,
        } = await D({
          x: u,
          y: f,
          initialPlacement: a,
          placement: g,
          strategy: l,
          middlewareData: m,
          rects: d,
          platform: s,
          elements: { reference: e, floating: t },
        })
      ;((u = B ?? u),
        (f = L ?? f),
        (m[S] = { ...m[S], ...R }),
        N &&
          b < bd &&
          (b++,
          typeof N == 'object' &&
            (N.placement && (g = N.placement),
            N.rects &&
              (d =
                N.rects === !0
                  ? await i.getElementRects({ reference: e, floating: t, strategy: l })
                  : N.rects),
            ({ x: u, y: f } = cl(d, g, r))),
          (_ = -1)))
    }
    return { x: u, y: f, placement: g, strategy: l, middlewareData: m }
  },
  _d = (e) => ({
    name: 'arrow',
    options: e,
    async fn(t) {
      const { x: o, y: a, placement: l, rects: n, platform: i, elements: s, middlewareData: r } = t,
        { element: d, padding: u = 0 } = rt(e, t) || {}
      if (d == null) return {}
      const f = bn(u),
        g = { x: o, y: a },
        b = Ro(l),
        m = To(b),
        _ = await i.getDimensions(d),
        k = b === 'y',
        S = k ? 'top' : 'left',
        D = k ? 'bottom' : 'right',
        B = k ? 'clientHeight' : 'clientWidth',
        L = n.reference[m] + n.reference[b] - g[b] - n.floating[m],
        R = g[b] - n.reference[b],
        N = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d))
      let W = N ? N[B] : 0
      ;(!W || !(await (i.isElement == null ? void 0 : i.isElement(N)))) &&
        (W = s.floating[B] || n.floating[m])
      const q = L / 2 - R / 2,
        P = W / 2 - _[m] / 2 - 1,
        j = mt(f[S], P),
        oe = mt(f[D], P),
        U = j,
        H = W - _[m] - oe,
        G = W / 2 - _[m] / 2 + q,
        ne = fo(U, G, H),
        le =
          !r.arrow &&
          zt(l) != null &&
          G !== ne &&
          n.reference[m] / 2 - (G < U ? j : oe) - _[m] / 2 < 0,
        ce = le ? (G < U ? G - U : G - H) : 0
      return {
        [b]: g[b] + ce,
        data: { [b]: ne, centerOffset: G - ne - ce, ...(le && { alignmentOffset: ce }) },
        reset: le,
      }
    },
  }),
  kd = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'flip',
        options: e,
        async fn(t) {
          var o, a
          const {
              placement: l,
              middlewareData: n,
              rects: i,
              initialPlacement: s,
              platform: r,
              elements: d,
            } = t,
            {
              mainAxis: u = !0,
              crossAxis: f = !0,
              fallbackPlacements: g,
              fallbackStrategy: b = 'bestFit',
              fallbackAxisSideDirection: m = 'none',
              flipAlignment: _ = !0,
              ...k
            } = rt(e, t)
          if ((o = n.arrow) != null && o.alignmentOffset) return {}
          const S = dt(l),
            D = tt(s),
            B = dt(s) === s,
            L = await (r.isRTL == null ? void 0 : r.isRTL(d.floating)),
            R = g || (B || !_ ? [_a(s)] : cd(s)),
            N = m !== 'none'
          !g && N && R.push(...vd(s, _, m, L))
          const W = [s, ...R],
            q = await r.detectOverflow(t, k),
            P = []
          let j = ((a = n.flip) == null ? void 0 : a.overflows) || []
          if ((u && P.push(q[S]), f)) {
            const G = ud(l, i, L)
            P.push(q[G[0]], q[G[1]])
          }
          if (((j = [...j, { placement: l, overflows: P }]), !P.every((G) => G <= 0))) {
            var oe, U
            const G = (((oe = n.flip) == null ? void 0 : oe.index) || 0) + 1,
              ne = W[G]
            if (
              ne &&
              (!(f === 'alignment' ? D !== tt(ne) : !1) ||
                j.every((ie) => (tt(ie.placement) === D ? ie.overflows[0] > 0 : !0)))
            )
              return { data: { index: G, overflows: j }, reset: { placement: ne } }
            let le =
              (U = j
                .filter((ce) => ce.overflows[0] <= 0)
                .sort((ce, ie) => ce.overflows[1] - ie.overflows[1])[0]) == null
                ? void 0
                : U.placement
            if (!le)
              switch (b) {
                case 'bestFit': {
                  var H
                  const ce =
                    (H = j
                      .filter((ie) => {
                        if (N) {
                          const be = tt(ie.placement)
                          return be === D || be === 'y'
                        }
                        return !0
                      })
                      .map((ie) => [
                        ie.placement,
                        ie.overflows.filter((be) => be > 0).reduce((be, ye) => be + ye, 0),
                      ])
                      .sort((ie, be) => ie[1] - be[1])[0]) == null
                      ? void 0
                      : H[0]
                  ce && (le = ce)
                  break
                }
                case 'initialPlacement':
                  le = s
                  break
              }
            if (l !== le) return { reset: { placement: le } }
          }
          return {}
        },
      }
    )
  }
function fl(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  }
}
function pl(e) {
  return rd.some((t) => e[t] >= 0)
}
const wd = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'hide',
        options: e,
        async fn(t) {
          const { rects: o, platform: a } = t,
            { strategy: l = 'referenceHidden', ...n } = rt(e, t)
          switch (l) {
            case 'referenceHidden': {
              const i = await a.detectOverflow(t, { ...n, elementContext: 'reference' }),
                s = fl(i, o.reference)
              return { data: { referenceHiddenOffsets: s, referenceHidden: pl(s) } }
            }
            case 'escaped': {
              const i = await a.detectOverflow(t, { ...n, altBoundary: !0 }),
                s = fl(i, o.floating)
              return { data: { escapedOffsets: s, escaped: pl(s) } }
            }
            default:
              return {}
          }
        },
      }
    )
  },
  yn = new Set(['left', 'top'])
async function xd(e, t) {
  const { placement: o, platform: a, elements: l } = e,
    n = await (a.isRTL == null ? void 0 : a.isRTL(l.floating)),
    i = dt(o),
    s = zt(o),
    r = tt(o) === 'y',
    d = yn.has(i) ? -1 : 1,
    u = n && r ? -1 : 1,
    f = rt(t, e)
  let {
    mainAxis: g,
    crossAxis: b,
    alignmentAxis: m,
  } = typeof f == 'number'
    ? { mainAxis: f, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: f.mainAxis || 0, crossAxis: f.crossAxis || 0, alignmentAxis: f.alignmentAxis }
  return (
    s && typeof m == 'number' && (b = s === 'end' ? m * -1 : m),
    r ? { x: b * u, y: g * d } : { x: g * d, y: b * u }
  )
}
const Sd = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: 'offset',
        options: e,
        async fn(t) {
          var o, a
          const { x: l, y: n, placement: i, middlewareData: s } = t,
            r = await xd(t, e)
          return i === ((o = s.offset) == null ? void 0 : o.placement) &&
            (a = s.arrow) != null &&
            a.alignmentOffset
            ? {}
            : { x: l + r.x, y: n + r.y, data: { ...r, placement: i } }
        },
      }
    )
  },
  Ad = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'shift',
        options: e,
        async fn(t) {
          const { x: o, y: a, placement: l, platform: n } = t,
            {
              mainAxis: i = !0,
              crossAxis: s = !1,
              limiter: r = {
                fn: (S) => {
                  let { x: D, y: B } = S
                  return { x: D, y: B }
                },
              },
              ...d
            } = rt(e, t),
            u = { x: o, y: a },
            f = await n.detectOverflow(t, d),
            g = tt(dt(l)),
            b = Po(g)
          let m = u[b],
            _ = u[g]
          if (i) {
            const S = b === 'y' ? 'top' : 'left',
              D = b === 'y' ? 'bottom' : 'right',
              B = m + f[S],
              L = m - f[D]
            m = fo(B, m, L)
          }
          if (s) {
            const S = g === 'y' ? 'top' : 'left',
              D = g === 'y' ? 'bottom' : 'right',
              B = _ + f[S],
              L = _ - f[D]
            _ = fo(B, _, L)
          }
          const k = r.fn({ ...t, [b]: m, [g]: _ })
          return { ...k, data: { x: k.x - o, y: k.y - a, enabled: { [b]: i, [g]: s } } }
        },
      }
    )
  },
  Cd = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: o, y: a, placement: l, rects: n, middlewareData: i } = t,
            { offset: s = 0, mainAxis: r = !0, crossAxis: d = !0 } = rt(e, t),
            u = { x: o, y: a },
            f = tt(l),
            g = Po(f)
          let b = u[g],
            m = u[f]
          const _ = rt(s, t),
            k =
              typeof _ == 'number'
                ? { mainAxis: _, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ..._ }
          if (r) {
            const B = g === 'y' ? 'height' : 'width',
              L = n.reference[g] - n.floating[B] + k.mainAxis,
              R = n.reference[g] + n.reference[B] - k.mainAxis
            b < L ? (b = L) : b > R && (b = R)
          }
          if (d) {
            var S, D
            const B = g === 'y' ? 'width' : 'height',
              L = yn.has(dt(l)),
              R =
                n.reference[f] -
                n.floating[B] +
                ((L && ((S = i.offset) == null ? void 0 : S[f])) || 0) +
                (L ? 0 : k.crossAxis),
              N =
                n.reference[f] +
                n.reference[B] +
                (L ? 0 : ((D = i.offset) == null ? void 0 : D[f]) || 0) -
                (L ? k.crossAxis : 0)
            m < R ? (m = R) : m > N && (m = N)
          }
          return { [g]: b, [f]: m }
        },
      }
    )
  },
  Dd = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: 'size',
        options: e,
        async fn(t) {
          var o, a
          const { placement: l, rects: n, platform: i, elements: s } = t,
            { apply: r = () => {}, ...d } = rt(e, t),
            u = await i.detectOverflow(t, d),
            f = dt(l),
            g = zt(l),
            b = tt(l) === 'y',
            { width: m, height: _ } = n.floating
          let k, S
          f === 'top' || f === 'bottom'
            ? ((k = f),
              (S =
                g === ((await (i.isRTL == null ? void 0 : i.isRTL(s.floating))) ? 'start' : 'end')
                  ? 'left'
                  : 'right'))
            : ((S = f), (k = g === 'end' ? 'top' : 'bottom'))
          const D = _ - u.top - u.bottom,
            B = m - u.left - u.right,
            L = mt(_ - u[k], D),
            R = mt(m - u[S], B),
            N = !t.middlewareData.shift
          let W = L,
            q = R
          if (
            ((o = t.middlewareData.shift) != null && o.enabled.x && (q = B),
            (a = t.middlewareData.shift) != null && a.enabled.y && (W = D),
            N && !g)
          ) {
            const j = je(u.left, 0),
              oe = je(u.right, 0),
              U = je(u.top, 0),
              H = je(u.bottom, 0)
            b
              ? (q = m - 2 * (j !== 0 || oe !== 0 ? j + oe : je(u.left, u.right)))
              : (W = _ - 2 * (U !== 0 || H !== 0 ? U + H : je(u.top, u.bottom)))
          }
          await r({ ...t, availableWidth: q, availableHeight: W })
          const P = await i.getDimensions(s.floating)
          return m !== P.width || _ !== P.height ? { reset: { rects: !0 } } : {}
        },
      }
    )
  }
function Oa() {
  return typeof window < 'u'
}
function $t(e) {
  return Vo(e) ? (e.nodeName || '').toLowerCase() : '#document'
}
function Ge(e) {
  var t
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window
}
function nt(e) {
  var t
  return (t = (Vo(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement
}
function Vo(e) {
  return Oa() ? e instanceof Node || e instanceof Ge(e).Node : !1
}
function Je(e) {
  return Oa() ? e instanceof Element || e instanceof Ge(e).Element : !1
}
function ft(e) {
  return Oa() ? e instanceof HTMLElement || e instanceof Ge(e).HTMLElement : !1
}
function gl(e) {
  return !Oa() || typeof ShadowRoot > 'u'
    ? !1
    : e instanceof ShadowRoot || e instanceof Ge(e).ShadowRoot
}
function ia(e) {
  const { overflow: t, overflowX: o, overflowY: a, display: l } = et(e)
  return /auto|scroll|overlay|hidden|clip/.test(t + a + o) && l !== 'inline' && l !== 'contents'
}
function Bd(e) {
  return /^(table|td|th)$/.test($t(e))
}
function La(e) {
  try {
    if (e.matches(':popover-open')) return !0
  } catch {}
  try {
    return e.matches(':modal')
  } catch {
    return !1
  }
}
const $d = /transform|translate|scale|rotate|perspective|filter/,
  Id = /paint|layout|strict|content/,
  St = (e) => !!e && e !== 'none'
let ao
function No(e) {
  const t = Je(e) ? et(e) : e
  return (
    St(t.transform) ||
    St(t.translate) ||
    St(t.scale) ||
    St(t.rotate) ||
    St(t.perspective) ||
    (!Wo() && (St(t.backdropFilter) || St(t.filter))) ||
    $d.test(t.willChange || '') ||
    Id.test(t.contain || '')
  )
}
function Md(e) {
  let t = ht(e)
  for (; ft(t) && !Vt(t); ) {
    if (No(t)) return t
    if (La(t)) return null
    t = ht(t)
  }
  return null
}
function Wo() {
  return (
    ao == null &&
      (ao = typeof CSS < 'u' && CSS.supports && CSS.supports('-webkit-backdrop-filter', 'none')),
    ao
  )
}
function Vt(e) {
  return /^(html|body|#document)$/.test($t(e))
}
function et(e) {
  return Ge(e).getComputedStyle(e)
}
function Fa(e) {
  return Je(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY }
}
function ht(e) {
  if ($t(e) === 'html') return e
  const t = e.assignedSlot || e.parentNode || (gl(e) && e.host) || nt(e)
  return gl(t) ? t.host : t
}
function _n(e) {
  const t = ht(e)
  return Vt(t) ? (e.ownerDocument ? e.ownerDocument.body : e.body) : ft(t) && ia(t) ? t : _n(t)
}
function ea(e, t, o) {
  var a
  ;(t === void 0 && (t = []), o === void 0 && (o = !0))
  const l = _n(e),
    n = l === ((a = e.ownerDocument) == null ? void 0 : a.body),
    i = Ge(l)
  if (n) {
    const s = go(i)
    return t.concat(i, i.visualViewport || [], ia(l) ? l : [], s && o ? ea(s) : [])
  } else return t.concat(l, ea(l, [], o))
}
function go(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null
}
function kn(e) {
  const t = et(e)
  let o = parseFloat(t.width) || 0,
    a = parseFloat(t.height) || 0
  const l = ft(e),
    n = l ? e.offsetWidth : o,
    i = l ? e.offsetHeight : a,
    s = ya(o) !== n || ya(a) !== i
  return (s && ((o = n), (a = i)), { width: o, height: a, $: s })
}
function Ho(e) {
  return Je(e) ? e : e.contextElement
}
function Et(e) {
  const t = Ho(e)
  if (!ft(t)) return at(1)
  const o = t.getBoundingClientRect(),
    { width: a, height: l, $: n } = kn(t)
  let i = (n ? ya(o.width) : o.width) / a,
    s = (n ? ya(o.height) : o.height) / l
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: i, y: s }
  )
}
const Od = at(0)
function wn(e) {
  const t = Ge(e)
  return !Wo() || !t.visualViewport
    ? Od
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop }
}
function Ld(e, t, o) {
  return (t === void 0 && (t = !1), !o || (t && o !== Ge(e)) ? !1 : t)
}
function Ct(e, t, o, a) {
  ;(t === void 0 && (t = !1), o === void 0 && (o = !1))
  const l = e.getBoundingClientRect(),
    n = Ho(e)
  let i = at(1)
  t && (a ? Je(a) && (i = Et(a)) : (i = Et(e)))
  const s = Ld(n, o, a) ? wn(n) : at(0)
  let r = (l.left + s.x) / i.x,
    d = (l.top + s.y) / i.y,
    u = l.width / i.x,
    f = l.height / i.y
  if (n) {
    const g = Ge(n),
      b = a && Je(a) ? Ge(a) : a
    let m = g,
      _ = go(m)
    for (; _ && a && b !== m; ) {
      const k = Et(_),
        S = _.getBoundingClientRect(),
        D = et(_),
        B = S.left + (_.clientLeft + parseFloat(D.paddingLeft)) * k.x,
        L = S.top + (_.clientTop + parseFloat(D.paddingTop)) * k.y
      ;((r *= k.x),
        (d *= k.y),
        (u *= k.x),
        (f *= k.y),
        (r += B),
        (d += L),
        (m = Ge(_)),
        (_ = go(m)))
    }
  }
  return ka({ width: u, height: f, x: r, y: d })
}
function qa(e, t) {
  const o = Fa(e).scrollLeft
  return t ? t.left + o : Ct(nt(e)).left + o
}
function xn(e, t) {
  const o = e.getBoundingClientRect(),
    a = o.left + t.scrollLeft - qa(e, o),
    l = o.top + t.scrollTop
  return { x: a, y: l }
}
function Fd(e) {
  let { elements: t, rect: o, offsetParent: a, strategy: l } = e
  const n = l === 'fixed',
    i = nt(a),
    s = t ? La(t.floating) : !1
  if (a === i || (s && n)) return o
  let r = { scrollLeft: 0, scrollTop: 0 },
    d = at(1)
  const u = at(0),
    f = ft(a)
  if ((f || (!f && !n)) && (($t(a) !== 'body' || ia(i)) && (r = Fa(a)), f)) {
    const b = Ct(a)
    ;((d = Et(a)), (u.x = b.x + a.clientLeft), (u.y = b.y + a.clientTop))
  }
  const g = i && !f && !n ? xn(i, r) : at(0)
  return {
    width: o.width * d.x,
    height: o.height * d.y,
    x: o.x * d.x - r.scrollLeft * d.x + u.x + g.x,
    y: o.y * d.y - r.scrollTop * d.y + u.y + g.y,
  }
}
function qd(e) {
  return Array.from(e.getClientRects())
}
function Ed(e) {
  const t = nt(e),
    o = Fa(e),
    a = e.ownerDocument.body,
    l = je(t.scrollWidth, t.clientWidth, a.scrollWidth, a.clientWidth),
    n = je(t.scrollHeight, t.clientHeight, a.scrollHeight, a.clientHeight)
  let i = -o.scrollLeft + qa(e)
  const s = -o.scrollTop
  return (
    et(a).direction === 'rtl' && (i += je(t.clientWidth, a.clientWidth) - l),
    { width: l, height: n, x: i, y: s }
  )
}
const vl = 25
function Pd(e, t) {
  const o = Ge(e),
    a = nt(e),
    l = o.visualViewport
  let n = a.clientWidth,
    i = a.clientHeight,
    s = 0,
    r = 0
  if (l) {
    ;((n = l.width), (i = l.height))
    const u = Wo()
    ;(!u || (u && t === 'fixed')) && ((s = l.offsetLeft), (r = l.offsetTop))
  }
  const d = qa(a)
  if (d <= 0) {
    const u = a.ownerDocument,
      f = u.body,
      g = getComputedStyle(f),
      b =
        (u.compatMode === 'CSS1Compat' && parseFloat(g.marginLeft) + parseFloat(g.marginRight)) ||
        0,
      m = Math.abs(a.clientWidth - f.clientWidth - b)
    m <= vl && (n -= m)
  } else d <= vl && (n += d)
  return { width: n, height: i, x: s, y: r }
}
function Td(e, t) {
  const o = Ct(e, !0, t === 'fixed'),
    a = o.top + e.clientTop,
    l = o.left + e.clientLeft,
    n = ft(e) ? Et(e) : at(1),
    i = e.clientWidth * n.x,
    s = e.clientHeight * n.y,
    r = l * n.x,
    d = a * n.y
  return { width: i, height: s, x: r, y: d }
}
function ml(e, t, o) {
  let a
  if (t === 'viewport') a = Pd(e, o)
  else if (t === 'document') a = Ed(nt(e))
  else if (Je(t)) a = Td(t, o)
  else {
    const l = wn(e)
    a = { x: t.x - l.x, y: t.y - l.y, width: t.width, height: t.height }
  }
  return ka(a)
}
function Sn(e, t) {
  const o = ht(e)
  return o === t || !Je(o) || Vt(o) ? !1 : et(o).position === 'fixed' || Sn(o, t)
}
function Rd(e, t) {
  const o = t.get(e)
  if (o) return o
  let a = ea(e, [], !1).filter((s) => Je(s) && $t(s) !== 'body'),
    l = null
  const n = et(e).position === 'fixed'
  let i = n ? ht(e) : e
  for (; Je(i) && !Vt(i); ) {
    const s = et(i),
      r = No(i)
    ;(!r && s.position === 'fixed' && (l = null),
      (
        n
          ? !r && !l
          : (!r &&
              s.position === 'static' &&
              !!l &&
              (l.position === 'absolute' || l.position === 'fixed')) ||
            (ia(i) && !r && Sn(e, i))
      )
        ? (a = a.filter((u) => u !== i))
        : (l = s),
      (i = ht(i)))
  }
  return (t.set(e, a), a)
}
function Vd(e) {
  let { element: t, boundary: o, rootBoundary: a, strategy: l } = e
  const i = [...(o === 'clippingAncestors' ? (La(t) ? [] : Rd(t, this._c)) : [].concat(o)), a],
    s = ml(t, i[0], l)
  let r = s.top,
    d = s.right,
    u = s.bottom,
    f = s.left
  for (let g = 1; g < i.length; g++) {
    const b = ml(t, i[g], l)
    ;((r = je(b.top, r)), (d = mt(b.right, d)), (u = mt(b.bottom, u)), (f = je(b.left, f)))
  }
  return { width: d - f, height: u - r, x: f, y: r }
}
function Nd(e) {
  const { width: t, height: o } = kn(e)
  return { width: t, height: o }
}
function Wd(e, t, o) {
  const a = ft(t),
    l = nt(t),
    n = o === 'fixed',
    i = Ct(e, !0, n, t)
  let s = { scrollLeft: 0, scrollTop: 0 }
  const r = at(0)
  function d() {
    r.x = qa(l)
  }
  if (a || (!a && !n))
    if ((($t(t) !== 'body' || ia(l)) && (s = Fa(t)), a)) {
      const b = Ct(t, !0, n, t)
      ;((r.x = b.x + t.clientLeft), (r.y = b.y + t.clientTop))
    } else l && d()
  n && !a && l && d()
  const u = l && !a && !n ? xn(l, s) : at(0),
    f = i.left + s.scrollLeft - r.x - u.x,
    g = i.top + s.scrollTop - r.y - u.y
  return { x: f, y: g, width: i.width, height: i.height }
}
function oo(e) {
  return et(e).position === 'static'
}
function hl(e, t) {
  if (!ft(e) || et(e).position === 'fixed') return null
  if (t) return t(e)
  let o = e.offsetParent
  return (nt(e) === o && (o = o.ownerDocument.body), o)
}
function An(e, t) {
  const o = Ge(e)
  if (La(e)) return o
  if (!ft(e)) {
    let l = ht(e)
    for (; l && !Vt(l); ) {
      if (Je(l) && !oo(l)) return l
      l = ht(l)
    }
    return o
  }
  let a = hl(e, t)
  for (; a && Bd(a) && oo(a); ) a = hl(a, t)
  return a && Vt(a) && oo(a) && !No(a) ? o : a || Md(e) || o
}
const Hd = async function (e) {
  const t = this.getOffsetParent || An,
    o = this.getDimensions,
    a = await o(e.floating)
  return {
    reference: Wd(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: a.width, height: a.height },
  }
}
function jd(e) {
  return et(e).direction === 'rtl'
}
const Gd = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Fd,
  getDocumentElement: nt,
  getClippingRect: Vd,
  getOffsetParent: An,
  getElementRects: Hd,
  getClientRects: qd,
  getDimensions: Nd,
  getScale: Et,
  isElement: Je,
  isRTL: jd,
}
function Cn(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
}
function zd(e, t) {
  let o = null,
    a
  const l = nt(e)
  function n() {
    var s
    ;(clearTimeout(a), (s = o) == null || s.disconnect(), (o = null))
  }
  function i(s, r) {
    ;(s === void 0 && (s = !1), r === void 0 && (r = 1), n())
    const d = e.getBoundingClientRect(),
      { left: u, top: f, width: g, height: b } = d
    if ((s || t(), !g || !b)) return
    const m = fa(f),
      _ = fa(l.clientWidth - (u + g)),
      k = fa(l.clientHeight - (f + b)),
      S = fa(u),
      B = {
        rootMargin: -m + 'px ' + -_ + 'px ' + -k + 'px ' + -S + 'px',
        threshold: je(0, mt(1, r)) || 1,
      }
    let L = !0
    function R(N) {
      const W = N[0].intersectionRatio
      if (W !== r) {
        if (!L) return i()
        W
          ? i(!1, W)
          : (a = setTimeout(() => {
              i(!1, 1e-7)
            }, 1e3))
      }
      ;(W === 1 && !Cn(d, e.getBoundingClientRect()) && i(), (L = !1))
    }
    try {
      o = new IntersectionObserver(R, { ...B, root: l.ownerDocument })
    } catch {
      o = new IntersectionObserver(R, B)
    }
    o.observe(e)
  }
  return (i(!0), n)
}
function Ud(e, t, o, a) {
  a === void 0 && (a = {})
  const {
      ancestorScroll: l = !0,
      ancestorResize: n = !0,
      elementResize: i = typeof ResizeObserver == 'function',
      layoutShift: s = typeof IntersectionObserver == 'function',
      animationFrame: r = !1,
    } = a,
    d = Ho(e),
    u = l || n ? [...(d ? ea(d) : []), ...(t ? ea(t) : [])] : []
  u.forEach((S) => {
    ;(l && S.addEventListener('scroll', o, { passive: !0 }), n && S.addEventListener('resize', o))
  })
  const f = d && s ? zd(d, o) : null
  let g = -1,
    b = null
  i &&
    ((b = new ResizeObserver((S) => {
      let [D] = S
      ;(D &&
        D.target === d &&
        b &&
        t &&
        (b.unobserve(t),
        cancelAnimationFrame(g),
        (g = requestAnimationFrame(() => {
          var B
          ;(B = b) == null || B.observe(t)
        }))),
        o())
    })),
    d && !r && b.observe(d),
    t && b.observe(t))
  let m,
    _ = r ? Ct(e) : null
  r && k()
  function k() {
    const S = Ct(e)
    ;(_ && !Cn(_, S) && o(), (_ = S), (m = requestAnimationFrame(k)))
  }
  return (
    o(),
    () => {
      var S
      ;(u.forEach((D) => {
        ;(l && D.removeEventListener('scroll', o), n && D.removeEventListener('resize', o))
      }),
        f?.(),
        (S = b) == null || S.disconnect(),
        (b = null),
        r && cancelAnimationFrame(m))
    }
  )
}
const Kd = Sd,
  Zd = Ad,
  bl = kd,
  Yd = Dd,
  Xd = wd,
  Qd = _d,
  Jd = Cd,
  eu = (e, t, o) => {
    const a = new Map(),
      l = { platform: Gd, ...o },
      n = { ...l.platform, _c: a }
    return yd(e, t, { ...l, platform: n })
  }
function tu(e) {
  return e != null && typeof e == 'object' && '$el' in e
}
function vo(e) {
  if (tu(e)) {
    const t = e.$el
    return Vo(t) && $t(t) === '#comment' ? null : t
  }
  return e
}
function qt(e) {
  return typeof e == 'function' ? e() : v(e)
}
function au(e) {
  return {
    name: 'arrow',
    options: e,
    fn(t) {
      const o = vo(qt(e.element))
      return o == null ? {} : Qd({ element: o, padding: e.padding }).fn(t)
    },
  }
}
function Dn(e) {
  return typeof window > 'u' ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1
}
function yl(e, t) {
  const o = Dn(e)
  return Math.round(t * o) / o
}
function ou(e, t, o) {
  o === void 0 && (o = {})
  const a = o.whileElementsMounted,
    l = y(() => {
      var W
      return (W = qt(o.open)) != null ? W : !0
    }),
    n = y(() => qt(o.middleware)),
    i = y(() => {
      var W
      return (W = qt(o.placement)) != null ? W : 'bottom'
    }),
    s = y(() => {
      var W
      return (W = qt(o.strategy)) != null ? W : 'absolute'
    }),
    r = y(() => {
      var W
      return (W = qt(o.transform)) != null ? W : !0
    }),
    d = y(() => vo(e.value)),
    u = y(() => vo(t.value)),
    f = C(0),
    g = C(0),
    b = C(s.value),
    m = C(i.value),
    _ = Dt({}),
    k = C(!1),
    S = y(() => {
      const W = { position: b.value, left: '0', top: '0' }
      if (!u.value) return W
      const q = yl(u.value, f.value),
        P = yl(u.value, g.value)
      return r.value
        ? {
            ...W,
            transform: 'translate(' + q + 'px, ' + P + 'px)',
            ...(Dn(u.value) >= 1.5 && { willChange: 'transform' }),
          }
        : { position: b.value, left: q + 'px', top: P + 'px' }
    })
  let D
  function B() {
    if (d.value == null || u.value == null) return
    const W = l.value
    eu(d.value, u.value, { middleware: n.value, placement: i.value, strategy: s.value }).then(
      (q) => {
        ;((f.value = q.x),
          (g.value = q.y),
          (b.value = q.strategy),
          (m.value = q.placement),
          (_.value = q.middlewareData),
          (k.value = W !== !1))
      },
    )
  }
  function L() {
    typeof D == 'function' && (D(), (D = void 0))
  }
  function R() {
    if ((L(), a === void 0)) {
      B()
      return
    }
    if (d.value != null && u.value != null) {
      D = a(d.value, u.value, B)
      return
    }
  }
  function N() {
    l.value || (k.value = !1)
  }
  return (
    pe([n, i, s, l], B, { flush: 'sync' }),
    pe([d, u], R, { flush: 'sync' }),
    pe(l, N, { flush: 'sync' }),
    Kl() && Zl(L),
    {
      x: Lt(f),
      y: Lt(g),
      strategy: Lt(b),
      placement: Lt(m),
      middlewareData: Lt(_),
      isPositioned: Lt(k),
      floatingStyles: S,
      update: B,
    }
  )
}
const lu = {
    side: 'bottom',
    sideOffset: 0,
    sideFlip: !0,
    align: 'center',
    alignOffset: 0,
    alignFlip: !0,
    arrowPadding: 0,
    hideShiftedArrow: !0,
    avoidCollisions: !0,
    collisionBoundary: () => [],
    collisionPadding: 0,
    sticky: 'partial',
    hideWhenDetached: !1,
    positionStrategy: 'fixed',
    updatePositionStrategy: 'optimized',
    prioritizePosition: !1,
  },
  [Jw, nu] = Re('PopperContent')
var iu = x({
    inheritAttrs: !1,
    __name: 'PopperContent',
    props: Ri(
      {
        side: { type: null, required: !1 },
        sideOffset: { type: Number, required: !1 },
        sideFlip: { type: Boolean, required: !1 },
        align: { type: null, required: !1 },
        alignOffset: { type: Number, required: !1 },
        alignFlip: { type: Boolean, required: !1 },
        avoidCollisions: { type: Boolean, required: !1 },
        collisionBoundary: { type: null, required: !1 },
        collisionPadding: { type: [Number, Object], required: !1 },
        arrowPadding: { type: Number, required: !1 },
        hideShiftedArrow: { type: Boolean, required: !1 },
        sticky: { type: String, required: !1 },
        hideWhenDetached: { type: Boolean, required: !1 },
        positionStrategy: { type: String, required: !1 },
        updatePositionStrategy: { type: String, required: !1 },
        disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
        prioritizePosition: { type: Boolean, required: !1 },
        reference: { type: null, required: !1 },
        asChild: { type: Boolean, required: !1 },
        as: { type: null, required: !1 },
      },
      { ...lu },
    ),
    emits: ['placed'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = vn(),
        { forwardRef: n, currentElement: i } = ve(),
        s = C(),
        r = C(),
        { width: d, height: u } = ws(r),
        f = y(() => o.side + (o.align !== 'center' ? `-${o.align}` : '')),
        g = y(() =>
          typeof o.collisionPadding == 'number'
            ? o.collisionPadding
            : { top: 0, right: 0, bottom: 0, left: 0, ...o.collisionPadding },
        ),
        b = y(() =>
          Array.isArray(o.collisionBoundary) ? o.collisionBoundary : [o.collisionBoundary],
        ),
        m = y(() => ({
          padding: g.value,
          boundary: b.value.filter(id),
          altBoundary: b.value.length > 0,
        })),
        _ = y(() => ({ mainAxis: o.sideFlip, crossAxis: o.alignFlip })),
        k = Yi(() => [
          Kd({ mainAxis: o.sideOffset + u.value, alignmentAxis: o.alignOffset }),
          o.prioritizePosition && o.avoidCollisions && bl({ ...m.value, ..._.value }),
          o.avoidCollisions &&
            Zd({
              mainAxis: !0,
              crossAxis: !!o.prioritizePosition,
              limiter: o.sticky === 'partial' ? Jd() : void 0,
              ...m.value,
            }),
          !o.prioritizePosition && o.avoidCollisions && bl({ ...m.value, ..._.value }),
          Yd({
            ...m.value,
            apply: ({ elements: U, rects: H, availableWidth: G, availableHeight: ne }) => {
              const { width: le, height: ce } = H.reference,
                ie = U.floating.style
              ;(ie.setProperty('--reka-popper-available-width', `${G}px`),
                ie.setProperty('--reka-popper-available-height', `${ne}px`),
                ie.setProperty('--reka-popper-anchor-width', `${le}px`),
                ie.setProperty('--reka-popper-anchor-height', `${ce}px`))
            },
          }),
          r.value && au({ element: r.value, padding: o.arrowPadding }),
          sd({ arrowWidth: d.value, arrowHeight: u.value }),
          o.hideWhenDetached && Xd({ strategy: 'referenceHidden', ...m.value }),
        ]),
        S = y(() => o.reference ?? l.anchor.value),
        {
          floatingStyles: D,
          placement: B,
          isPositioned: L,
          middlewareData: R,
        } = ou(S, s, {
          strategy: o.positionStrategy,
          placement: f,
          whileElementsMounted: (...U) =>
            Ud(...U, {
              layoutShift: !o.disableUpdateOnLayoutShift,
              animationFrame: o.updatePositionStrategy === 'always',
            }),
          middleware: k,
        }),
        N = y(() => co(B.value)[0]),
        W = y(() => co(B.value)[1])
      Jl(() => {
        L.value && a('placed')
      })
      const q = y(() => {
          const U = R.value.arrow?.centerOffset !== 0
          return o.hideShiftedArrow && U
        }),
        P = C('')
      ot(() => {
        i.value && (P.value = window.getComputedStyle(i.value).zIndex)
      })
      const j = y(() => R.value.arrow?.x ?? 0),
        oe = y(() => R.value.arrow?.y ?? 0)
      return (
        nu({
          placedSide: N,
          onArrowChange: (U) => (r.value = U),
          arrowX: j,
          arrowY: oe,
          shouldHideArrow: q,
        }),
        (U, H) => (
          c(),
          h(
            'div',
            {
              ref_key: 'floatingRef',
              ref: s,
              'data-reka-popper-content-wrapper': '',
              style: xe({
                ...v(D),
                transform: v(L) ? v(D).transform : 'translate(0, -200%)',
                minWidth: 'max-content',
                zIndex: P.value,
                '--reka-popper-transform-origin': [
                  v(R).transformOrigin?.x,
                  v(R).transformOrigin?.y,
                ].join(' '),
                ...(v(R).hide?.referenceHidden && { visibility: 'hidden', pointerEvents: 'none' }),
              }),
            },
            [
              E(
                v(_e),
                te({ ref: v(n) }, U.$attrs, {
                  'as-child': o.asChild,
                  as: U.as,
                  'data-side': N.value,
                  'data-align': W.value,
                  style: { animation: v(L) ? void 0 : 'none' },
                }),
                { default: w(() => [A(U.$slots, 'default')]), _: 3 },
                16,
                ['as-child', 'as', 'data-side', 'data-align', 'style'],
              ),
            ],
            4,
          )
        )
      )
    },
  }),
  Bn = iu
const [It, su] = Re('ComboboxRoot')
var ru = x({
    __name: 'ComboboxRoot',
    props: {
      open: { type: Boolean, required: !1, default: void 0 },
      defaultOpen: { type: Boolean, required: !1 },
      resetSearchTermOnBlur: { type: Boolean, required: !1, default: !0 },
      resetSearchTermOnSelect: { type: Boolean, required: !1, default: !0 },
      openOnFocus: { type: Boolean, required: !1, default: !1 },
      openOnClick: { type: Boolean, required: !1, default: !1 },
      ignoreFilter: { type: Boolean, required: !1 },
      resetModelValueOnClear: { type: Boolean, required: !1, default: !1 },
      modelValue: { type: null, required: !1 },
      defaultValue: { type: null, required: !1 },
      multiple: { type: Boolean, required: !1 },
      dir: { type: String, required: !1 },
      disabled: { type: Boolean, required: !1 },
      highlightOnHover: { type: Boolean, required: !1, default: !0 },
      by: { type: [String, Function], required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      name: { type: String, required: !1 },
      required: { type: Boolean, required: !1 },
    },
    emits: ['update:modelValue', 'highlight', 'update:open'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        { primitiveElement: n, currentElement: i } = vt(),
        {
          multiple: s,
          disabled: r,
          ignoreFilter: d,
          resetSearchTermOnSelect: u,
          openOnFocus: f,
          openOnClick: g,
          dir: b,
          resetModelValueOnClear: m,
          highlightOnHover: _,
        } = We(a),
        k = la(b),
        S = Qe(a, 'modelValue', l, {
          defaultValue: a.defaultValue ?? (s.value ? [] : void 0),
          passive: a.modelValue === void 0,
          deep: !0,
        }),
        D = Qe(a, 'open', l, { defaultValue: a.defaultOpen, passive: a.open === void 0 })
      async function B(le) {
        ;((D.value = le),
          (H.value = ''),
          le
            ? (await he(), n.value?.highlightSelected(), (R.value = !0), W.value?.focus())
            : ((R.value = !1),
              setTimeout(() => {
                !le && a.resetSearchTermOnBlur && L.trigger()
              }, 1)))
      }
      const L = va(),
        R = C(!1),
        N = C(!1),
        W = C(),
        q = C(),
        P = y(() => n.value?.highlightedElement ?? void 0),
        j = C(new Map()),
        oe = C(new Map()),
        { contains: U } = vs({ sensitivity: 'base' }),
        H = C(''),
        G = y((le) => {
          if (!H.value || a.ignoreFilter || N.value)
            return {
              count: j.value.size,
              items: le?.items ?? new Map(),
              groups: le?.groups ?? new Set(oe.value.keys()),
            }
          let ce = 0
          const ie = new Map(),
            be = new Set()
          for (const [ye, Ae] of j.value) {
            const Se = U(Ae, H.value)
            ;(ie.set(ye, Se ? 1 : 0), Se && ce++)
          }
          for (const [ye, Ae] of oe.value)
            for (const Se of Ae)
              if (ie.get(Se) > 0) {
                be.add(ye)
                break
              }
          return { count: ce, items: ie, groups: be }
        }),
        ne = ge()
      return (
        we(() => {
          ne?.exposed &&
            ((ne.exposed.highlightItem = n.value?.highlightItem),
            (ne.exposed.highlightFirstItem = n.value?.highlightFirstItem),
            (ne.exposed.highlightSelected = n.value?.highlightSelected))
        }),
        t({
          filtered: G,
          highlightedElement: P,
          highlightItem: n.value?.highlightItem,
          highlightFirstItem: n.value?.highlightFirstItem,
          highlightSelected: n.value?.highlightSelected,
        }),
        su({
          modelValue: S,
          multiple: s,
          disabled: r,
          open: D,
          onOpenChange: B,
          contentId: '',
          isUserInputted: R,
          isVirtual: N,
          inputElement: W,
          highlightedElement: P,
          onInputElementChange: (le) => (W.value = le),
          triggerElement: q,
          onTriggerElementChange: (le) => (q.value = le),
          parentElement: i,
          resetSearchTermOnSelect: u,
          onResetSearchTerm: L.on,
          allItems: j,
          allGroups: oe,
          filterSearch: H,
          filterState: G,
          ignoreFilter: d,
          openOnFocus: f,
          openOnClick: g,
          resetModelValueOnClear: m,
        }),
        (le, ce) => (
          c(),
          $(v(mn), null, {
            default: w(() => [
              E(
                v(Gr),
                te({ ref_key: 'primitiveElement', ref: n }, le.$attrs, {
                  modelValue: v(S),
                  'onUpdate:modelValue': ce[0] || (ce[0] = (ie) => (Xt(S) ? (S.value = ie) : null)),
                  style: { pointerEvents: v(D) ? 'auto' : void 0 },
                  as: le.as,
                  'as-child': le.asChild,
                  dir: v(k),
                  multiple: v(s),
                  name: le.name,
                  required: le.required,
                  disabled: v(r),
                  'highlight-on-hover': v(_),
                  by: a.by,
                  onHighlight: ce[1] || (ce[1] = (ie) => l('highlight', ie)),
                }),
                {
                  default: w(() => [A(le.$slots, 'default', { open: v(D), modelValue: v(S) })]),
                  _: 3,
                },
                16,
                [
                  'modelValue',
                  'style',
                  'as',
                  'as-child',
                  'dir',
                  'multiple',
                  'name',
                  'required',
                  'disabled',
                  'highlight-on-hover',
                  'by',
                ],
              ),
            ]),
            _: 3,
          })
        )
      )
    },
  }),
  Ea = ru,
  du = x({
    __name: 'ComboboxAnchor',
    props: {
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const { forwardRef: t } = ve()
      return (o, a) => (
        c(),
        $(
          v(hn),
          { 'as-child': '', reference: o.reference },
          {
            default: w(() => [
              E(
                v(_e),
                te({ ref: v(t), 'as-child': o.asChild, as: o.as }, o.$attrs),
                { default: w(() => [A(o.$slots, 'default')]), _: 3 },
                16,
                ['as-child', 'as'],
              ),
            ]),
            _: 3,
          },
          8,
          ['reference'],
        )
      )
    },
  }),
  Pa = du
const [e2, uu] = Re('ComboboxContent')
var cu = x({
    __name: 'ComboboxContentImpl',
    props: {
      position: { type: String, required: !1, default: 'inline' },
      bodyLock: { type: Boolean, required: !1 },
      hideWhenEmpty: { type: Boolean, required: !1 },
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: ['escapeKeyDown', 'pointerDownOutside', 'focusOutside', 'interactOutside'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { position: l } = We(o),
        n = It(),
        i = y(() =>
          n.ignoreFilter.value ? n.allItems.value.size === 0 : n.filterState.value.count === 0,
        ),
        { forwardRef: s, currentElement: r } = ve()
      ;(Io(o.bodyLock), sn(), Oo(n.parentElement))
      const d = y(() => (o.position === 'popper' ? o : {})),
        u = Mo(d.value),
        f = {
          boxSizing: 'border-box',
          '--reka-combobox-content-transform-origin': 'var(--reka-popper-transform-origin)',
          '--reka-combobox-content-available-width': 'var(--reka-popper-available-width)',
          '--reka-combobox-content-available-height': 'var(--reka-popper-available-height)',
          '--reka-combobox-trigger-width': 'var(--reka-popper-anchor-width)',
          '--reka-combobox-trigger-height': 'var(--reka-popper-anchor-height)',
        }
      uu({ position: l })
      const g = C(!1)
      return (
        we(() => {
          n.inputElement.value &&
            ((g.value = r.value.contains(n.inputElement.value)),
            g.value && n.inputElement.value.focus())
        }),
        Te(() => {
          const b = Ye()
          g.value && (!b || b === document.body) && n.triggerElement.value?.focus()
        }),
        (b, m) => (
          c(),
          $(
            v(Ur),
            { 'as-child': '' },
            {
              default: w(() => [
                E(
                  v(qo),
                  {
                    'as-child': '',
                    onMountAutoFocus: m[5] || (m[5] = Ce(() => {}, ['prevent'])),
                    onUnmountAutoFocus: m[6] || (m[6] = Ce(() => {}, ['prevent'])),
                  },
                  {
                    default: w(() => [
                      E(
                        v(Fo),
                        {
                          'as-child': '',
                          'disable-outside-pointer-events': b.disableOutsidePointerEvents,
                          onDismiss: m[0] || (m[0] = (_) => v(n).onOpenChange(!1)),
                          onFocusOutside:
                            m[1] ||
                            (m[1] = (_) => {
                              ;(v(n).parentElement.value?.contains(_.target) && _.preventDefault(),
                                a('focusOutside', _))
                            }),
                          onInteractOutside: m[2] || (m[2] = (_) => a('interactOutside', _)),
                          onEscapeKeyDown: m[3] || (m[3] = (_) => a('escapeKeyDown', _)),
                          onPointerDownOutside:
                            m[4] ||
                            (m[4] = (_) => {
                              ;(v(n).parentElement.value?.contains(_.target) && _.preventDefault(),
                                a('pointerDownOutside', _))
                            }),
                        },
                        {
                          default: w(() => [
                            (c(),
                            $(
                              ke(v(l) === 'popper' ? v(Bn) : v(_e)),
                              te(
                                { ...b.$attrs, ...v(u) },
                                {
                                  id: v(n).contentId,
                                  ref: v(s),
                                  'data-state': v(n).open.value ? 'open' : 'closed',
                                  'data-empty': i.value ? '' : void 0,
                                  style: {
                                    display: o.hideWhenEmpty && i.value ? 'none' : 'flex',
                                    flexDirection: 'column',
                                    outline: 'none',
                                    ...(v(l) === 'popper' ? f : {}),
                                  },
                                },
                              ),
                              { default: w(() => [A(b.$slots, 'default')]), _: 3 },
                              16,
                              ['id', 'data-state', 'data-empty', 'style'],
                            )),
                          ]),
                          _: 3,
                        },
                        8,
                        ['disable-outside-pointer-events'],
                      ),
                    ]),
                    _: 3,
                  },
                ),
              ]),
              _: 3,
            },
          )
        )
      )
    },
  }),
  fu = cu,
  pu = x({
    __name: 'ComboboxContent',
    props: {
      forceMount: { type: Boolean, required: !1 },
      position: { type: String, required: !1 },
      bodyLock: { type: Boolean, required: !1 },
      hideWhenEmpty: { type: Boolean, required: !1 },
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: ['escapeKeyDown', 'pointerDownOutside', 'focusOutside', 'interactOutside'],
    setup(e, { emit: t }) {
      const l = $a(e, t),
        { forwardRef: n } = ve(),
        i = It()
      return (
        (i.contentId ||= lt(void 0, 'reka-combobox-content')),
        (s, r) => (
          c(),
          $(
            v(Gt),
            { present: s.forceMount || v(i).open.value },
            {
              default: w(() => [
                E(
                  fu,
                  te({ ...v(l), ...s.$attrs }, { ref: v(n) }),
                  { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                  16,
                ),
              ]),
              _: 3,
            },
            8,
            ['present'],
          )
        )
      )
    },
  }),
  Ta = pu,
  gu = x({
    __name: 'ComboboxEmpty',
    props: { asChild: { type: Boolean, required: !1 }, as: { type: null, required: !1 } },
    setup(e) {
      const t = e,
        o = It(),
        a = y(() =>
          o.ignoreFilter.value ? o.allItems.value.size === 0 : o.filterState.value.count === 0,
        )
      return (l, n) =>
        a.value
          ? (c(),
            $(
              v(_e),
              ut(te({ key: 0 }, t)),
              {
                default: w(() => [
                  A(l.$slots, 'default', {}, () => [n[0] || (n[0] = de('No options'))]),
                ]),
                _: 3,
              },
              16,
            ))
          : O('v-if', !0)
    },
  }),
  jo = gu
const [vu] = Re('ComboboxGroup')
var mu = x({
    __name: 'ComboboxInput',
    props: {
      displayValue: { type: Function, required: !1 },
      modelValue: { type: String, required: !1 },
      autoFocus: { type: Boolean, required: !1 },
      disabled: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'input' },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = It(),
        n = Ma(),
        { primitiveElement: i, currentElement: s } = vt(),
        r = Qe(o, 'modelValue', a, { passive: o.modelValue === void 0 })
      we(() => {
        s.value && l.onInputElementChange(s.value)
      })
      function d(m) {
        l.open.value || l.onOpenChange(!0)
      }
      function u(m) {
        const _ = m.target
        l.open.value
          ? (l.filterSearch.value = _.value)
          : (l.onOpenChange(!0),
            he(() => {
              _.value && ((l.filterSearch.value = _.value), n.highlightFirstItem())
            }))
      }
      function f() {
        l.openOnFocus.value && !l.open.value && l.onOpenChange(!0)
      }
      function g() {
        l.openOnClick.value && !l.open.value && l.onOpenChange(!0)
      }
      function b() {
        const m = l.modelValue.value
        ;(o.displayValue
          ? (r.value = o.displayValue(m))
          : !l.multiple.value && m && !Array.isArray(m) && typeof m != 'object'
            ? (r.value = m.toString())
            : (r.value = ''),
          he(() => {
            r.value = r.value
          }))
      }
      return (
        l.onResetSearchTerm(() => {
          b()
        }),
        pe(
          l.modelValue,
          async () => {
            !l.isUserInputted.value && l.resetSearchTermOnSelect.value && b()
          },
          { immediate: !0, deep: !0 },
        ),
        pe(l.filterState, (m, _) => {
          !l.isVirtual.value && _.count === 0 && n.highlightFirstItem()
        }),
        (m, _) => (
          c(),
          $(
            v(Zr),
            {
              ref_key: 'primitiveElement',
              ref: i,
              modelValue: v(r),
              'onUpdate:modelValue': _[0] || (_[0] = (k) => (Xt(r) ? (r.value = k) : null)),
              as: m.as,
              'as-child': m.asChild,
              'auto-focus': m.autoFocus,
              disabled: m.disabled,
              'aria-expanded': v(l).open.value,
              'aria-controls': v(l).contentId,
              'aria-autocomplete': 'list',
              role: 'combobox',
              autocomplete: 'off',
              onClick: g,
              onInput: u,
              onKeydown: gt(Ce(d, ['prevent']), ['down', 'up']),
              onFocus: f,
            },
            { default: w(() => [A(m.$slots, 'default')]), _: 3 },
            8,
            [
              'modelValue',
              'as',
              'as-child',
              'auto-focus',
              'disabled',
              'aria-expanded',
              'aria-controls',
              'onKeydown',
            ],
          )
        )
      )
    },
  }),
  Ra = mu,
  hu = x({
    __name: 'ComboboxItem',
    props: {
      textValue: { type: String, required: !1 },
      value: { type: null, required: !0 },
      disabled: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['select'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = lt(void 0, 'reka-combobox-item'),
        n = It(),
        i = vu(null),
        { primitiveElement: s, currentElement: r } = vt()
      if (o.value === '')
        throw new Error(
          'A <ComboboxItem /> must have a value prop that is not an empty string. This is because the Combobox value can be set to an empty string to clear the selection and show the placeholder.',
        )
      const d = y(() => {
        if (n.isVirtual.value || n.ignoreFilter.value || !n.filterSearch.value) return !0
        {
          const u = n.filterState.value.items.get(l)
          return u === void 0 ? !0 : u > 0
        }
      })
      return (
        we(() => {
          n.allItems.value.set(l, o.textValue || r.value.textContent || r.value.innerText)
          const u = i?.id
          u &&
            (n.allGroups.value.has(u)
              ? n.allGroups.value.get(u)?.add(l)
              : n.allGroups.value.set(u, new Set([l])))
        }),
        Te(() => {
          n.allItems.value.delete(l)
        }),
        (u, f) =>
          d.value
            ? (c(),
              $(
                v(ed),
                te({ key: 0 }, o, {
                  id: v(l),
                  ref_key: 'primitiveElement',
                  ref: s,
                  disabled: v(n).disabled.value || u.disabled,
                  onSelect:
                    f[0] ||
                    (f[0] = (g) => {
                      ;(a('select', g),
                        !g.defaultPrevented &&
                          !v(n).multiple.value &&
                          !u.disabled &&
                          !v(n).disabled.value &&
                          (g.preventDefault(),
                          v(n).onOpenChange(!1),
                          (v(n).modelValue.value = o.value)))
                    }),
                }),
                { default: w(() => [A(u.$slots, 'default', {}, () => [de(M(u.value), 1)])]), _: 3 },
                16,
                ['id', 'disabled'],
              ))
            : O('v-if', !0)
      )
    },
  }),
  Va = hu,
  bu = x({
    __name: 'ComboboxItemIndicator',
    props: {
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'span' },
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(v(ad), ut(yt(t)), { default: w(() => [A(o.$slots, 'default')]), _: 3 }, 16)
      )
    },
  }),
  Na = bu,
  yu = x({
    __name: 'ComboboxPortal',
    props: {
      to: { type: null, required: !1 },
      disabled: { type: Boolean, required: !1 },
      defer: { type: Boolean, required: !1 },
      forceMount: { type: Boolean, required: !1 },
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(v(Eo), ut(yt(t)), { default: w(() => [A(o.$slots, 'default')]), _: 3 }, 16)
      )
    },
  }),
  Wa = yu,
  _u = x({
    __name: 'ComboboxTrigger',
    props: {
      disabled: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'button' },
    },
    setup(e) {
      const t = e,
        { forwardRef: o, currentElement: a } = ve(),
        l = It(),
        n = y(() => t.disabled || l.disabled.value || !1)
      return (
        we(() => {
          a.value && l.onTriggerElementChange(a.value)
        }),
        (i, s) => (
          c(),
          $(
            v(_e),
            te(t, {
              ref: v(o),
              type: i.as === 'button' ? 'button' : void 0,
              tabindex: '-1',
              'aria-label': 'Show popup',
              'aria-haspopup': 'listbox',
              'aria-expanded': v(l).open.value,
              'aria-controls': v(l).contentId,
              'data-state': v(l).open.value ? 'open' : 'closed',
              disabled: n.value,
              'data-disabled': n.value ? '' : void 0,
              'aria-disabled': n.value ?? void 0,
              onClick: s[0] || (s[0] = (r) => v(l).onOpenChange(!v(l).open.value)),
            }),
            { default: w(() => [A(i.$slots, 'default')]), _: 3 },
            16,
            [
              'type',
              'aria-expanded',
              'aria-controls',
              'data-state',
              'disabled',
              'data-disabled',
              'aria-disabled',
            ],
          )
        )
      )
    },
  }),
  Go = _u
function ku(e) {
  const t = Co({ nonce: C() })
  return y(() => e?.value || t.nonce?.value)
}
var wu = x({
    __name: 'ComboboxViewport',
    props: {
      nonce: { type: String, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e,
        { forwardRef: o } = ve(),
        { nonce: a } = We(t),
        l = ku(a),
        n = It()
      return (i, s) => (
        c(),
        h(
          ae,
          null,
          [
            E(
              v(_e),
              te(
                { ...i.$attrs, ...t },
                {
                  ref: v(o),
                  'data-reka-combobox-viewport': '',
                  role: 'presentation',
                  style: {
                    position: 'relative',
                    flex: v(n).isVirtual.value ? void 0 : 1,
                    overflow: 'auto',
                  },
                },
              ),
              { default: w(() => [A(i.$slots, 'default')]), _: 3 },
              16,
              ['style'],
            ),
            E(
              v(_e),
              { as: 'style', nonce: v(l) },
              {
                default: w(
                  () =>
                    s[0] ||
                    (s[0] = [
                      de(
                        ' /* Hide scrollbars cross-browser and enable momentum scroll for touch devices */ [data-reka-combobox-viewport] { scrollbar-width:none; -ms-overflow-style: none; -webkit-overflow-scrolling: touch; } [data-reka-combobox-viewport]::-webkit-scrollbar { display: none; } ',
                      ),
                    ]),
                ),
                _: 1,
                __: [0],
              },
              8,
              ['nonce'],
            ),
          ],
          64,
        )
      )
    },
  }),
  Ha = wu
const [xu, Su] = Re('RovingFocusGroup')
var Au = x({
    __name: 'RovingFocusGroup',
    props: {
      orientation: { type: String, required: !1, default: void 0 },
      dir: { type: String, required: !1 },
      loop: { type: Boolean, required: !1, default: !1 },
      currentTabStopId: { type: [String, null], required: !1 },
      defaultCurrentTabStopId: { type: String, required: !1 },
      preventScrollOnEntryFocus: { type: Boolean, required: !1, default: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['entryFocus', 'update:currentTabStopId'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        { loop: n, orientation: i, dir: s } = We(a),
        r = la(s),
        d = Qe(a, 'currentTabStopId', l, {
          defaultValue: a.defaultCurrentTabStopId,
          passive: a.currentTabStopId === void 0,
        }),
        u = C(!1),
        f = C(!1),
        g = C(0),
        { getItems: b, CollectionSlot: m } = na({ isProvider: !0 })
      function _(S) {
        const D = !f.value
        if (S.currentTarget && S.target === S.currentTarget && D && !u.value) {
          const B = new CustomEvent(Tr, Rr)
          if ((S.currentTarget.dispatchEvent(B), l('entryFocus', B), !B.defaultPrevented)) {
            const L = b()
                .map((P) => P.ref)
                .filter((P) => P.dataset.disabled !== ''),
              R = L.find((P) => P.getAttribute('data-active') === ''),
              N = L.find((P) => P.getAttribute('data-highlighted') === ''),
              W = L.find((P) => P.id === d.value),
              q = [R, N, W, ...L].filter(Boolean)
            gn(q, a.preventScrollOnEntryFocus)
          }
        }
        f.value = !1
      }
      function k() {
        setTimeout(() => {
          f.value = !1
        }, 1)
      }
      return (
        t({ getItems: b }),
        Su({
          loop: n,
          dir: r,
          orientation: i,
          currentTabStopId: d,
          onItemFocus: (S) => {
            d.value = S
          },
          onItemShiftTab: () => {
            u.value = !0
          },
          onFocusableItemAdd: () => {
            g.value++
          },
          onFocusableItemRemove: () => {
            g.value--
          },
        }),
        (S, D) => (
          c(),
          $(v(m), null, {
            default: w(() => [
              E(
                v(_e),
                {
                  tabindex: u.value || g.value === 0 ? -1 : 0,
                  'data-orientation': v(i),
                  as: S.as,
                  'as-child': S.asChild,
                  dir: v(r),
                  style: { outline: 'none' },
                  onMousedown: D[0] || (D[0] = (B) => (f.value = !0)),
                  onMouseup: k,
                  onFocus: _,
                  onBlur: D[1] || (D[1] = (B) => (u.value = !1)),
                },
                { default: w(() => [A(S.$slots, 'default')]), _: 3 },
                8,
                ['tabindex', 'data-orientation', 'as', 'as-child', 'dir'],
              ),
            ]),
            _: 3,
          })
        )
      )
    },
  }),
  Cu = Au,
  Du = x({
    __name: 'RovingFocusItem',
    props: {
      tabStopId: { type: String, required: !1 },
      focusable: { type: Boolean, required: !1, default: !0 },
      active: { type: Boolean, required: !1 },
      allowShiftKey: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'span' },
    },
    setup(e) {
      const t = e,
        o = xu(),
        a = lt(),
        l = y(() => t.tabStopId || a),
        n = y(() => o.currentTabStopId.value === l.value),
        { getItems: i, CollectionItem: s } = na()
      ;(we(() => {
        t.focusable && o.onFocusableItemAdd()
      }),
        Te(() => {
          t.focusable && o.onFocusableItemRemove()
        }))
      function r(d) {
        if (d.key === 'Tab' && d.shiftKey) {
          o.onItemShiftTab()
          return
        }
        if (d.target !== d.currentTarget) return
        const u = pn(d, o.orientation.value, o.dir.value)
        if (u !== void 0) {
          if (d.metaKey || d.ctrlKey || d.altKey || (!t.allowShiftKey && d.shiftKey)) return
          d.preventDefault()
          let f = [
            ...i()
              .map((g) => g.ref)
              .filter((g) => g.dataset.disabled !== ''),
          ]
          if (u === 'last') f.reverse()
          else if (u === 'prev' || u === 'next') {
            u === 'prev' && f.reverse()
            const g = f.indexOf(d.currentTarget)
            f = o.loop.value ? Wr(f, g + 1) : f.slice(g + 1)
          }
          he(() => gn(f))
        }
      }
      return (d, u) => (
        c(),
        $(v(s), null, {
          default: w(() => [
            E(
              v(_e),
              {
                tabindex: n.value ? 0 : -1,
                'data-orientation': v(o).orientation.value,
                'data-active': d.active ? '' : void 0,
                'data-disabled': d.focusable ? void 0 : '',
                as: d.as,
                'as-child': d.asChild,
                onMousedown:
                  u[0] ||
                  (u[0] = (f) => {
                    d.focusable ? v(o).onItemFocus(l.value) : f.preventDefault()
                  }),
                onFocus: u[1] || (u[1] = (f) => v(o).onItemFocus(l.value)),
                onKeydown: r,
              },
              { default: w(() => [A(d.$slots, 'default')]), _: 3 },
              8,
              ['tabindex', 'data-orientation', 'data-active', 'data-disabled', 'as', 'as-child'],
            ),
          ]),
          _: 3,
        })
      )
    },
  }),
  Bu = Du
const [sa, $u] = Re('PopoverRoot')
var Iu = x({
    __name: 'PopoverRoot',
    props: {
      defaultOpen: { type: Boolean, required: !1, default: !1 },
      open: { type: Boolean, required: !1, default: void 0 },
      modal: { type: Boolean, required: !1, default: !1 },
    },
    emits: ['update:open'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { modal: l } = We(o),
        n = Qe(o, 'open', a, { defaultValue: o.defaultOpen, passive: o.open === void 0 }),
        i = C(),
        s = C(!1)
      return (
        $u({
          contentId: '',
          triggerId: '',
          modal: l,
          open: n,
          onOpenChange: (r) => {
            n.value = r
          },
          onOpenToggle: () => {
            n.value = !n.value
          },
          triggerElement: i,
          hasCustomAnchor: s,
        }),
        (r, d) => (
          c(),
          $(v(mn), null, {
            default: w(() => [A(r.$slots, 'default', { open: v(n), close: () => (n.value = !1) })]),
            _: 3,
          })
        )
      )
    },
  }),
  _l = Iu,
  Mu = x({
    __name: 'PopoverAnchor',
    props: {
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e
      ve()
      const o = sa()
      return (
        Vi(() => {
          o.hasCustomAnchor.value = !0
        }),
        Te(() => {
          o.hasCustomAnchor.value = !1
        }),
        (a, l) => (
          c(),
          $(v(hn), ut(yt(t)), { default: w(() => [A(a.$slots, 'default')]), _: 3 }, 16)
        )
      )
    },
  }),
  kl = Mu,
  Ou = x({
    __name: 'PopoverContentImpl',
    props: {
      trapFocus: { type: Boolean, required: !1 },
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = Mo(is(o, 'trapFocus', 'disableOutsidePointerEvents')),
        { forwardRef: n } = ve(),
        i = sa()
      return (
        sn(),
        (s, r) => (
          c(),
          $(
            v(qo),
            {
              'as-child': '',
              loop: '',
              trapped: s.trapFocus,
              onMountAutoFocus: r[5] || (r[5] = (d) => a('openAutoFocus', d)),
              onUnmountAutoFocus: r[6] || (r[6] = (d) => a('closeAutoFocus', d)),
            },
            {
              default: w(() => [
                E(
                  v(Fo),
                  {
                    'as-child': '',
                    'disable-outside-pointer-events': s.disableOutsidePointerEvents,
                    onPointerDownOutside: r[0] || (r[0] = (d) => a('pointerDownOutside', d)),
                    onInteractOutside: r[1] || (r[1] = (d) => a('interactOutside', d)),
                    onEscapeKeyDown: r[2] || (r[2] = (d) => a('escapeKeyDown', d)),
                    onFocusOutside: r[3] || (r[3] = (d) => a('focusOutside', d)),
                    onDismiss: r[4] || (r[4] = (d) => v(i).onOpenChange(!1)),
                  },
                  {
                    default: w(() => [
                      E(
                        v(Bn),
                        te(v(l), {
                          id: v(i).contentId,
                          ref: v(n),
                          'data-state': v(i).open.value ? 'open' : 'closed',
                          'aria-labelledby': v(i).triggerId,
                          style: {
                            '--reka-popover-content-transform-origin':
                              'var(--reka-popper-transform-origin)',
                            '--reka-popover-content-available-width':
                              'var(--reka-popper-available-width)',
                            '--reka-popover-content-available-height':
                              'var(--reka-popper-available-height)',
                            '--reka-popover-trigger-width': 'var(--reka-popper-anchor-width)',
                            '--reka-popover-trigger-height': 'var(--reka-popper-anchor-height)',
                          },
                          role: 'dialog',
                        }),
                        { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                        16,
                        ['id', 'data-state', 'aria-labelledby'],
                      ),
                    ]),
                    _: 3,
                  },
                  8,
                  ['disable-outside-pointer-events'],
                ),
              ]),
              _: 3,
            },
            8,
            ['trapped'],
          )
        )
      )
    },
  }),
  $n = Ou,
  Lu = x({
    __name: 'PopoverContentModal',
    props: {
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = sa(),
        n = C(!1)
      Io(!0)
      const i = $a(o, a),
        { forwardRef: s, currentElement: r } = ve()
      return (
        Oo(r),
        (d, u) => (
          c(),
          $(
            $n,
            te(v(i), {
              ref: v(s),
              'trap-focus': v(l).open.value,
              'disable-outside-pointer-events': '',
              onCloseAutoFocus:
                u[0] ||
                (u[0] = Ce(
                  (f) => {
                    ;(a('closeAutoFocus', f), n.value || v(l).triggerElement.value?.focus())
                  },
                  ['prevent'],
                )),
              onPointerDownOutside:
                u[1] ||
                (u[1] = (f) => {
                  a('pointerDownOutside', f)
                  const g = f.detail.originalEvent,
                    b = g.button === 0 && g.ctrlKey === !0,
                    m = g.button === 2 || b
                  n.value = m
                }),
              onFocusOutside: u[2] || (u[2] = Ce(() => {}, ['prevent'])),
            }),
            { default: w(() => [A(d.$slots, 'default')]), _: 3 },
            16,
            ['trap-focus'],
          )
        )
      )
    },
  }),
  Fu = Lu,
  qu = x({
    __name: 'PopoverContentNonModal',
    props: {
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = sa(),
        n = C(!1),
        i = C(!1),
        s = $a(o, a)
      return (r, d) => (
        c(),
        $(
          $n,
          te(v(s), {
            'trap-focus': !1,
            'disable-outside-pointer-events': !1,
            onCloseAutoFocus:
              d[0] ||
              (d[0] = (u) => {
                ;(a('closeAutoFocus', u),
                  u.defaultPrevented ||
                    (n.value || v(l).triggerElement.value?.focus(), u.preventDefault()),
                  (n.value = !1),
                  (i.value = !1))
              }),
            onInteractOutside:
              d[1] ||
              (d[1] = async (u) => {
                ;(a('interactOutside', u),
                  u.defaultPrevented ||
                    ((n.value = !0),
                    u.detail.originalEvent.type === 'pointerdown' && (i.value = !0)))
                const f = u.target
                ;(v(l).triggerElement.value?.contains(f) && u.preventDefault(),
                  u.detail.originalEvent.type === 'focusin' && i.value && u.preventDefault())
              }),
          }),
          { default: w(() => [A(r.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Eu = qu,
  Pu = x({
    __name: 'PopoverContent',
    props: {
      forceMount: { type: Boolean, required: !1 },
      side: { type: null, required: !1 },
      sideOffset: { type: Number, required: !1 },
      sideFlip: { type: Boolean, required: !1 },
      align: { type: null, required: !1 },
      alignOffset: { type: Number, required: !1 },
      alignFlip: { type: Boolean, required: !1 },
      avoidCollisions: { type: Boolean, required: !1 },
      collisionBoundary: { type: null, required: !1 },
      collisionPadding: { type: [Number, Object], required: !1 },
      arrowPadding: { type: Number, required: !1 },
      hideShiftedArrow: { type: Boolean, required: !1 },
      sticky: { type: String, required: !1 },
      hideWhenDetached: { type: Boolean, required: !1 },
      positionStrategy: { type: String, required: !1 },
      updatePositionStrategy: { type: String, required: !1 },
      disableUpdateOnLayoutShift: { type: Boolean, required: !1 },
      prioritizePosition: { type: Boolean, required: !1 },
      reference: { type: null, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
      disableOutsidePointerEvents: { type: Boolean, required: !1 },
    },
    emits: [
      'escapeKeyDown',
      'pointerDownOutside',
      'focusOutside',
      'interactOutside',
      'openAutoFocus',
      'closeAutoFocus',
    ],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = sa(),
        n = $a(o, a),
        { forwardRef: i } = ve()
      return (
        (l.contentId ||= lt(void 0, 'reka-popover-content')),
        (s, r) => (
          c(),
          $(
            v(Gt),
            { present: s.forceMount || v(l).open.value },
            {
              default: w(() => [
                v(l).modal.value
                  ? (c(),
                    $(
                      Fu,
                      te({ key: 0 }, v(n), { ref: v(i) }),
                      { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                      16,
                    ))
                  : (c(),
                    $(
                      Eu,
                      te({ key: 1 }, v(n), { ref: v(i) }),
                      { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                      16,
                    )),
              ]),
              _: 3,
            },
            8,
            ['present'],
          )
        )
      )
    },
  }),
  wl = Pu,
  Tu = x({
    __name: 'PopoverPortal',
    props: {
      to: { type: null, required: !1 },
      disabled: { type: Boolean, required: !1 },
      defer: { type: Boolean, required: !1 },
      forceMount: { type: Boolean, required: !1 },
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(v(Eo), ut(yt(t)), { default: w(() => [A(o.$slots, 'default')]), _: 3 }, 16)
      )
    },
  }),
  xl = Tu
const [zo, Ru] = Re('TabsRoot')
var Vu = x({
    __name: 'TabsRoot',
    props: {
      defaultValue: { type: null, required: !1 },
      orientation: { type: String, required: !1, default: 'horizontal' },
      dir: { type: String, required: !1 },
      activationMode: { type: String, required: !1, default: 'automatic' },
      modelValue: { type: null, required: !1 },
      unmountOnHide: { type: Boolean, required: !1, default: !0 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { orientation: l, unmountOnHide: n, dir: i } = We(o),
        s = la(i)
      ve()
      const r = Qe(o, 'modelValue', a, {
          defaultValue: o.defaultValue,
          passive: o.modelValue === void 0,
        }),
        d = C(),
        u = Dt(new Set())
      return (
        Ru({
          modelValue: r,
          changeModelValue: (f) => {
            r.value = f
          },
          orientation: l,
          dir: s,
          unmountOnHide: n,
          activationMode: o.activationMode,
          baseId: lt(void 0, 'reka-tabs'),
          tabsList: d,
          contentIds: u,
          registerContent: (f) => {
            u.value = new Set([...u.value, f])
          },
          unregisterContent: (f) => {
            const g = new Set(u.value)
            ;(g.delete(f), (u.value = g))
          },
        }),
        (f, g) => (
          c(),
          $(
            v(_e),
            { dir: v(s), 'data-orientation': v(l), 'as-child': f.asChild, as: f.as },
            { default: w(() => [A(f.$slots, 'default', { modelValue: v(r) })]), _: 3 },
            8,
            ['dir', 'data-orientation', 'as-child', 'as'],
          )
        )
      )
    },
  }),
  Nu = Vu
function In(e, t) {
  return `${e}-trigger-${t}`
}
function Mn(e, t) {
  return `${e}-content-${t}`
}
var Wu = x({
    __name: 'TabsContent',
    props: {
      value: { type: [String, Number], required: !0 },
      forceMount: { type: Boolean, required: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e,
        { forwardRef: o } = ve(),
        a = zo(),
        l = y(() => In(a.baseId, t.value)),
        n = y(() => Mn(a.baseId, t.value)),
        i = y(() => t.value === a.modelValue.value),
        s = C(i.value)
      return (
        we(() => {
          ;(a.registerContent(t.value),
            requestAnimationFrame(() => {
              s.value = !1
            }))
        }),
        Jt(() => {
          a.unregisterContent(t.value)
        }),
        (r, d) => (
          c(),
          $(
            v(Gt),
            { present: r.forceMount || i.value, 'force-mount': '' },
            {
              default: w(({ present: u }) => [
                E(
                  v(_e),
                  {
                    id: n.value,
                    ref: v(o),
                    'as-child': r.asChild,
                    as: r.as,
                    role: 'tabpanel',
                    'data-state': i.value ? 'active' : 'inactive',
                    'data-orientation': v(a).orientation.value,
                    'aria-labelledby': l.value,
                    hidden: !u,
                    tabindex: '0',
                    style: xe({ animationDuration: s.value ? '0s' : void 0 }),
                  },
                  {
                    default: w(() => [
                      !v(a).unmountOnHide.value || u
                        ? A(r.$slots, 'default', { key: 0 })
                        : O('v-if', !0),
                    ]),
                    _: 2,
                  },
                  1032,
                  [
                    'id',
                    'as-child',
                    'as',
                    'data-state',
                    'data-orientation',
                    'aria-labelledby',
                    'hidden',
                    'style',
                  ],
                ),
              ]),
              _: 3,
            },
            8,
            ['present'],
          )
        )
      )
    },
  }),
  Hu = Wu,
  ju = x({
    __name: 'TabsList',
    props: {
      loop: { type: Boolean, required: !1, default: !0 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1 },
    },
    setup(e) {
      const t = e,
        { loop: o } = We(t),
        { forwardRef: a, currentElement: l } = ve(),
        n = zo()
      return (
        (n.tabsList = l),
        (i, s) => (
          c(),
          $(
            v(Cu),
            {
              'as-child': '',
              orientation: v(n).orientation.value,
              dir: v(n).dir.value,
              loop: v(o),
            },
            {
              default: w(() => [
                E(
                  v(_e),
                  {
                    ref: v(a),
                    role: 'tablist',
                    'as-child': i.asChild,
                    as: i.as,
                    'aria-orientation': v(n).orientation.value,
                  },
                  { default: w(() => [A(i.$slots, 'default')]), _: 3 },
                  8,
                  ['as-child', 'as', 'aria-orientation'],
                ),
              ]),
              _: 3,
            },
            8,
            ['orientation', 'dir', 'loop'],
          )
        )
      )
    },
  }),
  Gu = ju,
  zu = x({
    __name: 'TabsTrigger',
    props: {
      value: { type: [String, Number], required: !0 },
      disabled: { type: Boolean, required: !1, default: !1 },
      asChild: { type: Boolean, required: !1 },
      as: { type: null, required: !1, default: 'button' },
    },
    setup(e) {
      const t = e,
        { forwardRef: o } = ve(),
        a = zo(),
        l = y(() => In(a.baseId, t.value)),
        n = y(() => (a.contentIds.value.has(t.value) ? Mn(a.baseId, t.value) : void 0)),
        i = y(() => t.value === a.modelValue.value)
      return (s, r) => (
        c(),
        $(
          v(Bu),
          { 'as-child': '', focusable: !s.disabled, active: i.value },
          {
            default: w(() => [
              E(
                v(_e),
                {
                  id: l.value,
                  ref: v(o),
                  role: 'tab',
                  type: s.as === 'button' ? 'button' : void 0,
                  as: s.as,
                  'as-child': s.asChild,
                  'aria-selected': i.value ? 'true' : 'false',
                  'aria-controls': n.value,
                  'data-state': i.value ? 'active' : 'inactive',
                  disabled: s.disabled,
                  'data-disabled': s.disabled ? '' : void 0,
                  'data-orientation': v(a).orientation.value,
                  onMousedown:
                    r[0] ||
                    (r[0] = Ce(
                      (d) => {
                        !s.disabled && d.ctrlKey === !1
                          ? v(a).changeModelValue(s.value)
                          : d.preventDefault()
                      },
                      ['left'],
                    )),
                  onKeydown:
                    r[1] || (r[1] = gt((d) => v(a).changeModelValue(s.value), ['enter', 'space'])),
                  onFocus:
                    r[2] ||
                    (r[2] = () => {
                      const d = v(a).activationMode !== 'manual'
                      !i.value && !s.disabled && d && v(a).changeModelValue(s.value)
                    }),
                },
                { default: w(() => [A(s.$slots, 'default')]), _: 3 },
                8,
                [
                  'id',
                  'type',
                  'as',
                  'as-child',
                  'aria-selected',
                  'aria-controls',
                  'data-state',
                  'disabled',
                  'data-disabled',
                  'data-orientation',
                ],
              ),
            ]),
            _: 3,
          },
          8,
          ['focusable', 'active'],
        )
      )
    },
  }),
  Uu = zu
const Ku = Symbol('agds:core'),
  On = x({
    __name: 'CoreProvider',
    props: { linkComponent: {} },
    setup(e) {
      const t = e,
        o = x({
          name: 'AgDSDefaultLink',
          inheritAttrs: !1,
          props: { href: { type: String, default: void 0 } },
          setup(a, { attrs: l, slots: n }) {
            return () => st('a', { href: a.href, ...l }, n.default?.())
          },
        })
      return (qe(Ku, { linkComponent: t.linkComponent ?? o }), (a, l) => A(a.$slots, 'default'))
    },
  }),
  Sl = {
    lightForegroundText: '#313131',
    lightForegroundAction: '#00698f',
    lightForegroundFocus: '#9263de',
    lightForegroundMuted: '#626262',
    lightBackgroundBody: '#ffffff',
    lightBackgroundShade: '#f5f5f5',
    lightBackgroundBodyAlt: '#ebebeb',
    lightBackgroundShadeAlt: '#e0e0e0',
    lightSelected: '#00698f',
    lightSelectedMuted: '#f5f5f5',
    lightBorder: '#808080',
    lightBorderMuted: '#d3d3d3',
    lightAccent: '#00698f',
    lightOverlay: 'rgba(0, 0, 0, 0.8)',
    lightOverlayMuted: 'rgba(0, 0, 0, 0.3)',
    lightSystemError: '#d60000',
    lightSystemErrorMuted: '#fdf2f2',
    lightSystemSuccess: '#0b996c',
    lightSystemSuccessMuted: '#f3faf8',
    lightSystemWarning: '#f69900',
    lightSystemWarningMuted: '#fffaf2',
    lightSystemInfo: '#00bfe9',
    lightSystemInfoMuted: '#f2fcfe',
    darkForegroundText: '#ffffff',
    darkForegroundAction: '#61daff',
    darkForegroundFocus: '#c390f9',
    darkForegroundMuted: '#bdd2d7',
    darkBackgroundBody: '#135e70',
    darkBackgroundShade: '#104f5f',
    darkBackgroundBodyAlt: '#0d414d',
    darkBackgroundShadeAlt: '#0a323c',
    darkSelected: '#61daff',
    darkSelectedMuted: '#104f5f',
    darkBorder: '#95b7bf',
    darkBorderMuted: '#4d7680',
    darkAccent: '#61daff',
    darkOverlay: 'rgba(0, 0, 0, 0.8)',
    darkOverlayMuted: 'rgba(0, 0, 0, 0.3)',
    darkSystemError: '#d60000',
    darkSystemErrorMuted: '#422f47',
    darkSystemSuccess: '#0b996c',
    darkSystemSuccessMuted: '#133a4b',
    darkSystemWarning: '#f69900',
    darkSystemWarningMuted: '#393942',
    darkSystemInfo: '#00bfe9',
    darkSystemInfoMuted: '#193a5b',
  },
  Zu = {
    lightForegroundText: '#000000',
    lightForegroundAction: '#000000',
    lightForegroundFocus: '#000000',
    lightForegroundMuted: '#000000',
    lightBackgroundBody: '#ffffff',
    lightBackgroundShade: '#ffffff',
    lightBackgroundBodyAlt: '#ffffff',
    lightBackgroundShadeAlt: '#ffffff',
    lightBorder: '#000000',
    lightBorderMuted: '#000000',
    lightSelected: '#000000',
    lightSelectedMuted: '#ffffff',
    lightAccent: '#000000',
    lightOverlay: '#ffffff',
    lightOverlayMuted: '#ffffff',
    lightSystemError: '#000000',
    lightSystemSuccess: '#000000',
    lightSystemWarning: '#000000',
    lightSystemInfo: '#000000',
    lightSystemErrorMuted: '#ffffff',
    lightSystemSuccessMuted: '#ffffff',
    lightSystemWarningMuted: '#ffffff',
    lightSystemInfoMuted: '#ffffff',
    darkForegroundText: '#000000',
    darkForegroundAction: '#000000',
    darkForegroundFocus: '#000000',
    darkForegroundMuted: '#000000',
    darkBackgroundBody: '#ffffff',
    darkBackgroundShade: '#ffffff',
    darkBackgroundBodyAlt: '#ffffff',
    darkBackgroundShadeAlt: '#ffffff',
    darkBorder: '#000000',
    darkBorderMuted: '#000000',
    darkSelected: '#000000',
    darkSelectedMuted: '#ffffff',
    darkAccent: '#000000',
    darkOverlay: '#ffffff',
    darkOverlayMuted: '#ffffff',
    darkSystemError: '#000000',
    darkSystemErrorMuted: '#ffffff',
    darkSystemSuccess: '#000000',
    darkSystemSuccessMuted: '#ffffff',
    darkSystemWarningMuted: '#ffffff',
    darkSystemWarning: '#000000',
    darkSystemInfo: '#000000',
    darkSystemInfoMuted: '#ffffff',
  },
  ue = {
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
  }
function Al(e, t) {
  return t ? { ...e, ...t } : e
}
function Cl(e) {
  return Object.fromEntries(Object.keys(ue).map((t) => [ue[t], e[t]]))
}
const Z = {
    palette: '--agds-palette',
    foregroundText: '--agds-foreground-text',
    foregroundAction: '--agds-foreground-action',
    foregroundFocus: '--agds-foreground-focus',
    foregroundMuted: '--agds-foreground-muted',
    backgroundBody: '--agds-background-body',
    backgroundShade: '--agds-background-shade',
    backgroundBodyAlt: '--agds-background-body-alt',
    backgroundShadeAlt: '--agds-background-shade-alt',
    border: '--agds-border',
    borderMuted: '--agds-border-muted',
    selected: '--agds-selected',
    selectedMuted: '--agds-selected-muted',
    accent: '--agds-accent',
    overlay: '--agds-overlay',
    overlayMuted: '--agds-overlay-muted',
    systemSuccess: '--agds-system-success',
    systemSuccessMuted: '--agds-system-success-muted',
    systemWarning: '--agds-system-warning',
    systemWarningMuted: '--agds-system-warning-muted',
    systemInfo: '--agds-system-info',
    systemInfoMuted: '--agds-system-info-muted',
    systemError: '--agds-system-error',
    systemErrorMuted: '--agds-system-error-muted',
  },
  Yu = {
    light: {
      [Z.palette]: 'light',
      [Z.foregroundText]: `var(${ue.lightForegroundText})`,
      [Z.foregroundAction]: `var(${ue.lightForegroundAction})`,
      [Z.foregroundFocus]: `var(${ue.lightForegroundFocus})`,
      [Z.foregroundMuted]: `var(${ue.lightForegroundMuted})`,
      [Z.backgroundBody]: `var(${ue.lightBackgroundBody})`,
      [Z.backgroundShade]: `var(${ue.lightBackgroundShade})`,
      [Z.backgroundBodyAlt]: `var(${ue.lightBackgroundBodyAlt})`,
      [Z.backgroundShadeAlt]: `var(${ue.lightBackgroundShadeAlt})`,
      [Z.border]: `var(${ue.lightBorder})`,
      [Z.borderMuted]: `var(${ue.lightBorderMuted})`,
      [Z.selected]: `var(${ue.lightSelected})`,
      [Z.selectedMuted]: `var(${ue.lightSelectedMuted})`,
      [Z.accent]: `var(${ue.lightAccent})`,
      [Z.overlay]: `var(${ue.lightOverlay})`,
      [Z.overlayMuted]: `var(${ue.lightOverlayMuted})`,
      [Z.systemError]: `var(${ue.lightSystemError})`,
      [Z.systemErrorMuted]: `var(${ue.lightSystemErrorMuted})`,
      [Z.systemSuccess]: `var(${ue.lightSystemSuccess})`,
      [Z.systemSuccessMuted]: `var(${ue.lightSystemSuccessMuted})`,
      [Z.systemWarning]: `var(${ue.lightSystemWarning})`,
      [Z.systemWarningMuted]: `var(${ue.lightSystemWarningMuted})`,
      [Z.systemInfo]: `var(${ue.lightSystemInfo})`,
      [Z.systemInfoMuted]: `var(${ue.lightSystemInfoMuted})`,
    },
    dark: {
      [Z.palette]: 'dark',
      [Z.foregroundText]: `var(${ue.darkForegroundText})`,
      [Z.foregroundAction]: `var(${ue.darkForegroundAction})`,
      [Z.foregroundFocus]: `var(${ue.darkForegroundFocus})`,
      [Z.foregroundMuted]: `var(${ue.darkForegroundMuted})`,
      [Z.backgroundBody]: `var(${ue.darkBackgroundBody})`,
      [Z.backgroundShade]: `var(${ue.darkBackgroundShade})`,
      [Z.backgroundBodyAlt]: `var(${ue.darkBackgroundBodyAlt})`,
      [Z.backgroundShadeAlt]: `var(${ue.darkBackgroundShadeAlt})`,
      [Z.border]: `var(${ue.darkBorder})`,
      [Z.borderMuted]: `var(${ue.darkBorderMuted})`,
      [Z.selected]: `var(${ue.darkSelected})`,
      [Z.selectedMuted]: `var(${ue.darkSelectedMuted})`,
      [Z.accent]: `var(${ue.darkAccent})`,
      [Z.overlay]: `var(${ue.darkOverlay})`,
      [Z.overlayMuted]: `var(${ue.darkOverlayMuted})`,
      [Z.systemError]: `var(${ue.darkSystemError})`,
      [Z.systemErrorMuted]: `var(${ue.darkSystemErrorMuted})`,
      [Z.systemSuccess]: `var(${ue.darkSystemSuccess})`,
      [Z.systemSuccessMuted]: `var(${ue.darkSystemSuccessMuted})`,
      [Z.systemWarning]: `var(${ue.darkSystemWarning})`,
      [Z.systemWarningMuted]: `var(${ue.darkSystemWarningMuted})`,
      [Z.systemInfo]: `var(${ue.darkSystemInfo})`,
      [Z.systemInfoMuted]: `var(${ue.darkSystemInfoMuted})`,
    },
  },
  Xu = {
    foregroundText: `var(${Z.foregroundText})`,
    foregroundAction: `var(${Z.foregroundAction})`,
    foregroundFocus: `var(${Z.foregroundFocus})`,
    foregroundMuted: `var(${Z.foregroundMuted})`,
    backgroundBody: `var(${Z.backgroundBody})`,
    backgroundShade: `var(${Z.backgroundShade})`,
    backgroundBodyAlt: `var(${Z.backgroundBodyAlt})`,
    backgroundShadeAlt: `var(${Z.backgroundShadeAlt})`,
    border: `var(${Z.border})`,
    borderMuted: `var(${Z.borderMuted})`,
    selected: `var(${Z.selected})`,
    selectedMuted: `var(${Z.selectedMuted})`,
    accent: `var(${Z.accent})`,
    overlay: `var(${Z.overlay})`,
    overlayMuted: `var(${Z.overlayMuted})`,
    systemError: `var(${Z.systemError})`,
    systemErrorMuted: `var(${Z.systemErrorMuted})`,
    systemSuccess: `var(${Z.systemSuccess})`,
    systemSuccessMuted: `var(${Z.systemSuccessMuted})`,
    systemWarning: `var(${Z.systemWarning})`,
    systemWarningMuted: `var(${Z.systemWarningMuted})`,
    systemInfo: `var(${Z.systemInfo})`,
    systemInfoMuted: `var(${Z.systemInfoMuted})`,
  }
function t2(e) {
  const t = C()
  return (
    we(() => {
      e.value && (t.value = Ln(e.value))
    }),
    t
  )
}
function Ln(e) {
  const t = getComputedStyle(e).getPropertyValue(Z.palette).trim()
  if (t === 'light') return 'light'
  if (t === 'dark') return 'dark'
  if (e.parentElement) return Ln(e.parentElement)
}
const Qu = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 },
  Ju = {
    min: {
      xs: '@media(min-width: 0px)',
      sm: '@media(min-width: 576px)',
      md: '@media(min-width: 768px)',
      lg: '@media(min-width: 992px)',
      xl: '@media(min-width: 1200px)',
      xxl: '@media(min-width: 1600px)',
    },
    max: {
      xs: '@media(max-width: 575px)',
      sm: '@media(max-width: 767px)',
      md: '@media(max-width: 991px)',
      lg: '@media(max-width: 1199px)',
      xl: '@media(max-width: 1599px)',
    },
  },
  ec = 16,
  Fn = 4,
  tc = {
    body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    monospace: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
  },
  ac = {
    xs: { xs: 0.875, sm: 1, md: 1.25, lg: 1.5, xl: 1.75, xxl: 2, xxxl: 2.5 },
    sm: { xs: 0.875, sm: 1, md: 1.25, lg: 1.5, xl: 2, xxl: 2.5, xxxl: 3 },
  },
  oc = { normal: 'normal', bold: 'bold' },
  lc = { nospace: 1, heading: 1.25, default: 1.5 }
function pa(e) {
  return `${e}rem`
}
const nc = { xs: 0.75, md: 2 },
  ic = {
    bodyText: '42em',
    container: '80rem',
    containerLg: '120rem',
    field: { xs: '5rem', sm: '8rem', md: '13rem', lg: '18rem', xl: '24rem' },
  },
  sc = Fn,
  rc = { none: 0, sm: 1, md: 2, lg: 3, xl: 4, xxl: 8 },
  dc = { duration: 250, timingFunction: 'ease' },
  uc = { base: 0, elevated: 1, overlay: 100, dialog: 110, popover: 200, skipLink: 999 },
  cc = {
    sm: '0px 2px 4px rgba(0, 0, 0, 0.15)',
    md: '0px 4px 16px rgba(0, 0, 0, 0.15)',
    lg: '0px 16px 32px rgba(0, 0, 0, 0.20)',
  },
  bt = {
    breakpoint: Qu,
    mediaQuery: Ju,
    rem: ec,
    unit: Fn,
    font: tc,
    fontSize: ac,
    fontWeight: oc,
    lineHeight: lc,
    containerPadding: nc,
    maxWidth: ic,
    borderRadius: sc,
    borderWidth: rc,
    transition: dc,
    zIndex: uc,
    shadow: cc,
  },
  fc = x({
    __name: 'AusGovCore',
    props: { applyReset: { type: Boolean, default: !0 }, theme: {}, linkComponent: {} },
    setup(e) {
      const t = e,
        o = y(() => Al(Sl, t.theme))
      function a() {
        const n = Cl(o.value),
          i = Cl(Al(Sl, Zu)),
          s = Object.entries(n).map(([f, g]) => `  ${f}: ${g};`).join(`
`),
          r = Object.entries(i).map(([f, g]) => `  ${f}: ${g};`).join(`
`),
          d = Object.entries(Yu.light).map(([f, g]) => `  ${f}: ${g};`).join(`
`),
          u = t.applyReset
            ? `
body, html {
  margin: 0;
  padding: 0;
  background: var(--agds-background-body, #ffffff);
  font-family: ${bt.font.body};
}
html {
  scrollbar-gutter: stable;
}`
            : ''
        return `
:root {
${s}
}

@media print {
  :root {
${r}
  }
}

body, html {
${d}
}
${u}
`.trim()
      }
      let l = null
      return (
        we(() => {
          ;((l = document.createElement('style')),
            l.setAttribute('data-agds-core', ''),
            (l.textContent = a()),
            document.head.appendChild(l))
        }),
        Jt(() => {
          ;(l?.remove(), (l = null))
        }),
        (n, i) => (
          c(),
          $(
            On,
            { 'link-component': e.linkComponent },
            { default: w(() => [A(n.$slots, 'default')]), _: 3 },
            8,
            ['link-component'],
          )
        )
      )
    },
  })
function Dl(e, t) {
  return { fontSize: `${bt.fontSize.xs[e]}rem`, lineHeight: bt.lineHeight[t] }
}
const pc = {
    sm: { width: pa(1.5), height: pa(1.5), borderWidth: `${bt.borderWidth.lg}px` },
    md: { width: pa(2), height: pa(2), borderWidth: `${bt.borderWidth.lg}px` },
  },
  gc = {
    sm: { ...Dl('sm', 'default'), height: '2rem' },
    md: { ...Dl('sm', 'default'), height: '3rem' },
  },
  vc = {
    outlineWidth: '3px',
    outlineStyle: 'solid',
    outlineColor: Xu.foregroundFocus,
    outlineOffset: `${0.5 * bt.unit}px`,
  },
  mc = { textDecoration: 'underline', textDecorationSkipInk: 'auto' },
  hc = { overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' },
  bc = {
    hidden: { display: 'none !important' },
    visible: { display: 'block !important', height: 'auto !important' },
    exactColor: { WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' },
  },
  a2 = { control: pc, input: gc, outline: vc, underline: mc, truncate: hc, print: bc },
  yc = Object.keys(bt.breakpoint)
function o2(e, t = (o) => o) {
  if (lo(e)) {
    if (Array.isArray(e)) return e.map((o) => (lo(o) ? t(o) : null))
    if (typeof e == 'object') {
      const o = e
      return yc.map((a) => {
        const l = a in o ? o[a] : void 0
        return lo(l) ? t(l) : null
      })
    }
    return [t(e)]
  }
}
function lo(e) {
  return e != null
}
function l2(e) {
  return bt.mediaQuery.min[e]
}
const qn = x({
    inheritAttrs: !1,
    __name: 'AGDSBox',
    props: {
      as: {},
      display: {},
      flexDirection: {},
      flexWrap: {},
      flexGrow: {},
      flexShrink: {},
      alignItems: {},
      alignSelf: {},
      justifyContent: {},
      justifySelf: {},
      gap: {},
      columnGap: {},
      rowGap: {},
      padding: {},
      paddingTop: {},
      paddingRight: {},
      paddingBottom: {},
      paddingLeft: {},
      paddingX: {},
      paddingY: {},
      width: {},
      height: {},
      minWidth: {},
      maxWidth: {},
      minHeight: {},
      maxHeight: {},
    },
    setup(e) {
      const t = e,
        o = oa()
      function a(n) {
        if (n !== void 0) return typeof n == 'number' ? `var(--agds-space-${n})` : n
      }
      const l = y(() => {
        const n = a(t.paddingTop) ?? a(t.paddingY),
          i = a(t.paddingBottom) ?? a(t.paddingY),
          s = a(t.paddingLeft) ?? a(t.paddingX),
          r = a(t.paddingRight) ?? a(t.paddingX),
          d = {
            display: t.display,
            flexDirection: t.flexDirection,
            flexWrap: t.flexWrap,
            flexGrow: t.flexGrow,
            flexShrink: t.flexShrink,
            alignItems: t.alignItems,
            alignSelf: t.alignSelf,
            justifyContent: t.justifyContent,
            justifySelf: t.justifySelf,
            gap: a(t.gap),
            columnGap: a(t.columnGap),
            rowGap: a(t.rowGap),
            padding: a(t.padding),
            paddingTop: t.padding !== void 0 ? void 0 : n,
            paddingRight: t.padding !== void 0 ? void 0 : r,
            paddingBottom: t.padding !== void 0 ? void 0 : i,
            paddingLeft: t.padding !== void 0 ? void 0 : s,
            width: t.width,
            height: t.height,
            minWidth: t.minWidth,
            maxWidth: t.maxWidth,
            minHeight: t.minHeight,
            maxHeight: t.maxHeight,
          }
        return Object.fromEntries(Object.entries(d).filter(([, u]) => u !== void 0))
      })
      return (n, i) => (
        c(),
        $(
          ke(t.as ?? 'div'),
          te(v(o), { style: l.value }),
          { default: w(() => [A(n.$slots, 'default')]), _: 3 },
          16,
          ['style'],
        )
      )
    },
  }),
  Ut = x({
    __name: 'AGDSFlex',
    props: {
      inline: { type: Boolean, default: !1 },
      as: {},
      display: {},
      flexDirection: { default: 'row' },
      flexWrap: {},
      flexGrow: {},
      flexShrink: {},
      alignItems: { default: 'stretch' },
      alignSelf: {},
      justifyContent: { default: 'flex-start' },
      justifySelf: {},
      gap: {},
      columnGap: {},
      rowGap: {},
      padding: {},
      paddingTop: {},
      paddingRight: {},
      paddingBottom: {},
      paddingLeft: {},
      paddingX: {},
      paddingY: {},
      width: {},
      height: {},
      minWidth: {},
      maxWidth: {},
      minHeight: {},
      maxHeight: {},
    },
    setup(e) {
      const t = e,
        o = y(() => {
          const { inline: a, display: l, ...n } = t
          return { ...n, display: l ?? (a ? 'inline-flex' : 'flex') }
        })
      return (a, l) => (
        c(),
        $(qn, ut(yt(o.value)), { default: w(() => [A(a.$slots, 'default')]), _: 3 }, 16)
      )
    },
  }),
  _c = x({
    inheritAttrs: !1,
    __name: 'AGDSColumns',
    props: { as: {}, cols: { default: 12 }, gap: {}, columnGap: {}, rowGap: {}, alignItems: {} },
    setup(e) {
      const t = e,
        o = oa()
      function a(n) {
        if (n !== void 0) return typeof n == 'number' ? `var(--agds-space-${n})` : n
      }
      const l = y(() => {
        const n = {
          display: 'grid',
          gridTemplateColumns: `repeat(${t.cols}, 1fr)`,
          gap: a(t.gap),
          columnGap: a(t.columnGap),
          rowGap: a(t.rowGap),
          alignItems: t.alignItems,
        }
        return Object.fromEntries(Object.entries(n).filter(([, i]) => i !== void 0))
      })
      return (n, i) => (
        c(),
        $(
          ke(t.as ?? 'div'),
          te(v(o), { style: l.value }),
          { default: w(() => [A(n.$slots, 'default')]), _: 3 },
          16,
          ['style'],
        )
      )
    },
  }),
  kc = x({
    inheritAttrs: !1,
    __name: 'AGDSColumn',
    props: { as: {}, span: {}, start: {}, end: {}, alignSelf: {}, justifySelf: {} },
    setup(e) {
      const t = e,
        o = oa(),
        a = y(() => {
          const l = {
            gridColumn: t.span !== void 0 ? `span ${t.span} / span ${t.span}` : void 0,
            gridColumnStart: t.start !== void 0 ? String(t.start) : void 0,
            gridColumnEnd: t.end !== void 0 ? String(t.end) : void 0,
            alignSelf: t.alignSelf,
            justifySelf: t.justifySelf,
          }
          return Object.fromEntries(Object.entries(l).filter(([, n]) => n !== void 0))
        })
      return (l, n) => (
        c(),
        $(
          ke(t.as ?? 'div'),
          te(v(o), { style: a.value }),
          { default: w(() => [A(l.$slots, 'default')]), _: 3 },
          16,
          ['style'],
        )
      )
    },
  }),
  En = x({
    __name: 'AGDSFormStack',
    props: { as: { default: 'div' } },
    setup(e) {
      return (t, o) => (
        c(),
        $(
          Ut,
          { as: e.as, 'flex-direction': 'column', gap: 2 },
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          8,
          ['as'],
        )
      )
    },
  }),
  wa = x({
    __name: 'AGDSStack',
    props: {
      as: {},
      display: {},
      flexWrap: {},
      flexGrow: {},
      flexShrink: {},
      alignItems: { default: 'stretch' },
      alignSelf: {},
      justifyContent: { default: 'flex-start' },
      justifySelf: {},
      gap: {},
      columnGap: {},
      rowGap: {},
      padding: {},
      paddingTop: {},
      paddingRight: {},
      paddingBottom: {},
      paddingLeft: {},
      paddingX: {},
      paddingY: {},
      width: {},
      height: {},
      minWidth: {},
      maxWidth: {},
      minHeight: {},
      maxHeight: {},
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          Ut,
          te(t, { 'flex-direction': 'column' }),
          { default: w(() => [A(o.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Pn = /^[a-z0-9]+(-[a-z0-9]+)*$/,
  ja = (e, t, o, a = '') => {
    const l = e.split(':')
    if (e.slice(0, 1) === '@') {
      if (l.length < 2 || l.length > 3) return null
      a = l.shift().slice(1)
    }
    if (l.length > 3 || !l.length) return null
    if (l.length > 1) {
      const s = l.pop(),
        r = l.pop(),
        d = { provider: l.length > 0 ? l[0] : a, prefix: r, name: s }
      return t && !ma(d) ? null : d
    }
    const n = l[0],
      i = n.split('-')
    if (i.length > 1) {
      const s = { provider: a, prefix: i.shift(), name: i.join('-') }
      return t && !ma(s) ? null : s
    }
    if (o && a === '') {
      const s = { provider: a, prefix: '', name: n }
      return t && !ma(s, o) ? null : s
    }
    return null
  },
  ma = (e, t) => (e ? !!(((t && e.prefix === '') || e.prefix) && e.name) : !1),
  Tn = Object.freeze({ left: 0, top: 0, width: 16, height: 16 }),
  xa = Object.freeze({ rotate: 0, vFlip: !1, hFlip: !1 }),
  Ga = Object.freeze({ ...Tn, ...xa }),
  mo = Object.freeze({ ...Ga, body: '', hidden: !1 })
function wc(e, t) {
  const o = {}
  ;(!e.hFlip != !t.hFlip && (o.hFlip = !0), !e.vFlip != !t.vFlip && (o.vFlip = !0))
  const a = ((e.rotate || 0) + (t.rotate || 0)) % 4
  return (a && (o.rotate = a), o)
}
function Bl(e, t) {
  const o = wc(e, t)
  for (const a in mo)
    a in xa
      ? a in e && !(a in o) && (o[a] = xa[a])
      : a in t
        ? (o[a] = t[a])
        : a in e && (o[a] = e[a])
  return o
}
function xc(e, t) {
  const o = e.icons,
    a = e.aliases || Object.create(null),
    l = Object.create(null)
  function n(i) {
    if (o[i]) return (l[i] = [])
    if (!(i in l)) {
      l[i] = null
      const s = a[i] && a[i].parent,
        r = s && n(s)
      r && (l[i] = [s].concat(r))
    }
    return l[i]
  }
  return (Object.keys(o).concat(Object.keys(a)).forEach(n), l)
}
function Sc(e, t, o) {
  const a = e.icons,
    l = e.aliases || Object.create(null)
  let n = {}
  function i(s) {
    n = Bl(a[s] || l[s], n)
  }
  return (i(t), o.forEach(i), Bl(e, n))
}
function Rn(e, t) {
  const o = []
  if (typeof e != 'object' || typeof e.icons != 'object') return o
  e.not_found instanceof Array &&
    e.not_found.forEach((l) => {
      ;(t(l, null), o.push(l))
    })
  const a = xc(e)
  for (const l in a) {
    const n = a[l]
    n && (t(l, Sc(e, l, n)), o.push(l))
  }
  return o
}
const Ac = { provider: '', aliases: {}, not_found: {}, ...Tn }
function no(e, t) {
  for (const o in t) if (o in e && typeof e[o] != typeof t[o]) return !1
  return !0
}
function Vn(e) {
  if (typeof e != 'object' || e === null) return null
  const t = e
  if (typeof t.prefix != 'string' || !e.icons || typeof e.icons != 'object' || !no(e, Ac))
    return null
  const o = t.icons
  for (const l in o) {
    const n = o[l]
    if (!l || typeof n.body != 'string' || !no(n, mo)) return null
  }
  const a = t.aliases || Object.create(null)
  for (const l in a) {
    const n = a[l],
      i = n.parent
    if (!l || typeof i != 'string' || (!o[i] && !a[i]) || !no(n, mo)) return null
  }
  return t
}
const $l = Object.create(null)
function Cc(e, t) {
  return { provider: e, prefix: t, icons: Object.create(null), missing: new Set() }
}
function Nt(e, t) {
  const o = $l[e] || ($l[e] = Object.create(null))
  return o[t] || (o[t] = Cc(e, t))
}
function Nn(e, t) {
  return Vn(t)
    ? Rn(t, (o, a) => {
        a ? (e.icons[o] = a) : e.missing.add(o)
      })
    : []
}
function Dc(e, t, o) {
  try {
    if (typeof o.body == 'string') return ((e.icons[t] = { ...o }), !0)
  } catch {}
  return !1
}
let ta = !1
function Wn(e) {
  return (typeof e == 'boolean' && (ta = e), ta)
}
function Bc(e) {
  const t = typeof e == 'string' ? ja(e, !0, ta) : e
  if (t) {
    const o = Nt(t.provider, t.prefix),
      a = t.name
    return o.icons[a] || (o.missing.has(a) ? null : void 0)
  }
}
function $c(e, t) {
  const o = ja(e, !0, ta)
  if (!o) return !1
  const a = Nt(o.provider, o.prefix)
  return t ? Dc(a, o.name, t) : (a.missing.add(o.name), !0)
}
function Ic(e, t) {
  if (typeof e != 'object') return !1
  if ((typeof t != 'string' && (t = e.provider || ''), ta && !t && !e.prefix)) {
    let l = !1
    return (
      Vn(e) &&
        ((e.prefix = ''),
        Rn(e, (n, i) => {
          $c(n, i) && (l = !0)
        })),
      l
    )
  }
  const o = e.prefix
  if (!ma({ prefix: o, name: 'a' })) return !1
  const a = Nt(t, o)
  return !!Nn(a, e)
}
const Hn = Object.freeze({ width: null, height: null }),
  jn = Object.freeze({ ...Hn, ...xa }),
  Mc = /(-?[0-9.]*[0-9]+[0-9.]*)/g,
  Oc = /^-?[0-9.]*[0-9]+[0-9.]*$/g
function Il(e, t, o) {
  if (t === 1) return e
  if (((o = o || 100), typeof e == 'number')) return Math.ceil(e * t * o) / o
  if (typeof e != 'string') return e
  const a = e.split(Mc)
  if (a === null || !a.length) return e
  const l = []
  let n = a.shift(),
    i = Oc.test(n)
  for (;;) {
    if (i) {
      const s = parseFloat(n)
      isNaN(s) ? l.push(n) : l.push(Math.ceil(s * t * o) / o)
    } else l.push(n)
    if (((n = a.shift()), n === void 0)) return l.join('')
    i = !i
  }
}
function Lc(e, t = 'defs') {
  let o = ''
  const a = e.indexOf('<' + t)
  for (; a >= 0; ) {
    const l = e.indexOf('>', a),
      n = e.indexOf('</' + t)
    if (l === -1 || n === -1) break
    const i = e.indexOf('>', n)
    if (i === -1) break
    ;((o += e.slice(l + 1, n).trim()), (e = e.slice(0, a).trim() + e.slice(i + 1)))
  }
  return { defs: o, content: e }
}
function Fc(e, t) {
  return e ? '<defs>' + e + '</defs>' + t : t
}
function qc(e, t, o) {
  const a = Lc(e)
  return Fc(a.defs, t + a.content + o)
}
const Ec = (e) => e === 'unset' || e === 'undefined' || e === 'none'
function Pc(e, t) {
  const o = { ...Ga, ...e },
    a = { ...jn, ...t },
    l = { left: o.left, top: o.top, width: o.width, height: o.height }
  let n = o.body
  ;[o, a].forEach((_) => {
    const k = [],
      S = _.hFlip,
      D = _.vFlip
    let B = _.rotate
    S
      ? D
        ? (B += 2)
        : (k.push(
            'translate(' + (l.width + l.left).toString() + ' ' + (0 - l.top).toString() + ')',
          ),
          k.push('scale(-1 1)'),
          (l.top = l.left = 0))
      : D &&
        (k.push('translate(' + (0 - l.left).toString() + ' ' + (l.height + l.top).toString() + ')'),
        k.push('scale(1 -1)'),
        (l.top = l.left = 0))
    let L
    switch ((B < 0 && (B -= Math.floor(B / 4) * 4), (B = B % 4), B)) {
      case 1:
        ;((L = l.height / 2 + l.top),
          k.unshift('rotate(90 ' + L.toString() + ' ' + L.toString() + ')'))
        break
      case 2:
        k.unshift(
          'rotate(180 ' +
            (l.width / 2 + l.left).toString() +
            ' ' +
            (l.height / 2 + l.top).toString() +
            ')',
        )
        break
      case 3:
        ;((L = l.width / 2 + l.left),
          k.unshift('rotate(-90 ' + L.toString() + ' ' + L.toString() + ')'))
        break
    }
    ;(B % 2 === 1 &&
      (l.left !== l.top && ((L = l.left), (l.left = l.top), (l.top = L)),
      l.width !== l.height && ((L = l.width), (l.width = l.height), (l.height = L))),
      k.length && (n = qc(n, '<g transform="' + k.join(' ') + '">', '</g>')))
  })
  const i = a.width,
    s = a.height,
    r = l.width,
    d = l.height
  let u, f
  i === null
    ? ((f = s === null ? '1em' : s === 'auto' ? d : s), (u = Il(f, r / d)))
    : ((u = i === 'auto' ? r : i), (f = s === null ? Il(u, d / r) : s === 'auto' ? d : s))
  const g = {},
    b = (_, k) => {
      Ec(k) || (g[_] = k.toString())
    }
  ;(b('width', u), b('height', f))
  const m = [l.left, l.top, r, d]
  return ((g.viewBox = m.join(' ')), { attributes: g, viewBox: m, body: n })
}
const Tc = /\sid="(\S+)"/g,
  Rc = 'IconifyId' + Date.now().toString(16) + ((Math.random() * 16777216) | 0).toString(16)
let Vc = 0
function Nc(e, t = Rc) {
  const o = []
  let a
  for (; (a = Tc.exec(e)); ) o.push(a[1])
  if (!o.length) return e
  const l = 'suffix' + ((Math.random() * 16777216) | Date.now()).toString(16)
  return (
    o.forEach((n) => {
      const i = typeof t == 'function' ? t(n) : t + (Vc++).toString(),
        s = n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      e = e.replace(new RegExp('([#;"])(' + s + ')([")]|\\.[a-z])', 'g'), '$1' + i + l + '$3')
    }),
    (e = e.replace(new RegExp(l, 'g'), '')),
    e
  )
}
const ho = Object.create(null)
function Wc(e, t) {
  ho[e] = t
}
function bo(e) {
  return ho[e] || ho['']
}
function Uo(e) {
  let t
  if (typeof e.resources == 'string') t = [e.resources]
  else if (((t = e.resources), !(t instanceof Array) || !t.length)) return null
  return {
    resources: t,
    path: e.path || '/',
    maxURL: e.maxURL || 500,
    rotate: e.rotate || 750,
    timeout: e.timeout || 5e3,
    random: e.random === !0,
    index: e.index || 0,
    dataAfterTimeout: e.dataAfterTimeout !== !1,
  }
}
const Ko = Object.create(null),
  ga = ['https://api.simplesvg.com', 'https://api.unisvg.com'],
  yo = []
for (; ga.length > 0; )
  ga.length === 1 || Math.random() > 0.5 ? yo.push(ga.shift()) : yo.push(ga.pop())
Ko[''] = Uo({ resources: ['https://api.iconify.design'].concat(yo) })
function Hc(e, t) {
  const o = Uo(t)
  return o === null ? !1 : ((Ko[e] = o), !0)
}
function Zo(e) {
  return Ko[e]
}
const jc = () => {
  let e
  try {
    if (((e = fetch), typeof e == 'function')) return e
  } catch {}
}
let Ml = jc()
function Gc(e, t) {
  const o = Zo(e)
  if (!o) return 0
  let a
  if (!o.maxURL) a = 0
  else {
    let l = 0
    o.resources.forEach((i) => {
      l = Math.max(l, i.length)
    })
    const n = t + '.json?icons='
    a = o.maxURL - l - o.path.length - n.length
  }
  return a
}
function zc(e) {
  return e === 404
}
const Uc = (e, t, o) => {
  const a = [],
    l = Gc(e, t),
    n = 'icons'
  let i = { type: n, provider: e, prefix: t, icons: [] },
    s = 0
  return (
    o.forEach((r, d) => {
      ;((s += r.length + 1),
        s >= l &&
          d > 0 &&
          (a.push(i), (i = { type: n, provider: e, prefix: t, icons: [] }), (s = r.length)),
        i.icons.push(r))
    }),
    a.push(i),
    a
  )
}
function Kc(e) {
  if (typeof e == 'string') {
    const t = Zo(e)
    if (t) return t.path
  }
  return '/'
}
const Zc = (e, t, o) => {
    if (!Ml) {
      o('abort', 424)
      return
    }
    let a = Kc(t.provider)
    switch (t.type) {
      case 'icons': {
        const n = t.prefix,
          i = t.icons.join(','),
          s = new URLSearchParams({ icons: i })
        a += n + '.json?' + s.toString()
        break
      }
      case 'custom': {
        const n = t.uri
        a += n.slice(0, 1) === '/' ? n.slice(1) : n
        break
      }
      default:
        o('abort', 400)
        return
    }
    let l = 503
    Ml(e + a)
      .then((n) => {
        const i = n.status
        if (i !== 200) {
          setTimeout(() => {
            o(zc(i) ? 'abort' : 'next', i)
          })
          return
        }
        return ((l = 501), n.json())
      })
      .then((n) => {
        if (typeof n != 'object' || n === null) {
          setTimeout(() => {
            n === 404 ? o('abort', n) : o('next', l)
          })
          return
        }
        setTimeout(() => {
          o('success', n)
        })
      })
      .catch(() => {
        o('next', l)
      })
  },
  Yc = { prepare: Uc, send: Zc }
function Xc(e) {
  const t = { loaded: [], missing: [], pending: [] },
    o = Object.create(null)
  e.sort((l, n) =>
    l.provider !== n.provider
      ? l.provider.localeCompare(n.provider)
      : l.prefix !== n.prefix
        ? l.prefix.localeCompare(n.prefix)
        : l.name.localeCompare(n.name),
  )
  let a = { provider: '', prefix: '', name: '' }
  return (
    e.forEach((l) => {
      if (a.name === l.name && a.prefix === l.prefix && a.provider === l.provider) return
      a = l
      const n = l.provider,
        i = l.prefix,
        s = l.name,
        r = o[n] || (o[n] = Object.create(null)),
        d = r[i] || (r[i] = Nt(n, i))
      let u
      s in d.icons
        ? (u = t.loaded)
        : i === '' || d.missing.has(s)
          ? (u = t.missing)
          : (u = t.pending)
      const f = { provider: n, prefix: i, name: s }
      u.push(f)
    }),
    t
  )
}
function Gn(e, t) {
  e.forEach((o) => {
    const a = o.loaderCallbacks
    a && (o.loaderCallbacks = a.filter((l) => l.id !== t))
  })
}
function Qc(e) {
  e.pendingCallbacksFlag ||
    ((e.pendingCallbacksFlag = !0),
    setTimeout(() => {
      e.pendingCallbacksFlag = !1
      const t = e.loaderCallbacks ? e.loaderCallbacks.slice(0) : []
      if (!t.length) return
      let o = !1
      const a = e.provider,
        l = e.prefix
      t.forEach((n) => {
        const i = n.icons,
          s = i.pending.length
        ;((i.pending = i.pending.filter((r) => {
          if (r.prefix !== l) return !0
          const d = r.name
          if (e.icons[d]) i.loaded.push({ provider: a, prefix: l, name: d })
          else if (e.missing.has(d)) i.missing.push({ provider: a, prefix: l, name: d })
          else return ((o = !0), !0)
          return !1
        })),
          i.pending.length !== s &&
            (o || Gn([e], n.id),
            n.callback(i.loaded.slice(0), i.missing.slice(0), i.pending.slice(0), n.abort)))
      })
    }))
}
let Jc = 0
function ef(e, t, o) {
  const a = Jc++,
    l = Gn.bind(null, o, a)
  if (!t.pending.length) return l
  const n = { id: a, icons: t, callback: e, abort: l }
  return (
    o.forEach((i) => {
      ;(i.loaderCallbacks || (i.loaderCallbacks = [])).push(n)
    }),
    l
  )
}
function tf(e, t = !0, o = !1) {
  const a = []
  return (
    e.forEach((l) => {
      const n = typeof l == 'string' ? ja(l, t, o) : l
      n && a.push(n)
    }),
    a
  )
}
var af = { resources: [], index: 0, timeout: 2e3, rotate: 750, random: !1, dataAfterTimeout: !1 }
function of(e, t, o, a) {
  const l = e.resources.length,
    n = e.random ? Math.floor(Math.random() * l) : e.index
  let i
  if (e.random) {
    let N = e.resources.slice(0)
    for (i = []; N.length > 1; ) {
      const W = Math.floor(Math.random() * N.length)
      ;(i.push(N[W]), (N = N.slice(0, W).concat(N.slice(W + 1))))
    }
    i = i.concat(N)
  } else i = e.resources.slice(n).concat(e.resources.slice(0, n))
  const s = Date.now()
  let r = 'pending',
    d = 0,
    u,
    f = null,
    g = [],
    b = []
  typeof a == 'function' && b.push(a)
  function m() {
    f && (clearTimeout(f), (f = null))
  }
  function _() {
    ;(r === 'pending' && (r = 'aborted'),
      m(),
      g.forEach((N) => {
        N.status === 'pending' && (N.status = 'aborted')
      }),
      (g = []))
  }
  function k(N, W) {
    ;(W && (b = []), typeof N == 'function' && b.push(N))
  }
  function S() {
    return {
      startTime: s,
      payload: t,
      status: r,
      queriesSent: d,
      queriesPending: g.length,
      subscribe: k,
      abort: _,
    }
  }
  function D() {
    ;((r = 'failed'),
      b.forEach((N) => {
        N(void 0, u)
      }))
  }
  function B() {
    ;(g.forEach((N) => {
      N.status === 'pending' && (N.status = 'aborted')
    }),
      (g = []))
  }
  function L(N, W, q) {
    const P = W !== 'success'
    switch (((g = g.filter((j) => j !== N)), r)) {
      case 'pending':
        break
      case 'failed':
        if (P || !e.dataAfterTimeout) return
        break
      default:
        return
    }
    if (W === 'abort') {
      ;((u = q), D())
      return
    }
    if (P) {
      ;((u = q), g.length || (i.length ? R() : D()))
      return
    }
    if ((m(), B(), !e.random)) {
      const j = e.resources.indexOf(N.resource)
      j !== -1 && j !== e.index && (e.index = j)
    }
    ;((r = 'completed'),
      b.forEach((j) => {
        j(q)
      }))
  }
  function R() {
    if (r !== 'pending') return
    m()
    const N = i.shift()
    if (N === void 0) {
      if (g.length) {
        f = setTimeout(() => {
          ;(m(), r === 'pending' && (B(), D()))
        }, e.timeout)
        return
      }
      D()
      return
    }
    const W = {
      status: 'pending',
      resource: N,
      callback: (q, P) => {
        L(W, q, P)
      },
    }
    ;(g.push(W), d++, (f = setTimeout(R, e.rotate)), o(N, t, W.callback))
  }
  return (setTimeout(R), S)
}
function zn(e) {
  const t = { ...af, ...e }
  let o = []
  function a() {
    o = o.filter((i) => i().status === 'pending')
  }
  function l(i, s, r) {
    const d = of(t, i, s, (u, f) => {
      ;(a(), r && r(u, f))
    })
    return (o.push(d), d)
  }
  function n(i) {
    return o.find((s) => i(s)) || null
  }
  return {
    query: l,
    find: n,
    setIndex: (i) => {
      t.index = i
    },
    getIndex: () => t.index,
    cleanup: a,
  }
}
function Ol() {}
const io = Object.create(null)
function lf(e) {
  if (!io[e]) {
    const t = Zo(e)
    if (!t) return
    const o = zn(t),
      a = { config: t, redundancy: o }
    io[e] = a
  }
  return io[e]
}
function nf(e, t, o) {
  let a, l
  if (typeof e == 'string') {
    const n = bo(e)
    if (!n) return (o(void 0, 424), Ol)
    l = n.send
    const i = lf(e)
    i && (a = i.redundancy)
  } else {
    const n = Uo(e)
    if (n) {
      a = zn(n)
      const i = e.resources ? e.resources[0] : '',
        s = bo(i)
      s && (l = s.send)
    }
  }
  return !a || !l ? (o(void 0, 424), Ol) : a.query(t, l, o)().abort
}
function Ll() {}
function sf(e) {
  e.iconsLoaderFlag ||
    ((e.iconsLoaderFlag = !0),
    setTimeout(() => {
      ;((e.iconsLoaderFlag = !1), Qc(e))
    }))
}
function rf(e) {
  const t = [],
    o = []
  return (
    e.forEach((a) => {
      ;(a.match(Pn) ? t : o).push(a)
    }),
    { valid: t, invalid: o }
  )
}
function Zt(e, t, o) {
  function a() {
    const l = e.pendingIcons
    t.forEach((n) => {
      ;(l && l.delete(n), e.icons[n] || e.missing.add(n))
    })
  }
  if (o && typeof o == 'object')
    try {
      if (!Nn(e, o).length) {
        a()
        return
      }
    } catch (l) {
      console.error(l)
    }
  ;(a(), sf(e))
}
function Fl(e, t) {
  e instanceof Promise
    ? e
        .then((o) => {
          t(o)
        })
        .catch(() => {
          t(null)
        })
    : t(e)
}
function df(e, t) {
  ;(e.iconsToLoad ? (e.iconsToLoad = e.iconsToLoad.concat(t).sort()) : (e.iconsToLoad = t),
    e.iconsQueueFlag ||
      ((e.iconsQueueFlag = !0),
      setTimeout(() => {
        e.iconsQueueFlag = !1
        const { provider: o, prefix: a } = e,
          l = e.iconsToLoad
        if ((delete e.iconsToLoad, !l || !l.length)) return
        const n = e.loadIcon
        if (e.loadIcons && (l.length > 1 || !n)) {
          Fl(e.loadIcons(l, a, o), (d) => {
            Zt(e, l, d)
          })
          return
        }
        if (n) {
          l.forEach((d) => {
            const u = n(d, a, o)
            Fl(u, (f) => {
              const g = f ? { prefix: a, icons: { [d]: f } } : null
              Zt(e, [d], g)
            })
          })
          return
        }
        const { valid: i, invalid: s } = rf(l)
        if ((s.length && Zt(e, s, null), !i.length)) return
        const r = a.match(Pn) ? bo(o) : null
        if (!r) {
          Zt(e, i, null)
          return
        }
        r.prepare(o, a, i).forEach((d) => {
          nf(o, d, (u) => {
            Zt(e, d.icons, u)
          })
        })
      })))
}
const uf = (e, t) => {
  const o = tf(e, !0, Wn()),
    a = Xc(o)
  if (!a.pending.length) {
    let r = !0
    return (
      t &&
        setTimeout(() => {
          r && t(a.loaded, a.missing, a.pending, Ll)
        }),
      () => {
        r = !1
      }
    )
  }
  const l = Object.create(null),
    n = []
  let i, s
  return (
    a.pending.forEach((r) => {
      const { provider: d, prefix: u } = r
      if (u === s && d === i) return
      ;((i = d), (s = u), n.push(Nt(d, u)))
      const f = l[d] || (l[d] = Object.create(null))
      f[u] || (f[u] = [])
    }),
    a.pending.forEach((r) => {
      const { provider: d, prefix: u, name: f } = r,
        g = Nt(d, u),
        b = g.pendingIcons || (g.pendingIcons = new Set())
      b.has(f) || (b.add(f), l[d][u].push(f))
    }),
    n.forEach((r) => {
      const d = l[r.provider][r.prefix]
      d.length && df(r, d)
    }),
    t ? ef(t, a, n) : Ll
  )
}
function cf(e, t) {
  const o = { ...e }
  for (const a in t) {
    const l = t[a],
      n = typeof l
    a in Hn
      ? (l === null || (l && (n === 'string' || n === 'number'))) && (o[a] = l)
      : n === typeof o[a] && (o[a] = a === 'rotate' ? l % 4 : l)
  }
  return o
}
const ff = /[\s,]+/
function pf(e, t) {
  t.split(ff).forEach((o) => {
    switch (o.trim()) {
      case 'horizontal':
        e.hFlip = !0
        break
      case 'vertical':
        e.vFlip = !0
        break
    }
  })
}
function gf(e, t = 0) {
  const o = e.replace(/^-?[0-9.]*/, '')
  function a(l) {
    for (; l < 0; ) l += 4
    return l % 4
  }
  if (o === '') {
    const l = parseInt(e)
    return isNaN(l) ? 0 : a(l)
  } else if (o !== e) {
    let l = 0
    switch (o) {
      case '%':
        l = 25
        break
      case 'deg':
        l = 90
    }
    if (l) {
      let n = parseFloat(e.slice(0, e.length - o.length))
      return isNaN(n) ? 0 : ((n = n / l), n % 1 === 0 ? a(n) : 0)
    }
  }
  return t
}
function vf(e, t) {
  let o = e.indexOf('xlink:') === -1 ? '' : ' xmlns:xlink="http://www.w3.org/1999/xlink"'
  for (const a in t) o += ' ' + a + '="' + t[a] + '"'
  return '<svg xmlns="http://www.w3.org/2000/svg"' + o + '>' + e + '</svg>'
}
function mf(e) {
  return e
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
    .replace(/\s+/g, ' ')
}
function hf(e) {
  return 'data:image/svg+xml,' + mf(e)
}
function bf(e) {
  return 'url("' + hf(e) + '")'
}
const ql = { ...jn, inline: !1 },
  yf = {
    xmlns: 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
    'aria-hidden': !0,
    role: 'img',
  },
  _f = { display: 'inline-block' },
  _o = { backgroundColor: 'currentColor' },
  Un = { backgroundColor: 'transparent' },
  El = { Image: 'var(--svg)', Repeat: 'no-repeat', Size: '100% 100%' },
  Pl = { webkitMask: _o, mask: _o, background: Un }
for (const e in Pl) {
  const t = Pl[e]
  for (const o in El) t[e + o] = El[o]
}
const ha = {}
;['horizontal', 'vertical'].forEach((e) => {
  const t = e.slice(0, 1) + 'Flip'
  ;((ha[e + '-flip'] = t), (ha[e.slice(0, 1) + '-flip'] = t), (ha[e + 'Flip'] = t))
})
function Tl(e) {
  return e + (e.match(/^[-0-9.]+$/) ? 'px' : '')
}
const Rl = (e, t) => {
  const o = cf(ql, t),
    a = { ...yf },
    l = t.mode || 'svg',
    n = {},
    i = t.style,
    s = typeof i == 'object' && !(i instanceof Array) ? i : {}
  for (let _ in t) {
    const k = t[_]
    if (k !== void 0)
      switch (_) {
        case 'icon':
        case 'style':
        case 'onLoad':
        case 'mode':
        case 'ssr':
          break
        case 'inline':
        case 'hFlip':
        case 'vFlip':
          o[_] = k === !0 || k === 'true' || k === 1
          break
        case 'flip':
          typeof k == 'string' && pf(o, k)
          break
        case 'color':
          n.color = k
          break
        case 'rotate':
          typeof k == 'string' ? (o[_] = gf(k)) : typeof k == 'number' && (o[_] = k)
          break
        case 'ariaHidden':
        case 'aria-hidden':
          k !== !0 && k !== 'true' && delete a['aria-hidden']
          break
        default: {
          const S = ha[_]
          S ? (k === !0 || k === 'true' || k === 1) && (o[S] = !0) : ql[_] === void 0 && (a[_] = k)
        }
      }
  }
  const r = Pc(e, o),
    d = r.attributes
  if ((o.inline && (n.verticalAlign = '-0.125em'), l === 'svg')) {
    ;((a.style = { ...n, ...s }), Object.assign(a, d))
    let _ = 0,
      k = t.id
    return (
      typeof k == 'string' && (k = k.replace(/-/g, '_')),
      (a.innerHTML = Nc(r.body, k ? () => k + 'ID' + _++ : 'iconifyVue')),
      st('svg', a)
    )
  }
  const { body: u, width: f, height: g } = e,
    b = l === 'mask' || (l === 'bg' ? !1 : u.indexOf('currentColor') !== -1),
    m = vf(u, { ...d, width: f + '', height: g + '' })
  return (
    (a.style = {
      ...n,
      '--svg': bf(m),
      width: Tl(d.width),
      height: Tl(d.height),
      ..._f,
      ...(b ? _o : Un),
      ...s,
    }),
    st('span', a)
  )
}
Wn(!0)
Wc('', Yc)
if (typeof document < 'u' && typeof window < 'u') {
  const e = window
  if (e.IconifyPreload !== void 0) {
    const t = e.IconifyPreload,
      o = 'Invalid IconifyPreload syntax.'
    typeof t == 'object' &&
      t !== null &&
      (t instanceof Array ? t : [t]).forEach((a) => {
        try {
          ;(typeof a != 'object' ||
            a === null ||
            a instanceof Array ||
            typeof a.icons != 'object' ||
            typeof a.prefix != 'string' ||
            !Ic(a)) &&
            console.error(o)
        } catch {
          console.error(o)
        }
      })
  }
  if (e.IconifyProviders !== void 0) {
    const t = e.IconifyProviders
    if (typeof t == 'object' && t !== null)
      for (let o in t) {
        const a = 'IconifyProviders[' + o + '] is invalid.'
        try {
          const l = t[o]
          if (typeof l != 'object' || !l || l.resources === void 0) continue
          Hc(o, l) || console.error(a)
        } catch {
          console.error(a)
        }
      }
  }
}
const kf = { ...Ga, body: '' },
  wf = x(
    (e, { emit: t }) => {
      const o = C(null)
      function a() {
        o.value && (o.value.abort?.(), (o.value = null))
      }
      const l = C(!!e.ssr),
        n = C(''),
        i = Dt(null)
      function s() {
        const d = e.icon
        if (typeof d == 'object' && d !== null && typeof d.body == 'string')
          return ((n.value = ''), { data: d })
        let u
        if (typeof d != 'string' || (u = ja(d, !1, !0)) === null) return null
        let f = Bc(u)
        if (!f) {
          const m = o.value
          return (
            (!m || m.name !== d) &&
              (f === null ? (o.value = { name: d }) : (o.value = { name: d, abort: uf([u], r) })),
            null
          )
        }
        ;(a(),
          n.value !== d &&
            ((n.value = d),
            he(() => {
              t('load', d)
            })))
        const g = e.customise
        if (g) {
          f = Object.assign({}, f)
          const m = g(f.body, u.name, u.prefix, u.provider)
          typeof m == 'string' && (f.body = m)
        }
        const b = ['iconify']
        return (
          u.prefix !== '' && b.push('iconify--' + u.prefix),
          u.provider !== '' && b.push('iconify--' + u.provider),
          { data: f, classes: b }
        )
      }
      function r() {
        const d = s()
        d ? d.data !== i.value?.data && (i.value = d) : (i.value = null)
      }
      return (
        l.value
          ? r()
          : we(() => {
              ;((l.value = !0), r())
            }),
        pe(() => e.icon, r),
        Te(a),
        () => {
          const d = i.value
          if (!d) return Rl(kf, e)
          let u = e
          return (
            d.classes && (u = { ...e, class: d.classes.join(' ') }),
            Rl({ ...Ga, ...d.data }, u)
          )
        }
      )
    },
    {
      props: [
        'icon',
        'mode',
        'ssr',
        'width',
        'height',
        'style',
        'color',
        'inline',
        'rotate',
        'hFlip',
        'horizontalFlip',
        'vFlip',
        'verticalFlip',
        'flip',
        'id',
        'ariaHidden',
        'customise',
        'title',
      ],
      emits: ['load'],
    },
  ),
  xf = x({
    inheritAttrs: !1,
    __name: 'AGDSIcon',
    props: { name: {}, size: { default: 'md' }, color: {} },
    setup(e) {
      const t = e,
        o = oa(),
        a = {
          sm: 'var(--agds-icon-size-sm)',
          md: 'var(--agds-icon-size-md)',
          lg: 'var(--agds-icon-size-lg)',
          xl: 'var(--agds-icon-size-xl)',
        },
        l = y(() => (typeof t.name == 'string' ? t.name.replace(/^i-/, '') : '')),
        n = y(() => {
          const r = t.size
          return typeof r == 'number' ? `${r}px` : r && r in a ? a[r] : (r ?? a.md)
        }),
        i = y(() => ({ fontSize: n.value, ...(t.color ? { color: t.color } : {}) })),
        s = y(() =>
          o['aria-label']
            ? { 'aria-hidden': 'false' }
            : o['aria-hidden'] === void 0
              ? { 'aria-hidden': 'true' }
              : {},
        )
      return (r, d) =>
        typeof e.name == 'string'
          ? (c(),
            $(
              v(wf),
              te(
                { key: 0, icon: l.value, focusable: 'false', class: 'agds-icon' },
                { ...r.$attrs, ...s.value },
                { style: i.value },
              ),
              null,
              16,
              ['icon', 'style'],
            ))
          : (c(),
            $(
              ke(e.name),
              te({ key: 1, class: 'agds-icon' }, { ...r.$attrs, ...s.value }, { style: i.value }),
              null,
              16,
              ['style'],
            ))
    },
  }),
  F = (e, t) => {
    const o = e.__vccOpts || e
    for (const [a, l] of t) o[a] = l
    return o
  },
  De = F(xf, [['__scopeId', 'data-v-7d15793f']]),
  Sf = x({
    __name: 'AGDSBreadcrumbsDivider',
    setup(e) {
      return (t, o) => (
        c(),
        $(De, {
          name: 'mdi:chevron-right',
          size: 'sm',
          'aria-hidden': 'true',
          class: 'agds-breadcrumbs__divider',
        })
      )
    },
  }),
  Kn = F(Sf, [['__scopeId', 'data-v-7b99561f']]),
  Af = { class: 'agds-breadcrumbs__item' },
  Cf = ['href', 'aria-current'],
  Df = { key: 0, class: 'sr-only' },
  Bf = ['aria-current'],
  $f = { key: 0, class: 'sr-only' },
  If = x({
    __name: 'AGDSBreadcrumbsItem',
    props: { href: {}, label: {}, current: { type: Boolean, default: !1 } },
    setup(e, { expose: t }) {
      const o = C(null)
      return (
        t({ focus: () => o.value?.focus() }),
        (a, l) => (
          c(),
          h('li', Af, [
            E(Kn),
            e.href
              ? (c(),
                h(
                  'a',
                  {
                    key: 0,
                    ref_key: 'linkRef',
                    ref: o,
                    href: e.href,
                    'aria-current': e.current ? 'page' : void 0,
                    class: 'agds-breadcrumbs__link',
                  },
                  [
                    de(M(e.label), 1),
                    e.current ? (c(), h('span', Df, ' (current page)')) : O('', !0),
                  ],
                  8,
                  Cf,
                ))
              : (c(),
                h(
                  'span',
                  {
                    key: 1,
                    'aria-current': e.current ? 'page' : void 0,
                    class: 'agds-breadcrumbs__text',
                  },
                  [
                    de(M(e.label), 1),
                    e.current ? (c(), h('span', $f, ' (current page)')) : O('', !0),
                  ],
                  8,
                  Bf,
                )),
          ])
        )
      )
    },
  }),
  ba = F(If, [['__scopeId', 'data-v-74bbe2c0']]),
  Mf = { class: 'agds-breadcrumbs__item' },
  Of = x({
    __name: 'AGDSBreadcrumbsToggle',
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = t
      function a(l) {
        o('click', l)
      }
      return (l, n) => (
        c(),
        h('li', Mf, [
          E(Kn),
          p(
            'button',
            {
              type: 'button',
              class: 'agds-breadcrumbs__toggle',
              'aria-expanded': 'false',
              'aria-label': 'Show all breadcrumbs',
              onClick: a,
            },
            ' … ',
          ),
        ])
      )
    },
  }),
  Lf = F(Of, [['__scopeId', 'data-v-ef32eca7']]),
  Ff = ['aria-label'],
  qf = { class: 'agds-breadcrumbs__list' },
  Ef = x({
    __name: 'AGDSBreadcrumbs',
    props: { ariaLabel: { default: 'Breadcrumbs' }, links: {} },
    setup(e) {
      const t = e,
        o = y(() => t.links[0]),
        a = y(() => t.links[t.links.length - 1]),
        l = y(() => t.links.filter((d, u, f) => u !== 0 && u !== f.length - 1)),
        n = y(() => l.value.length > 0),
        i = C(!1),
        s = C(null)
      async function r() {
        ;((i.value = !0), await he(), s.value?.focus())
      }
      return (d, u) => (
        c(),
        h(
          'nav',
          {
            'aria-label': t.ariaLabel,
            class: I(['agds-breadcrumbs', { 'agds-breadcrumbs--collapsed': n.value && !i.value }]),
          },
          [
            p('ol', qf, [
              E(
                ba,
                { ref_key: 'firstItemRef', ref: s, href: o.value.href, label: o.value.label },
                null,
                8,
                ['href', 'label'],
              ),
              n.value
                ? (c(), $(Lf, { key: 0, class: 'agds-breadcrumbs__toggle-item', onClick: r }))
                : O('', !0),
              (c(!0),
              h(
                ae,
                null,
                fe(
                  l.value,
                  (f, g) => (
                    c(),
                    $(
                      ba,
                      {
                        key: g,
                        href: f.href,
                        label: f.label,
                        class: 'agds-breadcrumbs__middle-item',
                      },
                      null,
                      8,
                      ['href', 'label'],
                    )
                  ),
                ),
                128,
              )),
              t.links.length > 1
                ? (c(),
                  $(
                    ba,
                    { key: 1, href: a.value.href, label: a.value.label, current: !0 },
                    null,
                    8,
                    ['href', 'label'],
                  ))
                : O('', !0),
            ]),
          ],
          10,
          Ff,
        )
      )
    },
  }),
  Pf = F(Ef, [['__scopeId', 'data-v-44971669']]),
  Tf = ['type', 'disabled', 'aria-busy', 'aria-disabled'],
  Rf = { 'aria-live': 'assertive', class: 'agds-button__live-region' },
  Vf = { key: 0, class: 'agds-button__loading-indicator' },
  Nf = { class: 'sr-only' },
  Wf = x({
    __name: 'AGDSButton',
    props: {
      variant: { default: 'primary' },
      size: { default: 'md' },
      block: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      loading: { type: Boolean, default: !1 },
      loadingLabel: { default: 'Loading' },
      type: { default: 'button' },
      focusRingFor: { default: 'keyboard' },
    },
    emits: ['click', 'focus', 'blur', 'keydown'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = C(null)
      t({ focus: () => n.value?.focus() })
      function i(s) {
        ;(n.value?.focus(), !a.disabled && !a.loading && l('click', s))
      }
      return (s, r) => (
        c(),
        h(
          'button',
          {
            ref_key: 'buttonRef',
            ref: n,
            type: a.type,
            disabled: a.disabled || a.loading,
            'aria-busy': a.loading ? !0 : void 0,
            'aria-disabled': a.disabled || a.loading ? !0 : void 0,
            class: I([
              'agds-button',
              `agds-button--${a.variant}`,
              `agds-button--${a.size}`,
              {
                'agds-button--block': a.block,
                'agds-button--loading': a.loading,
                'agds-button--disabled': a.disabled,
                'agds-button--focus-all': a.focusRingFor === 'all',
              },
            ]),
            onClick: i,
            onFocus: r[0] || (r[0] = (d) => l('focus', d)),
            onBlur: r[1] || (r[1] = (d) => l('blur', d)),
            onKeydown: r[2] || (r[2] = (d) => l('keydown', d)),
          },
          [
            s.$slots.iconBefore
              ? (c(),
                h(
                  'span',
                  {
                    key: 0,
                    class: I(['agds-button__icon', { 'agds-button__icon--hidden': a.loading }]),
                    'aria-hidden': 'true',
                  },
                  [A(s.$slots, 'iconBefore', {}, void 0, !0)],
                  2,
                ))
              : O('', !0),
            p(
              'span',
              { class: I(['agds-button__label', { 'agds-button__label--hidden': a.loading }]) },
              [A(s.$slots, 'default', {}, void 0, !0)],
              2,
            ),
            s.$slots.iconAfter
              ? (c(),
                h(
                  'span',
                  {
                    key: 1,
                    class: I(['agds-button__icon', { 'agds-button__icon--hidden': a.loading }]),
                    'aria-hidden': 'true',
                  },
                  [A(s.$slots, 'iconAfter', {}, void 0, !0)],
                  2,
                ))
              : O('', !0),
            p('span', Rf, [
              a.loading
                ? (c(),
                  h('span', Vf, [
                    r[3] ||
                      (r[3] = p(
                        'span',
                        { class: 'agds-button__spinner', 'aria-hidden': 'true' },
                        null,
                        -1,
                      )),
                    p('span', Nf, M(a.loadingLabel), 1),
                  ]))
                : O('', !0),
            ]),
          ],
          42,
          Tf,
        )
      )
    },
  }),
  Mt = F(Wf, [['__scopeId', 'data-v-8c021442']]),
  Hf = ['href', 'target', 'rel'],
  jf = { key: 0, class: 'agds-button__icon', 'aria-hidden': 'true' },
  Gf = { class: 'agds-button__label' },
  zf = { key: 1, class: 'agds-button__icon', 'aria-hidden': 'true' },
  Uf = { key: 2, class: 'sr-only' },
  Kf = x({
    __name: 'AGDSButtonLink',
    props: {
      href: {},
      variant: { default: 'primary' },
      size: { default: 'md' },
      block: { type: Boolean, default: !1 },
      external: { type: Boolean, default: !1 },
    },
    emits: ['click', 'focus', 'blur'],
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'a',
          {
            href: e.href,
            target: e.external ? '_blank' : void 0,
            rel: e.external ? 'noopener noreferrer' : void 0,
            class: I([
              'agds-button',
              `agds-button--${e.variant}`,
              `agds-button--${e.size}`,
              { 'agds-button--block': e.block },
            ]),
            onClick: o[0] || (o[0] = (a) => t.$emit('click', a)),
            onFocus: o[1] || (o[1] = (a) => t.$emit('focus', a)),
            onBlur: o[2] || (o[2] = (a) => t.$emit('blur', a)),
          },
          [
            t.$slots.iconBefore
              ? (c(), h('span', jf, [A(t.$slots, 'iconBefore', {}, void 0, !0)]))
              : O('', !0),
            p('span', Gf, [A(t.$slots, 'default', {}, void 0, !0)]),
            t.$slots.iconAfter
              ? (c(), h('span', zf, [A(t.$slots, 'iconAfter', {}, void 0, !0)]))
              : O('', !0),
            e.external ? (c(), h('span', Uf, ', opens in a new tab')) : O('', !0),
          ],
          42,
          Hf,
        )
      )
    },
  }),
  Zf = F(Kf, [['__scopeId', 'data-v-84656420']]),
  Yf = x({
    __name: 'AGDSToggleButton',
    props: {
      pressed: { type: Boolean },
      label: {},
      pressedLabel: {},
      hiddenLabel: { type: Boolean, default: !1 },
      iconType: { default: 'flag' },
      size: { default: 'md' },
      variant: { default: 'text' },
      disabled: { type: Boolean, default: !1 },
    },
    emits: ['update:pressed'],
    setup(e, { expose: t, emit: o }) {
      const a = {
          flag: { false: 'mdi:flag-outline', true: 'mdi:flag' },
          star: { false: 'mdi:star-outline', true: 'mdi:star' },
        },
        l = e,
        n = o,
        i = C(null)
      t({ focus: () => i.value?.focus() })
      const s = y(() => (l.pressed ? l.pressedLabel : l.label)),
        r = y(() => a[l.iconType][String(l.pressed)])
      function d() {
        l.disabled || n('update:pressed', !l.pressed)
      }
      return (u, f) => (
        c(),
        $(
          Mt,
          {
            ref_key: 'buttonRef',
            ref: i,
            type: 'button',
            size: l.size,
            variant: l.variant,
            disabled: l.disabled,
            'aria-pressed': l.pressed,
            'aria-label': l.hiddenLabel ? s.value : void 0,
            onClick: d,
          },
          aa(
            {
              iconBefore: w(() => [
                E(De, { name: r.value, 'aria-hidden': 'true' }, null, 8, ['name']),
              ]),
              _: 2,
            },
            [
              l.hiddenLabel
                ? void 0
                : { name: 'default', fn: w(() => [de(M(s.value), 1)]), key: '0' },
            ],
          ),
          1032,
          ['size', 'variant', 'disabled', 'aria-pressed', 'aria-label'],
        )
      )
    },
  }),
  Xf = x({
    __name: 'AGDSAccordion',
    props: {
      type: { default: 'multiple' },
      collapsible: { type: Boolean, default: !0 },
      modelValue: {},
      defaultValue: {},
      indent: { type: Boolean, default: !1 },
      background: { default: 'body' },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t
      return (
        qe('accordionIndent', o.indent),
        qe('accordionBackground', o.background),
        (l, n) => (
          c(),
          $(
            v(Ws),
            {
              type: o.type,
              collapsible: o.type === 'single' ? o.collapsible : void 0,
              'model-value': o.modelValue,
              'default-value': o.defaultValue,
              class: 'agds-accordion',
              'onUpdate:modelValue':
                n[0] || (n[0] = (i) => i !== void 0 && a('update:modelValue', i)),
            },
            { default: w(() => [A(l.$slots, 'default', {}, void 0, !0)]), _: 3 },
            8,
            ['type', 'collapsible', 'model-value', 'default-value'],
          )
        )
      )
    },
  }),
  Qf = F(Xf, [['__scopeId', 'data-v-3c55f372']]),
  Jf = { class: 'agds-accordion-item__title' },
  ep = { class: 'agds-accordion-item__panel-inner' },
  tp = x({
    __name: 'AGDSAccordionItem',
    props: {
      value: {},
      title: {},
      background: { default: void 0 },
      headingLevel: { default: 3 },
      disabled: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = e,
        o = Pe('accordionBackground', 'body'),
        a = y(() => t.background ?? o),
        l = Pe('accordionIndent', !1)
      return (n, i) => (
        c(),
        $(
          v(Gs),
          {
            value: t.value,
            disabled: t.disabled,
            class: I(['agds-accordion-item', `agds-accordion-item--bg-${a.value}`]),
          },
          {
            default: w(() => [
              E(
                v(Zs),
                { as: `h${t.headingLevel}`, class: 'agds-accordion-item__heading' },
                {
                  default: w(() => [
                    E(
                      v(Xs),
                      {
                        class: I([
                          'agds-accordion-item__trigger',
                          `agds-accordion-item__trigger--bg-${a.value}`,
                          { 'agds-accordion-item__trigger--indented': v(l) },
                        ]),
                      },
                      {
                        default: w(() => [
                          p('span', Jf, M(t.title), 1),
                          i[0] ||
                            (i[0] = p(
                              'svg',
                              {
                                class: 'agds-accordion-item__chevron',
                                'aria-hidden': 'true',
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2.5',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                              },
                              [p('polyline', { points: '6 9 12 15 18 9' })],
                              -1,
                            )),
                        ]),
                        _: 1,
                      },
                      8,
                      ['class'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['as'],
              ),
              E(
                v(Us),
                {
                  class: I([
                    'agds-accordion-item__panel',
                    { 'agds-accordion-item__panel--indented': v(l) },
                  ]),
                },
                {
                  default: w(() => [p('div', ep, [A(n.$slots, 'default', {}, void 0, !0)])]),
                  _: 3,
                },
                8,
                ['class'],
              ),
            ]),
            _: 3,
          },
          8,
          ['value', 'disabled', 'class'],
        )
      )
    },
  }),
  ap = F(tp, [['__scopeId', 'data-v-72c61c65']])
function op(e) {
  const t = Array.from(e.matchAll(new RegExp('(\\p{L})\\p{L}+', 'gu')))
  if (!t.length) return '?'
  const o = t.shift()?.[1] || '',
    a = t.pop()?.[1] || ''
  return (o + a).toUpperCase()
}
const lp = ['role', 'aria-label', 'aria-hidden'],
  np = x({
    inheritAttrs: !1,
    __name: 'AGDSAvatar',
    props: { name: {}, tone: { default: 'neutral' }, size: { default: 'md' } },
    setup(e) {
      const t = e,
        o = oa(),
        a = y(() => op(t.name)),
        l = y(() => o['aria-hidden'] === !0 || o['aria-hidden'] === 'true'),
        n = y(() => {
          if (!l.value) return 'aria-label' in o ? o['aria-label'] || void 0 : t.name
        })
      return (i, s) => (
        c(),
        h(
          'span',
          te(v(o), {
            class: ['agds-avatar', `agds-avatar--${t.tone}`, `agds-avatar--${t.size}`],
            role: l.value ? void 0 : 'img',
            'aria-label': n.value,
            'aria-hidden': l.value ? 'true' : void 0,
          }),
          M(a.value),
          17,
          lp,
        )
      )
    },
  }),
  ip = F(np, [['__scopeId', 'data-v-d63a2b17']]),
  sp = { key: 0, class: 'agds-callout__icon' },
  rp = { class: 'agds-callout__content' },
  dp = { key: 0, class: 'agds-callout__title' },
  up = x({
    __name: 'AGDSCallout',
    props: {
      as: { default: 'div' },
      title: {},
      tone: { default: 'neutral' },
      variant: { default: 'regular' },
      onBodyAlt: { type: Boolean, default: !1 },
      background: {},
    },
    setup(e) {
      const t = e,
        o = y(() => t.tone === 'neutral' && (t.onBodyAlt || t.background === 'shadeAlt')),
        a = y(() => t.tone === 'info')
      return (l, n) => (
        c(),
        $(
          ke(t.as),
          {
            class: I([
              'agds-callout',
              `agds-callout--${t.tone}`,
              `agds-callout--${t.variant}`,
              { 'agds-callout--body-alt': o.value },
            ]),
          },
          {
            default: w(() => [
              l.$slots.icon || a.value
                ? (c(),
                  h('span', sp, [
                    A(
                      l.$slots,
                      'icon',
                      {},
                      () => [
                        n[0] ||
                          (n[0] = p(
                            'span',
                            {
                              role: 'img',
                              'aria-label': 'Information',
                              class: 'agds-callout__icon-inner',
                            },
                            [
                              p(
                                'svg',
                                {
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  fill: 'currentColor',
                                  'aria-hidden': 'true',
                                  focusable: 'false',
                                },
                                [
                                  p('path', {
                                    'fill-rule': 'evenodd',
                                    d: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
                                    'clip-rule': 'evenodd',
                                  }),
                                ],
                              ),
                            ],
                            -1,
                          )),
                      ],
                      !0,
                    ),
                  ]))
                : O('', !0),
              p('div', rp, [
                t.title ? (c(), h('p', dp, M(t.title), 1)) : O('', !0),
                A(l.$slots, 'default', {}, void 0, !0),
              ]),
            ]),
            _: 3,
          },
          8,
          ['class'],
        )
      )
    },
  }),
  cp = F(up, [['__scopeId', 'data-v-7bd52606']]),
  fp = ['aria-label'],
  pp = { class: 'agds-global-alert__strip', 'aria-hidden': 'true' },
  gp = {
    key: 0,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    focusable: 'false',
    'aria-hidden': 'true',
  },
  vp = {
    key: 1,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    focusable: 'false',
    'aria-hidden': 'true',
  },
  mp = { class: 'agds-global-alert__body' },
  hp = { key: 0, class: 'agds-global-alert__title' },
  bp = { class: 'agds-global-alert__content' },
  yp = x({
    __name: 'AGDSGlobalAlert',
    props: { title: {}, tone: { default: 'warning' }, onClose: {} },
    setup(e) {
      const t = e,
        o = y(() => (t.tone === 'info' ? 'Information' : 'Warning')),
        a = y(() => t.title || o.value)
      return (l, n) => (
        c(),
        h(
          'section',
          {
            class: I(['agds-global-alert', `agds-global-alert--${t.tone}`]),
            'aria-label': a.value,
          },
          [
            p('div', pp, [
              t.tone === 'info'
                ? (c(),
                  h('svg', gp, [
                    ...(n[1] ||
                      (n[1] = [
                        p(
                          'path',
                          {
                            'fill-rule': 'evenodd',
                            d: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
                            'clip-rule': 'evenodd',
                          },
                          null,
                          -1,
                        ),
                      ])),
                  ]))
                : (c(),
                  h('svg', vp, [
                    ...(n[2] ||
                      (n[2] = [
                        p(
                          'path',
                          {
                            'fill-rule': 'evenodd',
                            d: 'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
                            'clip-rule': 'evenodd',
                          },
                          null,
                          -1,
                        ),
                      ])),
                  ])),
            ]),
            p('div', mp, [
              p(
                'div',
                {
                  class: I([
                    'agds-global-alert__inner',
                    { 'agds-global-alert__inner--with-close': !!t.onClose },
                  ]),
                },
                [
                  t.title ? (c(), h('h2', hp, M(t.title), 1)) : O('', !0),
                  p('div', bp, [A(l.$slots, 'default', {}, void 0, !0)]),
                ],
                2,
              ),
              t.onClose
                ? (c(),
                  h(
                    'button',
                    {
                      key: 0,
                      type: 'button',
                      'aria-label': 'Close',
                      class: 'agds-global-alert__close',
                      onClick: n[0] || (n[0] = (i) => t.onClose()),
                    },
                    [
                      ...(n[3] ||
                        (n[3] = [
                          p('span', { class: 'agds-global-alert__close-label' }, 'Close', -1),
                          p(
                            'svg',
                            {
                              xmlns: 'http://www.w3.org/2000/svg',
                              viewBox: '0 0 24 24',
                              fill: 'none',
                              stroke: 'currentColor',
                              'stroke-width': '2',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              focusable: 'false',
                              'aria-hidden': 'true',
                            },
                            [p('path', { d: 'M18 6 6 18M6 6l12 12' })],
                            -1,
                          ),
                        ])),
                    ],
                  ))
                : O('', !0),
            ]),
          ],
          10,
          fp,
        )
      )
    },
  }),
  _p = F(yp, [['__scopeId', 'data-v-8b1dd069']]),
  Ie = {
    infoFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
    successFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
    warningFilled:
      'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    alertFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    infoOutline:
      'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
    successOutline: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
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
    pauseCircle: 'M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  Me = {
    body: 'var(--agds-color-bg)',
    info: 'var(--agds-color-info-muted)',
    success: 'var(--agds-color-success-muted)',
    warning: 'var(--agds-color-warning-muted)',
    error: 'var(--agds-color-error-muted)',
  },
  Oe = {
    neutral: 'var(--agds-color-border)',
    info: 'var(--agds-color-info)',
    success: 'var(--agds-color-success)',
    warning: 'var(--agds-color-warning)',
    error: 'var(--agds-color-error)',
  },
  Le = {
    muted: 'var(--agds-color-text-muted)',
    info: 'var(--agds-color-info)',
    success: 'var(--agds-color-success)',
    warning: 'var(--agds-color-warning)',
    error: 'var(--agds-color-error)',
  },
  kp = {
    cannotStartLow: {
      iconPath: Ie.noSymbol,
      iconVariant: 'outline',
      iconLabel: 'cannot start',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    errorHigh: {
      iconPath: Ie.alertFilled,
      iconVariant: 'filled',
      iconLabel: 'error',
      bg: Me.error,
      borderColor: Oe.error,
      iconColor: Le.error,
      enclosedBorder: !1,
    },
    errorLow: {
      iconPath: Ie.alertCircleOutline,
      iconVariant: 'outline',
      iconLabel: 'error',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    errorMedium: {
      iconPath: Ie.warningOutline,
      iconVariant: 'outline',
      iconLabel: 'error',
      bg: Me.body,
      borderColor: Oe.error,
      iconColor: Le.error,
      enclosedBorder: !0,
    },
    infoHigh: {
      iconPath: Ie.infoFilled,
      iconVariant: 'filled',
      iconLabel: 'information',
      bg: Me.info,
      borderColor: Oe.info,
      iconColor: Le.info,
      enclosedBorder: !1,
    },
    infoLow: {
      iconPath: Ie.infoOutline,
      iconVariant: 'outline',
      iconLabel: 'information',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    infoMedium: {
      iconPath: Ie.infoOutline,
      iconVariant: 'outline',
      iconLabel: 'information',
      bg: Me.body,
      borderColor: Oe.info,
      iconColor: Le.info,
      enclosedBorder: !0,
    },
    inProgressLow: {
      iconPath: Ie.arrowPath,
      iconVariant: 'outline',
      iconLabel: 'in progress',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    notStartedLow: {
      iconPath: Ie.clock,
      iconVariant: 'outline',
      iconLabel: 'not started',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    pausedLow: {
      iconPath: Ie.pauseCircle,
      iconVariant: 'outline',
      iconLabel: 'paused',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    successHigh: {
      iconPath: Ie.successFilled,
      iconVariant: 'filled',
      iconLabel: 'success',
      bg: Me.success,
      borderColor: Oe.success,
      iconColor: Le.success,
      enclosedBorder: !1,
    },
    successLow: {
      iconPath: Ie.successOutline,
      iconVariant: 'outline',
      iconLabel: 'success',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    successMedium: {
      iconPath: Ie.successOutline,
      iconVariant: 'outline',
      iconLabel: 'success',
      bg: Me.body,
      borderColor: Oe.success,
      iconColor: Le.success,
      enclosedBorder: !0,
    },
    unknownLow: {
      iconPath: Ie.helpOutline,
      iconVariant: 'outline',
      iconLabel: 'unknown',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    warningHigh: {
      iconPath: Ie.warningFilled,
      iconVariant: 'filled',
      iconLabel: 'warning',
      bg: Me.warning,
      borderColor: Oe.warning,
      iconColor: Le.warning,
      enclosedBorder: !1,
    },
    warningLow: {
      iconPath: Ie.alertCircleOutline,
      iconVariant: 'outline',
      iconLabel: 'warning',
      bg: Me.body,
      borderColor: Oe.neutral,
      iconColor: Le.muted,
      enclosedBorder: !0,
    },
    warningMedium: {
      iconPath: Ie.warningOutline,
      iconVariant: 'outline',
      iconLabel: 'warning',
      bg: Me.body,
      borderColor: Oe.warning,
      iconColor: Le.warning,
      enclosedBorder: !0,
    },
  },
  Vl = { error: 'errorHigh', success: 'successHigh', warning: 'warningHigh', info: 'infoHigh' }
function wp(e) {
  return e in Vl ? Vl[e] : e
}
const xp = ['id', 'role', 'aria-labelledby', 'tabindex'],
  Sp = { class: 'agds-section-alert__icon-wrap' },
  Ap = {
    key: 0,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    focusable: 'false',
    'aria-hidden': 'true',
    class: 'agds-section-alert__icon',
  },
  Cp = ['d'],
  Dp = {
    key: 1,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '1.5',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    focusable: 'false',
    'aria-hidden': 'true',
    class: 'agds-section-alert__icon',
  },
  Bp = ['d'],
  $p = ['id'],
  Ip = { class: 'agds-section-alert__body' },
  Mp = ['id'],
  Op = ['id'],
  Lp = x({
    __name: 'AGDSSectionAlert',
    props: {
      tone: {},
      title: {},
      id: {},
      role: { default: 'region' },
      tabIndex: {},
      focusOnMount: { type: Boolean },
      focusOnUpdate: {},
      onClose: {},
      onDismiss: {},
    },
    setup(e, { expose: t }) {
      const o = e
      t({ focus: () => u.value?.focus() })
      const a = ge()?.uid,
        l = y(() => o.id ?? `section-alert-${a}`),
        n = y(() => `${l.value}-icon`),
        i = y(() => `${l.value}-title`),
        s = y(() => `${l.value}-body`),
        r = Da(),
        d = y(() => {
          const k = [n.value, i.value]
          return (r.default && k.push(s.value), k.join(' '))
        }),
        u = C(null),
        f = y(() => {
          if (o.tabIndex !== void 0) return o.tabIndex
          if (o.focusOnMount || o.focusOnUpdate !== void 0) return -1
        })
      ;(we(() => {
        o.focusOnMount && u.value?.focus()
      }),
        pe(
          () => o.focusOnUpdate,
          () => {
            u.value?.focus()
          },
          { deep: !0 },
        ))
      const g = y(() => wp(o.tone)),
        b = y(() => kp[g.value]),
        m = y(() => ({
          '--sa-bg': b.value.bg,
          '--sa-border-color': b.value.borderColor,
          '--sa-icon-color': b.value.iconColor,
        })),
        _ = y(() => o.onClose ?? o.onDismiss ?? null)
      return (k, S) => (
        c(),
        h(
          'div',
          {
            ref_key: 'alertRef',
            ref: u,
            id: o.id,
            class: I([
              'agds-section-alert',
              `agds-section-alert--${g.value}`,
              { 'agds-section-alert--enclosed': b.value.enclosedBorder },
            ]),
            style: xe(m.value),
            role: o.role,
            'aria-labelledby': d.value,
            tabindex: f.value,
          },
          [
            p('span', Sp, [
              b.value.iconVariant === 'filled'
                ? (c(),
                  h('svg', Ap, [
                    p(
                      'path',
                      { 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', d: b.value.iconPath },
                      null,
                      8,
                      Cp,
                    ),
                  ]))
                : (c(), h('svg', Dp, [p('path', { d: b.value.iconPath }, null, 8, Bp)])),
              p(
                'span',
                { id: n.value, class: 'agds-section-alert__sr-tone' },
                M(b.value.iconLabel),
                9,
                $p,
              ),
            ]),
            p('div', Ip, [
              p('p', { id: i.value, class: 'agds-section-alert__title' }, M(o.title), 9, Mp),
              k.$slots.default
                ? (c(),
                  h(
                    'div',
                    { key: 0, id: s.value, class: 'agds-section-alert__content' },
                    [A(k.$slots, 'default', {}, void 0, !0)],
                    8,
                    Op,
                  ))
                : O('', !0),
            ]),
            _.value
              ? (c(),
                h(
                  'button',
                  {
                    key: 0,
                    type: 'button',
                    'aria-label': 'Close',
                    class: 'agds-section-alert__close',
                    onClick: S[0] || (S[0] = (D) => _.value()),
                  },
                  [
                    ...(S[1] ||
                      (S[1] = [
                        p('span', { class: 'agds-section-alert__close-label' }, 'Close', -1),
                        p(
                          'svg',
                          {
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            'stroke-width': '2',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                            focusable: 'false',
                            'aria-hidden': 'true',
                            class: 'agds-section-alert__close-icon',
                          },
                          [p('path', { d: 'M18 6 6 18M6 6l12 12' })],
                          -1,
                        ),
                      ])),
                  ],
                ))
              : O('', !0),
          ],
          14,
          xp,
        )
      )
    },
  }),
  Fp = F(Lp, [['__scopeId', 'data-v-425bc5dd']]),
  Fe = {
    infoFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
    successFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
    warningFilled:
      'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    alertFilled:
      'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
    infoOutline:
      'm11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z',
    successOutline: 'M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
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
    pauseCircle: 'M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
    clock: 'M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  },
  Be = {
    neutral: 'var(--agds-color-border)',
    info: 'var(--agds-color-info)',
    success: 'var(--agds-color-success)',
    warning: 'var(--agds-color-warning)',
    error: 'var(--agds-color-error)',
  },
  $e = {
    muted: 'var(--agds-color-text-muted)',
    info: 'var(--agds-color-info)',
    success: 'var(--agds-color-success)',
    warning: 'var(--agds-color-warning)',
    error: 'var(--agds-color-error)',
  },
  qp = {
    cannotStartLow: {
      iconVariant: 'outline',
      iconPath: Fe.noSymbol,
      iconLabel: 'cannot start',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    errorHigh: {
      iconVariant: 'filled',
      iconPath: Fe.alertFilled,
      iconLabel: 'error',
      borderColor: Be.error,
      iconColor: $e.error,
    },
    errorLow: {
      iconVariant: 'outline',
      iconPath: Fe.alertCircleOutline,
      iconLabel: 'error',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    errorMedium: {
      iconVariant: 'outline',
      iconPath: Fe.warningOutline,
      iconLabel: 'error',
      borderColor: Be.error,
      iconColor: $e.error,
    },
    infoHigh: {
      iconVariant: 'filled',
      iconPath: Fe.infoFilled,
      iconLabel: 'information',
      borderColor: Be.info,
      iconColor: $e.info,
    },
    infoLow: {
      iconVariant: 'outline',
      iconPath: Fe.infoOutline,
      iconLabel: 'information',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    infoMedium: {
      iconVariant: 'outline',
      iconPath: Fe.infoOutline,
      iconLabel: 'information',
      borderColor: Be.info,
      iconColor: $e.info,
    },
    inProgressLow: {
      iconVariant: 'outline',
      iconPath: Fe.arrowPath,
      iconLabel: 'in progress',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    notStartedLow: {
      iconVariant: 'outline',
      iconPath: Fe.clock,
      iconLabel: 'not started',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    pausedLow: {
      iconVariant: 'outline',
      iconPath: Fe.pauseCircle,
      iconLabel: 'paused',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    successHigh: {
      iconVariant: 'filled',
      iconPath: Fe.successFilled,
      iconLabel: 'success',
      borderColor: Be.success,
      iconColor: $e.success,
    },
    successLow: {
      iconVariant: 'outline',
      iconPath: Fe.successOutline,
      iconLabel: 'success',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    successMedium: {
      iconVariant: 'outline',
      iconPath: Fe.successOutline,
      iconLabel: 'success',
      borderColor: Be.success,
      iconColor: $e.success,
    },
    unknownLow: {
      iconVariant: 'outline',
      iconPath: Fe.helpOutline,
      iconLabel: 'unknown',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    warningHigh: {
      iconVariant: 'filled',
      iconPath: Fe.warningFilled,
      iconLabel: 'warning',
      borderColor: Be.warning,
      iconColor: $e.warning,
    },
    warningLow: {
      iconVariant: 'outline',
      iconPath: Fe.alertCircleOutline,
      iconLabel: 'warning',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
    warningMedium: {
      iconVariant: 'outline',
      iconPath: Fe.warningOutline,
      iconLabel: 'warning',
      borderColor: Be.warning,
      iconColor: $e.warning,
    },
    neutral: {
      iconVariant: 'dot',
      iconPath: null,
      iconLabel: 'neutral',
      borderColor: Be.neutral,
      iconColor: $e.muted,
    },
  },
  Nl = {
    neutral: 'neutral',
    success: 'successMedium',
    error: 'errorMedium',
    info: 'infoMedium',
    warning: 'warningMedium',
  }
function Ep(e) {
  return e in Nl ? Nl[e] : e
}
const Pp = ['aria-label'],
  Tp = ['d'],
  Rp = ['aria-label'],
  Vp = ['d'],
  Np = ['aria-label'],
  Wp = { class: 'agds-status-badge__label' },
  Hp = x({
    __name: 'AGDSStatusBadge',
    props: {
      label: {},
      tone: { default: 'infoHigh' },
      appearance: {},
      weight: { default: 'regular' },
    },
    setup(e) {
      const t = e,
        o = y(() => Ep(t.tone)),
        a = y(() => qp[o.value]),
        l = y(() => t.appearance ?? t.weight ?? 'regular'),
        n = y(() => ({
          '--sb-border-color': a.value.borderColor,
          '--sb-icon-color': a.value.iconColor,
        }))
      return (i, s) => (
        c(),
        h(
          'span',
          { class: I(['agds-status-badge', `agds-status-badge--${l.value}`]), style: xe(n.value) },
          [
            a.value.iconVariant === 'filled'
              ? (c(),
                h(
                  'svg',
                  {
                    key: 0,
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24',
                    fill: 'currentColor',
                    focusable: 'false',
                    'aria-hidden': 'false',
                    'aria-label': `Status: ${a.value.iconLabel}.`,
                    class: 'agds-status-badge__icon',
                  },
                  [
                    p(
                      'path',
                      { 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', d: a.value.iconPath },
                      null,
                      8,
                      Tp,
                    ),
                  ],
                  8,
                  Pp,
                ))
              : a.value.iconVariant === 'outline'
                ? (c(),
                  h(
                    'svg',
                    {
                      key: 1,
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      'stroke-width': '1.5',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      focusable: 'false',
                      'aria-hidden': 'false',
                      'aria-label': `Status: ${a.value.iconLabel}.`,
                      class: 'agds-status-badge__icon',
                    },
                    [p('path', { d: a.value.iconPath }, null, 8, Vp)],
                    8,
                    Rp,
                  ))
                : (c(),
                  h(
                    'svg',
                    {
                      key: 2,
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      fill: 'currentColor',
                      focusable: 'false',
                      'aria-hidden': 'false',
                      'aria-label': `Status: ${a.value.iconLabel}.`,
                      class: 'agds-status-badge__icon',
                    },
                    [...(s[0] || (s[0] = [p('circle', { cx: '12', cy: '12', r: '4' }, null, -1)]))],
                    8,
                    Np,
                  )),
            p('span', Wp, M(e.label), 1),
          ],
          6,
        )
      )
    },
  }),
  n2 = F(Hp, [['__scopeId', 'data-v-e345cedd']]),
  jp = { class: 'agds-summary-list' },
  Gp = x({
    __name: 'AGDSSummaryList',
    setup(e) {
      return (t, o) => (c(), h('dl', jp, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  zp = F(Gp, [['__scopeId', 'data-v-392a1b7c']]),
  Up = { class: 'agds-summary-list-item' },
  Kp = x({
    __name: 'AGDSSummaryListItem',
    setup(e) {
      return (t, o) => (c(), h('div', Up, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  Zp = F(Kp, [['__scopeId', 'data-v-730a1419']]),
  Yp = { class: 'agds-summary-list-item__term' },
  Xp = x({
    __name: 'AGDSSummaryListItemTerm',
    setup(e) {
      return (t, o) => (c(), h('dt', Yp, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  Qp = F(Xp, [['__scopeId', 'data-v-ffc85814']]),
  Jp = { class: 'agds-summary-list-item__description' },
  eg = x({
    __name: 'AGDSSummaryListItemDescription',
    setup(e) {
      return (t, o) => (c(), h('dd', Jp, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  tg = F(eg, [['__scopeId', 'data-v-f432577d']]),
  ag = { class: 'agds-summary-list-item__action' },
  og = x({
    __name: 'AGDSSummaryListItemAction',
    setup(e) {
      return (t, o) => (c(), h('dd', ag, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  lg = F(og, [['__scopeId', 'data-v-4ddf851b']]),
  ng = ['id', 'role', 'aria-labelledby', 'tabindex'],
  ig = { class: 'agds-page-alert__strip', 'aria-hidden': 'true' },
  sg = {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    focusable: 'false',
    'aria-hidden': 'true',
    class: 'agds-page-alert__icon',
  },
  rg = ['d'],
  dg = { class: 'agds-page-alert__inner' },
  ug = ['id'],
  cg = ['id'],
  fg = { class: 'agds-page-alert__title' },
  pg = ['id'],
  gg = x({
    __name: 'AGDSPageAlert',
    props: {
      tone: {},
      title: {},
      id: {},
      role: { default: 'region' },
      tabIndex: {},
      focusOnMount: { type: Boolean },
      focusOnUpdate: {},
      onClose: {},
      onDismiss: {},
    },
    setup(e, { expose: t }) {
      const o = e
      t({ focus: () => f.value?.focus() })
      const a = ge()?.uid,
        l = y(() => o.id ?? `page-alert-${a}`),
        n = y(() => `${l.value}-tone`),
        i = y(() => `${l.value}-title`),
        s = y(() => `${l.value}-body`),
        r = Da(),
        d = y(() => !!o.title || !!r.title),
        u = y(() => {
          const S = [n.value]
          return (d.value && S.push(i.value), r.default && S.push(s.value), S.join(' '))
        }),
        f = C(null),
        g = y(() => {
          if (o.tabIndex !== void 0) return o.tabIndex
          if (o.focusOnMount || o.focusOnUpdate !== void 0) return -1
        })
      ;(we(() => {
        o.focusOnMount && f.value?.focus()
      }),
        pe(
          () => o.focusOnUpdate,
          () => {
            f.value?.focus()
          },
          { deep: !0 },
        ))
      const b = {
          info: {
            fg: 'var(--agds-color-info)',
            bg: 'var(--agds-color-info-muted)',
            iconLabel: 'Information',
            iconPath:
              'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
          },
          success: {
            fg: 'var(--agds-color-success)',
            bg: 'var(--agds-color-success-muted)',
            iconLabel: 'Success',
            iconPath:
              'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z',
          },
          warning: {
            fg: 'var(--agds-color-warning)',
            bg: 'var(--agds-color-warning-muted)',
            iconLabel: 'Warning',
            iconPath:
              'M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.501-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
          },
          error: {
            fg: 'var(--agds-color-error)',
            bg: 'var(--agds-color-error-muted)',
            iconLabel: 'Error',
            iconPath:
              'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z',
          },
        },
        m = y(() => b[o.tone]),
        _ = y(() => ({ '--pa-fg': m.value.fg, '--pa-bg': m.value.bg })),
        k = y(() => o.onClose ?? o.onDismiss ?? null)
      return (S, D) => (
        c(),
        h(
          'div',
          {
            ref_key: 'alertRef',
            ref: f,
            id: o.id,
            class: I(['agds-page-alert', `agds-page-alert--${o.tone}`]),
            style: xe(_.value),
            role: o.role,
            'aria-labelledby': u.value,
            tabindex: g.value,
          },
          [
            p('div', ig, [
              (c(),
              h('svg', sg, [
                p(
                  'path',
                  { 'fill-rule': 'evenodd', 'clip-rule': 'evenodd', d: m.value.iconPath },
                  null,
                  8,
                  rg,
                ),
              ])),
            ]),
            p(
              'div',
              {
                class: I([
                  'agds-page-alert__body',
                  { 'agds-page-alert__body--with-close': !!k.value },
                ]),
              },
              [
                p('div', dg, [
                  p(
                    'span',
                    { id: n.value, class: 'agds-page-alert__sr-tone' },
                    M(m.value.iconLabel) + '. ',
                    9,
                    ug,
                  ),
                  d.value
                    ? (c(),
                      h(
                        'div',
                        { key: 0, id: i.value, class: 'agds-page-alert__title-wrap' },
                        [A(S.$slots, 'title', {}, () => [p('h2', fg, M(o.title), 1)], !0)],
                        8,
                        cg,
                      ))
                    : O('', !0),
                  S.$slots.default
                    ? (c(),
                      h(
                        'div',
                        { key: 1, id: s.value, class: 'agds-page-alert__content' },
                        [A(S.$slots, 'default', {}, void 0, !0)],
                        8,
                        pg,
                      ))
                    : O('', !0),
                ]),
                k.value
                  ? (c(),
                    h(
                      'button',
                      {
                        key: 0,
                        type: 'button',
                        'aria-label': 'Close',
                        class: 'agds-page-alert__close',
                        onClick: D[0] || (D[0] = (B) => k.value()),
                      },
                      [
                        ...(D[1] ||
                          (D[1] = [
                            p('span', { class: 'agds-page-alert__close-label' }, 'Close', -1),
                            p(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                fill: 'none',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                                focusable: 'false',
                                'aria-hidden': 'true',
                                class: 'agds-page-alert__close-icon',
                              },
                              [p('path', { d: 'M18 6 6 18M6 6l12 12' })],
                              -1,
                            ),
                          ])),
                      ],
                    ))
                  : O('', !0),
              ],
              2,
            ),
          ],
          14,
          ng,
        )
      )
    },
  }),
  vg = F(gg, [['__scopeId', 'data-v-6fcb44ed']]),
  Yo = Symbol('AgDSCard'),
  mg = x({
    __name: 'AGDSCard',
    props: {
      as: { default: 'div' },
      background: { default: 'body' },
      clickable: { type: Boolean, default: !1 },
      footerOutside: { type: Boolean, default: !1 },
      shadow: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = e,
        o = Da(),
        a = y(() => !!o.footer)
      qe(
        Yo,
        Tt({
          get background() {
            return t.background
          },
          get clickable() {
            return t.clickable
          },
          get hasFooter() {
            return a.value
          },
          get footerOutside() {
            return t.footerOutside
          },
          get shadow() {
            return t.shadow
          },
        }),
      )
      const l = y(() => [
        `agds-card--${t.background}`,
        t.shadow && 'agds-card--shadow',
        t.clickable && 'agds-card--clickable',
      ])
      return (n, i) =>
        t.footerOutside
          ? (c(),
            $(
              ke(t.as),
              { key: 0, class: 'agds-card agds-card--footer-outside' },
              {
                default: w(() => [
                  p(
                    'div',
                    { class: I(['agds-card__wrap', l.value]) },
                    [A(n.$slots, 'header', {}, void 0, !0), A(n.$slots, 'default', {}, void 0, !0)],
                    2,
                  ),
                  A(n.$slots, 'footer', {}, void 0, !0),
                ]),
                _: 3,
              },
            ))
          : (c(),
            $(
              ke(t.as),
              { key: 1, class: I(['agds-card', l.value]) },
              {
                default: w(() => [
                  A(n.$slots, 'header', {}, void 0, !0),
                  A(n.$slots, 'default', {}, void 0, !0),
                  A(n.$slots, 'footer', {}, void 0, !0),
                ]),
                _: 3,
              },
              8,
              ['class'],
            ))
    },
  }),
  hg = F(mg, [['__scopeId', 'data-v-5d0bfba8']]),
  bg = x({
    __name: 'AGDSCardHeader',
    props: { background: {} },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        h(
          'div',
          { class: I(['agds-card-header', t.background && `agds-card-header--${t.background}`]) },
          [A(o.$slots, 'default', {}, void 0, !0)],
          2,
        )
      )
    },
  }),
  yg = F(bg, [['__scopeId', 'data-v-7dc7b6b5']]),
  _g = x({
    __name: 'AGDSCardFooter',
    props: { background: {} },
    setup(e) {
      const t = e,
        o = Pe(Yo)
      return (a, l) =>
        v(o)?.footerOutside
          ? (c(),
            h(
              'div',
              {
                key: 0,
                class: I([
                  'agds-card-footer agds-card-footer--outside',
                  t.background && `agds-card-footer--${t.background}`,
                ]),
              },
              [A(a.$slots, 'default', {}, void 0, !0)],
              2,
            ))
          : (c(),
            h(
              'div',
              {
                key: 1,
                class: I(['agds-card-footer', t.background && `agds-card-footer--${t.background}`]),
              },
              [A(a.$slots, 'default', {}, void 0, !0)],
              2,
            ))
    },
  }),
  kg = F(_g, [['__scopeId', 'data-v-33287fe1']]),
  wg = { class: 'agds-card-inner' },
  xg = x({
    __name: 'AGDSCardInner',
    setup(e) {
      return (t, o) => (c(), h('div', wg, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  Sg = F(xg, [['__scopeId', 'data-v-8cfc470e']]),
  Ag = x({
    inheritAttrs: !1,
    __name: 'AGDSCardLink',
    props: { as: { default: 'a' } },
    setup(e) {
      const t = e,
        o = Pe(Yo),
        a = y(() => !!o?.clickable)
      return (l, n) => (
        c(),
        $(
          ke(t.as),
          te(l.$attrs, { class: ['agds-card-link', a.value && 'agds-card-link--clickable'] }),
          { default: w(() => [A(l.$slots, 'default', {}, void 0, !0)]), _: 3 },
          16,
          ['class'],
        )
      )
    },
  }),
  Cg = F(Ag, [['__scopeId', 'data-v-57095540']]),
  Dg = { class: 'agds-details' },
  Bg = { class: 'agds-details__summary' },
  $g = { key: 0, role: 'img', 'aria-label': 'Information.', class: 'agds-details__icon-before' },
  Ig = { class: 'agds-details__label' },
  Mg = x({
    __name: 'AGDSDetails',
    props: {
      label: {},
      iconBefore: { type: Boolean, default: !1 },
      onBodyAlt: { type: Boolean, default: !1 },
    },
    setup(e) {
      return (t, o) => (
        c(),
        h('details', Dg, [
          p('summary', Bg, [
            e.iconBefore
              ? (c(),
                h('span', $g, [
                  ...(o[0] ||
                    (o[0] = [
                      p(
                        'svg',
                        {
                          xmlns: 'http://www.w3.org/2000/svg',
                          viewBox: '0 0 24 24',
                          fill: 'currentColor',
                          'aria-hidden': 'true',
                          focusable: 'false',
                          class: 'agds-details__icon-svg',
                        },
                        [
                          p('path', {
                            'fill-rule': 'evenodd',
                            d: 'M2.25 12c0-5.385 4.365-9.75 9.75-9.75S21.75 6.615 21.75 12 17.385 21.75 12 21.75 2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5A.75.75 0 0 0 12 9Z',
                            'clip-rule': 'evenodd',
                          }),
                        ],
                        -1,
                      ),
                    ])),
                ]))
              : O('', !0),
            p('span', Ig, M(e.label), 1),
            o[1] ||
              (o[1] = p(
                'svg',
                {
                  xmlns: 'http://www.w3.org/2000/svg',
                  viewBox: '0 0 24 24',
                  fill: 'none',
                  stroke: 'currentColor',
                  'stroke-width': '2.5',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'aria-hidden': 'true',
                  focusable: 'false',
                  class: 'agds-details__chevron',
                },
                [p('path', { d: 'M6 9l6 6 6-6' })],
                -1,
              )),
          ]),
          p(
            'div',
            {
              class: I([
                'agds-details__content',
                { 'agds-details__content--body-alt': e.onBodyAlt },
              ]),
            },
            [A(t.$slots, 'default', {}, void 0, !0)],
            2,
          ),
        ])
      )
    },
  }),
  Og = F(Mg, [['__scopeId', 'data-v-95913503']]),
  Lg = { class: 'agds-tag' },
  Fg = ['aria-label'],
  qg = x({
    __name: 'AGDSTag',
    props: { label: {}, href: {}, removable: { type: Boolean, default: !1 } },
    emits: ['remove'],
    setup(e, { expose: t, emit: o }) {
      const a = o,
        l = C(null)
      return (
        t({ focusRemoveButton: () => l.value?.focus() }),
        (n, i) => (
          c(),
          h('span', Lg, [
            (c(),
            $(
              ke(e.href ? 'a' : 'span'),
              te(e.href ? { href: e.href } : {}, {
                class: ['agds-tag__label', { 'agds-tag__label--link': !!e.href }],
              }),
              { default: w(() => [de(M(e.label), 1)]), _: 1 },
              16,
              ['class'],
            )),
            e.removable
              ? (c(),
                h(
                  'button',
                  {
                    key: 0,
                    ref_key: 'removeButtonRef',
                    ref: l,
                    type: 'button',
                    'aria-label': `Remove ${e.label}`,
                    class: 'agds-tag__remove',
                    onClick: i[0] || (i[0] = (s) => a('remove', s)),
                  },
                  [E(De, { name: 'mdi:close', size: 'sm', 'aria-hidden': 'true' })],
                  8,
                  Fg,
                ))
              : O('', !0),
          ])
        )
      )
    },
  }),
  Zn = F(qg, [['__scopeId', 'data-v-f65b9c8d']]),
  Eg = { class: 'agds-tags' },
  Pg = x({
    __name: 'AGDSTags',
    props: { items: {} },
    emits: ['remove'],
    setup(e, { emit: t }) {
      const o = t,
        a = C(null)
      function l(n, i) {
        const s = a.value?.querySelectorAll('.agds-tag__remove')
        if (s?.length) {
          const r = Math.max(0, n - 1)
          s[r]?.focus()
        }
        o('remove', n, i)
      }
      return (n, i) => (
        c(),
        h('div', Eg, [
          A(n.$slots, 'heading', {}, void 0, !0),
          p(
            'ul',
            { ref_key: 'listRef', ref: a, class: 'agds-tags__list' },
            [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  e.items,
                  (s, r) => (
                    c(),
                    h('li', { key: r, class: 'agds-tags__item' }, [
                      E(
                        Zn,
                        {
                          label: s.label,
                          href: s.href,
                          removable: s.removable,
                          onRemove: (d) => l(r, d),
                        },
                        null,
                        8,
                        ['label', 'href', 'removable', 'onRemove'],
                      ),
                    ])
                  ),
                ),
                128,
              )),
            ],
            512,
          ),
        ])
      )
    },
  }),
  Tg = F(Pg, [['__scopeId', 'data-v-453cd2d1']]),
  Rg = x({
    __name: 'AGDSFooter',
    props: { background: { default: 'body' }, maxWidth: { default: 'container' } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'footer',
          { class: I(['agds-footer', [`agds-footer--${e.background}`]]) },
          [
            p(
              'div',
              { class: I(['agds-footer__inner', [`agds-footer__inner--${e.maxWidth}`]]) },
              [A(t.$slots, 'default', {}, void 0, !0)],
              2,
            ),
          ],
          2,
        )
      )
    },
  }),
  Vg = F(Rg, [['__scopeId', 'data-v-b905b6be']]),
  Ng = x({
    __name: 'AGDSFooterDivider',
    props: { color: { default: 'accent' } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'hr',
          {
            'aria-hidden': 'true',
            class: I(['agds-footer-divider', [`agds-footer-divider--${e.color}`]]),
          },
          null,
          2,
        )
      )
    },
  }),
  Wg = F(Ng, [['__scopeId', 'data-v-7b17447a']]),
  Hg = { key: 0, class: 'agds-header-brand agds-header-brand--dual' },
  jg = ['href'],
  Gg = {
    key: 0,
    class: 'agds-header-brand__divider agds-header-brand__divider--between',
    'aria-hidden': 'true',
  },
  zg = { class: 'agds-header-brand__heading-row' },
  Ug = {
    key: 0,
    class: 'agds-header-brand__divider agds-header-brand__divider--after',
    'aria-hidden': 'true',
  },
  Kg = ['href'],
  Zg = { class: 'agds-header-brand__title-wrap' },
  Yg = { key: 0, class: 'agds-header-brand__badge' },
  Xg = ['href'],
  Qg = {
    key: 1,
    class: 'agds-header-brand__divider agds-header-brand__divider--single',
    'aria-hidden': 'true',
  },
  Jg = { class: 'agds-header-brand__text' },
  ev = { class: 'agds-header-brand__title-wrap' },
  tv = { key: 0, class: 'agds-header-brand__badge' },
  av = x({
    __name: 'AGDSHeaderBrand',
    props: {
      badgeLabel: {},
      dividerPosition: { default: 'after' },
      hasRightContent: { type: Boolean, default: !1 },
      heading: {},
      href: { default: '/' },
      secondHref: {},
      size: { default: 'md' },
      subline: {},
    },
    setup(e) {
      return (t, o) =>
        t.$slots.logo && t.$slots.secondLogo
          ? (c(),
            h('div', Hg, [
              p(
                'div',
                {
                  class: I([
                    'agds-header-brand__logos',
                    {
                      'agds-header-brand__logos--gap-right':
                        e.hasRightContent && e.dividerPosition === 'after',
                    },
                  ]),
                },
                [
                  p(
                    'a',
                    {
                      href: e.href,
                      class: I([
                        'agds-header-brand__logo-link',
                        [`agds-header-brand__logo-link--${e.size}`],
                      ]),
                    },
                    [A(t.$slots, 'logo', {}, void 0, !0)],
                    10,
                    jg,
                  ),
                  e.dividerPosition === 'between' ? (c(), h('div', Gg)) : O('', !0),
                  (c(),
                  $(
                    ke(e.secondHref ? 'a' : 'span'),
                    te(e.secondHref ? { href: e.secondHref } : {}, {
                      class: [
                        'agds-header-brand__logo-link agds-header-brand__logo-link--second',
                        [`agds-header-brand__logo-link--${e.size}`],
                      ],
                    }),
                    { default: w(() => [A(t.$slots, 'secondLogo', {}, void 0, !0)]), _: 3 },
                    16,
                    ['class'],
                  )),
                ],
                2,
              ),
              p('div', zg, [
                e.dividerPosition === 'after' ? (c(), h('div', Ug)) : O('', !0),
                p(
                  'a',
                  { href: e.href, class: 'agds-header-brand__heading-link' },
                  [
                    p('div', Zg, [
                      p(
                        'span',
                        {
                          class: I([
                            'agds-header-brand__heading',
                            [`agds-header-brand__heading--${e.size}`],
                          ]),
                        },
                        M(e.heading),
                        3,
                      ),
                      e.badgeLabel ? (c(), h('span', Yg, M(e.badgeLabel), 1)) : O('', !0),
                    ]),
                    e.subline
                      ? (c(),
                        h(
                          'span',
                          {
                            key: 0,
                            class: I([
                              'agds-header-brand__subline',
                              [`agds-header-brand__subline--${e.size}`],
                            ]),
                          },
                          M(e.subline),
                          3,
                        ))
                      : O('', !0),
                  ],
                  8,
                  Kg,
                ),
              ]),
            ]))
          : (c(),
            h(
              'a',
              { key: 1, href: e.href, class: 'agds-header-brand agds-header-brand--single' },
              [
                t.$slots.logo
                  ? (c(),
                    h(
                      'div',
                      {
                        key: 0,
                        class: I([
                          'agds-header-brand__logo-wrap',
                          [`agds-header-brand__logo-wrap--${e.size}`],
                        ]),
                        'aria-hidden': 'true',
                      },
                      [A(t.$slots, 'logo', {}, void 0, !0)],
                      2,
                    ))
                  : O('', !0),
                t.$slots.logo ? (c(), h('div', Qg)) : O('', !0),
                p('div', Jg, [
                  p('div', ev, [
                    p(
                      'span',
                      {
                        class: I([
                          'agds-header-brand__heading',
                          [`agds-header-brand__heading--${e.size}`],
                        ]),
                      },
                      M(e.heading),
                      3,
                    ),
                    e.badgeLabel ? (c(), h('span', tv, M(e.badgeLabel), 1)) : O('', !0),
                  ]),
                  e.subline
                    ? (c(),
                      h(
                        'span',
                        {
                          key: 0,
                          class: I([
                            'agds-header-brand__subline',
                            [`agds-header-brand__subline--${e.size}`],
                          ]),
                        },
                        M(e.subline),
                        3,
                      ))
                    : O('', !0),
                ]),
              ],
              8,
              Xg,
            ))
    },
  }),
  Yn = F(av, [['__scopeId', 'data-v-085d4a93']]),
  ov = { key: 0, class: 'agds-header__right-col' },
  lv = x({
    __name: 'AGDSHeader',
    props: {
      background: { default: 'body' },
      badgeLabel: {},
      dividerPosition: { default: 'after' },
      heading: {},
      href: { default: '/' },
      maxWidth: { default: 'container' },
      secondHref: {},
      size: { default: 'md' },
      subline: {},
    },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'header',
          { class: I(['agds-header', [`agds-header--${e.background}`, `agds-header--${e.size}`]]) },
          [
            p(
              'div',
              { class: I(['agds-header__inner', [`agds-header__inner--${e.maxWidth}`]]) },
              [
                p(
                  'div',
                  {
                    class: I([
                      'agds-header__brand-col',
                      { 'agds-header__brand-col--with-right': !!t.$slots.rightContent },
                    ]),
                  },
                  [
                    E(
                      Yn,
                      {
                        'badge-label': e.badgeLabel,
                        'divider-position': e.dividerPosition,
                        'has-right-content': !!t.$slots.rightContent,
                        heading: e.heading,
                        href: e.href,
                        'second-href': e.secondHref,
                        size: e.size,
                        subline: e.subline,
                      },
                      aa({ _: 2 }, [
                        t.$slots.logo
                          ? {
                              name: 'logo',
                              fn: w(() => [A(t.$slots, 'logo', {}, void 0, !0)]),
                              key: '0',
                            }
                          : void 0,
                        t.$slots.secondLogo
                          ? {
                              name: 'secondLogo',
                              fn: w(() => [A(t.$slots, 'secondLogo', {}, void 0, !0)]),
                              key: '1',
                            }
                          : void 0,
                      ]),
                      1032,
                      [
                        'badge-label',
                        'divider-position',
                        'has-right-content',
                        'heading',
                        'href',
                        'second-href',
                        'size',
                        'subline',
                      ],
                    ),
                  ],
                  2,
                ),
                t.$slots.rightContent
                  ? (c(), h('div', ov, [A(t.$slots, 'rightContent', {}, void 0, !0)]))
                  : O('', !0),
              ],
              2,
            ),
          ],
          2,
        )
      )
    },
  }),
  nv = F(lv, [['__scopeId', 'data-v-f1d1bde8']]),
  Xn = Symbol('DropdownMenu')
function Kt() {
  const e = Pe(Xn)
  if (!e) throw new Error('useDropdownMenuContext must be called within AgDSDropdownMenu')
  return e
}
const iv = { class: 'agds-dropdown-menu' },
  sv = x({
    __name: 'AGDSDropdownMenu',
    props: {
      popoverPlacement: { default: 'bottom-start' },
      popoverMaxHeight: {},
      popoverOffset: { default: 8 },
    },
    setup(e) {
      const t = e,
        o = `agds-dropdown-menu-${ge()?.uid ?? 0}`,
        a = `${o}-button`,
        l = `${o}-panel`,
        n = C(!1),
        i = C(-1),
        s = C(void 0),
        r = C(0),
        d = C(''),
        u = C(0),
        f = C(void 0),
        g = y(() => n.value),
        b = y(() => s.value?.[i.value]?.id),
        m = C(null),
        _ = C(null)
      function k() {
        n.value = !0
      }
      function S() {
        ;((n.value = !1),
          (i.value = -1),
          (s.value = void 0),
          (r.value = 0),
          (d.value = ''),
          (u.value = 0),
          (f.value = void 0),
          he(() => _.value?.focus()))
      }
      function D() {
        n.value ? S() : k()
      }
      function B(H) {
        ;((f.value = H), k())
      }
      function L() {
        return f.value
      }
      function R() {
        f.value = void 0
      }
      function N(H) {
        ;((s.value = H), (r.value = H?.length ?? 0), (d.value = ''), (u.value = 0))
      }
      function W() {
        ;((i.value = 0), (d.value = ''), (u.value = 0))
      }
      function q() {
        ;((i.value = r.value - 1), (d.value = ''), (u.value = 0))
      }
      function P() {
        const H = i.value,
          G = r.value
        ;((i.value = H < G - 1 ? H + 1 : 0), (d.value = ''), (u.value = 0))
      }
      function j() {
        const H = i.value,
          G = r.value
        ;((i.value = H > 0 ? H - 1 : G - 1), (d.value = ''), (u.value = 0))
      }
      function oe() {
        i.value !== -1 && (s.value?.[i.value]?.click(), S())
      }
      function U(H) {
        const G = Date.now(),
          ne = G - u.value < 350,
          le = ne ? d.value + H.toLowerCase() : H.toLowerCase(),
          ce = i.value >= 0 ? i.value : -1,
          ie = ne ? 0 : 1,
          be = Array.from(s.value ?? []).map((Se) =>
            (Se.textContent ?? '')
              .toLowerCase()
              .replace(/(\r\n|\n|\r)/gm, '')
              .trim(),
          ),
          ye = be
            .slice(ce + ie)
            .concat(be.slice(0, ce + ie))
            .find((Se) => Se.startsWith(le)),
          Ae = ye ? be.indexOf(ye) : ce
        ;((d.value = le), (i.value = Ae), (u.value = G))
      }
      return (
        qe(Xn, {
          isMenuOpen: g,
          menuId: o,
          buttonId: a,
          panelId: l,
          activeDescendantId: b,
          openMenu: k,
          closeMenu: S,
          toggleMenu: D,
          openMenuWithKey: B,
          getPendingOpenKey: L,
          clearPendingOpenKey: R,
          goToFirstMenuItem: W,
          goToLastMenuItem: q,
          goToNextMenuItem: P,
          goToPreviousMenuItem: j,
          clickSelectedItem: oe,
          updateDescendantSearchTerm: U,
          setDescendantNodes: N,
          panelRef: m,
          triggerRef: _,
          popoverPlacement: t.popoverPlacement,
          popoverMaxHeight: t.popoverMaxHeight,
          popoverOffset: t.popoverOffset,
        }),
        (H, G) => (c(), h('div', iv, [A(H.$slots, 'default', { isMenuOpen: g.value }, void 0, !0)]))
      )
    },
  }),
  Qn = F(sv, [['__scopeId', 'data-v-b81045cb']]),
  rv = ['id', 'disabled', 'aria-controls', 'aria-expanded'],
  dv = { class: 'agds-button__label agds-dropdown-menu-btn__label' },
  uv = x({
    __name: 'AGDSDropdownMenuButton',
    props: {
      variant: { default: 'text' },
      size: { default: 'md' },
      block: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
    },
    setup(e) {
      const {
          isMenuOpen: t,
          buttonId: o,
          panelId: a,
          toggleMenu: l,
          openMenuWithKey: n,
          triggerRef: i,
        } = Kt(),
        s = C(null)
      we(() => {
        i.value = s.value
      })
      function r() {
        ;(s.value?.focus(), l())
      }
      function d(u) {
        ;['ArrowDown', 'ArrowUp', 'Space', 'Enter'].includes(u.code) &&
          (u.preventDefault(), n(u.code))
      }
      return (u, f) => (
        c(),
        h(
          'button',
          {
            ref_key: 'buttonEl',
            ref: s,
            id: v(o),
            type: 'button',
            disabled: e.disabled,
            'aria-haspopup': !0,
            'aria-controls': v(a),
            'aria-expanded': v(t),
            class: I([
              'agds-button',
              `agds-button--${e.variant}`,
              `agds-button--${e.size}`,
              { 'agds-button--block': e.block },
              'agds-dropdown-menu-btn',
            ]),
            onClick: r,
            onKeydown: d,
          },
          [
            p('span', dv, [A(u.$slots, 'default', {}, void 0, !0)]),
            p(
              'span',
              {
                'aria-hidden': 'true',
                class: I([
                  'agds-dropdown-menu-btn__chevron',
                  { 'agds-dropdown-menu-btn__chevron--open': v(t) },
                ]),
              },
              [
                ...(f[0] ||
                  (f[0] = [
                    p(
                      'svg',
                      {
                        width: '16',
                        height: '16',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2',
                        'stroke-linecap': 'round',
                        'stroke-linejoin': 'round',
                        'aria-hidden': 'true',
                      },
                      [p('polyline', { points: '6 9 12 15 18 9' })],
                      -1,
                    ),
                  ])),
              ],
              2,
            ),
          ],
          42,
          rv,
        )
      )
    },
  }),
  Jn = F(uv, [['__scopeId', 'data-v-fabe2256']]),
  cv = ['id'],
  fv = ['id', 'aria-labelledby', 'aria-activedescendant'],
  pv = x({
    __name: 'AGDSDropdownMenuPanel',
    setup(e) {
      const {
          isMenuOpen: t,
          panelId: o,
          buttonId: a,
          activeDescendantId: l,
          popoverPlacement: n,
          popoverMaxHeight: i,
          popoverOffset: s,
          panelRef: r,
          triggerRef: d,
          setDescendantNodes: u,
          closeMenu: f,
          goToPreviousMenuItem: g,
          goToNextMenuItem: b,
          goToFirstMenuItem: m,
          goToLastMenuItem: _,
          clickSelectedItem: k,
          updateDescendantSearchTerm: S,
          getPendingOpenKey: D,
          clearPendingOpenKey: B,
        } = Kt(),
        L = C(null)
      ;(pe(L, (q) => {
        r.value = q
      }),
        pe(t, async (q) => {
          if (!q) return
          await he()
          const P = L.value?.querySelectorAll('[role="menuitem"], [role="menuitemradio"]')
          ;(u(P), L.value?.focus({ preventScroll: !0 }))
          const j = D()
          ;(B(), j === 'ArrowUp' ? _() : j && m())
        }))
      function R(q) {
        if (!t.value) return
        const P = q.target
        L.value?.contains(P) || d.value?.contains(P) || f()
      }
      ;(we(() => document.addEventListener('click', R, !0)),
        Te(() => document.removeEventListener('click', R, !0)))
      function N(q) {
        switch (q.code) {
          case 'ArrowUp':
            ;(q.preventDefault(), g())
            break
          case 'ArrowDown':
            ;(q.preventDefault(), b())
            break
          case 'Home':
            ;(q.preventDefault(), m())
            break
          case 'End':
            ;(q.preventDefault(), _())
            break
          case 'Escape':
            ;(q.preventDefault(), f())
            break
          case 'Enter':
          case 'Space':
            ;(q.preventDefault(), k())
            break
          case 'Tab':
            f()
            break
          default:
            ;/^[a-zA-Z]$/.test(q.key) && !q.metaKey && !q.ctrlKey && (q.preventDefault(), S(q.key))
        }
      }
      const W = y(() => ({ top: `calc(100% + ${s}px)`, maxHeight: i ? `${i}px` : void 0 }))
      return (q, P) =>
        v(t)
          ? (c(),
            h(
              'div',
              {
                key: 1,
                ref_key: 'panelEl',
                ref: L,
                id: v(o),
                role: 'menu',
                tabindex: '-1',
                'aria-labelledby': v(a),
                'aria-activedescendant': v(l) ?? void 0,
                class: I(['agds-dropdown-menu__panel', `agds-dropdown-menu__panel--${v(n)}`]),
                style: xe(W.value),
                onKeydown: N,
              },
              [A(q.$slots, 'default', {}, void 0, !0)],
              46,
              fv,
            ))
          : (c(),
            h('div', { key: 0, id: v(o), class: 'agds-dropdown-menu__placeholder' }, null, 8, cv))
    },
  }),
  ei = F(pv, [['__scopeId', 'data-v-2ee68137']]),
  gv = ['id'],
  vv = { class: 'agds-dm-item__content' },
  mv = { class: 'agds-dm-item__label' },
  hv = { key: 0, class: 'agds-dm-item__end' },
  bv = x({
    __name: 'AGDSDropdownMenuItem',
    props: { id: {}, icon: {} },
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { menuId: l, activeDescendantId: n, closeMenu: i } = Kt(),
        s = ge()?.uid ?? 0,
        r = y(() => o.id ?? `${l}-item-${s}`),
        d = y(() => r.value === n.value),
        u = C(null)
      pe(d, (g) => {
        g &&
          typeof u.value?.scrollIntoView == 'function' &&
          u.value.scrollIntoView({ block: 'nearest' })
      })
      function f(g) {
        ;(a('click', g), i())
      }
      return (g, b) => (
        c(),
        h(
          'div',
          {
            ref_key: 'itemEl',
            ref: u,
            id: r.value,
            role: 'menuitem',
            tabindex: '-1',
            class: I(['agds-dm-item', { 'agds-dm-item--active': d.value }]),
            onClick: f,
          },
          [
            p('div', vv, [
              e.icon
                ? (c(),
                  $(ke(e.icon), { key: 0, class: 'agds-dm-item__icon', 'aria-hidden': 'true' }))
                : O('', !0),
              p('span', mv, [A(g.$slots, 'default', {}, void 0, !0)]),
            ]),
            g.$slots.endElement
              ? (c(), h('div', hv, [A(g.$slots, 'endElement', {}, void 0, !0)]))
              : O('', !0),
          ],
          10,
          gv,
        )
      )
    },
  }),
  yv = F(bv, [['__scopeId', 'data-v-ed060a8e']]),
  _v = ['id', 'href', 'target', 'rel'],
  kv = { class: 'agds-dm-item__content' },
  wv = { class: 'agds-dm-item__label' },
  xv = { key: 0, class: 'sr-only' },
  Sv = { key: 0, class: 'agds-dm-item__end' },
  Av = x({
    __name: 'AGDSDropdownMenuItemLink',
    props: { href: {}, id: {}, icon: {}, target: {} },
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { menuId: l, activeDescendantId: n, closeMenu: i } = Kt(),
        s = ge()?.uid ?? 0,
        r = y(() => o.id ?? `${l}-item-${s}`),
        d = y(() => r.value === n.value),
        u = y(() => o.target === '_blank'),
        f = C(null)
      pe(d, (b) => {
        b &&
          typeof f.value?.scrollIntoView == 'function' &&
          f.value.scrollIntoView({ block: 'nearest' })
      })
      function g(b) {
        ;(a('click', b), i())
      }
      return (b, m) => (
        c(),
        h(
          'a',
          {
            ref_key: 'itemEl',
            ref: f,
            id: r.value,
            href: e.href,
            target: e.target,
            rel: u.value ? 'noopener noreferrer' : void 0,
            role: 'menuitem',
            tabindex: '-1',
            class: I(['agds-dm-item', { 'agds-dm-item--active': d.value }]),
            onClick: g,
          },
          [
            p('div', kv, [
              e.icon
                ? (c(),
                  $(ke(e.icon), { key: 0, class: 'agds-dm-item__icon', 'aria-hidden': 'true' }))
                : O('', !0),
              p('span', wv, [
                A(b.$slots, 'default', {}, void 0, !0),
                u.value ? (c(), h('span', xv, ', opens in a new tab')) : O('', !0),
              ]),
            ]),
            b.$slots.endElement
              ? (c(), h('div', Sv, [A(b.$slots, 'endElement', {}, void 0, !0)]))
              : O('', !0),
          ],
          10,
          _v,
        )
      )
    },
  }),
  ti = F(Av, [['__scopeId', 'data-v-dae541f6']]),
  Cv = ['id', 'aria-checked'],
  Dv = { class: 'agds-dm-radio__stack' },
  Bv = { key: 0, class: 'agds-dm-radio__secondary' },
  $v = { key: 0, class: 'agds-dm-radio__end' },
  Iv = x({
    __name: 'AGDSDropdownMenuItemRadio',
    props: { checked: { type: Boolean }, id: {}, secondaryText: {} },
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        { menuId: l, activeDescendantId: n, closeMenu: i } = Kt(),
        s = ge()?.uid ?? 0,
        r = y(() => o.id ?? `${l}-item-${s}`),
        d = y(() => r.value === n.value),
        u = C(null)
      pe(d, (g) => {
        g &&
          typeof u.value?.scrollIntoView == 'function' &&
          u.value.scrollIntoView({ block: 'nearest' })
      })
      function f() {
        ;(a('click'), i())
      }
      return (g, b) => (
        c(),
        h(
          'div',
          {
            ref_key: 'itemEl',
            ref: u,
            id: r.value,
            role: 'menuitemradio',
            tabindex: '-1',
            'aria-checked': e.checked,
            class: I([
              'agds-dm-radio',
              { 'agds-dm-radio--active': d.value, 'agds-dm-radio--checked': e.checked },
            ]),
            onClick: f,
          },
          [
            p('div', Dv, [
              p(
                'span',
                {
                  class: I([
                    'agds-dm-radio__label',
                    { 'agds-dm-radio__label--checked': e.checked },
                  ]),
                },
                [A(g.$slots, 'default', {}, void 0, !0)],
                2,
              ),
              e.secondaryText ? (c(), h('span', Bv, M(e.secondaryText), 1)) : O('', !0),
            ]),
            g.$slots.endElement
              ? (c(), h('div', $v, [A(g.$slots, 'endElement', {}, void 0, !0)]))
              : O('', !0),
          ],
          10,
          Cv,
        )
      )
    },
  }),
  Mv = F(Iv, [['__scopeId', 'data-v-fa3319d4']]),
  Ov = x({
    __name: 'AGDSDropdownMenuGroup',
    props: { label: {} },
    setup(e) {
      const { menuId: t } = Kt(),
        o = ge()?.uid ?? 0,
        a = `${t}-group-${o}`
      return (l, n) => (
        c(),
        h('div', { role: 'group', 'aria-labelledby': a, class: 'agds-dm-group' }, [
          p('span', { id: a, class: 'agds-dm-group__label' }, M(e.label), 1),
          A(l.$slots, 'default', {}, void 0, !0),
        ])
      )
    },
  }),
  Lv = F(Ov, [['__scopeId', 'data-v-dad22ed0']]),
  Fv = ['aria-hidden'],
  qv = { class: 'agds-divider__text' },
  Ev = ['aria-hidden'],
  Pv = x({
    __name: 'AGDSDivider',
    props: { ariaHidden: { type: Boolean, default: !0 }, textAlign: { default: 'center' } },
    setup(e) {
      const t = e,
        o = Da(),
        a = y(() => !!o.default)
      return (l, n) =>
        a.value
          ? (c(),
            h(
              'div',
              {
                key: 0,
                class: I([
                  'agds-divider agds-divider--with-text',
                  `agds-divider--align-${t.textAlign}`,
                ]),
                role: 'separator',
                'aria-hidden': t.ariaHidden ? 'true' : void 0,
              },
              [
                n[0] ||
                  (n[0] = p(
                    'hr',
                    { class: 'agds-divider__line', 'aria-hidden': 'true' },
                    null,
                    -1,
                  )),
                p('div', qv, [A(l.$slots, 'default', {}, void 0, !0)]),
                n[1] ||
                  (n[1] = p(
                    'hr',
                    { class: 'agds-divider__line', 'aria-hidden': 'true' },
                    null,
                    -1,
                  )),
              ],
              10,
              Fv,
            ))
          : (c(),
            h(
              'hr',
              { key: 1, class: 'agds-divider', 'aria-hidden': t.ariaHidden ? 'true' : void 0 },
              null,
              8,
              Ev,
            ))
    },
  }),
  ai = F(Pv, [['__scopeId', 'data-v-f2f47ea9']]),
  Tv = { class: 'agds-dm-divider', role: 'separator', 'aria-hidden': 'true' },
  Rv = x({
    __name: 'AGDSDropdownMenuDivider',
    setup(e) {
      return (t, o) => (c(), h('div', Tv, [E(ai)]))
    },
  }),
  Vv = F(Rv, [['__scopeId', 'data-v-bf52894b']]),
  Nv = x({
    __name: 'AGDSHeading',
    props: { type: { default: 'h2' }, as: {} },
    setup(e) {
      const t = e,
        o = {
          h1: 'var(--agds-font-size-4xl)',
          h2: 'var(--agds-font-size-3xl)',
          h3: 'var(--agds-font-size-2xl)',
          h4: 'var(--agds-font-size-xl)',
          h5: 'var(--agds-font-size-lg)',
          h6: 'var(--agds-font-size-md)',
        },
        a = t.as ?? t.type,
        l = o[t.type]
      return (n, i) => (
        c(),
        $(
          ke(v(a)),
          { class: I(['agds-heading', `agds-heading--${t.type}`]), style: xe({ fontSize: v(l) }) },
          { default: w(() => [A(n.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['class', 'style'],
        )
      )
    },
  }),
  kt = F(Nv, [['__scopeId', 'data-v-c5f1faef']]),
  Wv = x({
    __name: 'AGDSH1',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h1' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Hv = x({
    __name: 'AGDSH2',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h2' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  jv = x({
    __name: 'AGDSH3',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h3' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Gv = x({
    __name: 'AGDSH4',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h4' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  zv = x({
    __name: 'AGDSH5',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h5' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Uv = x({
    __name: 'AGDSH6',
    setup(e) {
      return (t, o) => (
        c(),
        $(
          kt,
          te({ type: 'h6' }, t.$attrs),
          { default: w(() => [A(t.$slots, 'default')]), _: 3 },
          16,
        )
      )
    },
  }),
  Kv = ['href', 'target', 'rel'],
  Zv = { class: 'agds-feature-link-list-item__text' },
  Yv = { class: 'agds-feature-link-list-item__label' },
  Xv = { key: 0, class: 'agds-feature-link-list-item__secondary' },
  Qv = { key: 0, class: 'sr-only' },
  Jv = x({
    __name: 'AGDSFeatureLinkListItem',
    props: {
      href: {},
      label: {},
      secondaryText: {},
      external: { type: Boolean, default: !1 },
      background: { default: 'body' },
    },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'li',
          {
            class: I([
              'agds-feature-link-list-item',
              `agds-feature-link-list-item--bg-${e.background}`,
            ]),
          },
          [
            p(
              'a',
              {
                href: e.href,
                target: e.external ? '_blank' : void 0,
                rel: e.external ? 'noopener noreferrer' : void 0,
                class: 'agds-feature-link-list-item__link',
              },
              [
                p('span', Zv, [
                  p('span', Yv, M(e.label), 1),
                  e.secondaryText ? (c(), h('span', Xv, M(e.secondaryText), 1)) : O('', !0),
                ]),
                o[0] ||
                  (o[0] = p(
                    'svg',
                    {
                      class: 'agds-feature-link-list-item__chevron',
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      'stroke-width': '2',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                      'aria-hidden': 'true',
                      focusable: 'false',
                    },
                    [p('polyline', { points: '9 18 15 12 9 6' })],
                    -1,
                  )),
                e.external ? (c(), h('span', Qv, ', opens in a new tab')) : O('', !0),
              ],
              8,
              Kv,
            ),
          ],
          2,
        )
      )
    },
  }),
  oi = F(Jv, [['__scopeId', 'data-v-3de423b9']]),
  em = { class: 'agds-feature-link-list' },
  tm = x({
    __name: 'AGDSFeatureLinkList',
    props: { links: {}, background: { default: 'body' } },
    setup(e) {
      return (t, o) => (
        c(),
        h('ul', em, [
          (c(!0),
          h(
            ae,
            null,
            fe(
              e.links,
              (a, l) => (
                c(),
                $(oi, te({ key: l }, { ref_for: !0 }, a, { background: e.background }), null, 16, [
                  'background',
                ])
              ),
            ),
            128,
          )),
        ])
      )
    },
  }),
  am = F(tm, [['__scopeId', 'data-v-13873e69']]),
  om = { class: 'agds-link-list-item' },
  lm = ['href', 'target', 'rel'],
  nm = { key: 0, class: 'sr-only' },
  im = x({
    __name: 'AGDSLinkListItem',
    props: { href: {}, label: {}, target: {} },
    setup(e) {
      return (t, o) => (
        c(),
        h('li', om, [
          p(
            'a',
            {
              href: e.href,
              target: e.target,
              rel: e.target === '_blank' ? 'noopener noreferrer' : void 0,
              class: 'agds-link-list-item__link',
            },
            [
              de(M(e.label) + ' ', 1),
              e.target === '_blank' ? (c(), h('span', nm, ', opens in a new tab')) : O('', !0),
            ],
            8,
            lm,
          ),
        ])
      )
    },
  }),
  li = F(im, [['__scopeId', 'data-v-657564fd']]),
  sm = x({
    __name: 'AGDSLinkList',
    props: { links: {}, horizontal: { type: Boolean, default: !1 } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'ul',
          {
            class: I([
              'agds-link-list',
              e.horizontal ? 'agds-link-list--horizontal' : 'agds-link-list--vertical',
            ]),
          },
          [
            (c(!0),
            h(
              ae,
              null,
              fe(e.links, (a, l) => (c(), $(li, te({ key: l }, { ref_for: !0 }, a), null, 16))),
              128,
            )),
          ],
          2,
        )
      )
    },
  }),
  rm = F(sm, [['__scopeId', 'data-v-f737ef8d']]),
  Sa = Symbol('AgDSListDepth'),
  dm = x({
    __name: 'AGDSUnorderedList',
    setup(e) {
      const t = Pe(Sa, 0) + 1
      qe(Sa, t)
      const o = y(() => t > 1)
      return (a, l) => (
        c(),
        h(
          'ul',
          { class: I(['agds-unordered-list', { 'agds-list--nested': o.value }]) },
          [A(a.$slots, 'default', {}, void 0, !0)],
          2,
        )
      )
    },
  }),
  um = F(dm, [['__scopeId', 'data-v-f6f107f0']]),
  cm = x({
    __name: 'AGDSOrderedList',
    setup(e) {
      const t = Pe(Sa, 0) + 1
      qe(Sa, t)
      const o = y(() => t > 1)
      return (a, l) => (
        c(),
        h(
          'ol',
          { class: I(['agds-ordered-list', { 'agds-list--nested': o.value }]) },
          [A(a.$slots, 'default', {}, void 0, !0)],
          2,
        )
      )
    },
  }),
  fm = F(cm, [['__scopeId', 'data-v-ff0451d1']]),
  pm = { class: 'agds-list-item' },
  gm = x({
    __name: 'AGDSListItem',
    setup(e) {
      return (t, o) => (c(), h('li', pm, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  vm = F(gm, [['__scopeId', 'data-v-ff5045d7']]),
  mm = x({
    __name: 'AGDSText',
    props: {
      as: { default: 'span' },
      color: { default: 'text' },
      fontFamily: { default: 'body' },
      fontSize: { default: 'sm' },
      fontWeight: { default: 'normal' },
      lineHeight: { default: 'normal' },
    },
    setup(e) {
      const t = e,
        o = {
          text: 'var(--agds-color-text)',
          muted: 'var(--agds-color-text-muted)',
          inverse: 'var(--agds-color-text-inverse)',
          disabled: 'var(--agds-color-text-disabled)',
        },
        a = {
          body: 'var(--agds-font-family-body)',
          heading: 'var(--agds-font-family-heading)',
          mono: 'var(--agds-font-family-mono)',
        },
        l = {
          xs: 'var(--agds-font-size-xs)',
          sm: 'var(--agds-font-size-sm)',
          md: 'var(--agds-font-size-md)',
          lg: 'var(--agds-font-size-lg)',
          xl: 'var(--agds-font-size-xl)',
          '2xl': 'var(--agds-font-size-2xl)',
          '3xl': 'var(--agds-font-size-3xl)',
          '4xl': 'var(--agds-font-size-4xl)',
        },
        n = {
          normal: 'var(--agds-font-weight-normal)',
          medium: 'var(--agds-font-weight-medium)',
          semibold: 'var(--agds-font-weight-semibold)',
          bold: 'var(--agds-font-weight-bold)',
        },
        i = {
          tight: 'var(--agds-line-height-tight)',
          snug: 'var(--agds-line-height-snug)',
          normal: 'var(--agds-line-height-normal)',
          relaxed: 'var(--agds-line-height-relaxed)',
        },
        s = y(() => ({
          color: o[t.color],
          fontFamily: a[t.fontFamily],
          fontSize: l[t.fontSize],
          fontWeight: n[t.fontWeight],
          lineHeight: i[t.lineHeight],
        }))
      return (r, d) => (
        c(),
        $(
          ke(t.as),
          { class: 'agds-text', style: xe(s.value) },
          { default: w(() => [A(r.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['style'],
        )
      )
    },
  }),
  ni = F(mm, [['__scopeId', 'data-v-4aeb7e1f']])
function ii({ currentPage: e, totalPages: t, windowLimit: o }) {
  const a = []
  let l = 1,
    n = t
  if (o < t) {
    const i = Math.floor(o / 2),
      s = i + (o % 2) - 1
    ;((l = e - s), (n = e + i), l < 1 && ((n = o), (l = 1)), n > t && ((l = t - o + 1), (n = t)))
  }
  ;(e > 1 && a.push({ type: 'direction', direction: 'left', pageNumber: e - 1 }),
    l > 1 &&
      (a.push({ type: 'page', pageNumber: 1, isActive: e === 1 }),
      l > 3
        ? a.push({ type: 'separator', pageNumber: 0 })
        : l !== 2 && a.push({ type: 'page', pageNumber: 2, isActive: e === 2 })))
  for (let i = l; i <= n; i++) a.push({ type: 'page', pageNumber: i, isActive: i === e })
  return (
    n + 1 < t &&
      (n + 1 !== t - 1
        ? a.push({ type: 'separator', pageNumber: 0 })
        : a.push({ type: 'page', pageNumber: t - 1, isActive: e === t - 1 })),
    n < t && a.push({ type: 'page', pageNumber: t, isActive: e === t }),
    e < t && a.push({ type: 'direction', direction: 'right', pageNumber: e + 1 }),
    a
  )
}
function si(e, t, o) {
  const a = e[t - 1],
    l = e[t + 1],
    n = (a?.pageNumber ?? 0) + 1,
    i = (l?.pageNumber ?? 0) - 1
  return `… Pages ${n} to ${i} are hidden. Use the Previous and Next ${o ? 'links' : 'buttons'} to navigate`
}
const hm = ['aria-label'],
  bm = { class: 'agds-pagination__list' },
  ym = ['href', 'aria-label'],
  _m = {
    key: 0,
    class: 'agds-pagination__arrow',
    'aria-hidden': 'true',
    width: '16',
    height: '16',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  km = { class: 'agds-pagination__direction-label' },
  wm = {
    key: 1,
    class: 'agds-pagination__arrow',
    'aria-hidden': 'true',
    width: '16',
    height: '16',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  xm = { key: 1, class: 'agds-pagination__item' },
  Sm = ['href', 'aria-label', 'aria-current'],
  Am = ['aria-label'],
  Cm = { key: 0, class: 'agds-pagination__secondary' },
  Dm = { key: 0, role: 'status', class: 'agds-pagination__range' },
  Bm = { key: 1, class: 'agds-pagination__per-page' },
  $m = { class: 'agds-pagination__select-wrap' },
  Im = ['value'],
  Mm = ['value'],
  Om = x({
    __name: 'AGDSPagination',
    props: {
      ariaLabel: { default: 'Pagination' },
      currentPage: {},
      generateHref: {},
      itemRangeText: {},
      itemsPerPage: {},
      itemsPerPageOptions: { default: () => [10, 20, 50, 100] },
      totalPages: {},
      windowLimit: { default: 3 },
    },
    emits: ['itemsPerPageChange'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = `agds-pagination-per-page-${ge()?.uid ?? 0}`,
        n = y(() =>
          ii({ currentPage: o.currentPage, totalPages: o.totalPages, windowLimit: o.windowLimit }),
        ),
        i = y(() => o.itemsPerPage !== void 0),
        s = y(() => !!o.itemRangeText || i.value)
      function r(f, g) {
        return f.type === 'direction'
          ? f.direction
          : f.type === 'page'
            ? `page-${f.pageNumber}`
            : `separator-${g}`
      }
      function d(f) {
        return si(n.value, f, !0)
      }
      function u(f) {
        const g = Number(f.target.value)
        a('itemsPerPageChange', g)
      }
      return (f, g) => (
        c(),
        h(
          'div',
          { class: I(['agds-pagination', { 'agds-pagination--has-secondary': s.value }]) },
          [
            p(
              'nav',
              { 'aria-label': e.ariaLabel, class: 'agds-pagination__nav' },
              [
                p('ol', bm, [
                  (c(!0),
                  h(
                    ae,
                    null,
                    fe(
                      n.value,
                      (b, m) => (
                        c(),
                        h(
                          ae,
                          { key: r(b, m) },
                          [
                            b.type === 'direction'
                              ? (c(),
                                h(
                                  'li',
                                  {
                                    key: 0,
                                    class: I([
                                      'agds-pagination__item',
                                      `agds-pagination__item--${b.direction}`,
                                    ]),
                                  },
                                  [
                                    p(
                                      'a',
                                      {
                                        href: e.generateHref(b.pageNumber),
                                        'aria-label':
                                          b.direction === 'left'
                                            ? 'Go to previous page'
                                            : 'Go to next page',
                                        class: 'agds-pagination__direction',
                                      },
                                      [
                                        b.direction === 'left'
                                          ? (c(),
                                            h('svg', _m, [
                                              ...(g[0] ||
                                                (g[0] = [
                                                  p(
                                                    'polyline',
                                                    { points: '15 18 9 12 15 6' },
                                                    null,
                                                    -1,
                                                  ),
                                                ])),
                                            ]))
                                          : O('', !0),
                                        p(
                                          'span',
                                          km,
                                          M(b.direction === 'left' ? 'Previous' : 'Next'),
                                          1,
                                        ),
                                        b.direction === 'right'
                                          ? (c(),
                                            h('svg', wm, [
                                              ...(g[1] ||
                                                (g[1] = [
                                                  p(
                                                    'polyline',
                                                    { points: '9 18 15 12 9 6' },
                                                    null,
                                                    -1,
                                                  ),
                                                ])),
                                            ]))
                                          : O('', !0),
                                      ],
                                      8,
                                      ym,
                                    ),
                                  ],
                                  2,
                                ))
                              : b.type === 'page'
                                ? (c(),
                                  h('li', xm, [
                                    p(
                                      'a',
                                      {
                                        href: e.generateHref(b.pageNumber),
                                        'aria-label': `Go to page ${b.pageNumber}`,
                                        'aria-current': b.isActive ? 'page' : void 0,
                                        class: I([
                                          'agds-pagination__page',
                                          { 'agds-pagination__page--active': b.isActive },
                                        ]),
                                      },
                                      M(b.pageNumber),
                                      11,
                                      Sm,
                                    ),
                                  ]))
                                : b.type === 'separator'
                                  ? (c(),
                                    h(
                                      'li',
                                      {
                                        key: 2,
                                        class: 'agds-pagination__item agds-pagination__separator',
                                        'aria-label': d(m),
                                      },
                                      [
                                        ...(g[2] ||
                                          (g[2] = [
                                            p(
                                              'span',
                                              {
                                                'aria-hidden': 'true',
                                                class: 'agds-pagination__ellipsis',
                                              },
                                              '…',
                                              -1,
                                            ),
                                          ])),
                                      ],
                                      8,
                                      Am,
                                    ))
                                  : O('', !0),
                          ],
                          64,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ],
              8,
              hm,
            ),
            s.value
              ? (c(),
                h('div', Cm, [
                  e.itemRangeText ? (c(), h('p', Dm, M(e.itemRangeText), 1)) : O('', !0),
                  i.value
                    ? (c(),
                      h('div', Bm, [
                        p(
                          'label',
                          { for: l, class: 'agds-pagination__per-page-label' },
                          ' Items per page ',
                        ),
                        p('div', $m, [
                          p(
                            'select',
                            {
                              id: l,
                              value: e.itemsPerPage,
                              class: 'agds-pagination__select',
                              onChange: u,
                            },
                            [
                              (c(!0),
                              h(
                                ae,
                                null,
                                fe(
                                  e.itemsPerPageOptions,
                                  (b) => (c(), h('option', { key: b, value: b }, M(b), 9, Mm)),
                                ),
                                128,
                              )),
                            ],
                            40,
                            Im,
                          ),
                        ]),
                      ]))
                    : O('', !0),
                ]))
              : O('', !0),
          ],
          2,
        )
      )
    },
  }),
  Lm = F(Om, [['__scopeId', 'data-v-818e0963']]),
  Fm = ['aria-label'],
  qm = { class: 'agds-pagination__list' },
  Em = ['aria-label', 'onClick'],
  Pm = {
    key: 0,
    class: 'agds-pagination__arrow',
    'aria-hidden': 'true',
    width: '16',
    height: '16',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  Tm = { class: 'agds-pagination__direction-label' },
  Rm = {
    key: 1,
    class: 'agds-pagination__arrow',
    'aria-hidden': 'true',
    width: '16',
    height: '16',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  Vm = { key: 1, class: 'agds-pagination__item' },
  Nm = ['aria-label', 'aria-current', 'onClick'],
  Wm = ['aria-label'],
  Hm = { key: 0, class: 'agds-pagination__secondary' },
  jm = { key: 0, role: 'status', class: 'agds-pagination__range' },
  Gm = { key: 1, class: 'agds-pagination__per-page' },
  zm = { class: 'agds-pagination__select-wrap' },
  Um = ['value'],
  Km = ['value'],
  Zm = x({
    __name: 'AGDSPaginationButtons',
    props: {
      ariaLabel: { default: 'Pagination' },
      currentPage: {},
      itemRangeText: {},
      itemsPerPage: {},
      itemsPerPageOptions: { default: () => [10, 20, 50, 100] },
      totalPages: {},
      windowLimit: { default: 3 },
    },
    emits: ['change', 'itemsPerPageChange'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = `agds-pagination-per-page-${ge()?.uid ?? 0}`,
        n = C(!1),
        i = C(null)
      pe(
        () => o.currentPage,
        async (_) => {
          n.value && _ === 1 && (await he(), i.value?.focus(), (n.value = !1))
        },
      )
      const s = y(() =>
          ii({ currentPage: o.currentPage, totalPages: o.totalPages, windowLimit: o.windowLimit }),
        ),
        r = y(() => o.itemsPerPage !== void 0),
        d = y(() => !!o.itemRangeText || r.value)
      function u(_, k) {
        return _.type === 'direction'
          ? _.direction
          : _.type === 'page'
            ? `page-${_.pageNumber}`
            : `separator-${k}`
      }
      function f(_) {
        return si(s.value, _, !1)
      }
      function g(_) {
        ;(a('change', _.pageNumber), _.direction === 'left' && _.pageNumber === 1 && (n.value = !0))
      }
      function b(_) {
        a('change', _)
      }
      function m(_) {
        const k = Number(_.target.value)
        a('itemsPerPageChange', k)
      }
      return (_, k) => (
        c(),
        h(
          'div',
          { class: I(['agds-pagination', { 'agds-pagination--has-secondary': d.value }]) },
          [
            p(
              'nav',
              { 'aria-label': e.ariaLabel, class: 'agds-pagination__nav' },
              [
                p('ol', qm, [
                  (c(!0),
                  h(
                    ae,
                    null,
                    fe(
                      s.value,
                      (S, D) => (
                        c(),
                        h(
                          ae,
                          { key: u(S, D) },
                          [
                            S.type === 'direction'
                              ? (c(),
                                h(
                                  'li',
                                  {
                                    key: 0,
                                    class: I([
                                      'agds-pagination__item',
                                      `agds-pagination__item--${S.direction}`,
                                    ]),
                                  },
                                  [
                                    p(
                                      'button',
                                      {
                                        type: 'button',
                                        'aria-label':
                                          S.direction === 'left'
                                            ? 'Go to previous page'
                                            : 'Go to next page',
                                        class: 'agds-pagination__direction',
                                        onClick: (B) => g(S),
                                      },
                                      [
                                        S.direction === 'left'
                                          ? (c(),
                                            h('svg', Pm, [
                                              ...(k[0] ||
                                                (k[0] = [
                                                  p(
                                                    'polyline',
                                                    { points: '15 18 9 12 15 6' },
                                                    null,
                                                    -1,
                                                  ),
                                                ])),
                                            ]))
                                          : O('', !0),
                                        p(
                                          'span',
                                          Tm,
                                          M(S.direction === 'left' ? 'Previous' : 'Next'),
                                          1,
                                        ),
                                        S.direction === 'right'
                                          ? (c(),
                                            h('svg', Rm, [
                                              ...(k[1] ||
                                                (k[1] = [
                                                  p(
                                                    'polyline',
                                                    { points: '9 18 15 12 9 6' },
                                                    null,
                                                    -1,
                                                  ),
                                                ])),
                                            ]))
                                          : O('', !0),
                                      ],
                                      8,
                                      Em,
                                    ),
                                  ],
                                  2,
                                ))
                              : S.type === 'page'
                                ? (c(),
                                  h('li', Vm, [
                                    p(
                                      'button',
                                      {
                                        ref_for: !0,
                                        ref:
                                          S.pageNumber === 1
                                            ? (B) => {
                                                i.value = B
                                              }
                                            : void 0,
                                        type: 'button',
                                        'aria-label': `Go to page ${S.pageNumber}`,
                                        'aria-current': S.isActive ? 'page' : void 0,
                                        class: I([
                                          'agds-pagination__page',
                                          { 'agds-pagination__page--active': S.isActive },
                                        ]),
                                        onClick: (B) => b(S.pageNumber),
                                      },
                                      M(S.pageNumber),
                                      11,
                                      Nm,
                                    ),
                                  ]))
                                : S.type === 'separator'
                                  ? (c(),
                                    h(
                                      'li',
                                      {
                                        key: 2,
                                        class: 'agds-pagination__item agds-pagination__separator',
                                        'aria-label': f(D),
                                      },
                                      [
                                        ...(k[2] ||
                                          (k[2] = [
                                            p(
                                              'span',
                                              {
                                                'aria-hidden': 'true',
                                                class: 'agds-pagination__ellipsis',
                                              },
                                              '…',
                                              -1,
                                            ),
                                          ])),
                                      ],
                                      8,
                                      Wm,
                                    ))
                                  : O('', !0),
                          ],
                          64,
                        )
                      ),
                    ),
                    128,
                  )),
                ]),
              ],
              8,
              Fm,
            ),
            d.value
              ? (c(),
                h('div', Hm, [
                  e.itemRangeText ? (c(), h('p', jm, M(e.itemRangeText), 1)) : O('', !0),
                  r.value
                    ? (c(),
                      h('div', Gm, [
                        p(
                          'label',
                          { for: l, class: 'agds-pagination__per-page-label' },
                          ' Items per page ',
                        ),
                        p('div', zm, [
                          p(
                            'select',
                            {
                              id: l,
                              value: e.itemsPerPage,
                              class: 'agds-pagination__select',
                              onChange: m,
                            },
                            [
                              (c(!0),
                              h(
                                ae,
                                null,
                                fe(
                                  e.itemsPerPageOptions,
                                  (S) => (c(), h('option', { key: S, value: S }, M(S), 9, Km)),
                                ),
                                128,
                              )),
                            ],
                            40,
                            Um,
                          ),
                        ]),
                      ]))
                    : O('', !0),
                ]))
              : O('', !0),
          ],
          2,
        )
      )
    },
  }),
  Ym = F(Zm, [['__scopeId', 'data-v-97c4d4de']]),
  Xm = { class: 'agds-modal__body' },
  Qm = { key: 0, class: 'agds-modal__actions' },
  Jm = x({
    __name: 'AGDSModal',
    props: { modelValue: { type: Boolean }, title: {} },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = Ni('titleRef')
      function n(i) {
        ;(i.preventDefault(), l.value?.$el?.focus())
      }
      return (
        pe(
          () => o.modelValue,
          (i) => {
            typeof document < 'u' && (document.body.style.overflow = i ? 'hidden' : '')
          },
          { immediate: !0 },
        ),
        (i, s) => (
          c(),
          $(
            v(er),
            {
              open: o.modelValue,
              'onUpdate:open': s[0] || (s[0] = (r) => a('update:modelValue', r)),
            },
            {
              default: w(() => [
                E(
                  v($r),
                  { 'force-mount': '' },
                  {
                    default: w(() => [
                      E(v(Cr), { class: 'agds-modal__overlay' }),
                      E(
                        v(wr),
                        { class: 'agds-modal__dialog', onOpenAutoFocus: n },
                        {
                          default: w(() => [
                            E(
                              v(ar),
                              { 'as-child': '' },
                              {
                                default: w(() => [
                                  ...(s[1] ||
                                    (s[1] = [
                                      p(
                                        'button',
                                        {
                                          type: 'button',
                                          class: 'agds-modal__close',
                                          'aria-label': 'Close modal',
                                        },
                                        [
                                          p(
                                            'svg',
                                            {
                                              class: 'agds-modal__close-icon',
                                              'aria-hidden': 'true',
                                              xmlns: 'http://www.w3.org/2000/svg',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              'stroke-width': '2.5',
                                              'stroke-linecap': 'round',
                                              'stroke-linejoin': 'round',
                                            },
                                            [
                                              p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                              p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                            ],
                                          ),
                                          p('span', null, 'Close'),
                                        ],
                                        -1,
                                      ),
                                    ])),
                                ]),
                                _: 1,
                              },
                            ),
                            E(
                              v(Mr),
                              {
                                ref_key: 'titleRef',
                                ref: l,
                                tabindex: '-1',
                                class: 'agds-modal__title',
                              },
                              { default: w(() => [de(M(o.title), 1)]), _: 1 },
                              512,
                            ),
                            p('div', Xm, [A(i.$slots, 'default', {}, void 0, !0)]),
                            i.$slots.actions
                              ? (c(), h('div', Qm, [A(i.$slots, 'actions', {}, void 0, !0)]))
                              : O('', !0),
                          ]),
                          _: 3,
                        },
                      ),
                    ]),
                    _: 3,
                  },
                ),
              ]),
              _: 3,
            },
            8,
            ['open'],
          )
        )
      )
    },
  }),
  eh = F(Jm, [['__scopeId', 'data-v-bfa37f82']]),
  th = { class: 'agds-drawer__header' },
  ah = ['aria-label'],
  oh = { key: 0, class: 'agds-drawer__footer' },
  lh = x({
    __name: 'AGDSDrawer',
    props: {
      modelValue: { type: Boolean },
      title: {},
      width: { default: 'md' },
      mutedOverlay: { type: Boolean, default: !1 },
      elementToFocusOnClose: { default: null },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t
      let l = 0
      const n = `agds-drawer-title-${++l}`,
        i = C(null),
        s = C(null)
      let r = null
      function d() {
        a('update:modelValue', !1)
      }
      ;(pe(
        () => o.modelValue,
        async (f) => {
          typeof document > 'u' ||
            (f
              ? ((r = document.activeElement),
                (document.body.style.overflow = 'hidden'),
                await he(),
                s.value?.focus())
              : ((document.body.style.overflow = ''),
                await he(),
                (o.elementToFocusOnClose ?? r)?.focus()))
        },
        { immediate: !0 },
      ),
        Te(() => {
          o.modelValue && (document.body.style.overflow = '')
        }))
      function u(f) {
        if (f.key === 'Escape') {
          ;(f.preventDefault(), f.stopPropagation(), d())
          return
        }
        if (f.key === 'Tab') {
          const g = Array.from(
            i.value?.querySelectorAll(
              'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
            ) ?? [],
          )
          if (!g.length) return
          const b = g[0],
            m = g[g.length - 1]
          f.shiftKey && document.activeElement === b
            ? (f.preventDefault(), m.focus())
            : !f.shiftKey && document.activeElement === m && (f.preventDefault(), b.focus())
        }
      }
      return (f, g) => (
        c(),
        $(Ca, { to: 'body' }, [
          E(
            Rt,
            { name: 'agds-drawer-overlay' },
            {
              default: w(() => [
                e.modelValue
                  ? (c(),
                    h(
                      'div',
                      {
                        key: 0,
                        class: I([
                          'agds-drawer__overlay',
                          { 'agds-drawer__overlay--muted': e.mutedOverlay },
                        ]),
                        'aria-hidden': 'true',
                        onClick: d,
                      },
                      null,
                      2,
                    ))
                  : O('', !0),
              ]),
              _: 1,
            },
          ),
          E(
            Rt,
            { name: 'agds-drawer-panel' },
            {
              default: w(() => [
                e.modelValue
                  ? (c(),
                    h(
                      'div',
                      {
                        key: 0,
                        ref_key: 'drawerEl',
                        ref: i,
                        role: 'dialog',
                        'aria-modal': 'true',
                        'aria-labelledby': n,
                        class: I(['agds-drawer', `agds-drawer--${e.width}`]),
                        onKeydown: u,
                      },
                      [
                        p('div', th, [
                          p(
                            'h2',
                            {
                              ref_key: 'titleEl',
                              ref: s,
                              id: n,
                              class: 'agds-drawer__title',
                              tabindex: '-1',
                            },
                            M(e.title),
                            513,
                          ),
                          p(
                            'button',
                            {
                              type: 'button',
                              class: 'agds-drawer__close',
                              'aria-label': 'Close',
                              onClick: d,
                            },
                            [
                              ...(g[0] ||
                                (g[0] = [
                                  p(
                                    'svg',
                                    {
                                      'aria-hidden': 'true',
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 24 24',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      'stroke-width': '2.5',
                                      'stroke-linecap': 'round',
                                      'stroke-linejoin': 'round',
                                      class: 'agds-drawer__close-icon',
                                    },
                                    [
                                      p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                      p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                    ],
                                    -1,
                                  ),
                                  p('span', null, 'Close', -1),
                                ])),
                            ],
                          ),
                        ]),
                        p(
                          'section',
                          {
                            class: 'agds-drawer__body',
                            'aria-label': `${e.title} content`,
                            tabindex: '0',
                          },
                          [A(f.$slots, 'default', {}, void 0, !0)],
                          8,
                          ah,
                        ),
                        f.$slots.actions
                          ? (c(), h('div', oh, [A(f.$slots, 'actions', {}, void 0, !0)]))
                          : O('', !0),
                      ],
                      34,
                    ))
                  : O('', !0),
              ]),
              _: 3,
            },
          ),
        ])
      )
    },
  }),
  nh = F(lh, [['__scopeId', 'data-v-2624a4e4']]),
  ih = x({
    __name: 'AGDSTabs',
    props: {
      modelValue: {},
      defaultValue: {},
      contained: { type: Boolean, default: !0 },
      background: { default: 'body' },
    },
    emits: ['update:modelValue'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = C('horizontal')
      let n = null
      function i(s) {
        l.value = s.matches ? 'horizontal' : 'vertical'
      }
      return (
        we(() => {
          typeof window < 'u' &&
            window.matchMedia &&
            ((n = window.matchMedia('(min-width: 768px)')),
            (l.value = n.matches ? 'horizontal' : 'vertical'),
            n.addEventListener('change', i))
        }),
        Te(() => {
          n?.removeEventListener('change', i)
        }),
        qe('tabsBackground', o.background),
        qe('tabsContained', o.contained),
        (s, r) => (
          c(),
          $(
            v(Nu),
            {
              'model-value': o.modelValue,
              'default-value': o.defaultValue,
              orientation: l.value,
              class: I(['agds-tabs', o.background === 'bodyAlt' && 'agds-tabs--body-alt']),
              'onUpdate:modelValue': r[0] || (r[0] = (d) => a('update:modelValue', d)),
            },
            { default: w(() => [A(s.$slots, 'default', {}, void 0, !0)]), _: 3 },
            8,
            ['model-value', 'default-value', 'orientation', 'class'],
          )
        )
      )
    },
  }),
  sh = F(ih, [['__scopeId', 'data-v-5acf89f8']]),
  rh = x({
    __name: 'AGDSTabList',
    props: { ariaLabel: { default: void 0 } },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          v(Gu),
          { 'aria-label': t.ariaLabel, class: 'agds-tab-list' },
          { default: w(() => [A(o.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['aria-label'],
        )
      )
    },
  }),
  dh = F(rh, [['__scopeId', 'data-v-c7938db0']]),
  uh = { class: 'agds-tab__label' },
  ch = x({
    __name: 'AGDSTab',
    props: { value: {}, disabled: { type: Boolean, default: !1 } },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          v(Uu),
          { value: t.value, disabled: t.disabled, class: 'agds-tab' },
          {
            default: w(() => [
              p('span', uh, [A(o.$slots, 'default', {}, void 0, !0)]),
              A(o.$slots, 'end-element', {}, void 0, !0),
            ]),
            _: 3,
          },
          8,
          ['value', 'disabled'],
        )
      )
    },
  }),
  fh = F(ch, [['__scopeId', 'data-v-a00ce61e']]),
  ph = x({
    __name: 'AGDSTabPanel',
    props: { value: {} },
    setup(e) {
      const t = e,
        o = Pe('tabsContained', !0)
      return (a, l) => (
        c(),
        $(
          v(Hu),
          {
            value: t.value,
            class: I([
              'agds-tab-panel',
              v(o) ? 'agds-tab-panel--contained' : 'agds-tab-panel--edge',
            ]),
          },
          { default: w(() => [A(a.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['value', 'class'],
        )
      )
    },
  }),
  gh = F(ph, [['__scopeId', 'data-v-075bd973']]),
  ri = Symbol('CheckboxGroup'),
  vh = ['for'],
  mh = { class: 'agds-checkbox__control' },
  hh = [
    'id',
    'name',
    'checked',
    'disabled',
    'required',
    'aria-checked',
    'aria-invalid',
    'aria-required',
    'aria-describedby',
  ],
  bh = {
    key: 0,
    class: 'agds-checkbox__icon agds-checkbox__icon--check',
    viewBox: '0 0 12 10',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    focusable: 'false',
  },
  yh = {
    key: 1,
    class: 'agds-checkbox__icon agds-checkbox__icon--minus',
    viewBox: '0 0 12 2',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    focusable: 'false',
  },
  _h = x({
    __name: 'AGDSCheckbox',
    props: {
      id: {},
      name: {},
      modelValue: { type: Boolean, default: !1 },
      value: { type: [String, Number, Boolean] },
      disabled: { type: Boolean, default: !1 },
      indeterminate: { type: Boolean, default: !1 },
      invalid: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      size: { default: 'md' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o
      let n = 0
      const i = `agds-checkbox-${++n}`,
        s = y(() => a.id ?? i),
        r = Pe(ri, null),
        d = y(() => a.name ?? r?.name ?? void 0),
        u = y(() => (typeof a.invalid == 'boolean' && a.invalid ? !0 : (r?.invalid ?? !1))),
        f = y(() => (typeof a.required == 'boolean' && a.required ? !0 : (r?.required ?? !1))),
        g = y(() => a.disabled || (r?.disabled ?? !1)),
        b = y(() => (u.value && r?.messageId ? r.messageId : void 0)),
        m = C(null)
      t({ focus: () => m.value?.focus() })
      function _() {
        m.value && (m.value.indeterminate = !!a.indeterminate)
      }
      ;(we(_), pe(() => a.indeterminate, _))
      const k = y(() => (a.indeterminate ? !1 : a.modelValue))
      function S(D) {
        if (g.value) return
        const B = D.target
        ;(l('update:modelValue', B.checked), l('change', D))
      }
      return (D, B) => (
        c(),
        h(
          'label',
          {
            for: s.value,
            class: I([
              'agds-checkbox',
              [`agds-checkbox--${a.size}`, { 'agds-checkbox--disabled': g.value }],
            ]),
          },
          [
            p('span', mh, [
              p(
                'input',
                te(
                  {
                    id: s.value,
                    ref_key: 'inputRef',
                    ref: m,
                    type: 'checkbox',
                    class: 'agds-checkbox__input',
                    name: d.value,
                    checked: k.value,
                    disabled: g.value,
                    required: f.value || void 0,
                    'aria-checked': a.indeterminate ? 'mixed' : void 0,
                    'aria-invalid': u.value || void 0,
                    'aria-required': f.value || void 0,
                    'aria-describedby': b.value,
                  },
                  D.$attrs,
                  {
                    onChange: S,
                    onFocus: B[0] || (B[0] = (L) => l('focus', L)),
                    onBlur: B[1] || (B[1] = (L) => l('blur', L)),
                  },
                ),
                null,
                16,
                hh,
              ),
              p(
                'span',
                {
                  class: I([
                    'agds-checkbox__indicator',
                    {
                      'agds-checkbox__indicator--invalid': u.value,
                      'agds-checkbox__indicator--disabled': g.value,
                    },
                  ]),
                  'aria-hidden': 'true',
                },
                [
                  a.indeterminate
                    ? (c(),
                      h('svg', yh, [
                        ...(B[3] ||
                          (B[3] = [
                            p(
                              'path',
                              {
                                d: 'M1 1H11',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                              },
                              null,
                              -1,
                            ),
                          ])),
                      ]))
                    : (c(),
                      h('svg', bh, [
                        ...(B[2] ||
                          (B[2] = [
                            p(
                              'path',
                              {
                                d: 'M1 5L4.5 8.5L11 1.5',
                                stroke: 'currentColor',
                                'stroke-width': '2',
                                'stroke-linecap': 'round',
                                'stroke-linejoin': 'round',
                              },
                              null,
                              -1,
                            ),
                          ])),
                      ])),
                ],
                2,
              ),
            ]),
            D.$slots.default
              ? (c(),
                h(
                  'span',
                  {
                    key: 0,
                    class: I([
                      'agds-checkbox__label',
                      { 'agds-checkbox__label--disabled': g.value },
                    ]),
                  },
                  [A(D.$slots, 'default', {}, void 0, !0)],
                  2,
                ))
              : O('', !0),
          ],
          10,
          vh,
        )
      )
    },
  }),
  di = F(_h, [['__scopeId', 'data-v-2d8ac97b']]),
  kh = ['disabled'],
  wh = { key: 0, class: 'agds-checkbox-group__legend' },
  xh = { key: 0, class: 'agds-checkbox-group__required', 'aria-hidden': 'true' },
  Sh = { key: 1, class: 'agds-checkbox-group__hint' },
  Ah = ['id'],
  Ch = { class: 'agds-checkbox-group__items' },
  Dh = x({
    __name: 'AGDSCheckboxGroup',
    props: {
      name: {},
      invalid: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      messageId: {},
      legend: {},
    },
    setup(e) {
      const t = e
      return (
        qe(ri, {
          get name() {
            return t.name
          },
          get invalid() {
            return t.invalid
          },
          get required() {
            return t.required
          },
          get disabled() {
            return t.disabled
          },
          get messageId() {
            return t.messageId
          },
        }),
        (o, a) => (
          c(),
          h(
            'fieldset',
            {
              class: I(['agds-checkbox-group', { 'agds-checkbox-group--invalid': t.invalid }]),
              disabled: t.disabled || void 0,
            },
            [
              t.legend || o.$slots.legend
                ? (c(),
                  h('legend', wh, [
                    A(o.$slots, 'legend', {}, () => [de(M(t.legend), 1)], !0),
                    t.required ? (c(), h('span', xh, ' *')) : O('', !0),
                  ]))
                : O('', !0),
              o.$slots.hint
                ? (c(), h('div', Sh, [A(o.$slots, 'hint', {}, void 0, !0)]))
                : O('', !0),
              t.invalid && o.$slots.message
                ? (c(),
                  h(
                    'div',
                    {
                      key: 2,
                      id: t.messageId,
                      class: 'agds-checkbox-group__message',
                      role: 'alert',
                      'aria-live': 'assertive',
                    },
                    [A(o.$slots, 'message', {}, void 0, !0)],
                    8,
                    Ah,
                  ))
                : O('', !0),
              p('div', Ch, [A(o.$slots, 'default', {}, void 0, !0)]),
            ],
            10,
            kh,
          )
        )
      )
    },
  }),
  Bh = F(Dh, [['__scopeId', 'data-v-f541f74a']]),
  $h = x({
    __name: 'AGDSFieldContainer',
    props: { invalid: { type: Boolean, default: !1 } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'div',
          { class: I(['agds-field-container', { 'agds-field-container--invalid': e.invalid }]) },
          [A(t.$slots, 'default', {}, void 0, !0)],
          2,
        )
      )
    },
  }),
  za = F($h, [['__scopeId', 'data-v-aeac4f4e']]),
  Ih = { class: 'agds-field-label__primary' },
  Mh = { key: 0, class: 'agds-field-label__secondary' },
  Oh = x({
    __name: 'AGDSFieldLabel',
    props: {
      htmlFor: {},
      id: {},
      required: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      secondaryLabel: {},
      as: { default: 'label' },
    },
    setup(e) {
      const t = e
      function o() {
        return t.hideOptionalLabel || t.required
          ? t.secondaryLabel || void 0
          : t.secondaryLabel
            ? `${t.secondaryLabel} (optional)`
            : '(optional)'
      }
      return (a, l) => (
        c(),
        $(
          ke(t.as),
          { for: t.as === 'label' ? t.htmlFor : void 0, id: t.id, class: 'agds-field-label' },
          {
            default: w(() => [
              p('span', Ih, [A(a.$slots, 'default', {}, void 0, !0)]),
              o() ? (c(), h('span', Mh, M(' ' + o()), 1)) : O('', !0),
            ]),
            _: 3,
          },
          8,
          ['for', 'id'],
        )
      )
    },
  }),
  Ua = F(Oh, [['__scopeId', 'data-v-03e45694']]),
  Lh = ['id'],
  Fh = x({
    __name: 'AGDSFieldHint',
    props: { id: {} },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'span',
          { id: e.id, class: 'agds-field-hint' },
          [A(t.$slots, 'default', {}, void 0, !0)],
          8,
          Lh,
        )
      )
    },
  }),
  Ka = F(Fh, [['__scopeId', 'data-v-4e1678bc']]),
  qh = ['id'],
  Eh = { class: 'agds-field-message__text' },
  Ph = x({
    __name: 'AGDSFieldMessage',
    props: { id: {} },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'span',
          { id: e.id, class: 'agds-field-message', role: 'alert' },
          [
            E(De, {
              name: 'mdi:alert-circle',
              size: 'md',
              'aria-label': 'Error',
              class: 'agds-field-message__icon',
            }),
            p('span', Eh, [A(t.$slots, 'default', {}, void 0, !0)]),
          ],
          8,
          qh,
        )
      )
    },
  }),
  Za = F(Ph, [['__scopeId', 'data-v-4ded11d3']]),
  Th = Symbol('ControlGroup'),
  Rh = ['aria-describedby'],
  Vh = x({
    __name: 'AGDSControlGroup',
    props: {
      block: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      hint: {},
      id: {},
      invalid: { type: Boolean, default: !1 },
      label: {},
      name: {},
      message: {},
      required: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = e,
        o = ge()?.uid ?? Math.random().toString(36).slice(2),
        a = y(() => t.id ?? `control-group-${o}`),
        l = y(() => `control-group-${o}-hint`),
        n = y(() => `control-group-${o}-message`),
        i = y(() => t.name ?? `control-group-${o}-name`),
        s = y(() => {
          const r = []
          return (
            t.message && t.invalid && r.push(n.value),
            t.hint && r.push(l.value),
            r.length ? r.join(' ') : void 0
          )
        })
      return (
        qe(Th, {
          get invalid() {
            return t.invalid
          },
          get messageId() {
            return t.invalid && t.message ? n.value : void 0
          },
          get name() {
            return i.value
          },
          get required() {
            return t.required
          },
        }),
        (r, d) => (
          c(),
          $(
            za,
            { id: a.value, invalid: t.invalid },
            {
              default: w(() => [
                p(
                  'fieldset',
                  { class: 'agds-control-group', 'aria-describedby': s.value },
                  [
                    t.label
                      ? (c(),
                        $(
                          Ua,
                          {
                            key: 0,
                            as: 'legend',
                            required: t.required,
                            'hide-optional-label': t.hideOptionalLabel,
                          },
                          { default: w(() => [de(M(t.label), 1)]), _: 1 },
                          8,
                          ['required', 'hide-optional-label'],
                        ))
                      : O('', !0),
                    p(
                      'div',
                      {
                        class: I([
                          'agds-control-group__meta',
                          { 'agds-control-group__meta--has-label': t.label },
                        ]),
                      },
                      [
                        t.hint
                          ? (c(),
                            $(
                              Ka,
                              { key: 0, id: l.value },
                              { default: w(() => [de(M(t.hint), 1)]), _: 1 },
                              8,
                              ['id'],
                            ))
                          : O('', !0),
                        t.message && t.invalid
                          ? (c(),
                            $(
                              Za,
                              { key: 1, id: n.value },
                              { default: w(() => [de(M(t.message), 1)]), _: 1 },
                              8,
                              ['id'],
                            ))
                          : O('', !0),
                        p(
                          'div',
                          {
                            class: I([
                              'agds-control-group__items',
                              { 'agds-control-group__items--block': t.block },
                            ]),
                          },
                          [A(r.$slots, 'default', {}, void 0, !0)],
                          2,
                        ),
                      ],
                      2,
                    ),
                  ],
                  8,
                  Rh,
                ),
              ]),
              _: 3,
            },
            8,
            ['id', 'invalid'],
          )
        )
      )
    },
  }),
  i2 = F(Vh, [['__scopeId', 'data-v-da353d19']]),
  Nh = ['for'],
  Wh = ['id', 'name', 'checked', 'disabled', 'required', 'aria-invalid', 'aria-required'],
  Hh = x({
    __name: 'AGDSSwitch',
    props: {
      id: {},
      name: {},
      modelValue: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      invalid: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      size: { default: 'md' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o
      let n = 0
      const i = `agds-switch-${++n}`,
        s = y(() => a.id ?? i),
        r = C(null)
      t({ focus: () => r.value?.focus() })
      function d(u) {
        if (a.disabled) return
        const f = u.target
        ;(l('update:modelValue', f.checked), l('change', u))
      }
      return (u, f) => (
        c(),
        h(
          'label',
          {
            for: s.value,
            class: I([
              'agds-switch',
              [`agds-switch--${a.size}`, { 'agds-switch--disabled': a.disabled }],
            ]),
          },
          [
            p(
              'input',
              te(
                {
                  id: s.value,
                  ref_key: 'inputRef',
                  ref: r,
                  type: 'checkbox',
                  role: 'switch',
                  class: 'agds-switch__input',
                  name: a.name,
                  checked: a.modelValue,
                  disabled: a.disabled,
                  required: a.required || void 0,
                  'aria-invalid': a.invalid || void 0,
                  'aria-required': a.required || void 0,
                },
                u.$attrs,
                {
                  onChange: d,
                  onFocus: f[0] || (f[0] = (g) => l('focus', g)),
                  onBlur: f[1] || (f[1] = (g) => l('blur', g)),
                },
              ),
              null,
              16,
              Wh,
            ),
            p(
              'span',
              {
                class: I([
                  'agds-switch__track',
                  {
                    'agds-switch__track--invalid': a.invalid,
                    'agds-switch__track--disabled': a.disabled,
                  },
                ]),
                'aria-hidden': 'true',
              },
              [...(f[2] || (f[2] = [p('span', { class: 'agds-switch__thumb' }, null, -1)]))],
              2,
            ),
            u.$slots.default
              ? (c(),
                h(
                  'span',
                  {
                    key: 0,
                    class: I([
                      'agds-switch__label',
                      { 'agds-switch__label--disabled': a.disabled },
                    ]),
                  },
                  [A(u.$slots, 'default', {}, void 0, !0)],
                  2,
                ))
              : O('', !0),
          ],
          10,
          Nh,
        )
      )
    },
  }),
  jh = F(Hh, [['__scopeId', 'data-v-bf048749']]),
  ui = Symbol('RadioGroup'),
  Gh = ['for'],
  zh = { class: 'agds-radio__control' },
  Uh = [
    'id',
    'name',
    'value',
    'checked',
    'disabled',
    'required',
    'aria-invalid',
    'aria-required',
    'aria-describedby',
  ],
  Kh = x({
    __name: 'AGDSRadio',
    props: {
      id: {},
      name: {},
      modelValue: { type: [String, Number, Boolean] },
      value: { type: [String, Number, Boolean] },
      disabled: { type: Boolean, default: !1 },
      invalid: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      size: { default: 'md' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o
      let n = 0
      const i = `agds-radio-${++n}`,
        s = y(() => a.id ?? i),
        r = Pe(ui, null),
        d = y(() => a.name ?? r?.name ?? void 0),
        u = y(() => (typeof a.invalid == 'boolean' && a.invalid ? !0 : (r?.invalid ?? !1))),
        f = y(() => (typeof a.required == 'boolean' && a.required ? !0 : (r?.required ?? !1))),
        g = y(() => a.disabled || (r?.disabled ?? !1)),
        b = y(() => (u.value && r?.messageId ? r.messageId : void 0)),
        m = y(() => a.modelValue === a.value)
      function _(S) {
        g.value || (l('update:modelValue', a.value), l('change', S))
      }
      const k = C(null)
      return (
        t({ focus: () => k.value?.focus() }),
        (S, D) => (
          c(),
          h(
            'label',
            {
              for: s.value,
              class: I([
                'agds-radio',
                [`agds-radio--${a.size}`, { 'agds-radio--disabled': g.value }],
              ]),
            },
            [
              p('span', zh, [
                p(
                  'input',
                  te(
                    {
                      id: s.value,
                      ref_key: 'inputRef',
                      ref: k,
                      type: 'radio',
                      class: 'agds-radio__input',
                      name: d.value,
                      value: a.value,
                      checked: m.value,
                      disabled: g.value,
                      required: f.value || void 0,
                      'aria-invalid': u.value || void 0,
                      'aria-required': f.value || void 0,
                      'aria-describedby': b.value,
                    },
                    S.$attrs,
                    {
                      onChange: _,
                      onFocus: D[0] || (D[0] = (B) => l('focus', B)),
                      onBlur: D[1] || (D[1] = (B) => l('blur', B)),
                    },
                  ),
                  null,
                  16,
                  Uh,
                ),
                p(
                  'span',
                  {
                    class: I([
                      'agds-radio__indicator',
                      {
                        'agds-radio__indicator--invalid': u.value,
                        'agds-radio__indicator--disabled': g.value,
                      },
                    ]),
                    'aria-hidden': 'true',
                  },
                  [...(D[2] || (D[2] = [p('span', { class: 'agds-radio__dot' }, null, -1)]))],
                  2,
                ),
              ]),
              S.$slots.default
                ? (c(),
                  h(
                    'span',
                    {
                      key: 0,
                      class: I(['agds-radio__label', { 'agds-radio__label--disabled': g.value }]),
                    },
                    [A(S.$slots, 'default', {}, void 0, !0)],
                    2,
                  ))
                : O('', !0),
            ],
            10,
            Gh,
          )
        )
      )
    },
  }),
  Zh = F(Kh, [['__scopeId', 'data-v-f9e45fdd']]),
  Yh = ['disabled'],
  Xh = { key: 0, class: 'agds-radio-group__legend' },
  Qh = { key: 0, class: 'agds-radio-group__required', 'aria-hidden': 'true' },
  Jh = { key: 1, class: 'agds-radio-group__hint' },
  eb = ['id'],
  tb = { class: 'agds-radio-group__items' },
  ab = x({
    __name: 'AGDSRadioGroup',
    props: {
      name: {},
      invalid: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      messageId: {},
      legend: {},
    },
    setup(e) {
      const t = e
      return (
        qe(ui, {
          get name() {
            return t.name
          },
          get invalid() {
            return t.invalid
          },
          get required() {
            return t.required
          },
          get disabled() {
            return t.disabled
          },
          get messageId() {
            return t.messageId
          },
        }),
        (o, a) => (
          c(),
          h(
            'fieldset',
            {
              class: I(['agds-radio-group', { 'agds-radio-group--invalid': t.invalid }]),
              disabled: t.disabled || void 0,
            },
            [
              t.legend || o.$slots.legend
                ? (c(),
                  h('legend', Xh, [
                    A(o.$slots, 'legend', {}, () => [de(M(t.legend), 1)], !0),
                    t.required ? (c(), h('span', Qh, ' *')) : O('', !0),
                  ]))
                : O('', !0),
              o.$slots.hint
                ? (c(), h('div', Jh, [A(o.$slots, 'hint', {}, void 0, !0)]))
                : O('', !0),
              t.invalid && o.$slots.message
                ? (c(),
                  h(
                    'div',
                    {
                      key: 2,
                      id: t.messageId,
                      class: 'agds-radio-group__message',
                      role: 'alert',
                      'aria-live': 'assertive',
                    },
                    [A(o.$slots, 'message', {}, void 0, !0)],
                    8,
                    eb,
                  ))
                : O('', !0),
              p('div', tb, [A(o.$slots, 'default', {}, void 0, !0)]),
            ],
            10,
            Yh,
          )
        )
      )
    },
  }),
  ob = F(ab, [['__scopeId', 'data-v-758acbb9']]),
  lb = ['href', 'target', 'rel'],
  nb = { key: 0, class: 'sr-only' },
  ib = x({
    __name: 'AGDSCallToActionLink',
    props: {
      href: {},
      external: { type: Boolean, default: !1 },
      focusRingFor: { default: 'keyboard' },
    },
    emits: ['click', 'focus', 'blur'],
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'a',
          {
            href: e.href,
            target: e.external ? '_blank' : void 0,
            rel: e.external ? 'noopener noreferrer' : void 0,
            class: I(['agds-cta', { 'agds-cta--focus-all': e.focusRingFor === 'all' }]),
            onClick: o[0] || (o[0] = (a) => t.$emit('click', a)),
            onFocus: o[1] || (o[1] = (a) => t.$emit('focus', a)),
            onBlur: o[2] || (o[2] = (a) => t.$emit('blur', a)),
          },
          [
            A(t.$slots, 'default', {}, void 0, !0),
            E(De, {
              name: 'mdi:chevron-right',
              size: 'sm',
              class: 'agds-cta__icon',
              'aria-hidden': 'true',
            }),
            e.external ? (c(), h('span', nb, ', opens in a new tab')) : O('', !0),
          ],
          42,
          lb,
        )
      )
    },
  }),
  sb = F(ib, [['__scopeId', 'data-v-51e5d28d']]),
  rb = ['type', 'disabled', 'aria-busy', 'aria-disabled'],
  db = { 'aria-live': 'assertive', class: 'agds-cta__live-region' },
  ub = { key: 0, class: 'agds-cta__loading-indicator' },
  cb = { class: 'sr-only' },
  fb = x({
    __name: 'AGDSCallToActionButton',
    props: {
      disabled: { type: Boolean, default: !1 },
      loading: { type: Boolean, default: !1 },
      loadingLabel: { default: 'Loading' },
      type: { default: 'button' },
      focusRingFor: { default: 'keyboard' },
    },
    emits: ['click', 'focus', 'blur', 'keydown'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = C(null)
      t({ focus: () => n.value?.focus() })
      function i(s) {
        ;(n.value?.focus(), !a.disabled && !a.loading && l('click', s))
      }
      return (s, r) => (
        c(),
        h(
          'button',
          {
            ref_key: 'buttonRef',
            ref: n,
            type: a.type,
            disabled: a.disabled || a.loading,
            'aria-busy': a.loading ? !0 : void 0,
            'aria-disabled': a.disabled || a.loading ? !0 : void 0,
            class: I([
              'agds-cta',
              {
                'agds-cta--focus-all': a.focusRingFor === 'all',
                'agds-cta--disabled': a.disabled,
                'agds-cta--loading': a.loading,
              },
            ]),
            onClick: i,
            onFocus: r[0] || (r[0] = (d) => l('focus', d)),
            onBlur: r[1] || (r[1] = (d) => l('blur', d)),
            onKeydown: r[2] || (r[2] = (d) => l('keydown', d)),
          },
          [
            p(
              'span',
              { class: I(['agds-cta__label', { 'agds-cta__label--hidden': a.loading }]) },
              [A(s.$slots, 'default', {}, void 0, !0)],
              2,
            ),
            E(
              De,
              {
                name: 'mdi:chevron-right',
                size: 'sm',
                class: I(['agds-cta__icon', { 'agds-cta__icon--hidden': a.loading }]),
                'aria-hidden': 'true',
              },
              null,
              8,
              ['class'],
            ),
            p('span', db, [
              a.loading
                ? (c(),
                  h('span', ub, [
                    r[3] ||
                      (r[3] = p(
                        'span',
                        { class: 'agds-cta__spinner', 'aria-hidden': 'true' },
                        null,
                        -1,
                      )),
                    p('span', cb, M(a.loadingLabel), 1),
                  ]))
                : O('', !0),
            ]),
          ],
          42,
          rb,
        )
      )
    },
  }),
  pb = F(fb, [['__scopeId', 'data-v-44321ecd']]),
  gb = ['href', 'target', 'rel'],
  vb = { key: 2, class: 'sr-only' },
  mb = x({
    __name: 'AGDSDirectionLink',
    props: {
      href: {},
      direction: {},
      external: { type: Boolean, default: !1 },
      focusRingFor: { default: 'keyboard' },
    },
    emits: ['click', 'focus', 'blur'],
    setup(e) {
      const t = {
        up: 'mdi:arrow-up',
        right: 'mdi:arrow-right',
        down: 'mdi:arrow-down',
        left: 'mdi:arrow-left',
      }
      return (o, a) => (
        c(),
        h(
          'a',
          {
            href: e.href,
            target: e.external ? '_blank' : void 0,
            rel: e.external ? 'noopener noreferrer' : void 0,
            class: I([
              'agds-direction-link',
              { 'agds-direction-link--focus-all': e.focusRingFor === 'all' },
            ]),
            onClick: a[0] || (a[0] = (l) => o.$emit('click', l)),
            onFocus: a[1] || (a[1] = (l) => o.$emit('focus', l)),
            onBlur: a[2] || (a[2] = (l) => o.$emit('blur', l)),
          },
          [
            e.direction === 'left'
              ? (c(),
                $(
                  De,
                  {
                    key: 0,
                    name: t[e.direction],
                    size: 'sm',
                    class: 'agds-direction-link__icon',
                    'aria-hidden': 'true',
                  },
                  null,
                  8,
                  ['name'],
                ))
              : O('', !0),
            A(o.$slots, 'default', {}, void 0, !0),
            e.direction !== 'left'
              ? (c(),
                $(
                  De,
                  {
                    key: 1,
                    name: t[e.direction],
                    size: 'sm',
                    class: 'agds-direction-link__icon',
                    'aria-hidden': 'true',
                  },
                  null,
                  8,
                  ['name'],
                ))
              : O('', !0),
            e.external ? (c(), h('span', vb, ', opens in a new tab')) : O('', !0),
          ],
          42,
          gb,
        )
      )
    },
  }),
  hb = F(mb, [['__scopeId', 'data-v-43796b90']]),
  bb = ['type', 'disabled', 'aria-busy', 'aria-disabled'],
  yb = { 'aria-live': 'assertive', class: 'agds-direction-link__live-region' },
  _b = { key: 0, class: 'agds-direction-link__loading-indicator' },
  kb = { class: 'sr-only' },
  wb = x({
    __name: 'AGDSDirectionButton',
    props: {
      direction: {},
      disabled: { type: Boolean, default: !1 },
      loading: { type: Boolean, default: !1 },
      loadingLabel: { default: 'Loading' },
      type: { default: 'button' },
      focusRingFor: { default: 'keyboard' },
    },
    emits: ['click', 'focus', 'blur', 'keydown'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = C(null)
      t({ focus: () => n.value?.focus() })
      function i(r) {
        ;(n.value?.focus(), !a.disabled && !a.loading && l('click', r))
      }
      const s = {
        up: 'mdi:arrow-up',
        right: 'mdi:arrow-right',
        down: 'mdi:arrow-down',
        left: 'mdi:arrow-left',
      }
      return (r, d) => (
        c(),
        h(
          'button',
          {
            ref_key: 'buttonRef',
            ref: n,
            type: a.type,
            disabled: a.disabled || a.loading,
            'aria-busy': a.loading ? !0 : void 0,
            'aria-disabled': a.disabled || a.loading ? !0 : void 0,
            class: I([
              'agds-direction-link',
              {
                'agds-direction-link--focus-all': a.focusRingFor === 'all',
                'agds-direction-link--disabled': a.disabled,
                'agds-direction-link--loading': a.loading,
              },
            ]),
            onClick: i,
            onFocus: d[0] || (d[0] = (u) => l('focus', u)),
            onBlur: d[1] || (d[1] = (u) => l('blur', u)),
            onKeydown: d[2] || (d[2] = (u) => l('keydown', u)),
          },
          [
            a.direction === 'left'
              ? (c(),
                $(
                  De,
                  {
                    key: 0,
                    name: s[a.direction],
                    size: 'sm',
                    class: 'agds-direction-link__icon',
                    'aria-hidden': 'true',
                  },
                  null,
                  8,
                  ['name'],
                ))
              : O('', !0),
            p(
              'span',
              {
                class: I([
                  'agds-direction-link__label',
                  { 'agds-direction-link__label--hidden': a.loading },
                ]),
              },
              [A(r.$slots, 'default', {}, void 0, !0)],
              2,
            ),
            a.direction !== 'left'
              ? (c(),
                $(
                  De,
                  {
                    key: 1,
                    name: s[a.direction],
                    size: 'sm',
                    class: I([
                      'agds-direction-link__icon',
                      { 'agds-direction-link__icon--hidden': a.loading },
                    ]),
                    'aria-hidden': 'true',
                  },
                  null,
                  8,
                  ['name', 'class'],
                ))
              : O('', !0),
            p('span', yb, [
              a.loading
                ? (c(),
                  h('span', _b, [
                    d[3] ||
                      (d[3] = p(
                        'span',
                        { class: 'agds-direction-link__spinner', 'aria-hidden': 'true' },
                        null,
                        -1,
                      )),
                    p('span', kb, M(a.loadingLabel), 1),
                  ]))
                : O('', !0),
            ]),
          ],
          42,
          bb,
        )
      )
    },
  }),
  xb = F(wb, [['__scopeId', 'data-v-14ff60bd']]),
  Sb = x({
    __name: 'AGDSField',
    props: {
      label: {},
      id: {},
      labelId: {},
      hint: {},
      invalid: { type: Boolean, default: !1 },
      message: {},
      required: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      secondaryLabel: {},
      maxWidth: {},
    },
    setup(e) {
      const t = { xs: '10ch', sm: '20ch', md: '30ch', lg: '40ch', xl: '60ch' },
        o = e,
        a = ge()?.uid ?? Math.random().toString(36).slice(2),
        l = y(() => o.id ?? `field-${a}`),
        n = y(() => `field-${a}-hint`),
        i = y(() => `field-${a}-message`),
        s = y(() => {
          const u = []
          return (
            o.message && o.invalid && u.push(i.value),
            o.hint && u.push(n.value),
            u.length ? u.join(' ') : void 0
          )
        }),
        r = y(() => ({
          id: l.value,
          'aria-required': !!o.required,
          'aria-invalid': !!o.invalid,
          'aria-describedby': s.value,
        })),
        d = y(() => (o.maxWidth ? t[o.maxWidth] : void 0))
      return (u, f) => (
        c(),
        $(
          za,
          { invalid: o.invalid },
          {
            default: w(() => [
              E(
                Ua,
                {
                  'html-for': l.value,
                  id: o.labelId,
                  required: o.required,
                  'hide-optional-label': o.hideOptionalLabel,
                  'secondary-label': o.secondaryLabel,
                },
                { default: w(() => [de(M(o.label), 1)]), _: 1 },
                8,
                ['html-for', 'id', 'required', 'hide-optional-label', 'secondary-label'],
              ),
              o.hint
                ? (c(),
                  $(
                    Ka,
                    { key: 0, id: n.value },
                    { default: w(() => [de(M(o.hint), 1)]), _: 1 },
                    8,
                    ['id'],
                  ))
                : O('', !0),
              o.message && o.invalid
                ? (c(),
                  $(
                    Za,
                    { key: 1, id: i.value },
                    { default: w(() => [de(M(o.message), 1)]), _: 1 },
                    8,
                    ['id'],
                  ))
                : O('', !0),
              A(u.$slots, 'default', ut(yt(r.value)), void 0, !0),
              d.value
                ? (c(),
                  h(
                    'div',
                    {
                      key: 2,
                      'aria-hidden': 'true',
                      class: 'agds-field__max-width-spacer',
                      style: xe({ maxWidth: d.value }),
                    },
                    null,
                    4,
                  ))
                : O('', !0),
            ]),
            _: 3,
          },
          8,
          ['invalid'],
        )
      )
    },
  }),
  ze = F(Sb, [['__scopeId', 'data-v-f470577e']])
function Xo(e, t = '', o) {
  const a = t.toLowerCase()
  return e.filter((l) =>
    l.value.toLowerCase().includes(a) || l.label.toLowerCase().includes(a)
      ? o
        ? !o.some((n) => n.value === l.value && n.label === l.label)
        : !0
      : !1,
  )
}
const Ab = x({
    __name: 'AGDSCombobox',
    props: Xe(
      {
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean, default: !1 },
        message: {},
        required: { type: Boolean, default: !1 },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        options: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean, default: !1 },
        block: { type: Boolean, default: !1 },
        maxWidth: {},
        clearable: { type: Boolean, default: !1 },
        emptyResultsMessage: { default: 'No options found' },
      },
      { modelValue: { default: null }, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = y({
          get: () => n.value?.value,
          set: (g) => {
            n.value = g != null ? (a.options.find((b) => b.value === g) ?? null) : null
          },
        }),
        s = ge()?.uid ?? Math.random().toString(36).slice(2),
        r = y(() => a.id ?? `agds-combobox-${s}`),
        d = C(''),
        u = y(() => Xo(a.options, d.value)),
        f = C(null)
      return (
        t({ focus: () => f.value?.querySelector('input')?.focus() }),
        (g, b) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: r.value,
              'label-id': e.labelId,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': e.secondaryLabel,
              'max-width': e.maxWidth,
            },
            {
              default: w(
                ({ id: m, 'aria-required': _, 'aria-invalid': k, 'aria-describedby': S }) => [
                  E(
                    v(Ea),
                    {
                      modelValue: i.value,
                      'onUpdate:modelValue': b[4] || (b[4] = (D) => (i.value = D)),
                      disabled: e.disabled,
                      name: e.name,
                      required: e.required,
                      'ignore-filter': !0,
                      class: I(['agds-combobox', { 'agds-combobox--block': e.block }]),
                    },
                    {
                      default: w(() => [
                        E(
                          v(Pa),
                          {
                            ref_key: 'containerRef',
                            ref: f,
                            class: I([
                              'agds-combobox__control',
                              { 'agds-combobox__control--invalid': e.invalid },
                            ]),
                          },
                          {
                            default: w(() => [
                              E(
                                v(Ra),
                                {
                                  id: m,
                                  modelValue: d.value,
                                  'onUpdate:modelValue': b[0] || (b[0] = (D) => (d.value = D)),
                                  'display-value': (D) =>
                                    e.options.find((B) => B.value === D)?.label ?? '',
                                  class: 'agds-combobox__input',
                                  placeholder: e.placeholder,
                                  'aria-required': _,
                                  'aria-invalid': k,
                                  'aria-describedby': S || void 0,
                                  onFocus: b[1] || (b[1] = (D) => l('focus', D)),
                                  onBlur: b[2] || (b[2] = (D) => l('blur', D)),
                                },
                                null,
                                8,
                                [
                                  'id',
                                  'modelValue',
                                  'display-value',
                                  'placeholder',
                                  'aria-required',
                                  'aria-invalid',
                                  'aria-describedby',
                                ],
                              ),
                              e.clearable && n.value != null
                                ? (c(),
                                  h(
                                    'button',
                                    {
                                      key: 0,
                                      type: 'button',
                                      class: 'agds-combobox__clear',
                                      'aria-label': 'Clear selection',
                                      tabindex: '-1',
                                      onMousedown:
                                        b[3] || (b[3] = Ce((D) => (n.value = null), ['prevent'])),
                                    },
                                    [
                                      ...(b[5] ||
                                        (b[5] = [
                                          p(
                                            'svg',
                                            {
                                              'aria-hidden': 'true',
                                              width: '14',
                                              height: '14',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              'stroke-width': '2.5',
                                              'stroke-linecap': 'round',
                                            },
                                            [
                                              p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                              p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                            ],
                                            -1,
                                          ),
                                        ])),
                                    ],
                                    32,
                                  ))
                                : O('', !0),
                              E(
                                v(Go),
                                { class: 'agds-combobox__trigger', disabled: e.disabled },
                                {
                                  default: w(() => [
                                    ...(b[6] ||
                                      (b[6] = [
                                        p(
                                          'svg',
                                          {
                                            'aria-hidden': 'true',
                                            width: '16',
                                            height: '16',
                                            viewBox: '0 0 24 24',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': '2',
                                            'stroke-linecap': 'round',
                                            'stroke-linejoin': 'round',
                                          },
                                          [p('polyline', { points: '6 9 12 15 18 9' })],
                                          -1,
                                        ),
                                      ])),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['disabled'],
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['class'],
                        ),
                        E(v(Wa), null, {
                          default: w(() => [
                            E(
                              v(Ta),
                              { class: 'agds-combobox__content', 'avoid-collisions': !1 },
                              {
                                default: w(() => [
                                  E(
                                    v(Ha),
                                    { class: 'agds-combobox__listbox' },
                                    {
                                      default: w(() => [
                                        E(
                                          v(jo),
                                          { class: 'agds-combobox__empty' },
                                          {
                                            default: w(() => [de(M(e.emptyResultsMessage), 1)]),
                                            _: 1,
                                          },
                                        ),
                                        (c(!0),
                                        h(
                                          ae,
                                          null,
                                          fe(
                                            u.value,
                                            (D) => (
                                              c(),
                                              $(
                                                v(Va),
                                                {
                                                  key: D.value,
                                                  value: D.value,
                                                  class: 'agds-combobox__option',
                                                },
                                                {
                                                  default: w(() => [
                                                    A(
                                                      g.$slots,
                                                      'item',
                                                      { option: D },
                                                      () => [de(M(D.label), 1)],
                                                      !0,
                                                    ),
                                                    E(
                                                      v(Na),
                                                      { class: 'agds-combobox__option-check' },
                                                      {
                                                        default: w(() => [
                                                          ...(b[7] ||
                                                            (b[7] = [
                                                              p(
                                                                'svg',
                                                                {
                                                                  'aria-hidden': 'true',
                                                                  width: '14',
                                                                  height: '14',
                                                                  viewBox: '0 0 24 24',
                                                                  fill: 'none',
                                                                  stroke: 'currentColor',
                                                                  'stroke-width': '2.5',
                                                                  'stroke-linecap': 'round',
                                                                  'stroke-linejoin': 'round',
                                                                },
                                                                [
                                                                  p('polyline', {
                                                                    points: '20 6 9 17 4 12',
                                                                  }),
                                                                ],
                                                                -1,
                                                              ),
                                                            ])),
                                                        ]),
                                                        _: 1,
                                                      },
                                                    ),
                                                  ]),
                                                  _: 2,
                                                },
                                                1032,
                                                ['value'],
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]),
                                      _: 3,
                                    },
                                  ),
                                ]),
                                _: 3,
                              },
                            ),
                          ]),
                          _: 3,
                        }),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'disabled', 'name', 'required', 'class'],
                  ),
                ],
              ),
              _: 3,
            },
            8,
            [
              'label',
              'id',
              'label-id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  Cb = F(Ab, [['__scopeId', 'data-v-da8ebd62']]),
  Db = { key: 0, class: 'agds-combobox-multi__tags', 'aria-label': 'Selected items' },
  Bb = { class: 'agds-combobox-multi__tag-label' },
  $b = ['aria-label', 'disabled', 'onMousedown'],
  Ib = { 'aria-live': 'polite', 'aria-atomic': 'true', class: 'sr-only' },
  Mb = x({
    __name: 'AGDSComboboxMulti',
    props: Xe(
      {
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean, default: !1 },
        message: {},
        required: { type: Boolean, default: !1 },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        options: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean, default: !1 },
        block: { type: Boolean, default: !0 },
        maxWidth: {},
        emptyResultsMessage: { default: 'No options found' },
      },
      { modelValue: { default: () => [] }, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = y({
          get: () => n.value.map((_) => _.value),
          set: (_) => {
            n.value = _.map((k) => a.options.find((S) => S.value === k)).filter((k) => k != null)
          },
        }),
        s = ge()?.uid ?? Math.random().toString(36).slice(2),
        r = y(() => a.id ?? `agds-combobox-multi-${s}`),
        d = C(''),
        u = y(() => Xo(a.options, d.value, n.value)),
        f = C('')
      let g = 0
      pe(
        n,
        (_, k) => {
          const S = k ?? []
          if (_.length > S.length) {
            const D = _.find((B) => !S.some((L) => L.value === B.value))
            f.value = `${D?.label ?? 'An item'} has been added.`
          } else if (_.length === 0 && g > 0) f.value = 'All items have been removed.'
          else if (_.length < S.length) {
            const D = S.find((B) => !_.some((L) => L.value === B.value))
            f.value = `${D?.label ?? 'An item'} has been removed.`
          }
          g = _.length
        },
        { deep: !0 },
      )
      function b(_) {
        n.value = n.value.filter((k) => k.value !== _.value)
      }
      const m = C(null)
      return (
        t({ focus: () => m.value?.querySelector('input')?.focus() }),
        (_, k) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: r.value,
              'label-id': e.labelId,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': e.secondaryLabel,
              'max-width': e.maxWidth,
            },
            {
              default: w(
                ({ id: S, 'aria-required': D, 'aria-invalid': B, 'aria-describedby': L }) => [
                  E(
                    v(Ea),
                    {
                      modelValue: i.value,
                      'onUpdate:modelValue': k[3] || (k[3] = (R) => (i.value = R)),
                      multiple: '',
                      disabled: e.disabled,
                      name: e.name,
                      required: e.required,
                      'ignore-filter': !0,
                      'reset-search-term-on-select': !0,
                      'reset-search-term-on-blur': !1,
                      class: I(['agds-combobox-multi', { 'agds-combobox-multi--block': e.block }]),
                    },
                    {
                      default: w(() => [
                        E(
                          v(Pa),
                          {
                            ref_key: 'containerRef',
                            ref: m,
                            class: I([
                              'agds-combobox-multi__control',
                              { 'agds-combobox-multi__control--invalid': e.invalid },
                            ]),
                          },
                          {
                            default: w(() => [
                              n.value.length
                                ? (c(),
                                  h('ul', Db, [
                                    (c(!0),
                                    h(
                                      ae,
                                      null,
                                      fe(
                                        n.value,
                                        (R) => (
                                          c(),
                                          h(
                                            'li',
                                            { key: R.value, class: 'agds-combobox-multi__tag' },
                                            [
                                              p('span', Bb, M(R.label), 1),
                                              p(
                                                'button',
                                                {
                                                  type: 'button',
                                                  class: 'agds-combobox-multi__tag-remove',
                                                  'aria-label': `Remove ${R.label}`,
                                                  tabindex: '-1',
                                                  disabled: e.disabled,
                                                  onMousedown: Ce((N) => b(R), ['prevent']),
                                                },
                                                [
                                                  ...(k[4] ||
                                                    (k[4] = [
                                                      p(
                                                        'svg',
                                                        {
                                                          'aria-hidden': 'true',
                                                          width: '10',
                                                          height: '10',
                                                          viewBox: '0 0 24 24',
                                                          fill: 'none',
                                                          stroke: 'currentColor',
                                                          'stroke-width': '3',
                                                          'stroke-linecap': 'round',
                                                        },
                                                        [
                                                          p('line', {
                                                            x1: '18',
                                                            y1: '6',
                                                            x2: '6',
                                                            y2: '18',
                                                          }),
                                                          p('line', {
                                                            x1: '6',
                                                            y1: '6',
                                                            x2: '18',
                                                            y2: '18',
                                                          }),
                                                        ],
                                                        -1,
                                                      ),
                                                    ])),
                                                ],
                                                40,
                                                $b,
                                              ),
                                            ],
                                          )
                                        ),
                                      ),
                                      128,
                                    )),
                                  ]))
                                : O('', !0),
                              E(
                                v(Ra),
                                {
                                  id: S,
                                  modelValue: d.value,
                                  'onUpdate:modelValue': k[0] || (k[0] = (R) => (d.value = R)),
                                  'display-value': () => '',
                                  class: 'agds-combobox-multi__input',
                                  placeholder: n.value.length === 0 ? e.placeholder : void 0,
                                  'aria-required': D,
                                  'aria-invalid': B,
                                  'aria-describedby': L || void 0,
                                  onFocus: k[1] || (k[1] = (R) => l('focus', R)),
                                  onBlur: k[2] || (k[2] = (R) => l('blur', R)),
                                },
                                null,
                                8,
                                [
                                  'id',
                                  'modelValue',
                                  'placeholder',
                                  'aria-required',
                                  'aria-invalid',
                                  'aria-describedby',
                                ],
                              ),
                              E(
                                v(Go),
                                { class: 'agds-combobox-multi__trigger', disabled: e.disabled },
                                {
                                  default: w(() => [
                                    ...(k[5] ||
                                      (k[5] = [
                                        p(
                                          'svg',
                                          {
                                            'aria-hidden': 'true',
                                            width: '16',
                                            height: '16',
                                            viewBox: '0 0 24 24',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': '2',
                                            'stroke-linecap': 'round',
                                            'stroke-linejoin': 'round',
                                          },
                                          [p('polyline', { points: '6 9 12 15 18 9' })],
                                          -1,
                                        ),
                                      ])),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['disabled'],
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['class'],
                        ),
                        E(v(Wa), null, {
                          default: w(() => [
                            E(
                              v(Ta),
                              { class: 'agds-combobox-multi__content', 'avoid-collisions': !1 },
                              {
                                default: w(() => [
                                  E(
                                    v(Ha),
                                    { class: 'agds-combobox-multi__listbox' },
                                    {
                                      default: w(() => [
                                        E(
                                          v(jo),
                                          { class: 'agds-combobox-multi__empty' },
                                          {
                                            default: w(() => [de(M(e.emptyResultsMessage), 1)]),
                                            _: 1,
                                          },
                                        ),
                                        (c(!0),
                                        h(
                                          ae,
                                          null,
                                          fe(
                                            u.value,
                                            (R) => (
                                              c(),
                                              $(
                                                v(Va),
                                                {
                                                  key: R.value,
                                                  value: R.value,
                                                  class: 'agds-combobox-multi__option',
                                                },
                                                {
                                                  default: w(() => [
                                                    A(
                                                      _.$slots,
                                                      'item',
                                                      { option: R },
                                                      () => [de(M(R.label), 1)],
                                                      !0,
                                                    ),
                                                    E(
                                                      v(Na),
                                                      {
                                                        class: 'agds-combobox-multi__option-check',
                                                      },
                                                      {
                                                        default: w(() => [
                                                          ...(k[6] ||
                                                            (k[6] = [
                                                              p(
                                                                'svg',
                                                                {
                                                                  'aria-hidden': 'true',
                                                                  width: '14',
                                                                  height: '14',
                                                                  viewBox: '0 0 24 24',
                                                                  fill: 'none',
                                                                  stroke: 'currentColor',
                                                                  'stroke-width': '2.5',
                                                                  'stroke-linecap': 'round',
                                                                  'stroke-linejoin': 'round',
                                                                },
                                                                [
                                                                  p('polyline', {
                                                                    points: '20 6 9 17 4 12',
                                                                  }),
                                                                ],
                                                                -1,
                                                              ),
                                                            ])),
                                                        ]),
                                                        _: 1,
                                                      },
                                                    ),
                                                  ]),
                                                  _: 2,
                                                },
                                                1032,
                                                ['value'],
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]),
                                      _: 3,
                                    },
                                  ),
                                ]),
                                _: 3,
                              },
                            ),
                          ]),
                          _: 3,
                        }),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'disabled', 'name', 'required', 'class'],
                  ),
                  p('div', Ib, M(f.value), 1),
                ],
              ),
              _: 3,
            },
            8,
            [
              'label',
              'id',
              'label-id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  Ob = F(Mb, [['__scopeId', 'data-v-1ba80f33']]),
  Lb = { key: 0, class: 'agds-combobox-async__spinner', 'aria-hidden': 'true' },
  Fb = { key: 2, class: 'agds-combobox-async__divider', 'aria-hidden': 'true' },
  qb = ['aria-label', 'disabled'],
  Eb = { key: 0, class: 'agds-combobox-async__status', role: 'status' },
  Pb = {
    key: 1,
    class: 'agds-combobox-async__status agds-combobox-async__status--error',
    role: 'alert',
  },
  Tb = { key: 0, class: 'agds-combobox-async__status', role: 'status' },
  Rb = { 'aria-live': 'polite', 'aria-atomic': 'true', class: 'sr-only' },
  Vb = x({
    __name: 'AGDSComboboxAsync',
    props: Xe(
      {
        fetchOptions: {},
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean, default: !1 },
        message: {},
        required: { type: Boolean, default: !1 },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean, default: !1 },
        loading: { type: Boolean },
        loadingLabel: { default: 'Loading' },
        emptyResultsMessage: { default: 'No results found' },
        showDropdownTrigger: { type: Boolean, default: !0 },
        clearable: { type: Boolean, default: !1 },
        debounce: { default: 300 },
        block: { type: Boolean, default: !1 },
        maxWidth: {},
      },
      { modelValue: {}, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = y({
          get: () => n.value?.value,
          set: (U) => {
            if (U == null) {
              n.value = null
              return
            }
            const H = u.value.find((G) => G.value === U)
            H && (n.value = H)
          },
        }),
        s = ge()?.uid ?? Math.random().toString(36).slice(2),
        r = y(() => a.id ?? `agds-combobox-async-${s}`),
        d = C(null),
        u = Dt([]),
        f = C(!1),
        g = C(!1),
        b = C(!1),
        m = C(!1),
        _ = C('')
      let k = null
      const S = {},
        D = y(() => g.value || !!a.loading),
        B = C(''),
        L = y(() => a.clearable && (n.value != null || B.value.length > 0))
      function R(U) {
        U || (f.value = !1)
      }
      function N(U) {
        const H = U
        if (!H) return ''
        const G = u.value.find((ne) => ne.value === H)
        return G ? G.label : n.value?.value === H ? (n.value.label ?? '') : ''
      }
      async function W(U) {
        const H = U.toLowerCase()
        if (S[H]) {
          ;((u.value = S[H]),
            (b.value = !1),
            (g.value = !1),
            (f.value = !0),
            (_.value =
              S[H].length === 0
                ? a.emptyResultsMessage
                : `${S[H].length} result${S[H].length === 1 ? '' : 's'} available`))
          return
        }
        try {
          const G = await a.fetchOptions(U)
          ;((S[H] = G),
            (u.value = G),
            (b.value = !1),
            (_.value =
              G.length === 0
                ? a.emptyResultsMessage
                : `${G.length} result${G.length === 1 ? '' : 's'} available`))
        } catch {
          ;((u.value = []), (b.value = !0), (_.value = ''))
        } finally {
          g.value = !1
        }
      }
      function q(U) {
        const H = U.target.value
        if (
          ((B.value = H),
          n.value != null && H !== n.value.label && (n.value = null),
          k && clearTimeout(k),
          !H.trim())
        ) {
          ;((u.value = []),
            (g.value = !1),
            (f.value = !1),
            (m.value = !1),
            (b.value = !1),
            (_.value = ''))
          return
        }
        ;((m.value = !0), (g.value = !0), (f.value = !0), (k = setTimeout(() => W(H), a.debounce)))
      }
      function P() {
        ;((n.value = null),
          (u.value = []),
          (f.value = !1),
          (m.value = !1),
          (g.value = !1),
          (b.value = !1),
          (_.value = 'Selection cleared'),
          (B.value = ''),
          j()?.querySelector('input')?.focus())
      }
      function j() {
        const U = d.value
        return U?.$el ?? U
      }
      function oe() {
        if (f.value) f.value = !1
        else if (u.value.length > 0 || g.value || b.value) f.value = !0
        else {
          const U = j()?.querySelector('input')
          U?.value && W(U.value)
        }
      }
      return (
        Te(() => {
          k && clearTimeout(k)
        }),
        t({ focus: () => j()?.querySelector('input')?.focus() }),
        (U, H) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: r.value,
              'label-id': e.labelId,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': e.secondaryLabel,
              'max-width': e.block ? void 0 : e.maxWidth,
            },
            {
              default: w(
                ({ id: G, 'aria-required': ne, 'aria-invalid': le, 'aria-describedby': ce }) => [
                  E(
                    v(Ea),
                    {
                      modelValue: i.value,
                      'onUpdate:modelValue': H[2] || (H[2] = (ie) => (i.value = ie)),
                      open: f.value,
                      disabled: e.disabled,
                      name: e.name,
                      required: e.required,
                      'ignore-filter': !0,
                      'open-on-focus': !1,
                      'open-on-click': !1,
                      class: I(['agds-combobox-async', { 'agds-combobox-async--block': e.block }]),
                      'onUpdate:open': R,
                    },
                    {
                      default: w(() => [
                        E(
                          v(Pa),
                          {
                            ref_key: 'containerRef',
                            ref: d,
                            class: I([
                              'agds-combobox-async__control',
                              { 'agds-combobox-async__control--invalid': e.invalid },
                            ]),
                          },
                          {
                            default: w(() => [
                              E(
                                v(Ra),
                                {
                                  id: G,
                                  'display-value': N,
                                  class: 'agds-combobox-async__input',
                                  placeholder: e.placeholder,
                                  'aria-required': ne,
                                  'aria-invalid': le,
                                  'aria-describedby': ce || void 0,
                                  'aria-busy': D.value || void 0,
                                  disabled: !!a.loading,
                                  onInput: q,
                                  onFocus: H[0] || (H[0] = (ie) => l('focus', ie)),
                                  onBlur: H[1] || (H[1] = (ie) => l('blur', ie)),
                                },
                                null,
                                8,
                                [
                                  'id',
                                  'placeholder',
                                  'aria-required',
                                  'aria-invalid',
                                  'aria-describedby',
                                  'aria-busy',
                                  'disabled',
                                ],
                              ),
                              D.value ? (c(), h('span', Lb)) : O('', !0),
                              L.value && !D.value
                                ? (c(),
                                  h(
                                    'button',
                                    {
                                      key: 1,
                                      type: 'button',
                                      class: 'agds-combobox-async__btn agds-combobox-async__clear',
                                      'aria-label': 'Clear selection',
                                      tabindex: '-1',
                                      onMousedown: Ce(P, ['prevent']),
                                    },
                                    [
                                      ...(H[3] ||
                                        (H[3] = [
                                          p(
                                            'svg',
                                            {
                                              'aria-hidden': 'true',
                                              width: '16',
                                              height: '16',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              'stroke-width': '2.5',
                                              'stroke-linecap': 'round',
                                            },
                                            [
                                              p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                              p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                            ],
                                            -1,
                                          ),
                                        ])),
                                    ],
                                    32,
                                  ))
                                : O('', !0),
                              L.value && e.showDropdownTrigger && !D.value
                                ? (c(), h('span', Fb))
                                : O('', !0),
                              e.showDropdownTrigger
                                ? (c(),
                                  h(
                                    'button',
                                    {
                                      key: 3,
                                      type: 'button',
                                      class: I([
                                        'agds-combobox-async__btn',
                                        { 'agds-combobox-async__btn--open': f.value },
                                      ]),
                                      'aria-label': f.value ? 'Close options' : 'Open options',
                                      tabindex: '-1',
                                      disabled: e.disabled,
                                      onMousedown: Ce(oe, ['prevent']),
                                    },
                                    [
                                      ...(H[4] ||
                                        (H[4] = [
                                          p(
                                            'svg',
                                            {
                                              'aria-hidden': 'true',
                                              width: '16',
                                              height: '16',
                                              viewBox: '0 0 24 24',
                                              fill: 'none',
                                              stroke: 'currentColor',
                                              'stroke-width': '2',
                                              'stroke-linecap': 'round',
                                              'stroke-linejoin': 'round',
                                            },
                                            [p('polyline', { points: '6 9 12 15 18 9' })],
                                            -1,
                                          ),
                                        ])),
                                    ],
                                    42,
                                    qb,
                                  ))
                                : O('', !0),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['class'],
                        ),
                        E(v(Wa), null, {
                          default: w(() => [
                            E(
                              v(Ta),
                              { class: 'agds-combobox-async__content', 'avoid-collisions': !1 },
                              {
                                default: w(() => [
                                  E(
                                    v(Ha),
                                    { class: 'agds-combobox-async__listbox' },
                                    {
                                      default: w(() => [
                                        g.value
                                          ? (c(), h('li', Eb, M(e.loadingLabel), 1))
                                          : b.value
                                            ? (c(), h('li', Pb, ' Something went wrong. '))
                                            : (c(),
                                              h(
                                                ae,
                                                { key: 2 },
                                                [
                                                  m.value && u.value.length === 0
                                                    ? (c(),
                                                      h('li', Tb, M(e.emptyResultsMessage), 1))
                                                    : O('', !0),
                                                  (c(!0),
                                                  h(
                                                    ae,
                                                    null,
                                                    fe(
                                                      u.value,
                                                      (ie) => (
                                                        c(),
                                                        $(
                                                          v(Va),
                                                          {
                                                            key: ie.value,
                                                            value: ie.value,
                                                            class: 'agds-combobox-async__option',
                                                          },
                                                          {
                                                            default: w(() => [
                                                              A(
                                                                U.$slots,
                                                                'option',
                                                                { option: ie },
                                                                () => [de(M(ie.label), 1)],
                                                                !0,
                                                              ),
                                                              E(
                                                                v(Na),
                                                                {
                                                                  class:
                                                                    'agds-combobox-async__option-check',
                                                                },
                                                                {
                                                                  default: w(() => [
                                                                    ...(H[5] ||
                                                                      (H[5] = [
                                                                        p(
                                                                          'svg',
                                                                          {
                                                                            'aria-hidden': 'true',
                                                                            width: '14',
                                                                            height: '14',
                                                                            viewBox: '0 0 24 24',
                                                                            fill: 'none',
                                                                            stroke: 'currentColor',
                                                                            'stroke-width': '2.5',
                                                                            'stroke-linecap':
                                                                              'round',
                                                                            'stroke-linejoin':
                                                                              'round',
                                                                          },
                                                                          [
                                                                            p('polyline', {
                                                                              points:
                                                                                '20 6 9 17 4 12',
                                                                            }),
                                                                          ],
                                                                          -1,
                                                                        ),
                                                                      ])),
                                                                  ]),
                                                                  _: 1,
                                                                },
                                                              ),
                                                            ]),
                                                            _: 2,
                                                          },
                                                          1032,
                                                          ['value'],
                                                        )
                                                      ),
                                                    ),
                                                    128,
                                                  )),
                                                ],
                                                64,
                                              )),
                                      ]),
                                      _: 3,
                                    },
                                  ),
                                ]),
                                _: 3,
                              },
                            ),
                          ]),
                          _: 3,
                        }),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'open', 'disabled', 'name', 'required', 'class'],
                  ),
                  p('div', Rb, M(_.value), 1),
                ],
              ),
              _: 3,
            },
            8,
            [
              'label',
              'id',
              'label-id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  ci = F(Vb, [['__scopeId', 'data-v-9ed5ef8c']]),
  Nb = { key: 0, class: 'agds-combobox-async-multi__tags', 'aria-label': 'Selected items' },
  Wb = { class: 'agds-combobox-async-multi__tag-label' },
  Hb = ['aria-label', 'disabled', 'onMousedown'],
  jb = [
    'id',
    'aria-expanded',
    'aria-controls',
    'aria-activedescendant',
    'aria-required',
    'aria-invalid',
    'aria-describedby',
    'placeholder',
    'disabled',
    'aria-busy',
    'aria-disabled',
  ],
  Gb = { key: 1, class: 'agds-combobox-async-multi__spinner', 'aria-hidden': 'true' },
  zb = ['id', 'aria-label'],
  Ub = { key: 0, class: 'agds-combobox-async-multi__loading', role: 'status' },
  Kb = { key: 1, class: 'agds-combobox-async-multi__empty', role: 'status' },
  Zb = ['id', 'aria-selected', 'onMousedown', 'onMousemove'],
  Yb = { 'aria-live': 'polite', 'aria-atomic': 'true', class: 'sr-only' },
  Xb = { 'aria-live': 'polite', 'aria-atomic': 'true', class: 'sr-only' },
  Qb = x({
    __name: 'AGDSComboboxAsyncMulti',
    props: Xe(
      {
        fetchOptions: {},
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean, default: !1 },
        message: {},
        required: { type: Boolean, default: !1 },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean, default: !1 },
        loading: { type: Boolean },
        loadingLabel: { default: 'Loading' },
        emptyResultsMessage: { default: 'No results found' },
        debounce: { default: 300 },
        block: { type: Boolean, default: !0 },
        maxWidth: {},
      },
      { modelValue: { default: () => [] }, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = ge()?.uid ?? Math.random().toString(36).slice(2),
        s = y(() => a.id ?? `agds-combobox-async-multi-${i}`),
        r = y(() => `${s.value}-listbox`),
        d = C(null),
        u = C(''),
        f = Dt([]),
        g = C(!1),
        b = C(!1),
        m = C(-1),
        _ = C(!1),
        k = C(''),
        S = C('')
      let D = null
      const B = y(() => b.value || !!a.loading),
        L = y(() => (m.value >= 0 ? `${r.value}-option-${m.value}` : void 0))
      let R = 0
      pe(
        n,
        (G, ne) => {
          const le = ne ?? []
          if (G.length > le.length) {
            const ce = G.find((ie) => !le.some((be) => be.value === ie.value))
            S.value = `${ce?.label ?? 'An item'} has been added.`
          } else if (G.length === 0 && R > 0) S.value = 'All items have been removed.'
          else if (G.length < le.length) {
            const ce = le.find((ie) => !G.some((be) => be.value === ie.value))
            S.value = `${ce?.label ?? 'An item'} has been removed.`
          }
          R = G.length
        },
        { deep: !0 },
      )
      async function N(G) {
        ;((b.value = !0), (_.value = !0))
        try {
          const ne = await a.fetchOptions(G),
            le = Xo(ne, G, n.value)
          ;((f.value = le),
            (g.value = !0),
            (m.value = -1),
            (k.value =
              le.length === 0
                ? a.emptyResultsMessage
                : `${le.length} result${le.length === 1 ? '' : 's'} available`))
        } catch {
          ;((f.value = []), (k.value = ''))
        } finally {
          b.value = !1
        }
      }
      function W() {
        const G = u.value
        if ((D && clearTimeout(D), !G.trim())) {
          ;((f.value = []), (g.value = !1), (_.value = !1), (k.value = ''))
          return
        }
        D = setTimeout(() => N(G), a.debounce)
      }
      function q(G) {
        ;(n.value.some((ne) => ne.value === G.value) || (n.value = [...n.value, G]),
          (u.value = ''),
          (f.value = f.value.filter((ne) => ne.value !== G.value)),
          (g.value = f.value.length > 0),
          (m.value = -1),
          d.value?.focus())
      }
      function P(G) {
        n.value = n.value.filter((ne) => ne.value !== G.value)
      }
      function j() {
        n.value.length > 0 && u.value === '' && (n.value = n.value.slice(0, -1))
      }
      function oe(G) {
        switch (G.key) {
          case 'ArrowDown':
            ;(G.preventDefault(),
              !g.value && f.value.length > 0 && (g.value = !0),
              f.value.length > 0 && (m.value = (m.value + 1) % f.value.length))
            break
          case 'ArrowUp':
            ;(G.preventDefault(),
              !g.value && f.value.length > 0 && (g.value = !0),
              f.value.length > 0 && (m.value = m.value <= 0 ? f.value.length - 1 : m.value - 1))
            break
          case 'Enter':
            ;(G.preventDefault(),
              g.value && m.value >= 0
                ? q(f.value[m.value])
                : g.value && f.value.length > 0 && q(f.value[0]))
            break
          case 'Escape':
            g.value && ((g.value = !1), (m.value = -1))
            break
          case 'Tab':
            g.value = !1
            break
          case 'Backspace':
            j()
            break
        }
      }
      function U(G) {
        l('focus', G)
      }
      function H(G) {
        setTimeout(() => {
          ;((g.value = !1), (u.value = ''), l('blur', G))
        }, 150)
      }
      return (
        Te(() => {
          D && clearTimeout(D)
        }),
        t({ focus: () => d.value?.focus() }),
        (G, ne) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: s.value,
              'label-id': e.labelId,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': e.secondaryLabel,
              'max-width': e.block ? void 0 : e.maxWidth,
            },
            {
              default: w(
                ({ id: le, 'aria-required': ce, 'aria-invalid': ie, 'aria-describedby': be }) => [
                  p(
                    'div',
                    {
                      class: I([
                        'agds-combobox-async-multi',
                        { 'agds-combobox-async-multi--block': e.block },
                      ]),
                    },
                    [
                      p(
                        'div',
                        {
                          class: I([
                            'agds-combobox-async-multi__control',
                            {
                              'agds-combobox-async-multi__control--invalid': e.invalid,
                              'agds-combobox-async-multi__control--disabled': e.disabled,
                              'agds-combobox-async-multi__control--open': g.value,
                            },
                          ]),
                        },
                        [
                          n.value.length
                            ? (c(),
                              h('ul', Nb, [
                                (c(!0),
                                h(
                                  ae,
                                  null,
                                  fe(
                                    n.value,
                                    (ye) => (
                                      c(),
                                      h(
                                        'li',
                                        { key: ye.value, class: 'agds-combobox-async-multi__tag' },
                                        [
                                          p('span', Wb, M(ye.label), 1),
                                          p(
                                            'button',
                                            {
                                              type: 'button',
                                              class: 'agds-combobox-async-multi__tag-remove',
                                              'aria-label': `Remove ${ye.label}`,
                                              tabindex: '-1',
                                              disabled: e.disabled,
                                              onMousedown: Ce((Ae) => P(ye), ['prevent']),
                                            },
                                            [
                                              ...(ne[1] ||
                                                (ne[1] = [
                                                  p(
                                                    'svg',
                                                    {
                                                      'aria-hidden': 'true',
                                                      width: '10',
                                                      height: '10',
                                                      viewBox: '0 0 24 24',
                                                      fill: 'none',
                                                      stroke: 'currentColor',
                                                      'stroke-width': '3',
                                                      'stroke-linecap': 'round',
                                                    },
                                                    [
                                                      p('line', {
                                                        x1: '18',
                                                        y1: '6',
                                                        x2: '6',
                                                        y2: '18',
                                                      }),
                                                      p('line', {
                                                        x1: '6',
                                                        y1: '6',
                                                        x2: '18',
                                                        y2: '18',
                                                      }),
                                                    ],
                                                    -1,
                                                  ),
                                                ])),
                                            ],
                                            40,
                                            Hb,
                                          ),
                                        ],
                                      )
                                    ),
                                  ),
                                  128,
                                )),
                              ]))
                            : O('', !0),
                          el(
                            p(
                              'input',
                              {
                                id: le,
                                ref_key: 'inputRef',
                                ref: d,
                                'onUpdate:modelValue': ne[0] || (ne[0] = (ye) => (u.value = ye)),
                                role: 'combobox',
                                type: 'text',
                                autocomplete: 'off',
                                autocorrect: 'off',
                                autocapitalize: 'off',
                                spellcheck: 'false',
                                'aria-expanded': g.value,
                                'aria-autocomplete': 'list',
                                'aria-controls': r.value,
                                'aria-activedescendant': L.value,
                                'aria-required': ce,
                                'aria-invalid': ie,
                                'aria-describedby': be || void 0,
                                placeholder: n.value.length === 0 ? e.placeholder : void 0,
                                disabled: e.disabled || B.value,
                                'aria-busy': B.value || void 0,
                                'aria-disabled': e.disabled || void 0,
                                class: 'agds-combobox-async-multi__input',
                                onInput: W,
                                onKeydown: oe,
                                onFocus: U,
                                onBlur: H,
                              },
                              null,
                              40,
                              jb,
                            ),
                            [[Wi, u.value]],
                          ),
                          B.value ? (c(), h('span', Gb)) : O('', !0),
                        ],
                        2,
                      ),
                      el(
                        p(
                          'ul',
                          {
                            id: r.value,
                            role: 'listbox',
                            'aria-label': e.label,
                            'aria-multiselectable': !0,
                            class: 'agds-combobox-async-multi__listbox',
                          },
                          [
                            b.value
                              ? (c(), h('li', Ub, M(e.loadingLabel), 1))
                              : _.value && f.value.length === 0
                                ? (c(), h('li', Kb, M(e.emptyResultsMessage), 1))
                                : (c(!0),
                                  h(
                                    ae,
                                    { key: 2 },
                                    fe(
                                      f.value,
                                      (ye, Ae) => (
                                        c(),
                                        h(
                                          'li',
                                          {
                                            id: `${r.value}-option-${Ae}`,
                                            key: ye.value,
                                            role: 'option',
                                            'aria-selected': n.value.some(
                                              (Se) => Se.value === ye.value,
                                            ),
                                            class: I([
                                              'agds-combobox-async-multi__option',
                                              {
                                                'agds-combobox-async-multi__option--highlighted':
                                                  m.value === Ae,
                                              },
                                            ]),
                                            onMousedown: Ce((Se) => q(ye), ['prevent']),
                                            onMousemove: (Se) => (m.value = Ae),
                                          },
                                          [
                                            A(
                                              G.$slots,
                                              'option',
                                              { option: ye },
                                              () => [de(M(ye.label), 1)],
                                              !0,
                                            ),
                                          ],
                                          42,
                                          Zb,
                                        )
                                      ),
                                    ),
                                    128,
                                  )),
                          ],
                          8,
                          zb,
                        ),
                        [[Hi, g.value]],
                      ),
                      p('div', Yb, M(k.value), 1),
                      p('div', Xb, M(S.value), 1),
                    ],
                    2,
                  ),
                ],
              ),
              _: 3,
            },
            8,
            [
              'label',
              'id',
              'label-id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  Jb = F(Qb, [['__scopeId', 'data-v-af8f2302']]),
  ey = x({
    __name: 'AGDSAutocomplete',
    props: Xe(
      {
        fetchOptions: {},
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean },
        message: {},
        required: { type: Boolean },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean },
        loading: { type: Boolean },
        loadingLabel: { default: 'Loading' },
        emptyResultsMessage: { default: 'No results found' },
        debounce: { default: 300 },
        block: { type: Boolean },
        maxWidth: {},
      },
      { modelValue: {}, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = C(null)
      return (
        t({ focus: () => i.value?.focus() }),
        (s, r) => (
          c(),
          $(
            ci,
            te({ ref_key: 'comboboxRef', ref: i }, a, {
              modelValue: n.value,
              'onUpdate:modelValue': r[0] || (r[0] = (d) => (n.value = d)),
              clearable: !0,
              'show-dropdown-trigger': !1,
              onFocus: r[1] || (r[1] = (d) => l('focus', d)),
              onBlur: r[2] || (r[2] = (d) => l('blur', d)),
            }),
            aa({ _: 2 }, [
              s.$slots.option
                ? { name: 'option', fn: w((d) => [A(s.$slots, 'option', ut(yt(d)))]), key: '0' }
                : void 0,
            ]),
            1040,
            ['modelValue'],
          )
        )
      )
    },
  }),
  ty = { class: 'agds-calendar__months' },
  ay = { class: 'agds-calendar__caption' },
  oy = ['disabled', 'aria-label'],
  ly = { key: 1, class: 'agds-calendar__nav-placeholder', 'aria-hidden': 'true' },
  ny = { class: 'agds-calendar__heading', 'aria-live': 'polite', 'aria-atomic': 'true' },
  iy = { key: 0, class: 'agds-calendar__selects' },
  sy = { class: 'agds-calendar__select-wrap' },
  ry = ['for'],
  dy = ['id', 'value'],
  uy = ['value'],
  cy = { class: 'agds-calendar__select-wrap' },
  fy = ['for'],
  py = ['id', 'value'],
  gy = ['value'],
  vy = { key: 1, class: 'agds-calendar__month-label' },
  my = { key: 1, class: 'agds-calendar__month-label' },
  hy = ['disabled', 'aria-label'],
  by = { key: 3, class: 'agds-calendar__nav-placeholder', 'aria-hidden': 'true' },
  yy = ['aria-label'],
  _y = ['abbr'],
  ky = ['onClick', 'onKeydown', 'onMouseenter', 'onFocus'],
  wy = { class: 'agds-calendar__day-inner', 'aria-hidden': 'true' },
  xy = x({
    __name: 'AGDSDatePickerCalendar',
    props: {
      mode: { default: 'single' },
      selectedDate: { default: null },
      selectedFrom: { default: null },
      selectedTo: { default: null },
      inputMode: { default: void 0 },
      minDate: {},
      maxDate: {},
      defaultMonth: {},
      numberOfMonths: { default: 1 },
      yearRange: {},
    },
    emits: ['select'],
    setup(e, { expose: t, emit: o }) {
      function a(z) {
        return new Date(z.getFullYear(), z.getMonth(), z.getDate())
      }
      function l(z, ee) {
        return (
          z.getFullYear() === ee.getFullYear() &&
          z.getMonth() === ee.getMonth() &&
          z.getDate() === ee.getDate()
        )
      }
      function n(z, ee) {
        const T = new Date(z)
        return (T.setDate(T.getDate() + ee), T)
      }
      function i(z, ee) {
        return new Date(z.getFullYear(), z.getMonth() + ee, 1)
      }
      function s(z, ee) {
        const T = new Date(z, ee, 1).getDay(),
          J = T === 0 ? 6 : T - 1,
          V = []
        for (let K = J; K > 0; K--) V.push(new Date(z, ee, 1 - K))
        const Y = new Date(z, ee + 1, 0).getDate()
        for (let K = 1; K <= Y; K++) V.push(new Date(z, ee, K))
        for (; V.length < 42; ) {
          const K = V[V.length - 1]
          V.push(new Date(K.getFullYear(), K.getMonth(), K.getDate() + 1))
        }
        return V
      }
      function r(z) {
        return `${z.getFullYear()}-${String(z.getMonth() + 1).padStart(2, '0')}-${String(z.getDate()).padStart(2, '0')}`
      }
      const d = e,
        u = o,
        f = a(new Date())
      function g() {
        let z
        d.defaultMonth
          ? (z = d.defaultMonth)
          : d.mode === 'single' && d.selectedDate
            ? (z = d.selectedDate)
            : d.mode === 'range'
              ? d.inputMode === 'to' && d.selectedTo
                ? (z = d.selectedTo)
                : d.selectedFrom
                  ? (z = d.selectedFrom)
                  : (z = f)
              : (z = f)
        let ee = z.getFullYear(),
          T = z.getMonth()
        if (d.mode === 'range' && d.numberOfMonths === 2 && d.inputMode === 'to' && d.selectedTo) {
          const J = i(new Date(ee, T, 1), -1)
          ;((ee = J.getFullYear()), (T = J.getMonth()))
        }
        return { year: ee, month: T }
      }
      const b = g(),
        m = C(b.year),
        _ = C(b.month),
        k = C(null),
        S = C(null),
        D = C(null),
        B = y(() => {
          const z = [{ year: m.value, month: _.value }]
          if (d.numberOfMonths === 2) {
            const ee = i(new Date(m.value, _.value, 1), 1)
            z.push({ year: ee.getFullYear(), month: ee.getMonth() })
          }
          return z
        }),
        L = new Date().getFullYear()
      function R() {
        const z = d.yearRange?.from ?? L - 10,
          ee = d.yearRange?.to ?? L + 10,
          T = []
        for (let J = z; J <= ee; J++) T.push(J)
        return (T.includes(m.value) || (T.push(m.value), T.sort((J, V) => J - V)), T)
      }
      const N = [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        W = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        q = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      function P(z) {
        const ee = a(z)
        return !!((d.minDate && ee < a(d.minDate)) || (d.maxDate && ee > a(d.maxDate)))
      }
      function j(z, ee) {
        const T = a(z),
          J = l(T, f),
          V = z.getMonth() !== B.value[ee].month,
          Y = P(z)
        let K = !1,
          se = !1,
          Ve = !1,
          Ne = !1
        if (d.mode === 'single') K = !!(d.selectedDate && l(T, d.selectedDate))
        else {
          const He = d.selectedFrom ? a(d.selectedFrom) : null,
            X = d.selectedTo ? a(d.selectedTo) : null,
            Q = k.value ? a(k.value) : null
          if (((se = !!(He && l(T, He))), (Ve = !!(X && l(T, X))), (K = se || Ve), He && X))
            Ne = T > He && T < X
          else if (Q) {
            if (d.inputMode === 'from' && X) {
              const re = Q < X ? Q : X,
                me = Q < X ? X : Q
              Ne = T > re && T < me
            } else if (d.inputMode === 'to' && He) {
              const re = He < Q ? He : Q,
                me = He < Q ? Q : He
              Ne = T > re && T < me
            }
          }
        }
        const Ue = !!(S.value && l(T, S.value))
        return {
          date: T,
          key: r(T),
          isToday: J,
          isOtherMonth: V,
          disabled: Y,
          isSelected: K,
          isRangeStart: se,
          isRangeEnd: Ve,
          isInRange: Ne,
          isFocused: Ue,
          tabindex: Ue ? 0 : -1,
          ariaLabel: oe(T, K, Ne, J),
        }
      }
      function oe(z, ee, T, J) {
        const V = []
        ;(ee && V.push('Selected.'), T && V.push('Within range.'), J && V.push('Today.'))
        const Y = z.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        return (V.push(Y), V.join(' '))
      }
      function U() {
        const z = i(new Date(m.value, _.value, 1), -1)
        ;((m.value = z.getFullYear()), (_.value = z.getMonth()))
      }
      function H() {
        const z = i(new Date(m.value, _.value, 1), 1)
        ;((m.value = z.getFullYear()), (_.value = z.getMonth()))
      }
      function G(z) {
        m.value = parseInt(z.target.value)
      }
      function ne(z) {
        _.value = parseInt(z.target.value)
      }
      function le(z) {
        P(z) || u('select', z)
      }
      function ce(z) {
        const ee = r(z)
        D.value?.querySelector(`[data-date="${ee}"]`)?.focus()
      }
      function ie(z, ee) {
        let T = null
        switch (z.key) {
          case 'ArrowLeft':
            T = n(ee, -1)
            break
          case 'ArrowRight':
            T = n(ee, 1)
            break
          case 'ArrowUp':
            T = n(ee, -7)
            break
          case 'ArrowDown':
            T = n(ee, 7)
            break
          case 'PageUp':
            T = i(ee, z.shiftKey ? -12 : -1)
            break
          case 'PageDown':
            T = i(ee, z.shiftKey ? 12 : 1)
            break
          case 'Home': {
            const J = ee.getDay(),
              V = J === 0 ? -6 : 1 - J
            T = n(ee, V)
            break
          }
          case 'End': {
            const J = ee.getDay(),
              V = J === 0 ? 0 : 7 - J
            T = n(ee, V)
            break
          }
          case 'Enter':
          case ' ':
            ;(z.preventDefault(), le(ee))
            return
          default:
            return
        }
        if (T) {
          ;(z.preventDefault(), (S.value = T))
          const J = B.value[0],
            V = B.value[B.value.length - 1]
          ;(T.getFullYear() < J.year || (T.getFullYear() === J.year && T.getMonth() < J.month)
            ? U()
            : (T.getFullYear() > V.year ||
                (T.getFullYear() === V.year && T.getMonth() > V.month)) &&
              H(),
            he(() => ce(T)))
        }
      }
      function be() {
        he(() => {
          let z
          ;(d.mode === 'single'
            ? (z = d.selectedDate ?? f)
            : (z = (d.inputMode === 'to' ? d.selectedTo : d.selectedFrom) ?? f),
            (S.value = z),
            ce(z))
        })
      }
      ;(we(be), t({ focusInitialDay: be }))
      function ye(z, ee) {
        const T = s(z, ee),
          J = []
        for (let V = 0; V < 6; V++) J.push(T.slice(V * 7, V * 7 + 7))
        return J
      }
      const Ae = y(() => (d.minDate ? new Date(m.value, _.value, 0) >= a(d.minDate) : !0)),
        Se = y(() => {
          if (!d.maxDate) return !0
          const z = B.value[B.value.length - 1]
          return new Date(z.year, z.month + 1, 1) <= a(d.maxDate)
        })
      return (z, ee) => (
        c(),
        h(
          'div',
          {
            ref_key: 'calendarRef',
            ref: D,
            class: I(['agds-calendar', { 'agds-calendar--range': e.mode === 'range' }]),
          },
          [
            p('div', ty, [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  B.value,
                  (T, J) => (
                    c(),
                    h('div', { key: `${T.year}-${T.month}`, class: 'agds-calendar__month' }, [
                      p('div', ay, [
                        J === 0
                          ? (c(),
                            h(
                              'button',
                              {
                                key: 0,
                                type: 'button',
                                class: 'agds-calendar__nav-btn agds-calendar__nav-btn--prev',
                                disabled: !Ae.value,
                                'aria-label': `Previous month, ${N[(T.month - 1 + 12) % 12]}`,
                                onClick: U,
                              },
                              [
                                ...(ee[1] ||
                                  (ee[1] = [
                                    p(
                                      'svg',
                                      {
                                        'aria-hidden': 'true',
                                        focusable: 'false',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2.5',
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                      },
                                      [p('polyline', { points: '15 18 9 12 15 6' })],
                                      -1,
                                    ),
                                  ])),
                              ],
                              8,
                              oy,
                            ))
                          : (c(), h('span', ly)),
                        p('div', ny, [
                          e.yearRange || J === 0
                            ? (c(),
                              h(
                                ae,
                                { key: 0 },
                                [
                                  J === 0
                                    ? (c(),
                                      h('div', iy, [
                                        p('div', sy, [
                                          p(
                                            'label',
                                            {
                                              for: `agds-cal-month-${T.year}-${T.month}`,
                                              class: 'sr-only',
                                            },
                                            'Month',
                                            8,
                                            ry,
                                          ),
                                          p(
                                            'select',
                                            {
                                              id: `agds-cal-month-${T.year}-${T.month}`,
                                              class: 'agds-calendar__select',
                                              value: T.month,
                                              onChange: ne,
                                            },
                                            [
                                              (c(),
                                              h(
                                                ae,
                                                null,
                                                fe(N, (V, Y) =>
                                                  p('option', { key: Y, value: Y }, M(V), 9, uy),
                                                ),
                                                64,
                                              )),
                                            ],
                                            40,
                                            dy,
                                          ),
                                          ee[2] ||
                                            (ee[2] = p(
                                              'svg',
                                              {
                                                class: 'agds-calendar__select-chevron',
                                                'aria-hidden': 'true',
                                                focusable: 'false',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                'stroke-width': '2.5',
                                                'stroke-linecap': 'round',
                                                'stroke-linejoin': 'round',
                                              },
                                              [p('polyline', { points: '6 9 12 15 18 9' })],
                                              -1,
                                            )),
                                        ]),
                                        p('div', cy, [
                                          p(
                                            'label',
                                            {
                                              for: `agds-cal-year-${T.year}-${T.month}`,
                                              class: 'sr-only',
                                            },
                                            'Year',
                                            8,
                                            fy,
                                          ),
                                          p(
                                            'select',
                                            {
                                              id: `agds-cal-year-${T.year}-${T.month}`,
                                              class: 'agds-calendar__select',
                                              value: T.year,
                                              onChange: G,
                                            },
                                            [
                                              (c(!0),
                                              h(
                                                ae,
                                                null,
                                                fe(
                                                  R(),
                                                  (V) => (
                                                    c(),
                                                    h('option', { key: V, value: V }, M(V), 9, gy)
                                                  ),
                                                ),
                                                128,
                                              )),
                                            ],
                                            40,
                                            py,
                                          ),
                                          ee[3] ||
                                            (ee[3] = p(
                                              'svg',
                                              {
                                                class: 'agds-calendar__select-chevron',
                                                'aria-hidden': 'true',
                                                focusable: 'false',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                'stroke-width': '2.5',
                                                'stroke-linecap': 'round',
                                                'stroke-linejoin': 'round',
                                              },
                                              [p('polyline', { points: '6 9 12 15 18 9' })],
                                              -1,
                                            )),
                                        ]),
                                      ]))
                                    : (c(), h('span', vy, M(N[T.month]) + ' ' + M(T.year), 1)),
                                ],
                                64,
                              ))
                            : (c(), h('span', my, M(N[T.month]) + ' ' + M(T.year), 1)),
                        ]),
                        J === B.value.length - 1
                          ? (c(),
                            h(
                              'button',
                              {
                                key: 2,
                                type: 'button',
                                class: 'agds-calendar__nav-btn agds-calendar__nav-btn--next',
                                disabled: !Se.value,
                                'aria-label': `Next month, ${N[(T.month + 1) % 12]}`,
                                onClick: H,
                              },
                              [
                                ...(ee[4] ||
                                  (ee[4] = [
                                    p(
                                      'svg',
                                      {
                                        'aria-hidden': 'true',
                                        focusable: 'false',
                                        viewBox: '0 0 24 24',
                                        fill: 'none',
                                        stroke: 'currentColor',
                                        'stroke-width': '2.5',
                                        'stroke-linecap': 'round',
                                        'stroke-linejoin': 'round',
                                      },
                                      [p('polyline', { points: '9 18 15 12 9 6' })],
                                      -1,
                                    ),
                                  ])),
                              ],
                              8,
                              hy,
                            ))
                          : (c(), h('span', by)),
                      ]),
                      p(
                        'table',
                        {
                          class: 'agds-calendar__grid',
                          role: 'grid',
                          'aria-label': `${N[T.month]} ${T.year}`,
                        },
                        [
                          p('thead', null, [
                            p('tr', null, [
                              (c(),
                              h(
                                ae,
                                null,
                                fe(W, (V, Y) =>
                                  p(
                                    'th',
                                    {
                                      key: V,
                                      class: 'agds-calendar__weekday',
                                      scope: 'col',
                                      abbr: q[Y],
                                    },
                                    M(V),
                                    9,
                                    _y,
                                  ),
                                ),
                                64,
                              )),
                            ]),
                          ]),
                          p('tbody', null, [
                            (c(!0),
                            h(
                              ae,
                              null,
                              fe(
                                ye(T.year, T.month),
                                (V, Y) => (
                                  c(),
                                  h('tr', { key: Y, role: 'row' }, [
                                    (c(!0),
                                    h(
                                      ae,
                                      null,
                                      fe(
                                        V,
                                        (K) => (
                                          c(),
                                          h(
                                            'td',
                                            te(
                                              {
                                                key: r(K),
                                                role: 'gridcell',
                                                class: 'agds-calendar__cell',
                                              },
                                              { ref_for: !0 },
                                              (() => {
                                                const se = j(K, J)
                                                return {
                                                  'data-date': se.key,
                                                  tabindex: se.tabindex,
                                                  'aria-label': se.ariaLabel,
                                                  'aria-selected': se.isSelected ? 'true' : void 0,
                                                  'aria-current': se.isToday ? 'date' : void 0,
                                                  'aria-disabled': se.disabled ? 'true' : void 0,
                                                  class: [
                                                    'agds-calendar__cell',
                                                    se.isOtherMonth &&
                                                      'agds-calendar__cell--other-month',
                                                    se.isToday && 'agds-calendar__cell--today',
                                                    se.isSelected &&
                                                      'agds-calendar__cell--selected',
                                                    se.isRangeStart &&
                                                      'agds-calendar__cell--range-start',
                                                    se.isRangeEnd &&
                                                      'agds-calendar__cell--range-end',
                                                    se.isInRange && 'agds-calendar__cell--in-range',
                                                    se.disabled && 'agds-calendar__cell--disabled',
                                                    se.isFocused && 'agds-calendar__cell--focused',
                                                  ]
                                                    .filter(Boolean)
                                                    .join(' '),
                                                }
                                              })(),
                                              {
                                                onClick: (se) => le(K),
                                                onKeydown: (se) => ie(se, K),
                                                onMouseenter: (se) => (k.value = K),
                                                onMouseleave:
                                                  ee[0] || (ee[0] = (se) => (k.value = null)),
                                                onFocus: (se) => (S.value = K),
                                              },
                                            ),
                                            [p('span', wy, M(K.getDate()), 1)],
                                            16,
                                            ky,
                                          )
                                        ),
                                      ),
                                      128,
                                    )),
                                  ])
                                ),
                              ),
                              128,
                            )),
                          ]),
                        ],
                        8,
                        yy,
                      ),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ],
          2,
        )
      )
    },
  }),
  Wl = F(xy, [['__scopeId', 'data-v-a54dc765']]),
  Sy = { key: 0, class: 'agds-datepicker' },
  Ay = ['for'],
  Cy = { key: 0, class: 'agds-datepicker__optional' },
  Dy = { class: 'agds-datepicker__secondary-label', 'aria-hidden': 'true' },
  By = ['id'],
  $y = ['id'],
  Iy = [
    'id',
    'value',
    'disabled',
    'required',
    'aria-invalid',
    'aria-required',
    'aria-describedby',
    'placeholder',
  ],
  My = ['disabled', 'aria-expanded', 'aria-label'],
  Oy = { key: 0, class: 'agds-datepicker__optional' },
  Ly = ['id'],
  Fy = ['id'],
  qy = { class: 'agds-datepicker__range-row' },
  Ey = ['for'],
  Py = { class: 'agds-datepicker__secondary-label', 'aria-hidden': 'true' },
  Ty = [
    'id',
    'value',
    'disabled',
    'required',
    'aria-invalid',
    'aria-required',
    'aria-describedby',
    'placeholder',
  ],
  Ry = ['disabled', 'aria-expanded', 'aria-label'],
  Vy = ['for'],
  Ny = { class: 'agds-datepicker__secondary-label', 'aria-hidden': 'true' },
  Wy = [
    'id',
    'value',
    'disabled',
    'required',
    'aria-invalid',
    'aria-required',
    'aria-describedby',
    'placeholder',
  ],
  Hy = ['disabled', 'aria-expanded', 'aria-label'],
  jy = x({
    __name: 'AGDSDatePicker',
    props: {
      range: { type: Boolean, default: !1 },
      modelValue: { default: null },
      label: { default: void 0 },
      fromLabel: { default: 'Start date' },
      toLabel: { default: 'End date' },
      id: { default: void 0 },
      hint: { default: void 0 },
      message: { default: void 0 },
      invalid: { type: Boolean, default: !1 },
      fromInvalid: { type: Boolean, default: !1 },
      toInvalid: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      minDate: { default: void 0 },
      maxDate: { default: void 0 },
      yearRange: { default: void 0 },
      dateFormat: { default: 'dd/MM/yyyy' },
    },
    emits: ['update:modelValue', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      function a(X) {
        return String(X).padStart(2, '0')
      }
      function l(X, Q) {
        const re = a(X.getDate()),
          me = a(X.getMonth() + 1),
          Ke = String(X.getFullYear())
        return Q.replace('dd', re).replace('MM', me).replace('yyyy', Ke)
      }
      function n(X, Q) {
        if (!X.trim()) return null
        const re = Q.includes('/') ? '/' : Q.includes('-') ? '-' : '/',
          me = X.split(re)
        if (me.length === 3) {
          const Ke = Q.split(re),
            it = {}
          Ke.forEach((Ot, Ci) => {
            it[Ot] = parseInt(me[Ci] ?? '', 10)
          })
          const wt = it.dd ?? it.d,
            xt = it.MM ?? it.M,
            ra = it.yyyy
          if (ra && String(ra).length === 4 && xt >= 1 && xt <= 12 && wt >= 1 && wt <= 31) {
            const Ot = new Date(ra, xt - 1, wt)
            if (Ot.getFullYear() === ra && Ot.getMonth() === xt - 1 && Ot.getDate() === wt)
              return Ot
          }
        }
        if (/^\d{4}-\d{2}-\d{2}/.test(X)) {
          const Ke = new Date(X)
          if (!isNaN(Ke.getTime())) return Ke
        }
        return null
      }
      function i(X) {
        return X.replace('dd', 'DD').replace('MM', 'MM').replace('yyyy', 'YYYY')
      }
      function s(X, Q) {
        return `(e.g. ${l(X, Q)})`
      }
      function r(X, Q) {
        return new Date(X.getFullYear(), X.getMonth() - Q, X.getDate())
      }
      function d(X, Q, re, me, Ke) {
        if (X === 'from')
          return Q && re && Q > re
            ? r(re, Ke === 2 ? 1 : 0)
            : Q || (re ? r(re, Ke === 2 ? 1 : 0) : void 0)
        if (X === 'to') return Q && re && re < Q ? Q : re ? r(re, Ke === 2 ? 1 : 0) : Q || void 0
        if (me) {
          const it = new Date(me.from, 0, 1),
            wt = new Date(me.to, 11, 31),
            xt = Date.now()
          return Math.abs(xt - it.getTime()) <= Math.abs(xt - wt.getTime()) ? it : wt
        }
      }
      const u = e,
        f = o,
        g = Ql(),
        b = y(() => u.id ?? `agds-datepicker-${g}`),
        m = y(() => `agds-datepicker-${g}-from`),
        _ = y(() => `agds-datepicker-${g}-to`),
        k = y(() => `agds-datepicker-${g}-hint`),
        S = y(() => `agds-datepicker-${g}-message`),
        D = y(() => (!u.required && !u.hideOptionalLabel ? ' (optional)' : '')),
        B = y(() => (u.range ? null : (u.modelValue ?? null))),
        L = y(() =>
          u.range ? (u.modelValue ?? { from: null, to: null }) : { from: null, to: null },
        )
      function R(X) {
        return X ? l(X, u.dateFormat) : ''
      }
      const N = C(R(B.value)),
        W = C(R(L.value.from)),
        q = C(R(L.value.to))
      ;(pe(B, (X) => {
        N.value = R(X)
      }),
        pe(
          () => L.value.from,
          (X) => {
            W.value = R(X)
          },
        ),
        pe(
          () => L.value.to,
          (X) => {
            q.value = R(X)
          },
        ))
      const P = C(!1),
        j = C(void 0),
        oe = C(null),
        U = C(null),
        H = C(null),
        G = C(null)
      function ne(X) {
        ;((j.value = X), (P.value = !0))
      }
      function le() {
        P.value = !1
      }
      function ce() {
        ;(le(),
          he(() => {
            j.value === 'to'
              ? H.value?.focus()
              : j.value === 'from'
                ? U.value?.focus()
                : oe.value?.focus()
          }))
      }
      function ie() {
        P.value ? ce() : ne(void 0)
      }
      function be() {
        P.value && j.value === 'from' ? ce() : ne('from')
      }
      function ye() {
        P.value && j.value === 'to' ? ce() : ne('to')
      }
      pe(P, (X) => {
        X && he(() => G.value?.focusInitialDay())
      })
      function Ae(X) {
        P.value && X.key === 'Escape' && (X.preventDefault(), X.stopPropagation(), ce())
      }
      ;(we(() => window.addEventListener('keydown', Ae, { capture: !0 })),
        Jt(() => window.removeEventListener('keydown', Ae, { capture: !0 })))
      const Se = C(typeof window < 'u' ? window.innerWidth : 0)
      function z() {
        Se.value = window.innerWidth
      }
      ;(we(() => window.addEventListener('resize', z)),
        Jt(() => window.removeEventListener('resize', z)))
      const ee = y(() => (u.range && Se.value >= 768 ? 2 : 1)),
        T = y(() =>
          u.range
            ? d(j.value, L.value.from, L.value.to, u.yearRange, ee.value)
            : (B.value ?? void 0),
        )
      function J(X) {
        if (!u.range) {
          ;(f('update:modelValue', X), ce())
          return
        }
        const Q = L.value
        let re = Q.from,
          me = Q.to
        if (
          (j.value === 'from'
            ? ((re = X), me && re > me && (me = null))
            : j.value === 'to' && ((me = X), re && me < re && ([re, me] = [me, re])),
          f('update:modelValue', { from: re, to: me }),
          j.value === 'from' && !me)
        ) {
          ;((j.value = 'to'), he(() => G.value?.focusInitialDay()))
          return
        }
        if (j.value === 'to' && !re) {
          ;((j.value = 'from'), he(() => G.value?.focusInitialDay()))
          return
        }
        re && me && ce()
      }
      function V(X) {
        N.value = X.target.value
      }
      function Y(X) {
        const Q = n(N.value, u.dateFormat)
        ;(f('update:modelValue', Q), f('blur', X))
      }
      function K(X) {
        W.value = X.target.value
      }
      function se(X) {
        let Q = n(W.value, u.dateFormat),
          re = L.value.to
        ;(Q && re && Q > re && (re = null),
          f('update:modelValue', { from: Q, to: re }),
          f('blur', X))
      }
      function Ve(X) {
        q.value = X.target.value
      }
      function Ne(X) {
        const Q = n(q.value, u.dateFormat)
        let re = L.value.from,
          me = Q
        ;(re && me && me < re && ([re, me] = [me, re]),
          f('update:modelValue', { from: re, to: me }),
          f('blur', X))
      }
      function Ue(X) {
        const Q = []
        return (X && u.message && Q.push(S.value), u.hint && Q.push(k.value), Q.join(' ') || void 0)
      }
      function He(X, Q) {
        const re = X ? `${X} date` : 'date'
        if (!Q) return `Choose ${re}`
        const me = n(Q, u.dateFormat)
        if (!me) return `Choose ${re}`
        const Ke = me.toLocaleDateString('en-AU', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
        return `Change ${re}, ${Ke}`
      }
      return (
        t({
          focus: () => {
            u.range ? U.value?.focus() : oe.value?.focus()
          },
        }),
        (X, Q) =>
          u.range
            ? (c(),
              h(
                'fieldset',
                {
                  key: 1,
                  class: I([
                    'agds-datepicker agds-datepicker--range',
                    { 'agds-datepicker--invalid': e.fromInvalid || e.toInvalid },
                  ]),
                },
                [
                  p(
                    'legend',
                    { class: I(['agds-datepicker__legend', { 'sr-only': !e.label }]) },
                    [
                      de(M(e.label ?? 'Date range'), 1),
                      D.value ? (c(), h('span', Oy, M(D.value), 1)) : O('', !0),
                    ],
                    2,
                  ),
                  e.hint
                    ? (c(),
                      h(
                        'span',
                        { key: 0, id: k.value, class: 'agds-datepicker__hint' },
                        M(e.hint),
                        9,
                        Ly,
                      ))
                    : O('', !0),
                  (e.fromInvalid || e.toInvalid) && e.message
                    ? (c(),
                      h(
                        'span',
                        { key: 1, id: S.value, class: 'agds-datepicker__message', role: 'alert' },
                        M(e.message),
                        9,
                        Fy,
                      ))
                    : O('', !0),
                  E(
                    v(_l),
                    { open: P.value, 'onUpdate:open': Q[8] || (Q[8] = (re) => (P.value = re)) },
                    {
                      default: w(() => [
                        E(
                          v(kl),
                          { 'as-child': '' },
                          {
                            default: w(() => [
                              p('div', qy, [
                                p(
                                  'div',
                                  {
                                    class: I([
                                      'agds-datepicker__field',
                                      { 'agds-datepicker__field--invalid': e.fromInvalid },
                                    ]),
                                  },
                                  [
                                    p(
                                      'label',
                                      {
                                        for: m.value,
                                        class:
                                          'agds-datepicker__label agds-datepicker__label--range',
                                      },
                                      M(e.fromLabel),
                                      9,
                                      Ey,
                                    ),
                                    p('span', Py, M(s(e.minDate ?? new Date(), e.dateFormat)), 1),
                                    p(
                                      'div',
                                      {
                                        class: I([
                                          'agds-datepicker__input-row',
                                          {
                                            'agds-datepicker__input-row--open':
                                              P.value && j.value === 'from',
                                            'agds-datepicker__input-row--highlighted':
                                              P.value && j.value === 'from',
                                          },
                                        ]),
                                      },
                                      [
                                        p(
                                          'input',
                                          {
                                            id: m.value,
                                            type: 'text',
                                            class: I([
                                              'agds-datepicker__input',
                                              { 'agds-datepicker__input--invalid': e.fromInvalid },
                                            ]),
                                            value: W.value,
                                            disabled: e.disabled,
                                            required: e.required || void 0,
                                            'aria-invalid': e.fromInvalid || void 0,
                                            'aria-required': e.required || void 0,
                                            'aria-describedby': Ue(e.fromInvalid),
                                            placeholder: i(e.dateFormat),
                                            autocomplete: 'off',
                                            onChange: K,
                                            onBlur: se,
                                            onFocus: Q[4] || (Q[4] = (re) => f('focus', re)),
                                          },
                                          null,
                                          42,
                                          Ty,
                                        ),
                                        p(
                                          'button',
                                          {
                                            ref_key: 'fromTriggerRef',
                                            ref: U,
                                            type: 'button',
                                            class: 'agds-datepicker__trigger',
                                            disabled: e.disabled,
                                            'aria-expanded': P.value && j.value === 'from',
                                            'aria-label': He('start', W.value),
                                            'aria-haspopup': 'dialog',
                                            onClick: be,
                                          },
                                          [
                                            ...(Q[10] ||
                                              (Q[10] = [
                                                p(
                                                  'svg',
                                                  {
                                                    'aria-hidden': 'true',
                                                    focusable: 'false',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'none',
                                                    stroke: 'currentColor',
                                                    'stroke-width': '1.75',
                                                    'stroke-linecap': 'round',
                                                    'stroke-linejoin': 'round',
                                                  },
                                                  [
                                                    p('rect', {
                                                      x: '3',
                                                      y: '4',
                                                      width: '18',
                                                      height: '18',
                                                      rx: '2',
                                                      ry: '2',
                                                    }),
                                                    p('line', {
                                                      x1: '16',
                                                      y1: '2',
                                                      x2: '16',
                                                      y2: '6',
                                                    }),
                                                    p('line', {
                                                      x1: '8',
                                                      y1: '2',
                                                      x2: '8',
                                                      y2: '6',
                                                    }),
                                                    p('line', {
                                                      x1: '3',
                                                      y1: '10',
                                                      x2: '21',
                                                      y2: '10',
                                                    }),
                                                  ],
                                                  -1,
                                                ),
                                              ])),
                                          ],
                                          8,
                                          Ry,
                                        ),
                                      ],
                                      2,
                                    ),
                                  ],
                                  2,
                                ),
                                p(
                                  'div',
                                  {
                                    class: I([
                                      'agds-datepicker__field',
                                      { 'agds-datepicker__field--invalid': e.toInvalid },
                                    ]),
                                  },
                                  [
                                    p(
                                      'label',
                                      {
                                        for: _.value,
                                        class:
                                          'agds-datepicker__label agds-datepicker__label--range',
                                      },
                                      M(e.toLabel),
                                      9,
                                      Vy,
                                    ),
                                    p('span', Ny, M(s(e.maxDate ?? new Date(), e.dateFormat)), 1),
                                    p(
                                      'div',
                                      {
                                        class: I([
                                          'agds-datepicker__input-row',
                                          {
                                            'agds-datepicker__input-row--open':
                                              P.value && j.value === 'to',
                                            'agds-datepicker__input-row--highlighted':
                                              P.value && j.value === 'to',
                                          },
                                        ]),
                                      },
                                      [
                                        p(
                                          'input',
                                          {
                                            id: _.value,
                                            type: 'text',
                                            class: I([
                                              'agds-datepicker__input',
                                              { 'agds-datepicker__input--invalid': e.toInvalid },
                                            ]),
                                            value: q.value,
                                            disabled: e.disabled,
                                            required: e.required || void 0,
                                            'aria-invalid': e.toInvalid || void 0,
                                            'aria-required': e.required || void 0,
                                            'aria-describedby': Ue(e.toInvalid),
                                            placeholder: i(e.dateFormat),
                                            autocomplete: 'off',
                                            onChange: Ve,
                                            onBlur: Ne,
                                            onFocus: Q[5] || (Q[5] = (re) => f('focus', re)),
                                          },
                                          null,
                                          42,
                                          Wy,
                                        ),
                                        p(
                                          'button',
                                          {
                                            ref_key: 'toTriggerRef',
                                            ref: H,
                                            type: 'button',
                                            class: 'agds-datepicker__trigger',
                                            disabled: e.disabled,
                                            'aria-expanded': P.value && j.value === 'to',
                                            'aria-label': He('end', q.value),
                                            'aria-haspopup': 'dialog',
                                            onClick: ye,
                                          },
                                          [
                                            ...(Q[11] ||
                                              (Q[11] = [
                                                p(
                                                  'svg',
                                                  {
                                                    'aria-hidden': 'true',
                                                    focusable: 'false',
                                                    viewBox: '0 0 24 24',
                                                    fill: 'none',
                                                    stroke: 'currentColor',
                                                    'stroke-width': '1.75',
                                                    'stroke-linecap': 'round',
                                                    'stroke-linejoin': 'round',
                                                  },
                                                  [
                                                    p('rect', {
                                                      x: '3',
                                                      y: '4',
                                                      width: '18',
                                                      height: '18',
                                                      rx: '2',
                                                      ry: '2',
                                                    }),
                                                    p('line', {
                                                      x1: '16',
                                                      y1: '2',
                                                      x2: '16',
                                                      y2: '6',
                                                    }),
                                                    p('line', {
                                                      x1: '8',
                                                      y1: '2',
                                                      x2: '8',
                                                      y2: '6',
                                                    }),
                                                    p('line', {
                                                      x1: '3',
                                                      y1: '10',
                                                      x2: '21',
                                                      y2: '10',
                                                    }),
                                                  ],
                                                  -1,
                                                ),
                                              ])),
                                          ],
                                          8,
                                          Hy,
                                        ),
                                      ],
                                      2,
                                    ),
                                  ],
                                  2,
                                ),
                              ]),
                            ]),
                            _: 1,
                          },
                        ),
                        E(v(xl), null, {
                          default: w(() => [
                            E(
                              v(wl),
                              {
                                class: 'agds-datepicker__popover',
                                side: 'bottom',
                                align: 'start',
                                'side-offset': 4,
                                'trap-focus': !1,
                                'disable-outside-pointer-events': !1,
                                role: 'dialog',
                                'aria-label': 'Choose date range',
                                'aria-modal': 'true',
                                onOpenAutoFocus: Q[6] || (Q[6] = Ce(() => {}, ['prevent'])),
                                onEscapeKeyDown: Q[7] || (Q[7] = Ce(() => {}, ['prevent'])),
                              },
                              {
                                default: w(() => [
                                  E(
                                    Wl,
                                    {
                                      ref_key: 'calendarRef',
                                      ref: G,
                                      mode: 'range',
                                      'selected-from': L.value.from,
                                      'selected-to': L.value.to,
                                      'input-mode': j.value,
                                      'min-date': e.minDate,
                                      'max-date': e.maxDate,
                                      'default-month': T.value,
                                      'number-of-months': ee.value,
                                      'year-range': e.yearRange,
                                      onSelect: J,
                                    },
                                    null,
                                    8,
                                    [
                                      'selected-from',
                                      'selected-to',
                                      'input-mode',
                                      'min-date',
                                      'max-date',
                                      'default-month',
                                      'number-of-months',
                                      'year-range',
                                    ],
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 1,
                    },
                    8,
                    ['open'],
                  ),
                ],
                2,
              ))
            : (c(),
              h('div', Sy, [
                p(
                  'div',
                  {
                    class: I([
                      'agds-datepicker__field',
                      { 'agds-datepicker__field--invalid': e.invalid },
                    ]),
                  },
                  [
                    p(
                      'label',
                      { for: b.value, class: 'agds-datepicker__label' },
                      [
                        de(M(e.label), 1),
                        D.value ? (c(), h('span', Cy, M(D.value), 1)) : O('', !0),
                      ],
                      8,
                      Ay,
                    ),
                    p('span', Dy, M(s(e.minDate ?? e.maxDate ?? new Date(), e.dateFormat)), 1),
                    e.hint
                      ? (c(),
                        h(
                          'span',
                          { key: 0, id: k.value, class: 'agds-datepicker__hint' },
                          M(e.hint),
                          9,
                          By,
                        ))
                      : O('', !0),
                    e.invalid && e.message
                      ? (c(),
                        h(
                          'span',
                          { key: 1, id: S.value, class: 'agds-datepicker__message', role: 'alert' },
                          M(e.message),
                          9,
                          $y,
                        ))
                      : O('', !0),
                    E(
                      v(_l),
                      { open: P.value, 'onUpdate:open': Q[3] || (Q[3] = (re) => (P.value = re)) },
                      {
                        default: w(() => [
                          E(
                            v(kl),
                            { 'as-child': '' },
                            {
                              default: w(() => [
                                p(
                                  'div',
                                  {
                                    class: I([
                                      'agds-datepicker__input-row',
                                      { 'agds-datepicker__input-row--open': P.value },
                                    ]),
                                  },
                                  [
                                    p(
                                      'input',
                                      te(
                                        {
                                          id: b.value,
                                          type: 'text',
                                          class: [
                                            'agds-datepicker__input',
                                            { 'agds-datepicker__input--invalid': e.invalid },
                                          ],
                                          value: N.value,
                                          disabled: e.disabled,
                                          required: e.required || void 0,
                                          'aria-invalid': e.invalid || void 0,
                                          'aria-required': e.required || void 0,
                                          'aria-describedby': Ue(e.invalid),
                                          placeholder: i(e.dateFormat),
                                          autocomplete: 'off',
                                        },
                                        X.$attrs,
                                        {
                                          onChange: V,
                                          onBlur: Y,
                                          onFocus: Q[0] || (Q[0] = (re) => f('focus', re)),
                                        },
                                      ),
                                      null,
                                      16,
                                      Iy,
                                    ),
                                    p(
                                      'button',
                                      {
                                        ref_key: 'singleTriggerRef',
                                        ref: oe,
                                        type: 'button',
                                        class: 'agds-datepicker__trigger',
                                        disabled: e.disabled,
                                        'aria-expanded': P.value,
                                        'aria-label': He(void 0, N.value),
                                        'aria-haspopup': 'dialog',
                                        onClick: ie,
                                      },
                                      [
                                        ...(Q[9] ||
                                          (Q[9] = [
                                            p(
                                              'svg',
                                              {
                                                'aria-hidden': 'true',
                                                focusable: 'false',
                                                viewBox: '0 0 24 24',
                                                fill: 'none',
                                                stroke: 'currentColor',
                                                'stroke-width': '1.75',
                                                'stroke-linecap': 'round',
                                                'stroke-linejoin': 'round',
                                              },
                                              [
                                                p('rect', {
                                                  x: '3',
                                                  y: '4',
                                                  width: '18',
                                                  height: '18',
                                                  rx: '2',
                                                  ry: '2',
                                                }),
                                                p('line', { x1: '16', y1: '2', x2: '16', y2: '6' }),
                                                p('line', { x1: '8', y1: '2', x2: '8', y2: '6' }),
                                                p('line', {
                                                  x1: '3',
                                                  y1: '10',
                                                  x2: '21',
                                                  y2: '10',
                                                }),
                                              ],
                                              -1,
                                            ),
                                          ])),
                                      ],
                                      8,
                                      My,
                                    ),
                                  ],
                                  2,
                                ),
                              ]),
                              _: 1,
                            },
                          ),
                          E(v(xl), null, {
                            default: w(() => [
                              E(
                                v(wl),
                                {
                                  class: 'agds-datepicker__popover',
                                  side: 'bottom',
                                  align: 'start',
                                  'side-offset': 4,
                                  'trap-focus': !1,
                                  'disable-outside-pointer-events': !1,
                                  role: 'dialog',
                                  'aria-label': e.label
                                    ? `Choose ${e.label.toLowerCase()}`
                                    : 'Choose date',
                                  'aria-modal': 'true',
                                  onOpenAutoFocus: Q[1] || (Q[1] = Ce(() => {}, ['prevent'])),
                                  onEscapeKeyDown: Q[2] || (Q[2] = Ce(() => {}, ['prevent'])),
                                },
                                {
                                  default: w(() => [
                                    E(
                                      Wl,
                                      {
                                        ref_key: 'calendarRef',
                                        ref: G,
                                        mode: 'single',
                                        'selected-date': B.value,
                                        'min-date': e.minDate,
                                        'max-date': e.maxDate,
                                        'default-month': T.value,
                                        'number-of-months': 1,
                                        'year-range': e.yearRange,
                                        onSelect: J,
                                      },
                                      null,
                                      8,
                                      [
                                        'selected-date',
                                        'min-date',
                                        'max-date',
                                        'default-month',
                                        'year-range',
                                      ],
                                    ),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['aria-label'],
                              ),
                            ]),
                            _: 1,
                          }),
                        ]),
                        _: 1,
                      },
                      8,
                      ['open'],
                    ),
                  ],
                  2,
                ),
              ]))
      )
    },
  }),
  Gy = F(jy, [['__scopeId', 'data-v-fc8706dd']])
function s2() {
  return function (e) {
    const t = zy(e)
    if (!t) return
    const o = document.getElementById(t) ?? document.getElementsByName(t)[0]
    o && (Uy(t, o), typeof e != 'string' && e.preventDefault())
  }
}
function zy(e) {
  if (typeof e == 'string') return e
  const t = e.target
  if (t instanceof HTMLAnchorElement) return t.hash ? t.hash.substring(1) : void 0
}
function Uy(e, t) {
  ;(t.tagName.toLowerCase() === 'div' ? t.querySelector('input')?.focus() : t.focus(),
    (document.querySelector(`label[for="${e}"]`)?.parentElement ?? t).scrollIntoView({
      block: 'nearest',
    }))
}
const Ky = ['id', 'aria-describedby'],
  Zy = { class: 'agds-fieldset__legend' },
  Yy = ['id'],
  Xy = { class: 'agds-fieldset__content' },
  Qy = x({
    __name: 'AGDSFieldset',
    props: { legend: {}, hint: {}, id: {} },
    setup(e) {
      const t = e,
        o = ge()?.uid ?? Math.random().toString(36).slice(2),
        a = y(() => t.id ?? `fieldset-${o}`),
        l = y(() => `fieldset-${o}-hint`)
      return (n, i) => (
        c(),
        h(
          'fieldset',
          { id: a.value, 'aria-describedby': e.hint ? l.value : void 0, class: 'agds-fieldset' },
          [
            p('legend', Zy, M(e.legend), 1),
            e.hint
              ? (c(),
                h('span', { key: 0, id: l.value, class: 'agds-fieldset__hint' }, M(e.hint), 9, Yy))
              : O('', !0),
            p('div', Xy, [A(n.$slots, 'default', {}, void 0, !0)]),
          ],
          8,
          Ky,
        )
      )
    },
  }),
  Jy = F(Qy, [['__scopeId', 'data-v-481ea791']]),
  e_ = { class: 'agds-grouped-fields' },
  t_ = { class: 'agds-grouped-fields__row', 'data-grouped-fields': '' },
  a_ = x({
    __name: 'AGDSGroupedFields',
    props: {
      legend: {},
      field1Invalid: { type: Boolean, default: !1 },
      field2Invalid: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      hint: {},
      id: {},
      message: {},
      visuallyHideLegend: { type: Boolean, default: !1 },
    },
    setup(e) {
      const t = e,
        o = ge()?.uid ?? Math.random().toString(36).slice(2),
        a = y(() => `grouped-fields-${o}-hint`),
        l = y(() => `grouped-fields-${o}-message`),
        n = y(() => t.field1Invalid || t.field2Invalid)
      function i(d) {
        const u = []
        return (
          d && t.message && u.push(l.value),
          t.hint && u.push(a.value),
          u.length > 0 ? u.join(' ') : void 0
        )
      }
      const s = y(() => ({
          'aria-describedby': i(t.field1Invalid),
          'aria-invalid': t.field1Invalid,
        })),
        r = y(() => ({ 'aria-describedby': i(t.field2Invalid), 'aria-invalid': t.field2Invalid }))
      return (d, u) => (
        c(),
        $(
          za,
          { invalid: n.value },
          {
            default: w(() => [
              p('fieldset', e_, [
                E(
                  Ua,
                  {
                    as: 'legend',
                    class: I({ 'agds-grouped-fields__legend--hidden': e.visuallyHideLegend }),
                    'hide-optional-label': e.hideOptionalLabel,
                    required: !1,
                  },
                  { default: w(() => [de(M(e.legend), 1)]), _: 1 },
                  8,
                  ['class', 'hide-optional-label'],
                ),
                p(
                  'div',
                  {
                    class: I([
                      'agds-grouped-fields__stack',
                      { 'agds-grouped-fields__stack--spaced': !e.visuallyHideLegend },
                    ]),
                  },
                  [
                    e.hint
                      ? (c(),
                        $(
                          Ka,
                          { key: 0, id: a.value },
                          { default: w(() => [de(M(e.hint), 1)]), _: 1 },
                          8,
                          ['id'],
                        ))
                      : O('', !0),
                    e.message && n.value
                      ? (c(),
                        $(
                          Za,
                          { key: 1, id: l.value },
                          { default: w(() => [de(M(e.message), 1)]), _: 1 },
                          8,
                          ['id'],
                        ))
                      : O('', !0),
                    p('div', t_, [
                      A(
                        d.$slots,
                        'default',
                        { field1Props: s.value, field2Props: r.value },
                        void 0,
                        !0,
                      ),
                    ]),
                  ],
                  2,
                ),
              ]),
            ]),
            _: 3,
          },
          8,
          ['invalid'],
        )
      )
    },
  }),
  o_ = F(a_, [['__scopeId', 'data-v-a8f21ded']]),
  r2 = 'data-grouped-fields',
  l_ = ['for'],
  n_ = { key: 0, class: 'agds-file-input__optional' },
  i_ = ['id'],
  s_ = ['id'],
  r_ = ['accept', 'capture', 'disabled', 'multiple', 'name'],
  d_ = x({
    __name: 'AGDSFileInput',
    props: {
      label: {},
      id: {},
      accept: {},
      capture: {},
      disabled: { type: Boolean, default: !1 },
      autoFocus: { type: Boolean, default: !1 },
      multiple: { type: Boolean, default: !1 },
      name: {},
      hint: {},
      invalid: { type: Boolean, default: !1 },
      message: {},
      required: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      buttonSize: { default: 'sm' },
    },
    emits: ['change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = {
          'image/jpeg': { extensions: ['.jpg', '.jpeg'], label: 'JPEG' },
          'image/png': { extensions: ['.png'], label: 'PNG' },
          'image/gif': { extensions: ['.gif'], label: 'GIF' },
          'image/webp': { extensions: ['.webp'], label: 'WebP' },
          'image/svg+xml': { extensions: ['.svg'], label: 'SVG' },
          'application/pdf': { extensions: ['.pdf'], label: 'PDF' },
          'application/msword': { extensions: ['.doc'], label: 'DOC' },
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
            extensions: ['.docx'],
            label: 'DOCX',
          },
          'application/vnd.ms-excel': { extensions: ['.xls'], label: 'XLS' },
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
            extensions: ['.xlsx'],
            label: 'XLSX',
          },
          'text/csv': { extensions: ['.csv'], label: 'CSV' },
          'text/plain': { extensions: ['.txt'], label: 'TXT' },
          'application/zip': { extensions: ['.zip'], label: 'ZIP' },
          'video/mp4': { extensions: ['.mp4'], label: 'MP4' },
          'audio/mpeg': { extensions: ['.mp3'], label: 'MP3' },
        },
        l = e,
        n = o,
        i = ge()?.uid ?? Math.random().toString(36).slice(2),
        s = y(() => l.id ?? `agds-file-input-${i}`),
        r = y(() => `${s.value}-hint`),
        d = y(() => `${s.value}-message`),
        u = C([]),
        f = y(() => u.value.length > 0)
      function g(oe) {
        const U = oe.target
        ;(U.files && (u.value = Array.from(U.files).map((H) => H.name)), n('change', oe))
      }
      const b = y(() => {
          if (l.accept) return Array.isArray(l.accept) ? l.accept.join(',') : l.accept
        }),
        m = y(() => {
          if (!l.accept) return
          if (typeof l.accept == 'string') return l.accept
          const oe = new Set()
          for (const U of l.accept) {
            const H = a[U]
            H ? oe.add(H.label ?? H.extensions.join(', ')) : oe.add(U)
          }
          return [...oe].join(', ')
        }),
        _ = y(() => {
          if (l.hint) return l.hint
          if (m.value) return `Files accepted: ${m.value}`
        }),
        k = y(() => (l.multiple ? 'files' : 'file'))
      function S(oe) {
        return u.value.length === 0
          ? `No ${k.value} selected`
          : u.value.length === 1
            ? `${u.value[0]}${oe ? '' : ' selected'}`
            : `${u.value.length} files selected`
      }
      const D = y(() => S(!0)),
        B = y(() => S(!1)),
        L = y(() => `Select ${k.value}`),
        R = y(() => {
          if (!(l.required || l.hideOptionalLabel)) return '(optional)'
        }),
        N = y(() =>
          [
            L.value,
            l.label,
            R.value,
            l.required ? 'required' : void 0,
            l.invalid ? 'invalid' : void 0,
            B.value,
          ]
            .filter(Boolean)
            .join(', '),
        ),
        W = y(() => {
          const oe = []
          return (
            _.value && oe.push(r.value),
            l.message && oe.push(d.value),
            oe.length ? oe.join(' ') : void 0
          )
        }),
        q = C(null),
        P = C(null)
      ;(t({ focus: () => P.value?.focus() }),
        we(() => {
          l.autoFocus && P.value?.focus()
        }))
      function j() {
        q.value?.click()
      }
      return (oe, U) => (
        c(),
        $(En, null, {
          default: w(() => [
            p(
              'label',
              { for: s.value, class: 'agds-file-input__label' },
              [de(M(l.label) + ' ', 1), R.value ? (c(), h('span', n_, M(R.value), 1)) : O('', !0)],
              8,
              l_,
            ),
            _.value
              ? (c(),
                h(
                  'span',
                  { key: 0, id: r.value, class: 'agds-file-input__hint' },
                  M(_.value),
                  9,
                  i_,
                ))
              : O('', !0),
            E(
              Ut,
              { 'flex-direction': 'column', 'align-items': 'flex-start', gap: 1 },
              {
                default: w(() => [
                  E(
                    Mt,
                    {
                      ref_key: 'visibleButtonRef',
                      ref: P,
                      id: s.value,
                      variant: 'secondary',
                      size: l.buttonSize,
                      disabled: l.disabled,
                      'aria-label': N.value,
                      'aria-describedby': W.value,
                      'aria-invalid': l.invalid || void 0,
                      type: 'button',
                      onClick: j,
                      onFocus: U[0] || (U[0] = (H) => n('focus', H)),
                      onBlur: U[1] || (U[1] = (H) => n('blur', H)),
                    },
                    { default: w(() => [de(M(L.value), 1)]), _: 1 },
                    8,
                    ['id', 'size', 'disabled', 'aria-label', 'aria-describedby', 'aria-invalid'],
                  ),
                  p(
                    'span',
                    {
                      class: I([
                        'agds-file-input__file-name',
                        { 'agds-file-input__file-name--populated': f.value },
                      ]),
                      'aria-hidden': 'true',
                    },
                    M(D.value),
                    3,
                  ),
                ]),
                _: 1,
              },
            ),
            l.message
              ? (c(),
                h(
                  'span',
                  {
                    key: 1,
                    id: d.value,
                    class: I([
                      'agds-file-input__message',
                      { 'agds-file-input__message--invalid': l.invalid },
                    ]),
                    role: 'alert',
                  },
                  M(l.message),
                  11,
                  s_,
                ))
              : O('', !0),
            p(
              'input',
              {
                ref_key: 'hiddenInputRef',
                ref: q,
                type: 'file',
                accept: b.value,
                capture: l.capture,
                disabled: l.disabled,
                multiple: l.multiple,
                name: l.name,
                'aria-hidden': 'true',
                tabindex: '-1',
                class: 'agds-file-input__input',
                onChange: g,
              },
              null,
              40,
              r_,
            ),
          ]),
          _: 1,
        })
      )
    },
  }),
  d2 = F(d_, [['__scopeId', 'data-v-0bfcf206']]),
  u_ = ['href'],
  c_ = x({
    __name: 'AGDSTextLink',
    props: { href: {}, focusRingFor: { default: 'keyboard' } },
    emits: ['click', 'focus', 'blur'],
    setup(e, { expose: t }) {
      const o = C(null)
      return (
        t({ focus: () => o.value?.focus() }),
        (a, l) => (
          c(),
          h(
            'a',
            {
              ref_key: 'anchorEl',
              ref: o,
              href: e.href,
              class: I([
                'agds-text-link',
                { 'agds-text-link--focus-all': e.focusRingFor === 'all' },
              ]),
              onClick: l[0] || (l[0] = (n) => a.$emit('click', n)),
              onFocus: l[1] || (l[1] = (n) => a.$emit('focus', n)),
              onBlur: l[2] || (l[2] = (n) => a.$emit('blur', n)),
            },
            [A(a.$slots, 'default', {}, void 0, !0)],
            42,
            u_,
          )
        )
      )
    },
  }),
  Ya = F(c_, [['__scopeId', 'data-v-4c648a8d']]),
  f_ = {
    key: 1,
    class: 'agds-file-upload-thumbnail agds-file-upload-thumbnail--icon',
    'aria-hidden': 'true',
  },
  p_ = x({
    __name: 'AGDSFileUploadFileThumbnail',
    props: { src: {} },
    setup(e) {
      return (t, o) =>
        e.src
          ? (c(),
            h(
              'div',
              {
                key: 0,
                class: 'agds-file-upload-thumbnail agds-file-upload-thumbnail--image',
                style: xe({ backgroundImage: `url(${e.src})` }),
                'aria-hidden': 'true',
              },
              null,
              4,
            ))
          : (c(),
            h('div', f_, [
              ...(o[0] ||
                (o[0] = [
                  p(
                    'svg',
                    {
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      width: '24',
                      height: '24',
                      fill: 'currentColor',
                      focusable: 'false',
                      'aria-hidden': 'true',
                    },
                    [
                      p('path', {
                        d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 7V3.5L18.5 9H13zm-5 5h8v2H8v-2zm0-4h8v2H8v-2z',
                      }),
                    ],
                    -1,
                  ),
                ])),
            ]))
    },
  }),
  fi = F(p_, [['__scopeId', 'data-v-7be25cc3']]),
  pi = 'file-too-large',
  gi = 'file-invalid-type',
  g_ = 'too-many-files',
  vi = { code: g_, message: 'Too many files' },
  v_ = {
    'application/msword': { extensions: ['.doc'] },
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': {
      extensions: ['.docx'],
    },
    'application/pdf': { extensions: ['.pdf'] },
    'application/rtf': { extensions: ['.rtf'] },
    'application/vnd.ms-excel': { extensions: ['.xls'] },
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { extensions: ['.xlsx'] },
    'application/vnd.ms-outlook': { extensions: ['.msg'] },
    'application/zip': { extensions: ['.zip'] },
    'application/xml': { extensions: ['.xml'] },
    'audio/*': { extensions: [], label: 'Any audio file' },
    'audio/mpeg': { extensions: ['.mp3'] },
    'audio/wav': { extensions: ['.wav'] },
    'image/*': { extensions: [], label: 'Any image file' },
    'image/gif': { extensions: ['.gif'] },
    'image/heic': { extensions: ['.heic'] },
    'image/jpg': { extensions: ['.jpeg', '.jpg'] },
    'image/jpeg': { extensions: ['.jpeg', '.jpg'] },
    'image/png': { extensions: ['.png'] },
    'image/svg+xml': { extensions: ['.svg'] },
    'image/tiff': { extensions: ['.tif', '.tiff'] },
    'image/webp': { extensions: ['.webp'] },
    'text/*': { extensions: [], label: 'Any text file' },
    'text/csv': { extensions: ['.csv'] },
    'text/plain': { extensions: ['.txt'] },
    'text/rtf': { extensions: ['.rtf'] },
    'text/xml': { extensions: ['.xml'] },
    'video/*': { extensions: [], label: 'Any video file' },
    'video/mp4': { extensions: ['.mp4'] },
    'video/mpeg': { extensions: ['.mpeg'] },
  },
  so = 1e3,
  ko = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
  Hl = ko.length - 1
function m_(e, t, o) {
  return Math.min(Math.max(e, t), o)
}
function Wt(e) {
  let t = Number(e)
  if (isNaN(t)) return 'Unknown'
  const o = t < 0
  o && (t = -t)
  const a = m_(Math.floor(Math.log(t) / Math.log(so)), 0, Hl),
    l = t / Math.pow(so, a),
    n = Math.pow(10, a > 0 ? 2 : 0)
  let i = Math.round(l * n) / n
  return i === so && a < Hl ? ((i = 1), `${o ? -1 : 1} ${ko[a + 1]}`) : `${o ? -i : i} ${ko[a]}`
}
function h_(e) {
  return e.length === 0 ? '' : `${e.length} ${e.length === 1 ? 'file' : 'files'} selected`
}
function jl(e) {
  return e.replace(/^\./, '').toUpperCase()
}
function b_(e) {
  if (!e?.length) return
  const t = []
  for (const o of e)
    if (typeof o == 'string') {
      const a = v_[o]
      a && (a.label ? t.push(a.label) : a.extensions.forEach((l) => t.push(jl(l))))
    } else o.label ? t.push(o.label) : o.extensions.forEach((a) => t.push(jl(a)))
  return t.filter((o, a, l) => l.indexOf(o) === a).join(', ')
}
function y_(e, t) {
  if (!e?.length) return ''
  const o = [...new Set(e.map((a) => a.code))]
  return o.includes(gi) ? 'Invalid file type' : o.includes(pi) ? `File is over ${t}` : vi.message
}
function __(e) {
  const t = /image\/(png|jpg|jpeg|webp|heic)/i
  return e.type.match(t) ? URL.createObjectURL(e) : void 0
}
function k_(e) {
  return { file: e, errors: [vi] }
}
function w_(e, t) {
  const o = [...e]
  return (o.splice(t, 1), o)
}
function x_(e, t, o) {
  const a = []
  return (
    t &&
      (Object.keys(t).some((l) => {
        if (l.endsWith('/*')) {
          const n = l.slice(0, -2)
          return e.type.startsWith(n + '/')
        }
        return e.type === l
      }) ||
        a.push({ code: gi, message: 'File type not accepted' })),
    o > 0 && e.size > o && a.push({ code: pi, message: 'File is too large' }),
    a
  )
}
const S_ = { key: 0, class: 'agds-file-upload-file__thumb-wrapper' },
  A_ = { class: 'agds-file-upload-file__info' },
  C_ = {
    key: 0,
    class: 'agds-file-upload-file__success-icon',
    role: 'img',
    'aria-label': 'Success',
  },
  D_ = { class: 'agds-file-upload-file__name' },
  B_ = { key: 0, class: 'agds-file-upload-file__size' },
  $_ = { class: 'agds-file-upload-file__actions' },
  I_ = { key: 0, class: 'agds-file-upload-file__uploading', 'aria-label': 'Uploading' },
  M_ = x({
    __name: 'AGDSFileUploadFile',
    props: { file: {}, hideThumbnails: { type: Boolean }, onRemove: { type: Function } },
    setup(e) {
      const t = e,
        o = y(() => t.file.status ?? 'none'),
        a = y(() => __(t.file))
      Te(() => {
        a.value && URL.revokeObjectURL(a.value)
      })
      const l = y(() => (t.file.size ? ` (${Wt(t.file.size)})` : ''))
      return (n, i) => (
        c(),
        h(
          'li',
          {
            class: I([
              'agds-file-upload-file',
              {
                'agds-file-upload-file--success': o.value === 'success',
                'agds-file-upload-file--shade': o.value !== 'success',
              },
            ]),
          },
          [
            e.hideThumbnails
              ? O('', !0)
              : (c(), h('div', S_, [E(fi, { src: a.value }, null, 8, ['src'])])),
            p('div', A_, [
              o.value === 'success'
                ? (c(),
                  h('span', C_, [
                    ...(i[0] ||
                      (i[0] = [
                        p(
                          'svg',
                          {
                            xmlns: 'http://www.w3.org/2000/svg',
                            viewBox: '0 0 24 24',
                            width: '20',
                            height: '20',
                            fill: 'currentColor',
                            focusable: 'false',
                            'aria-hidden': 'true',
                          },
                          [
                            p('path', {
                              d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
                            }),
                          ],
                          -1,
                        ),
                      ])),
                  ]))
                : O('', !0),
              p('span', D_, [
                e.file.href
                  ? (c(),
                    $(
                      Ya,
                      {
                        key: 0,
                        href: e.file.href,
                        download: e.file.download,
                        rel: 'noopener noreferrer',
                        target: '_blank',
                      },
                      { default: w(() => [de(M(e.file.name) + M(l.value), 1)]), _: 1 },
                      8,
                      ['href', 'download'],
                    ))
                  : (c(),
                    h(
                      ae,
                      { key: 1 },
                      [
                        de(M(e.file.name), 1),
                        e.file.size
                          ? (c(), h('span', B_, ' (' + M(v(Wt)(e.file.size)) + ')', 1))
                          : O('', !0),
                      ],
                      64,
                    )),
              ]),
            ]),
            p('div', $_, [
              o.value === 'uploading'
                ? (c(),
                  h('div', I_, [
                    ...(i[1] ||
                      (i[1] = [
                        p(
                          'span',
                          { class: 'agds-file-upload-file__spinner', 'aria-hidden': 'true' },
                          null,
                          -1,
                        ),
                        p('span', { class: 'sr-only' }, 'Uploading', -1),
                      ])),
                  ]))
                : (c(),
                  $(
                    Mt,
                    {
                      key: 1,
                      variant: 'text',
                      size: 'sm',
                      type: 'button',
                      'aria-label': `Remove file: ${e.file.name}`,
                      onClick: e.onRemove,
                    },
                    {
                      iconBefore: w(() => [
                        ...(i[2] ||
                          (i[2] = [
                            p(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '16',
                                height: '16',
                                fill: 'currentColor',
                                focusable: 'false',
                                'aria-hidden': 'true',
                              },
                              [
                                p('path', {
                                  d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
                                }),
                              ],
                              -1,
                            ),
                          ])),
                      ]),
                      default: w(() => [i[3] || (i[3] = de(' Remove ', -1))]),
                      _: 1,
                    },
                    8,
                    ['aria-label', 'onClick'],
                  )),
            ]),
          ],
          2,
        )
      )
    },
  }),
  O_ = F(M_, [['__scopeId', 'data-v-711952d3']]),
  L_ = { class: 'agds-file-upload-existing-file' },
  F_ = { key: 0, class: 'agds-file-upload-existing-file__thumb-wrapper' },
  q_ = { class: 'agds-file-upload-existing-file__info' },
  E_ = { class: 'agds-file-upload-existing-file__name' },
  P_ = { key: 0, class: 'agds-file-upload-existing-file__size' },
  T_ = { class: 'agds-file-upload-existing-file__actions' },
  R_ = x({
    __name: 'AGDSFileUploadExistingFile',
    props: { file: {}, hideThumbnails: { type: Boolean }, onRemove: { type: Function } },
    setup(e) {
      const t = e,
        o = y(() => (t.file.size ? ` (${Wt(t.file.size)})` : ''))
      return (a, l) => (
        c(),
        h('li', L_, [
          e.hideThumbnails
            ? O('', !0)
            : (c(), h('div', F_, [E(fi, { src: e.file.thumbnailSrc }, null, 8, ['src'])])),
          p('div', q_, [
            l[1] ||
              (l[1] = p(
                'span',
                {
                  class: 'agds-file-upload-existing-file__success-icon',
                  role: 'img',
                  'aria-label': 'Success',
                },
                [
                  p(
                    'svg',
                    {
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      width: '20',
                      height: '20',
                      fill: 'currentColor',
                      focusable: 'false',
                      'aria-hidden': 'true',
                    },
                    [
                      p('path', {
                        d: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
                      }),
                    ],
                  ),
                ],
                -1,
              )),
            p('span', E_, [
              e.file.href
                ? (c(),
                  $(
                    Ya,
                    {
                      key: 0,
                      href: e.file.href,
                      download: e.file.download,
                      rel: 'noopener noreferrer',
                      target: '_blank',
                      onClick: l[0] || (l[0] = (n) => e.file.onClick && e.file.onClick(n)),
                    },
                    { default: w(() => [de(M(e.file.name) + M(o.value), 1)]), _: 1 },
                    8,
                    ['href', 'download'],
                  ))
                : (c(),
                  h(
                    ae,
                    { key: 1 },
                    [
                      de(M(e.file.name), 1),
                      e.file.size
                        ? (c(), h('span', P_, ' (' + M(v(Wt)(e.file.size)) + ')', 1))
                        : O('', !0),
                    ],
                    64,
                  )),
            ]),
          ]),
          p('div', T_, [
            E(
              Mt,
              {
                variant: 'text',
                size: 'sm',
                type: 'button',
                'aria-label': `Remove file: ${e.file.name}`,
                onClick: e.onRemove,
              },
              {
                iconBefore: w(() => [
                  ...(l[2] ||
                    (l[2] = [
                      p(
                        'svg',
                        {
                          xmlns: 'http://www.w3.org/2000/svg',
                          viewBox: '0 0 24 24',
                          width: '16',
                          height: '16',
                          fill: 'currentColor',
                          focusable: 'false',
                          'aria-hidden': 'true',
                        },
                        [
                          p('path', {
                            d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
                          }),
                        ],
                        -1,
                      ),
                    ])),
                ]),
                default: w(() => [l[3] || (l[3] = de(' Remove ', -1))]),
                _: 1,
              },
              8,
              ['aria-label', 'onClick'],
            ),
          ]),
        ])
      )
    },
  }),
  V_ = F(R_, [['__scopeId', 'data-v-e80881ab']]),
  N_ = { class: 'agds-file-upload__stack' },
  W_ = { role: 'status', class: 'sr-only', 'aria-live': 'polite', 'aria-atomic': 'true' },
  H_ = ['accept', 'multiple', 'disabled', 'name'],
  j_ = { class: 'agds-file-upload__instructions' },
  G_ = { key: 0, class: 'agds-file-upload__drop-text', 'aria-hidden': 'true' },
  z_ = ['id'],
  U_ = ['id'],
  K_ = { key: 0, class: 'agds-file-upload__error-panel', role: 'alert' },
  Z_ = { class: 'agds-file-upload__error-header' },
  Y_ = { class: 'agds-file-upload__error-title' },
  X_ = { class: 'agds-file-upload__error-intro' },
  Q_ = { class: 'agds-file-upload__error-list' },
  J_ = { class: 'agds-file-upload__error-filename' },
  e0 = { class: 'agds-file-upload__error-size' },
  t0 = { key: 1, class: 'agds-file-upload__file-lists' },
  a0 = { key: 0, class: 'agds-file-upload__summary' },
  o0 = { key: 1, class: 'agds-file-upload__list', 'aria-label': 'Existing files' },
  l0 = { key: 2, class: 'agds-file-upload__list', 'aria-label': 'Selected files' },
  n0 = x({
    __name: 'AGDSFileUpload',
    props: {
      label: {},
      modelValue: { default: () => [] },
      hideOptionalLabel: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      id: {},
      name: {},
      disabled: { type: Boolean, default: !1 },
      multiple: { type: Boolean, default: !1 },
      accept: {},
      maxFiles: {},
      maxSize: {},
      hideThumbnails: { type: Boolean, default: !1 },
      existingFiles: { default: () => [] },
    },
    emits: ['update:modelValue', 'remove-existing-file', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `file-upload-${n}`),
        s = y(() => (a.maxSize ? `${i.value}-size-desc` : '')),
        r = y(() => (a.accept?.length ? `${i.value}-accept-desc` : '')),
        d = y(() => {
          if (!a.accept?.length) return
          const T = []
          for (const J of a.accept)
            typeof J == 'string' ? T.push([J, []]) : T.push([J.mimeType, J.extensions])
          return Object.fromEntries(T)
        }),
        u = y(() => {
          if (a.accept?.length)
            return a.accept.map((T) => (typeof T == 'string' ? T : T.mimeType)).join(',')
        }),
        f = y(() => (a.maxSize && !isNaN(a.maxSize) ? a.maxSize * 1e3 : 0)),
        g = y(() => Wt(f.value)),
        b = y(() => {
          if (a.maxFiles !== void 0) {
            if (a.maxFiles < 1) {
              console.warn(
                'AgDSFileUpload: maxFiles cannot be less than 1. The property is being ignored.',
              )
              return
            }
            return a.maxFiles
          }
        }),
        m = C([]),
        _ = C([]),
        k = y(() => m.value.length > 0 || _.value.length > 0),
        S = y(() => [...m.value, ..._.value]),
        D = y(() => S.value.length > 1)
      function B() {
        ;((m.value = []), (_.value = []))
      }
      const L = C('')
      function R(T) {
        B()
        const J = [],
          V = []
        for (const K of T) {
          const se = x_(K, d.value, f.value)
          se.length ? V.push({ file: K, errors: se }) : J.push(K)
        }
        if ((V.length && (m.value = V), !J.length)) return
        let Y
        if (a.multiple) {
          const K = [...a.modelValue, ...J],
            se = Object.values(
              K.reduce((Ve, Ne) => ({ ...Ve, [`${Ne.name}-${Ne.size}-${Ne.type}`]: Ne }), {}),
            )
          b.value && se.length > b.value
            ? ((_.value = se.slice(b.value).map(k_)), (Y = se.slice(0, b.value)))
            : (Y = se)
        } else Y = [J[0]]
        ;((L.value = Y.map((K) => K.name).join(', ') + ' added'), l('update:modelValue', Y))
      }
      const N = C(0),
        W = y(() => N.value > 0)
      function q(T) {
        ;(T.preventDefault(), !a.disabled && N.value++)
      }
      function P(T) {
        T.preventDefault()
      }
      function j(T) {
        ;(T.preventDefault(), (N.value = Math.max(0, N.value - 1)))
      }
      function oe(T) {
        if ((T.preventDefault(), (N.value = 0), a.disabled)) return
        const J = Array.from(T.dataTransfer?.files ?? [])
        J.length && R(J)
      }
      const U = C(null),
        H = C(null)
      function G() {
        U.value?.click()
      }
      function ne(T) {
        const J = Array.from(T.target.files ?? [])
        ;(J.length && R(J), (T.target.value = ''))
      }
      function le(T) {
        B()
        const J = a.modelValue[T]
        ;((L.value = J.name + ' removed'), l('update:modelValue', w_(a.modelValue, T)))
      }
      function ce(T) {
        ;((L.value = T.name + ' removed'), l('remove-existing-file', T))
      }
      const ie = y(() => h_([...a.modelValue, ...a.existingFiles])),
        be = y(() => a.modelValue.length > 0 || a.existingFiles.length > 0),
        ye = y(() => b_(a.accept)),
        Ae = y(() => (a.multiple ? 'files' : 'file')),
        Se = y(() => `Select ${Ae.value}`),
        z = y(() => (a.required || a.hideOptionalLabel ? void 0 : '(optional)')),
        ee = y(() =>
          [
            Se.value,
            a.label,
            z.value,
            a.required ? 'required' : void 0,
            a.invalid ? 'invalid' : void 0,
            ie.value || void 0,
          ]
            .filter(Boolean)
            .join(', '),
        )
      return (
        t({ focus: () => H.value?.focus() }),
        (T, J) => (
          c(),
          $(
            ze,
            {
              label: a.label,
              id: i.value,
              hint: a.hint,
              invalid: a.invalid,
              message: a.message,
              required: a.required,
              'hide-optional-label': a.hideOptionalLabel,
            },
            {
              default: w((V) => [
                p('div', N_, [
                  p('div', W_, M(L.value), 1),
                  p(
                    'div',
                    {
                      class: I([
                        'agds-file-upload__dropzone',
                        {
                          'agds-file-upload__dropzone--invalid': a.invalid,
                          'agds-file-upload__dropzone--disabled': a.disabled,
                          'agds-file-upload__dropzone--drag-active': W.value,
                        },
                      ]),
                      onDragenter: q,
                      onDragover: P,
                      onDragleave: j,
                      onDrop: oe,
                    },
                    [
                      J[2] ||
                        (J[2] = p(
                          'span',
                          { class: 'agds-file-upload__icon', 'aria-hidden': 'true' },
                          [
                            p(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '32',
                                height: '32',
                                fill: 'currentColor',
                                focusable: 'false',
                                'aria-hidden': 'true',
                              },
                              [
                                p('path', {
                                  d: 'M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z',
                                }),
                              ],
                            ),
                          ],
                          -1,
                        )),
                      p(
                        'input',
                        {
                          ref_key: 'hiddenInputRef',
                          ref: U,
                          type: 'file',
                          accept: u.value,
                          multiple: a.multiple,
                          disabled: a.disabled,
                          name: a.name,
                          'aria-hidden': 'true',
                          tabindex: '-1',
                          class: 'sr-only',
                          onChange: ne,
                        },
                        null,
                        40,
                        H_,
                      ),
                      p('div', j_, [
                        p(
                          'span',
                          {
                            class: I([
                              'agds-file-upload__drag-text',
                              { 'agds-file-upload__drag-text--hidden': W.value },
                            ]),
                          },
                          M(
                            a.multiple
                              ? 'Drag and drop files here or select files to upload.'
                              : 'Drag and drop a file or select a file to upload.',
                          ),
                          3,
                        ),
                        W.value
                          ? (c(), h('span', G_, ' Drop ' + M(Ae.value) + ' here… ', 1))
                          : O('', !0),
                        a.maxSize
                          ? (c(),
                            h(
                              'span',
                              { key: 1, id: s.value, class: 'agds-file-upload__desc-text' },
                              M(a.multiple ? 'Each file' : 'File') +
                                ' cannot exceed ' +
                                M(g.value) +
                                '. ',
                              9,
                              z_,
                            ))
                          : O('', !0),
                        ye.value
                          ? (c(),
                            h(
                              'span',
                              { key: 2, id: r.value, class: 'agds-file-upload__desc-text' },
                              ' Files accepted: ' + M(ye.value) + '. ',
                              9,
                              U_,
                            ))
                          : O('', !0),
                      ]),
                      E(
                        Mt,
                        {
                          ref_key: 'triggerButtonRef',
                          ref: H,
                          variant: 'secondary',
                          type: 'button',
                          id: V.id,
                          disabled: a.disabled,
                          'aria-label': ee.value,
                          'aria-describedby':
                            [V['aria-describedby'], s.value, r.value].filter(Boolean).join(' ') ||
                            void 0,
                          'focus-ring-for': 'all',
                          onClick: G,
                          onFocus: J[0] || (J[0] = (Y) => l('focus', Y)),
                          onBlur: J[1] || (J[1] = (Y) => l('blur', Y)),
                        },
                        { default: w(() => [de(M(Se.value), 1)]), _: 1 },
                        8,
                        ['id', 'disabled', 'aria-label', 'aria-describedby'],
                      ),
                    ],
                    34,
                  ),
                  k.value
                    ? (c(),
                      h('div', K_, [
                        p('div', Z_, [
                          p(
                            'span',
                            Y_,
                            ' The following ' +
                              M(D.value ? 'files' : 'file') +
                              ' could not be selected ',
                            1,
                          ),
                          p(
                            'button',
                            {
                              type: 'button',
                              class: 'agds-file-upload__error-close',
                              'aria-label': 'Dismiss error',
                              onClick: B,
                            },
                            [
                              ...(J[3] ||
                                (J[3] = [
                                  p(
                                    'svg',
                                    {
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 24 24',
                                      width: '20',
                                      height: '20',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      'stroke-width': '2',
                                      'stroke-linecap': 'round',
                                      'stroke-linejoin': 'round',
                                      focusable: 'false',
                                      'aria-hidden': 'true',
                                    },
                                    [p('path', { d: 'M18 6 6 18M6 6l12 12' })],
                                    -1,
                                  ),
                                  p('span', { class: 'sr-only' }, 'Close', -1),
                                ])),
                            ],
                          ),
                        ]),
                        p(
                          'p',
                          X_,
                          M(
                            D.value
                              ? 'These files were unable to be accepted for the following reasons:'
                              : 'This file was unable to be accepted for the following reason:',
                          ),
                          1,
                        ),
                        p('ul', Q_, [
                          (c(!0),
                          h(
                            ae,
                            null,
                            fe(
                              S.value,
                              (Y) => (
                                c(),
                                h(
                                  'li',
                                  { key: Y.file.name, class: 'agds-file-upload__error-item' },
                                  [
                                    p('span', J_, M(Y.file.name), 1),
                                    p('span', e0, ' (' + M(v(Wt)(Y.file.size)) + ')', 1),
                                    p('span', null, ' — ' + M(v(y_)(Y.errors, g.value)), 1),
                                  ],
                                )
                              ),
                            ),
                            128,
                          )),
                        ]),
                      ]))
                    : O('', !0),
                  be.value
                    ? (c(),
                      h('div', t0, [
                        ie.value ? (c(), h('p', a0, M(ie.value), 1)) : O('', !0),
                        a.existingFiles.length
                          ? (c(),
                            h('ul', o0, [
                              (c(!0),
                              h(
                                ae,
                                null,
                                fe(
                                  a.existingFiles,
                                  (Y, K) => (
                                    c(),
                                    $(
                                      V_,
                                      {
                                        key: K,
                                        file: Y,
                                        'hide-thumbnails': a.hideThumbnails,
                                        'on-remove': () => ce(Y),
                                      },
                                      null,
                                      8,
                                      ['file', 'hide-thumbnails', 'on-remove'],
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ]))
                          : O('', !0),
                        a.modelValue.length
                          ? (c(),
                            h('ul', l0, [
                              (c(!0),
                              h(
                                ae,
                                null,
                                fe(
                                  a.modelValue,
                                  (Y, K) => (
                                    c(),
                                    $(
                                      O_,
                                      {
                                        key: K,
                                        file: Y,
                                        'hide-thumbnails': a.hideThumbnails,
                                        'on-remove': () => le(K),
                                      },
                                      null,
                                      8,
                                      ['file', 'hide-thumbnails', 'on-remove'],
                                    )
                                  ),
                                ),
                                128,
                              )),
                            ]))
                          : O('', !0),
                      ]))
                    : O('', !0),
                ]),
              ]),
              _: 1,
            },
            8,
            ['label', 'id', 'hint', 'invalid', 'message', 'required', 'hide-optional-label'],
          )
        )
      )
    },
  }),
  i0 = F(n0, [['__scopeId', 'data-v-af7c3074']]),
  s0 = [
    'type',
    'name',
    'disabled',
    'autofocus',
    'autocomplete',
    'inputmode',
    'maxlength',
    'pattern',
    'placeholder',
    'value',
  ],
  r0 = x({
    __name: 'AGDSTextInput',
    props: {
      label: {},
      hideOptionalLabel: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: { default: 'md' },
      autoComplete: {},
      autoFocus: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      id: {},
      inputMode: {},
      maxLength: {},
      name: {},
      pattern: {},
      placeholder: {},
      type: { default: 'text' },
      modelValue: { default: '' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `text-input-${n}`),
        s = C(null),
        r = C(a.modelValue ?? ''),
        d = y(() => (a.modelValue !== void 0 ? a.modelValue : r.value))
      function u(b) {
        const m = b.target.value
        ;((r.value = m), l('update:modelValue', m))
      }
      const f = { xs: '10ch', sm: '20ch', md: '30ch', lg: '40ch', xl: '60ch' },
        g = y(() => (a.block ? { width: '100%' } : { maxWidth: f[a.maxWidth] }))
      return (
        t({ focus: () => s.value?.focus() }),
        (b, m) => (
          c(),
          $(
            ze,
            {
              label: a.label,
              id: i.value,
              hint: a.hint,
              invalid: a.invalid,
              message: a.message,
              required: a.required,
              'hide-optional-label': a.hideOptionalLabel,
              'max-width': a.maxWidth,
            },
            {
              default: w((_) => [
                p(
                  'input',
                  te({ ref_key: 'inputRef', ref: s }, _, {
                    class: [
                      'agds-text-input',
                      { 'agds-text-input--invalid': a.invalid, 'agds-text-input--block': a.block },
                    ],
                    style: g.value,
                    type: a.type,
                    name: a.name,
                    disabled: a.disabled,
                    autofocus: a.autoFocus || void 0,
                    autocomplete: a.autoComplete,
                    inputmode: a.inputMode,
                    maxlength: a.maxLength,
                    pattern: a.pattern,
                    placeholder: a.placeholder,
                    value: d.value,
                    onInput: u,
                    onChange: m[0] || (m[0] = (k) => l('change', k)),
                    onFocus: m[1] || (m[1] = (k) => l('focus', k)),
                    onBlur: m[2] || (m[2] = (k) => l('blur', k)),
                  }),
                  null,
                  16,
                  s0,
                ),
              ]),
              _: 1,
            },
            8,
            [
              'label',
              'id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  d0 = F(r0, [['__scopeId', 'data-v-96ab7024']]),
  u0 = ['h:mm aaa', 'h:mm aa', 'HH:mm', 'hh:mm aaa', 'hh:mm aa']
function c0(e) {
  if (!e) return null
  const t = e.toLowerCase().trim(),
    o = t.endsWith('pm'),
    a = t.endsWith('am'),
    l = t.replace(/[ap]m$/, '').replace(/\W/g, '')
  if (!l) return null
  let n, i
  if (l.length <= 2) ((n = parseInt(l, 10)), (i = 0))
  else if (l.length === 3) ((n = parseInt(l.slice(0, 1), 10)), (i = parseInt(l.slice(1), 10)))
  else if (l.length === 4) ((n = parseInt(l.slice(0, 2), 10)), (i = parseInt(l.slice(2), 10)))
  else return null
  return isNaN(n) ||
    isNaN(i) ||
    (o && n !== 12 && n < 12 && (n += 12), a && n === 12 && (n = 0), n < 0 || n > 24) ||
    i < 0 ||
    i > 59
    ? null
    : { hours: n, minutes: i }
}
function Pt(e, t) {
  if (!e) return ''
  const o = c0(e)
  if (!o) return ''
  const { hours: a, minutes: l } = o,
    n = String(l).padStart(2, '0')
  switch (t) {
    case 'HH:mm':
      return `${String(a).padStart(2, '0')}:${n}`
    case 'h:mm aaa': {
      const i = a % 12 || 12,
        s = a < 12 ? 'am' : 'pm'
      return `${i}:${n} ${s}`
    }
    case 'h:mm aa': {
      const i = a % 12 || 12,
        s = a < 12 ? 'AM' : 'PM'
      return `${i}:${n} ${s}`
    }
    case 'hh:mm aaa': {
      const i = String(a % 12 || 12).padStart(2, '0'),
        s = a < 12 ? 'am' : 'pm'
      return `${i}:${n} ${s}`
    }
    case 'hh:mm aa': {
      const i = String(a % 12 || 12).padStart(2, '0'),
        s = a < 12 ? 'AM' : 'PM'
      return `${i}:${n} ${s}`
    }
    default:
      return `${String(a).padStart(2, '0')}:${n}`
  }
}
function Gl(e, t) {
  return e ? Pt(e, t) : ''
}
const f0 = ['name', 'disabled', 'placeholder', 'value'],
  p0 = x({
    __name: 'AGDSTimeInput',
    props: {
      label: {},
      id: {},
      hint: {},
      invalid: { type: Boolean, default: !1 },
      message: {},
      required: { type: Boolean, default: !1 },
      hideOptionalLabel: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: { default: 'md' },
      timeFormat: { default: 'h:mm aaa' },
      disabled: { type: Boolean, default: !1 },
      name: {},
      placeholder: {},
      modelValue: {},
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `time-input-${n}`),
        s = C(null),
        r = C(Gl(a.modelValue?.value, a.timeFormat))
      pe(
        () => [a.modelValue, a.timeFormat],
        ([m, _]) => {
          r.value = Gl(m?.value, _)
        },
      )
      function d(m) {
        r.value = m.target.value
      }
      function u(m) {
        const _ = m.target.value,
          k = Pt(_, 'HH:mm'),
          S = k ? { formatted: Pt(_, a.timeFormat), value: k } : void 0
        ;(l('update:modelValue', S), l('change', S), l('blur', m))
      }
      const f = y(() => {
          const m = u0.includes(a.timeFormat) ? a.timeFormat : 'h:mm aaa'
          return '(e.g. ' + Pt('21:30', m) + ')'
        }),
        g = { xs: '10ch', sm: '20ch', md: '30ch', lg: '40ch', xl: '60ch' },
        b = y(() => (a.block ? { width: '100%' } : { maxWidth: g[a.maxWidth] }))
      return (
        t({ focus: () => s.value?.focus() }),
        (m, _) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: i.value,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': f.value,
              'max-width': e.maxWidth,
            },
            {
              default: w((k) => [
                p(
                  'input',
                  te({ ref_key: 'inputRef', ref: s }, k, {
                    class: [
                      'agds-time-input',
                      { 'agds-time-input--invalid': e.invalid, 'agds-time-input--block': e.block },
                    ],
                    style: b.value,
                    type: 'text',
                    name: e.name,
                    disabled: e.disabled,
                    placeholder: e.placeholder,
                    value: r.value,
                    onInput: d,
                    onBlur: u,
                    onFocus: _[0] || (_[0] = (S) => l('focus', S)),
                  }),
                  null,
                  16,
                  f0,
                ),
              ]),
              _: 1,
            },
            8,
            [
              'label',
              'id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  g0 = F(p0, [['__scopeId', 'data-v-a8c53097']])
function wo(e, t, o) {
  const a = Math.min(Math.max(e, t), o)
  return isNaN(a) ? 0 : a
}
function zl(e) {
  const [t, o] = e.split(':').map(Number)
  return [wo(t, 0, 24), wo(o, 0, 59)]
}
function v0(e, t) {
  return `${String(e).padStart(2, '0')}:${String(t).padStart(2, '0')}`
}
function m0(e, t = '', o) {
  const a = t.toLowerCase().replace(/\W/g, ''),
    l = Pt(a, 'HH:mm')
  return e.filter((n) => {
    const [i, s] = n.value.split(':'),
      r = `${i}${s}`
    return (
      l === n.value ||
      r.includes(a) ||
      n.label.toLowerCase().includes(a) ||
      (a.length < 4 && (a.startsWith('12') || a.startsWith('24')) && i === '00') ||
      n.label.toLowerCase().replace(/\W/g, '').includes(a)
    )
  })
}
function h0({ interval: e, max: t, min: o, timeFormat: a }) {
  const [l, n] = zl(o),
    [i, s] = zl(t),
    r = isNaN(Number(e)) ? 60 : Math.round(wo(Number(e), 1, 180))
  let d, u, f, g
  l > i
    ? ((d = i), (u = s), (f = l), (g = n))
    : l === i && n > s
      ? ((d = l), (u = s), (f = i), (g = n))
      : ((d = l), (u = n), (f = i), (g = s))
  const b = d * 60 + u,
    m = f * 60 + g,
    _ = []
  for (let k = b; k <= m; k += r) {
    const S = Math.floor(k / 60),
      D = k % 60,
      B = v0(S, D)
    S !== 24 && _.push({ label: Pt(B, a), value: B })
  }
  return _
}
const b0 = { key: 0, class: 'agds-time-picker__loading', 'aria-live': 'polite' },
  y0 = x({
    __name: 'AGDSTimePicker',
    props: Xe(
      {
        label: {},
        id: {},
        labelId: {},
        hint: {},
        invalid: { type: Boolean, default: !1 },
        message: {},
        required: { type: Boolean, default: !1 },
        hideOptionalLabel: { type: Boolean },
        secondaryLabel: {},
        placeholder: {},
        name: {},
        disabled: { type: Boolean, default: !1 },
        block: { type: Boolean, default: !1 },
        maxWidth: {},
        interval: { default: 15 },
        loading: { type: Boolean, default: !1 },
        max: { default: '24:00' },
        min: { default: '00:00' },
        timeFormat: { default: 'h:mm aaa' },
        emptyResultsMessage: { default: 'No options found' },
      },
      { modelValue: { default: null }, modelModifiers: {} },
    ),
    emits: Xe(['focus', 'blur'], ['update:modelValue']),
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = jt(e, 'modelValue'),
        i = y({
          get: () => n.value?.value,
          set: (b) => {
            n.value = b != null ? (d.value.find((m) => m.value === b) ?? null) : null
          },
        }),
        s = ge()?.uid ?? Math.random().toString(36).slice(2),
        r = y(() => a.id ?? `agds-time-picker-${s}`),
        d = y(() => h0({ interval: a.interval, max: a.max, min: a.min, timeFormat: a.timeFormat })),
        u = C('')
      pe(d, () => {
        u.value = ''
      })
      const f = y(() => m0(d.value, u.value)),
        g = C(null)
      return (
        t({ focus: () => g.value?.querySelector('input')?.focus() }),
        (b, m) => (
          c(),
          $(
            ze,
            {
              label: e.label,
              id: r.value,
              'label-id': e.labelId,
              hint: e.hint,
              invalid: e.invalid,
              message: e.message,
              required: e.required,
              'hide-optional-label': e.hideOptionalLabel,
              'secondary-label': e.secondaryLabel,
              'max-width': e.maxWidth,
            },
            {
              default: w(
                ({ id: _, 'aria-required': k, 'aria-invalid': S, 'aria-describedby': D }) => [
                  E(
                    v(Ea),
                    {
                      modelValue: i.value,
                      'onUpdate:modelValue': m[3] || (m[3] = (B) => (i.value = B)),
                      disabled: e.disabled,
                      name: e.name,
                      required: e.required,
                      'ignore-filter': !0,
                      class: I(['agds-time-picker', { 'agds-time-picker--block': e.block }]),
                    },
                    {
                      default: w(() => [
                        E(
                          v(Pa),
                          {
                            ref_key: 'containerRef',
                            ref: g,
                            class: I([
                              'agds-time-picker__control',
                              { 'agds-time-picker__control--invalid': e.invalid },
                            ]),
                          },
                          {
                            default: w(() => [
                              E(
                                v(Ra),
                                {
                                  id: _,
                                  modelValue: u.value,
                                  'onUpdate:modelValue': m[0] || (m[0] = (B) => (u.value = B)),
                                  'display-value': (B) =>
                                    d.value.find((L) => L.value === B)?.label ?? '',
                                  class: 'agds-time-picker__input',
                                  placeholder: e.placeholder,
                                  'aria-required': k,
                                  'aria-invalid': S,
                                  'aria-describedby': D || void 0,
                                  onFocus: m[1] || (m[1] = (B) => l('focus', B)),
                                  onBlur: m[2] || (m[2] = (B) => l('blur', B)),
                                },
                                null,
                                8,
                                [
                                  'id',
                                  'modelValue',
                                  'display-value',
                                  'placeholder',
                                  'aria-required',
                                  'aria-invalid',
                                  'aria-describedby',
                                ],
                              ),
                              E(
                                v(Go),
                                { class: 'agds-time-picker__trigger', disabled: e.disabled },
                                {
                                  default: w(() => [
                                    ...(m[4] ||
                                      (m[4] = [
                                        p(
                                          'svg',
                                          {
                                            'aria-hidden': 'true',
                                            width: '16',
                                            height: '16',
                                            viewBox: '0 0 24 24',
                                            fill: 'none',
                                            stroke: 'currentColor',
                                            'stroke-width': '2',
                                            'stroke-linecap': 'round',
                                            'stroke-linejoin': 'round',
                                          },
                                          [p('polyline', { points: '6 9 12 15 18 9' })],
                                          -1,
                                        ),
                                      ])),
                                  ]),
                                  _: 1,
                                },
                                8,
                                ['disabled'],
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['class'],
                        ),
                        E(v(Wa), null, {
                          default: w(() => [
                            E(
                              v(Ta),
                              { class: 'agds-time-picker__content', 'avoid-collisions': !1 },
                              {
                                default: w(() => [
                                  E(
                                    v(Ha),
                                    { class: 'agds-time-picker__listbox' },
                                    {
                                      default: w(() => [
                                        e.loading
                                          ? (c(), h('div', b0, ' Loading… '))
                                          : (c(),
                                            h(
                                              ae,
                                              { key: 1 },
                                              [
                                                E(
                                                  v(jo),
                                                  { class: 'agds-time-picker__empty' },
                                                  {
                                                    default: w(() => [
                                                      de(M(e.emptyResultsMessage), 1),
                                                    ]),
                                                    _: 1,
                                                  },
                                                ),
                                                (c(!0),
                                                h(
                                                  ae,
                                                  null,
                                                  fe(
                                                    f.value,
                                                    (B) => (
                                                      c(),
                                                      $(
                                                        v(Va),
                                                        {
                                                          key: B.value,
                                                          value: B.value,
                                                          class: 'agds-time-picker__option',
                                                        },
                                                        {
                                                          default: w(() => [
                                                            de(M(B.label) + ' ', 1),
                                                            E(
                                                              v(Na),
                                                              {
                                                                class:
                                                                  'agds-time-picker__option-check',
                                                              },
                                                              {
                                                                default: w(() => [
                                                                  ...(m[5] ||
                                                                    (m[5] = [
                                                                      p(
                                                                        'svg',
                                                                        {
                                                                          'aria-hidden': 'true',
                                                                          width: '14',
                                                                          height: '14',
                                                                          viewBox: '0 0 24 24',
                                                                          fill: 'none',
                                                                          stroke: 'currentColor',
                                                                          'stroke-width': '2.5',
                                                                          'stroke-linecap': 'round',
                                                                          'stroke-linejoin':
                                                                            'round',
                                                                        },
                                                                        [
                                                                          p('polyline', {
                                                                            points:
                                                                              '20 6 9 17 4 12',
                                                                          }),
                                                                        ],
                                                                        -1,
                                                                      ),
                                                                    ])),
                                                                ]),
                                                                _: 1,
                                                              },
                                                            ),
                                                          ]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        ['value'],
                                                      )
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ],
                                              64,
                                            )),
                                      ]),
                                      _: 1,
                                    },
                                  ),
                                ]),
                                _: 1,
                              },
                            ),
                          ]),
                          _: 1,
                        }),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'disabled', 'name', 'required', 'class'],
                  ),
                ],
              ),
              _: 1,
            },
            8,
            [
              'label',
              'id',
              'label-id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'secondary-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  _0 = F(y0, [['__scopeId', 'data-v-21fe7cc2']]),
  k0 = ['name', 'disabled', 'autofocus', 'inputmode', 'placeholder', 'rows', 'value'],
  w0 = x({
    __name: 'AGDSTextarea',
    props: {
      label: {},
      hideOptionalLabel: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: { default: 'md' },
      autoFocus: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      id: {},
      inputMode: {},
      name: {},
      placeholder: {},
      rows: {},
      modelValue: { default: '' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `textarea-${n}`),
        s = C(null),
        r = C(a.modelValue ?? ''),
        d = y(() => (a.modelValue !== void 0 ? a.modelValue : r.value))
      function u(b) {
        const m = b.target.value
        ;((r.value = m), l('update:modelValue', m))
      }
      const f = { md: '30ch', lg: '40ch', xl: '60ch' },
        g = y(() => (a.block ? { width: '100%' } : { maxWidth: f[a.maxWidth] }))
      return (
        t({ focus: () => s.value?.focus() }),
        (b, m) => (
          c(),
          $(
            ze,
            {
              label: a.label,
              id: i.value,
              hint: a.hint,
              invalid: a.invalid,
              message: a.message,
              required: a.required,
              'hide-optional-label': a.hideOptionalLabel,
              'max-width': a.maxWidth,
            },
            {
              default: w((_) => [
                p(
                  'textarea',
                  te({ ref_key: 'textareaRef', ref: s }, _, {
                    class: [
                      'agds-textarea',
                      { 'agds-textarea--invalid': a.invalid, 'agds-textarea--block': a.block },
                    ],
                    style: g.value,
                    name: a.name,
                    disabled: a.disabled,
                    autofocus: a.autoFocus || void 0,
                    inputmode: a.inputMode,
                    placeholder: a.placeholder,
                    rows: a.rows,
                    value: d.value,
                    onInput: u,
                    onChange: m[0] || (m[0] = (k) => l('change', k)),
                    onFocus: m[1] || (m[1] = (k) => l('focus', k)),
                    onBlur: m[2] || (m[2] = (k) => l('blur', k)),
                  }),
                  null,
                  16,
                  k0,
                ),
              ]),
              _: 1,
            },
            8,
            [
              'label',
              'id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  x0 = F(w0, [['__scopeId', 'data-v-634643e2']]),
  S0 = ['type', 'name', 'disabled', 'autocomplete', 'autofocus', 'maxlength', 'value'],
  A0 = x({
    __name: 'AGDSPasswordInput',
    props: {
      label: {},
      hideOptionalLabel: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: {},
      autoComplete: {},
      autoFocus: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      id: {},
      maxLength: {},
      name: {},
      modelValue: { default: '' },
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `password-input-${n}`),
        s = C(!1),
        r = y(() => (s.value ? 'text' : 'password')),
        d = C(null)
      return (
        t({ focus: () => d.value?.focus() }),
        (u, f) => (
          c(),
          $(
            wa,
            { gap: 1 },
            {
              default: w(() => [
                E(
                  ze,
                  {
                    label: a.label,
                    id: i.value,
                    hint: a.hint,
                    invalid: a.invalid,
                    message: a.message,
                    required: a.required,
                    'hide-optional-label': a.hideOptionalLabel,
                    'max-width': a.maxWidth,
                  },
                  {
                    default: w((g) => [
                      p(
                        'input',
                        te({ ref_key: 'inputRef', ref: d }, g, {
                          type: r.value,
                          class: [
                            'agds-password-input__input',
                            {
                              'agds-password-input__input--invalid': a.invalid,
                              'agds-password-input__input--block': a.block,
                            },
                          ],
                          name: a.name,
                          disabled: a.disabled,
                          autocomplete: a.autoComplete,
                          autofocus: a.autoFocus || void 0,
                          maxlength: a.maxLength,
                          value: a.modelValue,
                          onInput: f[0] || (f[0] = (b) => l('update:modelValue', b.target.value)),
                          onChange: f[1] || (f[1] = (b) => l('change', b)),
                          onFocus: f[2] || (f[2] = (b) => l('focus', b)),
                          onBlur: f[3] || (f[3] = (b) => l('blur', b)),
                        }),
                        null,
                        16,
                        S0,
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  [
                    'label',
                    'id',
                    'hint',
                    'invalid',
                    'message',
                    'required',
                    'hide-optional-label',
                    'max-width',
                  ],
                ),
                E(
                  di,
                  {
                    modelValue: s.value,
                    'onUpdate:modelValue': f[4] || (f[4] = (g) => (s.value = g)),
                    'aria-controls': i.value,
                    disabled: a.disabled,
                    size: 'sm',
                  },
                  { default: w(() => [...(f[5] || (f[5] = [de(' Show password ', -1)]))]), _: 1 },
                  8,
                  ['modelValue', 'aria-controls', 'disabled'],
                ),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  u2 = F(A0, [['__scopeId', 'data-v-59a21484']]),
  C0 = ['name', 'disabled', 'autofocus', 'placeholder', 'value'],
  D0 = x({
    __name: 'AGDSSearchInput',
    props: {
      label: {},
      hideOptionalLabel: { type: Boolean, default: !1 },
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: { default: 'md' },
      autoFocus: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      id: {},
      name: {},
      placeholder: {},
      modelValue: { default: '' },
    },
    emits: ['update:modelValue', 'clear', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `search-input-${n}`),
        s = C(null),
        r = C(a.modelValue ?? ''),
        d = y(() => (a.modelValue !== void 0 ? a.modelValue : r.value)),
        u = y(() => !!d.value)
      function f(k) {
        const S = k.target.value
        ;((r.value = S), l('update:modelValue', S))
      }
      function g() {
        d.value && ((r.value = ''), l('update:modelValue', ''), l('clear'), s.value?.focus())
      }
      function b(k) {
        k.code === 'Escape' && g()
      }
      const m = { md: '30ch', lg: '40ch', xl: '60ch' },
        _ = y(() => (a.block ? {} : { maxWidth: m[a.maxWidth] }))
      return (
        t({ focus: () => s.value?.focus() }),
        (k, S) => (
          c(),
          $(
            ze,
            {
              label: a.label,
              id: i.value,
              hint: a.hint,
              invalid: a.invalid,
              message: a.message,
              required: a.required,
              'hide-optional-label': a.hideOptionalLabel,
              'max-width': a.maxWidth,
            },
            {
              default: w((D) => [
                p(
                  'div',
                  { class: 'agds-search-input__container', style: xe(_.value) },
                  [
                    p(
                      'span',
                      {
                        class: I([
                          'agds-search-input__icon',
                          { 'agds-search-input__icon--disabled': a.disabled },
                        ]),
                        'aria-hidden': 'true',
                      },
                      [
                        ...(S[3] ||
                          (S[3] = [
                            p(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '20',
                                height: '20',
                                fill: 'currentColor',
                                focusable: 'false',
                              },
                              [
                                p('path', {
                                  d: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
                                }),
                              ],
                              -1,
                            ),
                          ])),
                      ],
                      2,
                    ),
                    p(
                      'input',
                      te({ ref_key: 'inputRef', ref: s }, D, {
                        type: 'search',
                        autocomplete: 'off',
                        class: [
                          'agds-search-input__input',
                          {
                            'agds-search-input__input--invalid': a.invalid,
                            'agds-search-input__input--block': a.block,
                            'agds-search-input__input--has-clear': u.value,
                          },
                        ],
                        name: a.name,
                        disabled: a.disabled,
                        autofocus: a.autoFocus || void 0,
                        placeholder: a.placeholder,
                        value: d.value,
                        onInput: f,
                        onKeydown: b,
                        onChange: S[0] || (S[0] = (B) => l('change', B)),
                        onFocus: S[1] || (S[1] = (B) => l('focus', B)),
                        onBlur: S[2] || (S[2] = (B) => l('blur', B)),
                      }),
                      null,
                      16,
                      C0,
                    ),
                    u.value
                      ? (c(),
                        h(
                          'div',
                          {
                            key: 0,
                            role: 'button',
                            'aria-label': 'Clear search',
                            class: I([
                              'agds-search-input__clear',
                              { 'agds-search-input__clear--disabled': a.disabled },
                            ]),
                            onClick: g,
                          },
                          [
                            ...(S[4] ||
                              (S[4] = [
                                p(
                                  'svg',
                                  {
                                    xmlns: 'http://www.w3.org/2000/svg',
                                    viewBox: '0 0 24 24',
                                    width: '20',
                                    height: '20',
                                    'aria-hidden': 'true',
                                    focusable: 'false',
                                    fill: 'currentColor',
                                  },
                                  [
                                    p('path', {
                                      d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
                                    }),
                                  ],
                                  -1,
                                ),
                              ])),
                          ],
                          2,
                        ))
                      : O('', !0),
                  ],
                  4,
                ),
              ]),
              _: 1,
            },
            8,
            [
              'label',
              'id',
              'hint',
              'invalid',
              'message',
              'required',
              'hide-optional-label',
              'max-width',
            ],
          )
        )
      )
    },
  }),
  B0 = F(D0, [['__scopeId', 'data-v-c7aabc07']]),
  $0 = ['name', 'disabled', 'autocomplete', 'autofocus', 'value'],
  I0 = { key: 0, value: '' },
  M0 = ['label', 'disabled'],
  O0 = ['value', 'disabled'],
  L0 = ['value', 'disabled'],
  F0 = x({
    __name: 'AGDSSelect',
    props: {
      label: {},
      hideOptionalLabel: { type: Boolean, default: !1 },
      options: {},
      required: { type: Boolean, default: !1 },
      hint: {},
      message: {},
      invalid: { type: Boolean, default: !1 },
      block: { type: Boolean, default: !1 },
      maxWidth: { default: 'md' },
      autoComplete: {},
      autoFocus: { type: Boolean, default: !1 },
      disabled: { type: Boolean, default: !1 },
      id: {},
      name: {},
      placeholder: {},
      modelValue: {},
    },
    emits: ['update:modelValue', 'change', 'focus', 'blur'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `select-${n}`),
        s = C(null)
      t({ focus: () => s.value?.focus() })
      const r = { sm: '20ch', md: '30ch', lg: '40ch', xl: '60ch' },
        d = y(() => (a.block ? {} : { maxWidth: r[a.maxWidth] }))
      function u(f) {
        a.disabled || (l('update:modelValue', f.target.value), l('change', f))
      }
      return (f, g) => (
        c(),
        $(
          ze,
          {
            label: a.label,
            id: i.value,
            hint: a.hint,
            invalid: a.invalid,
            message: a.message,
            required: a.required,
            'hide-optional-label': a.hideOptionalLabel,
            'max-width': a.maxWidth,
          },
          {
            default: w((b) => [
              p(
                'div',
                {
                  class: I([
                    'agds-select__container',
                    { 'agds-select__container--block': a.block },
                  ]),
                  style: xe(d.value),
                },
                [
                  p(
                    'select',
                    te({ ref_key: 'selectRef', ref: s }, b, {
                      class: [
                        'agds-select',
                        {
                          'agds-select--invalid': a.invalid,
                          'agds-select--block': a.block,
                          'agds-select--disabled': a.disabled,
                        },
                      ],
                      name: a.name,
                      disabled: a.disabled,
                      autocomplete: a.autoComplete,
                      autofocus: a.autoFocus || void 0,
                      value: a.modelValue,
                      onChange: u,
                      onFocus: g[0] || (g[0] = (m) => l('focus', m)),
                      onBlur: g[1] || (g[1] = (m) => l('blur', m)),
                    }),
                    [
                      a.placeholder ? (c(), h('option', I0, M(a.placeholder), 1)) : O('', !0),
                      (c(!0),
                      h(
                        ae,
                        null,
                        fe(
                          a.options,
                          (m) => (
                            c(),
                            h(
                              ae,
                              { key: 'options' in m ? m.label : m.value },
                              [
                                'options' in m
                                  ? (c(),
                                    h(
                                      'optgroup',
                                      { key: 0, label: m.label, disabled: m.disabled },
                                      [
                                        (c(!0),
                                        h(
                                          ae,
                                          null,
                                          fe(
                                            m.options,
                                            (_) => (
                                              c(),
                                              h(
                                                'option',
                                                {
                                                  key: _.value,
                                                  value: _.value,
                                                  disabled: _.disabled,
                                                },
                                                M(_.label),
                                                9,
                                                O0,
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ],
                                      8,
                                      M0,
                                    ))
                                  : (c(),
                                    h(
                                      'option',
                                      { key: 1, value: m.value, disabled: m.disabled },
                                      M(m.label),
                                      9,
                                      L0,
                                    )),
                              ],
                              64,
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    16,
                    $0,
                  ),
                  p(
                    'span',
                    {
                      class: I([
                        'agds-select__icon',
                        { 'agds-select__icon--disabled': a.disabled },
                      ]),
                      'aria-hidden': 'true',
                    },
                    [
                      ...(g[2] ||
                        (g[2] = [
                          p(
                            'svg',
                            {
                              xmlns: 'http://www.w3.org/2000/svg',
                              viewBox: '0 0 24 24',
                              width: '20',
                              height: '20',
                              fill: 'none',
                              stroke: 'currentColor',
                              'stroke-width': '2.5',
                              'stroke-linecap': 'round',
                              'stroke-linejoin': 'round',
                              focusable: 'false',
                            },
                            [p('polyline', { points: '6 9 12 15 18 9' })],
                            -1,
                          ),
                        ])),
                    ],
                    2,
                  ),
                ],
                6,
              ),
            ]),
            _: 1,
          },
          8,
          [
            'label',
            'id',
            'hint',
            'invalid',
            'message',
            'required',
            'hide-optional-label',
            'max-width',
          ],
        )
      )
    },
  }),
  q0 = F(F0, [['__scopeId', 'data-v-2d5949a5']]),
  E0 = x({
    __name: 'AGDSVisuallyHidden',
    props: { as: { default: 'span' } },
    setup(e) {
      return (t, o) => (
        c(),
        $(
          ke(e.as),
          { class: 'agds-visually-hidden' },
          { default: w(() => [A(t.$slots, 'default', {}, void 0, !0)]), _: 3 },
        )
      )
    },
  }),
  Aa = F(E0, [['__scopeId', 'data-v-b4329114']]),
  P0 = { class: 'agds-task-list-item__left' },
  T0 = { class: 'agds-task-list-item__icon-desktop', 'aria-hidden': 'true' },
  R0 = { class: 'agds-task-list-item__body' },
  V0 = { class: 'agds-task-list-item__label' },
  N0 = { key: 0, class: 'agds-task-list-item__counter', 'aria-hidden': 'true' },
  W0 = { class: 'agds-task-list-item__status' },
  H0 = { class: 'agds-task-list-item__status-label' },
  j0 = { key: 0, class: 'agds-task-list-item__message' },
  G0 = x({
    __name: 'AGDSTaskListItem',
    props: {
      status: {},
      message: {},
      ordered: { type: Boolean, default: !1 },
      href: {},
      type: { default: 'button' },
      disabled: { type: Boolean, default: !1 },
    },
    emits: ['click', 'focus', 'blur'],
    setup(e) {
      const t = e,
        o = y(() => !!t.href),
        a = {
          notRequired: {
            label: 'No longer required',
            icon: 'mdi:minus-circle-outline',
            iconColor: 'var(--agds-color-border)',
          },
          blocked: {
            label: 'Cannot start yet',
            icon: 'mdi:lock-outline',
            iconColor: 'var(--agds-color-border)',
          },
          doing: {
            label: 'In progress',
            icon: 'mdi:clock-outline',
            iconColor: 'var(--agds-color-action-primary)',
          },
          todo: {
            label: 'Not started',
            icon: 'mdi:radiobox-blank',
            iconColor: 'var(--agds-color-action-primary)',
          },
          done: {
            label: 'Completed',
            icon: 'mdi:check-circle',
            iconColor: 'var(--agds-color-success)',
          },
          doneRecently: {
            label: 'Completed',
            icon: 'mdi:check-circle',
            iconColor: 'var(--agds-color-success)',
          },
        },
        l = y(() => a[t.status])
      return (n, i) => (
        c(),
        h(
          'li',
          { class: I(['agds-task-list-item', `agds-task-list-item--${e.status}`]) },
          [
            (c(),
            $(
              ke(o.value ? 'a' : 'button'),
              {
                href: o.value ? e.href : void 0,
                type: o.value ? void 0 : e.type,
                disabled: !o.value && e.disabled ? !0 : void 0,
                'aria-disabled': e.disabled ? !0 : void 0,
                class: 'agds-task-list-item__trigger',
                onClick: i[0] || (i[0] = (s) => n.$emit('click', s)),
                onFocus: i[1] || (i[1] = (s) => n.$emit('focus', s)),
                onBlur: i[2] || (i[2] = (s) => n.$emit('blur', s)),
              },
              {
                default: w(() => [
                  p('span', P0, [
                    p('span', T0, [
                      E(De, { name: l.value.icon, size: 'xl', color: l.value.iconColor }, null, 8, [
                        'name',
                        'color',
                      ]),
                    ]),
                    p('span', R0, [
                      p('span', V0, [
                        e.ordered ? (c(), h('span', N0)) : O('', !0),
                        A(n.$slots, 'default', {}, void 0, !0),
                        E(Aa, null, {
                          default: w(() => [...(i[3] || (i[3] = [de('.', -1)]))]),
                          _: 1,
                        }),
                      ]),
                      p('span', W0, [
                        E(
                          De,
                          {
                            class: 'agds-task-list-item__icon-mobile',
                            name: l.value.icon,
                            size: 'md',
                            color: l.value.iconColor,
                            'aria-hidden': 'true',
                          },
                          null,
                          8,
                          ['name', 'color'],
                        ),
                        p('span', H0, [
                          de(M(l.value.label) + ' ', 1),
                          E(Aa, null, {
                            default: w(() => [...(i[4] || (i[4] = [de('.', -1)]))]),
                            _: 1,
                          }),
                        ]),
                      ]),
                      e.message ? (c(), h('span', j0, M(e.message), 1)) : O('', !0),
                    ]),
                  ]),
                  E(De, {
                    name: 'mdi:arrow-right',
                    class: 'agds-task-list-item__arrow',
                    color: 'var(--agds-color-action-primary)',
                    'aria-hidden': 'true',
                  }),
                ]),
                _: 3,
              },
              40,
              ['href', 'type', 'disabled', 'aria-disabled'],
            )),
          ],
          2,
        )
      )
    },
  }),
  z0 = F(G0, [['__scopeId', 'data-v-0aa12709']]),
  U0 = x({
    __name: 'AGDSTaskList',
    props: { items: {}, ordered: { type: Boolean, default: !1 } },
    setup(e) {
      const t = e,
        o = ['done', 'doneRecently'],
        a = y(() => t.items.filter(({ status: l }) => o.includes(l)).length)
      return (l, n) => (
        c(),
        $(
          wa,
          { gap: 3, class: 'agds-task-list' },
          {
            default: w(() => [
              E(
                wa,
                { gap: 2 },
                {
                  default: w(() => [
                    E(
                      kt,
                      { type: 'h2' },
                      {
                        default: w(() => [...(n[0] || (n[0] = [de('Complete these tasks', -1)]))]),
                        _: 1,
                      },
                    ),
                    E(
                      ni,
                      { as: 'p', color: 'muted', 'font-size': 'sm' },
                      {
                        default: w(() => [
                          de(M(a.value) + ' of ' + M(e.items.length) + ' tasks completed ', 1),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
              ),
              (c(),
              $(
                ke(e.ordered ? 'ol' : 'ul'),
                { class: 'agds-task-list__items' },
                {
                  default: w(() => [
                    (c(!0),
                    h(
                      ae,
                      null,
                      fe(
                        e.items,
                        (i, s) => (
                          c(),
                          $(
                            z0,
                            {
                              key: s,
                              status: i.status,
                              message: i.message,
                              ordered: e.ordered,
                              href: i.href,
                              type: i.type,
                              disabled: i.disabled,
                            },
                            { default: w(() => [de(M(i.label), 1)]), _: 2 },
                            1032,
                            ['status', 'message', 'ordered', 'href', 'type', 'disabled'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]),
                  _: 1,
                },
              )),
            ]),
            _: 1,
          },
        )
      )
    },
  }),
  c2 = F(U0, [['__scopeId', 'data-v-4a46f04d']])
function Ht(e) {
  return 'href' in e
}
function Qo(e) {
  return 'items' in e
}
function K0(e, t) {
  if (!t) return ''
  let o = '',
    a = 0
  const l = (n) => {
    t.startsWith(n) && n.length > a && ((o = n), (a = n.length))
  }
  for (const n of e)
    if (Ht(n)) l(n.href)
    else if (Qo(n)) for (const i of n.items) Ht(i) && l(i.href)
  return o
}
const Z0 = ['aria-label'],
  Y0 = { class: 'agds-main-nav__list', role: 'list' },
  X0 = ['href', 'aria-current'],
  Q0 = ['onClick'],
  J0 = x({
    __name: 'AGDSMainNavList',
    props: { items: {}, activePath: {}, type: {}, ariaLabel: { default: 'Main' } },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        h(
          'nav',
          {
            'aria-label': t.ariaLabel,
            class: I(['agds-main-nav__list-nav', `agds-main-nav__list-nav--${t.type}`]),
          },
          [
            p('ul', Y0, [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  t.items,
                  (l, n) => (
                    c(),
                    h('li', { key: n, class: 'agds-main-nav__list-item' }, [
                      v(Ht)(l)
                        ? (c(),
                          h(
                            'a',
                            {
                              key: 0,
                              href: l.href,
                              'aria-current': l.href === t.activePath ? 'page' : void 0,
                              class: I([
                                'agds-main-nav__link',
                                { 'agds-main-nav__link--active': l.href === t.activePath },
                              ]),
                            },
                            M(l.label),
                            11,
                            X0,
                          ))
                        : v(Qo)(l)
                          ? (c(),
                            $(
                              Qn,
                              { key: 1, 'popover-placement': 'bottom-end', 'popover-offset': -8 },
                              {
                                default: w(() => [
                                  E(
                                    Jn,
                                    null,
                                    { default: w(() => [de(M(l.label), 1)]), _: 2 },
                                    1024,
                                  ),
                                  E(
                                    ei,
                                    null,
                                    {
                                      default: w(() => [
                                        (c(!0),
                                        h(
                                          ae,
                                          null,
                                          fe(
                                            l.items,
                                            (i, s) => (
                                              c(),
                                              h(
                                                ae,
                                                { key: s },
                                                [
                                                  v(Ht)(i)
                                                    ? (c(),
                                                      $(
                                                        ti,
                                                        { key: 0, href: i.href },
                                                        {
                                                          default: w(() => [de(M(i.label), 1)]),
                                                          _: 2,
                                                        },
                                                        1032,
                                                        ['href'],
                                                      ))
                                                    : O('', !0),
                                                ],
                                                64,
                                              )
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]),
                                      _: 2,
                                    },
                                    1024,
                                  ),
                                ]),
                                _: 2,
                              },
                              1024,
                            ))
                          : (c(),
                            h(
                              'button',
                              {
                                key: 2,
                                type: 'button',
                                class: 'agds-main-nav__link',
                                onClick: (i) => l.onClick?.(i),
                              },
                              M(l.label),
                              9,
                              Q0,
                            )),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ],
          10,
          Z0,
        )
      )
    },
  }),
  Ul = F(J0, [['__scopeId', 'data-v-ba5cd09e']]),
  e1 = ['id'],
  t1 = { class: 'agds-main-nav-dialog__header' },
  a1 = { 'aria-label': 'Main', class: 'agds-main-nav-dialog__nav' },
  o1 = { class: 'agds-main-nav-dialog__list', role: 'list' },
  l1 = { key: 0 },
  n1 = ['href', 'aria-current'],
  i1 = { key: 1 },
  s1 = { class: 'agds-main-nav-dialog__group-label' },
  r1 = { class: 'agds-main-nav-dialog__group-list', role: 'list' },
  d1 = ['href', 'aria-current'],
  u1 = ['onClick'],
  c1 = { key: 2 },
  f1 = ['onClick'],
  p1 = x({
    __name: 'AGDSMainNavDialog',
    props: { id: {}, items: {}, activePath: {}, isOpen: { type: Boolean } },
    emits: ['close'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = C(null),
        n = C(null)
      pe(
        () => o.isOpen,
        async (r) => {
          r
            ? (await he(), n.value?.focus(), (document.body.style.overflow = 'hidden'))
            : (document.body.style.overflow = '')
        },
      )
      function i() {
        a('close')
      }
      function s(r) {
        if (r.key === 'Escape') {
          ;(r.preventDefault(), i())
          return
        }
        if (r.key === 'Tab') {
          const d = l.value?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
          if (!d?.length) return
          const u = d[0],
            f = d[d.length - 1]
          r.shiftKey && document.activeElement === u
            ? (r.preventDefault(), f.focus())
            : !r.shiftKey && document.activeElement === f && (r.preventDefault(), u.focus())
        }
      }
      return (r, d) => (
        c(),
        $(Ca, { to: 'body' }, [
          E(
            Rt,
            { name: 'agds-main-nav-dialog' },
            {
              default: w(() => [
                o.isOpen
                  ? (c(),
                    h('div', {
                      key: 0,
                      class: 'agds-main-nav-dialog__backdrop',
                      'aria-hidden': 'true',
                      onClick: i,
                    }))
                  : O('', !0),
              ]),
              _: 1,
            },
          ),
          E(
            Rt,
            { name: 'agds-main-nav-dialog-panel' },
            {
              default: w(() => [
                o.isOpen
                  ? (c(),
                    h(
                      'div',
                      {
                        key: 0,
                        ref_key: 'dialogEl',
                        ref: l,
                        id: o.id,
                        role: 'dialog',
                        'aria-modal': 'true',
                        'aria-label': 'Main menu',
                        class: 'agds-main-nav-dialog',
                        onKeydown: s,
                      },
                      [
                        p('div', t1, [
                          p(
                            'button',
                            {
                              ref_key: 'closeButtonEl',
                              ref: n,
                              type: 'button',
                              class: 'agds-main-nav-dialog__close',
                              'aria-label': 'Close menu',
                              onClick: i,
                            },
                            [
                              ...(d[0] ||
                                (d[0] = [
                                  p(
                                    'svg',
                                    {
                                      'aria-hidden': 'true',
                                      xmlns: 'http://www.w3.org/2000/svg',
                                      viewBox: '0 0 24 24',
                                      fill: 'none',
                                      stroke: 'currentColor',
                                      'stroke-width': '2.5',
                                      'stroke-linecap': 'round',
                                      'stroke-linejoin': 'round',
                                      class: 'agds-main-nav-dialog__close-icon',
                                    },
                                    [
                                      p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                      p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                    ],
                                    -1,
                                  ),
                                  p('span', null, 'Close', -1),
                                ])),
                            ],
                            512,
                          ),
                        ]),
                        p('nav', a1, [
                          p('ul', o1, [
                            (c(!0),
                            h(
                              ae,
                              null,
                              fe(
                                o.items,
                                (u, f) => (
                                  c(),
                                  h(
                                    ae,
                                    { key: f },
                                    [
                                      v(Ht)(u)
                                        ? (c(),
                                          h('li', l1, [
                                            p(
                                              'a',
                                              {
                                                href: u.href,
                                                'aria-current':
                                                  u.href === o.activePath ? 'page' : void 0,
                                                class: I([
                                                  'agds-main-nav-dialog__link',
                                                  {
                                                    'agds-main-nav-dialog__link--active':
                                                      u.href === o.activePath,
                                                  },
                                                ]),
                                                onClick: i,
                                              },
                                              M(u.label),
                                              11,
                                              n1,
                                            ),
                                          ]))
                                        : v(Qo)(u)
                                          ? (c(),
                                            h('li', i1, [
                                              p('span', s1, M(u.label), 1),
                                              p('ul', r1, [
                                                (c(!0),
                                                h(
                                                  ae,
                                                  null,
                                                  fe(
                                                    u.items,
                                                    (g, b) => (
                                                      c(),
                                                      h('li', { key: b }, [
                                                        v(Ht)(g)
                                                          ? (c(),
                                                            h(
                                                              'a',
                                                              {
                                                                key: 0,
                                                                href: g.href,
                                                                'aria-current':
                                                                  g.href === o.activePath
                                                                    ? 'page'
                                                                    : void 0,
                                                                class: I([
                                                                  'agds-main-nav-dialog__link',
                                                                  'agds-main-nav-dialog__link--sub',
                                                                  {
                                                                    'agds-main-nav-dialog__link--active':
                                                                      g.href === o.activePath,
                                                                  },
                                                                ]),
                                                                onClick: i,
                                                              },
                                                              M(g.label),
                                                              11,
                                                              d1,
                                                            ))
                                                          : (c(),
                                                            h(
                                                              'button',
                                                              {
                                                                key: 1,
                                                                type: 'button',
                                                                class:
                                                                  'agds-main-nav-dialog__link agds-main-nav-dialog__link--sub',
                                                                onClick: (m) => {
                                                                  ;(g.onClick?.(m), i())
                                                                },
                                                              },
                                                              M(g.label),
                                                              9,
                                                              u1,
                                                            )),
                                                      ])
                                                    ),
                                                  ),
                                                  128,
                                                )),
                                              ]),
                                            ]))
                                          : (c(),
                                            h('li', c1, [
                                              p(
                                                'button',
                                                {
                                                  type: 'button',
                                                  class: 'agds-main-nav-dialog__link',
                                                  onClick: (g) => {
                                                    ;(u.onClick?.(g), i())
                                                  },
                                                },
                                                M(u.label),
                                                9,
                                                f1,
                                              ),
                                            ])),
                                    ],
                                    64,
                                  )
                                ),
                              ),
                              128,
                            )),
                          ]),
                        ]),
                      ],
                      40,
                      e1,
                    ))
                  : O('', !0),
              ]),
              _: 1,
            },
          ),
        ])
      )
    },
  }),
  g1 = F(p1, [['__scopeId', 'data-v-148afa34']]),
  v1 = ['id'],
  m1 = ['aria-hidden'],
  h1 = ['aria-expanded'],
  b1 = x({
    __name: 'AGDSMainNav',
    props: {
      activePath: {},
      background: { default: 'body' },
      borderColor: { default: 'brand' },
      focusMode: { type: Boolean, default: !1 },
      id: {},
      items: {},
      maxWidth: { default: 'container' },
      secondaryItems: {},
    },
    setup(e) {
      const t = e,
        o = C(!1),
        a = C(null)
      function l() {
        o.value = !0
      }
      function n() {
        ;((o.value = !1), a.value?.focus())
      }
      const i = y(() => K0([...(t.items ?? []), ...(t.secondaryItems ?? [])], t.activePath)),
        s = y(() => (t.maxWidth === 'containerLg' ? '90rem' : '75rem')),
        r = y(
          () =>
            ({
              brand: 'var(--agds-color-border-brand)',
              border: 'var(--agds-color-border)',
              'border-strong': 'var(--agds-color-border-strong)',
            })[t.borderColor],
        )
      return (d, u) => (
        c(),
        h(
          'header',
          {
            id: t.id,
            class: I(['agds-main-nav', `agds-main-nav--${t.background}`]),
            tabindex: '-1',
          },
          [
            t.focusMode
              ? O('', !0)
              : (c(),
                h(
                  'div',
                  { key: 0, 'aria-hidden': o.value ? !0 : void 0, class: 'agds-main-nav__bar' },
                  [
                    p(
                      'div',
                      { class: 'agds-main-nav__inner', style: xe({ maxWidth: s.value }) },
                      [
                        t.items?.length
                          ? (c(),
                            h(
                              'button',
                              {
                                key: 0,
                                ref_key: 'hamburgerRef',
                                ref: a,
                                type: 'button',
                                class: 'agds-main-nav__hamburger',
                                'aria-expanded': o.value,
                                'aria-controls': 'agds-main-nav-dialog',
                                'aria-label': 'Open menu',
                                onClick: l,
                              },
                              [
                                ...(u[0] ||
                                  (u[0] = [
                                    en(
                                      '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="agds-main-nav__hamburger-icon" data-v-259c80dc><line x1="3" y1="6" x2="21" y2="6" data-v-259c80dc></line><line x1="3" y1="12" x2="21" y2="12" data-v-259c80dc></line><line x1="3" y1="18" x2="21" y2="18" data-v-259c80dc></line></svg><span class="sr-only" data-v-259c80dc>Menu</span>',
                                      2,
                                    ),
                                  ])),
                              ],
                              8,
                              h1,
                            ))
                          : O('', !0),
                        t.items?.length
                          ? (c(),
                            $(
                              Ul,
                              {
                                key: 1,
                                items: t.items,
                                'active-path': i.value,
                                type: 'primary',
                                'aria-label': 'Main',
                              },
                              null,
                              8,
                              ['items', 'active-path'],
                            ))
                          : O('', !0),
                        t.secondaryItems?.length
                          ? (c(),
                            $(
                              Ul,
                              {
                                key: 2,
                                items: t.secondaryItems,
                                'active-path': i.value,
                                type: 'secondary',
                                'aria-label': 'Supplementary',
                              },
                              null,
                              8,
                              ['items', 'active-path'],
                            ))
                          : O('', !0),
                      ],
                      4,
                    ),
                  ],
                  8,
                  m1,
                )),
            p(
              'div',
              { class: 'agds-main-nav__border', style: xe({ borderBottomColor: r.value }) },
              null,
              4,
            ),
            E(
              g1,
              {
                id: 'agds-main-nav-dialog',
                items: t.items,
                'active-path': i.value,
                'is-open': o.value,
                onClose: n,
              },
              null,
              8,
              ['items', 'active-path', 'is-open'],
            ),
          ],
          10,
          v1,
        )
      )
    },
  }),
  y1 = F(b1, [['__scopeId', 'data-v-259c80dc']])
function _1(e, t) {
  if (!t) return ''
  const o = mi(e)
  let a = ''
  for (const l of o) {
    if (l.href === t) return l.href
    t.startsWith(l.href) && l.href.length > a.length && (a = l.href)
  }
  return a
}
function mi(e) {
  const t = []
  for (const o of e)
    (t.push({ href: o.href, label: o.label }), o.items?.length && t.push(...mi(o.items)))
  return t
}
function hi(e, t) {
  return !e?.length || !t ? !1 : e.some((o) => o.href === t || hi(o.items, t))
}
const k1 = ['href', 'aria-current', 'aria-label'],
  w1 = { key: 0, class: 'agds-side-nav__ancestor-mark', 'aria-hidden': 'true' },
  x1 = { key: 1, class: 'agds-side-nav__ancestor-mark', 'aria-hidden': 'true' },
  S1 = { class: 'agds-side-nav__link-label' },
  A1 = x({
    __name: 'SideNavLinkList',
    props: { items: {}, activePath: {}, subLevelVisible: {}, depth: { default: 1 } },
    setup(e) {
      const t = e
      function o(s) {
        return s.href === t.activePath
      }
      function a(s) {
        return hi(s.items, t.activePath)
      }
      function l(s) {
        return o(s) || a(s)
      }
      function n(s) {
        return s.items?.length ? o(s) || a(s) || t.subLevelVisible === 'always' : !1
      }
      function i(s) {
        return (s.items?.length ?? 0) > 0 && t.subLevelVisible === 'whenActive'
      }
      return (s, r) => {
        const d = tn('SideNavLinkList', !0)
        return (
          c(),
          h(
            'ul',
            { class: I(['agds-side-nav__list', { 'agds-side-nav__list--nested': e.depth > 1 }]) },
            [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  e.items,
                  (u) => (
                    c(),
                    h(
                      'li',
                      {
                        key: u.href,
                        class: I([
                          'agds-side-nav__item',
                          { 'agds-side-nav__item--active-ancestor': l(u) && e.depth === 1 },
                        ]),
                      },
                      [
                        p(
                          'a',
                          {
                            href: u.href,
                            'aria-current': o(u) ? 'page' : void 0,
                            'aria-label': i(u)
                              ? `${u.label}${n(u) ? ', has expanded sub links' : ', has sub links'}`
                              : void 0,
                            class: I([
                              'agds-side-nav__link',
                              {
                                'agds-side-nav__link--current': o(u),
                                'agds-side-nav__link--sub': e.depth > 1,
                              },
                            ]),
                            style: xe({ paddingLeft: `${e.depth}rem` }),
                          },
                          [
                            e.depth > 2
                              ? (c(), h('span', w1, '—'))
                              : e.depth > 1
                                ? (c(), h('span', x1, '–'))
                                : O('', !0),
                            p('span', S1, M(u.label), 1),
                            i(u)
                              ? (c(),
                                $(
                                  De,
                                  {
                                    key: 2,
                                    name: 'mdi:chevron-right',
                                    size: e.depth > 1 ? 'sm' : 'md',
                                    'aria-hidden': 'true',
                                    class: I([
                                      'agds-side-nav__chevron',
                                      { 'agds-side-nav__chevron--open': n(u) },
                                    ]),
                                  },
                                  null,
                                  8,
                                  ['size', 'class'],
                                ))
                              : O('', !0),
                          ],
                          14,
                          k1,
                        ),
                        u.items?.length && n(u)
                          ? (c(),
                            $(
                              d,
                              {
                                key: 0,
                                items: u.items,
                                'active-path': e.activePath,
                                'sub-level-visible': e.subLevelVisible,
                                depth: (e.depth ?? 1) + 1,
                              },
                              null,
                              8,
                              ['items', 'active-path', 'sub-level-visible', 'depth'],
                            ))
                          : O('', !0),
                      ],
                      2,
                    )
                  ),
                ),
                128,
              )),
            ],
            2,
          )
        )
      }
    },
  }),
  C1 = F(A1, [['__scopeId', 'data-v-8082a636']]),
  D1 = ['aria-expanded'],
  B1 = { class: 'agds-side-nav__toggle-label' },
  $1 = { class: 'agds-side-nav__body' },
  I1 = { class: 'agds-side-nav__title-wrap' },
  M1 = x({
    __name: 'AGDSSideNav',
    props: {
      activePath: {},
      background: { default: 'body' },
      items: {},
      title: {},
      subLevelVisible: { default: 'whenActive' },
      titleLink: {},
    },
    setup(e) {
      const t = e,
        o = y(() => _1(t.items, t.activePath)),
        a = C(!1)
      function l() {
        a.value = !a.value
      }
      return (n, i) => (
        c(),
        h(
          'nav',
          {
            class: I([
              'agds-side-nav',
              [`agds-side-nav--bg-${t.background}`, { 'agds-side-nav--expanded': a.value }],
            ]),
          },
          [
            p(
              'button',
              {
                type: 'button',
                class: 'agds-side-nav__toggle',
                'aria-expanded': a.value,
                onClick: l,
              },
              [
                p('span', B1, M(t.title), 1),
                i[0] ||
                  (i[0] = p(
                    'svg',
                    {
                      class: 'agds-side-nav__toggle-chevron',
                      'aria-hidden': 'true',
                      xmlns: 'http://www.w3.org/2000/svg',
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      'stroke-width': '2.5',
                      'stroke-linecap': 'round',
                      'stroke-linejoin': 'round',
                    },
                    [p('polyline', { points: '6 9 12 15 18 9' })],
                    -1,
                  )),
              ],
              8,
              D1,
            ),
            p('div', $1, [
              p('div', I1, [
                (c(),
                $(
                  ke(t.titleLink ? 'a' : 'span'),
                  {
                    href: t.titleLink || void 0,
                    'aria-current': t.titleLink && t.activePath === t.titleLink ? 'page' : void 0,
                    class: I([
                      'agds-side-nav__title',
                      { 'agds-side-nav__title--link': !!t.titleLink },
                    ]),
                  },
                  { default: w(() => [de(M(t.title), 1)]), _: 1 },
                  8,
                  ['href', 'aria-current', 'class'],
                )),
              ]),
              E(
                C1,
                {
                  items: t.items,
                  'active-path': o.value,
                  'sub-level-visible': t.subLevelVisible,
                  depth: 1,
                },
                null,
                8,
                ['items', 'active-path', 'sub-level-visible'],
              ),
            ]),
          ],
          2,
        )
      )
    },
  }),
  O1 = F(M1, [['__scopeId', 'data-v-11a923c4']]),
  L1 = { class: 'agds-csb__title' },
  F1 = { key: 0, class: 'agds-csb__subtitle' },
  q1 = ['aria-expanded', 'aria-label'],
  E1 = { class: 'agds-csb__toggle-content' },
  P1 = { class: 'agds-csb__toggle-text' },
  T1 = { class: 'agds-csb__toggle-title' },
  R1 = { key: 0, class: 'agds-csb__toggle-subtitle' },
  V1 = x({
    __name: 'AGDSCollapsingSideBar',
    props: {
      title: {},
      subTitle: {},
      as: { default: 'section' },
      background: { default: 'body' },
      ariaLabel: {},
    },
    setup(e) {
      const t = e,
        o = Math.random().toString(36).slice(2, 8),
        a = `agds-csb-body-${o}`,
        l = `agds-csb-heading-${o}`,
        n = C(!1)
      function i() {
        n.value = !n.value
      }
      return (s, r) => (
        c(),
        $(
          ke(t.as),
          {
            class: I(['agds-csb', `agds-csb--bg-${t.background}`]),
            'aria-label': t.ariaLabel || void 0,
            'aria-labelledby': t.ariaLabel ? void 0 : l,
          },
          {
            default: w(() => [
              p('div', { id: l, class: 'agds-csb__heading' }, [
                A(
                  s.$slots,
                  'title',
                  {},
                  () => [
                    p('h2', L1, M(t.title), 1),
                    t.subTitle ? (c(), h('p', F1, M(t.subTitle), 1)) : O('', !0),
                  ],
                  !0,
                ),
              ]),
              p(
                'button',
                {
                  type: 'button',
                  class: 'agds-csb__toggle',
                  'aria-expanded': n.value,
                  'aria-controls': a,
                  'aria-label': t.title,
                  onClick: i,
                },
                [
                  p('span', E1, [
                    p('span', P1, [
                      p('span', T1, M(t.title), 1),
                      t.subTitle ? (c(), h('span', R1, M(t.subTitle), 1)) : O('', !0),
                    ]),
                    (c(),
                    h(
                      'svg',
                      {
                        class: I(['agds-csb__chevron', { 'agds-csb__chevron--open': n.value }]),
                        'aria-hidden': 'true',
                        focusable: 'false',
                        xmlns: 'http://www.w3.org/2000/svg',
                        viewBox: '0 0 24 24',
                        fill: 'none',
                        stroke: 'currentColor',
                        'stroke-width': '2.5',
                        'stroke-linecap': 'round',
                        'stroke-linejoin': 'round',
                      },
                      [...(r[0] || (r[0] = [p('path', { d: 'M6 9l6 6 6-6' }, null, -1)]))],
                      2,
                    )),
                  ]),
                ],
                8,
                q1,
              ),
              p(
                'div',
                { id: a, class: I(['agds-csb__body', { 'agds-csb__body--open': n.value }]) },
                [A(s.$slots, 'default', {}, void 0, !0)],
                2,
              ),
            ]),
            _: 3,
          },
          8,
          ['class', 'aria-label', 'aria-labelledby'],
        )
      )
    },
  }),
  bi = F(V1, [['__scopeId', 'data-v-7efed014']]),
  N1 = { class: 'agds-filter-sidebar__body' },
  W1 = x({
    __name: 'AGDSFilterSidebar',
    props: {
      activeFiltersCount: { default: 0 },
      background: { default: 'body' },
      showClearFilters: { type: Boolean, default: !1 },
    },
    emits: ['clearFilters'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = y(() => (o.activeFiltersCount ? `Filters (${o.activeFiltersCount})` : 'Filters')),
        n = y(() => (o.activeFiltersCount ? `Filters (${o.activeFiltersCount} active)` : 'Filters'))
      return (i, s) => (
        c(),
        $(
          bi,
          { title: l.value, 'aria-label': n.value, background: o.background, as: 'section' },
          {
            default: w(() => [
              p('div', N1, [
                A(i.$slots, 'default', {}, void 0, !0),
                o.showClearFilters
                  ? (c(),
                    h(
                      ae,
                      { key: 0 },
                      [
                        s[1] ||
                          (s[1] = p(
                            'hr',
                            { class: 'agds-filter-sidebar__divider', 'aria-hidden': 'true' },
                            null,
                            -1,
                          )),
                        p(
                          'button',
                          {
                            type: 'button',
                            class: 'agds-filter-sidebar__clear-btn',
                            onClick: s[0] || (s[0] = (r) => a('clearFilters')),
                          },
                          ' Clear filters ',
                        ),
                      ],
                      64,
                    ))
                  : O('', !0),
              ]),
            ]),
            _: 3,
          },
          8,
          ['title', 'aria-label', 'background'],
        )
      )
    },
  }),
  H1 = F(W1, [['__scopeId', 'data-v-e65e6b21']]),
  j1 = ['aria-label', 'id'],
  G1 = { class: 'agds-sub-nav__list' },
  z1 = ['href', 'aria-current'],
  U1 = { key: 0, class: 'agds-sub-nav__end-element' },
  K1 = x({
    __name: 'AGDSSubNav',
    props: {
      links: {},
      activePath: {},
      ariaLabel: { default: 'Content' },
      id: {},
      background: { default: 'body' },
    },
    setup(e) {
      const t = e
      function o(l, n) {
        if (!n) return ''
        for (const s of l) if (s.href === n) return s.href
        let i = ''
        for (const s of l) n.startsWith(s.href) && s.href.length > i.length && (i = s.href)
        return i
      }
      const a = y(() => o(t.links, t.activePath))
      return (l, n) => (
        c(),
        h(
          'nav',
          {
            class: I(['agds-sub-nav', `agds-sub-nav--bg-${t.background}`]),
            'aria-label': t.ariaLabel,
            id: t.id || void 0,
          },
          [
            p('ul', G1, [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  t.links,
                  (i) => (
                    c(),
                    h(
                      'li',
                      {
                        key: i.href,
                        class: I([
                          'agds-sub-nav__item',
                          { 'agds-sub-nav__item--active': i.href === a.value },
                        ]),
                      },
                      [
                        p(
                          'a',
                          {
                            href: i.href,
                            'aria-current': i.href === a.value ? 'page' : void 0,
                            class: I([
                              'agds-sub-nav__link',
                              { 'agds-sub-nav__link--active': i.href === a.value },
                            ]),
                          },
                          [
                            p('span', null, M(i.label), 1),
                            i.endElement ? (c(), h('span', U1, M(i.endElement), 1)) : O('', !0),
                          ],
                          10,
                          z1,
                        ),
                      ],
                      2,
                    )
                  ),
                ),
                128,
              )),
            ]),
            n[0] ||
              (n[0] = p(
                'div',
                { class: 'agds-sub-nav__bottom-bar', 'aria-hidden': 'true' },
                null,
                -1,
              )),
          ],
          10,
          j1,
        )
      )
    },
  }),
  Z1 = F(K1, [['__scopeId', 'data-v-ca9ecce9']]),
  Y1 = { class: 'agds-loading-blanket__content' },
  X1 = ['role'],
  Q1 = x({
    __name: 'AGDSLoadingBlanket',
    props: { fullScreen: { type: Boolean, default: !1 }, label: {} },
    setup(e) {
      const t = e,
        o = y(() => (t.fullScreen ? 5 : 3)),
        a = y(() => (t.fullScreen ? 'lg' : 'md'))
      return (l, n) => (
        c(),
        h(
          'div',
          {
            class: I([
              'agds-loading-blanket',
              { 'agds-loading-blanket--full-screen': e.fullScreen },
            ]),
          },
          [
            p('div', Y1, [
              p(
                'span',
                {
                  class: I(['agds-loading-dots', `agds-loading-dots--${a.value}`]),
                  'aria-hidden': 'true',
                },
                [
                  (c(!0),
                  h(
                    ae,
                    null,
                    fe(
                      o.value,
                      (i) => (
                        c(),
                        h(
                          'span',
                          {
                            key: i,
                            class: 'agds-loading-dots__dot',
                            style: xe({ animationDelay: `${(i - 1) * 100}ms` }),
                          },
                          null,
                          4,
                        )
                      ),
                    ),
                    128,
                  )),
                ],
                2,
              ),
              p(
                'p',
                { role: e.fullScreen ? 'alert' : 'status', class: 'agds-loading-blanket__label' },
                M(e.label),
                9,
                X1,
              ),
            ]),
          ],
          2,
        )
      )
    },
  }),
  J1 = F(Q1, [['__scopeId', 'data-v-6155e75b']]),
  ek = x({
    __name: 'AGDSNotificationBadge',
    props: { value: {}, max: {}, tone: {} },
    setup(e) {
      const t = e,
        o = y(() => (t.max === void 0 || t.value <= t.max ? String(t.value) : `${t.max}+`))
      return (a, l) => (
        c(),
        h('span', { class: I(['agds-badge', `agds-badge--${e.tone}`]) }, M(o.value), 3)
      )
    },
  }),
  tk = F(ek, [['__scopeId', 'data-v-f340843e']]),
  yi = x({
    __name: 'AGDSExternalLinkCallout',
    setup(e) {
      return (t, o) => (
        c(),
        $(Aa, null, {
          default: w(() => [...(o[0] || (o[0] = [de(', opens in a new tab', -1)]))]),
          _: 1,
        })
      )
    },
  }),
  ak = x({
    __name: 'AGDSTextLinkExternal',
    props: { focusRingFor: { default: 'keyboard' }, href: {} },
    emits: ['click', 'focus', 'blur'],
    setup(e) {
      return (t, o) => (
        c(),
        $(
          Ya,
          {
            href: e.href,
            'focus-ring-for': e.focusRingFor,
            rel: 'noopener noreferrer',
            target: '_blank',
            onClick: o[0] || (o[0] = (a) => t.$emit('click', a)),
            onFocus: o[1] || (o[1] = (a) => t.$emit('focus', a)),
            onBlur: o[2] || (o[2] = (a) => t.$emit('blur', a)),
          },
          {
            default: w(() => [
              A(t.$slots, 'default', {}, void 0, !0),
              E(yi),
              E(De, {
                name: 'mdi:open-in-new',
                size: 'sm',
                class: 'agds-text-link-external__icon',
                'aria-hidden': 'true',
              }),
            ]),
            _: 3,
          },
          8,
          ['href', 'focus-ring-for'],
        )
      )
    },
  }),
  ok = F(ak, [['__scopeId', 'data-v-b51ed348']]),
  lk = ['aria-label'],
  nk = { key: 0, class: 'agds-inpage-nav__title' },
  ik = { class: 'agds-inpage-nav__list' },
  sk = ['href'],
  rk = x({
    __name: 'AGDSInpageNav',
    props: { ariaLabel: { default: 'In page' }, links: {}, title: {} },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        h(
          'nav',
          { class: 'agds-inpage-nav', 'aria-label': t.ariaLabel },
          [
            t.title ? (c(), h('h2', nk, M(t.title), 1)) : O('', !0),
            p('ul', ik, [
              (c(!0),
              h(
                ae,
                null,
                fe(
                  t.links,
                  (l, n) => (
                    c(),
                    h('li', { key: n, class: 'agds-inpage-nav__item' }, [
                      p('a', { href: l.href, class: 'agds-inpage-nav__link' }, M(l.label), 9, sk),
                    ])
                  ),
                ),
                128,
              )),
            ]),
          ],
          8,
          lk,
        )
      )
    },
  }),
  dk = F(rk, [['__scopeId', 'data-v-98e194d6']]),
  _i = Symbol('AgDSContentSpacing'),
  uk = x({
    __name: 'AGDSBaseContent',
    props: {
      as: { default: 'div' },
      background: {},
      maxWidth: { default: 'container' },
      paddingY: {},
      id: {},
    },
    setup(e) {
      const t = e
      return (
        qe(_i, t.paddingY),
        (o, a) => (
          c(),
          $(
            ke(t.as),
            {
              id: t.id,
              class: I([
                'agds-content',
                [t.background && `agds-content--${t.background}`, `agds-content--${t.paddingY}`],
              ]),
            },
            {
              default: w(() => [
                p(
                  'div',
                  {
                    class: I([
                      'agds-content__inner',
                      `agds-content__inner--${t.maxWidth === 'containerLg' ? 'container-lg' : 'container'}`,
                    ]),
                  },
                  [A(o.$slots, 'default', {}, void 0, !0)],
                  2,
                ),
              ]),
              _: 3,
            },
            8,
            ['id', 'class'],
          )
        )
      )
    },
  }),
  Jo = F(uk, [['__scopeId', 'data-v-3370447f']]),
  ck = x({
    __name: 'AGDSContent',
    props: { as: { default: 'div' }, background: {}, maxWidth: { default: 'container' }, id: {} },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          Jo,
          {
            as: t.as,
            background: t.background,
            'max-width': t.maxWidth,
            id: t.id,
            'padding-y': 'none',
          },
          { default: w(() => [A(o.$slots, 'default')]), _: 3 },
          8,
          ['as', 'background', 'max-width', 'id'],
        )
      )
    },
  }),
  fk = x({
    __name: 'AGDSSectionContent',
    props: {
      as: { default: 'section' },
      background: {},
      maxWidth: { default: 'container' },
      id: {},
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          Jo,
          {
            as: t.as,
            background: t.background,
            'max-width': t.maxWidth,
            id: t.id,
            'padding-y': 'section',
          },
          { default: w(() => [A(o.$slots, 'default')]), _: 3 },
          8,
          ['as', 'background', 'max-width', 'id'],
        )
      )
    },
  }),
  pk = x({
    __name: 'AGDSPageContent',
    props: { as: { default: 'div' }, background: {}, maxWidth: { default: 'container' }, id: {} },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          Jo,
          {
            as: t.as,
            background: t.background,
            'max-width': t.maxWidth,
            id: t.id,
            'padding-y': 'page',
          },
          { default: w(() => [A(o.$slots, 'default')]), _: 3 },
          8,
          ['as', 'background', 'max-width', 'id'],
        )
      )
    },
  }),
  gk = x({
    __name: 'AGDSContentBleed',
    props: { visible: { type: [Boolean, Object] } },
    setup(e) {
      const t = e,
        o = Pe(_i, 'none'),
        a = y(() => {
          const l = ['agds-content-bleed']
          o !== 'none' && l.push(`agds-content-bleed--${o}`)
          const n = t.visible
          return (
            n === !1
              ? l.push('agds-content-bleed--no-bleed')
              : n != null &&
                typeof n == 'object' &&
                (n.xs === !1 && l.push('agds-content-bleed--no-bleed-xs'),
                n.md === !1 && l.push('agds-content-bleed--no-bleed-md')),
            l
          )
        })
      return (l, n) => (
        c(),
        h('div', { class: I(a.value) }, [A(l.$slots, 'default', {}, void 0, !0)], 2)
      )
    },
  }),
  vk = F(gk, [['__scopeId', 'data-v-3c7e4fa4']]),
  mk = x({
    __name: 'AGDSProse',
    props: { as: { default: 'div' } },
    setup(e) {
      return (t, o) => (
        c(),
        $(ke(e.as), { class: 'agds-prose' }, { default: w(() => [A(t.$slots, 'default')]), _: 3 })
      )
    },
  }),
  hk = ['aria-label'],
  bk = ['href'],
  yk = x({
    __name: 'AGDSSkipLinks',
    props: { links: {}, ariaLabel: { default: 'Skip links' } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'nav',
          { 'aria-label': e.ariaLabel, class: 'agds-skip-links' },
          [
            (c(!0),
            h(
              ae,
              null,
              fe(
                e.links,
                (a, l) => (
                  c(),
                  h('a', { key: l, href: a.href, class: 'agds-skip-link' }, M(a.label), 9, bk)
                ),
              ),
              128,
            )),
          ],
          8,
          hk,
        )
      )
    },
  }),
  _k = F(yk, [['__scopeId', 'data-v-0698aeb1']]),
  kk = ['aria-label'],
  wk = x({
    __name: 'AGDSSearchBox',
    props: { ariaLabel: { default: 'Sitewide' } },
    emits: ['submit'],
    setup(e, { emit: t }) {
      const o = e,
        a = t
      return (l, n) => (
        c(),
        h(
          'form',
          {
            class: 'agds-search-box',
            role: 'search',
            'aria-label': o.ariaLabel,
            onSubmit: n[0] || (n[0] = (i) => a('submit', i)),
          },
          [
            E(
              Ut,
              { 'align-items': 'flex-end' },
              { default: w(() => [A(l.$slots, 'default')]), _: 3 },
            ),
          ],
          40,
          kk,
        )
      )
    },
  }),
  xk = ['for'],
  Sk = { class: 'agds-search-box__input-wrapper' },
  Ak = ['id', 'name', 'placeholder', 'value'],
  Ck = x({
    __name: 'AGDSSearchBoxInput',
    props: {
      modelValue: {},
      defaultValue: {},
      label: { default: 'Search' },
      labelVisible: { type: Boolean, default: !1 },
      id: {},
      name: {},
      placeholder: {},
    },
    emits: ['update:modelValue', 'blur', 'focus'],
    setup(e, { expose: t, emit: o }) {
      const a = e,
        l = o,
        n = ge()?.uid ?? Math.random().toString(36).slice(2),
        i = y(() => a.id ?? `search-${n}`),
        s = C(null),
        r = C(a.defaultValue ?? ''),
        d = y(() => (a.modelValue !== void 0 ? a.modelValue : r.value)),
        u = y(() => !!d.value)
      function f(b) {
        const m = b.target.value
        ;((r.value = m), l('update:modelValue', m))
      }
      function g() {
        ;((r.value = ''), l('update:modelValue', ''), s.value?.focus())
      }
      return (
        t({ focus: () => s.value?.focus() }),
        (b, m) => (
          c(),
          $(
            Ut,
            { 'flex-direction': 'column', style: { width: '100%' } },
            {
              default: w(() => [
                p(
                  'label',
                  {
                    for: i.value,
                    class: I(['agds-search-box__label', { 'sr-only': !a.labelVisible }]),
                  },
                  M(a.label),
                  11,
                  xk,
                ),
                p('div', Sk, [
                  p(
                    'input',
                    {
                      ref_key: 'inputRef',
                      ref: s,
                      id: i.value,
                      type: 'search',
                      autocomplete: 'off',
                      class: I([
                        'agds-search-box__input',
                        { 'agds-search-box__input--has-clear': u.value },
                      ]),
                      name: a.name,
                      placeholder: a.placeholder,
                      value: d.value,
                      onInput: f,
                      onBlur: m[0] || (m[0] = (_) => l('blur', _)),
                      onFocus: m[1] || (m[1] = (_) => l('focus', _)),
                    },
                    null,
                    42,
                    Ak,
                  ),
                  u.value
                    ? (c(),
                      h(
                        'button',
                        { key: 0, type: 'button', class: 'agds-search-box__clear', onClick: g },
                        [
                          ...(m[2] ||
                            (m[2] = [
                              p(
                                'svg',
                                {
                                  xmlns: 'http://www.w3.org/2000/svg',
                                  viewBox: '0 0 24 24',
                                  width: '16',
                                  height: '16',
                                  'aria-hidden': 'true',
                                  focusable: 'false',
                                  fill: 'currentColor',
                                },
                                [
                                  p('path', {
                                    d: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
                                  }),
                                ],
                                -1,
                              ),
                              p('span', { class: 'sr-only' }, 'Clear search', -1),
                            ])),
                        ],
                      ))
                    : O('', !0),
                ]),
              ]),
              _: 1,
            },
          )
        )
      )
    },
  }),
  Dk = F(Ck, [['__scopeId', 'data-v-8d5aed32']]),
  Bk = { class: 'agds-search-box__button-wrapper' },
  $k = {
    key: 0,
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 24 24',
    width: '20',
    height: '20',
    'aria-hidden': 'true',
    focusable: 'false',
    fill: 'currentColor',
  },
  Ik = x({
    __name: 'AGDSSearchBoxButton',
    props: { label: {}, iconOnly: { type: Boolean, default: !1 } },
    setup(e, { expose: t }) {
      const o = e,
        a = C(null)
      return (
        t({ focus: () => a.value?.focus() }),
        (l, n) => (
          c(),
          h('div', Bk, [
            E(
              Mt,
              {
                ref_key: 'buttonRef',
                ref: a,
                type: 'submit',
                'aria-label': o.label,
                class: 'agds-search-box__button',
              },
              aa(
                {
                  iconBefore: w(() => [
                    o.iconOnly
                      ? (c(),
                        h('svg', $k, [
                          ...(n[0] ||
                            (n[0] = [
                              p(
                                'path',
                                {
                                  d: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
                                },
                                null,
                                -1,
                              ),
                            ])),
                        ]))
                      : O('', !0),
                  ]),
                  default: w(() => [
                    p('span', { class: I({ 'sr-only': o.iconOnly }) }, M(o.label), 3),
                  ]),
                  _: 2,
                },
                [
                  o.iconOnly
                    ? void 0
                    : {
                        name: 'iconAfter',
                        fn: w(() => [
                          n[1] ||
                            (n[1] = p(
                              'svg',
                              {
                                xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 24 24',
                                width: '20',
                                height: '20',
                                'aria-hidden': 'true',
                                focusable: 'false',
                                fill: 'currentColor',
                              },
                              [
                                p('path', {
                                  d: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
                                }),
                              ],
                              -1,
                            )),
                        ]),
                        key: '0',
                      },
                ],
              ),
              1032,
              ['aria-label'],
            ),
          ])
        )
      )
    },
  }),
  Mk = F(Ik, [['__scopeId', 'data-v-9b3716b7']]),
  Ok = { class: 'agds-progress-indicator__grid' },
  Lk = { class: 'agds-progress-indicator__icon-col', 'aria-hidden': 'true' },
  Fk = { class: 'agds-progress-indicator__status-text' },
  qk = { class: 'agds-progress-indicator__sub-list' },
  Ek = { class: 'agds-progress-indicator__sub-item' },
  Pk = x({
    __name: 'AGDSProgressIndicatorItem',
    props: { item: {}, background: {}, isFirst: { type: Boolean }, isLast: { type: Boolean } },
    setup(e) {
      const t = {
          blocked: { label: 'Cannot start yet', icon: 'mdi:lock', iconColor: 'border' },
          doing: { label: 'In progress', icon: 'mdi:progress-clock', iconColor: 'border' },
          started: { label: 'In progress', icon: 'mdi:progress-clock', iconColor: 'border' },
          todo: {
            label: 'Not started',
            icon: 'mdi:checkbox-blank-circle-outline',
            iconColor: 'border',
          },
          done: { label: 'Completed', icon: 'mdi:check-circle', iconColor: 'success' },
          saved: { label: 'Saved', icon: 'mdi:check-circle-outline', iconColor: 'success' },
          error: { label: 'Error', icon: 'mdi:alert-circle', iconColor: 'error' },
        },
        o = e,
        a = y(() => t[o.item.status]),
        l = y(() => {
          const { iconColor: r } = a.value
          return o.item.isActive && r === 'border'
            ? 'var(--agds-color-action-primary)'
            : r === 'success'
              ? 'var(--agds-color-success)'
              : r === 'error'
                ? 'var(--agds-color-error)'
                : 'var(--agds-color-border)'
        }),
        n = y(() => (o.item.href ? 'a' : 'button')),
        i = y(() => (o.item.isActive ? (o.item.items?.find((r) => r.isActive) ?? null) : null)),
        s = y(() => !!o.item.items?.length)
      return (r, d) => (
        c(),
        h(
          'li',
          {
            class: I([
              'agds-progress-indicator__item',
              [
                `agds-progress-indicator__item--bg-${e.background}`,
                e.item.isActive && 'agds-progress-indicator__item--active',
                e.isFirst && 'agds-progress-indicator__item--first',
                e.isLast && 'agds-progress-indicator__item--last',
              ],
            ]),
          },
          [
            p('span', Ok, [
              p('span', Lk, [
                d[1] ||
                  (d[1] = p(
                    'span',
                    { class: 'agds-progress-indicator__line agds-progress-indicator__line--top' },
                    null,
                    -1,
                  )),
                p(
                  'span',
                  {
                    class: I([
                      'agds-progress-indicator__ring',
                      { 'agds-progress-indicator__ring--active': e.item.isActive },
                    ]),
                  },
                  [
                    E(
                      v(De),
                      { name: a.value.icon, size: 'md', color: l.value, 'aria-hidden': 'true' },
                      null,
                      8,
                      ['name', 'color'],
                    ),
                  ],
                  2,
                ),
                d[2] ||
                  (d[2] = p(
                    'span',
                    {
                      class: 'agds-progress-indicator__line agds-progress-indicator__line--bottom',
                    },
                    null,
                    -1,
                  )),
              ]),
              (c(),
              $(
                ke(n.value),
                te(
                  {
                    class: [
                      'agds-progress-indicator__content',
                      { 'agds-progress-indicator__content--no-sub': !s.value },
                    ],
                  },
                  e.item.href ? { href: e.item.href } : { type: 'button' },
                  {
                    'aria-current': e.item.isActive ? 'step' : void 0,
                    onClick: d[0] || (d[0] = (u) => (e.item.href ? void 0 : e.item.onClick?.(u))),
                  },
                ),
                {
                  default: w(() => [
                    p(
                      'span',
                      {
                        class: I([
                          'agds-progress-indicator__label',
                          { 'agds-progress-indicator__label--bold': e.item.isActive },
                        ]),
                      },
                      M(e.item.label),
                      3,
                    ),
                    p('span', Fk, M(a.value.label), 1),
                  ]),
                  _: 1,
                },
                16,
                ['class', 'aria-current'],
              )),
              i.value
                ? (c(),
                  h(
                    ae,
                    { key: 0 },
                    [
                      d[3] ||
                        (d[3] = p(
                          'span',
                          {
                            class:
                              'agds-progress-indicator__line agds-progress-indicator__line--sub',
                            'aria-hidden': 'true',
                          },
                          null,
                          -1,
                        )),
                      p('ul', qk, [
                        p('li', Ek, [
                          (c(),
                          $(
                            ke(i.value.href ? 'a' : 'span'),
                            {
                              class: 'agds-progress-indicator__sub-link',
                              href: i.value.href || void 0,
                              'aria-current': 'step',
                            },
                            {
                              default: w(() => [
                                E(v(De), {
                                  name: 'mdi:arrow-right-bottom',
                                  size: 'sm',
                                  color: 'var(--agds-color-action-primary)',
                                  'aria-hidden': 'true',
                                }),
                                p('span', null, M(i.value.label), 1),
                              ]),
                              _: 1,
                            },
                            8,
                            ['href'],
                          )),
                        ]),
                      ]),
                    ],
                    64,
                  ))
                : O('', !0),
            ]),
          ],
          2,
        )
      )
    },
  }),
  Tk = F(Pk, [['__scopeId', 'data-v-cac787ce']]),
  Rk = ['aria-expanded'],
  Vk = { class: 'agds-progress-indicator__toggle-text' },
  Nk = { key: 0, class: 'agds-progress-indicator__subtitle' },
  Wk = { class: 'agds-progress-indicator__body' },
  Hk = { class: 'agds-progress-indicator__list' },
  jk = x({
    name: 'AgDSProgressIndicator',
    __name: 'AGDSProgressIndicator',
    props: {
      activePath: {},
      background: { default: 'body' },
      hideSubtitle: { type: Boolean, default: !1 },
      items: {},
    },
    setup(e) {
      const t = e,
        o = C(!0)
      function a() {
        o.value = !o.value
      }
      const l = y(() =>
          t.hideSubtitle
            ? void 0
            : `${t.items.filter((i) => i.status === 'done').length} of ${t.items.length} steps completed`,
        ),
        n = y(() => {
          const i = t.items.some((s) => s.isActive)
          return t.items.map((s) => {
            let r
            if (i) r = !!s.isActive
            else if (t.activePath !== void 0) {
              const u = s.href ?? s.label,
                f = u.endsWith('/') ? u : `${u}/`,
                g = !!t.activePath.split(f)[1]?.length
              r = t.activePath === u || g
            } else r = s.status === 'doing'
            const d = s.items?.map((u) => ({ ...u, isActive: u.href === t.activePath }))
            return { ...s, isActive: r, items: d }
          })
        })
      return (i, s) => (
        c(),
        h(
          'nav',
          {
            class: I([
              'agds-progress-indicator',
              [
                `agds-progress-indicator--bg-${e.background}`,
                { 'agds-progress-indicator--expanded': o.value },
              ],
            ]),
            'aria-label': 'Progress',
          },
          [
            p(
              'button',
              {
                type: 'button',
                class: 'agds-progress-indicator__toggle',
                'aria-expanded': o.value,
                onClick: a,
              },
              [
                p('span', Vk, [
                  s[0] ||
                    (s[0] = p('span', { class: 'agds-progress-indicator__title' }, 'Progress', -1)),
                  l.value ? (c(), h('span', Nk, M(l.value), 1)) : O('', !0),
                ]),
                (c(),
                h(
                  'svg',
                  {
                    class: I([
                      'agds-progress-indicator__chevron',
                      { 'agds-progress-indicator__chevron--open': o.value },
                    ]),
                    'aria-hidden': 'true',
                    xmlns: 'http://www.w3.org/2000/svg',
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': '2',
                    'stroke-linecap': 'round',
                    'stroke-linejoin': 'round',
                  },
                  [...(s[1] || (s[1] = [p('polyline', { points: '6 9 12 15 18 9' }, null, -1)]))],
                  2,
                )),
              ],
              8,
              Rk,
            ),
            p('div', Wk, [
              p('ul', Hk, [
                (c(!0),
                h(
                  ae,
                  null,
                  fe(
                    n.value,
                    (r, d) => (
                      c(),
                      $(
                        Tk,
                        {
                          key: r.label,
                          item: r,
                          background: e.background,
                          'is-first': d === 0,
                          'is-last': d === n.value.length - 1,
                        },
                        null,
                        8,
                        ['item', 'background', 'is-first', 'is-last'],
                      )
                    ),
                  ),
                  128,
                )),
              ]),
            ]),
          ],
          2,
        )
      )
    },
  }),
  Gk = F(jk, [['__scopeId', 'data-v-341abc83']]),
  ki = Symbol('AppLayout')
function wi() {
  const e = Pe(ki)
  if (!e) throw new Error('useAppLayoutContext must be called within AgDSAppLayout')
  return e
}
const zk = { class: 'agds-app-layout__body' },
  Uk = { class: 'agds-app-layout__sidebar-col' },
  Kk = { class: 'agds-app-layout__main' },
  Zk = x({
    __name: 'AGDSAppLayout',
    props: { focusMode: { type: Boolean, default: !1 } },
    setup(e) {
      const t = e,
        o = C(!1),
        a = y(() => t.focusMode)
      function l() {
        o.value = !0
      }
      function n() {
        o.value = !1
      }
      return (
        qe(ki, { focusMode: a, isMobileMenuOpen: o, openMobileMenu: l, closeMobileMenu: n }),
        (i, s) => (
          c(),
          h(
            'div',
            { class: I(['agds-app-layout', { 'agds-app-layout--focus-mode': e.focusMode }]) },
            [
              A(i.$slots, 'header', {}, void 0, !0),
              p('div', zk, [
                p('div', Uk, [A(i.$slots, 'sidebar', {}, void 0, !0)]),
                p('div', Kk, [A(i.$slots, 'default', {}, void 0, !0)]),
              ]),
            ],
            2,
          )
        )
      )
    },
  }),
  Yk = F(Zk, [['__scopeId', 'data-v-dbac323b']]),
  Xk = ['aria-expanded'],
  Qk = { class: 'agds-app-layout-header__brand' },
  Jk = { key: 1, class: 'agds-app-layout-header__account' },
  ew = x({
    __name: 'AGDSAppLayoutHeader',
    props: {
      heading: {},
      href: { default: '/' },
      background: { default: 'body' },
      badgeLabel: {},
      subline: {},
      dividerPosition: { default: 'after' },
      maxWidth: { default: 'container' },
      secondHref: {},
      size: { default: 'md' },
    },
    setup(e) {
      const { focusMode: t, isMobileMenuOpen: o, openMobileMenu: a } = wi()
      return (l, n) => (
        c(),
        h(
          'header',
          { class: I(['agds-app-layout-header', [`agds-app-layout-header--${e.background}`]]) },
          [
            p(
              'div',
              {
                class: I([
                  'agds-app-layout-header__inner',
                  [`agds-app-layout-header__inner--${e.maxWidth}`],
                ]),
              },
              [
                v(t)
                  ? O('', !0)
                  : (c(),
                    h(
                      'button',
                      {
                        key: 0,
                        type: 'button',
                        class: 'agds-app-layout-header__hamburger',
                        'aria-expanded': v(o),
                        'aria-haspopup': 'dialog',
                        'aria-label': 'Open menu',
                        'aria-controls': 'agds-app-layout-sidebar-dialog',
                        onClick: n[0] || (n[0] = (...i) => v(a) && v(a)(...i)),
                      },
                      [
                        ...(n[1] ||
                          (n[1] = [
                            en(
                              '<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="agds-app-layout-header__hamburger-icon" data-v-ae3c4785><line x1="3" y1="6" x2="21" y2="6" data-v-ae3c4785></line><line x1="3" y1="12" x2="21" y2="12" data-v-ae3c4785></line><line x1="3" y1="18" x2="21" y2="18" data-v-ae3c4785></line></svg><span class="sr-only" data-v-ae3c4785>Menu</span>',
                              2,
                            ),
                          ])),
                      ],
                      8,
                      Xk,
                    )),
                p('div', Qk, [
                  E(
                    Yn,
                    {
                      'badge-label': e.badgeLabel,
                      'divider-position': e.dividerPosition,
                      'has-right-content': !!l.$slots.account,
                      heading: e.heading,
                      href: e.href,
                      'second-href': e.secondHref,
                      size: e.size,
                      subline: e.subline,
                    },
                    aa({ _: 2 }, [
                      l.$slots.logo
                        ? {
                            name: 'logo',
                            fn: w(() => [A(l.$slots, 'logo', {}, void 0, !0)]),
                            key: '0',
                          }
                        : void 0,
                      l.$slots.secondLogo
                        ? {
                            name: 'secondLogo',
                            fn: w(() => [A(l.$slots, 'secondLogo', {}, void 0, !0)]),
                            key: '1',
                          }
                        : void 0,
                    ]),
                    1032,
                    [
                      'badge-label',
                      'divider-position',
                      'has-right-content',
                      'heading',
                      'href',
                      'second-href',
                      'size',
                      'subline',
                    ],
                  ),
                ]),
                l.$slots.account
                  ? (c(), h('div', Jk, [A(l.$slots, 'account', {}, void 0, !0)]))
                  : O('', !0),
              ],
              2,
            ),
          ],
          2,
        )
      )
    },
  }),
  tw = F(ew, [['__scopeId', 'data-v-ae3c4785']])
function Yt(e) {
  return 'href' in e
}
function aw(e) {
  return 'onClick' in e
}
function xi(e) {
  return Array.isArray(e) ? e : e.items
}
function ow(e) {
  return Array.isArray(e) ? void 0 : e.options
}
function lw(e, t) {
  if (!t) return ''
  let o = ''
  function a(n) {
    t.startsWith(n) && n.length > o.length && (o = n)
  }
  function l(n) {
    for (const i of n) Yt(i) && (a(i.href), i.items && l(i.items))
  }
  for (const n of e) l(xi(n))
  return o
}
function Si(e, t) {
  return e.some((o) => o.href === t || (o.items ? Si(o.items, t) : !1))
}
const nw = { key: 0, class: 'agds-alsnav-item' },
  iw = ['href', 'aria-current'],
  sw = { key: 1, 'aria-hidden': 'true', class: 'agds-alsnav-item__dash' },
  rw = { class: 'agds-alsnav-item__label' },
  dw = { key: 0, class: 'agds-alsnav-item__sub', role: 'list' },
  uw = { key: 1, class: 'agds-alsnav-item' },
  cw = { class: 'agds-alsnav-item__label' },
  fw = { key: 2, class: 'agds-alsnav-item' },
  pw = { class: 'agds-alsnav-item__text' },
  gw = x({
    __name: 'AppLayoutSidebarNavItem',
    props: { item: {}, activePath: {}, level: {}, subLevelVisible: {}, background: {} },
    emits: ['close'],
    setup(e, { emit: t }) {
      ji((f) => ({ v1603bac8: u.value }))
      const o = e,
        a = t,
        l = y(() => Yt(o.item)),
        n = y(() => aw(o.item)),
        i = y(() => (Yt(o.item) ? o.item : null)),
        s = y(() => Yt(o.item) && o.item.href === o.activePath),
        r = y(() => (Yt(o.item) && o.item.items?.length ? Si(o.item.items, o.activePath) : !1)),
        d = y(() => o.subLevelVisible === 'always' || r.value || s.value),
        u = y(() =>
          o.background === 'body' ? 'var(--agds-color-bg-subtle)' : 'var(--agds-color-bg-muted)',
        )
      return (f, g) => {
        const b = tn('AppLayoutSidebarNavItem', !0)
        return l.value
          ? (c(),
            h('li', nw, [
              p(
                'a',
                {
                  href: i.value.href,
                  'aria-current': s.value ? 'page' : void 0,
                  class: I([
                    'agds-alsnav-item__link',
                    {
                      'agds-alsnav-item__link--current': s.value,
                      'agds-alsnav-item__link--ancestor': r.value && !s.value,
                      'agds-alsnav-item__link--level2': e.level === 2,
                    },
                  ]),
                  onClick: g[0] || (g[0] = (m) => a('close')),
                },
                [
                  i.value.icon && e.level === 1
                    ? (c(),
                      $(ke(i.value.icon), {
                        key: 0,
                        'aria-hidden': 'true',
                        class: 'agds-alsnav-item__icon',
                      }))
                    : O('', !0),
                  e.level === 2 ? (c(), h('span', sw, '–')) : O('', !0),
                  p('span', rw, M(e.item.label), 1),
                  i.value.items?.length && e.subLevelVisible !== 'always'
                    ? (c(),
                      h(
                        'svg',
                        {
                          key: 2,
                          'aria-hidden': 'true',
                          xmlns: 'http://www.w3.org/2000/svg',
                          viewBox: '0 0 24 24',
                          fill: 'none',
                          stroke: 'currentColor',
                          'stroke-width': '2.5',
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                          class: I([
                            'agds-alsnav-item__chevron',
                            { 'agds-alsnav-item__chevron--open': r.value || s.value },
                          ]),
                        },
                        [
                          ...(g[3] ||
                            (g[3] = [p('polyline', { points: '9 18 15 12 9 6' }, null, -1)])),
                        ],
                        2,
                      ))
                    : O('', !0),
                ],
                10,
                iw,
              ),
              i.value.items?.length && d.value
                ? (c(),
                  h('ul', dw, [
                    (c(!0),
                    h(
                      ae,
                      null,
                      fe(
                        i.value.items,
                        (m, _) => (
                          c(),
                          $(
                            b,
                            {
                              key: _,
                              item: m,
                              'active-path': e.activePath,
                              level: e.level + 1,
                              'sub-level-visible': e.subLevelVisible,
                              background: e.background,
                              onClose: g[1] || (g[1] = (k) => a('close')),
                            },
                            null,
                            8,
                            ['item', 'active-path', 'level', 'sub-level-visible', 'background'],
                          )
                        ),
                      ),
                      128,
                    )),
                  ]))
                : O('', !0),
            ]))
          : n.value
            ? (c(),
              h('li', uw, [
                p(
                  'button',
                  {
                    type: 'button',
                    class: 'agds-alsnav-item__button',
                    onClick:
                      g[2] ||
                      (g[2] = (m) => {
                        ;(e.item.onClick?.(m), a('close'))
                      }),
                  },
                  [
                    e.item.icon && e.level === 1
                      ? (c(),
                        $(ke(e.item.icon), {
                          key: 0,
                          'aria-hidden': 'true',
                          class: 'agds-alsnav-item__icon',
                        }))
                      : O('', !0),
                    p('span', cw, M(e.item.label), 1),
                  ],
                ),
              ]))
            : (c(), h('li', fw, [p('span', pw, M(e.item.label), 1)]))
      }
    },
  }),
  vw = F(gw, [['__scopeId', 'data-v-67c9f167']]),
  mw = { 'aria-label': 'Main', class: 'agds-alsnav', 'aria-labelledby': 'agds-alsnav-label' },
  hw = { class: 'agds-alsnav__list', role: 'list' },
  bw = x({
    __name: 'AGDSAppLayoutSidebarNav',
    props: {
      items: {},
      activePath: {},
      subLevelVisible: { default: 'whenActive' },
      background: { default: 'bodyAlt' },
    },
    emits: ['close'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = y(() => o.items.map((n) => ({ items: xi(n), options: ow(n) })))
      return (n, i) => (
        c(),
        h('nav', mw, [
          i[2] || (i[2] = p('span', { id: 'agds-alsnav-label', class: 'sr-only' }, 'Menu', -1)),
          p('ul', hw, [
            (c(!0),
            h(
              ae,
              null,
              fe(
                l.value,
                (s, r) => (
                  c(),
                  h(
                    ae,
                    { key: r },
                    [
                      r > 0
                        ? (c(),
                          h(
                            'li',
                            {
                              key: 0,
                              class: I([
                                'agds-alsnav__divider-item',
                                {
                                  'agds-alsnav__divider-item--no-top':
                                    l.value[r - 1].options?.disableGroupPadding,
                                  'agds-alsnav__divider-item--no-bottom':
                                    s.options?.disableGroupPadding,
                                },
                              ]),
                              'aria-hidden': 'true',
                            },
                            [
                              ...(i[1] ||
                                (i[1] = [p('hr', { class: 'agds-alsnav__divider' }, null, -1)])),
                            ],
                            2,
                          ))
                        : O('', !0),
                      (c(!0),
                      h(
                        ae,
                        null,
                        fe(
                          s.items,
                          (d, u) => (
                            c(),
                            $(
                              vw,
                              {
                                key: u,
                                item: d,
                                'active-path': e.activePath,
                                level: 1,
                                'sub-level-visible': e.subLevelVisible,
                                background: e.background,
                                onClose: i[0] || (i[0] = (f) => a('close')),
                              },
                              null,
                              8,
                              ['item', 'active-path', 'sub-level-visible', 'background'],
                            )
                          ),
                        ),
                        128,
                      )),
                    ],
                    64,
                  )
                ),
              ),
              128,
            )),
          ]),
        ])
      )
    },
  }),
  xo = F(bw, [['__scopeId', 'data-v-241d3927']]),
  yw = { class: 'agds-alsdialog__header' },
  _w = x({
    __name: 'AGDSAppLayoutSidebar',
    props: {
      items: {},
      activePath: {},
      background: { default: 'bodyAlt' },
      subLevelVisible: { default: 'whenActive' },
    },
    setup(e) {
      const t = e,
        { focusMode: o, isMobileMenuOpen: a, closeMobileMenu: l } = wi(),
        n = y(() => lw(t.items, t.activePath)),
        i = C(null),
        s = C(null)
      pe(a, async (d) => {
        d
          ? (await he(), s.value?.focus(), (document.body.style.overflow = 'hidden'))
          : (document.body.style.overflow = '')
      })
      function r(d) {
        if (d.key === 'Escape') {
          ;(d.preventDefault(), l())
          return
        }
        if (d.key === 'Tab') {
          const u = i.value?.querySelectorAll('a[href], button:not([disabled]), [tabindex="0"]')
          if (!u?.length) return
          const f = u[0],
            g = u[u.length - 1]
          d.shiftKey && document.activeElement === f
            ? (d.preventDefault(), g.focus())
            : !d.shiftKey && document.activeElement === g && (d.preventDefault(), f.focus())
        }
      }
      return (d, u) => (
        c(),
        h(
          ae,
          null,
          [
            p(
              'aside',
              {
                class: I([
                  'agds-app-layout-sidebar',
                  [
                    `agds-app-layout-sidebar--${e.background}`,
                    { 'agds-app-layout-sidebar--focus-mode': v(o) },
                  ],
                ]),
                'aria-label': 'Navigation',
              },
              [
                E(
                  xo,
                  {
                    items: e.items,
                    'active-path': n.value,
                    'sub-level-visible': e.subLevelVisible,
                    background: e.background,
                  },
                  null,
                  8,
                  ['items', 'active-path', 'sub-level-visible', 'background'],
                ),
              ],
              2,
            ),
            (c(),
            $(Ca, { to: 'body' }, [
              E(
                Rt,
                { name: 'agds-alsdialog-backdrop' },
                {
                  default: w(() => [
                    v(a)
                      ? (c(),
                        h('div', {
                          key: 0,
                          class: 'agds-alsdialog__backdrop',
                          'aria-hidden': 'true',
                          onClick: u[0] || (u[0] = (...f) => v(l) && v(l)(...f)),
                        }))
                      : O('', !0),
                  ]),
                  _: 1,
                },
              ),
              E(
                Rt,
                { name: 'agds-alsdialog-panel' },
                {
                  default: w(() => [
                    v(a)
                      ? (c(),
                        h(
                          'div',
                          {
                            key: 0,
                            id: 'agds-app-layout-sidebar-dialog',
                            ref_key: 'dialogEl',
                            ref: i,
                            role: 'dialog',
                            'aria-modal': 'true',
                            'aria-label': 'Menu',
                            class: I(['agds-alsdialog', [`agds-alsdialog--${e.background}`]]),
                            onKeydown: r,
                          },
                          [
                            p('div', yw, [
                              p(
                                'button',
                                {
                                  ref_key: 'closeButtonEl',
                                  ref: s,
                                  type: 'button',
                                  class: 'agds-alsdialog__close',
                                  'aria-label': 'Close menu',
                                  onClick: u[1] || (u[1] = (...f) => v(l) && v(l)(...f)),
                                },
                                [
                                  ...(u[2] ||
                                    (u[2] = [
                                      p(
                                        'svg',
                                        {
                                          'aria-hidden': 'true',
                                          xmlns: 'http://www.w3.org/2000/svg',
                                          viewBox: '0 0 24 24',
                                          fill: 'none',
                                          stroke: 'currentColor',
                                          'stroke-width': '2.5',
                                          'stroke-linecap': 'round',
                                          'stroke-linejoin': 'round',
                                          class: 'agds-alsdialog__close-icon',
                                        },
                                        [
                                          p('line', { x1: '18', y1: '6', x2: '6', y2: '18' }),
                                          p('line', { x1: '6', y1: '6', x2: '18', y2: '18' }),
                                        ],
                                        -1,
                                      ),
                                      p('span', null, 'Close', -1),
                                    ])),
                                ],
                                512,
                              ),
                            ]),
                            E(
                              xo,
                              {
                                items: e.items,
                                'active-path': n.value,
                                'sub-level-visible': e.subLevelVisible,
                                background: e.background,
                                onClose: v(l),
                              },
                              null,
                              8,
                              [
                                'items',
                                'active-path',
                                'sub-level-visible',
                                'background',
                                'onClose',
                              ],
                            ),
                          ],
                          34,
                        ))
                      : O('', !0),
                  ]),
                  _: 1,
                },
              ),
            ])),
          ],
          64,
        )
      )
    },
  }),
  kw = F(_w, [['__scopeId', 'data-v-04bbdf06']]),
  ww = x({
    __name: 'AGDSAppLayoutFooter',
    props: { background: { default: 'body' }, maxWidth: { default: 'container' } },
    setup(e) {
      return (t, o) => (
        c(),
        h(
          'footer',
          { class: I(['agds-app-layout-footer', [`agds-app-layout-footer--${e.background}`]]) },
          [
            p(
              'div',
              {
                class: I([
                  'agds-app-layout-footer__inner',
                  [`agds-app-layout-footer__inner--${e.maxWidth}`],
                ]),
              },
              [A(t.$slots, 'default', {}, void 0, !0)],
              2,
            ),
          ],
          2,
        )
      )
    },
  }),
  xw = F(ww, [['__scopeId', 'data-v-5d10d449']]),
  Sw = { 'aria-hidden': 'true', class: 'agds-app-layout-footer-divider' },
  Aw = x({
    __name: 'AGDSAppLayoutFooterDivider',
    setup(e) {
      return (t, o) => (c(), h('hr', Sw))
    },
  }),
  Cw = F(Aw, [['__scopeId', 'data-v-d84b2daf']]),
  Ai = Symbol('AgDSTable'),
  Dw = ['tabindex', 'id'],
  Bw = x({
    __name: 'AGDSTable',
    props: { striped: { type: Boolean }, tabIndex: {}, tableLayout: { default: 'auto' }, id: {} },
    setup(e) {
      const t = e
      return (
        qe(
          Ai,
          Tt({
            get tableLayout() {
              return t.tableLayout ?? 'auto'
            },
          }),
        ),
        (o, a) => (
          c(),
          h(
            'table',
            {
              class: I([
                'agds-table',
                [
                  t.striped && 'agds-table--striped',
                  t.tableLayout === 'fixed' && 'agds-table--layout-fixed',
                ],
              ]),
              tabindex: t.tabIndex,
              id: t.id,
            },
            [A(o.$slots, 'default', {}, void 0, !0)],
            10,
            Dw,
          )
        )
      )
    },
  }),
  $w = F(Bw, [['__scopeId', 'data-v-18818dfc']]),
  Iw = { class: 'agds-table-body' },
  Mw = x({
    __name: 'AGDSTableBody',
    setup(e) {
      return (t, o) => (c(), h('tbody', Iw, [A(t.$slots, 'default')]))
    },
  }),
  Ow = { class: 'agds-table-caption' },
  Lw = x({
    __name: 'AGDSTableCaption',
    setup(e) {
      return (t, o) => (c(), h('caption', Ow, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  Fw = F(Lw, [['__scopeId', 'data-v-75160857']]),
  qw = { class: 'agds-table-head' },
  Ew = x({
    __name: 'AGDSTableHead',
    setup(e) {
      return (t, o) => (c(), h('thead', qw, [A(t.$slots, 'default', {}, void 0, !0)]))
    },
  }),
  Pw = F(Ew, [['__scopeId', 'data-v-fbb2216e']]),
  Tw = x({
    __name: 'AGDSTableHeader',
    props: {
      as: { default: 'th' },
      colSpan: {},
      rowSpan: {},
      scope: { default: 'col' },
      textAlign: { default: 'left' },
      width: {},
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          ke(t.as),
          {
            class: I(['agds-table-header', `agds-table-header--${t.textAlign}`]),
            colSpan: t.colSpan,
            rowSpan: t.rowSpan,
            scope: t.scope,
            style: xe(t.width ? { width: t.width } : void 0),
          },
          { default: w(() => [A(o.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['class', 'colSpan', 'rowSpan', 'scope', 'style'],
        )
      )
    },
  }),
  Rw = F(Tw, [['__scopeId', 'data-v-168f5712']]),
  Vw = ['aria-sort', 'colSpan'],
  Nw = x({
    __name: 'AGDSTableHeaderSortable',
    props: { sort: {}, textAlign: { default: 'left' }, width: {}, colSpan: {} },
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = y(() => {
          if (o.sort === 'ASC') return 'ascending'
          if (o.sort === 'DESC') return 'descending'
        }),
        n = y(() =>
          o.sort === 'ASC'
            ? 'heroicons:arrow-up'
            : o.sort === 'DESC'
              ? 'heroicons:arrow-down'
              : 'heroicons:arrows-up-down',
        ),
        i = y(() => !!o.sort)
      return (s, r) => (
        c(),
        h(
          'th',
          {
            class: I([
              'agds-table-header-sortable',
              i.value && 'agds-table-header-sortable--active',
            ]),
            scope: 'col',
            'aria-sort': l.value,
            colSpan: o.colSpan,
            style: xe(o.width ? { width: o.width } : void 0),
          },
          [
            p(
              'button',
              {
                type: 'button',
                class: I([
                  'agds-table-header-sortable__button',
                  `agds-table-header-sortable__button--${o.textAlign}`,
                ]),
                onClick: r[0] || (r[0] = (d) => a('click', d)),
              },
              [
                p(
                  'span',
                  {
                    class: 'agds-table-header-sortable__label',
                    style: xe(
                      o.textAlign === 'right'
                        ? { marginLeft: 'auto' }
                        : o.textAlign === 'center'
                          ? { marginInline: 'auto' }
                          : void 0,
                    ),
                  },
                  [A(s.$slots, 'default', {}, void 0, !0)],
                  4,
                ),
                E(
                  De,
                  {
                    name: n.value,
                    size: 'sm',
                    class: 'agds-table-header-sortable__icon',
                    'aria-hidden': 'true',
                  },
                  null,
                  8,
                  ['name'],
                ),
              ],
              2,
            ),
          ],
          14,
          Vw,
        )
      )
    },
  }),
  Ww = F(Nw, [['__scopeId', 'data-v-c8d8c343']]),
  Hw = x({
    __name: 'AGDSTableCell',
    props: {
      as: { default: 'td' },
      colSpan: {},
      rowSpan: {},
      scope: {},
      id: {},
      fontWeight: { default: 'normal' },
      textAlign: { default: 'left' },
      verticalAlign: { default: 'top' },
    },
    setup(e) {
      const t = e
      return (o, a) => (
        c(),
        $(
          ke(t.as),
          {
            class: I([
              'agds-table-cell',
              [`agds-table-cell--align-${t.textAlign}`, `agds-table-cell--weight-${t.fontWeight}`],
            ]),
            colSpan: t.colSpan,
            rowSpan: t.rowSpan,
            scope: t.scope,
            id: t.id,
            style: xe({ verticalAlign: t.verticalAlign }),
          },
          { default: w(() => [A(o.$slots, 'default', {}, void 0, !0)]), _: 3 },
          8,
          ['class', 'colSpan', 'rowSpan', 'scope', 'id', 'style'],
        )
      )
    },
  }),
  jw = F(Hw, [['__scopeId', 'data-v-6fa164c2']]),
  Gw = ['aria-rowindex', 'aria-selected', 'data-has-background'],
  zw = x({
    __name: 'AGDSTableRow',
    props: {
      'aria-rowindex': {},
      background: {},
      invalid: { type: Boolean, default: !1 },
      clickable: { type: Boolean, default: !1 },
      selected: { type: Boolean, default: !1 },
    },
    emits: ['click'],
    setup(e, { emit: t }) {
      const o = e,
        a = t,
        l = Pe(Ai),
        n = y(() => l?.tableLayout === 'fixed'),
        i = y(() => !!(o.background || o.invalid))
      function s(r) {
        if (!o.clickable) return
        const d = r.target
        d.closest('a, button, input, label, select, textarea') ||
          (d.closest('tr') && (r.stopPropagation(), a('click', r)))
      }
      return (r, d) => (
        c(),
        h(
          'tr',
          {
            class: I([
              'agds-table-row',
              [
                o.selected && 'agds-table-row--selected',
                o.invalid && 'agds-table-row--invalid',
                o.clickable && 'agds-table-row--clickable',
                o.background && `agds-table-row--bg-${o.background}`,
                n.value && 'agds-table-row--fixed',
              ],
            ]),
            'aria-rowindex': o['aria-rowindex'],
            'aria-selected': o.selected ? !0 : void 0,
            'data-has-background': i.value ? !0 : void 0,
            onClick: s,
          },
          [A(r.$slots, 'default', {}, void 0, !0)],
          10,
          Gw,
        )
      )
    },
  }),
  Uw = F(zw, [['__scopeId', 'data-v-0f6abb19']]),
  Kw = { class: 'agds-table-scroller' },
  Zw = ['aria-label', 'tabindex'],
  Yw = x({
    __name: 'AGDSTableScroller',
    setup(e) {
      const t = C(null),
        o = C(null),
        a = C(null),
        l = { x: 0, y: 0 },
        n = C(0),
        i = C(''),
        s = C(!1),
        r = C(0),
        d = C(1)
      let u = null
      const f = y(() => d.value !== 1)
      function g() {
        a.value && (r.value = a.value.scrollLeft * d.value)
      }
      function b() {
        const q = a.value,
          P = t.value
        !q ||
          !P ||
          (q.offsetWidth === q.scrollWidth
            ? (d.value = 1)
            : (d.value = P.offsetWidth / (q.scrollWidth - (q.offsetWidth - P.offsetWidth))))
      }
      const m = y(() => (f.value ? (a.value?.scrollLeft ?? 0) > 0 : !1)),
        _ = y(() => {
          if (!f.value) return !1
          const q = a.value
          return q ? Math.ceil(q.scrollLeft + q.offsetWidth) < q.scrollWidth : !1
        })
      let k = null
      ;(we(() => {
        if (typeof window > 'u' || !('ResizeObserver' in window) || !a.value) return
        ;((k = new ResizeObserver((P) => {
          ;((n.value = P[0].contentRect.height), b(), g())
        })),
          k.observe(a.value))
        const q = a.value.querySelector('caption')
        if (q) i.value = `Table ${q.textContent ?? ''}`
        else {
          const P = a.value.querySelector('table[aria-labelledby]')
          if (P) {
            const j = P.getAttribute('aria-labelledby') ?? '',
              oe = document.getElementById(j)
            i.value = `Table ${oe?.textContent ?? ''}`
          }
        }
      }),
        Te(() => {
          ;(k?.disconnect(), N())
        }))
      function S(q) {
        ;(q.preventDefault(),
          (s.value = !0),
          q instanceof MouseEvent && q.button === 0
            ? ((l.x = q.pageX), (l.y = q.pageY))
            : q instanceof TouchEvent &&
              q.touches.length &&
              ((l.x = q.touches[0].pageX), (l.y = q.touches[0].pageY)))
      }
      function D(q) {
        if (!s.value || !a.value) return
        let P, j
        if (q instanceof TouchEvent && q.touches.length)
          ((P = q.touches[0].pageX), (j = q.touches[0].pageY))
        else if (q instanceof MouseEvent) ((P = q.pageX), (j = q.pageY))
        else return
        const oe = P - l.x,
          U = j - l.y
        ;(Math.abs(oe) > Math.abs(U) &&
          (q.preventDefault(), (a.value.scrollLeft += oe / d.value), (l.x = P)),
          (l.y = j))
      }
      function B() {
        s.value && (s.value = !1)
      }
      pe(s, (q) => {
        q
          ? (document.addEventListener('mousemove', D),
            document.addEventListener('mouseup', B),
            document.addEventListener('touchmove', D, { passive: !1 }),
            document.addEventListener('touchend', B))
          : (document.removeEventListener('mousemove', D),
            document.removeEventListener('mouseup', B),
            document.removeEventListener('touchmove', D),
            document.removeEventListener('touchend', B))
      })
      function L(q) {
        const P = q === 'left' ? -40 : 40
        ;(a.value && (a.value.scrollLeft += P), N())
      }
      function R(q, P) {
        const j = P === 'left' ? -40 : 40,
          oe = q instanceof TouchEvent || (q instanceof MouseEvent && q.button === 0)
        u = window.setInterval(() => {
          a.value && oe && (a.value.scrollLeft += j)
        }, 100)
      }
      function N() {
        u !== null && (clearInterval(u), (u = null))
      }
      function W(q) {
        const P = o.value,
          j = a.value
        if (!P || !j) return
        const { left: oe, right: U, width: H } = P.getBoundingClientRect()
        q.pageX > U ? (j.scrollLeft += H * 0.95) : q.pageX < oe && (j.scrollLeft -= H * 0.95)
      }
      return (q, P) => (
        c(),
        h('div', Kw, [
          p(
            'section',
            {
              ref_key: 'scrollerRef',
              ref: a,
              class: 'agds-table-scroller__region',
              'aria-label': i.value || void 0,
              tabindex: f.value ? 0 : -1,
              onScroll: g,
            },
            [
              A(q.$slots, 'default', {}, void 0, !0),
              p(
                'div',
                {
                  class: I([
                    'agds-table-scroller__shadow agds-table-scroller__shadow--left',
                    m.value && 'agds-table-scroller__shadow--visible',
                  ]),
                  style: xe({ height: `${n.value}px` }),
                  'aria-hidden': 'true',
                },
                null,
                6,
              ),
              p(
                'div',
                {
                  class: I([
                    'agds-table-scroller__shadow agds-table-scroller__shadow--right',
                    _.value && 'agds-table-scroller__shadow--visible',
                  ]),
                  style: xe({ height: `${n.value}px` }),
                  'aria-hidden': 'true',
                },
                null,
                6,
              ),
            ],
            40,
            Zw,
          ),
          p(
            'div',
            {
              class: 'agds-table-scroller__bar',
              style: xe({ display: f.value ? void 0 : 'none' }),
            },
            [
              p(
                'button',
                {
                  type: 'button',
                  class: 'agds-table-scroller__arrow',
                  tabindex: '-1',
                  'aria-hidden': 'true',
                  onClick: P[0] || (P[0] = (j) => L('left')),
                  onMousedown: P[1] || (P[1] = (j) => R(j, 'left')),
                  onMouseleave: N,
                  onMouseup: N,
                  onTouchstartPassive: P[2] || (P[2] = (j) => R(j, 'left')),
                  onTouchend: N,
                },
                [
                  ...(P[6] ||
                    (P[6] = [
                      p(
                        'svg',
                        {
                          width: '16',
                          height: '16',
                          viewBox: '0 0 16 16',
                          fill: 'none',
                          'aria-hidden': 'true',
                          focusable: 'false',
                        },
                        [
                          p('path', {
                            d: 'M10 3L5 8L10 13',
                            stroke: 'currentColor',
                            'stroke-width': '1.5',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                          }),
                        ],
                        -1,
                      ),
                    ])),
                ],
                32,
              ),
              p(
                'div',
                {
                  ref_key: 'trackRef',
                  ref: t,
                  class: 'agds-table-scroller__track',
                  tabindex: '-1',
                  'aria-hidden': 'true',
                  onClick: W,
                },
                [
                  p(
                    'button',
                    {
                      ref_key: 'thumbRef',
                      ref: o,
                      type: 'button',
                      class: 'agds-table-scroller__thumb',
                      tabindex: '-1',
                      'aria-hidden': 'true',
                      style: xe({ left: `${r.value}px`, width: `${d.value * 100}%` }),
                      onMousedown: S,
                      onTouchstart: Ce(S, ['prevent']),
                    },
                    null,
                    36,
                  ),
                ],
                512,
              ),
              p(
                'button',
                {
                  type: 'button',
                  class: 'agds-table-scroller__arrow',
                  tabindex: '-1',
                  'aria-hidden': 'true',
                  onClick: P[3] || (P[3] = (j) => L('right')),
                  onMousedown: P[4] || (P[4] = (j) => R(j, 'right')),
                  onMouseleave: N,
                  onMouseup: N,
                  onTouchstartPassive: P[5] || (P[5] = (j) => R(j, 'right')),
                  onTouchend: N,
                },
                [
                  ...(P[7] ||
                    (P[7] = [
                      p(
                        'svg',
                        {
                          width: '16',
                          height: '16',
                          viewBox: '0 0 16 16',
                          fill: 'none',
                          'aria-hidden': 'true',
                          focusable: 'false',
                        },
                        [
                          p('path', {
                            d: 'M6 3L11 8L6 13',
                            stroke: 'currentColor',
                            'stroke-width': '1.5',
                            'stroke-linecap': 'round',
                            'stroke-linejoin': 'round',
                          }),
                        ],
                        -1,
                      ),
                    ])),
                ],
                32,
              ),
            ],
            4,
          ),
        ])
      )
    },
  }),
  Xw = F(Yw, [['__scopeId', 'data-v-7aa60f5f']]),
  f2 = {
    install(e) {
      ;(e.component('AgDSCore', fc),
        e.component('AgDSCoreProvider', On),
        e.component('AgDSBox', qn),
        e.component('AgDSFlex', Ut),
        e.component('AgDSColumns', _c),
        e.component('AgDSColumn', kc),
        e.component('AgDSFormStack', En),
        e.component('AgDSStack', wa),
        e.component('AgDSBreadcrumbs', Pf),
        e.component('AgDSBreadcrumbsItem', ba),
        e.component('AgDSButton', Mt),
        e.component('AgDSButtonLink', Zf),
        e.component('AgDSToggleButton', Yf),
        e.component('AgDSAccordion', Qf),
        e.component('AgDSAccordionItem', ap),
        e.component('AgDSAvatar', ip),
        e.component('AgDSCallout', cp),
        e.component('AgDSGlobalAlert', _p),
        e.component('AgDSSectionAlert', Fp),
        e.component('AgDSPageAlert', vg),
        e.component('AgDSCard', hg),
        e.component('AgDSCardHeader', yg),
        e.component('AgDSCardFooter', kg),
        e.component('AgDSCardInner', Sg),
        e.component('AgDSCardLink', Cg),
        e.component('AgDSDetails', Og),
        e.component('AgDSTag', Zn),
        e.component('AgDSTags', Tg),
        e.component('AgDSFooter', Vg),
        e.component('AgDSFooterDivider', Wg),
        e.component('AgDSHeader', nv),
        e.component('AgDSDivider', ai),
        e.component('AgDSHeading', kt),
        e.component('AgDSH1', Wv),
        e.component('AgDSH2', Hv),
        e.component('AgDSH3', jv),
        e.component('AgDSH4', Gv),
        e.component('AgDSH5', zv),
        e.component('AgDSH6', Uv),
        e.component('AgDSFeatureLinkList', am),
        e.component('AgDSFeatureLinkListItem', oi),
        e.component('AgDSLinkList', rm),
        e.component('AgDSLinkListItem', li),
        e.component('AgDSIcon', De),
        e.component('AgDSUnorderedList', um),
        e.component('AgDSOrderedList', fm),
        e.component('AgDSListItem', vm),
        e.component('AgDSText', ni),
        e.component('AgDSTable', $w),
        e.component('AgDSTableBody', Mw),
        e.component('AgDSTableCaption', Fw),
        e.component('AgDSTableHead', Pw),
        e.component('AgDSTableHeader', Rw),
        e.component('AgDSTableHeaderSortable', Ww),
        e.component('AgDSTableCell', jw),
        e.component('AgDSTableRow', Uw),
        e.component('AgDSTableScroller', Xw),
        e.component('AgDSAppLayout', Yk),
        e.component('AgDSAppLayoutHeader', tw),
        e.component('AgDSAppLayoutSidebar', kw),
        e.component('AgDSAppLayoutSidebarNav', xo),
        e.component('AgDSAppLayoutFooter', xw),
        e.component('AgDSAppLayoutFooterDivider', Cw),
        e.component('AgDSSideNav', O1),
        e.component('AgDSCollapsingSideBar', bi),
        e.component('AgDSFilterSidebar', H1),
        e.component('AgDSSubNav', Z1),
        e.component('AgDSMainNav', y1),
        e.component('AgDSModal', eh),
        e.component('AgDSDrawer', nh),
        e.component('AgDSTabs', sh),
        e.component('AgDSTabList', dh),
        e.component('AgDSTab', fh),
        e.component('AgDSTabPanel', gh),
        e.component('AgDSPagination', Lm),
        e.component('AgDSPaginationButtons', Ym),
        e.component('AgDSCheckbox', di),
        e.component('AgDSCheckboxGroup', Bh),
        e.component('AgDSSwitch', jh),
        e.component('AgDSRadio', Zh),
        e.component('AgDSRadioGroup', ob),
        e.component('AgDSCombobox', Cb),
        e.component('AgDSComboboxMulti', Ob),
        e.component('AgDSComboboxAsync', ci),
        e.component('AgDSComboboxAsyncMulti', Jb),
        e.component('AgDSAutocomplete', ey),
        e.component('AgDSDatePicker', Gy),
        e.component('AgDSField', ze),
        e.component('AgDSFieldContainer', za),
        e.component('AgDSFieldLabel', Ua),
        e.component('AgDSFieldHint', Ka),
        e.component('AgDSFieldMessage', Za),
        e.component('AgDSFieldset', Jy),
        e.component('AgDSGroupedFields', o_),
        e.component('AgDSCallToActionLink', sb),
        e.component('AgDSCallToActionButton', pb),
        e.component('AgDSDirectionLink', hb),
        e.component('AgDSDirectionButton', xb),
        e.component('AgDSVisuallyHidden', Aa),
        e.component('AgDSExternalLinkCallout', yi),
        e.component('AgDSTextLink', Ya),
        e.component('AgDSTextLinkExternal', ok),
        e.component('AgDSInpageNav', dk),
        e.component('AgDSContent', ck),
        e.component('AgDSSectionContent', fk),
        e.component('AgDSPageContent', pk),
        e.component('AgDSContentBleed', vk),
        e.component('AgDSProse', mk),
        e.component('AgDSSkipLinks', _k),
        e.component('AgDSSummaryList', zp),
        e.component('AgDSSummaryListItem', Zp),
        e.component('AgDSSummaryListItemTerm', Qp),
        e.component('AgDSSummaryListItemDescription', tg),
        e.component('AgDSSummaryListItemAction', lg),
        e.component('AgDSProgressIndicator', Gk),
        e.component('AgDSLoadingBlanket', J1),
        e.component('AgDSNotificationBadge', tk),
        e.component('AgDSDropdownMenu', Qn),
        e.component('AgDSDropdownMenuButton', Jn),
        e.component('AgDSDropdownMenuPanel', ei),
        e.component('AgDSDropdownMenuItem', yv),
        e.component('AgDSDropdownMenuItemLink', ti),
        e.component('AgDSDropdownMenuItemRadio', Mv),
        e.component('AgDSDropdownMenuGroup', Lv),
        e.component('AgDSDropdownMenuDivider', Vv),
        e.component('AgDSSearchBox', wk),
        e.component('AgDSSearchBoxInput', Dk),
        e.component('AgDSSearchBoxButton', Mk),
        e.component('AgDSFileUpload', i0),
        e.component('AgDSTextInput', d0),
        e.component('AgDSTextarea', x0),
        e.component('AgDSSearchInput', B0),
        e.component('AgDSSelect', q0),
        e.component('AgDSTimeInput', g0),
        e.component('AgDSTimePicker', _0))
    },
  }
export {
  Qf as AgDSAccordion,
  ap as AgDSAccordionItem,
  Yk as AgDSAppLayout,
  xw as AgDSAppLayoutFooter,
  Cw as AgDSAppLayoutFooterDivider,
  tw as AgDSAppLayoutHeader,
  kw as AgDSAppLayoutSidebar,
  xo as AgDSAppLayoutSidebarNav,
  ey as AgDSAutocomplete,
  ip as AgDSAvatar,
  qn as AgDSBox,
  Pf as AgDSBreadcrumbs,
  ba as AgDSBreadcrumbsItem,
  Mt as AgDSButton,
  Zf as AgDSButtonLink,
  pb as AgDSCallToActionButton,
  sb as AgDSCallToActionLink,
  cp as AgDSCallout,
  hg as AgDSCard,
  kg as AgDSCardFooter,
  yg as AgDSCardHeader,
  Sg as AgDSCardInner,
  Cg as AgDSCardLink,
  di as AgDSCheckbox,
  Bh as AgDSCheckboxGroup,
  bi as AgDSCollapsingSideBar,
  kc as AgDSColumn,
  _c as AgDSColumns,
  Cb as AgDSCombobox,
  ci as AgDSComboboxAsync,
  Jb as AgDSComboboxAsyncMulti,
  Ob as AgDSComboboxMulti,
  ck as AgDSContent,
  vk as AgDSContentBleed,
  i2 as AgDSControlGroup,
  fc as AgDSCore,
  On as AgDSCoreProvider,
  Gy as AgDSDatePicker,
  Og as AgDSDetails,
  xb as AgDSDirectionButton,
  hb as AgDSDirectionLink,
  ai as AgDSDivider,
  nh as AgDSDrawer,
  Qn as AgDSDropdownMenu,
  Jn as AgDSDropdownMenuButton,
  Vv as AgDSDropdownMenuDivider,
  Lv as AgDSDropdownMenuGroup,
  yv as AgDSDropdownMenuItem,
  ti as AgDSDropdownMenuItemLink,
  Mv as AgDSDropdownMenuItemRadio,
  ei as AgDSDropdownMenuPanel,
  yi as AgDSExternalLinkCallout,
  am as AgDSFeatureLinkList,
  oi as AgDSFeatureLinkListItem,
  ze as AgDSField,
  za as AgDSFieldContainer,
  Ka as AgDSFieldHint,
  Ua as AgDSFieldLabel,
  Za as AgDSFieldMessage,
  Jy as AgDSFieldset,
  d2 as AgDSFileInput,
  i0 as AgDSFileUpload,
  H1 as AgDSFilterSidebar,
  Ut as AgDSFlex,
  Vg as AgDSFooter,
  Wg as AgDSFooterDivider,
  En as AgDSFormStack,
  _p as AgDSGlobalAlert,
  o_ as AgDSGroupedFields,
  Wv as AgDSH1,
  Hv as AgDSH2,
  jv as AgDSH3,
  Gv as AgDSH4,
  zv as AgDSH5,
  Uv as AgDSH6,
  nv as AgDSHeader,
  kt as AgDSHeading,
  De as AgDSIcon,
  dk as AgDSInpageNav,
  rm as AgDSLinkList,
  li as AgDSLinkListItem,
  vm as AgDSListItem,
  J1 as AgDSLoadingBlanket,
  y1 as AgDSMainNav,
  eh as AgDSModal,
  tk as AgDSNotificationBadge,
  fm as AgDSOrderedList,
  vg as AgDSPageAlert,
  pk as AgDSPageContent,
  Lm as AgDSPagination,
  Ym as AgDSPaginationButtons,
  u2 as AgDSPasswordInput,
  Gk as AgDSProgressIndicator,
  mk as AgDSProse,
  Zh as AgDSRadio,
  ob as AgDSRadioGroup,
  wk as AgDSSearchBox,
  Mk as AgDSSearchBoxButton,
  Dk as AgDSSearchBoxInput,
  B0 as AgDSSearchInput,
  Fp as AgDSSectionAlert,
  fk as AgDSSectionContent,
  q0 as AgDSSelect,
  O1 as AgDSSideNav,
  _k as AgDSSkipLinks,
  wa as AgDSStack,
  n2 as AgDSStatusBadge,
  Z1 as AgDSSubNav,
  zp as AgDSSummaryList,
  Zp as AgDSSummaryListItem,
  lg as AgDSSummaryListItemAction,
  tg as AgDSSummaryListItemDescription,
  Qp as AgDSSummaryListItemTerm,
  jh as AgDSSwitch,
  fh as AgDSTab,
  dh as AgDSTabList,
  gh as AgDSTabPanel,
  $w as AgDSTable,
  Mw as AgDSTableBody,
  Fw as AgDSTableCaption,
  jw as AgDSTableCell,
  Pw as AgDSTableHead,
  Rw as AgDSTableHeader,
  Ww as AgDSTableHeaderSortable,
  Uw as AgDSTableRow,
  Xw as AgDSTableScroller,
  sh as AgDSTabs,
  Zn as AgDSTag,
  Tg as AgDSTags,
  c2 as AgDSTaskList,
  z0 as AgDSTaskListItem,
  ni as AgDSText,
  d0 as AgDSTextInput,
  Ya as AgDSTextLink,
  ok as AgDSTextLinkExternal,
  x0 as AgDSTextarea,
  g0 as AgDSTimeInput,
  _0 as AgDSTimePicker,
  Yf as AgDSToggleButton,
  um as AgDSUnorderedList,
  Aa as AgDSVisuallyHidden,
  f2 as AgDSVue,
  ri as CHECKBOX_GROUP_KEY,
  Th as CONTROL_GROUP_KEY,
  Ku as CORE_CONTEXT_KEY,
  r2 as GROUPED_FIELDS_DATA_ATTR,
  ui as RADIO_GROUP_KEY,
  u0 as acceptedTimeFormats,
  Xu as boxPalette,
  Yu as boxPalettes,
  yc as breakpointNames,
  f2 as default,
  Xo as filterOptions,
  Dl as fontGrid,
  Wt as formatFileSize,
  Pt as formatTime,
  h0 as generateOptions,
  Sl as goldTheme,
  o2 as mapResponsiveProp,
  pa as mapSpacing,
  l2 as mediaQueryMin,
  Al as mergeTheme,
  a2 as packs,
  bc as print,
  Zu as printTheme,
  Cl as themeToVars,
  ue as themeVars,
  bt as tokens,
  Gl as transformValuePropToInputValue,
  t2 as useBoxPalette,
  ii as usePagination,
  s2 as useScrollToField,
}

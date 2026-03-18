const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      './D5fp0dXY.js',
      './CQR9mWth.js',
      './Czyq2uHh.js',
      './entry.BPU6Aw-K.css',
      './L_-tUwUu.js',
      './BlTzH5tI.js',
      './DocPreview.Bej5m1cK.css',
      './xRjg0Hs8.js',
      './BhtJejNf.js',
      './CeaMxp7B.js',
      './PaginationDemo.CPJPLdIt.css',
      './BwgS1Chx.js',
      './BlunWOg4.js',
      './ProsePre.WYYjQYdf.css',
      './DkCtV5Co.js',
    ]),
) => i.map((i) => d[i])
import {
  e as ue,
  m as oe,
  p as Ee,
  q as Be,
  s as Ie,
  l as P,
  x as ce,
  y as K,
  T as N,
  C as Fe,
  z as Ue,
  A as pe,
  B as L,
  D as He,
  o as k,
  f as X,
  u as C,
  n as de,
  E as je,
  G as ze,
  g as Ne,
  H as Ve,
  w as $e,
  a as _,
  t as F,
  c as T,
  j,
  F as re,
  r as ae,
  _ as qe,
} from './Czyq2uHh.js'
import { _ as We } from './IUsWvESh.js'
import { u as Ke, q as Xe } from './BlTzH5tI.js'
import { a as Ge } from './D8MhwIxN.js'
import './BpKGNSF3.js'
const Ye = /\d/,
  Ze = ['-', '_', '/', '.']
function Je(e = '') {
  if (!Ye.test(e)) return e !== e.toLowerCase()
}
function ge(e, t) {
  const n = Ze,
    o = []
  if (!e || typeof e != 'string') return o
  let r = '',
    a,
    s
  for (const m of e) {
    const d = n.includes(m)
    if (d === !0) {
      ;(o.push(r), (r = ''), (a = void 0))
      continue
    }
    const p = Je(m)
    if (s === !1) {
      if (a === !1 && p === !0) {
        ;(o.push(r), (r = m), (a = p))
        continue
      }
      if (a === !0 && p === !1 && r.length > 1) {
        const u = r.at(-1)
        ;(o.push(r.slice(0, Math.max(0, r.length - 1))), (r = u + m), (a = p))
        continue
      }
    }
    ;((r += m), (a = p), (s = d))
  }
  return (o.push(r), o)
}
function Qe(e) {
  return e ? e[0].toUpperCase() + e.slice(1) : ''
}
function E(e, t) {
  return e ? (Array.isArray(e) ? e : ge(e)).map((n) => Qe(n)).join('') : ''
}
function me(e, t) {
  return e ? (Array.isArray(e) ? e : ge(e)).map((n) => n.toLowerCase()).join('-') : ''
}
function en(e) {
  return { type: 'root', children: e.value.map(fe) }
}
function fe(e) {
  if (typeof e == 'string') return { type: 'text', value: e }
  const [t, n, ...o] = e
  return { type: 'element', tag: t, props: n, children: o.map(fe) }
}
const G = new Set([
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'math',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rb',
  'rp',
  'rt',
  'rtc',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'svg',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
])
class z {
  constructor(t, n, o) {
    ;((this.normal = n), (this.property = t), o && (this.space = o))
  }
}
z.prototype.normal = {}
z.prototype.property = {}
z.prototype.space = void 0
function he(e, t) {
  const n = {},
    o = {}
  for (const r of e) (Object.assign(n, r.property), Object.assign(o, r.normal))
  return new z(n, o, t)
}
function Y(e) {
  return e.toLowerCase()
}
class v {
  constructor(t, n) {
    ;((this.attribute = n), (this.property = t))
  }
}
v.prototype.attribute = ''
v.prototype.booleanish = !1
v.prototype.boolean = !1
v.prototype.commaOrSpaceSeparated = !1
v.prototype.commaSeparated = !1
v.prototype.defined = !1
v.prototype.mustUseProperty = !1
v.prototype.number = !1
v.prototype.overloadedBoolean = !1
v.prototype.property = ''
v.prototype.spaceSeparated = !1
v.prototype.space = void 0
let nn = 0
const i = B(),
  A = B(),
  Z = B(),
  l = B(),
  f = B(),
  U = B(),
  D = B()
function B() {
  return 2 ** ++nn
}
const J = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: i,
        booleanish: A,
        commaOrSpaceSeparated: D,
        commaSeparated: U,
        number: l,
        overloadedBoolean: Z,
        spaceSeparated: f,
      },
      Symbol.toStringTag,
      { value: 'Module' },
    ),
  ),
  W = Object.keys(J)
class ne extends v {
  constructor(t, n, o, r) {
    let a = -1
    if ((super(t, n), ie(this, 'space', r), typeof o == 'number'))
      for (; ++a < W.length; ) {
        const s = W[a]
        ie(this, W[a], (o & J[s]) === J[s])
      }
  }
}
ne.prototype.defined = !0
function ie(e, t, n) {
  n && (e[t] = n)
}
function H(e) {
  const t = {},
    n = {}
  for (const [o, r] of Object.entries(e.properties)) {
    const a = new ne(o, e.transform(e.attributes || {}, o), r, e.space)
    ;(e.mustUseProperty && e.mustUseProperty.includes(o) && (a.mustUseProperty = !0),
      (t[o] = a),
      (n[Y(o)] = o),
      (n[Y(a.attribute)] = o))
  }
  return new z(t, n, e.space)
}
const Ae = H({
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: A,
    ariaAutoComplete: null,
    ariaBusy: A,
    ariaChecked: A,
    ariaColCount: l,
    ariaColIndex: l,
    ariaColSpan: l,
    ariaControls: f,
    ariaCurrent: null,
    ariaDescribedBy: f,
    ariaDetails: null,
    ariaDisabled: A,
    ariaDropEffect: f,
    ariaErrorMessage: null,
    ariaExpanded: A,
    ariaFlowTo: f,
    ariaGrabbed: A,
    ariaHasPopup: null,
    ariaHidden: A,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: f,
    ariaLevel: l,
    ariaLive: null,
    ariaModal: A,
    ariaMultiLine: A,
    ariaMultiSelectable: A,
    ariaOrientation: null,
    ariaOwns: f,
    ariaPlaceholder: null,
    ariaPosInSet: l,
    ariaPressed: A,
    ariaReadOnly: A,
    ariaRelevant: null,
    ariaRequired: A,
    ariaRoleDescription: f,
    ariaRowCount: l,
    ariaRowIndex: l,
    ariaRowSpan: l,
    ariaSelected: A,
    ariaSetSize: l,
    ariaSort: null,
    ariaValueMax: l,
    ariaValueMin: l,
    ariaValueNow: l,
    ariaValueText: null,
    role: null,
  },
  transform(e, t) {
    return t === 'role' ? t : 'aria-' + t.slice(4).toLowerCase()
  },
})
function ye(e, t) {
  return t in e ? e[t] : t
}
function Se(e, t) {
  return ye(e, t.toLowerCase())
}
const tn = H({
    attributes: {
      acceptcharset: 'accept-charset',
      classname: 'class',
      htmlfor: 'for',
      httpequiv: 'http-equiv',
    },
    mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
    properties: {
      abbr: null,
      accept: U,
      acceptCharset: f,
      accessKey: f,
      action: null,
      allow: null,
      allowFullScreen: i,
      allowPaymentRequest: i,
      allowUserMedia: i,
      alt: null,
      as: null,
      async: i,
      autoCapitalize: null,
      autoComplete: f,
      autoFocus: i,
      autoPlay: i,
      blocking: f,
      capture: null,
      charSet: null,
      checked: i,
      cite: null,
      className: f,
      cols: l,
      colSpan: null,
      content: null,
      contentEditable: A,
      controls: i,
      controlsList: f,
      coords: l | U,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: i,
      defer: i,
      dir: null,
      dirName: null,
      disabled: i,
      download: Z,
      draggable: A,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: i,
      formTarget: null,
      headers: f,
      height: l,
      hidden: Z,
      high: l,
      href: null,
      hrefLang: null,
      htmlFor: f,
      httpEquiv: f,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: i,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: i,
      itemId: null,
      itemProp: f,
      itemRef: f,
      itemScope: i,
      itemType: f,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: i,
      low: l,
      manifest: null,
      max: null,
      maxLength: l,
      media: null,
      method: null,
      min: null,
      minLength: l,
      multiple: i,
      muted: i,
      name: null,
      nonce: null,
      noModule: i,
      noValidate: i,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: i,
      optimum: l,
      pattern: null,
      ping: f,
      placeholder: null,
      playsInline: i,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: i,
      referrerPolicy: null,
      rel: f,
      required: i,
      reversed: i,
      rows: l,
      rowSpan: l,
      sandbox: f,
      scope: null,
      scoped: i,
      seamless: i,
      selected: i,
      shadowRootClonable: i,
      shadowRootDelegatesFocus: i,
      shadowRootMode: null,
      shape: null,
      size: l,
      sizes: null,
      slot: null,
      span: l,
      spellCheck: A,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: l,
      step: null,
      style: null,
      tabIndex: l,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: i,
      useMap: null,
      value: A,
      width: l,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: f,
      axis: null,
      background: null,
      bgColor: null,
      border: l,
      borderColor: null,
      bottomMargin: l,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: i,
      declare: i,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: l,
      leftMargin: l,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: l,
      marginWidth: l,
      noResize: i,
      noHref: i,
      noShade: i,
      noWrap: i,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: l,
      rules: null,
      scheme: null,
      scrolling: A,
      standby: null,
      summary: null,
      text: null,
      topMargin: l,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: l,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: i,
      disableRemotePlayback: i,
      prefix: null,
      property: null,
      results: l,
      security: null,
      unselectable: null,
    },
    space: 'html',
    transform: Se,
  }),
  ln = H({
    attributes: {
      accentHeight: 'accent-height',
      alignmentBaseline: 'alignment-baseline',
      arabicForm: 'arabic-form',
      baselineShift: 'baseline-shift',
      capHeight: 'cap-height',
      className: 'class',
      clipPath: 'clip-path',
      clipRule: 'clip-rule',
      colorInterpolation: 'color-interpolation',
      colorInterpolationFilters: 'color-interpolation-filters',
      colorProfile: 'color-profile',
      colorRendering: 'color-rendering',
      crossOrigin: 'crossorigin',
      dataType: 'datatype',
      dominantBaseline: 'dominant-baseline',
      enableBackground: 'enable-background',
      fillOpacity: 'fill-opacity',
      fillRule: 'fill-rule',
      floodColor: 'flood-color',
      floodOpacity: 'flood-opacity',
      fontFamily: 'font-family',
      fontSize: 'font-size',
      fontSizeAdjust: 'font-size-adjust',
      fontStretch: 'font-stretch',
      fontStyle: 'font-style',
      fontVariant: 'font-variant',
      fontWeight: 'font-weight',
      glyphName: 'glyph-name',
      glyphOrientationHorizontal: 'glyph-orientation-horizontal',
      glyphOrientationVertical: 'glyph-orientation-vertical',
      hrefLang: 'hreflang',
      horizAdvX: 'horiz-adv-x',
      horizOriginX: 'horiz-origin-x',
      horizOriginY: 'horiz-origin-y',
      imageRendering: 'image-rendering',
      letterSpacing: 'letter-spacing',
      lightingColor: 'lighting-color',
      markerEnd: 'marker-end',
      markerMid: 'marker-mid',
      markerStart: 'marker-start',
      navDown: 'nav-down',
      navDownLeft: 'nav-down-left',
      navDownRight: 'nav-down-right',
      navLeft: 'nav-left',
      navNext: 'nav-next',
      navPrev: 'nav-prev',
      navRight: 'nav-right',
      navUp: 'nav-up',
      navUpLeft: 'nav-up-left',
      navUpRight: 'nav-up-right',
      onAbort: 'onabort',
      onActivate: 'onactivate',
      onAfterPrint: 'onafterprint',
      onBeforePrint: 'onbeforeprint',
      onBegin: 'onbegin',
      onCancel: 'oncancel',
      onCanPlay: 'oncanplay',
      onCanPlayThrough: 'oncanplaythrough',
      onChange: 'onchange',
      onClick: 'onclick',
      onClose: 'onclose',
      onCopy: 'oncopy',
      onCueChange: 'oncuechange',
      onCut: 'oncut',
      onDblClick: 'ondblclick',
      onDrag: 'ondrag',
      onDragEnd: 'ondragend',
      onDragEnter: 'ondragenter',
      onDragExit: 'ondragexit',
      onDragLeave: 'ondragleave',
      onDragOver: 'ondragover',
      onDragStart: 'ondragstart',
      onDrop: 'ondrop',
      onDurationChange: 'ondurationchange',
      onEmptied: 'onemptied',
      onEnd: 'onend',
      onEnded: 'onended',
      onError: 'onerror',
      onFocus: 'onfocus',
      onFocusIn: 'onfocusin',
      onFocusOut: 'onfocusout',
      onHashChange: 'onhashchange',
      onInput: 'oninput',
      onInvalid: 'oninvalid',
      onKeyDown: 'onkeydown',
      onKeyPress: 'onkeypress',
      onKeyUp: 'onkeyup',
      onLoad: 'onload',
      onLoadedData: 'onloadeddata',
      onLoadedMetadata: 'onloadedmetadata',
      onLoadStart: 'onloadstart',
      onMessage: 'onmessage',
      onMouseDown: 'onmousedown',
      onMouseEnter: 'onmouseenter',
      onMouseLeave: 'onmouseleave',
      onMouseMove: 'onmousemove',
      onMouseOut: 'onmouseout',
      onMouseOver: 'onmouseover',
      onMouseUp: 'onmouseup',
      onMouseWheel: 'onmousewheel',
      onOffline: 'onoffline',
      onOnline: 'ononline',
      onPageHide: 'onpagehide',
      onPageShow: 'onpageshow',
      onPaste: 'onpaste',
      onPause: 'onpause',
      onPlay: 'onplay',
      onPlaying: 'onplaying',
      onPopState: 'onpopstate',
      onProgress: 'onprogress',
      onRateChange: 'onratechange',
      onRepeat: 'onrepeat',
      onReset: 'onreset',
      onResize: 'onresize',
      onScroll: 'onscroll',
      onSeeked: 'onseeked',
      onSeeking: 'onseeking',
      onSelect: 'onselect',
      onShow: 'onshow',
      onStalled: 'onstalled',
      onStorage: 'onstorage',
      onSubmit: 'onsubmit',
      onSuspend: 'onsuspend',
      onTimeUpdate: 'ontimeupdate',
      onToggle: 'ontoggle',
      onUnload: 'onunload',
      onVolumeChange: 'onvolumechange',
      onWaiting: 'onwaiting',
      onZoom: 'onzoom',
      overlinePosition: 'overline-position',
      overlineThickness: 'overline-thickness',
      paintOrder: 'paint-order',
      panose1: 'panose-1',
      pointerEvents: 'pointer-events',
      referrerPolicy: 'referrerpolicy',
      renderingIntent: 'rendering-intent',
      shapeRendering: 'shape-rendering',
      stopColor: 'stop-color',
      stopOpacity: 'stop-opacity',
      strikethroughPosition: 'strikethrough-position',
      strikethroughThickness: 'strikethrough-thickness',
      strokeDashArray: 'stroke-dasharray',
      strokeDashOffset: 'stroke-dashoffset',
      strokeLineCap: 'stroke-linecap',
      strokeLineJoin: 'stroke-linejoin',
      strokeMiterLimit: 'stroke-miterlimit',
      strokeOpacity: 'stroke-opacity',
      strokeWidth: 'stroke-width',
      tabIndex: 'tabindex',
      textAnchor: 'text-anchor',
      textDecoration: 'text-decoration',
      textRendering: 'text-rendering',
      transformOrigin: 'transform-origin',
      typeOf: 'typeof',
      underlinePosition: 'underline-position',
      underlineThickness: 'underline-thickness',
      unicodeBidi: 'unicode-bidi',
      unicodeRange: 'unicode-range',
      unitsPerEm: 'units-per-em',
      vAlphabetic: 'v-alphabetic',
      vHanging: 'v-hanging',
      vIdeographic: 'v-ideographic',
      vMathematical: 'v-mathematical',
      vectorEffect: 'vector-effect',
      vertAdvY: 'vert-adv-y',
      vertOriginX: 'vert-origin-x',
      vertOriginY: 'vert-origin-y',
      wordSpacing: 'word-spacing',
      writingMode: 'writing-mode',
      xHeight: 'x-height',
      playbackOrder: 'playbackorder',
      timelineBegin: 'timelinebegin',
    },
    properties: {
      about: D,
      accentHeight: l,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: l,
      amplitude: l,
      arabicForm: null,
      ascent: l,
      attributeName: null,
      attributeType: null,
      azimuth: l,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: l,
      by: null,
      calcMode: null,
      capHeight: l,
      className: f,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: l,
      diffuseConstant: l,
      direction: null,
      display: null,
      dur: null,
      divisor: l,
      dominantBaseline: null,
      download: i,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: l,
      enableBackground: null,
      end: null,
      event: null,
      exponent: l,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: l,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: U,
      g2: U,
      glyphName: U,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: l,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: l,
      horizOriginX: l,
      horizOriginY: l,
      id: null,
      ideographic: l,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: l,
      k: l,
      k1: l,
      k2: l,
      k3: l,
      k4: l,
      kernelMatrix: D,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: l,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: l,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: l,
      overlineThickness: l,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: l,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: f,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: l,
      pointsAtY: l,
      pointsAtZ: l,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: D,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: D,
      rev: D,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: D,
      requiredFeatures: D,
      requiredFonts: D,
      requiredFormats: D,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: l,
      specularExponent: l,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: l,
      strikethroughThickness: l,
      string: null,
      stroke: null,
      strokeDashArray: D,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: l,
      strokeOpacity: l,
      strokeWidth: null,
      style: null,
      surfaceScale: l,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: D,
      tabIndex: l,
      tableValues: null,
      target: null,
      targetX: l,
      targetY: l,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: D,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: l,
      underlineThickness: l,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: l,
      values: null,
      vAlphabetic: l,
      vMathematical: l,
      vectorEffect: null,
      vHanging: l,
      vIdeographic: l,
      version: null,
      vertAdvY: l,
      vertOriginX: l,
      vertOriginY: l,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: l,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
    space: 'svg',
    transform: ye,
  }),
  ve = H({
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
    space: 'xlink',
    transform(e, t) {
      return 'xlink:' + t.slice(5).toLowerCase()
    },
  }),
  be = H({
    attributes: { xmlnsxlink: 'xmlns:xlink' },
    properties: { xmlnsXLink: null, xmlns: null },
    space: 'xmlns',
    transform: Se,
  }),
  De = H({
    properties: { xmlBase: null, xmlLang: null, xmlSpace: null },
    space: 'xml',
    transform(e, t) {
      return 'xml:' + t.slice(3).toLowerCase()
    },
  }),
  on = /[A-Z]/g,
  se = /-[a-z]/g,
  rn = /^data[-\w.:]+$/i
function an(e, t) {
  const n = Y(t)
  let o = t,
    r = v
  if (n in e.normal) return e.property[e.normal[n]]
  if (n.length > 4 && n.slice(0, 4) === 'data' && rn.test(t)) {
    if (t.charAt(4) === '-') {
      const a = t.slice(5).replace(se, un)
      o = 'data' + a.charAt(0).toUpperCase() + a.slice(1)
    } else {
      const a = t.slice(4)
      if (!se.test(a)) {
        let s = a.replace(on, sn)
        ;(s.charAt(0) !== '-' && (s = '-' + s), (t = 'data' + s))
      }
    }
    r = ne
  }
  return new r(o, t)
}
function sn(e) {
  return '-' + e.toLowerCase()
}
function un(e) {
  return e.charAt(1).toUpperCase()
}
const cn = he([Ae, tn, ve, be, De], 'html')
he([Ae, ln, ve, be, De], 'svg')
const pn = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li']
function V(e, t) {
  return e.type === t || (typeof e.type == 'object' && e.type.tag === t) || e.tag === t
}
function te(e) {
  return V(e, 'text') || V(e, Symbol.for('v-txt'))
}
function Ce(e) {
  return Array.isArray(e.children) || typeof e.children == 'string'
    ? e.children
    : typeof e.children?.default == 'function'
      ? e.children.default()
      : []
}
function $(e) {
  if (!e) return ''
  if (Array.isArray(e)) return e.map($).join('')
  if (te(e)) return e.value || e.children || ''
  const t = Ce(e)
  return Array.isArray(t) ? t.map($).filter(Boolean).join('') : ''
}
function _e(e, t = []) {
  if (Array.isArray(e)) return e.flatMap((o) => _e(o, t))
  let n = e
  return (
    t.some((o) => o === '*' || V(e, o)) &&
      ((n = Ce(e) || e), !Array.isArray(n) && pn.some((o) => V(e, o)) && (n = [n])),
    n
  )
}
function ke(e, t = []) {
  return (
    (e = Array.isArray(e) ? e : [e]),
    t.length
      ? e
          .flatMap((n) => ke(_e(n, [t[0]]), t.slice(1)))
          .filter((n) => !(te(n) && $(n).trim() === ''))
      : e
  )
}
function xe(e, t = []) {
  return (
    typeof t == 'string' &&
      (t = t
        .split(/[,\s]/)
        .map((n) => n.trim())
        .filter(Boolean)),
    t.length
      ? ke(e, t).reduce(
          (n, o) => (
            te(o)
              ? typeof n[n.length - 1] == 'string'
                ? (n[n.length - 1] += o.children)
                : n.push(o.children)
              : n.push(o),
            n
          ),
          [],
        )
      : e
  )
}
function dn(e, t) {
  return t.reduce((n, o) => {
    const r = gn(e, o)
    return (r !== void 0 && (n[o] = r), n)
  }, {})
}
function gn(e, t) {
  return t.split('.').reduce((n, o) => n && n[o], e)
}
const Q = 'default',
  Pe = /^@|^v-on:/,
  we = /^:|^v-bind:/,
  mn = /^v-model/,
  fn = ['select', 'textarea', 'input'],
  hn = new Set(['math', 'svg']),
  Le = new Set(),
  An = Object.fromEntries(
    [
      'p',
      'a',
      'blockquote',
      'code',
      'pre',
      'code',
      'em',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'hr',
      'img',
      'ul',
      'ol',
      'li',
      'strong',
      'table',
      'thead',
      'tbody',
      'td',
      'th',
      'tr',
      'script',
    ].map((e) => [e, `prose-${e}`]),
  ),
  yn = ['script', 'base'],
  Sn = ue({
    name: 'MDCRenderer',
    props: {
      body: { type: Object, required: !0 },
      data: { type: Object, default: () => ({}) },
      class: { type: [String, Object], default: void 0 },
      tag: { type: [String, Boolean], default: void 0 },
      prose: { type: Boolean, default: void 0 },
      components: { type: Object, default: () => ({}) },
      unwrap: { type: [Boolean, String], default: !1 },
    },
    async setup(e) {
      const n = Ee()?.appContext?.app?.$nuxt,
        o = n?.$route || n?._route,
        { mdc: r } = n?.$config?.public || {},
        a = r?.components?.customElements || r?.components?.custom
      a && a.forEach((u) => Le.add(u))
      const s = P(() => ({
          ...(r?.components?.prose && e.prose !== !1 ? An : {}),
          ...(r?.components?.map || {}),
          ...pe(e.data?.mdc?.components || {}),
          ...e.components,
        })),
        m = P(() => {
          const u = (e.body?.children || []).map((g) => g.tag || g.type).filter((g) => !le(g))
          return Array.from(new Set(u)).sort().join('.')
        }),
        d = Be({ ...e.data })
      ;(Ie(
        () => e.data,
        (u) => {
          Object.assign(d, u)
        },
      ),
        await Tn(e.body, { tags: s.value }))
      function p(u, g) {
        const S = u.split('.').length - 1
        return u
          .split('.')
          .reduce(
            (b, w, M) => (M == S && b ? ((b[w] = g), b[w]) : typeof b == 'object' ? b[w] : void 0),
            d,
          )
      }
      return { tags: s, contentKey: m, route: o, runtimeData: d, updateRuntimeData: p }
    },
    render(e) {
      const {
        tags: t,
        tag: n,
        body: o,
        data: r,
        contentKey: a,
        route: s,
        unwrap: m,
        runtimeData: d,
        updateRuntimeData: p,
      } = e
      if (!o) return null
      const u = { ...r, tags: t, $route: s, runtimeData: d, updateRuntimeData: p },
        g = n !== !1 ? ee(n || u.component?.name || u.component || 'div') : void 0
      return g
        ? oe(g, { ...u.component?.props, class: e.class, ...this.$attrs, key: a }, { default: S })
        : S?.()
      function S() {
        const b = Te(o, oe, { documentMeta: u, parentScope: u, resolveComponent: ee })
        return b?.default
          ? m
            ? xe(b.default(), typeof m == 'string' ? m.split(' ') : ['*'])
            : b.default()
          : null
      }
    },
  })
function vn(e, t, n, o) {
  const { documentMeta: r, parentScope: a, resolveComponent: s } = n
  if (e.type === 'text') return t(N, e.value)
  if (e.type === 'comment') return t(Fe, null, e.value)
  const m = e.tag,
    d = Me(e, r.tags)
  if (e.tag === 'binding') return bn(e, t, r, a)
  const p = Oe(d) ? (S) => S : s
  if (yn.includes(E(d).toLowerCase()))
    return t('pre', { class: 'mdc-renderer-dangerous-tag' }, '<' + d + '>' + $(e) + '</' + d + '>')
  const u = p(d)
  typeof u == 'object' && (u.tag = m)
  const g = Dn(e, r)
  return (
    o && (g.key = o),
    t(u, g, Te(e, t, { documentMeta: r, parentScope: { ...a, ...g }, resolveComponent: p }))
  )
}
function Te(e, t, n) {
  const { documentMeta: o, parentScope: r, resolveComponent: a } = n,
    m = (e.children || []).reduce(
      (p, u) => {
        if (!wn(u)) return (p[Q].children.push(u), p)
        const g = Pn(u)
        return (
          (p[g] = p[g] || { props: {}, children: [] }),
          u.type === 'element' &&
            ((p[g].props = u.props), p[g].children.push(...(u.children || []))),
          p
        )
      },
      { [Q]: { props: {}, children: [] } },
    )
  return Object.entries(m).reduce(
    (p, [u, { props: g, children: S }]) => (
      S.length &&
        (p[u] = (b = {}) => {
          const w = dn(b, Object.keys(g || {}))
          let M = S.map((c, h) =>
            vn(
              c,
              t,
              { documentMeta: o, parentScope: { ...r, ...w }, resolveComponent: a },
              String(c.props?.key || h),
            ),
          )
          return (g?.unwrap && (M = xe(M, g.unwrap)), Ln(M))
        }),
      p
    ),
    {},
  )
}
function bn(e, t, n, o = {}) {
  const r = { ...n.runtimeData, ...o, $document: n, $doc: n },
    a = /\.|\[(\d+)\]/,
    m = e.props?.value
      .trim()
      .split(a)
      .filter(Boolean)
      .reduce((p, u) => {
        if (p && u in p) return typeof p[u] == 'function' ? p[u]() : p[u]
      }, r),
    d = e.props?.defaultValue
  return t(N, m ?? d ?? '')
}
function Dn(e, t) {
  const { tag: n = '', props: o = {} } = e
  return Object.keys(o).reduce(function (r, a) {
    if (a === '__ignoreMap') return r
    const s = o[a]
    if (mn.test(a)) return Cn(a, s, r, t, { native: fn.includes(n) })
    if (a === 'v-bind') return _n(a, s, r, t)
    if (Pe.test(a)) return kn(a, s, r, t)
    if (we.test(a)) return xn(a, s, r, t)
    const { attribute: m } = an(cn, a)
    return Array.isArray(s) && s.every((d) => typeof d == 'string')
      ? ((r[m] = s.join(' ')), r)
      : ((r[m] = s), r)
  }, {})
}
function Cn(e, t, n, o, { native: r }) {
  const a = e.match(/^v-model:([^=]+)/)?.[1] || 'modelValue',
    s = r ? 'value' : a,
    m = r ? 'onInput' : `onUpdate:${a}`
  return (
    (n[s] = q(t, o.runtimeData)),
    (n[m] = (d) => {
      o.updateRuntimeData(t, r ? d.target?.value : d)
    }),
    n
  )
}
function _n(e, t, n, o) {
  const r = q(t, o)
  return ((n = Object.assign(n, r)), n)
}
function kn(e, t, n, o) {
  return ((e = e.replace(Pe, '')), (n.on = n.on || {}), (n.on[e] = () => q(t, o)), n)
}
function xn(e, t, n, o) {
  return ((e = e.replace(we, '')), (n[e] = q(t, o)), n)
}
const ee = (e) => {
  if (typeof e == 'string') {
    if (le(e)) return e
    const t = ce(E(e), !1)
    return !e || t?.name === 'AsyncComponentWrapper' || typeof t == 'string'
      ? t
      : 'setup' in t
        ? K(() => new Promise((n) => n(t)))
        : t
  }
  return e
}
function q(e, t) {
  const n = e.split('.').reduce((o, r) => (typeof o == 'object' ? o[r] : void 0), t)
  return typeof n > 'u' ? Ue(e) : n
}
function Pn(e) {
  let t = ''
  for (const n of Object.keys(e.props || {}))
    if (!(!n.startsWith('#') && !n.startsWith('v-slot:'))) {
      t = n.split(/[:#]/, 2)[1]
      break
    }
  return t || Q
}
function wn(e) {
  return e.tag === 'template'
}
function Oe(e) {
  return hn.has(e)
}
function Ln(e) {
  const t = []
  for (const n of e) {
    const o = t[t.length - 1]
    n.type === N && o?.type === N ? (o.children = o.children + n.children) : t.push(n)
  }
  return t
}
async function Tn(e, t) {
  if (!e) return
  const n = Array.from(new Set(o(e, t)))
  await Promise.all(
    n.map(async (r) => {
      if (r?.render || r?.ssrRender || r?.__ssrInlineRender) return
      const a = ee(r)
      a?.__asyncLoader && !a.__asyncResolved && (await a.__asyncLoader())
    }),
  )
  function o(r, a) {
    const s = r.tag
    if (r.type === 'text' || s === 'binding' || r.type === 'comment') return []
    const m = Me(r, a.tags)
    if (Oe(m)) return []
    const d = []
    r.type !== 'root' && !le(m) && d.push(m)
    for (const p of r.children || []) d.push(...o(p, a))
    return d
  }
}
function Me(e, t) {
  const n = e.tag
  return !n || typeof e.props?.__ignoreMap < 'u' ? n : t[n] || t[E(n)] || t[me(e.tag)] || n
}
function le(e) {
  return (typeof e == 'string' ? Le.has(e) : !1) || G.has(e)
}
const On = Object.assign(Sn, { __name: 'MDCRenderer' }),
  O = (e, t, n, o) => {
    const r = t === 'default' ? e?.default : e?.[t]
    if (!r) throw new Error(`[nuxt-content] Missing export "${t}" for component "${n}" in "${o}".`)
    return r
  },
  Mn = {
    BreadcrumbsDemo: () =>
      L(() => import('./D5fp0dXY.js'), __vite__mapDeps([0, 1, 2, 3]), import.meta.url).then((e) =>
        O(
          e,
          'default',
          'BreadcrumbsDemo',
          './../../../../../app/components/content/BreadcrumbsDemo.vue',
        ),
      ),
    DocPreview: () =>
      L(() => import('./L_-tUwUu.js'), __vite__mapDeps([4, 5, 2, 3, 6]), import.meta.url).then(
        (e) =>
          O(e, 'default', 'DocPreview', './../../../../../app/components/content/DocPreview.vue'),
      ),
    FeatureLinkListDemo: () =>
      L(() => import('./xRjg0Hs8.js'), __vite__mapDeps([7, 1, 2, 3]), import.meta.url).then((e) =>
        O(
          e,
          'default',
          'FeatureLinkListDemo',
          './../../../../../app/components/content/FeatureLinkListDemo.vue',
        ),
      ),
    FilterSidebarDemo: () =>
      L(() => import('./BhtJejNf.js'), __vite__mapDeps([8, 1, 2, 3]), import.meta.url).then((e) =>
        O(
          e,
          'default',
          'FilterSidebarDemo',
          './../../../../../app/components/content/FilterSidebarDemo.vue',
        ),
      ),
    PaginationDemo: () =>
      L(() => import('./CeaMxp7B.js'), __vite__mapDeps([9, 1, 2, 3, 10]), import.meta.url).then(
        (e) =>
          O(
            e,
            'default',
            'PaginationDemo',
            './../../../../../app/components/content/PaginationDemo.vue',
          ),
      ),
    ProgressIndicatorDemo: () =>
      L(() => import('./BwgS1Chx.js'), __vite__mapDeps([11, 1, 2, 3]), import.meta.url).then((e) =>
        O(
          e,
          'default',
          'ProgressIndicatorDemo',
          './../../../../../app/components/content/ProgressIndicatorDemo.vue',
        ),
      ),
    ProsePre: () =>
      L(() => import('./BlunWOg4.js'), __vite__mapDeps([12, 2, 3, 13]), import.meta.url).then((e) =>
        O(e, 'default', 'ProsePre', './../../../../../app/components/content/ProsePre.vue'),
      ),
    SideNavDemo: () =>
      L(() => import('./DkCtV5Co.js'), __vite__mapDeps([14, 1, 2, 3]), import.meta.url).then((e) =>
        O(e, 'default', 'SideNavDemo', './../../../../../app/components/content/SideNavDemo.vue'),
      ),
  },
  Rn = [
    'ProseA',
    'ProseBlockquote',
    'ProseCode',
    'ProseEm',
    'ProseH1',
    'ProseH2',
    'ProseH3',
    'ProseH4',
    'ProseH5',
    'ProseH6',
    'ProseHr',
    'ProseImg',
    'ProseLi',
    'ProseOl',
    'ProseP',
    'ProseScript',
    'ProseStrong',
    'ProseTable',
    'ProseTbody',
    'ProseTd',
    'ProseTh',
    'ProseThead',
    'ProseTr',
    'ProseUl',
    'AgDSAccordion',
    'Agdsaccordion',
    'AgDSAccordionItem',
    'Agdsaccordionitem',
    'AgDSAppLayout',
    'Agdsapplayout',
    'AgDSAppLayoutFooter',
    'Agdsapplayoutfooter',
    'AgDSAppLayoutFooterDivider',
    'Agdsapplayoutfooterdivider',
    'AgDSAppLayoutHeader',
    'Agdsapplayoutheader',
    'AgDSAppLayoutSidebar',
    'Agdsapplayoutsidebar',
    'AgDSAppLayoutSidebarNav',
    'Agdsapplayoutsidebarnav',
    'AgDSAutocomplete',
    'Agdsautocomplete',
    'AgDSAvatar',
    'Agdsavatar',
    'AgDSBox',
    'Agdsbox',
    'AgDSBreadcrumbs',
    'Agdsbreadcrumbs',
    'AgDSBreadcrumbsItem',
    'Agdsbreadcrumbsitem',
    'AgDSButton',
    'Agdsbutton',
    'AgDSButtonLink',
    'Agdsbuttonlink',
    'AgDSCallout',
    'Agdscallout',
    'AgDSCallToActionButton',
    'Agdscalltoactionbutton',
    'AgDSCallToActionLink',
    'Agdscalltoactionlink',
    'AgDSCard',
    'Agdscard',
    'AgDSCardFooter',
    'Agdscardfooter',
    'AgDSCardHeader',
    'Agdscardheader',
    'AgDSCardInner',
    'Agdscardinner',
    'AgDSCardLink',
    'Agdscardlink',
    'AgDSCheckbox',
    'Agdscheckbox',
    'AgDSCheckboxGroup',
    'Agdscheckboxgroup',
    'AgDSCollapsingSideBar',
    'Agdscollapsingsidebar',
    'AgDSColumn',
    'Agdscolumn',
    'AgDSColumns',
    'Agdscolumns',
    'AgDSCombobox',
    'Agdscombobox',
    'AgDSComboboxAsync',
    'Agdscomboboxasync',
    'AgDSComboboxAsyncMulti',
    'Agdscomboboxasyncmulti',
    'AgDSComboboxMulti',
    'Agdscomboboxmulti',
    'AgDSContent',
    'Agdscontent',
    'AgDSContentBleed',
    'Agdscontentbleed',
    'AgDSCore',
    'Agdscore',
    'AgDSCoreProvider',
    'Agdscoreprovider',
    'AgDSDatePicker',
    'Agdsdatepicker',
    'AgDSDetails',
    'Agdsdetails',
    'AgDSDirectionButton',
    'Agdsdirectionbutton',
    'AgDSDirectionLink',
    'Agdsdirectionlink',
    'AgDSDivider',
    'Agdsdivider',
    'AgDSDrawer',
    'Agdsdrawer',
    'AgDSDropdownMenu',
    'Agdsdropdownmenu',
    'AgDSDropdownMenuButton',
    'Agdsdropdownmenubutton',
    'AgDSDropdownMenuDivider',
    'Agdsdropdownmenudivider',
    'AgDSDropdownMenuGroup',
    'Agdsdropdownmenugroup',
    'AgDSDropdownMenuItem',
    'Agdsdropdownmenuitem',
    'AgDSDropdownMenuItemLink',
    'Agdsdropdownmenuitemlink',
    'AgDSDropdownMenuItemRadio',
    'Agdsdropdownmenuitemradio',
    'AgDSDropdownMenuPanel',
    'Agdsdropdownmenupanel',
    'AgDSExternalLinkCallout',
    'Agdsexternallinkcallout',
    'AgDSFeatureLinkList',
    'Agdsfeaturelinklist',
    'AgDSFeatureLinkListItem',
    'Agdsfeaturelinklistitem',
    'AgDSField',
    'Agdsfield',
    'AgDSFieldContainer',
    'Agdsfieldcontainer',
    'AgDSFieldHint',
    'Agdsfieldhint',
    'AgDSFieldLabel',
    'Agdsfieldlabel',
    'AgDSFieldMessage',
    'Agdsfieldmessage',
    'AgDSFieldset',
    'Agdsfieldset',
    'AgDSFileUpload',
    'Agdsfileupload',
    'AgDSFilterSidebar',
    'Agdsfiltersidebar',
    'AgDSFlex',
    'Agdsflex',
    'AgDSFooter',
    'Agdsfooter',
    'AgDSFooterDivider',
    'Agdsfooterdivider',
    'AgDSFormStack',
    'Agdsformstack',
    'AgDSGlobalAlert',
    'Agdsglobalalert',
    'AgDSGroupedFields',
    'Agdsgroupedfields',
    'AgDSHeader',
    'Agdsheader',
    'AgDSHeading',
    'Agdsheading',
    'AgDSH1',
    'Agdsh1',
    'AgDSH2',
    'Agdsh2',
    'AgDSH3',
    'Agdsh3',
    'AgDSH4',
    'Agdsh4',
    'AgDSH5',
    'Agdsh5',
    'AgDSH6',
    'Agdsh6',
    'AgDSIcon',
    'Agdsicon',
    'AgDSInpageNav',
    'Agdsinpagenav',
    'AgDSLinkList',
    'Agdslinklist',
    'AgDSLinkListItem',
    'Agdslinklistitem',
    'AgDSListItem',
    'Agdslistitem',
    'AgDSLoadingBlanket',
    'Agdsloadingblanket',
    'AgDSMainNav',
    'Agdsmainnav',
    'AgDSModal',
    'Agdsmodal',
    'AgDSNotificationBadge',
    'Agdsnotificationbadge',
    'AgDSOrderedList',
    'Agdsorderedlist',
    'AgDSPageAlert',
    'Agdspagealert',
    'AgDSPageContent',
    'Agdspagecontent',
    'AgDSPagination',
    'Agdspagination',
    'AgDSPaginationButtons',
    'Agdspaginationbuttons',
    'AgDSProgressIndicator',
    'Agdsprogressindicator',
    'AgDSProse',
    'Agdsprose',
    'AgDSRadio',
    'Agdsradio',
    'AgDSRadioGroup',
    'Agdsradiogroup',
    'AgDSSearchBox',
    'Agdssearchbox',
    'AgDSSearchBoxButton',
    'Agdssearchboxbutton',
    'AgDSSearchBoxInput',
    'Agdssearchboxinput',
    'AgDSSearchInput',
    'Agdssearchinput',
    'AgDSSectionAlert',
    'Agdssectionalert',
    'AgDSSectionContent',
    'Agdssectioncontent',
    'AgDSSelect',
    'Agdsselect',
    'AgDSSideNav',
    'Agdssidenav',
    'AgDSSkipLinks',
    'Agdsskiplinks',
    'AgDSStack',
    'Agdsstack',
    'AgDSSubNav',
    'Agdssubnav',
    'AgDSSummaryList',
    'Agdssummarylist',
    'AgDSSummaryListItem',
    'Agdssummarylistitem',
    'AgDSSummaryListItemAction',
    'Agdssummarylistitemaction',
    'AgDSSummaryListItemDescription',
    'Agdssummarylistitemdescription',
    'AgDSSummaryListItemTerm',
    'Agdssummarylistitemterm',
    'AgDSSwitch',
    'Agdsswitch',
    'AgDSTab',
    'Agdstab',
    'AgDSTable',
    'Agdstable',
    'AgDSTableBody',
    'Agdstablebody',
    'AgDSTableCaption',
    'Agdstablecaption',
    'AgDSTableCell',
    'Agdstablecell',
    'AgDSTableHead',
    'Agdstablehead',
    'AgDSTableHeader',
    'Agdstableheader',
    'AgDSTableHeaderSortable',
    'Agdstableheadersortable',
    'AgDSTableRow',
    'Agdstablerow',
    'AgDSTableScroller',
    'Agdstablescroller',
    'AgDSTabList',
    'Agdstablist',
    'AgDSTabPanel',
    'Agdstabpanel',
    'AgDSTabs',
    'Agdstabs',
    'AgDSTag',
    'Agdstag',
    'AgDSTags',
    'Agdstags',
    'AgDSText',
    'Agdstext',
    'AgDSTextarea',
    'Agdstextarea',
    'AgDSTextInput',
    'Agdstextinput',
    'AgDSTextLink',
    'Agdstextlink',
    'AgDSTextLinkExternal',
    'Agdstextlinkexternal',
    'AgDSTimeInput',
    'Agdstimeinput',
    'AgDSTimePicker',
    'Agdstimepicker',
    'AgDSToggleButton',
    'Agdstogglebutton',
    'AgDSUnorderedList',
    'Agdsunorderedlist',
    'AgDSVisuallyHidden',
    'Agdsvisuallyhidden',
  ],
  En = [
    'BreadcrumbsDemo',
    'DocPreview',
    'FeatureLinkListDemo',
    'FilterSidebarDemo',
    'PaginationDemo',
    'ProgressIndicatorDemo',
    'ProsePre',
    'SideNavDemo',
  ],
  Bn = {
    __name: 'ContentRenderer',
    props: {
      value: { type: Object, required: !0 },
      excerpt: { type: Boolean, default: !1 },
      tag: { type: String, default: 'div' },
      components: { type: Object, default: () => ({}) },
      data: { type: Object, default: () => ({}) },
      prose: { type: Boolean, default: void 0 },
      class: { type: [String, Object], default: void 0 },
      unwrap: { type: [Boolean, String], default: !1 },
    },
    setup(e) {
      const t = ['render', 'ssrRender', '__ssrInlineRender'],
        n = e,
        o = import.meta.preview,
        r = P(() => {
          let c = n.value.body || n.value
          return (
            n.excerpt && n.value.excerpt && (c = n.value.excerpt),
            c.type === 'minimal' || c.type === 'minimark' ? en({ value: c.value }) : c
          )
        }),
        a = P(() => !r.value?.children?.length),
        s = P(() => {
          const { body: c, excerpt: h, ...y } = n.value
          return { ...y, ...n.data }
        }),
        m = Object.fromEntries(
          [
            'p',
            'a',
            'blockquote',
            'code',
            'pre',
            'code',
            'em',
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
            'hr',
            'img',
            'ul',
            'ol',
            'li',
            'strong',
            'table',
            'thead',
            'tbody',
            'td',
            'th',
            'tr',
            'script',
          ].map((c) => [c, `prose-${c}`]),
        ),
        { mdc: d } = He().public || {},
        p = P(() => n.data.mdc),
        u = P(() => ({
          ...(d?.components?.prose && n.prose !== !1 ? m : {}),
          ...(d?.components?.map || {}),
          ...pe(p.value?.components || {}),
          ...n.components,
        })),
        g = P(() => (r.value ? b(r.value, { tags: u.value }) : {}))
      function S(c) {
        let h = c
        if (typeof c == 'string') {
          if (G.has(c)) return c
          if (Rn.includes(E(c))) h = ce(c, !1)
          else if (En.includes(E(c))) {
            const x = Mn[E(c)]
            h = x ? K(x) : void 0
          }
          if (typeof h == 'string') return h
        }
        if (!h) return h
        const y = h
        return '__asyncLoader' in y ? y : 'setup' in y ? K(() => Promise.resolve(y)) : y
      }
      function b(c, h) {
        if (!c) return
        const y = Array.from(new Set(w(c, h))),
          x = {}
        for (const [R, I] of y)
          if (!x[R]) {
            if (typeof I == 'object' && t.some((Re) => Object.hasOwnProperty.call(I, Re))) {
              x[R] = I
              continue
            }
            x[R] = S(I)
          }
        return x
      }
      function w(c, h) {
        const y = c.tag
        if (c.type === 'text' || y === 'binding' || c.type === 'comment') return []
        const x = M(c, h.tags),
          R = []
        c.type !== 'root' && !G.has(x) && R.push([y, x])
        for (const I of c.children || []) R.push(...w(I, h))
        return R
      }
      function M(c, h) {
        const y = c.tag
        return !y || typeof c.props?.__ignoreMap < 'u' ? y : h[y] || h[E(y)] || h[me(c.tag)] || y
      }
      return (c, h) =>
        a.value
          ? je(c.$slots, 'empty', {
              key: 1,
              body: r.value,
              data: s.value,
              dataContentId: C(o) ? e.value.id : void 0,
            })
          : (k(),
            X(
              On,
              {
                key: 0,
                body: r.value,
                data: s.value,
                class: de(n.class),
                tag: n.tag,
                prose: n.prose,
                unwrap: n.unwrap,
                components: g.value,
                'data-content-id': C(o) ? e.value.id : void 0,
              },
              null,
              8,
              ['body', 'data', 'class', 'tag', 'prose', 'unwrap', 'components', 'data-content-id'],
            ))
    },
  },
  In = Object.assign(Bn, { __name: 'ContentRenderer' }),
  Fn = { class: 'comp-page' },
  Un = { class: 'comp-page__header' },
  Hn = { class: 'comp-page__header-meta' },
  jn = { class: 'comp-page__category' },
  zn = { class: 'comp-page__title' },
  Nn = { key: 0, class: 'comp-page__desc' },
  Vn = { class: 'comp-page__body' },
  $n = { class: 'comp-page__content' },
  qn = { key: 0, class: 'comp-page__toc', 'aria-label': 'On this page' },
  Wn = { class: 'comp-page__toc-list', role: 'list' },
  Kn = ['href'],
  Xn = { key: 0, class: 'comp-page__toc-sub', role: 'list' },
  Gn = ['href'],
  Yn = ue({
    __name: '[slug]',
    async setup(e) {
      let t, n
      const o = ze(),
        r = P(() => o.params.slug),
        { data: a } =
          (([t, n] = Ne(() =>
            Ke(
              r.value,
              () => Xe('components').path(`/components/${r.value}`).first(),
              '$8uigmRnNLm',
            ),
          )),
          (t = await t),
          n(),
          t)
      if (!a.value) throw Ve({ statusCode: 404, message: 'Component not found' })
      Ge({
        title: () => `${a.value?.title ?? r.value} — AGDS-vue`,
        description: () => a.value?.description ?? '',
      })
      const s = P(() => a.value?.body?.toc?.links ?? [])
      return (m, d) => {
        const p = In,
          u = We
        return (
          k(),
          X(u, null, {
            default: $e(() => [
              _('div', Fn, [
                _('div', Un, [
                  _('div', Hn, [
                    _('span', jn, F(C(a)?.category ?? 'Component'), 1),
                    C(a)?.status
                      ? (k(),
                        T(
                          'span',
                          {
                            key: 0,
                            class: de(['comp-page__status', `comp-page__status--${C(a).status}`]),
                          },
                          F(C(a).status),
                          3,
                        ))
                      : j('', !0),
                  ]),
                  _('h1', zn, F(C(a)?.title), 1),
                  C(a)?.description ? (k(), T('p', Nn, F(C(a).description), 1)) : j('', !0),
                ]),
                _('div', Vn, [
                  _('div', $n, [
                    C(a) ? (k(), X(p, { key: 0, value: C(a) }, null, 8, ['value'])) : j('', !0),
                  ]),
                  C(s).length
                    ? (k(),
                      T('aside', qn, [
                        d[0] ||
                          (d[0] = _('p', { class: 'comp-page__toc-title' }, 'On this page', -1)),
                        _('ul', Wn, [
                          (k(!0),
                          T(
                            re,
                            null,
                            ae(
                              C(s),
                              (g) => (
                                k(),
                                T('li', { key: g.id, class: 'comp-page__toc-item' }, [
                                  _(
                                    'a',
                                    { href: `#${g.id}`, class: 'comp-page__toc-link' },
                                    F(g.text),
                                    9,
                                    Kn,
                                  ),
                                  g.children?.length
                                    ? (k(),
                                      T('ul', Xn, [
                                        (k(!0),
                                        T(
                                          re,
                                          null,
                                          ae(
                                            g.children,
                                            (S) => (
                                              k(),
                                              T('li', { key: S.id }, [
                                                _(
                                                  'a',
                                                  {
                                                    href: `#${S.id}`,
                                                    class:
                                                      'comp-page__toc-link comp-page__toc-link--sub',
                                                  },
                                                  F(S.text),
                                                  9,
                                                  Gn,
                                                ),
                                              ])
                                            ),
                                          ),
                                          128,
                                        )),
                                      ]))
                                    : j('', !0),
                                ])
                              ),
                            ),
                            128,
                          )),
                        ]),
                      ]))
                    : j('', !0),
                ]),
              ]),
            ]),
            _: 1,
          })
        )
      }
    },
  }),
  tt = qe(Yn, [['__scopeId', 'data-v-5bdabbc5']])
export { tt as default }

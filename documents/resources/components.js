"use strict";
(() => {
  // ../node_modules/tslib/tslib.es6.js
  var extendStatics = function(d3, b2) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b3) {
      d4.__proto__ = b3;
    } || function(d4, b3) {
      for (var p2 in b3)
        if (Object.prototype.hasOwnProperty.call(b3, p2))
          d4[p2] = b3[p2];
    };
    return extendStatics(d3, b2);
  };
  function __extends(d3, b2) {
    if (typeof b2 !== "function" && b2 !== null)
      throw new TypeError("Class extends value " + String(b2) + " is not a constructor or null");
    extendStatics(d3, b2);
    function __() {
      this.constructor = d3;
    }
    d3.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
  }
  var __assign = function() {
    __assign = Object.assign || function __assign2(t7) {
      for (var s6, i7 = 1, n7 = arguments.length; i7 < n7; i7++) {
        s6 = arguments[i7];
        for (var p2 in s6)
          if (Object.prototype.hasOwnProperty.call(s6, p2))
            t7[p2] = s6[p2];
      }
      return t7;
    };
    return __assign.apply(this, arguments);
  };
  function __rest(s6, e9) {
    var t7 = {};
    for (var p2 in s6)
      if (Object.prototype.hasOwnProperty.call(s6, p2) && e9.indexOf(p2) < 0)
        t7[p2] = s6[p2];
    if (s6 != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i7 = 0, p2 = Object.getOwnPropertySymbols(s6); i7 < p2.length; i7++) {
        if (e9.indexOf(p2[i7]) < 0 && Object.prototype.propertyIsEnumerable.call(s6, p2[i7]))
          t7[p2[i7]] = s6[p2[i7]];
      }
    return t7;
  }
  function __decorate(decorators, target, key, desc) {
    var c4 = arguments.length, r5 = c4 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r5 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i7 = decorators.length - 1; i7 >= 0; i7--)
        if (d3 = decorators[i7])
          r5 = (c4 < 3 ? d3(r5) : c4 > 3 ? d3(target, key, r5) : d3(target, key)) || r5;
    return c4 > 3 && r5 && Object.defineProperty(target, key, r5), r5;
  }
  function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i7 = 0, l6 = from.length, ar; i7 < l6; i7++) {
        if (ar || !(i7 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i7);
          ar[i7] = from[i7];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  }

  // ../node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t7, e9, n7) {
      if (this._$cssResult$ = true, n7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t7, this.t = e9;
    }
    get styleSheet() {
      let t7 = this.o;
      const s6 = this.t;
      if (e && void 0 === t7) {
        const e9 = void 0 !== s6 && 1 === s6.length;
        e9 && (t7 = n.get(s6)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && n.set(s6, t7));
      }
      return t7;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t7) => new o("string" == typeof t7 ? t7 : t7 + "", void 0, s);
  var i = (t7, ...e9) => {
    const n7 = 1 === t7.length ? t7[0] : e9.reduce((e10, s6, n8) => e10 + ((t8) => {
      if (true === t8._$cssResult$)
        return t8.cssText;
      if ("number" == typeof t8)
        return t8;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t7[n8 + 1], t7[0]);
    return new o(n7, t7, s);
  };
  var S = (s6, n7) => {
    e ? s6.adoptedStyleSheets = n7.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet) : n7.forEach((e9) => {
      const n8 = document.createElement("style"), o10 = t.litNonce;
      void 0 !== o10 && n8.setAttribute("nonce", o10), n8.textContent = e9.cssText, s6.appendChild(n8);
    });
  };
  var c = e ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
    let e9 = "";
    for (const s6 of t8.cssRules)
      e9 += s6.cssText;
    return r(e9);
  })(t7) : t7;

  // ../node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t7, i7) {
    switch (i7) {
      case Boolean:
        t7 = t7 ? h : null;
        break;
      case Object:
      case Array:
        t7 = null == t7 ? t7 : JSON.stringify(t7);
    }
    return t7;
  }, fromAttribute(t7, i7) {
    let s6 = t7;
    switch (i7) {
      case Boolean:
        s6 = null !== t7;
        break;
      case Number:
        s6 = null === t7 ? null : Number(t7);
        break;
      case Object:
      case Array:
        try {
          s6 = JSON.parse(t7);
        } catch (t8) {
          s6 = null;
        }
    }
    return s6;
  } };
  var a = (t7, i7) => i7 !== t7 && (i7 == i7 || t7 == t7);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t7) {
      var i7;
      this.finalize(), (null !== (i7 = this.h) && void 0 !== i7 ? i7 : this.h = []).push(t7);
    }
    static get observedAttributes() {
      this.finalize();
      const t7 = [];
      return this.elementProperties.forEach((i7, s6) => {
        const e9 = this._$Ep(s6, i7);
        void 0 !== e9 && (this._$Ev.set(e9, s6), t7.push(e9));
      }), t7;
    }
    static createProperty(t7, i7 = l) {
      if (i7.state && (i7.attribute = false), this.finalize(), this.elementProperties.set(t7, i7), !i7.noAccessor && !this.prototype.hasOwnProperty(t7)) {
        const s6 = "symbol" == typeof t7 ? Symbol() : "__" + t7, e9 = this.getPropertyDescriptor(t7, s6, i7);
        void 0 !== e9 && Object.defineProperty(this.prototype, t7, e9);
      }
    }
    static getPropertyDescriptor(t7, i7, s6) {
      return { get() {
        return this[i7];
      }, set(e9) {
        const r5 = this[t7];
        this[i7] = e9, this.requestUpdate(t7, r5, s6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t7) {
      return this.elementProperties.get(t7) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t7 = Object.getPrototypeOf(this);
      if (t7.finalize(), void 0 !== t7.h && (this.h = [...t7.h]), this.elementProperties = new Map(t7.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t8 = this.properties, i7 = [...Object.getOwnPropertyNames(t8), ...Object.getOwnPropertySymbols(t8)];
        for (const s6 of i7)
          this.createProperty(s6, t8[s6]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i7) {
      const s6 = [];
      if (Array.isArray(i7)) {
        const e9 = new Set(i7.flat(1 / 0).reverse());
        for (const i8 of e9)
          s6.unshift(c(i8));
      } else
        void 0 !== i7 && s6.push(c(i7));
      return s6;
    }
    static _$Ep(t7, i7) {
      const s6 = i7.attribute;
      return false === s6 ? void 0 : "string" == typeof s6 ? s6 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
    }
    u() {
      var t7;
      this._$E_ = new Promise((t8) => this.enableUpdating = t8), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t7 = this.constructor.h) || void 0 === t7 || t7.forEach((t8) => t8(this));
    }
    addController(t7) {
      var i7, s6;
      (null !== (i7 = this._$ES) && void 0 !== i7 ? i7 : this._$ES = []).push(t7), void 0 !== this.renderRoot && this.isConnected && (null === (s6 = t7.hostConnected) || void 0 === s6 || s6.call(t7));
    }
    removeController(t7) {
      var i7;
      null === (i7 = this._$ES) || void 0 === i7 || i7.splice(this._$ES.indexOf(t7) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t7, i7) => {
        this.hasOwnProperty(i7) && (this._$Ei.set(i7, this[i7]), delete this[i7]);
      });
    }
    createRenderRoot() {
      var t7;
      const s6 = null !== (t7 = this.shadowRoot) && void 0 !== t7 ? t7 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s6, this.constructor.elementStyles), s6;
    }
    connectedCallback() {
      var t7;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
        var i7;
        return null === (i7 = t8.hostConnected) || void 0 === i7 ? void 0 : i7.call(t8);
      });
    }
    enableUpdating(t7) {
    }
    disconnectedCallback() {
      var t7;
      null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
        var i7;
        return null === (i7 = t8.hostDisconnected) || void 0 === i7 ? void 0 : i7.call(t8);
      });
    }
    attributeChangedCallback(t7, i7, s6) {
      this._$AK(t7, s6);
    }
    _$EO(t7, i7, s6 = l) {
      var e9;
      const r5 = this.constructor._$Ep(t7, s6);
      if (void 0 !== r5 && true === s6.reflect) {
        const h5 = (void 0 !== (null === (e9 = s6.converter) || void 0 === e9 ? void 0 : e9.toAttribute) ? s6.converter : n2).toAttribute(i7, s6.type);
        this._$El = t7, null == h5 ? this.removeAttribute(r5) : this.setAttribute(r5, h5), this._$El = null;
      }
    }
    _$AK(t7, i7) {
      var s6;
      const e9 = this.constructor, r5 = e9._$Ev.get(t7);
      if (void 0 !== r5 && this._$El !== r5) {
        const t8 = e9.getPropertyOptions(r5), h5 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== (null === (s6 = t8.converter) || void 0 === s6 ? void 0 : s6.fromAttribute) ? t8.converter : n2;
        this._$El = r5, this[r5] = h5.fromAttribute(i7, t8.type), this._$El = null;
      }
    }
    requestUpdate(t7, i7, s6) {
      let e9 = true;
      void 0 !== t7 && (((s6 = s6 || this.constructor.getPropertyOptions(t7)).hasChanged || a)(this[t7], i7) ? (this._$AL.has(t7) || this._$AL.set(t7, i7), true === s6.reflect && this._$El !== t7 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t7, s6))) : e9 = false), !this.isUpdatePending && e9 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t8) {
        Promise.reject(t8);
      }
      const t7 = this.scheduleUpdate();
      return null != t7 && await t7, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t7;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t8, i8) => this[i8] = t8), this._$Ei = void 0);
      let i7 = false;
      const s6 = this._$AL;
      try {
        i7 = this.shouldUpdate(s6), i7 ? (this.willUpdate(s6), null === (t7 = this._$ES) || void 0 === t7 || t7.forEach((t8) => {
          var i8;
          return null === (i8 = t8.hostUpdate) || void 0 === i8 ? void 0 : i8.call(t8);
        }), this.update(s6)) : this._$Ek();
      } catch (t8) {
        throw i7 = false, this._$Ek(), t8;
      }
      i7 && this._$AE(s6);
    }
    willUpdate(t7) {
    }
    _$AE(t7) {
      var i7;
      null === (i7 = this._$ES) || void 0 === i7 || i7.forEach((t8) => {
        var i8;
        return null === (i8 = t8.hostUpdated) || void 0 === i8 ? void 0 : i8.call(t8);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
    }
    _$Ek() {
      this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
    }
    get updateComplete() {
      return this.getUpdateComplete();
    }
    getUpdateComplete() {
      return this._$E_;
    }
    shouldUpdate(t7) {
      return true;
    }
    update(t7) {
      void 0 !== this._$EC && (this._$EC.forEach((t8, i7) => this._$EO(i7, this[i7], t8)), this._$EC = void 0), this._$Ek();
    }
    updated(t7) {
    }
    firstUpdated(t7) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.1");

  // ../node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t7 = "") => h2.createComment(t7);
  var d2 = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
  var u = Array.isArray;
  var c2 = (t7) => u(t7) || "function" == typeof (null == t7 ? void 0 : t7[Symbol.iterator]);
  var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
  var a2 = /-->/g;
  var f = />/g;
  var _ = RegExp(`>|[ 	
\f\r](?:([^\\s"'>=/]+)([ 	
\f\r]*=[ 	
\f\r]*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
  var m = /'/g;
  var p = /"/g;
  var $ = /^(?:script|style|textarea|title)$/i;
  var g = (t7) => (i7, ...s6) => ({ _$litType$: t7, strings: i7, values: s6 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t7, i7) => {
    const s6 = t7.length - 1, n7 = [];
    let h5, r5 = 2 === i7 ? "<svg>" : "", d3 = v;
    for (let i8 = 0; i8 < s6; i8++) {
      const s7 = t7[i8];
      let e9, u3, c4 = -1, g2 = 0;
      for (; g2 < s7.length && (d3.lastIndex = g2, u3 = d3.exec(s7), null !== u3); )
        g2 = d3.lastIndex, d3 === v ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h5 = RegExp("</" + u3[2], "g")), d3 = _) : void 0 !== u3[3] && (d3 = _) : d3 === _ ? ">" === u3[0] ? (d3 = null != h5 ? h5 : v, c4 = -1) : void 0 === u3[1] ? c4 = -2 : (c4 = d3.lastIndex - u3[2].length, e9 = u3[1], d3 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h5 = void 0);
      const y2 = d3 === _ && t7[i8 + 1].startsWith("/>") ? " " : "";
      r5 += d3 === v ? s7 + l2 : c4 >= 0 ? (n7.push(e9), s7.slice(0, c4) + "$lit$" + s7.slice(c4) + o3 + y2) : s7 + o3 + (-2 === c4 ? (n7.push(void 0), i8) : y2);
    }
    const u2 = r5 + (t7[s6] || "<?>") + (2 === i7 ? "</svg>" : "");
    if (!Array.isArray(t7) || !t7.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(u2) : u2, n7];
  };
  var C = class {
    constructor({ strings: t7, _$litType$: i7 }, e9) {
      let l6;
      this.parts = [];
      let h5 = 0, d3 = 0;
      const u2 = t7.length - 1, c4 = this.parts, [v2, a3] = E(t7, i7);
      if (this.el = C.createElement(v2, e9), A.currentNode = this.el.content, 2 === i7) {
        const t8 = this.el.content, i8 = t8.firstChild;
        i8.remove(), t8.append(...i8.childNodes);
      }
      for (; null !== (l6 = A.nextNode()) && c4.length < u2; ) {
        if (1 === l6.nodeType) {
          if (l6.hasAttributes()) {
            const t8 = [];
            for (const i8 of l6.getAttributeNames())
              if (i8.endsWith("$lit$") || i8.startsWith(o3)) {
                const s6 = a3[d3++];
                if (t8.push(i8), void 0 !== s6) {
                  const t9 = l6.getAttribute(s6.toLowerCase() + "$lit$").split(o3), i9 = /([.?@])?(.*)/.exec(s6);
                  c4.push({ type: 1, index: h5, name: i9[2], strings: t9, ctor: "." === i9[1] ? M : "?" === i9[1] ? k : "@" === i9[1] ? H : S2 });
                } else
                  c4.push({ type: 6, index: h5 });
              }
            for (const i8 of t8)
              l6.removeAttribute(i8);
          }
          if ($.test(l6.tagName)) {
            const t8 = l6.textContent.split(o3), i8 = t8.length - 1;
            if (i8 > 0) {
              l6.textContent = s3 ? s3.emptyScript : "";
              for (let s6 = 0; s6 < i8; s6++)
                l6.append(t8[s6], r3()), A.nextNode(), c4.push({ type: 2, index: ++h5 });
              l6.append(t8[i8], r3());
            }
          }
        } else if (8 === l6.nodeType)
          if (l6.data === n3)
            c4.push({ type: 2, index: h5 });
          else {
            let t8 = -1;
            for (; -1 !== (t8 = l6.data.indexOf(o3, t8 + 1)); )
              c4.push({ type: 7, index: h5 }), t8 += o3.length - 1;
          }
        h5++;
      }
    }
    static createElement(t7, i7) {
      const s6 = h2.createElement("template");
      return s6.innerHTML = t7, s6;
    }
  };
  function P(t7, i7, s6 = t7, e9) {
    var o10, n7, l6, h5;
    if (i7 === x)
      return i7;
    let r5 = void 0 !== e9 ? null === (o10 = s6._$Co) || void 0 === o10 ? void 0 : o10[e9] : s6._$Cl;
    const u2 = d2(i7) ? void 0 : i7._$litDirective$;
    return (null == r5 ? void 0 : r5.constructor) !== u2 && (null === (n7 = null == r5 ? void 0 : r5._$AO) || void 0 === n7 || n7.call(r5, false), void 0 === u2 ? r5 = void 0 : (r5 = new u2(t7), r5._$AT(t7, s6, e9)), void 0 !== e9 ? (null !== (l6 = (h5 = s6)._$Co) && void 0 !== l6 ? l6 : h5._$Co = [])[e9] = r5 : s6._$Cl = r5), void 0 !== r5 && (i7 = P(t7, r5._$AS(t7, i7.values), r5, e9)), i7;
  }
  var V = class {
    constructor(t7, i7) {
      this.u = [], this._$AN = void 0, this._$AD = t7, this._$AM = i7;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t7) {
      var i7;
      const { el: { content: s6 }, parts: e9 } = this._$AD, o10 = (null !== (i7 = null == t7 ? void 0 : t7.creationScope) && void 0 !== i7 ? i7 : h2).importNode(s6, true);
      A.currentNode = o10;
      let n7 = A.nextNode(), l6 = 0, r5 = 0, d3 = e9[0];
      for (; void 0 !== d3; ) {
        if (l6 === d3.index) {
          let i8;
          2 === d3.type ? i8 = new N(n7, n7.nextSibling, this, t7) : 1 === d3.type ? i8 = new d3.ctor(n7, d3.name, d3.strings, this, t7) : 6 === d3.type && (i8 = new I(n7, this, t7)), this.u.push(i8), d3 = e9[++r5];
        }
        l6 !== (null == d3 ? void 0 : d3.index) && (n7 = A.nextNode(), l6++);
      }
      return o10;
    }
    p(t7) {
      let i7 = 0;
      for (const s6 of this.u)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t7, s6, i7), i7 += s6.strings.length - 2) : s6._$AI(t7[i7])), i7++;
    }
  };
  var N = class {
    constructor(t7, i7, s6, e9) {
      var o10;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t7, this._$AB = i7, this._$AM = s6, this.options = e9, this._$Cm = null === (o10 = null == e9 ? void 0 : e9.isConnected) || void 0 === o10 || o10;
    }
    get _$AU() {
      var t7, i7;
      return null !== (i7 = null === (t7 = this._$AM) || void 0 === t7 ? void 0 : t7._$AU) && void 0 !== i7 ? i7 : this._$Cm;
    }
    get parentNode() {
      let t7 = this._$AA.parentNode;
      const i7 = this._$AM;
      return void 0 !== i7 && 11 === t7.nodeType && (t7 = i7.parentNode), t7;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t7, i7 = this) {
      t7 = P(this, t7, i7), d2(t7) ? t7 === b || null == t7 || "" === t7 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t7 !== this._$AH && t7 !== x && this.g(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : c2(t7) ? this.k(t7) : this.g(t7);
    }
    O(t7, i7 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t7, i7);
    }
    T(t7) {
      this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
    }
    g(t7) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(h2.createTextNode(t7)), this._$AH = t7;
    }
    $(t7) {
      var i7;
      const { values: s6, _$litType$: e9 } = t7, o10 = "number" == typeof e9 ? this._$AC(t7) : (void 0 === e9.el && (e9.el = C.createElement(e9.h, this.options)), e9);
      if ((null === (i7 = this._$AH) || void 0 === i7 ? void 0 : i7._$AD) === o10)
        this._$AH.p(s6);
      else {
        const t8 = new V(o10, this), i8 = t8.v(this.options);
        t8.p(s6), this.T(i8), this._$AH = t8;
      }
    }
    _$AC(t7) {
      let i7 = T.get(t7.strings);
      return void 0 === i7 && T.set(t7.strings, i7 = new C(t7)), i7;
    }
    k(t7) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i7 = this._$AH;
      let s6, e9 = 0;
      for (const o10 of t7)
        e9 === i7.length ? i7.push(s6 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s6 = i7[e9], s6._$AI(o10), e9++;
      e9 < i7.length && (this._$AR(s6 && s6._$AB.nextSibling, e9), i7.length = e9);
    }
    _$AR(t7 = this._$AA.nextSibling, i7) {
      var s6;
      for (null === (s6 = this._$AP) || void 0 === s6 || s6.call(this, false, true, i7); t7 && t7 !== this._$AB; ) {
        const i8 = t7.nextSibling;
        t7.remove(), t7 = i8;
      }
    }
    setConnected(t7) {
      var i7;
      void 0 === this._$AM && (this._$Cm = t7, null === (i7 = this._$AP) || void 0 === i7 || i7.call(this, t7));
    }
  };
  var S2 = class {
    constructor(t7, i7, s6, e9, o10) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t7, this.name = i7, this._$AM = e9, this.options = o10, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7, i7 = this, s6, e9) {
      const o10 = this.strings;
      let n7 = false;
      if (void 0 === o10)
        t7 = P(this, t7, i7, 0), n7 = !d2(t7) || t7 !== this._$AH && t7 !== x, n7 && (this._$AH = t7);
      else {
        const e10 = t7;
        let l6, h5;
        for (t7 = o10[0], l6 = 0; l6 < o10.length - 1; l6++)
          h5 = P(this, e10[s6 + l6], i7, l6), h5 === x && (h5 = this._$AH[l6]), n7 || (n7 = !d2(h5) || h5 !== this._$AH[l6]), h5 === b ? t7 = b : t7 !== b && (t7 += (null != h5 ? h5 : "") + o10[l6 + 1]), this._$AH[l6] = h5;
      }
      n7 && !e9 && this.j(t7);
    }
    j(t7) {
      t7 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t7 ? t7 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t7) {
      this.element[this.name] = t7 === b ? void 0 : t7;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t7) {
      t7 && t7 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t7, i7, s6, e9, o10) {
      super(t7, i7, s6, e9, o10), this.type = 5;
    }
    _$AI(t7, i7 = this) {
      var s6;
      if ((t7 = null !== (s6 = P(this, t7, i7, 0)) && void 0 !== s6 ? s6 : b) === x)
        return;
      const e9 = this._$AH, o10 = t7 === b && e9 !== b || t7.capture !== e9.capture || t7.once !== e9.once || t7.passive !== e9.passive, n7 = t7 !== b && (e9 === b || o10);
      o10 && this.element.removeEventListener(this.name, this, e9), n7 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
    }
    handleEvent(t7) {
      var i7, s6;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s6 = null === (i7 = this.options) || void 0 === i7 ? void 0 : i7.host) && void 0 !== s6 ? s6 : this.element, t7) : this._$AH.handleEvent(t7);
    }
  };
  var I = class {
    constructor(t7, i7, s6) {
      this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t7) {
      P(this, t7);
    }
  };
  var L = { P: "$lit$", A: o3, M: n3, C: 1, L: E, R: V, D: c2, V: P, I: N, H: S2, N: k, U: H, B: M, F: I };
  var z = i2.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.6.1");
  var Z = (t7, i7, s6) => {
    var e9, o10;
    const n7 = null !== (e9 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== e9 ? e9 : i7;
    let l6 = n7._$litPart$;
    if (void 0 === l6) {
      const t8 = null !== (o10 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== o10 ? o10 : null;
      n7._$litPart$ = l6 = new N(i7.insertBefore(r3(), t8), t8, void 0, null != s6 ? s6 : {});
    }
    return l6._$AI(t7), l6;
  };

  // ../node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t7, e9;
      const i7 = super.createRenderRoot();
      return null !== (t7 = (e9 = this.renderOptions).renderBefore) && void 0 !== t7 || (e9.renderBefore = i7.firstChild), i7;
    }
    update(t7) {
      const i7 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = Z(i7, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t7;
      super.connectedCallback(), null === (t7 = this._$Do) || void 0 === t7 || t7.setConnected(true);
    }
    disconnectedCallback() {
      var t7;
      super.disconnectedCallback(), null === (t7 = this._$Do) || void 0 === t7 || t7.setConnected(false);
    }
    render() {
      return x;
    }
  };
  s4.finalized = true, s4._$litElement$ = true, null === (l3 = globalThis.litElementHydrateSupport) || void 0 === l3 || l3.call(globalThis, { LitElement: s4 });
  var n4 = globalThis.litElementPolyfillSupport;
  null == n4 || n4({ LitElement: s4 });
  (null !== (o4 = globalThis.litElementVersions) && void 0 !== o4 ? o4 : globalThis.litElementVersions = []).push("3.2.2");

  // ../node_modules/@lit/reactive-element/decorators/property.js
  var i3 = (i7, e9) => "method" === e9.kind && e9.descriptor && !("value" in e9.descriptor) ? { ...e9, finisher(n7) {
    n7.createProperty(e9.key, i7);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e9.key, initializer() {
    "function" == typeof e9.initializer && (this[e9.key] = e9.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e9.key, i7);
  } };
  function e4(e9) {
    return (n7, t7) => void 0 !== t7 ? ((i7, e10, n8) => {
      e10.constructor.createProperty(n8, i7);
    })(e9, n7, t7) : i3(e9, n7);
  }

  // ../packages/core/lib/utils/elementReady.js
  var callbacks = /* @__PURE__ */ new Map();
  var ready = function(name, callback) {
    const callbackCollection = callbacks.get(name) || [];
    callbackCollection.push(callback);
    if (callbackCollection.length === 2) {
      try {
        callbackCollection.forEach((callback2) => callback2 && callback2());
      } catch (e9) {
        setTimeout(() => {
          throw e9;
        });
      } finally {
        callbacks.delete(name);
      }
    } else {
      callbacks.set(name, callbackCollection);
    }
  };

  // ../packages/core/lib/errors/GenericError.js
  var generateMessage = (message, supportURL) => !supportURL ? message : `${message}

${supportURL}
`;
  var GenericError = class extends Error {
    constructor(message, supportURL) {
      super(generateMessage(message, supportURL));
      this.stack = void 0;
    }
  };

  // ../packages/core/lib/errors/DuplicateStyleError.js
  var generateMessage2 = (name) => (
    /* eslint-disable-next-line indent */
    `Only one theme file can be loaded per element

[${name}] has already been defined.

Potential causes:
1. You are trying to load a multiple variants of a theme
2. You have loaded multiple or duplicate themes in your application bundle`
  );
  var DuplicateStyleError = class extends GenericError {
    constructor(name) {
      super(generateMessage2(name), "https://ui.refinitiv.com/kb/duplicate-styles");
    }
  };

  // ../packages/core/lib/registries/CustomStyleRegistry.js
  var register = /* @__PURE__ */ new Map();
  var CustomStyleRegistry = class {
    /**
     * Define a style definition for a custom element.
     * @param name tag name of the custom element
     * @param css css style string
     * @returns {void}
     */
    static define(name, css) {
      if (register.has(name)) {
        throw new DuplicateStyleError(name);
      }
      register.set(name, css);
      ready(name);
    }
    /**
     * Gets any custom style that has already been defined.
     * @param name tag name of the custom element
     * @returns css styles, based on the tag name
     */
    static get(name) {
      return register.get(name) || "";
    }
  };

  // ../packages/core/lib/errors/DuplicateElementError.js
  var generateMessage3 = (name) => (
    /* eslint-disable-next-line indent */
    `Only one version of a Custom Element can be registered in the browser

[${name}] has already been defined.

Potential causes:
1. No deduplication task has been performed
2. The same element definition has been loaded in multiple bundles
3. A single package has been upgraded, without upgrading other EF dependencies

Recommended fix:
1. Run 'npm dedupe' in you project folder
2. Rebuild your project`
  );
  var DuplicateElementError = class extends GenericError {
    constructor(name) {
      super(generateMessage3(name), "https://ui.refinitiv.com/kb/duplicate-element");
    }
  };

  // ../packages/core/lib/registries/ElementRegistry.js
  var ElementRegistrationItem = class {
    constructor(definition) {
      this.creations = 0;
      this.connections = 0;
      this.disconnections = 0;
      this.version = definition.version;
    }
  };
  var register2 = /* @__PURE__ */ new Map();
  var upgrade = (name, definition) => {
    definition.applyThemeStyles(CustomStyleRegistry.get(name));
    customElements.define(name, definition);
  };
  var ElementRegistry = class {
    /**
     * Define a new custom element into the registry.
     * @param name tag name of the custom element
     * @param definition the class definition of the element
     * @param [options] element definition parameters
     * @returns {void}
     */
    static define(name, definition) {
      if (register2.has(name)) {
        setTimeout(() => {
          throw new DuplicateElementError(name);
        });
      } else {
        const registrationItem = new ElementRegistrationItem(definition);
        register2.set(name, registrationItem);
        ready(name, () => {
          upgrade(name, definition);
        });
      }
    }
    /**
     * Gets the definition of an already defined custom element.
     * @param name tag name of the custom element
     * @returns Element registration object, or, `undefined`,
     * when there is no item registered by the provided name.
     */
    static get(name) {
      return register2.get(name);
    }
    /**
     * Logs the creation of an element
     * @param element Element to register the creation of
     * @returns {void}
     */
    static create(element) {
      const { localName: name } = element;
      if (register2.has(name)) {
        register2.get(name).creations += 1;
      }
    }
    /**
     * Logs the connection of an element
     * @param element Element to register the connection of
     * @returns {void}
     */
    static connect(element) {
      const { localName: name } = element;
      if (register2.has(name)) {
        register2.get(name).connections += 1;
      }
    }
    /**
     * Logs the disconnection of an element
     * @param element Element to register the disconnection of
     * @returns {void}
     */
    static disconnect(element) {
      const { localName: name } = element;
      if (register2.has(name)) {
        register2.get(name).disconnections += 1;
      }
    }
  };

  // ../packages/core/lib/utils/helpers.js
  var BasicElementSymbol = Symbol("BasicElement");
  var isBasicElement = (element) => {
    return element instanceof HTMLElement && BasicElementSymbol in element.constructor;
  };

  // ../packages/core/lib/registries/FocusRegistry.js
  var register3 = /* @__PURE__ */ new Set();
  var autoFocusFrame = null;
  var autoFocus = (element) => {
    if (element.autofocus && autoFocusFrame === null) {
      autoFocusFrame = requestAnimationFrame(() => {
        autoFocusFrame = null;
        element.focus();
      });
    }
  };
  var isKey = false;
  var isKeyTab = false;
  var isKeyShift = false;
  var resetKeys = () => {
    isKey = false;
    isKeyTab = false;
    isKeyShift = false;
  };
  var getActiveElement = (deep = false) => {
    const getShadowActiveElement = (activeElement) => {
      if (activeElement?.shadowRoot?.activeElement) {
        if (deep) {
          return getShadowActiveElement(activeElement.shadowRoot.activeElement);
        }
        return activeElement.shadowRoot.activeElement;
      }
      return activeElement;
    };
    return getShadowActiveElement(document.activeElement);
  };
  var delegateFocus = (element, first = true) => {
    const tabbableElements = element.tabbableElements;
    const delegateFocusElement = tabbableElements[first ? 0 : tabbableElements.length - 1];
    if (delegateFocusElement && delegateFocusElement !== element) {
      delegateFocusElement.focus();
    }
  };
  var getRegisteredPath = (target, includeAll = false) => {
    let node = target;
    const elements = [];
    while (node) {
      if (isBasicElement(node) && register3.has(node) && (includeAll || node.tabbable)) {
        elements.push(node);
      }
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        node = node.host;
      } else {
        node = node.parentNode;
      }
    }
    return elements;
  };
  var onDocumentKeyDown = (event) => {
    isKey = true;
    isKeyTab = event.key === "Tab";
    isKeyShift = event.shiftKey;
    if (isKeyTab && isKeyShift) {
      const path = getRegisteredPath(event.composedPath()[0]);
      const activeElement = getActiveElement(true);
      for (let i7 = path.length - 1; i7 >= 0; i7 -= 1) {
        const parent = path[i7];
        const firstTabbableElement = parent.tabbableElements[0];
        if (firstTabbableElement === activeElement) {
          parent.focus();
          return;
        }
      }
    }
  };
  var shouldDelegateOnFocus = (target) => {
    return !isKeyShift && isBasicElement(target) && register3.has(target) && target.delegatesFocus && getActiveElement(true) === target;
  };
  var onFocus = (event) => {
    const target = event.target;
    shouldDelegateOnFocus(target) && delegateFocus(target);
  };
  var onDocumentFocus = (event) => onFocus(event);
  var onDocumentKeyUp = () => resetKeys();
  var onWindowBlur = () => resetKeys();
  var onShadowRootFocus = function(event) {
    onFocus(event);
  };
  var onShadowRootBlur = function() {
    const element = this.host;
    if (element.delegatesFocus) {
      requestAnimationFrame(() => {
        if (getActiveElement(true) === element) {
          delegateFocus(element);
        }
      });
    }
  };
  var FocusRegistry = class {
    /**
     * Connect an element to focus global listener
     * @param element Element to register the connection of
     * @returns {void}
     */
    static connect(element) {
      if (!register3.size) {
        document.addEventListener("keydown", onDocumentKeyDown, true);
        document.addEventListener("keyup", onDocumentKeyUp, true);
        document.addEventListener("focus", onDocumentFocus, true);
        window.addEventListener("blur", onWindowBlur);
      }
      if (element.renderRoot instanceof ShadowRoot) {
        element.renderRoot.addEventListener("focus", onShadowRootFocus, true);
        element.renderRoot.addEventListener("blur", onShadowRootBlur, true);
      }
      register3.add(element);
      autoFocus(element);
    }
    /**
     * Disconnect an element of focus global listener
     * @param element Element to register the disconnection of
     * @returns {void}
     */
    static disconnect(element) {
      register3.delete(element);
      if (!register3.size) {
        document.removeEventListener("keydown", onDocumentKeyDown, true);
        document.removeEventListener("keyup", onDocumentKeyUp, true);
        document.removeEventListener("focus", onDocumentFocus, true);
        window.removeEventListener("blur", onWindowBlur);
      }
    }
  };

  // ../packages/core/lib/utils/focusableHelper.js
  var FocusableHelper = class {
    /**
     * Returns the normalized element tabindex. If not focusable, returns -1.
     * It checks for the attribute "tabindex" instead of the element property
     * `tabIndex` since browsers assign different values to it.
     * e.g. in Firefox `<div contenteditable>` has `tabIndex = -1`
     * @param element Element
     * @returns normalizedTabIndex
     */
    static normalizedTabIndex(element) {
      if (this.isFocusable(element)) {
        const tabIndex = element.getAttribute("tabindex") || 0;
        return Number(tabIndex);
      }
      return -1;
    }
    /**
     * Searches for nodes that are tabbable and adds them to the `result` array.
     * Returns if the `result` array needs to be sorted by tabindex.
     * @param node The starting point for the search; added to `result` if tabbable.
     * @param result Result
     * @param delegatedList A collection of nodes, which cannot follow DOM order
     * @returns needsSort
     */
    static collectTabbableNodes(node, result, delegatedList) {
      const element = node;
      if (node.nodeType !== Node.ELEMENT_NODE || !this.isVisible(element)) {
        return false;
      }
      const tabIndex = this.normalizedTabIndex(element);
      let needsSort = tabIndex > 0;
      if (tabIndex >= 0) {
        result.push(element);
      }
      let children;
      if (element.localName === "content" || element.localName === "slot") {
        children = element.assignedNodes({ flatten: true });
      } else if (element.shadowRoot) {
        children = element.shadowRoot.children;
      } else {
        children = element.children || [];
      }
      let childrenNeedSort = false;
      let tabbableChildren = [];
      for (let i7 = 0; i7 < children.length; i7 += 1) {
        childrenNeedSort = this.collectTabbableNodes(children[i7], tabbableChildren, delegatedList) || childrenNeedSort;
      }
      if (isBasicElement(element) && element.delegatesFocus && tabIndex >= 0 && tabbableChildren.length && element.hasAttribute("tabindex")) {
        if (childrenNeedSort) {
          tabbableChildren = this.sortByTabIndex(tabbableChildren);
        }
        delegatedList.unshift({
          element,
          children: tabbableChildren
        });
      } else {
        needsSort = childrenNeedSort || needsSort;
        result.push(...tabbableChildren);
      }
      return needsSort;
    }
    /**
     * Sorts an array of tabbable elements by tabindex. Returns a new array.
     * @param tabbables Tabbables
     * @returns sortedList
     */
    static sortByTabIndex(tabbables) {
      const len = tabbables.length;
      if (len < 2) {
        return tabbables;
      }
      const pivot = Math.ceil(len / 2);
      const left = this.sortByTabIndex(tabbables.slice(0, pivot));
      const right = this.sortByTabIndex(tabbables.slice(pivot));
      return FocusableHelper.mergeSortByTabIndex(left, right);
    }
    /**
     * Process remaining nodes to compose the list of tabbable nodes taking into account that
     * some elements are delegated
     * @param result Result
     * @param delegatedList A collection of nodes, which cannot follow natural DOM order
     * @returns {void}
     */
    static composeDelegated(result, delegatedList) {
      for (let i7 = 0; i7 < delegatedList.length; i7 += 1) {
        const { element, children } = delegatedList[i7];
        const index = result.indexOf(element);
        if (index !== -1) {
          result.splice(index, 1, ...children);
        }
      }
    }
    /**
     * Merge sort iterator, merges the two arrays into one, sorted by tab index.
     * @param left Left list
     * @param right Right list
     * @returns sorted list
     */
    static mergeSortByTabIndex(left, right) {
      const result = [];
      while (left.length > 0 && right.length > 0) {
        if (FocusableHelper.hasLowerTabOrder(left[0], right[0])) {
          result.push(right.shift());
        } else {
          result.push(left.shift());
        }
      }
      return result.concat(left, right);
    }
    /**
     * Returns if element `a` has lower tab order compared to element `b`
     * (both elements are assumed to be focusable and tabbable).
     * Elements with tabindex = 0 have lower tab order compared to elements
     * with tabindex > 0.
     * If both have same tabindex, it returns false.
     * @param a Left-side element
     * @param b Right-side element
     * @returns isLower
     */
    static hasLowerTabOrder(a3, b2) {
      const ati = Math.max(a3.tabIndex, 0);
      const bti = Math.max(b2.tabIndex, 0);
      return ati === 0 || bti === 0 ? bti > ati : ati > bti;
    }
    /**
     * Returns false if the element has `visibility: hidden` or `display: none`
     * @param element Element
     * @returns visible
     */
    static isVisible(element) {
      const style = window.getComputedStyle(element);
      return style.visibility !== "hidden" && style.display !== "none";
    }
    /**
     * Returns a sorted array of tabbable nodes, including the root node.
     * It searches the tabbable nodes in the light and shadow dom of the children,
     * sorting the result by tabindex.
     * @param node Node
     * @returns tabbableNodes
     */
    static getTabbableNodes(node) {
      let result = [];
      const delegatedList = [];
      const needsSortByTabIndex = this.collectTabbableNodes(node, result, delegatedList);
      if (needsSortByTabIndex) {
        result = this.sortByTabIndex(result);
      }
      this.composeDelegated(result, delegatedList);
      return result;
    }
    /**
     * Returns if a element is focusable.
     * @param element Element
     * @returns focusable
     */
    static isFocusable(element) {
      if (element.matches("input, select, textarea, button, object")) {
        return element.matches(":not([disabled])");
      }
      return element.matches("a[href], area[href], iframe, [tabindex], [contentEditable]");
    }
    /**
     * Returns if a element is tabbable. To be tabbable, a element must be
     * focusable, visible, and with a tabindex !== -1.
     * @param element Element
     * @returns tabbable
     */
    static isTabbable(element) {
      return this.isFocusable(element) && element.tabIndex >= 0 && this.isVisible(element);
    }
  };

  // ../packages/core/lib/elements/BasicElement.js
  var _a;
  var CSS_VARIABLE_REGEXP = /^--\w/;
  var CSS_VARIABLE_REPLACE_REGEXP = /['"]([^'"]+?)['"]/g;
  var NOTIFY_REGEXP = /([a-zA-Z])(?=[A-Z])/g;
  var toChangedEvent = (name) => `${name.replace(NOTIFY_REGEXP, "$1-").toLowerCase()}-changed`;
  var BasicElement = class extends s4 {
    /**
     * Creates and registers instance of Element.
     */
    constructor() {
      super();
      this.defaultTabIndex = null;
      this.defaultRole = null;
      this.delegatesFocus = false;
      this.autofocus = false;
      ElementRegistry.create(this);
    }
    /**
     * Apply theme styles
     * @param theme Theme CSS
     * @returns {void}
     */
    static applyThemeStyles(theme) {
      const baseStyles = this.styles;
      const themeStyles = r(theme);
      const styles = [].concat(baseStyles ? [baseStyles, themeStyles] : themeStyles);
      Object.defineProperty(this, "styles", {
        get() {
          return styles;
        }
      });
      this.elementStyles = this.finalizeStyles(this.styles);
    }
    /**
    * Gets any defined css variables by name/key
    * @param options options list of variables and fallbacks
    * @returns value of the css variable, or, fallback if specified, when a a variable is null.
    * @deprecated
    */
    cssVariable(...options) {
      console.warn("this.cssVariable() is deprecated. Use this.getComputedVariable() instead.");
      return this.getComputedVariable(...options);
    }
    /**
     * Gets any defined css variables by name/key
     * @param options options list of variables and fallbacks
     * @returns value of the css variable, or, fallback if specified, when a a variable is null.
     * @example
     * this.getComputedVariable('--valid-name'); // return value of the --valid-name
     * this.getComputedVariable('--invalid-name', '10px'); // return fallback value 10px
     */
    getComputedVariable(...options) {
      const option = options.length ? options.shift() : "";
      if (CSS_VARIABLE_REGEXP.test(option)) {
        const val = getComputedStyle(this).getPropertyValue(option).trim().replace(CSS_VARIABLE_REPLACE_REGEXP, "$1");
        return val ? val : this.getComputedVariable(...options);
      }
      return option;
    }
    /**
     * Updates, adds, or removes a css variable from the element.
     * @param key css variable key
     * @param value css variable value
     * @returns {void}
     */
    updateVariable(key, value) {
      if (CSS_VARIABLE_REGEXP.test(key)) {
        if (value === null || value === void 0) {
          this.style.removeProperty(key);
        } else {
          this.style.setProperty(key, value);
        }
      }
    }
    /**
     * Dispatch property change event when the property's value has been changed.
     * Event name is transformed to hyphen case, e.g. myProperty -> my-property-changed.
     * Event details contain the new value.
     * @param name Property name
     * @param value New value
     * @param [cancelable=false] Set to true if the event can be cancelled
     * @returns false if the event is prevented
     */
    notifyPropertyChange(name, value, cancelable = false) {
      const event = new CustomEvent(toChangedEvent(name), {
        cancelable,
        bubbles: false,
        detail: {
          value
        }
      });
      this.dispatchEvent(event);
      return !event.defaultPrevented;
    }
    /**
     * Registers the connection to the DOM
     * @returns {void}
     */
    connectedCallback() {
      super.connectedCallback();
      ElementRegistry.connect(this);
      if (typeof this.defaultTabIndex === "number" && !this.hasAttribute("tabindex")) {
        this.tabIndex = this.defaultTabIndex;
      }
      if (typeof this.defaultRole === "string" && !this.hasAttribute("role")) {
        this.setAttribute("role", this.defaultRole);
      }
      FocusRegistry.connect(this);
    }
    /**
     * Registers the disconnection from the DOM
     * @returns {void}
     */
    disconnectedCallback() {
      super.disconnectedCallback();
      ElementRegistry.disconnect(this);
      FocusRegistry.disconnect(this);
    }
    /**
     * Check to see if the element if tabbable.
     * Element is tabbable if it has tabindex >=0
     * and is visible on the screen.
     */
    get tabbable() {
      return FocusableHelper.isTabbable(this);
    }
    /**
     * Get a sorted collection of nodes that can be tabbed through.
     */
    get tabbableElements() {
      return FocusableHelper.getTabbableNodes(this);
    }
    /**
     * Placeholder for getting an element's version number
     * @returns version number
     */
    static get version() {
      return "unknown";
    }
  };
  _a = BasicElementSymbol;
  BasicElement[_a] = BasicElementSymbol;
  __decorate([
    e4({ type: Boolean, attribute: "autofocus", reflect: true })
  ], BasicElement.prototype, "autofocus", void 0);

  // ../packages/core/lib/notices/constants.js
  var MESSAGE_TYPE;
  (function(MESSAGE_TYPE2) {
    MESSAGE_TYPE2["NOTICE"] = "Information";
    MESSAGE_TYPE2["DEPRECATION"] = "Deprecation";
    MESSAGE_TYPE2["WARNING"] = "Warning";
  })(MESSAGE_TYPE || (MESSAGE_TYPE = {}));

  // ../packages/core/lib/notices/Notice.js
  var generateMessage4 = (type, message, supportURL) => `${type} notice:
${!supportURL ? message : `${message}

${supportURL}
`}`;
  var Notice = class {
    /**
     * Create a warning notice to show in the console.
     * @param message Warning message to show in the console
     * @param supportURL Support URL to show additional information
     * @param type Type of Notice to show at top of message
     */
    constructor(message, supportURL, type = MESSAGE_TYPE.NOTICE) {
      this.shown = false;
      this.message = generateMessage4(type, message, supportURL);
    }
    /**
     * Shows the warning notice in the console
     * @returns {void}
     */
    show() {
      console.info(this.message);
      this.shown = true;
    }
    /**
     * Shows the warning notice only once
     * @returns {void}
     */
    once() {
      if (!this.shown) {
        this.show();
      }
    }
  };

  // ../packages/core/lib/notices/WarningNotice.js
  var WarningNotice = class extends Notice {
    constructor(message, supportURL, type = MESSAGE_TYPE.WARNING) {
      super(message, supportURL, type);
    }
    show() {
      console.warn(this.message);
      this.shown = true;
    }
  };

  // ../packages/core/lib/elements/ControlElement.js
  var ControlElement = class extends BasicElement {
    constructor() {
      super(...arguments);
      this.defaultTabIndex = 0;
      this.delegatesFocus = true;
      this.name = "";
      this.disabled = false;
      this.readonly = false;
      this.oldTabIndex = null;
      this._value = "";
    }
    /**
     * Value of the element
     * @param value Element value
     */
    set value(value) {
      const oldValue = this._value;
      value = this.castValue(value);
      if (!this.isValidValue(value)) {
        this.warnInvalidValue(value);
        value = "";
      }
      if (oldValue !== value) {
        this._value = value;
        this.requestUpdate("value", oldValue);
      }
    }
    get value() {
      return this._value;
    }
    /**
     * Get a sorted collection of nodes that can be tabbed through if component not disabled.
     */
    get tabbableElements() {
      return this.disabled ? [] : super.tabbableElements;
    }
    /**
     * @override
     * @returns {void}
     */
    update(changedProperties) {
      if (changedProperties.has("disabled")) {
        this.disableChanged(changedProperties);
      }
      super.update(changedProperties);
    }
    /**
     * Update disabled state if detect value changed
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    disableChanged(changedProperties) {
      if (this.disabled) {
        this.disableFocus();
        this.setAttribute("aria-disabled", "true");
      } else if (changedProperties.get("disabled") === true) {
        this.enableFocus();
        this.removeAttribute("aria-disabled");
      }
    }
    /**
     * Re-enables focus, if the focus has been previously
     * disabled by running disableFocus.
     * @returns {void}
     */
    enableFocus() {
      this.style.removeProperty("pointer-events");
      if (this.oldTabIndex !== null && this.tabIndex === -1) {
        this.tabIndex = this.oldTabIndex;
      }
      this.oldTabIndex = null;
    }
    /**
     * Disables the ability to focus and tab on element.
     * @returns {void}
     */
    disableFocus() {
      this.style.setProperty("pointer-events", "none");
      if (this.hasAttribute("tabindex") && this.tabIndex >= 0) {
        this.oldTabIndex = this.tabIndex;
        this.tabIndex = -1;
      }
      if (document.activeElement === this) {
        this.blur();
      }
    }
    /**
     * Cast value to string
     * @param value Value that is not string, but
     * which may be set by app developer, e.g. number or date
     * @returns string representation of the value
     */
    castValue(value) {
      if (typeof value === "string") {
        return value;
      }
      if (value === null) {
        return "";
      }
      return String(value);
    }
    /**
     * Used to show a warning when the value does not pass the validation
     * @param value that is invalid
     * @returns {void}
     */
    warnInvalidValue(value) {
      new WarningNotice(`The specified value "${value}" is not valid.`).show();
    }
    /**
     * Validate that the value confirms the control type
     * The validation resets value.
     * For input validation use lazy validation.
     * @param value Value to check
     * @returns false if value is invalid
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isValidValue(value) {
      return true;
    }
    /**
     * On *user-interaction* set the value and notify.
     * @param value New value
     * @returns {void}
     */
    setValueAndNotify(value) {
      if (this.value !== value) {
        this.value = value;
        this.notifyPropertyChange("value", value);
      }
    }
    /**
     * Resets the element value to its initial setting
     * @returns Whether the value has changed
     */
    reset() {
      const initialValue = this.getAttribute("value") || "";
      const currentValue = this.value;
      if (currentValue !== initialValue) {
        this.value = initialValue;
        return true;
      }
      return false;
    }
  };
  __decorate([
    e4({ type: String })
  ], ControlElement.prototype, "name", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], ControlElement.prototype, "disabled", void 0);
  __decorate([
    e4({ type: String })
  ], ControlElement.prototype, "value", null);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], ControlElement.prototype, "readonly", void 0);

  // ../packages/utils/lib/element.js
  var getElementScope = (element) => {
    const root = element.getRootNode();
    if (root.nodeType === Node.DOCUMENT_NODE || root.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      return root;
    }
    return null;
  };

  // ../packages/utils/lib/accessibility/helpers.js
  var SEPARATOR = " ";
  var textFromElementIds = (rootNode, ids) => {
    const labels = [];
    const elementIds = ids.split(SEPARATOR);
    for (let i7 = 0; i7 < elementIds.length; i7 += 1) {
      const element = rootNode.getElementById(elementIds[i7]);
      if (element) {
        if (element.hasAttribute("aria-label")) {
          labels.push(element.getAttribute("aria-label") || "");
          continue;
        }
        labels.push(element.textContent || "");
      }
    }
    return labels.join(SEPARATOR);
  };

  // ../packages/utils/lib/accessibility/label.js
  var label = (element) => {
    if (element.hasAttribute("aria-label")) {
      return element.getAttribute("aria-label") || "";
    }
    const rootNode = getElementScope(element);
    if (!rootNode) {
      return null;
    }
    if (element.hasAttribute("aria-labelledby")) {
      const ids = element.getAttribute("aria-labelledby");
      if (!ids) {
        return "";
      }
      return textFromElementIds(rootNode, ids);
    }
    if (element.id) {
      const labelForElement = rootNode.querySelector(`label[for="${element.id}"]`);
      if (labelForElement instanceof HTMLLabelElement) {
        if (labelForElement.hasAttribute("aria-label")) {
          return labelForElement.getAttribute("aria-label") || "";
        }
        return labelForElement.textContent || "";
      }
      return null;
    }
    return null;
  };

  // ../packages/utils/lib/accessibility/description.js
  var description = (element) => {
    if (element.hasAttribute("aria-description")) {
      return element.getAttribute("aria-description") || "";
    }
    const rootNode = getElementScope(element);
    if (!rootNode) {
      return null;
    }
    if (element.hasAttribute("aria-describedby")) {
      const ids = element.getAttribute("aria-describedby");
      if (!ids) {
        return null;
      }
      return textFromElementIds(rootNode, ids);
    }
    return null;
  };

  // ../packages/utils/lib/accessibility/required.js
  var required = (element) => {
    if (element.hasAttribute("aria-required")) {
      return element.getAttribute("aria-required") === "true";
    }
    return false;
  };

  // ../node_modules/@lit/reactive-element/decorators/state.js
  function t3(t7) {
    return e4({ ...t7, state: true });
  }

  // ../node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t7) => (...e9) => ({ _$litDirective$: t7, values: e9 });
  var i4 = class {
    constructor(t7) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t7, e9, i7) {
      this._$Ct = t7, this._$AM = e9, this._$Ci = i7;
    }
    _$AS(t7, e9) {
      return this.update(t7, e9);
    }
    update(t7, e9) {
      return this.render(...e9);
    }
  };

  // ../packages/core/lib/directives/template-map.js
  var MAP_TYPE;
  (function(MAP_TYPE2) {
    MAP_TYPE2[MAP_TYPE2["ATTRIBUTE"] = 0] = "ATTRIBUTE";
    MAP_TYPE2[MAP_TYPE2["PROPERTY"] = 1] = "PROPERTY";
    MAP_TYPE2[MAP_TYPE2["LISTENER"] = 2] = "LISTENER";
  })(MAP_TYPE || (MAP_TYPE = {}));
  var getMapType = (key) => {
    const startsWith4 = key[0];
    if (startsWith4 === ".") {
      return MAP_TYPE.PROPERTY;
    }
    if (startsWith4 === "@") {
      return MAP_TYPE.LISTENER;
    }
    return MAP_TYPE.ATTRIBUTE;
  };
  var getMapName = (key) => {
    const type = getMapType(key);
    if (type === MAP_TYPE.PROPERTY || type === MAP_TYPE.LISTENER) {
      return key.substring(1);
    }
    return key;
  };
  var setMapped = (element, name, value, oldValue) => {
    const type = getMapType(name);
    name = getMapName(name);
    switch (type) {
      case MAP_TYPE.LISTENER:
        if (typeof oldValue === "function") {
          element.removeEventListener(name, oldValue);
        }
        if (typeof value === "function") {
          element.addEventListener(name, value);
        }
        break;
      case MAP_TYPE.PROPERTY:
        if (value === void 0) {
          delete element[name];
        } else {
          element[name] = value;
        }
        break;
      case MAP_TYPE.ATTRIBUTE:
      default:
        if (value === null || value === void 0 || value === false) {
          element.removeAttribute(name);
        } else if (value === true) {
          element.setAttribute(name, "");
        } else {
          element.setAttribute(name, String(value));
        }
        break;
    }
  };
  var TemplateMapDirective = class extends i4 {
    constructor(partInfo) {
      super(partInfo);
      this.valueMap = {};
      if (partInfo.type !== t4.ELEMENT) {
        throw new Error("The `TemplateMap` directive must be used with element");
      }
    }
    /**
     * @inheritDoc
     * @param part Element part
     * @param attributeMap Attribute map
     * @returns noChange
     */
    update(part, [attributeMap]) {
      const newValueMap = {};
      const element = part.element;
      for (const name in attributeMap) {
        const value = attributeMap[name];
        let scopedValue = value;
        let oldValue;
        let oldScopedValue;
        if (this.valueMap[name]) {
          oldValue = this.valueMap[name].value;
          oldScopedValue = scopedValue = this.valueMap[name].scopedValue;
        }
        if (oldValue !== value) {
          scopedValue = typeof value === "function" ? value.bind(part.options?.host || element) : value;
          setMapped(element, name, scopedValue, oldScopedValue);
        }
        newValueMap[name] = { value, scopedValue };
        delete this.valueMap[name];
      }
      for (const name in this.valueMap) {
        setMapped(element, name, void 0, this.valueMap[name].scopedValue);
      }
      this.valueMap = newValueMap;
      return this.render();
    }
    /**
     * @inheritDoc
     * @returns noChange
     */
    render() {
      return x;
    }
  };
  var templateMap = e5(TemplateMapDirective);

  // ../node_modules/lit-html/directive-helpers.js
  var { I: l4 } = L;
  var e6 = (o10) => void 0 === o10.strings;

  // ../node_modules/lit-html/async-directive.js
  var s5 = (i7, t7) => {
    var e9, o10;
    const r5 = i7._$AN;
    if (void 0 === r5)
      return false;
    for (const i8 of r5)
      null === (o10 = (e9 = i8)._$AO) || void 0 === o10 || o10.call(e9, t7, false), s5(i8, t7);
    return true;
  };
  var o5 = (i7) => {
    let t7, e9;
    do {
      if (void 0 === (t7 = i7._$AM))
        break;
      e9 = t7._$AN, e9.delete(i7), i7 = t7;
    } while (0 === (null == e9 ? void 0 : e9.size));
  };
  var r4 = (i7) => {
    for (let t7; t7 = i7._$AM; i7 = t7) {
      let e9 = t7._$AN;
      if (void 0 === e9)
        t7._$AN = e9 = /* @__PURE__ */ new Set();
      else if (e9.has(i7))
        break;
      e9.add(i7), l5(t7);
    }
  };
  function n5(i7) {
    void 0 !== this._$AN ? (o5(this), this._$AM = i7, r4(this)) : this._$AM = i7;
  }
  function h3(i7, t7 = false, e9 = 0) {
    const r5 = this._$AH, n7 = this._$AN;
    if (void 0 !== n7 && 0 !== n7.size)
      if (t7)
        if (Array.isArray(r5))
          for (let i8 = e9; i8 < r5.length; i8++)
            s5(r5[i8], false), o5(r5[i8]);
        else
          null != r5 && (s5(r5, false), o5(r5));
      else
        s5(this, i7);
  }
  var l5 = (i7) => {
    var t7, s6, o10, r5;
    i7.type == t4.CHILD && (null !== (t7 = (o10 = i7)._$AP) && void 0 !== t7 || (o10._$AP = h3), null !== (s6 = (r5 = i7)._$AQ) && void 0 !== s6 || (r5._$AQ = n5));
  };
  var c3 = class extends i4 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i7, t7, e9) {
      super._$AT(i7, t7, e9), r4(this), this.isConnected = i7._$AU;
    }
    _$AO(i7, t7 = true) {
      var e9, r5;
      i7 !== this.isConnected && (this.isConnected = i7, i7 ? null === (e9 = this.reconnected) || void 0 === e9 || e9.call(this) : null === (r5 = this.disconnected) || void 0 === r5 || r5.call(this)), t7 && (s5(this, i7), o5(this));
    }
    setValue(t7) {
      if (e6(this._$Ct))
        this._$Ct._$AI(t7, this);
      else {
        const i7 = [...this._$Ct._$AH];
        i7[this._$Ci] = t7, this._$Ct._$AI(i7, this, 0);
      }
    }
    disconnected() {
    }
    reconnected() {
    }
  };

  // ../node_modules/lit-html/directives/ref.js
  var e7 = () => new o6();
  var o6 = class {
  };
  var h4 = /* @__PURE__ */ new WeakMap();
  var n6 = e5(class extends c3 {
    render(t7) {
      return b;
    }
    update(t7, [s6]) {
      var e9;
      const o10 = s6 !== this.Y;
      return o10 && void 0 !== this.Y && this.rt(void 0), (o10 || this.lt !== this.ct) && (this.Y = s6, this.dt = null === (e9 = t7.options) || void 0 === e9 ? void 0 : e9.host, this.rt(this.ct = t7.element)), b;
    }
    rt(i7) {
      var t7;
      if ("function" == typeof this.Y) {
        const s6 = null !== (t7 = this.dt) && void 0 !== t7 ? t7 : globalThis;
        let e9 = h4.get(s6);
        void 0 === e9 && (e9 = /* @__PURE__ */ new WeakMap(), h4.set(s6, e9)), void 0 !== e9.get(this.Y) && this.Y.call(this.dt, void 0), e9.set(this.Y, i7), void 0 !== i7 && this.Y.call(this.dt, i7);
      } else
        this.Y.value = i7;
    }
    get lt() {
      var i7, t7, s6;
      return "function" == typeof this.Y ? null === (t7 = h4.get(null !== (i7 = this.dt) && void 0 !== i7 ? i7 : globalThis)) || void 0 === t7 ? void 0 : t7.get(this.Y) : null === (s6 = this.Y) || void 0 === s6 ? void 0 : s6.value;
    }
    disconnected() {
      this.lt === this.ct && this.rt(void 0);
    }
    reconnected() {
      this.rt(this.ct);
    }
  });

  // ../packages/core/lib/elements/FormFieldElement.js
  var AriaLabelKey = Symbol("aria-label-key");
  var AriaDescriptionKey = Symbol("aria-description-key");
  var AriaRequiredKey = Symbol("aria-required-key");
  var ObservedAriaLabel = ["aria-label", "aria-labelledby", "id"];
  var ObservedAriaDescription = ["aria-description", "aria-describedby"];
  var ObservedAriaRequired = ["aria-required"];
  var FormFieldElement = class extends ControlElement {
    constructor() {
      super(...arguments);
      this.error = false;
      this.warning = false;
      this.placeholder = "";
      this.transparent = false;
      this.inputElRef = e7();
      this.inputAriaLabel = null;
      this.inputAriaDescription = null;
      this.inputAriaRequired = false;
    }
    /**
     * @inheritDoc
     */
    static get observedAttributes() {
      return Array.from(/* @__PURE__ */ new Set([
        ...super.observedAttributes,
        ...ObservedAriaLabel,
        ...ObservedAriaDescription,
        ...ObservedAriaRequired
      ]));
    }
    /**
     * Get an input element
     */
    get inputElement() {
      return this.inputElRef.value;
    }
    /**
     * Get native input value
     * @returns string of input value
     */
    get inputValue() {
      return this.inputElement ? this.inputElement.value : "";
    }
    /**
     * Set native input value
     * @param value input's value
     */
    set inputValue(value) {
      if (this.inputElement) {
        this.inputElement.value = value;
      }
    }
    /**
     * @inheritDoc
     */
    attributeChangedCallback(name, oldValue, newValue) {
      super.attributeChangedCallback(name, oldValue, newValue);
      if (ObservedAriaLabel.includes(name)) {
        this.requestUpdate(AriaLabelKey, Symbol());
      }
      if (ObservedAriaDescription.includes(name)) {
        this.requestUpdate(AriaDescriptionKey, Symbol());
      }
      if (ObservedAriaRequired.includes(name)) {
        this.requestUpdate(AriaRequiredKey, Symbol());
      }
    }
    /**
     * Compute property values that depend on other properties
     * and are used in the rest of the update process.
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    willUpdate(changedProperties) {
      super.willUpdate(changedProperties);
      if (changedProperties.has(AriaLabelKey)) {
        this.inputAriaLabel = label(this);
      }
      if (changedProperties.has(AriaRequiredKey)) {
        this.inputAriaRequired = required(this);
      }
      if (changedProperties.has(AriaDescriptionKey) || changedProperties.get("error") !== void 0 && changedProperties.has("error")) {
        this.inputAriaDescription = description(this);
      }
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.addEventListener("focus", this.onFocus);
    }
    /**
     * Handles the focus event
     * @param event Focus event
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onFocus(event) {
      this.setInheritedAria();
    }
    /**
     * Set inherited aria properties
     * @returns {void}
     */
    setInheritedAria() {
      this.inputAriaLabel = label(this);
      this.inputAriaDescription = description(this);
    }
    /**
     * Notify error if it has changed
     * @param hasError true if the element has an error
     * @returns {void}
     */
    notifyErrorChange(hasError) {
      if (this.error !== hasError) {
        this.error = hasError;
        this.notifyPropertyChange("error", this.error);
      }
    }
    /**
     * Runs on input element `input` event
     * @param event `input` event
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onInputInput(event) {
    }
    /**
     * Runs on input element `change` event
     * @param event `change` event
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onInputChange(event) {
    }
    /**
     * Decorate `<input>` element with common properties:
     * aria-label - calculated from `aria-label`, `aria-labelledby` and `label[for="<element.id>"]`
     * aria-description - calculated from `aria-description` or `aria-describedby`
     * aria-invalid="true|null" - calculated on based on `error` state
     * aria-required="true|null" - calculated on based on `aria-required`
     * placeholder - placeholder text
     * readonly - indicates whether the user can interact and still show value with the element
     * disabled - indicates whether the user can interact with the element
     * autocomplete="off" - always off as is not supported within shadow root
     * @input - Listener for `input` event. Runs `this.onInputInput`
     * @change - Listener for `change` event. Runs `this.onInputChange`
     * @returns template map
     */
    get decorateInputMap() {
      return {
        "aria-label": this.inputAriaLabel,
        "aria-description": this.inputAriaDescription,
        "aria-invalid": this.error ? "true" : null,
        "aria-required": this.inputAriaRequired ? "true" : null,
        "placeholder": this.placeholder || null,
        "readonly": this.readonly,
        "disabled": this.disabled,
        "autocomplete": "off",
        "@input": this.onInputInput,
        "@change": this.onInputChange
      };
    }
    /**
     * Renders input element
     * @returns {void}
     */
    renderInput() {
      return y`<input
      ${templateMap(this.decorateInputMap)}
      ${n6(this.inputElRef)}>`;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`${this.renderInput()}`;
    }
    /**
     * Get selection start index
     */
    get selectionStart() {
      return this.inputElement ? this.inputElement.selectionStart : null;
    }
    /**
     * Set selection start index
     * @param index Start index
     */
    set selectionStart(index) {
      if (this.inputElement) {
        this.inputElement.selectionStart = index;
      }
    }
    /**
     * Get selection end index
     */
    get selectionEnd() {
      return this.inputElement ? this.inputElement.selectionEnd : null;
    }
    /**
     * Set selection end index
     * @param index End index
     */
    set selectionEnd(index) {
      if (this.inputElement) {
        this.inputElement.selectionEnd = index;
      }
    }
    /**
     * Gets the direction in which selection occurred
     */
    get selectionDirection() {
      return this.inputElement ? this.inputElement.selectionDirection : null;
    }
    /**
     * Sets the direction in which selection occurred
     * @param direction Selection direction
     */
    set selectionDirection(direction) {
      if (this.inputElement) {
        this.inputElement.selectionDirection = direction;
      }
    }
    /**
     * Select the contents of input
     * @returns void
     */
    select() {
      if (!this.disabled && this.inputElement) {
        this.inputElement.select();
      }
    }
    /**
     * Set the selection range
     * @param startSelection Start of selection
     * @param endSelection End of the selection
     * @param [selectionDirection=none] A string indicating the direction in which the selection is considered to have been performed.
     * @returns {void}
     */
    setSelectionRange(startSelection, endSelection, selectionDirection) {
      this.inputElement?.setSelectionRange(startSelection, endSelection, selectionDirection);
    }
  };
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], FormFieldElement.prototype, "error", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], FormFieldElement.prototype, "warning", void 0);
  __decorate([
    e4({ type: String })
  ], FormFieldElement.prototype, "placeholder", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], FormFieldElement.prototype, "transparent", void 0);
  __decorate([
    t3()
  ], FormFieldElement.prototype, "inputAriaLabel", void 0);
  __decorate([
    t3()
  ], FormFieldElement.prototype, "inputAriaDescription", void 0);
  __decorate([
    t3()
  ], FormFieldElement.prototype, "inputAriaRequired", void 0);

  // ../node_modules/@juggle/resize-observer/lib/utils/resizeObservers.js
  var resizeObservers = [];

  // ../node_modules/@juggle/resize-observer/lib/algorithms/hasActiveObservations.js
  var hasActiveObservations = function() {
    return resizeObservers.some(function(ro) {
      return ro.activeTargets.length > 0;
    });
  };

  // ../node_modules/@juggle/resize-observer/lib/algorithms/hasSkippedObservations.js
  var hasSkippedObservations = function() {
    return resizeObservers.some(function(ro) {
      return ro.skippedTargets.length > 0;
    });
  };

  // ../node_modules/@juggle/resize-observer/lib/algorithms/deliverResizeLoopError.js
  var msg = "ResizeObserver loop completed with undelivered notifications.";
  var deliverResizeLoopError = function() {
    var event;
    if (typeof ErrorEvent === "function") {
      event = new ErrorEvent("error", {
        message: msg
      });
    } else {
      event = document.createEvent("Event");
      event.initEvent("error", false, false);
      event.message = msg;
    }
    window.dispatchEvent(event);
  };

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserverBoxOptions.js
  var ResizeObserverBoxOptions;
  (function(ResizeObserverBoxOptions2) {
    ResizeObserverBoxOptions2["BORDER_BOX"] = "border-box";
    ResizeObserverBoxOptions2["CONTENT_BOX"] = "content-box";
    ResizeObserverBoxOptions2["DEVICE_PIXEL_CONTENT_BOX"] = "device-pixel-content-box";
  })(ResizeObserverBoxOptions || (ResizeObserverBoxOptions = {}));

  // ../node_modules/@juggle/resize-observer/lib/utils/freeze.js
  var freeze = function(obj) {
    return Object.freeze(obj);
  };

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserverSize.js
  var ResizeObserverSize = function() {
    function ResizeObserverSize2(inlineSize, blockSize) {
      this.inlineSize = inlineSize;
      this.blockSize = blockSize;
      freeze(this);
    }
    return ResizeObserverSize2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/DOMRectReadOnly.js
  var DOMRectReadOnly = function() {
    function DOMRectReadOnly2(x2, y2, width, height) {
      this.x = x2;
      this.y = y2;
      this.width = width;
      this.height = height;
      this.top = this.y;
      this.left = this.x;
      this.bottom = this.top + this.height;
      this.right = this.left + this.width;
      return freeze(this);
    }
    DOMRectReadOnly2.prototype.toJSON = function() {
      var _a3 = this, x2 = _a3.x, y2 = _a3.y, top = _a3.top, right = _a3.right, bottom = _a3.bottom, left = _a3.left, width = _a3.width, height = _a3.height;
      return { x: x2, y: y2, top, right, bottom, left, width, height };
    };
    DOMRectReadOnly2.fromRect = function(rectangle) {
      return new DOMRectReadOnly2(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
    };
    return DOMRectReadOnly2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/utils/element.js
  var isSVG = function(target) {
    return target instanceof SVGElement && "getBBox" in target;
  };
  var isHidden = function(target) {
    if (isSVG(target)) {
      var _a3 = target.getBBox(), width = _a3.width, height = _a3.height;
      return !width && !height;
    }
    var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
    return !(offsetWidth || offsetHeight || target.getClientRects().length);
  };
  var isElement = function(obj) {
    var _a3;
    if (obj instanceof Element) {
      return true;
    }
    var scope = (_a3 = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a3 === void 0 ? void 0 : _a3.defaultView;
    return !!(scope && obj instanceof scope.Element);
  };
  var isReplacedElement = function(target) {
    switch (target.tagName) {
      case "INPUT":
        if (target.type !== "image") {
          break;
        }
      case "VIDEO":
      case "AUDIO":
      case "EMBED":
      case "OBJECT":
      case "CANVAS":
      case "IFRAME":
      case "IMG":
        return true;
    }
    return false;
  };

  // ../node_modules/@juggle/resize-observer/lib/utils/global.js
  var global = typeof window !== "undefined" ? window : {};

  // ../node_modules/@juggle/resize-observer/lib/algorithms/calculateBoxSize.js
  var cache = /* @__PURE__ */ new WeakMap();
  var scrollRegexp = /auto|scroll/;
  var verticalRegexp = /^tb|vertical/;
  var IE = /msie|trident/i.test(global.navigator && global.navigator.userAgent);
  var parseDimension = function(pixel) {
    return parseFloat(pixel || "0");
  };
  var size = function(inlineSize, blockSize, switchSizes) {
    if (inlineSize === void 0) {
      inlineSize = 0;
    }
    if (blockSize === void 0) {
      blockSize = 0;
    }
    if (switchSizes === void 0) {
      switchSizes = false;
    }
    return new ResizeObserverSize((switchSizes ? blockSize : inlineSize) || 0, (switchSizes ? inlineSize : blockSize) || 0);
  };
  var zeroBoxes = freeze({
    devicePixelContentBoxSize: size(),
    borderBoxSize: size(),
    contentBoxSize: size(),
    contentRect: new DOMRectReadOnly(0, 0, 0, 0)
  });
  var calculateBoxSizes = function(target, forceRecalculation) {
    if (forceRecalculation === void 0) {
      forceRecalculation = false;
    }
    if (cache.has(target) && !forceRecalculation) {
      return cache.get(target);
    }
    if (isHidden(target)) {
      cache.set(target, zeroBoxes);
      return zeroBoxes;
    }
    var cs = getComputedStyle(target);
    var svg = isSVG(target) && target.ownerSVGElement && target.getBBox();
    var removePadding = !IE && cs.boxSizing === "border-box";
    var switchSizes = verticalRegexp.test(cs.writingMode || "");
    var canScrollVertically = !svg && scrollRegexp.test(cs.overflowY || "");
    var canScrollHorizontally = !svg && scrollRegexp.test(cs.overflowX || "");
    var paddingTop = svg ? 0 : parseDimension(cs.paddingTop);
    var paddingRight = svg ? 0 : parseDimension(cs.paddingRight);
    var paddingBottom = svg ? 0 : parseDimension(cs.paddingBottom);
    var paddingLeft = svg ? 0 : parseDimension(cs.paddingLeft);
    var borderTop = svg ? 0 : parseDimension(cs.borderTopWidth);
    var borderRight = svg ? 0 : parseDimension(cs.borderRightWidth);
    var borderBottom = svg ? 0 : parseDimension(cs.borderBottomWidth);
    var borderLeft = svg ? 0 : parseDimension(cs.borderLeftWidth);
    var horizontalPadding = paddingLeft + paddingRight;
    var verticalPadding = paddingTop + paddingBottom;
    var horizontalBorderArea = borderLeft + borderRight;
    var verticalBorderArea = borderTop + borderBottom;
    var horizontalScrollbarThickness = !canScrollHorizontally ? 0 : target.offsetHeight - verticalBorderArea - target.clientHeight;
    var verticalScrollbarThickness = !canScrollVertically ? 0 : target.offsetWidth - horizontalBorderArea - target.clientWidth;
    var widthReduction = removePadding ? horizontalPadding + horizontalBorderArea : 0;
    var heightReduction = removePadding ? verticalPadding + verticalBorderArea : 0;
    var contentWidth = svg ? svg.width : parseDimension(cs.width) - widthReduction - verticalScrollbarThickness;
    var contentHeight = svg ? svg.height : parseDimension(cs.height) - heightReduction - horizontalScrollbarThickness;
    var borderBoxWidth = contentWidth + horizontalPadding + verticalScrollbarThickness + horizontalBorderArea;
    var borderBoxHeight = contentHeight + verticalPadding + horizontalScrollbarThickness + verticalBorderArea;
    var boxes = freeze({
      devicePixelContentBoxSize: size(Math.round(contentWidth * devicePixelRatio), Math.round(contentHeight * devicePixelRatio), switchSizes),
      borderBoxSize: size(borderBoxWidth, borderBoxHeight, switchSizes),
      contentBoxSize: size(contentWidth, contentHeight, switchSizes),
      contentRect: new DOMRectReadOnly(paddingLeft, paddingTop, contentWidth, contentHeight)
    });
    cache.set(target, boxes);
    return boxes;
  };
  var calculateBoxSize = function(target, observedBox, forceRecalculation) {
    var _a3 = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a3.borderBoxSize, contentBoxSize = _a3.contentBoxSize, devicePixelContentBoxSize = _a3.devicePixelContentBoxSize;
    switch (observedBox) {
      case ResizeObserverBoxOptions.DEVICE_PIXEL_CONTENT_BOX:
        return devicePixelContentBoxSize;
      case ResizeObserverBoxOptions.BORDER_BOX:
        return borderBoxSize;
      default:
        return contentBoxSize;
    }
  };

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserverEntry.js
  var ResizeObserverEntry = function() {
    function ResizeObserverEntry2(target) {
      var boxes = calculateBoxSizes(target);
      this.target = target;
      this.contentRect = boxes.contentRect;
      this.borderBoxSize = freeze([boxes.borderBoxSize]);
      this.contentBoxSize = freeze([boxes.contentBoxSize]);
      this.devicePixelContentBoxSize = freeze([boxes.devicePixelContentBoxSize]);
    }
    return ResizeObserverEntry2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/algorithms/calculateDepthForNode.js
  var calculateDepthForNode = function(node) {
    if (isHidden(node)) {
      return Infinity;
    }
    var depth = 0;
    var parent = node.parentNode;
    while (parent) {
      depth += 1;
      parent = parent.parentNode;
    }
    return depth;
  };

  // ../node_modules/@juggle/resize-observer/lib/algorithms/broadcastActiveObservations.js
  var broadcastActiveObservations = function() {
    var shallowestDepth = Infinity;
    var callbacks3 = [];
    resizeObservers.forEach(function processObserver(ro) {
      if (ro.activeTargets.length === 0) {
        return;
      }
      var entries = [];
      ro.activeTargets.forEach(function processTarget(ot) {
        var entry = new ResizeObserverEntry(ot.target);
        var targetDepth = calculateDepthForNode(ot.target);
        entries.push(entry);
        ot.lastReportedSize = calculateBoxSize(ot.target, ot.observedBox);
        if (targetDepth < shallowestDepth) {
          shallowestDepth = targetDepth;
        }
      });
      callbacks3.push(function resizeObserverCallback() {
        ro.callback.call(ro.observer, entries, ro.observer);
      });
      ro.activeTargets.splice(0, ro.activeTargets.length);
    });
    for (var _i = 0, callbacks_1 = callbacks3; _i < callbacks_1.length; _i++) {
      var callback = callbacks_1[_i];
      callback();
    }
    return shallowestDepth;
  };

  // ../node_modules/@juggle/resize-observer/lib/algorithms/gatherActiveObservationsAtDepth.js
  var gatherActiveObservationsAtDepth = function(depth) {
    resizeObservers.forEach(function processObserver(ro) {
      ro.activeTargets.splice(0, ro.activeTargets.length);
      ro.skippedTargets.splice(0, ro.skippedTargets.length);
      ro.observationTargets.forEach(function processTarget(ot) {
        if (ot.isActive()) {
          if (calculateDepthForNode(ot.target) > depth) {
            ro.activeTargets.push(ot);
          } else {
            ro.skippedTargets.push(ot);
          }
        }
      });
    });
  };

  // ../node_modules/@juggle/resize-observer/lib/utils/process.js
  var process = function() {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
      depth = broadcastActiveObservations();
      gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
      deliverResizeLoopError();
    }
    return depth > 0;
  };

  // ../node_modules/@juggle/resize-observer/lib/utils/queueMicroTask.js
  var trigger;
  var callbacks2 = [];
  var notify = function() {
    return callbacks2.splice(0).forEach(function(cb) {
      return cb();
    });
  };
  var queueMicroTask = function(callback) {
    if (!trigger) {
      var toggle_1 = 0;
      var el_1 = document.createTextNode("");
      var config = { characterData: true };
      new MutationObserver(function() {
        return notify();
      }).observe(el_1, config);
      trigger = function() {
        el_1.textContent = "".concat(toggle_1 ? toggle_1-- : toggle_1++);
      };
    }
    callbacks2.push(callback);
    trigger();
  };

  // ../node_modules/@juggle/resize-observer/lib/utils/queueResizeObserver.js
  var queueResizeObserver = function(cb) {
    queueMicroTask(function ResizeObserver3() {
      requestAnimationFrame(cb);
    });
  };

  // ../node_modules/@juggle/resize-observer/lib/utils/scheduler.js
  var watching = 0;
  var isWatching = function() {
    return !!watching;
  };
  var CATCH_PERIOD = 250;
  var observerConfig = { attributes: true, characterData: true, childList: true, subtree: true };
  var events = [
    "resize",
    "load",
    "transitionend",
    "animationend",
    "animationstart",
    "animationiteration",
    "keyup",
    "keydown",
    "mouseup",
    "mousedown",
    "mouseover",
    "mouseout",
    "blur",
    "focus"
  ];
  var time = function(timeout) {
    if (timeout === void 0) {
      timeout = 0;
    }
    return Date.now() + timeout;
  };
  var scheduled = false;
  var Scheduler = function() {
    function Scheduler2() {
      var _this = this;
      this.stopped = true;
      this.listener = function() {
        return _this.schedule();
      };
    }
    Scheduler2.prototype.run = function(timeout) {
      var _this = this;
      if (timeout === void 0) {
        timeout = CATCH_PERIOD;
      }
      if (scheduled) {
        return;
      }
      scheduled = true;
      var until = time(timeout);
      queueResizeObserver(function() {
        var elementsHaveResized = false;
        try {
          elementsHaveResized = process();
        } finally {
          scheduled = false;
          timeout = until - time();
          if (!isWatching()) {
            return;
          }
          if (elementsHaveResized) {
            _this.run(1e3);
          } else if (timeout > 0) {
            _this.run(timeout);
          } else {
            _this.start();
          }
        }
      });
    };
    Scheduler2.prototype.schedule = function() {
      this.stop();
      this.run();
    };
    Scheduler2.prototype.observe = function() {
      var _this = this;
      var cb = function() {
        return _this.observer && _this.observer.observe(document.body, observerConfig);
      };
      document.body ? cb() : global.addEventListener("DOMContentLoaded", cb);
    };
    Scheduler2.prototype.start = function() {
      var _this = this;
      if (this.stopped) {
        this.stopped = false;
        this.observer = new MutationObserver(this.listener);
        this.observe();
        events.forEach(function(name) {
          return global.addEventListener(name, _this.listener, true);
        });
      }
    };
    Scheduler2.prototype.stop = function() {
      var _this = this;
      if (!this.stopped) {
        this.observer && this.observer.disconnect();
        events.forEach(function(name) {
          return global.removeEventListener(name, _this.listener, true);
        });
        this.stopped = true;
      }
    };
    return Scheduler2;
  }();
  var scheduler = new Scheduler();
  var updateCount = function(n7) {
    !watching && n7 > 0 && scheduler.start();
    watching += n7;
    !watching && scheduler.stop();
  };

  // ../node_modules/@juggle/resize-observer/lib/ResizeObservation.js
  var skipNotifyOnElement = function(target) {
    return !isSVG(target) && !isReplacedElement(target) && getComputedStyle(target).display === "inline";
  };
  var ResizeObservation = function() {
    function ResizeObservation2(target, observedBox) {
      this.target = target;
      this.observedBox = observedBox || ResizeObserverBoxOptions.CONTENT_BOX;
      this.lastReportedSize = {
        inlineSize: 0,
        blockSize: 0
      };
    }
    ResizeObservation2.prototype.isActive = function() {
      var size2 = calculateBoxSize(this.target, this.observedBox, true);
      if (skipNotifyOnElement(this.target)) {
        this.lastReportedSize = size2;
      }
      if (this.lastReportedSize.inlineSize !== size2.inlineSize || this.lastReportedSize.blockSize !== size2.blockSize) {
        return true;
      }
      return false;
    };
    return ResizeObservation2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserverDetail.js
  var ResizeObserverDetail = function() {
    function ResizeObserverDetail2(resizeObserver2, callback) {
      this.activeTargets = [];
      this.skippedTargets = [];
      this.observationTargets = [];
      this.observer = resizeObserver2;
      this.callback = callback;
    }
    return ResizeObserverDetail2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserverController.js
  var observerMap = /* @__PURE__ */ new WeakMap();
  var getObservationIndex = function(observationTargets, target) {
    for (var i7 = 0; i7 < observationTargets.length; i7 += 1) {
      if (observationTargets[i7].target === target) {
        return i7;
      }
    }
    return -1;
  };
  var ResizeObserverController = function() {
    function ResizeObserverController2() {
    }
    ResizeObserverController2.connect = function(resizeObserver2, callback) {
      var detail = new ResizeObserverDetail(resizeObserver2, callback);
      observerMap.set(resizeObserver2, detail);
    };
    ResizeObserverController2.observe = function(resizeObserver2, target, options) {
      var detail = observerMap.get(resizeObserver2);
      var firstObservation = detail.observationTargets.length === 0;
      if (getObservationIndex(detail.observationTargets, target) < 0) {
        firstObservation && resizeObservers.push(detail);
        detail.observationTargets.push(new ResizeObservation(target, options && options.box));
        updateCount(1);
        scheduler.schedule();
      }
    };
    ResizeObserverController2.unobserve = function(resizeObserver2, target) {
      var detail = observerMap.get(resizeObserver2);
      var index = getObservationIndex(detail.observationTargets, target);
      var lastObservation = detail.observationTargets.length === 1;
      if (index >= 0) {
        lastObservation && resizeObservers.splice(resizeObservers.indexOf(detail), 1);
        detail.observationTargets.splice(index, 1);
        updateCount(-1);
      }
    };
    ResizeObserverController2.disconnect = function(resizeObserver2) {
      var _this = this;
      var detail = observerMap.get(resizeObserver2);
      detail.observationTargets.slice().forEach(function(ot) {
        return _this.unobserve(resizeObserver2, ot.target);
      });
      detail.activeTargets.splice(0, detail.activeTargets.length);
    };
    return ResizeObserverController2;
  }();

  // ../node_modules/@juggle/resize-observer/lib/ResizeObserver.js
  var ResizeObserver2 = function() {
    function ResizeObserver3(callback) {
      if (arguments.length === 0) {
        throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
      }
      if (typeof callback !== "function") {
        throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
      }
      ResizeObserverController.connect(this, callback);
    }
    ResizeObserver3.prototype.observe = function(target, options) {
      if (arguments.length === 0) {
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
      }
      if (!isElement(target)) {
        throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
      }
      ResizeObserverController.observe(this, target, options);
    };
    ResizeObserver3.prototype.unobserve = function(target) {
      if (arguments.length === 0) {
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
      }
      if (!isElement(target)) {
        throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
      }
      ResizeObserverController.unobserve(this, target);
    };
    ResizeObserver3.prototype.disconnect = function() {
      ResizeObserverController.disconnect(this);
    };
    ResizeObserver3.toString = function() {
      return "function ResizeObserver () { [polyfill code] }";
    };
    return ResizeObserver3;
  }();

  // ../packages/core/lib/elements/ResponsiveElement.js
  var triggerResize = (entry) => {
    const { inlineSize: width, blockSize: height } = entry.borderBoxSize[0];
    const event = new CustomEvent("resize", {
      bubbles: false,
      cancelable: false,
      detail: {
        width,
        height
      }
    });
    entry.target.resizedCallback({ width, height });
    entry.target.dispatchEvent(event);
  };
  var entriesResize = (entries) => {
    entries.forEach((entry) => triggerResize(entry));
  };
  var resizeObserver = typeof ResizeObserver === "function" ? new ResizeObserver(entriesResize) : new ResizeObserver2(entriesResize);
  var ResponsiveElement = class extends BasicElement {
    /**
     * Called when the element has been appended to the DOM
     * @returns {void}
     */
    connectedCallback() {
      super.connectedCallback();
      resizeObserver.observe(this, {
        box: "border-box"
        // Observe the outer edges
      });
    }
    /**
     * Called when the element has been removed from the DOM
     * @returns {void}
     */
    disconnectedCallback() {
      resizeObserver.unobserve(this);
      super.disconnectedCallback();
    }
    /**
     * Called when the element's dimensions have changed
     * @param size dimension details
     * @returns {void}
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    resizedCallback(size2) {
    }
  };

  // ../packages/core/lib/utils/global.js
  var global2 = typeof window === "undefined" ? {} : window;

  // ../packages/core/lib/events/TapEvent.js
  var positions;
  var metaKeys;
  var TapEvent = class extends Event {
    constructor(type, eventInitDict) {
      super(type, eventInitDict);
      this.pageX = 0;
      this.pageY = 0;
      this.screenX = 0;
      this.screenY = 0;
      this.clientX = 0;
      this.clientY = 0;
      this.altKey = false;
      this.ctrlKey = false;
      this.metaKey = false;
      this.shiftKey = false;
      if (positions) {
        this.pageX = positions.pageX;
        this.pageY = positions.pageY;
        this.screenX = positions.screenX;
        this.screenY = positions.screenY;
        this.clientX = positions.clientX;
        this.clientY = positions.clientY;
      }
      if (metaKeys) {
        this.altKey = metaKeys.altKey;
        this.ctrlKey = metaKeys.ctrlKey;
        this.metaKey = metaKeys.metaKey;
        this.shiftKey = metaKeys.shiftKey;
      }
    }
  };
  var isButtonEnterOrSpace = (event) => {
    return event.detail === 0;
  };
  var isButtonBehaviour = (target) => target instanceof HTMLElement && target.matches("[role=button]") && !target.matches("button,a,input[type=button],input[type=submit]");
  var isEnterKey = (event) => event.key === "Enter";
  var isSpaceKey = (event) => event.key === " " || event.key === "Spacebar";
  var topPathTarget = (event) => [...event.composedPath()][0];
  var applyEvent = (target) => {
    const onTap = !("ontap" in target);
    const onTapEnd = !("ontapend" in target);
    const onTapStart = !("ontapstart" in target);
    if (!onTap && !onTapEnd && !onTapStart) {
      return;
    }
    let startTouch;
    let currentTouch = -1;
    let lastTapTarget;
    let buttonLastKeydownTarget;
    let mouseEventPath = [];
    let touchEventPath = [];
    const dispatchTapOnTarget = (type, target2, info) => {
      const { pageX, pageY, screenX, screenY, clientX, clientY } = info;
      positions = { pageX, pageY, screenX, screenY, clientX, clientY };
      if (info instanceof MouseEvent) {
        const { altKey, ctrlKey, shiftKey, metaKey } = info;
        metaKeys = { altKey, ctrlKey, shiftKey, metaKey };
      } else {
        metaKeys = void 0;
      }
      const tapEvent = new TapEvent(type, {
        bubbles: true,
        composed: true,
        cancelable: true
      });
      target2.dispatchEvent(tapEvent);
      if (tapEvent.defaultPrevented && info instanceof Event) {
        info.preventDefault();
      }
    };
    target.addEventListener("mousedown", (event) => {
      if (!lastTapTarget && event.target && currentTouch === -1) {
        mouseEventPath = [...event.composedPath()];
        const tapTarget2 = mouseEventPath[0];
        if (tapTarget2) {
          onTapStart && dispatchTapOnTarget("tapstart", tapTarget2, event);
        }
      }
    }, true);
    target.addEventListener("mouseup", (event) => {
      if (lastTapTarget) {
        lastTapTarget = null;
        return;
      }
      const path = [...event.composedPath()];
      const tapEndTarget = path[0];
      if (tapEndTarget) {
        onTapEnd && dispatchTapOnTarget("tapend", tapEndTarget, event);
      }
      if (!onTap) {
        return;
      }
      if (mouseEventPath.length < path.length) {
        path.splice(0, path.length - mouseEventPath.length);
      } else if (mouseEventPath.length > path.length) {
        mouseEventPath.splice(0, mouseEventPath.length - path.length);
      }
      for (let i7 = 0; i7 < mouseEventPath.length - 1; i7 += 1) {
        if (mouseEventPath[i7] === path[i7] && path[i7].nodeType === Node.ELEMENT_NODE) {
          const tapTarget2 = mouseEventPath[i7];
          dispatchTapOnTarget("tap", tapTarget2, event);
          break;
        }
      }
    }, true);
    target.addEventListener("touchstart", (event) => {
      startTouch = event.changedTouches[0];
      currentTouch = startTouch.identifier;
      touchEventPath = [...event.composedPath()];
      const tapTarget2 = touchEventPath[0];
      if (tapTarget2) {
        onTapStart && dispatchTapOnTarget("tapstart", tapTarget2, startTouch);
      }
    }, true);
    target.addEventListener("touchmove", () => {
      currentTouch = -1;
    }, true);
    target.addEventListener("touchend", (event) => {
      try {
        const touch = event.changedTouches[0];
        const path = [...event.composedPath()];
        if (touchEventPath.length < path.length) {
          path.splice(0, path.length - touchEventPath.length);
        }
        const tapTarget2 = path[0];
        if (tapTarget2) {
          onTapEnd && dispatchTapOnTarget("tapend", tapTarget2, touch);
        }
        if (tapTarget2 && touch.identifier === currentTouch) {
          lastTapTarget = tapTarget2;
          onTap && dispatchTapOnTarget("tap", tapTarget2, touch);
        }
      } finally {
        currentTouch = -1;
      }
    }, true);
    target.addEventListener("click", (event) => {
      if (isButtonEnterOrSpace(event)) {
        const tapTarget2 = topPathTarget(event);
        onTap && dispatchTapOnTarget("tap", tapTarget2, event);
      }
    }, true);
    target.addEventListener("keydown", (event) => {
      const target2 = topPathTarget(event);
      const enterKey = isEnterKey(event);
      buttonLastKeydownTarget = null;
      if (event.defaultPrevented || !(enterKey || isSpaceKey(event)) || !isButtonBehaviour(target2)) {
        return;
      }
      buttonLastKeydownTarget = target2;
      if (enterKey) {
        target2.click();
      }
      event.preventDefault();
    }, true);
    target.addEventListener("keyup", (event) => {
      const target2 = topPathTarget(event);
      if (buttonLastKeydownTarget === target2 && !event.defaultPrevented && isSpaceKey(event)) {
        target2.click();
      }
      buttonLastKeydownTarget = null;
    }, true);
    const tapTarget = target;
    tapTarget.ontap = null;
    tapTarget.ontapstart = null;
    tapTarget.ontapend = null;
  };
  applyEvent(global2);

  // ../packages/core/lib/utils/resizeHelper.js
  var triggerResize2 = () => {
    window.dispatchEvent(new Event("animationiteration"));
  };

  // ../packages/core/lib/registries/NativeStyleRegistry.js
  var register4 = /* @__PURE__ */ new Map();
  var NativeStyleRegistry = class {
    /**
     * Defines a style definition for a native element.
     * @param name tag name of the element
     * @param css css styles for the element
     * @returns {void}
     */
    static define(name, css) {
      if (register4.has(name)) {
        throw new DuplicateStyleError(name);
      }
      register4.set(name, css);
      if (!css) {
        return;
      }
      const head = document.head;
      const childRef = head.firstElementChild;
      const style = document.createElement("style");
      style.setAttribute("scope", name);
      style.textContent = css;
      childRef ? head.insertBefore(style, childRef) : head.appendChild(style);
    }
    /**
     * Gets any native style that has already been defined.
     * @param name tag name of the element
     * @returns css styles, based on the tag name
     */
    static get(name) {
      return register4.get(name) || "";
    }
  };

  // ../packages/core/lib/index.js
  global2.addEventListener("ef.customStyles.define", (event) => {
    const { name, styles } = event.detail;
    CustomStyleRegistry.define(name, styles);
  });
  global2.addEventListener("ef.nativeStyles.define", (event) => {
    const { name, styles } = event.detail;
    NativeStyleRegistry.define(name, styles);
  });

  // ../packages/core/lib/decorators/custom-element.js
  var defaultOptions = {
    theme: true
  };
  var customElement = function(name, options = defaultOptions) {
    options = { ...defaultOptions, ...options };
    return (target) => {
      ElementRegistry.define(name, target);
      if (options.theme === false) {
        CustomStyleRegistry.define(name, "");
      }
    };
  };

  // ../node_modules/lit-html/directives/unsafe-html.js
  var e8 = class extends i4 {
    constructor(i7) {
      if (super(i7), this.it = b, i7.type !== t4.CHILD)
        throw Error(this.constructor.directiveName + "() can only be used in child bindings");
    }
    render(r5) {
      if (r5 === b || null == r5)
        return this._t = void 0, this.it = r5;
      if (r5 === x)
        return r5;
      if ("string" != typeof r5)
        throw Error(this.constructor.directiveName + "() called with a non-string value");
      if (r5 === this.it)
        return this._t;
      this.it = r5;
      const s6 = [r5];
      return s6.raw = s6, this._t = { _$litType$: this.constructor.resultType, strings: s6, values: [] };
    }
  };
  e8.directiveName = "unsafeHTML", e8.resultType = 1;
  var o7 = e5(e8);

  // ../node_modules/lit-html/directives/unsafe-svg.js
  var t5 = class extends e8 {
  };
  t5.directiveName = "unsafeSVG", t5.resultType = 2;
  var o8 = e5(t5);

  // ../packages/components/lib/version.js
  var VERSION = "PUBLISH_VERSION";

  // ../packages/utils/lib/loader/deferred.js
  var Deferred = class {
    constructor() {
      this._resolve = () => {
      };
      this._reject = () => {
      };
      this._promise = new Promise((resolve, reject) => {
        this._reject = reject;
        this._resolve = resolve;
      });
    }
    get promise() {
      return this._promise;
    }
    resolve(value) {
      this._resolve(value);
    }
    reject(value) {
      this._reject(value);
    }
  };

  // ../packages/utils/lib/loader/cdn-loader.js
  var CDNLoader = class {
    constructor() {
      this._isPrefixSet = false;
      this.responseCache = /* @__PURE__ */ new Map();
      this.cdnPrefix = new Deferred();
    }
    /**
     * @returns {boolean} clarify whether prefix has been set or not.
     */
    get isPrefixSet() {
      return this._isPrefixSet;
    }
    /**
     * @returns promise, which will be resolved with CDN prefix, once set.
     */
    getCdnPrefix() {
      return this.cdnPrefix.promise;
    }
    /**
     * Sets CDN prefix to load source.
     * Resolves deferred promise with CDN prefix and sets src used to check whether prefix is already set or not.
     * @param prefix - CDN prefix.
     * @returns {void}
     */
    setCdnPrefix(prefix) {
      if (prefix) {
        this.cdnPrefix.resolve(prefix);
        this._isPrefixSet = true;
      }
    }
    /**
     * Asynchronously tries to load
     * @param href The location of the SVG to load
     * @returns Promise of the SVG body
     */
    async loadContent(href) {
      try {
        return await fetch(href);
      } catch (e9) {
        this.responseCache.delete(href);
        let errorMessage2 = "";
        if (e9 instanceof Error) {
          errorMessage2 = e9.message;
        } else if (e9 instanceof Response) {
          errorMessage2 = e9.statusText;
        }
        return Promise.resolve({
          status: 0,
          statusText: errorMessage2
        });
      }
    }
    /**
     * Tries to load an src either by src or by provided URL
     * @param src name or Source location.
     * @returns Promise which will be resolved with response body
     */
    async load(src) {
      if (src) {
        if (!this.responseCache.has(src)) {
          this.responseCache.set(src, this.loadContent(src));
        }
        return this.responseCache.get(src);
      }
    }
  };

  // ../node_modules/idb/build/wrap-idb-value.js
  var instanceOfAny = (object, constructors) => constructors.some((c4) => object instanceof c4);
  var idbProxyableTypes;
  var cursorAdvanceMethods;
  function getIdbProxyableTypes() {
    return idbProxyableTypes || (idbProxyableTypes = [
      IDBDatabase,
      IDBObjectStore,
      IDBIndex,
      IDBCursor,
      IDBTransaction
    ]);
  }
  function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
      IDBCursor.prototype.advance,
      IDBCursor.prototype.continue,
      IDBCursor.prototype.continuePrimaryKey
    ]);
  }
  var cursorRequestMap = /* @__PURE__ */ new WeakMap();
  var transactionDoneMap = /* @__PURE__ */ new WeakMap();
  var transactionStoreNamesMap = /* @__PURE__ */ new WeakMap();
  var transformCache = /* @__PURE__ */ new WeakMap();
  var reverseTransformCache = /* @__PURE__ */ new WeakMap();
  function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
      const unlisten = () => {
        request.removeEventListener("success", success);
        request.removeEventListener("error", error);
      };
      const success = () => {
        resolve(wrap(request.result));
        unlisten();
      };
      const error = () => {
        reject(request.error);
        unlisten();
      };
      request.addEventListener("success", success);
      request.addEventListener("error", error);
    });
    promise.then((value) => {
      if (value instanceof IDBCursor) {
        cursorRequestMap.set(value, request);
      }
    }).catch(() => {
    });
    reverseTransformCache.set(promise, request);
    return promise;
  }
  function cacheDonePromiseForTransaction(tx) {
    if (transactionDoneMap.has(tx))
      return;
    const done = new Promise((resolve, reject) => {
      const unlisten = () => {
        tx.removeEventListener("complete", complete);
        tx.removeEventListener("error", error);
        tx.removeEventListener("abort", error);
      };
      const complete = () => {
        resolve();
        unlisten();
      };
      const error = () => {
        reject(tx.error || new DOMException("AbortError", "AbortError"));
        unlisten();
      };
      tx.addEventListener("complete", complete);
      tx.addEventListener("error", error);
      tx.addEventListener("abort", error);
    });
    transactionDoneMap.set(tx, done);
  }
  var idbProxyTraps = {
    get(target, prop, receiver) {
      if (target instanceof IDBTransaction) {
        if (prop === "done")
          return transactionDoneMap.get(target);
        if (prop === "objectStoreNames") {
          return target.objectStoreNames || transactionStoreNamesMap.get(target);
        }
        if (prop === "store") {
          return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
        }
      }
      return wrap(target[prop]);
    },
    set(target, prop, value) {
      target[prop] = value;
      return true;
    },
    has(target, prop) {
      if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) {
        return true;
      }
      return prop in target;
    }
  };
  function replaceTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
  }
  function wrapFunction(func) {
    if (func === IDBDatabase.prototype.transaction && !("objectStoreNames" in IDBTransaction.prototype)) {
      return function(storeNames, ...args) {
        const tx = func.call(unwrap(this), storeNames, ...args);
        transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
        return wrap(tx);
      };
    }
    if (getCursorAdvanceMethods().includes(func)) {
      return function(...args) {
        func.apply(unwrap(this), args);
        return wrap(cursorRequestMap.get(this));
      };
    }
    return function(...args) {
      return wrap(func.apply(unwrap(this), args));
    };
  }
  function transformCachableValue(value) {
    if (typeof value === "function")
      return wrapFunction(value);
    if (value instanceof IDBTransaction)
      cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
      return new Proxy(value, idbProxyTraps);
    return value;
  }
  function wrap(value) {
    if (value instanceof IDBRequest)
      return promisifyRequest(value);
    if (transformCache.has(value))
      return transformCache.get(value);
    const newValue = transformCachableValue(value);
    if (newValue !== value) {
      transformCache.set(value, newValue);
      reverseTransformCache.set(newValue, value);
    }
    return newValue;
  }
  var unwrap = (value) => reverseTransformCache.get(value);

  // ../node_modules/idb/build/index.js
  function openDB(name, version, { blocked, upgrade: upgrade2, blocking, terminated } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = wrap(request);
    if (upgrade2) {
      request.addEventListener("upgradeneeded", (event) => {
        upgrade2(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
      });
    }
    if (blocked) {
      request.addEventListener("blocked", (event) => blocked(
        // Casting due to https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1405
        event.oldVersion,
        event.newVersion,
        event
      ));
    }
    openPromise.then((db) => {
      if (terminated)
        db.addEventListener("close", () => terminated());
      if (blocking) {
        db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
      }
    }).catch(() => {
    });
    return openPromise;
  }
  var readMethods = ["get", "getKey", "getAll", "getAllKeys", "count"];
  var writeMethods = ["put", "add", "delete", "clear"];
  var cachedMethods = /* @__PURE__ */ new Map();
  function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) {
      return;
    }
    if (cachedMethods.get(prop))
      return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, "");
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
      // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
      !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))
    ) {
      return;
    }
    const method = async function(storeName, ...args) {
      const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
      let target2 = tx.store;
      if (useIndex)
        target2 = target2.index(args.shift());
      return (await Promise.all([
        target2[targetFuncName](...args),
        isWrite && tx.done
      ]))[0];
    };
    cachedMethods.set(prop, method);
    return method;
  }
  replaceTraps((oldTraps) => ({
    ...oldTraps,
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
  }));

  // ../packages/utils/lib/cache/constants.js
  var DatabasePrefix;
  (function(DatabasePrefix2) {
    DatabasePrefix2["DEFAULT"] = "ef";
  })(DatabasePrefix || (DatabasePrefix = {}));

  // ../packages/utils/lib/cache/storages/indexeddb.js
  var errorMessage = (message, dbName) => {
    return new Error(`Unable to connect to indexedDB.
Attempt connect database is name: ${dbName}. store: ${dbName}
 ${message}`);
  };
  var IndexedDBStorage = class {
    /**
     * Constructor
     * @param name database name
     */
    constructor(name) {
      this.version = 1;
      this.ready = null;
      this.dbName = `[${DatabasePrefix.DEFAULT}][${name}]`;
      void this.open();
    }
    /**
     * Set item against a key
     * @param key item key
     * @param value item value
     * @returns {void}
     */
    async set(key, value) {
      await this.ready;
      const item = { ...value, key };
      this.cache?.set(key, item);
      await this.db?.put(this.dbName, item, key);
    }
    /**
     * Returns an item from cache database using provided key
     * @param key item key
     * @returns CacheItem or `null` if nothing is cached
     */
    async get(key) {
      await this.ready;
      return this.cache?.get(key) || null;
    }
    /**
     * Removes an item from cache database using provided key
     * @param key item key
     * @returns {void}
     */
    async remove(key) {
      await this.ready;
      this.cache?.delete(key);
      await this.db?.delete(this.dbName, key);
    }
    /**
     * Clears all items in this storage
     * @returns {void}
     */
    async clear() {
      await this.ready;
      this.cache?.clear();
      await this.db?.clear(this.dbName);
    }
    /**
     * Restores all values into memory cache
     * @returns {void}
     */
    async restore() {
      const cache3 = /* @__PURE__ */ new Map();
      let cursor = await this.db?.transaction(this.dbName, "readonly").store.openCursor();
      while (cursor) {
        cache3.set(cursor.key, cursor.value);
        cursor = await cursor.continue();
      }
      this.cache = cache3;
    }
    /**
     * Open connection to indexedDB.
     * @returns {void}
     */
    async open() {
      if (this.db) {
        return;
      }
      this.db = await openDB(this.dbName, this.version, {
        upgrade: (database) => {
          if (database.objectStoreNames.contains(this.dbName)) {
            database.deleteObjectStore(this.dbName);
          }
          database.createObjectStore(this.dbName);
        },
        blocked: () => {
          throw errorMessage(`blocked event called. The connection is blocked by other connection or your version (${this.version}) isn't matched.`, this.dbName);
        },
        blocking: () => {
          console.warn(`versionchange event called. The version of this ${String(this.dbName)} database has changed.`);
        },
        terminated: () => {
          throw errorMessage("close event called. The connection is unexpectedly closed.", this.dbName);
        }
      });
      this.ready = this.getReady();
    }
    /**
     * Prepare memory cache variable and restore all data from databases storage
     * @returns Promise boolean
     */
    async getReady() {
      try {
        await this.restore();
        return true;
      } catch (e9) {
        this.cache = /* @__PURE__ */ new Map();
        return false;
      }
    }
  };

  // ../packages/utils/lib/cache/storages/localstorage.js
  var getItemKey = (prefix, cacheKey) => `${prefix}[${cacheKey}]`;
  var LocalStorage = class {
    /**
     * Constructor
     * @param name name of the data store
     */
    constructor(name) {
      this.dbName = "";
      this.dbName = `[${DatabasePrefix.DEFAULT}][${name}]`;
      void this.getReady();
    }
    /**
     * Prepare memory cache variable and restore all data from databases storage
     * @returns Promise boolean
     */
    async getReady() {
      try {
        await this.restore();
      } catch (e9) {
        this.cache = /* @__PURE__ */ new Map();
        console.error(e9);
      }
    }
    /**
     * Set a item against a key to this storage
     * @param key Cache key
     * @param value Data to store in cache
     * @returns {void}
     */
    async set(key, value) {
      const itemKey = getItemKey(this.dbName, key);
      this.cache?.set(itemKey, value);
      try {
        localStorage.setItem(itemKey, JSON.stringify(value));
      } catch (e9) {
        console.error(`Couldn't store at key: ${itemKey}.`, e9);
      }
      return Promise.resolve();
    }
    /**
     * Returns an item from cache database using provided key
     * @param key Cache key
     * @returns CacheItem or `null` if nothing is cached
     */
    async get(key) {
      const itemKey = getItemKey(this.dbName, key);
      return Promise.resolve(this.cache?.get(itemKey) || null);
    }
    /**
     * Removes an item from cache database using provided key
     * @param key Cache key to remove
     * @returns {void}
     */
    async remove(key) {
      const itemKey = getItemKey(this.dbName, key);
      return Promise.resolve(localStorage.removeItem(itemKey));
    }
    /**
     * Clears all items in localStorage
     * @returns {void}
     */
    async clear() {
      const keys = Object.keys(localStorage);
      keys.filter((key) => key.startsWith(this.dbName)).forEach((key) => {
        localStorage.removeItem(key);
      });
      return Promise.resolve();
    }
    /**
     * Restores all values into memory cache
     * @returns {void}
     */
    async restore() {
      const cache3 = /* @__PURE__ */ new Map();
      const keys = Object.keys(localStorage).filter((key) => key.startsWith(this.dbName));
      for (let i7 = 0; i7 < keys.length; i7 += 1) {
        const item = this.retrieve(keys[i7]);
        if (item) {
          cache3.set(keys[i7], item);
        }
      }
      this.cache = cache3;
      return Promise.resolve();
    }
    /**
     * Retrieves cache item from localStorage
     * @param key key to retrieve value
     * @returns data from the key
     */
    retrieve(key) {
      try {
        return JSON.parse(localStorage.getItem(key) || "");
      } catch (e9) {
        return null;
      }
    }
  };

  // ../packages/utils/lib/cache/local-cache.js
  var LocalCache = class {
    constructor(name, config) {
      if (typeof name !== "string") {
        throw new TypeError("Expected name to be of type string");
      }
      if (name.length === 0) {
        throw new RangeError("Expected name to have a length");
      }
      const options = Object.assign({}, config);
      switch (options.storage) {
        case "indexeddb":
          this.storage = new IndexedDBStorage(name);
          break;
        case "localstorage":
        case void 0:
          this.storage = new LocalStorage(name);
          break;
        default:
          throw new TypeError("Unknown storage type");
      }
    }
    /**
     * Caches a value against a key to use until expired
     * @param key Cache key
     * @param value Data to store in cache
     * @param [expires=432000] Cache expiry in seconds. Defaults to 5 days.
     * @returns {void}
     */
    async set(key, value, expires = 432e3) {
      const modified = Date.now();
      const data = {
        value,
        modified,
        expires: modified + expires * 1e3
      };
      await this.storage.set(key, data);
    }
    /**
     * Returns cache data value based on provided key
     * @param key Cache key
     * @returns Promise string data or `null` if nothing is cached
     */
    async get(key) {
      const item = await this.storage.get(key);
      if (item && item.expires > Date.now()) {
        return Promise.resolve(item.value);
      }
      return Promise.resolve(null);
    }
    /**
     * Remove cache data value based on provided key
     * @param key Cache key
     * @returns {void}
     */
    async remove(key) {
      await this.storage.remove(key);
    }
    /**
     * Clear all memory cache
     * @returns {void}
     */
    async clear() {
      await this.storage.clear();
    }
  };

  // ../packages/utils/lib/loader/svg-loader.js
  var cache2 = new LocalCache("svg-loader", { storage: "indexeddb" });
  var isUrl = (str) => /^(https?:\/{2}|\.?\/)/i.test(str);
  var stripUnsafeAttributes = (element) => {
    const attributes = element.getAttributeNames();
    for (const attribute of attributes) {
      if (attribute.startsWith("on")) {
        element.removeAttribute(attribute);
      }
    }
  };
  var stripUnsafeNodes = (...elements) => {
    for (const el of elements) {
      if (el instanceof SVGElement && "getBBox" in el) {
        stripUnsafeAttributes(el);
        stripUnsafeNodes(...el.childNodes);
      } else {
        el.parentNode?.removeChild(el);
      }
    }
  };
  var isValidResponse = (response) => {
    const isSVG2 = Boolean(response?.headers.get("content-type")?.startsWith("image/svg+xml"));
    return Boolean(response) && Boolean(response?.ok) && response?.status === 200 && isSVG2;
  };
  var extractSafeSVG = async (response) => {
    if (isValidResponse(response)) {
      const responseText = await response.clone().text();
      const svgDocument = new window.DOMParser().parseFromString(responseText, "image/svg+xml");
      const svg = svgDocument.children[svgDocument.children.length - 1];
      if (svg instanceof SVGElement) {
        stripUnsafeNodes(svg);
        return svg;
      }
    }
    return null;
  };
  var SVGLoader = class extends CDNLoader {
    constructor() {
      super(...arguments);
      this.xmlSerializer = new XMLSerializer();
    }
    /**
     * Creates complete source using CDN prefix and src.
     * Waits for CDN prefix to be set.
     * @param name - resource path for download
     * @returns Promise, which will be resolved with complete source.
     */
    async getSrc(name) {
      if (isUrl(name)) {
        return name;
      }
      return name ? `${await this.getCdnPrefix()}${name}.svg` : "";
    }
    /**
     * Loads icon and returns the body of the SVG
     * @param name Name of SVG to load
     * @returns SVG body of the response
     */
    async loadSVG(name) {
      if (!name) {
        return;
      }
      const src = await this.getSrc(name);
      const cacheItem = await cache2.get(src);
      if (cacheItem === null) {
        const response = await this.load(src);
        const svg = await extractSafeSVG(response);
        const svgBody = svg?.outerHTML;
        if (svgBody) {
          await cache2.set(src, svgBody);
        }
        return svgBody;
      }
      return cacheItem;
    }
  };

  // ../packages/components/lib/sub-icon/utils/IconLoader.js
  var IconLoader = class extends SVGLoader {
  };
  var iconLoaderInstance = new IconLoader();
  var preload = (...attrs) => {
    return attrs.map((icon) => iconLoaderInstance.loadSVG(icon));
  };

  // ../packages/components/lib/sub-icon/index.js
  var EmptyTemplate = w``;
  var iconTemplateCache = /* @__PURE__ */ new Map();
  var Icon = class Icon2 extends BasicElement {
    constructor() {
      super(...arguments);
      this._icon = null;
      this._src = null;
      this._template = EmptyTemplate;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        --cdn-prefix: 'https://cdn.refinitiv.net/public/libs/elf/assets/elf-theme-halo/resources/icons/';
        display: inline-block;
        line-height: 1;
        width: 1em;
        height: 1em;
      }
      svg {
        width: 100%;
        height: 100%;
      }
      g[fill]:not([fill=none]),
      path[fill]:not([fill=none]),
      rect[fill]:not([fill=none]),
      line[fill]:not([fill=none]),
      circle[fill]:not([fill=none]),
      ellipse[fill]:not([fill=none]),
      polyline[fill]:not([fill=none]),
      polygon[fill]:not([fill=none]) {
        fill: currentColor;
      }
      g[stroke]:not([stroke=none]),
      path[stroke]:not([stroke=none]),
      rect[stroke]:not([stroke=none]),
      line[stroke]:not([stroke=none]),
      circle[stroke]:not([stroke=none]),
      ellipse[stroke]:not([stroke=none]),
      polyline[stroke]:not([stroke=none]),
      polygon[stroke]:not([stroke=none]) {
        stroke: currentColor;
      }
    `;
    }
    /**
     * Name of a known icon to render or URL of SVG icon.
     * @example heart | https://cdn.io/icons/heart.svg
     * @default null
     */
    get icon() {
      return this._icon;
    }
    set icon(value) {
      const oldValue = this._icon;
      if (oldValue !== value) {
        this._icon = value;
        void this.setIconSrc();
        this.requestUpdate("icon", oldValue);
      }
    }
    /**
     * Src location of an svg icon.
     * @example https://cdn.io/icons/heart.svg
     * @deprecated Use `icon` instead
     * @default null
     */
    get src() {
      return this._src;
    }
    set src(value) {
      if (this.src !== value) {
        this._src = value;
        this.clearIcon();
        if (value) {
          void this.loadAndRenderIcon(value);
        }
      }
    }
    /**
     * The icon template to render
     */
    get template() {
      return this._template;
    }
    set template(value) {
      if (this._template !== value) {
        this._template = value;
        this.requestUpdate();
      }
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.setPrefix();
    }
    /**
     * Helper method, used to set the icon src.
     * @returns {void}
     */
    async setIconSrc() {
      this.src = this.icon ? await iconLoaderInstance.getSrc(this.icon) : null;
    }
    /**
     * Tries to load an icon from the url provided
     * and the renders this into the icon template.
     * @param src Source location of the svg icon.
     * @returns {void}
     */
    async loadAndRenderIcon(src) {
      const iconTemplateCacheItem = iconTemplateCache.get(src);
      if (!iconTemplateCacheItem) {
        iconTemplateCache.set(src, iconLoaderInstance.loadSVG(src).then((body) => w`${o8(body)}`));
        return this.loadAndRenderIcon(src);
      }
      this.template = await iconTemplateCacheItem;
    }
    /**
     * Get and cache CDN prefix
     * This is a private URL which is set in the theme
     * and should not be configured again via the variable.
     * @returns {void}
     */
    setPrefix() {
      if (!iconLoaderInstance.isPrefixSet) {
        const CDNPrefix = this.getComputedVariable("--cdn-prefix").replace(/^('|")|('|")$/g, "");
        iconLoaderInstance.setCdnPrefix(CDNPrefix);
      }
    }
    /**
     * Clears SVG body from the icon template
     * @returns {void}
     */
    clearIcon() {
      this.template = EmptyTemplate;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return this.template;
    }
  };
  __decorate([
    e4({ type: String, reflect: true })
  ], Icon.prototype, "icon", null);
  __decorate([
    e4({ type: String })
  ], Icon.prototype, "src", null);
  Icon = __decorate([
    customElement("ui-sub-icon", { theme: false })
  ], Icon);

  // ../packages/components/lib/button/index.js
  var Button = class Button2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.defaultRole = "button";
      this.variant = "primary";
      this.iconEnd = null;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        cursor: pointer;
        outline: none;
        display: inline-flex;
        position: relative;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        user-select: none;
        vertical-align: bottom;
        box-sizing: border-box;
        text-transform: uppercase;

        line-height: var(--ds-space-large);

        padding: var(--ds-space-x-small);
        min-height: var(--ds-size-x-large);

        color: var(--ds-action-content-primary-default);
        border: var(--ds-action-border-primary-default);
        background-color: var(--ds-action-background-primary-default);
        border-radius: var(--ds-control-border-radius);
      }
      :host(:hover) {
        color: var(--ds-action-content-primary-hover);
        border: var(--ds-action-border-primary-hover);
        background-color: var(--ds-action-background-primary-hover);
      }
      :host(:focus-visible:not(:active)) {
        text-decoration: underline;
        text-underline-offset: var(--ds-space-xx-small);
        text-decoration-thickness: var(--ds-size-empathize-border);

        color: var(--ds-action-content-primary-focused);
        border: var(--ds-action-border-primary-focused);
        background-color: var(--ds-action-background-primary-focused);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host(:focus-visible:not(:active))::before, :host(:hover:focus-visible:not(:active))::before {
        content: '';
        position: absolute;
        display: block;
        z-index: 1;
        inset: -5px;
        border: var(--ds-action-focused-ring);
      }
      :host(:hover:focus-visible:not(:active)) {
        color: var(--ds-action-content-primary-hover);
        border: var(--ds-action-border-primary-hover);
        background-color: var(--ds-action-background-primary-hover);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host(:active) {
        color: var(--ds-action-content-primary-pressed);
        border: var(--ds-action-border-primary-pressed);
        background-color: var(--ds-action-background-primary-pressed);
      }
      :host([variant=secondary]) {
        color: var(--ds-action-content-secondary-default);
        border: var(--ds-action-border-secondary-default);
        background-color: var(--ds-action-background-secondary-default);
      }
      :host([variant=secondary]:hover) {
        color: var(--ds-action-content-secondary-hover);
        border: var(--ds-action-border-secondary-hover);
        background-color: var(--ds-action-background-secondary-hover);
      }
      :host([variant=secondary]:focus-visible:not(:active)) {
        color: var(--ds-action-content-secondary-focused);
        border: var(--ds-action-border-secondary-focused);
        background-color: var(--ds-action-background-secondary-focused);
      }
      :host([variant=secondary]:hover:focus-visible:not(:active)) {
        color: var(--ds-action-content-secondary-hover);
        border: var(--ds-action-border-secondary-hover);
        background-color: var(--ds-action-background-secondary-hover);

        outline: var(--ds-action-focused-ring-oninvert);
      }
      :host([variant=secondary]:active) {
        color: var(--ds-action-content-secondary-pressed);
        border: var(--ds-action-border-secondary-pressed);
        background-color: var(--ds-action-background-secondary-pressed);
      }
      :host [part=icon] {
        margin-left: var(--ds-space-button-icon-margin-x-small);
        min-width: var(--ds-size-x-small);
      }
    `;
    }
    /**
     * the lifecycle method called when properties changed first time
     * @param changedProperties properties it's the Map object which has the updated properties
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.addEventListener("tapstart", this.setPressed);
      this.addEventListener("tapend", this.unsetPressed);
    }
    setPressed() {
      this.setAttribute("aria-pressed", "true");
    }
    unsetPressed() {
      this.setAttribute("aria-pressed", "false");
    }
    /**
     * Returns icon template if exists
     * @return {TemplateResult | nothing}  Render template
     */
    get iconEndTemplate() {
      return this.iconEnd ? y`<ui-sub-icon aria-hidden="true" part="icon" icon="${this.iconEnd}" id="icon"></ui-sub-icon>` : b;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
      return y`
      <span part="label">
        <slot></slot>
      </span>
      ${this.iconEndTemplate}
    `;
    }
  };
  __decorate([
    e4({ type: String, reflect: true })
  ], Button.prototype, "variant", void 0);
  __decorate([
    e4({ type: String, attribute: "icon-end", reflect: true })
  ], Button.prototype, "iconEnd", void 0);
  Button = __decorate([
    customElement("ui-button", { theme: false })
  ], Button);

  // ../packages/components/lib/card/index.js
  var Card = class Card2 extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: flex;
        flex-flow: column nowrap;
        background-color: var(--ds-container-background-color);
        padding: var(--ds-container-padding);
        border: var(--ds-container-border);
        border-radius: var(--ds-container-border-radius);
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
      return y`
      <slot></slot>
    `;
    }
  };
  Card = __decorate([
    customElement("ui-card", { theme: false })
  ], Card);

  // ../packages/components/lib/sub-checkbox/index.js
  var SubCheckbox = class SubCheckbox2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.checked = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.addEventListener("tap", this.onTap);
      this.addEventListener("keydown", this.onKeyDown);
    }
    /**
     * Run when checkbox is tapped
     * @param event Tap event
     * @returns {void}
     */
    onTap(event) {
      if (this.disabled || this.readonly || event.defaultPrevented) {
        return;
      }
      this.handleCheckedChange();
    }
    /**
     * Handles key down event
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
      if (this.disabled || this.readonly || event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case " ":
        case "Spacebar":
          this.handleCheckedChange();
          break;
        default:
          return;
      }
      event.preventDefault();
    }
    /**
     * Change checked state and fire
     * checked-changed event
     * @return {void}
     */
    handleCheckedChange() {
      this.checked = !this.checked;
      this.notifyPropertyChange("checked", this.checked);
    }
    render() {
      return y`
      <div part="check">
       <ui-sub-icon icon="tick" part="icon"></ui-sub-icon>
      </div>
      <slot></slot>
    `;
    }
  };
  SubCheckbox.styles = i`
    :host {
      cursor: pointer;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: var(--ds-control-height);
      height: var(--ds-control-height);
      color: var(--ds-control-color);
      border: var(--ds-control-border);
      border-radius: var(--ds-control-border-radius);
    }
    :host(:hover) {
      border-color: var(--ds-control-hover-border-color);
    }
    :host(:not([readonly]):hover) [part=icon] {
      color: var(--ds-control-hover-color);
    }
    :host(:focus-visible) {
      outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
    }
    [part=check] {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      visibility: hidden;
    }
    :host([checked]) [part=check] {
      visibility: inherit;
    }
    :host([disabled]) {
      cursor: default;
      color: var(--ds-control-disabled-color);
      border-color: var(--ds-control-disabled-border-color);
    }
    :host([readonly]) {
      cursor: default;
      color: var(--ds-control-readonly-color);
      border-color: var(--ds-control-readonly-border-color);
    }
  `;
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubCheckbox.prototype, "checked", void 0);
  SubCheckbox = __decorate([
    customElement("ui-sub-checkbox", { theme: false })
  ], SubCheckbox);

  // ../packages/components/lib/checkbox/index.js
  var Checkbox = class Checkbox2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.defaultRole = "checkbox";
      this.checked = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      :host(:focus-visible) {
        outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
      }
      :host [part=label] {
        padding-left: var(--ds-control-padding);
      }
      :host(:empty) [part="label"] {
        display: none;
      }
      :host(:hover) {
        color: var(--ds-control-hover-color);
      }
      :host(:hover:not([readonly])) [part=checkbox] {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
      }
      :host([readonly]) {
        cursor: default;
        color: var(--ds-control-readonly-color)
      }
    `;
    }
    /**
     * Called before update() to compute values needed during the update.
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    willUpdate(changedProperties) {
      super.willUpdate(changedProperties);
      if (changedProperties.has("checked")) {
        this.setAttribute("aria-checked", String(this.checked));
      }
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.addEventListener("tap", this.onTap);
      this.addEventListener("keydown", this.onKeyDown);
    }
    /**
     * Fired when mouse click event happens. Select an item
     * @param event Mouse click event
     * @returns {void}
     */
    onTap(event) {
      if (this.disabled || this.readonly || event.defaultPrevented) {
        return;
      }
      this.handleCheckedChanged();
    }
    /**
     * Handles key down event
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
      if (this.disabled || this.readonly || event.defaultPrevented) {
        return;
      }
      switch (event.key) {
        case " ":
        case "Spacebar":
          this.handleCheckedChanged();
          break;
        default:
          return;
      }
      event.preventDefault();
    }
    /**
     * Change checked state and fire
     * checked-changed event
     * @return {void}
     */
    handleCheckedChanged() {
      this.checked = !this.checked;
      this.notifyPropertyChange("checked", this.checked);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`
     <ui-sub-checkbox
        tabindex="-1"
        part="checkbox"
        .checked=${this.checked}
        ?disabled=${this.disabled}
        ?readonly=${this.readonly}>
      </ui-sub-checkbox>
      <div part="label">
        <slot></slot>
      </div>
    `;
    }
  };
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], Checkbox.prototype, "checked", void 0);
  Checkbox = __decorate([
    customElement("ui-checkbox", { theme: false })
  ], Checkbox);

  // ../packages/components/lib/sub-label/index.js
  var SubLabel = class SubLabel2 extends BasicElement {
    constructor() {
      super(...arguments);
      this.error = false;
      this.warning = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: inline-block;
        color: var(--ds-text-body-color);
        font-size: var(--ds-text-body-size);
      }
      :host([error]),
      :host([error][warning]) {
        color: var(--ds-control-error-color);
      }
      :host([warning]) {
        color: var(--ds-control-warning-color);
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`<slot></slot>`;
    }
  };
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubLabel.prototype, "error", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubLabel.prototype, "warning", void 0);
  SubLabel = __decorate([
    customElement("ui-sub-label", { theme: false })
  ], SubLabel);

  // ../packages/components/lib/sub-text-field/index.js
  var hasChanged = (value, oldValue) => oldValue === void 0 ? false : value !== oldValue;
  var SubTextField = class SubTextField2 extends FormFieldElement {
    constructor() {
      super(...arguments);
      this.icon = null;
      this.iconHasAction = false;
      this.error = false;
      this.warning = false;
      this.readonly = false;
      this.disabled = false;
      this.pattern = "";
      this.maxLength = null;
      this.minLength = null;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        vertical-align: middle;

        height: var(--ds-control-height);
        width: var(--ds-control-width);

        color: var(--ds-control-color);
        border: var(--ds-control-border);
        border-radius: var(--ds-control-border-radius);
        background-color: var(--ds-control-background-color);
        padding: 0px var(--ds-space-x-small);
      }
      :host(:focus) {
        border-color: var(--ds-control-focus-border-color);
      }
      :host(:not([readonly]):not([error]):not([warning]):not(:focus):hover) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([error]:not(:focus)), :host([error][warning]:not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-error-border-color);
        background-color: var(--ds-control-error-background-color);
      }
      :host([error]:hover:not([readonly]):not(:focus)) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-error-hover-border-color);
        background-color: var(--ds-field-error-hover-background-color);
      }
      :host([warning]:not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-warning-border-color);
        background-color: var(--ds-control-warning-background-color);
      }
      :host([warning]:hover:not([readonly]):not(:focus)) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-warning-hover-border-color);
        background-color: var(--ds-control-warning-hover-background-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
        border-color: var(--ds-control-disabled-border-color);
        background-color: var(--ds-control-disabled-background-color);
      }
      :host([readonly]:not(:focus)) {
        color: var(--ds-control-readonly-color);
        border-color: var(--ds-control-readonly-border-color);
        background-color: var(--ds-control-readonly-background-color);
      }
      :host [part='input'] {
        color: inherit;
        text-align: inherit;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        appearance: none;
        text-overflow: ellipsis;
        font: inherit;
        font-size: var(--ds-text-body-size);
        background: none;
        border: none;
      }
      :host [part='input']:focus {
        outline: none;
      }
      :host [part='input']::selection {
        color: var(--ds-text-selection-color);
        background-color: var(--ds-text-selection-background-color);
      }
      :host([icon]) [part=icon]{
        display: flex;
        margin-left: var(--ds-space-xxx-small); // TODO: use better token
        color: var(--ds-control-color);
      }
      :host([icon][icon-has-action]) [part=icon] {
        cursor: pointer;
      }
      :host([icon][icon-has-action]) [part=icon]:hover {
        color: var(--ds-control-hover-color);
      }
      :host([icon][icon-has-action]) [part=icon]:focus-visible {
        outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
        border-radius: var(--ds-control-border-radius);
      }
    `;
    }
    /**
     * Called once after the component is first rendered
     * @param changedProperties map of changed properties with old values
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.setAttribute("aria-hidden", "true");
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    updated(changedProperties) {
      super.updated(changedProperties);
      if (this.shouldSyncInputValue(changedProperties)) {
        this.syncInputValue(changedProperties);
      }
      if (this.shouldValidateInput(changedProperties)) {
        this.validateInput();
      }
    }
    /**
     * Fires event on `icon` click
     * @returns {void}
     */
    iconClick() {
      if (this.iconHasAction && !this.disabled) {
        this.dispatchEvent(new CustomEvent("icon-click", { bubbles: false }));
      }
    }
    /**
     * Check if input value should be synchronised with component value
     * @param changedProperties Properties that has changed
     * @returns True if input should be synchronised
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    shouldSyncInputValue(changedProperties) {
      return this.inputValue !== this.value;
    }
    /**
     * Synchronise input value with value.
     * Override the method if value and input value are not the same
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    syncInputValue(changedProperties) {
      this.inputValue = this.value;
    }
    /**
     * Check if input should be re-validated
     * @param changedProperties Properties that has changed
     * @returns True if input should be re-validated
     */
    shouldValidateInput(changedProperties) {
      return changedProperties.has("pattern") || !!(this.pattern && changedProperties.has("value")) || (changedProperties.has("minLength") || !!(this.minLength && changedProperties.has("value"))) || (changedProperties.has("maxLength") || !!(this.maxLength && changedProperties.has("value")));
    }
    /**
     * Runs on input element `input` event
     * @param event `input` event
     * @returns {void}
     */
    onInputInput(event) {
      this.onPossibleValueChange(event);
    }
    /**
     * Runs on input element `change` event
     * @param event `change` event
     * @returns {void}
     */
    onInputChange(event) {
      this.onPossibleValueChange(event);
    }
    /**
     * Check if value is changed and fire event
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onPossibleValueChange(event) {
      const value = this.inputElement?.value || "";
      this.setValueAndNotify(value);
    }
    /**
     * Validate input according `pattern`, `minLength` and `maxLength` properties
     * change state of `error` property according pattern validation
     * @returns {void}
     */
    validateInput() {
      const error = !this.inputElement?.checkValidity();
      this.notifyErrorChange(error);
    }
    /**
     * Renders icon element if property present
     * @returns {void}
     */
    renderIcon() {
      return this.icon ? y`
     <ui-sub-icon
      role="${this.iconHasAction ? "button" : b}"
      tabindex="${this.iconHasAction ? "0" : b}"
      aria-label="${this.iconHasAction ? this.icon : b}"
      part="icon"
      icon="${this.icon}"
      ?readonly="${this.readonly}"
      ?disabled="${this.disabled}"
      @tap="${this.iconClick}">
    </ui-sub-icon>` : b;
    }
    get decorateInputMap() {
      return {
        ...super.decorateInputMap,
        "type": "text",
        "part": "input",
        "maxlength": this.maxLength,
        "minlength": this.minLength,
        "pattern": this.pattern || null
      };
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`
      ${super.render()}
      ${this.renderIcon()}
    `;
    }
  };
  SubTextField.shadowRootOptions = { ...FormFieldElement.shadowRootOptions, delegatesFocus: true };
  __decorate([
    e4({ type: String, reflect: true })
  ], SubTextField.prototype, "icon", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, attribute: "icon-has-action" })
  ], SubTextField.prototype, "iconHasAction", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubTextField.prototype, "error", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubTextField.prototype, "warning", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubTextField.prototype, "readonly", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubTextField.prototype, "disabled", void 0);
  __decorate([
    e4({ type: String, hasChanged })
  ], SubTextField.prototype, "pattern", void 0);
  __decorate([
    e4({ type: Number, attribute: "maxlength", reflect: true })
  ], SubTextField.prototype, "maxLength", void 0);
  __decorate([
    e4({ type: Number, attribute: "minlength", reflect: true, hasChanged })
  ], SubTextField.prototype, "minLength", void 0);
  SubTextField = __decorate([
    customElement("ui-sub-text-field", { theme: false })
  ], SubTextField);

  // ../packages/i18n/lib/lang-attribute-observer.js
  var OBSERVER_CONFIG = {
    attributes: true,
    attributeFilter: ["lang"]
  };
  var LangAttributeObserver = class {
    static startObserving(element, callback) {
      const observer = new MutationObserver(() => callback());
      observer.observe(element, OBSERVER_CONFIG);
      return observer;
    }
    static stopObserving(observer) {
      observer.disconnect();
    }
    static onDocumentLang() {
      this.callbacks.forEach(this.documentChangeCallback);
    }
    static documentChangeCallback(callback, element) {
      if (!element.lang) {
        callback();
      }
    }
    /**
     * Start observing `lang` changes on element
     * @param element An element
     * @param callback A callback to run when `lang` has changed
     * @returns {void}
     */
    static observe(element, callback) {
      if (!this.documentObserver) {
        this.documentObserver = this.startObserving(document.documentElement, this.onDocumentLang.bind(this));
      }
      this.callbacks.set(element, callback);
      if (this.elements.has(element)) {
        this.stopObserving(this.elements.get(element));
      }
      this.elements.set(element, this.startObserving(element, callback));
    }
    /**
     * Disconnect `lang` element observer from element
     * @param element An element
     * @returns {void}
     */
    static disconnect(element) {
      this.callbacks.delete(element);
      if (!this.callbacks.size && this.documentObserver) {
        this.stopObserving(this.documentObserver);
        this.documentObserver = null;
      }
    }
    /**
     * Get document element lang
     * @returns lang
     */
    static get documentLang() {
      return document.documentElement.lang;
    }
  };
  LangAttributeObserver.documentObserver = null;
  LangAttributeObserver.elements = /* @__PURE__ */ new WeakMap();
  LangAttributeObserver.callbacks = /* @__PURE__ */ new Map();

  // ../packages/phrasebook/lib/translation.js
  var SHARED_SCOPE = "__shared__";
  var ObserverKey = class {
  };
  var Phrasebook = class {
    static publish(publishLocale, publishScope) {
      const callbackFn = (observable) => {
        const { callback, scope } = observable;
        if (publishScope === SHARED_SCOPE || publishScope === scope) {
          callback(publishLocale);
        }
      };
      this.observables.forEach(callbackFn);
    }
    /**
     * Start observing changes to translations
     * @param scope The scope to observe
     * @param callback A callback run when the scope has changed
     * @returns An observe key used to disconnet
     */
    static observe(scope, callback) {
      const key = new ObserverKey();
      this.observables.set(key, {
        scope,
        callback
      });
      return key;
    }
    /**
     * Stop observing and disconnect a callback
     * @param key A key to stop observing the scope
     * @returns {void}
     */
    static disconnect(key) {
      this.observables.delete(key);
    }
    static define(locale, scope, translations2 = scope) {
      if (scope === SHARED_SCOPE) {
        throw new Error(`${SHARED_SCOPE} scope name is reserved`);
      }
      if (!locale || !scope || !translations2) {
        throw new Error("Translations must define locale, scope and translations collection");
      }
      scope = typeof scope !== "string" ? SHARED_SCOPE : scope;
      const translationMap = this.localeMap[locale] || {};
      translationMap[scope] = translations2;
      this.localeMap[locale] = translationMap;
      this.publish(locale, scope);
    }
    /**
     * Get translation for locale and scope.
     * @param locale Locale to get
     * @param scope Scope to get
     * @returns translation or null
     */
    static get(locale, scope) {
      const translationsMap = this.localeMap[locale];
      if (!translationsMap) {
        return null;
      }
      return Object.assign({}, translationsMap[SHARED_SCOPE] || {}, translationsMap[scope] || {});
    }
    /**
     * Get a list of supported locales per scope
     * @param [scope=SHARED_SCOPE] A scope to check. If none provided a shared scope is returned
     * @returns list of supported locales
     */
    static supported(scope = SHARED_SCOPE) {
      const locales = [];
      const localeMap = this.localeMap;
      let translation;
      let locale;
      for (locale in localeMap) {
        translation = localeMap[locale];
        if (translation[scope]) {
          locales.push(locale);
        }
      }
      return locales;
    }
  };
  Phrasebook.localeMap = {};
  Phrasebook.observables = /* @__PURE__ */ new Map();

  // ../node_modules/@formatjs/intl-utils/lib/src/units.js
  var SANCTIONED_UNITS = [
    "angle-degree",
    "area-acre",
    "area-hectare",
    "concentr-percent",
    "digital-bit",
    "digital-byte",
    "digital-gigabit",
    "digital-gigabyte",
    "digital-kilobit",
    "digital-kilobyte",
    "digital-megabit",
    "digital-megabyte",
    "digital-petabyte",
    "digital-terabit",
    "digital-terabyte",
    "duration-day",
    "duration-hour",
    "duration-millisecond",
    "duration-minute",
    "duration-month",
    "duration-second",
    "duration-week",
    "duration-year",
    "length-centimeter",
    "length-foot",
    "length-inch",
    "length-kilometer",
    "length-meter",
    "length-mile-scandinavian",
    "length-mile",
    "length-millimeter",
    "length-yard",
    "mass-gram",
    "mass-kilogram",
    "mass-ounce",
    "mass-pound",
    "mass-stone",
    "temperature-celsius",
    "temperature-fahrenheit",
    "volume-fluid-ounce",
    "volume-gallon",
    "volume-liter",
    "volume-milliliter"
  ];

  // ../node_modules/@formatjs/intl-utils/lib/src/polyfill-utils.js
  function toObject(arg) {
    if (arg == null) {
      throw new TypeError("undefined/null cannot be converted to object");
    }
    return Object(arg);
  }
  function toString(o10) {
    if (typeof o10 === "symbol") {
      throw TypeError("Cannot convert a Symbol value to a string");
    }
    return String(o10);
  }
  function getOption(opts, prop, type, values, fallback) {
    var value = opts[prop];
    if (value !== void 0) {
      if (type !== "boolean" && type !== "string") {
        throw new TypeError("invalid type");
      }
      if (type === "boolean") {
        value = Boolean(value);
      }
      if (type === "string") {
        value = toString(value);
      }
      if (values !== void 0 && !values.filter(function(val) {
        return val == value;
      }).length) {
        throw new RangeError(value + " is not within " + values.join(", "));
      }
      return value;
    }
    return fallback;
  }
  var SHORTENED_SACTION_UNITS = SANCTIONED_UNITS.map(function(unit) {
    return unit.replace(/^(.*?)-/, "");
  });

  // ../node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js
  var __extends2 = function() {
    var extendStatics2 = function(d3, b2) {
      extendStatics2 = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d4, b3) {
        d4.__proto__ = b3;
      } || function(d4, b3) {
        for (var p2 in b3)
          if (b3.hasOwnProperty(p2))
            d4[p2] = b3[p2];
      };
      return extendStatics2(d3, b2);
    };
    return function(d3, b2) {
      extendStatics2(d3, b2);
      function __() {
        this.constructor = d3;
      }
      d3.prototype = b2 === null ? Object.create(b2) : (__.prototype = b2.prototype, new __());
    };
  }();
  var UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
  function bestAvailableLocale(availableLocales, locale) {
    var candidate = locale;
    while (true) {
      if (~availableLocales.indexOf(candidate)) {
        return candidate;
      }
      var pos = candidate.lastIndexOf("-");
      if (!~pos) {
        return void 0;
      }
      if (pos >= 2 && candidate[pos - 2] === "-") {
        pos -= 2;
      }
      candidate = candidate.slice(0, pos);
    }
  }
  function lookupSupportedLocales(availableLocales, requestedLocales) {
    var subset = [];
    for (var _i = 0, requestedLocales_3 = requestedLocales; _i < requestedLocales_3.length; _i++) {
      var locale = requestedLocales_3[_i];
      var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
      var availableLocale = bestAvailableLocale(availableLocales, noExtensionLocale);
      if (availableLocale) {
        subset.push(availableLocale);
      }
    }
    return subset;
  }
  function supportedLocales(availableLocales, requestedLocales, options) {
    var matcher = "best fit";
    if (options !== void 0) {
      options = toObject(options);
      matcher = getOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
    }
    if (matcher === "best fit") {
      return lookupSupportedLocales(availableLocales, requestedLocales);
    }
    return lookupSupportedLocales(availableLocales, requestedLocales);
  }
  var MissingLocaleDataError = (
    /** @class */
    function(_super) {
      __extends2(MissingLocaleDataError2, _super);
      function MissingLocaleDataError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "MISSING_LOCALE_DATA";
        return _this;
      }
      return MissingLocaleDataError2;
    }(Error)
  );

  // ../packages/i18n/lib/constants.js
  var DEFAULT_LOCALE = "en-GB";

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/error.js
  var ErrorKind;
  (function(ErrorKind2) {
    ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_CLOSING_BRACE"] = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE";
    ErrorKind2[ErrorKind2["EMPTY_ARGUMENT"] = 2] = "EMPTY_ARGUMENT";
    ErrorKind2[ErrorKind2["MALFORMED_ARGUMENT"] = 3] = "MALFORMED_ARGUMENT";
    ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_TYPE"] = 4] = "EXPECT_ARGUMENT_TYPE";
    ErrorKind2[ErrorKind2["INVALID_ARGUMENT_TYPE"] = 5] = "INVALID_ARGUMENT_TYPE";
    ErrorKind2[ErrorKind2["EXPECT_ARGUMENT_STYLE"] = 6] = "EXPECT_ARGUMENT_STYLE";
    ErrorKind2[ErrorKind2["INVALID_NUMBER_SKELETON"] = 7] = "INVALID_NUMBER_SKELETON";
    ErrorKind2[ErrorKind2["INVALID_DATE_TIME_SKELETON"] = 8] = "INVALID_DATE_TIME_SKELETON";
    ErrorKind2[ErrorKind2["EXPECT_NUMBER_SKELETON"] = 9] = "EXPECT_NUMBER_SKELETON";
    ErrorKind2[ErrorKind2["EXPECT_DATE_TIME_SKELETON"] = 10] = "EXPECT_DATE_TIME_SKELETON";
    ErrorKind2[ErrorKind2["UNCLOSED_QUOTE_IN_ARGUMENT_STYLE"] = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE";
    ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_OPTIONS"] = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS";
    ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE"] = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE";
    ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_OFFSET_VALUE"] = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE";
    ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR"] = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR";
    ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR"] = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR";
    ErrorKind2[ErrorKind2["EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT"] = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT";
    ErrorKind2[ErrorKind2["EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT"] = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT";
    ErrorKind2[ErrorKind2["INVALID_PLURAL_ARGUMENT_SELECTOR"] = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR";
    ErrorKind2[ErrorKind2["DUPLICATE_PLURAL_ARGUMENT_SELECTOR"] = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR";
    ErrorKind2[ErrorKind2["DUPLICATE_SELECT_ARGUMENT_SELECTOR"] = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR";
    ErrorKind2[ErrorKind2["MISSING_OTHER_CLAUSE"] = 22] = "MISSING_OTHER_CLAUSE";
    ErrorKind2[ErrorKind2["INVALID_TAG"] = 23] = "INVALID_TAG";
    ErrorKind2[ErrorKind2["INVALID_TAG_NAME"] = 25] = "INVALID_TAG_NAME";
    ErrorKind2[ErrorKind2["UNMATCHED_CLOSING_TAG"] = 26] = "UNMATCHED_CLOSING_TAG";
    ErrorKind2[ErrorKind2["UNCLOSED_TAG"] = 27] = "UNCLOSED_TAG";
  })(ErrorKind || (ErrorKind = {}));

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/types.js
  var TYPE;
  (function(TYPE2) {
    TYPE2[TYPE2["literal"] = 0] = "literal";
    TYPE2[TYPE2["argument"] = 1] = "argument";
    TYPE2[TYPE2["number"] = 2] = "number";
    TYPE2[TYPE2["date"] = 3] = "date";
    TYPE2[TYPE2["time"] = 4] = "time";
    TYPE2[TYPE2["select"] = 5] = "select";
    TYPE2[TYPE2["plural"] = 6] = "plural";
    TYPE2[TYPE2["pound"] = 7] = "pound";
    TYPE2[TYPE2["tag"] = 8] = "tag";
  })(TYPE || (TYPE = {}));
  var SKELETON_TYPE;
  (function(SKELETON_TYPE2) {
    SKELETON_TYPE2[SKELETON_TYPE2["number"] = 0] = "number";
    SKELETON_TYPE2[SKELETON_TYPE2["dateTime"] = 1] = "dateTime";
  })(SKELETON_TYPE || (SKELETON_TYPE = {}));
  function isLiteralElement(el) {
    return el.type === TYPE.literal;
  }
  function isArgumentElement(el) {
    return el.type === TYPE.argument;
  }
  function isNumberElement(el) {
    return el.type === TYPE.number;
  }
  function isDateElement(el) {
    return el.type === TYPE.date;
  }
  function isTimeElement(el) {
    return el.type === TYPE.time;
  }
  function isSelectElement(el) {
    return el.type === TYPE.select;
  }
  function isPluralElement(el) {
    return el.type === TYPE.plural;
  }
  function isPoundElement(el) {
    return el.type === TYPE.pound;
  }
  function isTagElement(el) {
    return el.type === TYPE.tag;
  }
  function isNumberSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.number);
  }
  function isDateTimeSkeleton(el) {
    return !!(el && typeof el === "object" && el.type === SKELETON_TYPE.dateTime);
  }

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/regex.generated.js
  var SPACE_SEPARATOR_REGEX = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/;

  // ../node_modules/@formatjs/icu-skeleton-parser/lib/date-time.js
  var DATE_TIME_REGEX = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function parseDateTimeSkeleton(skeleton) {
    var result = {};
    skeleton.replace(DATE_TIME_REGEX, function(match) {
      var len = match.length;
      switch (match[0]) {
        case "G":
          result.era = len === 4 ? "long" : len === 5 ? "narrow" : "short";
          break;
        case "y":
          result.year = len === 2 ? "2-digit" : "numeric";
          break;
        case "Y":
        case "u":
        case "U":
        case "r":
          throw new RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
        case "q":
        case "Q":
          throw new RangeError("`q/Q` (quarter) patterns are not supported");
        case "M":
        case "L":
          result.month = ["numeric", "2-digit", "short", "long", "narrow"][len - 1];
          break;
        case "w":
        case "W":
          throw new RangeError("`w/W` (week) patterns are not supported");
        case "d":
          result.day = ["numeric", "2-digit"][len - 1];
          break;
        case "D":
        case "F":
        case "g":
          throw new RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
        case "E":
          result.weekday = len === 4 ? "short" : len === 5 ? "narrow" : "short";
          break;
        case "e":
          if (len < 4) {
            throw new RangeError("`e..eee` (weekday) patterns are not supported");
          }
          result.weekday = ["short", "long", "narrow", "short"][len - 4];
          break;
        case "c":
          if (len < 4) {
            throw new RangeError("`c..ccc` (weekday) patterns are not supported");
          }
          result.weekday = ["short", "long", "narrow", "short"][len - 4];
          break;
        case "a":
          result.hour12 = true;
          break;
        case "b":
        case "B":
          throw new RangeError("`b/B` (period) patterns are not supported, use `a` instead");
        case "h":
          result.hourCycle = "h12";
          result.hour = ["numeric", "2-digit"][len - 1];
          break;
        case "H":
          result.hourCycle = "h23";
          result.hour = ["numeric", "2-digit"][len - 1];
          break;
        case "K":
          result.hourCycle = "h11";
          result.hour = ["numeric", "2-digit"][len - 1];
          break;
        case "k":
          result.hourCycle = "h24";
          result.hour = ["numeric", "2-digit"][len - 1];
          break;
        case "j":
        case "J":
        case "C":
          throw new RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
        case "m":
          result.minute = ["numeric", "2-digit"][len - 1];
          break;
        case "s":
          result.second = ["numeric", "2-digit"][len - 1];
          break;
        case "S":
        case "A":
          throw new RangeError("`S/A` (second) patterns are not supported, use `s` instead");
        case "z":
          result.timeZoneName = len < 4 ? "short" : "long";
          break;
        case "Z":
        case "O":
        case "v":
        case "V":
        case "X":
        case "x":
          throw new RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
      }
      return "";
    });
    return result;
  }

  // ../node_modules/@formatjs/icu-skeleton-parser/lib/regex.generated.js
  var WHITE_SPACE_REGEX = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i;

  // ../node_modules/@formatjs/icu-skeleton-parser/lib/number.js
  function parseNumberSkeletonFromString(skeleton) {
    if (skeleton.length === 0) {
      throw new Error("Number skeleton cannot be empty");
    }
    var stringTokens = skeleton.split(WHITE_SPACE_REGEX).filter(function(x2) {
      return x2.length > 0;
    });
    var tokens = [];
    for (var _i = 0, stringTokens_1 = stringTokens; _i < stringTokens_1.length; _i++) {
      var stringToken = stringTokens_1[_i];
      var stemAndOptions = stringToken.split("/");
      if (stemAndOptions.length === 0) {
        throw new Error("Invalid number skeleton");
      }
      var stem = stemAndOptions[0], options = stemAndOptions.slice(1);
      for (var _a3 = 0, options_1 = options; _a3 < options_1.length; _a3++) {
        var option = options_1[_a3];
        if (option.length === 0) {
          throw new Error("Invalid number skeleton");
        }
      }
      tokens.push({ stem, options });
    }
    return tokens;
  }
  function icuUnitToEcma(unit) {
    return unit.replace(/^(.*?)-/, "");
  }
  var FRACTION_PRECISION_REGEX = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g;
  var SIGNIFICANT_PRECISION_REGEX = /^(@+)?(\+|#+)?[rs]?$/g;
  var INTEGER_WIDTH_REGEX = /(\*)(0+)|(#+)(0+)|(0+)/g;
  var CONCISE_INTEGER_WIDTH_REGEX = /^(0+)$/;
  function parseSignificantPrecision(str) {
    var result = {};
    if (str[str.length - 1] === "r") {
      result.roundingPriority = "morePrecision";
    } else if (str[str.length - 1] === "s") {
      result.roundingPriority = "lessPrecision";
    }
    str.replace(SIGNIFICANT_PRECISION_REGEX, function(_2, g1, g2) {
      if (typeof g2 !== "string") {
        result.minimumSignificantDigits = g1.length;
        result.maximumSignificantDigits = g1.length;
      } else if (g2 === "+") {
        result.minimumSignificantDigits = g1.length;
      } else if (g1[0] === "#") {
        result.maximumSignificantDigits = g1.length;
      } else {
        result.minimumSignificantDigits = g1.length;
        result.maximumSignificantDigits = g1.length + (typeof g2 === "string" ? g2.length : 0);
      }
      return "";
    });
    return result;
  }
  function parseSign(str) {
    switch (str) {
      case "sign-auto":
        return {
          signDisplay: "auto"
        };
      case "sign-accounting":
      case "()":
        return {
          currencySign: "accounting"
        };
      case "sign-always":
      case "+!":
        return {
          signDisplay: "always"
        };
      case "sign-accounting-always":
      case "()!":
        return {
          signDisplay: "always",
          currencySign: "accounting"
        };
      case "sign-except-zero":
      case "+?":
        return {
          signDisplay: "exceptZero"
        };
      case "sign-accounting-except-zero":
      case "()?":
        return {
          signDisplay: "exceptZero",
          currencySign: "accounting"
        };
      case "sign-never":
      case "+_":
        return {
          signDisplay: "never"
        };
    }
  }
  function parseConciseScientificAndEngineeringStem(stem) {
    var result;
    if (stem[0] === "E" && stem[1] === "E") {
      result = {
        notation: "engineering"
      };
      stem = stem.slice(2);
    } else if (stem[0] === "E") {
      result = {
        notation: "scientific"
      };
      stem = stem.slice(1);
    }
    if (result) {
      var signDisplay = stem.slice(0, 2);
      if (signDisplay === "+!") {
        result.signDisplay = "always";
        stem = stem.slice(2);
      } else if (signDisplay === "+?") {
        result.signDisplay = "exceptZero";
        stem = stem.slice(2);
      }
      if (!CONCISE_INTEGER_WIDTH_REGEX.test(stem)) {
        throw new Error("Malformed concise eng/scientific notation");
      }
      result.minimumIntegerDigits = stem.length;
    }
    return result;
  }
  function parseNotationOptions(opt) {
    var result = {};
    var signOpts = parseSign(opt);
    if (signOpts) {
      return signOpts;
    }
    return result;
  }
  function parseNumberSkeleton(tokens) {
    var result = {};
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      switch (token.stem) {
        case "percent":
        case "%":
          result.style = "percent";
          continue;
        case "%x100":
          result.style = "percent";
          result.scale = 100;
          continue;
        case "currency":
          result.style = "currency";
          result.currency = token.options[0];
          continue;
        case "group-off":
        case ",_":
          result.useGrouping = false;
          continue;
        case "precision-integer":
        case ".":
          result.maximumFractionDigits = 0;
          continue;
        case "measure-unit":
        case "unit":
          result.style = "unit";
          result.unit = icuUnitToEcma(token.options[0]);
          continue;
        case "compact-short":
        case "K":
          result.notation = "compact";
          result.compactDisplay = "short";
          continue;
        case "compact-long":
        case "KK":
          result.notation = "compact";
          result.compactDisplay = "long";
          continue;
        case "scientific":
          result = __assign(__assign(__assign({}, result), { notation: "scientific" }), token.options.reduce(function(all, opt2) {
            return __assign(__assign({}, all), parseNotationOptions(opt2));
          }, {}));
          continue;
        case "engineering":
          result = __assign(__assign(__assign({}, result), { notation: "engineering" }), token.options.reduce(function(all, opt2) {
            return __assign(__assign({}, all), parseNotationOptions(opt2));
          }, {}));
          continue;
        case "notation-simple":
          result.notation = "standard";
          continue;
        case "unit-width-narrow":
          result.currencyDisplay = "narrowSymbol";
          result.unitDisplay = "narrow";
          continue;
        case "unit-width-short":
          result.currencyDisplay = "code";
          result.unitDisplay = "short";
          continue;
        case "unit-width-full-name":
          result.currencyDisplay = "name";
          result.unitDisplay = "long";
          continue;
        case "unit-width-iso-code":
          result.currencyDisplay = "symbol";
          continue;
        case "scale":
          result.scale = parseFloat(token.options[0]);
          continue;
        case "integer-width":
          if (token.options.length > 1) {
            throw new RangeError("integer-width stems only accept a single optional option");
          }
          token.options[0].replace(INTEGER_WIDTH_REGEX, function(_2, g1, g2, g3, g4, g5) {
            if (g1) {
              result.minimumIntegerDigits = g2.length;
            } else if (g3 && g4) {
              throw new Error("We currently do not support maximum integer digits");
            } else if (g5) {
              throw new Error("We currently do not support exact integer digits");
            }
            return "";
          });
          continue;
      }
      if (CONCISE_INTEGER_WIDTH_REGEX.test(token.stem)) {
        result.minimumIntegerDigits = token.stem.length;
        continue;
      }
      if (FRACTION_PRECISION_REGEX.test(token.stem)) {
        if (token.options.length > 1) {
          throw new RangeError("Fraction-precision stems only accept a single optional option");
        }
        token.stem.replace(FRACTION_PRECISION_REGEX, function(_2, g1, g2, g3, g4, g5) {
          if (g2 === "*") {
            result.minimumFractionDigits = g1.length;
          } else if (g3 && g3[0] === "#") {
            result.maximumFractionDigits = g3.length;
          } else if (g4 && g5) {
            result.minimumFractionDigits = g4.length;
            result.maximumFractionDigits = g4.length + g5.length;
          } else {
            result.minimumFractionDigits = g1.length;
            result.maximumFractionDigits = g1.length;
          }
          return "";
        });
        var opt = token.options[0];
        if (opt === "w") {
          result = __assign(__assign({}, result), { trailingZeroDisplay: "stripIfInteger" });
        } else if (opt) {
          result = __assign(__assign({}, result), parseSignificantPrecision(opt));
        }
        continue;
      }
      if (SIGNIFICANT_PRECISION_REGEX.test(token.stem)) {
        result = __assign(__assign({}, result), parseSignificantPrecision(token.stem));
        continue;
      }
      var signOpts = parseSign(token.stem);
      if (signOpts) {
        result = __assign(__assign({}, result), signOpts);
      }
      var conciseScientificAndEngineeringOpts = parseConciseScientificAndEngineeringStem(token.stem);
      if (conciseScientificAndEngineeringOpts) {
        result = __assign(__assign({}, result), conciseScientificAndEngineeringOpts);
      }
    }
    return result;
  }

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/time-data.generated.js
  var timeData = {
    "AX": [
      "H"
    ],
    "BQ": [
      "H"
    ],
    "CP": [
      "H"
    ],
    "CZ": [
      "H"
    ],
    "DK": [
      "H"
    ],
    "FI": [
      "H"
    ],
    "ID": [
      "H"
    ],
    "IS": [
      "H"
    ],
    "ML": [
      "H"
    ],
    "NE": [
      "H"
    ],
    "RU": [
      "H"
    ],
    "SE": [
      "H"
    ],
    "SJ": [
      "H"
    ],
    "SK": [
      "H"
    ],
    "AS": [
      "h",
      "H"
    ],
    "BT": [
      "h",
      "H"
    ],
    "DJ": [
      "h",
      "H"
    ],
    "ER": [
      "h",
      "H"
    ],
    "GH": [
      "h",
      "H"
    ],
    "IN": [
      "h",
      "H"
    ],
    "LS": [
      "h",
      "H"
    ],
    "PG": [
      "h",
      "H"
    ],
    "PW": [
      "h",
      "H"
    ],
    "SO": [
      "h",
      "H"
    ],
    "TO": [
      "h",
      "H"
    ],
    "VU": [
      "h",
      "H"
    ],
    "WS": [
      "h",
      "H"
    ],
    "001": [
      "H",
      "h"
    ],
    "AL": [
      "h",
      "H",
      "hB"
    ],
    "TD": [
      "h",
      "H",
      "hB"
    ],
    "ca-ES": [
      "H",
      "h",
      "hB"
    ],
    "CF": [
      "H",
      "h",
      "hB"
    ],
    "CM": [
      "H",
      "h",
      "hB"
    ],
    "fr-CA": [
      "H",
      "h",
      "hB"
    ],
    "gl-ES": [
      "H",
      "h",
      "hB"
    ],
    "it-CH": [
      "H",
      "h",
      "hB"
    ],
    "it-IT": [
      "H",
      "h",
      "hB"
    ],
    "LU": [
      "H",
      "h",
      "hB"
    ],
    "NP": [
      "H",
      "h",
      "hB"
    ],
    "PF": [
      "H",
      "h",
      "hB"
    ],
    "SC": [
      "H",
      "h",
      "hB"
    ],
    "SM": [
      "H",
      "h",
      "hB"
    ],
    "SN": [
      "H",
      "h",
      "hB"
    ],
    "TF": [
      "H",
      "h",
      "hB"
    ],
    "VA": [
      "H",
      "h",
      "hB"
    ],
    "CY": [
      "h",
      "H",
      "hb",
      "hB"
    ],
    "GR": [
      "h",
      "H",
      "hb",
      "hB"
    ],
    "CO": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "DO": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "KP": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "KR": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "NA": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "PA": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "PR": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "VE": [
      "h",
      "H",
      "hB",
      "hb"
    ],
    "AC": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "AI": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "BW": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "BZ": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "CC": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "CK": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "CX": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "DG": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "FK": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "GB": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "GG": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "GI": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "IE": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "IM": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "IO": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "JE": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "LT": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "MK": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "MN": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "MS": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "NF": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "NG": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "NR": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "NU": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "PN": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "SH": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "SX": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "TA": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "ZA": [
      "H",
      "h",
      "hb",
      "hB"
    ],
    "af-ZA": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "AR": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "CL": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "CR": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "CU": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "EA": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-BO": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-BR": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-EC": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-ES": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-GQ": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "es-PE": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "GT": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "HN": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "IC": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "KG": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "KM": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "LK": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "MA": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "MX": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "NI": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "PY": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "SV": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "UY": [
      "H",
      "h",
      "hB",
      "hb"
    ],
    "JP": [
      "H",
      "h",
      "K"
    ],
    "AD": [
      "H",
      "hB"
    ],
    "AM": [
      "H",
      "hB"
    ],
    "AO": [
      "H",
      "hB"
    ],
    "AT": [
      "H",
      "hB"
    ],
    "AW": [
      "H",
      "hB"
    ],
    "BE": [
      "H",
      "hB"
    ],
    "BF": [
      "H",
      "hB"
    ],
    "BJ": [
      "H",
      "hB"
    ],
    "BL": [
      "H",
      "hB"
    ],
    "BR": [
      "H",
      "hB"
    ],
    "CG": [
      "H",
      "hB"
    ],
    "CI": [
      "H",
      "hB"
    ],
    "CV": [
      "H",
      "hB"
    ],
    "DE": [
      "H",
      "hB"
    ],
    "EE": [
      "H",
      "hB"
    ],
    "FR": [
      "H",
      "hB"
    ],
    "GA": [
      "H",
      "hB"
    ],
    "GF": [
      "H",
      "hB"
    ],
    "GN": [
      "H",
      "hB"
    ],
    "GP": [
      "H",
      "hB"
    ],
    "GW": [
      "H",
      "hB"
    ],
    "HR": [
      "H",
      "hB"
    ],
    "IL": [
      "H",
      "hB"
    ],
    "IT": [
      "H",
      "hB"
    ],
    "KZ": [
      "H",
      "hB"
    ],
    "MC": [
      "H",
      "hB"
    ],
    "MD": [
      "H",
      "hB"
    ],
    "MF": [
      "H",
      "hB"
    ],
    "MQ": [
      "H",
      "hB"
    ],
    "MZ": [
      "H",
      "hB"
    ],
    "NC": [
      "H",
      "hB"
    ],
    "NL": [
      "H",
      "hB"
    ],
    "PM": [
      "H",
      "hB"
    ],
    "PT": [
      "H",
      "hB"
    ],
    "RE": [
      "H",
      "hB"
    ],
    "RO": [
      "H",
      "hB"
    ],
    "SI": [
      "H",
      "hB"
    ],
    "SR": [
      "H",
      "hB"
    ],
    "ST": [
      "H",
      "hB"
    ],
    "TG": [
      "H",
      "hB"
    ],
    "TR": [
      "H",
      "hB"
    ],
    "WF": [
      "H",
      "hB"
    ],
    "YT": [
      "H",
      "hB"
    ],
    "BD": [
      "h",
      "hB",
      "H"
    ],
    "PK": [
      "h",
      "hB",
      "H"
    ],
    "AZ": [
      "H",
      "hB",
      "h"
    ],
    "BA": [
      "H",
      "hB",
      "h"
    ],
    "BG": [
      "H",
      "hB",
      "h"
    ],
    "CH": [
      "H",
      "hB",
      "h"
    ],
    "GE": [
      "H",
      "hB",
      "h"
    ],
    "LI": [
      "H",
      "hB",
      "h"
    ],
    "ME": [
      "H",
      "hB",
      "h"
    ],
    "RS": [
      "H",
      "hB",
      "h"
    ],
    "UA": [
      "H",
      "hB",
      "h"
    ],
    "UZ": [
      "H",
      "hB",
      "h"
    ],
    "XK": [
      "H",
      "hB",
      "h"
    ],
    "AG": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "AU": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "BB": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "BM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "BS": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "CA": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "DM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "en-001": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "FJ": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "FM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "GD": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "GM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "GU": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "GY": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "JM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "KI": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "KN": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "KY": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "LC": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "LR": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "MH": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "MP": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "MW": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "NZ": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "SB": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "SG": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "SL": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "SS": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "SZ": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "TC": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "TT": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "UM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "US": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "VC": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "VG": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "VI": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "ZM": [
      "h",
      "hb",
      "H",
      "hB"
    ],
    "BO": [
      "H",
      "hB",
      "h",
      "hb"
    ],
    "EC": [
      "H",
      "hB",
      "h",
      "hb"
    ],
    "ES": [
      "H",
      "hB",
      "h",
      "hb"
    ],
    "GQ": [
      "H",
      "hB",
      "h",
      "hb"
    ],
    "PE": [
      "H",
      "hB",
      "h",
      "hb"
    ],
    "AE": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "ar-001": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "BH": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "DZ": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "EG": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "EH": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "HK": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "IQ": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "JO": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "KW": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "LB": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "LY": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "MO": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "MR": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "OM": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "PH": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "PS": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "QA": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "SA": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "SD": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "SY": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "TN": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "YE": [
      "h",
      "hB",
      "hb",
      "H"
    ],
    "AF": [
      "H",
      "hb",
      "hB",
      "h"
    ],
    "LA": [
      "H",
      "hb",
      "hB",
      "h"
    ],
    "CN": [
      "H",
      "hB",
      "hb",
      "h"
    ],
    "LV": [
      "H",
      "hB",
      "hb",
      "h"
    ],
    "TL": [
      "H",
      "hB",
      "hb",
      "h"
    ],
    "zu-ZA": [
      "H",
      "hB",
      "hb",
      "h"
    ],
    "CD": [
      "hB",
      "H"
    ],
    "IR": [
      "hB",
      "H"
    ],
    "hi-IN": [
      "hB",
      "h",
      "H"
    ],
    "kn-IN": [
      "hB",
      "h",
      "H"
    ],
    "ml-IN": [
      "hB",
      "h",
      "H"
    ],
    "te-IN": [
      "hB",
      "h",
      "H"
    ],
    "KH": [
      "hB",
      "h",
      "H",
      "hb"
    ],
    "ta-IN": [
      "hB",
      "h",
      "hb",
      "H"
    ],
    "BN": [
      "hb",
      "hB",
      "h",
      "H"
    ],
    "MY": [
      "hb",
      "hB",
      "h",
      "H"
    ],
    "ET": [
      "hB",
      "hb",
      "h",
      "H"
    ],
    "gu-IN": [
      "hB",
      "hb",
      "h",
      "H"
    ],
    "mr-IN": [
      "hB",
      "hb",
      "h",
      "H"
    ],
    "pa-IN": [
      "hB",
      "hb",
      "h",
      "H"
    ],
    "TW": [
      "hB",
      "hb",
      "h",
      "H"
    ],
    "KE": [
      "hB",
      "hb",
      "H",
      "h"
    ],
    "MM": [
      "hB",
      "hb",
      "H",
      "h"
    ],
    "TZ": [
      "hB",
      "hb",
      "H",
      "h"
    ],
    "UG": [
      "hB",
      "hb",
      "H",
      "h"
    ]
  };

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/date-time-pattern-generator.js
  function getBestPattern(skeleton, locale) {
    var skeletonCopy = "";
    for (var patternPos = 0; patternPos < skeleton.length; patternPos++) {
      var patternChar = skeleton.charAt(patternPos);
      if (patternChar === "j") {
        var extraLength = 0;
        while (patternPos + 1 < skeleton.length && skeleton.charAt(patternPos + 1) === patternChar) {
          extraLength++;
          patternPos++;
        }
        var hourLen = 1 + (extraLength & 1);
        var dayPeriodLen = extraLength < 2 ? 1 : 3 + (extraLength >> 1);
        var dayPeriodChar = "a";
        var hourChar = getDefaultHourSymbolFromLocale(locale);
        if (hourChar == "H" || hourChar == "k") {
          dayPeriodLen = 0;
        }
        while (dayPeriodLen-- > 0) {
          skeletonCopy += dayPeriodChar;
        }
        while (hourLen-- > 0) {
          skeletonCopy = hourChar + skeletonCopy;
        }
      } else if (patternChar === "J") {
        skeletonCopy += "H";
      } else {
        skeletonCopy += patternChar;
      }
    }
    return skeletonCopy;
  }
  function getDefaultHourSymbolFromLocale(locale) {
    var hourCycle = locale.hourCycle;
    if (hourCycle === void 0 && // @ts-ignore hourCycle(s) is not identified yet
    locale.hourCycles && // @ts-ignore
    locale.hourCycles.length) {
      hourCycle = locale.hourCycles[0];
    }
    if (hourCycle) {
      switch (hourCycle) {
        case "h24":
          return "k";
        case "h23":
          return "H";
        case "h12":
          return "h";
        case "h11":
          return "K";
        default:
          throw new Error("Invalid hourCycle");
      }
    }
    var languageTag = locale.language;
    var regionTag;
    if (languageTag !== "root") {
      regionTag = locale.maximize().region;
    }
    var hourCycles = timeData[regionTag || ""] || timeData[languageTag || ""] || timeData["".concat(languageTag, "-001")] || timeData["001"];
    return hourCycles[0];
  }

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/parser.js
  var _a2;
  var SPACE_SEPARATOR_START_REGEX = new RegExp("^".concat(SPACE_SEPARATOR_REGEX.source, "*"));
  var SPACE_SEPARATOR_END_REGEX = new RegExp("".concat(SPACE_SEPARATOR_REGEX.source, "*$"));
  function createLocation(start, end) {
    return { start, end };
  }
  var hasNativeStartsWith = !!String.prototype.startsWith;
  var hasNativeFromCodePoint = !!String.fromCodePoint;
  var hasNativeFromEntries = !!Object.fromEntries;
  var hasNativeCodePointAt = !!String.prototype.codePointAt;
  var hasTrimStart = !!String.prototype.trimStart;
  var hasTrimEnd = !!String.prototype.trimEnd;
  var hasNativeIsSafeInteger = !!Number.isSafeInteger;
  var isSafeInteger = hasNativeIsSafeInteger ? Number.isSafeInteger : function(n7) {
    return typeof n7 === "number" && isFinite(n7) && Math.floor(n7) === n7 && Math.abs(n7) <= 9007199254740991;
  };
  var REGEX_SUPPORTS_U_AND_Y = true;
  try {
    re = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    REGEX_SUPPORTS_U_AND_Y = ((_a2 = re.exec("a")) === null || _a2 === void 0 ? void 0 : _a2[0]) === "a";
  } catch (_2) {
    REGEX_SUPPORTS_U_AND_Y = false;
  }
  var re;
  var startsWith = hasNativeStartsWith ? (
    // Native
    function startsWith2(s6, search, position) {
      return s6.startsWith(search, position);
    }
  ) : (
    // For IE11
    function startsWith3(s6, search, position) {
      return s6.slice(position, position + search.length) === search;
    }
  );
  var fromCodePoint = hasNativeFromCodePoint ? String.fromCodePoint : (
    // IE11
    function fromCodePoint2() {
      var codePoints = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        codePoints[_i] = arguments[_i];
      }
      var elements = "";
      var length = codePoints.length;
      var i7 = 0;
      var code;
      while (length > i7) {
        code = codePoints[i7++];
        if (code > 1114111)
          throw RangeError(code + " is not a valid code point");
        elements += code < 65536 ? String.fromCharCode(code) : String.fromCharCode(((code -= 65536) >> 10) + 55296, code % 1024 + 56320);
      }
      return elements;
    }
  );
  var fromEntries = (
    // native
    hasNativeFromEntries ? Object.fromEntries : (
      // Ponyfill
      function fromEntries2(entries) {
        var obj = {};
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
          var _a3 = entries_1[_i], k2 = _a3[0], v2 = _a3[1];
          obj[k2] = v2;
        }
        return obj;
      }
    )
  );
  var codePointAt = hasNativeCodePointAt ? (
    // Native
    function codePointAt2(s6, index) {
      return s6.codePointAt(index);
    }
  ) : (
    // IE 11
    function codePointAt3(s6, index) {
      var size2 = s6.length;
      if (index < 0 || index >= size2) {
        return void 0;
      }
      var first = s6.charCodeAt(index);
      var second;
      return first < 55296 || first > 56319 || index + 1 === size2 || (second = s6.charCodeAt(index + 1)) < 56320 || second > 57343 ? first : (first - 55296 << 10) + (second - 56320) + 65536;
    }
  );
  var trimStart = hasTrimStart ? (
    // Native
    function trimStart2(s6) {
      return s6.trimStart();
    }
  ) : (
    // Ponyfill
    function trimStart3(s6) {
      return s6.replace(SPACE_SEPARATOR_START_REGEX, "");
    }
  );
  var trimEnd = hasTrimEnd ? (
    // Native
    function trimEnd2(s6) {
      return s6.trimEnd();
    }
  ) : (
    // Ponyfill
    function trimEnd3(s6) {
      return s6.replace(SPACE_SEPARATOR_END_REGEX, "");
    }
  );
  function RE(s6, flag) {
    return new RegExp(s6, flag);
  }
  var matchIdentifierAtIndex;
  if (REGEX_SUPPORTS_U_AND_Y) {
    IDENTIFIER_PREFIX_RE_1 = RE("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
    matchIdentifierAtIndex = function matchIdentifierAtIndex2(s6, index) {
      var _a3;
      IDENTIFIER_PREFIX_RE_1.lastIndex = index;
      var match = IDENTIFIER_PREFIX_RE_1.exec(s6);
      return (_a3 = match[1]) !== null && _a3 !== void 0 ? _a3 : "";
    };
  } else {
    matchIdentifierAtIndex = function matchIdentifierAtIndex2(s6, index) {
      var match = [];
      while (true) {
        var c4 = codePointAt(s6, index);
        if (c4 === void 0 || _isWhiteSpace(c4) || _isPatternSyntax(c4)) {
          break;
        }
        match.push(c4);
        index += c4 >= 65536 ? 2 : 1;
      }
      return fromCodePoint.apply(void 0, match);
    };
  }
  var IDENTIFIER_PREFIX_RE_1;
  var Parser = (
    /** @class */
    function() {
      function Parser2(message, options) {
        if (options === void 0) {
          options = {};
        }
        this.message = message;
        this.position = { offset: 0, line: 1, column: 1 };
        this.ignoreTag = !!options.ignoreTag;
        this.locale = options.locale;
        this.requiresOtherClause = !!options.requiresOtherClause;
        this.shouldParseSkeletons = !!options.shouldParseSkeletons;
      }
      Parser2.prototype.parse = function() {
        if (this.offset() !== 0) {
          throw Error("parser can only be used once");
        }
        return this.parseMessage(0, "", false);
      };
      Parser2.prototype.parseMessage = function(nestingLevel, parentArgType, expectingCloseTag) {
        var elements = [];
        while (!this.isEOF()) {
          var char = this.char();
          if (char === 123) {
            var result = this.parseArgument(nestingLevel, expectingCloseTag);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else if (char === 125 && nestingLevel > 0) {
            break;
          } else if (char === 35 && (parentArgType === "plural" || parentArgType === "selectordinal")) {
            var position = this.clonePosition();
            this.bump();
            elements.push({
              type: TYPE.pound,
              location: createLocation(position, this.clonePosition())
            });
          } else if (char === 60 && !this.ignoreTag && this.peek() === 47) {
            if (expectingCloseTag) {
              break;
            } else {
              return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(this.clonePosition(), this.clonePosition()));
            }
          } else if (char === 60 && !this.ignoreTag && _isAlpha(this.peek() || 0)) {
            var result = this.parseTag(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          } else {
            var result = this.parseLiteral(nestingLevel, parentArgType);
            if (result.err) {
              return result;
            }
            elements.push(result.val);
          }
        }
        return { val: elements, err: null };
      };
      Parser2.prototype.parseTag = function(nestingLevel, parentArgType) {
        var startPosition = this.clonePosition();
        this.bump();
        var tagName = this.parseTagName();
        this.bumpSpace();
        if (this.bumpIf("/>")) {
          return {
            val: {
              type: TYPE.literal,
              value: "<".concat(tagName, "/>"),
              location: createLocation(startPosition, this.clonePosition())
            },
            err: null
          };
        } else if (this.bumpIf(">")) {
          var childrenResult = this.parseMessage(nestingLevel + 1, parentArgType, true);
          if (childrenResult.err) {
            return childrenResult;
          }
          var children = childrenResult.val;
          var endTagStartPosition = this.clonePosition();
          if (this.bumpIf("</")) {
            if (this.isEOF() || !_isAlpha(this.char())) {
              return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            var closingTagNameStartPosition = this.clonePosition();
            var closingTagName = this.parseTagName();
            if (tagName !== closingTagName) {
              return this.error(ErrorKind.UNMATCHED_CLOSING_TAG, createLocation(closingTagNameStartPosition, this.clonePosition()));
            }
            this.bumpSpace();
            if (!this.bumpIf(">")) {
              return this.error(ErrorKind.INVALID_TAG, createLocation(endTagStartPosition, this.clonePosition()));
            }
            return {
              val: {
                type: TYPE.tag,
                value: tagName,
                children,
                location: createLocation(startPosition, this.clonePosition())
              },
              err: null
            };
          } else {
            return this.error(ErrorKind.UNCLOSED_TAG, createLocation(startPosition, this.clonePosition()));
          }
        } else {
          return this.error(ErrorKind.INVALID_TAG, createLocation(startPosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseTagName = function() {
        var startOffset = this.offset();
        this.bump();
        while (!this.isEOF() && _isPotentialElementNameChar(this.char())) {
          this.bump();
        }
        return this.message.slice(startOffset, this.offset());
      };
      Parser2.prototype.parseLiteral = function(nestingLevel, parentArgType) {
        var start = this.clonePosition();
        var value = "";
        while (true) {
          var parseQuoteResult = this.tryParseQuote(parentArgType);
          if (parseQuoteResult) {
            value += parseQuoteResult;
            continue;
          }
          var parseUnquotedResult = this.tryParseUnquoted(nestingLevel, parentArgType);
          if (parseUnquotedResult) {
            value += parseUnquotedResult;
            continue;
          }
          var parseLeftAngleResult = this.tryParseLeftAngleBracket();
          if (parseLeftAngleResult) {
            value += parseLeftAngleResult;
            continue;
          }
          break;
        }
        var location = createLocation(start, this.clonePosition());
        return {
          val: { type: TYPE.literal, value, location },
          err: null
        };
      };
      Parser2.prototype.tryParseLeftAngleBracket = function() {
        if (!this.isEOF() && this.char() === 60 && (this.ignoreTag || // If at the opening tag or closing tag position, bail.
        !_isAlphaOrSlash(this.peek() || 0))) {
          this.bump();
          return "<";
        }
        return null;
      };
      Parser2.prototype.tryParseQuote = function(parentArgType) {
        if (this.isEOF() || this.char() !== 39) {
          return null;
        }
        switch (this.peek()) {
          case 39:
            this.bump();
            this.bump();
            return "'";
          case 123:
          case 60:
          case 62:
          case 125:
            break;
          case 35:
            if (parentArgType === "plural" || parentArgType === "selectordinal") {
              break;
            }
            return null;
          default:
            return null;
        }
        this.bump();
        var codePoints = [this.char()];
        this.bump();
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch === 39) {
            if (this.peek() === 39) {
              codePoints.push(39);
              this.bump();
            } else {
              this.bump();
              break;
            }
          } else {
            codePoints.push(ch);
          }
          this.bump();
        }
        return fromCodePoint.apply(void 0, codePoints);
      };
      Parser2.prototype.tryParseUnquoted = function(nestingLevel, parentArgType) {
        if (this.isEOF()) {
          return null;
        }
        var ch = this.char();
        if (ch === 60 || ch === 123 || ch === 35 && (parentArgType === "plural" || parentArgType === "selectordinal") || ch === 125 && nestingLevel > 0) {
          return null;
        } else {
          this.bump();
          return fromCodePoint(ch);
        }
      };
      Parser2.prototype.parseArgument = function(nestingLevel, expectingCloseTag) {
        var openingBracePosition = this.clonePosition();
        this.bump();
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        if (this.char() === 125) {
          this.bump();
          return this.error(ErrorKind.EMPTY_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        var value = this.parseIdentifierIfPossible().value;
        if (!value) {
          return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bumpSpace();
        if (this.isEOF()) {
          return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        switch (this.char()) {
          case 125: {
            this.bump();
            return {
              val: {
                type: TYPE.argument,
                // value does not include the opening and closing braces.
                value,
                location: createLocation(openingBracePosition, this.clonePosition())
              },
              err: null
            };
          }
          case 44: {
            this.bump();
            this.bumpSpace();
            if (this.isEOF()) {
              return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
            }
            return this.parseArgumentOptions(nestingLevel, expectingCloseTag, value, openingBracePosition);
          }
          default:
            return this.error(ErrorKind.MALFORMED_ARGUMENT, createLocation(openingBracePosition, this.clonePosition()));
        }
      };
      Parser2.prototype.parseIdentifierIfPossible = function() {
        var startingPosition = this.clonePosition();
        var startOffset = this.offset();
        var value = matchIdentifierAtIndex(this.message, startOffset);
        var endOffset = startOffset + value.length;
        this.bumpTo(endOffset);
        var endPosition = this.clonePosition();
        var location = createLocation(startingPosition, endPosition);
        return { value, location };
      };
      Parser2.prototype.parseArgumentOptions = function(nestingLevel, expectingCloseTag, value, openingBracePosition) {
        var _a3;
        var typeStartPosition = this.clonePosition();
        var argType = this.parseIdentifierIfPossible().value;
        var typeEndPosition = this.clonePosition();
        switch (argType) {
          case "":
            return this.error(ErrorKind.EXPECT_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
          case "number":
          case "date":
          case "time": {
            this.bumpSpace();
            var styleAndLocation = null;
            if (this.bumpIf(",")) {
              this.bumpSpace();
              var styleStartPosition = this.clonePosition();
              var result = this.parseSimpleArgStyleIfPossible();
              if (result.err) {
                return result;
              }
              var style = trimEnd(result.val);
              if (style.length === 0) {
                return this.error(ErrorKind.EXPECT_ARGUMENT_STYLE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              var styleLocation = createLocation(styleStartPosition, this.clonePosition());
              styleAndLocation = { style, styleLocation };
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_1 = createLocation(openingBracePosition, this.clonePosition());
            if (styleAndLocation && startsWith(styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style, "::", 0)) {
              var skeleton = trimStart(styleAndLocation.style.slice(2));
              if (argType === "number") {
                var result = this.parseNumberSkeletonFromString(skeleton, styleAndLocation.styleLocation);
                if (result.err) {
                  return result;
                }
                return {
                  val: { type: TYPE.number, value, location: location_1, style: result.val },
                  err: null
                };
              } else {
                if (skeleton.length === 0) {
                  return this.error(ErrorKind.EXPECT_DATE_TIME_SKELETON, location_1);
                }
                var dateTimePattern = skeleton;
                if (this.locale) {
                  dateTimePattern = getBestPattern(skeleton, this.locale);
                }
                var style = {
                  type: SKELETON_TYPE.dateTime,
                  pattern: dateTimePattern,
                  location: styleAndLocation.styleLocation,
                  parsedOptions: this.shouldParseSkeletons ? parseDateTimeSkeleton(dateTimePattern) : {}
                };
                var type = argType === "date" ? TYPE.date : TYPE.time;
                return {
                  val: { type, value, location: location_1, style },
                  err: null
                };
              }
            }
            return {
              val: {
                type: argType === "number" ? TYPE.number : argType === "date" ? TYPE.date : TYPE.time,
                value,
                location: location_1,
                style: (_a3 = styleAndLocation === null || styleAndLocation === void 0 ? void 0 : styleAndLocation.style) !== null && _a3 !== void 0 ? _a3 : null
              },
              err: null
            };
          }
          case "plural":
          case "selectordinal":
          case "select": {
            var typeEndPosition_1 = this.clonePosition();
            this.bumpSpace();
            if (!this.bumpIf(",")) {
              return this.error(ErrorKind.EXPECT_SELECT_ARGUMENT_OPTIONS, createLocation(typeEndPosition_1, __assign({}, typeEndPosition_1)));
            }
            this.bumpSpace();
            var identifierAndLocation = this.parseIdentifierIfPossible();
            var pluralOffset = 0;
            if (argType !== "select" && identifierAndLocation.value === "offset") {
              if (!this.bumpIf(":")) {
                return this.error(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, createLocation(this.clonePosition(), this.clonePosition()));
              }
              this.bumpSpace();
              var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, ErrorKind.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
              if (result.err) {
                return result;
              }
              this.bumpSpace();
              identifierAndLocation = this.parseIdentifierIfPossible();
              pluralOffset = result.val;
            }
            var optionsResult = this.tryParsePluralOrSelectOptions(nestingLevel, argType, expectingCloseTag, identifierAndLocation);
            if (optionsResult.err) {
              return optionsResult;
            }
            var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
            if (argCloseResult.err) {
              return argCloseResult;
            }
            var location_2 = createLocation(openingBracePosition, this.clonePosition());
            if (argType === "select") {
              return {
                val: {
                  type: TYPE.select,
                  value,
                  options: fromEntries(optionsResult.val),
                  location: location_2
                },
                err: null
              };
            } else {
              return {
                val: {
                  type: TYPE.plural,
                  value,
                  options: fromEntries(optionsResult.val),
                  offset: pluralOffset,
                  pluralType: argType === "plural" ? "cardinal" : "ordinal",
                  location: location_2
                },
                err: null
              };
            }
          }
          default:
            return this.error(ErrorKind.INVALID_ARGUMENT_TYPE, createLocation(typeStartPosition, typeEndPosition));
        }
      };
      Parser2.prototype.tryParseArgumentClose = function(openingBracePosition) {
        if (this.isEOF() || this.char() !== 125) {
          return this.error(ErrorKind.EXPECT_ARGUMENT_CLOSING_BRACE, createLocation(openingBracePosition, this.clonePosition()));
        }
        this.bump();
        return { val: true, err: null };
      };
      Parser2.prototype.parseSimpleArgStyleIfPossible = function() {
        var nestedBraces = 0;
        var startPosition = this.clonePosition();
        while (!this.isEOF()) {
          var ch = this.char();
          switch (ch) {
            case 39: {
              this.bump();
              var apostrophePosition = this.clonePosition();
              if (!this.bumpUntil("'")) {
                return this.error(ErrorKind.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, createLocation(apostrophePosition, this.clonePosition()));
              }
              this.bump();
              break;
            }
            case 123: {
              nestedBraces += 1;
              this.bump();
              break;
            }
            case 125: {
              if (nestedBraces > 0) {
                nestedBraces -= 1;
              } else {
                return {
                  val: this.message.slice(startPosition.offset, this.offset()),
                  err: null
                };
              }
              break;
            }
            default:
              this.bump();
              break;
          }
        }
        return {
          val: this.message.slice(startPosition.offset, this.offset()),
          err: null
        };
      };
      Parser2.prototype.parseNumberSkeletonFromString = function(skeleton, location) {
        var tokens = [];
        try {
          tokens = parseNumberSkeletonFromString(skeleton);
        } catch (e9) {
          return this.error(ErrorKind.INVALID_NUMBER_SKELETON, location);
        }
        return {
          val: {
            type: SKELETON_TYPE.number,
            tokens,
            location,
            parsedOptions: this.shouldParseSkeletons ? parseNumberSkeleton(tokens) : {}
          },
          err: null
        };
      };
      Parser2.prototype.tryParsePluralOrSelectOptions = function(nestingLevel, parentArgType, expectCloseTag, parsedFirstIdentifier) {
        var _a3;
        var hasOtherClause = false;
        var options = [];
        var parsedSelectors = /* @__PURE__ */ new Set();
        var selector = parsedFirstIdentifier.value, selectorLocation = parsedFirstIdentifier.location;
        while (true) {
          if (selector.length === 0) {
            var startPosition = this.clonePosition();
            if (parentArgType !== "select" && this.bumpIf("=")) {
              var result = this.tryParseDecimalInteger(ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, ErrorKind.INVALID_PLURAL_ARGUMENT_SELECTOR);
              if (result.err) {
                return result;
              }
              selectorLocation = createLocation(startPosition, this.clonePosition());
              selector = this.message.slice(startPosition.offset, this.offset());
            } else {
              break;
            }
          }
          if (parsedSelectors.has(selector)) {
            return this.error(parentArgType === "select" ? ErrorKind.DUPLICATE_SELECT_ARGUMENT_SELECTOR : ErrorKind.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, selectorLocation);
          }
          if (selector === "other") {
            hasOtherClause = true;
          }
          this.bumpSpace();
          var openingBracePosition = this.clonePosition();
          if (!this.bumpIf("{")) {
            return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, createLocation(this.clonePosition(), this.clonePosition()));
          }
          var fragmentResult = this.parseMessage(nestingLevel + 1, parentArgType, expectCloseTag);
          if (fragmentResult.err) {
            return fragmentResult;
          }
          var argCloseResult = this.tryParseArgumentClose(openingBracePosition);
          if (argCloseResult.err) {
            return argCloseResult;
          }
          options.push([
            selector,
            {
              value: fragmentResult.val,
              location: createLocation(openingBracePosition, this.clonePosition())
            }
          ]);
          parsedSelectors.add(selector);
          this.bumpSpace();
          _a3 = this.parseIdentifierIfPossible(), selector = _a3.value, selectorLocation = _a3.location;
        }
        if (options.length === 0) {
          return this.error(parentArgType === "select" ? ErrorKind.EXPECT_SELECT_ARGUMENT_SELECTOR : ErrorKind.EXPECT_PLURAL_ARGUMENT_SELECTOR, createLocation(this.clonePosition(), this.clonePosition()));
        }
        if (this.requiresOtherClause && !hasOtherClause) {
          return this.error(ErrorKind.MISSING_OTHER_CLAUSE, createLocation(this.clonePosition(), this.clonePosition()));
        }
        return { val: options, err: null };
      };
      Parser2.prototype.tryParseDecimalInteger = function(expectNumberError, invalidNumberError) {
        var sign = 1;
        var startingPosition = this.clonePosition();
        if (this.bumpIf("+")) {
        } else if (this.bumpIf("-")) {
          sign = -1;
        }
        var hasDigits = false;
        var decimal = 0;
        while (!this.isEOF()) {
          var ch = this.char();
          if (ch >= 48 && ch <= 57) {
            hasDigits = true;
            decimal = decimal * 10 + (ch - 48);
            this.bump();
          } else {
            break;
          }
        }
        var location = createLocation(startingPosition, this.clonePosition());
        if (!hasDigits) {
          return this.error(expectNumberError, location);
        }
        decimal *= sign;
        if (!isSafeInteger(decimal)) {
          return this.error(invalidNumberError, location);
        }
        return { val: decimal, err: null };
      };
      Parser2.prototype.offset = function() {
        return this.position.offset;
      };
      Parser2.prototype.isEOF = function() {
        return this.offset() === this.message.length;
      };
      Parser2.prototype.clonePosition = function() {
        return {
          offset: this.position.offset,
          line: this.position.line,
          column: this.position.column
        };
      };
      Parser2.prototype.char = function() {
        var offset = this.position.offset;
        if (offset >= this.message.length) {
          throw Error("out of bound");
        }
        var code = codePointAt(this.message, offset);
        if (code === void 0) {
          throw Error("Offset ".concat(offset, " is at invalid UTF-16 code unit boundary"));
        }
        return code;
      };
      Parser2.prototype.error = function(kind, location) {
        return {
          val: null,
          err: {
            kind,
            message: this.message,
            location
          }
        };
      };
      Parser2.prototype.bump = function() {
        if (this.isEOF()) {
          return;
        }
        var code = this.char();
        if (code === 10) {
          this.position.line += 1;
          this.position.column = 1;
          this.position.offset += 1;
        } else {
          this.position.column += 1;
          this.position.offset += code < 65536 ? 1 : 2;
        }
      };
      Parser2.prototype.bumpIf = function(prefix) {
        if (startsWith(this.message, prefix, this.offset())) {
          for (var i7 = 0; i7 < prefix.length; i7++) {
            this.bump();
          }
          return true;
        }
        return false;
      };
      Parser2.prototype.bumpUntil = function(pattern) {
        var currentOffset = this.offset();
        var index = this.message.indexOf(pattern, currentOffset);
        if (index >= 0) {
          this.bumpTo(index);
          return true;
        } else {
          this.bumpTo(this.message.length);
          return false;
        }
      };
      Parser2.prototype.bumpTo = function(targetOffset) {
        if (this.offset() > targetOffset) {
          throw Error("targetOffset ".concat(targetOffset, " must be greater than or equal to the current offset ").concat(this.offset()));
        }
        targetOffset = Math.min(targetOffset, this.message.length);
        while (true) {
          var offset = this.offset();
          if (offset === targetOffset) {
            break;
          }
          if (offset > targetOffset) {
            throw Error("targetOffset ".concat(targetOffset, " is at invalid UTF-16 code unit boundary"));
          }
          this.bump();
          if (this.isEOF()) {
            break;
          }
        }
      };
      Parser2.prototype.bumpSpace = function() {
        while (!this.isEOF() && _isWhiteSpace(this.char())) {
          this.bump();
        }
      };
      Parser2.prototype.peek = function() {
        if (this.isEOF()) {
          return null;
        }
        var code = this.char();
        var offset = this.offset();
        var nextCode = this.message.charCodeAt(offset + (code >= 65536 ? 2 : 1));
        return nextCode !== null && nextCode !== void 0 ? nextCode : null;
      };
      return Parser2;
    }()
  );
  function _isAlpha(codepoint) {
    return codepoint >= 97 && codepoint <= 122 || codepoint >= 65 && codepoint <= 90;
  }
  function _isAlphaOrSlash(codepoint) {
    return _isAlpha(codepoint) || codepoint === 47;
  }
  function _isPotentialElementNameChar(c4) {
    return c4 === 45 || c4 === 46 || c4 >= 48 && c4 <= 57 || c4 === 95 || c4 >= 97 && c4 <= 122 || c4 >= 65 && c4 <= 90 || c4 == 183 || c4 >= 192 && c4 <= 214 || c4 >= 216 && c4 <= 246 || c4 >= 248 && c4 <= 893 || c4 >= 895 && c4 <= 8191 || c4 >= 8204 && c4 <= 8205 || c4 >= 8255 && c4 <= 8256 || c4 >= 8304 && c4 <= 8591 || c4 >= 11264 && c4 <= 12271 || c4 >= 12289 && c4 <= 55295 || c4 >= 63744 && c4 <= 64975 || c4 >= 65008 && c4 <= 65533 || c4 >= 65536 && c4 <= 983039;
  }
  function _isWhiteSpace(c4) {
    return c4 >= 9 && c4 <= 13 || c4 === 32 || c4 === 133 || c4 >= 8206 && c4 <= 8207 || c4 === 8232 || c4 === 8233;
  }
  function _isPatternSyntax(c4) {
    return c4 >= 33 && c4 <= 35 || c4 === 36 || c4 >= 37 && c4 <= 39 || c4 === 40 || c4 === 41 || c4 === 42 || c4 === 43 || c4 === 44 || c4 === 45 || c4 >= 46 && c4 <= 47 || c4 >= 58 && c4 <= 59 || c4 >= 60 && c4 <= 62 || c4 >= 63 && c4 <= 64 || c4 === 91 || c4 === 92 || c4 === 93 || c4 === 94 || c4 === 96 || c4 === 123 || c4 === 124 || c4 === 125 || c4 === 126 || c4 === 161 || c4 >= 162 && c4 <= 165 || c4 === 166 || c4 === 167 || c4 === 169 || c4 === 171 || c4 === 172 || c4 === 174 || c4 === 176 || c4 === 177 || c4 === 182 || c4 === 187 || c4 === 191 || c4 === 215 || c4 === 247 || c4 >= 8208 && c4 <= 8213 || c4 >= 8214 && c4 <= 8215 || c4 === 8216 || c4 === 8217 || c4 === 8218 || c4 >= 8219 && c4 <= 8220 || c4 === 8221 || c4 === 8222 || c4 === 8223 || c4 >= 8224 && c4 <= 8231 || c4 >= 8240 && c4 <= 8248 || c4 === 8249 || c4 === 8250 || c4 >= 8251 && c4 <= 8254 || c4 >= 8257 && c4 <= 8259 || c4 === 8260 || c4 === 8261 || c4 === 8262 || c4 >= 8263 && c4 <= 8273 || c4 === 8274 || c4 === 8275 || c4 >= 8277 && c4 <= 8286 || c4 >= 8592 && c4 <= 8596 || c4 >= 8597 && c4 <= 8601 || c4 >= 8602 && c4 <= 8603 || c4 >= 8604 && c4 <= 8607 || c4 === 8608 || c4 >= 8609 && c4 <= 8610 || c4 === 8611 || c4 >= 8612 && c4 <= 8613 || c4 === 8614 || c4 >= 8615 && c4 <= 8621 || c4 === 8622 || c4 >= 8623 && c4 <= 8653 || c4 >= 8654 && c4 <= 8655 || c4 >= 8656 && c4 <= 8657 || c4 === 8658 || c4 === 8659 || c4 === 8660 || c4 >= 8661 && c4 <= 8691 || c4 >= 8692 && c4 <= 8959 || c4 >= 8960 && c4 <= 8967 || c4 === 8968 || c4 === 8969 || c4 === 8970 || c4 === 8971 || c4 >= 8972 && c4 <= 8991 || c4 >= 8992 && c4 <= 8993 || c4 >= 8994 && c4 <= 9e3 || c4 === 9001 || c4 === 9002 || c4 >= 9003 && c4 <= 9083 || c4 === 9084 || c4 >= 9085 && c4 <= 9114 || c4 >= 9115 && c4 <= 9139 || c4 >= 9140 && c4 <= 9179 || c4 >= 9180 && c4 <= 9185 || c4 >= 9186 && c4 <= 9254 || c4 >= 9255 && c4 <= 9279 || c4 >= 9280 && c4 <= 9290 || c4 >= 9291 && c4 <= 9311 || c4 >= 9472 && c4 <= 9654 || c4 === 9655 || c4 >= 9656 && c4 <= 9664 || c4 === 9665 || c4 >= 9666 && c4 <= 9719 || c4 >= 9720 && c4 <= 9727 || c4 >= 9728 && c4 <= 9838 || c4 === 9839 || c4 >= 9840 && c4 <= 10087 || c4 === 10088 || c4 === 10089 || c4 === 10090 || c4 === 10091 || c4 === 10092 || c4 === 10093 || c4 === 10094 || c4 === 10095 || c4 === 10096 || c4 === 10097 || c4 === 10098 || c4 === 10099 || c4 === 10100 || c4 === 10101 || c4 >= 10132 && c4 <= 10175 || c4 >= 10176 && c4 <= 10180 || c4 === 10181 || c4 === 10182 || c4 >= 10183 && c4 <= 10213 || c4 === 10214 || c4 === 10215 || c4 === 10216 || c4 === 10217 || c4 === 10218 || c4 === 10219 || c4 === 10220 || c4 === 10221 || c4 === 10222 || c4 === 10223 || c4 >= 10224 && c4 <= 10239 || c4 >= 10240 && c4 <= 10495 || c4 >= 10496 && c4 <= 10626 || c4 === 10627 || c4 === 10628 || c4 === 10629 || c4 === 10630 || c4 === 10631 || c4 === 10632 || c4 === 10633 || c4 === 10634 || c4 === 10635 || c4 === 10636 || c4 === 10637 || c4 === 10638 || c4 === 10639 || c4 === 10640 || c4 === 10641 || c4 === 10642 || c4 === 10643 || c4 === 10644 || c4 === 10645 || c4 === 10646 || c4 === 10647 || c4 === 10648 || c4 >= 10649 && c4 <= 10711 || c4 === 10712 || c4 === 10713 || c4 === 10714 || c4 === 10715 || c4 >= 10716 && c4 <= 10747 || c4 === 10748 || c4 === 10749 || c4 >= 10750 && c4 <= 11007 || c4 >= 11008 && c4 <= 11055 || c4 >= 11056 && c4 <= 11076 || c4 >= 11077 && c4 <= 11078 || c4 >= 11079 && c4 <= 11084 || c4 >= 11085 && c4 <= 11123 || c4 >= 11124 && c4 <= 11125 || c4 >= 11126 && c4 <= 11157 || c4 === 11158 || c4 >= 11159 && c4 <= 11263 || c4 >= 11776 && c4 <= 11777 || c4 === 11778 || c4 === 11779 || c4 === 11780 || c4 === 11781 || c4 >= 11782 && c4 <= 11784 || c4 === 11785 || c4 === 11786 || c4 === 11787 || c4 === 11788 || c4 === 11789 || c4 >= 11790 && c4 <= 11798 || c4 === 11799 || c4 >= 11800 && c4 <= 11801 || c4 === 11802 || c4 === 11803 || c4 === 11804 || c4 === 11805 || c4 >= 11806 && c4 <= 11807 || c4 === 11808 || c4 === 11809 || c4 === 11810 || c4 === 11811 || c4 === 11812 || c4 === 11813 || c4 === 11814 || c4 === 11815 || c4 === 11816 || c4 === 11817 || c4 >= 11818 && c4 <= 11822 || c4 === 11823 || c4 >= 11824 && c4 <= 11833 || c4 >= 11834 && c4 <= 11835 || c4 >= 11836 && c4 <= 11839 || c4 === 11840 || c4 === 11841 || c4 === 11842 || c4 >= 11843 && c4 <= 11855 || c4 >= 11856 && c4 <= 11857 || c4 === 11858 || c4 >= 11859 && c4 <= 11903 || c4 >= 12289 && c4 <= 12291 || c4 === 12296 || c4 === 12297 || c4 === 12298 || c4 === 12299 || c4 === 12300 || c4 === 12301 || c4 === 12302 || c4 === 12303 || c4 === 12304 || c4 === 12305 || c4 >= 12306 && c4 <= 12307 || c4 === 12308 || c4 === 12309 || c4 === 12310 || c4 === 12311 || c4 === 12312 || c4 === 12313 || c4 === 12314 || c4 === 12315 || c4 === 12316 || c4 === 12317 || c4 >= 12318 && c4 <= 12319 || c4 === 12320 || c4 === 12336 || c4 === 64830 || c4 === 64831 || c4 >= 65093 && c4 <= 65094;
  }

  // ../node_modules/@formatjs/icu-messageformat-parser/lib/index.js
  function pruneLocation(els) {
    els.forEach(function(el) {
      delete el.location;
      if (isSelectElement(el) || isPluralElement(el)) {
        for (var k2 in el.options) {
          delete el.options[k2].location;
          pruneLocation(el.options[k2].value);
        }
      } else if (isNumberElement(el) && isNumberSkeleton(el.style)) {
        delete el.style.location;
      } else if ((isDateElement(el) || isTimeElement(el)) && isDateTimeSkeleton(el.style)) {
        delete el.style.location;
      } else if (isTagElement(el)) {
        pruneLocation(el.children);
      }
    });
  }
  function parse(message, opts) {
    if (opts === void 0) {
      opts = {};
    }
    opts = __assign({ shouldParseSkeletons: true, requiresOtherClause: true }, opts);
    var result = new Parser(message, opts).parse();
    if (result.err) {
      var error = SyntaxError(ErrorKind[result.err.kind]);
      error.location = result.err.location;
      error.originalMessage = result.err.message;
      throw error;
    }
    if (!(opts === null || opts === void 0 ? void 0 : opts.captureLocation)) {
      pruneLocation(result.val);
    }
    return result.val;
  }

  // ../node_modules/@formatjs/fast-memoize/lib/index.js
  function memoize(fn, options) {
    var cache3 = options && options.cache ? options.cache : cacheDefault;
    var serializer = options && options.serializer ? options.serializer : serializerDefault;
    var strategy = options && options.strategy ? options.strategy : strategyDefault;
    return strategy(fn, {
      cache: cache3,
      serializer
    });
  }
  function isPrimitive(value) {
    return value == null || typeof value === "number" || typeof value === "boolean";
  }
  function monadic(fn, cache3, serializer, arg) {
    var cacheKey = isPrimitive(arg) ? arg : serializer(arg);
    var computedValue = cache3.get(cacheKey);
    if (typeof computedValue === "undefined") {
      computedValue = fn.call(this, arg);
      cache3.set(cacheKey, computedValue);
    }
    return computedValue;
  }
  function variadic(fn, cache3, serializer) {
    var args = Array.prototype.slice.call(arguments, 3);
    var cacheKey = serializer(args);
    var computedValue = cache3.get(cacheKey);
    if (typeof computedValue === "undefined") {
      computedValue = fn.apply(this, args);
      cache3.set(cacheKey, computedValue);
    }
    return computedValue;
  }
  function assemble(fn, context, strategy, cache3, serialize) {
    return strategy.bind(context, fn, cache3, serialize);
  }
  function strategyDefault(fn, options) {
    var strategy = fn.length === 1 ? monadic : variadic;
    return assemble(fn, this, strategy, options.cache.create(), options.serializer);
  }
  function strategyVariadic(fn, options) {
    return assemble(fn, this, variadic, options.cache.create(), options.serializer);
  }
  function strategyMonadic(fn, options) {
    return assemble(fn, this, monadic, options.cache.create(), options.serializer);
  }
  var serializerDefault = function() {
    return JSON.stringify(arguments);
  };
  function ObjectWithoutPrototypeCache() {
    this.cache = /* @__PURE__ */ Object.create(null);
  }
  ObjectWithoutPrototypeCache.prototype.get = function(key) {
    return this.cache[key];
  };
  ObjectWithoutPrototypeCache.prototype.set = function(key, value) {
    this.cache[key] = value;
  };
  var cacheDefault = {
    create: function create() {
      return new ObjectWithoutPrototypeCache();
    }
  };
  var strategies = {
    variadic: strategyVariadic,
    monadic: strategyMonadic
  };

  // ../node_modules/intl-messageformat/lib/src/error.js
  var ErrorCode;
  (function(ErrorCode2) {
    ErrorCode2["MISSING_VALUE"] = "MISSING_VALUE";
    ErrorCode2["INVALID_VALUE"] = "INVALID_VALUE";
    ErrorCode2["MISSING_INTL_API"] = "MISSING_INTL_API";
  })(ErrorCode || (ErrorCode = {}));
  var FormatError = (
    /** @class */
    function(_super) {
      __extends(FormatError2, _super);
      function FormatError2(msg2, code, originalMessage) {
        var _this = _super.call(this, msg2) || this;
        _this.code = code;
        _this.originalMessage = originalMessage;
        return _this;
      }
      FormatError2.prototype.toString = function() {
        return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
      };
      return FormatError2;
    }(Error)
  );
  var InvalidValueError = (
    /** @class */
    function(_super) {
      __extends(InvalidValueError2, _super);
      function InvalidValueError2(variableId, value, options, originalMessage) {
        return _super.call(this, 'Invalid values for "'.concat(variableId, '": "').concat(value, '". Options are "').concat(Object.keys(options).join('", "'), '"'), ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueError2;
    }(FormatError)
  );
  var InvalidValueTypeError = (
    /** @class */
    function(_super) {
      __extends(InvalidValueTypeError2, _super);
      function InvalidValueTypeError2(value, type, originalMessage) {
        return _super.call(this, 'Value for "'.concat(value, '" must be of type ').concat(type), ErrorCode.INVALID_VALUE, originalMessage) || this;
      }
      return InvalidValueTypeError2;
    }(FormatError)
  );
  var MissingValueError = (
    /** @class */
    function(_super) {
      __extends(MissingValueError2, _super);
      function MissingValueError2(variableId, originalMessage) {
        return _super.call(this, 'The intl string context variable "'.concat(variableId, '" was not provided to the string "').concat(originalMessage, '"'), ErrorCode.MISSING_VALUE, originalMessage) || this;
      }
      return MissingValueError2;
    }(FormatError)
  );

  // ../node_modules/intl-messageformat/lib/src/formatters.js
  var PART_TYPE;
  (function(PART_TYPE2) {
    PART_TYPE2[PART_TYPE2["literal"] = 0] = "literal";
    PART_TYPE2[PART_TYPE2["object"] = 1] = "object";
  })(PART_TYPE || (PART_TYPE = {}));
  function mergeLiteral(parts) {
    if (parts.length < 2) {
      return parts;
    }
    return parts.reduce(function(all, part) {
      var lastPart = all[all.length - 1];
      if (!lastPart || lastPart.type !== PART_TYPE.literal || part.type !== PART_TYPE.literal) {
        all.push(part);
      } else {
        lastPart.value += part.value;
      }
      return all;
    }, []);
  }
  function isFormatXMLElementFn(el) {
    return typeof el === "function";
  }
  function formatToParts(els, locales, formatters, formats, values, currentPluralValue, originalMessage) {
    if (els.length === 1 && isLiteralElement(els[0])) {
      return [
        {
          type: PART_TYPE.literal,
          value: els[0].value
        }
      ];
    }
    var result = [];
    for (var _i = 0, els_1 = els; _i < els_1.length; _i++) {
      var el = els_1[_i];
      if (isLiteralElement(el)) {
        result.push({
          type: PART_TYPE.literal,
          value: el.value
        });
        continue;
      }
      if (isPoundElement(el)) {
        if (typeof currentPluralValue === "number") {
          result.push({
            type: PART_TYPE.literal,
            value: formatters.getNumberFormat(locales).format(currentPluralValue)
          });
        }
        continue;
      }
      var varName = el.value;
      if (!(values && varName in values)) {
        throw new MissingValueError(varName, originalMessage);
      }
      var value = values[varName];
      if (isArgumentElement(el)) {
        if (!value || typeof value === "string" || typeof value === "number") {
          value = typeof value === "string" || typeof value === "number" ? String(value) : "";
        }
        result.push({
          type: typeof value === "string" ? PART_TYPE.literal : PART_TYPE.object,
          value
        });
        continue;
      }
      if (isDateElement(el)) {
        var style = typeof el.style === "string" ? formats.date[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : void 0;
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getDateTimeFormat(locales, style).format(value)
        });
        continue;
      }
      if (isTimeElement(el)) {
        var style = typeof el.style === "string" ? formats.time[el.style] : isDateTimeSkeleton(el.style) ? el.style.parsedOptions : formats.time.medium;
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getDateTimeFormat(locales, style).format(value)
        });
        continue;
      }
      if (isNumberElement(el)) {
        var style = typeof el.style === "string" ? formats.number[el.style] : isNumberSkeleton(el.style) ? el.style.parsedOptions : void 0;
        if (style && style.scale) {
          value = value * (style.scale || 1);
        }
        result.push({
          type: PART_TYPE.literal,
          value: formatters.getNumberFormat(locales, style).format(value)
        });
        continue;
      }
      if (isTagElement(el)) {
        var children = el.children, value_1 = el.value;
        var formatFn = values[value_1];
        if (!isFormatXMLElementFn(formatFn)) {
          throw new InvalidValueTypeError(value_1, "function", originalMessage);
        }
        var parts = formatToParts(children, locales, formatters, formats, values, currentPluralValue);
        var chunks = formatFn(parts.map(function(p2) {
          return p2.value;
        }));
        if (!Array.isArray(chunks)) {
          chunks = [chunks];
        }
        result.push.apply(result, chunks.map(function(c4) {
          return {
            type: typeof c4 === "string" ? PART_TYPE.literal : PART_TYPE.object,
            value: c4
          };
        }));
      }
      if (isSelectElement(el)) {
        var opt = el.options[value] || el.options.other;
        if (!opt) {
          throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
        }
        result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values));
        continue;
      }
      if (isPluralElement(el)) {
        var opt = el.options["=".concat(value)];
        if (!opt) {
          if (!Intl.PluralRules) {
            throw new FormatError('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', ErrorCode.MISSING_INTL_API, originalMessage);
          }
          var rule = formatters.getPluralRules(locales, { type: el.pluralType }).select(value - (el.offset || 0));
          opt = el.options[rule] || el.options.other;
        }
        if (!opt) {
          throw new InvalidValueError(el.value, value, Object.keys(el.options), originalMessage);
        }
        result.push.apply(result, formatToParts(opt.value, locales, formatters, formats, values, value - (el.offset || 0)));
        continue;
      }
    }
    return mergeLiteral(result);
  }

  // ../node_modules/intl-messageformat/lib/src/core.js
  function mergeConfig(c1, c22) {
    if (!c22) {
      return c1;
    }
    return __assign(__assign(__assign({}, c1 || {}), c22 || {}), Object.keys(c1).reduce(function(all, k2) {
      all[k2] = __assign(__assign({}, c1[k2]), c22[k2] || {});
      return all;
    }, {}));
  }
  function mergeConfigs(defaultConfig, configs) {
    if (!configs) {
      return defaultConfig;
    }
    return Object.keys(defaultConfig).reduce(function(all, k2) {
      all[k2] = mergeConfig(defaultConfig[k2], configs[k2]);
      return all;
    }, __assign({}, defaultConfig));
  }
  function createFastMemoizeCache(store) {
    return {
      create: function() {
        return {
          get: function(key) {
            return store[key];
          },
          set: function(key, value) {
            store[key] = value;
          }
        };
      }
    };
  }
  function createDefaultFormatters(cache3) {
    if (cache3 === void 0) {
      cache3 = {
        number: {},
        dateTime: {},
        pluralRules: {}
      };
    }
    return {
      getNumberFormat: memoize(function() {
        var _a3;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a3 = Intl.NumberFormat).bind.apply(_a3, __spreadArray([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache3.number),
        strategy: strategies.variadic
      }),
      getDateTimeFormat: memoize(function() {
        var _a3;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a3 = Intl.DateTimeFormat).bind.apply(_a3, __spreadArray([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache3.dateTime),
        strategy: strategies.variadic
      }),
      getPluralRules: memoize(function() {
        var _a3;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        return new ((_a3 = Intl.PluralRules).bind.apply(_a3, __spreadArray([void 0], args, false)))();
      }, {
        cache: createFastMemoizeCache(cache3.pluralRules),
        strategy: strategies.variadic
      })
    };
  }
  var IntlMessageFormat = (
    /** @class */
    function() {
      function IntlMessageFormat2(message, locales, overrideFormats, opts) {
        if (locales === void 0) {
          locales = IntlMessageFormat2.defaultLocale;
        }
        var _this = this;
        this.formatterCache = {
          number: {},
          dateTime: {},
          pluralRules: {}
        };
        this.format = function(values) {
          var parts = _this.formatToParts(values);
          if (parts.length === 1) {
            return parts[0].value;
          }
          var result = parts.reduce(function(all, part) {
            if (!all.length || part.type !== PART_TYPE.literal || typeof all[all.length - 1] !== "string") {
              all.push(part.value);
            } else {
              all[all.length - 1] += part.value;
            }
            return all;
          }, []);
          if (result.length <= 1) {
            return result[0] || "";
          }
          return result;
        };
        this.formatToParts = function(values) {
          return formatToParts(_this.ast, _this.locales, _this.formatters, _this.formats, values, void 0, _this.message);
        };
        this.resolvedOptions = function() {
          var _a4;
          return {
            locale: ((_a4 = _this.resolvedLocale) === null || _a4 === void 0 ? void 0 : _a4.toString()) || Intl.NumberFormat.supportedLocalesOf(_this.locales)[0]
          };
        };
        this.getAst = function() {
          return _this.ast;
        };
        this.locales = locales;
        this.resolvedLocale = IntlMessageFormat2.resolveLocale(locales);
        if (typeof message === "string") {
          this.message = message;
          if (!IntlMessageFormat2.__parse) {
            throw new TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
          }
          var _a3 = opts || {}, formatters = _a3.formatters, parseOpts = __rest(_a3, ["formatters"]);
          this.ast = IntlMessageFormat2.__parse(message, __assign(__assign({}, parseOpts), { locale: this.resolvedLocale }));
        } else {
          this.ast = message;
        }
        if (!Array.isArray(this.ast)) {
          throw new TypeError("A message must be provided as a String or AST.");
        }
        this.formats = mergeConfigs(IntlMessageFormat2.formats, overrideFormats);
        this.formatters = opts && opts.formatters || createDefaultFormatters(this.formatterCache);
      }
      Object.defineProperty(IntlMessageFormat2, "defaultLocale", {
        get: function() {
          if (!IntlMessageFormat2.memoizedDefaultLocale) {
            IntlMessageFormat2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale;
          }
          return IntlMessageFormat2.memoizedDefaultLocale;
        },
        enumerable: false,
        configurable: true
      });
      IntlMessageFormat2.memoizedDefaultLocale = null;
      IntlMessageFormat2.resolveLocale = function(locales) {
        if (typeof Intl.Locale === "undefined") {
          return;
        }
        var supportedLocales2 = Intl.NumberFormat.supportedLocalesOf(locales);
        if (supportedLocales2.length > 0) {
          return new Intl.Locale(supportedLocales2[0]);
        }
        return new Intl.Locale(typeof locales === "string" ? locales : locales[0]);
      };
      IntlMessageFormat2.__parse = parse;
      IntlMessageFormat2.formats = {
        number: {
          integer: {
            maximumFractionDigits: 0
          },
          currency: {
            style: "currency"
          },
          percent: {
            style: "percent"
          }
        },
        date: {
          short: {
            month: "numeric",
            day: "numeric",
            year: "2-digit"
          },
          medium: {
            month: "short",
            day: "numeric",
            year: "numeric"
          },
          long: {
            month: "long",
            day: "numeric",
            year: "numeric"
          },
          full: {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
          }
        },
        time: {
          short: {
            hour: "numeric",
            minute: "numeric"
          },
          medium: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
          },
          long: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          },
          full: {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
          }
        }
      };
      return IntlMessageFormat2;
    }()
  );

  // ../node_modules/intl-messageformat/lib/index.js
  var lib_default = IntlMessageFormat;

  // ../node_modules/intl-format-cache/lib/index.js
  var __spreadArrays = function() {
    for (var s6 = 0, i7 = 0, il = arguments.length; i7 < il; i7++)
      s6 += arguments[i7].length;
    for (var r5 = Array(s6), k2 = 0, i7 = 0; i7 < il; i7++)
      for (var a3 = arguments[i7], j = 0, jl = a3.length; j < jl; j++, k2++)
        r5[k2] = a3[j];
    return r5;
  };
  function getCacheId(inputs) {
    return JSON.stringify(inputs.map(function(input) {
      return input && typeof input === "object" ? orderedProps(input) : input;
    }));
  }
  function orderedProps(obj) {
    return Object.keys(obj).sort().map(function(k2) {
      var _a3;
      return _a3 = {}, _a3[k2] = obj[k2], _a3;
    });
  }
  var memoizeFormatConstructor = function(FormatConstructor, cache3) {
    if (cache3 === void 0) {
      cache3 = {};
    }
    return function() {
      var _a3;
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
      var cacheId = getCacheId(args);
      var format = cacheId && cache3[cacheId];
      if (!format) {
        format = new ((_a3 = FormatConstructor).bind.apply(_a3, __spreadArrays([void 0], args)))();
        if (cacheId) {
          cache3[cacheId] = format;
        }
      }
      return format;
    };
  };
  var lib_default2 = memoizeFormatConstructor;

  // ../packages/i18n/lib/memoiser.js
  var Memoiser = class {
    static getMemoiseKey(scope, locale) {
      return `${scope}|${locale}`;
    }
    static clearRecord(memoiseKey) {
      delete this.memoiseMap[memoiseKey];
    }
    static setInterval() {
      if (this.interval === null) {
        this.interval = window.setInterval(() => this.intervalCallback(), this.Timeout);
      }
    }
    static intervalCallback() {
      const now = Date.now();
      let memoiseKey;
      for (memoiseKey in this.memoiseMap) {
        const { time: time2 } = this.memoiseMap[memoiseKey];
        if (now - time2 > this.Timeout) {
          this.clearRecord(memoiseKey);
        }
      }
      if (!this.hasRecords()) {
        this.clearInterval();
      }
    }
    static clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
    static hasRecords() {
      return Object.keys(this.memoiseMap).length > 0;
    }
    /**
     * Get IntlMessageFormat memoised function
     * @param scope Scope
     * @param locale Locale
     * @param key Key
     * @param message Message
     * @param [formats] Override Formats
     * @param [opts] Options
     * @returns IntlMessageFormat
     */
    static get(scope, locale, key, message, formats, opts) {
      const memoiseKey = this.getMemoiseKey(scope, locale);
      let memoised = this.memoiseMap[memoiseKey];
      if (!memoised) {
        memoised = {
          formatter: lib_default2(lib_default),
          keys: {},
          time: 0
        };
        this.memoiseMap[memoiseKey] = memoised;
      }
      const { keys, formatter } = memoised;
      let format = keys[key];
      if (!format) {
        format = formatter(message, locale, formats, opts);
        keys[key] = format;
      }
      memoised.time = Date.now();
      this.setInterval();
      return format;
    }
    /**
     * Clear all cached records
     * @param scope Scope
     * @param locale Local
     * @returns {void}
     */
    static clear() {
      this.memoiseMap = {};
      this.clearInterval();
    }
    /**
     * Delete cached record
     * @param scope Scope
     * @param locale Local
     * @returns {void}
     */
    static delete(scope, locale) {
      const memoiseKey = this.getMemoiseKey(scope, locale);
      this.clearRecord(memoiseKey);
      if (!this.hasRecords()) {
        this.clearInterval();
      }
    }
    /**
     * Get a formatted localised string
     * @param scope Scope
     * @param locale Locale
     * @param key Key
     * @param message Message
     * @param [options] Additional options to format the string
     * @param [formats] Optional object with user defined options for format styles.
     * @param [opts] Optional options.
     * - formatters: Map containing memoized formatters for performance.
     * - ignoreTag: Whether to treat HTML/XML tags as string literal instead of parsing them as tag token. When this is false we only allow simple tags without any attributes
     * @returns formatted message
     */
    static format(scope, locale, key, message, options, formats, opts) {
      const intlMessage = this.get(scope, locale, key, message, formats, opts);
      return String(intlMessage.format(options));
    }
  };
  Memoiser.Timeout = 30 * 60 * 1e3;
  Memoiser.interval = null;
  Memoiser.memoiseMap = {};

  // ../packages/i18n/lib/translate.js
  var resolveLocale = (scope, locale) => {
    if (!locale) {
      return "";
    }
    const supported = Phrasebook.supported(scope);
    return supportedLocales(supported, [locale])[0] || "";
  };
  var parseUnicodeExtensions = (locale, unicodeExtensions) => {
    if (!unicodeExtensions) {
      return locale;
    }
    const extensions = [];
    const localeUSplit = locale.split("-u-");
    locale = localeUSplit[0];
    const localeExtensions = {};
    if (localeUSplit[1]) {
      const split = localeUSplit[1].split("-");
      while (split.length) {
        const name = String(split.shift());
        const value = split.shift() || "";
        localeExtensions[name] = value;
      }
    }
    unicodeExtensions = Object.assign(localeExtensions, unicodeExtensions);
    for (const name in unicodeExtensions) {
      extensions.push(name, unicodeExtensions[name]);
    }
    if (extensions.length) {
      locale += `-u-${extensions.join("-")}`;
    }
    return locale;
  };
  var t6 = (scope, locale, key, options, translateParams) => {
    try {
      let resolvedLocale = resolveLocale(scope, locale);
      if (!resolvedLocale && locale !== DEFAULT_LOCALE) {
        locale = DEFAULT_LOCALE;
        resolvedLocale = resolveLocale(scope, locale);
      }
      const translation = resolvedLocale ? Phrasebook.get(resolvedLocale, scope) : null;
      if (!translation || !translation[key]) {
        console.warn(`elf-i18n: "${key}" is not found in scope: "${scope}", locale: "${locale}" translations`);
        return Promise.resolve(key);
      }
      if (translateParams?.unicodeExtensions) {
        locale = parseUnicodeExtensions(locale, translateParams?.unicodeExtensions);
      }
      return Promise.resolve(Memoiser.format(scope, locale, key, translation[key], options, translateParams?.formats, translateParams?.options));
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // ../packages/translate/lib/translate.js
  var TranslatePropertyKey = Symbol("ef-translate");
  var AsyncTranslateDirective = class extends c3 {
    constructor(partInfo) {
      super(partInfo);
      this.partType = partInfo.type;
      if (!(this.partType === t4.CHILD || this.partType === t4.ATTRIBUTE || this.partType === t4.PROPERTY)) {
        throw new Error("Element Framework Translate can only be used in content, attribute or property bindings");
      }
    }
    render(scope, locale, key, options, translateParams) {
      Promise.resolve(t6(scope, locale, key, options, translateParams)).then((message) => {
        this.setValue(this.partType === t4.CHILD ? o7(message) : message);
      }).catch((error) => {
        this.setValue(key);
        setTimeout(() => {
          throw error instanceof Error ? error : new Error(String(error));
        });
      });
      return x;
    }
  };
  var translateDirective = e5(AsyncTranslateDirective);
  var translatePromise = (scope, locale, key, options, translateParams) => {
    return Promise.resolve(t6(scope, locale, key, options, translateParams)).then((message) => {
      return message;
    }).catch((error) => {
      setTimeout(() => {
        throw error instanceof Error ? error : new Error(String(error));
      });
      return key;
    });
  };
  var getLocale = (element) => element.lang || LangAttributeObserver.documentLang || navigator.language;
  var observeTranslations = function(scope = this.localName) {
    let locale = getLocale(this);
    LangAttributeObserver.observe(this, () => {
      const newLocale = getLocale(this);
      if (locale !== newLocale) {
        locale = newLocale;
        this.requestUpdate(TranslatePropertyKey, {});
      }
    });
    return Phrasebook.observe(scope, () => {
      this.requestUpdate(TranslatePropertyKey, {});
    });
  };
  var disconnectTranslations = function(key) {
    LangAttributeObserver.disconnect(this);
    Phrasebook.disconnect(key);
  };
  var translate = function(options) {
    return (prototype, name) => {
      const scope = options ? typeof options === "string" ? options : options.scope : void 0;
      const mode = options && typeof options !== "string" ? options.mode : "directive";
      const keys = /* @__PURE__ */ new Map();
      const connectedCallback = prototype.connectedCallback;
      prototype.connectedCallback = function() {
        connectedCallback.call(this);
        keys.set(this, observeTranslations.call(this, scope));
      };
      const disconnectedCallback = prototype.disconnectedCallback;
      prototype.disconnectedCallback = function() {
        disconnectedCallback.call(this);
        disconnectTranslations.call(this, keys.get(this) || "");
        keys.delete(this);
      };
      const descriptor = mode === "promise" ? {
        get() {
          return (key, options2, translateParams) => {
            return translatePromise(scope || this.localName, getLocale(this), key, options2, translateParams);
          };
        }
      } : {
        get() {
          return (key, options2, translateParams) => {
            return translateDirective(scope || this.localName, getLocale(this), key, options2, translateParams);
          };
        }
      };
      Object.defineProperty(prototype, name, Object.assign({
        enumerable: false,
        configurable: false
      }, descriptor));
    };
  };

  // ../packages/phrasebook/lib/locale/en/password-field.js
  var translations = {
    SHOW_PASSWORD: "Show password",
    HIDE_PASSWORD: "Hide password"
  };
  Phrasebook.define("en", "ds-sub-password-field", translations);

  // ../packages/components/lib/sub-password-field/index.js
  var isEyeOffPreloadRequested = false;
  var SubPasswordField = class SubPasswordField2 extends SubTextField {
    constructor() {
      super(...arguments);
      this.isPasswordVisible = false;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return [
        super.styles,
        i`
        :host [part=icon] {
          cursor: pointer;
        }
        :host [part=icon]:hover {
          color: var(--ds-control-hover-color);
        }
        :host [part=icon]:focus-visible {
          outline: var(--ds-control-border-style) var(--ds-control-border-width) var(--ds-control-focus-border-color);
          border-radius: var(--ds-control-border-radius);
        }
      `
      ];
    }
    /**
     * Called when the element’s DOM has been updated and rendered for the first time
     * @param changedProperties Properties that has changed
     * @return shouldUpdate
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      if (!isEyeOffPreloadRequested) {
        preload("eye-off");
        isEyeOffPreloadRequested = true;
      }
    }
    /**
     * Decorate `<input>` element with common properties extended from text-field:
     * type="text|password" - text if password is visible
     * @returns template map
     */
    get decorateInputMap() {
      return {
        ...super.decorateInputMap,
        type: this.isPasswordVisible ? "text" : "password"
      };
    }
    /**
     * Toggles password visibility state
     * @return void
     */
    togglePasswordVisibility() {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
    /**
     * Renders icon element
     * @returns {void}
     */
    renderIcon() {
      return y`
     <ui-sub-icon
        part="icon"
        role="button"
        tabindex="0"
        aria-label="${this.isPasswordVisible ? this.t("HIDE_PASSWORD") : this.t("SHOW_PASSWORD")}"
        icon=${this.isPasswordVisible ? "eye-off" : "eye"}
        ?readonly="${this.readonly}"
        ?disabled="${this.disabled}"
        @tap="${this.togglePasswordVisibility}"
      ></ui-sub-icon>
    `;
    }
  };
  SubPasswordField.shadowRootOptions = { ...SubTextField.shadowRootOptions, delegatesFocus: true };
  __decorate([
    translate({ scope: "ui-sub-password-field" })
  ], SubPasswordField.prototype, "t", void 0);
  __decorate([
    t3()
  ], SubPasswordField.prototype, "isPasswordVisible", void 0);
  SubPasswordField = __decorate([
    customElement("ui-sub-password-field", { theme: false })
  ], SubPasswordField);

  // ../packages/components/lib/input-field/index.js
  var hasChanged2 = (value, oldValue) => oldValue === void 0 ? false : value !== oldValue;
  var InputField = class InputField2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.type = "text";
      this.label = "";
      this.hint = "";
      this.icon = null;
      this.iconHasAction = false;
      this.error = false;
      this.warning = false;
      this.pattern = "";
      this.maxLength = null;
      this.minLength = null;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: flex;
        flex-direction: column;
        margin: var(--ds-space-x-small) 0;
      }
      :host [part=label] {
        margin: var(--ds-space-x-small) 0;
      }
      :host [part=hint] {
        margin: var(--ds-space-xx-small) 0;
      }
    `;
    }
    handleValueChanged(event) {
      this.setValueAndNotify(event.detail.value);
    }
    handleErrorChanged(event) {
      this.error = event.detail.value;
      this.notifyPropertyChange("error", this.error);
    }
    handleIconClick() {
      if (this.iconHasAction && !this.disabled) {
        this.dispatchEvent(new CustomEvent("icon-click", { bubbles: false }));
      }
    }
    get decorateField() {
      return {
        "aria-labelledby": this.label ? "label" : null,
        "aria-describedby": this.hint ? "hint" : null,
        "disabled": this.disabled,
        "readonly": this.readonly,
        "error": this.error || null,
        "warning": this.warning || null,
        "pattern": this.pattern || null,
        "value": this.value || null,
        "icon": this.icon || null,
        "icon-has-action": this.iconHasAction || null,
        "minlength": this.minLength || null,
        "maxlength": this.maxLength || null,
        "@icon-click": this.handleIconClick,
        "@value-changed": this.handleValueChanged,
        "@error-changed": this.handleErrorChanged
      };
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    get renderField() {
      switch (this.type) {
        case "password":
          return y`<ui-sub-password-field ${templateMap(this.decorateField)}></ui-sub-password-field>`;
        default:
          return y`<ui-sub-text-field ${templateMap(this.decorateField)}></ui-sub-text-field>`;
      }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    get renderLabel() {
      return y`<ui-sub-label id="label" part="label">${this.label}</ui-sub-label>`;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    get renderHint() {
      return y`<ui-sub-label error id="hint" part="hint">${this.hint}</ui-sub-label>`;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`
      ${this.label ? this.renderLabel : b}
      ${this.renderField}
      ${this.hint ? this.renderHint : b}
    `;
    }
  };
  InputField.shadowRootOptions = { ...ControlElement.shadowRootOptions, delegatesFocus: true };
  __decorate([
    e4({ type: String })
  ], InputField.prototype, "type", void 0);
  __decorate([
    e4({ type: String })
  ], InputField.prototype, "label", void 0);
  __decorate([
    e4({ type: String })
  ], InputField.prototype, "hint", void 0);
  __decorate([
    e4({ type: String, reflect: true })
  ], InputField.prototype, "icon", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, attribute: "icon-has-action" })
  ], InputField.prototype, "iconHasAction", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], InputField.prototype, "error", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], InputField.prototype, "warning", void 0);
  __decorate([
    e4({ type: String, hasChanged: hasChanged2 })
  ], InputField.prototype, "pattern", void 0);
  __decorate([
    e4({ type: Number, attribute: "maxlength", reflect: true })
  ], InputField.prototype, "maxLength", void 0);
  __decorate([
    e4({ type: Number, attribute: "minlength", reflect: true, hasChanged: hasChanged2 })
  ], InputField.prototype, "minLength", void 0);
  InputField = __decorate([
    customElement("ui-input-field", { theme: false })
  ], InputField);

  // ../packages/components/lib/option/index.js
  var Option = class Option2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.defaultRole = "option";
      this.selected = false;
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: flex;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
        outline: none;
        padding: var(--ds-space-xxx-small) var(--ds-space-x-small);
        min-height: var(--ds-control-height);
        color: var(--ds-control-color);
        background-color: var(--ds-control-background-color);
        border: var(--ds-control-border-width) var(--ds-control-border-style) transparent;
        border-radius: var(--ds-control-border-radius);
      }
      :host(:focus),
      :host(:hover),
      :host([selected]) {
        color: var(--ds-control-color);
        border-color: var(--ds-control-focus-border-color);
        background-color: var(--ds-control-focus-background-color);
      }
      :host([selected]) {
        color: var(--ds-control-focus-color);
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
      return y`
      <slot></slot>
    `;
    }
  };
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], Option.prototype, "selected", void 0);
  Option = __decorate([
    customElement("ui-option", { theme: false })
  ], Option);

  // ../node_modules/@lit/reactive-element/decorators/base.js
  var o9 = ({ finisher: e9, descriptor: t7 }) => (o10, n7) => {
    var r5;
    if (void 0 === n7) {
      const n8 = null !== (r5 = o10.originalKey) && void 0 !== r5 ? r5 : o10.key, i7 = null != t7 ? { kind: "method", placement: "prototype", key: n8, descriptor: t7(o10.key) } : { ...o10, key: n8 };
      return null != e9 && (i7.finisher = function(t8) {
        e9(t8, n8);
      }), i7;
    }
    {
      const r6 = o10.constructor;
      void 0 !== t7 && Object.defineProperty(o10, n7, t7(n7)), null == e9 || e9(r6, n7);
    }
  };

  // ../node_modules/@lit/reactive-element/decorators/query.js
  function i5(i7, n7) {
    return o9({ descriptor: (o10) => {
      const t7 = { get() {
        var o11, n8;
        return null !== (n8 = null === (o11 = this.renderRoot) || void 0 === o11 ? void 0 : o11.querySelector(i7)) && void 0 !== n8 ? n8 : null;
      }, enumerable: true, configurable: true };
      if (n7) {
        const n8 = "symbol" == typeof o10 ? Symbol() : "__" + o10;
        t7.get = function() {
          var o11, t8;
          return void 0 === this[n8] && (this[n8] = null !== (t8 = null === (o11 = this.renderRoot) || void 0 === o11 ? void 0 : o11.querySelector(i7)) && void 0 !== t8 ? t8 : null), this[n8];
        };
      }
      return t7;
    } });
  }

  // ../node_modules/lit-html/directives/style-map.js
  var i6 = e5(class extends i4 {
    constructor(t7) {
      var e9;
      if (super(t7), t7.type !== t4.ATTRIBUTE || "style" !== t7.name || (null === (e9 = t7.strings) || void 0 === e9 ? void 0 : e9.length) > 2)
        throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
    }
    render(t7) {
      return Object.keys(t7).reduce((e9, r5) => {
        const s6 = t7[r5];
        return null == s6 ? e9 : e9 + `${r5 = r5.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s6};`;
      }, "");
    }
    update(e9, [r5]) {
      const { style: s6 } = e9.element;
      if (void 0 === this.vt) {
        this.vt = /* @__PURE__ */ new Set();
        for (const t7 in r5)
          this.vt.add(t7);
        return this.render(r5);
      }
      this.vt.forEach((t7) => {
        null == r5[t7] && (this.vt.delete(t7), t7.includes("-") ? s6.removeProperty(t7) : s6[t7] = "");
      });
      for (const t7 in r5) {
        const e10 = r5[t7];
        null != e10 && (this.vt.add(t7), t7.includes("-") ? s6.setProperty(t7, e10) : s6[t7] = e10);
      }
      return x;
    }
  });

  // ../packages/utils/lib/async/task.js
  var Tasks = /* @__PURE__ */ new Set();
  var Task = class {
    /**
     * Create the new task
     * @param callback The callback to execute
     */
    constructor(callback, ...args) {
      this.callback = callback;
      this.args = args;
      Tasks.add(this);
    }
    /**
     * Immediately fulfil the callback
     * @returns {void}
     */
    fulfil() {
      if (Tasks.has(this)) {
        Tasks.delete(this);
        this.callback();
      }
    }
    /**
     * Cancel the task
     * @returns {void}
     */
    cancel() {
      Tasks.delete(this);
    }
  };

  // ../packages/utils/lib/async/runner.js
  var Runner = class {
    constructor(Task2, ...args) {
      this._processing = false;
      this.Task = Task2;
      this.args = args;
    }
    /**
     * Schedule a task
     * @param callback Callback function
     * @returns {void}
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    schedule(callback) {
    }
    /**
     * Cancel the task
     * @returns {void}
     */
    cancel() {
      if (this.task) {
        this.task.cancel();
      }
    }
    /**
     * Immediately fulfil the task
     * @returns {void}
     */
    fulfil() {
      if (this.task) {
        this.task.fulfil();
      }
    }
    /**
     * Initialise a runner task
     * @param callback Task callback function
     * @returns {void}
     */
    createTask(callback) {
      this._task = new this.Task(callback, ...this.args);
    }
    /**
     * Run the main callback
     * @param callback The callback to execute
     * @returns {void}
     */
    runCallback(callback) {
      this._processing = true;
      try {
        callback();
      } catch (e9) {
        setTimeout(() => {
          throw e9;
        });
      } finally {
        this._processing = false;
      }
    }
    /**
     * Checks to see whether the
     * runner is currently processing the task
     */
    get processing() {
      return this._processing;
    }
    /**
     * Checks to see whether the
     * runner is currently processing the task
     */
    get task() {
      return this._task;
    }
  };

  // ../packages/utils/lib/async/throttler-runner.js
  var ThrottlerRunner = class extends Runner {
    constructor() {
      super(...arguments);
      this.hasThrottler = false;
    }
    /**
     * Schedule a throttled task
     * @param callback Callback function
     * @returns {void}
     */
    schedule(callback) {
      this.callback = callback;
      if (!this.hasThrottler) {
        this.hasThrottler = true;
        this.createTask(() => {
          this.hasThrottler = false;
          const clb = this.callback;
          this.callback = void 0;
          this.runCallback(clb);
        });
      }
    }
    cancel() {
      super.cancel();
      this.hasThrottler = false;
    }
  };

  // ../packages/utils/lib/async/animation-task-runner.js
  var AnimationTask = class extends Task {
    constructor() {
      super(...arguments);
      this.animationFrame = requestAnimationFrame(() => this.fulfil());
    }
    cancel() {
      super.cancel();
      cancelAnimationFrame(this.animationFrame);
    }
  };
  var AnimationTaskRunner = class extends ThrottlerRunner {
    constructor() {
      super(AnimationTask);
    }
  };

  // ../packages/utils/lib/async/micro-task-runner.js
  var throwErrorAsync = (error) => {
    setTimeout(() => {
      throw error;
    });
  };
  var queueMicrotask = (callback) => {
    if ("queueMicroTask" in window) {
      return window.queueMicrotask(callback);
    }
    Promise.resolve().then(callback).catch(throwErrorAsync);
  };
  var MicroTask = class extends Task {
    constructor(callback) {
      super(callback);
      queueMicrotask(() => this.fulfil());
    }
  };
  var MicroTaskRunner = class extends ThrottlerRunner {
    constructor() {
      super(MicroTask);
      this.loopRunner = new AnimationTaskRunner();
    }
    schedule(callback) {
      if (this.processing) {
        this.loopRunner.schedule(() => this.schedule(callback));
        return;
      }
      super.schedule(callback);
    }
    cancel() {
      if (this.loopRunner) {
        this.loopRunner.cancel();
      }
      super.cancel();
    }
  };

  // ../packages/utils/lib/async/after-render-task-runner.js
  var AfterRenderTask = class extends Task {
    constructor() {
      super(...arguments);
      this.animationFrame = requestAnimationFrame(() => {
        this.timeout = window.setTimeout(this.fulfil.bind(this));
      });
    }
    cancel() {
      super.cancel();
      clearTimeout(this.timeout);
      cancelAnimationFrame(this.animationFrame);
    }
  };
  var AfterRenderTaskRunner = class extends ThrottlerRunner {
    constructor() {
      super(AfterRenderTask);
    }
  };

  // ../packages/utils/lib/browser.js
  var isEdge = /Edge\/\d./i.test(navigator.userAgent);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  // ../packages/components/lib/sub-overlay/helpers/types.js
  var DEFAULT_ALIGN = /* @__PURE__ */ new Map([
    ["top", "start"],
    ["bottom", "start"],
    ["left", "middle"],
    ["right", "middle"],
    ["center", "middle"]
  ]);
  var DEFAULT_TARGET_STRATEGY = [
    ["bottom", "start"],
    ["top", "start"],
    ["right", "middle"],
    ["left", "middle"]
  ];

  // ../packages/components/lib/sub-overlay/helpers/functions.js
  var valueOrZero = (v2) => v2 || 0;
  var valueOrNull = (v2) => {
    const parsed = parseFloat(v2);
    return isNaN(parsed) ? null : parsed;
  };

  // ../packages/components/lib/sub-overlay/managers/zindex-manager.js
  var ZIndex = 103;
  var ZIndexManager = class {
    constructor() {
      this.registry = /* @__PURE__ */ new Map();
      this.focusThrottled = new AfterRenderTaskRunner();
      this.onFocus = ({ target }) => {
        const overlays = this.getOverlays();
        this.focusThrottled.schedule(() => {
          const newOverlays = this.getOverlays();
          const overlay = target;
          if (!overlay.opened || overlays.length !== newOverlays.length) {
            return;
          }
          for (let i7 = 0; i7 < overlays.length; i7 += 1) {
            if (overlays[i7] !== newOverlays[i7]) {
              return;
            }
          }
          this.toFront(overlay);
        });
      };
    }
    sortByZIndex(overlays) {
      const len = overlays.length;
      if (len <= 1) {
        return overlays;
      }
      const pivot = Math.ceil(len / 2);
      const left = this.sortByZIndex(overlays.slice(0, pivot));
      const right = this.sortByZIndex(overlays.slice(pivot));
      return this.mergeSortByZIndex(left, right);
    }
    mergeSortByZIndex(left, right) {
      const result = [];
      while (left.length > 0 && right.length > 0) {
        if (left[0].zIndex < right[0].zIndex) {
          result.push(right.shift());
        } else {
          result.push(left.shift());
        }
      }
      return result.concat(left, right);
    }
    get sorted() {
      const overlays = [];
      this.registry.forEach((zIndex, overlay) => {
        overlays.push({
          zIndex,
          overlay
        });
      });
      return this.sortByZIndex(overlays);
    }
    setZIndex(overlay, zIndex) {
      const oldZIndex = this.registry.get(overlay);
      if (oldZIndex !== zIndex) {
        this.registry.set(overlay, zIndex);
        overlay.style.setProperty("z-index", `${zIndex}`);
      }
    }
    getNextZIndex(overlay) {
      const topOverlay = this.getOverlayLayers()[0];
      if (!topOverlay) {
        return ZIndex;
      }
      if (topOverlay.overlay === overlay) {
        return topOverlay.zIndex;
      }
      return topOverlay.zIndex + 2;
    }
    toFront(overlay) {
      this.setZIndex(overlay, this.getNextZIndex(overlay));
    }
    register(overlay) {
      if (!this.registry.has(overlay)) {
        let zIndex;
        if (typeof overlay.zIndex === "number") {
          const overlayZIndex = overlay.zIndex;
          if (this.registry.size === 0) {
            zIndex = overlayZIndex;
          } else {
            const nextZIndex = this.getNextZIndex(overlay);
            zIndex = overlayZIndex > nextZIndex ? overlayZIndex : nextZIndex;
          }
        } else {
          zIndex = this.registry.size === 0 ? ZIndex : this.getNextZIndex(overlay);
        }
        this.setZIndex(overlay, zIndex);
        overlay.addEventListener("focus", this.onFocus);
      } else if (typeof overlay.zIndex === "number") {
        this.setZIndex(overlay, overlay.zIndex);
      }
    }
    deregister(overlay) {
      if (this.registry.has(overlay)) {
        this.registry.delete(overlay);
        overlay.removeEventListener("focus", this.onFocus);
      }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
      return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
      this.registry.forEach((zIndex, overlay) => this.deregister(overlay));
    }
    /**
     * Get overlay layers sorted by z-index
     * @returns overlay layers
     */
    getOverlayLayers() {
      return this.sorted;
    }
    /**
     * Get overlay panels sorted by z-index
     * @returns overlay panels
     */
    getOverlays() {
      return this.sorted.map(({ overlay }) => overlay);
    }
  };
  var zIndexManager = new ZIndexManager();
  var register5 = (overlay) => {
    zIndexManager.register(overlay);
  };
  var deregister = (overlay) => {
    zIndexManager.deregister(overlay);
  };
  var toFront = (overlay) => {
    zIndexManager.toFront(overlay);
  };
  var getOverlays = () => {
    return zIndexManager.getOverlays();
  };
  var getOverlayLayers = () => {
    return zIndexManager.getOverlayLayers();
  };

  // ../packages/components/lib/sub-overlay/managers/interaction-lock-manager.js
  var equal = (left, right) => {
    const length = left.length;
    if (length !== right.length) {
      return false;
    }
    for (let i7 = 0; i7 < length; i7 += 1) {
      if (left[i7] !== right[i7]) {
        return false;
      }
    }
    return true;
  };
  var ScrollLockManager = class {
    constructor() {
      this.scrollTop = 0;
      this.scrollLeft = 0;
      this.lockScroll = false;
      this.interactiveElements = [];
      this.pointerEventsMap = /* @__PURE__ */ new Map();
      this.scrollThrottler = new AnimationTaskRunner();
      this.onScroll = (event) => {
        const path = event.composedPath();
        if (this.lockScroll && !path.includes(this.interactiveElement)) {
          this.restoreScrollPosition();
        }
      };
      this.applyScrollLock = () => {
        this.scrollThrottler.cancel();
        this.lockScroll = true;
      };
      this.removeScrollLock = () => {
        this.scrollThrottler.schedule(() => {
          this.lockScroll = false;
        });
      };
      this.onWheelScroll = (event) => {
        if (this.shouldCancelWheel(event)) {
          event.preventDefault();
        }
      };
      this.onTouchScroll = (event) => {
        if (event.cancelable && this.shouldCancelTouch(event)) {
          event.preventDefault();
        }
      };
    }
    /**
     * Get a collection of interactive elements
     * @param overlay Overlay to check
     * @returns interactive elements
     */
    static getInteractiveElements(overlay) {
      if (!overlay) {
        return [];
      }
      const interactiveElements = [overlay];
      if (overlay.interactiveElements && overlay.interactiveElements.length) {
        return interactiveElements.concat(overlay.interactiveElements);
      }
      if (!overlay.lockPositionTarget && overlay.positionTarget instanceof HTMLElement) {
        interactiveElements.push(overlay.positionTarget);
      }
      return interactiveElements;
    }
    /**
     * The list of active overlays, which participate
     * in lock management
     */
    get overlays() {
      return getOverlays().filter((overlay) => !overlay.noInteractionLock);
    }
    /**
     * Lock the screen and make top most overlay
     * and its position target interactive
     * @returns {void}
     */
    applyLock() {
      const topOverlay = this.overlays[0];
      const oldInteractiveElements = this.interactiveElements;
      const newInteractiveElements = ScrollLockManager.getInteractiveElements(topOverlay);
      if (equal(oldInteractiveElements, newInteractiveElements)) {
        return;
      }
      if (!oldInteractiveElements.length && newInteractiveElements.length) {
        this.saveScrollPosition();
        this.lockEvents();
        this.applyLockBackdrop();
      } else if (oldInteractiveElements.length && !newInteractiveElements.length) {
        this.unlockEvents();
        this.removeLockBackdrop();
      }
      for (let i7 = 0; i7 < oldInteractiveElements.length; i7 += 1) {
        this.restorePointerEvents(oldInteractiveElements[i7]);
      }
      for (let i7 = 0; i7 < newInteractiveElements.length; i7 += 1) {
        this.setPointerEvents(newInteractiveElements[i7]);
      }
      this.interactiveElements = newInteractiveElements;
    }
    /**
     * Set pointer events style tag
     * @param el Element to unlock
     * @param [value=auto] Value of pointer events
     * @returns {void}
     */
    setPointerEvents(el, value = "auto") {
      if (el) {
        this.pointerEventsMap.set(el, el.style.pointerEvents);
        el.style.setProperty("pointer-events", value);
      }
    }
    /**
     * Restore pointer events style tag
     * @param el Element to restore
     * @returns {void}
     */
    restorePointerEvents(el) {
      if (el) {
        const pointerEvents = this.pointerEventsMap.get(el);
        this.pointerEventsMap.delete(el);
        if (pointerEvents) {
          el.style.setProperty("pointer-events", pointerEvents);
        } else {
          el.style.removeProperty("pointer-events");
        }
      }
    }
    /**
     * Get the top most interactive element
     * @returns element
     */
    get interactiveElement() {
      return this.interactiveElements[this.interactiveElements.length - 1];
    }
    /**
     * Memoize the scroll position of the outside scrolling element.
     * @returns {void}
     */
    saveScrollPosition() {
      if (document.scrollingElement) {
        this.scrollTop = document.scrollingElement.scrollTop;
        this.scrollLeft = document.scrollingElement.scrollLeft;
      } else {
        this.scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        this.scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
      }
    }
    /**
     * Resets the scroll position of the outside scrolling element.
     * @returns {void}
     */
    restoreScrollPosition() {
      if (document.scrollingElement) {
        document.scrollingElement.scrollTop = this.scrollTop;
        document.scrollingElement.scrollLeft = this.scrollLeft;
      } else {
        document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop;
        document.documentElement.scrollLeft = document.body.scrollLeft = this.scrollLeft;
      }
    }
    /**
     * Listen for scroll and wheel events, to apply the correct lock logic
     * @returns {void}
     */
    lockEvents() {
      const wheelEventConf = {
        capture: true,
        passive: false
      };
      document.addEventListener("wheel", this.onWheelScroll, wheelEventConf);
      document.addEventListener("touchstart", this.onTouchScroll, wheelEventConf);
      document.addEventListener("touchmove", this.onTouchScroll, wheelEventConf);
      document.addEventListener("touchend", this.onTouchScroll, wheelEventConf);
      const scrollEventConf = {
        capture: true,
        passive: true
        /* passive improves scrolling performance. See https://developers.google.com/web/tools/lighthouse/audits/passive-event-listeners how. This does not work in IE11 */
      };
      document.addEventListener("scroll", this.onScroll, scrollEventConf);
      document.addEventListener("mousedown", this.applyScrollLock, scrollEventConf);
      document.addEventListener("touchstart", this.applyScrollLock, scrollEventConf);
      document.addEventListener("keydown", this.applyScrollLock, scrollEventConf);
      document.addEventListener("mouseup", this.removeScrollLock, scrollEventConf);
      document.addEventListener("touchend", this.removeScrollLock, scrollEventConf);
      document.addEventListener("keyup", this.removeScrollLock, scrollEventConf);
    }
    /**
     * Remove scroll and wheel listeners
     * @returns {void}
     */
    unlockEvents() {
      const wheelEventConf = {
        capture: true,
        passive: false
      };
      document.removeEventListener("wheel", this.onWheelScroll, wheelEventConf);
      document.removeEventListener("touchstart", this.onTouchScroll, wheelEventConf);
      document.removeEventListener("touchmove", this.onTouchScroll, wheelEventConf);
      document.removeEventListener("touchend", this.onTouchScroll, wheelEventConf);
      const scrollEventConf = {
        capture: true,
        passive: true
      };
      document.removeEventListener("scroll", this.onScroll, scrollEventConf);
      document.removeEventListener("mousedown", this.applyScrollLock, scrollEventConf);
      document.removeEventListener("touchstart", this.applyScrollLock, scrollEventConf);
      document.removeEventListener("keydown", this.applyScrollLock, scrollEventConf);
      document.removeEventListener("mouseup", this.removeScrollLock, scrollEventConf);
      document.removeEventListener("touchend", this.removeScrollLock, scrollEventConf);
      document.removeEventListener("keyup", this.removeScrollLock, scrollEventConf);
    }
    /**
     * Add locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    applyLockBackdrop() {
      this.setPointerEvents(document.documentElement, "none");
    }
    /**
     * Remove locking backdrop and prevent pointer events on document
     * @returns {void}
     */
    removeLockBackdrop() {
      this.restorePointerEvents(document.documentElement);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Touch event
     * @return shouldCancelTouch True if the touch event should be cancelled
     */
    shouldCancelTouch(event) {
      const { targetTouches, type, target } = event;
      if (type === "touchend") {
        this.lastTouchPosition = void 0;
        return false;
      }
      if (type === "touchstart") {
        const touch2 = targetTouches[0];
        this.lastTouchPosition = {
          pageX: touch2.pageX,
          pageY: touch2.pageY,
          target
        };
        return false;
      }
      if (!this.lastTouchPosition) {
        return false;
      }
      const touch = targetTouches[0];
      const deltaX = this.lastTouchPosition.pageX - touch.pageX;
      const deltaY = this.lastTouchPosition.pageY - touch.pageY;
      return this.shouldCancelScroll(event, deltaY, deltaX);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @return shouldCancelWheel True if the scroll event should be cancelled
     */
    shouldCancelWheel(event) {
      const { deltaX, deltaY } = event;
      return this.shouldCancelScroll(event, deltaY, deltaX);
    }
    /**
     * Check if wheel event should be cancelled
     * @param event Wheel event
     * @param deltaY Scroll delta on Y axis
     * @param deltaX Scroll delta on X axis
     * @return shouldCancel True if the event should be cancelled
     */
    shouldCancelScroll(event, deltaY, deltaX) {
      const isVerticalScroll = Math.abs(deltaY) >= Math.abs(deltaX);
      const path = [...event.composedPath()];
      let idx = -1;
      const interactiveElements = [...this.interactiveElements];
      while (idx === -1 && interactiveElements.length) {
        idx = path.indexOf(interactiveElements.pop());
      }
      if (idx === -1) {
        return true;
      }
      const checkSlice = path.slice(0, idx + 1);
      const canScroll = isVerticalScroll ? (element) => {
        const style = window.getComputedStyle(element);
        if (style.overflowY === "scroll" || style.overflowY === "auto") {
          return deltaY < 0 ? element.scrollTop > 0 : element.scrollTop < element.scrollHeight - element.clientHeight;
        }
        return false;
      } : (element) => {
        const style = window.getComputedStyle(element);
        if (style.overflowX === "scroll" || style.overflowX === "auto") {
          return deltaX < 0 ? element.scrollLeft > 0 : element.scrollLeft < element.scrollWidth - element.clientWidth;
        }
        return false;
      };
      while (checkSlice.length) {
        const node = checkSlice.shift();
        if (node && node.nodeType !== Node.ELEMENT_NODE) {
          continue;
        }
        if (canScroll(node)) {
          return false;
        }
      }
      return true;
    }
  };
  var locker = new ScrollLockManager();
  var applyLock = () => {
    locker.applyLock();
  };

  // ../packages/components/lib/sub-overlay/elements/overlay-viewport.js
  var OverlayViewport_1;
  var OverlayViewport = OverlayViewport_1 = class OverlayViewport2 extends ResponsiveElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        display: block;
        position: fixed;
        visibility: hidden;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: -1;
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return OverlayViewport_1.Template;
    }
  };
  OverlayViewport.Template = y``;
  OverlayViewport = OverlayViewport_1 = __decorate([
    customElement("ui-overlay-viewport", {
      theme: false
    })
  ], OverlayViewport);

  // ../packages/components/lib/sub-overlay/managers/viewport-manager.js
  var viewAreaInfo = {
    viewHeight: 0,
    viewWidth: 0,
    offsetTop: 0,
    offsetLeft: 0,
    offsetBottom: 0,
    offsetRight: 0,
    viewOffsetTop: 0,
    viewOffsetLeft: 0
  };
  var ScrollEventOptions = { capture: true, passive: true };
  var ViewportManager = class {
    constructor() {
      this.registry = /* @__PURE__ */ new Map();
      this.viewRegistry = /* @__PURE__ */ new WeakMap();
      this.refitFrame = new AnimationTaskRunner();
      this.screenViewport = null;
      this.callRefit = () => {
        this.refitFrame.schedule(() => {
          this.registry.forEach((viewport, overlay) => {
            this.resetViewportSizing(viewport);
            overlay.fit();
          });
        });
      };
    }
    /**
     * Create overlay-viewport and insert it before the provided node
     * @param insertBefore A node to insert before
     * @returns created overlay-viewport
     */
    createViewport(insertBefore) {
      const viewport = document.createElement("ui-overlay-viewport");
      insertBefore?.parentNode?.insertBefore(viewport, insertBefore);
      return viewport;
    }
    /**
     * Remove overlay-viewport from DOM tree
     * @param viewport overlay-viewport to remove
     * @returns {void}
     */
    removeViewport(viewport) {
      viewport.parentNode?.removeChild(viewport);
    }
    /**
     * Set screen sizing viewport
     * @returns void
     */
    setScreenViewport() {
      if (!this.screenViewport) {
        this.screenViewport = this.createViewport(document.body);
      }
    }
    /**
     * Removes screen sizing viewport
     * @returns void
     */
    removeScreenViewport() {
      if (this.screenViewport) {
        this.removeViewport(this.screenViewport);
        this.screenViewport = null;
      }
    }
    /**
     * Reset sizing for viewport
     * @param viewport Viewport to reset sizing for
     * @returns {void}
     */
    resetViewportSizing(viewport) {
      if (!this.screenViewport) {
        return;
      }
      const screenRect = this.screenViewport.getBoundingClientRect();
      const zoom = parseFloat(window.getComputedStyle(document.body).zoom);
      const screenHeight = screenRect.height / zoom;
      const screenWidth = screenRect.width / zoom;
      const { top, left, bottom, right } = viewport.getBoundingClientRect();
      const offsetTop = top < 0 ? Math.abs(top) : 0;
      const offsetLeft = left < 0 ? Math.abs(left) : 0;
      const offsetBottom = bottom > screenHeight ? bottom - screenHeight : 0;
      const offsetRight = right > screenWidth ? right - screenWidth : 0;
      const viewHeight = viewport.offsetHeight - offsetTop - offsetBottom;
      const viewWidth = viewport.offsetWidth - offsetLeft - offsetRight;
      this.viewRegistry.set(viewport, {
        viewOffsetTop: top < 0 ? top + offsetTop : top,
        viewOffsetLeft: left < 0 ? left + offsetLeft : left,
        viewHeight: viewHeight < 0 ? 0 : viewHeight,
        viewWidth: viewWidth < 0 ? 0 : viewWidth,
        offsetTop,
        offsetLeft,
        offsetBottom,
        offsetRight
      });
    }
    getViewAreaInfo(overlay) {
      const viewport = this.registry.get(overlay);
      if (!viewport) {
        return viewAreaInfo;
      }
      if (!this.viewRegistry.has(viewport)) {
        this.resetViewportSizing(viewport);
      }
      return this.viewRegistry.get(viewport) || viewAreaInfo;
    }
    register(overlay) {
      if (!this.registry.size) {
        window.addEventListener("resize", this.callRefit);
        window.addEventListener("orientationchange", this.callRefit);
        window.addEventListener("scroll", this.callRefit, ScrollEventOptions);
        this.setScreenViewport();
      }
      if (!this.registry.has(overlay)) {
        const viewport = this.createViewport(overlay);
        this.registry.set(overlay, viewport);
        viewport.addEventListener("resize", () => overlay.fit());
      }
    }
    deregister(overlay) {
      if (this.registry.has(overlay)) {
        const viewport = this.registry.get(overlay);
        viewport && this.removeViewport(viewport);
        this.registry.delete(overlay);
      }
      if (!this.registry.size) {
        window.removeEventListener("resize", this.callRefit);
        window.removeEventListener("orientationchange", this.callRefit);
        window.removeEventListener("scroll", this.callRefit, ScrollEventOptions);
        this.removeScreenViewport();
      }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
      return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
      this.registry.forEach((viewport, overlay) => this.deregister(overlay));
    }
  };
  var viewportManager = new ViewportManager();
  var register6 = (overlay) => {
    viewportManager.register(overlay);
  };
  var deregister2 = (overlay) => {
    viewportManager.deregister(overlay);
  };
  var getViewAreaInfo = (overlay) => {
    return viewportManager.getViewAreaInfo(overlay);
  };

  // ../packages/components/lib/sub-overlay/elements/overlay-backdrop.js
  var OverlayBackdrop_1;
  var OverlayBackdrop = OverlayBackdrop_1 = class OverlayBackdrop2 extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        pointer-events: all;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--ds-container-background-color);
        opacity: 0.8;
        transition: opacity var(--ds-transition-500);
      }
    `;
    }
    /**
     * Set a specific z-index to override automatically calculated z-index
     * @param zIndex zIndex value
     */
    set zIndex(zIndex) {
      if (typeof zIndex === "number") {
        this.style.setProperty("z-index", `${zIndex}`);
      } else {
        this.style.removeProperty("z-index");
      }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return OverlayBackdrop_1.Template;
    }
  };
  OverlayBackdrop.Template = y``;
  __decorate([
    e4({ type: Number, attribute: false })
  ], OverlayBackdrop.prototype, "zIndex", null);
  OverlayBackdrop = OverlayBackdrop_1 = __decorate([
    customElement("ui-overlay-backdrop", { theme: false })
  ], OverlayBackdrop);

  // ../packages/components/lib/sub-overlay/managers/backdrop-manager.js
  var BackdropManager = class {
    constructor() {
      this.registry = /* @__PURE__ */ new Set();
      this.backdropElement = document.createElement("ui-overlay-backdrop");
      this.position = () => {
        const overlays = this.overlays;
        if (!overlays.length) {
          this.removeBackdropElement();
          return;
        }
        const { overlay, zIndex } = overlays[0];
        const backdropElement = this.backdropElement;
        if (!overlay.parentNode) {
          this.removeBackdropElement();
          return;
        }
        if (backdropElement.nextElementSibling === overlay) {
          return;
        }
        backdropElement.zIndex = zIndex;
        overlay.parentNode.insertBefore(backdropElement, overlay);
      };
    }
    get overlays() {
      return getOverlayLayers().filter(({ overlay }) => this.registry.has(overlay));
    }
    removeBackdropElement() {
      const backdropElement = this.backdropElement;
      if (backdropElement.parentNode) {
        backdropElement.parentNode.removeChild(backdropElement);
      }
    }
    register(overlay) {
      if (!this.registry.has(overlay)) {
        overlay.addEventListener("focus", this.position);
        this.registry.add(overlay);
      }
      this.position();
    }
    deregister(overlay) {
      if (this.registry.has(overlay)) {
        overlay.removeEventListener("focus", this.position);
        this.registry.delete(overlay);
        this.position();
      }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
      return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
      this.registry.forEach((overlay) => this.deregister(overlay));
    }
  };
  var backdropManager = new BackdropManager();
  var register7 = (overlay) => {
    backdropManager.register(overlay);
  };
  var deregister3 = (overlay) => {
    backdropManager.deregister(overlay);
  };

  // ../packages/components/lib/sub-overlay/managers/close-manager.js
  var CloseManager = class {
    constructor() {
      this.registry = /* @__PURE__ */ new Map();
      this.onKeyDown = ({ key }) => {
        switch (key) {
          case "Esc":
          case "Escape":
            this.onEscKey();
        }
      };
      this.onTapStart = (event) => {
        const topOverlay = this.getTopOverlay();
        if (!topOverlay) {
          return;
        }
        const { overlay, closeCallback } = topOverlay;
        const path = event.composedPath();
        const focusBoundary = overlay.focusBoundary || overlay;
        const isOutsideClick = !path.includes(focusBoundary);
        if (isOutsideClick && !overlay.noInteractionLock) {
          event.preventDefault();
        }
        if (isOutsideClick && !overlay.noCancelOnOutsideClick) {
          closeCallback();
        }
      };
    }
    get overlays() {
      return getOverlays().filter((overlay) => this.registry.has(overlay));
    }
    getTopOverlay() {
      const overlay = this.overlays[0];
      if (!overlay) {
        return null;
      }
      const closeCallback = this.registry.get(overlay);
      return {
        overlay,
        closeCallback
      };
    }
    onEscKey() {
      const topOverlay = this.getTopOverlay();
      if (!topOverlay) {
        return;
      }
      const { overlay, closeCallback } = topOverlay;
      if (overlay.noCancelOnEscKey) {
        return;
      }
      closeCallback();
    }
    register(overlay, closeCallback) {
      if (!this.registry.size) {
        const eventOptions = {
          capture: true,
          passive: true
        };
        document.addEventListener("keydown", this.onKeyDown, eventOptions);
        document.addEventListener("tapstart", this.onTapStart, true);
      }
      this.registry.set(overlay, closeCallback);
    }
    deregister(overlay) {
      this.registry.delete(overlay);
      if (!this.registry.size) {
        const eventOptions = {
          capture: true,
          passive: true
        };
        document.removeEventListener("keydown", this.onKeyDown, eventOptions);
        document.removeEventListener("tapstart", this.onTapStart, true);
      }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
      return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
      const registryArray = [...this.registry.keys()];
      for (let i7 = 0; i7 < registryArray.length; i7++) {
        this.deregister(registryArray[i7]);
      }
    }
  };
  var closeManager = new CloseManager();
  var register8 = (overlay, closeCallback) => {
    closeManager.register(overlay, closeCallback);
  };
  var deregister4 = (overlay) => {
    closeManager.deregister(overlay);
  };

  // ../packages/components/lib/sub-overlay/managers/focus-manager.js
  var FocusManager = class {
    constructor() {
      this.focusThrottler = new AnimationTaskRunner();
      this.registry = /* @__PURE__ */ new Set();
      this.restoreFocusElement = null;
      this.lastFocused = /* @__PURE__ */ new WeakMap();
      this.onDocumentKeyDown = (event) => {
        if (event.key === "Tab") {
          this.onTabKey(event);
          return;
        }
      };
      this.isRegisteredOverlay = (target) => this.overlays.includes(target);
      this.onOverlayFocus = (event) => {
        const overlay = event.composedPath().find(this.isRegisteredOverlay);
        if (overlay) {
          this.lastFocused.set(overlay, event.target);
        }
      };
    }
    get overlays() {
      return getOverlays().filter((overlay) => this.registry.has(overlay));
    }
    get focusBoundaryElements() {
      return getOverlays().map((overlay) => overlay.focusBoundary).filter((focusBoundary) => focusBoundary !== null);
    }
    getTabbableElements(overlay) {
      return overlay.focusBoundary ? FocusableHelper.getTabbableNodes(overlay.focusBoundary) : [];
    }
    getActiveTabbableNodes(reverse) {
      const sorted = this.overlays;
      const nodes = [];
      const tabbableMap = /* @__PURE__ */ new Map();
      for (let i7 = 0; i7 < sorted.length; i7 += 1) {
        const overlay = sorted[i7];
        const tabbable = this.getTabbableElements(overlay);
        tabbable.forEach((node) => tabbableMap.set(node, overlay));
        if (reverse) {
          nodes.push(...tabbable);
        } else {
          nodes.splice(0, 0, ...tabbable);
        }
        if (overlay.withBackdrop) {
          break;
        }
        if (document.activeElement === overlay && nodes.length) {
          break;
        }
      }
      if (reverse) {
        nodes.reverse();
      }
      return {
        nodes,
        tabbableMap
      };
    }
    onTabKey(event) {
      const { nodes, tabbableMap } = this.getActiveTabbableNodes(event.shiftKey);
      if (nodes.length === 0) {
        return;
      }
      if (nodes.length === 1) {
        event.preventDefault();
        nodes[0].focus();
        return;
      }
      const focusNode = this.getReTargetFocusNode(nodes);
      if (focusNode) {
        event.preventDefault();
        const overlay = tabbableMap.get(focusNode);
        const topOverlay = this.overlays[0];
        if (overlay && topOverlay && topOverlay !== overlay) {
          overlay.toFront();
        }
        focusNode.focus();
      }
    }
    getReTargetFocusNode(nodes) {
      let activeElement = this.getActiveElement();
      if (isBasicElement(activeElement) && activeElement.delegatesFocus) {
        activeElement = activeElement.tabbableElements[0] || activeElement;
      }
      if (!activeElement || activeElement === nodes[nodes.length - 1] || !this.isFocusBoundaryDescendant(activeElement)) {
        return nodes[0];
      }
      return null;
    }
    getShadowActiveElement(activeElement) {
      if (activeElement?.shadowRoot?.activeElement) {
        return this.getShadowActiveElement(activeElement.shadowRoot.activeElement);
      }
      return activeElement;
    }
    getActiveElement() {
      return this.getShadowActiveElement(document.activeElement);
    }
    isFocusBoundaryDescendant(element) {
      const focusBoundaryElements = this.focusBoundaryElements;
      let node = element.assignedSlot || element.parentNode;
      while (node) {
        if ((node instanceof HTMLElement || node instanceof ShadowRoot) && focusBoundaryElements.includes(node)) {
          return true;
        }
        node = node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? node.host : node.assignedSlot || node.parentNode;
      }
      return false;
    }
    register(overlay) {
      if (!this.registry.size) {
        this.restoreFocusElement = this.getActiveElement();
        document.addEventListener("keydown", this.onDocumentKeyDown, { capture: true });
      }
      if (!this.registry.has(overlay)) {
        this.registry.add(overlay);
        overlay.addEventListener("focus", this.onOverlayFocus, true);
        if (!overlay.noAutofocus) {
          this.focusThrottler.schedule(() => {
            overlay.opened && overlay.focus();
          });
        }
      }
    }
    deregister(overlay) {
      if (this.registry.has(overlay)) {
        overlay.removeEventListener("focus", this.onOverlayFocus, true);
        this.lastFocused.delete(overlay);
        this.registry.delete(overlay);
        if (!this.registry.size) {
          document.removeEventListener("keydown", this.onDocumentKeyDown, { capture: true });
          if (this.restoreFocusElement) {
            this.restoreFocusElement.focus();
          }
          this.restoreFocusElement = null;
        } else if (!overlay.noInteractionLock) {
          const topOverlay = this.overlays[0];
          if (topOverlay) {
            const focusNode = this.lastFocused.get(topOverlay) || this.getTabbableElements(topOverlay)[0] || topOverlay;
            this.focusThrottler.schedule(() => {
              if (!topOverlay.opened) {
                return;
              }
              const tabbableElements = this.getTabbableElements(topOverlay);
              const activeElement = this.getActiveElement();
              if (!activeElement || !tabbableElements.includes(activeElement)) {
                focusNode.focus();
              }
            });
          }
        }
      }
    }
    /**
     * @returns count of elements inside manager
     */
    size() {
      return this.registry.size;
    }
    /**
     * applies deregister for each element in registry
     * @returns {void}
     */
    clear() {
      this.registry.forEach((overlay) => this.deregister(overlay));
    }
  };
  var focusManager = new FocusManager();
  var register9 = (overlay) => {
    focusManager.register(overlay);
  };
  var deregister5 = (overlay) => {
    focusManager.deregister(overlay);
  };

  // ../packages/components/lib/sub-overlay/elements/sub-overlay.js
  var Overlay_1;
  var OpenedState;
  (function(OpenedState2) {
    OpenedState2[OpenedState2["CLOSED"] = 0] = "CLOSED";
    OpenedState2[OpenedState2["OPENING"] = 1] = "OPENING";
    OpenedState2[OpenedState2["OPENED"] = 2] = "OPENED";
    OpenedState2[OpenedState2["CLOSING"] = 3] = "CLOSING";
  })(OpenedState || (OpenedState = {}));
  var toggleAttribute = (overlay, name, value) => {
    if (!value) {
      overlay.removeAttribute(name);
    } else {
      overlay.setAttribute(name, typeof value === "string" ? value : "");
    }
  };
  var hasBooleanChanged = (newVal, oldVal) => newVal !== !!oldVal;
  var hasNumberChanged = (newVal, oldVal) => oldVal === void 0 ? false : newVal !== oldVal;
  var shouldUpdateProperties = ["withShadow", "transparent", "spacing", "transitionStyle", "fullScreen", "zIndex"];
  var shouldRefitProperties = ["position", "x", "y", "positionTarget", "horizontalOffset", "verticalOffset", "offset", "fullScreen", "noOverlap"];
  var Overlay = Overlay_1 = class Overlay2 extends ResponsiveElement {
    constructor() {
      super(...arguments);
      this.defaultTabIndex = -1;
      this._fullyOpened = OpenedState.CLOSED;
      this.opened = false;
      this.withShadow = false;
      this.transparent = false;
      this.spacing = false;
      this.horizontalOffset = 0;
      this.verticalOffset = 0;
      this.offset = 0;
      this.noCancelOnEscKey = false;
      this.noCancelOnOutsideClick = false;
      this.fullScreen = false;
      this.noOverlap = false;
      this.noInteractionLock = false;
      this.noFocusManagement = false;
      this.lockPositionTarget = false;
      this.interactiveElements = [];
      this.withBackdrop = false;
      this.noAutofocus = false;
      this.focusBoundary = this;
      this._firstResizeDone = false;
      this.calculated = {};
      this.redrawThrottler = new AnimationTaskRunner();
      this.onOpenedChangedAnimationEvent = () => {
        this.animationReady = false;
        this.animationReverse = this.opened;
        if (!this.opened) {
          this.onFullyClosed();
        } else {
          this.onFullyOpened();
        }
      };
      this.fitThrottler = new MicroTaskRunner();
      this.resizeHeight = 0;
      this.resizeWidth = 0;
      this.resizedThrottler = new MicroTaskRunner();
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        display: inline-block;
        box-sizing: border-box;
        position: fixed;
        touch-action: manipulation;
        outline: none;
        border: var(--ds-container-border);
        border-radius: var(--ds-container-border-radius);
        background-color: var(--ds-container-background-color);
      }

      :host(:not([opened]):not([animation-ready])) {
        display: none !important;
      }

      :host(:not([first-resize-done])) {
        pointer-events: none !important; /* needs for Mobile to prevent tap while overlay is not yet on the screen */
        opacity: 0;
      }

      :host(:not([animation-ready])) {
        animation: none  !important;
        transition: none !important;
        transform: none !important;
        top: 0;
        left: 0;
      }

      :host([transition-style]) {
        transition-timing-function: ease-out;
        animation-duration: var(--ds-transition-500);
      }

      :host([transition-style][animation-reverse]) {
        animation-direction: reverse;
      }

      @keyframes popup-scale {
        from { transform: scale(0, 0); }
        to { transform: scale(1, 1); }
      }

      @keyframes popup-scale-vertical {
        from { transform: scaleY(0); }
        to { transform: scaleY(1); }
      }

      @keyframes popup-scale-horizontal {
        from { transform: scaleX(0); }
        to { transform: scaleX(1); }
      }

      @keyframes popup-scale-fade {
        from { opacity: 0; }
        58% { opacity: 0.3; }
        to { opacity: 1; }
      }

      @keyframes popup-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      /* set origins */
      :host([transition-style="slide-down"]),
      :host([transition-style="slide"][animation-position="bottom"]) {
        transform-origin: center top;
      }
      :host([transition-style="slide-up"]),
      :host([transition-style="slide"][animation-position="top"]) {
        transform-origin: center bottom;
      }
      :host([transition-style="slide-left"]),
      :host([transition-style="slide"][animation-position="left"]) {
        transform-origin: right center;
      }
      :host([transition-style="slide-right"]),
      :host([transition-style="slide"][animation-position="right"]) {
        transform-origin: left center;
      }
      :host([transition-style="slide-right-down"]) {
        transform-origin: left top;
      }
      :host([transition-style="slide-right-up"]) {
        transform-origin: left bottom;
      }
      :host([transition-style="slide-left-down"]) {
        transform-origin: right top;
      }
      :host([transition-style="slide-left-up"]) {
        transform-origin: right bottom;
      }

      /* set animation names */
      :host([transition-style="slide-right-down"]),
      :host([transition-style="slide-right-up"]),
      :host([transition-style="slide-left-down"]),
      :host([transition-style="slide-left-up"]),
      :host([transition-style="zoom"]) {
        animation-name: popup-scale, popup-scale-fade;
      }
      :host([transition-style="fade"]) {
        animation-name: popup-fade;
      }
      :host([transition-style="slide-down"]),
      :host([transition-style="slide"][animation-position="bottom"]),
      :host([transition-style="slide-up"]),
      :host([transition-style="slide"][animation-position="top"]) {
        animation-name: popup-scale-vertical, popup-scale-fade;
      }
      :host([transition-style="slide-left"]),
      :host([transition-style="slide"][animation-position="left"]),
      :host([transition-style="slide-right"]),
      :host([transition-style="slide"][animation-position="right"]) {
        animation-name: popup-scale-horizontal, popup-scale-fade;
      }

      /* shadow comes from theme */
      :host([transparent]) {
        box-shadow: none !important;
        background: none !important;
        border-color: transparent !important;
      }

      :host([spacing]) {
        padding: var(--ds-container-padding);
      }

      :host([with-shadow]) {
        box-shadow: var(--ds-shadow-default);
      }
    `;
    }
    /**
     * Set position and align against the attach target.
     * Position may contain a single word or a comma separated list to set the priority.
     * Position is not applied if `positionTarget` is not an HTML Element.
     * For instance: `bottom-middle, top-middle` - default position is `bottom-middle`, if cannot fit then position would be `top-middle`;
     * or `left, right` - align is not set, set best position on the `left` or `right`
     *
     * Position can be: `top`, `right`, `bottom`, `left`, `center`
     * Align can be: `start`, `middle`, `end`
     *
     * @param value Position value
     */
    set position(value) {
      const oldPosition = this._position;
      if (oldPosition !== value) {
        this._positionStrategy = void 0;
        this._position = value;
        this.requestUpdate("position", oldPosition);
      }
    }
    get position() {
      return this._position;
    }
    /**
     * Get parsed position strategy or the default strategy if none provided
     * @returns positionStrategy as a list of tuples containing position and align
     */
    get positionStrategy() {
      if (this._positionStrategy) {
        return this._positionStrategy;
      }
      if (!this.position) {
        return void 0;
      }
      const positionList = [...this.position];
      const positionStrategy = this._positionStrategy = [];
      while (positionList.length) {
        const position = positionList.shift();
        if (!position) {
          continue;
        }
        const strategy = position.split("-");
        if (!strategy[1]) {
          const defaultAlign = DEFAULT_ALIGN.get(strategy[0]);
          if (!defaultAlign) {
            throw new Error(`ui-sub-overlay: incorrect position provided: ${strategy[0]}`);
          }
          strategy.push(defaultAlign);
        }
        positionStrategy.push(strategy);
      }
      return positionStrategy;
    }
    /**
     * Get position target configuration based on positionTarget and fullScreen properties
     * Used for caching and calculations
     */
    get positionTargetConfig() {
      const { viewHeight, viewWidth, viewOffsetTop, viewOffsetLeft } = this.viewAreaInfo;
      let left;
      let top;
      if (this.fullScreen) {
        return {
          rect: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: viewHeight,
            width: viewWidth
          },
          position: [["center", "middle"]]
        };
      }
      if (this.positionTarget instanceof HTMLElement) {
        const positionTargetElRect = this.positionTarget.getBoundingClientRect();
        return {
          rect: {
            top: positionTargetElRect.top - viewOffsetTop,
            right: positionTargetElRect.right - viewOffsetLeft,
            bottom: positionTargetElRect.bottom - viewOffsetTop,
            left: positionTargetElRect.left - viewOffsetLeft,
            width: positionTargetElRect.width,
            height: positionTargetElRect.height
          },
          position: [...this.positionStrategy || DEFAULT_TARGET_STRATEGY]
        };
      }
      const x2 = this.x || 0;
      const y2 = this.y || 0;
      let positionTarget = `${typeof this.x === "number" && this.x >= 0 ? "left" : "center"} ${typeof this.y === "number" && this.y >= 0 ? "top" : "center"}`;
      if (typeof this.positionTarget === "string") {
        positionTarget = this.positionTarget.trim() || positionTarget;
        const positionTargetList = positionTarget.split(" ").slice(0, 2);
        if (positionTargetList.length === 1) {
          positionTargetList.push("center");
        }
        positionTarget = positionTargetList.join(" ");
      }
      let defaultPosition;
      switch (positionTarget) {
        case "top left":
        case "left top":
          left = x2;
          top = y2;
          defaultPosition = ["bottom", "start"];
          break;
        case "top center":
        case "center top":
          left = viewWidth / 2 + x2;
          top = y2;
          defaultPosition = ["bottom", "middle"];
          break;
        case "top right":
        case "right top":
          left = viewWidth - x2;
          top = y2;
          defaultPosition = ["bottom", "end"];
          break;
        case "center left":
        case "left center":
          left = x2;
          top = viewHeight / 2 + y2;
          defaultPosition = ["right", "middle"];
          break;
        case "center right":
        case "right center":
          left = viewWidth - x2;
          top = viewHeight / 2 + y2;
          defaultPosition = ["left", "middle"];
          break;
        case "bottom left":
        case "left bottom":
          left = x2;
          top = viewHeight - y2;
          defaultPosition = ["top", "start"];
          break;
        case "bottom center":
        case "center bottom":
          left = viewWidth / 2 + x2;
          top = viewHeight - y2;
          defaultPosition = ["top", "middle"];
          break;
        case "bottom right":
        case "right bottom":
          left = viewWidth - x2;
          top = viewHeight - y2;
          defaultPosition = ["top", "end"];
          break;
        case "center center":
        default:
          left = viewWidth / 2 + x2;
          top = viewHeight / 2 + y2;
          defaultPosition = ["center", "middle"];
      }
      return {
        rect: {
          top,
          bottom: top,
          left,
          right: left,
          height: 0,
          width: 0
        },
        position: [...this.positionStrategy || [defaultPosition]]
      };
    }
    /**
     * A hook to reset transition and transform when the overlay is opened.
     * This removes the complexity of calculating specific "transformed"
     * coordinates for descendant elements
     * @param animationReady True to set attribute
     */
    set animationReady(animationReady) {
      toggleAttribute(this, "animation-ready", animationReady);
    }
    /**
     * Run the animation reverse order when closing
     * @param animationReverse True to set attribute
     */
    set animationReverse(animationReverse) {
      toggleAttribute(this, "animation-reverse", animationReverse);
    }
    /**
     * Used with dynamic `slide` animation to detect correct animation position
     * @param animationPosition Set animation position
     */
    set animationPosition(animationPosition) {
      toggleAttribute(this, "animation-position", animationPosition);
    }
    /**
     * Used to set attribute after the initial callback has been fired
     * A function is here to sort IE11 flickering problem
     * @param firstResizeDone True if the initial resize has happened
     */
    set firstResizeDone(firstResizeDone) {
      if (this._firstResizeDone !== firstResizeDone) {
        this._firstResizeDone = firstResizeDone;
        toggleAttribute(this, "first-resize-done", firstResizeDone);
      }
    }
    get firstResizeDone() {
      return this._firstResizeDone;
    }
    /**
     * All internal opened set events can be stoppable externally
     * Use this instead of setting opened directly
     * Protected method that can be used by managers or subclasses
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
      if (this.opened !== opened) {
        if (this.notifyPropertyChange("opened", opened, true)) {
          this.opened = opened;
        }
      }
    }
    disconnectedCallback() {
      this.removeMainRegisters();
      this.onFullyClosed();
      super.disconnectedCallback();
    }
    /**
     * Called when the element’s DOM has been updated and rendered
     * @param changedProperties Properties that has changed
     * @returns shouldUpdate
     */
    shouldUpdate(changedProperties) {
      const isOpened = this.opened;
      const isClosed = !this.opened;
      const opening = changedProperties.has("opened") && isOpened;
      const closing = changedProperties.has("opened") && isClosed;
      this.setRegisters(changedProperties);
      let shouldUpdate = opening || closing || !this.hasUpdated || changedProperties.size === 0;
      if (!shouldUpdate && isOpened) {
        if (shouldUpdateProperties.find((property) => changedProperties.has(property))) {
          shouldUpdate = true;
        }
      }
      if (opening || closing) {
        this.openedChange();
      } else if (this.opened) {
        if (shouldRefitProperties.find((property) => changedProperties.has(property))) {
          this.refit();
        }
      }
      return shouldUpdate;
    }
    /**
     * Run when opened attribute changes.
     * The function must be throttled in animation task to give time an element to be rendered
     * @returns {void}
     */
    openedChange() {
      if (!this.opened) {
        if (this._fullyOpened === OpenedState.OPENED) {
          this._fullyOpened = OpenedState.CLOSING;
        }
        this.removeMainRegisters();
        if (this.transitionStyle) {
          this.onOpenedChangedAnimation();
        } else {
          this.onFullyClosed();
        }
      }
      if (isEdge) {
        this.redrawThrottler.schedule(() => this.updateVariable("--redraw", `${Date.now()}`));
      }
      triggerResize2();
    }
    /**
     * This function sets obligatory registers
     * and sets/removes optional registers
     * based on the fact whether the overlay is opened or not
     * or whether the register attribute has changed
     * @param changedProperties Changed properties
     * @returns {void}
     */
    setRegisters(changedProperties) {
      const opened = this.opened;
      const opening = changedProperties.has("opened") && opened;
      if (opening) {
        register5(this);
        register6(this);
        register8(this, () => {
          this.setOpened(false);
        });
      }
      const enablingFocusManagement = opening && !this.noFocusManagement || opened && !!changedProperties.get("noFocusManagement");
      const disablingFocusManagement = opened && changedProperties.get("noFocusManagement") === false;
      if (enablingFocusManagement) {
        register9(this);
      } else if (disablingFocusManagement) {
        deregister5(this);
      }
      if (opening || changedProperties.has("noInteractionLock") || changedProperties.has("lockPositionTarget") || changedProperties.has("interactiveElements")) {
        applyLock();
      }
      const enablingBackdrop = opening && this.withBackdrop || opened && changedProperties.get("withBackdrop") === false;
      const disablingBackdrop = opened && !!changedProperties.get("withBackdrop");
      if (enablingBackdrop) {
        register7(this);
      } else if (disablingBackdrop) {
        deregister3(this);
      }
    }
    /**
     * This function is called in order to remove overlay from main registers
     * Registers must be removed in correct order, otherwise overlay might behave
     * unexpectedly. All other registers are removed inside onFullyClosed function
     * once animations are finished or on disconnectedCallback
     * @returns {void}
     */
    removeMainRegisters() {
      deregister(this);
      deregister2(this);
      deregister4(this);
      deregister5(this);
    }
    /**
     * Set and remove animation event listener
     * @returns {void}
     */
    onOpenedChangedAnimation() {
      this.animationPosition = this.calculated.position || "bottom";
      this.animationReverse = !this.opened;
      this.animationReady = true;
      this.removeEventListener("animationend", this.onOpenedChangedAnimationEvent);
      this.addEventListener("animationend", this.onOpenedChangedAnimationEvent, { once: true });
    }
    /**
     * A helper method to fire opening events
     * @returns {void}
     */
    onFullyOpened() {
      const fullyOpened = this._fullyOpened;
      this._fullyOpened = OpenedState.OPENED;
      if (fullyOpened === OpenedState.OPENING) {
        this.onOpened();
        this.dispatchEvent(new CustomEvent("opened"));
      }
    }
    /**
     * A helper method to deregister element from all listeners
     * once the overlay is fully closed
     * Note: some registries are remove immediately after close
     * @returns {void}
     */
    onFullyClosed() {
      this.firstResizeDone = false;
      applyLock();
      this.resetSizingInfo();
      this.clearCached();
      deregister3(this);
      const fullyOpened = this._fullyOpened;
      this._fullyOpened = OpenedState.CLOSED;
      if (fullyOpened === OpenedState.CLOSING) {
        this.onClosed();
        this.dispatchEvent(new CustomEvent("closed"));
      }
    }
    /**
     * Run when the overlay has opened, initial positioning is done,
     * managers are registered and opening transition has finished
     * @returns {void}
     */
    onOpened() {
    }
    /**
     * Run when the overlay has closed, managers are de-registered
     * and closing transition has finished
     * @returns {void}
     */
    onClosed() {
    }
    /**
     * A helper method to set or remove style property if the value is different
     * @param property Property name
     * @param value Property value
     * @returns {void}
     */
    setPropertyIf(property, value) {
      const cached = this.cachedProperties || {};
      this.cachedProperties = cached;
      if (cached[property] === value) {
        return;
      }
      cached[property] = value;
      if (value !== null) {
        this.style.setProperty(property, value);
      } else {
        this.style.removeProperty(property);
      }
    }
    /**
     * Cache height and width.
     * Calculating offsetHeight and offsetWidth is expensive,
     * therefore try to use cached version
     * @returns {void}
     */
    setResizeSizingInfo() {
      const { computed: { marginTop, marginRight, marginBottom, marginLeft } } = this.sizingInfo;
      const offsetHeight = this.offsetHeight;
      const offsetWidth = this.offsetWidth;
      this.resizeHeight = offsetHeight ? offsetHeight + valueOrZero(marginTop) + valueOrZero(marginBottom) : 0;
      this.resizeWidth = offsetWidth ? offsetWidth + valueOrZero(marginRight) + valueOrZero(marginLeft) : 0;
    }
    /**
     * Get overlay with and height information
     * Sizing is cached and may not reflect the current
     */
    get sizingRect() {
      return {
        width: this.resizeWidth,
        height: this.resizeHeight
      };
    }
    /**
     * A helper getter to get sizing information for the overlay
     * @returns {Object} sizingInfo
     */
    get sizingInfo() {
      const computeStyle = window.getComputedStyle(this);
      if (!this._sizingInfo) {
        const style = this.style;
        this._sizingInfo = {
          computed: {
            minWidth: valueOrNull(computeStyle.minWidth),
            maxWidth: valueOrNull(computeStyle.maxWidth),
            minHeight: valueOrNull(computeStyle.minHeight),
            maxHeight: valueOrNull(computeStyle.maxHeight),
            marginLeft: valueOrNull(computeStyle.marginLeft),
            marginRight: valueOrNull(computeStyle.marginRight),
            marginTop: valueOrNull(computeStyle.marginTop),
            marginBottom: valueOrNull(computeStyle.marginBottom)
          },
          style: {
            minWidth: style.getPropertyValue("min-width"),
            maxWidth: style.getPropertyValue("max-width"),
            minHeight: style.getPropertyValue("min-height"),
            maxHeight: style.getPropertyValue("max-height")
          }
        };
      }
      return this._sizingInfo;
    }
    /**
     * Reset current sizing info to original values
     * @returns {void}
     */
    resetSizingInfo() {
      if (this._sizingInfo) {
        const { style: { minWidth, maxWidth, minHeight, maxHeight } } = this.sizingInfo;
        this.setPropertyIf("min-width", minWidth);
        this.setPropertyIf("max-width", maxWidth);
        this.setPropertyIf("min-height", minHeight);
        this.setPropertyIf("max-height", maxHeight);
        this.setPropertyIf("top", null);
        this.setPropertyIf("left", null);
        this.setPropertyIf("right", null);
        this.setPropertyIf("bottom", null);
        this.setResizeSizingInfo();
      }
    }
    /**
     * Get information of view boundaries for the overlay
     */
    get viewAreaInfo() {
      return getViewAreaInfo(this);
    }
    /**
     * Enforce the overlay to fit the viewArea
     * @param [viewHeight=this._viewAreaInfo.viewHeight] Height to limit to
     * @param [viewWidth=this._viewAreaInfo.viewWidth] Width to limit to
     * @returns {void}
     */
    limitToViewArea(viewHeight, viewWidth) {
      if (!viewHeight || !viewWidth) {
        const viewAreaInfo2 = this.viewAreaInfo;
        viewHeight = viewHeight || viewAreaInfo2.viewHeight;
        viewWidth = viewWidth || viewAreaInfo2.viewWidth;
      }
      const viewAreaHeight = viewHeight;
      const viewAreaWidth = viewWidth;
      const computed = this.sizingInfo.computed;
      const maxWidth = viewAreaWidth - valueOrZero(computed.marginLeft) - valueOrZero(computed.marginRight);
      const maxHeight = viewAreaHeight - valueOrZero(computed.marginTop) - valueOrZero(computed.marginBottom);
      const limit = () => {
        const { width, height } = this.sizingRect;
        let secondRun = false;
        if (computed.minWidth && computed.minWidth > maxWidth) {
          this.setPropertyIf("min-width", `${maxWidth}px`);
          secondRun = true;
        }
        if (width > viewAreaWidth) {
          this.setPropertyIf("max-width", `${maxWidth}px`);
          secondRun = true;
        }
        if (computed.minHeight && computed.minHeight > maxHeight) {
          this.setPropertyIf("min-height", `${maxHeight}px`);
          secondRun = true;
        }
        if (height > viewAreaHeight) {
          this.setPropertyIf("max-height", `${maxHeight}px`);
          secondRun = true;
        }
        return secondRun;
      };
      if (limit()) {
        this.setResizeSizingInfo();
        limit();
        this.setResizeSizingInfo();
      }
    }
    /**
     * Set top, left, right, bottom to style tag taking into account offset.
     * If property is null or undefined, remove from style tag
     * @param style An object containing top, left, right and/or bottom
     * @returns {void}
     */
    setPositionStyle(style) {
      const { top, left, right, bottom } = style;
      const { offsetTop, offsetLeft, offsetBottom, offsetRight } = this.viewAreaInfo;
      const set = (property, value, offset = 0) => {
        this.setPropertyIf(property, typeof value === "number" ? `${value + offset}px` : "auto");
      };
      set("top", top, offsetTop);
      set("left", left, offsetLeft);
      set("right", right, offsetRight);
      set("bottom", bottom, offsetBottom);
    }
    /**
     * This function serves as a safeguard between resize observer and internal logic to prevent resize loop
     * fit setting. Never refits the overlay if previous sizes are the same as last fit size
     * @param clb Callback to run if cache has changed
     * @returns {void}
     */
    refitIfChanged(clb) {
      const getRefitString = () => {
        const positionTargetConfig = this.positionTargetConfig;
        const targetRect = positionTargetConfig.rect;
        const positionList = positionTargetConfig.position;
        const { viewHeight, viewWidth, offsetBottom, offsetTop, offsetRight, offsetLeft } = this.viewAreaInfo;
        return JSON.stringify({
          rect: {
            ...this.sizingRect
          },
          verticalOffset: this.verticalOffset,
          horizontalOffset: this.horizontalOffset,
          offset: this.offset,
          positionList,
          viewHeight,
          viewWidth,
          offsetBottom,
          offsetTop,
          offsetRight,
          offsetLeft,
          targetRect: {
            height: targetRect.height,
            width: targetRect.width,
            top: targetRect.top,
            bottom: targetRect.bottom,
            left: targetRect.left,
            right: targetRect.right
          }
        });
      };
      const { height, width } = this.sizingRect;
      if (this.refitString && this.refitString === getRefitString() || (!height || !width)) {
        return;
      }
      clb();
      this.setResizeSizingInfo();
      this.refitString = getRefitString();
    }
    /**
     * Immediately run fit method without throttling
     * Use carefully as calling this function multiple times has a performance impact
     * @returns {void}
     */
    fitNonThrottled() {
      this.refitIfChanged(() => {
        this.fitPositionTarget();
        this.dispatchEvent(new CustomEvent("refit"));
      });
    }
    /**
     * Fit based on the position target
     * @returns {void}
     */
    fitPositionTarget() {
      this.resetSizingInfo();
      if (this.fullScreen) {
        this.setPositionStyle({
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        });
        return;
      }
      const Position = 0;
      const Alignment = 1;
      const positionTargetConfig = this.positionTargetConfig;
      const targetRect = positionTargetConfig.rect;
      const positionList = positionTargetConfig.position;
      const horizontalOffset = this.horizontalOffset;
      const verticalOffset = this.verticalOffset;
      const positionHorizontalOffset = horizontalOffset + this.offset;
      const positionVerticalOffset = verticalOffset + this.offset;
      this.limitToViewArea();
      const { viewHeight, viewWidth } = this.viewAreaInfo;
      const { width, height } = this.sizingRect;
      const calculatedPositionList = [];
      const isOutsideView = targetRect.bottom < 0 || targetRect.top > viewHeight || targetRect.right < 0 || targetRect.left > viewWidth;
      const canAlignPosition = (isVertical2, align) => {
        if (isVertical2) {
          let left2;
          let right2;
          switch (align) {
            case "start":
              left2 = targetRect.left + horizontalOffset;
              break;
            case "end":
              left2 = targetRect.right - width - horizontalOffset;
              break;
            case "middle":
            default:
              left2 = targetRect.left + targetRect.width / 2 - width / 2 + horizontalOffset;
              break;
          }
          const canAlign2 = left2 >= 0 && left2 + width <= viewWidth;
          if (!canAlign2) {
            left2 = left2 < 0 ? 0 : void 0;
            right2 = left2 === void 0 ? 0 : void 0;
          }
          return {
            canAlign: canAlign2,
            left: left2,
            right: right2
          };
        }
        let top2;
        let bottom2;
        switch (align) {
          case "start":
            top2 = targetRect.top + verticalOffset;
            break;
          case "middle":
            top2 = targetRect.top + targetRect.height / 2 - height / 2 + verticalOffset;
            break;
          case "end":
          default:
            top2 = targetRect.bottom - height - verticalOffset;
            break;
        }
        const canAlign = top2 >= 0 && top2 + height <= viewHeight;
        if (!canAlign) {
          top2 = top2 < 0 ? 0 : void 0;
          bottom2 = top2 === void 0 ? 0 : void 0;
        }
        return {
          canAlign,
          top: top2,
          bottom: bottom2
        };
      };
      if (isOutsideView) {
        let position2;
        let top2;
        let bottom2;
        let right2;
        let left2;
        const findAlignMatch = (isVertical2, isBefore) => {
          const positionListLocal = [...positionList];
          while (positionListLocal.length) {
            const strategy = positionListLocal.shift();
            if (!strategy) {
              continue;
            }
            const position3 = strategy[Position];
            const align = strategy[Alignment];
            if (isVertical2 && isBefore && position3 === "bottom" || isVertical2 && !isBefore && position3 === "top" || !isVertical2 && isBefore && position3 === "right" || !isVertical2 && !isBefore && position3 === "left") {
              return align;
            }
          }
          return [...positionList][0][Alignment];
        };
        if (targetRect.bottom <= 0) {
          position2 = "bottom";
          top2 = 0;
        } else if (targetRect.top >= viewHeight) {
          position2 = "top";
          bottom2 = 0;
        }
        if (targetRect.right <= 0) {
          position2 = "right";
          left2 = 0;
        } else if (targetRect.left >= viewWidth) {
          position2 = "left";
          right2 = 0;
        }
        if (top2 === void 0 && bottom2 === void 0) {
          const align = findAlignMatch(false, targetRect.right <= 0);
          const alignPosition = canAlignPosition(false, align);
          top2 = alignPosition.top;
          bottom2 = alignPosition.bottom;
        }
        if (right2 === void 0 && left2 === void 0) {
          const align = findAlignMatch(true, targetRect.bottom <= 0);
          const alignPosition = canAlignPosition(true, align);
          left2 = alignPosition.left;
          right2 = alignPosition.right;
        }
        this.calculated.position = position2;
        this.setPositionStyle({
          top: top2,
          bottom: bottom2,
          left: left2,
          right: right2
        });
        return;
      }
      while (positionList.length) {
        const strategy = positionList.shift();
        if (!strategy) {
          continue;
        }
        const position2 = strategy[Position];
        const align = strategy[Alignment];
        const isVertical2 = position2 === "top" || position2 === "bottom" || position2 === "center";
        let canPosition = false;
        let top2;
        let left2;
        let right2;
        let bottom2;
        let area = -1;
        switch (position2) {
          case "bottom":
            top2 = targetRect.bottom + positionVerticalOffset;
            area = Math.min(viewWidth, width) * (viewHeight - targetRect.bottom);
            canPosition = top2 >= 0 && top2 + height <= viewHeight;
            break;
          case "top":
            bottom2 = viewHeight - targetRect.top + positionVerticalOffset;
            area = Math.min(viewWidth, width) * targetRect.top;
            canPosition = bottom2 >= 0 && bottom2 + height <= viewHeight;
            break;
          case "right":
            left2 = targetRect.right + positionHorizontalOffset;
            area = Math.min(viewHeight, height) * (viewWidth - targetRect.right);
            canPosition = left2 >= 0 && left2 + width <= viewWidth;
            break;
          case "left":
            right2 = viewWidth - targetRect.left + positionHorizontalOffset;
            area = Math.min(viewHeight, height) * targetRect.left;
            canPosition = right2 >= 0 && right2 + width <= viewWidth;
            break;
          case "center":
            top2 = targetRect.top + targetRect.height / 2 - height / 2 + positionVerticalOffset;
            bottom2 = top2 + height > viewHeight ? 0 : void 0;
            top2 = top2 < 0 ? 0 : bottom2 === void 0 ? top2 : void 0;
            canPosition = true;
            area = Infinity;
            break;
        }
        const alignPosition = canAlignPosition(isVertical2, align);
        const canAlign = alignPosition.canAlign;
        if (isVertical2) {
          left2 = alignPosition.left;
          right2 = alignPosition.right;
        } else {
          top2 = alignPosition.top;
          bottom2 = alignPosition.bottom;
        }
        if (canAlign && canPosition) {
          this.calculated.position = position2;
          this.setPositionStyle({
            top: top2,
            left: left2,
            bottom: bottom2,
            right: right2
          });
          return;
        }
        calculatedPositionList.push({
          position: position2,
          align,
          canPosition,
          canAlign,
          top: top2,
          left: left2,
          right: right2,
          bottom: bottom2,
          isVertical: isVertical2,
          area
        });
      }
      for (let i7 = 0; i7 < calculatedPositionList.length; i7 += 1) {
        const { canPosition, top: top2, left: left2, position: position2, right: right2, bottom: bottom2 } = calculatedPositionList[i7];
        if (canPosition) {
          this.calculated.position = position2;
          this.setPositionStyle({
            top: top2,
            left: left2,
            right: right2,
            bottom: bottom2
          });
          return;
        }
      }
      calculatedPositionList.sort((pos1, pos2) => pos2.area - pos1.area);
      if (this.noOverlap) {
        const { position: position2 } = calculatedPositionList[0];
        switch (position2) {
          case "bottom":
            this.limitToViewArea(viewHeight - targetRect.bottom - positionVerticalOffset);
            break;
          case "top":
            this.limitToViewArea(targetRect.top - positionVerticalOffset);
            break;
          case "right":
            this.limitToViewArea(void 0, viewWidth - targetRect.right - positionHorizontalOffset);
            break;
          case "left":
            this.limitToViewArea(void 0, targetRect.left - positionHorizontalOffset);
            break;
        }
      }
      const { isVertical, top, position, left, right, bottom } = calculatedPositionList[0];
      const getNewPosition = () => {
        if (isVertical) {
          return position === "bottom" ? {
            bottom: 0,
            top: null
          } : {
            bottom: null,
            top: 0
            /* position up-bottom */
          };
        }
        return position === "right" ? {
          right: 0,
          left: null
        } : {
          right: null,
          left: 0
          /* position left-right */
        };
      };
      this.calculated.position = position;
      this.setPositionStyle(Object.assign({
        top,
        left,
        right,
        bottom
      }, getNewPosition()));
    }
    /**
     * Clear all cached values.
     * Run when external changes occur to styles to re-calculate position.
     * @returns {void}
     */
    clearCached() {
      this.refitString = void 0;
      this._sizingInfo = void 0;
      this.cachedProperties = void 0;
    }
    /**
     * Fit the overlay panel
     * @returns {void}
     */
    fit() {
      this.fitThrottler.schedule(() => {
        if (!this.opened) {
          return;
        }
        this.fitNonThrottled();
      });
    }
    /**
     * Clear all cached values and fit the overlay.
     * Use this function if any of `maxWidth`, `maxHeight`, `minWidth`, `minHeight`, `height` or `width` changed
     * @returns {void}
     */
    refit() {
      this.resetSizingInfo();
      this.clearCached();
      if (this.opened) {
        this.fit();
      }
    }
    /**
     * Element resize callback
     * @param size dimension details
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resizedCallback(size2) {
      this.resizedThrottler.schedule(() => {
        if (!this.opened && this._fullyOpened === OpenedState.CLOSED) {
          return;
        }
        this.setResizeSizingInfo();
        this.fitNonThrottled();
        if (this.opened && this.firstResizeDone === false) {
          this.firstResizeDone = true;
          if (this._fullyOpened === OpenedState.CLOSED) {
            this._fullyOpened = OpenedState.OPENING;
          }
          if (this.transitionStyle) {
            this.onOpenedChangedAnimation();
          } else {
            this.onFullyOpened();
          }
        }
      });
    }
    /**
     * Move overlay to front of other overlays
     * @returns {void}
     */
    toFront() {
      toFront(this);
      applyLock();
    }
    /**
     * Returns true if the overlay is opened and animation is not running.
     * Returns false if overlay is closed and animation is not running
     * @readonly
     */
    get fullyOpened() {
      return this._fullyOpened === OpenedState.OPENED;
    }
    /**
     * Returns true if overlay is doing opening or closing transition
     * @readonly
     */
    get transitioning() {
      return this._fullyOpened === OpenedState.OPENING || this._fullyOpened === OpenedState.CLOSING;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return Overlay_1.Template;
    }
  };
  Overlay.Template = y`<slot></slot>`;
  __decorate([
    e4({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "opened", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, attribute: "with-shadow", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "withShadow", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "transparent", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "spacing", void 0);
  __decorate([
    e4({ type: String, reflect: true, attribute: "transition-style" })
  ], Overlay.prototype, "transitionStyle", void 0);
  __decorate([
    e4({ type: Number, attribute: "z-index" })
  ], Overlay.prototype, "zIndex", void 0);
  __decorate([
    e4({ type: Number, hasChanged: hasNumberChanged })
  ], Overlay.prototype, "x", void 0);
  __decorate([
    e4({ type: Number, hasChanged: hasNumberChanged })
  ], Overlay.prototype, "y", void 0);
  __decorate([
    e4({ attribute: "position-target" })
  ], Overlay.prototype, "positionTarget", void 0);
  __decorate([
    e4({ type: Number, attribute: "horizontal-offset", hasChanged: hasNumberChanged })
  ], Overlay.prototype, "horizontalOffset", void 0);
  __decorate([
    e4({ type: Number, attribute: "vertical-offset", hasChanged: hasNumberChanged })
  ], Overlay.prototype, "verticalOffset", void 0);
  __decorate([
    e4({ type: Number, hasChanged: hasNumberChanged })
  ], Overlay.prototype, "offset", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-cancel-on-esc-key", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noCancelOnEscKey", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-cancel-on-outside-click", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noCancelOnOutsideClick", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true, attribute: "full-screen", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "fullScreen", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-overlap", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noOverlap", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-interaction-lock", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noInteractionLock", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-focus-management", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noFocusManagement", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "lock-position-target", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "lockPositionTarget", void 0);
  __decorate([
    e4({
      type: Array,
      attribute: false,
      hasChanged: (newVal, oldVal) => {
        if (!oldVal || newVal.length !== oldVal.length) {
          return true;
        }
        return newVal.some((el) => !oldVal.includes(el));
      }
    })
  ], Overlay.prototype, "interactiveElements", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "with-backdrop", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "withBackdrop", void 0);
  __decorate([
    e4({ type: Boolean, attribute: "no-autofocus", hasChanged: hasBooleanChanged })
  ], Overlay.prototype, "noAutofocus", void 0);
  __decorate([
    e4({
      type: Array,
      hasChanged(newVal, oldVal) {
        return newVal && oldVal ? newVal.join("") === oldVal.join("") : newVal !== oldVal;
      },
      converter: {
        fromAttribute: (value) => {
          return value.toLocaleLowerCase().replace(/ /g, "").replace(/\|/g, ",").split(",");
        }
      }
    })
  ], Overlay.prototype, "position", null);
  Overlay = Overlay_1 = __decorate([
    customElement("ui-sub-overlay", { theme: false })
  ], Overlay);

  // ../packages/components/lib/sub-select/index.js
  var observerOptions = {
    subtree: true,
    childList: true,
    attributes: true,
    characterData: true,
    attributeFilter: [
      "label",
      "value",
      "selected",
      "disabled",
      "readonly"
    ]
  };
  var POPUP_POSITION = ["bottom-start", "top-start"];
  var Navigation;
  (function(Navigation2) {
    Navigation2["FIRST"] = "First";
    Navigation2["LAST"] = "Last";
    Navigation2["NEXT"] = "Next";
    Navigation2["PREVIOUS"] = "Previous";
  })(Navigation || (Navigation = {}));
  var SubSelect = class SubSelect2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.defaultRole = "button";
      this.popupDynamicStyles = {};
      this.lazyRendered = false;
      this.popupScrollTop = 0;
      this.observingMutations = false;
      this.resizeThrottler = new AnimationTaskRunner();
      this.opened = false;
      this.menuRef = e7();
      this.handleMutations = (mutations) => {
        const hasLightDomMutations = mutations.some((m2) => m2.target.getRootNode() !== this.shadowRoot);
        if (hasLightDomMutations) {
          this.requestUpdate();
        }
      };
      this.onPopupScroll = ({ target }) => {
        this.popupScrollTop = target.scrollTop;
      };
    }
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used
     * to style the host, slotted children
     * and the internal template of the element.
     * @return CSS template
     */
    static get styles() {
      return i`
      :host {
        outline: none;
        position: relative;
        user-select: none;
        display: inline-flex;
        box-sizing: border-box;
        vertical-align: middle;
        height: var(--ds-control-height);
        width: var(--ds-control-width);
        color: var(--ds-control-color);
        border: var(--ds-control-border);
        border-radius: var(--ds-control-border-radius);
        background-color: var(--ds-control-background-color);
        padding: 0px var(--ds-space-x-small);
      }
      :host(:focus) {
        border-color: var(--ds-control-focus-border-color);
      }
      :host(:not([readonly]):not([error]):not(:focus):hover) {
        color: var(--ds-control-hover-color);
        border-color: var(--ds-control-hover-border-color);
      }
      :host([disabled]) {
        color: var(--ds-control-disabled-color);
        border-color: var(--ds-control-disabled-border-color);
        background-color: var(--ds-control-disabled-background-color);
      }
      :host([readonly]:not(:focus)) {
        color: var(--ds-control-readonly-color);
        border-color: var(--ds-control-readonly-border-color);
        background-color: var(--ds-control-readonly-background-color);
      }
      [part=label],
      [part=placeholder] {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      [part=icon] {
        flex: none;
      }
      :host [part=list] {
        overflow-y: auto;
        max-width: var(--ui-select-list-max-width);
        max-height: var(--ui-select-list-max-height, 200px);
      }
      :host [part=list] ::slotted(:not(ui-option)) {
        display: none;
      }
      :host [part=sub-item] {
        padding: var(--ds-space-xxx-small) var(--ds-space-x-small);
      }
      #box {
        align-items: center;
        display: inline-flex;
        flex-flow: row nowrap;
        overflow: hidden;
        flex: 1 1 100%;
      }
      #text {
        position: relative;
        flex: 1 1 auto;
        height: 100%;
        display: flex;
        align-items: center;
        min-width: 0;
      }
      #trigger {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
      }
    `;
    }
    /**
     * Value of the element
     * @param value Element value
     * @default -
     */
    set value(value) {
      value = this.castValue(value);
      const oldValue = this.value;
      if (value !== oldValue) {
        this.stopObserveMutations();
        this.clearSelection();
        this.selectValue(value);
        this.requestUpdate("value", oldValue);
      }
    }
    get value() {
      return this.selectedSlotItems.map((item) => this.getItemValue(item))[0] || "";
    }
    /**
     * Called when connected to DOM
     * @returns {void}
     */
    connectedCallback() {
      super.connectedCallback();
      this.setAttribute("aria-haspopup", "listbox");
    }
    /**
     * Updates the element
     * @param changedProperties Properties that has changed
     * @returns {void}
     */
    update(changedProperties) {
      if (changedProperties.has("opened")) {
        if (this.opened) {
          this.opening();
        }
        this.setAttribute("aria-expanded", this.opened ? "true" : "false");
      }
      super.update(changedProperties);
    }
    /**
     * Called after the component is first rendered
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    firstUpdated(changedProperties) {
      super.firstUpdated(changedProperties);
      this.addEventListener("keydown", this.onKeyDown);
    }
    /**
     * Called when element finished updating
     * @param changedProperties Properties which have changed
     * @returns {void}
     */
    updated(changedProperties) {
      super.updated(changedProperties);
      void this.updateComplete.then(() => {
        this.observeMutations();
      });
    }
    get label() {
      return this.selectedSlotItems.map((item) => this.getItemLabel(item))[0];
    }
    /**
     * Run when popup is opening
     * Calculate CSS variables an computed width
     * @returns {void}
     */
    opening() {
      this.lazyRendered = true;
      this.restrictPopupWidth();
    }
    /**
     * Observe any changes to Light DOM
     * This observer is self contained and should
     * be garbage collected when there are no element references.
     * @returns {void}
     */
    observeMutations() {
      if (!this.observingMutations) {
        if (!this.mutationObserver) {
          this.mutationObserver = new MutationObserver(this.handleMutations);
        }
        this.mutationObserver.observe(this, observerOptions);
        this.observingMutations = true;
      }
    }
    /**
     * Stop observe any changes to Light DOM
     * There must not be any observation on any internal changes
     * as it may cause excessive re-rendering
     * @returns {void}
     */
    stopObserveMutations() {
      if (this.observingMutations && this.mutationObserver) {
        this.mutationObserver.disconnect();
        this.observingMutations = false;
      }
    }
    /**
     * Popup has to use max width if --ui-select-list-max-width specified
     * otherwise, popup should have same width as control or wider
     * @returns {void}
     */
    restrictPopupWidth() {
      if (this.offsetWidth === 0) {
        this.resizeThrottler.schedule(() => {
          if (this.offsetWidth) {
            this.restrictPopupWidth();
            this.requestUpdate();
          }
        });
        return;
      }
      const maxWidth = this.getComputedVariable("--ui-select-list-max-width", "none");
      let minWidth = this.offsetWidth;
      if (maxWidth !== "none") {
        if (parseInt(maxWidth, 10) < minWidth) {
          minWidth = 0;
        }
      }
      this.popupDynamicStyles.minWidth = `${minWidth}px`;
    }
    /**
     * Set opened state with event
     * @param opened True if opened
     * @returns {void}
     */
    setOpened(opened) {
      if (this.opened !== opened) {
        this.notifyPropertyChange("opened", opened);
        this.opened = opened;
      }
    }
    /**
     * Toggles the opened state of the list
     * @returns {void}
     */
    toggleOpened() {
      if (this.opened) {
        this.setOpened(false);
      } else {
        this.setOpened(true);
      }
    }
    /**
     * Scroll to first selected item
     * @returns {void}
     */
    scrollToSelected() {
      const selected = this.getSelectedElements()[0];
      if (selected) {
        selected.scrollIntoView({
          block: "nearest"
        });
      }
    }
    /**
     * Used to restore scroll position on each refit event
     * @returns {void}
     */
    onPopupRefit({ target }) {
      target.scrollTop = this.popupScrollTop;
    }
    /**
     * Run when popup closes externally via opened-changed event
     * Required to propagate the event
     * @param event opened-changed event
     * @returns {void}
     */
    onPopupOpenedChanged(event) {
      event.preventDefault();
      this.setOpened(event.detail.value);
    }
    /**
     * Run when popup gets opened
     * @returns {void}
     */
    onPopupOpened({ target }) {
      this.scrollToSelected();
      const selectedItem = this.getSelectedElements()[0];
      if (selectedItem) {
        selectedItem.selected = true;
        selectedItem.focus();
      }
      const eventOptions = {
        capture: true,
        passive: true
      };
      target?.addEventListener("scroll", this.onPopupScroll, eventOptions);
    }
    /**
     * Run when popup gets closed
     * @returns {void}
     */
    onPopupClosed({ target }) {
      target?.removeEventListener("scroll", this.onPopupScroll);
      this.popupScrollTop = 0;
    }
    /**
     * Run when tap event happens on render root
     * @param event tap event
     * @returns {void}
     */
    onPopupTap(event) {
      const item = this.findSelectableElement(event);
      if (item) {
        this.setValueAndNotify(this.getItemValue(item));
        this.setOpened(false);
      }
    }
    /**
     * Run mouse move event over the popup
     * @param event mouse move event
     * @returns {void}
     */
    onPopupMouseMove() {
      if (this.menuRef.value) {
        this.menuRef.value.focus();
      }
    }
    /**
     * Handles key input when popup is closed
     * @param event Key down event object
     * @returns {void}
     */
    onKeyDown(event) {
      switch (event.key) {
        case "Up":
        case "ArrowUp":
        case "Down":
        case "ArrowDown":
        case "Enter":
        case "Spacebar":
          this.setOpened(true);
          break;
        default:
          return;
      }
      event.preventDefault();
    }
    /**
     * Handles popup key input when popup is opened
     * @param event Key down event object
     * @returns {void}
     */
    onPopupKeyDown(event) {
      switch (event.key) {
        case "Spacebar":
        case "Enter":
          if (event.target instanceof Option) {
            event.target.click();
          }
          break;
        case "Up":
        case "ArrowUp":
          this.focusElement(Navigation.PREVIOUS);
          break;
        case "Down":
        case "ArrowDown":
          this.focusElement(Navigation.NEXT);
          break;
        case "Tab":
          this.focusElement(event.shiftKey ? Navigation.PREVIOUS : Navigation.NEXT);
          break;
        case "Home":
          this.focusElement(Navigation.FIRST);
          break;
        case "End":
          this.focusElement(Navigation.LAST);
          break;
      }
      event.preventDefault();
      event.stopPropagation();
    }
    /**
     * Focus and highlight element according to specified direction
     * @param direction previous, next, first or last focusable element
     * @returns {void}
     */
    focusElement(direction) {
      const selectableElements = this.getSelectableElements();
      if (selectableElements.length === 0) {
        return;
      }
      const index = selectableElements.findIndex((item) => item === document.activeElement);
      const firstElement = selectableElements[0];
      const lastElement = selectableElements[selectableElements.length - 1];
      let element;
      switch (direction) {
        case Navigation.PREVIOUS:
          element = index === -1 ? lastElement : selectableElements[index - 1];
          break;
        case Navigation.NEXT:
          element = index === -1 ? firstElement : selectableElements[index + 1];
          break;
        case Navigation.FIRST:
          element = firstElement;
          break;
        case Navigation.LAST:
          element = lastElement;
          break;
        default:
          break;
      }
      if (!element) {
        element = direction === Navigation.NEXT ? firstElement : lastElement;
      }
      if (element) {
        element.focus();
      }
    }
    /**
     * Check if element can be selected
     * @param element Element to check
     * @returns true if element can be selected
     */
    isSelectableElement(element) {
      return element instanceof Option && element.tabIndex >= 0 && !element.disabled && !element.readonly;
    }
    /**
     * Get a list of selectable HTML Elements
     * queryAssignedNodes decorator not work with lazy-rendered slots
     * @returns A list of selectable HTML elements
     */
    getSelectableElements() {
      const selectableElements = [];
      const addSelectableElements = (element) => {
        if (element instanceof HTMLElement && this.isSelectableElement(element)) {
          selectableElements.push(element);
        } else if (element instanceof HTMLSlotElement) {
          const assignedNodes = element.assignedNodes({ flatten: true });
          assignedNodes.forEach((node) => addSelectableElements(node));
        } else if (element.childNodes.length > 0) {
          element.childNodes.forEach((childNode) => addSelectableElements(childNode));
        }
      };
      this.childNodes.forEach((childNode) => addSelectableElements(childNode));
      return selectableElements;
    }
    /**
     * Find selectable element is the event composed path
     * @param event Event to check
     * @returns The first selectable element or undefined
     */
    findSelectableElement(event) {
      const path = event.composedPath();
      for (let i7 = 0; i7 < path.length; i7 += 1) {
        const element = path[i7];
        if (element === this) {
          return;
        }
        if (this.isSelectableElement(element)) {
          return element;
        }
      }
    }
    /**
     * Get a list of selected HTML elements
     * *Can be used only when select is opened*
     * @returns A list of selected elements
     */
    getSelectedElements() {
      return this.getSelectableElements().filter((item) => item.selected);
    }
    /**
     * Clears the current selected items
     * @returns {void}
     */
    clearSelection() {
      this.selectedSlotItems.forEach((item) => {
        item.selected = false;
      });
      this.requestUpdate();
    }
    /**
     * Mark item as selected
     * @param value Value to select
     * @returns true if corresponding item is found and item selected
     */
    selectValue(value) {
      return this.selectSlotItem(value);
    }
    /**
     * Mark slotted item as selected
     * @param value Option value, item label or item text content
     * @returns true if corresponding item is found and item selected
     */
    selectSlotItem(value) {
      const items = this.getSelectableElements();
      for (let i7 = 0; i7 < items.length; i7 += 1) {
        const item = items[i7];
        if (this.getItemValue(item) === value) {
          item.selected = true;
          return true;
        }
      }
      return false;
    }
    /**
     * Helper to return a value from an item
     * @param item select item
     * @returns value
     */
    getItemValue(item) {
      return item.value || (item.hasAttribute("value") ? "" : this.getItemLabel(item));
    }
    /**
     * Helper to return a label from an item
     * @param item select item
     * @returns value
     */
    getItemLabel(item) {
      return item.textContent || "";
    }
    /**
     * Retrieve the selected items
     * @returns Selected data item
     */
    get selectedSlotItems() {
      return this.getSelectedElements();
    }
    /**
     * Template for label
     */
    get labelTemplate() {
      return y`<div part="label">${this.label}</div>`;
    }
    /**
     * Edit template when select is not readonly or disabled
     */
    get editTemplate() {
      if (!this.readonly && !this.disabled) {
        return y`
        <div id="trigger" @tapstart="${this.toggleOpened}"></div>
        ${this.popupTemplate}
      `;
      }
    }
    /**
     * Get default slot template
     */
    get slottedContent() {
      return y`<slot></slot>`;
    }
    /**
    * Edit template when select is not readonly or disabled
    */
    get popupTemplate() {
      if (this.lazyRendered) {
        return y`<ui-sub-overlay
        ${n6(this.menuRef)}
        tabindex="-1"
        id="menu"
        part="list"
        role="listbox"
        style=${i6(this.popupDynamicStyles)}
        with-shadow
        lock-position-target
        .positionTarget=${this}
        .position=${POPUP_POSITION}
        ?opened=${this.opened}
        @tap=${this.onPopupTap}
        @mousemove=${this.onPopupMouseMove}
        @keydown=${this.onPopupKeyDown}
        @opened-changed="${this.onPopupOpenedChanged}"
        @opened="${this.onPopupOpened}"
        @refit=${this.onPopupRefit}
        @closed="${this.onPopupClosed}">${this.slottedContent}</ui-sub-overlay>`;
      }
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`
    <div id="box">
      <div id="text">
        ${this.labelTemplate}
      </div>
      <ui-sub-icon icon="down" part="icon"></ui-sub-icon>
    </div>
    ${this.editTemplate}`;
    }
  };
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], SubSelect.prototype, "opened", void 0);
  __decorate([
    e4({ type: String, attribute: false })
  ], SubSelect.prototype, "value", null);
  SubSelect = __decorate([
    customElement("ui-sub-select", { theme: false })
  ], SubSelect);

  // ../packages/components/lib/select/index.js
  var Select = class Select2 extends ControlElement {
    constructor() {
      super(...arguments);
      this.label = "";
      this.opened = false;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: flex;
        flex-direction: column;
        margin: var(--ds-space-x-small) 0;
      }
      :host [part=label] {
        margin: var(--ds-space-x-small) 0;
      }
    `;
    }
    /**
     * Value of the element
     * @param value Element value
     * @default -
     */
    set value(value) {
      const oldValue = this.value;
      if (oldValue !== value && this.subSelectElement) {
        this.subSelectElement.value = value;
      }
      this.requestUpdate("value", oldValue);
    }
    get value() {
      return this.subSelectElement ? this.subSelectElement.value : "";
    }
    handleValueChanged(event) {
      this.setValueAndNotify(event.detail.value);
    }
    handleOpenedChanged(event) {
      this.opened = event.detail.value;
      this.notifyPropertyChange("opened", this.opened);
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    get renderLabel() {
      return this.label ? y`<ui-sub-label id="label" part="label">${this.label}</ui-sub-label>` : b;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return Render template
     */
    render() {
      return y`
      ${this.renderLabel}
      <ui-sub-select
        part="select"
        aria-labelledby=${this.label ? "label" : null}
        .value=${this.value}
        ?opened=${this.opened} 
        @value-changed=${this.handleValueChanged}
        @open-changed=${this.handleOpenedChanged}
      >
        <slot></slot>
      </ui-sub-select>
    `;
    }
  };
  Select.shadowRootOptions = { ...ControlElement.shadowRootOptions, delegatesFocus: true };
  __decorate([
    i5("[part=select]")
  ], Select.prototype, "subSelectElement", void 0);
  __decorate([
    e4({ type: String })
  ], Select.prototype, "label", void 0);
  __decorate([
    e4({ type: Boolean, reflect: true })
  ], Select.prototype, "opened", void 0);
  __decorate([
    e4({ type: String, attribute: false })
  ], Select.prototype, "value", null);
  Select = __decorate([
    customElement("ui-select", { theme: false })
  ], Select);

  // ../packages/components/lib/sub-footer/index.js
  var SubFooter = class SubFooter2 extends BasicElement {
    /**
     * Element version number
     * @returns version number
     */
    static get version() {
      return VERSION;
    }
    /**
     * A `CSSResultGroup` that will be used to style the host,
     * slotted children and the internal template of the element.
     * @returns CSS template
     */
    static get styles() {
      return i`
      :host {
        display: flex;
        flex-flow: column nowrap;
        background-color: var(--ds-container-background-color);
        padding: var(--ds-container-padding);
        border: var(--ds-container-border);
        border-radius: var(--ds-container-border-radius);
      }
    `;
    }
    /**
     * A `TemplateResult` that will be used
     * to render the updated internal template.
     * @return {TemplateResult}  Render template
     */
    render() {
      return y`
      <slot></slot>
    `;
    }
  };
  SubFooter = __decorate([
    customElement("ui-sub-footer", { theme: false })
  ], SubFooter);
})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/property.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/state.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directive-helpers.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/ref.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/unsafe-svg.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/base.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/decorators/query.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/directives/style-map.js:
  (**
   * @license
   * Copyright 2018 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

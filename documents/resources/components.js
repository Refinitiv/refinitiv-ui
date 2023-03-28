"use strict";
(() => {
  // ../node_modules/tslib/tslib.es6.js
  function __decorate(decorators, target, key, desc) {
    var c4 = arguments.length, r5 = c4 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d3;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r5 = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i5 = decorators.length - 1; i5 >= 0; i5--)
        if (d3 = decorators[i5])
          r5 = (c4 < 3 ? d3(r5) : c4 > 3 ? d3(target, key, r5) : d3(target, key)) || r5;
    return c4 > 3 && r5 && Object.defineProperty(target, key, r5), r5;
  }

  // ../node_modules/@lit/reactive-element/css-tag.js
  var t = window;
  var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
  var s = Symbol();
  var n = /* @__PURE__ */ new WeakMap();
  var o = class {
    constructor(t6, e9, n7) {
      if (this._$cssResult$ = true, n7 !== s)
        throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
      this.cssText = t6, this.t = e9;
    }
    get styleSheet() {
      let t6 = this.o;
      const s6 = this.t;
      if (e && void 0 === t6) {
        const e9 = void 0 !== s6 && 1 === s6.length;
        e9 && (t6 = n.get(s6)), void 0 === t6 && ((this.o = t6 = new CSSStyleSheet()).replaceSync(this.cssText), e9 && n.set(s6, t6));
      }
      return t6;
    }
    toString() {
      return this.cssText;
    }
  };
  var r = (t6) => new o("string" == typeof t6 ? t6 : t6 + "", void 0, s);
  var i = (t6, ...e9) => {
    const n7 = 1 === t6.length ? t6[0] : e9.reduce((e10, s6, n8) => e10 + ((t7) => {
      if (true === t7._$cssResult$)
        return t7.cssText;
      if ("number" == typeof t7)
        return t7;
      throw Error("Value passed to 'css' function must be a 'css' function result: " + t7 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
    })(s6) + t6[n8 + 1], t6[0]);
    return new o(n7, t6, s);
  };
  var S = (s6, n7) => {
    e ? s6.adoptedStyleSheets = n7.map((t6) => t6 instanceof CSSStyleSheet ? t6 : t6.styleSheet) : n7.forEach((e9) => {
      const n8 = document.createElement("style"), o9 = t.litNonce;
      void 0 !== o9 && n8.setAttribute("nonce", o9), n8.textContent = e9.cssText, s6.appendChild(n8);
    });
  };
  var c = e ? (t6) => t6 : (t6) => t6 instanceof CSSStyleSheet ? ((t7) => {
    let e9 = "";
    for (const s6 of t7.cssRules)
      e9 += s6.cssText;
    return r(e9);
  })(t6) : t6;

  // ../node_modules/@lit/reactive-element/reactive-element.js
  var s2;
  var e2 = window;
  var r2 = e2.trustedTypes;
  var h = r2 ? r2.emptyScript : "";
  var o2 = e2.reactiveElementPolyfillSupport;
  var n2 = { toAttribute(t6, i5) {
    switch (i5) {
      case Boolean:
        t6 = t6 ? h : null;
        break;
      case Object:
      case Array:
        t6 = null == t6 ? t6 : JSON.stringify(t6);
    }
    return t6;
  }, fromAttribute(t6, i5) {
    let s6 = t6;
    switch (i5) {
      case Boolean:
        s6 = null !== t6;
        break;
      case Number:
        s6 = null === t6 ? null : Number(t6);
        break;
      case Object:
      case Array:
        try {
          s6 = JSON.parse(t6);
        } catch (t7) {
          s6 = null;
        }
    }
    return s6;
  } };
  var a = (t6, i5) => i5 !== t6 && (i5 == i5 || t6 == t6);
  var l = { attribute: true, type: String, converter: n2, reflect: false, hasChanged: a };
  var d = class extends HTMLElement {
    constructor() {
      super(), this._$Ei = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$El = null, this.u();
    }
    static addInitializer(t6) {
      var i5;
      this.finalize(), (null !== (i5 = this.h) && void 0 !== i5 ? i5 : this.h = []).push(t6);
    }
    static get observedAttributes() {
      this.finalize();
      const t6 = [];
      return this.elementProperties.forEach((i5, s6) => {
        const e9 = this._$Ep(s6, i5);
        void 0 !== e9 && (this._$Ev.set(e9, s6), t6.push(e9));
      }), t6;
    }
    static createProperty(t6, i5 = l) {
      if (i5.state && (i5.attribute = false), this.finalize(), this.elementProperties.set(t6, i5), !i5.noAccessor && !this.prototype.hasOwnProperty(t6)) {
        const s6 = "symbol" == typeof t6 ? Symbol() : "__" + t6, e9 = this.getPropertyDescriptor(t6, s6, i5);
        void 0 !== e9 && Object.defineProperty(this.prototype, t6, e9);
      }
    }
    static getPropertyDescriptor(t6, i5, s6) {
      return { get() {
        return this[i5];
      }, set(e9) {
        const r5 = this[t6];
        this[i5] = e9, this.requestUpdate(t6, r5, s6);
      }, configurable: true, enumerable: true };
    }
    static getPropertyOptions(t6) {
      return this.elementProperties.get(t6) || l;
    }
    static finalize() {
      if (this.hasOwnProperty("finalized"))
        return false;
      this.finalized = true;
      const t6 = Object.getPrototypeOf(this);
      if (t6.finalize(), void 0 !== t6.h && (this.h = [...t6.h]), this.elementProperties = new Map(t6.elementProperties), this._$Ev = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
        const t7 = this.properties, i5 = [...Object.getOwnPropertyNames(t7), ...Object.getOwnPropertySymbols(t7)];
        for (const s6 of i5)
          this.createProperty(s6, t7[s6]);
      }
      return this.elementStyles = this.finalizeStyles(this.styles), true;
    }
    static finalizeStyles(i5) {
      const s6 = [];
      if (Array.isArray(i5)) {
        const e9 = new Set(i5.flat(1 / 0).reverse());
        for (const i6 of e9)
          s6.unshift(c(i6));
      } else
        void 0 !== i5 && s6.push(c(i5));
      return s6;
    }
    static _$Ep(t6, i5) {
      const s6 = i5.attribute;
      return false === s6 ? void 0 : "string" == typeof s6 ? s6 : "string" == typeof t6 ? t6.toLowerCase() : void 0;
    }
    u() {
      var t6;
      this._$E_ = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$Eg(), this.requestUpdate(), null === (t6 = this.constructor.h) || void 0 === t6 || t6.forEach((t7) => t7(this));
    }
    addController(t6) {
      var i5, s6;
      (null !== (i5 = this._$ES) && void 0 !== i5 ? i5 : this._$ES = []).push(t6), void 0 !== this.renderRoot && this.isConnected && (null === (s6 = t6.hostConnected) || void 0 === s6 || s6.call(t6));
    }
    removeController(t6) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.splice(this._$ES.indexOf(t6) >>> 0, 1);
    }
    _$Eg() {
      this.constructor.elementProperties.forEach((t6, i5) => {
        this.hasOwnProperty(i5) && (this._$Ei.set(i5, this[i5]), delete this[i5]);
      });
    }
    createRenderRoot() {
      var t6;
      const s6 = null !== (t6 = this.shadowRoot) && void 0 !== t6 ? t6 : this.attachShadow(this.constructor.shadowRootOptions);
      return S(s6, this.constructor.elementStyles), s6;
    }
    connectedCallback() {
      var t6;
      void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
        var i5;
        return null === (i5 = t7.hostConnected) || void 0 === i5 ? void 0 : i5.call(t7);
      });
    }
    enableUpdating(t6) {
    }
    disconnectedCallback() {
      var t6;
      null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
        var i5;
        return null === (i5 = t7.hostDisconnected) || void 0 === i5 ? void 0 : i5.call(t7);
      });
    }
    attributeChangedCallback(t6, i5, s6) {
      this._$AK(t6, s6);
    }
    _$EO(t6, i5, s6 = l) {
      var e9;
      const r5 = this.constructor._$Ep(t6, s6);
      if (void 0 !== r5 && true === s6.reflect) {
        const h5 = (void 0 !== (null === (e9 = s6.converter) || void 0 === e9 ? void 0 : e9.toAttribute) ? s6.converter : n2).toAttribute(i5, s6.type);
        this._$El = t6, null == h5 ? this.removeAttribute(r5) : this.setAttribute(r5, h5), this._$El = null;
      }
    }
    _$AK(t6, i5) {
      var s6;
      const e9 = this.constructor, r5 = e9._$Ev.get(t6);
      if (void 0 !== r5 && this._$El !== r5) {
        const t7 = e9.getPropertyOptions(r5), h5 = "function" == typeof t7.converter ? { fromAttribute: t7.converter } : void 0 !== (null === (s6 = t7.converter) || void 0 === s6 ? void 0 : s6.fromAttribute) ? t7.converter : n2;
        this._$El = r5, this[r5] = h5.fromAttribute(i5, t7.type), this._$El = null;
      }
    }
    requestUpdate(t6, i5, s6) {
      let e9 = true;
      void 0 !== t6 && (((s6 = s6 || this.constructor.getPropertyOptions(t6)).hasChanged || a)(this[t6], i5) ? (this._$AL.has(t6) || this._$AL.set(t6, i5), true === s6.reflect && this._$El !== t6 && (void 0 === this._$EC && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t6, s6))) : e9 = false), !this.isUpdatePending && e9 && (this._$E_ = this._$Ej());
    }
    async _$Ej() {
      this.isUpdatePending = true;
      try {
        await this._$E_;
      } catch (t7) {
        Promise.reject(t7);
      }
      const t6 = this.scheduleUpdate();
      return null != t6 && await t6, !this.isUpdatePending;
    }
    scheduleUpdate() {
      return this.performUpdate();
    }
    performUpdate() {
      var t6;
      if (!this.isUpdatePending)
        return;
      this.hasUpdated, this._$Ei && (this._$Ei.forEach((t7, i6) => this[i6] = t7), this._$Ei = void 0);
      let i5 = false;
      const s6 = this._$AL;
      try {
        i5 = this.shouldUpdate(s6), i5 ? (this.willUpdate(s6), null === (t6 = this._$ES) || void 0 === t6 || t6.forEach((t7) => {
          var i6;
          return null === (i6 = t7.hostUpdate) || void 0 === i6 ? void 0 : i6.call(t7);
        }), this.update(s6)) : this._$Ek();
      } catch (t7) {
        throw i5 = false, this._$Ek(), t7;
      }
      i5 && this._$AE(s6);
    }
    willUpdate(t6) {
    }
    _$AE(t6) {
      var i5;
      null === (i5 = this._$ES) || void 0 === i5 || i5.forEach((t7) => {
        var i6;
        return null === (i6 = t7.hostUpdated) || void 0 === i6 ? void 0 : i6.call(t7);
      }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t6)), this.updated(t6);
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
    shouldUpdate(t6) {
      return true;
    }
    update(t6) {
      void 0 !== this._$EC && (this._$EC.forEach((t7, i5) => this._$EO(i5, this[i5], t7)), this._$EC = void 0), this._$Ek();
    }
    updated(t6) {
    }
    firstUpdated(t6) {
    }
  };
  d.finalized = true, d.elementProperties = /* @__PURE__ */ new Map(), d.elementStyles = [], d.shadowRootOptions = { mode: "open" }, null == o2 || o2({ ReactiveElement: d }), (null !== (s2 = e2.reactiveElementVersions) && void 0 !== s2 ? s2 : e2.reactiveElementVersions = []).push("1.6.1");

  // ../node_modules/lit-html/lit-html.js
  var t2;
  var i2 = window;
  var s3 = i2.trustedTypes;
  var e3 = s3 ? s3.createPolicy("lit-html", { createHTML: (t6) => t6 }) : void 0;
  var o3 = `lit$${(Math.random() + "").slice(9)}$`;
  var n3 = "?" + o3;
  var l2 = `<${n3}>`;
  var h2 = document;
  var r3 = (t6 = "") => h2.createComment(t6);
  var d2 = (t6) => null === t6 || "object" != typeof t6 && "function" != typeof t6;
  var u = Array.isArray;
  var c2 = (t6) => u(t6) || "function" == typeof (null == t6 ? void 0 : t6[Symbol.iterator]);
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
  var g = (t6) => (i5, ...s6) => ({ _$litType$: t6, strings: i5, values: s6 });
  var y = g(1);
  var w = g(2);
  var x = Symbol.for("lit-noChange");
  var b = Symbol.for("lit-nothing");
  var T = /* @__PURE__ */ new WeakMap();
  var A = h2.createTreeWalker(h2, 129, null, false);
  var E = (t6, i5) => {
    const s6 = t6.length - 1, n7 = [];
    let h5, r5 = 2 === i5 ? "<svg>" : "", d3 = v;
    for (let i6 = 0; i6 < s6; i6++) {
      const s7 = t6[i6];
      let e9, u3, c4 = -1, g2 = 0;
      for (; g2 < s7.length && (d3.lastIndex = g2, u3 = d3.exec(s7), null !== u3); )
        g2 = d3.lastIndex, d3 === v ? "!--" === u3[1] ? d3 = a2 : void 0 !== u3[1] ? d3 = f : void 0 !== u3[2] ? ($.test(u3[2]) && (h5 = RegExp("</" + u3[2], "g")), d3 = _) : void 0 !== u3[3] && (d3 = _) : d3 === _ ? ">" === u3[0] ? (d3 = null != h5 ? h5 : v, c4 = -1) : void 0 === u3[1] ? c4 = -2 : (c4 = d3.lastIndex - u3[2].length, e9 = u3[1], d3 = void 0 === u3[3] ? _ : '"' === u3[3] ? p : m) : d3 === p || d3 === m ? d3 = _ : d3 === a2 || d3 === f ? d3 = v : (d3 = _, h5 = void 0);
      const y2 = d3 === _ && t6[i6 + 1].startsWith("/>") ? " " : "";
      r5 += d3 === v ? s7 + l2 : c4 >= 0 ? (n7.push(e9), s7.slice(0, c4) + "$lit$" + s7.slice(c4) + o3 + y2) : s7 + o3 + (-2 === c4 ? (n7.push(void 0), i6) : y2);
    }
    const u2 = r5 + (t6[s6] || "<?>") + (2 === i5 ? "</svg>" : "");
    if (!Array.isArray(t6) || !t6.hasOwnProperty("raw"))
      throw Error("invalid template strings array");
    return [void 0 !== e3 ? e3.createHTML(u2) : u2, n7];
  };
  var C = class {
    constructor({ strings: t6, _$litType$: i5 }, e9) {
      let l6;
      this.parts = [];
      let h5 = 0, d3 = 0;
      const u2 = t6.length - 1, c4 = this.parts, [v2, a3] = E(t6, i5);
      if (this.el = C.createElement(v2, e9), A.currentNode = this.el.content, 2 === i5) {
        const t7 = this.el.content, i6 = t7.firstChild;
        i6.remove(), t7.append(...i6.childNodes);
      }
      for (; null !== (l6 = A.nextNode()) && c4.length < u2; ) {
        if (1 === l6.nodeType) {
          if (l6.hasAttributes()) {
            const t7 = [];
            for (const i6 of l6.getAttributeNames())
              if (i6.endsWith("$lit$") || i6.startsWith(o3)) {
                const s6 = a3[d3++];
                if (t7.push(i6), void 0 !== s6) {
                  const t8 = l6.getAttribute(s6.toLowerCase() + "$lit$").split(o3), i7 = /([.?@])?(.*)/.exec(s6);
                  c4.push({ type: 1, index: h5, name: i7[2], strings: t8, ctor: "." === i7[1] ? M : "?" === i7[1] ? k : "@" === i7[1] ? H : S2 });
                } else
                  c4.push({ type: 6, index: h5 });
              }
            for (const i6 of t7)
              l6.removeAttribute(i6);
          }
          if ($.test(l6.tagName)) {
            const t7 = l6.textContent.split(o3), i6 = t7.length - 1;
            if (i6 > 0) {
              l6.textContent = s3 ? s3.emptyScript : "";
              for (let s6 = 0; s6 < i6; s6++)
                l6.append(t7[s6], r3()), A.nextNode(), c4.push({ type: 2, index: ++h5 });
              l6.append(t7[i6], r3());
            }
          }
        } else if (8 === l6.nodeType)
          if (l6.data === n3)
            c4.push({ type: 2, index: h5 });
          else {
            let t7 = -1;
            for (; -1 !== (t7 = l6.data.indexOf(o3, t7 + 1)); )
              c4.push({ type: 7, index: h5 }), t7 += o3.length - 1;
          }
        h5++;
      }
    }
    static createElement(t6, i5) {
      const s6 = h2.createElement("template");
      return s6.innerHTML = t6, s6;
    }
  };
  function P(t6, i5, s6 = t6, e9) {
    var o9, n7, l6, h5;
    if (i5 === x)
      return i5;
    let r5 = void 0 !== e9 ? null === (o9 = s6._$Co) || void 0 === o9 ? void 0 : o9[e9] : s6._$Cl;
    const u2 = d2(i5) ? void 0 : i5._$litDirective$;
    return (null == r5 ? void 0 : r5.constructor) !== u2 && (null === (n7 = null == r5 ? void 0 : r5._$AO) || void 0 === n7 || n7.call(r5, false), void 0 === u2 ? r5 = void 0 : (r5 = new u2(t6), r5._$AT(t6, s6, e9)), void 0 !== e9 ? (null !== (l6 = (h5 = s6)._$Co) && void 0 !== l6 ? l6 : h5._$Co = [])[e9] = r5 : s6._$Cl = r5), void 0 !== r5 && (i5 = P(t6, r5._$AS(t6, i5.values), r5, e9)), i5;
  }
  var V = class {
    constructor(t6, i5) {
      this.u = [], this._$AN = void 0, this._$AD = t6, this._$AM = i5;
    }
    get parentNode() {
      return this._$AM.parentNode;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    v(t6) {
      var i5;
      const { el: { content: s6 }, parts: e9 } = this._$AD, o9 = (null !== (i5 = null == t6 ? void 0 : t6.creationScope) && void 0 !== i5 ? i5 : h2).importNode(s6, true);
      A.currentNode = o9;
      let n7 = A.nextNode(), l6 = 0, r5 = 0, d3 = e9[0];
      for (; void 0 !== d3; ) {
        if (l6 === d3.index) {
          let i6;
          2 === d3.type ? i6 = new N(n7, n7.nextSibling, this, t6) : 1 === d3.type ? i6 = new d3.ctor(n7, d3.name, d3.strings, this, t6) : 6 === d3.type && (i6 = new I(n7, this, t6)), this.u.push(i6), d3 = e9[++r5];
        }
        l6 !== (null == d3 ? void 0 : d3.index) && (n7 = A.nextNode(), l6++);
      }
      return o9;
    }
    p(t6) {
      let i5 = 0;
      for (const s6 of this.u)
        void 0 !== s6 && (void 0 !== s6.strings ? (s6._$AI(t6, s6, i5), i5 += s6.strings.length - 2) : s6._$AI(t6[i5])), i5++;
    }
  };
  var N = class {
    constructor(t6, i5, s6, e9) {
      var o9;
      this.type = 2, this._$AH = b, this._$AN = void 0, this._$AA = t6, this._$AB = i5, this._$AM = s6, this.options = e9, this._$Cm = null === (o9 = null == e9 ? void 0 : e9.isConnected) || void 0 === o9 || o9;
    }
    get _$AU() {
      var t6, i5;
      return null !== (i5 = null === (t6 = this._$AM) || void 0 === t6 ? void 0 : t6._$AU) && void 0 !== i5 ? i5 : this._$Cm;
    }
    get parentNode() {
      let t6 = this._$AA.parentNode;
      const i5 = this._$AM;
      return void 0 !== i5 && 11 === t6.nodeType && (t6 = i5.parentNode), t6;
    }
    get startNode() {
      return this._$AA;
    }
    get endNode() {
      return this._$AB;
    }
    _$AI(t6, i5 = this) {
      t6 = P(this, t6, i5), d2(t6) ? t6 === b || null == t6 || "" === t6 ? (this._$AH !== b && this._$AR(), this._$AH = b) : t6 !== this._$AH && t6 !== x && this.g(t6) : void 0 !== t6._$litType$ ? this.$(t6) : void 0 !== t6.nodeType ? this.T(t6) : c2(t6) ? this.k(t6) : this.g(t6);
    }
    O(t6, i5 = this._$AB) {
      return this._$AA.parentNode.insertBefore(t6, i5);
    }
    T(t6) {
      this._$AH !== t6 && (this._$AR(), this._$AH = this.O(t6));
    }
    g(t6) {
      this._$AH !== b && d2(this._$AH) ? this._$AA.nextSibling.data = t6 : this.T(h2.createTextNode(t6)), this._$AH = t6;
    }
    $(t6) {
      var i5;
      const { values: s6, _$litType$: e9 } = t6, o9 = "number" == typeof e9 ? this._$AC(t6) : (void 0 === e9.el && (e9.el = C.createElement(e9.h, this.options)), e9);
      if ((null === (i5 = this._$AH) || void 0 === i5 ? void 0 : i5._$AD) === o9)
        this._$AH.p(s6);
      else {
        const t7 = new V(o9, this), i6 = t7.v(this.options);
        t7.p(s6), this.T(i6), this._$AH = t7;
      }
    }
    _$AC(t6) {
      let i5 = T.get(t6.strings);
      return void 0 === i5 && T.set(t6.strings, i5 = new C(t6)), i5;
    }
    k(t6) {
      u(this._$AH) || (this._$AH = [], this._$AR());
      const i5 = this._$AH;
      let s6, e9 = 0;
      for (const o9 of t6)
        e9 === i5.length ? i5.push(s6 = new N(this.O(r3()), this.O(r3()), this, this.options)) : s6 = i5[e9], s6._$AI(o9), e9++;
      e9 < i5.length && (this._$AR(s6 && s6._$AB.nextSibling, e9), i5.length = e9);
    }
    _$AR(t6 = this._$AA.nextSibling, i5) {
      var s6;
      for (null === (s6 = this._$AP) || void 0 === s6 || s6.call(this, false, true, i5); t6 && t6 !== this._$AB; ) {
        const i6 = t6.nextSibling;
        t6.remove(), t6 = i6;
      }
    }
    setConnected(t6) {
      var i5;
      void 0 === this._$AM && (this._$Cm = t6, null === (i5 = this._$AP) || void 0 === i5 || i5.call(this, t6));
    }
  };
  var S2 = class {
    constructor(t6, i5, s6, e9, o9) {
      this.type = 1, this._$AH = b, this._$AN = void 0, this.element = t6, this.name = i5, this._$AM = e9, this.options = o9, s6.length > 2 || "" !== s6[0] || "" !== s6[1] ? (this._$AH = Array(s6.length - 1).fill(new String()), this.strings = s6) : this._$AH = b;
    }
    get tagName() {
      return this.element.tagName;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6, i5 = this, s6, e9) {
      const o9 = this.strings;
      let n7 = false;
      if (void 0 === o9)
        t6 = P(this, t6, i5, 0), n7 = !d2(t6) || t6 !== this._$AH && t6 !== x, n7 && (this._$AH = t6);
      else {
        const e10 = t6;
        let l6, h5;
        for (t6 = o9[0], l6 = 0; l6 < o9.length - 1; l6++)
          h5 = P(this, e10[s6 + l6], i5, l6), h5 === x && (h5 = this._$AH[l6]), n7 || (n7 = !d2(h5) || h5 !== this._$AH[l6]), h5 === b ? t6 = b : t6 !== b && (t6 += (null != h5 ? h5 : "") + o9[l6 + 1]), this._$AH[l6] = h5;
      }
      n7 && !e9 && this.j(t6);
    }
    j(t6) {
      t6 === b ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t6 ? t6 : "");
    }
  };
  var M = class extends S2 {
    constructor() {
      super(...arguments), this.type = 3;
    }
    j(t6) {
      this.element[this.name] = t6 === b ? void 0 : t6;
    }
  };
  var R = s3 ? s3.emptyScript : "";
  var k = class extends S2 {
    constructor() {
      super(...arguments), this.type = 4;
    }
    j(t6) {
      t6 && t6 !== b ? this.element.setAttribute(this.name, R) : this.element.removeAttribute(this.name);
    }
  };
  var H = class extends S2 {
    constructor(t6, i5, s6, e9, o9) {
      super(t6, i5, s6, e9, o9), this.type = 5;
    }
    _$AI(t6, i5 = this) {
      var s6;
      if ((t6 = null !== (s6 = P(this, t6, i5, 0)) && void 0 !== s6 ? s6 : b) === x)
        return;
      const e9 = this._$AH, o9 = t6 === b && e9 !== b || t6.capture !== e9.capture || t6.once !== e9.once || t6.passive !== e9.passive, n7 = t6 !== b && (e9 === b || o9);
      o9 && this.element.removeEventListener(this.name, this, e9), n7 && this.element.addEventListener(this.name, this, t6), this._$AH = t6;
    }
    handleEvent(t6) {
      var i5, s6;
      "function" == typeof this._$AH ? this._$AH.call(null !== (s6 = null === (i5 = this.options) || void 0 === i5 ? void 0 : i5.host) && void 0 !== s6 ? s6 : this.element, t6) : this._$AH.handleEvent(t6);
    }
  };
  var I = class {
    constructor(t6, i5, s6) {
      this.element = t6, this.type = 6, this._$AN = void 0, this._$AM = i5, this.options = s6;
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AI(t6) {
      P(this, t6);
    }
  };
  var L = { P: "$lit$", A: o3, M: n3, C: 1, L: E, R: V, D: c2, V: P, I: N, H: S2, N: k, U: H, B: M, F: I };
  var z = i2.litHtmlPolyfillSupport;
  null == z || z(C, N), (null !== (t2 = i2.litHtmlVersions) && void 0 !== t2 ? t2 : i2.litHtmlVersions = []).push("2.6.1");
  var Z = (t6, i5, s6) => {
    var e9, o9;
    const n7 = null !== (e9 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== e9 ? e9 : i5;
    let l6 = n7._$litPart$;
    if (void 0 === l6) {
      const t7 = null !== (o9 = null == s6 ? void 0 : s6.renderBefore) && void 0 !== o9 ? o9 : null;
      n7._$litPart$ = l6 = new N(i5.insertBefore(r3(), t7), t7, void 0, null != s6 ? s6 : {});
    }
    return l6._$AI(t6), l6;
  };

  // ../node_modules/lit-element/lit-element.js
  var l3;
  var o4;
  var s4 = class extends d {
    constructor() {
      super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
    }
    createRenderRoot() {
      var t6, e9;
      const i5 = super.createRenderRoot();
      return null !== (t6 = (e9 = this.renderOptions).renderBefore) && void 0 !== t6 || (e9.renderBefore = i5.firstChild), i5;
    }
    update(t6) {
      const i5 = this.render();
      this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t6), this._$Do = Z(i5, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
      var t6;
      super.connectedCallback(), null === (t6 = this._$Do) || void 0 === t6 || t6.setConnected(true);
    }
    disconnectedCallback() {
      var t6;
      super.disconnectedCallback(), null === (t6 = this._$Do) || void 0 === t6 || t6.setConnected(false);
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
  var i3 = (i5, e9) => "method" === e9.kind && e9.descriptor && !("value" in e9.descriptor) ? { ...e9, finisher(n7) {
    n7.createProperty(e9.key, i5);
  } } : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e9.key, initializer() {
    "function" == typeof e9.initializer && (this[e9.key] = e9.initializer.call(this));
  }, finisher(n7) {
    n7.createProperty(e9.key, i5);
  } };
  function e4(e9) {
    return (n7, t6) => void 0 !== t6 ? ((i5, e10, n8) => {
      e10.constructor.createProperty(n8, i5);
    })(e9, n7, t6) : i3(e9, n7);
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
      for (let i5 = path.length - 1; i5 >= 0; i5 -= 1) {
        const parent = path[i5];
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
      for (let i5 = 0; i5 < children.length; i5 += 1) {
        childrenNeedSort = this.collectTabbableNodes(children[i5], tabbableChildren, delegatedList) || childrenNeedSort;
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
      for (let i5 = 0; i5 < delegatedList.length; i5 += 1) {
        const { element, children } = delegatedList[i5];
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
    for (let i5 = 0; i5 < elementIds.length; i5 += 1) {
      const element = rootNode.getElementById(elementIds[i5]);
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
  function t3(t6) {
    return e4({ ...t6, state: true });
  }

  // ../node_modules/lit-html/directive.js
  var t4 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
  var e5 = (t6) => (...e9) => ({ _$litDirective$: t6, values: e9 });
  var i4 = class {
    constructor(t6) {
    }
    get _$AU() {
      return this._$AM._$AU;
    }
    _$AT(t6, e9, i5) {
      this._$Ct = t6, this._$AM = e9, this._$Ci = i5;
    }
    _$AS(t6, e9) {
      return this.update(t6, e9);
    }
    update(t6, e9) {
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
    const startsWith = key[0];
    if (startsWith === ".") {
      return MAP_TYPE.PROPERTY;
    }
    if (startsWith === "@") {
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
  var e6 = (o9) => void 0 === o9.strings;

  // ../node_modules/lit-html/async-directive.js
  var s5 = (i5, t6) => {
    var e9, o9;
    const r5 = i5._$AN;
    if (void 0 === r5)
      return false;
    for (const i6 of r5)
      null === (o9 = (e9 = i6)._$AO) || void 0 === o9 || o9.call(e9, t6, false), s5(i6, t6);
    return true;
  };
  var o5 = (i5) => {
    let t6, e9;
    do {
      if (void 0 === (t6 = i5._$AM))
        break;
      e9 = t6._$AN, e9.delete(i5), i5 = t6;
    } while (0 === (null == e9 ? void 0 : e9.size));
  };
  var r4 = (i5) => {
    for (let t6; t6 = i5._$AM; i5 = t6) {
      let e9 = t6._$AN;
      if (void 0 === e9)
        t6._$AN = e9 = /* @__PURE__ */ new Set();
      else if (e9.has(i5))
        break;
      e9.add(i5), l5(t6);
    }
  };
  function n5(i5) {
    void 0 !== this._$AN ? (o5(this), this._$AM = i5, r4(this)) : this._$AM = i5;
  }
  function h3(i5, t6 = false, e9 = 0) {
    const r5 = this._$AH, n7 = this._$AN;
    if (void 0 !== n7 && 0 !== n7.size)
      if (t6)
        if (Array.isArray(r5))
          for (let i6 = e9; i6 < r5.length; i6++)
            s5(r5[i6], false), o5(r5[i6]);
        else
          null != r5 && (s5(r5, false), o5(r5));
      else
        s5(this, i5);
  }
  var l5 = (i5) => {
    var t6, s6, o9, r5;
    i5.type == t4.CHILD && (null !== (t6 = (o9 = i5)._$AP) && void 0 !== t6 || (o9._$AP = h3), null !== (s6 = (r5 = i5)._$AQ) && void 0 !== s6 || (r5._$AQ = n5));
  };
  var c3 = class extends i4 {
    constructor() {
      super(...arguments), this._$AN = void 0;
    }
    _$AT(i5, t6, e9) {
      super._$AT(i5, t6, e9), r4(this), this.isConnected = i5._$AU;
    }
    _$AO(i5, t6 = true) {
      var e9, r5;
      i5 !== this.isConnected && (this.isConnected = i5, i5 ? null === (e9 = this.reconnected) || void 0 === e9 || e9.call(this) : null === (r5 = this.disconnected) || void 0 === r5 || r5.call(this)), t6 && (s5(this, i5), o5(this));
    }
    setValue(t6) {
      if (e6(this._$Ct))
        this._$Ct._$AI(t6, this);
      else {
        const i5 = [...this._$Ct._$AH];
        i5[this._$Ci] = t6, this._$Ct._$AI(i5, this, 0);
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
    render(t6) {
      return b;
    }
    update(t6, [s6]) {
      var e9;
      const o9 = s6 !== this.Y;
      return o9 && void 0 !== this.Y && this.rt(void 0), (o9 || this.lt !== this.ct) && (this.Y = s6, this.dt = null === (e9 = t6.options) || void 0 === e9 ? void 0 : e9.host, this.rt(this.ct = t6.element)), b;
    }
    rt(i5) {
      var t6;
      if ("function" == typeof this.Y) {
        const s6 = null !== (t6 = this.dt) && void 0 !== t6 ? t6 : globalThis;
        let e9 = h4.get(s6);
        void 0 === e9 && (e9 = /* @__PURE__ */ new WeakMap(), h4.set(s6, e9)), void 0 !== e9.get(this.Y) && this.Y.call(this.dt, void 0), e9.set(this.Y, i5), void 0 !== i5 && this.Y.call(this.dt, i5);
      } else
        this.Y.value = i5;
    }
    get lt() {
      var i5, t6, s6;
      return "function" == typeof this.Y ? null === (t6 = h4.get(null !== (i5 = this.dt) && void 0 !== i5 ? i5 : globalThis)) || void 0 === t6 ? void 0 : t6.get(this.Y) : null === (s6 = this.Y) || void 0 === s6 ? void 0 : s6.value;
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
      var _a2 = this, x2 = _a2.x, y2 = _a2.y, top = _a2.top, right = _a2.right, bottom = _a2.bottom, left = _a2.left, width = _a2.width, height = _a2.height;
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
      var _a2 = target.getBBox(), width = _a2.width, height = _a2.height;
      return !width && !height;
    }
    var _b = target, offsetWidth = _b.offsetWidth, offsetHeight = _b.offsetHeight;
    return !(offsetWidth || offsetHeight || target.getClientRects().length);
  };
  var isElement = function(obj) {
    var _a2;
    if (obj instanceof Element) {
      return true;
    }
    var scope = (_a2 = obj === null || obj === void 0 ? void 0 : obj.ownerDocument) === null || _a2 === void 0 ? void 0 : _a2.defaultView;
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
    var _a2 = calculateBoxSizes(target, forceRecalculation), borderBoxSize = _a2.borderBoxSize, contentBoxSize = _a2.contentBoxSize, devicePixelContentBoxSize = _a2.devicePixelContentBoxSize;
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
    for (var i5 = 0; i5 < observationTargets.length; i5 += 1) {
      if (observationTargets[i5].target === target) {
        return i5;
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
      for (let i5 = 0; i5 < mouseEventPath.length - 1; i5 += 1) {
        if (mouseEventPath[i5] === path[i5] && path[i5].nodeType === Node.ELEMENT_NODE) {
          const tapTarget2 = mouseEventPath[i5];
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

  // ../packages/components/lib/version.js
  var VERSION = "PUBLISH_VERSION";

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
    constructor(i5) {
      if (super(i5), this.it = b, i5.type !== t4.CHILD)
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
      for (let i5 = 0; i5 < keys.length; i5 += 1) {
        const item = this.retrieve(keys[i5]);
        if (item) {
          cache3.set(keys[i5], item);
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
*/

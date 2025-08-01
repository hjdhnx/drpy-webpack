var e, t = function() {
    return t = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }
        ,
        t.apply(this, arguments)
}, n = {
    xml: !1,
    decodeEntities: !0
}, r = {
    _useHtmlParser2: !0,
    xmlMode: !0
};
function i(e) {
    return (null == e ? void 0 : e.xml) ? "boolean" == typeof e.xml ? r : t(t({}, r), e.xml) : null != e ? e : void 0
}
!function(e) {
    e.Root = "root",
        e.Text = "text",
        e.Directive = "directive",
        e.Comment = "comment",
        e.Script = "script",
        e.Style = "style",
        e.Tag = "tag",
        e.CDATA = "cdata",
        e.Doctype = "doctype"
}(e || (e = {}));
const s = e.Root
    , a = e.Text
    , o = e.Directive
    , c = e.Comment
    , l = e.Script
    , h = e.Style
    , u = e.Tag
    , p = e.CDATA
    , f = e.Doctype;
class d {
    constructor() {
        this.parent = null,
            this.prev = null,
            this.next = null,
            this.startIndex = null,
            this.endIndex = null
    }
    get parentNode() {
        return this.parent
    }
    set parentNode(e) {
        this.parent = e
    }
    get previousSibling() {
        return this.prev
    }
    set previousSibling(e) {
        this.prev = e
    }
    get nextSibling() {
        return this.next
    }
    set nextSibling(e) {
        this.next = e
    }
    cloneNode(e=!1) {
        return v(this, e)
    }
}
class E extends d {
    constructor(e) {
        super(),
            this.data = e
    }
    get nodeValue() {
        return this.data
    }
    set nodeValue(e) {
        this.data = e
    }
}
class m extends E {
    constructor() {
        super(...arguments),
            this.type = e.Text
    }
    get nodeType() {
        return 3
    }
}
class T extends E {
    constructor() {
        super(...arguments),
            this.type = e.Comment
    }
    get nodeType() {
        return 8
    }
}
class _ extends E {
    constructor(t, n) {
        super(n),
            this.name = t,
            this.type = e.Directive
    }
    get nodeType() {
        return 1
    }
}
class A extends d {
    constructor(e) {
        super(),
            this.children = e
    }
    get firstChild() {
        var e;
        return null !== (e = this.children[0]) && void 0 !== e ? e : null
    }
    get lastChild() {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null
    }
    get childNodes() {
        return this.children
    }
    set childNodes(e) {
        this.children = e
    }
}
class g extends A {
    constructor() {
        super(...arguments),
            this.type = e.CDATA
    }
    get nodeType() {
        return 4
    }
}
class N extends A {
    constructor() {
        super(...arguments),
            this.type = e.Root
    }
    get nodeType() {
        return 9
    }
}
class C extends A {
    constructor(t, n, r=[], i=("script" === t ? e.Script : "style" === t ? e.Style : e.Tag)) {
        super(r),
            this.name = t,
            this.attribs = n,
            this.type = i
    }
    get nodeType() {
        return 1
    }
    get tagName() {
        return this.name
    }
    set tagName(e) {
        this.name = e
    }
    get attributes() {
        return Object.keys(this.attribs).map((e => {
                var t, n;
                return {
                    name: e,
                    value: this.attribs[e],
                    namespace: null === (t = this["x-attribsNamespace"]) || void 0 === t ? void 0 : t[e],
                    prefix: null === (n = this["x-attribsPrefix"]) || void 0 === n ? void 0 : n[e]
                }
            }
        ))
    }
}
function I(t) {
    return (n = t).type === e.Tag || n.type === e.Script || n.type === e.Style;
    var n
}
function S(t) {
    return t.type === e.CDATA
}
function b(t) {
    return t.type === e.Text
}
function O(t) {
    return t.type === e.Comment
}
function y(t) {
    return t.type === e.Directive
}
function L(t) {
    return t.type === e.Root
}
function k(e) {
    return Object.prototype.hasOwnProperty.call(e, "children")
}
function v(e, t=!1) {
    let n;
    if (b(e))
        n = new m(e.data);
    else if (O(e))
        n = new T(e.data);
    else if (I(e)) {
        const r = t ? D(e.children) : []
            , i = new C(e.name,{
            ...e.attribs
        },r);
        r.forEach((e => e.parent = i)),
        null != e.namespace && (i.namespace = e.namespace),
        e["x-attribsNamespace"] && (i["x-attribsNamespace"] = {
            ...e["x-attribsNamespace"]
        }),
        e["x-attribsPrefix"] && (i["x-attribsPrefix"] = {
            ...e["x-attribsPrefix"]
        }),
            n = i
    } else if (S(e)) {
        const r = t ? D(e.children) : []
            , i = new g(r);
        r.forEach((e => e.parent = i)),
            n = i
    } else if (L(e)) {
        const r = t ? D(e.children) : []
            , i = new N(r);
        r.forEach((e => e.parent = i)),
        e["x-mode"] && (i["x-mode"] = e["x-mode"]),
            n = i
    } else {
        if (!y(e))
            throw new Error(`Not implemented yet: ${e.type}`);
        {
            const t = new _(e.name,e.data);
            null != e["x-name"] && (t["x-name"] = e["x-name"],
                t["x-publicId"] = e["x-publicId"],
                t["x-systemId"] = e["x-systemId"]),
                n = t
        }
    }
    return n.startIndex = e.startIndex,
        n.endIndex = e.endIndex,
    null != e.sourceCodeLocation && (n.sourceCodeLocation = e.sourceCodeLocation),
        n
}
function D(e) {
    const t = e.map((e => v(e, !0)));
    for (let e = 1; e < t.length; e++)
        t[e].prev = t[e - 1],
            t[e - 1].next = t[e];
    return t
}
const R = {
    withStartIndices: !1,
    withEndIndices: !1,
    xmlMode: !1
};
class M {
    constructor(e, t, n) {
        this.dom = [],
            this.root = new N(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null,
        "function" == typeof t && (n = t,
            t = R),
        "object" == typeof e && (t = e,
            e = void 0),
            this.callback = null != e ? e : null,
            this.options = null != t ? t : R,
            this.elementCB = null != n ? n : null
    }
    onparserinit(e) {
        this.parser = e
    }
    onreset() {
        this.dom = [],
            this.root = new N(this.dom),
            this.done = !1,
            this.tagStack = [this.root],
            this.lastNode = null,
            this.parser = null
    }
    onend() {
        this.done || (this.done = !0,
            this.parser = null,
            this.handleCallback(null))
    }
    onerror(e) {
        this.handleCallback(e)
    }
    onclosetag() {
        this.lastNode = null;
        const e = this.tagStack.pop();
        this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
        this.elementCB && this.elementCB(e)
    }
    onopentag(t, n) {
        const r = this.options.xmlMode ? e.Tag : void 0
            , i = new C(t,n,void 0,r);
        this.addNode(i),
            this.tagStack.push(i)
    }
    ontext(t) {
        const {lastNode: n} = this;
        if (n && n.type === e.Text)
            n.data += t,
            this.options.withEndIndices && (n.endIndex = this.parser.endIndex);
        else {
            const e = new m(t);
            this.addNode(e),
                this.lastNode = e
        }
    }
    oncomment(t) {
        if (this.lastNode && this.lastNode.type === e.Comment)
            return void (this.lastNode.data += t);
        const n = new T(t);
        this.addNode(n),
            this.lastNode = n
    }
    oncommentend() {
        this.lastNode = null
    }
    oncdatastart() {
        const e = new m("")
            , t = new g([e]);
        this.addNode(t),
            e.parent = t,
            this.lastNode = e
    }
    oncdataend() {
        this.lastNode = null
    }
    onprocessinginstruction(e, t) {
        const n = new _(e,t);
        this.addNode(n)
    }
    handleCallback(e) {
        if ("function" == typeof this.callback)
            this.callback(e, this.dom);
        else if (e)
            throw e
    }
    addNode(e) {
        const t = this.tagStack[this.tagStack.length - 1]
            , n = t.children[t.children.length - 1];
        this.options.withStartIndices && (e.startIndex = this.parser.startIndex),
        this.options.withEndIndices && (e.endIndex = this.parser.endIndex),
            t.children.push(e),
        n && (e.prev = n,
            n.next = e),
            e.parent = t,
            this.lastNode = null
    }
}
const P = /["&'<>$\x80-\uFFFF]/g
    , x = new Map([[34, "&quot;"], [38, "&amp;"], [39, "&apos;"], [60, "&lt;"], [62, "&gt;"]])
    , w = null != String.prototype.codePointAt ? (e, t) => e.codePointAt(t) : (e, t) => 55296 == (64512 & e.charCodeAt(t)) ? 1024 * (e.charCodeAt(t) - 55296) + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t);
function B(e) {
    let t, n = "", r = 0;
    for (; null !== (t = P.exec(e)); ) {
        const i = t.index
            , s = e.charCodeAt(i)
            , a = x.get(s);
        void 0 !== a ? (n += e.substring(r, i) + a,
            r = i + 1) : (n += `${e.substring(r, i)}&#x${w(e, i).toString(16)};`,
            r = P.lastIndex += Number(55296 == (64512 & s)))
    }
    return n + e.substr(r)
}
function F(e, t) {
    return function(n) {
        let r, i = 0, s = "";
        for (; r = e.exec(n); )
            i !== r.index && (s += n.substring(i, r.index)),
                s += t.get(r[0].charCodeAt(0)),
                i = r.index + 1;
        return s + n.substring(i)
    }
}
const U = F(/["&\u00A0]/g, new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]]))
    , H = F(/[&<>\u00A0]/g, new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]))
    , G = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((e => [e.toLowerCase(), e])))
    , Y = new Map(["definitionURL", "attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((e => [e.toLowerCase(), e])))
    , q = new Set(["style", "script", "xmp", "iframe", "noembed", "noframes", "plaintext", "noscript"]);
function K(e) {
    return e.replace(/"/g, "&quot;")
}
const j = new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"]);
function V(e, t={}) {
    const n = "length"in e ? e : [e];
    let r = "";
    for (let e = 0; e < n.length; e++)
        r += W(n[e], t);
    return r
}
function W(e, t) {
    switch (e.type) {
        case s:
            return V(e.children, t);
        case f:
        case o:
            return `<${e.data}>`;
        case c:
            return function(e) {
                return `\x3c!--${e.data}--\x3e`
            }(e);
        case p:
            return function(e) {
                return `<![CDATA[${e.children[0].data}]]>`
            }(e);
        case l:
        case h:
        case u:
            return function(e, t) {
                var n;
                "foreign" === t.xmlMode && (e.name = null !== (n = G.get(e.name)) && void 0 !== n ? n : e.name,
                e.parent && Q.has(e.parent.name) && (t = {
                    ...t,
                    xmlMode: !1
                }));
                !t.xmlMode && X.has(e.name) && (t = {
                    ...t,
                    xmlMode: "foreign"
                });
                let r = `<${e.name}`;
                const i = function(e, t) {
                    var n;
                    if (!e)
                        return;
                    const r = !1 === (null !== (n = t.encodeEntities) && void 0 !== n ? n : t.decodeEntities) ? K : t.xmlMode || "utf8" !== t.encodeEntities ? B : U;
                    return Object.keys(e).map((n => {
                            var i, s;
                            const a = null !== (i = e[n]) && void 0 !== i ? i : "";
                            return "foreign" === t.xmlMode && (n = null !== (s = Y.get(n)) && void 0 !== s ? s : n),
                                t.emptyAttrs || t.xmlMode || "" !== a ? `${n}="${r(a)}"` : n
                        }
                    )).join(" ")
                }(e.attribs, t);
                i && (r += ` ${i}`);
                0 === e.children.length && (t.xmlMode ? !1 !== t.selfClosingTags : t.selfClosingTags && j.has(e.name)) ? (t.xmlMode || (r += " "),
                    r += "/>") : (r += ">",
                e.children.length > 0 && (r += V(e.children, t)),
                !t.xmlMode && j.has(e.name) || (r += `</${e.name}>`));
                return r
            }(e, t);
        case a:
            return function(e, t) {
                var n;
                let r = e.data || "";
                !1 === (null !== (n = t.encodeEntities) && void 0 !== n ? n : t.decodeEntities) || !t.xmlMode && e.parent && q.has(e.parent.name) || (r = t.xmlMode || "utf8" !== t.encodeEntities ? B(r) : H(r));
                return r
            }(e, t)
    }
}
const Q = new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignObject", "desc", "title"])
    , X = new Set(["svg", "math"]);
function $(e, t) {
    return V(e, t)
}
function z(e) {
    return Array.isArray(e) ? e.map(z).join("") : k(e) && !O(e) ? z(e.children) : b(e) ? e.data : ""
}
function J(t) {
    return Array.isArray(t) ? t.map(J).join("") : k(t) && (t.type === e.Tag || S(t)) ? J(t.children) : b(t) ? t.data : ""
}
function Z(e) {
    return k(e) ? e.children : []
}
function ee(e) {
    return e.parent || null
}
function te(e) {
    const t = ee(e);
    if (null != t)
        return Z(t);
    const n = [e];
    let {prev: r, next: i} = e;
    for (; null != r; )
        n.unshift(r),
            ({prev: r} = r);
    for (; null != i; )
        n.push(i),
            ({next: i} = i);
    return n
}
function ne(e) {
    let {next: t} = e;
    for (; null !== t && !I(t); )
        ({next: t} = t);
    return t
}
function re(e) {
    let {prev: t} = e;
    for (; null !== t && !I(t); )
        ({prev: t} = t);
    return t
}
function ie(e) {
    if (e.prev && (e.prev.next = e.next),
    e.next && (e.next.prev = e.prev),
        e.parent) {
        const t = e.parent.children;
        t.splice(t.lastIndexOf(e), 1)
    }
}
function se(e, t, n=!0, r=1 / 0) {
    return Array.isArray(t) || (t = [t]),
        ae(e, t, n, r)
}
function ae(e, t, n, r) {
    const i = [];
    for (const s of t) {
        if (e(s) && (i.push(s),
        --r <= 0))
            break;
        if (n && k(s) && s.children.length > 0) {
            const t = ae(e, s.children, n, r);
            if (i.push(...t),
                r -= t.length,
            r <= 0)
                break
        }
    }
    return i
}
function oe(e, t, n=!0) {
    let r = null;
    for (let i = 0; i < t.length && !r; i++) {
        const s = t[i];
        I(s) && (e(s) ? r = s : n && s.children.length > 0 && (r = oe(e, s.children, !0)))
    }
    return r
}
const ce = {
    tag_name: e => "function" == typeof e ? t => I(t) && e(t.name) : "*" === e ? I : t => I(t) && t.name === e,
    tag_type: e => "function" == typeof e ? t => e(t.type) : t => t.type === e,
    tag_contains: e => "function" == typeof e ? t => b(t) && e(t.data) : t => b(t) && t.data === e
};
function le(e, t) {
    return "function" == typeof t ? n => I(n) && t(n.attribs[e]) : n => I(n) && n.attribs[e] === t
}
function he(e, t) {
    return n => e(n) || t(n)
}
function ue(e) {
    const t = Object.keys(e).map((t => {
            const n = e[t];
            return Object.prototype.hasOwnProperty.call(ce, t) ? ce[t](n) : le(t, n)
        }
    ));
    return 0 === t.length ? null : t.reduce(he)
}
function pe(e, t, n=!0, r=1 / 0) {
    return se(ce.tag_name(e), t, n, r)
}
var fe;
function de(e, t) {
    const n = []
        , r = [];
    if (e === t)
        return 0;
    let i = k(e) ? e : e.parent;
    for (; i; )
        n.unshift(i),
            i = i.parent;
    for (i = k(t) ? t : t.parent; i; )
        r.unshift(i),
            i = i.parent;
    const s = Math.min(n.length, r.length);
    let a = 0;
    for (; a < s && n[a] === r[a]; )
        a++;
    if (0 === a)
        return fe.DISCONNECTED;
    const o = n[a - 1]
        , c = o.children
        , l = n[a]
        , h = r[a];
    return c.indexOf(l) > c.indexOf(h) ? o === t ? fe.FOLLOWING | fe.CONTAINED_BY : fe.FOLLOWING : o === e ? fe.PRECEDING | fe.CONTAINS : fe.PRECEDING
}
function Ee(e) {
    return (e = e.filter(( (e, t, n) => !n.includes(e, t + 1)))).sort(( (e, t) => {
            const n = de(e, t);
            return n & fe.PRECEDING ? -1 : n & fe.FOLLOWING ? 1 : 0
        }
    )),
        e
}
!function(e) {
    e[e.DISCONNECTED = 1] = "DISCONNECTED",
        e[e.PRECEDING = 2] = "PRECEDING",
        e[e.FOLLOWING = 4] = "FOLLOWING",
        e[e.CONTAINS = 8] = "CONTAINS",
        e[e.CONTAINED_BY = 16] = "CONTAINED_BY"
}(fe || (fe = {}));
const me = ["url", "type", "lang"]
    , Te = ["fileSize", "bitrate", "framerate", "samplingrate", "channels", "duration", "height", "width"];
function _e(e) {
    return pe("media:content", e).map((e => {
            const {attribs: t} = e
                , n = {
                medium: t.medium,
                isDefault: !!t.isDefault
            };
            for (const e of me)
                t[e] && (n[e] = t[e]);
            for (const e of Te)
                t[e] && (n[e] = parseInt(t[e], 10));
            return t.expression && (n.expression = t.expression),
                n
        }
    ))
}
function Ae(e, t) {
    return pe(e, t, !0, 1)[0]
}
function ge(e, t, n=!1) {
    return z(pe(e, t, n, 1)).trim()
}
function Ne(e, t, n, r, i=!1) {
    const s = ge(n, r, i);
    s && (e[t] = s)
}
function Ce(e) {
    return "rss" === e || "feed" === e || "rdf:RDF" === e
}
var Ie, Se = Object.freeze({
    __proto__: null,
    isTag: I,
    isCDATA: S,
    isText: b,
    isComment: O,
    isDocument: L,
    hasChildren: k,
    getOuterHTML: $,
    getInnerHTML: function(e, t) {
        return k(e) ? e.children.map((e => $(e, t))).join("") : ""
    },
    getText: function e(t) {
        return Array.isArray(t) ? t.map(e).join("") : I(t) ? "br" === t.name ? "\n" : e(t.children) : S(t) ? e(t.children) : b(t) ? t.data : ""
    },
    textContent: z,
    innerText: J,
    getChildren: Z,
    getParent: ee,
    getSiblings: te,
    getAttributeValue: function(e, t) {
        var n;
        return null === (n = e.attribs) || void 0 === n ? void 0 : n[t]
    },
    hasAttrib: function(e, t) {
        return null != e.attribs && Object.prototype.hasOwnProperty.call(e.attribs, t) && null != e.attribs[t]
    },
    getName: function(e) {
        return e.name
    },
    nextElementSibling: ne,
    prevElementSibling: re,
    removeElement: ie,
    replaceElement: function(e, t) {
        const n = t.prev = e.prev;
        n && (n.next = t);
        const r = t.next = e.next;
        r && (r.prev = t);
        const i = t.parent = e.parent;
        if (i) {
            const n = i.children;
            n[n.lastIndexOf(e)] = t,
                e.parent = null
        }
    },
    appendChild: function(e, t) {
        if (ie(t),
            t.next = null,
            t.parent = e,
        e.children.push(t) > 1) {
            const n = e.children[e.children.length - 2];
            n.next = t,
                t.prev = n
        } else
            t.prev = null
    },
    append: function(e, t) {
        ie(t);
        const {parent: n} = e
            , r = e.next;
        if (t.next = r,
            t.prev = e,
            e.next = t,
            t.parent = n,
            r) {
            if (r.prev = t,
                n) {
                const e = n.children;
                e.splice(e.lastIndexOf(r), 0, t)
            }
        } else
            n && n.children.push(t)
    },
    prependChild: function(e, t) {
        if (ie(t),
            t.parent = e,
            t.prev = null,
        1 !== e.children.unshift(t)) {
            const n = e.children[1];
            n.prev = t,
                t.next = n
        } else
            t.next = null
    },
    prepend: function(e, t) {
        ie(t);
        const {parent: n} = e;
        if (n) {
            const r = n.children;
            r.splice(r.indexOf(e), 0, t)
        }
        e.prev && (e.prev.next = t),
            t.parent = n,
            t.prev = e.prev,
            t.next = e,
            e.prev = t
    },
    filter: se,
    find: ae,
    findOneChild: function(e, t) {
        return t.find(e)
    },
    findOne: oe,
    existsOne: function e(t, n) {
        return n.some((n => I(n) && (t(n) || n.children.length > 0 && e(t, n.children))))
    },
    findAll: function(e, t) {
        var n;
        const r = []
            , i = t.filter(I);
        let s;
        for (; s = i.shift(); ) {
            const t = null === (n = s.children) || void 0 === n ? void 0 : n.filter(I);
            t && t.length > 0 && i.unshift(...t),
            e(s) && r.push(s)
        }
        return r
    },
    testElement: function(e, t) {
        const n = ue(e);
        return !n || n(t)
    },
    getElements: function(e, t, n, r=1 / 0) {
        const i = ue(e);
        return i ? se(i, t, n, r) : []
    },
    getElementById: function(e, t, n=!0) {
        return Array.isArray(t) || (t = [t]),
            oe(le("id", e), t, n)
    },
    getElementsByTagName: pe,
    getElementsByTagType: function(e, t, n=!0, r=1 / 0) {
        return se(ce.tag_type(e), t, n, r)
    },
    removeSubsets: function(e) {
        let t = e.length;
        for (; --t >= 0; ) {
            const n = e[t];
            if (t > 0 && e.lastIndexOf(n, t - 1) >= 0)
                e.splice(t, 1);
            else
                for (let r = n.parent; r; r = r.parent)
                    if (e.includes(r)) {
                        e.splice(t, 1);
                        break
                    }
        }
        return e
    },
    get DocumentPosition() {
        return fe
    },
    compareDocumentPosition: de,
    uniqueSort: Ee,
    getFeed: function(e) {
        const t = Ae(Ce, e);
        return t ? "feed" === t.name ? function(e) {
            var t;
            const n = e.children
                , r = {
                type: "atom",
                items: pe("entry", n).map((e => {
                        var t;
                        const {children: n} = e
                            , r = {
                            media: _e(n)
                        };
                        Ne(r, "id", "id", n),
                            Ne(r, "title", "title", n);
                        const i = null === (t = Ae("link", n)) || void 0 === t ? void 0 : t.attribs.href;
                        i && (r.link = i);
                        const s = ge("summary", n) || ge("content", n);
                        s && (r.description = s);
                        const a = ge("updated", n);
                        return a && (r.pubDate = new Date(a)),
                            r
                    }
                ))
            };
            Ne(r, "id", "id", n),
                Ne(r, "title", "title", n);
            const i = null === (t = Ae("link", n)) || void 0 === t ? void 0 : t.attribs.href;
            i && (r.link = i);
            Ne(r, "description", "subtitle", n);
            const s = ge("updated", n);
            s && (r.updated = new Date(s));
            return Ne(r, "author", "email", n, !0),
                r
        }(t) : function(e) {
            var t, n;
            const r = null !== (n = null === (t = Ae("channel", e.children)) || void 0 === t ? void 0 : t.children) && void 0 !== n ? n : []
                , i = {
                type: e.name.substr(0, 3),
                id: "",
                items: pe("item", e.children).map((e => {
                        const {children: t} = e
                            , n = {
                            media: _e(t)
                        };
                        Ne(n, "id", "guid", t),
                            Ne(n, "title", "title", t),
                            Ne(n, "link", "link", t),
                            Ne(n, "description", "description", t);
                        const r = ge("pubDate", t);
                        return r && (n.pubDate = new Date(r)),
                            n
                    }
                ))
            };
            Ne(i, "title", "title", r),
                Ne(i, "link", "link", r),
                Ne(i, "description", "description", r);
            const s = ge("lastBuildDate", r);
            s && (i.updated = new Date(s));
            return Ne(i, "author", "managingEditor", r, !0),
                i
        }(t) : null
    }
}), be = "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {};
function Oe(e) {
    if (Object.keys)
        return Object.keys(e);
    var t = [];
    for (var n in e)
        t.push(n);
    return t
}
function ye(e, t) {
    if (e.forEach)
        return e.forEach(t);
    for (var n = 0; n < e.length; n++)
        t(e[n], n, e)
}
function Le() {
    try {
        return Object.defineProperty({}, "_", {}),
            function(e, t, n) {
                Object.defineProperty(e, t, {
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                    value: n
                })
            }
    } catch (e) {
        return function(e, t, n) {
            e[t] = n
        }
    }
}
var ke = ["Array", "Boolean", "Date", "Error", "EvalError", "Function", "Infinity", "JSON", "Math", "NaN", "Number", "Object", "RangeError", "ReferenceError", "RegExp", "String", "SyntaxError", "TypeError", "URIError", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "escape", "eval", "isFinite", "isNaN", "parseFloat", "parseInt", "undefined", "unescape"];
function ve() {}
function De(e) {
    if (!(this instanceof De))
        return new De(e);
    this.code = e
}
function Re(e) {
    if (Me(e))
        return e;
    var t = new ve;
    return "object" == typeof e && ye(Oe(e), (function(n) {
            t[n] = e[n]
        }
    )),
        t
}
function Me(e) {
    return e instanceof ve
}
ve.prototype = {},
    De.prototype.runInContext = function(e) {
        if (!(e instanceof ve))
            throw new TypeError("needs a 'context' argument.");
        if (be.document) {
            var t = be.document.createElement("iframe");
            t.style || (t.style = {}),
                t.style.display = "none",
                be.document.body.appendChild(t);
            var n = t.contentWindow
                , r = n.eval
                , i = n.execScript;
            !r && i && (i.call(n, "null"),
                r = n.eval),
                ye(Oe(e), (function(t) {
                        n[t] = e[t]
                    }
                )),
                ye(ke, (function(t) {
                        e[t] && (n[t] = e[t])
                    }
                ));
            var s = Oe(n)
                , a = r.call(n, this.code);
            return ye(Oe(n), (function(t) {
                    (t in e || -1 === function(e, t) {
                        if (xe)
                            return e.indexOf(t);
                        for (var n = 0; n < e.length; ++n)
                            if (e[n] === t)
                                return n;
                        return -1
                    }(s, t)) && (e[t] = n[t])
                }
            )),
                ye(ke, (function(t) {
                        var r, i, s;
                        t in e || (r = e,
                            i = t,
                            s = n[t],
                        "function" != typeof Ie && (Ie = Le),
                            Ie(r, i, s))
                    }
                )),
                be.document.body.removeChild(t),
                a
        }
        return function(e, t) {
            var n = Oe(be);
            return n.push("with (this.__ctx__){return eval(this.__code__)}"),
                Function.apply(null, n).apply({
                    __code__: e,
                    __ctx__: t
                })
        }(this.code, e)
    }
    ,
    De.prototype.runInThisContext = function() {
        return new Function("code","return eval(code);").call(be, this.code)
    }
    ,
    De.prototype.runInNewContext = function(e) {
        var t = Re(e)
            , n = this.runInContext(t);
        return e && ye(Oe(t), (function(n) {
                e[n] = t[n]
            }
        )),
            n
    }
;
var Pe = {
    runInContext: function(e, t, n) {
        return new De(e).runInContext(t, n)
    },
    isContext: Me,
    createContext: Re,
    createScript: function(e) {
        return new De(e)
    },
    Script: De,
    runInThisContext: function(e, t) {
        return new De(e).runInThisContext(t)
    },
    runInNewContext: function(e, t, n) {
        return new De(e).runInNewContext(t, n)
    }
}
    , xe = [].indexOf;
const {hasOwnProperty: we} = Object.prototype;
function Be(e, t) {
    return (e = e.slice()).push(t),
        e
}
function Fe(e, t) {
    return (t = t.slice()).unshift(e),
        t
}
class Ue extends Error {
    constructor(e) {
        super('JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'),
            this.avoidNew = !0,
            this.value = e,
            this.name = "NewError"
    }
}
function He(e, t, n, r, i) {
    if (!(this instanceof He))
        try {
            return new He(e,t,n,r,i)
        } catch (e) {
            if (!e.avoidNew)
                throw e;
            return e.value
        }
    "string" == typeof e && (i = r,
        r = n,
        n = t,
        t = e,
        e = null);
    const s = e && "object" == typeof e;
    if (e = e || {},
        this.json = e.json || n,
        this.path = e.path || t,
        this.resultType = e.resultType || "value",
        this.flatten = e.flatten || !1,
        this.wrap = !we.call(e, "wrap") || e.wrap,
        this.sandbox = e.sandbox || {},
        this.preventEval = e.preventEval || !1,
        this.parent = e.parent || null,
        this.parentProperty = e.parentProperty || null,
        this.callback = e.callback || r || null,
        this.otherTypeCallback = e.otherTypeCallback || i || function() {
            throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.")
        }
        ,
    !1 !== e.autostart) {
        const r = {
            path: s ? e.path : t
        };
        s ? "json"in e && (r.json = e.json) : r.json = n;
        const i = this.evaluate(r);
        if (!i || "object" != typeof i)
            throw new Ue(i);
        return i
    }
}
He.prototype.evaluate = function(e, t, n, r) {
    let i = this.parent
        , s = this.parentProperty
        , {flatten: a, wrap: o} = this;
    if (this.currResultType = this.resultType,
        this.currPreventEval = this.preventEval,
        this.currSandbox = this.sandbox,
        n = n || this.callback,
        this.currOtherTypeCallback = r || this.otherTypeCallback,
        t = t || this.json,
    (e = e || this.path) && "object" == typeof e && !Array.isArray(e)) {
        if (!e.path && "" !== e.path)
            throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
        if (!we.call(e, "json"))
            throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');
        ({json: t} = e),
            a = we.call(e, "flatten") ? e.flatten : a,
            this.currResultType = we.call(e, "resultType") ? e.resultType : this.currResultType,
            this.currSandbox = we.call(e, "sandbox") ? e.sandbox : this.currSandbox,
            o = we.call(e, "wrap") ? e.wrap : o,
            this.currPreventEval = we.call(e, "preventEval") ? e.preventEval : this.currPreventEval,
            n = we.call(e, "callback") ? e.callback : n,
            this.currOtherTypeCallback = we.call(e, "otherTypeCallback") ? e.otherTypeCallback : this.currOtherTypeCallback,
            i = we.call(e, "parent") ? e.parent : i,
            s = we.call(e, "parentProperty") ? e.parentProperty : s,
            e = e.path
    }
    if (i = i || null,
        s = s || null,
    Array.isArray(e) && (e = He.toPathString(e)),
    !e && "" !== e || !t)
        return;
    const c = He.toPathArray(e);
    "$" === c[0] && c.length > 1 && c.shift(),
        this._hasParentSelector = null;
    const l = this._trace(c, t, ["$"], i, s, n).filter((function(e) {
            return e && !e.isParentSelector
        }
    ));
    return l.length ? o || 1 !== l.length || l[0].hasArrExpr ? l.reduce(( (e, t) => {
            const n = this._getPreferredOutput(t);
            return a && Array.isArray(n) ? e = e.concat(n) : e.push(n),
                e
        }
    ), []) : this._getPreferredOutput(l[0]) : o ? [] : void 0
}
    ,
    He.prototype._getPreferredOutput = function(e) {
        const t = this.currResultType;
        switch (t) {
            case "all":
            {
                const t = Array.isArray(e.path) ? e.path : He.toPathArray(e.path);
                return e.pointer = He.toPointer(t),
                    e.path = "string" == typeof e.path ? e.path : He.toPathString(e.path),
                    e
            }
            case "value":
            case "parent":
            case "parentProperty":
                return e[t];
            case "path":
                return He.toPathString(e[t]);
            case "pointer":
                return He.toPointer(e.path);
            default:
                throw new TypeError("Unknown result type")
        }
    }
    ,
    He.prototype._handleCallback = function(e, t, n) {
        if (t) {
            const r = this._getPreferredOutput(e);
            e.path = "string" == typeof e.path ? e.path : He.toPathString(e.path),
                t(r, n, e)
        }
    }
    ,
    He.prototype._trace = function(e, t, n, r, i, s, a, o) {
        let c;
        if (!e.length)
            return c = {
                path: n,
                value: t,
                parent: r,
                parentProperty: i,
                hasArrExpr: a
            },
                this._handleCallback(c, s, "value"),
                c;
        const l = e[0]
            , h = e.slice(1)
            , u = [];
        function p(e) {
            Array.isArray(e) ? e.forEach((e => {
                    u.push(e)
                }
            )) : u.push(e)
        }
        if (("string" != typeof l || o) && t && we.call(t, l))
            p(this._trace(h, t[l], Be(n, l), t, l, s, a));
        else if ("*" === l)
            this._walk(t, (e => {
                    p(this._trace(h, t[e], Be(n, e), t, e, s, !0, !0))
                }
            ));
        else if (".." === l)
            p(this._trace(h, t, n, r, i, s, a)),
                this._walk(t, (r => {
                        "object" == typeof t[r] && p(this._trace(e.slice(), t[r], Be(n, r), t, r, s, !0))
                    }
                ));
        else {
            if ("^" === l)
                return this._hasParentSelector = !0,
                    {
                        path: n.slice(0, -1),
                        expr: h,
                        isParentSelector: !0
                    };
            if ("~" === l)
                return c = {
                    path: Be(n, l),
                    value: i,
                    parent: r,
                    parentProperty: null
                },
                    this._handleCallback(c, s, "property"),
                    c;
            if ("$" === l)
                p(this._trace(h, t, n, null, null, s, a));
            else if (/^(-?\d*):(-?\d*):?(\d*)$/u.test(l))
                p(this._slice(l, h, t, n, r, i, s));
            else if (0 === l.indexOf("?(")) {
                if (this.currPreventEval)
                    throw new Error("Eval [?(expr)] prevented in JSONPath expression.");
                const e = l.replace(/^\?\((.*?)\)$/u, "$1");
                this._walk(t, (a => {
                        this._eval(e, t[a], a, n, r, i) && p(this._trace(h, t[a], Be(n, a), t, a, s, !0))
                    }
                ))
            } else if ("(" === l[0]) {
                if (this.currPreventEval)
                    throw new Error("Eval [(expr)] prevented in JSONPath expression.");
                p(this._trace(Fe(this._eval(l, t, n[n.length - 1], n.slice(0, -1), r, i), h), t, n, r, i, s, a))
            } else if ("@" === l[0]) {
                let e = !1;
                const a = l.slice(1, -2);
                switch (a) {
                    case "scalar":
                        t && ["object", "function"].includes(typeof t) || (e = !0);
                        break;
                    case "boolean":
                    case "string":
                    case "undefined":
                    case "function":
                        typeof t === a && (e = !0);
                        break;
                    case "integer":
                        !Number.isFinite(t) || t % 1 || (e = !0);
                        break;
                    case "number":
                        Number.isFinite(t) && (e = !0);
                        break;
                    case "nonFinite":
                        "number" != typeof t || Number.isFinite(t) || (e = !0);
                        break;
                    case "object":
                        t && typeof t === a && (e = !0);
                        break;
                    case "array":
                        Array.isArray(t) && (e = !0);
                        break;
                    case "other":
                        e = this.currOtherTypeCallback(t, n, r, i);
                        break;
                    case "null":
                        null === t && (e = !0);
                        break;
                    default:
                        throw new TypeError("Unknown value type " + a)
                }
                if (e)
                    return c = {
                        path: n,
                        value: t,
                        parent: r,
                        parentProperty: i
                    },
                        this._handleCallback(c, s, "value"),
                        c
            } else if ("`" === l[0] && t && we.call(t, l.slice(1))) {
                const e = l.slice(1);
                p(this._trace(h, t[e], Be(n, e), t, e, s, a, !0))
            } else if (l.includes(",")) {
                const e = l.split(",");
                for (const a of e)
                    p(this._trace(Fe(a, h), t, n, r, i, s, !0))
            } else
                !o && t && we.call(t, l) && p(this._trace(h, t[l], Be(n, l), t, l, s, a, !0))
        }
        if (this._hasParentSelector)
            for (let e = 0; e < u.length; e++) {
                const n = u[e];
                if (n && n.isParentSelector) {
                    const o = this._trace(n.expr, t, n.path, r, i, s, a);
                    if (Array.isArray(o)) {
                        u[e] = o[0];
                        const t = o.length;
                        for (let n = 1; n < t; n++)
                            e++,
                                u.splice(e, 0, o[n])
                    } else
                        u[e] = o
                }
            }
        return u
    }
    ,
    He.prototype._walk = function(e, t) {
        if (Array.isArray(e)) {
            const n = e.length;
            for (let e = 0; e < n; e++)
                t(e)
        } else
            e && "object" == typeof e && Object.keys(e).forEach((e => {
                    t(e)
                }
            ))
    }
    ,
    He.prototype._slice = function(e, t, n, r, i, s, a) {
        if (!Array.isArray(n))
            return;
        const o = n.length
            , c = e.split(":")
            , l = c[2] && Number.parseInt(c[2]) || 1;
        let h = c[0] && Number.parseInt(c[0]) || 0
            , u = c[1] && Number.parseInt(c[1]) || o;
        h = h < 0 ? Math.max(0, h + o) : Math.min(o, h),
            u = u < 0 ? Math.max(0, u + o) : Math.min(o, u);
        const p = [];
        for (let e = h; e < u; e += l) {
            this._trace(Fe(e, t), n, r, i, s, a, !0).forEach((e => {
                    p.push(e)
                }
            ))
        }
        return p
    }
    ,
    He.prototype._eval = function(e, t, n, r, i, s) {
        this.currSandbox._$_parentProperty = s,
            this.currSandbox._$_parent = i,
            this.currSandbox._$_property = n,
            this.currSandbox._$_root = this.json,
            this.currSandbox._$_v = t;
        const a = e.includes("@path");
        a && (this.currSandbox._$_path = He.toPathString(r.concat([n])));
        const o = "script:" + e;
        if (!He.cache[o]) {
            let t = e.replace(/@parentProperty/gu, "_$_parentProperty").replace(/@parent/gu, "_$_parent").replace(/@property/gu, "_$_property").replace(/@root/gu, "_$_root").replace(/@([.\s)[])/gu, "_$_v$1");
            a && (t = t.replace(/@path/gu, "_$_path")),
                He.cache[o] = new this.vm.Script(t)
        }
        try {
            return He.cache[o].runInNewContext(this.currSandbox)
        } catch (t) {
            throw new Error("jsonPath: " + t.message + ": " + e)
        }
    }
    ,
    He.cache = {},
    He.toPathString = function(e) {
        const t = e
            , n = t.length;
        let r = "$";
        for (let e = 1; e < n; e++)
            /^(~|\^|@.*?\(\))$/u.test(t[e]) || (r += /^[0-9*]+$/u.test(t[e]) ? "[" + t[e] + "]" : "['" + t[e] + "']");
        return r
    }
    ,
    He.toPointer = function(e) {
        const t = e
            , n = t.length;
        let r = "";
        for (let e = 1; e < n; e++)
            /^(~|\^|@.*?\(\))$/u.test(t[e]) || (r += "/" + t[e].toString().replace(/~/gu, "~0").replace(/\//gu, "~1"));
        return r
    }
    ,
    He.toPathArray = function(e) {
        const {cache: t} = He;
        if (t[e])
            return t[e].concat();
        const n = []
            , r = e.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/gu, ";$&;").replace(/[['](\??\(.*?\))[\]']/gu, (function(e, t) {
                return "[#" + (n.push(t) - 1) + "]"
            }
        )).replace(/\[['"]([^'\]]*)['"]\]/gu, (function(e, t) {
                return "['" + t.replace(/\./gu, "%@%").replace(/~/gu, "%%@@%%") + "']"
            }
        )).replace(/~/gu, ";~;").replace(/['"]?\.['"]?(?![^[]*\])|\[['"]?/gu, ";").replace(/%@%/gu, ".").replace(/%%@@%%/gu, "~").replace(/(?:;)?(\^+)(?:;)?/gu, (function(e, t) {
                return ";" + t.split("").join(";") + ";"
            }
        )).replace(/;;;|;;/gu, ";..;").replace(/;$|'?\]|'$/gu, "")
            , i = r.split(";").map((function(e) {
                const t = e.match(/#(\d+)/u);
                return t && t[1] ? n[t[1]] : e
            }
        ));
        return t[e] = i,
            t[e].concat()
    }
    ,
    He.prototype.vm = Pe;
var Ge = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
function Ye() {
    throw new Error("Dynamic requires are not currently supported by rollup-plugin-commonjs")
}
function qe(e) {
    return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e
}
function Ke(e, t) {
    return e(t = {
        exports: {}
    }, t.exports),
        t.exports
}
var je = Ke((function(e) {
        var t = Array.prototype
            , n = Object.prototype
            , r = {
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#39;",
            "<": "&lt;",
            ">": "&gt;"
        }
            , i = /[&"'<>]/g
            , s = e.exports = {};
        function a(e, t) {
            return n.hasOwnProperty.call(e, t)
        }
        function o(e) {
            return r[e]
        }
        function c(e, t, n) {
            var r, i, s;
            if (e instanceof Error && (e = (i = e).name + ": " + i.message),
                Object.setPrototypeOf ? (r = new Error(e),
                    Object.setPrototypeOf(r, c.prototype)) : (r = this,
                    Object.defineProperty(r, "message", {
                        enumerable: !1,
                        writable: !0,
                        value: e
                    })),
                Object.defineProperty(r, "name", {
                    value: "Template render error"
                }),
            Error.captureStackTrace && Error.captureStackTrace(r, this.constructor),
                i) {
                var a = Object.getOwnPropertyDescriptor(i, "stack");
                (s = a && (a.get || function() {
                        return a.value
                    }
                )) || (s = function() {
                        return i.stack
                    }
                )
            } else {
                var o = new Error(e).stack;
                s = function() {
                    return o
                }
            }
            return Object.defineProperty(r, "stack", {
                get: function() {
                    return s.call(r)
                }
            }),
                Object.defineProperty(r, "cause", {
                    value: i
                }),
                r.lineno = t,
                r.colno = n,
                r.firstUpdate = !0,
                r.Update = function(e) {
                    var t = "(" + (e || "unknown path") + ")";
                    return this.firstUpdate && (this.lineno && this.colno ? t += " [Line " + this.lineno + ", Column " + this.colno + "]" : this.lineno && (t += " [Line " + this.lineno + "]")),
                        t += "\n ",
                    this.firstUpdate && (t += " "),
                        this.message = t + (this.message || ""),
                        this.firstUpdate = !1,
                        this
                }
                ,
                r
        }
        function l(e) {
            return "[object Function]" === n.toString.call(e)
        }
        function h(e) {
            return "[object Array]" === n.toString.call(e)
        }
        function u(e) {
            return "[object String]" === n.toString.call(e)
        }
        function p(e) {
            return "[object Object]" === n.toString.call(e)
        }
        function f(e) {
            var t = function(e) {
                return e ? "string" == typeof e ? e.split(".") : [e] : []
            }(e);
            return function(e) {
                for (var n = e, r = 0; r < t.length; r++) {
                    var i = t[r];
                    if (!a(n, i))
                        return;
                    n = n[i]
                }
                return n
            }
        }
        function d(e) {
            return Array.prototype.slice.call(e)
        }
        function E(e, t, n) {
            return Array.prototype.indexOf.call(e || [], t, n)
        }
        function m(e) {
            var t = [];
            for (var n in e)
                a(e, n) && t.push(n);
            return t
        }
        s.hasOwnProp = a,
            s._prettifyError = function(e, t, n) {
                if (n.Update || (n = new s.TemplateError(n)),
                    n.Update(e),
                    !t) {
                    var r = n;
                    (n = new Error(r.message)).name = r.name
                }
                return n
            }
            ,
            Object.setPrototypeOf ? Object.setPrototypeOf(c.prototype, Error.prototype) : c.prototype = Object.create(Error.prototype, {
                constructor: {
                    value: c
                }
            }),
            s.TemplateError = c,
            s.escape = function(e) {
                return e.replace(i, o)
            }
            ,
            s.isFunction = l,
            s.isArray = h,
            s.isString = u,
            s.isObject = p,
            s.getAttrGetter = f,
            s.groupBy = function(e, t, n) {
                for (var r = {}, i = l(t) ? t : f(t), s = 0; s < e.length; s++) {
                    var a = e[s]
                        , o = i(a, s);
                    if (void 0 === o && !0 === n)
                        throw new TypeError('groupby: attribute "' + t + '" resolved to undefined');
                    (r[o] || (r[o] = [])).push(a)
                }
                return r
            }
            ,
            s.toArray = d,
            s.without = function(e) {
                var t = [];
                if (!e)
                    return t;
                for (var n = e.length, r = d(arguments).slice(1), i = -1; ++i < n; )
                    -1 === E(r, e[i]) && t.push(e[i]);
                return t
            }
            ,
            s.repeat = function(e, t) {
                for (var n = "", r = 0; r < t; r++)
                    n += e;
                return n
            }
            ,
            s.each = function(e, n, r) {
                if (null != e)
                    if (t.forEach && e.forEach === t.forEach)
                        e.forEach(n, r);
                    else if (e.length === +e.length)
                        for (var i = 0, s = e.length; i < s; i++)
                            n.call(r, e[i], i, e)
            }
            ,
            s.map = function(e, n) {
                var r = [];
                if (null == e)
                    return r;
                if (t.map && e.map === t.map)
                    return e.map(n);
                for (var i = 0; i < e.length; i++)
                    r[r.length] = n(e[i], i);
                return e.length === +e.length && (r.length = e.length),
                    r
            }
            ,
            s.asyncIter = function(e, t, n) {
                var r = -1;
                !function i() {
                    ++r < e.length ? t(e[r], r, i, n) : n()
                }()
            }
            ,
            s.asyncFor = function(e, t, n) {
                var r = m(e || {})
                    , i = r.length
                    , s = -1;
                !function a() {
                    s++;
                    var o = r[s];
                    s < i ? t(o, e[o], s, i, a) : n()
                }()
            }
            ,
            s.indexOf = E,
            s.keys = m,
            s._entries = function(e) {
                return m(e).map((function(t) {
                        return [t, e[t]]
                    }
                ))
            }
            ,
            s._values = function(e) {
                return m(e).map((function(t) {
                        return e[t]
                    }
                ))
            }
            ,
            s._assign = s.extend = function(e, t) {
                return e = e || {},
                    m(t).forEach((function(n) {
                            e[n] = t[n]
                        }
                    )),
                    e
            }
            ,
            s.inOperator = function(e, t) {
                if (h(t) || u(t))
                    return -1 !== t.indexOf(e);
                if (p(t))
                    return e in t;
                throw new Error('Cannot use "in" operator to search for "' + e + '" in unexpected types.')
            }
    }
));
function Ve() {
    throw new Error("setTimeout has not been defined")
}
function We() {
    throw new Error("clearTimeout has not been defined")
}
var Qe = Ve
    , Xe = We;
function $e(e) {
    if (Qe === setTimeout)
        return setTimeout(e, 0);
    if ((Qe === Ve || !Qe) && setTimeout)
        return Qe = setTimeout,
            setTimeout(e, 0);
    try {
        return Qe(e, 0)
    } catch (t) {
        try {
            return Qe.call(null, e, 0)
        } catch (t) {
            return Qe.call(this, e, 0)
        }
    }
}
"function" == typeof be.setTimeout && (Qe = setTimeout),
"function" == typeof be.clearTimeout && (Xe = clearTimeout);
var ze, Je = [], Ze = !1, et = -1;
function tt() {
    Ze && ze && (Ze = !1,
        ze.length ? Je = ze.concat(Je) : et = -1,
    Je.length && nt())
}
function nt() {
    if (!Ze) {
        var e = $e(tt);
        Ze = !0;
        for (var t = Je.length; t; ) {
            for (ze = Je,
                     Je = []; ++et < t; )
                ze && ze[et].run();
            et = -1,
                t = Je.length
        }
        ze = null,
            Ze = !1,
            function(e) {
                if (Xe === clearTimeout)
                    return clearTimeout(e);
                if ((Xe === We || !Xe) && clearTimeout)
                    return Xe = clearTimeout,
                        clearTimeout(e);
                try {
                    Xe(e)
                } catch (t) {
                    try {
                        return Xe.call(null, e)
                    } catch (t) {
                        return Xe.call(this, e)
                    }
                }
            }(e)
    }
}
function rt(e, t) {
    this.fun = e,
        this.array = t
}
rt.prototype.run = function() {
    this.fun.apply(null, this.array)
}
;
function it() {}
var st = it
    , at = it
    , ot = it
    , ct = it
    , lt = it
    , ht = it
    , ut = it;
var pt = be.performance || {}
    , ft = pt.now || pt.mozNow || pt.msNow || pt.oNow || pt.webkitNow || function() {
        return (new Date).getTime()
    }
;
var dt = new Date;
var Et = {
    nextTick: function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
            for (var n = 1; n < arguments.length; n++)
                t[n - 1] = arguments[n];
        Je.push(new rt(e,t)),
        1 !== Je.length || Ze || $e(nt)
    },
    title: "browser",
    browser: !0,
    env: {},
    argv: [],
    version: "",
    versions: {},
    on: st,
    addListener: at,
    once: ot,
    off: ct,
    removeListener: lt,
    removeAllListeners: ht,
    emit: ut,
    binding: function(e) {
        throw new Error("process.binding is not supported")
    },
    cwd: function() {
        return "/"
    },
    chdir: function(e) {
        throw new Error("process.chdir is not supported")
    },
    umask: function() {
        return 0
    },
    hrtime: function(e) {
        var t = .001 * ft.call(pt)
            , n = Math.floor(t)
            , r = Math.floor(t % 1 * 1e9);
        return e && (n -= e[0],
        (r -= e[1]) < 0 && (n--,
            r += 1e9)),
            [n, r]
    },
    platform: "browser",
    release: {},
    config: {},
    uptime: function() {
        return (new Date - dt) / 1e3
    }
};
function mt() {}
function Tt() {
    Tt.init.call(this)
}
function _t(e) {
    return void 0 === e._maxListeners ? Tt.defaultMaxListeners : e._maxListeners
}
function At(e, t, n) {
    if (t)
        e.call(n);
    else
        for (var r = e.length, i = yt(e, r), s = 0; s < r; ++s)
            i[s].call(n)
}
function gt(e, t, n, r) {
    if (t)
        e.call(n, r);
    else
        for (var i = e.length, s = yt(e, i), a = 0; a < i; ++a)
            s[a].call(n, r)
}
function Nt(e, t, n, r, i) {
    if (t)
        e.call(n, r, i);
    else
        for (var s = e.length, a = yt(e, s), o = 0; o < s; ++o)
            a[o].call(n, r, i)
}
function Ct(e, t, n, r, i, s) {
    if (t)
        e.call(n, r, i, s);
    else
        for (var a = e.length, o = yt(e, a), c = 0; c < a; ++c)
            o[c].call(n, r, i, s)
}
function It(e, t, n, r) {
    if (t)
        e.apply(n, r);
    else
        for (var i = e.length, s = yt(e, i), a = 0; a < i; ++a)
            s[a].apply(n, r)
}
function St(e, t, n, r) {
    var i, s, a;
    if ("function" != typeof n)
        throw new TypeError('"listener" argument must be a function');
    if ((s = e._events) ? (s.newListener && (e.emit("newListener", t, n.listener ? n.listener : n),
        s = e._events),
        a = s[t]) : (s = e._events = new mt,
        e._eventsCount = 0),
        a) {
        if ("function" == typeof a ? a = s[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n),
        !a.warned && (i = _t(e)) && i > 0 && a.length > i) {
            a.warned = !0;
            var o = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + t + " listeners added. Use emitter.setMaxListeners() to increase limit");
            o.name = "MaxListenersExceededWarning",
                o.emitter = e,
                o.type = t,
                o.count = a.length,
                function(e) {
                    "function" == typeof console.warn ? console.warn(e) : console.log(e)
                }(o)
        }
    } else
        a = s[t] = n,
            ++e._eventsCount;
    return e
}
function bt(e, t, n) {
    var r = !1;
    function i() {
        e.removeListener(t, i),
        r || (r = !0,
            n.apply(e, arguments))
    }
    return i.listener = n,
        i
}
function Ot(e) {
    var t = this._events;
    if (t) {
        var n = t[e];
        if ("function" == typeof n)
            return 1;
        if (n)
            return n.length
    }
    return 0
}
function yt(e, t) {
    for (var n = new Array(t); t--; )
        n[t] = e[t];
    return n
}
function Lt() {
    var e;
    Tt.call(this),
        this.__emitError = (e = this,
                function(t) {
                    e.emit("error", t)
                }
        )
}
function kt() {
    return new Lt
}
mt.prototype = Object.create(null),
    Tt.EventEmitter = Tt,
    Tt.usingDomains = !1,
    Tt.prototype.domain = void 0,
    Tt.prototype._events = void 0,
    Tt.prototype._maxListeners = void 0,
    Tt.defaultMaxListeners = 10,
    Tt.init = function() {
        this.domain = null,
        Tt.usingDomains && undefined.active,
        this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = new mt,
            this._eventsCount = 0),
            this._maxListeners = this._maxListeners || void 0
    }
    ,
    Tt.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || isNaN(e))
            throw new TypeError('"n" argument must be a positive number');
        return this._maxListeners = e,
            this
    }
    ,
    Tt.prototype.getMaxListeners = function() {
        return _t(this)
    }
    ,
    Tt.prototype.emit = function(e) {
        var t, n, r, i, s, a, o, c = "error" === e;
        if (a = this._events)
            c = c && null == a.error;
        else if (!c)
            return !1;
        if (o = this.domain,
            c) {
            if (t = arguments[1],
                !o) {
                if (t instanceof Error)
                    throw t;
                var l = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                throw l.context = t,
                    l
            }
            return t || (t = new Error('Uncaught, unspecified "error" event')),
                t.domainEmitter = this,
                t.domain = o,
                t.domainThrown = !1,
                o.emit("error", t),
                !1
        }
        if (!(n = a[e]))
            return !1;
        var h = "function" == typeof n;
        switch (r = arguments.length) {
            case 1:
                At(n, h, this);
                break;
            case 2:
                gt(n, h, this, arguments[1]);
                break;
            case 3:
                Nt(n, h, this, arguments[1], arguments[2]);
                break;
            case 4:
                Ct(n, h, this, arguments[1], arguments[2], arguments[3]);
                break;
            default:
                for (i = new Array(r - 1),
                         s = 1; s < r; s++)
                    i[s - 1] = arguments[s];
                It(n, h, this, i)
        }
        return !0
    }
    ,
    Tt.prototype.addListener = function(e, t) {
        return St(this, e, t, !1)
    }
    ,
    Tt.prototype.on = Tt.prototype.addListener,
    Tt.prototype.prependListener = function(e, t) {
        return St(this, e, t, !0)
    }
    ,
    Tt.prototype.once = function(e, t) {
        if ("function" != typeof t)
            throw new TypeError('"listener" argument must be a function');
        return this.on(e, bt(this, e, t)),
            this
    }
    ,
    Tt.prototype.prependOnceListener = function(e, t) {
        if ("function" != typeof t)
            throw new TypeError('"listener" argument must be a function');
        return this.prependListener(e, bt(this, e, t)),
            this
    }
    ,
    Tt.prototype.removeListener = function(e, t) {
        var n, r, i, s, a;
        if ("function" != typeof t)
            throw new TypeError('"listener" argument must be a function');
        if (!(r = this._events))
            return this;
        if (!(n = r[e]))
            return this;
        if (n === t || n.listener && n.listener === t)
            0 == --this._eventsCount ? this._events = new mt : (delete r[e],
            r.removeListener && this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
            for (i = -1,
                     s = n.length; s-- > 0; )
                if (n[s] === t || n[s].listener && n[s].listener === t) {
                    a = n[s].listener,
                        i = s;
                    break
                }
            if (i < 0)
                return this;
            if (1 === n.length) {
                if (n[0] = void 0,
                0 == --this._eventsCount)
                    return this._events = new mt,
                        this;
                delete r[e]
            } else
                !function(e, t) {
                    for (var n = t, r = n + 1, i = e.length; r < i; n += 1,
                        r += 1)
                        e[n] = e[r];
                    e.pop()
                }(n, i);
            r.removeListener && this.emit("removeListener", e, a || t)
        }
        return this
    }
    ,
    Tt.prototype.removeAllListeners = function(e) {
        var t, n;
        if (!(n = this._events))
            return this;
        if (!n.removeListener)
            return 0 === arguments.length ? (this._events = new mt,
                this._eventsCount = 0) : n[e] && (0 == --this._eventsCount ? this._events = new mt : delete n[e]),
                this;
        if (0 === arguments.length) {
            for (var r, i = Object.keys(n), s = 0; s < i.length; ++s)
                "removeListener" !== (r = i[s]) && this.removeAllListeners(r);
            return this.removeAllListeners("removeListener"),
                this._events = new mt,
                this._eventsCount = 0,
                this
        }
        if ("function" == typeof (t = n[e]))
            this.removeListener(e, t);
        else if (t)
            do {
                this.removeListener(e, t[t.length - 1])
            } while (t[0]);
        return this
    }
    ,
    Tt.prototype.listeners = function(e) {
        var t, n = this._events;
        return n && (t = n[e]) ? "function" == typeof t ? [t.listener || t] : function(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n)
                t[n] = e[n].listener || e[n];
            return t
        }(t) : []
    }
    ,
    Tt.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : Ot.call(e, t)
    }
    ,
    Tt.prototype.listenerCount = Ot,
    Tt.prototype.eventNames = function() {
        return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : []
    }
    ,
    ("function" == typeof Object.create ? function(e, t) {
                e.super_ = t,
                    e.prototype = Object.create(t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    })
            }
            : function(e, t) {
                e.super_ = t;
                var n = function() {};
                n.prototype = t.prototype,
                    e.prototype = new n,
                    e.prototype.constructor = e
            }
    )(Lt, Tt),
    Lt.prototype.add = function(e) {
        e.on("error", this.__emitError)
    }
    ,
    Lt.prototype.remove = function(e) {
        e.removeListener("error", this.__emitError)
    }
    ,
    Lt.prototype.bind = function(e) {
        var t = this.__emitError;
        return function() {
            var n = Array.prototype.slice.call(arguments);
            try {
                e.apply(null, n)
            } catch (e) {
                t(e)
            }
        }
    }
    ,
    Lt.prototype.intercept = function(e) {
        var t = this.__emitError;
        return function(n) {
            if (n)
                t(n);
            else {
                var r = Array.prototype.slice.call(arguments, 1);
                try {
                    e.apply(null, r)
                } catch (n) {
                    t(n)
                }
            }
        }
    }
    ,
    Lt.prototype.run = function(e) {
        var t = this.__emitError;
        try {
            e()
        } catch (e) {
            t(e)
        }
        return this
    }
    ,
    Lt.prototype.dispose = function() {
        return this.removeAllListeners(),
            this
    }
    ,
    Lt.prototype.enter = Lt.prototype.exit = function() {
        return this
    }
;
var vt, Dt = {
    Domain: Lt,
    createDomain: kt,
    create: kt
}, Rt = "function" == typeof setImmediate, Mt = Pt;
function Pt(e) {
    xt.length || (Ut(),
        wt = !0),
        xt[xt.length] = e
}
var xt = []
    , wt = !1
    , Bt = 0;
function Ft() {
    for (; Bt < xt.length; ) {
        var e = Bt;
        if (Bt += 1,
            xt[e].call(),
        Bt > 1024) {
            for (var t = 0, n = xt.length - Bt; t < n; t++)
                xt[t] = xt[t + Bt];
            xt.length -= Bt,
                Bt = 0
        }
    }
    xt.length = 0,
        Bt = 0,
        wt = !1
}
function Ut() {
    var e = Et.domain;
    e && (vt || (vt = Dt),
        vt.active = Et.domain = null),
        wt && Rt ? setImmediate(Ft) : Et.nextTick(Ft),
    e && (vt.active = Et.domain = e)
}
Pt.requestFlush = Ut;
var Ht = []
    , Gt = function(e) {
    var t;
    t = Ht.length ? Ht.pop() : new Yt;
    t.task = e,
        t.domain = Et.domain,
        Mt(t)
};
function Yt() {
    this.task = null,
        this.domain = null
}
Yt.prototype.call = function() {
    this.domain && this.domain.enter();
    var e = !0;
    try {
        this.task.call(),
            e = !1,
        this.domain && this.domain.exit()
    } finally {
        e && Mt.requestFlush(),
            this.task = null,
            this.domain = null,
            Ht.push(this)
    }
}
;
var qt = Ke((function(e) {
        !function(t) {
            var n = function() {
                var e = Array.prototype.slice.call(arguments);
                "function" == typeof e[0] && e[0].apply(null, e.splice(1))
            }
                , r = function(e) {
                "function" == typeof setImmediate ? setImmediate(e) : void 0 !== Et && Et.nextTick ? Et.nextTick(e) : setTimeout(e, 0)
            }
                , i = Array.isArray || function(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }
                , s = function(e, t, s) {
                var a = s ? r : n;
                if (t = t || function() {}
                    ,
                    !i(e)) {
                    var o = new Error("First argument to waterfall must be an array of functions");
                    return t(o)
                }
                if (!e.length)
                    return t();
                var c = function(e) {
                    return function(n) {
                        if (n)
                            t.apply(null, arguments),
                                t = function() {}
                            ;
                        else {
                            var r = Array.prototype.slice.call(arguments, 1)
                                , i = e.next();
                            i ? r.push(c(i)) : r.push(t),
                                a((function() {
                                        e.apply(null, r)
                                    }
                                ))
                        }
                    }
                };
                c(function(e) {
                    var t = function(n) {
                        var r = function() {
                            return e.length && e[n].apply(null, arguments),
                                r.next()
                        };
                        return r.next = function() {
                            return n < e.length - 1 ? t(n + 1) : null
                        }
                            ,
                            r
                    };
                    return t(0)
                }(e))()
            };
            e.exports ? e.exports = s : t.waterfall = s
        }(Ge)
    }
));
function Kt(e, t, n, r) {
    return {
        type: e,
        value: t,
        lineno: n,
        colno: r
    }
}
var jt = function() {
    function e(e, t) {
        this.str = e,
            this.index = 0,
            this.len = e.length,
            this.lineno = 0,
            this.colno = 0,
            this.in_code = !1;
        var n = (t = t || {}).tags || {};
        this.tags = {
            BLOCK_START: n.blockStart || "{%",
            BLOCK_END: n.blockEnd || "%}",
            VARIABLE_START: n.variableStart || "{{",
            VARIABLE_END: n.variableEnd || "}}",
            COMMENT_START: n.commentStart || "{#",
            COMMENT_END: n.commentEnd || "#}"
        },
            this.trimBlocks = !!t.trimBlocks,
            this.lstripBlocks = !!t.lstripBlocks
    }
    var t = e.prototype;
    return t.nextToken = function() {
        var e, t = this.lineno, n = this.colno;
        if (this.in_code) {
            var r = this.current();
            if (this.isFinished())
                return null;
            if ('"' === r || "'" === r)
                return Kt("string", this._parseString(r), t, n);
            if (e = this._extract(" \n\t\r "))
                return Kt("whitespace", e, t, n);
            if ((e = this._extractString(this.tags.BLOCK_END)) || (e = this._extractString("-" + this.tags.BLOCK_END)))
                return this.in_code = !1,
                this.trimBlocks && ("\n" === (r = this.current()) ? this.forward() : "\r" === r && (this.forward(),
                    "\n" === (r = this.current()) ? this.forward() : this.back())),
                    Kt("block-end", e, t, n);
            if ((e = this._extractString(this.tags.VARIABLE_END)) || (e = this._extractString("-" + this.tags.VARIABLE_END)))
                return this.in_code = !1,
                    Kt("variable-end", e, t, n);
            if ("r" === r && "/" === this.str.charAt(this.index + 1)) {
                this.forwardN(2);
                for (var i = ""; !this.isFinished(); ) {
                    if ("/" === this.current() && "\\" !== this.previous()) {
                        this.forward();
                        break
                    }
                    i += this.current(),
                        this.forward()
                }
                for (var s = ["g", "i", "m", "y"], a = ""; !this.isFinished(); ) {
                    if (!(-1 !== s.indexOf(this.current())))
                        break;
                    a += this.current(),
                        this.forward()
                }
                return Kt("regex", {
                    body: i,
                    flags: a
                }, t, n)
            }
            if (-1 !== "()[]{}%*-+~/#,:|.<>=!".indexOf(r)) {
                this.forward();
                var o, c = ["==", "===", "!=", "!==", "<=", ">=", "//", "**"], l = r + this.current();
                switch (-1 !== je.indexOf(c, l) && (this.forward(),
                    r = l,
                -1 !== je.indexOf(c, l + this.current()) && (r = l + this.current(),
                    this.forward())),
                    r) {
                    case "(":
                        o = "left-paren";
                        break;
                    case ")":
                        o = "right-paren";
                        break;
                    case "[":
                        o = "left-bracket";
                        break;
                    case "]":
                        o = "right-bracket";
                        break;
                    case "{":
                        o = "left-curly";
                        break;
                    case "}":
                        o = "right-curly";
                        break;
                    case ",":
                        o = "comma";
                        break;
                    case ":":
                        o = "colon";
                        break;
                    case "~":
                        o = "tilde";
                        break;
                    case "|":
                        o = "pipe";
                        break;
                    default:
                        o = "operator"
                }
                return Kt(o, r, t, n)
            }
            if ((e = this._extractUntil(" \n\t\r ()[]{}%*-+~/#,:|.<>=!")).match(/^[-+]?[0-9]+$/))
                return "." === this.current() ? (this.forward(),
                    Kt("float", e + "." + this._extract("0123456789"), t, n)) : Kt("int", e, t, n);
            if (e.match(/^(true|false)$/))
                return Kt("boolean", e, t, n);
            if ("none" === e)
                return Kt("none", e, t, n);
            if ("null" === e)
                return Kt("none", e, t, n);
            if (e)
                return Kt("symbol", e, t, n);
            throw new Error("Unexpected value while parsing: " + e)
        }
        var h, u = this.tags.BLOCK_START.charAt(0) + this.tags.VARIABLE_START.charAt(0) + this.tags.COMMENT_START.charAt(0) + this.tags.COMMENT_END.charAt(0);
        if (this.isFinished())
            return null;
        if ((e = this._extractString(this.tags.BLOCK_START + "-")) || (e = this._extractString(this.tags.BLOCK_START)))
            return this.in_code = !0,
                Kt("block-start", e, t, n);
        if ((e = this._extractString(this.tags.VARIABLE_START + "-")) || (e = this._extractString(this.tags.VARIABLE_START)))
            return this.in_code = !0,
                Kt("variable-start", e, t, n);
        e = "";
        var p = !1;
        for (this._matches(this.tags.COMMENT_START) && (p = !0,
            e = this._extractString(this.tags.COMMENT_START)); null !== (h = this._extractUntil(u)); ) {
            if (e += h,
            (this._matches(this.tags.BLOCK_START) || this._matches(this.tags.VARIABLE_START) || this._matches(this.tags.COMMENT_START)) && !p) {
                if (this.lstripBlocks && this._matches(this.tags.BLOCK_START) && this.colno > 0 && this.colno <= e.length) {
                    var f = e.slice(-this.colno);
                    if (/^\s+$/.test(f) && !(e = e.slice(0, -this.colno)).length)
                        return this.nextToken()
                }
                break
            }
            if (this._matches(this.tags.COMMENT_END)) {
                if (!p)
                    throw new Error("unexpected end of comment");
                e += this._extractString(this.tags.COMMENT_END);
                break
            }
            e += this.current(),
                this.forward()
        }
        if (null === h && p)
            throw new Error("expected end of comment, got end of file");
        return Kt(p ? "comment" : "data", e, t, n)
    }
        ,
        t._parseString = function(e) {
            this.forward();
            for (var t = ""; !this.isFinished() && this.current() !== e; ) {
                var n = this.current();
                if ("\\" === n) {
                    switch (this.forward(),
                        this.current()) {
                        case "n":
                            t += "\n";
                            break;
                        case "t":
                            t += "\t";
                            break;
                        case "r":
                            t += "\r";
                            break;
                        default:
                            t += this.current()
                    }
                    this.forward()
                } else
                    t += n,
                        this.forward()
            }
            return this.forward(),
                t
        }
        ,
        t._matches = function(e) {
            return this.index + e.length > this.len ? null : this.str.slice(this.index, this.index + e.length) === e
        }
        ,
        t._extractString = function(e) {
            return this._matches(e) ? (this.forwardN(e.length),
                e) : null
        }
        ,
        t._extractUntil = function(e) {
            return this._extractMatching(!0, e || "")
        }
        ,
        t._extract = function(e) {
            return this._extractMatching(!1, e)
        }
        ,
        t._extractMatching = function(e, t) {
            if (this.isFinished())
                return null;
            var n = t.indexOf(this.current());
            if (e && -1 === n || !e && -1 !== n) {
                var r = this.current();
                this.forward();
                for (var i = t.indexOf(this.current()); (e && -1 === i || !e && -1 !== i) && !this.isFinished(); )
                    r += this.current(),
                        this.forward(),
                        i = t.indexOf(this.current());
                return r
            }
            return ""
        }
        ,
        t._extractRegex = function(e) {
            var t = this.currentStr().match(e);
            return t ? (this.forwardN(t[0].length),
                t) : null
        }
        ,
        t.isFinished = function() {
            return this.index >= this.len
        }
        ,
        t.forwardN = function(e) {
            for (var t = 0; t < e; t++)
                this.forward()
        }
        ,
        t.forward = function() {
            this.index++,
                "\n" === this.previous() ? (this.lineno++,
                    this.colno = 0) : this.colno++
        }
        ,
        t.backN = function(e) {
            for (var t = 0; t < e; t++)
                this.back()
        }
        ,
        t.back = function() {
            if (this.index--,
            "\n" === this.current()) {
                this.lineno--;
                var e = this.src.lastIndexOf("\n", this.index - 1);
                this.colno = -1 === e ? this.index : this.index - e
            } else
                this.colno--
        }
        ,
        t.current = function() {
            return this.isFinished() ? "" : this.str.charAt(this.index)
        }
        ,
        t.currentStr = function() {
            return this.isFinished() ? "" : this.str.substr(this.index)
        }
        ,
        t.previous = function() {
            return this.str.charAt(this.index - 1)
        }
        ,
        e
}()
    , Vt = {
    lex: function(e, t) {
        return new jt(e,t)
    },
    TOKEN_STRING: "string",
    TOKEN_WHITESPACE: "whitespace",
    TOKEN_DATA: "data",
    TOKEN_BLOCK_START: "block-start",
    TOKEN_BLOCK_END: "block-end",
    TOKEN_VARIABLE_START: "variable-start",
    TOKEN_VARIABLE_END: "variable-end",
    TOKEN_COMMENT: "comment",
    TOKEN_LEFT_PAREN: "left-paren",
    TOKEN_RIGHT_PAREN: "right-paren",
    TOKEN_LEFT_BRACKET: "left-bracket",
    TOKEN_RIGHT_BRACKET: "right-bracket",
    TOKEN_LEFT_CURLY: "left-curly",
    TOKEN_RIGHT_CURLY: "right-curly",
    TOKEN_OPERATOR: "operator",
    TOKEN_COMMA: "comma",
    TOKEN_COLON: "colon",
    TOKEN_TILDE: "tilde",
    TOKEN_PIPE: "pipe",
    TOKEN_INT: "int",
    TOKEN_FLOAT: "float",
    TOKEN_BOOLEAN: "boolean",
    TOKEN_NONE: "none",
    TOKEN_SYMBOL: "symbol",
    TOKEN_SPECIAL: "special",
    TOKEN_REGEX: "regex"
};
function Wt(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1,
            r.configurable = !0,
        "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
    }
}
function Qt(e, t, n) {
    return t && Wt(e.prototype, t),
    n && Wt(e, n),
        e
}
function Xt(e, t) {
    e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        $t(e, t)
}
function $t(e, t) {
    return $t = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        $t(e, t)
}
function zt(e, t, n) {
    n = n || {},
        je.keys(n).forEach((function(t) {
                n[t] = function(e, t) {
                    return "function" != typeof e || "function" != typeof t ? t : function() {
                        var n = this.parent;
                        this.parent = e;
                        var r = t.apply(this, arguments);
                        return this.parent = n,
                            r
                    }
                }(e.prototype[t], n[t])
            }
        ));
    var r = function(e) {
        function n() {
            return e.apply(this, arguments) || this
        }
        return Xt(n, e),
            Qt(n, [{
                key: "typename",
                get: function() {
                    return t
                }
            }]),
            n
    }(e);
    return je._assign(r.prototype, n),
        r
}
var Jt = function() {
    function e() {
        this.init.apply(this, arguments)
    }
    return e.prototype.init = function() {}
        ,
        e.extend = function(e, t) {
            return "object" == typeof e && (t = e,
                e = "anonymous"),
                zt(this, e, t)
        }
        ,
        Qt(e, [{
            key: "typename",
            get: function() {
                return this.constructor.name
            }
        }]),
        e
}()
    , Zt = function(e) {
    function t() {
        var t, n;
        return (t = n = e.call(this) || this).init.apply(t, arguments),
            n
    }
    return Xt(t, e),
        t.prototype.init = function() {}
        ,
        t.extend = function(e, t) {
            return "object" == typeof e && (t = e,
                e = "anonymous"),
                zt(this, e, t)
        }
        ,
        Qt(t, [{
            key: "typename",
            get: function() {
                return this.constructor.name
            }
        }]),
        t
}(Tt)
    , en = {
    Obj: Jt,
    EmitterObj: Zt
};
function tn(e, t) {
    for (var n = 0; n < t.length; n++) {
        var r = t[n];
        r.enumerable = r.enumerable || !1,
            r.configurable = !0,
        "value"in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
    }
}
function nn(e, t, n) {
    return t && tn(e.prototype, t),
    n && tn(e, n),
        e
}
function rn(e, t) {
    e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        sn(e, t)
}
function sn(e, t) {
    return sn = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        sn(e, t)
}
function an(e, t, n) {
    e instanceof t && n.push(e),
    e instanceof on && e.findAll(t, n)
}
var on = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    rn(t, e);
    var n = t.prototype;
    return n.init = function(e, t) {
        for (var n = arguments, r = this, i = arguments.length, s = new Array(i > 2 ? i - 2 : 0), a = 2; a < i; a++)
            s[a - 2] = arguments[a];
        this.lineno = e,
            this.colno = t,
            this.fields.forEach((function(e, t) {
                    var i = n[t + 2];
                    void 0 === i && (i = null),
                        r[e] = i
                }
            ))
    }
        ,
        n.findAll = function(e, t) {
            var n = this;
            return t = t || [],
                this instanceof ln ? this.children.forEach((function(n) {
                        return an(n, e, t)
                    }
                )) : this.fields.forEach((function(r) {
                        return an(n[r], e, t)
                    }
                )),
                t
        }
        ,
        n.iterFields = function(e) {
            var t = this;
            this.fields.forEach((function(n) {
                    e(t[n], n)
                }
            ))
        }
        ,
        t
}(en.Obj)
    , cn = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    return rn(t, e),
        nn(t, [{
            key: "typename",
            get: function() {
                return "Value"
            }
        }, {
            key: "fields",
            get: function() {
                return ["value"]
            }
        }]),
        t
}(on)
    , ln = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    rn(t, e);
    var n = t.prototype;
    return n.init = function(t, n, r) {
        e.prototype.init.call(this, t, n, r || [])
    }
        ,
        n.addChild = function(e) {
            this.children.push(e)
        }
        ,
        nn(t, [{
            key: "typename",
            get: function() {
                return "NodeList"
            }
        }, {
            key: "fields",
            get: function() {
                return ["children"]
            }
        }]),
        t
}(on)
    , hn = ln.extend("Root")
    , un = cn.extend("Literal")
    , pn = cn.extend("Symbol")
    , fn = ln.extend("Group")
    , dn = ln.extend("Array")
    , En = on.extend("Pair", {
    fields: ["key", "value"]
})
    , mn = ln.extend("Dict")
    , Tn = on.extend("LookupVal", {
    fields: ["target", "val"]
})
    , _n = on.extend("If", {
    fields: ["cond", "body", "else_"]
})
    , An = _n.extend("IfAsync")
    , gn = on.extend("InlineIf", {
    fields: ["cond", "body", "else_"]
})
    , Nn = on.extend("For", {
    fields: ["arr", "name", "body", "else_"]
})
    , Cn = Nn.extend("AsyncEach")
    , In = Nn.extend("AsyncAll")
    , Sn = on.extend("Macro", {
    fields: ["name", "args", "body"]
})
    , bn = Sn.extend("Caller")
    , On = on.extend("Import", {
    fields: ["template", "target", "withContext"]
})
    , yn = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    return rn(t, e),
        t.prototype.init = function(t, n, r, i, s) {
            e.prototype.init.call(this, t, n, r, i || new ln, s)
        }
        ,
        nn(t, [{
            key: "typename",
            get: function() {
                return "FromImport"
            }
        }, {
            key: "fields",
            get: function() {
                return ["template", "names", "withContext"]
            }
        }]),
        t
}(on)
    , Ln = on.extend("FunCall", {
    fields: ["name", "args"]
})
    , kn = Ln.extend("Filter")
    , vn = kn.extend("FilterAsync", {
    fields: ["name", "args", "symbol"]
})
    , Dn = mn.extend("KeywordArgs")
    , Rn = on.extend("Block", {
    fields: ["name", "body"]
})
    , Mn = on.extend("Super", {
    fields: ["blockName", "symbol"]
})
    , Pn = on.extend("TemplateRef", {
    fields: ["template"]
}).extend("Extends")
    , xn = on.extend("Include", {
    fields: ["template", "ignoreMissing"]
})
    , wn = on.extend("Set", {
    fields: ["targets", "value"]
})
    , Bn = on.extend("Switch", {
    fields: ["expr", "cases", "default"]
})
    , Fn = on.extend("Case", {
    fields: ["cond", "body"]
})
    , Un = ln.extend("Output")
    , Hn = on.extend("Capture", {
    fields: ["body"]
})
    , Gn = un.extend("TemplateData")
    , Yn = on.extend("UnaryOp", {
    fields: ["target"]
})
    , qn = on.extend("BinOp", {
    fields: ["left", "right"]
})
    , Kn = qn.extend("In")
    , jn = qn.extend("Is")
    , Vn = qn.extend("Or")
    , Wn = qn.extend("And")
    , Qn = Yn.extend("Not")
    , Xn = qn.extend("Add")
    , $n = qn.extend("Concat")
    , zn = qn.extend("Sub")
    , Jn = qn.extend("Mul")
    , Zn = qn.extend("Div")
    , er = qn.extend("FloorDiv")
    , tr = qn.extend("Mod")
    , nr = qn.extend("Pow")
    , rr = Yn.extend("Neg")
    , ir = Yn.extend("Pos")
    , sr = on.extend("Compare", {
    fields: ["expr", "ops"]
})
    , ar = on.extend("CompareOperand", {
    fields: ["expr", "type"]
})
    , or = on.extend("CallExtension", {
    init: function(e, t, n, r) {
        this.parent(),
            this.extName = e.__name || e,
            this.prop = t,
            this.args = n || new ln,
            this.contentArgs = r || [],
            this.autoescape = e.autoescape
    },
    fields: ["extName", "prop", "args", "contentArgs"]
})
    , cr = or.extend("CallExtensionAsync");
function lr(e, t, n) {
    var r = e.split("\n");
    r.forEach((function(e, i) {
            e && (n && i > 0 || !n) && Et.stdout.write(" ".repeat(t));
            var s = i === r.length - 1 ? "" : "\n";
            Et.stdout.write("" + e + s)
        }
    ))
}
var hr = {
    Node: on,
    Root: hn,
    NodeList: ln,
    Value: cn,
    Literal: un,
    Symbol: pn,
    Group: fn,
    Array: dn,
    Pair: En,
    Dict: mn,
    Output: Un,
    Capture: Hn,
    TemplateData: Gn,
    If: _n,
    IfAsync: An,
    InlineIf: gn,
    For: Nn,
    AsyncEach: Cn,
    AsyncAll: In,
    Macro: Sn,
    Caller: bn,
    Import: On,
    FromImport: yn,
    FunCall: Ln,
    Filter: kn,
    FilterAsync: vn,
    KeywordArgs: Dn,
    Block: Rn,
    Super: Mn,
    Extends: Pn,
    Include: xn,
    Set: wn,
    Switch: Bn,
    Case: Fn,
    LookupVal: Tn,
    BinOp: qn,
    In: Kn,
    Is: jn,
    Or: Vn,
    And: Wn,
    Not: Qn,
    Add: Xn,
    Concat: $n,
    Sub: zn,
    Mul: Jn,
    Div: Zn,
    FloorDiv: er,
    Mod: tr,
    Pow: nr,
    Neg: rr,
    Pos: ir,
    Compare: sr,
    CompareOperand: ar,
    CallExtension: or,
    CallExtensionAsync: cr,
    printNodes: function e(t, n) {
        if (n = n || 0,
            lr(t.typename + ": ", n),
        t instanceof ln)
            lr("\n"),
                t.children.forEach((function(t) {
                        e(t, n + 2)
                    }
                ));
        else if (t instanceof or)
            lr(t.extName + "." + t.prop + "\n"),
            t.args && e(t.args, n + 2),
            t.contentArgs && t.contentArgs.forEach((function(t) {
                    e(t, n + 2)
                }
            ));
        else {
            var r = []
                , i = null;
            t.iterFields((function(e, t) {
                    e instanceof on ? r.push([t, e]) : (i = i || {})[t] = e
                }
            )),
                i ? lr(JSON.stringify(i, null, 2) + "\n", null, !0) : lr("\n"),
                r.forEach((function(t) {
                        var r = t[0]
                            , i = t[1];
                        lr("[" + r + "] =>", n + 2),
                            e(i, n + 4)
                    }
                ))
        }
    }
};
function ur(e, t) {
    return ur = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        ur(e, t)
}
hr.Node,
    hr.Root,
    hr.NodeList,
    hr.Value,
    hr.Literal,
    hr.Group,
    hr.Pair,
    hr.Dict,
    hr.Output,
    hr.Capture,
    hr.TemplateData,
    hr.If,
    hr.IfAsync,
    hr.InlineIf,
    hr.For,
    hr.AsyncEach,
    hr.AsyncAll,
    hr.Macro,
    hr.Caller,
    hr.Import,
    hr.FromImport,
    hr.FunCall,
    hr.Filter,
    hr.FilterAsync,
    hr.KeywordArgs,
    hr.Block,
    hr.Super,
    hr.Extends,
    hr.Include,
    hr.Switch,
    hr.Case,
    hr.LookupVal,
    hr.BinOp,
    hr.In,
    hr.Is,
    hr.Or,
    hr.And,
    hr.Not,
    hr.Add,
    hr.Concat,
    hr.Sub,
    hr.Mul,
    hr.Div,
    hr.FloorDiv,
    hr.Mod,
    hr.Pow,
    hr.Neg,
    hr.Pos,
    hr.Compare,
    hr.CompareOperand,
    hr.CallExtension,
    hr.CallExtensionAsync,
    hr.printNodes;
var pr = function(e) {
    var t, n;
    function r() {
        return e.apply(this, arguments) || this
    }
    n = e,
        (t = r).prototype = Object.create(n.prototype),
        t.prototype.constructor = t,
        ur(t, n);
    var i = r.prototype;
    return i.init = function(e) {
        this.tokens = e,
            this.peeked = null,
            this.breakOnBlocks = null,
            this.dropLeadingWhitespace = !1,
            this.extensions = []
    }
        ,
        i.nextToken = function(e) {
            var t;
            if (this.peeked) {
                if (e || this.peeked.type !== Vt.TOKEN_WHITESPACE)
                    return t = this.peeked,
                        this.peeked = null,
                        t;
                this.peeked = null
            }
            if (t = this.tokens.nextToken(),
                !e)
                for (; t && t.type === Vt.TOKEN_WHITESPACE; )
                    t = this.tokens.nextToken();
            return t
        }
        ,
        i.peekToken = function() {
            return this.peeked = this.peeked || this.nextToken(),
                this.peeked
        }
        ,
        i.pushToken = function(e) {
            if (this.peeked)
                throw new Error("pushToken: can only push one token on between reads");
            this.peeked = e
        }
        ,
        i.error = function(e, t, n) {
            if (void 0 === t || void 0 === n) {
                var r = this.peekToken() || {};
                t = r.lineno,
                    n = r.colno
            }
            return void 0 !== t && (t += 1),
            void 0 !== n && (n += 1),
                new je.TemplateError(e,t,n)
        }
        ,
        i.fail = function(e, t, n) {
            throw this.error(e, t, n)
        }
        ,
        i.skip = function(e) {
            var t = this.nextToken();
            return !(!t || t.type !== e) || (this.pushToken(t),
                !1)
        }
        ,
        i.expect = function(e) {
            var t = this.nextToken();
            return t.type !== e && this.fail("expected " + e + ", got " + t.type, t.lineno, t.colno),
                t
        }
        ,
        i.skipValue = function(e, t) {
            var n = this.nextToken();
            return !(!n || n.type !== e || n.value !== t) || (this.pushToken(n),
                !1)
        }
        ,
        i.skipSymbol = function(e) {
            return this.skipValue(Vt.TOKEN_SYMBOL, e)
        }
        ,
        i.advanceAfterBlockEnd = function(e) {
            var t;
            return e || ((t = this.peekToken()) || this.fail("unexpected end of file"),
            t.type !== Vt.TOKEN_SYMBOL && this.fail("advanceAfterBlockEnd: expected symbol token or explicit name to be passed"),
                e = this.nextToken().value),
                (t = this.nextToken()) && t.type === Vt.TOKEN_BLOCK_END ? "-" === t.value.charAt(0) && (this.dropLeadingWhitespace = !0) : this.fail("expected block end in " + e + " statement"),
                t
        }
        ,
        i.advanceAfterVariableEnd = function() {
            var e = this.nextToken();
            e && e.type === Vt.TOKEN_VARIABLE_END ? this.dropLeadingWhitespace = "-" === e.value.charAt(e.value.length - this.tokens.tags.VARIABLE_END.length - 1) : (this.pushToken(e),
                this.fail("expected variable end"))
        }
        ,
        i.parseFor = function() {
            var e, t, n = this.peekToken();
            if (this.skipSymbol("for") ? (e = new hr.For(n.lineno,n.colno),
                t = "endfor") : this.skipSymbol("asyncEach") ? (e = new hr.AsyncEach(n.lineno,n.colno),
                t = "endeach") : this.skipSymbol("asyncAll") ? (e = new hr.AsyncAll(n.lineno,n.colno),
                t = "endall") : this.fail("parseFor: expected for{Async}", n.lineno, n.colno),
                e.name = this.parsePrimary(),
            e.name instanceof hr.Symbol || this.fail("parseFor: variable name expected for loop"),
            this.peekToken().type === Vt.TOKEN_COMMA) {
                var r = e.name;
                for (e.name = new hr.Array(r.lineno,r.colno),
                         e.name.addChild(r); this.skip(Vt.TOKEN_COMMA); ) {
                    var i = this.parsePrimary();
                    e.name.addChild(i)
                }
            }
            return this.skipSymbol("in") || this.fail('parseFor: expected "in" keyword for loop', n.lineno, n.colno),
                e.arr = this.parseExpression(),
                this.advanceAfterBlockEnd(n.value),
                e.body = this.parseUntilBlocks(t, "else"),
            this.skipSymbol("else") && (this.advanceAfterBlockEnd("else"),
                e.else_ = this.parseUntilBlocks(t)),
                this.advanceAfterBlockEnd(),
                e
        }
        ,
        i.parseMacro = function() {
            var e = this.peekToken();
            this.skipSymbol("macro") || this.fail("expected macro");
            var t = this.parsePrimary(!0)
                , n = this.parseSignature()
                , r = new hr.Macro(e.lineno,e.colno,t,n);
            return this.advanceAfterBlockEnd(e.value),
                r.body = this.parseUntilBlocks("endmacro"),
                this.advanceAfterBlockEnd(),
                r
        }
        ,
        i.parseCall = function() {
            var e = this.peekToken();
            this.skipSymbol("call") || this.fail("expected call");
            var t = this.parseSignature(!0) || new hr.NodeList
                , n = this.parsePrimary();
            this.advanceAfterBlockEnd(e.value);
            var r = this.parseUntilBlocks("endcall");
            this.advanceAfterBlockEnd();
            var i = new hr.Symbol(e.lineno,e.colno,"caller")
                , s = new hr.Caller(e.lineno,e.colno,i,t,r)
                , a = n.args.children;
            return a[a.length - 1]instanceof hr.KeywordArgs || a.push(new hr.KeywordArgs),
                a[a.length - 1].addChild(new hr.Pair(e.lineno,e.colno,i,s)),
                new hr.Output(e.lineno,e.colno,[n])
        }
        ,
        i.parseWithContext = function() {
            var e = this.peekToken()
                , t = null;
            return this.skipSymbol("with") ? t = !0 : this.skipSymbol("without") && (t = !1),
            null !== t && (this.skipSymbol("context") || this.fail("parseFrom: expected context after with/without", e.lineno, e.colno)),
                t
        }
        ,
        i.parseImport = function() {
            var e = this.peekToken();
            this.skipSymbol("import") || this.fail("parseImport: expected import", e.lineno, e.colno);
            var t = this.parseExpression();
            this.skipSymbol("as") || this.fail('parseImport: expected "as" keyword', e.lineno, e.colno);
            var n = this.parseExpression()
                , r = this.parseWithContext()
                , i = new hr.Import(e.lineno,e.colno,t,n,r);
            return this.advanceAfterBlockEnd(e.value),
                i
        }
        ,
        i.parseFrom = function() {
            var e = this.peekToken();
            this.skipSymbol("from") || this.fail("parseFrom: expected from");
            var t = this.parseExpression();
            this.skipSymbol("import") || this.fail("parseFrom: expected import", e.lineno, e.colno);
            for (var n, r = new hr.NodeList; ; ) {
                var i = this.peekToken();
                if (i.type === Vt.TOKEN_BLOCK_END) {
                    r.children.length || this.fail("parseFrom: Expected at least one import name", e.lineno, e.colno),
                    "-" === i.value.charAt(0) && (this.dropLeadingWhitespace = !0),
                        this.nextToken();
                    break
                }
                r.children.length > 0 && !this.skip(Vt.TOKEN_COMMA) && this.fail("parseFrom: expected comma", e.lineno, e.colno);
                var s = this.parsePrimary();
                if ("_" === s.value.charAt(0) && this.fail("parseFrom: names starting with an underscore cannot be imported", s.lineno, s.colno),
                    this.skipSymbol("as")) {
                    var a = this.parsePrimary();
                    r.addChild(new hr.Pair(s.lineno,s.colno,s,a))
                } else
                    r.addChild(s);
                n = this.parseWithContext()
            }
            return new hr.FromImport(e.lineno,e.colno,t,r,n)
        }
        ,
        i.parseBlock = function() {
            var e = this.peekToken();
            this.skipSymbol("block") || this.fail("parseBlock: expected block", e.lineno, e.colno);
            var t = new hr.Block(e.lineno,e.colno);
            t.name = this.parsePrimary(),
            t.name instanceof hr.Symbol || this.fail("parseBlock: variable name expected", e.lineno, e.colno),
                this.advanceAfterBlockEnd(e.value),
                t.body = this.parseUntilBlocks("endblock"),
                this.skipSymbol("endblock"),
                this.skipSymbol(t.name.value);
            var n = this.peekToken();
            return n || this.fail("parseBlock: expected endblock, got end of file"),
                this.advanceAfterBlockEnd(n.value),
                t
        }
        ,
        i.parseExtends = function() {
            var e = "extends"
                , t = this.peekToken();
            this.skipSymbol(e) || this.fail("parseTemplateRef: expected extends");
            var n = new hr.Extends(t.lineno,t.colno);
            return n.template = this.parseExpression(),
                this.advanceAfterBlockEnd(t.value),
                n
        }
        ,
        i.parseInclude = function() {
            var e = "include"
                , t = this.peekToken();
            this.skipSymbol(e) || this.fail("parseInclude: expected include");
            var n = new hr.Include(t.lineno,t.colno);
            return n.template = this.parseExpression(),
            this.skipSymbol("ignore") && this.skipSymbol("missing") && (n.ignoreMissing = !0),
                this.advanceAfterBlockEnd(t.value),
                n
        }
        ,
        i.parseIf = function() {
            var e, t = this.peekToken();
            this.skipSymbol("if") || this.skipSymbol("elif") || this.skipSymbol("elseif") ? e = new hr.If(t.lineno,t.colno) : this.skipSymbol("ifAsync") ? e = new hr.IfAsync(t.lineno,t.colno) : this.fail("parseIf: expected if, elif, or elseif", t.lineno, t.colno),
                e.cond = this.parseExpression(),
                this.advanceAfterBlockEnd(t.value),
                e.body = this.parseUntilBlocks("elif", "elseif", "else", "endif");
            var n = this.peekToken();
            switch (n && n.value) {
                case "elseif":
                case "elif":
                    e.else_ = this.parseIf();
                    break;
                case "else":
                    this.advanceAfterBlockEnd(),
                        e.else_ = this.parseUntilBlocks("endif"),
                        this.advanceAfterBlockEnd();
                    break;
                case "endif":
                    e.else_ = null,
                        this.advanceAfterBlockEnd();
                    break;
                default:
                    this.fail("parseIf: expected elif, else, or endif, got end of file")
            }
            return e
        }
        ,
        i.parseSet = function() {
            var e = this.peekToken();
            this.skipSymbol("set") || this.fail("parseSet: expected set", e.lineno, e.colno);
            for (var t, n = new hr.Set(e.lineno,e.colno,[]); (t = this.parsePrimary()) && (n.targets.push(t),
                this.skip(Vt.TOKEN_COMMA)); )
                ;
            return this.skipValue(Vt.TOKEN_OPERATOR, "=") ? (n.value = this.parseExpression(),
                this.advanceAfterBlockEnd(e.value)) : this.skip(Vt.TOKEN_BLOCK_END) ? (n.body = new hr.Capture(e.lineno,e.colno,this.parseUntilBlocks("endset")),
                n.value = null,
                this.advanceAfterBlockEnd()) : this.fail("parseSet: expected = or block end in set tag", e.lineno, e.colno),
                n
        }
        ,
        i.parseSwitch = function() {
            var e = "switch"
                , t = "endswitch"
                , n = "case"
                , r = "default"
                , i = this.peekToken();
            this.skipSymbol(e) || this.skipSymbol(n) || this.skipSymbol(r) || this.fail('parseSwitch: expected "switch," "case" or "default"', i.lineno, i.colno);
            var s = this.parseExpression();
            this.advanceAfterBlockEnd(e),
                this.parseUntilBlocks(n, r, t);
            var a, o = this.peekToken(), c = [];
            do {
                this.skipSymbol(n);
                var l = this.parseExpression();
                this.advanceAfterBlockEnd(e);
                var h = this.parseUntilBlocks(n, r, t);
                c.push(new hr.Case(o.line,o.col,l,h)),
                    o = this.peekToken()
            } while (o && o.value === n);
            switch (o.value) {
                case r:
                    this.advanceAfterBlockEnd(),
                        a = this.parseUntilBlocks(t),
                        this.advanceAfterBlockEnd();
                    break;
                case t:
                    this.advanceAfterBlockEnd();
                    break;
                default:
                    this.fail('parseSwitch: expected "case," "default" or "endswitch," got EOF.')
            }
            return new hr.Switch(i.lineno,i.colno,s,c,a)
        }
        ,
        i.parseStatement = function() {
            var e = this.peekToken();
            if (e.type !== Vt.TOKEN_SYMBOL && this.fail("tag name expected", e.lineno, e.colno),
            this.breakOnBlocks && -1 !== je.indexOf(this.breakOnBlocks, e.value))
                return null;
            switch (e.value) {
                case "raw":
                    return this.parseRaw();
                case "verbatim":
                    return this.parseRaw("verbatim");
                case "if":
                case "ifAsync":
                    return this.parseIf();
                case "for":
                case "asyncEach":
                case "asyncAll":
                    return this.parseFor();
                case "block":
                    return this.parseBlock();
                case "extends":
                    return this.parseExtends();
                case "include":
                    return this.parseInclude();
                case "set":
                    return this.parseSet();
                case "macro":
                    return this.parseMacro();
                case "call":
                    return this.parseCall();
                case "import":
                    return this.parseImport();
                case "from":
                    return this.parseFrom();
                case "filter":
                    return this.parseFilterStatement();
                case "switch":
                    return this.parseSwitch();
                default:
                    if (this.extensions.length)
                        for (var t = 0; t < this.extensions.length; t++) {
                            var n = this.extensions[t];
                            if (-1 !== je.indexOf(n.tags || [], e.value))
                                return n.parse(this, hr, Vt)
                        }
                    this.fail("unknown block tag: " + e.value, e.lineno, e.colno)
            }
        }
        ,
        i.parseRaw = function(e) {
            for (var t = "end" + (e = e || "raw"), n = new RegExp("([\\s\\S]*?){%\\s*(" + e + "|" + t + ")\\s*(?=%})%}"), r = 1, i = "", s = null, a = this.advanceAfterBlockEnd(); (s = this.tokens._extractRegex(n)) && r > 0; ) {
                var o = s[0]
                    , c = s[1]
                    , l = s[2];
                l === e ? r += 1 : l === t && (r -= 1),
                    0 === r ? (i += c,
                        this.tokens.backN(o.length - c.length)) : i += o
            }
            return new hr.Output(a.lineno,a.colno,[new hr.TemplateData(a.lineno,a.colno,i)])
        }
        ,
        i.parsePostfix = function(e) {
            for (var t, n = this.peekToken(); n; ) {
                if (n.type === Vt.TOKEN_LEFT_PAREN)
                    e = new hr.FunCall(n.lineno,n.colno,e,this.parseSignature());
                else if (n.type === Vt.TOKEN_LEFT_BRACKET)
                    (t = this.parseAggregate()).children.length > 1 && this.fail("invalid index"),
                        e = new hr.LookupVal(n.lineno,n.colno,e,t.children[0]);
                else {
                    if (n.type !== Vt.TOKEN_OPERATOR || "." !== n.value)
                        break;
                    this.nextToken();
                    var r = this.nextToken();
                    r.type !== Vt.TOKEN_SYMBOL && this.fail("expected name as lookup value, got " + r.value, r.lineno, r.colno),
                        t = new hr.Literal(r.lineno,r.colno,r.value),
                        e = new hr.LookupVal(n.lineno,n.colno,e,t)
                }
                n = this.peekToken()
            }
            return e
        }
        ,
        i.parseExpression = function() {
            return this.parseInlineIf()
        }
        ,
        i.parseInlineIf = function() {
            var e = this.parseOr();
            if (this.skipSymbol("if")) {
                var t = this.parseOr()
                    , n = e;
                (e = new hr.InlineIf(e.lineno,e.colno)).body = n,
                    e.cond = t,
                    this.skipSymbol("else") ? e.else_ = this.parseOr() : e.else_ = null
            }
            return e
        }
        ,
        i.parseOr = function() {
            for (var e = this.parseAnd(); this.skipSymbol("or"); ) {
                var t = this.parseAnd();
                e = new hr.Or(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseAnd = function() {
            for (var e = this.parseNot(); this.skipSymbol("and"); ) {
                var t = this.parseNot();
                e = new hr.And(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseNot = function() {
            var e = this.peekToken();
            return this.skipSymbol("not") ? new hr.Not(e.lineno,e.colno,this.parseNot()) : this.parseIn()
        }
        ,
        i.parseIn = function() {
            for (var e = this.parseIs(); ; ) {
                var t = this.nextToken();
                if (!t)
                    break;
                var n = t.type === Vt.TOKEN_SYMBOL && "not" === t.value;
                if (n || this.pushToken(t),
                    !this.skipSymbol("in")) {
                    n && this.pushToken(t);
                    break
                }
                var r = this.parseIs();
                e = new hr.In(e.lineno,e.colno,e,r),
                n && (e = new hr.Not(e.lineno,e.colno,e))
            }
            return e
        }
        ,
        i.parseIs = function() {
            var e = this.parseCompare();
            if (this.skipSymbol("is")) {
                var t = this.skipSymbol("not")
                    , n = this.parseCompare();
                e = new hr.Is(e.lineno,e.colno,e,n),
                t && (e = new hr.Not(e.lineno,e.colno,e))
            }
            return e
        }
        ,
        i.parseCompare = function() {
            for (var e = ["==", "===", "!=", "!==", "<", ">", "<=", ">="], t = this.parseConcat(), n = []; ; ) {
                var r = this.nextToken();
                if (!r)
                    break;
                if (-1 === e.indexOf(r.value)) {
                    this.pushToken(r);
                    break
                }
                n.push(new hr.CompareOperand(r.lineno,r.colno,this.parseConcat(),r.value))
            }
            return n.length ? new hr.Compare(n[0].lineno,n[0].colno,t,n) : t
        }
        ,
        i.parseConcat = function() {
            for (var e = this.parseAdd(); this.skipValue(Vt.TOKEN_TILDE, "~"); ) {
                var t = this.parseAdd();
                e = new hr.Concat(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseAdd = function() {
            for (var e = this.parseSub(); this.skipValue(Vt.TOKEN_OPERATOR, "+"); ) {
                var t = this.parseSub();
                e = new hr.Add(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseSub = function() {
            for (var e = this.parseMul(); this.skipValue(Vt.TOKEN_OPERATOR, "-"); ) {
                var t = this.parseMul();
                e = new hr.Sub(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseMul = function() {
            for (var e = this.parseDiv(); this.skipValue(Vt.TOKEN_OPERATOR, "*"); ) {
                var t = this.parseDiv();
                e = new hr.Mul(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseDiv = function() {
            for (var e = this.parseFloorDiv(); this.skipValue(Vt.TOKEN_OPERATOR, "/"); ) {
                var t = this.parseFloorDiv();
                e = new hr.Div(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseFloorDiv = function() {
            for (var e = this.parseMod(); this.skipValue(Vt.TOKEN_OPERATOR, "//"); ) {
                var t = this.parseMod();
                e = new hr.FloorDiv(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseMod = function() {
            for (var e = this.parsePow(); this.skipValue(Vt.TOKEN_OPERATOR, "%"); ) {
                var t = this.parsePow();
                e = new hr.Mod(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parsePow = function() {
            for (var e = this.parseUnary(); this.skipValue(Vt.TOKEN_OPERATOR, "**"); ) {
                var t = this.parseUnary();
                e = new hr.Pow(e.lineno,e.colno,e,t)
            }
            return e
        }
        ,
        i.parseUnary = function(e) {
            var t, n = this.peekToken();
            return t = this.skipValue(Vt.TOKEN_OPERATOR, "-") ? new hr.Neg(n.lineno,n.colno,this.parseUnary(!0)) : this.skipValue(Vt.TOKEN_OPERATOR, "+") ? new hr.Pos(n.lineno,n.colno,this.parseUnary(!0)) : this.parsePrimary(),
            e || (t = this.parseFilter(t)),
                t
        }
        ,
        i.parsePrimary = function(e) {
            var t, n = this.nextToken(), r = null;
            if (n ? n.type === Vt.TOKEN_STRING ? t = n.value : n.type === Vt.TOKEN_INT ? t = parseInt(n.value, 10) : n.type === Vt.TOKEN_FLOAT ? t = parseFloat(n.value) : n.type === Vt.TOKEN_BOOLEAN ? "true" === n.value ? t = !0 : "false" === n.value ? t = !1 : this.fail("invalid boolean: " + n.value, n.lineno, n.colno) : n.type === Vt.TOKEN_NONE ? t = null : n.type === Vt.TOKEN_REGEX && (t = new RegExp(n.value.body,n.value.flags)) : this.fail("expected expression, got end of file"),
                void 0 !== t ? r = new hr.Literal(n.lineno,n.colno,t) : n.type === Vt.TOKEN_SYMBOL ? r = new hr.Symbol(n.lineno,n.colno,n.value) : (this.pushToken(n),
                    r = this.parseAggregate()),
            e || (r = this.parsePostfix(r)),
                r)
                return r;
            throw this.error("unexpected token: " + n.value, n.lineno, n.colno)
        }
        ,
        i.parseFilterName = function() {
            for (var e = this.expect(Vt.TOKEN_SYMBOL), t = e.value; this.skipValue(Vt.TOKEN_OPERATOR, "."); )
                t += "." + this.expect(Vt.TOKEN_SYMBOL).value;
            return new hr.Symbol(e.lineno,e.colno,t)
        }
        ,
        i.parseFilterArgs = function(e) {
            return this.peekToken().type === Vt.TOKEN_LEFT_PAREN ? this.parsePostfix(e).args.children : []
        }
        ,
        i.parseFilter = function(e) {
            for (; this.skip(Vt.TOKEN_PIPE); ) {
                var t = this.parseFilterName();
                e = new hr.Filter(t.lineno,t.colno,t,new hr.NodeList(t.lineno,t.colno,[e].concat(this.parseFilterArgs(e))))
            }
            return e
        }
        ,
        i.parseFilterStatement = function() {
            var e = this.peekToken();
            this.skipSymbol("filter") || this.fail("parseFilterStatement: expected filter");
            var t = this.parseFilterName()
                , n = this.parseFilterArgs(t);
            this.advanceAfterBlockEnd(e.value);
            var r = new hr.Capture(t.lineno,t.colno,this.parseUntilBlocks("endfilter"));
            this.advanceAfterBlockEnd();
            var i = new hr.Filter(t.lineno,t.colno,t,new hr.NodeList(t.lineno,t.colno,[r].concat(n)));
            return new hr.Output(t.lineno,t.colno,[i])
        }
        ,
        i.parseAggregate = function() {
            var e, t = this.nextToken();
            switch (t.type) {
                case Vt.TOKEN_LEFT_PAREN:
                    e = new hr.Group(t.lineno,t.colno);
                    break;
                case Vt.TOKEN_LEFT_BRACKET:
                    e = new hr.Array(t.lineno,t.colno);
                    break;
                case Vt.TOKEN_LEFT_CURLY:
                    e = new hr.Dict(t.lineno,t.colno);
                    break;
                default:
                    return null
            }
            for (; ; ) {
                var n = this.peekToken().type;
                if (n === Vt.TOKEN_RIGHT_PAREN || n === Vt.TOKEN_RIGHT_BRACKET || n === Vt.TOKEN_RIGHT_CURLY) {
                    this.nextToken();
                    break
                }
                if (e.children.length > 0 && (this.skip(Vt.TOKEN_COMMA) || this.fail("parseAggregate: expected comma after expression", t.lineno, t.colno)),
                e instanceof hr.Dict) {
                    var r = this.parsePrimary();
                    this.skip(Vt.TOKEN_COLON) || this.fail("parseAggregate: expected colon after dict key", t.lineno, t.colno);
                    var i = this.parseExpression();
                    e.addChild(new hr.Pair(r.lineno,r.colno,r,i))
                } else {
                    var s = this.parseExpression();
                    e.addChild(s)
                }
            }
            return e
        }
        ,
        i.parseSignature = function(e, t) {
            var n = this.peekToken();
            if (!t && n.type !== Vt.TOKEN_LEFT_PAREN) {
                if (e)
                    return null;
                this.fail("expected arguments", n.lineno, n.colno)
            }
            n.type === Vt.TOKEN_LEFT_PAREN && (n = this.nextToken());
            for (var r = new hr.NodeList(n.lineno,n.colno), i = new hr.KeywordArgs(n.lineno,n.colno), s = !1; ; ) {
                if (n = this.peekToken(),
                !t && n.type === Vt.TOKEN_RIGHT_PAREN) {
                    this.nextToken();
                    break
                }
                if (t && n.type === Vt.TOKEN_BLOCK_END)
                    break;
                if (s && !this.skip(Vt.TOKEN_COMMA))
                    this.fail("parseSignature: expected comma after expression", n.lineno, n.colno);
                else {
                    var a = this.parseExpression();
                    this.skipValue(Vt.TOKEN_OPERATOR, "=") ? i.addChild(new hr.Pair(a.lineno,a.colno,a,this.parseExpression())) : r.addChild(a)
                }
                s = !0
            }
            return i.children.length && r.addChild(i),
                r
        }
        ,
        i.parseUntilBlocks = function() {
            for (var e = this.breakOnBlocks, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                n[r] = arguments[r];
            this.breakOnBlocks = n;
            var i = this.parse();
            return this.breakOnBlocks = e,
                i
        }
        ,
        i.parseNodes = function() {
            for (var e, t = []; e = this.nextToken(); )
                if (e.type === Vt.TOKEN_DATA) {
                    var n = e.value
                        , r = this.peekToken()
                        , i = r && r.value;
                    this.dropLeadingWhitespace && (n = n.replace(/^\s*/, ""),
                        this.dropLeadingWhitespace = !1),
                    r && (r.type === Vt.TOKEN_BLOCK_START && "-" === i.charAt(i.length - 1) || r.type === Vt.TOKEN_VARIABLE_START && "-" === i.charAt(this.tokens.tags.VARIABLE_START.length) || r.type === Vt.TOKEN_COMMENT && "-" === i.charAt(this.tokens.tags.COMMENT_START.length)) && (n = n.replace(/\s*$/, "")),
                        t.push(new hr.Output(e.lineno,e.colno,[new hr.TemplateData(e.lineno,e.colno,n)]))
                } else if (e.type === Vt.TOKEN_BLOCK_START) {
                    this.dropLeadingWhitespace = !1;
                    var s = this.parseStatement();
                    if (!s)
                        break;
                    t.push(s)
                } else if (e.type === Vt.TOKEN_VARIABLE_START) {
                    var a = this.parseExpression();
                    this.dropLeadingWhitespace = !1,
                        this.advanceAfterVariableEnd(),
                        t.push(new hr.Output(e.lineno,e.colno,[a]))
                } else
                    e.type === Vt.TOKEN_COMMENT ? this.dropLeadingWhitespace = "-" === e.value.charAt(e.value.length - this.tokens.tags.COMMENT_END.length - 1) : this.fail("Unexpected token at top-level: " + e.type, e.lineno, e.colno);
            return t
        }
        ,
        i.parse = function() {
            return new hr.NodeList(0,0,this.parseNodes())
        }
        ,
        i.parseAsRoot = function() {
            return new hr.Root(0,0,this.parseNodes())
        }
        ,
        r
}(en.Obj)
    , fr = {
    parse: function(e, t, n) {
        var r = new pr(Vt.lex(e, n));
        return void 0 !== t && (r.extensions = t),
            r.parseAsRoot()
    },
    Parser: pr
}
    , dr = 0;
function Er() {
    return "hole_" + dr++
}
function mr(e, t) {
    for (var n = null, r = 0; r < e.length; r++) {
        var i = t(e[r]);
        i !== e[r] && (n || (n = e.slice()),
            n[r] = i)
    }
    return n || e
}
function Tr(e, t, n) {
    if (!(e instanceof hr.Node))
        return e;
    if (!n) {
        var r = t(e);
        if (r && r !== e)
            return r
    }
    if (e instanceof hr.NodeList) {
        var i = mr(e.children, (function(e) {
                return Tr(e, t, n)
            }
        ));
        i !== e.children && (e = new hr[e.typename](e.lineno,e.colno,i))
    } else if (e instanceof hr.CallExtension) {
        var s = Tr(e.args, t, n)
            , a = mr(e.contentArgs, (function(e) {
                return Tr(e, t, n)
            }
        ));
        s === e.args && a === e.contentArgs || (e = new hr[e.typename](e.extName,e.prop,s,a))
    } else {
        var o = e.fields.map((function(t) {
                return e[t]
            }
        ))
            , c = mr(o, (function(e) {
                return Tr(e, t, n)
            }
        ));
        c !== o && (e = new hr[e.typename](e.lineno,e.colno),
            c.forEach((function(t, n) {
                    e[e.fields[n]] = t
                }
            )))
    }
    return n && t(e) || e
}
function _r(e, t) {
    return Tr(e, t, !0)
}
function Ar(e, t, n) {
    var r = []
        , i = _r(n ? e[n] : e, (function(e) {
            var n;
            return e instanceof hr.Block ? e : ((e instanceof hr.Filter && -1 !== je.indexOf(t, e.name.value) || e instanceof hr.CallExtensionAsync) && (n = new hr.Symbol(e.lineno,e.colno,Er()),
                r.push(new hr.FilterAsync(e.lineno,e.colno,e.name,e.args,n))),
                n)
        }
    ));
    return n ? e[n] = i : e = i,
        r.length ? (r.push(e),
            new hr.NodeList(e.lineno,e.colno,r)) : e
}
function gr(e, t) {
    return function(e) {
        return _r(e, (function(e) {
                if (e instanceof hr.If || e instanceof hr.For) {
                    var t = !1;
                    if (Tr(e, (function(e) {
                            if (e instanceof hr.FilterAsync || e instanceof hr.IfAsync || e instanceof hr.AsyncEach || e instanceof hr.AsyncAll || e instanceof hr.CallExtensionAsync)
                                return t = !0,
                                    e
                        }
                    )),
                        t) {
                        if (e instanceof hr.If)
                            return new hr.IfAsync(e.lineno,e.colno,e.cond,e.body,e.else_);
                        if (e instanceof hr.For && !(e instanceof hr.AsyncAll))
                            return new hr.AsyncEach(e.lineno,e.colno,e.arr,e.name,e.body,e.else_)
                    }
                }
            }
        ))
    }(function(e) {
        return Tr(e, (function(e) {
                if (e instanceof hr.Block) {
                    var t = !1
                        , n = Er();
                    e.body = Tr(e.body, (function(e) {
                            if (e instanceof hr.FunCall && "super" === e.name.value)
                                return t = !0,
                                    new hr.Symbol(e.lineno,e.colno,n)
                        }
                    )),
                    t && e.body.children.unshift(new hr.Super(0,0,e.name,new hr.Symbol(0,0,n)))
                }
            }
        ))
    }(function(e, t) {
        return _r(e, (function(e) {
                return e instanceof hr.Output ? Ar(e, t) : e instanceof hr.Set ? Ar(e, t, "value") : e instanceof hr.For ? Ar(e, t, "arr") : e instanceof hr.If ? Ar(e, t, "cond") : e instanceof hr.CallExtension ? Ar(e, t, "args") : void 0
            }
        ))
    }(e, t)))
}
var Nr = {
    transform: function(e, t) {
        return gr(e, t || [])
    }
}
    , Cr = Array.from
    , Ir = "function" == typeof Symbol && Symbol.iterator && "function" == typeof Cr
    , Sr = function() {
    function e(e, t) {
        this.variables = Object.create(null),
            this.parent = e,
            this.topLevel = !1,
            this.isolateWrites = t
    }
    var t = e.prototype;
    return t.set = function(e, t, n) {
        var r = e.split(".")
            , i = this.variables
            , s = this;
        if (n && (s = this.resolve(r[0], !0)))
            s.set(e, t);
        else {
            for (var a = 0; a < r.length - 1; a++) {
                var o = r[a];
                i[o] || (i[o] = {}),
                    i = i[o]
            }
            i[r[r.length - 1]] = t
        }
    }
        ,
        t.get = function(e) {
            var t = this.variables[e];
            return void 0 !== t ? t : null
        }
        ,
        t.lookup = function(e) {
            var t = this.parent
                , n = this.variables[e];
            return void 0 !== n ? n : t && t.lookup(e)
        }
        ,
        t.resolve = function(e, t) {
            var n = t && this.isolateWrites ? void 0 : this.parent;
            return void 0 !== this.variables[e] ? this : n && n.resolve(e)
        }
        ,
        t.push = function(t) {
            return new e(this,t)
        }
        ,
        t.pop = function() {
            return this.parent
        }
        ,
        e
}();
function br(e) {
    return e && Object.prototype.hasOwnProperty.call(e, "__keywords")
}
function Or(e) {
    var t = e.length;
    if (t) {
        var n = e[t - 1];
        if (br(n))
            return n
    }
    return {}
}
function yr(e) {
    var t = e.length;
    return 0 === t ? 0 : br(e[t - 1]) ? t - 1 : t
}
function Lr(e) {
    if ("string" != typeof e)
        return e;
    this.val = e,
        Object.defineProperty(this, "length", {
            writable: !0,
            configurable: !0,
            value: e.length
        })
}
Lr.prototype = Object.create(String.prototype, {
    length: {
        writable: !0,
        configurable: !0,
        value: 0
    }
}),
    Lr.prototype.valueOf = function() {
        return this.val
    }
    ,
    Lr.prototype.toString = function() {
        return this.val
    }
;
var kr = {
    Frame: Sr,
    makeMacro: function(e, t, n) {
        return function() {
            for (var r = arguments.length, i = new Array(r), s = 0; s < r; s++)
                i[s] = arguments[s];
            var a, o = yr(i), c = Or(i);
            if (o > e.length)
                a = i.slice(0, e.length),
                    i.slice(a.length, o).forEach((function(e, n) {
                            n < t.length && (c[t[n]] = e)
                        }
                    )),
                    a.push(c);
            else if (o < e.length) {
                a = i.slice(0, o);
                for (var l = o; l < e.length; l++) {
                    var h = e[l];
                    a.push(c[h]),
                        delete c[h]
                }
                a.push(c)
            } else
                a = i;
            return n.apply(this, a)
        }
    },
    makeKeywordArgs: function(e) {
        return e.__keywords = !0,
            e
    },
    numArgs: yr,
    suppressValue: function(e, t) {
        return "object" == typeof (e = null != e ? e : "") ? new Lr(JSON.stringify(e).toString()) : (!t || e instanceof Lr || (e = je.escape(e.toString())),
            e)
    },
    ensureDefined: function(e, t, n) {
        if (null == e)
            throw new je.TemplateError("attempted to output null or undefined value",t + 1,n + 1);
        return e
    },
    memberLookup: function(e, t) {
        if (null != e)
            return "function" == typeof e[t] ? function() {
                    for (var n = arguments.length, r = new Array(n), i = 0; i < n; i++)
                        r[i] = arguments[i];
                    return e[t].apply(e, r)
                }
                : e[t]
    },
    contextOrFrameLookup: function(e, t, n) {
        var r = t.lookup(n);
        return void 0 !== r ? r : e.lookup(n)
    },
    callWrap: function(e, t, n, r) {
        if (!e)
            throw new Error("Unable to call `" + t + "`, which is undefined or falsey");
        if ("function" != typeof e)
            throw new Error("Unable to call `" + t + "`, which is not a function");
        return e.apply(n, r)
    },
    handleError: function(e, t, n) {
        return e.lineno ? e : new je.TemplateError(e,t,n)
    },
    isArray: je.isArray,
    keys: je.keys,
    SafeString: Lr,
    copySafeness: function(e, t) {
        return e instanceof Lr ? new Lr(t) : t.toString()
    },
    markSafe: function(e) {
        var t = typeof e;
        return "string" === t ? new Lr(e) : "function" !== t ? e : function(t) {
            var n = e.apply(this, arguments);
            return "string" == typeof n ? new Lr(n) : n
        }
    },
    asyncEach: function(e, t, n, r) {
        if (je.isArray(e)) {
            var i = e.length;
            je.asyncIter(e, (function(e, r, s) {
                    switch (t) {
                        case 1:
                            n(e, r, i, s);
                            break;
                        case 2:
                            n(e[0], e[1], r, i, s);
                            break;
                        case 3:
                            n(e[0], e[1], e[2], r, i, s);
                            break;
                        default:
                            e.push(r, i, s),
                                n.apply(this, e)
                    }
                }
            ), r)
        } else
            je.asyncFor(e, (function(e, t, r, i, s) {
                    n(e, t, r, i, s)
                }
            ), r)
    },
    asyncAll: function(e, t, n, r) {
        var i, s, a = 0;
        function o(e, t) {
            a++,
                s[e] = t,
            a === i && r(null, s.join(""))
        }
        if (je.isArray(e))
            if (i = e.length,
                s = new Array(i),
            0 === i)
                r(null, "");
            else
                for (var c = 0; c < e.length; c++) {
                    var l = e[c];
                    switch (t) {
                        case 1:
                            n(l, c, i, o);
                            break;
                        case 2:
                            n(l[0], l[1], c, i, o);
                            break;
                        case 3:
                            n(l[0], l[1], l[2], c, i, o);
                            break;
                        default:
                            l.push(c, i, o),
                                n.apply(this, l)
                    }
                }
        else {
            var h = je.keys(e || {});
            if (i = h.length,
                s = new Array(i),
            0 === i)
                r(null, "");
            else
                for (var u = 0; u < h.length; u++) {
                    var p = h[u];
                    n(p, e[p], u, i, o)
                }
        }
    },
    inOperator: je.inOperator,
    fromIterator: function(e) {
        return "object" != typeof e || null === e || je.isArray(e) ? e : Ir && Symbol.iterator in e ? Cr(e) : e
    }
};
function vr(e, t) {
    return vr = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        vr(e, t)
}
kr.Frame,
    kr.makeMacro,
    kr.makeKeywordArgs,
    kr.numArgs,
    kr.suppressValue,
    kr.ensureDefined,
    kr.memberLookup,
    kr.contextOrFrameLookup,
    kr.callWrap,
    kr.handleError,
    kr.isArray,
    kr.keys,
    kr.SafeString,
    kr.copySafeness,
    kr.markSafe,
    kr.asyncEach,
    kr.asyncAll,
    kr.inOperator,
    kr.fromIterator;
var Dr = je.TemplateError
    , Rr = kr.Frame
    , Mr = {
    "==": "==",
    "===": "===",
    "!=": "!=",
    "!==": "!==",
    "<": "<",
    ">": ">",
    "<=": "<=",
    ">=": ">="
}
    , Pr = function(e) {
    var t, n;
    function r() {
        return e.apply(this, arguments) || this
    }
    n = e,
        (t = r).prototype = Object.create(n.prototype),
        t.prototype.constructor = t,
        vr(t, n);
    var i = r.prototype;
    return i.init = function(e, t) {
        this.templateName = e,
            this.codebuf = [],
            this.lastId = 0,
            this.buffer = null,
            this.bufferStack = [],
            this._scopeClosers = "",
            this.inBlock = !1,
            this.throwOnUndefined = t
    }
        ,
        i.fail = function(e, t, n) {
            throw void 0 !== t && (t += 1),
            void 0 !== n && (n += 1),
                new Dr(e,t,n)
        }
        ,
        i._pushBuffer = function() {
            var e = this._tmpid();
            return this.bufferStack.push(this.buffer),
                this.buffer = e,
                this._emit("var " + this.buffer + ' = "";'),
                e
        }
        ,
        i._popBuffer = function() {
            this.buffer = this.bufferStack.pop()
        }
        ,
        i._emit = function(e) {
            this.codebuf.push(e)
        }
        ,
        i._emitLine = function(e) {
            this._emit(e + "\n")
        }
        ,
        i._emitLines = function() {
            for (var e = this, t = arguments.length, n = new Array(t), r = 0; r < t; r++)
                n[r] = arguments[r];
            n.forEach((function(t) {
                    return e._emitLine(t)
                }
            ))
        }
        ,
        i._emitFuncBegin = function(e, t) {
            this.buffer = "output",
                this._scopeClosers = "",
                this._emitLine("function " + t + "(env, context, frame, runtime, cb) {"),
                this._emitLine("var lineno = " + e.lineno + ";"),
                this._emitLine("var colno = " + e.colno + ";"),
                this._emitLine("var " + this.buffer + ' = "";'),
                this._emitLine("try {")
        }
        ,
        i._emitFuncEnd = function(e) {
            e || this._emitLine("cb(null, " + this.buffer + ");"),
                this._closeScopeLevels(),
                this._emitLine("} catch (e) {"),
                this._emitLine("  cb(runtime.handleError(e, lineno, colno));"),
                this._emitLine("}"),
                this._emitLine("}"),
                this.buffer = null
        }
        ,
        i._addScopeLevel = function() {
            this._scopeClosers += "})"
        }
        ,
        i._closeScopeLevels = function() {
            this._emitLine(this._scopeClosers + ";"),
                this._scopeClosers = ""
        }
        ,
        i._withScopedSyntax = function(e) {
            var t = this._scopeClosers;
            this._scopeClosers = "",
                e.call(this),
                this._closeScopeLevels(),
                this._scopeClosers = t
        }
        ,
        i._makeCallback = function(e) {
            var t = this._tmpid();
            return "function(" + t + (e ? "," + e : "") + ") {\nif(" + t + ") { cb(" + t + "); return; }"
        }
        ,
        i._tmpid = function() {
            return this.lastId++,
            "t_" + this.lastId
        }
        ,
        i._templateName = function() {
            return null == this.templateName ? "undefined" : JSON.stringify(this.templateName)
        }
        ,
        i._compileChildren = function(e, t) {
            var n = this;
            e.children.forEach((function(e) {
                    n.compile(e, t)
                }
            ))
        }
        ,
        i._compileAggregate = function(e, t, n, r) {
            var i = this;
            n && this._emit(n),
                e.children.forEach((function(e, n) {
                        n > 0 && i._emit(","),
                            i.compile(e, t)
                    }
                )),
            r && this._emit(r)
        }
        ,
        i._compileExpression = function(e, t) {
            this.assertType(e, hr.Literal, hr.Symbol, hr.Group, hr.Array, hr.Dict, hr.FunCall, hr.Caller, hr.Filter, hr.LookupVal, hr.Compare, hr.InlineIf, hr.In, hr.Is, hr.And, hr.Or, hr.Not, hr.Add, hr.Concat, hr.Sub, hr.Mul, hr.Div, hr.FloorDiv, hr.Mod, hr.Pow, hr.Neg, hr.Pos, hr.Compare, hr.NodeList),
                this.compile(e, t)
        }
        ,
        i.assertType = function(e) {
            for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++)
                n[r - 1] = arguments[r];
            n.some((function(t) {
                    return e instanceof t
                }
            )) || this.fail("assertType: invalid type: " + e.typename, e.lineno, e.colno)
        }
        ,
        i.compileCallExtension = function(e, t, n) {
            var r = this
                , i = e.args
                , s = e.contentArgs
                , a = "boolean" != typeof e.autoescape || e.autoescape;
            if (n || this._emit(this.buffer + " += runtime.suppressValue("),
                this._emit('env.getExtension("' + e.extName + '")["' + e.prop + '"]('),
                this._emit("context"),
            (i || s) && this._emit(","),
            i && (i instanceof hr.NodeList || this.fail("compileCallExtension: arguments must be a NodeList, use `parser.parseSignature`"),
                i.children.forEach((function(e, n) {
                        r._compileExpression(e, t),
                        (n !== i.children.length - 1 || s.length) && r._emit(",")
                    }
                ))),
            s.length && s.forEach((function(e, n) {
                    if (n > 0 && r._emit(","),
                        e) {
                        r._emitLine("function(cb) {"),
                            r._emitLine("if(!cb) { cb = function(err) { if(err) { throw err; }}}");
                        var i = r._pushBuffer();
                        r._withScopedSyntax((function() {
                                r.compile(e, t),
                                    r._emitLine("cb(null, " + i + ");")
                            }
                        )),
                            r._popBuffer(),
                            r._emitLine("return " + i + ";"),
                            r._emitLine("}")
                    } else
                        r._emit("null")
                }
            )),
                n) {
                var o = this._tmpid();
                this._emitLine(", " + this._makeCallback(o)),
                    this._emitLine(this.buffer + " += runtime.suppressValue(" + o + ", " + a + " && env.opts.autoescape);"),
                    this._addScopeLevel()
            } else
                this._emit(")"),
                    this._emit(", " + a + " && env.opts.autoescape);\n")
        }
        ,
        i.compileCallExtensionAsync = function(e, t) {
            this.compileCallExtension(e, t, !0)
        }
        ,
        i.compileNodeList = function(e, t) {
            this._compileChildren(e, t)
        }
        ,
        i.compileLiteral = function(e) {
            if ("string" == typeof e.value) {
                var t = e.value.replace(/\\/g, "\\\\");
                t = (t = (t = (t = (t = t.replace(/"/g, '\\"')).replace(/\n/g, "\\n")).replace(/\r/g, "\\r")).replace(/\t/g, "\\t")).replace(/\u2028/g, "\\u2028"),
                    this._emit('"' + t + '"')
            } else
                null === e.value ? this._emit("null") : this._emit(e.value.toString())
        }
        ,
        i.compileSymbol = function(e, t) {
            var n = e.value
                , r = t.lookup(n);
            r ? this._emit(r) : this._emit('runtime.contextOrFrameLookup(context, frame, "' + n + '")')
        }
        ,
        i.compileGroup = function(e, t) {
            this._compileAggregate(e, t, "(", ")")
        }
        ,
        i.compileArray = function(e, t) {
            this._compileAggregate(e, t, "[", "]")
        }
        ,
        i.compileDict = function(e, t) {
            this._compileAggregate(e, t, "{", "}")
        }
        ,
        i.compilePair = function(e, t) {
            var n = e.key
                , r = e.value;
            n instanceof hr.Symbol ? n = new hr.Literal(n.lineno,n.colno,n.value) : n instanceof hr.Literal && "string" == typeof n.value || this.fail("compilePair: Dict keys must be strings or names", n.lineno, n.colno),
                this.compile(n, t),
                this._emit(": "),
                this._compileExpression(r, t)
        }
        ,
        i.compileInlineIf = function(e, t) {
            this._emit("("),
                this.compile(e.cond, t),
                this._emit("?"),
                this.compile(e.body, t),
                this._emit(":"),
                null !== e.else_ ? this.compile(e.else_, t) : this._emit('""'),
                this._emit(")")
        }
        ,
        i.compileIn = function(e, t) {
            this._emit("runtime.inOperator("),
                this.compile(e.left, t),
                this._emit(","),
                this.compile(e.right, t),
                this._emit(")")
        }
        ,
        i.compileIs = function(e, t) {
            var n = e.right.name ? e.right.name.value : e.right.value;
            this._emit('env.getTest("' + n + '").call(context, '),
                this.compile(e.left, t),
            e.right.args && (this._emit(","),
                this.compile(e.right.args, t)),
                this._emit(") === true")
        }
        ,
        i._binOpEmitter = function(e, t, n) {
            this.compile(e.left, t),
                this._emit(n),
                this.compile(e.right, t)
        }
        ,
        i.compileOr = function(e, t) {
            return this._binOpEmitter(e, t, " || ")
        }
        ,
        i.compileAnd = function(e, t) {
            return this._binOpEmitter(e, t, " && ")
        }
        ,
        i.compileAdd = function(e, t) {
            return this._binOpEmitter(e, t, " + ")
        }
        ,
        i.compileConcat = function(e, t) {
            return this._binOpEmitter(e, t, ' + "" + ')
        }
        ,
        i.compileSub = function(e, t) {
            return this._binOpEmitter(e, t, " - ")
        }
        ,
        i.compileMul = function(e, t) {
            return this._binOpEmitter(e, t, " * ")
        }
        ,
        i.compileDiv = function(e, t) {
            return this._binOpEmitter(e, t, " / ")
        }
        ,
        i.compileMod = function(e, t) {
            return this._binOpEmitter(e, t, " % ")
        }
        ,
        i.compileNot = function(e, t) {
            this._emit("!"),
                this.compile(e.target, t)
        }
        ,
        i.compileFloorDiv = function(e, t) {
            this._emit("Math.floor("),
                this.compile(e.left, t),
                this._emit(" / "),
                this.compile(e.right, t),
                this._emit(")")
        }
        ,
        i.compilePow = function(e, t) {
            this._emit("Math.pow("),
                this.compile(e.left, t),
                this._emit(", "),
                this.compile(e.right, t),
                this._emit(")")
        }
        ,
        i.compileNeg = function(e, t) {
            this._emit("-"),
                this.compile(e.target, t)
        }
        ,
        i.compilePos = function(e, t) {
            this._emit("+"),
                this.compile(e.target, t)
        }
        ,
        i.compileCompare = function(e, t) {
            var n = this;
            this.compile(e.expr, t),
                e.ops.forEach((function(e) {
                        n._emit(" " + Mr[e.type] + " "),
                            n.compile(e.expr, t)
                    }
                ))
        }
        ,
        i.compileLookupVal = function(e, t) {
            this._emit("runtime.memberLookup(("),
                this._compileExpression(e.target, t),
                this._emit("),"),
                this._compileExpression(e.val, t),
                this._emit(")")
        }
        ,
        i._getNodeName = function(e) {
            switch (e.typename) {
                case "Symbol":
                    return e.value;
                case "FunCall":
                    return "the return value of (" + this._getNodeName(e.name) + ")";
                case "LookupVal":
                    return this._getNodeName(e.target) + '["' + this._getNodeName(e.val) + '"]';
                case "Literal":
                    return e.value.toString();
                default:
                    return "--expression--"
            }
        }
        ,
        i.compileFunCall = function(e, t) {
            this._emit("(lineno = " + e.lineno + ", colno = " + e.colno + ", "),
                this._emit("runtime.callWrap("),
                this._compileExpression(e.name, t),
                this._emit(', "' + this._getNodeName(e.name).replace(/"/g, '\\"') + '", context, '),
                this._compileAggregate(e.args, t, "[", "])"),
                this._emit(")")
        }
        ,
        i.compileFilter = function(e, t) {
            var n = e.name;
            this.assertType(n, hr.Symbol),
                this._emit('env.getFilter("' + n.value + '").call(context, '),
                this._compileAggregate(e.args, t),
                this._emit(")")
        }
        ,
        i.compileFilterAsync = function(e, t) {
            var n = e.name
                , r = e.symbol.value;
            this.assertType(n, hr.Symbol),
                t.set(r, r),
                this._emit('env.getFilter("' + n.value + '").call(context, '),
                this._compileAggregate(e.args, t),
                this._emitLine(", " + this._makeCallback(r)),
                this._addScopeLevel()
        }
        ,
        i.compileKeywordArgs = function(e, t) {
            this._emit("runtime.makeKeywordArgs("),
                this.compileDict(e, t),
                this._emit(")")
        }
        ,
        i.compileSet = function(e, t) {
            var n = this
                , r = [];
            e.targets.forEach((function(e) {
                    var i = e.value
                        , s = t.lookup(i);
                    null == s && (s = n._tmpid(),
                        n._emitLine("var " + s + ";")),
                        r.push(s)
                }
            )),
                e.value ? (this._emit(r.join(" = ") + " = "),
                    this._compileExpression(e.value, t),
                    this._emitLine(";")) : (this._emit(r.join(" = ") + " = "),
                    this.compile(e.body, t),
                    this._emitLine(";")),
                e.targets.forEach((function(e, t) {
                        var i = r[t]
                            , s = e.value;
                        n._emitLine('frame.set("' + s + '", ' + i + ", true);"),
                            n._emitLine("if(frame.topLevel) {"),
                            n._emitLine('context.setVariable("' + s + '", ' + i + ");"),
                            n._emitLine("}"),
                        "_" !== s.charAt(0) && (n._emitLine("if(frame.topLevel) {"),
                            n._emitLine('context.addExport("' + s + '", ' + i + ");"),
                            n._emitLine("}"))
                    }
                ))
        }
        ,
        i.compileSwitch = function(e, t) {
            var n = this;
            this._emit("switch ("),
                this.compile(e.expr, t),
                this._emit(") {"),
                e.cases.forEach((function(e, r) {
                        n._emit("case "),
                            n.compile(e.cond, t),
                            n._emit(": "),
                            n.compile(e.body, t),
                        e.body.children.length && n._emitLine("break;")
                    }
                )),
            e.default && (this._emit("default:"),
                this.compile(e.default, t)),
                this._emit("}")
        }
        ,
        i.compileIf = function(e, t, n) {
            var r = this;
            this._emit("if("),
                this._compileExpression(e.cond, t),
                this._emitLine(") {"),
                this._withScopedSyntax((function() {
                        r.compile(e.body, t),
                        n && r._emit("cb()")
                    }
                )),
                e.else_ ? (this._emitLine("}\nelse {"),
                    this._withScopedSyntax((function() {
                            r.compile(e.else_, t),
                            n && r._emit("cb()")
                        }
                    ))) : n && (this._emitLine("}\nelse {"),
                    this._emit("cb()")),
                this._emitLine("}")
        }
        ,
        i.compileIfAsync = function(e, t) {
            this._emit("(function(cb) {"),
                this.compileIf(e, t, !0),
                this._emit("})(" + this._makeCallback()),
                this._addScopeLevel()
        }
        ,
        i._emitLoopBindings = function(e, t, n, r) {
            var i = this;
            [{
                name: "index",
                val: n + " + 1"
            }, {
                name: "index0",
                val: n
            }, {
                name: "revindex",
                val: r + " - " + n
            }, {
                name: "revindex0",
                val: r + " - " + n + " - 1"
            }, {
                name: "first",
                val: n + " === 0"
            }, {
                name: "last",
                val: n + " === " + r + " - 1"
            }, {
                name: "length",
                val: r
            }].forEach((function(e) {
                    i._emitLine('frame.set("loop.' + e.name + '", ' + e.val + ");")
                }
            ))
        }
        ,
        i.compileFor = function(e, t) {
            var n = this
                , r = this._tmpid()
                , i = this._tmpid()
                , s = this._tmpid();
            if (t = t.push(),
                this._emitLine("frame = frame.push();"),
                this._emit("var " + s + " = "),
                this._compileExpression(e.arr, t),
                this._emitLine(";"),
                this._emit("if(" + s + ") {"),
                this._emitLine(s + " = runtime.fromIterator(" + s + ");"),
            e.name instanceof hr.Array) {
                this._emitLine("var " + r + ";"),
                    this._emitLine("if(runtime.isArray(" + s + ")) {"),
                    this._emitLine("var " + i + " = " + s + ".length;"),
                    this._emitLine("for(" + r + "=0; " + r + " < " + s + ".length; " + r + "++) {"),
                    e.name.children.forEach((function(i, a) {
                            var o = n._tmpid();
                            n._emitLine("var " + o + " = " + s + "[" + r + "][" + a + "];"),
                                n._emitLine('frame.set("' + i + '", ' + s + "[" + r + "][" + a + "]);"),
                                t.set(e.name.children[a].value, o)
                        }
                    )),
                    this._emitLoopBindings(e, s, r, i),
                    this._withScopedSyntax((function() {
                            n.compile(e.body, t)
                        }
                    )),
                    this._emitLine("}"),
                    this._emitLine("} else {");
                var a = e.name.children
                    , o = a[0]
                    , c = a[1]
                    , l = this._tmpid()
                    , h = this._tmpid();
                t.set(o.value, l),
                    t.set(c.value, h),
                    this._emitLine(r + " = -1;"),
                    this._emitLine("var " + i + " = runtime.keys(" + s + ").length;"),
                    this._emitLine("for(var " + l + " in " + s + ") {"),
                    this._emitLine(r + "++;"),
                    this._emitLine("var " + h + " = " + s + "[" + l + "];"),
                    this._emitLine('frame.set("' + o.value + '", ' + l + ");"),
                    this._emitLine('frame.set("' + c.value + '", ' + h + ");"),
                    this._emitLoopBindings(e, s, r, i),
                    this._withScopedSyntax((function() {
                            n.compile(e.body, t)
                        }
                    )),
                    this._emitLine("}"),
                    this._emitLine("}")
            } else {
                var u = this._tmpid();
                t.set(e.name.value, u),
                    this._emitLine("var " + i + " = " + s + ".length;"),
                    this._emitLine("for(var " + r + "=0; " + r + " < " + s + ".length; " + r + "++) {"),
                    this._emitLine("var " + u + " = " + s + "[" + r + "];"),
                    this._emitLine('frame.set("' + e.name.value + '", ' + u + ");"),
                    this._emitLoopBindings(e, s, r, i),
                    this._withScopedSyntax((function() {
                            n.compile(e.body, t)
                        }
                    )),
                    this._emitLine("}")
            }
            this._emitLine("}"),
            e.else_ && (this._emitLine("if (!" + i + ") {"),
                this.compile(e.else_, t),
                this._emitLine("}")),
                this._emitLine("frame = frame.pop();")
        }
        ,
        i._compileAsyncLoop = function(e, t, n) {
            var r = this
                , i = this._tmpid()
                , s = this._tmpid()
                , a = this._tmpid()
                , o = n ? "asyncAll" : "asyncEach";
            if (t = t.push(),
                this._emitLine("frame = frame.push();"),
                this._emit("var " + a + " = runtime.fromIterator("),
                this._compileExpression(e.arr, t),
                this._emitLine(");"),
            e.name instanceof hr.Array) {
                var c = e.name.children.length;
                this._emit("runtime." + o + "(" + a + ", " + c + ", function("),
                    e.name.children.forEach((function(e) {
                            r._emit(e.value + ",")
                        }
                    )),
                    this._emit(i + "," + s + ",next) {"),
                    e.name.children.forEach((function(e) {
                            var n = e.value;
                            t.set(n, n),
                                r._emitLine('frame.set("' + n + '", ' + n + ");")
                        }
                    ))
            } else {
                var l = e.name.value;
                this._emitLine("runtime." + o + "(" + a + ", 1, function(" + l + ", " + i + ", " + s + ",next) {"),
                    this._emitLine('frame.set("' + l + '", ' + l + ");"),
                    t.set(l, l)
            }
            this._emitLoopBindings(e, a, i, s),
                this._withScopedSyntax((function() {
                        var s;
                        n && (s = r._pushBuffer()),
                            r.compile(e.body, t),
                            r._emitLine("next(" + i + (s ? "," + s : "") + ");"),
                        n && r._popBuffer()
                    }
                ));
            var h = this._tmpid();
            this._emitLine("}, " + this._makeCallback(h)),
                this._addScopeLevel(),
            n && this._emitLine(this.buffer + " += " + h + ";"),
            e.else_ && (this._emitLine("if (!" + a + ".length) {"),
                this.compile(e.else_, t),
                this._emitLine("}")),
                this._emitLine("frame = frame.pop();")
        }
        ,
        i.compileAsyncEach = function(e, t) {
            this._compileAsyncLoop(e, t)
        }
        ,
        i.compileAsyncAll = function(e, t) {
            this._compileAsyncLoop(e, t, !0)
        }
        ,
        i._compileMacro = function(e, t) {
            var n = this
                , r = []
                , i = null
                , s = "macro_" + this._tmpid()
                , a = void 0 !== t;
            e.args.children.forEach((function(t, s) {
                    s === e.args.children.length - 1 && t instanceof hr.Dict ? i = t : (n.assertType(t, hr.Symbol),
                        r.push(t))
                }
            ));
            var o, c = [].concat(r.map((function(e) {
                    return "l_" + e.value
                }
            )), ["kwargs"]), l = r.map((function(e) {
                    return '"' + e.value + '"'
                }
            )), h = (i && i.children || []).map((function(e) {
                    return '"' + e.key.value + '"'
                }
            ));
            o = a ? t.push(!0) : new Rr,
                this._emitLines("var " + s + " = runtime.makeMacro(", "[" + l.join(", ") + "], ", "[" + h.join(", ") + "], ", "function (" + c.join(", ") + ") {", "var callerFrame = frame;", "frame = " + (a ? "frame.push(true);" : "new runtime.Frame();"), "kwargs = kwargs || {};", 'if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {', 'frame.set("caller", kwargs.caller); }'),
                r.forEach((function(e) {
                        n._emitLine('frame.set("' + e.value + '", l_' + e.value + ");"),
                            o.set(e.value, "l_" + e.value)
                    }
                )),
            i && i.children.forEach((function(e) {
                    var t = e.key.value;
                    n._emit('frame.set("' + t + '", '),
                        n._emit('Object.prototype.hasOwnProperty.call(kwargs, "' + t + '")'),
                        n._emit(' ? kwargs["' + t + '"] : '),
                        n._compileExpression(e.value, o),
                        n._emit(");")
                }
            ));
            var u = this._pushBuffer();
            return this._withScopedSyntax((function() {
                    n.compile(e.body, o)
                }
            )),
                this._emitLine("frame = " + (a ? "frame.pop();" : "callerFrame;")),
                this._emitLine("return new runtime.SafeString(" + u + ");"),
                this._emitLine("});"),
                this._popBuffer(),
                s
        }
        ,
        i.compileMacro = function(e, t) {
            var n = this._compileMacro(e)
                , r = e.name.value;
            t.set(r, n),
                t.parent ? this._emitLine('frame.set("' + r + '", ' + n + ");") : ("_" !== e.name.value.charAt(0) && this._emitLine('context.addExport("' + r + '");'),
                    this._emitLine('context.setVariable("' + r + '", ' + n + ");"))
        }
        ,
        i.compileCaller = function(e, t) {
            this._emit("(function (){");
            var n = this._compileMacro(e, t);
            this._emit("return " + n + ";})()")
        }
        ,
        i._compileGetTemplate = function(e, t, n, r) {
            var i = this._tmpid()
                , s = this._templateName()
                , a = this._makeCallback(i)
                , o = n ? "true" : "false"
                , c = r ? "true" : "false";
            return this._emit("env.getTemplate("),
                this._compileExpression(e.template, t),
                this._emitLine(", " + o + ", " + s + ", " + c + ", " + a),
                i
        }
        ,
        i.compileImport = function(e, t) {
            var n = e.target.value
                , r = this._compileGetTemplate(e, t, !1, !1);
            this._addScopeLevel(),
                this._emitLine(r + ".getExported(" + (e.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(r)),
                this._addScopeLevel(),
                t.set(n, r),
                t.parent ? this._emitLine('frame.set("' + n + '", ' + r + ");") : this._emitLine('context.setVariable("' + n + '", ' + r + ");")
        }
        ,
        i.compileFromImport = function(e, t) {
            var n = this
                , r = this._compileGetTemplate(e, t, !1, !1);
            this._addScopeLevel(),
                this._emitLine(r + ".getExported(" + (e.withContext ? "context.getVariables(), frame, " : "") + this._makeCallback(r)),
                this._addScopeLevel(),
                e.names.children.forEach((function(e) {
                        var i, s, a = n._tmpid();
                        e instanceof hr.Pair ? (i = e.key.value,
                            s = e.value.value) : s = i = e.value,
                            n._emitLine("if(Object.prototype.hasOwnProperty.call(" + r + ', "' + i + '")) {'),
                            n._emitLine("var " + a + " = " + r + "." + i + ";"),
                            n._emitLine("} else {"),
                            n._emitLine("cb(new Error(\"cannot import '" + i + "'\")); return;"),
                            n._emitLine("}"),
                            t.set(s, a),
                            t.parent ? n._emitLine('frame.set("' + s + '", ' + a + ");") : n._emitLine('context.setVariable("' + s + '", ' + a + ");")
                    }
                ))
        }
        ,
        i.compileBlock = function(e) {
            var t = this._tmpid();
            this.inBlock || this._emit('(parentTemplate ? function(e, c, f, r, cb) { cb(""); } : '),
                this._emit('context.getBlock("' + e.name.value + '")'),
            this.inBlock || this._emit(")"),
                this._emitLine("(env, context, frame, runtime, " + this._makeCallback(t)),
                this._emitLine(this.buffer + " += " + t + ";"),
                this._addScopeLevel()
        }
        ,
        i.compileSuper = function(e, t) {
            var n = e.blockName.value
                , r = e.symbol.value
                , i = this._makeCallback(r);
            this._emitLine('context.getSuper(env, "' + n + '", b_' + n + ", frame, runtime, " + i),
                this._emitLine(r + " = runtime.markSafe(" + r + ");"),
                this._addScopeLevel(),
                t.set(r, r)
        }
        ,
        i.compileExtends = function(e, t) {
            var n = this._tmpid()
                , r = this._compileGetTemplate(e, t, !0, !1);
            this._emitLine("parentTemplate = " + r),
                this._emitLine("for(var " + n + " in parentTemplate.blocks) {"),
                this._emitLine("context.addBlock(" + n + ", parentTemplate.blocks[" + n + "]);"),
                this._emitLine("}"),
                this._addScopeLevel()
        }
        ,
        i.compileInclude = function(e, t) {
            this._emitLine("var tasks = [];"),
                this._emitLine("tasks.push("),
                this._emitLine("function(callback) {");
            var n = this._compileGetTemplate(e, t, !1, e.ignoreMissing);
            this._emitLine("callback(null," + n + ");});"),
                this._emitLine("});");
            var r = this._tmpid();
            this._emitLine("tasks.push("),
                this._emitLine("function(template, callback){"),
                this._emitLine("template.render(context.getVariables(), frame, " + this._makeCallback(r)),
                this._emitLine("callback(null," + r + ");});"),
                this._emitLine("});"),
                this._emitLine("tasks.push("),
                this._emitLine("function(result, callback){"),
                this._emitLine(this.buffer + " += result;"),
                this._emitLine("callback(null);"),
                this._emitLine("});"),
                this._emitLine("env.waterfall(tasks, function(){"),
                this._addScopeLevel()
        }
        ,
        i.compileTemplateData = function(e, t) {
            this.compileLiteral(e, t)
        }
        ,
        i.compileCapture = function(e, t) {
            var n = this
                , r = this.buffer;
            this.buffer = "output",
                this._emitLine("(function() {"),
                this._emitLine('var output = "";'),
                this._withScopedSyntax((function() {
                        n.compile(e.body, t)
                    }
                )),
                this._emitLine("return output;"),
                this._emitLine("})()"),
                this.buffer = r
        }
        ,
        i.compileOutput = function(e, t) {
            var n = this;
            e.children.forEach((function(r) {
                    r instanceof hr.TemplateData ? r.value && (n._emit(n.buffer + " += "),
                        n.compileLiteral(r, t),
                        n._emitLine(";")) : (n._emit(n.buffer + " += runtime.suppressValue("),
                    n.throwOnUndefined && n._emit("runtime.ensureDefined("),
                        n.compile(r, t),
                    n.throwOnUndefined && n._emit("," + e.lineno + "," + e.colno + ")"),
                        n._emit(", env.opts.autoescape);\n"))
                }
            ))
        }
        ,
        i.compileRoot = function(e, t) {
            var n = this;
            t && this.fail("compileRoot: root node can't have frame"),
                t = new Rr,
                this._emitFuncBegin(e, "root"),
                this._emitLine("var parentTemplate = null;"),
                this._compileChildren(e, t),
                this._emitLine("if(parentTemplate) {"),
                this._emitLine("parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);"),
                this._emitLine("} else {"),
                this._emitLine("cb(null, " + this.buffer + ");"),
                this._emitLine("}"),
                this._emitFuncEnd(!0),
                this.inBlock = !0;
            var r = []
                , i = e.findAll(hr.Block);
            i.forEach((function(e, t) {
                    var i = e.name.value;
                    if (-1 !== r.indexOf(i))
                        throw new Error('Block "' + i + '" defined more than once.');
                    r.push(i),
                        n._emitFuncBegin(e, "b_" + i);
                    var s = new Rr;
                    n._emitLine("var frame = frame.push(true);"),
                        n.compile(e.body, s),
                        n._emitFuncEnd()
                }
            )),
                this._emitLine("return {"),
                i.forEach((function(e, t) {
                        var r = "b_" + e.name.value;
                        n._emitLine(r + ": " + r + ",")
                    }
                )),
                this._emitLine("root: root\n};")
        }
        ,
        i.compile = function(e, t) {
            var n = this["compile" + e.typename];
            n ? n.call(this, e, t) : this.fail("compile: Cannot compile node: " + e.typename, e.lineno, e.colno)
        }
        ,
        i.getCode = function() {
            return this.codebuf.join("")
        }
        ,
        r
}(en.Obj)
    , xr = {
    compile: function(e, t, n, r, i) {
        void 0 === i && (i = {});
        var s = new Pr(r,i.throwOnUndefined)
            , a = (n || []).map((function(e) {
                return e.preprocess
            }
        )).filter((function(e) {
                return !!e
            }
        )).reduce((function(e, t) {
                return t(e)
            }
        ), e);
        return s.compile(Nr.transform(fr.parse(a, n, i), t, r)),
            s.getCode()
    },
    Compiler: Pr
}
    , wr = Ke((function(e) {
        var t = e.exports = {};
        function n(e, t) {
            return null == e || !1 === e ? t : e
        }
        function r(e) {
            return e != e
        }
        function i(e) {
            var t = (e = n(e, "")).toLowerCase();
            return kr.copySafeness(e, t.charAt(0).toUpperCase() + t.slice(1))
        }
        function s(e) {
            if (je.isString(e))
                return e.split("");
            if (je.isObject(e))
                return je._entries(e || {}).map((function(e) {
                        return {
                            key: e[0],
                            value: e[1]
                        }
                    }
                ));
            if (je.isArray(e))
                return e;
            throw new je.TemplateError("list filter: type not iterable")
        }
        function a(e) {
            return function(t, n, r) {
                void 0 === n && (n = "truthy");
                var i = this
                    , s = i.env.getTest(n);
                return je.toArray(t).filter((function(t) {
                        return s.call(i, t, r) === e
                    }
                ))
            }
        }
        function o(e) {
            return kr.copySafeness(e, e.replace(/^\s*|\s*$/g, ""))
        }
        t.abs = Math.abs,
            t.batch = function(e, t, n) {
                var r, i = [], s = [];
                for (r = 0; r < e.length; r++)
                    r % t == 0 && s.length && (i.push(s),
                        s = []),
                        s.push(e[r]);
                if (s.length) {
                    if (n)
                        for (r = s.length; r < t; r++)
                            s.push(n);
                    i.push(s)
                }
                return i
            }
            ,
            t.capitalize = i,
            t.center = function(e, t) {
                if (t = t || 80,
                (e = n(e, "")).length >= t)
                    return e;
                var r = t - e.length
                    , i = je.repeat(" ", r / 2 - r % 2)
                    , s = je.repeat(" ", r / 2);
                return kr.copySafeness(e, i + e + s)
            }
            ,
            t.default = function(e, t, n) {
                return n ? e || t : void 0 !== e ? e : t
            }
            ,
            t.dictsort = function(e, t, n) {
                if (!je.isObject(e))
                    throw new je.TemplateError("dictsort filter: val must be an object");
                var r, i = [];
                for (var s in e)
                    i.push([s, e[s]]);
                if (void 0 === n || "key" === n)
                    r = 0;
                else {
                    if ("value" !== n)
                        throw new je.TemplateError("dictsort filter: You can only sort by either key or value");
                    r = 1
                }
                return i.sort((function(e, n) {
                        var i = e[r]
                            , s = n[r];
                        return t || (je.isString(i) && (i = i.toUpperCase()),
                        je.isString(s) && (s = s.toUpperCase())),
                            i > s ? 1 : i === s ? 0 : -1
                    }
                )),
                    i
            }
            ,
            t.dump = function(e, t) {
                return JSON.stringify(e, null, t)
            }
            ,
            t.escape = function(e) {
                return e instanceof kr.SafeString ? e : (e = null == e ? "" : e,
                    kr.markSafe(je.escape(e.toString())))
            }
            ,
            t.safe = function(e) {
                return e instanceof kr.SafeString ? e : (e = null == e ? "" : e,
                    kr.markSafe(e.toString()))
            }
            ,
            t.first = function(e) {
                return e[0]
            }
            ,
            t.forceescape = function(e) {
                return e = null == e ? "" : e,
                    kr.markSafe(je.escape(e.toString()))
            }
            ,
            t.groupby = function(e, t) {
                return je.groupBy(e, t, this.env.opts.throwOnUndefined)
            }
            ,
            t.indent = function(e, t, r) {
                if ("" === (e = n(e, "")))
                    return "";
                t = t || 4;
                var i = e.split("\n")
                    , s = je.repeat(" ", t)
                    , a = i.map((function(e, t) {
                        return 0 !== t || r ? "" + s + e : e
                    }
                )).join("\n");
                return kr.copySafeness(e, a)
            }
            ,
            t.join = function(e, t, n) {
                return t = t || "",
                n && (e = je.map(e, (function(e) {
                        return e[n]
                    }
                ))),
                    e.join(t)
            }
            ,
            t.last = function(e) {
                return e[e.length - 1]
            }
            ,
            t.length = function(e) {
                var t = n(e, "");
                return void 0 !== t ? "function" == typeof Map && t instanceof Map || "function" == typeof Set && t instanceof Set ? t.size : !je.isObject(t) || t instanceof kr.SafeString ? t.length : je.keys(t).length : 0
            }
            ,
            t.list = s,
            t.lower = function(e) {
                return (e = n(e, "")).toLowerCase()
            }
            ,
            t.nl2br = function(e) {
                return null == e ? "" : kr.copySafeness(e, e.replace(/\r\n|\n/g, "<br />\n"))
            }
            ,
            t.random = function(e) {
                return e[Math.floor(Math.random() * e.length)]
            }
            ,
            t.reject = a(!1),
            t.rejectattr = function(e, t) {
                return e.filter((function(e) {
                        return !e[t]
                    }
                ))
            }
            ,
            t.select = a(!0),
            t.selectattr = function(e, t) {
                return e.filter((function(e) {
                        return !!e[t]
                    }
                ))
            }
            ,
            t.replace = function(e, t, n, r) {
                var i = e;
                if (t instanceof RegExp)
                    return e.replace(t, n);
                void 0 === r && (r = -1);
                var s = "";
                if ("number" == typeof t)
                    t = "" + t;
                else if ("string" != typeof t)
                    return e;
                if ("number" == typeof e && (e = "" + e),
                "string" != typeof e && !(e instanceof kr.SafeString))
                    return e;
                if ("" === t)
                    return s = n + e.split("").join(n) + n,
                        kr.copySafeness(e, s);
                var a = e.indexOf(t);
                if (0 === r || -1 === a)
                    return e;
                for (var o = 0, c = 0; a > -1 && (-1 === r || c < r); )
                    s += e.substring(o, a) + n,
                        o = a + t.length,
                        c++,
                        a = e.indexOf(t, o);
                return o < e.length && (s += e.substring(o)),
                    kr.copySafeness(i, s)
            }
            ,
            t.reverse = function(e) {
                var t;
                return (t = je.isString(e) ? s(e) : je.map(e, (function(e) {
                        return e
                    }
                ))).reverse(),
                    je.isString(e) ? kr.copySafeness(e, t.join("")) : t
            }
            ,
            t.round = function(e, t, n) {
                t = t || 0;
                var r = Math.pow(10, t);
                return ("ceil" === n ? Math.ceil : "floor" === n ? Math.floor : Math.round)(e * r) / r
            }
            ,
            t.slice = function(e, t, n) {
                for (var r = Math.floor(e.length / t), i = e.length % t, s = [], a = 0, o = 0; o < t; o++) {
                    var c = a + o * r;
                    o < i && a++;
                    var l = a + (o + 1) * r
                        , h = e.slice(c, l);
                    n && o >= i && h.push(n),
                        s.push(h)
                }
                return s
            }
            ,
            t.sum = function(e, t, n) {
                return void 0 === n && (n = 0),
                t && (e = je.map(e, (function(e) {
                        return e[t]
                    }
                ))),
                n + e.reduce((function(e, t) {
                        return e + t
                    }
                ), 0)
            }
            ,
            t.sort = kr.makeMacro(["value", "reverse", "case_sensitive", "attribute"], [], (function(e, t, n, r) {
                    var i = this
                        , s = je.map(e, (function(e) {
                            return e
                        }
                    ))
                        , a = je.getAttrGetter(r);
                    return s.sort((function(e, s) {
                            var o = r ? a(e) : e
                                , c = r ? a(s) : s;
                            if (i.env.opts.throwOnUndefined && r && (void 0 === o || void 0 === c))
                                throw new TypeError('sort: attribute "' + r + '" resolved to undefined');
                            return !n && je.isString(o) && je.isString(c) && (o = o.toLowerCase(),
                                c = c.toLowerCase()),
                                o < c ? t ? 1 : -1 : o > c ? t ? -1 : 1 : 0
                        }
                    )),
                        s
                }
            )),
            t.string = function(e) {
                return kr.copySafeness(e, e)
            }
            ,
            t.striptags = function(e, t) {
                var r = o((e = n(e, "")).replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>|<!--[\s\S]*?-->/gi, ""))
                    , i = "";
                return i = t ? r.replace(/^ +| +$/gm, "").replace(/ +/g, " ").replace(/(\r\n)/g, "\n").replace(/\n\n\n+/g, "\n\n") : r.replace(/\s+/gi, " "),
                    kr.copySafeness(e, i)
            }
            ,
            t.title = function(e) {
                var t = (e = n(e, "")).split(" ").map((function(e) {
                        return i(e)
                    }
                ));
                return kr.copySafeness(e, t.join(" "))
            }
            ,
            t.trim = o,
            t.truncate = function(e, t, r, i) {
                var s = e;
                if (t = t || 255,
                (e = n(e, "")).length <= t)
                    return e;
                if (r)
                    e = e.substring(0, t);
                else {
                    var a = e.lastIndexOf(" ", t);
                    -1 === a && (a = t),
                        e = e.substring(0, a)
                }
                return e += null != i ? i : "...",
                    kr.copySafeness(s, e)
            }
            ,
            t.upper = function(e) {
                return (e = n(e, "")).toUpperCase()
            }
            ,
            t.urlencode = function(e) {
                var t = encodeURIComponent;
                return je.isString(e) ? t(e) : (je.isArray(e) ? e : je._entries(e)).map((function(e) {
                        var n = e[0]
                            , r = e[1];
                        return t(n) + "=" + t(r)
                    }
                )).join("&")
            }
        ;
        var c = /^(?:\(|<|&lt;)?(.*?)(?:\.|,|\)|\n|&gt;)?$/
            , l = /^[\w.!#$%&'*+\-\/=?\^`{|}~]+@[a-z\d\-]+(\.[a-z\d\-]+)+$/i
            , h = /^https?:\/\/.*$/
            , u = /^www\./
            , p = /\.(?:org|net|com)(?:\:|\/|$)/;
        t.urlize = function(e, t, n) {
            r(t) && (t = 1 / 0);
            var i = !0 === n ? ' rel="nofollow"' : "";
            return e.split(/(\s+)/).filter((function(e) {
                    return e && e.length
                }
            )).map((function(e) {
                    var n = e.match(c)
                        , r = n ? n[1] : e
                        , s = r.substr(0, t);
                    return h.test(r) ? '<a href="' + r + '"' + i + ">" + s + "</a>" : u.test(r) ? '<a href="http://' + r + '"' + i + ">" + s + "</a>" : l.test(r) ? '<a href="mailto:' + r + '">' + r + "</a>" : p.test(r) ? '<a href="http://' + r + '"' + i + ">" + s + "</a>" : e
                }
            )).join("")
        }
            ,
            t.wordcount = function(e) {
                var t = (e = n(e, "")) ? e.match(/\w+/g) : null;
                return t ? t.length : null
            }
            ,
            t.float = function(e, t) {
                var n = parseFloat(e);
                return r(n) ? t : n
            }
        ;
        var f = kr.makeMacro(["value", "default", "base"], [], (function(e, t, n) {
                void 0 === n && (n = 10);
                var i = parseInt(e, n);
                return r(i) ? t : i
            }
        ));
        t.int = f,
            t.d = t.default,
            t.e = t.escape
    }
))
    , Br = {};
function Fr(e, t) {
    for (var n = 0, r = e.length - 1; r >= 0; r--) {
        var i = e[r];
        "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1),
            n++) : n && (e.splice(r, 1),
            n--)
    }
    if (t)
        for (; n--; n)
            e.unshift("..");
    return e
}
var Ur = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/
    , Hr = function(e) {
    return Ur.exec(e).slice(1)
};
function Gr() {
    for (var e = "", t = !1, n = arguments.length - 1; n >= -1 && !t; n--) {
        var r = n >= 0 ? arguments[n] : "/";
        if ("string" != typeof r)
            throw new TypeError("Arguments to path.resolve must be strings");
        r && (e = r + "/" + e,
            t = "/" === r.charAt(0))
    }
    return (t ? "/" : "") + (e = Fr(jr(e.split("/"), (function(e) {
            return !!e
        }
    )), !t).join("/")) || "."
}
function Yr(e) {
    var t = qr(e)
        , n = "/" === Vr(e, -1);
    return (e = Fr(jr(e.split("/"), (function(e) {
            return !!e
        }
    )), !t).join("/")) || t || (e = "."),
    e && n && (e += "/"),
    (t ? "/" : "") + e
}
function qr(e) {
    return "/" === e.charAt(0)
}
var Kr = {
    extname: function(e) {
        return Hr(e)[3]
    },
    basename: function(e, t) {
        var n = Hr(e)[2];
        return t && n.substr(-1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
            n
    },
    dirname: function(e) {
        var t = Hr(e)
            , n = t[0]
            , r = t[1];
        return n || r ? (r && (r = r.substr(0, r.length - 1)),
        n + r) : "."
    },
    sep: "/",
    delimiter: ":",
    relative: function(e, t) {
        function n(e) {
            for (var t = 0; t < e.length && "" === e[t]; t++)
                ;
            for (var n = e.length - 1; n >= 0 && "" === e[n]; n--)
                ;
            return t > n ? [] : e.slice(t, n - t + 1)
        }
        e = Gr(e).substr(1),
            t = Gr(t).substr(1);
        for (var r = n(e.split("/")), i = n(t.split("/")), s = Math.min(r.length, i.length), a = s, o = 0; o < s; o++)
            if (r[o] !== i[o]) {
                a = o;
                break
            }
        var c = [];
        for (o = a; o < r.length; o++)
            c.push("..");
        return (c = c.concat(i.slice(a))).join("/")
    },
    join: function() {
        var e = Array.prototype.slice.call(arguments, 0);
        return Yr(jr(e, (function(e, t) {
                if ("string" != typeof e)
                    throw new TypeError("Arguments to path.join must be strings");
                return e
            }
        )).join("/"))
    },
    isAbsolute: qr,
    normalize: Yr,
    resolve: Gr
};
function jr(e, t) {
    if (e.filter)
        return e.filter(t);
    for (var n = [], r = 0; r < e.length; r++)
        t(e[r], r, e) && n.push(e[r]);
    return n
}
var Vr = "b" === "ab".substr(-1) ? function(e, t, n) {
            return e.substr(t, n)
        }
        : function(e, t, n) {
            return t < 0 && (t = e.length + t),
                e.substr(t, n)
        }
;
function Wr(e, t) {
    return Wr = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        Wr(e, t)
}
var Qr = function(e) {
    var t, n;
    function r() {
        return e.apply(this, arguments) || this
    }
    n = e,
        (t = r).prototype = Object.create(n.prototype),
        t.prototype.constructor = t,
        Wr(t, n);
    var i = r.prototype;
    return i.resolve = function(e, t) {
        return Kr.resolve(Kr.dirname(e), t)
    }
        ,
        i.isRelative = function(e) {
            return 0 === e.indexOf("./") || 0 === e.indexOf("../")
        }
        ,
        r
}(en.EmitterObj);
function Xr(e, t) {
    return Xr = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        Xr(e, t)
}
var $r = function(e) {
    var t, n;
    function r(t) {
        var n;
        return (n = e.call(this) || this).precompiled = t || {},
            n
    }
    return n = e,
        (t = r).prototype = Object.create(n.prototype),
        t.prototype.constructor = t,
        Xr(t, n),
        r.prototype.getSource = function(e) {
            return this.precompiled[e] ? {
                src: {
                    type: "code",
                    obj: this.precompiled[e]
                },
                path: e
            } : null
        }
        ,
        r
}(Qr);
function zr(e, t) {
    e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        Jr(e, t)
}
function Jr(e, t) {
    return Jr = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        Jr(e, t)
}
var Zr = {
    PrecompiledLoader: $r
}.PrecompiledLoader
    , ei = function(e) {
    function t(t, n) {
        var r;
        return n = n || {},
            (r = e.call(this) || this).pathsToNames = {},
            r.noCache = !!n.noCache,
            t ? (t = Array.isArray(t) ? t : [t],
                r.searchPaths = t.map(Kr.normalize)) : r.searchPaths = ["."],
            r
    }
    return zr(t, e),
        t.prototype.getSource = function(e) {
            for (var t = null, n = this.searchPaths, r = 0; r < n.length; r++) {
                var i = Kr.resolve(n[r])
                    , s = Kr.resolve(n[r], e);
                if (0 === s.indexOf(i) && Br.existsSync(s)) {
                    t = s;
                    break
                }
            }
            if (!t)
                return null;
            this.pathsToNames[t] = e;
            var a = {
                src: Br.readFileSync(t, "utf-8"),
                path: t,
                noCache: this.noCache
            };
            return this.emit("load", e, a),
                a
        }
        ,
        t
}(Qr)
    , ti = {
    FileSystemLoader: ei,
    PrecompiledLoader: Zr,
    NodeResolveLoader: function(e) {
        function t(t) {
            var n;
            return t = t || {},
                (n = e.call(this) || this).pathsToNames = {},
                n.noCache = !!t.noCache,
                n
        }
        return zr(t, e),
            t.prototype.getSource = function(e) {
                if (/^\.?\.?(\/|\\)/.test(e))
                    return null;
                if (/^[A-Z]:/.test(e))
                    return null;
                var t;
                try {
                    t = Ye.resolve(e)
                } catch (e) {
                    return null
                }
                this.pathsToNames[t] = e;
                var n = {
                    src: Br.readFileSync(t, "utf-8"),
                    path: t,
                    noCache: this.noCache
                };
                return this.emit("load", e, n),
                    n
            }
            ,
            t
    }(Qr)
}
    , ni = Ke((function(e, t) {
        var n = kr.SafeString;
        t.callable = function(e) {
            return "function" == typeof e
        }
            ,
            t.defined = function(e) {
                return void 0 !== e
            }
            ,
            t.divisibleby = function(e, t) {
                return e % t == 0
            }
            ,
            t.escaped = function(e) {
                return e instanceof n
            }
            ,
            t.equalto = function(e, t) {
                return e === t
            }
            ,
            t.eq = t.equalto,
            t.sameas = t.equalto,
            t.even = function(e) {
                return e % 2 == 0
            }
            ,
            t.falsy = function(e) {
                return !e
            }
            ,
            t.ge = function(e, t) {
                return e >= t
            }
            ,
            t.greaterthan = function(e, t) {
                return e > t
            }
            ,
            t.gt = t.greaterthan,
            t.le = function(e, t) {
                return e <= t
            }
            ,
            t.lessthan = function(e, t) {
                return e < t
            }
            ,
            t.lt = t.lessthan,
            t.lower = function(e) {
                return e.toLowerCase() === e
            }
            ,
            t.ne = function(e, t) {
                return e !== t
            }
            ,
            t.null = function(e) {
                return null === e
            }
            ,
            t.number = function(e) {
                return "number" == typeof e
            }
            ,
            t.odd = function(e) {
                return e % 2 == 1
            }
            ,
            t.string = function(e) {
                return "string" == typeof e
            }
            ,
            t.truthy = function(e) {
                return !!e
            }
            ,
            t.undefined = function(e) {
                return void 0 === e
            }
            ,
            t.upper = function(e) {
                return e.toUpperCase() === e
            }
            ,
            t.iterable = function(e) {
                return "undefined" != typeof Symbol ? !!e[Symbol.iterator] : Array.isArray(e) || "string" == typeof e
            }
            ,
            t.mapping = function(e) {
                var t = null != e && "object" == typeof e && !Array.isArray(e);
                return Set ? t && !(e instanceof Set) : t
            }
    }
));
function ri(e) {
    var t = -1;
    return {
        current: null,
        reset: function() {
            t = -1,
                this.current = null
        },
        next: function() {
            return ++t >= e.length && (t = 0),
                this.current = e[t],
                this.current
        }
    }
}
ni.callable,
    ni.defined,
    ni.divisibleby,
    ni.escaped,
    ni.equalto,
    ni.eq,
    ni.sameas,
    ni.even,
    ni.falsy,
    ni.ge,
    ni.greaterthan,
    ni.gt,
    ni.le,
    ni.lessthan,
    ni.lt,
    ni.lower,
    ni.ne,
    ni.number,
    ni.odd,
    ni.string,
    ni.truthy,
    ni.undefined,
    ni.upper,
    ni.iterable,
    ni.mapping;
var ii = function() {
    return {
        range: function(e, t, n) {
            void 0 === t ? (t = e,
                e = 0,
                n = 1) : n || (n = 1);
            var r = [];
            if (n > 0)
                for (var i = e; i < t; i += n)
                    r.push(i);
            else
                for (var s = e; s > t; s += n)
                    r.push(s);
            return r
        },
        cycler: function() {
            return ri(Array.prototype.slice.call(arguments))
        },
        joiner: function(e) {
            return function(e) {
                e = e || ",";
                var t = !0;
                return function() {
                    var n = t ? "" : e;
                    return t = !1,
                        n
                }
            }(e)
        }
    }
};
function si(e, t) {
    e.prototype = Object.create(t.prototype),
        e.prototype.constructor = e,
        ai(e, t)
}
function ai(e, t) {
    return ai = Object.setPrototypeOf || function(e, t) {
        return e.__proto__ = t,
            e
    }
        ,
        ai(e, t)
}
var oi = ti.FileSystemLoader
    , ci = ti.WebLoader
    , li = ti.PrecompiledLoader
    , hi = en.Obj
    , ui = en.EmitterObj
    , pi = kr.handleError
    , fi = kr.Frame;
function di(e, t, n) {
    Gt((function() {
            e(t, n)
        }
    ))
}
var Ei = {
    type: "code",
    obj: {
        root: function(e, t, n, r, i) {
            try {
                i(null, "")
            } catch (e) {
                i(pi(e, null, null))
            }
        }
    }
}
    , mi = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    si(t, e);
    var n = t.prototype;
    return n.init = function(e, t) {
        var n = this;
        t = this.opts = t || {},
            this.opts.dev = !!t.dev,
            this.opts.autoescape = null == t.autoescape || t.autoescape,
            this.opts.throwOnUndefined = !!t.throwOnUndefined,
            this.opts.trimBlocks = !!t.trimBlocks,
            this.opts.lstripBlocks = !!t.lstripBlocks,
            this.loaders = [],
            e ? this.loaders = je.isArray(e) ? e : [e] : oi ? this.loaders = [new oi("views")] : ci && (this.loaders = [new ci("/views")]),
        "undefined" != typeof window && window.jinja2Precompiled && this.loaders.unshift(new li(window.jinja2Precompiled)),
            this._initLoaders(),
            this.globals = ii(),
            this.filters = {},
            this.tests = {},
            this.asyncFilters = [],
            this.extensions = {},
            this.extensionsList = [],
            je._entries(wr).forEach((function(e) {
                    var t = e[0]
                        , r = e[1];
                    return n.addFilter(t, r)
                }
            )),
            je._entries(ni).forEach((function(e) {
                    var t = e[0]
                        , r = e[1];
                    return n.addTest(t, r)
                }
            ))
    }
        ,
        n._initLoaders = function() {
            var e = this;
            this.loaders.forEach((function(t) {
                    t.cache = {},
                    "function" == typeof t.on && (t.on("update", (function(n, r) {
                            t.cache[n] = null,
                                e.emit("update", n, r, t)
                        }
                    )),
                        t.on("load", (function(n, r) {
                                e.emit("load", n, r, t)
                            }
                        )))
                }
            ))
        }
        ,
        n.invalidateCache = function() {
            this.loaders.forEach((function(e) {
                    e.cache = {}
                }
            ))
        }
        ,
        n.addExtension = function(e, t) {
            return t.__name = e,
                this.extensions[e] = t,
                this.extensionsList.push(t),
                this
        }
        ,
        n.removeExtension = function(e) {
            var t = this.getExtension(e);
            t && (this.extensionsList = je.without(this.extensionsList, t),
                delete this.extensions[e])
        }
        ,
        n.getExtension = function(e) {
            return this.extensions[e]
        }
        ,
        n.hasExtension = function(e) {
            return !!this.extensions[e]
        }
        ,
        n.addGlobal = function(e, t) {
            return this.globals[e] = t,
                this
        }
        ,
        n.getGlobal = function(e) {
            if (void 0 === this.globals[e])
                throw new Error("global not found: " + e);
            return this.globals[e]
        }
        ,
        n.addFilter = function(e, t, n) {
            var r = t;
            return n && this.asyncFilters.push(e),
                this.filters[e] = r,
                this
        }
        ,
        n.getFilter = function(e) {
            if (!this.filters[e])
                throw new Error("filter not found: " + e);
            return this.filters[e]
        }
        ,
        n.addTest = function(e, t) {
            return this.tests[e] = t,
                this
        }
        ,
        n.getTest = function(e) {
            if (!this.tests[e])
                throw new Error("test not found: " + e);
            return this.tests[e]
        }
        ,
        n.resolveTemplate = function(e, t, n) {
            return !(!e.isRelative || !t) && e.isRelative(n) && e.resolve ? e.resolve(t, n) : n
        }
        ,
        n.getTemplate = function(e, t, n, r, i) {
            var s, a = this, o = this, c = null;
            if (e && e.raw && (e = e.raw),
            je.isFunction(n) && (i = n,
                n = null,
                t = t || !1),
            je.isFunction(t) && (i = t,
                t = !1),
            e instanceof _i)
                c = e;
            else {
                if ("string" != typeof e)
                    throw new Error("template names must be a string: " + e);
                for (var l = 0; l < this.loaders.length; l++) {
                    var h = this.loaders[l];
                    if (c = h.cache[this.resolveTemplate(h, n, e)])
                        break
                }
            }
            if (c)
                return t && c.compile(),
                    i ? void i(null, c) : c;
            return je.asyncIter(this.loaders, (function(t, r, i, s) {
                    function a(e, n) {
                        e ? s(e) : n ? (n.loader = t,
                            s(null, n)) : i()
                    }
                    e = o.resolveTemplate(t, n, e),
                        t.async ? t.getSource(e, a) : a(null, t.getSource(e))
                }
            ), (function(n, o) {
                    if (o || n || r || (n = new Error("template not found: " + e)),
                        n) {
                        if (i)
                            return void i(n);
                        throw n
                    }
                    var c;
                    o ? (c = new _i(o.src,a,o.path,t),
                    o.noCache || (o.loader.cache[e] = c)) : c = new _i(Ei,a,"",t),
                        i ? i(null, c) : s = c
                }
            )),
                s
        }
        ,
        n.express = function(e) {
            return function(e, t) {
                function n(e, t) {
                    if (this.name = e,
                        this.path = e,
                        this.defaultEngine = t.defaultEngine,
                        this.ext = Kr.extname(e),
                    !this.ext && !this.defaultEngine)
                        throw new Error("No default engine was specified and no extension was provided.");
                    this.ext || (this.name += this.ext = ("." !== this.defaultEngine[0] ? "." : "") + this.defaultEngine)
                }
                return n.prototype.render = function(t, n) {
                    e.render(this.name, t, n)
                }
                    ,
                    t.set("view", n),
                    t.set("jinja2Env", e),
                    e
            }(this, e)
        }
        ,
        n.render = function(e, t, n) {
            je.isFunction(t) && (n = t,
                t = null);
            var r = null;
            return this.getTemplate(e, (function(e, i) {
                    if (e && n)
                        di(n, e);
                    else {
                        if (e)
                            throw e;
                        r = i.render(t, n)
                    }
                }
            )),
                r
        }
        ,
        n.renderString = function(e, t, n, r) {
            return je.isFunction(n) && (r = n,
                n = {}),
                new _i(e,this,(n = n || {}).path).render(t, r)
        }
        ,
        n.waterfall = function(e, t, n) {
            return qt(e, t, n)
        }
        ,
        t
}(ui)
    , Ti = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    si(t, e);
    var n = t.prototype;
    return n.init = function(e, t, n) {
        var r = this;
        this.env = n || new mi,
            this.ctx = je.extend({}, e),
            this.blocks = {},
            this.exported = [],
            je.keys(t).forEach((function(e) {
                    r.addBlock(e, t[e])
                }
            ))
    }
        ,
        n.lookup = function(e) {
            return e in this.env.globals && !(e in this.ctx) ? this.env.globals[e] : this.ctx[e]
        }
        ,
        n.setVariable = function(e, t) {
            this.ctx[e] = t
        }
        ,
        n.getVariables = function() {
            return this.ctx
        }
        ,
        n.addBlock = function(e, t) {
            return this.blocks[e] = this.blocks[e] || [],
                this.blocks[e].push(t),
                this
        }
        ,
        n.getBlock = function(e) {
            if (!this.blocks[e])
                throw new Error('unknown block "' + e + '"');
            return this.blocks[e][0]
        }
        ,
        n.getSuper = function(e, t, n, r, i, s) {
            var a = je.indexOf(this.blocks[t] || [], n)
                , o = this.blocks[t][a + 1];
            if (-1 === a || !o)
                throw new Error('no super block available for "' + t + '"');
            o(e, this, r, i, s)
        }
        ,
        n.addExport = function(e) {
            this.exported.push(e)
        }
        ,
        n.getExported = function() {
            var e = this
                , t = {};
            return this.exported.forEach((function(n) {
                    t[n] = e.ctx[n]
                }
            )),
                t
        }
        ,
        t
}(hi)
    , _i = function(e) {
    function t() {
        return e.apply(this, arguments) || this
    }
    si(t, e);
    var n = t.prototype;
    return n.init = function(e, t, n, r) {
        if (this.env = t || new mi,
            je.isObject(e))
            switch (e.type) {
                case "code":
                    this.tmplProps = e.obj;
                    break;
                case "string":
                    this.tmplStr = e.obj;
                    break;
                default:
                    throw new Error("Unexpected template object type " + e.type + "; expected 'code', or 'string'")
            }
        else {
            if (!je.isString(e))
                throw new Error("src must be a string or an object describing the source");
            this.tmplStr = e
        }
        if (this.path = n,
            r)
            try {
                this._compile()
            } catch (e) {
                throw je._prettifyError(this.path, this.env.opts.dev, e)
            }
        else
            this.compiled = !1
    }
        ,
        n.render = function(e, t, n) {
            var r = this;
            "function" == typeof e ? (n = e,
                e = {}) : "function" == typeof t && (n = t,
                t = null);
            var i = !t;
            try {
                this.compile()
            } catch (e) {
                var s = je._prettifyError(this.path, this.env.opts.dev, e);
                if (n)
                    return di(n, s);
                throw s
            }
            var a = new Ti(e || {},this.blocks,this.env)
                , o = t ? t.push(!0) : new fi;
            o.topLevel = !0;
            var c = null
                , l = !1;
            return this.rootRenderFunc(this.env, a, o, kr, (function(e, t) {
                    if (!l || !n || void 0 === t)
                        if (e && (e = je._prettifyError(r.path, r.env.opts.dev, e),
                            l = !0),
                            n)
                            i ? di(n, e, t) : n(e, t);
                        else {
                            if (e)
                                throw e;
                            c = t
                        }
                }
            )),
                c
        }
        ,
        n.getExported = function(e, t, n) {
            "function" == typeof e && (n = e,
                e = {}),
            "function" == typeof t && (n = t,
                t = null);
            try {
                this.compile()
            } catch (e) {
                if (n)
                    return n(e);
                throw e
            }
            var r = t ? t.push() : new fi;
            r.topLevel = !0;
            var i = new Ti(e || {},this.blocks,this.env);
            this.rootRenderFunc(this.env, i, r, kr, (function(e) {
                    e ? n(e, null) : n(null, i.getExported())
                }
            ))
        }
        ,
        n.compile = function() {
            this.compiled || this._compile()
        }
        ,
        n._compile = function() {
            var e;
            if (this.tmplProps)
                e = this.tmplProps;
            else {
                var t = xr.compile(this.tmplStr, this.env.asyncFilters, this.env.extensionsList, this.path, this.env.opts);
                e = new Function(t)()
            }
            this.blocks = this._getBlocks(e),
                this.rootRenderFunc = e.root,
                this.compiled = !0
        }
        ,
        n._getBlocks = function(e) {
            var t = {};
            return je.keys(e).forEach((function(n) {
                    "b_" === n.slice(0, 2) && (t[n.slice(2)] = e[n])
                }
            )),
                t
        }
        ,
        t
}(hi)
    , Ai = {
    Environment: mi,
    Template: _i
};
je._prettifyError;
var gi, Ni = Ai.Environment;
function Ci(e, t) {
    var n;
    return t = t || {},
    je.isObject(e) && (t = e,
        e = null),
        ti.FileSystemLoader ? n = new ti.FileSystemLoader(e,{
            watch: t.watch,
            noCache: t.noCache
        }) : ti.WebLoader && (n = new ti.WebLoader(e,{
            useCache: t.web && t.web.useCache,
            async: t.web && t.web.async
        })),
        gi = new Ni(n,t),
    t && t.express && gi.express(t.express),
        gi
}
ti.FileSystemLoader,
    ti.NodeResolveLoader,
    ti.PrecompiledLoader,
    ti.WebLoader;
var Ii = function(e, t, n) {
    return gi || Ci(),
        gi.renderString(e, t, n)
}
    , Si = function() {
    return Si = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }
        ,
        Si.apply(this, arguments)
};
function bi(e, t, n) {
    return e ? e(null != t ? t : e._root.children, null, void 0, n).toString() : ""
}
function Oi(e, t) {
    return bi(this, function(e, t) {
        return !t && "object" == typeof e && null != e && !("length"in e) && !("type"in e)
    }(e) ? void (t = e) : e, Si(Si(Si({}, n), null == this ? void 0 : this._options), i(null != t ? t : {})))
}
function yi(e) {
    return bi(this, e, Si(Si({}, this._options), {
        xmlMode: !0
    }))
}
function Li(e) {
    for (var t = e || (this ? this.root() : []), n = "", r = 0; r < t.length; r++)
        n += z(t[r]);
    return n
}
function ki(e, t, r) {
    if (void 0 === r && (r = "boolean" == typeof t && t),
    !e || "string" != typeof e)
        return null;
    "boolean" == typeof t && (r = t);
    var i = this.load(e, n, !1);
    return r || i("script").remove(),
        i.root()[0].children.slice()
}
function vi() {
    return this(this._root)
}
function Di(e, t) {
    if (t === e)
        return !1;
    for (var n = t; n && n !== n.parent; )
        if ((n = n.parent) === e)
            return !0;
    return !1
}
function Ri(e, t) {
    if (Mi(e) && Mi(t)) {
        for (var n = e.length, r = +t.length, i = 0; i < r; i++)
            e[n++] = t[i];
        return e.length = n,
            e
    }
}
function Mi(e) {
    if (Array.isArray(e))
        return !0;
    if ("object" != typeof e || !Object.prototype.hasOwnProperty.call(e, "length") || "number" != typeof e.length || e.length < 0)
        return !1;
    for (var t = 0; t < e.length; t++)
        if (!(t in e))
            return !1;
    return !0
}
var Pi, xi = Object.freeze({
    __proto__: null,
    html: Oi,
    xml: yi,
    text: Li,
    parseHTML: ki,
    root: vi,
    contains: Di,
    merge: Ri,
    jp: function(e, t) {
        return He({
            path: e,
            json: t
        })
    },
    jpo: function(e) {
        return He(e)
    },
    jinja2: function(e, t) {
        return Ii(e, t)
    }
});
function wi(e) {
    return null != e.cheerio
}
function Bi(e, t) {
    for (var n = e.length, r = 0; r < n; r++)
        t(e[r], r);
    return e
}
function Fi(e) {
    var t = "length"in e ? Array.prototype.map.call(e, (function(e) {
            return v(e, !0)
        }
    )) : [v(e, !0)]
        , n = new N(t);
    return t.forEach((function(e) {
            e.parent = n
        }
    )),
        t
}
function Ui(e) {
    var t = e.indexOf("<");
    if (t < 0 || t > e.length - 3)
        return !1;
    var n = e.charCodeAt(t + 1);
    return (n >= Pi.LowerA && n <= Pi.LowerZ || n >= Pi.UpperA && n <= Pi.UpperZ || n === Pi.Exclamation) && e.includes(">", t + 2)
}
!function(e) {
    e[e.LowerA = 97] = "LowerA",
        e[e.LowerZ = 122] = "LowerZ",
        e[e.UpperA = 65] = "UpperA",
        e[e.UpperZ = 90] = "UpperZ",
        e[e.Exclamation = 33] = "Exclamation"
}(Pi || (Pi = {}));
var Hi = Object.prototype.hasOwnProperty
    , Gi = /\s+/
    , Yi = {
    null: null,
    true: !0,
    false: !1
}
    , qi = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
    , Ki = /^{[^]*}$|^\[[^]*]$/;
function ji(e, t, n) {
    var r;
    if (e && I(e))
        return null !== (r = e.attribs) && void 0 !== r || (e.attribs = {}),
            t ? Hi.call(e.attribs, t) ? !n && qi.test(t) ? t : e.attribs[t] : "option" === e.name && "value" === t ? Li(e.children) : "input" !== e.name || "radio" !== e.attribs.type && "checkbox" !== e.attribs.type || "value" !== t ? void 0 : "on" : e.attribs
}
function Vi(e, t, n) {
    null === n ? zi(e, t) : e.attribs[t] = "".concat(n)
}
function Wi(e, t, n) {
    return t in e ? e[t] : !n && qi.test(t) ? void 0 !== ji(e, t, !1) : ji(e, t, n)
}
function Qi(e, t, n, r) {
    t in e ? e[t] = n : Vi(e, t, !r && qi.test(t) ? n ? "" : null : "".concat(n))
}
function Xi(e, t, n) {
    var r, i = e;
    null !== (r = i.data) && void 0 !== r || (i.data = {}),
        "object" == typeof t ? Object.assign(i.data, t) : "string" == typeof t && void 0 !== n && (i.data[t] = n)
}
function $i(e, t) {
    var n, r, i, s;
    null == t ? r = (n = Object.keys(e.attribs).filter((function(e) {
            return e.startsWith("data-")
        }
    ))).map((function(e) {
            return e.slice("data-".length).replace(/[_.-](\w|$)/g, (function(e, t) {
                    return t.toUpperCase()
                }
            ))
        }
    )) : (n = ["data-" + (s = t,
        s.replace(/[A-Z]/g, "-$&").toLowerCase())],
        r = [t]);
    for (var a = 0; a < n.length; ++a) {
        var o = n[a]
            , c = r[a];
        if (Hi.call(e.attribs, o) && !Hi.call(e.data, c)) {
            if (i = e.attribs[o],
                Hi.call(Yi, i))
                i = Yi[i];
            else if (i === String(Number(i)))
                i = Number(i);
            else if (Ki.test(i))
                try {
                    i = JSON.parse(i)
                } catch (e) {}
            e.data[c] = i
        }
    }
    return null == t ? e.data : i
}
function zi(e, t) {
    e.attribs && Hi.call(e.attribs, t) && delete e.attribs[t]
}
function Ji(e) {
    return e ? e.trim().split(Gi) : []
}
var Zi, es, ts = Object.freeze({
    __proto__: null,
    attr: function(e, t) {
        if ("object" == typeof e || void 0 !== t) {
            if ("function" == typeof t) {
                if ("string" != typeof e)
                    throw new Error("Bad combination of arguments.");
                return Bi(this, (function(n, r) {
                        I(n) && Vi(n, e, t.call(n, r, n.attribs[e]))
                    }
                ))
            }
            return Bi(this, (function(n) {
                    I(n) && ("object" == typeof e ? Object.keys(e).forEach((function(t) {
                            var r = e[t];
                            Vi(n, t, r)
                        }
                    )) : Vi(n, e, t))
                }
            ))
        }
        return arguments.length > 1 ? this : ji(this[0], e, this.options.xmlMode)
    },
    prop: function(e, t) {
        var n, r = this;
        if ("string" == typeof e && void 0 === t) {
            var i = this[0];
            if (!i || !I(i))
                return;
            switch (e) {
                case "style":
                    var s = this.css()
                        , a = Object.keys(s);
                    return a.forEach((function(e, t) {
                            s[t] = e
                        }
                    )),
                        s.length = a.length,
                        s;
                case "tagName":
                case "nodeName":
                    return i.name.toUpperCase();
                case "href":
                case "src":
                    var o = null === (n = i.attribs) || void 0 === n ? void 0 : n[e];
                    return "undefined" == typeof URL || ("href" !== e || "a" !== i.tagName && "link" !== i.name) && ("src" !== e || "img" !== i.tagName && "iframe" !== i.tagName && "audio" !== i.tagName && "video" !== i.tagName && "source" !== i.tagName) || void 0 === o || !this.options.baseURI ? o : new URL(o,this.options.baseURI).href;
                case "innerText":
                    return J(i);
                case "textContent":
                    return z(i);
                case "outerHTML":
                    return this.clone().wrap("<container />").parent().html();
                case "innerHTML":
                    return this.html();
                default:
                    return Wi(i, e, this.options.xmlMode)
            }
        }
        if ("object" == typeof e || void 0 !== t) {
            if ("function" == typeof t) {
                if ("object" == typeof e)
                    throw new Error("Bad combination of arguments.");
                return Bi(this, (function(n, i) {
                        I(n) && Qi(n, e, t.call(n, i, Wi(n, e, r.options.xmlMode)), r.options.xmlMode)
                    }
                ))
            }
            return Bi(this, (function(n) {
                    I(n) && ("object" == typeof e ? Object.keys(e).forEach((function(t) {
                            var i = e[t];
                            Qi(n, t, i, r.options.xmlMode)
                        }
                    )) : Qi(n, e, t, r.options.xmlMode))
                }
            ))
        }
    },
    data: function(e, t) {
        var n, r = this[0];
        if (r && I(r)) {
            var i = r;
            return null !== (n = i.data) && void 0 !== n || (i.data = {}),
                e ? "object" == typeof e || void 0 !== t ? (Bi(this, (function(n) {
                        I(n) && ("object" == typeof e ? Xi(n, e) : Xi(n, e, t))
                    }
                )),
                    this) : Hi.call(i.data, e) ? i.data[e] : $i(i, e) : $i(i)
        }
    },
    val: function(e) {
        var t = 0 === arguments.length
            , n = this[0];
        if (!n || !I(n))
            return t ? void 0 : this;
        switch (n.name) {
            case "textarea":
                return this.text(e);
            case "select":
                var r = this.find("option:selected");
                if (!t) {
                    if (null == this.attr("multiple") && "object" == typeof e)
                        return this;
                    this.find("option").removeAttr("selected");
                    for (var i = "object" != typeof e ? [e] : e, s = 0; s < i.length; s++)
                        this.find('option[value="'.concat(i[s], '"]')).attr("selected", "");
                    return this
                }
                return this.attr("multiple") ? r.toArray().map((function(e) {
                        return Li(e.children)
                    }
                )) : r.attr("value");
            case "input":
            case "option":
                return t ? this.attr("value") : this.attr("value", e)
        }
    },
    removeAttr: function(e) {
        for (var t = Ji(e), n = function(e) {
            Bi(r, (function(n) {
                    I(n) && zi(n, t[e])
                }
            ))
        }, r = this, i = 0; i < t.length; i++)
            n(i);
        return this
    },
    hasClass: function(e) {
        return this.toArray().some((function(t) {
                var n = I(t) && t.attribs.class
                    , r = -1;
                if (n && e.length)
                    for (; (r = n.indexOf(e, r + 1)) > -1; ) {
                        var i = r + e.length;
                        if ((0 === r || Gi.test(n[r - 1])) && (i === n.length || Gi.test(n[i])))
                            return !0
                    }
                return !1
            }
        ))
    },
    addClass: function e(t) {
        if ("function" == typeof t)
            return Bi(this, (function(n, r) {
                    if (I(n)) {
                        var i = n.attribs.class || "";
                        e.call([n], t.call(n, r, i))
                    }
                }
            ));
        if (!t || "string" != typeof t)
            return this;
        for (var n = t.split(Gi), r = this.length, i = 0; i < r; i++) {
            var s = this[i];
            if (I(s)) {
                var a = ji(s, "class", !1);
                if (a) {
                    for (var o = " ".concat(a, " "), c = 0; c < n.length; c++) {
                        var l = "".concat(n[c], " ");
                        o.includes(" ".concat(l)) || (o += l)
                    }
                    Vi(s, "class", o.trim())
                } else
                    Vi(s, "class", n.join(" ").trim())
            }
        }
        return this
    },
    removeClass: function e(t) {
        if ("function" == typeof t)
            return Bi(this, (function(n, r) {
                    I(n) && e.call([n], t.call(n, r, n.attribs.class || ""))
                }
            ));
        var n = Ji(t)
            , r = n.length
            , i = 0 === arguments.length;
        return Bi(this, (function(e) {
                if (I(e))
                    if (i)
                        e.attribs.class = "";
                    else {
                        for (var t = Ji(e.attribs.class), s = !1, a = 0; a < r; a++) {
                            var o = t.indexOf(n[a]);
                            o >= 0 && (t.splice(o, 1),
                                s = !0,
                                a--)
                        }
                        s && (e.attribs.class = t.join(" "))
                    }
            }
        ))
    },
    toggleClass: function e(t, n) {
        if ("function" == typeof t)
            return Bi(this, (function(r, i) {
                    I(r) && e.call([r], t.call(r, i, r.attribs.class || "", n), n)
                }
            ));
        if (!t || "string" != typeof t)
            return this;
        for (var r = t.split(Gi), i = r.length, s = "boolean" == typeof n ? n ? 1 : -1 : 0, a = this.length, o = 0; o < a; o++) {
            var c = this[o];
            if (I(c)) {
                for (var l = Ji(c.attribs.class), h = 0; h < i; h++) {
                    var u = l.indexOf(r[h]);
                    s >= 0 && u < 0 ? l.push(r[h]) : s <= 0 && u >= 0 && l.splice(u, 1)
                }
                c.attribs.class = l.join(" ")
            }
        }
        return this
    }
});
!function(e) {
    e.Attribute = "attribute",
        e.Pseudo = "pseudo",
        e.PseudoElement = "pseudo-element",
        e.Tag = "tag",
        e.Universal = "universal",
        e.Adjacent = "adjacent",
        e.Child = "child",
        e.Descendant = "descendant",
        e.Parent = "parent",
        e.Sibling = "sibling",
        e.ColumnCombinator = "column-combinator"
}(Zi || (Zi = {})),
    function(e) {
        e.Any = "any",
            e.Element = "element",
            e.End = "end",
            e.Equals = "equals",
            e.Exists = "exists",
            e.Hyphen = "hyphen",
            e.Not = "not",
            e.Start = "start"
    }(es || (es = {}));
const ns = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/
    , rs = /\\([\da-f]{1,6}\s?|(\s)|.)/gi
    , is = new Map([[126, es.Element], [94, es.Start], [36, es.End], [42, es.Any], [33, es.Not], [124, es.Hyphen]])
    , ss = new Set(["has", "not", "matches", "is", "where", "host", "host-context"]);
function as(e) {
    switch (e.type) {
        case Zi.Adjacent:
        case Zi.Child:
        case Zi.Descendant:
        case Zi.Parent:
        case Zi.Sibling:
        case Zi.ColumnCombinator:
            return !0;
        default:
            return !1
    }
}
const os = new Set(["contains", "icontains"]);
function cs(e, t, n) {
    const r = parseInt(t, 16) - 65536;
    return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
}
function ls(e) {
    return e.replace(rs, cs)
}
function hs(e) {
    return 39 === e || 34 === e
}
function us(e) {
    return 32 === e || 9 === e || 10 === e || 12 === e || 13 === e
}
function ps(e) {
    const t = []
        , n = fs(t, `${e}`, 0);
    if (n < e.length)
        throw new Error(`Unmatched selector: ${e.slice(n)}`);
    return t
}
function fs(e, t, n) {
    let r = [];
    function i(e) {
        const r = t.slice(n + e).match(ns);
        if (!r)
            throw new Error(`Expected name, found ${t.slice(n)}`);
        const [i] = r;
        return n += e + i.length,
            ls(i)
    }
    function s(e) {
        for (n += e; n < t.length && us(t.charCodeAt(n)); )
            n++
    }
    function a() {
        const e = n += 1;
        let r = 1;
        for (; r > 0 && n < t.length; n++)
            40 !== t.charCodeAt(n) || o(n) ? 41 !== t.charCodeAt(n) || o(n) || r-- : r++;
        if (r)
            throw new Error("Parenthesis not matched");
        return ls(t.slice(e, n - 1))
    }
    function o(e) {
        let n = 0;
        for (; 92 === t.charCodeAt(--e); )
            n++;
        return 1 == (1 & n)
    }
    function c() {
        if (r.length > 0 && as(r[r.length - 1]))
            throw new Error("Did not expect successive traversals.")
    }
    function l(e) {
        r.length > 0 && r[r.length - 1].type === Zi.Descendant ? r[r.length - 1].type = e : (c(),
            r.push({
                type: e
            }))
    }
    function h(e, t) {
        r.push({
            type: Zi.Attribute,
            name: e,
            action: t,
            value: i(1),
            namespace: null,
            ignoreCase: "quirks"
        })
    }
    function u() {
        if (r.length && r[r.length - 1].type === Zi.Descendant && r.pop(),
        0 === r.length)
            throw new Error("Empty sub-selector");
        e.push(r)
    }
    if (s(0),
    t.length === n)
        return n;
    e: for (; n < t.length; ) {
        const e = t.charCodeAt(n);
        switch (e) {
            case 32:
            case 9:
            case 10:
            case 12:
            case 13:
                0 !== r.length && r[0].type === Zi.Descendant || (c(),
                    r.push({
                        type: Zi.Descendant
                    })),
                    s(1);
                break;
            case 62:
                l(Zi.Child),
                    s(1);
                break;
            case 60:
                l(Zi.Parent),
                    s(1);
                break;
            case 126:
                l(Zi.Sibling),
                    s(1);
                break;
            case 43:
                l(Zi.Adjacent),
                    s(1);
                break;
            case 46:
                h("class", es.Element);
                break;
            case 35:
                h("id", es.Equals);
                break;
            case 91:
            {
                let e;
                s(1);
                let a = null;
                124 === t.charCodeAt(n) ? e = i(1) : t.startsWith("*|", n) ? (a = "*",
                    e = i(2)) : (e = i(0),
                124 === t.charCodeAt(n) && 61 !== t.charCodeAt(n + 1) && (a = e,
                    e = i(1))),
                    s(0);
                let c = es.Exists;
                const l = is.get(t.charCodeAt(n));
                if (l) {
                    if (c = l,
                    61 !== t.charCodeAt(n + 1))
                        throw new Error("Expected `=`");
                    s(2)
                } else
                    61 === t.charCodeAt(n) && (c = es.Equals,
                        s(1));
                let h = ""
                    , u = null;
                if ("exists" !== c) {
                    if (hs(t.charCodeAt(n))) {
                        const e = t.charCodeAt(n);
                        let r = n + 1;
                        for (; r < t.length && (t.charCodeAt(r) !== e || o(r)); )
                            r += 1;
                        if (t.charCodeAt(r) !== e)
                            throw new Error("Attribute value didn't end");
                        h = ls(t.slice(n + 1, r)),
                            n = r + 1
                    } else {
                        const e = n;
                        for (; n < t.length && (!us(t.charCodeAt(n)) && 93 !== t.charCodeAt(n) || o(n)); )
                            n += 1;
                        h = ls(t.slice(e, n))
                    }
                    s(0);
                    const e = 32 | t.charCodeAt(n);
                    115 === e ? (u = !1,
                        s(1)) : 105 === e && (u = !0,
                        s(1))
                }
                if (93 !== t.charCodeAt(n))
                    throw new Error("Attribute selector didn't terminate");
                n += 1;
                const p = {
                    type: Zi.Attribute,
                    name: e,
                    action: c,
                    value: h,
                    namespace: a,
                    ignoreCase: u
                };
                r.push(p);
                break
            }
            case 58:
            {
                if (58 === t.charCodeAt(n + 1)) {
                    r.push({
                        type: Zi.PseudoElement,
                        name: i(2).toLowerCase(),
                        data: 40 === t.charCodeAt(n) ? a() : null
                    });
                    continue
                }
                const e = i(1).toLowerCase();
                let s = null;
                if (40 === t.charCodeAt(n))
                    if (ss.has(e)) {
                        if (hs(t.charCodeAt(n + 1)))
                            throw new Error(`Pseudo-selector ${e} cannot be quoted`);
                        if (s = [],
                            n = fs(s, t, n + 1),
                        41 !== t.charCodeAt(n))
                            throw new Error(`Missing closing parenthesis in :${e} (${t})`);
                        n += 1
                    } else {
                        if (s = a(),
                            os.has(e)) {
                            const e = s.charCodeAt(0);
                            e === s.charCodeAt(s.length - 1) && hs(e) && (s = s.slice(1, -1))
                        }
                        s = ls(s)
                    }
                r.push({
                    type: Zi.Pseudo,
                    name: e,
                    data: s
                });
                break
            }
            case 44:
                u(),
                    r = [],
                    s(1);
                break;
            default:
            {
                if (t.startsWith("/*", n)) {
                    const e = t.indexOf("*/", n + 2);
                    if (e < 0)
                        throw new Error("Comment was not terminated");
                    n = e + 2,
                    0 === r.length && s(0);
                    break
                }
                let a, o = null;
                if (42 === e)
                    n += 1,
                        a = "*";
                else if (124 === e) {
                    if (a = "",
                    124 === t.charCodeAt(n + 1)) {
                        l(Zi.ColumnCombinator),
                            s(2);
                        break
                    }
                } else {
                    if (!ns.test(t.slice(n)))
                        break e;
                    a = i(0)
                }
                124 === t.charCodeAt(n) && 124 !== t.charCodeAt(n + 1) && (o = a,
                    42 === t.charCodeAt(n + 1) ? (a = "*",
                        n += 2) : a = i(1)),
                    r.push("*" === a ? {
                        type: Zi.Universal,
                        namespace: o
                    } : {
                        type: Zi.Tag,
                        name: a,
                        namespace: o
                    })
            }
        }
    }
    return u(),
        n
}
var ds = {
    trueFunc: function() {
        return !0
    },
    falseFunc: function() {
        return !1
    }
}
    , Es = ds.trueFunc;
const ms = new Map([[Zi.Universal, 50], [Zi.Tag, 30], [Zi.Attribute, 1], [Zi.Pseudo, 0]]);
function Ts(e) {
    return !ms.has(e.type)
}
const _s = new Map([[es.Exists, 10], [es.Equals, 8], [es.Not, 7], [es.Start, 6], [es.End, 6], [es.Any, 5]]);
function As(e) {
    const t = e.map(gs);
    for (let n = 1; n < e.length; n++) {
        const r = t[n];
        if (!(r < 0))
            for (let i = n - 1; i >= 0 && r < t[i]; i--) {
                const n = e[i + 1];
                e[i + 1] = e[i],
                    e[i] = n,
                    t[i + 1] = t[i],
                    t[i] = r
            }
    }
}
function gs(e) {
    var t, n;
    let r = null !== (t = ms.get(e.type)) && void 0 !== t ? t : -1;
    return e.type === Zi.Attribute ? (r = null !== (n = _s.get(e.action)) && void 0 !== n ? n : 4,
    e.action === es.Equals && "id" === e.name && (r = 9),
    e.ignoreCase && (r >>= 1)) : e.type === Zi.Pseudo && (e.data ? "has" === e.name || "contains" === e.name ? r = 0 : Array.isArray(e.data) ? (r = Math.min(...e.data.map((e => Math.min(...e.map(gs))))),
    r < 0 && (r = 0)) : r = 2 : r = 3),
        r
}
const Ns = /[-[\]{}()*+?.,\\^$|#\s]/g;
function Cs(e) {
    return e.replace(Ns, "\\$&")
}
const Is = new Set(["accept", "accept-charset", "align", "alink", "axis", "bgcolor", "charset", "checked", "clear", "codetype", "color", "compact", "declare", "defer", "dir", "direction", "disabled", "enctype", "face", "frame", "hreflang", "http-equiv", "lang", "language", "link", "media", "method", "multiple", "nohref", "noresize", "noshade", "nowrap", "readonly", "rel", "rev", "rules", "scope", "scrolling", "selected", "shape", "target", "text", "type", "valign", "valuetype", "vlink"]);
function Ss(e, t) {
    return "boolean" == typeof e.ignoreCase ? e.ignoreCase : "quirks" === e.ignoreCase ? !!t.quirksMode : !t.xmlMode && Is.has(e.name)
}
const bs = {
    equals(e, t, n) {
        const {adapter: r} = n
            , {name: i} = t;
        let {value: s} = t;
        return Ss(t, n) ? (s = s.toLowerCase(),
                t => {
                    const n = r.getAttributeValue(t, i);
                    return null != n && n.length === s.length && n.toLowerCase() === s && e(t)
                }
        ) : t => r.getAttributeValue(t, i) === s && e(t)
    },
    hyphen(e, t, n) {
        const {adapter: r} = n
            , {name: i} = t;
        let {value: s} = t;
        const a = s.length;
        return Ss(t, n) ? (s = s.toLowerCase(),
                function(t) {
                    const n = r.getAttributeValue(t, i);
                    return null != n && (n.length === a || "-" === n.charAt(a)) && n.substr(0, a).toLowerCase() === s && e(t)
                }
        ) : function(t) {
            const n = r.getAttributeValue(t, i);
            return null != n && (n.length === a || "-" === n.charAt(a)) && n.substr(0, a) === s && e(t)
        }
    },
    element(e, t, n) {
        const {adapter: r} = n
            , {name: i, value: s} = t;
        if (/\s/.test(s))
            return ds.falseFunc;
        const a = new RegExp(`(?:^|\\s)${Cs(s)}(?:$|\\s)`,Ss(t, n) ? "i" : "");
        return function(t) {
            const n = r.getAttributeValue(t, i);
            return null != n && n.length >= s.length && a.test(n) && e(t)
        }
    },
    exists: (e, {name: t}, {adapter: n}) => r => n.hasAttrib(r, t) && e(r),
    start(e, t, n) {
        const {adapter: r} = n
            , {name: i} = t;
        let {value: s} = t;
        const a = s.length;
        return 0 === a ? ds.falseFunc : Ss(t, n) ? (s = s.toLowerCase(),
                t => {
                    const n = r.getAttributeValue(t, i);
                    return null != n && n.length >= a && n.substr(0, a).toLowerCase() === s && e(t)
                }
        ) : t => {
            var n;
            return !!(null === (n = r.getAttributeValue(t, i)) || void 0 === n ? void 0 : n.startsWith(s)) && e(t)
        }
    },
    end(e, t, n) {
        const {adapter: r} = n
            , {name: i} = t;
        let {value: s} = t;
        const a = -s.length;
        return 0 === a ? ds.falseFunc : Ss(t, n) ? (s = s.toLowerCase(),
                t => {
                    var n;
                    return (null === (n = r.getAttributeValue(t, i)) || void 0 === n ? void 0 : n.substr(a).toLowerCase()) === s && e(t)
                }
        ) : t => {
            var n;
            return !!(null === (n = r.getAttributeValue(t, i)) || void 0 === n ? void 0 : n.endsWith(s)) && e(t)
        }
    },
    any(e, t, n) {
        const {adapter: r} = n
            , {name: i, value: s} = t;
        if ("" === s)
            return ds.falseFunc;
        if (Ss(t, n)) {
            const t = new RegExp(Cs(s),"i");
            return function(n) {
                const a = r.getAttributeValue(n, i);
                return null != a && a.length >= s.length && t.test(a) && e(n)
            }
        }
        return t => {
            var n;
            return !!(null === (n = r.getAttributeValue(t, i)) || void 0 === n ? void 0 : n.includes(s)) && e(t)
        }
    },
    not(e, t, n) {
        const {adapter: r} = n
            , {name: i} = t;
        let {value: s} = t;
        return "" === s ? t => !!r.getAttributeValue(t, i) && e(t) : Ss(t, n) ? (s = s.toLowerCase(),
                t => {
                    const n = r.getAttributeValue(t, i);
                    return (null == n || n.length !== s.length || n.toLowerCase() !== s) && e(t)
                }
        ) : t => r.getAttributeValue(t, i) !== s && e(t)
    }
};
var Os = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.parse = void 0;
        var n = new Set([9, 10, 12, 13, 32])
            , r = "0".charCodeAt(0)
            , i = "9".charCodeAt(0);
        t.parse = function(e) {
            if ("even" === (e = e.trim().toLowerCase()))
                return [2, 0];
            if ("odd" === e)
                return [2, 1];
            var t = 0
                , s = 0
                , a = c()
                , o = l();
            if (t < e.length && "n" === e.charAt(t) && (t++,
                s = a * (null != o ? o : 1),
                h(),
                t < e.length ? (a = c(),
                    h(),
                    o = l()) : a = o = 0),
            null === o || t < e.length)
                throw new Error("n-th rule couldn't be parsed ('" + e + "')");
            return [s, a * o];
            function c() {
                return "-" === e.charAt(t) ? (t++,
                    -1) : ("+" === e.charAt(t) && t++,
                    1)
            }
            function l() {
                for (var n = t, s = 0; t < e.length && e.charCodeAt(t) >= r && e.charCodeAt(t) <= i; )
                    s = 10 * s + (e.charCodeAt(t) - r),
                        t++;
                return t === n ? null : s
            }
            function h() {
                for (; t < e.length && n.has(e.charCodeAt(t)); )
                    t++
            }
        }
    }
));
qe(Os),
    Os.parse;
var ys = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.compile = void 0,
            t.compile = function(e) {
                var t = e[0]
                    , n = e[1] - 1;
                if (n < 0 && t <= 0)
                    return ds.falseFunc;
                if (-1 === t)
                    return function(e) {
                        return e <= n
                    }
                        ;
                if (0 === t)
                    return function(e) {
                        return e === n
                    }
                        ;
                if (1 === t)
                    return n < 0 ? ds.trueFunc : function(e) {
                        return e >= n
                    }
                        ;
                var r = Math.abs(t)
                    , i = (n % r + r) % r;
                return t > 1 ? function(e) {
                        return e >= n && e % r === i
                    }
                    : function(e) {
                        return e <= n && e % r === i
                    }
            }
    }
));
qe(ys),
    ys.compile;
var Ls = Os
    , ks = ys
    , vs = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.compile = t.parse = void 0,
            Object.defineProperty(t, "parse", {
                enumerable: !0,
                get: function() {
                    return Ls.parse
                }
            }),
            Object.defineProperty(t, "compile", {
                enumerable: !0,
                get: function() {
                    return ks.compile
                }
            }),
            t.default = function(e) {
                return (0,
                    ks.compile)((0,
                    Ls.parse)(e))
            }
    }
))
    , Ds = qe(vs);
function Rs(e, t) {
    return n => {
        const r = t.getParent(n);
        return null != r && t.isTag(r) && e(n)
    }
}
vs.compile,
    vs.parse;
const Ms = {
    contains: (e, t, {adapter: n}) => function(r) {
        return e(r) && n.getText(r).includes(t)
    }
    ,
    icontains(e, t, {adapter: n}) {
        const r = t.toLowerCase();
        return function(t) {
            return e(t) && n.getText(t).toLowerCase().includes(r)
        }
    },
    "nth-child"(e, t, {adapter: n, equals: r}) {
        const i = Ds(t);
        return i === ds.falseFunc ? ds.falseFunc : i === ds.trueFunc ? Rs(e, n) : function(t) {
            const s = n.getSiblings(t);
            let a = 0;
            for (let e = 0; e < s.length && !r(t, s[e]); e++)
                n.isTag(s[e]) && a++;
            return i(a) && e(t)
        }
    },
    "nth-last-child"(e, t, {adapter: n, equals: r}) {
        const i = Ds(t);
        return i === ds.falseFunc ? ds.falseFunc : i === ds.trueFunc ? Rs(e, n) : function(t) {
            const s = n.getSiblings(t);
            let a = 0;
            for (let e = s.length - 1; e >= 0 && !r(t, s[e]); e--)
                n.isTag(s[e]) && a++;
            return i(a) && e(t)
        }
    },
    "nth-of-type"(e, t, {adapter: n, equals: r}) {
        const i = Ds(t);
        return i === ds.falseFunc ? ds.falseFunc : i === ds.trueFunc ? Rs(e, n) : function(t) {
            const s = n.getSiblings(t);
            let a = 0;
            for (let e = 0; e < s.length; e++) {
                const i = s[e];
                if (r(t, i))
                    break;
                n.isTag(i) && n.getName(i) === n.getName(t) && a++
            }
            return i(a) && e(t)
        }
    },
    "nth-last-of-type"(e, t, {adapter: n, equals: r}) {
        const i = Ds(t);
        return i === ds.falseFunc ? ds.falseFunc : i === ds.trueFunc ? Rs(e, n) : function(t) {
            const s = n.getSiblings(t);
            let a = 0;
            for (let e = s.length - 1; e >= 0; e--) {
                const i = s[e];
                if (r(t, i))
                    break;
                n.isTag(i) && n.getName(i) === n.getName(t) && a++
            }
            return i(a) && e(t)
        }
    },
    root: (e, t, {adapter: n}) => t => {
        const r = n.getParent(t);
        return (null == r || !n.isTag(r)) && e(t)
    }
    ,
    scope(e, t, n, r) {
        const {equals: i} = n;
        return r && 0 !== r.length ? 1 === r.length ? t => i(r[0], t) && e(t) : t => r.includes(t) && e(t) : Ms.root(e, t, n)
    },
    hover: Ps("isHovered"),
    visited: Ps("isVisited"),
    active: Ps("isActive")
};
function Ps(e) {
    return function(t, n, {adapter: r}) {
        const i = r[e];
        return "function" != typeof i ? ds.falseFunc : function(e) {
            return i(e) && t(e)
        }
    }
}
const xs = {
    empty: (e, {adapter: t}) => !t.getChildren(e).some((e => t.isTag(e) || "" !== t.getText(e))),
    "first-child"(e, {adapter: t, equals: n}) {
        if (t.prevElementSibling)
            return null == t.prevElementSibling(e);
        const r = t.getSiblings(e).find((e => t.isTag(e)));
        return null != r && n(e, r)
    },
    "last-child"(e, {adapter: t, equals: n}) {
        const r = t.getSiblings(e);
        for (let i = r.length - 1; i >= 0; i--) {
            if (n(e, r[i]))
                return !0;
            if (t.isTag(r[i]))
                break
        }
        return !1
    },
    "first-of-type"(e, {adapter: t, equals: n}) {
        const r = t.getSiblings(e)
            , i = t.getName(e);
        for (let s = 0; s < r.length; s++) {
            const a = r[s];
            if (n(e, a))
                return !0;
            if (t.isTag(a) && t.getName(a) === i)
                break
        }
        return !1
    },
    "last-of-type"(e, {adapter: t, equals: n}) {
        const r = t.getSiblings(e)
            , i = t.getName(e);
        for (let s = r.length - 1; s >= 0; s--) {
            const a = r[s];
            if (n(e, a))
                return !0;
            if (t.isTag(a) && t.getName(a) === i)
                break
        }
        return !1
    },
    "only-of-type"(e, {adapter: t, equals: n}) {
        const r = t.getName(e);
        return t.getSiblings(e).every((i => n(e, i) || !t.isTag(i) || t.getName(i) !== r))
    },
    "only-child": (e, {adapter: t, equals: n}) => t.getSiblings(e).every((r => n(e, r) || !t.isTag(r)))
};
function ws(e, t, n, r) {
    if (null === n) {
        if (e.length > r)
            throw new Error(`Pseudo-class :${t} requires an argument`)
    } else if (e.length === r)
        throw new Error(`Pseudo-class :${t} doesn't have any arguments`)
}
const Bs = {
    "any-link": ":is(a, area, link)[href]",
    link: ":any-link:not(:visited)",
    disabled: ":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",
    enabled: ":not(:disabled)",
    checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
    required: ":is(input, select, textarea)[required]",
    optional: ":is(input, select, textarea):not([required])",
    selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
    checkbox: "[type=checkbox]",
    file: "[type=file]",
    password: "[type=password]",
    radio: "[type=radio]",
    reset: "[type=reset]",
    image: "[type=image]",
    submit: "[type=submit]",
    parent: ":not(:empty)",
    header: ":is(h1, h2, h3, h4, h5, h6)",
    button: ":is(button, input[type=button])",
    input: ":is(input, textarea, select, button)",
    text: "input:is(:not([type!='']), [type=text])"
}
    , Fs = {};
function Us(e, t) {
    const n = t.getSiblings(e);
    if (n.length <= 1)
        return [];
    const r = n.indexOf(e);
    return r < 0 || r === n.length - 1 ? [] : n.slice(r + 1).filter(t.isTag)
}
function Hs(e) {
    return {
        xmlMode: !!e.xmlMode,
        lowerCaseAttributeNames: !!e.lowerCaseAttributeNames,
        lowerCaseTags: !!e.lowerCaseTags,
        quirksMode: !!e.quirksMode,
        cacheResults: !!e.cacheResults,
        pseudos: e.pseudos,
        adapter: e.adapter,
        equals: e.equals
    }
}
const Gs = (e, t, n, r, i) => {
    const s = i(t, Hs(n), r);
    return s === ds.trueFunc ? e : s === ds.falseFunc ? ds.falseFunc : t => s(t) && e(t)
}
    , Ys = {
    is: Gs,
    matches: Gs,
    where: Gs,
    not(e, t, n, r, i) {
        const s = i(t, Hs(n), r);
        return s === ds.falseFunc ? e : s === ds.trueFunc ? ds.falseFunc : t => !s(t) && e(t)
    },
    has(e, t, n, r, i) {
        const {adapter: s} = n
            , a = Hs(n);
        a.relativeSelector = !0;
        const o = t.some((e => e.some(Ts))) ? [Fs] : void 0
            , c = i(t, a, o);
        if (c === ds.falseFunc)
            return ds.falseFunc;
        const l = function(e, t) {
            return e === ds.falseFunc ? ds.falseFunc : n => t.isTag(n) && e(n)
        }(c, s);
        if (o && c !== ds.trueFunc) {
            const {shouldTestNextSiblings: t=!1} = c;
            return n => {
                if (!e(n))
                    return !1;
                o[0] = n;
                const r = s.getChildren(n)
                    , i = t ? [...r, ...Us(n, s)] : r;
                return s.existsOne(l, i)
            }
        }
        return t => e(t) && s.existsOne(l, s.getChildren(t))
    }
};
function qs(e, t) {
    const n = t.getParent(e);
    return n && t.isTag(n) ? n : null
}
function Ks(e, t, n, r, i) {
    const {adapter: s, equals: a} = n;
    switch (t.type) {
        case Zi.PseudoElement:
            throw new Error("Pseudo-elements are not supported by css-select");
        case Zi.ColumnCombinator:
            throw new Error("Column combinators are not yet supported by css-select");
        case Zi.Attribute:
            if (null != t.namespace)
                throw new Error("Namespaced attributes are not yet supported by css-select");
            return n.xmlMode && !n.lowerCaseAttributeNames || (t.name = t.name.toLowerCase()),
                bs[t.action](e, t, n);
        case Zi.Pseudo:
            return function(e, t, n, r, i) {
                var s;
                const {name: a, data: o} = t;
                if (Array.isArray(o)) {
                    if (!(a in Ys))
                        throw new Error(`Unknown pseudo-class :${a}(${o})`);
                    return Ys[a](e, o, n, r, i)
                }
                const c = null === (s = n.pseudos) || void 0 === s ? void 0 : s[a]
                    , l = "string" == typeof c ? c : Bs[a];
                if ("string" == typeof l) {
                    if (null != o)
                        throw new Error(`Pseudo ${a} doesn't have any arguments`);
                    const t = ps(l);
                    return Ys.is(e, t, n, r, i)
                }
                if ("function" == typeof c)
                    return ws(c, a, o, 1),
                        t => c(t, o) && e(t);
                if (a in Ms)
                    return Ms[a](e, o, n, r);
                if (a in xs) {
                    const t = xs[a];
                    return ws(t, a, o, 2),
                        r => t(r, n, o) && e(r)
                }
                throw new Error(`Unknown pseudo-class :${a}`)
            }(e, t, n, r, i);
        case Zi.Tag:
        {
            if (null != t.namespace)
                throw new Error("Namespaced tag names are not yet supported by css-select");
            let {name: r} = t;
            return n.xmlMode && !n.lowerCaseTags || (r = r.toLowerCase()),
                function(t) {
                    return s.getName(t) === r && e(t)
                }
        }
        case Zi.Descendant:
        {
            if (!1 === n.cacheResults || "undefined" == typeof WeakSet)
                return function(t) {
                    let n = t;
                    for (; n = qs(n, s); )
                        if (e(n))
                            return !0;
                    return !1
                }
                    ;
            const t = new WeakSet;
            return function(n) {
                let r = n;
                for (; r = qs(r, s); )
                    if (!t.has(r)) {
                        if (s.isTag(r) && e(r))
                            return !0;
                        t.add(r)
                    }
                return !1
            }
        }
        case "_flexibleDescendant":
            return function(t) {
                let n = t;
                do {
                    if (e(n))
                        return !0
                } while (n = qs(n, s));
                return !1
            }
                ;
        case Zi.Parent:
            return function(t) {
                return s.getChildren(t).some((t => s.isTag(t) && e(t)))
            }
                ;
        case Zi.Child:
            return function(t) {
                const n = s.getParent(t);
                return null != n && s.isTag(n) && e(n)
            }
                ;
        case Zi.Sibling:
            return function(t) {
                const n = s.getSiblings(t);
                for (let r = 0; r < n.length; r++) {
                    const i = n[r];
                    if (a(t, i))
                        break;
                    if (s.isTag(i) && e(i))
                        return !0
                }
                return !1
            }
                ;
        case Zi.Adjacent:
            return s.prevElementSibling ? function(t) {
                    const n = s.prevElementSibling(t);
                    return null != n && e(n)
                }
                : function(t) {
                    const n = s.getSiblings(t);
                    let r;
                    for (let e = 0; e < n.length; e++) {
                        const i = n[e];
                        if (a(t, i))
                            break;
                        s.isTag(i) && (r = i)
                    }
                    return !!r && e(r)
                }
                ;
        case Zi.Universal:
            if (null != t.namespace && "*" !== t.namespace)
                throw new Error("Namespaced universal selectors are not yet supported by css-select");
            return e
    }
}
function js(e) {
    return e.type === Zi.Pseudo && ("scope" === e.name || Array.isArray(e.data) && e.data.some((e => e.some(js))))
}
const Vs = {
    type: Zi.Descendant
}
    , Ws = {
    type: "_flexibleDescendant"
}
    , Qs = {
    type: Zi.Pseudo,
    name: "scope",
    data: null
};
function Xs(e, t, n) {
    var r;
    e.forEach(As),
        n = null !== (r = t.context) && void 0 !== r ? r : n;
    const i = Array.isArray(n)
        , s = n && (Array.isArray(n) ? n : [n]);
    if (!1 !== t.relativeSelector)
        !function(e, {adapter: t}, n) {
            const r = !!(null == n ? void 0 : n.every((e => {
                    const n = t.isTag(e) && t.getParent(e);
                    return e === Fs || n && t.isTag(n)
                }
            )));
            for (const t of e) {
                if (t.length > 0 && Ts(t[0]) && t[0].type !== Zi.Descendant)
                    ;
                else {
                    if (!r || t.some(js))
                        continue;
                    t.unshift(Vs)
                }
                t.unshift(Qs)
            }
        }(e, t, s);
    else if (e.some((e => e.length > 0 && Ts(e[0]))))
        throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
    let a = !1;
    const o = e.map((e => {
            if (e.length >= 2) {
                const [t,n] = e;
                t.type !== Zi.Pseudo || "scope" !== t.name || (i && n.type === Zi.Descendant ? e[1] = Ws : n.type !== Zi.Adjacent && n.type !== Zi.Sibling || (a = !0))
            }
            return function(e, t, n) {
                var r;
                return e.reduce(( (e, r) => e === ds.falseFunc ? ds.falseFunc : Ks(e, r, t, n, Xs)), null !== (r = t.rootFunc) && void 0 !== r ? r : ds.trueFunc)
            }(e, t, s)
        }
    )).reduce($s, ds.falseFunc);
    return o.shouldTestNextSiblings = a,
        o
}
function $s(e, t) {
    return t === ds.falseFunc || e === ds.trueFunc ? e : e === ds.falseFunc || t === ds.trueFunc ? t : function(n) {
        return e(n) || t(n)
    }
}
const zs = (e, t) => e === t
    , Js = {
    adapter: Se,
    equals: zs
};
const Zs = (ea = Xs,
        function(e, t, n) {
            const r = function(e) {
                var t, n, r, i;
                const s = null != e ? e : Js;
                return null !== (t = s.adapter) && void 0 !== t || (s.adapter = Se),
                null !== (n = s.equals) && void 0 !== n || (s.equals = null !== (i = null === (r = s.adapter) || void 0 === r ? void 0 : r.equals) && void 0 !== i ? i : zs),
                    s
            }(t);
            return ea(e, r, n)
        }
);
var ea;
function ta(e, t, n=!1) {
    return n && (e = function(e, t) {
        const n = Array.isArray(e) ? e.slice(0) : [e]
            , r = n.length;
        for (let e = 0; e < r; e++) {
            const r = Us(n[e], t);
            n.push(...r)
        }
        return n
    }(e, t)),
        Array.isArray(e) ? t.removeSubsets(e) : t.getChildren(e)
}
const na = new Set(["first", "last", "eq", "gt", "nth", "lt", "even", "odd"]);
function ra(e) {
    return "pseudo" === e.type && (!!na.has(e.name) || !("not" !== e.name || !Array.isArray(e.data)) && e.data.some((e => e.some(ra))))
}
function ia(e) {
    const t = []
        , n = [];
    for (const r of e)
        r.some(ra) ? t.push(r) : n.push(r);
    return [n, t]
}
const sa = {
    type: Zi.Universal,
    namespace: null
}
    , aa = {
    type: Zi.Pseudo,
    name: "scope",
    data: null
};
function oa(e, t, n={}) {
    return ca([e], t, n)
}
function ca(e, t, n={}) {
    if ("function" == typeof t)
        return e.some(t);
    const [r,i] = ia(ps(t));
    return r.length > 0 && e.some(Zs(r, n)) || i.some((t => ua(t, e, n).length > 0))
}
function la(e, t, n={}) {
    return ha(ps(e), t, n)
}
function ha(e, t, n) {
    if (0 === t.length)
        return [];
    const [r,i] = ia(e);
    let s;
    if (r.length) {
        const e = Ea(t, r, n);
        if (0 === i.length)
            return e;
        e.length && (s = new Set(e))
    }
    for (let e = 0; e < i.length && (null == s ? void 0 : s.size) !== t.length; e++) {
        const r = i[e]
            , a = s ? t.filter((e => I(e) && !s.has(e))) : t;
        if (0 === a.length)
            break;
        const o = ua(r, t, n);
        if (o.length)
            if (s)
                o.forEach((e => s.add(e)));
            else {
                if (e === i.length - 1)
                    return o;
                s = new Set(o)
            }
    }
    return void 0 !== s ? s.size === t.length ? t : t.filter((e => s.has(e))) : []
}
function ua(e, t, n) {
    var r;
    if (e.some(as)) {
        const i = null !== (r = n.root) && void 0 !== r ? r : function(e) {
            for (; e.parent; )
                e = e.parent;
            return e
        }(t[0])
            , s = {
            ...n,
            context: t,
            relativeSelector: !1
        };
        return e.push(aa),
            pa(i, e, s, !0, t.length)
    }
    return pa(t, e, n, !1, t.length)
}
function pa(e, t, n, r, i) {
    const s = t.findIndex(ra)
        , a = t.slice(0, s)
        , o = t[s]
        , c = t.length - 1 === s ? i : 1 / 0
        , l = function(e, t, n) {
        const r = null != t ? parseInt(t, 10) : NaN;
        switch (e) {
            case "first":
                return 1;
            case "nth":
            case "eq":
                return isFinite(r) ? r >= 0 ? r + 1 : 1 / 0 : 0;
            case "lt":
                return isFinite(r) ? r >= 0 ? Math.min(r, n) : 1 / 0 : 0;
            case "gt":
                return isFinite(r) ? 1 / 0 : 0;
            case "odd":
                return 2 * n;
            case "even":
                return 2 * n - 1;
            case "last":
            case "not":
                return 1 / 0
        }
    }(o.name, o.data, c);
    if (0 === l)
        return [];
    const h = (0 !== a.length || Array.isArray(e) ? 0 === a.length ? (Array.isArray(e) ? e : [e]).filter(I) : r || a.some(as) ? fa(e, [a], n, l) : Ea(e, [a], n) : Z(e).filter(I)).slice(0, l);
    let u = function(e, t, n, r) {
        const i = "string" == typeof n ? parseInt(n, 10) : NaN;
        switch (e) {
            case "first":
            case "lt":
                return t;
            case "last":
                return t.length > 0 ? [t[t.length - 1]] : t;
            case "nth":
            case "eq":
                return isFinite(i) && Math.abs(i) < t.length ? [i < 0 ? t[t.length + i] : t[i]] : [];
            case "gt":
                return isFinite(i) ? t.slice(i + 1) : [];
            case "even":
                return t.filter(( (e, t) => t % 2 == 0));
            case "odd":
                return t.filter(( (e, t) => t % 2 == 1));
            case "not":
            {
                const e = new Set(ha(n, t, r));
                return t.filter((t => !e.has(t)))
            }
        }
    }(o.name, h, o.data, n);
    if (0 === u.length || t.length === s + 1)
        return u;
    const p = t.slice(s + 1)
        , f = p.some(as);
    if (f) {
        if (as(p[0])) {
            const {type: e} = p[0];
            e !== Zi.Sibling && e !== Zi.Adjacent || (u = ta(u, Se, !0)),
                p.unshift(sa)
        }
        n = {
            ...n,
            relativeSelector: !1,
            rootFunc: e => u.includes(e)
        }
    } else
        n.rootFunc && n.rootFunc !== Es && (n = {
            ...n,
            rootFunc: Es
        });
    return p.some(ra) ? pa(u, p, n, !1, i) : f ? fa(u, [p], n, i) : Ea(u, [p], n)
}
function fa(e, t, n, r) {
    return da(e, Zs(t, n, e), r)
}
function da(e, t, n=1 / 0) {
    return ae((e => I(e) && t(e)), ta(e, Se, t.shouldTestNextSiblings), !0, n)
}
function Ea(e, t, n) {
    const r = (Array.isArray(e) ? e : [e]).filter(I);
    if (0 === r.length)
        return r;
    const i = Zs(t, n);
    return i === Es ? r : r.filter(i)
}
var ma = function(e, t, n) {
    if (n || 2 === arguments.length)
        for (var r, i = 0, s = t.length; i < s; i++)
            !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                r[i] = t[i]);
    return e.concat(r || Array.prototype.slice.call(t))
}
    , Ta = /^\s*[~+]/;
function _a(e) {
    return function(t) {
        for (var n = [], r = 1; r < arguments.length; r++)
            n[r - 1] = arguments[r];
        return function(r) {
            var i, s = e(t, this);
            return r && (s = xa(s, r, this.options.xmlMode, null === (i = this._root) || void 0 === i ? void 0 : i[0])),
                this._make(this.length > 1 && s.length > 1 ? n.reduce((function(e, t) {
                        return t(e)
                    }
                ), s) : s)
        }
    }
}
var Aa = _a((function(e, t) {
        for (var n, r = [], i = 0; i < t.length; i++) {
            var s = e(t[i]);
            r.push(s)
        }
        return (n = new Array).concat.apply(n, r)
    }
))
    , ga = _a((function(e, t) {
        for (var n = [], r = 0; r < t.length; r++) {
            var i = e(t[r]);
            null !== i && n.push(i)
        }
        return n
    }
));
function Na(e) {
    for (var t = [], n = 1; n < arguments.length; n++)
        t[n - 1] = arguments[n];
    var r = null
        , i = _a((function(e, t) {
            var n = [];
            return Bi(t, (function(t) {
                    for (var i; (i = e(t)) && !(null == r ? void 0 : r(i, n.length)); t = i)
                        n.push(i)
                }
            )),
                n
        }
    )).apply(void 0, ma([e], t, !1));
    return function(e, t) {
        var n = this;
        r = "string" == typeof e ? function(t) {
                return oa(t, e, n.options)
            }
            : e ? Pa(e) : null;
        var s = i.call(this, t);
        return r = null,
            s
    }
}
function Ca(e) {
    return Array.from(new Set(e))
}
var Ia = ga((function(e) {
        var t = e.parent;
        return t && !L(t) ? t : null
    }
), Ca)
    , Sa = Aa((function(e) {
        for (var t = []; e.parent && !L(e.parent); )
            t.push(e.parent),
                e = e.parent;
        return t
    }
), Ee, (function(e) {
        return e.reverse()
    }
))
    , ba = Na((function(e) {
        var t = e.parent;
        return t && !L(t) ? t : null
    }
), Ee, (function(e) {
        return e.reverse()
    }
));
var Oa = ga((function(e) {
        return ne(e)
    }
))
    , ya = Aa((function(e) {
        for (var t = []; e.next; )
            I(e = e.next) && t.push(e);
        return t
    }
), Ca)
    , La = Na((function(e) {
        return ne(e)
    }
), Ca)
    , ka = ga((function(e) {
        return re(e)
    }
))
    , va = Aa((function(e) {
        for (var t = []; e.prev; )
            I(e = e.prev) && t.push(e);
        return t
    }
), Ca)
    , Da = Na((function(e) {
        return re(e)
    }
), Ca)
    , Ra = Aa((function(e) {
        return te(e).filter((function(t) {
                return I(t) && t !== e
            }
        ))
    }
), Ee)
    , Ma = Aa((function(e) {
        return Z(e).filter(I)
    }
), Ca);
function Pa(e) {
    return "function" == typeof e ? function(t, n) {
            return e.call(t, n, t)
        }
        : wi(e) ? function(t) {
                return Array.prototype.includes.call(e, t)
            }
            : function(t) {
                return e === t
            }
}
function xa(e, t, n, r) {
    return "string" == typeof t ? la(t, e, {
        xmlMode: n,
        root: r
    }) : e.filter(Pa(t))
}
var wa = Object.freeze({
    __proto__: null,
    find: function(e) {
        var t;
        if (!e)
            return this._make([]);
        var n = this.toArray();
        if ("string" != typeof e) {
            var r = wi(e) ? e.toArray() : [e];
            return this._make(r.filter((function(e) {
                    return n.some((function(t) {
                            return Di(t, e)
                        }
                    ))
                }
            )))
        }
        var i = Ta.test(e) ? n : this.children().toArray()
            , s = {
            context: n,
            root: null === (t = this._root) || void 0 === t ? void 0 : t[0],
            xmlMode: this.options.xmlMode,
            lowerCaseTags: this.options.lowerCaseTags,
            lowerCaseAttributeNames: this.options.lowerCaseAttributeNames,
            pseudos: this.options.pseudos,
            quirksMode: this.options.quirksMode
        };
        return this._make(function(e, t, n={}, r=1 / 0) {
            if ("function" == typeof e)
                return da(t, e);
            const [i,s] = ia(ps(e))
                , a = s.map((e => pa(t, e, n, !0, r)));
            return i.length && a.push(fa(t, i, n, r)),
                0 === a.length ? [] : 1 === a.length ? a[0] : Ee(a.reduce(( (e, t) => [...e, ...t])))
        }(e, i, s))
    },
    parent: Ia,
    parents: Sa,
    parentsUntil: ba,
    closest: function(e) {
        var t, n = [];
        if (!e)
            return this._make(n);
        var r = {
            xmlMode: this.options.xmlMode,
            root: null === (t = this._root) || void 0 === t ? void 0 : t[0]
        }
            , i = "string" == typeof e ? function(t) {
                return oa(t, e, r)
            }
            : Pa(e);
        return Bi(this, (function(e) {
                for (; e && I(e); ) {
                    if (i(e, 0)) {
                        n.includes(e) || n.push(e);
                        break
                    }
                    e = e.parent
                }
            }
        )),
            this._make(n)
    },
    next: Oa,
    nextAll: ya,
    nextUntil: La,
    prev: ka,
    prevAll: va,
    prevUntil: Da,
    siblings: Ra,
    children: Ma,
    contents: function() {
        var e = this.toArray().reduce((function(e, t) {
                return k(t) ? e.concat(t.children) : e
            }
        ), []);
        return this._make(e)
    },
    each: function(e) {
        for (var t = 0, n = this.length; t < n && !1 !== e.call(this[t], t, this[t]); )
            ++t;
        return this
    },
    map: function(e) {
        for (var t = [], n = 0; n < this.length; n++) {
            var r = this[n]
                , i = e.call(r, n, r);
            null != i && (t = t.concat(i))
        }
        return this._make(t)
    },
    filter: function(e) {
        var t;
        return this._make(xa(this.toArray(), e, this.options.xmlMode, null === (t = this._root) || void 0 === t ? void 0 : t[0]))
    },
    filterArray: xa,
    is: function(e) {
        var t = this.toArray();
        return "string" == typeof e ? ca(t.filter(I), e, this.options) : !!e && t.some(Pa(e))
    },
    not: function(e) {
        var t = this.toArray();
        if ("string" == typeof e) {
            var n = new Set(la(e, t, this.options));
            t = t.filter((function(e) {
                    return !n.has(e)
                }
            ))
        } else {
            var r = Pa(e);
            t = t.filter((function(e, t) {
                    return !r(e, t)
                }
            ))
        }
        return this._make(t)
    },
    has: function(e) {
        var t = this;
        return this.filter("string" == typeof e ? ":has(".concat(e, ")") : function(n, r) {
                return t._make(r).find(e).length > 0
            }
        )
    },
    first: function() {
        return this.length > 1 ? this._make(this[0]) : this
    },
    last: function() {
        return this.length > 0 ? this._make(this[this.length - 1]) : this
    },
    eq: function(e) {
        var t;
        return 0 === (e = +e) && this.length <= 1 ? this : (e < 0 && (e = this.length + e),
            this._make(null !== (t = this[e]) && void 0 !== t ? t : []))
    },
    get: function(e) {
        return null == e ? this.toArray() : this[e < 0 ? this.length + e : e]
    },
    toArray: function() {
        return Array.prototype.slice.call(this)
    },
    index: function(e) {
        var t, n;
        return null == e ? (t = this.parent().children(),
            n = this[0]) : "string" == typeof e ? (t = this._make(e),
            n = this[0]) : (t = this,
            n = wi(e) ? e[0] : e),
            Array.prototype.indexOf.call(t, n)
    },
    slice: function(e, t) {
        return this._make(Array.prototype.slice.call(this, e, t))
    },
    end: function() {
        var e;
        return null !== (e = this.prevObject) && void 0 !== e ? e : this._make([])
    },
    add: function(e, t) {
        var n = this._make(e, t)
            , r = Ee(ma(ma([], this.get(), !0), n.get(), !0));
        return this._make(r)
    },
    addBack: function(e) {
        return this.prevObject ? this.add(e ? this.prevObject.filter(e) : this.prevObject) : this
    }
});
function Ba(e, t) {
    var n = Array.isArray(e) ? e : [e];
    t ? t.children = n : t = null;
    for (var r = 0; r < n.length; r++) {
        var i = n[r];
        i.parent && i.parent.children !== n && ie(i),
            t ? (i.prev = n[r - 1] || null,
                i.next = n[r + 1] || null) : i.prev = i.next = null,
            i.parent = t
    }
    return t
}
var Fa = function(e, t, n) {
    if (n || 2 === arguments.length)
        for (var r, i = 0, s = t.length; i < s; i++)
            !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                r[i] = t[i]);
    return e.concat(r || Array.prototype.slice.call(t))
};
function Ua(e) {
    return function() {
        for (var t = this, n = [], r = 0; r < arguments.length; r++)
            n[r] = arguments[r];
        var i = this.length - 1;
        return Bi(this, (function(r, s) {
                if (k(r)) {
                    var a = "function" == typeof n[0] ? n[0].call(r, s, t._render(r.children)) : n
                        , o = t._makeDomArray(a, s < i);
                    e(o, r.children, r)
                }
            }
        ))
    }
}
function Ha(e, t, n, r, i) {
    for (var s, a, o = Fa([t, n], r, !0), c = 0 === t ? null : e[t - 1], l = t + n >= e.length ? null : e[t + n], h = 0; h < r.length; ++h) {
        var u = r[h]
            , p = u.parent;
        if (p) {
            var f = p.children.indexOf(u);
            f > -1 && (p.children.splice(f, 1),
            i === p && t > f && o[0]--)
        }
        u.parent = i,
        u.prev && (u.prev.next = null !== (s = u.next) && void 0 !== s ? s : null),
        u.next && (u.next.prev = null !== (a = u.prev) && void 0 !== a ? a : null),
            u.prev = 0 === h ? c : r[h - 1],
            u.next = h === r.length - 1 ? l : r[h + 1]
    }
    return c && (c.next = r[0]),
    l && (l.prev = r[r.length - 1]),
        e.splice.apply(e, o)
}
var Ga = Ua((function(e, t, n) {
        Ha(t, t.length, 0, e, n)
    }
))
    , Ya = Ua((function(e, t, n) {
        Ha(t, 0, 0, e, n)
    }
));
function qa(e) {
    return function(t) {
        for (var n = this.length - 1, r = this.parents().last(), i = 0; i < this.length; i++) {
            var s = this[i]
                , a = "function" == typeof t ? t.call(s, i, s) : "string" != typeof t || Ui(t) ? t : r.find(t).clone()
                , o = this._makeDomArray(a, i < n)[0];
            if (o && k(o)) {
                for (var c = o, l = 0; l < c.children.length; ) {
                    var h = c.children[l];
                    I(h) ? (c = h,
                        l = 0) : l++
                }
                e(s, c, [o])
            }
        }
        return this
    }
}
var Ka = qa((function(e, t, n) {
        var r = e.parent;
        if (r) {
            var i = r.children
                , s = i.indexOf(e);
            Ba([e], t),
                Ha(i, s, 0, n, r)
        }
    }
))
    , ja = qa((function(e, t, n) {
        k(e) && (Ba(e.children, t),
            Ba(n, e))
    }
));
var Va = Object.freeze({
    __proto__: null,
    _makeDomArray: function(e, t) {
        var n = this;
        return null == e ? [] : wi(e) ? t ? Fi(e.get()) : e.get() : Array.isArray(e) ? e.reduce((function(e, r) {
                return e.concat(n._makeDomArray(r, t))
            }
        ), []) : "string" == typeof e ? this._parse(e, this.options, !1, null).children : t ? Fi([e]) : [e]
    },
    appendTo: function(e) {
        return (wi(e) ? e : this._make(e)).append(this),
            this
    },
    prependTo: function(e) {
        return (wi(e) ? e : this._make(e)).prepend(this),
            this
    },
    append: Ga,
    prepend: Ya,
    wrap: Ka,
    wrapInner: ja,
    unwrap: function(e) {
        var t = this;
        return this.parent(e).not("body").each((function(e, n) {
                t._make(n).replaceWith(n.children)
            }
        )),
            this
    },
    wrapAll: function(e) {
        var t = this[0];
        if (t) {
            for (var n = this._make("function" == typeof e ? e.call(t, 0, t) : e).insertBefore(t), r = void 0, i = 0; i < n.length; i++)
                "tag" === n[i].type && (r = n[i]);
            for (var s = 0; r && s < r.children.length; ) {
                var a = r.children[s];
                "tag" === a.type ? (r = a,
                    s = 0) : s++
            }
            r && this._make(r).append(this)
        }
        return this
    },
    after: function() {
        for (var e = this, t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
        var r = this.length - 1;
        return Bi(this, (function(n, i) {
                var s = n.parent;
                if (k(n) && s) {
                    var a = s.children
                        , o = a.indexOf(n);
                    if (!(o < 0)) {
                        var c = "function" == typeof t[0] ? t[0].call(n, i, e._render(n.children)) : t;
                        Ha(a, o + 1, 0, e._makeDomArray(c, i < r), s)
                    }
                }
            }
        ))
    },
    insertAfter: function(e) {
        var t = this;
        "string" == typeof e && (e = this._make(e)),
            this.remove();
        var n = [];
        return this._makeDomArray(e).forEach((function(e) {
                var r = t.clone().toArray()
                    , i = e.parent;
                if (i) {
                    var s = i.children
                        , a = s.indexOf(e);
                    a < 0 || (Ha(s, a + 1, 0, r, i),
                        n.push.apply(n, r))
                }
            }
        )),
            this._make(n)
    },
    before: function() {
        for (var e = this, t = [], n = 0; n < arguments.length; n++)
            t[n] = arguments[n];
        var r = this.length - 1;
        return Bi(this, (function(n, i) {
                var s = n.parent;
                if (k(n) && s) {
                    var a = s.children
                        , o = a.indexOf(n);
                    if (!(o < 0)) {
                        var c = "function" == typeof t[0] ? t[0].call(n, i, e._render(n.children)) : t;
                        Ha(a, o, 0, e._makeDomArray(c, i < r), s)
                    }
                }
            }
        ))
    },
    insertBefore: function(e) {
        var t = this
            , n = this._make(e);
        this.remove();
        var r = [];
        return Bi(n, (function(e) {
                var n = t.clone().toArray()
                    , i = e.parent;
                if (i) {
                    var s = i.children
                        , a = s.indexOf(e);
                    a < 0 || (Ha(s, a, 0, n, i),
                        r.push.apply(r, n))
                }
            }
        )),
            this._make(r)
    },
    remove: function(e) {
        return Bi(e ? this.filter(e) : this, (function(e) {
                ie(e),
                    e.prev = e.next = e.parent = null
            }
        )),
            this
    },
    replaceWith: function(e) {
        var t = this;
        return Bi(this, (function(n, r) {
                var i = n.parent;
                if (i) {
                    var s = i.children
                        , a = "function" == typeof e ? e.call(n, r, n) : e
                        , o = t._makeDomArray(a);
                    Ba(o, null);
                    var c = s.indexOf(n);
                    Ha(s, c, 1, o, i),
                    o.includes(n) || (n.parent = n.prev = n.next = null)
                }
            }
        ))
    },
    empty: function() {
        return Bi(this, (function(e) {
                k(e) && (e.children.forEach((function(e) {
                        e.next = e.prev = e.parent = null
                    }
                )),
                    e.children.length = 0)
            }
        ))
    },
    html: function(e) {
        var t = this;
        if (void 0 === e) {
            var n = this[0];
            return n && k(n) ? this._render(n.children) : null
        }
        return Bi(this, (function(n) {
                k(n) && (n.children.forEach((function(e) {
                        e.next = e.prev = e.parent = null
                    }
                )),
                    Ba(wi(e) ? e.toArray() : t._parse("".concat(e), t.options, !1, n).children, n))
            }
        ))
    },
    toString: function() {
        return this._render(this)
    },
    text: function(e) {
        var t = this;
        return void 0 === e ? Li(this) : Bi(this, "function" == typeof e ? function(n, r) {
                    return t._make(n).text(e.call(n, r, Li([n])))
                }
                : function(t) {
                    k(t) && (t.children.forEach((function(e) {
                            e.next = e.prev = e.parent = null
                        }
                    )),
                        Ba(new m("".concat(e)), t))
                }
        )
    },
    clone: function() {
        return this._make(Fi(this.get()))
    }
});
function Wa(e, t, n, r) {
    if ("string" == typeof t) {
        var i = Qa(e)
            , s = "function" == typeof n ? n.call(e, r, i[t]) : n;
        "" === s ? delete i[t] : null != s && (i[t] = s),
            e.attribs.style = (a = i,
                Object.keys(a).reduce((function(e, t) {
                        return "".concat(e).concat(e ? " " : "").concat(t, ": ").concat(a[t], ";")
                    }
                ), ""))
    } else
        "object" == typeof t && Object.keys(t).forEach((function(n, r) {
                Wa(e, n, t[n], r)
            }
        ));
    var a
}
function Qa(e, t) {
    if (e && I(e)) {
        var n = function(e) {
            if (!(e = (e || "").trim()))
                return {};
            for (var t, n = {}, r = 0, i = e.split(";"); r < i.length; r++) {
                var s = i[r]
                    , a = s.indexOf(":");
                if (a < 1 || a === s.length - 1) {
                    var o = s.trimEnd();
                    o.length > 0 && void 0 !== t && (n[t] += ";".concat(o))
                } else
                    n[t = s.slice(0, a).trim()] = s.slice(a + 1).trim()
            }
            return n
        }(e.attribs.style);
        if ("string" == typeof t)
            return n[t];
        if (Array.isArray(t)) {
            var r = {};
            return t.forEach((function(e) {
                    null != n[e] && (r[e] = n[e])
                }
            )),
                r
        }
        return n
    }
}
var Xa = Object.freeze({
    __proto__: null,
    css: function(e, t) {
        return null != e && null != t || "object" == typeof e && !Array.isArray(e) ? Bi(this, (function(n, r) {
                I(n) && Wa(n, e, t, r)
            }
        )) : 0 !== this.length ? Qa(this[0], e) : void 0
    }
})
    , $a = /%20/g
    , za = /\r?\n/g;
var Ja = Object.freeze({
    __proto__: null,
    serialize: function() {
        var e = this.serializeArray().map((function(e) {
                return "".concat(encodeURIComponent(e.name), "=").concat(encodeURIComponent(e.value))
            }
        ));
        return e.join("&").replace($a, "+")
    },
    serializeArray: function() {
        var e = this;
        return this.map((function(t, n) {
                var r = e._make(n);
                return I(n) && "form" === n.name ? r.find("input,select,textarea,keygen").toArray() : r.filter("input,select,textarea,keygen").toArray()
            }
        )).filter('[name!=""]:enabled:not(:submit, :button, :image, :reset, :file):matches([checked], :not(:checkbox, :radio))').map((function(t, n) {
                var r, i = e._make(n), s = i.attr("name"), a = null !== (r = i.val()) && void 0 !== r ? r : "";
                return Array.isArray(a) ? a.map((function(e) {
                        return {
                            name: s,
                            value: e.replace(za, "\r\n")
                        }
                    }
                )) : {
                    name: s,
                    value: a.replace(za, "\r\n")
                }
            }
        )).toArray()
    }
})
    , Za = function(e, t, n) {
    if (this.length = 0,
        this.options = n,
        this._root = t,
        e) {
        for (var r = 0; r < e.length; r++)
            this[r] = e[r];
        this.length = e.length
    }
};
Za.prototype.cheerio = "[cheerio object]",
    Za.prototype.splice = Array.prototype.splice,
    Za.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator],
    Object.assign(Za.prototype, ts, wa, Va, Xa, Ja);
var eo, to = (eo = function(e, t) {
        return eo = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var n in t)
                    Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
            }
            ,
            eo(e, t)
    }
        ,
        function(e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
            function n() {
                this.constructor = e
            }
            eo(e, t),
                e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype,
                    new n)
        }
), no = function() {
    return no = Object.assign || function(e) {
        for (var t, n = 1, r = arguments.length; n < r; n++)
            for (var i in t = arguments[n])
                Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e
    }
        ,
        no.apply(this, arguments)
};
const ro = new Set([65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111]);
var io;
!function(e) {
    e[e.EOF = -1] = "EOF",
        e[e.NULL = 0] = "NULL",
        e[e.TABULATION = 9] = "TABULATION",
        e[e.CARRIAGE_RETURN = 13] = "CARRIAGE_RETURN",
        e[e.LINE_FEED = 10] = "LINE_FEED",
        e[e.FORM_FEED = 12] = "FORM_FEED",
        e[e.SPACE = 32] = "SPACE",
        e[e.EXCLAMATION_MARK = 33] = "EXCLAMATION_MARK",
        e[e.QUOTATION_MARK = 34] = "QUOTATION_MARK",
        e[e.NUMBER_SIGN = 35] = "NUMBER_SIGN",
        e[e.AMPERSAND = 38] = "AMPERSAND",
        e[e.APOSTROPHE = 39] = "APOSTROPHE",
        e[e.HYPHEN_MINUS = 45] = "HYPHEN_MINUS",
        e[e.SOLIDUS = 47] = "SOLIDUS",
        e[e.DIGIT_0 = 48] = "DIGIT_0",
        e[e.DIGIT_9 = 57] = "DIGIT_9",
        e[e.SEMICOLON = 59] = "SEMICOLON",
        e[e.LESS_THAN_SIGN = 60] = "LESS_THAN_SIGN",
        e[e.EQUALS_SIGN = 61] = "EQUALS_SIGN",
        e[e.GREATER_THAN_SIGN = 62] = "GREATER_THAN_SIGN",
        e[e.QUESTION_MARK = 63] = "QUESTION_MARK",
        e[e.LATIN_CAPITAL_A = 65] = "LATIN_CAPITAL_A",
        e[e.LATIN_CAPITAL_F = 70] = "LATIN_CAPITAL_F",
        e[e.LATIN_CAPITAL_X = 88] = "LATIN_CAPITAL_X",
        e[e.LATIN_CAPITAL_Z = 90] = "LATIN_CAPITAL_Z",
        e[e.RIGHT_SQUARE_BRACKET = 93] = "RIGHT_SQUARE_BRACKET",
        e[e.GRAVE_ACCENT = 96] = "GRAVE_ACCENT",
        e[e.LATIN_SMALL_A = 97] = "LATIN_SMALL_A",
        e[e.LATIN_SMALL_F = 102] = "LATIN_SMALL_F",
        e[e.LATIN_SMALL_X = 120] = "LATIN_SMALL_X",
        e[e.LATIN_SMALL_Z = 122] = "LATIN_SMALL_Z",
        e[e.REPLACEMENT_CHARACTER = 65533] = "REPLACEMENT_CHARACTER"
}(io = io || (io = {}));
const so = "--"
    , ao = "[CDATA["
    , oo = "doctype"
    , co = "script"
    , lo = "public"
    , ho = "system";
function uo(e) {
    return e >= 55296 && e <= 57343
}
function po(e) {
    return 32 !== e && 10 !== e && 13 !== e && 9 !== e && 12 !== e && e >= 1 && e <= 31 || e >= 127 && e <= 159
}
function fo(e) {
    return e >= 64976 && e <= 65007 || ro.has(e)
}
var Eo;
!function(e) {
    e.controlCharacterInInputStream = "control-character-in-input-stream",
        e.noncharacterInInputStream = "noncharacter-in-input-stream",
        e.surrogateInInputStream = "surrogate-in-input-stream",
        e.nonVoidHtmlElementStartTagWithTrailingSolidus = "non-void-html-element-start-tag-with-trailing-solidus",
        e.endTagWithAttributes = "end-tag-with-attributes",
        e.endTagWithTrailingSolidus = "end-tag-with-trailing-solidus",
        e.unexpectedSolidusInTag = "unexpected-solidus-in-tag",
        e.unexpectedNullCharacter = "unexpected-null-character",
        e.unexpectedQuestionMarkInsteadOfTagName = "unexpected-question-mark-instead-of-tag-name",
        e.invalidFirstCharacterOfTagName = "invalid-first-character-of-tag-name",
        e.unexpectedEqualsSignBeforeAttributeName = "unexpected-equals-sign-before-attribute-name",
        e.missingEndTagName = "missing-end-tag-name",
        e.unexpectedCharacterInAttributeName = "unexpected-character-in-attribute-name",
        e.unknownNamedCharacterReference = "unknown-named-character-reference",
        e.missingSemicolonAfterCharacterReference = "missing-semicolon-after-character-reference",
        e.unexpectedCharacterAfterDoctypeSystemIdentifier = "unexpected-character-after-doctype-system-identifier",
        e.unexpectedCharacterInUnquotedAttributeValue = "unexpected-character-in-unquoted-attribute-value",
        e.eofBeforeTagName = "eof-before-tag-name",
        e.eofInTag = "eof-in-tag",
        e.missingAttributeValue = "missing-attribute-value",
        e.missingWhitespaceBetweenAttributes = "missing-whitespace-between-attributes",
        e.missingWhitespaceAfterDoctypePublicKeyword = "missing-whitespace-after-doctype-public-keyword",
        e.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers = "missing-whitespace-between-doctype-public-and-system-identifiers",
        e.missingWhitespaceAfterDoctypeSystemKeyword = "missing-whitespace-after-doctype-system-keyword",
        e.missingQuoteBeforeDoctypePublicIdentifier = "missing-quote-before-doctype-public-identifier",
        e.missingQuoteBeforeDoctypeSystemIdentifier = "missing-quote-before-doctype-system-identifier",
        e.missingDoctypePublicIdentifier = "missing-doctype-public-identifier",
        e.missingDoctypeSystemIdentifier = "missing-doctype-system-identifier",
        e.abruptDoctypePublicIdentifier = "abrupt-doctype-public-identifier",
        e.abruptDoctypeSystemIdentifier = "abrupt-doctype-system-identifier",
        e.cdataInHtmlContent = "cdata-in-html-content",
        e.incorrectlyOpenedComment = "incorrectly-opened-comment",
        e.eofInScriptHtmlCommentLikeText = "eof-in-script-html-comment-like-text",
        e.eofInDoctype = "eof-in-doctype",
        e.nestedComment = "nested-comment",
        e.abruptClosingOfEmptyComment = "abrupt-closing-of-empty-comment",
        e.eofInComment = "eof-in-comment",
        e.incorrectlyClosedComment = "incorrectly-closed-comment",
        e.eofInCdata = "eof-in-cdata",
        e.absenceOfDigitsInNumericCharacterReference = "absence-of-digits-in-numeric-character-reference",
        e.nullCharacterReference = "null-character-reference",
        e.surrogateCharacterReference = "surrogate-character-reference",
        e.characterReferenceOutsideUnicodeRange = "character-reference-outside-unicode-range",
        e.controlCharacterReference = "control-character-reference",
        e.noncharacterCharacterReference = "noncharacter-character-reference",
        e.missingWhitespaceBeforeDoctypeName = "missing-whitespace-before-doctype-name",
        e.missingDoctypeName = "missing-doctype-name",
        e.invalidCharacterSequenceAfterDoctypeName = "invalid-character-sequence-after-doctype-name",
        e.duplicateAttribute = "duplicate-attribute",
        e.nonConformingDoctype = "non-conforming-doctype",
        e.missingDoctype = "missing-doctype",
        e.misplacedDoctype = "misplaced-doctype",
        e.endTagWithoutMatchingOpenElement = "end-tag-without-matching-open-element",
        e.closingOfElementWithOpenChildElements = "closing-of-element-with-open-child-elements",
        e.disallowedContentInNoscriptInHead = "disallowed-content-in-noscript-in-head",
        e.openElementsLeftAfterEof = "open-elements-left-after-eof",
        e.abandonedHeadElementChild = "abandoned-head-element-child",
        e.misplacedStartTagForHeadElement = "misplaced-start-tag-for-head-element",
        e.nestedNoscriptInHead = "nested-noscript-in-head",
        e.eofInElementThatCanContainOnlyText = "eof-in-element-that-can-contain-only-text"
}(Eo = Eo || (Eo = {}));
class mo {
    constructor(e) {
        this.handler = e,
            this.html = "",
            this.pos = -1,
            this.lastGapPos = -2,
            this.gapStack = [],
            this.skipNextNewLine = !1,
            this.lastChunkWritten = !1,
            this.endOfChunkHit = !1,
            this.bufferWaterline = 65536,
            this.isEol = !1,
            this.lineStartPos = 0,
            this.droppedBufferSize = 0,
            this.line = 1,
            this.lastErrOffset = -1
    }
    get col() {
        return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos)
    }
    get offset() {
        return this.droppedBufferSize + this.pos
    }
    getError(e) {
        const {line: t, col: n, offset: r} = this;
        return {
            code: e,
            startLine: t,
            endLine: t,
            startCol: n,
            endCol: n,
            startOffset: r,
            endOffset: r
        }
    }
    _err(e) {
        this.handler.onParseError && this.lastErrOffset !== this.offset && (this.lastErrOffset = this.offset,
            this.handler.onParseError(this.getError(e)))
    }
    _addGap() {
        this.gapStack.push(this.lastGapPos),
            this.lastGapPos = this.pos
    }
    _processSurrogate(e) {
        if (this.pos !== this.html.length - 1) {
            const t = this.html.charCodeAt(this.pos + 1);
            if (function(e) {
                return e >= 56320 && e <= 57343
            }(t))
                return this.pos++,
                    this._addGap(),
                1024 * (e - 55296) + 9216 + t
        } else if (!this.lastChunkWritten)
            return this.endOfChunkHit = !0,
                io.EOF;
        return this._err(Eo.surrogateInInputStream),
            e
    }
    willDropParsedChunk() {
        return this.pos > this.bufferWaterline
    }
    dropParsedChunk() {
        this.willDropParsedChunk() && (this.html = this.html.substring(this.pos),
            this.lineStartPos -= this.pos,
            this.droppedBufferSize += this.pos,
            this.pos = 0,
            this.lastGapPos = -2,
            this.gapStack.length = 0)
    }
    write(e, t) {
        this.html.length > 0 ? this.html += e : this.html = e,
            this.endOfChunkHit = !1,
            this.lastChunkWritten = t
    }
    insertHtmlAtCurrentPos(e) {
        this.html = this.html.substring(0, this.pos + 1) + e + this.html.substring(this.pos + 1),
            this.endOfChunkHit = !1
    }
    startsWith(e, t) {
        if (this.pos + e.length > this.html.length)
            return this.endOfChunkHit = !this.lastChunkWritten,
                !1;
        if (t)
            return this.html.startsWith(e, this.pos);
        for (let t = 0; t < e.length; t++) {
            if ((32 | this.html.charCodeAt(this.pos + t)) !== e.charCodeAt(t))
                return !1
        }
        return !0
    }
    peek(e) {
        const t = this.pos + e;
        return t >= this.html.length ? (this.endOfChunkHit = !this.lastChunkWritten,
            io.EOF) : this.html.charCodeAt(t)
    }
    advance() {
        if (this.pos++,
        this.isEol && (this.isEol = !1,
            this.line++,
            this.lineStartPos = this.pos),
        this.pos >= this.html.length)
            return this.endOfChunkHit = !this.lastChunkWritten,
                io.EOF;
        let e = this.html.charCodeAt(this.pos);
        if (e === io.CARRIAGE_RETURN)
            return this.isEol = !0,
                this.skipNextNewLine = !0,
                io.LINE_FEED;
        if (e === io.LINE_FEED && (this.isEol = !0,
            this.skipNextNewLine))
            return this.line--,
                this.skipNextNewLine = !1,
                this._addGap(),
                this.advance();
        this.skipNextNewLine = !1,
        uo(e) && (e = this._processSurrogate(e));
        return null === this.handler.onParseError || e > 31 && e < 127 || e === io.LINE_FEED || e === io.CARRIAGE_RETURN || e > 159 && e < 64976 || this._checkForProblematicCharacters(e),
            e
    }
    _checkForProblematicCharacters(e) {
        po(e) ? this._err(Eo.controlCharacterInInputStream) : fo(e) && this._err(Eo.noncharacterInInputStream)
    }
    retreat(e) {
        for (this.pos -= e; this.pos < this.lastGapPos; )
            this.lastGapPos = this.gapStack.pop(),
                this.pos--;
        this.isEol = !1
    }
}
var To;
function _o(e, t) {
    for (let n = e.attrs.length - 1; n >= 0; n--)
        if (e.attrs[n].name === t)
            return e.attrs[n].value;
    return null
}
!function(e) {
    e[e.CHARACTER = 0] = "CHARACTER",
        e[e.NULL_CHARACTER = 1] = "NULL_CHARACTER",
        e[e.WHITESPACE_CHARACTER = 2] = "WHITESPACE_CHARACTER",
        e[e.START_TAG = 3] = "START_TAG",
        e[e.END_TAG = 4] = "END_TAG",
        e[e.COMMENT = 5] = "COMMENT",
        e[e.DOCTYPE = 6] = "DOCTYPE",
        e[e.EOF = 7] = "EOF",
        e[e.HIBERNATION = 8] = "HIBERNATION"
}(To = To || (To = {}));
var Ao = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((function(e) {
                    return e.charCodeAt(0)
                }
            )))
    }
));
qe(Ao);
var go = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.default = new Uint16Array("Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((function(e) {
                    return e.charCodeAt(0)
                }
            )))
    }
));
qe(go);
var No = Ke((function(e, t) {
        var n;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.replaceCodePoint = t.fromCodePoint = void 0;
        var r = new Map([[0, 65533], [128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
        function i(e) {
            var t;
            return e >= 55296 && e <= 57343 || e > 1114111 ? 65533 : null !== (t = r.get(e)) && void 0 !== t ? t : e
        }
        t.fromCodePoint = null !== (n = String.fromCodePoint) && void 0 !== n ? n : function(e) {
            var t = "";
            return e > 65535 && (e -= 65536,
                t += String.fromCharCode(e >>> 10 & 1023 | 55296),
                e = 56320 | 1023 & e),
                t += String.fromCharCode(e)
        }
            ,
            t.replaceCodePoint = i,
            t.default = function(e) {
                return (0,
                    t.fromCodePoint)(i(e))
            }
    }
));
qe(No),
    No.replaceCodePoint,
    No.fromCodePoint;
var Co = Ao
    , Io = go
    , So = No
    , bo = Ke((function(e, t) {
        var n = Ge && Ge.__importDefault || function(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
        ;
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.decodeXML = t.decodeHTMLStrict = t.decodeHTML = t.determineBranch = t.BinTrieFlags = t.fromCodePoint = t.replaceCodePoint = t.decodeCodePoint = t.xmlDecodeTree = t.htmlDecodeTree = void 0;
        var r = n(Co);
        t.htmlDecodeTree = r.default;
        var i = n(Io);
        t.xmlDecodeTree = i.default;
        var s = n(So);
        t.decodeCodePoint = s.default;
        var a, o, c = So;
        function l(e) {
            return function(t, n) {
                for (var r = "", i = 0, c = 0; (c = t.indexOf("&", c)) >= 0; )
                    if (r += t.slice(i, c),
                        i = c,
                        c += 1,
                    t.charCodeAt(c) !== a.NUM) {
                        for (var l = 0, u = 1, p = 0, f = e[p]; c < t.length && !((p = h(e, f, p + 1, t.charCodeAt(c))) < 0); c++,
                            u++) {
                            var d = (f = e[p]) & o.VALUE_LENGTH;
                            if (d) {
                                var E;
                                if (n && t.charCodeAt(c) !== a.SEMI || (l = p,
                                    u = 0),
                                0 === (E = (d >> 14) - 1))
                                    break;
                                p += E
                            }
                        }
                        if (0 !== l)
                            r += 1 === (E = (e[l] & o.VALUE_LENGTH) >> 14) ? String.fromCharCode(e[l] & ~o.VALUE_LENGTH) : 2 === E ? String.fromCharCode(e[l + 1]) : String.fromCharCode(e[l + 1], e[l + 2]),
                                i = c - u + 1
                    } else {
                        var m = c + 1
                            , T = 10
                            , _ = t.charCodeAt(m);
                        (_ | a.To_LOWER_BIT) === a.LOWER_X && (T = 16,
                            c += 1,
                            m += 1);
                        do {
                            _ = t.charCodeAt(++c)
                        } while (_ >= a.ZERO && _ <= a.NINE || 16 === T && (_ | a.To_LOWER_BIT) >= a.LOWER_A && (_ | a.To_LOWER_BIT) <= a.LOWER_F);
                        if (m !== c) {
                            var A = t.substring(m, c)
                                , g = parseInt(A, T);
                            if (t.charCodeAt(c) === a.SEMI)
                                c += 1;
                            else if (n)
                                continue;
                            r += (0,
                                s.default)(g),
                                i = c
                        }
                    }
                return r + t.slice(i)
            }
        }
        function h(e, t, n, r) {
            var i = (t & o.BRANCH_LENGTH) >> 7
                , s = t & o.JUMP_TABLE;
            if (0 === i)
                return 0 !== s && r === s ? n : -1;
            if (s) {
                var a = r - s;
                return a < 0 || a >= i ? -1 : e[n + a] - 1
            }
            for (var c = n, l = c + i - 1; c <= l; ) {
                var h = c + l >>> 1
                    , u = e[h];
                if (u < r)
                    c = h + 1;
                else {
                    if (!(u > r))
                        return e[h + i];
                    l = h - 1
                }
            }
            return -1
        }
        Object.defineProperty(t, "replaceCodePoint", {
            enumerable: !0,
            get: function() {
                return c.replaceCodePoint
            }
        }),
            Object.defineProperty(t, "fromCodePoint", {
                enumerable: !0,
                get: function() {
                    return c.fromCodePoint
                }
            }),
            function(e) {
                e[e.NUM = 35] = "NUM",
                    e[e.SEMI = 59] = "SEMI",
                    e[e.ZERO = 48] = "ZERO",
                    e[e.NINE = 57] = "NINE",
                    e[e.LOWER_A = 97] = "LOWER_A",
                    e[e.LOWER_F = 102] = "LOWER_F",
                    e[e.LOWER_X = 120] = "LOWER_X",
                    e[e.To_LOWER_BIT = 32] = "To_LOWER_BIT"
            }(a || (a = {})),
            function(e) {
                e[e.VALUE_LENGTH = 49152] = "VALUE_LENGTH",
                    e[e.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH",
                    e[e.JUMP_TABLE = 127] = "JUMP_TABLE"
            }(o = t.BinTrieFlags || (t.BinTrieFlags = {})),
            t.determineBranch = h;
        var u = l(r.default)
            , p = l(i.default);
        t.decodeHTML = function(e) {
            return u(e, !1)
        }
            ,
            t.decodeHTMLStrict = function(e) {
                return u(e, !0)
            }
            ,
            t.decodeXML = function(e) {
                return p(e, !0)
            }
    }
));
qe(bo),
    bo.decodeXML,
    bo.decodeHTMLStrict,
    bo.decodeHTML;
var Oo = bo.determineBranch
    , yo = bo.BinTrieFlags
    , Lo = bo.fromCodePoint
    , ko = bo.replaceCodePoint;
bo.decodeCodePoint;
var vo, Do, Ro, Mo, Po, xo = bo.xmlDecodeTree, wo = bo.htmlDecodeTree;
!function(e) {
    e.HTML = "http://www.w3.org/1999/xhtml",
        e.MATHML = "http://www.w3.org/1998/Math/MathML",
        e.SVG = "http://www.w3.org/2000/svg",
        e.XLINK = "http://www.w3.org/1999/xlink",
        e.XML = "http://www.w3.org/XML/1998/namespace",
        e.XMLNS = "http://www.w3.org/2000/xmlns/"
}(vo = vo || (vo = {})),
    function(e) {
        e.TYPE = "type",
            e.ACTION = "action",
            e.ENCODING = "encoding",
            e.PROMPT = "prompt",
            e.NAME = "name",
            e.COLOR = "color",
            e.FACE = "face",
            e.SIZE = "size"
    }(Do = Do || (Do = {})),
    function(e) {
        e.NO_QUIRKS = "no-quirks",
            e.QUIRKS = "quirks",
            e.LIMITED_QUIRKS = "limited-quirks"
    }(Ro = Ro || (Ro = {})),
    function(e) {
        e.A = "a",
            e.ADDRESS = "address",
            e.ANNOTATION_XML = "annotation-xml",
            e.APPLET = "applet",
            e.AREA = "area",
            e.ARTICLE = "article",
            e.ASIDE = "aside",
            e.B = "b",
            e.BASE = "base",
            e.BASEFONT = "basefont",
            e.BGSOUND = "bgsound",
            e.BIG = "big",
            e.BLOCKQUOTE = "blockquote",
            e.BODY = "body",
            e.BR = "br",
            e.BUTTON = "button",
            e.CAPTION = "caption",
            e.CENTER = "center",
            e.CODE = "code",
            e.COL = "col",
            e.COLGROUP = "colgroup",
            e.DD = "dd",
            e.DESC = "desc",
            e.DETAILS = "details",
            e.DIALOG = "dialog",
            e.DIR = "dir",
            e.DIV = "div",
            e.DL = "dl",
            e.DT = "dt",
            e.EM = "em",
            e.EMBED = "embed",
            e.FIELDSET = "fieldset",
            e.FIGCAPTION = "figcaption",
            e.FIGURE = "figure",
            e.FONT = "font",
            e.FOOTER = "footer",
            e.FOREIGN_OBJECT = "foreignObject",
            e.FORM = "form",
            e.FRAME = "frame",
            e.FRAMESET = "frameset",
            e.H1 = "h1",
            e.H2 = "h2",
            e.H3 = "h3",
            e.H4 = "h4",
            e.H5 = "h5",
            e.H6 = "h6",
            e.HEAD = "head",
            e.HEADER = "header",
            e.HGROUP = "hgroup",
            e.HR = "hr",
            e.HTML = "html",
            e.I = "i",
            e.IMG = "img",
            e.IMAGE = "image",
            e.INPUT = "input",
            e.IFRAME = "iframe",
            e.KEYGEN = "keygen",
            e.LABEL = "label",
            e.LI = "li",
            e.LINK = "link",
            e.LISTING = "listing",
            e.MAIN = "main",
            e.MALIGNMARK = "malignmark",
            e.MARQUEE = "marquee",
            e.MATH = "math",
            e.MENU = "menu",
            e.META = "meta",
            e.MGLYPH = "mglyph",
            e.MI = "mi",
            e.MO = "mo",
            e.MN = "mn",
            e.MS = "ms",
            e.MTEXT = "mtext",
            e.NAV = "nav",
            e.NOBR = "nobr",
            e.NOFRAMES = "noframes",
            e.NOEMBED = "noembed",
            e.NOSCRIPT = "noscript",
            e.OBJECT = "object",
            e.OL = "ol",
            e.OPTGROUP = "optgroup",
            e.OPTION = "option",
            e.P = "p",
            e.PARAM = "param",
            e.PLAINTEXT = "plaintext",
            e.PRE = "pre",
            e.RB = "rb",
            e.RP = "rp",
            e.RT = "rt",
            e.RTC = "rtc",
            e.RUBY = "ruby",
            e.S = "s",
            e.SCRIPT = "script",
            e.SECTION = "section",
            e.SELECT = "select",
            e.SOURCE = "source",
            e.SMALL = "small",
            e.SPAN = "span",
            e.STRIKE = "strike",
            e.STRONG = "strong",
            e.STYLE = "style",
        e.SUB = "sub",
        e.SUMMARY = "summary",
        e.SUP = "sup",
        e.TABLE = "table",
        e.TBODY = "tbody",
        e.TEMPLATE = "template",
        e.TEXTAREA = "textarea",
        e.TFOOT = "tfoot",
        e.TD = "td",
        e.TH = "th",
        e.THEAD = "thead",
        e.TITLE = "title",
        e.TR = "tr",
        e.TRACK = "track",
        e.TT = "tt",
        e.U = "u",
        e.UL = "ul",
        e.SVG = "svg",
        e.VAR = "var",
        e.WBR = "wbr",
        e.XMP = "xmp"
    }(Mo = Mo || (Mo = {})),
    function(e) {
        e[e.UNKNOWN = 0] = "UNKNOWN",
            e[e.A = 1] = "A",
            e[e.ADDRESS = 2] = "ADDRESS",
            e[e.ANNOTATION_XML = 3] = "ANNOTATION_XML",
            e[e.APPLET = 4] = "APPLET",
            e[e.AREA = 5] = "AREA",
            e[e.ARTICLE = 6] = "ARTICLE",
            e[e.ASIDE = 7] = "ASIDE",
            e[e.B = 8] = "B",
            e[e.BASE = 9] = "BASE",
            e[e.BASEFONT = 10] = "BASEFONT",
            e[e.BGSOUND = 11] = "BGSOUND",
            e[e.BIG = 12] = "BIG",
            e[e.BLOCKQUOTE = 13] = "BLOCKQUOTE",
            e[e.BODY = 14] = "BODY",
            e[e.BR = 15] = "BR",
            e[e.BUTTON = 16] = "BUTTON",
            e[e.CAPTION = 17] = "CAPTION",
            e[e.CENTER = 18] = "CENTER",
            e[e.CODE = 19] = "CODE",
            e[e.COL = 20] = "COL",
            e[e.COLGROUP = 21] = "COLGROUP",
            e[e.DD = 22] = "DD",
            e[e.DESC = 23] = "DESC",
            e[e.DETAILS = 24] = "DETAILS",
            e[e.DIALOG = 25] = "DIALOG",
            e[e.DIR = 26] = "DIR",
            e[e.DIV = 27] = "DIV",
            e[e.DL = 28] = "DL",
            e[e.DT = 29] = "DT",
            e[e.EM = 30] = "EM",
            e[e.EMBED = 31] = "EMBED",
            e[e.FIELDSET = 32] = "FIELDSET",
            e[e.FIGCAPTION = 33] = "FIGCAPTION",
            e[e.FIGURE = 34] = "FIGURE",
            e[e.FONT = 35] = "FONT",
            e[e.FOOTER = 36] = "FOOTER",
            e[e.FOREIGN_OBJECT = 37] = "FOREIGN_OBJECT",
            e[e.FORM = 38] = "FORM",
            e[e.FRAME = 39] = "FRAME",
            e[e.FRAMESET = 40] = "FRAMESET",
            e[e.H1 = 41] = "H1",
            e[e.H2 = 42] = "H2",
            e[e.H3 = 43] = "H3",
            e[e.H4 = 44] = "H4",
            e[e.H5 = 45] = "H5",
            e[e.H6 = 46] = "H6",
            e[e.HEAD = 47] = "HEAD",
            e[e.HEADER = 48] = "HEADER",
            e[e.HGROUP = 49] = "HGROUP",
            e[e.HR = 50] = "HR",
            e[e.HTML = 51] = "HTML",
            e[e.I = 52] = "I",
            e[e.IMG = 53] = "IMG",
            e[e.IMAGE = 54] = "IMAGE",
            e[e.INPUT = 55] = "INPUT",
            e[e.IFRAME = 56] = "IFRAME",
            e[e.KEYGEN = 57] = "KEYGEN",
            e[e.LABEL = 58] = "LABEL",
            e[e.LI = 59] = "LI",
            e[e.LINK = 60] = "LINK",
            e[e.LISTING = 61] = "LISTING",
            e[e.MAIN = 62] = "MAIN",
            e[e.MALIGNMARK = 63] = "MALIGNMARK",
            e[e.MARQUEE = 64] = "MARQUEE",
            e[e.MATH = 65] = "MATH",
            e[e.MENU = 66] = "MENU",
            e[e.META = 67] = "META",
            e[e.MGLYPH = 68] = "MGLYPH",
            e[e.MI = 69] = "MI",
            e[e.MO = 70] = "MO",
            e[e.MN = 71] = "MN",
            e[e.MS = 72] = "MS",
            e[e.MTEXT = 73] = "MTEXT",
            e[e.NAV = 74] = "NAV",
            e[e.NOBR = 75] = "NOBR",
            e[e.NOFRAMES = 76] = "NOFRAMES",
            e[e.NOEMBED = 77] = "NOEMBED",
            e[e.NOSCRIPT = 78] = "NOSCRIPT",
            e[e.OBJECT = 79] = "OBJECT",
            e[e.OL = 80] = "OL",
            e[e.OPTGROUP = 81] = "OPTGROUP",
            e[e.OPTION = 82] = "OPTION",
            e[e.P = 83] = "P",
            e[e.PARAM = 84] = "PARAM",
            e[e.PLAINTEXT = 85] = "PLAINTEXT",
            e[e.PRE = 86] = "PRE",
            e[e.RB = 87] = "RB",
            e[e.RP = 88] = "RP",
            e[e.RT = 89] = "RT",
            e[e.RTC = 90] = "RTC",
            e[e.RUBY = 91] = "RUBY",
            e[e.S = 92] = "S",
            e[e.SCRIPT = 93] = "SCRIPT",
            e[e.SECTION = 94] = "SECTION",
            e[e.SELECT = 95] = "SELECT",
            e[e.SOURCE = 96] = "SOURCE",
            e[e.SMALL = 97] = "SMALL",
            e[e.SPAN = 98] = "SPAN",
            e[e.STRIKE = 99] = "STRIKE",
            e[e.STRONG = 100] = "STRONG",
        e[e.STYLE = 101] = "STYLE",
        e[e.SUB = 102] = "SUB",
        e[e.SUMMARY = 103] = "SUMMARY",
        e[e.SUP = 104] = "SUP",
        e[e.TABLE = 105] = "TABLE",
        e[e.TBODY = 106] = "TBODY",
        e[e.TEMPLATE = 107] = "TEMPLATE",
        e[e.TEXTAREA = 108] = "TEXTAREA",
        e[e.TFOOT = 109] = "TFOOT",
        e[e.TD = 110] = "TD",
        e[e.TH = 111] = "TH",
        e[e.THEAD = 112] = "THEAD",
        e[e.TITLE = 113] = "TITLE",
        e[e.TR = 114] = "TR",
        e[e.TRACK = 115] = "TRACK",
        e[e.TT = 116] = "TT",
        e[e.U = 117] = "U",
        e[e.UL = 118] = "UL",
        e[e.SVG = 119] = "SVG",
        e[e.VAR = 120] = "VAR",
        e[e.WBR = 121] = "WBR",
        e[e.XMP = 122] = "XMP"
    }(Po = Po || (Po = {}));
const Bo = new Map([[Mo.A, Po.A], [Mo.ADDRESS, Po.ADDRESS], [Mo.ANNOTATION_XML, Po.ANNOTATION_XML], [Mo.APPLET, Po.APPLET], [Mo.AREA, Po.AREA], [Mo.ARTICLE, Po.ARTICLE], [Mo.ASIDE, Po.ASIDE], [Mo.B, Po.B], [Mo.BASE, Po.BASE], [Mo.BASEFONT, Po.BASEFONT], [Mo.BGSOUND, Po.BGSOUND], [Mo.BIG, Po.BIG], [Mo.BLOCKQUOTE, Po.BLOCKQUOTE], [Mo.BODY, Po.BODY], [Mo.BR, Po.BR], [Mo.BUTTON, Po.BUTTON], [Mo.CAPTION, Po.CAPTION], [Mo.CENTER, Po.CENTER], [Mo.CODE, Po.CODE], [Mo.COL, Po.COL], [Mo.COLGROUP, Po.COLGROUP], [Mo.DD, Po.DD], [Mo.DESC, Po.DESC], [Mo.DETAILS, Po.DETAILS], [Mo.DIALOG, Po.DIALOG], [Mo.DIR, Po.DIR], [Mo.DIV, Po.DIV], [Mo.DL, Po.DL], [Mo.DT, Po.DT], [Mo.EM, Po.EM], [Mo.EMBED, Po.EMBED], [Mo.FIELDSET, Po.FIELDSET], [Mo.FIGCAPTION, Po.FIGCAPTION], [Mo.FIGURE, Po.FIGURE], [Mo.FONT, Po.FONT], [Mo.FOOTER, Po.FOOTER], [Mo.FOREIGN_OBJECT, Po.FOREIGN_OBJECT], [Mo.FORM, Po.FORM], [Mo.FRAME, Po.FRAME], [Mo.FRAMESET, Po.FRAMESET], [Mo.H1, Po.H1], [Mo.H2, Po.H2], [Mo.H3, Po.H3], [Mo.H4, Po.H4], [Mo.H5, Po.H5], [Mo.H6, Po.H6], [Mo.HEAD, Po.HEAD], [Mo.HEADER, Po.HEADER], [Mo.HGROUP, Po.HGROUP], [Mo.HR, Po.HR], [Mo.HTML, Po.HTML], [Mo.I, Po.I], [Mo.IMG, Po.IMG], [Mo.IMAGE, Po.IMAGE], [Mo.INPUT, Po.INPUT], [Mo.IFRAME, Po.IFRAME], [Mo.KEYGEN, Po.KEYGEN], [Mo.LABEL, Po.LABEL], [Mo.LI, Po.LI], [Mo.LINK, Po.LINK], [Mo.LISTING, Po.LISTING], [Mo.MAIN, Po.MAIN], [Mo.MALIGNMARK, Po.MALIGNMARK], [Mo.MARQUEE, Po.MARQUEE], [Mo.MATH, Po.MATH], [Mo.MENU, Po.MENU], [Mo.META, Po.META], [Mo.MGLYPH, Po.MGLYPH], [Mo.MI, Po.MI], [Mo.MO, Po.MO], [Mo.MN, Po.MN], [Mo.MS, Po.MS], [Mo.MTEXT, Po.MTEXT], [Mo.NAV, Po.NAV], [Mo.NOBR, Po.NOBR], [Mo.NOFRAMES, Po.NOFRAMES], [Mo.NOEMBED, Po.NOEMBED], [Mo.NOSCRIPT, Po.NOSCRIPT], [Mo.OBJECT, Po.OBJECT], [Mo.OL, Po.OL], [Mo.OPTGROUP, Po.OPTGROUP], [Mo.OPTION, Po.OPTION], [Mo.P, Po.P], [Mo.PARAM, Po.PARAM], [Mo.PLAINTEXT, Po.PLAINTEXT], [Mo.PRE, Po.PRE], [Mo.RB, Po.RB], [Mo.RP, Po.RP], [Mo.RT, Po.RT], [Mo.RTC, Po.RTC], [Mo.RUBY, Po.RUBY], [Mo.S, Po.S], [Mo.SCRIPT, Po.SCRIPT], [Mo.SECTION, Po.SECTION], [Mo.SELECT, Po.SELECT], [Mo.SOURCE, Po.SOURCE], [Mo.SMALL, Po.SMALL], [Mo.SPAN, Po.SPAN], [Mo.STRIKE, Po.STRIKE], [Mo.STRONG, Po.STRONG], [Mo.STYLE, Po.STYLE], [Mo.SUB, Po.SUB], [Mo.SUMMARY, Po.SUMMARY], [Mo.SUP, Po.SUP], [Mo.TABLE, Po.TABLE], [Mo.TBODY, Po.TBODY], [Mo.TEMPLATE, Po.TEMPLATE], [Mo.TEXTAREA, Po.TEXTAREA], [Mo.TFOOT, Po.TFOOT], [Mo.TD, Po.TD], [Mo.TH, Po.TH], [Mo.THEAD, Po.THEAD], [Mo.TITLE, Po.TITLE], [Mo.TR, Po.TR], [Mo.TRACK, Po.TRACK], [Mo.TT, Po.TT], [Mo.U, Po.U], [Mo.UL, Po.UL], [Mo.SVG, Po.SVG], [Mo.VAR, Po.VAR], [Mo.WBR, Po.WBR], [Mo.XMP, Po.XMP]]);
function Fo(e) {
    var t;
    return null !== (t = Bo.get(e)) && void 0 !== t ? t : Po.UNKNOWN
}
const Uo = Po
    , Ho = {
    [vo.HTML]: new Set([Uo.ADDRESS, Uo.APPLET, Uo.AREA, Uo.ARTICLE, Uo.ASIDE, Uo.BASE, Uo.BASEFONT, Uo.BGSOUND, Uo.BLOCKQUOTE, Uo.BODY, Uo.BR, Uo.BUTTON, Uo.CAPTION, Uo.CENTER, Uo.COL, Uo.COLGROUP, Uo.DD, Uo.DETAILS, Uo.DIR, Uo.DIV, Uo.DL, Uo.DT, Uo.EMBED, Uo.FIELDSET, Uo.FIGCAPTION, Uo.FIGURE, Uo.FOOTER, Uo.FORM, Uo.FRAME, Uo.FRAMESET, Uo.H1, Uo.H2, Uo.H3, Uo.H4, Uo.H5, Uo.H6, Uo.HEAD, Uo.HEADER, Uo.HGROUP, Uo.HR, Uo.HTML, Uo.IFRAME, Uo.IMG, Uo.INPUT, Uo.LI, Uo.LINK, Uo.LISTING, Uo.MAIN, Uo.MARQUEE, Uo.MENU, Uo.META, Uo.NAV, Uo.NOEMBED, Uo.NOFRAMES, Uo.NOSCRIPT, Uo.OBJECT, Uo.OL, Uo.P, Uo.PARAM, Uo.PLAINTEXT, Uo.PRE, Uo.SCRIPT, Uo.SECTION, Uo.SELECT, Uo.SOURCE, Uo.STYLE, Uo.SUMMARY, Uo.TABLE, Uo.TBODY, Uo.TD, Uo.TEMPLATE, Uo.TEXTAREA, Uo.TFOOT, Uo.TH, Uo.THEAD, Uo.TITLE, Uo.TR, Uo.TRACK, Uo.UL, Uo.WBR, Uo.XMP]),
    [vo.MATHML]: new Set([Uo.MI, Uo.MO, Uo.MN, Uo.MS, Uo.MTEXT, Uo.ANNOTATION_XML]),
    [vo.SVG]: new Set([Uo.TITLE, Uo.FOREIGN_OBJECT, Uo.DESC]),
    [vo.XLINK]: new Set,
    [vo.XML]: new Set,
    [vo.XMLNS]: new Set
};
function Go(e) {
    return e === Uo.H1 || e === Uo.H2 || e === Uo.H3 || e === Uo.H4 || e === Uo.H5 || e === Uo.H6
}
const Yo = new Set([Mo.STYLE, Mo.SCRIPT, Mo.XMP, Mo.IFRAME, Mo.NOEMBED, Mo.NOFRAMES, Mo.PLAINTEXT]);
const qo = new Map([[128, 8364], [130, 8218], [131, 402], [132, 8222], [133, 8230], [134, 8224], [135, 8225], [136, 710], [137, 8240], [138, 352], [139, 8249], [140, 338], [142, 381], [145, 8216], [146, 8217], [147, 8220], [148, 8221], [149, 8226], [150, 8211], [151, 8212], [152, 732], [153, 8482], [154, 353], [155, 8250], [156, 339], [158, 382], [159, 376]]);
var Ko;
!function(e) {
    e[e.DATA = 0] = "DATA",
        e[e.RCDATA = 1] = "RCDATA",
        e[e.RAWTEXT = 2] = "RAWTEXT",
        e[e.SCRIPT_DATA = 3] = "SCRIPT_DATA",
        e[e.PLAINTEXT = 4] = "PLAINTEXT",
        e[e.TAG_OPEN = 5] = "TAG_OPEN",
        e[e.END_TAG_OPEN = 6] = "END_TAG_OPEN",
        e[e.TAG_NAME = 7] = "TAG_NAME",
        e[e.RCDATA_LESS_THAN_SIGN = 8] = "RCDATA_LESS_THAN_SIGN",
        e[e.RCDATA_END_TAG_OPEN = 9] = "RCDATA_END_TAG_OPEN",
        e[e.RCDATA_END_TAG_NAME = 10] = "RCDATA_END_TAG_NAME",
        e[e.RAWTEXT_LESS_THAN_SIGN = 11] = "RAWTEXT_LESS_THAN_SIGN",
        e[e.RAWTEXT_END_TAG_OPEN = 12] = "RAWTEXT_END_TAG_OPEN",
        e[e.RAWTEXT_END_TAG_NAME = 13] = "RAWTEXT_END_TAG_NAME",
        e[e.SCRIPT_DATA_LESS_THAN_SIGN = 14] = "SCRIPT_DATA_LESS_THAN_SIGN",
        e[e.SCRIPT_DATA_END_TAG_OPEN = 15] = "SCRIPT_DATA_END_TAG_OPEN",
        e[e.SCRIPT_DATA_END_TAG_NAME = 16] = "SCRIPT_DATA_END_TAG_NAME",
        e[e.SCRIPT_DATA_ESCAPE_START = 17] = "SCRIPT_DATA_ESCAPE_START",
        e[e.SCRIPT_DATA_ESCAPE_START_DASH = 18] = "SCRIPT_DATA_ESCAPE_START_DASH",
        e[e.SCRIPT_DATA_ESCAPED = 19] = "SCRIPT_DATA_ESCAPED",
        e[e.SCRIPT_DATA_ESCAPED_DASH = 20] = "SCRIPT_DATA_ESCAPED_DASH",
        e[e.SCRIPT_DATA_ESCAPED_DASH_DASH = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH",
        e[e.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN",
        e[e.SCRIPT_DATA_ESCAPED_END_TAG_OPEN = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN",
        e[e.SCRIPT_DATA_ESCAPED_END_TAG_NAME = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPE_START = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPED = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN",
        e[e.SCRIPT_DATA_DOUBLE_ESCAPE_END = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END",
        e[e.BEFORE_ATTRIBUTE_NAME = 31] = "BEFORE_ATTRIBUTE_NAME",
        e[e.ATTRIBUTE_NAME = 32] = "ATTRIBUTE_NAME",
        e[e.AFTER_ATTRIBUTE_NAME = 33] = "AFTER_ATTRIBUTE_NAME",
        e[e.BEFORE_ATTRIBUTE_VALUE = 34] = "BEFORE_ATTRIBUTE_VALUE",
        e[e.ATTRIBUTE_VALUE_DOUBLE_QUOTED = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED",
        e[e.ATTRIBUTE_VALUE_SINGLE_QUOTED = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED",
        e[e.ATTRIBUTE_VALUE_UNQUOTED = 37] = "ATTRIBUTE_VALUE_UNQUOTED",
        e[e.AFTER_ATTRIBUTE_VALUE_QUOTED = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED",
        e[e.SELF_CLOSING_START_TAG = 39] = "SELF_CLOSING_START_TAG",
        e[e.BOGUS_COMMENT = 40] = "BOGUS_COMMENT",
        e[e.MARKUP_DECLARATION_OPEN = 41] = "MARKUP_DECLARATION_OPEN",
        e[e.COMMENT_START = 42] = "COMMENT_START",
        e[e.COMMENT_START_DASH = 43] = "COMMENT_START_DASH",
        e[e.COMMENT = 44] = "COMMENT",
        e[e.COMMENT_LESS_THAN_SIGN = 45] = "COMMENT_LESS_THAN_SIGN",
        e[e.COMMENT_LESS_THAN_SIGN_BANG = 46] = "COMMENT_LESS_THAN_SIGN_BANG",
        e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH",
        e[e.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH",
        e[e.COMMENT_END_DASH = 49] = "COMMENT_END_DASH",
        e[e.COMMENT_END = 50] = "COMMENT_END",
        e[e.COMMENT_END_BANG = 51] = "COMMENT_END_BANG",
        e[e.DOCTYPE = 52] = "DOCTYPE",
        e[e.BEFORE_DOCTYPE_NAME = 53] = "BEFORE_DOCTYPE_NAME",
        e[e.DOCTYPE_NAME = 54] = "DOCTYPE_NAME",
        e[e.AFTER_DOCTYPE_NAME = 55] = "AFTER_DOCTYPE_NAME",
        e[e.AFTER_DOCTYPE_PUBLIC_KEYWORD = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD",
        e[e.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER",
        e[e.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED",
        e[e.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED",
        e[e.AFTER_DOCTYPE_PUBLIC_IDENTIFIER = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER",
        e[e.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS",
        e[e.AFTER_DOCTYPE_SYSTEM_KEYWORD = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD",
        e[e.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER",
        e[e.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED",
        e[e.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED",
        e[e.AFTER_DOCTYPE_SYSTEM_IDENTIFIER = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER",
        e[e.BOGUS_DOCTYPE = 67] = "BOGUS_DOCTYPE",
        e[e.CDATA_SECTION = 68] = "CDATA_SECTION",
        e[e.CDATA_SECTION_BRACKET = 69] = "CDATA_SECTION_BRACKET",
        e[e.CDATA_SECTION_END = 70] = "CDATA_SECTION_END",
        e[e.CHARACTER_REFERENCE = 71] = "CHARACTER_REFERENCE",
        e[e.NAMED_CHARACTER_REFERENCE = 72] = "NAMED_CHARACTER_REFERENCE",
        e[e.AMBIGUOUS_AMPERSAND = 73] = "AMBIGUOUS_AMPERSAND",
        e[e.NUMERIC_CHARACTER_REFERENCE = 74] = "NUMERIC_CHARACTER_REFERENCE",
        e[e.HEXADEMICAL_CHARACTER_REFERENCE_START = 75] = "HEXADEMICAL_CHARACTER_REFERENCE_START",
        e[e.HEXADEMICAL_CHARACTER_REFERENCE = 76] = "HEXADEMICAL_CHARACTER_REFERENCE",
        e[e.DECIMAL_CHARACTER_REFERENCE = 77] = "DECIMAL_CHARACTER_REFERENCE",
        e[e.NUMERIC_CHARACTER_REFERENCE_END = 78] = "NUMERIC_CHARACTER_REFERENCE_END"
}(Ko || (Ko = {}));
const jo = {
    DATA: Ko.DATA,
    RCDATA: Ko.RCDATA,
    RAWTEXT: Ko.RAWTEXT,
    SCRIPT_DATA: Ko.SCRIPT_DATA,
    PLAINTEXT: Ko.PLAINTEXT,
    CDATA_SECTION: Ko.CDATA_SECTION
};
function Vo(e) {
    return e >= io.DIGIT_0 && e <= io.DIGIT_9
}
function Wo(e) {
    return e >= io.LATIN_CAPITAL_A && e <= io.LATIN_CAPITAL_Z
}
function Qo(e) {
    return function(e) {
        return e >= io.LATIN_SMALL_A && e <= io.LATIN_SMALL_Z
    }(e) || Wo(e)
}
function Xo(e) {
    return Qo(e) || Vo(e)
}
function $o(e) {
    return e >= io.LATIN_CAPITAL_A && e <= io.LATIN_CAPITAL_F
}
function zo(e) {
    return e >= io.LATIN_SMALL_A && e <= io.LATIN_SMALL_F
}
function Jo(e) {
    return e + 32
}
function Zo(e) {
    return e === io.SPACE || e === io.LINE_FEED || e === io.TABULATION || e === io.FORM_FEED
}
function ec(e) {
    return Zo(e) || e === io.SOLIDUS || e === io.GREATER_THAN_SIGN
}
class tc {
    constructor(e, t) {
        this.options = e,
            this.handler = t,
            this.paused = !1,
            this.inLoop = !1,
            this.inForeignNode = !1,
            this.lastStartTagName = "",
            this.active = !1,
            this.state = Ko.DATA,
            this.returnState = Ko.DATA,
            this.charRefCode = -1,
            this.consumedAfterSnapshot = -1,
            this.currentCharacterToken = null,
            this.currentToken = null,
            this.currentAttr = {
                name: "",
                value: ""
            },
            this.preprocessor = new mo(t),
            this.currentLocation = this.getCurrentLocation(-1)
    }
    _err(e) {
        var t, n;
        null === (n = (t = this.handler).onParseError) || void 0 === n || n.call(t, this.preprocessor.getError(e))
    }
    getCurrentLocation(e) {
        return this.options.sourceCodeLocationInfo ? {
            startLine: this.preprocessor.line,
            startCol: this.preprocessor.col - e,
            startOffset: this.preprocessor.offset - e,
            endLine: -1,
            endCol: -1,
            endOffset: -1
        } : null
    }
    _runParsingLoop() {
        if (!this.inLoop) {
            for (this.inLoop = !0; this.active && !this.paused; ) {
                this.consumedAfterSnapshot = 0;
                const e = this._consume();
                this._ensureHibernation() || this._callState(e)
            }
            this.inLoop = !1
        }
    }
    pause() {
        this.paused = !0
    }
    resume(e) {
        if (!this.paused)
            throw new Error("Parser was already resumed");
        this.paused = !1,
        this.inLoop || (this._runParsingLoop(),
        this.paused || null == e || e())
    }
    write(e, t, n) {
        this.active = !0,
            this.preprocessor.write(e, t),
            this._runParsingLoop(),
        this.paused || null == n || n()
    }
    insertHtmlAtCurrentPos(e) {
        this.active = !0,
            this.preprocessor.insertHtmlAtCurrentPos(e),
            this._runParsingLoop()
    }
    _ensureHibernation() {
        return !!this.preprocessor.endOfChunkHit && (this._unconsume(this.consumedAfterSnapshot),
            this.active = !1,
            !0)
    }
    _consume() {
        return this.consumedAfterSnapshot++,
            this.preprocessor.advance()
    }
    _unconsume(e) {
        this.consumedAfterSnapshot -= e,
            this.preprocessor.retreat(e)
    }
    _reconsumeInState(e, t) {
        this.state = e,
            this._callState(t)
    }
    _advanceBy(e) {
        this.consumedAfterSnapshot += e;
        for (let t = 0; t < e; t++)
            this.preprocessor.advance()
    }
    _consumeSequenceIfMatch(e, t) {
        return !!this.preprocessor.startsWith(e, t) && (this._advanceBy(e.length - 1),
            !0)
    }
    _createStartTagToken() {
        this.currentToken = {
            type: To.START_TAG,
            tagName: "",
            tagID: Po.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(1)
        }
    }
    _createEndTagToken() {
        this.currentToken = {
            type: To.END_TAG,
            tagName: "",
            tagID: Po.UNKNOWN,
            selfClosing: !1,
            ackSelfClosing: !1,
            attrs: [],
            location: this.getCurrentLocation(2)
        }
    }
    _createCommentToken(e) {
        this.currentToken = {
            type: To.COMMENT,
            data: "",
            location: this.getCurrentLocation(e)
        }
    }
    _createDoctypeToken(e) {
        this.currentToken = {
            type: To.DOCTYPE,
            name: e,
            forceQuirks: !1,
            publicId: null,
            systemId: null,
            location: this.currentLocation
        }
    }
    _createCharacterToken(e, t) {
        this.currentCharacterToken = {
            type: e,
            chars: t,
            location: this.currentLocation
        }
    }
    _createAttr(e) {
        this.currentAttr = {
            name: e,
            value: ""
        },
            this.currentLocation = this.getCurrentLocation(0)
    }
    _leaveAttrName() {
        var e, t;
        const n = this.currentToken;
        if (null === _o(n, this.currentAttr.name)) {
            if (n.attrs.push(this.currentAttr),
            n.location && this.currentLocation) {
                (null !== (e = (t = n.location).attrs) && void 0 !== e ? e : t.attrs = Object.create(null))[this.currentAttr.name] = this.currentLocation,
                    this._leaveAttrValue()
            }
        } else
            this._err(Eo.duplicateAttribute)
    }
    _leaveAttrValue() {
        this.currentLocation && (this.currentLocation.endLine = this.preprocessor.line,
            this.currentLocation.endCol = this.preprocessor.col,
            this.currentLocation.endOffset = this.preprocessor.offset)
    }
    prepareToken(e) {
        this._emitCurrentCharacterToken(e.location),
            this.currentToken = null,
        e.location && (e.location.endLine = this.preprocessor.line,
            e.location.endCol = this.preprocessor.col + 1,
            e.location.endOffset = this.preprocessor.offset + 1),
            this.currentLocation = this.getCurrentLocation(-1)
    }
    emitCurrentTagToken() {
        const e = this.currentToken;
        this.prepareToken(e),
            e.tagID = Fo(e.tagName),
            e.type === To.START_TAG ? (this.lastStartTagName = e.tagName,
                this.handler.onStartTag(e)) : (e.attrs.length > 0 && this._err(Eo.endTagWithAttributes),
            e.selfClosing && this._err(Eo.endTagWithTrailingSolidus),
                this.handler.onEndTag(e)),
            this.preprocessor.dropParsedChunk()
    }
    emitCurrentComment(e) {
        this.prepareToken(e),
            this.handler.onComment(e),
            this.preprocessor.dropParsedChunk()
    }
    emitCurrentDoctype(e) {
        this.prepareToken(e),
            this.handler.onDoctype(e),
            this.preprocessor.dropParsedChunk()
    }
    _emitCurrentCharacterToken(e) {
        if (this.currentCharacterToken) {
            switch (e && this.currentCharacterToken.location && (this.currentCharacterToken.location.endLine = e.startLine,
                this.currentCharacterToken.location.endCol = e.startCol,
                this.currentCharacterToken.location.endOffset = e.startOffset),
                this.currentCharacterToken.type) {
                case To.CHARACTER:
                    this.handler.onCharacter(this.currentCharacterToken);
                    break;
                case To.NULL_CHARACTER:
                    this.handler.onNullCharacter(this.currentCharacterToken);
                    break;
                case To.WHITESPACE_CHARACTER:
                    this.handler.onWhitespaceCharacter(this.currentCharacterToken)
            }
            this.currentCharacterToken = null
        }
    }
    _emitEOFToken() {
        const e = this.getCurrentLocation(0);
        e && (e.endLine = e.startLine,
            e.endCol = e.startCol,
            e.endOffset = e.startOffset),
            this._emitCurrentCharacterToken(e),
            this.handler.onEof({
                type: To.EOF,
                location: e
            }),
            this.active = !1
    }
    _appendCharToCurrentCharacterToken(e, t) {
        if (this.currentCharacterToken) {
            if (this.currentCharacterToken.type === e)
                return void (this.currentCharacterToken.chars += t);
            this.currentLocation = this.getCurrentLocation(0),
                this._emitCurrentCharacterToken(this.currentLocation),
                this.preprocessor.dropParsedChunk()
        }
        this._createCharacterToken(e, t)
    }
    _emitCodePoint(e) {
        const t = Zo(e) ? To.WHITESPACE_CHARACTER : e === io.NULL ? To.NULL_CHARACTER : To.CHARACTER;
        this._appendCharToCurrentCharacterToken(t, String.fromCodePoint(e))
    }
    _emitChars(e) {
        this._appendCharToCurrentCharacterToken(To.CHARACTER, e)
    }
    _matchNamedCharacterReference(e) {
        let t = null
            , n = 0
            , r = !1;
        for (let s = 0, a = wo[0]; s >= 0 && (s = Oo(wo, a, s + 1, e),
            !(s < 0)); e = this._consume()) {
            n += 1,
                a = wo[s];
            const o = a & yo.VALUE_LENGTH;
            if (o) {
                const a = (o >> 14) - 1;
                if (e !== io.SEMICOLON && this._isCharacterReferenceInAttribute() && ((i = this.preprocessor.peek(1)) === io.EQUALS_SIGN || Xo(i)) ? (t = [io.AMPERSAND],
                    s += a) : (t = 0 === a ? [wo[s] & ~yo.VALUE_LENGTH] : 1 === a ? [wo[++s]] : [wo[++s], wo[++s]],
                    n = 0,
                    r = e !== io.SEMICOLON),
                0 === a) {
                    this._consume();
                    break
                }
            }
        }
        var i;
        return this._unconsume(n),
        r && !this.preprocessor.endOfChunkHit && this._err(Eo.missingSemicolonAfterCharacterReference),
            this._unconsume(1),
            t
    }
    _isCharacterReferenceInAttribute() {
        return this.returnState === Ko.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === Ko.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === Ko.ATTRIBUTE_VALUE_UNQUOTED
    }
    _flushCodePointConsumedAsCharacterReference(e) {
        this._isCharacterReferenceInAttribute() ? this.currentAttr.value += String.fromCodePoint(e) : this._emitCodePoint(e)
    }
    _callState(e) {
        switch (this.state) {
            case Ko.DATA:
                this._stateData(e);
                break;
            case Ko.RCDATA:
                this._stateRcdata(e);
                break;
            case Ko.RAWTEXT:
                this._stateRawtext(e);
                break;
            case Ko.SCRIPT_DATA:
                this._stateScriptData(e);
                break;
            case Ko.PLAINTEXT:
                this._statePlaintext(e);
                break;
            case Ko.TAG_OPEN:
                this._stateTagOpen(e);
                break;
            case Ko.END_TAG_OPEN:
                this._stateEndTagOpen(e);
                break;
            case Ko.TAG_NAME:
                this._stateTagName(e);
                break;
            case Ko.RCDATA_LESS_THAN_SIGN:
                this._stateRcdataLessThanSign(e);
                break;
            case Ko.RCDATA_END_TAG_OPEN:
                this._stateRcdataEndTagOpen(e);
                break;
            case Ko.RCDATA_END_TAG_NAME:
                this._stateRcdataEndTagName(e);
                break;
            case Ko.RAWTEXT_LESS_THAN_SIGN:
                this._stateRawtextLessThanSign(e);
                break;
            case Ko.RAWTEXT_END_TAG_OPEN:
                this._stateRawtextEndTagOpen(e);
                break;
            case Ko.RAWTEXT_END_TAG_NAME:
                this._stateRawtextEndTagName(e);
                break;
            case Ko.SCRIPT_DATA_LESS_THAN_SIGN:
                this._stateScriptDataLessThanSign(e);
                break;
            case Ko.SCRIPT_DATA_END_TAG_OPEN:
                this._stateScriptDataEndTagOpen(e);
                break;
            case Ko.SCRIPT_DATA_END_TAG_NAME:
                this._stateScriptDataEndTagName(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPE_START:
                this._stateScriptDataEscapeStart(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPE_START_DASH:
                this._stateScriptDataEscapeStartDash(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED:
                this._stateScriptDataEscaped(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED_DASH:
                this._stateScriptDataEscapedDash(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED_DASH_DASH:
                this._stateScriptDataEscapedDashDash(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN:
                this._stateScriptDataEscapedLessThanSign(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED_END_TAG_OPEN:
                this._stateScriptDataEscapedEndTagOpen(e);
                break;
            case Ko.SCRIPT_DATA_ESCAPED_END_TAG_NAME:
                this._stateScriptDataEscapedEndTagName(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPE_START:
                this._stateScriptDataDoubleEscapeStart(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPED:
                this._stateScriptDataDoubleEscaped(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPED_DASH:
                this._stateScriptDataDoubleEscapedDash(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH:
                this._stateScriptDataDoubleEscapedDashDash(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN:
                this._stateScriptDataDoubleEscapedLessThanSign(e);
                break;
            case Ko.SCRIPT_DATA_DOUBLE_ESCAPE_END:
                this._stateScriptDataDoubleEscapeEnd(e);
                break;
            case Ko.BEFORE_ATTRIBUTE_NAME:
                this._stateBeforeAttributeName(e);
                break;
            case Ko.ATTRIBUTE_NAME:
                this._stateAttributeName(e);
                break;
            case Ko.AFTER_ATTRIBUTE_NAME:
                this._stateAfterAttributeName(e);
                break;
            case Ko.BEFORE_ATTRIBUTE_VALUE:
                this._stateBeforeAttributeValue(e);
                break;
            case Ko.ATTRIBUTE_VALUE_DOUBLE_QUOTED:
                this._stateAttributeValueDoubleQuoted(e);
                break;
            case Ko.ATTRIBUTE_VALUE_SINGLE_QUOTED:
                this._stateAttributeValueSingleQuoted(e);
                break;
            case Ko.ATTRIBUTE_VALUE_UNQUOTED:
                this._stateAttributeValueUnquoted(e);
                break;
            case Ko.AFTER_ATTRIBUTE_VALUE_QUOTED:
                this._stateAfterAttributeValueQuoted(e);
                break;
            case Ko.SELF_CLOSING_START_TAG:
                this._stateSelfClosingStartTag(e);
                break;
            case Ko.BOGUS_COMMENT:
                this._stateBogusComment(e);
                break;
            case Ko.MARKUP_DECLARATION_OPEN:
                this._stateMarkupDeclarationOpen(e);
                break;
            case Ko.COMMENT_START:
                this._stateCommentStart(e);
                break;
            case Ko.COMMENT_START_DASH:
                this._stateCommentStartDash(e);
                break;
            case Ko.COMMENT:
                this._stateComment(e);
                break;
            case Ko.COMMENT_LESS_THAN_SIGN:
                this._stateCommentLessThanSign(e);
                break;
            case Ko.COMMENT_LESS_THAN_SIGN_BANG:
                this._stateCommentLessThanSignBang(e);
                break;
            case Ko.COMMENT_LESS_THAN_SIGN_BANG_DASH:
                this._stateCommentLessThanSignBangDash(e);
                break;
            case Ko.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH:
                this._stateCommentLessThanSignBangDashDash(e);
                break;
            case Ko.COMMENT_END_DASH:
                this._stateCommentEndDash(e);
                break;
            case Ko.COMMENT_END:
                this._stateCommentEnd(e);
                break;
            case Ko.COMMENT_END_BANG:
                this._stateCommentEndBang(e);
                break;
            case Ko.DOCTYPE:
                this._stateDoctype(e);
                break;
            case Ko.BEFORE_DOCTYPE_NAME:
                this._stateBeforeDoctypeName(e);
                break;
            case Ko.DOCTYPE_NAME:
                this._stateDoctypeName(e);
                break;
            case Ko.AFTER_DOCTYPE_NAME:
                this._stateAfterDoctypeName(e);
                break;
            case Ko.AFTER_DOCTYPE_PUBLIC_KEYWORD:
                this._stateAfterDoctypePublicKeyword(e);
                break;
            case Ko.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER:
                this._stateBeforeDoctypePublicIdentifier(e);
                break;
            case Ko.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED:
                this._stateDoctypePublicIdentifierDoubleQuoted(e);
                break;
            case Ko.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED:
                this._stateDoctypePublicIdentifierSingleQuoted(e);
                break;
            case Ko.AFTER_DOCTYPE_PUBLIC_IDENTIFIER:
                this._stateAfterDoctypePublicIdentifier(e);
                break;
            case Ko.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS:
                this._stateBetweenDoctypePublicAndSystemIdentifiers(e);
                break;
            case Ko.AFTER_DOCTYPE_SYSTEM_KEYWORD:
                this._stateAfterDoctypeSystemKeyword(e);
                break;
            case Ko.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER:
                this._stateBeforeDoctypeSystemIdentifier(e);
                break;
            case Ko.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED:
                this._stateDoctypeSystemIdentifierDoubleQuoted(e);
                break;
            case Ko.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED:
                this._stateDoctypeSystemIdentifierSingleQuoted(e);
                break;
            case Ko.AFTER_DOCTYPE_SYSTEM_IDENTIFIER:
                this._stateAfterDoctypeSystemIdentifier(e);
                break;
            case Ko.BOGUS_DOCTYPE:
                this._stateBogusDoctype(e);
                break;
            case Ko.CDATA_SECTION:
                this._stateCdataSection(e);
                break;
            case Ko.CDATA_SECTION_BRACKET:
                this._stateCdataSectionBracket(e);
                break;
            case Ko.CDATA_SECTION_END:
                this._stateCdataSectionEnd(e);
                break;
            case Ko.CHARACTER_REFERENCE:
                this._stateCharacterReference(e);
                break;
            case Ko.NAMED_CHARACTER_REFERENCE:
                this._stateNamedCharacterReference(e);
                break;
            case Ko.AMBIGUOUS_AMPERSAND:
                this._stateAmbiguousAmpersand(e);
                break;
            case Ko.NUMERIC_CHARACTER_REFERENCE:
                this._stateNumericCharacterReference(e);
                break;
            case Ko.HEXADEMICAL_CHARACTER_REFERENCE_START:
                this._stateHexademicalCharacterReferenceStart(e);
                break;
            case Ko.HEXADEMICAL_CHARACTER_REFERENCE:
                this._stateHexademicalCharacterReference(e);
                break;
            case Ko.DECIMAL_CHARACTER_REFERENCE:
                this._stateDecimalCharacterReference(e);
                break;
            case Ko.NUMERIC_CHARACTER_REFERENCE_END:
                this._stateNumericCharacterReferenceEnd(e);
                break;
            default:
                throw new Error("Unknown state")
        }
    }
    _stateData(e) {
        switch (e) {
            case io.LESS_THAN_SIGN:
                this.state = Ko.TAG_OPEN;
                break;
            case io.AMPERSAND:
                this.returnState = Ko.DATA,
                    this.state = Ko.CHARACTER_REFERENCE;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitCodePoint(e);
                break;
            case io.EOF:
                this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateRcdata(e) {
        switch (e) {
            case io.AMPERSAND:
                this.returnState = Ko.RCDATA,
                    this.state = Ko.CHARACTER_REFERENCE;
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.RCDATA_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateRawtext(e) {
        switch (e) {
            case io.LESS_THAN_SIGN:
                this.state = Ko.RAWTEXT_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateScriptData(e) {
        switch (e) {
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _statePlaintext(e) {
        switch (e) {
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateTagOpen(e) {
        if (Qo(e))
            this._createStartTagToken(),
                this.state = Ko.TAG_NAME,
                this._stateTagName(e);
        else
            switch (e) {
                case io.EXCLAMATION_MARK:
                    this.state = Ko.MARKUP_DECLARATION_OPEN;
                    break;
                case io.SOLIDUS:
                    this.state = Ko.END_TAG_OPEN;
                    break;
                case io.QUESTION_MARK:
                    this._err(Eo.unexpectedQuestionMarkInsteadOfTagName),
                        this._createCommentToken(1),
                        this.state = Ko.BOGUS_COMMENT,
                        this._stateBogusComment(e);
                    break;
                case io.EOF:
                    this._err(Eo.eofBeforeTagName),
                        this._emitChars("<"),
                        this._emitEOFToken();
                    break;
                default:
                    this._err(Eo.invalidFirstCharacterOfTagName),
                        this._emitChars("<"),
                        this.state = Ko.DATA,
                        this._stateData(e)
            }
    }
    _stateEndTagOpen(e) {
        if (Qo(e))
            this._createEndTagToken(),
                this.state = Ko.TAG_NAME,
                this._stateTagName(e);
        else
            switch (e) {
                case io.GREATER_THAN_SIGN:
                    this._err(Eo.missingEndTagName),
                        this.state = Ko.DATA;
                    break;
                case io.EOF:
                    this._err(Eo.eofBeforeTagName),
                        this._emitChars("</"),
                        this._emitEOFToken();
                    break;
                default:
                    this._err(Eo.invalidFirstCharacterOfTagName),
                        this._createCommentToken(2),
                        this.state = Ko.BOGUS_COMMENT,
                        this._stateBogusComment(e)
            }
    }
    _stateTagName(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.BEFORE_ATTRIBUTE_NAME;
                break;
            case io.SOLIDUS:
                this.state = Ko.SELF_CLOSING_START_TAG;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.tagName += "�";
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                t.tagName += String.fromCodePoint(Wo(e) ? Jo(e) : e)
        }
    }
    _stateRcdataLessThanSign(e) {
        e === io.SOLIDUS ? this.state = Ko.RCDATA_END_TAG_OPEN : (this._emitChars("<"),
            this.state = Ko.RCDATA,
            this._stateRcdata(e))
    }
    _stateRcdataEndTagOpen(e) {
        Qo(e) ? (this.state = Ko.RCDATA_END_TAG_NAME,
            this._stateRcdataEndTagName(e)) : (this._emitChars("</"),
            this.state = Ko.RCDATA,
            this._stateRcdata(e))
    }
    handleSpecialEndTag(e) {
        if (!this.preprocessor.startsWith(this.lastStartTagName, !1))
            return !this._ensureHibernation();
        this._createEndTagToken();
        this.currentToken.tagName = this.lastStartTagName;
        switch (this.preprocessor.peek(this.lastStartTagName.length)) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                return this._advanceBy(this.lastStartTagName.length),
                    this.state = Ko.BEFORE_ATTRIBUTE_NAME,
                    !1;
            case io.SOLIDUS:
                return this._advanceBy(this.lastStartTagName.length),
                    this.state = Ko.SELF_CLOSING_START_TAG,
                    !1;
            case io.GREATER_THAN_SIGN:
                return this._advanceBy(this.lastStartTagName.length),
                    this.emitCurrentTagToken(),
                    this.state = Ko.DATA,
                    !1;
            default:
                return !this._ensureHibernation()
        }
    }
    _stateRcdataEndTagName(e) {
        this.handleSpecialEndTag(e) && (this._emitChars("</"),
            this.state = Ko.RCDATA,
            this._stateRcdata(e))
    }
    _stateRawtextLessThanSign(e) {
        e === io.SOLIDUS ? this.state = Ko.RAWTEXT_END_TAG_OPEN : (this._emitChars("<"),
            this.state = Ko.RAWTEXT,
            this._stateRawtext(e))
    }
    _stateRawtextEndTagOpen(e) {
        Qo(e) ? (this.state = Ko.RAWTEXT_END_TAG_NAME,
            this._stateRawtextEndTagName(e)) : (this._emitChars("</"),
            this.state = Ko.RAWTEXT,
            this._stateRawtext(e))
    }
    _stateRawtextEndTagName(e) {
        this.handleSpecialEndTag(e) && (this._emitChars("</"),
            this.state = Ko.RAWTEXT,
            this._stateRawtext(e))
    }
    _stateScriptDataLessThanSign(e) {
        switch (e) {
            case io.SOLIDUS:
                this.state = Ko.SCRIPT_DATA_END_TAG_OPEN;
                break;
            case io.EXCLAMATION_MARK:
                this.state = Ko.SCRIPT_DATA_ESCAPE_START,
                    this._emitChars("<!");
                break;
            default:
                this._emitChars("<"),
                    this.state = Ko.SCRIPT_DATA,
                    this._stateScriptData(e)
        }
    }
    _stateScriptDataEndTagOpen(e) {
        Qo(e) ? (this.state = Ko.SCRIPT_DATA_END_TAG_NAME,
            this._stateScriptDataEndTagName(e)) : (this._emitChars("</"),
            this.state = Ko.SCRIPT_DATA,
            this._stateScriptData(e))
    }
    _stateScriptDataEndTagName(e) {
        this.handleSpecialEndTag(e) && (this._emitChars("</"),
            this.state = Ko.SCRIPT_DATA,
            this._stateScriptData(e))
    }
    _stateScriptDataEscapeStart(e) {
        e === io.HYPHEN_MINUS ? (this.state = Ko.SCRIPT_DATA_ESCAPE_START_DASH,
            this._emitChars("-")) : (this.state = Ko.SCRIPT_DATA,
            this._stateScriptData(e))
    }
    _stateScriptDataEscapeStartDash(e) {
        e === io.HYPHEN_MINUS ? (this.state = Ko.SCRIPT_DATA_ESCAPED_DASH_DASH,
            this._emitChars("-")) : (this.state = Ko.SCRIPT_DATA,
            this._stateScriptData(e))
    }
    _stateScriptDataEscaped(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.SCRIPT_DATA_ESCAPED_DASH,
                    this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateScriptDataEscapedDash(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.SCRIPT_DATA_ESCAPED_DASH_DASH,
                    this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.state = Ko.SCRIPT_DATA_ESCAPED,
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this.state = Ko.SCRIPT_DATA_ESCAPED,
                    this._emitCodePoint(e)
        }
    }
    _stateScriptDataEscapedDashDash(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA,
                    this._emitChars(">");
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.state = Ko.SCRIPT_DATA_ESCAPED,
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this.state = Ko.SCRIPT_DATA_ESCAPED,
                    this._emitCodePoint(e)
        }
    }
    _stateScriptDataEscapedLessThanSign(e) {
        e === io.SOLIDUS ? this.state = Ko.SCRIPT_DATA_ESCAPED_END_TAG_OPEN : Qo(e) ? (this._emitChars("<"),
            this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPE_START,
            this._stateScriptDataDoubleEscapeStart(e)) : (this._emitChars("<"),
            this.state = Ko.SCRIPT_DATA_ESCAPED,
            this._stateScriptDataEscaped(e))
    }
    _stateScriptDataEscapedEndTagOpen(e) {
        Qo(e) ? (this.state = Ko.SCRIPT_DATA_ESCAPED_END_TAG_NAME,
            this._stateScriptDataEscapedEndTagName(e)) : (this._emitChars("</"),
            this.state = Ko.SCRIPT_DATA_ESCAPED,
            this._stateScriptDataEscaped(e))
    }
    _stateScriptDataEscapedEndTagName(e) {
        this.handleSpecialEndTag(e) && (this._emitChars("</"),
            this.state = Ko.SCRIPT_DATA_ESCAPED,
            this._stateScriptDataEscaped(e))
    }
    _stateScriptDataDoubleEscapeStart(e) {
        if (this.preprocessor.startsWith(co, !1) && ec(this.preprocessor.peek(co.length))) {
            this._emitCodePoint(e);
            for (let e = 0; e < co.length; e++)
                this._emitCodePoint(this._consume());
            this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED
        } else
            this._ensureHibernation() || (this.state = Ko.SCRIPT_DATA_ESCAPED,
                this._stateScriptDataEscaped(e))
    }
    _stateScriptDataDoubleEscaped(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED_DASH,
                    this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,
                    this._emitChars("<");
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateScriptDataDoubleEscapedDash(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH,
                    this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,
                    this._emitChars("<");
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
                    this._emitCodePoint(e)
        }
    }
    _stateScriptDataDoubleEscapedDashDash(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this._emitChars("-");
                break;
            case io.LESS_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN,
                    this._emitChars("<");
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.SCRIPT_DATA,
                    this._emitChars(">");
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
                    this._emitChars("�");
                break;
            case io.EOF:
                this._err(Eo.eofInScriptHtmlCommentLikeText),
                    this._emitEOFToken();
                break;
            default:
                this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
                    this._emitCodePoint(e)
        }
    }
    _stateScriptDataDoubleEscapedLessThanSign(e) {
        e === io.SOLIDUS ? (this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPE_END,
            this._emitChars("/")) : (this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
            this._stateScriptDataDoubleEscaped(e))
    }
    _stateScriptDataDoubleEscapeEnd(e) {
        if (this.preprocessor.startsWith(co, !1) && ec(this.preprocessor.peek(co.length))) {
            this._emitCodePoint(e);
            for (let e = 0; e < co.length; e++)
                this._emitCodePoint(this._consume());
            this.state = Ko.SCRIPT_DATA_ESCAPED
        } else
            this._ensureHibernation() || (this.state = Ko.SCRIPT_DATA_DOUBLE_ESCAPED,
                this._stateScriptDataDoubleEscaped(e))
    }
    _stateBeforeAttributeName(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.SOLIDUS:
            case io.GREATER_THAN_SIGN:
            case io.EOF:
                this.state = Ko.AFTER_ATTRIBUTE_NAME,
                    this._stateAfterAttributeName(e);
                break;
            case io.EQUALS_SIGN:
                this._err(Eo.unexpectedEqualsSignBeforeAttributeName),
                    this._createAttr("="),
                    this.state = Ko.ATTRIBUTE_NAME;
                break;
            default:
                this._createAttr(""),
                    this.state = Ko.ATTRIBUTE_NAME,
                    this._stateAttributeName(e)
        }
    }
    _stateAttributeName(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
            case io.SOLIDUS:
            case io.GREATER_THAN_SIGN:
            case io.EOF:
                this._leaveAttrName(),
                    this.state = Ko.AFTER_ATTRIBUTE_NAME,
                    this._stateAfterAttributeName(e);
                break;
            case io.EQUALS_SIGN:
                this._leaveAttrName(),
                    this.state = Ko.BEFORE_ATTRIBUTE_VALUE;
                break;
            case io.QUOTATION_MARK:
            case io.APOSTROPHE:
            case io.LESS_THAN_SIGN:
                this._err(Eo.unexpectedCharacterInAttributeName),
                    this.currentAttr.name += String.fromCodePoint(e);
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.currentAttr.name += "�";
                break;
            default:
                this.currentAttr.name += String.fromCodePoint(Wo(e) ? Jo(e) : e)
        }
    }
    _stateAfterAttributeName(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.SOLIDUS:
                this.state = Ko.SELF_CLOSING_START_TAG;
                break;
            case io.EQUALS_SIGN:
                this.state = Ko.BEFORE_ATTRIBUTE_VALUE;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this._createAttr(""),
                    this.state = Ko.ATTRIBUTE_NAME,
                    this._stateAttributeName(e)
        }
    }
    _stateBeforeAttributeValue(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.QUOTATION_MARK:
                this.state = Ko.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                this.state = Ko.ATTRIBUTE_VALUE_SINGLE_QUOTED;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.missingAttributeValue),
                    this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            default:
                this.state = Ko.ATTRIBUTE_VALUE_UNQUOTED,
                    this._stateAttributeValueUnquoted(e)
        }
    }
    _stateAttributeValueDoubleQuoted(e) {
        switch (e) {
            case io.QUOTATION_MARK:
                this.state = Ko.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            case io.AMPERSAND:
                this.returnState = Ko.ATTRIBUTE_VALUE_DOUBLE_QUOTED,
                    this.state = Ko.CHARACTER_REFERENCE;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.currentAttr.value += "�";
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this.currentAttr.value += String.fromCodePoint(e)
        }
    }
    _stateAttributeValueSingleQuoted(e) {
        switch (e) {
            case io.APOSTROPHE:
                this.state = Ko.AFTER_ATTRIBUTE_VALUE_QUOTED;
                break;
            case io.AMPERSAND:
                this.returnState = Ko.ATTRIBUTE_VALUE_SINGLE_QUOTED,
                    this.state = Ko.CHARACTER_REFERENCE;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.currentAttr.value += "�";
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this.currentAttr.value += String.fromCodePoint(e)
        }
    }
    _stateAttributeValueUnquoted(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this._leaveAttrValue(),
                    this.state = Ko.BEFORE_ATTRIBUTE_NAME;
                break;
            case io.AMPERSAND:
                this.returnState = Ko.ATTRIBUTE_VALUE_UNQUOTED,
                    this.state = Ko.CHARACTER_REFERENCE;
                break;
            case io.GREATER_THAN_SIGN:
                this._leaveAttrValue(),
                    this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    this.currentAttr.value += "�";
                break;
            case io.QUOTATION_MARK:
            case io.APOSTROPHE:
            case io.LESS_THAN_SIGN:
            case io.EQUALS_SIGN:
            case io.GRAVE_ACCENT:
                this._err(Eo.unexpectedCharacterInUnquotedAttributeValue),
                    this.currentAttr.value += String.fromCodePoint(e);
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this.currentAttr.value += String.fromCodePoint(e)
        }
    }
    _stateAfterAttributeValueQuoted(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this._leaveAttrValue(),
                    this.state = Ko.BEFORE_ATTRIBUTE_NAME;
                break;
            case io.SOLIDUS:
                this._leaveAttrValue(),
                    this.state = Ko.SELF_CLOSING_START_TAG;
                break;
            case io.GREATER_THAN_SIGN:
                this._leaveAttrValue(),
                    this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingWhitespaceBetweenAttributes),
                    this.state = Ko.BEFORE_ATTRIBUTE_NAME,
                    this._stateBeforeAttributeName(e)
        }
    }
    _stateSelfClosingStartTag(e) {
        switch (e) {
            case io.GREATER_THAN_SIGN:
                this.currentToken.selfClosing = !0,
                    this.state = Ko.DATA,
                    this.emitCurrentTagToken();
                break;
            case io.EOF:
                this._err(Eo.eofInTag),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.unexpectedSolidusInTag),
                    this.state = Ko.BEFORE_ATTRIBUTE_NAME,
                    this._stateBeforeAttributeName(e)
        }
    }
    _stateBogusComment(e) {
        const t = this.currentToken;
        switch (e) {
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentComment(t);
                break;
            case io.EOF:
                this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.data += "�";
                break;
            default:
                t.data += String.fromCodePoint(e)
        }
    }
    _stateMarkupDeclarationOpen(e) {
        this._consumeSequenceIfMatch(so, !0) ? (this._createCommentToken(so.length + 1),
            this.state = Ko.COMMENT_START) : this._consumeSequenceIfMatch(oo, !1) ? (this.currentLocation = this.getCurrentLocation(oo.length + 1),
            this.state = Ko.DOCTYPE) : this._consumeSequenceIfMatch(ao, !0) ? this.inForeignNode ? this.state = Ko.CDATA_SECTION : (this._err(Eo.cdataInHtmlContent),
            this._createCommentToken(ao.length + 1),
            this.currentToken.data = "[CDATA[",
            this.state = Ko.BOGUS_COMMENT) : this._ensureHibernation() || (this._err(Eo.incorrectlyOpenedComment),
            this._createCommentToken(2),
            this.state = Ko.BOGUS_COMMENT,
            this._stateBogusComment(e))
    }
    _stateCommentStart(e) {
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.COMMENT_START_DASH;
                break;
            case io.GREATER_THAN_SIGN:
            {
                this._err(Eo.abruptClosingOfEmptyComment),
                    this.state = Ko.DATA;
                const e = this.currentToken;
                this.emitCurrentComment(e);
                break
            }
            default:
                this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateCommentStartDash(e) {
        const t = this.currentToken;
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.COMMENT_END;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.abruptClosingOfEmptyComment),
                    this.state = Ko.DATA,
                    this.emitCurrentComment(t);
                break;
            case io.EOF:
                this._err(Eo.eofInComment),
                    this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            default:
                t.data += "-",
                    this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateComment(e) {
        const t = this.currentToken;
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.COMMENT_END_DASH;
                break;
            case io.LESS_THAN_SIGN:
                t.data += "<",
                    this.state = Ko.COMMENT_LESS_THAN_SIGN;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.data += "�";
                break;
            case io.EOF:
                this._err(Eo.eofInComment),
                    this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            default:
                t.data += String.fromCodePoint(e)
        }
    }
    _stateCommentLessThanSign(e) {
        const t = this.currentToken;
        switch (e) {
            case io.EXCLAMATION_MARK:
                t.data += "!",
                    this.state = Ko.COMMENT_LESS_THAN_SIGN_BANG;
                break;
            case io.LESS_THAN_SIGN:
                t.data += "<";
                break;
            default:
                this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateCommentLessThanSignBang(e) {
        e === io.HYPHEN_MINUS ? this.state = Ko.COMMENT_LESS_THAN_SIGN_BANG_DASH : (this.state = Ko.COMMENT,
            this._stateComment(e))
    }
    _stateCommentLessThanSignBangDash(e) {
        e === io.HYPHEN_MINUS ? this.state = Ko.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH : (this.state = Ko.COMMENT_END_DASH,
            this._stateCommentEndDash(e))
    }
    _stateCommentLessThanSignBangDashDash(e) {
        e !== io.GREATER_THAN_SIGN && e !== io.EOF && this._err(Eo.nestedComment),
            this.state = Ko.COMMENT_END,
            this._stateCommentEnd(e)
    }
    _stateCommentEndDash(e) {
        const t = this.currentToken;
        switch (e) {
            case io.HYPHEN_MINUS:
                this.state = Ko.COMMENT_END;
                break;
            case io.EOF:
                this._err(Eo.eofInComment),
                    this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            default:
                t.data += "-",
                    this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateCommentEnd(e) {
        const t = this.currentToken;
        switch (e) {
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentComment(t);
                break;
            case io.EXCLAMATION_MARK:
                this.state = Ko.COMMENT_END_BANG;
                break;
            case io.HYPHEN_MINUS:
                t.data += "-";
                break;
            case io.EOF:
                this._err(Eo.eofInComment),
                    this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            default:
                t.data += "--",
                    this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateCommentEndBang(e) {
        const t = this.currentToken;
        switch (e) {
            case io.HYPHEN_MINUS:
                t.data += "--!",
                    this.state = Ko.COMMENT_END_DASH;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.incorrectlyClosedComment),
                    this.state = Ko.DATA,
                    this.emitCurrentComment(t);
                break;
            case io.EOF:
                this._err(Eo.eofInComment),
                    this.emitCurrentComment(t),
                    this._emitEOFToken();
                break;
            default:
                t.data += "--!",
                    this.state = Ko.COMMENT,
                    this._stateComment(e)
        }
    }
    _stateDoctype(e) {
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.BEFORE_DOCTYPE_NAME;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.BEFORE_DOCTYPE_NAME,
                    this._stateBeforeDoctypeName(e);
                break;
            case io.EOF:
            {
                this._err(Eo.eofInDoctype),
                    this._createDoctypeToken(null);
                const e = this.currentToken;
                e.forceQuirks = !0,
                    this.emitCurrentDoctype(e),
                    this._emitEOFToken();
                break
            }
            default:
                this._err(Eo.missingWhitespaceBeforeDoctypeName),
                    this.state = Ko.BEFORE_DOCTYPE_NAME,
                    this._stateBeforeDoctypeName(e)
        }
    }
    _stateBeforeDoctypeName(e) {
        if (Wo(e))
            this._createDoctypeToken(String.fromCharCode(Jo(e))),
                this.state = Ko.DOCTYPE_NAME;
        else
            switch (e) {
                case io.SPACE:
                case io.LINE_FEED:
                case io.TABULATION:
                case io.FORM_FEED:
                    break;
                case io.NULL:
                    this._err(Eo.unexpectedNullCharacter),
                        this._createDoctypeToken("�"),
                        this.state = Ko.DOCTYPE_NAME;
                    break;
                case io.GREATER_THAN_SIGN:
                {
                    this._err(Eo.missingDoctypeName),
                        this._createDoctypeToken(null);
                    const e = this.currentToken;
                    e.forceQuirks = !0,
                        this.emitCurrentDoctype(e),
                        this.state = Ko.DATA;
                    break
                }
                case io.EOF:
                {
                    this._err(Eo.eofInDoctype),
                        this._createDoctypeToken(null);
                    const e = this.currentToken;
                    e.forceQuirks = !0,
                        this.emitCurrentDoctype(e),
                        this._emitEOFToken();
                    break
                }
                default:
                    this._createDoctypeToken(String.fromCodePoint(e)),
                        this.state = Ko.DOCTYPE_NAME
            }
    }
    _stateDoctypeName(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.AFTER_DOCTYPE_NAME;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.name += "�";
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                t.name += String.fromCodePoint(Wo(e) ? Jo(e) : e)
        }
    }
    _stateAfterDoctypeName(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._consumeSequenceIfMatch(lo, !1) ? this.state = Ko.AFTER_DOCTYPE_PUBLIC_KEYWORD : this._consumeSequenceIfMatch(ho, !1) ? this.state = Ko.AFTER_DOCTYPE_SYSTEM_KEYWORD : this._ensureHibernation() || (this._err(Eo.invalidCharacterSequenceAfterDoctypeName),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e))
        }
    }
    _stateAfterDoctypePublicKeyword(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            case io.QUOTATION_MARK:
                this._err(Eo.missingWhitespaceAfterDoctypePublicKeyword),
                    t.publicId = "",
                    this.state = Ko.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                this._err(Eo.missingWhitespaceAfterDoctypePublicKeyword),
                    t.publicId = "",
                    this.state = Ko.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.missingDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateBeforeDoctypePublicIdentifier(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.QUOTATION_MARK:
                t.publicId = "",
                    this.state = Ko.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                t.publicId = "",
                    this.state = Ko.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.missingDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateDoctypePublicIdentifierDoubleQuoted(e) {
        const t = this.currentToken;
        switch (e) {
            case io.QUOTATION_MARK:
                this.state = Ko.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.publicId += "�";
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.abruptDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                t.publicId += String.fromCodePoint(e)
        }
    }
    _stateDoctypePublicIdentifierSingleQuoted(e) {
        const t = this.currentToken;
        switch (e) {
            case io.APOSTROPHE:
                this.state = Ko.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.publicId += "�";
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.abruptDoctypePublicIdentifier),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                t.publicId += String.fromCodePoint(e)
        }
    }
    _stateAfterDoctypePublicIdentifier(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
                break;
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.QUOTATION_MARK:
                this._err(Eo.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),
                    t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                this._err(Eo.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers),
                    t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateBetweenDoctypePublicAndSystemIdentifiers(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.QUOTATION_MARK:
                t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateAfterDoctypeSystemKeyword(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                this.state = Ko.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            case io.QUOTATION_MARK:
                this._err(Eo.missingWhitespaceAfterDoctypeSystemKeyword),
                    t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                this._err(Eo.missingWhitespaceAfterDoctypeSystemKeyword),
                    t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.missingDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateBeforeDoctypeSystemIdentifier(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.QUOTATION_MARK:
                t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
                break;
            case io.APOSTROPHE:
                t.systemId = "",
                    this.state = Ko.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.missingDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.DATA,
                    this.emitCurrentDoctype(t);
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.missingQuoteBeforeDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateDoctypeSystemIdentifierDoubleQuoted(e) {
        const t = this.currentToken;
        switch (e) {
            case io.QUOTATION_MARK:
                this.state = Ko.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.systemId += "�";
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.abruptDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                t.systemId += String.fromCodePoint(e)
        }
    }
    _stateDoctypeSystemIdentifierSingleQuoted(e) {
        const t = this.currentToken;
        switch (e) {
            case io.APOSTROPHE:
                this.state = Ko.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter),
                    t.systemId += "�";
                break;
            case io.GREATER_THAN_SIGN:
                this._err(Eo.abruptDoctypeSystemIdentifier),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                t.systemId += String.fromCodePoint(e)
        }
    }
    _stateAfterDoctypeSystemIdentifier(e) {
        const t = this.currentToken;
        switch (e) {
            case io.SPACE:
            case io.LINE_FEED:
            case io.TABULATION:
            case io.FORM_FEED:
                break;
            case io.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.EOF:
                this._err(Eo.eofInDoctype),
                    t.forceQuirks = !0,
                    this.emitCurrentDoctype(t),
                    this._emitEOFToken();
                break;
            default:
                this._err(Eo.unexpectedCharacterAfterDoctypeSystemIdentifier),
                    this.state = Ko.BOGUS_DOCTYPE,
                    this._stateBogusDoctype(e)
        }
    }
    _stateBogusDoctype(e) {
        const t = this.currentToken;
        switch (e) {
            case io.GREATER_THAN_SIGN:
                this.emitCurrentDoctype(t),
                    this.state = Ko.DATA;
                break;
            case io.NULL:
                this._err(Eo.unexpectedNullCharacter);
                break;
            case io.EOF:
                this.emitCurrentDoctype(t),
                    this._emitEOFToken()
        }
    }
    _stateCdataSection(e) {
        switch (e) {
            case io.RIGHT_SQUARE_BRACKET:
                this.state = Ko.CDATA_SECTION_BRACKET;
                break;
            case io.EOF:
                this._err(Eo.eofInCdata),
                    this._emitEOFToken();
                break;
            default:
                this._emitCodePoint(e)
        }
    }
    _stateCdataSectionBracket(e) {
        e === io.RIGHT_SQUARE_BRACKET ? this.state = Ko.CDATA_SECTION_END : (this._emitChars("]"),
            this.state = Ko.CDATA_SECTION,
            this._stateCdataSection(e))
    }
    _stateCdataSectionEnd(e) {
        switch (e) {
            case io.GREATER_THAN_SIGN:
                this.state = Ko.DATA;
                break;
            case io.RIGHT_SQUARE_BRACKET:
                this._emitChars("]");
                break;
            default:
                this._emitChars("]]"),
                    this.state = Ko.CDATA_SECTION,
                    this._stateCdataSection(e)
        }
    }
    _stateCharacterReference(e) {
        e === io.NUMBER_SIGN ? this.state = Ko.NUMERIC_CHARACTER_REFERENCE : Xo(e) ? (this.state = Ko.NAMED_CHARACTER_REFERENCE,
            this._stateNamedCharacterReference(e)) : (this._flushCodePointConsumedAsCharacterReference(io.AMPERSAND),
            this._reconsumeInState(this.returnState, e))
    }
    _stateNamedCharacterReference(e) {
        const t = this._matchNamedCharacterReference(e);
        if (this._ensureHibernation())
            ;
        else if (t) {
            for (let e = 0; e < t.length; e++)
                this._flushCodePointConsumedAsCharacterReference(t[e]);
            this.state = this.returnState
        } else
            this._flushCodePointConsumedAsCharacterReference(io.AMPERSAND),
                this.state = Ko.AMBIGUOUS_AMPERSAND
    }
    _stateAmbiguousAmpersand(e) {
        Xo(e) ? this._flushCodePointConsumedAsCharacterReference(e) : (e === io.SEMICOLON && this._err(Eo.unknownNamedCharacterReference),
            this._reconsumeInState(this.returnState, e))
    }
    _stateNumericCharacterReference(e) {
        this.charRefCode = 0,
            e === io.LATIN_SMALL_X || e === io.LATIN_CAPITAL_X ? this.state = Ko.HEXADEMICAL_CHARACTER_REFERENCE_START : Vo(e) ? (this.state = Ko.DECIMAL_CHARACTER_REFERENCE,
                this._stateDecimalCharacterReference(e)) : (this._err(Eo.absenceOfDigitsInNumericCharacterReference),
                this._flushCodePointConsumedAsCharacterReference(io.AMPERSAND),
                this._flushCodePointConsumedAsCharacterReference(io.NUMBER_SIGN),
                this._reconsumeInState(this.returnState, e))
    }
    _stateHexademicalCharacterReferenceStart(e) {
        !function(e) {
            return Vo(e) || $o(e) || zo(e)
        }(e) ? (this._err(Eo.absenceOfDigitsInNumericCharacterReference),
            this._flushCodePointConsumedAsCharacterReference(io.AMPERSAND),
            this._flushCodePointConsumedAsCharacterReference(io.NUMBER_SIGN),
            this._unconsume(2),
            this.state = this.returnState) : (this.state = Ko.HEXADEMICAL_CHARACTER_REFERENCE,
            this._stateHexademicalCharacterReference(e))
    }
    _stateHexademicalCharacterReference(e) {
        $o(e) ? this.charRefCode = 16 * this.charRefCode + e - 55 : zo(e) ? this.charRefCode = 16 * this.charRefCode + e - 87 : Vo(e) ? this.charRefCode = 16 * this.charRefCode + e - 48 : e === io.SEMICOLON ? this.state = Ko.NUMERIC_CHARACTER_REFERENCE_END : (this._err(Eo.missingSemicolonAfterCharacterReference),
            this.state = Ko.NUMERIC_CHARACTER_REFERENCE_END,
            this._stateNumericCharacterReferenceEnd(e))
    }
    _stateDecimalCharacterReference(e) {
        Vo(e) ? this.charRefCode = 10 * this.charRefCode + e - 48 : e === io.SEMICOLON ? this.state = Ko.NUMERIC_CHARACTER_REFERENCE_END : (this._err(Eo.missingSemicolonAfterCharacterReference),
            this.state = Ko.NUMERIC_CHARACTER_REFERENCE_END,
            this._stateNumericCharacterReferenceEnd(e))
    }
    _stateNumericCharacterReferenceEnd(e) {
        if (this.charRefCode === io.NULL)
            this._err(Eo.nullCharacterReference),
                this.charRefCode = io.REPLACEMENT_CHARACTER;
        else if (this.charRefCode > 1114111)
            this._err(Eo.characterReferenceOutsideUnicodeRange),
                this.charRefCode = io.REPLACEMENT_CHARACTER;
        else if (uo(this.charRefCode))
            this._err(Eo.surrogateCharacterReference),
                this.charRefCode = io.REPLACEMENT_CHARACTER;
        else if (fo(this.charRefCode))
            this._err(Eo.noncharacterCharacterReference);
        else if (po(this.charRefCode) || this.charRefCode === io.CARRIAGE_RETURN) {
            this._err(Eo.controlCharacterReference);
            const e = qo.get(this.charRefCode);
            void 0 !== e && (this.charRefCode = e)
        }
        this._flushCodePointConsumedAsCharacterReference(this.charRefCode),
            this._reconsumeInState(this.returnState, e)
    }
}
const nc = new Set([Po.DD, Po.DT, Po.LI, Po.OPTGROUP, Po.OPTION, Po.P, Po.RB, Po.RP, Po.RT, Po.RTC])
    , rc = new Set([...nc, Po.CAPTION, Po.COLGROUP, Po.TBODY, Po.TD, Po.TFOOT, Po.TH, Po.THEAD, Po.TR])
    , ic = new Map([[Po.APPLET, vo.HTML], [Po.CAPTION, vo.HTML], [Po.HTML, vo.HTML], [Po.MARQUEE, vo.HTML], [Po.OBJECT, vo.HTML], [Po.TABLE, vo.HTML], [Po.TD, vo.HTML], [Po.TEMPLATE, vo.HTML], [Po.TH, vo.HTML], [Po.ANNOTATION_XML, vo.MATHML], [Po.MI, vo.MATHML], [Po.MN, vo.MATHML], [Po.MO, vo.MATHML], [Po.MS, vo.MATHML], [Po.MTEXT, vo.MATHML], [Po.DESC, vo.SVG], [Po.FOREIGN_OBJECT, vo.SVG], [Po.TITLE, vo.SVG]])
    , sc = [Po.H1, Po.H2, Po.H3, Po.H4, Po.H5, Po.H6]
    , ac = [Po.TR, Po.TEMPLATE, Po.HTML]
    , oc = [Po.TBODY, Po.TFOOT, Po.THEAD, Po.TEMPLATE, Po.HTML]
    , cc = [Po.TABLE, Po.TEMPLATE, Po.HTML]
    , lc = [Po.TD, Po.TH];
class hc {
    constructor(e, t, n) {
        this.treeAdapter = t,
            this.handler = n,
            this.items = [],
            this.tagIDs = [],
            this.stackTop = -1,
            this.tmplCount = 0,
            this.currentTagId = Po.UNKNOWN,
            this.current = e
    }
    get currentTmplContentOrNode() {
        return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current
    }
    _indexOf(e) {
        return this.items.lastIndexOf(e, this.stackTop)
    }
    _isInTemplate() {
        return this.currentTagId === Po.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === vo.HTML
    }
    _updateCurrentElement() {
        this.current = this.items[this.stackTop],
            this.currentTagId = this.tagIDs[this.stackTop]
    }
    push(e, t) {
        this.stackTop++,
            this.items[this.stackTop] = e,
            this.current = e,
            this.tagIDs[this.stackTop] = t,
            this.currentTagId = t,
        this._isInTemplate() && this.tmplCount++,
            this.handler.onItemPush(e, t, !0)
    }
    pop() {
        const e = this.current;
        this.tmplCount > 0 && this._isInTemplate() && this.tmplCount--,
            this.stackTop--,
            this._updateCurrentElement(),
            this.handler.onItemPop(e, !0)
    }
    replace(e, t) {
        const n = this._indexOf(e);
        this.items[n] = t,
        n === this.stackTop && (this.current = t)
    }
    insertAfter(e, t, n) {
        const r = this._indexOf(e) + 1;
        this.items.splice(r, 0, t),
            this.tagIDs.splice(r, 0, n),
            this.stackTop++,
        r === this.stackTop && this._updateCurrentElement(),
            this.handler.onItemPush(this.current, this.currentTagId, r === this.stackTop)
    }
    popUntilTagNamePopped(e) {
        let t = this.stackTop + 1;
        do {
            t = this.tagIDs.lastIndexOf(e, t - 1)
        } while (t > 0 && this.treeAdapter.getNamespaceURI(this.items[t]) !== vo.HTML);
        this.shortenToLength(t < 0 ? 0 : t)
    }
    shortenToLength(e) {
        for (; this.stackTop >= e; ) {
            const t = this.current;
            this.tmplCount > 0 && this._isInTemplate() && (this.tmplCount -= 1),
                this.stackTop--,
                this._updateCurrentElement(),
                this.handler.onItemPop(t, this.stackTop < e)
        }
    }
    popUntilElementPopped(e) {
        const t = this._indexOf(e);
        this.shortenToLength(t < 0 ? 0 : t)
    }
    popUntilPopped(e, t) {
        const n = this._indexOfTagNames(e, t);
        this.shortenToLength(n < 0 ? 0 : n)
    }
    popUntilNumberedHeaderPopped() {
        this.popUntilPopped(sc, vo.HTML)
    }
    popUntilTableCellPopped() {
        this.popUntilPopped(lc, vo.HTML)
    }
    popAllUpToHtmlElement() {
        this.tmplCount = 0,
            this.shortenToLength(1)
    }
    _indexOfTagNames(e, t) {
        for (let n = this.stackTop; n >= 0; n--)
            if (e.includes(this.tagIDs[n]) && this.treeAdapter.getNamespaceURI(this.items[n]) === t)
                return n;
        return -1
    }
    clearBackTo(e, t) {
        const n = this._indexOfTagNames(e, t);
        this.shortenToLength(n + 1)
    }
    clearBackToTableContext() {
        this.clearBackTo(cc, vo.HTML)
    }
    clearBackToTableBodyContext() {
        this.clearBackTo(oc, vo.HTML)
    }
    clearBackToTableRowContext() {
        this.clearBackTo(ac, vo.HTML)
    }
    remove(e) {
        const t = this._indexOf(e);
        t >= 0 && (t === this.stackTop ? this.pop() : (this.items.splice(t, 1),
            this.tagIDs.splice(t, 1),
            this.stackTop--,
            this._updateCurrentElement(),
            this.handler.onItemPop(e, !1)))
    }
    tryPeekProperlyNestedBodyElement() {
        return this.stackTop >= 1 && this.tagIDs[1] === Po.BODY ? this.items[1] : null
    }
    contains(e) {
        return this._indexOf(e) > -1
    }
    getCommonAncestor(e) {
        const t = this._indexOf(e) - 1;
        return t >= 0 ? this.items[t] : null
    }
    isRootHtmlElementCurrent() {
        return 0 === this.stackTop && this.tagIDs[0] === Po.HTML
    }
    hasInScope(e) {
        for (let t = this.stackTop; t >= 0; t--) {
            const n = this.tagIDs[t]
                , r = this.treeAdapter.getNamespaceURI(this.items[t]);
            if (n === e && r === vo.HTML)
                return !0;
            if (ic.get(n) === r)
                return !1
        }
        return !0
    }
    hasNumberedHeaderInScope() {
        for (let e = this.stackTop; e >= 0; e--) {
            const t = this.tagIDs[e]
                , n = this.treeAdapter.getNamespaceURI(this.items[e]);
            if (Go(t) && n === vo.HTML)
                return !0;
            if (ic.get(t) === n)
                return !1
        }
        return !0
    }
    hasInListItemScope(e) {
        for (let t = this.stackTop; t >= 0; t--) {
            const n = this.tagIDs[t]
                , r = this.treeAdapter.getNamespaceURI(this.items[t]);
            if (n === e && r === vo.HTML)
                return !0;
            if ((n === Po.UL || n === Po.OL) && r === vo.HTML || ic.get(n) === r)
                return !1
        }
        return !0
    }
    hasInButtonScope(e) {
        for (let t = this.stackTop; t >= 0; t--) {
            const n = this.tagIDs[t]
                , r = this.treeAdapter.getNamespaceURI(this.items[t]);
            if (n === e && r === vo.HTML)
                return !0;
            if (n === Po.BUTTON && r === vo.HTML || ic.get(n) === r)
                return !1
        }
        return !0
    }
    hasInTableScope(e) {
        for (let t = this.stackTop; t >= 0; t--) {
            const n = this.tagIDs[t];
            if (this.treeAdapter.getNamespaceURI(this.items[t]) === vo.HTML) {
                if (n === e)
                    return !0;
                if (n === Po.TABLE || n === Po.TEMPLATE || n === Po.HTML)
                    return !1
            }
        }
        return !0
    }
    hasTableBodyContextInTableScope() {
        for (let e = this.stackTop; e >= 0; e--) {
            const t = this.tagIDs[e];
            if (this.treeAdapter.getNamespaceURI(this.items[e]) === vo.HTML) {
                if (t === Po.TBODY || t === Po.THEAD || t === Po.TFOOT)
                    return !0;
                if (t === Po.TABLE || t === Po.HTML)
                    return !1
            }
        }
        return !0
    }
    hasInSelectScope(e) {
        for (let t = this.stackTop; t >= 0; t--) {
            const n = this.tagIDs[t];
            if (this.treeAdapter.getNamespaceURI(this.items[t]) === vo.HTML) {
                if (n === e)
                    return !0;
                if (n !== Po.OPTION && n !== Po.OPTGROUP)
                    return !1
            }
        }
        return !0
    }
    generateImpliedEndTags() {
        for (; nc.has(this.currentTagId); )
            this.pop()
    }
    generateImpliedEndTagsThoroughly() {
        for (; rc.has(this.currentTagId); )
            this.pop()
    }
    generateImpliedEndTagsWithExclusion(e) {
        for (; this.currentTagId !== e && rc.has(this.currentTagId); )
            this.pop()
    }
}
var uc;
!function(e) {
    e[e.Marker = 0] = "Marker",
        e[e.Element = 1] = "Element"
}(uc = uc || (uc = {}));
const pc = {
    type: uc.Marker
};
class fc {
    constructor(e) {
        this.treeAdapter = e,
            this.entries = [],
            this.bookmark = null
    }
    _getNoahArkConditionCandidates(e, t) {
        const n = []
            , r = t.length
            , i = this.treeAdapter.getTagName(e)
            , s = this.treeAdapter.getNamespaceURI(e);
        for (let e = 0; e < this.entries.length; e++) {
            const t = this.entries[e];
            if (t.type === uc.Marker)
                break;
            const {element: a} = t;
            if (this.treeAdapter.getTagName(a) === i && this.treeAdapter.getNamespaceURI(a) === s) {
                const t = this.treeAdapter.getAttrList(a);
                t.length === r && n.push({
                    idx: e,
                    attrs: t
                })
            }
        }
        return n
    }
    _ensureNoahArkCondition(e) {
        if (this.entries.length < 3)
            return;
        const t = this.treeAdapter.getAttrList(e)
            , n = this._getNoahArkConditionCandidates(e, t);
        if (n.length < 3)
            return;
        const r = new Map(t.map((e => [e.name, e.value])));
        let i = 0;
        for (let e = 0; e < n.length; e++) {
            const t = n[e];
            t.attrs.every((e => r.get(e.name) === e.value)) && (i += 1,
            i >= 3 && this.entries.splice(t.idx, 1))
        }
    }
    insertMarker() {
        this.entries.unshift(pc)
    }
    pushElement(e, t) {
        this._ensureNoahArkCondition(e),
            this.entries.unshift({
                type: uc.Element,
                element: e,
                token: t
            })
    }
    insertElementAfterBookmark(e, t) {
        const n = this.entries.indexOf(this.bookmark);
        this.entries.splice(n, 0, {
            type: uc.Element,
            element: e,
            token: t
        })
    }
    removeEntry(e) {
        const t = this.entries.indexOf(e);
        t >= 0 && this.entries.splice(t, 1)
    }
    clearToLastMarker() {
        const e = this.entries.indexOf(pc);
        e >= 0 ? this.entries.splice(0, e + 1) : this.entries.length = 0
    }
    getElementEntryInScopeWithTagName(e) {
        const t = this.entries.find((t => t.type === uc.Marker || this.treeAdapter.getTagName(t.element) === e));
        return t && t.type === uc.Element ? t : null
    }
    getElementEntry(e) {
        return this.entries.find((t => t.type === uc.Element && t.element === e))
    }
}
function dc(e) {
    return {
        nodeName: "#text",
        value: e,
        parentNode: null
    }
}
const Ec = {
    createDocument: () => ({
        nodeName: "#document",
        mode: Ro.NO_QUIRKS,
        childNodes: []
    }),
    createDocumentFragment: () => ({
        nodeName: "#document-fragment",
        childNodes: []
    }),
    createElement: (e, t, n) => ({
        nodeName: e,
        tagName: e,
        attrs: n,
        namespaceURI: t,
        childNodes: [],
        parentNode: null
    }),
    createCommentNode: e => ({
        nodeName: "#comment",
        data: e,
        parentNode: null
    }),
    appendChild(e, t) {
        e.childNodes.push(t),
            t.parentNode = e
    },
    insertBefore(e, t, n) {
        const r = e.childNodes.indexOf(n);
        e.childNodes.splice(r, 0, t),
            t.parentNode = e
    },
    setTemplateContent(e, t) {
        e.content = t
    },
    getTemplateContent: e => e.content,
    setDocumentType(e, t, n, r) {
        const i = e.childNodes.find((e => "#documentType" === e.nodeName));
        if (i)
            i.name = t,
                i.publicId = n,
                i.systemId = r;
        else {
            const i = {
                nodeName: "#documentType",
                name: t,
                publicId: n,
                systemId: r,
                parentNode: null
            };
            Ec.appendChild(e, i)
        }
    },
    setDocumentMode(e, t) {
        e.mode = t
    },
    getDocumentMode: e => e.mode,
    detachNode(e) {
        if (e.parentNode) {
            const t = e.parentNode.childNodes.indexOf(e);
            e.parentNode.childNodes.splice(t, 1),
                e.parentNode = null
        }
    },
    insertText(e, t) {
        if (e.childNodes.length > 0) {
            const n = e.childNodes[e.childNodes.length - 1];
            if (Ec.isTextNode(n))
                return void (n.value += t)
        }
        Ec.appendChild(e, dc(t))
    },
    insertTextBefore(e, t, n) {
        const r = e.childNodes[e.childNodes.indexOf(n) - 1];
        r && Ec.isTextNode(r) ? r.value += t : Ec.insertBefore(e, dc(t), n)
    },
    adoptAttributes(e, t) {
        const n = new Set(e.attrs.map((e => e.name)));
        for (let r = 0; r < t.length; r++)
            n.has(t[r].name) || e.attrs.push(t[r])
    },
    getFirstChild: e => e.childNodes[0],
    getChildNodes: e => e.childNodes,
    getParentNode: e => e.parentNode,
    getAttrList: e => e.attrs,
    getTagName: e => e.tagName,
    getNamespaceURI: e => e.namespaceURI,
    getTextNodeContent: e => e.value,
    getCommentNodeContent: e => e.data,
    getDocumentTypeNodeName: e => e.name,
    getDocumentTypeNodePublicId: e => e.publicId,
    getDocumentTypeNodeSystemId: e => e.systemId,
    isTextNode: e => "#text" === e.nodeName,
    isCommentNode: e => "#comment" === e.nodeName,
    isDocumentTypeNode: e => "#documentType" === e.nodeName,
    isElementNode: e => Object.prototype.hasOwnProperty.call(e, "tagName"),
    setNodeSourceCodeLocation(e, t) {
        e.sourceCodeLocation = t
    },
    getNodeSourceCodeLocation: e => e.sourceCodeLocation,
    updateNodeSourceCodeLocation(e, t) {
        e.sourceCodeLocation = {
            ...e.sourceCodeLocation,
            ...t
        }
    }
}
    , mc = ["+//silmaril//dtd html pro v0r11 19970101//", "-//as//dtd html 3.0 aswedit + extensions//", "-//advasoft ltd//dtd html 3.0 aswedit + extensions//", "-//ietf//dtd html 2.0 level 1//", "-//ietf//dtd html 2.0 level 2//", "-//ietf//dtd html 2.0 strict level 1//", "-//ietf//dtd html 2.0 strict level 2//", "-//ietf//dtd html 2.0 strict//", "-//ietf//dtd html 2.0//", "-//ietf//dtd html 2.1e//", "-//ietf//dtd html 3.0//", "-//ietf//dtd html 3.2 final//", "-//ietf//dtd html 3.2//", "-//ietf//dtd html 3//", "-//ietf//dtd html level 0//", "-//ietf//dtd html level 1//", "-//ietf//dtd html level 2//", "-//ietf//dtd html level 3//", "-//ietf//dtd html strict level 0//", "-//ietf//dtd html strict level 1//", "-//ietf//dtd html strict level 2//", "-//ietf//dtd html strict level 3//", "-//ietf//dtd html strict//", "-//ietf//dtd html//", "-//metrius//dtd metrius presentational//", "-//microsoft//dtd internet explorer 2.0 html strict//", "-//microsoft//dtd internet explorer 2.0 html//", "-//microsoft//dtd internet explorer 2.0 tables//", "-//microsoft//dtd internet explorer 3.0 html strict//", "-//microsoft//dtd internet explorer 3.0 html//", "-//microsoft//dtd internet explorer 3.0 tables//", "-//netscape comm. corp.//dtd html//", "-//netscape comm. corp.//dtd strict html//", "-//o'reilly and associates//dtd html 2.0//", "-//o'reilly and associates//dtd html extended 1.0//", "-//o'reilly and associates//dtd html extended relaxed 1.0//", "-//sq//dtd html 2.0 hotmetal + extensions//", "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//", "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//", "-//spyglass//dtd html 2.0 extended//", "-//sun microsystems corp.//dtd hotjava html//", "-//sun microsystems corp.//dtd hotjava strict html//", "-//w3c//dtd html 3 1995-03-24//", "-//w3c//dtd html 3.2 draft//", "-//w3c//dtd html 3.2 final//", "-//w3c//dtd html 3.2//", "-//w3c//dtd html 3.2s draft//", "-//w3c//dtd html 4.0 frameset//", "-//w3c//dtd html 4.0 transitional//", "-//w3c//dtd html experimental 19960712//", "-//w3c//dtd html experimental 970421//", "-//w3c//dtd w3 html//", "-//w3o//dtd w3 html 3.0//", "-//webtechs//dtd mozilla html 2.0//", "-//webtechs//dtd mozilla html//"]
    , Tc = [...mc, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"]
    , _c = new Set(["-//w3o//dtd w3 html strict 3.0//en//", "-/w3c/dtd html 4.0 transitional/en", "html"])
    , Ac = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"]
    , gc = [...Ac, "-//w3c//dtd html 4.01 frameset//", "-//w3c//dtd html 4.01 transitional//"];
function Nc(e, t) {
    return t.some((t => e.startsWith(t)))
}
const Cc = "text/html"
    , Ic = "application/xhtml+xml"
    , Sc = new Map(["attributeName", "attributeType", "baseFrequency", "baseProfile", "calcMode", "clipPathUnits", "diffuseConstant", "edgeMode", "filterUnits", "glyphRef", "gradientTransform", "gradientUnits", "kernelMatrix", "kernelUnitLength", "keyPoints", "keySplines", "keyTimes", "lengthAdjust", "limitingConeAngle", "markerHeight", "markerUnits", "markerWidth", "maskContentUnits", "maskUnits", "numOctaves", "pathLength", "patternContentUnits", "patternTransform", "patternUnits", "pointsAtX", "pointsAtY", "pointsAtZ", "preserveAlpha", "preserveAspectRatio", "primitiveUnits", "refX", "refY", "repeatCount", "repeatDur", "requiredExtensions", "requiredFeatures", "specularConstant", "specularExponent", "spreadMethod", "startOffset", "stdDeviation", "stitchTiles", "surfaceScale", "systemLanguage", "tableValues", "targetX", "targetY", "textLength", "viewBox", "viewTarget", "xChannelSelector", "yChannelSelector", "zoomAndPan"].map((e => [e.toLowerCase(), e])))
    , bc = new Map([["xlink:actuate", {
    prefix: "xlink",
    name: "actuate",
    namespace: vo.XLINK
}], ["xlink:arcrole", {
    prefix: "xlink",
    name: "arcrole",
    namespace: vo.XLINK
}], ["xlink:href", {
    prefix: "xlink",
    name: "href",
    namespace: vo.XLINK
}], ["xlink:role", {
    prefix: "xlink",
    name: "role",
    namespace: vo.XLINK
}], ["xlink:show", {
    prefix: "xlink",
    name: "show",
    namespace: vo.XLINK
}], ["xlink:title", {
    prefix: "xlink",
    name: "title",
    namespace: vo.XLINK
}], ["xlink:type", {
    prefix: "xlink",
    name: "type",
    namespace: vo.XLINK
}], ["xml:base", {
    prefix: "xml",
    name: "base",
    namespace: vo.XML
}], ["xml:lang", {
    prefix: "xml",
    name: "lang",
    namespace: vo.XML
}], ["xml:space", {
    prefix: "xml",
    name: "space",
    namespace: vo.XML
}], ["xmlns", {
    prefix: "",
    name: "xmlns",
    namespace: vo.XMLNS
}], ["xmlns:xlink", {
    prefix: "xmlns",
    name: "xlink",
    namespace: vo.XMLNS
}]])
    , Oc = new Map(["altGlyph", "altGlyphDef", "altGlyphItem", "animateColor", "animateMotion", "animateTransform", "clipPath", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "foreignObject", "glyphRef", "linearGradient", "radialGradient", "textPath"].map((e => [e.toLowerCase(), e])))
    , yc = new Set([Po.B, Po.BIG, Po.BLOCKQUOTE, Po.BODY, Po.BR, Po.CENTER, Po.CODE, Po.DD, Po.DIV, Po.DL, Po.DT, Po.EM, Po.EMBED, Po.H1, Po.H2, Po.H3, Po.H4, Po.H5, Po.H6, Po.HEAD, Po.HR, Po.I, Po.IMG, Po.LI, Po.LISTING, Po.MENU, Po.META, Po.NOBR, Po.OL, Po.P, Po.PRE, Po.RUBY, Po.S, Po.SMALL, Po.SPAN, Po.STRONG, Po.STRIKE, Po.SUB, Po.SUP, Po.TABLE, Po.TT, Po.U, Po.UL, Po.VAR]);
function Lc(e) {
    for (let t = 0; t < e.attrs.length; t++)
        if ("definitionurl" === e.attrs[t].name) {
            e.attrs[t].name = "definitionURL";
            break
        }
}
function kc(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        const n = Sc.get(e.attrs[t].name);
        null != n && (e.attrs[t].name = n)
    }
}
function vc(e) {
    for (let t = 0; t < e.attrs.length; t++) {
        const n = bc.get(e.attrs[t].name);
        n && (e.attrs[t].prefix = n.prefix,
            e.attrs[t].name = n.name,
            e.attrs[t].namespace = n.namespace)
    }
}
function Dc(e, t, n, r) {
    return (!r || r === vo.HTML) && function(e, t, n) {
        if (t === vo.MATHML && e === Po.ANNOTATION_XML)
            for (let e = 0; e < n.length; e++)
                if (n[e].name === Do.ENCODING) {
                    const t = n[e].value.toLowerCase();
                    return t === Cc || t === Ic
                }
        return t === vo.SVG && (e === Po.FOREIGN_OBJECT || e === Po.DESC || e === Po.TITLE)
    }(e, t, n) || (!r || r === vo.MATHML) && function(e, t) {
        return t === vo.MATHML && (e === Po.MI || e === Po.MO || e === Po.MN || e === Po.MS || e === Po.MTEXT)
    }(e, t)
}
var Rc;
!function(e) {
    e[e.INITIAL = 0] = "INITIAL",
        e[e.BEFORE_HTML = 1] = "BEFORE_HTML",
        e[e.BEFORE_HEAD = 2] = "BEFORE_HEAD",
        e[e.IN_HEAD = 3] = "IN_HEAD",
        e[e.IN_HEAD_NO_SCRIPT = 4] = "IN_HEAD_NO_SCRIPT",
        e[e.AFTER_HEAD = 5] = "AFTER_HEAD",
        e[e.IN_BODY = 6] = "IN_BODY",
        e[e.TEXT = 7] = "TEXT",
        e[e.IN_TABLE = 8] = "IN_TABLE",
        e[e.IN_TABLE_TEXT = 9] = "IN_TABLE_TEXT",
        e[e.IN_CAPTION = 10] = "IN_CAPTION",
        e[e.IN_COLUMN_GROUP = 11] = "IN_COLUMN_GROUP",
        e[e.IN_TABLE_BODY = 12] = "IN_TABLE_BODY",
        e[e.IN_ROW = 13] = "IN_ROW",
        e[e.IN_CELL = 14] = "IN_CELL",
        e[e.IN_SELECT = 15] = "IN_SELECT",
        e[e.IN_SELECT_IN_TABLE = 16] = "IN_SELECT_IN_TABLE",
        e[e.IN_TEMPLATE = 17] = "IN_TEMPLATE",
        e[e.AFTER_BODY = 18] = "AFTER_BODY",
        e[e.IN_FRAMESET = 19] = "IN_FRAMESET",
        e[e.AFTER_FRAMESET = 20] = "AFTER_FRAMESET",
        e[e.AFTER_AFTER_BODY = 21] = "AFTER_AFTER_BODY",
        e[e.AFTER_AFTER_FRAMESET = 22] = "AFTER_AFTER_FRAMESET"
}(Rc || (Rc = {}));
const Mc = {
    startLine: -1,
    startCol: -1,
    startOffset: -1,
    endLine: -1,
    endCol: -1,
    endOffset: -1
}
    , Pc = new Set([Po.TABLE, Po.TBODY, Po.TFOOT, Po.THEAD, Po.TR])
    , xc = {
    scriptingEnabled: !0,
    sourceCodeLocationInfo: !1,
    treeAdapter: Ec,
    onParseError: null
};
class wc {
    constructor(e, t, n=null, r=null) {
        this.fragmentContext = n,
            this.scriptHandler = r,
            this.currentToken = null,
            this.stopped = !1,
            this.insertionMode = Rc.INITIAL,
            this.originalInsertionMode = Rc.INITIAL,
            this.headElement = null,
            this.formElement = null,
            this.currentNotInHTML = !1,
            this.tmplInsertionModeStack = [],
            this.pendingCharacterTokens = [],
            this.hasNonWhitespacePendingCharacterToken = !1,
            this.framesetOk = !0,
            this.skipNextNewLine = !1,
            this.fosterParentingEnabled = !1,
            this.options = {
                ...xc,
                ...e
            },
            this.treeAdapter = this.options.treeAdapter,
            this.onParseError = this.options.onParseError,
        this.onParseError && (this.options.sourceCodeLocationInfo = !0),
            this.document = null != t ? t : this.treeAdapter.createDocument(),
            this.tokenizer = new tc(this.options,this),
            this.activeFormattingElements = new fc(this.treeAdapter),
            this.fragmentContextID = n ? Fo(this.treeAdapter.getTagName(n)) : Po.UNKNOWN,
            this._setContextModes(null != n ? n : this.document, this.fragmentContextID),
            this.openElements = new hc(this.document,this.treeAdapter,this)
    }
    static parse(e, t) {
        const n = new this(t);
        return n.tokenizer.write(e, !0),
            n.document
    }
    static getFragmentParser(e, t) {
        const n = {
            ...xc,
            ...t
        };
        null != e || (e = n.treeAdapter.createElement(Mo.TEMPLATE, vo.HTML, []));
        const r = n.treeAdapter.createElement("documentmock", vo.HTML, [])
            , i = new this(n,r,e);
        return i.fragmentContextID === Po.TEMPLATE && i.tmplInsertionModeStack.unshift(Rc.IN_TEMPLATE),
            i._initTokenizerForFragmentParsing(),
            i._insertFakeRootElement(),
            i._resetInsertionMode(),
            i._findFormInFragmentContext(),
            i
    }
    getFragment() {
        const e = this.treeAdapter.getFirstChild(this.document)
            , t = this.treeAdapter.createDocumentFragment();
        return this._adoptNodes(e, t),
            t
    }
    _err(e, t, n) {
        var r;
        if (!this.onParseError)
            return;
        const i = null !== (r = e.location) && void 0 !== r ? r : Mc
            , s = {
            code: t,
            startLine: i.startLine,
            startCol: i.startCol,
            startOffset: i.startOffset,
            endLine: n ? i.startLine : i.endLine,
            endCol: n ? i.startCol : i.endCol,
            endOffset: n ? i.startOffset : i.endOffset
        };
        this.onParseError(s)
    }
    onItemPush(e, t, n) {
        var r, i;
        null === (i = (r = this.treeAdapter).onItemPush) || void 0 === i || i.call(r, e),
        n && this.openElements.stackTop > 0 && this._setContextModes(e, t)
    }
    onItemPop(e, t) {
        var n, r;
        if (this.options.sourceCodeLocationInfo && this._setEndLocation(e, this.currentToken),
        null === (r = (n = this.treeAdapter).onItemPop) || void 0 === r || r.call(n, e, this.openElements.current),
            t) {
            let e, t;
            0 === this.openElements.stackTop && this.fragmentContext ? (e = this.fragmentContext,
                t = this.fragmentContextID) : ({current: e, currentTagId: t} = this.openElements),
                this._setContextModes(e, t)
        }
    }
    _setContextModes(e, t) {
        const n = e === this.document || this.treeAdapter.getNamespaceURI(e) === vo.HTML;
        this.currentNotInHTML = !n,
            this.tokenizer.inForeignNode = !n && !this._isIntegrationPoint(t, e)
    }
    _switchToTextParsing(e, t) {
        this._insertElement(e, vo.HTML),
            this.tokenizer.state = t,
            this.originalInsertionMode = this.insertionMode,
            this.insertionMode = Rc.TEXT
    }
    switchToPlaintextParsing() {
        this.insertionMode = Rc.TEXT,
            this.originalInsertionMode = Rc.IN_BODY,
            this.tokenizer.state = jo.PLAINTEXT
    }
    _getAdjustedCurrentElement() {
        return 0 === this.openElements.stackTop && this.fragmentContext ? this.fragmentContext : this.openElements.current
    }
    _findFormInFragmentContext() {
        let e = this.fragmentContext;
        for (; e; ) {
            if (this.treeAdapter.getTagName(e) === Mo.FORM) {
                this.formElement = e;
                break
            }
            e = this.treeAdapter.getParentNode(e)
        }
    }
    _initTokenizerForFragmentParsing() {
        if (this.fragmentContext && this.treeAdapter.getNamespaceURI(this.fragmentContext) === vo.HTML)
            switch (this.fragmentContextID) {
                case Po.TITLE:
                case Po.TEXTAREA:
                    this.tokenizer.state = jo.RCDATA;
                    break;
                case Po.STYLE:
                case Po.XMP:
                case Po.IFRAME:
                case Po.NOEMBED:
                case Po.NOFRAMES:
                case Po.NOSCRIPT:
                    this.tokenizer.state = jo.RAWTEXT;
                    break;
                case Po.SCRIPT:
                    this.tokenizer.state = jo.SCRIPT_DATA;
                    break;
                case Po.PLAINTEXT:
                    this.tokenizer.state = jo.PLAINTEXT
            }
    }
    _setDocumentType(e) {
        const t = e.name || ""
            , n = e.publicId || ""
            , r = e.systemId || "";
        if (this.treeAdapter.setDocumentType(this.document, t, n, r),
            e.location) {
            const t = this.treeAdapter.getChildNodes(this.document).find((e => this.treeAdapter.isDocumentTypeNode(e)));
            t && this.treeAdapter.setNodeSourceCodeLocation(t, e.location)
        }
    }
    _attachElementToTree(e, t) {
        if (this.options.sourceCodeLocationInfo) {
            const n = t && {
                ...t,
                startTag: t
            };
            this.treeAdapter.setNodeSourceCodeLocation(e, n)
        }
        if (this._shouldFosterParentOnInsertion())
            this._fosterParentElement(e);
        else {
            const t = this.openElements.currentTmplContentOrNode;
            this.treeAdapter.appendChild(t, e)
        }
    }
    _appendElement(e, t) {
        const n = this.treeAdapter.createElement(e.tagName, t, e.attrs);
        this._attachElementToTree(n, e.location)
    }
    _insertElement(e, t) {
        const n = this.treeAdapter.createElement(e.tagName, t, e.attrs);
        this._attachElementToTree(n, e.location),
            this.openElements.push(n, e.tagID)
    }
    _insertFakeElement(e, t) {
        const n = this.treeAdapter.createElement(e, vo.HTML, []);
        this._attachElementToTree(n, null),
            this.openElements.push(n, t)
    }
    _insertTemplate(e) {
        const t = this.treeAdapter.createElement(e.tagName, vo.HTML, e.attrs)
            , n = this.treeAdapter.createDocumentFragment();
        this.treeAdapter.setTemplateContent(t, n),
            this._attachElementToTree(t, e.location),
            this.openElements.push(t, e.tagID),
        this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, null)
    }
    _insertFakeRootElement() {
        const e = this.treeAdapter.createElement(Mo.HTML, vo.HTML, []);
        this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(e, null),
            this.treeAdapter.appendChild(this.openElements.current, e),
            this.openElements.push(e, Po.HTML)
    }
    _appendCommentNode(e, t) {
        const n = this.treeAdapter.createCommentNode(e.data);
        this.treeAdapter.appendChild(t, n),
        this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(n, e.location)
    }
    _insertCharacters(e) {
        let t, n;
        if (this._shouldFosterParentOnInsertion() ? (({parent: t, beforeElement: n} = this._findFosterParentingLocation()),
            n ? this.treeAdapter.insertTextBefore(t, e.chars, n) : this.treeAdapter.insertText(t, e.chars)) : (t = this.openElements.currentTmplContentOrNode,
            this.treeAdapter.insertText(t, e.chars)),
            !e.location)
            return;
        const r = this.treeAdapter.getChildNodes(t)
            , i = n ? r.lastIndexOf(n) : r.length
            , s = r[i - 1];
        if (this.treeAdapter.getNodeSourceCodeLocation(s)) {
            const {endLine: t, endCol: n, endOffset: r} = e.location;
            this.treeAdapter.updateNodeSourceCodeLocation(s, {
                endLine: t,
                endCol: n,
                endOffset: r
            })
        } else
            this.options.sourceCodeLocationInfo && this.treeAdapter.setNodeSourceCodeLocation(s, e.location)
    }
    _adoptNodes(e, t) {
        for (let n = this.treeAdapter.getFirstChild(e); n; n = this.treeAdapter.getFirstChild(e))
            this.treeAdapter.detachNode(n),
                this.treeAdapter.appendChild(t, n)
    }
    _setEndLocation(e, t) {
        if (this.treeAdapter.getNodeSourceCodeLocation(e) && t.location) {
            const n = t.location
                , r = this.treeAdapter.getTagName(e)
                , i = t.type === To.END_TAG && r === t.tagName ? {
                endTag: {
                    ...n
                },
                endLine: n.endLine,
                endCol: n.endCol,
                endOffset: n.endOffset
            } : {
                endLine: n.startLine,
                endCol: n.startCol,
                endOffset: n.startOffset
            };
            this.treeAdapter.updateNodeSourceCodeLocation(e, i)
        }
    }
    shouldProcessStartTagTokenInForeignContent(e) {
        if (!this.currentNotInHTML)
            return !1;
        let t, n;
        return 0 === this.openElements.stackTop && this.fragmentContext ? (t = this.fragmentContext,
            n = this.fragmentContextID) : ({current: t, currentTagId: n} = this.openElements),
        (e.tagID !== Po.SVG || this.treeAdapter.getTagName(t) !== Mo.ANNOTATION_XML || this.treeAdapter.getNamespaceURI(t) !== vo.MATHML) && (this.tokenizer.inForeignNode || (e.tagID === Po.MGLYPH || e.tagID === Po.MALIGNMARK) && !this._isIntegrationPoint(n, t, vo.HTML))
    }
    _processToken(e) {
        switch (e.type) {
            case To.CHARACTER:
                this.onCharacter(e);
                break;
            case To.NULL_CHARACTER:
                this.onNullCharacter(e);
                break;
            case To.COMMENT:
                this.onComment(e);
                break;
            case To.DOCTYPE:
                this.onDoctype(e);
                break;
            case To.START_TAG:
                this._processStartTag(e);
                break;
            case To.END_TAG:
                this.onEndTag(e);
                break;
            case To.EOF:
                this.onEof(e);
                break;
            case To.WHITESPACE_CHARACTER:
                this.onWhitespaceCharacter(e)
        }
    }
    _isIntegrationPoint(e, t, n) {
        return Dc(e, this.treeAdapter.getNamespaceURI(t), this.treeAdapter.getAttrList(t), n)
    }
    _reconstructActiveFormattingElements() {
        const e = this.activeFormattingElements.entries.length;
        if (e) {
            const t = this.activeFormattingElements.entries.findIndex((e => e.type === uc.Marker || this.openElements.contains(e.element)));
            for (let n = t < 0 ? e - 1 : t - 1; n >= 0; n--) {
                const e = this.activeFormattingElements.entries[n];
                this._insertElement(e.token, this.treeAdapter.getNamespaceURI(e.element)),
                    e.element = this.openElements.current
            }
        }
    }
    _closeTableCell() {
        this.openElements.generateImpliedEndTags(),
            this.openElements.popUntilTableCellPopped(),
            this.activeFormattingElements.clearToLastMarker(),
            this.insertionMode = Rc.IN_ROW
    }
    _closePElement() {
        this.openElements.generateImpliedEndTagsWithExclusion(Po.P),
            this.openElements.popUntilTagNamePopped(Po.P)
    }
    _resetInsertionMode() {
        for (let e = this.openElements.stackTop; e >= 0; e--)
            switch (0 === e && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[e]) {
                case Po.TR:
                    return void (this.insertionMode = Rc.IN_ROW);
                case Po.TBODY:
                case Po.THEAD:
                case Po.TFOOT:
                    return void (this.insertionMode = Rc.IN_TABLE_BODY);
                case Po.CAPTION:
                    return void (this.insertionMode = Rc.IN_CAPTION);
                case Po.COLGROUP:
                    return void (this.insertionMode = Rc.IN_COLUMN_GROUP);
                case Po.TABLE:
                    return void (this.insertionMode = Rc.IN_TABLE);
                case Po.BODY:
                    return void (this.insertionMode = Rc.IN_BODY);
                case Po.FRAMESET:
                    return void (this.insertionMode = Rc.IN_FRAMESET);
                case Po.SELECT:
                    return void this._resetInsertionModeForSelect(e);
                case Po.TEMPLATE:
                    return void (this.insertionMode = this.tmplInsertionModeStack[0]);
                case Po.HTML:
                    return void (this.insertionMode = this.headElement ? Rc.AFTER_HEAD : Rc.BEFORE_HEAD);
                case Po.TD:
                case Po.TH:
                    if (e > 0)
                        return void (this.insertionMode = Rc.IN_CELL);
                    break;
                case Po.HEAD:
                    if (e > 0)
                        return void (this.insertionMode = Rc.IN_HEAD)
            }
        this.insertionMode = Rc.IN_BODY
    }
    _resetInsertionModeForSelect(e) {
        if (e > 0)
            for (let t = e - 1; t > 0; t--) {
                const e = this.openElements.tagIDs[t];
                if (e === Po.TEMPLATE)
                    break;
                if (e === Po.TABLE)
                    return void (this.insertionMode = Rc.IN_SELECT_IN_TABLE)
            }
        this.insertionMode = Rc.IN_SELECT
    }
    _isElementCausesFosterParenting(e) {
        return Pc.has(e)
    }
    _shouldFosterParentOnInsertion() {
        return this.fosterParentingEnabled && this._isElementCausesFosterParenting(this.openElements.currentTagId)
    }
    _findFosterParentingLocation() {
        for (let e = this.openElements.stackTop; e >= 0; e--) {
            const t = this.openElements.items[e];
            switch (this.openElements.tagIDs[e]) {
                case Po.TEMPLATE:
                    if (this.treeAdapter.getNamespaceURI(t) === vo.HTML)
                        return {
                            parent: this.treeAdapter.getTemplateContent(t),
                            beforeElement: null
                        };
                    break;
                case Po.TABLE:
                {
                    const n = this.treeAdapter.getParentNode(t);
                    return n ? {
                        parent: n,
                        beforeElement: t
                    } : {
                        parent: this.openElements.items[e - 1],
                        beforeElement: null
                    }
                }
            }
        }
        return {
            parent: this.openElements.items[0],
            beforeElement: null
        }
    }
    _fosterParentElement(e) {
        const t = this._findFosterParentingLocation();
        t.beforeElement ? this.treeAdapter.insertBefore(t.parent, e, t.beforeElement) : this.treeAdapter.appendChild(t.parent, e)
    }
    _isSpecialElement(e, t) {
        const n = this.treeAdapter.getNamespaceURI(e);
        return Ho[n].has(t)
    }
    onCharacter(e) {
        if (this.skipNextNewLine = !1,
            this.tokenizer.inForeignNode)
            !function(e, t) {
                e._insertCharacters(t),
                    e.framesetOk = !1
            }(this, e);
        else
            switch (this.insertionMode) {
                case Rc.INITIAL:
                    Vc(this, e);
                    break;
                case Rc.BEFORE_HTML:
                    Wc(this, e);
                    break;
                case Rc.BEFORE_HEAD:
                    Qc(this, e);
                    break;
                case Rc.IN_HEAD:
                    zc(this, e);
                    break;
                case Rc.IN_HEAD_NO_SCRIPT:
                    Jc(this, e);
                    break;
                case Rc.AFTER_HEAD:
                    Zc(this, e);
                    break;
                case Rc.IN_BODY:
                case Rc.IN_CAPTION:
                case Rc.IN_CELL:
                case Rc.IN_TEMPLATE:
                    nl(this, e);
                    break;
                case Rc.TEXT:
                case Rc.IN_SELECT:
                case Rc.IN_SELECT_IN_TABLE:
                    this._insertCharacters(e);
                    break;
                case Rc.IN_TABLE:
                case Rc.IN_TABLE_BODY:
                case Rc.IN_ROW:
                    ul(this, e);
                    break;
                case Rc.IN_TABLE_TEXT:
                    ml(this, e);
                    break;
                case Rc.IN_COLUMN_GROUP:
                    gl(this, e);
                    break;
                case Rc.AFTER_BODY:
                    kl(this, e);
                    break;
                case Rc.AFTER_AFTER_BODY:
                    vl(this, e)
            }
    }
    onNullCharacter(e) {
        if (this.skipNextNewLine = !1,
            this.tokenizer.inForeignNode)
            !function(e, t) {
                t.chars = "�",
                    e._insertCharacters(t)
            }(this, e);
        else
            switch (this.insertionMode) {
                case Rc.INITIAL:
                    Vc(this, e);
                    break;
                case Rc.BEFORE_HTML:
                    Wc(this, e);
                    break;
                case Rc.BEFORE_HEAD:
                    Qc(this, e);
                    break;
                case Rc.IN_HEAD:
                    zc(this, e);
                    break;
                case Rc.IN_HEAD_NO_SCRIPT:
                    Jc(this, e);
                    break;
                case Rc.AFTER_HEAD:
                    Zc(this, e);
                    break;
                case Rc.TEXT:
                    this._insertCharacters(e);
                    break;
                case Rc.IN_TABLE:
                case Rc.IN_TABLE_BODY:
                case Rc.IN_ROW:
                    ul(this, e);
                    break;
                case Rc.IN_COLUMN_GROUP:
                    gl(this, e);
                    break;
                case Rc.AFTER_BODY:
                    kl(this, e);
                    break;
                case Rc.AFTER_AFTER_BODY:
                    vl(this, e)
            }
    }
    onComment(e) {
        if (this.skipNextNewLine = !1,
            this.currentNotInHTML)
            Kc(this, e);
        else
            switch (this.insertionMode) {
                case Rc.INITIAL:
                case Rc.BEFORE_HTML:
                case Rc.BEFORE_HEAD:
                case Rc.IN_HEAD:
                case Rc.IN_HEAD_NO_SCRIPT:
                case Rc.AFTER_HEAD:
                case Rc.IN_BODY:
                case Rc.IN_TABLE:
                case Rc.IN_CAPTION:
                case Rc.IN_COLUMN_GROUP:
                case Rc.IN_TABLE_BODY:
                case Rc.IN_ROW:
                case Rc.IN_CELL:
                case Rc.IN_SELECT:
                case Rc.IN_SELECT_IN_TABLE:
                case Rc.IN_TEMPLATE:
                case Rc.IN_FRAMESET:
                case Rc.AFTER_FRAMESET:
                    Kc(this, e);
                    break;
                case Rc.IN_TABLE_TEXT:
                    Tl(this, e);
                    break;
                case Rc.AFTER_BODY:
                    !function(e, t) {
                        e._appendCommentNode(t, e.openElements.items[0])
                    }(this, e);
                    break;
                case Rc.AFTER_AFTER_BODY:
                case Rc.AFTER_AFTER_FRAMESET:
                    !function(e, t) {
                        e._appendCommentNode(t, e.document)
                    }(this, e)
            }
    }
    onDoctype(e) {
        switch (this.skipNextNewLine = !1,
            this.insertionMode) {
            case Rc.INITIAL:
                !function(e, t) {
                    e._setDocumentType(t);
                    const n = t.forceQuirks ? Ro.QUIRKS : function(e) {
                        if ("html" !== e.name)
                            return Ro.QUIRKS;
                        const {systemId: t} = e;
                        if (t && "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd" === t.toLowerCase())
                            return Ro.QUIRKS;
                        let {publicId: n} = e;
                        if (null !== n) {
                            if (n = n.toLowerCase(),
                                _c.has(n))
                                return Ro.QUIRKS;
                            let e = null === t ? Tc : mc;
                            if (Nc(n, e))
                                return Ro.QUIRKS;
                            if (e = null === t ? Ac : gc,
                                Nc(n, e))
                                return Ro.LIMITED_QUIRKS
                        }
                        return Ro.NO_QUIRKS
                    }(t);
                    (function(e) {
                            return "html" === e.name && null === e.publicId && (null === e.systemId || "about:legacy-compat" === e.systemId)
                        }
                    )(t) || e._err(t, Eo.nonConformingDoctype);
                    e.treeAdapter.setDocumentMode(e.document, n),
                        e.insertionMode = Rc.BEFORE_HTML
                }(this, e);
                break;
            case Rc.BEFORE_HEAD:
            case Rc.IN_HEAD:
            case Rc.IN_HEAD_NO_SCRIPT:
            case Rc.AFTER_HEAD:
                this._err(e, Eo.misplacedDoctype);
                break;
            case Rc.IN_TABLE_TEXT:
                Tl(this, e)
        }
    }
    onStartTag(e) {
        this.skipNextNewLine = !1,
            this.currentToken = e,
            this._processStartTag(e),
        e.selfClosing && !e.ackSelfClosing && this._err(e, Eo.nonVoidHtmlElementStartTagWithTrailingSolidus)
    }
    _processStartTag(e) {
        this.shouldProcessStartTagTokenInForeignContent(e) ? function(e, t) {
            if (function(e) {
                const t = e.tagID;
                return t === Po.FONT && e.attrs.some(( ({name: e}) => e === Do.COLOR || e === Do.SIZE || e === Do.FACE)) || yc.has(t)
            }(t))
                Dl(e),
                    e._startTagOutsideForeignContent(t);
            else {
                const n = e._getAdjustedCurrentElement()
                    , r = e.treeAdapter.getNamespaceURI(n);
                r === vo.MATHML ? Lc(t) : r === vo.SVG && (!function(e) {
                    const t = Oc.get(e.tagName);
                    null != t && (e.tagName = t,
                        e.tagID = Fo(e.tagName))
                }(t),
                    kc(t)),
                    vc(t),
                    t.selfClosing ? e._appendElement(t, r) : e._insertElement(t, r),
                    t.ackSelfClosing = !0
            }
        }(this, e) : this._startTagOutsideForeignContent(e)
    }
    _startTagOutsideForeignContent(e) {
        switch (this.insertionMode) {
            case Rc.INITIAL:
                Vc(this, e);
                break;
            case Rc.BEFORE_HTML:
                !function(e, t) {
                    t.tagID === Po.HTML ? (e._insertElement(t, vo.HTML),
                        e.insertionMode = Rc.BEFORE_HEAD) : Wc(e, t)
                }(this, e);
                break;
            case Rc.BEFORE_HEAD:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.HEAD:
                            e._insertElement(t, vo.HTML),
                                e.headElement = e.openElements.current,
                                e.insertionMode = Rc.IN_HEAD;
                            break;
                        default:
                            Qc(e, t)
                    }
                }(this, e);
                break;
            case Rc.IN_HEAD:
                Xc(this, e);
                break;
            case Rc.IN_HEAD_NO_SCRIPT:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.BASEFONT:
                        case Po.BGSOUND:
                        case Po.HEAD:
                        case Po.LINK:
                        case Po.META:
                        case Po.NOFRAMES:
                        case Po.STYLE:
                            Xc(e, t);
                            break;
                        case Po.NOSCRIPT:
                            e._err(t, Eo.nestedNoscriptInHead);
                            break;
                        default:
                            Jc(e, t)
                    }
                }(this, e);
                break;
            case Rc.AFTER_HEAD:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.BODY:
                            e._insertElement(t, vo.HTML),
                                e.framesetOk = !1,
                                e.insertionMode = Rc.IN_BODY;
                            break;
                        case Po.FRAMESET:
                            e._insertElement(t, vo.HTML),
                                e.insertionMode = Rc.IN_FRAMESET;
                            break;
                        case Po.BASE:
                        case Po.BASEFONT:
                        case Po.BGSOUND:
                        case Po.LINK:
                        case Po.META:
                        case Po.NOFRAMES:
                        case Po.SCRIPT:
                        case Po.STYLE:
                        case Po.TEMPLATE:
                        case Po.TITLE:
                            e._err(t, Eo.abandonedHeadElementChild),
                                e.openElements.push(e.headElement, Po.HEAD),
                                Xc(e, t),
                                e.openElements.remove(e.headElement);
                            break;
                        case Po.HEAD:
                            e._err(t, Eo.misplacedStartTagForHeadElement);
                            break;
                        default:
                            Zc(e, t)
                    }
                }(this, e);
                break;
            case Rc.IN_BODY:
                ol(this, e);
                break;
            case Rc.IN_TABLE:
                pl(this, e);
                break;
            case Rc.IN_TABLE_TEXT:
                Tl(this, e);
                break;
            case Rc.IN_CAPTION:
                !function(e, t) {
                    const n = t.tagID;
                    _l.has(n) ? e.openElements.hasInTableScope(Po.CAPTION) && (e.openElements.generateImpliedEndTags(),
                        e.openElements.popUntilTagNamePopped(Po.CAPTION),
                        e.activeFormattingElements.clearToLastMarker(),
                        e.insertionMode = Rc.IN_TABLE,
                        pl(e, t)) : ol(e, t)
                }(this, e);
                break;
            case Rc.IN_COLUMN_GROUP:
                Al(this, e);
                break;
            case Rc.IN_TABLE_BODY:
                Nl(this, e);
                break;
            case Rc.IN_ROW:
                Il(this, e);
                break;
            case Rc.IN_CELL:
                !function(e, t) {
                    const n = t.tagID;
                    _l.has(n) ? (e.openElements.hasInTableScope(Po.TD) || e.openElements.hasInTableScope(Po.TH)) && (e._closeTableCell(),
                        Il(e, t)) : ol(e, t)
                }(this, e);
                break;
            case Rc.IN_SELECT:
                bl(this, e);
                break;
            case Rc.IN_SELECT_IN_TABLE:
                !function(e, t) {
                    const n = t.tagID;
                    n === Po.CAPTION || n === Po.TABLE || n === Po.TBODY || n === Po.TFOOT || n === Po.THEAD || n === Po.TR || n === Po.TD || n === Po.TH ? (e.openElements.popUntilTagNamePopped(Po.SELECT),
                        e._resetInsertionMode(),
                        e._processStartTag(t)) : bl(e, t)
                }(this, e);
                break;
            case Rc.IN_TEMPLATE:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.BASE:
                        case Po.BASEFONT:
                        case Po.BGSOUND:
                        case Po.LINK:
                        case Po.META:
                        case Po.NOFRAMES:
                        case Po.SCRIPT:
                        case Po.STYLE:
                        case Po.TEMPLATE:
                        case Po.TITLE:
                            Xc(e, t);
                            break;
                        case Po.CAPTION:
                        case Po.COLGROUP:
                        case Po.TBODY:
                        case Po.TFOOT:
                        case Po.THEAD:
                            e.tmplInsertionModeStack[0] = Rc.IN_TABLE,
                                e.insertionMode = Rc.IN_TABLE,
                                pl(e, t);
                            break;
                        case Po.COL:
                            e.tmplInsertionModeStack[0] = Rc.IN_COLUMN_GROUP,
                                e.insertionMode = Rc.IN_COLUMN_GROUP,
                                Al(e, t);
                            break;
                        case Po.TR:
                            e.tmplInsertionModeStack[0] = Rc.IN_TABLE_BODY,
                                e.insertionMode = Rc.IN_TABLE_BODY,
                                Nl(e, t);
                            break;
                        case Po.TD:
                        case Po.TH:
                            e.tmplInsertionModeStack[0] = Rc.IN_ROW,
                                e.insertionMode = Rc.IN_ROW,
                                Il(e, t);
                            break;
                        default:
                            e.tmplInsertionModeStack[0] = Rc.IN_BODY,
                                e.insertionMode = Rc.IN_BODY,
                                ol(e, t)
                    }
                }(this, e);
                break;
            case Rc.AFTER_BODY:
                !function(e, t) {
                    t.tagID === Po.HTML ? ol(e, t) : kl(e, t)
                }(this, e);
                break;
            case Rc.IN_FRAMESET:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.FRAMESET:
                            e._insertElement(t, vo.HTML);
                            break;
                        case Po.FRAME:
                            e._appendElement(t, vo.HTML),
                                t.ackSelfClosing = !0;
                            break;
                        case Po.NOFRAMES:
                            Xc(e, t)
                    }
                }(this, e);
                break;
            case Rc.AFTER_FRAMESET:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.NOFRAMES:
                            Xc(e, t)
                    }
                }(this, e);
                break;
            case Rc.AFTER_AFTER_BODY:
                !function(e, t) {
                    t.tagID === Po.HTML ? ol(e, t) : vl(e, t)
                }(this, e);
                break;
            case Rc.AFTER_AFTER_FRAMESET:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HTML:
                            ol(e, t);
                            break;
                        case Po.NOFRAMES:
                            Xc(e, t)
                    }
                }(this, e)
        }
    }
    onEndTag(e) {
        this.skipNextNewLine = !1,
            this.currentToken = e,
            this.currentNotInHTML ? function(e, t) {
                if (t.tagID === Po.P || t.tagID === Po.BR)
                    return Dl(e),
                        void e._endTagOutsideForeignContent(t);
                for (let n = e.openElements.stackTop; n > 0; n--) {
                    const r = e.openElements.items[n];
                    if (e.treeAdapter.getNamespaceURI(r) === vo.HTML) {
                        e._endTagOutsideForeignContent(t);
                        break
                    }
                    const i = e.treeAdapter.getTagName(r);
                    if (i.toLowerCase() === t.tagName) {
                        t.tagName = i,
                            e.openElements.shortenToLength(n);
                        break
                    }
                }
            }(this, e) : this._endTagOutsideForeignContent(e)
    }
    _endTagOutsideForeignContent(e) {
        switch (this.insertionMode) {
            case Rc.INITIAL:
                Vc(this, e);
                break;
            case Rc.BEFORE_HTML:
                !function(e, t) {
                    const n = t.tagID;
                    n !== Po.HTML && n !== Po.HEAD && n !== Po.BODY && n !== Po.BR || Wc(e, t)
                }(this, e);
                break;
            case Rc.BEFORE_HEAD:
                !function(e, t) {
                    const n = t.tagID;
                    n === Po.HEAD || n === Po.BODY || n === Po.HTML || n === Po.BR ? Qc(e, t) : e._err(t, Eo.endTagWithoutMatchingOpenElement)
                }(this, e);
                break;
            case Rc.IN_HEAD:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.HEAD:
                            e.openElements.pop(),
                                e.insertionMode = Rc.AFTER_HEAD;
                            break;
                        case Po.BODY:
                        case Po.BR:
                        case Po.HTML:
                            zc(e, t);
                            break;
                        case Po.TEMPLATE:
                            $c(e, t);
                            break;
                        default:
                            e._err(t, Eo.endTagWithoutMatchingOpenElement)
                    }
                }(this, e);
                break;
            case Rc.IN_HEAD_NO_SCRIPT:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.NOSCRIPT:
                            e.openElements.pop(),
                                e.insertionMode = Rc.IN_HEAD;
                            break;
                        case Po.BR:
                            Jc(e, t);
                            break;
                        default:
                            e._err(t, Eo.endTagWithoutMatchingOpenElement)
                    }
                }(this, e);
                break;
            case Rc.AFTER_HEAD:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.BODY:
                        case Po.HTML:
                        case Po.BR:
                            Zc(e, t);
                            break;
                        case Po.TEMPLATE:
                            $c(e, t);
                            break;
                        default:
                            e._err(t, Eo.endTagWithoutMatchingOpenElement)
                    }
                }(this, e);
                break;
            case Rc.IN_BODY:
                ll(this, e);
                break;
            case Rc.TEXT:
                !function(e, t) {
                    var n;
                    t.tagID === Po.SCRIPT && (null === (n = e.scriptHandler) || void 0 === n || n.call(e, e.openElements.current));
                    e.openElements.pop(),
                        e.insertionMode = e.originalInsertionMode
                }(this, e);
                break;
            case Rc.IN_TABLE:
                fl(this, e);
                break;
            case Rc.IN_TABLE_TEXT:
                Tl(this, e);
                break;
            case Rc.IN_CAPTION:
                !function(e, t) {
                    const n = t.tagID;
                    switch (n) {
                        case Po.CAPTION:
                        case Po.TABLE:
                            e.openElements.hasInTableScope(Po.CAPTION) && (e.openElements.generateImpliedEndTags(),
                                e.openElements.popUntilTagNamePopped(Po.CAPTION),
                                e.activeFormattingElements.clearToLastMarker(),
                                e.insertionMode = Rc.IN_TABLE,
                            n === Po.TABLE && fl(e, t));
                            break;
                        case Po.BODY:
                        case Po.COL:
                        case Po.COLGROUP:
                        case Po.HTML:
                        case Po.TBODY:
                        case Po.TD:
                        case Po.TFOOT:
                        case Po.TH:
                        case Po.THEAD:
                        case Po.TR:
                            break;
                        default:
                            ll(e, t)
                    }
                }(this, e);
                break;
            case Rc.IN_COLUMN_GROUP:
                !function(e, t) {
                    switch (t.tagID) {
                        case Po.COLGROUP:
                            e.openElements.currentTagId === Po.COLGROUP && (e.openElements.pop(),
                                e.insertionMode = Rc.IN_TABLE);
                            break;
                        case Po.TEMPLATE:
                            $c(e, t);
                            break;
                        case Po.COL:
                            break;
                        default:
                            gl(e, t)
                    }
                }(this, e);
                break;
            case Rc.IN_TABLE_BODY:
                Cl(this, e);
                break;
            case Rc.IN_ROW:
                Sl(this, e);
                break;
            case Rc.IN_CELL:
                !function(e, t) {
                    const n = t.tagID;
                    switch (n) {
                        case Po.TD:
                        case Po.TH:
                            e.openElements.hasInTableScope(n) && (e.openElements.generateImpliedEndTags(),
                                e.openElements.popUntilTagNamePopped(n),
                                e.activeFormattingElements.clearToLastMarker(),
                                e.insertionMode = Rc.IN_ROW);
                            break;
                        case Po.TABLE:
                        case Po.TBODY:
                        case Po.TFOOT:
                        case Po.THEAD:
                        case Po.TR:
                            e.openElements.hasInTableScope(n) && (e._closeTableCell(),
                                Sl(e, t));
                            break;
                        case Po.BODY:
                        case Po.CAPTION:
                        case Po.COL:
                        case Po.COLGROUP:
                        case Po.HTML:
                            break;
                        default:
                            ll(e, t)
                    }
                }(this, e);
                break;
            case Rc.IN_SELECT:
                Ol(this, e);
                break;
            case Rc.IN_SELECT_IN_TABLE:
                !function(e, t) {
                    const n = t.tagID;
                    n === Po.CAPTION || n === Po.TABLE || n === Po.TBODY || n === Po.TFOOT || n === Po.THEAD || n === Po.TR || n === Po.TD || n === Po.TH ? e.openElements.hasInTableScope(n) && (e.openElements.popUntilTagNamePopped(Po.SELECT),
                        e._resetInsertionMode(),
                        e.onEndTag(t)) : Ol(e, t)
                }(this, e);
                break;
            case Rc.IN_TEMPLATE:
                !function(e, t) {
                    t.tagID === Po.TEMPLATE && $c(e, t)
                }(this, e);
                break;
            case Rc.AFTER_BODY:
                Ll(this, e);
                break;
            case Rc.IN_FRAMESET:
                !function(e, t) {
                    t.tagID !== Po.FRAMESET || e.openElements.isRootHtmlElementCurrent() || (e.openElements.pop(),
                    e.fragmentContext || e.openElements.currentTagId === Po.FRAMESET || (e.insertionMode = Rc.AFTER_FRAMESET))
                }(this, e);
                break;
            case Rc.AFTER_FRAMESET:
                !function(e, t) {
                    t.tagID === Po.HTML && (e.insertionMode = Rc.AFTER_AFTER_FRAMESET)
                }(this, e);
                break;
            case Rc.AFTER_AFTER_BODY:
                vl(this, e)
        }
    }
    onEof(e) {
        switch (this.insertionMode) {
            case Rc.INITIAL:
                Vc(this, e);
                break;
            case Rc.BEFORE_HTML:
                Wc(this, e);
                break;
            case Rc.BEFORE_HEAD:
                Qc(this, e);
                break;
            case Rc.IN_HEAD:
                zc(this, e);
                break;
            case Rc.IN_HEAD_NO_SCRIPT:
                Jc(this, e);
                break;
            case Rc.AFTER_HEAD:
                Zc(this, e);
                break;
            case Rc.IN_BODY:
            case Rc.IN_TABLE:
            case Rc.IN_CAPTION:
            case Rc.IN_COLUMN_GROUP:
            case Rc.IN_TABLE_BODY:
            case Rc.IN_ROW:
            case Rc.IN_CELL:
            case Rc.IN_SELECT:
            case Rc.IN_SELECT_IN_TABLE:
                hl(this, e);
                break;
            case Rc.TEXT:
                !function(e, t) {
                    e._err(t, Eo.eofInElementThatCanContainOnlyText),
                        e.openElements.pop(),
                        e.insertionMode = e.originalInsertionMode,
                        e.onEof(t)
                }(this, e);
                break;
            case Rc.IN_TABLE_TEXT:
                Tl(this, e);
                break;
            case Rc.IN_TEMPLATE:
                yl(this, e);
                break;
            case Rc.AFTER_BODY:
            case Rc.IN_FRAMESET:
            case Rc.AFTER_FRAMESET:
            case Rc.AFTER_AFTER_BODY:
            case Rc.AFTER_AFTER_FRAMESET:
                jc(this, e)
        }
    }
    onWhitespaceCharacter(e) {
        if (this.skipNextNewLine && (this.skipNextNewLine = !1,
        e.chars.charCodeAt(0) === io.LINE_FEED)) {
            if (1 === e.chars.length)
                return;
            e.chars = e.chars.substr(1)
        }
        if (this.tokenizer.inForeignNode)
            this._insertCharacters(e);
        else
            switch (this.insertionMode) {
                case Rc.IN_HEAD:
                case Rc.IN_HEAD_NO_SCRIPT:
                case Rc.AFTER_HEAD:
                case Rc.TEXT:
                case Rc.IN_COLUMN_GROUP:
                case Rc.IN_SELECT:
                case Rc.IN_SELECT_IN_TABLE:
                case Rc.IN_FRAMESET:
                case Rc.AFTER_FRAMESET:
                    this._insertCharacters(e);
                    break;
                case Rc.IN_BODY:
                case Rc.IN_CAPTION:
                case Rc.IN_CELL:
                case Rc.IN_TEMPLATE:
                case Rc.AFTER_BODY:
                case Rc.AFTER_AFTER_BODY:
                case Rc.AFTER_AFTER_FRAMESET:
                    tl(this, e);
                    break;
                case Rc.IN_TABLE:
                case Rc.IN_TABLE_BODY:
                case Rc.IN_ROW:
                    ul(this, e);
                    break;
                case Rc.IN_TABLE_TEXT:
                    El(this, e)
            }
    }
}
function Bc(e, t) {
    let n = e.activeFormattingElements.getElementEntryInScopeWithTagName(t.tagName);
    return n ? e.openElements.contains(n.element) ? e.openElements.hasInScope(t.tagID) || (n = null) : (e.activeFormattingElements.removeEntry(n),
        n = null) : cl(e, t),
        n
}
function Fc(e, t) {
    let n = null
        , r = e.openElements.stackTop;
    for (; r >= 0; r--) {
        const i = e.openElements.items[r];
        if (i === t.element)
            break;
        e._isSpecialElement(i, e.openElements.tagIDs[r]) && (n = i)
    }
    return n || (e.openElements.shortenToLength(r < 0 ? 0 : r),
        e.activeFormattingElements.removeEntry(t)),
        n
}
function Uc(e, t, n) {
    let r = t
        , i = e.openElements.getCommonAncestor(t);
    for (let s = 0, a = i; a !== n; s++,
        a = i) {
        i = e.openElements.getCommonAncestor(a);
        const n = e.activeFormattingElements.getElementEntry(a)
            , o = n && s >= 3;
        !n || o ? (o && e.activeFormattingElements.removeEntry(n),
            e.openElements.remove(a)) : (a = Hc(e, n),
        r === t && (e.activeFormattingElements.bookmark = n),
            e.treeAdapter.detachNode(r),
            e.treeAdapter.appendChild(a, r),
            r = a)
    }
    return r
}
function Hc(e, t) {
    const n = e.treeAdapter.getNamespaceURI(t.element)
        , r = e.treeAdapter.createElement(t.token.tagName, n, t.token.attrs);
    return e.openElements.replace(t.element, r),
        t.element = r,
        r
}
function Gc(e, t, n) {
    const r = Fo(e.treeAdapter.getTagName(t));
    if (e._isElementCausesFosterParenting(r))
        e._fosterParentElement(n);
    else {
        const i = e.treeAdapter.getNamespaceURI(t);
        r === Po.TEMPLATE && i === vo.HTML && (t = e.treeAdapter.getTemplateContent(t)),
            e.treeAdapter.appendChild(t, n)
    }
}
function Yc(e, t, n) {
    const r = e.treeAdapter.getNamespaceURI(n.element)
        , {token: i} = n
        , s = e.treeAdapter.createElement(i.tagName, r, i.attrs);
    e._adoptNodes(t, s),
        e.treeAdapter.appendChild(t, s),
        e.activeFormattingElements.insertElementAfterBookmark(s, i),
        e.activeFormattingElements.removeEntry(n),
        e.openElements.remove(n.element),
        e.openElements.insertAfter(t, s, i.tagID)
}
function qc(e, t) {
    for (let n = 0; n < 8; n++) {
        const n = Bc(e, t);
        if (!n)
            break;
        const r = Fc(e, n);
        if (!r)
            break;
        e.activeFormattingElements.bookmark = n;
        const i = Uc(e, r, n.element)
            , s = e.openElements.getCommonAncestor(n.element);
        e.treeAdapter.detachNode(i),
        s && Gc(e, s, i),
            Yc(e, r, n)
    }
}
function Kc(e, t) {
    e._appendCommentNode(t, e.openElements.currentTmplContentOrNode)
}
function jc(e, t) {
    if (e.stopped = !0,
        t.location) {
        const n = e.fragmentContext ? 0 : 2;
        for (let r = e.openElements.stackTop; r >= n; r--)
            e._setEndLocation(e.openElements.items[r], t);
        if (!e.fragmentContext && e.openElements.stackTop >= 0) {
            const n = e.openElements.items[0]
                , r = e.treeAdapter.getNodeSourceCodeLocation(n);
            if (r && !r.endTag && (e._setEndLocation(n, t),
            e.openElements.stackTop >= 1)) {
                const n = e.openElements.items[1]
                    , r = e.treeAdapter.getNodeSourceCodeLocation(n);
                r && !r.endTag && e._setEndLocation(n, t)
            }
        }
    }
}
function Vc(e, t) {
    e._err(t, Eo.missingDoctype, !0),
        e.treeAdapter.setDocumentMode(e.document, Ro.QUIRKS),
        e.insertionMode = Rc.BEFORE_HTML,
        e._processToken(t)
}
function Wc(e, t) {
    e._insertFakeRootElement(),
        e.insertionMode = Rc.BEFORE_HEAD,
        e._processToken(t)
}
function Qc(e, t) {
    e._insertFakeElement(Mo.HEAD, Po.HEAD),
        e.headElement = e.openElements.current,
        e.insertionMode = Rc.IN_HEAD,
        e._processToken(t)
}
function Xc(e, t) {
    switch (t.tagID) {
        case Po.HTML:
            ol(e, t);
            break;
        case Po.BASE:
        case Po.BASEFONT:
        case Po.BGSOUND:
        case Po.LINK:
        case Po.META:
            e._appendElement(t, vo.HTML),
                t.ackSelfClosing = !0;
            break;
        case Po.TITLE:
            e._switchToTextParsing(t, jo.RCDATA);
            break;
        case Po.NOSCRIPT:
            e.options.scriptingEnabled ? e._switchToTextParsing(t, jo.RAWTEXT) : (e._insertElement(t, vo.HTML),
                e.insertionMode = Rc.IN_HEAD_NO_SCRIPT);
            break;
        case Po.NOFRAMES:
        case Po.STYLE:
            e._switchToTextParsing(t, jo.RAWTEXT);
            break;
        case Po.SCRIPT:
            e._switchToTextParsing(t, jo.SCRIPT_DATA);
            break;
        case Po.TEMPLATE:
            e._insertTemplate(t),
                e.activeFormattingElements.insertMarker(),
                e.framesetOk = !1,
                e.insertionMode = Rc.IN_TEMPLATE,
                e.tmplInsertionModeStack.unshift(Rc.IN_TEMPLATE);
            break;
        case Po.HEAD:
            e._err(t, Eo.misplacedStartTagForHeadElement);
            break;
        default:
            zc(e, t)
    }
}
function $c(e, t) {
    e.openElements.tmplCount > 0 ? (e.openElements.generateImpliedEndTagsThoroughly(),
    e.openElements.currentTagId !== Po.TEMPLATE && e._err(t, Eo.closingOfElementWithOpenChildElements),
        e.openElements.popUntilTagNamePopped(Po.TEMPLATE),
        e.activeFormattingElements.clearToLastMarker(),
        e.tmplInsertionModeStack.shift(),
        e._resetInsertionMode()) : e._err(t, Eo.endTagWithoutMatchingOpenElement)
}
function zc(e, t) {
    e.openElements.pop(),
        e.insertionMode = Rc.AFTER_HEAD,
        e._processToken(t)
}
function Jc(e, t) {
    const n = t.type === To.EOF ? Eo.openElementsLeftAfterEof : Eo.disallowedContentInNoscriptInHead;
    e._err(t, n),
        e.openElements.pop(),
        e.insertionMode = Rc.IN_HEAD,
        e._processToken(t)
}
function Zc(e, t) {
    e._insertFakeElement(Mo.BODY, Po.BODY),
        e.insertionMode = Rc.IN_BODY,
        el(e, t)
}
function el(e, t) {
    switch (t.type) {
        case To.CHARACTER:
            nl(e, t);
            break;
        case To.WHITESPACE_CHARACTER:
            tl(e, t);
            break;
        case To.COMMENT:
            Kc(e, t);
            break;
        case To.START_TAG:
            ol(e, t);
            break;
        case To.END_TAG:
            ll(e, t);
            break;
        case To.EOF:
            hl(e, t)
    }
}
function tl(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertCharacters(t)
}
function nl(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertCharacters(t),
        e.framesetOk = !1
}
function rl(e, t) {
    e._reconstructActiveFormattingElements(),
        e._appendElement(t, vo.HTML),
        e.framesetOk = !1,
        t.ackSelfClosing = !0
}
function il(e) {
    const t = _o(e, Do.TYPE);
    return null != t && "hidden" === t.toLowerCase()
}
function sl(e, t) {
    e._switchToTextParsing(t, jo.RAWTEXT)
}
function al(e, t) {
    e._reconstructActiveFormattingElements(),
        e._insertElement(t, vo.HTML)
}
function ol(e, t) {
    switch (t.tagID) {
        case Po.I:
        case Po.S:
        case Po.B:
        case Po.U:
        case Po.EM:
        case Po.TT:
        case Po.BIG:
        case Po.CODE:
        case Po.FONT:
        case Po.SMALL:
        case Po.STRIKE:
        case Po.STRONG:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML),
                    e.activeFormattingElements.pushElement(e.openElements.current, t)
            }(e, t);
            break;
        case Po.A:
            !function(e, t) {
                const n = e.activeFormattingElements.getElementEntryInScopeWithTagName(Mo.A);
                n && (qc(e, t),
                    e.openElements.remove(n.element),
                    e.activeFormattingElements.removeEntry(n)),
                    e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML),
                    e.activeFormattingElements.pushElement(e.openElements.current, t)
            }(e, t);
            break;
        case Po.H1:
        case Po.H2:
        case Po.H3:
        case Po.H4:
        case Po.H5:
        case Po.H6:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                Go(e.openElements.currentTagId) && e.openElements.pop(),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.P:
        case Po.DL:
        case Po.OL:
        case Po.UL:
        case Po.DIV:
        case Po.DIR:
        case Po.NAV:
        case Po.MAIN:
        case Po.MENU:
        case Po.ASIDE:
        case Po.CENTER:
        case Po.FIGURE:
        case Po.FOOTER:
        case Po.HEADER:
        case Po.HGROUP:
        case Po.DIALOG:
        case Po.DETAILS:
        case Po.ADDRESS:
        case Po.ARTICLE:
        case Po.SECTION:
        case Po.SUMMARY:
        case Po.FIELDSET:
        case Po.BLOCKQUOTE:
        case Po.FIGCAPTION:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.LI:
        case Po.DD:
        case Po.DT:
            !function(e, t) {
                e.framesetOk = !1;
                const n = t.tagID;
                for (let t = e.openElements.stackTop; t >= 0; t--) {
                    const r = e.openElements.tagIDs[t];
                    if (n === Po.LI && r === Po.LI || (n === Po.DD || n === Po.DT) && (r === Po.DD || r === Po.DT)) {
                        e.openElements.generateImpliedEndTagsWithExclusion(r),
                            e.openElements.popUntilTagNamePopped(r);
                        break
                    }
                    if (r !== Po.ADDRESS && r !== Po.DIV && r !== Po.P && e._isSpecialElement(e.openElements.items[t], r))
                        break
                }
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.BR:
        case Po.IMG:
        case Po.WBR:
        case Po.AREA:
        case Po.EMBED:
        case Po.KEYGEN:
            rl(e, t);
            break;
        case Po.HR:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._appendElement(t, vo.HTML),
                    e.framesetOk = !1,
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.RB:
        case Po.RTC:
            !function(e, t) {
                e.openElements.hasInScope(Po.RUBY) && e.openElements.generateImpliedEndTags(),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.RT:
        case Po.RP:
            !function(e, t) {
                e.openElements.hasInScope(Po.RUBY) && e.openElements.generateImpliedEndTagsWithExclusion(Po.RTC),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.PRE:
        case Po.LISTING:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML),
                    e.skipNextNewLine = !0,
                    e.framesetOk = !1
            }(e, t);
            break;
        case Po.XMP:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._reconstructActiveFormattingElements(),
                    e.framesetOk = !1,
                    e._switchToTextParsing(t, jo.RAWTEXT)
            }(e, t);
            break;
        case Po.SVG:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    kc(t),
                    vc(t),
                    t.selfClosing ? e._appendElement(t, vo.SVG) : e._insertElement(t, vo.SVG),
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.HTML:
            !function(e, t) {
                0 === e.openElements.tmplCount && e.treeAdapter.adoptAttributes(e.openElements.items[0], t.attrs)
            }(e, t);
            break;
        case Po.BASE:
        case Po.LINK:
        case Po.META:
        case Po.STYLE:
        case Po.TITLE:
        case Po.SCRIPT:
        case Po.BGSOUND:
        case Po.BASEFONT:
        case Po.TEMPLATE:
            Xc(e, t);
            break;
        case Po.BODY:
            !function(e, t) {
                const n = e.openElements.tryPeekProperlyNestedBodyElement();
                n && 0 === e.openElements.tmplCount && (e.framesetOk = !1,
                    e.treeAdapter.adoptAttributes(n, t.attrs))
            }(e, t);
            break;
        case Po.FORM:
            !function(e, t) {
                const n = e.openElements.tmplCount > 0;
                e.formElement && !n || (e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML),
                n || (e.formElement = e.openElements.current))
            }(e, t);
            break;
        case Po.NOBR:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                e.openElements.hasInScope(Po.NOBR) && (qc(e, t),
                    e._reconstructActiveFormattingElements()),
                    e._insertElement(t, vo.HTML),
                    e.activeFormattingElements.pushElement(e.openElements.current, t)
            }(e, t);
            break;
        case Po.MATH:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    Lc(t),
                    vc(t),
                    t.selfClosing ? e._appendElement(t, vo.MATHML) : e._insertElement(t, vo.MATHML),
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.TABLE:
            !function(e, t) {
                e.treeAdapter.getDocumentMode(e.document) !== Ro.QUIRKS && e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML),
                    e.framesetOk = !1,
                    e.insertionMode = Rc.IN_TABLE
            }(e, t);
            break;
        case Po.INPUT:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    e._appendElement(t, vo.HTML),
                il(t) || (e.framesetOk = !1),
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.PARAM:
        case Po.TRACK:
        case Po.SOURCE:
            !function(e, t) {
                e._appendElement(t, vo.HTML),
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.IMAGE:
            !function(e, t) {
                t.tagName = Mo.IMG,
                    t.tagID = Po.IMG,
                    rl(e, t)
            }(e, t);
            break;
        case Po.BUTTON:
            !function(e, t) {
                e.openElements.hasInScope(Po.BUTTON) && (e.openElements.generateImpliedEndTags(),
                    e.openElements.popUntilTagNamePopped(Po.BUTTON)),
                    e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML),
                    e.framesetOk = !1
            }(e, t);
            break;
        case Po.APPLET:
        case Po.OBJECT:
        case Po.MARQUEE:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML),
                    e.activeFormattingElements.insertMarker(),
                    e.framesetOk = !1
            }(e, t);
            break;
        case Po.IFRAME:
            !function(e, t) {
                e.framesetOk = !1,
                    e._switchToTextParsing(t, jo.RAWTEXT)
            }(e, t);
            break;
        case Po.SELECT:
            !function(e, t) {
                e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML),
                    e.framesetOk = !1,
                    e.insertionMode = e.insertionMode === Rc.IN_TABLE || e.insertionMode === Rc.IN_CAPTION || e.insertionMode === Rc.IN_TABLE_BODY || e.insertionMode === Rc.IN_ROW || e.insertionMode === Rc.IN_CELL ? Rc.IN_SELECT_IN_TABLE : Rc.IN_SELECT
            }(e, t);
            break;
        case Po.OPTION:
        case Po.OPTGROUP:
            !function(e, t) {
                e.openElements.currentTagId === Po.OPTION && e.openElements.pop(),
                    e._reconstructActiveFormattingElements(),
                    e._insertElement(t, vo.HTML)
            }(e, t);
            break;
        case Po.NOEMBED:
            sl(e, t);
            break;
        case Po.FRAMESET:
            !function(e, t) {
                const n = e.openElements.tryPeekProperlyNestedBodyElement();
                e.framesetOk && n && (e.treeAdapter.detachNode(n),
                    e.openElements.popAllUpToHtmlElement(),
                    e._insertElement(t, vo.HTML),
                    e.insertionMode = Rc.IN_FRAMESET)
            }(e, t);
            break;
        case Po.TEXTAREA:
            !function(e, t) {
                e._insertElement(t, vo.HTML),
                    e.skipNextNewLine = !0,
                    e.tokenizer.state = jo.RCDATA,
                    e.originalInsertionMode = e.insertionMode,
                    e.framesetOk = !1,
                    e.insertionMode = Rc.TEXT
            }(e, t);
            break;
        case Po.NOSCRIPT:
            e.options.scriptingEnabled ? sl(e, t) : al(e, t);
            break;
        case Po.PLAINTEXT:
            !function(e, t) {
                e.openElements.hasInButtonScope(Po.P) && e._closePElement(),
                    e._insertElement(t, vo.HTML),
                    e.tokenizer.state = jo.PLAINTEXT
            }(e, t);
            break;
        case Po.COL:
        case Po.TH:
        case Po.TD:
        case Po.TR:
        case Po.HEAD:
        case Po.FRAME:
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
        case Po.CAPTION:
        case Po.COLGROUP:
            break;
        default:
            al(e, t)
    }
}
function cl(e, t) {
    const n = t.tagName
        , r = t.tagID;
    for (let t = e.openElements.stackTop; t > 0; t--) {
        const i = e.openElements.items[t]
            , s = e.openElements.tagIDs[t];
        if (r === s && (r !== Po.UNKNOWN || e.treeAdapter.getTagName(i) === n)) {
            e.openElements.generateImpliedEndTagsWithExclusion(r),
            e.openElements.stackTop >= t && e.openElements.shortenToLength(t);
            break
        }
        if (e._isSpecialElement(i, s))
            break
    }
}
function ll(e, t) {
    switch (t.tagID) {
        case Po.A:
        case Po.B:
        case Po.I:
        case Po.S:
        case Po.U:
        case Po.EM:
        case Po.TT:
        case Po.BIG:
        case Po.CODE:
        case Po.FONT:
        case Po.NOBR:
        case Po.SMALL:
        case Po.STRIKE:
        case Po.STRONG:
            qc(e, t);
            break;
        case Po.P:
            !function(e) {
                e.openElements.hasInButtonScope(Po.P) || e._insertFakeElement(Mo.P, Po.P),
                    e._closePElement()
            }(e);
            break;
        case Po.DL:
        case Po.UL:
        case Po.OL:
        case Po.DIR:
        case Po.DIV:
        case Po.NAV:
        case Po.PRE:
        case Po.MAIN:
        case Po.MENU:
        case Po.ASIDE:
        case Po.BUTTON:
        case Po.CENTER:
        case Po.FIGURE:
        case Po.FOOTER:
        case Po.HEADER:
        case Po.HGROUP:
        case Po.DIALOG:
        case Po.ADDRESS:
        case Po.ARTICLE:
        case Po.DETAILS:
        case Po.SECTION:
        case Po.SUMMARY:
        case Po.LISTING:
        case Po.FIELDSET:
        case Po.BLOCKQUOTE:
        case Po.FIGCAPTION:
            !function(e, t) {
                const n = t.tagID;
                e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(),
                    e.openElements.popUntilTagNamePopped(n))
            }(e, t);
            break;
        case Po.LI:
            !function(e) {
                e.openElements.hasInListItemScope(Po.LI) && (e.openElements.generateImpliedEndTagsWithExclusion(Po.LI),
                    e.openElements.popUntilTagNamePopped(Po.LI))
            }(e);
            break;
        case Po.DD:
        case Po.DT:
            !function(e, t) {
                const n = t.tagID;
                e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTagsWithExclusion(n),
                    e.openElements.popUntilTagNamePopped(n))
            }(e, t);
            break;
        case Po.H1:
        case Po.H2:
        case Po.H3:
        case Po.H4:
        case Po.H5:
        case Po.H6:
            !function(e) {
                e.openElements.hasNumberedHeaderInScope() && (e.openElements.generateImpliedEndTags(),
                    e.openElements.popUntilNumberedHeaderPopped())
            }(e);
            break;
        case Po.BR:
            !function(e) {
                e._reconstructActiveFormattingElements(),
                    e._insertFakeElement(Mo.BR, Po.BR),
                    e.openElements.pop(),
                    e.framesetOk = !1
            }(e);
            break;
        case Po.BODY:
            !function(e, t) {
                if (e.openElements.hasInScope(Po.BODY) && (e.insertionMode = Rc.AFTER_BODY,
                    e.options.sourceCodeLocationInfo)) {
                    const n = e.openElements.tryPeekProperlyNestedBodyElement();
                    n && e._setEndLocation(n, t)
                }
            }(e, t);
            break;
        case Po.HTML:
            !function(e, t) {
                e.openElements.hasInScope(Po.BODY) && (e.insertionMode = Rc.AFTER_BODY,
                    Ll(e, t))
            }(e, t);
            break;
        case Po.FORM:
            !function(e) {
                const t = e.openElements.tmplCount > 0
                    , {formElement: n} = e;
                t || (e.formElement = null),
                (n || t) && e.openElements.hasInScope(Po.FORM) && (e.openElements.generateImpliedEndTags(),
                    t ? e.openElements.popUntilTagNamePopped(Po.FORM) : n && e.openElements.remove(n))
            }(e);
            break;
        case Po.APPLET:
        case Po.OBJECT:
        case Po.MARQUEE:
            !function(e, t) {
                const n = t.tagID;
                e.openElements.hasInScope(n) && (e.openElements.generateImpliedEndTags(),
                    e.openElements.popUntilTagNamePopped(n),
                    e.activeFormattingElements.clearToLastMarker())
            }(e, t);
            break;
        case Po.TEMPLATE:
            $c(e, t);
            break;
        default:
            cl(e, t)
    }
}
function hl(e, t) {
    e.tmplInsertionModeStack.length > 0 ? yl(e, t) : jc(e, t)
}
function ul(e, t) {
    if (Pc.has(e.openElements.currentTagId))
        switch (e.pendingCharacterTokens.length = 0,
            e.hasNonWhitespacePendingCharacterToken = !1,
            e.originalInsertionMode = e.insertionMode,
            e.insertionMode = Rc.IN_TABLE_TEXT,
            t.type) {
            case To.CHARACTER:
                ml(e, t);
                break;
            case To.WHITESPACE_CHARACTER:
                El(e, t)
        }
    else
        dl(e, t)
}
function pl(e, t) {
    switch (t.tagID) {
        case Po.TD:
        case Po.TH:
        case Po.TR:
            !function(e, t) {
                e.openElements.clearBackToTableContext(),
                    e._insertFakeElement(Mo.TBODY, Po.TBODY),
                    e.insertionMode = Rc.IN_TABLE_BODY,
                    Nl(e, t)
            }(e, t);
            break;
        case Po.STYLE:
        case Po.SCRIPT:
        case Po.TEMPLATE:
            Xc(e, t);
            break;
        case Po.COL:
            !function(e, t) {
                e.openElements.clearBackToTableContext(),
                    e._insertFakeElement(Mo.COLGROUP, Po.COLGROUP),
                    e.insertionMode = Rc.IN_COLUMN_GROUP,
                    Al(e, t)
            }(e, t);
            break;
        case Po.FORM:
            !function(e, t) {
                e.formElement || 0 !== e.openElements.tmplCount || (e._insertElement(t, vo.HTML),
                    e.formElement = e.openElements.current,
                    e.openElements.pop())
            }(e, t);
            break;
        case Po.TABLE:
            !function(e, t) {
                e.openElements.hasInTableScope(Po.TABLE) && (e.openElements.popUntilTagNamePopped(Po.TABLE),
                    e._resetInsertionMode(),
                    e._processStartTag(t))
            }(e, t);
            break;
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
            !function(e, t) {
                e.openElements.clearBackToTableContext(),
                    e._insertElement(t, vo.HTML),
                    e.insertionMode = Rc.IN_TABLE_BODY
            }(e, t);
            break;
        case Po.INPUT:
            !function(e, t) {
                il(t) ? e._appendElement(t, vo.HTML) : dl(e, t),
                    t.ackSelfClosing = !0
            }(e, t);
            break;
        case Po.CAPTION:
            !function(e, t) {
                e.openElements.clearBackToTableContext(),
                    e.activeFormattingElements.insertMarker(),
                    e._insertElement(t, vo.HTML),
                    e.insertionMode = Rc.IN_CAPTION
            }(e, t);
            break;
        case Po.COLGROUP:
            !function(e, t) {
                e.openElements.clearBackToTableContext(),
                    e._insertElement(t, vo.HTML),
                    e.insertionMode = Rc.IN_COLUMN_GROUP
            }(e, t);
            break;
        default:
            dl(e, t)
    }
}
function fl(e, t) {
    switch (t.tagID) {
        case Po.TABLE:
            e.openElements.hasInTableScope(Po.TABLE) && (e.openElements.popUntilTagNamePopped(Po.TABLE),
                e._resetInsertionMode());
            break;
        case Po.TEMPLATE:
            $c(e, t);
            break;
        case Po.BODY:
        case Po.CAPTION:
        case Po.COL:
        case Po.COLGROUP:
        case Po.HTML:
        case Po.TBODY:
        case Po.TD:
        case Po.TFOOT:
        case Po.TH:
        case Po.THEAD:
        case Po.TR:
            break;
        default:
            dl(e, t)
    }
}
function dl(e, t) {
    const n = e.fosterParentingEnabled;
    e.fosterParentingEnabled = !0,
        el(e, t),
        e.fosterParentingEnabled = n
}
function El(e, t) {
    e.pendingCharacterTokens.push(t)
}
function ml(e, t) {
    e.pendingCharacterTokens.push(t),
        e.hasNonWhitespacePendingCharacterToken = !0
}
function Tl(e, t) {
    let n = 0;
    if (e.hasNonWhitespacePendingCharacterToken)
        for (; n < e.pendingCharacterTokens.length; n++)
            dl(e, e.pendingCharacterTokens[n]);
    else
        for (; n < e.pendingCharacterTokens.length; n++)
            e._insertCharacters(e.pendingCharacterTokens[n]);
    e.insertionMode = e.originalInsertionMode,
        e._processToken(t)
}
const _l = new Set([Po.CAPTION, Po.COL, Po.COLGROUP, Po.TBODY, Po.TD, Po.TFOOT, Po.TH, Po.THEAD, Po.TR]);
function Al(e, t) {
    switch (t.tagID) {
        case Po.HTML:
            ol(e, t);
            break;
        case Po.COL:
            e._appendElement(t, vo.HTML),
                t.ackSelfClosing = !0;
            break;
        case Po.TEMPLATE:
            Xc(e, t);
            break;
        default:
            gl(e, t)
    }
}
function gl(e, t) {
    e.openElements.currentTagId === Po.COLGROUP && (e.openElements.pop(),
        e.insertionMode = Rc.IN_TABLE,
        e._processToken(t))
}
function Nl(e, t) {
    switch (t.tagID) {
        case Po.TR:
            e.openElements.clearBackToTableBodyContext(),
                e._insertElement(t, vo.HTML),
                e.insertionMode = Rc.IN_ROW;
            break;
        case Po.TH:
        case Po.TD:
            e.openElements.clearBackToTableBodyContext(),
                e._insertFakeElement(Mo.TR, Po.TR),
                e.insertionMode = Rc.IN_ROW,
                Il(e, t);
            break;
        case Po.CAPTION:
        case Po.COL:
        case Po.COLGROUP:
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
            e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE,
                pl(e, t));
            break;
        default:
            pl(e, t)
    }
}
function Cl(e, t) {
    const n = t.tagID;
    switch (t.tagID) {
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
            e.openElements.hasInTableScope(n) && (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE);
            break;
        case Po.TABLE:
            e.openElements.hasTableBodyContextInTableScope() && (e.openElements.clearBackToTableBodyContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE,
                fl(e, t));
            break;
        case Po.BODY:
        case Po.CAPTION:
        case Po.COL:
        case Po.COLGROUP:
        case Po.HTML:
        case Po.TD:
        case Po.TH:
        case Po.TR:
            break;
        default:
            fl(e, t)
    }
}
function Il(e, t) {
    switch (t.tagID) {
        case Po.TH:
        case Po.TD:
            e.openElements.clearBackToTableRowContext(),
                e._insertElement(t, vo.HTML),
                e.insertionMode = Rc.IN_CELL,
                e.activeFormattingElements.insertMarker();
            break;
        case Po.CAPTION:
        case Po.COL:
        case Po.COLGROUP:
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
        case Po.TR:
            e.openElements.hasInTableScope(Po.TR) && (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE_BODY,
                Nl(e, t));
            break;
        default:
            pl(e, t)
    }
}
function Sl(e, t) {
    switch (t.tagID) {
        case Po.TR:
            e.openElements.hasInTableScope(Po.TR) && (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE_BODY);
            break;
        case Po.TABLE:
            e.openElements.hasInTableScope(Po.TR) && (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE_BODY,
                Cl(e, t));
            break;
        case Po.TBODY:
        case Po.TFOOT:
        case Po.THEAD:
            (e.openElements.hasInTableScope(t.tagID) || e.openElements.hasInTableScope(Po.TR)) && (e.openElements.clearBackToTableRowContext(),
                e.openElements.pop(),
                e.insertionMode = Rc.IN_TABLE_BODY,
                Cl(e, t));
            break;
        case Po.BODY:
        case Po.CAPTION:
        case Po.COL:
        case Po.COLGROUP:
        case Po.HTML:
        case Po.TD:
        case Po.TH:
            break;
        default:
            fl(e, t)
    }
}
function bl(e, t) {
    switch (t.tagID) {
        case Po.HTML:
            ol(e, t);
            break;
        case Po.OPTION:
            e.openElements.currentTagId === Po.OPTION && e.openElements.pop(),
                e._insertElement(t, vo.HTML);
            break;
        case Po.OPTGROUP:
            e.openElements.currentTagId === Po.OPTION && e.openElements.pop(),
            e.openElements.currentTagId === Po.OPTGROUP && e.openElements.pop(),
                e._insertElement(t, vo.HTML);
            break;
        case Po.INPUT:
        case Po.KEYGEN:
        case Po.TEXTAREA:
        case Po.SELECT:
            e.openElements.hasInSelectScope(Po.SELECT) && (e.openElements.popUntilTagNamePopped(Po.SELECT),
                e._resetInsertionMode(),
            t.tagID !== Po.SELECT && e._processStartTag(t));
            break;
        case Po.SCRIPT:
        case Po.TEMPLATE:
            Xc(e, t)
    }
}
function Ol(e, t) {
    switch (t.tagID) {
        case Po.OPTGROUP:
            e.openElements.stackTop > 0 && e.openElements.currentTagId === Po.OPTION && e.openElements.tagIDs[e.openElements.stackTop - 1] === Po.OPTGROUP && e.openElements.pop(),
            e.openElements.currentTagId === Po.OPTGROUP && e.openElements.pop();
            break;
        case Po.OPTION:
            e.openElements.currentTagId === Po.OPTION && e.openElements.pop();
            break;
        case Po.SELECT:
            e.openElements.hasInSelectScope(Po.SELECT) && (e.openElements.popUntilTagNamePopped(Po.SELECT),
                e._resetInsertionMode());
            break;
        case Po.TEMPLATE:
            $c(e, t)
    }
}
function yl(e, t) {
    e.openElements.tmplCount > 0 ? (e.openElements.popUntilTagNamePopped(Po.TEMPLATE),
        e.activeFormattingElements.clearToLastMarker(),
        e.tmplInsertionModeStack.shift(),
        e._resetInsertionMode(),
        e.onEof(t)) : jc(e, t)
}
function Ll(e, t) {
    var n;
    if (t.tagID === Po.HTML) {
        if (e.fragmentContext || (e.insertionMode = Rc.AFTER_AFTER_BODY),
        e.options.sourceCodeLocationInfo && e.openElements.tagIDs[0] === Po.HTML) {
            e._setEndLocation(e.openElements.items[0], t);
            const r = e.openElements.items[1];
            r && !(null === (n = e.treeAdapter.getNodeSourceCodeLocation(r)) || void 0 === n ? void 0 : n.endTag) && e._setEndLocation(r, t)
        }
    } else
        kl(e, t)
}
function kl(e, t) {
    e.insertionMode = Rc.IN_BODY,
        el(e, t)
}
function vl(e, t) {
    e.insertionMode = Rc.IN_BODY,
        el(e, t)
}
function Dl(e) {
    for (; e.treeAdapter.getNamespaceURI(e.openElements.current) !== vo.HTML && !e._isIntegrationPoint(e.openElements.currentTagId, e.openElements.current); )
        e.openElements.pop()
}
var Rl = Ke((function(e, t) {
        Object.defineProperty(t, "__esModule", {
            value: !0
        }),
            t.escapeText = t.escapeAttribute = t.escapeUTF8 = t.escape = t.encodeXML = t.getCodePoint = t.xmlReplacer = void 0,
            t.xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
        var n = new Map([[34, "&quot;"], [38, "&amp;"], [39, "&apos;"], [60, "&lt;"], [62, "&gt;"]]);
        function r(e) {
            for (var r, i = "", s = 0; null !== (r = t.xmlReplacer.exec(e)); ) {
                var a = r.index
                    , o = e.charCodeAt(a)
                    , c = n.get(o);
                void 0 !== c ? (i += e.substring(s, a) + c,
                    s = a + 1) : (i += "".concat(e.substring(s, a), "&#x").concat((0,
                    t.getCodePoint)(e, a).toString(16), ";"),
                    s = t.xmlReplacer.lastIndex += Number(55296 == (64512 & o)))
            }
            return i + e.substr(s)
        }
        function i(e, t) {
            return function(n) {
                for (var r, i = 0, s = ""; r = e.exec(n); )
                    i !== r.index && (s += n.substring(i, r.index)),
                        s += t.get(r[0].charCodeAt(0)),
                        i = r.index + 1;
                return s + n.substring(i)
            }
        }
        t.getCodePoint = null != String.prototype.codePointAt ? function(e, t) {
                return e.codePointAt(t)
            }
            : function(e, t) {
                return 55296 == (64512 & e.charCodeAt(t)) ? 1024 * (e.charCodeAt(t) - 55296) + e.charCodeAt(t + 1) - 56320 + 65536 : e.charCodeAt(t)
            }
            ,
            t.encodeXML = r,
            t.escape = r,
            t.escapeUTF8 = i(/[&<>'"]/g, n),
            t.escapeAttribute = i(/["&\u00A0]/g, new Map([[34, "&quot;"], [38, "&amp;"], [160, "&nbsp;"]])),
            t.escapeText = i(/[&<>\u00A0]/g, new Map([[38, "&amp;"], [60, "&lt;"], [62, "&gt;"], [160, "&nbsp;"]]))
    }
));
qe(Rl);
var Ml = Rl.escapeText
    , Pl = Rl.escapeAttribute;
Rl.escapeUTF8,
    Rl.escape,
    Rl.encodeXML,
    Rl.getCodePoint,
    Rl.xmlReplacer;
const xl = new Set([Mo.AREA, Mo.BASE, Mo.BASEFONT, Mo.BGSOUND, Mo.BR, Mo.COL, Mo.EMBED, Mo.FRAME, Mo.HR, Mo.IMG, Mo.INPUT, Mo.KEYGEN, Mo.LINK, Mo.META, Mo.PARAM, Mo.SOURCE, Mo.TRACK, Mo.WBR]);
const wl = {
    treeAdapter: Ec,
    scriptingEnabled: !0
};
function Bl(e, t) {
    return Fl(e, {
        ...wl,
        ...t
    })
}
function Fl(e, t) {
    return t.treeAdapter.isElementNode(e) ? function(e, t) {
        const n = t.treeAdapter.getTagName(e);
        return `<${n}${function(e, {treeAdapter: t}) {
            let n = "";
            for (const r of t.getAttrList(e)) {
                if (n += " ",
                    r.namespace)
                    switch (r.namespace) {
                        case vo.XML:
                            n += `xml:${r.name}`;
                            break;
                        case vo.XMLNS:
                            "xmlns" !== r.name && (n += "xmlns:"),
                                n += r.name;
                            break;
                        case vo.XLINK:
                            n += `xlink:${r.name}`;
                            break;
                        default:
                            n += `${r.prefix}:${r.name}`
                    }
                else
                    n += r.name;
                n += `="${Pl(r.value)}"`
            }
            return n
        }(e, t)}>${function(e, t) {
            return t.treeAdapter.isElementNode(e) && t.treeAdapter.getNamespaceURI(e) === vo.HTML && xl.has(t.treeAdapter.getTagName(e))
        }(e, t) ? "" : `${function(e, t) {
            let n = "";
            const r = t.treeAdapter.isElementNode(e) && t.treeAdapter.getTagName(e) === Mo.TEMPLATE && t.treeAdapter.getNamespaceURI(e) === vo.HTML ? t.treeAdapter.getTemplateContent(e) : e
                , i = t.treeAdapter.getChildNodes(r);
            if (i)
                for (const e of i)
                    n += Fl(e, t);
            return n
        }(e, t)}</${n}>`}`
    }(e, t) : t.treeAdapter.isTextNode(e) ? function(e, t) {
        const {treeAdapter: n} = t
            , r = n.getTextNodeContent(e)
            , i = n.getParentNode(e)
            , s = i && n.isElementNode(i) && n.getTagName(i);
        return s && n.getNamespaceURI(i) === vo.HTML && (a = s,
            o = t.scriptingEnabled,
        Yo.has(a) || o && a === Mo.NOSCRIPT) ? r : Ml(r);
        var a, o
    }(e, t) : t.treeAdapter.isCommentNode(e) ? function(e, {treeAdapter: t}) {
        return `\x3c!--${t.getCommentNodeContent(e)}--\x3e`
    }(e, t) : t.treeAdapter.isDocumentTypeNode(e) ? function(e, {treeAdapter: t}) {
        return `<!DOCTYPE ${t.getDocumentTypeNodeName(e)}>`
    }(e, t) : ""
}
function Ul(e) {
    return new m(e)
}
function Hl(e) {
    const t = e.includes('"') ? "'" : '"';
    return t + e + t
}
const Gl = {
    isCommentNode: O,
    isElementNode: I,
    isTextNode: b,
    createDocument() {
        const e = new N([]);
        return e["x-mode"] = Ro.NO_QUIRKS,
            e
    },
    createDocumentFragment: () => new N([]),
    createElement(e, t, n) {
        const r = Object.create(null)
            , i = Object.create(null)
            , s = Object.create(null);
        for (let e = 0; e < n.length; e++) {
            const t = n[e].name;
            r[t] = n[e].value,
                i[t] = n[e].namespace,
                s[t] = n[e].prefix
        }
        const a = new C(e,r,[]);
        return a.namespace = t,
            a["x-attribsNamespace"] = i,
            a["x-attribsPrefix"] = s,
            a
    },
    createCommentNode: e => new T(e),
    appendChild(e, t) {
        const n = e.children[e.children.length - 1];
        n && (n.next = t,
            t.prev = n),
            e.children.push(t),
            t.parent = e
    },
    insertBefore(e, t, n) {
        const r = e.children.indexOf(n)
            , {prev: i} = n;
        i && (i.next = t,
            t.prev = i),
            n.prev = t,
            t.next = n,
            e.children.splice(r, 0, t),
            t.parent = e
    },
    setTemplateContent(e, t) {
        Gl.appendChild(e, t)
    },
    getTemplateContent: e => e.children[0],
    setDocumentType(e, t, n, r) {
        const i = function(e, t, n) {
            let r = "!DOCTYPE ";
            return e && (r += e),
                t ? r += ` PUBLIC ${Hl(t)}` : n && (r += " SYSTEM"),
            n && (r += ` ${Hl(n)}`),
                r
        }(t, n, r);
        let s = e.children.find((e => y(e) && "!doctype" === e.name));
        s ? s.data = null != i ? i : null : (s = new _("!doctype",i),
            Gl.appendChild(e, s)),
            s["x-name"] = null != t ? t : void 0,
            s["x-publicId"] = null != n ? n : void 0,
            s["x-systemId"] = null != r ? r : void 0
    },
    setDocumentMode(e, t) {
        e["x-mode"] = t
    },
    getDocumentMode: e => e["x-mode"],
    detachNode(e) {
        if (e.parent) {
            const t = e.parent.children.indexOf(e)
                , {prev: n, next: r} = e;
            e.prev = null,
                e.next = null,
            n && (n.next = r),
            r && (r.prev = n),
                e.parent.children.splice(t, 1),
                e.parent = null
        }
    },
    insertText(e, t) {
        const n = e.children[e.children.length - 1];
        n && b(n) ? n.data += t : Gl.appendChild(e, Ul(t))
    },
    insertTextBefore(e, t, n) {
        const r = e.children[e.children.indexOf(n) - 1];
        r && b(r) ? r.data += t : Gl.insertBefore(e, Ul(t), n)
    },
    adoptAttributes(e, t) {
        for (let n = 0; n < t.length; n++) {
            const r = t[n].name;
            void 0 === e.attribs[r] && (e.attribs[r] = t[n].value,
                e["x-attribsNamespace"][r] = t[n].namespace,
                e["x-attribsPrefix"][r] = t[n].prefix)
        }
    },
    getFirstChild: e => e.children[0],
    getChildNodes: e => e.children,
    getParentNode: e => e.parent,
    getAttrList: e => e.attributes,
    getTagName: e => e.name,
    getNamespaceURI: e => e.namespace,
    getTextNodeContent: e => e.data,
    getCommentNodeContent: e => e.data,
    getDocumentTypeNodeName(e) {
        var t;
        return null !== (t = e["x-name"]) && void 0 !== t ? t : ""
    },
    getDocumentTypeNodePublicId(e) {
        var t;
        return null !== (t = e["x-publicId"]) && void 0 !== t ? t : ""
    },
    getDocumentTypeNodeSystemId(e) {
        var t;
        return null !== (t = e["x-systemId"]) && void 0 !== t ? t : ""
    },
    isDocumentTypeNode: e => y(e) && "!doctype" === e.name,
    setNodeSourceCodeLocation(e, t) {
        t && (e.startIndex = t.startOffset,
            e.endIndex = t.endOffset),
            e.sourceCodeLocation = t
    },
    getNodeSourceCodeLocation: e => e.sourceCodeLocation,
    updateNodeSourceCodeLocation(e, t) {
        null != t.endOffset && (e.endIndex = t.endOffset),
            e.sourceCodeLocation = {
                ...e.sourceCodeLocation,
                ...t
            }
    }
};
var Yl = function(e, t, n) {
    if (n || 2 === arguments.length)
        for (var r, i = 0, s = t.length; i < s; i++)
            !r && i in t || (r || (r = Array.prototype.slice.call(t, 0, i)),
                r[i] = t[i]);
    return e.concat(r || Array.prototype.slice.call(t))
};
function ql(e, t, n, r) {
    var i = {
        scriptingEnabled: "boolean" != typeof t.scriptingEnabled || t.scriptingEnabled,
        treeAdapter: Gl,
        sourceCodeLocationInfo: t.sourceCodeLocationInfo
    };
    return n ? function(e, t) {
        return wc.parse(e, t)
    }(e, i) : function(e, t, n) {
        "string" == typeof e && (n = t,
            t = e,
            e = null);
        const r = wc.getFragmentParser(e, n);
        return r.tokenizer.write(t, !0),
            r.getFragment()
    }(r, e, i)
}
var Kl, jl, Vl, Wl = {
    treeAdapter: Gl
};
function Ql(e) {
    return e === Kl.Space || e === Kl.NewLine || e === Kl.Tab || e === Kl.FormFeed || e === Kl.CarriageReturn
}
function Xl(e) {
    return e === Kl.Slash || e === Kl.Gt || Ql(e)
}
function $l(e) {
    return e >= Kl.Zero && e <= Kl.Nine
}
!function(e) {
    e[e.Tab = 9] = "Tab",
        e[e.NewLine = 10] = "NewLine",
        e[e.FormFeed = 12] = "FormFeed",
        e[e.CarriageReturn = 13] = "CarriageReturn",
        e[e.Space = 32] = "Space",
        e[e.ExclamationMark = 33] = "ExclamationMark",
        e[e.Num = 35] = "Num",
        e[e.Amp = 38] = "Amp",
        e[e.SingleQuote = 39] = "SingleQuote",
        e[e.DoubleQuote = 34] = "DoubleQuote",
        e[e.Dash = 45] = "Dash",
        e[e.Slash = 47] = "Slash",
        e[e.Zero = 48] = "Zero",
        e[e.Nine = 57] = "Nine",
        e[e.Semi = 59] = "Semi",
        e[e.Lt = 60] = "Lt",
        e[e.Eq = 61] = "Eq",
        e[e.Gt = 62] = "Gt",
        e[e.Questionmark = 63] = "Questionmark",
        e[e.UpperA = 65] = "UpperA",
        e[e.LowerA = 97] = "LowerA",
        e[e.UpperF = 70] = "UpperF",
        e[e.LowerF = 102] = "LowerF",
        e[e.UpperZ = 90] = "UpperZ",
        e[e.LowerZ = 122] = "LowerZ",
        e[e.LowerX = 120] = "LowerX",
        e[e.OpeningSquareBracket = 91] = "OpeningSquareBracket"
}(Kl || (Kl = {})),
    function(e) {
        e[e.Text = 1] = "Text",
            e[e.BeforeTagName = 2] = "BeforeTagName",
            e[e.InTagName = 3] = "InTagName",
            e[e.InSelfClosingTag = 4] = "InSelfClosingTag",
            e[e.BeforeClosingTagName = 5] = "BeforeClosingTagName",
            e[e.InClosingTagName = 6] = "InClosingTagName",
            e[e.AfterClosingTagName = 7] = "AfterClosingTagName",
            e[e.BeforeAttributeName = 8] = "BeforeAttributeName",
            e[e.InAttributeName = 9] = "InAttributeName",
            e[e.AfterAttributeName = 10] = "AfterAttributeName",
            e[e.BeforeAttributeValue = 11] = "BeforeAttributeValue",
            e[e.InAttributeValueDq = 12] = "InAttributeValueDq",
            e[e.InAttributeValueSq = 13] = "InAttributeValueSq",
            e[e.InAttributeValueNq = 14] = "InAttributeValueNq",
            e[e.BeforeDeclaration = 15] = "BeforeDeclaration",
            e[e.InDeclaration = 16] = "InDeclaration",
            e[e.InProcessingInstruction = 17] = "InProcessingInstruction",
            e[e.BeforeComment = 18] = "BeforeComment",
            e[e.CDATASequence = 19] = "CDATASequence",
            e[e.InSpecialComment = 20] = "InSpecialComment",
            e[e.InCommentLike = 21] = "InCommentLike",
            e[e.BeforeSpecialS = 22] = "BeforeSpecialS",
            e[e.SpecialStartSequence = 23] = "SpecialStartSequence",
            e[e.InSpecialTag = 24] = "InSpecialTag",
            e[e.BeforeEntity = 25] = "BeforeEntity",
            e[e.BeforeNumericEntity = 26] = "BeforeNumericEntity",
            e[e.InNamedEntity = 27] = "InNamedEntity",
            e[e.InNumericEntity = 28] = "InNumericEntity",
            e[e.InHexEntity = 29] = "InHexEntity"
    }(jl || (jl = {})),
    function(e) {
        e[e.NoValue = 0] = "NoValue",
            e[e.Unquoted = 1] = "Unquoted",
            e[e.Single = 2] = "Single",
            e[e.Double = 3] = "Double"
    }(Vl || (Vl = {}));
const zl = {
    Cdata: new Uint8Array([67, 68, 65, 84, 65, 91]),
    CdataEnd: new Uint8Array([93, 93, 62]),
    CommentEnd: new Uint8Array([45, 45, 62]),
    ScriptEnd: new Uint8Array([60, 47, 115, 99, 114, 105, 112, 116]),
    StyleEnd: new Uint8Array([60, 47, 115, 116, 121, 108, 101]),
    TitleEnd: new Uint8Array([60, 47, 116, 105, 116, 108, 101])
};
class Jl {
    constructor({xmlMode: e=!1, decodeEntities: t=!0}, n) {
        this.cbs = n,
            this.state = jl.Text,
            this.buffer = "",
            this.sectionStart = 0,
            this.index = 0,
            this.baseState = jl.Text,
            this.isSpecial = !1,
            this.running = !0,
            this.offset = 0,
            this.sequenceIndex = 0,
            this.trieIndex = 0,
            this.trieCurrent = 0,
            this.entityResult = 0,
            this.entityExcess = 0,
            this.xmlMode = e,
            this.decodeEntities = t,
            this.entityTrie = e ? xo : wo
    }
    reset() {
        this.state = jl.Text,
            this.buffer = "",
            this.sectionStart = 0,
            this.index = 0,
            this.baseState = jl.Text,
            this.currentSequence = void 0,
            this.running = !0,
            this.offset = 0
    }
    write(e) {
        this.offset += this.buffer.length,
            this.buffer = e,
            this.parse()
    }
    end() {
        this.running && this.finish()
    }
    pause() {
        this.running = !1
    }
    resume() {
        this.running = !0,
        this.index < this.buffer.length + this.offset && this.parse()
    }
    getIndex() {
        return this.index
    }
    getSectionStart() {
        return this.sectionStart
    }
    stateText(e) {
        e === Kl.Lt || !this.decodeEntities && this.fastForwardTo(Kl.Lt) ? (this.index > this.sectionStart && this.cbs.ontext(this.sectionStart, this.index),
            this.state = jl.BeforeTagName,
            this.sectionStart = this.index) : this.decodeEntities && e === Kl.Amp && (this.state = jl.BeforeEntity)
    }
    stateSpecialStartSequence(e) {
        const t = this.sequenceIndex === this.currentSequence.length;
        if (t ? Xl(e) : (32 | e) === this.currentSequence[this.sequenceIndex]) {
            if (!t)
                return void this.sequenceIndex++
        } else
            this.isSpecial = !1;
        this.sequenceIndex = 0,
            this.state = jl.InTagName,
            this.stateInTagName(e)
    }
    stateInSpecialTag(e) {
        if (this.sequenceIndex === this.currentSequence.length) {
            if (e === Kl.Gt || Ql(e)) {
                const t = this.index - this.currentSequence.length;
                if (this.sectionStart < t) {
                    const e = this.index;
                    this.index = t,
                        this.cbs.ontext(this.sectionStart, t),
                        this.index = e
                }
                return this.isSpecial = !1,
                    this.sectionStart = t + 2,
                    void this.stateInClosingTagName(e)
            }
            this.sequenceIndex = 0
        }
        (32 | e) === this.currentSequence[this.sequenceIndex] ? this.sequenceIndex += 1 : 0 === this.sequenceIndex ? this.currentSequence === zl.TitleEnd ? this.decodeEntities && e === Kl.Amp && (this.state = jl.BeforeEntity) : this.fastForwardTo(Kl.Lt) && (this.sequenceIndex = 1) : this.sequenceIndex = Number(e === Kl.Lt)
    }
    stateCDATASequence(e) {
        e === zl.Cdata[this.sequenceIndex] ? ++this.sequenceIndex === zl.Cdata.length && (this.state = jl.InCommentLike,
            this.currentSequence = zl.CdataEnd,
            this.sequenceIndex = 0,
            this.sectionStart = this.index + 1) : (this.sequenceIndex = 0,
            this.state = jl.InDeclaration,
            this.stateInDeclaration(e))
    }
    fastForwardTo(e) {
        for (; ++this.index < this.buffer.length + this.offset; )
            if (this.buffer.charCodeAt(this.index - this.offset) === e)
                return !0;
        return this.index = this.buffer.length + this.offset - 1,
            !1
    }
    stateInCommentLike(e) {
        e === this.currentSequence[this.sequenceIndex] ? ++this.sequenceIndex === this.currentSequence.length && (this.currentSequence === zl.CdataEnd ? this.cbs.oncdata(this.sectionStart, this.index, 2) : this.cbs.oncomment(this.sectionStart, this.index, 2),
            this.sequenceIndex = 0,
            this.sectionStart = this.index + 1,
            this.state = jl.Text) : 0 === this.sequenceIndex ? this.fastForwardTo(this.currentSequence[0]) && (this.sequenceIndex = 1) : e !== this.currentSequence[this.sequenceIndex - 1] && (this.sequenceIndex = 0)
    }
    isTagStartChar(e) {
        return this.xmlMode ? !Xl(e) : function(e) {
            return e >= Kl.LowerA && e <= Kl.LowerZ || e >= Kl.UpperA && e <= Kl.UpperZ
        }(e)
    }
    startSpecial(e, t) {
        this.isSpecial = !0,
            this.currentSequence = e,
            this.sequenceIndex = t,
            this.state = jl.SpecialStartSequence
    }
    stateBeforeTagName(e) {
        if (e === Kl.ExclamationMark)
            this.state = jl.BeforeDeclaration,
                this.sectionStart = this.index + 1;
        else if (e === Kl.Questionmark)
            this.state = jl.InProcessingInstruction,
                this.sectionStart = this.index + 1;
        else if (this.isTagStartChar(e)) {
            const t = 32 | e;
            this.sectionStart = this.index,
                this.xmlMode || t !== zl.TitleEnd[2] ? this.state = this.xmlMode || t !== zl.ScriptEnd[2] ? jl.InTagName : jl.BeforeSpecialS : this.startSpecial(zl.TitleEnd, 3)
        } else
            e === Kl.Slash ? this.state = jl.BeforeClosingTagName : (this.state = jl.Text,
                this.stateText(e))
    }
    stateInTagName(e) {
        Xl(e) && (this.cbs.onopentagname(this.sectionStart, this.index),
            this.sectionStart = -1,
            this.state = jl.BeforeAttributeName,
            this.stateBeforeAttributeName(e))
    }
    stateBeforeClosingTagName(e) {
        Ql(e) || (e === Kl.Gt ? this.state = jl.Text : (this.state = this.isTagStartChar(e) ? jl.InClosingTagName : jl.InSpecialComment,
            this.sectionStart = this.index))
    }
    stateInClosingTagName(e) {
        (e === Kl.Gt || Ql(e)) && (this.cbs.onclosetag(this.sectionStart, this.index),
            this.sectionStart = -1,
            this.state = jl.AfterClosingTagName,
            this.stateAfterClosingTagName(e))
    }
    stateAfterClosingTagName(e) {
        (e === Kl.Gt || this.fastForwardTo(Kl.Gt)) && (this.state = jl.Text,
            this.sectionStart = this.index + 1)
    }
    stateBeforeAttributeName(e) {
        e === Kl.Gt ? (this.cbs.onopentagend(this.index),
            this.isSpecial ? (this.state = jl.InSpecialTag,
                this.sequenceIndex = 0) : this.state = jl.Text,
            this.baseState = this.state,
            this.sectionStart = this.index + 1) : e === Kl.Slash ? this.state = jl.InSelfClosingTag : Ql(e) || (this.state = jl.InAttributeName,
            this.sectionStart = this.index)
    }
    stateInSelfClosingTag(e) {
        e === Kl.Gt ? (this.cbs.onselfclosingtag(this.index),
            this.state = jl.Text,
            this.baseState = jl.Text,
            this.sectionStart = this.index + 1,
            this.isSpecial = !1) : Ql(e) || (this.state = jl.BeforeAttributeName,
            this.stateBeforeAttributeName(e))
    }
    stateInAttributeName(e) {
        (e === Kl.Eq || Xl(e)) && (this.cbs.onattribname(this.sectionStart, this.index),
            this.sectionStart = -1,
            this.state = jl.AfterAttributeName,
            this.stateAfterAttributeName(e))
    }
    stateAfterAttributeName(e) {
        e === Kl.Eq ? this.state = jl.BeforeAttributeValue : e === Kl.Slash || e === Kl.Gt ? (this.cbs.onattribend(Vl.NoValue, this.index),
            this.state = jl.BeforeAttributeName,
            this.stateBeforeAttributeName(e)) : Ql(e) || (this.cbs.onattribend(Vl.NoValue, this.index),
            this.state = jl.InAttributeName,
            this.sectionStart = this.index)
    }
    stateBeforeAttributeValue(e) {
        e === Kl.DoubleQuote ? (this.state = jl.InAttributeValueDq,
            this.sectionStart = this.index + 1) : e === Kl.SingleQuote ? (this.state = jl.InAttributeValueSq,
            this.sectionStart = this.index + 1) : Ql(e) || (this.sectionStart = this.index,
            this.state = jl.InAttributeValueNq,
            this.stateInAttributeValueNoQuotes(e))
    }
    handleInAttributeValue(e, t) {
        e === t || !this.decodeEntities && this.fastForwardTo(t) ? (this.cbs.onattribdata(this.sectionStart, this.index),
            this.sectionStart = -1,
            this.cbs.onattribend(t === Kl.DoubleQuote ? Vl.Double : Vl.Single, this.index),
            this.state = jl.BeforeAttributeName) : this.decodeEntities && e === Kl.Amp && (this.baseState = this.state,
            this.state = jl.BeforeEntity)
    }
    stateInAttributeValueDoubleQuotes(e) {
        this.handleInAttributeValue(e, Kl.DoubleQuote)
    }
    stateInAttributeValueSingleQuotes(e) {
        this.handleInAttributeValue(e, Kl.SingleQuote)
    }
    stateInAttributeValueNoQuotes(e) {
        Ql(e) || e === Kl.Gt ? (this.cbs.onattribdata(this.sectionStart, this.index),
            this.sectionStart = -1,
            this.cbs.onattribend(Vl.Unquoted, this.index),
            this.state = jl.BeforeAttributeName,
            this.stateBeforeAttributeName(e)) : this.decodeEntities && e === Kl.Amp && (this.baseState = this.state,
            this.state = jl.BeforeEntity)
    }
    stateBeforeDeclaration(e) {
        e === Kl.OpeningSquareBracket ? (this.state = jl.CDATASequence,
            this.sequenceIndex = 0) : this.state = e === Kl.Dash ? jl.BeforeComment : jl.InDeclaration
    }
    stateInDeclaration(e) {
        (e === Kl.Gt || this.fastForwardTo(Kl.Gt)) && (this.cbs.ondeclaration(this.sectionStart, this.index),
            this.state = jl.Text,
            this.sectionStart = this.index + 1)
    }
    stateInProcessingInstruction(e) {
        (e === Kl.Gt || this.fastForwardTo(Kl.Gt)) && (this.cbs.onprocessinginstruction(this.sectionStart, this.index),
            this.state = jl.Text,
            this.sectionStart = this.index + 1)
    }
    stateBeforeComment(e) {
        e === Kl.Dash ? (this.state = jl.InCommentLike,
            this.currentSequence = zl.CommentEnd,
            this.sequenceIndex = 2,
            this.sectionStart = this.index + 1) : this.state = jl.InDeclaration
    }
    stateInSpecialComment(e) {
        (e === Kl.Gt || this.fastForwardTo(Kl.Gt)) && (this.cbs.oncomment(this.sectionStart, this.index, 0),
            this.state = jl.Text,
            this.sectionStart = this.index + 1)
    }
    stateBeforeSpecialS(e) {
        const t = 32 | e;
        t === zl.ScriptEnd[3] ? this.startSpecial(zl.ScriptEnd, 4) : t === zl.StyleEnd[3] ? this.startSpecial(zl.StyleEnd, 4) : (this.state = jl.InTagName,
            this.stateInTagName(e))
    }
    stateBeforeEntity(e) {
        this.entityExcess = 1,
            this.entityResult = 0,
            e === Kl.Num ? this.state = jl.BeforeNumericEntity : e === Kl.Amp || (this.trieIndex = 0,
                this.trieCurrent = this.entityTrie[0],
                this.state = jl.InNamedEntity,
                this.stateInNamedEntity(e))
    }
    stateInNamedEntity(e) {
        if (this.entityExcess += 1,
            this.trieIndex = Oo(this.entityTrie, this.trieCurrent, this.trieIndex + 1, e),
        this.trieIndex < 0)
            return this.emitNamedEntity(),
                void this.index--;
        this.trieCurrent = this.entityTrie[this.trieIndex];
        const t = this.trieCurrent & yo.VALUE_LENGTH;
        if (t) {
            const n = (t >> 14) - 1;
            if (this.allowLegacyEntity() || e === Kl.Semi) {
                const e = this.index - this.entityExcess + 1;
                e > this.sectionStart && this.emitPartial(this.sectionStart, e),
                    this.entityResult = this.trieIndex,
                    this.trieIndex += n,
                    this.entityExcess = 0,
                    this.sectionStart = this.index + 1,
                0 === n && this.emitNamedEntity()
            } else
                this.trieIndex += n
        }
    }
    emitNamedEntity() {
        if (this.state = this.baseState,
        0 === this.entityResult)
            return;
        switch ((this.entityTrie[this.entityResult] & yo.VALUE_LENGTH) >> 14) {
            case 1:
                this.emitCodePoint(this.entityTrie[this.entityResult] & ~yo.VALUE_LENGTH);
                break;
            case 2:
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]);
                break;
            case 3:
                this.emitCodePoint(this.entityTrie[this.entityResult + 1]),
                    this.emitCodePoint(this.entityTrie[this.entityResult + 2])
        }
    }
    stateBeforeNumericEntity(e) {
        (32 | e) === Kl.LowerX ? (this.entityExcess++,
            this.state = jl.InHexEntity) : (this.state = jl.InNumericEntity,
            this.stateInNumericEntity(e))
    }
    emitNumericEntity(e) {
        const t = this.index - this.entityExcess - 1;
        t + 2 + Number(this.state === jl.InHexEntity) !== this.index && (t > this.sectionStart && this.emitPartial(this.sectionStart, t),
            this.sectionStart = this.index + Number(e),
            this.emitCodePoint(ko(this.entityResult))),
            this.state = this.baseState
    }
    stateInNumericEntity(e) {
        e === Kl.Semi ? this.emitNumericEntity(!0) : $l(e) ? (this.entityResult = 10 * this.entityResult + (e - Kl.Zero),
            this.entityExcess++) : (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState,
            this.index--)
    }
    stateInHexEntity(e) {
        e === Kl.Semi ? this.emitNumericEntity(!0) : $l(e) ? (this.entityResult = 16 * this.entityResult + (e - Kl.Zero),
            this.entityExcess++) : !function(e) {
            return e >= Kl.UpperA && e <= Kl.UpperF || e >= Kl.LowerA && e <= Kl.LowerF
        }(e) ? (this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state = this.baseState,
            this.index--) : (this.entityResult = 16 * this.entityResult + ((32 | e) - Kl.LowerA + 10),
            this.entityExcess++)
    }
    allowLegacyEntity() {
        return !this.xmlMode && (this.baseState === jl.Text || this.baseState === jl.InSpecialTag)
    }
    cleanup() {
        this.running && this.sectionStart !== this.index && (this.state === jl.Text || this.state === jl.InSpecialTag && 0 === this.sequenceIndex ? (this.cbs.ontext(this.sectionStart, this.index),
            this.sectionStart = this.index) : this.state !== jl.InAttributeValueDq && this.state !== jl.InAttributeValueSq && this.state !== jl.InAttributeValueNq || (this.cbs.onattribdata(this.sectionStart, this.index),
            this.sectionStart = this.index))
    }
    shouldContinue() {
        return this.index < this.buffer.length + this.offset && this.running
    }
    parse() {
        for (; this.shouldContinue(); ) {
            const e = this.buffer.charCodeAt(this.index - this.offset);
            this.state === jl.Text ? this.stateText(e) : this.state === jl.SpecialStartSequence ? this.stateSpecialStartSequence(e) : this.state === jl.InSpecialTag ? this.stateInSpecialTag(e) : this.state === jl.CDATASequence ? this.stateCDATASequence(e) : this.state === jl.InAttributeValueDq ? this.stateInAttributeValueDoubleQuotes(e) : this.state === jl.InAttributeName ? this.stateInAttributeName(e) : this.state === jl.InCommentLike ? this.stateInCommentLike(e) : this.state === jl.InSpecialComment ? this.stateInSpecialComment(e) : this.state === jl.BeforeAttributeName ? this.stateBeforeAttributeName(e) : this.state === jl.InTagName ? this.stateInTagName(e) : this.state === jl.InClosingTagName ? this.stateInClosingTagName(e) : this.state === jl.BeforeTagName ? this.stateBeforeTagName(e) : this.state === jl.AfterAttributeName ? this.stateAfterAttributeName(e) : this.state === jl.InAttributeValueSq ? this.stateInAttributeValueSingleQuotes(e) : this.state === jl.BeforeAttributeValue ? this.stateBeforeAttributeValue(e) : this.state === jl.BeforeClosingTagName ? this.stateBeforeClosingTagName(e) : this.state === jl.AfterClosingTagName ? this.stateAfterClosingTagName(e) : this.state === jl.BeforeSpecialS ? this.stateBeforeSpecialS(e) : this.state === jl.InAttributeValueNq ? this.stateInAttributeValueNoQuotes(e) : this.state === jl.InSelfClosingTag ? this.stateInSelfClosingTag(e) : this.state === jl.InDeclaration ? this.stateInDeclaration(e) : this.state === jl.BeforeDeclaration ? this.stateBeforeDeclaration(e) : this.state === jl.BeforeComment ? this.stateBeforeComment(e) : this.state === jl.InProcessingInstruction ? this.stateInProcessingInstruction(e) : this.state === jl.InNamedEntity ? this.stateInNamedEntity(e) : this.state === jl.BeforeEntity ? this.stateBeforeEntity(e) : this.state === jl.InHexEntity ? this.stateInHexEntity(e) : this.state === jl.InNumericEntity ? this.stateInNumericEntity(e) : this.stateBeforeNumericEntity(e),
                this.index++
        }
        this.cleanup()
    }
    finish() {
        this.state === jl.InNamedEntity && this.emitNamedEntity(),
        this.sectionStart < this.index && this.handleTrailingData(),
            this.cbs.onend()
    }
    handleTrailingData() {
        const e = this.buffer.length + this.offset;
        this.state === jl.InCommentLike ? this.currentSequence === zl.CdataEnd ? this.cbs.oncdata(this.sectionStart, e, 0) : this.cbs.oncomment(this.sectionStart, e, 0) : this.state === jl.InNumericEntity && this.allowLegacyEntity() || this.state === jl.InHexEntity && this.allowLegacyEntity() ? this.emitNumericEntity(!1) : this.state === jl.InTagName || this.state === jl.BeforeAttributeName || this.state === jl.BeforeAttributeValue || this.state === jl.AfterAttributeName || this.state === jl.InAttributeName || this.state === jl.InAttributeValueSq || this.state === jl.InAttributeValueDq || this.state === jl.InAttributeValueNq || this.state === jl.InClosingTagName || this.cbs.ontext(this.sectionStart, e)
    }
    emitPartial(e, t) {
        this.baseState !== jl.Text && this.baseState !== jl.InSpecialTag ? this.cbs.onattribdata(e, t) : this.cbs.ontext(e, t)
    }
    emitCodePoint(e) {
        this.baseState !== jl.Text && this.baseState !== jl.InSpecialTag ? this.cbs.onattribentity(e) : this.cbs.ontextentity(e)
    }
}
const Zl = new Set(["input", "option", "optgroup", "select", "button", "datalist", "textarea"])
    , eh = new Set(["p"])
    , th = new Set(["thead", "tbody"])
    , nh = new Set(["dd", "dt"])
    , rh = new Set(["rt", "rp"])
    , ih = new Map([["tr", new Set(["tr", "th", "td"])], ["th", new Set(["th"])], ["td", new Set(["thead", "th", "td"])], ["body", new Set(["head", "link", "script"])], ["li", new Set(["li"])], ["p", eh], ["h1", eh], ["h2", eh], ["h3", eh], ["h4", eh], ["h5", eh], ["h6", eh], ["select", Zl], ["input", Zl], ["output", Zl], ["button", Zl], ["datalist", Zl], ["textarea", Zl], ["option", new Set(["option"])], ["optgroup", new Set(["optgroup", "option"])], ["dd", nh], ["dt", nh], ["address", eh], ["article", eh], ["aside", eh], ["blockquote", eh], ["details", eh], ["div", eh], ["dl", eh], ["fieldset", eh], ["figcaption", eh], ["figure", eh], ["footer", eh], ["form", eh], ["header", eh], ["hr", eh], ["main", eh], ["nav", eh], ["ol", eh], ["pre", eh], ["section", eh], ["table", eh], ["ul", eh], ["rt", rh], ["rp", rh], ["tbody", th], ["tfoot", th]])
    , sh = new Set(["area", "base", "basefont", "br", "col", "command", "embed", "frame", "hr", "img", "input", "isindex", "keygen", "link", "meta", "param", "source", "track", "wbr"])
    , ah = new Set(["math", "svg"])
    , oh = new Set(["mi", "mo", "mn", "ms", "mtext", "annotation-xml", "foreignobject", "desc", "title"])
    , ch = /\s|\//;
class lh {
    constructor(e, t={}) {
        var n, r, i, s, a;
        this.options = t,
            this.startIndex = 0,
            this.endIndex = 0,
            this.openTagStart = 0,
            this.tagname = "",
            this.attribname = "",
            this.attribvalue = "",
            this.attribs = null,
            this.stack = [],
            this.foreignContext = [],
            this.buffers = [],
            this.bufferOffset = 0,
            this.writeIndex = 0,
            this.ended = !1,
            this.cbs = null != e ? e : {},
            this.lowerCaseTagNames = null !== (n = t.lowerCaseTags) && void 0 !== n ? n : !t.xmlMode,
            this.lowerCaseAttributeNames = null !== (r = t.lowerCaseAttributeNames) && void 0 !== r ? r : !t.xmlMode,
            this.tokenizer = new (null !== (i = t.Tokenizer) && void 0 !== i ? i : Jl)(this.options,this),
        null === (a = (s = this.cbs).onparserinit) || void 0 === a || a.call(s, this)
    }
    ontext(e, t) {
        var n, r;
        const i = this.getSlice(e, t);
        this.endIndex = t - 1,
        null === (r = (n = this.cbs).ontext) || void 0 === r || r.call(n, i),
            this.startIndex = t
    }
    ontextentity(e) {
        var t, n;
        const r = this.tokenizer.getSectionStart();
        this.endIndex = r - 1,
        null === (n = (t = this.cbs).ontext) || void 0 === n || n.call(t, Lo(e)),
            this.startIndex = r
    }
    isVoidElement(e) {
        return !this.options.xmlMode && sh.has(e)
    }
    onopentagname(e, t) {
        this.endIndex = t;
        let n = this.getSlice(e, t);
        this.lowerCaseTagNames && (n = n.toLowerCase()),
            this.emitOpenTag(n)
    }
    emitOpenTag(e) {
        var t, n, r, i;
        this.openTagStart = this.startIndex,
            this.tagname = e;
        const s = !this.options.xmlMode && ih.get(e);
        if (s)
            for (; this.stack.length > 0 && s.has(this.stack[this.stack.length - 1]); ) {
                const e = this.stack.pop();
                null === (n = (t = this.cbs).onclosetag) || void 0 === n || n.call(t, e, !0)
            }
        this.isVoidElement(e) || (this.stack.push(e),
            ah.has(e) ? this.foreignContext.push(!0) : oh.has(e) && this.foreignContext.push(!1)),
        null === (i = (r = this.cbs).onopentagname) || void 0 === i || i.call(r, e),
        this.cbs.onopentag && (this.attribs = {})
    }
    endOpenTag(e) {
        var t, n;
        this.startIndex = this.openTagStart,
        this.attribs && (null === (n = (t = this.cbs).onopentag) || void 0 === n || n.call(t, this.tagname, this.attribs, e),
            this.attribs = null),
        this.cbs.onclosetag && this.isVoidElement(this.tagname) && this.cbs.onclosetag(this.tagname, !0),
            this.tagname = ""
    }
    onopentagend(e) {
        this.endIndex = e,
            this.endOpenTag(!1),
            this.startIndex = e + 1
    }
    onclosetag(e, t) {
        var n, r, i, s, a, o;
        this.endIndex = t;
        let c = this.getSlice(e, t);
        if (this.lowerCaseTagNames && (c = c.toLowerCase()),
        (ah.has(c) || oh.has(c)) && this.foreignContext.pop(),
            this.isVoidElement(c))
            this.options.xmlMode || "br" !== c || (null === (r = (n = this.cbs).onopentagname) || void 0 === r || r.call(n, "br"),
            null === (s = (i = this.cbs).onopentag) || void 0 === s || s.call(i, "br", {}, !0),
            null === (o = (a = this.cbs).onclosetag) || void 0 === o || o.call(a, "br", !1));
        else {
            const e = this.stack.lastIndexOf(c);
            if (-1 !== e)
                if (this.cbs.onclosetag) {
                    let t = this.stack.length - e;
                    for (; t--; )
                        this.cbs.onclosetag(this.stack.pop(), 0 !== t)
                } else
                    this.stack.length = e;
            else
                this.options.xmlMode || "p" !== c || (this.emitOpenTag("p"),
                    this.closeCurrentTag(!0))
        }
        this.startIndex = t + 1
    }
    onselfclosingtag(e) {
        this.endIndex = e,
            this.options.xmlMode || this.options.recognizeSelfClosing || this.foreignContext[this.foreignContext.length - 1] ? (this.closeCurrentTag(!1),
                this.startIndex = e + 1) : this.onopentagend(e)
    }
    closeCurrentTag(e) {
        var t, n;
        const r = this.tagname;
        this.endOpenTag(e),
        this.stack[this.stack.length - 1] === r && (null === (n = (t = this.cbs).onclosetag) || void 0 === n || n.call(t, r, !e),
            this.stack.pop())
    }
    onattribname(e, t) {
        this.startIndex = e;
        const n = this.getSlice(e, t);
        this.attribname = this.lowerCaseAttributeNames ? n.toLowerCase() : n
    }
    onattribdata(e, t) {
        this.attribvalue += this.getSlice(e, t)
    }
    onattribentity(e) {
        this.attribvalue += Lo(e)
    }
    onattribend(e, t) {
        var n, r;
        this.endIndex = t,
        null === (r = (n = this.cbs).onattribute) || void 0 === r || r.call(n, this.attribname, this.attribvalue, e === Vl.Double ? '"' : e === Vl.Single ? "'" : e === Vl.NoValue ? void 0 : null),
        this.attribs && !Object.prototype.hasOwnProperty.call(this.attribs, this.attribname) && (this.attribs[this.attribname] = this.attribvalue),
            this.attribvalue = ""
    }
    getInstructionName(e) {
        const t = e.search(ch);
        let n = t < 0 ? e : e.substr(0, t);
        return this.lowerCaseTagNames && (n = n.toLowerCase()),
            n
    }
    ondeclaration(e, t) {
        this.endIndex = t;
        const n = this.getSlice(e, t);
        if (this.cbs.onprocessinginstruction) {
            const e = this.getInstructionName(n);
            this.cbs.onprocessinginstruction(`!${e}`, `!${n}`)
        }
        this.startIndex = t + 1
    }
    onprocessinginstruction(e, t) {
        this.endIndex = t;
        const n = this.getSlice(e, t);
        if (this.cbs.onprocessinginstruction) {
            const e = this.getInstructionName(n);
            this.cbs.onprocessinginstruction(`?${e}`, `?${n}`)
        }
        this.startIndex = t + 1
    }
    oncomment(e, t, n) {
        var r, i, s, a;
        this.endIndex = t,
        null === (i = (r = this.cbs).oncomment) || void 0 === i || i.call(r, this.getSlice(e, t - n)),
        null === (a = (s = this.cbs).oncommentend) || void 0 === a || a.call(s),
            this.startIndex = t + 1
    }
    oncdata(e, t, n) {
        var r, i, s, a, o, c, l, h, u, p;
        this.endIndex = t;
        const f = this.getSlice(e, t - n);
        this.options.xmlMode || this.options.recognizeCDATA ? (null === (i = (r = this.cbs).oncdatastart) || void 0 === i || i.call(r),
        null === (a = (s = this.cbs).ontext) || void 0 === a || a.call(s, f),
        null === (c = (o = this.cbs).oncdataend) || void 0 === c || c.call(o)) : (null === (h = (l = this.cbs).oncomment) || void 0 === h || h.call(l, `[CDATA[${f}]]`),
        null === (p = (u = this.cbs).oncommentend) || void 0 === p || p.call(u)),
            this.startIndex = t + 1
    }
    onend() {
        var e, t;
        if (this.cbs.onclosetag) {
            this.endIndex = this.startIndex;
            for (let e = this.stack.length; e > 0; this.cbs.onclosetag(this.stack[--e], !0))
                ;
        }
        null === (t = (e = this.cbs).onend) || void 0 === t || t.call(e)
    }
    reset() {
        var e, t, n, r;
        null === (t = (e = this.cbs).onreset) || void 0 === t || t.call(e),
            this.tokenizer.reset(),
            this.tagname = "",
            this.attribname = "",
            this.attribs = null,
            this.stack.length = 0,
            this.startIndex = 0,
            this.endIndex = 0,
        null === (r = (n = this.cbs).onparserinit) || void 0 === r || r.call(n, this),
            this.buffers.length = 0,
            this.bufferOffset = 0,
            this.writeIndex = 0,
            this.ended = !1
    }
    parseComplete(e) {
        this.reset(),
            this.end(e)
    }
    getSlice(e, t) {
        for (; e - this.bufferOffset >= this.buffers[0].length; )
            this.shiftBuffer();
        let n = this.buffers[0].slice(e - this.bufferOffset, t - this.bufferOffset);
        for (; t - this.bufferOffset > this.buffers[0].length; )
            this.shiftBuffer(),
                n += this.buffers[0].slice(0, t - this.bufferOffset);
        return n
    }
    shiftBuffer() {
        this.bufferOffset += this.buffers[0].length,
            this.writeIndex--,
            this.buffers.shift()
    }
    write(e) {
        var t, n;
        this.ended ? null === (n = (t = this.cbs).onerror) || void 0 === n || n.call(t, new Error(".write() after done!")) : (this.buffers.push(e),
        this.tokenizer.running && (this.tokenizer.write(e),
            this.writeIndex++))
    }
    end(e) {
        var t, n;
        this.ended ? null === (n = (t = this.cbs).onerror) || void 0 === n || n.call(t, Error(".end() after done!")) : (e && this.write(e),
            this.ended = !0,
            this.tokenizer.end())
    }
    pause() {
        this.tokenizer.pause()
    }
    resume() {
        for (this.tokenizer.resume(); this.tokenizer.running && this.writeIndex < this.buffers.length; )
            this.tokenizer.write(this.buffers[this.writeIndex++]);
        this.ended && this.tokenizer.end()
    }
    parseChunk(e) {
        this.write(e)
    }
    done(e) {
        this.end(e)
    }
}
var hh = function(e) {
    return function(t, n, r, i) {
        if ("undefined" != typeof Buffer && Buffer.isBuffer(t) && (t = t.toString()),
        "string" == typeof t)
            return e(t, n, r, i);
        var s = t;
        if (!Array.isArray(s) && L(s))
            return s;
        var a = new N([]);
        return Ba(s, a),
            a
    }
}((function(e, t, n, r) {
        return t.xmlMode || t._useHtmlParser2 ? function(e, t) {
            const n = new M(void 0,t);
            return new lh(n,t).end(e),
                n.root
        }(e, t) : ql(e, t, n, r)
    }
))
    , uh = function(e, t) {
    return function r(s, a, o) {
        if (void 0 === o && (o = !0),
        null == s)
            throw new Error("cheerio.load() expects a string");
        var c = no(no({}, n), i(a))
            , l = e(s, c, o, null)
            , h = function(n) {
            function r() {
                return null !== n && n.apply(this, arguments) || this
            }
            return to(r, n),
                r.prototype._make = function(e, t) {
                    var n = u(e, t);
                    return n.prevObject = this,
                        n
                }
                ,
                r.prototype._parse = function(t, n, r, i) {
                    return e(t, n, r, i)
                }
                ,
                r.prototype._render = function(e) {
                    return t(e, this.options)
                }
                ,
                r
        }(Za);
        function u(t, n, r, s) {
            if (void 0 === r && (r = l),
            t && wi(t))
                return t;
            var a = no(no({}, c), i(s))
                , o = "string" == typeof r ? [e(r, a, !1, null)] : "length"in r ? r : [r]
                , u = wi(o) ? o : new h(o,null,a);
            if (u._root = u,
                !t)
                return new h(void 0,u,a);
            var p, f = "string" == typeof t && Ui(t) ? e(t, a, !1, null).children : (p = t).name || "root" === p.type || "text" === p.type || "comment" === p.type ? [t] : Array.isArray(t) ? t : void 0, d = new h(f,u,a);
            if (f)
                return d;
            if ("string" != typeof t)
                throw new Error("Unexpected type of selector");
            var E = t
                , m = n ? "string" == typeof n ? Ui(n) ? new h([e(n, a, !1, null)],u,a) : (E = "".concat(n, " ").concat(E),
                u) : wi(n) ? n : new h(Array.isArray(n) ? n : [n],u,a) : u;
            return m ? m.find(E) : d
        }
        return Object.assign(u, xi, {
            load: r,
            _root: l,
            _options: c,
            fn: h.prototype,
            prototype: h.prototype
        }),
            u
    }
}(hh, (function(e, t) {
        return t.xmlMode || t._useHtmlParser2 ? V(e, t) : function(e) {
            for (var t, n = ("length"in e ? e : [e]), r = 0; r < n.length; r += 1)
                L(s = n[r]) && (t = Array.prototype.splice).call.apply(t, Yl([n, r, 1], s.children, !1));
            var i = "";
            for (r = 0; r < n.length; r += 1) {
                var s;
                i += Bl(s = n[r], Wl)
            }
            return i
        }(e)
    }
));
function ph(e, t) {
    return He({
        path: e,
        json: t
    })
}
function fh(e) {
    return He(e)
}
function dh(e, t) {
    return Ii(e, t)
}
var Eh = uh([])
    , mh = Di
    , Th = Ri
    , _h = ki
    , Ah = vi;
export {mh as contains, Eh as default, Oi as html, dh as jinja2, ph as jp, fh as jpo, uh as load, Th as merge, _h as parseHTML, Ah as root, Li as text, yi as xml};

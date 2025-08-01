!function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).JSONPath = {})
}(this, function (e) {
    "use strict";

    function n(e, t, r) {
        return t = l(t),
            function (e, t) {
                {
                    if (t && ("object" == typeof t || "function" == typeof t))
                        return t;
                    if (void 0 !== t)
                        throw new TypeError("Derived constructors may only return object or undefined")
                }
                return function (e) {
                    if (void 0 !== e)
                        return e;
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
                }(e)
            }(e, i() ? Reflect.construct(t, r || [], l(e).constructor) : t.apply(e, r))
    }

    function o(e, t, r) {
        if (i())
            return Reflect.construct.apply(null, arguments);
        var n = [null];
        n.push.apply(n, t);
        n = new (e.bind.apply(e, n));
        return r && h(n, r.prototype),
            n
    }

    function i() {
        try {
            var e = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {
            }))
        } catch (e) {
        }
        return (i = function () {
                return !!e
            }
        )()
    }

    function t(t, e) {
        var r, n = Object.keys(t);
        return Object.getOwnPropertySymbols && (r = Object.getOwnPropertySymbols(t),
        e && (r = r.filter(function (e) {
            return Object.getOwnPropertyDescriptor(t, e).enumerable
        })),
            n.push.apply(n, r)),
            n
    }

    function r(n) {
        for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {};
            e % 2 ? t(Object(i), !0).forEach(function (e) {
                var t, r;
                t = n,
                    e = i[r = e],
                    (r = a(r)) in t ? Object.defineProperty(t, r, {
                        value: e,
                        enumerable: !0,
                        configurable: !0,
                        writable: !0
                    }) : t[r] = e
            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(i)) : t(Object(i)).forEach(function (e) {
                Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(i, e))
            })
        }
        return n
    }

    function a(e) {
        e = function (e, t) {
            if ("object" != typeof e || !e)
                return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 === r)
                return ("string" === t ? String : Number)(e);
            if ("object" != typeof (t = r.call(e, t || "default")))
                return t;
            throw new TypeError("@@toPrimitive must return a primitive value.")
        }(e, "string");
        return "symbol" == typeof e ? e : e + ""
    }

    function C(e) {
        return (C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                    return typeof e
                }
                : function (e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                }
        )(e)
    }

    function s(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function")
    }

    function u(e, t) {
        for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1,
                n.configurable = !0,
            "value" in n && (n.writable = !0),
                Object.defineProperty(e, a(n.key), n)
        }
    }

    function c(e, t, r) {
        return t && u(e.prototype, t),
        r && u(e, r),
            Object.defineProperty(e, "prototype", {
                writable: !1
            }),
            e
    }

    function l(e) {
        return (l = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
        )(e)
    }

    function h(e, t) {
        return (h = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (e, t) {
                return e.__proto__ = t,
                    e
            }
        )(e, t)
    }

    function p(e) {
        var r = "function" == typeof Map ? new Map : void 0;
        return (p = function (e) {
                if (null === e || !function (t) {
                    try {
                        return -1 !== Function.toString.call(t).indexOf("[native code]")
                    } catch (e) {
                        return "function" == typeof t
                    }
                }(e))
                    return e;
                if ("function" != typeof e)
                    throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== r) {
                    if (r.has(e))
                        return r.get(e);
                    r.set(e, t)
                }

                function t() {
                    return o(e, arguments, l(this).constructor)
                }

                return t.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    h(t, e)
            }
        )(e)
    }

    function f(e) {
        return function (e) {
            if (Array.isArray(e))
                return d(e)
        }(e) || function (e) {
            if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"])
                return Array.from(e)
        }(e) || O(e) || function () {
            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }()
    }

    function O(e, t) {
        if (e) {
            if ("string" == typeof e)
                return d(e, t);
            var r = Object.prototype.toString.call(e).slice(8, -1);
            return "Object" === r && e.constructor && (r = e.constructor.name),
                "Map" === r || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? d(e, t) : void 0
        }
    }

    function d(e, t) {
        (null == t || t > e.length) && (t = e.length);
        for (var r = 0, n = new Array(t); r < t; r++)
            n[r] = e[r];
        return n
    }

    var y = function () {
        return c(function e() {
            s(this, e)
        }, [{
            key: "add",
            value: function (e, t, r) {
                if ("string" != typeof e)
                    for (var n in e)
                        this.add(n, e[n], t);
                else
                    (Array.isArray(e) ? e : [e]).forEach(function (e) {
                        this[e] = this[e] || [],
                        t && this[e][r ? "unshift" : "push"](t)
                    }, this)
            }
        }, {
            key: "run",
            value: function (e, t) {
                this[e] = this[e] || [],
                    this[e].forEach(function (e) {
                        e.call(t && t.context ? t.context : t, t)
                    })
            }
        }])
    }()
        , b = function () {
        return c(function e(t) {
            s(this, e),
                this.jsep = t,
                this.registered = {}
        }, [{
            key: "register",
            value: function () {
                for (var t = this, e = arguments.length, r = new Array(e), n = 0; n < e; n++)
                    r[n] = arguments[n];
                r.forEach(function (e) {
                    if ("object" !== C(e) || !e.name || !e.init)
                        throw new Error("Invalid JSEP plugin format");
                    t.registered[e.name] || (e.init(t.jsep),
                        t.registered[e.name] = e)
                })
            }
        }])
    }()
        , v = function () {
        function l(e) {
            s(this, l),
                this.expr = e,
                this.index = 0
        }

        return c(l, [{
            key: "char",
            get: function () {
                return this.expr.charAt(this.index)
            }
        }, {
            key: "code",
            get: function () {
                return this.expr.charCodeAt(this.index)
            }
        }, {
            key: "throwError",
            value: function (e) {
                var t = new Error(e + " at character " + this.index);
                throw t.index = this.index,
                    t.description = e,
                    t
            }
        }, {
            key: "runHook",
            value: function (e, t) {
                if (l.hooks[e]) {
                    var r = {
                        context: this,
                        node: t
                    };
                    return l.hooks.run(e, r),
                        r.node
                }
                return t
            }
        }, {
            key: "searchHook",
            value: function (e) {
                if (l.hooks[e]) {
                    var t = {
                        context: this
                    };
                    return l.hooks[e].find(function (e) {
                        return e.call(t.context, t),
                            t.node
                    }),
                        t.node
                }
            }
        }, {
            key: "gobbleSpaces",
            value: function () {
                for (var e = this.code; e === l.SPACE_CODE || e === l.TAB_CODE || e === l.LF_CODE || e === l.CR_CODE;)
                    e = this.expr.charCodeAt(++this.index);
                this.runHook("gobble-spaces")
            }
        }, {
            key: "parse",
            value: function () {
                this.runHook("before-all");
                var e = this.gobbleExpressions()
                    , e = 1 === e.length ? e[0] : {
                    type: l.COMPOUND,
                    body: e
                };
                return this.runHook("after-all", e)
            }
        }, {
            key: "gobbleExpressions",
            value: function (e) {
                for (var t, r, n = []; this.index < this.expr.length;)
                    if ((t = this.code) === l.SEMCOL_CODE || t === l.COMMA_CODE)
                        this.index++;
                    else if (r = this.gobbleExpression())
                        n.push(r);
                    else if (this.index < this.expr.length) {
                        if (t === e)
                            break;
                        this.throwError('Unexpected "' + this.char + '"')
                    }
                return n
            }
        }, {
            key: "gobbleExpression",
            value: function () {
                var e = this.searchHook("gobble-expression") || this.gobbleBinaryExpression();
                return this.gobbleSpaces(),
                    this.runHook("after-expression", e)
            }
        }, {
            key: "gobbleBinaryOp",
            value: function () {
                this.gobbleSpaces();
                for (var e = this.expr.substr(this.index, l.max_binop_len), t = e.length; 0 < t;) {
                    if (l.binary_ops.hasOwnProperty(e) && (!l.isIdentifierStart(this.code) || this.index + e.length < this.expr.length && !l.isIdentifierPart(this.expr.charCodeAt(this.index + e.length))))
                        return this.index += t,
                            e;
                    e = e.substr(0, --t)
                }
                return !1
            }
        }, {
            key: "gobbleBinaryExpression",
            value: function () {
                var e, t, r, n, i, o, a, s, u, c = this.gobbleToken();
                if (!c)
                    return c;
                if (!(t = this.gobbleBinaryOp()))
                    return c;
                for (i = {
                    value: t,
                    prec: l.binaryPrecedence(t),
                    right_a: l.right_associative.has(t)
                },
                     (o = this.gobbleToken()) || this.throwError("Expected expression after " + t),
                         n = [c, i, o]; t = this.gobbleBinaryOp();) {
                    if (0 === (r = l.binaryPrecedence(t))) {
                        this.index -= t.length;
                        break
                    }
                    i = {
                        value: t,
                        prec: r,
                        right_a: l.right_associative.has(t)
                    },
                        s = t;
                    for (; 2 < n.length && (u = n[n.length - 2],
                        i.right_a && u.right_a ? r > u.prec : r <= u.prec);)
                        o = n.pop(),
                            t = n.pop().value,
                            c = n.pop(),
                            e = {
                                type: l.BINARY_EXP,
                                operator: t,
                                left: c,
                                right: o
                            },
                            n.push(e);
                    (e = this.gobbleToken()) || this.throwError("Expected expression after " + s),
                        n.push(i, e)
                }
                for (e = n[a = n.length - 1]; 1 < a;)
                    e = {
                        type: l.BINARY_EXP,
                        operator: n[a - 1].value,
                        left: n[a - 2],
                        right: e
                    },
                        a -= 2;
                return e
            }
        }, {
            key: "gobbleToken",
            value: function () {
                var e, t, r, n;
                if (this.gobbleSpaces(),
                    n = this.searchHook("gobble-token"))
                    return this.runHook("after-token", n);
                if (e = this.code,
                l.isDecimalDigit(e) || e === l.PERIOD_CODE)
                    return this.gobbleNumericLiteral();
                if (e === l.SQUOTE_CODE || e === l.DQUOTE_CODE)
                    n = this.gobbleStringLiteral();
                else if (e === l.OBRACK_CODE)
                    n = this.gobbleArray();
                else {
                    for (r = (t = this.expr.substr(this.index, l.max_unop_len)).length; 0 < r;) {
                        if (l.unary_ops.hasOwnProperty(t) && (!l.isIdentifierStart(this.code) || this.index + t.length < this.expr.length && !l.isIdentifierPart(this.expr.charCodeAt(this.index + t.length)))) {
                            this.index += r;
                            var i = this.gobbleToken();
                            return i || this.throwError("missing unaryOp argument"),
                                this.runHook("after-token", {
                                    type: l.UNARY_EXP,
                                    operator: t,
                                    argument: i,
                                    prefix: !0
                                })
                        }
                        t = t.substr(0, --r)
                    }
                    l.isIdentifierStart(e) ? (n = this.gobbleIdentifier(),
                        l.literals.hasOwnProperty(n.name) ? n = {
                            type: l.LITERAL,
                            value: l.literals[n.name],
                            raw: n.name
                        } : n.name === l.this_str && (n = {
                            type: l.THIS_EXP
                        })) : e === l.OPAREN_CODE && (n = this.gobbleGroup())
                }
                return n ? (n = this.gobbleTokenProperty(n),
                    this.runHook("after-token", n)) : this.runHook("after-token", !1)
            }
        }, {
            key: "gobbleTokenProperty",
            value: function (e) {
                this.gobbleSpaces();
                for (var t = this.code; t === l.PERIOD_CODE || t === l.OBRACK_CODE || t === l.OPAREN_CODE || t === l.QUMARK_CODE;) {
                    var r = void 0;
                    if (t === l.QUMARK_CODE) {
                        if (this.expr.charCodeAt(this.index + 1) !== l.PERIOD_CODE)
                            break;
                        r = !0,
                            this.index += 2,
                            this.gobbleSpaces(),
                            t = this.code
                    }
                    this.index++,
                        t === l.OBRACK_CODE ? (e = {
                            type: l.MEMBER_EXP,
                            computed: !0,
                            object: e,
                            property: this.gobbleExpression()
                        },
                            this.gobbleSpaces(),
                        (t = this.code) !== l.CBRACK_CODE && this.throwError("Unclosed ["),
                            this.index++) : t === l.OPAREN_CODE ? e = {
                            type: l.CALL_EXP,
                            arguments: this.gobbleArguments(l.CPAREN_CODE),
                            callee: e
                        } : t !== l.PERIOD_CODE && !r || (r && this.index--,
                            this.gobbleSpaces(),
                            e = {
                                type: l.MEMBER_EXP,
                                computed: !1,
                                object: e,
                                property: this.gobbleIdentifier()
                            }),
                    r && (e.optional = !0),
                        this.gobbleSpaces(),
                        t = this.code
                }
                return e
            }
        }, {
            key: "gobbleNumericLiteral",
            value: function () {
                for (var e, t = ""; l.isDecimalDigit(this.code);)
                    t += this.expr.charAt(this.index++);
                if (this.code === l.PERIOD_CODE)
                    for (t += this.expr.charAt(this.index++); l.isDecimalDigit(this.code);)
                        t += this.expr.charAt(this.index++);
                if ("e" === (e = this.char) || "E" === e) {
                    for (t += this.expr.charAt(this.index++),
                         "+" !== (e = this.char) && "-" !== e || (t += this.expr.charAt(this.index++)); l.isDecimalDigit(this.code);)
                        t += this.expr.charAt(this.index++);
                    l.isDecimalDigit(this.expr.charCodeAt(this.index - 1)) || this.throwError("Expected exponent (" + t + this.char + ")")
                }
                return e = this.code,
                    l.isIdentifierStart(e) ? this.throwError("Variable names cannot start with a number (" + t + this.char + ")") : (e === l.PERIOD_CODE || 1 === t.length && t.charCodeAt(0) === l.PERIOD_CODE) && this.throwError("Unexpected period"),
                    {
                        type: l.LITERAL,
                        value: parseFloat(t),
                        raw: t
                    }
            }
        }, {
            key: "gobbleStringLiteral",
            value: function () {
                for (var e = "", t = this.index, r = this.expr.charAt(this.index++), n = !1; this.index < this.expr.length;) {
                    var i = this.expr.charAt(this.index++);
                    if (i === r) {
                        n = !0;
                        break
                    }
                    if ("\\" === i)
                        switch (i = this.expr.charAt(this.index++)) {
                            case "n":
                                e += "\n";
                                break;
                            case "r":
                                e += "\r";
                                break;
                            case "t":
                                e += "\t";
                                break;
                            case "b":
                                e += "\b";
                                break;
                            case "f":
                                e += "\f";
                                break;
                            case "v":
                                e += "\v";
                                break;
                            default:
                                e += i
                        }
                    else
                        e += i
                }
                return n || this.throwError('Unclosed quote after "' + e + '"'),
                    {
                        type: l.LITERAL,
                        value: e,
                        raw: this.expr.substring(t, this.index)
                    }
            }
        }, {
            key: "gobbleIdentifier",
            value: function () {
                var e = this.code
                    , t = this.index;
                for (l.isIdentifierStart(e) ? this.index++ : this.throwError("Unexpected " + this.char); this.index < this.expr.length && (e = this.code,
                    l.isIdentifierPart(e));)
                    this.index++;
                return {
                    type: l.IDENTIFIER,
                    name: this.expr.slice(t, this.index)
                }
            }
        }, {
            key: "gobbleArguments",
            value: function (e) {
                for (var t = [], r = !1, n = 0; this.index < this.expr.length;) {
                    this.gobbleSpaces();
                    var i = this.code;
                    if (i === e) {
                        r = !0,
                            this.index++,
                        e === l.CPAREN_CODE && n && n >= t.length && this.throwError("Unexpected token " + String.fromCharCode(e));
                        break
                    }
                    if (i === l.COMMA_CODE) {
                        if (this.index++,
                        ++n !== t.length)
                            if (e === l.CPAREN_CODE)
                                this.throwError("Unexpected token ,");
                            else if (e === l.CBRACK_CODE)
                                for (var o = t.length; o < n; o++)
                                    t.push(null)
                    } else
                        t.length !== n && 0 !== n ? this.throwError("Expected comma") : ((i = this.gobbleExpression()) && i.type !== l.COMPOUND || this.throwError("Expected comma"),
                            t.push(i))
                }
                return r || this.throwError("Expected " + String.fromCharCode(e)),
                    t
            }
        }, {
            key: "gobbleGroup",
            value: function () {
                this.index++;
                var e = this.gobbleExpressions(l.CPAREN_CODE);
                if (this.code === l.CPAREN_CODE)
                    return this.index++,
                        1 === e.length ? e[0] : !!e.length && {
                            type: l.SEQUENCE_EXP,
                            expressions: e
                        };
                this.throwError("Unclosed (")
            }
        }, {
            key: "gobbleArray",
            value: function () {
                return this.index++,
                    {
                        type: l.ARRAY_EXP,
                        elements: this.gobbleArguments(l.CBRACK_CODE)
                    }
            }
        }], [{
            key: "version",
            get: function () {
                return "1.3.8"
            }
        }, {
            key: "toString",
            value: function () {
                return "JavaScript Expression Parser (JSEP) v" + l.version
            }
        }, {
            key: "addUnaryOp",
            value: function (e) {
                return l.max_unop_len = Math.max(e.length, l.max_unop_len),
                    l.unary_ops[e] = 1,
                    l
            }
        }, {
            key: "addBinaryOp",
            value: function (e, t, r) {
                return l.max_binop_len = Math.max(e.length, l.max_binop_len),
                    l.binary_ops[e] = t,
                    r ? l.right_associative.add(e) : l.right_associative.delete(e),
                    l
            }
        }, {
            key: "addIdentifierChar",
            value: function (e) {
                return l.additional_identifier_chars.add(e),
                    l
            }
        }, {
            key: "addLiteral",
            value: function (e, t) {
                return l.literals[e] = t,
                    l
            }
        }, {
            key: "removeUnaryOp",
            value: function (e) {
                return delete l.unary_ops[e],
                e.length === l.max_unop_len && (l.max_unop_len = l.getMaxKeyLen(l.unary_ops)),
                    l
            }
        }, {
            key: "removeAllUnaryOps",
            value: function () {
                return l.unary_ops = {},
                    l.max_unop_len = 0,
                    l
            }
        }, {
            key: "removeIdentifierChar",
            value: function (e) {
                return l.additional_identifier_chars.delete(e),
                    l
            }
        }, {
            key: "removeBinaryOp",
            value: function (e) {
                return delete l.binary_ops[e],
                e.length === l.max_binop_len && (l.max_binop_len = l.getMaxKeyLen(l.binary_ops)),
                    l.right_associative.delete(e),
                    l
            }
        }, {
            key: "removeAllBinaryOps",
            value: function () {
                return l.binary_ops = {},
                    l.max_binop_len = 0,
                    l
            }
        }, {
            key: "removeLiteral",
            value: function (e) {
                return delete l.literals[e],
                    l
            }
        }, {
            key: "removeAllLiterals",
            value: function () {
                return l.literals = {},
                    l
            }
        }, {
            key: "parse",
            value: function (e) {
                return new l(e).parse()
            }
        }, {
            key: "getMaxKeyLen",
            value: function (e) {
                return Math.max.apply(Math, [0].concat(f(Object.keys(e).map(function (e) {
                    return e.length
                }))))
            }
        }, {
            key: "isDecimalDigit",
            value: function (e) {
                return 48 <= e && e <= 57
            }
        }, {
            key: "binaryPrecedence",
            value: function (e) {
                return l.binary_ops[e] || 0
            }
        }, {
            key: "isIdentifierStart",
            value: function (e) {
                return 65 <= e && e <= 90 || 97 <= e && e <= 122 || 128 <= e && !l.binary_ops[String.fromCharCode(e)] || l.additional_identifier_chars.has(String.fromCharCode(e))
            }
        }, {
            key: "isIdentifierPart",
            value: function (e) {
                return l.isIdentifierStart(e) || l.isDecimalDigit(e)
            }
        }])
    }()
        , y = new y;
    Object.assign(v, {
        hooks: y,
        plugins: new b(v),
        COMPOUND: "Compound",
        SEQUENCE_EXP: "SequenceExpression",
        IDENTIFIER: "Identifier",
        MEMBER_EXP: "MemberExpression",
        LITERAL: "Literal",
        THIS_EXP: "ThisExpression",
        CALL_EXP: "CallExpression",
        UNARY_EXP: "UnaryExpression",
        BINARY_EXP: "BinaryExpression",
        ARRAY_EXP: "ArrayExpression",
        TAB_CODE: 9,
        LF_CODE: 10,
        CR_CODE: 13,
        SPACE_CODE: 32,
        PERIOD_CODE: 46,
        COMMA_CODE: 44,
        SQUOTE_CODE: 39,
        DQUOTE_CODE: 34,
        OPAREN_CODE: 40,
        CPAREN_CODE: 41,
        OBRACK_CODE: 91,
        CBRACK_CODE: 93,
        QUMARK_CODE: 63,
        SEMCOL_CODE: 59,
        COLON_CODE: 58,
        unary_ops: {
            "-": 1,
            "!": 1,
            "~": 1,
            "+": 1
        },
        binary_ops: {
            "||": 1,
            "&&": 2,
            "|": 3,
            "^": 4,
            "&": 5,
            "==": 6,
            "!=": 6,
            "===": 6,
            "!==": 6,
            "<": 7,
            ">": 7,
            "<=": 7,
            ">=": 7,
            "<<": 8,
            ">>": 8,
            ">>>": 8,
            "+": 9,
            "-": 9,
            "*": 10,
            "/": 10,
            "%": 10
        },
        right_associative: new Set,
        additional_identifier_chars: new Set(["$", "_"]),
        literals: {
            true: !0,
            false: !1,
            null: null
        },
        this_str: "this"
    }),
        v.max_unop_len = v.getMaxKeyLen(v.unary_ops),
        v.max_binop_len = v.getMaxKeyLen(v.binary_ops);
    var E = function (e) {
        return new v(e).parse()
    };
    Object.getOwnPropertyNames(v).forEach(function (e) {
        void 0 === E[e] && "prototype" !== e && (E[e] = v[e])
    }),
        E.Jsep = v;
    b = {
        name: "ternary",
        init: function (o) {
            o.hooks.add("after-expression", function (e) {
                if (e.node && this.code === o.QUMARK_CODE) {
                    this.index++;
                    var t = e.node
                        , r = this.gobbleExpression();
                    if (r || this.throwError("Expected expression"),
                        this.gobbleSpaces(),
                    this.code === o.COLON_CODE) {
                        this.index++;
                        var n = this.gobbleExpression();
                        if (n || this.throwError("Expected expression"),
                            e.node = {
                                type: "ConditionalExpression",
                                test: t,
                                consequent: r,
                                alternate: n
                            },
                        t.operator && o.binary_ops[t.operator] <= .9) {
                            for (var i = t; i.right.operator && o.binary_ops[i.right.operator] <= .9;)
                                i = i.right;
                            e.node.test = i.right,
                                i.right = e.node,
                                e.node = t
                        }
                    } else
                        this.throwError("Expected :")
                }
            })
        }
    };
    E.plugins.register(b);
    var b = {
        name: "regex",
        init: function (s) {
            s.hooks.add("gobble-token", function (e) {
                if (47 === this.code) {
                    for (var t = ++this.index, r = !1; this.index < this.expr.length;) {
                        if (47 === this.code && !r) {
                            for (var n = this.expr.slice(t, this.index), i = ""; ++this.index < this.expr.length;) {
                                var o = this.code;
                                if (!(97 <= o && o <= 122 || 65 <= o && o <= 90 || 48 <= o && o <= 57))
                                    break;
                                i += this.char
                            }
                            var a = void 0;
                            try {
                                a = new RegExp(n, i)
                            } catch (e) {
                                this.throwError(e.message)
                            }
                            return e.node = {
                                type: s.LITERAL,
                                value: a,
                                raw: this.expr.slice(t - 1, this.index)
                            },
                                e.node = this.gobbleTokenProperty(e.node),
                                e.node
                        }
                        this.code === s.OBRACK_CODE ? r = !0 : r && this.code === s.CBRACK_CODE && (r = !1),
                            this.index += 92 === this.code ? 2 : 1
                    }
                    this.throwError("Unclosed Regex")
                }
            })
        }
    }
        , g = {
        name: "assignment",
        assignmentOperators: new Set(["=", "*=", "**=", "/=", "%=", "+=", "-=", "<<=", ">>=", ">>>=", "&=", "^=", "|="]),
        updateOperators: [43, 45],
        assignmentPrecedence: .9,
        init: function (t) {
            var n = [t.IDENTIFIER, t.MEMBER_EXP];
            g.assignmentOperators.forEach(function (e) {
                return t.addBinaryOp(e, g.assignmentPrecedence, !0)
            }),
                t.hooks.add("gobble-token", function (e) {
                    var t = this
                        , r = this.code;
                    g.updateOperators.some(function (e) {
                        return e === r && e === t.expr.charCodeAt(t.index + 1)
                    }) && (this.index += 2,
                        e.node = {
                            type: "UpdateExpression",
                            operator: 43 === r ? "++" : "--",
                            argument: this.gobbleTokenProperty(this.gobbleIdentifier()),
                            prefix: !0
                        },
                    e.node.argument && n.includes(e.node.argument.type) || this.throwError("Unexpected ".concat(e.node.operator)))
                }),
                t.hooks.add("after-token", function (e) {
                    var t, r = this;
                    e.node && (t = this.code,
                    g.updateOperators.some(function (e) {
                        return e === t && e === r.expr.charCodeAt(r.index + 1)
                    }) && (n.includes(e.node.type) || this.throwError("Unexpected ".concat(e.node.operator)),
                        this.index += 2,
                        e.node = {
                            type: "UpdateExpression",
                            operator: 43 === t ? "++" : "--",
                            argument: e.node,
                            prefix: !1
                        }))
                }),
                t.hooks.add("after-expression", function (e) {
                    e.node && !function t(e) {
                        g.assignmentOperators.has(e.operator) ? (e.type = "AssignmentExpression",
                            t(e.left),
                            t(e.right)) : e.operator || Object.values(e).forEach(function (e) {
                            e && "object" === C(e) && t(e)
                        })
                    }(e.node)
                })
        }
    }
        , A = Object.prototype.hasOwnProperty;

    function w(e, t) {
        return (e = e.slice()).push(t),
            e
    }

    function k(e, t) {
        return (t = t.slice()).unshift(e),
            t
    }

    var x = function () {
        function r(e) {
            var t;
            return s(this, r),
                (t = n(this, r, ['JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)'])).avoidNew = !0,
                t.value = e,
                t.name = "NewError",
                t
        }

        return function (e, t) {
            if ("function" != typeof t && null !== t)
                throw new TypeError("Super expression must either be null or a function");
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    writable: !0,
                    configurable: !0
                }
            }),
                Object.defineProperty(e, "prototype", {
                    writable: !1
                }),
            t && h(e, t)
        }(r, p(Error)),
            c(r)
    }();

    function F(e, t, r, n, i) {
        if (!(this instanceof F))
            try {
                return new F(e, t, r, n, i)
            } catch (e) {
                if (!e.avoidNew)
                    throw e;
                return e.value
            }
        "string" == typeof e && (i = n,
            n = r,
            r = t,
            t = e,
            e = null);
        var o = e && "object" === C(e);
        if (e = e || {},
            this.json = e.json || r,
            this.path = e.path || t,
            this.resultType = e.resultType || "value",
            this.flatten = e.flatten || !1,
            this.wrap = !A.call(e, "wrap") || e.wrap,
            this.sandbox = e.sandbox || {},
            this.eval = void 0 === e.eval ? "safe" : e.eval,
            this.ignoreEvalErrors = void 0 !== e.ignoreEvalErrors && e.ignoreEvalErrors,
            this.parent = e.parent || null,
            this.parentProperty = e.parentProperty || null,
            this.callback = e.callback || n || null,
            this.otherTypeCallback = e.otherTypeCallback || i || function () {
                throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.")
            }
            ,
        !1 !== e.autostart) {
            var a = {
                path: o ? e.path : t
            };
            o ? "json" in e && (a.json = e.json) : a.json = r;
            a = this.evaluate(a);
            if (!a || "object" !== C(a))
                throw new x(a);
            return a
        }
    }

    F.prototype.evaluate = function (e, t, r, n) {
        var i = this
            , o = this.parent
            , a = this.parentProperty
            , s = this.flatten
            , u = this.wrap;
        if (this.currResultType = this.resultType,
            this.currEval = this.eval,
            this.currSandbox = this.sandbox,
            r = r || this.callback,
            this.currOtherTypeCallback = n || this.otherTypeCallback,
            t = t || this.json,
        (e = e || this.path) && "object" === C(e) && !Array.isArray(e)) {
            if (!e.path && "" !== e.path)
                throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
            if (!A.call(e, "json"))
                throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');
            t = e.json,
                s = A.call(e, "flatten") ? e.flatten : s,
                this.currResultType = A.call(e, "resultType") ? e.resultType : this.currResultType,
                this.currSandbox = A.call(e, "sandbox") ? e.sandbox : this.currSandbox,
                u = A.call(e, "wrap") ? e.wrap : u,
                this.currEval = A.call(e, "eval") ? e.eval : this.currEval,
                r = A.call(e, "callback") ? e.callback : r,
                this.currOtherTypeCallback = A.call(e, "otherTypeCallback") ? e.otherTypeCallback : this.currOtherTypeCallback,
                o = A.call(e, "parent") ? e.parent : o,
                a = A.call(e, "parentProperty") ? e.parentProperty : a,
                e = e.path
        }
        if (o = o || null,
            a = a || null,
        Array.isArray(e) && (e = F.toPathString(e)),
        (e || "" === e) && t) {
            e = F.toPathArray(e);
            "$" === e[0] && 1 < e.length && e.shift(),
                this._hasParentSelector = null;
            r = this._trace(e, t, ["$"], o, a, r).filter(function (e) {
                return e && !e.isParentSelector
            });
            return r.length ? u || 1 !== r.length || r[0].hasArrExpr ? r.reduce(function (e, t) {
                t = i._getPreferredOutput(t);
                return s && Array.isArray(t) ? e = e.concat(t) : e.push(t),
                    e
            }, []) : this._getPreferredOutput(r[0]) : u ? [] : void 0
        }
    }
        ,
        F.prototype._getPreferredOutput = function (e) {
            var t = this.currResultType;
            switch (t) {
                case "all":
                    var r = Array.isArray(e.path) ? e.path : F.toPathArray(e.path);
                    return e.pointer = F.toPointer(r),
                        e.path = "string" == typeof e.path ? e.path : F.toPathString(e.path),
                        e;
                case "value":
                case "parent":
                case "parentProperty":
                    return e[t];
                case "path":
                    return F.toPathString(e[t]);
                case "pointer":
                    return F.toPointer(e.path);
                default:
                    throw new TypeError("Unknown result type")
            }
        }
        ,
        F.prototype._handleCallback = function (e, t, r) {
            var n;
            t && (n = this._getPreferredOutput(e),
                e.path = "string" == typeof e.path ? e.path : F.toPathString(e.path),
                t(n, r, e))
        }
        ,
        F.prototype._trace = function (t, n, i, o, a, s, e, r) {
            var u = this;
            if (!t.length)
                return v = {
                    path: i,
                    value: n,
                    parent: o,
                    parentProperty: a,
                    hasArrExpr: e
                },
                    this._handleCallback(v, s, "value"),
                    v;
            var c = t[0]
                , l = t.slice(1)
                , h = [];

            function p(e) {
                Array.isArray(e) ? e.forEach(function (e) {
                    h.push(e)
                }) : h.push(e)
            }

            if (("string" != typeof c || r) && n && A.call(n, c))
                p(this._trace(l, n[c], w(i, c), n, c, s, e));
            else if ("*" === c)
                this._walk(n, function (e) {
                    p(u._trace(l, n[e], w(i, e), n, e, s, !0, !0))
                });
            else if (".." === c)
                p(this._trace(l, n, i, o, a, s, e)),
                    this._walk(n, function (e) {
                        "object" === C(n[e]) && p(u._trace(t.slice(), n[e], w(i, e), n, e, s, !0))
                    });
            else {
                if ("^" === c)
                    return this._hasParentSelector = !0,
                        {
                            path: i.slice(0, -1),
                            expr: l,
                            isParentSelector: !0
                        };
                if ("~" === c)
                    return v = {
                        path: w(i, c),
                        value: a,
                        parent: o,
                        parentProperty: null
                    },
                        this._handleCallback(v, s, "property"),
                        v;
                if ("$" === c)
                    p(this._trace(l, n, i, null, null, s, e));
                else if (/^(\x2D?[0-9]*):(\x2D?[0-9]*):?([0-9]*)$/.test(c))
                    p(this._slice(c, l, n, i, o, a, s));
                else if (0 === c.indexOf("?(")) {
                    if (!1 === this.currEval)
                        throw new Error("Eval [?(expr)] prevented in JSONPath expression.");
                    var f = c.replace(/^\?\(((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?)\)$/, "$1")
                        ,
                        d = /@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])?((?:[\0->@-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))(?!(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])\)\])['\]]/g.exec(f);
                    d ? this._walk(n, function (e) {
                        var t = [d[2]]
                            , r = d[1] ? n[e][d[1]] : n[e];
                        0 < u._trace(t, r, i, o, a, s, !0).length && p(u._trace(l, n[e], w(i, e), n, e, s, !0))
                    }) : this._walk(n, function (e) {
                        u._eval(f, n[e], e, i, o, a) && p(u._trace(l, n[e], w(i, e), n, e, s, !0))
                    })
                } else if ("(" === c[0]) {
                    if (!1 === this.currEval)
                        throw new Error("Eval [(expr)] prevented in JSONPath expression.");
                    p(this._trace(k(this._eval(c, n, i[i.length - 1], i.slice(0, -1), o, a), l), n, i, o, a, s, e))
                } else if ("@" === c[0]) {
                    var y = !1
                        , b = c.slice(1, -2);
                    switch (b) {
                        case "scalar":
                            n && ["object", "function"].includes(C(n)) || (y = !0);
                            break;
                        case "boolean":
                        case "string":
                        case "undefined":
                        case "function":
                            C(n) === b && (y = !0);
                            break;
                        case "integer":
                            !Number.isFinite(n) || n % 1 || (y = !0);
                            break;
                        case "number":
                            Number.isFinite(n) && (y = !0);
                            break;
                        case "nonFinite":
                            "number" != typeof n || Number.isFinite(n) || (y = !0);
                            break;
                        case "object":
                            n && C(n) === b && (y = !0);
                            break;
                        case "array":
                            Array.isArray(n) && (y = !0);
                            break;
                        case "other":
                            y = this.currOtherTypeCallback(n, i, o, a);
                            break;
                        case "null":
                            null === n && (y = !0);
                            break;
                        default:
                            throw new TypeError("Unknown value type " + b)
                    }
                    if (y)
                        return v = {
                            path: i,
                            value: n,
                            parent: o,
                            parentProperty: a
                        },
                            this._handleCallback(v, s, "value"),
                            v
                } else if ("`" === c[0] && n && A.call(n, c.slice(1))) {
                    var v = c.slice(1);
                    p(this._trace(l, n[v], w(i, v), n, v, s, e, !0))
                } else if (c.includes(",")) {
                    var E = function (e, t) {
                        var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                        if (!r) {
                            if (Array.isArray(e) || (r = O(e)) || t && e && "number" == typeof e.length) {
                                r && (e = r);
                                var n = 0
                                    , t = function () {
                                };
                                return {
                                    s: t,
                                    n: function () {
                                        return n >= e.length ? {
                                            done: !0
                                        } : {
                                            done: !1,
                                            value: e[n++]
                                        }
                                    },
                                    e: function (e) {
                                        throw e
                                    },
                                    f: t
                                }
                            }
                            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
                        }
                        var i, o = !0, a = !1;
                        return {
                            s: function () {
                                r = r.call(e)
                            },
                            n: function () {
                                var e = r.next();
                                return o = e.done,
                                    e
                            },
                            e: function (e) {
                                a = !0,
                                    i = e
                            },
                            f: function () {
                                try {
                                    o || null == r.return || r.return()
                                } finally {
                                    if (a)
                                        throw i
                                }
                            }
                        }
                    }(c.split(","));
                    try {
                        for (E.s(); !(g = E.n()).done;) {
                            var g = g.value;
                            p(this._trace(k(g, l), n, i, o, a, s, !0))
                        }
                    } catch (e) {
                        E.e(e)
                    } finally {
                        E.f()
                    }
                } else
                    !r && n && A.call(n, c) && p(this._trace(l, n[c], w(i, c), n, c, s, e, !0))
            }
            if (this._hasParentSelector)
                for (var x = 0; x < h.length; x++) {
                    var F = h[x];
                    if (F && F.isParentSelector) {
                        var D = this._trace(F.expr, n, F.path, o, a, s, e);
                        if (Array.isArray(D)) {
                            h[x] = D[0];
                            for (var _ = D.length, m = 1; m < _; m++)
                                x++,
                                    h.splice(x, 0, D[m])
                        } else
                            h[x] = D
                    }
                }
            return h
        }
        ,
        F.prototype._walk = function (e, t) {
            if (Array.isArray(e))
                for (var r = e.length, n = 0; n < r; n++)
                    t(n);
            else
                e && "object" === C(e) && Object.keys(e).forEach(function (e) {
                    t(e)
                })
        }
        ,
        F.prototype._slice = function (e, t, r, n, i, o, a) {
            if (Array.isArray(r)) {
                for (var s = r.length, u = e.split(":"), c = u[2] && Number.parseInt(u[2]) || 1, e = u[0] && Number.parseInt(u[0]) || 0, l = u[1] && Number.parseInt(u[1]) || s, e = e < 0 ? Math.max(0, e + s) : Math.min(s, e), l = l < 0 ? Math.max(0, l + s) : Math.min(s, l), h = [], p = e; p < l; p += c)
                    this._trace(k(p, t), r, n, i, o, a, !0).forEach(function (e) {
                        h.push(e)
                    });
                return h
            }
        }
        ,
        F.prototype._eval = function (t, e, r, n, i, o) {
            var a = this;
            this.currSandbox._$_parentProperty = o,
                this.currSandbox._$_parent = i,
                this.currSandbox._$_property = r,
                this.currSandbox._$_root = this.json,
                this.currSandbox._$_v = e;
            e = t.includes("@path");
            e && (this.currSandbox._$_path = F.toPathString(n.concat([r])));
            var s = this.currEval + "Script:" + t;
            if (!F.cache[s]) {
                var u = t.replace(/@parentProperty/g, "_$_parentProperty").replace(/@parent/g, "_$_parent").replace(/@property/g, "_$_property").replace(/@root/g, "_$_root").replace(/@([\t-\r \)\.\[\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF])/g, "_$_v$1");
                if (e && (u = u.replace(/@path/g, "_$_path")),
                "safe" === this.currEval || !0 === this.currEval || void 0 === this.currEval)
                    F.cache[s] = new this.safeVm.Script(u);
                else if ("native" === this.currEval)
                    F.cache[s] = new this.vm.Script(u);
                else if ("function" == typeof this.currEval && this.currEval.prototype && A.call(this.currEval.prototype, "runInNewContext")) {
                    e = this.currEval;
                    F.cache[s] = new e(u)
                } else {
                    if ("function" != typeof this.currEval)
                        throw new TypeError('Unknown "eval" property "'.concat(this.currEval, '"'));
                    F.cache[s] = {
                        runInNewContext: function (e) {
                            return a.currEval(u, e)
                        }
                    }
                }
            }
            try {
                return F.cache[s].runInNewContext(this.currSandbox)
            } catch (e) {
                if (this.ignoreEvalErrors)
                    return !1;
                throw new Error("jsonPath: " + e.message + ": " + t)
            }
        }
        ,
        F.cache = {},
        F.toPathString = function (e) {
            for (var t = e, r = t.length, n = "$", i = 1; i < r; i++)
                /^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(t[i]) || (n += /^[\*0-9]+$/.test(t[i]) ? "[" + t[i] + "]" : "['" + t[i] + "']");
            return n
        }
        ,
        F.toPointer = function (e) {
            for (var t = e, r = t.length, n = "", i = 1; i < r; i++)
                /^(~|\^|@(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\(\))$/.test(t[i]) || (n += "/" + t[i].toString().replace(/~/g, "~0").replace(/\//g, "~1"));
            return n
        }
        ,
        F.toPathArray = function (e) {
            var t = F.cache;
            if (t[e])
                return t[e].concat();
            var r = []
                ,
                n = e.replace(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/g, ";$&;").replace(/['\[](\??\((?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*?\))['\]](?!(?:[\0-\t\x0B\f\x0E-\u2027\u202A-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])\])/g, function (e, t) {
                    return "[#" + (r.push(t) - 1) + "]"
                }).replace(/\[["']((?:[\0-&\(-\\\^-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*)["']\]/g, function (e, t) {
                    return "['" + t.replace(/\./g, "%@%").replace(/~/g, "%%@@%%") + "']"
                }).replace(/~/g, ";~;").replace(/["']?\.["']?(?!(?:[\0-Z\\-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])*\])|\[["']?/g, ";").replace(/%@%/g, ".").replace(/%%@@%%/g, "~").replace(/(?:;)?(\^+)(?:;)?/g, function (e, t) {
                    return ";" + t.split("").join(";") + ";"
                }).replace(/;;;|;;/g, ";..;").replace(/;$|'?\]|'$/g, "").split(";").map(function (e) {
                    var t = e.match(/#([0-9]+)/);
                    return t && t[1] ? r[t[1]] : e
                });
            return t[e] = n,
                t[e].concat()
        }
    ;
    E.plugins.register(b, g);
    var D = {
        evalAst: function (e, t) {
            switch (e.type) {
                case "BinaryExpression":
                case "LogicalExpression":
                    return D.evalBinaryExpression(e, t);
                case "Compound":
                    return D.evalCompound(e, t);
                case "ConditionalExpression":
                    return D.evalConditionalExpression(e, t);
                case "Identifier":
                    return D.evalIdentifier(e, t);
                case "Literal":
                    return D.evalLiteral(e, t);
                case "MemberExpression":
                    return D.evalMemberExpression(e, t);
                case "UnaryExpression":
                    return D.evalUnaryExpression(e, t);
                case "ArrayExpression":
                    return D.evalArrayExpression(e, t);
                case "CallExpression":
                    return D.evalCallExpression(e, t);
                case "AssignmentExpression":
                    return D.evalAssignmentExpression(e, t);
                default:
                    throw SyntaxError("Unexpected expression", e)
            }
        },
        evalBinaryExpression: function (e, t) {
            return {
                "||": function (e, t) {
                    return e || t()
                },
                "&&": function (e, t) {
                    return e && t()
                },
                "|": function (e, t) {
                    return e | t()
                },
                "^": function (e, t) {
                    return e ^ t()
                },
                "&": function (e, t) {
                    return e & t()
                },
                "==": function (e, t) {
                    return e == t()
                },
                "!=": function (e, t) {
                    return e != t()
                },
                "===": function (e, t) {
                    return e === t()
                },
                "!==": function (e, t) {
                    return e !== t()
                },
                "<": function (e, t) {
                    return e < t()
                },
                ">": function (e, t) {
                    return e > t()
                },
                "<=": function (e, t) {
                    return e <= t()
                },
                ">=": function (e, t) {
                    return e >= t()
                },
                "<<": function (e, t) {
                    return e << t()
                },
                ">>": function (e, t) {
                    return e >> t()
                },
                ">>>": function (e, t) {
                    return e >>> t()
                },
                "+": function (e, t) {
                    return e + t()
                },
                "-": function (e, t) {
                    return e - t()
                },
                "*": function (e, t) {
                    return e * t()
                },
                "/": function (e, t) {
                    return e / t()
                },
                "%": function (e, t) {
                    return e % t()
                }
            }[e.operator](D.evalAst(e.left, t), function () {
                return D.evalAst(e.right, t)
            })
        },
        evalCompound: function (e, t) {
            for (var r = 0; r < e.body.length; r++) {
                "Identifier" === e.body[r].type && ["var", "let", "const"].includes(e.body[r].name) && e.body[r + 1] && "AssignmentExpression" === e.body[r + 1].type && (r += 1);
                var n = e.body[r]
                    , i = D.evalAst(n, t)
            }
            return i
        },
        evalConditionalExpression: function (e, t) {
            return D.evalAst(e.test, t) ? D.evalAst(e.consequent, t) : D.evalAst(e.alternate, t)
        },
        evalIdentifier: function (e, t) {
            if (e.name in t)
                return t[e.name];
            throw ReferenceError("".concat(e.name, " is not defined"))
        },
        evalLiteral: function (e) {
            return e.value
        },
        evalMemberExpression: function (e, t) {
            var r = e.computed ? D.evalAst(e.property) : e.property.name
                , t = D.evalAst(e.object, t)
                , r = t[r];
            return "function" == typeof r ? r.bind(t) : r
        },
        evalUnaryExpression: function (e, t) {
            return {
                "-": function (e) {
                    return -D.evalAst(e, t)
                },
                "!": function (e) {
                    return !D.evalAst(e, t)
                },
                "~": function (e) {
                    return ~D.evalAst(e, t)
                },
                "+": function (e) {
                    return +D.evalAst(e, t)
                }
            }[e.operator](e.argument)
        },
        evalArrayExpression: function (e, t) {
            return e.elements.map(function (e) {
                return D.evalAst(e, t)
            })
        },
        evalCallExpression: function (e, t) {
            var r = e.arguments.map(function (e) {
                return D.evalAst(e, t)
            });
            return D.evalAst(e.callee, t).apply(void 0, f(r))
        },
        evalAssignmentExpression: function (e, t) {
            if ("Identifier" !== e.left.type)
                throw SyntaxError("Invalid left-hand side in assignment");
            var r = e.left.name
                , e = D.evalAst(e.right, t);
            return t[r] = e,
                t[r]
        }
    }
        , b = function () {
        return c(function e(t) {
            s(this, e),
                this.code = t,
                this.ast = E(this.code)
        }, [{
            key: "runInNewContext",
            value: function (e) {
                e = r({}, e);
                return D.evalAst(this.ast, e)
            }
        }])
    }();
    F.prototype.vm = {
        Script: function () {
            return c(function e(t) {
                s(this, e),
                    this.code = t
            }, [{
                key: "runInNewContext",
                value: function (n) {
                    var e = this.code
                        , t = Object.keys(n)
                        , r = [];
                    !function (e, t, r) {
                        for (var n = e.length, i = 0; i < n; i++)
                            r(e[i]) && t.push(e.splice(i--, 1)[0])
                    }(t, r, function (e) {
                        return "function" == typeof n[e]
                    });
                    var i = t.map(function (e) {
                        return n[e]
                    })
                        , r = r.reduce(function (e, t) {
                        var r = n[t].toString();
                        return /function/.test(r) || (r = "function " + r),
                        "var " + t + "=" + r + ";" + e
                    }, "");
                    /(["'])use strict\1/.test(e = r + e) || t.includes("arguments") || (e = "var arguments = undefined;" + e);
                    r = (e = e.replace(/;[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*$/, "")).lastIndexOf(";"),
                        e = -1 < r ? e.slice(0, r + 1) + " return " + e.slice(r + 1) : " return " + e;
                    return o(Function, t.concat([e])).apply(void 0, f(i))
                }
            }])
        }()
    },
        F.prototype.safeVm = {
            Script: b
        },
        e.JSONPath = F,
        e.SafeScript = b
});

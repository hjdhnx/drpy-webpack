'use strict';
(function(q) {
        function y() {}
        function C(b) {
            var d = b.charCodeAt(0) | 0;
            if (55296 <= d)
                if (56319 >= d)
                    if (b = b.charCodeAt(1) | 0,
                    56320 <= b && 57343 >= b) {
                        if (d = (d << 10) + b - 56613888 | 0,
                        65535 < d)
                            return v(240 | d >> 18, 128 | d >> 12 & 63, 128 | d >> 6 & 63, 128 | d & 63)
                    } else
                        d = 65533;
                else
                    57343 >= d && (d = 65533);
            return 2047 >= d ? v(192 | d >> 6, 128 | d & 63) : v(224 | d >> 12, 128 | d >> 6 & 63, 128 | d & 63)
        }
        function z() {}
        function A(b, d) {
            var g = void 0 === b ? "" : ("" + b).replace(D, C)
                , c = g.length | 0
                , a = 0
                , k = 0
                , f = d.length | 0
                , h = b.length | 0;
            f < c && (c = f);
            a: {
                for (; a < c; a = a + 1 | 0) {
                    b = g.charCodeAt(a) | 0;
                    switch (b >> 4) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            k = k + 1 | 0;
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            break;
                        case 12:
                        case 13:
                            if ((a + 1 | 0) < f) {
                                k = k + 1 | 0;
                                break
                            }
                        case 14:
                            if ((a + 2 | 0) < f) {
                                k = k + 1 | 0;
                                break
                            }
                        case 15:
                            if ((a + 3 | 0) < f) {
                                k = k + 1 | 0;
                                break
                            }
                        default:
                            break a
                    }
                    d[a] = b
                }
                c && (k = k + 1 | 0)
            }
            return {
                written: a,
                read: h < k ? h : k
            }
        }
        var v = String.fromCharCode
            , x = {}.toString
            , E = x.call(q.SharedArrayBuffer)
            , F = x()
            , t = q.Uint8Array
            , w = t || Array
            , u = t ? ArrayBuffer : w
            , G = u.isView || function(b) {
            return b && "length"in b
        }
            , H = x.call(u.prototype)
            , B = z.prototype;
        u = q.TextEncoder;
        var D = /[\x80-\uD7ff\uDC00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]?/g
            , e = new (t ? Uint16Array : w)(32);
        y.prototype.decode = function(b) {
            if (!G(b)) {
                var d = x.call(b);
                if (d !== H && d !== E && d !== F)
                    throw TypeError("Failed to execute 'decode' on 'TextDecoder': The provided value is not of type '(ArrayBuffer or ArrayBufferView)'");
                b = t ? new w(b) : b || []
            }
            for (var g = d = "", c = 0, a = b.length | 0, k = a - 32 | 0, f, h, l = 0, r = 0, n, m = 0, p = -1; c < a; ) {
                for (f = c <= k ? 32 : a - c | 0; m < f; c = c + 1 | 0,
                    m = m + 1 | 0) {
                    h = b[c] & 255;
                    switch (h >> 4) {
                        case 15:
                            n = b[c = c + 1 | 0] & 255;
                            if (2 !== n >> 6 || 247 < h) {
                                c = c - 1 | 0;
                                break
                            }
                            l = (h & 7) << 6 | n & 63;
                            r = 5;
                            h = 256;
                        case 14:
                            n = b[c = c + 1 | 0] & 255,
                                l <<= 6,
                                l |= (h & 15) << 6 | n & 63,
                                r = 2 === n >> 6 ? r + 4 | 0 : 24,
                                h = h + 256 & 768;
                        case 13:
                        case 12:
                            n = b[c = c + 1 | 0] & 255,
                                l <<= 6,
                                l |= (h & 31) << 6 | n & 63,
                                r = r + 7 | 0,
                                c < a && 2 === n >> 6 && l >> r && 1114112 > l ? (h = l,
                                    l = l - 65536 | 0,
                                0 <= l && (p = (l >> 10) + 55296 | 0,
                                    h = (l & 1023) + 56320 | 0,
                                    31 > m ? (e[m] = p,
                                        m = m + 1 | 0,
                                        p = -1) : (n = p,
                                        p = h,
                                        h = n))) : (h >>= 8,
                                    c = c - h - 1 | 0,
                                    h = 65533),
                                l = r = 0,
                                f = c <= k ? 32 : a - c | 0;
                        default:
                            e[m] = h;
                            continue;
                        case 11:
                        case 10:
                        case 9:
                        case 8:
                    }
                    e[m] = 65533
                }
                g += v(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15], e[16], e[17], e[18], e[19], e[20], e[21], e[22], e[23], e[24], e[25], e[26], e[27], e[28], e[29], e[30], e[31]);
                32 > m && (g = g.slice(0, m - 32 | 0));
                if (c < a) {
                    if (e[0] = p,
                        m = ~p >>> 31,
                        p = -1,
                    g.length < d.length)
                        continue
                } else
                    -1 !== p && (g += v(p));
                d += g;
                g = ""
            }
            return d
        }
        ;
        B.encode = function(b) {
            b = void 0 === b ? "" : "" + b;
            var d = b.length | 0, g = new w((d << 1) + 8 | 0), c, a = 0, k = !t;
            for (c = 0; c < d; c = c + 1 | 0,
                a = a + 1 | 0) {
                var f = b.charCodeAt(c) | 0;
                if (127 >= f)
                    g[a] = f;
                else {
                    if (2047 >= f)
                        g[a] = 192 | f >> 6;
                    else {
                        a: {
                            if (55296 <= f)
                                if (56319 >= f) {
                                    var h = b.charCodeAt(c = c + 1 | 0) | 0;
                                    if (56320 <= h && 57343 >= h) {
                                        f = (f << 10) + h - 56613888 | 0;
                                        if (65535 < f) {
                                            g[a] = 240 | f >> 18;
                                            g[a = a + 1 | 0] = 128 | f >> 12 & 63;
                                            g[a = a + 1 | 0] = 128 | f >> 6 & 63;
                                            g[a = a + 1 | 0] = 128 | f & 63;
                                            continue
                                        }
                                        break a
                                    }
                                    f = 65533
                                } else
                                    57343 >= f && (f = 65533);
                            !k && c << 1 < a && c << 1 < (a - 7 | 0) && (k = !0,
                                h = new w(3 * d),
                                h.set(g),
                                g = h)
                        }
                        g[a] = 224 | f >> 12;
                        g[a = a + 1 | 0] = 128 | f >> 6 & 63
                    }
                    g[a = a + 1 | 0] = 128 | f & 63
                }
            }
            return t ? g.subarray(0, a) : g.slice(0, a)
        }
        ;
        B.encodeInto = A;
        if (!u)
            q.TextDecoder = y,
                q.TextEncoder = z;
        else if (!(q = u.prototype).encodeInto) {
            var I = new u;
            q.encodeInto = function(b, d) {
                var g = b.length | 0
                    , c = d.length | 0;
                if (g < c >> 1) {
                    var a = I.encode(b);
                    if ((a.length | 0) < c)
                        return d.set(a),
                            {
                                read: g,
                                written: a.length | 0
                            }
                }
                return A(b, d)
            }
        }
    }
)(globalThis || {});

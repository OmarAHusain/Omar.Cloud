! function(e) {
    var t = {};

    function n(r) {
        if (t[r]) return t[r].exports;
        var a = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(a.exports, a, a.exports, n), a.l = !0, a.exports
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var a in e) n.d(r, a, function(t) {
                return e[t]
            }.bind(null, a));
        return r
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        } : function() {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 20)
}([function(e, t, n) {
    "use strict";
    const r = n(9),
        a = n(10),
        i = n(11);

    function o(e, t) {
        return t.encode ? t.strict ? r(e) : encodeURIComponent(e) : e
    }

    function u(e, t) {
        return t.decode ? a(e) : e
    }

    function f(e) {
        const t = e.indexOf("#");
        return -1 !== t && (e = e.slice(0, t)), e
    }

    function c(e) {
        const t = (e = f(e)).indexOf("?");
        return -1 === t ? "" : e.slice(t + 1)
    }

    function s(e, t) {
        return t.parseNumbers && !Number.isNaN(Number(e)) && "string" == typeof e && "" !== e.trim() ? e = Number(e) : !t.parseBooleans || null === e || "true" !== e.toLowerCase() && "false" !== e.toLowerCase() || (e = "true" === e.toLowerCase()), e
    }

    function l(e, t) {
        const n = function(e) {
                let t;
                switch (e.arrayFormat) {
                    case "index":
                        return (e, n, r) => {
                            t = /\[(\d*)\]$/.exec(e), e = e.replace(/\[\d*\]$/, ""), t ? (void 0 === r[e] && (r[e] = {}), r[e][t[1]] = n) : r[e] = n
                        };
                    case "bracket":
                        return (e, n, r) => {
                            t = /(\[\])$/.exec(e), e = e.replace(/\[\]$/, ""), t ? void 0 !== r[e] ? r[e] = [].concat(r[e], n) : r[e] = [n] : r[e] = n
                        };
                    case "comma":
                        return (e, t, n) => {
                            const r = "string" == typeof t && t.split("").indexOf(",") > -1 ? t.split(",") : t;
                            n[e] = r
                        };
                    default:
                        return (e, t, n) => {
                            void 0 !== n[e] ? n[e] = [].concat(n[e], t) : n[e] = t
                        }
                }
            }(t = Object.assign({
                decode: !0,
                sort: !0,
                arrayFormat: "none",
                parseNumbers: !1,
                parseBooleans: !1
            }, t)),
            r = Object.create(null);
        if ("string" != typeof e) return r;
        if (!(e = e.trim().replace(/^[?#&]/, ""))) return r;
        for (const a of e.split("&")) {
            let [e, o] = i(t.decode ? a.replace(/\+/g, " ") : a, "=");
            o = void 0 === o ? null : u(o, t), n(u(e, t), o, r)
        }
        for (const e of Object.keys(r)) {
            const n = r[e];
            if ("object" == typeof n && null !== n)
                for (const e of Object.keys(n)) n[e] = s(n[e], t);
            else r[e] = s(n, t)
        }
        return !1 === t.sort ? r : (!0 === t.sort ? Object.keys(r).sort() : Object.keys(r).sort(t.sort)).reduce((e, t) => {
            const n = r[t];
            return Boolean(n) && "object" == typeof n && !Array.isArray(n) ? e[t] = function e(t) {
                return Array.isArray(t) ? t.sort() : "object" == typeof t ? e(Object.keys(t)).sort((e, t) => Number(e) - Number(t)).map(e => t[e]) : t
            }(n) : e[t] = n, e
        }, Object.create(null))
    }
    t.extract = c, t.parse = l, t.stringify = (e, t) => {
        if (!e) return "";
        const n = function(e) {
                switch (e.arrayFormat) {
                    case "index":
                        return t => (n, r) => {
                            const a = n.length;
                            return void 0 === r || e.skipNull && null === r ? n : null === r ? [...n, [o(t, e), "[", a, "]"].join("")] : [...n, [o(t, e), "[", o(a, e), "]=", o(r, e)].join("")]
                        };
                    case "bracket":
                        return t => (n, r) => void 0 === r || e.skipNull && null === r ? n : null === r ? [...n, [o(t, e), "[]"].join("")] : [...n, [o(t, e), "[]=", o(r, e)].join("")];
                    case "comma":
                        return t => (n, r) => null == r || 0 === r.length ? n : 0 === n.length ? [
                            [o(t, e), "=", o(r, e)].join("")
                        ] : [
                            [n, o(r, e)].join(",")
                        ];
                    default:
                        return t => (n, r) => void 0 === r || e.skipNull && null === r ? n : null === r ? [...n, o(t, e)] : [...n, [o(t, e), "=", o(r, e)].join("")]
                }
            }(t = Object.assign({
                encode: !0,
                strict: !0,
                arrayFormat: "none"
            }, t)),
            r = Object.assign({}, e);
        if (t.skipNull)
            for (const e of Object.keys(r)) void 0 !== r[e] && null !== r[e] || delete r[e];
        const a = Object.keys(r);
        return !1 !== t.sort && a.sort(t.sort), a.map(r => {
            const a = e[r];
            return void 0 === a ? "" : null === a ? o(r, t) : Array.isArray(a) ? a.reduce(n(r), []).join("&") : o(r, t) + "=" + o(a, t)
        }).filter(e => e.length > 0).join("&")
    }, t.parseUrl = (e, t) => ({
        url: f(e).split("?")[0] || "",
        query: l(c(e), t)
    })
}, function(e, t, n) {
    e.exports = function() {
        "use strict";
        var e = function(e) {
                return e instanceof Uint8Array || e instanceof Uint16Array || e instanceof Uint32Array || e instanceof Int8Array || e instanceof Int16Array || e instanceof Int32Array || e instanceof Float32Array || e instanceof Float64Array || e instanceof Uint8ClampedArray
            },
            t = function(e, t) {
                for (var n = Object.keys(t), r = 0; r < n.length; ++r) e[n[r]] = t[n[r]];
                return e
            },
            n = "\n";

        function r(e) {
            var t = new Error("(regl) " + e);
            throw console.error(t), t
        }

        function a(e, t) {
            e || r(t)
        }

        function i(e) {
            return e ? ": " + e : ""
        }

        function o(e, t, n) {
            t.indexOf(e) < 0 && r("invalid value" + i(n) + ". must be one of: " + t)
        }
        var u = ["gl", "canvas", "container", "attributes", "pixelRatio", "extensions", "optionalExtensions", "profile", "onDone"];

        function f(e, t) {
            for (e += ""; e.length < t;) e = " " + e;
            return e
        }

        function c() {
            this.name = "unknown", this.lines = [], this.index = {}, this.hasErrors = !1
        }

        function s(e, t) {
            this.number = e, this.line = t, this.errors = []
        }

        function l(e, t, n) {
            this.file = e, this.line = t, this.message = n
        }

        function d() {
            var e = new Error,
                t = (e.stack || e).toString(),
                n = /compileProcedure.*\n\s*at.*\((.*)\)/.exec(t);
            if (n) return n[1];
            var r = /compileProcedure.*\n\s*at\s+(.*)(\n|$)/.exec(t);
            return r ? r[1] : "unknown"
        }

        function p() {
            var e = new Error,
                t = (e.stack || e).toString(),
                n = /at REGLCommand.*\n\s+at.*\((.*)\)/.exec(t);
            if (n) return n[1];
            var r = /at REGLCommand.*\n\s+at\s+(.*)\n/.exec(t);
            return r ? r[1] : "unknown"
        }

        function m(e, t) {
            var n, r = e.split("\n"),
                a = 1,
                i = 0,
                o = {
                    unknown: new c,
                    0: new c
                };
            o.unknown.name = o[0].name = t || d(), o.unknown.lines.push(new s(0, ""));
            for (var u = 0; u < r.length; ++u) {
                var f = r[u],
                    l = /^\s*\#\s*(\w+)\s+(.+)\s*$/.exec(f);
                if (l) switch (l[1]) {
                    case "line":
                        var p = /(\d+)(\s+\d+)?/.exec(l[2]);
                        p && (a = 0 | p[1], p[2] && ((i = 0 | p[2]) in o || (o[i] = new c)));
                        break;
                    case "define":
                        var m = /SHADER_NAME(_B64)?\s+(.*)$/.exec(l[2]);
                        m && (o[i].name = m[1] ? (n = m[2], "undefined" != typeof atob ? atob(n) : "base64:" + n) : m[2])
                }
                o[i].lines.push(new s(a++, f))
            }
            return Object.keys(o).forEach((function(e) {
                var t = o[e];
                t.lines.forEach((function(e) {
                    t.index[e.number] = e
                }))
            })), o
        }

        function h(e) {
            e._commandRef = d()
        }

        function v(e, t) {
            var n = p();
            r(e + " in command " + (t || d()) + ("unknown" === n ? "" : " called from " + n))
        }

        function b(e, t, n, r) {
            typeof e !== t && v("invalid parameter type" + i(n) + ". expected " + t + ", got " + typeof e, r || d())
        }
        var g = 33071,
            y = 9728,
            x = 9984,
            w = 9985,
            _ = 9986,
            k = 9987,
            A = 5126,
            M = 32819,
            S = 32820,
            T = 33635,
            j = 34042,
            E = {};

        function C(e, t) {
            return e === S || e === M || e === T ? 2 : e === j ? 4 : E[e] * t
        }

        function O(e) {
            return !(e & e - 1 || !e)
        }
        E[5120] = E[5121] = 1, E[5122] = E[5123] = E[36193] = E[T] = E[M] = E[S] = 2, E[5124] = E[5125] = E[A] = E[j] = 4;
        var D = t(a, {
                optional: function(e) {
                    e()
                },
                raise: r,
                commandRaise: v,
                command: function(e, t, n) {
                    e || v(t, n || d())
                },
                parameter: function(e, t, n) {
                    e in t || r("unknown parameter (" + e + ")" + i(n) + ". possible values: " + Object.keys(t).join())
                },
                commandParameter: function(e, t, n, r) {
                    e in t || v("unknown parameter (" + e + ")" + i(n) + ". possible values: " + Object.keys(t).join(), r || d())
                },
                constructor: function(e) {
                    Object.keys(e).forEach((function(e) {
                        u.indexOf(e) < 0 && r('invalid regl constructor argument "' + e + '". must be one of ' + u)
                    }))
                },
                type: function(e, t, n) {
                    typeof e !== t && r("invalid parameter type" + i(n) + ". expected " + t + ", got " + typeof e)
                },
                commandType: b,
                isTypedArray: function(t, n) {
                    e(t) || r("invalid parameter type" + i(n) + ". must be a typed array")
                },
                nni: function(e, t) {
                    e >= 0 && (0 | e) === e || r("invalid parameter type, (" + e + ")" + i(t) + ". must be a nonnegative integer")
                },
                oneOf: o,
                shaderError: function(e, t, r, i, o) {
                    if (!e.getShaderParameter(t, e.COMPILE_STATUS)) {
                        var u = e.getShaderInfoLog(t),
                            c = i === e.FRAGMENT_SHADER ? "fragment" : "vertex";
                        b(r, "string", c + " shader source must be a string", o);
                        var s = m(r, o),
                            d = function(e) {
                                var t = [];
                                return e.split("\n").forEach((function(e) {
                                    if (!(e.length < 5)) {
                                        var n = /^ERROR\:\s+(\d+)\:(\d+)\:\s*(.*)$/.exec(e);
                                        n ? t.push(new l(0 | n[1], 0 | n[2], n[3].trim())) : e.length > 0 && t.push(new l("unknown", 0, e))
                                    }
                                })), t
                            }(u);
                        ! function(e, t) {
                            t.forEach((function(t) {
                                var n = e[t.file];
                                if (n) {
                                    var r = n.index[t.line];
                                    if (r) return r.errors.push(t), void(n.hasErrors = !0)
                                }
                                e.unknown.hasErrors = !0, e.unknown.lines[0].errors.push(t)
                            }))
                        }(s, d), Object.keys(s).forEach((function(e) {
                            var t = s[e];
                            if (t.hasErrors) {
                                var r = [""],
                                    a = [""];
                                i("file number " + e + ": " + t.name + "\n", "color:red;text-decoration:underline;font-weight:bold"), t.lines.forEach((function(e) {
                                    if (e.errors.length > 0) {
                                        i(f(e.number, 4) + "|  ", "background-color:yellow; font-weight:bold"), i(e.line + n, "color:red; background-color:yellow; font-weight:bold");
                                        var t = 0;
                                        e.errors.forEach((function(r) {
                                            var a = r.message,
                                                o = /^\s*\'(.*)\'\s*\:\s*(.*)$/.exec(a);
                                            if (o) {
                                                var u = o[1];
                                                switch (a = o[2], u) {
                                                    case "assign":
                                                        u = "="
                                                }
                                                t = Math.max(e.line.indexOf(u, t), 0)
                                            } else t = 0;
                                            i(f("| ", 6)), i(f("^^^", t + 3) + n, "font-weight:bold"), i(f("| ", 6)), i(a + n, "font-weight:bold")
                                        })), i(f("| ", 6) + n)
                                    } else i(f(e.number, 4) + "|  "), i(e.line + n, "color:red")
                                })), "undefined" == typeof document || window.chrome ? console.log(r.join("")) : (a[0] = r.join("%c"), console.log.apply(console, a))
                            }

                            function i(e, t) {
                                r.push(e), a.push(t || "")
                            }
                        })), a.raise("Error compiling " + c + " shader, " + s[0].name)
                    }
                },
                linkError: function(e, t, r, i, o) {
                    if (!e.getProgramParameter(t, e.LINK_STATUS)) {
                        var u = e.getProgramInfoLog(t),
                            f = m(r, o),
                            c = 'Error linking program with vertex shader, "' + m(i, o)[0].name + '", and fragment shader "' + f[0].name + '"';
                        "undefined" != typeof document ? console.log("%c" + c + n + "%c" + u, "color:red;text-decoration:underline;font-weight:bold", "color:red") : console.log(c + n + u), a.raise(c)
                    }
                },
                callSite: p,
                saveCommandRef: h,
                saveDrawInfo: function(e, t, n, r) {
                    function a(e) {
                        return e ? r.id(e) : 0
                    }

                    function i(e, t) {
                        Object.keys(t).forEach((function(t) {
                            e[r.id(t)] = !0
                        }))
                    }
                    h(e), e._fragId = a(e.static.frag), e._vertId = a(e.static.vert);
                    var o = e._uniformSet = {};
                    i(o, t.static), i(o, t.dynamic);
                    var u = e._attributeSet = {};
                    i(u, n.static), i(u, n.dynamic), e._hasCount = "count" in e.static || "count" in e.dynamic || "elements" in e.static || "elements" in e.dynamic
                },
                framebufferFormat: function(e, t, n) {
                    e.texture ? o(e.texture._texture.internalformat, t, "unsupported texture format for attachment") : o(e.renderbuffer._renderbuffer.format, n, "unsupported renderbuffer format for attachment")
                },
                guessCommand: d,
                texture2D: function(e, t, n) {
                    var r, i = t.width,
                        o = t.height,
                        u = t.channels;
                    a(i > 0 && i <= n.maxTextureSize && o > 0 && o <= n.maxTextureSize, "invalid texture shape"), e.wrapS === g && e.wrapT === g || a(O(i) && O(o), "incompatible wrap mode for texture, both width and height must be power of 2"), 1 === t.mipmask ? 1 !== i && 1 !== o && a(e.minFilter !== x && e.minFilter !== _ && e.minFilter !== w && e.minFilter !== k, "min filter requires mipmap") : (a(O(i) && O(o), "texture must be a square power of 2 to support mipmapping"), a(t.mipmask === (i << 1) - 1, "missing or incomplete mipmap data")), t.type === A && (n.extensions.indexOf("oes_texture_float_linear") < 0 && a(e.minFilter === y && e.magFilter === y, "filter not supported, must enable oes_texture_float_linear"), a(!e.genMipmaps, "mipmap generation not supported with float textures"));
                    var f = t.images;
                    for (r = 0; r < 16; ++r)
                        if (f[r]) {
                            var c = i >> r,
                                s = o >> r;
                            a(t.mipmask & 1 << r, "missing mipmap data");
                            var l = f[r];
                            if (a(l.width === c && l.height === s, "invalid shape for mip images"), a(l.format === t.format && l.internalformat === t.internalformat && l.type === t.type, "incompatible type for mip image"), l.compressed);
                            else if (l.data) {
                                var d = Math.ceil(C(l.type, u) * c / l.unpackAlignment) * l.unpackAlignment;
                                a(l.data.byteLength === d * s, "invalid data for image, buffer size is inconsistent with image format")
                            } else l.element || l.copy
                        } else e.genMipmaps || a(0 == (t.mipmask & 1 << r), "extra mipmap data");
                    t.compressed && a(!e.genMipmaps, "mipmap generation for compressed images not supported")
                },
                textureCube: function(e, t, n, r) {
                    var i = e.width,
                        o = e.height,
                        u = e.channels;
                    a(i > 0 && i <= r.maxTextureSize && o > 0 && o <= r.maxTextureSize, "invalid texture shape"), a(i === o, "cube map must be square"), a(t.wrapS === g && t.wrapT === g, "wrap mode not supported by cube map");
                    for (var f = 0; f < n.length; ++f) {
                        var c = n[f];
                        a(c.width === i && c.height === o, "inconsistent cube map face shape"), t.genMipmaps && (a(!c.compressed, "can not generate mipmap for compressed textures"), a(1 === c.mipmask, "can not specify mipmaps and generate mipmaps"));
                        for (var s = c.images, l = 0; l < 16; ++l) {
                            var d = s[l];
                            if (d) {
                                var p = i >> l,
                                    m = o >> l;
                                a(c.mipmask & 1 << l, "missing mipmap data"), a(d.width === p && d.height === m, "invalid shape for mip images"), a(d.format === e.format && d.internalformat === e.internalformat && d.type === e.type, "incompatible type for mip image"), d.compressed || (d.data ? a(d.data.byteLength === p * m * Math.max(C(d.type, u), d.unpackAlignment), "invalid data for image, buffer size is inconsistent with image format") : d.element || d.copy)
                            }
                        }
                    }
                }
            }),
            F = 0,
            I = 0;

        function P(e, t) {
            this.id = F++, this.type = e, this.data = t
        }

        function R(e) {
            return e.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
        }

        function z(e) {
            return "[" + function e(t) {
                if (0 === t.length) return [];
                var n = t.charAt(0),
                    r = t.charAt(t.length - 1);
                if (t.length > 1 && n === r && ('"' === n || "'" === n)) return ['"' + R(t.substr(1, t.length - 2)) + '"'];
                var a = /\[(false|true|null|\d+|'[^']*'|"[^"]*")\]/.exec(t);
                if (a) return e(t.substr(0, a.index)).concat(e(a[1])).concat(e(t.substr(a.index + a[0].length)));
                var i = t.split(".");
                if (1 === i.length) return ['"' + R(t) + '"'];
                for (var o = [], u = 0; u < i.length; ++u) o = o.concat(e(i[u]));
                return o
            }(e).join("][") + "]"
        }
        var B = {
                DynamicVariable: P,
                define: function(e, t) {
                    return new P(e, z(t + ""))
                },
                isDynamic: function(e) {
                    return "function" == typeof e && !e._reglType || e instanceof P
                },
                unbox: function(e, t) {
                    return "function" == typeof e ? new P(I, e) : e
                },
                accessor: z
            },
            L = {
                next: "function" == typeof requestAnimationFrame ? function(e) {
                    return requestAnimationFrame(e)
                } : function(e) {
                    return setTimeout(e, 16)
                },
                cancel: "function" == typeof cancelAnimationFrame ? function(e) {
                    return cancelAnimationFrame(e)
                } : clearTimeout
            },
            U = "undefined" != typeof performance && performance.now ? function() {
                return performance.now()
            } : function() {
                return +new Date
            };

        function N(e) {
            return "string" == typeof e ? e.split() : (D(Array.isArray(e), "invalid extension array"), e)
        }

        function W(e) {
            return "string" == typeof e ? (D("undefined" != typeof document, "not supported outside of DOM"), document.querySelector(e)) : e
        }

        function q(e) {
            var n, r, a, i, o, u = e || {},
                f = {},
                c = [],
                s = [],
                l = "undefined" == typeof window ? 1 : window.devicePixelRatio,
                d = !1,
                p = function(e) {
                    e && D.raise(e)
                },
                m = function() {};
            if ("string" == typeof u ? (D("undefined" != typeof document, "selector queries only supported in DOM enviroments"), n = document.querySelector(u), D(n, "invalid query string for element")) : "object" == typeof u ? "string" == typeof(o = u).nodeName && "function" == typeof o.appendChild && "function" == typeof o.getBoundingClientRect ? n = u : function(e) {
                    return "function" == typeof e.drawArrays || "function" == typeof e.drawElements
                }(u) ? a = (i = u).canvas : (D.constructor(u), "gl" in u ? i = u.gl : "canvas" in u ? a = W(u.canvas) : "container" in u && (r = W(u.container)), "attributes" in u && (f = u.attributes, D.type(f, "object", "invalid context attributes")), "extensions" in u && (c = N(u.extensions)), "optionalExtensions" in u && (s = N(u.optionalExtensions)), "onDone" in u && (D.type(u.onDone, "function", "invalid or missing onDone callback"), p = u.onDone), "profile" in u && (d = !!u.profile), "pixelRatio" in u && (l = +u.pixelRatio, D(l > 0, "invalid pixel ratio"))) : D.raise("invalid arguments to regl"), n && ("canvas" === n.nodeName.toLowerCase() ? a = n : r = n), !i) {
                if (!a) {
                    D("undefined" != typeof document, "must manually specify webgl context outside of DOM environments");
                    var h = function(e, n, r) {
                        var a = document.createElement("canvas");

                        function i() {
                            var n = window.innerWidth,
                                i = window.innerHeight;
                            if (e !== document.body) {
                                var o = e.getBoundingClientRect();
                                n = o.right - o.left, i = o.bottom - o.top
                            }
                            a.width = r * n, a.height = r * i, t(a.style, {
                                width: n + "px",
                                height: i + "px"
                            })
                        }
                        return t(a.style, {
                            border: 0,
                            margin: 0,
                            padding: 0,
                            top: 0,
                            left: 0
                        }), e.appendChild(a), e === document.body && (a.style.position = "absolute", t(e.style, {
                            margin: 0,
                            padding: 0
                        })), window.addEventListener("resize", i, !1), i(), {
                            canvas: a,
                            onDestroy: function() {
                                window.removeEventListener("resize", i), e.removeChild(a)
                            }
                        }
                    }(r || document.body, 0, l);
                    if (!h) return null;
                    a = h.canvas, m = h.onDestroy
                }
                i = function(e, t) {
                    function n(n) {
                        try {
                            return e.getContext(n, t)
                        } catch (e) {
                            return null
                        }
                    }
                    return n("webgl") || n("experimental-webgl") || n("webgl-experimental")
                }(a, f)
            }
            return i ? {
                gl: i,
                canvas: a,
                container: r,
                extensions: c,
                optionalExtensions: s,
                pixelRatio: l,
                profile: d,
                onDone: p,
                onDestroy: m
            } : (m(), p("webgl not supported, try upgrading your browser or graphics drivers http://get.webgl.org"), null)
        }

        function G(e, t) {
            for (var n = Array(e), r = 0; r < e; ++r) n[r] = t(r);
            return n
        }
        var Y = 5120,
            H = 5121,
            X = 5122,
            Q = 5123,
            V = 5124,
            Z = 5125,
            $ = 5126;

        function K(e) {
            var t, n;
            return t = (e > 65535) << 4, t |= n = ((e >>>= t) > 255) << 3, t |= n = ((e >>>= n) > 15) << 2, (t |= n = ((e >>>= n) > 3) << 1) | (e >>>= n) >> 1
        }

        function J() {
            var e = G(8, (function() {
                return []
            }));

            function t(t) {
                var n = function(e) {
                        for (var t = 16; t <= 1 << 28; t *= 16)
                            if (e <= t) return t;
                        return 0
                    }(t),
                    r = e[K(n) >> 2];
                return r.length > 0 ? r.pop() : new ArrayBuffer(n)
            }

            function n(t) {
                e[K(t.byteLength) >> 2].push(t)
            }
            return {
                alloc: t,
                free: n,
                allocType: function(e, n) {
                    var r = null;
                    switch (e) {
                        case Y:
                            r = new Int8Array(t(n), 0, n);
                            break;
                        case H:
                            r = new Uint8Array(t(n), 0, n);
                            break;
                        case X:
                            r = new Int16Array(t(2 * n), 0, n);
                            break;
                        case Q:
                            r = new Uint16Array(t(2 * n), 0, n);
                            break;
                        case V:
                            r = new Int32Array(t(4 * n), 0, n);
                            break;
                        case Z:
                            r = new Uint32Array(t(4 * n), 0, n);
                            break;
                        case $:
                            r = new Float32Array(t(4 * n), 0, n);
                            break;
                        default:
                            return null
                    }
                    return r.length !== n ? r.subarray(0, n) : r
                },
                freeType: function(e) {
                    n(e.buffer)
                }
            }
        }
        var ee = J();
        ee.zero = J();
        var te = function(e, t) {
            var n = 1;
            t.ext_texture_filter_anisotropic && (n = e.getParameter(34047));
            var r = 1,
                a = 1;
            t.webgl_draw_buffers && (r = e.getParameter(34852), a = e.getParameter(36063));
            var i = !!t.oes_texture_float;
            if (i) {
                var o = e.createTexture();
                e.bindTexture(3553, o), e.texImage2D(3553, 0, 6408, 1, 1, 0, 6408, 5126, null);
                var u = e.createFramebuffer();
                if (e.bindFramebuffer(36160, u), e.framebufferTexture2D(36160, 36064, 3553, o, 0), e.bindTexture(3553, null), 36053 !== e.checkFramebufferStatus(36160)) i = !1;
                else {
                    e.viewport(0, 0, 1, 1), e.clearColor(1, 0, 0, 1), e.clear(16384);
                    var f = ee.allocType(5126, 4);
                    e.readPixels(0, 0, 1, 1, 6408, 5126, f), e.getError() ? i = !1 : (e.deleteFramebuffer(u), e.deleteTexture(o), i = 1 === f[0]), ee.freeType(f)
                }
            }
            var c = !0;
            if ("undefined" == typeof navigator || !(/MSIE/.test(navigator.userAgent) || /Trident\//.test(navigator.appVersion) || /Edge/.test(navigator.userAgent))) {
                var s = e.createTexture(),
                    l = ee.allocType(5121, 36);
                e.activeTexture(33984), e.bindTexture(34067, s), e.texImage2D(34069, 0, 6408, 3, 3, 0, 6408, 5121, l), ee.freeType(l), e.bindTexture(34067, null), e.deleteTexture(s), c = !e.getError()
            }
            return {
                colorBits: [e.getParameter(3410), e.getParameter(3411), e.getParameter(3412), e.getParameter(3413)],
                depthBits: e.getParameter(3414),
                stencilBits: e.getParameter(3415),
                subpixelBits: e.getParameter(3408),
                extensions: Object.keys(t).filter((function(e) {
                    return !!t[e]
                })),
                maxAnisotropic: n,
                maxDrawbuffers: r,
                maxColorAttachments: a,
                pointSizeDims: e.getParameter(33901),
                lineWidthDims: e.getParameter(33902),
                maxViewportDims: e.getParameter(3386),
                maxCombinedTextureUnits: e.getParameter(35661),
                maxCubeMapSize: e.getParameter(34076),
                maxRenderbufferSize: e.getParameter(34024),
                maxTextureUnits: e.getParameter(34930),
                maxTextureSize: e.getParameter(3379),
                maxAttributes: e.getParameter(34921),
                maxVertexUniforms: e.getParameter(36347),
                maxVertexTextureUnits: e.getParameter(35660),
                maxVaryingVectors: e.getParameter(36348),
                maxFragmentUniforms: e.getParameter(36349),
                glsl: e.getParameter(35724),
                renderer: e.getParameter(7937),
                vendor: e.getParameter(7936),
                version: e.getParameter(7938),
                readFloat: i,
                npotTextureCube: c
            }
        };

        function ne(t) {
            return !!t && "object" == typeof t && Array.isArray(t.shape) && Array.isArray(t.stride) && "number" == typeof t.offset && t.shape.length === t.stride.length && (Array.isArray(t.data) || e(t.data))
        }
        var re = function(e) {
                return Object.keys(e).map((function(t) {
                    return e[t]
                }))
            },
            ae = {
                shape: function(e) {
                    for (var t = [], n = e; n.length; n = n[0]) t.push(n.length);
                    return t
                },
                flatten: function(e, t, n, r) {
                    var a = 1;
                    if (t.length)
                        for (var i = 0; i < t.length; ++i) a *= t[i];
                    else a = 0;
                    var o = r || ee.allocType(n, a);
                    switch (t.length) {
                        case 0:
                            break;
                        case 1:
                            ! function(e, t, n) {
                                for (var r = 0; r < t; ++r) n[r] = e[r]
                            }(e, t[0], o);
                            break;
                        case 2:
                            ! function(e, t, n, r) {
                                for (var a = 0, i = 0; i < t; ++i)
                                    for (var o = e[i], u = 0; u < n; ++u) r[a++] = o[u]
                            }(e, t[0], t[1], o);
                            break;
                        case 3:
                            ie(e, t[0], t[1], t[2], o, 0);
                            break;
                        default:
                            ! function e(t, n, r, a, i) {
                                for (var o = 1, u = r + 1; u < n.length; ++u) o *= n[u];
                                var f = n[r];
                                if (n.length - r == 4) {
                                    var c = n[r + 1],
                                        s = n[r + 2],
                                        l = n[r + 3];
                                    for (u = 0; u < f; ++u) ie(t[u], c, s, l, a, i), i += o
                                } else
                                    for (u = 0; u < f; ++u) e(t[u], n, r + 1, a, i), i += o
                            }(e, t, 0, o, 0)
                    }
                    return o
                }
            };

        function ie(e, t, n, r, a, i) {
            for (var o = i, u = 0; u < t; ++u)
                for (var f = e[u], c = 0; c < n; ++c)
                    for (var s = f[c], l = 0; l < r; ++l) a[o++] = s[l]
        }
        var oe = {
                "[object Int8Array]": 5120,
                "[object Int16Array]": 5122,
                "[object Int32Array]": 5124,
                "[object Uint8Array]": 5121,
                "[object Uint8ClampedArray]": 5121,
                "[object Uint16Array]": 5123,
                "[object Uint32Array]": 5125,
                "[object Float32Array]": 5126,
                "[object Float64Array]": 5121,
                "[object ArrayBuffer]": 5121
            },
            ue = {
                int8: 5120,
                int16: 5122,
                int32: 5124,
                uint8: 5121,
                uint16: 5123,
                uint32: 5125,
                float: 5126,
                float32: 5126
            },
            fe = {
                dynamic: 35048,
                stream: 35040,
                static: 35044
            },
            ce = ae.flatten,
            se = ae.shape,
            le = 35044,
            de = 35040,
            pe = 5121,
            me = 5126,
            he = [];

        function ve(e) {
            return 0 | oe[Object.prototype.toString.call(e)]
        }

        function be(e, t) {
            for (var n = 0; n < t.length; ++n) e[n] = t[n]
        }

        function ge(e, t, n, r, a, i, o) {
            for (var u = 0, f = 0; f < n; ++f)
                for (var c = 0; c < r; ++c) e[u++] = t[a * f + i * c + o]
        }
        he[5120] = 1, he[5122] = 2, he[5124] = 4, he[5121] = 1, he[5123] = 2, he[5125] = 4, he[5126] = 4;
        var ye = {
                points: 0,
                point: 0,
                lines: 1,
                line: 1,
                triangles: 4,
                triangle: 4,
                "line loop": 2,
                "line strip": 3,
                "triangle strip": 5,
                "triangle fan": 6
            },
            xe = 0,
            we = 1,
            _e = 4,
            ke = 5120,
            Ae = 5121,
            Me = 5122,
            Se = 5123,
            Te = 5124,
            je = 5125,
            Ee = 34963,
            Ce = 35040,
            Oe = 35044,
            De = new Float32Array(1),
            Fe = new Uint32Array(De.buffer),
            Ie = 5123;

        function Pe(e) {
            for (var t = ee.allocType(Ie, e.length), n = 0; n < e.length; ++n)
                if (isNaN(e[n])) t[n] = 65535;
                else if (e[n] === 1 / 0) t[n] = 31744;
            else if (e[n] === -1 / 0) t[n] = 64512;
            else {
                De[0] = e[n];
                var r = Fe[0],
                    a = r >>> 31 << 15,
                    i = (r << 1 >>> 24) - 127,
                    o = r >> 13 & 1023;
                if (i < -24) t[n] = a;
                else if (i < -14) {
                    var u = -14 - i;
                    t[n] = a + (o + 1024 >> u)
                } else t[n] = i > 15 ? a + 31744 : a + (i + 15 << 10) + o
            }
            return t
        }

        function Re(t) {
            return Array.isArray(t) || e(t)
        }
        var ze = function(e) {
                return !(e & e - 1 || !e)
            },
            Be = 34467,
            Le = 3553,
            Ue = 34067,
            Ne = 34069,
            We = 6408,
            qe = 6406,
            Ge = 6407,
            Ye = 6409,
            He = 6410,
            Xe = 32854,
            Qe = 32855,
            Ve = 36194,
            Ze = 32819,
            $e = 32820,
            Ke = 33635,
            Je = 34042,
            et = 6402,
            tt = 34041,
            nt = 35904,
            rt = 35906,
            at = 36193,
            it = 33776,
            ot = 33777,
            ut = 33778,
            ft = 33779,
            ct = 35986,
            st = 35987,
            lt = 34798,
            dt = 35840,
            pt = 35841,
            mt = 35842,
            ht = 35843,
            vt = 36196,
            bt = 5121,
            gt = 5123,
            yt = 5125,
            xt = 5126,
            wt = 10242,
            _t = 10243,
            kt = 10497,
            At = 33071,
            Mt = 33648,
            St = 10240,
            Tt = 10241,
            jt = 9728,
            Et = 9729,
            Ct = 9984,
            Ot = 9985,
            Dt = 9986,
            Ft = 9987,
            It = 33170,
            Pt = 4352,
            Rt = 4353,
            zt = 4354,
            Bt = 34046,
            Lt = 3317,
            Ut = 37440,
            Nt = 37441,
            Wt = 37443,
            qt = 37444,
            Gt = 33984,
            Yt = [Ct, Dt, Ot, Ft],
            Ht = [0, Ye, He, Ge, We],
            Xt = {};

        function Qt(e) {
            return "[object " + e + "]"
        }
        Xt[Ye] = Xt[qe] = Xt[et] = 1, Xt[tt] = Xt[He] = 2, Xt[Ge] = Xt[nt] = 3, Xt[We] = Xt[rt] = 4;
        var Vt = Qt("HTMLCanvasElement"),
            Zt = Qt("CanvasRenderingContext2D"),
            $t = Qt("ImageBitmap"),
            Kt = Qt("HTMLImageElement"),
            Jt = Qt("HTMLVideoElement"),
            en = Object.keys(oe).concat([Vt, Zt, $t, Kt, Jt]),
            tn = [];
        tn[bt] = 1, tn[xt] = 4, tn[at] = 2, tn[gt] = 2, tn[yt] = 4;
        var nn = [];

        function rn(e) {
            return Array.isArray(e) && (0 === e.length || "number" == typeof e[0])
        }

        function an(e) {
            return !!Array.isArray(e) && !(0 === e.length || !Re(e[0]))
        }

        function on(e) {
            return Object.prototype.toString.call(e)
        }

        function un(e) {
            return on(e) === Vt
        }

        function fn(e) {
            if (!e) return !1;
            var t = on(e);
            return en.indexOf(t) >= 0 || rn(e) || an(e) || ne(e)
        }

        function cn(e) {
            return 0 | oe[Object.prototype.toString.call(e)]
        }

        function sn(e, t) {
            return ee.allocType(e.type === at ? xt : e.type, t)
        }

        function ln(e, t) {
            e.type === at ? (e.data = Pe(t), ee.freeType(t)) : e.data = t
        }

        function dn(e, t, n, r, a, i) {
            var o;
            if (o = void 0 !== nn[e] ? nn[e] : Xt[e] * tn[t], i && (o *= 6), a) {
                for (var u = 0, f = n; f >= 1;) u += o * f * f, f /= 2;
                return u
            }
            return o * n * r
        }

        function pn(n, r, a, i, o, u, f) {
            var c = {
                    "don't care": Pt,
                    "dont care": Pt,
                    nice: zt,
                    fast: Rt
                },
                s = {
                    repeat: kt,
                    clamp: At,
                    mirror: Mt
                },
                l = {
                    nearest: jt,
                    linear: Et
                },
                d = t({
                    mipmap: Ft,
                    "nearest mipmap nearest": Ct,
                    "linear mipmap nearest": Ot,
                    "nearest mipmap linear": Dt,
                    "linear mipmap linear": Ft
                }, l),
                p = {
                    none: 0,
                    browser: qt
                },
                m = {
                    uint8: bt,
                    rgba4: Ze,
                    rgb565: Ke,
                    "rgb5 a1": $e
                },
                h = {
                    alpha: qe,
                    luminance: Ye,
                    "luminance alpha": He,
                    rgb: Ge,
                    rgba: We,
                    rgba4: Xe,
                    "rgb5 a1": Qe,
                    rgb565: Ve
                },
                v = {};
            r.ext_srgb && (h.srgb = nt, h.srgba = rt), r.oes_texture_float && (m.float32 = m.float = xt), r.oes_texture_half_float && (m.float16 = m["half float"] = at), r.webgl_depth_texture && (t(h, {
                depth: et,
                "depth stencil": tt
            }), t(m, {
                uint16: gt,
                uint32: yt,
                "depth stencil": Je
            })), r.webgl_compressed_texture_s3tc && t(v, {
                "rgb s3tc dxt1": it,
                "rgba s3tc dxt1": ot,
                "rgba s3tc dxt3": ut,
                "rgba s3tc dxt5": ft
            }), r.webgl_compressed_texture_atc && t(v, {
                "rgb atc": ct,
                "rgba atc explicit alpha": st,
                "rgba atc interpolated alpha": lt
            }), r.webgl_compressed_texture_pvrtc && t(v, {
                "rgb pvrtc 4bppv1": dt,
                "rgb pvrtc 2bppv1": pt,
                "rgba pvrtc 4bppv1": mt,
                "rgba pvrtc 2bppv1": ht
            }), r.webgl_compressed_texture_etc1 && (v["rgb etc1"] = vt);
            var b = Array.prototype.slice.call(n.getParameter(Be));
            Object.keys(v).forEach((function(e) {
                var t = v[e];
                b.indexOf(t) >= 0 && (h[e] = t)
            }));
            var g = Object.keys(h);
            a.textureFormats = g;
            var y = [];
            Object.keys(h).forEach((function(e) {
                var t = h[e];
                y[t] = e
            }));
            var x = [];
            Object.keys(m).forEach((function(e) {
                var t = m[e];
                x[t] = e
            }));
            var w = [];
            Object.keys(l).forEach((function(e) {
                var t = l[e];
                w[t] = e
            }));
            var _ = [];
            Object.keys(d).forEach((function(e) {
                var t = d[e];
                _[t] = e
            }));
            var k = [];
            Object.keys(s).forEach((function(e) {
                var t = s[e];
                k[t] = e
            }));
            var A = g.reduce((function(e, t) {
                var n = h[t];
                return n === Ye || n === qe || n === Ye || n === He || n === et || n === tt ? e[n] = n : n === Qe || t.indexOf("rgba") >= 0 ? e[n] = We : e[n] = Ge, e
            }), {});

            function M() {
                this.internalformat = We, this.format = We, this.type = bt, this.compressed = !1, this.premultiplyAlpha = !1, this.flipY = !1, this.unpackAlignment = 1, this.colorSpace = qt, this.width = 0, this.height = 0, this.channels = 0
            }

            function S(e, t) {
                e.internalformat = t.internalformat, e.format = t.format, e.type = t.type, e.compressed = t.compressed, e.premultiplyAlpha = t.premultiplyAlpha, e.flipY = t.flipY, e.unpackAlignment = t.unpackAlignment, e.colorSpace = t.colorSpace, e.width = t.width, e.height = t.height, e.channels = t.channels
            }

            function T(e, t) {
                if ("object" == typeof t && t) {
                    if ("premultiplyAlpha" in t && (D.type(t.premultiplyAlpha, "boolean", "invalid premultiplyAlpha"), e.premultiplyAlpha = t.premultiplyAlpha), "flipY" in t && (D.type(t.flipY, "boolean", "invalid texture flip"), e.flipY = t.flipY), "alignment" in t && (D.oneOf(t.alignment, [1, 2, 4, 8], "invalid texture unpack alignment"), e.unpackAlignment = t.alignment), "colorSpace" in t && (D.parameter(t.colorSpace, p, "invalid colorSpace"), e.colorSpace = p[t.colorSpace]), "type" in t) {
                        var n = t.type;
                        D(r.oes_texture_float || !("float" === n || "float32" === n), "you must enable the OES_texture_float extension in order to use floating point textures."), D(r.oes_texture_half_float || !("half float" === n || "float16" === n), "you must enable the OES_texture_half_float extension in order to use 16-bit floating point textures."), D(r.webgl_depth_texture || !("uint16" === n || "uint32" === n || "depth stencil" === n), "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."), D.parameter(n, m, "invalid texture type"), e.type = m[n]
                    }
                    var i = e.width,
                        o = e.height,
                        u = e.channels,
                        f = !1;
                    "shape" in t ? (D(Array.isArray(t.shape) && t.shape.length >= 2, "shape must be an array"), i = t.shape[0], o = t.shape[1], 3 === t.shape.length && (u = t.shape[2], D(u > 0 && u <= 4, "invalid number of channels"), f = !0), D(i >= 0 && i <= a.maxTextureSize, "invalid width"), D(o >= 0 && o <= a.maxTextureSize, "invalid height")) : ("radius" in t && (i = o = t.radius, D(i >= 0 && i <= a.maxTextureSize, "invalid radius")), "width" in t && (i = t.width, D(i >= 0 && i <= a.maxTextureSize, "invalid width")), "height" in t && (o = t.height, D(o >= 0 && o <= a.maxTextureSize, "invalid height")), "channels" in t && (u = t.channels, D(u > 0 && u <= 4, "invalid number of channels"), f = !0)), e.width = 0 | i, e.height = 0 | o, e.channels = 0 | u;
                    var c = !1;
                    if ("format" in t) {
                        var s = t.format;
                        D(r.webgl_depth_texture || !("depth" === s || "depth stencil" === s), "you must enable the WEBGL_depth_texture extension in order to use depth/stencil textures."), D.parameter(s, h, "invalid texture format");
                        var l = e.internalformat = h[s];
                        e.format = A[l], s in m && ("type" in t || (e.type = m[s])), s in v && (e.compressed = !0), c = !0
                    }!f && c ? e.channels = Xt[e.format] : f && !c ? e.channels !== Ht[e.format] && (e.format = e.internalformat = Ht[e.channels]) : c && f && D(e.channels === Xt[e.format], "number of channels inconsistent with specified format")
                }
            }

            function j(e) {
                n.pixelStorei(Ut, e.flipY), n.pixelStorei(Nt, e.premultiplyAlpha), n.pixelStorei(Wt, e.colorSpace), n.pixelStorei(Lt, e.unpackAlignment)
            }

            function E() {
                M.call(this), this.xOffset = 0, this.yOffset = 0, this.data = null, this.needsFree = !1, this.element = null, this.needsCopy = !1
            }

            function C(t, n) {
                var r = null;
                if (fn(n) ? r = n : n && (D.type(n, "object", "invalid pixel data type"), T(t, n), "x" in n && (t.xOffset = 0 | n.x), "y" in n && (t.yOffset = 0 | n.y), fn(n.data) && (r = n.data)), D(!t.compressed || r instanceof Uint8Array, "compressed texture data must be stored in a uint8array"), n.copy) {
                    D(!r, "can not specify copy and data field for the same texture");
                    var i = o.viewportWidth,
                        u = o.viewportHeight;
                    t.width = t.width || i - t.xOffset, t.height = t.height || u - t.yOffset, t.needsCopy = !0, D(t.xOffset >= 0 && t.xOffset < i && t.yOffset >= 0 && t.yOffset < u && t.width > 0 && t.width <= i && t.height > 0 && t.height <= u, "copy texture read out of bounds")
                } else if (r) {
                    if (e(r)) t.channels = t.channels || 4, t.data = r, "type" in n || t.type !== bt || (t.type = cn(r));
                    else if (rn(r)) t.channels = t.channels || 4,
                        function(e, t) {
                            var n = t.length;
                            switch (e.type) {
                                case bt:
                                case gt:
                                case yt:
                                case xt:
                                    var r = ee.allocType(e.type, n);
                                    r.set(t), e.data = r;
                                    break;
                                case at:
                                    e.data = Pe(t);
                                    break;
                                default:
                                    D.raise("unsupported texture type, must specify a typed array")
                            }
                        }(t, r), t.alignment = 1, t.needsFree = !0;
                    else if (ne(r)) {
                        var f = r.data;
                        Array.isArray(f) || t.type !== bt || (t.type = cn(f));
                        var c, s, l, d, p, m, h = r.shape,
                            v = r.stride;
                        3 === h.length ? (l = h[2], m = v[2]) : (D(2 === h.length, "invalid ndarray pixel data, must be 2 or 3D"), l = 1, m = 1), c = h[0], s = h[1], d = v[0], p = v[1], t.alignment = 1, t.width = c, t.height = s, t.channels = l, t.format = t.internalformat = Ht[l], t.needsFree = !0,
                            function(e, t, n, r, a, i) {
                                for (var o = e.width, u = e.height, f = e.channels, c = sn(e, o * u * f), s = 0, l = 0; l < u; ++l)
                                    for (var d = 0; d < o; ++d)
                                        for (var p = 0; p < f; ++p) c[s++] = t[n * d + r * l + a * p + i];
                                ln(e, c)
                            }(t, f, d, p, m, r.offset)
                    } else if (un(r) || on(r) === Zt) un(r) ? t.element = r : t.element = r.canvas, t.width = t.element.width, t.height = t.element.height, t.channels = 4;
                    else if (function(e) {
                            return on(e) === $t
                        }(r)) t.element = r, t.width = r.width, t.height = r.height, t.channels = 4;
                    else if (function(e) {
                            return on(e) === Kt
                        }(r)) t.element = r, t.width = r.naturalWidth, t.height = r.naturalHeight, t.channels = 4;
                    else if (function(e) {
                            return on(e) === Jt
                        }(r)) t.element = r, t.width = r.videoWidth, t.height = r.videoHeight, t.channels = 4;
                    else if (an(r)) {
                        var b = t.width || r[0].length,
                            g = t.height || r.length,
                            y = t.channels;
                        y = Re(r[0][0]) ? y || r[0][0].length : y || 1;
                        for (var x = ae.shape(r), w = 1, _ = 0; _ < x.length; ++_) w *= x[_];
                        var k = sn(t, w);
                        ae.flatten(r, x, "", k), ln(t, k), t.alignment = 1, t.width = b, t.height = g, t.channels = y, t.format = t.internalformat = Ht[y], t.needsFree = !0
                    }
                } else t.width = t.width || 1, t.height = t.height || 1, t.channels = t.channels || 4;
                t.type === xt ? D(a.extensions.indexOf("oes_texture_float") >= 0, "oes_texture_float extension not enabled") : t.type === at && D(a.extensions.indexOf("oes_texture_half_float") >= 0, "oes_texture_half_float extension not enabled")
            }

            function O(e, t, r) {
                var a = e.element,
                    o = e.data,
                    u = e.internalformat,
                    f = e.format,
                    c = e.type,
                    s = e.width,
                    l = e.height,
                    d = e.channels;
                if (j(e), a) n.texImage2D(t, r, f, f, c, a);
                else if (e.compressed) n.compressedTexImage2D(t, r, u, s, l, 0, o);
                else if (e.needsCopy) i(), n.copyTexImage2D(t, r, f, e.xOffset, e.yOffset, s, l, 0);
                else {
                    var p = !o;
                    p && (o = ee.zero.allocType(c, s * l * d)), n.texImage2D(t, r, f, s, l, 0, f, c, o), p && o && ee.zero.freeType(o)
                }
            }

            function F(e, t, r, a, o) {
                var u = e.element,
                    f = e.data,
                    c = e.internalformat,
                    s = e.format,
                    l = e.type,
                    d = e.width,
                    p = e.height;
                j(e), u ? n.texSubImage2D(t, o, r, a, s, l, u) : e.compressed ? n.compressedTexSubImage2D(t, o, r, a, c, d, p, f) : e.needsCopy ? (i(), n.copyTexSubImage2D(t, o, r, a, e.xOffset, e.yOffset, d, p)) : n.texSubImage2D(t, o, r, a, d, p, s, l, f)
            }
            var I = [];

            function P() {
                return I.pop() || new E
            }

            function R(e) {
                e.needsFree && ee.freeType(e.data), E.call(e), I.push(e)
            }

            function z() {
                M.call(this), this.genMipmaps = !1, this.mipmapHint = Pt, this.mipmask = 0, this.images = Array(16)
            }

            function B(e, t, n) {
                var r = e.images[0] = P();
                e.mipmask = 1, r.width = e.width = t, r.height = e.height = n, r.channels = e.channels = 4
            }

            function L(e, t) {
                var n = null;
                if (fn(t)) S(n = e.images[0] = P(), e), C(n, t), e.mipmask = 1;
                else if (T(e, t), Array.isArray(t.mipmap))
                    for (var r = t.mipmap, a = 0; a < r.length; ++a) S(n = e.images[a] = P(), e), n.width >>= a, n.height >>= a, C(n, r[a]), e.mipmask |= 1 << a;
                else S(n = e.images[0] = P(), e), C(n, t), e.mipmask = 1;
                S(e, e.images[0]), (e.compressed && e.internalformat === it || e.internalformat === ot || e.internalformat === ut || e.internalformat === ft) && D(e.width % 4 == 0 && e.height % 4 == 0, "for compressed texture formats, mipmap level 0 must have width and height that are a multiple of 4")
            }

            function U(e, t) {
                for (var n = e.images, r = 0; r < n.length; ++r) {
                    if (!n[r]) return;
                    O(n[r], t, r)
                }
            }
            var N = [];

            function W() {
                var e = N.pop() || new z;
                M.call(e), e.mipmask = 0;
                for (var t = 0; t < 16; ++t) e.images[t] = null;
                return e
            }

            function q(e) {
                for (var t = e.images, n = 0; n < t.length; ++n) t[n] && R(t[n]), t[n] = null;
                N.push(e)
            }

            function G() {
                this.minFilter = jt, this.magFilter = jt, this.wrapS = At, this.wrapT = At, this.anisotropic = 1, this.genMipmaps = !1, this.mipmapHint = Pt
            }

            function Y(e, t) {
                if ("min" in t) {
                    var n = t.min;
                    D.parameter(n, d), e.minFilter = d[n], Yt.indexOf(e.minFilter) >= 0 && !("faces" in t) && (e.genMipmaps = !0)
                }
                if ("mag" in t) {
                    var r = t.mag;
                    D.parameter(r, l), e.magFilter = l[r]
                }
                var i = e.wrapS,
                    o = e.wrapT;
                if ("wrap" in t) {
                    var u = t.wrap;
                    "string" == typeof u ? (D.parameter(u, s), i = o = s[u]) : Array.isArray(u) && (D.parameter(u[0], s), D.parameter(u[1], s), i = s[u[0]], o = s[u[1]])
                } else {
                    if ("wrapS" in t) {
                        var f = t.wrapS;
                        D.parameter(f, s), i = s[f]
                    }
                    if ("wrapT" in t) {
                        var p = t.wrapT;
                        D.parameter(p, s), o = s[p]
                    }
                }
                if (e.wrapS = i, e.wrapT = o, "anisotropic" in t) {
                    var m = t.anisotropic;
                    D("number" == typeof m && m >= 1 && m <= a.maxAnisotropic, "aniso samples must be between 1 and "), e.anisotropic = t.anisotropic
                }
                if ("mipmap" in t) {
                    var h = !1;
                    switch (typeof t.mipmap) {
                        case "string":
                            D.parameter(t.mipmap, c, "invalid mipmap hint"), e.mipmapHint = c[t.mipmap], e.genMipmaps = !0, h = !0;
                            break;
                        case "boolean":
                            h = e.genMipmaps = t.mipmap;
                            break;
                        case "object":
                            D(Array.isArray(t.mipmap), "invalid mipmap type"), e.genMipmaps = !1, h = !0;
                            break;
                        default:
                            D.raise("invalid mipmap type")
                    }!h || "min" in t || (e.minFilter = Ct)
                }
            }

            function H(e, t) {
                n.texParameteri(t, Tt, e.minFilter), n.texParameteri(t, St, e.magFilter), n.texParameteri(t, wt, e.wrapS), n.texParameteri(t, _t, e.wrapT), r.ext_texture_filter_anisotropic && n.texParameteri(t, Bt, e.anisotropic), e.genMipmaps && (n.hint(It, e.mipmapHint), n.generateMipmap(t))
            }
            var X = 0,
                Q = {},
                V = a.maxTextureUnits,
                Z = Array(V).map((function() {
                    return null
                }));

            function $(e) {
                M.call(this), this.mipmask = 0, this.internalformat = We, this.id = X++, this.refCount = 1, this.target = e, this.texture = n.createTexture(), this.unit = -1, this.bindCount = 0, this.texInfo = new G, f.profile && (this.stats = {
                    size: 0
                })
            }

            function K(e) {
                n.activeTexture(Gt), n.bindTexture(e.target, e.texture)
            }

            function J() {
                var e = Z[0];
                e ? n.bindTexture(e.target, e.texture) : n.bindTexture(Le, null)
            }

            function te(e) {
                var t = e.texture;
                D(t, "must not double destroy texture");
                var r = e.unit,
                    a = e.target;
                r >= 0 && (n.activeTexture(Gt + r), n.bindTexture(a, null), Z[r] = null), n.deleteTexture(t), e.texture = null, e.params = null, e.pixels = null, e.refCount = 0, delete Q[e.id], u.textureCount--
            }
            return t($.prototype, {
                bind: function() {
                    this.bindCount += 1;
                    var e = this.unit;
                    if (e < 0) {
                        for (var t = 0; t < V; ++t) {
                            var r = Z[t];
                            if (r) {
                                if (r.bindCount > 0) continue;
                                r.unit = -1
                            }
                            Z[t] = this, e = t;
                            break
                        }
                        e >= V && D.raise("insufficient number of texture units"), f.profile && u.maxTextureUnits < e + 1 && (u.maxTextureUnits = e + 1), this.unit = e, n.activeTexture(Gt + e), n.bindTexture(this.target, this.texture)
                    }
                    return e
                },
                unbind: function() {
                    this.bindCount -= 1
                },
                decRef: function() {
                    --this.refCount <= 0 && te(this)
                }
            }), f.profile && (u.getTotalTextureSize = function() {
                var e = 0;
                return Object.keys(Q).forEach((function(t) {
                    e += Q[t].stats.size
                })), e
            }), {
                create2D: function(e, t) {
                    var r = new $(Le);

                    function i(e, t) {
                        var n = r.texInfo;
                        G.call(n);
                        var o = W();
                        return "number" == typeof e ? B(o, 0 | e, "number" == typeof t ? 0 | t : 0 | e) : e ? (D.type(e, "object", "invalid arguments to regl.texture"), Y(n, e), L(o, e)) : B(o, 1, 1), n.genMipmaps && (o.mipmask = (o.width << 1) - 1), r.mipmask = o.mipmask, S(r, o), D.texture2D(n, o, a), r.internalformat = o.internalformat, i.width = o.width, i.height = o.height, K(r), U(o, Le), H(n, Le), J(), q(o), f.profile && (r.stats.size = dn(r.internalformat, r.type, o.width, o.height, n.genMipmaps, !1)), i.format = y[r.internalformat], i.type = x[r.type], i.mag = w[n.magFilter], i.min = _[n.minFilter], i.wrapS = k[n.wrapS], i.wrapT = k[n.wrapT], i
                    }
                    return Q[r.id] = r, u.textureCount++, i(e, t), i.subimage = function(e, t, n, a) {
                        D(!!e, "must specify image data");
                        var o = 0 | t,
                            u = 0 | n,
                            f = 0 | a,
                            c = P();
                        return S(c, r), c.width = 0, c.height = 0, C(c, e), c.width = c.width || (r.width >> f) - o, c.height = c.height || (r.height >> f) - u, D(r.type === c.type && r.format === c.format && r.internalformat === c.internalformat, "incompatible format for texture.subimage"), D(o >= 0 && u >= 0 && o + c.width <= r.width && u + c.height <= r.height, "texture.subimage write out of bounds"), D(r.mipmask & 1 << f, "missing mipmap data"), D(c.data || c.element || c.needsCopy, "missing image data"), K(r), F(c, Le, o, u, f), J(), R(c), i
                    }, i.resize = function(e, t) {
                        var a, o = 0 | e,
                            u = 0 | t || o;
                        if (o === r.width && u === r.height) return i;
                        i.width = r.width = o, i.height = r.height = u, K(r);
                        for (var c = r.channels, s = r.type, l = 0; r.mipmask >> l; ++l) {
                            var d = o >> l,
                                p = u >> l;
                            if (!d || !p) break;
                            a = ee.zero.allocType(s, d * p * c), n.texImage2D(Le, l, r.format, d, p, 0, r.format, r.type, a), a && ee.zero.freeType(a)
                        }
                        return J(), f.profile && (r.stats.size = dn(r.internalformat, r.type, o, u, !1, !1)), i
                    }, i._reglType = "texture2d", i._texture = r, f.profile && (i.stats = r.stats), i.destroy = function() {
                        r.decRef()
                    }, i
                },
                createCube: function(e, t, r, i, o, c) {
                    var s = new $(Ue);
                    Q[s.id] = s, u.cubeCount++;
                    var l = new Array(6);

                    function d(e, t, n, r, i, o) {
                        var u, c = s.texInfo;
                        for (G.call(c), u = 0; u < 6; ++u) l[u] = W();
                        if ("number" != typeof e && e)
                            if ("object" == typeof e)
                                if (t) L(l[0], e), L(l[1], t), L(l[2], n), L(l[3], r), L(l[4], i), L(l[5], o);
                                else if (Y(c, e), T(s, e), "faces" in e) {
                            var p = e.faces;
                            for (D(Array.isArray(p) && 6 === p.length, "cube faces must be a length 6 array"), u = 0; u < 6; ++u) D("object" == typeof p[u] && !!p[u], "invalid input for cube map face"), S(l[u], s), L(l[u], p[u])
                        } else
                            for (u = 0; u < 6; ++u) L(l[u], e);
                        else D.raise("invalid arguments to cube map");
                        else {
                            var m = 0 | e || 1;
                            for (u = 0; u < 6; ++u) B(l[u], m, m)
                        }
                        for (S(s, l[0]), a.npotTextureCube || D(ze(s.width) && ze(s.height), "your browser does not support non power or two texture dimensions"), c.genMipmaps ? s.mipmask = (l[0].width << 1) - 1 : s.mipmask = l[0].mipmask, D.textureCube(s, c, l, a), s.internalformat = l[0].internalformat, d.width = l[0].width, d.height = l[0].height, K(s), u = 0; u < 6; ++u) U(l[u], Ne + u);
                        for (H(c, Ue), J(), f.profile && (s.stats.size = dn(s.internalformat, s.type, d.width, d.height, c.genMipmaps, !0)), d.format = y[s.internalformat], d.type = x[s.type], d.mag = w[c.magFilter], d.min = _[c.minFilter], d.wrapS = k[c.wrapS], d.wrapT = k[c.wrapT], u = 0; u < 6; ++u) q(l[u]);
                        return d
                    }
                    return d(e, t, r, i, o, c), d.subimage = function(e, t, n, r, a) {
                        D(!!t, "must specify image data"), D("number" == typeof e && e === (0 | e) && e >= 0 && e < 6, "invalid face");
                        var i = 0 | n,
                            o = 0 | r,
                            u = 0 | a,
                            f = P();
                        return S(f, s), f.width = 0, f.height = 0, C(f, t), f.width = f.width || (s.width >> u) - i, f.height = f.height || (s.height >> u) - o, D(s.type === f.type && s.format === f.format && s.internalformat === f.internalformat, "incompatible format for texture.subimage"), D(i >= 0 && o >= 0 && i + f.width <= s.width && o + f.height <= s.height, "texture.subimage write out of bounds"), D(s.mipmask & 1 << u, "missing mipmap data"), D(f.data || f.element || f.needsCopy, "missing image data"), K(s), F(f, Ne + e, i, o, u), J(), R(f), d
                    }, d.resize = function(e) {
                        var t = 0 | e;
                        if (t !== s.width) {
                            d.width = s.width = t, d.height = s.height = t, K(s);
                            for (var r = 0; r < 6; ++r)
                                for (var a = 0; s.mipmask >> a; ++a) n.texImage2D(Ne + r, a, s.format, t >> a, t >> a, 0, s.format, s.type, null);
                            return J(), f.profile && (s.stats.size = dn(s.internalformat, s.type, d.width, d.height, !1, !0)), d
                        }
                    }, d._reglType = "textureCube", d._texture = s, f.profile && (d.stats = s.stats), d.destroy = function() {
                        s.decRef()
                    }, d
                },
                clear: function() {
                    for (var e = 0; e < V; ++e) n.activeTexture(Gt + e), n.bindTexture(Le, null), Z[e] = null;
                    re(Q).forEach(te), u.cubeCount = 0, u.textureCount = 0
                },
                getTexture: function(e) {
                    return null
                },
                restore: function() {
                    for (var e = 0; e < V; ++e) {
                        var t = Z[e];
                        t && (t.bindCount = 0, t.unit = -1, Z[e] = null)
                    }
                    re(Q).forEach((function(e) {
                        e.texture = n.createTexture(), n.bindTexture(e.target, e.texture);
                        for (var t = 0; t < 32; ++t)
                            if (0 != (e.mipmask & 1 << t))
                                if (e.target === Le) n.texImage2D(Le, t, e.internalformat, e.width >> t, e.height >> t, 0, e.internalformat, e.type, null);
                                else
                                    for (var r = 0; r < 6; ++r) n.texImage2D(Ne + r, t, e.internalformat, e.width >> t, e.height >> t, 0, e.internalformat, e.type, null);
                        H(e.texInfo, e.target)
                    }))
                }
            }
        }
        nn[Xe] = 2, nn[Qe] = 2, nn[Ve] = 2, nn[tt] = 4, nn[it] = .5, nn[ot] = .5, nn[ut] = 1, nn[ft] = 1, nn[ct] = .5, nn[st] = 1, nn[lt] = 1, nn[dt] = .5, nn[pt] = .25, nn[mt] = .5, nn[ht] = .25, nn[vt] = .5;
        var mn = 36161,
            hn = 32854,
            vn = [];

        function bn(e, t, n) {
            return vn[e] * t * n
        }
        vn[hn] = 2, vn[32855] = 2, vn[36194] = 2, vn[33189] = 2, vn[36168] = 1, vn[34041] = 4, vn[35907] = 4, vn[34836] = 16, vn[34842] = 8, vn[34843] = 6;
        var gn = function(e, t, n, r, a) {
                var i = {
                    rgba4: hn,
                    rgb565: 36194,
                    "rgb5 a1": 32855,
                    depth: 33189,
                    stencil: 36168,
                    "depth stencil": 34041
                };
                t.ext_srgb && (i.srgba = 35907), t.ext_color_buffer_half_float && (i.rgba16f = 34842, i.rgb16f = 34843), t.webgl_color_buffer_float && (i.rgba32f = 34836);
                var o = [];
                Object.keys(i).forEach((function(e) {
                    var t = i[e];
                    o[t] = e
                }));
                var u = 0,
                    f = {};

                function c(e) {
                    this.id = u++, this.refCount = 1, this.renderbuffer = e, this.format = hn, this.width = 0, this.height = 0, a.profile && (this.stats = {
                        size: 0
                    })
                }

                function s(t) {
                    var n = t.renderbuffer;
                    D(n, "must not double destroy renderbuffer"), e.bindRenderbuffer(mn, null), e.deleteRenderbuffer(n), t.renderbuffer = null, t.refCount = 0, delete f[t.id], r.renderbufferCount--
                }
                return c.prototype.decRef = function() {
                    --this.refCount <= 0 && s(this)
                }, a.profile && (r.getTotalRenderbufferSize = function() {
                    var e = 0;
                    return Object.keys(f).forEach((function(t) {
                        e += f[t].stats.size
                    })), e
                }), {
                    create: function(t, u) {
                        var s = new c(e.createRenderbuffer());

                        function l(t, r) {
                            var u = 0,
                                f = 0,
                                c = hn;
                            if ("object" == typeof t && t) {
                                var d = t;
                                if ("shape" in d) {
                                    var p = d.shape;
                                    D(Array.isArray(p) && p.length >= 2, "invalid renderbuffer shape"), u = 0 | p[0], f = 0 | p[1]
                                } else "radius" in d && (u = f = 0 | d.radius), "width" in d && (u = 0 | d.width), "height" in d && (f = 0 | d.height);
                                "format" in d && (D.parameter(d.format, i, "invalid renderbuffer format"), c = i[d.format])
                            } else "number" == typeof t ? (u = 0 | t, f = "number" == typeof r ? 0 | r : u) : t ? D.raise("invalid arguments to renderbuffer constructor") : u = f = 1;
                            if (D(u > 0 && f > 0 && u <= n.maxRenderbufferSize && f <= n.maxRenderbufferSize, "invalid renderbuffer size"), u !== s.width || f !== s.height || c !== s.format) return l.width = s.width = u, l.height = s.height = f, s.format = c, e.bindRenderbuffer(mn, s.renderbuffer), e.renderbufferStorage(mn, c, u, f), D(0 === e.getError(), "invalid render buffer format"), a.profile && (s.stats.size = bn(s.format, s.width, s.height)), l.format = o[s.format], l
                        }
                        return f[s.id] = s, r.renderbufferCount++, l(t, u), l.resize = function(t, r) {
                            var i = 0 | t,
                                o = 0 | r || i;
                            return i === s.width && o === s.height ? l : (D(i > 0 && o > 0 && i <= n.maxRenderbufferSize && o <= n.maxRenderbufferSize, "invalid renderbuffer size"), l.width = s.width = i, l.height = s.height = o, e.bindRenderbuffer(mn, s.renderbuffer), e.renderbufferStorage(mn, s.format, i, o), D(0 === e.getError(), "invalid render buffer format"), a.profile && (s.stats.size = bn(s.format, s.width, s.height)), l)
                        }, l._reglType = "renderbuffer", l._renderbuffer = s, a.profile && (l.stats = s.stats), l.destroy = function() {
                            s.decRef()
                        }, l
                    },
                    clear: function() {
                        re(f).forEach(s)
                    },
                    restore: function() {
                        re(f).forEach((function(t) {
                            t.renderbuffer = e.createRenderbuffer(), e.bindRenderbuffer(mn, t.renderbuffer), e.renderbufferStorage(mn, t.format, t.width, t.height)
                        })), e.bindRenderbuffer(mn, null)
                    }
                }
            },
            yn = 36160,
            xn = 36161,
            wn = 3553,
            _n = 34069,
            kn = 36064,
            An = 36096,
            Mn = 36128,
            Sn = 33306,
            Tn = 36053,
            jn = 6402,
            En = [6407, 6408],
            Cn = [];
        Cn[6408] = 4, Cn[6407] = 3;
        var On = [];
        On[5121] = 1, On[5126] = 4, On[36193] = 2;
        var Dn = 33189,
            Fn = 36168,
            In = 34041,
            Pn = [32854, 32855, 36194, 35907, 34842, 34843, 34836],
            Rn = {};
        Rn[Tn] = "complete", Rn[36054] = "incomplete attachment", Rn[36057] = "incomplete dimensions", Rn[36055] = "incomplete, missing attachment", Rn[36061] = "unsupported";
        var zn = 5126;

        function Bn() {
            this.state = 0, this.x = 0, this.y = 0, this.z = 0, this.w = 0, this.buffer = null, this.size = 0, this.normalized = !1, this.type = zn, this.offset = 0, this.stride = 0, this.divisor = 0
        }
        var Ln = 35632,
            Un = 35633,
            Nn = 35718,
            Wn = 35721,
            qn = 6408,
            Gn = 5121,
            Yn = 3333,
            Hn = 5126;

        function Xn(t, n, r, a, i, o, u) {
            function f(f) {
                var c;
                null === n.next ? (D(i.preserveDrawingBuffer, 'you must create a webgl context with "preserveDrawingBuffer":true in order to read pixels from the drawing buffer'), c = Gn) : (D(null !== n.next.colorAttachments[0].texture, "You cannot read from a renderbuffer"), c = n.next.colorAttachments[0].texture._texture.type, o.oes_texture_float ? (D(c === Gn || c === Hn, "Reading from a framebuffer is only allowed for the types 'uint8' and 'float'"), c === Hn && D(u.readFloat, "Reading 'float' values is not permitted in your browser. For a fallback, please see: https://www.npmjs.com/package/glsl-read-float")) : D(c === Gn, "Reading from a framebuffer is only allowed for the type 'uint8'"));
                var s = 0,
                    l = 0,
                    d = a.framebufferWidth,
                    p = a.framebufferHeight,
                    m = null;
                e(f) ? m = f : f && (D.type(f, "object", "invalid arguments to regl.read()"), s = 0 | f.x, l = 0 | f.y, D(s >= 0 && s < a.framebufferWidth, "invalid x offset for regl.read"), D(l >= 0 && l < a.framebufferHeight, "invalid y offset for regl.read"), d = 0 | (f.width || a.framebufferWidth - s), p = 0 | (f.height || a.framebufferHeight - l), m = f.data || null), m && (c === Gn ? D(m instanceof Uint8Array, "buffer must be 'Uint8Array' when reading from a framebuffer of type 'uint8'") : c === Hn && D(m instanceof Float32Array, "buffer must be 'Float32Array' when reading from a framebuffer of type 'float'")), D(d > 0 && d + s <= a.framebufferWidth, "invalid width for read pixels"), D(p > 0 && p + l <= a.framebufferHeight, "invalid height for read pixels"), r();
                var h = d * p * 4;
                return m || (c === Gn ? m = new Uint8Array(h) : c === Hn && (m = m || new Float32Array(h))), D.isTypedArray(m, "data buffer for regl.read() must be a typedarray"), D(m.byteLength >= h, "data buffer for regl.read() too small"), t.pixelStorei(Yn, 4), t.readPixels(s, l, d, p, qn, c, m), m
            }
            return function(e) {
                return e && "framebuffer" in e ? function(e) {
                    var t;
                    return n.setFBO({
                        framebuffer: e.framebuffer
                    }, (function() {
                        t = f(e)
                    })), t
                }(e) : f(e)
            }
        }

        function Qn(e) {
            return Array.prototype.slice.call(e)
        }

        function Vn(e) {
            return Qn(e).join("")
        }
        var Zn = "xyzw".split(""),
            $n = 5121,
            Kn = 1,
            Jn = 2,
            er = 0,
            tr = 1,
            nr = 2,
            rr = 3,
            ar = 4,
            ir = "dither",
            or = "blend.enable",
            ur = "blend.color",
            fr = "blend.equation",
            cr = "blend.func",
            sr = "depth.enable",
            lr = "depth.func",
            dr = "depth.range",
            pr = "depth.mask",
            mr = "colorMask",
            hr = "cull.enable",
            vr = "cull.face",
            br = "frontFace",
            gr = "lineWidth",
            yr = "polygonOffset.enable",
            xr = "polygonOffset.offset",
            wr = "sample.alpha",
            _r = "sample.enable",
            kr = "sample.coverage",
            Ar = "stencil.enable",
            Mr = "stencil.mask",
            Sr = "stencil.func",
            Tr = "stencil.opFront",
            jr = "stencil.opBack",
            Er = "scissor.enable",
            Cr = "scissor.box",
            Or = "viewport",
            Dr = "profile",
            Fr = "framebuffer",
            Ir = "vert",
            Pr = "frag",
            Rr = "elements",
            zr = "primitive",
            Br = "count",
            Lr = "offset",
            Ur = "instances",
            Nr = Fr + "Width",
            Wr = Fr + "Height",
            qr = Or + "Width",
            Gr = Or + "Height",
            Yr = "drawingBufferWidth",
            Hr = "drawingBufferHeight",
            Xr = [cr, fr, Sr, Tr, jr, kr, Or, Cr, xr],
            Qr = 34962,
            Vr = 34963,
            Zr = 3553,
            $r = 34067,
            Kr = 2884,
            Jr = 3042,
            ea = 3024,
            ta = 2960,
            na = 2929,
            ra = 3089,
            aa = 32823,
            ia = 32926,
            oa = 32928,
            ua = 5126,
            fa = 35664,
            ca = 35665,
            sa = 35666,
            la = 5124,
            da = 35667,
            pa = 35668,
            ma = 35669,
            ha = 35670,
            va = 35671,
            ba = 35672,
            ga = 35673,
            ya = 35674,
            xa = 35675,
            wa = 35676,
            _a = 35678,
            ka = 35680,
            Aa = 4,
            Ma = 1028,
            Sa = 1029,
            Ta = 2304,
            ja = 2305,
            Ea = 32775,
            Ca = 32776,
            Oa = 519,
            Da = 7680,
            Fa = 0,
            Ia = 1,
            Pa = 32774,
            Ra = 513,
            za = 36160,
            Ba = 36064,
            La = {
                0: 0,
                1: 1,
                zero: 0,
                one: 1,
                "src color": 768,
                "one minus src color": 769,
                "src alpha": 770,
                "one minus src alpha": 771,
                "dst color": 774,
                "one minus dst color": 775,
                "dst alpha": 772,
                "one minus dst alpha": 773,
                "constant color": 32769,
                "one minus constant color": 32770,
                "constant alpha": 32771,
                "one minus constant alpha": 32772,
                "src alpha saturate": 776
            },
            Ua = ["constant color, constant alpha", "one minus constant color, constant alpha", "constant color, one minus constant alpha", "one minus constant color, one minus constant alpha", "constant alpha, constant color", "constant alpha, one minus constant color", "one minus constant alpha, constant color", "one minus constant alpha, one minus constant color"],
            Na = {
                never: 512,
                less: 513,
                "<": 513,
                equal: 514,
                "=": 514,
                "==": 514,
                "===": 514,
                lequal: 515,
                "<=": 515,
                greater: 516,
                ">": 516,
                notequal: 517,
                "!=": 517,
                "!==": 517,
                gequal: 518,
                ">=": 518,
                always: 519
            },
            Wa = {
                0: 0,
                zero: 0,
                keep: 7680,
                replace: 7681,
                increment: 7682,
                decrement: 7683,
                "increment wrap": 34055,
                "decrement wrap": 34056,
                invert: 5386
            },
            qa = {
                frag: 35632,
                vert: 35633
            },
            Ga = {
                cw: Ta,
                ccw: ja
            };

        function Ya(t) {
            return Array.isArray(t) || e(t) || ne(t)
        }

        function Ha(e) {
            return e.sort((function(e, t) {
                return e === Or ? -1 : t === Or ? 1 : e < t ? -1 : 1
            }))
        }

        function Xa(e, t, n, r) {
            this.thisDep = e, this.contextDep = t, this.propDep = n, this.append = r
        }

        function Qa(e) {
            return e && !(e.thisDep || e.contextDep || e.propDep)
        }

        function Va(e) {
            return new Xa(!1, !1, !1, e)
        }

        function Za(e, t) {
            var n = e.type;
            if (n === er) {
                var r = e.data.length;
                return new Xa(!0, r >= 1, r >= 2, t)
            }
            if (n === ar) {
                var a = e.data;
                return new Xa(a.thisDep, a.contextDep, a.propDep, t)
            }
            return new Xa(n === rr, n === nr, n === tr, t)
        }
        var $a = new Xa(!1, !1, !1, (function() {}));

        function Ka(e, n, r, a, i, o, u, f, c, s, l, d, p, m, h) {
            var v = s.Record,
                b = {
                    add: 32774,
                    subtract: 32778,
                    "reverse subtract": 32779
                };
            r.ext_blend_minmax && (b.min = Ea, b.max = Ca);
            var g = r.angle_instanced_arrays,
                y = r.webgl_draw_buffers,
                x = {
                    dirty: !0,
                    profile: h.profile
                },
                w = {},
                _ = [],
                k = {},
                A = {};

            function M(e) {
                return e.replace(".", "_")
            }

            function S(e, t, n) {
                var r = M(e);
                _.push(e), w[r] = x[r] = !!n, k[r] = t
            }

            function T(e, t, n) {
                var r = M(e);
                _.push(e), Array.isArray(n) ? (x[r] = n.slice(), w[r] = n.slice()) : x[r] = w[r] = n, A[r] = t
            }
            S(ir, ea), S(or, Jr), T(ur, "blendColor", [0, 0, 0, 0]), T(fr, "blendEquationSeparate", [Pa, Pa]), T(cr, "blendFuncSeparate", [Ia, Fa, Ia, Fa]), S(sr, na, !0), T(lr, "depthFunc", Ra), T(dr, "depthRange", [0, 1]), T(pr, "depthMask", !0), T(mr, mr, [!0, !0, !0, !0]), S(hr, Kr), T(vr, "cullFace", Sa), T(br, br, ja), T(gr, gr, 1), S(yr, aa), T(xr, "polygonOffset", [0, 0]), S(wr, ia), S(_r, oa), T(kr, "sampleCoverage", [1, !1]), S(Ar, ta), T(Mr, "stencilMask", -1), T(Sr, "stencilFunc", [Oa, 0, -1]), T(Tr, "stencilOpSeparate", [Ma, Da, Da, Da]), T(jr, "stencilOpSeparate", [Sa, Da, Da, Da]), S(Er, ra), T(Cr, "scissor", [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]), T(Or, Or, [0, 0, e.drawingBufferWidth, e.drawingBufferHeight]);
            var j = {
                    gl: e,
                    context: p,
                    strings: n,
                    next: w,
                    current: x,
                    draw: d,
                    elements: o,
                    buffer: i,
                    shader: l,
                    attributes: s.state,
                    uniforms: c,
                    framebuffer: f,
                    extensions: r,
                    timer: m,
                    isBufferArgs: Ya
                },
                E = {
                    primTypes: ye,
                    compareFuncs: Na,
                    blendFuncs: La,
                    blendEquations: b,
                    stencilOps: Wa,
                    glTypes: ue,
                    orientationType: Ga
                };
            D.optional((function() {
                j.isArrayLike = Re
            })), y && (E.backBuffer = [Sa], E.drawBuffer = G(a.maxDrawbuffers, (function(e) {
                return 0 === e ? [0] : G(e, (function(e) {
                    return Ba + e
                }))
            })));
            var C = 0;

            function O() {
                var e = function() {
                        var e = 0,
                            n = [],
                            r = [];

                        function a() {
                            var n = [],
                                r = [];
                            return t((function() {
                                n.push.apply(n, Qn(arguments))
                            }), {
                                def: function() {
                                    var t = "v" + e++;
                                    return r.push(t), arguments.length > 0 && (n.push(t, "="), n.push.apply(n, Qn(arguments)), n.push(";")), t
                                },
                                toString: function() {
                                    return Vn([r.length > 0 ? "var " + r.join(",") + ";" : "", Vn(n)])
                                }
                            })
                        }

                        function i() {
                            var e = a(),
                                n = a(),
                                r = e.toString,
                                i = n.toString;

                            function o(t, r) {
                                n(t, r, "=", e.def(t, r), ";")
                            }
                            return t((function() {
                                e.apply(e, Qn(arguments))
                            }), {
                                def: e.def,
                                entry: e,
                                exit: n,
                                save: o,
                                set: function(t, n, r) {
                                    o(t, n), e(t, n, "=", r, ";")
                                },
                                toString: function() {
                                    return r() + i()
                                }
                            })
                        }
                        var o = a(),
                            u = {};
                        return {
                            global: o,
                            link: function(t) {
                                for (var a = 0; a < r.length; ++a)
                                    if (r[a] === t) return n[a];
                                var i = "g" + e++;
                                return n.push(i), r.push(t), i
                            },
                            block: a,
                            proc: function(e, n) {
                                var r = [];

                                function a() {
                                    var e = "a" + r.length;
                                    return r.push(e), e
                                }
                                n = n || 0;
                                for (var o = 0; o < n; ++o) a();
                                var f = i(),
                                    c = f.toString;
                                return u[e] = t(f, {
                                    arg: a,
                                    toString: function() {
                                        return Vn(["function(", r.join(), "){", c(), "}"])
                                    }
                                })
                            },
                            scope: i,
                            cond: function() {
                                var e = Vn(arguments),
                                    n = i(),
                                    r = i(),
                                    a = n.toString,
                                    o = r.toString;
                                return t(n, {
                                    then: function() {
                                        return n.apply(n, Qn(arguments)), this
                                    },
                                    else: function() {
                                        return r.apply(r, Qn(arguments)), this
                                    },
                                    toString: function() {
                                        var t = o();
                                        return t && (t = "else{" + t + "}"), Vn(["if(", e, "){", a(), "}", t])
                                    }
                                })
                            },
                            compile: function() {
                                var e = ['"use strict";', o, "return {"];
                                Object.keys(u).forEach((function(t) {
                                    e.push('"', t, '":', u[t].toString(), ",")
                                })), e.push("}");
                                var t = Vn(e).replace(/;/g, ";\n").replace(/}/g, "}\n").replace(/{/g, "{\n");
                                return Function.apply(null, n.concat(t)).apply(null, r)
                            }
                        }
                    }(),
                    r = e.link,
                    a = e.global;
                e.id = C++, e.batchId = "0";
                var i = r(j),
                    o = e.shared = {
                        props: "a0"
                    };
                Object.keys(j).forEach((function(e) {
                    o[e] = a.def(i, ".", e)
                })), D.optional((function() {
                    e.CHECK = r(D), e.commandStr = D.guessCommand(), e.command = r(e.commandStr), e.assert = function(e, t, n) {
                        e("if(!(", t, "))", this.CHECK, ".commandRaise(", r(n), ",", this.command, ");")
                    }, E.invalidBlendCombinations = Ua
                }));
                var u = e.next = {},
                    f = e.current = {};
                Object.keys(A).forEach((function(e) {
                    Array.isArray(x[e]) && (u[e] = a.def(o.next, ".", e), f[e] = a.def(o.current, ".", e))
                }));
                var c = e.constants = {};
                Object.keys(E).forEach((function(e) {
                    c[e] = a.def(JSON.stringify(E[e]))
                })), e.invoke = function(t, n) {
                    switch (n.type) {
                        case er:
                            var a = ["this", o.context, o.props, e.batchId];
                            return t.def(r(n.data), ".call(", a.slice(0, Math.max(n.data.length + 1, 4)), ")");
                        case tr:
                            return t.def(o.props, n.data);
                        case nr:
                            return t.def(o.context, n.data);
                        case rr:
                            return t.def("this", n.data);
                        case ar:
                            return n.data.append(e, t), n.data.ref
                    }
                }, e.attribCache = {};
                var l = {};
                return e.scopeAttrib = function(e) {
                    var t = n.id(e);
                    if (t in l) return l[t];
                    var a = s.scope[t];
                    return a || (a = s.scope[t] = new v), l[t] = r(a)
                }, e
            }

            function F(e, t, r, u, c) {
                var s = e.static,
                    d = e.dynamic;
                D.optional((function() {
                    var e = [Fr, Ir, Pr, Rr, zr, Lr, Br, Ur, Dr].concat(_);

                    function t(t) {
                        Object.keys(t).forEach((function(t) {
                            D.command(e.indexOf(t) >= 0, 'unknown parameter "' + t + '"', c.commandStr)
                        }))
                    }
                    t(s), t(d)
                }));
                var p = function(e, t) {
                        var n = e.static,
                            r = e.dynamic;
                        if (Fr in n) {
                            var a = n[Fr];
                            return a ? (a = f.getFramebuffer(a), D.command(a, "invalid framebuffer object"), Va((function(e, t) {
                                var n = e.link(a),
                                    r = e.shared;
                                t.set(r.framebuffer, ".next", n);
                                var i = r.context;
                                return t.set(i, "." + Nr, n + ".width"), t.set(i, "." + Wr, n + ".height"), n
                            }))) : Va((function(e, t) {
                                var n = e.shared;
                                t.set(n.framebuffer, ".next", "null");
                                var r = n.context;
                                return t.set(r, "." + Nr, r + "." + Yr), t.set(r, "." + Wr, r + "." + Hr), "null"
                            }))
                        }
                        if (Fr in r) {
                            var i = r[Fr];
                            return Za(i, (function(e, t) {
                                var n = e.invoke(t, i),
                                    r = e.shared,
                                    a = r.framebuffer,
                                    o = t.def(a, ".getFramebuffer(", n, ")");
                                D.optional((function() {
                                    e.assert(t, "!" + n + "||" + o, "invalid framebuffer object")
                                })), t.set(a, ".next", o);
                                var u = r.context;
                                return t.set(u, "." + Nr, o + "?" + o + ".width:" + u + "." + Yr), t.set(u, "." + Wr, o + "?" + o + ".height:" + u + "." + Hr), o
                            }))
                        }
                        return null
                    }(e),
                    m = function(e, t, n) {
                        var r = e.static,
                            a = e.dynamic;

                        function i(e) {
                            if (e in r) {
                                var i = r[e];
                                D.commandType(i, "object", "invalid " + e, n.commandStr);
                                var o, u, f = !0,
                                    c = 0 | i.x,
                                    s = 0 | i.y;
                                return "width" in i ? (o = 0 | i.width, D.command(o >= 0, "invalid " + e, n.commandStr)) : f = !1, "height" in i ? (u = 0 | i.height, D.command(u >= 0, "invalid " + e, n.commandStr)) : f = !1, new Xa(!f && t && t.thisDep, !f && t && t.contextDep, !f && t && t.propDep, (function(e, t) {
                                    var n = e.shared.context,
                                        r = o;
                                    "width" in i || (r = t.def(n, ".", Nr, "-", c));
                                    var a = u;
                                    return "height" in i || (a = t.def(n, ".", Wr, "-", s)), [c, s, r, a]
                                }))
                            }
                            if (e in a) {
                                var l = a[e],
                                    d = Za(l, (function(t, n) {
                                        var r = t.invoke(n, l);
                                        D.optional((function() {
                                            t.assert(n, r + "&&typeof " + r + '==="object"', "invalid " + e)
                                        }));
                                        var a = t.shared.context,
                                            i = n.def(r, ".x|0"),
                                            o = n.def(r, ".y|0"),
                                            u = n.def('"width" in ', r, "?", r, ".width|0:", "(", a, ".", Nr, "-", i, ")"),
                                            f = n.def('"height" in ', r, "?", r, ".height|0:", "(", a, ".", Wr, "-", o, ")");
                                        return D.optional((function() {
                                            t.assert(n, u + ">=0&&" + f + ">=0", "invalid " + e)
                                        })), [i, o, u, f]
                                    }));
                                return t && (d.thisDep = d.thisDep || t.thisDep, d.contextDep = d.contextDep || t.contextDep, d.propDep = d.propDep || t.propDep), d
                            }
                            return t ? new Xa(t.thisDep, t.contextDep, t.propDep, (function(e, t) {
                                var n = e.shared.context;
                                return [0, 0, t.def(n, ".", Nr), t.def(n, ".", Wr)]
                            })) : null
                        }
                        var o = i(Or);
                        if (o) {
                            var u = o;
                            o = new Xa(o.thisDep, o.contextDep, o.propDep, (function(e, t) {
                                var n = u.append(e, t),
                                    r = e.shared.context;
                                return t.set(r, "." + qr, n[2]), t.set(r, "." + Gr, n[3]), n
                            }))
                        }
                        return {
                            viewport: o,
                            scissor_box: i(Cr)
                        }
                    }(e, p, c),
                    h = function(e, t) {
                        var n = e.static,
                            r = e.dynamic,
                            a = function() {
                                if (Rr in n) {
                                    var e = n[Rr];
                                    Ya(e) ? e = o.getElements(o.create(e, !0)) : e && (e = o.getElements(e), D.command(e, "invalid elements", t.commandStr));
                                    var a = Va((function(t, n) {
                                        if (e) {
                                            var r = t.link(e);
                                            return t.ELEMENTS = r, r
                                        }
                                        return t.ELEMENTS = null, null
                                    }));
                                    return a.value = e, a
                                }
                                if (Rr in r) {
                                    var i = r[Rr];
                                    return Za(i, (function(e, t) {
                                        var n = e.shared,
                                            r = n.isBufferArgs,
                                            a = n.elements,
                                            o = e.invoke(t, i),
                                            u = t.def("null"),
                                            f = t.def(r, "(", o, ")"),
                                            c = e.cond(f).then(u, "=", a, ".createStream(", o, ");").else(u, "=", a, ".getElements(", o, ");");
                                        return D.optional((function() {
                                            e.assert(c.else, "!" + o + "||" + u, "invalid elements")
                                        })), t.entry(c), t.exit(e.cond(f).then(a, ".destroyStream(", u, ");")), e.ELEMENTS = u, u
                                    }))
                                }
                                return null
                            }();

                        function i(e, i) {
                            if (e in n) {
                                var o = 0 | n[e];
                                return D.command(!i || o >= 0, "invalid " + e, t.commandStr), Va((function(e, t) {
                                    return i && (e.OFFSET = o), o
                                }))
                            }
                            if (e in r) {
                                var u = r[e];
                                return Za(u, (function(t, n) {
                                    var r = t.invoke(n, u);
                                    return i && (t.OFFSET = r, D.optional((function() {
                                        t.assert(n, r + ">=0", "invalid " + e)
                                    }))), r
                                }))
                            }
                            return i && a ? Va((function(e, t) {
                                return e.OFFSET = "0", 0
                            })) : null
                        }
                        var u = i(Lr, !0);
                        return {
                            elements: a,
                            primitive: function() {
                                if (zr in n) {
                                    var e = n[zr];
                                    return D.commandParameter(e, ye, "invalid primitve", t.commandStr), Va((function(t, n) {
                                        return ye[e]
                                    }))
                                }
                                if (zr in r) {
                                    var i = r[zr];
                                    return Za(i, (function(e, t) {
                                        var n = e.constants.primTypes,
                                            r = e.invoke(t, i);
                                        return D.optional((function() {
                                            e.assert(t, r + " in " + n, "invalid primitive, must be one of " + Object.keys(ye))
                                        })), t.def(n, "[", r, "]")
                                    }))
                                }
                                return a ? Qa(a) ? a.value ? Va((function(e, t) {
                                    return t.def(e.ELEMENTS, ".primType")
                                })) : Va((function() {
                                    return Aa
                                })) : new Xa(a.thisDep, a.contextDep, a.propDep, (function(e, t) {
                                    var n = e.ELEMENTS;
                                    return t.def(n, "?", n, ".primType:", Aa)
                                })) : null
                            }(),
                            count: function() {
                                if (Br in n) {
                                    var e = 0 | n[Br];
                                    return D.command("number" == typeof e && e >= 0, "invalid vertex count", t.commandStr), Va((function() {
                                        return e
                                    }))
                                }
                                if (Br in r) {
                                    var i = r[Br];
                                    return Za(i, (function(e, t) {
                                        var n = e.invoke(t, i);
                                        return D.optional((function() {
                                            e.assert(t, "typeof " + n + '==="number"&&' + n + ">=0&&" + n + "===(" + n + "|0)", "invalid vertex count")
                                        })), n
                                    }))
                                }
                                if (a) {
                                    if (Qa(a)) {
                                        if (a) return u ? new Xa(u.thisDep, u.contextDep, u.propDep, (function(e, t) {
                                            var n = t.def(e.ELEMENTS, ".vertCount-", e.OFFSET);
                                            return D.optional((function() {
                                                e.assert(t, n + ">=0", "invalid vertex offset/element buffer too small")
                                            })), n
                                        })) : Va((function(e, t) {
                                            return t.def(e.ELEMENTS, ".vertCount")
                                        }));
                                        var o = Va((function() {
                                            return -1
                                        }));
                                        return D.optional((function() {
                                            o.MISSING = !0
                                        })), o
                                    }
                                    var f = new Xa(a.thisDep || u.thisDep, a.contextDep || u.contextDep, a.propDep || u.propDep, (function(e, t) {
                                        var n = e.ELEMENTS;
                                        return e.OFFSET ? t.def(n, "?", n, ".vertCount-", e.OFFSET, ":-1") : t.def(n, "?", n, ".vertCount:-1")
                                    }));
                                    return D.optional((function() {
                                        f.DYNAMIC = !0
                                    })), f
                                }
                                return null
                            }(),
                            instances: i(Ur, !1),
                            offset: u
                        }
                    }(e, c),
                    y = function(e, t) {
                        var n = e.static,
                            r = e.dynamic,
                            i = {};
                        return _.forEach((function(e) {
                            var o = M(e);

                            function u(t, a) {
                                if (e in n) {
                                    var u = t(n[e]);
                                    i[o] = Va((function() {
                                        return u
                                    }))
                                } else if (e in r) {
                                    var f = r[e];
                                    i[o] = Za(f, (function(e, t) {
                                        return a(e, t, e.invoke(t, f))
                                    }))
                                }
                            }
                            switch (e) {
                                case hr:
                                case or:
                                case ir:
                                case Ar:
                                case sr:
                                case Er:
                                case yr:
                                case wr:
                                case _r:
                                case pr:
                                    return u((function(n) {
                                        return D.commandType(n, "boolean", e, t.commandStr), n
                                    }), (function(t, n, r) {
                                        return D.optional((function() {
                                            t.assert(n, "typeof " + r + '==="boolean"', "invalid flag " + e, t.commandStr)
                                        })), r
                                    }));
                                case lr:
                                    return u((function(n) {
                                        return D.commandParameter(n, Na, "invalid " + e, t.commandStr), Na[n]
                                    }), (function(t, n, r) {
                                        var a = t.constants.compareFuncs;
                                        return D.optional((function() {
                                            t.assert(n, r + " in " + a, "invalid " + e + ", must be one of " + Object.keys(Na))
                                        })), n.def(a, "[", r, "]")
                                    }));
                                case dr:
                                    return u((function(e) {
                                        return D.command(Re(e) && 2 === e.length && "number" == typeof e[0] && "number" == typeof e[1] && e[0] <= e[1], "depth range is 2d array", t.commandStr), e
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, e.shared.isArrayLike + "(" + n + ")&&" + n + ".length===2&&typeof " + n + '[0]==="number"&&typeof ' + n + '[1]==="number"&&' + n + "[0]<=" + n + "[1]", "depth range must be a 2d array")
                                        })), [t.def("+", n, "[0]"), t.def("+", n, "[1]")]
                                    }));
                                case cr:
                                    return u((function(e) {
                                        D.commandType(e, "object", "blend.func", t.commandStr);
                                        var n = "srcRGB" in e ? e.srcRGB : e.src,
                                            r = "srcAlpha" in e ? e.srcAlpha : e.src,
                                            a = "dstRGB" in e ? e.dstRGB : e.dst,
                                            i = "dstAlpha" in e ? e.dstAlpha : e.dst;
                                        return D.commandParameter(n, La, o + ".srcRGB", t.commandStr), D.commandParameter(r, La, o + ".srcAlpha", t.commandStr), D.commandParameter(a, La, o + ".dstRGB", t.commandStr), D.commandParameter(i, La, o + ".dstAlpha", t.commandStr), D.command(-1 === Ua.indexOf(n + ", " + a), "unallowed blending combination (srcRGB, dstRGB) = (" + n + ", " + a + ")", t.commandStr), [La[n], La[a], La[r], La[i]]
                                    }), (function(t, n, r) {
                                        var a = t.constants.blendFuncs;

                                        function i(i, o) {
                                            var u = n.def('"', i, o, '" in ', r, "?", r, ".", i, o, ":", r, ".", i);
                                            return D.optional((function() {
                                                t.assert(n, u + " in " + a, "invalid " + e + "." + i + o + ", must be one of " + Object.keys(La))
                                            })), u
                                        }
                                        D.optional((function() {
                                            t.assert(n, r + "&&typeof " + r + '==="object"', "invalid blend func, must be an object")
                                        }));
                                        var o = i("src", "RGB"),
                                            u = i("dst", "RGB");
                                        D.optional((function() {
                                            var e = t.constants.invalidBlendCombinations;
                                            t.assert(n, e + ".indexOf(" + o + '+", "+' + u + ") === -1 ", "unallowed blending combination for (srcRGB, dstRGB)")
                                        }));
                                        var f = n.def(a, "[", o, "]"),
                                            c = n.def(a, "[", i("src", "Alpha"), "]");
                                        return [f, n.def(a, "[", u, "]"), c, n.def(a, "[", i("dst", "Alpha"), "]")]
                                    }));
                                case fr:
                                    return u((function(n) {
                                        return "string" == typeof n ? (D.commandParameter(n, b, "invalid " + e, t.commandStr), [b[n], b[n]]) : "object" == typeof n ? (D.commandParameter(n.rgb, b, e + ".rgb", t.commandStr), D.commandParameter(n.alpha, b, e + ".alpha", t.commandStr), [b[n.rgb], b[n.alpha]]) : void D.commandRaise("invalid blend.equation", t.commandStr)
                                    }), (function(t, n, r) {
                                        var a = t.constants.blendEquations,
                                            i = n.def(),
                                            o = n.def(),
                                            u = t.cond("typeof ", r, '==="string"');
                                        return D.optional((function() {
                                            function n(e, n, r) {
                                                t.assert(e, r + " in " + a, "invalid " + n + ", must be one of " + Object.keys(b))
                                            }
                                            n(u.then, e, r), t.assert(u.else, r + "&&typeof " + r + '==="object"', "invalid " + e), n(u.else, e + ".rgb", r + ".rgb"), n(u.else, e + ".alpha", r + ".alpha")
                                        })), u.then(i, "=", o, "=", a, "[", r, "];"), u.else(i, "=", a, "[", r, ".rgb];", o, "=", a, "[", r, ".alpha];"), n(u), [i, o]
                                    }));
                                case ur:
                                    return u((function(e) {
                                        return D.command(Re(e) && 4 === e.length, "blend.color must be a 4d array", t.commandStr), G(4, (function(t) {
                                            return +e[t]
                                        }))
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, e.shared.isArrayLike + "(" + n + ")&&" + n + ".length===4", "blend.color must be a 4d array")
                                        })), G(4, (function(e) {
                                            return t.def("+", n, "[", e, "]")
                                        }))
                                    }));
                                case Mr:
                                    return u((function(e) {
                                        return D.commandType(e, "number", o, t.commandStr), 0 | e
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, "typeof " + n + '==="number"', "invalid stencil.mask")
                                        })), t.def(n, "|0")
                                    }));
                                case Sr:
                                    return u((function(n) {
                                        D.commandType(n, "object", o, t.commandStr);
                                        var r = n.cmp || "keep",
                                            a = n.ref || 0,
                                            i = "mask" in n ? n.mask : -1;
                                        return D.commandParameter(r, Na, e + ".cmp", t.commandStr), D.commandType(a, "number", e + ".ref", t.commandStr), D.commandType(i, "number", e + ".mask", t.commandStr), [Na[r], a, i]
                                    }), (function(e, t, n) {
                                        var r = e.constants.compareFuncs;
                                        return D.optional((function() {
                                            function a() {
                                                e.assert(t, Array.prototype.join.call(arguments, ""), "invalid stencil.func")
                                            }
                                            a(n + "&&typeof ", n, '==="object"'), a('!("cmp" in ', n, ")||(", n, ".cmp in ", r, ")")
                                        })), [t.def('"cmp" in ', n, "?", r, "[", n, ".cmp]", ":", Da), t.def(n, ".ref|0"), t.def('"mask" in ', n, "?", n, ".mask|0:-1")]
                                    }));
                                case Tr:
                                case jr:
                                    return u((function(n) {
                                        D.commandType(n, "object", o, t.commandStr);
                                        var r = n.fail || "keep",
                                            a = n.zfail || "keep",
                                            i = n.zpass || "keep";
                                        return D.commandParameter(r, Wa, e + ".fail", t.commandStr), D.commandParameter(a, Wa, e + ".zfail", t.commandStr), D.commandParameter(i, Wa, e + ".zpass", t.commandStr), [e === jr ? Sa : Ma, Wa[r], Wa[a], Wa[i]]
                                    }), (function(t, n, r) {
                                        var a = t.constants.stencilOps;

                                        function i(i) {
                                            return D.optional((function() {
                                                t.assert(n, '!("' + i + '" in ' + r + ")||(" + r + "." + i + " in " + a + ")", "invalid " + e + "." + i + ", must be one of " + Object.keys(Wa))
                                            })), n.def('"', i, '" in ', r, "?", a, "[", r, ".", i, "]:", Da)
                                        }
                                        return D.optional((function() {
                                            t.assert(n, r + "&&typeof " + r + '==="object"', "invalid " + e)
                                        })), [e === jr ? Sa : Ma, i("fail"), i("zfail"), i("zpass")]
                                    }));
                                case xr:
                                    return u((function(e) {
                                        D.commandType(e, "object", o, t.commandStr);
                                        var n = 0 | e.factor,
                                            r = 0 | e.units;
                                        return D.commandType(n, "number", o + ".factor", t.commandStr), D.commandType(r, "number", o + ".units", t.commandStr), [n, r]
                                    }), (function(t, n, r) {
                                        return D.optional((function() {
                                            t.assert(n, r + "&&typeof " + r + '==="object"', "invalid " + e)
                                        })), [n.def(r, ".factor|0"), n.def(r, ".units|0")]
                                    }));
                                case vr:
                                    return u((function(e) {
                                        var n = 0;
                                        return "front" === e ? n = Ma : "back" === e && (n = Sa), D.command(!!n, o, t.commandStr), n
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, n + '==="front"||' + n + '==="back"', "invalid cull.face")
                                        })), t.def(n, '==="front"?', Ma, ":", Sa)
                                    }));
                                case gr:
                                    return u((function(e) {
                                        return D.command("number" == typeof e && e >= a.lineWidthDims[0] && e <= a.lineWidthDims[1], "invalid line width, must be a positive number between " + a.lineWidthDims[0] + " and " + a.lineWidthDims[1], t.commandStr), e
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, "typeof " + n + '==="number"&&' + n + ">=" + a.lineWidthDims[0] + "&&" + n + "<=" + a.lineWidthDims[1], "invalid line width")
                                        })), n
                                    }));
                                case br:
                                    return u((function(e) {
                                        return D.commandParameter(e, Ga, o, t.commandStr), Ga[e]
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, n + '==="cw"||' + n + '==="ccw"', "invalid frontFace, must be one of cw,ccw")
                                        })), t.def(n + '==="cw"?' + Ta + ":" + ja)
                                    }));
                                case mr:
                                    return u((function(e) {
                                        return D.command(Re(e) && 4 === e.length, "color.mask must be length 4 array", t.commandStr), e.map((function(e) {
                                            return !!e
                                        }))
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, e.shared.isArrayLike + "(" + n + ")&&" + n + ".length===4", "invalid color.mask")
                                        })), G(4, (function(e) {
                                            return "!!" + n + "[" + e + "]"
                                        }))
                                    }));
                                case kr:
                                    return u((function(e) {
                                        D.command("object" == typeof e && e, o, t.commandStr);
                                        var n = "value" in e ? e.value : 1,
                                            r = !!e.invert;
                                        return D.command("number" == typeof n && n >= 0 && n <= 1, "sample.coverage.value must be a number between 0 and 1", t.commandStr), [n, r]
                                    }), (function(e, t, n) {
                                        return D.optional((function() {
                                            e.assert(t, n + "&&typeof " + n + '==="object"', "invalid sample.coverage")
                                        })), [t.def('"value" in ', n, "?+", n, ".value:1"), t.def("!!", n, ".invert")]
                                    }))
                            }
                        })), i
                    }(e, c),
                    x = function(e) {
                        var t = e.static,
                            r = e.dynamic;

                        function a(e) {
                            if (e in t) {
                                var a = n.id(t[e]);
                                D.optional((function() {
                                    l.shader(qa[e], a, D.guessCommand())
                                }));
                                var i = Va((function() {
                                    return a
                                }));
                                return i.id = a, i
                            }
                            if (e in r) {
                                var o = r[e];
                                return Za(o, (function(t, n) {
                                    var r = t.invoke(n, o),
                                        a = n.def(t.shared.strings, ".id(", r, ")");
                                    return D.optional((function() {
                                        n(t.shared.shader, ".shader(", qa[e], ",", a, ",", t.command, ");")
                                    })), a
                                }))
                            }
                            return null
                        }
                        var i, o = a(Pr),
                            u = a(Ir),
                            f = null;
                        return Qa(o) && Qa(u) ? (f = l.program(u.id, o.id), i = Va((function(e, t) {
                            return e.link(f)
                        }))) : i = new Xa(o && o.thisDep || u && u.thisDep, o && o.contextDep || u && u.contextDep, o && o.propDep || u && u.propDep, (function(e, t) {
                            var n, r = e.shared.shader;
                            n = o ? o.append(e, t) : t.def(r, ".", Pr);
                            var a = r + ".program(" + (u ? u.append(e, t) : t.def(r, ".", Ir)) + "," + n;
                            return D.optional((function() {
                                a += "," + e.command
                            })), t.def(a + ")")
                        })), {
                            frag: o,
                            vert: u,
                            progVar: i,
                            program: f
                        }
                    }(e);

                function w(e) {
                    var t = m[e];
                    t && (y[e] = t)
                }
                w(Or), w(M(Cr));
                var k = Object.keys(y).length > 0,
                    A = {
                        framebuffer: p,
                        draw: h,
                        shader: x,
                        state: y,
                        dirty: k
                    };
                return A.profile = function(e) {
                    var t, n = e.static,
                        r = e.dynamic;
                    if (Dr in n) {
                        var a = !!n[Dr];
                        (t = Va((function(e, t) {
                            return a
                        }))).enable = a
                    } else if (Dr in r) {
                        var i = r[Dr];
                        t = Za(i, (function(e, t) {
                            return e.invoke(t, i)
                        }))
                    }
                    return t
                }(e), A.uniforms = function(e, t) {
                    var n = e.static,
                        r = e.dynamic,
                        a = {};
                    return Object.keys(n).forEach((function(e) {
                        var r, i = n[e];
                        if ("number" == typeof i || "boolean" == typeof i) r = Va((function() {
                            return i
                        }));
                        else if ("function" == typeof i) {
                            var o = i._reglType;
                            "texture2d" === o || "textureCube" === o ? r = Va((function(e) {
                                return e.link(i)
                            })) : "framebuffer" === o || "framebufferCube" === o ? (D.command(i.color.length > 0, 'missing color attachment for framebuffer sent to uniform "' + e + '"', t.commandStr), r = Va((function(e) {
                                return e.link(i.color[0])
                            }))) : D.commandRaise('invalid data for uniform "' + e + '"', t.commandStr)
                        } else Re(i) ? r = Va((function(t) {
                            return t.global.def("[", G(i.length, (function(n) {
                                return D.command("number" == typeof i[n] || "boolean" == typeof i[n], "invalid uniform " + e, t.commandStr), i[n]
                            })), "]")
                        })) : D.commandRaise('invalid or missing data for uniform "' + e + '"', t.commandStr);
                        r.value = i, a[e] = r
                    })), Object.keys(r).forEach((function(e) {
                        var t = r[e];
                        a[e] = Za(t, (function(e, n) {
                            return e.invoke(n, t)
                        }))
                    })), a
                }(r, c), A.attributes = function(e, t) {
                    var r = e.static,
                        a = e.dynamic,
                        o = {};
                    return Object.keys(r).forEach((function(e) {
                        var a = r[e],
                            u = n.id(e),
                            f = new v;
                        if (Ya(a)) f.state = Kn, f.buffer = i.getBuffer(i.create(a, Qr, !1, !0)), f.type = 0;
                        else {
                            var c = i.getBuffer(a);
                            if (c) f.state = Kn, f.buffer = c, f.type = 0;
                            else if (D.command("object" == typeof a && a, "invalid data for attribute " + e, t.commandStr), "constant" in a) {
                                var s = a.constant;
                                f.buffer = "null", f.state = Jn, "number" == typeof s ? f.x = s : (D.command(Re(s) && s.length > 0 && s.length <= 4, "invalid constant for attribute " + e, t.commandStr), Zn.forEach((function(e, t) {
                                    t < s.length && (f[e] = s[t])
                                })))
                            } else {
                                c = Ya(a.buffer) ? i.getBuffer(i.create(a.buffer, Qr, !1, !0)) : i.getBuffer(a.buffer), D.command(!!c, 'missing buffer for attribute "' + e + '"', t.commandStr);
                                var l = 0 | a.offset;
                                D.command(l >= 0, 'invalid offset for attribute "' + e + '"', t.commandStr);
                                var d = 0 | a.stride;
                                D.command(d >= 0 && d < 256, 'invalid stride for attribute "' + e + '", must be integer betweeen [0, 255]', t.commandStr);
                                var p = 0 | a.size;
                                D.command(!("size" in a) || p > 0 && p <= 4, 'invalid size for attribute "' + e + '", must be 1,2,3,4', t.commandStr);
                                var m = !!a.normalized,
                                    h = 0;
                                "type" in a && (D.commandParameter(a.type, ue, "invalid type for attribute " + e, t.commandStr), h = ue[a.type]);
                                var b = 0 | a.divisor;
                                "divisor" in a && (D.command(0 === b || g, 'cannot specify divisor for attribute "' + e + '", instancing not supported', t.commandStr), D.command(b >= 0, 'invalid divisor for attribute "' + e + '"', t.commandStr)), D.optional((function() {
                                    var n = t.commandStr,
                                        r = ["buffer", "offset", "divisor", "normalized", "type", "size", "stride"];
                                    Object.keys(a).forEach((function(t) {
                                        D.command(r.indexOf(t) >= 0, 'unknown parameter "' + t + '" for attribute pointer "' + e + '" (valid parameters are ' + r + ")", n)
                                    }))
                                })), f.buffer = c, f.state = Kn, f.size = p, f.normalized = m, f.type = h || c.dtype, f.offset = l, f.stride = d, f.divisor = b
                            }
                        }
                        o[e] = Va((function(e, t) {
                            var n = e.attribCache;
                            if (u in n) return n[u];
                            var r = {
                                isStream: !1
                            };
                            return Object.keys(f).forEach((function(e) {
                                r[e] = f[e]
                            })), f.buffer && (r.buffer = e.link(f.buffer), r.type = r.type || r.buffer + ".dtype"), n[u] = r, r
                        }))
                    })), Object.keys(a).forEach((function(e) {
                        var t = a[e];
                        o[e] = Za(t, (function(n, r) {
                            var a = n.invoke(r, t),
                                i = n.shared,
                                o = n.constants,
                                u = i.isBufferArgs,
                                f = i.buffer;
                            D.optional((function() {
                                n.assert(r, a + "&&(typeof " + a + '==="object"||typeof ' + a + '==="function")&&(' + u + "(" + a + ")||" + f + ".getBuffer(" + a + ")||" + f + ".getBuffer(" + a + ".buffer)||" + u + "(" + a + '.buffer)||("constant" in ' + a + "&&(typeof " + a + '.constant==="number"||' + i.isArrayLike + "(" + a + ".constant))))", 'invalid dynamic attribute "' + e + '"')
                            }));
                            var c = {
                                    isStream: r.def(!1)
                                },
                                s = new v;
                            s.state = Kn, Object.keys(s).forEach((function(e) {
                                c[e] = r.def("" + s[e])
                            }));
                            var l = c.buffer,
                                d = c.type;

                            function p(e) {
                                r(c[e], "=", a, ".", e, "|0;")
                            }
                            return r("if(", u, "(", a, ")){", c.isStream, "=true;", l, "=", f, ".createStream(", Qr, ",", a, ");", d, "=", l, ".dtype;", "}else{", l, "=", f, ".getBuffer(", a, ");", "if(", l, "){", d, "=", l, ".dtype;", '}else if("constant" in ', a, "){", c.state, "=", Jn, ";", "if(typeof " + a + '.constant === "number"){', c[Zn[0]], "=", a, ".constant;", Zn.slice(1).map((function(e) {
                                return c[e]
                            })).join("="), "=0;", "}else{", Zn.map((function(e, t) {
                                return c[e] + "=" + a + ".constant.length>" + t + "?" + a + ".constant[" + t + "]:0;"
                            })).join(""), "}}else{", "if(", u, "(", a, ".buffer)){", l, "=", f, ".createStream(", Qr, ",", a, ".buffer);", "}else{", l, "=", f, ".getBuffer(", a, ".buffer);", "}", d, '="type" in ', a, "?", o.glTypes, "[", a, ".type]:", l, ".dtype;", c.normalized, "=!!", a, ".normalized;"), p("size"), p("offset"), p("stride"), p("divisor"), r("}}"), r.exit("if(", c.isStream, "){", f, ".destroyStream(", l, ");", "}"), c
                        }))
                    })), o
                }(t, c), A.context = function(e) {
                    var t = e.static,
                        n = e.dynamic,
                        r = {};
                    return Object.keys(t).forEach((function(e) {
                        var n = t[e];
                        r[e] = Va((function(e, t) {
                            return "number" == typeof n || "boolean" == typeof n ? "" + n : e.link(n)
                        }))
                    })), Object.keys(n).forEach((function(e) {
                        var t = n[e];
                        r[e] = Za(t, (function(e, n) {
                            return e.invoke(n, t)
                        }))
                    })), r
                }(u), A
            }

            function I(e, t, n) {
                var r = e.shared.context,
                    a = e.scope();
                Object.keys(n).forEach((function(i) {
                    t.save(r, "." + i);
                    var o = n[i];
                    a(r, ".", i, "=", o.append(e, t), ";")
                })), t(a)
            }

            function P(e, t, n, r) {
                var a, i = e.shared,
                    o = i.gl,
                    u = i.framebuffer;
                y && (a = t.def(i.extensions, ".webgl_draw_buffers"));
                var f, c = e.constants,
                    s = c.drawBuffer,
                    l = c.backBuffer;
                f = n ? n.append(e, t) : t.def(u, ".next"), r || t("if(", f, "!==", u, ".cur){"), t("if(", f, "){", o, ".bindFramebuffer(", za, ",", f, ".framebuffer);"), y && t(a, ".drawBuffersWEBGL(", s, "[", f, ".colorAttachments.length]);"), t("}else{", o, ".bindFramebuffer(", za, ",null);"), y && t(a, ".drawBuffersWEBGL(", l, ");"), t("}", u, ".cur=", f, ";"), r || t("}")
            }

            function R(e, t, n) {
                var r = e.shared,
                    a = r.gl,
                    i = e.current,
                    o = e.next,
                    u = r.current,
                    f = r.next,
                    c = e.cond(u, ".dirty");
                _.forEach((function(t) {
                    var r, s, l = M(t);
                    if (!(l in n.state))
                        if (l in o) {
                            r = o[l], s = i[l];
                            var d = G(x[l].length, (function(e) {
                                return c.def(r, "[", e, "]")
                            }));
                            c(e.cond(d.map((function(e, t) {
                                return e + "!==" + s + "[" + t + "]"
                            })).join("||")).then(a, ".", A[l], "(", d, ");", d.map((function(e, t) {
                                return s + "[" + t + "]=" + e
                            })).join(";"), ";"))
                        } else {
                            r = c.def(f, ".", l);
                            var p = e.cond(r, "!==", u, ".", l);
                            c(p), l in k ? p(e.cond(r).then(a, ".enable(", k[l], ");").else(a, ".disable(", k[l], ");"), u, ".", l, "=", r, ";") : p(a, ".", A[l], "(", r, ");", u, ".", l, "=", r, ";")
                        }
                })), 0 === Object.keys(n.state).length && c(u, ".dirty=false;"), t(c)
            }

            function z(e, t, n, r) {
                var a = e.shared,
                    i = e.current,
                    o = a.current,
                    u = a.gl;
                Ha(Object.keys(n)).forEach((function(a) {
                    var f = n[a];
                    if (!r || r(f)) {
                        var c = f.append(e, t);
                        if (k[a]) {
                            var s = k[a];
                            Qa(f) ? t(u, c ? ".enable(" : ".disable(", s, ");") : t(e.cond(c).then(u, ".enable(", s, ");").else(u, ".disable(", s, ");")), t(o, ".", a, "=", c, ";")
                        } else if (Re(c)) {
                            var l = i[a];
                            t(u, ".", A[a], "(", c, ");", c.map((function(e, t) {
                                return l + "[" + t + "]=" + e
                            })).join(";"), ";")
                        } else t(u, ".", A[a], "(", c, ");", o, ".", a, "=", c, ";")
                    }
                }))
            }

            function L(e, t) {
                g && (e.instancing = t.def(e.shared.extensions, ".angle_instanced_arrays"))
            }

            function U(e, t, n, r, a) {
                var i, o, u, f = e.shared,
                    c = e.stats,
                    s = f.current,
                    l = f.timer,
                    d = n.profile;

                function p() {
                    return "undefined" == typeof performance ? "Date.now()" : "performance.now()"
                }

                function h(e) {
                    e(i = t.def(), "=", p(), ";"), "string" == typeof a ? e(c, ".count+=", a, ";") : e(c, ".count++;"), m && (r ? e(o = t.def(), "=", l, ".getNumPendingQueries();") : e(l, ".beginQuery(", c, ");"))
                }

                function v(e) {
                    e(c, ".cpuTime+=", p(), "-", i, ";"), m && (r ? e(l, ".pushScopeStats(", o, ",", l, ".getNumPendingQueries(),", c, ");") : e(l, ".endQuery();"))
                }

                function b(e) {
                    var n = t.def(s, ".profile");
                    t(s, ".profile=", e, ";"), t.exit(s, ".profile=", n, ";")
                }
                if (d) {
                    if (Qa(d)) return void(d.enable ? (h(t), v(t.exit), b("true")) : b("false"));
                    b(u = d.append(e, t))
                } else u = t.def(s, ".profile");
                var g = e.block();
                h(g), t("if(", u, "){", g, "}");
                var y = e.block();
                v(y), t.exit("if(", u, "){", y, "}")
            }

            function N(e, t, n, r, a) {
                var i = e.shared;
                r.forEach((function(r) {
                    var o, u = r.name,
                        f = n.attributes[u];
                    if (f) {
                        if (!a(f)) return;
                        o = f.append(e, t)
                    } else {
                        if (!a($a)) return;
                        var c = e.scopeAttrib(u);
                        D.optional((function() {
                            e.assert(t, c + ".state", "missing attribute " + u)
                        })), o = {}, Object.keys(new v).forEach((function(e) {
                            o[e] = t.def(c, ".", e)
                        }))
                    }! function(n, r, a) {
                        var o = i.gl,
                            u = t.def(n, ".location"),
                            f = t.def(i.attributes, "[", u, "]"),
                            c = a.state,
                            s = a.buffer,
                            l = [a.x, a.y, a.z, a.w],
                            d = ["buffer", "normalized", "offset", "stride"];

                        function p() {
                            t("if(!", f, ".buffer){", o, ".enableVertexAttribArray(", u, ");}");
                            var n, i = a.type;
                            if (n = a.size ? t.def(a.size, "||", r) : r, t("if(", f, ".type!==", i, "||", f, ".size!==", n, "||", d.map((function(e) {
                                    return f + "." + e + "!==" + a[e]
                                })).join("||"), "){", o, ".bindBuffer(", Qr, ",", s, ".buffer);", o, ".vertexAttribPointer(", [u, n, i, a.normalized, a.stride, a.offset], ");", f, ".type=", i, ";", f, ".size=", n, ";", d.map((function(e) {
                                    return f + "." + e + "=" + a[e] + ";"
                                })).join(""), "}"), g) {
                                var c = a.divisor;
                                t("if(", f, ".divisor!==", c, "){", e.instancing, ".vertexAttribDivisorANGLE(", [u, c], ");", f, ".divisor=", c, ";}")
                            }
                        }

                        function m() {
                            t("if(", f, ".buffer){", o, ".disableVertexAttribArray(", u, ");", f, ".buffer=null;", "}if(", Zn.map((function(e, t) {
                                return f + "." + e + "!==" + l[t]
                            })).join("||"), "){", o, ".vertexAttrib4f(", u, ",", l, ");", Zn.map((function(e, t) {
                                return f + "." + e + "=" + l[t] + ";"
                            })).join(""), "}")
                        }
                        c === Kn ? p() : c === Jn ? m() : (t("if(", c, "===", Kn, "){"), p(), t("}else{"), m(), t("}"))
                    }(e.link(r), function(e) {
                        switch (e) {
                            case fa:
                            case da:
                            case va:
                                return 2;
                            case ca:
                            case pa:
                            case ba:
                                return 3;
                            case sa:
                            case ma:
                            case ga:
                                return 4;
                            default:
                                return 1
                        }
                    }(r.info.type), o)
                }))
            }

            function W(e, t, r, a, i) {
                for (var o, u = e.shared, f = u.gl, c = 0; c < a.length; ++c) {
                    var s, l = a[c],
                        d = l.name,
                        p = l.info.type,
                        m = r.uniforms[d],
                        h = e.link(l) + ".location";
                    if (m) {
                        if (!i(m)) continue;
                        if (Qa(m)) {
                            var v = m.value;
                            if (D.command(null != v, 'missing uniform "' + d + '"', e.commandStr), p === _a || p === ka) {
                                D.command("function" == typeof v && (p === _a && ("texture2d" === v._reglType || "framebuffer" === v._reglType) || p === ka && ("textureCube" === v._reglType || "framebufferCube" === v._reglType)), "invalid texture for uniform " + d, e.commandStr);
                                var b = e.link(v._texture || v.color[0]._texture);
                                t(f, ".uniform1i(", h, ",", b + ".bind());"), t.exit(b, ".unbind();")
                            } else if (p === ya || p === xa || p === wa) {
                                D.optional((function() {
                                    D.command(Re(v), "invalid matrix for uniform " + d, e.commandStr), D.command(p === ya && 4 === v.length || p === xa && 9 === v.length || p === wa && 16 === v.length, "invalid length for matrix uniform " + d, e.commandStr)
                                }));
                                var g = e.global.def("new Float32Array([" + Array.prototype.slice.call(v) + "])"),
                                    y = 2;
                                p === xa ? y = 3 : p === wa && (y = 4), t(f, ".uniformMatrix", y, "fv(", h, ",false,", g, ");")
                            } else {
                                switch (p) {
                                    case ua:
                                        D.commandType(v, "number", "uniform " + d, e.commandStr), o = "1f";
                                        break;
                                    case fa:
                                        D.command(Re(v) && 2 === v.length, "uniform " + d, e.commandStr), o = "2f";
                                        break;
                                    case ca:
                                        D.command(Re(v) && 3 === v.length, "uniform " + d, e.commandStr), o = "3f";
                                        break;
                                    case sa:
                                        D.command(Re(v) && 4 === v.length, "uniform " + d, e.commandStr), o = "4f";
                                        break;
                                    case ha:
                                        D.commandType(v, "boolean", "uniform " + d, e.commandStr), o = "1i";
                                        break;
                                    case la:
                                        D.commandType(v, "number", "uniform " + d, e.commandStr), o = "1i";
                                        break;
                                    case va:
                                    case da:
                                        D.command(Re(v) && 2 === v.length, "uniform " + d, e.commandStr), o = "2i";
                                        break;
                                    case ba:
                                    case pa:
                                        D.command(Re(v) && 3 === v.length, "uniform " + d, e.commandStr), o = "3i";
                                        break;
                                    case ga:
                                    case ma:
                                        D.command(Re(v) && 4 === v.length, "uniform " + d, e.commandStr), o = "4i"
                                }
                                t(f, ".uniform", o, "(", h, ",", Re(v) ? Array.prototype.slice.call(v) : v, ");")
                            }
                            continue
                        }
                        s = m.append(e, t)
                    } else {
                        if (!i($a)) continue;
                        s = t.def(u.uniforms, "[", n.id(d), "]")
                    }
                    p === _a ? t("if(", s, "&&", s, '._reglType==="framebuffer"){', s, "=", s, ".color[0];", "}") : p === ka && t("if(", s, "&&", s, '._reglType==="framebufferCube"){', s, "=", s, ".color[0];", "}"), D.optional((function() {
                        function n(n, r) {
                            e.assert(t, n, 'bad data or missing for uniform "' + d + '".  ' + r)
                        }

                        function r(e) {
                            n("typeof " + s + '==="' + e + '"', "invalid type, expected " + e)
                        }

                        function a(t, r) {
                            n(u.isArrayLike + "(" + s + ")&&" + s + ".length===" + t, "invalid vector, should have length " + t, e.commandStr)
                        }

                        function i(t) {
                            n("typeof " + s + '==="function"&&' + s + '._reglType==="texture' + (t === Zr ? "2d" : "Cube") + '"', "invalid texture type", e.commandStr)
                        }
                        switch (p) {
                            case la:
                                r("number");
                                break;
                            case da:
                                a(2);
                                break;
                            case pa:
                                a(3);
                                break;
                            case ma:
                                a(4);
                                break;
                            case ua:
                                r("number");
                                break;
                            case fa:
                                a(2);
                                break;
                            case ca:
                                a(3);
                                break;
                            case sa:
                                a(4);
                                break;
                            case ha:
                                r("boolean");
                                break;
                            case va:
                                a(2);
                                break;
                            case ba:
                                a(3);
                                break;
                            case ga:
                            case ya:
                                a(4);
                                break;
                            case xa:
                                a(9);
                                break;
                            case wa:
                                a(16);
                                break;
                            case _a:
                                i(Zr);
                                break;
                            case ka:
                                i($r)
                        }
                    }));
                    var x = 1;
                    switch (p) {
                        case _a:
                        case ka:
                            var w = t.def(s, "._texture");
                            t(f, ".uniform1i(", h, ",", w, ".bind());"), t.exit(w, ".unbind();");
                            continue;
                        case la:
                        case ha:
                            o = "1i";
                            break;
                        case da:
                        case va:
                            o = "2i", x = 2;
                            break;
                        case pa:
                        case ba:
                            o = "3i", x = 3;
                            break;
                        case ma:
                        case ga:
                            o = "4i", x = 4;
                            break;
                        case ua:
                            o = "1f";
                            break;
                        case fa:
                            o = "2f", x = 2;
                            break;
                        case ca:
                            o = "3f", x = 3;
                            break;
                        case sa:
                            o = "4f", x = 4;
                            break;
                        case ya:
                            o = "Matrix2fv";
                            break;
                        case xa:
                            o = "Matrix3fv";
                            break;
                        case wa:
                            o = "Matrix4fv"
                    }
                    if (t(f, ".uniform", o, "(", h, ","), "M" === o.charAt(0)) {
                        var _ = Math.pow(p - ya + 2, 2),
                            k = e.global.def("new Float32Array(", _, ")");
                        t("false,(Array.isArray(", s, ")||", s, " instanceof Float32Array)?", s, ":(", G(_, (function(e) {
                            return k + "[" + e + "]=" + s + "[" + e + "]"
                        })), ",", k, ")")
                    } else t(x > 1 ? G(x, (function(e) {
                        return s + "[" + e + "]"
                    })) : s);
                    t(");")
                }
            }

            function q(e, t, n, r) {
                var a = e.shared,
                    i = a.gl,
                    o = a.draw,
                    u = r.draw,
                    f = function() {
                        var a, f = u.elements,
                            c = t;
                        return f ? ((f.contextDep && r.contextDynamic || f.propDep) && (c = n), a = f.append(e, c)) : a = c.def(o, ".", Rr), a && c("if(" + a + ")" + i + ".bindBuffer(" + Vr + "," + a + ".buffer.buffer);"), a
                    }();

                function c(a) {
                    var i = u[a];
                    return i ? i.contextDep && r.contextDynamic || i.propDep ? i.append(e, n) : i.append(e, t) : t.def(o, ".", a)
                }
                var s, l, d = c(zr),
                    p = c(Lr),
                    m = function() {
                        var a, i = u.count,
                            f = t;
                        return i ? ((i.contextDep && r.contextDynamic || i.propDep) && (f = n), a = i.append(e, f), D.optional((function() {
                            i.MISSING && e.assert(t, "false", "missing vertex count"), i.DYNAMIC && e.assert(f, a + ">=0", "missing vertex count")
                        }))) : (a = f.def(o, ".", Br), D.optional((function() {
                            e.assert(f, a + ">=0", "missing vertex count")
                        }))), a
                    }();
                if ("number" == typeof m) {
                    if (0 === m) return
                } else n("if(", m, "){"), n.exit("}");
                g && (s = c(Ur), l = e.instancing);
                var h = f + ".type",
                    v = u.elements && Qa(u.elements);

                function b() {
                    function e() {
                        n(l, ".drawElementsInstancedANGLE(", [d, m, h, p + "<<((" + h + "-" + $n + ")>>1)", s], ");")
                    }

                    function t() {
                        n(l, ".drawArraysInstancedANGLE(", [d, p, m, s], ");")
                    }
                    f ? v ? e() : (n("if(", f, "){"), e(), n("}else{"), t(), n("}")) : t()
                }

                function y() {
                    function e() {
                        n(i + ".drawElements(" + [d, m, h, p + "<<((" + h + "-" + $n + ")>>1)"] + ");")
                    }

                    function t() {
                        n(i + ".drawArrays(" + [d, p, m] + ");")
                    }
                    f ? v ? e() : (n("if(", f, "){"), e(), n("}else{"), t(), n("}")) : t()
                }
                g && ("number" != typeof s || s >= 0) ? "string" == typeof s ? (n("if(", s, ">0){"), b(), n("}else if(", s, "<0){"), y(), n("}")) : b() : y()
            }

            function Y(e, t, n, r, a) {
                var i = O(),
                    o = i.proc("body", a);
                return D.optional((function() {
                    i.commandStr = t.commandStr, i.command = i.link(t.commandStr)
                })), g && (i.instancing = o.def(i.shared.extensions, ".angle_instanced_arrays")), e(i, o, n, r), i.compile().body
            }

            function H(e, t, n, r) {
                L(e, t), N(e, t, n, r.attributes, (function() {
                    return !0
                })), W(e, t, n, r.uniforms, (function() {
                    return !0
                })), q(e, t, t, n)
            }

            function X(e, t, n, r) {
                function a() {
                    return !0
                }
                e.batchId = "a1", L(e, t), N(e, t, n, r.attributes, a), W(e, t, n, r.uniforms, a), q(e, t, t, n)
            }

            function Q(e, t, n, r) {
                L(e, t);
                var a = n.contextDep,
                    i = t.def(),
                    o = t.def();
                e.shared.props = o, e.batchId = i;
                var u = e.scope(),
                    f = e.scope();

                function c(e) {
                    return e.contextDep && a || e.propDep
                }

                function s(e) {
                    return !c(e)
                }
                if (t(u.entry, "for(", i, "=0;", i, "<", "a1", ";++", i, "){", o, "=", "a0", "[", i, "];", f, "}", u.exit), n.needsContext && I(e, f, n.context), n.needsFramebuffer && P(e, f, n.framebuffer), z(e, f, n.state, c), n.profile && c(n.profile) && U(e, f, n, !1, !0), r) N(e, u, n, r.attributes, s), N(e, f, n, r.attributes, c), W(e, u, n, r.uniforms, s), W(e, f, n, r.uniforms, c), q(e, u, f, n);
                else {
                    var l = e.global.def("{}"),
                        d = n.shader.progVar.append(e, f),
                        p = f.def(d, ".id"),
                        m = f.def(l, "[", p, "]");
                    f(e.shared.gl, ".useProgram(", d, ".program);", "if(!", m, "){", m, "=", l, "[", p, "]=", e.link((function(t) {
                        return Y(X, e, n, t, 2)
                    })), "(", d, ");}", m, ".call(this,a0[", i, "],", i, ");")
                }
            }

            function V(e, t, n) {
                var r = t.static[n];
                if (r && function(e) {
                        if ("object" == typeof e && !Re(e)) {
                            for (var t = Object.keys(e), n = 0; n < t.length; ++n)
                                if (B.isDynamic(e[t[n]])) return !0;
                            return !1
                        }
                    }(r)) {
                    var a = e.global,
                        i = Object.keys(r),
                        o = !1,
                        u = !1,
                        f = !1,
                        c = e.global.def("{}");
                    i.forEach((function(t) {
                        var n = r[t];
                        if (B.isDynamic(n)) {
                            "function" == typeof n && (n = r[t] = B.unbox(n));
                            var i = Za(n, null);
                            o = o || i.thisDep, f = f || i.propDep, u = u || i.contextDep
                        } else {
                            switch (a(c, ".", t, "="), typeof n) {
                                case "number":
                                    a(n);
                                    break;
                                case "string":
                                    a('"', n, '"');
                                    break;
                                case "object":
                                    Array.isArray(n) && a("[", n.join(), "]");
                                    break;
                                default:
                                    a(e.link(n))
                            }
                            a(";")
                        }
                    })), t.dynamic[n] = new B.DynamicVariable(ar, {
                        thisDep: o,
                        contextDep: u,
                        propDep: f,
                        ref: c,
                        append: function(e, t) {
                            i.forEach((function(n) {
                                var a = r[n];
                                if (B.isDynamic(a)) {
                                    var i = e.invoke(t, a);
                                    t(c, ".", n, "=", i, ";")
                                }
                            }))
                        }
                    }), delete t.static[n]
                }
            }
            return {
                next: w,
                current: x,
                procs: function() {
                    var e = O(),
                        t = e.proc("poll"),
                        n = e.proc("refresh"),
                        r = e.block();
                    t(r), n(r);
                    var i, o = e.shared,
                        u = o.gl,
                        f = o.next,
                        c = o.current;
                    r(c, ".dirty=false;"), P(e, t), P(e, n, null, !0), g && (i = e.link(g));
                    for (var s = 0; s < a.maxAttributes; ++s) {
                        var l = n.def(o.attributes, "[", s, "]"),
                            d = e.cond(l, ".buffer");
                        d.then(u, ".enableVertexAttribArray(", s, ");", u, ".bindBuffer(", Qr, ",", l, ".buffer.buffer);", u, ".vertexAttribPointer(", s, ",", l, ".size,", l, ".type,", l, ".normalized,", l, ".stride,", l, ".offset);").else(u, ".disableVertexAttribArray(", s, ");", u, ".vertexAttrib4f(", s, ",", l, ".x,", l, ".y,", l, ".z,", l, ".w);", l, ".buffer=null;"), n(d), g && n(i, ".vertexAttribDivisorANGLE(", s, ",", l, ".divisor);")
                    }
                    return Object.keys(k).forEach((function(a) {
                        var i = k[a],
                            o = r.def(f, ".", a),
                            s = e.block();
                        s("if(", o, "){", u, ".enable(", i, ")}else{", u, ".disable(", i, ")}", c, ".", a, "=", o, ";"), n(s), t("if(", o, "!==", c, ".", a, "){", s, "}")
                    })), Object.keys(A).forEach((function(a) {
                        var i, o, s = A[a],
                            l = x[a],
                            d = e.block();
                        if (d(u, ".", s, "("), Re(l)) {
                            var p = l.length;
                            i = e.global.def(f, ".", a), o = e.global.def(c, ".", a), d(G(p, (function(e) {
                                return i + "[" + e + "]"
                            })), ");", G(p, (function(e) {
                                return o + "[" + e + "]=" + i + "[" + e + "];"
                            })).join("")), t("if(", G(p, (function(e) {
                                return i + "[" + e + "]!==" + o + "[" + e + "]"
                            })).join("||"), "){", d, "}")
                        } else i = r.def(f, ".", a), o = r.def(c, ".", a), d(i, ");", c, ".", a, "=", i, ";"), t("if(", i, "!==", o, "){", d, "}");
                        n(d)
                    })), e.compile()
                }(),
                compile: function(e, t, r, a, i) {
                    var o = O();
                    o.stats = o.link(i), Object.keys(t.static).forEach((function(e) {
                        V(o, t, e)
                    })), Xr.forEach((function(t) {
                        V(o, e, t)
                    }));
                    var u = F(e, t, r, a, o);
                    return function(e, t) {
                            var n = e.proc("draw", 1);
                            L(e, n), I(e, n, t.context), P(e, n, t.framebuffer), R(e, n, t), z(e, n, t.state), U(e, n, t, !1, !0);
                            var r = t.shader.progVar.append(e, n);
                            if (n(e.shared.gl, ".useProgram(", r, ".program);"), t.shader.program) H(e, n, t, t.shader.program);
                            else {
                                var a = e.global.def("{}"),
                                    i = n.def(r, ".id"),
                                    o = n.def(a, "[", i, "]");
                                n(e.cond(o).then(o, ".call(this,a0);").else(o, "=", a, "[", i, "]=", e.link((function(n) {
                                    return Y(H, e, t, n, 1)
                                })), "(", r, ");", o, ".call(this,a0);"))
                            }
                            Object.keys(t.state).length > 0 && n(e.shared.current, ".dirty=true;")
                        }(o, u),
                        function(e, t) {
                            var r = e.proc("scope", 3);
                            e.batchId = "a2";
                            var a = e.shared,
                                i = a.current;

                            function o(n) {
                                var i = t.shader[n];
                                i && r.set(a.shader, "." + n, i.append(e, r))
                            }
                            I(e, r, t.context), t.framebuffer && t.framebuffer.append(e, r), Ha(Object.keys(t.state)).forEach((function(n) {
                                var i = t.state[n].append(e, r);
                                Re(i) ? i.forEach((function(t, a) {
                                    r.set(e.next[n], "[" + a + "]", t)
                                })) : r.set(a.next, "." + n, i)
                            })), U(e, r, t, !0, !0), [Rr, Lr, Br, Ur, zr].forEach((function(n) {
                                var i = t.draw[n];
                                i && r.set(a.draw, "." + n, "" + i.append(e, r))
                            })), Object.keys(t.uniforms).forEach((function(i) {
                                r.set(a.uniforms, "[" + n.id(i) + "]", t.uniforms[i].append(e, r))
                            })), Object.keys(t.attributes).forEach((function(n) {
                                var a = t.attributes[n].append(e, r),
                                    i = e.scopeAttrib(n);
                                Object.keys(new v).forEach((function(e) {
                                    r.set(i, "." + e, a[e])
                                }))
                            })), o(Ir), o(Pr), Object.keys(t.state).length > 0 && (r(i, ".dirty=true;"), r.exit(i, ".dirty=true;")), r("a1(", e.shared.context, ",a0,", e.batchId, ");")
                        }(o, u),
                        function(e, t) {
                            var n = e.proc("batch", 2);
                            e.batchId = "0", L(e, n);
                            var r = !1,
                                a = !0;
                            Object.keys(t.context).forEach((function(e) {
                                r = r || t.context[e].propDep
                            })), r || (I(e, n, t.context), a = !1);
                            var i = t.framebuffer,
                                o = !1;

                            function u(e) {
                                return e.contextDep && r || e.propDep
                            }
                            i ? (i.propDep ? r = o = !0 : i.contextDep && r && (o = !0), o || P(e, n, i)) : P(e, n, null), t.state.viewport && t.state.viewport.propDep && (r = !0), R(e, n, t), z(e, n, t.state, (function(e) {
                                return !u(e)
                            })), t.profile && u(t.profile) || U(e, n, t, !1, "a1"), t.contextDep = r, t.needsContext = a, t.needsFramebuffer = o;
                            var f = t.shader.progVar;
                            if (f.contextDep && r || f.propDep) Q(e, n, t, null);
                            else {
                                var c = f.append(e, n);
                                if (n(e.shared.gl, ".useProgram(", c, ".program);"), t.shader.program) Q(e, n, t, t.shader.program);
                                else {
                                    var s = e.global.def("{}"),
                                        l = n.def(c, ".id"),
                                        d = n.def(s, "[", l, "]");
                                    n(e.cond(d).then(d, ".call(this,a0,a1);").else(d, "=", s, "[", l, "]=", e.link((function(n) {
                                        return Y(Q, e, t, n, 2)
                                    })), "(", c, ");", d, ".call(this,a0,a1);"))
                                }
                            }
                            Object.keys(t.state).length > 0 && n(e.shared.current, ".dirty=true;")
                        }(o, u), o.compile()
                }
            }
        }
        var Ja = 34918,
            ei = 34919,
            ti = 35007,
            ni = function(e, t) {
                if (!t.ext_disjoint_timer_query) return null;
                var n = [];

                function r(e) {
                    n.push(e)
                }
                var a = [];

                function i() {
                    this.startQueryIndex = -1, this.endQueryIndex = -1, this.sum = 0, this.stats = null
                }
                var o = [];

                function u(e) {
                    o.push(e)
                }
                var f = [];

                function c(e, t, n) {
                    var r = o.pop() || new i;
                    r.startQueryIndex = e, r.endQueryIndex = t, r.sum = 0, r.stats = n, f.push(r)
                }
                var s = [],
                    l = [];
                return {
                    beginQuery: function(e) {
                        var r = n.pop() || t.ext_disjoint_timer_query.createQueryEXT();
                        t.ext_disjoint_timer_query.beginQueryEXT(ti, r), a.push(r), c(a.length - 1, a.length, e)
                    },
                    endQuery: function() {
                        t.ext_disjoint_timer_query.endQueryEXT(ti)
                    },
                    pushScopeStats: c,
                    update: function() {
                        var e, n, i = a.length;
                        if (0 !== i) {
                            l.length = Math.max(l.length, i + 1), s.length = Math.max(s.length, i + 1), s[0] = 0, l[0] = 0;
                            var o = 0;
                            for (e = 0, n = 0; n < a.length; ++n) {
                                var c = a[n];
                                t.ext_disjoint_timer_query.getQueryObjectEXT(c, ei) ? (o += t.ext_disjoint_timer_query.getQueryObjectEXT(c, Ja), r(c)) : a[e++] = c, s[n + 1] = o, l[n + 1] = e
                            }
                            for (a.length = e, e = 0, n = 0; n < f.length; ++n) {
                                var d = f[n],
                                    p = d.startQueryIndex,
                                    m = d.endQueryIndex;
                                d.sum += s[m] - s[p];
                                var h = l[p],
                                    v = l[m];
                                v === h ? (d.stats.gpuTime += d.sum / 1e6, u(d)) : (d.startQueryIndex = h, d.endQueryIndex = v, f[e++] = d)
                            }
                            f.length = e
                        }
                    },
                    getNumPendingQueries: function() {
                        return a.length
                    },
                    clear: function() {
                        n.push.apply(n, a);
                        for (var e = 0; e < n.length; e++) t.ext_disjoint_timer_query.deleteQueryEXT(n[e]);
                        a.length = 0, n.length = 0
                    },
                    restore: function() {
                        a.length = 0, n.length = 0
                    }
                }
            },
            ri = 16384,
            ai = 256,
            ii = 1024,
            oi = 34962,
            ui = "webglcontextlost",
            fi = "webglcontextrestored",
            ci = 1,
            si = 2,
            li = 3;

        function di(e, t) {
            for (var n = 0; n < e.length; ++n)
                if (e[n] === t) return n;
            return -1
        }
        return function(n) {
            var r = q(n);
            if (!r) return null;
            var a = r.gl,
                i = a.getContextAttributes(),
                o = a.isContextLost(),
                u = function(e, t) {
                    var n = {};

                    function r(t) {
                        D.type(t, "string", "extension name must be string");
                        var r, a = t.toLowerCase();
                        try {
                            r = n[a] = e.getExtension(a)
                        } catch (e) {}
                        return !!r
                    }
                    for (var a = 0; a < t.extensions.length; ++a) {
                        var i = t.extensions[a];
                        if (!r(i)) return t.onDestroy(), t.onDone('"' + i + '" extension is not supported by the current WebGL context, try upgrading your system or a different browser'), null
                    }
                    return t.optionalExtensions.forEach(r), {
                        extensions: n,
                        restore: function() {
                            Object.keys(n).forEach((function(e) {
                                if (n[e] && !r(e)) throw new Error("(regl): error restoring extension " + e)
                            }))
                        }
                    }
                }(a, r);
            if (!u) return null;
            var f, c, s = (f = {
                    "": 0
                }, c = [""], {
                    id: function(e) {
                        var t = f[e];
                        return t || (t = f[e] = c.length, c.push(e), t)
                    },
                    str: function(e) {
                        return c[e]
                    }
                }),
                l = {
                    bufferCount: 0,
                    elementsCount: 0,
                    framebufferCount: 0,
                    shaderCount: 0,
                    textureCount: 0,
                    cubeCount: 0,
                    renderbufferCount: 0,
                    maxTextureUnits: 0
                },
                d = u.extensions,
                p = ni(a, d),
                m = U(),
                h = a.drawingBufferWidth,
                v = a.drawingBufferHeight,
                b = {
                    tick: 0,
                    time: 0,
                    viewportWidth: h,
                    viewportHeight: v,
                    framebufferWidth: h,
                    framebufferHeight: v,
                    drawingBufferWidth: h,
                    drawingBufferHeight: v,
                    pixelRatio: r.pixelRatio
                },
                g = te(a, d),
                y = function(e, t, n, r) {
                    for (var a = n.maxAttributes, i = new Array(a), o = 0; o < a; ++o) i[o] = new Bn;
                    return {
                        Record: Bn,
                        scope: {},
                        state: i
                    }
                }(0, 0, g),
                x = function(t, n, r, a) {
                    var i = 0,
                        o = {};

                    function u(e) {
                        this.id = i++, this.buffer = t.createBuffer(), this.type = e, this.usage = le, this.byteLength = 0, this.dimension = 1, this.dtype = pe, this.persistentData = null, r.profile && (this.stats = {
                            size: 0
                        })
                    }
                    u.prototype.bind = function() {
                        t.bindBuffer(this.type, this.buffer)
                    }, u.prototype.destroy = function() {
                        l(this)
                    };
                    var f = [];

                    function c(e, n, r) {
                        e.byteLength = n.byteLength, t.bufferData(e.type, n, r)
                    }

                    function s(t, n, r, a, i, o) {
                        var u, f;
                        if (t.usage = r, Array.isArray(n)) {
                            if (t.dtype = a || me, n.length > 0)
                                if (Array.isArray(n[0])) {
                                    u = se(n);
                                    for (var s = 1, l = 1; l < u.length; ++l) s *= u[l];
                                    t.dimension = s, c(t, f = ce(n, u, t.dtype), r), o ? t.persistentData = f : ee.freeType(f)
                                } else if ("number" == typeof n[0]) {
                                t.dimension = i;
                                var d = ee.allocType(t.dtype, n.length);
                                be(d, n), c(t, d, r), o ? t.persistentData = d : ee.freeType(d)
                            } else e(n[0]) ? (t.dimension = n[0].length, t.dtype = a || ve(n[0]) || me, c(t, f = ce(n, [n.length, n[0].length], t.dtype), r), o ? t.persistentData = f : ee.freeType(f)) : D.raise("invalid buffer data")
                        } else if (e(n)) t.dtype = a || ve(n), t.dimension = i, c(t, n, r), o && (t.persistentData = new Uint8Array(new Uint8Array(n.buffer)));
                        else if (ne(n)) {
                            u = n.shape;
                            var p = n.stride,
                                m = n.offset,
                                h = 0,
                                v = 0,
                                b = 0,
                                g = 0;
                            1 === u.length ? (h = u[0], v = 1, b = p[0], g = 0) : 2 === u.length ? (h = u[0], v = u[1], b = p[0], g = p[1]) : D.raise("invalid shape"), t.dtype = a || ve(n.data) || me, t.dimension = v;
                            var y = ee.allocType(t.dtype, h * v);
                            ge(y, n.data, h, v, b, g, m), c(t, y, r), o ? t.persistentData = y : ee.freeType(y)
                        } else n instanceof ArrayBuffer ? (t.dtype = pe, t.dimension = i, c(t, n, r), o && (t.persistentData = new Uint8Array(new Uint8Array(n)))) : D.raise("invalid buffer data")
                    }

                    function l(e) {
                        n.bufferCount--;
                        for (var r = 0; r < a.state.length; ++r) {
                            var i = a.state[r];
                            i.buffer === e && (t.disableVertexAttribArray(r), i.buffer = null)
                        }
                        var u = e.buffer;
                        D(u, "buffer must not be deleted already"), t.deleteBuffer(u), e.buffer = null, delete o[e.id]
                    }
                    return r.profile && (n.getTotalBufferSize = function() {
                        var e = 0;
                        return Object.keys(o).forEach((function(t) {
                            e += o[t].stats.size
                        })), e
                    }), {
                        create: function(a, i, f, c) {
                            n.bufferCount++;
                            var d = new u(i);

                            function p(n) {
                                var a = le,
                                    i = null,
                                    o = 0,
                                    u = 0,
                                    f = 1;
                                return Array.isArray(n) || e(n) || ne(n) || n instanceof ArrayBuffer ? i = n : "number" == typeof n ? o = 0 | n : n && (D.type(n, "object", "buffer arguments must be an object, a number or an array"), "data" in n && (D(null === i || Array.isArray(i) || e(i) || ne(i), "invalid data for buffer"), i = n.data), "usage" in n && (D.parameter(n.usage, fe, "invalid buffer usage"), a = fe[n.usage]), "type" in n && (D.parameter(n.type, ue, "invalid buffer type"), u = ue[n.type]), "dimension" in n && (D.type(n.dimension, "number", "invalid dimension"), f = 0 | n.dimension), "length" in n && (D.nni(o, "buffer length must be a nonnegative integer"), o = 0 | n.length)), d.bind(), i ? s(d, i, a, u, f, c) : (o && t.bufferData(d.type, o, a), d.dtype = u || pe, d.usage = a, d.dimension = f, d.byteLength = o), r.profile && (d.stats.size = d.byteLength * he[d.dtype]), p
                            }

                            function m(e, n) {
                                D(n + e.byteLength <= d.byteLength, "invalid buffer subdata call, buffer is too small.  Can't write data of size " + e.byteLength + " starting from offset " + n + " to a buffer of size " + d.byteLength), t.bufferSubData(d.type, n, e)
                            }
                            return o[d.id] = d, f || p(a), p._reglType = "buffer", p._buffer = d, p.subdata = function(t, n) {
                                var r, a = 0 | (n || 0);
                                if (d.bind(), e(t) || t instanceof ArrayBuffer) m(t, a);
                                else if (Array.isArray(t)) {
                                    if (t.length > 0)
                                        if ("number" == typeof t[0]) {
                                            var i = ee.allocType(d.dtype, t.length);
                                            be(i, t), m(i, a), ee.freeType(i)
                                        } else if (Array.isArray(t[0]) || e(t[0])) {
                                        r = se(t);
                                        var o = ce(t, r, d.dtype);
                                        m(o, a), ee.freeType(o)
                                    } else D.raise("invalid buffer data")
                                } else if (ne(t)) {
                                    r = t.shape;
                                    var u = t.stride,
                                        f = 0,
                                        c = 0,
                                        s = 0,
                                        l = 0;
                                    1 === r.length ? (f = r[0], c = 1, s = u[0], l = 0) : 2 === r.length ? (f = r[0], c = r[1], s = u[0], l = u[1]) : D.raise("invalid shape");
                                    var h = Array.isArray(t.data) ? d.dtype : ve(t.data),
                                        v = ee.allocType(h, f * c);
                                    ge(v, t.data, f, c, s, l, t.offset), m(v, a), ee.freeType(v)
                                } else D.raise("invalid data for buffer subdata");
                                return p
                            }, r.profile && (p.stats = d.stats), p.destroy = function() {
                                l(d)
                            }, p
                        },
                        createStream: function(e, t) {
                            var n = f.pop();
                            return n || (n = new u(e)), n.bind(), s(n, t, de, 0, 1, !1), n
                        },
                        destroyStream: function(e) {
                            f.push(e)
                        },
                        clear: function() {
                            re(o).forEach(l), f.forEach(l)
                        },
                        getBuffer: function(e) {
                            return e && e._buffer instanceof u ? e._buffer : null
                        },
                        restore: function() {
                            re(o).forEach((function(e) {
                                e.buffer = t.createBuffer(), t.bindBuffer(e.type, e.buffer), t.bufferData(e.type, e.persistentData || e.byteLength, e.usage)
                            }))
                        },
                        _initBuffer: s
                    }
                }(a, l, r, y),
                w = function(t, n, r, a) {
                    var i = {},
                        o = 0,
                        u = {
                            uint8: Ae,
                            uint16: Se
                        };

                    function f(e) {
                        this.id = o++, i[this.id] = this, this.buffer = e, this.primType = _e, this.vertCount = 0, this.type = 0
                    }
                    n.oes_element_index_uint && (u.uint32 = je), f.prototype.bind = function() {
                        this.buffer.bind()
                    };
                    var c = [];

                    function s(a, i, o, u, f, c, s) {
                        if (a.buffer.bind(), i) {
                            var l = s;
                            s || e(i) && (!ne(i) || e(i.data)) || (l = n.oes_element_index_uint ? je : Se), r._initBuffer(a.buffer, i, o, l, 3)
                        } else t.bufferData(Ee, c, o), a.buffer.dtype = d || Ae, a.buffer.usage = o, a.buffer.dimension = 3, a.buffer.byteLength = c;
                        var d = s;
                        if (!s) {
                            switch (a.buffer.dtype) {
                                case Ae:
                                case ke:
                                    d = Ae;
                                    break;
                                case Se:
                                case Me:
                                    d = Se;
                                    break;
                                case je:
                                case Te:
                                    d = je;
                                    break;
                                default:
                                    D.raise("unsupported type for element array")
                            }
                            a.buffer.dtype = d
                        }
                        a.type = d, D(d !== je || !!n.oes_element_index_uint, "32 bit element buffers not supported, enable oes_element_index_uint first");
                        var p = f;
                        p < 0 && (p = a.buffer.byteLength, d === Se ? p >>= 1 : d === je && (p >>= 2)), a.vertCount = p;
                        var m = u;
                        if (u < 0) {
                            m = _e;
                            var h = a.buffer.dimension;
                            1 === h && (m = xe), 2 === h && (m = we), 3 === h && (m = _e)
                        }
                        a.primType = m
                    }

                    function l(e) {
                        a.elementsCount--, D(null !== e.buffer, "must not double destroy elements"), delete i[e.id], e.buffer.destroy(), e.buffer = null
                    }
                    return {
                        create: function(t, n) {
                            var i = r.create(null, Ee, !0),
                                o = new f(i._buffer);

                            function c(t) {
                                if (t)
                                    if ("number" == typeof t) i(t), o.primType = _e, o.vertCount = 0 | t, o.type = Ae;
                                    else {
                                        var n = null,
                                            r = Oe,
                                            a = -1,
                                            f = -1,
                                            l = 0,
                                            d = 0;
                                        Array.isArray(t) || e(t) || ne(t) ? n = t : (D.type(t, "object", "invalid arguments for elements"), "data" in t && (n = t.data, D(Array.isArray(n) || e(n) || ne(n), "invalid data for element buffer")), "usage" in t && (D.parameter(t.usage, fe, "invalid element buffer usage"), r = fe[t.usage]), "primitive" in t && (D.parameter(t.primitive, ye, "invalid element buffer primitive"), a = ye[t.primitive]), "count" in t && (D("number" == typeof t.count && t.count >= 0, "invalid vertex count for elements"), f = 0 | t.count), "type" in t && (D.parameter(t.type, u, "invalid buffer type"), d = u[t.type]), "length" in t ? l = 0 | t.length : (l = f, d === Se || d === Me ? l *= 2 : d !== je && d !== Te || (l *= 4))), s(o, n, r, a, f, l, d)
                                    }
                                else i(), o.primType = _e, o.vertCount = 0, o.type = Ae;
                                return c
                            }
                            return a.elementsCount++, c(t), c._reglType = "elements", c._elements = o, c.subdata = function(e, t) {
                                return i.subdata(e, t), c
                            }, c.destroy = function() {
                                l(o)
                            }, c
                        },
                        createStream: function(e) {
                            var t = c.pop();
                            return t || (t = new f(r.create(null, Ee, !0, !1)._buffer)), s(t, e, Ce, -1, -1, 0, 0), t
                        },
                        destroyStream: function(e) {
                            c.push(e)
                        },
                        getElements: function(e) {
                            return "function" == typeof e && e._elements instanceof f ? e._elements : null
                        },
                        clear: function() {
                            re(i).forEach(l)
                        }
                    }
                }(a, d, x, l),
                _ = function(e, t, n, r) {
                    var a = {},
                        i = {};

                    function o(e, t, n, r) {
                        this.name = e, this.id = t, this.location = n, this.info = r
                    }

                    function u(e, t) {
                        for (var n = 0; n < e.length; ++n)
                            if (e[n].id === t.id) return void(e[n].location = t.location);
                        e.push(t)
                    }

                    function f(n, r, o) {
                        var u = n === Ln ? a : i,
                            f = u[r];
                        if (!f) {
                            var c = t.str(r);
                            f = e.createShader(n), e.shaderSource(f, c), e.compileShader(f), D.shaderError(e, f, c, n, o), u[r] = f
                        }
                        return f
                    }
                    var c = {},
                        s = [],
                        l = 0;

                    function d(e, t) {
                        this.id = l++, this.fragId = e, this.vertId = t, this.program = null, this.uniforms = [], this.attributes = [], r.profile && (this.stats = {
                            uniformsCount: 0,
                            attributesCount: 0
                        })
                    }

                    function p(n, a) {
                        var i, c, s = f(Ln, n.fragId),
                            l = f(Un, n.vertId),
                            d = n.program = e.createProgram();
                        e.attachShader(d, s), e.attachShader(d, l), e.linkProgram(d), D.linkError(e, d, t.str(n.fragId), t.str(n.vertId), a);
                        var p = e.getProgramParameter(d, Nn);
                        r.profile && (n.stats.uniformsCount = p);
                        var m = n.uniforms;
                        for (i = 0; i < p; ++i)
                            if (c = e.getActiveUniform(d, i))
                                if (c.size > 1)
                                    for (var h = 0; h < c.size; ++h) {
                                        var v = c.name.replace("[0]", "[" + h + "]");
                                        u(m, new o(v, t.id(v), e.getUniformLocation(d, v), c))
                                    } else u(m, new o(c.name, t.id(c.name), e.getUniformLocation(d, c.name), c));
                        var b = e.getProgramParameter(d, Wn);
                        r.profile && (n.stats.attributesCount = b);
                        var g = n.attributes;
                        for (i = 0; i < b; ++i)(c = e.getActiveAttrib(d, i)) && u(g, new o(c.name, t.id(c.name), e.getAttribLocation(d, c.name), c))
                    }
                    return r.profile && (n.getMaxUniformsCount = function() {
                        var e = 0;
                        return s.forEach((function(t) {
                            t.stats.uniformsCount > e && (e = t.stats.uniformsCount)
                        })), e
                    }, n.getMaxAttributesCount = function() {
                        var e = 0;
                        return s.forEach((function(t) {
                            t.stats.attributesCount > e && (e = t.stats.attributesCount)
                        })), e
                    }), {
                        clear: function() {
                            var t = e.deleteShader.bind(e);
                            re(a).forEach(t), a = {}, re(i).forEach(t), i = {}, s.forEach((function(t) {
                                e.deleteProgram(t.program)
                            })), s.length = 0, c = {}, n.shaderCount = 0
                        },
                        program: function(e, t, r) {
                            D.command(e >= 0, "missing vertex shader", r), D.command(t >= 0, "missing fragment shader", r);
                            var a = c[t];
                            a || (a = c[t] = {});
                            var i = a[e];
                            return i || (i = new d(t, e), n.shaderCount++, p(i, r), a[e] = i, s.push(i)), i
                        },
                        restore: function() {
                            a = {}, i = {};
                            for (var e = 0; e < s.length; ++e) p(s[e])
                        },
                        shader: f,
                        frag: -1,
                        vert: -1
                    }
                }(a, s, l, r),
                k = pn(a, d, g, (function() {
                    S.procs.poll()
                }), b, l, r),
                A = gn(a, d, g, l, r),
                M = function(e, n, r, a, i, o) {
                    var u = {
                            cur: null,
                            next: null,
                            dirty: !1,
                            setFBO: null
                        },
                        f = ["rgba"],
                        c = ["rgba4", "rgb565", "rgb5 a1"];
                    n.ext_srgb && c.push("srgba"), n.ext_color_buffer_half_float && c.push("rgba16f", "rgb16f"), n.webgl_color_buffer_float && c.push("rgba32f");
                    var s = ["uint8"];

                    function l(e, t, n) {
                        this.target = e, this.texture = t, this.renderbuffer = n;
                        var r = 0,
                            a = 0;
                        t ? (r = t.width, a = t.height) : n && (r = n.width, a = n.height), this.width = r, this.height = a
                    }

                    function d(e) {
                        e && (e.texture && e.texture._texture.decRef(), e.renderbuffer && e.renderbuffer._renderbuffer.decRef())
                    }

                    function p(e, t, n) {
                        if (e)
                            if (e.texture) {
                                var r = e.texture._texture,
                                    a = Math.max(1, r.width),
                                    i = Math.max(1, r.height);
                                D(a === t && i === n, "inconsistent width/height for supplied texture"), r.refCount += 1
                            } else {
                                var o = e.renderbuffer._renderbuffer;
                                D(o.width === t && o.height === n, "inconsistent width/height for renderbuffer"), o.refCount += 1
                            }
                    }

                    function m(t, n) {
                        n && (n.texture ? e.framebufferTexture2D(yn, t, n.target, n.texture._texture.texture, 0) : e.framebufferRenderbuffer(yn, t, xn, n.renderbuffer._renderbuffer.renderbuffer))
                    }

                    function h(e) {
                        var t = wn,
                            n = null,
                            r = null,
                            a = e;
                        "object" == typeof e && (a = e.data, "target" in e && (t = 0 | e.target)), D.type(a, "function", "invalid attachment data");
                        var i = a._reglType;
                        return "texture2d" === i ? (n = a, D(t === wn)) : "textureCube" === i ? (n = a, D(t >= _n && t < _n + 6, "invalid cube map target")) : "renderbuffer" === i ? (r = a, t = xn) : D.raise("invalid regl object for attachment"), new l(t, n, r)
                    }

                    function v(e, t, n, r, o) {
                        if (n) {
                            var u = a.create2D({
                                width: e,
                                height: t,
                                format: r,
                                type: o
                            });
                            return u._texture.refCount = 0, new l(wn, u, null)
                        }
                        var f = i.create({
                            width: e,
                            height: t,
                            format: r
                        });
                        return f._renderbuffer.refCount = 0, new l(xn, null, f)
                    }

                    function b(e) {
                        return e && (e.texture || e.renderbuffer)
                    }

                    function g(e, t, n) {
                        e && (e.texture ? e.texture.resize(t, n) : e.renderbuffer && e.renderbuffer.resize(t, n), e.width = t, e.height = n)
                    }
                    n.oes_texture_half_float && s.push("half float", "float16"), n.oes_texture_float && s.push("float", "float32");
                    var y = 0,
                        x = {};

                    function w() {
                        this.id = y++, x[this.id] = this, this.framebuffer = e.createFramebuffer(), this.width = 0, this.height = 0, this.colorAttachments = [], this.depthAttachment = null, this.stencilAttachment = null, this.depthStencilAttachment = null
                    }

                    function _(e) {
                        e.colorAttachments.forEach(d), d(e.depthAttachment), d(e.stencilAttachment), d(e.depthStencilAttachment)
                    }

                    function k(t) {
                        var n = t.framebuffer;
                        D(n, "must not double destroy framebuffer"), e.deleteFramebuffer(n), t.framebuffer = null, o.framebufferCount--, delete x[t.id]
                    }

                    function A(t) {
                        var n;
                        e.bindFramebuffer(yn, t.framebuffer);
                        var a = t.colorAttachments;
                        for (n = 0; n < a.length; ++n) m(kn + n, a[n]);
                        for (n = a.length; n < r.maxColorAttachments; ++n) e.framebufferTexture2D(yn, kn + n, wn, null, 0);
                        e.framebufferTexture2D(yn, Sn, wn, null, 0), e.framebufferTexture2D(yn, An, wn, null, 0), e.framebufferTexture2D(yn, Mn, wn, null, 0), m(An, t.depthAttachment), m(Mn, t.stencilAttachment), m(Sn, t.depthStencilAttachment);
                        var i = e.checkFramebufferStatus(yn);
                        e.isContextLost() || i === Tn || D.raise("framebuffer configuration not supported, status = " + Rn[i]), e.bindFramebuffer(yn, u.next ? u.next.framebuffer : null), u.cur = u.next, e.getError()
                    }

                    function M(e, a) {
                        var i = new w;

                        function l(e, t) {
                            var a;
                            D(u.next !== i, "can not update framebuffer which is currently in use");
                            var o = 0,
                                d = 0,
                                m = !0,
                                g = !0,
                                y = null,
                                x = !0,
                                w = "rgba",
                                k = "uint8",
                                M = 1,
                                S = null,
                                T = null,
                                j = null,
                                E = !1;
                            if ("number" == typeof e) o = 0 | e, d = 0 | t || o;
                            else if (e) {
                                D.type(e, "object", "invalid arguments for framebuffer");
                                var C = e;
                                if ("shape" in C) {
                                    var O = C.shape;
                                    D(Array.isArray(O) && O.length >= 2, "invalid shape for framebuffer"), o = O[0], d = O[1]
                                } else "radius" in C && (o = d = C.radius), "width" in C && (o = C.width), "height" in C && (d = C.height);
                                ("color" in C || "colors" in C) && (y = C.color || C.colors, Array.isArray(y) && D(1 === y.length || n.webgl_draw_buffers, "multiple render targets not supported")), y || ("colorCount" in C && (M = 0 | C.colorCount, D(M > 0, "invalid color buffer count")), "colorTexture" in C && (x = !!C.colorTexture, w = "rgba4"), "colorType" in C && (k = C.colorType, x ? (D(n.oes_texture_float || !("float" === k || "float32" === k), "you must enable OES_texture_float in order to use floating point framebuffer objects"), D(n.oes_texture_half_float || !("half float" === k || "float16" === k), "you must enable OES_texture_half_float in order to use 16-bit floating point framebuffer objects")) : "half float" === k || "float16" === k ? (D(n.ext_color_buffer_half_float, "you must enable EXT_color_buffer_half_float to use 16-bit render buffers"), w = "rgba16f") : "float" !== k && "float32" !== k || (D(n.webgl_color_buffer_float, "you must enable WEBGL_color_buffer_float in order to use 32-bit floating point renderbuffers"), w = "rgba32f"), D.oneOf(k, s, "invalid color type")), "colorFormat" in C && (w = C.colorFormat, f.indexOf(w) >= 0 ? x = !0 : c.indexOf(w) >= 0 ? x = !1 : x ? D.oneOf(C.colorFormat, f, "invalid color format for texture") : D.oneOf(C.colorFormat, c, "invalid color format for renderbuffer"))), ("depthTexture" in C || "depthStencilTexture" in C) && (E = !(!C.depthTexture && !C.depthStencilTexture), D(!E || n.webgl_depth_texture, "webgl_depth_texture extension not supported")), "depth" in C && ("boolean" == typeof C.depth ? m = C.depth : (S = C.depth, g = !1)), "stencil" in C && ("boolean" == typeof C.stencil ? g = C.stencil : (T = C.stencil, m = !1)), "depthStencil" in C && ("boolean" == typeof C.depthStencil ? m = g = C.depthStencil : (j = C.depthStencil, m = !1, g = !1))
                            } else o = d = 1;
                            var F = null,
                                I = null,
                                P = null,
                                R = null;
                            if (Array.isArray(y)) F = y.map(h);
                            else if (y) F = [h(y)];
                            else
                                for (F = new Array(M), a = 0; a < M; ++a) F[a] = v(o, d, x, w, k);
                            D(n.webgl_draw_buffers || F.length <= 1, "you must enable the WEBGL_draw_buffers extension in order to use multiple color buffers."), D(F.length <= r.maxColorAttachments, "too many color attachments, not supported"), o = o || F[0].width, d = d || F[0].height, S ? I = h(S) : m && !g && (I = v(o, d, E, "depth", "uint32")), T ? P = h(T) : g && !m && (P = v(o, d, !1, "stencil", "uint8")), j ? R = h(j) : !S && !T && g && m && (R = v(o, d, E, "depth stencil", "depth stencil")), D(!!S + !!T + !!j <= 1, "invalid framebuffer configuration, can specify exactly one depth/stencil attachment");
                            var z = null;
                            for (a = 0; a < F.length; ++a)
                                if (p(F[a], o, d), D(!F[a] || F[a].texture && En.indexOf(F[a].texture._texture.format) >= 0 || F[a].renderbuffer && Pn.indexOf(F[a].renderbuffer._renderbuffer.format) >= 0, "framebuffer color attachment " + a + " is invalid"), F[a] && F[a].texture) {
                                    var B = Cn[F[a].texture._texture.format] * On[F[a].texture._texture.type];
                                    null === z ? z = B : D(z === B, "all color attachments much have the same number of bits per pixel.")
                                } return p(I, o, d), D(!I || I.texture && I.texture._texture.format === jn || I.renderbuffer && I.renderbuffer._renderbuffer.format === Dn, "invalid depth attachment for framebuffer object"), p(P, o, d), D(!P || P.renderbuffer && P.renderbuffer._renderbuffer.format === Fn, "invalid stencil attachment for framebuffer object"), p(R, o, d), D(!R || R.texture && R.texture._texture.format === In || R.renderbuffer && R.renderbuffer._renderbuffer.format === In, "invalid depth-stencil attachment for framebuffer object"), _(i), i.width = o, i.height = d, i.colorAttachments = F, i.depthAttachment = I, i.stencilAttachment = P, i.depthStencilAttachment = R, l.color = F.map(b), l.depth = b(I), l.stencil = b(P), l.depthStencil = b(R), l.width = i.width, l.height = i.height, A(i), l
                        }
                        return o.framebufferCount++, l(e, a), t(l, {
                            resize: function(e, t) {
                                D(u.next !== i, "can not resize a framebuffer which is currently in use");
                                var n = Math.max(0 | e, 1),
                                    r = Math.max(0 | t || n, 1);
                                if (n === i.width && r === i.height) return l;
                                for (var a = i.colorAttachments, o = 0; o < a.length; ++o) g(a[o], n, r);
                                return g(i.depthAttachment, n, r), g(i.stencilAttachment, n, r), g(i.depthStencilAttachment, n, r), i.width = l.width = n, i.height = l.height = r, A(i), l
                            },
                            _reglType: "framebuffer",
                            _framebuffer: i,
                            destroy: function() {
                                k(i), _(i)
                            },
                            use: function(e) {
                                u.setFBO({
                                    framebuffer: l
                                }, e)
                            }
                        })
                    }
                    return t(u, {
                        getFramebuffer: function(e) {
                            if ("function" == typeof e && "framebuffer" === e._reglType) {
                                var t = e._framebuffer;
                                if (t instanceof w) return t
                            }
                            return null
                        },
                        create: M,
                        createCube: function(e) {
                            var i = Array(6);

                            function o(e) {
                                var r;
                                D(i.indexOf(u.next) < 0, "can not update framebuffer which is currently in use");
                                var c, l = {
                                        color: null
                                    },
                                    d = 0,
                                    p = null,
                                    m = "rgba",
                                    h = "uint8",
                                    v = 1;
                                if ("number" == typeof e) d = 0 | e;
                                else if (e) {
                                    D.type(e, "object", "invalid arguments for framebuffer");
                                    var b = e;
                                    if ("shape" in b) {
                                        var g = b.shape;
                                        D(Array.isArray(g) && g.length >= 2, "invalid shape for framebuffer"), D(g[0] === g[1], "cube framebuffer must be square"), d = g[0]
                                    } else "radius" in b && (d = 0 | b.radius), "width" in b ? (d = 0 | b.width, "height" in b && D(b.height === d, "must be square")) : "height" in b && (d = 0 | b.height);
                                    ("color" in b || "colors" in b) && (p = b.color || b.colors, Array.isArray(p) && D(1 === p.length || n.webgl_draw_buffers, "multiple render targets not supported")), p || ("colorCount" in b && (v = 0 | b.colorCount, D(v > 0, "invalid color buffer count")), "colorType" in b && (D.oneOf(b.colorType, s, "invalid color type"), h = b.colorType), "colorFormat" in b && (m = b.colorFormat, D.oneOf(b.colorFormat, f, "invalid color format for texture"))), "depth" in b && (l.depth = b.depth), "stencil" in b && (l.stencil = b.stencil), "depthStencil" in b && (l.depthStencil = b.depthStencil)
                                } else d = 1;
                                if (p)
                                    if (Array.isArray(p))
                                        for (c = [], r = 0; r < p.length; ++r) c[r] = p[r];
                                    else c = [p];
                                else {
                                    c = Array(v);
                                    var y = {
                                        radius: d,
                                        format: m,
                                        type: h
                                    };
                                    for (r = 0; r < v; ++r) c[r] = a.createCube(y)
                                }
                                for (l.color = Array(c.length), r = 0; r < c.length; ++r) {
                                    var x = c[r];
                                    D("function" == typeof x && "textureCube" === x._reglType, "invalid cube map"), d = d || x.width, D(x.width === d && x.height === d, "invalid cube map shape"), l.color[r] = {
                                        target: _n,
                                        data: c[r]
                                    }
                                }
                                for (r = 0; r < 6; ++r) {
                                    for (var w = 0; w < c.length; ++w) l.color[w].target = _n + r;
                                    r > 0 && (l.depth = i[0].depth, l.stencil = i[0].stencil, l.depthStencil = i[0].depthStencil), i[r] ? i[r](l) : i[r] = M(l)
                                }
                                return t(o, {
                                    width: d,
                                    height: d,
                                    color: c
                                })
                            }
                            return o(e), t(o, {
                                faces: i,
                                resize: function(e) {
                                    var t, n = 0 | e;
                                    if (D(n > 0 && n <= r.maxCubeMapSize, "invalid radius for cube fbo"), n === o.width) return o;
                                    var a = o.color;
                                    for (t = 0; t < a.length; ++t) a[t].resize(n);
                                    for (t = 0; t < 6; ++t) i[t].resize(n);
                                    return o.width = o.height = n, o
                                },
                                _reglType: "framebufferCube",
                                destroy: function() {
                                    i.forEach((function(e) {
                                        e.destroy()
                                    }))
                                }
                            })
                        },
                        clear: function() {
                            re(x).forEach(k)
                        },
                        restore: function() {
                            u.cur = null, u.next = null, u.dirty = !0, re(x).forEach((function(t) {
                                t.framebuffer = e.createFramebuffer(), A(t)
                            }))
                        }
                    })
                }(a, d, g, k, A, l),
                S = Ka(a, s, d, g, x, w, 0, M, {}, y, _, {
                    elements: null,
                    primitive: 4,
                    count: -1,
                    offset: 0,
                    instances: -1
                }, b, p, r),
                T = Xn(a, M, S.procs.poll, b, i, d, g),
                j = S.next,
                E = a.canvas,
                C = [],
                O = [],
                F = [],
                I = [r.onDestroy],
                P = null;

            function R() {
                if (0 === C.length) return p && p.update(), void(P = null);
                P = L.next(R), Z();
                for (var e = C.length - 1; e >= 0; --e) {
                    var t = C[e];
                    t && t(b, null, 0)
                }
                a.flush(), p && p.update()
            }

            function z() {
                !P && C.length > 0 && (P = L.next(R))
            }

            function N() {
                P && (L.cancel(R), P = null)
            }

            function W(e) {
                e.preventDefault(), o = !0, N(), O.forEach((function(e) {
                    e()
                }))
            }

            function G(e) {
                a.getError(), o = !1, u.restore(), _.restore(), x.restore(), k.restore(), A.restore(), M.restore(), p && p.restore(), S.procs.refresh(), z(), F.forEach((function(e) {
                    e()
                }))
            }

            function Y(e) {
                function n(e) {
                    var t = {},
                        n = {};
                    return Object.keys(e).forEach((function(r) {
                        var a = e[r];
                        B.isDynamic(a) ? n[r] = B.unbox(a, r) : t[r] = a
                    })), {
                        dynamic: n,
                        static: t
                    }
                }
                D(!!e, "invalid args to regl({...})"), D.type(e, "object", "invalid args to regl({...})");
                var r = n(e.context || {}),
                    a = n(e.uniforms || {}),
                    i = n(e.attributes || {}),
                    u = n(function(e) {
                        var n = t({}, e);

                        function r(e) {
                            if (e in n) {
                                var t = n[e];
                                delete n[e], Object.keys(t).forEach((function(r) {
                                    n[e + "." + r] = t[r]
                                }))
                            }
                        }
                        return delete n.uniforms, delete n.attributes, delete n.context, "stencil" in n && n.stencil.op && (n.stencil.opBack = n.stencil.opFront = n.stencil.op, delete n.stencil.op), r("blend"), r("depth"), r("cull"), r("stencil"), r("polygonOffset"), r("scissor"), r("sample"), n
                    }(e)),
                    f = {
                        gpuTime: 0,
                        cpuTime: 0,
                        count: 0
                    },
                    c = S.compile(u, i, a, r, f),
                    s = c.draw,
                    l = c.batch,
                    d = c.scope,
                    p = [];
                return t((function(e, t) {
                    var n;
                    if (o && D.raise("context lost"), "function" == typeof e) return d.call(this, null, e, 0);
                    if ("function" == typeof t) {
                        if ("number" == typeof e) {
                            for (n = 0; n < e; ++n) d.call(this, null, t, n);
                            return
                        }
                        if (Array.isArray(e)) {
                            for (n = 0; n < e.length; ++n) d.call(this, e[n], t, n);
                            return
                        }
                        return d.call(this, e, t, 0)
                    }
                    if ("number" == typeof e) {
                        if (e > 0) return l.call(this, function(e) {
                            for (; p.length < e;) p.push(null);
                            return p
                        }(0 | e), 0 | e)
                    } else {
                        if (!Array.isArray(e)) return s.call(this, e);
                        if (e.length) return l.call(this, e, e.length)
                    }
                }), {
                    stats: f
                })
            }
            E && (E.addEventListener(ui, W, !1), E.addEventListener(fi, G, !1));
            var H = M.setFBO = Y({
                framebuffer: B.define.call(null, ci, "framebuffer")
            });

            function X(e, t) {
                var n = 0;
                S.procs.poll();
                var r = t.color;
                r && (a.clearColor(+r[0] || 0, +r[1] || 0, +r[2] || 0, +r[3] || 0), n |= ri), "depth" in t && (a.clearDepth(+t.depth), n |= ai), "stencil" in t && (a.clearStencil(0 | t.stencil), n |= ii), D(!!n, "called regl.clear with no buffer specified"), a.clear(n)
            }

            function Q(e) {
                return D.type(e, "function", "regl.frame() callback must be a function"), C.push(e), z(), {
                    cancel: function() {
                        var t = di(C, e);
                        D(t >= 0, "cannot cancel a frame twice"), C[t] = function e() {
                            var t = di(C, e);
                            C[t] = C[C.length - 1], C.length -= 1, C.length <= 0 && N()
                        }
                    }
                }
            }

            function V() {
                var e = j.viewport,
                    t = j.scissor_box;
                e[0] = e[1] = t[0] = t[1] = 0, b.viewportWidth = b.framebufferWidth = b.drawingBufferWidth = e[2] = t[2] = a.drawingBufferWidth, b.viewportHeight = b.framebufferHeight = b.drawingBufferHeight = e[3] = t[3] = a.drawingBufferHeight
            }

            function Z() {
                b.tick += 1, b.time = K(), V(), S.procs.poll()
            }

            function $() {
                V(), S.procs.refresh(), p && p.update()
            }

            function K() {
                return (U() - m) / 1e3
            }
            $();
            var J = t(Y, {
                clear: function(e) {
                    if (D("object" == typeof e && e, "regl.clear() takes an object as input"), "framebuffer" in e)
                        if (e.framebuffer && "framebufferCube" === e.framebuffer_reglType)
                            for (var n = 0; n < 6; ++n) H(t({
                                framebuffer: e.framebuffer.faces[n]
                            }, e), X);
                        else H(e, X);
                    else X(0, e)
                },
                prop: B.define.bind(null, ci),
                context: B.define.bind(null, si),
                this: B.define.bind(null, li),
                draw: Y({}),
                buffer: function(e) {
                    return x.create(e, oi, !1, !1)
                },
                elements: function(e) {
                    return w.create(e, !1)
                },
                texture: k.create2D,
                cube: k.createCube,
                renderbuffer: A.create,
                framebuffer: M.create,
                framebufferCube: M.createCube,
                attributes: i,
                frame: Q,
                on: function(e, t) {
                    var n;
                    switch (D.type(t, "function", "listener callback must be a function"), e) {
                        case "frame":
                            return Q(t);
                        case "lost":
                            n = O;
                            break;
                        case "restore":
                            n = F;
                            break;
                        case "destroy":
                            n = I;
                            break;
                        default:
                            D.raise("invalid event, must be one of frame,lost,restore,destroy")
                    }
                    return n.push(t), {
                        cancel: function() {
                            for (var e = 0; e < n.length; ++e)
                                if (n[e] === t) return n[e] = n[n.length - 1], void n.pop()
                        }
                    }
                },
                limits: g,
                hasExtension: function(e) {
                    return g.extensions.indexOf(e.toLowerCase()) >= 0
                },
                read: T,
                destroy: function() {
                    C.length = 0, N(), E && (E.removeEventListener(ui, W), E.removeEventListener(fi, G)), _.clear(), M.clear(), A.clear(), k.clear(), w.clear(), x.clear(), p && p.clear(), I.forEach((function(e) {
                        e()
                    }))
                },
                _gl: a,
                _refresh: $,
                poll: function() {
                    Z(), p && p.update()
                },
                now: K,
                stats: l
            });
            return r.onDone(null, J), J
        }
    }()
}, , , , , , , , function(e, t, n) {
    "use strict";
    e.exports = e => encodeURIComponent(e).replace(/[!'()*]/g, e => `%${e.charCodeAt(0).toString(16).toUpperCase()}`)
}, function(e, t, n) {
    "use strict";
    var r = new RegExp("%[a-f0-9]{2}", "gi"),
        a = new RegExp("(%[a-f0-9]{2})+", "gi");

    function i(e, t) {
        try {
            return decodeURIComponent(e.join(""))
        } catch (e) {}
        if (1 === e.length) return e;
        t = t || 1;
        var n = e.slice(0, t),
            r = e.slice(t);
        return Array.prototype.concat.call([], i(n), i(r))
    }

    function o(e) {
        try {
            return decodeURIComponent(e)
        } catch (a) {
            for (var t = e.match(r), n = 1; n < t.length; n++) t = (e = i(t, n).join("")).match(r);
            return e
        }
    }
    e.exports = function(e) {
        if ("string" != typeof e) throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + typeof e + "`");
        try {
            return e = e.replace(/\+/g, " "), decodeURIComponent(e)
        } catch (t) {
            return function(e) {
                for (var t = {
                        "%FE%FF": "ï¿½ï¿½",
                        "%FF%FE": "ï¿½ï¿½"
                    }, n = a.exec(e); n;) {
                    try {
                        t[n[0]] = decodeURIComponent(n[0])
                    } catch (e) {
                        var r = o(n[0]);
                        r !== n[0] && (t[n[0]] = r)
                    }
                    n = a.exec(e)
                }
                t["%C2"] = "ï¿½";
                for (var i = Object.keys(t), u = 0; u < i.length; u++) {
                    var f = i[u];
                    e = e.replace(new RegExp(f, "g"), t[f])
                }
                return e
            }(e)
        }
    }
}, function(e, t, n) {
    "use strict";
    e.exports = (e, t) => {
        if ("string" != typeof e || "string" != typeof t) throw new TypeError("Expected the arguments to be of type `string`");
        if ("" === t) return [e];
        const n = e.indexOf(t);
        return -1 === n ? [e] : [e.slice(0, n), e.slice(n + t.length)]
    }
}, function(e, t, n) {
    var r = {
        "./logo.png": 13,
        "./text-1.png": 14,
        "./text-2.png": 15
    };

    function a(e) {
        var t = i(e);
        return n(t)
    }

    function i(e) {
        if (!n.o(r, e)) {
            var t = new Error("Cannot find module '" + e + "'");
            throw t.code = "MODULE_NOT_FOUND", t
        }
        return r[e]
    }
    a.keys = function() {
        return Object.keys(r)
    }, a.resolve = i, e.exports = a, a.id = 12
}, function(e, t, n) {
    e.exports = n.p + "images/OLogo1.png"
}, function(e, t, n) {
    e.exports = n.p + "images/OLogo2.png"
}, function(e, t, n) {
    e.exports = n.p + "images/OLogo3.png"
}, function(e, t, n) {
    var r = n(17);
    "string" == typeof r && (r = [
        [e.i, r, ""]
    ]);
    var a = {
        insert: "head",
        singleton: !1
    };
    n(19)(r, a);
    r.locals && (e.exports = r.locals)
}, function(e, t, n) {
    (e.exports = n(18)(!1)).push([e.i, "", ""])
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "",
                        r = e[3];
                    if (!r) return n;
                    if (t && "function" == typeof btoa) {
                        var a = (o = r, u = btoa(unescape(encodeURIComponent(JSON.stringify(o)))), f = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(u), "/*# ".concat(f, " */")),
                            i = r.sources.map((function(e) {
                                return "/*# sourceURL=".concat(r.sourceRoot).concat(e, " */")
                            }));
                        return [n].concat(i).concat([a]).join("\n")
                    }
                    var o, u, f;
                    return [n].join("\n")
                }(t, e);
                return t[2] ? "@media ".concat(t[2], "{").concat(n, "}") : n
            })).join("")
        }, t.i = function(e, n) {
            "string" == typeof e && (e = [
                [null, e, ""]
            ]);
            for (var r = {}, a = 0; a < this.length; a++) {
                var i = this[a][0];
                null != i && (r[i] = !0)
            }
            for (var o = 0; o < e.length; o++) {
                var u = e[o];
                null != u[0] && r[u[0]] || (n && !u[2] ? u[2] = n : n && (u[2] = "(".concat(u[2], ") and (").concat(n, ")")), t.push(u))
            }
        }, t
    }
}, function(e, t, n) {
    "use strict";
    var r, a = {},
        i = function() {
            return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r
        },
        o = function() {
            var e = {};
            return function(t) {
                if (void 0 === e[t]) {
                    var n = document.querySelector(t);
                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                        n = n.contentDocument.head
                    } catch (e) {
                        n = null
                    }
                    e[t] = n
                }
                return e[t]
            }
        }();

    function u(e, t) {
        for (var n = [], r = {}, a = 0; a < e.length; a++) {
            var i = e[a],
                o = t.base ? i[0] + t.base : i[0],
                u = {
                    css: i[1],
                    media: i[2],
                    sourceMap: i[3]
                };
            r[o] ? r[o].parts.push(u) : n.push(r[o] = {
                id: o,
                parts: [u]
            })
        }
        return n
    }

    function f(e, t) {
        for (var n = 0; n < e.length; n++) {
            var r = e[n],
                i = a[r.id],
                o = 0;
            if (i) {
                for (i.refs++; o < i.parts.length; o++) i.parts[o](r.parts[o]);
                for (; o < r.parts.length; o++) i.parts.push(v(r.parts[o], t))
            } else {
                for (var u = []; o < r.parts.length; o++) u.push(v(r.parts[o], t));
                a[r.id] = {
                    id: r.id,
                    refs: 1,
                    parts: u
                }
            }
        }
    }

    function c(e) {
        var t = document.createElement("style");
        if (void 0 === e.attributes.nonce) {
            var r = n.nc;
            r && (e.attributes.nonce = r)
        }
        if (Object.keys(e.attributes).forEach((function(n) {
                t.setAttribute(n, e.attributes[n])
            })), "function" == typeof e.insert) e.insert(t);
        else {
            var a = o(e.insert || "head");
            if (!a) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            a.appendChild(t)
        }
        return t
    }
    var s, l = (s = [], function(e, t) {
        return s[e] = t, s.filter(Boolean).join("\n")
    });

    function d(e, t, n, r) {
        var a = n ? "" : r.css;
        if (e.styleSheet) e.styleSheet.cssText = l(t, a);
        else {
            var i = document.createTextNode(a),
                o = e.childNodes;
            o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(i, o[t]) : e.appendChild(i)
        }
    }

    function p(e, t, n) {
        var r = n.css,
            a = n.media,
            i = n.sourceMap;
        if (a && e.setAttribute("media", a), i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), e.styleSheet) e.styleSheet.cssText = r;
        else {
            for (; e.firstChild;) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(r))
        }
    }
    var m = null,
        h = 0;

    function v(e, t) {
        var n, r, a;
        if (t.singleton) {
            var i = h++;
            n = m || (m = c(t)), r = d.bind(null, n, i, !1), a = d.bind(null, n, i, !0)
        } else n = c(t), r = p.bind(null, n, t), a = function() {
            ! function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e)
            }(n)
        };
        return r(e),
            function(t) {
                if (t) {
                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                    r(e = t)
                } else a()
            }
    }
    e.exports = function(e, t) {
        (t = t || {}).attributes = "object" == typeof t.attributes ? t.attributes : {}, t.singleton || "boolean" == typeof t.singleton || (t.singleton = i());
        var n = u(e, t);
        return f(n, t),
            function(e) {
                for (var r = [], i = 0; i < n.length; i++) {
                    var o = n[i],
                        c = a[o.id];
                    c && (c.refs--, r.push(c))
                }
                e && f(u(e, t), t);
                for (var s = 0; s < r.length; s++) {
                    var l = r[s];
                    if (0 === l.refs) {
                        for (var d = 0; d < l.parts.length; d++) l.parts[d]();
                        delete a[l.id]
                    }
                }
            }
    }
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = {};
    n.r(r), n.d(r, "create", (function() {
        return f
    })), n.d(r, "clone", (function() {
        return c
    })), n.d(r, "copy", (function() {
        return s
    })), n.d(r, "fromValues", (function() {
        return l
    })), n.d(r, "set", (function() {
        return d
    })), n.d(r, "identity", (function() {
        return p
    })), n.d(r, "transpose", (function() {
        return m
    })), n.d(r, "invert", (function() {
        return h
    })), n.d(r, "adjoint", (function() {
        return v
    })), n.d(r, "determinant", (function() {
        return b
    })), n.d(r, "multiply", (function() {
        return g
    })), n.d(r, "translate", (function() {
        return y
    })), n.d(r, "scale", (function() {
        return x
    })), n.d(r, "rotate", (function() {
        return w
    })), n.d(r, "rotateX", (function() {
        return _
    })), n.d(r, "rotateY", (function() {
        return k
    })), n.d(r, "rotateZ", (function() {
        return A
    })), n.d(r, "fromTranslation", (function() {
        return M
    })), n.d(r, "fromScaling", (function() {
        return S
    })), n.d(r, "fromRotation", (function() {
        return T
    })), n.d(r, "fromXRotation", (function() {
        return j
    })), n.d(r, "fromYRotation", (function() {
        return E
    })), n.d(r, "fromZRotation", (function() {
        return C
    })), n.d(r, "fromRotationTranslation", (function() {
        return O
    })), n.d(r, "fromQuat2", (function() {
        return D
    })), n.d(r, "getTranslation", (function() {
        return F
    })), n.d(r, "getScaling", (function() {
        return I
    })), n.d(r, "getRotation", (function() {
        return P
    })), n.d(r, "fromRotationTranslationScale", (function() {
        return R
    })), n.d(r, "fromRotationTranslationScaleOrigin", (function() {
        return z
    })), n.d(r, "fromQuat", (function() {
        return B
    })), n.d(r, "frustum", (function() {
        return L
    })), n.d(r, "perspective", (function() {
        return U
    })), n.d(r, "perspectiveFromFieldOfView", (function() {
        return N
    })), n.d(r, "ortho", (function() {
        return W
    })), n.d(r, "lookAt", (function() {
        return q
    })), n.d(r, "targetTo", (function() {
        return G
    })), n.d(r, "str", (function() {
        return Y
    })), n.d(r, "frob", (function() {
        return H
    })), n.d(r, "add", (function() {
        return X
    })), n.d(r, "subtract", (function() {
        return Q
    })), n.d(r, "multiplyScalar", (function() {
        return V
    })), n.d(r, "multiplyScalarAndAdd", (function() {
        return Z
    })), n.d(r, "exactEquals", (function() {
        return $
    })), n.d(r, "equals", (function() {
        return K
    })), n.d(r, "mul", (function() {
        return J
    })), n.d(r, "sub", (function() {
        return ee
    }));
    var a = {};
    n.r(a), n.d(a, "create", (function() {
        return te
    })), n.d(a, "clone", (function() {
        return ne
    })), n.d(a, "length", (function() {
        return re
    })), n.d(a, "fromValues", (function() {
        return ae
    })), n.d(a, "copy", (function() {
        return ie
    })), n.d(a, "set", (function() {
        return oe
    })), n.d(a, "add", (function() {
        return ue
    })), n.d(a, "subtract", (function() {
        return fe
    })), n.d(a, "multiply", (function() {
        return ce
    })), n.d(a, "divide", (function() {
        return se
    })), n.d(a, "ceil", (function() {
        return le
    })), n.d(a, "floor", (function() {
        return de
    })), n.d(a, "min", (function() {
        return pe
    })), n.d(a, "max", (function() {
        return me
    })), n.d(a, "round", (function() {
        return he
    })), n.d(a, "scale", (function() {
        return ve
    })), n.d(a, "scaleAndAdd", (function() {
        return be
    })), n.d(a, "distance", (function() {
        return ge
    })), n.d(a, "squaredDistance", (function() {
        return ye
    })), n.d(a, "squaredLength", (function() {
        return xe
    })), n.d(a, "negate", (function() {
        return we
    })), n.d(a, "inverse", (function() {
        return _e
    })), n.d(a, "normalize", (function() {
        return ke
    })), n.d(a, "dot", (function() {
        return Ae
    })), n.d(a, "cross", (function() {
        return Me
    })), n.d(a, "lerp", (function() {
        return Se
    })), n.d(a, "hermite", (function() {
        return Te
    })), n.d(a, "bezier", (function() {
        return je
    })), n.d(a, "random", (function() {
        return Ee
    })), n.d(a, "transformMat4", (function() {
        return Ce
    })), n.d(a, "transformMat3", (function() {
        return Oe
    })), n.d(a, "transformQuat", (function() {
        return De
    })), n.d(a, "rotateX", (function() {
        return Fe
    })), n.d(a, "rotateY", (function() {
        return Ie
    })), n.d(a, "rotateZ", (function() {
        return Pe
    })), n.d(a, "angle", (function() {
        return Re
    })), n.d(a, "zero", (function() {
        return ze
    })), n.d(a, "str", (function() {
        return Be
    })), n.d(a, "exactEquals", (function() {
        return Le
    })), n.d(a, "equals", (function() {
        return Ue
    })), n.d(a, "sub", (function() {
        return We
    })), n.d(a, "mul", (function() {
        return qe
    })), n.d(a, "div", (function() {
        return Ge
    })), n.d(a, "dist", (function() {
        return Ye
    })), n.d(a, "sqrDist", (function() {
        return He
    })), n.d(a, "len", (function() {
        return Xe
    })), n.d(a, "sqrLen", (function() {
        return Qe
    })), n.d(a, "forEach", (function() {
        return Ve
    }));
    var i = 1e-6,
        o = "undefined" != typeof Float32Array ? Float32Array : Array,
        u = Math.random;
    Math.PI;

    function f() {
        var e = new o(16);
        return o != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e
    }

    function c(e) {
        var t = new o(16);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
    }

    function s(e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
    }

    function l(e, t, n, r, a, i, u, f, c, s, l, d, p, m, h, v) {
        var b = new o(16);
        return b[0] = e, b[1] = t, b[2] = n, b[3] = r, b[4] = a, b[5] = i, b[6] = u, b[7] = f, b[8] = c, b[9] = s, b[10] = l, b[11] = d, b[12] = p, b[13] = m, b[14] = h, b[15] = v, b
    }

    function d(e, t, n, r, a, i, o, u, f, c, s, l, d, p, m, h, v) {
        return e[0] = t, e[1] = n, e[2] = r, e[3] = a, e[4] = i, e[5] = o, e[6] = u, e[7] = f, e[8] = c, e[9] = s, e[10] = l, e[11] = d, e[12] = p, e[13] = m, e[14] = h, e[15] = v, e
    }

    function p(e) {
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function m(e, t) {
        if (e === t) {
            var n = t[1],
                r = t[2],
                a = t[3],
                i = t[6],
                o = t[7],
                u = t[11];
            e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = r, e[9] = i, e[11] = t[14], e[12] = a, e[13] = o, e[14] = u
        } else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
        return e
    }

    function h(e, t) {
        var n = t[0],
            r = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            u = t[5],
            f = t[6],
            c = t[7],
            s = t[8],
            l = t[9],
            d = t[10],
            p = t[11],
            m = t[12],
            h = t[13],
            v = t[14],
            b = t[15],
            g = n * u - r * o,
            y = n * f - a * o,
            x = n * c - i * o,
            w = r * f - a * u,
            _ = r * c - i * u,
            k = a * c - i * f,
            A = s * h - l * m,
            M = s * v - d * m,
            S = s * b - p * m,
            T = l * v - d * h,
            j = l * b - p * h,
            E = d * b - p * v,
            C = g * E - y * j + x * T + w * S - _ * M + k * A;
        return C ? (C = 1 / C, e[0] = (u * E - f * j + c * T) * C, e[1] = (a * j - r * E - i * T) * C, e[2] = (h * k - v * _ + b * w) * C, e[3] = (d * _ - l * k - p * w) * C, e[4] = (f * S - o * E - c * M) * C, e[5] = (n * E - a * S + i * M) * C, e[6] = (v * x - m * k - b * y) * C, e[7] = (s * k - d * x + p * y) * C, e[8] = (o * j - u * S + c * A) * C, e[9] = (r * S - n * j - i * A) * C, e[10] = (m * _ - h * x + b * g) * C, e[11] = (l * x - s * _ - p * g) * C, e[12] = (u * M - o * T - f * A) * C, e[13] = (n * T - r * M + a * A) * C, e[14] = (h * y - m * w - v * g) * C, e[15] = (s * w - l * y + d * g) * C, e) : null
    }

    function v(e, t) {
        var n = t[0],
            r = t[1],
            a = t[2],
            i = t[3],
            o = t[4],
            u = t[5],
            f = t[6],
            c = t[7],
            s = t[8],
            l = t[9],
            d = t[10],
            p = t[11],
            m = t[12],
            h = t[13],
            v = t[14],
            b = t[15];
        return e[0] = u * (d * b - p * v) - l * (f * b - c * v) + h * (f * p - c * d), e[1] = -(r * (d * b - p * v) - l * (a * b - i * v) + h * (a * p - i * d)), e[2] = r * (f * b - c * v) - u * (a * b - i * v) + h * (a * c - i * f), e[3] = -(r * (f * p - c * d) - u * (a * p - i * d) + l * (a * c - i * f)), e[4] = -(o * (d * b - p * v) - s * (f * b - c * v) + m * (f * p - c * d)), e[5] = n * (d * b - p * v) - s * (a * b - i * v) + m * (a * p - i * d), e[6] = -(n * (f * b - c * v) - o * (a * b - i * v) + m * (a * c - i * f)), e[7] = n * (f * p - c * d) - o * (a * p - i * d) + s * (a * c - i * f), e[8] = o * (l * b - p * h) - s * (u * b - c * h) + m * (u * p - c * l), e[9] = -(n * (l * b - p * h) - s * (r * b - i * h) + m * (r * p - i * l)), e[10] = n * (u * b - c * h) - o * (r * b - i * h) + m * (r * c - i * u), e[11] = -(n * (u * p - c * l) - o * (r * p - i * l) + s * (r * c - i * u)), e[12] = -(o * (l * v - d * h) - s * (u * v - f * h) + m * (u * d - f * l)), e[13] = n * (l * v - d * h) - s * (r * v - a * h) + m * (r * d - a * l), e[14] = -(n * (u * v - f * h) - o * (r * v - a * h) + m * (r * f - a * u)), e[15] = n * (u * d - f * l) - o * (r * d - a * l) + s * (r * f - a * u), e
    }

    function b(e) {
        var t = e[0],
            n = e[1],
            r = e[2],
            a = e[3],
            i = e[4],
            o = e[5],
            u = e[6],
            f = e[7],
            c = e[8],
            s = e[9],
            l = e[10],
            d = e[11],
            p = e[12],
            m = e[13],
            h = e[14],
            v = e[15];
        return (t * o - n * i) * (l * v - d * h) - (t * u - r * i) * (s * v - d * m) + (t * f - a * i) * (s * h - l * m) + (n * u - r * o) * (c * v - d * p) - (n * f - a * o) * (c * h - l * p) + (r * f - a * u) * (c * m - s * p)
    }

    function g(e, t, n) {
        var r = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            u = t[4],
            f = t[5],
            c = t[6],
            s = t[7],
            l = t[8],
            d = t[9],
            p = t[10],
            m = t[11],
            h = t[12],
            v = t[13],
            b = t[14],
            g = t[15],
            y = n[0],
            x = n[1],
            w = n[2],
            _ = n[3];
        return e[0] = y * r + x * u + w * l + _ * h, e[1] = y * a + x * f + w * d + _ * v, e[2] = y * i + x * c + w * p + _ * b, e[3] = y * o + x * s + w * m + _ * g, y = n[4], x = n[5], w = n[6], _ = n[7], e[4] = y * r + x * u + w * l + _ * h, e[5] = y * a + x * f + w * d + _ * v, e[6] = y * i + x * c + w * p + _ * b, e[7] = y * o + x * s + w * m + _ * g, y = n[8], x = n[9], w = n[10], _ = n[11], e[8] = y * r + x * u + w * l + _ * h, e[9] = y * a + x * f + w * d + _ * v, e[10] = y * i + x * c + w * p + _ * b, e[11] = y * o + x * s + w * m + _ * g, y = n[12], x = n[13], w = n[14], _ = n[15], e[12] = y * r + x * u + w * l + _ * h, e[13] = y * a + x * f + w * d + _ * v, e[14] = y * i + x * c + w * p + _ * b, e[15] = y * o + x * s + w * m + _ * g, e
    }

    function y(e, t, n) {
        var r, a, i, o, u, f, c, s, l, d, p, m, h = n[0],
            v = n[1],
            b = n[2];
        return t === e ? (e[12] = t[0] * h + t[4] * v + t[8] * b + t[12], e[13] = t[1] * h + t[5] * v + t[9] * b + t[13], e[14] = t[2] * h + t[6] * v + t[10] * b + t[14], e[15] = t[3] * h + t[7] * v + t[11] * b + t[15]) : (r = t[0], a = t[1], i = t[2], o = t[3], u = t[4], f = t[5], c = t[6], s = t[7], l = t[8], d = t[9], p = t[10], m = t[11], e[0] = r, e[1] = a, e[2] = i, e[3] = o, e[4] = u, e[5] = f, e[6] = c, e[7] = s, e[8] = l, e[9] = d, e[10] = p, e[11] = m, e[12] = r * h + u * v + l * b + t[12], e[13] = a * h + f * v + d * b + t[13], e[14] = i * h + c * v + p * b + t[14], e[15] = o * h + s * v + m * b + t[15]), e
    }

    function x(e, t, n) {
        var r = n[0],
            a = n[1],
            i = n[2];
        return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * a, e[5] = t[5] * a, e[6] = t[6] * a, e[7] = t[7] * a, e[8] = t[8] * i, e[9] = t[9] * i, e[10] = t[10] * i, e[11] = t[11] * i, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
    }

    function w(e, t, n, r) {
        var a, o, u, f, c, s, l, d, p, m, h, v, b, g, y, x, w, _, k, A, M, S, T, j, E = r[0],
            C = r[1],
            O = r[2],
            D = Math.hypot(E, C, O);
        return D < i ? null : (E *= D = 1 / D, C *= D, O *= D, a = Math.sin(n), u = 1 - (o = Math.cos(n)), f = t[0], c = t[1], s = t[2], l = t[3], d = t[4], p = t[5], m = t[6], h = t[7], v = t[8], b = t[9], g = t[10], y = t[11], x = E * E * u + o, w = C * E * u + O * a, _ = O * E * u - C * a, k = E * C * u - O * a, A = C * C * u + o, M = O * C * u + E * a, S = E * O * u + C * a, T = C * O * u - E * a, j = O * O * u + o, e[0] = f * x + d * w + v * _, e[1] = c * x + p * w + b * _, e[2] = s * x + m * w + g * _, e[3] = l * x + h * w + y * _, e[4] = f * k + d * A + v * M, e[5] = c * k + p * A + b * M, e[6] = s * k + m * A + g * M, e[7] = l * k + h * A + y * M, e[8] = f * S + d * T + v * j, e[9] = c * S + p * T + b * j, e[10] = s * S + m * T + g * j, e[11] = l * S + h * T + y * j, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e)
    }

    function _(e, t, n) {
        var r = Math.sin(n),
            a = Math.cos(n),
            i = t[4],
            o = t[5],
            u = t[6],
            f = t[7],
            c = t[8],
            s = t[9],
            l = t[10],
            d = t[11];
        return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = i * a + c * r, e[5] = o * a + s * r, e[6] = u * a + l * r, e[7] = f * a + d * r, e[8] = c * a - i * r, e[9] = s * a - o * r, e[10] = l * a - u * r, e[11] = d * a - f * r, e
    }

    function k(e, t, n) {
        var r = Math.sin(n),
            a = Math.cos(n),
            i = t[0],
            o = t[1],
            u = t[2],
            f = t[3],
            c = t[8],
            s = t[9],
            l = t[10],
            d = t[11];
        return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * a - c * r, e[1] = o * a - s * r, e[2] = u * a - l * r, e[3] = f * a - d * r, e[8] = i * r + c * a, e[9] = o * r + s * a, e[10] = u * r + l * a, e[11] = f * r + d * a, e
    }

    function A(e, t, n) {
        var r = Math.sin(n),
            a = Math.cos(n),
            i = t[0],
            o = t[1],
            u = t[2],
            f = t[3],
            c = t[4],
            s = t[5],
            l = t[6],
            d = t[7];
        return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = i * a + c * r, e[1] = o * a + s * r, e[2] = u * a + l * r, e[3] = f * a + d * r, e[4] = c * a - i * r, e[5] = s * a - o * r, e[6] = l * a - u * r, e[7] = d * a - f * r, e
    }

    function M(e, t) {
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e
    }

    function S(e, t) {
        return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function T(e, t, n) {
        var r, a, o, u = n[0],
            f = n[1],
            c = n[2],
            s = Math.hypot(u, f, c);
        return s < i ? null : (u *= s = 1 / s, f *= s, c *= s, r = Math.sin(t), o = 1 - (a = Math.cos(t)), e[0] = u * u * o + a, e[1] = f * u * o + c * r, e[2] = c * u * o - f * r, e[3] = 0, e[4] = u * f * o - c * r, e[5] = f * f * o + a, e[6] = c * f * o + u * r, e[7] = 0, e[8] = u * c * o + f * r, e[9] = f * c * o - u * r, e[10] = c * c * o + a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e)
    }

    function j(e, t) {
        var n = Math.sin(t),
            r = Math.cos(t);
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = r, e[6] = n, e[7] = 0, e[8] = 0, e[9] = -n, e[10] = r, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function E(e, t) {
        var n = Math.sin(t),
            r = Math.cos(t);
        return e[0] = r, e[1] = 0, e[2] = -n, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = n, e[9] = 0, e[10] = r, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function C(e, t) {
        var n = Math.sin(t),
            r = Math.cos(t);
        return e[0] = r, e[1] = n, e[2] = 0, e[3] = 0, e[4] = -n, e[5] = r, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function O(e, t, n) {
        var r = t[0],
            a = t[1],
            i = t[2],
            o = t[3],
            u = r + r,
            f = a + a,
            c = i + i,
            s = r * u,
            l = r * f,
            d = r * c,
            p = a * f,
            m = a * c,
            h = i * c,
            v = o * u,
            b = o * f,
            g = o * c;
        return e[0] = 1 - (p + h), e[1] = l + g, e[2] = d - b, e[3] = 0, e[4] = l - g, e[5] = 1 - (s + h), e[6] = m + v, e[7] = 0, e[8] = d + b, e[9] = m - v, e[10] = 1 - (s + p), e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
    }

    function D(e, t) {
        var n = new o(3),
            r = -t[0],
            a = -t[1],
            i = -t[2],
            u = t[3],
            f = t[4],
            c = t[5],
            s = t[6],
            l = t[7],
            d = r * r + a * a + i * i + u * u;
        return d > 0 ? (n[0] = 2 * (f * u + l * r + c * i - s * a) / d, n[1] = 2 * (c * u + l * a + s * r - f * i) / d, n[2] = 2 * (s * u + l * i + f * a - c * r) / d) : (n[0] = 2 * (f * u + l * r + c * i - s * a), n[1] = 2 * (c * u + l * a + s * r - f * i), n[2] = 2 * (s * u + l * i + f * a - c * r)), O(e, t, n), e
    }

    function F(e, t) {
        return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
    }

    function I(e, t) {
        var n = t[0],
            r = t[1],
            a = t[2],
            i = t[4],
            o = t[5],
            u = t[6],
            f = t[8],
            c = t[9],
            s = t[10];
        return e[0] = Math.hypot(n, r, a), e[1] = Math.hypot(i, o, u), e[2] = Math.hypot(f, c, s), e
    }

    function P(e, t) {
        var n = new o(3);
        I(n, t);
        var r = 1 / n[0],
            a = 1 / n[1],
            i = 1 / n[2],
            u = t[0] * r,
            f = t[1] * a,
            c = t[2] * i,
            s = t[4] * r,
            l = t[5] * a,
            d = t[6] * i,
            p = t[8] * r,
            m = t[9] * a,
            h = t[10] * i,
            v = u + l + h,
            b = 0;
        return v > 0 ? (b = 2 * Math.sqrt(v + 1), e[3] = .25 * b, e[0] = (d - m) / b, e[1] = (p - c) / b, e[2] = (f - s) / b) : u > l && u > h ? (b = 2 * Math.sqrt(1 + u - l - h), e[3] = (d - m) / b, e[0] = .25 * b, e[1] = (f + s) / b, e[2] = (p + c) / b) : l > h ? (b = 2 * Math.sqrt(1 + l - u - h), e[3] = (p - c) / b, e[0] = (f + s) / b, e[1] = .25 * b, e[2] = (d + m) / b) : (b = 2 * Math.sqrt(1 + h - u - l), e[3] = (f - s) / b, e[0] = (p + c) / b, e[1] = (d + m) / b, e[2] = .25 * b), e
    }

    function R(e, t, n, r) {
        var a = t[0],
            i = t[1],
            o = t[2],
            u = t[3],
            f = a + a,
            c = i + i,
            s = o + o,
            l = a * f,
            d = a * c,
            p = a * s,
            m = i * c,
            h = i * s,
            v = o * s,
            b = u * f,
            g = u * c,
            y = u * s,
            x = r[0],
            w = r[1],
            _ = r[2];
        return e[0] = (1 - (m + v)) * x, e[1] = (d + y) * x, e[2] = (p - g) * x, e[3] = 0, e[4] = (d - y) * w, e[5] = (1 - (l + v)) * w, e[6] = (h + b) * w, e[7] = 0, e[8] = (p + g) * _, e[9] = (h - b) * _, e[10] = (1 - (l + m)) * _, e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
    }

    function z(e, t, n, r, a) {
        var i = t[0],
            o = t[1],
            u = t[2],
            f = t[3],
            c = i + i,
            s = o + o,
            l = u + u,
            d = i * c,
            p = i * s,
            m = i * l,
            h = o * s,
            v = o * l,
            b = u * l,
            g = f * c,
            y = f * s,
            x = f * l,
            w = r[0],
            _ = r[1],
            k = r[2],
            A = a[0],
            M = a[1],
            S = a[2],
            T = (1 - (h + b)) * w,
            j = (p + x) * w,
            E = (m - y) * w,
            C = (p - x) * _,
            O = (1 - (d + b)) * _,
            D = (v + g) * _,
            F = (m + y) * k,
            I = (v - g) * k,
            P = (1 - (d + h)) * k;
        return e[0] = T, e[1] = j, e[2] = E, e[3] = 0, e[4] = C, e[5] = O, e[6] = D, e[7] = 0, e[8] = F, e[9] = I, e[10] = P, e[11] = 0, e[12] = n[0] + A - (T * A + C * M + F * S), e[13] = n[1] + M - (j * A + O * M + I * S), e[14] = n[2] + S - (E * A + D * M + P * S), e[15] = 1, e
    }

    function B(e, t) {
        var n = t[0],
            r = t[1],
            a = t[2],
            i = t[3],
            o = n + n,
            u = r + r,
            f = a + a,
            c = n * o,
            s = r * o,
            l = r * u,
            d = a * o,
            p = a * u,
            m = a * f,
            h = i * o,
            v = i * u,
            b = i * f;
        return e[0] = 1 - l - m, e[1] = s + b, e[2] = d - v, e[3] = 0, e[4] = s - b, e[5] = 1 - c - m, e[6] = p + h, e[7] = 0, e[8] = d + v, e[9] = p - h, e[10] = 1 - c - l, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function L(e, t, n, r, a, i, o) {
        var u = 1 / (n - t),
            f = 1 / (a - r),
            c = 1 / (i - o);
        return e[0] = 2 * i * u, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 2 * i * f, e[6] = 0, e[7] = 0, e[8] = (n + t) * u, e[9] = (a + r) * f, e[10] = (o + i) * c, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * i * 2 * c, e[15] = 0, e
    }

    function U(e, t, n, r, a) {
        var i, o = 1 / Math.tan(t / 2);
        return e[0] = o / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = o, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, null != a && a !== 1 / 0 ? (i = 1 / (r - a), e[10] = (a + r) * i, e[14] = 2 * a * r * i) : (e[10] = -1, e[14] = -2 * r), e
    }

    function N(e, t, n, r) {
        var a = Math.tan(t.upDegrees * Math.PI / 180),
            i = Math.tan(t.downDegrees * Math.PI / 180),
            o = Math.tan(t.leftDegrees * Math.PI / 180),
            u = Math.tan(t.rightDegrees * Math.PI / 180),
            f = 2 / (o + u),
            c = 2 / (a + i);
        return e[0] = f, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = c, e[6] = 0, e[7] = 0, e[8] = -(o - u) * f * .5, e[9] = (a - i) * c * .5, e[10] = r / (n - r), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = r * n / (n - r), e[15] = 0, e
    }

    function W(e, t, n, r, a, i, o) {
        var u = 1 / (t - n),
            f = 1 / (r - a),
            c = 1 / (i - o);
        return e[0] = -2 * u, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * f, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * c, e[11] = 0, e[12] = (t + n) * u, e[13] = (a + r) * f, e[14] = (o + i) * c, e[15] = 1, e
    }

    function q(e, t, n, r) {
        var a, o, u, f, c, s, l, d, m, h, v = t[0],
            b = t[1],
            g = t[2],
            y = r[0],
            x = r[1],
            w = r[2],
            _ = n[0],
            k = n[1],
            A = n[2];
        return Math.abs(v - _) < i && Math.abs(b - k) < i && Math.abs(g - A) < i ? p(e) : (l = v - _, d = b - k, m = g - A, a = x * (m *= h = 1 / Math.hypot(l, d, m)) - w * (d *= h), o = w * (l *= h) - y * m, u = y * d - x * l, (h = Math.hypot(a, o, u)) ? (a *= h = 1 / h, o *= h, u *= h) : (a = 0, o = 0, u = 0), f = d * u - m * o, c = m * a - l * u, s = l * o - d * a, (h = Math.hypot(f, c, s)) ? (f *= h = 1 / h, c *= h, s *= h) : (f = 0, c = 0, s = 0), e[0] = a, e[1] = f, e[2] = l, e[3] = 0, e[4] = o, e[5] = c, e[6] = d, e[7] = 0, e[8] = u, e[9] = s, e[10] = m, e[11] = 0, e[12] = -(a * v + o * b + u * g), e[13] = -(f * v + c * b + s * g), e[14] = -(l * v + d * b + m * g), e[15] = 1, e)
    }

    function G(e, t, n, r) {
        var a = t[0],
            i = t[1],
            o = t[2],
            u = r[0],
            f = r[1],
            c = r[2],
            s = a - n[0],
            l = i - n[1],
            d = o - n[2],
            p = s * s + l * l + d * d;
        p > 0 && (s *= p = 1 / Math.sqrt(p), l *= p, d *= p);
        var m = f * d - c * l,
            h = c * s - u * d,
            v = u * l - f * s;
        return (p = m * m + h * h + v * v) > 0 && (m *= p = 1 / Math.sqrt(p), h *= p, v *= p), e[0] = m, e[1] = h, e[2] = v, e[3] = 0, e[4] = l * v - d * h, e[5] = d * m - s * v, e[6] = s * h - l * m, e[7] = 0, e[8] = s, e[9] = l, e[10] = d, e[11] = 0, e[12] = a, e[13] = i, e[14] = o, e[15] = 1, e
    }

    function Y(e) {
        return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
    }

    function H(e) {
        return Math.hypot(e[0], e[1], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
    }

    function X(e, t, n) {
        return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e[4] = t[4] + n[4], e[5] = t[5] + n[5], e[6] = t[6] + n[6], e[7] = t[7] + n[7], e[8] = t[8] + n[8], e[9] = t[9] + n[9], e[10] = t[10] + n[10], e[11] = t[11] + n[11], e[12] = t[12] + n[12], e[13] = t[13] + n[13], e[14] = t[14] + n[14], e[15] = t[15] + n[15], e
    }

    function Q(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e[4] = t[4] - n[4], e[5] = t[5] - n[5], e[6] = t[6] - n[6], e[7] = t[7] - n[7], e[8] = t[8] - n[8], e[9] = t[9] - n[9], e[10] = t[10] - n[10], e[11] = t[11] - n[11], e[12] = t[12] - n[12], e[13] = t[13] - n[13], e[14] = t[14] - n[14], e[15] = t[15] - n[15], e
    }

    function V(e, t, n) {
        return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * n, e[9] = t[9] * n, e[10] = t[10] * n, e[11] = t[11] * n, e[12] = t[12] * n, e[13] = t[13] * n, e[14] = t[14] * n, e[15] = t[15] * n, e
    }

    function Z(e, t, n, r) {
        return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e[2] = t[2] + n[2] * r, e[3] = t[3] + n[3] * r, e[4] = t[4] + n[4] * r, e[5] = t[5] + n[5] * r, e[6] = t[6] + n[6] * r, e[7] = t[7] + n[7] * r, e[8] = t[8] + n[8] * r, e[9] = t[9] + n[9] * r, e[10] = t[10] + n[10] * r, e[11] = t[11] + n[11] * r, e[12] = t[12] + n[12] * r, e[13] = t[13] + n[13] * r, e[14] = t[14] + n[14] * r, e[15] = t[15] + n[15] * r, e
    }

    function $(e, t) {
        return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15]
    }

    function K(e, t) {
        var n = e[0],
            r = e[1],
            a = e[2],
            o = e[3],
            u = e[4],
            f = e[5],
            c = e[6],
            s = e[7],
            l = e[8],
            d = e[9],
            p = e[10],
            m = e[11],
            h = e[12],
            v = e[13],
            b = e[14],
            g = e[15],
            y = t[0],
            x = t[1],
            w = t[2],
            _ = t[3],
            k = t[4],
            A = t[5],
            M = t[6],
            S = t[7],
            T = t[8],
            j = t[9],
            E = t[10],
            C = t[11],
            O = t[12],
            D = t[13],
            F = t[14],
            I = t[15];
        return Math.abs(n - y) <= i * Math.max(1, Math.abs(n), Math.abs(y)) && Math.abs(r - x) <= i * Math.max(1, Math.abs(r), Math.abs(x)) && Math.abs(a - w) <= i * Math.max(1, Math.abs(a), Math.abs(w)) && Math.abs(o - _) <= i * Math.max(1, Math.abs(o), Math.abs(_)) && Math.abs(u - k) <= i * Math.max(1, Math.abs(u), Math.abs(k)) && Math.abs(f - A) <= i * Math.max(1, Math.abs(f), Math.abs(A)) && Math.abs(c - M) <= i * Math.max(1, Math.abs(c), Math.abs(M)) && Math.abs(s - S) <= i * Math.max(1, Math.abs(s), Math.abs(S)) && Math.abs(l - T) <= i * Math.max(1, Math.abs(l), Math.abs(T)) && Math.abs(d - j) <= i * Math.max(1, Math.abs(d), Math.abs(j)) && Math.abs(p - E) <= i * Math.max(1, Math.abs(p), Math.abs(E)) && Math.abs(m - C) <= i * Math.max(1, Math.abs(m), Math.abs(C)) && Math.abs(h - O) <= i * Math.max(1, Math.abs(h), Math.abs(O)) && Math.abs(v - D) <= i * Math.max(1, Math.abs(v), Math.abs(D)) && Math.abs(b - F) <= i * Math.max(1, Math.abs(b), Math.abs(F)) && Math.abs(g - I) <= i * Math.max(1, Math.abs(g), Math.abs(I))
    }
    Math.hypot || (Math.hypot = function() {
        for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
        return Math.sqrt(e)
    });
    var J = g,
        ee = Q;

    function te() {
        var e = new o(3);
        return o != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e
    }

    function ne(e) {
        var t = new o(3);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
    }

    function re(e) {
        var t = e[0],
            n = e[1],
            r = e[2];
        return Math.hypot(t, n, r)
    }

    function ae(e, t, n) {
        var r = new o(3);
        return r[0] = e, r[1] = t, r[2] = n, r
    }

    function ie(e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
    }

    function oe(e, t, n, r) {
        return e[0] = t, e[1] = n, e[2] = r, e
    }

    function ue(e, t, n) {
        return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e
    }

    function fe(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e
    }

    function ce(e, t, n) {
        return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e[2] = t[2] * n[2], e
    }

    function se(e, t, n) {
        return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e[2] = t[2] / n[2], e
    }

    function le(e, t) {
        return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e
    }

    function de(e, t) {
        return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e
    }

    function pe(e, t, n) {
        return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e[2] = Math.min(t[2], n[2]), e
    }

    function me(e, t, n) {
        return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e[2] = Math.max(t[2], n[2]), e
    }

    function he(e, t) {
        return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e
    }

    function ve(e, t, n) {
        return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e
    }

    function be(e, t, n, r) {
        return e[0] = t[0] + n[0] * r, e[1] = t[1] + n[1] * r, e[2] = t[2] + n[2] * r, e
    }

    function ge(e, t) {
        var n = t[0] - e[0],
            r = t[1] - e[1],
            a = t[2] - e[2];
        return Math.hypot(n, r, a)
    }

    function ye(e, t) {
        var n = t[0] - e[0],
            r = t[1] - e[1],
            a = t[2] - e[2];
        return n * n + r * r + a * a
    }

    function xe(e) {
        var t = e[0],
            n = e[1],
            r = e[2];
        return t * t + n * n + r * r
    }

    function we(e, t) {
        return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e
    }

    function _e(e, t) {
        return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e
    }

    function ke(e, t) {
        var n = t[0],
            r = t[1],
            a = t[2],
            i = n * n + r * r + a * a;
        return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e
    }

    function Ae(e, t) {
        return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
    }

    function Me(e, t, n) {
        var r = t[0],
            a = t[1],
            i = t[2],
            o = n[0],
            u = n[1],
            f = n[2];
        return e[0] = a * f - i * u, e[1] = i * o - r * f, e[2] = r * u - a * o, e
    }

    function Se(e, t, n, r) {
        var a = t[0],
            i = t[1],
            o = t[2];
        return e[0] = a + r * (n[0] - a), e[1] = i + r * (n[1] - i), e[2] = o + r * (n[2] - o), e
    }

    function Te(e, t, n, r, a, i) {
        var o = i * i,
            u = o * (2 * i - 3) + 1,
            f = o * (i - 2) + i,
            c = o * (i - 1),
            s = o * (3 - 2 * i);
        return e[0] = t[0] * u + n[0] * f + r[0] * c + a[0] * s, e[1] = t[1] * u + n[1] * f + r[1] * c + a[1] * s, e[2] = t[2] * u + n[2] * f + r[2] * c + a[2] * s, e
    }

    function je(e, t, n, r, a, i) {
        var o = 1 - i,
            u = o * o,
            f = i * i,
            c = u * o,
            s = 3 * i * u,
            l = 3 * f * o,
            d = f * i;
        return e[0] = t[0] * c + n[0] * s + r[0] * l + a[0] * d, e[1] = t[1] * c + n[1] * s + r[1] * l + a[1] * d, e[2] = t[2] * c + n[2] * s + r[2] * l + a[2] * d, e
    }

    function Ee(e, t) {
        t = t || 1;
        var n = 2 * u() * Math.PI,
            r = 2 * u() - 1,
            a = Math.sqrt(1 - r * r) * t;
        return e[0] = Math.cos(n) * a, e[1] = Math.sin(n) * a, e[2] = r * t, e
    }

    function Ce(e, t, n) {
        var r = t[0],
            a = t[1],
            i = t[2],
            o = n[3] * r + n[7] * a + n[11] * i + n[15];
        return o = o || 1, e[0] = (n[0] * r + n[4] * a + n[8] * i + n[12]) / o, e[1] = (n[1] * r + n[5] * a + n[9] * i + n[13]) / o, e[2] = (n[2] * r + n[6] * a + n[10] * i + n[14]) / o, e
    }

    function Oe(e, t, n) {
        var r = t[0],
            a = t[1],
            i = t[2];
        return e[0] = r * n[0] + a * n[3] + i * n[6], e[1] = r * n[1] + a * n[4] + i * n[7], e[2] = r * n[2] + a * n[5] + i * n[8], e
    }

    function De(e, t, n) {
        var r = n[0],
            a = n[1],
            i = n[2],
            o = n[3],
            u = t[0],
            f = t[1],
            c = t[2],
            s = a * c - i * f,
            l = i * u - r * c,
            d = r * f - a * u,
            p = a * d - i * l,
            m = i * s - r * d,
            h = r * l - a * s,
            v = 2 * o;
        return s *= v, l *= v, d *= v, p *= 2, m *= 2, h *= 2, e[0] = u + s + p, e[1] = f + l + m, e[2] = c + d + h, e
    }

    function Fe(e, t, n, r) {
        var a = [],
            i = [];
        return a[0] = t[0] - n[0], a[1] = t[1] - n[1], a[2] = t[2] - n[2], i[0] = a[0], i[1] = a[1] * Math.cos(r) - a[2] * Math.sin(r), i[2] = a[1] * Math.sin(r) + a[2] * Math.cos(r), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e
    }

    function Ie(e, t, n, r) {
        var a = [],
            i = [];
        return a[0] = t[0] - n[0], a[1] = t[1] - n[1], a[2] = t[2] - n[2], i[0] = a[2] * Math.sin(r) + a[0] * Math.cos(r), i[1] = a[1], i[2] = a[2] * Math.cos(r) - a[0] * Math.sin(r), e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e
    }

    function Pe(e, t, n, r) {
        var a = [],
            i = [];
        return a[0] = t[0] - n[0], a[1] = t[1] - n[1], a[2] = t[2] - n[2], i[0] = a[0] * Math.cos(r) - a[1] * Math.sin(r), i[1] = a[0] * Math.sin(r) + a[1] * Math.cos(r), i[2] = a[2], e[0] = i[0] + n[0], e[1] = i[1] + n[1], e[2] = i[2] + n[2], e
    }

    function Re(e, t) {
        var n = ae(e[0], e[1], e[2]),
            r = ae(t[0], t[1], t[2]);
        ke(n, n), ke(r, r);
        var a = Ae(n, r);
        return a > 1 ? 0 : a < -1 ? Math.PI : Math.acos(a)
    }

    function ze(e) {
        return e[0] = 0, e[1] = 0, e[2] = 0, e
    }

    function Be(e) {
        return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
    }

    function Le(e, t) {
        return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
    }

    function Ue(e, t) {
        var n = e[0],
            r = e[1],
            a = e[2],
            o = t[0],
            u = t[1],
            f = t[2];
        return Math.abs(n - o) <= i * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(r - u) <= i * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(a - f) <= i * Math.max(1, Math.abs(a), Math.abs(f))
    }
    var Ne, We = fe,
        qe = ce,
        Ge = se,
        Ye = ge,
        He = ye,
        Xe = re,
        Qe = xe,
        Ve = (Ne = te(), function(e, t, n, r, a, i) {
            var o, u;
            for (t || (t = 3), n || (n = 0), u = r ? Math.min(r * t + n, e.length) : e.length, o = n; o < u; o += t) Ne[0] = e[o], Ne[1] = e[o + 1], Ne[2] = e[o + 2], a(Ne, Ne, i), e[o] = Ne[0], e[o + 1] = Ne[1], e[o + 2] = Ne[2];
            return e
        }),
        Ze = function() {
            void 0
        },
        $e = function() {
            void 0
        },
        Ke = n(0),
        Je = n.n(Ke);
    setTimeout((function() {
        Je.a.parse(location.search).debug
    }));
    var et, tt = function(e) {
            setTimeout((function() {
                void 0
            }))
        },
        nt = function(e, t) {
            var r = e.texture(),
                a = new Image;
            return a.src = n(12)("./".concat(t)), a.onload = function() {
                r({
                    data: a,
                    flipY: !0,
                    min: "mipmap"
                })
            }, r
        },
        rt = n(1),
        at = n.n(rt)()({
            container: document.querySelector(".content"),
            attributes: {
                antialias: !0,
                alpha: !1
            }
        }),
        it = {
            fov: 45,
            near: .01,
            far: 1e3
        };
    tt((function(e) {
        e.addFolder("Camera").add(it, "fov", 0, 200)
    }));
    var ot = {
            eye: [0, 0, 6],
            target: [0, 0, 0],
            up: [0, 1, 0]
        },
        ut = at({
            context: {
                projection: function(e) {
                    var t = e.viewportWidth,
                        n = e.viewportHeight,
                        a = it.near,
                        i = it.far,
                        o = it.fov * Math.PI / 180,
                        u = t / n;
                    return r.perspective([], o, u, a, i)
                },
                view: function(e, t) {
                    var n = Object.assign({}, ot, t),
                        a = n.eye,
                        i = n.target,
                        o = n.up;
                    return r.lookAt([], a, i, o)
                },
                fov: function() {
                    var e = it.fov;
                    return e
                }
            },
            uniforms: {
                u_projection: at.context("projection"),
                u_view: at.context("view"),
                u_cameraPosition: at.context("eye"),
                u_resolution: function(e) {
                    return [e.viewportWidth, e.viewportHeight]
                }
            }
        }),
        ft = [
            [0, 0, 1],
            [1, 0, 0],
            [0, 0, -1],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0]
        ].map((function(e) {
            return [e, e, e, e]
        })),
        ct = [
            [0, 1, 1],
            [0, 0, 1],
            [0, 1, 0],
            [0, 1, 1],
            [1, 0, 0],
            [1, 0, 1]
        ].map((function(e) {
            return [e, e, e, e]
        })),
        st = at.texture(),
        lt = at.cube(),
        dt = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotation: 0,
            rotateX: 1,
            rotateY: 1,
            rotateZ: 1,
            scale: 1,
            borderWidth: .008,
            displacementLength: .028,
            reflectionOpacity: .3,
            scene: 3
        };
    tt((function(e) {
        var t = e.addFolder("Cube");
        t.add(dt, "translateX", -30, 30).step(.01), t.add(dt, "translateY", -30, 30).step(.01), t.add(dt, "translateZ", -30, 30).step(.01), t.add(dt, "rotation", -5, 5).step(1e-4), t.add(dt, "rotateX", 0, 10).step(.1), t.add(dt, "rotateY", 0, 10).step(.1), t.add(dt, "rotateZ", 0, 10).step(.1), t.add(dt, "scale", 0, 10).step(.01), t.add(dt, "borderWidth", 0, .1).step(.01), t.add(dt, "displacementLength", 0, 2).step(.01), t.add(dt, "reflectionOpacity", 0, 1).step(.01), t.add(dt, "scene", {
            Apple: 3,
            Mask: 2,
            Displacement: 1
        })
    }));
    var pt = at({
            frag: "precision mediump float;\n#define GLSLIFY 1\n\nuniform vec2 u_resolution;\nuniform int u_face;\nuniform int u_typeId;\nuniform sampler2D u_texture;\nuniform samplerCube u_reflection;\nuniform float u_tick;\nuniform float u_borderWidth;\nuniform float u_displacementLength;\nuniform float u_reflectionOpacity;\nuniform int u_scene;\n\nvarying vec3 v_normal;\nvarying vec3 v_center;\nvarying vec3 v_point;\nvarying vec2 v_uv;\nvarying vec3 v_color;\nvarying float v_depth;\n\nconst float PI2 = 6.283185307179586;\n\nfloat borders(vec2 uv, float strokeWidth) {\n  vec2 borderBottomLeft = smoothstep(vec2(0.0), vec2(strokeWidth), uv);\n\n  vec2 borderTopRight = smoothstep(vec2(0.0), vec2(strokeWidth), 1.0 - uv);\n\n  return 1.0 - borderBottomLeft.x * borderBottomLeft.y * borderTopRight.x * borderTopRight.y;\n}\n\nconst float PI2_0 = 6.28318530718;\n\nvec4 radialRainbow(vec2 st, float tick) {\n  vec2 toCenter = vec2(0.5) - st;\n  float angle = mod((atan(toCenter.y, toCenter.x) / PI2_0) + 0.5 + sin(tick * 0.002), 1.0);\n\n  // colors\n  vec4 a = vec4(0.15, 0.58, 0.96, 1.0);\n  vec4 b = vec4(0.29, 1.00, 0.55, 1.0);\n  vec4 c = vec4(1.00, 0.0, 0.85, 1.0);\n  vec4 d = vec4(0.92, 0.20, 0.14, 1.0);\n  vec4 e = vec4(1.00, 0.96, 0.32, 1.0);\n\n  float step = 1.0 / 10.0;\n\n  vec4 color = a;\n\n//  color = mix(color, b, smoothstep(step * 1.0, step * 2.0, angle));\n//  color = mix(color, a, smoothstep(step * 2.0, step * 3.0, angle));\n//  color = mix(color, b, smoothstep(step * 3.0, step * 4.0, angle));\n//  color = mix(color, c, smoothstep(step * 4.0, step * 5.0, angle));\n//  color = mix(color, d, smoothstep(step * 5.0, step * 6.0, angle));\n//  color = mix(color, c, smoothstep(step * 6.0, step * 7.0, angle));\n//  color = mix(color, d, smoothstep(step * 7.0, step * 8.0, angle));\n//  color = mix(color, e, smoothstep(step * 8.0, step * 9.0, angle));\n//  color = mix(color, a, smoothstep(step * 9.0, step * 10.0, angle));\n\n  return color;\n}\n\nmat2 scale(vec2 value){\n  return mat2(value.x, 0.0, 0.0, value.y);\n}\n\nmat2 rotate2d(float value){\n  return mat2(cos(value), -sin(value), sin(value), cos(value));\n}\n\nvec2 rotateUV(vec2 uv, float rotation) {\n  float mid = 0.5;\n  return vec2(\n    cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,\n    cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid\n  );\n}\n\nvec4 type1() {\n  vec2 toCenter = v_center.xy - v_point.xy;\n  float angle = (atan(toCenter.y, toCenter.x) / PI2) + 0.5;\n  float displacement = borders(v_uv, u_displacementLength) + borders(v_uv, u_displacementLength * 2.143) * 0.3;\n\n  return vec4(angle, displacement, 0.0, 1.0);\n}\n\nvec4 type2() {\n  return vec4(v_color, 1.0);\n}\n\nvec4 type3() {\n  vec2 st = gl_FragCoord.xy / u_resolution;\n\n  vec4 strokeColor = radialRainbow(st, u_tick);\n  float depth = clamp(smoothstep(-1.0, 1.0, v_depth), 0.6, 0.9);\n  vec4 stroke = strokeColor * vec4(borders(v_uv, u_borderWidth)) * depth;\n\n  vec4 texture;\n\n  if (u_face == -1) {\n    vec3 normal = normalize(v_normal);\n    texture = textureCube(u_reflection, normalize(v_normal));\n\n    texture.a *= u_reflectionOpacity * depth;\n  }  else {\n    texture = texture2D(u_texture, st);\n  }\n\n  if (stroke.a > 0.0) {\n    return stroke - texture.a;\n  } else {\n    return texture;\n  }\n}\n\nvec4 switchScene(int id) {\n  if (id == 1) {\n    return type1();\n  } else if (id == 2) {\n    return type2();\n  } else if (id == 3) {\n    return type3();\n  }\n}\n\nvoid main() {\n  if (u_scene == 3) {\n    gl_FragColor = switchScene(u_typeId);\n  } else {\n    gl_FragColor = switchScene(u_scene);\n  }\n}",
            vert: "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 a_position;\nattribute vec3 a_center;\nattribute vec2 a_uv;\nattribute vec3 a_color;\n\nuniform mat4 u_projection;\nuniform mat4 u_view;\nuniform mat4 u_world;\n\nvarying vec3 v_normal;\nvarying vec3 v_center;\nvarying vec3 v_point;\nvarying vec2 v_uv;\nvarying vec3 v_color;\nvarying float v_depth;\n\nvoid main() {\n  vec4 center = u_projection * u_view * u_world * vec4(a_center, 1.0);\n  vec4 position = u_projection * u_view * u_world * vec4(a_position, 1.0);\n\n  v_normal = normalize(a_position);\n  v_center = center.xyz;\n  v_point = position.xyz;\n  v_uv = a_uv;\n  v_color = a_color;\n  v_depth = (mat3(u_view) * mat3(u_world) * a_position).z;\n\n  gl_Position = position;\n}",
            context: {
                world: function(e, t) {
                    var n = t.matrix,
                        a = dt.translateX,
                        i = dt.translateY,
                        o = dt.translateZ,
                        u = dt.rotation,
                        f = dt.rotateX,
                        c = dt.rotateY,
                        s = dt.rotateZ,
                        l = dt.scale,
                        d = r.create();
                    return r.translate(d, d, [a, i, o]), r.rotate(d, d, u, [f, c, s]), r.scale(d, d, [l, l, l]), n && r.multiply(d, d, n), d
                },
                face: function(e, t) {
                    return t.cullFace === bt.FRONT ? -1 : 1
                },
                texture: function(e, t) {
                    return t.texture || st
                },
                reflection: function(e, t) {
                    return t.reflection || lt
                },
                textureMatrix: function(e, t) {
                    return t.textureMatrix
                },
                borderWidth: function() {
                    var e = dt.borderWidth;
                    return e
                },
                displacementLength: function() {
                    var e = dt.displacementLength;
                    return e
                },
                reflectionOpacity: function() {
                    var e = dt.reflectionOpacity;
                    return e
                },
                scene: function() {
                    var e = dt.scene;
                    return parseFloat(e)
                }
            },
            attributes: {
                a_position: [
                    [-1, 1, 1],
                    [1, 1, 1],
                    [1, -1, 1],
                    [-1, -1, 1],
                    [1, 1, 1],
                    [1, 1, -1],
                    [1, -1, -1],
                    [1, -1, 1],
                    [1, 1, -1],
                    [-1, 1, -1],
                    [-1, -1, -1],
                    [1, -1, -1],
                    [-1, 1, -1],
                    [-1, 1, 1],
                    [-1, -1, 1],
                    [-1, -1, -1],
                    [-1, 1, -1],
                    [1, 1, -1],
                    [1, 1, 1],
                    [-1, 1, 1],
                    [-1, -1, -1],
                    [1, -1, -1],
                    [1, -1, 1],
                    [-1, -1, 1]
                ],
                a_center: ft,
                a_uv: [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ],
                a_color: ct
            },
            uniforms: {
                u_world: at.context("world"),
                u_face: at.context("face"),
                u_typeId: at.prop("typeId"),
                u_texture: at.context("texture"),
                u_reflection: at.context("reflection"),
                u_tick: at.context("tick"),
                u_borderWidth: at.context("borderWidth"),
                u_displacementLength: at.context("displacementLength"),
                u_reflectionOpacity: at.context("reflectionOpacity"),
                u_scene: at.context("scene")
            },
            cull: {
                enable: !0,
                face: at.prop("cullFace")
            },
            depth: {
                enable: !0,
                mask: !1,
                func: "less"
            },
            blend: {
                enable: !0,
                func: {
                    srcRGB: "src alpha",
                    srcAlpha: 1,
                    dstRGB: "one minus src alpha",
                    dstAlpha: 1
                },
                equation: {
                    rgb: "add",
                    alpha: "add"
                },
                color: [0, 0, 0, 0]
            },
            elements: [
                [2, 1, 0],
                [2, 0, 3],
                [6, 5, 4],
                [6, 4, 7],
                [10, 9, 8],
                [10, 8, 11],
                [14, 13, 12],
                [14, 12, 15],
                [18, 17, 16],
                [18, 16, 19],
                [20, 21, 22],
                [23, 20, 22]
            ],
            count: 36,
            framebuffer: at.prop("fbo")
        }),
        mt = 1,
        ht = 2,
        vt = 3,
        bt = {
            BACK: "back",
            FRONT: "front"
        },
        gt = 1,
        yt = 2,
        xt = 3,
        wt = 4,
        _t = 5,
        kt = at.texture(),
        At = {
            translateX: 0,
            translateY: 0,
            translateZ: 0,
            rotation: 0,
            rotateX: 1,
            rotateY: 1,
            rotateZ: 1,
            scale: 1
        };
    tt((function(e) {
        var t = e.addFolder("Content");
        t.add(At, "translateX", -30, 30).step(.01), t.add(At, "translateY", -30, 30).step(.01), t.add(At, "translateZ", -30, 30).step(.01), t.add(At, "rotation", -5, 5).step(1e-4), t.add(At, "rotateX", 0, 10).step(.1), t.add(At, "rotateY", 0, 10).step(.1), t.add(At, "rotateZ", 0, 10).step(.1), t.add(At, "scale", 0, 10).step(.01)
    }));
    var Mt = at({
            frag: "precision mediump float;\n#define GLSLIFY 1\n\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\nuniform int u_maskId;\nuniform int u_typeId;\nuniform sampler2D u_displacement;\nuniform sampler2D u_mask;\nuniform float u_tick;\n\nvarying vec2 v_uv;\n\nconst float PI2 = 6.283185307179586;\n\nconst float PI = 3.141592653589793;\nconst float PI2_0 = 6.28318530718;\n\nmat2 scale(vec2 value) {\n  return mat2(value.x, 0.0, 0.0, value.y);\n}\n\nmat2 rotate2d(float value){\n  return mat2(cos(value), -sin(value), sin(value), cos(value));\n}\n\nvec3 gradient1(vec2 st, float tick) {\n  vec3 c1 = vec3(0.98, 0.71, 0.0);\n  vec3 c2 = vec3(0.95, 0.20, 0.14);\n  vec3 c3 = vec3(0.89, 0.12, 0.78);\n  vec3 c4 = vec3(0.30, 0.24, 0.96);\n\n  st.y = 1.0 - st.y;\n\n  vec2 toCenter = vec2(0.55, 0.58) - st;\n  float angle = atan(toCenter.y, toCenter.x) / PI;\n\n  vec3 colorA = mix(c1, c2, smoothstep(0.0, 0.5, angle));\n\n  st -= vec2(0.5);\n  st *= scale(vec2(1.4));\n  st *= rotate2d(-0.44);\n  st += vec2(0.5);\n\n  vec3 colorB = mix(c2, c3, smoothstep(0.3, 0.8, st.x));\n  colorB = mix(colorB, c4, smoothstep(0.55, 1.0, st.x));\n\n  return mix(colorA, colorB, smoothstep(0.28, 0.65, st.x));\n}\n\nvec3 gradient2(vec2 st, float tick) {\n  vec3 c1 = vec3(0.968, 0.991, 0.619);\n  vec3 c2 = vec3(0.968, 0.921, 0.619);\n\n  st -= vec2(0.5);\n  st *= scale(vec2(3.8));\n  st *= rotate2d(tick * PI);\n  st += vec2(0.5);\n\n  return mix(c1, c2, st.x);\n}\n\nvec3 gradient3(vec2 st, float tick) {\n  vec3 c1 = vec3(1.0, 0.5, 0.0);\n  vec3 c2 = vec3(0.0, 0.0, 1.0);\n\n  st -= vec2(0.5);\n  st *= scale(vec2(3.8));\n  st *= rotate2d(tick * PI);\n  st += vec2(0.5);\n\n  return mix(c1, c2, st.x);\n}\n\nvec3 gradients(int type, vec2 st, float tick) {\n  return gradient2(st, tick);\n//  if (type == 1) {\n//    return gradient1(st, tick);\n//  } else if (type == 2) {\n//    return gradient2(st, tick);\n//  } else if (type == 3) {\n//    return gradient3(st, tick);\n//  }\n}\n\nvoid main() {\n  vec2 st = gl_FragCoord.xy / u_resolution;\n\n  vec4 displacement = texture2D(u_displacement, st);\n  \n  vec2 direction = vec2(cos(displacement.r * PI2), sin(displacement.r * PI2));\n  float length = displacement.g;\n\n  vec2 newUv = v_uv;\n\n  newUv.x += (length * 0.07) * direction.x;\n  newUv.y += (length * 0.07) * direction.y;\n\n  vec4 texture = texture2D(u_texture, newUv);\n  float tick = u_tick * 0.009;\n\n  vec3 color = gradients(u_typeId, v_uv, tick);\n\n  texture.rgb = color + (texture.rgb * color);\n\n  vec4 mask = texture2D(u_mask, st);\n\n  int maskId = int(mask.r * 4.0 + mask.g * 2.0 + mask.b * 1.0);\n\n  if (maskId == u_maskId) {\n    gl_FragColor = vec4(texture.rgb, texture.a * mask.a);\n  } else {\n    discard;\n  }\n}",
            vert: "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 a_position;\nattribute vec2 a_uv;\n\nuniform mat4 u_projection;\nuniform mat4 u_view;\nuniform mat4 u_world;\n\nvarying vec2 v_uv;\n\nvoid main() {\n  v_uv = a_uv;\n\n  gl_Position = u_projection * u_view * u_world * vec4(a_position, 1);\n}",
            attributes: {
                a_position: [
                    [-1, -1, 0],
                    [1, -1, 0],
                    [1, 1, 0],
                    [-1, 1, 0]
                ],
                a_uv: [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            },
            uniforms: {
                u_texture: at.prop("texture"),
                u_typeId: at.prop("typeId"),
                u_maskId: at.prop("maskId")
            },
            depth: {
                enable: !0,
                mask: !1,
                func: "less"
            },
            blend: {
                enable: !0,
                func: {
                    srcRGB: "src alpha",
                    srcAlpha: 1,
                    dstRGB: "one minus src alpha",
                    dstAlpha: 1
                },
                equation: {
                    rgb: "add",
                    alpha: "add"
                },
                color: [0, 0, 0, 0]
            },
            elements: [0, 1, 2, 0, 2, 3],
            count: 6
        }),
        St = at({
            context: {
                world: function() {
                    var e = At.translateX,
                        t = At.translateY,
                        n = At.translateZ,
                        a = At.rotation,
                        i = At.rotateX,
                        o = At.rotateY,
                        u = At.rotateZ,
                        f = At.scale,
                        c = r.create();
                    return r.translate(c, c, [e, t, n]), r.rotate(c, c, a, [i, o, u]), r.scale(c, c, [f, f, f]), c
                },
                mask: function(e, t) {
                    return t.mask || kt
                },
                displacement: function(e, t) {
                    return t.displacement || kt
                }
            },
            uniforms: {
                u_world: at.context("world"),
                u_mask: at.context("mask"),
                u_displacement: at.context("displacement"),
                u_tick: at.context("tick")
            }
        }),
        Tt = 1,
        jt = 2,
        Et = 3,
        Ct = at({
            vert: "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 a_position;\n\nuniform mat4 u_textureMatrix;\nuniform mat4 u_world;\n\nvarying vec4 vUv;\n\nvoid main() {\n  vUv = u_textureMatrix * vec4(a_position, 1.0);\n\n  gl_Position = u_world * vec4(a_position, 1.0);\n}",
            frag: "precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D u_texture;\n\nvarying vec4 vUv;\n\nvoid main() {\n  gl_FragColor = texture2DProj(u_texture, vUv);\n}",
            attributes: {
                a_position: [
                    [-1, 1, 0],
                    [1, -1, 0],
                    [-1, -1, 0],
                    [-1, 1, 0],
                    [1, 1, 0],
                    [1, -1, 0]
                ]
            },
            context: {
                world: function(e, t) {
                    var n = t.uvRotation,
                        a = r.create();
                    return r.rotate(a, a, n, [0, 0, 1]), a
                }
            },
            uniforms: {
                u_world: at.context("world"),
                u_texture: at.prop("texture"),
                u_textureMatrix: at.prop("textureMatrix")
            },
            count: 6
        }),
        Ot = {
            depthOpacity: .25
        };
    tt((function(e) {
        e.addFolder("Reflector").add(Ot, "depthOpacity", 0, 1).step(.01)
    }));
    var Dt = at({
            frag: "precision mediump float;\n#define GLSLIFY 1\n\nuniform vec2 u_resolution;\nuniform sampler2D u_texture;\nuniform float u_depthOpacity;\n\nvarying vec2 v_uv;\nvarying float v_z;\n\nmat2 scale(vec2 scale){\n  return mat2(scale.x, 0.0, 0.0, scale.y);\n}\n\nvoid main() {\n  vec2 st = gl_FragCoord.xy / u_resolution;\n\n  vec4 texture = texture2D(u_texture, v_uv);\n\n  texture.a -= u_depthOpacity * v_z;\n\n  gl_FragColor = texture;\n}",
            vert: "precision mediump float;\n#define GLSLIFY 1\n\nattribute vec3 a_position;\nattribute vec2 a_uv;\n\nuniform mat4 u_projection;\nuniform mat4 u_view;\nuniform mat4 u_world;\nuniform vec2 u_viewport;\n\nvarying vec2 v_uv;\nvarying float v_z;\n\nvoid main() {\n  v_uv = a_uv;\n  v_z = 1.0 - (mat3(u_view) * mat3(u_world) * a_position).z;\n\n  gl_Position = u_projection * u_view * u_world * vec4(a_position, 1);\n}",
            context: {
                world: function(e, t) {
                    var n = e.viewportWidth,
                        a = e.viewportHeight,
                        i = t.cameraConfig,
                        o = t.fov * Math.PI / 180,
                        u = n / a,
                        f = Math.tan(o / 2) * i.eye[2],
                        c = f * u,
                        s = r.create();
                    return r.scale(s, s, [c, f, 1]), s
                },
                depthOpacity: function() {
                    var e = Ot.depthOpacity;
                    return e
                }
            },
            attributes: {
                a_position: [
                    [-1, -1, 0],
                    [1, -1, 0],
                    [1, 1, 0],
                    [-1, 1, 0]
                ],
                a_uv: [
                    [0, 0],
                    [1, 0],
                    [1, 1],
                    [0, 1]
                ]
            },
            uniforms: {
                u_world: at.context("world"),
                u_texture: at.prop("texture"),
                u_depthOpacity: at.context("depthOpacity")
            },
            depth: {
                enable: !0,
                mask: !1,
                func: "less"
            },
            blend: {
                enable: !0,
                func: {
                    srcRGB: "src alpha",
                    srcAlpha: 1,
                    dstRGB: "one minus src alpha",
                    dstAlpha: 1
                },
                equation: {
                    rgb: "add",
                    alpha: "add"
                },
                color: [0, 0, 0, 0]
            },
            elements: [0, 1, 2, 0, 2, 3],
            count: 6
        }),
        Ft = [{
            position: [1, 0, 0],
            normal: [1, 0, 0],
            rotation: .5 * -Math.PI,
            axis: [0, 1, 0],
            uvRotation: Math.PI
        }, {
            position: [-1, 0, 0],
            normal: [-1, 0, 0],
            rotation: .5 * Math.PI,
            axis: [0, 1, 0],
            uvRotation: Math.PI
        }, {
            position: [0, 1, 0],
            normal: [0, 1, 0],
            rotation: .5 * Math.PI,
            axis: [1, 0, 0],
            uvRotation: 0
        }, {
            position: [0, -1, 0],
            normal: [0, -1, 0],
            rotation: .5 * -Math.PI,
            axis: [1, 0, 0],
            uvRotation: 0
        }, {
            position: [0, 0, 1],
            normal: [0, 0, 1],
            rotation: Math.PI,
            axis: [0, 1, 0],
            uvRotation: Math.PI
        }, {
            position: [0, 0, -1],
            normal: [0, 0, -1],
            rotation: 0,
            axis: [0, 1, 0],
            uvRotation: Math.PI
        }],
        It = at.framebuffer(),
        Pt = function(e, t) {
            var n = new Array(3);
            return n.fill(2 * a.dot(t, e)), a.sub([], e, a.mul([], n, t))
        },
        Rt = at({
            context: {
                config: function(e, t, n) {
                    var i = t.cameraConfig,
                        o = t.rotationMatrix,
                        u = Ft[n],
                        f = u.position,
                        c = u.normal,
                        s = u.rotation,
                        l = u.axis,
                        d = r.translate([], o, f),
                        p = r.translate([], o, c);
                    r.rotate(d, d, s, l);
                    var m = r.getTranslation([], d),
                        h = r.getTranslation([], p),
                        v = i.eye,
                        b = [0, 0, 0];
                    a.sub(b, m, v), b = Pt(b, h), a.negate(b, b), a.add(b, b, m);
                    var g = [0, 0, -1];
                    a.add(g, g, v);
                    var y = [0, 0, 0];
                    a.sub(y, m, g), y = Pt(y, h), a.negate(y, y), a.add(y, y, m);
                    var x = [0, 1, 0];
                    return {
                        cameraConfig: {
                            eye: b,
                            target: y,
                            up: x = Pt(x, h)
                        },
                        planeMatrix: d
                    }
                },
                uvRotation: function(e, t, n) {
                    var r = Ft[n].uvRotation;
                    return r
                },
                faceFbo: function(e, t, n) {
                    return t.reflectionFbo.faces[n]
                }
            }
        }),
        zt = (n(16), {
            cameraX: 0,
            cameraY: 0,
            cameraZ: 5.7,
            rotation: 4.8,
            rotateX: 1,
            rotateY: 1,
            rotateZ: 1,
            velocity: .009
        });
    tt((function(e) {
        var t = e.addFolder("Main");
        t.add(zt, "cameraX", -20, 20).step(.1), t.add(zt, "cameraY", -20, 20).step(.1), t.add(zt, "cameraZ", -20, 20).step(.1), t.add(zt, "rotation", -5, 5).step(1e-4), t.add(zt, "rotateX", 0, 10).step(.1), t.add(zt, "rotateY", 0, 10).step(.1), t.add(zt, "rotateZ", 0, 10).step(.1), t.add(zt, "velocity", 0, .05).step(1e-4)
    }));
    var Bt, Lt = at.framebuffer(),
        Ut = at.framebuffer(),
        Nt = at.framebuffer(),
        Wt = at.framebufferCube(1024),
        qt = [{
            texture: nt(at, "logo.png"),
            typeId: Tt,
            maskId: gt
        }, {
            texture: nt(at, "logo.png"),
            typeId: jt,
            maskId: yt
        }, {
            texture: nt(at, "text-1.png"),
            typeId: Et,
            maskId: xt
        }, {
            texture: nt(at, "text-1.png"),
            typeId: jt,
            maskId: wt
        }, {
            texture: nt(at, "text-1.png"),
            typeId: Et,
            maskId: _t
        }];
    Bt = function(e) {
        var t = e.viewportWidth,
            n = e.viewportHeight,
            a = e.tick;
        Ze();
        var i = zt.rotation,
            o = zt.rotateX,
            u = zt.rotateY,
            f = zt.rotateZ,
            c = zt.velocity,
            s = zt.cameraX,
            l = zt.cameraY,
            d = zt.cameraZ;
        Lt.resize(t, n), Ut.resize(t, n), Nt.resize(t, n);
        var p = a * c,
            m = r.create();
        r.rotate(m, m, i, [o, u, f]), r.rotate(m, m, p, [Math.cos(p), Math.sin(p), .5]);
        var h = {
            eye: [s, l, d],
            target: [0, 0, 0]
        };
        at.clear({
                color: [0, 0, 0, 0],
                depth: 1
            }), ut(h, (function() {
                pt([{
                    fbo: Lt,
                    cullFace: bt.BACK,
                    typeId: mt,
                    matrix: m
                }, {
                    fbo: Ut,
                    cullFace: bt.BACK,
                    typeId: ht,
                    matrix: m
                }]), Nt.use((function() {
                    St({
                        textures: qt,
                        displacement: Lt,
                        mask: Ut
                    }, (function(e, t) {
                        var n = t.textures;
                        at.clear({
                            color: [0, 0, 0, 0],
                            depth: 1
                        }), Mt(n)
                    }))
                }))
            })),
            function(e) {
                var t = e.reflectionFbo,
                    n = e.cameraConfig,
                    a = e.rotationMatrix,
                    i = e.texture,
                    o = new Array(6);
                o.fill({
                    reflectionFbo: t,
                    cameraConfig: n,
                    rotationMatrix: a
                }), Rt(o, (function(e) {
                    var t = e.viewportWidth,
                        a = e.viewportHeight,
                        o = e.config,
                        u = e.uvRotation,
                        f = e.faceFbo,
                        c = r.fromValues(.5, 0, 0, 0, 0, .5, 0, 0, 0, 0, .5, 0, .5, .5, .5, 1);
                    It.resize(t, a), It.use((function() {
                        at.clear({
                            color: [0, 0, 0, 0],
                            depth: 1
                        }), ut(o.cameraConfig, (function(e) {
                            var t = e.projection,
                                a = e.view,
                                u = e.fov;
                            r.multiply(c, c, t), r.mul(c, c, a), r.mul(c, c, o.planeMatrix), Dt({
                                texture: i,
                                cameraConfig: n,
                                fov: u
                            })
                        }))
                    })), f.use((function() {
                        at.clear({
                            color: [0, 0, 0, 0],
                            depth: 1
                        }), Ct({
                            texture: It,
                            textureMatrix: c,
                            uvRotation: u
                        })
                    }))
                }))
            }({
                reflectionFbo: Wt,
                cameraConfig: h,
                rotationMatrix: m,
                texture: Nt
            }), ut(h, (function() {
                pt([{
                    cullFace: bt.FRONT,
                    typeId: vt,
                    reflection: Wt,
                    matrix: m
                }, {
                    cullFace: bt.BACK,
                    typeId: vt,
                    texture: Nt,
                    matrix: m
                }])
            })), $e()
    }, et || (et = at.frame(Bt))
}]);
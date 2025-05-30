/*! @dotburo/multi-select 1.3.0 | dotburo <code@dotburo.org> (https://dotburo.org) !*/
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = t || self).MultiSelect = e());
})(this, function () {
  "use strict";
  function t(e) {
    return (t =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(e);
  }
  function e(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(t, r.key, r);
    }
  }
  function r(t, e, r) {
    return e && n(t.prototype, e), r && n(t, r), t;
  }
  function o(t, e, n) {
    return (
      e in t
        ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0,
          })
        : (t[e] = n),
      t
    );
  }
  function i(t) {
    return (i = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function u(t, e) {
    return (u =
      Object.setPrototypeOf ||
      function (t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function c() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        Date.prototype.toString.call(
          Reflect.construct(Date, [], function () {})
        ),
        !0
      );
    } catch (t) {
      return !1;
    }
  }
  function s(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e)
      ? (function (t) {
          if (void 0 === t)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return t;
        })(t)
      : e;
  }
  var a = function (t) {
      return "object" == typeof t ? null !== t : "function" == typeof t;
    },
    f = function (t) {
      if (!a(t)) throw TypeError(t + " is not an object!");
      return t;
    },
    l = function (t) {
      try {
        return !!t();
      } catch (t) {
        return !0;
      }
    },
    p = !l(function () {
      return (
        7 !=
        Object.defineProperty({}, "a", {
          get: function () {
            return 7;
          },
        }).a
      );
    });
  function h(t, e) {
    return t((e = { exports: {} }), e.exports), e.exports;
  }
  var v,
    d = h(function (t) {
      var e = (t.exports =
        "undefined" != typeof window && window.Math == Math
          ? window
          : "undefined" != typeof self && self.Math == Math
          ? self
          : Function("return this")());
      "number" == typeof __g && (__g = e);
    }),
    y = d.document,
    g = a(y) && a(y.createElement),
    m = function (t) {
      return g ? y.createElement(t) : {};
    },
    _ =
      !p &&
      !l(function () {
        return (
          7 !=
          Object.defineProperty(m("div"), "a", {
            get: function () {
              return 7;
            },
          }).a
        );
      }),
    b = function (t, e) {
      if (!a(t)) return t;
      var n, r;
      if (e && "function" == typeof (n = t.toString) && !a((r = n.call(t))))
        return r;
      if ("function" == typeof (n = t.valueOf) && !a((r = n.call(t)))) return r;
      if (!e && "function" == typeof (n = t.toString) && !a((r = n.call(t))))
        return r;
      throw TypeError("Can't convert object to primitive value");
    },
    E = Object.defineProperty,
    S = {
      f: p
        ? Object.defineProperty
        : function (t, e, n) {
            if ((f(t), (e = b(e, !0)), f(n), _))
              try {
                return E(t, e, n);
              } catch (t) {}
            if ("get" in n || "set" in n)
              throw TypeError("Accessors not supported!");
            return "value" in n && (t[e] = n.value), t;
          },
    },
    k = {}.hasOwnProperty,
    w = function (t, e) {
      return k.call(t, e);
    },
    x = {}.toString,
    O = function (t) {
      return x.call(t).slice(8, -1);
    },
    j = Object("z").propertyIsEnumerable(0)
      ? Object
      : function (t) {
          return "String" == O(t) ? t.split("") : Object(t);
        },
    L = function (t) {
      if (null == t) throw TypeError("Can't call method on  " + t);
      return t;
    },
    A = function (t) {
      return j(L(t));
    },
    T = Math.ceil,
    M = Math.floor,
    P = function (t) {
      return isNaN((t = +t)) ? 0 : (t > 0 ? M : T)(t);
    },
    I = Math.min,
    C = function (t) {
      return t > 0 ? I(P(t), 9007199254740991) : 0;
    },
    R = Math.max,
    F = Math.min,
    D = h(function (t) {
      var e = (t.exports = { version: "2.6.11" });
      "number" == typeof __e && (__e = e);
    }),
    N =
      (D.version,
      h(function (t) {
        var e = d["__core-js_shared__"] || (d["__core-js_shared__"] = {});
        (t.exports = function (t, n) {
          return e[t] || (e[t] = void 0 !== n ? n : {});
        })("versions", []).push({
          version: D.version,
          mode: "global",
          copyright: "© 2019 Denis Pushkarev (zloirock.ru)",
        });
      })),
    G = 0,
    H = Math.random(),
    z = function (t) {
      return "Symbol(".concat(
        void 0 === t ? "" : t,
        ")_",
        (++G + H).toString(36)
      );
    },
    $ = N("keys"),
    V = function (t) {
      return $[t] || ($[t] = z(t));
    },
    K =
      ((v = !1),
      function (t, e, n) {
        var r,
          o = A(t),
          i = C(o.length),
          u = (function (t, e) {
            return (t = P(t)) < 0 ? R(t + e, 0) : F(t, e);
          })(n, i);
        if (v && e != e) {
          for (; i > u; ) if ((r = o[u++]) != r) return !0;
        } else
          for (; i > u; u++)
            if ((v || u in o) && o[u] === e) return v || u || 0;
        return !v && -1;
      }),
    W = V("IE_PROTO"),
    q = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(
      ","
    ),
    B =
      Object.keys ||
      function (t) {
        return (function (t, e) {
          var n,
            r = A(t),
            o = 0,
            i = [];
          for (n in r) n != W && w(r, n) && i.push(n);
          for (; e.length > o; ) w(r, (n = e[o++])) && (~K(i, n) || i.push(n));
          return i;
        })(t, q);
      },
    U = p
      ? Object.defineProperties
      : function (t, e) {
          f(t);
          for (var n, r = B(e), o = r.length, i = 0; o > i; )
            S.f(t, (n = r[i++]), e[n]);
          return t;
        },
    X = d.document,
    Y = X && X.documentElement,
    J = V("IE_PROTO"),
    Q = function () {},
    Z = function () {
      var t,
        e = m("iframe"),
        n = q.length;
      for (
        e.style.display = "none",
          Y.appendChild(e),
          e.src = "javascript:",
          (t = e.contentWindow.document).open(),
          t.write("<script>document.F=Object</script>"),
          t.close(),
          Z = t.F;
        n--;

      )
        delete Z.prototype[q[n]];
      return Z();
    },
    tt =
      Object.create ||
      function (t, e) {
        var n;
        return (
          null !== t
            ? ((Q.prototype = f(t)),
              (n = new Q()),
              (Q.prototype = null),
              (n[J] = t))
            : (n = Z()),
          void 0 === e ? n : U(n, e)
        );
      },
    et = function (t, e) {
      return {
        enumerable: !(1 & t),
        configurable: !(2 & t),
        writable: !(4 & t),
        value: e,
      };
    },
    nt = p
      ? function (t, e, n) {
          return S.f(t, e, et(1, n));
        }
      : function (t, e, n) {
          return (t[e] = n), t;
        },
    rt = N("native-function-to-string", Function.toString),
    ot = h(function (t) {
      var e = z("src"),
        n = ("" + rt).split("toString");
      (D.inspectSource = function (t) {
        return rt.call(t);
      }),
        (t.exports = function (t, r, o, i) {
          var u = "function" == typeof o;
          u && (w(o, "name") || nt(o, "name", r)),
            t[r] !== o &&
              (u && (w(o, e) || nt(o, e, t[r] ? "" + t[r] : n.join(String(r)))),
              t === d
                ? (t[r] = o)
                : i
                ? t[r]
                  ? (t[r] = o)
                  : nt(t, r, o)
                : (delete t[r], nt(t, r, o)));
        })(Function.prototype, "toString", function () {
          return ("function" == typeof this && this[e]) || rt.call(this);
        });
    }),
    it = function (t, e, n) {
      for (var r in e) ot(t, r, e[r], n);
      return t;
    },
    ut = function (t, e, n) {
      if (
        ((function (t) {
          if ("function" != typeof t)
            throw TypeError(t + " is not a function!");
        })(t),
        void 0 === e)
      )
        return t;
      switch (n) {
        case 1:
          return function (n) {
            return t.call(e, n);
          };
        case 2:
          return function (n, r) {
            return t.call(e, n, r);
          };
        case 3:
          return function (n, r, o) {
            return t.call(e, n, r, o);
          };
      }
      return function () {
        return t.apply(e, arguments);
      };
    },
    ct = function (t, e, n, r) {
      if (!(t instanceof e) || (void 0 !== r && r in t))
        throw TypeError(n + ": incorrect invocation!");
      return t;
    },
    st = function (t, e, n, r) {
      try {
        return r ? e(f(n)[0], n[1]) : e(n);
      } catch (e) {
        var o = t.return;
        throw (void 0 !== o && f(o.call(t)), e);
      }
    },
    at = {},
    ft = h(function (t) {
      var e = N("wks"),
        n = d.Symbol,
        r = "function" == typeof n;
      (t.exports = function (t) {
        return e[t] || (e[t] = (r && n[t]) || (r ? n : z)("Symbol." + t));
      }).store = e;
    }),
    lt = ft("iterator"),
    pt = Array.prototype,
    ht = function (t) {
      return void 0 !== t && (at.Array === t || pt[lt] === t);
    },
    vt = ft("toStringTag"),
    dt =
      "Arguments" ==
      O(
        (function () {
          return arguments;
        })()
      ),
    yt = function (t) {
      var e, n, r;
      return void 0 === t
        ? "Undefined"
        : null === t
        ? "Null"
        : "string" ==
          typeof (n = (function (t, e) {
            try {
              return t[e];
            } catch (t) {}
          })((e = Object(t)), vt))
        ? n
        : dt
        ? O(e)
        : "Object" == (r = O(e)) && "function" == typeof e.callee
        ? "Arguments"
        : r;
    },
    gt = ft("iterator"),
    mt = (D.getIteratorMethod = function (t) {
      if (null != t) return t[gt] || t["@@iterator"] || at[yt(t)];
    }),
    _t = h(function (t) {
      var e = {},
        n = {},
        r = (t.exports = function (t, r, o, i, u) {
          var c,
            s,
            a,
            l,
            p = u
              ? function () {
                  return t;
                }
              : mt(t),
            h = ut(o, i, r ? 2 : 1),
            v = 0;
          if ("function" != typeof p) throw TypeError(t + " is not iterable!");
          if (ht(p)) {
            for (c = C(t.length); c > v; v++)
              if (
                (l = r ? h(f((s = t[v]))[0], s[1]) : h(t[v])) === e ||
                l === n
              )
                return l;
          } else
            for (a = p.call(t); !(s = a.next()).done; )
              if ((l = st(a, h, s.value, r)) === e || l === n) return l;
        });
      (r.BREAK = e), (r.RETURN = n);
    }),
    bt = function (t, e, n) {
      var r,
        o,
        i,
        u,
        c = t & bt.F,
        s = t & bt.G,
        a = t & bt.S,
        f = t & bt.P,
        l = t & bt.B,
        p = s ? d : a ? d[e] || (d[e] = {}) : (d[e] || {}).prototype,
        h = s ? D : D[e] || (D[e] = {}),
        v = h.prototype || (h.prototype = {});
      for (r in (s && (n = e), n))
        (i = ((o = !c && p && void 0 !== p[r]) ? p : n)[r]),
          (u =
            l && o
              ? ut(i, d)
              : f && "function" == typeof i
              ? ut(Function.call, i)
              : i),
          p && ot(p, r, i, t & bt.U),
          h[r] != i && nt(h, r, u),
          f && v[r] != i && (v[r] = i);
    };
  (d.core = D),
    (bt.F = 1),
    (bt.G = 2),
    (bt.S = 4),
    (bt.P = 8),
    (bt.B = 16),
    (bt.W = 32),
    (bt.U = 64),
    (bt.R = 128);
  var Et = bt,
    St = S.f,
    kt = ft("toStringTag"),
    wt = function (t, e, n) {
      t &&
        !w((t = n ? t : t.prototype), kt) &&
        St(t, kt, { configurable: !0, value: e });
    },
    xt = {};
  nt(xt, ft("iterator"), function () {
    return this;
  });
  var Ot = function (t, e, n) {
      (t.prototype = tt(xt, { next: et(1, n) })), wt(t, e + " Iterator");
    },
    jt = function (t) {
      return Object(L(t));
    },
    Lt = V("IE_PROTO"),
    At = Object.prototype,
    Tt =
      Object.getPrototypeOf ||
      function (t) {
        return (
          (t = jt(t)),
          w(t, Lt)
            ? t[Lt]
            : "function" == typeof t.constructor && t instanceof t.constructor
            ? t.constructor.prototype
            : t instanceof Object
            ? At
            : null
        );
      },
    Mt = ft("iterator"),
    Pt = !([].keys && "next" in [].keys()),
    It = function () {
      return this;
    },
    Ct = function (t, e, n, r, o, i, u) {
      Ot(n, e, r);
      var c,
        s,
        a,
        f = function (t) {
          if (!Pt && t in v) return v[t];
          switch (t) {
            case "keys":
            case "values":
              return function () {
                return new n(this, t);
              };
          }
          return function () {
            return new n(this, t);
          };
        },
        l = e + " Iterator",
        p = "values" == o,
        h = !1,
        v = t.prototype,
        d = v[Mt] || v["@@iterator"] || (o && v[o]),
        y = d || f(o),
        g = o ? (p ? f("entries") : y) : void 0,
        m = ("Array" == e && v.entries) || d;
      if (
        (m &&
          (a = Tt(m.call(new t()))) !== Object.prototype &&
          a.next &&
          (wt(a, l, !0), "function" != typeof a[Mt] && nt(a, Mt, It)),
        p &&
          d &&
          "values" !== d.name &&
          ((h = !0),
          (y = function () {
            return d.call(this);
          })),
        (Pt || h || !v[Mt]) && nt(v, Mt, y),
        (at[e] = y),
        (at[l] = It),
        o)
      )
        if (
          ((c = {
            values: p ? y : f("values"),
            keys: i ? y : f("keys"),
            entries: g,
          }),
          u)
        )
          for (s in c) s in v || ot(v, s, c[s]);
        else Et(Et.P + Et.F * (Pt || h), e, c);
      return c;
    },
    Rt = function (t, e) {
      return { value: e, done: !!t };
    },
    Ft = ft("species"),
    Dt = h(function (t) {
      var e = z("meta"),
        n = S.f,
        r = 0,
        o =
          Object.isExtensible ||
          function () {
            return !0;
          },
        i = !l(function () {
          return o(Object.preventExtensions({}));
        }),
        u = function (t) {
          n(t, e, { value: { i: "O" + ++r, w: {} } });
        },
        c = (t.exports = {
          KEY: e,
          NEED: !1,
          fastKey: function (t, n) {
            if (!a(t))
              return "symbol" == typeof t
                ? t
                : ("string" == typeof t ? "S" : "P") + t;
            if (!w(t, e)) {
              if (!o(t)) return "F";
              if (!n) return "E";
              u(t);
            }
            return t[e].i;
          },
          getWeak: function (t, n) {
            if (!w(t, e)) {
              if (!o(t)) return !0;
              if (!n) return !1;
              u(t);
            }
            return t[e].w;
          },
          onFreeze: function (t) {
            return i && c.NEED && o(t) && !w(t, e) && u(t), t;
          },
        });
    }),
    Nt =
      (Dt.KEY,
      Dt.NEED,
      Dt.fastKey,
      Dt.getWeak,
      Dt.onFreeze,
      function (t, e) {
        if (!a(t) || t._t !== e)
          throw TypeError("Incompatible receiver, " + e + " required!");
        return t;
      }),
    Gt = S.f,
    Ht = Dt.fastKey,
    zt = p ? "_s" : "size",
    $t = function (t, e) {
      var n,
        r = Ht(e);
      if ("F" !== r) return t._i[r];
      for (n = t._f; n; n = n.n) if (n.k == e) return n;
    },
    Vt = {
      getConstructor: function (t, e, n, r) {
        var o = t(function (t, i) {
          ct(t, o, e, "_i"),
            (t._t = e),
            (t._i = tt(null)),
            (t._f = void 0),
            (t._l = void 0),
            (t[zt] = 0),
            null != i && _t(i, n, t[r], t);
        });
        return (
          it(o.prototype, {
            clear: function () {
              for (var t = Nt(this, e), n = t._i, r = t._f; r; r = r.n)
                (r.r = !0), r.p && (r.p = r.p.n = void 0), delete n[r.i];
              (t._f = t._l = void 0), (t[zt] = 0);
            },
            delete: function (t) {
              var n = Nt(this, e),
                r = $t(n, t);
              if (r) {
                var o = r.n,
                  i = r.p;
                delete n._i[r.i],
                  (r.r = !0),
                  i && (i.n = o),
                  o && (o.p = i),
                  n._f == r && (n._f = o),
                  n._l == r && (n._l = i),
                  n[zt]--;
              }
              return !!r;
            },
            forEach: function (t) {
              Nt(this, e);
              for (
                var n,
                  r = ut(t, arguments.length > 1 ? arguments[1] : void 0, 3);
                (n = n ? n.n : this._f);

              )
                for (r(n.v, n.k, this); n && n.r; ) n = n.p;
            },
            has: function (t) {
              return !!$t(Nt(this, e), t);
            },
          }),
          p &&
            Gt(o.prototype, "size", {
              get: function () {
                return Nt(this, e)[zt];
              },
            }),
          o
        );
      },
      def: function (t, e, n) {
        var r,
          o,
          i = $t(t, e);
        return (
          i
            ? (i.v = n)
            : ((t._l = i = {
                i: (o = Ht(e, !0)),
                k: e,
                v: n,
                p: (r = t._l),
                n: void 0,
                r: !1,
              }),
              t._f || (t._f = i),
              r && (r.n = i),
              t[zt]++,
              "F" !== o && (t._i[o] = i)),
          t
        );
      },
      getEntry: $t,
      setStrong: function (t, e, n) {
        Ct(
          t,
          e,
          function (t, n) {
            (this._t = Nt(t, e)), (this._k = n), (this._l = void 0);
          },
          function () {
            for (var t = this._k, e = this._l; e && e.r; ) e = e.p;
            return this._t && (this._l = e = e ? e.n : this._t._f)
              ? Rt(0, "keys" == t ? e.k : "values" == t ? e.v : [e.k, e.v])
              : ((this._t = void 0), Rt(1));
          },
          n ? "entries" : "values",
          !n,
          !0
        ),
          (function (t) {
            var e = d[t];
            p &&
              e &&
              !e[Ft] &&
              S.f(e, Ft, {
                configurable: !0,
                get: function () {
                  return this;
                },
              });
          })(e);
      },
    },
    Kt = ft("iterator"),
    Wt = !1;
  try {
    var qt = [7][Kt]();
    (qt.return = function () {
      Wt = !0;
    }),
      Array.from(qt, function () {
        throw 2;
      });
  } catch (t) {}
  var Bt,
    Ut,
    Xt = function (t, e) {
      if (!e && !Wt) return !1;
      var n = !1;
      try {
        var r = [7],
          o = r[Kt]();
        (o.next = function () {
          return { done: (n = !0) };
        }),
          (r[Kt] = function () {
            return o;
          }),
          t(r);
      } catch (t) {}
      return n;
    },
    Yt = { f: {}.propertyIsEnumerable },
    Jt = Object.getOwnPropertyDescriptor,
    Qt = {
      f: p
        ? Jt
        : function (t, e) {
            if (((t = A(t)), (e = b(e, !0)), _))
              try {
                return Jt(t, e);
              } catch (t) {}
            if (w(t, e)) return et(!Yt.f.call(t, e), t[e]);
          },
    },
    Zt = function (t, e) {
      if ((f(t), !a(e) && null !== e))
        throw TypeError(e + ": can't set as prototype!");
    },
    te = {
      set:
        Object.setPrototypeOf ||
        ("__proto__" in {}
          ? (function (t, e, n) {
              try {
                (n = ut(
                  Function.call,
                  Qt.f(Object.prototype, "__proto__").set,
                  2
                ))(t, []),
                  (e = !(t instanceof Array));
              } catch (t) {
                e = !0;
              }
              return function (t, r) {
                return Zt(t, r), e ? (t.__proto__ = r) : n(t, r), t;
              };
            })({}, !1)
          : void 0),
      check: Zt,
    }.set,
    ee =
      ((function (t, e, n, r, o, i) {
        var u = d[t],
          c = u,
          s = o ? "set" : "add",
          f = c && c.prototype,
          p = {},
          h = function (t) {
            var e = f[t];
            ot(
              f,
              t,
              "delete" == t || "has" == t
                ? function (t) {
                    return !(i && !a(t)) && e.call(this, 0 === t ? 0 : t);
                  }
                : "get" == t
                ? function (t) {
                    return i && !a(t) ? void 0 : e.call(this, 0 === t ? 0 : t);
                  }
                : "add" == t
                ? function (t) {
                    return e.call(this, 0 === t ? 0 : t), this;
                  }
                : function (t, n) {
                    return e.call(this, 0 === t ? 0 : t, n), this;
                  }
            );
          };
        if (
          "function" == typeof c &&
          (i ||
            (f.forEach &&
              !l(function () {
                new c().entries().next();
              })))
        ) {
          var v = new c(),
            y = v[s](i ? {} : -0, 1) != v,
            g = l(function () {
              v.has(1);
            }),
            m = Xt(function (t) {
              new c(t);
            }),
            _ =
              !i &&
              l(function () {
                for (var t = new c(), e = 5; e--; ) t[s](e, e);
                return !t.has(-0);
              });
          m ||
            (((c = e(function (e, n) {
              ct(e, c, t);
              var r = (function (t, e, n) {
                var r,
                  o = e.constructor;
                return (
                  o !== n &&
                    "function" == typeof o &&
                    (r = o.prototype) !== n.prototype &&
                    a(r) &&
                    te &&
                    te(t, r),
                  t
                );
              })(new u(), e, c);
              return null != n && _t(n, o, r[s], r), r;
            })).prototype = f),
            (f.constructor = c)),
            (g || _) && (h("delete"), h("has"), o && h("get")),
            (_ || y) && h(s),
            i && f.clear && delete f.clear;
        } else
          (c = r.getConstructor(e, t, o, s)),
            it(c.prototype, n),
            (Dt.NEED = !0);
        wt(c, t),
          (p[t] = c),
          Et(Et.G + Et.W + Et.F * (c != u), p),
          i || r.setStrong(c, t, o);
      })(
        "Map",
        function (t) {
          return function () {
            return t(this, arguments.length > 0 ? arguments[0] : void 0);
          };
        },
        {
          get: function (t) {
            var e = Vt.getEntry(Nt(this, "Map"), t);
            return e && e.v;
          },
          set: function (t, e) {
            return Vt.def(Nt(this, "Map"), 0 === t ? 0 : t, e);
          },
        },
        Vt,
        !0
      ),
      function (t) {
        return function (e, n) {
          var r,
            o,
            i = String(L(e)),
            u = P(n),
            c = i.length;
          return u < 0 || u >= c
            ? t
              ? ""
              : void 0
            : (r = i.charCodeAt(u)) < 55296 ||
              r > 56319 ||
              u + 1 === c ||
              (o = i.charCodeAt(u + 1)) < 56320 ||
              o > 57343
            ? t
              ? i.charAt(u)
              : r
            : t
            ? i.slice(u, u + 2)
            : o - 56320 + ((r - 55296) << 10) + 65536;
        };
      }),
    ne = ee(!0),
    re = function (t, e, n) {
      return e + (n ? ne(t, e).length : 1);
    },
    oe = RegExp.prototype.exec,
    ie = function (t, e) {
      var n = t.exec;
      if ("function" == typeof n) {
        var r = n.call(t, e);
        if ("object" != typeof r)
          throw new TypeError(
            "RegExp exec method returned something other than an Object or null"
          );
        return r;
      }
      if ("RegExp" !== yt(t))
        throw new TypeError("RegExp#exec called on incompatible receiver");
      return oe.call(t, e);
    },
    ue = function () {
      var t = f(this),
        e = "";
      return (
        t.global && (e += "g"),
        t.ignoreCase && (e += "i"),
        t.multiline && (e += "m"),
        t.unicode && (e += "u"),
        t.sticky && (e += "y"),
        e
      );
    },
    ce = RegExp.prototype.exec,
    se = String.prototype.replace,
    ae = ce,
    fe =
      ((Bt = /a/),
      (Ut = /b*/g),
      ce.call(Bt, "a"),
      ce.call(Ut, "a"),
      0 !== Bt.lastIndex || 0 !== Ut.lastIndex),
    le = void 0 !== /()??/.exec("")[1];
  (fe || le) &&
    (ae = function (t) {
      var e,
        n,
        r,
        o,
        i = this;
      return (
        le && (n = new RegExp("^" + i.source + "$(?!\\s)", ue.call(i))),
        fe && (e = i.lastIndex),
        (r = ce.call(i, t)),
        fe && r && (i.lastIndex = i.global ? r.index + r[0].length : e),
        le &&
          r &&
          r.length > 1 &&
          se.call(r[0], n, function () {
            for (o = 1; o < arguments.length - 2; o++)
              void 0 === arguments[o] && (r[o] = void 0);
          }),
        r
      );
    });
  var pe = ae;
  Et({ target: "RegExp", proto: !0, forced: pe !== /./.exec }, { exec: pe });
  var he = ft("species"),
    ve = !l(function () {
      var t = /./;
      return (
        (t.exec = function () {
          var t = [];
          return (t.groups = { a: "7" }), t;
        }),
        "7" !== "".replace(t, "$<a>")
      );
    }),
    de = (function () {
      var t = /(?:)/,
        e = t.exec;
      t.exec = function () {
        return e.apply(this, arguments);
      };
      var n = "ab".split(t);
      return 2 === n.length && "a" === n[0] && "b" === n[1];
    })(),
    ye = Math.max,
    ge = Math.min,
    me = Math.floor,
    _e = /\$([$&`']|\d\d?|<[^>]*>)/g,
    be = /\$([$&`']|\d\d?)/g;
  !(function (t, e, n) {
    var r = ft(t),
      o = !l(function () {
        var e = {};
        return (
          (e[r] = function () {
            return 7;
          }),
          7 != ""[t](e)
        );
      }),
      i = o
        ? !l(function () {
            var e = !1,
              n = /a/;
            return (
              (n.exec = function () {
                return (e = !0), null;
              }),
              "split" === t &&
                ((n.constructor = {}),
                (n.constructor[he] = function () {
                  return n;
                })),
              n[r](""),
              !e
            );
          })
        : void 0;
    if (!o || !i || ("replace" === t && !ve) || ("split" === t && !de)) {
      var u = /./[r],
        c = n(L, r, ""[t], function (t, e, n, r, i) {
          return e.exec === pe
            ? o && !i
              ? { done: !0, value: u.call(e, n, r) }
              : { done: !0, value: t.call(n, e, r) }
            : { done: !1 };
        }),
        s = c[0],
        a = c[1];
      ot(String.prototype, t, s),
        nt(
          RegExp.prototype,
          r,
          2 == e
            ? function (t, e) {
                return a.call(t, this, e);
              }
            : function (t) {
                return a.call(t, this);
              }
        );
    }
  })("replace", 2, function (t, e, n, r) {
    return [
      function (r, o) {
        var i = t(this),
          u = null == r ? void 0 : r[e];
        return void 0 !== u ? u.call(r, i, o) : n.call(String(i), r, o);
      },
      function (t, e) {
        var i = r(n, t, this, e);
        if (i.done) return i.value;
        var u = f(t),
          c = String(this),
          s = "function" == typeof e;
        s || (e = String(e));
        var a = u.global;
        if (a) {
          var l = u.unicode;
          u.lastIndex = 0;
        }
        for (var p = []; ; ) {
          var h = ie(u, c);
          if (null === h) break;
          if ((p.push(h), !a)) break;
          "" === String(h[0]) && (u.lastIndex = re(c, C(u.lastIndex), l));
        }
        for (var v, d = "", y = 0, g = 0; g < p.length; g++) {
          h = p[g];
          for (
            var m = String(h[0]),
              _ = ye(ge(P(h.index), c.length), 0),
              b = [],
              E = 1;
            E < h.length;
            E++
          )
            b.push(void 0 === (v = h[E]) ? v : String(v));
          var S = h.groups;
          if (s) {
            var k = [m].concat(b, _, c);
            void 0 !== S && k.push(S);
            var w = String(e.apply(void 0, k));
          } else w = o(m, c, _, b, S, e);
          _ >= y && ((d += c.slice(y, _) + w), (y = _ + m.length));
        }
        return d + c.slice(y);
      },
    ];
    function o(t, e, r, o, i, u) {
      var c = r + t.length,
        s = o.length,
        a = be;
      return (
        void 0 !== i && ((i = jt(i)), (a = _e)),
        n.call(u, a, function (n, u) {
          var a;
          switch (u.charAt(0)) {
            case "$":
              return "$";
            case "&":
              return t;
            case "`":
              return e.slice(0, r);
            case "'":
              return e.slice(c);
            case "<":
              a = i[u.slice(1, -1)];
              break;
            default:
              var f = +u;
              if (0 === f) return n;
              if (f > s) {
                var l = me(f / 10);
                return 0 === l
                  ? n
                  : l <= s
                  ? void 0 === o[l - 1]
                    ? u.charAt(1)
                    : o[l - 1] + u.charAt(1)
                  : n;
              }
              a = o[f - 1];
          }
          return void 0 === a ? "" : a;
        })
      );
    }
  });
  var Ee =
      Array.isArray ||
      function (t) {
        return "Array" == O(t);
      },
    Se = ft("species"),
    ke = function (t, e) {
      return new ((function (t) {
        var e;
        return (
          Ee(t) &&
            ("function" != typeof (e = t.constructor) ||
              (e !== Array && !Ee(e.prototype)) ||
              (e = void 0),
            a(e) && null === (e = e[Se]) && (e = void 0)),
          void 0 === e ? Array : e
        );
      })(t))(e);
    },
    we = ft("unscopables"),
    xe = Array.prototype;
  null == xe[we] && nt(xe, we, {});
  var Oe,
    je,
    Le,
    Ae,
    Te,
    Me,
    Pe,
    Ie,
    Ce,
    Re = function (t) {
      xe[we][t] = !0;
    },
    Fe =
      ((Le = 1 == (Oe = 5)),
      (Ae = 2 == Oe),
      (Te = 3 == Oe),
      (Me = 4 == Oe),
      (Pe = 6 == Oe),
      (Ie = 5 == Oe || Pe),
      (Ce = je || ke),
      function (t, e, n) {
        for (
          var r,
            o,
            i = jt(t),
            u = j(i),
            c = ut(e, n, 3),
            s = C(u.length),
            a = 0,
            f = Le ? Ce(t, s) : Ae ? Ce(t, 0) : void 0;
          s > a;
          a++
        )
          if ((Ie || a in u) && ((o = c((r = u[a]), a, i)), Oe))
            if (Le) f[a] = o;
            else if (o)
              switch (Oe) {
                case 3:
                  return !0;
                case 5:
                  return r;
                case 6:
                  return a;
                case 2:
                  f.push(r);
              }
            else if (Me) return !1;
        return Pe ? -1 : Te || Me ? Me : f;
      }),
    De = !0;
  "find" in [] &&
    Array(1).find(function () {
      De = !1;
    }),
    Et(Et.P + Et.F * De, "Array", {
      find: function (t) {
        return Fe(this, t, arguments.length > 1 ? arguments[1] : void 0);
      },
    }),
    Re("find");
  var Ne = Ct(
    Array,
    "Array",
    function (t, e) {
      (this._t = A(t)), (this._i = 0), (this._k = e);
    },
    function () {
      var t = this._t,
        e = this._k,
        n = this._i++;
      return !t || n >= t.length
        ? ((this._t = void 0), Rt(1))
        : Rt(0, "keys" == e ? n : "values" == e ? t[n] : [n, t[n]]);
    },
    "values"
  );
  (at.Arguments = at.Array), Re("keys"), Re("values"), Re("entries");
  for (
    var Ge = ft("iterator"),
      He = ft("toStringTag"),
      ze = at.Array,
      $e = {
        CSSRuleList: !0,
        CSSStyleDeclaration: !1,
        CSSValueList: !1,
        ClientRectList: !1,
        DOMRectList: !1,
        DOMStringList: !1,
        DOMTokenList: !0,
        DataTransferItemList: !1,
        FileList: !1,
        HTMLAllCollection: !1,
        HTMLCollection: !1,
        HTMLFormElement: !1,
        HTMLSelectElement: !1,
        MediaList: !0,
        MimeTypeArray: !1,
        NamedNodeMap: !1,
        NodeList: !0,
        PaintRequestList: !1,
        Plugin: !1,
        PluginArray: !1,
        SVGLengthList: !1,
        SVGNumberList: !1,
        SVGPathSegList: !1,
        SVGPointList: !1,
        SVGStringList: !1,
        SVGTransformList: !1,
        SourceBufferList: !1,
        StyleSheetList: !0,
        TextTrackCueList: !1,
        TextTrackList: !1,
        TouchList: !1,
      },
      Ve = B($e),
      Ke = 0;
    Ke < Ve.length;
    Ke++
  ) {
    var We,
      qe = Ve[Ke],
      Be = $e[qe],
      Ue = d[qe],
      Xe = Ue && Ue.prototype;
    if (
      Xe &&
      (Xe[Ge] || nt(Xe, Ge, ze), Xe[He] || nt(Xe, He, qe), (at[qe] = ze), Be)
    )
      for (We in Ne) Xe[We] || ot(Xe, We, Ne[We], !0);
  }
  var Ye = {};
  (Ye[ft("toStringTag")] = "z"),
    Ye + "" != "[object z]" &&
      ot(
        Object.prototype,
        "toString",
        function () {
          return "[object " + yt(this) + "]";
        },
        !0
      );
  var Je = ee(!0);
  Ct(
    String,
    "String",
    function (t) {
      (this._t = String(t)), (this._i = 0);
    },
    function () {
      var t,
        e = this._t,
        n = this._i;
      return n >= e.length
        ? { value: void 0, done: !0 }
        : ((t = Je(e, n)), (this._i += t.length), { value: t, done: !1 });
    }
  );
  var Qe = function (t, e, n) {
    e in t ? S.f(t, e, et(0, n)) : (t[e] = n);
  };
  Et(
    Et.S +
      Et.F *
        !Xt(function (t) {
          Array.from(t);
        }),
    "Array",
    {
      from: function (t) {
        var e,
          n,
          r,
          o,
          i = jt(t),
          u = "function" == typeof this ? this : Array,
          c = arguments.length,
          s = c > 1 ? arguments[1] : void 0,
          a = void 0 !== s,
          f = 0,
          l = mt(i);
        if (
          (a && (s = ut(s, c > 2 ? arguments[2] : void 0, 2)),
          null == l || (u == Array && ht(l)))
        )
          for (n = new u((e = C(i.length))); e > f; f++)
            Qe(n, f, a ? s(i[f], f) : i[f]);
        else
          for (o = l.call(i), n = new u(); !(r = o.next()).done; f++)
            Qe(n, f, a ? st(o, s, [r.value, f], !0) : r.value);
        return (n.length = f), n;
      },
    }
  );
  var Ze = S.f,
    tn = Function.prototype,
    en = /^\s*function ([^ (]*)/;
  "name" in tn ||
    (p &&
      Ze(tn, "name", {
        configurable: !0,
        get: function () {
          try {
            return ("" + this).match(en)[1];
          } catch (t) {
            return "";
          }
        },
      }));
  var nn = { f: Object.getOwnPropertySymbols },
    rn = Object.assign,
    on =
      !rn ||
      l(function () {
        var t = {},
          e = {},
          n = Symbol(),
          r = "abcdefghijklmnopqrst";
        return (
          (t[n] = 7),
          r.split("").forEach(function (t) {
            e[t] = t;
          }),
          7 != rn({}, t)[n] || Object.keys(rn({}, e)).join("") != r
        );
      })
        ? function (t, e) {
            for (
              var n = jt(t), r = arguments.length, o = 1, i = nn.f, u = Yt.f;
              r > o;

            )
              for (
                var c,
                  s = j(arguments[o++]),
                  a = i ? B(s).concat(i(s)) : B(s),
                  f = a.length,
                  l = 0;
                f > l;

              )
                (c = a[l++]), (p && !u.call(s, c)) || (n[c] = s[c]);
            return n;
          }
        : rn;
  Et(Et.S + Et.F, "Object", { assign: on });
  var un = document,
    cn = (function () {
      function t(n) {
        var r =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          o =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        e(this, t),
          (this.options = Object.assign({}, o, r)),
          (this._events = []),
          (this.dom = { el: this._setElement(n) });
      }
      return (
        r(t, [
          {
            key: "toggle",
            value: function () {
              var t =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : void 0,
                e = this.dom.el.classList;
              return void 0 !== t
                ? (e[t ? "remove" : "add"]("si-off"), this)
                : (e.toggle("si-off"), this);
            },
          },
          {
            key: "on",
            value: function (t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : null;
              return (
                (n || this.dom.el).addEventListener(t, (e = e.bind(this)), !0),
                this._events.push({ name: t, fn: e, el: n }),
                this
              );
            },
          },
          {
            key: "getElement",
            value: function () {
              return this.dom.el;
            },
          },
          {
            key: "remove",
            value: function () {
              var t = this;
              (this._events = this._events.filter(function (e) {
                return (e.el || t.dom.el).removeEventListener(e.name, e.fn, !0);
              })),
                this.dom.el.parentNode.removeChild(this.dom.el),
                (this.dom = this.options = null);
            },
          },
          {
            key: "_setElement",
            value: function (t) {
              if (!t && !t.nodeType && "string" != typeof t)
                throw new Error("Wrong element type provided!");
              return t.nodeType
                ? t
                : (this.options.parent || un).querySelector(t);
            },
          },
          {
            key: "_trigger",
            value: function (t) {
              var e,
                n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : null;
              "function" == typeof CustomEvent
                ? (e = new CustomEvent(t, {
                    detail: n,
                    bubbles: !0,
                    cancelable: !0,
                  }))
                : (e = un.createEvent("CustomEvent")).initCustomEvent(
                    t,
                    !0,
                    !0,
                    n
                  ),
                this.dom.el.dispatchEvent(e);
            },
          },
        ]),
        t
      );
    })(),
    sn = {
      items: [],
      display: "value",
      current: null,
      parent: null,
      maxHeight: 0,
      sort: !0,
      order: "desc",
      placeholder: "Select items",
      more: "(+{X} más)",
    },
    an = document;
  return (function (n) {
    !(function (t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && u(t, e);
    })(l, n);
    var a,
      f =
        ((a = l),
        function () {
          var t,
            e = i(a);
          if (c()) {
            var n = i(this).constructor;
            t = Reflect.construct(e, arguments, n);
          } else t = e.apply(this, arguments);
          return s(this, t);
        });
    function l(t) {
      var n,
        r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
      return (
        e(this, l),
        (n = f.call(this, t, r, sn)).options.sort &&
          (n.options.items = n._sortItems(r.items)),
        (n.options.items =
          r.items && r.items.length ? n._convertItems(r.items) : []),
        r.current &&
          r.current.length &&
          ((r.current = n._convertItems(r.current)), n._setSelected(r.current)),
        n._renderInit(),
        n._setResultMessage(),
        n._bindEvents(),
        n
      );
    }
    return (
      r(l, [
        {
          key: "_bindEvents",
          value: function () {
            var t = this;
            this.on(
              "click",
              function (e) {
                if (e.target.classList.contains("si-item"))
                  return t._setCurrent(e)._setResultMessage();
                t.toggle();
              },
              this.el
            ),
              this.on(
                "click",
                function (e) {
                  if (!t.dom.el.contains(e.target)) return t.toggle(!1);
                },
                an
              ),
              this.on(
                "keyup",
                function (e) {
                  ("Escape" !== e.key && 27 !== e.keyCode) || t.toggle(!1);
                },
                an
              );
          },
        },
        {
          key: "getItems",
          value: function () {
            return Array.from(this.options.items.values());
          },
        },
        {
          key: "getCurrent",
          value: function () {
            var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : "",
              e = this.getItems().filter(function (t) {
                return t.selected;
              });
            return t
              ? e.map(function (e) {
                  return e[t];
                })
              : e;
          },
        },
        {
          key: "setCurrent",
          value: function (t) {
            var e = this,
              n = this.options.items,
              r = this.options.display;
            (t = Array.isArray(t) ? t : [t]),
              (t = this._convertItems(t)).forEach(function (t) {
                n.forEach(function (n, o) {
                  n[r] === t[r] &&
                    (e.dom.el
                      .querySelector('.si-item[data-key="'.concat(o, '"]'))
                      .classList.add("si-selected"),
                    (n.selected = !0));
                });
              }),
              this._setResultMessage();
          },
        },
        {
          key: "findItem",
          value: function (t) {
            var e = this.options.display;
            return (
              (t = t.nodeName ? t.dataset.value : t),
              this.options.items.find(function (n) {
                return n[e] === t;
              })
            );
          },
        },
        {
          key: "_setCurrent",
          value: function (t) {
            var e =
                !(arguments.length > 1 && void 0 !== arguments[1]) ||
                arguments[1],
              n = t.target,
              r = parseInt(n.dataset.key, 10),
              o = this.options.items.get(r);
            return (
              (o.selected = n.classList.toggle("si-selected")),
              this.options.items.set(r, o),
              e && this._trigger("change", o),
              this
            );
          },
        },
        {
          key: "_setSelected",
          value: function (t) {
            var e = this.options.items,
              n = this.options.display;
            t.forEach(function (t) {
              e.forEach(function (e) {
                e[n] === t[n] && (e.selected = !0);
              });
            });
          },
        },
        {
          key: "_setResultMessage",
          value: function () {
            var t = this.getCurrent(),
              e = this.options.display,
              n = t.length,
              r = "";
            switch (n) {
              case 1:
                r = t[0][e];
                break;
              case 0:
                r = this.options.placeholder;
                break;
              default:
                r = /({X})/.test(this.options.more)
                  ? ""
                      .concat(t[0][e], " ")
                      .concat(this.options.more.replace("{X}", n - 1))
                  : this.options.more;
            }
            this.dom.result.classList[n ? "add" : "remove"]("si-selection"),
              (this.dom.result.innerHTML = r);
          },
        },
        {
          key: "_convertItems",
          value: function () {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : [],
              n = this.options.display,
              r = new Map(),
              i = 0;
            return (
              e.forEach(function (e) {
                "object" !== t(e) && (e = o({}, n, e)), r.set(i++, e);
              }),
              r
            );
          },
        },
        {
          key: "_renderInit",
          value: function () {
            var t = an.createDocumentFragment();
            return (
              this.dom.el.classList.add("si-off", "si-wrap"),
              (this.dom.result = t.appendChild(this._renderResultDiv())),
              t.appendChild(this._renderList()),
              this.dom.el.appendChild(t)
            );
          },
        },
        {
          key: "_renderResultDiv",
          value: function () {
            var t = an.createElement("div");
            return (t.className = "si-result"), t;
          },
        },
        {
          key: "_renderList",
          value: function () {
            var t = an.createElement("div"),
              e = an.createElement("ul"),
              n = this.options.maxHeight;
            return (
              (t.className = "si-list"),
              n && (t.style.maxHeight = n + "px"),
              (e.innerHTML = this._renderListItems()),
              t.appendChild(e),
              t
            );
          },
        },
        {
          key: "_renderListItems",
          value: function () {
            var t,
              e = this.options.items,
              n = this.options.display,
              r = "";
            return (
              e.forEach(function (e, o) {
                (t = e.selected ? " si-selected" : ""),
                  (r += '<li class="si-item'
                    .concat(t, '" data-key="')
                    .concat(o, '">')
                    .concat(e[n], "</li>"));
              }),
              r
            );
          },
        },
        {
          key: "_sortItems",
          value: function () {
            var t = "desc" === this.options.order ? 1 : -1,
              e = this.options.display;
            this.options.items.sort(function (n, r) {
              return n[e] < r[e] ? -t : n[e] > r[e] ? t : 0;
            });
          },
        },
      ]),
      l
    );
  })(cn);
});
//# sourceMappingURL=multi-select-umd.js.map

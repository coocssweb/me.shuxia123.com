"use strict";
var showFlyitem = function() {
    var t = $(".J_flyitem"),
    i = t.find("i");
    i.each(function(t, i) {
        $(i).addClass("anim_flyitem_" + (t % 6 + 1))
    })
},
GiftsAnim = function(t, i) {
    this.pathConfig = [{
        id: "1",
        d: "M115.500,1367.500 C115.240,1281.506 98.384,739.881 95.500,597.500 C94.571,551.647 54.863,107.535 1.500,3.500",
        x: 220,
        y: -80
    },
    {
        id: "2",
        d: "M1.500,1299.500 C1.760,1213.506 19.692,671.899 21.500,529.500 C22.669,437.424 28.723,118.364 93.500,1.500",
        x: 340,
        y: -50
    },
    {
        id: "3",
        d: "M218.500,1306.500 C211.172,1238.080 153.173,535.058 126.500,337.500 C114.700,250.104 53.910,49.382 1.500,4.500",
        x: 130,
        y: -40
    },
    {
        id: "4",
        d: "M1.500,1308.500 C8.828,1240.080 48.162,593.511 84.500,397.500 C98.296,323.085 236.662,20.092 353.500,1.500",
        x: 310,
        y: -50
    },
    {
        id: "5",
        d: "M453.500,1183.500 C444.955,1076.627 452.335,808.931 441.500,679.500 C433.215,580.531 421.267,465.921 402.500,333.500 C360.003,33.639 210.563,-94.172 3.500,90.500",
        x: -120,
        y: 200
    },
    {
        id: "6",
        d: "M1.498,1162.500 C10.039,1055.640 10.332,708.790 30.500,580.500 C38.479,529.743 48.954,317.820 103.500,191.500 C165.775,47.282 339.925,-52.377 446.500,35.500",
        x: 320,
        y: 200
    },
    {
        id: "7",
        d: "M454.500,1029.500 C446.705,944.688 447.640,789.337 433.500,627.500 C428.020,564.776 407.604,367.584 384.500,227.500 C355.559,52.025 109.310,-78.784 4.500,68.500 ",
        x: -120,
        y: 250
    },
    {
        id: "8",
        d: "M1.500,942.500 C9.295,857.680 -0.253,703.463 22.500,540.462 C31.205,478.098 24.877,288.743 91.500,152.500 C144.077,44.981 267.591,-71.793 453.500,60.500",
        x: 310,
        y: 290
    }],
    this.imageConf = [{
        width: 96,
        height: 106,
        url: "./images/db12_fly_coin@2x.png"
    },
    {
        width: 118,
        height: 124,
        url: "./images/db12_fly_giftbox@2x.png"
    },
    {
        width: 140,
        height: 152,
        url: "./images/db12_fly_hongbao@2x.png"
    }],
    this.IMAGE_NUM = 50,
    this.CUR_IMAGE = 1,
    this.opt = i,
    this.svgEl = t,
    this.snapSvg = Snap.select(i.svg),
    this._init()
};
GiftsAnim.prototype = {
    _fixIOS78: function(t) {
        var i = document.createElement("div");
        i.innerHTML = "<svg>" + this._createPath().join("") + this._createSvgImage().join("") + "</svg>";
        var n = [].slice.call(i.childNodes[0].childNodes);
        n.forEach(function(i) {
            t.appendChild(i)
        })
    },
    _init: function() {
        var t = /iphone\sos\s(7|8)/.test(navigator.userAgent.toLowerCase());
        t ? this._fixIOS78(this.svgEl) : this.svgEl.innerHTML = this._createPath().join("") + this._createSvgImage().join("")
    },
    _getPath: function(t) {
        return '<path id="db12_flypath_' + t.id + '" d="' + t.d + '" fill="none" stroke-width="1" stroke="#cd0000" />'
    },
    _createPath: function() {
        var t = [],
        i = this;
        return this.pathConfig.forEach(function(n) {
            t.push(i._getPath(n))
        }),
        t
    },
    _createSvgImage: function() {
        for (var t, i = [], n = 1; n <= this.IMAGE_NUM; n++) {
            var e = Math.floor(3 * Math.random());
            t = this.imageConf[e],
            i.push('<image id="db12_flyimage_' + n + '" width="' + t.width + '" height="' + t.height + '"  xlink:href="' + t.url + '" />')
        }
        return i
    },
    _createSnapImage: function(t) {
        for (var i = [], n = t || 5 + Math.ceil(4 * Math.random()), e = this.pathConfig, a = this.snapSvg, h = 1; h <= n; h++) {
            var r = Math.ceil(Math.random() * e.length),
            o = this.CUR_IMAGE++%this.IMAGE_NUM,
            s = a.select("#db12_flypath_" + r),
            f = a.select("#db12_flyimage_" + o),
            d = Snap.path.getTotalLength(s.attr("d"));
            f.attr({
                x: e[r - 1].x + 30 * Math.random() - 30,
                y: e[r - 1].y + 10 * Math.random() - 10
            }),
            i.push({
                image: f,
                path: s,
                length: d,
                dura: 1e3 + 1500 * Math.random()
            })
        }
        return i
    },
    sprayGifts: function(t) {
        var i = this._createSnapImage(t);
        i.forEach(function(t) {
            var i = !1;
            Snap.animate(0, t.length,
            function(n) {
                i || (t.image.attr({
                    style: "opacity:1"
                }), i = !0);
                var e = t.path.getPointAtLength(n);
                t.image.attr({
                    transform: "t" + [e.x, e.y] + "r" + (e.alpha - 120)
                })
            },
            t.dura, mina.easein,
            function() {
                t.image.attr({
                    opacity: 0
                })
            })
        })
    }
};
var playSequenceAnim = function() {
    var t = new GiftsAnim(document.querySelector("#db12_svg"), {
        svg: "#db12_svg"
    }),
    i = function(t, i) {
        return new Promise(function(n, e) {
            i && i(),
            setTimeout(function() {
                n()
            },
            t)
        })
    };
    "webkitAnimation" in document.body.style;
    i(0).then(function() {
        return i(1e3,
        function() {
            t.sprayGifts(4)
        })
    }).then(function() {
        return i(800,
        function() {
            t.sprayGifts(5)
        })
    }).then(function() {
        return i(1e3,
        function() {
            t.sprayGifts(7)
        })
    }).then(function() {
        return i(200,
        function() {
            t.sprayGifts(8)
        })
    })
};
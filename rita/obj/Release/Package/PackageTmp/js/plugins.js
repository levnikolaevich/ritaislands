
(function (a) { var b = new Array, c = new Array, d = function () { }, e = 0; var f = { splashVPos: "35%", loaderVPos: "75%", splashID: "#jpreContent", showSplash: true, showPercentage: true, autoClose: true, closeBtnText: "Start!", onetimeLoad: false, debugMode: false, splashFunction: function () { } }; var g = function () { if (f.onetimeLoad) { var a = document.cookie.split("; "); for (var b = 0, c; c = a[b] && a[b].split("=") ; b++) { if (c.shift() === "jpreLoader") { return c.join("=") } } return false } else { return false } }; var h = function (a) { if (f.onetimeLoad) { var b = new Date; b.setDate(b.getDate() + a); var c = a == null ? "" : "expires=" + b.toUTCString(); document.cookie = "jpreLoader=loaded; " + c } }; var i = function () { jOverlay = a("<div></div>").attr("id", "jpreOverlay").css({ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 9999999 }).appendTo("body"); if (f.showSplash) { jContent = a("<div></div>").attr("id", "jpreSlide").appendTo(jOverlay); var b = a(window).width() - a(jContent).width(); a(jContent).css({ position: "absolute", top: f.splashVPos, left: Math.round(50 / a(window).width() * b) + "%" }); a(jContent).html(a(f.splashID).wrap("<div/>").parent().html()); a(f.splashID).remove(); f.splashFunction() } jLoader = a("<div></div>").attr("id", "jpreLoader").appendTo(jOverlay); var c = a(window).width() - a(jLoader).width(); a(jLoader).css({ position: "absolute", top: f.loaderVPos, left: Math.round(50 / a(window).width() * c) + "%" }); jBar = a("<div></div>").attr("id", "jpreBar").css({ width: "0%", height: "100%" }).appendTo(jLoader); if (f.showPercentage) { jPer = a("<div></div>").attr("id", "jprePercentage").css({ position: "relative", height: "100%" }).appendTo(jLoader).html("--") } if (!f.autoclose) { jButton = a("<div></div>").attr("id", "jpreButton").on("click", function () { n() }).css({ position: "relative", height: "100%" }).appendTo(jLoader).text(f.closeBtnText).hide() } }; var j = function (c) { a(c).find("*:not(script)").each(function () { var c = ""; if (a(this).css("background-image").indexOf("none") == -1 && a(this).css("background-image").indexOf("-gradient") == -1) { c = a(this).css("background-image"); if (c.indexOf("url") != -1) { var d = c.match(/url\((.*?)\)/); c = d[1].replace(/\"/g, "") } } else if (a(this).get(0).nodeName.toLowerCase() == "img" && typeof a(this).attr("src") != "undefined") { c = a(this).attr("src") } if (c.length > 0) { b.push(c) } }) }; var k = function () { for (var a = 0; a < b.length; a++) { if (l(b[a])); } }; var l = function (b) { var d = new Image; a(d).load(function () { m() }).error(function () { c.push(a(this).attr("src")); m() }).attr("src", b) }; var m = function () { e++; var c = Math.round(e / b.length * 100); a(jBar).stop().animate({ width: c + "%" }, 500, "linear"); if (f.showPercentage) { a(jPer).text(c + "%") } if (e >= b.length) { e = b.length; h(); if (f.showPercentage) { a(jPer).text("100%") } if (f.debugMode) { var d = o() } a(jBar).stop().animate({ width: "100%" }, 500, "linear", function () { if (f.autoClose) n(); else a(jButton).fadeIn(1e3) }) } }; var n = function () { a(jOverlay).fadeOut(800, function () { a(jOverlay).remove(); d() }) }; var o = function () { if (c.length > 0) { var a = "ERROR - IMAGE FILES MISSING!!!\n\r"; a += c.length + " image files cound not be found. \n\r"; a += "Please check your image paths and filenames:\n\r"; for (var b = 0; b < c.length; b++) { a += "- " + c[b] + "\n\r" } return true } else { return false } }; a.fn.jpreLoader = function (b, c) { if (b) { a.extend(f, b) } if (typeof c == "function") { d = c } a("body").css({ display: "block" }); return this.each(function () { if (!g()) { i(); j(this); k() } else { a(f.splashID).remove(); d() } }) } })(jQuery)




jQuery.easing.jswing = jQuery.easing.swing; jQuery.extend(jQuery.easing, { def: "easeOutQuad", swing: function (e, f, a, h, g) { return jQuery.easing[jQuery.easing.def](e, f, a, h, g) }, easeInQuad: function (e, f, a, h, g) { return h * (f /= g) * f + a }, easeOutQuad: function (e, f, a, h, g) { return -h * (f /= g) * (f - 2) + a }, easeInOutQuad: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f + a } return -h / 2 * ((--f) * (f - 2) - 1) + a }, easeInCubic: function (e, f, a, h, g) { return h * (f /= g) * f * f + a }, easeOutCubic: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f + 1) + a }, easeInOutCubic: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f + a } return h / 2 * ((f -= 2) * f * f + 2) + a }, easeInQuart: function (e, f, a, h, g) { return h * (f /= g) * f * f * f + a }, easeOutQuart: function (e, f, a, h, g) { return -h * ((f = f / g - 1) * f * f * f - 1) + a }, easeInOutQuart: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f + a } return -h / 2 * ((f -= 2) * f * f * f - 2) + a }, easeInQuint: function (e, f, a, h, g) { return h * (f /= g) * f * f * f * f + a }, easeOutQuint: function (e, f, a, h, g) { return h * ((f = f / g - 1) * f * f * f * f + 1) + a }, easeInOutQuint: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return h / 2 * f * f * f * f * f + a } return h / 2 * ((f -= 2) * f * f * f * f + 2) + a }, easeInSine: function (e, f, a, h, g) { return -h * Math.cos(f / g * (Math.PI / 2)) + h + a }, easeOutSine: function (e, f, a, h, g) { return h * Math.sin(f / g * (Math.PI / 2)) + a }, easeInOutSine: function (e, f, a, h, g) { return -h / 2 * (Math.cos(Math.PI * f / g) - 1) + a }, easeInExpo: function (e, f, a, h, g) { return (f == 0) ? a : h * Math.pow(2, 10 * (f / g - 1)) + a }, easeOutExpo: function (e, f, a, h, g) { return (f == g) ? a + h : h * (-Math.pow(2, -10 * f / g) + 1) + a }, easeInOutExpo: function (e, f, a, h, g) { if (f == 0) { return a } if (f == g) { return a + h } if ((f /= g / 2) < 1) { return h / 2 * Math.pow(2, 10 * (f - 1)) + a } return h / 2 * (-Math.pow(2, -10 * --f) + 2) + a }, easeInCirc: function (e, f, a, h, g) { return -h * (Math.sqrt(1 - (f /= g) * f) - 1) + a }, easeOutCirc: function (e, f, a, h, g) { return h * Math.sqrt(1 - (f = f / g - 1) * f) + a }, easeInOutCirc: function (e, f, a, h, g) { if ((f /= g / 2) < 1) { return -h / 2 * (Math.sqrt(1 - f * f) - 1) + a } return h / 2 * (Math.sqrt(1 - (f -= 2) * f) + 1) + a }, easeInElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return -(g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e }, easeOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k) == 1) { return e + l } if (!j) { j = k * 0.3 } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } return g * Math.pow(2, -10 * h) * Math.sin((h * k - i) * (2 * Math.PI) / j) + l + e }, easeInOutElastic: function (f, h, e, l, k) { var i = 1.70158; var j = 0; var g = l; if (h == 0) { return e } if ((h /= k / 2) == 2) { return e + l } if (!j) { j = k * (0.3 * 1.5) } if (g < Math.abs(l)) { g = l; var i = j / 4 } else { var i = j / (2 * Math.PI) * Math.asin(l / g) } if (h < 1) { return -0.5 * (g * Math.pow(2, 10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j)) + e } return g * Math.pow(2, -10 * (h -= 1)) * Math.sin((h * k - i) * (2 * Math.PI) / j) * 0.5 + l + e }, easeInBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * (f /= h) * f * ((g + 1) * f - g) + a }, easeOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } return i * ((f = f / h - 1) * f * ((g + 1) * f + g) + 1) + a }, easeInOutBack: function (e, f, a, i, h, g) { if (g == undefined) { g = 1.70158 } if ((f /= h / 2) < 1) { return i / 2 * (f * f * (((g *= (1.525)) + 1) * f - g)) + a } return i / 2 * ((f -= 2) * f * (((g *= (1.525)) + 1) * f + g) + 2) + a }, easeInBounce: function (e, f, a, h, g) { return h - jQuery.easing.easeOutBounce(e, g - f, 0, h, g) + a }, easeOutBounce: function (e, f, a, h, g) { if ((f /= g) < (1 / 2.75)) { return h * (7.5625 * f * f) + a } else { if (f < (2 / 2.75)) { return h * (7.5625 * (f -= (1.5 / 2.75)) * f + 0.75) + a } else { if (f < (2.5 / 2.75)) { return h * (7.5625 * (f -= (2.25 / 2.75)) * f + 0.9375) + a } else { return h * (7.5625 * (f -= (2.625 / 2.75)) * f + 0.984375) + a } } } }, easeInOutBounce: function (e, f, a, h, g) { if (f < g / 2) { return jQuery.easing.easeInBounce(e, f * 2, 0, h, g) * 0.5 + a } return jQuery.easing.easeOutBounce(e, f * 2 - g, 0, h, g) * 0.5 + h * 0.5 + a } });


!function (e) { var t = function (t, n, r) { if (r) { r.stopPropagation(); r.preventDefault() } this.$element = e(t); this.$newElement = null; this.button = null; this.options = e.extend({}, e.fn.selectpicker.defaults, this.$element.data(), typeof n == "object" && n); this.style = this.options.style; this.size = this.options.size; this.init() }; t.prototype = { constructor: t, init: function (t) { this.$element.hide(); var n = this.$element.attr("class") !== undefined ? this.$element.attr("class").split(/\s+/) : ""; var r = this.getTemplate(); var i = this.$element.attr("id"); r = this.createLi(r); this.$element.after(r); this.$newElement = this.$element.next(".bootstrap-select"); var s = this.$newElement; var o = this.$newElement.find(".dropdown-menu"); var u = o.find("li > a"); var a = parseInt(u.css("line-height")) + u.outerHeight(); var f = o.find("li .divider").outerHeight(true); var l = this.$newElement.offset().top; var c = 0; var h = 0; var p = this.$newElement.outerHeight(); this.button = this.$newElement.find("> button"); if (i !== undefined) { this.button.attr("id", i); e('label[for="' + i + '"]').click(function () { s.find("button#" + i).focus() }) } for (var d = 0; d < n.length; d++) { if (n[d] != "selectpicker") { this.$newElement.addClass(n[d]) } } this.button.addClass(this.style); this.checkDisabled(); this.checkTabIndex(); this.clickListener(); var v = parseInt(o.css("padding-top")) + parseInt(o.css("padding-bottom")) + parseInt(o.css("border-top-width")) + parseInt(o.css("border-bottom-width")); if (this.size == "auto") { function m() { var t = l - e(window).scrollTop(); var n = window.innerHeight; var r = v + parseInt(o.css("margin-top")) + parseInt(o.css("margin-bottom")) + 2; var i = n - t - p - r; h = i; if (s.hasClass("dropup")) { h = t - r } o.css({ "max-height": h + "px", "overflow-y": "auto", "min-height": "100%" }) } m(); e(window).resize(m); e(window).scroll(m); this.$element.bind("DOMNodeInserted", m) } else if (this.size && this.size != "auto" && o.find("li").length > this.size) { var g = o.find("li > *").filter(":not(.div-contain)").slice(0, this.size).last().parent().index(); var y = o.find("li").slice(0, g + 1).find(".div-contain").length; h = a * this.size + y * f + v; o.css({ "max-height": h + "px", "overflow-y": "scroll" }) } this.$element.bind("DOMNodeInserted", e.proxy(this.reloadLi, this)) }, getTemplate: function () { var e = "<div class='btn-group bootstrap-select'>" + "<button class='custom-select dropdown-toggle clearfix' data-toggle='dropdown'>" + "<span class='filter-option pull-left'>__SELECTED_OPTION</span> " + "<span class='plus-select'></span>" + "</button>" + "<ul class='dropdown-menu' role='menu'>" + "__ADD_LI" + "</ul>" + "</div>"; return e }, reloadLi: function () { var t = []; var n = []; var r = ""; this.$newElement.find("li").remove(); this.$element.find("option").each(function () { t.push(e(this).text()) }); this.$element.find("option").each(function () { var t = e(this).attr("class") !== undefined ? e(this).attr("class") : ""; if (e(this).parent().is("optgroup") && e(this).data("divider") != true) { if (e(this).index() == 0) { if (e(this)[0].index != 0) { n.push('<div class="div-contain"><div class="divider"></div></div>' + "<dt>" + e(this).parent().attr("label") + "</dt>" + '<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } else { n.push("<dt>" + e(this).parent().attr("label") + "</dt>" + '<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } } else { n.push('<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } } else if (e(this).data("divider") == true) { n.push('<div class="div-contain"><div class="divider"></div></div>') } else { n.push('<a tabindex="-1" href="#" class="' + t + '">' + e(this).text() + "</a>") } }); if (t.length > 0) { for (var i = 0; i < t.length; i++) { var s = this.$element.find("option").eq(i).is(":disabled") ? 'class="disabled"' : ""; this.$newElement.find("ul").append("<li rel=" + i + " " + s + ">" + n[i] + "</li>") } } this.$newElement.find("li.disabled a, li dt, li .div-contain").on("click", function (t) { t.preventDefault(); t.stopPropagation(); $select = e(this).parent().parents(".bootstrap-select"); $select.find("button").focus() }); if (this.$element.find("option:selected").attr("title") != undefined) { this.$newElement.find(".filter-option").html(this.$element.find("option:selected").attr("title")) } else { this.$newElement.find(".filter-option").html(this.$element.find("option:selected").text()) } }, createLi: function (t) { var n = []; var r = []; var i = ""; var s = this; var o = this.$element[0].selectedIndex ? this.$element[0].selectedIndex : 0; this.$element.find("option").each(function () { n.push(e(this).text()) }); this.$element.find("option").each(function () { var t = e(this).attr("class") !== undefined ? e(this).attr("class") : ""; if (e(this).parent().is("optgroup") && e(this).data("divider") != true) { if (e(this).index() == 0) { if (e(this)[0].index != 0) { r.push('<div class="div-contain"><div class="divider"></div></div>' + "<dt>" + e(this).parent().attr("label") + "</dt>" + '<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } else { r.push("<dt>" + e(this).parent().attr("label") + "</dt>" + '<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } } else { r.push('<a tabindex="-1" href="#" class="opt ' + t + '">' + e(this).text() + "</a>") } } else if (e(this).data("divider") == true) { r.push('<div class="div-contain"><div class="divider"></div></div>') } else { r.push('<a tabindex="-1" href="#" class="' + t + '">' + e(this).text() + "</a>") } }); if (n.length > 0) { t = t.replace("__SELECTED_OPTION", n[o]); for (var u = 0; u < n.length; u++) { var a = this.$element.find("option").eq(u).is(":disabled") ? 'class="disabled"' : ""; i += "<li rel=" + u + " " + a + ">" + r[u] + "</li>" } } this.$element.find("option").eq(o).prop("selected", true); t = t.replace("__ADD_LI", i); return t }, checkDisabled: function () { if (this.$element.is(":disabled")) { this.button.addClass("disabled"); this.button.click(function (e) { e.preventDefault() }) } }, checkTabIndex: function () { if (this.$element.is("[tabindex]")) { var e = this.$element.attr("tabindex"); this.button.attr("tabindex", e) } }, clickListener: function () { e("body").on("touchstart.dropdown", ".dropdown-menu", function (e) { e.stopPropagation() }); this.$newElement.find("li.disabled a, li dt, li .div-contain").on("click", function (t) { t.preventDefault(); t.stopPropagation(); $select = e(this).parent().parents(".bootstrap-select"); $select.find("button").focus() }); this.$newElement.on("click", "li a", function (t) { t.preventDefault(); var n = e(this).parent().index(), r = e(this).parent(), i = r.parents(".bootstrap-select"); if (i.prev("select").not(":disabled")) { i.prev("select").find("option").removeAttr("selected"); i.prev("select").find("option").eq(n).prop("selected", true).attr("selected", "selected"); i.find(".filter-option").html(r.text()); i.find("button").focus(); i.prev("select").trigger("change") } }); this.$element.on("change", function (t) { if (e(this).find("option:selected").attr("title") != undefined) { e(this).next(".bootstrap-select").find(".filter-option").html(e(this).find("option:selected").attr("title")) } else { e(this).next(".bootstrap-select").find(".filter-option").html(e(this).find("option:selected").text()) } }) } }; e.fn.selectpicker = function (n, r) { return this.each(function () { var i = e(this), s = i.data("selectpicker"), o = typeof n == "object" && n; if (!s) { i.data("selectpicker", s = new t(this, o, r)) } if (typeof n == "string") { s[n]() } }) }; e.fn.selectpicker.defaults = { style: null, size: "auto" } }(window.jQuery)


; (function ($) { var h = $.scrollTo = function (a, b, c) { $(window).scrollTo(a, b, c) }; h.defaults = { axis: 'xy', duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1, limit: true }; h.window = function (a) { return $(window)._scrollable() }; $.fn._scrollable = function () { return this.map(function () { var a = this, isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!isWin) return a; var b = (a.contentWindow || a).document || a.ownerDocument || a; return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body : b.documentElement }) }; $.fn.scrollTo = function (e, f, g) { if (typeof f == 'object') { g = f; f = 0 } if (typeof g == 'function') g = { onAfter: g }; if (e == 'max') e = 9e9; g = $.extend({}, h.defaults, g); f = f || g.duration; g.queue = g.queue && g.axis.length > 1; if (g.queue) f /= 2; g.offset = both(g.offset); g.over = both(g.over); return this._scrollable().each(function () { if (!e) return; var d = this, $elem = $(d), targ = e, toff, attr = {}, win = $elem.is('html,body'); switch (typeof targ) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) { targ = both(targ); break } targ = $(targ, this); if (!targ.length) return; case 'object': if (targ.is || targ.style) toff = (targ = $(targ)).offset() } $.each(g.axis.split(''), function (i, a) { var b = a == 'x' ? 'Left' : 'Top', pos = b.toLowerCase(), key = 'scroll' + b, old = d[key], max = h.max(d, a); if (toff) { attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]); if (g.margin) { attr[key] -= parseInt(targ.css('margin' + b)) || 0; attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0 } attr[key] += g.offset[pos] || 0; if (g.over[pos]) attr[key] += targ[a == 'x' ? 'width' : 'height']() * g.over[pos] } else { var c = targ[pos]; attr[key] = c.slice && c.slice(-1) == '%' ? parseFloat(c) / 100 * max : c } if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max); if (!i && g.queue) { if (old != attr[key]) animate(g.onAfterFirst); delete attr[key] } }); animate(g.onAfter); function animate(a) { $elem.animate(attr, f, g.easing, a && function () { a.call(this, e, g) }) } }).end() }; h.max = function (a, b) { var c = b == 'x' ? 'Width' : 'Height', scroll = 'scroll' + c; if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()](); var d = 'client' + c, html = a.ownerDocument.documentElement, body = a.ownerDocument.body; return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d]) }; function both(a) { return typeof a == 'object' ? a : { top: a, left: a } } })(jQuery);

var mejs = mejs || {}; mejs.version = "2.11.3"; mejs.meIndex = 0;
mejs.plugins = {
    silverlight: [{ version: [3, 0], types: ["video/mp4", "video/m4v", "video/mov", "video/wmv", "audio/wma", "audio/m4a", "audio/mp3", "audio/wav", "audio/mpeg"] }], flash: [{ version: [9, 0, 124], types: ["video/mp4", "video/m4v", "video/mov", "video/flv", "video/rtmp", "video/x-flv", "audio/flv", "audio/x-flv", "audio/mp3", "audio/m4a", "audio/mpeg", "video/youtube", "video/x-youtube"] }], youtube: [{ version: null, types: ["video/youtube", "video/x-youtube", "audio/youtube", "audio/x-youtube"] }], vimeo: [{
        version: null, types: ["video/vimeo",
        "video/x-vimeo"]
    }]
};
mejs.Utility = {
    encodeUrl: function (a) { return encodeURIComponent(a) }, escapeHTML: function (a) { return a.toString().split("&").join("&amp;").split("<").join("&lt;").split('"').join("&quot;") }, absolutizeUrl: function (a) { var b = document.createElement("div"); b.innerHTML = '<a href="' + this.escapeHTML(a) + '">x</a>'; return b.firstChild.href }, getScriptPath: function (a) {
        for (var b = 0, c, d = "", e = "", f, g, h = document.getElementsByTagName("script"), l = h.length, j = a.length; b < l; b++) {
            f = h[b].src; c = f.lastIndexOf("/"); if (c > -1) {
                g = f.substring(c +
                1); f = f.substring(0, c + 1)
            } else { g = f; f = "" } for (c = 0; c < j; c++) { e = a[c]; e = g.indexOf(e); if (e > -1) { d = f; break } } if (d !== "") break
        } return d
    }, secondsToTimeCode: function (a, b, c, d) { if (typeof c == "undefined") c = false; else if (typeof d == "undefined") d = 25; var e = Math.floor(a / 3600) % 24, f = Math.floor(a / 60) % 60, g = Math.floor(a % 60); a = Math.floor((a % 1 * d).toFixed(3)); return (b || e > 0 ? (e < 10 ? "0" + e : e) + ":" : "") + (f < 10 ? "0" + f : f) + ":" + (g < 10 ? "0" + g : g) + (c ? ":" + (a < 10 ? "0" + a : a) : "") }, timeCodeToSeconds: function (a, b, c, d) {
        if (typeof c == "undefined") c = false; else if (typeof d ==
        "undefined") d = 25; a = a.split(":"); b = parseInt(a[0], 10); var e = parseInt(a[1], 10), f = parseInt(a[2], 10), g = 0, h = 0; if (c) g = parseInt(a[3]) / d; return h = b * 3600 + e * 60 + f + g
    }, convertSMPTEtoSeconds: function (a) { if (typeof a != "string") return false; a = a.replace(",", "."); var b = 0, c = a.indexOf(".") != -1 ? a.split(".")[1].length : 0, d = 1; a = a.split(":").reverse(); for (var e = 0; e < a.length; e++) { d = 1; if (e > 0) d = Math.pow(60, e); b += Number(a[e]) * d } return Number(b.toFixed(c)) }, removeSwf: function (a) {
        var b = document.getElementById(a); if (b && /object|embed/i.test(b.nodeName)) if (mejs.MediaFeatures.isIE) {
            b.style.display =
            "none"; (function () { b.readyState == 4 ? mejs.Utility.removeObjectInIE(a) : setTimeout(arguments.callee, 10) })()
        } else b.parentNode.removeChild(b)
    }, removeObjectInIE: function (a) { if (a = document.getElementById(a)) { for (var b in a) if (typeof a[b] == "function") a[b] = null; a.parentNode.removeChild(a) } }
};
mejs.PluginDetector = {
    hasPluginVersion: function (a, b) { var c = this.plugins[a]; b[1] = b[1] || 0; b[2] = b[2] || 0; return c[0] > b[0] || c[0] == b[0] && c[1] > b[1] || c[0] == b[0] && c[1] == b[1] && c[2] >= b[2] ? true : false }, nav: window.navigator, ua: window.navigator.userAgent.toLowerCase(), plugins: [], addPlugin: function (a, b, c, d, e) { this.plugins[a] = this.detectPlugin(b, c, d, e) }, detectPlugin: function (a, b, c, d) {
        var e = [0, 0, 0], f; if (typeof this.nav.plugins != "undefined" && typeof this.nav.plugins[a] == "object") {
            if ((c = this.nav.plugins[a].description) &&
            !(typeof this.nav.mimeTypes != "undefined" && this.nav.mimeTypes[b] && !this.nav.mimeTypes[b].enabledPlugin)) { e = c.replace(a, "").replace(/^\s+/, "").replace(/\sr/gi, ".").split("."); for (a = 0; a < e.length; a++) e[a] = parseInt(e[a].match(/\d+/), 10) }
        } else if (typeof window.ActiveXObject != "undefined") try { if (f = new ActiveXObject(c)) e = d(f) } catch (g) { } return e
    }
};
mejs.PluginDetector.addPlugin("flash", "Shockwave Flash", "application/x-shockwave-flash", "ShockwaveFlash.ShockwaveFlash", function (a) { var b = []; if (a = a.GetVariable("$version")) { a = a.split(" ")[1].split(","); b = [parseInt(a[0], 10), parseInt(a[1], 10), parseInt(a[2], 10)] } return b });
mejs.PluginDetector.addPlugin("silverlight", "Silverlight Plug-In", "application/x-silverlight-2", "AgControl.AgControl", function (a) { var b = [0, 0, 0, 0], c = function (d, e, f, g) { for (; d.isVersionSupported(e[0] + "." + e[1] + "." + e[2] + "." + e[3]) ;) e[f] += g; e[f] -= g }; c(a, b, 0, 1); c(a, b, 1, 1); c(a, b, 2, 1E4); c(a, b, 2, 1E3); c(a, b, 2, 100); c(a, b, 2, 10); c(a, b, 2, 1); c(a, b, 3, 1); return b });
mejs.MediaFeatures = {
    init: function () {
        var a = this, b = document, c = mejs.PluginDetector.nav, d = mejs.PluginDetector.ua.toLowerCase(), e, f = ["source", "track", "audio", "video"]; a.isiPad = d.match(/ipad/i) !== null; a.isiPhone = d.match(/iphone/i) !== null; a.isiOS = a.isiPhone || a.isiPad; a.isAndroid = d.match(/android/i) !== null; a.isBustedAndroid = d.match(/android 2\.[12]/) !== null; a.isBustedNativeHTTPS = location.protocol === "https:" && (d.match(/android [12]\./) !== null || d.match(/macintosh.* version.* safari/) !== null); a.isIE = c.appName.toLowerCase().indexOf("microsoft") !=
        -1; a.isChrome = d.match(/chrome/gi) !== null; a.isFirefox = d.match(/firefox/gi) !== null; a.isWebkit = d.match(/webkit/gi) !== null; a.isGecko = d.match(/gecko/gi) !== null && !a.isWebkit; a.isOpera = d.match(/opera/gi) !== null; a.hasTouch = "ontouchstart" in window; a.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect; for (c = 0; c < f.length; c++) e = document.createElement(f[c]); a.supportsMediaTag = typeof e.canPlayType !== "undefined" || a.isBustedAndroid; a.hasSemiNativeFullScreen =
        typeof e.webkitEnterFullscreen !== "undefined"; a.hasWebkitNativeFullScreen = typeof e.webkitRequestFullScreen !== "undefined"; a.hasMozNativeFullScreen = typeof e.mozRequestFullScreen !== "undefined"; a.hasTrueNativeFullScreen = a.hasWebkitNativeFullScreen || a.hasMozNativeFullScreen; a.nativeFullScreenEnabled = a.hasTrueNativeFullScreen; if (a.hasMozNativeFullScreen) a.nativeFullScreenEnabled = e.mozFullScreenEnabled; if (this.isChrome) a.hasSemiNativeFullScreen = false; if (a.hasTrueNativeFullScreen) {
            a.fullScreenEventName = a.hasWebkitNativeFullScreen ?
            "webkitfullscreenchange" : "mozfullscreenchange"; a.isFullScreen = function () { if (e.mozRequestFullScreen) return b.mozFullScreen; else if (e.webkitRequestFullScreen) return b.webkitIsFullScreen }; a.requestFullScreen = function (g) { if (a.hasWebkitNativeFullScreen) g.webkitRequestFullScreen(); else a.hasMozNativeFullScreen && g.mozRequestFullScreen() }; a.cancelFullScreen = function () { if (a.hasWebkitNativeFullScreen) document.webkitCancelFullScreen(); else a.hasMozNativeFullScreen && document.mozCancelFullScreen() }
        } if (a.hasSemiNativeFullScreen &&
        d.match(/mac os x 10_5/i)) { a.hasNativeFullScreen = false; a.hasSemiNativeFullScreen = false }
    }
}; mejs.MediaFeatures.init();
mejs.HtmlMediaElement = { pluginType: "native", isFullScreen: false, setCurrentTime: function (a) { this.currentTime = a }, setMuted: function (a) { this.muted = a }, setVolume: function (a) { this.volume = a }, stop: function () { this.pause() }, setSrc: function (a) { for (var b = this.getElementsByTagName("source") ; b.length > 0;) this.removeChild(b[0]); if (typeof a == "string") this.src = a; else { var c; for (b = 0; b < a.length; b++) { c = a[b]; if (this.canPlayType(c.type)) { this.src = c.src; break } } } }, setVideoSize: function (a, b) { this.width = a; this.height = b } };
mejs.PluginMediaElement = function (a, b, c) { this.id = a; this.pluginType = b; this.src = c; this.events = {}; this.attributes = {} };
mejs.PluginMediaElement.prototype = {
    pluginElement: null, pluginType: "", isFullScreen: false, playbackRate: -1, defaultPlaybackRate: -1, seekable: [], played: [], paused: true, ended: false, seeking: false, duration: 0, error: null, tagName: "", muted: false, volume: 1, currentTime: 0, play: function () { if (this.pluginApi != null) { this.pluginType == "youtube" ? this.pluginApi.playVideo() : this.pluginApi.playMedia(); this.paused = false } }, load: function () {
        if (this.pluginApi != null) {
            this.pluginType != "youtube" && this.pluginApi.loadMedia(); this.paused =
            false
        }
    }, pause: function () { if (this.pluginApi != null) { this.pluginType == "youtube" ? this.pluginApi.pauseVideo() : this.pluginApi.pauseMedia(); this.paused = true } }, stop: function () { if (this.pluginApi != null) { this.pluginType == "youtube" ? this.pluginApi.stopVideo() : this.pluginApi.stopMedia(); this.paused = true } }, canPlayType: function (a) { var b, c, d, e = mejs.plugins[this.pluginType]; for (b = 0; b < e.length; b++) { d = e[b]; if (mejs.PluginDetector.hasPluginVersion(this.pluginType, d.version)) for (c = 0; c < d.types.length; c++) if (a == d.types[c]) return "probably" } return "" },
    positionFullscreenButton: function (a, b, c) { this.pluginApi != null && this.pluginApi.positionFullscreenButton && this.pluginApi.positionFullscreenButton(a, b, c) }, hideFullscreenButton: function () { this.pluginApi != null && this.pluginApi.hideFullscreenButton && this.pluginApi.hideFullscreenButton() }, setSrc: function (a) {
        if (typeof a == "string") { this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(a)); this.src = mejs.Utility.absolutizeUrl(a) } else {
            var b, c; for (b = 0; b < a.length; b++) {
                c = a[b]; if (this.canPlayType(c.type)) {
                    this.pluginApi.setSrc(mejs.Utility.absolutizeUrl(c.src));
                    this.src = mejs.Utility.absolutizeUrl(a); break
                }
            }
        }
    }, setCurrentTime: function (a) { if (this.pluginApi != null) { this.pluginType == "youtube" ? this.pluginApi.seekTo(a) : this.pluginApi.setCurrentTime(a); this.currentTime = a } }, setVolume: function (a) { if (this.pluginApi != null) { this.pluginType == "youtube" ? this.pluginApi.setVolume(a * 100) : this.pluginApi.setVolume(a); this.volume = a } }, setMuted: function (a) {
        if (this.pluginApi != null) {
            if (this.pluginType == "youtube") { a ? this.pluginApi.mute() : this.pluginApi.unMute(); this.muted = a; this.dispatchEvent("volumechange") } else this.pluginApi.setMuted(a);
            this.muted = a
        }
    }, setVideoSize: function (a, b) { if (this.pluginElement.style) { this.pluginElement.style.width = a + "px"; this.pluginElement.style.height = b + "px" } this.pluginApi != null && this.pluginApi.setVideoSize && this.pluginApi.setVideoSize(a, b) }, setFullscreen: function (a) { this.pluginApi != null && this.pluginApi.setFullscreen && this.pluginApi.setFullscreen(a) }, enterFullScreen: function () { this.pluginApi != null && this.pluginApi.setFullscreen && this.setFullscreen(true) }, exitFullScreen: function () {
        this.pluginApi != null && this.pluginApi.setFullscreen &&
        this.setFullscreen(false)
    }, addEventListener: function (a, b) { this.events[a] = this.events[a] || []; this.events[a].push(b) }, removeEventListener: function (a, b) { if (!a) { this.events = {}; return true } var c = this.events[a]; if (!c) return true; if (!b) { this.events[a] = []; return true } for (i = 0; i < c.length; i++) if (c[i] === b) { this.events[a].splice(i, 1); return true } return false }, dispatchEvent: function (a) { var b, c, d = this.events[a]; if (d) { c = Array.prototype.slice.call(arguments, 1); for (b = 0; b < d.length; b++) d[b].apply(null, c) } }, hasAttribute: function (a) {
        return a in
        this.attributes
    }, removeAttribute: function (a) { delete this.attributes[a] }, getAttribute: function (a) { if (this.hasAttribute(a)) return this.attributes[a]; return "" }, setAttribute: function (a, b) { this.attributes[a] = b }, remove: function () { mejs.Utility.removeSwf(this.pluginElement.id); mejs.MediaPluginBridge.unregisterPluginElement(this.pluginElement.id) }
};
mejs.MediaPluginBridge = {
    pluginMediaElements: {}, htmlMediaElements: {}, registerPluginElement: function (a, b, c) { this.pluginMediaElements[a] = b; this.htmlMediaElements[a] = c }, unregisterPluginElement: function (a) { delete this.pluginMediaElements[a]; delete this.htmlMediaElements[a] }, initPlugin: function (a) {
        var b = this.pluginMediaElements[a], c = this.htmlMediaElements[a]; if (b) {
            switch (b.pluginType) {
                case "flash": b.pluginElement = b.pluginApi = document.getElementById(a); break; case "silverlight": b.pluginElement = document.getElementById(b.id);
                    b.pluginApi = b.pluginElement.Content.MediaElementJS
            } b.pluginApi != null && b.success && b.success(b, c)
        }
    }, fireEvent: function (a, b, c) { var d, e; a = this.pluginMediaElements[a]; b = { type: b, target: a }; for (d in c) { a[d] = c[d]; b[d] = c[d] } e = c.bufferedTime || 0; b.target.buffered = b.buffered = { start: function () { return 0 }, end: function () { return e }, length: 1 }; a.dispatchEvent(b.type, b) }
};
mejs.MediaElementDefaults = {
    mode: "auto", plugins: ["flash", "silverlight", "youtube", "vimeo"], enablePluginDebug: false, type: "", pluginPath: mejs.Utility.getScriptPath(["mediaelement.js", "mediaelement.min.js", "mediaelement-and-player.js", "mediaelement-and-player.min.js"]), flashName: "flashmediaelement.swf", flashStreamer: "", enablePluginSmoothing: false, enablePseudoStreaming: false, pseudoStreamingStartQueryParam: "start", silverlightName: "silverlightmediaelement.xap", defaultVideoWidth: 480, defaultVideoHeight: 270,
    pluginWidth: -1, pluginHeight: -1, pluginVars: [], timerRate: 250, startVolume: 0.8, success: function () { }, error: function () { }
}; mejs.MediaElement = function (a, b) { return mejs.HtmlMediaElementShim.create(a, b) };
mejs.HtmlMediaElementShim = {
    create: function (a, b) {
        var c = mejs.MediaElementDefaults, d = typeof a == "string" ? document.getElementById(a) : a, e = d.tagName.toLowerCase(), f = e === "audio" || e === "video", g = f ? d.getAttribute("src") : d.getAttribute("href"); e = d.getAttribute("poster"); var h = d.getAttribute("autoplay"), l = d.getAttribute("preload"), j = d.getAttribute("controls"), k; for (k in b) c[k] = b[k]; g = typeof g == "undefined" || g === null || g == "" ? null : g; e = typeof e == "undefined" || e === null ? "" : e; l = typeof l == "undefined" || l === null || l === "false" ?
        "none" : l; h = !(typeof h == "undefined" || h === null || h === "false"); j = !(typeof j == "undefined" || j === null || j === "false"); k = this.determinePlayback(d, c, mejs.MediaFeatures.supportsMediaTag, f, g); k.url = k.url !== null ? mejs.Utility.absolutizeUrl(k.url) : ""; if (k.method == "native") { if (mejs.MediaFeatures.isBustedAndroid) { d.src = k.url; d.addEventListener("click", function () { d.play() }, false) } return this.updateNative(k, c, h, l) } else if (k.method !== "") return this.createPlugin(k, c, e, h, l, j); else { this.createErrorMessage(k, c, e); return this }
    },
    determinePlayback: function (a, b, c, d, e) {
        var f = [], g, h, l, j = { method: "", url: "", htmlMediaElement: a, isVideo: a.tagName.toLowerCase() != "audio" }, k; if (typeof b.type != "undefined" && b.type !== "") if (typeof b.type == "string") f.push({ type: b.type, url: e }); else for (g = 0; g < b.type.length; g++) f.push({ type: b.type[g], url: e }); else if (e !== null) { l = this.formatType(e, a.getAttribute("type")); f.push({ type: l, url: e }) } else for (g = 0; g < a.childNodes.length; g++) {
            h = a.childNodes[g]; if (h.nodeType == 1 && h.tagName.toLowerCase() == "source") {
                e = h.getAttribute("src");
                l = this.formatType(e, h.getAttribute("type")); h = h.getAttribute("media"); if (!h || !window.matchMedia || window.matchMedia && window.matchMedia(h).matches) f.push({ type: l, url: e })
            }
        } if (!d && f.length > 0 && f[0].url !== null && this.getTypeFromFile(f[0].url).indexOf("audio") > -1) j.isVideo = false; if (mejs.MediaFeatures.isBustedAndroid) a.canPlayType = function (m) { return m.match(/video\/(mp4|m4v)/gi) !== null ? "maybe" : "" }; if (c && (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "native") && !mejs.MediaFeatures.isBustedNativeHTTPS) {
            if (!d) {
                g =
                document.createElement(j.isVideo ? "video" : "audio"); a.parentNode.insertBefore(g, a); a.style.display = "none"; j.htmlMediaElement = a = g
            } for (g = 0; g < f.length; g++) if (a.canPlayType(f[g].type).replace(/no/, "") !== "" || a.canPlayType(f[g].type.replace(/mp3/, "mpeg")).replace(/no/, "") !== "") { j.method = "native"; j.url = f[g].url; break } if (j.method === "native") { if (j.url !== null) a.src = j.url; if (b.mode !== "auto_plugin") return j }
        } if (b.mode === "auto" || b.mode === "auto_plugin" || b.mode === "shim") for (g = 0; g < f.length; g++) {
            l = f[g].type; for (a = 0; a <
            b.plugins.length; a++) { e = b.plugins[a]; h = mejs.plugins[e]; for (c = 0; c < h.length; c++) { k = h[c]; if (k.version == null || mejs.PluginDetector.hasPluginVersion(e, k.version)) for (d = 0; d < k.types.length; d++) if (l == k.types[d]) { j.method = e; j.url = f[g].url; return j } } }
        } if (b.mode === "auto_plugin" && j.method === "native") return j; if (j.method === "" && f.length > 0) j.url = f[0].url; return j
    }, formatType: function (a, b) { return a && !b ? this.getTypeFromFile(a) : b && ~b.indexOf(";") ? b.substr(0, b.indexOf(";")) : b }, getTypeFromFile: function (a) {
        a = a.split("?")[0];
        a = a.substring(a.lastIndexOf(".") + 1).toLowerCase(); return (/(mp4|m4v|ogg|ogv|webm|webmv|flv|wmv|mpeg|mov)/gi.test(a) ? "video" : "audio") + "/" + this.getTypeFromExtension(a)
    }, getTypeFromExtension: function (a) { switch (a) { case "mp4": case "m4v": return "mp4"; case "webm": case "webma": case "webmv": return "webm"; case "ogg": case "oga": case "ogv": return "ogg"; default: return a } }, createErrorMessage: function (a, b, c) {
        var d = a.htmlMediaElement, e = document.createElement("div"); e.className = "me-cannotplay"; try {
            e.style.width = d.width +
            "px"; e.style.height = d.height + "px"
        } catch (f) { } e.innerHTML = b.customError ? b.customError : c !== "" ? '<a href="' + a.url + '"><img src="' + c + '" width="100%" height="100%" /></a>' : '<a href="' + a.url + '"><span>' + mejs.i18n.t("Download File") + "</span></a>"; d.parentNode.insertBefore(e, d); d.style.display = "none"; b.error(d)
    }, createPlugin: function (a, b, c, d, e, f) {
        c = a.htmlMediaElement; var g = 1, h = 1, l = "me_" + a.method + "_" + mejs.meIndex++, j = new mejs.PluginMediaElement(l, a.method, a.url), k = document.createElement("div"), m; j.tagName = c.tagName;
        for (m = 0; m < c.attributes.length; m++) { var n = c.attributes[m]; n.specified == true && j.setAttribute(n.name, n.value) } for (m = c.parentNode; m !== null && m.tagName.toLowerCase() != "body";) { if (m.parentNode.tagName.toLowerCase() == "p") { m.parentNode.parentNode.insertBefore(m, m.parentNode); break } m = m.parentNode } if (a.isVideo) {
            g = b.pluginWidth > 0 ? b.pluginWidth : b.videoWidth > 0 ? b.videoWidth : c.getAttribute("width") !== null ? c.getAttribute("width") : b.defaultVideoWidth; h = b.pluginHeight > 0 ? b.pluginHeight : b.videoHeight > 0 ? b.videoHeight :
            c.getAttribute("height") !== null ? c.getAttribute("height") : b.defaultVideoHeight; g = mejs.Utility.encodeUrl(g); h = mejs.Utility.encodeUrl(h)
        } else if (b.enablePluginDebug) { g = 320; h = 240 } j.success = b.success; mejs.MediaPluginBridge.registerPluginElement(l, j, c); k.className = "me-plugin"; k.id = l + "_container"; a.isVideo ? c.parentNode.insertBefore(k, c) : document.body.insertBefore(k, document.body.childNodes[0]); d = ["id=" + l, "isvideo=" + (a.isVideo ? "true" : "false"), "autoplay=" + (d ? "true" : "false"), "preload=" + e, "width=" + g, "startvolume=" +
        b.startVolume, "timerrate=" + b.timerRate, "flashstreamer=" + b.flashStreamer, "height=" + h, "pseudostreamstart=" + b.pseudoStreamingStartQueryParam]; if (a.url !== null) a.method == "flash" ? d.push("file=" + mejs.Utility.encodeUrl(a.url)) : d.push("file=" + a.url); b.enablePluginDebug && d.push("debug=true"); b.enablePluginSmoothing && d.push("smoothing=true"); b.enablePseudoStreaming && d.push("pseudostreaming=true"); f && d.push("controls=true"); if (b.pluginVars) d = d.concat(b.pluginVars); switch (a.method) {
            case "silverlight": k.innerHTML =
            '<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" id="' + l + '" name="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="initParams" value="' + d.join(",") + '" /><param name="windowless" value="true" /><param name="background" value="black" /><param name="minRuntimeVersion" value="3.0.0.0" /><param name="autoUpgrade" value="true" /><param name="source" value="' + b.pluginPath + b.silverlightName + '" /></object>'; break; case "flash": if (mejs.MediaFeatures.isIE) {
                a =
                document.createElement("div"); k.appendChild(a); a.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + l + '" width="' + g + '" height="' + h + '" class="mejs-shim"><param name="movie" value="' + b.pluginPath + b.flashName + "?x=" + new Date + '" /><param name="flashvars" value="' + d.join("&amp;") + '" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
            } else k.innerHTML =
            '<embed id="' + l + '" name="' + l + '" play="true" loop="false" quality="high" bgcolor="#000000" wmode="transparent" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="//www.macromedia.com/go/getflashplayer" src="' + b.pluginPath + b.flashName + '" flashvars="' + d.join("&") + '" width="' + g + '" height="' + h + '" class="mejs-shim"></embed>'; break; case "youtube": b = a.url.substr(a.url.lastIndexOf("=") + 1); youtubeSettings = {
                container: k, containerId: k.id, pluginMediaElement: j, pluginId: l,
                videoId: b, height: h, width: g
            }; mejs.PluginDetector.hasPluginVersion("flash", [10, 0, 0]) ? mejs.YouTubeApi.createFlash(youtubeSettings) : mejs.YouTubeApi.enqueueIframe(youtubeSettings); break; case "vimeo": j.vimeoid = a.url.substr(a.url.lastIndexOf("/") + 1); k.innerHTML = '<iframe src="http://player.vimeo.com/video/' + j.vimeoid + '?portrait=0&byline=0&title=0" width="' + g + '" height="' + h + '" frameborder="0" class="mejs-shim"></iframe>'
        } c.style.display = "none"; return j
    }, updateNative: function (a, b) {
        var c = a.htmlMediaElement,
        d; for (d in mejs.HtmlMediaElement) c[d] = mejs.HtmlMediaElement[d]; b.success(c, c); return c
    }
};
mejs.YouTubeApi = {
    isIframeStarted: false, isIframeLoaded: false, loadIframeApi: function () { if (!this.isIframeStarted) { var a = document.createElement("script"); a.src = "//www.youtube.com/player_api"; var b = document.getElementsByTagName("script")[0]; b.parentNode.insertBefore(a, b); this.isIframeStarted = true } }, iframeQueue: [], enqueueIframe: function (a) { if (this.isLoaded) this.createIframe(a); else { this.loadIframeApi(); this.iframeQueue.push(a) } }, createIframe: function (a) {
        var b = a.pluginMediaElement, c = new YT.Player(a.containerId,
        { height: a.height, width: a.width, videoId: a.videoId, playerVars: { controls: 0 }, events: { onReady: function () { a.pluginMediaElement.pluginApi = c; mejs.MediaPluginBridge.initPlugin(a.pluginId); setInterval(function () { mejs.YouTubeApi.createEvent(c, b, "timeupdate") }, 250) }, onStateChange: function (d) { mejs.YouTubeApi.handleStateChange(d.data, c, b) } } })
    }, createEvent: function (a, b, c) {
        c = { type: c, target: b }; if (a && a.getDuration) {
            b.currentTime = c.currentTime = a.getCurrentTime(); b.duration = c.duration = a.getDuration(); c.paused = b.paused;
            c.ended = b.ended; c.muted = a.isMuted(); c.volume = a.getVolume() / 100; c.bytesTotal = a.getVideoBytesTotal(); c.bufferedBytes = a.getVideoBytesLoaded(); var d = c.bufferedBytes / c.bytesTotal * c.duration; c.target.buffered = c.buffered = { start: function () { return 0 }, end: function () { return d }, length: 1 }
        } b.dispatchEvent(c.type, c)
    }, iFrameReady: function () { for (this.isIframeLoaded = this.isLoaded = true; this.iframeQueue.length > 0;) this.createIframe(this.iframeQueue.pop()) }, flashPlayers: {}, createFlash: function (a) {
        this.flashPlayers[a.pluginId] =
        a; var b, c = "//www.youtube.com/apiplayer?enablejsapi=1&amp;playerapiid=" + a.pluginId + "&amp;version=3&amp;autoplay=0&amp;controls=0&amp;modestbranding=1&loop=0"; if (mejs.MediaFeatures.isIE) {
            b = document.createElement("div"); a.container.appendChild(b); b.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="//download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab" id="' + a.pluginId + '" width="' + a.width + '" height="' + a.height + '" class="mejs-shim"><param name="movie" value="' +
            c + '" /><param name="wmode" value="transparent" /><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="true" /></object>'
        } else a.container.innerHTML = '<object type="application/x-shockwave-flash" id="' + a.pluginId + '" data="' + c + '" width="' + a.width + '" height="' + a.height + '" style="visibility: visible; " class="mejs-shim"><param name="allowScriptAccess" value="always"><param name="wmode" value="transparent"></object>'
    }, flashReady: function (a) {
        var b = this.flashPlayers[a], c =
        document.getElementById(a), d = b.pluginMediaElement; d.pluginApi = d.pluginElement = c; mejs.MediaPluginBridge.initPlugin(a); c.cueVideoById(b.videoId); a = b.containerId + "_callback"; window[a] = function (e) { mejs.YouTubeApi.handleStateChange(e, c, d) }; c.addEventListener("onStateChange", a); setInterval(function () { mejs.YouTubeApi.createEvent(c, d, "timeupdate") }, 250)
    }, handleStateChange: function (a, b, c) {
        switch (a) {
            case -1: c.paused = true; c.ended = true; mejs.YouTubeApi.createEvent(b, c, "loadedmetadata"); break; case 0: c.paused = false;
                c.ended = true; mejs.YouTubeApi.createEvent(b, c, "ended"); break; case 1: c.paused = false; c.ended = false; mejs.YouTubeApi.createEvent(b, c, "play"); mejs.YouTubeApi.createEvent(b, c, "playing"); break; case 2: c.paused = true; c.ended = false; mejs.YouTubeApi.createEvent(b, c, "pause"); break; case 3: mejs.YouTubeApi.createEvent(b, c, "progress")
        }
    }
}; function onYouTubePlayerAPIReady() { mejs.YouTubeApi.iFrameReady() } function onYouTubePlayerReady(a) { mejs.YouTubeApi.flashReady(a) } window.mejs = mejs; window.MediaElement = mejs.MediaElement;
(function (a, b) {
    var c = { locale: { strings: {} }, methods: {} }; c.locale.getLanguage = function () { return { language: navigator.language } }; c.locale.INIT_LANGUAGE = c.locale.getLanguage(); c.methods.checkPlain = function (d) { var e, f, g = { "&": "&amp;", '"': "&quot;", "<": "&lt;", ">": "&gt;" }; d = String(d); for (e in g) if (g.hasOwnProperty(e)) { f = RegExp(e, "g"); d = d.replace(f, g[e]) } return d }; c.methods.formatString = function (d, e) {
        for (var f in e) {
            switch (f.charAt(0)) {
                case "@": e[f] = c.methods.checkPlain(e[f]); break; case "!": break; default: e[f] =
                '<em class="placeholder">' + c.methods.checkPlain(e[f]) + "</em>"
            } d = d.replace(f, e[f])
        } return d
    }; c.methods.t = function (d, e, f) { if (c.locale.strings && c.locale.strings[f.context] && c.locale.strings[f.context][d]) d = c.locale.strings[f.context][d]; if (e) d = c.methods.formatString(d, e); return d }; c.t = function (d, e, f) {
        if (typeof d === "string" && d.length > 0) { var g = c.locale.getLanguage(); f = f || { context: g.language }; return c.methods.t(d, e, f) } else throw { name: "InvalidArgumentException", message: "First argument is either not a string or empty." };
    }; b.i18n = c
})(document, mejs); (function (a) { a.de = { Fullscreen: "Vollbild", "Go Fullscreen": "Vollbild an", "Turn off Fullscreen": "Vollbild aus", Close: "Schlie\u00dfen" } })(mejs.i18n.locale.strings); (function (a) { a.zh = { Fullscreen: "\u5168\u87a2\u5e55", "Go Fullscreen": "\u5168\u5c4f\u6a21\u5f0f", "Turn off Fullscreen": "\u9000\u51fa\u5168\u5c4f\u6a21\u5f0f", Close: "\u95dc\u9589" } })(mejs.i18n.locale.strings);

if (typeof jQuery != "undefined") mejs.$ = jQuery; else if (typeof ender != "undefined") mejs.$ = ender;
(function (f) {
    mejs.MepDefaults = {
        poster: "", defaultVideoWidth: 480, defaultVideoHeight: 270, videoWidth: -1, videoHeight: -1, defaultAudioWidth: 400, defaultAudioHeight: 30, defaultSeekBackwardInterval: function (a) { return a.duration * 0.05 }, defaultSeekForwardInterval: function (a) { return a.duration * 0.05 }, audioWidth: -1, audioHeight: -1, startVolume: 0.8, loop: false, autoRewind: true, enableAutosize: true, alwaysShowHours: false, showTimecodeFrameCount: false, framesPerSecond: 25, autosizeProgress: true, alwaysShowControls: false, hideVideoControlsOnLoad: false,
        clickToPlayPause: true, iPadUseNativeControls: false, iPhoneUseNativeControls: false, AndroidUseNativeControls: false, features: ["playpause", "current", "progress", "duration", "tracks", "volume", "fullscreen"], isVideo: true, enableKeyboard: true, pauseOtherPlayers: true, keyActions: [{ keys: [32, 179], action: function (a, b) { b.paused || b.ended ? b.play() : b.pause() } }, { keys: [38], action: function (a, b) { b.setVolume(Math.min(b.volume + 0.1, 1)) } }, { keys: [40], action: function (a, b) { b.setVolume(Math.max(b.volume - 0.1, 0)) } }, {
            keys: [37, 227], action: function (a,
            b) { if (!isNaN(b.duration) && b.duration > 0) { if (a.isVideo) { a.showControls(); a.startControlsTimer() } var c = Math.max(b.currentTime - a.options.defaultSeekBackwardInterval(b), 0); b.setCurrentTime(c) } }
        }, { keys: [39, 228], action: function (a, b) { if (!isNaN(b.duration) && b.duration > 0) { if (a.isVideo) { a.showControls(); a.startControlsTimer() } var c = Math.min(b.currentTime + a.options.defaultSeekForwardInterval(b), b.duration); b.setCurrentTime(c) } } }, {
            keys: [70], action: function (a) {
                if (typeof a.enterFullScreen != "undefined") a.isFullScreen ?
                a.exitFullScreen() : a.enterFullScreen()
            }
        }]
    }; mejs.mepIndex = 0; mejs.players = {}; mejs.MediaElementPlayer = function (a, b) {
        if (!(this instanceof mejs.MediaElementPlayer)) return new mejs.MediaElementPlayer(a, b); this.$media = this.$node = f(a); this.node = this.media = this.$media[0]; if (typeof this.node.player != "undefined") return this.node.player; else this.node.player = this; if (typeof b == "undefined") b = this.$node.data("mejsoptions"); this.options = f.extend({}, mejs.MepDefaults, b); this.id = "mep_" + mejs.mepIndex++; mejs.players[this.id] =
        this; this.init(); return this
    }; mejs.MediaElementPlayer.prototype = {
        hasFocus: false, controlsAreVisible: true, init: function () {
            var a = this, b = mejs.MediaFeatures, c = f.extend(true, {}, a.options, { success: function (e, g) { a.meReady(e, g) }, error: function (e) { a.handleError(e) } }), d = a.media.tagName.toLowerCase(); a.isDynamic = d !== "audio" && d !== "video"; a.isVideo = a.isDynamic ? a.options.isVideo : d !== "audio" && a.options.isVideo; if (b.isiPad && a.options.iPadUseNativeControls || b.isiPhone && a.options.iPhoneUseNativeControls) {
                a.$media.attr("controls",
                "controls"); if (b.isiPad && a.media.getAttribute("autoplay") !== null) { a.media.load(); a.media.play() }
            } else if (!(b.isAndroid && a.options.AndroidUseNativeControls)) {
                a.$media.removeAttr("controls"); a.container = f('<div id="' + a.id + '" class="mejs-container ' + (mejs.MediaFeatures.svg ? "svg" : "no-svg") + '"><div class="mejs-inner"><div class="mejs-mediaelement"></div><div class="mejs-layers"></div><div class="mejs-controls"></div><div class="mejs-clear"></div></div></div>').addClass(a.$media[0].className).insertBefore(a.$media);
                a.container.addClass((b.isAndroid ? "mejs-android " : "") + (b.isiOS ? "mejs-ios " : "") + (b.isiPad ? "mejs-ipad " : "") + (b.isiPhone ? "mejs-iphone " : "") + (a.isVideo ? "mejs-video " : "mejs-audio ")); if (b.isiOS) { b = a.$media.clone(); a.container.find(".mejs-mediaelement").append(b); a.$media.remove(); a.$node = a.$media = b; a.node = a.media = b[0] } else a.container.find(".mejs-mediaelement").append(a.$media); a.controls = a.container.find(".mejs-controls"); a.layers = a.container.find(".mejs-layers"); b = a.isVideo ? "video" : "audio"; d = b.substring(0,
                1).toUpperCase() + b.substring(1); a.width = a.options[b + "Width"] > 0 || a.options[b + "Width"].toString().indexOf("%") > -1 ? a.options[b + "Width"] : a.media.style.width !== "" && a.media.style.width !== null ? a.media.style.width : a.media.getAttribute("width") !== null ? a.$media.attr("width") : a.options["default" + d + "Width"]; a.height = a.options[b + "Height"] > 0 || a.options[b + "Height"].toString().indexOf("%") > -1 ? a.options[b + "Height"] : a.media.style.height !== "" && a.media.style.height !== null ? a.media.style.height : a.$media[0].getAttribute("height") !==
                null ? a.$media.attr("height") : a.options["default" + d + "Height"]; a.setPlayerSize(a.width, a.height); c.pluginWidth = a.height; c.pluginHeight = a.width
            } mejs.MediaElementPlayer.prototype.clickToPlayPauseCallback = function () { if (a.options.clickToPlayPause) a.media.paused ? a.media.play() : a.media.pause() }; mejs.MediaElement(a.$media[0], c); typeof a.container != "undefined" && a.container.trigger("controlsshown")
        }, showControls: function (a) {
            var b = this; a = typeof a == "undefined" || a; if (!b.controlsAreVisible) {
                if (a) {
                    b.controls.css("visibility",
                    "visible").stop(true, true).fadeIn(200, function () { b.controlsAreVisible = true; b.container.trigger("controlsshown") }); b.container.find(".mejs-control").css("visibility", "visible").stop(true, true).fadeIn(200, function () { b.controlsAreVisible = true })
                } else { b.controls.css("visibility", "visible").css("display", "block"); b.container.find(".mejs-control").css("visibility", "visible").css("display", "block"); b.controlsAreVisible = true; b.container.trigger("controlsshown") } b.setControlsSize()
            }
        }, hideControls: function (a) {
            var b =
            this; a = typeof a == "undefined" || a; if (b.controlsAreVisible) if (a) { b.controls.stop(true, true).fadeOut(200, function () { f(this).css("visibility", "hidden").css("display", "block"); b.controlsAreVisible = false; b.container.trigger("controlshidden") }); b.container.find(".mejs-control").stop(true, true).fadeOut(200, function () { f(this).css("visibility", "hidden").css("display", "block") }) } else {
                b.controls.css("visibility", "hidden").css("display", "block"); b.container.find(".mejs-control").css("visibility", "hidden").css("display",
                "block"); b.controlsAreVisible = false; b.container.trigger("controlshidden")
            }
        }, controlsTimer: null, startControlsTimer: function (a) { var b = this; a = typeof a != "undefined" ? a : 1500; b.killControlsTimer("start"); b.controlsTimer = setTimeout(function () { b.hideControls(); b.killControlsTimer("hide") }, a) }, killControlsTimer: function () { if (this.controlsTimer !== null) { clearTimeout(this.controlsTimer); delete this.controlsTimer; this.controlsTimer = null } }, controlsEnabled: true, disableControls: function () {
            this.killControlsTimer();
            this.hideControls(false); this.controlsEnabled = false
        }, enableControls: function () { this.showControls(false); this.controlsEnabled = true }, meReady: function (a, b) {
            var c = this, d = mejs.MediaFeatures, e = b.getAttribute("autoplay"); e = !(typeof e == "undefined" || e === null || e === "false"); var g; if (!c.created) {
                c.created = true; c.media = a; c.domNode = b; if (!(d.isAndroid && c.options.AndroidUseNativeControls) && !(d.isiPad && c.options.iPadUseNativeControls) && !(d.isiPhone && c.options.iPhoneUseNativeControls)) {
                    c.buildposter(c, c.controls, c.layers,
                    c.media); c.buildkeyboard(c, c.controls, c.layers, c.media); c.buildoverlays(c, c.controls, c.layers, c.media); c.findTracks(); for (g in c.options.features) { d = c.options.features[g]; if (c["build" + d]) try { c["build" + d](c, c.controls, c.layers, c.media) } catch (k) { } } c.container.trigger("controlsready"); c.setPlayerSize(c.width, c.height); c.setControlsSize(); if (c.isVideo) {
                        if (mejs.MediaFeatures.hasTouch) c.$media.bind("touchstart", function () { if (c.controlsAreVisible) c.hideControls(false); else c.controlsEnabled && c.showControls(false) });
                        else { c.media.addEventListener("click", c.clickToPlayPauseCallback); c.container.bind("mouseenter mouseover", function () { if (c.controlsEnabled) if (!c.options.alwaysShowControls) { c.killControlsTimer("enter"); c.showControls(); c.startControlsTimer(2500) } }).bind("mousemove", function () { if (c.controlsEnabled) { c.controlsAreVisible || c.showControls(); c.options.alwaysShowControls || c.startControlsTimer(2500) } }).bind("mouseleave", function () { c.controlsEnabled && !c.media.paused && !c.options.alwaysShowControls && c.startControlsTimer(1E3) }) } c.options.hideVideoControlsOnLoad &&
                        c.hideControls(false); e && !c.options.alwaysShowControls && c.hideControls(); c.options.enableAutosize && c.media.addEventListener("loadedmetadata", function (j) { if (c.options.videoHeight <= 0 && c.domNode.getAttribute("height") === null && !isNaN(j.target.videoHeight)) { c.setPlayerSize(j.target.videoWidth, j.target.videoHeight); c.setControlsSize(); c.media.setVideoSize(j.target.videoWidth, j.target.videoHeight) } }, false)
                    } a.addEventListener("play", function () {
                        for (var j in mejs.players) {
                            var l = mejs.players[j]; l.id != c.id &&
                            c.options.pauseOtherPlayers && !l.paused && !l.ended && l.pause(); l.hasFocus = false
                        } c.hasFocus = true
                    }, false); c.media.addEventListener("ended", function () { if (c.options.autoRewind) try { c.media.setCurrentTime(0) } catch (j) { } c.media.pause(); c.setProgressRail && c.setProgressRail(); c.setCurrentRail && c.setCurrentRail(); if (c.options.loop) c.media.play(); else !c.options.alwaysShowControls && c.controlsEnabled && c.showControls() }, false); c.media.addEventListener("loadedmetadata", function () {
                        c.updateDuration && c.updateDuration();
                        c.updateCurrent && c.updateCurrent(); if (!c.isFullScreen) { c.setPlayerSize(c.width, c.height); c.setControlsSize() }
                    }, false); setTimeout(function () { c.setPlayerSize(c.width, c.height); c.setControlsSize() }, 50); c.globalBind("resize", function () { c.isFullScreen || mejs.MediaFeatures.hasTrueNativeFullScreen && document.webkitIsFullScreen || c.setPlayerSize(c.width, c.height); c.setControlsSize() }); c.media.pluginType == "youtube" && c.container.find(".mejs-overlay-play").hide()
                } if (e && a.pluginType == "native") { a.load(); a.play() } if (c.options.success) typeof c.options.success ==
                "string" ? window[c.options.success](c.media, c.domNode, c) : c.options.success(c.media, c.domNode, c)
            }
        }, handleError: function (a) { this.controls.hide(); this.options.error && this.options.error(a) }, setPlayerSize: function (a, b) {
            if (typeof a != "undefined") this.width = a; if (typeof b != "undefined") this.height = b; if (this.height.toString().indexOf("%") > 0 || this.$node.css("max-width") === "100%" || this.$node[0].currentStyle && this.$node[0].currentStyle.maxWidth === "100%") {
                var c = this.isVideo ? this.media.videoWidth && this.media.videoWidth >
                0 ? this.media.videoWidth : this.options.defaultVideoWidth : this.options.defaultAudioWidth, d = this.isVideo ? this.media.videoHeight && this.media.videoHeight > 0 ? this.media.videoHeight : this.options.defaultVideoHeight : this.options.defaultAudioHeight, e = this.container.parent().closest(":visible").width(); c = this.isVideo || !this.options.autosizeProgress ? parseInt(e * d / c, 10) : d; if (this.container.parent()[0].tagName.toLowerCase() === "body") { e = f(window).width(); c = f(window).height() } if (c != 0 && e != 0) {
                    this.container.width(e).height(c);
                    this.$media.add(this.container.find(".mejs-shim")).width("100%").height("100%"); this.isVideo && this.media.setVideoSize && this.media.setVideoSize(e, c); this.layers.children(".mejs-layer").width("100%").height("100%")
                }
            } else { this.container.width(this.width).height(this.height); this.layers.children(".mejs-layer").width(this.width).height(this.height) }
        }, setControlsSize: function () {
            var a = 0, b = 0, c = this.controls.find(".mejs-time-rail"), d = this.controls.find(".mejs-time-total"); this.controls.find(".mejs-time-current");
            this.controls.find(".mejs-time-loaded"); var e = c.siblings(); if (this.options && !this.options.autosizeProgress) b = parseInt(c.css("width")); if (b === 0 || !b) { e.each(function () { var g = f(this); if (g.css("position") != "absolute" && g.is(":visible")) a += f(this).outerWidth(true) }); b = this.controls.width() - a - (c.outerWidth(true) - c.width()) } c.width(b); d.width(b - (d.outerWidth(true) - d.width())); this.setProgressRail && this.setProgressRail(); this.setCurrentRail && this.setCurrentRail()
        }, buildposter: function (a, b, c, d) {
            var e = f('<div class="mejs-poster mejs-layer"></div>').appendTo(c);
            b = a.$media.attr("poster"); if (a.options.poster !== "") b = a.options.poster; b !== "" && b != null ? this.setPoster(b) : e.hide(); d.addEventListener("play", function () { e.hide() }, false)
        }, setPoster: function (a) { var b = this.container.find(".mejs-poster"), c = b.find("img"); if (c.length == 0) c = f('<img width="100%" height="100%" />').appendTo(b); c.attr("src", a); b.css({ "background-image": "url(" + a + ")" }) }, buildoverlays: function (a, b, c, d) {
            var e = this; if (a.isVideo) {
                var g = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-loading"><span></span></div></div>').hide().appendTo(c),
                k = f('<div class="mejs-overlay mejs-layer"><div class="mejs-overlay-error"></div></div>').hide().appendTo(c), j = f('<div class="mejs-overlay mejs-layer mejs-overlay-play"><div class="mejs-overlay-button"></div></div>').appendTo(c).click(function () { if (e.options.clickToPlayPause) d.paused ? d.play() : d.pause() }); d.addEventListener("play", function () { j.hide(); g.hide(); b.find(".mejs-time-buffering").hide(); k.hide() }, false); d.addEventListener("playing", function () {
                    j.hide(); g.hide(); b.find(".mejs-time-buffering").hide();
                    k.hide()
                }, false); d.addEventListener("seeking", function () { g.show(); b.find(".mejs-time-buffering").show() }, false); d.addEventListener("seeked", function () { g.hide(); b.find(".mejs-time-buffering").hide() }, false); d.addEventListener("pause", function () { mejs.MediaFeatures.isiPhone || j.show() }, false); d.addEventListener("waiting", function () { g.show(); b.find(".mejs-time-buffering").show() }, false); d.addEventListener("loadeddata", function () { g.show(); b.find(".mejs-time-buffering").show() }, false); d.addEventListener("canplay",
                function () { g.hide(); b.find(".mejs-time-buffering").hide() }, false); d.addEventListener("error", function () { g.hide(); b.find(".mejs-time-buffering").hide(); k.show(); k.find("mejs-overlay-error").html("Error loading this resource") }, false)
            }
        }, buildkeyboard: function (a, b, c, d) {
            this.globalBind("keydown", function (e) {
                if (a.hasFocus && a.options.enableKeyboard) for (var g = 0, k = a.options.keyActions.length; g < k; g++) for (var j = a.options.keyActions[g], l = 0, q = j.keys.length; l < q; l++) if (e.keyCode == j.keys[l]) {
                    e.preventDefault();
                    j.action(a, d, e.keyCode); return false
                } return true
            }); this.globalBind("click", function (e) { if (f(e.target).closest(".mejs-container").length == 0) a.hasFocus = false })
        }, findTracks: function () { var a = this, b = a.$media.find("track"); a.tracks = []; b.each(function (c, d) { d = f(d); a.tracks.push({ srclang: d.attr("srclang") ? d.attr("srclang").toLowerCase() : "", src: d.attr("src"), kind: d.attr("kind"), label: d.attr("label") || "", entries: [], isLoaded: false }) }) }, changeSkin: function (a) {
            this.container[0].className = "mejs-container " + a; this.setPlayerSize(this.width,
            this.height); this.setControlsSize()
        }, play: function () { this.media.play() }, pause: function () { this.media.pause() }, load: function () { this.media.load() }, setMuted: function (a) { this.media.setMuted(a) }, setCurrentTime: function (a) { this.media.setCurrentTime(a) }, getCurrentTime: function () { return this.media.currentTime }, setVolume: function (a) { this.media.setVolume(a) }, getVolume: function () { return this.media.volume }, setSrc: function (a) { this.media.setSrc(a) }, remove: function () {
            var a, b; for (a in this.options.features) {
                b = this.options.features[a];
                if (this["clean" + b]) try { this["clean" + b](this) } catch (c) { }
            } this.media.pluginType === "native" ? this.$media.prop("controls", true) : this.media.remove(); this.isDynamic || this.$node.insertBefore(this.container); delete mejs.players[this.id]; this.container.remove(); this.globalUnbind(); delete this.node.player
        }
    }; (function () {
        function a(c, d) { var e = { d: [], w: [] }; f.each((c || "").split(" "), function (g, k) { e[b.test(k) ? "w" : "d"].push(k + "." + d) }); e.d = e.d.join(" "); e.w = e.w.join(" "); return e } var b = /^((after|before)print|(before)?unload|hashchange|message|o(ff|n)line|page(hide|show)|popstate|resize|storage)\b/;
        mejs.MediaElementPlayer.prototype.globalBind = function (c, d, e) { c = a(c, this.id); c.d && f(document).bind(c.d, d, e); c.w && f(window).bind(c.w, d, e) }; mejs.MediaElementPlayer.prototype.globalUnbind = function (c, d) { c = a(c, this.id); c.d && f(document).unbind(c.d, d); c.w && f(window).unbind(c.w, d) }
    })(); if (typeof jQuery != "undefined") jQuery.fn.mediaelementplayer = function (a) {
        a === false ? this.each(function () { var b = jQuery(this).data("mediaelementplayer"); b && b.remove(); jQuery(this).removeData("mediaelementplayer") }) : this.each(function () {
            jQuery(this).data("mediaelementplayer",
            new mejs.MediaElementPlayer(this, a))
        }); return this
    }; f(document).ready(function () { f(".mejs-player").mediaelementplayer() }); window.MediaElementPlayer = mejs.MediaElementPlayer
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { playpauseText: "Play/Pause" }); f.extend(MediaElementPlayer.prototype, {
        buildplaypause: function (a, b, c, d) {
            var e = f('<div class="mejs-button mejs-playpause-button mejs-play" ><button type="button" aria-controls="' + this.id + '" title="' + this.options.playpauseText + '" aria-label="' + this.options.playpauseText + '"></button></div>').appendTo(b).click(function (g) { g.preventDefault(); d.paused ? d.play() : d.pause(); return false }); d.addEventListener("play", function () { e.removeClass("mejs-play").addClass("mejs-pause") },
            false); d.addEventListener("playing", function () { e.removeClass("mejs-play").addClass("mejs-pause") }, false); d.addEventListener("pause", function () { e.removeClass("mejs-pause").addClass("mejs-play") }, false); d.addEventListener("paused", function () { e.removeClass("mejs-pause").addClass("mejs-play") }, false)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { stopText: "Stop" }); f.extend(MediaElementPlayer.prototype, {
        buildstop: function (a, b, c, d) {
            f('<div class="mejs-button mejs-stop-button mejs-stop"><button type="button" aria-controls="' + this.id + '" title="' + this.options.stopText + '" aria-label="' + this.options.stopText + '"></button></div>').appendTo(b).click(function () {
                d.paused || d.pause(); if (d.currentTime > 0) {
                    d.setCurrentTime(0); d.pause(); b.find(".mejs-time-current").width("0px"); b.find(".mejs-time-handle").css("left",
                    "0px"); b.find(".mejs-time-float-current").html(mejs.Utility.secondsToTimeCode(0)); b.find(".mejs-currenttime").html(mejs.Utility.secondsToTimeCode(0)); c.find(".mejs-poster").show()
                }
            })
        }
    })
})(mejs.$);
(function (f) {
    f.extend(MediaElementPlayer.prototype, {
        buildprogress: function (a, b, c, d) {
            f('<div class="mejs-time-rail"><span class="mejs-time-total"><span class="mejs-time-buffering"></span><span class="mejs-time-loaded"></span><span class="mejs-time-current"></span><span class="mejs-time-handle"></span><span class="mejs-time-float"><span class="mejs-time-float-current">00:00</span><span class="mejs-time-float-corner"></span></span></span></div>').appendTo(b); b.find(".mejs-time-buffering").hide(); var e =
            this, g = b.find(".mejs-time-total"); c = b.find(".mejs-time-loaded"); var k = b.find(".mejs-time-current"), j = b.find(".mejs-time-handle"), l = b.find(".mejs-time-float"), q = b.find(".mejs-time-float-current"), p = function (h) {
                h = h.pageX; var m = g.offset(), r = g.outerWidth(true), n = 0, o = n = 0; if (d.duration) {
                    if (h < m.left) h = m.left; else if (h > r + m.left) h = r + m.left; o = h - m.left; n = o / r; n = n <= 0.02 ? 0 : n * d.duration; t && n !== d.currentTime && d.setCurrentTime(n); if (!mejs.MediaFeatures.hasTouch) {
                        l.css("left", o); q.html(mejs.Utility.secondsToTimeCode(n));
                        l.show()
                    }
                }
            }, t = false; g.bind("mousedown", function (h) { if (h.which === 1) { t = true; p(h); e.globalBind("mousemove.dur", function (m) { p(m) }); e.globalBind("mouseup.dur", function () { t = false; l.hide(); e.globalUnbind(".dur") }); return false } }).bind("mouseenter", function () { e.globalBind("mousemove.dur", function (h) { p(h) }); mejs.MediaFeatures.hasTouch || l.show() }).bind("mouseleave", function () { if (!t) { e.globalUnbind(".dur"); l.hide() } }); d.addEventListener("progress", function (h) { a.setProgressRail(h); a.setCurrentRail(h) }, false);
            d.addEventListener("timeupdate", function (h) { a.setProgressRail(h); a.setCurrentRail(h) }, false); e.loaded = c; e.total = g; e.current = k; e.handle = j
        }, setProgressRail: function (a) {
            var b = a != undefined ? a.target : this.media, c = null; if (b && b.buffered && b.buffered.length > 0 && b.buffered.end && b.duration) c = b.buffered.end(0) / b.duration; else if (b && b.bytesTotal != undefined && b.bytesTotal > 0 && b.bufferedBytes != undefined) c = b.bufferedBytes / b.bytesTotal; else if (a && a.lengthComputable && a.total != 0) c = a.loaded / a.total; if (c !== null) {
                c = Math.min(1,
                Math.max(0, c)); this.loaded && this.total && this.loaded.width(this.total.width() * c)
            }
        }, setCurrentRail: function () { if (this.media.currentTime != undefined && this.media.duration) if (this.total && this.handle) { var a = Math.round(this.total.width() * this.media.currentTime / this.media.duration), b = a - Math.round(this.handle.outerWidth(true) / 2); this.current.width(a); this.handle.css("left", b) } }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { duration: -1, timeAndDurationSeparator: " <span> | </span> " }); f.extend(MediaElementPlayer.prototype, {
        buildcurrent: function (a, b, c, d) { f('<div class="mejs-time"><span class="mejs-currenttime">' + (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00") + "</span></div>").appendTo(b); this.currenttime = this.controls.find(".mejs-currenttime"); d.addEventListener("timeupdate", function () { a.updateCurrent() }, false) }, buildduration: function (a,
        b, c, d) {
            if (b.children().last().find(".mejs-currenttime").length > 0) f(this.options.timeAndDurationSeparator + '<span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span>").appendTo(b.find(".mejs-time")); else {
                b.find(".mejs-currenttime").parent().addClass("mejs-currenttime-container");
                f('<div class="mejs-time mejs-duration-container"><span class="mejs-duration">' + (this.options.duration > 0 ? mejs.Utility.secondsToTimeCode(this.options.duration, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25) : (a.options.alwaysShowHours ? "00:" : "") + (a.options.showTimecodeFrameCount ? "00:00:00" : "00:00")) + "</span></div>").appendTo(b)
            } this.durationD = this.controls.find(".mejs-duration"); d.addEventListener("timeupdate", function () { a.updateDuration() },
            false)
        }, updateCurrent: function () { if (this.currenttime) this.currenttime.html(mejs.Utility.secondsToTimeCode(this.media.currentTime, this.options.alwaysShowHours || this.media.duration > 3600, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25)) }, updateDuration: function () {
            this.container.toggleClass("mejs-long-video", this.media.duration > 3600); if (this.durationD && (this.options.duration > 0 || this.media.duration)) this.durationD.html(mejs.Utility.secondsToTimeCode(this.options.duration > 0 ? this.options.duration :
            this.media.duration, this.options.alwaysShowHours, this.options.showTimecodeFrameCount, this.options.framesPerSecond || 25))
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { muteText: "Mute Toggle", hideVolumeOnTouchDevices: true, audioVolume: "horizontal", videoVolume: "vertical" }); f.extend(MediaElementPlayer.prototype, {
        buildvolume: function (a, b, c, d) {
            if (!(mejs.MediaFeatures.hasTouch && this.options.hideVolumeOnTouchDevices)) {
                var e = this, g = e.isVideo ? e.options.videoVolume : e.options.audioVolume, k = g == "horizontal" ? f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + e.id + '" title="' + e.options.muteText +
                '" aria-label="' + e.options.muteText + '"></button></div><div class="mejs-horizontal-volume-slider"><div class="mejs-horizontal-volume-total"></div><div class="mejs-horizontal-volume-current"></div><div class="mejs-horizontal-volume-handle"></div></div>').appendTo(b) : f('<div class="mejs-button mejs-volume-button mejs-mute"><button type="button" aria-controls="' + e.id + '" title="' + e.options.muteText + '" aria-label="' + e.options.muteText + '"></button><div class="mejs-volume-slider"><div class="mejs-volume-total"></div><div class="mejs-volume-current"></div><div class="mejs-volume-handle"></div></div></div>').appendTo(b),
                j = e.container.find(".mejs-volume-slider, .mejs-horizontal-volume-slider"), l = e.container.find(".mejs-volume-total, .mejs-horizontal-volume-total"), q = e.container.find(".mejs-volume-current, .mejs-horizontal-volume-current"), p = e.container.find(".mejs-volume-handle, .mejs-horizontal-volume-handle"), t = function (n, o) {
                    if (!j.is(":visible") && typeof o == "undefined") { j.show(); t(n, true); j.hide() } else {
                        n = Math.max(0, n); n = Math.min(n, 1); n == 0 ? k.removeClass("mejs-mute").addClass("mejs-unmute") : k.removeClass("mejs-unmute").addClass("mejs-mute");
                        if (g == "vertical") { var s = l.height(), u = l.position(), v = s - s * n; p.css("top", Math.round(u.top + v - p.height() / 2)); q.height(s - v); q.css("top", u.top + v) } else { s = l.width(); u = l.position(); s = s * n; p.css("left", Math.round(u.left + s - p.width() / 2)); q.width(Math.round(s)) }
                    }
                }, h = function (n) {
                    var o = null, s = l.offset(); if (g == "vertical") { o = l.height(); parseInt(l.css("top").replace(/px/, ""), 10); o = (o - (n.pageY - s.top)) / o; if (s.top == 0 || s.left == 0) return } else { o = l.width(); o = (n.pageX - s.left) / o } o = Math.max(0, o); o = Math.min(o, 1); t(o); o == 0 ? d.setMuted(true) :
                    d.setMuted(false); d.setVolume(o)
                }, m = false, r = false; k.hover(function () { j.show(); r = true }, function () { r = false; !m && g == "vertical" && j.hide() }); j.bind("mouseover", function () { r = true }).bind("mousedown", function (n) { h(n); e.globalBind("mousemove.vol", function (o) { h(o) }); e.globalBind("mouseup.vol", function () { m = false; e.globalUnbind(".vol"); !r && g == "vertical" && j.hide() }); m = true; return false }); k.find("button").click(function () { d.setMuted(!d.muted) }); d.addEventListener("volumechange", function () {
                    if (!m) if (d.muted) {
                        t(0);
                        k.removeClass("mejs-mute").addClass("mejs-unmute")
                    } else { t(d.volume); k.removeClass("mejs-unmute").addClass("mejs-mute") }
                }, false); if (e.container.is(":visible")) { t(a.options.startVolume); a.options.startVolume === 0 && d.setMuted(true); d.pluginType === "native" && d.setVolume(a.options.startVolume) }
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { usePluginFullScreen: true, newWindowCallback: function () { return "" }, fullscreenText: mejs.i18n.t("Fullscreen") }); f.extend(MediaElementPlayer.prototype, {
        isFullScreen: false, isNativeFullScreen: false, docStyleOverflow: null, isInIframe: false, buildfullscreen: function (a, b, c, d) {
            if (a.isVideo) {
                a.isInIframe = window.location != window.parent.location; if (mejs.MediaFeatures.hasTrueNativeFullScreen) {
                    c = function () {
                        if (mejs.MediaFeatures.isFullScreen()) { a.isNativeFullScreen = true; a.setControlsSize() } else {
                            a.isNativeFullScreen =
                            false; a.exitFullScreen()
                        }
                    }; mejs.MediaFeatures.hasMozNativeFullScreen ? a.globalBind(mejs.MediaFeatures.fullScreenEventName, c) : a.container.bind(mejs.MediaFeatures.fullScreenEventName, c)
                } var e = this, g = f('<div class="mejs-button mejs-fullscreen-button"><button type="button" aria-controls="' + e.id + '" title="' + e.options.fullscreenText + '" aria-label="' + e.options.fullscreenText + '"></button></div>').appendTo(b); if (e.media.pluginType === "native" || !e.options.usePluginFullScreen && !mejs.MediaFeatures.isFirefox) g.click(function () {
                    mejs.MediaFeatures.hasTrueNativeFullScreen &&
                    mejs.MediaFeatures.isFullScreen() || a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen()
                }); else {
                    var k = null; if (function () { var h = document.createElement("x"), m = document.documentElement, r = window.getComputedStyle; if (!("pointerEvents" in h.style)) return false; h.style.pointerEvents = "auto"; h.style.pointerEvents = "x"; m.appendChild(h); r = r && r(h, "").pointerEvents === "auto"; m.removeChild(h); return !!r }() && !mejs.MediaFeatures.isOpera) {
                        var j = false, l = function () {
                            if (j) {
                                for (var h in q) q[h].hide(); g.css("pointer-events",
                                ""); e.controls.css("pointer-events", ""); e.media.removeEventListener("click", e.clickToPlayPauseCallback); j = false
                            }
                        }, q = {}; b = ["top", "left", "right", "bottom"]; var p, t = function () {
                            var h = g.offset().left - e.container.offset().left, m = g.offset().top - e.container.offset().top, r = g.outerWidth(true), n = g.outerHeight(true), o = e.container.width(), s = e.container.height(); for (p in q) q[p].css({ position: "absolute", top: 0, left: 0 }); q.top.width(o).height(m); q.left.width(h).height(n).css({ top: m }); q.right.width(o - h - r).height(n).css({
                                top: m,
                                left: h + r
                            }); q.bottom.width(o).height(s - n - m).css({ top: m + n })
                        }; e.globalBind("resize", function () { t() }); p = 0; for (c = b.length; p < c; p += 1) q[b[p]] = f('<div class="mejs-fullscreen-hover" />').appendTo(e.container).mouseover(l).hide(); g.mouseover(function () {
                            if (!e.isFullScreen) {
                                var h = g.offset(), m = a.container.offset(); d.positionFullscreenButton(h.left - m.left, h.top - m.top, false); g.css("pointer-events", "none"); e.controls.css("pointer-events", "none"); e.media.addEventListener("click", e.clickToPlayPauseCallback); for (p in q) q[p].show();
                                t(); j = true
                            }
                        }); d.addEventListener("fullscreenchange", function () { e.isFullScreen = !e.isFullScreen; e.isFullScreen ? e.media.removeEventListener("click", e.clickToPlayPauseCallback) : e.media.addEventListener("click", e.clickToPlayPauseCallback); l() })
                    } else g.mouseover(function () { if (k !== null) { clearTimeout(k); delete k } var h = g.offset(), m = a.container.offset(); d.positionFullscreenButton(h.left - m.left, h.top - m.top, true) }).mouseout(function () {
                        if (k !== null) { clearTimeout(k); delete k } k = setTimeout(function () { d.hideFullscreenButton() },
                        1500)
                    })
                } a.fullscreenBtn = g; e.globalBind("keydown", function (h) { if ((mejs.MediaFeatures.hasTrueNativeFullScreen && mejs.MediaFeatures.isFullScreen() || e.isFullScreen) && h.keyCode == 27) a.exitFullScreen() })
            }
        }, cleanfullscreen: function (a) { a.exitFullScreen() }, containerSizeTimeout: null, enterFullScreen: function () {
            var a = this; if (!(a.media.pluginType !== "native" && (mejs.MediaFeatures.isFirefox || a.options.usePluginFullScreen))) {
                docStyleOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow =
                "hidden"; normalHeight = a.container.height(); normalWidth = a.container.width(); if (a.media.pluginType === "native") if (mejs.MediaFeatures.hasTrueNativeFullScreen) { mejs.MediaFeatures.requestFullScreen(a.container[0]); a.isInIframe && setTimeout(function c() { if (a.isNativeFullScreen) f(window).width() !== screen.width ? a.exitFullScreen() : setTimeout(c, 500) }, 500) } else if (mejs.MediaFeatures.hasSemiNativeFullScreen) { a.media.webkitEnterFullscreen(); return } if (a.isInIframe) {
                    var b = a.options.newWindowCallback(this); if (b !==
                    "") if (mejs.MediaFeatures.hasTrueNativeFullScreen) setTimeout(function () { if (!a.isNativeFullScreen) { a.pause(); window.open(b, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no") } }, 250); else { a.pause(); window.open(b, a.id, "top=0,left=0,width=" + screen.availWidth + ",height=" + screen.availHeight + ",resizable=yes,scrollbars=no,status=no,toolbar=no"); return }
                } a.container.addClass("mejs-container-fullscreen").width("100%").height("100%"); a.containerSizeTimeout =
                setTimeout(function () { a.container.css({ width: "100%", height: "100%" }); a.setControlsSize() }, 500); if (a.pluginType === "native") a.$media.width("100%").height("100%"); else { a.container.find(".mejs-shim").width("100%").height("100%"); a.media.setVideoSize(f(window).width(), f(window).height()) } a.layers.children("div").width("100%").height("100%"); a.fullscreenBtn && a.fullscreenBtn.removeClass("mejs-fullscreen").addClass("mejs-unfullscreen"); a.setControlsSize(); a.isFullScreen = true
            }
        }, exitFullScreen: function () {
            clearTimeout(this.containerSizeTimeout);
            if (this.media.pluginType !== "native" && mejs.MediaFeatures.isFirefox) this.media.setFullscreen(false); else {
                if (mejs.MediaFeatures.hasTrueNativeFullScreen && (mejs.MediaFeatures.isFullScreen() || this.isFullScreen)) mejs.MediaFeatures.cancelFullScreen(); document.documentElement.style.overflow = docStyleOverflow; this.container.removeClass("mejs-container-fullscreen").width(normalWidth).height(normalHeight); if (this.pluginType === "native") this.$media.width(normalWidth).height(normalHeight); else {
                    this.container.find("object embed").width(normalWidth).height(normalHeight);
                    this.media.setVideoSize(normalWidth, normalHeight)
                } this.layers.children("div").width(normalWidth).height(normalHeight); this.fullscreenBtn.removeClass("mejs-unfullscreen").addClass("mejs-fullscreen"); this.setControlsSize(); this.isFullScreen = false
            }
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { startLanguage: "", tracksText: "Captions/Subtitles", hideCaptionsButtonWhenEmpty: true, toggleCaptionsButtonWhenOnlyOne: false, slidesSelector: "" }); f.extend(MediaElementPlayer.prototype, {
        hasChapters: false, buildtracks: function (a, b, c, d) {
            if (a.tracks.length != 0) {
                a.chapters = f('<div class="mejs-chapters mejs-layer"></div>').prependTo(c).hide(); a.captions = f('<div class="mejs-captions-layer mejs-layer"><div class="mejs-captions-position mejs-captions-position-hover"><span class="mejs-captions-text"></span></div></div>').prependTo(c).hide();
                a.captionsText = a.captions.find(".mejs-captions-text"); a.captionsButton = f('<div class="mejs-button mejs-captions-button"><button type="button" aria-controls="' + this.id + '" title="' + this.options.tracksText + '" aria-label="' + this.options.tracksText + '"></button><div class="mejs-captions-selector"><ul><li><input type="radio" name="' + a.id + '_captions" id="' + a.id + '_captions_none" value="none" checked="checked" /><label for="' + a.id + '_captions_none">None</label></li></ul></div></div>').appendTo(b); for (b = c = 0; b <
                a.tracks.length; b++) a.tracks[b].kind == "subtitles" && c++; this.options.toggleCaptionsButtonWhenOnlyOne && c == 1 ? a.captionsButton.on("click", function () { a.setTrack(a.selectedTrack == null ? a.tracks[0].srclang : "none") }) : a.captionsButton.hover(function () { f(this).find(".mejs-captions-selector").css("visibility", "visible") }, function () { f(this).find(".mejs-captions-selector").css("visibility", "hidden") }).on("click", "input[type=radio]", function () { lang = this.value; a.setTrack(lang) }); a.options.alwaysShowControls ? a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") :
                a.container.bind("controlsshown", function () { a.container.find(".mejs-captions-position").addClass("mejs-captions-position-hover") }).bind("controlshidden", function () { d.paused || a.container.find(".mejs-captions-position").removeClass("mejs-captions-position-hover") }); a.trackToLoad = -1; a.selectedTrack = null; a.isLoadingTrack = false; for (b = 0; b < a.tracks.length; b++) a.tracks[b].kind == "subtitles" && a.addTrackButton(a.tracks[b].srclang, a.tracks[b].label); a.loadNextTrack(); d.addEventListener("timeupdate", function () { a.displayCaptions() },
                false); if (a.options.slidesSelector != "") { a.slidesContainer = f(a.options.slidesSelector); d.addEventListener("timeupdate", function () { a.displaySlides() }, false) } d.addEventListener("loadedmetadata", function () { a.displayChapters() }, false); a.container.hover(function () { if (a.hasChapters) { a.chapters.css("visibility", "visible"); a.chapters.fadeIn(200).height(a.chapters.find(".mejs-chapter").outerHeight()) } }, function () {
                    a.hasChapters && !d.paused && a.chapters.fadeOut(200, function () {
                        f(this).css("visibility", "hidden");
                        f(this).css("display", "block")
                    })
                }); a.node.getAttribute("autoplay") !== null && a.chapters.css("visibility", "hidden")
            }
        }, setTrack: function (a) { var b; if (a == "none") { this.selectedTrack = null; this.captionsButton.removeClass("mejs-captions-enabled") } else for (b = 0; b < this.tracks.length; b++) if (this.tracks[b].srclang == a) { this.selectedTrack == null && this.captionsButton.addClass("mejs-captions-enabled"); this.selectedTrack = this.tracks[b]; this.captions.attr("lang", this.selectedTrack.srclang); this.displayCaptions(); break } },
        loadNextTrack: function () { this.trackToLoad++; if (this.trackToLoad < this.tracks.length) { this.isLoadingTrack = true; this.loadTrack(this.trackToLoad) } else { this.isLoadingTrack = false; this.checkForTracks() } }, loadTrack: function (a) {
            var b = this, c = b.tracks[a]; f.ajax({
                url: c.src, dataType: "text", success: function (d) {
                    c.entries = typeof d == "string" && /<tt\s+xml/ig.exec(d) ? mejs.TrackFormatParser.dfxp.parse(d) : mejs.TrackFormatParser.webvvt.parse(d); c.isLoaded = true; b.enableTrackButton(c.srclang, c.label); b.loadNextTrack(); c.kind ==
                    "chapters" && b.media.addEventListener("play", function () { b.media.duration > 0 && b.displayChapters(c) }, false); c.kind == "slides" && b.setupSlides(c)
                }, error: function () { b.loadNextTrack() }
            })
        }, enableTrackButton: function (a, b) { if (b === "") b = mejs.language.codes[a] || a; this.captionsButton.find("input[value=" + a + "]").prop("disabled", false).siblings("label").html(b); this.options.startLanguage == a && f("#" + this.id + "_captions_" + a).click(); this.adjustLanguageBox() }, addTrackButton: function (a, b) {
            if (b === "") b = mejs.language.codes[a] ||
            a; this.captionsButton.find("ul").append(f('<li><input type="radio" name="' + this.id + '_captions" id="' + this.id + "_captions_" + a + '" value="' + a + '" disabled="disabled" /><label for="' + this.id + "_captions_" + a + '">' + b + " (loading)</label></li>")); this.adjustLanguageBox(); this.container.find(".mejs-captions-translations option[value=" + a + "]").remove()
        }, adjustLanguageBox: function () {
            this.captionsButton.find(".mejs-captions-selector").height(this.captionsButton.find(".mejs-captions-selector ul").outerHeight(true) +
            this.captionsButton.find(".mejs-captions-translations").outerHeight(true))
        }, checkForTracks: function () { var a = false; if (this.options.hideCaptionsButtonWhenEmpty) { for (i = 0; i < this.tracks.length; i++) if (this.tracks[i].kind == "subtitles") { a = true; break } if (!a) { this.captionsButton.hide(); this.setControlsSize() } } }, displayCaptions: function () {
            if (typeof this.tracks != "undefined") {
                var a, b = this.selectedTrack; if (b != null && b.isLoaded) for (a = 0; a < b.entries.times.length; a++) if (this.media.currentTime >= b.entries.times[a].start &&
                this.media.currentTime <= b.entries.times[a].stop) { this.captionsText.html(b.entries.text[a]); this.captions.show().height(0); return } this.captions.hide()
            }
        }, setupSlides: function (a) { this.slides = a; this.slides.entries.imgs = [this.slides.entries.text.length]; this.showSlide(0) }, showSlide: function (a) {
            if (!(typeof this.tracks == "undefined" || typeof this.slidesContainer == "undefined")) {
                var b = this, c = b.slides.entries.text[a], d = b.slides.entries.imgs[a]; if (typeof d == "undefined" || typeof d.fadeIn == "undefined") b.slides.entries.imgs[a] =
                d = f('<img src="' + c + '">').on("load", function () { d.appendTo(b.slidesContainer).hide().fadeIn().siblings(":visible").fadeOut() }); else if (!d.is(":visible") && !d.is(":animated")) { console.log("showing existing slide"); d.fadeIn().siblings(":visible").fadeOut() }
            }
        }, displaySlides: function () { if (typeof this.slides != "undefined") { var a = this.slides, b; for (b = 0; b < a.entries.times.length; b++) if (this.media.currentTime >= a.entries.times[b].start && this.media.currentTime <= a.entries.times[b].stop) { this.showSlide(b); break } } },
        displayChapters: function () { var a; for (a = 0; a < this.tracks.length; a++) if (this.tracks[a].kind == "chapters" && this.tracks[a].isLoaded) { this.drawChapters(this.tracks[a]); this.hasChapters = true; break } }, drawChapters: function (a) {
            var b = this, c, d, e = d = 0; b.chapters.empty(); for (c = 0; c < a.entries.times.length; c++) {
                d = a.entries.times[c].stop - a.entries.times[c].start; d = Math.floor(d / b.media.duration * 100); if (d + e > 100 || c == a.entries.times.length - 1 && d + e < 100) d = 100 - e; b.chapters.append(f('<div class="mejs-chapter" rel="' + a.entries.times[c].start +
                '" style="left: ' + e.toString() + "%;width: " + d.toString() + '%;"><div class="mejs-chapter-block' + (c == a.entries.times.length - 1 ? " mejs-chapter-block-last" : "") + '"><span class="ch-title">' + a.entries.text[c] + '</span><span class="ch-time">' + mejs.Utility.secondsToTimeCode(a.entries.times[c].start) + "&ndash;" + mejs.Utility.secondsToTimeCode(a.entries.times[c].stop) + "</span></div></div>")); e += d
            } b.chapters.find("div.mejs-chapter").click(function () {
                b.media.setCurrentTime(parseFloat(f(this).attr("rel"))); b.media.paused &&
                b.media.play()
            }); b.chapters.show()
        }
    }); mejs.language = {
        codes: {
            af: "Afrikaans", sq: "Albanian", ar: "Arabic", be: "Belarusian", bg: "Bulgarian", ca: "Catalan", zh: "Chinese", "zh-cn": "Chinese Simplified", "zh-tw": "Chinese Traditional", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch", en: "English", et: "Estonian", tl: "Filipino", fi: "Finnish", fr: "French", gl: "Galician", de: "German", el: "Greek", ht: "Haitian Creole", iw: "Hebrew", hi: "Hindi", hu: "Hungarian", is: "Icelandic", id: "Indonesian", ga: "Irish", it: "Italian", ja: "Japanese", ko: "Korean",
            lv: "Latvian", lt: "Lithuanian", mk: "Macedonian", ms: "Malay", mt: "Maltese", no: "Norwegian", fa: "Persian", pl: "Polish", pt: "Portuguese", ro: "Romanian", ru: "Russian", sr: "Serbian", sk: "Slovak", sl: "Slovenian", es: "Spanish", sw: "Swahili", sv: "Swedish", tl: "Tagalog", th: "Thai", tr: "Turkish", uk: "Ukrainian", vi: "Vietnamese", cy: "Welsh", yi: "Yiddish"
        }
    }; mejs.TrackFormatParser = {
        webvvt: {
            pattern_identifier: /^([a-zA-z]+-)?[0-9]+$/, pattern_timecode: /^([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{1,3})?) --\> ([0-9]{2}:[0-9]{2}:[0-9]{2}([,.][0-9]{3})?)(.*)$/,
            parse: function (a) {
                var b = 0; a = mejs.TrackFormatParser.split2(a, /\r?\n/); for (var c = { text: [], times: [] }, d, e; b < a.length; b++) if (this.pattern_identifier.exec(a[b])) {
                    b++; if ((d = this.pattern_timecode.exec(a[b])) && b < a.length) {
                        b++; e = a[b]; for (b++; a[b] !== "" && b < a.length;) { e = e + "\n" + a[b]; b++ } e = f.trim(e).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig, "<a href='$1' target='_blank'>$1</a>"); c.text.push(e); c.times.push({
                            start: mejs.Utility.convertSMPTEtoSeconds(d[1]) == 0 ? 0.2 : mejs.Utility.convertSMPTEtoSeconds(d[1]),
                            stop: mejs.Utility.convertSMPTEtoSeconds(d[3]), settings: d[5]
                        })
                    }
                } return c
            }
        }, dfxp: {
            parse: function (a) {
                a = f(a).filter("tt"); var b = 0; b = a.children("div").eq(0); var c = b.find("p"); b = a.find("#" + b.attr("style")); var d, e; a = { text: [], times: [] }; if (b.length) { e = b.removeAttr("id").get(0).attributes; if (e.length) { d = {}; for (b = 0; b < e.length; b++) d[e[b].name.split(":")[1]] = e[b].value } } for (b = 0; b < c.length; b++) {
                    var g; e = { start: null, stop: null, style: null }; if (c.eq(b).attr("begin")) e.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("begin"));
                    if (!e.start && c.eq(b - 1).attr("end")) e.start = mejs.Utility.convertSMPTEtoSeconds(c.eq(b - 1).attr("end")); if (c.eq(b).attr("end")) e.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b).attr("end")); if (!e.stop && c.eq(b + 1).attr("begin")) e.stop = mejs.Utility.convertSMPTEtoSeconds(c.eq(b + 1).attr("begin")); if (d) { g = ""; for (var k in d) g += k + ":" + d[k] + ";" } if (g) e.style = g; if (e.start == 0) e.start = 0.2; a.times.push(e); e = f.trim(c.eq(b).html()).replace(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                    "<a href='$1' target='_blank'>$1</a>"); a.text.push(e); if (a.times.start == 0) a.times.start = 2
                } return a
            }
        }, split2: function (a, b) { return a.split(b) }
    }; if ("x\n\ny".split(/\n/gi).length != 3) mejs.TrackFormatParser.split2 = function (a, b) { var c = [], d = "", e; for (e = 0; e < a.length; e++) { d += a.substring(e, e + 1); if (b.test(d)) { c.push(d.replace(b, "")); d = "" } } c.push(d); return c }
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { contextMenuItems: [{ render: function (a) { if (typeof a.enterFullScreen == "undefined") return null; return a.isFullScreen ? "Turn off Fullscreen" : "Go Fullscreen" }, click: function (a) { a.isFullScreen ? a.exitFullScreen() : a.enterFullScreen() } }, { render: function (a) { return a.media.muted ? "Unmute" : "Mute" }, click: function (a) { a.media.muted ? a.setMuted(false) : a.setMuted(true) } }, { isSeparator: true }, { render: function () { return "Download Video" }, click: function (a) { window.location.href = a.media.currentSrc } }] });
    f.extend(MediaElementPlayer.prototype, {
        buildcontextmenu: function (a) { a.contextMenu = f('<div class="mejs-contextmenu"></div>').appendTo(f("body")).hide(); a.container.bind("contextmenu", function (b) { if (a.isContextMenuEnabled) { b.preventDefault(); a.renderContextMenu(b.clientX - 1, b.clientY - 1); return false } }); a.container.bind("click", function () { a.contextMenu.hide() }); a.contextMenu.bind("mouseleave", function () { a.startContextMenuTimer() }) }, cleancontextmenu: function (a) { a.contextMenu.remove() }, isContextMenuEnabled: true,
        enableContextMenu: function () { this.isContextMenuEnabled = true }, disableContextMenu: function () { this.isContextMenuEnabled = false }, contextMenuTimeout: null, startContextMenuTimer: function () { var a = this; a.killContextMenuTimer(); a.contextMenuTimer = setTimeout(function () { a.hideContextMenu(); a.killContextMenuTimer() }, 750) }, killContextMenuTimer: function () { var a = this.contextMenuTimer; if (a != null) { clearTimeout(a); delete a } }, hideContextMenu: function () { this.contextMenu.hide() }, renderContextMenu: function (a, b) {
            for (var c =
            this, d = "", e = c.options.contextMenuItems, g = 0, k = e.length; g < k; g++) if (e[g].isSeparator) d += '<div class="mejs-contextmenu-separator"></div>'; else { var j = e[g].render(c); if (j != null) d += '<div class="mejs-contextmenu-item" data-itemindex="' + g + '" id="element-' + Math.random() * 1E6 + '">' + j + "</div>" } c.contextMenu.empty().append(f(d)).css({ top: b, left: a }).show(); c.contextMenu.find(".mejs-contextmenu-item").each(function () {
                var l = f(this), q = parseInt(l.data("itemindex"), 10), p = c.options.contextMenuItems[q]; typeof p.show != "undefined" &&
                p.show(l, c); l.click(function () { typeof p.click != "undefined" && p.click(c); c.contextMenu.hide() })
            }); setTimeout(function () { c.killControlsTimer("rev3") }, 100)
        }
    })
})(mejs.$);
(function (f) {
    f.extend(mejs.MepDefaults, { postrollCloseText: mejs.i18n.t("Close") }); f.extend(MediaElementPlayer.prototype, {
        buildpostroll: function (a, b, c) {
            var d = this.container.find('link[rel="postroll"]').attr("href"); if (typeof d !== "undefined") {
                a.postroll = f('<div class="mejs-postroll-layer mejs-layer"><a class="mejs-postroll-close" onclick="$(this).parent().hide();return false;">' + this.options.postrollCloseText + '</a><div class="mejs-postroll-layer-content"></div></div>').prependTo(c).hide(); this.media.addEventListener("ended",
                function () { f.ajax({ dataType: "html", url: d, success: function (e) { c.find(".mejs-postroll-layer-content").html(e) } }); a.postroll.show() }, false)
            }
        }
    })
})(mejs.$);


(function (a, b, c) { "use strict"; var d = a.document, e = a.Modernizr, f = function (a) { return a.charAt(0).toUpperCase() + a.slice(1) }, g = "Moz Webkit O Ms".split(" "), h = function (a) { var b = d.documentElement.style, c; if (typeof b[a] == "string") return a; a = f(a); for (var e = 0, h = g.length; e < h; e++) { c = g[e] + a; if (typeof b[c] == "string") return c } }, i = h("transform"), j = h("transitionProperty"), k = { csstransforms: function () { return !!i }, csstransforms3d: function () { var a = !!h("perspective"); if (a) { var c = " -o- -moz- -ms- -webkit- -khtml- ".split(" "), d = "@media (" + c.join("transform-3d),(") + "modernizr)", e = b("<style>" + d + "{#modernizr{height:3px}}" + "</style>").appendTo("head"), f = b('<div id="modernizr" />').appendTo("html"); a = f.height() === 3, f.remove(), e.remove() } return a }, csstransitions: function () { return !!j } }, l; if (e) for (l in k) e.hasOwnProperty(l) || e.addTest(l, k[l]); else { e = a.Modernizr = { _version: "1.6ish: miniModernizr for Isotope" }; var m = " ", n; for (l in k) n = k[l](), e[l] = n, m += " " + (n ? "" : "no-") + l; b("html").addClass(m) } if (e.csstransforms) { var o = e.csstransforms3d ? { translate: function (a) { return "translate3d(" + a[0] + "px, " + a[1] + "px, 0) " }, scale: function (a) { return "scale3d(" + a + ", " + a + ", 1) " } } : { translate: function (a) { return "translate(" + a[0] + "px, " + a[1] + "px) " }, scale: function (a) { return "scale(" + a + ") " } }, p = function (a, c, d) { var e = b.data(a, "isoTransform") || {}, f = {}, g, h = {}, j; f[c] = d, b.extend(e, f); for (g in e) j = e[g], h[g] = o[g](j); var k = h.translate || "", l = h.scale || "", m = k + l; b.data(a, "isoTransform", e), a.style[i] = m }; b.cssNumber.scale = !0, b.cssHooks.scale = { set: function (a, b) { p(a, "scale", b) }, get: function (a, c) { var d = b.data(a, "isoTransform"); return d && d.scale ? d.scale : 1 } }, b.fx.step.scale = function (a) { b.cssHooks.scale.set(a.elem, a.now + a.unit) }, b.cssNumber.translate = !0, b.cssHooks.translate = { set: function (a, b) { p(a, "translate", b) }, get: function (a, c) { var d = b.data(a, "isoTransform"); return d && d.translate ? d.translate : [0, 0] } } } var q, r; e.csstransitions && (q = { WebkitTransitionProperty: "webkitTransitionEnd", MozTransitionProperty: "transitionend", OTransitionProperty: "oTransitionEnd otransitionend", transitionProperty: "transitionend" }[j], r = h("transitionDuration")); var s = b.event, t = b.event.handle ? "handle" : "dispatch", u; s.special.smartresize = { setup: function () { b(this).bind("resize", s.special.smartresize.handler) }, teardown: function () { b(this).unbind("resize", s.special.smartresize.handler) }, handler: function (a, b) { var c = this, d = arguments; a.type = "smartresize", u && clearTimeout(u), u = setTimeout(function () { s[t].apply(c, d) }, b === "execAsap" ? 0 : 100) } }, b.fn.smartresize = function (a) { return a ? this.bind("smartresize", a) : this.trigger("smartresize", ["execAsap"]) }, b.Isotope = function (a, c, d) { this.element = b(c), this._create(a), this._init(d) }; var v = ["width", "height"], w = b(a); b.Isotope.settings = { resizable: !0, layoutMode: "masonry", containerClass: "isotope", itemClass: "isotope-item", hiddenClass: "isotope-hidden", hiddenStyle: { opacity: 0, scale: .001 }, visibleStyle: { opacity: 1, scale: 1 }, containerStyle: { position: "relative", overflow: "hidden" }, animationEngine: "best-available", animationOptions: { queue: !1, duration: 800 }, sortBy: "original-order", sortAscending: !0, resizesContainer: !0, transformsEnabled: !0, itemPositionDataEnabled: !1 }, b.Isotope.prototype = { _create: function (a) { this.options = b.extend({}, b.Isotope.settings, a), this.styleQueue = [], this.elemCount = 0; var c = this.element[0].style; this.originalStyle = {}; var d = v.slice(0); for (var e in this.options.containerStyle) d.push(e); for (var f = 0, g = d.length; f < g; f++) e = d[f], this.originalStyle[e] = c[e] || ""; this.element.css(this.options.containerStyle), this._updateAnimationEngine(), this._updateUsingTransforms(); var h = { "original-order": function (a, b) { return b.elemCount++, b.elemCount }, random: function () { return Math.random() } }; this.options.getSortData = b.extend(this.options.getSortData, h), this.reloadItems(), this.offset = { left: parseInt(this.element.css("padding-left") || 0, 10), top: parseInt(this.element.css("padding-top") || 0, 10) }; var i = this; setTimeout(function () { i.element.addClass(i.options.containerClass) }, 0), this.options.resizable && w.bind("smartresize.isotope", function () { i.resize() }), this.element.delegate("." + this.options.hiddenClass, "click", function () { return !1 }) }, _getAtoms: function (a) { var b = this.options.itemSelector, c = b ? a.filter(b).add(a.find(b)) : a, d = { position: "absolute" }; return c = c.filter(function (a, b) { return b.nodeType === 1 }), this.usingTransforms && (d.left = 0, d.top = 0), c.css(d).addClass(this.options.itemClass), this.updateSortData(c, !0), c }, _init: function (a) { this.$filteredAtoms = this._filter(this.$allAtoms), this._sort(), this.reLayout(a) }, option: function (a) { if (b.isPlainObject(a)) { this.options = b.extend(!0, this.options, a); var c; for (var d in a) c = "_update" + f(d), this[c] && this[c]() } }, _updateAnimationEngine: function () { var a = this.options.animationEngine.toLowerCase().replace(/[ _\-]/g, ""), b; switch (a) { case "css": case "none": b = !1; break; case "jquery": b = !0; break; default: b = !e.csstransitions } this.isUsingJQueryAnimation = b, this._updateUsingTransforms() }, _updateTransformsEnabled: function () { this._updateUsingTransforms() }, _updateUsingTransforms: function () { var a = this.usingTransforms = this.options.transformsEnabled && e.csstransforms && e.csstransitions && !this.isUsingJQueryAnimation; a || (delete this.options.hiddenStyle.scale, delete this.options.visibleStyle.scale), this.getPositionStyles = a ? this._translate : this._positionAbs }, _filter: function (a) { var b = this.options.filter === "" ? "*" : this.options.filter; if (!b) return a; var c = this.options.hiddenClass, d = "." + c, e = a.filter(d), f = e; if (b !== "*") { f = e.filter(b); var g = a.not(d).not(b).addClass(c); this.styleQueue.push({ $el: g, style: this.options.hiddenStyle }) } return this.styleQueue.push({ $el: f, style: this.options.visibleStyle }), f.removeClass(c), a.filter(b) }, updateSortData: function (a, c) { var d = this, e = this.options.getSortData, f, g; a.each(function () { f = b(this), g = {}; for (var a in e) !c && a === "original-order" ? g[a] = b.data(this, "isotope-sort-data")[a] : g[a] = e[a](f, d); b.data(this, "isotope-sort-data", g) }) }, _sort: function () { var a = this.options.sortBy, b = this._getSorter, c = this.options.sortAscending ? 1 : -1, d = function (d, e) { var f = b(d, a), g = b(e, a); return f === g && a !== "original-order" && (f = b(d, "original-order"), g = b(e, "original-order")), (f > g ? 1 : f < g ? -1 : 0) * c }; this.$filteredAtoms.sort(d) }, _getSorter: function (a, c) { return b.data(a, "isotope-sort-data")[c] }, _translate: function (a, b) { return { translate: [a, b] } }, _positionAbs: function (a, b) { return { left: a, top: b } }, _pushPosition: function (a, b, c) { b = Math.round(b + this.offset.left), c = Math.round(c + this.offset.top); var d = this.getPositionStyles(b, c); this.styleQueue.push({ $el: a, style: d }), this.options.itemPositionDataEnabled && a.data("isotope-item-position", { x: b, y: c }) }, layout: function (a, b) { var c = this.options.layoutMode; this["_" + c + "Layout"](a); if (this.options.resizesContainer) { var d = this["_" + c + "GetContainerSize"](); this.styleQueue.push({ $el: this.element, style: d }) } this._processStyleQueue(a, b), this.isLaidOut = !0 }, _processStyleQueue: function (a, c) { var d = this.isLaidOut ? this.isUsingJQueryAnimation ? "animate" : "css" : "css", f = this.options.animationOptions, g = this.options.onLayout, h, i, j, k; i = function (a, b) { b.$el[d](b.style, f) }; if (this._isInserting && this.isUsingJQueryAnimation) i = function (a, b) { h = b.$el.hasClass("no-transition") ? "css" : d, b.$el[h](b.style, f) }; else if (c || g || f.complete) { var l = !1, m = [c, g, f.complete], n = this; j = !0, k = function () { if (l) return; var b; for (var c = 0, d = m.length; c < d; c++) b = m[c], typeof b == "function" && b.call(n.element, a, n); l = !0 }; if (this.isUsingJQueryAnimation && d === "animate") f.complete = k, j = !1; else if (e.csstransitions) { var o = 0, p = this.styleQueue[0], s = p && p.$el, t; while (!s || !s.length) { t = this.styleQueue[o++]; if (!t) return; s = t.$el } var u = parseFloat(getComputedStyle(s[0])[r]); u > 0 && (i = function (a, b) { b.$el[d](b.style, f).one(q, k) }, j = !1) } } b.each(this.styleQueue, i), j && k(), this.styleQueue = [] }, resize: function () { this["_" + this.options.layoutMode + "ResizeChanged"]() && this.reLayout() }, reLayout: function (a) { this["_" + this.options.layoutMode + "Reset"](), this.layout(this.$filteredAtoms, a) }, addItems: function (a, b) { var c = this._getAtoms(a); this.$allAtoms = this.$allAtoms.add(c), b && b(c) }, insert: function (a, b) { this.element.append(a); var c = this; this.addItems(a, function (a) { var d = c._filter(a); c._addHideAppended(d), c._sort(), c.reLayout(), c._revealAppended(d, b) }) }, appended: function (a, b) { var c = this; this.addItems(a, function (a) { c._addHideAppended(a), c.layout(a), c._revealAppended(a, b) }) }, _addHideAppended: function (a) { this.$filteredAtoms = this.$filteredAtoms.add(a), a.addClass("no-transition"), this._isInserting = !0, this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }) }, _revealAppended: function (a, b) { var c = this; setTimeout(function () { a.removeClass("no-transition"), c.styleQueue.push({ $el: a, style: c.options.visibleStyle }), c._isInserting = !1, c._processStyleQueue(a, b) }, 10) }, reloadItems: function () { this.$allAtoms = this._getAtoms(this.element.children()) }, remove: function (a, b) { this.$allAtoms = this.$allAtoms.not(a), this.$filteredAtoms = this.$filteredAtoms.not(a); var c = this, d = function () { a.remove(), b && b.call(c.element) }; a.filter(":not(." + this.options.hiddenClass + ")").length ? (this.styleQueue.push({ $el: a, style: this.options.hiddenStyle }), this._sort(), this.reLayout(d)) : d() }, shuffle: function (a) { this.updateSortData(this.$allAtoms), this.options.sortBy = "random", this._sort(), this.reLayout(a) }, destroy: function () { var a = this.usingTransforms, b = this.options; this.$allAtoms.removeClass(b.hiddenClass + " " + b.itemClass).each(function () { var b = this.style; b.position = "", b.top = "", b.left = "", b.opacity = "", a && (b[i] = "") }); var c = this.element[0].style; for (var d in this.originalStyle) c[d] = this.originalStyle[d]; this.element.unbind(".isotope").undelegate("." + b.hiddenClass, "click").removeClass(b.containerClass).removeData("isotope"), w.unbind(".isotope") }, _getSegments: function (a) { var b = this.options.layoutMode, c = a ? "rowHeight" : "columnWidth", d = a ? "height" : "width", e = a ? "rows" : "cols", g = this.element[d](), h, i = this.options[b] && this.options[b][c] || this.$filteredAtoms["outer" + f(d)](!0) || g; h = Math.floor(g / i), h = Math.max(h, 1), this[b][e] = h, this[b][c] = i }, _checkIfSegmentsChanged: function (a) { var b = this.options.layoutMode, c = a ? "rows" : "cols", d = this[b][c]; return this._getSegments(a), this[b][c] !== d }, _masonryReset: function () { this.masonry = {}, this._getSegments(); var a = this.masonry.cols; this.masonry.colYs = []; while (a--) this.masonry.colYs.push(0) }, _masonryLayout: function (a) { var c = this, d = c.masonry; a.each(function () { var a = b(this), e = Math.ceil(a.outerWidth(!0) / d.columnWidth); e = Math.min(e, d.cols); if (e === 1) c._masonryPlaceBrick(a, d.colYs); else { var f = d.cols + 1 - e, g = [], h, i; for (i = 0; i < f; i++) h = d.colYs.slice(i, i + e), g[i] = Math.max.apply(Math, h); c._masonryPlaceBrick(a, g) } }) }, _masonryPlaceBrick: function (a, b) { var c = Math.min.apply(Math, b), d = 0; for (var e = 0, f = b.length; e < f; e++) if (b[e] === c) { d = e; break } var g = this.masonry.columnWidth * d, h = c; this._pushPosition(a, g, h); var i = c + a.outerHeight(!0), j = this.masonry.cols + 1 - f; for (e = 0; e < j; e++) this.masonry.colYs[d + e] = i }, _masonryGetContainerSize: function () { var a = Math.max.apply(Math, this.masonry.colYs); return { height: a } }, _masonryResizeChanged: function () { return this._checkIfSegmentsChanged() }, _fitRowsReset: function () { this.fitRows = { x: 0, y: 0, height: 0 } }, _fitRowsLayout: function (a) { var c = this, d = this.element.width(), e = this.fitRows; a.each(function () { var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0); e.x !== 0 && f + e.x > d && (e.x = 0, e.y = e.height), c._pushPosition(a, e.x, e.y), e.height = Math.max(e.y + g, e.height), e.x += f }) }, _fitRowsGetContainerSize: function () { return { height: this.fitRows.height } }, _fitRowsResizeChanged: function () { return !0 }, _cellsByRowReset: function () { this.cellsByRow = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByRowLayout: function (a) { var c = this, d = this.cellsByRow; a.each(function () { var a = b(this), e = d.index % d.cols, f = Math.floor(d.index / d.cols), g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2; c._pushPosition(a, g, h), d.index++ }) }, _cellsByRowGetContainerSize: function () { return { height: Math.ceil(this.$filteredAtoms.length / this.cellsByRow.cols) * this.cellsByRow.rowHeight + this.offset.top } }, _cellsByRowResizeChanged: function () { return this._checkIfSegmentsChanged() }, _straightDownReset: function () { this.straightDown = { y: 0 } }, _straightDownLayout: function (a) { var c = this; a.each(function (a) { var d = b(this); c._pushPosition(d, 0, c.straightDown.y), c.straightDown.y += d.outerHeight(!0) }) }, _straightDownGetContainerSize: function () { return { height: this.straightDown.y } }, _straightDownResizeChanged: function () { return !0 }, _masonryHorizontalReset: function () { this.masonryHorizontal = {}, this._getSegments(!0); var a = this.masonryHorizontal.rows; this.masonryHorizontal.rowXs = []; while (a--) this.masonryHorizontal.rowXs.push(0) }, _masonryHorizontalLayout: function (a) { var c = this, d = c.masonryHorizontal; a.each(function () { var a = b(this), e = Math.ceil(a.outerHeight(!0) / d.rowHeight); e = Math.min(e, d.rows); if (e === 1) c._masonryHorizontalPlaceBrick(a, d.rowXs); else { var f = d.rows + 1 - e, g = [], h, i; for (i = 0; i < f; i++) h = d.rowXs.slice(i, i + e), g[i] = Math.max.apply(Math, h); c._masonryHorizontalPlaceBrick(a, g) } }) }, _masonryHorizontalPlaceBrick: function (a, b) { var c = Math.min.apply(Math, b), d = 0; for (var e = 0, f = b.length; e < f; e++) if (b[e] === c) { d = e; break } var g = c, h = this.masonryHorizontal.rowHeight * d; this._pushPosition(a, g, h); var i = c + a.outerWidth(!0), j = this.masonryHorizontal.rows + 1 - f; for (e = 0; e < j; e++) this.masonryHorizontal.rowXs[d + e] = i }, _masonryHorizontalGetContainerSize: function () { var a = Math.max.apply(Math, this.masonryHorizontal.rowXs); return { width: a } }, _masonryHorizontalResizeChanged: function () { return this._checkIfSegmentsChanged(!0) }, _fitColumnsReset: function () { this.fitColumns = { x: 0, y: 0, width: 0 } }, _fitColumnsLayout: function (a) { var c = this, d = this.element.height(), e = this.fitColumns; a.each(function () { var a = b(this), f = a.outerWidth(!0), g = a.outerHeight(!0); e.y !== 0 && g + e.y > d && (e.x = e.width, e.y = 0), c._pushPosition(a, e.x, e.y), e.width = Math.max(e.x + f, e.width), e.y += g }) }, _fitColumnsGetContainerSize: function () { return { width: this.fitColumns.width } }, _fitColumnsResizeChanged: function () { return !0 }, _cellsByColumnReset: function () { this.cellsByColumn = { index: 0 }, this._getSegments(), this._getSegments(!0) }, _cellsByColumnLayout: function (a) { var c = this, d = this.cellsByColumn; a.each(function () { var a = b(this), e = Math.floor(d.index / d.rows), f = d.index % d.rows, g = (e + .5) * d.columnWidth - a.outerWidth(!0) / 2, h = (f + .5) * d.rowHeight - a.outerHeight(!0) / 2; c._pushPosition(a, g, h), d.index++ }) }, _cellsByColumnGetContainerSize: function () { return { width: Math.ceil(this.$filteredAtoms.length / this.cellsByColumn.rows) * this.cellsByColumn.columnWidth } }, _cellsByColumnResizeChanged: function () { return this._checkIfSegmentsChanged(!0) }, _straightAcrossReset: function () { this.straightAcross = { x: 0 } }, _straightAcrossLayout: function (a) { var c = this; a.each(function (a) { var d = b(this); c._pushPosition(d, c.straightAcross.x, 0), c.straightAcross.x += d.outerWidth(!0) }) }, _straightAcrossGetContainerSize: function () { return { width: this.straightAcross.x } }, _straightAcrossResizeChanged: function () { return !0 } }, b.fn.imagesLoaded = function (a) { function h() { a.call(c, d) } function i(a) { var c = a.target; c.src !== f && b.inArray(c, g) === -1 && (g.push(c), --e <= 0 && (setTimeout(h), d.unbind(".imagesLoaded", i))) } var c = this, d = c.find("img").add(c.filter("img")), e = d.length, f = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==", g = []; return e || h(), d.bind("load.imagesLoaded error.imagesLoaded", i).each(function () { var a = this.src; this.src = f, this.src = a }), c }; var x = function (b) { a.console && a.console.error(b) }; b.fn.isotope = function (a, c) { if (typeof a == "string") { var d = Array.prototype.slice.call(arguments, 1); this.each(function () { var c = b.data(this, "isotope"); if (!c) { x("cannot call methods on isotope prior to initialization; attempted to call method '" + a + "'"); return } if (!b.isFunction(c[a]) || a.charAt(0) === "_") { x("no such method '" + a + "' for isotope instance"); return } c[a].apply(c, d) }) } else this.each(function () { var d = b.data(this, "isotope"); d ? (d.option(a), d._init(c)) : b.data(this, "isotope", new b.Isotope(a, this, c)) }); return this } })(window, jQuery);


(function (C, z, f, r) {
    var q = f(C), n = f(z), b = f.fancybox = function () { b.open.apply(this, arguments) }, H = navigator.userAgent.match(/msie/), w = null, s = z.createTouch !== r, t = function (a) { return a && a.hasOwnProperty && a instanceof f }, p = function (a) { return a && "string" === f.type(a) }, F = function (a) { return p(a) && 0 < a.indexOf("%") }, l = function (a, d) { var e = parseInt(a, 10) || 0; d && F(a) && (e *= b.getViewport()[d] / 100); return Math.ceil(e) }, x = function (a, b) { return l(a, b) + "px" }; f.extend(b, {
        version: "2.1.4", defaults: {
            padding: 15, margin: 20, width: 800,
            height: 600, minWidth: 100, minHeight: 100, maxWidth: 9999, maxHeight: 9999, autoSize: !0, autoHeight: !1, autoWidth: !1, autoResize: !0, autoCenter: !s, fitToView: !0, aspectRatio: !1, topRatio: 0.5, leftRatio: 0.5, scrolling: "auto", wrapCSS: "", arrows: !0, closeBtn: !0, closeClick: !1, nextClick: !1, mouseWheel: !0, autoPlay: !1, playSpeed: 3E3, preload: 3, modal: !1, loop: !0, ajax: { dataType: "html", headers: { "X-fancyBox": !0 } }, iframe: { scrolling: "auto", preload: !0 }, swf: { wmode: "transparent", allowfullscreen: "true", allowscriptaccess: "always" }, keys: {
                next: {
                    13: "left",
                    34: "up", 39: "left", 40: "up"
                }, prev: { 8: "right", 33: "down", 37: "right", 38: "down" }, close: [27], play: [32], toggle: [70]
            }, direction: { next: "left", prev: "right" }, scrollOutside: !0, index: 0, type: null, href: null, content: null, title: null, tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>', image: '<img class="fancybox-image" src="{href}" alt="" />', iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                (H ? ' allowtransparency="true"' : "") + "></iframe>", error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>', closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"><i class="font-icon-cross"></i></a>', next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span><i class="font-icon-arrow-right-simple-round "></i></span></a>', prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span><i class="font-icon-arrow-left-simple-round "></i></span></a>'
            }, openEffect: "fade", openSpeed: 250, openEasing: "swing", openOpacity: !0,
            openMethod: "zoomIn", closeEffect: "fade", closeSpeed: 250, closeEasing: "swing", closeOpacity: !0, closeMethod: "zoomOut", nextEffect: "elastic", nextSpeed: 250, nextEasing: "swing", nextMethod: "changeIn", prevEffect: "elastic", prevSpeed: 250, prevEasing: "swing", prevMethod: "changeOut", helpers: { overlay: !0, title: !0 }, onCancel: f.noop, beforeLoad: f.noop, afterLoad: f.noop, beforeShow: f.noop, afterShow: f.noop, beforeChange: f.noop, beforeClose: f.noop, afterClose: f.noop
        }, group: {}, opts: {}, previous: null, coming: null, current: null, isActive: !1,
        isOpen: !1, isOpened: !1, wrap: null, skin: null, outer: null, inner: null, player: { timer: null, isActive: !1 }, ajaxLoad: null, imgPreload: null, transitions: {}, helpers: {}, open: function (a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = t(a) ? f(a).get() : [a]), f.each(a, function (e, c) {
                var k = {}, g, h, j, m, l; "object" === f.type(c) && (c.nodeType && (c = f(c)), t(c) ? (k = { href: c.data("fancybox-href") || c.attr("href"), title: c.data("fancybox-title") || c.attr("title"), isDom: !0, element: c }, f.metadata && f.extend(!0, k,
                c.metadata())) : k = c); g = d.href || k.href || (p(c) ? c : null); h = d.title !== r ? d.title : k.title || ""; m = (j = d.content || k.content) ? "html" : d.type || k.type; !m && k.isDom && (m = c.data("fancybox-type"), m || (m = (m = c.prop("class").match(/fancybox\.(\w+)/)) ? m[1] : null)); p(g) && (m || (b.isImage(g) ? m = "image" : b.isSWF(g) ? m = "swf" : "#" === g.charAt(0) ? m = "inline" : p(c) && (m = "html", j = c)), "ajax" === m && (l = g.split(/\s+/, 2), g = l.shift(), l = l.shift())); j || ("inline" === m ? g ? j = f(p(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : k.isDom && (j = c) : "html" === m ? j = g : !m && (!g &&
                k.isDom) && (m = "inline", j = c)); f.extend(k, { href: g, type: m, content: j, title: h, selector: l }); a[e] = k
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== r && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        }, cancel: function () {
            var a = b.coming; a && !1 !== b.trigger("onCancel") && (b.hideLoading(), b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), b.coming = null, b.current ||
            b._afterZoomOut(a))
        }, close: function (a) { b.cancel(); !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (!b.isOpen || !0 === a ? (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut()) : (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]()))) }, play: function (a) {
            var d = function () { clearTimeout(b.player.timer) }, e = function () {
                d(); b.current && b.player.isActive && (b.player.timer =
                setTimeout(b.next, b.current.playSpeed))
            }, c = function () { d(); f("body").unbind(".player"); b.player.isActive = !1; b.trigger("onPlayEnd") }; if (!0 === a || !b.player.isActive && !1 !== a) { if (b.current && (b.current.loop || b.current.index < b.group.length - 1)) b.player.isActive = !0, f("body").bind({ "afterShow.player onUpdate.player": e, "onCancel.player beforeClose.player": c, "beforeLoad.player": d }), e(), b.trigger("onPlayStart") } else c()
        }, next: function (a) { var d = b.current; d && (p(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next")) },
        prev: function (a) { var d = b.current; d && (p(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev")) }, jumpto: function (a, d, e) { var c = b.current; c && (a = l(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== r && (b.cancel(), b._start(a))) }, reposition: function (a, d) {
            var e = b.current, c = e ? e.wrap : null, k; c && (k = b._getPosition(d), a && "scroll" === a.type ? (delete k.position, c.stop(!0, !0).animate(k, 200)) : (c.css(k), e.pos = f.extend({},
            e.dim, k)))
        }, update: function (a) { var d = a && a.type, e = !d || "orientationchange" === d; e && (clearTimeout(w), w = null); b.isOpen && !w && (w = setTimeout(function () { var c = b.current; c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), w = null) }, e && !s ? 0 : 300)) }, toggle: function (a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, s && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
            b.trigger("onUpdate")), b.update())
        }, hideLoading: function () { n.unbind(".loading"); f("#fancybox-loading").remove() }, showLoading: function () { var a, d; b.hideLoading(); a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body"); n.bind("keydown.loading", function (a) { if (27 === (a.which || a.keyCode)) a.preventDefault(), b.cancel() }); b.defaults.fixed || (d = b.getViewport(), a.css({ position: "absolute", top: 0.5 * d.h + d.y, left: 0.5 * d.w + d.x })) }, getViewport: function () {
            var a = b.current && b.current.locked ||
            !1, d = { x: q.scrollLeft(), y: q.scrollTop() }; a ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = s && C.innerWidth ? C.innerWidth : q.width(), d.h = s && C.innerHeight ? C.innerHeight : q.height()); return d
        }, unbindEvents: function () { b.wrap && t(b.wrap) && b.wrap.unbind(".fb"); n.unbind(".fb"); q.unbind(".fb") }, bindEvents: function () {
            var a = b.current, d; a && (q.bind("orientationchange.fb" + (s ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && n.bind("keydown.fb", function (e) {
                var c = e.which || e.keyCode, k =
                e.target || e.srcElement; if (27 === c && b.coming) return !1; !e.ctrlKey && (!e.altKey && !e.shiftKey && !e.metaKey && (!k || !k.type && !f(k).is("[contenteditable]"))) && f.each(d, function (d, k) { if (1 < a.group.length && k[c] !== r) return b[d](k[c]), e.preventDefault(), !1; if (-1 < f.inArray(c, k)) return b[d](), e.preventDefault(), !1 })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function (d, c, k, g) {
                for (var h = f(d.target || null), j = !1; h.length && !j && !h.is(".fancybox-skin") && !h.is(".fancybox-wrap") ;) j = h[0] && !(h[0].style.overflow &&
                "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent(); if (0 !== c && !j && 1 < b.group.length && !a.canShrink) { if (0 < g || 0 < k) b.prev(0 < g ? "down" : "left"); else if (0 > g || 0 > k) b.next(0 > g ? "up" : "right"); d.preventDefault() }
            }))
        }, trigger: function (a, d) {
            var e, c = d || b.coming || b.current; if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1))); if (!1 === e) return !1; c.helpers && f.each(c.helpers, function (d,
                e) { e && (b.helpers[d] && f.isFunction(b.helpers[d][a])) && (e = f.extend(!0, {}, b.helpers[d].defaults, e), b.helpers[d][a](e, c)) }); f.event.trigger(a + ".fb")
            }
        }, isImage: function (a) { return p(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp)((\?|#).*)?$)/i) }, isSWF: function (a) { return p(a) && a.match(/\.(swf)((\?|#).*)?$/i) }, _start: function (a) {
            var d = {}, e, c; a = l(a); e = b.group[a] || null; if (!e) return !1; d = f.extend(!0, {}, b.opts, e); e = d.margin; c = d.padding; "number" === f.type(e) && (d.margin = [e, e, e, e]); "number" === f.type(c) &&
            (d.padding = [c, c, c, c]); d.modal && f.extend(!0, d, { closeBtn: !1, closeClick: !1, nextClick: !1, arrows: !1, mouseWheel: !1, keys: null, helpers: { overlay: { closeClick: !1 } } }); d.autoSize && (d.autoWidth = d.autoHeight = !0); "auto" === d.width && (d.autoWidth = !0); "auto" === d.height && (d.autoHeight = !0); d.group = b.group; d.index = a; b.coming = d; if (!1 === b.trigger("beforeLoad")) b.coming = null; else {
                c = d.type; e = d.href; if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1; b.isActive =
                !0; if ("image" === c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible"; "image" === c && (d.aspectRatio = !0); "iframe" === c && s && (d.scrolling = "scroll"); d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (s ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body"); f.extend(d, { skin: f(".fancybox-skin", d.wrap), outer: f(".fancybox-outer", d.wrap), inner: f(".fancybox-inner", d.wrap) }); f.each(["Top", "Right", "Bottom", "Left"], function (a, b) { d.skin.css("padding" + b, x(d.padding[a])) }); b.trigger("onReady");
                if ("inline" === c || "html" === c) { if (!d.content || !d.content.length) return b._error("content") } else if (!e) return b._error("href"); "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        }, _error: function (a) { f.extend(b.coming, { type: "html", autoWidth: !0, autoHeight: !0, minWidth: 0, minHeight: 0, scrolling: "no", hasError: a, content: b.coming.tpl.error }); b._afterLoad() }, _loadImage: function () {
            var a = b.imgPreload = new Image; a.onload = function () {
                this.onload = this.onerror = null; b.coming.width =
                this.width; b.coming.height = this.height; b._afterLoad()
            }; a.onerror = function () { this.onload = this.onerror = null; b._error("image") }; a.src = b.coming.href; !0 !== a.complete && b.showLoading()
        }, _loadAjax: function () { var a = b.coming; b.showLoading(); b.ajaxLoad = f.ajax(f.extend({}, a.ajax, { url: a.href, error: function (a, e) { b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading() }, success: function (d, e) { "success" === e && (a.content = d, b._afterLoad()) } })) }, _loadIframe: function () {
            var a = b.coming, d = f(a.tpl.iframe.replace(/\{rnd\}/g,
            (new Date).getTime())).attr("scrolling", s ? "auto" : a.iframe.scrolling).attr("src", a.href); f(a.wrap).bind("onReset", function () { try { f(this).find("iframe").hide().attr("src", "//about:blank").end().empty() } catch (a) { } }); a.iframe.preload && (b.showLoading(), d.one("load", function () { f(this).data("ready", 1); s || f(this).bind("load.fb", b.update); f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(); b._afterLoad() })); a.content = d.appendTo(a.inner); a.iframe.preload || b._afterLoad()
        }, _preloadImages: function () {
            var a =
            b.group, d = b.current, e = a.length, c = d.preload ? Math.min(d.preload, e - 1) : 0, f, g; for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        }, _afterLoad: function () {
            var a = b.coming, d = b.current, e, c, k, g, h; b.hideLoading(); if (a && !1 !== b.isActive) if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null; else {
                d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()); b.unbindEvents();
                e = a.content; c = a.type; k = a.scrolling; f.extend(b, { wrap: a.wrap, skin: a.skin, outer: a.outer, inner: a.inner, current: a, previous: d }); g = a.href; switch (c) {
                    case "inline": case "ajax": case "html": a.selector ? e = f("<div>").html(e).find(a.selector) : t(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function () {
                        f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",
                        !1)
                    })); break; case "image": e = a.tpl.image.replace("{href}", g); break; case "swf": e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function (a, b) { e += '<param name="' + a + '" value="' + b + '"></param>'; h += " " + a + '="' + b + '"' }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                } (!t(e) || !e.parent().is(a.inner)) && a.inner.append(e); b.trigger("beforeShow");
                a.inner.css("overflow", "yes" === k ? "scroll" : "no" === k ? "hidden" : k); b._setDimension(); b.reposition(); b.isOpen = !1; b.coming = null; b.bindEvents(); if (b.isOpened) { if (d.prevMethod) b.transitions[d.prevMethod]() } else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove(); b.transitions[b.isOpened ? a.nextMethod : a.openMethod](); b._preloadImages()
            }
        }, _setDimension: function () {
            var a = b.getViewport(), d = 0, e = !1, c = !1, e = b.wrap, k = b.skin, g = b.inner, h = b.current, c = h.width, j = h.height, m = h.minWidth, u = h.minHeight, n = h.maxWidth,
            v = h.maxHeight, s = h.scrolling, q = h.scrollOutside ? h.scrollbarWidth : 0, y = h.margin, p = l(y[1] + y[3]), r = l(y[0] + y[2]), z, A, t, D, B, G, C, E, w; e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp"); y = l(k.outerWidth(!0) - k.width()); z = l(k.outerHeight(!0) - k.height()); A = p + y; t = r + z; D = F(c) ? (a.w - A) * l(c) / 100 : c; B = F(j) ? (a.h - t) * l(j) / 100 : j; if ("iframe" === h.type) {
                if (w = h.content, h.autoHeight && 1 === w.data("ready")) try {
                    w[0].contentWindow.document.location && (g.width(D).height(9999), G = w.contents().find("body"), q && G.css("overflow-x",
                    "hidden"), B = G.height())
                } catch (H) { }
            } else if (h.autoWidth || h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp"); c = l(D); j = l(B); E = D / B; m = l(F(m) ? l(m, "w") - A : m); n = l(F(n) ? l(n, "w") - A : n); u = l(F(u) ? l(u, "h") - t : u); v = l(F(v) ? l(v, "h") - t : v); G = n; C = v; h.fitToView && (n = Math.min(a.w - A, n), v = Math.min(a.h - t, v)); A = a.w - p; r = a.h - r; h.aspectRatio ? (c > n && (c = n, j = l(c / E)), j > v && (j = v, c = l(j * E)), c < m && (c = m, j = l(c / E)), j < u &&
            (j = u, c = l(j * E))) : (c = Math.max(m, Math.min(c, n)), h.autoHeight && "iframe" !== h.type && (g.width(c), j = g.height()), j = Math.max(u, Math.min(j, v))); if (h.fitToView) if (g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height(), h.aspectRatio) for (; (a > A || p > r) && (c > m && j > u) && !(19 < d++) ;) j = Math.max(u, Math.min(v, j - 10)), c = l(j * E), c < m && (c = m, j = l(c / E)), c > n && (c = n, j = l(c / E)), g.width(c).height(j), e.width(c + y), a = e.width(), p = e.height(); else c = Math.max(m, Math.min(c, c - (a - A))), j = Math.max(u, Math.min(j, j - (p - r))); q && ("auto" === s && j < B && c + y +
            q < A) && (c += q); g.width(c).height(j); e.width(c + y); a = e.width(); p = e.height(); e = (a > A || p > r) && c > m && j > u; c = h.aspectRatio ? c < G && j < C && c < D && j < B : (c < G || j < C) && (c < D || j < B); f.extend(h, { dim: { width: x(a), height: x(p) }, origWidth: D, origHeight: B, canShrink: e, canExpand: c, wPadding: y, hPadding: z, wrapSpace: p - k.outerHeight(!0), skinSpace: k.height() - j }); !w && (h.autoHeight && j > u && j < v && !c) && g.height("auto")
        }, _getPosition: function (a) {
            var d = b.current, e = b.getViewport(), c = d.margin, f = b.wrap.width() + c[1] + c[3], g = b.wrap.height() + c[0] + c[2], c = {
                position: "absolute",
                top: c[0], left: c[3]
            }; d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x); c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio)); c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio)); return c
        }, _afterZoomIn: function () {
            var a = b.current; a && (b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function (d) {
                !f(d.target).is("a") && !f(d.target).parent().is("a") &&
                (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function (a) { a.preventDefault(); b.close() }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), !a.loop && a.index === a.group.length - 1 ? b.play(!1) : b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play()))
        }, _afterZoomOut: function (a) {
            a =
            a || b.current; f(".fancybox-wrap").trigger("onReset").remove(); f.extend(b, { group: {}, opts: {}, router: !1, current: null, isActive: !1, isOpened: !1, isOpen: !1, isClosing: !1, wrap: null, skin: null, outer: null, inner: null }); b.trigger("afterClose", a)
        }
    }); b.transitions = {
        getOrigPosition: function () {
            var a = b.current, d = a.element, e = a.orig, c = {}, f = 50, g = 50, h = a.hPadding, j = a.wPadding, m = b.getViewport(); !e && (a.isDom && d.is(":visible")) && (e = d.find("img:first"), e.length || (e = d)); t(e) ? (c = e.offset(), e.is("img") && (f = e.outerWidth(), g = e.outerHeight())) :
            (c.top = m.y + (m.h - g) * a.topRatio, c.left = m.x + (m.w - f) * a.leftRatio); if ("fixed" === b.wrap.css("position") || a.locked) c.top -= m.y, c.left -= m.x; return c = { top: x(c.top - h * a.topRatio), left: x(c.left - j * a.leftRatio), width: x(f + j), height: x(g + h) }
        }, step: function (a, d) {
            var e, c, f = d.prop; c = b.current; var g = c.wrapSpace, h = c.skinSpace; if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](l("width" === f ? c : c - g * e)), b.inner[f](l("width" ===
            f ? c : c - g * e - h * e))
        }, zoomIn: function () { var a = b.current, d = a.pos, e = a.openEffect, c = "elastic" === e, k = f.extend({ opacity: 1 }, d); delete k.position; c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1); b.wrap.css(d).animate(k, { duration: "none" === e ? 0 : a.openSpeed, easing: a.openEasing, step: c ? this.step : null, complete: b._afterZoomIn }) }, zoomOut: function () {
            var a = b.current, d = a.closeEffect, e = "elastic" === d, c = { opacity: 0.1 }; e && (c = this.getOrigPosition(), a.closeOpacity && (c.opacity = 0.1)); b.wrap.animate(c,
            { duration: "none" === d ? 0 : a.closeSpeed, easing: a.closeEasing, step: e ? this.step : null, complete: b._afterZoomOut })
        }, changeIn: function () { var a = b.current, d = a.nextEffect, e = a.pos, c = { opacity: 1 }, f = b.direction, g; e.opacity = 0.1; "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(l(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(l(e[g]) + 200), c[g] = "-=200px")); "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, { duration: a.nextSpeed, easing: a.nextEasing, complete: b._afterZoomIn }) }, changeOut: function () {
            var a =
            b.previous, d = a.prevEffect, e = { opacity: 0.1 }, c = b.direction; "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px"); a.wrap.animate(e, { duration: "none" === d ? 0 : a.prevSpeed, easing: a.prevEasing, complete: function () { f(this).trigger("onReset").remove() } })
        }
    }; b.helpers.overlay = {
        defaults: { closeClick: !0, speedOut: 200, showEarly: !0, css: {}, locked: !s, fixed: !0 }, overlay: null, fixed: !1, create: function (a) {
            a = f.extend({}, this.defaults, a); this.overlay && this.close(); this.overlay = f('<div class="fancybox-overlay"></div>').appendTo("body");
            this.fixed = !1; a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        }, open: function (a) { var d = this; a = f.extend({}, this.defaults, a); this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a); this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update()); a.closeClick && this.overlay.bind("click.overlay", function (a) { f(a.target).hasClass("fancybox-overlay") && (b.isActive ? b.close() : d.close()) }); this.overlay.css(a.css).show() },
        close: function () { f(".fancybox-overlay").remove(); q.unbind("resize.overlay"); this.overlay = null; !1 !== this.margin && (f("body").css("margin-right", this.margin), this.margin = !1); this.el && this.el.removeClass("fancybox-lock") }, update: function () { var a = "100%", b; this.overlay.width(a).height("100%"); H ? (b = Math.max(z.documentElement.offsetWidth, z.body.offsetWidth), n.width() > b && (a = n.width())) : n.width() > q.width() && (a = n.width()); this.overlay.width(a).height(n.height()) }, onReady: function (a, b) {
            f(".fancybox-overlay").stop(!0,
            !0); this.overlay || (this.margin = n.height() > q.height() || "scroll" === f("body").css("overflow-y") ? f("body").css("margin-right") : !1, this.el = z.all && !z.querySelector ? f("html") : f("body"), this.create(a)); a.locked && this.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1); !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        }, beforeShow: function (a, b) { b.locked && (this.el.addClass("fancybox-lock"), !1 !== this.margin && f("body").css("margin-right", l(this.margin) + b.scrollbarWidth)); this.open(a) }, onUpdate: function () {
            this.fixed ||
            this.update()
        }, afterClose: function (a) { this.overlay && !b.isActive && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this)) }
    }; b.helpers.title = {
        defaults: { type: "float", position: "bottom" }, beforeShow: function (a) {
            var d = b.current, e = d.title, c = a.type; f.isFunction(e) && (e = e.call(d.element, d)); if (p(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>"); switch (c) {
                    case "inside": c = b.skin; break; case "outside": c = b.wrap; break; case "over": c = b.inner; break; default: c = b.skin, d.appendTo("body"),
                    H && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(l(d.css("margin-bottom")))
                } d["top" === a.position ? "prependTo" : "appendTo"](c)
            }
        }
    }; f.fn.fancybox = function (a) {
        var d, e = f(this), c = this.selector || "", k = function (g) {
            var h = f(this).blur(), j = d, k, l; !g.ctrlKey && (!g.altKey && !g.shiftKey && !g.metaKey) && !h.is(".fancybox-wrap") && (k = a.groupAttr || "data-fancybox-group", l = h.attr(k), l || (k = "rel", l = h.get(0)[k]), l && ("" !== l && "nofollow" !== l) && (h = c.length ? f(c) : e, h = h.filter("[" + k + '="' + l +
            '"]'), j = h.index(this)), a.index = j, !1 !== b.open(h, a) && g.preventDefault())
        }; a = a || {}; d = a.index || 0; !c || !1 === a.live ? e.unbind("click.fb-start").bind("click.fb-start", k) : n.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", k); this.filter("[data-fancybox-start=1]").trigger("click"); return this
    }; n.ready(function () {
        f.scrollbarWidth === r && (f.scrollbarWidth = function () {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"), b = a.children(),
            b = b.innerWidth() - b.height(99).innerWidth(); a.remove(); return b
        }); if (f.support.fixedPosition === r) { var a = f.support, d = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"), e = 20 === d[0].offsetTop || 15 === d[0].offsetTop; d.remove(); a.fixedPosition = e } f.extend(b.defaults, { scrollbarWidth: f.scrollbarWidth(), fixed: f.support.fixedPosition, parent: f("body") })
    })
})(window, document, jQuery);

(function ($) {
    "use strict";

    
    var F = $.fancybox,
		format = function (url, rez, params) {
		    params = params || '';

		    if ($.type(params) === "object") {
		        params = $.param(params, true);
		    }

		    $.each(rez, function (key, value) {
		        url = url.replace('$' + key, value || '');
		    });

		    if (params.length) {
		        url += (url.indexOf('?') > 0 ? '&' : '?') + params;
		    }

		    return url;
		};

    
    F.helpers.media = {
        defaults: {
            youtube: {
                matcher: /(youtube\.com|youtu\.be)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                params: {
                    autoplay: 1,
                    autohide: 1,
                    fs: 1,
                    rel: 0,
                    hd: 1,
                    wmode: 'opaque',
                    enablejsapi: 1
                },
                type: 'iframe',
                url: '//www.youtube.com/embed/$3'
            },
            vimeo: {
                matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                params: {
                    autoplay: 1,
                    hd: 1,
                    show_title: 1,
                    show_byline: 1,
                    show_portrait: 0,
                    fullscreen: 1
                },
                type: 'iframe',
                url: '//player.vimeo.com/video/$1'
            },
            metacafe: {
                matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                params: {
                    autoPlay: 'yes'
                },
                type: 'swf',
                url: function (rez, params, obj) {
                    obj.swf.flashVars = 'playerVars=' + $.param(params, true);

                    return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
                }
            },
            dailymotion: {
                matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                params: {
                    additionalInfos: 0,
                    autoStart: 1
                },
                type: 'swf',
                url: '//www.dailymotion.com/swf/video/$1'
            },
            twitvid: {
                matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                params: {
                    autoplay: 0
                },
                type: 'iframe',
                url: '//www.twitvid.com/embed.php?guid=$1'
            },
            twitpic: {
                matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                type: 'image',
                url: '//twitpic.com/show/full/$1/'
            },
            instagram: {
                matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                type: 'image',
                url: '//$1/p/$2/media/'
            },
            google_maps: {
                matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                type: 'iframe',
                url: function (rez) {
                    return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
                }
            }
        },

        beforeLoad: function (opts, obj) {
            var url = obj.href || '',
				type = false,
				what,
				item,
				rez,
				params;

            for (what in opts) {
                item = opts[what];
                rez = url.match(item.matcher);

                if (rez) {
                    type = item.type;
                    params = $.extend(true, {}, item.params, obj[what] || ($.isPlainObject(opts[what]) ? opts[what].params : null));

                    url = $.type(item.url) === "function" ? item.url.call(this, rez, params, obj) : format(item.url, rez, params);

                    break;
                }
            }

            if (type) {
                obj.href = url;
                obj.type = type;

                obj.autoHeight = false;
            }
        }
    };

}(jQuery));


(function ($) {

    "use strict";

    $.fn.fitVids = function (options) {
        var settings = {
            customSelector: null
        };

        if (!document.getElementById('fit-vids-style')) {

            var div = document.createElement('div'),
                ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

            div.className = 'fit-vids-style';
            div.id = 'fit-vids-style';
            div.style.display = 'none';
            div.innerHTML = '&shy;<style>         \
        .fluid-width-video-wrapper {        \
           width: 100%;                     \
           position: relative;              \
           padding: 0;                      \
        }                                   \
                                            \
        .fluid-width-video-wrapper iframe,  \
        .fluid-width-video-wrapper object,  \
        .fluid-width-video-wrapper embed {  \
           position: absolute;              \
           top: 0;                          \
           left: 0;                         \
           width: 100%;                     \
           height: 100%;                    \
        }                                   \
      </style>';

            ref.parentNode.insertBefore(div, ref);

        }

        if (options) {
            $.extend(settings, options);
        }

        return this.each(function () {
            var selectors = [
              "iframe[src*='player.vimeo.com']",
              "iframe[src*='youtube.com']",
              "iframe[src*='youtube-nocookie.com']",
              "iframe[src*='kickstarter.com'][src*='video.html']",
              "object",
              "embed"
            ];

            if (settings.customSelector) {
                selectors.push(settings.customSelector);
            }

            var $allVideos = $(this).find(selectors.join(','));
            $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

            $allVideos.each(function () {
                var $this = $(this);
                if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
                var height = (this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10)))) ? parseInt($this.attr('height'), 10) : $this.height(),
                    width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
                    aspectRatio = height / width;
                if (!$this.attr('id')) {
                    var videoID = 'fitvid' + Math.floor(Math.random() * 999999);
                    $this.attr('id', videoID);
                }
                $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100) + "%");
                $this.removeAttr('height').removeAttr('width');
            });
        });
    };
})(jQuery);


(function (t) { "use strict"; function e(t) { if (t) { if ("string" == typeof n[t]) return t; t = t.charAt(0).toUpperCase() + t.slice(1); for (var e, o = 0, r = i.length; r > o; o++) if (e = i[o] + t, "string" == typeof n[e]) return e } } var i = "Webkit Moz ms Ms O".split(" "), n = document.documentElement.style; "function" == typeof define && define.amd ? define(function () { return e }) : t.getStyleProperty = e })(window), function (t) { "use strict"; function e(t) { var e = parseFloat(t), i = -1 === t.indexOf("%") && !isNaN(e); return i && e } function i() { for (var t = { width: 0, height: 0, innerWidth: 0, innerHeight: 0, outerWidth: 0, outerHeight: 0 }, e = 0, i = s.length; i > e; e++) { var n = s[e]; t[n] = 0 } return t } function n(t) { function n(t) { if ("string" == typeof t && (t = document.querySelector(t)), t && "object" == typeof t && t.nodeType) { var n = r(t); if ("none" === n.display) return i(); var h = {}; h.width = t.offsetWidth, h.height = t.offsetHeight; for (var p = h.isBorderBox = !(!a || !n[a] || "border-box" !== n[a]), u = 0, f = s.length; f > u; u++) { var d = s[u], c = n[d], l = parseFloat(c); h[d] = isNaN(l) ? 0 : l } var m = h.paddingLeft + h.paddingRight, y = h.paddingTop + h.paddingBottom, g = h.marginLeft + h.marginRight, v = h.marginTop + h.marginBottom, _ = h.borderLeftWidth + h.borderRightWidth, b = h.borderTopWidth + h.borderBottomWidth, L = p && o, E = e(n.width); E !== !1 && (h.width = E + (L ? 0 : m + _)); var I = e(n.height); return I !== !1 && (h.height = I + (L ? 0 : y + b)), h.innerWidth = h.width - (m + _), h.innerHeight = h.height - (y + b), h.outerWidth = h.width + g, h.outerHeight = h.height + v, h } } var o, a = t("boxSizing"); return function () { if (a) { var t = document.createElement("div"); t.style.width = "200px", t.style.padding = "1px 2px 3px 4px", t.style.borderStyle = "solid", t.style.borderWidth = "1px 2px 3px 4px", t.style[a] = "border-box"; var i = document.body || document.documentElement; i.appendChild(t); var n = r(t); o = 200 === e(n.width), i.removeChild(t) } }(), n } var o = document.defaultView, r = o && o.getComputedStyle ? function (t) { return o.getComputedStyle(t, null) } : function (t) { return t.currentStyle }, s = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"]; "function" == typeof define && define.amd ? define(["get-style-property"], n) : t.getSize = n(t.getStyleProperty) }(window), function (t) { "use strict"; var e = document.documentElement, i = function () { }; e.addEventListener ? i = function (t, e, i) { t.addEventListener(e, i, !1) } : e.attachEvent && (i = function (e, i, n) { e[i + n] = n.handleEvent ? function () { var e = t.event; e.target = e.target || e.srcElement, n.handleEvent.call(n, e) } : function () { var i = t.event; i.target = i.target || i.srcElement, n.call(e, i) }, e.attachEvent("on" + i, e[i + n]) }); var n = function () { }; e.removeEventListener ? n = function (t, e, i) { t.removeEventListener(e, i, !1) } : e.detachEvent && (n = function (t, e, i) { t.detachEvent("on" + e, t[e + i]); try { delete t[e + i] } catch (n) { t[e + i] = void 0 } }); var o = { bind: i, unbind: n }; "function" == typeof define && define.amd ? define(o) : t.eventie = o }(this), function (t) { "use strict"; function e(t) { "function" == typeof t && (e.isReady ? t() : r.push(t)) } function i(t) { var i = "readystatechange" === t.type && "complete" !== o.readyState; if (!e.isReady && !i) { e.isReady = !0; for (var n = 0, s = r.length; s > n; n++) { var a = r[n]; a() } } } function n(n) { return n.bind(o, "DOMContentLoaded", i), n.bind(o, "readystatechange", i), n.bind(t, "load", i), e } var o = t.document, r = []; e.isReady = !1, "function" == typeof define && define.amd ? define(["eventie"], n) : t.docReady = n(t.eventie) }(this), function (t) { "use strict"; function e() { } function i(t, e) { if (o) return e.indexOf(t); for (var i = e.length; i--;) if (e[i] === t) return i; return -1 } var n = e.prototype, o = Array.prototype.indexOf ? !0 : !1; n._getEvents = function () { return this._events || (this._events = {}) }, n.getListeners = function (t) { var e, i, n = this._getEvents(); if ("object" == typeof t) { e = {}; for (i in n) n.hasOwnProperty(i) && t.test(i) && (e[i] = n[i]) } else e = n[t] || (n[t] = []); return e }, n.getListenersAsObject = function (t) { var e, i = this.getListeners(t); return i instanceof Array && (e = {}, e[t] = i), e || i }, n.addListener = function (t, e) { var n, o = this.getListenersAsObject(t); for (n in o) o.hasOwnProperty(n) && -1 === i(e, o[n]) && o[n].push(e); return this }, n.on = n.addListener, n.defineEvent = function (t) { return this.getListeners(t), this }, n.defineEvents = function (t) { for (var e = 0; t.length > e; e += 1) this.defineEvent(t[e]); return this }, n.removeListener = function (t, e) { var n, o, r = this.getListenersAsObject(t); for (o in r) r.hasOwnProperty(o) && (n = i(e, r[o]), -1 !== n && r[o].splice(n, 1)); return this }, n.off = n.removeListener, n.addListeners = function (t, e) { return this.manipulateListeners(!1, t, e) }, n.removeListeners = function (t, e) { return this.manipulateListeners(!0, t, e) }, n.manipulateListeners = function (t, e, i) { var n, o, r = t ? this.removeListener : this.addListener, s = t ? this.removeListeners : this.addListeners; if ("object" != typeof e || e instanceof RegExp) for (n = i.length; n--;) r.call(this, e, i[n]); else for (n in e) e.hasOwnProperty(n) && (o = e[n]) && ("function" == typeof o ? r.call(this, n, o) : s.call(this, n, o)); return this }, n.removeEvent = function (t) { var e, i = typeof t, n = this._getEvents(); if ("string" === i) delete n[t]; else if ("object" === i) for (e in n) n.hasOwnProperty(e) && t.test(e) && delete n[e]; else delete this._events; return this }, n.emitEvent = function (t, e) { var i, n, o, r = this.getListenersAsObject(t); for (n in r) if (r.hasOwnProperty(n)) for (i = r[n].length; i--;) o = e ? r[n][i].apply(null, e) : r[n][i](), o === !0 && this.removeListener(t, r[n][i]); return this }, n.trigger = n.emitEvent, n.emit = function (t) { var e = Array.prototype.slice.call(arguments, 1); return this.emitEvent(t, e) }, "function" == typeof define && define.amd ? define(function () { return e }) : t.EventEmitter = e }(this), function (t) { "use strict"; function e() { } function i(t) { function i(e) { e.prototype.option || (e.prototype.option = function (e) { t.isPlainObject(e) && (this.options = t.extend(!0, this.options, e)) }) } function o(e, i) { t.fn[e] = function (o) { if ("string" == typeof o) { for (var s = n.call(arguments, 1), a = 0, h = this.length; h > a; a++) { var p = this[a], u = t.data(p, e); if (u) if (t.isFunction(u[o]) && "_" !== o.charAt(0)) { var f = u[o].apply(u, s); if (void 0 !== f) return f } else r("no such method '" + o + "' for " + e + " instance"); else r("cannot call methods on " + e + " prior to initialization; " + "attempted to call '" + o + "'") } return this } return this.each(function () { var n = t.data(this, e); n ? (n.option(o), n._init()) : (n = new i(this, o), t.data(this, e, n)) }) } } if (t) { var r = "undefined" == typeof console ? e : function (t) { console.error(t) }; t.bridget = function (t, e) { i(e), o(t, e) } } } var n = Array.prototype.slice; "function" == typeof define && define.amd ? define(["jquery"], i) : i(t.jQuery) }(window), function (t, e) { "use strict"; function i(t, e) { return t[a](e) } function n(t) { if (!t.parentNode) { var e = document.createDocumentFragment(); e.appendChild(t) } } function o(t, e) { n(t); for (var i = t.parentNode.querySelectorAll(e), o = 0, r = i.length; r > o; o++) if (i[o] === t) return !0; return !1 } function r(t, e) { return n(t), i(t, e) } var s, a = function () { if (e.matchesSelector) return "matchesSelector"; for (var t = ["webkit", "moz", "ms", "o"], i = 0, n = t.length; n > i; i++) { var o = t[i], r = o + "MatchesSelector"; if (e[r]) return r } }(); if (a) { var h = document.createElement("div"), p = i(h, "div"); s = p ? i : r } else s = o; "function" == typeof define && define.amd ? define(function () { return s }) : window.matchesSelector = s }(this, Element.prototype), function (t) { "use strict"; function e(t, e) { for (var i in e) t[i] = e[i]; return t } function i(t, e) { t && (this.element = t, this.layout = e, this.position = { x: 0, y: 0 }, this._create()) } var n = t.getSize, o = t.getStyleProperty, r = t.EventEmitter, s = document.defaultView, a = s && s.getComputedStyle ? function (t) { return s.getComputedStyle(t, null) } : function (t) { return t.currentStyle }, h = o("transition"), p = o("transform"), u = h && p, f = !!o("perspective"), d = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "otransitionend", transition: "transitionend" }[h], c = ["transform", "transition", "transitionDuration", "transitionProperty"], l = function () { for (var t = {}, e = 0, i = c.length; i > e; e++) { var n = c[e], r = o(n); r && r !== n && (t[n] = r) } return t }(); e(i.prototype, r.prototype), i.prototype._create = function () { this.css({ position: "absolute" }) }, i.prototype.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, i.prototype.getSize = function () { this.size = n(this.element) }, i.prototype.css = function (t) { var e = this.element.style; for (var i in t) { var n = l[i] || i; e[n] = t[i] } }, i.prototype.getPosition = function () { var t = a(this.element), e = this.layout.options, i = e.isOriginLeft, n = e.isOriginTop, o = parseInt(t[i ? "left" : "right"], 10), r = parseInt(t[n ? "top" : "bottom"], 10); o = isNaN(o) ? 0 : o, r = isNaN(r) ? 0 : r; var s = this.layout.size; o -= i ? s.paddingLeft : s.paddingRight, r -= n ? s.paddingTop : s.paddingBottom, this.position.x = o, this.position.y = r }, i.prototype.layoutPosition = function () { var t = this.layout.size, e = this.layout.options, i = {}; e.isOriginLeft ? (i.left = this.position.x + t.paddingLeft + "px", i.right = "") : (i.right = this.position.x + t.paddingRight + "px", i.left = ""), e.isOriginTop ? (i.top = this.position.y + t.paddingTop + "px", i.bottom = "") : (i.bottom = this.position.y + t.paddingBottom + "px", i.top = ""), this.css(i), this.emitEvent("layout", [this]) }; var m = f ? function (t, e) { return "translate3d(" + t + "px, " + e + "px, 0)" } : function (t, e) { return "translate(" + t + "px, " + e + "px)" }; i.prototype._transitionTo = function (t, e) { this.getPosition(); var i = this.position.x, n = this.position.y, o = parseInt(t, 10), r = parseInt(e, 10), s = o === this.position.x && r === this.position.y; if (this.setPosition(t, e), s && !this.isTransitioning) return this.layoutPosition(), void 0; var a = t - i, h = e - n, p = {}, u = this.layout.options; a = u.isOriginLeft ? a : -a, h = u.isOriginTop ? h : -h, p.transform = m(a, h), this.transition({ to: p, onTransitionEnd: this.layoutPosition, isCleaning: !0 }) }, i.prototype.goTo = function (t, e) { this.setPosition(t, e), this.layoutPosition() }, i.prototype.moveTo = u ? i.prototype._transitionTo : i.prototype.goTo, i.prototype.setPosition = function (t, e) { this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10) }, i.prototype._nonTransition = function (t) { this.css(t.to), t.isCleaning && this._removeStyles(t.to), t.onTransitionEnd && t.onTransitionEnd.call(this) }, i.prototype._transition = function (t) { var e = this.layout.options.transitionDuration; if (!parseFloat(e)) return this._nonTransition(t), void 0; var i = t.to, n = []; for (var o in i) n.push(o); var r = {}; if (r.transitionProperty = n.join(","), r.transitionDuration = e, this.element.addEventListener(d, this, !1), (t.isCleaning || t.onTransitionEnd) && this.on("transitionEnd", function (e) { return t.isCleaning && e._removeStyles(i), t.onTransitionEnd && t.onTransitionEnd.call(e), !0 }), t.from) { this.css(t.from); var s = this.element.offsetHeight; s = null } this.css(r), this.css(i), this.isTransitioning = !0 }, i.prototype.transition = i.prototype[h ? "_transition" : "_nonTransition"], i.prototype.onwebkitTransitionEnd = function (t) { this.ontransitionend(t) }, i.prototype.onotransitionend = function (t) { this.ontransitionend(t) }, i.prototype.ontransitionend = function (t) { t.target === this.element && (this.removeTransitionStyles(), this.element.removeEventListener(d, this, !1), this.isTransitioning = !1, this.emitEvent("transitionEnd", [this])) }, i.prototype._removeStyles = function (t) { var e = {}; for (var i in t) e[i] = ""; this.css(e) }; var y = { transitionProperty: "", transitionDuration: "" }; i.prototype.removeTransitionStyles = function () { this.css(y) }, i.prototype.removeElem = function () { this.element.parentNode.removeChild(this.element), this.emitEvent("remove", [this]) }, i.prototype.remove = h ? function () { var t = this; this.on("transitionEnd", function () { return t.removeElem(), !0 }), this.hide() } : i.prototype.removeElem, i.prototype.reveal = function () { this.css({ display: "" }); var t = this.layout.options; this.transition({ from: t.hiddenStyle, to: t.visibleStyle, isCleaning: !0 }) }, i.prototype.hide = function () { this.css({ display: "" }); var t = this.layout.options; this.transition({ from: t.visibleStyle, to: t.hiddenStyle, isCleaning: !0, onTransitionEnd: function () { this.css({ display: "none" }) } }) }, i.prototype.destroy = function () { this.css({ position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: "" }) }, t.Outlayer = { Item: i } }(window), function (t) { "use strict"; function e(t, e) { for (var i in e) t[i] = e[i]; return t } function i(t) { return "[object Array]" === v.call(t) } function n(t) { var e = []; if (i(t)) e = t; else if ("number" == typeof t.length) for (var n = 0, o = t.length; o > n; n++) e.push(t[n]); else e.push(t); return e } function o(t) { return t.replace(/(.)([A-Z])/g, function (t, e, i) { return e + "-" + i }).toLowerCase() } function r(t, i) { if ("string" == typeof t && (t = l.querySelector(t)), !t || !_(t)) return m && m.error("Bad " + this.settings.namespace + " element: " + t), void 0; this.element = t, this.options = e({}, this.options), e(this.options, i); var n = ++L; this.element.outlayerGUID = n, E[n] = this, this._create(), this.options.isInitLayout && this.layout() } function s(t, i) { t.prototype[i] = e({}, r.prototype[i]) } var a = t.Outlayer, h = a.Item, p = t.docReady, u = t.EventEmitter, f = t.eventie, d = t.getSize, c = t.matchesSelector, l = t.document, m = t.console, y = t.jQuery, g = function () { }, v = Object.prototype.toString, _ = "object" == typeof HTMLElement ? function (t) { return t instanceof HTMLElement } : function (t) { return t && "object" == typeof t && 1 === t.nodeType && "string" == typeof t.nodeName }, b = Array.prototype.indexOf ? function (t, e) { return t.indexOf(e) } : function (t, e) { for (var i = 0, n = t.length; n > i; i++) if (t[i] === e) return i; return -1 }, L = 0, E = {}; r.prototype.settings = { namespace: "outlayer", item: a.Item }, r.prototype.options = { containerStyle: { position: "relative" }, isInitLayout: !0, isOriginLeft: !0, isOriginTop: !0, isResizeBound: !0, transitionDuration: "0.4s", hiddenStyle: { opacity: 0, transform: "scale(0.001)" }, visibleStyle: { opacity: 1, transform: "scale(1)" } }, e(r.prototype, u.prototype), r.prototype._create = function () { this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), e(this.element.style, this.options.containerStyle), this.options.isResizeBound && this.bindResize() }, r.prototype.reloadItems = function () { this.items = this._getItems(this.element.children) }, r.prototype._getItems = function (t) { for (var e = this._filterFindItemElements(t), i = this.settings.item, n = [], o = 0, r = e.length; r > o; o++) { var s = e[o], a = new i(s, this, this.options.itemOptions); n.push(a) } return n }, r.prototype._filterFindItemElements = function (t) { t = n(t); var e = this.options.itemSelector; if (!e) return t; for (var i = [], o = 0, r = t.length; r > o; o++) { var s = t[o]; c(s, e) && i.push(s); for (var a = s.querySelectorAll(e), h = 0, p = a.length; p > h; h++) i.push(a[h]) } return i }, r.prototype.getItemElements = function () { for (var t = [], e = 0, i = this.items.length; i > e; e++) t.push(this.items[e].element); return t }, r.prototype.layout = function () { this._resetLayout(), this._manageStamps(); var t = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited; this.layoutItems(this.items, t), this._isLayoutInited = !0 }, r.prototype._init = r.prototype.layout, r.prototype._resetLayout = function () { this.getSize() }, r.prototype.getSize = function () { this.size = d(this.element) }, r.prototype._getMeasurement = function (t, e) { var i, n = this.options[t]; n ? ("string" == typeof n ? i = this.element.querySelector(n) : _(n) && (i = n), this[t] = i ? d(i)[e] : n) : this[t] = 0 }, r.prototype.layoutItems = function (t, e) { t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout() }, r.prototype._getItemsForLayout = function (t) { for (var e = [], i = 0, n = t.length; n > i; i++) { var o = t[i]; o.isIgnored || e.push(o) } return e }, r.prototype._layoutItems = function (t, e) { if (!t || !t.length) return this.emitEvent("layoutComplete", [this, t]), void 0; this._itemsOn(t, "layout", function () { this.emitEvent("layoutComplete", [this, t]) }); for (var i = [], n = 0, o = t.length; o > n; n++) { var r = t[n], s = this._getItemLayoutPosition(r); s.item = r, s.isInstant = e, i.push(s) } this._processLayoutQueue(i) }, r.prototype._getItemLayoutPosition = function () { return { x: 0, y: 0 } }, r.prototype._processLayoutQueue = function (t) { for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; this._positionItem(n.item, n.x, n.y, n.isInstant) } }, r.prototype._positionItem = function (t, e, i, n) { n ? t.goTo(e, i) : t.moveTo(e, i) }, r.prototype._postLayout = function () { var t = this._getContainerSize(); t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1)) }, r.prototype._getContainerSize = g, r.prototype._setContainerMeasure = function (t, e) { if (void 0 !== t) { var i = this.size; i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px" } }, r.prototype._itemsOn = function (t, e, i) { function n() { return o++, o === r && i.call(s), !0 } for (var o = 0, r = t.length, s = this, a = 0, h = t.length; h > a; a++) { var p = t[a]; p.on(e, n) } }, r.prototype.ignore = function (t) { var e = this.getItem(t); e && (e.isIgnored = !0) }, r.prototype.unignore = function (t) { var e = this.getItem(t); e && delete e.isIgnored }, r.prototype.stamp = function (t) { if (t = this._find(t)) { this.stamps = this.stamps.concat(t); for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; this.ignore(n) } } }, r.prototype.unstamp = function (t) { if (t = this._find(t)) for (var e = 0, i = t.length; i > e; e++) { var n = t[e], o = b(this.stamps, n); -1 !== o && this.stamps.splice(o, 1), this.unignore(n) } }, r.prototype._find = function (t) { return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n(t)) : void 0 }, r.prototype._manageStamps = function () { if (this.stamps && this.stamps.length) { this._getBoundingRect(); for (var t = 0, e = this.stamps.length; e > t; t++) { var i = this.stamps[t]; this._manageStamp(i) } } }, r.prototype._getBoundingRect = function () { var t = this.element.getBoundingClientRect(), e = this.size; this._boundingRect = { left: t.left + e.paddingLeft + e.borderLeftWidth, top: t.top + e.paddingTop + e.borderTopWidth, right: t.right - (e.paddingRight + e.borderRightWidth), bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth) } }, r.prototype._manageStamp = g, r.prototype._getElementOffset = function (t) { var e = t.getBoundingClientRect(), i = this._boundingRect, n = d(t), o = { left: e.left - i.left - n.marginLeft, top: e.top - i.top - n.marginTop, right: i.right - e.right - n.marginRight, bottom: i.bottom - e.bottom - n.marginBottom }; return o }, r.prototype.handleEvent = function (t) { var e = "on" + t.type; this[e] && this[e](t) }, r.prototype.bindResize = function () { this.isResizeBound || (f.bind(t, "resize", this), this.isResizeBound = !0) }, r.prototype.unbindResize = function () { f.unbind(t, "resize", this), this.isResizeBound = !1 }, r.prototype.onresize = function () { function t() { e.resize() } this.resizeTimeout && clearTimeout(this.resizeTimeout); var e = this; this.resizeTimeout = setTimeout(t, 100) }, r.prototype.resize = function () { var t = d(this.element), e = this.size && t; e && t.innerWidth === this.size.innerWidth || (this.layout(), delete this.resizeTimeout) }, r.prototype.addItems = function (t) { var e = this._getItems(t); if (e.length) return this.items = this.items.concat(e), e }, r.prototype.appended = function (t) { var e = this.addItems(t); e.length && (this.layoutItems(e, !0), this.reveal(e)) }, r.prototype.prepended = function (t) { var e = this._getItems(t); if (e.length) { var i = this.items.slice(0); this.items = e.concat(i), this._resetLayout(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i) } }, r.prototype.reveal = function (t) { if (t && t.length) for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; n.reveal() } }, r.prototype.hide = function (t) { if (t && t.length) for (var e = 0, i = t.length; i > e; e++) { var n = t[e]; n.hide() } }, r.prototype.getItem = function (t) { for (var e = 0, i = this.items.length; i > e; e++) { var n = this.items[e]; if (n.element === t) return n } }, r.prototype.getItems = function (t) { if (t && t.length) { for (var e = [], i = 0, n = t.length; n > i; i++) { var o = t[i], r = this.getItem(o); r && e.push(r) } return e } }, r.prototype.remove = function (t) { t = n(t); var e = this.getItems(t); this._itemsOn(e, "remove", function () { this.emitEvent("removeComplete", [this, e]) }); for (var i = 0, o = e.length; o > i; i++) { var r = e[i]; r.remove(); var s = b(this.items, r); this.items.splice(s, 1) } }, r.prototype.destroy = function () { var t = this.element.style; t.height = "", t.position = "", t.width = ""; for (var e = 0, i = this.items.length; i > e; e++) { var n = this.items[e]; n.destroy() } this.unbindResize(), delete this.element.outlayerGUID }, r.data = function (t) { var e = t && t.outlayerGUID; return e && E[e] }, r.create = function (t, i) { function n() { r.apply(this, arguments) } return e(n.prototype, r.prototype), s(n, "options"), s(n, "settings"), e(n.prototype.options, i), n.prototype.settings.namespace = t, n.data = r.data, n.Item = function () { h.apply(this, arguments) }, n.Item.prototype = new r.Item, n.prototype.settings.item = n.Item, p(function () { for (var e = o(t), i = l.querySelectorAll(".js-" + e), r = "data-" + e + "-options", s = 0, a = i.length; a > s; s++) { var h, p = i[s], u = p.getAttribute(r); try { h = u && JSON.parse(u) } catch (f) { m && m.error("Error parsing " + r + " on " + p.nodeName.toLowerCase() + (p.id ? "#" + p.id : "") + ": " + f); continue } var d = new n(p, h); y && y.data(p, t, d) } }), y && y.bridget && y.bridget(t, n), n }, r.Item = h, t.Outlayer = r }(window), function (t) { "use strict"; function e(t, e) { var n = t.create("masonry"); return n.prototype._resetLayout = function () { this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(); var t = this.cols; for (this.colYs = []; t--;) this.colYs.push(0); this.maxY = 0 }, n.prototype.measureColumns = function () { var t = this.items[0].element; this.columnWidth = this.columnWidth || e(t).outerWidth, this.columnWidth += this.gutter, this.cols = Math.floor((this.size.innerWidth + this.gutter) / this.columnWidth), this.cols = Math.max(this.cols, 1) }, n.prototype._getItemLayoutPosition = function (t) { t.getSize(); var e = Math.ceil(t.size.outerWidth / this.columnWidth); e = Math.min(e, this.cols); for (var n = this._getColGroup(e), o = Math.min.apply(Math, n), r = i(n, o), s = { x: this.columnWidth * r, y: o }, a = o + t.size.outerHeight, h = this.cols + 1 - n.length, p = 0; h > p; p++) this.colYs[r + p] = a; return s }, n.prototype._getColGroup = function (t) { if (1 === t) return this.colYs; for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) { var o = this.colYs.slice(n, n + t); e[n] = Math.max.apply(Math, o) } return e }, n.prototype._manageStamp = function (t) { var i = e(t), n = this._getElementOffset(t), o = this.options.isOriginLeft ? n.left : n.right, r = o + i.outerWidth, s = Math.floor(o / this.columnWidth); s = Math.max(0, s); var a = Math.floor(r / this.columnWidth); a = Math.min(this.cols - 1, a); for (var h = (this.options.isOriginTop ? n.top : n.bottom) + i.outerHeight, p = s; a >= p; p++) this.colYs[p] = Math.max(h, this.colYs[p]) }, n.prototype._getContainerSize = function () { return this.maxY = Math.max.apply(Math, this.colYs), { height: this.maxY } }, n } var i = Array.prototype.indexOf ? function (t, e) { return t.indexOf(e) } : function (t, e) { for (var i = 0, n = t.length; n > i; i++) { var o = t[i]; if (o === e) return i } return -1 }; "function" == typeof define && define.amd ? define(["outlayer", "get-size"], e) : t.Masonry = e(t.Outlayer, t.getSize) }(window);

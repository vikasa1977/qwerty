﻿/*
 Highmaps JS v4.2.7 (2016-09-21)
 Highmaps as a plugin for Highcharts 4.1.x or Highstock 2.1.x (x being the patch version of this file)

 (c) 2011-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (h) { typeof module === "object" && module.exports ? module.exports = h : h(Highcharts) })(function (h) {
    function H(a) { if (a) a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0 } function M(a, b) { var c, d, e, f, g = !1, i = a.x, k = a.y; for (c = 0, d = b.length - 1; c < b.length; d = c++) e = b[c][1] > k, f = b[d][1] > k, e !== f && i < (b[d][0] - b[c][0]) * (k - b[c][1]) / (b[d][1] - b[c][1]) + b[c][0] && (g = !g); return g } function N(a, b, c, d, e, f, g, i) {
        return ["M", a + e, b, "L", a + c - f, b, "C", a + c - f / 2, b, a + c, b + f / 2, a + c, b + f, "L", a + c, b + d -
        g, "C", a + c, b + d - g / 2, a + c - g / 2, b + d, a + c - g, b + d, "L", a + i, b + d, "C", a + i / 2, b + d, a, b + d - i / 2, a, b + d - i, "L", a, b + e, "C", a, b + e / 2, a + e / 2, b, a + e, b, "Z"]
    } var T = h.animObject, n = h.Axis, q = h.Chart, w = h.Color, s = h.Point, I = h.Pointer, D = h.Legend, J = h.LegendSymbolMixin, U = h.Renderer, y = h.Series, K = h.SVGRenderer, O = h.VMLRenderer, A = h.win, P = A.document, L = h.addEvent, l = h.each, E = h.error, o = h.extend, t = h.extendClass, Q = h.format, V = h.map, F = h.isNumber, p = h.merge, m = h.pick, B = h.getOptions(), j = h.seriesTypes, v = B.plotOptions, u = h.wrap, r = function () { }; u(n.prototype,
    "getSeriesExtremes", function (a) { var b = this.isXAxis, c, d, e = [], f; b && l(this.series, function (a, b) { if (a.useMapGeometry) e[b] = a.xData, a.xData = [] }); a.call(this); if (b && (c = m(this.dataMin, Number.MAX_VALUE), d = m(this.dataMax, -Number.MAX_VALUE), l(this.series, function (a, b) { if (a.useMapGeometry) c = Math.min(c, m(a.minX, c)), d = Math.max(d, m(a.maxX, c)), a.xData = e[b], f = !0 }), f)) this.dataMin = c, this.dataMax = d }); u(n.prototype, "setAxisTranslation", function (a) {
        var b = this.chart, c = b.plotWidth / b.plotHeight, b = b.xAxis[0], d; a.call(this);
        this.coll === "yAxis" && b.transA !== void 0 && l(this.series, function (a) { a.preserveAspectRatio && (d = !0) }); if (d && (this.transA = b.transA = Math.min(this.transA, b.transA), a = c / ((b.max - b.min) / (this.max - this.min)), a = a < 1 ? this : b, c = (a.max - a.min) * a.transA, a.pixelPadding = a.len - c, a.minPixelPadding = a.pixelPadding / 2, c = a.fixTo)) { c = c[1] - a.toValue(c[0], !0); c *= a.transA; if (Math.abs(c) > a.minPixelPadding || a.min === a.dataMin && a.max === a.dataMax) c = 0; a.minPixelPadding -= c }
    }); u(n.prototype, "render", function (a) {
        a.call(this); this.fixTo =
        null
    }); var C = h.ColorAxis = function () { this.init.apply(this, arguments) }; o(C.prototype, n.prototype); o(C.prototype, {
        defaultColorAxisOptions: { lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, color: "gray", width: 0.01 }, labels: { overflow: "justify" }, minColor: "#EFEFFF", maxColor: "#003875", tickLength: 5, showInLegend: !0 }, init: function (a, b) {
            var c = a.options.legend.layout !== "vertical", d; this.coll = "colorAxis"; d = p(this.defaultColorAxisOptions,
            { side: c ? 2 : 1, reversed: !c }, b, { opposite: !c, showEmpty: !1, title: null }); n.prototype.init.call(this, a, d); b.dataClasses && this.initDataClasses(b); this.initStops(b); this.horiz = c; this.zoomEnabled = !1; this.defaultLegendLength = 200
        }, tweenColors: function (a, b, c) {
            var d; !b.rgba.length || !a.rgba.length ? a = b.input || "none" : (a = a.rgba, b = b.rgba, d = b[3] !== 1 || a[3] !== 1, a = (d ? "rgba(" : "rgb(") + Math.round(b[0] + (a[0] - b[0]) * (1 - c)) + "," + Math.round(b[1] + (a[1] - b[1]) * (1 - c)) + "," + Math.round(b[2] + (a[2] - b[2]) * (1 - c)) + (d ? "," + (b[3] + (a[3] - b[3]) * (1 -
            c)) : "") + ")"); return a
        }, initDataClasses: function (a) { var b = this, c = this.chart, d, e = 0, f = this.options, g = a.dataClasses.length; this.dataClasses = d = []; this.legendItems = []; l(a.dataClasses, function (a, k) { var h, a = p(a); d.push(a); if (!a.color) f.dataClassColor === "category" ? (h = c.options.colors, a.color = h[e++], e === h.length && (e = 0)) : a.color = b.tweenColors(w(f.minColor), w(f.maxColor), g < 2 ? 0.5 : k / (g - 1)) }) }, initStops: function (a) {
            this.stops = a.stops || [[0, this.options.minColor], [1, this.options.maxColor]]; l(this.stops, function (a) {
                a.color =
                w(a[1])
            })
        }, setOptions: function (a) { n.prototype.setOptions.call(this, a); this.options.crosshair = this.options.marker }, setAxisSize: function () { var a = this.legendSymbol, b = this.chart, c = b.options.legend || {}, d, e; a ? (this.left = c = a.attr("x"), this.top = d = a.attr("y"), this.width = e = a.attr("width"), this.height = a = a.attr("height"), this.right = b.chartWidth - c - e, this.bottom = b.chartHeight - d - a, this.len = this.horiz ? e : a, this.pos = this.horiz ? c : d) : this.len = (this.horiz ? c.symbolWidth : c.symbolHeight) || this.defaultLegendLength }, toColor: function (a,
        b) { var c, d = this.stops, e, f = this.dataClasses, g, i; if (f) for (i = f.length; i--;) { if (g = f[i], e = g.from, d = g.to, (e === void 0 || a >= e) && (d === void 0 || a <= d)) { c = g.color; if (b) b.dataClass = i; break } } else { this.isLog && (a = this.val2lin(a)); c = 1 - (this.max - a) / (this.max - this.min || 1); for (i = d.length; i--;) if (c > d[i][0]) break; e = d[i] || d[i + 1]; d = d[i + 1] || e; c = 1 - (d[0] - c) / (d[0] - e[0] || 1); c = this.tweenColors(e.color, d.color, c) } return c }, getOffset: function () {
            var a = this.legendGroup, b = this.chart.axisOffset[this.side]; if (a) {
                this.axisParent = a; n.prototype.getOffset.call(this);
                if (!this.added) this.added = !0, this.labelLeft = 0, this.labelRight = this.width; this.chart.axisOffset[this.side] = b
            }
        }, setLegendColor: function () { var a, b = this.options, c = this.reversed; a = c ? 1 : 0; c = c ? 0 : 1; a = this.horiz ? [a, 0, c, 0] : [0, c, 0, a]; this.legendColor = { linearGradient: { x1: a[0], y1: a[1], x2: a[2], y2: a[3] }, stops: b.stops || [[0, b.minColor], [1, b.maxColor]] } }, drawLegendSymbol: function (a, b) {
            var c = a.padding, d = a.options, e = this.horiz, f = m(d.symbolWidth, e ? this.defaultLegendLength : 12), g = m(d.symbolHeight, e ? 12 : this.defaultLegendLength),
            i = m(d.labelPadding, e ? 16 : 30), d = m(d.itemDistance, 10); this.setLegendColor(); b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, f, g).attr({ zIndex: 1 }).add(b.legendGroup); this.legendItemWidth = f + c + (e ? d : i); this.legendItemHeight = g + c + (e ? i : 0)
        }, setState: r, visible: !0, setVisible: r, getSeriesExtremes: function () { var a; if (this.series.length) a = this.series[0], this.dataMin = a.valueMin, this.dataMax = a.valueMax }, drawCrosshair: function (a, b) {
            var c = b && b.plotX, d = b && b.plotY, e, f = this.pos, g = this.len; if (b) e = this.toPixels(b[b.series.colorKey]),
            e < f ? e = f - 2 : e > f + g && (e = f + g + 2), b.plotX = e, b.plotY = this.len - e, n.prototype.drawCrosshair.call(this, a, b), b.plotX = c, b.plotY = d, this.cross && this.cross.attr({ fill: this.crosshair.color }).add(this.legendGroup)
        }, getPlotLinePath: function (a, b, c, d, e) { return F(e) ? this.horiz ? ["M", e - 4, this.top - 6, "L", e + 4, this.top - 6, e, this.top, "Z"] : ["M", this.left, e, "L", this.left - 6, e + 6, this.left - 6, e - 6, "Z"] : n.prototype.getPlotLinePath.call(this, a, b, c, d) }, update: function (a, b) {
            var c = this.chart, d = c.legend; l(this.series, function (a) {
                a.isDirtyData =
                !0
            }); if (a.dataClasses && d.allItems) l(d.allItems, function (a) { a.isDataClass && a.legendGroup.destroy() }), c.isDirtyLegend = !0; c.options[this.coll] = p(this.userOptions, a); n.prototype.update.call(this, a, b); this.legendItem && (this.setLegendColor(), d.colorizeItem(this, !0))
        }, getDataClassLegendSymbols: function () {
            var a = this, b = this.chart, c = this.legendItems, d = b.options.legend, e = d.valueDecimals, f = d.valueSuffix || "", g; c.length || l(this.dataClasses, function (d, k) {
                var x = !0, z = d.from, m = d.to; g = ""; z === void 0 ? g = "< " : m === void 0 &&
                (g = "> "); z !== void 0 && (g += h.numberFormat(z, e) + f); z !== void 0 && m !== void 0 && (g += " - "); m !== void 0 && (g += h.numberFormat(m, e) + f); c.push(o({ chart: b, name: g, options: {}, drawLegendSymbol: J.drawRectangle, visible: !0, setState: r, isDataClass: !0, setVisible: function () { x = this.visible = !x; l(a.series, function (a) { l(a.points, function (a) { a.dataClass === k && a.setVisible(x) }) }); b.legend.colorizeItem(this, x) } }, d))
            }); return c
        }, name: ""
    }); l(["fill", "stroke"], function (a) {
        h.Fx.prototype[a + "Setter"] = function () {
            this.elem.attr(a, C.prototype.tweenColors(w(this.start),
            w(this.end), this.pos))
        }
    }); u(q.prototype, "getAxes", function (a) { var b = this.options.colorAxis; a.call(this); this.colorAxis = []; b && new C(this, b) }); u(D.prototype, "getAllItems", function (a) { var b = [], c = this.chart.colorAxis[0]; c && (c.options.showInLegend && (c.options.dataClasses ? b = b.concat(c.getDataClassLegendSymbols()) : b.push(c)), l(c.series, function (a) { a.options.showInLegend = !1 })); return b.concat(a.call(this)) }); var D = { setVisible: function (a) { var b = this, c = a ? "show" : "hide"; l(["graphic", "dataLabel"], function (a) { if (b[a]) b[a][c]() }) } },
    R = {
        pointAttrToOptions: { stroke: "borderColor", "stroke-width": "borderWidth", fill: "color", dashstyle: "dashStyle" }, pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], optionalAxis: "colorAxis", trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: r, parallelArrays: ["x", "y", "value"], colorKey: "value", translateColors: function () {
            var a = this, b = this.options.nullColor, c = this.colorAxis, d = this.colorKey; l(this.data, function (e) {
                var f = e[d]; if (f = e.options.color || (f === null ? b : c && f !== void 0 ? c.toColor(f,
                e) : e.color || a.color)) e.color = f
            })
        }
    }; o(q.prototype, {
        renderMapNavigation: function () {
            var a = this, b = this.options.mapNavigation, c = b.buttons, d, e, f, g, i = function (b) { this.handler.call(a, b); H(b) }; if (m(b.enableButtons, b.enabled) && !a.renderer.forExport) for (d in a.mapNavButtons = [], c) if (c.hasOwnProperty(d)) f = p(b.buttonOptions, c[d]), e = f.theme, e.style = p(f.theme.style, f.style), g = e.states, e = a.renderer.button(f.text, 0, 0, i, e, g && g.hover, g && g.select, 0, d === "zoomIn" ? "topbutton" : "bottombutton").attr({
                width: f.width, height: f.height,
                title: a.options.lang[d], zIndex: 5
            }).add(), e.handler = f.onclick, e.align(o(f, { width: e.width, height: 2 * e.height }), null, f.alignTo), L(e.element, "dblclick", H), a.mapNavButtons.push(e)
        }, fitToBox: function (a, b) { l([["x", "width"], ["y", "height"]], function (c) { var d = c[0], c = c[1]; a[d] + a[c] > b[d] + b[c] && (a[c] > b[c] ? (a[c] = b[c], a[d] = b[d]) : a[d] = b[d] + b[c] - a[c]); a[c] > b[c] && (a[c] = b[c]); a[d] < b[d] && (a[d] = b[d]) }); return a }, mapZoom: function (a, b, c, d, e) {
            var f = this.xAxis[0], g = f.max - f.min, i = m(b, f.min + g / 2), k = g * a, g = this.yAxis[0], h = g.max -
            g.min, z = m(c, g.min + h / 2); h *= a; i = this.fitToBox({ x: i - k * (d ? (d - f.pos) / f.len : 0.5), y: z - h * (e ? (e - g.pos) / g.len : 0.5), width: k, height: h }, { x: f.dataMin, y: g.dataMin, width: f.dataMax - f.dataMin, height: g.dataMax - g.dataMin }); k = i.x <= f.dataMin && i.width >= f.dataMax - f.dataMin && i.y <= g.dataMin && i.height >= g.dataMax - g.dataMin; if (d) f.fixTo = [d - f.pos, b]; if (e) g.fixTo = [e - g.pos, c]; a !== void 0 && !k ? (f.setExtremes(i.x, i.x + i.width, !1), g.setExtremes(i.y, i.y + i.height, !1)) : (f.setExtremes(void 0, void 0, !1), g.setExtremes(void 0, void 0, !1)); this.redraw()
        }
    });
    u(q.prototype, "render", function (a) { var b = this, c = b.options.mapNavigation; b.renderMapNavigation(); a.call(b); (m(c.enableDoubleClickZoom, c.enabled) || c.enableDoubleClickZoomTo) && L(b.container, "dblclick", function (a) { b.pointer.onContainerDblClick(a) }); m(c.enableMouseWheelZoom, c.enabled) && L(b.container, P.onmousewheel === void 0 ? "DOMMouseScroll" : "mousewheel", function (a) { b.pointer.onContainerMouseWheel(a); H(a); return !1 }) }); o(I.prototype, {
        onContainerDblClick: function (a) {
            var b = this.chart, a = this.normalize(a); b.options.mapNavigation.enableDoubleClickZoomTo ?
            b.pointer.inClass(a.target, "highcharts-tracker") && b.hoverPoint && b.hoverPoint.zoomTo() : b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(0.5, b.xAxis[0].toValue(a.chartX), b.yAxis[0].toValue(a.chartY), a.chartX, a.chartY)
        }, onContainerMouseWheel: function (a) {
            var b = this.chart, c, a = this.normalize(a); c = a.detail || -(a.wheelDelta / 120); b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && b.mapZoom(Math.pow(b.options.mapNavigation.mouseWheelSensitivity, c), b.xAxis[0].toValue(a.chartX), b.yAxis[0].toValue(a.chartY),
            a.chartX, a.chartY)
        }
    }); u(I.prototype, "init", function (a, b, c) { a.call(this, b, c); if (m(c.mapNavigation.enableTouchZoom, c.mapNavigation.enabled)) this.pinchX = this.pinchHor = this.pinchY = this.pinchVert = this.hasZoom = !0 }); u(I.prototype, "pinchTranslate", function (a, b, c, d, e, f, g) { a.call(this, b, c, d, e, f, g); this.chart.options.chart.type === "map" && this.hasZoom && (a = d.scaleX > d.scaleY, this.pinchTranslateDirection(!a, b, c, d, e, f, g, a ? d.scaleX : d.scaleY)) }); var G = P.documentElement.style.vectorEffect !== void 0; v.map = p(v.scatter,
    { allAreas: !0, animation: !1, nullColor: "#F8F8F8", borderColor: "silver", borderWidth: 1, marker: null, stickyTracking: !1, dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, turboThreshold: 0, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>" }, states: { normal: { animation: !0 }, hover: { brightness: 0.2, halo: null } } }); var S = t(s, o({
        applyOptions: function (a, b) {
            var c = s.prototype.applyOptions.call(this, a, b), d = this.series, e = d.joinBy;
            if (d.mapData) if (e = c[e[1]] !== void 0 && d.mapMap[c[e[1]]]) { if (d.xyFromShape) c.x = e._midX, c.y = e._midY; o(c, e) } else c.value = c.value || null; return c
        }, onMouseOver: function (a) { clearTimeout(this.colorInterval); if (this.value !== null || this.series.options.nullInteraction) s.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a) }, onMouseOut: function () {
            var a = this, b = +new Date, c = w(a.color), d = w(a.pointAttr.hover.fill), e = T(a.series.options.states.normal.animation).duration, f; if (e && c.rgba.length === 4 && d.rgba.length ===
            4 && a.state !== "select") f = a.pointAttr[""].fill, delete a.pointAttr[""].fill, clearTimeout(a.colorInterval), a.colorInterval = setInterval(function () { var g = (new Date - b) / e, f = a.graphic; g > 1 && (g = 1); f && f.attr("fill", C.prototype.tweenColors.call(0, d, c, g)); g >= 1 && clearTimeout(a.colorInterval) }, 13); s.prototype.onMouseOut.call(a); if (f) a.pointAttr[""].fill = f
        }, zoomTo: function () { var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY, this._maxY, !1); a.chart.redraw() }
    }, D)); j.map = t(j.scatter,
    p(R, {
        type: "map", pointClass: S, supportsDrilldown: !0, getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: r, directTouch: !0, preserveAspectRatio: !0, getBox: function (a) {
            var b = Number.MAX_VALUE, c = -b, d = b, e = -b, f = b, g = b, i = this.xAxis, k = this.yAxis, x; l(a || [], function (a) {
                if (a.path) {
                    if (typeof a.path === "string") a.path = h.splitPath(a.path); var i = a.path || [], k = i.length, l = !1, j = -b, p = b, o = -b, n = b, q = a.properties; if (!a._foundBox) {
                        for (; k--;) F(i[k]) && (l ? (j = Math.max(j, i[k]), p = Math.min(p, i[k])) : (o = Math.max(o, i[k]), n = Math.min(n,
                        i[k])), l = !l); a._midX = p + (j - p) * (a.middleX || q && q["hc-middle-x"] || 0.5); a._midY = n + (o - n) * (a.middleY || q && q["hc-middle-y"] || 0.5); a._maxX = j; a._minX = p; a._maxY = o; a._minY = n; a.labelrank = m(a.labelrank, (j - p) * (o - n)); a._foundBox = !0
                    } c = Math.max(c, a._maxX); d = Math.min(d, a._minX); e = Math.max(e, a._maxY); f = Math.min(f, a._minY); g = Math.min(a._maxX - a._minX, a._maxY - a._minY, g); x = !0
                }
            }); if (x) {
                this.minY = Math.min(f, m(this.minY, b)); this.maxY = Math.max(e, m(this.maxY, -b)); this.minX = Math.min(d, m(this.minX, b)); this.maxX = Math.max(c, m(this.maxX,
                -b)); if (i && i.options.minRange === void 0) i.minRange = Math.min(5 * g, (this.maxX - this.minX) / 5, i.minRange || b); if (k && k.options.minRange === void 0) k.minRange = Math.min(5 * g, (this.maxY - this.minY) / 5, k.minRange || b)
            }
        }, getExtremes: function () { y.prototype.getExtremes.call(this, this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax = this.maxY }, translatePath: function (a) {
            var b = !1, c = this.xAxis, d = this.yAxis,
            e = c.min, f = c.transA, c = c.minPixelPadding, g = d.min, i = d.transA, d = d.minPixelPadding, k, h = []; if (a) for (k = a.length; k--;) F(a[k]) ? (h[k] = b ? (a[k] - e) * f + c : (a[k] - g) * i + d, b = !b) : h[k] = a[k]; return h
        }, setData: function (a, b, c, d) {
            var e = this.options, f = e.mapData, g = e.joinBy, i = g === null, k = [], m = {}, j, n, o; i && (g = "_i"); g = this.joinBy = h.splat(g); g[1] || (g[1] = g[0]); a && l(a, function (b, c) { F(b) && (a[c] = { value: b }); if (i) a[c]._i = c }); this.getBox(a); if (f) {
                if (f.type === "FeatureCollection") {
                    if (f["hc-transform"]) for (j in this.chart.mapTransforms = n = f["hc-transform"],
                    n) if (n.hasOwnProperty(j) && j.rotation) j.cosAngle = Math.cos(j.rotation), j.sinAngle = Math.sin(j.rotation); f = h.geojson(f, this.type, this)
                } this.mapData = f; for (o = 0; o < f.length; o++) j = f[o], n = j.properties, j._i = o, g[0] && n && n[g[0]] && (j[g[0]] = n[g[0]]), m[j[g[0]]] = j; this.mapMap = m; a && g[1] && l(a, function (a) { m[a[g[1]]] && k.push(m[a[g[1]]]) }); e.allAreas ? (this.getBox(f), a = a || [], k = "|" + V(k, function (a) { return a[g[0]] }).join("|") + "|", l(f, function (b) { if (!g[0] || k.indexOf("|" + b[g[0]] + "|") === -1) a.push(p(b, { value: null })), d = !1 })) : this.getBox(k)
            } y.prototype.setData.call(this,
            a, b, c, d)
        }, drawGraph: r, drawDataLabels: r, doFullTranslate: function () { return this.isDirtyData || this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans }, translate: function () { var a = this, b = a.xAxis, c = a.yAxis, d = a.doFullTranslate(); a.generatePoints(); l(a.data, function (e) { e.plotX = b.toPixels(e._midX, !0); e.plotY = c.toPixels(e._midY, !0); if (d) e.shapeType = "path", e.shapeArgs = { d: a.translatePath(e.path) }, G && (e.shapeArgs["vector-effect"] = "non-scaling-stroke") }); a.translateColors() }, drawPoints: function () {
            var a =
            this, b = a.xAxis, c = a.yAxis, d = a.group, e = a.chart, f = e.renderer, g, i = this.baseTrans; if (!a.transformGroup) a.transformGroup = f.g().attr({ scaleX: 1, scaleY: 1 }).add(d), a.transformGroup.survive = !0; a.doFullTranslate() ? (e.hasRendered && a.pointAttrToOptions.fill === "color" && l(a.points, function (a) { if (a.shapeArgs) a.shapeArgs.fill = a.pointAttr[m(a.state, "")].fill }), G || l(a.points, function (b) { b = b.pointAttr[""]; b["stroke-width"] === a.pointAttr[""]["stroke-width"] && (b["stroke-width"] = "inherit") }), a.group = a.transformGroup, j.column.prototype.drawPoints.apply(a),
            a.group = d, l(a.points, function (a) { a.graphic && (a.name && a.graphic.addClass("highcharts-name-" + a.name.replace(" ", "-").toLowerCase()), a.properties && a.properties["hc-key"] && a.graphic.addClass("highcharts-key-" + a.properties["hc-key"].toLowerCase()), G || (a.graphic["stroke-widthSetter"] = r)) }), this.baseTrans = { originX: b.min - b.minPixelPadding / b.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA), transAX: b.transA, transAY: c.transA }, this.transformGroup.animate({
                translateX: 0, translateY: 0,
                scaleX: 1, scaleY: 1
            })) : (g = b.transA / i.transAX, d = c.transA / i.transAY, b = b.toPixels(i.originX, !0), c = c.toPixels(i.originY, !0), g > 0.99 && g < 1.01 && d > 0.99 && d < 1.01 && (d = g = 1, b = Math.round(b), c = Math.round(c)), this.transformGroup.animate({ translateX: b, translateY: c, scaleX: g, scaleY: d })); G || a.group.element.setAttribute("stroke-width", a.options[a.pointAttrToOptions["stroke-width"]] / (g || 1)); this.drawMapDataLabels()
        }, drawMapDataLabels: function () { y.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) },
        render: function () { var a = this, b = y.prototype.render; a.chart.renderer.isVML && a.data.length > 3E3 ? setTimeout(function () { b.call(a) }) : b.call(a) }, animate: function (a) { var b = this.options.animation, c = this.group, d = this.xAxis, e = this.yAxis, f = d.pos, g = e.pos; if (this.chart.renderer.isSVG) b === !0 && (b = { duration: 1E3 }), a ? c.attr({ translateX: f + d.len / 2, translateY: g + e.len / 2, scaleX: 0.001, scaleY: 0.001 }) : (c.animate({ translateX: f, translateY: g, scaleX: 1, scaleY: 1 }, b), this.animate = null) }, animateDrilldown: function (a) {
            var b = this.chart.plotBox,
            c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], d = c.bBox, e = this.chart.options.drilldown.animation; if (!a) a = Math.min(d.width / b.width, d.height / b.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: d.x, translateY: d.y }, l(this.points, function (a) { a.graphic && a.graphic.attr(c.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, e) }), this.animate = null
        }, drawLegendSymbol: J.drawRectangle, animateDrillupFrom: function (a) { j.column.prototype.animateDrillupFrom.call(this, a) }, animateDrillupTo: function (a) {
            j.column.prototype.animateDrillupTo.call(this,
            a)
        }
    })); v.mapline = p(v.map, { lineWidth: 1, fillColor: "none" }); j.mapline = t(j.map, { type: "mapline", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth", fill: "fillColor", dashstyle: "dashStyle" }, drawLegendSymbol: j.line.prototype.drawLegendSymbol }); v.mappoint = p(v.scatter, { dataLabels: { enabled: !0, formatter: function () { return this.point.name }, crop: !1, defer: !1, overflow: !1, style: { color: "#000000" } } }); j.mappoint = t(j.scatter, {
        type: "mappoint", forceDL: !0, pointClass: t(s, {
            applyOptions: function (a, b) {
                var c = a.lat !==
                void 0 && a.lon !== void 0 ? p(a, this.series.chart.fromLatLonToPoint(a)) : a; return s.prototype.applyOptions.call(this, c, b)
            }
        })
    }); if (j.bubble) v.mapbubble = p(v.bubble, { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }), j.mapbubble = t(j.bubble, {
        pointClass: t(s, { applyOptions: function (a, b) { var c; a && a.lat !== void 0 && a.lon !== void 0 ? (c = s.prototype.applyOptions.call(this, a, b), c = o(c, this.series.chart.fromLatLonToPoint(c))) : c = S.prototype.applyOptions.call(this, a, b); return c }, ttBelow: !1 }), xyFromShape: !0,
        type: "mapbubble", pointArrayMap: ["z"], getMapData: j.map.prototype.getMapData, getBox: j.map.prototype.getBox, setData: j.map.prototype.setData
    }); B.plotOptions.heatmap = p(B.plotOptions.scatter, { animation: !1, borderWidth: 0, nullColor: "#F8F8F8", dataLabels: { formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1, overflow: !1, padding: 0 }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" }, states: { normal: { animation: !0 }, hover: { halo: !1, brightness: 0.2 } } });
    j.heatmap = t(j.scatter, p(R, {
        type: "heatmap", pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, pointClass: t(s, D), supportsDrilldown: !0, getExtremesFromAll: !0, directTouch: !0, init: function () { var a; j.scatter.prototype.init.apply(this, arguments); a = this.options; a.pointRange = m(a.pointRange, a.colsize || 1); this.yAxis.axisPointRange = a.rowsize || 1 }, translate: function () {
            var a = this.options, b = this.xAxis, c = this.yAxis, d = function (a, b, c) { return Math.min(Math.max(b, a), c) }; this.generatePoints(); l(this.points, function (e) {
                var f =
                (a.colsize || 1) / 2, g = (a.rowsize || 1) / 2, i = d(Math.round(b.len - b.translate(e.x - f, 0, 1, 0, 1)), -b.len, 2 * b.len), f = d(Math.round(b.len - b.translate(e.x + f, 0, 1, 0, 1)), -b.len, 2 * b.len), h = d(Math.round(c.translate(e.y - g, 0, 1, 0, 1)), -c.len, 2 * c.len), g = d(Math.round(c.translate(e.y + g, 0, 1, 0, 1)), -c.len, 2 * c.len); e.plotX = e.clientX = (i + f) / 2; e.plotY = (h + g) / 2; e.shapeType = "rect"; e.shapeArgs = { x: Math.min(i, f), y: Math.min(h, g), width: Math.abs(f - i), height: Math.abs(g - h) }
            }); this.translateColors(); this.chart.hasRendered && l(this.points, function (a) {
                a.shapeArgs.fill =
                a.options.color || a.color
            })
        }, drawPoints: j.column.prototype.drawPoints, animate: r, getBox: r, drawLegendSymbol: J.drawRectangle, alignDataLabel: j.column.prototype.alignDataLabel, getExtremes: function () { y.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; y.prototype.getExtremes.call(this) }
    })); q.prototype.transformFromLatLon = function (a, b) {
        if (A.proj4 === void 0) return E(21), { x: 0, y: null }; var c = A.proj4(b.crs, [a.lon, a.lat]), d = b.cosAngle || b.rotation && Math.cos(b.rotation),
        e = b.sinAngle || b.rotation && Math.sin(b.rotation), c = b.rotation ? [c[0] * d + c[1] * e, -c[0] * e + c[1] * d] : c; return { x: ((c[0] - (b.xoffset || 0)) * (b.scale || 1) + (b.xpan || 0)) * (b.jsonres || 1) + (b.jsonmarginX || 0), y: (((b.yoffset || 0) - c[1]) * (b.scale || 1) + (b.ypan || 0)) * (b.jsonres || 1) - (b.jsonmarginY || 0) }
    }; q.prototype.transformToLatLon = function (a, b) {
        if (A.proj4 === void 0) E(21); else {
            var c = {
                x: ((a.x - (b.jsonmarginX || 0)) / (b.jsonres || 1) - (b.xpan || 0)) / (b.scale || 1) + (b.xoffset || 0), y: ((-a.y - (b.jsonmarginY || 0)) / (b.jsonres || 1) + (b.ypan || 0)) / (b.scale ||
                1) + (b.yoffset || 0)
            }, d = b.cosAngle || b.rotation && Math.cos(b.rotation), e = b.sinAngle || b.rotation && Math.sin(b.rotation), c = A.proj4(b.crs, "WGS84", b.rotation ? { x: c.x * d + c.y * -e, y: c.x * e + c.y * d } : c); return { lat: c.y, lon: c.x }
        }
    }; q.prototype.fromPointToLatLon = function (a) { var b = this.mapTransforms, c; if (b) { for (c in b) if (b.hasOwnProperty(c) && b[c].hitZone && M({ x: a.x, y: -a.y }, b[c].hitZone.coordinates[0])) return this.transformToLatLon(a, b[c]); return this.transformToLatLon(a, b["default"]) } else E(22) }; q.prototype.fromLatLonToPoint =
    function (a) { var b = this.mapTransforms, c, d; if (!b) return E(22), { x: 0, y: null }; for (c in b) if (b.hasOwnProperty(c) && b[c].hitZone && (d = this.transformFromLatLon(a, b[c]), M({ x: d.x, y: -d.y }, b[c].hitZone.coordinates[0]))) return d; return this.transformFromLatLon(a, b["default"]) }; h.geojson = function (a, b, c) {
        var d = [], e = [], f = function (a) { var b, c = a.length; e.push("M"); for (b = 0; b < c; b++) b === 1 && e.push("L"), e.push(a[b][0], -a[b][1]) }, b = b || "map"; l(a.features, function (a) {
            var c = a.geometry, h = c.type, c = c.coordinates, a = a.properties, j;
            e = []; b === "map" || b === "mapbubble" ? (h === "Polygon" ? (l(c, f), e.push("Z")) : h === "MultiPolygon" && (l(c, function (a) { l(a, f) }), e.push("Z")), e.length && (j = { path: e })) : b === "mapline" ? (h === "LineString" ? f(c) : h === "MultiLineString" && l(c, f), e.length && (j = { path: e })) : b === "mappoint" && h === "Point" && (j = { x: c[0], y: -c[1] }); j && d.push(o(j, { name: a.name || a.NAME, properties: a }))
        }); if (c && a.copyrightShort) c.chart.mapCredits = Q(c.chart.options.credits.mapText, { geojson: a }), c.chart.mapCreditsFull = Q(c.chart.options.credits.mapTextFull, { geojson: a });
        return d
    }; u(q.prototype, "showCredits", function (a, b) { if (this.mapCredits) b.href = null; a.call(this, h.merge(b, { text: b.text + (this.mapCredits || "") })); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) }); o(B.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); B.mapNavigation = {
        buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, style: { fontSize: "15px", fontWeight: "bold", textAlign: "center" }, theme: { "stroke-width": 1 } }, buttons: {
            zoomIn: {
                onclick: function () { this.mapZoom(0.5) },
                text: "+", y: 0
            }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28 }
        }, mouseWheelSensitivity: 1.1
    }; h.splitPath = function (a) { var b, a = a.replace(/([A-Za-z])/g, " $1 "), a = a.replace(/^\s*/, "").replace(/\s*$/, ""), a = a.split(/[ ,]+/); for (b = 0; b < a.length; b++) /[a-zA-Z]/.test(a[b]) || (a[b] = parseFloat(a[b])); return a }; h.maps = {}; K.prototype.symbols.topbutton = function (a, b, c, d, e) { return N(a - 1, b - 1, c, d, e.r, e.r, 0, 0) }; K.prototype.symbols.bottombutton = function (a, b, c, d, e) { return N(a - 1, b - 1, c, d, 0, 0, e.r, e.r) }; U === O && l(["topbutton",
    "bottombutton"], function (a) { O.prototype.symbols[a] = K.prototype.symbols[a] }); h.Map = h.mapChart = function (a, b, c) {
        var d = typeof a === "string" || a.nodeName, e = arguments[d ? 1 : 0], f = { endOnTick: !1, gridLineWidth: 0, lineWidth: 0, minPadding: 0, maxPadding: 0, startOnTick: !1, title: null, tickPositions: [] }, g, i = h.getOptions().credits; g = e.series; e.series = null; e = p({
            chart: { panning: "xy", type: "map" }, credits: { mapText: m(i.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'), mapTextFull: m(i.mapTextFull, "{geojson.copyright}") },
            xAxis: f, yAxis: p(f, { reversed: !0 })
        }, e, { chart: { inverted: !1, alignTicks: !1 } }); e.series = g; return d ? new q(a, e, c) : new q(e, b)
    }
});
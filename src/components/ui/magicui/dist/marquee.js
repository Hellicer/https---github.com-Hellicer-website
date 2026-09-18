'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.Marquee = void 0;
var utils_1 = require("@/lib/utils");
var react_1 = require("react");
function Marquee(_a) {
    var className = _a.className, _b = _a.reverse, reverse = _b === void 0 ? false : _b, _c = _a.pauseOnHover, pauseOnHover = _c === void 0 ? false : _c, children = _a.children, _d = _a.vertical, vertical = _d === void 0 ? false : _d, repeat = _a.repeat, _e = _a.mobileRepeat, mobileRepeat = _e === void 0 ? 2 : _e, _f = _a.desktopRepeat, desktopRepeat = _f === void 0 ? 3 : _f, props = __rest(_a, ["className", "reverse", "pauseOnHover", "children", "vertical", "repeat", "mobileRepeat", "desktopRepeat"]);
    var _g = react_1.useState(repeat !== null && repeat !== void 0 ? repeat : mobileRepeat), responsiveRepeat = _g[0], setResponsiveRepeat = _g[1];
    react_1.useEffect(function () {
        if (typeof repeat === 'number') {
            setResponsiveRepeat(repeat);
            return;
        }
        var mediaQuery = window.matchMedia('(min-width: 1024px)');
        var updateRepeat = function () {
            setResponsiveRepeat(mediaQuery.matches ? desktopRepeat : mobileRepeat);
        };
        updateRepeat();
        mediaQuery.addEventListener('change', updateRepeat);
        return function () { return mediaQuery.removeEventListener('change', updateRepeat); };
    }, [repeat, mobileRepeat, desktopRepeat]);
    return (React.createElement("div", __assign({}, props, { className: utils_1.cn('group flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]', {
            'flex-row': !vertical,
            'flex-col': vertical
        }, className) }), Array.from({ length: Math.max(1, responsiveRepeat) })
        .fill(0)
        .map(function (_, i) { return (React.createElement("div", { key: i, className: utils_1.cn('flex shrink-0  justify-around [gap:var(--gap)]', {
            'animate-marquee flex-row': !vertical,
            'animate-marquee-vertical flex-col': vertical,
            'group-hover:[animation-play-state:paused]': pauseOnHover,
            '[animation-direction:reverse]': reverse
        }) }, children)); })));
}
exports.Marquee = Marquee;

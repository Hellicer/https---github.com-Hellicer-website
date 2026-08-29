'use client';
"use strict";
exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var BentoMenu = dynamic_1["default"](function () {
    return Promise.resolve().then(function () { return require('@/components/ui/BentoMenu/BentoMenu'); }).then(function (mod) { return mod.BentoMenu; });
}, { ssr: false });
function LazyBentoMenu() {
    var containerRef = react_1.useRef(null);
    var _a = react_1.useState(false), isVisible = _a[0], setIsVisible = _a[1];
    var _b = react_1.useState(false), isDesktop = _b[0], setIsDesktop = _b[1];
    react_1.useEffect(function () {
        var mediaQuery = window.matchMedia('(min-width: 1024px)');
        var updateIsDesktop = function () { return setIsDesktop(mediaQuery.matches); };
        updateIsDesktop();
        mediaQuery.addEventListener('change', updateIsDesktop);
        return function () { return mediaQuery.removeEventListener('change', updateIsDesktop); };
    }, []);
    react_1.useEffect(function () {
        if (!isDesktop) {
            setIsVisible(true);
            return;
        }
        if (!containerRef.current || isVisible)
            return;
        var observer = new IntersectionObserver(function (entries) {
            var _a;
            if ((_a = entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: '250px 0px' });
        observer.observe(containerRef.current);
        return function () { return observer.disconnect(); };
    }, [isDesktop, isVisible]);
    return (React.createElement("div", { ref: containerRef, className: "" }, isVisible ? React.createElement(BentoMenu, { disableAnimations: !isDesktop }) : null));
}
exports["default"] = LazyBentoMenu;

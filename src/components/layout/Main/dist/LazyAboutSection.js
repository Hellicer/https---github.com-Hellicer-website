'use client';
"use strict";
exports.__esModule = true;
var dynamic_1 = require("next/dynamic");
var react_1 = require("react");
var AboutSection = dynamic_1["default"](function () {
    return Promise.resolve().then(function () { return require('@/components/ui/about/AboutSection'); }).then(function (mod) { return mod.AboutSection; });
}, { ssr: false });
function LazyAboutSection(_a) {
    var initialProfileLoad = _a.initialProfileLoad;
    var containerRef = react_1.useRef(null);
    var _b = react_1.useState(false), isVisible = _b[0], setIsVisible = _b[1];
    react_1.useEffect(function () {
        if (!containerRef.current || isVisible)
            return;
        var observer = new IntersectionObserver(function (entries) {
            var _a;
            if ((_a = entries[0]) === null || _a === void 0 ? void 0 : _a.isIntersecting) {
                setIsVisible(true);
                observer.disconnect();
            }
        }, { rootMargin: '300px 0px' });
        observer.observe(containerRef.current);
        return function () { return observer.disconnect(); };
    }, [isVisible]);
    return (React.createElement("section", { ref: containerRef, className: "w-full grid grid-flow-row" }, isVisible ? (React.createElement(AboutSection, { initialProfileLoad: initialProfileLoad })) : (React.createElement("div", { className: "min-h-[800px]" }))));
}
exports["default"] = LazyAboutSection;

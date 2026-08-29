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
exports.BentoGrid = exports.BentoCard = void 0;
var react_icons_1 = require("@radix-ui/react-icons");
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
var BentoGrid = function (_a) {
    var children = _a.children, className = _a.className, props = __rest(_a, ["children", "className"]);
    return (React.createElement("div", __assign({ className: utils_1.cn('grid grid-cols-3 gap-4', className) }, props), children));
};
exports.BentoGrid = BentoGrid;
var BentoCard = function (_a) {
    var name = _a.name, className = _a.className, background = _a.background, Icon = _a.Icon, description = _a.description, href = _a.href, cta = _a.cta, props = __rest(_a, ["name", "className", "background", "Icon", "description", "href", "cta"]);
    return (React.createElement("div", __assign({ key: name, className: utils_1.cn('group relative col-span-3 flex flex-col justify-between overflow-hidden max-lg:h-[250px] rounded-xl', 'rounded-2xl border border-black bg-card p-6 shadow-[0_14px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-transform duration-500 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] lg:group-hover:[transform:translateZ(18px)] ', className) }, props),
        React.createElement("div", null, background),
        React.createElement("div", { className: "p-4" },
            React.createElement("div", { className: "pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10" },
                React.createElement(Icon, { className: "h-12 w-12 origin-left transform-gpu text-white transition-all duration-300 ease-in-out group-hover:scale-75" }),
                React.createElement("h3", { className: "text-xl font-semibold text-white dark:text-white" }, name)),
            React.createElement("div", { className: utils_1.cn('pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden') },
                React.createElement(button_1.Button, { variant: "link", asChild: true, size: "sm", className: "pointer-events-auto p-0" },
                    React.createElement("a", { href: href },
                        cta,
                        React.createElement(react_icons_1.ArrowRightIcon, { className: "ms-2 h-4 w-4 rtl:rotate-180" }))))),
        React.createElement("div", { className: utils_1.cn('text-gray11 pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center pl-2 pb-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex') },
            React.createElement(button_1.Button, { variant: "link", asChild: true, size: "sm", className: "pointer-events-auto p-0" },
                React.createElement("a", { href: href },
                    cta,
                    React.createElement(react_icons_1.ArrowRightIcon, { className: "ms-0 h-4 w-4 rtl:rotate-180" })))),
        React.createElement("div", { className: "pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" })));
};
exports.BentoCard = BentoCard;

'use client';
"use strict";
exports.__esModule = true;
exports.StatsCard = void 0;
var next_intl_1 = require("next-intl");
var lucide_react_1 = require("lucide-react");
var items = [
    { icon: lucide_react_1.Code2, key: 'experience' },
    { icon: lucide_react_1.Briefcase, key: 'projectsCompleted' },
    { icon: lucide_react_1.Target, key: 'roas' },
    { icon: lucide_react_1.Zap, key: 'ssr' },
    { icon: lucide_react_1.Tags, key: 'metadata' },
];
function StatsCard(_a) {
    var className = (_a === void 0 ? {} : _a).className;
    var t = next_intl_1.useTranslations('about.solvingBlock');
    return (React.createElement("div", { className: "group rounded-2xl " + className },
        React.createElement("div", { className: "grid space-y-4 rounded-2xl bg-card p-5 backdrop-blur-md transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:space-y-5 sm:p-6 lg:space-y-6 lg:p-8 [transform-style:preserve-3d] [perspective:1000px] group-hover:[transform:translateZ(18px)]" }, items.map(function (_a) {
            var Icon = _a.icon, key = _a.key;
            return (React.createElement("div", { key: key, className: "flex items-center gap-3 sm:gap-4" },
                React.createElement(Icon, { size: 28, strokeWidth: 2, color: "white", className: "h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9" }),
                React.createElement("span", { className: "text-lg leading-snug font-semibold text-white sm:text-xl lg:text-2xl" }, t(key))));
        }))));
}
exports.StatsCard = StatsCard;

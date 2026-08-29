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
exports.__esModule = true;
exports.BentoMenu = exports.AnimatedListDemo = void 0;
var icon_cloud_1 = require("@/components/ui/icon-cloud");
var react_icons_1 = require("@radix-ui/react-icons");
var files_1 = require("@/data/files");
var slugs_1 = require("@/data/slugs");
var utils_1 = require("@/lib/utils");
var animated_list_1 = require("../animated-list");
var bento_grid_1 = require("../bento-grid");
var marquee_1 = require("../magicui/marquee");
var notifications = [
    {
        name: 'Payment received',
        description: 'Magic UI',
        time: '15m ago',
        icon: '💸',
        color: '#00C9A7'
    },
    {
        name: 'User signed up',
        description: 'Magic UI',
        time: '10m ago',
        icon: '👤',
        color: '#FFB800'
    },
    {
        name: 'New message',
        description: 'Magic UI',
        time: '5m ago',
        icon: '💬',
        color: '#FF3D71'
    },
    {
        name: 'New event',
        description: 'Magic UI',
        time: '2m ago',
        icon: '🗞️',
        color: '#1E86FF'
    },
];
notifications = Array.from({ length: 10 }, function () { return notifications; }).flat();
var Notification = function (_a) {
    var name = _a.name, description = _a.description, icon = _a.icon, color = _a.color, time = _a.time;
    return (React.createElement("figure", { className: utils_1.cn('relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 ', 
        // animation styles
        'transition-all duration-400 ease-in-out hover:scale-[103%]', 
        // light styles
        'bg-gray-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]', 
        // dark styles
        'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]') },
        React.createElement("div", { className: "flex flex-row items-center gap-3" },
            React.createElement("div", { className: "flex size-10 items-center justify-center rounded-2xl", style: {
                    backgroundColor: color
                } },
                React.createElement("span", { className: "text-lg" }, icon)),
            React.createElement("div", { className: "flex flex-col overflow-hidden" },
                React.createElement("figcaption", { className: "flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white" },
                    React.createElement("span", { className: "text-sm sm:text-lg" }, name),
                    React.createElement("span", { className: "mx-1" }, "\u00B7"),
                    React.createElement("span", { className: "text-xs text-gray-500" }, time)),
                React.createElement("p", { className: "text-sm font-normal dark:text-white/60" }, description)))));
};
function AnimatedListDemo(_a) {
    var className = _a.className;
    return (React.createElement("div", { className: utils_1.cn('relative flex h-full w-full flex-col overflow-hidden p-2', className) },
        React.createElement(animated_list_1.AnimatedList, { delay: 2000 }, notifications.map(function (item, idx) { return (React.createElement(Notification, __assign({}, item, { key: idx }))); })),
        React.createElement("div", { className: "from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 " })));
}
exports.AnimatedListDemo = AnimatedListDemo;
function IconCloudDemo() {
    var images = slugs_1.SLUGS.map(function (slug) { return "https://cdn.simpleicons.org/" + slug + "/" + slug; });
    return (React.createElement("div", { className: "relative flex size-full items-center justify-center overflow-hidden" },
        React.createElement(icon_cloud_1.IconCloud, { images: images })));
}
function renderFileCard(f, idx) {
    return (React.createElement("figure", { key: idx, className: utils_1.cn('relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4', 'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]', 'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]', 'transform-gpu transition-all duration-300 ease-out') },
        React.createElement("div", { className: "flex flex-row items-center gap-2" },
            React.createElement("div", { className: "flex flex-col" },
                React.createElement("figcaption", { className: "text-sm font-medium dark:text-white" }, f.name))),
        React.createElement("blockquote", { className: "mt-2 text-xs" }, f.body)));
}
function createFeatures(disableAnimations) {
    return [
        {
            Icon: react_icons_1.FileTextIcon,
            name: 'About us',
            description: 'Learn more about our team.',
            href: '/',
            cta: 'Learn more',
            background: disableAnimations ? (React.createElement("div", { className: "absolute top-6 right-2 h-[250px] w-full border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] mr-[-8px] px-4" },
                React.createElement("div", { className: "flex flex-wrap gap-2" }, slugs_1.SLUGS.slice(0, 14).map(function (slug) { return (React.createElement("span", { key: slug, className: "rounded-md border border-white/20 px-2 py-1 text-xs text-white/70" }, slug)); })))) : (React.createElement("div", { className: "absolute top-2 right-2 h-[250px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-500 ease-out mr-[-8px] group-hover:scale-90" },
                React.createElement(IconCloudDemo, null))),
            className: 'w-full lg:max-w-60'
        },
        {
            Icon: react_icons_1.GlobeIcon,
            name: 'Projects',
            description: 'Check out some of our recent projects.',
            href: '/',
            cta: 'Learn more',
            background: disableAnimations ? (React.createElement("div", { className: "absolute top-10 px-2 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]" },
                React.createElement("div", { className: "flex flex-row gap-4 overflow-hidden" }, files_1.FILES.slice(0, 5).map(renderFileCard)))) : (React.createElement(marquee_1.Marquee, { reverse: true, pauseOnHover: true, className: "absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]" }, files_1.FILES.map(renderFileCard))),
            className: 'w-full'
        },
        {
            Icon: react_icons_1.InputIcon,
            name: 'Services',
            description: 'Learn more about our services.',
            href: '/',
            cta: 'Learn more',
            background: disableAnimations ? (React.createElement("div", { className: "absolute mr-[-6px] top-2 right-2 lg:h-[340px]  w-full border-none [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]" },
                React.createElement("div", { className: "grid gap-2 p-2" }, notifications.slice(0, 3).map(function (item, idx) { return (React.createElement(Notification, __assign({}, item, { key: idx }))); })))) : (React.createElement("div", { className: "absolute mr-[-6px] top-2 right-2 h-[340px] w-full scale-85 border-none [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-90" },
                React.createElement(AnimatedListDemo, null))),
            className: 'w-full lg:max-w-60'
        },
    ];
}
function BentoMenu(_a) {
    var _b = _a.disableAnimations, disableAnimations = _b === void 0 ? false : _b;
    var features = createFeatures(disableAnimations);
    return (React.createElement(bento_grid_1.BentoGrid, { className: "flex flex-col lg:flex-row gap-4 h-auto lg:h-[320px]", style: { maxWidth: '1496px' } }, features.map(function (feature) { return (React.createElement(bento_grid_1.BentoCard, __assign({ key: feature.name }, feature))); })));
}
exports.BentoMenu = BentoMenu;

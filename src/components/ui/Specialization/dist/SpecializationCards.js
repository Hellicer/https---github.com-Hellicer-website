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
exports.SpecializationCards = void 0;
var bento_grid_1 = require("../bento-grid");
var BentoCard_1 = require("../BentoCard");
var react_icons_1 = require("@radix-ui/react-icons");
var next_intl_1 = require("next-intl");
var SpecTypeToggle_1 = require("../SpecTypeToggle/SpecTypeToggle");
var features = [
    {
        icon: react_icons_1.GlobeIcon,
        name: 'Corporate websites',
        description: 'Business websites with custom design, SEO optimization, and high performance.'
    },
    {
        icon: react_icons_1.DashboardIcon,
        name: 'CRM',
        description: 'Customer relationship management systems to organize and automate your workflow.'
    },
    {
        icon: react_icons_1.PersonIcon,
        name: 'Personal portfolios',
        description: 'Personal portfolio websites to showcase your skills, experience, and projects.'
    },
    {
        icon: react_icons_1.CodeIcon,
        name: 'Web applications',
        description: 'Modern web applications with scalable architecture and clean UI.'
    },
    {
        icon: react_icons_1.CubeIcon,
        name: 'Marketplaces',
        description: 'Multi-vendor marketplaces with product management and secure transactions.'
    },
    {
        icon: react_icons_1.ChatBubbleIcon,
        name: 'Chatbots and automation',
        description: 'AI-powered chatbots and automation to improve customer communication.'
    },
    {
        icon: react_icons_1.IdCardIcon,
        name: 'Payment system integration',
        description: 'Integration of secure payment systems and online billing solutions.'
    },
    {
        icon: react_icons_1.RocketIcon,
        name: 'Migration and optimization',
        description: 'Migration, performance optimization, and infrastructure improvements.'
    },
];
function SpecializationCards() {
    var t = next_intl_1.useTranslations('specialization');
    return (React.createElement("div", { className: "cursor-default w-full grid grid-flow-row" },
        React.createElement("div", { className: "w-full grid gap-4 lg:grid-flow-col lg:items-center font-silkscreen font-bold mb-8 lg:mb-10", id: "specialization" },
            React.createElement("h1", { className: "text-2xl sm:text-3xl lg:text-4xl" }, t('title')),
            React.createElement(SpecTypeToggle_1["default"], null)),
        React.createElement(bento_grid_1.BentoGrid, { className: "cursor-default grid place-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full place-self-center mx-auto" }, features.map(function (_a) {
            var icon = _a.icon, rest = __rest(_a, ["icon"]);
            return (React.createElement(BentoCard_1.BentoCard, __assign({ key: rest.name, Icon: icon }, rest)));
        }))));
}
exports.SpecializationCards = SpecializationCards;

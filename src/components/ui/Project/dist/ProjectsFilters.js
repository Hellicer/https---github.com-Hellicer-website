"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProjectsFilters = void 0;
var react_1 = require("react");
var button_1 = require("../button");
function ProjectsFilters(_a) {
    var filters = _a.filters, setFilters = _a.setFilters, options = _a.options;
    var toggleTopic = function (topic) {
        setFilters(function (prev) { return ({
            topics: prev.topics.includes(topic)
                ? prev.topics.filter(function (item) { return item !== topic; })
                : __spreadArrays(prev.topics, [topic])
        }); });
    };
    return (react_1["default"].createElement("div", { className: "flex flex-wrap gap-6" },
        react_1["default"].createElement(FilterRow, { title: "Topics", items: options.topics, multiple: true, activeList: filters.topics, onClick: toggleTopic })));
}
exports.ProjectsFilters = ProjectsFilters;
function FilterRow(_a) {
    var title = _a.title, items = _a.items, onClick = _a.onClick, active = _a.active, _b = _a.activeList, activeList = _b === void 0 ? [] : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c;
    return (react_1["default"].createElement("div", { className: "flex flex-wrap items-center gap-3" },
        react_1["default"].createElement("span", { className: "text-sm uppercase tracking-wider text-gray-400" }, title),
        items.map(function (item) {
            var isActive = multiple
                ? activeList.includes(item)
                : active === item;
            return (react_1["default"].createElement(button_1.Button, { variant: "secondary", asChild: true, size: "default", key: item, onClick: function () { return onClick(item); }, className: "font-inter cursor-pointer p-0 h-9 px-4 py-1.5 rounded-md text-xs\n                            " + (isActive ? 'bg-secondary ' : '') },
                react_1["default"].createElement("span", { className: "capitalize" }, item)));
        })));
}

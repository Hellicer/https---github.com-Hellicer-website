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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.ProjectsFilters = void 0;
var button_1 = require("../button");
function ProjectsFilters(_a) {
    var filters = _a.filters, setFilters = _a.setFilters, options = _a.options;
    var toggleTech = function (tech) {
        setFilters(function (prev) { return (__assign(__assign({}, prev), { tech: prev.tech.includes(tech)
                ? prev.tech.filter(function (t) { return t !== tech; })
                : __spreadArrays(prev.tech, [tech]) })); });
    };
    return (React.createElement("div", { className: "flex flex-wrap gap-6" },
        React.createElement(FilterRow, { title: "Stack", items: options.stacks, active: filters.stack, onClick: function (value) {
                return setFilters(function (f) { return (__assign(__assign({}, f), { stack: f.stack === value ? null : value })); });
            } }),
        React.createElement(FilterRow, { title: "Status", items: options.statuses, active: filters.status, onClick: function (value) {
                return setFilters(function (f) { return (__assign(__assign({}, f), { status: f.status === value ? null : value })); });
            } }),
        React.createElement(FilterRow, { title: "Tech", items: options.tech, multiple: true, activeList: filters.tech, onClick: toggleTech })));
}
exports.ProjectsFilters = ProjectsFilters;
function FilterRow(_a) {
    var title = _a.title, items = _a.items, onClick = _a.onClick, active = _a.active, _b = _a.activeList, activeList = _b === void 0 ? [] : _b, _c = _a.multiple, multiple = _c === void 0 ? false : _c;
    return (React.createElement("div", { className: "flex flex-wrap items-center gap-3" },
        React.createElement("span", { className: "text-sm uppercase tracking-wider text-gray-400" }, title),
        items.map(function (item) {
            var isActive = multiple
                ? activeList.includes(item)
                : active === item;
            return (React.createElement(button_1.Button, { variant: "secondary", asChild: true, size: "default", key: item, onClick: function () { return onClick(item); }, className: "font-inter cursor-pointer p-0 h-9 px-4 py-1.5 rounded-md text-xs\n                            " + (isActive ? 'bg-secondary ' : '') },
                React.createElement("span", { className: "capitalize" }, item)));
        })));
}

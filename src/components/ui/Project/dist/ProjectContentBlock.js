'use client';
"use strict";
exports.__esModule = true;
var ProjectsFilters_1 = require("@/components/ui/Project/ProjectsFilters");
var ProjectsGrid_1 = require("@/components/ui/Project/ProjectsGrid");
var ProjectSkeleton_1 = require("@/components/ui/Project/ProjectSkeleton");
var projects_data_1 = require("@/data/projects.data");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var react_1 = require("react");
function ProjectContentBlock(_a) {
    var _b = _a.initialProjects, initialProjects = _b === void 0 ? projects_data_1.projects : _b;
    var t = next_intl_1.useTranslations('');
    var activeProjects = react_1.useState(initialProjects)[0];
    var _c = react_1.useState({
        topics: []
    }), filters = _c[0], setFilters = _c[1];
    var filterOptions = react_1.useMemo(function () {
        var topics = Array.from(new Set(activeProjects.flatMap(function (p) { var _a; return (_a = p.topics) !== null && _a !== void 0 ? _a : []; }))).sort(function (a, b) { return a.localeCompare(b); });
        return { topics: topics };
    }, [activeProjects]);
    react_1.useEffect(function () {
        setFilters(function (prev) {
            var validTopics = new Set(filterOptions.topics);
            var nextTopics = prev.topics.filter(function (item) { return validTopics.has(item); });
            if (nextTopics.length === prev.topics.length) {
                return prev;
            }
            return {
                topics: nextTopics
            };
        });
    }, [filterOptions]);
    return (React.createElement("section", { className: "w-full min-h-200" },
        React.createElement("div", { className: " w-full grid grid-flow-col font-silkscreen text-4xl font-bold " },
            React.createElement("h1", null, t('project.title'))),
        React.createElement("div", { className: "px-5 mt-16 mb-16 flex items-center justify-between" },
            React.createElement(ProjectsFilters_1.ProjectsFilters, { filters: filters, setFilters: setFilters, options: filterOptions }),
            React.createElement("button", { title: t('common.resetFilter'), 
                // onClick={() =>
                //     setFilters({ stack: null, status: null, tech: [] })
                // }
                className: "text-xs mx-6 text-gray-400 underline hover:text-white" },
                React.createElement(lucide_react_1.RotateCcw, { className: "h-4 w-4 cursor-pointer" }))),
        React.createElement("div", { className: "px-5" },
            React.createElement(react_1.Suspense, { fallback: React.createElement(ProjectSkeleton_1["default"], null) },
                React.createElement(ProjectsGrid_1.ProjectsGrid, { filters: filters, projects: activeProjects })))));
}
exports["default"] = ProjectContentBlock;

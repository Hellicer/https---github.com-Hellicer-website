"use strict";
exports.__esModule = true;
exports.ProjectsGrid = void 0;
var NoFoundProjectsBlock_1 = require("./NoFoundProjectsBlock");
var ProjectCard_1 = require("./ProjectCard");
function ProjectsGrid(_a) {
    var filters = _a.filters, projects = _a.projects;
    var filteredProjects = projects.filter(function (project) {
        return filters.topics.every(function (topic) { var _a; return (_a = project.topics) === null || _a === void 0 ? void 0 : _a.includes(topic); });
    });
    return (React.createElement("div", { className: "grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8" },
        filteredProjects.map(function (project) { return (React.createElement("div", { className: "h-full project-grid-item", key: project.id },
            React.createElement(ProjectCard_1["default"], { project: project }))); }),
        filteredProjects.length === 0 && (React.createElement("div", { className: "col-span-full no-found-fade-in" },
            React.createElement(NoFoundProjectsBlock_1.NoFoundProjectsBlock, null)))));
}
exports.ProjectsGrid = ProjectsGrid;

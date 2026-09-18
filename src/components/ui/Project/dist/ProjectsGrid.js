"use strict";
exports.__esModule = true;
exports.ProjectsGrid = void 0;
var react_1 = require("react");
var ProjectCard_1 = require("./ProjectCard");
var NoFoundProjectsBlock_1 = require("./NoFoundProjectsBlock");
function ProjectsGrid(_a) {
    var filters = _a.filters, projects = _a.projects;
    var EXIT_DURATION_MS = 260;
    // const techFilterKey = filters.tech.join('|')
    // const filteredProjects = useMemo(() => {
    //     return projects.filter(project => {
    //         if (filters.stack && project.stack !== filters.stack) return false
    //         if (filters.status && project.status !== filters.status) return false
    //         if (
    //             filters.tech.length > 0 &&
    //             !filters.tech.every(t => project.tech.includes(t))
    //         ) {
    //             return false
    //         }
    //         return true
    //     })
    // }, [projects, filters.stack, filters.status, techFilterKey])
    // const filteredProjectsKey = filteredProjects.map(project => project.id).join('|')
    var _b = react_1.useState(projects), displayedProjects = _b[0], setDisplayedProjects = _b[1];
    var _c = react_1.useState(false), isExiting = _c[0], setIsExiting = _c[1];
    var _d = react_1.useState(true), showNoFound = _d[0], setShowNoFound = _d[1];
    var exitTimeoutRef = react_1.useRef(null);
    var displayedProjectsKey = displayedProjects
        .map(function (project) { return project.id; })
        .join('|');
    // useEffect(() => {
    //     if (exitTimeoutRef.current) {
    //         clearTimeout(exitTimeoutRef.current)
    //         exitTimeoutRef.current = null
    //     }
    //     if (filteredProjectsKey === displayedProjectsKey) {
    //         setShowNoFound(filteredProjects.length === 0)
    //         setIsExiting(false)
    //         return
    //     }
    //     setIsExiting(true)
    //     setShowNoFound(false)
    //     exitTimeoutRef.current = setTimeout(() => {
    //         setDisplayedProjects(filteredProjects)
    //         setIsExiting(false)
    //         setShowNoFound(filteredProjects.length === 0)
    //     }, EXIT_DURATION_MS)
    // }, [
    //     displayedProjectsKey,
    //     filteredProjects,
    //     filteredProjectsKey,
    //     filteredProjects.length,
    // ])
    react_1.useEffect(function () {
        return function () {
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current);
            }
        };
    }, []);
    return (React.createElement("div", { className: "grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8" },
        displayedProjects.map(function (project) { return (React.createElement("div", { className: "h-full project-grid-item " + (isExiting ? 'project-grid-item-exit' : ''), key: project.id },
            React.createElement(ProjectCard_1["default"], { project: project }))); }),
        showNoFound && (React.createElement("div", { className: "col-span-full no-found-fade-in" },
            React.createElement(NoFoundProjectsBlock_1.NoFoundProjectsBlock, null)))));
}
exports.ProjectsGrid = ProjectsGrid;

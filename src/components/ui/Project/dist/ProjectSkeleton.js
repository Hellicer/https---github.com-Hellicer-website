"use strict";
exports.__esModule = true;
function ProjectCardSkeleton() {
    return (React.createElement("div", { className: "project-card-anim flex h-full min-h-[320px] animate-pulse flex-col gap-3 rounded-2xl bg-card p-4 backdrop-blur-md min-[581px]:min-h-[360px] min-[581px]:gap-4 min-[581px]:p-5 min-[900px]:p-6" },
        React.createElement("div", { className: "h-14 overflow-hidden min-[581px]:h-16" },
            React.createElement("div", { className: "h-6 w-3/4 rounded-md bg-muted min-[581px]:h-7" })),
        React.createElement("div", { className: "relative h-40 overflow-hidden rounded-xl bg-muted min-[581px]:h-44" }),
        React.createElement("div", { className: "flex h-9 flex-wrap items-center gap-2" },
            React.createElement("div", { className: "h-8 w-20 rounded-md bg-muted" }),
            React.createElement("div", { className: "h-8 w-24 rounded-md bg-muted" })),
        React.createElement("div", { className: "mt-auto flex h-16 flex-wrap content-end gap-1.5 overflow-hidden min-[581px]:gap-2" },
            React.createElement("div", { className: "h-6 w-16 rounded-md bg-muted" }),
            React.createElement("div", { className: "h-6 w-20 rounded-md bg-muted" }),
            React.createElement("div", { className: "h-6 w-14 rounded-md bg-muted" }))));
}
function ProjectSkeleton() {
    return (React.createElement("div", { className: "grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8" }, Array.from({ length: 4 }).map(function (_, index) { return (React.createElement(ProjectCardSkeleton, { key: index })); })));
}
exports["default"] = ProjectSkeleton;

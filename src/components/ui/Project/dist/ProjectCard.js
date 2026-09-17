'use client';
"use strict";
exports.__esModule = true;
var Tag_1 = require("@/components/ui/Tag");
var lucide_react_1 = require("lucide-react");
var next_intl_1 = require("next-intl");
var image_1 = require("next/image");
var react_1 = require("react");
var PROJECT_PREVIEW_PLACEHOLDER = 'https://placehold.net/600x400.png';
function ProjectCard(_a) {
    var _b, _c;
    var project = _a.project;
    var t = next_intl_1.useTranslations('');
    var _d = react_1.useState(((_b = project.previewUrl) === null || _b === void 0 ? void 0 : _b.trim()) || PROJECT_PREVIEW_PLACEHOLDER), previewSrc = _d[0], setPreviewSrc = _d[1];
    var detailsUrl = (_c = project.codeUrl) !== null && _c !== void 0 ? _c : project.liveUrl;
    react_1.useEffect(function () {
        var _a;
        setPreviewSrc(((_a = project.previewUrl) === null || _a === void 0 ? void 0 : _a.trim()) || PROJECT_PREVIEW_PLACEHOLDER);
    }, [project.previewUrl]);
    return (React.createElement("div", { className: "project-card-anim card-hover-effect animate-fade-in-up flex h-full min-h-[320px] flex-col gap-3 rounded-2xl bg-card p-4 backdrop-blur-md transition-all min-[581px]:min-h-[360px] min-[581px]:gap-4 min-[581px]:p-5 min-[900px]:p-6" },
        React.createElement("h3", { className: "h-14 overflow-hidden text-xl leading-tight font-semibold text-white min-[581px]:h-16 min-[581px]:text-2xl" }, project.title),
        React.createElement("div", { className: "relative h-40 overflow-hidden rounded-xl bg-gray-200 min-[581px]:h-44" },
            React.createElement(image_1["default"], { alt: project.title + " preview", className: "h-full w-full object-contain", onError: function () { return setPreviewSrc(PROJECT_PREVIEW_PLACEHOLDER); }, src: previewSrc, fill: true, sizes: "(max-width: 580px) 100vw, 360px" })),
        React.createElement("div", { className: "flex h-9 flex-wrap items-center gap-2 overflow-hidden" },
            project.liveUrl ? (React.createElement("a", { className: "inline-flex h-8 items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition hover:opacity-90", href: project.liveUrl, rel: "noreferrer", target: "_blank" },
                React.createElement(lucide_react_1.ExternalLink, { className: "h-3.5 w-3.5" }),
                "Live")) : null,
            detailsUrl ? (React.createElement("a", { className: "inline-flex h-8 items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-accent", href: detailsUrl, rel: "noreferrer", target: "_blank" },
                React.createElement(lucide_react_1.CircleEllipsis, { className: "h-3.5 w-3.5" }),
                t('common.details'))) : null),
        React.createElement("div", { className: "mt-auto flex h-16 flex-wrap content-end gap-1.5 overflow-hidden min-[581px]:gap-2" },
            React.createElement(Tag_1["default"], { variant: project.status }, project.status),
            project.tech.map(function (t) { return (React.createElement(Tag_1["default"], { className: "capitalize", key: t }, t)); }))));
}
exports["default"] = ProjectCard;

'use client';
"use strict";
exports.__esModule = true;
exports.SkillTiles = void 0;
var image_1 = require("next/image");
var react_1 = require("react");
var SkillIcon_1 = require("./SkillIcon");
var toSimpleIconsSlug_1 = require("./toSimpleIconsSlug");
function SkillTiles(_a) {
    var techStack = _a.techStack, onRemove = _a.onRemove, _b = _a.fixedHeight, fixedHeight = _b === void 0 ? true : _b, _c = _a.showOverflowIndicator, showOverflowIndicator = _c === void 0 ? true : _c;
    var wrapperRef = react_1.useRef(null);
    var contentRef = react_1.useRef(null);
    var _d = react_1.useState(false), hasOverflow = _d[0], setHasOverflow = _d[1];
    var normalizedTechStack = react_1.useMemo(function () {
        return techStack.map(function (tech) {
            return typeof tech === 'string' ? { name: tech, icon: null } : tech;
        });
    }, [techStack]);
    react_1.useEffect(function () {
        var frameId1 = 0;
        var frameId2 = 0;
        var checkOverflow = function () {
            var wrapper = wrapperRef.current;
            var content = contentRef.current;
            if (!wrapper || !content) {
                setHasOverflow(false);
                return;
            }
            var verticalOverflow = content.scrollHeight - wrapper.clientHeight;
            var horizontalOverflow = content.scrollWidth - wrapper.clientWidth;
            setHasOverflow(verticalOverflow > 1 || horizontalOverflow > 1);
        };
        var scheduleCheck = function () {
            cancelAnimationFrame(frameId1);
            cancelAnimationFrame(frameId2);
            frameId1 = requestAnimationFrame(function () {
                checkOverflow();
                frameId2 = requestAnimationFrame(checkOverflow);
            });
        };
        scheduleCheck();
        var resizeObserver = new ResizeObserver(scheduleCheck);
        if (wrapperRef.current)
            resizeObserver.observe(wrapperRef.current);
        if (contentRef.current)
            resizeObserver.observe(contentRef.current);
        var mutationObserver = new MutationObserver(scheduleCheck);
        if (contentRef.current) {
            mutationObserver.observe(contentRef.current, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
        window.addEventListener('resize', scheduleCheck);
        return function () {
            cancelAnimationFrame(frameId1);
            cancelAnimationFrame(frameId2);
            resizeObserver.disconnect();
            mutationObserver.disconnect();
            window.removeEventListener('resize', scheduleCheck);
        };
    }, [normalizedTechStack]);
    return (React.createElement("div", { className: "relative " + (fixedHeight ? 'h-[210px] overflow-hidden min-[581px]:h-[200px]' : ''), ref: wrapperRef },
        React.createElement("div", { className: "flex flex-wrap gap-2 pl-2 pt-1", ref: contentRef }, normalizedTechStack.map(function (tech, index) { return (React.createElement("div", { key: tech.name + "-" + index }, onRemove ? (React.createElement("button", { type: "button", onClick: function () { return onRemove(tech.name); }, className: "bg-accent px-3 py-1 rounded-md text-xs font-semibold flex items-center shadow-md h-8 hover:opacity-90 transition-opacity", title: "Remove", "aria-label": "Remove " + tech.name },
            tech.icon ? (React.createElement(image_1["default"], { className: "mr-2 h-4 w-4", src: tech.icon, width: 16, height: 16, alt: tech.name + " logo", unoptimized: true })) : (React.createElement(SkillIcon_1.SkillIcon, { skill: toSimpleIconsSlug_1.toSimpleIconsSlug(tech.name) })),
            React.createElement("p", null, tech.name),
            React.createElement("span", { className: "ml-2 leading-none" }, "\u00D7"))) : (React.createElement("div", { className: "bg-accent px-3 py-1 rounded-md text-xs font-semibold flex items-center shadow-md h-8" },
            tech.icon ? (React.createElement(image_1["default"], { className: "mr-2 h-4 w-4", src: tech.icon, width: 16, height: 16, alt: tech.name + " logo", unoptimized: true })) : (React.createElement(SkillIcon_1.SkillIcon, { skill: toSimpleIconsSlug_1.toSimpleIconsSlug(tech.name) })),
            React.createElement("p", null, tech.name))))); })),
        showOverflowIndicator && hasOverflow && (React.createElement("div", { className: "pointer-events-none absolute right-2 bottom-2 min-[581px]:right-22" },
            React.createElement("span", { className: "inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-semibold tracking-widest" }, "...")))));
}
exports.SkillTiles = SkillTiles;

"use strict";
exports.__esModule = true;
function Tag(_a) {
    var children = _a.children, variant = _a.variant, _b = _a.className, className = _b === void 0 ? '' : _b;
    return (React.createElement("span", { className: "\n                inline-flex max-w-full items-center\n                px-2 py-1 min-[581px]:px-3\n                rounded-md\n                text-[11px] leading-4 min-[581px]:text-xs\n                capitalize\n                cursor-default\n                [overflow-wrap:anywhere]\n                bg-accent text-secondary-foreground hover:bg-accent/80\n                " + className + "\n                " + (variant === 'online' ? 'text-green-500' : '') + "\n            " }, children));
}
exports["default"] = Tag;

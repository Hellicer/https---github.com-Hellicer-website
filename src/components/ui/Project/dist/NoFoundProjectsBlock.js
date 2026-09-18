"use strict";
exports.__esModule = true;
exports.NoFoundProjectsBlock = void 0;
var next_intl_1 = require("next-intl");
function NoFoundProjectsBlock() {
    var t = next_intl_1.useTranslations('common');
    return (React.createElement("div", null,
        React.createElement("div", { className: "relative overflow-hidden rounded-2xl border border-border bg-card/70 px-8 py-12 text-center backdrop-blur-md h-[404px] content-center" },
            React.createElement("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.06),transparent_55%)] opacity-50" }),
            React.createElement("p", { className: "relative z-10 font-silkscreen text-xs uppercase tracking-[0.35em] text-muted-foreground" }, t('empty')),
            React.createElement("h2", { className: "relative z-10 mt-3 font-silkscreen text-3xl font-bold tracking-[0.2em] text-foreground sm:text-4xl" }, t('noProjects')),
            React.createElement("p", { className: "relative z-10 mt-4 text-sm text-muted-foreground" }, t('tryClearFilters')),
            React.createElement("div", { className: "relative z-10 mx-auto mt-8 h-px w-24 bg-border" }))));
}
exports.NoFoundProjectsBlock = NoFoundProjectsBlock;

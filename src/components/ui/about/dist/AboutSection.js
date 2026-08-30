"use strict";
exports.__esModule = true;
exports.AboutSection = void 0;
var next_intl_1 = require("next-intl");
var ProfileCard_1 = require("./ProfileCard");
var StatsCard_1 = require("./StatsCard");
var TestimonialsMarquee_1 = require("./TestimonialsMarquee");
function AboutSection(_a) {
    var initialProfileLoad = _a.initialProfileLoad;
    var t = next_intl_1.useTranslations('about');
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "grid w-full cursor-default grid-flow-col font-silkscreen text-3xl font-bold sm:text-4xl" },
            React.createElement("h1", null,
                " ",
                t('title'))),
        React.createElement("div", { className: " pt- grid h-auto min-w-0 gap-8 justify-items-center lg:grid-cols-2 lg:gap-10" },
            React.createElement("div", { className: "pt-10 grid w-full min-w-0 max-w-158 cursor-default grid-flow-row gap-8 lg:gap-10" },
                React.createElement("div", { className: "grid" },
                    React.createElement("h3", { className: "h-fit text-2xl leading-tight font-inter font-extrabold max-lg:pb-4 sm:text-3xl lg:text-4xl" }, t('subtitle')),
                    React.createElement(StatsCard_1.StatsCard, { className: "grid h-full w-full max-w-158 items-stretch content-between" })),
                React.createElement(TestimonialsMarquee_1.TestimonialsMarquee, { className: "h-fit w-full cursor-default self-end" })),
            React.createElement("div", { className: " max-lg:justify-items-center grid w-full min-w-0 cursor-pointer gap-8 lg:mt-12 lg:gap-10 lg:mr-10 place-items-end " },
                React.createElement(ProfileCard_1.ProfileCard, { className: "w-full max-w-158", initialProfileLoad: initialProfileLoad })))));
}
exports.AboutSection = AboutSection;

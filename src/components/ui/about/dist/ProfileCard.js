'use client';
"use strict";
exports.__esModule = true;
exports.ProfileCard = void 0;
var profileClientApi_1 = require("@/api/profileClientApi");
var react_icons_1 = require("@radix-ui/react-icons");
var next_intl_1 = require("next-intl");
var image_1 = require("next/image");
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var modules_1 = require("swiper/modules");
var react_2 = require("swiper/react");
var button_1 = require("../button");
var EmptyProfileCard_1 = require("./EmptyProfileCard");
var RadarSkills_1 = require("./RadarSkills");
var SkillTiles_1 = require("./SkillTiles");
var TitleBar_1 = require("./TitleBar");
function ProfileCard(_a) {
    var _b, _c, _d;
    var _e = _a === void 0 ? {} : _a, className = _e.className, initialProfileLoad = _e.initialProfileLoad;
    var t = next_intl_1.useTranslations('');
    var _f = react_1.useState((_b = initialProfileLoad === null || initialProfileLoad === void 0 ? void 0 : initialProfileLoad.data) !== null && _b !== void 0 ? _b : []), profileCards = _f[0], setProfileCards = _f[1];
    var _g = react_1.useState(false), isEmptyCardModalOpen = _g[0], setIsEmptyCardModalOpen = _g[1];
    var _h = react_1.useState((_c = initialProfileLoad === null || initialProfileLoad === void 0 ? void 0 : initialProfileLoad.source) !== null && _c !== void 0 ? _c : 'loading'), profileSource = _h[0], setProfileSource = _h[1];
    var _j = react_1.useState((_d = initialProfileLoad === null || initialProfileLoad === void 0 ? void 0 : initialProfileLoad.reason) !== null && _d !== void 0 ? _d : null), profileLoadReason = _j[0], setProfileLoadReason = _j[1];
    var shouldShowComingSoonFallback = profileCards.length === 0;
    var shouldUseSwiper = profileCards.length > 0;
    react_1.useEffect(function () {
        if (initialProfileLoad) {
            return;
        }
        var isMounted = true;
        profileClientApi_1.fetchProfileStat().then(function (result) {
            var _a;
            if (!isMounted) {
                return;
            }
            if (result.data.length > 0) {
                setProfileCards(result.data);
                setProfileSource(result.source);
                setProfileLoadReason(null);
            }
            else {
                setProfileSource('local');
                setProfileLoadReason((_a = result.reason) !== null && _a !== void 0 ? _a : null);
            }
        });
        return function () {
            isMounted = false;
        };
    }, [initialProfileLoad]);
    react_1.useEffect(function () {
        if (!isEmptyCardModalOpen) {
            return;
        }
        var html = document.documentElement;
        var body = document.body;
        var scrollY = window.scrollY;
        var originalHtmlOverflow = html.style.overflow;
        var originalHtmlOverscroll = html.style.overscrollBehavior;
        var originalBodyOverflow = body.style.overflow;
        var originalBodyPosition = body.style.position;
        var originalBodyTop = body.style.top;
        var originalBodyWidth = body.style.width;
        var originalBodyOverscroll = body.style.overscrollBehavior;
        var originalBodyTouchAction = body.style.touchAction;
        html.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = "-" + scrollY + "px";
        body.style.width = '100%';
        body.style.overscrollBehavior = 'none';
        body.style.touchAction = 'none';
        return function () {
            html.style.overflow = originalHtmlOverflow;
            html.style.overscrollBehavior = originalHtmlOverscroll;
            body.style.overflow = originalBodyOverflow;
            body.style.position = originalBodyPosition;
            body.style.top = originalBodyTop;
            body.style.width = originalBodyWidth;
            body.style.overscrollBehavior = originalBodyOverscroll;
            body.style.touchAction = originalBodyTouchAction;
            window.scrollTo(0, scrollY);
        };
    }, [isEmptyCardModalOpen]);
    var renderProfileCardContent = function (d) { return (React.createElement("div", { className: "grid min-h-[860px] min-w-0 gap-6 rounded-2xl bg-card p-4 text-sm transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:p-6 min-[581px]:min-h-[954px]" },
        React.createElement("div", { className: "grid min-w-0 gap-6 min-[581px]:grid-cols-[minmax(0,1fr)_auto]" },
            React.createElement("div", { className: "order-1 min-w-0 font-inter text-base font-semibold min-[581px]:col-start-1 min-[581px]:row-start-1" },
                React.createElement(TitleBar_1.TitleBar, { title: t('profileCard.mainInfo') }),
                React.createElement("div", { className: "pl-2 pt-1" },
                    React.createElement("p", null,
                        React.createElement("span", { className: "text-chart-1" },
                            "> ",
                            t('profileCard.name'),
                            ":",
                            ' '),
                        d.mainInfo.name),
                    React.createElement("p", null,
                        React.createElement("span", { className: "text-chart-1" },
                            "> ",
                            t('profileCard.position'),
                            ":",
                            ' '),
                        d.mainInfo.position),
                    React.createElement("p", null,
                        React.createElement("span", { className: "text-chart-1" },
                            "> ",
                            t('profileCard.sex'),
                            ":",
                            ' '),
                        d.mainInfo.sex),
                    React.createElement("p", null,
                        React.createElement("span", { className: "text-chart-1" },
                            "> ",
                            t('profileCard.age'),
                            ":",
                            ' '),
                        d.mainInfo.age))),
            React.createElement("div", { className: "order-2 grid min-w-0 content-start gap-4 min-[581px]:col-start-2 min-[581px]:row-span-2 min-[581px]:row-start-1 min-[581px]:grid-cols-1" },
                React.createElement("div", { className: "relative flex h-32 w-32 max-[580px]:h-48 max-[580px]:w-full items-center justify-center rounded-xl bg-gray-500/40 min-[581px]:h-50 min-[581px]:w-50" }, d.mainInfo.photo ? (React.createElement(image_1["default"], { src: d.mainInfo.photo, alt: d.mainInfo.name + " photo", className: "h-full w-full rounded-xl object-cover", fill: true, sizes: "(max-width: 580px) 100vw, 200px", unoptimized: true })) : (React.createElement("span", null, t('profileCard.photo')))),
                React.createElement("div", { className: "flex w-full min-w-0 flex-col gap-2 min-[581px]:max-w-50" },
                    React.createElement(button_1.Button, { variant: "secondary", asChild: true, size: "default", className: "pointer-events-auto h-9 p-0 text-sm sm:text-base" },
                        React.createElement("a", { href: '#', className: "" },
                            React.createElement("span", { className: "capitalize" },
                                t('common.download'),
                                " CV"))),
                    React.createElement("div", { className: "flex flex-wrap gap-2" },
                        React.createElement("div", { className: "text-card-foreground mt-1 flex text-xs pointer-events-cursor" },
                            React.createElement("a", { className: "bg-gray-600 flex py-1 px-1 rounded-l-sm", href: "https://wakatime.com" },
                                React.createElement(image_1["default"], { className: "me-1", src: "https://cdn.simpleicons.org/wakatime/wakatime", width: 14, height: 14, alt: "Wakatime logo" }),
                                "wakatime"),
                            React.createElement("div", { className: "bg-[#0778b9] py-1  px-1 rounded-r-sm" }, d.stats.wakatime)),
                        React.createElement("a", { href: d.links.linkedin },
                            React.createElement(react_icons_1.LinkedInLogoIcon, { className: "h-[24px] w-[24px] mt-1  text-white", "aria-label": "LinkedIn icon" })),
                        React.createElement("a", { href: d.links.github },
                            React.createElement(react_icons_1.GitHubLogoIcon, { className: "h-[24px] w-[24px] mt-1 text-white", "aria-label": "GitHub icon" }))))),
            React.createElement("div", { className: "order-3 min-[581px]:col-start-1 min-[581px]:row-start-2" },
                React.createElement(TitleBar_1.TitleBar, { title: t('profileCard.skills') }),
                React.createElement("div", { className: "pl-2 pt-1" }, d.skills
                    .split(',')
                    .map(function (skill) { return skill.trim(); })
                    .filter(Boolean)
                    .map(function (skill) { return (React.createElement("p", { className: "font-inter text-base font-semibold  w-full  wrap-break-word ", key: skill }, skill)); })))),
        React.createElement("div", null,
            React.createElement("div", { className: "pb-2.5" },
                React.createElement(TitleBar_1.TitleBar, { title: t('profileCard.techStack') })),
            React.createElement(SkillTiles_1.SkillTiles, { techStack: d.techStack })),
        React.createElement("div", { className: "grid min-w-0 grid-cols-1 gap-6 min-[581px]:grid-cols-2" },
            React.createElement("div", { className: "grid grid-flow-row" },
                React.createElement(TitleBar_1.TitleBar, { title: t('profileCard.otherInfo') }),
                React.createElement(RadarSkills_1.RadarSimple, { labels: [
                        'Architecture',
                        'Coding',
                        'Speed',
                        'Rhythm',
                        'Soft skills',
                    ], values: [
                        d.otherInfo.skillsChart.architecture,
                        d.otherInfo.skillsChart.coding,
                        d.otherInfo.skillsChart.performance,
                        d.otherInfo.skillsChart.consistency,
                        d.otherInfo.skillsChart.communication,
                    ] })),
            React.createElement("div", { className: "grid min-w-0 content-start" },
                React.createElement(TitleBar_1.TitleBar, { title: t('profileCard.projects') }),
                React.createElement("div", { className: "letter-spacing-wide grid grid-flow-row space-y-3 py-3 pt-4 pl-2 font-inter text-sm font-semibold sm:pt-6 sm:text-base" }, [
                    ['Open-source', d.projects['open source']],
                    ['Startups', d.projects.startups],
                    ['Freelance', d.projects.freelance],
                    ['Corporate', d.projects.corporate],
                ].map(function (_a) {
                    var label = _a[0], value = _a[1];
                    return (React.createElement("a", { key: label, href: "#", className: "underline" },
                        "> ",
                        label,
                        ": ",
                        React.createElement("span", null, value)));
                })))))); };
    var comingSoonContent = (React.createElement("div", { className: "grid min-h-[860px] min-w-0 place-items-center rounded-2xl bg-card p-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.45)] min-[581px]:min-h-[954px]" },
        React.createElement("div", { className: "grid gap-4" },
            React.createElement("p", { className: "rounded-full border border-ring/40 bg-card/70 px-4 py-3 font-silkscreen text-2xl tracking-widest text-ring uppercase shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:px-6 sm:text-3xl" }, t('profile.comingSoon')),
            React.createElement("p", { className: "text-sm text-muted-foreground font-semibold" }, t('profile.comingSoonDescription')),
            React.createElement(button_1.Button, { variant: "secondary", size: "default", className: "mx-auto text-2xl pointer-events-auto", onClick: function () { return setIsEmptyCardModalOpen(true); } }, '+ ' + t('profile.submitApplication')))));
    var emptyCardModalContent = (React.createElement("div", { className: "fixed inset-0 z-[9999] overflow-y-auto overscroll-contain bg-black/70 p-4" },
        React.createElement("div", { className: "relative mx-auto w-full max-w-xl pt-8", onClick: function (e) { return e.stopPropagation(); } },
            React.createElement("button", { type: "button", className: "absolute top-10 -right-12 z-10 rounded-md border border-ring/40 bg-card px-2 py-1 text-sm font-semibold text-white hover:bg-card/90", onClick: function () { return setIsEmptyCardModalOpen(false); }, "aria-label": "Close modal" }, '\u00D7'),
            React.createElement(EmptyProfileCard_1.EmptyProfileCard, { onCancel: function () { return setIsEmptyCardModalOpen(false); } }))));
    var emptyCardModal = isEmptyCardModalOpen && typeof document !== 'undefined'
        ? react_dom_1.createPortal(emptyCardModalContent, document.body)
        : null;
    if (shouldShowComingSoonFallback) {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: "group w-full min-w-0 max-w-xl [perspective:1000px] " + className }, comingSoonContent),
            emptyCardModal));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "group w-full min-w-0 max-w-xl [perspective:1000px] " + className }, shouldUseSwiper ? (React.createElement(react_2.Swiper, { effect: "cards", grabCursor: true, autoHeight: true, modules: [modules_1.EffectCards], className: "w-full min-w-0" },
            profileCards.map(function (card, index) { return (React.createElement(react_2.SwiperSlide, { key: card.mainInfo.name + "-" + index, className: "min-w-0" }, renderProfileCardContent(card))); }),
            React.createElement(react_2.SwiperSlide, { className: "min-w-0" }, comingSoonContent))) : (renderProfileCardContent(profileCards[0]))),
        emptyCardModal));
}
exports.ProfileCard = ProfileCard;

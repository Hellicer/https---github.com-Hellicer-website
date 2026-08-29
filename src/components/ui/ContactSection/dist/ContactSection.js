"use strict";
exports.__esModule = true;
var react_icons_1 = require("@radix-ui/react-icons");
var next_intl_1 = require("next-intl");
var link_1 = require("next/link");
var fa_1 = require("react-icons/fa");
var md_1 = require("react-icons/md");
var pi_1 = require("react-icons/pi");
function ContactSection() {
    var t = next_intl_1.useTranslations('contact');
    return (React.createElement("section", { className: "w-full text-white", id: "contact" },
        React.createElement("div", { className: "" },
            React.createElement("h2", { className: "font-silkscreen text-2xl sm:text-3xl font-bold tracking-widest uppercase mb-8 sm:mb-12" }, t('title')),
            React.createElement("div", { className: "flex flex-col md:flex-row justify-between gap-8 px-5 sm:gap-12 mx-auto" },
                React.createElement("div", { className: "space-y-6 sm:space-y-8 text-sm sm:text-base lg:text-lg" },
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3" },
                        React.createElement("span", { className: "underline underline-offset-4" }, t('tg')),
                        React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                            React.createElement(pi_1.PiTelegramLogo, { className: "w-6 h-6" })),
                        React.createElement("span", { className: "underline underline-offset-4" },
                            t('whatsapp'),
                            ":"),
                        React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                            React.createElement(fa_1.FaWhatsapp, { className: "w-6 h-6" }))),
                    React.createElement("div", { className: "flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3" },
                        React.createElement("span", { className: "underline underline-offset-4" }, "E-mail:"),
                        React.createElement(link_1["default"], { href: "mailto:manager@logotypeweb.studio", className: "underline underline-offset-4 hover:opacity-70 break-all" }, "manager@logotypeweb.studio"),
                        React.createElement("button", { className: "hover:opacity-70 w-fit" },
                            React.createElement(md_1.MdOutlineContentCopy, { className: "w-6 h-6" })))),
                React.createElement("div", { className: "flex items-center flex-wrap gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg self-start md:self-end" },
                    React.createElement("span", { className: "underline underline-offset-4" },
                        t('otherLinks'),
                        ":"),
                    React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                        React.createElement(react_icons_1.InstagramLogoIcon, { className: "w-6 h-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                        React.createElement(react_icons_1.GitHubLogoIcon, { className: "w-6 h-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                        React.createElement(react_icons_1.LinkedInLogoIcon, { className: "w-6 h-6" })),
                    React.createElement(link_1["default"], { href: "#", className: "hover:opacity-70" },
                        React.createElement(fa_1.FaFigma, { className: "w-6 h-6" })))))));
}
exports["default"] = ContactSection;

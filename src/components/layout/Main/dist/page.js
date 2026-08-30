"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var profileStatApi_1 = require("@/api/profileStatApi");
var index_1 = require("@/components/layout/index");
var button_1 = require("@/components/ui/button");
var ProjectContentBlock_1 = require("@/components/ui/Project/ProjectContentBlock");
var SpecializationCards_1 = require("@/components/ui/Specialization/SpecializationCards");
var projects_data_1 = require("@/data/projects.data");
var github_1 = require("@/lib/github");
var lucide_react_1 = require("lucide-react");
var server_1 = require("next-intl/server");
var LazyAboutSection_1 = require("./LazyAboutSection");
var LazyBentoMenu_1 = require("./LazyBentoMenu");
function MainPage() {
    return __awaiter(this, void 0, void 0, function () {
        var t, _a, dbProjects, initialProfileLoad, initialProjects;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, server_1.getTranslations('')];
                case 1:
                    t = _b.sent();
                    return [4 /*yield*/, github_1.syncGithubProjectsIfNeeded()["catch"](function () { return undefined; })];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, Promise.all([
                            github_1.getGithubProjectsFromDb()["catch"](function () { return []; }),
                            profileStatApi_1.fetchProfileCardsFromGists()["catch"](function () { return ({
                                data: [],
                                source: 'local',
                                reason: 'Failed to load profile cards on server.'
                            }); }),
                        ])];
                case 3:
                    _a = _b.sent(), dbProjects = _a[0], initialProfileLoad = _a[1];
                    console.log(dbProjects);
                    initialProjects = dbProjects.length > 0 ? dbProjects : projects_data_1.projects;
                    return [2 /*return*/, (React.createElement("main", { className: "pt-20 " },
                            React.createElement(index_1.GlobeWrapper, null,
                                React.createElement("div", { className: "cursor-default w-full max-w-360 mx-auto mt-25 text-left px-5", id: "about" },
                                    React.createElement("div", { className: "flex flex-col relative z-10 w-full max-w-6xl\n                    " },
                                        React.createElement("h1", { className: " font-silkscreen text-5xl  max-w-4xl  font-bold uppercase leading-tight tracking-wide" }, t('headerTitle.title')),
                                        React.createElement("p", { className: "mt-10 font-semibold text-xl text-gray-30 max-w-4xl  text-left" }, t('headerTitle.description')),
                                        React.createElement("div", { className: "mt-10 mx-22 text-right" },
                                            React.createElement(button_1.Button, { variant: "secondary", asChild: true, size: "default", className: "pointer-events-auto p-4 h-12 " },
                                                React.createElement("a", { href: '#', className: "" },
                                                    React.createElement("span", { className: "text-2xl" }, t('common.hireUs')),
                                                    React.createElement(lucide_react_1.Inbox, { className: " ms-2 min-h-5.5 min-w-5.5" })))))),
                                React.createElement("div", { className: "w-full max-w-360 mx-auto mt-22 text-left px-5", style: { paddingLeft: '62px' } },
                                    React.createElement(LazyBentoMenu_1["default"], null))),
                            React.createElement("div", { className: "relative mx-auto grid max-w-360 z-10 justify-items-center max-lg:px-2 lg:p-4 gap-50 items-stretch mt-20" },
                                React.createElement(SpecializationCards_1.SpecializationCards, null),
                                React.createElement(LazyAboutSection_1["default"], { initialProfileLoad: initialProfileLoad })),
                            React.createElement("div", { className: "relative mx-auto grid max-w-360 mt-40 z-10 justify-items-center p-4 gap-16 items-stretch  ", id: "projects" },
                                React.createElement(ProjectContentBlock_1["default"], { initialProjects: initialProjects }))))];
            }
        });
    });
}
exports["default"] = MainPage;

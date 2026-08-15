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
exports.fetchProfileCardsFromGists = void 0;
var githubApi_1 = require("@/api/githubApi");
require("server-only");
var STAT_GIST_KEYWORD = 'statgist';
function isRecord(value) {
    return Boolean(value) && typeof value === 'object';
}
function isProfileStatGistPayload(value) {
    if (!isRecord(value)) {
        return false;
    }
    var payload = value;
    var mainInfo = payload.mainInfo;
    var skills = payload.skills;
    var techStack = payload.techStack;
    var projects = payload.projects;
    var otherInfo = payload.otherInfo;
    var skillsChart = otherInfo === null || otherInfo === void 0 ? void 0 : otherInfo.skillsChart;
    var stats = payload.stats;
    var links = payload.links;
    return (!!mainInfo &&
        typeof mainInfo.name === 'string' &&
        typeof mainInfo.position === 'string' &&
        (mainInfo.sex === undefined || typeof mainInfo.sex === 'string') &&
        (mainInfo.age === undefined ||
            typeof mainInfo.age === 'number' ||
            typeof mainInfo.age === 'string') &&
        (mainInfo.photo === undefined || typeof mainInfo.photo === 'string') &&
        typeof skills === 'string' &&
        Array.isArray(techStack) &&
        techStack.every(function (item) { return typeof item === 'string'; }) &&
        !!projects &&
        typeof projects['open source'] === 'number' &&
        typeof projects.startups === 'number' &&
        typeof projects.freelance === 'number' &&
        typeof projects.corporate === 'number' &&
        (!!otherInfo || typeof otherInfo === 'object') &&
        (skillsChart === undefined || isRecord(skillsChart)) &&
        !!stats &&
        (stats.wakatime === undefined || typeof stats.wakatime === 'number') &&
        isRecord(links));
}
function splitSkills(rawSkills) {
    return rawSkills
        .split('.')
        .map(function (part) { return part.trim(); })
        .filter(Boolean);
}
function normalizeRadarValue(value) {
    return value > 10 ? Math.round(value / 10) : value;
}
function parseAge(value) {
    if (typeof value === 'number') {
        return value;
    }
    if (typeof value === 'string') {
        var parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : undefined;
    }
    return undefined;
}
function pickChartValue(chart, key) {
    var value = chart === null || chart === void 0 ? void 0 : chart[key];
    if (typeof value === 'number') {
        return normalizeRadarValue(value);
    }
    return 6;
}
function mapProfileStatToProfileData(payload) {
    var _a, _b;
    return {
        mainInfo: {
            name: payload.mainInfo.name,
            position: payload.mainInfo.position,
            sex: payload.mainInfo.sex,
            age: parseAge(payload.mainInfo.age),
            avatar: (_a = payload.mainInfo.photo) !== null && _a !== void 0 ? _a : null
        },
        skills: splitSkills(payload.skills),
        wakatime: {
            text: ((_b = payload.stats.wakatime) !== null && _b !== void 0 ? _b : 0) + " hrs",
            url: 'https://wakatime.com'
        },
        social: {
            linkedin: typeof payload.links.linkedin === 'string'
                ? payload.links.linkedin
                : '#',
            github: typeof payload.links.github === 'string'
                ? payload.links.github
                : '#'
        },
        projects: {
            openSource: payload.projects['open source'],
            startups: payload.projects.startups,
            freelance: payload.projects.freelance,
            corporate: payload.projects.corporate
        },
        radar: {
            labels: [
                'Architecture',
                'Coding',
                'Speed',
                'Rhythm',
                'Soft skills',
            ],
            values: [
                pickChartValue(payload.otherInfo.skillsChart, 'architecture'),
                pickChartValue(payload.otherInfo.skillsChart, 'coding'),
                pickChartValue(payload.otherInfo.skillsChart, 'performance'),
                pickChartValue(payload.otherInfo.skillsChart, 'consistency'),
                pickChartValue(payload.otherInfo.skillsChart, 'communication'),
            ]
        },
        techStack: payload.techStack.map(function (name) { return ({
            name: name,
            icon: '',
            url: '#'
        }); })
    };
}
function buildGithubHeaders() {
    var token = process.env.GITHUB_TOKEN;
    if (!token) {
        return {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
        };
    }
    return {
        Authorization: "Bearer " + token,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
    };
}
function pickProfileFiles(gists) {
    var selected = new Map();
    for (var _i = 0, gists_1 = gists; _i < gists_1.length; _i++) {
        var gist = gists_1[_i];
        var isStatGist = gist.description
            .toLowerCase()
            .includes(STAT_GIST_KEYWORD);
        for (var _a = 0, _b = gist.files; _a < _b.length; _a++) {
            var file = _b[_a];
            var name = file.name.toLowerCase();
            var isJson = name.endsWith('.json');
            var isStatFile = name.includes(STAT_GIST_KEYWORD);
            if (isJson || isStatFile || isStatGist) {
                selected.set(file.rawUrl, { rawUrl: file.rawUrl });
            }
        }
    }
    return Array.from(selected.values());
}
function loadProfileFromRawUrl(rawUrl) {
    return __awaiter(this, void 0, Promise, function () {
        var profileResponse, payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(rawUrl, {
                        cache: 'no-store',
                        headers: buildGithubHeaders()
                    })
                    // console.log(1)
                    // console.log('profileResponse:', profileResponse)
                ];
                case 1:
                    profileResponse = _a.sent();
                    // console.log(1)
                    // console.log('profileResponse:', profileResponse)
                    if (!profileResponse.ok) {
                        return [2 /*return*/, null];
                    }
                    return [4 /*yield*/, profileResponse.json()];
                case 2:
                    payload = _a.sent();
                    if (!isProfileStatGistPayload(payload)) {
                        return [2 /*return*/, null];
                    }
                    // console.log('Loaded profile payload:', payload)
                    return [2 /*return*/, mapProfileStatToProfileData(payload)];
            }
        });
    });
}
function fetchProfileCardsFromGists() {
    return __awaiter(this, void 0, Promise, function () {
        var gists, files, loaded, cards, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, githubApi_1.fetchGithubGists()];
                case 1:
                    gists = _a.sent();
                    files = pickProfileFiles(gists);
                    if (files.length === 0) {
                        return [2 /*return*/, {
                                data: [],
                                source: 'local',
                                reason: 'No profile files found in gists.'
                            }];
                    }
                    return [4 /*yield*/, Promise.all(files.map(function (file) { return loadProfileFromRawUrl(file.rawUrl); }))];
                case 2:
                    loaded = _a.sent();
                    cards = loaded.filter(function (item) { return item !== null; });
                    if (cards.length === 0) {
                        return [2 /*return*/, {
                                data: [],
                                source: 'local',
                                reason: 'No valid profile JSON files were found in gists.'
                            }];
                    }
                    return [2 /*return*/, {
                            data: cards,
                            source: 'gist'
                        }];
                case 3:
                    error_1 = _a.sent();
                    return [2 /*return*/, {
                            data: [],
                            source: 'local',
                            reason: error_1 instanceof Error
                                ? error_1.message
                                : 'Unknown profile gists error.'
                        }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.fetchProfileCardsFromGists = fetchProfileCardsFromGists;

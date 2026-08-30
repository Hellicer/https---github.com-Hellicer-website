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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.fetchGithubGists = exports.fetchGithubProjects = void 0;
var projectPreview_1 = require("@/lib/projectPreview");
require("server-only");
function isGithubRepo(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    var repo = value;
    var owner = repo.owner;
    return (typeof repo.id === 'number' &&
        typeof repo.name === 'string' &&
        (repo.description === null || typeof repo.description === 'string') &&
        (repo.language === null || typeof repo.language === 'string') &&
        typeof repo.archived === 'boolean' &&
        (repo.topics === undefined ||
            (Array.isArray(repo.topics) &&
                repo.topics.every(function (topic) { return typeof topic === 'string'; }))) &&
        (repo.homepage === null || typeof repo.homepage === 'string') &&
        typeof repo.html_url === 'string' &&
        typeof repo.default_branch === 'string' &&
        !!owner &&
        typeof owner.login === 'string');
}
function parseGithubRepos(payload) {
    if (!Array.isArray(payload) || !payload.every(isGithubRepo)) {
        throw new Error('GitHub API returned an unexpected response shape.');
    }
    return payload;
}
function isGistFile(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    var file = value;
    return ((file.filename === null || typeof file.filename === 'string') &&
        (file.type === null || typeof file.type === 'string') &&
        (file.language === null || typeof file.language === 'string') &&
        typeof file.raw_url === 'string' &&
        typeof file.size === 'number');
}
function isGithubGist(value) {
    if (!value || typeof value !== 'object') {
        return false;
    }
    var gist = value;
    var files = gist.files;
    return (typeof gist.id === 'string' &&
        (gist.description === null || typeof gist.description === 'string') &&
        typeof gist.html_url === 'string' &&
        typeof gist.public === 'boolean' &&
        typeof gist.created_at === 'string' &&
        typeof gist.updated_at === 'string' &&
        !!files &&
        Object.values(files).every(isGistFile));
}
function parseGithubGists(payload) {
    if (!Array.isArray(payload) || !payload.every(isGithubGist)) {
        throw new Error('GitHub Gists API returned an unexpected response shape.');
    }
    return payload;
}
function mapGithubRepoToProject(repo) {
    var _a, _b, _c;
    var liveUrl = repo.homepage && repo.homepage.trim() ? repo.homepage : null;
    return {
        id: String(repo.id),
        title: repo.name,
        description: (_a = repo.description) !== null && _a !== void 0 ? _a : 'No description provided.',
        status: repo.archived ? 'archived' : 'online',
        stack: 'fullstack',
        tech: __spreadArrays([repo.language], ((_b = repo.topics) !== null && _b !== void 0 ? _b : [])).filter(function (value) { return Boolean(value); })
            .slice(0, 5),
        liveUrl: liveUrl,
        codeUrl: (_c = repo.html_url) !== null && _c !== void 0 ? _c : null,
        previewUrl: projectPreview_1.buildGithubPreviewUrl({
            owner: repo.owner.login,
            repository: repo.name,
            branch: repo.default_branch
        })
    };
}
function fetchGithubProjects() {
    return __awaiter(this, void 0, Promise, function () {
        var username, token, response, details, payload, repos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = process.env.GITHUB_USERNAME;
                    token = process.env.GITHUB_TOKEN;
                    if (!username || !token) {
                        throw new Error('Missing GITHUB_USERNAME or GITHUB_TOKEN in environment.');
                    }
                    return [4 /*yield*/, fetch("https://api.github.com/users/" + username + "/repos?sort=updated&per_page=100", {
                            headers: {
                                Authorization: "Bearer " + token,
                                Accept: 'application/vnd.github+json',
                                'X-GitHub-Api-Version': '2022-11-28'
                            },
                            cache: 'no-store'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    details = _a.sent();
                    throw new Error("Failed to fetch repositories from GitHub API (" + response.status + "): " + details);
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    payload = _a.sent();
                    repos = parseGithubRepos(payload);
                    console.log(222, repos, payload);
                    return [2 /*return*/, repos.map(mapGithubRepoToProject)];
            }
        });
    });
}
exports.fetchGithubProjects = fetchGithubProjects;
function mapGithubGistToDto(gist) {
    var _a;
    return {
        id: gist.id,
        description: ((_a = gist.description) === null || _a === void 0 ? void 0 : _a.trim()) || 'No description provided.',
        url: gist.html_url,
        isPublic: gist.public,
        createdAt: gist.created_at,
        updatedAt: gist.updated_at,
        files: Object.entries(gist.files).map(function (_a) {
            var _b;
            var fallbackName = _a[0], file = _a[1];
            return ({
                name: (_b = file.filename) !== null && _b !== void 0 ? _b : fallbackName,
                language: file.language,
                type: file.type,
                size: file.size,
                rawUrl: file.raw_url
            });
        })
    };
}
function fetchGithubGists() {
    return __awaiter(this, void 0, Promise, function () {
        var username, token, response, details, payload, gists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = process.env.GITHUB_USERNAME;
                    token = process.env.GITHUB_TOKEN;
                    if (!username || !token) {
                        throw new Error('Missing GITHUB_USERNAME or GITHUB_TOKEN in environment.');
                    }
                    return [4 /*yield*/, fetch("https://api.github.com/users/" + username + "/gists?per_page=100", {
                            headers: {
                                Authorization: "Bearer " + token,
                                Accept: 'application/vnd.github+json',
                                'X-GitHub-Api-Version': '2022-11-28'
                            },
                            cache: 'no-store'
                        })];
                case 1:
                    response = _a.sent();
                    if (!!response.ok) return [3 /*break*/, 3];
                    return [4 /*yield*/, response.text()];
                case 2:
                    details = _a.sent();
                    throw new Error("Failed to fetch gists from GitHub API (" + response.status + "): " + details);
                case 3: return [4 /*yield*/, response.json()];
                case 4:
                    payload = _a.sent();
                    gists = parseGithubGists(payload);
                    return [2 /*return*/, gists.map(mapGithubGistToDto)];
            }
        });
    });
}
exports.fetchGithubGists = fetchGithubGists;

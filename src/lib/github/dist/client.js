"use strict";
// src/lib/github/client.ts
exports.__esModule = true;
exports.github = void 0;
var octokit_1 = require("octokit");
exports.github = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN
});

"use strict";
exports.__esModule = true;
exports.github = exports.createClient = void 0;
var ssr_1 = require("@supabase/ssr");
function createClient() {
    return ssr_1.createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}
exports.createClient = createClient;
// src/lib/github/client.ts
var octokit_1 = require("octokit");
exports.github = new octokit_1.Octokit({
    auth: process.env.GITHUB_TOKEN
});

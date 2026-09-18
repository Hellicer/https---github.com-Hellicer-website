// src/lib/github/client.ts

import { Octokit } from 'octokit'

export const github = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

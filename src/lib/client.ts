import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    )
}

// src/lib/github/client.ts

import { Octokit } from 'octokit'

export const github = new Octokit({
    auth: process.env.GITHUB_TOKEN,
})

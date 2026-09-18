// src/lib/github/repositories.ts

import { TRepositories } from '@/types/repositories'
import { github } from './client'

let cachedRepositories: TRepositories[] = {} as TRepositories[]

export async function getPublicRepositories(username: string) {
    const { data } = await github.rest.repos.listForUser({
        username,
        type: 'all',
        per_page: 100,
    })

    return data
}

export async function getRepositoriesData(username: string) {
    const repos = await getPublicRepositories(username)
    return repos.map(repo => ({
        id: repo.id,
        name: repo.name,
        topic: repo.topics,
        created_at: repo.created_at,
        description: repo.description,
        website: repo.homepage,
        github: repo.html_url,
        owner: repo.owner.login,
    })) as TRepositories[]
}

export async function getRepositoryPreview(owner: string, repo: string) {
    try {
        const { data } = await github.rest.repos.getContent({
            owner,
            repo,
            path: '.github/preview.webp',
        })

        if (Array.isArray(data) || data.type !== 'file') {
            return null
        }

        return data.download_url
    } catch {
        return null
    }
}

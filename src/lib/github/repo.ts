// src/lib/github/repositories.ts


import { github } from './client'

// let cachedRepositories: TRepositories[] = {} as TRepositories[]

export async function getPublicRepositories(username: string) {
    const { data } = await github.rest.repos.listForUser({
        username,
        type: 'all',
        per_page: 100,
    })

    return data
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
        console.log('data.download_url', data.download_url)
        return data.download_url
    } catch {
        return null
    }
}

export async function getRepositoriesData(username: string) {
    const repos = await getPublicRepositories(username)

    return Promise.all(
        repos
            .filter(repo => repo.topics?.includes('portfolio'))
            .map(async repo => ({
                id: repo.id,
                name: repo.name,
                topics: repo.topics,
                created_at: repo.created_at,
                description: repo.description,
                website: repo.homepage,
                github: repo.html_url,
                owner: repo.owner.login,
                archived: repo.archived,
                preview: await getRepositoryPreview(
                    repo.owner.login,
                    repo.name,
                ),
            })),
    )
}

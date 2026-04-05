import 'server-only'
import { GistDto, GithubGist, GithubRepo, ProjectDto } from '@/types/github'
import { buildGithubPreviewUrl } from '@/lib/projectPreview'

function isGithubRepo(value: unknown): value is GithubRepo {
    if (!value || typeof value !== 'object') {
        return false
    }

    const repo = value as Record<string, unknown>
    const owner = repo.owner as Record<string, unknown> | undefined

    return (
        typeof repo.id === 'number' &&
        typeof repo.name === 'string' &&
        (repo.description === null || typeof repo.description === 'string') &&
        (repo.language === null || typeof repo.language === 'string') &&
        typeof repo.archived === 'boolean' &&
        (repo.topics === undefined ||
            (Array.isArray(repo.topics) &&
                repo.topics.every(topic => typeof topic === 'string'))) &&
        (repo.homepage === null || typeof repo.homepage === 'string') &&
        typeof repo.html_url === 'string' &&
        typeof repo.default_branch === 'string' &&
        !!owner &&
        typeof owner.login === 'string'
    )
}

function parseGithubRepos(payload: unknown): GithubRepo[] {
    if (!Array.isArray(payload) || !payload.every(isGithubRepo)) {
        throw new Error('GitHub API returned an unexpected response shape.')
    }

    return payload
}

function isGistFile(value: unknown): boolean {
    if (!value || typeof value !== 'object') {
        return false
    }

    const file = value as Record<string, unknown>

    return (
        (file.filename === null || typeof file.filename === 'string') &&
        (file.type === null || typeof file.type === 'string') &&
        (file.language === null || typeof file.language === 'string') &&
        typeof file.raw_url === 'string' &&
        typeof file.size === 'number'
    )
}

function isGithubGist(value: unknown): value is GithubGist {
    if (!value || typeof value !== 'object') {
        return false
    }

    const gist = value as Record<string, unknown>
    const files = gist.files as Record<string, unknown> | undefined

    return (
        typeof gist.id === 'string' &&
        (gist.description === null || typeof gist.description === 'string') &&
        typeof gist.html_url === 'string' &&
        typeof gist.public === 'boolean' &&
        typeof gist.created_at === 'string' &&
        typeof gist.updated_at === 'string' &&
        !!files &&
        Object.values(files).every(isGistFile)
    )
}

function parseGithubGists(payload: unknown): GithubGist[] {
    if (!Array.isArray(payload) || !payload.every(isGithubGist)) {
        throw new Error('GitHub Gists API returned an unexpected response shape.')
    }

    return payload
}

function mapGithubRepoToProject(repo: GithubRepo): ProjectDto {
    const liveUrl = repo.homepage && repo.homepage.trim() ? repo.homepage : null

    return {
        id: String(repo.id),
        title: repo.name,
        description: repo.description ?? 'No description provided.',
        status: repo.archived ? 'archived' : 'online',
        stack: 'fullstack',
        tech: [repo.language, ...(repo.topics ?? [])]
            .filter((value): value is string => Boolean(value))
            .slice(0, 5),
        liveUrl,
        codeUrl: repo.html_url ?? null,
        previewUrl: buildGithubPreviewUrl({
            owner: repo.owner.login,
            repository: repo.name,
            branch: repo.default_branch,
        }),
    }
}

export async function fetchGithubProjects(): Promise<ProjectDto[]> {
    const username = process.env.GITHUB_USERNAME
    const token = process.env.GITHUB_TOKEN

    if (!username || !token) {
        throw new Error(
            'Missing GITHUB_USERNAME or GITHUB_TOKEN in environment.',
        )
    }

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
            },
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        const details = await response.text()
        throw new Error(
            `Failed to fetch repositories from GitHub API (${response.status}): ${details}`,
        )
    }

    const payload: unknown = await response.json()
    const repos = parseGithubRepos(payload)

    return repos.map(mapGithubRepoToProject)
}

function mapGithubGistToDto(gist: GithubGist): GistDto {
    return {
        id: gist.id,
        description: gist.description?.trim() || 'No description provided.',
        url: gist.html_url,
        isPublic: gist.public,
        createdAt: gist.created_at,
        updatedAt: gist.updated_at,
        files: Object.entries(gist.files).map(([fallbackName, file]) => ({
            name: file.filename ?? fallbackName,
            language: file.language,
            type: file.type,
            size: file.size,
            rawUrl: file.raw_url,
        })),
    }
}

export async function fetchGithubGists(): Promise<GistDto[]> {
    const username = process.env.GITHUB_USERNAME
    const token = process.env.GITHUB_TOKEN

    if (!username || !token) {
        throw new Error(
            'Missing GITHUB_USERNAME or GITHUB_TOKEN in environment.',
        )
    }

    const response = await fetch(
        `https://api.github.com/users/${username}/gists?per_page=100`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/vnd.github+json',
                'X-GitHub-Api-Version': '2022-11-28',
            },
            cache: 'no-store',
        },
    )

    if (!response.ok) {
        const details = await response.text()
        throw new Error(
            `Failed to fetch gists from GitHub API (${response.status}): ${details}`,
        )
    }

    const payload: unknown = await response.json()
    const gists = parseGithubGists(payload)

    return gists.map(mapGithubGistToDto)
}

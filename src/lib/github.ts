import 'server-only'
import { GithubRepo, ProjectDto } from '@/types/github'
import { prisma } from '@/lib/prisma'
import { buildGithubPreviewUrl } from '@/lib/projectPreview'

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

function mapDbProjectToProjectDto(project: {
    githubId: number
    title: string
    description: string
    status: ProjectDto['status']
    stack: ProjectDto['stack']
    tech: string[]
    liveUrl: string | null
    codeUrl: string | null
    previewUrl: string | null
}): ProjectDto {
    return {
        id: String(project.githubId),
        title: project.title,
        description: project.description,
        status: project.status,
        stack: project.stack,
        tech: project.tech,
        liveUrl: project.liveUrl,
        codeUrl: project.codeUrl,
        previewUrl: project.previewUrl,
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

    const repos = (await response.json()) as GithubRepo[]

    return repos.map(mapGithubRepoToProject)
}

export async function syncGithubProjectsToDb(): Promise<void> {
    const projects = await fetchGithubProjects()

    await prisma.$transaction(async tx => {
        await tx.githubProject.deleteMany()

        if (projects.length === 0) {
            return
        }

        await tx.githubProject.createMany({
            data: projects.map(project => ({
                githubId: Number(project.id),
                title: project.title,
                description: project.description,
                status: project.status,
                stack: project.stack,
                tech: project.tech,
                liveUrl: project.liveUrl,
                codeUrl: project.codeUrl,
                previewUrl: project.previewUrl,
            })),
        })
    })
}

export async function getGithubProjectsFromDb(): Promise<ProjectDto[]> {
    const rows = await prisma.githubProject.findMany({
        orderBy: { updatedAt: 'desc' },
    })

    return rows.map(mapDbProjectToProjectDto)
}

import { fetchGithubProjects } from '@/api/githubApi'
import { getPrismaClient } from '@/lib/prisma'
import { ProjectDto } from '@/types/github'
import { Prisma } from '@prisma/client'
import 'server-only'

type GithubProjectRow = Prisma.GithubProjectGetPayload<Record<string, never>>

const GITHUB_PROJECTS_SYNC_TTL_MS = 86400000 //     24 hours in milliseconds

function mapDbProjectToProjectDto(project: GithubProjectRow): ProjectDto {
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

export async function shouldSyncGithubProjects(): Promise<boolean> {
    const prisma = getPrismaClient()

    const totalProjects = await prisma.githubProject.count()
    if (totalProjects === 0) {
        return true
    }

    const latestProject = await prisma.githubProject.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true },
    })

    console.log(
        'Latest project updated at:',
        latestProject?.updatedAt,
        latestProject,
    )
    if (!latestProject) {
        return true
    }

    const staleByMs = Date.now() - latestProject.updatedAt.getTime()

    return staleByMs > GITHUB_PROJECTS_SYNC_TTL_MS
}

export async function syncGithubProjectsToDb(): Promise<void> {
    const prisma = getPrismaClient()
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

export async function syncGithubProjectsIfNeeded(): Promise<void> {
    const shouldSync = await shouldSyncGithubProjects()

    if (shouldSync) {
        await syncGithubProjectsToDb()
    }
}

export async function getGithubProjectsFromDb(): Promise<ProjectDto[]> {
    // console.log('Fetching projects from DB...')
    const prisma = getPrismaClient()

    const rows = await prisma.githubProject.findMany({
        orderBy: { updatedAt: 'desc' },
    })
    console.log(prisma)
    console.log('Fetched projects from DB:', rows.length)
    return rows.map(mapDbProjectToProjectDto)
}

import { fetchGithubProjects } from '@/api/githubApi'
import { getPrismaClient } from '@/lib/prisma'
import { ProjectDto } from '@/types/github'
import { Prisma } from '@prisma/client'
import 'server-only'

type GithubProjectRow = Prisma.GithubProjectGetPayload<Record<string, never>>

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

export async function getGithubProjectsFromDb(): Promise<ProjectDto[]> {
    // console.log('Fetching projects from DB...')
    const prisma = getPrismaClient()

  

    const rows = await prisma.githubProject.findMany({
        orderBy: { updatedAt: 'desc' },
    })
    // console.log(prisma)
    // console.log('Fetched projects from DB:', rows)
    return rows.map(mapDbProjectToProjectDto)
}

import { Suspense } from 'react'
import { getRepositoriesData } from '@/lib/github/repo'
import ProjectsSkeleton from '@/components/ui/Project/ProjectSkeleton'
import ProjectContentBlock from '@/components/ui/Project/ProjectContentBlock'

export default async function ProjectsSection() {
    const projects = await getRepositoriesData('Hellicer')

    return (
        <Suspense fallback={<ProjectsSkeleton />}>
            <ProjectContentBlock initialProjects={projects} />
            <ProjectsSkeleton />
        </Suspense>
    )
}

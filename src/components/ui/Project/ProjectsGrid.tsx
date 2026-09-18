import { Project } from '@/data/projects.data'
import { FiltersState } from '@/interfaces/props'

import { NoFoundProjectsBlock } from './NoFoundProjectsBlock'
import ProjectCard from './ProjectCard'

function ProjectsGrid({
    filters,
    projects,
}: {
    filters: FiltersState
    projects: Project[]
}) {
    const filteredProjects = projects.filter(project =>
        filters.topics.every(topic => project.topics?.includes(topic)),
    )

    return (
        <div className="grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8">
            {filteredProjects.map(project => (
                <div className="h-full project-grid-item" key={project.id}>
                    <ProjectCard project={project} />
                </div>
            ))}

            {filteredProjects.length === 0 && (
                <div className="col-span-full no-found-fade-in">
                    <NoFoundProjectsBlock />
                </div>
            )}
        </div>
    )
}
export { ProjectsGrid }

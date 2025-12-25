import { FiltersState } from '@/interfaces/props'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects.data'

function ProjectsGrid({ filters }: { filters: FiltersState }) {
    const filteredProjects = projects.filter(project => {
        if (filters.stack && project.stack !== filters.stack) return false
        if (filters.status && project.status !== filters.status) return false

        if (
            filters.tech.length > 0 &&
            !filters.tech.every(t => project.tech.includes(t))
        ) {
            return false
        }

        return true
    })
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
export { ProjectsGrid }

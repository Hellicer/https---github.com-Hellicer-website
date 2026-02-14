import { FiltersState } from '@/interfaces/props'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects.data'
import { PacmanText } from './PacmanText'

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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[404px]">
            {filteredProjects.length == 0 && (
                // <div className=" rounded-2xl p-12 text-center max-w-xl w-full">
                //     {/* Pixel icon */}
                //     <div className="text-5xl mb-6">👾</div>

                //     <h2 className="text-2xl font-bold tracking-wider mb-4 text-red-500">
                //         NO PROJECTS FOUND
                //     </h2>

                //     <p className="opacity-70 mb-4">
                //         No matches for selected filters.
                //     </p>
                // </div>
                <PacmanText />
            )}

            {filteredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    )
}
export { ProjectsGrid }

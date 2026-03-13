import { useEffect, useMemo, useRef, useState } from 'react'
import { FiltersState } from '@/interfaces/props'
import ProjectCard from './ProjectCard'
import { projects } from '@/data/projects.data'
import { NoFoundProjectsBlock } from './NoFoundProjectsBlock'

function ProjectsGrid({ filters }: { filters: FiltersState }) {
    const EXIT_DURATION_MS = 260
    const techFilterKey = filters.tech.join('|')
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
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
    }, [filters.stack, filters.status, techFilterKey])
    const filteredProjectsKey = filteredProjects.map(project => project.id).join('|')

    const [displayedProjects, setDisplayedProjects] = useState(filteredProjects)
    const [isExiting, setIsExiting] = useState(false)
    const [showNoFound, setShowNoFound] = useState(filteredProjects.length === 0)
    const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const displayedProjectsKey = displayedProjects
        .map(project => project.id)
        .join('|')

    useEffect(() => {
        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current)
            exitTimeoutRef.current = null
        }

        if (filteredProjectsKey === displayedProjectsKey) {
            setShowNoFound(filteredProjects.length === 0)
            setIsExiting(false)
            return
        }

        setIsExiting(true)
        setShowNoFound(false)
        exitTimeoutRef.current = setTimeout(() => {
            setDisplayedProjects(filteredProjects)
            setIsExiting(false)
            setShowNoFound(filteredProjects.length === 0)
        }, EXIT_DURATION_MS)
    }, [
        displayedProjectsKey,
        filteredProjects,
        filteredProjectsKey,
        filteredProjects.length,
    ])

    useEffect(() => {
        return () => {
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div className="grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8">
            {displayedProjects.map(project => (
                <div
                    className={`h-full project-grid-item ${
                        isExiting ? 'project-grid-item-exit' : ''
                    }`}
                    key={project.id}
                >
                    <ProjectCard project={project} />
                </div>
            ))}

            {showNoFound && (
                <div className="col-span-full no-found-fade-in">
                    <NoFoundProjectsBlock />
                </div>
            )}
        </div>
    )
}
export { ProjectsGrid }

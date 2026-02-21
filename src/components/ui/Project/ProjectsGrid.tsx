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

    const [displayedProjects, setDisplayedProjects] = useState(filteredProjects)
    const [isExiting, setIsExiting] = useState(false)
    const [showNoFound, setShowNoFound] = useState(filteredProjects.length === 0)
    const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        if (exitTimeoutRef.current) {
            clearTimeout(exitTimeoutRef.current)
            exitTimeoutRef.current = null
        }

        if (filteredProjects.length === 0) {
            if (displayedProjects.length === 0) {
                setShowNoFound(true)
                setIsExiting(false)
                return
            }

            setIsExiting(true)
            setShowNoFound(false)
            exitTimeoutRef.current = setTimeout(() => {
                setDisplayedProjects([])
                setIsExiting(false)
                setShowNoFound(true)
            }, EXIT_DURATION_MS)
            return
        }

        setShowNoFound(false)
        setIsExiting(false)
        setDisplayedProjects(filteredProjects)
    }, [filteredProjects, displayedProjects.length])

    useEffect(() => {
        return () => {
            if (exitTimeoutRef.current) {
                clearTimeout(exitTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-h-[404px]">
            {displayedProjects.map(project => (
                <div
                    className={`h-[404px] project-grid-item ${
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

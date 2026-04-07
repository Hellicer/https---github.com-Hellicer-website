'use client'

import { ProjectsFilters } from '@/components/ui/Project/ProjectsFilters'
import { ProjectsGrid } from '@/components/ui/Project/ProjectsGrid'
import { FiltersState } from '@/interfaces/props'
import { Project, projects } from '@/data/projects.data'
import { useEffect, useMemo, useState } from 'react'
import SpecTypeToggle from '../SpecTypeToggle/SpecTypeToggle'
import { useTranslations } from 'next-intl'
import { RotateCcw } from 'lucide-react'

export default function ProjectContentBlock() {
    const t = useTranslations('')
    const [activeProjects, setActiveProjects] = useState<Project[]>(projects)
    const [filters, setFilters] = useState<FiltersState>({
        stack: null,
        status: null,
        tech: [],
    })

    useEffect(() => {
        let isMounted = true

        const loadGithubProjects = async () => {
            try {
                const response = await fetch('/api/github/repos')
                if (!response.ok) return

                const data = (await response.json()) as Project[]
                if (isMounted && Array.isArray(data) && data.length > 0) {
                    setActiveProjects(data)
                }
            } catch {
                // Keep local fallback projects if request fails.
            }
        }

        loadGithubProjects()

        return () => {
            isMounted = false
        }
    }, [])

    const filterOptions = useMemo(() => {
        const stacks = Array.from(new Set(activeProjects.map(p => p.stack)))
        const statuses = Array.from(new Set(activeProjects.map(p => p.status)))
        const tech = Array.from(
            new Set(activeProjects.flatMap(p => p.tech)),
        ).sort((a, b) => a.localeCompare(b))

        return { stacks, statuses, tech }
    }, [activeProjects])

    useEffect(() => {
        setFilters(prev => {
            const validStacks = new Set(filterOptions.stacks)
            const validStatuses = new Set(filterOptions.statuses)
            const validTech = new Set(filterOptions.tech)

            const nextStack =
                prev.stack && validStacks.has(prev.stack) ? prev.stack : null
            const nextStatus =
                prev.status && validStatuses.has(prev.status)
                    ? prev.status
                    : null
            const nextTech = prev.tech.filter(item => validTech.has(item))

            if (
                nextStack === prev.stack &&
                nextStatus === prev.status &&
                nextTech.length === prev.tech.length
            ) {
                return prev
            }

            return {
                stack: nextStack,
                status: nextStatus,
                tech: nextTech,
            }
        })
    }, [filterOptions])

    return (
        <section className="w-full min-h-200">
            <div className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold ">
                <h1>{t('project.title')}</h1>
                {/* <SpecTypeToggle /> */}
            </div>

            <div className="px-5 mt-16 mb-16 flex items-center justify-between">
                <ProjectsFilters
                    filters={filters}
                    setFilters={setFilters}
                    options={filterOptions}
                />
                <button
                    title={t('common.resetFilter')}
                    onClick={() =>
                        setFilters({ stack: null, status: null, tech: [] })
                    }
                    className="text-xs mx-6 text-gray-400 underline hover:text-white"
                >
                    {/* {t('common.resetFilter')} */}
                    <RotateCcw className="h-4 w-4 cursor-pointer" />
                </button>
            </div>
            <div className="px-5">
                <ProjectsGrid filters={filters} projects={activeProjects} />
            </div>
        </section>
    )
}

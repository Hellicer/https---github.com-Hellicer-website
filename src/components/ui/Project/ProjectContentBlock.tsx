'use client'

import { ProjectsFilters } from '@/components/ui/Project/ProjectsFilters'
import { ProjectsGrid } from '@/components/ui/Project/ProjectsGrid'
import ProjectsSkeleton from '@/components/ui/Project/ProjectSkeleton'
import { projects } from '@/data/projects.data'
import { FiltersState } from '@/interfaces/props'
import { TRepositories } from '@/types/repositories'
import { RotateCcw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Suspense, useEffect, useMemo, useState } from 'react'

export default function ProjectContentBlock({
    initialProjects = projects,
}: {
    initialProjects?: TRepositories[]
}) {
    const t = useTranslations('')
    const [activeProjects] = useState<TRepositories[]>(initialProjects)
    const [filters, setFilters] = useState<FiltersState>({
        topics: [],
    })

    const filterOptions = useMemo(() => {
        const topics = Array.from(
            new Set(activeProjects.flatMap(p => p.topics ?? [])),
        ).sort((a, b) => a.localeCompare(b))

        return { topics }
    }, [activeProjects])

    useEffect(() => {
        setFilters(prev => {
            const validTopics = new Set(filterOptions.topics)
            const nextTopics = prev.topics.filter(item => validTopics.has(item))

            if (nextTopics.length === prev.topics.length) {
                return prev
            }

            return {
                topics: nextTopics,
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
                    onClick={() => setFilters({ topics: [] })}
                    className="text-xs mx-6 text-gray-400 underline hover:text-white"
                >
                    <RotateCcw className="h-4 w-4 cursor-pointer" />
                </button>
            </div>
            <div className="px-5">
                <Suspense fallback={<ProjectsSkeleton />}>
                    <ProjectsGrid filters={filters} projects={activeProjects} />
                </Suspense>
            </div>
        </section>
    )
}

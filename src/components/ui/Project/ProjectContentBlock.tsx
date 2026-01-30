'use client'

import { ProjectsFilters } from '@/components/ui/Project/ProjectsFilters'
import { ProjectsGrid } from '@/components/ui/Project/ProjectsGrid'
import { FiltersState } from '@/interfaces/props'
import { useState } from 'react'
import SpecTypeToggle from '../SpecTypeToggle/SpecTypeToggle'
import { useTranslations } from 'next-intl'
import { RotateCcw } from 'lucide-react'

export default function ProjectContentBlock() {
    const t = useTranslations('')
    const [filters, setFilters] = useState<FiltersState>({
        stack: null,
        status: null,
        tech: [],
    })
    return (
        <section className="w-full">
            <div className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold ">
                <h1>Projects</h1>
                <SpecTypeToggle />
            </div>

            <div className="mt-16 mb-16 flex items-center justify-between">
                <ProjectsFilters filters={filters} setFilters={setFilters} />
                <button
                    title={t('common.resetFilter')}
                    onClick={() =>
                        setFilters({ stack: null, status: null, tech: [] })
                    }
                    className="text-xs mx-6 text-gray-400 underline hover:text-white"
                >
                    {/* {t('common.resetFilter')} */}
                    <RotateCcw className="h-4 w-4" />
                </button>
            </div>
            <ProjectsGrid filters={filters} />
        </section>
    )
}

import { FiltersState } from '@/interfaces/props'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Button } from '../button'

function ProjectsFilters({
    filters,
    setFilters,
}: {
    filters: FiltersState
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}) {
    const toggleTech = (tech: string) => {
        setFilters(prev => ({
            ...prev,
            tech: prev.tech.includes(tech)
                ? prev.tech.filter(t => t !== tech)
                : [...prev.tech, tech],
        }))
    }

    return (
        <div className="flex flex-wrap gap-6">
            <FilterRow
                title="Stack"
                items={['frontend', 'backend', 'fullstack']}
                active={filters.stack}
                onClick={value =>
                    setFilters(f => ({
                        ...f,
                        stack: f.stack === value ? null : value,
                    }))
                }
            />

            <FilterRow
                title="Status"
                items={['online', 'beta', 'archived']}
                active={filters.status}
                onClick={value =>
                    setFilters(f => ({
                        ...f,
                        status: f.status === value ? null : value,
                    }))
                }
            />

            <FilterRow
                title="Tech"
                items={[
                    'Next.js',
                    'React',
                    'Typescript',
                    'Firebase',
                    'Node.js',
                ]}
                multiple
                activeList={filters.tech}
                onClick={toggleTech}
            />
        </div>
    )
}

function FilterRow({
    title,
    items,
    onClick,
    active,
    activeList = [],
    multiple = false,
}: {
    title: string
    items: string[]
    onClick: (value: string) => void
    active?: string | null
    activeList?: string[]
    multiple?: boolean
}) {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm uppercase tracking-wider text-gray-400">
                {title}
            </span>

            {items.map(item => {
                const isActive = multiple
                    ? activeList.includes(item)
                    : active === item

                return (
                    <Button
                        variant="secondary"
                        asChild
                        size="default"
                        key={item}
                        onClick={() => onClick(item)}
                        className={`font-inter cursor-pointer p-0 h-9 px-4 py-1.5 rounded-md text-xs
                            ${isActive ? 'bg-secondary ' : ''}`}
                    >
                        <span className="capitalize">{item}</span>
                    </Button>
                )
            })}
        </div>
    )
}

export { ProjectsFilters }

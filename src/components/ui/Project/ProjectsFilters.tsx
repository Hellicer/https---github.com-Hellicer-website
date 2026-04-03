import { FiltersState } from '@/interfaces/props'
import { ProjectStack, ProjectStatus } from '@/types/github'
import { Button } from '../button'

function ProjectsFilters({
    filters,
    setFilters,
    options,
}: {
    filters: FiltersState
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
    options: {
        stacks: ProjectStack[]
        statuses: ProjectStatus[]
        tech: string[]
    }
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
                items={options.stacks}
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
                items={options.statuses}
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
                items={options.tech}
                multiple
                activeList={filters.tech}
                onClick={toggleTech}
            />
        </div>
    )
}

function FilterRow<T extends string>({
    title,
    items,
    onClick,
    active,
    activeList = [],
    multiple = false,
}: {
    title: string
    items: T[]
    onClick: (value: T) => void
    active?: T | null
    activeList?: T[]
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

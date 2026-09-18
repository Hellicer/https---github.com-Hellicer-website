import { FiltersState } from '@/interfaces/props'

import { Button } from '../button'

function ProjectsFilters({
    filters,
    setFilters,
    options,
}: {
    filters: FiltersState
    setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
    options: {
        topics: string[]
    }
}) {
    const toggleTopic = (topic: string) => {
        setFilters(prev => ({
            topics: prev.topics.includes(topic)
                ? prev.topics.filter(item => item !== topic)
                : [...prev.topics, topic],
        }))
    }

    return (
        <div className="flex flex-wrap gap-6">
            <FilterRow
                title="Topics"
                items={options.topics}
                multiple
                activeList={filters.topics}
                onClick={toggleTopic}
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

export type ProjectStatus = 'online' | 'beta' | 'archived'
export type ProjectStack = 'frontend' | 'backend' | 'fullstack'

export type FiltersState = {
    stack: ProjectStack | null
    status: ProjectStatus | null
    tech: string[]
}

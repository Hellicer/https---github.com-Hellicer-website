export type ProjectStatus = 'online' | 'beta' | 'archived'
export type ProjectStack = 'frontend' | 'backend' | 'fullstack'

export type ProjectDto = {
    id: string
    title: string
    description: string
    status: ProjectStatus
    stack: ProjectStack
    tech: string[]
}

export type GithubRepo = {
    id: number
    name: string
    description: string | null
    language: string | null
    archived: boolean
    topics?: string[]
}

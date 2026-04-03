export type ProjectStatus = 'online' | 'beta' | 'archived'
export type ProjectStack = 'frontend' | 'backend' | 'fullstack'

export type ProjectDto = {
    id: string
    title: string
    description: string
    status: ProjectStatus
    stack: ProjectStack
    tech: string[]
    liveUrl: string | null
    codeUrl: string | null
    previewUrl: string | null
}

export type GithubRepo = {
    id: number
    name: string
    description: string | null
    language: string | null
    archived: boolean
    topics?: string[]
    homepage: string | null
    html_url: string
    default_branch: string
    owner: {
        login: string
    }
}

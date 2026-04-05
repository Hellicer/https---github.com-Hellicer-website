export type ProjectStatus = 'online' | 'beta' | 'archived'
export type ProjectStack = 'frontend' | 'backend' | 'fullstack'

export type FiltersState = {
    stack: ProjectStack | null
    status: ProjectStatus | null
    tech: string[]
}

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

export type GistFile = {
    filename: string | null
    type: string | null
    language: string | null
    raw_url: string
    size: number
}

export type GithubGist = {
    id: string
    description: string | null
    html_url: string
    public: boolean
    created_at: string
    updated_at: string
    files: Record<string, GistFile>
}

export type GistDto = {
    id: string
    description: string
    url: string
    isPublic: boolean
    createdAt: string
    updatedAt: string
    files: Array<{
        name: string
        language: string | null
        type: string | null
        size: number
        rawUrl: string
    }>
}

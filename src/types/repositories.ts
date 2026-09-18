export type TRepositories = {
    id: number
    name: string
    description?: string | null
    topics?: string[] | null
    owner: string
    created_at?: string | null
    website?: string | null
    github?: string | null
    preview?: string | null
    archived?: boolean
}

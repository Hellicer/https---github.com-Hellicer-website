export type ProfileDataShape = {
    mainInfo: {
        name: string
        position: string
        sex?: string
        age?: number
        avatar?: string | null
    }
    skills: string[]
    cvUrl?: string
    wakatime: {
        text: string
        url: string
    }
    social: {
        linkedin: string
        github: string
    }
    projects: {
        openSource: number
        startups: number
        freelance: number
        corporate: number
    }
    radar: {
        labels: string[]
        values: number[]
    }
    techStack: Array<{
        name: string
        icon: string
        url: string
    }>
}

export type ProfileLoadResult = {
    data: ProfileDataShape[]
    source: 'gist' | 'local'
    reason?: string
}

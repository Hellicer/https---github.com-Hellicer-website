type ProjectKeys = 'open source' | 'startups' | 'freelance' | 'corporate'
export type SkillKey =
    | 'architecture'
    | 'coding'
    | 'performance'
    | 'consistency'
    | 'communication'

export type TProfileStat = {
    mainInfo: {
        name: string
        position: string
        sex?: string
        age?: number | string
    }
    skills: string
    techStack: string[]
    projects: Record<ProjectKeys, number>
    otherInfo: {
        skillsChart?: Record<SkillKey, number>
    }
    stats: {
        wakatime?: number
    }
    links: {
        linkedin?: string
        github?: string
    }
}

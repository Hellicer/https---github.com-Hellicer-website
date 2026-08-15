// export type ProfileDataShape = {
//     mainInfo: {
//         name: string
//         position: string
//         sex?: string
//         age?: number
//         photo?: string | null
//     }
//     skills: string
//     cvUrl?: string
//     wakatime: {
//         text: string
//         url: string
//     }
//     links: {
//         linkedin: string
//         github: string
//     }
//     projects: {}
//     radar: {
//         labels: string[]
//         values: number[]
//     }
//     techStack: string[]
// }

export interface ProfileDataShape {
    mainInfo: MainInfo
    skills: string
    techStack: string[]
    projects: Projects
    otherInfo: OtherInfo
    stats: Stats
    links: Links
}

export interface MainInfo {
    name: string
    position: string
    sex: string
    age: number
    photo: string
}

export interface Projects {
    'open source': number
    startups: number
    freelance: number
    corporate: number
}

export interface OtherInfo {
    skillsChart: SkillsChart
}

export interface SkillsChart {
    architecture: number
    coding: number
    performance: number
    consistency: number
    communication: number
}

export interface Stats {
    wakatime: string
}

export interface Links {
    linkedin: string
    github: string
}

export type ProfileLoadResult = {
    data: ProfileDataShape[]
    source: 'gist' | 'local'
    reason?: string
}

export type ProfileSubmissionPayload = {
    mainInfo: {
        name: string
        position: string
        sex: string
        age?: number
    }
    skills: string[]
    techStack: string[]
}

export type ProfileSubmissionResult = {
    ok: true
    submissionId: string
    photoUrl: string | null
    cvUrl: string | null
    gistId: string
    gistUrl: string
    createdAt: string
}

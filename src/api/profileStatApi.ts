import 'server-only'
import { fetchGithubGists } from '@/api/githubApi'
import type { ProfileDataShape, ProfileLoadResult } from '@/types/profile'

const STAT_GIST_KEYWORD = 'statgist'

type ProfileStatGistPayload = {
    mainInfo: {
        name: string
        position: string
        sex?: string
        age?: number
    }
    skills: string
    techStack: string[]
    projects: {
        'open source': number
        startups: number
        freelance: number
        corporate: number
    }
    otherInfo: {
        skillsChart: {
            architecture: number
            coding: number
            performance: number
            consistency: number
            communication: number
        }
    }
    stats: {
        wakatime: number
    }
    links: {
        linkedin?: string
        github?: string
    }
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return Boolean(value) && typeof value === 'object'
}

function isProfileStatGistPayload(value: unknown): value is ProfileStatGistPayload {
    if (!value || typeof value !== 'object') {
        return false
    }

    const payload = value as Record<string, unknown>
    const mainInfo = payload.mainInfo as Record<string, unknown> | undefined
    const skills = payload.skills
    const techStack = payload.techStack
    const projects = payload.projects as Record<string, unknown> | undefined
    const otherInfo = payload.otherInfo as Record<string, unknown> | undefined
    const skillsChart = otherInfo?.skillsChart as Record<string, unknown> | undefined
    const stats = payload.stats as Record<string, unknown> | undefined
    const links = payload.links

    return (
        !!mainInfo &&
        typeof mainInfo.name === 'string' &&
        typeof mainInfo.position === 'string' &&
        typeof skills === 'string' &&
        Array.isArray(techStack) &&
        techStack.every(item => typeof item === 'string') &&
        !!projects &&
        typeof projects['open source'] === 'number' &&
        typeof projects.startups === 'number' &&
        typeof projects.freelance === 'number' &&
        typeof projects.corporate === 'number' &&
        !!skillsChart &&
        typeof skillsChart.architecture === 'number' &&
        typeof skillsChart.coding === 'number' &&
        typeof skillsChart.performance === 'number' &&
        typeof skillsChart.consistency === 'number' &&
        typeof skillsChart.communication === 'number' &&
        !!stats &&
        typeof stats.wakatime === 'number' &&
        isRecord(links)
    )
}

function splitSkills(rawSkills: string): string[] {
    return rawSkills
        .split('.')
        .map(part => part.trim())
        .filter(Boolean)
}

function normalizeRadarValue(value: number): number {
    return value > 10 ? Math.round((value / 10) * 10) / 10 : value
}

function mapProfileStatToProfileData(payload: ProfileStatGistPayload): ProfileDataShape {
    return {
        mainInfo: {
            name: payload.mainInfo.name,
            position: payload.mainInfo.position,
            sex: payload.mainInfo.sex,
            age: payload.mainInfo.age,
        },
        skills: splitSkills(payload.skills),
        wakatime: {
            text: `${payload.stats.wakatime} hrs`,
            url: 'https://wakatime.com',
        },
        social: {
            linkedin:
                typeof payload.links.linkedin === 'string'
                    ? payload.links.linkedin
                    : '#',
            github:
                typeof payload.links.github === 'string' ? payload.links.github : '#',
        },
        projects: {
            openSource: payload.projects['open source'],
            startups: payload.projects.startups,
            freelance: payload.projects.freelance,
            corporate: payload.projects.corporate,
        },
        radar: {
            labels: ['Architecture', 'Coding', 'Speed', 'Rhythm', 'Soft skills'],
            values: [
                normalizeRadarValue(payload.otherInfo.skillsChart.architecture),
                normalizeRadarValue(payload.otherInfo.skillsChart.coding),
                normalizeRadarValue(payload.otherInfo.skillsChart.performance),
                normalizeRadarValue(payload.otherInfo.skillsChart.consistency),
                normalizeRadarValue(payload.otherInfo.skillsChart.communication),
            ],
        },
        techStack: payload.techStack.map(name => ({
            name,
            icon: '',
            url: '#',
        })),
    }
}

function buildGithubHeaders(): HeadersInit {
    const token = process.env.GITHUB_TOKEN

    if (!token) {
        return {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
        }
    }

    return {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
    }
}

export async function fetchProfileDataFromStatGist(): Promise<ProfileLoadResult> {
    try {
        const gists = await fetchGithubGists()
        const targetGist = gists.find(gist => {
            const byDescription = gist.description
                .toLowerCase()
                .includes(STAT_GIST_KEYWORD)
            const byFileName = gist.files.some(file =>
                file.name.toLowerCase().includes(STAT_GIST_KEYWORD),
            )
            return byDescription || byFileName
        })

        if (!targetGist || targetGist.files.length === 0) {
            return {
                data: null,
                source: 'local',
                reason: 'StatGist not found or empty.',
            }
        }

        const preferredFile =
            targetGist.files.find(file =>
                file.name.toLowerCase().endsWith('.json'),
            ) ?? targetGist.files[0]

        const profileResponse = await fetch(preferredFile.rawUrl, {
            cache: 'no-store',
            headers: buildGithubHeaders(),
        })
        if (!profileResponse.ok) {
            throw new Error('Failed to fetch StatGist file content.')
        }

        const profilePayload: unknown = await profileResponse.json()
        if (!isProfileStatGistPayload(profilePayload)) {
            throw new Error(
                'StatGist payload does not match expected profile format.',
            )
        }

        return {
            data: mapProfileStatToProfileData(profilePayload),
            source: 'gist',
        }
    } catch (error) {
        return {
            data: null,
            source: 'local',
            reason:
                error instanceof Error
                    ? error.message
                    : 'Unknown StatGist error.',
        }
    }
}

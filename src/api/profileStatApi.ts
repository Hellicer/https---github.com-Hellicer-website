import 'server-only'
import { fetchGithubGists } from '@/api/githubApi'
import type { ProfileDataShape, ProfileLoadResult } from '@/types/profile'

const STAT_GIST_KEYWORD = 'statgist'

type ProfileStatGistPayload = {
    mainInfo: {
        name: string
        position: string
        sex?: string
        age?: number | string
        photo?: string
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
        skillsChart?: Partial<{
            architecture: number
            coding: number
            performance: number
            consistency: number
            communication: number
        }>
    }
    stats: {
        wakatime?: number
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
    if (!isRecord(value)) {
        return false
    }

    const payload = value
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
        (mainInfo.sex === undefined || typeof mainInfo.sex === 'string') &&
        (mainInfo.age === undefined ||
            typeof mainInfo.age === 'number' ||
            typeof mainInfo.age === 'string') &&
        (mainInfo.photo === undefined || typeof mainInfo.photo === 'string') &&
        typeof skills === 'string' &&
        Array.isArray(techStack) &&
        techStack.every(item => typeof item === 'string') &&
        !!projects &&
        typeof projects['open source'] === 'number' &&
        typeof projects.startups === 'number' &&
        typeof projects.freelance === 'number' &&
        typeof projects.corporate === 'number' &&
        (!!otherInfo || typeof otherInfo === 'object') &&
        (skillsChart === undefined || isRecord(skillsChart)) &&
        !!stats &&
        (stats.wakatime === undefined || typeof stats.wakatime === 'number') &&
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
    return value > 10 ? Math.round(value / 10) : value
}

function parseAge(value: number | string | undefined): number | undefined {
    if (typeof value === 'number') {
        return value
    }

    if (typeof value === 'string') {
        const parsed = Number(value)
        return Number.isFinite(parsed) ? parsed : undefined
    }

    return undefined
}

function pickChartValue(
    chart: ProfileStatGistPayload['otherInfo']['skillsChart'],
    key: 'architecture' | 'coding' | 'performance' | 'consistency' | 'communication',
): number {
    const value = chart?.[key]
    if (typeof value === 'number') {
        return normalizeRadarValue(value)
    }

    return 6
}

function mapProfileStatToProfileData(payload: ProfileStatGistPayload): ProfileDataShape {
    return {
        mainInfo: {
            name: payload.mainInfo.name,
            position: payload.mainInfo.position,
            sex: payload.mainInfo.sex,
            age: parseAge(payload.mainInfo.age),
            avatar: payload.mainInfo.photo ?? null,
        },
        skills: splitSkills(payload.skills),
        wakatime: {
            text: `${payload.stats.wakatime ?? 0} hrs`,
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
                pickChartValue(payload.otherInfo.skillsChart, 'architecture'),
                pickChartValue(payload.otherInfo.skillsChart, 'coding'),
                pickChartValue(payload.otherInfo.skillsChart, 'performance'),
                pickChartValue(payload.otherInfo.skillsChart, 'consistency'),
                pickChartValue(payload.otherInfo.skillsChart, 'communication'),
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

function pickProfileFiles(
    gists: Awaited<ReturnType<typeof fetchGithubGists>>,
): Array<{ rawUrl: string }> {
    const selected = new Map<string, { rawUrl: string }>()

    for (const gist of gists) {
        const isStatGist = gist.description
            .toLowerCase()
            .includes(STAT_GIST_KEYWORD)

        for (const file of gist.files) {
            const name = file.name.toLowerCase()
            const isJson = name.endsWith('.json')
            const isStatFile = name.includes(STAT_GIST_KEYWORD)

            if (isJson || isStatFile || isStatGist) {
                selected.set(file.rawUrl, { rawUrl: file.rawUrl })
            }
        }
    }

    return Array.from(selected.values())
}

async function loadProfileFromRawUrl(rawUrl: string): Promise<ProfileDataShape | null> {
    const profileResponse = await fetch(rawUrl, {
        cache: 'no-store',
        headers: buildGithubHeaders(),
    })

    if (!profileResponse.ok) {
        return null
    }

    const payload: unknown = await profileResponse.json()
    if (!isProfileStatGistPayload(payload)) {
        return null
    }

    return mapProfileStatToProfileData(payload)
}

export async function fetchProfileCardsFromGists(): Promise<ProfileLoadResult> {
    try {
        const gists = await fetchGithubGists()
        const files = pickProfileFiles(gists)

        if (files.length === 0) {
            return {
                data: [],
                source: 'local',
                reason: 'No profile files found in gists.',
            }
        }

        const loaded = await Promise.all(
            files.map(file => loadProfileFromRawUrl(file.rawUrl)),
        )
        const cards = loaded.filter((item): item is ProfileDataShape => item !== null)

        if (cards.length === 0) {
            return {
                data: [],
                source: 'local',
                reason: 'No valid profile JSON files were found in gists.',
            }
        }

        return {
            data: cards,
            source: 'gist',
        }
    } catch (error) {
        return {
            data: [],
            source: 'local',
            reason:
                error instanceof Error
                    ? error.message
                    : 'Unknown profile gists error.',
        }
    }
}

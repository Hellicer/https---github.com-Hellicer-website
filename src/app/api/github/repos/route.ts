import { NextResponse } from 'next/server'
import { getGithubProjectsFromDb, syncGithubProjectsToDb } from '@/lib/github'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
    try {
        const url = new URL(request.url)
        const shouldSync = url.searchParams.get('sync') !== '0'

        if (shouldSync) {
            await syncGithubProjectsToDb()
        }

        let projects = await getGithubProjectsFromDb()

        if (projects.length === 0 && !shouldSync) {
            await syncGithubProjectsToDb()
            projects = await getGithubProjectsFromDb()
        }

        return NextResponse.json(projects)
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Failed to fetch repositories.',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        )
    }
}

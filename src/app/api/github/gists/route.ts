import { NextResponse } from 'next/server'
import { fetchGithubGists } from '@/api/githubApi'

export async function GET() {
    try {
        const gists = await fetchGithubGists()
        return NextResponse.json(gists)
    } catch (error) {
        return NextResponse.json(
            {
                error: 'Failed to fetch gists.',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 },
        )
    }
}

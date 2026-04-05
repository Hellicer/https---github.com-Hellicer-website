import { NextResponse } from 'next/server'
import { fetchProfileCardsFromGists } from '@/api/profileStatApi'

export async function GET() {
    const result = await fetchProfileCardsFromGists()
    return NextResponse.json(result)
}

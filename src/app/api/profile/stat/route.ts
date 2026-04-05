import { NextResponse } from 'next/server'
import { fetchProfileDataFromStatGist } from '@/api/profileStatApi'

export async function GET() {
    const result = await fetchProfileDataFromStatGist()
    return NextResponse.json(result)
}

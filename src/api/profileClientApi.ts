import type { ProfileLoadResult } from '@/types/profile'

let profileDataFromGistPromise: Promise<ProfileLoadResult> | null = null

export function fetchProfileStat(): Promise<ProfileLoadResult> {
    if (!profileDataFromGistPromise) {
        profileDataFromGistPromise = fetch('/api/profile/stat', {
            cache: 'no-store',
        })
            .then(async response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch profile stat payload.')
                }

                return (await response.json()) as ProfileLoadResult
            })
            .catch(error => ({
                data: [],
                source: 'local' as const,
                reason:
                    error instanceof Error
                        ? error.message
                        : 'Unknown profile stat error.',
            }))
    }

    return profileDataFromGistPromise
}

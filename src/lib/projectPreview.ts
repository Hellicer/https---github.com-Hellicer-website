export const PROJECT_PREVIEW_PLACEHOLDER = 'https://placehold.net/600x400.png'

export function buildGithubPreviewUrl({
    owner,
    repository,
    branch,
}: {
    owner: string
    repository: string
    branch: string
}) {
    return `https://raw.githubusercontent.com/${owner}/${repository}/${branch}/.github/preview.png`
}

export function resolveProjectPreviewUrl(previewUrl?: string | null) {
    if (!previewUrl) {
        return PROJECT_PREVIEW_PLACEHOLDER
    }

    const normalized = previewUrl.trim()
    if (!normalized) {
        return PROJECT_PREVIEW_PLACEHOLDER
    }

    return normalized
}

// src/lib/github/gist.ts

import { github } from './client'

export async function getGist(gistId: string) {
    const { data } = await github.rest.gists.get({
        gist_id: gistId,
    })

    return data
}

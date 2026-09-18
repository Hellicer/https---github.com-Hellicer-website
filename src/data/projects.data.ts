// projects.data.ts
// export type Project = {
//     id: string
//     name: string
//     description: string
//     archived: boolean
//     topics: string[]
//     website: string | null
//     github: string | null
//     preview: string | null
// }

import { TRepositories } from '@/types/repositories'

export type Project = TRepositories

export const projects: TRepositories[] = [
    {
        id: 23434,
        name: 'Nanoticia',
        description: 'Reune os principais portais de noticias em um só lugar.',
        archived: false,
        topics: ['Next.js', 'React', 'Typescript'],
        website: undefined,
        github: undefined,
        preview: undefined,
        owner: 'Hellicer',
        created_at: '2023-01-01T00:00:00Z',
    },
    {
        id: 123132,
        name: 'Chatbots',
        description: 'Bots for Telegram, WhatsApp and Facebook Messenger.',
        archived: false,
        topics: ['Node.js', 'Firebase'],
        website: undefined,
        github: undefined,
        preview: undefined,
        owner: 'Hellicer',
        created_at: '2023-01-01T00:00:00Z',
    },
]

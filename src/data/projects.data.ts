// projects.data.ts
export type Project = {
    id: string
    title: string
    description: string
    status: 'online' | 'beta' | 'archived'
    stack: 'frontend' | 'backend' | 'fullstack'
    tech: string[]
}

export const projects: Project[] = [
    {
        id: 'nanoticia',
        title: 'Nanoticia',
        description: 'Reune os principais portais de noticias em um só lugar.',
        status: 'online',
        stack: 'frontend',
        tech: ['Next.js', 'React', 'Typescript'],
    },
    {
        id: 'chatbot',
        title: 'Chatbots',
        description: 'Bots for Telegram, WhatsApp and Facebook Messenger.',
        status: 'beta',
        stack: 'backend',
        tech: ['Node.js', 'Firebase'],
    },
]

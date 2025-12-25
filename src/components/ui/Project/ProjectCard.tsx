'use client'

import { Project } from '@/data/projects.data'

function Tag({
    children,
    variant,
}: {
    children: React.ReactNode
    variant?: 'online' | 'beta' | 'archived'
}) {
    return (
        <span
            className={`
                px-3 py-1
                rounded-md
                text-xs font-semibold
                ${
                    variant === 'online'
                        ? 'bg-green-600/20 text-green-400'
                        : 'bg-violet-900/40 text-violet-300'
                }
            `}
        >
            {children}
        </span>
    )
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="rounded-2xl p-6 bg-[#1b2140] flex flex-col gap-4">
            <div>
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
            </div>

            <div className="flex flex-wrap gap-2">
                <Tag variant={project.status}>{project.status}</Tag>
                {project.tech.map(t => (
                    <Tag key={t}>{t}</Tag>
                ))}
            </div>

            <div className="aspect-[16/10] bg-gray-200 rounded-xl" />
        </div>
    )
}

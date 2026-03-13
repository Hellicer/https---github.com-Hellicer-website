'use client'

import { Project } from '@/data/projects.data'

function Tag({
    children,
    variant,
    className = '',
}: {
    children: React.ReactNode
    variant?: 'online' | 'beta' | 'archived'
    className?: string
}) {
    return (
        <span
            className={`
                inline-flex max-w-full items-center
                px-2 py-1 min-[581px]:px-3
                rounded-md
                text-[11px] leading-4 min-[581px]:text-xs
                capitalize
                cursor-default
                [overflow-wrap:anywhere]
                bg-accent text-secondary-foreground hover:bg-accent/80
                ${className}
                ${variant === 'online' ? 'text-green-500' : ''}
            `}
        >
            {children}
        </span>
    )
}

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <div className="project-card-anim card-hover-effect animate-fade-in-up flex h-full min-h-[320px] flex-col gap-3 rounded-2xl bg-card p-4 backdrop-blur-md transition-all min-[581px]:min-h-[360px] min-[581px]:gap-4 min-[581px]:p-5 min-[900px]:p-6">
            <h3 className="text-xl leading-tight font-semibold text-white min-[581px]:text-2xl">
                {project.title}
            </h3>
            <p className="text-gray11 text-sm leading-relaxed font-bold min-[581px]:text-base">
                {project.description}
            </p>
            <div className="aspect-[4/3] min-h-[152px] rounded-xl bg-gray-200 min-[581px]:aspect-[16/10] min-[581px]:min-h-[172px]" />

            <div className="mt-auto flex flex-wrap gap-1.5 min-[581px]:gap-2">
                <Tag variant={project.status}>{project.status}</Tag>
                {project.tech.map(t => (
                    <Tag className="capitalize" key={t}>
                        {t}
                    </Tag>
                ))}
            </div>
        </div>
    )
}

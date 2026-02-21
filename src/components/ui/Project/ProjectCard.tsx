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
                px-3 py-1 
                rounded-md
                text-xs 
                capitalize
                cursor-default
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
        <div className="h-full rounded-2xl bg-card p-6 backdrop-blur-md transition-all flex flex-col gap-4 project-card-anim animate-fade-in-up card-hover-effect">
            <h3 className="text-2xl font-semibold text-white">
                {project.title}
            </h3>
            <p className="text-sm leading-relaxed text-gray11 font-bold">
                {project.description}
            </p>
            <div className="aspect-[16/10] bg-gray-200 rounded-xl" />

            <div className="flex flex-wrap gap-2">
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

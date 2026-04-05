'use client'

import { Project } from '@/data/projects.data'
import {
    PROJECT_PREVIEW_PLACEHOLDER,
    resolveProjectPreviewUrl,
} from '@/lib/projectPreview'
import { CircleEllipsis, ExternalLink, Github } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

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
    const t = useTranslations('')
    const [previewSrc, setPreviewSrc] = useState(
        resolveProjectPreviewUrl(project.previewUrl),
    )
    const detailsUrl = project.codeUrl ?? project.liveUrl

    useEffect(() => {
        setPreviewSrc(resolveProjectPreviewUrl(project.previewUrl))
    }, [project.previewUrl])

    return (
        <div className="project-card-anim card-hover-effect animate-fade-in-up flex h-full min-h-[320px] flex-col gap-3 rounded-2xl bg-card p-4 backdrop-blur-md transition-all min-[581px]:min-h-[360px] min-[581px]:gap-4 min-[581px]:p-5 min-[900px]:p-6">
            <h3 className="h-14 overflow-hidden text-xl leading-tight font-semibold text-white min-[581px]:h-16 min-[581px]:text-2xl">
                {project.title}
            </h3>
            <div className="relative h-40 overflow-hidden rounded-xl bg-gray-200 min-[581px]:h-44">
                <img
                    alt={`${project.title} preview`}
                    className="h-full w-full object-contain"
                    onError={() => setPreviewSrc(PROJECT_PREVIEW_PLACEHOLDER)}
                    src={previewSrc}
                />
            </div>

            <div className="flex h-9 flex-wrap items-center gap-2 overflow-hidden">
                {project.liveUrl ? (
                    <a
                        className="inline-flex h-8 items-center gap-1 rounded-md bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition hover:opacity-90"
                        href={project.liveUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                    </a>
                ) : null}
                {/* {project.codeUrl ? (
                    <a
                        className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-accent"
                        href={project.codeUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <Github className="h-3.5 w-3.5" />
                        Code
                    </a>
                ) : null} */}
                {detailsUrl ? (
                    <a
                        className="inline-flex h-8 items-center gap-1 rounded-md border border-border px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-accent"
                        href={detailsUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <CircleEllipsis className="h-3.5 w-3.5" />
                        {t('common.details')}
                    </a>
                ) : null}
            </div>

            <div className="mt-auto flex h-16 flex-wrap content-end gap-1.5 overflow-hidden min-[581px]:gap-2">
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

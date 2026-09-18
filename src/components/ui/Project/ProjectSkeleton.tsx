function ProjectCardSkeleton() {
    return (
        <div className="project-card-anim flex h-full min-h-[320px] animate-pulse flex-col gap-3 rounded-2xl bg-card p-4 backdrop-blur-md min-[581px]:min-h-[360px] min-[581px]:gap-4 min-[581px]:p-5 min-[900px]:p-6">
            {/* Title */}
            <div className="h-14 overflow-hidden min-[581px]:h-16">
                <div className="h-6 w-3/4 rounded-md bg-muted min-[581px]:h-7" />
            </div>

            {/* Preview */}
            <div className="relative h-40 overflow-hidden rounded-xl bg-muted min-[581px]:h-44" />

            {/* Buttons */}
            <div className="flex h-9 flex-wrap items-center gap-2">
                <div className="h-8 w-20 rounded-md bg-muted" />
                <div className="h-8 w-24 rounded-md bg-muted" />
            </div>

            {/* Tags */}
            <div className="mt-auto flex h-16 flex-wrap content-end gap-1.5 overflow-hidden min-[581px]:gap-2">
                <div className="h-6 w-16 rounded-md bg-muted" />
                <div className="h-6 w-20 rounded-md bg-muted" />
                <div className="h-6 w-14 rounded-md bg-muted" />
            </div>
        </div>
    )
}

export default function ProjectSkeleton() {
    return (
        <div className="grid min-h-[404px] grid-cols-1 gap-4 min-[581px]:grid-cols-2 min-[900px]:grid-cols-3 min-[1280px]:grid-cols-4 min-[581px]:gap-6 xl:gap-8">
            {Array.from({ length: 4 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
            ))}
        </div>
    )
}

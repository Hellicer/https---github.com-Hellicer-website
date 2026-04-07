export default function Tag({
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

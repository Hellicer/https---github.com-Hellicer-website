'use client'

import { cn } from '@/lib/utils'
import { useState } from 'react'

type BentoCardProps = {
    Icon: React.ComponentType<{ className?: string }>
    name: string
    description: string
    className?: string
}

export function BentoCard({
    Icon,
    name,
    description,
    className,
}: BentoCardProps) {
    const [isFlipped, setIsFlipped] = useState(false)

    const toggleFlip = () => {
        setIsFlipped(prev => !prev)
    }

    return (
        <div
            className={cn(
                'group relative mx-auto h-56 w-full max-w-[17rem] cursor-pointer rounded-2xl transition-all [perspective:1000px] sm:h-60 sm:max-w-[18rem] lg:h-64 lg:w-64',
                '[transform:translateZ(0)]',
                'hover:border-black/20',
                className,
            )}
            onClick={toggleFlip}
            onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    toggleFlip()
                }
            }}
            role="button"
            tabIndex={0}
            aria-pressed={isFlipped}
            aria-label={`${name} card`}
        >
            <div
                className={cn(
                    'relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] lg:group-hover:[transform:rotateY(180deg)]',
                    isFlipped && '[transform:rotateY(180deg)]',
                )}
            >
                {/* front */}
                <div
                    className={cn(
                        'absolute inset-0 h-full w-full rounded-2xl border border-black bg-card p-6 shadow-[0_14px_30px_rgba(0,0,0,0.28)] backdrop-blur-md transition-transform duration-500 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:translateZ(0)] lg:group-hover:[transform:translateZ(18px)]',
                        isFlipped && '[transform:translateZ(18px)]',
                    )}
                >
                    {/* glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 lg:group-hover:opacity-100">
                        <div className="absolute -inset-px rounded-2xl" />
                    </div>

                    {/* icon */}
                    <div className="flex h-full w-full items-center justify-center">
                        <Icon className="h-24 w-24 text-white drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)]" />
                    </div>
                </div>

                {/* back */}
                <div
                    className={cn(
                        'absolute inset-0 h-full w-full rounded-2xl border border-black bg-accent p-6 shadow-[0_14px_30px_rgba(0,0,0,0.28)] transition-transform duration-500 [transform:rotateY(180deg)_translateZ(0)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] lg:group-hover:[transform:rotateY(180deg)_translateZ(18px)]',
                        isFlipped &&
                            '[transform:rotateY(180deg)_translateZ(18px)]',
                    )}
                >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-white min-h-11">
                        {name}
                    </h3>
                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-gray11 font-bold">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

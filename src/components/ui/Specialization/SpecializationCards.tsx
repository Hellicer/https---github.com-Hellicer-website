'use client'

import { BentoGrid } from '../bento-grid'
import { cn } from '@/lib/utils'
import { useState } from 'react'

import {
    GlobeIcon,
    DashboardIcon,
    PersonIcon,
    CodeIcon,
    CubeIcon,
    ChatBubbleIcon,
    RocketIcon,
    IdCardIcon,
} from '@radix-ui/react-icons'
import SpecTypeToggle from '../SpecTypeToggle/SpecTypeToggle'

const features = [
    {
        icon: GlobeIcon,
        name: 'Corporate websites',
        description:
            'Business websites with custom design, SEO optimization, and high performance.',
    },
    {
        icon: DashboardIcon,
        name: 'CRM',
        description:
            'Customer relationship management systems to organize and automate your workflow.',
    },
    {
        icon: PersonIcon,
        name: 'Personal portfolios',
        description:
            'Personal portfolio websites to showcase your skills, experience, and projects.',
    },
    {
        icon: CodeIcon,
        name: 'Web applications',
        description:
            'Modern web applications with scalable architecture and clean UI.',
    },
    {
        icon: CubeIcon,
        name: 'Marketplaces',
        description:
            'Multi-vendor marketplaces with product management and secure transactions.',
    },
    {
        icon: ChatBubbleIcon,
        name: 'Chatbots and automation',
        description:
            'AI-powered chatbots and automation to improve customer communication.',
    },
    {
        icon: IdCardIcon,
        name: 'Payment system integration',
        description:
            'Integration of secure payment systems and online billing solutions.',
    },
    {
        icon: RocketIcon,
        name: 'Migration and optimization',
        description:
            'Migration, performance optimization, and infrastructure improvements.',
    },
]

type IconProps = /*unresolved*/ any

type BentoCardProps = {
    Icon: React.ForwardRefExoticComponent<
        IconProps & React.RefAttributes<SVGSVGElement>
    >
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

export function SpecializationCards() {
    return (
        <div className="cursor-default w-full grid grid-flow-row">
            <div
                className="w-full grid gap-4 lg:grid-flow-col lg:items-center font-silkscreen font-bold mb-8 lg:mb-10"
                id="specialization"
            >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                    Specialization
                </h1>
                <SpecTypeToggle />
            </div>

            <BentoGrid className="cursor-default grid place-items-center grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 w-full place-self-center mx-auto">
                {features.map(({ icon, ...rest }) => (
                    <BentoCard key={rest.name} Icon={icon} {...rest} />
                ))}
            </BentoGrid>
        </div>
    )
}

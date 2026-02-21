import { BentoGrid } from '../bento-grid'
import { cn } from '@/lib/utils'

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
    return (
        <div
            className={cn(
                'h-64 w-64 group relative m-4 rounded-2xl transition-all [perspective:1000px]',
                '[transform:translateZ(0)]',
                'hover:border-black/20',
                className,
            )}
        >
            <div className="relative h-full w-full rounded-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* front */}
                <div className="absolute inset-0 h-full w-full rounded-2xl border border-black bg-card p-6 backdrop-blur-md [backface-visibility:hidden] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:[transform:translateZ(18px)]">
                    {/* glow */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute -inset-px rounded-2xl10 to-transparent" />
                    </div>

                    {/* icon */}
                    <div className="flex h-full w-full items-center justify-center">
                        <Icon className="h-24 w-24 text-white drop-shadow-[0_14px_28px_rgba(0,0,0,0.6)]" />
                    </div>
                </div>

                {/* back */}
                <div className="absolute inset-0 h-full w-full rounded-2xl border border-black bg-accent p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-[0_24px_60px_rgba(0,0,0,0.45)] transition-transform duration-500 group-hover:[transform:rotateY(180deg)_translateZ(18px)]">
                    <h3 className="text-2xl font-semibold text-white min-h-11">
                        {name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray11 font-bold">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    )
}

export function SpecializationCards() {
    return (
        <div
            className="cursor-default w-full grid grid-flow-row
        "
        >
            <div
                className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold mb-10"
                id="specialization"
            >
                <h1>Specialization</h1>
                <SpecTypeToggle />
            </div>

            <BentoGrid
                className="cursor-default grid
            justify-items-center
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
     w-full place-self-start "
            >
                {features.map(({ icon, ...rest }) => (
                    <BentoCard key={rest.name} Icon={icon} {...rest} />
                ))}
            </BentoGrid>
        </div>
    )
}

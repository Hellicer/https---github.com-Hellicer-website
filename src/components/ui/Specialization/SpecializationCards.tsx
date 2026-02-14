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
} from '@radix-ui/react-icons'

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
        icon: ChatBubbleIcon,
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
                'h-64 w-64 group relative overflow-hidden m-4 rounded-2xl border border-black bg-card p-6 backdrop-blur-md transition-all',
                'hover:border-black/20 hover:bg-accent',
                className,
            )}
        >
            {/* glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute -inset-px rounded-2xl10 to-transparent" />
            </div>

            {/* icon */}
            <div className="grid grid-flow-col justify-start  gap-2 items-start h-18">
                {/* <div className=" inline-flex h-11 w-11 items-center justify-center rounded-xl ">
                    <Icon className="h-6 w-6 text-white" />
                </div> */}

                <h3 className=" text-2xl font-semibold text-white min-h-11">
                    {name}
                </h3>
            </div>

            <p className="text-sm leading-relaxed text-gray11 font-bold">
                {description}
            </p>
        </div>
    )
}

export function SpecializationCards() {
    return (
        <BentoGrid
            className="    grid
            justify-items-center
    grid-cols-1
    sm:grid-cols-2
    lg:grid-cols-4
     w-full place-self-start cursor-pointer "
        >
            {features.map(({ icon, ...rest }) => (
                <BentoCard key={rest.name} Icon={icon} {...rest} />
            ))}
        </BentoGrid>
    )
}

'use client'

import { BentoGrid } from '../bento-grid'
import { BentoCard } from '../BentoCard'

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
import { useTranslations } from 'next-intl'

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

export function SpecializationCards() {
    const t = useTranslations('specialization')
    return (
        <div className="cursor-default w-full grid grid-flow-row">
            <div
                className="w-full grid gap-4 lg:grid-flow-col lg:items-center font-silkscreen font-bold mb-8 lg:mb-10"
                id="specialization"
            >
                <h1 className="text-2xl sm:text-3xl lg:text-4xl">
                    {t('title')}
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

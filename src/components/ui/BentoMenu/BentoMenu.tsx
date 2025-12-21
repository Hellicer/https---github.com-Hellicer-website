import {
    BellIcon,
    CalendarIcon,
    FileTextIcon,
    GlobeIcon,
    InputIcon,
} from '@radix-ui/react-icons'

import { BentoCard, BentoGrid } from '../bento-grid'
const features = [
    {
        Icon: FileTextIcon,
        name: 'About us',
        description: 'Learn more about our company and team.',
        href: '/',
        cta: 'Learn more',
        background: <img className="absolute -top-20 -right-20 opacity-60" />,
        className: '', //'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
    },
    {
        Icon: InputIcon,
        name: 'Services',
        description: 'Learn more about our services.',
        href: '/',
        cta: 'Learn more',
        background: <img className="absolute -top-20 -right-20 opacity-60" />,
        className: '', //'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
    },
    {
        Icon: GlobeIcon,
        name: 'Projects',
        description: 'Check out some of our recent projects.',
        href: '/',
        cta: 'Learn more',
        background: <img className="absolute -top-20 -right-20 opacity-60" />,
        className: '', //'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
    },
]

export function BentoMenu() {
    return (
        <BentoGrid className="grid-flow-col lg:grid-col-3 w-full max-w-[970px]">
            {features.map(feature => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    )
}

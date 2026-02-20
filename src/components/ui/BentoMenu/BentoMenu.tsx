import { FileTextIcon, GlobeIcon, InputIcon } from '@radix-ui/react-icons'
import { IconCloud } from '@/components/ui/icon-cloud'

import { BentoCard, BentoGrid } from '../bento-grid'
import { Marquee } from '../magicui/marquee'
import { cn } from '@/lib/utils'
import { AnimatedList } from '../animated-list'
import { SLUGS as slugs } from '@/data/slugs'
import { FILES as files } from '@/data/files'

interface Item {
    name: string
    description: string
    icon: string
    color: string
    time: string
}
let notifications = [
    {
        name: 'Payment received',
        description: 'Magic UI',
        time: '15m ago',
        icon: '💸',
        color: '#00C9A7',
    },
    {
        name: 'User signed up',
        description: 'Magic UI',
        time: '10m ago',
        icon: '👤',
        color: '#FFB800',
    },
    {
        name: 'New message',
        description: 'Magic UI',
        time: '5m ago',
        icon: '💬',
        color: '#FF3D71',
    },
    {
        name: 'New event',
        description: 'Magic UI',
        time: '2m ago',
        icon: '🗞️',
        color: '#1E86FF',
    },
]
notifications = Array.from({ length: 10 }, () => notifications).flat()
const Notification = ({ name, description, icon, color, time }: Item) => {
    return (
        <figure
            className={cn(
                'relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4 ',
                // animation styles
                'transition-all duration-400 ease-in-out hover:scale-[103%]',
                // light styles
                'bg-gray-900 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
                // dark styles
                'transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]',
            )}
        >
            <div className="flex flex-row items-center gap-3">
                <div
                    className="flex size-10 items-center justify-center rounded-2xl"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    <span className="text-lg">{icon}</span>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
                        <span className="text-sm sm:text-lg">{name}</span>
                        <span className="mx-1">·</span>
                        <span className="text-xs text-gray-500">{time}</span>
                    </figcaption>
                    <p className="text-sm font-normal dark:text-white/60">
                        {description}
                    </p>
                </div>
            </div>
        </figure>
    )
}
export function AnimatedListDemo({ className }: { className?: string }) {
    return (
        <div
            className={cn(
                'relative flex h-full w-full flex-col overflow-hidden p-2',
                className,
            )}
        >
            <AnimatedList delay={2000}>
                {notifications.map((item, idx) => (
                    <Notification {...item} key={idx} />
                ))}
            </AnimatedList>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 "></div>
        </div>
    )
}
function IconCloudDemo() {
    const images = slugs.map(
        slug => `https://cdn.simpleicons.org/${slug}/${slug}`,
    )

    return (
        <div className="relative flex size-full items-center justify-center overflow-hidden">
            <IconCloud images={images} />
        </div>
    )
}

const features = [
    {
        Icon: FileTextIcon,
        name: 'About us',
        description: 'Learn more about our team.',
        href: '/',
        cta: 'Learn more',
        background: (
            <div
                className="absolute top-2 right-2 h-[250px] w-full scale-75 border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-500 ease-out  blur-[1px] mr-[-8px]
group-hover:blur-none group-hover:scale-90"
            >
                <IconCloudDemo />
            </div>
        ),
        className: 'max-w-60 w-full', //'lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3',
    },
    {
        Icon: GlobeIcon,
        name: 'Projects',
        description: 'Check out some of our recent projects.',
        href: '/',
        cta: 'Learn more',
        background: (
            <Marquee
                reverse
                pauseOnHover
                className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            'relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4',
                            'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                            'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]',
                            'transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none',
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">
                            {f.body}
                        </blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
        className: 'w-full ', //'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4',
    },
    {
        Icon: InputIcon,
        name: 'Services',
        description: 'Learn more about our services.',
        href: '/',
        cta: 'Learn more',
        background: (
            <div
                className="absolute mr-[-6px] top-2 right-2 h-[340px] w-full scale-85 border-none
            [mask-image:linear-gradient(to_top,transparent_20%,#000_100%)]
            transition-all duration-300 ease-out blur-[1px]
            group-hover:scale-90 group-hover:blur-none"
            >
                <AnimatedListDemo />
            </div>
        ),
        className: ' max-w-60 w-full col-span-3',
    },
]
// sa
export function BentoMenu() {
    return (
        <BentoGrid className="flex gap-4 h-[320px] max-w-5xl">
            {features.map(feature => (
                <BentoCard key={feature.name} {...feature} />
            ))}
        </BentoGrid>
    )
}

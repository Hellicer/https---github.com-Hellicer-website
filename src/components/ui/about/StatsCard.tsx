import { useTranslations } from 'next-intl'
import { Code2, Briefcase, Target, Zap, Tags } from 'lucide-react'
import { CommonProps } from '@/interfaces/props'

const items = [
    { icon: Code2, key: 'experience' },
    { icon: Briefcase, key: 'projectsCompleted' },
    { icon: Target, key: 'roas' },
    { icon: Zap, key: 'ssr' },
    { icon: Tags, key: 'metadata' },
]

export function StatsCard({ className }: CommonProps = {}) {
    const t = useTranslations('about.solvingBlock')

    return (
        <div className={`group rounded-2xl ${className}`}>
            <div className="grid space-y-4 rounded-2xl bg-card p-5 backdrop-blur-md transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] sm:space-y-5 sm:p-6 lg:space-y-6 lg:p-8 [transform-style:preserve-3d] [perspective:1000px] group-hover:[transform:translateZ(18px)]">
                {items.map(({ icon: Icon, key }) => (
                    <div key={key} className="flex items-center gap-3 sm:gap-4">
                        <Icon
                            size={28}
                            strokeWidth={2}
                            color="white"
                            className="h-7 w-7 shrink-0 text-white sm:h-8 sm:w-8 lg:h-9 lg:w-9"
                        />
                        <span className="text-lg leading-snug font-semibold text-white sm:text-xl lg:text-2xl">
                            {t(key)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

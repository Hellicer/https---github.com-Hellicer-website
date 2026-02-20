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
            <div className="grid rounded-2xl bg-card backdrop-blur-md p-8 space-y-6 transition-transform duration-500 shadow-[0_24px_60px_rgba(0,0,0,0.45)] [transform-style:preserve-3d] [perspective:1000px] group-hover:[transform:translateZ(18px)]">
                {items.map(({ icon: Icon, key }) => (
                    <div key={key} className="flex items-center gap-4">
                        <Icon
                            size={36}
                            strokeWidth={2}
                            color="white"
                            className="text-white"
                        />
                        <span className="text-2xl font-semibold text-white">
                            {t(key)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

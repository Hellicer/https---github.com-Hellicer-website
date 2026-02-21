import { useTranslations } from 'next-intl'
import { StatsCard } from './StatsCard'
import { ProfileCard } from './ProfileCard'
import { TestimonialsMarquee } from './TestimonialsMarquee'

export function AboutSection() {
    const t = useTranslations('about')

    return (
        <section className="grid max-w-[1440px] w-full h-full mx-auto">
            <div className=" cursor-default w-full grid grid-flow-col font-silkscreen text-4xl font-bold">
                <h1> {t('title')}</h1>
            </div>

            <div className="grid xl:grid-cols-2 gap-10 mt-12 justify-items-center h-auto px-5 ">
                <div className="cursor-default grid grid-flow-row w-fit max-w-158 gap-10 mt-12 ">
                    <div className="grid">
                        <h3 className="text-4xl font-inter font-extrabold h-fit">
                            {t('subtitle')}
                        </h3>
                        <StatsCard className="w-full max-w-158 grid items-stretch content-between h-full " />
                    </div>

                    <TestimonialsMarquee className="cursor-default w-fit h-fit self-end " />
                </div>

                <div className="cursor-pointer grid gap-10 mt-12 ">
                    <ProfileCard className="w-full max-w-158" />
                </div>
            </div>
        </section>
    )
}

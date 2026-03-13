import { useTranslations } from 'next-intl'
import { StatsCard } from './StatsCard'
import { ProfileCard } from './ProfileCard'
import { TestimonialsMarquee } from './TestimonialsMarquee'

export function AboutSection() {
    const t = useTranslations('about')

    return (
        <section className="mx-auto grid h-full w-full min-w-0 max-w-[1440px] px-4 sm:px-5 lg:px-8">
            <div className="grid w-full cursor-default grid-flow-col font-silkscreen text-3xl font-bold sm:text-4xl">
                <h1> {t('title')}</h1>
            </div>

            <div className="mt-8 grid h-auto min-w-0 gap-8 justify-items-center lg:mt-12 lg:grid-cols-2 lg:gap-10">
                <div className="pt-10 grid w-full min-w-0 max-w-158 cursor-default grid-flow-row gap-8 lg:gap-10">
                    <div className="grid">
                        <h3 className="h-fit text-2xl leading-tight font-inter font-extrabold max-lg:pb-4 sm:text-3xl lg:text-4xl">
                            {t('subtitle')}
                        </h3>
                        <StatsCard className="grid h-full w-full max-w-158 items-stretch content-between" />
                    </div>

                    <TestimonialsMarquee className="h-fit w-full cursor-default self-end" />
                </div>

                <div className=" max-lg:justify-items-center grid w-full min-w-0 cursor-pointer gap-8 lg:mt-12 lg:gap-10 lg:ml-20">
                    <ProfileCard className="w-full max-w-158" />
                </div>
            </div>
        </section>
    )
}

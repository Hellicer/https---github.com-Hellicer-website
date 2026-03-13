import { GlobeWrapper } from '@/components/layout/index'
import { Button } from '@/components/ui/button'
import ProjectContentBlock from '@/components/ui/Project/ProjectContentBlock'
import { SpecializationCards } from '@/components/ui/Specialization/SpecializationCards'
import { Inbox } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import LazyAboutSection from './LazyAboutSection'
import LazyBentoMenu from './LazyBentoMenu'

export default async function MainPage() {
    const t = await getTranslations('')

    return (
        <main className="pt-20 ">
            <GlobeWrapper>
                <div
                    className="cursor-default w-full max-w-360 mx-auto mt-25 text-left px-5"
                    id="about"
                >
                    <div
                        className="flex flex-col relative z-10 w-full max-w-5xl
                    "
                    >
                        <h1 className=" font-silkscreen text-5xl  max-w-4xl  font-bold uppercase leading-tight tracking-wide">
                            {t('headerTitle.title')}

                            {/* Your Business + Our Solution = Success! */}
                        </h1>

                        <p className="mt-6 font-semibold text-xl text-gray-30 max-w-4xl  text-left">
                            {t('headerTitle.description')}
                        </p>

                        <div className="mt-8 text-right">
                            <Button
                                variant="secondary"
                                asChild
                                size="default"
                                className="pointer-events-auto p-0 h-11 "
                            >
                                <a href={'#'} className="">
                                    {/* {cta} */}
                                    <span className="">
                                        {t('common.hireUs')}
                                    </span>
                                    <Inbox className=" ms-2 min-h-5.5 min-w-5.5" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-360 mx-auto mt-22 text-left px-5">
                    <LazyBentoMenu />
                </div>
            </GlobeWrapper>
            <div className="relative mx-auto grid max-w-360 z-10 justify-items-center max-lg:px-2 lg:p-4 gap-50 items-stretch mt-20">
                <SpecializationCards />
                <LazyAboutSection />
            </div>
            <div
                className="relative mx-auto grid max-w-360 mt-40 z-10 justify-items-center p-4 gap-16 items-stretch  "
                id="projects"
            >
                <ProjectContentBlock />
            </div>
        </main>
    )
}

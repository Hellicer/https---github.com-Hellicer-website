'use client'
import { GlobeWrapper } from '@/components/layout/index'
import { AboutSection } from '@/components/ui/about/AboutSection'
import { BentoMenu } from '@/components/ui/BentoMenu/BentoMenu'
import { Button } from '@/components/ui/button'
import ContactSection from '@/components/ui/ContactSection/ContactSection'
import ProjectContentBlock from '@/components/ui/Project/ProjectContentBlock'
import { SpecializationCards } from '@/components/ui/Specialization/SpecializationCards'
import SpecTypeToggle from '@/components/ui/SpecTypeToggle/SpecTypeToggle'
import { FiltersState } from '@/interfaces/props'
import { Inbox } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function MainPage() {
    const t = useTranslations('')

    return (
        <main className="pt-20 ">
            <GlobeWrapper>
                <div
                    className="w-full max-w-360 place-self-center mt-25 text-left"
                    id="about"
                >
                    <div
                        className=" flex flex-col relative z-10 w-full max-w-5xl ml-[20px]
                    "
                    >
                        <h1 className=" font-silkscreen text-5xl  max-w-4xl  font-bold uppercase leading-tight tracking-wide">
                            {t('headerTitle.title')}

                            {/* Your Business + Our Solution = Success! */}
                        </h1>

                        <p className="mt-6 font-semibold text-xl text-gray-30 max-w-4xl  text-left">
                            {t('headerTitle.title')}
                            {/* We build fast, responsive
                            and scalable web products that are ready to grow
                            with your business. */}
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
                <div className="w-full max-w-360 place-self-center mt-22 text-left pl-5">
                    <BentoMenu />
                </div>
            </GlobeWrapper>
            <div className="relative mx-auto grid max-w-360 z-10 justify-items-center p-4 gap-16 items-stretch ">
                <div
                    className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold"
                    id="specialization"
                >
                    <h1>Specialization</h1>
                    <SpecTypeToggle />
                </div>
                <SpecializationCards />
                <AboutSection />
            </div>
            <div
                className="relative mx-auto grid max-w-360 mt-20 z-10 justify-items-center p-4 gap-16 items-stretch "
                id="projects"
            >
                <ProjectContentBlock />
            </div>
        </main>
    )
}

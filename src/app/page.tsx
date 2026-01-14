'use client'

import Image from 'next/image'
import { Header, GlobeWrapper, Main } from '@/components/layout/index'
// import { useTranslations } from 'next-intl'
import { InteractiveGridPattern } from '@/components/ui/magicui/interactive-grid-pattern'
import { DotPattern } from '@/components/ui/magicui/dot-pattern'
import { cn } from '@/lib/utils'
import { BentoMenu } from '@/components/ui/BentoMenu/BentoMenu'
export default function Home() {
    // const { t } = useTranslations()

    return (
        <>
            <div className="relative mx-auto grid max-w-[1440px] z-10 justify-items-center p-4  items-start ">
                <Header />
            </div>

            <Main />
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                <p>footer</p>
            </footer>
        </>
    )
}

'use client'

import Image from 'next/image'
import { Header, GlobeWrapper, Main } from '@/components/layout/index'
// import { useTranslations } from 'next-intl'
// import { InteractiveGridPattern } from '@/components/ui/magicui/interactive-grid-pattern'
// import { DotPattern } from '@/components/ui/magicui/dot-pattern'
// import { cn } from '@/lib/utils'
// import { BentoMenu } from '@/components/ui/BentoMenu/BentoMenu'
import ContactSection from '@/components/ui/ContactSection/ContactSection'
export default function Home() {
    // const { t } = useTranslations()

    return (
        <div className=" flex flex-col overflow-hidden ">
            <header className="fixed z-50 grid max-w-360 w-full  place-self-center p-4 justify-items-center  items-stretch ">
                <Header />
            </header>

            <Main />
            <footer className="relative grid max-w-360 w-full  place-self-center   z-10 justify-items-center  items-stretch mt-22 p-4 gap-16 ">
                <ContactSection />
            </footer>
        </div>
    )
}

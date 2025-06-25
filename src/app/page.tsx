'use client'

import Image from 'next/image'
import { Header } from '@/sections/Header/index'
// import { useTranslations } from 'next-intl'
import { InteractiveGridPattern } from '@/components/magicui/interactive-grid-pattern'
import { cn } from '@/lib/utils'

export default function Home() {
    // const { t } = useTranslations()

    return (
        <>
            <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
                <InteractiveGridPattern
                    className={cn(
                        '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]',
                    )}
                    width={1440}
                    height={2000}
                    squares={[80, 80]}
                    squaresClassName="hover:fill-blue-500"
                />
            </div>{' '}
            <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-4  gap-16 items-start ">
                <Header />
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <p>main</p>
                </main>
                <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                    <p>footer</p>
                </footer>
            </div>
        </>
    )
}

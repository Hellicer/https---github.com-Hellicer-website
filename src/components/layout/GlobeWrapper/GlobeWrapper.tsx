'use client'

import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

const Globe = dynamic(
    () => import('@/components/ui/magicui/globe').then(mod => mod.Globe),
    { ssr: false },
)

export default function GlobeWrapper({ children }: { children: ReactNode }) {
    const sectionRef = useRef<HTMLElement | null>(null)
    const [shouldRenderGlobe, setShouldRenderGlobe] = useState(false)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)')
        const updateIsDesktop = () => setIsDesktop(mediaQuery.matches)

        updateIsDesktop()
        mediaQuery.addEventListener('change', updateIsDesktop)
        return () => mediaQuery.removeEventListener('change', updateIsDesktop)
    }, [])

    useEffect(() => {
        if (!isDesktop) {
            setShouldRenderGlobe(false)
            return
        }
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return
        }
        if (!sectionRef.current || shouldRenderGlobe) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0]?.isIntersecting) {
                    setShouldRenderGlobe(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '250px 0px' },
        )

        observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [isDesktop, shouldRenderGlobe])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden text-white  m-auto min-h-212.5"
        >
            {/* -mt-[150px] */}
            {/* Globe background */}
            <div className="absolute top-2/5 right-0 translate-y-[-40%] translate-x-1/2 w-5xl h-245 md:w-225 md:h-225 z-0 opacity-90 hidden lg:block">
                {shouldRenderGlobe ? <Globe /> : null}
            </div>
            {children}
        </section>
    )
}

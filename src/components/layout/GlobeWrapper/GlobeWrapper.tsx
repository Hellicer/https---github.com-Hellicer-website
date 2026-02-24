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

    useEffect(() => {
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
    }, [shouldRenderGlobe])

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden text-white  m-auto h-212.5"
        >
            {/* -mt-[150px] */}
            {/* Globe background */}
            <div className="absolute top-2/5 right-0 translate-y-[-40%] translate-x-1/2 w-5xl h-245 md:md:w-225 md:h-225  z-0 opacity-90">
                {shouldRenderGlobe ? <Globe /> : null}
            </div>
            {children}
        </section>
    )
}

'use client'

import type { ProfileLoadResult } from '@/types/profile'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const AboutSection = dynamic(
    () =>
        import('@/components/ui/about/AboutSection').then(
            mod => mod.AboutSection,
        ),
    { ssr: false },
)

export default function LazyAboutSection({
    initialProfileLoad,
}: {
    initialProfileLoad?: ProfileLoadResult
}) {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (!containerRef.current || isVisible) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0]?.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '300px 0px' },
        )

        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [isVisible])

    return (
        <section ref={containerRef} className="w-full grid grid-flow-row">
            {isVisible ? (
                <AboutSection initialProfileLoad={initialProfileLoad} />
            ) : (
                <div className="min-h-[800px]" />
            )}
        </section>
    )
}

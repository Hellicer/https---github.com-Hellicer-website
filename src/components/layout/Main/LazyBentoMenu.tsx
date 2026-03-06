'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const BentoMenu = dynamic(
    () =>
        import('@/components/ui/BentoMenu/BentoMenu').then(mod => mod.BentoMenu),
    { ssr: false },
)

export default function LazyBentoMenu() {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const [isVisible, setIsVisible] = useState(false)
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
            setIsVisible(true)
            return
        }
        if (!containerRef.current || isVisible) return

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0]?.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { rootMargin: '250px 0px' },
        )

        observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [isDesktop, isVisible])

    return (
        <div ref={containerRef}>
            {isVisible ? <BentoMenu disableAnimations={!isDesktop} /> : null}
        </div>
    )
}

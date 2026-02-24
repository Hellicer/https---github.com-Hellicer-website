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

    useEffect(() => {
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
    }, [isVisible])

    return <div ref={containerRef}>{isVisible ? <BentoMenu /> : null}</div>
}

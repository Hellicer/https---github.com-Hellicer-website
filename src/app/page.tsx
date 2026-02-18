'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { Header, Main } from '@/components/layout/index'
import ContactSection from '@/components/ui/ContactSection/ContactSection'

export default function Home() {
    const [isScrolled, setIsScrolled] = useState(false)
    const headerRef = useRef<HTMLElement | null>(null)
    const baseMaxWidthRef = useRef<string>('90rem')

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!headerRef.current) return
        const computed = window.getComputedStyle(headerRef.current)
        if (computed.maxWidth) {
            baseMaxWidthRef.current = computed.maxWidth
        }
        gsap.fromTo(
            headerRef.current,
            { y: -150, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', delay: 0.2 },
        )
    }, [])

    useEffect(() => {
        if (!headerRef.current) return
        gsap.to(headerRef.current, {
            maxWidth: '100%',
            paddingTop: isScrolled ? '0.75rem' : '1rem',
            paddingBottom: isScrolled ? '0.75rem' : '1rem',
            duration: 0.5,
            ease: 'power2.out',
        })
    }, [isScrolled])

    return (
        <div className="flex flex-col overflow-hidden">
            <header
                ref={headerRef}
                className="fixed inset-x-0 z-50 grid w-full max-w-360 place-self-center px-4 py-4 justify-items-center items-stretch"
            >
                <Header
                    className={`gap-5 transition-[border-radius,background-color,box-shadow,transform] duration-500 ease-out ${
                        isScrolled
                            ? 'rounded-b-2xl bg-card shadow-lg px-6 '
                            : 'rounded-2xl bg-card/5'
                    }`}
                />
            </header>

            <Main />
            <footer className="relative grid max-w-360 w-full place-self-center z-10 justify-items-center items-stretch mt-22 p-4 gap-16">
                <ContactSection />
            </footer>
        </div>
    )
}

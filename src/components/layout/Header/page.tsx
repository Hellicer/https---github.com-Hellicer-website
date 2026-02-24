'use client'

import { useEffect, useRef, useState } from 'react'
import LanguageSwitcher from '@/features/change-language/changeLang'
import Logotype from '@/shared/logotype/logotype'
import NavbarMenu from '@/components/ui/navbarMenu/navbarMenu'
// import ContactUs from '@/components/ui/contactUs/ContactUs'
// import SwitcherTheme from '@/features/switcher-theme/SwitchTheme'
import { cn } from '@/lib/utils'

export default function Header({ className }: { className?: string }) {
    const keepHeaderVisible = false
    const [isHidden, setIsHidden] = useState(false)
    const [isHoverReveal, setIsHoverReveal] = useState(false)
    const [isScrollingUp, setIsScrollingUp] = useState(false)
    const glowRef = useRef<HTMLDivElement | null>(null)
    const currentGlowXRef = useRef(50)
    const targetGlowXRef = useRef(50)
    const rafRef = useRef<number | null>(null)
    const hideTimeoutRef = useRef<number | null>(null)
    const lastScrollYRef = useRef(0)
    const shouldHideRef = useRef(false)

    useEffect(() => {
        const handleScroll = () => {
            if (keepHeaderVisible) {
                setIsHidden(false)
                shouldHideRef.current = false
                return
            }
            const currentY = window.scrollY
            const lastY = lastScrollYRef.current
            const delta = currentY - lastY

            if (currentY <= 10) {
                setIsHidden(false)
                shouldHideRef.current = false
            } else if (delta > 8 && currentY > 80) {
                setIsHidden(true)
                shouldHideRef.current = true
            }
            setIsScrollingUp(delta < -2)

            lastScrollYRef.current = currentY
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const updateGlowVar = (value: number) => {
            if (glowRef.current) {
                glowRef.current.style.setProperty('--header-glow-x', `${value}%`)
            }
        }
        const updateGlowColorVar = () => {
            if (!glowRef.current) return
            const supportsColorMix =
                typeof CSS !== 'undefined' &&
                CSS.supports(
                    'color',
                    'color-mix(in oklch, white 35%, transparent)',
                )
            glowRef.current.style.setProperty(
                '--header-glow-color',
                supportsColorMix
                    ? 'color-mix(in oklch, var(--primary) 35%, transparent)'
                    : 'rgba(110, 86, 207, 0.35)',
            )
        }

        const handleMouseMove = (event: MouseEvent) => {
            if (window.innerWidth < 768) return
            const next = Math.min(
                90,
                Math.max(10, (event.clientX / window.innerWidth) * 100),
            )
            targetGlowXRef.current = next
        }

        const handleResize = () => {
            if (window.innerWidth < 768) {
                currentGlowXRef.current = 50
                targetGlowXRef.current = 50
                updateGlowVar(50)
            }
        }

        const animate = () => {
            const target = targetGlowXRef.current
            const current = currentGlowXRef.current
            const next = current + (target - current) * 0.01
            currentGlowXRef.current =
                Math.abs(target - next) < 0.05 ? target : next
            updateGlowVar(currentGlowXRef.current)
            rafRef.current = window.requestAnimationFrame(animate)
        }

        updateGlowColorVar()
        updateGlowVar(currentGlowXRef.current)
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        window.addEventListener('resize', handleResize)
        rafRef.current = window.requestAnimationFrame(animate)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('resize', handleResize)
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <>
            <div
                onMouseEnter={() => {
                    if (hideTimeoutRef.current) {
                        window.clearTimeout(hideTimeoutRef.current)
                        hideTimeoutRef.current = null
                    }
                    if (isHidden) {
                        setIsHidden(false)
                        setIsHoverReveal(true)
                    }
                }}
                onMouseLeave={() => {
                    if (hideTimeoutRef.current) {
                        window.clearTimeout(hideTimeoutRef.current)
                    }
                    hideTimeoutRef.current = window.setTimeout(() => {
                        setIsHoverReveal(false)
                        if (shouldHideRef.current) setIsHidden(true)
                        hideTimeoutRef.current = null
                    }, 330)
                }}
                onAnimationEnd={() => setIsHoverReveal(false)}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-transform duration-320 ease-in-out will-change-transform',
                    isHidden
                        ? '-translate-y-[calc(100%-7px)]'
                        : 'translate-y-0',
                    isHoverReveal && !isHidden ? 'animate-header-reveal' : null,
                )}
            >
                <section
                    id="HeaderBar"
                    className={cn(
                        'bg-card relative z-10 grid grid-flow-col w-full h-18.5 text-sm font-bold font-silkscreen items-center-safe px-9 select-none',
                        ' rounded-0',
                        isHidden ? 'shadow-none' : 'shadow-md',
                        className,
                    )}
                >
                    <Logotype />
                    <div className="max-sm:hidden">
                        <NavbarMenu />
                    </div>
                    <div className="grid grid-flow-col gap-3.25 justify-end max-sm:hidden">
                        <LanguageSwitcher />
                    </div>
                    {/* <SwitcherTheme /> */}
                </section>
                <div
                    ref={glowRef}
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute left-0 right-0 z-0 hidden h-50 transition-opacity duration-400 ease-in-out',
                        isHidden
                            ? 'top-[calc(4.625rem-7px)]'
                            : 'top-[4.625rem]',
                        'md:block',
                        isHidden && !isScrollingUp
                            ? 'opacity-100'
                            : 'opacity-0',
                    )}
                    style={{
                        background:
                            'radial-gradient(810px 180px at var(--header-glow-x, 50%) 0%, var(--header-glow-color, rgba(110, 86, 207, 0.35)), transparent)',
                        maskImage:
                            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
                        WebkitMaskImage:
                            'linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0))',
                        filter: 'blur(12px)',
                    }}
                />
            </div>
            <style jsx>{`
                @keyframes header-reveal {
                    0% {
                        transform: translateY(calc(-100% + 7px));
                    }
                    60% {
                        transform: translateY(6px);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                .animate-header-reveal {
                    animation: header-reveal 260ms
                        cubic-bezier(0.2, 0.7, 0.2, 1) both;
                }
                #HeaderBar :global(a),
                #HeaderBar :global(button) {
                    position: relative;
                    text-shadow: none;
                    transition:
                        text-shadow 200ms ease,
                        color 200ms ease;
                }
                #HeaderBar :global(a:hover),
                #HeaderBar :global(a:focus-visible),
                #HeaderBar :global(button:hover),
                #HeaderBar :global(button:focus-visible) {
                    color: var(--primary);
                    text-shadow: none;
                }
            `}</style>
        </>
    )
}

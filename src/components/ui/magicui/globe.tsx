'use client'

import createGlobe, { COBEOptions } from 'cobe'
import { useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

const MOVEMENT_DAMPING = 4000

const GLOBE_CONFIG: COBEOptions = {
    width: 980,
    height: 1024,
    onRender: () => {},
    devicePixelRatio: 1.5,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 4200,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [251 / 255, 100 / 255, 21 / 255],
    glowColor: [1, 1, 1],
    markers: [
        { location: [50.4501, 30.5234], size: 0.08 },
        { location: [48.4647, 35.0462], size: 0.06 },
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
    ],
}

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string
    config?: COBEOptions
}) {
    let phi = 0
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)
    const widthRef = useRef(0)
    const isInViewRef = useRef(true)
    const isPageVisibleRef = useRef(true)
    const pointerInteracting = useRef<number | null>(null)
    const pointerInteractionMovement = useRef(0)

    const r = useMotionValue(0)
    const rs = useSpring(r, {
        mass: 0.8,
        damping: 60,
        stiffness: 120,
    })

    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value
        if (canvasRef.current) {
            canvasRef.current.style.cursor =
                value !== null ? 'grabbing' : 'grab'
        }
    }

    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            r.set(r.get() + delta / MOVEMENT_DAMPING)
        }
    }

    useEffect(() => {
        const onResize = () => {
            if (canvasRef.current) {
                widthRef.current = canvasRef.current.offsetWidth
            }
        }

        const destroyGlobe = () => {
            if (globeRef.current) {
                globeRef.current.destroy()
                globeRef.current = null
            }
        }

        const createOrResumeGlobe = () => {
            if (!canvasRef.current || globeRef.current) return
            if (!isInViewRef.current || !isPageVisibleRef.current) return

            const width = widthRef.current || canvasRef.current.offsetWidth
            const dpr = Math.min(
                window.devicePixelRatio || config.devicePixelRatio || 1,
                config.devicePixelRatio || 1.5,
            )
            const adaptiveSamples =
                width < 500
                    ? Math.min(config.mapSamples ?? 4200, 2800)
                    : (config.mapSamples ?? 4200)

            globeRef.current = createGlobe(canvasRef.current, {
                ...config,
                devicePixelRatio: dpr,
                mapSamples: adaptiveSamples,
                width: width * dpr,
                height: width * dpr,
                onRender: state => {
                    phi += 0.0004
                    state.phi = phi + rs.get()
                    state.width = widthRef.current * dpr
                    state.height = widthRef.current * dpr
                },
            })

            setTimeout(() => {
                if (canvasRef.current) canvasRef.current.style.opacity = '1'
            }, 0)
        }

        const handleVisibilityChange = () => {
            isPageVisibleRef.current = !document.hidden
            if (isPageVisibleRef.current) {
                createOrResumeGlobe()
            } else {
                destroyGlobe()
            }
        }

        const observer = new IntersectionObserver(
            entries => {
                const entry = entries[0]
                isInViewRef.current = Boolean(entry?.isIntersecting)
                if (isInViewRef.current) {
                    createOrResumeGlobe()
                } else {
                    destroyGlobe()
                }
            },
            { threshold: 0.05 },
        )

        window.addEventListener('resize', onResize)
        document.addEventListener('visibilitychange', handleVisibilityChange)
        onResize()
        isPageVisibleRef.current = !document.hidden
        if (canvasRef.current) observer.observe(canvasRef.current)
        createOrResumeGlobe()

        return () => {
            destroyGlobe()
            observer.disconnect()
            window.removeEventListener('resize', onResize)
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange,
            )
        }
    }, [rs, config])

    return (
        <div className={cn('absolute inset-0  aspect-[1/1] w-full', className)}>
            <canvas
                className={cn(
                    'size-full opacity-0 transition-opacity duration-500',
                )}
                ref={canvasRef}
                onPointerDown={e => {
                    pointerInteracting.current = e.clientX
                    updatePointerInteraction(e.clientX)
                }}
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={e => updateMovement(e.clientX)}
                onTouchMove={e =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    )
}

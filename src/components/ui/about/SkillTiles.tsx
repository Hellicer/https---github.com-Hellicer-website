'use client'

import { useEffect, useRef, useState } from 'react'
import type { ProfileDataShape } from '@/types/profile'
import { SkillIcon } from './SkillIcon'
import { toSimpleIconsSlug } from './toSimpleIconsSlug'

export function SkillTiles({
    techStack,
}: {
    techStack: ProfileDataShape['techStack']
}) {
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const contentRef = useRef<HTMLDivElement | null>(null)
    const [hasOverflow, setHasOverflow] = useState(false)

    useEffect(() => {
        let frameId1 = 0
        let frameId2 = 0

        const checkOverflow = () => {
            const wrapper = wrapperRef.current
            const content = contentRef.current

            if (!wrapper || !content) {
                setHasOverflow(false)
                return
            }

            const verticalOverflow = content.scrollHeight - wrapper.clientHeight
            const horizontalOverflow = content.scrollWidth - wrapper.clientWidth

            setHasOverflow(verticalOverflow > 1 || horizontalOverflow > 1)
        }

        const scheduleCheck = () => {
            cancelAnimationFrame(frameId1)
            cancelAnimationFrame(frameId2)
            frameId1 = requestAnimationFrame(() => {
                checkOverflow()
                frameId2 = requestAnimationFrame(checkOverflow)
            })
        }

        scheduleCheck()

        const resizeObserver = new ResizeObserver(scheduleCheck)
        if (wrapperRef.current) resizeObserver.observe(wrapperRef.current)
        if (contentRef.current) resizeObserver.observe(contentRef.current)

        const mutationObserver = new MutationObserver(scheduleCheck)
        if (contentRef.current) {
            mutationObserver.observe(contentRef.current, {
                childList: true,
                subtree: true,
                characterData: true,
            })
        }

        window.addEventListener('resize', scheduleCheck)

        return () => {
            cancelAnimationFrame(frameId1)
            cancelAnimationFrame(frameId2)
            resizeObserver.disconnect()
            mutationObserver.disconnect()
            window.removeEventListener('resize', scheduleCheck)
        }
    }, [])

    return (
        <div
            className="relative h-[210px] overflow-hidden min-[581px]:h-[200px]"
            ref={wrapperRef}
        >
            <div className="flex flex-wrap gap-2 pl-2 pt-1" ref={contentRef}>
                {techStack.map(tech => (
                    <div
                        key={tech.name}
                        className={`
            bg-accent
            px-3 py-1
            rounded-md
            text-xs font-semibold
            flex items-center
            shadow-md
            h-8
            // hover:scale-105 transition
          `}
                    >
                        {tech.icon ? (
                            <img
                                className="mr-2 h-4 w-4"
                                src={tech.icon}
                                width={16}
                                height={16}
                                loading="lazy"
                                decoding="async"
                                alt={`${tech.name} logo`}
                            />
                        ) : (
                            <SkillIcon skill={toSimpleIconsSlug(tech.name)} />
                        )}
                        <p>{tech.name}</p>
                    </div>
                ))}
            </div>
            {hasOverflow && (
                <div className="pointer-events-none absolute right-2 bottom-2 min-[581px]:right-22">
                    <span className="inline-flex items-center rounded-md bg-accent px-3 py-1 text-xs font-semibold tracking-widest">
                        ...
                    </span>
                </div>
            )}
        </div>
    )
}

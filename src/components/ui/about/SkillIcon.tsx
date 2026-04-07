'use client'

import { useEffect, useState } from 'react'

export function SkillIcon({ skill }: { skill: string }) {
    const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
    const src = `https://cdn.simpleicons.org/${skill}/${skill}`

    useEffect(() => {
        let isMounted = true
        const image = new Image()

        image.onload = () => {
            if (isMounted) setIsAvailable(true)
        }
        image.onerror = () => {
            if (isMounted) setIsAvailable(false)
        }
        image.src = src

        return () => {
            isMounted = false
        }
    }, [src])

    if (isAvailable !== true) return null

    return (
        <img
            className="mr-2"
            src={src}
            width={16}
            height={16}
            loading="lazy"
            decoding="async"
            alt={`${skill} logo`}
        />
    )
}

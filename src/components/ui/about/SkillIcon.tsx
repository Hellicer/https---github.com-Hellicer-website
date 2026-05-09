'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function SkillIcon({ skill }: { skill: string }) {
    const [hasError, setHasError] = useState(false)
    const src = `https://cdn.simpleicons.org/${skill}/${skill}`

    useEffect(() => {
        setHasError(false)
    }, [src])

    if (hasError) return null

    return (
        <Image
            className="mr-2"
            src={src}
            width={16}
            height={16}
            alt={`${skill} logo`}
            onError={() => setHasError(true)}
        />
    )
}

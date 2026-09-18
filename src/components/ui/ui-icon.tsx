'use client'

import React from 'react'
import Image from 'next/image'

interface UIIconProps {
    src: string
    size?: number
    className?: string
}
export function UIIcon({ src, className, size = 16 }: UIIconProps) {
    return (
        <Image
            src={`${src}.svg`}
            alt={src}
            width={size}
            height={size}
            className={className}
        />
    )
}

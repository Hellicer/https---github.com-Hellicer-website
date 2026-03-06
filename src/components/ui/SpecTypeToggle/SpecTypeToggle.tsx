'use client'

import React from 'react'

export default function SpecTypeToggle() {
    const [selected, setSelected] = React.useState<'frontend' | 'backend'>(
        'frontend',
    )
    return (
        <div className="w-full lg:justify-self-end font-silkscreen font-bold">
            <div className="cursor-pointer text-left lg:text-end text-xl sm:text-2xl lg:text-4xl leading-tight">
                <span
                    className={
                        selected === 'frontend' ? 'text-destructive' : ''
                    }
                    onClick={() => setSelected('frontend')}
                >
                    Frontend
                </span>{' '}
                /{' '}
                <span
                    className={selected === 'backend' ? 'text-destructive' : ''}
                    onClick={() => setSelected('backend')}
                >
                    Backend
                </span>
            </div>
        </div>
    )
}

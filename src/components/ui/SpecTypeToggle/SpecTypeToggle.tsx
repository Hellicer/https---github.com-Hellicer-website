'use client'

import React from 'react'

export default function SpecTypeToggle() {
    const [selected, setSelected] = React.useState<'frontend' | 'backend'>(
        'frontend',
    )
    return (
        <div className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold">
            <div className="cursor-pointer text-end">
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

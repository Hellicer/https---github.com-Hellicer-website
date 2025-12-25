'use client'

import React from 'react'
import { BentoCard, BentoGrid } from '../bento-grid'

export default function Specialization() {
    const [selected, setSelected] = React.useState<'frontend' | 'backend'>(
        'frontend',
    )
    return (
        <div className=" w-full grid grid-flow-col font-silkscreen text-4xl font-bold">
            <h1>Specialization</h1>
            <div className="cursor-pointer text-end">
                <span
                    className={selected === 'frontend' ? 'text-red9' : ''}
                    onClick={() => setSelected('frontend')}
                >
                    Frontend
                </span>{' '}
                /{' '}
                <span
                    className={selected === 'backend' ? 'text-red9' : ''}
                    onClick={() => setSelected('backend')}
                >
                    Backend
                </span>
            </div>
        </div>
    )
}

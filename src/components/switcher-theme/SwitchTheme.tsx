'use client'

import { Sun } from 'lucide-react'

export default function SwitchertTheme(props: any) {
    return (
        <div className="grid grid-flow-row">
            <span>light</span>
            <Sun size={16} />
            <span>night</span>
        </div>
    )
}

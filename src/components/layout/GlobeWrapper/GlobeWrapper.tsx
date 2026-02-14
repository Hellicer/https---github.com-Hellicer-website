'use client'

import { Globe } from '@/components/ui/magicui/globe'
import React, { ReactNode } from 'react'

export default function GlobeWrapper({ children }: { children: ReactNode }) {
    return (
        <section className="relative overflow-hidden text-white  m-auto h-212.5">
            {/* -mt-[150px] */}
            {/* Globe background */}
            <div className="absolute top-2/5 right-0 translate-y-[-40%] translate-x-1/2 w-5xl h-245 md:md:w-225 md:h-225  z-0 opacity-90">
                <Globe />
            </div>
            {children}
        </section>
    )
}

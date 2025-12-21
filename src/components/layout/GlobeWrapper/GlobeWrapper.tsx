'use client'

import { Globe } from '@/components/ui/magicui/globe'
import React, { ReactNode } from 'react'

export default function GlobeWrapper({ children }: { children: ReactNode }) {
    return (
        <section className="relative overflow-hidden text-white  m-auto h-[850px]">
            {/* -mt-[150px] */}
            {/* Globe background */}
            <div className="absolute top-2/5 right-0 translate-y-[-40%] translate-x-1/2 w-[1024px] h-[980px] md:w-[900px] md:h-[900px]  z-0 opacity-90">
                <Globe />
            </div>
            {children}
        </section>
    )
}

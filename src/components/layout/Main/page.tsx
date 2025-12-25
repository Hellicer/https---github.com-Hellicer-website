'use client'
import { GlobeWrapper } from '@/components/layout/index'
import { AboutSection } from '@/components/ui/about/AboutSection'
import { BentoMenu } from '@/components/ui/BentoMenu/BentoMenu'
import { ProjectsFilters } from '@/components/ui/Project/ProjectsFilters'
import { ProjectsGrid } from '@/components/ui/Project/ProjectsGrid'
import Specialization from '@/components/ui/Specialization/Specialization'
import { SpecializationCards } from '@/components/ui/Specialization/SpecializationCards'
import { FiltersState } from '@/interfaces/props'
import { useState } from 'react'

export default function MainPage() {
    const [filters, setFilters] = useState<FiltersState>({
        stack: null,
        status: null,
        tech: [],
    })
    return (
        <main className="">
            <GlobeWrapper>
                <div className="w-full max-w-[1440px] place-self-center mt-22 text-left">
                    <div
                        className=" flex flex-col relative z-10  px-6 w-full max-w-5xl
                    "
                    >
                        <h1 className=" font-silkscreen text-5xl md:text-5xl  font-bold uppercase leading-tight tracking-wide">
                            Your Business + Our Solution = Success!
                        </h1>

                        <p className="mt-6 text-gray-300 max-w-2xl  text-left">
                            Lobortis, volutpat turpis vitae elit hendrerit dui
                            lacus vehicula, tincidunt libero, ut tincidunt odio
                            in enim. Ut nunc non sed nam ipsum convallis.
                        </p>

                        <div className="mt-8 text-right">
                            <button
                                // variant="outline"
                                className="uppercase tracking-wider text-sm font-bold px-6 py-3"
                            >
                                Hire Us 🚀
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-[1440px] place-self-center mt-22 text-left pl-5">
                    <BentoMenu />
                </div>
            </GlobeWrapper>
            <div className="relative mx-auto grid max-w-[1440px] z-10 justify-items-center p-4 gap-16 items-stretch ">
                {/* <BentoMenu /> */}
                <Specialization />
                <SpecializationCards />
                <AboutSection />
            </div>

            <section className="mt-12 space-y-10">
                <button
                    onClick={() =>
                        setFilters({ stack: null, status: null, tech: [] })
                    }
                    className="text-xs text-gray-400 underline hover:text-white"
                >
                    Reset filters
                </button>

                <ProjectsFilters filters={filters} setFilters={setFilters} />
                <ProjectsGrid filters={filters} />
            </section>
        </main>
    )
}

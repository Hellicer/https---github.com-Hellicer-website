'use client'
import { GlobeWrapper } from '@/components/layout/index'

export default function MainPage() {
    return (
        <main className="">
            <GlobeWrapper>
                <div
                    className="relative z-10 max-w-5xl mx-[10%] px-6 text-center content-center
                    "
                >
                    <h1 className=" font-silkscreen text-5xl md:text-5xl  font-bold uppercase leading-tight tracking-wide">
                        Your Business + Our Website = Success!
                    </h1>

                    <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
                        Lobortis, volutpat turpis vitae elit hendrerit dui lacus
                        vehicula, tincidunt libero, ut tincidunt odio in enim.
                        Ut nunc non sed nam ipsum convallis.
                    </p>

                    <div className="mt-8">
                        <button
                            // variant="outline"
                            className="uppercase tracking-wider text-sm font-bold px-6 py-3"
                        >
                            Hire Us 🚀
                        </button>
                    </div>
                </div>
            </GlobeWrapper>
        </main>
    )
}

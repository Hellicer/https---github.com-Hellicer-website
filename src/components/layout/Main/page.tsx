'use client'
import { GlobeWrapper } from '@/components/layout/index'
import { BentoMenu } from '@/components/ui/BentoMenu/BentoMenu'
import Specialization from '@/components/ui/Specialization/Specialization'

export default function MainPage() {
    return (
        <main className="">
            <GlobeWrapper>
                <div className="w-full max-w-[1440px] place-self-center mt-22 text-left">
                    <div
                        className=" flex flex-col relative z-10  px-6 w-full max-w-5xl
                    "
                    >
                        <h1 className=" font-silkscreen text-5xl md:text-5xl  font-bold uppercase leading-tight tracking-wide">
                            Your Business + Our Website = Success!
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
            <Specialization />
        </main>
    )
}

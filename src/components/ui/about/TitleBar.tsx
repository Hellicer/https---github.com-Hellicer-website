'use client'

export const TitleBar = ({ title }: { title: string }) => (
    <p className="text-ring h-fit font-silkscreen text-base font-semibold sm:text-lg lg:text-xl">
        $: cd ./${title}
    </p>
)

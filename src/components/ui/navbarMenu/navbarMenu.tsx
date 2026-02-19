'use client'

import { useTranslations } from 'next-intl'

const arrMenuItems = [
    'about',
    'specialization',
    'skills',
    'projects',
    'contact',
]
export default function navbarMenu(props: any) {
    const t = useTranslations('header')
    return (
        <div className="grid grid-flow-col max-w-5xl gap-10 place-items-center justify-self-center ">
            {arrMenuItems.map(item => (
                <a
                    type="button"
                    href={`#${item}`}
                    id={`block-${item}`}
                    key={item}
                    className="cursor-pointer"
                >
                    {t?.(`${item}`) ?? 'item'}
                </a>
            ))}
        </div>
    )
}
